> Versión final del documento «Capítulo III. Marco metodológico» (Normas UCAB · citas IEEE), sincronizada con el Word oficial `entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.docx`. Los índices con número de página se omitieron.

![Figura](media/capitulo_2/image1.png)

UNIVERSIDAD CATÓLICA ANDRÉS BELLO

Facultad de Ingeniería

Escuela de Ingeniería en Telecomunicaciones

Trabajo de Grado:

*“Robot móvil para búsqueda y transporte de componentes en el laboratorio de la UCAB con aplicación de solicitudes y alertas”*

REALIZADO POR:

Semprun Cascitelli, Iliana Vanessa

Ferrer Pinto, Andrea Valentina

TUTOR:

Ing. Cante Mata, Biagio Domenico

Caracas, noviembre de 2026

# Capítulo III. Marco metodológico

En este capítulo se describe el procedimiento que se siguió para alcanzar el objetivo general del Trabajo de Grado: desarrollar un prototipo funcional de robot móvil autónomo de bajo costo, integrado con una aplicación de solicitudes y un sistema de comunicación IoT, para el transporte y la trazabilidad de componentes electrónicos en el laboratorio de la Escuela de Ingeniería en Telecomunicaciones de la UCAB, incorporando un mecanismo de alertas de seguridad ante manipulación no autorizada.

El capítulo da continuidad a la propuesta del Trabajo de Grado, al reporte de productos, al Capítulo I y al Capítulo II. De la propuesta y del Capítulo I se retomaron los nueve objetivos específicos, las siete fases de trabajo con una duración total de 32 semanas, los siete criterios de validación y los alcances y limitaciones del estudio; del reporte de productos, el producto verificable asociado a cada objetivo; y del Capítulo II, las bases teóricas y las métricas de desempeño con las que se evaluó el prototipo. El contenido se organizó en siete secciones: el tipo y el diseño de la investigación, la unidad de estudio y el entorno de validación, el procedimiento metodológico por fases, las técnicas e instrumentos de recolección de datos junto con el protocolo de pruebas, el análisis de los datos, el cronograma de ejecución y, finalmente, las consideraciones de validez y confiabilidad.

## III.1 Tipo y diseño de la investigación

### III.1.1 Tipo de investigación

Según su propósito, la investigación se clasificó como proyectiva. Hurtado de Barrera [1] define la investigación proyectiva como aquella que, a partir del diagnóstico de una necesidad, elabora una propuesta, un plan o un modelo que da solución a un problema práctico, sin limitarse a describirlo o a explicarlo. En este caso, la necesidad diagnosticada en el Capítulo I fue la ausencia de un sistema automatizado de transporte interno y de trazabilidad de componentes en el laboratorio, y la solución propuesta fue un sistema compuesto por un robot móvil, una aplicación de solicitudes y una arquitectura de comunicación inalámbrica basada en MQTT.

Por la naturaleza de su resultado, el trabajo fue además una investigación aplicada de desarrollo tecnológico. Hernández Sampieri, Fernández y Baptista [2] señalan que la investigación aplicada busca resolver problemas concretos mediante el uso del conocimiento disponible; aquí ese conocimiento, expuesto en el Capítulo II, se empleó para diseñar, construir y evaluar un artefacto original. Por último, el prototipo se sometió a una validación experimental en una maqueta controlada, en la que se midieron variables cuantitativas definidas de antemano, lo que dio al estudio un enfoque cuantitativo en su etapa de evaluación [2].

### III.1.2 Diseño de la investigación

Arias [3] define el diseño de la investigación como la estrategia general que adopta el investigador para responder al problema planteado, y distingue los diseños documental, de campo y experimental. El presente trabajo combinó los tres:

- **Diseño documental:** se empleó en la revisión de las fuentes que sustentaron el marco teórico, las hojas de datos de los componentes y los estándares técnicos, así como en el registro de búsquedas documentales y el análisis de trabajos de grado previos.
- **Diseño de campo:** se aplicó en el levantamiento de información directamente en el laboratorio de la Escuela, mediante la entrevista al personal encargado del almacén de componentes y la observación del recorrido, del piso, de la iluminación y de la cobertura de la red inalámbrica.
- **Diseño experimental:** se aplicó en la evaluación del prototipo, en la que se manipularon de forma deliberada variables independientes, como el modo de navegación (línea pura, híbrido o autónomo en rutas conocidas) y el nivel de QoS de los mensajes (0, 1 o 2), y se midió su efecto sobre variables dependientes, como el error de posición, el tiempo de entrega y la latencia de comunicación, bajo condiciones controladas.

