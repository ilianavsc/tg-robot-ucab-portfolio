# Auditoría visual de los prototipos activos

**Fecha:** 24/11/2026 · **Base:** commit `9452318` · **Alcance:** prototipos activos P01–P05 y P10
**Uso:** archivo de trabajo de la unificación visual. La matriz describe el estado al 24/11/2026; lo resuelto en la Fase 2 está al final.

## Identidad principal del portafolio (referencia)
| Elemento | Valor de referencia | Dónde se define |
|---|---|---|
| Hojas de estilo | `assets/css/style.css`, que importa `assets/css/tokens.css` | `style.css` línea 5 (`@import url("./tokens.css")`) |
| Hoja heredada | `assets/estilo.css`: capa de compatibilidad que importa `css/style.css` y define variables viejas (`--tinta`, `--sale`, `--mono`…) | la usan `prototipos/index.html`, `cronograma.html`, `bitacora.html` y la página antigua de P01 |
| Paleta | Modo claro: fondo `#F8FAFC`, superficie `#FFFFFF`, tinta `#0F172A`, acento `#0F9D84`; semánticos `--tg-warning #D97706`, `--tg-danger #DC2626`, `--tg-coral #F2603D`, `--tg-info #2563EB`, `--tg-purple #6B4EE6` | `tokens.css` (`--tg-*`), con alias en `style.css` (`--accent-primary`, `--text-main`…) |
| Tipografía | Texto **Inter**, títulos **Bricolage Grotesque**, datos **JetBrains Mono** | `--tg-font-sans`, `--tg-font-display`, `--tg-font-mono` |
| Navegación | Menú común `#menu` generado por `assets/sitio.js` (+ `datos/proyecto.js`) y pie `#pie` | todas las páginas del sitio |
| Encabezado de prototipo | enlace «← Prototipos» (`.volver`), ceja `P0X · Nombre` y `h1` corto con `<em>` en acento | convención de `prototipos/README.md` |
| Etiqueta de simulación | badge «SIMULACIÓN LOCAL · SIL · DATOS SINTÉTICOS» (introducido en P02 y P10) | por estandarizar |

> No existe `sitio.css`: la hoja compartida del sitio es `assets/css/style.css` (con `tokens.css`); `assets/sitio.js` solo arma el menú y el pie.

## Matriz por prototipo

