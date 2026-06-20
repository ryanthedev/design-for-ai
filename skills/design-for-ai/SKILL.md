---
name: design-for-ai
description: "Visual design principles from Design for Hackers — the visual + surface core of a design-foundations system. Use when building or improving UI/frontend visual design: choosing fonts, building color systems, establishing a unique design direction or design DNA, designing for a device class (phone, TV, watch, in-car, kiosk, voice), auditing designs, choosing animation/motion/3D libraries, or polishing before shipping. Also when something 'looks wrong' or 'feels off', or a design looks generic or AI-generated. Triggers on: pick fonts, color palette, design audit, visual hierarchy, redesign, unique design, 10-foot UI, device layout, add motion, which animation library, GSAP, three.js. Not for: graphic-design tools (Figma/Sketch), print, logos, illustration; or sibling-pillar concerns — operability (usability), UX writing (content-design), chart/data encoding (data-viz), dark patterns (deceptive-patterns), user flows and journey maps (journey), design tokens (design-systems), agent/LLM interfaces (ai-native)."
user-invocable: true
argument-hint: "[design|surface|fonts|color|audit|enhance|polish] [context]"
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
| surface | "Design for TV / a watch / the car / a kiosk / voice" / "10-foot UI" / "which layout for this device" / "device type" / "make this work on <device class>" / "e-ink" |
| fonts | "Pick fonts" / "typography" / "type scale" / "pairing" / "font" / "choose a typeface" |
| color | "Colors" / "palette" / "color scheme" / "too many colors" / "build a palette" |
| audit | "Something's off" / "review this" / "what's wrong" / "check" / "audit" / "redesign" / "improve" / "fix" / "no hierarchy" / "nothing holds the eye" / "why does it look AI" / "diagnose" |
| enhance | "Uplift my site" / "add motion" / "which animation library" / "should I use GSAP / three.js / Lenis" / "scroll animations" / "make it feel alive" / "what libraries" / "add a 3D hero" / "particles" |
| polish | "Almost done" / "final pass" / "motion" / "responsive" / "make it less generic" / "add states" / "interaction" |

No mode clear → ask what they need, presenting the table.

When audit triggers match but no existing design work is found in the codebase, suggest running **design** first to establish foundations.

**enhance vs polish**: enhance decides *what to reach for* — which layer/library buys a wanted effect, gated on register and cost. polish is a quality pass on motion/interaction/responsive that already exists. "Which animation library / add a 3D hero" → enhance. "Is my existing motion correct" → polish.

**surface vs responsive (in polish)**: surface picks patterns and tokens for a device *class* that differs in input, viewing distance, or attention (TV, watch, in-car, voice, e-ink). The responsive checks in polish handle width scaling within the screen-web continuum. Different device *kind* → surface. Same input family, different *width* → responsive/polish.

---

## Pillar skills

This skill is the **visual/aesthetic + surface core** of a multi-skill `design-foundations`
system. It owns the look (design DNA, fonts, color), the surface/device class, and the
quality passes (audit, enhance, polish). The other design pillars are **sibling skills** —
each is its own skill that triggers on its own description; hand off to one when the work is
about a concern below rather than the visual look. (Each pillar cites usability's laws, never
the reverse — citation points down, no cycles. Conventions: `docs/foundations-standards.md`;
full map: `docs/pillar-taxonomy.md`.)