El desarrollo del prototipo siguió una estrategia iterativa e incremental. Cada subsistema se diseñó, se implementó y se verificó de forma independiente antes de integrarse con los demás, de modo que cada fase culminó en un entregable verificable y el riesgo técnico se redujo de manera progresiva. La lógica del firmware se verificó primero mediante pruebas unitarias ejecutadas en un computador, y luego en el hardware real, con los sensores y los motores definitivos; los resultados de la verificación previa de la lógica no se extrapolaron al desempeño físico del robot, que solo se reportó a partir de mediciones en el hardware y en la maqueta. La Tabla 1 resume la caracterización metodológica del estudio.

| Dimensión | Clasificación adoptada | Justificación en el Trabajo de Grado |
| --- | --- | --- |
| Tipo según el propósito | Proyectiva | Propone y desarrolla una solución a la necesidad de transporte y trazabilidad de componentes diagnosticada en el Capítulo I [1]. |
| Tipo según la finalidad | Aplicada, de desarrollo tecnológico | Emplea el conocimiento del Capítulo II para obtener un prototipo funcional y replicable [2]. |
| Enfoque de la evaluación | Cuantitativo | Los siete criterios de validación se expresan como magnitudes medibles con criterio de aceptación previo. |
| Diseño | Documental, de campo y experimental | Revisión de fuentes, levantamiento en el laboratorio y ensayos controlados en maqueta [3]. |
| Estrategia de desarrollo | Iterativa e incremental, en siete fases | Cada fase culmina en un entregable verificable asociado a uno o más objetivos específicos. |

**Tabla 1.** Caracterización metodológica de la investigación.

*Fuente: elaboración propia a partir de [1], [2] y [3].*

## III.2 Unidad de estudio y entorno de validación

### III.2.1 Unidad de estudio

La unidad de estudio fue el sistema completo de transporte y trazabilidad, conformado por tres elementos que operan de forma conjunta: el robot móvil, la aplicación de solicitudes con su backend en la nube y la red de comunicación inalámbrica que los vincula a través del broker MQTT. Por tratarse de una investigación de desarrollo tecnológico, no se trabajó con una población de individuos ni con un muestreo probabilístico de personas; la unidad de análisis fue cada ensayo realizado sobre el prototipo. La muestra de cada prueba se definió como el número de repeticiones de un mismo ensayo bajo condiciones controladas, con un mínimo de 20 repeticiones por prueba, criterio que se justifica en la sección III.5.

### III.2.2 Entorno de validación

El contexto de aplicación fue el laboratorio de la Escuela de Ingeniería en Telecomunicaciones de la UCAB, en particular el trayecto entre el almacén de componentes y los puestos de trabajo. Para evaluar el prototipo bajo condiciones repetibles y medibles, se construyó una maqueta controlada que reproduce ese trayecto a escala de laboratorio. Esta maqueta respondió al alcance declarado en la propuesta y en el Capítulo I (sección I.4.2), que limita la validación a un único prototipo operando en una maqueta o entorno controlado.

La maqueta consistió en una ruta guiada por una cinta negra de alto contraste sobre un piso claro y liso, con un origen que representa el almacén de componentes, un punto de control intermedio y un destino que representa el puesto de trabajo. La ruta se dividió en segmentos delimitados por puntos de interés (cruces, giros y paradas), y se marcaron puntos de referencia con posición conocida, medidos con cinta métrica respecto a un origen fijo, que sirvieron como valor de referencia para calcular el error de posición. En los extremos de la ruta se instalaron dos balizas BLE fijas basadas en ESP32, que actúan como puntos de re-localización absoluta por proximidad a partir del RSSI [4]. La red Wi-Fi utilizada fue una red local del laboratorio en la banda de 2,4 GHz, con un broker MQTT accesible desde ella. La Tabla 2 recoge los parámetros nominales de diseño y las condiciones esperadas de ensayo.

| Parámetro | Valor nominal o condición esperada |
| --- | --- |
| Longitud nominal de la ruta de ensayo (ida) | 12 m, dividida en segmentos de 2 m a 4 m |
| Guía de recuperación | Cinta negra de 19 mm sobre piso claro y liso |
| Puntos de referencia para el error de posición | Uno por segmento, con posición medida a ± 1 mm |
| Velocidad de crucero en seguimiento de línea | 0,41 m/s (máxima en recta: 0,46 m/s) |
| Umbral de parada ante obstáculo frontal | Menor que 20 cm (zona de precaución entre 20 cm y 50 cm) |
| Periodo de publicación del estado del robot | 2 s |
| Batería | Li-Ion 3S; ventana de operación de 9,9 V a 12,6 V, con corte de protección a 9,9 V |
| Infraestructura de re-localización | Dos balizas BLE fijas en el origen y en el destino |
| Red de comunicación | Wi-Fi local de 2,4 GHz con broker MQTT accesible desde ella |
| Carga transportada | Componentes electrónicos livianos, colocados de forma manual en un compartimiento simple |

