# Design DNA
**Source:** Divergence research (Anthropic frontend-aesthetics cookbook, remix-recipe pattern), grounded in Design for Hackers principles
**Core Concept:** A design DNA is an explicit, named combination of choices across four axes — type voice, color strategy, layout discipline, motion vocabulary — assembled by *remixing across aesthetic families* rather than cloning one. Unique by construction: two projects with similar briefs still get different DNAs because the remix space is combinatorial and seeded by *their* content. The DNA is specified in DESIGN.md **before any code is written**.

---

## Table of Contents

1. [Why DNA Instead of "A Style"](#why-dna-instead-of-a-style)
2. [The Four Axes](#the-four-axes)
3. [Remix Rules](#remix-rules)
4. [The Signature Move](#the-signature-move)
5. [Generating 5 Candidates](#generating-5-candidates)
6. [Presenting Candidates](#presenting-candidates)
7. [DESIGN.md Template](#designmd-template)
8. [The Gate](#the-gate)

---

## Why DNA Instead of "A Style"

Models sample the distributional center: ask for "a clean modern design" and you get the statistical average of the training corpus — the same fonts, the same gradients, the same card grid every time (see `ai-tells.md` for the full catalog). Picking a single aesthetic family helps but still converges: every "brutalist" design drifts toward the same three reference sites.

Remixing breaks this. Type from one family, color strategy from another, layout discipline from a third produces combinations that don't exist as a cluster in the training data — the result can only be derived from THIS project's archetype, content, and constraints. That's what "authored" means (ai-tells.md): choices a generic system wouldn't make, traceable to intent (foundations §7, layers in harmony).

---

## The Four Axes

Every DNA specifies all four. Definitions of each family's position per axis are in `archetypes.md` Part B.

| Axis | What it covers | Examples of a position |
|---|---|---|
| **Type voice** | Display + body fonts, scale ratio, weight range, leading character | "Fraunces display over Karla body, 1.333 scale, loose leading" |
| **Color strategy** | Seed hue, chroma character, background approach, harmony rule, accent count | "Moss seed (h150), muted chroma, warm paper background, analogous, 1 accent" |
| **Layout discipline** | Grid character, density, radius, borders/shadows, symmetry | "Swiss grid, hairline rules instead of cards, zero radius, flush-left" |
| **Motion vocabulary** | Timing range, easing character, what's allowed to move, signature transition | "State-only, 150ms, sharp ease-out, value-count transitions" |

---

## Remix Rules

1. **Pick the base family** from the archetype's *primary* families (archetypes.md Part C), filtered by content pressure and register. The base supplies the default position on ALL four axes.
2. **Borrow exactly one or two axes** from a different compatible family (primary or stretch list). Borrowing zero axes = clone (convergent). Borrowing three+ = incoherent (no dominant voice — violates dominance, ch06).
3. **One axis must dominate.** Name which axis carries the design's identity (usually the borrowed one — that's where the tension lives). The others support (ch06: dominance and subordination).
4. **Color strategy and layout discipline rarely both borrow.** They define the "room" the design lives in; changing both unmoors the base family. Prefer borrowing type voice and/or motion vocabulary.
5. **Register caps commitment** (SKILL.md rules): product register pulls every axis toward its restrained end — system-adjacent type fallbacks, fewer accents, state-only motion. Brand register may use each family's committed end.
6. **The kill list always applies.** Every DNA inherits the anti-defaults from `ai-tells.md` (detection checklist = ban list): no Inter/Roboto/Open Sans as display, no purple-to-blue gradients, no cyan-on-dark dashboard palette, no card-everything, no pure #000/#fff, no bounce easing on ambient motion, no uniform spacing without rhythm.
7. **Check harmony** (foundations §2): can you articulate how each axis serves the purpose and survives the medium? If the borrow contradicts the content reality (mono type for long-form reading), it's illegal no matter how interesting.

---

## The Signature Move

Every DNA must include **one signature move**: a single, specific, memorable decision a template would never contain. It's the visual fingerprint (ai-tells.md). Examples of the *kind* of thing:

- Section numbers set in 120px Fraunces hanging in the left margin
- All interactive elements share one hard 4px offset shadow that shifts on press
- The accent color appears ONLY on the current nav item and CTA — nowhere else
- Tables use box-drawing characters as borders
- Every image is masked to the same irregular polygon derived from the logo
- Headings interrupt their top border like a legend on a map frame

One move, executed consistently, beats five gimmicks. The signature move is recorded in DESIGN.md and is exempt from "restrained" register pressure — it's the one place even a product surface gets to be authored.

---

## Generating 5 Candidates

Generate five DNAs that are **meaningfully far apart**. The hard anti-convergence rule: the five must collectively span **five distinct named hue families** — red/orange/amber/yellow/lime/green/teal/cyan/blue/violet/purple/pink (the `palette.mjs` `HUE_NAMES` set). No two candidates share a hue family. Five variations spread across the wheel force exploration off the distributional center (divergence research); the family-spread rule stops the model's default attractor from filling multiple slots. Do not generate variations of the same base family.

Recipe:

1. From the confirmed archetype(s), list the legal base families (after content-pressure and register filtering).
2. **Candidate A — the honest default:** the most natural base family, one conservative borrow. The "if you asked a good designer for the safe option" answer.
3. **Candidate B — the tension candidate:** a different base family OR the same base with an aggressive borrow that creates productive tension (e.g., Editorial Minimalism base with Terminal type voice).
4. **Candidate C — the dark horse:** start from a *stretch* family or invert an assumption (light↔dark, dense↔airy, symmetric↔broken). Still legal under the rules — surprising, not random.
5. **Candidate D — the inversion:** take the honest default's base family and flip its single most defining structural assumption (light↔dark, dense↔airy, serif↔mono, symmetric↔broken). Same room, opposite stance.
6. **Candidate E — the cultural wildcard:** seed hue and family driven by a *specific* cultural or contextual color association for THIS audience (ch09 — research the audience's color context), reaching for whichever hue family A–D left untaken. The furthest legal stretch.
7. Derive each candidate's **seed hue from the content**, not from habit: subject matter, cultural associations (ch09), existing brand assets, even dominant hues in the product's imagery. **Write the one-line content justification for each seed hue before running the script** — if you can't name why this hue serves this content, it's habit, not a choice (ai-tells.md: distinctiveness must serve purpose, not novelty for its own sake). The five seeds land in five different hue families (≥60° apart in OKLCH unless brand assets lock a hue).
8. **Green/lime guard.** Green is the model's most common default and is *not* on the ai-tells kill list, so it slips through unchecked. A candidate may seed green/lime **only** when a named content cue justifies it — sustainability/eco, money/finance, growth, health/nature, or a literal terminal request. Absent such a cue, that slot takes a different hue family. At most one of the five may be green/lime.
9. Give each candidate a two-word name ("Quiet Ledger", "Phosphor Field", "Velvet Frame", "Copper Dawn", "Tidal Press"). Names force coherence and make the choice memorable.

---

## Presenting Candidates

Present all five as labeled spec blocks **in the message** so the user compares them side by side. (`AskUserQuestion` caps at 4 options, so it cannot carry five candidates — render the specs inline and let the user pick by name.) Each block contains:

```
## [Two-Word Name]
[One sentence: what it feels like and why it fits THIS content.]

TYPE     [display font] over [body font] — [one-line character]
COLOR    seed [hue name] · [background approach] · [harmony] · swatches: #xxxxxx #xxxxxx #xxxxxx
LAYOUT   [one-line discipline]
MOTION   [one-line vocabulary]
DNA      [base family] + [borrowed axis] from [family]
SIGNATURE [the move]
```

Run the palette script (`scripts/palette.mjs` in the skill directory — full invocation in SKILL.md design step 3) for each candidate's seed BEFORE presenting, so the swatch hexes are real, contrast-checked values — not invented.

Ask the user to pick one by name, and always invite **"None of these — tell me what's off"** explicitly. If the user picks pieces from two candidates, recombine under the remix rules and re-present once.

---

## DESIGN.md Template

Written to the project root (or `docs/`) after the user picks a candidate. This file is the **governance artifact**: implementation re-reads it at every checkpoint; it is separate from any task instructions so the constraints don't dissolve mid-session.

```markdown
# Design: [Two-Word Name]
**Date:** YYYY-MM-DD · **Status:** confirmed
**Archetype:** [archetype] · **Register:** [brand|product]
**DNA:** [base family] + [borrowed axis] from [family] · **Dominant axis:** [axis]

## Direction
[2-3 sentences: the feeling, who it serves, why this DNA fits this content.]

## Signature move
[The move, stated precisely enough to implement consistently.]

## Type
- Display: [font] ([source/fallback stack])
- Body: [font] ([stack])
- Scale: [ratio] from [base px] — [list the steps]
- Leading: [body]/[display] · Weights: [list]

## Color tokens
[Paste the palette script's CSS custom-property output verbatim — light and dark.]
Contrast: [paste script's contrast report]

## Space, shape, depth
- Spacing scale: [steps]
- Radius: [values and where]
- Borders/shadows: [the system — hue-shifted shadows, never pure black]

## Motion
- Timing: [micro]/[standard]/[large] · Easing: [curves]
- Allowed: [what moves and when] · Never: [what doesn't]
- prefers-reduced-motion: [strategy]

## Never (this project's kill list)
- [ai-tells kill list items most at risk for THIS dna]
- [each borrowed-family temptation explicitly banned, e.g. "no second accent hue"]

## Open questions
- [anything deferred]
```

---

## The Gate

**Do not write or modify any UI code until the user confirms DESIGN.md.** Confirmation is explicit (`AskUserQuestion`: "Lock this in?" / "Adjust"). After lock:

- Every implementation pass starts by re-reading DESIGN.md (files persist; conversation decays).
- Deviations require editing DESIGN.md first, not improvising in code.
- audit and polish modes check work AGAINST DESIGN.md when it exists — drift from the locked DNA is a Major finding.
