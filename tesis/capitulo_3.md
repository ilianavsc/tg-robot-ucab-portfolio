> Versión web del documento «Capítulo III. Marco metodológico» (formato del tomo UCAB · citas IEEE), sincronizada con el Word oficial `entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.docx`. Los índices con número de página se omitieron.

![Figura](media/capitulo_2/image1.png)

UNIVERSIDAD CATÓLICA ANDRÉS BELLO

Facultad de Ingeniería

Escuela de Ingeniería en Telecomunicaciones

Trabajo de Grado:

*“Robot móvil para búsqueda y transporte de componentes en el laboratorio de la UCAB con aplicación de solicitudes y alertas”*

Norma de citación y referenciación: IEEE

REALIZADO POR:

Semprun Cascitelli, Iliana Vanessa

Ferrer Pinto, Andrea Valentina

TUTOR:

Ing. Cante Mata, Biagio Domenico

Caracas, noviembre de 2026

# Capítulo III. Marco metodológico

En este capítulo se describe el procedimiento con el que se aborda el objetivo general del Trabajo de Grado: desarrollar un prototipo funcional de robot móvil autónomo de bajo costo, integrado con una aplicación de solicitudes y un sistema de comunicación IoT, para el transporte y la trazabilidad de componentes electrónicos en el laboratorio de la Escuela de Ingeniería en Telecomunicaciones de la UCAB, incorporando un mecanismo de alertas de seguridad ante manipulación no autorizada.

El capítulo se organiza de la siguiente manera. La sección III.1 define la modalidad, el tipo y el diseño de la investigación; la III.2 delimita la unidad de estudio y el entorno de validación; la III.3 describe el procedimiento metodológico, organizado en siete fases con una duración total de 32 semanas; la III.4 presenta las técnicas e instrumentos de recolección de datos y el protocolo de pruebas; la III.5 explica el análisis de los datos; la III.6 expone el cronograma de ejecución, y la III.7 cierra con la validez, la confiabilidad y las consideraciones éticas del estudio. Los nueve objetivos específicos, las siete fases y los siete criterios de validación se retoman del Capítulo I, mientras que las bases teóricas y las métricas de desempeño con las que se evalúa el prototipo provienen del Capítulo II.

## III.1 Modalidad, tipo y diseño de la investigación

### III.1.1 Modalidad de la investigación: proyecto especial

El Trabajo de Grado se enmarca en la modalidad de proyecto especial, habitual en los trabajos de grado de ingeniería. Según el manual de la Universidad Pedagógica Experimental Libertador [1], los proyectos especiales son trabajos que conducen a creaciones tangibles, susceptibles de ser utilizadas como soluciones a problemas demostrados, como el desarrollo de software, de prototipos y de productos tecnológicos en general. En este caso, la creación tangible es un sistema compuesto por un robot móvil, una aplicación de solicitudes y una arquitectura de comunicación inalámbrica basada en MQTT.

Un proyecto especial debe incluir la demostración de la necesidad de la creación, su fundamentación teórica, la descripción de la metodología utilizada y el resultado concreto del trabajo [1]. En el presente Trabajo de Grado, la necesidad se demuestra en el Capítulo I, a partir de la ausencia de un sistema automatizado de transporte interno y de trazabilidad de componentes en el laboratorio; la fundamentación teórica se desarrolla en el Capítulo II; la metodología se describe en este capítulo, y el resultado concreto, es decir, el prototipo construido y su evaluación en maqueta, corresponde a los capítulos siguientes.

### III.1.2 Tipo de investigación

Según su finalidad, la investigación es aplicada. Valerino, Yáber y Cemborain [2] señalan que la investigación cumple dos propósitos: producir conocimientos y teorías, en el caso de la investigación básica, y resolver problemas prácticos, en el caso de la investigación aplicada, que además de generar conocimiento busca soluciones aceptables y pertinentes a un fenómeno determinado. Las propuestas de trabajo de grado en ingeniería se orientan a ofrecer una solución a un problema presentado mediante la aplicación de conocimientos, por lo que se ubican en este tipo de investigación. Hernández Sampieri, Fernández y Baptista [3] coinciden en que la investigación aplicada utiliza el conocimiento disponible para resolver problemas concretos; aquí ese conocimiento, expuesto en el Capítulo II, se emplea para diseñar, construir y evaluar un artefacto original.

Según su propósito, la investigación es además proyectiva. Hurtado de Barrera [4] define la investigación proyectiva como aquella que, a partir del diagnóstico de una necesidad, elabora una propuesta, un plan o un modelo que da solución a un problema práctico, sin limitarse a describirlo o a explicarlo. Por último, el prototipo se somete a una validación experimental en una maqueta controlada, en la que se miden variables cuantitativas definidas de antemano y se analizan con métodos estadísticos, lo que confiere al estudio un enfoque cuantitativo en su etapa de evaluación [3].

### III.1.3 Diseño de la investigación

Arias [5] define el diseño de la investigación como la estrategia general que adopta el investigador para responder al problema planteado, y distingue los diseños documental, de campo y experimental. El presente trabajo combina los tres:

- **Diseño documental:** se empleó en la revisión de las fuentes que sustentan el marco teórico, de las hojas de datos de los componentes y de los estándares técnicos, así como en el registro de búsquedas documentales y en el análisis de cinco trabajos de grado previos.
- **Diseño de campo:** se aplicó en el levantamiento de información directamente en el laboratorio de la Escuela mediante una entrevista semiestructurada al personal encargado del almacén de componentes, realizada el 14 de noviembre de 2026, y se complementa con la observación directa del recorrido, del piso, de la iluminación y de la cobertura de la red inalámbrica, cuyos resultados sirven para dimensionar la maqueta de ensayo.
- **Diseño experimental:** se aplica en la evaluación del prototipo, en la que se manipulan de forma deliberada los factores del experimento, como el modo de navegación (línea pura, híbrido o autónomo en rutas conocidas) y el nivel de QoS de los mensajes (0, 1 o 2), y se mide su efecto sobre las variables de respuesta, como el error de posición, el tiempo de entrega y la latencia de comunicación, bajo condiciones controladas.

