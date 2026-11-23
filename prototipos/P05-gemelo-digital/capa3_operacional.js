/* P05 · Gemelo Digital · Capa 3 Operacional (Máquina de Rutas + Máquina de Pedidos).
 *
 * Implementa fielmente specs/state-machine.md como capa ortogonal encima de:
 *   - Capa 1 (5 estados): specs/navegacion/teach_and_repeat.js
 *   - Capa 2 (14 estados): prototipos/P05-gemelo-digital/aprendizaje_gemelo.js
 *
 * Reglas clave:
 *   - Ruta Cerrada: parada opcional; sin parada opera en bucle sin aceptar pedidos;
 *     tras N = 3 usos completados habilita reescaneo para configurar parada.
 *   - Ruta Lineal: parada obligatoria desde el primer escaneo; doble escaneo
 *     ida + retorno con ESPERA_REPOSICION manual (prohibido auto-retorno por timeout).
 *   - MPU-6050 (impacto, inclinacion, atascamiento) tiene prioridad sobre movimiento
 *     y fuerza ERROR_SEGURIDAD (bloquea ordenes en ESPERA_REPOSICION y ERROR_SEGURIDAD).
 *   - CANCELACION_SEGURA frena sin borrar rutaAprendida ni reiniciar el escaneo.
 *   - Reloj SIL 1x / 2x / 4x acelera solo el reloj de simulacion, nunca la fisica.
 */
