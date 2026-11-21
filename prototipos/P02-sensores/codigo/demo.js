// El robot del Inspector de hardware (P02): recorre solo la ruta cerrada (automático) o se maneja a mano
// con la misma modalidad del Simulador 1 (P04): W A S D / flechas o D-Pad, Espacio frena.
// No es la máquina de estados de teach-and-repeat (esa vive en specs/navegacion y en el Gemelo Digital (P05)).
import {R, VMAX, cinematica, dutyPara, encoderHz, motor, ruedas} from './model.js';
import {GEO, OBSTACULOS, ZONAS, crearRuta, lineaSensores, ultrasonido, zonaDe} from './ruta.js';

export const V_NOM = 0.4; // m/s, parecida a la del seguidor de línea P04 (supuesto de simulación)
const LOOK = 0.16; // distancia de mira (m)
const TAU = 0.08; // lag de los motores (s)
const KP = 25; // rad/s por metro de error lateral
const KD = 0.4;

// Manejo manual: los mismos valores del Simulador 1 (P04 · sim.js): PWM máximo al avanzar, PWM diferencial al
// girar y constante de la rampa (s)
export const MANUAL = {avance: 0.8, giro: 0.45, suavizado: 0.08};
// Zona del piso por la que se puede manejar (el piso de granito mide 9 × 6,5 m)
export const LIMITES = {x: 4.2, z: 3.0};
const lim1 = (x) => Math.max(-1, Math.min(1, x));

