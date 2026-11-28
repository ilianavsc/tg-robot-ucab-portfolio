// Simulador 1 + ESP32 (P04): Simulador 1 de aprendizaje progresivo con la placa ESP32 en vivo. el robot recorre una de dos pistas, en modo manual (teclado o botones
// táctiles) o con el seguidor automático, y el panel muestra los datos en vivo para compararlos.
import * as THREE from 'three';
import {SIN_WEBGL, crearAviso, vigilarContexto} from './arranque.js';
import {crearGranito} from './granito.js';
import {crearMundo} from './mundo.js';
import {R, cuentasVuelta} from './model.js';
import {GEOM, PD, crearSim, ledsEsp32} from './sim.js';
import {TOPICOS, crearPuenteMqtt} from './mqtt_puente.js';
import {IDS_PISTA, PISTAS} from './pista.js';
import {ZA, buildRobot} from './robot.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const f = (v, d = 1) => v.toFixed(d).replace('.', ',');
const sg = (v, d = 1) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(d).replace('.', ',');
const seg = (v) => (v === null || v === undefined ? '—' : `${f(v)} s`);

// Umbrales oficiales HC-SR04 (alineados con assets/js/parametros_robot.js)
const US_PARADA_CM = 20;
const US_PRECAUCION_CM = 50;
const US_PRESETS = {libre: 150, precaucion: 35, parada: 14};
const CUENTAS_POR_METRO = cuentasVuelta() / (Math.PI * R.ruedaD);

const aviso = crearAviso();
aviso.cargando();
const canvas = $('#lienzo');
let mundo;
try {
  mundo = crearMundo(canvas);
} catch (e) {
  console.error(e);
  aviso.error(...SIN_WEBGL);
  throw e;
}
vigilarContexto(canvas, aviso);
// deja pintar el aviso antes de generar el granito (tarda un momento)
setTimeout(() => iniciar(mundo), 30);

