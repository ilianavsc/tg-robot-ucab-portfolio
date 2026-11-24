/* Pruebas del Simulador 1 de aprendizaje progresivo (P04): las dos pistas, la lectura de la línea, los modos manual/automático
 * y los datos en vivo. Solo la parte sin three.js: no necesita navegador ni dependencias.
 * Uso:  node prototipos/P04-simulador-1-esp32/codigo/simulador1.test.js */
import assert from 'node:assert';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {crearGranito} from './granito.js';
import {leerSensores, binarios} from './linea.js';
import {R} from './model.js';
import {IDS_PISTA, PISTAS, ZONA, ZONA_B, calcularPuntosControl, crearPista, ocultarTramo, tramoEn} from './pista.js';
import {GEOM, PINES_TCRT, crearSim, ledsEsp32} from './sim.js';
import {
  ALERTAS_MPU6050,
  BROKERS,
  ESTADOS_PEDIDO,
  ESTADOS_RUTA,
  SCHEMA_VERSION,
  TOPICOS,
  TIMEOUT_MANUAL_S,
  crearPuenteMqtt,
} from './mqtt_puente.js';

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (f) => readFileSync(join(aqui, f), 'utf8');
const especificacion = JSON.parse(readFileSync(join(aqui, '../../../specs/pista_canonica.json'), 'utf8'));
let ok = 0;
const prueba = (nombre, f) => {
  f();
  ok++;
  console.log('  OK   ' + nombre);
};
const conGranito = (P) => crearGranito(P).gran;
const correr = (sim, seg) => {
  for (let t = 0; t < seg; t += 0.05) sim.avanzar(0.05);
};

prueba('hay dos pistas seleccionables, A y B', () => {
  assert.deepStrictEqual(IDS_PISTA, ['A', 'B']);
  assert.ok(PISTAS.A.nombre.includes('histórico') && PISTAS.B.nombre.includes('canónica'));
  assert.throws(() => crearPista('Z'));
});

prueba('Pista A conserva el circuito histórico de 8,05 m y su curva de 22 cm', () => {
  const P = crearPista('A');
  assert.ok(Math.abs(P.largo - 8.05) < 0.006, `largo ${P.largo}`);
  assert.ok(Math.abs(P.rmin - 0.22) < 0.005, `rmin ${P.rmin}`);
  assert.strictEqual(P.tramos.length, 1);
});

prueba('Pista B mide 9,0 m como la pista canónica y sus tramos son los de specs/pista_canonica.json', () => {
  const P = crearPista('B');
  assert.strictEqual(especificacion.longitudTotalM, 9.0);
  assert.ok(Math.abs(P.largo - especificacion.longitudTotalM) < 0.006, `largo ${P.largo}`);
  assert.strictEqual(P.tramos.length, especificacion.tramos.length);
  especificacion.tramos.forEach((t, i) => {
    assert.strictEqual(P.tramos[i].id, t.id);
    assert.strictEqual(P.tramos[i].desdeM, t.desdeM);
    assert.strictEqual(P.tramos[i].hastaM, t.hastaM);
  });
  assert.strictEqual(especificacion.anchoCintaMm, 19);
  assert.ok(Math.hypot(P.X[0] - P.X[P.N - 1], P.Z[0] - P.Z[P.N - 1]) < 0.0075); // circuito cerrado
});

prueba('Pista B tiene otra geometría: rectas largas, curvas técnicas y cabe en su zona del piso', () => {
  const A = crearPista('A');
  const B = crearPista('B');
  assert.ok(B.largo > A.largo);
  assert.ok(B.rmin >= 0.25 && B.rmin < 0.3, `rmin ${B.rmin}`); // curvas cerradas, pero más suaves que las de 22 cm
  // la recta más larga (radio enorme seguido) supera 3,4 m
  let mejor = 0;
  let cur = 0;
  for (let k = 0; k < 2 * B.N; k++) {
    if (B.RAD[k % B.N] > 20) cur++;
    else cur = 0;
    mejor = Math.max(mejor, cur);
  }
  assert.ok(mejor * B.paso >= 3.4, `recta ${mejor * B.paso}`);
  for (let i = 0; i < B.N; i++) {
    assert.ok(B.X[i] > ZONA_B.x0 && B.X[i] < ZONA_B.x0 + ZONA_B.ancho && B.Z[i] > ZONA_B.z0 && B.Z[i] < ZONA_B.z0 + ZONA_B.alto);
  }
  assert.ok(A.X.every((x, i) => x > ZONA.x0 && x < ZONA.x0 + ZONA.ancho && A.Z[i] > ZONA.z0 && A.Z[i] < ZONA.z0 + ZONA.alto));
});

prueba('el tramo T2 de la pista B es recto (listo para retirar la cinta con heading hold)', () => {
  const B = crearPista('B');
  for (let m = 3.0; m < 4.5; m += B.paso) assert.ok(B.RAD[Math.round(m / B.paso)] > 20, `curva en ${m} m`);
  assert.strictEqual(tramoEn(B, Math.round(3.5 / B.paso)).id, 'T2');
  assert.strictEqual(tramoEn(B, Math.round(8.0 / B.paso)).id, 'T4');
});

