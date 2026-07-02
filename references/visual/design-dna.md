# Design DNA
**Source:** Divergence research (Anthropic frontend-aesthetics cookbook, remix-recipe pattern; 2026 designer-process research — reference grounding before generation, diverge → criteria-bound critique → synthesize), grounded in Design for Hackers principles
**Core Concept:** A design DNA is an explicit, named combination of choices across four axes — type voice, color strategy, composition, motion vocabulary — grounded in two named references and assembled by *remixing across aesthetic families* rather than cloning one. Unique by construction: two projects with similar briefs still get different DNAs because the remix space is combinatorial and seeded by *their* content. The DNA is specified in DESIGN.md **before any code is written**.

---

## Table of Contents

1. [Why DNA Instead of "A Style"](#why-dna-instead-of-a-style)
2. [The Pipeline](#the-pipeline)
3. [Ground: Two References per Candidate](#ground-two-references-per-candidate)
4. [The Four Axes](#the-four-axes)
5. [Remix Rules](#remix-rules)
6. [Register: A Per-Moment Dial](#register-a-per-moment-dial)
7. [The Signature Move](#the-signature-move)
8. [The Composition Dealer](#the-composition-dealer)
9. [Diverge: Five Candidates](#diverge-five-candidates)
10. [Critique: All Candidates, Before Any Choice](#critique-all-candidates-before-any-choice)
11. [Converge: Pick, Synthesize, or Loop Once](#converge-pick-synthesize-or-loop-once)
12. [DESIGN.md Template](#designmd-template)
13. [The Gate](#the-gate)

---

## Why DNA Instead of "A Style"

Models sample the distributional center: ask for "a clean modern design" and you get the statistical average of the training corpus — the same fonts, the same gradients, the same card grid every time (see `ai-tells.md` for the full catalog). Picking a single aesthetic family helps but still converges: every "brutalist" design drifts toward the same three reference sites.

Remixing breaks this. Type from one family, color strategy from another, composition from a third produces combinations that don't exist as a cluster in the training data — the result can only be derived from THIS project's archetype, content, and constraints. That's what "authored" means (ai-tells.md): choices a generic system wouldn't make, traceable to intent (foundations §7, layers in harmony).

---

## The Pipeline

The DNA step runs as a design process, not a menu pick: **ground → diverge → critique → converge → gate.** This is the documented shape of expert practice (the design-studio method: reference gathering precedes sketching; divergence is a protected phase; critique is criteria-bound and separate from selection; convergence synthesizes rather than merely picks; critique findings may seed one fresh round). The process exists to correct exactly the failure a model has by default — the first idea is the most statistically obvious one.

| Stage | What happens |
|---|---|
| **Ground** | Two named references per candidate direction, collected *before* anything is generated |
| **Diverge** | Five candidates, forced apart by disjoint reference pairs and hue-family spread |
| **Critique** | One criteria-bound pass over all five — distinctiveness, register fit, tells scan — before anything is offered for choice |
| **Converge** | Pick one, synthesize across candidates, or loop back once for a fresh divergent round |
| **Gate** | DESIGN.md locked; nothing downstream starts before it |

---

## Ground: Two References per Candidate

Generation without references samples the model's prior — the interview and archetype narrow the space, but they don't pull it off-center. So every candidate anchors to **two named, distinct references**, stated as a collision:

> **X's [specific quality] + Y's [specific quality]** — e.g. "Linear's typography discipline + Pitchfork's editorial color."

Why two: one reference is a clone target; two pull in different directions, and the direction satisfying both is somewhere the training data has no cluster. Triangulation off the statistical center is the one Claude-specific mitigation the 2026 divergence research surfaced — and it matches designer practice, where reference/mood-board gathering is a distinct step before any sketching.

What counts as a reference: a product, a publication, a movement, a physical object (a transit map, a receipt, a paperback cover, a road sign). What doesn't: a distribution — "modern SaaS" or "clean minimal" names the center, not a point. Name the *specific quality* being borrowed from each, not the whole aesthetic; the collision of the two qualities is what defines the candidate's direction.

The collision is recorded in the candidate's GROUNDING line and carried into DESIGN.md — it's the sentence that explains the design six months later.

---

## The Four Axes

Every DNA specifies all four. Definitions of each family's position per axis are in `archetypes.md` Part B.

| Axis | What it covers | Examples of a position |
|---|---|---|
| **Type voice** | Display + body fonts, scale ratio, weight range, leading character | "Fraunces display over Karla body, 1.333 scale, loose leading" |
| **Color strategy** | Seed hue, chroma character, background approach, harmony rule, accent count | "Moss seed (h150), muted chroma, warm paper background, analogous, 1 accent" |
| **Composition** (layout discipline) | Grid character, density, radius, borders/shadows, symmetry, dominant element | "Swiss grid, hairline rules instead of cards, zero radius, flush-left" |
| **Motion vocabulary** | Timing range, easing character, what's allowed to move, signature transition | "State-only, 150ms, sharp ease-out, value-count transitions" |

**The composition slot is a dealt token.** The seeded composition dealer (`scripts/dealer.mjs` — see [The Composition Dealer](#the-composition-dealer)) deals each candidate's composition position deterministically — the schema carries `composition: <dealt>` and the model justifies and executes the dealt hand rather than choosing it. Composition stays hue-independent: the same discipline works in any hue family.

---

## Remix Rules

1. **Pick the base family** from the archetype's *primary* families (archetypes.md Part C), filtered by content pressure and structure register. The base supplies the default position on ALL four axes.
2. **Borrow exactly one or two axes** from a different compatible family (primary or stretch list). Borrowing zero axes = clone (convergent). Borrowing three+ = incoherent (no dominant voice — violates dominance, ch06).
3. **One axis must dominate.** Name which axis carries the design's identity (usually the borrowed one — that's where the tension lives). The others support (ch06: dominance and subordination).
4. **Color strategy and composition rarely both borrow.** They define the "room" the design lives in; changing both unmoors the base family. Prefer borrowing type voice and/or motion vocabulary.
5. **Register is a per-moment dial, not a global cap** (next section): the structure register sets every axis's calm baseline; each named expressive moment may push its axis toward the family's committed end.
6. **Every DNA is scanned against the tells catalog** (`references/visual/ai-tells.md` — detection checklist + checkable signatures, dated) during the critique pass. The catalog is dated evidence, not a frozen ban-list: a choice it names is legal only when the register justifies it and the justification can be stated (the severity model there handles context).
7. **Check harmony** (foundations §2): can you articulate how each axis serves the purpose and survives the medium? If the borrow contradicts the content reality (mono type for long-form reading), it's illegal no matter how interesting.

---

## Register: A Per-Moment Dial

A single global register — "brand" or "product" capping every axis uniformly — produces surfaces that are uniformly restrained or uniformly loud, and uniform is the tell. 2026 practice resolves minimal-vs-maximal as **moments vs structure within one surface**: minimalist structure that provides ease and navigation, paired with expressive moments that bring warmth and identity. It's category-conditional — a pharma dashboard keeps the dial low even at its peak; a fragrance brand's peak moment *is* the identity.

The DNA schema carries register as two parts:

- **Structure register** — the calm baseline the whole surface holds: navigation, forms, tables, body text. Restraint here is what buys the moments their impact.
- **Expressive moments (1–3)** — named places where the dial turns up: the hero, an empty state, a success/confirmation, onboarding, the 404. Each names its moment and how far the dial goes there.

The old brand/product intuition survives as *amplitude*: a product surface's moments turn the dial up modestly (a state transition with character, a warm empty state); a brand surface's moments may reach the family's committed end. What no longer exists is a global register that flattens every moment to the same level.

---

## The Signature Move

Every DNA includes **one signature move**: a single, specific, memorable decision a template would never contain. It's the visual fingerprint (ai-tells.md). Examples of the *kind* of thing:

- Section numbers set in 120px Fraunces hanging in the left margin
- All interactive elements share one hard 4px offset shadow that shifts on press
- The accent color appears ONLY on the current nav item and CTA — nowhere else
- Tables use box-drawing characters as borders
- Every image is masked to the same irregular polygon derived from the logo
- Headings interrupt their top border like a legend on a map frame

One move, executed consistently, beats five gimmicks. The signature move is the archetypal expressive moment — it lives where the register dial is up, is recorded in DESIGN.md, and often *is* the smallest expressive moment on a mostly-calm surface.

---

## The Composition Dealer

The verified root cause of generic output is that composition converges even when hue differs — nothing in a prompt-only pipeline spreads layout, so the model drifts to its statistical prior. The fix moves that selection out of the model entirely: a deterministic seeded dealer, `scripts/dealer.mjs`.

```
node scripts/dealer.mjs --project <name> --date YYYY-MM-DD [--candidates 5] [--reroll 0]
```

Per candidate it deals four things: **aesthetic family** (the 12 documented in `archetypes.md` Part B), **composition/layout discipline** (9 disciplines, each documented across scale, density, symmetry, hierarchy, ground, dominant element), **seed hue** (a golden-angle 137.5° walk from a seed-derived base — consecutive hands land maximally far apart, so five hands always span five named hue families), and **signature element**. The seed derives entirely from `--project` + `--date` (+ `--reroll`): the same arguments produce a byte-identical deal, forever — no clock, no randomness.

**The contract — the model's job inverts.** The model justifies and executes the dealt hand; it does not choose, veto, or quietly substitute. Where the pre-dealer pipeline asked "derive a composition from the content," the dealer asks "articulate why THIS family under THIS discipline in THIS hue serves this content, then execute it well." Divergence lives in the deal; taste lives in the execution. A hand that genuinely cannot serve the content is not silently overridden — it goes through the re-deal protocol below, on the record.

**The dial.** Each discipline carries a `variance` value with `DESIGN_VARIANCE`-compatible semantics — a 1–10 scale from centered/clean (1, Monolith Center) to asymmetric/modern (9, Fractured Grid) — so a dealt composition is legible as a dial position, not just a name.

**Re-deal protocol.** If the user rejects a dealt hand, re-deal with `--reroll N+1` — never by editing the hand. Both deals stay recorded in `used-dna.json`, so the rejected cells remain excluded from future runs; rejection consumes cells rather than recycling them.

**Exclusion and banned cells.** Dealt `(family, discipline)` cells land in a local `used-dna.json` ledger and are excluded from later deals with a different seed (re-running the *same* seed replays the recorded output verbatim). On top of exclusions, the known AI-tell cells from `ai-tells.md` — cyan-on-dark dashboard, purple-gradient centered hero, dark-default glowing hero, glassmorphism panel dashboard, dark+acid-green terminal, the cream+serif+terracotta cluster's home cell — ship as **banned cells** the dealer never emits. Only the exact tell cells are banned: a legal cell one step away (same family, different discipline — or the reverse) is legal, because the tell is the *combination*, not the ingredient. There is no uniform-card-grid discipline at all, so that layout tell is structurally unreachable. The cell space is 12 × 9 = 108 cells, 102 legal after bans — if exclusions ever leave fewer legal cells than requested candidates, the dealer errors clearly (exit 3) instead of repeating a cell.

**Honest limit.** The ledger is local — there is no shared server. Two users dealing with similar project names and dates can collide on the same cells: collisions are rare, not impossible. The exclusion guarantee is per-machine, per-ledger; treat cross-user uniqueness as probabilistic, backed by the size of the full hand space (cell × signature × continuous hue).

**Downstream gotcha.** When the pipeline runs `palette.mjs` on a dealt hue (each hand carries a ready `paletteCommand`), remember it exits code 2 when a contrast pair misses 4.5:1 but still prints the CSS — read stdout even on a nonzero exit (`execFileSync` throws; catch and read `err.stdout`).

---

## Diverge: Five Candidates

Generate five DNAs that are **meaningfully far apart** — five is enough spread to force past the first, most obvious idea without flooding the choice. Divergence is forced by three rules, not by candidate personas: a designated "safe option" slot just re-labels the distributional center and becomes the modal pick, which defeats the exercise. The five are peers.

1. **Disjoint reference pairs.** Ten distinct references across the five candidates — no reference anchors two of them. If the same reference keeps volunteering itself, the model is orbiting its prior; reach further.
2. **Hue-family spread.** The five collectively span **five distinct named hue families** — red/orange/amber/yellow/lime/green/teal/cyan/blue/violet/purple/pink (the `palette.mjs` `HUE_NAMES` set); no two candidates share one (≥60° apart in OKLCH unless brand assets lock a hue). When the composition dealer is in play, the seed hues arrive dealt (the golden-angle walk guarantees this spread) and the justification inverts: **write the one-line justification for why the dealt hue can serve this content** before running the palette script. Without the dealer, derive each seed hue from the content — subject matter, cultural associations (ch09), brand assets, dominant hues in the product's imagery — and write the justification before running the script: if you can't name why this hue serves this content, it's habit, not a choice. *Green/lime guard:* green is the model's most common default; a candidate seeds green/lime only on a named content cue (sustainability, money, growth, health/nature, a literal terminal), and at most one of the five.
3. **At least one structural inversion.** At least one candidate flips a structural assumption another candidate holds — light↔dark, dense↔airy, serif↔mono, symmetric↔broken. Same room, opposite stance, so the set can't cluster on one stance.

For each candidate: list the legal base families from the confirmed archetype(s) (after content-pressure and structure-register filtering), derive the DNA under the remix rules, and give it a two-word name ("Quiet Ledger", "Phosphor Field", "Copper Dawn", "Tidal Press") — names force coherence and make the choice memorable.

The candidate spec block (the DNA schema):

```
## [Two-Word Name]
GROUNDING   [X]'s [specific quality] + [Y]'s [specific quality]
[One sentence: what the collision produces and why it fits THIS content.]

TYPE        [display font] over [body font] — [one-line character]
COLOR       seed [hue name] · [background approach] · [harmony] · swatches: #xxxxxx #xxxxxx #xxxxxx
COMPOSITION <dealt> — [family + discipline + variance dial from the dealer hand] · justification: [why this hand serves this content]
MOTION      [one-line vocabulary]
REGISTER    [structure register] structure · expressive at: [moment(s), with amplitude]
DNA         [base family] + [borrowed axis] from [family] · dominant: [axis]
SIGNATURE   [the move]
```

Run the palette script (`${CLAUDE_PLUGIN_ROOT}/scripts/palette.mjs`) for each candidate's seed before the critique pass, so the swatch hexes are real, contrast-checked values — not invented.

---

## Critique: All Candidates, Before Any Choice

Before anything is offered for selection, run **one criteria-bound critique pass over all five**. Critique is its own phase with criteria — not ambient reaction, not a preference pick over unexamined options (that's how the most statistically familiar candidate wins by default). Three criteria per candidate:

| Criterion | The question | Evidence to record |
|---|---|---|
| **Distinctiveness** | Logo removed, would you recognize it? Is the direction derivable only from THIS content + grounding, or does it sit near the distributional center despite its references? | The nearest generic cluster it risks resembling, named |
| **Register fit** | Does the structure register serve the archetype and content? Are the expressive moments placed at genuine high-emotion points, with category-appropriate amplitude? | Each moment checked against the journey's actual emotional peaks |
| **Tells scan** | Scan the full spec — fonts, hexes, composition, motion, copy tone — against `references/visual/ai-tells.md` (detection checklist + checkable signatures). **Scan the GROUNDING line too:** if both named references are themselves catalogued AI-tell aesthetics (e.g. both drawn from the cream/serif/terracotta escape-hatch cluster), the collision triangulates straight back to the center — re-ground that candidate with at least one reference from outside the catalog. | Tells hit, with the catalog's severity |

Output: a two-to-three-line verdict per candidate — strongest element, weakest element, tells findings. Weak candidates are marked, not dropped: their strongest element is synthesis material for the next stage.

---

## Converge: Pick, Synthesize, or Loop Once

Present all five spec blocks **in the message**, each with its critique verdict attached, so the user compares them side by side. (`AskUserQuestion` caps at 4 options, so it cannot carry five candidates — render the specs inline and let the user pick by name.) Three legal outcomes; offer all three, force none:

1. **Pick one.** Always legal — the fast path. A user who wants candidate three gets candidate three.
2. **Synthesize.** Combine the strongest elements across candidates into a new DNA, under the remix rules — borrow limits still apply, one axis still dominates; a synthesis that takes one axis from each of four candidates is incoherent, not rich. Re-present the synthesis once as a full spec block with its own critique line before locking.
3. **Loop back once.** If the critique pass shows the set clustering, or the user says none fit, run ONE fresh divergent round seeded by the findings: keep what critique marked strong, avoid the named weaknesses, re-ground the collisions that failed the tells scan. One loop, then converge — the DESIGN.md gate remains the only exit.

A worked synthesis:

> Critique found "Copper Dawn" strongest in type (Fraunces display, editorial confidence) but its palette drifting toward the terracotta escape-hatch cluster, while "Tidal Press" had the strongest color story (ink-blue analogous on cold paper) but timid type. The user says: "Copper Dawn's type on Tidal Press's palette." Synthesis: the base family stays Tidal Press's (color strategy + composition define the room — remix rule 4), type voice borrows from Copper Dawn, motion follows the base, dominant axis = type voice. New two-word name ("Inkset Dawn"), one re-present with a fresh critique line, then lock.

Always invite **"None of these — tell me what's off"** explicitly.

---

## DESIGN.md Template

Written to the project root (or `docs/`) after convergence. This file is the **governance artifact**: implementation re-reads it at every checkpoint; it is separate from any task instructions so the constraints don't dissolve mid-session.

```markdown
# Design: [Two-Word Name]
**Date:** YYYY-MM-DD · **Status:** confirmed
**Archetype:** [archetype] · **Register:** [structure register] structure · expressive at: [moment(s)]
**Grounding:** [X]'s [specific quality] + [Y]'s [specific quality]
**DNA:** [base family] + [borrowed axis] from [family] · **Dominant axis:** [axis]
**Composition:** <dealt> ([the dealer hand: family + discipline, variance dial, seed — from scripts/dealer.mjs])

## Direction
[2-3 sentences: the feeling, who it serves, why this collision fits this content.]

## Signature move
[The move, stated precisely enough to implement consistently — the archetypal expressive moment.]

## Expressive moments
[Each moment: where, what turns up, how far the dial goes. Everything else holds the structure register.]

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

## Never (this project's tells at risk)
- [the ai-tells.md detection-checklist items most at risk for THIS dna]
- [each borrowed-family temptation explicitly named, e.g. "no second accent hue"]

## Open questions
- [anything deferred]
```

---

## The Gate

**Do not write or modify any UI code until the user confirms DESIGN.md.** Confirmation is explicit (`AskUserQuestion`: "Lock this in?" / "Adjust"). After lock:

- Every implementation pass starts by re-reading DESIGN.md (files persist; conversation decays).
- Deviations require editing DESIGN.md first, not improvising in code.
- audit and polish modes check work AGAINST DESIGN.md when it exists — drift from the locked DNA is a Major finding.
