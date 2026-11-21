/* Pruebas del núcleo de la Inspector de hardware de P02 (ruta cerrada, sensores y modelo de tracción).
 * Uso:  node prototipos/P02-sensores/codigo/vitrina.test.js
 * No necesita navegador ni dependencias: solo prueba la parte sin three.js. */
import assert from 'node:assert';
import {readFileSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {LIMITES, MANUAL, crearDemo} from './demo.js';
import {R, VMAX, dutyPara, encoderHz} from './model.js';
import {CINTA, GEO, OBSTACULOS, crearRuta, lineaSensores, ultrasonido, zonaDe} from './ruta.js';

const aqui = dirname(fileURLToPath(import.meta.url));
let ok = 0;
const prueba = (nombre, f) => {
  f();
  ok++;
  console.log('  OK   ' + nombre);
};

// Corre la demo y junta lo que pasa en la vuelta
function correr(seg, alPaso) {
  const d = crearDemo();
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
  const d = crearDemo();
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
  const d = crearDemo();
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
  const d = crearDemo();
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
  const d = crearDemo();
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
  const todo = ['fichas.js', 'main.js', 'plantilla.html'].map((f) => readFileSync(join(aqui, f), 'utf8')).join('\n');
  const prohibido = new RegExp(['\\bI', 'A\\b|inteligencia ', 'artificial'].join(''), 'i'); // sin escribir la sigla completa
  assert.ok(!prohibido.test(todo));
  assert.ok(/teach-and-repeat/.test(todo));
  assert.ok(/GPIO 15/.test(todo));
});

console.log(`\nP02 inspector: ${ok}/${ok} pruebas pasaron`);
