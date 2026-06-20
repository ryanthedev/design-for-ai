# Discovery + Design: Phase 5 - Journey + Design-systems skills

## Files Found

- `/Users/r/repos/design-for-ai/docs/foundations-standards.md` — conventions all pillar skills must follow
- `/Users/r/repos/design-for-ai/docs/skill-authoring-template.md` — copy-paste frontmatter + body skeleton
- `/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md` — disjoint trigger scopes + cite-down graph
- `/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md` — core skill (palette.mjs reference, DESIGN.md gate)
- `/Users/r/repos/design-for-ai/skills/usability/references/usability-principles.md` — law anchors to cite-down into
- `/Users/r/repos/design-for-ai/skills/behavioral/SKILL.md` — Phase 4 pattern to follow
- grug `design-for-ai/journey-flow-ux-research-md.md` — full journey stack research (JTBD, IA, persuasion spine, caveats, JOURNEY.md shape)
- grug `design-for-ai/design-pillar-landscape-research-md.md` — design-systems pillar section (Frost/Kholmatova/Mall/W3C tokens)

## Current State

Skills directory has: behavioral/, content-design/, data-viz/, deceptive-patterns/, design-for-ai/, usability/. The two Phase 5 targets — `journey/` and `design-systems/` — do not exist yet.

Established patterns from Phase 4 (behavioral/deceptive-patterns) to follow:
- SKILL.md: frontmatter + ~80-line body (When this applies, Rules, Procedure sections, References table)
- Two reference files each, 11K–21K, opening with a ToC
- References use the 11 canonical section names only (no banned constructs)
- Cite-the-principle on every claim, source in parens

## Gaps

None structural — all prerequisites are met. Both source grug memories are available and rich. The `journey` description must be drafted carefully against the ≤1024 char budget with the "Not for:" clause. The `design-systems` skill must reference (not re-implement) palette.mjs and DESIGN.md.

## Code Standards

From `foundations-standards.md`:
- Frontmatter: `name`, `description`, `user-invocable: true`, `argument-hint`
- Description ≤ 1024 chars, third person, no XML tags, "Not for:" clause mandatory
- Reference files: ToC first if >100 lines, 11 canonical sections, no banned constructs
- `validate_skill` = 0 errors / 0 warnings before done
- Cite-the-principle on every recommendation
- Cite-down only: journey → usability; design-systems → core palette/DESIGN.md; never upward

## Test Infrastructure

`validate_skill` MCP tool (mcp__plugin_oberskills_skill-eval__validate_skill) — spec lint; 0 errors / 0 warnings required.
`test_triggers` MCP tool — positive queries fire the skill; near-miss queries (sibling pillar) stay quiet. Both directions required.
No unit test framework — skill content is markdown; validation is via the skill-eval tools.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|----------------|--------|------------|
| DW-5.1 | skills/journey/ authored from grug research (includes a JOURNEY.md template) | COVERED | validate_skill on skills/journey/ returns 0/0; JOURNEY.md template present in references; journey cites Hick/Fitts/Miller from usability-principles.md |
| DW-5.2 | skills/design-systems/ authored; extends DESIGN.md toward tokens/components/governance (references, doesn't duplicate, the palette/DESIGN.md approach) | COVERED | validate_skill on skills/design-systems/ returns 0/0; design-systems SKILL.md explicitly references core's palette.mjs + DESIGN.md; semantic token tiers, atomic design, governance, design-to-code all present in references |
| DW-5.3 | validate_skill = 0/0 on BOTH | COVERED | Run validate_skill on both directories; fix all errors and warnings; info notes for user-invocable/argument-hint are expected and acceptable |
| DW-5.4 | test_triggers passes; journey cites usability laws; design-systems doesn't collide with core design | COVERED | Run test_triggers on both; verify journey SKILL.md cites Hick's law / Fitts's law / Miller's law (§ of usability-principles.md) in its Rules; verify design-systems description's "Not for:" clause excludes "single project visual DNA / DESIGN.md → core design" and "raw palette hex → core color" |

**All items COVERED:** YES

## Design Decisions

### journey skill

**Scope boundary from taxonomy:** journey = how a user moves through TIME (sequence/IA/flow). Not the visual DNA (core `design`), not the psychological mechanism (`behavioral`), not the operability of a single screen (`usability`), not device-class layout (`surface`).

**Structure:** Two reference files:
1. `references/journey-stack.md` — the layered altitude model (JTBD → journey maps → IA → user/task flows → page specs), the messy-middle/loyalty-loop models, the marketing persuasion spine, and the JOURNEY.md template. This is the positive constructive content.
2. `references/journey-caveats.md` — anti-journey-map-theater, linear-funnel fallacy, cargo-cult landing page syndrome, JTBD school-mixing, the sitemap ≠ IA warning. The honest-citation layer. (Mirrors behavioral's `ethical-application.md` pattern.)

**Description strategy:** Lead with the temporal/flow concern, enumerate the artifact types (JTBD, journey maps, IA, flows, page specs, persuasion spine), cite JOURNEY.md as the output artifact, name the near-misses clearly. Need to stay under 1024 chars — will count after drafting.

**JOURNEY.md template** will be inside `journey-stack.md` as a section, matching how DESIGN.md template is embedded in `design-dna.md` in the core skill.

**Usability law citations (cite-down):** Hick's law (option reduction in nav design), Fitts's law (CTA placement), Miller's law / Cowan (information chunking in flows) — cited from `usability-principles.md` anchors (#hicks-law, #fittss-law, #millers-law-revised-to-cowan).

### design-systems skill

**Scope boundary from taxonomy:** design-systems = a look → a MACHINE that generates consistent looks (semantic token tiers, atomic composition, governance, design-to-code). Extends DESIGN.md, does NOT re-implement the palette engine or DESIGN.md gate.

**Cite-down to core:** The SKILL.md body explicitly names `scripts/palette.mjs` and the DESIGN.md gate as the prerequisite — design-systems STARTS from a locked DESIGN.md and builds the token/component system on top of it.

**Structure:** Two reference files:
1. `references/design-systems-foundations.md` — atomic design (Frost atoms→molecules→organisms→templates→pages), semantic token tiers (global → semantic/alias → component), W3C DTCG token format (stable Oct 2025), component composition, functional vs perceptual patterns (Kholmatova).
2. `references/design-systems-governance.md` — governance models (contribution, versioning, ownership), design-to-code pipeline, scaling (Mall *Design That Scales*), deprecation, multi-brand theming.

**Disjointness from core `design`:** description's "Not for:" clause explicitly excludes "a single project's visual DNA / DESIGN.md → core `design`" and "raw palette hex generation → core `color`". The key differentiator: core `design` produces a one-off DNA spec; `design-systems` produces the repeatable system that uses that spec to generate consistent components at scale.

## Prerequisites

- [x] Required files exist (or will be created — both skill dirs are new)
- [x] Dependencies available (grug memories read, usability-principles.md read, core SKILL.md read)
- [x] skill-eval MCP tools confirmed available (validate_skill, test_triggers)
- [x] Phase 4 pattern established and readable

## Recommendation

BUILD — all prerequisites met, rich source material available, patterns established by Phases 2–4.
