# Discovery + Design: Phase 7 - Descriptions, housekeeping, validation

## Files Found

- `skills/usability/SKILL.md` — description already carries a `Not for:` clause (usability vs
  visual look, content-design, journey, behavioral, data-viz).
- `skills/data-viz/SKILL.md` — description already carries a `Not for:` clause (data-viz vs core
  color, core audit, usability tables, core fonts, content-design).
- `skills/prototype/SKILL.md` — description already carries a `Not for:` clause (prototype vs core
  design, core audit, journey, design-systems). No detector-duty absorption — confirmed clean.
- `skills/clarify/SKILL.md` — description has **no** near-miss clause. This is the one gap DW-7.1
  requires closing.
- `.claude-plugin/plugin.json` — version `4.0.0` confirmed (HANDOFF prerequisite: doctrine-overhaul
  merge landed). Description is accurate for the doctrine-Read() model but predates Phases 1-6
  (no mention of dual-blind review or the dealer).
- `CLAUDE.md` — describes the v4.0.0 doctrine-Read() model accurately (four commands, two
  dispatched agents, 8 doctrine domains, 4 surviving skills) but the structure tree and prose
  predate Phases 1-6: zero mentions of `scripts/dealer.mjs`, `scripts/detect.mjs`, dual-blind
  review, or the reshaped ground→diverge→critique→converge→gate pipeline.
- `docs/workflow-conventions.md` — §3 "Heuristic pass" and §4 "Pillar dispatch conventions" both
  describe review as a single `design-review-agent` cross-pillar critique. Phase 6 restructured
  review into dual-blind (Assessment A cross-pillar critique + Assessment B `scripts/detect.mjs`);
  these 3 lines are now stale cross-references.
- `docs/pillar-taxonomy.md`, `docs/foundations-standards.md` — read in full; both already reflect
  the v4.0.0 doctrine model (written during the earlier, already-merged doctrine-overhaul). No
  cross-references to anything Phases 1-6 of *this* plan changed (dealer, detector, DNA pipeline
  reshape) — nothing to repair here.

## Current State

The doctrine-overhaul (a separate, already-merged plan) already converted the 8 auto-triggering
pillar skills into 6 `references/` doctrine domains + 2 de-triggered skills (`usability`,
`data-viz`) + 2 workflow skills (`clarify`, `prototype`) — 4 skills total, matching this phase's
scope. That overhaul already added near-miss clauses to 3 of the 4 descriptions and already wrote
`docs/pillar-taxonomy.md` + `docs/foundations-standards.md` to the current model. What Phases 1-6
of *this* plan (fable5-refresh) then changed and left unreflected in the public surface:

- Phase 1: model ladder (fable/sonnet/haiku) + calm gates in commands/agents — no public-surface
  doc references this by name, nothing to repair.
- Phase 3: `ai-tells.md` copy tells + checkable signatures + decay doctrine — already dated
  `Last reviewed: 2026-07`; `foundations-standards.md` §7 already documents the re-audit
  convention (confirmed present, not stale).
- Phase 4: `design-dna.md` pipeline reshaped to ground→diverge→critique→converge→gate; "honest
  default" framing removed. Confirmed via `grep -rn 'honest default' references/visual/` → zero
  hits. The two surviving hits (`references/behavioral/references/behavioral-principles.md:225`,
  `references/deceptive-patterns/deceptive-patterns.md:59`) are the distinct ethics term "honest
  defaults" — verified by reading both lines: both are about transparent/ethical default settings,
  unrelated to the removed DNA archetype. Neither touched.
- Phase 5: `scripts/dealer.mjs` — new file, absent from CLAUDE.md's structure tree and prose.
- Phase 6: `scripts/detect.mjs` — new file, absent from CLAUDE.md's structure tree; dual-blind
  review (Assessment A + B) — documented in `agents/design-review-agent.md` and dispatched from
  `commands/mock.md`/`build.md`, but `CLAUDE.md` and `docs/workflow-conventions.md` still describe
  review as a single cross-pillar critique pass.

## Gaps

| Gap | File | Fix |
|---|---|---|
| No near-miss clause | `skills/clarify/SKILL.md` | Add a `Not for:` clause distinguishing clarify (sharpens an existing but underspecified design request) from `/design-for-ai:research` (open-ended brief discovery from a vague idea) |
| Version behind | `.claude-plugin/plugin.json` | Bump `4.0.0` → `4.1.0` |
| Description silent on Phases 1-6 | `.claude-plugin/plugin.json` | Add dual-blind review + dealt-composition mention; drop nothing accurate (no stale claims found in the existing text, it just predates the refresh) |
| Structure tree missing new scripts | `CLAUDE.md` | Add `scripts/dealer.mjs` + `scripts/detect.mjs` rows |
| Prose silent on dual-blind + reshaped pipeline | `CLAUDE.md` | Update `Dispatched agents` table row for `design-review-agent`; add a line noting the dealer + reshaped DNA pipeline; bump the two `4.0.0` mentions in the structure-tree comment and the closing Installation paragraph |
| Stale review description | `docs/workflow-conventions.md` (lines ~81, ~108, ~123) | Update the 3 lines describing review as single cross-pillar critique to name Assessment A (cross-pillar critique) + Assessment B (`scripts/detect.mjs`) |

## Out-of-scope finding (not fixed, flagged only)

