# Fix Log — Axl Lake EPK

> Bitácora cronológica de bugs corregidos.

---

*No hay fixes registrados aún. El proyecto está en fase de planificación.*

## 2026-03-31: Fix de Bugs y Problemas Visuales del Auditor
**Reportado en:** `_brain/audit_current.md`

### Causa Raíz
El auditor identificó una serie de problemas técnicos (falta de archivos WebP, favicons faltantes), bugs de CSS layout (ausencia de altura en imagen hero en mobile), problemas de contraste visual UI, y redundancia de fotos en múltiples secciones, generadas durante la etapa inicial de implementación del design plan.

### Soluciones Aplicadas
- **BUG-001:** Se migraron todas las imágenes a WebP moviendo las copias desde `Material/WebP/` hacia `assets/images/` y `assets/logos/`. Referencias en `index.html` actualizadas.
- **BUG-002:** Se actualizó `index.html` para enlazar como favicon al archivo `.webp` del logo.
- **BUG-003:** Se aplicó `height: 500px;` explícito a `.hero__image` en breakpoints móviles.
- **BUG-004:** La grilla de Instagram se pobló utilizando los artworks WebP recortados proporcionalmente. 
- **DES-001:** Se transformó el estilo de las imágenes en `.bio__image` (`border-radius: 50% 50% 0 0;`) y `.visuals__featured` (filtro agresivo grayscale con un box-shadow sólido) para evitar redundancia visual con la foto del Hero.
- **DES-002:** Se redujo `--space-section` a `clamp(4rem, 8vw, 6rem)` y el `min-height` del `hero__container` a `90vh` reduciendo severamente el desplazamiento vacío.
- **DES-003:** Elevado contraste para textos subtítulos de color del hero al `--color-text-secondary`.
- **DES-004 / DES-005:** Placholders actualizados para Próximos Lanzamientos utilizando gradientes con bordes limpios, realce en sección visuales.
- **DEBT-004:** Animación en micro-interacciones aplicados usando `translateY(-2px) translateX(2px)` a clase `btn-primary` y `btn-secondary`.
- **DEBT-005:** Las imágenes originales implementadas del landing ya contaban con `filter: contrast(1.05) brightness(0.95);` (falso positivo del reporte).

### Archivos Modificados
- `index.html`
- `css/sections.css`
- `css/design-tokens.css`
- `css/components.css`

### Validación
Los WebP fueron copiados con éxito, y la revisión por el CSS y HTML ha comprobado que todos los elementos ahora muestran el peso óptimo y diseño correspondiente en todo tamaño de viewport.

## 2026-03-31: Ajustes de Composición Visual (Hero & Mobile)
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
Insatisfacción con la adaptación responsive del hero y las proporciones de los logos en desktop y mobile. La imagen del hero original (aspect ratio 4:5) forzaba la altura del contenedor en desktop. En mobile, el layout por defecto de flexbox mostraba el texto antes que la foto.

### Soluciones Aplicadas
- **Hero Desktop Height:** Se modificó la regla `min-height: 90vh` a un modelo confinado usando `height: 100vh; min-height: 600px; max-height: 1080px;`, previniendo que la imagen deforme el contenedor verticalmente.
- **Logos:** Se incrementó sustancialmente el tamaño de ambos recursos de marca:
  - Header logo: de `120px` a `240px` en desktop (y `180px` en mobile).
  - Hero logo: de `280px` a `max-width: 800px` con ancho responsivo en desktop.
- **Hero Mobile Layout (Stack reordenado):** Se implementó una redistribución usando CSS `order` flexbox (Desktop hero order reseteado y en mobile reorganizado). 
  - La fotografía (`.hero__image`) ahora se posiciona primera con una altura de `65vh` (cubriendo 2/3 de pantalla al abrirlo).
  - Se modificó la orientación del gradiente sobre la imagen (`.hero__image-gradient`) a vertical `to top`, fundiendo hacia negro oscuro el borde inferior de la foto en un 40%.
  - El contenido de texto (`.hero__content`) ahora usa un `margin-top: -160px` y `z-index: 2` de forma que traslapa/overlap sobre la capa de gradiente oscura de la foto. Dentro del texto, el logo pasa a ocupar la primera posición (centrada) seguido del subtexto Location / Role.

### Archivos Modificados
- `css/sections.css`

### Validación
Revisión directa visual con el layout ajustado asegurando que el diseño Mobile First luzca exactamente como la estructura sugerida: "Foto -> Gradiente inferior -> Logo centrado -> Profesión chiquita -> Textos left-aligned -> Botones y RRSS".

## 2026-03-31: Ajuste Fino de Layout Hero e Integración de Foto de Prensa
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
1. La foto en el hero no correspondía a la versión V2 suministrada por el usuario, y la configuración restrictiva del height del hero (`height: 100vh; max-height: 1080px;`) combinada con el gran tamaño del logo provocaba que el texto inferior se recortara ("mochara") debido al `overflow: hidden`, desapareciendo redes y botones enteros en monitores laptop.
2. El contenedor de la imagen carecía de la habilidad para estirarse al límite intrínseco de su flex parent, forzando a la imagen a recortarse cerca al cuello impropiamente con el `object-fit`.
3. El logo en el sticky header estorbaba de forma redundante la impresión inicial gigante del logo en el hero.
4. En móvil, el margen negativo `-160px` y la extensión del gradiente provocaban que el logo flotara demasiado arriba ("sobre el pecho").

