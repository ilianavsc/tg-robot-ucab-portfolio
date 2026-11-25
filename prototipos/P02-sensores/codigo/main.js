// Inspector de hardware (P02): el robot recorre el circuito ovalado con obstáculos (Auto) o se maneja a mano con la
// modalidad del Simulador 1 (P04): W A S D o flechas, Espacio frena, o el D-Pad. Etiquetas 3D, rayos X y la tira
// de las 7 piezas. A la derecha, el panel oscuro integrado con las 4 consolas interactivas (assets/inspector_hw.js):
// el circuito publica sus lecturas en window.SimulationState y aplica lo que las consolas inyectan (obstáculo,
// desvío, consigna, IMU y fallos). Al enfocar una pieza, su consola sube y debajo aparece su ficha técnica.
import * as THREE from 'three';
import {SIN_WEBGL, crearAviso, vigilarContexto} from './arranque.js';
import {crearDemo} from './demo.js';
import {ETIQUETAS, FICHAS, ORDEN, ORDEN_TIRA, fmtDist, fmtDistCorta} from './fichas.js';
import {crearMundo} from './mundo.js';
import {R, VMAX} from './model.js';
import {MANUAL} from './demo.js';
import {buildRobot, RW} from './robot.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
const num = (v, d = 2) => v.toFixed(d).replace('.', ',');

const S = window.SimulationState; // estado central compartido con las consolas
const aviso = crearAviso(document.getElementById('app'));
aviso.cargando();

const canvas = $('#lienzo');
let mundo;
try {
  const demo = crearDemo({encendido: false});
  mundo = {demo, ...crearMundo(canvas, demo.ruta, demo.obstaculos)};
} catch (e) {
  console.error(e);
  aviso.error(...SIN_WEBGL);
  throw e;
}
vigilarContexto(canvas, aviso);
iniciar(mundo);

