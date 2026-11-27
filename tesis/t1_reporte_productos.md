> Versión web de la tarea **T1 · Reporte de Productos** del Seminario de Grado, entregada el 23 de septiembre de 2026. Relaciona cada objetivo específico de la Propuesta con el producto entregable que demuestra su cumplimiento.

**UNIVERSIDAD CATÓLICA ANDRÉS BELLO**

Facultad de Ingeniería · Escuela de Ingeniería en Telecomunicaciones

# Formato para Reporte de Productos · Trabajo de Grado

| Campo | Detalle |
|---|---|
| **Fecha** | 23 de septiembre de 2026 |
| **Nombre integrantes** | Iliana Vanessa Semprun Cascitelli y Andrea Valentina Ferrer Pinto |
| **Nombre propuesta** | Robot móvil para búsqueda y transporte de componentes en el laboratorio de la UCAB con aplicación de solicitudes y alertas. |

## Objetivo General

Desarrollar un prototipo funcional de robot móvil autónomo de bajo costo, integrado con una aplicación de solicitudes y un sistema de comunicación IoT, para el transporte y la trazabilidad de componentes electrónicos en el laboratorio de la Escuela de Ingeniería en Telecomunicaciones de la UCAB, incorporando un mecanismo de alertas de seguridad ante manipulación no autorizada.

## Correspondencia entre objetivos específicos y productos

| N.º | Objetivo Específico | Producto |
|---|---|---|
| 1 | Diseñar la arquitectura de comunicación inalámbrica del sistema (robot–aplicación–servidor) basada en el protocolo MQTT y servicios en la nube, definiendo los tópicos, la calidad de servicio (QoS) y los flujos de mensajes para órdenes, estado y alertas. | El diseño de la arquitectura de comunicación inalámbrica del sistema (robot–aplicación–servidor) basada en MQTT, con la definición de los tópicos, los niveles de QoS y los flujos de mensajes para órdenes, estado y alertas. |
| 2 | Realizar un estudio comparativo y seleccionar los componentes de hardware (microcontrolador, controlador de motores, sensores, batería) bajo criterios de costo, consumo energético, disponibilidad y compatibilidad. | El estudio comparativo de los componentes de hardware, con su tabla comparativa, y la selección del microcontrolador, el controlador de motores, los sensores y la batería según criterios de costo, consumo energético, disponibilidad y compatibilidad. |
| 3 | Diseñar y construir la plataforma mecánica del robot, con chasis impreso en 3D y configuración de tracción diferencial, acorde con las dimensiones, cargas y rutas del entorno del laboratorio. | La plataforma mecánica del robot diseñada y construida, con chasis impreso en 3D y tracción diferencial, junto con los planos del chasis. |
| 4 | Desarrollar el firmware de control del robot, implementando el seguimiento de línea mediante control PID, la adquisición de sensores (línea, ultrasónicos e inercial) y la comunicación MQTT con el servidor. | El firmware funcional de control del robot (seguimiento de línea con PID, adquisición de los sensores de línea, ultrasónicos e inercial, y comunicación MQTT), con pruebas unitarias de lectura, control y transmisión. |
| 5 | Implementar un esquema de navegación progresivo que combine el seguimiento de línea con odometría y fusión de sensores inerciales, incorporando puntos de re-localización absoluta para acotar la deriva acumulada en rutas previamente mapeadas. | El esquema de navegación progresiva implementado (seguimiento de línea, odometría, fusión de sensores inerciales y puntos de re-localización absoluta), validado por segmentos con mediciones de error de posición. |
| 6 | Desarrollar la aplicación móvil/web de solicitudes y el backend de trazabilidad, incluyendo catálogo de componentes, seguimiento del robot en tiempo real, historial de entregas y notificaciones. | La aplicación móvil/web de solicitudes integrada con el backend de trazabilidad, con catálogo de componentes, seguimiento del robot en tiempo real, historial de entregas y notificaciones. |
| 7 | Implementar el módulo de alertas de seguridad anti-manipulación basado en el acelerómetro, definiendo los umbrales de detección y evaluando la tasa de detección y la tasa de falsas alarmas. | El módulo de alertas de seguridad anti-manipulación basado en el acelerómetro, con sus umbrales de detección definidos y la evaluación de su tasa de detección y su tasa de falsas alarmas. |
| 8 | Evaluar el desempeño integral del sistema mediante pruebas en una maqueta del laboratorio, midiendo la precisión de navegación, la latencia y fiabilidad de la comunicación, la autonomía energética y la eficacia de las alertas. | La evaluación del desempeño integral del sistema: informe de resultados de las pruebas en maqueta (precisión de navegación, latencia y fiabilidad de la comunicación, autonomía energética y eficacia de las alertas). |
| 9 | Documentar las limitaciones técnicas del sistema y proponer mejoras futuras orientadas a su escalabilidad y a su adaptación a otros entornos de aplicación. | La documentación de las limitaciones técnicas del sistema y la propuesta de mejoras futuras orientadas a su escalabilidad y a su adaptación a otros entornos de aplicación. |
