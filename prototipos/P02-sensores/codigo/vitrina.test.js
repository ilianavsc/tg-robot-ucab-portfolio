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

prueba('P02 Inspector integra la consola 2x2 con 4 cuadrantes, etiqueta local y ejecución sin errores', () => {
  const indexHtml = readFileSync(join(aqui, '../index.html'), 'utf8');
  assert.ok(indexHtml.includes('../../assets/css/inspector_hw.css'), 'P02 index carga inspector_hw.css');
  assert.ok(indexHtml.includes('../../assets/inspector_hw.js'), 'P02 index carga inspector_hw.js');
  assert.ok(indexHtml.includes('id="inspector-hardware"') && indexHtml.includes('id="hw-inspector-root"'), 'contenedor de consola 2x2');
  for (const id of [
    'hw-card-hcsr04',
    'hw-card-tcrt5000',
    'hw-card-motores',
    'hw-card-mpu6050',
    'hw-canvas-radar',
    'hw-canvas-osc',
    'hw-canvas-vel',
    'hw-canvas-imu',
    'hw-sim-badge',
  ]) {
    assert.ok(indexHtml.includes(`id="${id}"`), `falta #${id} en P02/index.html`);
  }
  assert.ok(/Simulación local de hardware/i.test(indexHtml), 'etiqueta explícita de simulación local');
  for (const st of ['normal', 'advertencia', 'fallo']) {
    assert.ok(indexHtml.includes(`data-st-val="${st}"`), `botón de estado ${st}`);
  }

  // Ejecución real de assets/inspector_hw.js con DOM + Canvas mínimo para validar 0 errores de runtime
  const jsSrc = readFileSync(join(aqui, '../../../assets/inspector_hw.js'), 'utf8');
  const noop = () => {};
  const fakeCtx = {
    clearRect: noop, beginPath: noop, stroke: noop, fill: noop, arc: noop,
    moveTo: noop, lineTo: noop, closePath: noop, fillText: noop,
    lineWidth: 1, font: '', fillStyle: '', strokeStyle: '', textAlign: 'left',
  };
  const makeEl = (id, attrs = {}) => {
    const elAttrs = {...attrs};
    const classes = new Set();
    const listeners = {};
    return {
      id,
      attrs: elAttrs,
      width: 260,
      height: 132,
      value: '0',
      textContent: '',
      className: '',
      style: {},
      classList: {
        toggle: (c, f) => (f ? classes.add(c) : classes.delete(c)),
        contains: (c) => classes.has(c),
      },
      getAttribute: (k) => elAttrs[k] ?? null,
      setAttribute: (k, v) => { elAttrs[k] = String(v); },
      addEventListener: (ev, fn) => { (listeners[ev] ||= []).push(fn); },
      trigger: (ev, payload = {}) => (listeners[ev] || []).forEach((fn) => fn(payload)),
      getContext: () => fakeCtx,
    };
  };
  const byId = {};
  for (const m of indexHtml.matchAll(/id="([^"]+)"/g)) byId[m[1]] = makeEl(m[1]);
  const cards = ['hcsr04', 'tcrt5000', 'motores', 'mpu6050'].map((c) => {
    const el = byId[`hw-card-${c}`];
    el.getAttribute = (k) => (k === 'data-card' ? c : el.attrs[k] ?? null);
    return el;
  });
  const stBtns = [];
  for (const c of ['hcsr04', 'tcrt5000', 'motores', 'mpu6050']) {
    for (const v of ['normal', 'advertencia', 'fallo']) {
      stBtns.push(makeEl('', {'data-st-card': c, 'data-st-val': v}));
    }
  }
  const pills = ['hcsr04', 'tcrt5000', 'mpu6050', 'motores', 'esp32'].map((c) => makeEl('', {'data-comp': c}));
  let intervalFn = null;
  const doc = {
    readyState: 'complete',
    getElementById: (id) => byId[id] || null,
    querySelectorAll: (sel) => {
      if (sel === '.hw-card') return cards;
      if (sel === '.hw-zone, .hw-comp-pill' || sel === '.hw-comp-pill') return pills;
      if (sel === '[data-st-card]') return stBtns;
      return [];
    },
    addEventListener: noop,
  };
  const sandbox = {
    document: doc,
    window: {setInterval: (fn) => { intervalFn = fn; return 1; }},
    Math, Number, String,
  };
  vm.runInNewContext(jsSrc, sandbox);
  assert.strictEqual(byId['hw-card-hcsr04'].attrs['data-estado'], 'normal');
  assert.strictEqual(byId['hw-badge-mpu6050'].textContent, 'ESTABILIDAD OK');
  assert.ok(typeof intervalFn === 'function', 'animación periódica registrada');
  intervalFn();
  // Simula fallo en HC-SR04 y advertencia en MPU-6050
  stBtns.find((b) => b.getAttribute('data-st-card') === 'hcsr04' && b.getAttribute('data-st-val') === 'fallo').trigger('click');
  assert.strictEqual(byId['hw-card-hcsr04'].attrs['data-estado'], 'fallo');
  assert.strictEqual(byId['hw-badge-hcsr04'].textContent, 'FALLO SENSOR');
  byId['hw-btn-reset'].trigger('click');
  assert.strictEqual(byId['hw-card-hcsr04'].attrs['data-estado'], 'normal');
});

console.log(`\nP02 inspector: ${ok}/${ok} pruebas pasaron`);