En una investigación aplicada, los objetivos pueden organizarse en un sistema de fases, tareas e hitos: las actividades y tareas constituyen la base del trabajo, se ordenan y agrupan en fases según su relación o dependencia, y cada fase concluye con un hito que indica su fin [2]. El desarrollo del prototipo sigue esta lógica mediante una estrategia iterativa e incremental: cada subsistema se diseña, se implementa y se verifica por separado antes de integrarse con los demás, de modo que cada fase culmina en un hito verificable y el riesgo técnico se reduce de manera progresiva. La lógica del firmware se verifica primero mediante pruebas unitarias ejecutadas en un computador y, después, en el hardware real con los sensores y los motores definitivos; los resultados de la verificación previa de la lógica no se extrapolan al desempeño físico del robot, que solo se reporta a partir de mediciones en el hardware y en la maqueta. La Tabla 1 resume la caracterización metodológica del estudio.

| Dimensión | Clasificación adoptada | Justificación en el Trabajo de Grado |
| --- | --- | --- |
| Modalidad | Proyecto especial | Produce una creación tangible, un prototipo, como solución a un problema demostrado en el Capítulo I [1]. |
| Tipo según la finalidad | Aplicada | Emplea el conocimiento del Capítulo II para resolver un problema práctico del laboratorio [2], [3]. |
| Tipo según el propósito | Proyectiva | Propone y desarrolla una solución a la necesidad de transporte y trazabilidad de componentes [4]. |
| Enfoque de la evaluación | Cuantitativo | Los siete criterios de validación se expresan como magnitudes medibles con un criterio de aceptación fijado antes de medir. |
| Diseño | Documental, de campo y experimental | Revisión de fuentes, levantamiento en el laboratorio y ensayos controlados en maqueta [5]. |
| Estrategia de desarrollo | Iterativa e incremental, en siete fases con sus hitos | Cada fase agrupa tareas relacionadas y culmina en un hito verificable asociado a uno o más objetivos específicos. |

**Tabla 1.** Caracterización metodológica de la investigación.

*Fuente: elaboración propia a partir de [1], [2], [3], [4] y [5].*

## III.2 Unidad de estudio y entorno de validación

### III.2.1 Unidad de estudio

La unidad de estudio es el sistema completo de transporte y trazabilidad, conformado por tres elementos que operan de forma conjunta: el robot móvil, la aplicación de solicitudes con su backend en la nube y la red de comunicación inalámbrica que los vincula a través del broker MQTT. Por tratarse de un proyecto especial de desarrollo tecnológico, no se trabaja con una población de individuos ni con un muestreo probabilístico de personas; la unidad de análisis es cada ensayo realizado sobre el prototipo. La muestra de cada prueba se define como el número de repeticiones de un mismo ensayo bajo condiciones controladas, con un mínimo de 20 repeticiones por prueba, de acuerdo con el requerimiento de confiabilidad de resultados (RNF-08) del documento de requerimientos elaborado en la Fase I; la sección III.5 expone el alcance estadístico de ese tamaño de muestra.

### III.2.2 Entorno de validación

El contexto de aplicación es el laboratorio de la Escuela de Ingeniería en Telecomunicaciones de la UCAB, en particular el trayecto entre el almacén de componentes y los puestos de trabajo. Para evaluar el prototipo bajo condiciones repetibles y medibles, se construye una maqueta controlada que reproduce ese trayecto. Esta maqueta responde al alcance declarado en el Capítulo I (sección I.4.2), que limita la validación a un único prototipo operando en una maqueta o entorno controlado.

La maqueta consiste en una ruta guiada por una cinta negra de alto contraste sobre un piso claro, con un origen que representa el almacén de componentes, un punto de control intermedio y un destino que representa el puesto de trabajo. La ruta se divide en segmentos delimitados por puntos de interés (cruces, giros y paradas), y en cada segmento se marcan puntos de referencia con posición conocida, medidos con cinta métrica respecto a un origen fijo, que sirven como valor de referencia para calcular el error de posición. En los extremos de la ruta se instalan dos balizas BLE fijas basadas en ESP32, que actúan como puntos de re-localización absoluta por proximidad a partir del RSSI [6]. La Tabla 2 recoge los parámetros nominales de diseño y las condiciones de ensayo.

| Parámetro | Valor nominal o condición de ensayo |
| --- | --- |
| Longitud de la ruta de ensayo y número de segmentos | Ruta de ida de 10 m a 15 m, dividida en 3 a 5 segmentos de 2 m a 4 m; valor preliminar que se ajusta a las medidas del trayecto real del laboratorio |
| Guía de recuperación | Cinta negra de 19 mm sobre piso claro |
| Puntos de referencia para el error de posición | Al menos uno por segmento, medidos con cinta métrica de 1 mm de resolución |
| Velocidad de diseño | Crucero de 0,41 m/s en seguimiento de línea y máxima de 0,46 m/s en recta, valores nominales que se verifican en el hardware; el requerimiento RNF-03 admite entre 0,35 m/s y 0,6 m/s |
| Detección de obstáculo frontal | Parada cuando el obstáculo está a menos de 20 cm (RF-05) y zona de precaución entre 20 cm y 50 cm |
| Periodo de publicación del estado del robot | Un mensaje cada 2 s (RF-02) |
| Batería | Li-Ion 3S de 10,8 V nominales y 12,6 V a plena carga, con corte de protección por software a 9,9 V |
| Infraestructura de re-localización | Dos balizas BLE fijas en los extremos de la ruta (RF-06) |
| Red de comunicación | Punto de acceso Wi-Fi dedicado a las pruebas, IEEE 802.11 b/g/n en la banda de 2,4 GHz, única banda en la que opera el ESP32 [7], con autenticación WPA2-Personal y un broker MQTT accesible desde esa red |
| Carga transportada | Componentes electrónicos livianos colocados de forma manual en un compartimiento simple; masa útil máxima preliminar de 200 g (RF-07), acorde con un pedido típico de pocas piezas livianas |