### Soluciones Aplicadas
- **Actualización Asset:** Se importó la fotografía V2 (4:5) `foto-prensa-blanco-negro-axl-lake-v2.webp` en todas las referencias web.
- **Liberación de Restricción Vertical:** Se revirtió el `.hero__container` a `min-height: 100vh`, permitiendo que el contenido pueda envolver texto y expandir la página sin amputar los botones. Y se dio `align-self: stretch` a la imagen para que rellene todo el ancho disponible orgánicamente sin forzar alturas irreales ni recortar cuello.
- **Sizing de Logo:** Se balanceó el `max-width` absoluto del logo del Hero a `500px` recortando también su margen (`var(--space-sm)`) para no empujar erróneamente toda la grilla si la pantalla es de baja resolución.
- **Ocultamiento de Logo Sticky:** Se agregó control de opacidad de UI a `.header__logo { opacity: 0; visibility: hidden; }` el cual reacciona en reversa (`opacity: 1`) exclusivamente cuando el Javascript inyecta la clase `.header--scrolled`. Ya no hay redundancia en la cabecera cuando estás en TOP=0.
- **Calibración Mobile:** Se bajó sustancialmente el margen negativo de la caja de contenido a `margin-top: -80px;`. El gradiente móvil inferior fue ampliado de `40%` a `60%` asegurando que toda la parte traslapada posea un tono puro y oscuro para hacer destacar el logo blanco al 100% como se solicitó. 

### Archivos Modificados
- `index.html` (Referencias de Assets)
- `css/sections.css` (Fixes)

## 2026-03-31: Refinamiento de Hero - Integración de Material Cuadrado V2
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
La primera iteración aún generaba espacios y recortaba contenido indeseable en ciertas relaciones de aspecto de escritorio porque contenía márgenes ciegos impresos directamente en el asset del logo original, y porque el layout permitía desbordamiento (overflow) cuando se restringía la altitud perdiendo los calls to action. Las imágenes solicitadas ahora son formato cuadrado sin márgenes en el render PNG original.

### Soluciones Aplicadas
- **Actualización de Media Core:** Se importó e instruyó globalmente la adopción del logo optimizado `axl-lake-logo-white-v2.webp` en header, hero y footer, junto a la adopción agresiva del nuevo cover `foto-prensa-blanco-negro-axl-lake-cuadrado.webp` para visualización Hero y Desktop (reemplazando universalmente).
- **Hard-Clamping Vertical (Desktop):** Se configuró el Parent del Hero a un comportamiento blindado: `height: 100vh; overflow: hidden;` de forma estricta. Todo elemento se renderiza, recorta y alinea de manera endogámica al borde físico del viewport.
- **Dynamic Content Padding:** Para impedir que la estricta altura de `100vh` corte los botones se redujo inteligentemente la dilatación (padding) usando viewport height: `padding: clamp(var(--space-md), 4vh, var(--space-3xl))` absorbiendo y aplastando los márgenes automáticamente en laptops pequeñas sin esconder botones.
- **Relación de Aspecto en Logo:** El logo v2 sin márgenes permitió escalar la anchura base (`max-width: 650px;`) logrando protagonismo tipográfico colosal sin asaltar ni reventar las líneas limítrofes.
- **Ratio Mobile de Foto Cuadrada:** Reducción de la cobertura vertical de la imagen mobile (`height: 55vh;`) para impedir cortes excesivos en una materia prima tan plana (1:1).
- **Elevación de Gradiente:** El gradiente del fondo trepa más alto sobre la foto restando menos `margin-top: -60px` al bloque inferior para acoplar impecablemente el texto en el tramo de umbría absoluta de la fotografía.

### Archivos Modificados
- `index.html` (Nuevas menciones a recursos WebP)
- `css/sections.css` (Clamp Vertical, Tiempos Altura y Ratio)

## 2026-03-31: Refinamiento Estético Final (Logos & Espaciados)
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
La escalada del nuevo logo V2 maximizó desproporcionalmente el componente debido a la carencia de márgenes nativos, eliminando el "aire visual" (espacio negativo) requerido para sostener un look 'luxury' elegante y poco saturado. 

### Soluciones Aplicadas
- **Redimensionamiento Sutil:** Se contrajo el tamaño radical de `650px` a unos más conservadores `400px` (Desktop) y `200px` (Mobile), los cuales ahora proyectan limpieza y contundencia sin ser abusivos.
- **Micro-Espaciados (Breathing Room):** Se orquestó un margen expansivo alrededor del logo del Hero en variables tipográficas modernas (`margin: var(--space-xl) 0 var(--space-lg);`) aislando sutilmente el nombre del rol superior y la cita inferior; dotándolo de presencia protagónica y separando efectivamente la comunicación visual.

### Archivos Modificados
- `css/sections.css` (Márgenes y Size constraints)

## 2026-03-31: Refinamiento de Animación y Tamaño del Sticky Header
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
El logo persistente en la barra de navegación superior compartía demasiado protagonismo visual al ser grande, y la aparicion del menú era demasiado temprana (60px) lo que generaba un quiebre en la inmersión de la pantalla completa del Hero, restándole elegancia al scroll-down.

