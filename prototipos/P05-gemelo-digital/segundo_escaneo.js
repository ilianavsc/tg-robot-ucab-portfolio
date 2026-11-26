/* ==========================================================================
 * P05 · Gemelo Digital · SEGUNDO ESCANEO (ruta con 3 segmentos)
 * --------------------------------------------------------------------------
 * Tras el primer escaneo (muestreo base cada 2 s + paredes de referencia), el
 * gemelo muestra por primera vez el CAMINO COMPLETO con 3 puntos de control y
 * lo divide en exactamente 3 segmentos para analizar los datos por tramo:
 *    S1 · Base → PC1     S2 · PC1 → PC2     S3 · PC2 → PC3 (fin de ruta)
 * Los PC dividen el largo total en tercios iguales (misma regla que
 * aprendizaje_gemelo.js → calcularPuntosControlEquitativos: pista B = 3 / 6 / 9 m).
 *
 * Velocidad: crucero real TG_ROBOT.velocidad.cruceroMs (0,41 m/s). Se sigue
 * guardando un punto cada 2 s (PrimerEscaneo.C.MUESTRA_MS) y cada punto queda
 * etiquetado con su segmento. Sin torretas ni obstáculos simulados.
 * En la app móvil el mapa usa los mismos 3 PC pero en un solo color.
 *
 * Sin DOM: window.SegundoEscaneo en la página, require() en Node.
 * ========================================================================== */
(function (raiz, fabrica) {
  var M = fabrica();
  if (typeof module === "object" && module.exports) module.exports = M;
  else raiz.SegundoEscaneo = M;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var SEGMENTOS = Object.freeze([
    Object.freeze({ id: "S1", desde: "Base", hasta: "PC1", color: "cian" }),
    Object.freeze({ id: "S2", desde: "PC1", hasta: "PC2", color: "ambar" }),
    Object.freeze({ id: "S3", desde: "PC2", hasta: "PC3", color: "violeta" })
  ]);
  var FASES = Object.freeze({
    1: Object.freeze({ id: 1, nombre: "Escaneo 1 · Muestreo base" }),
    2: Object.freeze({ id: 2, nombre: "Escaneo 2 · Ruta con 3 segmentos" })
  });

  function r2(x) { return Math.round(x * 100) / 100; }

  /* 3 PC equitativos: PC1 = L/3, PC2 = 2L/3, PC3 = L */
  function puntosControl(largoM) {
    return [1, 2, 3].map(function (k) { return { id: "PC" + k, posicionM: r2(largoM * k / 3) }; });
  }

  /* Exactamente 3 segmentos contiguos que cubren [0, L] */
  function segmentos(largoM) {
    var pc = puntosControl(largoM), cortes = [0, pc[0].posicionM, pc[1].posicionM, pc[2].posicionM];
    return SEGMENTOS.map(function (s, i) {
      return { id: s.id, nombre: s.desde + " → " + s.hasta, desde: s.desde, hasta: s.hasta, color: s.color, desdeM: cortes[i], hastaM: cortes[i + 1] };
    });
  }

  /* Segmento de una distancia s sobre la ruta (los cortes pertenecen al tramo siguiente; el final, a S3) */
  function segmentoDe(sM, largoM) {
    var pc = puntosControl(largoM);
    if (sM < pc[0].posicionM) return "S1";
    if (sM < pc[1].posicionM) return "S2";
    return "S3";
  }

  /* Etiqueta las muestras que aún no tienen segmento; devuelve cuántas etiquetó */
  function etiquetar(muestras, largoM) {
    var n = 0;
    muestras.forEach(function (m) { if (!m.seg) { m.seg = segmentoDe(m.s_m, largoM); n++; } });
    return n;
  }

  function resumenPorSegmento(muestras) {
    var c = { S1: 0, S2: 0, S3: 0 };
    muestras.forEach(function (m) { if (c[m.seg] !== undefined) c[m.seg]++; });
    return c;
  }

  /* Configuración de cada fase a partir de TG_ROBOT y del primer escaneo (sin valores inventados) */
  function configFase(fase, TG, PE) {
    var v = PE.velocidades(TG);
    if (fase === 2) return { fase: 2, nombre: FASES[2].nombre, velMs: v.cruceroMs, fuente: "TG_ROBOT.velocidad.cruceroMs", muestraMs: PE.C.MUESTRA_MS, segmentos: true, ensenanza: false };
    return { fase: 1, nombre: FASES[1].nombre, velMs: v.lentaMs, fuente: "PWM lento de P04 × TG_ROBOT.velocidad.pwm100Ms", muestraMs: PE.C.MUESTRA_MS, segmentos: false, ensenanza: true };
  }

  /* Estado del selector: cada fase conserva su propio registro */
  function crearEstado(PE) { return { fase: 1, registros: { 1: PE.crear(), 2: PE.crear() } }; }
  function cambiarFase(est, fase) {
    if (fase !== 1 && fase !== 2) return false;
    if (est.fase === fase) return false;
    est.fase = fase;
    return true;
  }
  function registroActual(est) { return est.registros[est.fase]; }

  return {
    SEGMENTOS: SEGMENTOS, FASES: FASES,
    puntosControl: puntosControl, segmentos: segmentos, segmentoDe: segmentoDe, etiquetar: etiquetar,
    resumenPorSegmento: resumenPorSegmento, configFase: configFase,
    crearEstado: crearEstado, cambiarFase: cambiarFase, registroActual: registroActual
  };
});
