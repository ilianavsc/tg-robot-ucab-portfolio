/* Pruebas del núcleo de P10 · Ruta lineal con reposicionamiento manual (sin navegador ni dependencias).
 * Uso:  node prototipos/P10-ruta-lineal/ruta_lineal.test.js */
'use strict';
const assert = require('node:assert');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const R = require('./ruta_lineal.js');

let ok = 0;
const prueba = (nombre, f) => {
  f();
  ok++;
  console.log('  OK   ' + nombre);
};
const correr = (S, seg, alPaso) => {
  for (let i = 0; i < Math.round(seg * 60); i++) {
    S.paso(1 / 60);
    if (alPaso) alPaso(S.get());
  }
};
// avanza hasta que el estado cambie (o se acabe el tiempo)
const hasta = (S, estado, maxSeg = 60) => {
  for (let i = 0; i < maxSeg * 60; i++) {
    if (S.get().ruta.estado === estado && !S.get().ruta.sub) return S.get().ruta.t;
    S.paso(1 / 60);
  }
  throw new Error(`no llegó a ${estado} (está en ${S.get().ruta.estado})`);
};

prueba('arranca EN_BASE, sobre la cinta (0110), con motores bloqueados y sin alarma', () => {
  const S = R.crearSimulacion();
  const e = S.get();
  assert.strictEqual(e.ruta.estado, 'EN_BASE');
  assert.strictEqual(e.tcrt5000.patron, '0110');
  assert.strictEqual(e.tcrt5000.canales.length, 4);
  assert.ok(e.motores.bloqueado);
  assert.strictEqual(e.alarma.activa, false);
  correr(S, 2);
  assert.strictEqual(e.robot.v, 0, 'sin iniciar no se mueve');
});

prueba('ciclo completo: EN_BASE → EN_RUTA_IDA → ESPERA_REPOSICION → giro 180° → EN_RUTA_RETORNO → EN_BASE', () => {
  const S = R.crearSimulacion();
  const e = S.get();
  const vistos = [];
  S.subscribe((s) => { if (vistos[vistos.length - 1] !== s.ruta.estado) vistos.push(s.ruta.estado); });
  assert.ok(S.iniciarIda());
  assert.strictEqual(e.ruta.estado, 'EN_RUTA_IDA');
  hasta(S, 'ESPERA_REPOSICION');
  // al llegar: marca de parada 1111, motores bloqueados, alarma con el texto pedido
  assert.strictEqual(e.tcrt5000.patron, '1111');
  assert.ok(Math.abs(e.robot.x + R.GEO.tcrtAdelante - R.GEO.marcaParada) < 0.03, 'se detiene sobre la marca');
  assert.ok(e.motores.bloqueado && e.motores.pwm === 0 && e.robot.v === 0);
  assert.ok(e.alarma.activa);
  assert.strictEqual(e.alarma.texto, 'Destino alcanzado — reposicionar robot 180° para retorno');
  correr(S, 3);
  assert.strictEqual(e.ruta.estado, 'ESPERA_REPOSICION', 'espera al operador indefinidamente');
  assert.strictEqual(e.robot.v, 0);
  // reposición manual: la IMU refleja el giro de 180°
  assert.ok(S.girarYConfirmar());
  assert.strictEqual(e.ruta.sub, 'girando');
  correr(S, R.LIMITES.giroSeg / 2);
  assert.ok(e.mpu6050.yawDeg > 45 && e.mpu6050.yawDeg < 135, `yaw a mitad del giro ${e.mpu6050.yawDeg}`);
  assert.strictEqual(e.motores.pwm, 0, 'lo gira el operador: motores quietos');
  hasta(S, 'EN_RUTA_RETORNO', 5);
  assert.ok(Math.abs(e.mpu6050.yawDeg - 180) < 5, `yaw tras confirmar ${e.mpu6050.yawDeg}`);
  assert.strictEqual(e.alarma.activa, false);
  assert.ok(e.eventos.some((ev) => /confirmó el giro de 180°/.test(ev.texto)));
  correr(S, 2);
  assert.ok(e.robot.v > 0.2 && e.motores.direccion === 'RETORNO', 'retorna solo');
  hasta(S, 'EN_BASE');
  assert.strictEqual(e.tcrt5000.patron, '1111', 'marca de la base');
  assert.ok(Math.abs(e.robot.x - R.GEO.tcrtAdelante - R.GEO.marcaBase) < 0.03);
  assert.deepStrictEqual(vistos.filter((v, i) => vistos.indexOf(v) === i), ['EN_RUTA_IDA', 'ESPERA_REPOSICION', 'EN_RUTA_RETORNO', 'EN_BASE']);
  assert.strictEqual(e.ruta.ciclo, 1);
});

