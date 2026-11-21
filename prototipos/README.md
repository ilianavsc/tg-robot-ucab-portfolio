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
3. Agregarlo (o cambiar su estado) en `datos/proyecto.js`, en la lista `prototipos`. La portada, el cronograma y la lista de prototipos se actualizan solos.

## Reglas de la página visual
- Arriba: título simple y una frase que lo explique para alguien que no es ingeniero.
- Una comparación con algo de la vida diaria y un dibujo.
- Colores con un solo significado en todo el sitio: verde = sale del robot, coral = llega al robot, violeta = alarmas o conceptos, amarillo = avisos y pendientes.
- Lo técnico va al final, en "Para los curiosos".
- Sin contraseñas y sin capturas con datos personales (recortar el escritorio).

## Orden de los prototipos web
| Código | Carpeta | Qué hace |
|---|---|---|
| **P01** | `P01-mqtt-base/` | Base de mensajería MQTT: así se hablan el robot y la app (QoS, última voluntad, reconexión). |
| **P02** | `P02-sensores/` | Inspector interactivo de los componentes del robot (vista principal) con manejo Auto/Manual y consola de sensores opcional con botón. `README.md` es el registro HIL. |
| **P03** | `P03-radar-ultrasonico/` | Simulación del radar ultrasónico (2× HC-SR04P, frente y atrás) y frenado automático ante obstáculos. |
| **P04** | `P04-simulador-1-esp32/` | Simulador 1 integrado con la placa ESP32 (LEDs S1–S4, PWM, TX) y puente MQTT bidireccional con la app web (control remoto desde Admin + Modo Desarrollador). |
| **P05** | `P05-gemelo-digital/` | Gemelo Digital: calibra y aprende la pista, con puntos de control equitativos en tercios en la segunda vuelta. |

## Cómo recompilar los simuladores 3D (P01, P02 y P04)
Los tres simuladores se empaquetan igual, con esbuild y `three` de npm (ya no se usa el kit teardown). Cada `codigo/` tiene todo el fuente: `main.js` (entrada), los módulos, `style.css`, `fuentes.css`, `plantilla.html` y `construir.mjs`.
```bash
cd prototipos/P01-mqtt-base/simulador-3d/codigo   # o P02-sensores/codigo, o P04-simulador-1-esp32/codigo
npm install --no-save three@0.187.0 esbuild      # una sola vez
node construir.mjs                               # genera ../simulador.html (un solo archivo)
```
P01: `node pruebas.mjs` valida los pasos de cada QoS, la telemetría QoS 0 cada 1–1,5 s y la pérdida de red con reintentos.

No edites `simulador.html` a mano: se pierde al recompilar. Cambia el fuente en `codigo/`.

### P02 · Inspector de hardware (esbuild)
`P02-sensores/codigo/`: lo principal es la **inspección de los componentes** (etiquetas 3D, tira de las 7 piezas, ficha con datos en vivo y rayos X). El robot recorre solo la ruta cerrada (**Auto**) o se maneja a mano (**Manual**) con la misma modalidad del Simulador 1: W A S D o flechas, Espacio frena, D-Pad táctil, mismos valores `MANUAL` de `P04-simulador-1-esp32/codigo/sim.js`. Con menos de 20 cm al frente solo deja retroceder, como el firmware. La **consola de sensores** (velocímetro en la escala del radar y 4 LEDs de línea) es opcional: empieza oculta y se abre con el botón «Consola de sensores».
```bash
cd prototipos/P02-sensores/codigo
npm install --no-save three@0.187.0 esbuild   # una sola vez
node construir.mjs                            # genera ../simulador.html (un solo archivo)
node vitrina.test.js                          # pruebas del núcleo, del manejo y de la interfaz, sin navegador (16)
```
No reimplementa teach-and-repeat: esa máquina de estados es solo del Gemelo Digital (P05).

### P04 · Simulador 1 + ESP32 (esbuild)
Igual que P02: `P04-simulador-1-esp32/codigo/` se empaqueta con esbuild (`npm install --no-save three@0.187.0 esbuild && node construir.mjs`). Pruebas: `node codigo/simulador1.test.js` (19). Dos pistas (A 8,05 m histórica y B 9,0 m canónica), modo manual (teclado y D-Pad táctil) o seguidor automático, y la **placa ESP32** del Simulador del ESP32 (`ledsEsp32()` en `sim.js`): 4 LEDs S1…S4 con la misma lectura del lazo PD, PWM de ENA/ENB y LED TX cada 2 s. `pista.js`, `linea.js` y `model.js` están separados para que los simuladores futuros retiren cinta con `ocultarTramo()`.

## P05 · Gemelo Digital (teach-and-repeat)
`P05-gemelo-digital/` es el gemelo digital de **movimiento** (SIL). Carga tal cual `specs/pista_canonica.json` (9,0 m) y `specs/navegacion/teach_and_repeat.js`, y usa las 2 pistas del Simulador 1 (`P04-simulador-1-esp32/codigo/pista.js`) sin copiarlas; la planta física (cinta, sensores, cinemática, giroscopio, RSSI de las 2 balizas BLE en los extremos) está en `simulador_movimiento.js` y el radar sale de P03. Pruebas: `node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` (48). Se abre por http (no por `file://`).
