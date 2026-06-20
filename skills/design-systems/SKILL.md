---
name: design-systems
description: "Takes a locked DESIGN.md and builds the repeatable machine that generates consistent UI from it — semantic token tiers, atomic component composition, governance, and design-to-code pipelines. Covers atomic design (Frost: atoms→molecules→organisms→templates→pages), semantic token tiers (global→alias→component, W3C DTCG format), functional vs perceptual component patterns (Kholmatova), multi-brand theming, governance and contribution models, how to version or deprecate a component library (semver for design systems), and scaling (Mall Design That Scales). Use when the question is about design tokens, token tiers, component libraries, atomic design, design system governance, how to version a component library, design-to-code pipeline, scaling a design system, multi-brand theming, or building a reusable component system. Not for: visual look, feel, or AI-generated appearance — use core design or audit; raw palette hex generation — use core color; a single project's one-off DESIGN.md — use core design."
user-invocable: true
argument-hint: "[component, token tier, or governance context]"
---

A design system turns a one-off design DNA (DESIGN.md) into a machine that generates consistent, maintainable UI at scale. This skill starts where the core `design` skill ends — a locked DESIGN.md with semantic tokens from `palette.mjs` — and builds the component architecture, token tier hierarchy, and governance model on top of it.

**Prerequisite:** a locked DESIGN.md at the project root. If none exists, run the core `design` mode first to establish the visual DNA and generate base tokens via `palette.mjs`. This skill extends that foundation; it does not re-derive or replace it.

## When this applies

- Promoting a one-off design (DESIGN.md) into a **token system** — defining the alias and component tiers on top of the global tokens that `palette.mjs` generates.
- Building or auditing a **component library** — applying Brad Frost's atomic design (atoms → molecules → organisms → templates → pages) to decompose UI into reusable, composable units.
- Designing for **consistency at scale** — when more than one team, product, or brand shares a visual language and needs governance to stay coherent.
- Defining a **semantic token tier** — mapping global design decisions (color, spacing, type) to alias tokens (color-text-primary, space-md) to component tokens (button-background, card-padding).
- Choosing a **design-to-code pipeline** — token delivery, code generation, component versioning, and what tooling earns the integration cost.
- Establishing **governance** — contribution models, ownership, versioning, deprecation, and how the system evolves without breaking consumers.
- **Multi-brand theming** — swapping the global token tier to produce distinct brand expressions from a shared component architecture.

Not for: authoring a project's visual DNA or generating the palette from scratch (use core `design` + `palette.mjs`); raw palette hex generation (use core `color`).

## Rules

- **Prerequisite gate.** Always confirm a DESIGN.md with locked tokens exists before proceeding. If it doesn't, say so and hand off to core `design` first.
- **Extend, never replace.** The palette.mjs global tokens are the ground floor. Semantic and component tiers build on them. Changing the global tokens means re-running `palette.mjs`, not editing hex values by hand.
- **Cite the principle.** Every recommendation names its source: "Frost atomic design (2013)", "Kholmatova functional vs perceptual patterns (Design Systems 2017)", "W3C DTCG token format (stable Oct 2025)", "Mall governance ROI (Design That Scales 2023)".
- **Token tiers are semantic, not just naming.** Global tokens encode decisions (what colors exist). Alias tokens encode intent (what role a color plays: color-text-primary, not blue-500). Component tokens encode scope (what value a component uses: button-background, not color-text-primary used incorrectly in a non-button context). The tier boundary is the design decision layer, not the rename layer.
- **Atomic design is a composition model, not a delivery model.** Frost's atoms→molecules→organisms→templates→pages describes how components relate to each other, not how they should be structured in code or in a design tool. Apply the mental model; don't force the file structure.
- **Functional vs perceptual patterns (Kholmatova).** Functional patterns: shared UI behavior (navigation, form fields, data tables) — the structural grid the system is built on. Perceptual patterns: shared visual qualities (color use, spacing rhythm, typographic hierarchy) — how it feels. Both are governed; neither is a side effect.
- **Governance without an owner is shelfware.** A design system needs a named owner (or team), a contribution model (how outside teams add to it), a versioning scheme, and a deprecation process. Name these or the system accumulates inconsistency faster than it removes it.
- **Stay generative.** Produce the token tier, the component decomposition, the governance model — don't degrade into a catalog of framework options. Tooling choices (Storybook, Style Dictionary, Theo, Cobalt) are named as current examples, never pinned.