prueba('queda listo para un nuevo ciclo: gira solo en la base y repite la ida', () => {
  const S = R.crearSimulacion();
  const e = S.get();
  S.iniciarIda();
  hasta(S, 'ESPERA_REPOSICION');
  S.girarYConfirmar();
  hasta(S, 'EN_BASE');
  assert.ok(S.iniciarIda(), 'segundo ciclo');
  assert.strictEqual(e.ruta.ciclo, 2);
  assert.strictEqual(e.ruta.sub, 'alineando');
  hasta(S, 'EN_RUTA_IDA', 5);
  assert.ok(e.mpu6050.yawDeg < 5 || e.mpu6050.yawDeg > 355, `mira al destino (yaw ${e.mpu6050.yawDeg})`);
  hasta(S, 'ESPERA_REPOSICION');
  assert.strictEqual(e.tcrt5000.patron, '1111');
});

prueba('guardas: iniciar solo en la base, girar 180° solo en ESPERA_REPOSICION', () => {
  const S = R.crearSimulacion();
  const e = S.get();
  assert.strictEqual(S.girarYConfirmar(), false, 'no gira en la base');
  S.iniciarIda();
  assert.strictEqual(S.iniciarIda(), false, 'no reinicia la ida en ruta');
  assert.strictEqual(S.girarYConfirmar(), false, 'no gira en ruta');
  assert.strictEqual(e.ruta.estado, 'EN_RUTA_IDA');
  hasta(S, 'ESPERA_REPOSICION');
  assert.strictEqual(S.iniciarIda(), false, 'en espera no arranca sin girar');
  S.girarYConfirmar();
  assert.strictEqual(S.girarYConfirmar(), false, 'no se dispara dos veces');
  S.reiniciar();
  assert.strictEqual(e.ruta.estado, 'EN_BASE');
  assert.strictEqual(e.ruta.ciclo, 0);
});

prueba('la regleta sigue la línea en la ida (varios patrones, nunca 0000) y lee 1111 en la marca', () => {
  const S = R.crearSimulacion();
  const vistos = new Set();
  S.iniciarIda();
  for (let i = 0; i < 40 * 60 && S.get().ruta.estado === 'EN_RUTA_IDA'; i++) {
    S.paso(1 / 60);
    vistos.add(S.get().tcrt5000.patron);
  }
  assert.ok(!vistos.has('0000'), [...vistos].join());
  assert.ok(vistos.has('0110') && vistos.size >= 2, [...vistos].join());
  assert.ok(vistos.has('1111'));
  assert.ok(Math.abs(S.get().robot.y) < 0.012, 'sigue centrado');
});

prueba('velocidad máxima 0,46 m/s y aproximación lenta antes de la marca', () => {
  const S = R.crearSimulacion();
  assert.strictEqual(S.setConsigna(1), 0.46);
  assert.strictEqual(S.setConsigna(0), R.LIMITES.vMin);
  S.setConsigna(0.46);
  S.iniciarIda();
  let vmax = 0;
  let vCerca = 0;
  for (let i = 0; i < 40 * 60 && S.get().ruta.estado === 'EN_RUTA_IDA'; i++) {
    S.paso(1 / 60);
    const e = S.get();
    vmax = Math.max(vmax, e.robot.v);
    if (R.GEO.marcaParada - (e.robot.x + R.GEO.tcrtAdelante) < 0.1) vCerca = Math.max(vCerca, e.robot.v);
    assert.ok(e.motores.pwm <= 82, `PWM ${e.motores.pwm}`);
  }
  assert.ok(vmax <= 0.46 + 1e-9 && vmax > 0.44, `vmax ${vmax}`);
  assert.ok(vCerca <= R.LIMITES.vAproximacion + 1e-9, `aproximación ${vCerca}`);
});

