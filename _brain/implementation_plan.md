# Plan de Implementación — Landing Page EPK Axl Lake

> **Estado:** ✅ APROBACIÓN PENDIENTE  
> **Última actualización:** 2026-03-27  
> **Todas las preguntas abiertas han sido resueltas.**

---

## 1. CONTEXTO Y OBJETIVO

Landing page estática single-page para **Axl Lake** (DJ / Productor), funcionando como Electronic Press Kit (EPK) de alto nivel orientado a booking.

**Objetivo primario:** Conversión para booking (promotores, bookers, venues).  
**Objetivo secundario:** Descubrimiento musical y dirección artística (fans, colegas).  
**Dominio:** `axllake.com` (ya registrado).  
**Hosting previsto:** Vercel (deploy estático).

**Dirección de marca:** Elegante, sobria, minimalista, refinada, oscura pero limpia. Influencia old money / italiano / lujo sutil. Conectada con la música electrónica y la vida nocturna sin caer en neones, futurismo exagerado ni clichés visuales de DJ.

**Prohibido:** Neones, colores chillones, gradientes gamer, estética futurista recargada, efectos exagerados, estética urbana/EDM mainstream.

---

## 2. STACK TECNOLÓGICO (APROBADO)

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Estructura | HTML5 semántico | Máximo control, SEO nativo, zero-dependency |
| Estilos | Vanilla CSS + Custom Properties | Sin build step, performance máximo |
| Interacción | Vanilla JavaScript (ES6+) | Scroll animations, lazy loading, micro-interacciones |
| Tipografía | Google Fonts: `Cormorant Garamond` + `Inter` | Serif editorial luxury + sans-serif moderna |
| Íconos | SVG inline | Zero HTTP requests, coloreables via CSS |
| Deploy | Vercel (estático) | CDN global, HTTPS, deploy desde repo |

---

## 3. INVENTARIO COMPLETO DE ASSETS

### 3.1 Archivos en `/Material/`

| Archivo | Tipo | Uso |
|---------|------|-----|
| `axl-lake-logo-white.png` | Logo | Header, Hero, Footer |
| `axl-lake-logo-black.png` | Logo | Fallback / OG image |
| `foto-prensa-blanco-negro-axl-lake.jpg` | Foto | Hero (derecha), Bio (derecha), Visuales |
| `atwork-overtaking-remix.jpg` | Portada | Sección Música > Destacados |
| `atwork-break-my-heart-remix.jpg` | Portada | Sección Música > Destacados |
| `atwork-te-amo-remix.png` | Portada | Sección Música > Etapa Anterior |
| `atwork-eastside-remix.png` | Portada | Sección Música > Etapa Anterior |
| `atwork-california-remix.png` | Portada | Sección Música > Etapa Anterior |

### 3.2 URLs de Plataformas (Perfiles)

| Plataforma | URL |
|-----------|-----|
| Beatport | `https://www.beatport.com/es/artist/axl-lake/1188974` |
| Spotify | `https://open.spotify.com/intl-es/artist/2n1m1p7ry1I0Fak7qcyOOA?si=inuSbIHKQqKlt8XmmMxwKg` |
| Apple Music | `https://music.apple.com/co/artist/axl-lake/1731849265` |
| SoundCloud | `https://soundcloud.com/axllake` |
| YouTube | `https://www.youtube.com/@axllakemusic` |
| Instagram | `https://instagram.com/axllake` |
| TikTok | `https://tiktok.com/axllake` |
| Facebook | `https://facebook.com/axllake` |

### 3.3 URLs de Tracks

| Track | Año | Plataforma | URL |
|-------|-----|-----------|-----|
| Overtaking | 2024 | Spotify | `https://open.spotify.com/intl-es/track/3JQkPPEfjluVyy4gANLlyT?si=5f6683720b4d4f98` |
| Break My Heart – Dua Lipa (Remix) | 2020 | SoundCloud | `https://on.soundcloud.com/B7WY5v5bE4Ph7aHvYK` |
| Te Amo – Piso 21 (Remix) | 2019 | SoundCloud | `https://on.soundcloud.com/KYgv8axH3H84nBjVLg` |
| Eastside – Khalid (Remix) | 2019 | SoundCloud | `https://on.soundcloud.com/9ujKSGr7iI4rhXzZJH` |
| California – Charlotte Cardin (Remix) | 2019 | SoundCloud | `https://on.soundcloud.com/fg81PZg97S9xXMWMv6` |

