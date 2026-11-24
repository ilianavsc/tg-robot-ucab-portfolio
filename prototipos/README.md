# Prototipos

Cada prototipo tiene su propia carpeta y SIEMPRE la misma estructura:

```
P0X-nombre/
├── index.html    página visual: se entiende en 30 segundos
├── README.md     ficha técnica: todos los detalles
├── codigo/       código del simulador (sketch.ino, diagram.json, libraries.txt...)
└── evidencias/   capturas numeradas: 01-algo.png, 02-algo.png...
```

P = prototipo simulado. H = prueba con hardware real.

## Para crear uno nuevo
1. Copiar `plantilla-pagina.html` como `index.html` dentro de la carpeta nueva.
2. Copiar `plantilla-ficha.md` como `README.md`.
3. Agregarlo (o cambiar su estado) en `datos/proyecto.js`, en la lista `prototipos`, con sus **3 etiquetas** (`etiquetas: { estado, ejecucion, capa }`, valores de `TG.etiquetas`). La portada, el cronograma y la lista de prototipos se actualizan solos.

## Etiquetas estándar
Cada tarjeta muestra exactamente una etiqueta por dimensión:
- **Estado:** `Completado` (= `estado: "listo"`) · `En validación` (= `"en_pruebas"`) · `Planificado` (= `"pendiente"`)
- **Tipo de ejecución:** `SIL · Simulación local` · `EN VIVO · MQTT v2.0.0` (habla en vivo con el contrato `specs/mqtt/contract.json` v2.0.0) · `Documentación / BOM`
- **Capa del sistema:** `Hardware / Sensores` · `Comunicación / MQTT` · `Capa 3 · Operacional` · `App / Interfaz`

La auditoría visual de cada prototipo frente a la identidad del portafolio está en [`docs/auditoria_visual_prototipos.md`](../docs/auditoria_visual_prototipos.md).

## Reglas de la página visual
- Arriba: título simple y una frase que lo explique para alguien que no es ingeniero.
- Una comparación con algo de la vida diaria y un dibujo.
- Colores con un solo significado en todo el sitio: verde = sale del robot, coral = llega al robot, violeta = alarmas o conceptos, amarillo = avisos y pendientes.
- Lo técnico va al final, en "Para los curiosos".
- Sin contraseñas y sin capturas con datos personales (recortar el escritorio).

## Orden de los prototipos web
| Código | Carpeta | Qué hace | Estado · Ejecución · Capa |
|---|---|---|---|
| **P01** | `P01-mqtt-base/` | Base de mensajería MQTT: así se hablan el robot y la app (QoS, última voluntad, reconexión). | Completado · SIL · Comunicación / MQTT |
| **P02** | `P02-sensores/` | Inspector de hardware: el robot recorre el circuito ovalado (Auto/Manual) y un panel oscuro integrado muestra las 4 consolas interactivas (HC-SR04, TCRT5000 ×4, velocidad/dirección y MPU-6050) y la ficha técnica de la pieza enfocada, sincronizados con un estado central. `README.md` es el registro HIL. | Completado · SIL · Hardware / Sensores |
| **P03** | `P03-radar-ultrasonico/` | Simulación del radar ultrasónico (2× HC-SR04P, frente y atrás) y frenado automático ante obstáculos. | Completado · SIL · Hardware / Sensores |
| **P04** | `P04-simulador-1-esp32/` | Simulador 1 integrado con la placa ESP32 (LEDs S1–S4, PWM, TX) y puente MQTT v2.0.0 bidireccional con la app web (control remoto desde Admin + Modo Desarrollador, Capa 3 y alertas inerciales). | Completado · EN VIVO · MQTT v2.0.0 · Comunicación / MQTT |
| **P05** | `P05-gemelo-digital/` | Gemelo Digital: calibra y aprende la pista (teach & repeat) y ejecuta la Capa 3 operacional (rutas cerrada y lineal, pedidos, MPU-6050). | Completado · SIL · Capa 3 · Operacional |
| **P10** | `P10-ruta-lineal/` | Ruta lineal con reposicionamiento manual: ida por la línea, alarma en el destino, giro de 180° confirmado por el operador y retorno a la base; panel con pestañas Operación y Consola de sensores. | Completado · SIL · Capa 3 · Operacional |

P06 (puente a Firebase), P07 (firmware), P09/P11/P12 (app) y P14 (balizas BLE) no tienen carpeta aquí: su estado y etiquetas están en `datos/proyecto.js`.

## Cómo recompilar los simuladores 3D (P01, P02 y P04)
P03, P05 y P10 no necesitan compilar: son HTML + JavaScript sin empaquetar.

