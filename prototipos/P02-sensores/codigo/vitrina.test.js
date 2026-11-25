/* Pruebas del núcleo de la Inspector de hardware de P02 (ruta cerrada, sensores y modelo de tracción).
 * Uso:  node prototipos/P02-sensores/codigo/vitrina.test.js
 * No necesita navegador ni dependencias: solo prueba la parte sin three.js. */
import assert from 'node:assert';
import {readFileSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {LIMITES, MANUAL, crearDemo} from './demo.js';
import {R, VMAX, dutyPara, encoderHz} from './model.js';
import {CINTA, GEO, OBSTACULOS, crearRuta, lineaSensores, ultrasonido, zonaDe} from './ruta.js';
import {FICHAS, ORDEN} from './fichas.js';

const aqui = dirname(fileURLToPath(import.meta.url));
let ok = 0;
const prueba = (nombre, f) => {
  f();
  ok++;
  console.log('  OK   ' + nombre);
};

// Corre la demo y junta lo que pasa en la vuelta
function correr(seg, alPaso) {
  const d = crearDemo({encendido: true});
  for (let t = 0; t < seg; t += 1 / 120) {
    d.paso(1 / 120);
    alPaso && alPaso(d, t);
  }
  return d;
}

prueba('la ruta es un circuito cerrado de unos 6,6 m, sin curvas de menos de 20 cm de radio', () => {
  const r = crearRuta();
  assert.ok(Math.abs(r.largo - 6.66) < 0.4, `largo ${r.largo}`);
  const a = r.en(0);
  const b = r.en(r.largo - 1e-6);
  assert.ok(Math.hypot(a.x - b.x, a.z - b.z) < 0.01);
  let kmax = 0;
  for (let i = 0; i < r.N; i++) kmax = Math.max(kmax, Math.abs(r.curvatura(i)));
  assert.ok(1 / kmax > 0.2, `radio mínimo ${1 / kmax}`);
});

prueba('el robot da vueltas completas solo, sin perder nunca la cinta', () => {
  let maxErr = 0;
  let perdidas = 0;
  const d = correr(60, (dd) => {
    maxErr = Math.max(maxErr, dd.ruta.cercano(dd.est.x, dd.est.z, dd.est.hint).dist);
    if (dd.est.sens.join('') === '0000') perdidas++;
  });
  assert.ok(d.est.vuelta >= 3, `vueltas ${d.est.vuelta}`);
  assert.ok(maxErr < 0.02, `error lateral ${maxErr}`);
  assert.strictEqual(perdidas, 0);
});

prueba('la regleta de 4 TCRT5000 lee [0,1,1,0] centrada y cambia al desviarse', () => {
  const r = crearRuta();
  const p = r.en(1.0);
  const th = Math.atan2(p.tx, p.tz);
  const lee = (lat) => lineaSensores(r, p.x + Math.cos(th) * lat, p.z - Math.sin(th) * lat, th, Math.round((1.0 / r.largo) * r.N)).join('');
  // con el robot en un tramo recto, la posición de los sensores va 11 cm adelante: se prueba cerca del centro de la cinta
  const centrado = lee(0);
  assert.ok(['0110', '0100', '0010'].includes(centrado), centrado);
  assert.strictEqual(lee(0.2), '0000'); // lejos de la cinta
  assert.strictEqual(GEO.tcrtX.length, 4);
  assert.ok(Math.abs(GEO.tcrtX[0] - GEO.tcrtX[1] - 0.018) < 1e-9); // separación de 18 mm
  assert.strictEqual(CINTA, 0.019);
});

prueba('en la vuelta aparecen varias lecturas de la regleta, incluida la centrada [0,1,1,0]', () => {
  const vistos = new Set();
  correr(30, (d) => vistos.add(d.est.sens.join('')));
  assert.ok(vistos.has('0110'), [...vistos].join());
  assert.ok(vistos.size >= 3, [...vistos].join());
});

prueba('las zonas del HC-SR04P: < 20 cm crítica, 20–50 cm precaución, > 50 cm libre', () => {
  assert.strictEqual(zonaDe(0.19), 'critica');
  assert.strictEqual(zonaDe(0.2), 'precaucion');
  assert.strictEqual(zonaDe(0.49), 'precaucion');
  assert.strictEqual(zonaDe(0.5), 'libre');
  assert.strictEqual(zonaDe(Infinity), 'libre');
});

prueba('el ultrasonido mide la distancia a un bidón desde la cara del sensor', () => {
  const o = {x: 0, z: GEO.usF.z + 0.4 + 0.045, r: 0.045};
  const d = ultrasonido(0, 0, 0, 'frente', [o]);
  assert.ok(Math.abs(d - 0.4) < 0.005, `d ${d}`);
  assert.strictEqual(ultrasonido(0, 0, 0, 'atras', [o]), Infinity); // el de atrás mira al otro lado
  const o2 = {x: 0, z: GEO.usR.z - 0.3 - 0.045, r: 0.045};
  assert.ok(Math.abs(ultrasonido(0, 0, 0, 'atras', [o2]) - 0.3) < 0.005);
});

prueba('en el recorrido los dos HC-SR04P pasan por precaución y el frontal también por crítica', () => {
  const z = {f: new Set(), a: new Set()};
  correr(40, (d) => {
    z.f.add(d.zonaFrente());
    z.a.add(d.zonaAtras());
  });
  assert.ok(z.f.has('precaucion') && z.f.has('critica') && z.f.has('libre'), [...z.f].join());
  assert.ok(z.a.has('precaucion') && z.a.has('libre'), [...z.a].join());
  assert.strictEqual(OBSTACULOS.length, 3);
});

prueba('modelo único: Speed 200 con L298N a 11,1 V da ≈ 0,57 m/s al 100 % y 656 Hz de encoder', () => {
  assert.ok(Math.abs(VMAX - 0.57) < 0.01, `VMAX ${VMAX}`);
  assert.ok(Math.abs(encoderHz(168) - 656) < 2);
  assert.strictEqual(R.ratio, 21.3);
  assert.ok(dutyPara(0.4) > 0.6 && dutyPara(0.4) < 0.8);
});

prueba('la demo no copia la máquina de estados de teach-and-repeat', () => {
  const archivos = readdirSync(aqui).filter((f) => f.endsWith('.js') && !f.endsWith('.test.js'));
  for (const f of archivos) {
    const t = readFileSync(join(aqui, f), 'utf8');
    assert.ok(!/FOLLOW_LINE|LINE_LOST_CHECK|HEADING_HOLD|WAIT_BEACON|REACQUIRE_LINE/.test(t), `${f} duplica estados`);
  }
});

// ---- manejo manual con la modalidad del Simulador 1 (P04)
const manejar = (d, f, t, seg, freno = false) => {
  d.est.entrada = {f, t, freno};
  for (let k = 0; k < seg * 120; k++) d.paso(1 / 120);
};

prueba('manual: usa los mismos valores del Simulador 1 y avanza recto a ≈ 0,46 m/s', () => {
  const sim1 = readFileSync(join(aqui, '../../P04-simulador-1-esp32/codigo/sim.js'), 'utf8');
  const m = /MANUAL = \{avance: ([\d.]+), giro: ([\d.]+), suavizado: ([\d.]+)\}/.exec(sim1);
  assert.ok(m, 'el Simulador 1 define MANUAL');
  assert.deepStrictEqual([MANUAL.avance, MANUAL.giro, MANUAL.suavizado], [+m[1], +m[2], +m[3]]);
  const d = crearDemo({encendido: true});
  d.est.x = 0;
  d.est.z = -2.4; // lejos de la cinta y de los bidones
  d.est.th = 0;
  d.setModo('manual');
  const th0 = d.est.th;
  manejar(d, 1, 0, 2);
  assert.ok(Math.abs(d.est.v - MANUAL.avance * VMAX) < 0.01, `v ${d.est.v}`);
  assert.ok(Math.abs(d.est.th - th0) < 1e-6, 'sin giro');
  assert.deepStrictEqual(d.est.sens, [0, 0, 0, 0], 'fuera de la cinta no lee línea');
});

prueba('manual: gira a la izquierda, retrocede y Espacio frena; no sale del piso', () => {
  const d = crearDemo({encendido: true});
  d.est.x = 0;
  d.est.z = -2.4;
  d.est.th = 0;
  d.setModo('manual');
  manejar(d, 0, 1, 1);
  assert.ok(d.est.th > 0.5, `th ${d.est.th}`);
  manejar(d, -1, 0, 1);
  assert.ok(d.est.v < -0.3, `v ${d.est.v}`);
  manejar(d, 1, 0, 0.5, true);
  assert.ok(Math.abs(d.est.v) < 0.02, 'frena');
  manejar(d, 1, 0, 30);
  assert.ok(Math.abs(d.est.x) <= LIMITES.x + 1e-9 && Math.abs(d.est.z) <= LIMITES.z + 1e-9);
});

prueba('manual: con un obstáculo a < 20 cm no deja avanzar ni girar, solo retroceder (como el firmware)', () => {
  const d = crearDemo({encendido: true});
  const o = OBSTACULOS[0];
  d.est.x = o.x;
  d.est.z = o.z - 0.42;
  d.est.th = 0; // mira al bidón
  d.setModo('manual');
  manejar(d, 1, 0, 3);
  assert.ok(d.est.frente < 0.2 && d.est.frente > 0.1, `frente ${d.est.frente}`);
  assert.ok(d.est.bloqueado);
  assert.ok(Math.abs(d.est.v) < 0.01);
  manejar(d, 0, 1, 1);
  assert.ok(d.est.bloqueado && Math.abs(d.est.w) < 0.01, 'tampoco gira');
  manejar(d, -1, 0, 1);
  assert.ok(!d.est.bloqueado && d.est.v < -0.3, 'retrocede');
});

prueba('manual en la cinta: los 4 sensores de línea se encienden en vivo y al volver a automático sigue la ruta', () => {
  const d = crearDemo({encendido: true});
  for (let k = 0; k < 240; k++) d.paso(1 / 120);
  d.setModo('manual');
  manejar(d, 0, 0, 0.5);
  assert.ok(d.est.sens.some((v) => v === 1), 'sobre la cinta');
  manejar(d, 0, 1, 1.2); // gira fuera de la cinta
  manejar(d, 1, 0, 1.5);
  d.setModo('auto');
  let enCinta = 0;
  for (let k = 0; k < 20 * 120; k++) {
    d.paso(1 / 120);
    if (k > 12 * 120 && d.est.sens.some((v) => v === 1)) enCinta++;
  }
  assert.ok(enCinta > 6 * 120, `vuelve a la cinta (${enCinta})`);
});

prueba('el texto de la vitrina usa teach-and-repeat y no usa términos de otras tecnologías', () => {
  const todo = ['fichas.js', 'main.js', 'plantilla.html', 'app.html'].map((f) => readFileSync(join(aqui, f), 'utf8')).join('\n');
  const prohibido = new RegExp(['\\bI', 'A\\b|inteligencia ', 'artificial'].join(''), 'i'); // sin escribir la sigla completa
  assert.ok(!prohibido.test(todo));
  assert.ok(/teach-and-repeat/.test(todo));
  assert.ok(/GPIO 15/.test(todo));
});

// ---- interfaz: simulador 3D del circuito + panel oscuro integrado (consolas + ficha técnica)
const leerAqui = (f) => readFileSync(join(aqui, f), 'utf8');
const indexP02 = () => readFileSync(join(aqui, '../index.html'), 'utf8');

prueba('se restaura el simulador 3D del circuito: barra superior, D-Pad, tira de 7 piezas y etiquetas', () => {
  const app = leerAqui('app.html');
  const main = leerAqui('main.js');
  assert.strictEqual(ORDEN.length, 7);
  for (const id of ORDEN) assert.ok(FICHAS[id] && FICHAS[id].nombre && FICHAS[id].rol, `ficha ${id}`);
  for (const id of ['lienzo', 'guias', 'etiquetas', 'tira', 'dpad', 'pista-tocar', 'b-xray', 'b-etiq', 'b-vista', 'b-pausa']) assert.ok(app.includes(`id="${id}"`), `falta #${id}`);
  assert.ok(/data-modo="auto"/.test(app) && /data-modo="manual"/.test(app), 'Auto y Manual');
  for (const dp of ['arriba', 'izq', 'stop', 'der', 'abajo']) assert.ok(app.includes(`data-dp="${dp}"`), `D-Pad ${dp}`);
  const barra = app.slice(app.indexOf('class="barra"'), app.indexOf('<p class="pista-tocar"'));
  assert.ok(barra.indexOf('b-xray') < barra.indexOf('data-modo="auto"'), 'Rayos X va antes del manejo');
  assert.ok(/ponEtiquetas\(true\)/.test(main), 'etiquetas encendidas en todos los tamaños');
  assert.ok(/crearMundo\(canvas, demo\.ruta, demo\.obstaculos\)/.test(main), 'escena del circuito ovalado con obstáculos');
  for (const n of ['TCRT5000 ×4', 'HC-SR04P frontal', 'HC-SR04P trasero', 'ESP32 móvil', 'MPU-6050', 'Tracción + chasis PLA', 'Batería 3S']) {
    assert.ok(ORDEN.some((id) => FICHAS[id].corto === n), `chip ${n}`);
  }
});

prueba('sin redundancias: no hay botón "Consola de sensores", ni fichas blancas flotantes, ni iframe', () => {
  const app = leerAqui('app.html');
  const main = leerAqui('main.js');
  const css = leerAqui('style.css');
  const html = indexP02();
  for (const t of [app, html]) {
    assert.ok(!/id="b-consola"|Consola de sensores<\/button>/.test(t), 'sin botón Consola de sensores');
    assert.ok(!/id="ficha"|id="f-cerrar"|id="consola"|b-ver-consola|Ver en consola de sensores/.test(t), 'sin ficha flotante ni consola vieja');
    assert.ok(!/<iframe/i.test(t), 'sin iframe');
  }
  assert.ok(!/ponConsola|b-ver-consola|refrescaConsola|f-cerrar/.test(main), 'main.js sin la consola opcional ni la ficha flotante');
  assert.ok(!/\.ficha\{|\.consola\{/.test(css), 'sin estilos de ficha flotante ni consola vieja');
  assert.ok(!/(^|\n)html,body\{/.test(css) && !/position:fixed/.test(css), 'los estilos del 3D no tocan la página del portafolio');
});

prueba('index.html y simulador.html usan la misma interfaz (app.html) y cargan estado central + 3D empaquetado', () => {
  const app = leerAqui('app.html').trimEnd();
  const html = indexP02();
  const ini = html.indexOf('<!--APP:inicio-->') + '<!--APP:inicio-->'.length;
  assert.strictEqual(html.slice(ini, html.indexOf('<!--APP:fin-->')).trim(), app.trim(), 'index.html al día con app.html (correr construir.mjs)');
  assert.ok(html.includes('../../assets/css/inspector_hw.css') && html.includes('inspector3d.css'));
  assert.ok(html.indexOf('../../assets/inspector_hw.js') < html.indexOf('src="inspector3d.js"'), 'el estado central carga antes que el 3D');
  const sim = readFileSync(join(aqui, '../simulador.html'), 'utf8');
  assert.ok(sim.includes('id="hw-panel"') && sim.includes('SimulationState') && sim.includes('id="lienzo"'), 'simulador.html autocontenido con panel y 3D');
  const bundle = readFileSync(join(aqui, '../inspector3d.js'), 'utf8');
  assert.ok(bundle.includes('publicarCircuito') && bundle.includes('hw-ficha'), 'bundle generado y vigente');
  assert.ok(html.includes('SIMULACIÓN LOCAL · SIL · DATOS SINTÉTICOS'));
});

prueba('panel oscuro integrado: 4 consolas con sus controles dentro y la ficha técnica en el mismo panel', () => {
  const app = leerAqui('app.html');
  const panel = app.slice(app.indexOf('id="hw-panel"'));
  for (const id of ['hw-card-hcsr04', 'hw-card-tcrt5000', 'hw-card-motores', 'hw-card-mpu6050', 'hw-ficha', 'hw-foco-cerrar']) assert.ok(panel.includes(`id="${id}"`), `#${id} en el panel`);
  const tarjeta = (c) => {
    const a = app.indexOf(`id="hw-card-${c}"`);
    return app.slice(a, app.indexOf('</article>', a));
  };
  assert.ok(/id="hw-in-dist" type="range" min="5" max="80"/.test(tarjeta('hcsr04')));
  assert.ok(/id="hw-in-linea"/.test(tarjeta('tcrt5000')));
  assert.strictEqual((tarjeta('tcrt5000').match(/id="hw-tcrt-s\d"/g) || []).length, 4);
  assert.ok(/id="hw-in-vel" type="range" min="0" max="0\.46"/.test(tarjeta('motores')) && /data-dir="ADELANTE"/.test(tarjeta('motores')));
  assert.ok(/id="hw-in-pitch"/.test(tarjeta('mpu6050')) && /data-mpu-ev="impacto"/.test(tarjeta('mpu6050')) && /data-mpu-ev="inclinacion"/.test(tarjeta('mpu6050')));
  for (const c of ['hcsr04', 'tcrt5000', 'motores', 'mpu6050']) {
    for (const st of ['normal', 'advertencia', 'fallo']) assert.ok(tarjeta(c).includes(`data-st-card="${c}" data-st-val="${st}"`), `salud ${st} en ${c}`);
    assert.ok(tarjeta(c).includes(`data-vivo="${c}"`), `botón Vivo en ${c}`);
  }
  const css = readFileSync(join(aqui, '../../../assets/css/inspector_hw.css'), 'utf8');
  assert.ok(/\.hw-consolas \{[^}]*repeat\(2, minmax\(0, 1fr\)\)/.test(css), 'consolas 2×2');
  assert.ok(/\.hw-panel \{[^}]*background: var\(--tg-dark-bg\)/.test(css), 'panel oscuro con el token oficial --tg-dark-bg');
  assert.ok(readFileSync(join(aqui, '../../../assets/css/tokens.css'), 'utf8').includes('--tg-dark-bg: #10141A'), 'paleta oscura en tokens.css');
  assert.ok(/@media \(max-width: 900px\)[\s\S]*\.hw-panel \{ grid-row: 3/.test(css), 'móvil: consolas debajo del 3D');
  // la ficha usa los datos técnicos del proyecto
  const main = leerAqui('main.js');
  assert.ok(main.includes("$('#hw-ficha')") && main.includes('Datos técnicos del proyecto') && main.includes('f.datos.map'));
  assert.ok(/GPIO 36 \(VP\) · 39 \(VN\) · 34 · 35/.test(FICHAS.tcrt.datos.map((d) => d[1]).join(' ')) && FICHAS.tcrt.datos.some(([k, v]) => k === 'Separación' && v.includes('18 mm')));
  for (const id of ORDEN) assert.ok('id' in FICHAS[id].consola, `vínculo pieza → consola en ${id}`);
});

prueba('inicio apagado (encendido=false) y transición ⚡ Encender / ⏹ Detener congela dinámica y tiempo', () => {
  const d = crearDemo();
  assert.strictEqual(d.est.encendido, false, 'P02 inicia apagado');
  assert.strictEqual(d.est.v, 0);
  assert.strictEqual(d.est.t, 0);
  const x0 = d.est.x;
  for (let i = 0; i < 120; i++) d.paso(1 / 120);
  assert.strictEqual(d.est.x, x0, 'estático mientras encendido=false');
  assert.strictEqual(d.est.t, 0, 'tiempo congelado');
  d.encender();
  for (let i = 0; i < 180; i++) d.paso(1 / 120);
  assert.ok(d.est.t > 1.4 && Math.abs(d.est.v) > 0.2, `debe moverse al encender (t=${d.est.t}, v=${d.est.v})`);
  d.detener();
  const tCong = d.est.t;
  const xCong = d.est.x;
  for (let i = 0; i < 120; i++) d.paso(1 / 120);
  assert.strictEqual(d.est.t, tCong);
  assert.strictEqual(d.est.x, xCong);
  const app = leerAqui('app.html');
  const main = leerAqui('main.js');
  assert.ok(/id="b-pausa"[^>]*aria-pressed="false"/.test(app) && app.includes('⚡ Encender'));
  assert.ok(main.includes('⏹ Detener') && main.includes('cancelAnimationFrame(rafId)'));
});

prueba('consolas → circuito: obstáculo, desvío, consigna, paro y atasco inyectados mueven la física', () => {
  const avanzar = (d, seg) => { for (let k = 0; k < seg * 120; k++) d.paso(1 / 120); };
  // obstáculo inyectado a 12 cm + paro: el robot se detiene en el circuito
  const d = crearDemo({encendido: true});
  avanzar(d, 1);
  d.est.iny.frente = 0.12;
  d.est.iny.paro = 'Obstáculo a 12 cm';
  d.est.iny.paroAtras = true;
  avanzar(d, 1);
  const x = d.est.x;
  avanzar(d, 1);
  assert.ok(Math.abs(d.est.x - x) < 1e-6 && Math.abs(d.est.v) < 0.01, 'detenido por el obstáculo inyectado');
  assert.ok(Math.abs(d.est.frente - 0.12) < 1e-9, 'el HC-SR04 lee la distancia inyectada');
  // a mano y con paro por obstáculo deja retroceder
  d.setModo('manual');
  d.est.entrada = {f: -1, t: 0, freno: false};
  avanzar(d, 1);
  assert.ok(d.est.v < -0.2, 'retrocede');
  // con impacto (paroAtras = false) no se mueve ni hacia atrás
  d.est.iny.paroAtras = false;
  avanzar(d, 1);
  assert.ok(Math.abs(d.est.v) < 0.01, 'impacto: quieto');
  d.est.iny.paro = null;
  d.est.iny.frente = null;
  // consigna de velocidad en Auto
  const e = crearDemo({encendido: true});
  e.est.iny.vConsigna = 0.2;
  let vmax = 0;
  for (let k = 0; k < 4 * 120; k++) { e.paso(1 / 120); vmax = Math.max(vmax, e.est.v); }
  assert.ok(vmax < 0.21 && vmax > 0.12, `consigna 0,2 m/s (vmax ${vmax})`);
  // desvío inyectado: en Auto el robot sigue la cinta corrido y la regleta lo lee
  const f = crearDemo({encendido: true});
  f.est.iny.desvio = 0.024; // cinta 24 mm a la derecha
  const vistos = new Set();
  for (let k = 0; k < 8 * 120; k++) { f.paso(1 / 120); if (k > 4 * 120) vistos.add(f.est.sens.join('')); }
  assert.ok([...vistos].some((p) => p[3] === '1') && !vistos.has('0110'), `la línea queda bajo S4: ${[...vistos]}`);
  assert.ok(Math.abs(-f.est.eLat * 1000 - 24) < 8, `error lateral ≈ 24 mm (${-f.est.eLat * 1000})`);
  // fallo TCRT → 0000; atasco → ruedas giran sin avance
  f.est.iny.sinLinea = true;
  f.medir();
  assert.strictEqual(f.est.sens.join(''), '0000');
  f.est.iny.sinLinea = false;
  f.est.iny.atasco = true;
  const x2 = f.est.x;
  avanzar(f, 1);
  assert.ok(f.est.x === x2 && Math.abs(f.est.vIzq) > 0.1, 'atasco: ruedas giran, chasis quieto');
  // apagado: correr de lado actualiza la lectura al instante
  const g = crearDemo();
  g.desplazarLateral(-0.03); // robot 3 cm a la derecha: la cinta queda a la izquierda
  assert.ok(g.est.sens[0] === 1 || g.est.sens.join('') === '0000', `lectura tras desplazar: ${g.est.sens.join('')}`);
});

const cargarEstado = (conDom = null) => {
  const src = readFileSync(join(aqui, '../../../assets/inspector_hw.js'), 'utf8');
  const sandbox = {Math, Number, String, console};
  if (conDom) Object.assign(sandbox, conDom);
  sandbox.window = sandbox;
  vm.runInNewContext(src, sandbox);
  return sandbox;
};

prueba('límites técnicos exactos: 4 canales TCRT5000, 0,46 m/s y HC-SR04 de 5 a 80 cm', () => {
  const {SimulationState: S} = cargarEstado();
  assert.strictEqual(S.LIMITES.canalesTcrt, 4);
  assert.strictEqual(S.LIMITES.vMax, 0.46);
  assert.strictEqual(S.LIMITES.distMinCm, 5);
  assert.strictEqual(S.LIMITES.distMaxCm, 80);
  S.set({hcsr04: {distanciaCm: 200}, motores: {velocidadMs: 1}});
  assert.strictEqual(S.get().hcsr04.distanciaCm, 80);
  assert.strictEqual(S.get().motores.velocidadMs, 0.46);
  S.set({hcsr04: {distanciaCm: 1}});
  assert.strictEqual(S.get().hcsr04.distanciaCm, 5);
  assert.strictEqual(S.get().tcrt5000.canales.length, 4);
  assert.ok(Math.abs(MANUAL.avance * VMAX - 0.46) < 0.005, 'coincide con el manejo del Simulador 1');
});

prueba('SimulationState local: distancia, línea, velocidad/PWM, IMU y seguridad en un solo estado', () => {
  const {SimulationState: S} = cargarEstado();
  let avisos = 0;
  S.subscribe(() => avisos++);
  const s = S.get();
  assert.strictEqual(s.seguridad.estado, 'NOMINAL');
  assert.strictEqual(s.tcrt5000.patron, '0110');
  S.set({hcsr04: {distanciaCm: 12}});
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  assert.ok(s.seguridad.paroForzado && s.seguridad.permiteAtras);
  assert.strictEqual(s.motores.velEfectivaMs, 0);
  S.set({motores: {direccion: 'ATRÁS'}});
  assert.ok(s.motores.velEfectivaMs < 0, 'retrocede');
  S.set({hcsr04: {distanciaCm: 70}, tcrt5000: {desvioMm: 27}, motores: {direccion: 'ADELANTE'}});
  assert.strictEqual(s.tcrt5000.patron, '0001');
  S.set({tcrt5000: {desvioMm: 0}});
  S.eventoMpu('impacto');
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  assert.ok(s.seguridad.paroForzado && !s.seguridad.permiteAtras, 'impacto: parada total');
  S.eventoMpu('normal');
  S.set({mpu6050: {pitchDeg: 25}});
  assert.strictEqual(s.seguridad.estado, 'PRECAUCION');
  S.set({mpu6050: {pitchDeg: 40}});
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  S.reset();
  assert.strictEqual(s.seguridad.estado, 'NOMINAL');
  assert.ok(avisos >= 8);
});

prueba('circuito → consolas: lecturas en vivo, inyección por consola, liberar y órdenes de dirección', () => {
  const {SimulationState: S} = cargarEstado();
  const vivo = {encendido: true, modo: 'auto', distanciaCm: 140, atrasCm: Infinity, canales: [0, 1, 0, 0], desvioMm: -6, velEfectivaMs: 0.38, pwmIzq: 66, pwmDer: 70, direccion: 'ADELANTE', bloqueado: false, pitchDeg: 0.4, rollDeg: -1.2, acelG: 1.01};
  const s = S.publicarCircuito(vivo);
  assert.strictEqual(s.fuente, 'circuito');
  assert.strictEqual(s.hcsr04.distanciaCm, 140, 'en vivo no se recorta a 80');
  assert.strictEqual(s.hcsr04.atrasCm, 400, 'sin eco atrás');
  assert.strictEqual(s.tcrt5000.patron, '0100', 'canales reales del circuito');
  assert.strictEqual(s.motores.velEfectivaMs, 0.38);
  assert.strictEqual(s.seguridad.estado, 'NOMINAL');
  // la consola inyecta 12 cm: el circuito ya no la pisa y se fuerza la parada
  S.set({hcsr04: {distanciaCm: 12}, inyeccion: {hcsr04: true}}, 'consola');
  S.publicarCircuito(vivo);
  assert.strictEqual(s.hcsr04.distanciaCm, 12);
  assert.ok(s.seguridad.paroForzado && s.seguridad.permiteAtras);
  S.liberar('hcsr04');
  S.publicarCircuito(vivo);
  assert.strictEqual(s.hcsr04.distanciaCm, 140, 'vuelve a la lectura en vivo');
  // obstáculo real < 20 cm en Auto: precaución (la demo reduce la velocidad); bloqueado a mano: parada sin forzar
  S.publicarCircuito({...vivo, distanciaCm: 15});
  assert.strictEqual(s.seguridad.estado, 'PRECAUCION');
  S.publicarCircuito({...vivo, distanciaCm: 15, bloqueado: true, modo: 'manual'});
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  assert.ok(!s.seguridad.paroForzado);
  // órdenes de dirección van al circuito
  const ordenes = [];
  S.alComando((t, v) => ordenes.push([t, v]));
  S.comando('direccion', 'IZQUIERDA');
  assert.deepStrictEqual(ordenes, [['direccion', 'IZQUIERDA']]);
  // foco desde la tira/3D → consola
  S.set({foco: 'us_rear', seleccion: S.CONSOLA_DE.us_rear});
  assert.strictEqual(s.seleccion, 'hcsr04');
});

prueba('consolas (DOM simulado): controles escriben en el estado, foco sube la consola y muestra la ficha, sin errores', () => {
  const app = leerAqui('app.html');
  const noop = () => {};
  const ctx = new Proxy({}, {get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true)});
  const mk = (id, attrs = {}) => {
    const clases = new Set();
    const oy = {};
    return {
      id, attrs, value: '0', textContent: '', className: '', style: {}, width: 260, height: 100, hidden: false,
      classList: {toggle: (c, f) => (f ? clases.add(c) : clases.delete(c)), contains: (c) => clases.has(c)},
      getAttribute: (k) => attrs[k] ?? null,
      setAttribute: (k, v) => { attrs[k] = String(v); },
      addEventListener: (ev, fn) => (oy[ev] ||= []).push(fn),
      disparar(ev, e = {}) { (oy[ev] || []).forEach((fn) => fn({target: this, ...e})); },
      getContext: () => ctx,
    };
  };
  const byId = {};
  for (const m of app.matchAll(/id="([^"]+)"/g)) byId[m[1]] = mk(m[1]);
  const conAttr = (re) => [...app.matchAll(re)].map((m) => {
    const attrs = {};
    for (const a of m[0].matchAll(/(data-[\w-]+)="([^"]*)"/g)) attrs[a[1]] = a[2];
    return mk('', attrs);
  });
  const sel = {
    '[data-dir]': conAttr(/<button[^>]*data-dir="[^"]+"[^>]*>/g),
    '[data-mpu-ev]': conAttr(/<button[^>]*data-mpu-ev="[^"]+"[^>]*>/g),
    '[data-st-card]': conAttr(/<button[^>]*data-st-card="[^"]+"[^>]*>/g),
    '[data-vivo]': conAttr(/<button[^>]*data-vivo="[^"]+"[^>]*>/g),
    '[data-foco]': conAttr(/<button[^>]*data-foco="[^"]+"[^>]*>/g),
    '.hw-card': ['hcsr04', 'tcrt5000', 'motores', 'mpu6050'].map((c) => {
      const el = byId[`hw-card-${c}`];
      el.attrs['data-card'] = c;
      return el;
    }),
  };
  let tick = null;
  const sb = cargarEstado({
    document: {readyState: 'complete', getElementById: (id) => byId[id] || null, querySelectorAll: (s) => sel[s] || [], addEventListener: noop},
    setInterval: (fn) => { tick = fn; return 1; },
    setTimeout: noop,
    addEventListener: noop,
  });
  const S = sb.SimulationState;
  tick();
  assert.strictEqual(byId['hw-seguridad-estado'].textContent, 'NOMINAL');
  assert.strictEqual(byId['hw-fuente'].textContent, 'CONSOLAS · LOCAL');
  byId['hw-in-dist'].value = '12';
  byId['hw-in-dist'].disparar('input');
  assert.ok(S.get().inyeccion.hcsr04 && S.get().hcsr04.distanciaCm === 12);
  assert.strictEqual(byId['hw-seguridad-estado'].textContent, 'PARADA DE SEGURIDAD');
  assert.strictEqual(sel['[data-vivo]'][0].textContent, '◆ Iny.');
  byId['hw-in-linea'].value = '27';
  byId['hw-in-linea'].disparar('input');
  assert.strictEqual(byId['hw-tcrt-s4'].className, 'hw-tcrt-led on');
  sel['[data-mpu-ev]'].find((b) => b.getAttribute('data-mpu-ev') === 'impacto').disparar('click');
  assert.strictEqual(byId['hw-badge-mpu6050'].textContent, 'IMPACTO');
  // foco desde el título de la consola: sube la consola (order -2) y muestra la ficha debajo (order -1)
  sel['[data-foco]'].find((b) => b.getAttribute('data-foco') === 'tcrt').disparar('click');
  assert.strictEqual(S.get().foco, 'tcrt');
  const tc = sel['.hw-card'][1];
  assert.ok(tc.classList.contains('enfocada') && tc.style.order === '-2');
  assert.strictEqual(byId['hw-ficha'].hidden, false);
  assert.strictEqual(byId['hw-ficha'].style.order, '-1');
  assert.ok(/Enfocado · TCRT5000/.test(byId['hw-panel-titulo'].textContent));
  // tocar otra consola no le quita el lugar a la enfocada
  sel['[data-st-card]'].find((b) => b.getAttribute('data-st-card') === 'motores' && b.getAttribute('data-st-val') === 'advertencia').disparar('click');
  assert.ok(tc.classList.contains('enfocada'));
  byId['hw-foco-cerrar'].disparar('click');
  assert.strictEqual(byId['hw-ficha'].hidden, true);
  sel['[data-vivo]'][0].disparar('click');
  assert.strictEqual(S.get().inyeccion.hcsr04, false);
  byId['hw-btn-reset'].disparar('click');
  assert.strictEqual(byId['hw-seguridad-estado'].textContent, 'NOMINAL');
  // main.js conecta el circuito con el estado en ambos sentidos
  const main = leerAqui('main.js');
  assert.ok(main.includes('S.publicarCircuito(') && main.includes('S.alComando(ejecutarOrden)') && main.includes('aplicarInyecciones'));
  assert.ok(/canales: est\.sens/.test(main) && /distanciaCm: est\.frente \* 100/.test(main), 'publica TCRT y HC-SR04 reales del circuito');
});

prueba('hardware.html se mantiene como catálogo BOM sin la consola 2x2', () => {
  const hwHtml = readFileSync(join(aqui, '../../../hardware.html'), 'utf8');
  assert.ok(!hwHtml.includes('id="inspector-hardware"'), 'hardware.html no debe contener #inspector-hardware');
  assert.ok(!hwHtml.includes('inspector_hw.css'), 'hardware.html no debe cargar inspector_hw.css');
  assert.ok(!hwHtml.includes('inspector_hw.js'), 'hardware.html no debe cargar inspector_hw.js');
  assert.ok(!hwHtml.includes('hw-card-hcsr04'), 'hardware.html no debe incluir tarjetas de la consola 2x2');
  assert.ok(hwHtml.includes('id="lista"') && hwHtml.includes('id="mat"') && hwHtml.includes('id="pines"'), 'hardware.html mantiene catálogo BOM y pines');
});

console.log(`\nP02 inspector: ${ok}/${ok} pruebas pasaron`);