### 3.4 Otros Datos

| Dato | Valor |
|------|-------|
| Email booking | `booking@axllake.com` |
| Google Drive prensa | `https://drive.google.com/drive/folders/1E5cKCiO7XJ92ylxuuYeKBpFVo2scRd0x?usp=drive_link` |
| Copyright | `Copyright © Axl Lake 2026` |

---

## 4. ESTRUCTURA DE CARPETAS

```
/07. EPK/
├── _brain/                          # Documentación (NO se sube a producción)
├── Material/                        # Assets fuente originales (NO se sirven)
├── index.html                       # Página principal
├── css/
│   ├── design-tokens.css            # Variables CSS globales
│   ├── reset.css                    # CSS reset moderno
│   ├── base.css                     # Estilos base (html, body, tipografía)
│   ├── components.css               # Botones, cards, badges, social icons
│   └── sections.css                 # Estilos por cada sección
├── js/
│   └── main.js                      # Animaciones, scroll, lazy load, header
├── assets/
│   ├── images/                      # Fotos optimizadas WebP para web
│   │   ├── hero-press-photo.webp
│   │   ├── artwork-overtaking.webp
│   │   ├── artwork-break-my-heart.webp
│   │   ├── artwork-te-amo.webp
│   │   ├── artwork-eastside.webp
│   │   └── artwork-california.webp
│   ├── logos/
│   │   ├── axl-lake-logo-white.webp
│   │   └── og-image.jpg            # Open Graph 1200×630
│   └── textures/
│       └── grain.png                # Textura grain sutil
└── favicon.ico
```

**IMPORTANTE para el Developer:**
- Las imágenes en `assets/images/` son versiones optimizadas (WebP, comprimidas) de los originales en `Material/`.
- El Developer debe generar las versiones WebP desde los originales usando herramientas como `cwebp` o `sharp`.
- Los originales en `Material/` NUNCA se referencian desde el HTML.

---

## 5. SISTEMA DE DISEÑO (DESIGN TOKENS)

### 5.1 Paleta de Colores

```css
:root {
  /* Fondos */
  --color-bg-primary: #0A0A0A;
  --color-bg-secondary: #111111;
  --color-bg-tertiary: #1A1A1A;
  --color-bg-card: #141414;

  /* Acentos neutros */
  --color-warm-gray: #B8B0A8;
  --color-cool-gray: #8A8A8A;
  --color-divider: rgba(255, 255, 255, 0.06);

  /* Texto */
  --color-text-primary: #F5F5F0;
  --color-text-secondary: #A0A0A0;
  --color-text-tertiary: #6B6B6B;
  --color-text-accent: #D4C8B8;

  /* Interacción */
  --color-white: #FFFFFF;
  --color-hover: rgba(255, 255, 255, 0.08);
  --color-border: rgba(255, 255, 255, 0.10);
  --color-border-hover: rgba(255, 255, 255, 0.20);
}
```

### 5.2 Tipografía

```css
:root {
  --font-heading: 'Cormorant Garamond', 'Georgia', serif;
  --font-body: 'Inter', 'Helvetica Neue', sans-serif;

  --text-display: clamp(3.2rem, 5vw, 5rem);
  --text-h1: clamp(2rem, 3.5vw, 3rem);
  --text-h2: clamp(1.4rem, 2vw, 1.75rem);
  --text-h3: clamp(1.1rem, 1.5vw, 1.25rem);
  --text-body: clamp(0.95rem, 1.1vw, 1.05rem);
  --text-small: clamp(0.8rem, 0.9vw, 0.875rem);
  --text-micro: clamp(0.7rem, 0.8vw, 0.75rem);
}
```

**Google Fonts load (en `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

### 5.3 Spacing

```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 8rem;
  --space-section: clamp(5rem, 10vw, 8rem);
}
```

### 5.4 Breakpoints

```css
/* Mobile first */
/* sm: 576px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1440px */
```

### 5.5 Transiciones y Animaciones Globales

```css
:root {
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
  --duration-slow: 0.6s;
}
```

### 5.6 Sugerencias Avanzadas Aprobadas

1. **Grain texture:** `background-image` con noise PNG, `opacity: 0.025`, aplicado al `body::after` como overlay con `pointer-events: none`.
2. **Scroll progress indicator:** `<div>` fijo en `top: 0`, `height: 1px`, ancho dinámico via JS, `background: var(--color-warm-gray)`, `opacity: 0.4`.
3. **Section dividers:** Alternancia de `--color-bg-primary` y `--color-bg-secondary` entre secciones.
4. **Typography ligatures:** `font-feature-settings: 'kern', 'liga', 'calt'` en headings. `text-rendering: optimizeLegibility`.
5. **Image unification filter:** `filter: contrast(1.05) brightness(0.95)` en todas las fotos.
6. **Button micro-interactions:** Texto `translateX(3px)` al hover + pseudo-elemento flecha que aparece.
7. **OG Image:** Generar imagen 1200×630 con logo blanco centrado sobre fondo `#0A0A0A`.

