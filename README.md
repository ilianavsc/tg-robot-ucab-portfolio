# Robot móvil de búsqueda y transporte para el laboratorio de Telecomunicaciones

Trabajo de Grado, Ingeniería en Telecomunicaciones, UCAB.

**Autoras:** Iliana Vanessa Semprun Cascitelli y Andrea Valentina Ferrer Pinto
**Tutor:** Ing. Biagio Domenico Cante Mata

## Sitio del proyecto (portafolio) — la cara principal
👉 **https://ilianavsc.github.io/tg-robot-ucab/**

Cada prototipo tiene una página visual que se entiende en 30 segundos, con sus pruebas y capturas.

## App web (Flutter) — lista para el jurado
👉 **https://ilianavsc.github.io/tg-robot-ucab/app/**

Trae **Modo Demo**: simula la telemetría del robot cada 2 s sin internet ni broker,
así la demostración no depende de la red del laboratorio.
Código en [`app/`](app/), desplegado automáticamente por GitHub Actions en cada push a `main`.

## Resumen
Robot móvil de bajo costo que busca y transporta componentes electrónicos dentro del laboratorio, con una app para hacer pedidos y recibir alertas.
Control con ESP32, navegación por línea con fusión de sensores, comunicación MQTT y app en Flutter con Firebase.

## Fases (32 semanas, 26/10/2026 al 11/06/2027)

| Fase | Nombre | Fechas | Estado |
|---|---|---|---|
| I | Revisión y levantamiento | 26 oct al 20 nov 2026 | En curso |
| II | Diseño del sistema | 23 nov al 18 dic 2026 | Pendiente |
| III | Construcción y firmware | 21 dic 2026 al 5 feb 2027 | Pendiente |
| IV | Navegación progresiva | 8 feb al 12 mar 2027 | Pendiente |
| V | App y backend | 15 mar al 16 abr 2027 | Pendiente |
| VI | Integración y alertas | 19 abr al 7 may 2027 | Pendiente |
| VII | Pruebas y redacción final | 10 may al 11 jun 2027 | Pendiente |

La semana de parciales (11 al 16 ene 2027) es semana extra de trabajo de la Fase III.

## Prototipos (nomenclatura oficial P01 a P14)

La lista oficial vive en [`datos/proyecto.js`](datos/proyecto.js) (`TG.prototipos`); esta tabla la copia.

| Código | Nombre | Tema | Estado |
|---|---|---|---|
| P01 | Así se hablan el robot y la app | MQTT | Hecho |
| P02 | Inspector de hardware | Sensores (4× TCRT5000 + 2× HC-SR04P) y tracción (encoders) | Hecho en simulación (falta HIL) |
| P03 | Radar Ultrasónico (Frente/Atrás) | 2× HC-SR04P | Hecho en simulación |
| P04 | Simulador 1 + ESP32 | Seguir la línea (PD a 100 Hz) con la placa ESP32 | Hecho en simulación |
| P05 | Gemelo Digital | Teach & repeat sobre las pistas de P04 | Hecho en simulación |
| P06 | Robot virtual y puente | Firebase | En pruebas |
| P07 | El cerebro completo | Firmware integrado (`firmware/`) | En pruebas (lógica validada en PC) |
| **P09** | **App Flutter (v1 · Modo Demo)** | **App Flutter** (`app/`) | Hecho |
| P11 | La alarma llega al teléfono | Centro de Alertas en la app | En pruebas (validado en simulación, falta hardware) |
| P12 | Pruebas y estadística | Analítica de sesión + CSV en la app | En pruebas (validado en simulación, falta hardware) |
| P14 | Balizas BLE (Extremos) | Ubicación | Pendiente |

H0 (Wi-Fi del laboratorio) es una prueba de hardware, no un prototipo numerado.

## Probar todo sin el robot

1. **Prototipos P01 → P05** en <https://ilianavsc.github.io/tg-robot-ucab/prototipos/>: mensajes MQTT (P01),
   inspector de componentes (P02), radar (P03), Simulador 1 con la placa ESP32 (P04) y Gemelo Digital (P05).
