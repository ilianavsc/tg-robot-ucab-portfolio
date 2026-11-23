/* Valida los contratos versionados (specs/mqtt/contract.json y specs/pista_canonica.json)
 * y la integración de tokens.css en el portafolio.
 * Uso: node scripts/validar_contratos.mjs */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (rel) => readFileSync(join(raiz, rel), 'utf8');

const mqtt = JSON.parse(leer('specs/mqtt/contract.json'));
const pista = JSON.parse(leer('specs/pista_canonica.json'));
const tokensCss = leer('assets/css/tokens.css');
const styleCss = leer('assets/css/style.css');
const p04Mqtt = leer('prototipos/P04-simulador-1-esp32/codigo/mqtt_puente.js');

// 1. Contrato MQTT
assert.equal(mqtt.version, '1.0.0');
assert.deepEqual(
  mqtt.brokers.map((b) => b.nombre),
  ['HiveMQ', 'EMQX', 'Mosquitto'],
  'orden de brokers debe coincidir con app y P04'
);
for (const clave of ['estado', 'ultrasonido', 'ordenes', 'ack', 'alertas', 'conexion']) {
  assert.ok(mqtt.topicos[clave] && mqtt.topicos[clave].ruta.startsWith('ucab-tg-sf/robot/'), `tópico ${clave}`);
}
assert.equal(mqtt.topicos.estado.qos, 0);
assert.equal(mqtt.topicos.ultrasonido.qos, 0);
assert.equal(mqtt.topicos.ordenes.qos, 1);
assert.equal(mqtt.topicos.ack.qos, 1);
assert.equal(mqtt.topicos.alertas.qos, 2);
assert.equal(mqtt.topicos.conexion.qos, 1);
assert.equal(mqtt.topicos.conexion.retained, true);
assert.deepEqual(mqtt.comandosValidos, ['adelante', 'atras', 'izquierda', 'derecha', 'frenar', 'auto']);
assert.equal(mqtt.tiempos.ackTimeoutMs, 5000);
assert.deepEqual(mqtt.payloads.estado.exclusivosSimuladorP04, ['progreso_m', 'largo_m', 'sensores']);
for (const campo of mqtt.payloads.estado.exclusivosSimuladorP04) {
  assert.ok(!mqtt.payloads.estado.fisicoHIL.includes(campo), `${campo} es exclusivo de simulador P04`);
  assert.ok(p04Mqtt.includes(campo), `P04 debe publicar ${campo}`);
}

// 2. Contrato de pista canónica + metadato de convivencia PC funcionales vs tercios L/3
assert.equal(pista.longitudTotalM, 9.0);
assert.deepEqual(pista.puntosDeControl.map((p) => p.posicionM), [3.0, 4.5, 7.5]);
assert.ok(pista.convencionPuntosDeControl, 'debe incluir convencionPuntosDeControl');
assert.deepEqual(pista.convencionPuntosDeControl.funcionalesCanonicosM, [3.0, 4.5, 7.5]);
assert.deepEqual(pista.convencionPuntosDeControl.terciosEquitativos.pistaA_8_05m, [2.68, 5.37, 8.05]);
assert.deepEqual(pista.convencionPuntosDeControl.terciosEquitativos.pistaB_9_00m, [3.0, 6.0, 9.0]);

// 3. Tokens de diseño Claro en el portafolio
assert.ok(tokensCss.includes('--tg-bg: #F8FAFC') && tokensCss.includes('--tg-accent: #0F9D84'));
assert.ok(tokensCss.includes('tabular-nums') && tokensCss.includes('--tg-touch-min: 44px'));
assert.ok(styleCss.includes('@import url("./tokens.css")'), 'style.css debe importar tokens.css');

// 4. Cronograma Académico (Línea B) y metadata de entregas de tesis
const estadosValidos = new Set(['planificada', 'en_preparacion', 'en_revision', 'entregada', 'aprobada']);
const acad = JSON.parse(leer('datos/entregas_academicas.json'));
assert.equal(acad.entregas.length, 8, 'Línea B debe tener exactamente 8 entregas formales');
for (const e of acad.entregas) {
  assert.ok(estadosValidos.has(e.estado), `estado inválido en ${e.id}: ${e.estado}`);
  assert.ok(typeof e.titulo === 'string' && e.titulo.length > 0, `título en ${e.id}`);
  assert.ok(typeof e.fecha_entrega === 'string' && e.fecha_entrega.length > 0, `fecha_entrega en ${e.id}`);
}
for (const slug of ['capitulo-1', 'marco-preliminar', 'capitulo-2']) {
  const item = acad.entregas.find((e) => e.entrega === slug);
  assert.ok(item, `debe existir entrega ${slug} en entregas_academicas.json`);
  assert.equal(item.estado, 'entregada', `${slug} debe estar marcada como entregada`);
  const meta = JSON.parse(leer(`tesis/entregas/${slug}/metadata.json`));
  for (const campo of ['entrega', 'titulo', 'estado', 'fecha_entrega', 'archivo_original', 'notas']) {
    assert.ok(campo in meta, `falta campo ${campo} en tesis/entregas/${slug}/metadata.json`);
  }
  assert.equal(meta.estado, 'entregada', `metadata.json de ${slug} debe indicar entregada`);
}

// 5. Blindaje de enlaces activos hacia tg-robot-ucab-app y ausencia de rutas al repo viejo
const archivosWebActivos = [
  'index.html',
  'arquitectura.html',
  'bitacora.html',
  'cronograma.html',
  'decisiones.html',
  'hardware.html',
  'requerimientos.html',
  'tesis.html',
  'assets/sitio.js',
  'datos/proyecto.js',
  'prototipos/index.html',
  'prototipos/centro-pruebas.html',
];
const patronAppVieja = /tg-robot-ucab\/app\b|href=["'](?:\.\.\/)*app\/["']|href=["']\.\.\/https?:\/\//i;
const patronRepoViejo = /https?:\/\/(?:github\.com\/ilianavsc|ilianavsc\.github\.io)\/tg-robot-ucab(?:\/|["'\s)])/i;
for (const rel of archivosWebActivos) {
  const contenido = leer(rel);
  assert.ok(!patronAppVieja.test(contenido), `enlace mal formado o relativo hacia la app en ${rel}`);
  assert.ok(!patronRepoViejo.test(contenido), `URL activa apuntando al repo viejo /tg-robot-ucab/ en ${rel}`);
}
assert.ok(
  leer('assets/sitio.js').includes('https://ilianavsc.github.io/tg-robot-ucab-app/'),
  'assets/sitio.js debe apuntar exactamente a https://ilianavsc.github.io/tg-robot-ucab-app/'
);

console.log('contratos + tokens + entregas académicas + enlaces app: OK');