---

## 6. COMPONENTES REUTILIZABLES (`components.css`)

### 6.1 Botones

**`.btn-primary`:**
- `background: var(--color-white); color: #0A0A0A`
- `border: 1px solid var(--color-white)`
- `padding: 14px 32px`
- `font-family: var(--font-body); font-size: var(--text-small); font-weight: 500`
- `text-transform: uppercase; letter-spacing: 0.08em`
- `border-radius: 0; cursor: pointer`
- `transition: all var(--duration-normal) var(--ease-smooth)`
- Hover: `background: transparent; color: var(--color-white); transform: translateY(-1px)`

**`.btn-secondary`:**
- `background: transparent; color: var(--color-white)`
- `border: 1px solid var(--color-border)`
- Mismo padding, font, transition que primary
- Hover: `border-color: var(--color-border-hover); transform: translateY(-1px)`

**`.btn-small`:**
- `padding: 6px 14px; font-size: var(--text-micro)`
- Usado para platform badges en tracks

**`.btn-icon`:**
- `width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center`
- `background: transparent; border: none`

### 6.2 Section Header

```css
.section__header {
  text-align: center;
  margin-bottom: var(--space-xl);
}
.section__title {
  font-family: var(--font-heading);
  font-weight: 300;
  font-size: var(--text-h1);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm) 0;
}
.section__title::after {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  background: var(--color-warm-gray);
  margin: 16px auto 0;
}
.section__intro {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}
```

### 6.3 Cards

```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 28px;
  transition: border-color var(--duration-normal) var(--ease-smooth);
}
.card:hover {
  border-color: var(--color-border-hover);
}
```

### 6.4 Platform Badges

```css
.platform-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  font-size: var(--text-micro);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.platform-badge:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
  background: var(--color-hover);
}
.platform-badge svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
```

### 6.5 Social Icons

```css
.social-icons {
  display: flex;
  align-items: center;
  gap: 20px;
}
.social-icon {
  display: inline-flex;
  color: var(--color-text-primary);
  opacity: 0.4;
  transition: opacity var(--duration-normal) var(--ease-smooth);
}
.social-icon:hover {
  opacity: 1;
}
.social-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
```

### 6.6 Reveal Animation Class

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-slow) var(--ease-smooth),
              transform var(--duration-slow) var(--ease-smooth);
}
.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

---

## 7. SECCIONES DE LA LANDING PAGE (`sections.css` + `index.html`)

### 7.1 HEADER

**HTML:**
```html
<header id="site-header" class="header">
  <a href="#" class="header__logo" aria-label="Axl Lake - Volver al inicio">
    <img src="assets/logos/axl-lake-logo-white.webp" alt="Axl Lake" width="120" height="40" loading="eager">
  </a>
</header>
```

**CSS:**
- `position: fixed; top: 0; left: 0; width: 100%; z-index: 100`
- `padding: 20px 0; display: flex; justify-content: center`
- `background: transparent; transition: all 0.4s var(--ease-smooth)`
- Clase `.header--scrolled` (añadida via JS cuando `scrollY > 60`):
  - `background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(12px); padding: 14px 0`

**Mobile:** Logo `width: 90px`. Padding `16px → 10px` al scroll.

---

### 7.2 HERO