**Tabla 2.** Parámetros nominales de diseño y condiciones esperadas de ensayo en la maqueta.

*Fuente: elaboración propia a partir de las hojas de datos de los componentes y del diseño del prototipo.*

Los valores de la Tabla 2 se adoptaron como parámetros nominales de diseño y se contrastaron con mediciones en el hardware durante las fases III a VII. Quedaron fuera del entorno de validación, en coherencia con las limitaciones de la sección I.4.1, la operación de varios robots a la vez, la navegación en entornos no mapeados, la manipulación automatizada de la carga y la integración con sistemas de inventario institucionales.

## III.3 Procedimiento metodológico

El procedimiento se organizó en siete fases, con una duración total de 32 semanas, tal como se estableció en la propuesta del Trabajo de Grado. Cada fase atendió uno o varios objetivos específicos (OE) y culminó en un entregable verificable. Antes de describir cada fase, la Tabla 3 presenta la correspondencia uno a uno entre los nueve objetivos específicos, los nueve productos declarados en el reporte de productos y la fase en la que se obtuvo cada uno.

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

*Fuente: elaboración propia a partir de la propuesta del Trabajo de Grado, el reporte de productos y la Tabla 1 del Capítulo I.*

### III.3.1 Fase I: Investigación y diseño conceptual (4 semanas)

La primera fase estableció la base documental y los requerimientos del sistema, y atendió el OE2.

- **Actividades:** revisión bibliográfica de robótica móvil, control PID, fusión de sensores, protocolos de comunicación IoT y posicionamiento en interiores, que dio origen al marco teórico del Capítulo II; búsqueda y análisis de trabajos de grado previos y registro de las búsquedas documentales; entrevista semiestructurada al personal encargado del almacén y observación directa del laboratorio; definición de los requerimientos funcionales y no funcionales del sistema y de sus criterios de evaluación; y comparación y selección preliminar de los componentes de hardware mediante una matriz ponderada de costo, consumo energético, disponibilidad y compatibilidad.
- **Objetivos específicos cubiertos:** OE2.
- **Producto verificable:** el estudio comparativo de los componentes de hardware, con su tabla comparativa, y la selección del microcontrolador, el controlador de motores, los sensores y la batería según criterios de costo, consumo energético, disponibilidad y compatibilidad.
- **Entregable de la fase:** documento de requerimientos y tabla comparativa de componentes.

### III.3.2 Fase II: Diseño mecánico y electrónico (4 semanas)

La segunda fase transformó los requerimientos en un diseño del sistema y atendió el OE1 y la etapa de diseño del OE3.

- **Actividades:** modelado CAD del chasis para impresión 3D en PLA y diseño de la tracción diferencial, con dos ruedas motrices y una rueda loca de apoyo; diseño del esquema electrónico (microcontrolador ESP32, driver de motores, sensores de línea, ultrasónicos e inercial, y alimentación separada en un dominio de potencia y otro de control) y del diagrama de bloques; diseño de la arquitectura de comunicación robot–aplicación–servidor sobre MQTT [5], con la definición de la jerarquía de tópicos, de los mensajes de órdenes, estado y alertas, y del nivel de QoS de cada flujo según su criticidad: QoS 0 para el estado periódico del robot, QoS 1 para las órdenes de entrega y QoS 2 para las alertas de seguridad, de acuerdo con lo expuesto en la sección II.2.7.5; y definición del uso de la sesión persistente, de los mensajes retenidos y del mensaje de última voluntad (LWT) para detectar la desconexión del robot.
- **Objetivos específicos cubiertos:** OE1 y OE3 (diseño).
- **Productos verificables:** el diseño de la arquitectura de comunicación inalámbrica del sistema (robot–aplicación–servidor) basada en MQTT, con la definición de los tópicos, los niveles de QoS y los flujos de mensajes para órdenes, estado y alertas; y los planos del chasis.
- **Entregable de la fase:** planos del chasis, diagrama electrónico y diagrama de bloques del sistema.

### III.3.3 Fase III: Firmware de control y comunicaciones (6 semanas)

La tercera fase materializó la plataforma y su programa de control, y atendió el OE4 y la etapa de construcción del OE3.

