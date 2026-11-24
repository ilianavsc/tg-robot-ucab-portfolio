/* ==========================================================================
   INSPECTOR DE HARDWARE P02 · ESTADO CENTRAL + CONSOLAS INTERACTIVAS 2×2
   --------------------------------------------------------------------------
   SimulationState es la única fuente de verdad de la simulación local (SIL):
   distancia HC-SR04, 4 canales TCRT5000, velocidad/PWM, pitch/roll/alertas
   MPU-6050 y estado de seguridad.

   · El simulador 3D del circuito (prototipos/P02-sensores/inspector3d.js)
     publica sus lecturas en vivo con publicarCircuito() y lee de aquí lo que
     las consolas inyectan (obstáculo, desvío, consigna, IMU, fallos).
   · Las consolas (este archivo) escriben con set()/comando()/liberar().
   Sin el circuito (pruebas en Node) el estado funciona solo, en modo local.
   Todos los datos son sintéticos: no hay telemetría MQTT real.
   ========================================================================== */
(function (raiz) {
  'use strict';

  // ------------------------------------------------------------------ límites técnicos
  var LIMITES = {
    distMinCm: 5, // slider HC-SR04
    distMaxCm: 80,
    sinEcoCm: 400, // alcance del HC-SR04P: más allá no hay eco
    paradaCm: 20, // < 20 cm: parada (firmware)
    precaucionCm: 50, // 20–50 cm: precaución
    canalesTcrt: 4, // regleta de 4 TCRT5000 (S1…S4)
    tcrtPosMm: [-27, -9, 9, 27], // S1..S4 (izquierda → derecha), 18 mm entre sí
    tcrtUmbralMm: 12, // medio ancho de la cinta (9,5 mm) + huella del sensor
    desvioMaxMm: 30,
    vMax: 0.46, // m/s: PWM 0,8 × 0,57 m/s (Speed 200 + L298N)
    vNominal: 0.4, // m/s: velocidad de crucero del circuito
    vPwm100: 0.57, // m/s al 100 % de PWM
    giroDif: 0.45, // diferencia de PWM al girar (manejo del Simulador 1)
    inclinacionDeg: 20, // alerta de inclinación
    vuelcoDeg: 30, // parada por inclinación peligrosa
    anguloMaxDeg: 45
  };

  var DIRECCIONES = ['ADELANTE', 'ATRÁS', 'IZQUIERDA', 'DERECHA', 'DETENIDO'];
  var EVENTOS_MPU = {
    normal: {pitchDeg: 0, rollDeg: 0, acelG: 1.0},
    inclinacion: {pitchDeg: 24, rollDeg: -22, acelG: 1.12},
    impacto: {pitchDeg: 9, rollDeg: 6, acelG: 2.85},
    atascamiento: {pitchDeg: 3, rollDeg: 1, acelG: 0.08}
  };
  var SALUDES = ['normal', 'advertencia', 'fallo'];
  var CONSOLAS = ['hcsr04', 'tcrt5000', 'motores', 'mpu6050'];
  // pieza del robot (tira / 3D) → consola que la representa
  var CONSOLA_DE = {tcrt: 'tcrt5000', us_front: 'hcsr04', us_rear: 'hcsr04', mpu: 'mpu6050', traccion: 'motores', esp32: null, bateria: null};
  var PIEZA_DE = {hcsr04: 'us_front', tcrt5000: 'tcrt', motores: 'traccion', mpu6050: 'mpu'};
  var NOMBRES = {tcrt: 'TCRT5000 ×4', us_front: 'HC-SR04P frontal', us_rear: 'HC-SR04P trasero', esp32: 'ESP32 móvil', mpu: 'MPU-6050', traccion: 'Tracción + chasis PLA', bateria: 'Batería 3S'};

  function clamp(v, lo, hi) {
    v = Number(v);
    if (!isFinite(v)) v = lo;
    return Math.max(lo, Math.min(hi, v));
  }

  function nominal() {
    return {
      hcsr04: {distanciaCm: 60, atrasCm: null, zona: 'libre'},
      tcrt5000: {desvioMm: 0, canales: [0, 1, 1, 0], patron: '0110', errorMm: 0, linea: 'centrada'},
      motores: {velocidadMs: LIMITES.vNominal, direccion: 'ADELANTE', velEfectivaMs: 0, pwmIzq: 0, pwmDer: 0, pwm: 0, bloqueado: false},
      mpu6050: {pitchDeg: 0, rollDeg: 0, acelG: 1.0, evento: 'normal', alerta: null},
      salud: {hcsr04: 'normal', tcrt5000: 'normal', motores: 'normal', mpu6050: 'normal'},
      inyeccion: {hcsr04: false, tcrt5000: false, motores: false, mpu6050: false},
      seguridad: {estado: 'NOMINAL', motivos: [], paroForzado: false, permiteAtras: false},
      fuente: 'local', // 'local' (solo consolas) | 'circuito' (lecturas del simulador 3D)
      circuito: null, // {encendido, modo} cuando el circuito publica
      seleccion: null, // consola resaltada
      foco: null, // pieza enfocada (tira / 3D): muestra su ficha técnica en el panel
      origen: 'SIL',
      version: 0
    };
  }

  // ------------------------------------------------------------------ derivaciones (puras)
  function canalesTcrt(desvioMm) {
    return LIMITES.tcrtPosMm.map(function (p) {
      return Math.abs(p - desvioMm) <= LIMITES.tcrtUmbralMm ? 1 : 0;
    });
  }

  function zonaDe(cm) {
    if (cm < LIMITES.paradaCm) return 'critica';
    if (cm < LIMITES.precaucionCm) return 'precaucion';
    return 'libre';
  }

  function derivar(s) {
    var h = s.hcsr04, t = s.tcrt5000, m = s.motores, i = s.mpu6050, sal = s.salud, iny = s.inyeccion;
    var circuito = s.fuente === 'circuito';
    var motivos = [];
    var forzados = []; // causas que imponen la parada al circuito
    var parada = false;
    var precaucion = false;
    var forzar = function (causa, texto) { parada = true; forzados.push(causa); motivos.push(texto); };

    // HC-SR04
    h.zona = sal.hcsr04 === 'fallo' ? 'fallo' : zonaDe(h.distanciaCm);
    if (h.zona === 'fallo') forzar('sin-eco', 'HC-SR04 sin eco (fail-safe)');
    else if (h.zona === 'critica') {
      if (!circuito || iny.hcsr04) forzar('obstaculo', 'Obstáculo a ' + Math.round(h.distanciaCm) + ' cm (< 20 cm)');
      else if (m.bloqueado) { parada = true; motivos.push('Obstáculo < 20 cm: solo deja retroceder'); }
      else { precaucion = true; motivos.push('Obstáculo < 20 cm junto a la ruta: Auto reduce la velocidad'); }
    } else if (h.zona === 'precaucion') { precaucion = true; motivos.push('Obstáculo en zona de precaución (20–50 cm)'); }

    // TCRT5000 (4 canales)
    if (sal.tcrt5000 === 'fallo') {
      t.canales = [0, 0, 0, 0];
      t.linea = 'fallo';
      forzar('sin-linea', 'TCRT5000 sin señal óptica');
    } else {
      if (!circuito) {
        t.canales = canalesTcrt(t.desvioMm);
        t.errorMm = t.desvioMm;
      }
      var activos = t.canales.reduce(function (a, b) { return a + b; }, 0);
      t.linea = activos === 0 ? 'perdida' : Math.abs(t.errorMm) > 18 ? 'deriva' : 'centrada';
      if (t.linea === 'perdida') { precaucion = true; motivos.push('Línea perdida (0000)'); }
      else if (t.linea === 'deriva') { precaucion = true; motivos.push('Deriva lateral alta'); }
    }
    t.patron = t.canales.join('');
    if (sal.tcrt5000 === 'fallo') t.errorMm = 0;

    // MPU-6050
    var inc = Math.max(Math.abs(i.pitchDeg), Math.abs(i.rollDeg));
    i.alerta = null;
    if (sal.mpu6050 === 'fallo') { i.alerta = 'fallo'; forzar('imu', 'MPU-6050 sin respuesta I2C'); }
    else if (i.evento === 'impacto' || i.acelG > 2) { i.alerta = 'impacto'; forzar('impacto', 'Impacto detectado (' + i.acelG.toFixed(2) + ' g)'); }
    else if (inc > LIMITES.vuelcoDeg) { i.alerta = 'inclinacion'; forzar('vuelco', 'Inclinación peligrosa > 30°'); }
    else if (inc > LIMITES.inclinacionDeg || i.evento === 'inclinacion') { precaucion = true; i.alerta = 'inclinacion'; motivos.push('Inclinación > 20°'); }
    else if (i.evento === 'atascamiento') { precaucion = true; i.alerta = 'atascamiento'; motivos.push('Atascamiento: ruedas sin avance'); }

    if (sal.motores === 'fallo') forzar('driver', 'Driver L298N en fallo');
    CONSOLAS.forEach(function (k) {
      if (sal[k] === 'advertencia') { precaucion = true; motivos.push('Aviso en ' + k.toUpperCase()); }
    });

    s.seguridad.estado = parada ? 'PARADA' : precaucion ? 'PRECAUCION' : 'NOMINAL';
    s.seguridad.motivos = motivos;
    s.seguridad.paroForzado = forzados.length > 0;
    s.seguridad.permiteAtras = forzados.length > 0 && forzados.every(function (c) { return c === 'obstaculo'; });

    // Motores: en el circuito vienen de la física; en local se calculan de la consigna
    if (!circuito) {
      var v = m.direccion === 'DETENIDO' ? 0 : m.velocidadMs;
      m.bloqueado = false;
      if (s.seguridad.paroForzado && v > 0 && !(s.seguridad.permiteAtras && m.direccion === 'ATRÁS')) { v = 0; m.bloqueado = true; }
      if (i.alerta === 'atascamiento') v = 0; // las ruedas giran pero el robot no avanza
      var base = m.direccion === 'DETENIDO' || m.bloqueado ? 0 : Math.round((m.velocidadMs / LIMITES.vPwm100) * 100);
      var izq = base, der = base;
      if (m.direccion === 'IZQUIERDA') izq = Math.round(base * (1 - LIMITES.giroDif));
      if (m.direccion === 'DERECHA') der = Math.round(base * (1 - LIMITES.giroDif));
      m.pwmIzq = izq;
      m.pwmDer = der;
      m.pwm = base;
      m.velEfectivaMs = v === 0 ? 0 : m.direccion === 'ATRÁS' ? -v : v;
    }
    return s;
  }

  function normalizar(s) {
    if (s.fuente !== 'circuito' || s.inyeccion.hcsr04) s.hcsr04.distanciaCm = clamp(s.hcsr04.distanciaCm, LIMITES.distMinCm, LIMITES.distMaxCm);
    s.tcrt5000.desvioMm = clamp(s.tcrt5000.desvioMm, -LIMITES.desvioMaxMm, LIMITES.desvioMaxMm);
    s.motores.velocidadMs = Math.round(clamp(s.motores.velocidadMs, 0, LIMITES.vMax) * 100) / 100;
    if (DIRECCIONES.indexOf(s.motores.direccion) === -1) s.motores.direccion = 'DETENIDO';
    s.mpu6050.pitchDeg = clamp(s.mpu6050.pitchDeg, -LIMITES.anguloMaxDeg, LIMITES.anguloMaxDeg);
    s.mpu6050.rollDeg = clamp(s.mpu6050.rollDeg, -LIMITES.anguloMaxDeg, LIMITES.anguloMaxDeg);
    s.mpu6050.acelG = clamp(s.mpu6050.acelG, 0, 4);
    if (!EVENTOS_MPU[s.mpu6050.evento]) s.mpu6050.evento = 'normal';
    for (var k in s.salud) if (SALUDES.indexOf(s.salud[k]) === -1) s.salud[k] = 'normal';
  }

  // ------------------------------------------------------------------ store
  function crearEstado() {
    var estado = derivar(nominal());
    var oyentes = [];
    var ordenes = [];
    var SECCIONES = ['hcsr04', 'tcrt5000', 'motores', 'mpu6050', 'salud', 'inyeccion'];

    function emitir(origen) {
      estado.version++;
      oyentes.slice().forEach(function (fn) {
        try { fn(estado, origen); } catch (e) { if (raiz.console) raiz.console.error(e); }
      });
    }
    function aplicar(patch) {
      SECCIONES.forEach(function (sec) {
        if (patch[sec]) for (var k in patch[sec]) estado[sec][k] = patch[sec][k];
      });
      if ('seleccion' in patch) estado.seleccion = patch.seleccion;
      if ('foco' in patch) estado.foco = patch.foco;
    }

    var api = {
      LIMITES: LIMITES,
      CONSOLA_DE: CONSOLA_DE,
      PIEZA_DE: PIEZA_DE,
      NOMBRES: NOMBRES,
      get: function () { return estado; },
      // set({hcsr04: {distanciaCm: 12}, inyeccion: {hcsr04: true}}, 'consola'): mezcla por sección y recalcula
      set: function (patch, origen) {
        aplicar(patch || {});
        normalizar(estado);
        derivar(estado);
        emitir(origen || 'api');
        return estado;
      },
      eventoMpu: function (ev, origen) {
        var e = EVENTOS_MPU[ev] || EVENTOS_MPU.normal;
        return api.set({
          mpu6050: {evento: EVENTOS_MPU[ev] ? ev : 'normal', pitchDeg: e.pitchDeg, rollDeg: e.rollDeg, acelG: e.acelG},
          salud: {mpu6050: 'normal'},
          inyeccion: {mpu6050: ev !== 'normal' || estado.fuente !== 'circuito'}
        }, origen);
      },
      // vuelve una consola a la lectura en vivo del circuito
      liberar: function (sec, origen) {
        var p = {inyeccion: {}};
        p.inyeccion[sec] = false;
        if (sec === 'tcrt5000') p.tcrt5000 = {desvioMm: 0};
        if (sec === 'motores') p.motores = {velocidadMs: LIMITES.vNominal};
        if (sec === 'mpu6050') p.mpu6050 = {evento: 'normal', pitchDeg: 0, rollDeg: 0, acelG: 1};
        return api.set(p, origen || 'consola');
      },
      // órdenes que no son lecturas (p. ej. dirección): las ejecuta el circuito; sin circuito se aplican al estado
      comando: function (tipo, valor, origen) {
        if (ordenes.length) ordenes.slice().forEach(function (fn) { fn(tipo, valor, origen || 'consola'); });
        else if (tipo === 'direccion') api.set({motores: {direccion: valor}}, origen || 'consola');
      },
      alComando: function (fn) {
        ordenes.push(fn);
        return function () { ordenes = ordenes.filter(function (f) { return f !== fn; }); };
      },
      // el simulador del circuito publica aquí sus lecturas; las consolas inyectadas conservan su valor
      publicarCircuito: function (l) {
        estado.fuente = 'circuito';
        estado.circuito = {encendido: !!l.encendido, modo: l.modo || 'auto'};
        var iny = estado.inyeccion;
        var h = estado.hcsr04, t = estado.tcrt5000, m = estado.motores, i = estado.mpu6050;
        if (!iny.hcsr04) h.distanciaCm = isFinite(l.distanciaCm) ? Math.min(l.distanciaCm, LIMITES.sinEcoCm) : LIMITES.sinEcoCm;
        h.atrasCm = isFinite(l.atrasCm) ? Math.min(l.atrasCm, LIMITES.sinEcoCm) : LIMITES.sinEcoCm;
        if (l.canales) t.canales = l.canales.slice(0, LIMITES.canalesTcrt);
        t.errorMm = clamp(l.desvioMm, -99, 99);
        if (!iny.tcrt5000) t.desvioMm = clamp(l.desvioMm, -LIMITES.desvioMaxMm, LIMITES.desvioMaxMm);
        m.velEfectivaMs = Math.abs(l.velEfectivaMs) < 0.005 ? 0 : l.velEfectivaMs;
        m.pwmIzq = Math.round(l.pwmIzq);
        m.pwmDer = Math.round(l.pwmDer);
        m.pwm = Math.round(Math.max(Math.abs(l.pwmIzq), Math.abs(l.pwmDer)));
        if (DIRECCIONES.indexOf(l.direccion) !== -1) m.direccion = l.direccion;
        m.bloqueado = !!l.bloqueado;
        if (!iny.mpu6050) {
          i.pitchDeg = l.pitchDeg || 0;
          i.rollDeg = l.rollDeg || 0;
          i.acelG = l.acelG || 1;
          i.evento = 'normal';
        }
        derivar(estado);
        emitir('circuito');
        return estado;
      },
      reset: function (origen) {
        var conservar = {seleccion: estado.seleccion, foco: estado.foco, fuente: estado.fuente, circuito: estado.circuito};
        var n = derivar(nominal());
        for (var k in n) if (k !== 'version') estado[k] = n[k];
        for (var c in conservar) estado[c] = conservar[c];
        derivar(estado);
        emitir(origen || 'reset');
        return estado;
      },
      subscribe: function (fn) {
        oyentes.push(fn);
        return function () { oyentes = oyentes.filter(function (f) { return f !== fn; }); };
      }
    };
    return api;
  }

  var SimulationState = crearEstado();
  raiz.SimulationState = SimulationState;

  // ================================================================== UI: consolas
  var doc = raiz.document;
  if (!doc) return;

  function $(id) { return doc.getElementById(id); }
  function todos(sel) { return Array.prototype.slice.call(doc.querySelectorAll(sel)); }
  function texto(id, t) { var el = $(id); if (el && el.textContent !== t) el.textContent = t; }
  function clase(id, c) { var el = $(id); if (el && el.className !== c) el.className = c; }
  function n1(v) { return (v >= 0 ? '+' : '') + v.toFixed(1); }
  function fmtCm(cm) {
    if (cm >= LIMITES.sinEcoCm) return 'sin eco';
    return cm < 100 ? Math.round(cm) + ' cm' : (cm / 100).toFixed(2) + ' m';
  }

  var anim = {radar: 0, radarDir: 1, osc: []};
  for (var q = 0; q < 64; q++) anim.osc.push(0);

  // Ajusta el canvas a su caja (nítido en pantallas retina) y devuelve contexto + tamaño CSS
  function lienzo(id) {
    var c = $(id);
    if (!c || !c.getContext) return null;
    var ctx = c.getContext('2d');
    if (!ctx) return null;
    var w = c.clientWidth || c.width;
    var h = c.clientHeight || c.height;
    var dpr = Math.min(raiz.devicePixelRatio || 1, 2);
    var W = Math.round(w * dpr), H = Math.round(h * dpr);
    if (c.clientWidth && (c.width !== W || c.height !== H)) { c.width = W; c.height = H; }
    if (ctx.setTransform) ctx.setTransform(c.clientWidth ? dpr : 1, 0, 0, c.clientWidth ? dpr : 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return {ctx: ctx, w: w, h: h};
  }

  var COL = {cian: '#00F2FE', ok: '#2EE6A8', aviso: '#F59E0B', peligro: '#EF4444', tenue: '#849495', linea: '#262A31', claro: '#E0FDFF'};

  function dibujarRadar(s) {
    var L = lienzo('hw-canvas-radar');
    if (!L) return;
    var ctx = L.ctx, w = L.w, h = L.h;
    var cx = w / 2, cy = h - 10, maxR = Math.min(w * 0.46, h - 16);
    var fallo = s.salud.hcsr04 === 'fallo';
    var d = s.hcsr04.distanciaCm;
    var z = s.hcsr04.zona;
    ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace';
    [[20, 'rgba(239,68,68,0.55)'], [50, 'rgba(245,158,11,0.5)'], [80, 'rgba(0,242,254,0.3)']].forEach(function (a) {
      var r = maxR * (a[0] / LIMITES.distMaxCm);
      ctx.beginPath();
      ctx.strokeStyle = a[1];
      ctx.arc(cx, cy, r, Math.PI, 0, false);
      ctx.stroke();
      ctx.fillStyle = COL.tenue;
      ctx.fillText(a[0] + '', cx + r - 14, cy - 2);
    });
    var ab = (15 * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, -Math.PI / 2 - ab * 2, -Math.PI / 2 + ab * 2, false);
    ctx.closePath();
    ctx.fillStyle = fallo ? 'rgba(239,68,68,0.08)' : z === 'critica' ? 'rgba(239,68,68,0.2)' : z === 'precaucion' ? 'rgba(245,158,11,0.14)' : 'rgba(0,242,254,0.1)';
    ctx.fill();
    if (fallo) {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SIN ECO · FALLO', cx, cy - maxR * 0.45);
      ctx.textAlign = 'left';
      return;
    }
    var col = z === 'critica' ? COL.peligro : z === 'precaucion' ? COL.aviso : COL.cian;
    var ang = -Math.PI / 2 + anim.radar;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    ctx.stroke();
    if (d <= LIMITES.distMaxCm) {
      var r = (d / LIMITES.distMaxCm) * maxR;
      ctx.beginPath();
      ctx.arc(cx, cy - r, 5, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    } else {
      ctx.fillStyle = COL.tenue;
      ctx.textAlign = 'center';
      ctx.fillText('> 80 cm', cx, cy - maxR - 2 + 10);
      ctx.textAlign = 'left';
    }
  }

  function dibujarOsc(s) {
    var L = lienzo('hw-canvas-osc');
    if (!L) return;
    var ctx = L.ctx, w = L.w, h = L.h;
    ctx.strokeStyle = COL.linea;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    if (s.salud.tcrt5000 === 'fallo') {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SIN SEÑAL ÓPTICA', w / 2, h / 2 + 4);
      ctx.textAlign = 'left';
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = s.tcrt5000.linea === 'centrada' ? COL.cian : COL.aviso;
    ctx.lineWidth = 2;
    var n = anim.osc.length;
    for (var i = 0; i < n; i++) {
      var x = (i / (n - 1)) * w;
      var y = h / 2 - (anim.osc[i] / 34) * (h * 0.44);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function dibujarVelo(s) {
    var L = lienzo('hw-canvas-vel');
    if (!L) return;
    var ctx = L.ctx, w = L.w, h = L.h;
    var cx = w / 2, cy = h - 13, r = Math.min(w * 0.36, h - 30);
    var fallo = s.salud.motores === 'fallo';
    var v = Math.abs(s.motores.velEfectivaMs);
    var f = clamp(v / LIMITES.vMax, 0, 1);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.strokeStyle = COL.linea;
    ctx.lineWidth = 8;
    ctx.stroke();
    if (!fallo && f > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, Math.PI + f * Math.PI, false);
      ctx.strokeStyle = s.motores.velEfectivaMs < 0 ? COL.aviso : COL.cian;
      ctx.stroke();
    }
    ctx.lineCap = 'butt';
    ctx.fillStyle = COL.tenue;
    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0', cx - r, cy + 11);
    ctx.fillText('0.23', cx, cy - r - 6);
    ctx.fillText('0.46', cx + r, cy + 11);
    ctx.textAlign = 'left';
    var ang = Math.PI + f * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * (r - 10), cy + Math.sin(ang) * (r - 10));
    ctx.strokeStyle = fallo ? COL.peligro : COL.claro;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = fallo ? COL.peligro : COL.cian;
    ctx.fill();
  }

  // Horizonte artificial: pitch desplaza, roll gira
  function dibujarHorizonte(s) {
    var L = lienzo('hw-canvas-imu');
    if (!L) return;
    var ctx = L.ctx, w = L.w, h = L.h;
    var cx = w / 2, cy = h / 2, R = Math.min(w, h) / 2 - 4;
    if (s.salud.mpu6050 === 'fallo') {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('I2C ✕', cx, cy + 4);
      ctx.textAlign = 'left';
      return;
    }
    var al = s.mpu6050.alerta;
    var col = al === 'impacto' || (al === 'inclinacion' && s.seguridad.estado === 'PARADA') ? COL.peligro : al ? COL.aviso : COL.cian;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.translate(cx, cy);
    ctx.rotate((-s.mpu6050.rollDeg * Math.PI) / 180);
    var off = (s.mpu6050.pitchDeg / LIMITES.anguloMaxDeg) * R;
    ctx.fillStyle = 'rgba(0,242,254,0.10)';
    ctx.fillRect(-R * 2, -R * 2, R * 4, R * 2 + off);
    ctx.fillStyle = 'rgba(132,148,149,0.18)';
    ctx.fillRect(-R * 2, off, R * 4, R * 2);
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-R * 2, off);
    ctx.lineTo(R * 2, off);
    ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = COL.claro;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.5, cy);
    ctx.lineTo(cx - R * 0.15, cy);
    ctx.lineTo(cx, cy + R * 0.12);
    ctx.lineTo(cx + R * 0.15, cy);
    ctx.lineTo(cx + R * 0.5, cy);
    ctx.stroke();
  }

  function badge(id, txt, tipo) {
    texto(id, txt);
    clase(id, 'hw-badge ' + tipo);
  }

  var SEG_TXT = {NOMINAL: 'NOMINAL', PRECAUCION: 'PRECAUCIÓN', PARADA: 'PARADA DE SEGURIDAD'};

  function render(s) {
    var sal = s.salud;
    var circuito = s.fuente === 'circuito';
    // ---- 1 · HC-SR04
    var h = s.hcsr04;
    var cardH = $('hw-card-hcsr04');
    if (cardH) cardH.setAttribute('data-estado', h.zona === 'fallo' || h.zona === 'critica' ? 'fallo' : h.zona === 'precaucion' || sal.hcsr04 === 'advertencia' ? 'advertencia' : 'normal');
    if (h.zona === 'fallo') badge('hw-badge-hcsr04', 'FALLO SENSOR', 'peligro');
    else if (h.zona === 'critica') badge('hw-badge-hcsr04', s.seguridad.estado === 'PARADA' ? 'PARADA' : '< 20 cm', 'peligro');
    else if (h.zona === 'precaucion') badge('hw-badge-hcsr04', 'PRECAUCIÓN', 'aviso');
    else if (sal.hcsr04 === 'advertencia') badge('hw-badge-hcsr04', 'ECO RUIDOSO', 'aviso');
    else badge('hw-badge-hcsr04', 'DESPEJADO', 'ok');
    texto('hw-val-dist', h.zona === 'fallo' ? '---' : fmtCm(h.distanciaCm));
    clase('hw-val-dist', 'hw-metric-v' + (h.zona === 'fallo' || h.zona === 'critica' ? ' peligro' : h.zona === 'precaucion' ? ' aviso' : ''));
    texto('hw-val-atras', h.atrasCm == null ? '—' : fmtCm(h.atrasCm));
    texto('hw-val-zona', {fallo: 'FALLO', critica: 'PARADA', precaucion: 'PRECAUCIÓN', libre: 'LIBRE'}[h.zona]);
    texto('hw-lbl-dist', h.zona === 'fallo' ? '---' : fmtCm(h.distanciaCm));

    // ---- 2 · TCRT5000
    var t = s.tcrt5000;
    var cardT = $('hw-card-tcrt5000');
    if (cardT) cardT.setAttribute('data-estado', t.linea === 'fallo' ? 'fallo' : t.linea !== 'centrada' || sal.tcrt5000 === 'advertencia' ? 'advertencia' : 'normal');
    if (t.linea === 'fallo') badge('hw-badge-tcrt5000', 'FALLO ÓPTICO', 'peligro');
    else if (t.linea === 'perdida') badge('hw-badge-tcrt5000', 'LÍNEA PERDIDA', 'peligro');
    else if (t.linea === 'deriva') badge('hw-badge-tcrt5000', 'DERIVA ALTA', 'aviso');
    else if (sal.tcrt5000 === 'advertencia') badge('hw-badge-tcrt5000', 'RUIDO ÓPTICO', 'aviso');
    else badge('hw-badge-tcrt5000', 'LÍNEA OK', 'ok');
    for (var c = 0; c < LIMITES.canalesTcrt; c++) {
      clase('hw-tcrt-s' + (c + 1), 'hw-tcrt-led' + (t.linea === 'fallo' ? ' fault' : t.canales[c] ? ' on' : ''));
    }
    var mk = $('hw-pid-marker');
    if (mk) {
      mk.style.display = t.linea === 'fallo' ? 'none' : 'block';
      mk.style.left = 50 + (clamp(t.errorMm, -LIMITES.desvioMaxMm, LIMITES.desvioMaxMm) / LIMITES.desvioMaxMm) * 44 + '%';
    }
    texto('hw-val-linea', t.linea === 'fallo' ? '--- mm' : Math.abs(t.errorMm) >= 99 ? 'fuera' : n1(t.errorMm) + ' mm');
    clase('hw-val-linea', 'hw-metric-v' + (t.linea === 'fallo' || t.linea === 'perdida' ? ' peligro' : t.linea === 'deriva' ? ' aviso' : ''));
    texto('hw-val-patron', t.linea === 'fallo' ? '----' : t.patron);
    texto('hw-lbl-linea', (t.desvioMm >= 0 ? '+' : '') + Math.round(t.desvioMm) + ' mm');

    // ---- 3 · Velocidad y dirección
    var m = s.motores;
    var falloM = sal.motores === 'fallo';
    var cardM = $('hw-card-motores');
    if (cardM) cardM.setAttribute('data-estado', falloM ? 'fallo' : m.bloqueado || sal.motores === 'advertencia' ? 'advertencia' : 'normal');
    var parado = circuito && s.circuito && !s.circuito.encendido;
    if (falloM) badge('hw-badge-motores', 'FALLO DRIVER', 'peligro');
    else if (m.bloqueado) badge('hw-badge-motores', 'BLOQUEADO', 'peligro');
    else if (sal.motores === 'advertencia') badge('hw-badge-motores', 'SOBRECORRIENTE', 'aviso');
    else if (parado) badge('hw-badge-motores', 'APAGADO', 'aviso');
    else badge('hw-badge-motores', m.direccion, m.direccion === 'DETENIDO' ? 'aviso' : 'ok');
    texto('hw-val-vel', falloM ? '--- m/s' : m.velEfectivaMs.toFixed(2) + ' m/s');
    clase('hw-val-vel', 'hw-metric-v' + (falloM || m.bloqueado ? ' peligro' : ''));
    texto('hw-val-pwm', falloM ? '--- %' : m.pwm + ' %');
    var bi = $('hw-bar-izq'), bd = $('hw-bar-der');
    if (bi) bi.style.width = Math.min(100, Math.abs(m.pwmIzq)) + '%';
    if (bd) bd.style.width = Math.min(100, Math.abs(m.pwmDer)) + '%';
    texto('hw-txt-izq', falloM ? '---' : m.pwmIzq + '%');
    texto('hw-txt-der', falloM ? '---' : m.pwmDer + '%');
    texto('hw-lbl-vel', m.velocidadMs.toFixed(2) + ' m/s');

    // ---- 4 · MPU-6050
    var i = s.mpu6050;
    var falloI = sal.mpu6050 === 'fallo';
    var cardI = $('hw-card-mpu6050');
    if (cardI) cardI.setAttribute('data-estado', falloI || i.alerta === 'impacto' ? 'fallo' : i.alerta || sal.mpu6050 === 'advertencia' ? 'advertencia' : 'normal');
    if (falloI) badge('hw-badge-mpu6050', 'FALLO IMU', 'peligro');
    else if (i.alerta === 'impacto') badge('hw-badge-mpu6050', 'IMPACTO', 'peligro');
    else if (i.alerta === 'inclinacion') badge('hw-badge-mpu6050', 'INCLINACIÓN', s.seguridad.estado === 'PARADA' ? 'peligro' : 'aviso');
    else if (i.alerta === 'atascamiento') badge('hw-badge-mpu6050', 'ATASCAMIENTO', 'aviso');
    else if (sal.mpu6050 === 'advertencia') badge('hw-badge-mpu6050', 'DERIVA GYRO', 'aviso');
    else badge('hw-badge-mpu6050', 'ESTABILIDAD OK', 'ok');
    texto('hw-val-pitch', falloI ? '--- °' : n1(i.pitchDeg) + '°');
    texto('hw-val-roll', falloI ? '--- °' : n1(i.rollDeg) + '°');
    texto('hw-val-acel', falloI ? '--- g' : i.acelG.toFixed(2) + ' g');
    clase('hw-val-acel', 'hw-metric-v' + (falloI || i.alerta === 'impacto' ? ' peligro' : ''));
    texto('hw-lbl-pitch', Math.round(i.pitchDeg) + '°');
    texto('hw-lbl-roll', Math.round(i.rollDeg) + '°');

    // ---- Seguridad, fuente de datos y botones "Vivo"
    var seg = s.seguridad.estado;
    var root = $('hw-inspector-root');
    if (root) {
      root.setAttribute('data-seguridad', seg.toLowerCase());
      root.setAttribute('data-foco', s.foco || '');
    }
    texto('hw-seguridad-estado', SEG_TXT[seg]);
    texto('hw-seguridad-motivo', s.seguridad.motivos[0] || 'Todos los sensores en rango');
    texto('hw-fuente', !circuito ? 'CONSOLAS · LOCAL' : 'CIRCUITO · ' + (s.circuito.modo === 'manual' ? 'MANUAL' : 'AUTO') + ' · ' + (s.circuito.encendido ? 'EN MARCHA' : 'APAGADO'));
    todos('[data-vivo]').forEach(function (b) {
      var iny = !!s.inyeccion[b.getAttribute('data-vivo')];
      var txt = iny ? '◆ Iny.' : '● Vivo';
      if (b.textContent !== txt) b.textContent = txt;
      b.classList.toggle('iny', iny);
      b.setAttribute('aria-pressed', String(!iny));
      b.setAttribute('title', iny ? 'Valor inyectado desde la consola: toca para volver a la lectura del circuito' : 'Lectura en vivo del circuito');
    });

    // ---- Sincroniza controles (si el cambio vino de otra parte)
    sincValor('hw-in-dist', Math.round(clamp(h.distanciaCm, LIMITES.distMinCm, LIMITES.distMaxCm)));
    sincValor('hw-in-linea', Math.round(t.desvioMm));
    sincValor('hw-in-vel', m.velocidadMs.toFixed(2));
    sincValor('hw-in-pitch', Math.round(i.pitchDeg));
    sincValor('hw-in-roll', Math.round(i.rollDeg));
    todos('[data-dir]').forEach(function (b) {
      var on = b.getAttribute('data-dir') === m.direccion && !parado;
      b.classList.toggle('activo', on);
      b.setAttribute('aria-pressed', String(on));
    });
    todos('[data-mpu-ev]').forEach(function (b) {
      var on = b.getAttribute('data-mpu-ev') === i.evento && !falloI;
      b.classList.toggle('activo', on);
      b.setAttribute('aria-pressed', String(on));
    });
    todos('[data-st-card]').forEach(function (b) {
      var on = sal[b.getAttribute('data-st-card')] === b.getAttribute('data-st-val');
      b.classList.toggle('activo', on);
      b.setAttribute('aria-pressed', String(on));
    });

    // ---- Foco: la consola de la pieza enfocada sube al inicio y su ficha técnica va justo debajo
    var consolaFoco = s.foco ? CONSOLA_DE[s.foco] : null;
    todos('.hw-card').forEach(function (card) {
      var id = card.getAttribute('data-card');
      var enfocada = !!consolaFoco && id === consolaFoco;
      card.classList.toggle('resaltada', id === s.seleccion || enfocada);
      card.classList.toggle('enfocada', enfocada);
      card.style.order = enfocada ? '-2' : '0';
    });
    var ficha = $('hw-ficha');
    if (ficha) {
      ficha.hidden = !s.foco;
      ficha.style.order = '-1';
    }
    var cerrar = $('hw-foco-cerrar');
    if (cerrar) cerrar.hidden = !s.foco;
    texto('hw-panel-titulo', s.foco ? 'Enfocado · ' + (NOMBRES[s.foco] || s.foco) : 'Vista general · 4 consolas en vivo');

    dibujarRadar(s);
    dibujarOsc(s);
    dibujarVelo(s);
    dibujarHorizonte(s);
  }

  function sincValor(id, v) {
    var el = $(id);
    if (el && el !== doc.activeElement && String(el.value) !== String(v)) el.value = String(v);
  }

  function enSlider(id, fn) {
    var el = $(id);
    if (!el) return;
    el.addEventListener('input', function (e) { fn(Number(e.target.value)); });
  }

  function tick() {
    anim.radar += anim.radarDir * 0.04;
    if (anim.radar > 0.5) { anim.radar = 0.5; anim.radarDir = -1; }
    if (anim.radar < -0.5) { anim.radar = -0.5; anim.radarDir = 1; }
    var s = SimulationState.get();
    var ruido = s.salud.tcrt5000 === 'advertencia' ? (Math.random() - 0.5) * 6 : s.fuente === 'circuito' ? 0 : (Math.random() - 0.5) * 1.2;
    anim.osc.push(clamp(s.tcrt5000.errorMm + ruido, -32, 32));
    if (anim.osc.length > 64) anim.osc.shift();
    if (doc.hidden) return;
    dibujarRadar(s);
    dibujarOsc(s);
  }

  function iniciar() {
    if (!$('hw-inspector-root')) return;
    var S = SimulationState;

    enSlider('hw-in-dist', function (v) { S.set({hcsr04: {distanciaCm: v}, inyeccion: {hcsr04: true}, seleccion: 'hcsr04'}, 'consola'); });
    enSlider('hw-in-linea', function (v) { S.set({tcrt5000: {desvioMm: v}, inyeccion: {tcrt5000: true}, seleccion: 'tcrt5000'}, 'consola'); });
    enSlider('hw-in-vel', function (v) { S.set({motores: {velocidadMs: v}, inyeccion: {motores: true}, seleccion: 'motores'}, 'consola'); });
    enSlider('hw-in-pitch', function (v) { S.set({mpu6050: {pitchDeg: v, evento: 'normal', acelG: 1}, inyeccion: {mpu6050: true}, seleccion: 'mpu6050'}, 'consola'); });
    enSlider('hw-in-roll', function (v) { S.set({mpu6050: {rollDeg: v, evento: 'normal', acelG: 1}, inyeccion: {mpu6050: true}, seleccion: 'mpu6050'}, 'consola'); });

    todos('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () {
        S.set({seleccion: 'motores'}, 'consola');
        S.comando('direccion', b.getAttribute('data-dir'));
      });
    });
    todos('[data-mpu-ev]').forEach(function (b) {
      b.addEventListener('click', function () {
        S.set({seleccion: 'mpu6050'}, 'consola');
        S.eventoMpu(b.getAttribute('data-mpu-ev'), 'consola');
      });
    });
    todos('[data-st-card]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = {salud: {}, seleccion: b.getAttribute('data-st-card')};
        p.salud[b.getAttribute('data-st-card')] = b.getAttribute('data-st-val');
        S.set(p, 'consola');
      });
    });
    todos('[data-vivo]').forEach(function (b) {
      b.addEventListener('click', function () { S.liberar(b.getAttribute('data-vivo'), 'consola'); });
    });
    // el título de cada consola enfoca su pieza (y su ficha técnica); otro toque vuelve a la vista general
    todos('[data-foco]').forEach(function (b) {
      b.addEventListener('click', function () {
        var pieza = b.getAttribute('data-foco');
        var mismo = S.get().foco === pieza;
        S.set({foco: mismo ? null : pieza, seleccion: mismo ? null : CONSOLA_DE[pieza]}, 'consola');
      });
    });
    var cerrar = $('hw-foco-cerrar');
    if (cerrar) cerrar.addEventListener('click', function () { S.set({foco: null, seleccion: null}, 'consola'); });
    var reset = $('hw-btn-reset');
    if (reset) reset.addEventListener('click', function () { S.reset('consola'); });

    // lecturas del circuito a ~60 Hz: la consola se repinta como mucho cada 80 ms
    var ultimo = 0;
    var pendiente = false;
    var ahora = function () { return raiz.performance && raiz.performance.now ? raiz.performance.now() : Date.now(); };
    S.subscribe(function (s, origen) {
      if (origen === 'circuito') {
        var t = ahora();
        if (t - ultimo < 80) {
          if (!pendiente && raiz.setTimeout) {
            pendiente = true;
            raiz.setTimeout(function () { pendiente = false; ultimo = ahora(); render(S.get()); }, 90);
          }
          return;
        }
        ultimo = t;
      }
      render(s);
    });
    render(S.get());
    (raiz.setInterval || setInterval)(tick, 60);
    if (raiz.addEventListener) raiz.addEventListener('resize', function () { render(S.get()); });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})(typeof window !== 'undefined' ? window : globalThis);