**HTML semántico:**
```html
<section id="hero" class="hero">
  <div class="hero__container">
    <div class="hero__content">
      <span class="hero__location reveal" data-delay="0">Radicado en Pereira, Colombia</span>
      <span class="hero__role reveal" data-delay="0.1">DJ / Productor</span>
      <div class="hero__logo reveal" data-delay="0.2">
        <img src="assets/logos/axl-lake-logo-white.webp" alt="Axl Lake" width="280" height="93">
      </div>
      <p class="hero__tagline reveal" data-delay="0.3">Una nueva etapa orientada a la pista, el groove y la música de club.</p>
      <p class="hero__subcopy reveal" data-delay="0.4">Con una base de 15 años en la música electrónica como DJ y productor, Axl Lake presenta una nueva etapa enfocada en Tech House, Afro House y Latin House, con una propuesta guiada por el groove, la pista y una selección musical exquisita.</p>
      <div class="hero__cta reveal" data-delay="0.5">
        <a href="#booking" class="btn-primary">Contactar para Booking</a>
        <a href="#musica" class="btn-secondary">Escuchar Música</a>
      </div>
      <div class="hero__social social-icons reveal" data-delay="0.6">
        <a href="https://soundcloud.com/axllake" target="_blank" rel="noopener" class="social-icon" aria-label="SoundCloud"><!-- SVG SoundCloud --></a>
        <a href="https://open.spotify.com/intl-es/artist/2n1m1p7ry1I0Fak7qcyOOA" target="_blank" rel="noopener" class="social-icon" aria-label="Spotify"><!-- SVG Spotify --></a>
        <a href="https://instagram.com/axllake" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram"><!-- SVG Instagram --></a>
      </div>
    </div>
    <div class="hero__image">
      <img src="assets/images/hero-press-photo.webp" alt="Axl Lake - Press Photo" width="600" height="900" loading="eager" fetchpriority="high">
      <div class="hero__image-gradient"></div>
    </div>
  </div>
</section>
```

**CSS Desktop (min-width: 768px):**
- `.hero__container`: `display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; align-items: center`
- `.hero__content`: `padding: var(--space-4xl) var(--space-2xl)`
- `.hero__image`: `position: relative; height: 100%; overflow: hidden`
- `.hero__image img`: `width: 100%; height: 100%; object-fit: cover; object-position: center top`
- `.hero__image-gradient`: `position: absolute; inset: 0; background: linear-gradient(to right, var(--color-bg-primary) 0%, transparent 30%); pointer-events: none`

**CSS Mobile (max-width: 767px):**
- `.hero__container`: `display: flex; flex-direction: column`
- `.hero__content`: `padding: calc(80px + var(--space-2xl)) var(--space-md) var(--space-xl)` (80px para compensar header fijo)
- `.hero__image`: `position: relative; width: 100%; max-height: 500px; overflow: hidden`
- `.hero__image-gradient`: `background: linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 25%)`
- CTAs: `flex-direction: column; width: 100%`
- Logo: `width: 200px`

**Estilos de cada elemento:**
- `.hero__location`: `font-family: var(--font-body); font-size: var(--text-small); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-text-tertiary)`
- `.hero__role`: `font-family: var(--font-body); font-size: var(--text-small); text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-warm-gray)`
- `.hero__logo img`: `width: 280px` (desktop), `width: 200px` (mobile). `margin: var(--space-md) 0`
- `.hero__tagline`: `font-family: var(--font-heading); font-weight: 300; font-size: var(--text-h2); font-style: italic; color: var(--color-text-primary); max-width: 440px; line-height: 1.4`
- `.hero__subcopy`: `font-family: var(--font-body); font-weight: 300; font-size: var(--text-body); color: var(--color-text-secondary); max-width: 480px; line-height: 1.7`
- `.hero__cta`: `display: flex; gap: 16px; margin-top: var(--space-lg)`

---

### 7.3 BIO

**Layout decidido por el usuario:** Dos columnas — izquierda para texto, derecha para foto.

**HTML:**
```html
<section id="bio" class="section section--alt">
  <div class="section__container">
    <div class="section__header reveal"><h2 class="section__title">Bio</h2></div>
    <div class="bio__grid">
      <div class="bio__text reveal">
        <p>La propuesta de Axl Lake parte de una base en producción, una lectura clara de la pista y un enfoque musical centrado en Tech House, Afro House y Latin House. Su manera de construir los sets combina selección musical, fluidez y lectura del público, adaptándose al contexto sin perder dirección. La intención es clara: mantener el movimiento, cuidar la línea musical y construir una conexión real entre la selección y la respuesta del público.</p>
        <p>A lo largo de 15 años en la música electrónica, Axl Lake ha construido su camino desde la producción y el DJing, consolidando una base musical que hoy toma una nueva dirección. En esta nueva etapa, el proyecto se presenta con mayor enfoque, una línea musical más definida y una intención más clara sobre lo que quiere generar en pista. Esa dirección ya se refleja en cuatro próximos lanzamientos, incluyendo dos colaboraciones, que marcan el arranque de esta nueva fase del proyecto.</p>
      </div>
      <div class="bio__image reveal">
        <img src="assets/images/hero-press-photo.webp" alt="Axl Lake" loading="lazy" width="500" height="750">
      </div>
    </div>
  </div>
</section>
```

