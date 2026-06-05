---
name: design-for-ai
description: "Visual design principles from Design for Hackers. Use when building or improving UI/frontend design — choosing fonts, building color systems, establishing design direction, generating a unique design system, auditing existing designs, or polishing before shipping. Also use when something 'looks wrong' or 'feels off' about a UI, when designs look generic or AI-generated, or when the user wants theory-backed design guidance rather than vibes. Triggers on: pick fonts, type scale, color palette, design audit, visual hierarchy, spacing feels wrong, looks like a template, redesign, improve the UI, make it look good, needs personality, unique design, design DNA, every design looks the same. Not for: graphic design tools (Figma/Sketch), print layout, logo design, illustration, or CSS framework selection."
user-invocable: true
argument-hint: "[design|fonts|color|audit|polish] [context]"
---

Apply visual design principles from *Design for Hackers*. Every recommendation traces to a specific principle — never "it looks better" without the why.

## Preflight

Before any mode, gather context:

1. **Scan the codebase** — look for CSS/style files, existing fonts, color tokens, component libraries, PRODUCT.md, DESIGN.md, or a `## Design Context` section in CLAUDE.md.
2. **Determine register** — is this surface **brand** (design IS the product: landing pages, marketing, portfolios) or **product** (design SERVES the product: app UI, dashboards, tools)? Cues: route structure, component types, content density.
3. **Note what exists** — fonts already loaded, colors already defined, spacing scale in use. Modes build on what's there, not from scratch.

If no design context exists and the user hasn't specified a mode, route to **design** first.

## Rules

Apply to every mode. Kept separate from mode workflows so they don't dissolve.

- **Register shapes advice.** Brand surfaces get bolder typography, committed color strategies, entrance motion. Product surfaces get system fonts, restrained color, state-only motion.
- **DESIGN.md is law once locked.** When the project has a DESIGN.md, re-read it before any implementation or review pass. Deviations edit DESIGN.md first, then code. audit and polish treat drift from it as Major.
- **Cite the principle.** Every recommendation names the source: "squint test (ch03)", "dominance (ch06)", "warm advances, cool recedes (ch09)." No unsourced opinions.
- **Severity scale** (audit/polish): Critical (breaks purpose/readability/accessibility) · Major (visible impact) · Minor (missed opportunity).
- **Interview pacing**: 2-3 questions per round. Wait for answers before continuing. Never dump all questions at once.
- **Scope boundary**: If the request is about tooling, frameworks, or implementation mechanics rather than visual design, say so and suggest where to look instead.

## Routing

Determine what the user needs from their words.

| Mode | User says something like |
|------|-------------------------|
| design | "Starting a project" / "what direction" / "who is this for" / "purpose" / "unique design" / "new design system" / "make it not look AI-generated" (from scratch) |
| fonts | "Pick fonts" / "typography" / "type scale" / "pairing" / "font" / "choose a typeface" |
| color | "Colors" / "palette" / "color scheme" / "too many colors" / "build a palette" |
| audit | "Something's off" / "review this" / "what's wrong" / "check" / "audit" / "redesign" / "improve" / "fix" / "no hierarchy" / "nothing holds the eye" / "why does it look AI" / "diagnose" |
| polish | "Almost done" / "final pass" / "motion" / "responsive" / "make it less generic" / "add states" / "interaction" |

No mode clear → ask what they need, presenting the table.

When audit triggers match but no existing design work is found in the codebase, suggest running **design** first to establish foundations.

---

## design

> Context needed: what the user is building and who it's for.

Establish foundations, then generate a **unique design DNA** — archetype-driven, remixed across aesthetic families, never the distributional default.

Read first:
- `${CLAUDE_SKILL_DIR}/references/chapter-01-why-design-matters.md`
- `${CLAUDE_SKILL_DIR}/references/chapter-02-purpose-of-design.md`
- `${CLAUDE_SKILL_DIR}/references/foundations.md`

### 1. Interview

Gather through conversation (2-3 questions per round, wait for answers):

**Round 1:** What are you building? Who is the audience? What problem does it solve?

**Round 2:** Pick 3 words for the personality/feeling. Constraints — framework, accessibility, existing brand assets?

**Round 3:** Reference site (feel like this) and anti-reference (NOT like this).

