/* ==========================================================================
   TG ROBOT UCAB · PARÁMETROS REALES ÚNICOS DEL ROBOT (fuente única)
   --------------------------------------------------------------------------
   Los consumen P02 (inspector + circuito 3D), P03 (radar), P05 (gemelo) y
   P06 (ruta lineal). Coinciden con el firmware (firmware/robot_integrado.ino)
   y con el Simulador 1 (P04). En el navegador queda en window.TG_ROBOT;
   en Node se obtiene con require(). Sin DOM ni dependencias.
   ========================================================================== */
(function (raiz, fabrica) {
  var P = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = P;
  if (raiz) raiz.TG_ROBOT = P;
})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function congelar(o) {
    Object.keys(o).forEach(function (k) {
      if (o[k] && typeof o[k] === 'object') congelar(o[k]);
    });
    return Object.freeze(o);
  }
  return congelar({
    version: '1.0.0',
    velocidad: {
      maxMs: 0.46, // velocidad máxima en recta: PWM 0,8 × 0,57 m/s (Speed 200 + L298N a 11,1 V)
      cruceroMs: 0.41, // crucero del seguidor de línea (Simulador 1)
      pwm100Ms: 0.57, // m/s al 100 % de PWM (modelo de P02)
      giroDifPwm: 0.45 // diferencia de PWM al girar (manejo del Simulador 1)
    },
    tcrt5000: {
      canales: 4, // regleta S1…S4
      separacionMm: 18,
      posicionesMm: [-27, -9, 9, 27], // S1…S4 respecto al centro, de izquierda (−) a derecha (+)
      cintaMm: 19 // cinta negra
    },
    hcsr04: {
      minCm: 5, // rango del slider de inyección de las consolas
      maxCm: 80,
      paradaCm: 20, // < 20 cm: parada (zona crítica)
      precaucionCm: 50, // 20–50 cm: precaución
      alcanceCm: 400, // más allá no hay eco
      conoGrados: 15 // semiapertura del haz
    },
    mpu6050: {
      inclinacionDeg: 20, // alerta de inclinación
      vuelcoDeg: 30, // parada por inclinación peligrosa
      impactoG: 2.0, // aceleración que se considera impacto
      anguloMaxDeg: 45 // rango de los sliders de pitch/roll
    }
  });
});
