# Guion de defensa · demostración en 5 pasos

> **🎬 Respaldo visual sin internet:** Si la red del laboratorio falla el jueves, abre directamente **[`assets/evidencias/demo_respaldo.gif`](../assets/evidencias/demo_respaldo.gif)** (grabación de 12 s del flujo completo con el ESP32 virtual de entonces, hoy retirado: transmite por MQTT → la App P09 recibe telemetría en tiempo real y confirma órdenes ACK en milisegundos).

**Duración:** 10 a 12 minutos · **Quién maneja la pantalla:** una sola persona · **Regla:** un paso, una pestaña, una frase.

**Idea central (decirla al inicio):** "Pides un componente desde la app y el robot lo lleva hasta tu puesto. Hoy mostramos que la comunicación app, broker y robot ya funciona y se mide."

---

## Antes de empezar (3 min, antes de que entre el jurado)

1. Abrir 5 pestañas, en este orden, y no cerrarlas:
   - Pestaña 1: `https://ilianavsc.github.io/tg-robot-ucab/`
   - Pestaña 2: `https://ilianavsc.github.io/tg-robot-ucab/prototipos/P04-simulador-1-esp32/`
   - Pestaña 3: `https://ilianavsc.github.io/tg-robot-ucab/app/`
   - Pestaña 4: `https://ilianavsc.github.io/tg-robot-ucab/prototipos/P03-radar-ultrasonico/index.html`
   - Pestaña 5: `https://ilianavsc.github.io/tg-robot-ucab/prototipos/P01-mqtt-base/simulador-3d/simulador.html`
2. Probar el internet abriendo la pestaña 4 (radar) y pulsando **Encender**. Debe decir `CONECTADO EN VIVO`. Luego pulsar **Detener**.
3. Cerrar el sonido del laptop y poner zoom al 110 %.

**Plan B si no hay internet:** la app (pestaña 3) tiene **Modo Demo**, y el radar P03 (pestaña 4) y el simulador 3D (pestaña 5) funcionan sin red una vez cargados. El paso 2 (P04) funciona sin red y el paso 3 se hace en Modo Demo (decirlo en voz alta: la confirmación es simulada). En el paso 4 el arrastre del obstáculo es local: solo deja de publicar, así que no se verá en la app.

---

## Paso 1 · La web y el progreso (1,5 min) · pestaña 1

**Hacer:**
1. Mostrar la barra de avance: **6/11 prototipos listos** (P01 a P05 y la app).
2. Bajar a la tarjeta de firmware y señalar la insignia **Firmware C++ · pruebas SIL**.
3. Abrir **Ver detalle técnico** (se despliega solo).

**Decir:**
- "Cada módulo se valida primero en simulador y luego en el robot físico. De los 11 prototipos, 6 están listos en simulación: P01 a P05 y la app."
- "Las 10 pruebas (escenarios T1-T10) corren el código C++ del robot en el PC: órdenes y confirmaciones, obstáculos, fallo de sensor, 5 segundos sin órdenes y corte por batería. Falta la prueba con el ESP32 real: llega el pedido en diciembre."

**Debe verse:** barra 6/11, insignia verde, detalle desplegado con animación suave.

**Pasar al paso 2 con:** "Veamos cómo se comunica el robot."

---

## Paso 2 · El robot y su placa ESP32 (P04) (2 min) · pestaña 2

**Hacer:**
1. Elegir **Pista B · 9,0 m** y dejarlo en **Automático**.
2. Señalar la **placa ESP32**: un LED amarillo por cada sensor de línea (S1…S4) y las barras PWM de los motores.
3. Pulsar **Manual** y girar con **A** o **◄** hasta salir de la cinta: los 4 LEDs se apagan.

**Decir:**
- "Cada LED es lo que lee el ESP32 en ese instante: la misma lectura que usa el control PD a 100 Hz."
- "En el robot real el ESP32 publica este estado cada 2 segundos por MQTT; aquí lo vemos sin red."

**Debe verse:** LEDs que cambian con el robot en la pista y que se apagan fuera de ella.

