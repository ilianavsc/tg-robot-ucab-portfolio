/* ==========================================================================
   TG ROBOT UCAB · COLORES DE LOS <canvas> DESDE tokens.css
   --------------------------------------------------------------------------
   TGTokens.paleta({clave: ['--tg-dark-accent', '#00F2FE'], …}) lee cada
   variable con getComputedStyle(document.documentElement) y usa el respaldo
   si la variable no existe (página sin tokens.css, Node, error). Así el
   código de dibujo no lleva colores hexadecimales sueltos.
   ========================================================================== */
(function (raiz) {
  'use strict';
  var estilos = null;
  function leer(nombre) {
    try {
      if (!estilos) estilos = raiz.getComputedStyle(raiz.document.documentElement);
      return String(estilos.getPropertyValue(nombre) || '').trim();
    } catch (e) {
      return '';
    }
  }
  function color(nombre, respaldo) {
    return leer(nombre) || respaldo;
  }
  function paleta(definicion) {
    var o = {};
    Object.keys(definicion).forEach(function (k) {
      o[k] = color(definicion[k][0], definicion[k][1]);
    });
    return o;
  }
  raiz.TGTokens = {
    color: color,
    paleta: paleta,
    // vuelve a leer las variables (por ejemplo, si cambia el tema)
    refrescar: function () { estilos = null; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