| Prototipo | Hoja de estilos que usa hoy | Paleta | Tipografía (medida en el navegador) | Barra de navegación | Desviaciones frente a la identidad principal |
|---|---|---|---|---|---|
| **P01** · MQTT (`P01-mqtt-base/simulador-3d/`) | Página: `style.css` (+ `tokens.css`) y un `<style>` propio corto (usa `--font-*`, `--text-*`). Simulador: `simulador.html` con CSS propio (`codigo/style.css`, 18 colores) cargado por **`iframe`**. Páginas antiguas `P01-mqtt-base/index.html` y `banco.html`: `assets/estilo.css` (heredada). | Página: tokens. Simulador: papel `#EEF3F1`, tinta `#14213D`, violeta `#6B4EE6`, grises `#5B6B7A`/`#9FB0C4`. Páginas antiguas: verde `#0F9D84` y tinta `#14213D` de la paleta Fase I. | Página: títulos Bricolage, mono JetBrains; **Inter no se carga** (el `<link>` pide Atkinson), el texto cae a la fuente del sistema. Simulador: Bricolage + Atkinson incrustadas. | Hereda el menú del portafolio en la página; el simulador (dentro del `iframe`) no tiene menú. | 1) `iframe` (P02 y P10 ya no lo usan). 2) Dos generaciones de páginas: la del simulador 3D (tokens) y `index.html`/`banco.html` en la hoja heredada. 3) Ceja «Prototipo P01 · Protocolo de Comunicación · Avance 1» fuera del formato `P0X · Nombre`. 4) Sin badge SIL. 5) `tinta #14213D` ≠ `--tg-border-strong #0F172A`. |
| **P02** · Inspector de hardware (`P02-sensores/`) | `style.css` + `assets/css/inspector_hw.css` (panel y consolas; usa `--tg-*` con valores de respaldo, 39 usos) + `inspector3d.css` (estilos del 3D, generados desde `codigo/style.css`, bajo `.p02-sim`). Sin `iframe`. | Mixta: barra superior clara (tokens); consolas oscuras `#10141A`/`#181C22`, cian `#00F2FE`, foco `#FFD23F`, estados `#EF4444`/`#FBBF24`; 3D con tinta `#14213D`, `#0F9D84`, `#6B4EE6`, `#F2603D`. | Títulos Bricolage; consolas JetBrains; el 3D usa **Atkinson** de forma explícita; el texto de la página cae a la fuente del sistema (Inter no se carga). | Hereda el menú del portafolio. `simulador.html` (pantalla completa) no tiene menú, a propósito. | 1) La paleta oscura de las consolas (`#10141A`, `#00F2FE`…) **no existe en `tokens.css`**. 2) Tres familias de texto conviven (Inter de respaldo, Atkinson en el 3D, JetBrains en las consolas). 3) Badge SIL propio (ámbar), sin componente compartido. |
| **P03** · Radar ultrasónico | `style.css` + un `<style>` propio grande (24 colores; usa `--font-*`). | Radar oscuro estilo Tailwind *slate*: `#0F172A`, `#1E293B`, `#94A3B8`, `#E2E8F0`; verde `#22C55E`, celeste `#38BDF8`, rojo `#EF4444`. | Títulos Bricolage, datos JetBrains; texto de la página en fuente del sistema (Inter no se carga). | Hereda el menú del portafolio. | 1) Paleta oscura distinta de la de P02/P10 (`#0F172A` + `#38BDF8` frente a `#10141A` + `#00F2FE`). 2) La escena del radar y su alerta se limitan a 520 px de ancho. 3) Sin badge SIL (publica telemetría real a un broker público, pero el sensor es simulado). 4) Carga `mqtt.min.js` desde unpkg **sin versión fija**. |
| **P04** · Simulador 1 + ESP32 | Página: `style.css` (7 usos de variables, sin colores propios). Simulador: `simulador.html` con CSS propio (`codigo/style.css`, 52 colores) cargado por **`iframe`**. | Simulador: grises y verdes Tailwind (`#CBD5E1`, `#E2E8F0`, `#64748B`, `#4ADE80`, `#D1FAE5`) y verde `#0B7A66`. | Página: Bricolage + JetBrains, texto en fuente del sistema. Simulador: Bricolage + Atkinson incrustadas. | Hereda el menú en la página; el simulador no tiene menú. | 1) `iframe`. 2) Es el único prototipo `EN VIVO · MQTT v2.0.0` y la página no lo indica con un badge (ni SIL ni EN VIVO). 3) Verdes propios (`#0B7A66`, `#4ADE80`) en lugar de `--tg-accent #0F9D84`. 4) `arquitectura.html` y `como-funciona-app.html` lo llaman «P04 (SIL)»; las etiquetas nuevas lo marcan «EN VIVO · MQTT v2.0.0»: conviene aclarar «robot simulado, conexión en vivo». |
| **P05** · Gemelo Digital | `style.css` + un `<style>` propio muy grande (51 colores; usa `--font-*` 44 veces). | Tablero tipo *cockpit* con pasteles Tailwind: `#FDE68A`, `#7DD3FC`, `#86EFAC`, `#FECACA`, `#E0F2FE`, sobre grises `#E2E8F0`/`#94A3B8`. | Títulos Bricolage, datos JetBrains; texto en fuente del sistema (Inter no se carga). | **Oculta el menú del portafolio** (`#menu { display: none; }`) y lo reemplaza por su propia cabecera de cockpit (`.cockpit-hdr`) y un dock inferior en el móvil. | 1) **Es el único prototipo sin la barra de navegación del portafolio**, sin enlace «← Prototipos» y sin ceja; `h1` «P05 · Gemelo Digital · Teach & Repeat» fuera del formato. 2) La paleta pastel no sale de los tokens. 3) Ancho propio de 1248 px (P02/P10 usan 1280 px, el sitio 1080 px). 4) Menciona SIL 6 veces pero sin el badge estándar. 5) Su indicador MQTT es simulado y `arquitectura.html` lo dibuja conectado al broker. |
| **P10** · Ruta lineal | `style.css` + `ruta_lineal.css` propio (45 colores; **no usa variables `--tg-*`**). Sin `iframe`. | Escena clara `#E4ECE9`; panel oscuro `#10141A`/`#181C22`, cian `#00F2FE`, violeta de alarma `#6B4EE6`/`#A78BFA`, estados `#EF4444`/`#F59E0B`. | Bricolage, Atkinson y JetBrains escritas por nombre en el CSS (sin `--tg-font-*`); el texto de la página cae a la fuente del sistema. | Hereda el menú del portafolio. | 1) Duplica a mano la paleta oscura de P02 (`inspector_hw.css` y `ruta_lineal.css` la definen por separado). 2) No usa `--tg-*`. 3) Badge SIL propio, igual al de P02 pero en otro archivo. |

## Hallazgos transversales
1. **Inter no se carga en ninguna página de prototipo.** `tokens.css` declara Inter como fuente de texto, pero los `<link>` de Google Fonts de P01–P05 y P10 piden Atkinson Hyperlegible: el cuerpo se ve en la fuente del sistema (Segoe UI, Roboto…). Atkinson solo se usa dentro de P02 y P10; en P01, P03, P04 y P05 se pide y no se usa. La portada (`index.html`) sí carga Inter.
2. **No hay paleta oscura en los tokens.** P02, P03, P05 y P10 tienen consolas o tableros oscuros con cuatro paletas distintas.
3. **Tinta duplicada:** `#14213D` (P01, P02 3D, estilo heredado) frente a `--tg-border-strong #0F172A`.
4. **Dos `iframe` siguen activos** (P01 y P04), mientras que P02 y P10 integran el simulador en la página.
5. **Badge de ejecución sin componente común:** solo P02 y P10 muestran «SIMULACIÓN LOCAL · SIL · DATOS SINTÉTICOS»; P04 (EN VIVO) no muestra nada.
6. **Encabezados irregulares:** P01 y P05 no siguen el formato «← Prototipos · `P0X · Nombre` · h1 corto»; P05 además oculta el menú del portafolio.
7. **Hoja heredada todavía en uso:** `assets/estilo.css` en `prototipos/index.html`, `cronograma.html`, `bitacora.html`, `P01-mqtt-base/index.html` y `banco.html`.

