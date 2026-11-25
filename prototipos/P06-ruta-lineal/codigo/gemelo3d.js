// P06 · Gemelo digital 3D de la ruta lineal.
// - Robot: el MISMO modelo 3D oficial de P02/P04 (buildRobot de P04, que es el de P02 con opciones), importado tal cual.
// - Escena: pasillo con la base, la cinta guía, los puntos de control PC1–PC3 (cambian de color al cruzarlos en la ida
//   y en el retorno), la marca de parada/destino y el obstáculo inyectado.
// - Todo se lee de window.SimulationState (ruta_lineal.js); este módulo no tiene lógica de la máquina de estados.
// - No tiene bucle propio: ruta_lineal_ui.js llama a GemeloP06.cuadro(e, dt) desde su único requestAnimationFrame
//   (que se pausa con document.hidden).
// Ejes: el pasillo va por +z (x del núcleo), +x es la izquierda del sentido de ida (y del núcleo).
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RW, buildRobot} from '../../P04-simulador-1-esp32/codigo/robot.js';

const S = window.SimulationState;
const canvas = document.getElementById('rl-canvas3d');
const canvas2d = document.getElementById('rl-canvas');
const botonVista = document.getElementById('rl-vista');

function iniciar() {
  if (!S || !canvas) return null;
  const G = S.GEO;
  // colores desde tokens.css (assets/js/tokens_canvas.js); el segundo valor es solo el respaldo
  const T = window.TGTokens || {paleta: (d) => Object.fromEntries(Object.entries(d).map(([k, v]) => [k, v[1]]))};
  const C = T.paleta({
    piso: ['--tg-sim-piso', '#E4ECE9'], pared: ['--tg-sim-pared', '#C5D2CD'], paredExtremo: ['--tg-sim-pared-extremo', '#B3C3BD'],
    cinta: ['--tg-sim-cinta', '#0B0C0E'], obstaculo: ['--tg-sim-obstaculo', '#EA580C'], obstaculoClaro: ['--tg-sim-obstaculo-claro', '#FB923C'],
    base: ['--tg-accent', '#0F9D84'], destino: ['--tg-coral', '#F2603D'], alarma: ['--tg-purple', '#6B4EE6'],
    pendiente: ['--tg-text-subtle', '#64748B'], ida: ['--tg-dark-accent', '#00F2FE'], retorno: ['--tg-dark-ok', '#34D399'],
    texto: ['--tg-border-strong', '#0F172A'], blanco: ['--tg-surface', '#FFFFFF'], fondo: ['--tg-sim-piso-oscuro', '#DCE5E2'],
  });

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({canvas, antialias: true, powerPreference: 'high-performance'});
  } catch (err) {
    console.warn('P06: sin WebGL, se usa la vista 2D', err && err.message);
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(C.fondo);
  scene.fog = new THREE.Fog(C.fondo, 7, 16);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.HemisphereLight('#ffffff', '#a9b5b0', 0.75));
  const sol = new THREE.DirectionalLight('#fff6e8', 2.0);
  sol.castShadow = true;
  sol.shadow.mapSize.set(1024, 1024);
  Object.assign(sol.shadow.camera, {left: -0.7, right: 0.7, top: 0.7, bottom: -0.7, near: 0.3, far: 5});
  sol.shadow.bias = -0.0004;
  sol.shadow.normalBias = 0.002;
  scene.add(sol, sol.target);

  const std = (color, extra = {}) => new THREE.MeshStandardMaterial({color, roughness: 0.6, ...extra});
  const basico = (color, extra = {}) => new THREE.MeshBasicMaterial({color, ...extra});

  // ---- pasillo
  const semi = G.anchoPasillo / 2;
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(G.anchoPasillo + 0.6, G.largo + 0.8), std(C.piso, {roughness: 0.7}));
  piso.rotation.x = -Math.PI / 2;
  piso.position.set(0, 0, G.largo / 2);
  piso.receiveShadow = true;
  scene.add(piso);
  const pared = (w, h, d, x, z, color) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), std(color));
    m.position.set(x, h / 2, z);
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
    return m;
  };
  pared(0.04, 0.14, G.largo, semi + 0.02, G.largo / 2, C.pared);
  pared(0.04, 0.14, G.largo, -semi - 0.02, G.largo / 2, C.pared);
  pared(G.anchoPasillo + 0.08, 0.2, 0.04, 0, -0.02, C.paredExtremo);
  pared(G.anchoPasillo + 0.08, 0.2, 0.04, 0, G.largo + 0.02, C.paredExtremo);
  // zona de la base
  const zonaBase = new THREE.Mesh(new THREE.PlaneGeometry(G.anchoPasillo, G.marcaBase + 0.2), basico(C.base, {transparent: true, opacity: 0.16, depthWrite: false}));
  zonaBase.rotation.x = -Math.PI / 2;
  zonaBase.position.set(0, 0.0004, (G.marcaBase + 0.2) / 2);
  scene.add(zonaBase);
  // cinta guía negra y marcas transversales (base y parada)
  const plano = (w, l, z, color, y = 0.0008) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, l), std(color, {roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1}));
    m.rotation.x = -Math.PI / 2;
    m.position.set(0, y, z);
    m.receiveShadow = true;
    scene.add(m);
    return m;
  };
  const z0 = G.marcaBase - G.anchoMarca, z1 = G.marcaParada + G.anchoMarca;
  plano(G.cinta, z1 - z0, (z0 + z1) / 2, C.cinta);
  plano(0.12, G.anchoMarca, G.marcaBase, C.cinta, 0.001);
  plano(0.12, G.anchoMarca, G.marcaParada, C.cinta, 0.001);

  // ---- rótulos (sprites con canvas)
  const rotulo = (texto, fondo, color = '#FFFFFF', alto = 0.075) => {
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    ctx.font = '700 44px "JetBrains Mono", ui-monospace, monospace';
    const w = Math.ceil(ctx.measureText(texto).width) + 36;
    cv.width = w;
    cv.height = 72;
    ctx.font = '700 44px "JetBrains Mono", ui-monospace, monospace';
    ctx.fillStyle = fondo;
    ctx.beginPath();
    ctx.roundRect(0, 0, w, 72, 18);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, 18, 38);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({map: tex, depthTest: false, transparent: true}));
    sp.scale.set((alto * w) / 72, alto, 1);
    sp.renderOrder = 20;
    return sp;
  };
  const rBase = rotulo('BASE · INICIO', C.base);
  rBase.position.set(0, 0.32, G.marcaBase - 0.15);
  scene.add(rBase);
  const rDestino = rotulo('PARADA · DESTINO', C.destino);
  rDestino.position.set(0, 0.32, G.marcaParada + 0.12);
  scene.add(rDestino);
  // bandera del destino
  const mastil = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.26, 12), std('#475569'));
  mastil.position.set(semi - 0.08, 0.13, G.marcaParada);
  scene.add(mastil);
  const banderaMat = std(C.destino, {side: THREE.DoubleSide});
  const bandera = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.055), banderaMat);
  bandera.position.set(semi - 0.08 - 0.045, 0.23, G.marcaParada);
  bandera.rotation.y = Math.PI / 2;
  scene.add(bandera);

  // ---- puntos de control PC1–PC3: aro en el piso + baliza lateral + rótulo; color según el estado
  const puntos = G.puntosControl.map((p) => {
    const mat = basico(C.pendiente, {transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false});
    const aro = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.085, 48), mat);
    aro.rotation.x = -Math.PI / 2;
    aro.position.set(0, 0.0015, p.x);
    scene.add(aro);
    const linea = new THREE.Mesh(new THREE.PlaneGeometry(G.anchoPasillo - 0.06, 0.006), mat);
    linea.rotation.x = -Math.PI / 2;
    linea.position.set(0, 0.0012, p.x);
    scene.add(linea);
    const matBaliza = std(C.pendiente, {emissive: new THREE.Color(C.pendiente), emissiveIntensity: 0.25});
    const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.16, 16), matBaliza);
    poste.position.set(-semi + 0.06, 0.08, p.x);
    poste.castShadow = true;
    scene.add(poste);
    const luz = new THREE.Mesh(new THREE.SphereGeometry(0.022, 20, 14), matBaliza);
    luz.position.set(-semi + 0.06, 0.175, p.x);
    scene.add(luz);
    const r = rotulo(p.id, C.texto);
    r.position.set(-semi + 0.06, 0.25, p.x);
    scene.add(r);
    return {id: p.id, mat, matBaliza, estado: ''};
  });
  const pintarPuntos = (e) => {
    e.puntosControl.forEach((p, i) => {
      const estado = p.retorno ? 'retorno' : p.ida ? 'ida' : 'pendiente';
      const pt = puntos[i];
      if (!pt || pt.estado === estado) return;
      pt.estado = estado;
      const col = new THREE.Color(C[estado]);
      pt.mat.color.copy(col);
      pt.matBaliza.color.copy(col);
      pt.matBaliza.emissive.copy(col);
      pt.matBaliza.emissiveIntensity = estado === 'pendiente' ? 0.15 : 0.9;
    });
  };

  // ---- obstáculo inyectado (bidón)
  const obstaculo = new THREE.Group();
  const cuerpo = new THREE.Mesh(new THREE.CylinderGeometry(G.radioObstaculo, G.radioObstaculo, 0.12, 32), std(C.obstaculo));
  cuerpo.position.y = 0.06;
  const banda = new THREE.Mesh(new THREE.CylinderGeometry(G.radioObstaculo + 0.0008, G.radioObstaculo + 0.0008, 0.024, 32), std(C.blanco));
  banda.position.y = 0.075;
  obstaculo.add(cuerpo, banda);
  obstaculo.traverse((o) => (o.castShadow = o.receiveShadow = true));
  obstaculo.visible = false;
  scene.add(obstaculo);

  // ---- robot oficial (P02/P04): pose (posición + rumbo) → incl (pitch/roll de la MPU) → modelo
  const pose = new THREE.Group();
  const incl = new THREE.Group();
  pose.add(incl);
  scene.add(pose);
  const robot = buildRobot({tz: G.tcrtAdelante});
  incl.add(robot.root);
  const aro = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.18, 64), basico(C.alarma, {transparent: true, opacity: 0, depthWrite: false}));
  aro.rotation.x = -Math.PI / 2;
  aro.position.y = 0.002;
  pose.add(aro);

  // ---- cámara: Seguir robot (por defecto) o Vista completa de la pista; en ambas se puede rotar y hacer zoom
  const camera = new THREE.PerspectiveCamera(42, 1, 0.02, 40);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.12;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.minDistance = 0.3;
  controls.maxDistance = 9;
  let modo = 'seguir';
  let tween = null;
  const angosto = () => canvas.clientWidth < 560;
  const objetivo = (m, e) => {
    if (m === 'completa') return encuadrePista();
    const r = robotMundo(e);
    const k = angosto() ? 1.35 : 1;
    return {tgt: r.clone().setY(0.06), pos: r.clone().add(new THREE.Vector3(0.75 * k, 0.55 * k, -0.7 * k))};
  };
  const robotMundo = (e) => new THREE.Vector3(e.robot.y, 0, e.robot.x);
  // Vista completa: busca (por bisección) la distancia mínima a la que las esquinas del pasillo caben en pantalla.
  // En pantallas verticales mira a lo largo del pasillo desde detrás de la base; en horizontales, de costado.
  const esquinas = [];
  for (const x of [-semi - 0.05, semi + 0.05]) for (const y of [0, 0.2]) for (const z of [-0.05, G.largo + 0.05]) esquinas.push(new THREE.Vector3(x, y, z));
  const cam2 = new THREE.PerspectiveCamera();
  const encuadrePista = () => {
    const vertical = camera.aspect < 0.95;
    const tgt = new THREE.Vector3(0, 0, G.largo / 2);
    const dir = (vertical ? new THREE.Vector3(0.28, 0.82, -0.5) : new THREE.Vector3(0.62, 0.78, -0.12)).normalize();
    cam2.copy(camera);
    const cabe = (d) => {
      cam2.position.copy(tgt).addScaledVector(dir, d);
      cam2.lookAt(tgt);
      cam2.updateMatrixWorld(true);
      const v = new THREE.Vector3();
      return esquinas.every((p) => { v.copy(p).project(cam2); return Math.abs(v.x) <= 0.9 && Math.abs(v.y) <= 0.86; });
    };
    let lo = 0.5, hi = 40;
    for (let i = 0; i < 18; i++) { const mid = (lo + hi) / 2; if (cabe(mid)) hi = mid; else lo = mid; }
    return {tgt, pos: tgt.clone().addScaledVector(dir, hi)};
  };
  const ponModo = (m) => {
    modo = m;
    tween = {t: 0, p0: camera.position.clone(), t0: controls.target.clone()};
    controls.enablePan = m === 'completa';
    if (botonVista) {
      botonVista.setAttribute('aria-pressed', String(m === 'completa'));
      botonVista.textContent = m === 'completa' ? '🎥 Seguir robot' : '🗺️ Vista completa';
    }
  };
  if (botonVista) {
    botonVista.hidden = false;
    botonVista.addEventListener('click', () => ponModo(modo === 'seguir' ? 'completa' : 'seguir'));
  }
  const ultimoRobot = new THREE.Vector3();
  let primera = true;

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);

  // estado visual de las ruedas y los cables
  const anim = {ang: {izq: 0, der: 0}, arm: {izq: 0, der: 0}, flow: {}, act: {}, hall: {izq: [false, false], der: [false, false]}, t: 0, pitch: 0, roll: 0, sacudida: 0, evento: 'normal'};
  const DEG = Math.PI / 180;
  const FLUJO = ['ena', 'enb', 'in1', 'in2', 'in3', 'in4', 'bat_l298', 'bat_lm', 'lm_esp', 'gnd', 'tcrt', 'us_f', 'us_r', 'mot_izq', 'mot_der', 'enc_izq_a', 'enc_izq_b', 'enc_der_a', 'enc_der_b'];

  function cuadro(e, dt) {
    dt = Math.min(dt || 0, 0.1);
    anim.t += dt;
    const k = 1 - Math.exp(-dt * 10);
    // ---- pose del robot (el mismo rumbo que el núcleo: dirección del tramo + giro manual/automático + error de rumbo)
    const rb = e.robot;
    const rumbo = (rb.dir > 0 ? 0 : Math.PI) + rb.yawGiro * DEG + rb.psi;
    pose.position.set(rb.y, 0, rb.x);
    pose.rotation.y = rumbo;
    if (e.mpu6050.evento === 'impacto' && anim.evento !== 'impacto') anim.sacudida = 1;
    anim.evento = e.mpu6050.evento;
    anim.sacudida = Math.max(0, anim.sacudida - dt * 1.4);
    const sx = anim.sacudida * 0.01 * Math.sin(anim.t * 70);
    anim.pitch += (e.mpu6050.pitchDeg * DEG - anim.pitch) * k;
    anim.roll += (e.mpu6050.rollDeg * DEG - anim.roll) * k;
    incl.rotation.set(-anim.pitch, 0, anim.roll + sx * 4);
    incl.position.set(sx, Math.max(Math.sin(Math.abs(anim.pitch)) * 0.06, Math.sin(Math.abs(anim.roll)) * 0.04), 0);
    // ---- ruedas: velocidad de cada lado desde el PWM (en el giro manual las mueve el operador)
    const vRueda = (pwm) => (pwm / 100) * S.LIMITES.vPwm100;
    let vIzq = vRueda(e.motores.pwmIzq), vDer = vRueda(e.motores.pwmDer);
    if (e.ruta.sub === 'girando') { vIzq = -0.05; vDer = 0.05; }
    for (const [lado, v] of [['izq', vIzq], ['der', vDer]]) {
      anim.ang[lado] += (v / RW) * dt;
      anim.arm[lado] = anim.ang[lado] * 4;
      const fase = (((anim.arm[lado] * 11) / (2 * Math.PI)) % 1 + 1) % 1;
      anim.hall[lado] = [fase < 0.5, (fase + 0.25) % 1 < 0.5];
    }
    const a = anim.act;
    a.ena = Math.abs(e.motores.pwmIzq) / 100;
    a.enb = Math.abs(e.motores.pwmDer) / 100;
    a.in1 = e.motores.pwmIzq > 1 ? 1 : 0;
    a.in2 = e.motores.pwmIzq < -1 ? 1 : 0;
    a.in3 = e.motores.pwmDer > 1 ? 1 : 0;
    a.in4 = e.motores.pwmDer < -1 ? 1 : 0;
    a.mot_izq = a.ena;
    a.mot_der = a.enb;
    a.bat_l298 = (a.ena + a.enb) / 2;
    a.bat_lm = a.lm_esp = 0.55;
    a.gnd = 0.4;
    a.tcrt = a.us_f = a.us_r = 0.7;
    a.enc_izq_a = a.enc_izq_b = Math.min(1, Math.abs(vIzq) * 2);
    a.enc_der_a = a.enc_der_b = Math.min(1, Math.abs(vDer) * 2);
    for (const id of FLUJO) anim.flow[id] = ((anim.flow[id] ?? 0) + dt * (0.35 + 1.1 * (a[id] ?? 0))) % 1;
    robot.update({
      ang: anim.ang, arm: anim.arm, xray: 0, explode: 0, wires: 1, t: anim.t, flow: anim.flow, act: anim.act, hall: anim.hall,
      sens: e.tcrt5000.canales,
      zonaF: e.hcsr04.zona, dF: e.hcsr04.distanciaM, zonaR: 'libre', dR: Infinity,
      sel: null,
    });
    // ---- alarma de reposición y giro: aro violeta alrededor del robot
    const alarma = e.alarma.activa || e.ruta.sub === 'girando';
    aro.material.opacity = alarma ? 0.45 + 0.35 * Math.sin(anim.t * 6) : 0;
    // ---- obstáculo y puntos de control
    obstaculo.visible = Boolean(e.obstaculo);
    if (e.obstaculo) obstaculo.position.set(0, 0, e.obstaculo.x);
    pintarPuntos(e);
    // ---- cámara
    const r = robotMundo(e);
    if (primera) {
      const o = objetivo(modo, e);
      camera.position.copy(o.pos);
      controls.target.copy(o.tgt);
      ultimoRobot.copy(r);
      primera = false;
    }
    if (tween) {
      tween.t = Math.min(1, tween.t + dt / 0.9);
      const s = tween.t * tween.t * (3 - 2 * tween.t);
      const o = objetivo(modo, e);
      camera.position.lerpVectors(tween.p0, o.pos, s);
      controls.target.lerpVectors(tween.t0, o.tgt, s);
      if (tween.t >= 1) tween = null;
    } else if (modo === 'seguir') {
      // seguimiento suave: la cámara se traslada con el robot y conserva el ángulo que eligió el usuario
      const tgt = r.clone().setY(0.06);
      const paso = tgt.sub(controls.target).multiplyScalar(1 - Math.exp(-dt * 4));
      controls.target.add(paso);
      camera.position.add(paso);
    }
    ultimoRobot.copy(r);
    sol.position.set(r.x + 0.9, 2.4, r.z + 0.7);
    sol.target.position.copy(r);
    controls.update();
    renderer.render(scene, camera);
  }

  // con el 3D activo, el lienzo 2D queda como respaldo oculto
  canvas.hidden = false;
  if (canvas2d) canvas2d.hidden = true;
  const alarmaHtml = document.getElementById('rl-alarma');
  if (alarmaHtml) alarmaHtml.style.top = '';
  return {activo: true, cuadro, ponModo, get modo() { return modo; }, camera, controls, scene};
}

let api = null;
try {
  api = iniciar();
} catch (err) {
  console.warn('P06: no se pudo iniciar el gemelo 3D, se usa la vista 2D', err && err.message);
  api = null;
}
window.GemeloP06 = api || {activo: false};