**CSS Desktop:**
- `.bio__grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2xl); align-items: center`
- `.bio__text p`: `font-size: var(--text-body); line-height: 1.8; color: var(--color-text-secondary); margin-bottom: 1.5em; max-width: 560px`
- `.bio__image img`: `width: 100%; height: auto; object-fit: cover; filter: contrast(1.05) brightness(0.95)`

**CSS Mobile:**
- `.bio__grid`: `grid-template-columns: 1fr`
- Foto debajo del texto, `max-height: 450px; object-fit: cover; object-position: center top`

**Fondo:** `--color-bg-secondary` (clase `.section--alt` alterna fondos).

---

### 7.4 LÍNEA MUSICAL

**HTML:**
```html
<section id="linea-musical" class="section">
  <div class="section__container">
    <div class="section__header reveal"><h2 class="section__title">Línea Musical</h2></div>
    <p class="section__intro reveal">El enfoque musical de Axl Lake parte del Tech House, Afro House y Latin House, con una propuesta pensada para sostener el groove, leer la pista y responder al contexto.</p>
    <div class="music-line__grid">
      <!-- 4 cards con data-delay staggered -->
      <div class="card music-line__card reveal" data-delay="0">
        <span class="music-line__number">01</span>
        <h3 class="music-line__card-title">Géneros</h3>
        <p class="music-line__card-text">Tech House, Afro House, Latin House e Indie Dance, con matices melódicos y de club.</p>
      </div>
      <div class="card music-line__card reveal" data-delay="0.1">
        <span class="music-line__number">02</span>
        <h3 class="music-line__card-title">Enfoque</h3>
        <p class="music-line__card-text">Versatilidad dentro de una línea definida, con foco en el movimiento, la fluidez y el control del público.</p>
      </div>
      <div class="card music-line__card reveal" data-delay="0.2">
        <span class="music-line__number">03</span>
        <h3 class="music-line__card-title">Construcción del set</h3>
        <p class="music-line__card-text">Versatilidad para construir sets según el horario, el contexto y el rol dentro del evento, desde warm up hasta franjas de mayor energía como peak time, siempre dentro de una línea definida.</p>
      </div>
      <div class="card music-line__card reveal" data-delay="0.3">
        <span class="music-line__number">04</span>
        <h3 class="music-line__card-title">Ideal para</h3>
        <p class="music-line__card-text">Clubes, rooftops, beach clubs, coffee parties, privados, after, festivales boutique y espacios donde la música de club marque el centro de la experiencia.</p>
      </div>
    </div>
  </div>
</section>
```

**CSS:** Grid `2×2` desktop, `1 col` mobile. `.music-line__number`: `Cormorant Garamond`, `--text-micro`, `--color-warm-gray`.

---

### 7.5 MÚSICA

**Estructura con 3 subbloques.** Cada track usa `.card--track` con layout horizontal (portada + info + badges).

**Subbloque 1 — Destacados:**
- Intro: "Dos referencias publicadas..."
- Track 1: Overtaking (2024). Portada: `artwork-overtaking.webp`. Badges: Spotify (`href` al track), Apple Music (perfil artista), Beatport (perfil artista).
- Track 2: Break My Heart – Dua Lipa (Bootleg Remix) (2020). Portada: `artwork-break-my-heart.webp`. Badge: SoundCloud (`href` al track).

**Subbloque 2 — Etapa anterior:**
- Intro: "Material publicado en una etapa anterior..."
- Te Amo – Piso 21 (Remix) (2019). Portada: `artwork-te-amo.webp`. Badge: SoundCloud.
- Eastside – Khalid (Remix) (2019). Portada: `artwork-eastside.webp`. Badge: SoundCloud.
- California – Charlotte Cardin (Remix) (2019). Portada: `artwork-california.webp`. Badge: SoundCloud.