- **Actividades:** impresión 3D del chasis y montaje de motores, encoders, sensores, driver y batería; programación del control de motores mediante PWM y del seguimiento de línea con un controlador PID [6], cuyas ganancias se ajustaron de forma experimental empezando por la acción proporcional y añadiendo luego la derivativa y, de ser necesaria, la integral; adquisición e integración de los cuatro sensores ópticos de línea, de los dos sensores ultrasónicos frontal y trasero, y de la unidad inercial MPU-6050 por bus I²C [7]; implementación del cliente MQTT del robot, con los tópicos y niveles de QoS definidos en la fase II; e implementación de las reglas de seguridad del firmware: parada ante un obstáculo frontal a menos de 20 cm, detención si en modo manual transcurren 5 s sin órdenes y corte por batería baja a 9,9 V.
- **Objetivos específicos cubiertos:** OE3 (construcción) y OE4.
- **Productos verificables:** la plataforma mecánica del robot diseñada y construida, con chasis impreso en 3D y tracción diferencial, junto con los planos del chasis; y el firmware funcional de control del robot (seguimiento de línea con PID, adquisición de los sensores de línea, ultrasónicos e inercial, y comunicación MQTT), con pruebas unitarias de lectura, control y transmisión.
- **Entregable de la fase:** firmware funcional con pruebas unitarias de lectura, control y transmisión.

### III.3.4 Fase IV: Navegación progresiva (5 semanas)

La cuarta fase implementó el núcleo del proyecto, la transición gradual desde el seguimiento de línea hacia la navegación basada en sensores en rutas conocidas, y atendió el OE5. Se siguieron las cinco etapas técnicas descritas en la propuesta:

1. **Etapa 0, línea como guía y registro:** el robot recorre la ruta siguiendo la línea mientras registra, con marca de tiempo, las lecturas de los sensores de línea, las velocidades de los motores, los pulsos de los encoders, las lecturas de la IMU y las distancias ultrasónicas.
2. **Etapa 1, aprendizaje de la ruta:** a partir de esos registros se identifican los puntos de interés y se construye un mapa relativo de la ruta basado en odometría y en los patrones de los sensores de cada segmento.
3. **Etapa 2, segmentación y retirada gradual:** para cada segmento se calibra un controlador que usa odometría, IMU y ultrasonidos para mantener la trayectoria sin la línea; en modo híbrido, si la desviación supera un umbral, el robot vuelve al modo línea (*fallback*).
4. **Etapa 3, fusión de sensores y corrección periódica:** se combinan encoders e IMU mediante un filtro complementario o un filtro de Kalman simplificado [8], y se añaden los puntos de re-localización absoluta con las balizas BLE para acotar la deriva acumulada.
5. **Etapa 4, autonomía en rutas conocidas:** cuando el error de posición se mantiene dentro del criterio de aceptación, el robot recorre los segmentos sin línea de forma confiable, y la línea permanece como recurso de recuperación y seguridad.

- **Actividades complementarias:** caracterización de los errores sistemáticos de la odometría mediante recorridos de prueba en trayectorias cerradas, según el procedimiento de Borenstein y Feng [9], y medición del error de posición en los puntos de referencia de cada segmento.
- **Objetivos específicos cubiertos:** OE5.
- **Producto verificable:** el esquema de navegación progresiva implementado (seguimiento de línea, odometría, fusión de sensores inerciales y puntos de re-localización absoluta), validado por segmentos con mediciones de error de posición.
- **Entregable de la fase:** navegación validada por segmentos con mediciones de error de posición.

### III.3.5 Fase V: Aplicación y backend (5 semanas)

La quinta fase desarrolló la interfaz con el usuario y el registro de las entregas, y atendió el OE6.

- **Actividades:** desarrollo de la aplicación móvil/web de solicitudes en Flutter, con catálogo de componentes, creación de pedidos, seguimiento del estado del robot en tiempo real e historial de entregas; integración con el backend en la nube para la autenticación de usuarios con roles diferenciados (solicitante y encargado del almacén), la base de datos de pedidos y entregas, y el envío de notificaciones *push*; y conexión de la aplicación con el broker MQTT para enviar órdenes y recibir el estado y las alertas del robot.
- **Objetivos específicos cubiertos:** OE6.
- **Producto verificable:** la aplicación móvil/web de solicitudes integrada con el backend de trazabilidad, con catálogo de componentes, seguimiento del robot en tiempo real, historial de entregas y notificaciones.
- **Entregable de la fase:** aplicación integrada con el backend y con trazabilidad de entregas.

### III.3.6 Fase VI: Integración y sistema de alertas (3 semanas)

La sexta fase unió los subsistemas y completó el módulo de seguridad, y atendió el OE7.

