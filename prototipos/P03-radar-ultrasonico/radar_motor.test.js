/* Pruebas unitarias de P03 (Radar ultrasónico):
 * - Estado inicial completamente desactivado (encendido=false, v=0, publicaciones off).
 * - Transición ⚡ Encender -> dinámica local y publicaciones activas.
 * - Transición ⏹ Detener -> apagado real (v=0, sin acelerar a crucero, tiempo/lecturas congelados y publicaciones off).
 * Uso: node prototipos/P03-radar-ultrasonico/radar_motor.test.js */
"use strict";

var assert = require("node:assert");
var fs = require("node:fs");
var path = require("node:path");
var M = require("./radar_motor.js");

var ok = 0;
function prueba(nombre, fn) {
  fn();
  ok++;
  console.log("  OK   " + nombre);
}

prueba("estado inicial apagado: encendido=false, v=0, tiempo=0 y publicaciones desactivadas", function () {
  var publicados = [];
  var motor = M.crearMotor({ onPublicar: function (msg) { publicados.push(msg); } });
  assert.strictEqual(motor.encendido, false);
  assert.strictEqual(motor.publicacionesActivas, false);
  assert.strictEqual(motor.velActual, 0);
  assert.strictEqual(motor.tSimMs, 0);

  // Avanzar 3 segundos estando apagado NO debe acelerar ni publicar ni avanzar el tiempo
  var f0 = motor.dist.frente;
  var a0 = motor.dist.atras;
  for (var i = 0; i < 60; i++) {
    var r = motor.avanzar(0.05);
    assert.strictEqual(r.activo, false);
    assert.strictEqual(r.publicado, false);
  }
  assert.strictEqual(motor.velActual, 0, "no debe acelerar a crucero estando apagado");
  assert.strictEqual(motor.tSimMs, 0, "el tiempo debe mantenerse congelado");
  assert.strictEqual(motor.dist.frente, f0);
  assert.strictEqual(motor.dist.atras, a0);
  assert.strictEqual(publicados.length, 0, "no debe publicar MQTT estando apagado");
});

prueba("transición ⚡ Encender activa dinámica local, lecturas y publicaciones periódicas", function () {
  var publicados = [];
  var motor = M.crearMotor({ onPublicar: function (msg) { publicados.push(msg); } });
  motor.encender();
  assert.strictEqual(motor.encendido, true);
  assert.strictEqual(motor.publicacionesActivas, true);

  for (var i = 0; i < 40; i++) motor.avanzar(0.05); // 2,0 s
  assert.ok(motor.velActual > 0.35 && motor.velActual <= M.C.VEL_MAX, "velocidad crucero esperada, obtuvo " + motor.velActual);
  assert.ok(motor.tSimMs >= 1999, "el tiempo debe avanzar al encender");
  assert.ok(publicados.length >= 3, "debe publicar telemetría cada 500 ms, publicó " + publicados.length);
  var ult = publicados[publicados.length - 1];
  assert.strictEqual(ult.frente_ok, true);
  assert.strictEqual(ult.atras_ok, true);
  assert.ok(ult.velocidad_ms > 0.3);
});

prueba("obstáculo < 20 cm frena a 0 m/s mientras sigue encendido y reanuda al retirarlo", function () {
  var motor = M.crearMotor();
  motor.encender();
  for (var i = 0; i < 30; i++) motor.avanzar(0.05);
  assert.ok(motor.velActual > 0.3);

  motor.colocarObstaculo(0, 15);
  for (var j = 0; j < 40; j++) motor.avanzar(0.05);
  assert.strictEqual(motor.dist.frente, 15);
  assert.ok(motor.velActual < 0.01, "debe frenar por obstáculo a 15 cm, v=" + motor.velActual);

  motor.devolverObstaculo();
  for (var k = 0; k < 30; k++) motor.avanzar(0.05);
  assert.ok(motor.velActual > 0.3, "debe recuperar crucero al retirar obstáculo");
});

prueba("transición ⏹ Detener realiza apagado real: v=0, tiempo/lecturas congelados y publicaciones off", function () {
  var publicados = [];
  var motor = M.crearMotor({ onPublicar: function (msg) { publicados.push(msg); } });
  motor.encender();
  for (var i = 0; i < 30; i++) motor.avanzar(0.05); // 1,5 s
  assert.ok(motor.velActual > 0.3);
  var pubsAntes = publicados.length;
  assert.ok(pubsAntes >= 2);

  motor.detener();
  assert.strictEqual(motor.encendido, false);
  assert.strictEqual(motor.publicacionesActivas, false);
  assert.strictEqual(motor.velActual, 0, "al detener la velocidad cae a 0 de inmediato");
  var tCong = motor.tSimMs;
  var fCong = motor.dist.frente;
  var aCong = motor.dist.atras;

  for (var j = 0; j < 60; j++) motor.avanzar(0.05); // 3,0 s detenido
  assert.strictEqual(motor.velActual, 0, "no debe volver a acelerar estando detenido");
  assert.strictEqual(motor.tSimMs, tCong, "tiempo congelado tras detener");
  assert.strictEqual(motor.dist.frente, fCong, "lectura frontal congelada");
  assert.strictEqual(motor.dist.atras, aCong, "lectura trasera congelada");
  assert.strictEqual(publicados.length, pubsAntes, "publicaciones MQTT detenidas");

  // Reanudar con ⚡ Encender vuelve a moverse y publicar
  motor.encender();
  for (var k = 0; k < 30; k++) motor.avanzar(0.05);
  assert.ok(motor.velActual > 0.3);
  assert.ok(motor.tSimMs > tCong + 1000);
  assert.ok(publicados.length > pubsAntes);
});

prueba("P03 index.html usa radar_motor.js, inicia en 0.00 m/s y expone ⚡ Encender / ⏹ Detener con aria-pressed", function () {
  var html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  assert.ok(html.includes('src="radar_motor.js"'), "index.html carga radar_motor.js");
  assert.ok(/id="btn-toggle"[^>]*aria-pressed="false"/.test(html), "botón maestro inicia con aria-pressed=false");
  assert.ok(html.includes("⚡ Encender") && html.includes("⏹ Detener"));
  assert.ok(html.includes('id="velo-val">0.00<small>m/s</small>'), "velocímetro inicia en 0.00 m/s");
});

console.log("\nP03 Radar ultrasónico: " + ok + "/" + ok + " pruebas pasaron");
