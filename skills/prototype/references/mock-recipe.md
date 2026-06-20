# Mock recipe — HTML/CSS from design tokens

The constructive reference for the `prototype` skill. Covers token-to-CSS mapping, both fidelities, surface constraints, and the self-contained file contract.

---

## Table of Contents

1. [Self-contained file contract](#self-contained-file-contract)
2. [Token mapping — DESIGN.md to CSS custom properties](#token-mapping--designmd-to-css-custom-properties)
3. [Wireframe fidelity](#wireframe-fidelity)
4. [Styled (high-fi) fidelity](#styled-high-fi-fidelity)
5. [Surface constraints](#surface-constraints)
6. [prefers-reduced-motion](#prefers-reduced-motion)
7. [Common mistakes](#common-mistakes)

---

## SELF-CONTAINED FILE CONTRACT

Every mock is a single `.html` file:

- All CSS lives in an inline `<style>` block in `<head>`.
- Optional: one `<link rel="preconnect">` + `<link rel="stylesheet">` for a webfont (Google Fonts or Bunny Fonts). No other external dependencies.
- No JavaScript frameworks, no build step, no npm. Opens in any browser from the filesystem.
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` — not `<div>` soup.
- The file is the deliverable: it must open correctly without a server.

---

## TOKEN MAPPING — DESIGN.MD TO CSS CUSTOM PROPERTIES

`palette.mjs` emits these CSS custom property names. Read them verbatim from DESIGN.md's token block and paste into the mock's `:root`:

### Neutral ramp (12 steps: backgrounds → high-contrast text)

```css
--neutral-1   /* page background */
--neutral-2   /* surface / card background */
--neutral-3   /* surface hover */
--neutral-4   /* surface active */
--neutral-5   /* (subtle) */
--neutral-6   /* border subtle */
--neutral-7   /* border */
--neutral-8   /* border strong */
--neutral-9   /* solid fill (button bg, badge) */
--neutral-10  /* solid fill hover */
--neutral-11  /* secondary text (AA contrast) */
--neutral-12  /* primary text (AAA contrast) */
```

### Accent ramp (12 steps)

```css
--accent-1 through --accent-12   /* same step semantics as neutral */
--accent-on-solid                /* text on --accent-9 background */
```

### Semantic aliases (emitted alongside the ramp)

```css
--background        /* = var(--neutral-1) */
--surface           /* = var(--neutral-2) */
--surface-hover     /* = var(--neutral-3) */
--surface-active    /* = var(--neutral-4) */
--border-subtle     /* = var(--neutral-6) */
--border            /* = var(--neutral-7) */
--border-strong     /* = var(--neutral-8) */
--text-secondary    /* = var(--neutral-11) */
--text              /* = var(--neutral-12) */
--accent-bg-subtle  /* = var(--accent-3) */
--accent-solid      /* = var(--accent-9) */
--accent-solid-hover /* = var(--accent-10) */
--accent-text       /* = var(--accent-11) */
```

### Functional colors (3 steps each: subtle bg, solid, text)

```css
--error-3, --error-9, --error-11
--success-3, --success-9, --success-11
--warning-3, --warning-9, --warning-11
--info-3, --info-9, --info-11
```

### Harmony secondaries (emitted when harmony != mono)

Named by hue (e.g., `--teal-3`, `--teal-9`, `--teal-11`, `--teal-on-solid`). Use as accent variants.

### How to read them from DESIGN.md

DESIGN.md contains the palette.mjs CSS output block in a fenced code block under a `## Tokens` or `## Color tokens` heading. Copy the entire `:root { … }` block verbatim into the mock's `<style>`. The semantic aliases reference the numbered steps via `var()` — they resolve automatically.

---

## WIREFRAME FIDELITY

**When to use:** no DESIGN.md present; user says "wireframe"; fidelity=low-fi.

**Purpose:** structure and information hierarchy only — no color, no brand. Equivalent to a greyscale sketch.

### Greyscale defaults (substitute when DESIGN.md is absent)

```css
:root {
  --background: #ffffff;
  --surface: #f5f5f5;
  --surface-hover: #ebebeb;
  --border-subtle: #e0e0e0;
  --border: #bdbdbd;
  --border-strong: #9e9e9e;
  --text-secondary: #616161;
  --text: #212121;
  --accent-solid: #424242;
  --accent-on-solid: #ffffff;
  --accent-text: #212121;
}
```

### Structural conventions

- Label every block with its content purpose in brackets: `[Hero headline]`, `[Body copy — 2–3 sentences]`, `[Primary CTA]`, `[Navigation links]`, `[Feature card 1]`.
- Use `background-color: var(--surface)` for cards; `background-color: var(--border-subtle)` for image placeholders; `border: 2px solid var(--border)` for container outlines.
- No imagery. Image placeholders: a grey box with `[Image]` text.
- No webfonts: `font-family: system-ui, sans-serif` throughout.
- Comment at the top: `<!-- No DESIGN.md found — wireframe mode. Run /design-for-ai to establish tokens. -->`

---

## STYLED (HIGH-FI) FIDELITY

**When to use:** DESIGN.md present; user says "styled" or "prototype" with tokens available.

**Purpose:** token application check — does the color system, type scale, and spacing hold up at page scale?

### HTML shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Page name] — mock</title>
  <!-- Webfont: include only if DESIGN.md names one -->
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
  <!-- <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet"> -->
  <style>
    /* === DESIGN TOKENS (from DESIGN.md) === */
    :root {
      /* paste palette.mjs :root block here */
    }
    [data-theme="dark"] {
      /* paste palette.mjs dark-mode block here, if present */
    }

    /* === BASE RESET === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-body, system-ui, sans-serif);
      background: var(--background);
      color: var(--text);
      line-height: 1.5;
    }

    /* === prefers-reduced-motion === */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* === LAYOUT (surface-appropriate — see surface constraints) === */
    /* ... */
  </style>
</head>
<body>
  <header>...</header>
  <nav aria-label="Main">...</nav>
  <main>...</main>
  <footer>...</footer>
</body>
</html>
```

### Type scale

If DESIGN.md includes a type scale (font sizes as custom properties or as a table), apply it. Common pattern from the design mode:

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
}
```

If not specified, default to a modular scale (1.25 ratio, base 1rem).

### Semantic color use

| Element | Token |
|---------|-------|
| Page background | `var(--background)` |
| Card / panel | `var(--surface)` |
| Card hover | `var(--surface-hover)` |
| Body text | `var(--text)` |
| Secondary / muted text | `var(--text-secondary)` |
| Subtle dividers | `var(--border-subtle)` |
| Borders | `var(--border)` |
| Primary CTA background | `var(--accent-solid)` |
| Primary CTA text | `var(--accent-on-solid)` |
| Links / accent text | `var(--accent-text)` |
| Error state | `var(--error-9)` (solid) / `var(--error-3)` (bg) / `var(--error-11)` (text) |
| Success state | `var(--success-9)` / `var(--success-3)` / `var(--success-11)` |

---

## SURFACE CONSTRAINTS

Apply these constraints to the mock layout based on the primary surface in DESIGN.md (or user context). Cite the core `surface` mode for rationale — this table is a token-level summary, not a replacement for that mode.

| Surface | Viewport assumption | Base font-size | Min touch target | Density | Motion budget |
|---------|-------------------|----------------|------------------|---------|---------------|
| Phone (mobile) | 390px wide | 16px | 44×44px | Comfortable | Reduced |
| Tablet | 768px wide | 16px | 44×44px | Moderate | Standard |
| Desktop | 1280px wide | 16px | 32×32px (pointer) | Moderate–dense | Standard |
| TV / 10-foot | 1920px+ wide, viewed 3m+ | 24–32px | Large targets, D-pad | Open | Minimal |
| Watch | ~180–200px wide | 16–18px | Full-width tap zones | Minimal | None |
| Kiosk | Fixed viewport, touch | 18–20px | 48×48px minimum | Open | Reduced |

**Phone default** unless DESIGN.md or the user specifies otherwise: `max-width: 390px; margin: 0 auto;` on the body content wrapper, with a 16px base.

**Desktop layout:** use a centered content column (`max-width: 1200px; margin: 0 auto; padding: 0 2rem`).

**TV:** very large type (`font-size: clamp(1.5rem, 2vw, 2.5rem)` for body), generous spacing, high-contrast (avoid mid-greys), no hover-only affordances.

---

## PREFERS-REDUCED-MOTION

Every mock includes this block (already in the HTML shell above). It is not optional — cite: "WCAG 2.1 SC 2.3.3 (AAA) + the core `polish` motion rule: 100ms micro, 300ms standard, 500ms complex; prefers-reduced-motion suppresses all."

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

If the mock includes deliberate animation (scroll reveals, entrance transitions), wrap it in a `prefers-reduced-motion: no-preference` query so it only runs when the user has no motion preference set.

---

## COMMON MISTAKES

| Mistake | Correction |
|---------|-----------|
| Hardcoding hex values instead of using tokens | Always reference `var(--token-name)` — the point is to verify the token system, not bypass it |
| Using `<div>` for every container | Use semantic HTML; screen readers and the audit conductor both need structure |
| External JS frameworks in the mock | Zero external deps except optional webfont; if a feature needs JS, use a `<script>` inline — no CDN imports unless specifically requested |
| Forgetting `allow_internal: true` on `browser_navigate` | Required for `file://` URLs; without it the call returns `blocked_url` |
| Loading the screenshot into the main context | Route the `browser_screenshot` path to a Haiku subagent; the PNG is 50KB–5MB and must not bloat this conversation |
| Skipping the `prefers-reduced-motion` block | Required on every mock; add it even on wireframes |
| Using a fixed pixel width for type | Prefer `rem` for type and `em` for component-internal spacing; only use `px` for border widths and minimum tap targets |