- **Actividades:** ensamblaje del prototipo completo e integración hardware–firmware–aplicación; calibración del acelerómetro de la MPU-6050 en reposo y en movimiento normal [7]; definición de los umbrales de detección de manipulación a partir de la magnitud de la aceleración medida mientras el robot no está en misión, según lo expuesto en la sección II.2.10.1; generación de la alerta con la última ubicación conocida y su publicación con QoS 2; y configuración del broker con autenticación de usuario y contraseña y cifrado TLS para el intercambio de mensajes.
- **Objetivos específicos cubiertos:** OE7.
- **Producto verificable:** el módulo de alertas de seguridad anti-manipulación basado en el acelerómetro, con sus umbrales de detección definidos y la evaluación de su tasa de detección y su tasa de falsas alarmas.
- **Entregable de la fase:** prototipo integrado con el sistema de alertas operativo.

### III.3.7 Fase VII: Pruebas, validación y documentación (5 semanas)

La última fase evaluó el sistema integrado frente a los criterios de validación y cerró la documentación, y atendió el OE8 y el OE9.

- **Actividades:** ejecución en la maqueta del protocolo de pruebas de la sección III.4, con un mínimo de 20 repeticiones por ensayo; análisis de los resultados según la sección III.5; identificación de las limitaciones técnicas observadas durante los ensayos y formulación de mejoras orientadas a la escalabilidad del sistema y a su adaptación a otros entornos; y redacción final del Trabajo de Grado y preparación de la defensa.
- **Objetivos específicos cubiertos:** OE8 y OE9.
- **Productos verificables:** la evaluación del desempeño integral del sistema: informe de resultados de las pruebas en maqueta (precisión de navegación, latencia y fiabilidad de la comunicación, autonomía energética y eficacia de las alertas); y la documentación de las limitaciones técnicas del sistema y la propuesta de mejoras futuras orientadas a su escalabilidad y a su adaptación a otros entornos de aplicación.
- **Entregable de la fase:** informe de resultados, documento del Trabajo de Grado y material de defensa.

### III.3.8 Resumen de trazabilidad del procedimiento

La Tabla 4 resume, para cada fase, su duración, los objetivos específicos que cubre, sus actividades clave y el entregable con el que culmina. Se verifica que los nueve objetivos específicos quedan cubiertos y que la suma de las duraciones es de 32 semanas.

| Fase | Duración | OE cubiertos | Actividades clave | Entregable |
| --- | --- | --- | --- | --- |
| I. Investigación y diseño conceptual | 4 semanas | OE2 | Revisión bibliográfica, entrevista y observación, requerimientos, matriz comparativa de hardware | Documento de requerimientos y tabla comparativa de componentes |
| II. Diseño mecánico y electrónico | 4 semanas | OE1, OE3 | CAD del chasis, esquema electrónico, diagrama de bloques, tópicos y niveles de QoS | Planos del chasis, diagrama electrónico y diagrama de bloques del sistema |
| III. Firmware de control y comunicaciones | 6 semanas | OE3, OE4 | Impresión y montaje, PWM y PID, adquisición de sensores, cliente MQTT, reglas de seguridad | Firmware funcional con pruebas unitarias de lectura, control y transmisión |
| IV. Navegación progresiva | 5 semanas | OE5 | Registro y mapa relativo, segmentación con *fallback*, fusión de sensores, re-localización BLE | Navegación validada por segmentos con mediciones de error de posición |
| V. Aplicación y backend | 5 semanas | OE6 | Catálogo, pedidos, seguimiento, historial, autenticación, base de datos y notificaciones | Aplicación integrada con el backend y con trazabilidad de entregas |
| VI. Integración y sistema de alertas | 3 semanas | OE7 | Integración hardware–firmware–aplicación, calibración del acelerómetro, umbrales, broker con TLS | Prototipo integrado con el sistema de alertas operativo |
| VII. Pruebas, validación y documentación | 5 semanas | OE8, OE9 | Ensayos en maqueta, análisis de resultados, limitaciones y mejoras, redacción final | Informe de resultados, documento del Trabajo de Grado y material de defensa |
| **Total** | **32 semanas** | **OE1 a OE9** | | |

**Tabla 4.** Resumen de trazabilidad de las fases del procedimiento metodológico.

*Fuente: elaboración propia a partir de la propuesta del Trabajo de Grado y del reporte de productos.*

## III.4 Técnicas e instrumentos de recolección de datos

### III.4.1 Técnicas e instrumentos

Arias [3] define la técnica de recolección de datos como el procedimiento o la forma particular de obtener información, y el instrumento como el recurso, dispositivo o formato, en papel o digital, que se utiliza para obtener, registrar o almacenar esa información. La Tabla 5 relaciona las técnicas empleadas con sus instrumentos y con la fase en la que se aplicaron.

