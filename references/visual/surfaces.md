# Surfaces — Designing for the Primary Device Class

**Core posture:** A design's *primary surface* — the device class where it is mainly consumed — sets the floor for every other decision. Viewport, input model, viewing distance, and attention mode are not style preferences; they are physics. They decide which **layouts** are even valid and how far the **style** must shift before the design is usable. Pick the surface first, then pick patterns and tokens that the surface permits.

This extends the responsive principle — *design for the content, not the device* — by one clause: **and for its surface.** Responsive design ([responsive.md](responsive.md)) handles *degree*: the screen-web continuum where the same input family (touch/pointer) scales across widths. This file handles *kind*: distinct surface classes — TV, watch, automotive, voice, e-ink — where input, distance, and attention differ in nature, not just size. When the difference is a width, reach for responsive.md. When it is a different way of looking, holding, or speaking, reach for here.

Two principles this knowledge cites, the way other modes cite a chapter:

- **Constraints before composition** — every layout and token derives from the surface's physical constraints (the axes below). Name the constraint, then the pattern follows.
- **Two layers, composed** — Layer 1 is a catalog of **layout patterns**, each tagged with the surfaces it fits and breaks. Layer 2 is a set of **surface styles** — a curated pattern selection plus token deltas. A surface style = *patterns that fit* + *tokens tuned to the constraints*.

---

## Table of Contents