**Tabla 2.** Parámetros nominales de diseño y condiciones de ensayo en la maqueta.

*Fuente: elaboración propia a partir del documento de requerimientos de la Fase I, de las hojas de datos de los componentes y del diseño del prototipo.*

Los valores nominales de la Tabla 2 se contrastan con mediciones en el hardware durante las fases III a VII. Quedan fuera del entorno de validación, en coherencia con las limitaciones de la sección I.4.1, la operación de varios robots a la vez, la navegación en entornos no mapeados, la manipulación automatizada de la carga y la integración con sistemas de inventario institucionales.

## III.3 Procedimiento metodológico

El procedimiento se organiza en siete fases, con una duración total de 32 semanas. Cada fase agrupa las tareas de uno o varios objetivos específicos (OE) y culmina en un hito verificable. Antes de describir cada fase, la Tabla 3 presenta la correspondencia uno a uno entre los nueve objetivos específicos, los productos entregables y la fase en la que se obtiene cada uno.

| OE | Objetivo específico | Producto entregable | Fase |
| --- | --- | --- | --- |
| OE1 | Diseñar la arquitectura de comunicación inalámbrica del sistema (robot–aplicación–servidor) basada en el protocolo MQTT y servicios en la nube, definiendo los tópicos, la calidad de servicio (QoS) y los flujos de mensajes para órdenes, estado y alertas. | El diseño de la arquitectura de comunicación inalámbrica del sistema (robot–aplicación–servidor) basada en MQTT, con la definición de los tópicos, los niveles de QoS y los flujos de mensajes para órdenes, estado y alertas. | II |
| OE2 | Realizar un estudio comparativo y seleccionar los componentes de hardware (microcontrolador, controlador de motores, sensores, batería) bajo criterios de costo, consumo energético, disponibilidad y compatibilidad. | El estudio comparativo de los componentes de hardware, con su tabla comparativa, y la selección del microcontrolador, el controlador de motores, los sensores y la batería según criterios de costo, consumo energético, disponibilidad y compatibilidad. | I |
| OE3 | Diseñar y construir la plataforma mecánica del robot, con chasis impreso en 3D y configuración de tracción diferencial, acorde con las dimensiones, cargas y rutas del entorno del laboratorio. | La plataforma mecánica del robot diseñada y construida, con chasis impreso en 3D y tracción diferencial, junto con los planos del chasis. | II y III |
| OE4 | Desarrollar el firmware de control del robot, implementando el seguimiento de línea mediante control PID, la adquisición de sensores (línea, ultrasónicos e inercial) y la comunicación MQTT con el servidor. | El firmware funcional de control del robot (seguimiento de línea con PID, adquisición de los sensores de línea, ultrasónicos e inercial, y comunicación MQTT), con pruebas unitarias de lectura, control y transmisión. | III |
| OE5 | Implementar un esquema de navegación progresivo que combine el seguimiento de línea con odometría y fusión de sensores inerciales, incorporando puntos de re-localización absoluta para acotar la deriva acumulada en rutas previamente mapeadas. | El esquema de navegación progresiva implementado (seguimiento de línea, odometría, fusión de sensores inerciales y puntos de re-localización absoluta), validado por segmentos con mediciones de error de posición. | IV |
| OE6 | Desarrollar la aplicación móvil/web de solicitudes y el backend de trazabilidad, incluyendo catálogo de componentes, seguimiento del robot en tiempo real, historial de entregas y notificaciones. | La aplicación móvil/web de solicitudes integrada con el backend de trazabilidad, con catálogo de componentes, seguimiento del robot en tiempo real, historial de entregas y notificaciones. | V |
| OE7 | Implementar el módulo de alertas de seguridad anti-manipulación basado en el acelerómetro, definiendo los umbrales de detección y evaluando la tasa de detección y la tasa de falsas alarmas. | El módulo de alertas de seguridad anti-manipulación basado en el acelerómetro, con sus umbrales de detección definidos y la evaluación de su tasa de detección y su tasa de falsas alarmas. | VI |
| OE8 | Evaluar el desempeño integral del sistema mediante pruebas en una maqueta del laboratorio, midiendo la precisión de navegación, la latencia y fiabilidad de la comunicación, la autonomía energética y la eficacia de las alertas. | La evaluación del desempeño integral del sistema: informe de resultados de las pruebas en maqueta (precisión de navegación, latencia y fiabilidad de la comunicación, autonomía energética y eficacia de las alertas). | VII |
| OE9 | Documentar las limitaciones técnicas del sistema y proponer mejoras futuras orientadas a su escalabilidad y a su adaptación a otros entornos de aplicación. | La documentación de las limitaciones técnicas del sistema y la propuesta de mejoras futuras orientadas a su escalabilidad y a su adaptación a otros entornos de aplicación. | VII |

**Tabla 3.** Correspondencia entre los objetivos específicos, los productos entregables y las fases.

*Fuente: elaboración propia a partir de la Tabla 1 del Capítulo I.*

### III.3.1 Fase I: Investigación y diseño conceptual (4 semanas)

La primera fase estableció la base documental y los requerimientos del sistema, y atendió el OE2.