prueba('automático: da vueltas en la pista A con los resultados históricos (≈ 19,7 s, 0,41 m/s, 0 salidas)', () => {
  const s = crearSim({pistaId: 'A', modo: 'auto', encendido: true, fabricaGran: conGranito});
  correr(s, 62);
  const L = s.lectura();
  assert.ok(L.vueltas >= 3, `vueltas ${L.vueltas}`);
  assert.ok(Math.abs(L.ultimaVuelta - 19.7) < 0.6, `vuelta ${L.ultimaVuelta}`);
  assert.strictEqual(L.salidas, 0);
  const r = s.resumen()[0];
  assert.ok(r.vmedia > R.meta[0] && r.vmedia < R.meta[1], `vel ${r.vmedia}`);
  assert.ok(r.emax < 25, `emax ${r.emax}`);
});

prueba('automático: da vueltas en la pista B (9,0 m) sin salirse y dentro de 0,35–0,6 m/s', () => {
  const s = crearSim({pistaId: 'B', modo: 'auto', encendido: true, fabricaGran: conGranito});
  correr(s, 70);
  const L = s.lectura();
  assert.ok(L.vueltas >= 3, `vueltas ${L.vueltas}`);
  assert.strictEqual(L.salidas, 0);
  const r = s.resumen()[0];
  assert.ok(r.vmedia > R.meta[0] && r.vmedia < R.meta[1], `vel ${r.vmedia}`);
  assert.ok(r.emax < 45, `emax ${r.emax}`);
  // recorrió los cuatro tramos y midió su tiempo
  assert.deepStrictEqual(Object.keys(s.tiemposTramo).sort(), ['T1', 'T2', 'T3', 'T4']);
});

prueba('los 4 TCRT5000 muestran [0/1,0/1,0/1,0/1]: centrado en la cinta lee [0,1,1,0] y el error lateral cambia con el lado', () => {
  const s = crearSim({pistaId: 'A', modo: 'auto', encendido: true}); // piso liso
  const L0 = s.lectura();
  assert.strictEqual(L0.bin.length, 4);
  assert.ok(L0.bin.every((b) => b === 0 || b === 1));
  assert.ok(L0.bin.some((b) => b === 1)); // en la salida ya ve la cinta
  const vistos = new Set();
  for (let t = 0; t < 12; t += 0.05) {
    s.avanzar(0.05);
    vistos.add(s.lectura().bin.join(''));
  }
  assert.ok(vistos.has('0110'), [...vistos].join()); // centrado en la cinta: [0,1,1,0]
  s.reiniciar();
  s.avanzar(0.02);
  assert.ok(Math.abs(s.lectura().eMedido) < 12);
  // si el robot se corre a un lado, el error medido cambia de signo con el lado
  s.eje.x += Math.cos(s.eje.th) * 0.012;
  s.eje.z -= Math.sin(s.eje.th) * 0.012; // 12 mm a la izquierda: la línea queda a la derecha
  s.avanzar(0.011);
  const izq = s.lectura();
  assert.ok(izq.eMedido < -3, `e ${izq.eMedido}`);
  assert.ok(izq.eReal < -8, `real ${izq.eReal}`);
});

prueba('la lectura de la línea respeta la máscara de cinta: retirar T2 deja los sensores en piso (base de los simuladores futuros)', () => {
  const B = crearPista('B');
  const i = Math.round(3.75 / B.paso);
  const eje = {x: B.X[i] - B.TX[i] * GEOM.adelante, z: B.Z[i] - B.TZ[i] * GEOM.adelante, th: Math.atan2(B.TX[i], B.TZ[i])};
  const rnd = () => 0.5;
  const lee = () => binarios(leerSensores(B, eje, GEOM.sep, GEOM.adelante, null, rnd, i).map((l) => ({...l})).map((l) => (l.raw - R.adcPiso) / (R.adcCinta - R.adcPiso)).map((v) => (v < R.umbral ? 0 : v)));
  assert.ok(lee().some((b) => b === 1));
  ocultarTramo(B, 3.0, 4.5);
  assert.deepStrictEqual(lee(), [0, 0, 0, 0]);
  assert.strictEqual(B.tramos[1].linea, false);
  assert.strictEqual(B.cinta[Math.round(2.9 / B.paso)], 1); // fuera del tramo sigue la cinta
  ocultarTramo(B, 3.0, 4.5, true);
  assert.ok(lee().some((b) => b === 1));
});