| Sibling pillar | Reach for it when the work is about… |
|----------------|--------------------------------------|
| `usability` | Whether users can *operate* it — heuristic evaluation (Nielsen), UX laws (Fitts/Hick/Miller), affordances, cognitive load, nav/form/table/feedback patterns. (The `audit` mode dispatches its heuristic eval.) |
| `content-design` | The *words* as the interface — UX writing, microcopy, error/empty/button copy, voice & tone. Not visual type (that's `fonts`). |
| `data-viz` | Encoding *data* truthfully — chart selection, dashboards, data-ink, chartjunk, chart accessibility. Not the brand palette (that's `color`). |
| `deceptive-patterns` | *Ethics of influence* — the dark-pattern ban-list; the structural twin of `ai-tells`. |
| `behavioral` | *Why* users act/return/convert — persuasion, habit loops, emotional design. The honest mechanism; its dark version is `deceptive-patterns`. |
| `journey` | How a user *moves through time* — JTBD, journey maps, IA/sitemaps, flows, page specs, the landing-page persuasion spine (ships a JOURNEY.md companion). |
| `design-systems` | A look → a *machine* that makes looks — token tiers, components, governance. Extends DESIGN.md, doesn't replace it. |
| `ai-native` | Agent / LLM-interface design — generative UI, no-fixed-screen interfaces (no settled canon; principle-derived). |

These pillars are authored progressively; a sibling not yet present means its phase hasn't
shipped. No central router is needed — Claude Code triggers each skill on its own description.

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

**Round 2:** Pick 3 words for the personality/feeling. Primary surface — where is this mainly used (phone, desktop, TV, watch, in-car, kiosk, voice)? Constraints — framework, accessibility, existing brand assets?

**Round 3:** Reference site (feel like this) and anti-reference (NOT like this).

Question like a collaborator, not a form:
- **Think in hypotheses.** Generate 2-3 plausible directions from their answers; ask the question that best separates them.
- **Concrete over abstract.** Offer differential examples — "for ops engineers it reads dense and technical; for execs, airy and narrative" — and let them pick by observable outcome.
- **Switch to confirmatory mode** when the user goes terse ("whatever works", one-word answers): supply your best guess and let them object. "Audience sounds like ops engineers, so I'll treat density as a feature — push back if it's for execs."
- **Ask about intent and taste** (their knowledge). Derive everything visual yourself (your job).

Gate: purpose, audience, personality words, primary surface, and register (brand/product) established before continuing.

If the primary surface is non-screen-web (TV, watch, automotive, voice, e-ink) or the user needs device-class layout patterns, run **surface** (or read `${CLAUDE_SKILL_DIR}/references/surfaces.md`) before locking DNA — the surface constrains which layouts and tokens are valid.

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

## surface

> Context needed: the primary surface (device class) the design targets, plus any secondary surfaces it must serve.

Decide which **layout patterns and style tokens** fit the target surface — phone, tablet, desktop, ultrawide, TV/10-foot, watch, automotive, kiosk, AR/spatial, voice, or e-ink. The surface's physical constraints (viewport, input model, viewing distance, attention) gate what's valid; this mode picks patterns that fit and tunes tokens to the constraints. Library- and framework-agnostic — principles first.

Read:
- `${CLAUDE_SKILL_DIR}/references/surfaces.md`
- `${CLAUDE_SKILL_DIR}/references/responsive.md` (the width-scaling rules each chosen pattern degrades along, within the screen-web surfaces)

If a DESIGN.md exists, re-read it first — register and existing tokens constrain the expression.

Follow the procedure in `surfaces.md`:

1. **Name the primary surface**; note secondary surfaces it must serve.
2. **Read its constraint profile** — the hard constraint is the one that kills patterns.
3. **Select Layer-1 patterns** that fit; note each pattern's degraded form on secondary surfaces (that degraded form is the responsive plan, built up per responsive.md).
4. **Apply the Layer-2 style deltas** — base type, target size, density, motion budget, contrast posture.
5. **Layer register on top** — brand/product expression inside the envelope the surface allows.
6. **Validate cross-surface** — every primary pattern has a defined degraded form on each secondary surface.

Output: the chosen surface(s), a pattern selection (pattern → why it fits this surface, citing the constraint), the token-deltas table for the surface, and any surface-mismatch red flags found. Suggest **design** to establish DNA if none exists, or **polish** to quality-check the built result.

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

Systematic design review. This mode owns the **visual** audit — typography, color, composition, hierarchy, identity. When the finding is about whether users can *operate* the interface (heuristic evaluation, UX laws, affordances, cognitive load, pattern fit), dispatch to the **`usability` sibling skill** and run its heuristic evaluation (Nielsen's 10 + the 0–4 severity scale, per its `references/usability-principles.md`); fold its findings into the same severity-sorted table. The visual audit below stays here unchanged — usability is referenced, not relocated.

Read `${CLAUDE_SKILL_DIR}/references/checklists.md` for the full visual checklist and decision trees.

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
| Usability & heuristics (operability) | → the **`usability`** skill (Nielsen 10 + severity; not a local reference file) |

All chapter/reference paths relative to `${CLAUDE_SKILL_DIR}/references/`; the usability row dispatches to the sibling skill.

For cross-cutting issues, consult `${CLAUDE_SKILL_DIR}/references/techniques.md` for transformation patterns.

Output: findings table by severity. Example row:

| Severity | Problem | Principle | Fix |
|----------|---------|-----------|-----|
| Critical | Body text uses Garamond at 14px on screen | Medium-form mismatch (ch03): angled axis blurs at low ppi | Switch to Georgia or Source Serif Pro; bump to 16px minimum |

Then suggest the right mode to fix each issue.

---

## enhance

> Context needed: what effect the user wants, the project's register (from DESIGN.md if present), and the running site/codebase.

Decide **what to reach for** to uplift a site — which library buys a wanted effect. Default to a library; it gives better results, faster. Recommend *categories and current example tools*, never a pinned dependency manifest. The design DNA makes a site distinctive; these libraries only execute it.

Read:
- `${CLAUDE_SKILL_DIR}/references/libraries.md`
- `${CLAUDE_SKILL_DIR}/references/motion.md` (the `prefers-reduced-motion`, GPU-compositing, and timing rules every motion recommendation honors)

If a DESIGN.md exists, re-read it first — register and existing motion language constrain what's appropriate.

Follow the procedure in `libraries.md`, which turns on three principles:

1. **Library-default** — name the effect concretely (a vague "make it pop" gets pushed to a real effect first), find its category, reach for the leading library. Don't hand-roll what a library nails.
2. **Weight is contextual** — on a normal phone over normal bandwidth, tens of KB is invisible; just grab it. Drop to the CSS-based tier (Animate.css, Tailwind animate, AutoAnimate) only when delivery is constrained: satellite/2G/metered, embedded, per-byte ad/widget surfaces.
3. **3D is the real cost** — the one effect heavy everywhere (bytes + GPU/battery). Confirm the experience is genuinely 3D before spending it.

Name current examples to verify, never pin versions. Attach the `prefers-reduced-motion` requirement to any motion recommendation.

Output: a recommendation table (effect → category → library → current example to verify → weight note), the accessibility note, and the reminder that the design DNA — not the libraries — is what makes the site distinctive. Suggest **polish** as the follow-up once effects are built, to quality-check the motion.

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