- **Tareas:** revisión bibliográfica de robótica móvil, control PID, fusión de sensores, protocolos de comunicación IoT y posicionamiento en interiores, que dio origen al marco teórico del Capítulo II; búsqueda y análisis de cinco trabajos de grado previos y registro de las búsquedas documentales; entrevista semiestructurada al personal encargado del almacén; definición de los requerimientos funcionales y no funcionales del sistema y de sus criterios de evaluación; y comparación y selección de los componentes de hardware según los criterios de costo, consumo energético, disponibilidad y compatibilidad.
- **Objetivos específicos cubiertos:** OE2.
- **Producto verificable:** el estudio comparativo de los componentes de hardware, con su tabla comparativa, y la selección del microcontrolador, el controlador de motores, los sensores y la batería según criterios de costo, consumo energético, disponibilidad y compatibilidad.
- **Hito de la fase:** documento de requerimientos y tabla comparativa de componentes.

### III.3.2 Fase II: Diseño mecánico y electrónico (4 semanas)

La segunda fase transforma los requerimientos en un diseño del sistema y atiende el OE1 y la etapa de diseño del OE3.

- **Tareas:** modelado CAD del chasis para impresión 3D en PLA y diseño de la tracción diferencial, con dos ruedas motrices y una rueda loca de apoyo; diseño del esquema electrónico (microcontrolador ESP32, driver de motores, sensores de línea, ultrasónicos e inercial, y alimentación separada en un dominio de potencia y otro de control) y del diagrama de bloques; diseño de la arquitectura de comunicación robot–aplicación–servidor sobre MQTT [8], con la definición de la jerarquía de tópicos, de los mensajes de órdenes, estado y alertas, y del nivel de QoS de cada flujo según su criticidad: QoS 0 para el estado periódico del robot, QoS 1 para las órdenes de entrega y QoS 2 para las alertas de seguridad, de acuerdo con lo expuesto en la sección II.2.7.5; y definición del uso de la sesión persistente, de los mensajes retenidos y del mensaje de última voluntad (LWT) para detectar la desconexión del robot.
- **Objetivos específicos cubiertos:** OE1 y OE3 (diseño).
- **Productos verificables:** el diseño de la arquitectura de comunicación inalámbrica del sistema (robot–aplicación–servidor) basada en MQTT, con la definición de los tópicos, los niveles de QoS y los flujos de mensajes para órdenes, estado y alertas; y los planos del chasis.
- **Hito de la fase:** planos del chasis, diagrama electrónico y diagrama de bloques del sistema.

### III.3.3 Fase III: Firmware de control y comunicaciones (6 semanas)

La tercera fase materializa la plataforma y su programa de control, y atiende el OE4 y la etapa de construcción del OE3.

- **Tareas:** impresión 3D del chasis y montaje de motores, encoders, sensores, driver y batería; programación del control de motores mediante PWM y del seguimiento de línea con un controlador PID [9], cuyas ganancias se ajustan de forma experimental empezando por la acción proporcional y añadiendo luego la derivativa y, de ser necesaria, la integral; adquisición e integración de los cuatro sensores ópticos de línea, de los dos sensores ultrasónicos frontal y trasero, y de la unidad inercial MPU-6050 por bus I²C [10]; implementación del cliente MQTT del robot, con los tópicos y niveles de QoS definidos en la fase II; e implementación de las reglas de seguridad del firmware: parada ante un obstáculo frontal a menos de 20 cm, detención si en modo manual transcurren 5 s sin órdenes y corte por batería baja a 9,9 V.
- **Objetivos específicos cubiertos:** OE3 (construcción) y OE4.
- **Productos verificables:** la plataforma mecánica del robot diseñada y construida, con chasis impreso en 3D y tracción diferencial, junto con los planos del chasis; y el firmware funcional de control del robot (seguimiento de línea con PID, adquisición de los sensores de línea, ultrasónicos e inercial, y comunicación MQTT), con pruebas unitarias de lectura, control y transmisión.
- **Hito de la fase:** firmware funcional con pruebas unitarias de lectura, control y transmisión.

### III.3.4 Fase IV: Navegación progresiva (5 semanas)

La cuarta fase implementa el núcleo del proyecto, la transición gradual desde el seguimiento de línea hacia la navegación basada en sensores en rutas conocidas, y atiende el OE5. Se siguen cinco etapas técnicas:

1. **Etapa 0, línea como guía y registro:** el robot recorre la ruta siguiendo la línea mientras registra, con marca de tiempo, las lecturas de los sensores de línea, las velocidades de los motores, los pulsos de los encoders, las lecturas de la IMU y las distancias ultrasónicas.
2. **Etapa 1, aprendizaje de la ruta:** a partir de esos registros se identifican los puntos de interés y se construye un mapa relativo de la ruta basado en odometría y en los patrones de los sensores de cada segmento.
3. **Etapa 2, segmentación y retirada gradual:** para cada segmento se calibra un controlador que usa odometría, IMU y ultrasonidos para mantener la trayectoria sin la línea; en modo híbrido, si la desviación supera un umbral, el robot vuelve al modo línea (*fallback*).
4. **Etapa 3, fusión de sensores y corrección periódica:** se combinan encoders e IMU mediante un filtro complementario o un filtro de Kalman simplificado [11], y se añaden los puntos de re-localización absoluta con las balizas BLE para acotar la deriva acumulada.
5. **Etapa 4, autonomía en rutas conocidas:** cuando el error de posición se mantiene dentro del criterio de aceptación, el robot recorre los segmentos sin línea, y la línea permanece como recurso de recuperación y seguridad.

- **Tareas complementarias:** caracterización de los errores sistemáticos de la odometría mediante recorridos de prueba en trayectorias cerradas, según el procedimiento de Borenstein y Feng [12], y medición del error de posición en los puntos de referencia de cada segmento.
- **Objetivos específicos cubiertos:** OE5.
- **Producto verificable:** el esquema de navegación progresiva implementado (seguimiento de línea, odometría, fusión de sensores inerciales y puntos de re-localización absoluta), validado por segmentos con mediciones de error de posición.
- **Hito de la fase:** navegación validada por segmentos con mediciones de error de posición.