## Propuesta para la siguiente fase (sin aplicar)
- Agregar a `tokens.css` una paleta oscura de consola (`--tg-console-bg`, `--tg-console-card`, `--tg-console-accent`…) y hacer que P02, P03, P05 y P10 la usen.
- Cargar Inter (o cambiar el token a Atkinson Hyperlegible) en todas las páginas de prototipo, y quitar las fuentes que se piden y no se usan.
- Crear un componente común de badge de ejecución (`SIL` / `EN VIVO · MQTT v2.0.0`) con los mismos valores de `TG.etiquetas`.
- Integrar sin `iframe` los simuladores de P01 y P04, como ya se hizo en P02 y P10.
- Normalizar el encabezado de P01 y P05 (enlace de vuelta, ceja y `h1`) y devolverle a P05 el menú del portafolio.
- Migrar las páginas que aún usan `assets/estilo.css` a `assets/css/style.css`.

## Discrepancias de contenido en páginas fuera de este cambio (para revisar)
- `arquitectura.html` y `como-funciona-app.html`: llaman «P04 (SIL)» al único prototipo `EN VIVO · MQTT v2.0.0`; `arquitectura.html` dibuja al Gemelo P05 conectado al broker (su MQTT es simulado) y no menciona P10 ni la ruta lineal.
- `hardware.html`: enlaza «Lista de materiales v1», mientras que `datos/proyecto.js` describe la matriz de hardware v2.
- `tesis/capitulo_3.md`: sigue marcando P06 «En pruebas»; en el portafolio ahora es **Planificado** (no hay código en el repositorio).

## Estado tras la Fase 2 (25/11/2026)
| Hallazgo | Estado | Cómo se resolvió |
|---|---|---|
| 1. Inter no se carga en los prototipos | ✅ Resuelto | Las 6 páginas (P01–P05, P10) cargan Inter; P02 y P10 dejaron de escribir Atkinson y usan `--tg-font-sans`. También `arquitectura.html`, `como-funciona-app.html` y `hardware.html` cargan Inter. |
| 2. Sin paleta oscura en los tokens | ✅ Resuelto | `tokens.css` define la paleta oscura oficial `--tg-dark-*` (fondo, superficies, bordes, texto principal/secundario y estados OK / Aviso / Fallo / alarma / foco). P02 (`assets/css/inspector_hw.css`), P10 (`ruta_lineal.css`), P03 (su `<style>`) y P05 (alias `--s2-*`) la usan. El dibujo en `canvas` conserva sus colores en JavaScript (no se tocó la lógica). |
| 3. Tinta duplicada `#14213D` | ⏳ Pendiente | Sigue en los simuladores 3D de P01, P02 y P04 y en `assets/estilo.css`. |
| 4. `iframe` en P01 y P04 | ✅ P01 (Fase 3) · ⏳ P04 | P01 monta su simulador 3D directo en la página (`simulador3d.js` + `simulador3d.css` acotado a `#p01-sim`). P04 **conserva el `iframe` a propósito**: su CSS controla `html`/`body` (scroll, `position: fixed` del D-Pad y de los paneles móviles) y su estado visual cuelga de `document.body.dataset` (conexión App/local, modo, encendido), atado al flujo de conexión con `mqtt_puente.js`. Integrarlo exigiría tocar ese flujo y no se puede verificar en vivo contra los brokers desde la CI; en la Fase 3 solo se optimizó el refresco del DOM (sin tocar el puente). |
| 5. Badge de ejecución sin componente común | ✅ Resuelto | `assets/css/prototipos.css` (importado por `style.css`): `.tg-ejec--sil` en P01, P02, P03, P05 y P10 y `.tg-ejec--vivo` («EN VIVO · MQTT v2.0.0 · ROBOT SIMULADO») en P04. |
| 6. Encabezados irregulares | ✅ Resuelto | Encabezado común `.proto-intro` (← Prototipos · ceja `P0X · Nombre` · h1 corto · badge) en los 6 prototipos. P05 recupera el menú del portafolio. |
| 7. Hoja heredada `assets/estilo.css` | ⏳ Pendiente | Sigue en `prototipos/index.html`, `cronograma.html`, `bitacora.html` y las páginas antiguas de P01. |
| Discrepancias de contenido | ✅ Resuelto | `arquitectura.html` y `como-funciona-app.html` (P04 EN VIVO, P05 simulado), `hardware.html` (BOM v2: `hardware/materiales/lista-materiales-v2.xlsx`) y `tesis/capitulo_3.md` (P06 Planificado, P10 agregado). |