---

## Paso 3 · La App (P09): órdenes, ACK y latencia (3 min) · pestaña 3

**Hacer:**
1. En **DASHBOARD**, tarjeta del broker: pulsar **CONECTAR** y comprobar que el selector marque el mismo broker que el ESP32 real (HIVEMQ, EMQX o MOSQUITTO) y la pastilla pase de `CONECTANDO` a `ONLINE`.
2. Se llenan las tarjetas **Estado del robot**, **Matriz de energía 3S**, **Matriz IR** y **Motores**: ese es el estado que manda el ESP32. Sin el robot real, usar **Modo Demo** (estado simulado).
3. Ir a **CONTROLES** y pulsar **AVANZAR**. La tarjeta **ÚLTIMO ACK** pasa de `SIN ORDEN` a `ESPERANDO` (ámbar) y a `CONFIRMADA` (verde): `Confirmó "adelante" en N ms`.
4. Pulsar **ALTO** (rojo, envía `frenar`). Misma tarjeta, nueva confirmación.
5. Pulsar **AUTO NAV**. El modo del robot cambia a autónomo.
6. Repetir **ALTO** 3 veces seguidas y decir el rango de milisegundos que se ve.

**Decir:**
- "La app publica la orden con QoS 1: el robot tiene que confirmar. Esa confirmación es el ACK."
- "El número en verde es el tiempo entre pulsar y recibir la confirmación."

**Debe verse:** tarjeta ÚLTIMO ACK en verde con milisegundos, y el cambio de modo del robot.

**Importante:**
- Con el broker real, el número es medido (red + broker). En **Modo Demo** la confirmación es simulada (300 ms exactos): no presentarla como medida.
- El botón **Freno Remoto** (abajo a la derecha) envía el mismo `frenar` por MQTT: no es un corte eléctrico y no sustituye el interruptor físico del robot.
- No inventar una cifra: decir solo lo que muestra la pantalla. La mediana de 10 envíos se mide en la prueba física (`docs/centro_de_pruebas.md`).

---

## Paso 4 · El radar ultrasónico (P03) (1,5 min) · pestaña 4

**Hacer:**
1. Pulsar **⚡ Encender** (conecta y publica en `ucab-tg-sf/robot/ultrasonido`). El arrastre funciona también sin encender.
2. Arrastrar el círculo rojo hacia el robot para demostrar la reducción de velocidad (ámbar) y el frenado automático (rojo a < 20 cm).
3. Mirar la tarjeta **Velocidad** mientras se arrastra: 0.60 m/s con paso libre (más de 50 cm, verde); entre 50 y 20 cm baja de forma proporcional (ámbar); a 20 cm o menos queda en 0.00 m/s y aparece `FRENADO POR OBSTÁCULO` (rojo).
4. Soltar el círculo lejos del robot: la velocidad vuelve a 0.60 m/s.
5. *(Opcional, con la app en el mismo broker)* En la pestaña 3, sección **RADAR**: el punto sigue al círculo y, por debajo de 20 cm, aparece el banner rojo `PARADA POR OBSTÁCULO FRONTAL`.

**Decir:**
- "Dos sensores ultrasónicos miden la distancia al frente y atrás. Verde es paso libre, ámbar es zona de aviso y rojo es peligro."
- "Al acercar el obstáculo, el simulador baja la velocidad poco a poco y, por debajo de 20 centímetros, frena."
- "Los umbrales de 20 y 50 centímetros son los del firmware (requerimiento RF-05)."
- "Ojo: la reducción gradual de velocidad es del simulador. El firmware actual solo frena a menos de 20 centímetros y avisa entre 20 y 50."

**Debe verse:** el círculo sigue al cursor (o al dedo), la barra de velocidad pasa de verde a ámbar a rojo y aparece el aviso de frenado.

**Tips:**
- No hace falta agarrar el círculo: pulsar en cualquier punto del radar lo coloca ahí.
- Si la velocidad no baja, el círculo está debajo del robot: la velocidad solo depende del sensor delantero. Arrastrarlo hacia arriba.