### Soluciones Aplicadas
- **Reducción Vectorial Meticulosa (30%):** El logotipo dentro del bloque header (`.header__logo img`) fue achicado estrictamente un 30% manteniendo la altura base del contenedor sin afectar clics. 
  - Desktop: de `200px` a `140px`
  - Mobile: de `180px` a `126px`
- **Re-calibración de Scroll JavaScript:** Se modificó la escucha del evento de scroll en la UI; reemplazando el trigger primitivo y estático `window.scrollY > 60` hacia un modelo matemático relativo adaptativo: `window.scrollY > (window.innerHeight * 0.8)`. De este modo la barra negra (con el logo opaco) empieza su desvanecimiento tipo 'fade-in' fluido *exactamente* en el momento armónico en que el usuario ya está pasando exitosamente el Hero perdiendo el 80% de ese bloque visual.

### Archivos Modificados
- `js/main.js` (Lógica trigonométrica de Hero-Exit)
- `css/sections.css` (Redimensionamiento Sticky Navigation)

## 2026-03-31: Refinamiento de Estructura Hero Móvil y Logo Fijo
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
En móvil, el usuario enfrentaba dos problemas:
1. El orden visual no era el ideado (Logo -> DJ/Productor -> Ubicación) y los elementos tenían demasiado margen entre sí, causando que el logo estuviese solapado muy arriba (cerca a la altura del pecho).
2. La doble-aparición del logo: Al bajar, el logo inicial pasaba y aparecía bruscamente el menú oscuro con *otro* logo redundante.

### Soluciones Aplicadas
- **Reordenamiento Nativo en el DOM:** Alteré `index.html` para reflejar natural y permanentemente el orden "Logo > Rol > Locación".
- **Compactación y Descenso Vertical:** Removí trucos de margen y empleé el gap del layout base. Reubiqué el margen superior e inferior (`margin: 0 0 8px 0`) logrando que estén pegados y esto bajó considerablemente la altura, apoyándose correctamente al comienzo del gradiente negro. Añadí el icono "📍".
- **Tracking Constante (Logo Inmortal):** Se orquestó una táctica avanzada en JS. Se ocultó el logo base del Header para móviles permanentemente. En cambio, se usó un `IntersectionObserver` rudimentario que detecta cuando el logo del hero llega a `top: 24px`. En ese nanosegundo, JS le inyecta `position: fixed` manteniéndolo en la barra y redimensionándose un 10% adicional (vía CSS transition), simulando a la vista del usuario que el logo "vuela" y se acuesta en el menú perpetuamente.

### Archivos Modificados
- `index.html` (Reestructuración estructural natural)
- `css/sections.css` (Clases sticky `.hero__logo--stuck`)
- `js/main.js` (Trackeo de scroll top para el placeholder)

## 2026-03-31: Corrección de Deformación de Logo y Espaciados
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
1. **Animación brusca y deformación:** El truco previo de mover el DOM del logo hacia el header interrumpía el flujo de CSS ('recalc') forzando una teletransportación abrupta. A su vez, el contenedor flex del header deformaba el "114px" en un intento de estiramiento vertical (sin height: auto).
2. **Posicionamiento muy alto en la foto:** El gradiente negro llegaba muy arriba (hasta el cuello) y el margen negativo (-60px) obligaba al contenido del Hero a invadir demasiado la zona clara de la foto.
3. **Distribución de Roles:** El logo, el rol y la ubicación se sentían ligeramente distanciados visualmente en la composición móvil.

### Soluciones Aplicadas
- **Transición Cross-Fade Suave (Adiós Teletransportación):** Revertí y eliminé el complejo hack de manipulación del DOM (`appendChild`). Se regresó a la solución probada: el `header__logo` nativo hace un fade-in suave, mientras que en JS le inyecté un fade-out (`opacity: 0`) exacto al logo del hero cuando este toca la barra (`top <= 24px`). Logré la misma ilusión visual requerida sin modificar la estructura del documento.
- **Encuadre al Pecho:** Empujé el bloque de texto mucho más abajo (reduje `margin-top` de `-60px` a `-30px`) y obligué al gradiente (`linear-gradient`) a iniciar muchísimo más abajo en la imagen (`transparent 45%`). Todo el bloque recayó al nivel del pecho del retrato.
- **Compresión Estética:** Reduje en un ~40% todos los micromárgenes internos entre `.hero__logo`, `.hero__role`, y `.hero__location` usando compensación por márgenes negativos mínimos (`margin-bottom: -6px`), acercándolos a nivel de revista.

### Archivos Modificados
- `css/sections.css` (Eliminación de clases stuck, ajuste padding/margin)
- `js/main.js` (Remoción de DOM manipulation -> Fade Out logic)

## 2026-03-31: Prevención de Resizing por Barra URL e Implementación de Scroll Parallax (Zoom-Out)
**Reportado por:** Usuario (Axl Lake)

### Causa Raíz
El "zoom in" indeseado en móviles al iniciar el scroll era ocasionado indirectamente por el comportamiento nativo de Safari/Chrome: Cuando el usuario hace scroll hacia abajo, la barra direccional del navegador se entromete o colapsa, lo que hace que la medida `vh` (Viewport Height) crezca súbitamente. Esto obligaba a la imagen (`object-fit: cover`) a crecer estirándose, recreando ese salto/zoom torpe.

