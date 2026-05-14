---
name: design-for-ai
description: "Visual design principles from Design for Hackers. Use when building or improving UI/frontend design — choosing fonts, building color systems, establishing design direction, auditing existing designs, or polishing before shipping. Also use when something 'looks wrong' or 'feels off' about a UI, when designs look generic or AI-generated, or when the user wants theory-backed design guidance rather than vibes."
user-invocable: true
argument-hint: "[design|fonts|color|audit|polish] [context]"
---

Apply visual design principles from *Design for Hackers*. Every recommendation traces to a specific principle — never "it looks better" without the why.

## Routing

Determine what the user needs from their words and route to the right mode.

| Mode | User says something like |
|------|-------------------------|
| design | "Starting a project" / "what direction" / "who is this for" / "purpose" |
| fonts | "Pick fonts" / "typography" / "type scale" / "pairing" / "font" |
| color | "Colors" / "palette" / "color scheme" / "too many colors" |
| audit | "Something's off" / "review this" / "what's wrong" / "check" / "audit" |
| polish | "Almost done" / "final pass" / "motion" / "responsive" / "looks generic" / "AI" |

No mode clear → ask what they need, presenting the table.

---

## design

Establish design foundations before visual work.

Read:
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-01-why-design-matters.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-02-purpose-of-design.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/foundations.md`

Gather through conversation:
1. What are you building? What problem does it solve?
2. Who is the audience?
3. Pick 3 words for the personality/feeling.
4. Constraints? Framework? Accessibility requirements?
5. Reference site (feel like this) and anti-reference (NOT like this).

Build: purpose statement, user personas, primary use cases, aesthetic direction.

Gate: purpose and personas defined before moving to visual work.

Output: design context block. Offer to save to project's CLAUDE.md. Suggest next step — fonts or color.

---

## fonts

Read before making typography decisions:
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-03-typography.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/appendix-fonts-and-typography.md`

Consult the font decision tree in `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/checklists.md`.

Walk through:
1. **Medium** — screen or print? Resolution/devices?
2. **Body font** — select based on medium-form relationship
3. **The "n" test** — identify letter structure (humanist, geometric, realist)
4. **Pairing** — match structures for harmony or use extreme contrast
5. **Scale** — build proportional type scale. Read `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-05-proportions.md` for ratios.
6. **Leading** — 1.2–1.4em for body
7. **Characters** — smart quotes, proper dashes, no fake bold/italic

Output: font stack, type scale, CSS custom properties, rationale for each choice.

---

## color

Read before making color decisions:
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-08-color-science.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-09-color-theory.md`

Consult the color decision tree in `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/checklists.md`.

Walk through:
1. **Mood** — what should the design feel like?
2. **Background** — appropriate to content density
3. **Base hue** — match to mood and cultural context
4. **Scheme** — build from color wheel (monochromatic, analogous, complementary, etc.)
5. **Functional colors** — errors red, success green, links blue, CTAs max contrast
6. **Depth** — warm/cool relationships (warm advances, cool recedes)
7. **Shadows** — hue-shifted, not pure black
8. **Accessibility** — colorblindness testing, redundant cues

Output: color tokens (CSS custom properties), accessibility notes, rationale.

---

## audit

Systematic design review. For each finding: name the problem, cite the violated principle, show the fix.

Severity: **Critical** (breaks purpose/readability/accessibility) · **Major** (visible impact) · **Minor** (missed opportunity)

Read `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/checklists.md` for the full checklist and decision trees.

Work through each section. Load chapter references only for sections where issues are found:

| Section | If issues, read |
|---------|----------------|
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

All paths relative to `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/`.

For cross-cutting issues, also consult `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/techniques.md` for transformation patterns.

Output: findings table by severity, then suggest the right mode to fix each issue.

---

## polish

Final quality pass before shipping.

Read all four:
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/motion.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/interaction.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/responsive.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/ai-tells.md`

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

If identity issues found, also read `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-01-why-design-matters.md` and `${CLAUDE_PLUGIN_ROOT}/skills/design-for-ai/references/chapter-04-technology-and-culture.md`.

Output: scorecard by section, fixes for WARN/FAIL items.
