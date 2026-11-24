# Robot móvil de búsqueda y transporte para el laboratorio de Telecomunicaciones

Trabajo de Grado, Ingeniería en Telecomunicaciones, UCAB.

**Autoras:** Iliana Vanessa Semprun Cascitelli y Andrea Valentina Ferrer Pinto
**Tutor:** Ing. Biagio Domenico Cante Mata

## Sitio del proyecto (portafolio) — la cara principal
👉 **https://ilianavsc.github.io/tg-robot-ucab-portfolio/**

Cada prototipo tiene una página visual que se entiende en 30 segundos, con sus pruebas y capturas.

## App web (Flutter) — lista para el jurado
👉 **https://ilianavsc.github.io/tg-robot-ucab-app/**

Estructura actual de la App (contrato **MQTT v2.0.0** y **Capa 3 Operacional**):
- **Dashboard:** estado en vivo, telemetría HC-SR04/TCRT5000/MPU-6050, conexión MQTT (HiveMQ → EMQX → Mosquitto) y **Modo Demo** offline.
- **Escaneo de ruta:** flujo guiado para Ruta Cerrada (bucle con contador `N = 3`) y Ruta Lineal (`ESPERA_REPOSICION` con confirmación manual).
- **Pedidos unificados:** solicitud sobre parada configurada, seguimiento en vivo y **cancelación segura** preservando la ruta aprendida.
- **Alertas y diagnóstico:** Centro de Alertas QoS 2 (obstáculo, batería, impacto/inclinación/atascamiento MPU-6050) y recuperación manual.