**Subbloque 3 — Próximos lanzamientos:**
- Intro: "Siete próximos lanzamientos en camino..."
- 7 placeholders: 3 rectangulares con label "Original", 2 con "Colaboración", 2 con "Remix"
- Cada placeholder: `background: var(--color-bg-tertiary)`, `aspect-ratio: 1`, `max-width: 80px`, texto "2026" centrado, `opacity: 0.5`
- Desktop: 7 en línea horizontal. Mobile: wrap en 2 filas.

**Layout track card (`.card--track`):**
- Desktop: `display: flex; gap: 20px; align-items: center`
- Portada: `80px × 80px` (destacados: `120px × 120px`), `border-radius: 2px`, `object-fit: cover`
- Info: título `--text-h3`, año `--text-micro --color-text-tertiary`
- Badges: flex row, `gap: 8px`

---

### 7.6 PRÓXIMAS FECHAS

**HTML:** Una `.card--event` centrada, `max-width: 600px`.

**Contenido:**
- Evento: `The Coffee Party Club - Session 7` → `Cormorant Garamond`, `--text-h2`, peso 400
- Fecha: `29 de Marzo de 2026` → `Inter`, uppercase, `letter-spacing: 0.08em`, `--color-warm-gray`
- Ubicación: `Tuluá, Colombia` → `Inter`, `--text-small`, `--color-text-tertiary`
- Separador decorativo entre evento y fecha: línea de 30px, 1px, `--color-divider`
- Padding: `40px 48px`

**Escalabilidad:** Container `.events-grid` con `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; justify-items: center`.

---

### 7.7 VISUALES

**DECISIÓN:** Con solo 1 foto disponible, se monta una composición digna usando la misma foto de prensa en un layout de galería reducido.

**Implementación temporal:**
- Usar la foto de prensa como imagen destacada única, centrada
- `max-width: 500px`, `width: 100%`
- `filter: grayscale(20%) contrast(1.05) brightness(0.95)`
- Hover: `filter: grayscale(0%)`, `transform: scale(1.02)`, `transition: 0.5s`
- Preparar el CSS con grid asimétrico ya definido para cuando se añadan más fotos

**Grid futuro (preparado pero comentado hasta tener 5 fotos):**
```css
/* .visuals__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 4px;
}
.visuals__item:nth-child(1) { grid-column: 1 / 3; grid-row: 1 / 2; }
.visuals__item:nth-child(2) { grid-column: 3 / 4; grid-row: 1 / 2; }
... etc
} */
```

---

### 7.8 RIDER TÉCNICO

**Layout:** 2 cards lado a lado (desktop), stack (mobile).

**Card 1 — Setup Ideal:**
- Label: "SETUP IDEAL" → `Cormorant Garamond`, uppercase, `letter-spacing: 0.12em`, `--color-warm-gray`
- Items con dash bullet `—`:
  - `2 reproductores Pioneer CDJ 2000 o superior`
  - `1 mixer Pioneer DJM 900 o superior`

**Card 2 — Setup Mínimo Aceptado:**
- Label: "SETUP MÍNIMO ACEPTADO"
- Item: `1 Pioneer XDJ-RX2`

**Nota final (centrada debajo de las cards):**
- `En caso de condiciones técnicas diferentes, se recomienda confirmar previamente la disponibilidad del equipo.`
- `font-style: italic; font-size: var(--text-small); color: var(--color-text-tertiary)`

**Intro (arriba de las cards):** `Axl Lake trabaja en formato USB sobre equipos Pioneer.`

---

### 7.9 MATERIAL DE PRENSA

**Layout:** Bloque centrado. Fondo `--color-bg-secondary`.

**Elementos en orden vertical:**
1. Sección title: `MATERIAL DE PRENSA`
2. Subtítulo: `Material de Prensa de Axl Lake` → `Cormorant Garamond`, `--text-h2`
3. Botón: `Descargar Material` → `.btn-primary` → `href="https://drive.google.com/drive/folders/1E5cKCiO7XJ92ylxuuYeKBpFVo2scRd0x?usp=drive_link"` → `target="_blank" rel="noopener"`
4. Nota: `Serás redirigido/a a Google Drive donde encontrarás: Fotos de prensa, fotos en vivo, logos y videos` → `font-style: italic; font-size: var(--text-small); color: var(--color-text-tertiary)`

`max-width: 500px; text-align: center; margin: 0 auto`

---

### 7.10 BOOKING

**Layout Desktop:** `grid-template-columns: 1fr 1fr; gap: var(--space-2xl)`

