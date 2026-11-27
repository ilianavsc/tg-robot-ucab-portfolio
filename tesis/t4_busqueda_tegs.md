> Versión web de la tarea **T4 · Búsqueda de investigaciones (5 TEGs)** del Seminario de Grado, entregada el 10 de octubre de 2026. Solo se publica el reporte elaborado por las autoras; los trabajos de grado analizados son de terceros y no se suben al repositorio (se citan en la sección de referencias de cada uno).

# Reporte de Investigación de Tesis

**Búsqueda de 5 trabajos de grado relacionados con el tema de investigación**

Semprun Cascitelli, Iliana Vanessa · Ferrer Pinto, Andrea Valentina

10 de octubre de 2026

## Introducción

El presente documento recopila la información extraída de cinco trabajos de grado (tesis) relacionados con el tema de investigación: *“Robot móvil para búsqueda y transporte de componentes en el laboratorio de la UCAB con aplicación de solicitudes y alertas”*. Se han seleccionado dos tesis de la Universidad Católica Andrés Bello (UCAB) y tres de otras instituciones nacionales e internacionales, siguiendo las instrucciones de la asignatura. Para cada una se presentan los campos solicitados: problema abordado, objetivos, elementos teóricos o conceptuales, estrategia metodológica, organización y análisis de datos, resultados, aportes al proyecto, y referencias.

### Resumen de las 5 tesis analizadas

| N.º | Título (abreviado) | Autores | Año | Institución |
|---|---|---|---|---|
| 1 | Diseño eficiente de redes de transporte de datos para ITS (Grupo InTech Solutions) | Carvajal Carvajal y Fernandes Da Silva | 2012 | UCAB, Caracas |
| 2 | Diseño de un semáforo inalámbrico (plataforma PISACOTA) | Gómez y Mas | 2007 | UCAB, Caracas |
| 3 | Robot con navegación autónoma y sistema de vigilancia | López Hernández | 2018 | Universidad de Almería, España |
| 4 | Convergencia de arquitecturas software, robótica colaborativa y aprendizaje automático en la Industria 5.0 | Alonso Hernández | 2025 | Universidad Politécnica de Madrid, España |
| 5 | Cooperación de múltiples robots: arquitectura AMEB | Gil Pérez | 2019 | Universidad de los Andes, Mérida |

---

## Tesis 1: Diseño eficiente de redes de transporte de datos para los sistemas y servicios de tráfico inteligente ofrecidos por el Grupo InTech Solutions

### Datos generales

| Campo | Detalle |
|---|---|
| **Título** | Diseño eficiente de redes de transporte de datos para los sistemas y servicios de tráfico inteligente ofrecidos por el Grupo InTech Solutions. |
| **Autores** | Mónica Leonor Carvajal Carvajal y Andrea Estefania Fernandes Da Silva. |
| **Año** | 2012 |
| **Institución** | Universidad Católica Andrés Bello (UCAB), Caracas, Venezuela. |
| **Fuente** | Biblioteca de la UCAB. |

### Problema abordado

El Grupo InTech Solutions requiere diseñar redes de transporte de datos eficientes para sus sistemas y servicios de tráfico inteligente (ITS). Los diseños actuales presentan limitaciones de ancho de banda, especialmente en redes grandes con tráfico multimedia. Además, cada producto (gestión de semáforos, información de tráfico, circuito cerrado de televisión, In Traffic In-Situ) tiene requisitos distintos de topología y ancho de banda, lo que exige diseños adaptados.

### Objetivos

- **General:** Diseñar, de forma eficiente, redes de transporte de datos para los sistemas y servicios de tráfico inteligente ofrecidos por el Grupo InTech Solutions.
- **Específicos:** Estudiar la topología y tecnologías actuales; definir cuatro casos de estudio; realizar un estudio de tecnologías y proveedores; llevar a nivel de detalle los diseños conceptuales; presentar diseños finales, conclusiones y recomendaciones.

### Elementos teóricos o conceptuales

