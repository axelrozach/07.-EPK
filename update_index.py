import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Favicon
text = re.sub(
    r'<link rel="icon" type="image/x-icon" href="favicon.ico">',
    r'<link rel="icon" type="image/webp" href="assets/logos/axl-lake-logo-black.webp">',
    text
)

# 2. Logos
text = text.replace('assets/logos/axl-lake-logo-white.png', 'assets/logos/axl-lake-logo-white.webp')

# 3. Press Photo
text = text.replace('assets/images/hero-press-photo.jpg', 'assets/images/foto-prensa-blanco-negro-axl-lake.webp')

# 4. Artworks
text = text.replace('assets/images/artwork-overtaking.jpg', 'assets/images/atwork-overtaking-remix.webp')
text = text.replace('assets/images/artwork-break-my-heart.jpg', 'assets/images/atwork-break-my-heart-remix.webp')
text = text.replace('assets/images/artwork-te-amo.png', 'assets/images/atwork-te-amo-remix.webp')
text = text.replace('assets/images/artwork-eastside.png', 'assets/images/atwork-eastside-remix.webp')
text = text.replace('assets/images/artwork-california.png', 'assets/images/atwork-california-remix.webp')

# 5. IG Grid (Replace the 6 empty divs with divs enclosing images)
ig_grid_old = """          <div class="booking__ig-grid">
            <div class="booking__ig-thumb"></div>
            <div class="booking__ig-thumb"></div>
            <div class="booking__ig-thumb"></div>
            <div class="booking__ig-thumb"></div>
            <div class="booking__ig-thumb"></div>
            <div class="booking__ig-thumb"></div>
          </div>"""

ig_grid_new = """          <div class="booking__ig-grid">
            <div class="booking__ig-thumb"><img src="assets/images/foto-prensa-blanco-negro-axl-lake.webp" alt="IG Post 1" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="booking__ig-thumb"><img src="assets/images/atwork-overtaking-remix.webp" alt="IG Post 2" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="booking__ig-thumb"><img src="assets/images/atwork-break-my-heart-remix.webp" alt="IG Post 3" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="booking__ig-thumb"><img src="assets/images/atwork-te-amo-remix.webp" alt="IG Post 4" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="booking__ig-thumb"><img src="assets/images/atwork-eastside-remix.webp" alt="IG Post 5" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="booking__ig-thumb"><img src="assets/images/atwork-california-remix.webp" alt="IG Post 6" style="width: 100%; height: 100%; object-fit: cover;"></div>
          </div>"""

text = text.replace(ig_grid_old, ig_grid_new)

# 6. Upcoming releases placeholders (DES-005) - Add a class or icon? Or we can just leave it to CSS edits.
# Let's add a visual cue in index.html for Linea Musical (DES-006): "Línea Musical — Sección sin título visible... el <h2> existe en HTML pero..."
# The header `<h2 class="section__title">Línea Musical</h2>` is there. It's a CSS issue (maybe spacing).

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done index.html updates.")
