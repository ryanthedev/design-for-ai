# Style Archetypes
**Source:** Brand archetype theory (Mark & Pearson, *The Hero and the Outlaw*), web aesthetic taxonomy synthesis, grounded in Design for Hackers principles (purpose drives aesthetics, ch01-02)
**Core Concept:** Two-stage funnel from intent to visual tokens. Interview answers map to a **brand archetype** (who the design is, emotionally), which constrains a set of **aesthetic families** (how it looks, concretely). The funnel exists to force divergence: instead of sampling the distributional center ("clean and modern"), every design starts from a named, constrained position.

---

## Table of Contents

1. [How to Use This File](#how-to-use-this-file)
2. [Part A: The 12 Brand Archetypes](#part-a-the-12-brand-archetypes)
3. [Part B: Aesthetic Families](#part-b-aesthetic-families)
4. [Part C: Mapping Tables](#part-c-mapping-tables)

---

## How to Use This File

1. From interview answers (purpose, audience, 3 personality words), select **2-3 candidate archetypes** using the Part C personality-word table. Don't ask the user "which archetype are you?" — derive it, then confirm.
2. Each archetype lists **compatible aesthetic families**. These are the legal building blocks for design DNA (see `design-dna.md`).
3. Families provide the concrete tokens: named fonts, color strategy (seed hue + chroma character + background approach), layout discipline, motion vocabulary.

**Register still rules** (SKILL.md): product surfaces pull every family toward its restrained end; brand surfaces may use the committed end.

---

## Part A: The 12 Brand Archetypes

Each archetype: core desire → voice → visual gravity (what the visuals must communicate).

| Archetype | Core desire | Voice | Visual gravity |
|---|---|---|---|
| **Innocent** | Safety, simplicity | Optimistic, plain | Soft light palettes, generous white space, rounded gentle forms |
| **Everyman** | Belonging | Friendly, unpretentious | Approachable mid-contrast color, familiar layouts, real photography |
| **Hero** | Mastery, courage | Confident, direct | Bold contrast, strong primaries, assertive type weight, action-forward |
| **Outlaw** | Liberation, disruption | Raw, defiant | Black + one violent accent, broken grids, oversized type, hard edges |
| **Explorer** | Freedom, discovery | Adventurous, individualist | Earth tones, open layouts, landscape imagery, asymmetry |
| **Creator** | Innovation, self-expression | Imaginative, perfectionist | Restrained canvas + expressive letterforms, generous space, craft details |
| **Ruler** | Control, prestige | Authoritative, refined | Deep tones + gold/metallic, formal symmetry, serifs, luxury restraint |
| **Magician** | Transformation | Visionary, charismatic | Deep saturated color, dramatic light/dark, gradient-as-event not default |
| **Lover** | Intimacy, sensory pleasure | Warm, indulgent | Deep reds/wine/blush, rich texture, close-up imagery, soft contrast |
| **Caregiver** | Service, protection | Reassuring, warm | Soft blues/greens, rounded forms, high legibility, calm motion |
| **Jester** | Joy, play | Witty, irreverent | Bright clashing primaries, bouncy geometry, dense playful detail |
| **Sage** | Truth, understanding | Measured, precise | Muted palette, serif or technical type, data-led layouts, no decoration |

**Selection heuristics:**
- The archetype belongs to the *product's relationship with its audience*, not the founder's self-image.
- If two archetypes fit, prefer the one whose visual gravity *contrasts* with the category's incumbents (differentiation is the point — ch04, design trends as cultural context).
- Mixed signals ("playful but trustworthy") → pick a primary archetype and let the secondary inflect one dimension only (e.g., Caregiver base with Jester color accents).

---

## Part B: Aesthetic Families

Each family is a coherent visual system. Format: **Feels like** / **Typography** / **Color strategy** / **Layout** / **Motion** / **Fits**.

Fonts: first option is free (Google Fonts/Fontshare); `†` = commercial, offer only as upgrade.

### 1. Editorial Minimalism
- **Feels like:** A well-set magazine essay. Quiet authority.
- **Typography:** Display: Newsreader, Fraunces, or Spectral. Body: Source Serif 4 or a narrow grotesque (Archivo). Loose leading (1.5+), restrained weights.
- **Color strategy:** Warm paper neutrals (not pure white), near-black ink text, ONE muted accent. Seed: any hue at low chroma. Background: tinted paper.
- **Layout:** Single strong column, wide margins, rules/hairlines instead of cards, asymmetric white space.
- **Motion:** Almost none. Opacity/transform fades only, 200-300ms.
- **Fits:** Sage, Creator, Ruler; stretch: Explorer. Register: both.

### 2. Warm Editorial
- **Feels like:** A cookbook from a small press. Human hands made this.
- **Typography:** Display: Fraunces (soft optical sizes) or Lora. Body: humanist sans (Karla, Work Sans). Generous sizes.
- **Color strategy:** Terracotta/clay/cream/olive range. Seed hue 20-90 (OKLCH), medium chroma. Background: cream or warm grey, never pure white.
- **Layout:** Soft grid, organic image shapes allowed, moderate radius (8-12px), warm shadows.
- **Motion:** Gentle ease-out reveals, 300ms, slight y-translate.
- **Fits:** Caregiver, Everyman, Lover, Innocent. Register: both.

### 3. Swiss / International
- **Feels like:** A 1960s Basel poster. Ruthless clarity.
- **Typography:** One grotesque family only: Switzer (Fontshare), Archivo, or Instrument Sans. Helvetica Now†. Tight tracking on display, strict scale.
- **Color strategy:** Black, white, ONE saturated accent (classically red ~25 OKLCH hue, but any high-chroma hue works). No gradients, no tints of the accent.
- **Layout:** Visible grid discipline, flush-left ragged-right, no border radius, no shadows — hierarchy from scale and placement alone (ch07).
- **Motion:** Instant or near-instant (100-150ms), linear or sharp ease-out. No decoration.
- **Fits:** Sage, Hero, Ruler; stretch: Everyman. Register: both (the safest "product" family).

### 4. Neo-Brutalist
- **Feels like:** A zine that learned HTML. Deliberate crudeness, total confidence.
- **Typography:** Clashing pair: heavy display (Archivo Black, Bricolage Grotesque 800) + plain body or mono. Oversized numerals.
- **Color strategy:** Solid uncomplicated fills: one or two loud hues (high chroma) + black borders. Background: white, paper, or one flat loud color.
- **Layout:** Thick visible borders (2-4px solid black), hard offset shadows (no blur), zero radius or weird mixed radius, elements may overlap/rotate slightly.
- **Motion:** Snappy (100-200ms), translate on hover like physical paper shifting. No fades.
- **Fits:** Outlaw, Jester, Creator; stretch: Hero. Register: brand (product only for dev-tool audiences).

### 5. Terminal / Mono-Core
- **Feels like:** A beautiful TUI. The machine speaking plainly.
- **Typography:** Mono everywhere: JetBrains Mono, IBM Plex Mono, Fragment Mono, Berkeley Mono†. Hierarchy via weight + color, not size jumps.
- **Color strategy:** Near-black background (tinted, not #000 — ch09 shadows rule), phosphor accent (green 145, amber 80, or any single hue), dim secondary text. Light mode variant: paper + ink + one accent.
- **Layout:** Dense, hard edges, box-drawing aesthetics, tables over cards, visible structure.
- **Motion:** Blink/type/instant states. Cursor metaphors. ≤150ms.
- **Fits:** Sage, Outlaw, Explorer. Register: product-leaning.

### 6. Data-Dense Professional
- **Feels like:** A Bloomberg terminal designed by a typographer in 2026.
- **Typography:** Compact grotesque (Archivo, General Sans) + tabular numerals mandatory (or mono numerals: IBM Plex Mono).
- **Color strategy:** Neutral chrome (cool greys), saturated categorical accents reserved for DATA, not chrome. Seed: cool hue 220-260, low chroma for surfaces.
- **Layout:** Tight spacing scale, charts-as-hero, minimal radius (2-4px), 1px borders, density is the aesthetic.
- **Motion:** State-change only, 100-150ms. Value transitions may animate (counting, chart morphs).
- **Fits:** Sage, Ruler, Hero. Register: product.

### 7. Cinematic Dark
- **Feels like:** A film studio's title sequence. Drama, scale, light.
- **Typography:** Oversized display (Clash Display via Fontshare, Bricolage Grotesque) or high-contrast serif (Fraunces 9pt-144pt axes). Body stays disciplined.
- **Color strategy:** Deep tinted darks (navy-black, green-black — never flat #111), light from ONE direction: a single gradient or glow treated as an event. Accent: one luminous hue.
- **Layout:** Full-bleed sections, large scale jumps (3x+, ch05 proportions), content emerges from darkness, generous z-depth.
- **Motion:** The committed family: scroll-triggered reveals, parallax restraint, 400-600ms ease-out entrances. Must respect prefers-reduced-motion.
- **Fits:** Magician, Hero, Outlaw, Lover. Register: brand.

### 8. Playful Geometric
- **Feels like:** Memphis Group running a SaaS. Serious tools, unserious wrapper.
- **Typography:** Round-ish display (Bricolage, Baloo 2 sparingly) or chunky grotesque + clean body (Outfit, DM Sans).
- **Color strategy:** 3-4 bright hues at matched lightness (triadic/tetradic, ch09), used as flat fills on shapes/sections. Background: white or one pale tint.
- **Layout:** Geometric shapes as decoration with purpose (section dividers, list markers), mixed radius, sticker/badge elements, asymmetric collage feel.
- **Motion:** Springy but controlled — scale/rotate micro-interactions, 200-300ms. (Bounce easing is an AI-tell when ambient; here it's allowed ONLY on direct user interaction.)
- **Fits:** Jester, Innocent, Everyman, Creator. Register: brand.

### 9. Soft Futurism
- **Feels like:** An OS from a gentle future. Calm precision.
- **Typography:** Neutral-but-warm sans: Instrument Sans, General Sans, Epilogue. Wide tracking on small caps labels.
- **Color strategy:** Pale tinted atmospheres (one hue family at very low chroma, high lightness), depth via translucency and blur used STRUCTURALLY (layered panels), one clear accent. Dark variant: deep tinted glass.
- **Layout:** Floating layered surfaces, large radius (16-24px), soft true shadows (hue-shifted, ch09), spatial hierarchy via blur/elevation.
- **Motion:** Fluid 300-400ms, ease-out, scale+fade. Motion communicates layer order.
- **Fits:** Magician, Innocent, Caregiver. Register: both. ⚠️ Closest family to the glassmorphism AI-tell — only choose it when depth-layering serves the content, and never mix with cyan-on-dark.

### 10. Art Deco / Luxury
- **Feels like:** A hotel lobby in 1928. Ornament with discipline.
- **Typography:** High-contrast or geometric display: Marcellus, Italiana, Cormorant, Cinzel (sparingly). Body: quiet serif or airy grotesque. Letterspaced caps for labels.
- **Color strategy:** Deep base (black, oxblood, forest, navy) + metallic accent (gold/brass rendered as warm yellow 85-95 hue at controlled chroma — not gradient gold). Cream alternative base for light mode.
- **Layout:** Strict symmetry, centered axes, fine rules and frame ornaments, generous vertical rhythm.
- **Motion:** Slow and deliberate (400-500ms), fades and reveals, nothing springy.
- **Fits:** Ruler, Lover, Magician; stretch: Creator. Register: brand.

### 11. Organic / Natural
- **Feels like:** A field guide. Materials, not pixels.
- **Typography:** Humanist serif body (Lora, Source Serif 4) + hand-feel display option (Gaegu only for casual products; otherwise Fraunces soft). Comfortable sizes.
- **Color strategy:** Desaturated naturals — moss, bark, stone, sky (hues 90-180 at low-medium chroma), no pure anything. Background: warm off-white or deep moss dark mode.
- **Layout:** Irregular organic shapes (blob masks used sparingly), soft grid, texture allowed (grain, paper), asymmetric flow.
- **Motion:** Slow drifts, 400ms+, ease-in-out. Growth metaphors (scale from 0.95).
- **Fits:** Explorer, Caregiver, Innocent, Sage. Register: both.

### 12. Retro-Futurist
- **Feels like:** What 1995 thought 2025 would look like. Chrome, optimism, attitude.
- **Typography:** Wide/extended display (Unbounded, Zodiak via Fontshare, Monument Extended†) + utilitarian body. Allowed: outlined text, chrome effects ON DISPLAY ONLY.
- **Color strategy:** Either Y2K bright (silver/chrome neutrals + one acid accent 110-140 hue) or vapor sunset (split-complementary across 300/25/200). High commitment.
- **Layout:** Horizon lines, grids that imply perspective, pill shapes, badge/sticker elements.
- **Motion:** Marquee energy with discipline — one signature ambient motion max, interactions 200ms.
- **Fits:** Outlaw, Jester, Explorer, Magician. Register: brand.

---

## Part C: Mapping Tables

### Personality words → archetype candidates

| User's words cluster around | Candidate archetypes |
|---|---|
| trustworthy, calm, safe, supportive, reliable | Caregiver, Innocent, Everyman |
| smart, precise, rigorous, expert, credible | Sage, Ruler |
| bold, fast, powerful, winning, ambitious | Hero, Outlaw |
| rebellious, edgy, raw, anti-establishment, punk | Outlaw, Jester |
| fun, playful, friendly, quirky, delightful | Jester, Innocent, Everyman |
| premium, exclusive, refined, elegant, timeless | Ruler, Lover, Creator |
| warm, intimate, sensory, beautiful, indulgent | Lover, Caregiver |
| innovative, magical, transformative, visionary | Magician, Creator |
| free, adventurous, independent, outdoorsy | Explorer, Outlaw |
| crafted, artisanal, original, expressive | Creator, Explorer |

### Archetype → compatible aesthetic families

| Archetype | Primary families | Stretch families |
|---|---|---|
| Innocent | Warm Editorial, Soft Futurism | Playful Geometric, Organic |
| Everyman | Warm Editorial, Playful Geometric | Swiss |
| Hero | Swiss, Data-Dense Pro | Cinematic Dark, Neo-Brutalist |
| Outlaw | Neo-Brutalist, Terminal | Cinematic Dark, Retro-Futurist |
| Explorer | Organic, Terminal | Retro-Futurist, Editorial Minimalism |
| Creator | Editorial Minimalism, Neo-Brutalist | Playful Geometric, Art Deco |
| Ruler | Art Deco, Swiss | Editorial Minimalism, Data-Dense Pro |
| Magician | Cinematic Dark, Soft Futurism | Art Deco, Retro-Futurist |
| Lover | Art Deco, Warm Editorial | Cinematic Dark |
| Caregiver | Warm Editorial, Organic | Soft Futurism |
| Jester | Playful Geometric, Neo-Brutalist | Retro-Futurist |
| Sage | Editorial Minimalism, Swiss | Terminal, Data-Dense Pro, Organic |

### Content type → family pressure

Content has a vote too (information design is first-class, foundations §7):

| Content reality | Pushes toward | Pushes away from |
|---|---|---|
| Long-form reading | Editorial Minimalism, Warm Editorial | Terminal, Playful Geometric |
| Dense tables/numbers | Data-Dense Pro, Terminal, Swiss | Cinematic Dark, Organic |
| Visual portfolio/imagery | Cinematic Dark, Editorial Minimalism | Terminal, Data-Dense Pro |
| Marketing narrative | Cinematic Dark, Neo-Brutalist, Retro-Futurist | Data-Dense Pro |
| Transactional app UI | Swiss, Soft Futurism, Data-Dense Pro | Art Deco, Retro-Futurist |
| Docs/reference | Swiss, Terminal, Editorial Minimalism | Cinematic Dark, Playful Geometric |