## Procedure

### A. Orientation: what is being built or fixed?

Load `references/design-systems-foundations.md`. Determine the task:

| Task | Entry point |
|------|-------------|
| Build a token tier from scratch | §B: Token tiers |
| Decompose UI into components | §C: Atomic design |
| Review an existing component system | §C + load `references/design-systems-governance.md` §audit criteria |
| Set up governance | §D: Governance |
| Design-to-code pipeline | §D: Design-to-code |
| Multi-brand theming | §B: Token tiers — global layer swap |

### B. Token tiers

When promoting DESIGN.md tokens into a full semantic tier:

1. Re-read the project's DESIGN.md for the existing global token set (generated by `palette.mjs`).
2. Build the **three-tier hierarchy**:
   - **Global tokens** (from `palette.mjs`): raw values — color-blue-500: `#2563eb`, space-4: `1rem`. These are the design system's vocabulary.
   - **Alias / semantic tokens**: intent-mapped — `color-text-primary: {color-blue-500}`, `space-content-gap: {space-4}`. These encode the design decision ("primary text is blue-500") and isolate consumers from global changes.
   - **Component tokens**: scope-specific — `button-background: {color-text-primary}`, `card-padding: {space-content-gap}`. These let a component be restyled without touching the alias tier.
3. Format using W3C DTCG token format (stable Oct 2025): `$type`, `$value`, `$description` per token; groups use dotted path notation.
4. For multi-brand theming: keep the component and alias tier constant; swap the global tier (a different `palette.mjs` run with a different seed/chroma).

### C. Atomic design decomposition

When building or auditing a component library (Frost, 2013):

1. Load `references/design-systems-foundations.md` — the atomic design section.
2. Map existing UI to atoms first (smallest non-decomposable units: button, input, label, icon, color swatch, type sample).
3. Compose molecules from atoms (search field = input + button + label).
4. Compose organisms from molecules and atoms (site header = logo atom + nav molecule + search molecule).
5. Templates: page-level component arrangements with placeholder content.
6. Pages: specific instances of templates with real content — where design meets reality.
7. Apply Kholmatova's functional vs perceptual lens: are the functional patterns shared (same navigation shell, same form layout)? Are the perceptual patterns consistent (same color use, same spacing rhythm)? Misalignment between the two is where inconsistency lives.

### D. Governance and design-to-code

When setting up how the design system is maintained and delivered:

1. Load `references/design-systems-governance.md`.
2. Name the **ownership model**: centralized (design-system team owns everything), federated (pillar teams own domains), or hybrid.
3. Define the **contribution model**: how a product team proposes an addition (RFC, PR, design review gate) and how it becomes canonical.
4. Define **versioning**: semver for breaking changes (token renames, component API changes); changelog per release.
5. Define **deprecation**: how components are marked deprecated, how consumers are notified, how long deprecated items persist.
6. For the **design-to-code pipeline**: recommend token delivery (Style Dictionary as current canonical tool for multi-platform token transformation; Cobalt and Theo as alternatives), component story tooling (Storybook as current canonical), and code generation (what earns the integration cost vs. what stays manual).

## References

| Reference file | Load when |
|----------------|-----------|
| `references/design-systems-foundations.md` | Atomic design (Frost), semantic token tiers, W3C DTCG format, functional vs perceptual patterns (Kholmatova), component composition. The constructive layer — how to build the system. |
| `references/design-systems-governance.md` | Governance models (ownership, contribution, versioning, deprecation), design-to-code pipelines, scaling (Mall), multi-brand theming. Load when the question is about maintenance, team processes, or tooling. |