function iniciar({renderer, scene, camera, controls, sol, pose, resize, ponerPiso, repintado}) {
  const robot = buildRobot({tz: ZA + GEOM.adelante, conos: false});
  pose.add(robot.root);
  const granitos = {};
  const sim = crearSim({
    pistaId: 'A',
    encendido: false,
    fabricaGran: (P) => {
      const g = (granitos[P.id] ||= crearGranito(P));
      ponerPiso(g.canvas, P.zona);
      return g.gran;
    },
  });
  const anim = {ang: {izq: 0, der: 0}, arm: {izq: 0, der: 0}, flow: {}, act: {}, hall: {izq: [false, false], der: [false, false]}};
  const enc = {izq: 0, der: 0};
  const us = {frenteCm: 150, atrasCm: 160, modo: 'libre'};
  const ui = {vista: 'seguir', t: 0, teclas: new Set(), botones: new Set(), aviso: '', conexion: 'local', configurado: false, dpadDeseado: false};

  const zonaUltrasonido = (cm) => (cm < US_PARADA_CM ? 'parada' : cm <= US_PRECAUCION_CM ? 'precaucion' : 'libre');

  // ---------------------------------------------------------------- traza de eventos MQTT
  const logMqtt = [];
  let ultimaAlertaPayload = null;
  const registrarEventoMqtt = (texto, qos = '') => {
    const hora = new Date().toLocaleTimeString('es-VE', {hour12: false});
    const pref = qos ? `[${qos}] ` : '';
    logMqtt.unshift(`${hora} · ${pref}${texto}`);
    if (logMqtt.length > 18) logMqtt.length = 18;
    const ul = $('#log-mqtt');
    if (ul) ul.innerHTML = logMqtt.map((item) => `<li>${item}</li>`).join('');
  };

  // ---------------------------------------------------------------- cámara
  const yaw = new THREE.Vector3(0, 1, 0);
  const VISTAS = {
    seguir: {nombre: 'Seguir', off: new THREE.Vector3(-0.22, 0.5, -0.8), alto: 0.04},
    cenital: {nombre: 'Cenital', off: new THREE.Vector3(0, 1.35, -0.3), alto: 0.0},
    general: {nombre: 'Panorámica'},
  };
  let tween = null;
  let thPrev = 0;
  const objetivo = (v) => {
    if (v === 'general') {
      const z = sim.P.zona;
      const ancho = sim.pistaId === 'B' ? 4.4 : 3.5;
      const util = canvas.clientWidth >= 900 ? 0.72 : 1; // en escritorio el panel tapa la derecha
      const vert = ((ancho / 2 / Math.tan((camera.fov * Math.PI) / 360)) / Math.min(1, camera.aspect) / util) * 0.85;
      return {pos: new THREE.Vector3(0, Math.max(1.8, vert * 0.85), Math.max(1.2, vert * 0.55)), tgt: new THREE.Vector3(z.x0 + z.ancho / 2, 0, 0)};
    }
    const c = VISTAS[v];
    const k = canvas.clientWidth < 640 ? 1.25 : 1;
    const tgt = new THREE.Vector3(sim.eje.x, c.alto, sim.eje.z);
    return {pos: c.off.clone().multiplyScalar(k).applyAxisAngle(yaw, sim.eje.th).add(tgt), tgt};
  };
  const irA = (v, instantaneo = false) => {
    ui.vista = v;
    $('#b-vista').innerHTML = `<span class="largo">Vista: </span>${VISTAS[v].nombre}`;
    controls.enablePan = v === 'general';
    controls.minDistance = v === 'general' ? 1 : 0.3;
    controls.maxDistance = v === 'general' ? 9 : 3.5;
    thPrev = sim.eje.th;
    if (instantaneo) {
      const o = objetivo(v);
      camera.position.copy(o.pos);
      controls.target.copy(o.tgt);
      tween = null;
    } else tween = {t: 0, p0: camera.position.clone(), t0: controls.target.clone()};
  };
  const avanzaTween = (dt) => {
    tween.t = Math.min(1, tween.t + dt / 0.8);
    const e = tween.t * tween.t * (3 - 2 * tween.t);
    const o = objetivo(ui.vista);
    camera.position.lerpVectors(tween.p0, o.pos, e);
    controls.target.lerpVectors(tween.t0, o.tgt, e);
    if (tween.t >= 1) tween = null;
  };
  const seguirCamara = (dt) => {
    let dth = sim.eje.th - thPrev;
    thPrev = sim.eje.th;
    if (ui.vista === 'general') {
      if (tween) avanzaTween(dt);
      return;
    }
    if (dth > Math.PI) dth -= 2 * Math.PI;
    if (dth < -Math.PI) dth += 2 * Math.PI;
    if (tween) return avanzaTween(dt);
    const off = camera.position.clone().sub(controls.target).applyAxisAngle(yaw, dth);
    controls.target.set(sim.eje.x, VISTAS[ui.vista].alto, sim.eje.z);
    camera.position.copy(controls.target).add(off);
  };
  const desplazaVista = () => {
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    if (W < 900) camera.setViewOffset(W, H, 0, Math.round(H * 0.13), W, H);
    else camera.setViewOffset(W, H, 180, 0, W, H);
    camera.updateProjectionMatrix();
  };

  // ---------------------------------------------------------------- entrada: teclado y botones táctiles
  const MAPA = {KeyW: 'arriba', ArrowUp: 'arriba', KeyS: 'abajo', ArrowDown: 'abajo', KeyA: 'izq', ArrowLeft: 'izq', KeyD: 'der', ArrowRight: 'der', Space: 'stop'};
  const activo = (k) => ui.teclas.has(k) || ui.botones.has(k);
  const aplicaEntrada = () => {
    const E = sim.entrada;
    const bloqObstaculo = us.frenteCm < US_PARADA_CM;
    const fCmd = (activo('arriba') ? 1 : 0) - (activo('abajo') ? 1 : 0);
    E.f = bloqObstaculo && fCmd > 0 ? 0 : fCmd;
    E.t = (activo('izq') ? 1 : 0) - (activo('der') ? 1 : 0);
    E.freno = activo('stop') || (bloqObstaculo && E.f >= 0 && E.t === 0);
    $$('[data-dp]').forEach((b) => b.classList.toggle('on', activo(b.dataset.dp)));
  };
  const tomaControl = () => {
    mqtt.cancelarRemoto();
    if (sim.modo === 'auto') ponModo('manual', 'Control manual: tomaste el mando');
  };
  const menuInicio = $('#menu-inicio');
  addEventListener('keydown', (e) => {
    if (menuInicio.open || ui.conexion === 'app') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'KeyR' && !e.repeat) return reiniciar();
    if (e.code === 'KeyM' && !e.repeat) return ponModo(sim.modo === 'auto' ? 'manual' : 'auto');
    if (!sim.encendido) return;
    const k = MAPA[e.code];
    if (!k) return;
    e.preventDefault();
    if (!ui.teclas.has(k)) {
      ui.teclas.add(k);
      tomaControl();
      aplicaEntrada();
    }
  });
  addEventListener('keyup', (e) => {
    const k = MAPA[e.code];
    if (!k) return;
    e.preventDefault();
    ui.teclas.delete(k);
    aplicaEntrada();
  });
  const soltarTodo = () => {
    ui.teclas.clear();
    ui.botones.clear();
    aplicaEntrada();
  };
  addEventListener('blur', soltarTodo);
  document.addEventListener('visibilitychange', () => document.hidden && soltarTodo());

  // D-Pad: clic sostenido (pointer), y touchstart/touchend como respaldo. Pulsar o soltar es idempotente.
  const pulsa = (k) => {
    if (ui.conexion === 'app' || !sim.encendido) return;
    if (ui.botones.has(k)) return;
    ui.botones.add(k);
    tomaControl();
    aplicaEntrada();
  };
  const suelta = (k) => {
    if (!ui.botones.delete(k)) return;
    aplicaEntrada();
  };
  $$('[data-dp]').forEach((b) => {
    const k = b.dataset.dp;
    b.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      try {
        b.setPointerCapture(e.pointerId);
      } catch {
        /* el navegador no lo permite: no pasa nada */
      }
      pulsa(k);
    });
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture', 'pointerleave']) b.addEventListener(ev, () => suelta(k));
    b.addEventListener('touchstart', (e) => {
      e.preventDefault();
      pulsa(k);
    }, {passive: false});
    for (const ev of ['touchend', 'touchcancel']) b.addEventListener(ev, (e) => {
      e.preventDefault();
      suelta(k);
    }, {passive: false});
    b.addEventListener('contextmenu', (e) => e.preventDefault());
    b.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') e.preventDefault();
    });
  });

  // ---------------------------------------------------------------- puente MQTT (App ↔ P04)
  const bMqtt = $('#b-mqtt');
  const mqttDot = $('#mqtt-dot');
  const mqttEstEl = $('#mqtt-estado');
  const mpuEstEl = $('#mpu-estado');
  const bMpuRecuperar = $('#b-mpu-recuperar');
  let seqUiCapa3 = 0;
  const pulsarLedTx = () => {
    const el = $('#led-tx');
    if (!el) return;
    el.classList.remove('pulso');
    void el.offsetWidth;
    el.classList.add('pulso');
  };
  let mqtt;
  const ponTexto = (el, txt) => {
    if (el && el.textContent !== txt) el.textContent = txt;
  };
  const actualizaMpuUi = () => {
    if (!mpuEstEl || !mqtt) return;
    const st = mqtt.capa3.estado_ruta;
    const bloq = mqtt.movimientoBloqueado;
    mpuEstEl.setAttribute('data-bloq', bloq ? '1' : '0');
    ponTexto($('#v-pitch'), `${f(mqtt.capa3.pitch, 1)}°`);
    ponTexto($('#v-roll'), `${f(mqtt.capa3.roll, 1)}°`);
    ponTexto($('#v-acel'), `${f(mqtt.capa3.acel_g, 2)} g`);
    if (st === 'ERROR_SEGURIDAD') {
      ponTexto(mpuEstEl, `BLOQUEADO · ${String(mqtt.capa3.alerta_mpu || 'seguridad').toUpperCase()}`);
      if (bMpuRecuperar) {
        bMpuRecuperar.hidden = false;
        ponTexto(bMpuRecuperar, 'Recuperación manual');
      }
      actualizaModoTxt(`Seguridad MPU-6050 (${mqtt.capa3.alerta_mpu || 'alerta'}): movimiento bloqueado`);
    } else if (st === 'RECUPERACION_MANUAL') {
      ponTexto(mpuEstEl, 'RECUPERACIÓN · BLOQ.');
      if (bMpuRecuperar) {
        bMpuRecuperar.hidden = false;
        ponTexto(bMpuRecuperar, 'Confirmar y reanudar');
      }
      actualizaModoTxt('Recuperación manual activa: confirma para desbloquear movimiento');
    } else {
      ponTexto(mpuEstEl, 'MPU-6050 · OK');
      if (bMpuRecuperar) bMpuRecuperar.hidden = true;
    }
    actualizaDetallesJson();
  };
  mqtt = crearPuenteMqtt({
    sim,
    alModo: (m, txt) => ponModo(m, txt),
    alTx: pulsarLedTx,
    alEstado: ({estado: est, broker, detalle}) => {
      mqttDot.className = 'mqtt-dot' + (est === 'desconectado' ? '' : ' ' + est);
      if (est === 'conectado') {
        ponTexto(mqttEstEl, `Conectado · ${broker.nombre}`);
        ponTexto(bMqtt, 'Desconectar');
        bMqtt.setAttribute('aria-pressed', 'true');
      } else if (est === 'conectando') {
        ponTexto(mqttEstEl, `Conectando · ${broker.nombre}…`);
        ponTexto(bMqtt, 'Cancelar');
        bMqtt.setAttribute('aria-pressed', 'true');
      } else {
        ponTexto(mqttEstEl, 'Desconectado');
        ponTexto(bMqtt, 'Conectar App');
        bMqtt.setAttribute('aria-pressed', 'false');
      }
      if (detalle) registrarEventoMqtt(detalle, est === 'conectado' ? 'MQTT' : '');
      actualizaMpuUi();
    },
  });
  bMqtt.addEventListener('click', () => mqtt.alternar());
  $$('[data-mpu]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tipo = btn.getAttribute('data-mpu');
      const res = mqtt.dispararAlertaInercial(tipo);
      if (res && res.ok) {
        ultimaAlertaPayload = res.alerta;
        registrarEventoMqtt(`${TOPICOS.alertas} (${tipo})`, 'QoS 2');
      }
      actualizaMpuUi();
    });
  });
  if (bMpuRecuperar) {
    bMpuRecuperar.addEventListener('click', () => {
      seqUiCapa3 += 1;
      if (mqtt.capa3.estado_ruta === 'ERROR_SEGURIDAD') {
        mqtt.recibirRutaEscaneo({
          accion: 'recuperacion_manual',
          message_id: `p04-ui-rec-${Date.now()}-${seqUiCapa3}`,
          sequence: seqUiCapa3,
          schema_version: '2.0.0',
        });
        registrarEventoMqtt('recuperacion_manual solicitada', 'QoS 1');
      } else if (mqtt.capa3.estado_ruta === 'RECUPERACION_MANUAL') {
        mqtt.recibirRutaEscaneo({
          accion: 'reanudar_operacion',
          message_id: `p04-ui-res-${Date.now()}-${seqUiCapa3}`,
          sequence: seqUiCapa3,
          schema_version: '2.0.0',
        });
        ultimaAlertaPayload = null;
        registrarEventoMqtt('reanudar_operacion confirmada', 'QoS 1');
      }
      actualizaMpuUi();
    });
  }

  // ---------------------------------------------------------------- HC-SR04 (simulación de obstáculos)
  const actualizaUsUi = () => {
    const z = zonaUltrasonido(us.frenteCm);
    const badge = $('#us-badge');
    const barraUs = $('#us-barra');
    const etiqueta = z === 'parada' ? `Parada · ${us.frenteCm} cm` : z === 'precaucion' ? `Precaución · ${us.frenteCm} cm` : `Libre · ${us.frenteCm} cm`;
    if (badge) {
      badge.dataset.zona = z;
      ponTexto(badge, etiqueta);
    }
    if (barraUs) {
      barraUs.dataset.zona = z;
      barraUs.style.width = `${Math.min(100, Math.max(8, Math.round((us.frenteCm / 150) * 100)))}%`;
    }
    ponTexto($('#v-us-frente'), `${us.frenteCm} cm`);
    ponTexto($('#v-us-atras'), `${us.atrasCm} cm`);
    $$('[data-us]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.us === us.modo)));
  };
  $$('[data-us]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modo = btn.dataset.us;
      us.modo = modo;
      us.frenteCm = US_PRESETS[modo] ?? 150;
      aplicaEntrada();
      actualizaUsUi();
      if (us.frenteCm < US_PARADA_CM) {
        actualizaModoTxt(`HC-SR04 frontal (${us.frenteCm} cm < ${US_PARADA_CM} cm): parada de seguridad`);
        registrarEventoMqtt(`HC-SR04 obstáculo frontal ${us.frenteCm} cm (parada)`, 'QoS 0');
      } else {
        actualizaModoTxt();
      }
      actualizaDetallesJson();
      solicitarCuadro();
    });
  });

  // ---------------------------------------------------------------- botones de la barra
  const bEncender = $('#b-encender');
  const encenderTxt = $('#encender-txt');
  const dpad = $('#dpad');
  const bDpad = $('#b-dpad');
  const esTactilOAngosto = () => matchMedia('(pointer:coarse)').matches || innerWidth < 900;
  ui.dpadDeseado = esTactilOAngosto();
  const sincronizaDpad = () => {
    if (ui.conexion === 'app') {
      dpad.hidden = true;
      dpad.classList.add('oculto');
      bDpad.hidden = true;
      bDpad.setAttribute('aria-pressed', 'false');
      return;
    }
    dpad.hidden = false;
    bDpad.hidden = false;
    const mostrar = esTactilOAngosto() || ui.dpadDeseado;
    dpad.classList.toggle('oculto', !mostrar);
    bDpad.setAttribute('aria-pressed', String(mostrar));
    $$('[data-dp]').forEach((b) => (b.disabled = !sim.encendido));
  };

  const actualizaModoTxt = (texto = '') => {
    if (texto) {
      $('#modo-txt').textContent = texto;
      return;
    }
    const base = !sim.encendido
      ? 'Robot detenido · pulsa ⚡ Encender para iniciar'
      : ui.conexion === 'app'
        ? 'Modo App (MQTT): control remoto desde la App'
        : sim.modo === 'auto'
          ? 'Seguidor automático: el robot sigue la línea TCRT5000'
          : 'Modo manual: W A S D o flechas · Espacio frena';
    $('#modo-txt').textContent = base;
  };
  const ponEncendido = (activo) => {
    const on = Boolean(activo);
    if (on) sim.encender();
    else sim.detener();
    document.body.dataset.encendido = on ? '1' : '0';
    bEncender.setAttribute('aria-pressed', String(on));
    encenderTxt.textContent = on ? '⏹ Detener' : '⚡ Encender';
    const badgeMis = $('#badge-mision');
    if (badgeMis) {
      badgeMis.dataset.on = on ? '1' : '0';
      ponTexto(badgeMis, on ? (sim.modo === 'auto' ? 'AUTO' : 'MANUAL') : 'DETENIDO');
    }
    sincronizaDpad();
    if (!on) {
      soltarTodo();
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      renderizarCuadro(0);
    } else {
      if (mqtt.conectado) mqtt.publicarTelemetria();
      solicitarCuadro();
    }
    actualizaModoTxt();
    pintaPlaca(0);
    refresca();
    pintaMinimapa();
  };
  const ponConexion = (tipo) => {
    const modo = tipo === 'app' ? 'app' : 'local';
    ui.conexion = modo;
    document.body.dataset.conexion = modo;
    sincronizaDpad();
    if (modo === 'app') {
      soltarTodo();
      mqtt.conectar();
    } else {
      mqtt.desconectar();
    }
    actualizaModoTxt();
  };
  const ponModo = (m, texto = '') => {
    sim.setModo(m);
    $$('[data-modo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modo === m)));
    document.body.dataset.modo = m;
    const badgeMis = $('#badge-mision');
    if (badgeMis && sim.encendido) ponTexto(badgeMis, m === 'auto' ? 'AUTO' : 'MANUAL');
    actualizaModoTxt(texto);
  };
  const ponPista = (id) => {
    soltarTodo();
    sim.setPista(id);
    enc.izq = 0;
    enc.der = 0;
    $$('[data-pista]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pista === id)));
    $('#pista-desc').textContent = PISTAS[id].descripcion;
    construyeBarra();
    actualizaLeyendaMinimapa();
    irA(ui.vista, true);
    pintaPlaca(0);
    refresca();
    pintaMinimapa();
    solicitarCuadro();
  };
  const reiniciar = () => {
    mqtt.cancelarRemoto();
    soltarTodo();
    sim.reiniciar();
    enc.izq = 0;
    enc.der = 0;
    irA(ui.vista, true);
    pintaPlaca(0);
    refresca();
    pintaMinimapa();
    solicitarCuadro();
  };
  bEncender.addEventListener('click', () => ponEncendido(!sim.encendido));
  $$('[data-modo]').forEach((b) =>
    b.addEventListener('click', () => {
      mqtt.cancelarRemoto();
      ponModo(b.dataset.modo);
    })
  );
  $$('[data-pista]').forEach((b) => b.addEventListener('click', () => ponPista(b.dataset.pista)));
  $('#b-reiniciar').addEventListener('click', reiniciar);
  $('#b-vista').addEventListener('click', () => {
    const orden = ['seguir', 'cenital', 'general'];
    irA(orden[(orden.indexOf(ui.vista) + 1) % orden.length]);
    solicitarCuadro();
  });
  const panel = $('#datos');
  const bMas = $('#b-mas');
  bMas.addEventListener('click', () => {
    const abierto = panel.classList.toggle('abierto');
    bMas.setAttribute('aria-expanded', String(abierto));
    bMas.textContent = abierto ? 'Menos datos ▾' : 'Más datos ▴';
    if (abierto) pintaMinimapa();
  });
  bDpad.addEventListener('click', () => {
    if (ui.conexion === 'app') return;
    const oculto = dpad.classList.toggle('oculto');
    ui.dpadDeseado = !oculto;
    bDpad.setAttribute('aria-pressed', String(!oculto));
    if (oculto) soltarTodo();
  });
  const detallesBox = $('#detalles-tecnicos');
  if (detallesBox) {
    detallesBox.addEventListener('toggle', () => {
      if (detallesBox.open) actualizaDetallesJson();
    });
  }
  sincronizaDpad();

  // menú pre-inicio (modo de operación + pista)
  const bCancelar = $('#b-cancelar');
  const abrirMenuInicio = (inicial = false) => {
    const rCon = $(`input[name="pre-conexion"][value="${ui.conexion}"]`, menuInicio);
    if (rCon) rCon.checked = true;
    const rPista = $(`input[name="pre-pista"][value="${sim.pistaId}"]`, menuInicio);
    if (rPista) rPista.checked = true;
    bCancelar.hidden = inicial;
    menuInicio.returnValue = '';
    if (!menuInicio.open) menuInicio.showModal();
  };
  menuInicio.addEventListener('cancel', (e) => {
    if (!ui.configurado) e.preventDefault();
  });
  menuInicio.addEventListener('close', () => {
    const accion = menuInicio.returnValue;
    menuInicio.returnValue = '';
    if (accion !== 'confirmar') return;
    const conSel = $('input[name="pre-conexion"]:checked', menuInicio)?.value || 'local';
    const pistaSel = $('input[name="pre-pista"]:checked', menuInicio)?.value || 'A';
    ui.configurado = true;
    if (pistaSel !== sim.pistaId) ponPista(pistaSel);
    ponConexion(conSel);
    pintaPlaca(0);
    refresca();
    pintaMinimapa();
  });
  $('#b-config').addEventListener('click', () => abrirMenuInicio(false));
  canvas.addEventListener('pointerdown', () => {
    window.focus();
    $('#aviso-teclado').hidden = true;
  });
  const avisoTeclado = () => ($('#aviso-teclado').hidden = document.hasFocus() || esTactilOAngosto());
  addEventListener('focus', avisoTeclado);
  addEventListener('blur', () => ($('#aviso-teclado').hidden = esTactilOAngosto()));

  // ---------------------------------------------------------------- ajustes del PD y batería 3S
  const aj = [
    ['base', 'Base', 0.4, 1, 0.05, (v) => `${Math.round(v * 100)} %`],
    ['kp', 'Kp', 0.005, 0.06, 0.005, (v) => f(v, 3)],
    ['kd', 'Kd', 0, 0.004, 0.0005, (v) => f(v, 4)],
  ];
  const ajustes = $('#ajustes-cuerpo');
  ajustes.innerHTML =
    aj.map(([k, n, mn, mx, st]) => `<label>${n} <output data-o="${k}"></output><input type="range" data-aj="${k}" min="${mn}" max="${mx}" step="${st}" value="${PD[k]}"></label>`).join('') +
    `<label>Batería <select data-aj="vbat"><option value="12.6">Llena · 12,6 V</option><option value="11.1" selected>Nominal · 11,1 V</option><option value="9.9">Baja · 9,9 V</option></select></label>
     <button type="button" class="btn chico" id="b-pd-reset">Valores del firmware</button>`;
  const pintaAj = () => aj.forEach(([k, , , , , fm]) => ($(`[data-o="${k}"]`).textContent = fm(sim.pd[k])));
  ajustes.addEventListener('input', (e) => {
    const k = e.target.dataset.aj;
    if (!k) return;
    if (k === 'vbat') {
      sim.vbat = Number(e.target.value);
      actualizaBateriaUi();
    } else sim.pd[k] = Number(e.target.value);
    pintaAj();
  });
  $('#b-pd-reset').addEventListener('click', () => {
    Object.assign(sim.pd, PD);
    sim.vbat = R.bat.nominal;
    $$('[data-aj]').forEach((el) => (el.value = el.dataset.aj === 'vbat' ? '11.1' : PD[el.dataset.aj]));
    pintaAj();
    actualizaBateriaUi();
  });
  pintaAj();

  // ---------------------------------------------------------------- panel de datos
  const cacheEl = {};
  const nodo = (sel) => {
    const c = cacheEl[sel];
    if (c && c.isConnected) return c;
    return (cacheEl[sel] = $(sel));
  };
  const set = (id, txt) => {
    const el = nodo('#' + id);
    if (el && el.textContent !== txt) el.textContent = txt;
  };
  const actualizaBateriaUi = () => {
    const pct = Math.max(0, Math.min(100, Math.round(((sim.vbat - R.bat.baja) / (R.bat.llena - R.bat.baja)) * 100)));
    const el = nodo('#v-bat-badge');
    if (el) {
      el.dataset.ok = sim.vbat <= R.bat.baja + 0.05 ? '0' : '1';
      ponTexto(el, `${f(sim.vbat, 1)} V · ${pct} %`);
    }
  };
  const actualizaDetallesJson = () => {
    if (!detallesBox || !detallesBox.open || !mqtt) return;
    const L = sim.lectura();
    const estPreview = {
      estado: sim.modo === 'auto' ? 'autonomo' : 'manual',
      bateria_v: Number(sim.vbat.toFixed(2)),
      linea_mm: Number(L.eMedido.toFixed(1)),
      sensores: L.bin,
      v_izq: Number(sim.vel.izq.toFixed(2)),
      v_der: Number(sim.vel.der.toFixed(2)),
      us_frente_cm: us.frenteCm,
      parada: us.frenteCm < US_PARADA_CM ? 'obstaculo_frente' : mqtt.parada,
    };
    set('json-estado', JSON.stringify(estPreview, null, 2));
    const ordPreview = mqtt.ultimoAck
      ? {ultima_orden: mqtt.remoto.ultimoCmd, ack: mqtt.ultimoAck}
      : {estado: 'Sin órdenes remotas todavía', topico: TOPICOS.ordenes};
    set('json-ordenes', JSON.stringify(ordPreview, null, 2));
    const alPreview = ultimaAlertaPayload
      ? ultimaAlertaPayload
      : {alerta: mqtt.capa3.alerta_mpu, estado_ruta: mqtt.capa3.estado_ruta, pitch: mqtt.capa3.pitch, roll: mqtt.capa3.roll, acel_g: mqtt.capa3.acel_g};
    set('json-alertas', JSON.stringify(alPreview, null, 2));
  };

  // placa ESP32: se pinta en cada cuadro, sincronizada con el robot de la pista
  const ledsTcrt = $$('.esp-led.tcrt');
  const pwmIzq = $('#pwm-izq');
  const pwmDer = $('#pwm-der');
  const ledTx = $('#led-tx');
  let tTx = 0;
  const pintaPlaca = (dt) => {
    const led = ledsEsp32(sim.lectura());
    for (let i = 0; i < 4; i++) ledsTcrt[i].classList.toggle('on', led.tcrt[i] === 1);
    set('v-bin', `[${led.tcrt.join(',')}]`);
    const wIzq = `${Math.round(led.ena * 100)}%`;
    const wDer = `${Math.round(led.enb * 100)}%`;
    if (pwmIzq.style.width !== wIzq) pwmIzq.style.width = wIzq;
    if (pwmDer.style.width !== wDer) pwmDer.style.width = wDer;
    pwmIzq.classList.toggle('atras', led.dirIzq < 0);
    pwmDer.classList.toggle('atras', led.dirDer < 0);
    tTx += dt;
    if (tTx >= 2) {
      tTx = 0;
      ledTx.classList.remove('pulso');
      void ledTx.offsetWidth;
      ledTx.classList.add('pulso');
    }
  };
  const barra = $('#progreso');
  const construyeBarra = () => {
    const P = sim.P;
    barra.innerHTML = P.tramos.map((t, i) => `<i style="flex:${t.hastaM - t.desdeM}" class="t${i % 4}" title="${t.id}"><b>${t.id}</b></i>`).join('') + '<span id="marca"></span>';
  };

  // ---------------------------------------------------------------- mini-mapa estilo Gemelo Digital
  const mmCanvas = $('#minimapa-canvas');
  const mmCtx = mmCanvas ? mmCanvas.getContext('2d') : null;
  const mmPistaEl = $('#minimapa-pista');
  const mmLeyendaEl = $('#minimapa-leyenda');
  const COLORES_PC = {PC1: '#E8B90C', PC2: '#A78BFA', PC3: '#2DD4BF'};
  const etiquetaPc = (id) => (id === 'PC3' ? 'PC3 / META' : id);
  const actualizaLeyendaMinimapa = () => {
    const P = sim.P;
    if (mmPistaEl) mmPistaEl.textContent = `Pista ${P.id} · ${f(P.largoNominal || P.largo, 2)} m`;
    if (mmLeyendaEl) {
      const items = [`<span><i style="background:#F2603D"></i>INICIO</span>`];
      for (const pc of P.puntosControl || []) {
        items.push(`<span><i style="background:${COLORES_PC[pc.id] || '#2DD4BF'}"></i>${etiquetaPc(pc.id)} ${f(pc.distanciaM, 2)} m</span>`);
      }
      mmLeyendaEl.innerHTML = items.join('');
    }
  };
  const pintaMinimapa = () => {
    if (!mmCanvas || !mmCtx) return;
    const rect = mmCanvas.getBoundingClientRect();
    const cssW = Math.max(160, Math.round(rect.width || mmCanvas.width));
    const cssH = Math.max(76, Math.round(rect.height || mmCanvas.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (mmCanvas.width !== Math.round(cssW * dpr) || mmCanvas.height !== Math.round(cssH * dpr)) {
      mmCanvas.width = Math.round(cssW * dpr);
      mmCanvas.height = Math.round(cssH * dpr);
    }
    const ctx = mmCtx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    ctx.fillStyle = '#07101f';
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.strokeStyle = 'rgba(56,189,248,0.09)';
    ctx.lineWidth = 1;
    for (let x = 20; x < cssW; x += 24) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cssH); ctx.stroke();
    }
    for (let y = 18; y < cssH; y += 22) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cssW, y); ctx.stroke();
    }

    const P = sim.P;
    let xMin = Infinity, xMax = -Infinity, zMin = Infinity, zMax = -Infinity;
    for (let i = 0; i < P.N; i += 4) {
      if (P.X[i] < xMin) xMin = P.X[i];
      if (P.X[i] > xMax) xMax = P.X[i];
      if (P.Z[i] < zMin) zMin = P.Z[i];
      if (P.Z[i] > zMax) zMax = P.Z[i];
    }
    const padX = 24;
    const padY = 18;
    const esc = Math.min((cssW - padX * 2) / Math.max(0.1, xMax - xMin), (cssH - padY * 2) / Math.max(0.1, zMax - zMin));
    const ox = (cssW - (xMax - xMin) * esc) / 2;
    const oy = (cssH - (zMax - zMin) * esc) / 2;
    const sx = (x) => ox + (x - xMin) * esc;
    const sy = (z) => oy + (z - zMin) * esc;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = 0; i < P.N; i += 4) {
      const px = sx(P.X[i]);
      const py = sy(P.Z[i]);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(45,212,191,0.22)';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    const progM = sim.idx * P.paso;
    ctx.font = '700 9px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    ctx.textBaseline = 'middle';
    const dibujarNodo = (x, z, color, etiqueta, dy = -10, activo = false) => {
      const px = sx(x);
      const py = sy(z);
      ctx.beginPath();
      ctx.arc(px, py, activo ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#07101f';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#e2e8f0';
      ctx.textAlign = 'center';
      const ly = Math.max(9, Math.min(cssH - 8, py + dy));
      const lx = Math.max(20, Math.min(cssW - 20, px));
      ctx.fillText(etiqueta, lx, ly);
    };
    dibujarNodo(P.X[0], P.Z[0], '#F2603D', 'INICIO', -11, true);
    for (const pc of P.puntosControl || []) {
      const dy = pc.id === 'PC3' ? 12 : (pc.z < (zMin + zMax) / 2 ? -10 : 11);
      dibujarNodo(pc.x, pc.z, COLORES_PC[pc.id] || '#2DD4BF', etiquetaPc(pc.id), dy, progM >= pc.distanciaM);
    }

    const rx = sx(sim.eje.x);
    const ry = sy(sim.eje.z);
    const ang = Math.atan2(Math.cos(sim.eje.th), Math.sin(sim.eje.th));
    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(-5, -4.5);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-5, 4.5);
    ctx.closePath();
    ctx.fillStyle = sim.encendido ? '#4ade80' : '#facc15';
    ctx.fill();
    ctx.strokeStyle = '#07101f';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  };
  let prevTabla = '';
  let prevClaveTabla = '';
  let prevMarca = '';
  let prevTramoNom = '';
  let prevEstadoTxt = '';
  const refresca = () => {
    const L = sim.lectura();
    set('v-raw', L.raw.join(' · '));
    set('v-emed', `${sg(L.eMedido)} mm`);
    set('v-ereal', `${sg(L.eReal)} mm`);
    const estTxt = L.perdida ? 'Línea perdida' : 'En la línea';
    if (estTxt !== prevEstadoTxt) {
      prevEstadoTxt = estTxt;
      const estadoEl = nodo('#v-estado');
      estadoEl.textContent = estTxt;
      estadoEl.dataset.ok = L.perdida ? '0' : '1';
    }
    set('v-vel', `${f(Math.abs(L.v), 2)} m/s`);
    set('v-dist', `${f(L.distancia, 1)} m`);
    set('v-rumbo', `${Math.round(L.rumbo)}°`);
    set('v-vuelta', `${L.vuelta} · ${seg(L.tVuelta)}`);
    set('v-ultima', `${seg(L.ultimaVuelta)} (mejor ${seg(L.mejorVuelta)})`);
    set('v-tramo', `${L.tramo.id} · ${seg(L.tramo.t)}`);
    set('v-tramo-prev', L.tramoPrev ? `${L.tramoPrev.id}: ${seg(L.tramoPrev.t)}` : '—');
    set('v-salidas', String(L.salidas));
    set('v-pwm', `${Math.round(L.pwm.izq * 100)} / ${Math.round(L.pwm.der * 100)} %`);
    set('v-vel-ruedas', `${f(sim.vel.izq, 2)} / ${f(sim.vel.der, 2)}`);
    set('v-enc-izq', `${Math.round(enc.izq)} pls`);
    set('v-enc-der', `${Math.round(enc.der)} pls`);
    set('v-prog', `${f(L.progresoM, 2)} de ${f(L.largo, 2)} m`);
    actualizaDetallesJson();
    const marcaLeft = `${((L.progresoM / L.largo) * 100).toFixed(2)}%`;
    if (marcaLeft !== prevMarca) {
      prevMarca = marcaLeft;
      const marcaEl = nodo('#marca');
      if (marcaEl) marcaEl.style.left = marcaLeft;
      else prevMarca = '';
    }
    const tramoNom = `${L.tramo.nombre}${L.tramo.linea ? '' : ' · sin cinta'}`;
    if (tramoNom !== prevTramoNom) {
      prevTramoNom = tramoNom;
      nodo('#tramo-nombre').textContent = tramoNom;
    }
    const resumen = sim.resumen();
    const claveTabla = resumen.map((r) => [r.pista, r.modo, r.vueltas, r.mejor, r.vmedia, r.emax, r.erms, r.salidas].join(':')).join('|');
    if (claveTabla === prevClaveTabla) return;
    prevClaveTabla = claveTabla;
    const filas = resumen.sort((a, b) => (a.pista + a.modo).localeCompare(b.pista + b.modo));
    const tablaHtml = filas.length
      ? filas
          .map((r) => `<tr><th scope="row">${r.pista} · ${r.modo === 'auto' ? 'auto' : 'manual'}</th><td>${r.vueltas}</td><td>${r.mejor === null ? '—' : f(r.mejor)}</td><td>${f(r.vmedia, 2)}</td><td>${f(r.emax)}</td><td>${f(r.erms)}</td><td>${r.salidas}</td></tr>`)
          .join('')
      : '<tr><td colspan="7">Sin datos todavía</td></tr>';
    if (tablaHtml !== prevTabla) {
      prevTabla = tablaHtml;
      nodo('#comparacion tbody').innerHTML = tablaHtml;
    }
  };

  // ---------------------------------------------------------------- animación del robot
  const FLUJO = ['ena', 'enb', 'in1', 'in2', 'in3', 'in4', 'bat_l298', 'bat_lm', 'lm_esp', 'gnd', 'tcrt', 'us_f', 'us_r', 'mot_izq', 'mot_der', 'enc_izq_a', 'enc_izq_b', 'enc_der_a', 'enc_der_b'];
  const animar = (dt) => {
    const RW = 0.0325;
    anim.ang.izq += (sim.vel.izq / RW) * dt;
    anim.ang.der += (sim.vel.der / RW) * dt;
    enc.izq += sim.vel.izq * dt * CUENTAS_POR_METRO;
    enc.der += sim.vel.der * dt * CUENTAS_POR_METRO;
    anim.arm.izq = anim.ang.izq * 4;
    anim.arm.der = anim.ang.der * 4;
    for (const lado of ['izq', 'der']) {
      const fa = (((anim.arm[lado] * 11) / (2 * Math.PI)) % 1 + 1) % 1;
      const fb = (fa + 0.25) % 1;
      anim.hall[lado] = [fa < 0.5, fb < 0.5];
    }
    const a = anim.act;
    const di = Math.abs(sim.pwm.izq);
    const dd = Math.abs(sim.pwm.der);
    a.ena = di;
    a.enb = dd;
    a.in1 = sim.pwm.izq > 0.01 ? 1 : 0;
    a.in2 = sim.pwm.izq < -0.01 ? 1 : 0;
    a.in3 = sim.pwm.der > 0.01 ? 1 : 0;
    a.in4 = sim.pwm.der < -0.01 ? 1 : 0;
    a.bat_l298 = (di + dd) / 2;
    a.mot_izq = di;
    a.mot_der = dd;
    a.bat_lm = a.lm_esp = 0.55;
    a.gnd = 0.4;
    a.tcrt = a.us_f = a.us_r = 0.7;
    a.enc_izq_a = a.enc_izq_b = Math.min(1, Math.abs(sim.vel.izq) / 0.5);
    a.enc_der_a = a.enc_der_b = Math.min(1, Math.abs(sim.vel.der) / 0.5);
    for (const id of FLUJO) anim.flow[id] = ((anim.flow[id] ?? 0) + dt * (0.35 + 1.1 * (a[id] ?? 0))) % 1;
  };

  // ---------------------------------------------------------------- bucle (pausa rAF al estar detenido)
  let rafId = null;
  let ultimo = performance.now();
  let acRef = 0;
  function renderizarCuadro(dt) {
    if (sim.encendido) {
      ui.t += dt;
      mqtt.avanzar(dt);
      sim.avanzar(dt);
      animar(dt);
    }
    pose.position.set(sim.eje.x - Math.sin(sim.eje.th) * ZA, 0, sim.eje.z - Math.cos(sim.eje.th) * ZA);
    pose.rotation.y = sim.eje.th;
    const zF = zonaUltrasonido(us.frenteCm);
    const zR = zonaUltrasonido(us.atrasCm);
    robot.update({
      ang: anim.ang, arm: anim.arm, xray: 0, explode: 0, wires: 1, t: ui.t, flow: anim.flow, act: anim.act, hall: anim.hall,
      sens: sim.lectura().bin, zonaF: zF, zonaR: zR, dF: us.frenteCm / 100, dR: us.atrasCm / 100, sel: null,
    });
    sol.position.set(sim.eje.x + 1.0, 2.4, sim.eje.z + 0.8);
    sol.target.position.set(sim.eje.x, 0, sim.eje.z);
    seguirCamara(dt > 0 ? dt : 1 / 60);
    controls.update();
    renderer.render(scene, camera);
    if (sim.encendido) {
      pintaPlaca(dt);
      pintaMinimapa();
      acRef += dt;
      if (acRef > 0.1) {
        acRef = 0;
        refresca();
      }
    }
  }
  function bucle(ahora) {
    rafId = null;
    const dt = Math.min(0.25, Math.max(0, (ahora - ultimo) / 1000));
    ultimo = ahora;
    renderizarCuadro(dt);
    if (sim.encendido || Boolean(tween)) {
      rafId = requestAnimationFrame(bucle);
    }
  }
  function solicitarCuadro() {
    if (!rafId) {
      ultimo = performance.now();
      rafId = requestAnimationFrame(bucle);
    }
  }
  controls.addEventListener('change', () => {
    if (!sim.encendido) solicitarCuadro();
  });

  // ---------------------------------------------------------------- arranque
  new ResizeObserver(() => {
    resize();
    desplazaVista();
    sincronizaDpad();
    pintaMinimapa();
    solicitarCuadro();
  }).observe(canvas);
  resize();
  desplazaVista();
  actualizaUsUi();
  actualizaBateriaUi();
  actualizaMpuUi();
  ponModo('auto');
  ponPista('A');
  ponEncendido(false);
  irA('seguir', true);
  aviso.listo();
  abrirMenuInicio(true);
  avisoTeclado();

  // ayuda para capturas y pruebas del navegador
  window.SIM1 = {sim, ui, mqtt, us, enc, irA, ponModo, ponPista, ponEncendido, ponConexion, abrirMenuInicio, pintaMinimapa, reiniciar, camera, controls, pulsa, suelta, IDS_PISTA, repintado};
}
