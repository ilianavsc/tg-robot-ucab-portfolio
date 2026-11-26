# P05 · Gemelo Digital · Escaneo 1 (muestreo base) y Escaneo 2 (ruta con 3 segmentos)

Gemelo digital de **movimiento** (SIL) enfocado en un solo viaje: el **primer escaneo lento** de la ruta, con toda la cinta puesta. Se abre por http (no por `file://`): carga `specs/navegacion/teach_and_repeat.js`, `specs/pista_canonica.json` y las pistas de SIM1 (`../P04-simulador-1-esp32/codigo/pista.js`) sin copiarlos.

Las torretas / Torres de Control quedan **fuera de esta pantalla**. Se integran en una fase posterior.

## Flujo
1. **Pista A o B** (las dos de SIM1): A = circuito histórico de 8,05 m · B = recorrido canónico de 9,0 m.
2. **🎓 Iniciar primer escaneo:** el núcleo teach-and-repeat sigue la línea a la **velocidad lenta real** y el gemelo guarda **un punto discreto cada 2 s** (2000 ms de tiempo de simulación).
   - El trazado se dibuja **solo con esos puntos**, sin una línea continua ni punteada.
   - Cada punto guarda la lectura instantánea de los sensores.
3. **Freno Remoto / Pausa** conservan el registro. **♻ Limpiar y reiniciar viaje** lo borra.
4. **Escaneo administrado en pista despejada:** no hay control para simular obstáculos durante el primer escaneo. Las distancias de los dos HC-SR04P de cada punto (`paredes_ref`, `perfilParedes()`) se guardan como **perfil de paredes de referencia (línea base)**. Así se evitan falsos positivos en la operación normal, y los recorridos sucesivos sobre la misma ruta refinan ese perfil del entorno fijo.
5. **Nota de integración App:** durante este escaneo, la app móvil (`tg-robot-ucab-app`) solo muestra **"Cargando..."**. El registro punto a punto es solo del gemelo.

## Escaneo 2 · Ruta con 3 segmentos
Un selector arriba del cockpit alterna entre **Escaneo 1 · Muestreo base** (igual que en `158f0b3`) y **Escaneo 2 · Ruta con 3 segmentos**. Cada fase conserva su propio registro; un escaneo a medias se descarta al cambiar de fase.
- **Camino completo y puntos de control:**
  - El gemelo muestra por primera vez el **camino completo** con **PC1, PC2 y PC3** en tercios iguales del largo: pista B = 3, 6 y 9 m; pista A = 2,68, 5,37 y 8,05 m.
  - Es la misma regla que `aprendizaje_gemelo.js → calcularPuntosControlEquitativos`.
- **3 segmentos de alto contraste**, con leyenda sobre el visor:
  - **S1 Base → PC1** (cian, `--tg-dark-accent`);
  - **S2 PC1 → PC2** (ámbar, `--tg-dark-warning`);
  - **S3 PC2 → PC3** (violeta, `--tg-dark-alarm`).
- **Velocidad:** crucero real `TG_ROBOT.velocidad.cruceroMs` (0,41 m/s), con un punto cada 2 s etiquetado con su segmento.
- **Nota de integración App:** en `tg-robot-ucab-app` el mapa usa los mismos 3 PC pero en **un solo color limpio**.
- **Ingeniería / Datos:** cada fila lleva un chip S1/S2/S3 con el color del mapa, y un filtro **Todos · S1 · S2 · S3**.
- Sin torretas ni obstáculos simulados en ninguna fase.

## Velocidad de referencia (valores reales, sin inventar)
| Valor | Origen |
|---|---|
| PWM lento **0,40** | P04 · mínimo del ajuste «Base» del PD (`codigo/main.js`) |
| PWM crucero **0,80** | P04 · `PD.base` del firmware (`codigo/sim.js`) |
| **0,57 m/s** al 100 % PWM | `TG_ROBOT.velocidad.pwm100Ms` |
| Crucero **0,41 m/s** · máx. **0,46 m/s** | `TG_ROBOT.velocidad.cruceroMs` / `maxMs` |
| ⇒ **Escaneo lento 0,228 m/s** | 0,40 × 0,57 (`primer_escaneo.js → velocidades()`) |

## Ingeniería / Datos (2 bloques)
1. **Registro del primer viaje:** una fila cada 2 s con:
   - `t`;
   - `s` (distancia recorrida);
   - pose `x, y, θ`;
   - 4 × TCRT5000;
   - HC-SR04P frontal y trasero como **paredes de referencia (línea base)**;
   - yaw de la MPU-6050;
   - velocidad.
2. **Consola de sensores en vivo:**
   - línea 4 × TCRT5000;
   - HC-SR04P frontal y trasero;
   - MPU-6050 (rumbo y ω);
   - velocidad y PWM.

## Supuestos (SIL, [PENDIENTE DE MEDICIÓN FÍSICA])
- Física de SIM1:
  - PWM 1,0 = 0,572 m/s;
  - ruedas de 0,18 s;
  - 0,18 m entre ruedas;
  - TCRT5000 a 6 cm del eje.
- El cierre del viaje lo decide el núcleo (estado final mostrado como `FIN_DE_RUTA`).

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | Interfaz del primer escaneo (canvas, nota App, cajón Ingeniería / Datos) |
| `primer_escaneo.js` | Velocidades de referencia y registro de un punto cada 2000 ms (sin DOM) |
| `segundo_escaneo.js` | PC1–PC3, 3 segmentos, etiqueta S1/S2/S3 por muestra y selector de fase (sin DOM) |
| `simulador_movimiento.js` | Planta: Frenet con curvatura, sensores, enseñanza, limitador (la página no inyecta obstáculos) |
| `pistas_sim1.js` | Adaptador de las pistas de SIM1 (κ(s), pose, rectitud) |
| `radar_us.js` | Lógica del radar de P03 (cono, rampa, velocímetro) |
| `gemelo_estado.js`, `aprendizaje_gemelo.js`, `capa3_operacional.js` | Módulos de fases posteriores (estado para la app, viajes de ajuste, Capa 3). La página no los carga; se conservan con sus pruebas. |
| `simulador_movimiento.test.js`, `pistas_radar.test.js` | 61 pruebas en Node: `node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` |