Question like a collaborator, not a form:
- **Think in hypotheses.** Generate 2-3 plausible directions from their answers; ask the question that best separates them.
- **Concrete over abstract.** Offer differential examples — "for ops engineers it reads dense and technical; for execs, airy and narrative" — and let them pick by observable outcome.
- **Switch to confirmatory mode** when the user goes terse ("whatever works", one-word answers): supply your best guess and let them object. "Audience sounds like ops engineers, so I'll treat density as a feature — push back if it's for execs."
- **Ask about intent and taste** (their knowledge). Derive everything visual yourself (your job).

Gate: purpose, audience, personality words, and register (brand/product) established before continuing.

### 2. Archetype

Read `${CLAUDE_SKILL_DIR}/references/archetypes.md`.

Map the interview onto 2-3 candidate brand archetypes (Part C: personality-word table, filtered by content pressure). Confirm with ONE confirmatory question — lead with your recommendation and why: "This reads Sage — measured, evidence-led. Or should it feel more Hero?"

### 3. Design DNA — 3 candidates

Read `${CLAUDE_SKILL_DIR}/references/design-dna.md` and follow its protocol:

1. Build 3 candidates — honest default, tension, dark horse — under the remix rules. Seed hues come from the content, ≥60° apart unless brand assets lock the hue.
2. Run the palette script for **each** candidate BEFORE presenting, so swatches are real, contrast-checked hexes:
   `node ${CLAUDE_SKILL_DIR}/scripts/palette.mjs --seed <hue|#hex> --chroma <muted|balanced|vivid> --harmony <mono|analogous|complementary|split|triadic|tetradic> --scheme light`
   (`--scheme light` keeps previews small; the final run in step 4 uses `--scheme both`.)
3. Present via `AskUserQuestion` with one preview per candidate (format in design-dna.md). Invite "none of these" explicitly.

### 4. DESIGN.md — the gate

For the chosen candidate:

1. Run the palette script with `--scheme both`; paste its token output and contrast report into DESIGN.md (template in design-dna.md) at the project root.
2. Confirm via `AskUserQuestion`: "Lock this in?" / "Adjust". **No UI code until locked.**
3. Save a short `## Design Context` block to the project's CLAUDE.md pointing at DESIGN.md:

```markdown
## Design Context
- **Register**: product
- **Purpose**: help home cooks discover and save recipes
- **Audience**: busy parents, 30-45, cooking 4x/week, phone-first
- **Personality**: warm, practical, unhurried
- **DNA**: Warm Editorial + type voice from Editorial Minimalism — see DESIGN.md
- **Constraints**: React, WCAG AA, mobile-first
```

Suggest next step — fonts to finalize the type scale, or straight to implementation against DESIGN.md.

---

## fonts

> Context needed: rendering medium (screen/print), target devices, desired mood.

Read:
- `${CLAUDE_SKILL_DIR}/references/chapter-03-typography.md`
- `${CLAUDE_SKILL_DIR}/references/appendix-fonts-and-typography.md`

Consult the font decision tree in `${CLAUDE_SKILL_DIR}/references/checklists.md`.

Walk through:
1. **Medium** — screen or print? Resolution/devices?
2. **Body font** — select based on medium-form relationship
3. **The "n" test** — identify letter structure (humanist, geometric, realist)
4. **Pairing** — match structures for harmony or use extreme contrast
5. **Scale** — build proportional type scale. Read `${CLAUDE_SKILL_DIR}/references/chapter-05-proportions.md` for ratios.
6. **Leading** — 1.2–1.4em for body
7. **Characters** — smart quotes, proper dashes, no fake bold/italic

Register adjusts advice: brand gets display fonts, fluid clamp() scales. Product gets system fonts, fixed rem scales.

Output: font stack, type scale, CSS custom properties, rationale for each choice.

---

## color

> Context needed: desired mood, content density, existing brand colors (if any).

Read:
- `${CLAUDE_SKILL_DIR}/references/chapter-08-color-science.md`
- `${CLAUDE_SKILL_DIR}/references/chapter-09-color-theory.md`

Consult the color decision tree in `${CLAUDE_SKILL_DIR}/references/checklists.md`.

