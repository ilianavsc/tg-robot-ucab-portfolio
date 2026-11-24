// Puente MQTT sobre WebSockets para P04 (Simulador 1 + ESP32).
// Protocolo, brokers y tópicos 100 % compatibles con app/ (MqttService) y P01.
// Sin dependencia de three.js: se puede probar directamente con Node.

export const BROKERS = [
  {nombre: 'HiveMQ', host: 'broker.hivemq.com', puerto: 8884, url: 'wss://broker.hivemq.com:8884/mqtt'},
  {nombre: 'EMQX', host: 'broker.emqx.io', puerto: 8084, url: 'wss://broker.emqx.io:8084/mqtt'},
  {nombre: 'Mosquitto', host: 'test.mosquitto.org', puerto: 8081, url: 'wss://test.mosquitto.org:8081/mqtt'},
];

export const SCHEMA_VERSION = '2.0.0';

export const TOPICOS = {
  estado: 'ucab-tg-sf/robot/estado',
  ultrasonido: 'ucab-tg-sf/robot/ultrasonido',
  ordenes: 'ucab-tg-sf/robot/ordenes',
  ack: 'ucab-tg-sf/robot/ordenes/ack',
  alertas: 'ucab-tg-sf/robot/alertas',
  conexion: 'ucab-tg-sf/robot/conexion',
  rutas_estado: 'ucab-tg-sf/robot/rutas/estado',
  rutas_escaneo: 'ucab-tg-sf/robot/rutas/escaneo',
  rutas_reposicionamiento: 'ucab-tg-sf/robot/rutas/reposicionamiento',
  pedidos_solicitud: 'ucab-tg-sf/robot/pedidos/solicitud',
  pedidos_estado: 'ucab-tg-sf/robot/pedidos/estado',
  pedidos_cancelacion: 'ucab-tg-sf/robot/pedidos/cancelacion',
  sensores_inercial: 'ucab-tg-sf/robot/sensores/inercial',
};

export const ESTADOS_RUTA = [
  'SIN_RUTA',
  'ESCANEO_IDA',
  'ESPERA_REPOSICION',
  'ESCANEO_RETORNO',
  'OPERACION_BUCLE',
  'REESCANEO_PARADA',
  'OPERACION_CON_PARADA',
  'PAUSA_OBSTACULO',
  'ERROR_SEGURIDAD',
  'RECUPERACION_MANUAL',
];

export const ESTADOS_PEDIDO = [
  'SIN_PEDIDO',
  'SOLICITADO',
  'EN_TRANSITO',
  'CANCELACION_SEGURA',
  'ENTREGADO',
];

export const ALERTAS_MPU6050 = ['impacto', 'inclinacion', 'atascamiento'];

export const MOVIMIENTO_BLOQUEADO_EN = [
  'ESPERA_REPOSICION',
  'ERROR_SEGURIDAD',
  'RECUPERACION_MANUAL',
];

export const USOS_PARA_PARADA = 3;

export const TIMEOUT_MANUAL_S = 5.0;
const INTERVALO_PUB_S = 1.5;
const INTENTOS_POR_BROKER = 2;
const BAT_MIN_V = 9.9;
const BAT_MAX_V = 12.6;

const MQTT_CDNS = [
  'https://unpkg.com/mqtt/dist/mqtt.min.js',
  'https://cdn.jsdelivr.net/npm/mqtt/dist/mqtt.min.js',
];

let promesaMqtt = null;
export function cargarLibreriaMqtt() {
  if (typeof window !== 'undefined' && window.mqtt) return Promise.resolve(window.mqtt);
  if (promesaMqtt) return promesaMqtt;
  if (typeof document === 'undefined') return Promise.reject(new Error('Sin DOM para cargar mqtt.js'));
  promesaMqtt = new Promise((resolve, reject) => {
    let idx = 0;
    const intentar = () => {
      if (window.mqtt) return resolve(window.mqtt);
      if (idx >= MQTT_CDNS.length) {
        promesaMqtt = null;
        return reject(new Error('No se pudo cargar mqtt.js'));
      }
      const sc = document.createElement('script');
      sc.src = MQTT_CDNS[idx++];
      sc.async = true;
      sc.onload = () => (window.mqtt ? resolve(window.mqtt) : intentar());
      sc.onerror = () => {
        sc.remove();
        intentar();
      };
      document.head.appendChild(sc);
    };
    intentar();
  });
  return promesaMqtt;
}