Redes de transporte de datos, topologías de red (estrella, bus, híbridas), tecnologías inalámbricas (WiFi, WiMAX), protocolos (TCP, UDP, MPLS, Frame Relay), enlaces microondas, zona de Fresnel, potencia de recepción, sensibilidad del receptor, indisponibilidad por equipos, ITS.

### Estrategia metodológica

La investigación se dividió en cinco fases: (1) Revisión bibliográfica, (2) Estudio de las redes actuales, (3) Diseño conceptual de redes, (4) Estudio de tecnologías y proveedores, (5) Diseño detallado de la red de transporte de datos. Se utilizaron simulaciones con Radio Mobile para validar los diseños.

### Organización, procesamiento y análisis de los datos

Se recopilaron datos de las redes existentes mediante mediciones de potencia de recepción y ancho de banda. Se analizaron resultados de estudios previos (pruebas con UDP, comparación WDS vs AP/Bridge). Se realizaron cálculos teóricos de pérdidas en espacio libre, potencia de recepción y margen de desvanecimiento. Los datos se organizaron en tablas comparativas de tecnologías, costos y prestaciones.

### Resultados, hallazgos, aportes e implicaciones

Se diseñaron redes para cuatro productos, seleccionando tecnología WiFi en banda de 5.8 GHz con dispositivos Ubiquiti (AirMax). Se propusieron topologías en estrella y enlaces punto a punto con redundancia. Se demostró que el modo AP/Bridge mejora el rendimiento en un 30 % frente a WDS. Se calcularon costos de implementación y se verificó la viabilidad técnica mediante simulaciones.

### Aportes para el proyecto

Este trabajo aporta conceptos sobre diseño de redes inalámbricas para aplicaciones de transporte de datos, selección de tecnología según requisitos de ancho de banda, uso de enlaces punto a punto y punto-multipunto, y metodología para el cálculo de enlaces y simulación. Es útil para la arquitectura de comunicación del robot móvil.

### Referencias para el trabajo de grado

Carvajal Carvajal, M. L. y Fernandes Da Silva, A. E. (2012). *Diseño eficiente de redes de transporte de datos para los sistemas y servicios de tráfico inteligente ofrecidos por el Grupo InTech Solutions.* Trabajo Especial de Grado. Universidad Católica Andrés Bello, Caracas, Venezuela.

---

## Tesis 2: Diseño de un semáforo inalámbrico, soportado por un subsistema de la plataforma de control de tráfico PISACOTA

### Datos generales

| Campo | Detalle |
|---|---|
| **Título** | Diseño de un semáforo inalámbrico, soportado por un subsistema de la plataforma de control de tráfico PISACOTA. |
| **Autores** | Marian Gómez y Carolina Mas. |
| **Año** | 2007 |
| **Institución** | Universidad Católica Andrés Bello (UCAB), Caracas, Venezuela. |
| **Fuente** | Biblioteca de la UCAB. |

### Problema abordado

En el Municipio Chacao, el sistema de comunicación entre la central de control de tráfico y los semáforos presenta fallas, dificultando los cambios de secuencia y la atención de emergencias. Se requiere un subsistema que permita la comunicación inalámbrica bidireccional entre la central y una intersección semaforizada, con reporte de alarmas y solicitudes peatonales.

### Objetivos

- **General:** Diseñar un semáforo inalámbrico, soportado por un subsistema de la plataforma de control de tráfico PISACOTA.
- **Específicos:** Estudiar antecedentes; estudiar el funcionamiento de semáforos; comparar tecnologías inalámbricas; diseñar tarjeta de control local; integrar medio de comunicación, tarjeta y partes eléctricas; construir prototipo y realizar pruebas.

### Elementos teóricos o conceptuales

Semáforos, controladores de tráfico, tecnologías inalámbricas (infrarrojo, WiFi, WiMAX, celular), microcontroladores (PIC16F877, C8051F120), comunicación serial, protocolos de comunicación, PISACOTA, norma COVENIN 2753:1999.

### Estrategia metodológica