**Columna izquierda:**
- `BOOKING` → `Cormorant Garamond`, `--text-display`, peso 300, `color: var(--color-text-primary)`
- Subtítulo: `Contacto directo para booking, disponibilidad y propuestas.` → `Inter`, `--text-body`, `--color-text-secondary`, `max-width: 400px`

**Columna derecha:**

**Bloque Email:**
- Label: `Email de booking` → `Inter`, `--text-micro`, uppercase, `letter-spacing: 0.1em`, `--color-text-tertiary`
- Email: `booking@axllake.com` → `Inter`, `--text-h3`, `--color-text-primary`
- Botón: `Enviar email` → `.btn-primary` → `href="mailto:booking@axllake.com"`

**Separador:** `border-bottom: 1px solid var(--color-divider); margin: var(--space-lg) 0`

**Bloque Instagram (card diseñada, NO embed real):**
```html
<div class="card booking__instagram">
  <div class="booking__ig-header">
    <!-- SVG ícono Instagram 24px -->
    <span class="booking__ig-handle">@axllake</span>
  </div>
  <div class="booking__ig-grid">
    <!-- 6 mini-squares simulando feed (divs con background color sutil) -->
    <div class="booking__ig-thumb"></div>
    <div class="booking__ig-thumb"></div>
    <div class="booking__ig-thumb"></div>
    <div class="booking__ig-thumb"></div>
    <div class="booking__ig-thumb"></div>
    <div class="booking__ig-thumb"></div>
  </div>
  <a href="https://instagram.com/axllake" target="_blank" rel="noopener" class="btn-secondary booking__ig-cta">Visitar perfil</a>
</div>
```

- `.booking__ig-thumb`: `aspect-ratio: 1; background: var(--color-bg-tertiary); border-radius: 2px`
- `.booking__ig-grid`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin: 16px 0`

**Mobile:** Stack vertical completo.

---

### 7.11 FOOTER

**HTML:**
```html
<footer id="site-footer" class="footer">
  <div class="footer__container">
    <a href="#" class="footer__logo"><img src="assets/logos/axl-lake-logo-white.webp" alt="Axl Lake" width="80" height="27"></a>
    <div class="social-icons footer__social">
      <!-- 6 íconos: Instagram, Spotify, SoundCloud, YouTube, TikTok, Facebook -->
    </div>
    <a href="mailto:booking@axllake.com" class="footer__email">booking@axllake.com</a>
    <p class="footer__copyright">Copyright © Axl Lake 2026</p>
  </div>
</footer>
```

**CSS:**
- `border-top: 1px solid var(--color-divider)`
- `padding: var(--space-3xl) var(--space-md)`
- `text-align: center`
- Todo centrado vertical con `gap: var(--space-md)` entre elementos
- Email: `--text-small`, `--color-text-tertiary`, `text-decoration: none`
- Copyright: `--text-micro`, `--color-text-tertiary`

---

## 8. JAVASCRIPT (`main.js`)

### 8.1 Scroll Reveal System

```javascript
// IntersectionObserver para elementos con clase .reveal
// threshold: 0.15, rootMargin: '0px 0px -50px 0px'
// Al intersectar: añadir .reveal--visible con delay basado en data-delay
// once: true (no re-animan)
// Respetar prefers-reduced-motion
```

### 8.2 Header Scroll

```javascript
// Listener con requestAnimationFrame throttle
// scrollY > 60 → header.classList.add('header--scrolled')
// scrollY <= 60 → header.classList.remove('header--scrolled')
```

### 8.3 Smooth Scroll

```javascript
// Para todos los <a href="#...">
// event.preventDefault()
// document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' })
// Offset de ~70px para header fijo
```

### 8.4 Scroll Progress Indicator

```javascript
// En scroll: calcular porcentaje (scrollY / (docHeight - viewportHeight)) * 100
// Aplicar como width% al div .scroll-progress
```

### 8.5 Hero Load Animation

```javascript
// En DOMContentLoaded: trigger secuencial de .reveal en #hero
// No esperar a IntersectionObserver para el hero (ya está visible)
```

---

## 9. SEO Y META (`<head>`)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axl Lake — DJ / Productor | Electronic Press Kit</title>
  <meta name="description" content="Press Kit oficial de Axl Lake. DJ y Productor de Tech House, Afro House y Latin House radicado en Pereira, Colombia. Booking, música y propuesta artística.">
  <meta name="keywords" content="Axl Lake, DJ, Productor, Tech House, Afro House, Latin House, Booking, EPK, Colombia, Pereira">
  <meta name="author" content="Axl Lake">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="Axl Lake — DJ / Productor | Electronic Press Kit">
  <meta property="og:description" content="Press Kit oficial de Axl Lake. DJ y Productor de Tech House, Afro House y Latin House.">
  <meta property="og:image" content="https://axllake.com/assets/logos/og-image.jpg">
  <meta property="og:url" content="https://axllake.com">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CO">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Axl Lake — DJ / Productor">
  <meta name="twitter:description" content="Press Kit oficial. Tech House, Afro House, Latin House.">
  <meta name="twitter:image" content="https://axllake.com/assets/logos/og-image.jpg">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/design-tokens.css">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/sections.css">
</head>
```