### III.3.5 Fase V: Aplicación y backend (5 semanas)

La quinta fase desarrolla la interfaz con el usuario y el registro de las entregas, y atiende el OE6.

- **Tareas:** desarrollo de la aplicación móvil/web de solicitudes en Flutter, con catálogo de componentes, creación de pedidos, seguimiento del estado del robot en tiempo real e historial de entregas; integración con el backend en la nube para la autenticación de usuarios con roles diferenciados, la base de datos de pedidos y entregas, y el envío de notificaciones *push*; y conexión de la aplicación con el broker MQTT para enviar órdenes y recibir el estado y las alertas del robot.
- **Objetivos específicos cubiertos:** OE6.
- **Producto verificable:** la aplicación móvil/web de solicitudes integrada con el backend de trazabilidad, con catálogo de componentes, seguimiento del robot en tiempo real, historial de entregas y notificaciones.
- **Hito de la fase:** aplicación integrada con el backend y con trazabilidad de entregas.

### III.3.6 Fase VI: Integración y sistema de alertas (3 semanas)

La sexta fase une los subsistemas y completa el módulo de seguridad, y atiende el OE7.

- **Tareas:** ensamblaje del prototipo completo e integración hardware–firmware–aplicación; calibración del acelerómetro de la MPU-6050 en reposo y en movimiento normal [10]; definición de los umbrales de detección de manipulación a partir de la aceleración y la inclinación medidas mientras el robot no está en misión, según lo expuesto en la sección II.2.10.1, eligiendo el punto de operación sobre la curva ROC que equilibra la tasa de detección y la tasa de falsas alarmas [13]; generación de la alerta con la última ubicación conocida y su publicación con QoS 2; y configuración de un broker privado con autenticación de usuario y contraseña y cifrado TLS para las pruebas finales (RNF-05).
- **Objetivos específicos cubiertos:** OE7.
- **Producto verificable:** el módulo de alertas de seguridad anti-manipulación basado en el acelerómetro, con sus umbrales de detección definidos y la evaluación de su tasa de detección y su tasa de falsas alarmas.
- **Hito de la fase:** prototipo integrado con el sistema de alertas operativo.

### III.3.7 Fase VII: Pruebas, validación y documentación (5 semanas)

La última fase evalúa el sistema integrado frente a los criterios de validación y cierra la documentación, y atiende el OE8 y el OE9.

- **Tareas:** ejecución en la maqueta del protocolo de pruebas de la sección III.4, con un mínimo de 20 repeticiones por ensayo; análisis de los resultados según la sección III.5; identificación de las limitaciones técnicas observadas durante los ensayos y formulación de mejoras orientadas a la escalabilidad del sistema y a su adaptación a otros entornos; y redacción final del Trabajo de Grado y preparación de la defensa.
- **Objetivos específicos cubiertos:** OE8 y OE9.
- **Productos verificables:** la evaluación del desempeño integral del sistema: informe de resultados de las pruebas en maqueta (precisión de navegación, latencia y fiabilidad de la comunicación, autonomía energética y eficacia de las alertas); y la documentación de las limitaciones técnicas del sistema y la propuesta de mejoras futuras orientadas a su escalabilidad y a su adaptación a otros entornos de aplicación.
- **Hito de la fase:** informe de resultados, documento del Trabajo de Grado y material de defensa.

### III.3.8 Resumen de trazabilidad del procedimiento

La Tabla 4 resume, para cada fase, su duración, los objetivos específicos que cubre, sus tareas clave y el hito con el que culmina. Los nueve objetivos específicos quedan cubiertos y la suma de las duraciones es de 32 semanas.

| Fase | Duración | OE cubiertos | Tareas clave | Hito |
| --- | --- | --- | --- | --- |
| I. Investigación y diseño conceptual | 4 semanas | OE2 | Revisión bibliográfica, entrevista, requerimientos, comparación y selección de hardware | Documento de requerimientos y tabla comparativa de componentes |
| II. Diseño mecánico y electrónico | 4 semanas | OE1, OE3 | CAD del chasis, esquema electrónico, diagrama de bloques, tópicos y niveles de QoS | Planos del chasis, diagrama electrónico y diagrama de bloques del sistema |
| III. Firmware de control y comunicaciones | 6 semanas | OE3, OE4 | Impresión y montaje, PWM y PID, adquisición de sensores, cliente MQTT, reglas de seguridad | Firmware funcional con pruebas unitarias de lectura, control y transmisión |
| IV. Navegación progresiva | 5 semanas | OE5 | Registro y mapa relativo, segmentación con *fallback*, fusión de sensores, re-localización BLE | Navegación validada por segmentos con mediciones de error de posición |
| V. Aplicación y backend | 5 semanas | OE6 | Catálogo, pedidos, seguimiento, historial, autenticación, base de datos y notificaciones | Aplicación integrada con el backend y con trazabilidad de entregas |
| VI. Integración y sistema de alertas | 3 semanas | OE7 | Integración hardware–firmware–aplicación, calibración del acelerómetro, umbrales, broker con TLS | Prototipo integrado con el sistema de alertas operativo |
| VII. Pruebas, validación y documentación | 5 semanas | OE8, OE9 | Ensayos en maqueta, análisis de resultados, limitaciones y mejoras, redacción final | Informe de resultados, documento del Trabajo de Grado y material de defensa |
| **Total** | **32 semanas** | **OE1 a OE9** | | |

**Tabla 4.** Resumen de trazabilidad de las fases del procedimiento metodológico.

*Fuente: elaboración propia.*

## III.4 Técnicas e instrumentos de recolección de datos

### III.4.1 Técnicas e instrumentos

Arias [5] define la técnica de recolección de datos como el procedimiento o la forma particular de obtener información, y el instrumento como el recurso, dispositivo o formato, en papel o digital, que se utiliza para obtener, registrar o almacenar esa información. La Tabla 5 relaciona las técnicas del estudio con sus instrumentos y con la fase en la que se aplican.

