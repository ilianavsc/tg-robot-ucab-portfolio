// Robot 3D del Inspector de hardware unificado (P02). Lee y escribe solo en window.SimulationState
// (assets/inspector_hw.js): distancia HC-SR04, 4 canales TCRT5000, velocidad/PWM, pitch/roll/alertas MPU-6050
// y estado de seguridad. Simulación local (SIL) con datos sintéticos; sin MQTT.
// Se empaqueta con construir_inspector.mjs en ../inspector3d.js.
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {buildRobot, RW} from './robot.js';
import {CINTA} from './ruta.js';

const FONDO = '#dfe8e5';
// consola ↔ pieza del modelo 3D
const A_PIEZA = {hcsr04: 'us_front', tcrt5000: 'tcrt', motores: 'traccion', mpu6050: 'mpu'};
const A_CONSOLA = {us_front: 'hcsr04', us_rear: 'hcsr04', tcrt: 'tcrt5000', traccion: 'motores', mpu: 'mpu6050', esp32: null, bateria: 'motores'};
const COL_SEG = {NOMINAL: '#0F9D84', PRECAUCION: '#E8B90C', PARADA: '#F2603D'};
const ZONA = {critica: 'critica', precaucion: 'precaucion', libre: 'libre', fallo: 'libre'};

function texturaPiso() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#e4ebe8';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const v = 200 + Math.floor(Math.random() * 40);
    g.fillStyle = `rgba(${v - 20},${v - 10},${v - 14},0.55)`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 1.4);
  }
  // marcas cada 10 cm para que se note el avance
  g.fillStyle = 'rgba(20,33,61,0.16)';
  g.fillRect(0, 0, 256, 3);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function fallo(contenedor, msg) {
  const f = contenedor.querySelector('#hw-3d-fallback');
  if (f) {
    f.hidden = false;
    if (msg) f.textContent = msg;
  }
}

