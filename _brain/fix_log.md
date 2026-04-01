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

### Archivos Modificados
- `index.html` (Nuevas llaves ?v=fin6 forzando el reseteo)
- `js/main.js` (Ecuación Zoom In mobile, early return Desktop, interpolación progresiva del sticky Header)