function bateriaPct(vbat) {
  const pct = Math.round(((vbat - BAT_MIN_V) / (BAT_MAX_V - BAT_MIN_V)) * 100);
  return Math.max(0, Math.min(100, pct));
}

function normalizarComando(raw) {
  const c = String(raw || '').trim().toLowerCase();
  if (c === 'adelante' || c === 'avanzar' || c === 'arriba') return 'adelante';
  if (c === 'atras' || c === 'atrás' || c === 'retroceder' || c === 'abajo') return 'atras';
  if (c === 'izquierda' || c === 'izq') return 'izquierda';
  if (c === 'derecha' || c === 'der') return 'derecha';
  if (c === 'frenar' || c === 'detener' || c === 'stop' || c === 'parada' || c === 'pausa' || c === 'emergencia') return 'frenar';
  if (c === 'auto' || c === 'autonomo' || c === 'autónomo' || c === 'inicio' || c === 'iniciar' || c === 'reanudar') return 'auto';
  return null;
}

export function crearPuenteMqtt({
  sim,
  alEstado = () => {},
  alModo = (m) => sim.setModo(m),
  alTx = () => {},
  cargarMqtt = cargarLibreriaMqtt,
  crearCliente = null,
} = {}) {
  let cliente = null;
  let estado = 'desconectado'; // desconectado | conectando | conectado
  let activo = false;
  let idxBroker = 0;
  let intentos = 0;
  let timerTimeout = null;
  let timerReintento = null;
  let contadorEstado = 0;
  let contadorAlertas = 0;
  let ordenesRecibidas = 0;
  let ultimoAck = null;
  let tPub = 0;
  let parada = 'ninguna';

  const remoto = {activo: false, f: 0, t: 0, freno: false, restanteS: 0, ultimoCmd: null};
  const mensajesVistos = new Set();
  const registroTrazabilidad = [];

  const capa3 = {
    tipo_ruta: 'cerrada',
    estado_ruta: 'SIN_RUTA',
    parada_configurada: false,
    usos_completados: 0,
    ruta_aprendida: false,
    request_id: null,
    estado_pedido: 'SIN_PEDIDO',
    ruta_preservada: false,
    alerta_mpu: null,
    pitch: 0.0,
    roll: 0.0,
    acel_g: 1.0,
  };

  const movimientoBloqueado = () => MOVIMIENTO_BLOQUEADO_EN.includes(capa3.estado_ruta);

  const puedeReescanearParada = () =>
    capa3.tipo_ruta === 'cerrada' &&
    !capa3.parada_configurada &&
    capa3.estado_ruta === 'OPERACION_BUCLE' &&
    capa3.usos_completados >= USOS_PARA_PARADA;

  let vueltasPrevias = sim?.lectura ? sim.lectura().vueltas : 0;
  let salidasPrevias = sim?.lectura ? sim.lectura().salidas : 0;

  const ahoraMs = () => Date.now();

  const validarYDeduplicarCapa3 = (topic, parsed) => {
    if (!parsed || typeof parsed !== 'object') return {ok: false, duplicado: false};
    const msgId = parsed.message_id ? String(parsed.message_id) : null;
    if (msgId) {
      if (mensajesVistos.has(msgId)) return {ok: false, duplicado: true, message_id: msgId};
      mensajesVistos.add(msgId);
      if (mensajesVistos.size > 500) {
        const primero = mensajesVistos.values().next().value;
        mensajesVistos.delete(primero);
      }
    }
    registroTrazabilidad.push({
      topic,
      message_id: msgId,
      request_id: parsed.request_id ? String(parsed.request_id) : null,
      sequence: Number.isFinite(Number(parsed.sequence)) ? Number(parsed.sequence) : null,
      schema_version: parsed.schema_version ? String(parsed.schema_version) : null,
      timestamp: Number.isFinite(Number(parsed.timestamp)) ? Number(parsed.timestamp) : ahoraMs(),
    });
    if (registroTrazabilidad.length > 200) registroTrazabilidad.shift();
    return {ok: true, duplicado: false, message_id: msgId};
  };

  const construirRutasEstado = () => ({
    tipo_ruta: capa3.tipo_ruta,
    estado_ruta: capa3.estado_ruta,
    parada_configurada: capa3.parada_configurada,
    usos_completados: capa3.usos_completados,
    movimiento_bloqueado: movimientoBloqueado(),
    timestamp: ahoraMs(),
    schema_version: SCHEMA_VERSION,
  });

  const construirPedidosEstado = () => ({
    request_id: capa3.request_id,
    estado_pedido: capa3.estado_pedido,
    ruta_preservada: capa3.ruta_preservada,
    timestamp: ahoraMs(),
    schema_version: SCHEMA_VERSION,
  });

  const construirSensoresInercial = () => ({
    pitch: Number(capa3.pitch.toFixed(2)),
    roll: Number(capa3.roll.toFixed(2)),
    acel_g: Number(capa3.acel_g.toFixed(2)),
    alerta: capa3.alerta_mpu,
    timestamp: ahoraMs(),
    schema_version: SCHEMA_VERSION,
  });

  const publicarRutasEstado = () => {
    const payload = construirRutasEstado();
    if (cliente && estado === 'conectado') {
      try {
        cliente.publish(TOPICOS.rutas_estado, JSON.stringify(payload), {qos: 1, retain: true});
        alTx();
      } catch {
        /* ignora fallo puntual */
      }
    }
    return payload;
  };

  const publicarPedidosEstado = () => {
    const payload = construirPedidosEstado();
    if (cliente && estado === 'conectado') {
      try {
        cliente.publish(TOPICOS.pedidos_estado, JSON.stringify(payload), {qos: 1, retain: true});
        alTx();
      } catch {
        /* ignora fallo puntual */
      }
    }
    return payload;
  };

  const publicarSensoresInercial = () => {
    const payload = construirSensoresInercial();
    if (cliente && estado === 'conectado') {
      try {
        cliente.publish(TOPICOS.sensores_inercial, JSON.stringify(payload), {qos: 0, retain: false});
        alTx();
      } catch {
        /* ignora fallo puntual */
      }
    }
    return payload;
  };

  const brokerActual = () => BROKERS[idxBroker];

  const notificar = (detalle = '') => {
    alEstado({estado, broker: brokerActual(), ordenes: ordenesRecibidas, ultimoAck, detalle});
  };

  const limpiarTimers = () => {
    if (timerTimeout) {
      clearTimeout(timerTimeout);
      timerTimeout = null;
    }
    if (timerReintento) {
      clearTimeout(timerReintento);
      timerReintento = null;
    }
  };

  const limpiarCliente = () => {
    limpiarTimers();
    if (!cliente) return;
    try {
      cliente.removeAllListeners?.();
      cliente.end?.(true);
    } catch {
      /* ignora cierre previo */
    }
    cliente = null;
  };

  const construirEstado = () => {
    const L = sim.lectura();
    contadorEstado += 1;
    return {
      n: contadorEstado,
      estado: sim.modo === 'auto' ? 'autonomo' : 'manual',
      bateria: bateriaPct(sim.vbat),
      bateria_v: Number(sim.vbat.toFixed(2)),
      ordenes: ordenesRecibidas,
      linea_mm: Number(L.eMedido.toFixed(1)),
      v_izq: Number(sim.vel.izq.toFixed(2)),
      v_der: Number(sim.vel.der.toFixed(2)),
      parada,
      progreso_m: Number(L.progresoM.toFixed(2)),
      largo_m: Number(L.largo.toFixed(2)),
      sensores: L.bin.slice(),
      t: Math.round(sim.t * 1000),
    };
  };

  const construirUltrasonido = () => ({
    frente_cm: 150.0,
    atras_cm: 160.0,
    frente_ok: true,
    atras_ok: true,
    t: Math.round(sim.t * 1000),
  });

  const publicarTelemetria = () => {
    if (!cliente || estado !== 'conectado' || sim.encendido === false) return null;
    const est = construirEstado();
    const us = construirUltrasonido();
    const imu = construirSensoresInercial();
    try {
      cliente.publish(TOPICOS.estado, JSON.stringify(est), {qos: 0});
      cliente.publish(TOPICOS.ultrasonido, JSON.stringify(us), {qos: 0});
      cliente.publish(TOPICOS.sensores_inercial, JSON.stringify(imu), {qos: 0, retain: false});
      alTx();
    } catch {
      /* ignora fallo puntual de envío */
    }
    return {estado: est, ultrasonido: us, inercial: imu};
  };

  const aplicarRemotoASim = () => {
    if (!remoto.activo) return;
    sim.entrada.f = remoto.f;
    sim.entrada.t = remoto.t;
    sim.entrada.freno = remoto.freno;
  };

  const recibirOrden = (rawPayload) => {
    let id = 'sin-id';
    let cmdRaw = '';
    const txt = typeof rawPayload === 'string' ? rawPayload : String(rawPayload ?? '');
    try {
      const parsed = JSON.parse(txt);
      if (parsed && typeof parsed === 'object') {
        if (parsed.id !== undefined) id = String(parsed.id);
        cmdRaw = parsed.cmd ?? parsed.comando ?? '';
      } else {
        cmdRaw = txt;
      }
    } catch {
      cmdRaw = txt;
    }

    const cmd = normalizarComando(cmdRaw);
    if (!cmd) return {ok: false, cmd: null, id, ack: null};

    // Bloqueo fail-safe de movimiento en ESPERA_REPOSICION, ERROR_SEGURIDAD y RECUPERACION_MANUAL
    if (cmd !== 'frenar' && movimientoBloqueado()) {
      notificar(`orden ${cmd} bloqueada (${capa3.estado_ruta})`);
      return {ok: false, bloqueado: true, motivo: capa3.estado_ruta, cmd, id, ack: null};
    }

    ordenesRecibidas += 1;
    remoto.ultimoCmd = cmd;

    if (cmd === 'auto') {
      remoto.activo = false;
      remoto.f = 0;
      remoto.t = 0;
      remoto.freno = false;
      remoto.restanteS = 0;
      parada = 'ninguna';
      sim.entrada.f = 0;
      sim.entrada.t = 0;
      sim.entrada.freno = false;
      alModo('auto', 'Control remoto (App): seguidor automático');
    } else if (cmd === 'frenar') {
      remoto.activo = true;
      remoto.f = 0;
      remoto.t = 0;
      remoto.freno = true;
      remoto.restanteS = 0;
      parada = 'ninguna';
      alModo('manual', 'Control remoto (App): robot detenido');
      aplicarRemotoASim();
    } else {
      remoto.activo = true;
      remoto.f = cmd === 'adelante' ? 1 : (cmd === 'atras' ? -1 : 0);
      remoto.t = cmd === 'izquierda' ? 1 : (cmd === 'derecha' ? -1 : 0);
      remoto.freno = false;
      remoto.restanteS = TIMEOUT_MANUAL_S;
      parada = 'ninguna';
      alModo('manual', `Control remoto (App): ${cmd}`);
      aplicarRemotoASim();
    }

    const ack = {id, recibidas: ordenesRecibidas, t: Math.round(sim.t * 1000)};
    ultimoAck = ack;
    if (cliente && estado === 'conectado') {
      try {
        cliente.publish(TOPICOS.ack, JSON.stringify(ack), {qos: 1});
        alTx();
      } catch {
        /* ignora fallo puntual */
      }
      publicarTelemetria();
    }
    notificar(`orden ${cmd}`);
    return {ok: true, cmd, id, ack};
  };

  const frenarPorSeguridad = (motivoParada) => {
    remoto.activo = true;
    remoto.f = 0;
    remoto.t = 0;
    remoto.freno = true;
    remoto.restanteS = 0;
    parada = motivoParada;
    alModo('manual', `Seguridad Capa 3: ${motivoParada}`);
    aplicarRemotoASim();
  };

  const recibirRutaEscaneo = (rawPayload) => {
    let parsed;
    try {
      parsed = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
    } catch {
      return {ok: false, motivo: 'json_invalido'};
    }
    const tr = validarYDeduplicarCapa3(TOPICOS.rutas_escaneo, parsed);
    if (!tr.ok) return {ok: false, duplicado: tr.duplicado, motivo: tr.duplicado ? 'duplicado' : 'payload_invalido'};

    const accion = String(parsed.accion || '').trim().toLowerCase();
    if (accion === 'iniciar' || accion === 'iniciar_escaneo') {
      if (movimientoBloqueado()) return {ok: false, motivo: 'movimiento_bloqueado'};
      const tipo = parsed.tipo_ruta === 'lineal' ? 'lineal' : (parsed.tipo_ruta === 'cerrada' ? 'cerrada' : capa3.tipo_ruta);
      const paradaOk = typeof parsed.parada_configurada === 'boolean' ? parsed.parada_configurada : capa3.parada_configurada;
      if (tipo === 'lineal' && !paradaOk) {
        return {ok: false, motivo: 'parada_obligatoria_en_lineal'};
      }
      capa3.tipo_ruta = tipo;
      capa3.parada_configurada = paradaOk;
      capa3.usos_completados = 0;
      if (sim?.lectura) {
        const L0 = sim.lectura();
        vueltasPrevias = L0.vueltas;
        salidasPrevias = L0.salidas;
      }
      capa3.estado_ruta = parsed.fase === 'retorno' ? 'ESCANEO_RETORNO' : 'ESCANEO_IDA';
      const pub = publicarRutasEstado();
      return {ok: true, estado_ruta: capa3.estado_ruta, publicado: pub};
    }
    if (accion === 'reescanear_parada') {
      if (!puedeReescanearParada()) {
        return {ok: false, motivo: 'requiere_3_usos'};
      }
      capa3.parada_configurada = true;
      capa3.estado_ruta = 'REESCANEO_PARADA';
      const pub = publicarRutasEstado();
      notificar('reescaneo para parada habilitado');
      return {ok: true, estado_ruta: capa3.estado_ruta, publicado: pub};
    }
    if (accion === 'finalizar') {
      if (typeof parsed.parada_configurada === 'boolean') {
        capa3.parada_configurada = parsed.parada_configurada;
      }
      if (capa3.estado_ruta === 'ESCANEO_IDA' && capa3.tipo_ruta === 'lineal') {
        capa3.estado_ruta = 'ESPERA_REPOSICION';
        frenarPorSeguridad('espera_reposicion');
      } else if (capa3.estado_ruta === 'ESCANEO_IDA' || capa3.estado_ruta === 'ESCANEO_RETORNO' || capa3.estado_ruta === 'REESCANEO_PARADA') {
        capa3.ruta_aprendida = true;
        capa3.estado_ruta = capa3.parada_configurada ? 'OPERACION_CON_PARADA' : 'OPERACION_BUCLE';
      }
      const pub = publicarRutasEstado();
      notificar(`escaneo finalizado (${capa3.estado_ruta})`);
      return {ok: true, estado_ruta: capa3.estado_ruta, publicado: pub};
    }
    if (accion === 'recuperacion_manual') {
      if (capa3.estado_ruta !== 'ERROR_SEGURIDAD') return {ok: false, motivo: 'no_en_error_seguridad'};
      capa3.alerta_mpu = null;
      capa3.pitch = 0.0;
      capa3.roll = 0.0;
      capa3.acel_g = 1.0;
      capa3.estado_ruta = 'RECUPERACION_MANUAL';
      const pub = publicarRutasEstado();
      publicarSensoresInercial();
      notificar('recuperación manual');
      return {ok: true, estado_ruta: capa3.estado_ruta, publicado: pub};
    }
    if (accion === 'reanudar' || accion === 'reanudar_operacion') {
      if (capa3.estado_ruta !== 'RECUPERACION_MANUAL') return {ok: false, motivo: 'no_en_recuperacion_manual'};
      capa3.alerta_mpu = null;
      capa3.pitch = 0.0;
      capa3.roll = 0.0;
      capa3.acel_g = 1.0;
      parada = 'ninguna';
      remoto.activo = false;
      remoto.f = 0;
      remoto.t = 0;
      remoto.freno = false;
      remoto.restanteS = 0;
      sim.entrada.f = 0;
      sim.entrada.t = 0;
      sim.entrada.freno = false;
      if (capa3.estado_pedido === 'CANCELACION_SEGURA') {
        capa3.estado_pedido = 'SIN_PEDIDO';
        capa3.request_id = null;
      }
      capa3.estado_ruta = capa3.ruta_aprendida
        ? (capa3.parada_configurada ? 'OPERACION_CON_PARADA' : 'OPERACION_BUCLE')
        : 'SIN_RUTA';
      alModo('auto', 'Recuperación manual completada · robot operativo');
      const pub = publicarRutasEstado();
      publicarSensoresInercial();
      notificar('recuperación completada');
      return {ok: true, estado_ruta: capa3.estado_ruta, publicado: pub};
    }
    return {ok: false, motivo: 'accion_desconocida'};
  };

  const recibirReposicionamiento = (rawPayload) => {
    let parsed;
    try {
      parsed = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
    } catch {
      return {ok: false, motivo: 'json_invalido'};
    }
    const tr = validarYDeduplicarCapa3(TOPICOS.rutas_reposicionamiento, parsed);
    if (!tr.ok) return {ok: false, duplicado: tr.duplicado, motivo: tr.duplicado ? 'duplicado' : 'payload_invalido'};
    if (capa3.estado_ruta !== 'ESPERA_REPOSICION') {
      return {ok: false, motivo: 'no_en_espera_reposicion'};
    }
    if (parsed.confirmado === false) {
      return {ok: false, motivo: 'no_confirmado'};
    }
    capa3.estado_ruta = 'ESCANEO_RETORNO';
    parada = 'ninguna';
    const pub = publicarRutasEstado();
    return {ok: true, estado_ruta: capa3.estado_ruta, publicado: pub};
  };

  const recibirPedidoSolicitud = (rawPayload) => {
    let parsed;
    try {
      parsed = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
    } catch {
      return {ok: false, motivo: 'json_invalido'};
    }
    const tr = validarYDeduplicarCapa3(TOPICOS.pedidos_solicitud, parsed);
    if (!tr.ok) return {ok: false, duplicado: tr.duplicado, motivo: tr.duplicado ? 'duplicado' : 'payload_invalido'};
    if (capa3.estado_ruta !== 'OPERACION_CON_PARADA' || !capa3.parada_configurada) {
      return {ok: false, motivo: 'ruta_no_habilitada_para_pedidos'};
    }
    capa3.request_id = parsed.request_id ? String(parsed.request_id) : `req-${Date.now()}`;
    capa3.estado_pedido = 'EN_TRANSITO';
    capa3.ruta_preservada = true;
    const pub = publicarPedidosEstado();
    return {ok: true, estado_pedido: capa3.estado_pedido, publicado: pub};
  };

  const recibirPedidoCancelacion = (rawPayload) => {
    let parsed;
    try {
      parsed = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
    } catch {
      return {ok: false, motivo: 'json_invalido'};
    }
    const tr = validarYDeduplicarCapa3(TOPICOS.pedidos_cancelacion, parsed);
    if (!tr.ok) return {ok: false, duplicado: tr.duplicado, motivo: tr.duplicado ? 'duplicado' : 'payload_invalido'};
    if (capa3.estado_pedido !== 'SOLICITADO' && capa3.estado_pedido !== 'EN_TRANSITO') {
      return {ok: false, motivo: 'sin_pedido_cancelable'};
    }
    if (parsed.request_id) capa3.request_id = String(parsed.request_id);
    capa3.estado_pedido = 'CANCELACION_SEGURA';
    capa3.ruta_preservada = true;
    frenarPorSeguridad('cancelacion_segura');
    const pub = publicarPedidosEstado();
    return {ok: true, estado_pedido: capa3.estado_pedido, ruta_preservada: true, publicado: pub};
  };

  const dispararAlertaInercial = (tipo, valor = null) => {
    if (!ALERTAS_MPU6050.includes(tipo)) return {ok: false, motivo: 'alerta_invalida'};
    contadorAlertas += 1;
    capa3.alerta_mpu = tipo;
    capa3.estado_ruta = 'ERROR_SEGURIDAD';
    if (tipo === 'impacto') {
      capa3.acel_g = valor ?? 2.85;
      capa3.pitch = 10.0;
      capa3.roll = 6.0;
    } else if (tipo === 'inclinacion') {
      capa3.pitch = valor ?? 32.0;
      capa3.roll = -24.0;
      capa3.acel_g = 1.15;
    } else if (tipo === 'atascamiento') {
      capa3.acel_g = valor ?? 0.05;
    }
    frenarPorSeguridad(tipo);
    const pedidoCambio = capa3.estado_pedido === 'EN_TRANSITO';
    if (pedidoCambio) {
      capa3.estado_pedido = 'CANCELACION_SEGURA';
      capa3.ruta_preservada = true;
    }

    const alertaPayload = {
      n: contadorAlertas,
      tipo,
      alerta: tipo,
      valor: valor ?? (tipo === 'impacto' ? capa3.acel_g : capa3.pitch),
      t: Math.round(sim.t * 1000),
      timestamp: ahoraMs(),
      schema_version: SCHEMA_VERSION,
    };
    if (cliente && estado === 'conectado') {
      try {
        cliente.publish(TOPICOS.alertas, JSON.stringify(alertaPayload), {qos: 2, retain: false});
        alTx();
      } catch {
        /* ignora fallo puntual */
      }
    }
    const imuPayload = publicarSensoresInercial();
    const rutaPayload = publicarRutasEstado();
    const pedidoPayload = pedidoCambio ? publicarPedidosEstado() : null;
    notificar(`alerta inercial ${tipo}`);
    return {ok: true, alerta: alertaPayload, inercial: imuPayload, ruta: rutaPayload, pedido: pedidoPayload};
  };

  const registrarFallo = (motivo) => {
    if (!activo) return;
    limpiarCliente();
    intentos += 1;
    if (intentos >= INTENTOS_POR_BROKER) {
      intentos = 0;
      idxBroker = (idxBroker + 1) % BROKERS.length;
    }
    estado = 'conectando';
    notificar(motivo);
    timerReintento = setTimeout(() => {
      if (activo) conectarBrokerActual();
    }, 1500);
  };

  const conectarBrokerActual = async () => {
    if (!activo) return;
    limpiarCliente();
    estado = 'conectando';
    const b = brokerActual();
    notificar(`Conectando a ${b.nombre}…`);

    let lib;
    if (crearCliente) {
      lib = {connect: crearCliente};
    } else {
      try {
        lib = await cargarMqtt();
      } catch (e) {
        registrarFallo(e && e.message ? e.message : 'Sin mqtt.js');
        return;
      }
    }
    if (!activo) return;

    const clientId = `ucab-p04-esp32-${Math.random().toString(16).slice(2, 10)}`;
    try {
      cliente = lib.connect(b.url, {
        clientId,
        keepalive: 20,
        connectTimeout: 5000,
        reconnectPeriod: 0,
        will: {topic: TOPICOS.conexion, payload: 'desconectado', qos: 1, retain: true},
      });
    } catch (e) {
      registrarFallo(e && e.message ? e.message : 'Error WebSocket');
      return;
    }

    timerTimeout = setTimeout(() => {
      if (estado !== 'conectado' && activo) registrarFallo('Tiempo agotado');
    }, 5500);

    cliente.on('connect', () => {
      if (timerTimeout) {
        clearTimeout(timerTimeout);
        timerTimeout = null;
      }
      estado = 'conectado';
      intentos = 0;
      tPub = 0;
      cliente.subscribe?.(TOPICOS.ordenes, {qos: 1});
      cliente.subscribe?.(TOPICOS.rutas_escaneo, {qos: 1});
      cliente.subscribe?.(TOPICOS.rutas_reposicionamiento, {qos: 1});
      cliente.subscribe?.(TOPICOS.pedidos_solicitud, {qos: 1});
      cliente.subscribe?.(TOPICOS.pedidos_cancelacion, {qos: 1});
      notificar(`Conectado · ${b.nombre}`);
      publicarTelemetria();
    });

    cliente.on('message', (topic, payload) => {
      const txt = typeof payload === 'string' ? payload : payload.toString();
      if (topic === TOPICOS.ordenes) {
        recibirOrden(txt);
      } else if (topic === TOPICOS.rutas_escaneo) {
        recibirRutaEscaneo(txt);
      } else if (topic === TOPICOS.rutas_reposicionamiento) {
        recibirReposicionamiento(txt);
      } else if (topic === TOPICOS.pedidos_solicitud) {
        recibirPedidoSolicitud(txt);
      } else if (topic === TOPICOS.pedidos_cancelacion) {
        recibirPedidoCancelacion(txt);
      }
    });

    cliente.on('error', (err) => {
      registrarFallo(err && err.message ? err.message : 'Error MQTT');
    });

    cliente.on('close', () => {
      if (activo && estado === 'conectado') {
        registrarFallo('Conexión cerrada');
      }
    });
  };

  const conectar = () => {
    if (activo) return;
    activo = true;
    intentos = 0;
    conectarBrokerActual();
  };

  const desconectar = () => {
    activo = false;
    limpiarCliente();
    estado = 'desconectado';
    remoto.activo = false;
    remoto.f = 0;
    remoto.t = 0;
    remoto.freno = false;
    remoto.restanteS = 0;
    notificar('Desconectado');
  };

  const alternar = () => (activo ? desconectar() : conectar());

  const cancelarRemoto = () => {
    if (!remoto.activo) return;
    remoto.activo = false;
    remoto.f = 0;
    remoto.t = 0;
    remoto.freno = false;
    remoto.restanteS = 0;
    parada = 'ninguna';
  };

  const avanzar = (dt) => {
    if (sim.encendido === false) return;
    if (remoto.activo) {
      if (remoto.restanteS > 0) {
        remoto.restanteS -= dt;
        if (remoto.restanteS <= 0) {
          remoto.restanteS = 0;
          remoto.f = 0;
          remoto.t = 0;
          remoto.freno = true;
          parada = 'timeout';
          aplicarRemotoASim();
          publicarTelemetria();
        }
      }
      aplicarRemotoASim();
    }
    if (sim?.lectura) {
      const L = sim.lectura();
      if (L.vueltas < vueltasPrevias) {
        vueltasPrevias = L.vueltas;
        salidasPrevias = L.salidas;
      } else if (L.vueltas > vueltasPrevias) {
        const deltaVueltas = L.vueltas - vueltasPrevias;
        const sinFallo = L.salidas === salidasPrevias && !movimientoBloqueado();
        vueltasPrevias = L.vueltas;
        salidasPrevias = L.salidas;
        if (
          sinFallo &&
          capa3.tipo_ruta === 'cerrada' &&
          (capa3.estado_ruta === 'OPERACION_BUCLE' || capa3.estado_ruta === 'OPERACION_CON_PARADA')
        ) {
          capa3.usos_completados += deltaVueltas;
          publicarRutasEstado();
          notificar(`uso completado (${capa3.usos_completados}/${USOS_PARA_PARADA})`);
        }
      }
    }
    if (estado === 'conectado') {
      tPub += dt;
      if (tPub >= INTERVALO_PUB_S) {
        tPub = 0;
        publicarTelemetria();
      }
    }
  };

  return {
    get estado() { return estado; },
    get conectado() { return estado === 'conectado'; },
    get ordenesRecibidas() { return ordenesRecibidas; },
    get ultimoAck() { return ultimoAck; },
    get parada() { return parada; },
    get movimientoBloqueado() { return movimientoBloqueado(); },
    get puedeReescanearParada() { return puedeReescanearParada(); },
    capa3,
    registroTrazabilidad,
    remoto,
    brokerActual,
    conectar,
    desconectar,
    alternar,
    recibirOrden,
    recibirRutaEscaneo,
    recibirReposicionamiento,
    recibirPedidoSolicitud,
    recibirPedidoCancelacion,
    dispararAlertaInercial,
    cancelarRemoto,
    avanzar,
    construirEstado,
    construirUltrasonido,
    construirRutasEstado,
    construirPedidosEstado,
    construirSensoresInercial,
    publicarRutasEstado,
    publicarPedidosEstado,
    publicarSensoresInercial,
    publicarTelemetria,
  };
}