### Soluciones Aplicadas
- **Inmunización del Viewport (JS Pixel-Freeze):** Confirmado que el cambio a CSS `svh` falla en algunas configuraciones móviles donde la barra aún afecta el bounding box, implementé una sobreescritura implacable en `js/main.js`. Al cargar la página, JavaScript lee la altura actual del `.hero__image` y la congela dinámicamente en píxeles absolutos (`lockedHeight + 'px'`). Con la altura literalmente congelada por código, **es imposible** que el contenedor se deforme y cause un pseudo-zoom.
- **Parallax Disable (Desktop):** Tal como se solicitó, la animación de la foto ha quedado deshabilitada exclusivamente en pantallas de escritorio (`> 767px`), retornando temprano en Javascript sin inyectar transforms, pero conservándola invicta para la versión Mobile.
- **Crossfade Progresivo de Header (Mobile):** Se eliminó el "salto brusco" del header pegajoso. En lugar de obedecer a un límite binario de encendido o apagado, The header logo, background blur, and old hero logo fade synchronously opacity-by-opacity depending on the exact percentage of scroll over a 100px vertical zone, granting an ultra-fluid editorial transition. 
- **Parallax Fluid Zoom-In (Mobile):** 
  1. *Inicio:* La imagen vuelve a cargar por defecto en ese tamaño ampliado inicial (`1.15`).
  2. *Acción de Scroll Zoom-In:* Se eliminó la dependencia de `requestAnimationFrame` que los navegadores móviles (Safari) **congelaban y abortaban al deslizar rápido** provocando que la imagen se viera estática. 
  3. Ejecución Directa: Ahora la fórmula se ejecuta de manera sincrónica y violenta forzando a la GPU con `scale3d` `translateZ` a escalar la imagen ininterrumpidamente hasta su tamaño colosal `1.35` sin dar lugar al iOS a pausarlo.
- **Jerarquía Visual en Desktop:** Se revirtió el test visual de colocar "DJ / Productor" por encima del logo a petición del usuario; se ha restaurado la versión definitiva donde el Rol acompaña visualmente por debajo al Logo principal en todas las resoluciones.
- **Evolución Tipográfica:** Se reemplazó el paquete tipográfico para escalar la elegancia.
  1. *Prata:* Implementada `Prata` para todos los titulares (H1-H4, tagline). Se eliminó por completo el estilo cursiva (`italic`) de todas las secciones para mantener un aspecto moderno y directo. Se ajustaron las escalas matemáticas `clamp` al alza para garantizar que los títulos sean grandes y perfectamente legibles en móviles y desktop.
  2. *Space Grotesk:* Implementada como la tipografía para los *Textos Secundarios* (botones, meta-datos de canciones, fechas, roles y locaciones); elevando el aspecto puramente "Editorial", brindando un respiro de lectura muy moderno.
  3. *Inter:* Mantenida para los bloques grandes de párrafo. Se incrementó matemáticamente el límite inferior y superior del tamaño de fuente (`--text-body`) para asegurar legibilidad suprema del texto base en todos los dispositivos de visualización.

### Archivos Modificados
- `index.html` (Remoción de foto en Bio, limpieza de DOM, nuevas llaves ?v=fin15 forzando reseteo).
- `css/sections.css` (Reestructuración layout Bio: flex-column, text-center global, text-left para mobile).
- `css/design-tokens.css` (Tallas de párrafo calibradas al alza).

---
## 2026-04-01: Sección Línea Musical — Editorial Gallery + Motion Premium

**Reportado en:** Solicitud del usuario

### Implementación
- **Editorial Gallery Redesign:** Se reconstruyó completamente la sección "Línea Musical" como una **galería editorial** con experiencia tipo exhibición.
- **Hero Editorial:** El título "LÍNEA MUSICAL" ahora aparece en tamaño `--text-display` con `letter-spacing: 0.2em` y una línea divisoria con micro-brillo gradiente (warm-gray → white → warm-gray).
- **Grid Asimétrico:** Se implementó un CSS Grid asimétrico con:
  - Card 01 (GÉNEROS): columna izquierda, expandida verticalmente en 2 filas.
  - Cards 02 + 03 (ENFOQUE, CONSTRUCCIÓN): columna derecha, apiladas.
  - Card 04 (IDEAL PARA): fila completa horizontal inferior.
- **Cards de Lujo:** Cada card tiene:
  - Número enorme (3.5–5.5rem) posicionado absolutamente con `opacity: 0.04` como detalle de fondo.
  - Borde mínimo (6% opacidad) con sombra interna imperceptible.
  - Hover que sube la opacidad del borde a 12%, añade sombra externa y desplaza el número 3px (micro-movement).
- **Sistema de Animación Editorial (JS):** Se creó `initEditorialReveal()` con `IntersectionObserver` dedicado:
  1. Título: opacity + blur(8px→0) en 1s.
  2. Línea: scaleX(0→1) tras 300ms.
  3. Intro: opacity + translateY(12px→0) tras 550ms.
  4. Cards: cascada stagger de 100ms (750ms, 850ms, 950ms, 1050ms).
- **Accesibilidad:** Se respeta `prefers-reduced-motion` tanto en CSS como en JS.
- **Mobile:** Grid colapsa a una columna, tracking del título se reduce para legibilidad.

### Archivos Modificados
- `index.html` (HTML reestructurado con clases editorial-*, data attributes para animaciones).
- `css/sections.css` (~160 líneas nuevas: grid asimétrico, card styling, sistema editorial-reveal).
- `js/main.js` (Nueva función `initEditorialReveal()` con observer independiente y stagger secuencial).