**Heading hierarchy:**
- `<h1>`: Solo uno — logo Axl Lake en hero (visually hidden text + img)
- `<h2>`: Cada section title (Bio, Línea Musical, Música, etc.)
- `<h3>`: Subtítulos dentro de secciones (card titles, subbloque titles)

---

## 10. IMAGEN OPTIMIZATION PIPELINE

El Developer debe ejecutar este proceso antes de referenciar imágenes en HTML:

1. **Crear directorio** `assets/images/`, `assets/logos/`, `assets/textures/`
2. **Convertir a WebP** todas las imágenes de `Material/`:
   - `cwebp -q 85 Material/foto-prensa-blanco-negro-axl-lake.jpg -o assets/images/hero-press-photo.webp`
   - `cwebp -q 85 Material/atwork-overtaking-remix.jpg -o assets/images/artwork-overtaking.webp`
   - `cwebp -q 85 Material/atwork-break-my-heart-remix.jpg -o assets/images/artwork-break-my-heart.webp`
   - `cwebp -q 85 Material/atwork-te-amo-remix.png -o assets/images/artwork-te-amo.webp`
   - `cwebp -q 85 Material/atwork-eastside-remix.png -o assets/images/artwork-eastside.webp`
   - `cwebp -q 85 Material/atwork-california-remix.png -o assets/images/artwork-california.webp`
   - `cwebp -q 90 Material/axl-lake-logo-white.png -o assets/logos/axl-lake-logo-white.webp`
3. **Si cwebp no está disponible**, usar los originales directamente con la extensión original. La conversión WebP es una optimización, no un bloqueante.
4. **Generar OG image** (1200×630): Logo blanco centrado sobre fondo `#0A0A0A`.
5. **Grain texture**: Generar con la herramienta de imágenes o descargar un PNG de noise sutil, ~200×200px, tileable.

---

## 11. ORDEN DE EJECUCIÓN PARA EL DEVELOPER

| Paso | Tarea | Archivos |
|------|-------|----------|
| 1 | Crear estructura de carpetas | `css/`, `js/`, `assets/images/`, `assets/logos/`, `assets/textures/` |
| 2 | Optimizar imágenes | `Material/` → `assets/` (WebP o copias) |
| 3 | Crear `css/design-tokens.css` | Sección 5 completa |
| 4 | Crear `css/reset.css` | Modern CSS reset |
| 5 | Crear `css/base.css` | Estilos globales, body, html, selection, tipografía base, grain overlay |
| 6 | Crear `css/components.css` | Sección 6 completa |
| 7 | Crear `index.html` | Estructura completa con todas las secciones (Sección 7 + 9) |
| 8 | Crear `css/sections.css` | Estilos de cada sección (Sección 7) |
| 9 | Crear `js/main.js` | Sección 8 completa |
| 10 | Generar OG image y grain texture | Assets complementarios |
| 11 | Test en browser | Abrir `index.html`, verificar desktop + mobile |
| 12 | Ajustes de responsive/polish | QA visual |
| 13 | Documentar en `development_handover.md` | Entrega |

---

## 12. VERIFICACIÓN

- [ ] La web carga en < 2s
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] Todas las secciones presentes y con copy correcto
- [ ] Todos los links externos funcionan y abren en nueva pestaña
- [ ] Header cambia al scroll
- [ ] Smooth scroll entre secciones funciona
- [ ] Animaciones de entrada funcionan
- [ ] Scroll progress bar funciona
- [ ] Responsive en 375px (iPhone SE), 428px (iPhone 14), 768px (tablet), 1280px, 1440px
- [ ] `prefers-reduced-motion` respetado
- [ ] Grain texture visible pero sutil
- [ ] Fotos con filter de unificación
- [ ] OG image configurada
