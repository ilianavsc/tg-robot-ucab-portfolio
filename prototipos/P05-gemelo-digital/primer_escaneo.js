/* ==========================================================================
 * P05 · Gemelo Digital · PRIMER ESCANEO DE RUTA (viaje inicial de muestreo)
 * --------------------------------------------------------------------------
 * El robot recorre la ruta UNA vez, despacio y siguiendo la cinta, y el gemelo
 * guarda un punto discreto cada 2 s (2000 ms de tiempo de simulación) con la
 * lectura instantánea de todos los sensores en ese instante.
 *
 * Velocidades reales de referencia (sin valores inventados):
 *  · PWM lento 0,40 = mínimo del ajuste «Base» del PD en P04
 *    (prototipos/P04-simulador-1-esp32/codigo/main.js, ['base', 'Base', 0.4, 1, …]).
 *  · PWM crucero 0,80 = PD.base del firmware en P04 (codigo/sim.js).
 *  · m/s por PWM: TG_ROBOT.velocidad.pwm100Ms (0,57 m/s al 100 %), con techo
 *    TG_ROBOT.velocidad.maxMs (0,46 m/s) y crucero TG_ROBOT.velocidad.cruceroMs (0,41 m/s).
 *  ⇒ escaneo lento = 0,40 × 0,57 = 0,228 m/s.
 *
 * Escaneo ADMINISTRADO en pista despejada: no se simulan obstáculos. Las distancias
 * de los dos HC-SR04P de cada punto se guardan como PERFIL DE PAREDES DE REFERENCIA
 * (línea base del entorno fijo) para evitar falsos positivos en la operación normal;
 * los recorridos sucesivos sobre la misma ruta refinan ese perfil.
 *
 * Sin DOM: se usa en la página (window.PrimerEscaneo) y en Node (require).
 * No decide el movimiento: el núcleo teach-and-repeat y la planta
 * (simulador_movimiento.js) mueven al robot; aquí solo se registra.
 * ========================================================================== */
(function (raiz, fabrica) {
  var M = fabrica();
  if (typeof module === "object" && module.exports) module.exports = M;
  else raiz.PrimerEscaneo = M;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var C = Object.freeze({
    PWM_LENTO: 0.40,   /* P04 · mínimo del ajuste «Base» del PD (codigo/main.js) */
    PWM_CRUCERO: 0.80, /* P04 · PD.base del firmware (codigo/sim.js) */
    MUESTRA_MS: 2000   /* un punto discreto cada 2 s */
  });

  function r(x, d) { var k = Math.pow(10, d); return Math.round(x * k) / k; }

  /* Velocidades de referencia a partir de TG_ROBOT (assets/js/parametros_robot.js) */
  function velocidades(TG) {
    var v = TG.velocidad;
    return {
      lentaMs: r(Math.min(v.maxMs, C.PWM_LENTO * v.pwm100Ms), 3),
      cruceroMs: v.cruceroMs,
      maxMs: v.maxMs,
      pwm100Ms: v.pwm100Ms,
      pwmLento: C.PWM_LENTO,
      pwmCrucero: C.PWM_CRUCERO
    };
  }

  function crear() {
    return { muestras: [], activo: false, completo: false, motivo: null, t0: 0, proximaMs: 0, tFinS: 0, pista: null };
  }

  function reiniciar(reg) {
    reg.muestras = []; reg.activo = false; reg.completo = false; reg.motivo = null;
    reg.t0 = 0; reg.proximaMs = 0; reg.tFinS = 0; reg.pista = null;
    return reg;
  }

  /* Tiempo del viaje en ms enteros (los pasos de la planta son de 20 ms: 2000 es múltiplo exacto) */
  function tViajeMs(reg, sim) { return Math.round((sim.t - reg.t0) * 1000); }

  /* Lectura instantánea de los sensores en este instante */
  function muestra(reg, sim, S, tMs, final) {
    var pose = S.poseMundo(sim);
    var sens = sim.sensores || S.sensoresActuales(sim);
    var f = S.frenteActualCm(sim), a = S.atrasActualCm(sim);
    var omega = (sim.vIzq - sim.vDer) * S.P.V_MAX_MS / S.P.ANCHO_EJES_M * 180 / Math.PI;
    return {
      n: reg.muestras.length + 1,
      t_s: r(tMs / 1000, 2),
      s_m: r(sim.s, 3),
      x: r(pose.x, 3), y: r(pose.y, 3), angulo: r(pose.angulo, 1),
      tcrt: sens.bin.slice(), tcrt_n: sens.n.map(function (v) { return r(v, 2); }),
      frente_cm: f > 0 ? r(f, 1) : null, atras_cm: r(a, 1),
      /* línea base: lo que "ven" los HC-SR04P en pista despejada = paredes / entorno fijo */
      paredes_ref: { frente_cm: f > 0 ? r(f, 1) : null, atras_cm: r(a, 1), linea_base: true },
      yaw_deg: r(S.yawMedido(sim), 1), omega_dps: r(omega, 1),
      v_ms: r(Math.abs(sim.vLineal), 3),
      pwm_izq: r(sim.vIzq, 2), pwm_der: r(sim.vDer, 2),
      final: Boolean(final)
    };
  }

  /* Arranca el registro: guarda el punto de salida (t = 0) */
  function iniciar(reg, sim, S) {
    reiniciar(reg);
    reg.activo = true;
    reg.t0 = sim.t;
    reg.pista = sim.trazado ? sim.trazado.id : null;
    reg.muestras.push(muestra(reg, sim, S, 0, false));
    reg.proximaMs = C.MUESTRA_MS;
    return reg;
  }

  /* Llamar tras cada paso de la planta: agrega un punto cada 2000 ms. Devuelve cuántos agregó. */
  function tick(reg, sim, S) {
    if (!reg.activo) return 0;
    var tMs = tViajeMs(reg, sim), n = 0;
    while (tMs >= reg.proximaMs) {
      reg.muestras.push(muestra(reg, sim, S, reg.proximaMs, false));
      reg.proximaMs += C.MUESTRA_MS;
      n++;
    }
    return n;
  }

  /* Cierra el viaje: con llegada guarda el punto final (si no coincide con el último de 2 s) */
  function finalizar(reg, sim, S, motivo) {
    if (!reg.activo) return reg;
    var tMs = tViajeMs(reg, sim), ult = reg.muestras[reg.muestras.length - 1];
    if (!ult || Math.round(ult.t_s * 1000) !== tMs) reg.muestras.push(muestra(reg, sim, S, tMs, true));
    else ult.final = true;
    reg.activo = false;
    reg.completo = !motivo;
    reg.motivo = motivo || null;
    reg.tFinS = r(tMs / 1000, 2);
    return reg;
  }

  /* Perfil de paredes de referencia (línea base) a lo largo de la ruta: s → distancias de los HC-SR04P */
  function perfilParedes(reg) {
    return reg.muestras.map(function (m) { return { s_m: m.s_m, frente_cm: m.paredes_ref.frente_cm, atras_cm: m.paredes_ref.atras_cm }; });
  }

  /* Segundos que faltan para el próximo punto */
  function faltaS(reg, sim) {
    if (!reg.activo) return null;
    return Math.max(0, (reg.proximaMs - tViajeMs(reg, sim)) / 1000);
  }

  return { C: C, velocidades: velocidades, crear: crear, reiniciar: reiniciar, iniciar: iniciar, tick: tick, finalizar: finalizar, faltaS: faltaS, muestra: muestra, perfilParedes: perfilParedes };
});
