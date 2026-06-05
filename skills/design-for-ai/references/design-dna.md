# Design DNA
**Source:** Divergence research (Anthropic frontend-aesthetics cookbook, remix-recipe pattern), grounded in Design for Hackers principles
**Core Concept:** A design DNA is an explicit, named combination of choices across four axes — type voice, color strategy, layout discipline, motion vocabulary — assembled by *remixing across aesthetic families* rather than cloning one. Unique by construction: two projects with similar briefs still get different DNAs because the remix space is combinatorial and seeded by *their* content. The DNA is specified in DESIGN.md **before any code is written**.

---

## Table of Contents

1. [Why DNA Instead of "A Style"](#why-dna-instead-of-a-style)
2. [The Four Axes](#the-four-axes)
3. [Remix Rules](#remix-rules)
4. [The Signature Move](#the-signature-move)
5. [Generating 3 Candidates](#generating-3-candidates)
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

## Generating 3 Candidates

Generate three DNAs that are **meaningfully far apart** — they must differ in at least two of: base family, borrowed axis, seed hue region. Do not generate three variations of the same base family.

Recipe:

1. From the confirmed archetype(s), list the legal base families (after content-pressure and register filtering).
2. **Candidate A — the honest default:** the most natural base family, one conservative borrow. The "if you asked a good designer for the safe option" answer.
3. **Candidate B — the tension candidate:** a different base family OR the same base with an aggressive borrow that creates productive tension (e.g., Editorial Minimalism base with Terminal type voice).
4. **Candidate C — the dark horse:** start from a *stretch* family or invert an assumption (light↔dark, dense↔airy, symmetric↔broken). Still legal under the rules — surprising, not random.
5. Derive each candidate's **seed hue from the content**, not from habit: subject matter, cultural associations (ch09 — research the audience's color context), existing brand assets, even dominant hues in the product's imagery. Three candidates should not share a hue region (≥60° apart in OKLCH hue unless brand assets lock the hue).
6. Give each candidate a two-word name ("Quiet Ledger", "Phosphor Field", "Velvet Frame"). Names force coherence and make the choice memorable.

---

## Presenting Candidates

Present via `AskUserQuestion` with one option per DNA, using the `preview` field so the user compares side by side. Each preview contains:

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

Always offer a 4th option: "None of these — tell me what's off" (the AskUserQuestion Other field covers this; invite it explicitly in the question text). If the user picks pieces from two candidates, recombine under the remix rules and re-present once.

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
