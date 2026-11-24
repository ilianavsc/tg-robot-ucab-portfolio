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
  const todo = ['fichas.js', 'main.js', 'plantilla.html'].map((f) => readFileSync(join(aqui, f), 'utf8')).join('\n');
  const prohibido = new RegExp(['\\bI', 'A\\b|inteligencia ', 'artificial'].join(''), 'i'); // sin escribir la sigla completa
  assert.ok(!prohibido.test(todo));
  assert.ok(/teach-and-repeat/.test(todo));
  assert.ok(/GPIO 15/.test(todo));
});

// ---- interfaz: el inspector de componentes es la vista principal y la consola es opcional
prueba('el inspector de componentes es lo principal: etiquetas 3D, tira de las 7 piezas y ficha abierta de entrada', () => {
  const html = readFileSync(join(aqui, 'plantilla.html'), 'utf8');
  const main = readFileSync(join(aqui, 'main.js'), 'utf8');
  assert.strictEqual(ORDEN.length, 7);
  for (const id of ORDEN) assert.ok(FICHAS[id] && FICHAS[id].nombre && FICHAS[id].rol, `ficha ${id}`);
  assert.ok(/id="tira"/.test(html) && /id="ficha"/.test(html) && /id="etiquetas"/.test(html));
  assert.ok(/id="pista-tocar"/.test(html), 'invita a tocar una pieza');
  // la barra empieza por las herramientas de inspección
  const barra = html.slice(html.indexOf('class="barra"'), html.indexOf('</div>\n  <p class="pista-tocar"'));
  assert.ok(barra.indexOf('b-xray') < barra.indexOf('data-modo="auto"'), 'Rayos X va antes del manejo');
  assert.ok(/ponEtiquetas\(true\)/.test(main), 'etiquetas encendidas en todos los tamaños');
  assert.ok(/abrirFicha\('tcrt'\)/.test(main), 'en pantallas anchas abre una ficha al cargar');
});