Los tres simuladores se empaquetan igual, con esbuild y `three` de npm (ya no se usa el kit teardown). Cada `codigo/` tiene todo el fuente: `main.js` (entrada), los módulos, `style.css`, `fuentes.css`, `plantilla.html` y `construir.mjs`.
```bash
cd prototipos/P01-mqtt-base/simulador-3d/codigo   # o P02-sensores/codigo, o P04-simulador-1-esp32/codigo
npm install --no-save three@0.187.0 esbuild      # una sola vez
node construir.mjs                               # genera ../simulador.html (un solo archivo)
```
P01: `node pruebas.mjs` valida los pasos de cada QoS, la telemetría QoS 0 cada 1–1,5 s y la pérdida de red con reintentos.

No edites `simulador.html` a mano: se pierde al recompilar. Cambia el fuente en `codigo/`.

### P02 · Inspector de hardware (esbuild)
`P02-sensores/codigo/`: el robot recorre el **circuito ovalado** con obstáculos (**Auto**) o se maneja a mano (**Manual**) con la misma modalidad del Simulador 1: W A S D o flechas, Espacio frena, D-Pad táctil, mismos valores `MANUAL` de `P04-simulador-1-esp32/codigo/sim.js`. Con menos de 20 cm al frente solo deja retroceder, como el firmware. A la derecha, un **panel oscuro integrado** (sin `iframe`) muestra las 4 consolas interactivas (HC-SR04, TCRT5000 ×4, velocidad/dirección hasta 0,46 m/s y MPU-6050) y, al tocar una pieza en el 3D o en la tira, su consola sube y debajo aparece su ficha técnica. El circuito y las consolas comparten un solo estado central (`assets/inspector_hw.js`, `SimulationState`): las lecturas del circuito llegan a las consolas y lo que se inyecta en ellas mueve la física.
```bash
cd prototipos/P02-sensores/codigo
npm install --no-save three@0.187.0 esbuild   # una sola vez
node construir.mjs                            # genera ../inspector3d.js, ../inspector3d.css, ../simulador.html y la interfaz de ../index.html
node vitrina.test.js                          # pruebas del núcleo, del manejo y de la interfaz, sin navegador (25)
```
No reimplementa teach-and-repeat: esa máquina de estados es solo del Gemelo Digital (P05).

### P04 · Simulador 1 + ESP32 (esbuild)
Igual que P02: `P04-simulador-1-esp32/codigo/` se empaqueta con esbuild (`npm install --no-save three@0.187.0 esbuild && node construir.mjs`). Pruebas: `node codigo/simulador1.test.js` (30). Su puente `codigo/mqtt_puente.js` publica con `schema_version` 2.0.0 (contrato `specs/mqtt/contract.json`). Dos pistas (A 8,05 m histórica y B 9,0 m canónica), modo manual (teclado y D-Pad táctil) o seguidor automático, y la **placa ESP32** del Simulador del ESP32 (`ledsEsp32()` en `sim.js`): 4 LEDs S1…S4 con la misma lectura del lazo PD, PWM de ENA/ENB y LED TX cada 2 s. `pista.js`, `linea.js` y `model.js` están separados para que los simuladores futuros retiren cinta con `ocultarTramo()`.

## P05 · Gemelo Digital (teach-and-repeat)
`P05-gemelo-digital/` es el gemelo digital de **movimiento** (SIL). Carga tal cual `specs/pista_canonica.json` (9,0 m) y `specs/navegacion/teach_and_repeat.js`, y usa las 2 pistas del Simulador 1 (`P04-simulador-1-esp32/codigo/pista.js`) sin copiarlas; la planta física (cinta, sensores, cinemática, giroscopio, RSSI de las 2 balizas BLE en los extremos) está en `simulador_movimiento.js` y el radar sale de P03. Pruebas: `node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` (55) y `pistas_radar.test.js`. La Capa 3 operacional (rutas, pedidos y MPU-6050) está en `capa3_operacional.js`. Se abre por http (no por `file://`).

## P10 · Ruta lineal con reposicionamiento manual
`P10-ruta-lineal/` no necesita compilar: `ruta_lineal.js` es el núcleo (estado central `SimulationState`, máquina de estados `EN_BASE → EN_RUTA_IDA → ESPERA_REPOSICION → EN_RUTA_RETORNO → EN_BASE` y sensores) y `ruta_lineal_ui.js` dibuja la escena en canvas y el panel. Pruebas: `node prototipos/P10-ruta-lineal/ruta_lineal.test.js` (10). Se le dio el código P10 porque P06 sigue reservado para el robot virtual y el puente a Firebase.