prueba('manual: W/↑ avanza, A/D giran, S retrocede y Espacio frena de inmediato', () => {
  const s = crearSim({pistaId: 'A', modo: 'manual', encendido: true});
  s.entrada.f = 1;
  correr(s, 2);
  assert.ok(s.v > 0.4 && s.v < 0.5, `v ${s.v}`);
  s.entrada.t = 1;
  const th0 = s.eje.th;
  correr(s, 0.5);
  assert.ok(s.eje.th > th0, 'gira a la izquierda');
  s.entrada.t = -1;
  correr(s, 1);
  assert.ok(s.pwm.izq > s.pwm.der, 'a la derecha la rueda izquierda va más rápido');
  s.entrada.t = 0;
  s.entrada.f = -1;
  correr(s, 2);
  assert.ok(s.v < -0.3, `v ${s.v}`);
  s.entrada.f = 1;
  correr(s, 1.5);
  s.entrada.freno = true;
  correr(s, 0.3);
  assert.ok(Math.abs(s.v) < 0.01, `v tras frenar ${s.v}`);
});

prueba('manual y automático se alternan; manual fuera de la cinta cuenta una salida de línea', () => {
  const s = crearSim({pistaId: 'A', modo: 'auto', encendido: true, fabricaGran: conGranito});
  correr(s, 3);
  assert.strictEqual(s.modo, 'auto');
  s.setModo('manual');
  s.entrada.f = 1;
  s.entrada.t = 1;
  correr(s, 3);
  assert.strictEqual(s.modo, 'manual');
  assert.ok(s.salidas >= 1, `salidas ${s.salidas}`);
  s.entrada.f = s.entrada.t = 0;
  s.setModo('auto');
  assert.strictEqual(s.modo, 'auto');
  const claves = s.resumen().map((r) => `${r.pista}·${r.modo}`).sort();
  assert.deepStrictEqual(claves, ['A·auto', 'A·manual']);
});

prueba('la comparación guarda datos separados por pista y modo, y reiniciar vuelve a la salida', () => {
  const s = crearSim({pistaId: 'A', modo: 'auto', encendido: true});
  correr(s, 5);
  s.setPista('B');
  assert.strictEqual(s.pistaId, 'B');
  correr(s, 5);
  const claves = s.resumen().map((r) => `${r.pista}·${r.modo}`).sort();
  assert.deepStrictEqual(claves, ['A·auto', 'B·auto']);
  s.reiniciar();
  assert.ok(Math.hypot(s.eje.x - s.P.X[0], s.eje.z - s.P.Z[0]) < 1e-9);
  assert.strictEqual(s.salidas, 0);
  assert.strictEqual(s.resumen().length, 2); // lo acumulado no se pierde al reiniciar
});

prueba('el panel tiene todos los datos: lectura, error, velocidad, distancia, rumbo, vuelta/tramo y salidas', () => {
  const s = crearSim({pistaId: 'B', modo: 'auto', encendido: true});
  correr(s, 4);
  const L = s.lectura();
  for (const k of ['bin', 'raw', 'eMedido', 'eReal', 'v', 'distancia', 'rumbo', 'tVuelta', 'vuelta', 'tramo', 'salidas', 'pwm']) assert.ok(k in L, k);
  assert.ok(L.distancia > 1 && L.v > 0.3);
  assert.ok(L.rumbo >= -180 && L.rumbo <= 180);
  assert.strictEqual(L.tramo.id, 'T1');
});

prueba('la definición de la pista, la lectura de la línea y el motor están separados', () => {
  const pista = leer('pista.js');
  const linea = leer('linea.js');
  const modelo = leer('model.js');
  assert.ok(!/from '\.\/(linea|model|sim)\.js'/.test(pista), 'pista.js no depende de la lectura ni del motor');
  assert.ok(!/from '\.\/(sim|pista)\.js'/.test(modelo) && !/from 'three'/.test(modelo), 'model.js solo es física');
  assert.ok(/from '\.\/pista\.js'/.test(linea) && !/from 'three'/.test(linea), 'linea.js lee la línea sobre la pista');
  assert.ok(/P\.cinta/.test(linea), 'linea.js respeta la máscara de cinta');
  assert.ok(/export function ocultarTramo/.test(pista));
});