---

## Paso 5 · Caída y reconexión (2 min)

**Parte A · La app se cae y vuelve (pestaña 3, sección DASHBOARD, 30 s)**
1. Pulsar el botón verde **CONECTADO** (al pasar el cursor se vuelve rojo y dice **DESCONECTAR**): la pastilla pasa a `OFFLINE` y los botones de orden de **CONTROLES** se bloquean.
2. Pulsar **CONECTAR**: pasa por `CONECTANDO` y vuelve a `ONLINE`; los botones se activan.

**Decir:** "Si se cae la red, la app lo avisa y no deja enviar órdenes que se perderían."

**Parte B · El robot se cae y el sistema lo detecta (pestaña 5, 1,5 min)**
1. Pulsar **Desconexión (LWT)**: el broker publica el testamento del robot y la pantalla se pone en alerta.
2. Pulsar **Reconectar el robot**: vuelve a `en línea`.

**Decir:**
- "LWT significa última voluntad: cuando el robot se cae sin avisar, el broker avisa por él."
- "En las pruebas con el broker, la caída se detectó en menos de 22 segundos, con 0 órdenes perdidas en 50 pedidos."

**Debe verse:** consola del simulador con el mensaje de desconexión y luego el de reconexión.

> Nota honesta: esta parte B es el simulador 3D de P01 (animación del protocolo). No hay un robot virtual conectado que envíe el testamento LWT; eso se verá con el ESP32 real. Si el jurado pregunta, decirlo así.

---

## Cierre (30 s)

"Hoy mostramos la web, el ESP32 virtual, la app con órdenes confirmadas, el radar que frena ante un obstáculo y la caída y reconexión. Lo que sigue: probar el mismo flujo con el ESP32 real y, cuando llegue el pedido, con motores y sensores."

---

## Preguntas probables (respuestas cortas)

| Pregunta | Respuesta |
|---|---|
| ¿Por qué MQTT? | Es liviano, tiene niveles de entrega (QoS) y avisa cuando algo se cae (LWT). |
| ¿Qué es QoS 1? | Llega al menos una vez y el receptor confirma. Por eso existe el ACK. |
| ¿Esto corre en el robot real? | El mismo protocolo sí; el firmware está validado en PC (pruebas SIL). Falta la prueba con el ESP32 físico. |
| ¿El robot real reduce la velocidad al acercarse a un obstáculo? | Hoy el firmware solo se detiene a menos de 20 cm y avisa entre 20 y 50 cm. La reducción gradual de velocidad está en el simulador P03 y no en el firmware: sería una mejora a considerar. |
| ¿Qué falta? | Motores, sensores y batería: el pedido llega a Miami entre el 15 y el 28 de diciembre. |
| ¿Y la red del laboratorio? | La red UCAB pide usuario y clave; el firmware usa Wi-Fi simple. Se prueba con la red interna del laboratorio (prueba H0). |

---

## Si algo sale mal (Ubicación / Causa / Solución)

| Ubicación | Causa | Solución |
|---|---|---|
| P03 (radar), se queda en `CONECTANDO` | Red bloquea WebSocket | Esperar el salto a EMQX o Mosquitto; si no, Plan B |
| App, no llegan datos | La app usa otro broker que el robot, o no hay ESP32 real encendido | Desconectar y Conectar hasta ver el mismo broker; sin robot, usar Modo Demo |
| App, ACK siempre 300 ms | Está en Modo Demo | Salir del Modo Demo y pulsar Conectar |
| Simulador 3D en blanco | WebGL bloqueado | Recargar la página; si sigue, usar otro navegador |
| P03, la velocidad no baja al arrastrar | El círculo está debajo del robot (sensor trasero) | Arrastrarlo hacia arriba, delante del robot |
| P03, no aparece en la app | La app y el P03 están en brokers distintos, o el P03 no está encendido | Pulsar **⚡ Encender** en el P03 y comprobar el mismo broker en la app |
