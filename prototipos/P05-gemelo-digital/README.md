# P05 · Gemelo Digital · Primer escaneo de ruta (muestreo cada 2 s)

Gemelo digital de **movimiento** (SIL) enfocado en un solo viaje: el **primer escaneo lento** de la ruta, con toda la cinta puesta. Se abre por http (no por `file://`): carga `specs/navegacion/teach_and_repeat.js`, `specs/pista_canonica.json` y las pistas de SIM1 (`../P04-simulador-1-esp32/codigo/pista.js`) sin copiarlos.

Las torretas / Torres de Control quedan **fuera de esta pantalla**. Se integran en una fase posterior.

## Flujo
1. **Pista A o B** (las dos de SIM1): A = circuito histórico de 8,05 m · B = recorrido canónico de 9,0 m.
2. **🎓 Iniciar primer escaneo:** el núcleo teach-and-repeat sigue la línea a la **velocidad lenta real** y el gemelo guarda **un punto discreto cada 2 s** (2000 ms de tiempo de simulación).
   - El trazado se dibuja **solo con esos puntos**, sin una línea continua ni punteada.
   - Cada punto guarda la lectura instantánea de los sensores.
3. **Freno Remoto / Pausa** conservan el registro. **♻ Limpiar y reiniciar viaje** lo borra.
4. **Nota de integración App:** durante este escaneo, la app móvil (`tg-robot-ucab-app`) solo muestra **"Cargando..."**. El registro punto a punto es solo del gemelo.

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
   - HC-SR04P frontal y trasero;
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
| `simulador_movimiento.js` | Planta: Frenet con curvatura, sensores, enseñanza, limitador, obstáculos |
| `pistas_sim1.js` | Adaptador de las pistas de SIM1 (κ(s), pose, rectitud) |
| `radar_us.js` | Lógica del radar de P03 (cono, rampa, velocímetro) |
| `gemelo_estado.js`, `aprendizaje_gemelo.js`, `capa3_operacional.js` | Módulos de fases posteriores (estado para la app, viajes de ajuste, Capa 3). La página no los carga; se conservan con sus pruebas. |
| `simulador_movimiento.test.js`, `pistas_radar.test.js` | 58 pruebas en Node: `node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` |
