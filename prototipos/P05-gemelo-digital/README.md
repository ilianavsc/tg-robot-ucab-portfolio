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

## Calibración (Escaneos 3–5), Operación y Asignación de Paradas
- **Inicio apagado y navegación guiada:** al abrir `P05` el visor inicia vacío/apagado hasta pulsar **`⚡ Encender`**. Al terminar cada escaneo aparece automáticamente el botón guiado de siguiente paso (`Continuar al Escaneo 2 →`, `Continuar a Calibración (Escaneo 3) →`, `Iniciar Escaneo 4 →`, `Iniciar Escaneo 5 →`, `Ir a Operación y paradas →`).
- **Escaneo 2 (punteado cada 1 s) y Calibración 3–5 (punteado → sólido sin saltos):** en el Escaneo 2 la ruta se traza progresivamente como **línea punteada** con muestreo cada `1 s`. En Calibración (`3/5 → 4/5 → 5/5`, sin botones de salto) la pista inicia en línea punteada y se consolida progresivamente en **línea sólida coloreada** (`S1` → `S2` → `S3`) conforme avanza el robot.
- **Operación y asignación de paradas (sin simulación de obstáculos):** selector **mutuamente excluyente** entre **Ruta completa (sin parada)**, **Por Punto de Control (`PC1`–`PC3`)** y **Por Segmento (`S1`–`S3` + slider / `− 0,1 m` / `+ 0,1 m` / clic en mapa)**. Con `0/8` a `7/8` viajes verificados el botón **`📌 Fijar parada permanente`** permanece **oculto**; al llegar a **`≥ 8` viajes** aparece visible y habilitado para confirmar el re-escaneo lineal continuo (`Ida I1–I3` en `[0, s_parada]` + `Regreso R1–R3` hacia adelante en `[s_parada, L]`) con confirmación obligatoria del receptor.

## Velocidad de referencia (valores reales, sin inventar)
| Valor | Origen |
|---|---|
| PWM lento **0,40** | P04 · mínimo del ajuste «Base» del PD (`codigo/main.js`) |
| PWM crucero **0,80** | P04 · `PD.base` del firmware (`codigo/sim.js`) |
| **0,57 m/s** al 100 % PWM | `TG_ROBOT.velocidad.pwm100Ms` |
| Crucero **0,41 m/s** · máx. **0,46 m/s** | `TG_ROBOT.velocidad.cruceroMs` / `maxMs` |
| ⇒ **Escaneo lento 0,228 m/s** | 0,40 × 0,57 (`primer_escaneo.js → velocidades()`) |

## Ingeniería / Datos (2 bloques)
1. **Registro del viaje.** Por defecto muestra un **resumen visual**, sin tabla ni scroll horizontal:
   - **4 KPIs en 2×2:** muestras, distancia total, tiempo y velocidad media.
   - **Perfil SVG del recorrido:** estabilidad de los 4 × TCRT5000 (barra alta = centrada, media = corrigiendo, baja = sin línea) y la línea base de paredes de los HC-SR04P a lo largo de `s`. En el Escaneo 2 usa los colores de S1, S2 y S3.
   - **Botones:** **🔍 Ver datos exactos** y **♻ Limpiar y reiniciar viaje**.
   - **Modal «Datos exactos»:** la tabla completa del viaje, una fila cada 2 s, con todas las columnas sin recortes (`#`, `Segmento`, `t`, `s`, pose `x, y, θ`, `TCRT`, `Paredes ref. F / A`, yaw y velocidad) y el filtro **Todos · S1 · S2 · S3**. En móvil cada fila se muestra como tarjeta con sus etiquetas.
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
| `simulador_movimiento.test.js`, `pistas_radar.test.js` | 62 pruebas en Node: `node prototipos/P05-gemelo-digital/simulador_movimiento.test.js` |