| Técnica | Instrumento | Información registrada | Fase |
| --- | --- | --- | --- |
| Revisión documental | Registro de búsquedas documentales y fichas de análisis de trabajos de grado | Fuentes del marco teórico, antecedentes y parámetros de los componentes | I |
| Entrevista semiestructurada | Guía de entrevista organizada por bloques temáticos | Demanda de componentes, horarios, reglas del almacén, red inalámbrica y preocupaciones de seguridad | I |
| Observación directa | Hoja de observación del entorno | Recorrido, distancias, piso, iluminación, obstáculos y cobertura Wi-Fi | I y II |
| Pruebas unitarias | Casos de prueba del firmware y de la aplicación | Lectura de sensores, cálculo del control y formato de los mensajes | III y V |
| Medición experimental en maqueta | Plantillas de ensayo, cinta métrica, cronómetro, multímetro y video | Error de posición, tiempos, tensión y corriente de la batería y distancias de parada | III a VII |
| Registro automático de mensajes | Cliente MQTT de pruebas y archivos de registro en formato CSV | Marcas de tiempo, nivel de QoS y mensajes enviados, recibidos y duplicados | II, VI y VII |
| Registro del proceso | Bitácora semanal y registro de decisiones técnicas | Actividades, decisiones, justificación y evidencia de cada fase | I a VII |

**Tabla 5.** Técnicas e instrumentos de recolección de datos.

*Fuente: elaboración propia a partir de [5].*

Como instrumentos de referencia se emplean un multímetro digital con una resolución de 0,01 V en la escala de 20 V de corriente continua, un cronómetro con una resolución de 0,01 s y una cámara de video de al menos 30 cuadros por segundo para los tiempos cortos; el modelo y la resolución de cada instrumento se registran en la plantilla de cada sesión.

### III.4.2 Operacionalización de los criterios de validación

Los siete criterios de validación se operacionalizan como métricas cuantitativas, en correspondencia con las métricas de desempeño definidas en la sección II.2.12. Para cada una se establecen una unidad, un instrumento, un procedimiento de ensayo y un criterio de aceptación que se fija antes de medir. Los criterios que ya cuentan con un valor en el documento de requerimientos de la Fase I se indican con el código del requerimiento; los demás se establecen como criterios preliminares de aceptación, sujetos a ajuste fino durante la calibración experimental en maqueta. La Tabla 6 presenta esta operacionalización.

| Criterio | Métrica y unidad | Instrumento | Procedimiento de ensayo | Criterio de aceptación preliminar |
| --- | --- | --- | --- | --- |
| 1. Precisión de navegación | Error de posición ep: medio, máximo y RMSE (cm) | Cinta métrica, puntos de referencia y registro de la pose estimada | Recorrer la ruta en modo híbrido o autónomo y medir en cada punto de referencia la distancia entre la posición estimada y la real; al menos 20 recorridos | Error medio ≤ 5 cm y error máximo ≤ 10 cm en los puntos de referencia (RF-04) |
| 2. Tasa de éxito por segmento | Segmentos completados sin volver al modo línea / segmentos intentados (%) | Registro de eventos de *fallback* del robot | Intentar cada segmento sin línea y contar los que se completan sin *fallback*; al menos 20 intentos por segmento | ≥ 80 % de segmentos completados sin *fallback* |
| 3. Tiempo de entrega | Duración del ciclo solicitud–entrega (s) | Marcas de tiempo de la aplicación y cronómetro | Ejecutar el ciclo completo en modo línea puro y en modo híbrido o autónomo; al menos 20 ciclos por modo | Ciclo completo ≤ 3 min en la ruta de ensayo; el modo híbrido o autónomo no supera en más de 10 % el tiempo del modo línea |
| 4. Robustez de las alertas | Tasa de detección TD y tasa de falsas alarmas TFA (%); tiempo hasta la notificación (s) | Matriz de confusión, registro de alertas y cronómetro | Provocar manipulaciones controladas (levantamiento, empuje y giro) con el robot fuera de misión y realizar recorridos normales sin manipulación; al menos 20 eventos de cada tipo | Cada alerta llega una sola vez a la aplicación (RF-08) y la notificación tarda ≤ 5 s (RF-09); TD ≥ 95 % y TFA ≤ 5 % |
| 5. Consumo energético | Autonomía taut (h) y corriente media (A) | Multímetro, lectura de tensión de la batería y cronómetro | Operar el robot en ciclos de entrega continuos desde carga completa (12,6 V) hasta el corte de protección (9,9 V) | Autonomía ≥ 2 h de operación continua (RNF-02) |
| 6. Recuperación ante fallo | Tiempo hasta alcanzar un modo seguro (s) y porcentaje de recuperaciones exitosas | Registro de estados del robot, video y cronómetro | Inducir pérdida de línea, desviación sobre el umbral, obstáculo frontal y pérdida de conexión; al menos 20 eventos de cada tipo | Parada ante obstáculo a menos de 20 cm (RF-05) y aviso de desconexión en menos de 30 s (RF-03); modo seguro en ≤ 2 s ante pérdida de línea o desviación, con 100 % de recuperaciones exitosas |
| 7. Latencia de comunicación | RTT de los mensajes MQTT: mediana y percentil 95 (ms) y tasa de entrega (%), por nivel de QoS | Cliente MQTT de pruebas con marcas de tiempo en un mismo dispositivo y registro CSV | Enviar series de mensajes de eco con QoS 0, 1 y 2 en la red del laboratorio; series de 200 mensajes por nivel, repetidas en 3 sesiones | 0 pedidos perdidos en 50 con QoS 1 (RF-01, RNF-04); mediana del RTT ≤ 200 ms con QoS 0, ≤ 300 ms con QoS 1 y ≤ 500 ms con QoS 2, y percentil 95 ≤ 1 s |