Ver diagramas interactivos en [`como-funciona-app.html`](como-funciona-app.html). Código en [`ilianavsc/tg-robot-ucab-app`](https://github.com/ilianavsc/tg-robot-ucab-app), desplegado automáticamente por GitHub Actions en cada push a `main`.

## Resumen
Robot móvil de bajo costo que busca y transporta componentes electrónicos dentro del laboratorio, con una app para gestionar rutas, pedidos y alertas.
Control con ESP32, navegación por línea con fusión de sensores (TCRT5000, HC-SR04P, MPU-6050), comunicación directa **MQTT v2.0.0** y app en Flutter.

## Fases (32 semanas, 26/10/2026 al 11/06/2027)

| Fase | Nombre | Fechas | Estado |
|---|---|---|---|
| I | Revisión y levantamiento | 26 oct al 20 nov 2026 | Completada (quedan la observación en el laboratorio, la prueba H0 y la matriz de hardware v2) |
| II | Diseño del sistema | 23 nov al 18 dic 2026 | En curso |
| III | Construcción y firmware | 21 dic 2026 al 5 feb 2027 | Pendiente |
| IV | Navegación progresiva | 8 feb al 12 mar 2027 | Pendiente |
| V | App y backend | 15 mar al 16 abr 2027 | Pendiente |
| VI | Integración y alertas | 19 abr al 7 may 2027 | Pendiente |
| VII | Pruebas y redacción final | 10 may al 11 jun 2027 | Pendiente |

La semana de parciales (11 al 16 ene 2027) es semana extra de trabajo de la Fase III.

## Prototipos (nomenclatura oficial P01 a P14)

La lista oficial vive en [`datos/proyecto.js`](datos/proyecto.js) (`TG.prototipos`); esta tabla la copia con las **3 etiquetas estándar** de cada uno (`TG.etiquetas`):
- **Estado:** `Completado` · `En validación` · `Planificado`
- **Tipo de ejecución:** `SIL · Simulación local` · `EN VIVO · MQTT v2.0.0` · `Documentación / BOM`
- **Capa del sistema:** `Hardware / Sensores` · `Comunicación / MQTT` · `Capa 3 · Operacional` · `App / Interfaz`

| Código | Nombre | Estado | Tipo de ejecución | Capa del sistema |
|---|---|---|---|---|
| P01 | Así se hablan el robot y la app (MQTT) | Completado | SIL · Simulación local | Comunicación / MQTT |
| P02 | Inspector de hardware: circuito 3D + 4 consolas interactivas | Completado (falta HIL) | SIL · Simulación local | Hardware / Sensores |
| P03 | Radar Ultrasónico (Frente/Atrás) | Completado | SIL · Simulación local | Hardware / Sensores |
| P04 | Simulador 1 + ESP32 (puente MQTT v2.0.0) | Completado | EN VIVO · MQTT v2.0.0 | Comunicación / MQTT |
| P05 | Gemelo Digital (teach & repeat + Capa 3) | Completado | SIL · Simulación local | Capa 3 · Operacional |
| P06 | Robot virtual y puente a Firebase | Planificado (sin código aún) | Documentación / BOM | Comunicación / MQTT |
| P07 | El cerebro completo (`firmware/`) | En validación (lógica validada en el PC, T1–T10) | SIL · Simulación local | Hardware / Sensores |
| **P09** | **App Flutter (v1 · Modo Demo)** | Completado | EN VIVO · MQTT v2.0.0 | App / Interfaz |
| **P10** | **Ruta lineal con reposicionamiento manual** | Completado | SIL · Simulación local | Capa 3 · Operacional |
| P11 | La alarma llega al teléfono (Centro de Alertas) | En validación (falta hardware) | EN VIVO · MQTT v2.0.0 | App / Interfaz |
| P12 | Pruebas y estadística (analítica + CSV) | En validación (faltan los 20+ ensayos) | EN VIVO · MQTT v2.0.0 | App / Interfaz |
| P14 | Balizas BLE (Extremos) | Planificado | Documentación / BOM | Hardware / Sensores |

P10 usa un código libre porque P06 sigue reservado para el puente a Firebase. Solo P04 (y la app) hablan el contrato `specs/mqtt/contract.json` v2.0.0 en vivo; el banco de P01 y el radar de P03 también se conectan a brokers públicos, pero sin `schema_version` 2.0.0, y el robot sigue siendo simulado en todos (SIL).

H0 (Wi-Fi del laboratorio) es una prueba de hardware, no un prototipo numerado.

## Probar todo sin el robot

1. **Prototipos P01 → P05 y P10** en <https://ilianavsc.github.io/tg-robot-ucab-portfolio/prototipos/>: mensajes MQTT (P01),
   inspector de hardware en el circuito 3D con 4 consolas (P02), radar (P03), Simulador 1 con la placa ESP32 (P04),
   Gemelo Digital (P05) y ruta lineal con reposicionamiento manual (P10).
2. **App (P09)**: <https://ilianavsc.github.io/tg-robot-ucab-app/> → **Dashboard**, **Escaneo de ruta**, **Pedidos unificados** y **Alertas** (con **Modo Demo** offline o conectada en vivo por MQTT v2.0.0 al simulador P04 / ESP32).
3. Con el **ESP32 real** (desde diciembre) la app y el banco P01 se conectan a él por MQTT (mismo broker).

Para correr la app en local, clona [`tg-robot-ucab-app`](https://github.com/ilianavsc/tg-robot-ucab-app) y ejecuta `flutter pub get && flutter run -d chrome`.

**SIL vs. HIL (rigor de las pruebas):** todo lo anterior es **SIL** (*Software In the
Loop*): el firmware se emula (Modo Demo, simuladores P01–P05 y P10) o se compila en el PC con imitaciones del
hardware (`firmware/pruebas_pc/`). Las pruebas **HIL** (*Hardware In the Loop*) empiezan
cuando llegue el hardware: ESP32 real, sensores reales y la app; sus mediciones se anotan
en [`prototipos/P02-sensores/README.md`](prototipos/P02-sensores/README.md).

**Verificación automática (CI):** cada push a `main` corre, antes de publicar: `sh firmware/pruebas_pc/correr.sh` (SIL T1–T10), `node --check`, `node scripts/validar_contratos.mjs`, `node specs/navegacion/teach_and_repeat.test.js` (13/13), `node prototipos/P01-mqtt-base/simulador-3d/codigo/pruebas.mjs`, `node prototipos/P02-sensores/codigo/vitrina.test.js` (25/25), `node prototipos/P03-radar-ultrasonico/radar_motor.test.js` (6/6), `node prototipos/P04-simulador-1-esp32/codigo/simulador1.test.js` (30/30), `node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` (55/55) y `node prototipos/P10-ruta-lineal/ruta_lineal.test.js` (10/10); si algo falla, no se despliega.
Contratos JSON de todos los tópicos: [`specs/mqtt/contract.json`](specs/mqtt/contract.json) y [`docs/arquitectura/topicos-mqtt.md`](docs/arquitectura/topicos-mqtt.md).

## Carpetas
- `index.html` y las demás páginas de la raíz: el sitio (inicio, cronograma, prototipos, requerimientos, hardware, arquitectura, **cómo funciona la app**, decisiones, tesis y bitácora)
- `datos/proyecto.js` **el único archivo que hay que editar para actualizar el sitio** (fases, prototipos, pendientes, decisiones, bitácora)
- `assets/` estilo y menú compartidos por todas las páginas
- `prototipos/` una carpeta por prototipo con su página visual (`index.html`), `codigo/` y `evidencias/` (P01–P05 y P10)
- App Flutter Web (P09, P11, P12): repositorio independiente [`ilianavsc/tg-robot-ucab-app`](https://github.com/ilianavsc/tg-robot-ucab-app) publicado en <https://ilianavsc.github.io/tg-robot-ucab-app/>
- `firmware/` firmware integrado del robot (`robot_integrado.ino`, P01 + P02 + P04 + ultrasonidos), su README y `pruebas_pc/` (10 escenarios SIL T1-T10 de seguridad que corren en el PC y en GitHub Actions)
- `docs/` requerimientos, arquitectura (tópicos MQTT), guías de pruebas y del jurado, y la [matriz de auditoría visual de los prototipos](docs/auditoria_visual_prototipos.md)
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