prueba('HC-SR04 (5–80 cm): el obstáculo inyectado detiene el robot a < 20 cm y al quitarlo sigue', () => {
  const S = R.crearSimulacion();
  const e = S.get();
  S.iniciarIda();
  correr(S, 3);
  assert.ok(e.hcsr04.distanciaM > 3, 'pasillo libre: ve la pared del fondo');
  const o = S.inyectarObstaculo(200);
  const d0 = o.x - (e.robot.x + R.GEO.usAdelante) - R.GEO.radioObstaculo;
  assert.ok(Math.abs(d0 - 0.8) < 0.01, `se recorta a 80 cm (${d0})`);
  S.inyectarObstaculo(1);
  assert.ok(Math.abs(e.hcsr04.distanciaM - 0.05) < 0.01, 'mínimo 5 cm');
  S.inyectarObstaculo(60);
  correr(S, 6);
  assert.strictEqual(e.ruta.estado, 'EN_RUTA_IDA');
  assert.strictEqual(e.robot.v, 0, 'detenido');
  assert.strictEqual(e.hcsr04.zona, 'critica');
  assert.strictEqual(e.seguridad.estado, 'PARADA');
  assert.ok(e.motores.bloqueado && /Obstáculo/.test(e.motores.motivoBloqueo));
  const x = e.robot.x;
  correr(S, 2);
  assert.strictEqual(e.robot.x, x, 'sigue quieto');
  S.quitarObstaculo();
  correr(S, 2);
  assert.ok(e.robot.x > x + 0.2, 'reanuda la ida');
  hasta(S, 'ESPERA_REPOSICION');
});

prueba('MPU-6050: impacto detiene el robot; inclinación avisa y reduce la velocidad', () => {
  const S = R.crearSimulacion();
  const e = S.get();
  S.iniciarIda();
  correr(S, 3);
  S.eventoImu('impacto');
  correr(S, 1);
  assert.strictEqual(e.mpu6050.alerta, 'impacto');
  assert.ok(e.mpu6050.acelG > 2.5);
  assert.strictEqual(e.robot.v, 0);
  assert.strictEqual(e.seguridad.estado, 'PARADA');
  S.eventoImu('inclinacion');
  correr(S, 2);
  assert.strictEqual(e.seguridad.estado, 'PRECAUCION');
  assert.ok(e.robot.v > 0 && e.robot.v <= 0.15 + 1e-9, `v ${e.robot.v}`);
  S.eventoImu('normal');
  correr(S, 2);
  assert.ok(e.robot.v > 0.3);
});

prueba('alarma silenciable y estado central único para la página (escena, alarma y consola)', () => {
  const S = R.crearSimulacion();
  assert.strictEqual(S.silenciar(), true);
  assert.strictEqual(S.get().alarma.silenciada, true);
  S.reiniciar();
  assert.strictEqual(S.get().alarma.silenciada, true, 'reiniciar respeta el silencio');
  const html = readFileSync(join(__dirname, 'index.html'), 'utf8');
  const ui = readFileSync(join(__dirname, 'ruta_lineal_ui.js'), 'utf8');
  assert.ok(html.includes('SIMULACIÓN LOCAL · SIL · DATOS SINTÉTICOS'));
  assert.ok(!/<iframe/i.test(html));
  assert.ok(html.indexOf('ruta_lineal.js') < html.indexOf('ruta_lineal_ui.js'));
  assert.ok(/role="tablist"/.test(html) && html.includes('id="rl-tab-op"') && html.includes('id="rl-tab-sen"'));
  for (const id of ['rl-card-tcrt', 'rl-card-us', 'rl-card-mot', 'rl-card-imu', 'rl-alarma', 'rl-canvas', 'rl-log', 'rl-mute']) assert.ok(html.includes(`id="${id}"`), `#${id}`);
  for (const a of ['iniciar', 'obstaculo', 'girar', 'reiniciar']) assert.ok(html.includes(`data-accion="${a}"`), `botón ${a}`);
  assert.ok(html.includes('Girar robot 180° y confirmar'));
  assert.ok(/id="rl-in-dist" min="5" max="80"/.test(html) && /id="rl-in-vel" min="0\.1" max="0\.46"/.test(html));
  assert.strictEqual((html.match(/id="rl-s\d"/g) || []).length, 4);
  for (const est of R.ESTADOS) assert.ok(html.includes(`data-fsm="${est}"`), est);
  assert.ok(ui.includes('window.SimulationState') && ui.includes('AudioContext') && !/import |require\(/.test(ui), 'UI sin librerías');
});

prueba('integración en el portafolio: listado de prototipos y datos del proyecto', () => {
  const raiz = join(__dirname, '..', '..');
  const lista = readFileSync(join(raiz, 'prototipos', 'index.html'), 'utf8');
  assert.ok(/ordenListos = \[[^\]]*"P10"/.test(lista), 'P10 en "Listos para usar"');
  const datos = readFileSync(join(raiz, 'datos', 'proyecto.js'), 'utf8');
  assert.ok(/codigo: "P10"[^\n]*url: "prototipos\/P10-ruta-lineal\/"/.test(datos), 'P10 en datos/proyecto.js');
  assert.ok(/codigo: "P06", nombre: "Robot virtual y puente"/.test(datos), 'P06 (Firebase) se mantiene');
});

console.log(`\nP10 ruta lineal: ${ok}/${ok} pruebas pasaron`);