export function crearDemo() {
  const ruta = crearRuta();
  const obstaculos = OBSTACULOS;
  const p0 = ruta.en(0);
  const est = {
    x: p0.x,
    z: p0.z,
    th: Math.atan2(p0.tx, p0.tz),
    t: 0,
    vIzq: 0,
    vDer: 0,
    hint: 0,
    vuelta: 0,
    sPrev: 0,
    sens: [0, 1, 1, 0],
    frente: Infinity,
    atras: Infinity,
    w: 0,
    v: 0,
    eLat: 0,
    modo: 'auto',
    entrada: {f: 0, t: 0, freno: false}, // f: +1 avanza / −1 retrocede · t: +1 izquierda / −1 derecha
    cmd: {f: 0, t: 0},
    pwm: {izq: 0, der: 0},
    bloqueado: false, // frente a < 20 cm: el firmware no deja avanzar ni girar (solo retroceder)
  };

  // Cambia entre 'auto' y 'manual'. Al volver a automático busca el punto de la ruta más cercano en toda la vuelta.
  const setModo = (m) => {
    if (m === est.modo) return;
    est.modo = m;
    est.cmd = {f: 0, t: 0};
    est.entrada = {f: 0, t: 0, freno: false};
    if (m === 'auto') est.hint = ruta.cercano(est.x, est.z, est.hint, ruta.N).i;
  };

  // Ruedas deseadas en manual: rampa suave de la orden y PWM diferencial, como el Simulador 1
  const objetivoManual = (dt) => {
    const E = est.entrada;
    const a = 1 - Math.exp(-dt / MANUAL.suavizado);
    est.cmd.f += (E.f - est.cmd.f) * a;
    est.cmd.t += (E.t - est.cmd.t) * a;
    if (E.freno) est.cmd.f = est.cmd.t = 0;
    let izq = lim1(est.cmd.f * MANUAL.avance - est.cmd.t * MANUAL.giro);
    let der = lim1(est.cmd.f * MANUAL.avance + est.cmd.t * MANUAL.giro);
    // regla del firmware: con el frente a < 20 cm solo se permite retroceder
    est.bloqueado = est.frente < ZONAS.critica && (izq > 0 || der > 0);
    if (est.bloqueado) izq = der = 0;
    est.pwm = {izq, der};
    return {izq: izq * VMAX, der: der * VMAX};
  };

  const paso = (dt) => {
    est.t += dt;
    // a mano el robot puede salir de la cinta y volver por otro lado: se busca en toda la vuelta
    const c = ruta.cercano(est.x, est.z, est.hint, est.modo === 'manual' ? ruta.N >> 1 : 90);
    est.hint = c.i;
    if (c.s < est.sPrev - ruta.largo / 2) est.vuelta++; // cruzó la meta
    est.sPrev = c.s;
    // punto de mira, con un pequeño vaivén lateral para que los sensores no lean siempre igual
    const m = ruta.en(c.s + LOOK);
    const vaiven = 0.007 * Math.sin(est.t * 5.4) + 0.004 * Math.sin(est.t * 2.1);
    const tx = m.x - m.tz * vaiven;
    const tz = m.z + m.tx * vaiven;
    const dx = tx - est.x;
    const dz = tz - est.z;
    const lx = dx * Math.cos(est.th) - dz * Math.sin(est.th); // a la izquierda del robot
    const lz = dx * Math.sin(est.th) + dz * Math.cos(est.th); // al frente
    const kap = (2 * lx) / (lx * lx + lz * lz);
    // corrección PD sobre el error lateral de la regleta (como el seguidor de línea P04)
    const sx = est.x + Math.sin(est.th) * GEO.tcrtZ;
    const sz = est.z + Math.cos(est.th) * GEO.tcrtZ;
    const cs = ruta.cercano(sx, sz, c.i);
    const pj = ruta.en(cs.s);
    const eLat = (pj.x - sx) * Math.cos(est.th) - (pj.z - sz) * Math.sin(est.th); // + si la cinta queda a la izquierda
    const dE = (eLat - est.eLat) / Math.max(dt, 1e-4);
    est.eLat = eLat;
    const kRuta = Math.abs(ruta.curvatura(c.i));
    // reducción gradual de velocidad ante un obstáculo al frente (20–50 cm), como en el modo demo de la app;
    // en el firmware real solo avisa y, por debajo de 20 cm, detiene el avance
    const cerca = Math.max(0, Math.min(1, (ZONAS.precaucion - est.frente) / (ZONAS.precaucion - ZONAS.critica)));
    const v = (V_NOM - 0.08 * Math.min(1, kRuta / 3)) * (1 - 0.55 * cerca);
    const w = Math.max(-5, Math.min(5, v * kap + KP * eLat + KD * dE));
    let obj;
    if (est.modo === 'manual') obj = objetivoManual(dt);
    else {
      obj = ruedas(v, w);
      est.bloqueado = false;
      est.pwm = {izq: dutyPara(obj.izq) * Math.sign(obj.izq), der: dutyPara(obj.der) * Math.sign(obj.der)};
    }
    const a = 1 - Math.exp(-dt / TAU);
    est.vIzq += (obj.izq - est.vIzq) * a;
    est.vDer += (obj.der - est.vDer) * a;
    const cin = cinematica(est.vIzq, est.vDer);
    est.v = cin.v;
    est.w = cin.w;
    est.th += cin.w * dt;
    est.x = Math.max(-LIMITES.x, Math.min(LIMITES.x, est.x + Math.sin(est.th) * cin.v * dt));
    est.z = Math.max(-LIMITES.z, Math.min(LIMITES.z, est.z + Math.cos(est.th) * cin.v * dt));
    est.sens = lineaSensores(ruta, est.x, est.z, est.th, est.hint);
    est.frente = ultrasonido(est.x, est.z, est.th, 'frente', obstaculos);
    est.atras = ultrasonido(est.x, est.z, est.th, 'atras', obstaculos);
    return est;
  };

  // lo que se ve de los motores (para las fichas y la animación)
  const motores = () => {
    const dI = dutyPara(est.vIzq);
    const dD = dutyPara(est.vDer);
    const mI = motor(dI, est.vIzq >= 0 ? 1 : -1);
    const mD = motor(dD, est.vDer >= 0 ? 1 : -1);
    const rpmI = (est.vIzq / (Math.PI * R.ruedaD)) * 60;
    const rpmD = (est.vDer / (Math.PI * R.ruedaD)) * 60;
    return {
      dutyIzq: dI,
      dutyDer: dD,
      rpmIzq: rpmI,
      rpmDer: rpmD,
      encIzq: encoderHz(rpmI),
      encDer: encoderHz(rpmD),
      corriente: mI.corriente + mD.corriente,
    };
  };

  return {ruta, obstaculos, est, paso, motores, setModo, zonaFrente: () => zonaDe(est.frente), zonaAtras: () => zonaDe(est.atras)};
}

export {GEO};