**Tabla 6.** Operacionalización de los criterios de validación.

*Fuente: elaboración propia a partir del documento de requerimientos de la Fase I y de la Tabla 9 del Capítulo II.*

### III.4.3 Protocolo de pruebas

Para que los ensayos sean comparables entre sí, cada sesión de pruebas sigue un mismo protocolo:

1. **Preparación:** cargar la batería hasta 12,6 V, verificar la calibración de los sensores de línea sobre la cinta y sobre el piso, comprobar la conexión con el broker y anotar la versión del firmware y de la aplicación.
2. **Registro de condiciones:** anotar la fecha, las responsables, la tensión inicial de la batería, el tipo de piso, la iluminación y la intensidad de la señal Wi-Fi en el punto de origen.
3. **Ejecución:** realizar el ensayo el número de veces establecido en la Tabla 6, sin modificar parámetros del firmware entre repeticiones de una misma serie.
4. **Registro de resultados:** anotar cada repetición en la plantilla del ensayo y conservar los archivos de registro de mensajes y los videos como evidencia.
5. **Cierre:** anotar las incidencias y descartar solo las repeticiones invalidadas por una causa externa documentada, como un corte de energía del laboratorio o la caída de la red institucional.

La latencia se mide como tiempo de ida y vuelta (RTT) en un mismo dispositivo, lo que evita la necesidad de sincronizar los relojes del robot y de la aplicación, según lo expuesto en la sección II.2.12. Cada serie de mensajes se discrimina por nivel de QoS, ya que el número de paquetes que intercambia cada nivel condiciona el retardo y la probabilidad de pérdida [14].

## III.5 Análisis de datos y validación

Los datos de cada ensayo se procesan con estadística descriptiva y se comparan con el criterio de aceptación correspondiente de la Tabla 6, de la siguiente manera:

- **Magnitudes continuas** (error de posición, tiempos, latencia y autonomía): se calculan la media, la desviación estándar muestral, el mínimo, el máximo y, cuando corresponde, la mediana y el percentil 95. Para el error de posición se reportan además el error máximo y la raíz del error cuadrático medio (RMSE), que penaliza más los errores grandes [15]. La incertidumbre de las mediciones directas se estima a partir de la resolución de cada instrumento [16].
- **Proporciones** (tasa de éxito por segmento, tasa de entrega de mensajes, TD, TFA y recuperaciones exitosas): se calculan como porcentaje y se acompañan de su intervalo de confianza al 95 % por el método exacto de Clopper y Pearson [17]. Este tratamiento es necesario porque un resultado sin fallos en una muestra pequeña no demuestra una tasa de fallo nula: con 20 repeticiones sin fallos solo puede afirmarse, con 95 % de confianza, una tasa de fallo de hasta aproximadamente 14 %; con 50, de hasta aproximadamente 6 %. Se adopta un nivel de confianza del 95 %, habitual en la evaluación experimental en ingeniería.
- **Alertas:** los eventos se clasifican en una matriz de confusión (verdaderos positivos, falsos negativos, falsos positivos y verdaderos negativos), de la que se obtienen la TD y la TFA, según la sección II.2.10.2 [13].
- **Comparaciones:** el tiempo de entrega y el error de posición se comparan entre el modo línea puro y el modo híbrido o autónomo, y la latencia y la tasa de entrega se comparan entre los niveles de QoS 0, 1 y 2. Cada comparación se presenta con la diferencia absoluta y relativa entre las medias y con la dispersión de cada grupo.

Un criterio se considera cumplido cuando el estadístico de interés satisface el umbral de la Tabla 6; en el caso de las proporciones, se reporta además el límite del intervalo de confianza para mostrar el grado de certeza del resultado. Los resultados se presentan en tablas y gráficos generados a partir de los archivos de registro de cada sesión. La Tabla 7 resume el tratamiento de los datos por criterio.

| Criterio | Estadísticos reportados | Comparación |
| --- | --- | --- |
| Precisión de navegación | Media, máximo y RMSE de ep | Modo línea frente a modo híbrido o autónomo, por segmento |
| Tasa de éxito por segmento | Porcentaje e intervalo de Clopper-Pearson al 95 % | Entre segmentos de la ruta |
| Tiempo de entrega | Media, desviación estándar, mínimo y máximo | Modo línea frente a modo híbrido o autónomo |
| Robustez de las alertas | TD y TFA con su intervalo al 95 %; media del tiempo de notificación | Por tipo de manipulación |
| Consumo energético | Autonomía media y corriente media | Frente a la autonomía estimada en el diseño |
| Recuperación ante fallo | Media y máximo del tiempo; porcentaje de éxito | Por tipo de fallo inducido |
| Latencia de comunicación | Mediana, percentil 95 y tasa de entrega | Entre QoS 0, QoS 1 y QoS 2 |

**Tabla 7.** Tratamiento de los datos por criterio de validación.

*Fuente: elaboración propia.*

## III.6 Cronograma de ejecución

El cronograma se estima en 32 semanas, dentro del rango reglamentario de la Escuela (mínimo 20 y máximo 52 semanas), contadas a partir del inicio del Trabajo de Grado. La Tabla 8 presenta la duración y el período de cada fase.

| Fase | Descripción | Semanas | Período | Duración |
| --- | --- | --- | --- | --- |
| I | Investigación y diseño conceptual | 1 a 4 | 26 oct. – 20 nov. 2026 | 4 semanas |
| II | Diseño mecánico y electrónico | 5 a 8 | 23 nov. – 18 dic. 2026 | 4 semanas |
| III | Firmware de control y comunicaciones (PID, sensores, MQTT) | 9 a 14 | 21 dic. 2026 – 5 feb. 2027 | 6 semanas |
| IV | Navegación progresiva (odometría, fusión de sensores, re-localización) | 15 a 19 | 8 feb. – 12 mar. 2027 | 5 semanas |
| V | Aplicación de solicitudes y backend de trazabilidad | 20 a 24 | 15 mar. – 16 abr. 2027 | 5 semanas |
| VI | Integración del sistema y módulo de alertas | 25 a 27 | 19 abr. – 7 may. 2027 | 3 semanas |
| VII | Pruebas, validación y documentación final | 28 a 32 | 10 may. – 11 jun. 2027 | 5 semanas |
| | **Total** | **1 a 32** | **26 oct. 2026 – 11 jun. 2027** | **32 semanas** |

