# Discovery + Design: Phase 1 — Workflow scaffold + clarify port + manifest

## Files Found

- `/Users/r/repos/design-for-ai/.claude-plugin/plugin.json` — current manifest at 3.0.0
- `/Users/r/repos/design-for-ai/docs/foundations-standards.md` — frontmatter shape, ≤1024-char desc rule, canonical reference shape, cite-down dependency direction, eval gate
- `/Users/r/repos/design-for-ai/docs/skill-authoring-template.md` — frontmatter block, SKILL.md body skeleton, reference-file stub
- `/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md` — pillar SRP scopes, near-miss exclusions, citation graph
- `/Users/r/repos/design-for-ai/skills/prototype/SKILL.md` — canonical skill shape reference (most recently authored pillar, with argument-hint)
- `/Users/r/repos/code-foundations/skills/clarify/SKILL.md` — source to port
- `/Users/r/repos/code-foundations/references/adaptive-questioning.md` — shared reference to port alongside clarify
- `/Users/r/repos/code-foundations/commands/research.md` — command frontmatter pattern (description only, no `name:`)
- `/Users/r/repos/code-foundations/commands/build.md` — command frontmatter + structure pattern

## Current State

- `commands/` does NOT exist — must create
- `skills/clarify/` does NOT exist — must create
- `docs/workflow-conventions.md` does NOT exist — must create
- `plugin.json` is at 3.0.0 — must bump to 3.1.0
- Core `skills/design-for-ai/SKILL.md` has NO uncommitted changes (git diff is clean on it)
- The fold-source at `.code-foundations/fold-source/` contains audit conductor material for Phase 4 — out of scope for Phase 1

## Gaps

- Commands in code-foundations use frontmatter with only `description:` (no `name:`). The plan mentions `argument-hint` in frontmatter; the code-foundations commands do NOT have argument-hint. For consistency with this repo's conventions (prototype/other skills carry argument-hint), I will add argument-hint to the command stubs per the plan's "wired with frontmatter + argument-hint" language.
- code-foundations' `clarify` has `user-invocable: false` — the plan doesn't specify a value. Since this is a design tool that is dispatched by the workflow commands (not triggered by description), `user-invocable: false` is the correct choice (mirrors code-foundations exactly). The plan says "internal clarify skill" which confirms this.
- The `clarify` reference path must change from `${CLAUDE_PLUGIN_ROOT}/references/adaptive-questioning.md` (code-foundations style) to `${CLAUDE_SKILL_DIR}/references/adaptive-questioning.md` (this repo's per-skill convention, as stated in the phase scope).

## Code Standards

From `foundations-standards.md`:
- `name` == directory name; ≤64 chars; lowercase alphanumeric + single hyphens
- `description` 1–1024 chars; third person; no XML tags; capability nouns not process steps; "Not for:" near-miss clause required for pillar skills
- Reference files: `## Table of Contents` first if >100 lines; banned constructs excluded
- SKILL.md body < 500 lines; ~200 lines always-relevant core; depth in references

## Test Infrastructure

For this plugin (markdown skills, no test framework):
- `validate_skill` MCP tool on `skills/clarify` — must return 0 errors
- Observed behavior checks on structural items (frontmatter validity, file existence, section presence, char counts)
- Commands: verified by reading them and confirming frontmatter is parseable YAML and sections are present

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-1.1 | `skills/clarify/` exists (ported + design-grounded), validates clean; description ≤1024 | COVERED | `validate_skill` run on `skills/clarify`; description char count measured; design-grounded examples present in body |
| DW-1.2 | `commands/` exists with frontmatter-valid stubs for research, plan, mock, build | COVERED | Desk-check: each command file exists, YAML frontmatter parses, description and argument-hint present, stub body names goal + next stage |
| DW-1.3 | `docs/workflow-conventions.md` documents research→plan→mock→build lifecycle, DESIGN.md/JOURNEY.md artifact gates, and design done-when vocabulary (contrast/token/heuristic) | COVERED | Desk-check: file exists, lifecycle section present, artifact gate table present, done-when vocabulary section present |
| DW-1.4 | `plugin.json` at 3.1.0 with workflow-describing description; install path unchanged | COVERED | Desk-check: version field reads 3.1.0, description mentions research/plan/mock/build workflow, name/author/license unchanged |

**All items COVERED:** YES

## Design Decisions

### Command frontmatter pattern
Commands in this plugin follow the code-foundations pattern: YAML frontmatter with `description` (and `argument-hint` per this repo's skill convention), no `name` key. The body is a stub that states the command's goal and names the next stage in the chain. Full bodies come in Phases 2–5.

### Clarify: user-invocable: false
The clarify skill is an internal workflow component — dispatched by the research/plan commands, not auto-triggered from descriptions. `user-invocable: false` mirrors code-foundations' clarify exactly and prevents it from appearing in user-invocable listings. The description is still present so the workflow commands can invoke it by name.

### Clarify: design fault re-grounding
The three fault types that translate directly from code to design:
- Intention faults → "make it modern", "improve the vibe", "make it pop" (vague objectives in design language)
- Premise faults → "match our brand" with no brand supplied; "update the existing DESIGN.md" when none exists
- Parameter faults → "design a landing page" (mobile or desktop? brand or product register? tone?)
- Expression faults → "clean up the UI" (refactor layout? simplify color? reduce density?); "make it more accessible" (WCAG AA? motion? color contrast only?)

The "coding tasks specifically" section is replaced with a "design tasks specifically" section using the same three-way structure.

### Adaptive-questioning.md: path update only
The reference content is identical to code-foundations' version — it covers the exploratory/confirmatory switching and is fully applicable to design conversations. Only the path reference is updated from `${CLAUDE_PLUGIN_ROOT}` to `${CLAUDE_SKILL_DIR}`.

### workflow-conventions.md: single shared contract
This doc is the Phase 1 deliverable all later phases cite. It defines: the four lifecycle stages and their outputs, the two artifact gates (DESIGN.md locked before tokens/mocks; JOURNEY.md before page specs), and the design done-when vocabulary (the measurable signals that gate each stage). Kept concise — it's a contract doc, not a tutorial.

### plugin.json: 3.1.0 / workflow description
3.1.0 (not 4.0.0): additive workflow on the 3.x system. Description updated to mention the four-command workflow. Keywords, author, license, name unchanged. No install-path implications (plugin is auto-discovered by skills/ directory, not a `skills` array in the manifest).

## Prerequisites

- [x] All source files read and understood
- [x] Destination directories identified
- [x] No conflicts with existing files
- [x] `validate_skill` tool available via MCP

## Recommendation

BUILD — all prerequisites met, design decisions clear, no blockers.
