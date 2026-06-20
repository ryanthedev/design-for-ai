# Discovery + Design: Phase 2 — research command

## Files Found

- `/Users/r/repos/design-for-ai/commands/research.md` — Phase 1 stub (frontmatter + goal + stub body + chain instruction); ready to be overwritten with full body
- `/Users/r/repos/design-for-ai/docs/workflow-conventions.md` — lifecycle, artifact gates, handoff chain conventions (the contract)
- `/Users/r/repos/design-for-ai/docs/foundations-standards.md` — frontmatter rules, description budget
- `/Users/r/repos/code-foundations/commands/research.md` — the template: facilitation voice, progressive narrowing, saving, chain instruction

## Current State

`commands/research.md` exists as a valid stub from Phase 1. Frontmatter is valid. The body is a three-line placeholder. This phase overwrites the body with the full facilitation flow — the frontmatter stays intact.

## Gaps

None blocking. One design decision to resolve:
- The code-foundations template's "What Comes Next" section is open-ended (user might do anything after research). This repo's equivalent must be **prescriptive**: the output chains to `/design-for-ai:plan`. The section must name the exact handoff — this is DW-2.3.
- The code-foundations template's progressive-narrowing dimensions (purpose/actors/context/boundaries/needs/risks) are code-shaped. This command must re-ground them as design dimensions: what/who/brand-and-mood/JTBD/device+constraints/references. The logic is the same (make the problem space smaller), only the labels change.
- No "When to Research" web-search section in code-foundations. This command adds one (mood boards, competitor references, visual references) because design research is visually oriented, not just factual.

## Code Standards

From `foundations-standards.md`:
- `description` 1–1024 chars, third person, no XML tags — the stub description ("Figure out what the user wants to design...") is already valid; keep it.
- Command frontmatter: only `description` + `argument-hint`; no `name` key (code-foundations pattern).
- SKILL.md body < 500 lines (command bodies fall under this spirit).

Commands are NOT skill directories — `validate_skill` does not apply. Verification = desk-check frontmatter + required sections present + behavior matches DW items.

## Test Infrastructure

This is a command file (not a skill dir). Per the Test Substrate:
- `validate_skill` does NOT apply to commands.
- Verification = (a) desk-check: frontmatter parses as valid YAML; (b) structural presence of required sections; (c) DW-item text present and correct in the body.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-2.1 | `commands/research.md` exists with valid frontmatter; facilitation flow re-grounded for design (brand/audience/mood/JTBD) | COVERED | Desk-check: file exists; YAML frontmatter parses (description + argument-hint); body contains the design dimensions (brand/audience/mood/JTBD) in the progressive-narrowing section |
| DW-2.2 | it writes a research doc to `.code-foundations/research/` with summary + date/status + open questions | COVERED | Desk-check: Saving section names the correct output path, includes the mkdir command, and lists summary + date/status + open questions as required top-of-file items |
| DW-2.3 | it chains to `plan` (names the exact `/design-for-ai:plan <doc>` handoff) | COVERED | Desk-check: "What Comes Next" or equivalent section contains the exact string `/design-for-ai:plan .code-foundations/research/<file>.md` |

**All items COVERED:** YES

## Design Decisions

### Voice and tone (prompt skill principle #2 — explain why)
The facilitation voice is carried verbatim from code-foundations: short turns, opinions, energy-matching, no preamble, varied rhythm. These are not arbitrary style rules — they're necessary because a user arriving with "make it look good" needs to be drawn out conversationally, not handed a form to fill in. The instructions are written as standing behavioral rules (principle #4 — governance apart from task), not as a step-by-step procedure.

### Design dimensions vs code dimensions
The progressive narrowing section re-grounds code-foundations' six dimensions into design-native language:
- Purpose → **What** (what is this, what should it do/feel)
- Actors → **Who** (audience + context of use, device class)
- Context → **Brand & mood** (existing visual identity, references, what it should feel like; a blank-brand case is valid — flag as open question)
- Boundaries → **JTBD & story** (job to be done — why the user turns to this product)
- Needs → **Device + constraints** (screen size, platform, tech constraints, timeline)
- Risks/references → **References** (mood boards, competitor examples, visual inspirations)

This is a deliberate 1:1 re-labeling, not a new structure. The progressive-narrowing logic (ask → listen → reflect → ask deeper; make problem space smaller) is identical.

### Web/image research section
Code-foundations has a "When to Research" section limited to factual lookups. Design research is different: mood boards, competitor screenshots, visual references are a central tool, not an exception. The command adds an explicit "Gathering References" section that names this use case, while keeping the same rule (research is a tool, not the goal).

### Edge-case handling (finished brief / no brand)
Two edge cases named in the plan:
1. **Finished brief** — detect early (user provides a complete brief upfront); reflect + confirm instead of re-interviewing. Instruction: if a reflection produces "yes, that's it," move to saving.
2. **No brand** — when the user has no existing visual identity, note it as an open question in the doc; the core `design` mode's DNA step resolves it. Do not block or invent one.

Both are handled in the "Starting" table and the "Open Questions" saving note.

### What comes next (chain instruction)
Code-foundations is open-ended ("user might take it anywhere"). This command is prescriptive: the research doc is the seed for `/design-for-ai:plan`. The handoff instruction names the exact command + argument. If the user wants to stop at research, that's fine — but the default path names the next stage.

## Prerequisites

- [x] `commands/research.md` exists (Phase 1 stub)
- [x] `docs/workflow-conventions.md` exists (Phase 1 output — the handoff chain and artifact path are sourced from it)
- [x] Template (`code-foundations/commands/research.md`) read

## Recommendation

BUILD — overwrite `commands/research.md` stub with the full facilitation body. No blockers.