Se dividió en cinco fases: (1) Investigación y estudio, (2) Diseño y programación, (3) Construcción del hardware, (4) Ensamblaje e implementación, (5) Pruebas. Se seleccionó tecnología celular GSM/GPRS por su cobertura y ausencia de línea de vista. Se programaron microcontroladores y se diseñaron circuitos impresos.

### Organización, procesamiento y análisis de los datos

Se recopiló información de visitas al Departamento de Tránsito de Chacao y a la empresa SEMAVENCA. Se analizaron las características de los controladores existentes. Se definieron tramas de comunicación (UCI-USC y UCI-UCS) con campos específicos. Se realizaron pruebas de laboratorio para validar la comunicación y el funcionamiento del prototipo.

### Resultados, hallazgos, aportes e implicaciones

Se obtuvo un subsistema capaz de controlar una intersección sincronizada de 4 semáforos vehiculares y 4 peatonales, con botones de alarma y solicitud de paso. Se reporta el estado de conexión de cada UCS a la central. Se validó la comunicación inalámbrica mediante módem CDMA2000 1xRTT. Se demostró la viabilidad de usar tecnología celular para la comunicación central-intersección.

### Aportes para el proyecto

Aporta experiencia en el diseño de sistemas de comunicación inalámbrica para control de tráfico, definición de tramas de comunicación, uso de microcontroladores y módulos de comunicación celular. Es relevante para la arquitectura de comunicación y el sistema de alertas del robot móvil.

### Referencias para el trabajo de grado

Gómez, M. y Mas, C. (2007). *Diseño de un semáforo inalámbrico, soportado por un subsistema de la plataforma de control de tráfico PISACOTA.* Trabajo Especial de Grado. Universidad Católica Andrés Bello, Caracas, Venezuela.

---

## Tesis 3: Robot con navegación autónoma y sistema de vigilancia

### Datos generales

| Campo | Detalle |
|---|---|
| **Título** | Robot con navegación autónoma y sistema de vigilancia. |
| **Autor** | Jonathan López Hernández. |
| **Año** | 2018 |
| **Institución** | Universidad de Almería (UAL), España. |
| **Fuente** | Repositorio institucional de la Universidad de Almería. |

### Problema abordado

Se requiere un sistema de vigilancia autónoma para el hogar que permita monitorear y detectar incidencias de forma remota, así como mejorar la seguridad y comodidad. Los sistemas existentes son costosos o limitados en funciones autónomas.

### Objetivos

- **General:** Programar un robot móvil capaz de realizar funciones autónomas como recorrer y vigilar una casa, crear mapas, transmitir video en tiempo real y evitar obstáculos.
- **Específicos:** Creación de mapas y navegación autónoma; retransmisión de video en tiempo real; movimiento libre evitando obstáculos; integración de hardware y software (Raspberry Pi, Arduino, sensores).

### Elementos teóricos o conceptuales

IoT, Raspberry Pi, Arduino, Node-RED, OpenCV, Python, sensores ultrasónicos HC-SR04, motores DC, comunicación inalámbrica, creación de mapas, evasión de obstáculos, No-IP, XRDP.

### Estrategia metodológica

Se utilizó una metodología tradicional en cascada: especificación de requisitos, análisis, diseño, desarrollo, pruebas e implantación. Se configuró Raspberry Pi y Arduino, se montó el hardware (sensores, webcam, batería), y se desarrolló software en Python y Node-RED para la creación de mapas, navegación y transmisión de video.

### Organización, procesamiento y análisis de los datos

Se creó una matriz de 512x512 para el mapa, almacenando los movimientos en un archivo CSV. Se utilizaron sensores ultrasónicos para medir distancias y evitar obstáculos. Se procesaron imágenes con OpenCV para la transmisión de video. Se realizaron pruebas en un entorno doméstico, evaluando la precisión del mapa y la calidad del video.

### Resultados, hallazgos, aportes e implicaciones