Walk through:
1. **Mood** — what should the design feel like?
2. **Background** — appropriate to content density
3. **Base hue** — match to mood and cultural context
4. **Scheme** — build from color wheel (monochromatic, analogous, complementary, etc.)
5. **Functional colors** — errors red, success green, links blue, CTAs max contrast
6. **Depth** — warm/cool relationships (warm advances, cool recedes)
7. **Shadows** — hue-shifted, not pure black
8. **Accessibility** — colorblindness testing, redundant cues

Register adjusts advice: brand can use Committed/Drenched color strategies. Product defaults to Restrained.

Generate the tokens with the bundled script — never invent hex ramps by hand:
`node ${CLAUDE_SKILL_DIR}/scripts/palette.mjs --seed <hue|#hex> --chroma <muted|balanced|vivid> --harmony <rule> --scheme both`
It emits 12-step neutral + accent ramps, harmony accents, functional colors, and a WCAG contrast report (contrast solved by construction). Adjust seeds and re-run rather than editing hexes.

Output: color tokens (CSS custom properties from the script), accessibility notes, rationale.

---

## audit

> Context needed: the codebase or design files to review.

Systematic design review.

Read `${CLAUDE_SKILL_DIR}/references/checklists.md` for the full checklist and decision trees.

Work through each section. For the **top 2-3 sections with the worst findings**, load the chapter reference to ground the diagnosis:

| Section | Reference file |
|---------|---------------|
| Purpose & foundation | `chapter-01-why-design-matters.md`, `chapter-02-purpose-of-design.md` |
| Typography | `chapter-03-typography.md`, `appendix-fonts-and-typography.md` |
| Proportions & layout | `chapter-05-proportions.md` |
| Composition | `chapter-06-composition.md` |
| Visual hierarchy | `chapter-07-visual-hierarchy.md` |
| Color | `chapter-08-color-science.md`, `chapter-09-color-theory.md` |
| SEO & discoverability | `chapter-04-technology-and-culture.md` |
| Motion & interaction | `motion.md`, `interaction.md` |
| Responsive | `responsive.md` |
| Design identity | `ai-tells.md` |

All paths relative to `${CLAUDE_SKILL_DIR}/references/`.

For cross-cutting issues, consult `${CLAUDE_SKILL_DIR}/references/techniques.md` for transformation patterns.

Output: findings table by severity. Example row:

| Severity | Problem | Principle | Fix |
|----------|---------|-----------|-----|
| Critical | Body text uses Garamond at 14px on screen | Medium-form mismatch (ch03): angled axis blurs at low ppi | Switch to Georgia or Source Serif Pro; bump to 16px minimum |

Then suggest the right mode to fix each issue.

---

## polish

> Context needed: the running interface or built code to review.

Final quality pass before shipping.

Run the checklist below first. Then load reference files **only for sections with WARN or FAIL items**:
- `${CLAUDE_SKILL_DIR}/references/motion.md`
- `${CLAUDE_SKILL_DIR}/references/interaction.md`
- `${CLAUDE_SKILL_DIR}/references/responsive.md`
- `${CLAUDE_SKILL_DIR}/references/ai-tells.md`

For each item: **PASS**, **WARN**, or **FAIL** with rationale.

**Motion**
- Animations purposeful (guide attention, state change, feedback)
- Timing: 100ms micro, 300ms standard, 500ms complex
- Easing: ease-out entries, ease-in exits, exponential curves
- No bounce/elastic, no animating layout properties
- prefers-reduced-motion respected

**Interaction**
- All 8 states: default, hover, focus, active, disabled, loading, error, success
- :focus-visible, focus rings never removed
- Forms: labels, validate on blur, aria-describedby errors
- Loading: optimistic UI > skeleton > spinner

**Responsive**
- Mobile-first, min-width queries
- Content-driven breakpoints
- Touch targets 44x44px minimum
- Fluid typography/spacing with clamp()
- Adapts to context, not just shrinks

**Identity**
- Intentional aesthetic, not default/generic
- No AI tells (cyan-on-dark, card-everything, glassmorphism, bounce easing, uniform spacing)
- Memorable character traceable to purpose

If identity issues found, also read `${CLAUDE_SKILL_DIR}/references/chapter-01-why-design-matters.md` and `${CLAUDE_SKILL_DIR}/references/chapter-04-technology-and-culture.md`.

Output: scorecard by section, fixes for WARN/FAIL items.