---
## 2026-04-01: Ajustes de Contenido en Sección Música

**Reportado en:** Solicitud del usuario

### Implementación
- Eliminados todos los elementos `<span class="track__year">` (fechas de publicación como 2024, 2020, 2019) de las canciones en la sección "Música" para limpiar la lectura de los tracks.
- Renombrado de "Break My Heart – Dua Lipa (Bootleg Remix)" a "Break My Heart – Dua Lipa (Remix)" a petición explícita.
- Limpieza de CSS: Eliminada la regla `.track__year` en `css/sections.css` al volverse obsoleta.

### Archivos Modificados
- `index.html` (Remoción de spans, renombramiento, cache bust `?v=fin16`).
- `css/sections.css` (Remoción de clase `.track__year`).

---
## 2026-04-01: Layout Grid Horizontal para 'Etapa Anterior'

**Reportado en:** Solicitud del usuario

### Implementación
- Modificación de layout exclusivamente para el subbloque "Etapa anterior" en pantallas Desktop.
- Creada clase modificadora `.music__tracks--grid` (CSS Grid, 3 columnas) aplicada en `index.html`.
- Forzado alineamiento vertical (`flex-column`) interno de las tarjetas dentro de este grid (imagen centrada/expansiva arriba, título e info apilados abajo).
- Preservado comportamiento móvil en `@media (max-width: 767px)` colapsando el grid a una sola columna para no romper la versión mobile.

### Archivos Modificados
- `index.html` (Inclusión de la clase modificadora al contenedor, cache bust `?v=fin17`).
- `css/sections.css` (Reglas desktop y overrides mobile para `.music__tracks--grid`).

---
## 2026-04-01: Desglose de Artistas y Renombramiento a (Axl Lake Remix)

**Reportado en:** Solicitud del usuario

### Implementación
- Se separaron los artistas de los títulos en las canciones, moviendo los nombres de los artistas a un nuevo tag `<span class="track__artist">` por debajo del título.
- Se implementó estilo para `.track__artist` con `var(--font-body)` y tamaño `var(--text-small)`, con `font-weight: 300` para mostrarse más liviano y elegante como se pide en los estándares de la industria musical.
- Se actualizaron todos los remixes para mostrar expresamente "Axl Lake Remix" en su respectivo título (ej. "Break My Heart (Axl Lake Remix)", "Te Amo (Axl Lake Remix)").

### Archivos Modificados
- `index.html` (Estructuración de `<span class="track__artist">`, renombre de títulos a Axl Lake Remix, cache bust a `?v=fin20`).
- `css/sections.css` (Añadido block css para `.track__artist`).

---
## 2026-04-01: Próximos Lanzamientos — Stat Tiles con Count-Up

**Reportado en:** Solicitud del usuario

### Implementación
- **Reemplazo completo:** Los 7 placeholders individuales fueron eliminados y reemplazados por 3 tiles estadísticos que comunican el desglose por tipo: 3 Originales, 2 Colaboraciones, 2 Remixes.
- **Estructura de cada tile:**
  1. Número grande en Prata (3rem–4.5rem) con count-up animado.
  2. Label uppercase en Space Grotesk con letter-spacing amplio.
  3. Progress bar minimal (2px, gradiente warm-gray→white) que se dibuja al entrar.
  4. Fracción "X / 7" como indicador secundario.
- **Motion (scroll-trigger, `initUpcomingTiles()`):**
  - Cards entran en cascada con stagger de 120ms, `y:10→0, opacity 0→1`.
  - Count-up de 0→target en 1100ms con `easeOutCubic`.
  - Bar fill se anima 200ms después del reveal del tile vía CSS transition (1.2s `easeOutExpo`).
- **Hover premium:** `translateY(-2px)`, borde sube a 12% opacidad, sombra 8px/32px, bar-fill sube `brightness(1.15)`.
- **Responsive:** Desktop 3 columnas, mobile stack 1 columna.
- **Accesibilidad:** `prefers-reduced-motion` desactiva todas las animaciones y muestra valores finales instantáneamente.

### Archivos Modificados
- `index.html` (HTML reestructurado con `.upcoming-tiles`, `data-count-to`, `data-fill-to`, cache bust `?v=fin21`).
- `css/sections.css` (~100 líneas: tile styling, bar, reveal states, responsive, reduced-motion).
- `js/main.js` (Nueva función `initUpcomingTiles()` con count-up easeOutCubic y observer).

---
## 2026-04-01: Optimización de Tiempos de Animación - Línea Musical

**Reportado en:** Problema de UX (Scroll rápido sobrepasaba el revelado tardío) por el usuario.

### Implementación
- Se redujeron de manera considerable los tiempos de revelado (delay) y transición (duration) en la sección "Línea Musical" para que el usuario no sobrepase la sección antes de que el contenido sea visible.
- **Tiempos de JS (Timeouts en observer):**
  - Línea: 300ms → 150ms
  - Intro: 550ms → 250ms
  - Inicio de Cascada de Cards: 750ms → 350ms
  - Stagger entre cards: 100ms → 80ms
- **Tiempos de CSS (Transition durations):**
  - Título (blur/opacity): 1s → 0.6s
  - Línea (scaleX): 0.9s → 0.5s
  - Intro (translate/opacity): 0.9s → 0.5s
  - Cards (translate/opacity): 0.7s → 0.4s