prueba('control: teclado (W A S D, flechas, Espacio), D-Pad táctil (pointerdown, touchstart, touchend) y botón STOP', () => {
  const main = leer('main.js');
  for (const c of ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']) assert.ok(main.includes(c), c);
  for (const e of ['pointerdown', 'pointerup', 'touchstart', 'touchend']) assert.ok(main.includes(`'${e}'`), e);
  const html = leer('plantilla.html');
  for (const d of ['arriba', 'abajo', 'izq', 'der', 'stop']) assert.ok(html.includes(`data-dp="${d}"`), d);
  assert.ok(/data-modo="manual"/.test(html) && /data-modo="auto"/.test(html));
  assert.ok(/data-pista="A"/.test(html) && /data-pista="B"/.test(html));
});

prueba('terminología: aprendizaje progresivo y teach-and-repeat; sin términos de otras tecnologías', () => {
  const todo = ['main.js', 'sim.js', 'pista.js', 'plantilla.html', 'linea.js'].map(leer).join('\n');
  assert.ok(/aprendizaje progresivo/i.test(todo));
  const prohibido = new RegExp(['\\bI', 'A\\b|inteligencia ', 'artificial'].join(''), 'i'); // sin escribir la sigla completa
  assert.ok(!prohibido.test(todo));
  assert.ok(!/FOLLOW_LINE|HEADING_HOLD|WAIT_BEACON|REACQUIRE_LINE/.test(todo), 'no copia la máquina de estados de teach-and-repeat');
});

// ---- fusión con el Simulador del ESP32: LEDs de la placa sincronizados con la pista
prueba('placa ESP32: los 4 LEDs de línea siguen en cada paso la misma lectura del lazo PD', () => {
  const crear = crearSim;
  assert.deepStrictEqual(PINES_TCRT, ['GPIO 36', 'GPIO 39', 'GPIO 34', 'GPIO 35']);
  const s = crear({pistaId: 'A', modo: 'auto', encendido: true});
  let encendidos = 0;
  let cambios = 0;
  let previo = '';
  for (let k = 0; k < 1500; k++) {
    s.avanzar(1 / 60);
    const L = s.lectura();
    const led = ledsEsp32(L);
    assert.deepStrictEqual(led.tcrt, L.bin.map((b) => (b ? 1 : 0)));
    assert.ok(led.ena >= 0 && led.ena <= 1 && led.enb >= 0 && led.enb <= 1);
    if (led.tcrt.some((b) => b)) encendidos++;
    const c = led.tcrt.join('');
    if (c !== previo) cambios++;
    previo = c;
  }
  assert.ok(encendidos > 1400, `sobre la cinta casi siempre (${encendidos})`);
  assert.ok(cambios > 10, `los LEDs cambian con el movimiento (${cambios})`);
});

prueba('placa ESP32: fuera de la cinta los LEDs se apagan y al retroceder marca el sentido de los motores', () => {
  const crear = crearSim;
  const s = crear({pistaId: 'B', modo: 'manual', encendido: true});
  s.entrada.t = 1; // gira sobre sí mismo hasta salir de la cinta
  for (let k = 0; k < 120; k++) s.avanzar(1 / 60);
  s.entrada.t = 0;
  s.entrada.f = 1;
  for (let k = 0; k < 120; k++) s.avanzar(1 / 60);
  assert.deepStrictEqual(ledsEsp32(s.lectura()).tcrt, [0, 0, 0, 0]);
  s.entrada.f = -1;
  for (let k = 0; k < 60; k++) s.avanzar(1 / 60);
  const led = ledsEsp32(s.lectura());
  assert.strictEqual(led.dirIzq, -1);
  assert.strictEqual(led.dirDer, -1);
  assert.ok(led.ena > 0.5 && led.enb > 0.5);
});

prueba('la plantilla de P04 trae la placa ESP32 con 4 LEDs de línea', () => {
  const html = readFileSync(join(aqui, 'plantilla.html'), 'utf8');
  assert.ok(/id="placa-esp32"/.test(html));
  assert.strictEqual((html.match(/class="esp-led tcrt"/g) || []).length, 4);
  const main = readFileSync(join(aqui, 'main.js'), 'utf8');
  assert.ok(/ledsEsp32\(/.test(main), 'main.js pinta la placa con ledsEsp32');
  assert.ok(/id="placa-mqtt"/.test(html) && /id="b-mqtt"/.test(html) && /id="mqtt-estado"/.test(html));
  assert.ok(
    /id="placa-mpu"/.test(html) &&
      /data-mpu="impacto"/.test(html) &&
      /data-mpu="inclinacion"/.test(html) &&
      /data-mpu="atascamiento"/.test(html) &&
      /id="b-mpu-recuperar"/.test(html),
    'plantilla P04 debe exponer botones UI de alertas inerciales y recuperación manual',
  );
  assert.ok(/dispararAlertaInercial\(/.test(main), 'main.js debe invocar dispararAlertaInercial desde la UI');
});

prueba('puente MQTT: tópicos y brokers coinciden con la App Flutter (HiveMQ → EMQX → Mosquitto)', () => {
  assert.deepStrictEqual(BROKERS.map((b) => b.nombre), ['HiveMQ', 'EMQX', 'Mosquitto']);
  assert.strictEqual(TOPICOS.estado, 'ucab-tg-sf/robot/estado');
  assert.strictEqual(TOPICOS.ultrasonido, 'ucab-tg-sf/robot/ultrasonido');
  assert.strictEqual(TOPICOS.ordenes, 'ucab-tg-sf/robot/ordenes');
  assert.strictEqual(TOPICOS.ack, 'ucab-tg-sf/robot/ordenes/ack');
});

prueba('puente MQTT: comandos de movimiento y freno mueven el robot en tiempo real, publican telemetría y responden ACK', () => {
  const s = crearSim({pistaId: 'A', modo: 'auto', encendido: true});
  const publicados = [];
  const suscritos = [];
  const listeners = {};
  const clienteMock = {
    on(ev, fn) { (listeners[ev] ||= []).push(fn); },
    subscribe(topic, opts) { suscritos.push({topic, opts}); },
    publish(topic, payload, opts) { publicados.push({topic, payload: JSON.parse(payload), opts}); },
    removeAllListeners() {},
    end() {},
  };

  const puente = crearPuenteMqtt({
    sim: s,
    crearCliente: () => clienteMock,
  });

  puente.conectar();
  assert.strictEqual(puente.estado, 'conectando');
  listeners.connect.forEach((fn) => fn());
  assert.strictEqual(puente.estado, 'conectado');
  assert.strictEqual(suscritos[0].topic, TOPICOS.ordenes);
  assert.ok(publicados.some((p) => p.topic === TOPICOS.estado));
  assert.ok(publicados.some((p) => p.topic === TOPICOS.ultrasonido));

  // Recibir orden 'adelante' cambia a manual, mueve el robot y envía ACK
  const emitir = (obj) => listeners.message.forEach((fn) => fn(TOPICOS.ordenes, JSON.stringify(obj)));
  emitir({id: 'ord-1', cmd: 'adelante'});
  assert.strictEqual(s.modo, 'manual');
  for (let t = 0; t < 1.5; t += 0.05) { puente.avanzar(0.05); s.avanzar(0.05); }
  assert.ok(s.v > 0.35, `velocidad hacia adelante esperada > 0.35, obtuvo ${s.v}`);
  const ack1 = publicados.filter((p) => p.topic === TOPICOS.ack).pop();
  assert.strictEqual(ack1.payload.id, 'ord-1');
  assert.strictEqual(ack1.payload.recibidas, 1);

  // Recibir orden 'atras' invierte el sentido de marcha y los LEDs/PWM lo reflejan
  emitir({id: 'ord-2', cmd: 'atras'});
  for (let t = 0; t < 2.0; t += 0.05) { puente.avanzar(0.05); s.avanzar(0.05); }
  assert.ok(s.v < -0.25, `velocidad hacia atrás esperada < -0.25, obtuvo ${s.v}`);
  assert.strictEqual(ledsEsp32(s.lectura()).dirIzq, -1);

  // Recibir orden 'frenar' detiene al robot y envía ACK
  emitir({id: 'ord-3', cmd: 'frenar'});
  for (let t = 0; t < 0.4; t += 0.05) { puente.avanzar(0.05); s.avanzar(0.05); }
  assert.ok(Math.abs(s.v) < 0.02, `robot debe detenerse tras frenar, v=${s.v}`);
  const ack3 = publicados.filter((p) => p.topic === TOPICOS.ack).pop();
  assert.strictEqual(ack3.payload.id, 'ord-3');
  assert.strictEqual(ack3.payload.recibidas, 3);

  // Fail-safe manual: sin nuevas órdenes por > TIMEOUT_MANUAL_S se detiene por timeout
  emitir({id: 'ord-4', cmd: 'derecha'});
  for (let t = 0; t < TIMEOUT_MANUAL_S + 0.6; t += 0.1) { puente.avanzar(0.1); s.avanzar(0.1); }
  assert.strictEqual(puente.parada, 'timeout');
  assert.ok(Math.abs(s.v) < 0.02, `timeout debe frenar al robot, v=${s.v}`);

  // Recibir 'auto' reanuda seguimiento automático de línea
  emitir({id: 'ord-5', cmd: 'auto'});
  assert.strictEqual(s.modo, 'auto');
  assert.strictEqual(puente.parada, 'ninguna');
  const ultEstado = publicados.filter((p) => p.topic === TOPICOS.estado).pop().payload;
  assert.strictEqual(ultEstado.estado, 'autonomo');
  assert.strictEqual(ultEstado.ordenes, 5);
  assert.strictEqual(ultEstado.sensores.length, 4);

  puente.desconectar();
  assert.strictEqual(puente.estado, 'desconectado');
});

// ---- Fase 1: inicio estático, menú pre-inicio, D-Pad condicional, PC1–PC3 y mini-mapa
prueba('inicio estático (encendido=false) + transición Encender / Detener congela dinámica, tiempo y MQTT', () => {
  const s = crearSim({pistaId: 'A', modo: 'auto'});
  assert.strictEqual(s.encendido, false);
  assert.strictEqual(s.v, 0);
  const x0 = s.eje.x;
  const z0 = s.eje.z;
  correr(s, 2);
  assert.strictEqual(s.eje.x, x0, 'no debe moverse estando detenido');
  assert.strictEqual(s.eje.z, z0);
  assert.strictEqual(s.t, 0, 'el tiempo debe permanecer congelado');
  assert.strictEqual(s.dist, 0);
  assert.strictEqual(s.pwm.izq, 0);
  assert.strictEqual(s.pwm.der, 0);

  // Al conectar MQTT estando detenido no publica telemetría hasta Encender
  const publicados = [];
  const listeners = {};
  const clienteMock = {
    on(ev, fn) { (listeners[ev] ||= []).push(fn); },
    subscribe() {},
    publish(topic, payload) { publicados.push({topic, payload: JSON.parse(payload)}); },
    removeAllListeners() {},
    end() {},
  };
  const puente = crearPuenteMqtt({sim: s, crearCliente: () => clienteMock});
  puente.conectar();
  listeners.connect.forEach((fn) => fn());
  for (let t = 0; t < 3; t += 0.1) puente.avanzar(0.1);
  assert.strictEqual(publicados.length, 0, 'MQTT congelado mientras encendido=false');

  // Encender reanuda dinámica, tiempo y publicaciones MQTT
  s.encender();
  assert.strictEqual(s.encendido, true);
  for (let t = 0; t < 2; t += 0.05) { puente.avanzar(0.05); s.avanzar(0.05); }
  assert.ok(s.dist > 0.5 && s.t > 1.9, `debe avanzar al encender (dist=${s.dist}, t=${s.t})`);
  assert.ok(publicados.length >= 2, 'MQTT debe publicar al reanudar');

  // Detener congela todo de nuevo
  s.detener();
  assert.strictEqual(s.encendido, false);
  const tCongelado = s.t;
  const dCongelada = s.dist;
  const pubsAntes = publicados.length;
  for (let t = 0; t < 3; t += 0.1) { puente.avanzar(0.1); s.avanzar(0.1); }
  assert.strictEqual(s.t, tCongelado);
  assert.strictEqual(s.dist, dCongelada);
  assert.strictEqual(publicados.length, pubsAntes);
  puente.desconectar();
});

prueba('menú pre-inicio y D-Pad condicional: oculto en modo App (MQTT), visible en modo local', () => {
  const html = leer('plantilla.html');
  const css = leer('style.css');
  const main = leer('main.js');
  assert.ok(/<dialog[^>]*id="menu-inicio"/.test(html), 'usa <dialog> nativo para menú pre-inicio');
  assert.ok(/name="pre-conexion"[^>]*value="app"/.test(html) && /name="pre-conexion"[^>]*value="local"/.test(html));
  assert.ok(/name="pre-pista"[^>]*value="A"/.test(html) && /name="pre-pista"[^>]*value="B"/.test(html));
  assert.ok(/id="b-entrar"/.test(html) && /id="b-config"/.test(html));
  assert.ok(/id="b-encender"[^>]*aria-pressed="false"/.test(html) && html.includes('⚡ Encender'));
  assert.ok(main.includes('⏹ Detener') && main.includes('⚡ Encender'));
  assert.ok(/body\[data-conexion="app"\] \.dpad/.test(css), 'CSS oculta D-Pad en modo App');
  assert.ok(main.includes("dpad.hidden = true") && main.includes("dpad.hidden = false"), 'main.js alterna visibilidad del D-Pad según modo');
  assert.ok(/id="minimapa"/.test(html) && /id="minimapa-canvas"/.test(html) && main.includes('pintaMinimapa'));
});

prueba('puntos de control PC1–PC3 en tercios para Pista A (2,68 / 5,37 / 8,05 m) y Pista B (3,00 / 6,00 / 9,00 m)', () => {
  const A = crearPista('A');
  const B = crearPista('B');
  const pcA = calcularPuntosControl(A);
  const pcB = calcularPuntosControl(B);
  assert.deepStrictEqual(pcA.map((p) => [p.id, p.distanciaM]), [['PC1', 2.68], ['PC2', 5.37], ['PC3', 8.05]]);
  assert.deepStrictEqual(pcB.map((p) => [p.id, p.distanciaM]), [['PC1', 3.0], ['PC2', 6.0], ['PC3', 9.0]]);
  for (const [P, pcs] of [[A, pcA], [B, pcB]]) {
    assert.strictEqual(P.puntosControl.length, 3);
    for (const pc of pcs) {
      assert.ok(Number.isFinite(pc.x) && Number.isFinite(pc.z));
      assert.ok(Math.hypot(pc.x - P.X[pc.idx], pc.z - P.Z[pc.idx]) < 1e-9);
    }
  }
});

prueba('modo App bloquea atajos de teclado R y M, y PC3 se rotula como PC3 / META en pista y mini-mapa', () => {
  const main = leer('main.js');
  const granito = leer('granito.js');
  const kdIdx = main.indexOf("addEventListener('keydown'");
  const kdBloque = main.slice(kdIdx, kdIdx + 420);
  const idxApp = kdBloque.indexOf("ui.conexion === 'app'");
  const idxR = kdBloque.indexOf("e.code === 'KeyR'");
  const idxM = kdBloque.indexOf("e.code === 'KeyM'");
  assert.ok(idxApp > 0 && idxApp < idxR && idxApp < idxM, 'ui.conexion === app debe bloquear R y M antes de evaluarlos');
  assert.ok(main.includes("'PC3 / META'"), 'mini-mapa rotula PC3 / META');
  assert.ok(granito.includes("'PC3 / META'"), 'pista 3D rotula PC3 / META');
});

// ---- Contrato MQTT v2.0.0: Capa 3 Operacional (rutas, pedidos, trazabilidad) y disparo dual MPU-6050
prueba('MQTT v2.0.0: suscripciones Capa 3, flujo rutas/escaneo -> rutas/estado (retained), reposicionamiento y deduplicación', () => {
  assert.strictEqual(SCHEMA_VERSION, '2.0.0');
  assert.strictEqual(ESTADOS_RUTA.length, 10);
  assert.strictEqual(ESTADOS_PEDIDO.length, 5);
  assert.deepStrictEqual(ALERTAS_MPU6050, ['impacto', 'inclinacion', 'atascamiento']);

  const s = crearSim({pistaId: 'B', modo: 'auto', encendido: true});
  const publicados = [];
  const suscritos = [];
  const listeners = {};
  const clienteMock = {
    on(ev, fn) { (listeners[ev] ||= []).push(fn); },
    subscribe(topic, opts) { suscritos.push({topic, opts}); },
    publish(topic, payload, opts) { publicados.push({topic, payload: JSON.parse(payload), opts}); },
    removeAllListeners() {},
    end() {},
  };

  const puente = crearPuenteMqtt({sim: s, crearCliente: () => clienteMock});
  puente.conectar();
  listeners.connect.forEach((fn) => fn());

  // Verifica las 4 suscripciones nuevas de Capa 3 en QoS 1
  for (const t of [TOPICOS.rutas_escaneo, TOPICOS.rutas_reposicionamiento, TOPICOS.pedidos_solicitud, TOPICOS.pedidos_cancelacion]) {
    const sub = suscritos.find((x) => x.topic === t);
    assert.ok(sub && sub.opts.qos === 1, `debe suscribirse a ${t} con QoS 1`);
  }

  const enviar = (topic, obj) => listeners.message.forEach((fn) => fn(topic, JSON.stringify(obj)));

  // 1) Iniciar escaneo lineal con parada
  enviar(TOPICOS.rutas_escaneo, {
    accion: 'iniciar',
    tipo_ruta: 'lineal',
    parada_configurada: true,
    message_id: 'msg-001',
    sequence: 1,
    timestamp: 1000,
    schema_version: '2.0.0',
  });
  let pubRuta = publicados.filter((p) => p.topic === TOPICOS.rutas_estado).pop();
  assert.strictEqual(pubRuta.payload.estado_ruta, 'ESCANEO_IDA');
  assert.strictEqual(pubRuta.opts.qos, 1);
  assert.strictEqual(pubRuta.opts.retain, true);

  // Deduplicación: repetir message_id msg-001 no genera nueva publicación ni registro
  const pubsAntes = publicados.length;
  enviar(TOPICOS.rutas_escaneo, {
    accion: 'finalizar',
    message_id: 'msg-001',
    sequence: 1,
    timestamp: 1001,
    schema_version: '2.0.0',
  });
  assert.strictEqual(publicados.length, pubsAntes, 'message_id duplicado debe descartarse');

  // 2) Finalizar ida lineal -> ESPERA_REPOSICION (bloquea órdenes de movimiento)
  enviar(TOPICOS.rutas_escaneo, {
    accion: 'finalizar',
    message_id: 'msg-002',
    sequence: 2,
    timestamp: 1100,
    schema_version: '2.0.0',
  });
  pubRuta = publicados.filter((p) => p.topic === TOPICOS.rutas_estado).pop();
  assert.strictEqual(pubRuta.payload.estado_ruta, 'ESPERA_REPOSICION');
  assert.strictEqual(pubRuta.payload.movimiento_bloqueado, true);
  assert.strictEqual(puente.recibirOrden(JSON.stringify({id: 'o-bloq', cmd: 'adelante'})).bloqueado, true);

  // 3) Confirmación manual en rutas/reposicionamiento -> ESCANEO_RETORNO -> finalizar -> OPERACION_CON_PARADA
  enviar(TOPICOS.rutas_reposicionamiento, {
    confirmado: true,
    origen: 'manual_usuario',
    message_id: 'msg-003',
    sequence: 3,
    timestamp: 1200,
    schema_version: '2.0.0',
  });
  assert.strictEqual(puente.capa3.estado_ruta, 'ESCANEO_RETORNO');
  enviar(TOPICOS.rutas_escaneo, {
    accion: 'finalizar',
    message_id: 'msg-004',
    sequence: 4,
    timestamp: 1300,
    schema_version: '2.0.0',
  });
  assert.strictEqual(puente.capa3.estado_ruta, 'OPERACION_CON_PARADA');
  assert.strictEqual(puente.registroTrazabilidad.length, 4);
  puente.desconectar();
});

prueba('MQTT v2.0.0: pedidos/solicitud -> pedidos/cancelacion preserva ruta (ruta_preservada: true, retained)', () => {
  const s = crearSim({pistaId: 'B', modo: 'auto', encendido: true});
  const publicados = [];
  const listeners = {};
  const clienteMock = {
    on(ev, fn) { (listeners[ev] ||= []).push(fn); },
    subscribe() {},
    publish(topic, payload, opts) { publicados.push({topic, payload: JSON.parse(payload), opts}); },
    removeAllListeners() {},
    end() {},
  };

  const puente = crearPuenteMqtt({sim: s, crearCliente: () => clienteMock});
  puente.conectar();
  listeners.connect.forEach((fn) => fn());
  const enviar = (topic, obj) => listeners.message.forEach((fn) => fn(topic, JSON.stringify(obj)));

  // Preparar ruta cerrada con parada
  enviar(TOPICOS.rutas_escaneo, {accion: 'iniciar', tipo_ruta: 'cerrada', parada_configurada: true, message_id: 'm1', sequence: 1, schema_version: '2.0.0'});
  enviar(TOPICOS.rutas_escaneo, {accion: 'finalizar', message_id: 'm2', sequence: 2, schema_version: '2.0.0'});
  assert.strictEqual(puente.capa3.estado_ruta, 'OPERACION_CON_PARADA');

  // Solicitar pedido
  enviar(TOPICOS.pedidos_solicitud, {
    request_id: 'req-42',
    parada_id: 'Estación 1',
    con_carga: true,
    message_id: 'm3',
    sequence: 3,
    schema_version: '2.0.0',
  });
  let pubPed = publicados.filter((p) => p.topic === TOPICOS.pedidos_estado).pop();
  assert.strictEqual(pubPed.payload.request_id, 'req-42');
  assert.strictEqual(pubPed.payload.estado_pedido, 'EN_TRANSITO');
  assert.strictEqual(pubPed.opts.qos, 1);
  assert.strictEqual(pubPed.opts.retain, true);

  // Cancelación segura preserva ruta
  enviar(TOPICOS.pedidos_cancelacion, {
    request_id: 'req-42',
    motivo: 'cancelado_usuario',
    modo: 'CANCELACION_SEGURA',
    message_id: 'm4',
    sequence: 4,
    schema_version: '2.0.0',
  });
  pubPed = publicados.filter((p) => p.topic === TOPICOS.pedidos_estado).pop();
  assert.strictEqual(pubPed.payload.estado_pedido, 'CANCELACION_SEGURA');
  assert.strictEqual(pubPed.payload.ruta_preservada, true);
  assert.strictEqual(puente.capa3.estado_ruta, 'OPERACION_CON_PARADA');
  puente.desconectar();
});

prueba('MQTT v2.0.0: disparo dual MPU-6050 (alertas QoS 2 + sensores/inercial QoS 0) y bloqueo hasta RECUPERACION_MANUAL', () => {
  const s = crearSim({pistaId: 'B', modo: 'auto', encendido: true});
  const publicados = [];
  const listeners = {};
  const clienteMock = {
    on(ev, fn) { (listeners[ev] ||= []).push(fn); },
    subscribe() {},
    publish(topic, payload, opts) { publicados.push({topic, payload: JSON.parse(payload), opts}); },
    removeAllListeners() {},
    end() {},
  };

  const puente = crearPuenteMqtt({sim: s, crearCliente: () => clienteMock});
  puente.conectar();
  listeners.connect.forEach((fn) => fn());
  const enviar = (topic, obj) => listeners.message.forEach((fn) => fn(topic, JSON.stringify(obj)));

  const res = puente.dispararAlertaInercial('impacto', 2.9);
  assert.strictEqual(res.ok, true);
  assert.strictEqual(puente.capa3.estado_ruta, 'ERROR_SEGURIDAD');
  assert.strictEqual(puente.movimientoBloqueado, true);

  // Disparo dual: alertas (QoS 2) y sensores/inercial (QoS 0)
  const pubAlerta = publicados.filter((p) => p.topic === TOPICOS.alertas).pop();
  const pubImu = publicados.filter((p) => p.topic === TOPICOS.sensores_inercial).pop();
  assert.ok(pubAlerta && pubAlerta.opts.qos === 2 && pubAlerta.payload.tipo === 'impacto');
  assert.ok(pubImu && pubImu.opts.qos === 0 && pubImu.payload.alerta === 'impacto');

  // Movimiento bloqueado en ERROR_SEGURIDAD y RECUPERACION_MANUAL
  assert.strictEqual(puente.recibirOrden(JSON.stringify({id: 'b1', cmd: 'adelante'})).bloqueado, true);
  enviar(TOPICOS.rutas_escaneo, {accion: 'recuperacion_manual', message_id: 'r1', sequence: 10, schema_version: '2.0.0'});
  assert.strictEqual(puente.capa3.estado_ruta, 'RECUPERACION_MANUAL');
  assert.strictEqual(puente.recibirOrden(JSON.stringify({id: 'b2', cmd: 'auto'})).bloqueado, true);

  // Reanudar tras recuperación manual libera el bloqueo
  enviar(TOPICOS.rutas_escaneo, {accion: 'reanudar_operacion', message_id: 'r2', sequence: 11, schema_version: '2.0.0'});
  assert.strictEqual(puente.movimientoBloqueado, false);
  assert.strictEqual(puente.recibirOrden(JSON.stringify({id: 'ok1', cmd: 'auto'})).ok, true);
  puente.desconectar();
});

console.log(`\nP04 Simulador 1: ${ok}/${ok} pruebas pasaron`);