1. [The constraint axes](#the-constraint-axes)
2. [Surface taxonomy](#surface-taxonomy)
3. [Layer 1 — Pattern catalog](#layer-1--pattern-catalog)
4. [Layer 2 — Surface styles](#layer-2--surface-styles)
5. [Style deltas — the tunable tokens](#style-deltas--the-tunable-tokens)
6. [Register still applies](#register-still-applies)
7. [Picking — the procedure](#picking--the-procedure)
8. [Red flags — surface mismatches](#red-flags--surface-mismatches)
9. [This vs that](#this-vs-that)

---

## The constraint axes

Every surface is a point in this space. Read a surface as its profile across these axes; the patterns and tokens fall out of the profile.

| Axis | What it governs | Why it's load-bearing |
|------|-----------------|------------------------|
| **Viewport** — physical size × pixel density × aspect | How much can be shown at once | A 55" TV and a phone can share a pixel count yet differ 50× in physical size; CSS px lies about legibility |
| **Input model** — touch / pointer / keyboard / D-pad-remote / rotary / voice / gaze+gesture | Target size, navigation model, whether hover exists | Hover-revealed content is invisible on touch, D-pad, and voice; a command palette is meaningless without a keyboard |
| **Viewing distance** — ~30cm (watch) → ~40cm (phone) → ~60cm (desktop) → ~2–3m (TV) | Minimum *legible* type size, set by angular size not px | Type must subtend a readable angle at the actual distance; 16px legible on a phone is invisible across a living room |
| **Attention mode** — lean-in / lean-back / glance / eyes-busy | How much the user can read or do per look | A glance surface (watch, dashboard) gets ~2 seconds; anything requiring scroll-to-comprehend fails |
| **Ergonomics / reach** — thumb zone / full pointer / no-reach / safety-of-glance | Where controls must live | Phone primary actions belong in the thumb arc; automotive controls are bound by the ~2s glance / 12s task safety rule |
| **Environment** — ambient light, motion, noise | Contrast, theming, motion, audio | Outdoor sun demands e-ink-grade contrast; a moving vehicle forbids fine targets; a quiet room forbids forced audio |
| **Session & power budget** — micro vs sustained, battery/thermal headroom | Depth of interaction, motion budget | Watch/headset sessions are seconds and battery-bound, so motion shrinks; desktop sustains long focused work |

---

## Surface taxonomy

The primary surfaces, profiled. "Distance" is typical; "primary input" is the one that must work even if others are present.

| Surface | Viewport (physical) | Primary input | Distance | Attention | Hard constraint |
|---------|---------------------|---------------|----------|-----------|-----------------|
| **Phone** | 5–7", high density | Touch (often one-handed) | ~40 cm | Lean-in, interruptible | Thumb reach; portrait-dominant; bandwidth/battery vary |
| **Tablet** | 8–13", high density | Touch (two hands) | ~40 cm | Lean-in or lean-back | Orientation flips; large enough for two panes |
| **Laptop / desktop** | 13–27", med density | Pointer + keyboard | ~60 cm | Lean-in, sustained | Hover exists; keyboard shortcuts; wide |
| **Large desktop / ultrawide** | 27–49"+ | Pointer + keyboard | ~70 cm | Lean-in, sustained | Line length blows out; full-bleed text becomes unreadable |
| **TV / 10-foot** | 40–85", low density | D-pad / remote (+ voice) | ~2.5–3 m | Lean-back, passive | No pointer; focus-based nav; overscan-safe margins; bloom on pure white |
| **Watch / wearable** | 1–2", high density | Touch + rotary crown | ~30 cm | Glance (~2 s) | One thing per view; battery-bound motion; micro-sessions |
| **Automotive / in-dash** | 7–15", med density | Touch + voice + knob | ~70 cm | Eyes-busy, glance | Driver-distraction limits (~2 s/glance, ~12 s/task); day/night themes; no fine targets |
| **Kiosk / POS** | 10–32", med density | Touch (public, sometimes gloved) | ~50 cm | Transactional, walk-up | Large targets, no hover, timeout-to-reset, no scroll-dependence |
| **AR / spatial (headset)** | Volumetric FOV | Gaze + pinch / hand | Apparent ~1–2 m | Lean-in, immersive | Angular sizing; comfort/motion-sickness budget; avoid head-locked UI |
| **Voice / screenless** | None | Speech | — | Eyes-busy, conversational | No layout — turn-taking, brevity, confirmation, barge-in |
| **E-ink / embedded** | 6–13", low refresh | Touch / buttons | ~40 cm | Lean-in, static | No motion (ghosting), high contrast B/W, no hover |

---

## Layer 1 — Pattern catalog

Named layout patterns. Each is tagged **fits** (the surface's constraints make it natural), **degrades to** (its collapsed form on a smaller/constrained surface), and **breaks** (the constraint that makes it wrong). Cite the constraint, not taste — that is the *constraints-before-composition* principle in action.

| Pattern | What it is | Fits | Degrades to | Breaks on — and why |
|---------|------------|------|-------------|---------------------|
| **Thumb-zone bottom nav** | Primary nav anchored in the one-hand thumb arc | Phone | — | Desktop (pointer reaches anywhere — wastes the prime row), TV (no touch) |
| **Top / horizontal tab bar** | Sections along the top edge | Desktop, tablet | Bottom nav on phone | Phone one-handed (top is the hardest reach), watch (no room) |
| **Persistent sidebar nav** | Always-visible left rail | Desktop, ultrawide | Drawer / bottom nav | Phone (eats scarce width), TV (focus can't park off-content) |
| **Master–detail (split)** | List + detail side by side | Tablet landscape, desktop, ultrawide | **Drill-down stack** | Phone portrait, watch (no width for two panes) |
| **Drill-down stack** | One screen at a time, push/back | Phone, watch | — | Desktop/ultrawide (wastes width — show both panes) |
| **Multi-pane dashboard** | 3+ live regions at once | Desktop, ultrawide, kiosk | Tabbed / stacked panes | Phone, watch, TV (too dense to parse at distance/glance) |
| **10-foot focus grid** | Large cards, one focused with a highlight ring, D-pad moves focus | TV, kiosk | — | Pointer surfaces (focus ring redundant), phone (cards too big for the space) |
| **Hero rail / content rows** | Horizontal scrolling rows of cards | TV, tablet, phone | Single column | Ultrawide-dense (underuses width — prefer columns) |
| **Glanceable single-focus** | One datum or action, comprehensible in ~2 s, no scroll to get the point | Watch, automotive, notification | — | Desktop (squanders capacity), kiosk (walk-up wants more) |
| **Hub-and-spoke** | Central hub → out to a task → back | Watch, automotive, kiosk | — | Desktop (sustained work wants persistent context, not round-trips) |
| **Command palette (⌘K)** | Type-to-act, keyboard-first | Desktop | — | Touch-only, TV, voice (speech *is* the palette) |
| **Conversational turn-taking** | Prompt → response, no persistent layout | Voice, chat | — | Any glance surface needing state at rest |
| **Spatial / volumetric** | Windows placed in 3D space, gaze-targeted, real depth | AR / spatial | Flat windows | 2D screens (depth is faked — use CSS perspective, not layout) |
| **Full-bleed canvas hero** | Immersive edge-to-edge focal moment | Brand landing on any large screen, phone | Cropped hero | Dense product UI (a marketing move, not a working layout) |
| **Card stack / feed** | Vertical scroll of cards | Phone, tablet | — | TV (scrolling is costly on a remote), watch (one card at a time instead) |
| **Split-view multitasking** | Two contexts side by side | Tablet, desktop, ultrawide, spatial | Single context | Phone, watch, glance surfaces |

---

## Layer 2 — Surface styles

A surface style = a *curated selection of Layer-1 patterns* + *token deltas tuned to the surface's constraints*. These are starting presets, not laws; register (next section) expresses on top of them.

| Surface | Patterns to reach for | Style posture |
|---------|----------------------|---------------|
| **Phone** | Thumb-zone bottom nav, drill-down stack, card feed | Single column, generous targets, motion full, one primary action per screen |
| **Tablet** | Master–detail, split-view, hero rails | Two panes when landscape, touch targets retained, density medium |
| **Desktop** | Sidebar nav, multi-pane dashboard, command palette | Information-dense, hover affordances, keyboard shortcuts, tighter spacing |
| **Ultrawide** | Multi-pane dashboard, columns | Cap line length (~60–75ch), use columns/panes — never full-bleed body text |
| **TV / 10-foot** | 10-foot focus grid, hero rails | Large type, very low density, overscan-safe margins, deliberate motion, no pure-white fields |
| **Watch** | Glanceable single-focus, hub-and-spoke | One datum/view, max contrast, minimal motion (battery), rotary scroll |
| **Automotive** | Glanceable single-focus, hub-and-spoke, voice | Oversized targets, day/night themes, near-zero motion, tasks ≤ the glance budget |
| **Kiosk / POS** | 10-foot focus grid, hub-and-spoke | Big targets (public/gloved), no hover, no scroll-dependence, timeout-to-reset |
| **AR / spatial** | Spatial/volumetric, split-view | Angular sizing, conservative motion (comfort), avoid head-locked UI, real depth |
| **Voice** | Conversational turn-taking | No layout — brevity, confirmation, barge-in, error recovery (this is prompt design) |
| **E-ink** | Drill-down stack, static lists | No motion, high-contrast B/W, static layout, larger type, no hover |

---

## Style deltas — the tunable tokens

How the standard design tokens shift per surface. These are defensible starting points grounded in platform guidance (Apple HIG, Material, tvOS, watchOS, driver-distraction guidelines), not absolutes — tune to the content.

| Surface | Base type | Scale ratio | Min target | Density | Motion budget | Contrast posture |
|---------|-----------|-------------|------------|---------|---------------|------------------|
| **Phone** | 16px | 1.2–1.25 | 44pt / 48dp | Low–med | Full | Standard AA |
| **Tablet** | 16–17px | 1.25 | 44pt | Medium | Full | Standard AA |
| **Desktop** | 14–16px | 1.25–1.333 | 32–40px (24 min) | High | Full + hover | Standard AA |
| **Ultrawide** | 16px | 1.333 | 32–40px | High (in columns) | Full | Standard AA |
| **TV** | 24–32px | 1.333 | Focus-based (no fixed px) | Very low | Deliberate, slower | High, but avoid pure #fff (bloom) |
| **Watch** | System-large | 1.2 | ~44pt physical | Minimal | Minimal (battery) | Max contrast |
| **Automotive** | Large | 1.2 | Oversized | Minimal | Near-zero | High, day/night themes |
| **Kiosk** | Large | 1.25 | Oversized (gloved) | Low | Light | High |
| **AR / spatial** | Angular (subtension-based) | 1.25 | Large (gaze+pinch) | Low | Conservative (comfort) | High, depth-aware |
| **Voice** | — | — | — | — | — | — (audio: pace, brevity) |
| **E-ink** | 18px+ | 1.25 | 44pt | Low | None | Max B/W contrast |

> **Type sizing across distance is angular, not px.** The reason TV base type is ~2× a phone's is that legibility depends on the angle a glyph subtends at the eye. Same readable angle, ~6× the distance, ~2× the physical size after accounting for density. This is why "just scale the px up" from `responsive.md` does not reach across surface classes — it is the boundary between the two files.

---

## Register still applies

Surface sets the **floor** (reachability, legibility, attention budget); the brand/product register from the router sets the **expression** on top. They compose — surface is never an excuse to drop register.

| | Brand surface | Product surface |
|---|---------------|-----------------|
| **Phone** | Full-bleed hero, display type, entrance motion — within the thumb arc | System font, thumb-zone nav, state-only motion |
| **Desktop** | Committed color, scroll choreography, wide editorial moments | Dense dashboard, restrained color, keyboard-first |
| **TV** | Cinematic hero rails, bold motion — at 10-foot legibility | Simple focus grid, high-contrast, minimal motion |

Read it as: the surface tells you *what layouts and tokens are physically allowed*; the register tells you *how expressive to be inside that envelope*.

---

## Picking — the procedure

1. **Name the primary surface** — where is this *mainly* consumed? Name secondary surfaces it must also serve.
2. **Read its constraint profile** (the taxonomy table). The hard constraint is the one that kills patterns.
3. **Select Layer-1 patterns** whose *fits* includes the primary surface. For each, note its *degrades to* form on the secondary surfaces — that degraded form is your responsive plan, built up per `responsive.md` (start at the most constrained surface, add complexity outward).
4. **Apply the Layer-2 style deltas** — base type, target size, density, motion budget, contrast posture for the surface.
5. **Layer register on top** — brand or product expression inside the envelope the surface allows.
6. **Validate cross-surface** — does every primary pattern have a *defined* degraded form on each secondary surface? An undefined degrade is the surface-mismatch bug below.

---

## Red flags — surface mismatches

| Flag | Surface it breaks | Constraint violated | Fix |
|------|-------------------|---------------------|-----|
| Hover-revealed content or actions | Touch, TV, voice, e-ink | No hover state exists | Make it visible or tap/focus-triggered; `@media (hover: none)` fallback |
| Desktop information density shipped to TV | TV / 10-foot | Viewing distance — unreadable at 3 m | Drop to very-low density, ~2× base type, focus grid |
| Fine / small targets in a vehicle | Automotive | Glance safety (~2 s) | Oversize targets; move depth to voice; cap task length |
| Primary action stranded at top of a tall phone screen | Phone | Thumb reach | Move primary action into the bottom thumb arc |
| Full-bleed body text on ultrawide | Ultrawide | Line length (>75ch unreadable) | Cap measure; use columns or a centered content well |
| Any motion on e-ink | E-ink | Refresh ghosting | Remove motion; use static state changes |
| Multi-pane dashboard on a watch | Watch | Glance budget, viewport | Collapse to glanceable single-focus + hub-and-spoke |
| Pure-white fields filling a TV screen | TV | Bloom / eye fatigue at distance | Use near-white / dark UI; reserve white for small text |
| Scroll required to comprehend a glance surface | Watch, automotive, notification | ~2 s attention | One comprehensible datum at rest, no scroll to the point |

---

## This vs that

| Confusion | This file says | Not this |
|-----------|----------------|----------|
| "Surface is just another breakpoint" | A breakpoint is a *width within one surface class*; a surface is a *different input/distance/attention*. Width is degree; surface is kind. | A 768px media query handles the tablet/TV/watch difference |
| "Make it responsive and it covers every device" | Responsive (`responsive.md`) fluidly scales the screen-web continuum; it does not reach D-pad, glance, voice, or 10-foot legibility — those need surface-specific patterns | One fluid layout serves phone through TV |
| "Just scale the type up for TV" | Legible size is *angular* at the viewing distance, not a px multiple; TV also needs focus nav, overscan margins, and no-bloom contrast | TV is desktop with bigger fonts |
| "Mobile = phone" | "Mobile" is a viewport range on the screen-web continuum; *phone* is a surface (one-handed touch, ~40 cm, interruptible). They overlap but are not the same axis | Designing for "mobile" automatically handles one-handed reach |
| "Pick patterns by taste" | Patterns are selected by which surface constraints they fit or break — cite the constraint | This layout looks nicer, so use it everywhere |
