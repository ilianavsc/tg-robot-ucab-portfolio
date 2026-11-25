/* ==========================================================================
   P06 · RUTA LINEAL CON REPOSICIONAMIENTO MANUAL · núcleo de la simulación (SIL)
   --------------------------------------------------------------------------
   Un solo estado central (SimulationState) con la máquina de estados del ciclo
     EN_BASE → EN_RUTA_IDA → ESPERA_REPOSICION → (giro 180° + confirmación)
             → EN_RUTA_RETORNO → EN_BASE
   y los sensores que la acompañan: regleta de 4 TCRT5000, HC-SR04 frontal,
   velocidad/PWM de la tracción diferencial y MPU-6050 (rumbo, pitch, roll).
   Sin DOM y sin dependencias: corre igual en el navegador y en Node (pruebas).
   Datos sintéticos: nada viene del robot real.
   ========================================================================== */
(function (raiz) {
  'use strict';

  // Parámetros reales únicos del robot (assets/js/parametros_robot.js): navegador → window.TG_ROBOT, Node → require
  var P = raiz.TG_ROBOT || (typeof require === 'function' ? require('../../assets/js/parametros_robot.js') : null);
  if (!P) throw new Error('P06: falta assets/js/parametros_robot.js (TG_ROBOT)');

  // ------------------------------------------------------------------ geometría y límites (m, s)
  var GEO = {
    largo: 6.0, // pasillo: de la pared de la base (x = 0) a la pared del fondo (x = largo)
    anchoPasillo: 0.9,
    cinta: P.tcrt5000.cintaMm / 1000, // cinta negra de 19 mm
    huella: 0.004, // radio de la huella de cada TCRT5000 (supuesto)
    marcaBase: 0.45, // centro de la marca transversal de la base (inicio)
    marcaParada: 5.55, // centro de la marca transversal de parada (destino)
    anchoMarca: 0.03,
    tcrtAdelante: 0.112, // la regleta va 11,2 cm adelante del centro del robot
    tcrtLat: P.tcrt5000.posicionesMm.map(function (mm) { return -mm / 1000; }), // S1…S4 (+ a la izquierda), 18 mm entre sí
    usAdelante: 0.109, // cara del HC-SR04 frontal
    largoRobot: 0.21,
    anchoRobot: 0.14,
    radioObstaculo: 0.05,
    zonaLenta: 0.4 // últimos 40 cm antes de una marca: aproximación lenta (odometría)
  };
  // Puntos de control intermedios del gemelo digital: repartidos en cuartos entre la marca de la base y la de parada.
  // Son marcadores de seguimiento (no cambian la máquina de estados ni la lectura de la regleta).
  GEO.puntosControl = [1, 2, 3].map(function (k) {
    return {id: 'PC' + k, x: Math.round((GEO.marcaBase + ((GEO.marcaParada - GEO.marcaBase) * k) / 4) * 1000) / 1000};
  });
  var LIM = {
    vMax: P.velocidad.maxMs, // m/s (PWM 0,8 × 0,57 m/s, como el Simulador 1)
    vPwm100: P.velocidad.pwm100Ms, // m/s al 100 % de PWM
    vNominal: 0.4,
    vMin: 0.1,
    vAproximacion: 0.12,
    acel: 0.8, // m/s²
    freno: 2.0, // m/s²
    distMinCm: P.hcsr04.minCm,
    distMaxCm: P.hcsr04.maxCm,
    alcanceM: P.hcsr04.alcanceCm / 100, // HC-SR04: sin eco más allá de 4 m
    paradaM: P.hcsr04.paradaCm / 100, // < 20 cm: bloqueo por obstáculo
    precaucionM: P.hcsr04.precaucionCm / 100, // 20–50 cm: reduce la velocidad
    canales: P.tcrt5000.canales,
    giroSeg: 2.4, // duración de la animación del giro manual de 180°
    alineaSeg: 1.6, // [SUPUESTO DE SIMULACIÓN] giro automático de 180° en la base (sobre la marca de inicio)
    toleranciaYawDeg: 5
  };
  var ESTADOS = ['EN_BASE', 'EN_RUTA_IDA', 'ESPERA_REPOSICION', 'EN_RUTA_RETORNO'];
  var EVENTOS_IMU = {
    normal: {pitch: 0, roll: 0, g: 1},
    inclinacion: {pitch: 24, roll: -18, g: 1.1},
    impacto: {pitch: 8, roll: 5, g: 2.85}
  };
  var DEG = 180 / Math.PI;

  function clamp(v, lo, hi) {
    v = Number(v);
    if (!isFinite(v)) v = lo;
    return Math.max(lo, Math.min(hi, v));
  }
  function norm360(a) { return ((a % 360) + 360) % 360; }

  function inicial() {
    return {
      ruta: {
        estado: 'EN_BASE',
        ciclo: 0,
        t: 0, // tiempo de simulación (s)
        sub: null, // null | 'alineando' (giro automático en la base) | 'girando' (reposición manual)
        giro: 0, // progreso del giro 0…1
        listoParaIda: true // en la base mirando hacia el destino
      },
      robot: {x: 0.6, y: 0, dir: 1, psi: 0, yawGiro: 0, v: 0, w: 0, odometro: 0},
      obstaculo: null, // {x} en el pasillo, o null
      // puntos de control: ida = cruzado en la ida del ciclo actual; retorno = cruzado de vuelta
      puntosControl: GEO.puntosControl.map(function (p) { return {id: p.id, x: p.x, ida: false, retorno: false}; }),
      consigna: LIM.vNominal,
      hcsr04: {distanciaM: Infinity, zona: 'libre'},
      tcrt5000: {canales: [0, 1, 1, 0], patron: '0110', lectura: 'siguiendo', errorMm: 0},
      motores: {pwmIzq: 0, pwmDer: 0, pwm: 0, v: 0, direccion: 'DETENIDO', bloqueado: true, motivoBloqueo: 'En la base: esperando inicio'},
      mpu6050: {yawDeg: 0, pitchDeg: 0, rollDeg: 0, acelG: 1, evento: 'normal', alerta: null},
      seguridad: {estado: 'NOMINAL', motivo: 'En la base, listo para iniciar'},
      alarma: {activa: false, silenciada: false, texto: ''},
      eventos: [],
      version: 0
    };
  }

  // ------------------------------------------------------------------ sensores (puros)
  // Lectura de la regleta: la cinta va por y = 0 a lo largo del pasillo y hay dos marcas transversales
  function leerTcrt(rb) {
    var c = Math.cos(rb.psi), s = Math.sin(rb.psi);
    return GEO.tcrtLat.map(function (lat) {
      // posición del sensor en el mundo (x a lo largo, y a la izquierda del sentido de ida)
      var adel = GEO.tcrtAdelante;
      var lx = adel * c - lat * s; // marco del robot rotado por el error de rumbo psi
      var ly = adel * s + lat * c;
      var px = rb.x + rb.dir * lx;
      var py = rb.y + rb.dir * ly;
      var r = GEO.cinta / 2 + GEO.huella;
      var enCinta = Math.abs(py) <= r && px >= GEO.marcaBase - GEO.anchoMarca && px <= GEO.marcaParada + GEO.anchoMarca;
      var m = GEO.anchoMarca / 2 + GEO.huella;
      var enMarca = Math.abs(py) <= 0.06 && (Math.abs(px - GEO.marcaBase) <= m || Math.abs(px - GEO.marcaParada) <= m);
      return enCinta || enMarca ? 1 : 0;
    });
  }

  // Distancia del HC-SR04 frontal al obstáculo inyectado o a la pared que tiene enfrente
  function leerUltrasonido(rb, obstaculo) {
    var cara = rb.x + rb.dir * GEO.usAdelante;
    var d = rb.dir > 0 ? GEO.largo - cara : cara; // pared del fondo o de la base
    if (obstaculo) {
      var dObs = rb.dir * (obstaculo.x - cara) - GEO.radioObstaculo;
      if (dObs >= -GEO.radioObstaculo && dObs < d) d = Math.max(0.02, dObs);
    }
    return d > LIM.alcanceM ? Infinity : d;
  }

  function zonaDe(d) {
    if (d < LIM.paradaM) return 'critica';
    if (d < LIM.precaucionM) return 'precaucion';
    return 'libre';
  }

  function lecturaLinea(p) {
    if (p === '1111') return 'marca';
    if (p === '0000') return 'perdida';
    return 'siguiendo';
  }

  // ------------------------------------------------------------------ simulación
  function crearSimulacion(opciones) {
    opciones = opciones || {};
    var e = inicial();
    var oyentes = [];
    var semilla = opciones.semilla == null ? 7 : opciones.semilla;
    var azar = function () { // determinista: las pruebas no dependen de Math.random
      semilla = (semilla * 16807) % 2147483647;
      return (semilla - 1) / 2147483646;
    };
    var prevV = 0;
    var obstaculoAvisado = false;

    function registrar(texto, tipo) {
      e.eventos.unshift({t: Math.round(e.ruta.t * 10) / 10, texto: texto, tipo: tipo || 'info'});
      if (e.eventos.length > 40) e.eventos.length = 40;
    }
    function emitir(origen) {
      e.version++;
      oyentes.slice().forEach(function (fn) {
        try { fn(e, origen); } catch (err) { if (raiz.console) raiz.console.error(err); }
      });
    }
    function cambiarEstado(nuevo, texto) {
      e.ruta.estado = nuevo;
      registrar(texto || nuevo, nuevo === 'ESPERA_REPOSICION' ? 'alarma' : 'estado');
    }

    // lecturas y seguridad a partir del estado actual (sin mover nada)
    function medir() {
      var rb = e.robot;
      var d = leerUltrasonido(rb, e.obstaculo);
      e.hcsr04.distanciaM = d;
      e.hcsr04.zona = zonaDe(d);
      var girando = e.ruta.sub === 'girando' || e.ruta.sub === 'alineando';
      var can = girando && e.ruta.giro > 0.08 && e.ruta.giro < 0.92 ? [0, 0, 0, 0] : leerTcrt(rb);
      e.tcrt5000.canales = can;
      e.tcrt5000.patron = can.join('');
      e.tcrt5000.lectura = lecturaLinea(e.tcrt5000.patron);
      e.tcrt5000.errorMm = Math.round(-rb.y * rb.dir * 1000 * 10) / 10; // + la cinta queda a la derecha

      var imu = EVENTOS_IMU[e.mpu6050.evento] || EVENTOS_IMU.normal;
      var mov = Math.abs(rb.v) > 0.02 ? 1 : 0;
      var dv = rb.v - prevV;
      e.mpu6050.pitchDeg = Math.round((imu.pitch + mov * 0.3 * Math.sin(e.ruta.t * 23) + clamp(dv * 40, -2, 2)) * 10) / 10;
      e.mpu6050.rollDeg = Math.round((imu.roll + mov * 0.2 * Math.sin(e.ruta.t * 17)) * 10) / 10;
      e.mpu6050.acelG = Math.round((imu.g + mov * 0.01 * Math.sin(e.ruta.t * 31)) * 100) / 100;
      var yawBase = rb.dir > 0 ? 0 : 180;
      e.mpu6050.yawDeg = Math.round(norm360(yawBase + rb.yawGiro + rb.psi * DEG) * 10) / 10;
      e.mpu6050.alerta = e.mpu6050.evento === 'impacto' ? 'impacto' : e.mpu6050.evento === 'inclinacion' ? 'inclinacion' : null;

      var m = e.motores;
      var bloqueos = [];
      if (e.ruta.estado === 'ESPERA_REPOSICION') bloqueos.push('Espera de reposición: motores bloqueados');
      if (e.mpu6050.alerta === 'impacto') bloqueos.push('Impacto detectado (' + e.mpu6050.acelG.toFixed(2) + ' g)');
      var enRuta = e.ruta.estado === 'EN_RUTA_IDA' || e.ruta.estado === 'EN_RUTA_RETORNO';
      if (enRuta && e.hcsr04.zona === 'critica' && !girando) bloqueos.push('Obstáculo a ' + Math.round(d * 100) + ' cm (< 20 cm)');
      if (e.ruta.estado === 'EN_BASE') bloqueos.push('En la base: esperando inicio');
      m.bloqueado = bloqueos.length > 0 && !(e.ruta.estado === 'EN_BASE' && e.ruta.sub);
      m.motivoBloqueo = bloqueos[0] || '';

      var critico = e.mpu6050.alerta === 'impacto' || (enRuta && e.hcsr04.zona === 'critica' && !girando);
      var aviso = e.ruta.estado === 'ESPERA_REPOSICION' || e.mpu6050.alerta === 'inclinacion' || (enRuta && e.hcsr04.zona === 'precaucion') || (enRuta && e.tcrt5000.lectura === 'perdida' && !girando);
      e.seguridad.estado = critico ? 'PARADA' : aviso ? 'PRECAUCION' : 'NOMINAL';
      e.seguridad.motivo = critico ? bloqueos.filter(function (b) { return !/Espera|base/.test(b); })[0] || bloqueos[0]
        : e.ruta.estado === 'ESPERA_REPOSICION' ? 'Destino alcanzado: reposicionar el robot 180°'
        : e.mpu6050.alerta === 'inclinacion' ? 'Inclinación > 20°: avanza despacio'
        : enRuta && e.hcsr04.zona === 'precaucion' ? 'Obstáculo a ' + Math.round(d * 100) + ' cm: reduce la velocidad'
        : enRuta && e.tcrt5000.lectura === 'perdida' && !girando ? 'Línea perdida'
        : e.ruta.estado === 'EN_BASE' ? 'En la base, listo para iniciar' : 'Siguiendo la línea';

      e.alarma.activa = e.ruta.estado === 'ESPERA_REPOSICION';
      e.alarma.texto = e.alarma.activa ? 'Destino alcanzado — reposicionar robot 180° para retorno' : '';
    }

    // velocidad objetivo según estado, marcas cercanas (odometría) y seguridad
    function vObjetivo() {
      var rb = e.robot;
      var est = e.ruta.estado;
      if (est !== 'EN_RUTA_IDA' && est !== 'EN_RUTA_RETORNO') return 0;
      if (e.ruta.sub) return 0;
      if (e.motores.bloqueado) return 0;
      var v = e.consigna;
      var sensorX = rb.x + rb.dir * GEO.tcrtAdelante;
      var meta = est === 'EN_RUTA_IDA' ? GEO.marcaParada : GEO.marcaBase;
      var falta = rb.dir * (meta - sensorX);
      if (falta < GEO.zonaLenta) v = Math.min(v, LIM.vAproximacion);
      if (e.hcsr04.zona === 'precaucion') {
        var k = (e.hcsr04.distanciaM - LIM.paradaM) / (LIM.precaucionM - LIM.paradaM);
        v = Math.min(v, Math.max(LIM.vAproximacion, v * (0.45 + 0.55 * k)));
      }
      if (e.mpu6050.alerta === 'inclinacion') v = Math.min(v, 0.15);
      return v;
    }

    function llegada() {
      var rb = e.robot;
      var est = e.ruta.estado;
      if (est !== 'EN_RUTA_IDA' && est !== 'EN_RUTA_RETORNO') return;
      var sensorX = rb.x + rb.dir * GEO.tcrtAdelante;
      var meta = est === 'EN_RUTA_IDA' ? GEO.marcaParada : GEO.marcaBase;
      // la regleta pisa la marca transversal (1111): frena y cambia de estado
      if (e.tcrt5000.patron === '1111' && Math.abs(sensorX - meta) < 0.03) {
        rb.v = 0;
        rb.w = 0;
        if (est === 'EN_RUTA_IDA') {
          cambiarEstado('ESPERA_REPOSICION', 'Destino alcanzado (marca 1111): motores bloqueados, alarma activa');
        } else {
          e.ruta.listoParaIda = false;
          cambiarEstado('EN_BASE', 'Llegó a la base: ciclo ' + e.ruta.ciclo + ' completo');
        }
      }
    }

    function paso(dt) {
      dt = clamp(dt, 0, 0.1);
      var rb = e.robot;
      e.ruta.t += dt;
      // animaciones de giro (manual en el destino, automático en la base)
      if (e.ruta.sub) {
        var dur = e.ruta.sub === 'girando' ? LIM.giroSeg : LIM.alineaSeg;
        e.ruta.giro = Math.min(1, e.ruta.giro + dt / dur);
        var suave = e.ruta.giro * e.ruta.giro * (3 - 2 * e.ruta.giro);
        rb.yawGiro = 180 * suave;
        rb.v = 0;
        if (e.ruta.giro >= 1) terminarGiro();
      } else {
        var xAntes = rb.x;
        var obj = vObjetivo();
        var a = obj > rb.v ? LIM.acel : LIM.freno;
        rb.v = rb.v + clamp(obj - rb.v, -a * dt, a * dt);
        if (e.motores.bloqueado) rb.v = obj === 0 && Math.abs(rb.v) < 0.03 ? 0 : rb.v;
        // seguidor de línea PD sobre el error lateral (con un vaivén leve para que la regleta varíe)
        var err = -rb.y; // la cinta está en y = 0
        var vaiven = 0.0045 * Math.sin(e.ruta.t * 2.3) + 0.002 * Math.sin(e.ruta.t * 5.1);
        var psiObj = clamp((err + vaiven * rb.dir) * 6, -0.25, 0.25);
        rb.w = rb.v > 0.01 ? clamp((psiObj - rb.psi) * 5, -1.5, 1.5) : 0;
        rb.psi += rb.w * dt;
        rb.y += rb.v * Math.sin(rb.psi) * dt;
        rb.x += rb.dir * rb.v * Math.cos(rb.psi) * dt;
        rb.x = clamp(rb.x, GEO.largoRobot / 2, GEO.largo - GEO.largoRobot / 2);
        rb.odometro += rb.v * dt;
        cruzarPuntos(xAntes, rb.x);
      }
      medir();
      llegada();
      medir();
      actualizarMotores();
      prevV = rb.v;
      emitir('paso');
      return e;
    }

    // el centro del robot cruza un punto de control en el sentido del tramo actual
    function cruzarPuntos(x0, x1) {
      var est = e.ruta.estado;
      e.puntosControl.forEach(function (p) {
        if (est === 'EN_RUTA_IDA' && !p.ida && x0 < p.x && x1 >= p.x) {
          p.ida = true;
          registrar('Punto de control ' + p.id + ' (ida) a ' + p.x.toFixed(2) + ' m', 'ok');
        } else if (est === 'EN_RUTA_RETORNO' && !p.retorno && x0 > p.x && x1 <= p.x) {
          p.retorno = true;
          registrar('Punto de control ' + p.id + ' (retorno) a ' + p.x.toFixed(2) + ' m', 'ok');
        }
      });
    }

    function actualizarMotores() {
      var m = e.motores, rb = e.robot;
      var base = (rb.v / LIM.vPwm100) * 100;
      var dif = rb.w * 0.09 / LIM.vPwm100 * 100; // vía 18 cm
      if (e.ruta.sub) {
        // en la base gira solo (una rueda adelante, la otra atrás); en el destino lo gira el operador a mano
        var giroPwm = e.ruta.sub === 'alineando' && e.ruta.giro < 1 ? 35 : 0;
        m.pwmIzq = -giroPwm;
        m.pwmDer = giroPwm;
      } else {
        m.pwmIzq = Math.round(base - dif);
        m.pwmDer = Math.round(base + dif);
      }
      m.pwm = Math.round(Math.max(Math.abs(m.pwmIzq), Math.abs(m.pwmDer)));
      m.v = Math.round(rb.v * 100) / 100;
      m.direccion = e.ruta.sub ? 'GIRO' : rb.v < 0.01 ? 'DETENIDO' : rb.dir > 0 ? 'IDA' : 'RETORNO';
    }

    function terminarGiro() {
      var rb = e.robot;
      var tipo = e.ruta.sub;
      rb.dir = -rb.dir;
      rb.yawGiro = 0;
      rb.psi = 0;
      e.ruta.sub = null;
      e.ruta.giro = 0;
      if (tipo === 'girando') {
        // el operador deja el robot sobre la cinta, con un pequeño error lateral
        rb.y = (azar() - 0.5) * 0.008;
        medir();
        var yawOk = Math.abs(((e.mpu6050.yawDeg - 180 + 540) % 360) - 180) <= LIM.toleranciaYawDeg;
        var lineaOk = e.tcrt5000.lectura !== 'perdida';
        if (yawOk && lineaOk) {
          registrar('Operador confirmó el giro de 180° (rumbo ' + Math.round(e.mpu6050.yawDeg) + '°): motores desbloqueados', 'ok');
          cambiarEstado('EN_RUTA_RETORNO', 'Retorno automático a la base');
        } else {
          registrar('Confirmación rechazada: el robot no quedó a 180° sobre la línea', 'alarma');
        }
      } else {
        e.ruta.listoParaIda = true;
        registrar('Alineado en la base: mirando hacia el destino', 'info');
        cambiarEstado('EN_RUTA_IDA', 'Ida: sigue la línea hacia el destino');
      }
    }

    // ---------------------------------------------------------------- acciones del operador
    var api = {
      GEO: GEO,
      LIMITES: LIM,
      ESTADOS: ESTADOS,
      get: function () { return e; },
      subscribe: function (fn) {
        oyentes.push(fn);
        return function () { oyentes = oyentes.filter(function (f) { return f !== fn; }); };
      },
      paso: paso,
      iniciarIda: function () {
        if (e.ruta.estado !== 'EN_BASE' || e.ruta.sub) {
          registrar('Iniciar ida no permitido en ' + e.ruta.estado, 'alarma');
          emitir('accion');
          return false;
        }
        e.ruta.ciclo++;
        e.puntosControl.forEach(function (p) { p.ida = false; p.retorno = false; }); // ciclo nuevo: puntos sin cruzar
        registrar('Ciclo ' + e.ruta.ciclo + ': inicio de ida', 'estado');
        if (!e.ruta.listoParaIda) {
          // al volver quedó mirando a la base: gira solo sobre la marca de inicio antes de salir
          e.ruta.sub = 'alineando';
          e.ruta.giro = 0;
          registrar('Giro automático de 180° en la base [supuesto de simulación]', 'info');
        } else {
          cambiarEstado('EN_RUTA_IDA', 'Ida: sigue la línea hacia el destino');
        }
        medir();
        actualizarMotores();
        emitir('accion');
        return true;
      },
      // el operador gira el robot 180° sobre la línea; al terminar la animación se valida la confirmación
      girarYConfirmar: function () {
        if (e.ruta.estado !== 'ESPERA_REPOSICION' || e.ruta.sub) {
          registrar('Girar 180° solo se permite en ESPERA_REPOSICION', 'alarma');
          emitir('accion');
          return false;
        }
        e.ruta.sub = 'girando';
        e.ruta.giro = 0;
        registrar('Operador gira el robot 180° sobre la línea…', 'info');
        medir();
        actualizarMotores();
        emitir('accion');
        return true;
      },
      // obstáculo en el pasillo, a d cm de la cara del HC-SR04 (5–80 cm); sin argumento, a 60 cm
      inyectarObstaculo: function (cm) {
        var d = clamp(cm == null ? 60 : cm, LIM.distMinCm, LIM.distMaxCm) / 100;
        var rb = e.robot;
        var x = rb.x + rb.dir * (GEO.usAdelante + d + GEO.radioObstaculo);
        e.obstaculo = {x: clamp(x, 0.08, GEO.largo - 0.08), cm: Math.round(d * 100)}; // cm: distancia pedida (la consola la muestra)
        if (cm == null || !obstaculoAvisado) registrar('Obstáculo inyectado a ' + Math.round(d * 100) + ' cm al frente', 'alarma');
        obstaculoAvisado = cm != null; // el slider manda muchos valores seguidos: se registra solo el primero
        medir();
        actualizarMotores();
        emitir('accion');
        return e.obstaculo;
      },
      quitarObstaculo: function () {
        if (!e.obstaculo) return false;
        e.obstaculo = null;
        obstaculoAvisado = false;
        registrar('Obstáculo retirado del pasillo', 'ok');
        medir();
        actualizarMotores();
        emitir('accion');
        return true;
      },
      setConsigna: function (v) {
        e.consigna = Math.round(clamp(v, LIM.vMin, LIM.vMax) * 100) / 100;
        emitir('accion');
        return e.consigna;
      },
      eventoImu: function (ev) {
        if (!EVENTOS_IMU[ev]) ev = 'normal';
        if (ev !== e.mpu6050.evento) registrar(ev === 'normal' ? 'IMU normal' : ev === 'impacto' ? 'Impacto: parada de seguridad' : 'Inclinación > 20°', ev === 'normal' ? 'ok' : 'alarma');
        e.mpu6050.evento = ev;
        medir();
        actualizarMotores();
        emitir('accion');
        return ev;
      },
      silenciar: function (on) {
        e.alarma.silenciada = on == null ? !e.alarma.silenciada : Boolean(on);
        emitir('accion');
        return e.alarma.silenciada;
      },
      reiniciar: function () {
        var sil = e.alarma.silenciada;
        var n = inicial();
        for (var k in n) if (k !== 'version') e[k] = n[k];
        e.alarma.silenciada = sil;
        prevV = 0;
        registrar('Simulación reiniciada: robot en la base', 'info');
        medir();
        actualizarMotores();
        emitir('reiniciar');
        return e;
      }
    };
    medir();
    actualizarMotores();
    registrar('Robot en la base, listo para iniciar', 'info');
    return api;
  }

  var exporta = {crearSimulacion: crearSimulacion, leerTcrt: leerTcrt, leerUltrasonido: leerUltrasonido, zonaDe: zonaDe, GEO: GEO, LIMITES: LIM, ESTADOS: ESTADOS};
  if (typeof module !== 'undefined' && module.exports) module.exports = exporta;
  raiz.RutaLineal = exporta;
  if (raiz.document) raiz.SimulationState = crearSimulacion({semilla: Date.now() % 2147483646 || 7});
})(typeof window !== 'undefined' ? window : globalThis);