**Tabla 8.** Cronograma de ejecución por fases.

*Fuente: elaboración propia.*

La fase III abarca el período de receso de fin de año, y la semana de evaluaciones parciales de enero se emplea como semana adicional de trabajo de esa fase. De ser necesario, las fechas de la Tabla 8 se ajustan al calendario oficial de la Escuela, sin alterar la duración de cada fase.

## III.7 Validez, confiabilidad y consideraciones éticas

**Validez.** Los criterios de aceptación se fijan antes de realizar las mediciones, a partir del documento de requerimientos, lo que evita ajustar los umbrales a los resultados obtenidos. Las métricas se definen de forma operativa con base en el Capítulo II, y los valores de referencia de la posición se obtienen con instrumentos externos al robot.

**Confiabilidad.** Cada ensayo se repite como mínimo 20 veces bajo un protocolo común, se registran las condiciones de cada sesión y se conservan los datos crudos de cada repetición. El código del firmware y de la aplicación se mantiene bajo control de versiones, de modo que cada sesión de pruebas puede asociarse con la versión exacta del programa evaluado.

**Consideraciones éticas.** La entrevista y la observación con el personal del laboratorio tienen fines exclusivamente académicos, y en el documento no se publican nombres ni datos personales de los participantes. Antes de cada actividad de campo se solicita el consentimiento informado de los participantes y la autorización para tomar fotografías en el laboratorio, y ambos documentos se incorporan como anexo del Trabajo de Grado. Las credenciales de la red inalámbrica y del broker se mantienen fuera del código fuente y de los documentos del Trabajo de Grado.

# Bibliografía

[1] Universidad Pedagógica Experimental Libertador, *Manual de trabajos de grado de especialización y maestría y tesis doctorales*, 5.ª ed. Caracas, Venezuela: FEDUPEL, 2016.

[2] E. Valerino, G. Yáber y M. Cemborain, *Metodología de la investigación paso a paso*. México: Trillas, 2010.

[3] R. Hernández Sampieri, C. Fernández Collado y P. Baptista Lucio, *Metodología de la investigación*, 5.ª ed. México D. F., México: McGraw-Hill, 2010.

[4] J. Hurtado de Barrera, *Metodología de la investigación: guía para una comprensión holística de la ciencia*, 4.ª ed. Caracas, Venezuela: Quirón Ediciones, 2010.

[5] F. G. Arias, *El proyecto de investigación: introducción a la metodología científica*, 6.ª ed. Caracas, Venezuela: Episteme, 2012.

[6] R. Ramirez, C.-Y. Huang, C.-A. Liao, P.-T. Lin, H.-W. Lin y S.-H. Liang, “A practice of BLE RSSI measurement for indoor positioning,” *Sensors*, vol. 21, n.º 15, art. 5181, 2021, doi: 10.3390/s21155181.

[7] Espressif Systems, *ESP32 Series Datasheet*. Accedido: 9 nov. 2026. [En línea]. Disponible: https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf

[8] A. Banks, E. Briggs, K. Borgendale y R. Gupta, Eds., *MQTT Version 5.0*, OASIS Standard, 7 mar. 2019. [En línea]. Disponible: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html

[9] K. J. Åström y R. M. Murray, *Feedback Systems: An Introduction for Scientists and Engineers*. Princeton, NJ, EE. UU.: Princeton University Press, 2008.

[10] TDK InvenSense, *MPU-6000 and MPU-6050 Product Specification*, Rev. 3.4, 2013. Accedido: 9 nov. 2026. [En línea]. Disponible: https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/

[11] V. Ušinskis, M. Nowicki, A. Dzedzickis y V. Bučinskas, “Sensor-fusion based navigation for autonomous mobile robot,” *Sensors*, vol. 25, n.º 4, art. 1248, 2025, doi: 10.3390/s25041248.

[12] J. Borenstein y L. Feng, “Measurement and correction of systematic odometry errors in mobile robots,” *IEEE Trans. Robot. Autom.*, vol. 12, n.º 6, pp. 869-880, dic. 1996, doi: 10.1109/70.544770.

[13] T. Fawcett, “An introduction to ROC analysis,” *Pattern Recognit. Lett.*, vol. 27, n.º 8, pp. 861-874, 2006, doi: 10.1016/j.patrec.2005.10.010.

[14] S. Lee, H. Kim, D.-K. Hong y H. Ju, “Correlation analysis of MQTT loss and delay according to QoS level,” en *Proc. Int. Conf. Inf. Netw. (ICOIN)*, 2013, pp. 714-717, doi: 10.1109/ICOIN.2013.6496715.

[15] R. Siegwart, I. R. Nourbakhsh y D. Scaramuzza, *Introduction to Autonomous Mobile Robots*, 2.ª ed. Cambridge, MA, EE. UU.: MIT Press, 2011.

[16] Joint Committee for Guides in Metrology, *Evaluation of Measurement Data: Guide to the Expression of Uncertainty in Measurement*, JCGM 100:2008, Sèvres, Francia: BIPM, 2008.

[17] C. J. Clopper y E. S. Pearson, “The use of confidence or fiducial limits illustrated in the case of the binomial,” *Biometrika*, vol. 26, n.º 4, pp. 404-413, dic. 1934, doi: 10.2307/2331986.