2. **App (P09)**: <https://ilianavsc.github.io/tg-robot-ucab/app/> → botón **Modo Demo**: estado, ultrasonidos,
   **Centro de Alertas (P11)** y **Analítica de Sesión (P12)** con la misma regla de seguridad que el firmware.
3. Con el **ESP32 real** (desde diciembre) la app y el banco P01 se conectan a él por MQTT (mismo broker).

Para correr la app en local: `cd app && flutter pub get && flutter run -d chrome`.

**SIL vs. HIL (rigor de las pruebas):** todo lo anterior es **SIL** (*Software In the
Loop*): el firmware se emula (Modo Demo, simuladores P01–P05) o se compila en el PC con imitaciones del
hardware (`firmware/pruebas_pc/`). Las pruebas **HIL** (*Hardware In the Loop*) empiezan
cuando llegue el hardware: ESP32 real, sensores reales y la app; sus mediciones se anotan
en [`prototipos/P02-sensores/README.md`](prototipos/P02-sensores/README.md).

**Verificación automática (CI):** cada push a `main` corre, antes de publicar: `flutter analyze` (0 issues),
`flutter test`, `node specs/navegacion/teach_and_repeat.test.js` (13/13),
`node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` (48),
`node prototipos/P02-sensores/codigo/vitrina.test.js` (16), `node prototipos/P04-simulador-1-esp32/codigo/simulador1.test.js` (19)
y `node prototipos/P01-mqtt-base/simulador-3d/codigo/pruebas.mjs`. El firmware
además se compila en el PC (`sh firmware/pruebas_pc/correr.sh`, escenarios T1–T10 en SIL) en GitHub
Actions; si algo falla, no se despliega.
Contratos JSON de todos los tópicos: [`docs/arquitectura/topicos-mqtt.md`](docs/arquitectura/topicos-mqtt.md).

## Carpetas
- `index.html` y las demás páginas de la raíz: el sitio (inicio, cronograma, prototipos, requerimientos, hardware, arquitectura, decisiones y bitácora)
- `datos/proyecto.js` **el único archivo que hay que editar para actualizar el sitio** (fases, prototipos, pendientes, decisiones, bitácora)
- `assets/` estilo y menú compartidos por todas las páginas
- `prototipos/` una carpeta por prototipo con su página visual (`index.html`), `codigo/` y `evidencias/`
- `app/` la App Flutter Web (P09, con P11 y P12 dentro); se publica sola en `/app/` con cada push a `main`
- `firmware/` firmware integrado del robot (`robot_integrado.ino`, P01 + P02 + P04 + ultrasonidos), su README y `pruebas_pc/` (10 escenarios SIL T1-T10 de seguridad que corren en el PC y en GitHub Actions)
- `docs/` requerimientos, arquitectura (tópicos MQTT), guías de pruebas y del jurado
- `tesis/` capítulos del Trabajo de Grado en Markdown (`capitulo_1.md`, `capitulo_2.md` y `marco_teorico.md` vienen de los Word y usan citas IEEE; `capitulo_3.md` es el borrador del Marco Metodológico; imágenes en `tesis/media/`); `tesis.html` los lista y los abre en el visor modal (la lista sale de `TG.tesis` en `datos/proyecto.js`)
- `hardware/materiales/` lista de materiales y registro de cambios
- `specs/` fuente única de verdad de la pista (`pista_canonica.json`, 9,0 m) y núcleo de navegación teach-and-repeat (`navegacion/teach_and_repeat.js`, 5 estados) con su test harness

El puente MQTT a Firebase (P06), el CAD y los esquemáticos se agregan cuando tengan contenido.

## Reglas de trabajo
1. Cada tarea tiene una sola responsable.
2. Una rama por tarea (ejemplo: `p03-pid`).
3. Antes de empezar: Pull.
4. Al terminar: Pull Request y la otra revisa.
5. Commits así: `tipo: qué hiciste (#tarea)`. Tipos: feat, fix, docs, test, chore.
6. Nunca subir contraseñas ni llaves.
7. Cada prototipo termina con su página visual y su ficha llenas.