### Archivos Modificados
- `css/sections.css` (Reducción en tiempos de transición en clases `.editorial-reveal`).
- `js/main.js` (Disminución drástica de los `setTimeout` de demora en `initEditorialReveal()`).
- `index.html` (Cache bust actualizado a `?v=fin22`).

---
## 2026-04-01: Ajuste de Redundancia en "Material de Prensa"

**Reportado en:** Comentarios del usuario

### Reparación
Se eliminó el titular `<h3>` que decía "Material de Prensa de Axl Lake" ya que la sub-sección resultaba redundante al estar inmediatamente debajo del header general de sección `"Material de Prensa"`. Ahora, los elementos fluyen naturalmente del header directo al botón de visualización/descarga de Google Drive.

### Archivos Modificados
- `index.html` (Eliminación de nodo `.press__subtitle`, actualización de caché `?v=fin23`).

---
## 2026-04-01: Ajuste de Tamaño de Titular "Booking"

**Reportado en:** Comentarios del usuario

### Reparación
Se redujo el tamaño de la fuente (`font-size`) y se ajustó el espaciado de letras (`letter-spacing`) de la clase `.booking__heading` para igualarlo exactamente a los parámetros usados en `.section__title` (el resto de las secciones). Pasó de usar `--text-display` a `--text-h1` para evitar llamar la atención desproporcionadamente en medio de la estructura del *grid*, resultando en un diseño de lectura mucho más equitativo.

### Archivos Modificados
- `css/sections.css` (Cambio de variables y *tracking* en `.booking__heading`).
- `index.html` (Actualización de caché `?v=fin24`).

---
## 2026-04-01: Reemplazo de Grid de Instagram por Captura Realista

**Reportado en:** Comentarios del usuario

### Reparación
Se sustituyó la cuadrícula (grid) de 6 imágenes de la cuenta de Instagram en la sección de "Booking", reemplazándola por una imagen única (`feed-ig-axl-lake.png` proveniente de la carpeta "Material") que simula una captura real del Feed de Instagram. Esto proporciona una apariencia significativamente más realista y mejora la percepción visual del usuario.

### Archivos Modificados
- `index.html` (Reemplazo del nodo `<div class="booking__ig-grid">` por la imagen, actualización de caché a `?v=fin25`).
- `css/sections.css` (Se eliminaron las clases `.booking__ig-grid` y `.booking__ig-thumb`, agregando la estilística para la nueva clase `.booking__ig-screenshot`).

---
## 2026-04-01: Rediseño Editorial de Galería "Visuales"

**Reportado en:** Comentarios del usuario

### Reparación
Se transformó la anticuada sección tipo "single image" de Visuales por una **Galería Editorial Asimétrica con estilo de mosaico**.
- **Layout (*Grid*):** Se distribuyeron las 5 imágenes `.webp` provistas (relación de aspecto originada de 16:9 posadas en retrato) en 3 columnas. Se aplicó un *offset* asimétrico mediante márgenes internos (`padding-top`) específicos a cada columna (0px / 60px / 30px) para lograr esa presentación editorial de alta costura que rompe con la simetría básica.
- **Micro-interacciones y Animación:** Cada imagen fue equipada con *hovers* (aumento sutil en la dimensionalidad `1.04%` de escala, incremento suave de brillo y contrastes).
- **Control de Puesta en Escena (*JS*):** Se agregó un observer intersector `initVisualsReveal()` implementando entrada tipo cascada (*stagger*) con diferencia de `150ms`.
- **Ecosistema Móvil:** Se garantizó que en pantallas <= 767px todo este diseño converja gentilmente a un `block` nativo (o *1fr* puro), quitando la asimetría ineficiente en celulares y mostrando una cómoda galería de cascada vertical pura.

### Archivos Modificados
- Carpeta `assets/images/` (Importación de las 5 fotos en extensión `.webp`).
- `index.html` (Inserción del esqueleto HTML para `visuals-gallery`, sub-columnas y caché incrementado a `?v=fin26`).
- `css/sections.css` (Implementación de módulos para `.visuals-gallery` regular y en *mobile breakpoints*, borrado de código y *overlays* antiguos).
- `js/main.js` (Estructuración y vinculación de función JS controladora `initVisualsReveal()`).

---
## 2026-04-01: Evolución Galería "Visuales" (Patrón de Ladrillo/Honeycomb)

**Reportado en:** Comentarios del usuario

### Reparación
Se integró una sexta imagen (`621A6627.webp`) a la galería editorial recién creada, optimizando el diseño para que las 6 imágenes generen una secuencia rítmica perfecta (*intercalada* o tipo ladrillo invertido). 
- **Estructura HTML:** Se distribuyeron equitativamente 2 imágenes por columna (Izquierda, Centro, Derecha), eliminando el modificador que alteraba la longitud del antiguo final para homogeneizar el balance de pesos visuales.
- **Micro-ajuste Relativo (CSS):** Se ajustó el *Offset* de la columna central de un padding variable de `60px` máximo, a un `clamp(40px, 8vw, 80px)`, lo cual empuja la columna de en medio hacia abajo exactamente la mitad de la altura perceptual promedio de una imagen, creando una retícula de ladrillo tridimensional espectacular en escritorio y tabletas.