| Técnica | Instrumento | Información registrada | Fase |
| --- | --- | --- | --- |
| Revisión documental | Registro de búsquedas documentales y fichas de análisis de trabajos de grado | Fuentes del marco teórico, antecedentes y parámetros de los componentes | I |
| Entrevista semiestructurada | Guía de entrevista organizada por bloques temáticos | Demanda de componentes, horarios, reglas del almacén, red inalámbrica y preocupaciones de seguridad | I |
| Observación directa | Hoja de observación del entorno | Recorrido, distancias, piso, iluminación, obstáculos y cobertura Wi-Fi | I |
| Pruebas unitarias | Casos de prueba del firmware y de la aplicación | Correcta lectura de sensores, cálculo del control y formato de los mensajes | III y V |
| Medición experimental en maqueta | Plantillas de ensayo, cinta métrica, cronómetro, multímetro y video | Error de posición, tiempos, tensión y corriente de la batería, distancias de parada | III a VII |
| Registro automático de mensajes | Cliente MQTT de pruebas y archivos de registro en formato CSV | Marcas de tiempo, nivel de QoS, mensajes enviados, recibidos y duplicados | II, VI y VII |
| Registro del proceso | Bitácora semanal y registro de decisiones técnicas | Actividades, decisiones, justificación y evidencia de cada fase | I a VII |

**Tabla 5.** Técnicas e instrumentos de recolección de datos.

*Fuente: elaboración propia a partir de [3].*

### III.4.2 Operacionalización de los criterios de validación

Los siete criterios de validación de la propuesta se operacionalizaron como métricas cuantitativas, en correspondencia con las métricas de desempeño definidas en la sección II.2.12. Para cada una se fijó, antes de medir, una unidad, un instrumento, un procedimiento de ensayo y un criterio de aceptación. Los criterios de aceptación de la Tabla 6 son valores estimados a partir de los parámetros nominales de diseño de la Tabla 2 y de la literatura citada, y constituyen el umbral con el que se contrastaron los resultados de la fase VII.

| Criterio | Métrica y unidad | Instrumento | Procedimiento de ensayo | Criterio de aceptación estimado |
| --- | --- | --- | --- | --- |
| 1. Precisión de navegación | Error de posición ep: medio, máximo y RMSE (cm) | Cinta métrica, puntos de referencia y registro de la pose estimada | Recorrer la ruta en modo híbrido o autónomo y medir en cada punto de referencia la distancia entre la posición estimada y la real; 20 recorridos | Error medio ≤ 5 cm y error máximo ≤ 10 cm en los puntos de referencia |
| 2. Tasa de éxito por segmento | Segmentos completados sin volver al modo línea / segmentos intentados (%) | Registro de eventos de *fallback* del robot | Intentar cada segmento sin línea y contar los que se completan sin *fallback*; 20 intentos por segmento | ≥ 80 % por segmento |
| 3. Tiempo de entrega | Duración del ciclo solicitud–entrega (s) | Marcas de tiempo de la aplicación y cronómetro | Ejecutar el ciclo completo en modo línea puro y en modo híbrido o autónomo; 20 ciclos por modo | Ciclo completo ≤ 180 s y modo híbrido no más de 10 % más lento que el modo línea |
| 4. Robustez de las alertas | Tasa de detección TD y tasa de falsas alarmas TFA (%); tiempo hasta la notificación (s) | Matriz de confusión, registro de alertas y cronómetro | Provocar manipulaciones controladas (levantamiento, empuje y giro) con el robot fuera de misión y realizar recorridos normales sin manipulación; 20 eventos de cada tipo | TD ≥ 95 %, TFA ≤ 5 % y notificación en ≤ 5 s |
| 5. Consumo energético | Autonomía taut (h) y corriente media (A) | Multímetro, lectura de tensión de la batería y cronómetro | Operar el robot en ciclos de entrega continuos desde carga completa (12,6 V) hasta el corte de protección (9,9 V) | Autonomía ≥ 2 h de operación continua |
| 6. Recuperación ante fallo | Tiempo hasta alcanzar un modo seguro (s) y porcentaje de recuperaciones exitosas | Registro de estados del robot, video y cronómetro | Inducir pérdida de línea, desviación sobre el umbral, obstáculo frontal y pérdida de conexión; 20 eventos de cada tipo | Modo seguro en ≤ 2 s con 100 % de éxito; desconexión detectada en ≤ 30 s |
| 7. Latencia de comunicación | RTT de los mensajes MQTT: mediana y percentil 95 (ms) y tasa de entrega (%), por nivel de QoS | Cliente MQTT de pruebas con marcas de tiempo en un mismo dispositivo y registro CSV | Enviar 200 mensajes de eco por nivel de QoS (0, 1 y 2) en tres sesiones en la red local del laboratorio | Mediana ≤ 200 ms (QoS 0), ≤ 300 ms (QoS 1) y ≤ 500 ms (QoS 2); percentil 95 ≤ 1 000 ms; entrega del 100 % con QoS 1 y 2 |

