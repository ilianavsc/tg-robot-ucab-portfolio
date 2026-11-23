/* ==========================================================================
   INSPECTOR DE HARDWARE Y CONSOLA DE SENSORES UNIFICADA (TG Robot UCAB)
   Esquema interactivo del robot + fichas técnicas + consola oscura 2x2
   (HC-SR04, TCRT5000, Motores/Encoders, MPU-6050 wireframe 3D)
   ========================================================================== */
(function () {
  'use strict';

  var FICHAS = {
    hcsr04: {
      nombre: 'Radar Ultrasónico HC-SR04P',
      tag: 'PROXIMIDAD',
      funcion: 'Mide distancia a obstáculos frontales y traseros (2–400 cm) para frenado de seguridad (< 30 cm advertencia / < 20 cm parada).',
      pines: 'Frente: TRIG GPIO 23, ECHO GPIO 33 · Atrás: TRIG GPIO 15, ECHO GPIO 5',
      senal: 'Digital 3,3 V · pulso TRIG 10 µs + ancho de pulso ECHO (100 ms alternado)',
      cards: ['hcsr04']
    },
    tcrt5000: {
      nombre: 'Arreglo Óptico TCRT5000 (5 canales)',
      tag: 'SEGUIMIENTO',
      funcion: 'Detecta la cinta negra sobre el piso del laboratorio y calcula el error lateral en mm para el lazo PID de dirección.',
      pines: 'GPIO 36 (VP), GPIO 39 (VN), GPIO 34, GPIO 35 (ADC1) + canal central S3',
      senal: 'Analógica 12 bits (ADC1, compatible con Wi-Fi activo) · muestreo 50 Hz',
      cards: ['tcrt5000']
    },
    mpu6050: {
      nombre: 'Sensor Inercial MPU-6050 (IMU 6 ejes)',
      tag: 'SEGURIDAD IMU',
      funcion: 'Supervisa pitch, roll y aceleración (g) en el centro del chasis para disparar alertas de impacto, inclinación o atascamiento.',
      pines: 'GPIO 21 (SDA), GPIO 22 (SCL), GPIO 2 (INT opcional)',
      senal: 'Bus digital I2C (400 kHz) · telemetría QoS 0 y alertas críticas QoS 2',
      cards: ['mpu6050']
    },
    motores: {
      nombre: 'Motores DC + Driver L298N + Encoders',
      tag: 'TRACCIÓN',
      funcion: 'Tracción diferencial trasera (crucero 0,41 m/s, lenta 0,16 m/s) con odometría por encoders en cuadratura PCNT.',
      pines: 'L298N: ENA 25, IN1 26, IN2 27 · ENB 14, IN3 4, IN4 13 · Encoders: 18/19 y 16/17',
      senal: 'PWM (LEDC 1 kHz) + lectura de pulsos en cuadratura por hardware (PCNT)',
      cards: ['motores']
    },
    esp32: {
      nombre: 'Controlador Central ESP32 DevKit (30 pines)',
      tag: 'MCU + WI-FI',
      funcion: 'Ejecuta el firmware de control PID, seguridad local (< 20 cm), odometría, MPU-6050 y puente MQTT con la app móvil.',
      pines: 'VIN 5,0 V (LM2596) · 3V3 bus sensores · GPIO 32 divisor batería 3S',
      senal: 'Wi-Fi 2,4 GHz (MQTT) · BLE balizas · ADC1 + I2C + LEDC + PCNT',
      cards: ['hcsr04', 'tcrt5000', 'motores', 'mpu6050']
    }
  };

  var estado = {
    seleccionado: 'hcsr04',
    distanciaCm: 42,
    lineaMm: 0,
    velocidadMs: 0.41,
    direccion: 'ADELANTE',
    pitchDeg: 0,
    rollDeg: 0,
    acelG: 1.00,
    eventoMpu: 'normal', // normal | inclinacion | impacto | atascamiento
    salud: {
      hcsr04: 'normal',   // normal | advertencia | fallo
      tcrt5000: 'normal',
      motores: 'normal',
      mpu6050: 'normal'
    },
    radarAngulo: 0,
    radarDir: 1,
    oscBuffer: []
  };

  for (var i = 0; i < 64; i++) estado.oscBuffer.push(0);

  function $(id) {
    return document.getElementById(id);
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function seleccionarComponente(comp) {
    if (!FICHAS[comp]) return;
    estado.seleccionado = comp;
    var f = FICHAS[comp];

    // Iluminar zonas SVG y pills
    document.querySelectorAll('.hw-zone').forEach(function (el) {
      el.classList.toggle('activo', el.getAttribute('data-comp') === comp);
    });
    document.querySelectorAll('.hw-comp-pill').forEach(function (el) {
      el.classList.toggle('activo', el.getAttribute('data-comp') === comp);
    });

    // Actualizar ficha técnica
    if ($('hw-ficha-nombre')) $('hw-ficha-nombre').textContent = f.nombre;
    if ($('hw-ficha-tag')) $('hw-ficha-tag').textContent = f.tag;
    if ($('hw-ficha-funcion')) $('hw-ficha-funcion').textContent = f.funcion;
    if ($('hw-ficha-pines')) $('hw-ficha-pines').textContent = f.pines;
    if ($('hw-ficha-senal')) $('hw-ficha-senal').textContent = f.senal;

    // Resaltar tarjeta(s) en la consola 2x2
    document.querySelectorAll('.hw-card').forEach(function (card) {
      var id = card.getAttribute('data-card');
      card.classList.toggle('resaltada', f.cards.indexOf(id) !== -1);
    });
  }

  function calcularCanalesTcrt(mm) {
    // 5 canales posicionados en [-24, -12, 0, +12, +24] mm
    var pos = [-24, -12, 0, 12, 24];
    return pos.map(function (p) {
      return Math.abs(mm - p) <= 9;
    });
  }

  function calcularMotoresDiferencial() {
    var v = estado.velocidadMs;
    var d = estado.direccion;
    if (estado.salud.motores === 'fallo' || d === 'DETENIDO' || v <= 0.005) {
      return { izq: 0, der: 0, pwm: 0 };
    }
    var basePct = Math.round(clamp(v / 1.0, 0, 1) * 100);
    if (d === 'ADELANTE') return { izq: basePct, der: basePct, pwm: basePct };
    if (d === 'ATRÁS') return { izq: basePct, der: basePct, pwm: basePct };
    if (d === 'IZQUIERDA') return { izq: Math.round(basePct * 0.35), der: basePct, pwm: basePct };
    if (d === 'DERECHA') return { izq: basePct, der: Math.round(basePct * 0.35), pwm: basePct };
    return { izq: 0, der: 0, pwm: 0 };
  }

  function dibujarRadar() {
    var canvas = $('hw-canvas-radar');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var cx = w / 2;
    var cy = h - 14;
    var maxR = Math.min(w * 0.44, h - 24);
    var fallo = estado.salud.hcsr04 === 'fallo';
    var dist = estado.distanciaCm;
    var peligro = !fallo && dist < 30;

    // Arcos de 10 / 30 / 50 cm
    var anillos = [
      { cm: 10, frac: 10 / 60, col: 'rgba(239,68,68,0.45)' },
      { cm: 30, frac: 30 / 60, col: 'rgba(245,158,11,0.45)' },
      { cm: 50, frac: 50 / 60, col: 'rgba(0,242,254,0.32)' }
    ];
    ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#849495';
    anillos.forEach(function (a) {
      var r = maxR * a.frac;
      ctx.beginPath();
      ctx.strokeStyle = a.col;
      ctx.arc(cx, cy, r, Math.PI, 0, false);
      ctx.stroke();
      ctx.fillText(a.cm + 'cm', cx + r - 24, cy - 3);
    });

    // Cono de detección (±28°)
    var c1 = -Math.PI / 2 - (28 * Math.PI) / 180;
    var c2 = -Math.PI / 2 + (28 * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, c1, c2, false);
    ctx.closePath();
    ctx.fillStyle = fallo
      ? 'rgba(239,68,68,0.08)'
      : peligro
        ? 'rgba(239,68,68,0.16)'
        : 'rgba(0,242,254,0.12)';
    ctx.fill();

    if (fallo) {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SIN ECO · FALLO HC-SR04', cx, cy - maxR * 0.45);
      ctx.textAlign = 'left';
      return;
    }

    // Haz de barrido animado
    var ang = -Math.PI / 2 + estado.radarAngulo;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
    ctx.strokeStyle = peligro ? '#EF4444' : '#00F2FE';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Punto de eco detectado
    var rEco = clamp(dist / 60, 0.08, 1.0) * maxR;
    var ex = cx;
    var ey = cy - rEco;
    ctx.beginPath();
    ctx.arc(ex, ey, 6, 0, Math.PI * 2);
    ctx.fillStyle = peligro ? '#EF4444' : '#00F2FE';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ex, ey, 11, 0, Math.PI * 2);
    ctx.strokeStyle = peligro ? 'rgba(239,68,68,0.55)' : 'rgba(0,242,254,0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function dibujarOscilograma() {
    var canvas = $('hw-canvas-osc');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Línea central
    ctx.strokeStyle = '#262A31';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    if (estado.salud.tcrt5000 === 'fallo') {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SIN SEÑAL ÓPTICA', w / 2, h / 2 + 4);
      ctx.textAlign = 'left';
      return;
    }

    ctx.beginPath();
    ctx.strokeStyle = Math.abs(estado.lineaMm) > 18 ? '#F59E0B' : '#00F2FE';
    ctx.lineWidth = 2;
    var n = estado.oscBuffer.length;
    for (var i = 0; i < n; i++) {
      var x = (i / (n - 1)) * w;
      var y = h / 2 - (estado.oscBuffer[i] / 35) * (h * 0.42);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function dibujarVelocimetro() {
    var canvas = $('hw-canvas-vel');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var cx = w / 2;
    var cy = h - 14;
    var r = Math.min(w * 0.42, h - 22);
    var fallo = estado.salud.motores === 'fallo';
    var v = fallo || estado.direccion === 'DETENIDO' ? 0 : estado.velocidadMs;

    // Arco base
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.strokeStyle = '#262A31';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Arco activo
    if (!fallo && v > 0) {
      var fin = Math.PI + clamp(v / 1.0, 0, 1) * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, fin, false);
      ctx.strokeStyle = v > 0.75 ? '#F59E0B' : '#00F2FE';
      ctx.lineWidth = 8;
      ctx.stroke();
    }

    // Marcas 0.0 / 0.5 / 1.0
    ctx.fillStyle = '#849495';
    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.fillText('0.0', cx - r - 6, cy + 10);
    ctx.fillText('0.5', cx - 9, cy - r - 4);
    ctx.fillText('1.0', cx + r - 12, cy + 10);

    // Aguja
    var ang = Math.PI + clamp(v / 1.0, 0, 1) * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * (r - 8), cy + Math.sin(ang) * (r - 8));
    ctx.strokeStyle = fallo ? '#EF4444' : '#E0FDFF';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = fallo ? '#EF4444' : '#00F2FE';
    ctx.fill();
  }

  function dibujarImu3D() {
    var canvas = $('hw-canvas-imu');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var fallo = estado.salud.mpu6050 === 'fallo';
    if (fallo) {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BUS I2C SIN RESPUESTA · MPU-6050', w / 2, h / 2 + 4);
      ctx.textAlign = 'left';
      return;
    }

    var pitch = (estado.pitchDeg * Math.PI) / 180;
    var roll = (estado.rollDeg * Math.PI) / 180;
    var yaw = 0.42; // vista 3/4 fija para percibir el volumen 3D del robot móvil

    function proyectar(pt) {
      var x = pt[0], y = pt[1], z = pt[2];
      // Rotación Roll (eje Z longitudinal)
      var x1 = x * Math.cos(roll) - y * Math.sin(roll);
      var y1 = x * Math.sin(roll) + y * Math.cos(roll);
      var z1 = z;
      // Rotación Pitch (eje X lateral)
      var y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
      var z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);
      var x2 = x1;
      // Vista 3/4 (yaw + elevación fija)
      var x3 = x2 * Math.cos(yaw) + z2 * Math.sin(yaw);
      var z3 = -x2 * Math.sin(yaw) + z2 * Math.cos(yaw);
      var elev = 0.38;
      var y4 = y2 * Math.cos(elev) - z3 * Math.sin(elev);
      var z4 = y2 * Math.sin(elev) + z3 * Math.cos(elev);
      var persp = 220 / (220 + z4);
      return [w / 2 + x3 * persp, h / 2 - y4 * persp];
    }

    var alerta = estado.eventoMpu !== 'normal' || Math.abs(estado.pitchDeg) > 20 || Math.abs(estado.rollDeg) > 20;
    var colorWire = alerta ? '#EF4444' : '#00F2FE';

    // Chasis wireframe de robot móvil (caja rectangular + flecha frontal + 4 ruedas)
    var cw = 34, ch = 12, cl = 48;
    var verts = [
      [-cw, -ch, -cl], [cw, -ch, -cl], [cw, -ch, cl], [-cw, -ch, cl],
      [-cw, ch, -cl],  [cw, ch, -cl],  [cw, ch, cl],  [-cw, ch, cl]
    ];
    var edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];
    var p = verts.map(proyectar);

    ctx.strokeStyle = colorWire;
    ctx.lineWidth = 1.6;
    edges.forEach(function (e) {
      ctx.beginPath();
      ctx.moveTo(p[e[0]][0], p[e[0]][1]);
      ctx.lineTo(p[e[1]][0], p[e[1]][1]);
      ctx.stroke();
    });

    // Flecha frontal indicando el frente del robot (+Z)
    var fBase = proyectar([0, ch + 1, 10]);
    var fTip = proyectar([0, ch + 1, cl - 6]);
    var fL = proyectar([-10, ch + 1, cl - 18]);
    var fR = proyectar([10, ch + 1, cl - 18]);
    ctx.strokeStyle = '#E0FDFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fBase[0], fBase[1]);
    ctx.lineTo(fTip[0], fTip[1]);
    ctx.moveTo(fL[0], fL[1]);
    ctx.lineTo(fTip[0], fTip[1]);
    ctx.lineTo(fR[0], fR[1]);
    ctx.stroke();

    // 4 ruedas del chasis móvil
    var ruedas = [
      [-cw - 6, -ch, -cl + 14], [cw + 6, -ch, -cl + 14],
      [-cw - 6, -ch, cl - 14],  [cw + 6, -ch, cl - 14]
    ];
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2.2;
    ruedas.forEach(function (rw) {
      var a = proyectar([rw[0], rw[1] - 4, rw[2] - 8]);
      var b = proyectar([rw[0], rw[1] - 4, rw[2] + 8]);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
    });
  }

  function actualizarDom() {
    // 1. HC-SR04
    var stH = estado.salud.hcsr04;
    var falloH = stH === 'fallo';
    var cardH = $('hw-card-hcsr04');
    var badgeH = $('hw-badge-hcsr04');
    var distEf = estado.distanciaCm;
    var estCardH = falloH ? 'fallo' : (distEf < 30 || stH === 'advertencia' ? 'advertencia' : 'normal');
    if (cardH) cardH.setAttribute('data-estado', estCardH);
    if (badgeH) {
      if (falloH) {
        badgeH.textContent = 'FALLO SENSOR';
        badgeH.className = 'hw-badge peligro';
      } else if (distEf < 30) {
        badgeH.textContent = 'OBSTÁCULO CERCANO';
        badgeH.className = 'hw-badge peligro';
      } else if (stH === 'advertencia') {
        badgeH.textContent = 'ECO RUIDOSO';
        badgeH.className = 'hw-badge aviso';
      } else {
        badgeH.textContent = 'DESPEJADO';
        badgeH.className = 'hw-badge ok';
      }
    }
    if ($('hw-val-dist')) {
      $('hw-val-dist').textContent = falloH ? '--- cm' : distEf.toFixed(0) + ' cm';
      $('hw-val-dist').className = 'hw-metric-v' + (falloH || distEf < 30 ? ' peligro' : '');
    }
    if ($('hw-val-zona')) {
      $('hw-val-zona').textContent = falloH ? 'FALLO' : (distEf < 20 ? 'PARADA' : (distEf < 30 ? 'ALERTA' : 'LIBRE'));
    }

    // 2. TCRT5000
    var stT = estado.salud.tcrt5000;
    var falloT = stT === 'fallo';
    var cardT = $('hw-card-tcrt5000');
    var badgeT = $('hw-badge-tcrt5000');
    var estCardT = falloT ? 'fallo' : (Math.abs(estado.lineaMm) > 18 || stT === 'advertencia' ? 'advertencia' : 'normal');
    if (cardT) cardT.setAttribute('data-estado', estCardT);
    if (badgeT) {
      if (falloT) {
        badgeT.textContent = 'FALLO ÓPTICO';
        badgeT.className = 'hw-badge peligro';
      } else if (Math.abs(estado.lineaMm) > 18 || stT === 'advertencia') {
        badgeT.textContent = 'DERIVA ALTA';
        badgeT.className = 'hw-badge aviso';
      } else {
        badgeT.textContent = 'LÍNEA OK';
        badgeT.className = 'hw-badge ok';
      }
    }
    var canales = calcularCanalesTcrt(estado.lineaMm);
    for (var c = 0; c < 5; c++) {
      var led = $('hw-tcrt-s' + (c + 1));
      if (led) {
        led.className = 'hw-tcrt-led' + (falloT ? ' fault' : (canales[c] ? ' on' : ''));
      }
    }
    var pidMarker = $('hw-pid-marker');
    if (pidMarker) {
      pidMarker.style.display = falloT ? 'none' : 'block';
      var pctPid = 50 + clamp(estado.lineaMm / 30, -1, 1) * 44;
      pidMarker.style.left = pctPid + '%';
    }
    if ($('hw-val-linea')) {
      $('hw-val-linea').textContent = falloT ? '--- mm' : (estado.lineaMm >= 0 ? '+' : '') + estado.lineaMm.toFixed(1) + ' mm';
      $('hw-val-linea').className = 'hw-metric-v' + (falloT ? ' peligro' : (Math.abs(estado.lineaMm) > 18 ? ' aviso' : ''));
    }

    // 3. Motores
    var stM = estado.salud.motores;
    var falloM = stM === 'fallo';
    var dif = calcularMotoresDiferencial();
    var cardM = $('hw-card-motores');
    var badgeM = $('hw-badge-motores');
    var estCardM = falloM ? 'fallo' : (stM === 'advertencia' || estado.velocidadMs > 0.75 ? 'advertencia' : 'normal');
    if (cardM) cardM.setAttribute('data-estado', estCardM);
    if (badgeM) {
      if (falloM) {
        badgeM.textContent = 'FALLO DRIVER';
        badgeM.className = 'hw-badge peligro';
      } else if (stM === 'advertencia') {
        badgeM.textContent = 'SOBRECORRIENTE';
        badgeM.className = 'hw-badge aviso';
      } else {
        badgeM.textContent = estado.direccion;
        badgeM.className = 'hw-badge ok';
      }
    }
    var vShow = falloM ? '--- m/s' : (estado.direccion === 'DETENIDO' ? '0.00 m/s' : estado.velocidadMs.toFixed(2) + ' m/s');
    if ($('hw-val-vel')) {
      $('hw-val-vel').textContent = vShow;
      $('hw-val-vel').className = 'hw-metric-v' + (falloM ? ' peligro' : '');
    }
    if ($('hw-val-pwm')) $('hw-val-pwm').textContent = falloM ? '--- %' : dif.pwm + ' %';
    if ($('hw-bar-izq')) $('hw-bar-izq').style.width = dif.izq + '%';
    if ($('hw-bar-der')) $('hw-bar-der').style.width = dif.der + '%';
    if ($('hw-txt-izq')) $('hw-txt-izq').textContent = falloM ? '---' : dif.izq + '%';
    if ($('hw-txt-der')) $('hw-txt-der').textContent = falloM ? '---' : dif.der + '%';

    ['ADELANTE', 'ATRÁS', 'IZQUIERDA', 'DERECHA'].forEach(function (dir) {
      var el = $('hw-arrow-' + dir);
      if (el) el.classList.toggle('on', !falloM && estado.direccion === dir && estado.velocidadMs > 0.005);
    });

    // 4. MPU-6050
    var stI = estado.salud.mpu6050;
    var falloI = stI === 'fallo';
    var cardI = $('hw-card-mpu6050');
    var badgeI = $('hw-badge-mpu6050');
    var enAlertaI = !falloI && (estado.eventoMpu !== 'normal' || Math.abs(estado.pitchDeg) > 20 || Math.abs(estado.rollDeg) > 20);
    var estCardI = falloI ? 'fallo' : (enAlertaI || stI === 'advertencia' ? 'advertencia' : 'normal');
    if (cardI) cardI.setAttribute('data-estado', estCardI);
    if (badgeI) {
      if (falloI) {
        badgeI.textContent = 'FALLO IMU';
        badgeI.className = 'hw-badge peligro';
      } else if (estado.eventoMpu === 'impacto') {
        badgeI.textContent = 'ALERTA IMPACTO';
        badgeI.className = 'hw-badge peligro';
      } else if (estado.eventoMpu === 'inclinacion' || Math.abs(estado.pitchDeg) > 20 || Math.abs(estado.rollDeg) > 20) {
        badgeI.textContent = 'ALERTA INCLINACIÓN';
        badgeI.className = 'hw-badge peligro';
      } else if (estado.eventoMpu === 'atascamiento') {
        badgeI.textContent = 'ALERTA ATASCAMIENTO';
        badgeI.className = 'hw-badge aviso';
      } else if (stI === 'advertencia') {
        badgeI.textContent = 'DERIVA GYRO';
        badgeI.className = 'hw-badge aviso';
      } else {
        badgeI.textContent = 'ESTABILIDAD OK';
        badgeI.className = 'hw-badge ok';
      }
    }
    if ($('hw-val-pitch')) $('hw-val-pitch').textContent = falloI ? '--- °' : estado.pitchDeg.toFixed(1) + '°';
    if ($('hw-val-roll')) $('hw-val-roll').textContent = falloI ? '--- °' : estado.rollDeg.toFixed(1) + '°';
    if ($('hw-val-acel')) {
      $('hw-val-acel').textContent = falloI ? '--- g' : estado.acelG.toFixed(2) + ' g';
      $('hw-val-acel').className = 'hw-metric-v' + (falloI || estado.eventoMpu === 'impacto' ? ' peligro' : '');
    }

    // Sincronizar etiquetas de sliders
    if ($('hw-lbl-dist')) $('hw-lbl-dist').textContent = estado.distanciaCm + ' cm';
    if ($('hw-lbl-linea')) $('hw-lbl-linea').textContent = (estado.lineaMm >= 0 ? '+' : '') + estado.lineaMm + ' mm';
    if ($('hw-lbl-vel')) $('hw-lbl-vel').textContent = estado.velocidadMs.toFixed(2) + ' m/s';
    if ($('hw-lbl-pitch')) $('hw-lbl-pitch').textContent = estado.pitchDeg + '°';
    if ($('hw-lbl-roll')) $('hw-lbl-roll').textContent = estado.rollDeg + '°';

    // Botones activos de dirección, evento MPU y estado por tarjeta
    document.querySelectorAll('[data-dir]').forEach(function (b) {
      b.classList.toggle('activo', b.getAttribute('data-dir') === estado.direccion);
    });
    document.querySelectorAll('[data-mpu-ev]').forEach(function (b) {
      b.classList.toggle('activo', b.getAttribute('data-mpu-ev') === estado.eventoMpu && estado.salud.mpu6050 !== 'fallo');
    });
    document.querySelectorAll('[data-st-card]').forEach(function (b) {
      var cId = b.getAttribute('data-st-card');
      var stVal = b.getAttribute('data-st-val');
      b.classList.toggle('activo', estado.salud[cId] === stVal);
    });

    dibujarRadar();
    dibujarOscilograma();
    dibujarVelocimetro();
    dibujarImu3D();
  }

  function aplicarEventoMpu(ev) {
    estado.salud.mpu6050 = 'normal';
    estado.eventoMpu = ev;
    if (ev === 'normal') {
      estado.pitchDeg = 0;
      estado.rollDeg = 0;
      estado.acelG = 1.00;
    } else if (ev === 'inclinacion') {
      estado.pitchDeg = 28;
      estado.rollDeg = -24;
      estado.acelG = 1.18;
    } else if (ev === 'impacto') {
      estado.pitchDeg = 12;
      estado.rollDeg = 8;
      estado.acelG = 2.85;
    } else if (ev === 'atascamiento') {
      estado.pitchDeg = 4;
      estado.rollDeg = 2;
      estado.acelG = 0.08;
    }
    if ($('hw-in-pitch')) $('hw-in-pitch').value = String(estado.pitchDeg);
    if ($('hw-in-roll')) $('hw-in-roll').value = String(estado.rollDeg);
    actualizarDom();
  }

  function restablecerTodo() {
    estado.distanciaCm = 42;
    estado.lineaMm = 0;
    estado.velocidadMs = 0.41;
    estado.direccion = 'ADELANTE';
    estado.pitchDeg = 0;
    estado.rollDeg = 0;
    estado.acelG = 1.00;
    estado.eventoMpu = 'normal';
    estado.salud = { hcsr04: 'normal', tcrt5000: 'normal', motores: 'normal', mpu6050: 'normal' };
    if ($('hw-in-dist')) $('hw-in-dist').value = '42';
    if ($('hw-in-linea')) $('hw-in-linea').value = '0';
    if ($('hw-in-vel')) $('hw-in-vel').value = '0.41';
    if ($('hw-in-pitch')) $('hw-in-pitch').value = '0';
    if ($('hw-in-roll')) $('hw-in-roll').value = '0';
    actualizarDom();
  }

  function tickAnimacion() {
    // Barrido suave del radar (-28° a +28°)
    estado.radarAngulo += estado.radarDir * 0.03;
    if (estado.radarAngulo > 0.48) { estado.radarAngulo = 0.48; estado.radarDir = -1; }
    if (estado.radarAngulo < -0.48) { estado.radarAngulo = -0.48; estado.radarDir = 1; }

    // Oscilograma TCRT5000 en tiempo real
    var ruido = estado.salud.tcrt5000 === 'advertencia' ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 1.4;
    estado.oscBuffer.push(clamp(estado.lineaMm + ruido, -32, 32));
    if (estado.oscBuffer.length > 64) estado.oscBuffer.shift();

    dibujarRadar();
    dibujarOscilograma();
  }

  function iniciar() {
    if (!$('hw-inspector-root')) return;

    // Zonas clicables/hover en el SVG y pills
    document.querySelectorAll('.hw-zone, .hw-comp-pill').forEach(function (el) {
      var comp = el.getAttribute('data-comp');
      el.addEventListener('click', function () { seleccionarComponente(comp); });
      el.addEventListener('mouseenter', function () { seleccionarComponente(comp); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          seleccionarComponente(comp);
        }
      });
    });

    // Sliders
    if ($('hw-in-dist')) {
      $('hw-in-dist').addEventListener('input', function (e) {
        estado.distanciaCm = Number(e.target.value);
        seleccionarComponente('hcsr04');
        actualizarDom();
      });
    }
    if ($('hw-in-linea')) {
      $('hw-in-linea').addEventListener('input', function (e) {
        estado.lineaMm = Number(e.target.value);
        seleccionarComponente('tcrt5000');
        actualizarDom();
      });
    }
    if ($('hw-in-vel')) {
      $('hw-in-vel').addEventListener('input', function (e) {
        estado.velocidadMs = Number(e.target.value);
        seleccionarComponente('motores');
        actualizarDom();
      });
    }
    if ($('hw-in-pitch')) {
      $('hw-in-pitch').addEventListener('input', function (e) {
        estado.pitchDeg = Number(e.target.value);
        if (Math.abs(estado.pitchDeg) <= 20 && Math.abs(estado.rollDeg) <= 20 && estado.eventoMpu === 'inclinacion') {
          estado.eventoMpu = 'normal';
        }
        seleccionarComponente('mpu6050');
        actualizarDom();
      });
    }
    if ($('hw-in-roll')) {
      $('hw-in-roll').addEventListener('input', function (e) {
        estado.rollDeg = Number(e.target.value);
        if (Math.abs(estado.pitchDeg) <= 20 && Math.abs(estado.rollDeg) <= 20 && estado.eventoMpu === 'inclinacion') {
          estado.eventoMpu = 'normal';
        }
        seleccionarComponente('mpu6050');
        actualizarDom();
      });
    }

    // Botones dirección
    document.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () {
        estado.direccion = b.getAttribute('data-dir');
        seleccionarComponente('motores');
        actualizarDom();
      });
    });

    // Botones eventos MPU-6050
    document.querySelectorAll('[data-mpu-ev]').forEach(function (b) {
      b.addEventListener('click', function () {
        seleccionarComponente('mpu6050');
        aplicarEventoMpu(b.getAttribute('data-mpu-ev'));
      });
    });

    // Botones estado normal / advertencia / fallo por tarjeta
    document.querySelectorAll('[data-st-card]').forEach(function (b) {
      b.addEventListener('click', function () {
        var cId = b.getAttribute('data-st-card');
        var stVal = b.getAttribute('data-st-val');
        estado.salud[cId] = stVal;
        seleccionarComponente(cId);
        actualizarDom();
      });
    });

    if ($('hw-btn-reset')) {
      $('hw-btn-reset').addEventListener('click', restablecerTodo);
    }

    seleccionarComponente('hcsr04');
    actualizarDom();
    window.setInterval(tickAnimacion, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