### Archivos Modificados
- `assets/images/621A6627.webp` (Nueva imagen trasladada a ruta final).
- `index.html` (Adhesión del 6to nodo `<figure>`, limpieza de atributos de asimetría singular y actualización de flag de caché local a `?v=fin27`).
- `css/sections.css` (Ajuste del gap paramétrico en `.visuals-gallery__col--center`).

---
## 2026-04-01: UX Premium de "Visuales" para Mobile (Carrusel Magnético)

**Reportado en:** Comentarios del usuario

### Reparación
Se optimizó radicalmente la experiencia del usuario en teléfonos móviles para la recién creada Galería Editorial de Visuales. Puesto que apilar 6 fotografías formato 16:9 vertical generaba un scroll infinito poco elegante, se rediseñó en favor de un sistema de exploración horizontal tipo App.
- **Rompiendo la cuadrícula CSS (* display: contents *):** Se utilizó esta poderosa y poco convencional propiedad sobre las clases `.visuals-gallery__col` únicamente en vista *mobile*, lo cual obligó a las columnas a "desaparecer" estructuralmente y dejar a las fotos libres como hijos directos de la galería sin afectar el increíble diseño *honeycomb* de Desktop.
- **Carrusel Magnético Nativo:** El nodo padre fue habilitado como un contenedor Flexbox horizontal con `scroll-snap-type`. No hizo falta inyectar JavaScript, evitando la ralentización de la memoria en teléfono.
- **Exposición UX Premium:** Cada fotografía consume el `78vw` del celular en vez del 100%, dejando asomarse astutamente el 22% de la siguiente postal actuando visualmente como indicador intuitivo de existencia de un carrete deslizante ("swipe to see more"). Las imágenes se anclan (`snap-align: center`) siempre al centro garantizando legibilidad y simetría al soltar el dedo.
- **Invisible Scrollbar:** Eliminadas las engorrosas barras de deslizado en Webkit (Safari/Chrome móvil) para limpiar por competo la UI.

### Archivos Modificados
- `css/sections.css` (Sobre-escrito completo del Media Query en `.visuals-gallery` sustituyendo el grid 1fr por overflow-x con scroll-snap).
- `index.html` (Actualización de caché `?v=fin28`).

---
## 2026-04-01: Ajuste de Layout Móvil para Canciones de "Etapa Anterior"

**Reportado en:** Comentarios del usuario

### Reparación
A pesar de que las canciones "Destacadas" funcionan muy bien utilizando el `100vw` de la pantalla móvil (como portadas visualmente grandes), la sección de "Etapa anterior" resultaba abrumadora bajo la misma regla de columna (`flex-direction: column`), exigiendo demasiado scroll vertical para atravesar los 3 remixes.
- **Sobrescritura UI (Mobile):** Se separó e independizó el comportamiento móvil de los contenedores que viven estrictamente dentro de `.music__tracks--grid`. Siendo así, se aplicó un *override* obligando al contenedor de cada Remix a respetar su naturaleza horizontal nativa (`flex-direction: row`).
- **Dimensión Fotográfica:** La dimensión de los *artworks* fue reducida drásticamente a un contundente `72x72px` a la izquierda de la tarjeta, permitiendo que la información (título, artista, botón de plataforma) gane legibilidad al lado derecho y que los 3 recuadros juntos quepan en **una sola pantalla** del teléfono, mejorando el escaneo visual rápido.

### Archivos Modificados
- `css/sections.css` (Implementación de sobre-escritura flex-row y constraints de 72px en media queries para la malla de *tracks* secundarios).
- `index.html` (Actualización de flag de caché a `?v=fin29`).

---
## 2026-04-01: Ajuste de Texto Interno y Pad en Tarjetas "Etapa Anterior" Mobile

**Reportado en:** Comentarios del usuario (Revisión de captura de pantalla)

### Reparación
Resolución de un problema de legibilidad e interfaz visual en las tarjetas de la sección "Etapa anterior" para móviles (vista horizontal compacta). El relleno genérico heredado resultaba excesivo (esparciéndose sobre la pantalla), y la fuente ocasionaba saltos de línea inestéticos al colisionar con el margen de la tarjeta.
- **Micro-Padding y Gaps:** Se ajustó el acolchado de `.card--track` dentro de la etapa anterior de un genérico `28px` a un cerrado y eficiente `16px`, quitando el desperdicio de espacio vertical vacío superior e inferior. Adicionalmente, se minimizó la distancia en `gap` interno del bloque de título/artista a `2px`.
- **Prevalencia de una sola línea (*Truncate UI*):** Se inyectaron reglas estrictas de control tipográfico (`white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`) bajando el tamaño de fuente un par de píxeles (`14px` el título y `12px` el de los autores). Esto garantiza que, si un nombre de remix es inmensamente largo en un celular muy angosto, la plataforma inserte estéticamente "..." al final en lugar de romper torpemente hacia un segundo renglón, conservando las proporciones compactas.
- **Compatibilidad Extrema:** Se activó la propiedad mandatoria en flexboxes `min-width: 0` al contenedor de texto para garantizar a que Safari/Chrome respeten la constricción de los campos textuales internos y no exploten la carta horizontalmente.
- Asimismo, la tarjeta quedó lo suficientemente estrecha como para permitir la visualización del bloque superior de título de sección y descripción narrativa de una tirada.

