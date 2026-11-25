# P06 Ruta lineal con reposicionamiento manual

**Fase:** IV · Navegación progresiva (semana 17)
**Responsable:** Iliana Semprun y Andrea Ferrer
**Fecha:** 2026-11-24

👉 **Versión visual:** [index.html](index.html)

## En una frase
El robot va por la línea desde la base hasta el destino, se detiene y avisa; una persona lo gira media vuelta, confirma, y el robot vuelve solo a la base.

## La comparación
Como un carrito de supermercado en un pasillo sin espacio para dar la vuelta: al llegar al fondo alguien lo gira a mano y lo empuja de regreso.

## 1. Objetivo
Validar en simulación (SIL) el ciclo de una ruta lineal de ida y vuelta con reposicionamiento manual en el destino, y la lectura de los 4 sensores del robot durante todo el ciclo.

## 2. Requisito que valida
- Llegada al destino detectada por la regleta (marca transversal `1111`) con motores bloqueados y alarma.
- Detención ante obstáculo frontal a menos de 20 cm (RF-05) y velocidad máxima de 0,46 m/s (RNF-03, dentro de 0,35–0,6 m/s).

## 3. Simulador y enlace
[`index.html`](index.html): escena 2.5D en canvas (pasillo, base, línea guía, marca de parada, robot y vista de detalle) y panel lateral con dos pestañas:
- **Operación:** estado de la máquina, controles (Iniciar ida, Inyectar obstáculo, Girar 180° y confirmar, Reiniciar) y registro del recorrido.
- **Consola de sensores:** TCRT5000 (4 canales), HC-SR04 (5–80 cm, con slider para inyectar obstáculo), Velocidad/Dirección (máx. 0,46 m/s, PWM y bloqueo) y MPU-6050 (rumbo/yaw, pitch, roll e impacto/inclinación).

Un único estado central (`SimulationState`, en [`ruta_lineal.js`](ruta_lineal.js)) mueve la pista, la alarma y la consola. La interfaz está en [`ruta_lineal_ui.js`](ruta_lineal_ui.js), sin librerías ni compilación.

### Máquina de estados
```
EN_BASE ──Iniciar ida──▶ EN_RUTA_IDA ──regleta 1111 en la parada──▶ ESPERA_REPOSICION
   ▲                                                                   │ alarma + motores bloqueados
   │                                                     Girar 180° y confirmar (yaw 180° ± 5°, regleta en la cinta)
   └──regleta 1111 en la base── EN_RUTA_RETORNO ◀──────────────────────┘
```
Desde la base, la siguiente ida empieza con un giro automático de 180° sobre la marca de inicio [supuesto de simulación].

### Gemelo digital 3D
La escena es un gemelo digital 3D ([`codigo/gemelo3d.js`](codigo/gemelo3d.js) → `gemelo3d.js`) con el **mismo robot 3D oficial de P02/P04**: se importa `buildRobot` de `prototipos/P04-simulador-1-esp32/codigo/robot.js` (el modelo de P02 con opciones) sin copiarlo ni modificarlo. Muestra la base, la cinta guía, los **puntos de control PC1–PC3** (gris pendiente, cian cruzado en la ida, verde cruzado en el retorno; el estado vive en `SimulationState.puntosControl`), la marca de parada/destino, el obstáculo inyectado y el aro violeta de la alarma. La cámara **sigue al robot** o muestra la **vista completa de la pista** (botón en la escena; en ambas se puede rotar y hacer zoom). No tiene bucle propio: `ruta_lineal_ui.js` lo dibuja desde su único `requestAnimationFrame`, que se pausa con la pestaña oculta. Sin WebGL se usa la vista 2D de respaldo.
```bash
cd prototipos/P06-ruta-lineal/codigo
npm install --no-save three@0.187.0 esbuild   # una sola vez
node construir.mjs                            # genera ../gemelo3d.js
```

## 4. Cómo se prueba
```bash
node prototipos/P06-ruta-lineal/ruta_lineal.test.js   # 10 pruebas, sin navegador
```
En el navegador (por http): Iniciar ida → esperar la alarma → Girar robot 180° y confirmar → ver el retorno. Probar también el obstáculo (slider 5–80 cm) y los eventos de la IMU.

## 5. Criterio de éxito
- La secuencia `EN_BASE → EN_RUTA_IDA → ESPERA_REPOSICION → EN_RUTA_RETORNO → EN_BASE` se cumple y se repite.
- En la espera: patrón `1111`, PWM 0 y alarma "Destino alcanzado — reposicionar robot 180° para retorno".
- Tras el giro, la IMU marca 180° y el retorno arranca solo.
- Con un obstáculo a menos de 20 cm el robot se detiene y sigue al retirarlo.

## 6. Resultado
| Prueba | Resultado | Evidencia |
|---|---|---|
| Ida siguiendo la línea | ✅ SIL | [01](evidencias/01-ida-siguiendo-linea.jpg) |
| Alarma y motores bloqueados en el destino | ✅ SIL | [02](evidencias/02-alarma-espera-reposicion.jpg) |
| Giro de 180° y consola de sensores | ✅ SIL | [03](evidencias/03-giro-180-consola-sensores.jpg) |
| Retorno en el teléfono (390×844) | ✅ SIL | [04](evidencias/04-movil-390x844-retorno.jpg) |

## 7. Qué se reutiliza en el robot real
La máquina de estados del ciclo, las reglas de llegada por marca transversal (`1111`), el bloqueo de motores en la espera y la validación del giro con el rumbo de la MPU-6050.

## 8. Qué falta validar con hardware
Largo del pasillo (6 m de ejemplo), ancho real de la marca de parada, distancia de frenado sobre la marca, tolerancia del rumbo tras el giro manual y deriva del giroscopio [PENDIENTE DE MEDICIÓN FÍSICA].

## 9. Para el tomo
Diagrama de la máquina de estados (arriba) y la captura de la alarma en `ESPERA_REPOSICION`.