function iniciar({demo, renderer, scene, camera, controls, sol, pose, resize}) {
  const robot = buildRobot();
  // pose (posición y rumbo) → incl (pitch/roll de la MPU-6050 y sacudida de impacto) → robot
  const incl = new THREE.Group();
  pose.add(incl);
  incl.add(robot.root);
  // obstáculo virtual: aparece cuando la consola HC-SR04 inyecta una distancia
  const fantasma = new THREE.Group();
  const matFantasma = new THREE.MeshStandardMaterial({color: '#e8743b', transparent: true, opacity: 0.45, roughness: 0.5, depthWrite: false});
  const cuerpoF = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.12, 32), matFantasma);
  cuerpoF.position.y = 0.06;
  fantasma.add(cuerpoF);
  fantasma.visible = false;
  pose.add(fantasma);
  const ZF = robot.anchors.us_front.z;
  // aro de ubicación: solo se ve en la vista panorámica, donde el robot es pequeño
  const aro = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 48), new THREE.MeshBasicMaterial({color: '#F2603D', transparent: true, opacity: 0.85, depthWrite: false}));
  aro.rotation.x = -Math.PI / 2;
  aro.position.y = 0.004;
  aro.visible = false;
  pose.add(aro);
  const est = demo.est;

  // ---------------------------------------------------------------- estado de la interfaz
  const ui = {encendido: false, pausa: true, xray: 0, xrayMeta: 0, etiquetas: true, mando: false, vista: 'inspeccion', sel: null, t: 0, pitch: 0, roll: 0, sacudida: 0};
  let rafId = null;
  const anim = {
    ang: {izq: 0, der: 0},
    arm: {izq: 0, der: 0},
    flow: {},
    act: {},
    hall: {izq: [false, false], der: [false, false]},
  };

  // ---------------------------------------------------------------- cámara
  const VISTAS = {
    seguir: {off: new THREE.Vector3(-0.3, 0.45, -0.8), alto: 0.05},
    inspeccion: {off: new THREE.Vector3(0.38, 0.3, 0.46), alto: 0.05},
    general: {pos: new THREE.Vector3(0, 3.3, 3.0), tgt: new THREE.Vector3(0, 0, 0.05)},
  };
  const NOMBRE_VISTA = {seguir: 'Seguir', inspeccion: 'Inspección', general: 'Panorámica'};
  const yaw = new THREE.Vector3(0, 1, 0);
  let tween = null;
  let thPrev = est.th;
  const objetivoVista = (v) => {
    const c = VISTAS[v];
    if (v === 'general') return {pos: c.pos.clone(), tgt: c.tgt.clone()};
    const tgt = new THREE.Vector3(est.x, c.alto, est.z);
    const k = canvas.clientWidth < 640 ? 1.6 : 1; // en pantallas angostas la cámara se aleja un poco
    const pos = c.off.clone().multiplyScalar(k).applyAxisAngle(yaw, est.th).add(tgt);
    return {pos, tgt};
  };
  const irA = (v, instantaneo = false) => {
    ui.vista = v;
    aro.visible = v === 'general';
    if ($('#b-vista-tx')) $('#b-vista-tx').textContent = NOMBRE_VISTA[v];
    $$('[data-vista]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.vista === v)));
    controls.enablePan = v === 'general';
    controls.minDistance = v === 'general' ? 1 : 0.25;
    controls.maxDistance = v === 'general' ? 7 : 3;
    if (instantaneo) {
      const o = objetivoVista(v);
      camera.position.copy(o.pos);
      controls.target.copy(o.tgt);
      tween = null;
    } else {
      tween = {t: 0, p0: camera.position.clone(), t0: controls.target.clone()};
    }
  };
  const seguirCamara = (dt) => {
    if (ui.vista === 'general') {
      if (tween) avanzarTween(dt);
      return;
    }
    let dth = est.th - thPrev;
    if (dth > Math.PI) dth -= 2 * Math.PI;
    if (dth < -Math.PI) dth += 2 * Math.PI;
    thPrev = est.th;
    if (tween) {
      avanzarTween(dt);
      return;
    }
    // seguimiento rígido: la cámara acompaña al robot (traslación y giro), conservando lo que el usuario orbitó
    const off = camera.position.clone().sub(controls.target).applyAxisAngle(yaw, dth);
    controls.target.set(est.x, VISTAS[ui.vista].alto, est.z);
    camera.position.copy(controls.target).add(off);
  };
  const avanzarTween = (dt) => {
    tween.t = Math.min(1, tween.t + dt / 0.9);
    const e = tween.t * tween.t * (3 - 2 * tween.t);
    const o = objetivoVista(ui.vista);
    camera.position.lerpVectors(tween.p0, o.pos, e);
    controls.target.lerpVectors(tween.t0, o.tgt, e);
    if (tween.t >= 1) tween = null;
  };

  const desplazaVista = () => {
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };

  // ---------------------------------------------------------------- botones
  const bPausa = $('#b-pausa');
  const ponEncendido = (on) => {
    const activo = Boolean(on);
    ui.encendido = activo;
    ui.pausa = !activo;
    if (activo) demo.encender();
    else demo.detener();
    document.body.dataset.encendido = activo ? '1' : '0';
    bPausa.setAttribute('aria-pressed', String(activo));
    $('.tx', bPausa).textContent = activo ? '⏹ Detener' : '⚡ Encender';
    bPausa.classList.toggle('en-pausa', !activo);
    if (!activo) candado = null;
    publicar(true);
    if (!activo) {
      soltarTodo();
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      renderizarCuadro(0);
    } else {
      solicitarCuadro();
    }
  };
  const ponPausa = (p) => ponEncendido(!p);
  bPausa.addEventListener('click', () => ponEncendido(!ui.encendido));
  const bX = $('#b-xray');
  bX.addEventListener('click', () => {
    ui.xrayMeta = ui.xrayMeta ? 0 : 1;
    bX.setAttribute('aria-pressed', String(!!ui.xrayMeta));
    bX.setAttribute('aria-checked', String(!!ui.xrayMeta));
    solicitarCuadro();
  });
  const bE = $('#b-etiq');
  const ponEtiquetas = (on) => {
    ui.etiquetas = on;
    bE.setAttribute('aria-pressed', String(on));
    bE.setAttribute('aria-checked', String(on));
    $('#etiquetas').hidden = !on;
    $('#guias').style.display = on ? '' : 'none';
    if (on) solicitarCuadro();
  };
  bE.addEventListener('click', () => ponEtiquetas(!ui.etiquetas));

  // Menús desplegables (Herramientas ▾, Vista ▾, Ajustes ⚙)
  const menus = [
    [$('#b-herramientas'), $('#menu-herramientas')],
    [$('#b-vista'), $('#menu-vista')],
    [$('#b-ajustes'), $('#menu-ajustes')],
  ].filter(([b, m]) => b && m);
  const cerrarMenus = (excepto = null) => {
    menus.forEach(([b, m]) => {
      if (m === excepto) return;
      m.hidden = true;
      b.setAttribute('aria-expanded', 'false');
    });
  };
  menus.forEach(([b, m]) => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const abrir = m.hidden;
      cerrarMenus(abrir ? m : null);
      m.hidden = !abrir;
      b.setAttribute('aria-expanded', String(abrir));
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest || !e.target.closest('.p02-menu-wrap')) cerrarMenus();
  });
  $$('[data-vista]').forEach((b) => {
    b.addEventListener('click', () => {
      irA(b.dataset.vista);
      cerrarMenus();
      solicitarCuadro();
    });
  });
  const dpadEl = $('#dpad');
  const ponMando = (on) => {
    ui.mando = Boolean(on);
    if (dpadEl) dpadEl.hidden = !ui.mando;
    if (!ui.mando) {
      botones.clear();
      aplicaEntrada();
    }
  };

  // ---------------------------------------------------------------- manejo: la modalidad del Simulador 1 (P04)
  const teclas = new Set();
  const botones = new Set();
  const MAPA = {KeyW: 'arriba', ArrowUp: 'arriba', KeyS: 'abajo', ArrowDown: 'abajo', KeyA: 'izq', ArrowLeft: 'izq', KeyD: 'der', ArrowRight: 'der', Space: 'stop'};
  const activo = (k) => teclas.has(k) || botones.has(k);
  let candado = null; // dirección fijada desde la consola Velocidad · Dir. (hasta tocar otra tecla o volver a Auto)
  const aplicaEntrada = () => {
    const algo = teclas.size > 0 || botones.size > 0;
    if (algo) candado = null;
    est.entrada = candado && !algo
      ? {...candado}
      : {
          f: (activo('arriba') ? 1 : 0) - (activo('abajo') ? 1 : 0),
          t: (activo('izq') ? 1 : 0) - (activo('der') ? 1 : 0),
          freno: activo('stop'),
        };
    $$('[data-dp]').forEach((b) => b.classList.toggle('on', activo(b.dataset.dp)));
  };
  const ponModo = (m) => {
    if (m === 'auto') candado = null;
    demo.setModo(m);
    document.body.dataset.modo = m;
    $$('[data-modo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modo === m)));
    ponMando(m === 'manual');
    aplicaEntrada();
  };
  // tocar un control toma el mando (pasa a manual) cuando está encendido
  const tomaControl = () => {
    if (!ui.encendido) return;
    if (est.modo !== 'manual') ponModo('manual');
  };
  $$('[data-modo]').forEach((b) => b.addEventListener('click', () => {
    ponModo(b.dataset.modo);
    publicar(true);
  }));
  // las teclas no se roban cuando se usa un control (sliders de las consolas, botones, enlaces)
  const enControl = (e) => {
    const t = e.target;
    return t && t.closest && Boolean(t.closest('input, select, textarea, button, a, summary, #hw-panel'));
  };
  addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || enControl(e)) return;
    if (e.code === 'KeyM' && !e.repeat) {
      ponModo(est.modo === 'auto' ? 'manual' : 'auto');
      publicar(true);
      return;
    }
    if (!ui.encendido) return;
    const k = MAPA[e.code];
    if (!k) return;
    e.preventDefault();
    if (!teclas.has(k)) {
      teclas.add(k);
      tomaControl();
      aplicaEntrada();
    }
  });
  addEventListener('keyup', (e) => {
    const k = MAPA[e.code];
    if (!teclas.has(k)) return;
    if (!k) return;
    e.preventDefault();
    teclas.delete(k);
    aplicaEntrada();
  });
  const soltarTodo = () => {
    teclas.clear();
    botones.clear();
    aplicaEntrada();
  };
  addEventListener('blur', soltarTodo);
  // pestaña oculta: se suelta el mando y el bucle 3D se detiene del todo; al volver se reanuda con el reloj al día
  let pausadoPorOculto = false;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      soltarTodo();
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        pausadoPorOculto = true;
      }
    } else if (pausadoPorOculto || ui.encendido) {
      pausadoPorOculto = false;
      solicitarCuadro(); // reinicia `ultimo`: sin salto de física por el tiempo que estuvo oculta
    }
  });
  // D-Pad: pulsación sostenida (pointer) y touch como respaldo, igual que el Simulador 1
  const pulsa = (k) => {
    if (!ui.encendido) return;
    if (botones.has(k)) return;
    botones.add(k);
    tomaControl();
    aplicaEntrada();
  };
  const suelta = (k) => {
    if (botones.delete(k)) aplicaEntrada();
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
  });
  canvas.addEventListener('pointerdown', () => window.focus());

  // ---------------------------------------------------------------- tira de componentes y ficha técnica en el panel
  const tira = $('#tira');
  tira.innerHTML = ORDEN_TIRA.map((id) => {
    const f = FICHAS[id];
    const extra = id === 'tcrt' ? '<span class="sq" aria-hidden="true"></span>'.repeat(4) : '';
    return `<button class="chip" data-comp="${id}" style="--c:${f.color}" aria-pressed="false"><b>${esc(f.corto)}</b><span class="res">${esc(f.resumen || '')}</span><span class="v" data-v="${id}">${extra}</span></button>`;
  }).join('');
  const hwFicha = $('#hw-ficha');
  const hwPanel = $('#hw-panel');
  const CONSOLA_COMP = {tcrt: 'tcrt5000', us: 'hcsr04', us_front: 'hcsr04', us_rear: 'hcsr04', mpu: 'mpu6050', traccion: 'motores', esp32: 'motores', bateria: null};
  const normalizaComp = (id) => (id === 'us_front' || id === 'us_rear' ? 'us' : id || null);
  const sincronizarFocoPanel = (id) => {
    if (!hwPanel) return;
    if (id) {
      hwPanel.dataset.focoActivo = '1';
      hwPanel.dataset.focoCard = CONSOLA_COMP[id] || 'ninguna';
    } else {
      delete hwPanel.dataset.focoActivo;
      delete hwPanel.dataset.focoCard;
    }
  };
  // el bloque compacto de datos técnicos del proyecto va dentro del panel oscuro, justo debajo de su consola
  const abrirFicha = (rawId, desdePanel = false) => {
    const id = normalizaComp(rawId);
    ui.sel = id;
    if (id) $('#pista-tocar').hidden = true;
    $$('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.comp === id)));
    $$('.et').forEach((e) => e.classList.toggle('act', normalizaComp(e.dataset.comp) === id));
    sincronizarFocoPanel(ui.sel);
    if (hwFicha) {
      if (id) {
        const f = FICHAS[id];
        const [cls, txt] = f.estado;
        hwFicha.style.setProperty('--c', f.color);
        hwFicha.innerHTML = `
          <div class="hw-ficha-head"><b>${esc(f.nombre)}</b><span class="hw-ficha-estado ${cls}">${esc(txt)}</span></div>
          <p class="hw-ficha-rol">${esc(f.rol)}</p>
          <h3>Datos técnicos del proyecto</h3>
          <dl class="hw-ficha-datos">${f.datos.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
          <h3>En vivo (circuito)</h3>
          <dl class="hw-ficha-datos vivo" id="f-vivo"></dl>
          <p class="hw-ficha-nota">${esc(f.nota)}</p>`;
        prevFichaHtml = '';
        refrescaFicha();
      } else hwFicha.innerHTML = '';
    }
    const focoEstado = ui.sel === 'us' ? 'us_front' : ui.sel;
    const consolaSel = ui.sel ? CONSOLA_COMP[ui.sel] : null;
    if (!desdePanel && S && (S.get().foco !== focoEstado || S.get().seleccion !== consolaSel)) S.set({foco: focoEstado, seleccion: consolaSel}, 'circuito-ui');
    if (ui.sel === 'us' && $('#hw-panel-titulo')) $('#hw-panel-titulo').textContent = 'Enfocado · HC-SR04P · Radar dual';
    dibujarRadarDual();
    solicitarCuadro();
  };
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarMenus();
      if (ui.sel) abrirFicha(null);
    }
  });
  tira.addEventListener('click', (e) => {
    const b = e.target.closest('[data-comp]');
    if (b) abrirFicha(ui.sel === b.dataset.comp ? null : b.dataset.comp);
  });

  // ---------------------------------------------------------------- etiquetas 3D con guías
  const cont = $('#etiquetas');
  const guias = $('#guias');
  const etq = ORDEN.map((id) => {
    const el = document.createElement('button');
    el.className = 'et';
    el.dataset.comp = id;
    el.style.setProperty('--c', FICHAS[id].color);
    cont.appendChild(el);
    const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guias.appendChild(ln);
    return {id, el, ln, w: 0, h: 0, x: 0, y: 0, txt: ''};
  });
  cont.addEventListener('click', (e) => {
    const b = e.target.closest('[data-comp]');
    if (b) {
      const id = normalizaComp(b.dataset.comp);
      abrirFicha(ui.sel === id ? null : id);
    }
  });

  // ---------------------------------------------------------------- selección con clic en el 3D
  const ray = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let down = null;
  const pick = (ev) => {
    const r = canvas.getBoundingClientRect();
    mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(robot.pickables, false)[0];
    return hit ? hit.object.userData.comp : null;
  };
  canvas.addEventListener('pointerdown', (ev) => (down = {x: ev.clientX, y: ev.clientY, t: performance.now()}));
  canvas.addEventListener('pointerup', (ev) => {
    if (!down) return;
    const mov = Math.hypot(ev.clientX - down.x, ev.clientY - down.y);
    const dur = performance.now() - down.t;
    down = null;
    if (mov > 6 || dur > 600) return;
    const id = normalizaComp(pick(ev));
    if (id) abrirFicha(id === ui.sel ? null : id);
  });
  let movPend = null;
  canvas.addEventListener('pointermove', (ev) => {
    if (ev.buttons) return;
    movPend = ev;
    if (!ui.encendido) {
      canvas.style.cursor = pick(movPend) ? 'pointer' : '';
      movPend = null;
    }
  });

  // ---------------------------------------------------------------- lectura en vivo
  const vista = () => {
    const m = demo.motores();
    return {sens: est.sens, dF: est.frente, dR: est.atras, zonaF: demo.zonaFrente(), zonaR: demo.zonaAtras(), mot: m, v: est.v, w: est.w, th: est.th};
  };
  let prevFichaHtml = '';
  function refrescaFicha() {
    if (!ui.sel) {
      prevFichaHtml = '';
      return;
    }
    const f = FICHAS[ui.sel];
    const html = f.vivo(vista()).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
    if (html === prevFichaHtml) return;
    prevFichaHtml = html;
    $('#f-vivo').innerHTML = html;
  }
  const prevTira = {};
  const PEOR_ZONA = (a, b) => (a === 'critica' || b === 'critica' ? 'critica' : a === 'precaucion' || b === 'precaucion' ? 'precaucion' : 'libre');
  const refrescaTira = () => {
    const v = vista();
    const txt = {
      us: `F: ${fmtDistCorta(v.dF)} · T: ${fmtDistCorta(v.dR)}`,
      esp32: 'MQTT + PWM',
      mpu: 'heading hold',
      traccion: `${num(v.v)} m/s`,
      bateria: `${num(R.vbat, 1)} V nominal`,
    };
    for (const id of ORDEN_TIRA) {
      const el = $(`[data-v="${id}"]`, tira);
      if (!el) continue;
      if (id === 'tcrt') {
        const clave = v.sens.join('');
        if (prevTira[id] !== clave) {
          prevTira[id] = clave;
          $$('.sq', el).forEach((q, i) => q.classList.toggle('on', !!v.sens[i]));
        }
      } else {
        const zona = id === 'us' ? PEOR_ZONA(v.zonaF, v.zonaR) : '';
        const clave = `${txt[id]}|${zona}`;
        if (prevTira[id] !== clave) {
          prevTira[id] = clave;
          el.textContent = txt[id];
          if (zona) el.dataset.zona = zona;
        }
      }
    }
  };

  // ---------------------------------------------------------------- animación de la pieza
  const FLUJO = ['ena', 'enb', 'in1', 'in2', 'in3', 'in4', 'bat_l298', 'bat_lm', 'lm_esp', 'gnd', 'tcrt', 'us_f', 'us_r', 'mot_izq', 'mot_der', 'enc_izq_a', 'enc_izq_b', 'enc_der_a', 'enc_der_b'];
  const animar = (dt) => {
    const m = demo.motores();
    anim.ang.izq += (est.vIzq / RW) * dt;
    anim.ang.der += (est.vDer / RW) * dt;
    anim.arm.izq = anim.ang.izq * 4;
    anim.arm.der = anim.ang.der * 4;
    const fase = (a, o) => ((a * 11) / (2 * Math.PI) + o) % 1;
    for (const lado of ['izq', 'der']) {
      const f = (fase(anim.arm[lado], 0) + 1) % 1;
      const g = (fase(anim.arm[lado], 0.25) + 1) % 1;
      anim.hall[lado] = [f < 0.5, g < 0.5];
    }
    const a = anim.act;
    a.ena = m.dutyIzq;
    a.enb = m.dutyDer;
    a.in1 = est.vIzq > 0.01 ? 1 : 0;
    a.in2 = est.vIzq < -0.01 ? 1 : 0;
    a.in3 = est.vDer > 0.01 ? 1 : 0;
    a.in4 = est.vDer < -0.01 ? 1 : 0;
    a.bat_l298 = (m.dutyIzq + m.dutyDer) / 2;
    a.mot_izq = m.dutyIzq;
    a.mot_der = m.dutyDer;
    a.bat_lm = a.lm_esp = 0.55;
    a.gnd = 0.4;
    a.tcrt = a.us_f = a.us_r = 0.7;
    a.enc_izq_a = a.enc_izq_b = Math.min(1, m.encIzq / 400);
    a.enc_der_a = a.enc_der_b = Math.min(1, m.encDer / 400);
    for (const id of FLUJO) anim.flow[id] = ((anim.flow[id] ?? 0) + dt * (0.35 + 1.1 * (a[id] ?? 0))) % 1;
  };

  // ---------------------------------------------------------------- etiquetas: posición en pantalla
  const proj = new THREE.Vector3();
  const centro = new THREE.Vector3();
  const colocaEtiquetas = () => {
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const estrecho = W < 640;
    const v = vista();
    centro.set(0, 0.06, 0.0);
    incl.localToWorld(centro).project(camera);
    const cx = (centro.x * 0.5 + 0.5) * W;
    const cy = (-centro.y * 0.5 + 0.5) * H;
    const top = estrecho ? 108 : 58;
    const bot = H - (estrecho ? 86 : 64);
    const dcha = W;
    const lista = [];
    for (const e of etq) {
      const A = robot.anchors[e.id];
      proj.copy(A);
      incl.localToWorld(proj);
      const lejos = proj.distanceTo(camera.position);
      proj.project(camera);
      if (proj.z > 1 || lejos > 2.2) {
        e.el.style.display = 'none';
        e.ln.style.display = 'none';
        continue;
      }
      const ax = (proj.x * 0.5 + 0.5) * W;
      const ay = (-proj.y * 0.5 + 0.5) * H;
      const t = (estrecho ? ETIQUETAS[e.id].corto : ETIQUETAS[e.id].largo)(v);
      if (t !== e.txt) {
        e.el.textContent = t;
        e.txt = t;
        e.w = e.h = 0;
      }
      e.el.style.display = '';
      if (!e.w) {
        e.w = e.el.offsetWidth;
        e.h = e.el.offsetHeight;
      }
      let dx = ax - cx;
      let dy = ay - cy;
      const m = Math.hypot(dx, dy) || 1;
      const off = estrecho ? 30 : 46;
      dx /= m;
      dy /= m;
      if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) dy = -1;
      e.ax = ax;
      e.ay = ay;
      e.x = ax + dx * off + (dx >= 0 ? e.w / 2 : -e.w / 2) * Math.abs(dx);
      e.y = ay + dy * off;
      lista.push(e);
    }
    // separa las que se pisan
    for (let it = 0; it < 6; it++) {
      for (let i = 0; i < lista.length; i++) {
        for (let j = i + 1; j < lista.length; j++) {
          const a = lista[i];
          const b = lista[j];
          const ox = (a.w + b.w) / 2 + 4 - Math.abs(a.x - b.x);
          const oy = (a.h + b.h) / 2 + 3 - Math.abs(a.y - b.y);
          if (ox > 0 && oy > 0) {
            const s = (a.y <= b.y ? 1 : -1) * (oy / 2 + 0.5);
            a.y -= s;
            b.y += s;
          }
        }
      }
    }
    for (const e of lista) {
      const x = Math.min(Math.max(e.x, e.w / 2 + 6), dcha - e.w / 2 - 6);
      const y = Math.min(Math.max(e.y, top + e.h / 2), bot - e.h / 2);
      e.el.style.transform = `translate(${Math.round(x - e.w / 2)}px, ${Math.round(y - e.h / 2)}px)`;
      e.ln.style.display = '';
      e.ln.setAttribute('x1', e.ax.toFixed(1));
      e.ln.setAttribute('y1', e.ay.toFixed(1));
      e.ln.setAttribute('x2', x.toFixed(1));
      e.ln.setAttribute('y2', y.toFixed(1));
      e.ln.style.stroke = FICHAS[e.id].color;
    }
  };

  // ---------------------------------------------------------------- sincronización bidireccional con SimulationState
  // circuito → consolas: lecturas en vivo (≈ 20 Hz en marcha, al instante con el robot apagado)
  let acPub = 0;
  let vPrev = 0;
  let aLong = 0;
  const direccionDe = () => {
    if (!ui.encendido || (Math.abs(est.v) < 0.02 && Math.abs(est.w) < 0.3)) return 'DETENIDO';
    if (Math.abs(est.w) > 1.2 && Math.abs(est.v) < 0.15) return est.w > 0 ? 'IZQUIERDA' : 'DERECHA';
    return est.v >= 0 ? 'ADELANTE' : 'ATRÁS';
  };
  function publicar(forzar, dt = 0) {
    if (!S) return;
    acPub += dt;
    if (!forzar && ui.encendido && acPub < 0.05) return;
    if (!forzar && !ui.encendido) return;
    if (acPub > 0) aLong = aLong * 0.6 + 0.4 * ((est.v - vPrev) / Math.max(acPub, 1e-3));
    vPrev = est.v;
    acPub = 0;
    const g = 9.81;
    const aLat = est.v * est.w;
    const vib = ui.encendido && Math.abs(est.v) > 0.02 ? 0.25 * Math.sin(ui.t * 37) : 0;
    S.publicarCircuito({
      encendido: ui.encendido,
      modo: est.modo,
      distanciaCm: est.frente * 100,
      atrasCm: est.atras * 100,
      canales: est.sens,
      desvioMm: -est.eLat * 1000, // + la cinta queda a la derecha de la regleta
      velEfectivaMs: ui.encendido ? est.v : 0,
      pwmIzq: (est.pwm.izq || 0) * 100,
      pwmDer: (est.pwm.der || 0) * 100,
      direccion: direccionDe(),
      bloqueado: est.bloqueado,
      pitchDeg: Math.max(-6, Math.min(6, (aLong / g) * 57.3 * 0.35)) + vib,
      rollDeg: Math.max(-6, Math.min(6, (aLat / g) * 57.3 * 0.35)),
      acelG: Math.hypot(1, aLong / g, aLat / g),
    });
  }
  // consolas → circuito: lo inyectado se aplica a la física de la demo y el 3D reacciona al instante
  let desvioAplicado = 0;
  let eventoPrev = 'normal';
  const aplicarInyecciones = (s) => {
    const iny = est.iny;
    iny.frente = s.inyeccion.hcsr04 ? s.hcsr04.distanciaCm / 100 : null;
    iny.sinEcoFrente = s.salud.hcsr04 === 'fallo';
    iny.sinLinea = s.salud.tcrt5000 === 'fallo';
    iny.vConsigna = s.inyeccion.motores ? s.motores.velocidadMs : null;
    iny.paro = s.seguridad.paroForzado ? s.seguridad.motivos[0] || 'parada' : null;
    iny.paroAtras = s.seguridad.permiteAtras;
    iny.atasco = s.inyeccion.mpu6050 && s.mpu6050.evento === 'atascamiento';
    const desvio = s.inyeccion.tcrt5000 ? s.tcrt5000.desvioMm / 1000 : 0;
    // en Auto el control lleva al robot al desvío pedido; en Manual o apagado se corre de lado al instante
    if (!ui.encendido || est.modo === 'manual') demo.desplazarLateral(desvio - desvioAplicado);
    desvioAplicado = desvio;
    iny.desvio = desvio;
    if (s.mpu6050.evento === 'impacto' && eventoPrev !== 'impacto') ui.sacudida = 1;
    eventoPrev = s.mpu6050.evento;
    demo.medir();
  };
  const ejecutarOrden = (tipo, valor) => {
    if (tipo !== 'direccion') return;
    const MAPA_DIR = {ADELANTE: {f: 1, t: 0}, 'ATRÁS': {f: -1, t: 0}, IZQUIERDA: {f: 0, t: 1}, DERECHA: {f: 0, t: -1}, DETENIDO: {f: 0, t: 0, freno: true}};
    const o = MAPA_DIR[valor];
    if (!o) return;
    if (!ui.encendido && valor !== 'DETENIDO') ponEncendido(true);
    if (est.modo !== 'manual') ponModo('manual');
    teclas.clear();
    botones.clear();
    candado = {freno: false, ...o};
    aplicaEntrada();
    publicar(true);
  };
  function conectarEstado() {
    if (!S) return;
    S.alComando(ejecutarOrden);
    S.subscribe((s, origen) => {
      if (origen === 'circuito') return;
      aplicarInyecciones(s);
      const focoNorm = normalizaComp(s.foco);
      if (focoNorm !== ui.sel) abrirFicha(focoNorm, true);
      if (ui.sel === 'us' && $('#hw-panel-titulo')) $('#hw-panel-titulo').textContent = 'Enfocado · HC-SR04P · Radar dual';
      publicar(true);
      dibujarRadarDual();
      solicitarCuadro();
    });
    aplicarInyecciones(S.get());
    publicar(true);
  }

  // ---------------------------------------------------------------- radar dual HC-SR04P (frontal arriba + trasero abajo)
  const inAtras = $('#hw-in-dist-atras');
  const lblAtras = $('#hw-lbl-dist-atras');
  const btnVivoUs = $('#hw-vivo-hcsr04');
  const btnReset = $('#hw-btn-reset');
  let radarSweep = 0;
  let radarDir = 1;
  const limpiarInyAtras = () => {
    est.iny.atras = null;
    if (lblAtras) lblAtras.textContent = 'Vivo';
    demo.medir();
    publicar(true);
    dibujarRadarDual();
  };
  if (inAtras) {
    inAtras.addEventListener('input', (e) => {
      const cm = Number(e.target.value);
      est.iny.atras = cm / 100;
      if (lblAtras) lblAtras.textContent = `${cm} cm`;
      demo.medir();
      publicar(true);
      dibujarRadarDual();
      solicitarCuadro();
    });
  }
  if (btnVivoUs) btnVivoUs.addEventListener('click', limpiarInyAtras);
  if (btnReset) btnReset.addEventListener('click', limpiarInyAtras);

  function dibujarRadarDual() {
    const c = $('#hw-canvas-radar-dual');
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.clientWidth || c.width || 260;
    const h = c.clientHeight || c.height || 164;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(w * dpr);
    const H = Math.round(h * dpr);
    if (c.clientWidth && (c.width !== W || c.height !== H)) {
      c.width = W;
      c.height = H;
    }
    if (ctx.setTransform) ctx.setTransform(c.clientWidth ? dpr : 1, 0, 0, c.clientWidth ? dpr : 1, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const s = S ? S.get() : null;
    const fallo = Boolean(s && s.salud.hcsr04 === 'fallo');
    const dF = s ? s.hcsr04.distanciaCm : est.frente * 100;
    const dR = est.iny.atras != null ? est.iny.atras * 100 : (s && s.hcsr04.atrasCm != null ? s.hcsr04.atrasCm : est.atras * 100);
    const zonaCm = (cm) => (fallo ? 'fallo' : cm < 20 ? 'critica' : cm < 50 ? 'precaucion' : 'libre');
    const zF = zonaCm(dF);
    const zR = zonaCm(dR);
    const colZona = (z) => (z === 'critica' || z === 'fallo' ? '#EF4444' : z === 'precaucion' ? '#F59E0B' : '#00F2FE');
    const fillZona = (z) => (z === 'critica' || z === 'fallo' ? 'rgba(239,68,68,0.22)' : z === 'precaucion' ? 'rgba(245,158,11,0.16)' : 'rgba(0,242,254,0.12)');

    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w * 0.42, h * 0.43);

    // Anillos concéntricos 20 / 50 / 80 cm (frente arriba + atrás abajo)
    ctx.lineWidth = 1;
    ctx.font = '9.5px "JetBrains Mono", monospace';
    [[20, 'rgba(239,68,68,0.52)'], [50, 'rgba(245,158,11,0.45)'], [80, 'rgba(0,242,254,0.3)']].forEach(([cm, col]) => {
      const r = maxR * (cm / 80);
      ctx.beginPath();
      ctx.strokeStyle = col;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#849495';
      ctx.fillText(String(cm), cx + r + 3, cy + 3);
    });

    // Línea divisoria central (frente / atrás)
    ctx.strokeStyle = 'rgba(132,148,149,0.28)';
    ctx.beginPath();
    ctx.moveTo(cx - maxR - 8, cy);
    ctx.lineTo(cx + maxR + 8, cy);
    ctx.stroke();

    // Etiquetas FRENTE / ATRÁS
    ctx.fillStyle = '#849495';
    ctx.font = '700 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('FRENTE ▲', 8, 13);
    ctx.fillText('ATRÁS ▼', 8, h - 6);

    const dibujaSector = (dirSign, dCm, z) => {
      const baseAng = dirSign < 0 ? -Math.PI / 2 : Math.PI / 2;
      const ab = (28 * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, baseAng - ab, baseAng + ab, false);
      ctx.closePath();
      ctx.fillStyle = fillZona(z);
      ctx.fill();
      if (fallo) return;
      const col = colZona(z);
      const sw = baseAng + (dirSign < 0 ? radarSweep : -radarSweep);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sw) * maxR, cy + Math.sin(sw) * maxR);
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      if (Number.isFinite(dCm) && dCm <= 80) {
        const r = Math.max(6, (dCm / 80) * maxR);
        const ey = cy + dirSign * r;
        ctx.beginPath();
        ctx.arc(cx, ey, 5, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, ey, 9, 0, Math.PI * 2);
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    };

    dibujaSector(-1, dF, zF); // Superior: frontal
    dibujaSector(1, dR, zR);  // Inferior: trasero

    // Chasis central del robot
    ctx.fillStyle = '#181C22';
    ctx.strokeStyle = '#E0FDFF';
    ctx.lineWidth = 1.5;
    ctx.fillRect(cx - 10, cy - 7, 20, 14);
    ctx.strokeRect(cx - 10, cy - 7, 20, 14);

    if (fallo) {
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 10.5px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SIN ECO · FALLO', cx, cy - 16);
      ctx.textAlign = 'left';
    }

    // Refuerza color numérico de ATRÁS y badge global si atrás está en alerta
    const elAtras = $('#hw-val-atras');
    if (elAtras) {
      elAtras.textContent = fallo ? '---' : (!Number.isFinite(dR) || dR >= 400 ? '> 4 m' : Math.round(dR) + ' cm');
      elAtras.className = 'hw-metric-v' + (zR === 'critica' || zR === 'fallo' ? ' peligro' : zR === 'precaucion' ? ' aviso' : '');
    }
    const badgeH = $('#hw-badge-hcsr04');
    if (badgeH && !fallo && zF === 'libre' && zR !== 'libre') {
      badgeH.textContent = zR === 'critica' ? 'ATRÁS < 20 cm' : 'ATRÁS PRECAUCIÓN';
      badgeH.className = 'hw-badge ' + (zR === 'critica' ? 'peligro' : 'aviso');
    }
  }
  window.setInterval(() => {
    radarSweep += radarDir * 0.05;
    if (radarSweep > 0.44) { radarSweep = 0.44; radarDir = -1; }
    if (radarSweep < -0.44) { radarSweep = -0.44; radarDir = 1; }
    dibujarRadarDual();
  }, 80);
  // el robot 3D refleja la IMU (pitch/roll), el impacto y el obstáculo inyectado
  const DEG = Math.PI / 180;
  const aplicaPose = (dt) => {
    const s = S ? S.get() : null;
    const p = s ? s.mpu6050.pitchDeg * DEG : 0;
    const r = s ? s.mpu6050.rollDeg * DEG : 0;
    const k = 1 - Math.exp(-dt * 10);
    ui.pitch += (p - ui.pitch) * k;
    ui.roll += (r - ui.roll) * k;
    ui.sacudida = Math.max(0, ui.sacudida - dt * 1.4);
    const sx = ui.sacudida * 0.012 * Math.sin(ui.t * 70 + performance.now() / 15);
    incl.rotation.set(-ui.pitch, 0, ui.roll + sx * 4);
    incl.position.set(sx, Math.max(Math.sin(Math.abs(ui.pitch)) * 0.06, Math.sin(Math.abs(ui.roll)) * 0.04), 0);
    const iny = s && s.inyeccion.hcsr04 && s.salud.hcsr04 !== 'fallo';
    fantasma.visible = Boolean(iny);
    if (iny) fantasma.position.set(0, 0, ZF + s.hcsr04.distanciaCm / 100 + 0.045);
  };
  const poseEnTransicion = () => {
    const s = S ? S.get() : null;
    if (!s) return false;
    return ui.sacudida > 0 || Math.abs(s.mpu6050.pitchDeg * DEG - ui.pitch) > 0.002 || Math.abs(s.mpu6050.rollDeg * DEG - ui.roll) > 0.002;
  };

  // ---------------------------------------------------------------- bucle (pausa rAF al estar detenido; inspección bajo demanda)
  let ultimo = performance.now();
  let acRefresco = 0;
  let acPaso = 0;
  const PASO = 1 / 120;
  function renderizarCuadro(dt) {
    if (ui.encendido) {
      ui.t += dt;
      // paso fijo de 1/120 s: el control no depende de los cuadros por segundo del navegador
      acPaso += dt;
      while (acPaso >= PASO) {
        demo.paso(PASO);
        animar(PASO);
        acPaso -= PASO;
      }
    }
    const pasoVisual = dt > 0 ? dt : 1 / 60;
    ui.xray += (ui.xrayMeta - ui.xray) * Math.min(1, pasoVisual * 6);
    if (Math.abs(ui.xrayMeta - ui.xray) < 0.002) ui.xray = ui.xrayMeta;
    if (aro.visible) aro.scale.setScalar(ui.encendido ? 1 + 0.12 * Math.sin(ui.t * 4) : 1);
    pose.position.set(est.x, 0, est.z);
    pose.rotation.y = est.th;
    aplicaPose(pasoVisual);
    robot.update({
      ang: anim.ang,
      arm: anim.arm,
      xray: ui.xray,
      explode: 0,
      wires: 1,
      t: ui.t,
      flow: anim.flow,
      act: anim.act,
      hall: anim.hall,
      sens: est.sens,
      zonaF: demo.zonaFrente(),
      zonaR: demo.zonaAtras(),
      dF: est.frente,
      dR: est.atras,
      sel: ui.sel === 'us' ? 'us_front' : ui.sel,
    });
    // la luz con sombra acompaña al robot
    sol.position.set(est.x + 1.0, 2.4, est.z + 0.8);
    sol.target.position.set(est.x, 0, est.z);
    seguirCamara(pasoVisual);
    controls.update();
    if (movPend) {
      canvas.style.cursor = pick(movPend) ? 'pointer' : '';
      movPend = null;
    }
    renderer.render(scene, camera);
    if (ui.etiquetas) colocaEtiquetas();
    publicar(false, dt);
    if (ui.encendido) {
      acRefresco += dt;
      if (acRefresco > 0.12) {
        acRefresco = 0;
        refrescaTira();
        refrescaFicha();
      }
    } else {
      refrescaTira();
      refrescaFicha();
    }
  }
  function bucle(ahora) {
    rafId = null;
    if (document.hidden) {
      pausadoPorOculto = true; // no se agenda otro cuadro hasta que la pestaña vuelva a verse
      return;
    }
    const dt = Math.min(0.25, Math.max(0, (ahora - ultimo) / 1000));
    ultimo = ahora;
    renderizarCuadro(dt);
    const transicionActiva = Boolean(tween) || Math.abs(ui.xrayMeta - ui.xray) > 0.002 || poseEnTransicion();
    if (ui.encendido || transicionActiva) {
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
    if (!ui.encendido) solicitarCuadro();
  });

  // ---------------------------------------------------------------- arranque
  new ResizeObserver(() => {
    resize();
    desplazaVista();
    solicitarCuadro();
  }).observe(canvas);
  // el D-Pad y la pista se apoyan sobre la tira de componentes
  const app = $('#app');
  const medirTira = () => app.style.setProperty('--alto-tira', `${tira.offsetHeight}px`);
  new ResizeObserver(medirTira).observe(tira);
  resize();
  irA('inspeccion', true);
  ponEtiquetas(true); // la inspección es lo principal: etiquetas 3D encendidas en todos los tamaños
  ponMando(false); // D-Pad oculto por defecto hasta pulsar Controles
  conectarEstado();
  thPrev = est.th;
  irA('inspeccion', true);
  ponEncendido(false);
  aviso.listo();

  // ayuda para las capturas y las pruebas
  window.VITRINA = {
    demo,
    ui,
    abrirFicha,
    irA,
    ponEncendido,
    ponPausa,
    ponEtiquetas,
    ponMando,
    ponModo,
    estado: S,
    manual: MANUAL,
    vmax: VMAX,
    xray: (on) => {
      ui.xrayMeta = on ? 1 : 0;
      bX.setAttribute('aria-pressed', String(!!on));
      solicitarCuadro();
    },
    camera,
    controls,
  };
}