function iniciar() {
  const S = window.SimulationState;
  const canvas = document.getElementById('hw-robot3d');
  if (!S || !canvas) return;
  const caja = canvas.parentElement;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({canvas, antialias: true, powerPreference: 'high-performance'});
  } catch (e) {
    fallo(caja, 'Tu navegador no pudo iniciar el 3D. Las consolas siguen funcionando con el mismo estado.');
    return;
  }
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    fallo(caja, 'Se perdió el contexto 3D. Recarga la página; las consolas siguen activas.');
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FONDO);
  scene.fog = new THREE.Fog(FONDO, 2.2, 5);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.02, 20);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.12;
  controls.enablePan = false;
  controls.minDistance = 0.28;
  controls.maxDistance = 1.6;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.target.set(0, 0.05, 0.06);

  scene.add(new THREE.HemisphereLight('#ffffff', '#a9b5b0', 0.75));
  const sol = new THREE.DirectionalLight('#fff6e8', 2.1);
  sol.position.set(0.6, 1.4, 0.5);
  sol.castShadow = true;
  sol.shadow.mapSize.set(1024, 1024);
  Object.assign(sol.shadow.camera, {left: -0.5, right: 0.5, top: 0.5, bottom: -0.5, near: 0.2, far: 4});
  sol.shadow.bias = -0.0004;
  sol.shadow.normalBias = 0.002;
  scene.add(sol);

  // piso y cinta negra recta de 19 mm (el piso se desplaza con la velocidad)
  const texPiso = texturaPiso();
  texPiso.repeat.set(30, 30);
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshStandardMaterial({map: texPiso, roughness: 0.6}));
  piso.rotation.x = -Math.PI / 2;
  piso.receiveShadow = true;
  scene.add(piso);
  const cinta = new THREE.Mesh(
    new THREE.PlaneGeometry(CINTA, 3),
    new THREE.MeshStandardMaterial({color: '#0b0c0e', roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1}),
  );
  cinta.rotation.x = -Math.PI / 2;
  cinta.position.y = 0.0007;
  cinta.receiveShadow = true;
  scene.add(cinta);

  // bidón frente al HC-SR04: su posición es la distancia del estado central
  const bidon = new THREE.Group();
  const BR = 0.045;
  const cuerpo = new THREE.Mesh(new THREE.CylinderGeometry(BR, BR, 0.12, 32), new THREE.MeshStandardMaterial({color: '#e8743b', roughness: 0.5}));
  cuerpo.position.y = 0.06;
  const banda = new THREE.Mesh(new THREE.CylinderGeometry(BR + 0.0008, BR + 0.0008, 0.025, 32), new THREE.MeshStandardMaterial({color: '#f4f6f5', roughness: 0.5}));
  banda.position.y = 0.075;
  bidon.add(cuerpo, banda);
  bidon.traverse((o) => (o.castShadow = o.receiveShadow = true));
  scene.add(bidon);

  // robot: pose (rumbo + desvío lateral) → inclinación (pitch/roll MPU-6050) → modelo
  const pose = new THREE.Group();
  const incl = new THREE.Group();
  pose.add(incl);
  scene.add(pose);
  const robot = buildRobot();
  incl.add(robot.root);
  const aro = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.17, 64), new THREE.MeshBasicMaterial({color: COL_SEG.NOMINAL, transparent: true, opacity: 0.75, depthWrite: false}));
  aro.rotation.x = -Math.PI / 2;
  aro.position.set(0, 0.0015, 0.02);
  pose.add(aro);
  const ZF = robot.anchors.us_front.z;

  const anim = {ang: {izq: 0, der: 0}, arm: {izq: 0, der: 0}, flow: {}, act: {}, hall: {izq: [false, false], der: [false, false]}, t: 0, yaw: 0, sacudida: 0, pitch: 0, roll: 0, desvio: 0, avance: 0};
  let ultimoEvento = 'normal';

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const k = w < 520 ? 1.1 : 0.9;
    if (!resize.hecho) {
      camera.position.set(0.36 * k, 0.28 * k, 0.5 * k);
      resize.hecho = true;
    }
  };
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);

  // clic en una pieza → selecciona su consola en el estado central
  const ray = new THREE.Raycaster();
  const ptr = new THREE.Vector2();
  let abajo = null;
  canvas.addEventListener('pointerdown', (e) => (abajo = {x: e.clientX, y: e.clientY}));
  canvas.addEventListener('pointerup', (e) => {
    if (!abajo || Math.hypot(e.clientX - abajo.x, e.clientY - abajo.y) > 6) return;
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(robot.pickables, false)[0];
    const comp = hit && hit.object.userData.comp;
    if (comp && comp in A_CONSOLA) S.set({seleccion: A_CONSOLA[comp]}, '3d');
  });

  let visible = true;
  if (window.IntersectionObserver) new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(canvas);

  let tPrev = performance.now();
  const lerp = (a, b, k) => a + (b - a) * k;
  const DEG = Math.PI / 180;

  function cuadro() {
    requestAnimationFrame(cuadro);
    const ahora = performance.now();
    const dt = Math.min((ahora - tPrev) / 1000, 0.05);
    tPrev = ahora;
    if (!visible || document.hidden) return;
    const s = S.get();
    const m = s.motores;
    const i = s.mpu6050;
    anim.t += dt;
    const k = 1 - Math.exp(-dt * 10);

    // ruedas: velocidad lineal de cada lado según el PWM; con atascamiento giran sin avanzar
    const sentido = m.direccion === 'ATRÁS' ? -1 : 1;
    const vRueda = {izq: (m.pwmIzq / 100) * 0.57 * sentido, der: (m.pwmDer / 100) * 0.57 * sentido};
    if (s.salud.motores === 'fallo') vRueda.izq = vRueda.der = 0;
    for (const lado of ['izq', 'der']) {
      anim.ang[lado] += (vRueda[lado] / RW) * dt;
      anim.arm[lado] += (vRueda[lado] / RW) * 21.3 * dt * 0.25;
      const fase = Math.floor(anim.arm[lado] / 0.6);
      anim.hall[lado] = [fase % 2 === 0, Math.floor(fase / 2) % 2 === 0];
    }
    // avance aparente: el piso corre bajo el robot
    anim.avance += m.velEfectivaMs * dt;
    texPiso.offset.y = (anim.avance * 10) % 1;

    // rumbo visual al girar y desvío lateral respecto a la cinta (TCRT5000)
    const giro = m.pwm > 0 && !m.bloqueado ? (m.direccion === 'IZQUIERDA' ? 1 : m.direccion === 'DERECHA' ? -1 : 0) : 0;
    anim.yaw = lerp(anim.yaw, giro * 0.22, k * 0.5);
    anim.desvio = lerp(anim.desvio, s.tcrt5000.desvioMm / 1000, k);
    pose.rotation.y = anim.yaw;
    pose.position.x = -anim.desvio; // desvío + → la cinta queda a la izquierda del robot
    // MPU-6050: pitch (+ nariz arriba) y roll; impacto = sacudida
    if (i.evento === 'impacto' && ultimoEvento !== 'impacto') anim.sacudida = 1;
    ultimoEvento = i.evento;
    anim.sacudida = Math.max(0, anim.sacudida - dt * 1.4);
    const sx = anim.sacudida * 0.012 * Math.sin(anim.t * 70);
    anim.pitch = lerp(anim.pitch, i.pitchDeg * DEG, k);
    anim.roll = lerp(anim.roll, i.rollDeg * DEG, k);
    incl.rotation.set(-anim.pitch, 0, anim.roll + sx * 4);
    incl.position.set(sx, Math.max(0, Math.sin(Math.abs(anim.pitch)) * 0.06, Math.sin(Math.abs(anim.roll)) * 0.04), 0);
    // bidón a la distancia medida
    const d = s.hcsr04.distanciaCm / 100;
    bidon.position.set(pose.position.x + Math.sin(anim.yaw) * (ZF + d + BR), 0, Math.cos(anim.yaw) * (ZF + d + BR));
    // aro de seguridad
    aro.material.color.set(COL_SEG[s.seguridad.estado]);
    aro.material.opacity = s.seguridad.estado === 'PARADA' ? 0.55 + 0.4 * Math.sin(anim.t * 8) : 0.7;

    // cables: órdenes al L298N según el PWM y señales de sensores siempre vivas
    const flujo = (id, v) => {
      anim.flow[id] = ((anim.flow[id] || 0) + v * dt) % 1;
      anim.act[id] = Math.min(1, Math.abs(v) * 1.5 + 0.05);
    };
    ['ena', 'in1', 'in2'].forEach((id) => flujo(id, m.pwmIzq / 100));
    ['enb', 'in3', 'in4'].forEach((id) => flujo(id, m.pwmDer / 100));
    flujo('mot_izq', m.pwmIzq / 100);
    flujo('mot_der', m.pwmDer / 100);
    flujo('tcrt', s.salud.tcrt5000 === 'fallo' ? 0 : 0.5);
    flujo('us_f', s.salud.hcsr04 === 'fallo' ? 0 : 0.6);
    flujo('us_r', 0.3);
    for (const id of ['bat_l298', 'bat_lm', 'lm_esp', 'gnd']) flujo(id, 0.25);

    const zona = ZONA[s.hcsr04.zona] || 'libre';
    robot.update({
      ang: anim.ang,
      arm: anim.arm,
      xray: 0,
      wires: 1,
      t: anim.t,
      flow: anim.flow,
      act: anim.act,
      hall: anim.hall,
      sens: s.salud.tcrt5000 === 'fallo' ? [0, 0, 0, 0] : s.tcrt5000.canales,
      zonaF: zona,
      dF: s.hcsr04.zona === 'fallo' ? Infinity : d,
      zonaR: 'libre',
      dR: Infinity,
      sel: s.seleccion ? A_PIEZA[s.seleccion] : null,
    });
    controls.update();
    renderer.render(scene, camera);
  }
  canvas.setAttribute('data-listo', '1');
  cuadro();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();
