/* P03 · Radar ultrasónico · motor de dinámica local y control Encender/Detener.
 * Sin dependencias de DOM: compartido por index.html y radar_motor.test.js. */
(function (raiz, fabrica) {
  if (typeof module === "object" && module.exports) module.exports = fabrica();
  else raiz.RadarMotorP03 = fabrica();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var C = {
    VEL_MAX: 0.46,
    VEL_CRUCERO: 0.41,
    VEL_VAR_CRUCERO: 0.035,
    DIST_MIN: 2,
    DIST_MAX: 200,
    DIST_LIBRE_FRENTE: 160,
    DIST_LIBRE_ATRAS: 150,
    LIMITE_PELIGRO: 20,
    LIMITE_CERCA: 50,
    ANG_DETECCION: 35,
    PERIODO_MS: 500
  };

  function zona(cm) {
    return cm <= C.LIMITE_PELIGRO ? "rojo" : (cm <= C.LIMITE_CERCA ? "ambar" : "verde");
  }

  function crearMotor(opts) {
    var cfg = opts || {};
    var onPublicar = typeof cfg.onPublicar === "function" ? cfg.onPublicar : null;

    var M = {
      encendido: false,
      publicacionesActivas: false,
      velActual: 0,
      tSimMs: 0,
      tDeteccionFrente: 0,
      tPubAcumMs: 0,
      dist: { frente: C.DIST_LIBRE_FRENTE, atras: C.DIST_LIBRE_ATRAS },
      obstaculoActivo: false,
      obstaculo: { xCm: 0, yCm: 75 },
      prevDet: { frente: false, atras: false }
    };

    function deteccionObstaculo() {
      if (!M.obstaculoActivo) return { frente: false, atras: false, cm: 0 };
      var cm = Math.round(Math.max(C.DIST_MIN, Math.min(C.DIST_MAX, Math.hypot(M.obstaculo.xCm, M.obstaculo.yCm))));
      var angFrente = Math.abs(Math.atan2(M.obstaculo.xCm, M.obstaculo.yCm) * 180 / Math.PI);
      var angAtras = Math.abs(Math.atan2(M.obstaculo.xCm, -M.obstaculo.yCm) * 180 / Math.PI);
      return {
        frente: M.obstaculo.yCm >= 0 && angFrente <= C.ANG_DETECCION,
        atras: M.obstaculo.yCm < 0 && angAtras <= C.ANG_DETECCION,
        cm: cm
      };
    }

    function velocidadCrucero() {
      if (!M.encendido) return 0;
      var s = M.tSimMs / 1000;
      return C.VEL_CRUCERO + C.VEL_VAR_CRUCERO * Math.sin(s * 0.55);
    }

    function calcularVelocidadObjetivo(cm, detFrente, velBase) {
      if (!M.encendido) return 0;
      if (!detFrente && cm > C.LIMITE_CERCA) return velBase;
      var fDist = cm <= C.LIMITE_PELIGRO
        ? 0.0
        : (cm <= C.LIMITE_CERCA
          ? (cm - C.LIMITE_PELIGRO) / (C.LIMITE_CERCA - C.LIMITE_PELIGRO)
          : 0.75 + 0.25 * Math.min(1, (cm - C.LIMITE_CERCA) / 100));
      var tUmbral = cm <= C.LIMITE_PELIGRO ? 0.65 : (cm <= C.LIMITE_CERCA ? 2.2 : 3.5);
      var fTiempo = Math.max(0, 1 - (M.tDeteccionFrente / tUmbral));
      return velBase * fDist * fTiempo;
    }

    function sincronizarSensoresConObstaculo() {
      var det = deteccionObstaculo();
      if (det.frente) {
        M.dist.frente = det.cm;
      } else if (M.prevDet.frente && !M.encendido) {
        M.dist.frente = C.DIST_LIBRE_FRENTE;
      }
      if (det.atras) {
        M.dist.atras = det.cm;
      } else if (M.prevDet.atras && !M.encendido) {
        M.dist.atras = C.DIST_LIBRE_ATRAS;
      }
      M.prevDet.frente = det.frente;
      M.prevDet.atras = det.atras;
    }

    function mensaje() {
      return {
        frente_cm: M.dist.frente,
        atras_cm: M.dist.atras,
        velocidad_ms: Number(M.velActual.toFixed(2)),
        frente_ok: true,
        atras_ok: true,
        t: Math.round(M.tSimMs)
      };
    }

    function encender() {
      M.encendido = true;
      M.publicacionesActivas = true;
      M.tPubAcumMs = 0;
    }

    function detener() {
      M.encendido = false;
      M.publicacionesActivas = false;
      M.velActual = 0;
      M.tDeteccionFrente = 0;
      M.tPubAcumMs = 0;
    }

    function colocarObstaculo(xCm, yCm) {
      M.obstaculoActivo = true;
      M.obstaculo.xCm = xCm;
      M.obstaculo.yCm = yCm;
      if (M.encendido) sincronizarSensoresConObstaculo();
    }

    function devolverObstaculo() {
      M.obstaculoActivo = false;
      M.prevDet.frente = false;
      M.prevDet.atras = false;
      if (M.encendido) {
        M.dist.frente = C.DIST_LIBRE_FRENTE;
        M.dist.atras = C.DIST_LIBRE_ATRAS;
      }
    }

    function avanzar(dtSeg) {
      if (!M.encendido) {
        M.velActual = 0;
        return { activo: false, publicado: false };
      }
      var dt = Math.min(Math.max(Number(dtSeg) || 0, 0), 0.1);
      M.tSimMs += dt * 1000;
      var s = M.tSimMs / 1000;

      var det = deteccionObstaculo();
      var osc = function (base, amp, vel, fase) {
        return Math.round(Math.max(C.DIST_MIN, Math.min(C.DIST_MAX, base + amp * Math.sin(s * vel + fase))));
      };
      if (det.frente) M.dist.frente = det.cm;
      else M.dist.frente = osc(150, 35, 0.45, 1.2);
      if (det.atras) M.dist.atras = det.cm;
      else M.dist.atras = osc(130, 40, 0.6, 0);
      M.prevDet.frente = det.frente;
      M.prevDet.atras = det.atras;

      if (det.frente || M.dist.frente <= C.LIMITE_CERCA) {
        M.tDeteccionFrente = Math.min(4.0, M.tDeteccionFrente + dt);
      } else {
        M.tDeteccionFrente = Math.max(0, M.tDeteccionFrente - dt * 2.2);
      }

      var velBase = velocidadCrucero();
      var objetivo = calcularVelocidadObjetivo(M.dist.frente, det.frente, velBase);
      if (Math.abs(M.velActual - objetivo) > 0.0005) {
        var tasa = objetivo < M.velActual ? 0.55 : 0.42;
        var paso = tasa * dt;
        if (Math.abs(objetivo - M.velActual) <= paso) M.velActual = objetivo;
        else M.velActual += (objetivo > M.velActual ? paso : -paso);
        M.velActual = Math.max(0, Math.min(C.VEL_MAX, M.velActual));
      }

      var publicado = false;
      M.tPubAcumMs += dt * 1000;
      while (M.tPubAcumMs >= C.PERIODO_MS) {
        M.tPubAcumMs -= C.PERIODO_MS;
        publicado = true;
        if (onPublicar && M.publicacionesActivas) onPublicar(mensaje());
      }
      return { activo: true, publicado: publicado };
    }

    M.deteccionObstaculo = deteccionObstaculo;
    M.velocidadCrucero = velocidadCrucero;
    M.calcularVelocidadObjetivo = calcularVelocidadObjetivo;
    M.sincronizarSensoresConObstaculo = sincronizarSensoresConObstaculo;
    M.colocarObstaculo = colocarObstaculo;
    M.devolverObstaculo = devolverObstaculo;
    M.mensaje = mensaje;
    M.encender = encender;
    M.detener = detener;
    M.avanzar = avanzar;
    return M;
  }

  return { C: C, zona: zona, crearMotor: crearMotor };
});