Se obtuvo un robot capaz de crear mapas 2D de forma autónoma, recorrerlos evitando obstáculos, y transmitir video en tiempo real a través de una interfaz web. Se identificaron limitaciones como la pérdida de frames al alejarse del router y la dificultad en entornos con muchos obstáculos.

### Aportes para el proyecto

Aporta una arquitectura completa de hardware y software para un robot móvil autónomo de bajo costo, utilizando Raspberry Pi y Arduino. Proporciona métodos para creación de mapas, navegación, evasión de obstáculos y transmisión de video, que son directamente aplicables al robot de búsqueda y transporte. También introduce el uso de Node-RED para interfaces de control.

### Referencias para el trabajo de grado

López Hernández, J. (2018). *Robot con navegación autónoma y sistema de vigilancia.* Trabajo Fin de Grado. Universidad de Almería, España.

---

## Tesis 4: Convergencia de Arquitecturas Software, Robótica Colaborativa y Aprendizaje Automático en la Industria 5.0. Métodos y Aplicación

### Datos generales

| Campo | Detalle |
|---|---|
| **Título** | Convergencia de Arquitecturas Software, Robótica Colaborativa y Aprendizaje Automático en la Industria 5.0. Métodos y Aplicación. |
| **Autor** | Rubén Alonso Hernández. |
| **Año** | 2025 |
| **Institución** | Universidad Politécnica de Madrid (UPM), España. |
| **Fuente** | Repositorio institucional de la UPM. |

### Problema abordado

La digitalización industrial avanza hacia la Industria 5.0, pero muchas empresas, especialmente PYMEs, carecen de recursos y conocimientos para implementar tecnologías de inteligencia artificial, robótica colaborativa y plataformas interoperables. Se requiere simplificar la adopción de estas tecnologías y comprender el impacto de la cooperación humano-máquina en la sostenibilidad, la economía y la adaptación laboral.

### Objetivos

- **General:** Estudiar, desde una perspectiva teórico-práctica, los elementos clave de la Industria 5.0 mediante casos de estudio que interrelacionan el ser humano y la tecnología.
- **Específicos:** Analizar líneas piloto; explorar plataformas de software interoperables; proponer métodos para detección de necesidades formativas; estudiar técnicas de aumento de datos para control de calidad; validar en líneas piloto.

### Elementos teóricos o conceptuales

Industria 4.0 y 5.0, resiliencia, centricidad humana, sostenibilidad, líneas piloto, plataformas de orquestación de contenedores (Kubernetes, Istio), MQTT, OPC DA, robótica colaborativa, aumento de datos, generación de imágenes sintéticas, Zero Defect Manufacturing, O\*NET, ESCO, transformadores, aprendizaje profundo.

### Estrategia metodológica

Se combinaron métodos descriptivos (análisis del estado del arte) y experimentales (pruebas de concepto, casos de estudio). Se utilizaron líneas piloto (GAMHE 5.0) para validar soluciones. Se aplicaron técnicas de aumento de datos, segmentación y clasificación con U-Net y YOLO. Se desarrollaron plataformas basadas en componentes y metamarco de seguridad y privacidad.

### Organización, procesamiento y análisis de los datos

Se recopilaron datos de líneas piloto, encuestas, bases de datos ocupacionales (O\*NET, ESCO) e imágenes de defectos. Se procesaron imágenes sintéticas mediante manipulación, mezcla y generación de patrones. Se analizaron métricas de calidad (precisión, recall, F1) y de proceso (tiempo, residuos). Se utilizaron mapas cognitivos difusos para verificar emergencia en sistemas multi-robot.

### Resultados, hallazgos, aportes e implicaciones

Se demostró que las líneas piloto facilitan la validación y formación. Se desarrolló un metamarco de seguridad y privacidad para plataformas interoperables. Se mejoró la detección de necesidades formativas con transformadores y bases de datos ocupacionales. Se comprobó que las imágenes sintéticas mejoran el entrenamiento de modelos de clasificación, reduciendo residuos y tiempos. Se validó en casos de automoción y paneles termoaislantes.