**Tabla 6.** Operacionalización de los criterios de validación.

*Fuente: elaboración propia a partir de los criterios de validación de la propuesta y de la Tabla 9 del Capítulo II.*

### III.4.3 Protocolo de pruebas

Para que los ensayos fueran comparables entre sí, cada sesión de pruebas siguió un mismo protocolo:

1. **Preparación:** cargar la batería hasta 12,6 V, verificar la calibración de los sensores de línea sobre la cinta y sobre el piso, comprobar la conexión con el broker y anotar la versión del firmware y de la aplicación.
2. **Registro de condiciones:** anotar la fecha, las responsables, la tensión inicial de la batería, el tipo de piso, la iluminación y la intensidad de la señal Wi-Fi en el punto de origen.
3. **Ejecución:** realizar el ensayo el número de veces establecido en la Tabla 6, sin modificar parámetros del firmware entre repeticiones de una misma serie.
4. **Registro de resultados:** anotar cada repetición en la plantilla del ensayo y conservar los archivos de registro de mensajes y los videos como evidencia.
5. **Cierre:** anotar las incidencias y descartar solo las repeticiones invalidadas por una causa externa documentada, como un corte de energía del laboratorio o la caída de la red institucional.

La latencia se midió como tiempo de ida y vuelta (RTT) en un mismo dispositivo, lo que evita la necesidad de sincronizar los relojes del robot y de la aplicación, según lo expuesto en la sección II.2.12. Cada mensaje de eco se discriminó por nivel de QoS, ya que el número de paquetes intercambiados por cada nivel condiciona el retardo y la probabilidad de pérdida [10].

## III.5 Análisis de datos y validación

Los datos de cada ensayo se procesaron con estadística descriptiva y se compararon con el criterio de aceptación correspondiente de la Tabla 6, de la siguiente manera:

- **Magnitudes continuas** (error de posición, tiempos, latencia y autonomía): se calcularon la media, la desviación estándar muestral, el mínimo, el máximo y, cuando correspondía, la mediana y el percentil 95. Para el error de posición se reportaron además el error máximo y la raíz del error cuadrático medio (RMSE), que penaliza más los errores grandes [11]. La incertidumbre de las mediciones directas se estimó a partir de la resolución de cada instrumento [12].
- **Proporciones** (tasa de éxito por segmento, tasa de entrega de mensajes, TD, TFA y recuperaciones exitosas): se calcularon como porcentaje y se acompañaron de su intervalo de confianza al 95 % por el método exacto de Clopper y Pearson [13]. Este tratamiento es necesario porque un resultado sin fallos en una muestra pequeña no demuestra una tasa de fallo nula: con 20 repeticiones sin fallos solo puede afirmarse, con 95 % de confianza, una tasa de fallo de hasta aproximadamente 14 %; con 50, de hasta aproximadamente 6 %.
- **Alertas:** los eventos se clasificaron en una matriz de confusión (verdaderos positivos, falsos negativos, falsos positivos y verdaderos negativos), de la que se obtuvieron la TD y la TFA, según la sección II.2.10.2 [14].
- **Comparaciones:** el tiempo de entrega y el error de posición se compararon entre el modo línea puro y el modo híbrido o autónomo, y la latencia y la tasa de entrega se compararon entre los niveles de QoS 0, 1 y 2. Cada comparación se presentó con la diferencia absoluta y relativa entre las medias y con la dispersión de cada grupo.

Un criterio se consideró cumplido cuando el estadístico de interés satisfizo el umbral de la Tabla 6; en el caso de las proporciones, se reportó además el límite del intervalo de confianza para mostrar el grado de certeza del resultado. Los resultados se presentaron en tablas y gráficos generados a partir de los archivos de registro de cada sesión. La Tabla 7 resume el tratamiento aplicado a cada criterio.

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

El cronograma se estimó en 32 semanas, dentro del rango reglamentario de la Escuela (mínimo 20 y máximo 52 semanas), contadas a partir del inicio del Trabajo de Grado. La Tabla 8 presenta la duración y el período de cada fase.

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