`skills/usability/SKILL.md`, `skills/data-viz/SKILL.md`, and `skills/prototype/SKILL.md` all point
their near-miss clauses at "core design", "core audit", "core color mode", "core fonts mode" — a
skill that no longer exists post-doctrine-overhaul (confirmed: `find` shows only 4 skill
directories; `pillar-taxonomy.md` §5 itself calls this "the deleted core mode" and resolves its
former modes to doctrine names like `design-dna`, `color`, `checklists`). This staleness predates
Phases 1-6 of *this* plan (it was already present in the merged v4.0.0 baseline I started from) —
it is not something Phases 1-6 changed, so per the phase's file-scope discipline ("repair any
docs/* cross-references that name changed things" — this is a skills/ description, and the thing
it names was never touched by this plan) I am leaving it untouched and flagging it for a future
phase/plan rather than absorbing it as unplanned scope.

## Code Standards

No `docs/code-standards.md` in this repo (design plugin, not a codebase with a language stack).
The applicable conventions are `docs/foundations-standards.md` (frontmatter shape, ≤1024-char
description rule, near-miss clause formula) and `docs/pillar-taxonomy.md` (name→path resolver,
disjoint trigger scopes).

## Test Infrastructure

Validation is tool-driven, not a test framework: `mcp__plugin_oberskills_skill-eval__validate_skill`
(spec lint + house WARN rules) run per skill directory. No unit-test runner applies to markdown/JSON
housekeeping.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-7.1 | `validate_skill` returns 0 errors for each of the 4 skills (usability, data-viz, prototype, clarify); each description carries a not-for/near-miss clause. Run validate_skill on each and capture the result. | COVERED | Add near-miss clause to `clarify`; run `validate_skill` on `skills/usability`, `skills/data-viz`, `skills/prototype`, `skills/clarify`; capture each result (errors=0) and confirm each description string contains a `Not for:`/near-miss substring |
| DW-7.2 | plugin.json = 4.1.0; description mentions dual-blind review and the dealt-composition pipeline; no stale claims. (Show the version line + description.) | COVERED | Edit `.claude-plugin/plugin.json`: `version` → `"4.1.0"`, description rewritten to mention dual-blind review + dealt composition; `cat`/`python3 -m json.tool` to show version + description post-edit, confirm valid JSON |
| DW-7.3 | CLAUDE.md structure tree includes `scripts/dealer.mjs` and `scripts/detect.mjs`; the removed DNA "honest default" candidate framing leaves no residue — `grep -rn 'honest default' references/visual/` returns nothing; the two ethics hits stay untouched. | COVERED | Edit CLAUDE.md structure tree + prose; `grep -n 'dealer.mjs\|detect.mjs' CLAUDE.md` to confirm presence; `grep -rn 'honest default' references/visual/` (expect empty) + `grep -rn 'honest default' references/behavioral references/deceptive-patterns` (expect the 2 unchanged ethics hits) |

**All items COVERED:** YES

## Design Decisions

- **clarify's near-miss target is the `research` command, not a sibling skill.** clarify sharpens
  an already-existing but underspecified design request (mirrors code-foundations' `clarify` skill
  exactly — same near-miss shape, be0926a). `/design-for-ai:research` is the open-ended
  brief-discovery-from-a-vague-idea entry point. This is the one genuine confusion risk (both do
  "ask questions about design intent"); pointing at it (rather than, say, `journey`'s JTBD
  discovery, which is a different concern — structured job-story mapping, not gap-classification)
  keeps the clause a true near-miss instead of a padding exercise.
- **plugin.json description edit is additive, not a rewrite.** The existing description accurately
  states the doctrine-Read() model (still true post-refresh) — only append what Phases 1-6 added:
  dual-blind review (Assessment A + `scripts/detect.mjs`) and the dealt-composition DNA pipeline
  (ground→diverge→critique→converge→gate, `scripts/dealer.mjs`). No sentence is removed for being
  wrong; only extended for being incomplete.
- **CLAUDE.md gets a new `scripts/` row-pair, not a rewrite of the whole doc.** The doc's shape
  (Repository Purpose → Workflow → Dispatched agents → Doctrine domains → Skills → Conventions →
  Structure → Installation) stays; edits are targeted at the exact places that named the pre-Phase-6
  reality (structure tree's `scripts/` block, the `design-review-agent` row in "Dispatched agents",
  the version numbers in the structure-tree comment and the closing Installation paragraph).
- **docs/workflow-conventions.md edits are line-scoped.** Only the 3 lines that describe review as
  a single cross-pillar pass are touched (§3 heuristic-pass prose, §4 dispatch-order step 4, §4
  pillar-assignment table's Review row) — matching the exact terminology
  `agents/design-review-agent.md` already uses (Assessment A / Assessment B) so the cross-reference
  is precise, not just "updated."

## Prerequisites

- [x] Required files exist (`skills/*/SKILL.md`, `.claude-plugin/plugin.json`, `CLAUDE.md`,
  `docs/*.md`)
- [x] HANDOFF prerequisite confirmed: `plugin.json` reads `4.0.0` (doctrine-overhaul merge landed)
- [x] `mcp__plugin_oberskills_skill-eval__validate_skill` tool available (skill-craft MCP server)
- [x] Phases 1-6 all committed (confirmed via `git log`: 303b5a0, 2e2a7d3, c72f27d, a77ccce,
  94e1c67, c8356eb)

## Recommendation

BUILD. All 3 DW items are coverable with the edits above; no CANNOT_MEET items; no scope
absorption needed beyond the flagged-but-untouched "core design/audit" out-of-scope finding.