### Archivos Modificados
- `css/sections.css` (Profundización de estilización en `@media (max-width: 767px)` para `.music__tracks--grid .card--track`).
- `index.html` (Limpieza de caché general elevada a `?v=fin30`).

---
## 2026-04-01: Anulación de Latencia (*Reveal Delay*) en Carrusel "Visuales"

**Reportado en:** Comentarios del usuario

### Reparación
Problema detectado: La animación en cascada (`IntersectionObserver` de JS) calculaba la entrada de cada imagen al *Viewport* y le impartía un retraso estilístico para verse bien cuando se hacía "scroll" bajando en Desktop. Sin embargo, en celular, como el flujo es un carrusel que se desliza horizontalmente y a alta velocidad (App feel), la latencia entorpecía la fluidez en la lectura fotográfica.
- **Bypass Directo por CSS:** Añadidas reglas con flag `!important` que obligan a anular (`opacity: 1`, `transform: none`, `transition: none`) única y exclusivamente a `visuals-gallery__item.visuals-reveal` cuando está por debajo de los 767px de resulución móvil. 
- **Resultado:** Ahora las 6 fotografías nacen completamente renderizadas e inmediatas en la fila oculta de desborde del contenedor horizontal, lo que permite pasar el dedo velozmente ("swipe") sin parpadeos, opacidades o cuellos de botella por carga retardada, recuperando la calidad premium e instantánea exigida para celular.

### Archivos Modificados
- `css/sections.css` (Inyección de reglas bloqueadoras de latencia para `.visuals-reveal` en mobile).
- `index.html` (Caché elevado a `?v=fin31`).

---
## 2026-04-01: Layout de "Destacados" a 2 Columnas (Desktop)

**Reportado en:** Comentarios del usuario

### Reparación
Buscando optimizar la pantalla completa en vista de Escritorio (Desktop) y evitar un desglose hiper-extenso de elementos hacia abajo (frecuente en estructuras verticales y que obligaba al usuario a descender ("scroll") demasiado para abarcar la sección principal de Música), se comprimió el bloque de "Destacados".
- **Estructura Side-by-Side:** El contenedor padre `.music__tracks` fue modificado mediante el uso de `display: grid` con `grid-template-columns: repeat(2, 1fr)`. Esto forza a las dos referencias principales ("Overtaking" y "Break My Heart") a co-existir de forma matemáticamente exacta y horizontal.
- **Flujo Interno Intacto:** Ya que las tarjetas continúan operando internamente mediante Flexbox horizontal, al encuestionarse dentro de una rejilla reducida por la mitad, simplemente se acoplan herméticamente sin mutilar el espacio para portadas ("artworks"), títulos o botones musicales, creando un aprovechamiento visual completo de la pantalla.
- **Independencia Responsiva:** Se inyectó una re-definición de fallback estricta a `1fr` dentro de la *Media Query* de móvil para asegurar que este comportamiento "Side-by-Side" ocurra única y preclaramente bajo el entorno de computadoras, preservando las columnas unitarias en el teléfono.

### Archivos Modificados
- `css/sections.css` (Conversión formal del `flex-direction: column` a `display: grid` para `.music__tracks`, junto a reversiones móviles).
- `index.html` (Caché elevado a `?v=fin32`).

---
## 2026-04-01: Aceleración Extrema de Scroll Reveals (Intersection Observers)

**Reportado en:** Comentarios del usuario ("Tardan mucho en aparecer... en especial cuando bajo muy rápido")

### Reparación
El problema radicaba en la configuración original de los `IntersectionObserver` en JavaScript y los staggers (`setTimeout`), orquestada para descensos lentos y poéticos, pero completamente incompatibles con el paso rápido de un lector moderno (haciendo que los elementos "nacieran" visualmente cuando ya la pantalla iba por la mitad y se perdieran instantes valiosos dejándola momentáneamente vacía).

- **Umbres (*Thresholds*):** Ajustados de `0.15` y `0.10` a **`0.05`**. Esto significa que JavaScript ya no exige que el 15% del elemento esté dentro de la pantalla para encender la mecha de la animación; basta con que un miserable 5% del borde cruce el umbral y ya arranca.
- **Márgenes Fotográficos (*rootMargin*):** Los márgenes negativos (ej: `-40px` o `-50px`), que forzaban a la animación a esperar que el scroll subiera adicionalmente esa cantidad de píxeles *después* de asomarse, fueron eliminados a un plano y duro `0px 0px 0px 0px`. Ahora el encendido ocurre milimétricamente en cuanto asoman la nariz por debajo.
- **Compresión de Cascada (*Stagger Timing*):** Los intervalos entre elementos en lista ("staggering") que generaban retrasos matemáticos masivos (ej: `400ms + index * 120` acumulando hasta un segundo de pantalla vacía), fueron destripados a intervalos hiper-ligeros (ej: demoras base de `40ms`, sumatorias de solo `50ms` por hijo). 
- **Rapidez CSS (Global):** El token maestro de CSS transparente `--duration-slow` escaló de `0.6s` de eternidad a un snappy `0.45s` para ejecutar la transición más rápido al recibir la orden.

### Archivos Modificados
- `js/main.js` (Re-parametrización exhaustiva de 4 Observers y acortamiento drástico de sumatorias de tiempos `setTimeout`).
- `css/design-tokens.css` (Corte de `--duration-slow` a 450 milisegundos).
- `index.html` (Caché elevado a `?v=fin33`).