*Fuente: elaboración propia a partir de la propuesta del Trabajo de Grado.*

El período de receso académico de fin de año se absorbió dentro de la fase III, cuya duración de seis semanas es la mayor del cronograma, y la semana de evaluaciones parciales de enero se empleó como semana adicional de trabajo de esa misma fase.

## III.7 Validez, confiabilidad y consideraciones éticas

**Validez.** Los criterios de aceptación se fijaron antes de realizar las mediciones, a partir de los criterios de validación de la propuesta, lo que evita ajustar los umbrales a los resultados obtenidos. Las métricas se definieron de forma operativa con base en el Capítulo II, y los valores de referencia de la posición se obtuvieron con instrumentos independientes del robot.

**Confiabilidad.** Cada ensayo se repitió como mínimo 20 veces bajo un protocolo común, se registraron las condiciones de cada sesión y se conservaron los datos crudos de cada repetición. El código del firmware y de la aplicación se mantuvo bajo control de versiones, de modo que cada sesión de pruebas pudiera asociarse con la versión exacta del programa que se evaluó.

**Consideraciones éticas.** La entrevista y la observación con el personal del laboratorio tuvieron fines exclusivamente académicos; los participantes fueron informados del propósito del estudio y en el documento no se publican sus nombres ni sus datos personales. Las credenciales de la red inalámbrica y del broker se mantuvieron fuera del código fuente y de los documentos del Trabajo de Grado.

# Bibliografía

[1] J. Hurtado de Barrera, *Metodología de la investigación: guía para una comprensión holística de la ciencia*, 4.ª ed. Caracas, Venezuela: Quirón Ediciones, 2010.

[2] R. Hernández Sampieri, C. Fernández Collado y M. P. Baptista Lucio, *Metodología de la investigación*, 6.ª ed. México D. F., México: McGraw-Hill/Interamericana, 2014.

[3] F. G. Arias, *El proyecto de investigación: introducción a la metodología científica*, 6.ª ed. Caracas, Venezuela: Episteme, 2012.

[4] R. Ramirez, C.-Y. Huang, C.-A. Liao, P.-T. Lin, H.-W. Lin y S.-H. Liang, “A practice of BLE RSSI measurement for indoor positioning,” *Sensors*, vol. 21, n.º 15, art. 5181, 2021, doi: 10.3390/s21155181.

[5] A. Banks, E. Briggs, K. Borgendale y R. Gupta, Eds., *MQTT Version 5.0*, OASIS Standard, 7 mar. 2019. [En línea]. Disponible: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html

[6] K. J. Åström y R. M. Murray, *Feedback Systems: An Introduction for Scientists and Engineers*. Princeton, NJ, EE. UU.: Princeton University Press, 2008.

[7] TDK InvenSense, *MPU-6000 and MPU-6050 Product Specification*, Rev. 3.4, 2013. Accedido: 9 nov. 2026. [En línea]. Disponible: https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/

[8] V. Ušinskis, M. Nowicki, A. Dzedzickis y V. Bučinskas, “Sensor-fusion based navigation for autonomous mobile robot,” *Sensors*, vol. 25, n.º 4, art. 1248, 2025, doi: 10.3390/s25041248.

[9] J. Borenstein y L. Feng, “Measurement and correction of systematic odometry errors in mobile robots,” *IEEE Trans. Robot. Autom.*, vol. 12, n.º 6, pp. 869-880, dic. 1996, doi: 10.1109/70.544770.

[10] S. Lee, H. Kim, D.-K. Hong y H. Ju, “Correlation analysis of MQTT loss and delay according to QoS level,” en *Proc. Int. Conf. Inf. Netw. (ICOIN)*, 2013, pp. 714-717, doi: 10.1109/ICOIN.2013.6496715.

[11] R. Siegwart, I. R. Nourbakhsh y D. Scaramuzza, *Introduction to Autonomous Mobile Robots*, 2.ª ed. Cambridge, MA, EE. UU.: MIT Press, 2011.

[12] Joint Committee for Guides in Metrology, *Evaluation of Measurement Data: Guide to the Expression of Uncertainty in Measurement*, JCGM 100:2008, Sèvres, Francia: BIPM, 2008.

[13] C. J. Clopper y E. S. Pearson, “The use of confidence or fiducial limits illustrated in the case of the binomial,” *Biometrika*, vol. 26, n.º 4, pp. 404-413, dic. 1934, doi: 10.2307/2331986.

[14] T. Fawcett, “An introduction to ROC analysis,” *Pattern Recognit. Lett.*, vol. 27, n.º 8, pp. 861-874, jun. 2006, doi: 10.1016/j.patrec.2005.10.010.