### Aportes para el proyecto

Aporta conceptos sobre Industria 5.0, plataformas interoperables, seguridad y privacidad, uso de MQTT, técnicas de aumento de datos y validación en líneas piloto. Es relevante para la arquitectura de comunicación y el sistema de alertas, así como para la integración de componentes y la sostenibilidad del proyecto.

### Referencias para el trabajo de grado

Alonso Hernández, R. (2025). *Convergencia de Arquitecturas Software, Robótica Colaborativa y Aprendizaje Automático en la Industria 5.0. Métodos y Aplicación.* Tesis Doctoral. Universidad Politécnica de Madrid, España.

---

## Tesis 5: Cooperación de Múltiples Robots - Una Arquitectura para Sistemas Multi-robot con Comportamiento Emergente (AMEB)

### Datos generales

| Campo | Detalle |
|---|---|
| **Título** | Cooperación de Múltiples Robots - Una Arquitectura para Sistemas Multi-robot con Comportamiento Emergente (AMEB). |
| **Autor** | Ángel Eduardo Gil Pérez. |
| **Año** | 2019 |
| **Institución** | Universidad de los Andes (ULA), Mérida, Venezuela. |
| **Fuente** | Repositorio institucional de la Universidad de los Andes. |

### Problema abordado

Los sistemas multi-robot son utilizados para tareas que un solo robot no puede realizar. Se requieren arquitecturas que gestionen los procesos de cooperación, coordinación y emergencia. En particular, se busca facilitar la aparición de comportamientos emergentes y auto-organización en enjambres de robots con capacidades limitadas.

### Objetivos

- **General:** Desarrollar una arquitectura para sistemas multi-robot con comportamiento emergente.
- **Específicos:** Definir un modelo arquitectónico; proponer un modelo emocional artificial; verificar la aparición de emergencia y auto-organización.

### Elementos teóricos o conceptuales

Sistemas multi-robot, inteligencia de enjambre, emergencia, auto-organización, coordinación emergente, emociones artificiales, arquitecturas de control (CEBOT, ALLIANCE), comportamientos reactivos, cognitivos e imitativos, MQTT, ROS, lógica difusa, mapas cognitivos difusos.

### Estrategia metodológica

Se propuso una arquitectura distribuida AMEB con tres niveles: individual, colectivo y de gestión de conocimiento. Se implementó en robots de propósito general (Arduino, XBee). Se realizaron experimentos en tareas de transporte de objetos y búsqueda de rutas. Se utilizó un modelo emocional simplificado y se verificó la emergencia mediante mapas cognitivos difusos.

### Organización, procesamiento y análisis de los datos

Se recopilaron datos de sensores (infrarrojos, ultrasónicos, IMU), se procesaron en el robot y se compartieron mediante memoria colectiva. Se utilizaron feromonas artificiales y mensajes MQTT. Se analizaron interacciones y comportamientos mediante tablas y gráficos. Se aplicó un mapa cognitivo difuso para evaluar la emergencia y auto-organización.

### Resultados, hallazgos, aportes e implicaciones

Se obtuvo una arquitectura que facilita la emergencia y auto-organización en sistemas multi-robot. Se demostró que las emociones regulan el comportamiento y mejoran la adaptabilidad. Se validó en escenarios de cooperación y consenso social. Se logró un alto nivel de emergencia (98 %) y auto-organización (97 %) en las simulaciones.

### Aportes para el proyecto

Aporta conceptos sobre sistemas multi-robot, coordinación emergente, comunicación mediante MQTT y feromonas artificiales, y uso de emociones para modular comportamientos. Es relevante para la navegación progresiva y la interacción del robot con el entorno y otros dispositivos.

### Referencias para el trabajo de grado

Gil Pérez, Á. E. (2019). *Cooperación de Múltiples Robots - Una Arquitectura para Sistemas Multi-robot con Comportamiento Emergente (AMEB).* Tesis Doctoral. Universidad de los Andes, Mérida, Venezuela.