prueba('la consola de sensores empieza oculta y se abre o se cierra con su botón', () => {
  const html = readFileSync(join(aqui, 'plantilla.html'), 'utf8');
  const main = readFileSync(join(aqui, 'main.js'), 'utf8');
  assert.ok(/<section class="consola" id="consola"[^>]*\shidden>/.test(html), 'consola oculta por defecto');
  assert.ok(/id="b-consola"[^>]*aria-pressed="false"/.test(html), 'botón apagado al inicio');
  assert.ok(/Consola de sensores<\/button>/.test(html), 'el botón dice Consola de sensores');
  assert.ok(/bConsola\.addEventListener\('click', \(\) => ponConsola\(consola\.hidden\)\)/.test(main), 'alterna al pulsar');
  assert.ok(/ponConsola\(false\)/.test(main), 'arranca cerrada');
  assert.ok(/consola\.hidden = !on/.test(main) && /setAttribute\('aria-pressed', String\(on\)\)/.test(main));
  const css = readFileSync(join(aqui, 'style.css'), 'utf8');
  assert.ok(!/(^|\n)\.estado\{/.test(css), 'sin la regla .estado');
});

// ---- Fase 3: inicio apagado con Encender/Detener + tarjetas integradas vinculadas a la consola
prueba('inicio apagado (encendido=false) y transición ⚡ Encender / ⏹ Detener congela dinámica y tiempo', () => {
  const d = crearDemo();
  assert.strictEqual(d.est.encendido, false, 'P02 inicia apagado');
  assert.strictEqual(d.est.v, 0);
  assert.strictEqual(d.est.t, 0);
  const x0 = d.est.x;
  const z0 = d.est.z;
  for (let i = 0; i < 120; i++) d.paso(1 / 120);
  assert.strictEqual(d.est.x, x0, 'estático mientras encendido=false');
  assert.strictEqual(d.est.z, z0);
  assert.strictEqual(d.est.t, 0, 'tiempo congelado');
  assert.strictEqual(d.est.v, 0);

  // Encender activa movimiento
  d.encender();
  assert.strictEqual(d.est.encendido, true);
  for (let i = 0; i < 180; i++) d.paso(1 / 120);
  assert.ok(d.est.t > 1.4 && Math.abs(d.est.v) > 0.2, `debe moverse al encender (t=${d.est.t}, v=${d.est.v})`);

  // Detener congela dinámica y tiempo
  d.detener();
  assert.strictEqual(d.est.encendido, false);
  const tCong = d.est.t;
  const xCong = d.est.x;
  for (let i = 0; i < 120; i++) d.paso(1 / 120);
  assert.strictEqual(d.est.t, tCong);
  assert.strictEqual(d.est.x, xCong);

  const html = readFileSync(join(aqui, 'plantilla.html'), 'utf8');
  const main = readFileSync(join(aqui, 'main.js'), 'utf8');
  assert.ok(/id="b-pausa"[^>]*aria-pressed="false"/.test(html) && html.includes('⚡ Encender'));
  assert.ok(main.includes('⏹ Detener') && main.includes('cancelAnimationFrame(rafId)'));
});

prueba('las 7 tarjetas están integradas en el inspector y vinculadas visualmente a la consola de sensores', () => {
  const indexHtml = readFileSync(join(aqui, '../index.html'), 'utf8');
  assert.ok(!/id="piezas"/.test(indexHtml), 'elimina las tarjetas externas desconectadas del iframe');
  for (const id of ORDEN) {
    const f = FICHAS[id];
    assert.ok(f.resumen && f.consola && f.consola.bloque && f.consola.titulo, `vínculo consola faltante en ${id}`);
  }
  const html = readFileSync(join(aqui, 'plantilla.html'), 'utf8');
  const main = readFileSync(join(aqui, 'main.js'), 'utf8');
  assert.ok(/id="consola-vinculo"/.test(html) && /data-bloque="velo"/.test(html) && /data-bloque="linea"/.test(html) && /data-bloque="distancia"/.test(html));
  assert.ok(main.includes('sincronizaVinculoConsola') && main.includes('b-ver-consola'));
});

prueba('integración fichas ↔ consola: 7 fichas con datos en vivo en reposo, cierre, toggle de consola e inspección apagado', () => {
  const d = crearDemo({encendido: false});
  const m = d.motores();
  const vistaReposo = {
    sens: d.est.sens,
    dF: d.est.frente,
    dR: d.est.atras,
    zonaF: d.zonaFrente(),
    zonaR: d.zonaAtras(),
    mot: m,
    v: d.est.v,
    w: d.est.w,
    th: d.est.th,
  };
  const bloquesValidos = new Set(['linea', 'distancia', 'modo', 'velo']);
  for (const id of ORDEN) {
    const f = FICHAS[id];
    assert.ok(bloquesValidos.has(f.consola.bloque), `bloque inválido en ${id}`);
    const pares = f.vivo(vistaReposo);
    assert.ok(Array.isArray(pares) && pares.length >= 2, `datos en vivo válidos en reposo para ${id}`);
  }
  const main = readFileSync(join(aqui, 'main.js'), 'utf8');
  assert.ok(main.includes("$('#f-cerrar').addEventListener('click', () => abrirFicha(null))"), 'botón cerrar ficha');
  assert.ok(/if \(!id\)[\s\S]*?ficha\.hidden = true;[\s\S]*?sincronizaVinculoConsola\(\)/.test(main), 'cerrar ficha limpia vínculo');
  assert.ok(main.includes("bVinc.addEventListener('click', () => ponConsola(consola.hidden))"), 'toggle consola desde la ficha');
  assert.ok(/controls\.addEventListener\('change', \(\) => \{[\s\S]*?if \(!ui\.encendido\) solicitarCuadro\(\)/.test(main), 'órbita e inspección funcionan con robot apagado');
});

prueba('hardware.html se mantiene como catálogo BOM sin la consola 2x2', () => {
  const hwHtml = readFileSync(join(aqui, '../../../hardware.html'), 'utf8');
  assert.ok(!hwHtml.includes('id="inspector-hardware"'), 'hardware.html no debe contener #inspector-hardware');
  assert.ok(!hwHtml.includes('inspector_hw.css'), 'hardware.html no debe cargar inspector_hw.css');
  assert.ok(!hwHtml.includes('inspector_hw.js'), 'hardware.html no debe cargar inspector_hw.js');
  assert.ok(!hwHtml.includes('hw-card-hcsr04'), 'hardware.html no debe incluir tarjetas de la consola 2x2');
  assert.ok(hwHtml.includes('id="lista"') && hwHtml.includes('id="mat"') && hwHtml.includes('id="pines"'), 'hardware.html mantiene catálogo BOM y pines');
  assert.ok(hwHtml.includes('lista-materiales-v1.xlsx'), 'hardware.html mantiene enlace a lista de materiales');
});

// ---- Inspector unificado: estado central + robot 3D + consolas 2×2
const indexP02 = () => readFileSync(join(aqui, '../index.html'), 'utf8');
const cargarEstado = (conDom = null) => {
  const src = readFileSync(join(aqui, '../../../assets/inspector_hw.js'), 'utf8');
  const sandbox = {Math, Number, String, console};
  if (conDom) Object.assign(sandbox, conDom);
  sandbox.window = sandbox;
  vm.runInNewContext(src, sandbox);
  return sandbox;
};

prueba('P02 index: sin iframe ni fichas flotantes; layout robot 3D + 4 consolas con sus controles dentro', () => {
  const html = indexP02();
  assert.ok(!/<iframe/i.test(html), 'sin iframe');
  assert.ok(!/hw-ficha|hw-controles|hw-esquema|pistas-iconos/.test(html), 'sin fichas flotantes ni sección de controles aparte');
  assert.ok(html.includes('../../assets/css/inspector_hw.css') && html.includes('../../assets/inspector_hw.js'));
  assert.ok(/<script src="inspector3d\.js"/.test(html), 'carga el robot 3D empaquetado');
  assert.ok(html.indexOf('assets/inspector_hw.js') < html.indexOf('inspector3d.js'), 'el estado central carga antes que el 3D');
  for (const id of ['inspector-hardware', 'hw-inspector-root', 'hw-stage', 'hw-robot3d', 'hw-sim-badge', 'hw-seguridad-estado', 'hw-btn-reset']) {
    assert.ok(html.includes(`id="${id}"`), `falta #${id}`);
  }
  // cada control vive dentro de su consola
  const tarjeta = (c) => {
    const a = html.indexOf(`id="hw-card-${c}"`);
    return html.slice(a, html.indexOf('</article>', a));
  };
  assert.ok(/id="hw-in-dist"/.test(tarjeta('hcsr04')));
  assert.ok(/id="hw-in-linea"/.test(tarjeta('tcrt5000')));
  assert.ok(/id="hw-in-vel"/.test(tarjeta('motores')) && /data-dir="ADELANTE"/.test(tarjeta('motores')));
  assert.ok(/id="hw-in-pitch"/.test(tarjeta('mpu6050')) && /data-mpu-ev="impacto"/.test(tarjeta('mpu6050')));
  for (const c of ['hcsr04', 'tcrt5000', 'motores', 'mpu6050']) {
    for (const st of ['normal', 'advertencia', 'fallo']) assert.ok(tarjeta(c).includes(`data-st-card="${c}" data-st-val="${st}"`), `salud ${st} en ${c}`);
  }
  const css = readFileSync(join(aqui, '../../../assets/css/inspector_hw.css'), 'utf8');
  assert.ok(/grid-template-columns:\s*minmax\(0,\s*55fr\)\s*minmax\(0,\s*45fr\)/.test(css), 'columnas 55 / 45');
  assert.ok(/\.hw-consolas\s*\{[^}]*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(css), 'consolas 2×2');
  assert.ok(/@media \(max-width: 640px\)[\s\S]*\.hw-stage \{ height: 35vh/.test(css), 'móvil: robot ~35 % de alto');
});

prueba('límites técnicos exactos: 4 canales TCRT5000, 0,46 m/s y HC-SR04 de 5 a 80 cm; badge SIL', () => {
  const html = indexP02();
  assert.ok(/id="hw-in-dist" type="range" min="5" max="80"/.test(html));
  assert.ok(/id="hw-in-vel" type="range" min="0" max="0\.46"/.test(html));
  assert.strictEqual((html.match(/id="hw-tcrt-s\d"/g) || []).length, 4);
  assert.ok(!html.includes('hw-tcrt-s5'));
  assert.ok(html.includes('SIMULACIÓN LOCAL · SIL · DATOS SINTÉTICOS'));
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

prueba('SimulationState: un solo estado para distancia, línea, velocidad/PWM, IMU y seguridad', () => {
  const {SimulationState: S} = cargarEstado();
  let avisos = 0;
  S.subscribe(() => avisos++);
  const s = S.get();
  assert.strictEqual(s.seguridad.estado, 'NOMINAL');
  assert.strictEqual(s.tcrt5000.patron, '0110');
  assert.ok(s.motores.velEfectivaMs > 0 && s.motores.pwm > 0);
  // obstáculo < 20 cm: parada; solo deja retroceder
  S.set({hcsr04: {distanciaCm: 12}});
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  assert.strictEqual(s.motores.velEfectivaMs, 0);
  assert.ok(s.motores.bloqueado);
  S.set({motores: {direccion: 'ATRÁS'}});
  assert.ok(s.motores.velEfectivaMs < 0, 'retrocede');
  S.set({hcsr04: {distanciaCm: 35}, motores: {direccion: 'ADELANTE'}});
  assert.strictEqual(s.seguridad.estado, 'PRECAUCION');
  // desvío de línea cambia los 4 canales
  S.set({hcsr04: {distanciaCm: 70}, tcrt5000: {desvioMm: 27}});
  assert.strictEqual(s.tcrt5000.patron, '0001');
  S.set({tcrt5000: {desvioMm: -30}});
  assert.strictEqual(s.tcrt5000.patron, '1000');
  S.set({tcrt5000: {desvioMm: 0}});
  // impacto e inclinación
  S.eventoMpu('impacto');
  assert.strictEqual(s.mpu6050.alerta, 'impacto');
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  S.set({motores: {direccion: 'ATRÁS'}});
  assert.strictEqual(s.motores.velEfectivaMs, 0, 'con impacto no se mueve ni hacia atrás');
  S.eventoMpu('normal');
  S.set({motores: {direccion: 'ADELANTE'}, mpu6050: {pitchDeg: 25}});
  assert.strictEqual(s.mpu6050.alerta, 'inclinacion');
  assert.strictEqual(s.seguridad.estado, 'PRECAUCION');
  S.set({mpu6050: {pitchDeg: 40}});
  assert.strictEqual(s.seguridad.estado, 'PARADA');
  S.reset();
  assert.strictEqual(s.seguridad.estado, 'NOMINAL');
  assert.ok(avisos >= 10, 'notifica a los suscriptores (consolas y robot 3D)');
});

prueba('consolas y robot 3D leen y escriben en el mismo estado (DOM simulado, sin errores)', () => {
  const html = indexP02();
  const noop = () => {};
  const ctx = new Proxy({}, {get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true)});
  const mk = (id, attrs = {}) => {
    const clases = new Set();
    const oy = {};
    return {
      id, attrs, value: '0', textContent: '', className: '', style: {}, width: 260, height: 100,
      classList: {toggle: (c, f) => (f ? clases.add(c) : clases.delete(c)), contains: (c) => clases.has(c)},
      getAttribute: (k) => attrs[k] ?? null,
      setAttribute: (k, v) => { attrs[k] = String(v); },
      addEventListener: (ev, fn) => (oy[ev] ||= []).push(fn),
      disparar(ev, e = {}) { (oy[ev] || []).forEach((fn) => fn({target: this, ...e})); },
      getContext: () => ctx,
    };
  };
  const byId = {};
  for (const m of html.matchAll(/id="([^"]+)"/g)) byId[m[1]] = mk(m[1]);
  const conAttr = (re) => [...html.matchAll(re)].map((m) => {
    const attrs = {};
    for (const a of m[0].matchAll(/(data-[\w-]+)="([^"]*)"/g)) attrs[a[1]] = a[2];
    return mk('', attrs);
  });
  const dirs = conAttr(/<button[^>]*data-dir="[^"]+"[^>]*>/g);
  const evs = conAttr(/<button[^>]*data-mpu-ev="[^"]+"[^>]*>/g);
  const sts = conAttr(/<button[^>]*data-st-card="[^"]+"[^>]*>/g);
  const cards = ['hcsr04', 'tcrt5000', 'motores', 'mpu6050'].map((c) => {
    const el = byId[`hw-card-${c}`];
    el.attrs['data-card'] = c;
    return el;
  });
  const sel = {'[data-dir]': dirs, '[data-mpu-ev]': evs, '[data-st-card]': sts, '.hw-card': cards};
  let tick = null;
  const sb = cargarEstado({
    document: {readyState: 'complete', getElementById: (id) => byId[id] || null, querySelectorAll: (s) => sel[s] || [], addEventListener: noop},
    setInterval: (fn) => { tick = fn; return 1; },
    addEventListener: noop,
  });
  const S = sb.SimulationState;
  assert.ok(typeof tick === 'function');
  tick();
  assert.strictEqual(byId['hw-badge-hcsr04'].textContent, 'DESPEJADO');
  assert.strictEqual(byId['hw-seguridad-estado'].textContent, 'NOMINAL');
  // slider de distancia → estado → consola + seguridad
  byId['hw-in-dist'].value = '12';
  byId['hw-in-dist'].disparar('input');
  assert.strictEqual(S.get().hcsr04.distanciaCm, 12);
  assert.strictEqual(byId['hw-val-dist'].textContent, '12 cm');
  assert.strictEqual(byId['hw-seguridad-estado'].textContent, 'PARADA DE SEGURIDAD');
  assert.strictEqual(byId['hw-card-hcsr04'].attrs['data-estado'], 'fallo');
  assert.strictEqual(byId['hw-val-vel'].textContent, '0.00 m/s');
  // desvío de línea → LEDs
  byId['hw-in-linea'].value = '27';
  byId['hw-in-linea'].disparar('input');
  assert.strictEqual(byId['hw-tcrt-s4'].className, 'hw-tcrt-led on');
  assert.strictEqual(byId['hw-tcrt-s1'].className, 'hw-tcrt-led');
  assert.strictEqual(byId['hw-val-patron'].textContent, '0001');
  // botón de impacto
  evs.find((b) => b.getAttribute('data-mpu-ev') === 'impacto').disparar('click');
  assert.strictEqual(byId['hw-badge-mpu6050'].textContent, 'IMPACTO');
  // un cambio desde el robot 3D (clic en una pieza) se refleja en las consolas
  S.set({seleccion: 'tcrt5000'}, '3d');
  assert.ok(cards[1].classList.contains('resaltada') && !cards[0].classList.contains('resaltada'));
  byId['hw-btn-reset'].disparar('click');
  assert.strictEqual(byId['hw-seguridad-estado'].textContent, 'NOMINAL');
  assert.strictEqual(byId['hw-badge-hcsr04'].textContent, 'DESPEJADO');
  // el robot 3D usa solo SimulationState
  const src3d = readFileSync(join(aqui, 'inspector3d.js'), 'utf8');
  assert.ok(src3d.includes('window.SimulationState') && src3d.includes("S.set({seleccion"));
  assert.ok(/buildRobot/.test(src3d) && /pitchDeg/.test(src3d) && /distanciaCm/.test(src3d) && /canales/.test(src3d));
  const bundle = readFileSync(join(aqui, '../inspector3d.js'), 'utf8');
  assert.ok(bundle.includes('SimulationState') && bundle.includes('hw-robot3d'), 'bundle generado y vigente');
});

console.log(`\nP02 inspector: ${ok}/${ok} pruebas pasaron`);
