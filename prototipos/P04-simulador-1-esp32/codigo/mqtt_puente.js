// Puente MQTT sobre WebSockets para P04 (Simulador 1 + ESP32).
// Protocolo, brokers y tópicos 100 % compatibles con app/ (MqttService) y P01.
// Sin dependencia de three.js: se puede probar directamente con Node.

export const BROKERS = [
  {nombre: 'HiveMQ', host: 'broker.hivemq.com', puerto: 8884, url: 'wss://broker.hivemq.com:8884/mqtt'},
  {nombre: 'EMQX', host: 'broker.emqx.io', puerto: 8084, url: 'wss://broker.emqx.io:8084/mqtt'},
  {nombre: 'Mosquitto', host: 'test.mosquitto.org', puerto: 8081, url: 'wss://test.mosquitto.org:8081/mqtt'},
];

export const TOPICOS = {
  estado: 'ucab-tg-sf/robot/estado',
  ultrasonido: 'ucab-tg-sf/robot/ultrasonido',
  ordenes: 'ucab-tg-sf/robot/ordenes',
  ack: 'ucab-tg-sf/robot/ordenes/ack',
  alertas: 'ucab-tg-sf/robot/alertas',
};

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
  let ordenesRecibidas = 0;
  let ultimoAck = null;
  let tPub = 0;
  let parada = 'ninguna';

  const remoto = {activo: false, f: 0, t: 0, freno: false, restanteS: 0, ultimoCmd: null};

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
    try {
      cliente.publish(TOPICOS.estado, JSON.stringify(est), {qos: 0});
      cliente.publish(TOPICOS.ultrasonido, JSON.stringify(us), {qos: 0});
      alTx();
    } catch {
      /* ignora fallo puntual de envío */
    }
    return {estado: est, ultrasonido: us};
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
      notificar(`Conectado · ${b.nombre}`);
      publicarTelemetria();
    });

    cliente.on('message', (topic, payload) => {
      if (topic === TOPICOS.ordenes) {
        const txt = typeof payload === 'string' ? payload : payload.toString();
        recibirOrden(txt);
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
    remoto,
    brokerActual,
    conectar,
    desconectar,
    alternar,
    recibirOrden,
    cancelarRemoto,
    avanzar,
    construirEstado,
    construirUltrasonido,
    publicarTelemetria,
  };
}