(function (raiz, fabrica) {
  if (typeof module === "object" && module.exports) module.exports = fabrica();
  else raiz.Capa3Operacional = fabrica();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var ESTADOS_RUTA = [
    "SIN_RUTA",
    "ESCANEO_IDA",
    "ESPERA_REPOSICION",
    "ESCANEO_RETORNO",
    "OPERACION_BUCLE",
    "REESCANEO_PARADA",
    "OPERACION_CON_PARADA",
    "PAUSA_OBSTACULO",
    "ERROR_SEGURIDAD",
    "RECUPERACION_MANUAL"
  ];

  var ESTADOS_PEDIDO = [
    "SIN_PEDIDO",
    "SOLICITADO",
    "EN_TRANSITO",
    "CANCELACION_SEGURA",
    "ENTREGADO"
  ];

  var ALERTAS_MPU = ["impacto", "inclinacion", "atascamiento"];
  var ESCALAS_RELOJ = [1, 2, 4];

  var C = {
    VEL_LENTA_MS: 0.16,
    VEL_NORMAL_MS: 0.41,
    USOS_PARA_PARADA: 3,
    LARGO_CANONICO_M: 9.0,
    RAMPA_DECEL_MS2: 0.55
  };

  function r2(x) { return Math.round(x * 100) / 100; }

  function crear(opciones) {
    opciones = opciones || {};
    var tipo = opciones.tipoRuta === "lineal" ? "lineal" : "cerrada";
    var largo = Number(opciones.largoM) > 0 ? Number(opciones.largoM) : C.LARGO_CANONICO_M;
    var paradaNombre = typeof opciones.paradaNombre === "string" ? opciones.paradaNombre.trim() : "";
    var paradaOk = Boolean(opciones.paradaConfigurada && paradaNombre.length > 0);
    return {
      tipoRuta: tipo,
      largoM: largo,
      paradaConfigurada: paradaOk,
      paradaNombre: paradaNombre,
      estadoRuta: "SIN_RUTA",
      estadoPrevioPausa: null,
      estadoPedido: "SIN_PEDIDO",
      pedidoActivo: null,
      usosCompletados: 0,
      rutaAprendida: null,
      alertaMpu: null,
      motivoSeguridad: null,
      escalaReloj: 1,
      velEscaneoMs: C.VEL_NORMAL_MS,
      tiempoSimS: 0,
      tiempoRealS: 0,
      progresoPasadaM: 0,
      historialPedidos: []
    };
  }

  function setTipoRuta(op, tipo) {
    var nuevo = tipo === "lineal" ? "lineal" : "cerrada";
    op.tipoRuta = nuevo;
    op.estadoRuta = "SIN_RUTA";
    op.estadoPrevioPausa = null;
    op.estadoPedido = "SIN_PEDIDO";
    op.pedidoActivo = null;
    op.usosCompletados = 0;
    op.rutaAprendida = null;
    op.alertaMpu = null;
    op.motivoSeguridad = null;
    op.tiempoSimS = 0;
    op.tiempoRealS = 0;
    op.progresoPasadaM = 0;
    if (nuevo === "cerrada") {
      op.paradaConfigurada = Boolean(op.paradaNombre);
    }
    return op.tipoRuta;
  }

  function setLargoM(op, largoM) {
    if (Number(largoM) > 0) op.largoM = Number(largoM);
    return op.largoM;
  }

  function configurarParada(op, nombre) {
    var limpio = typeof nombre === "string" ? nombre.trim() : "";
    op.paradaNombre = limpio;
    op.paradaConfigurada = limpio.length > 0;
    return op.paradaConfigurada;
  }

  function setEscalaReloj(op, factor) {
    var f = Number(factor);
    op.escalaReloj = ESCALAS_RELOJ.indexOf(f) >= 0 ? f : 1;
    return op.escalaReloj;
  }

  function setVelEscaneo(op, velMs) {
    var v = Number(velMs);
    op.velEscaneoMs = v === C.VEL_LENTA_MS ? C.VEL_LENTA_MS : C.VEL_NORMAL_MS;
    return op.velEscaneoMs;
  }

  /* Invariante de seguridad: bloquea movimiento en ESPERA_REPOSICION, ERROR_SEGURIDAD y RECUPERACION_MANUAL. */
  function puedeMover(op) {
    return (
      op.estadoRuta !== "ESPERA_REPOSICION" &&
      op.estadoRuta !== "ERROR_SEGURIDAD" &&
      op.estadoRuta !== "RECUPERACION_MANUAL"
    );
  }

  function puedeReescanearParada(op) {
    return (
      op.tipoRuta === "cerrada" &&
      !op.paradaConfigurada &&
      op.estadoRuta === "OPERACION_BUCLE" &&
      op.usosCompletados >= C.USOS_PARA_PARADA
    );
  }

  function puedeSolicitarPedido(op) {
    return (
      op.estadoRuta === "OPERACION_CON_PARADA" &&
      op.paradaConfigurada &&
      op.estadoPedido === "SIN_PEDIDO"
    );
  }

  function duracionPasadaS(op) {
    var v = op.velEscaneoMs > 0 ? op.velEscaneoMs : C.VEL_NORMAL_MS;
    return r2(op.largoM / v);
  }

  function duracionEstimadaEscaneoS(op) {
    var pasada = duracionPasadaS(op);
    return op.tipoRuta === "lineal" ? r2(pasada * 2) : pasada;
  }

  function tiempoRestanteEstimadoS(op) {
    var v = op.velEscaneoMs > 0 ? op.velEscaneoMs : C.VEL_NORMAL_MS;
    if (op.estadoRuta === "ESCANEO_IDA") {
      var restIda = Math.max(0, op.largoM - op.progresoPasadaM) / v;
      return op.tipoRuta === "lineal" ? r2(restIda + op.largoM / v) : r2(restIda);
    }
    if (op.estadoRuta === "ESPERA_REPOSICION") {
      return r2(op.largoM / v);
    }
    if (op.estadoRuta === "ESCANEO_RETORNO" || op.estadoRuta === "REESCANEO_PARADA") {
      return r2(Math.max(0, op.largoM - op.progresoPasadaM) / v);
    }
    return 0;
  }

  function iniciarEscaneo(op) {
    if (!puedeMover(op)) {
      return { ok: false, motivo: "movimiento_bloqueado_" + op.estadoRuta.toLowerCase() };
    }
    if (op.tipoRuta === "lineal" && !op.paradaConfigurada) {
      return { ok: false, motivo: "parada_obligatoria_en_ruta_lineal" };
    }
    op.estadoRuta = "ESCANEO_IDA";
    op.alertaMpu = null;
    op.motivoSeguridad = null;
    op.tiempoSimS = 0;
    op.tiempoRealS = 0;
    op.progresoPasadaM = 0;
    return { ok: true, estadoRuta: op.estadoRuta };
  }

  /* Avanza reloj de simulacion segun escalaReloj (1x/2x/4x) sin tocar la fisica.
   * En ESPERA_REPOSICION nunca existe auto-retorno por timeout. */
  function avanzarReloj(op, dtRealS) {
    var dtR = Math.max(0, Number(dtRealS) || 0);
    if (dtR <= 0) return { avanzado: false, estadoRuta: op.estadoRuta };

    if (
      op.estadoRuta === "ESPERA_REPOSICION" ||
      op.estadoRuta === "ERROR_SEGURIDAD" ||
      op.estadoRuta === "RECUPERACION_MANUAL" ||
      op.estadoRuta === "PAUSA_OBSTACULO" ||
      op.estadoRuta === "SIN_RUTA"
    ) {
      /* En ESPERA_REPOSICION el tiempo real puede correr, pero jamas cambia de estado solo. */
      if (op.estadoRuta === "ESPERA_REPOSICION") op.tiempoRealS = r2(op.tiempoRealS + dtR);
      return { avanzado: false, estadoRuta: op.estadoRuta };
    }

    var dtSim = dtR * op.escalaReloj;
    op.tiempoRealS = r2(op.tiempoRealS + dtR);
    op.tiempoSimS = r2(op.tiempoSimS + dtSim);

    if (
      op.estadoRuta === "ESCANEO_IDA" ||
      op.estadoRuta === "ESCANEO_RETORNO" ||
      op.estadoRuta === "REESCANEO_PARADA"
    ) {
      op.progresoPasadaM = Math.min(op.largoM, r2(op.progresoPasadaM + op.velEscaneoMs * dtSim));
    }
    return { avanzado: true, dtSimS: dtSim, estadoRuta: op.estadoRuta };
  }

  function completarPasadaIda(op) {
    if (op.estadoRuta !== "ESCANEO_IDA") return { ok: false, motivo: "estado_invalido" };
    op.progresoPasadaM = op.largoM;
    if (op.tipoRuta === "lineal") {
      op.estadoRuta = "ESPERA_REPOSICION";
      return { ok: true, estadoRuta: op.estadoRuta };
    }
    op.rutaAprendida = {
      tipoRuta: "cerrada",
      largoM: op.largoM,
      paradaConfigurada: op.paradaConfigurada,
      paradaNombre: op.paradaNombre,
      dobleEscaneo: false
    };
    op.estadoRuta = op.paradaConfigurada ? "OPERACION_CON_PARADA" : "OPERACION_BUCLE";
    return { ok: true, estadoRuta: op.estadoRuta };
  }

  function confirmarReposicionamiento(op) {
    if (op.estadoRuta !== "ESPERA_REPOSICION") {
      return { ok: false, motivo: "no_esta_en_espera_reposicion" };
    }
    op.estadoRuta = "ESCANEO_RETORNO";
    op.progresoPasadaM = 0;
    return { ok: true, estadoRuta: op.estadoRuta };
  }

  function completarPasadaRetorno(op) {
    if (op.estadoRuta !== "ESCANEO_RETORNO") {
      return { ok: false, motivo: "estado_invalido" };
    }
    op.progresoPasadaM = op.largoM;
    op.rutaAprendida = {
      tipoRuta: "lineal",
      largoM: op.largoM,
      paradaConfigurada: true,
      paradaNombre: op.paradaNombre,
      dobleEscaneo: true
    };
    op.estadoRuta = "OPERACION_CON_PARADA";
    return { ok: true, estadoRuta: op.estadoRuta };
  }

  /* Solo incrementa usosCompletados cuando el recorrido termina exitosamente. */
  function registrarUsoCompletado(op, exitoso) {
    if (op.estadoRuta !== "OPERACION_BUCLE" && op.estadoRuta !== "OPERACION_CON_PARADA") {
      return { ok: false, usosCompletados: op.usosCompletados };
    }
    if (exitoso === true) {
      op.usosCompletados++;
    }
    return {
      ok: Boolean(exitoso),
      usosCompletados: op.usosCompletados,
      reescaneoParadaHabilitado: puedeReescanearParada(op)
    };
  }

  function iniciarReescaneoParada(op, nombreParada) {
    if (!puedeReescanearParada(op)) {
      return { ok: false, motivo: "requiere_3_usos_completados" };
    }
    if (!configurarParada(op, nombreParada)) {
      return { ok: false, motivo: "parada_requerida" };
    }
    op.estadoRuta = "REESCANEO_PARADA";
    op.progresoPasadaM = 0;
    op.tiempoSimS = 0;
    op.tiempoRealS = 0;
    return { ok: true, estadoRuta: op.estadoRuta };
  }

  function completarReescaneoParada(op) {
    if (op.estadoRuta !== "REESCANEO_PARADA") {
      return { ok: false, motivo: "estado_invalido" };
    }
    op.progresoPasadaM = op.largoM;
    op.paradaConfigurada = true;
    op.rutaAprendida = {
      tipoRuta: "cerrada",
      largoM: op.largoM,
      paradaConfigurada: true,
      paradaNombre: op.paradaNombre,
      dobleEscaneo: false
    };
    op.estadoRuta = "OPERACION_CON_PARADA";
    return { ok: true, estadoRuta: op.estadoRuta };
  }

  function detectarObstaculo(op) {
    if (op.estadoRuta !== "OPERACION_BUCLE" && op.estadoRuta !== "OPERACION_CON_PARADA") {
      return false;
    }
    op.estadoPrevioPausa = op.estadoRuta;
    op.estadoRuta = "PAUSA_OBSTACULO";
    return true;
  }

  function despejarObstaculo(op) {
    if (op.estadoRuta !== "PAUSA_OBSTACULO") return false;
    op.estadoRuta = op.estadoPrevioPausa || (op.paradaConfigurada ? "OPERACION_CON_PARADA" : "OPERACION_BUCLE");
    op.estadoPrevioPausa = null;
    return true;
  }

  /* Prioridad absoluta del MPU-6050 (impacto, inclinacion, atascamiento) o freno remoto. */
  function dispararAlertaMpu6050(op, tipo, detalle) {
    var valido = ALERTAS_MPU.indexOf(tipo) >= 0 ? tipo : "impacto";
    op.alertaMpu = {
      tipo: valido,
      detalle: detalle || ("MPU-6050: " + valido)
    };
    op.motivoSeguridad = "mpu6050_" + valido;
    op.estadoPrevioPausa = null;
    op.estadoRuta = "ERROR_SEGURIDAD";
    if (op.estadoPedido === "EN_TRANSITO") {
      op.estadoPedido = "CANCELACION_SEGURA";
    }
    return { ok: true, estadoRuta: op.estadoRuta, estadoPedido: op.estadoPedido, alerta: op.alertaMpu };
  }

  function iniciarRecuperacionManual(op) {
    if (op.estadoRuta !== "ERROR_SEGURIDAD") return false;
    op.estadoRuta = "RECUPERACION_MANUAL";
    return true;
  }

  function completarRecuperacionManual(op, resetearRuta) {
    if (op.estadoRuta !== "RECUPERACION_MANUAL") return false;
    op.alertaMpu = null;
    op.motivoSeguridad = null;
    if (op.estadoPedido === "CANCELACION_SEGURA") {
      op.estadoPedido = "SIN_PEDIDO";
      op.pedidoActivo = null;
    }
    if (resetearRuta) {
      op.rutaAprendida = null;
      op.usosCompletados = 0;
      op.estadoRuta = "SIN_RUTA";
      return true;
    }
    if (op.rutaAprendida) {
      op.estadoRuta = op.paradaConfigurada ? "OPERACION_CON_PARADA" : "OPERACION_BUCLE";
    } else {
      op.estadoRuta = "SIN_RUTA";
    }
    return true;
  }

  /* ---------------- Maquina de Pedidos (Capa 3B · ortogonal) ---------------- */

  function solicitarPedido(op, datos) {
    if (!puedeSolicitarPedido(op)) {
      return { ok: false, motivo: "ruta_sin_parada_o_no_operativa" };
    }
    datos = datos || {};
    op.pedidoActivo = {
      id: "PED-" + String(op.historialPedidos.length + 1).padStart(3, "0"),
      componente: datos.componente || "Kit componentes",
      destino: datos.destino || op.paradaNombre || "Parada 1"
    };
    op.estadoPedido = "SOLICITADO";
    return { ok: true, estadoPedido: op.estadoPedido, pedido: op.pedidoActivo };
  }

  function despacharPedido(op) {
    if (op.estadoPedido !== "SOLICITADO" || !puedeMover(op)) {
      return { ok: false, motivo: "no_puede_despachar" };
    }
    op.estadoPedido = "EN_TRANSITO";
    return { ok: true, estadoPedido: op.estadoPedido };
  }

  /* CANCELACION_SEGURA: frenado controlado SIN borrar rutaAprendida ni reiniciar escaneo. */
  function cancelarPedidoSeguro(op) {
    if (op.estadoPedido === "SOLICITADO") {
      op.historialPedidos.push({ pedido: op.pedidoActivo, resultado: "cancelado_antes_salir" });
      op.pedidoActivo = null;
      op.estadoPedido = "SIN_PEDIDO";
      return { ok: true, estadoPedido: op.estadoPedido, rutaConservada: Boolean(op.rutaAprendida) };
    }
    if (op.estadoPedido === "EN_TRANSITO") {
      op.estadoPedido = "CANCELACION_SEGURA";
      return { ok: true, estadoPedido: op.estadoPedido, rutaConservada: Boolean(op.rutaAprendida) };
    }
    return { ok: false, motivo: "sin_pedido_cancelable" };
  }

  function confirmarDetencionCancelacion(op) {
    if (op.estadoPedido !== "CANCELACION_SEGURA") return false;
    op.historialPedidos.push({ pedido: op.pedidoActivo, resultado: "cancelacion_segura" });
    op.pedidoActivo = null;
    op.estadoPedido = "SIN_PEDIDO";
    return true;
  }

  function completarEntregaPedido(op) {
    if (op.estadoPedido !== "EN_TRANSITO") return false;
    op.estadoPedido = "ENTREGADO";
    return true;
  }

  function cerrarEntregaPedido(op) {
    if (op.estadoPedido !== "ENTREGADO") return false;
    op.historialPedidos.push({ pedido: op.pedidoActivo, resultado: "entregado" });
    op.pedidoActivo = null;
    op.estadoPedido = "SIN_PEDIDO";
    return true;
  }

  function ordenarMovimiento(op, comando) {
    if (!puedeMover(op)) {
      return { ok: false, bloqueado: true, motivo: "bloqueado_en_" + op.estadoRuta, comando: comando };
    }
    return { ok: true, bloqueado: false, comando: comando };
  }

  return {
    ESTADOS_RUTA: ESTADOS_RUTA,
    ESTADOS_PEDIDO: ESTADOS_PEDIDO,
    ALERTAS_MPU: ALERTAS_MPU,
    ESCALAS_RELOJ: ESCALAS_RELOJ,
    C: C,
    crear: crear,
    setTipoRuta: setTipoRuta,
    setLargoM: setLargoM,
    configurarParada: configurarParada,
    setEscalaReloj: setEscalaReloj,
    setVelEscaneo: setVelEscaneo,
    puedeMover: puedeMover,
    puedeReescanearParada: puedeReescanearParada,
    puedeSolicitarPedido: puedeSolicitarPedido,
    duracionPasadaS: duracionPasadaS,
    duracionEstimadaEscaneoS: duracionEstimadaEscaneoS,
    tiempoRestanteEstimadoS: tiempoRestanteEstimadoS,
    iniciarEscaneo: iniciarEscaneo,
    avanzarReloj: avanzarReloj,
    completarPasadaIda: completarPasadaIda,
    confirmarReposicionamiento: confirmarReposicionamiento,
    completarPasadaRetorno: completarPasadaRetorno,
    registrarUsoCompletado: registrarUsoCompletado,
    iniciarReescaneoParada: iniciarReescaneoParada,
    completarReescaneoParada: completarReescaneoParada,
    detectarObstaculo: detectarObstaculo,
    despejarObstaculo: despejarObstaculo,
    dispararAlertaMpu6050: dispararAlertaMpu6050,
    iniciarRecuperacionManual: iniciarRecuperacionManual,
    completarRecuperacionManual: completarRecuperacionManual,
    solicitarPedido: solicitarPedido,
    despacharPedido: despacharPedido,
    cancelarPedidoSeguro: cancelarPedidoSeguro,
    confirmarDetencionCancelacion: confirmarDetencionCancelacion,
    completarEntregaPedido: completarEntregaPedido,
    cerrarEntregaPedido: cerrarEntregaPedido,
    ordenarMovimiento: ordenarMovimiento
  };
});
