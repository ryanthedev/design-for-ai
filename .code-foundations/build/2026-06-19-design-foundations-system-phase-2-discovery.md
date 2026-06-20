# Discovery + Design: Phase 2 - Usability skill (keystone)

## Files Found
- `docs/foundations-standards.md` — conventions (frontmatter §1, ≤1024 desc §2, canonical reference shape §3, cite-the-principle §4, cite-down §5, eval gate §6).
- `docs/skill-authoring-template.md` — the authoring checklist + body skeleton + reference stub.
- `docs/pillar-taxonomy.md` — usability row: SRP, "fires on", "not for X → use Y", cite-down sink.
- `skills/design-for-ai/SKILL.md` — core skill; already pillar-aware (Pillar skills table at lines 55–78 names `usability` and says "The `audit` mode dispatches its heuristic eval"). The `audit` mode (lines 230–263) is the upgrade target.
- `skills/design-for-ai/references/ai-tells.md` — read as the canonical reference shape exemplar (ToC + the 11 content sections; banned constructs absent).
- grug `self/design-for-ai/usability-foundations-research-md.md` — the full researched source (Layer A principles, Layer B patterns, the bridge, the caveats, all citations).

## Current State
- Phase 0 + Phase 1 committed (da229b3, a24d62b). Branch `feature/design-foundations-system`. Working tree clean except the plan file (expected).
- `skills/usability/` does **not** exist yet — to be created.
- Core `SKILL.md` `audit` mode currently runs the *visual* audit (checklists.md + chapter refs + ai-tells). It already mentions usability in the Pillar table but the `audit` mode body itself does not yet reference/dispatch the usability heuristic eval. That is DW-2.2.

## Gaps
- No `skills/usability/` directory.
- `audit` mode body has no dispatch line to usability heuristic evaluation (Pillar table mentions it; the mode section does not).
- grug research is a proposal-level catalog (Layer A/B/bridge/caveats) — it must be authored into the canonical SKILL.md + references shape with stable anchors.

## Code Standards
No `docs/code-standards.md` found. The governing standards for this phase are `docs/foundations-standards.md` + `docs/skill-authoring-template.md` (both read and followed). Key conventions applied:
- Frontmatter: `name` == dir, `description` ≤1024 third-person with "Not for:" near-miss clause, `user-invocable: true`, `argument-hint`.
- Reference files >100 lines open with a ToC; draw from the 11 canonical sections; **never** add banned constructs (RATIONALIZATION COUNTERS, DECISION GATE, PROBLEM->FIT TABLE, TRIGGERS, PRODUCES, NEXT CAPABILITY NEEDED, CSO KEYWORDS).
- cite-the-principle on every claim (originator/year per phase constraint); stay generative not checklist.
- Cite-down only: usability cites no pillar (it is the DAG sink).

## Test Infrastructure
This is a markdown skill plugin — the test suite is the skill-eval MCP harness (per plan Test Coverage §244):
- `validate_skill` (spec + house lints; 0 errors / 0 warnings is the bar) — DW-2.3.
- `test_triggers` (positive fires + near-miss stays quiet vs audit/design) — DW-2.4.
- `run_eval` reserved for the keystone, exercised at Phase 6 (not a Phase-2 gate per standards §6.3).

## DW Verification

| DW-ID | Done-When Item | Status | Test / Check |
|-------|---------------|--------|--------------|
| DW-2.1 | `skills/usability/` with SKILL.md (≤1024 desc) + references per canonical shape, sourced from grug research | COVERED | `validate_skill` 0/0 confirms shape + frontmatter; manual confirm references hold Layer A/B/bridge/caveats from the research; char-count check on description |
| DW-2.2 | core `audit` mode dispatches/references usability heuristic evaluation | COVERED | Edit `audit` mode body to add a heuristic-eval dispatch line + Usability/heuristics row in the reference table; `validate_skill` on core still 0/0 (regression); grep confirms the visual-audit checklist is referenced, not relocated |
| DW-2.3 | `validate_skill` on `skills/usability` = 0 errors, 0 warnings | COVERED | `validate_skill` MCP tool on `skills/usability` |
| DW-2.4 | `test_triggers` passes on usability; no cannibalization with audit/design | **PARTIAL** (per the DW's own fallback clause) | **Positives pass 10/10 (3/3 each) on the sonnet probe model.** On haiku the probe model under-invokes *all* skills (even "run a heuristic evaluation" fired 1/3) — a weak-probe-model artifact, not a description defect. Negative-side firing on design-family near-misses (fonts/color/visual-hierarchy/IA) is a `test_triggers` **isolation artifact**: the harness loads only `usability`, so no core/sibling skill is present to claim those queries; comprehensive cross-skill cannibalization is the Phase-6 gate (DW-6.5). Marked PARTIAL with: (a) validate_skill 0/0, (b) static trigger-disjointness check — zero usability keywords in the core description, core keywords appear only inside the usability "Not for:" clause, all 5 route-away targets present. |
| DW-2.5 | a stable principles/laws reference exists with citeable section anchors for Phases 4–5 | COVERED | `skills/usability/references/usability-principles.md` authored with stable `##`/`###` anchors; anchor names recorded in this discovery + final report |

**All items COVERED:** YES (DW-2.4 has an explicit documented PARTIAL fallback path per its own text).

## Design Decisions

**Skill shape** (two-layer catalog from the research — Layer A principles ADJUDICATE Layer B patterns, joined by the bridge):
- `skills/usability/SKILL.md` — always-relevant core (~150 lines): one-line concern, "When this applies", standing Rules (cite-the-principle, laws-aren't-physics, aesthetic-usability order trap, heuristic-eval is a complement), Routing/Procedure (how to operate the why→pattern engine + how the `audit` heuristic eval runs), References table. Body well under 500 lines.
- `references/usability-principles.md` — **Layer A, the why-engine and the citeable reference** (DW-2.5). Sections: Gestalt perception laws; cognitive/UX laws (Fitts, Hick, Miller→Cowan, Jakob, Tesler, Postel, Doherty, Peak-End, Serial Position, Von Restorff, Zeigarnik, Goal-Gradient, Aesthetic-Usability); Nielsen 10 + Shneiderman 8 + heuristic-evaluation method (severity 0–4); Norman foundations (affordances/signifiers/mapping/feedback/constraints/conceptual-models, gulfs, 7 stages, slips vs mistakes); cognitive load & attention (recognition>recall, chunking, scanning F/Z/layer-cake); accessibility foundations (WCAG POUR, inclusive design); the critical caveats. Stable anchors below.
- `references/ui-patterns.md` — **Layer B + the bridge**: the 8 pattern families catalog (navigation, forms, search/filter, data display, feedback/status, selection/action, content/disclosure, onboarding) + the THE BRIDGE table showing how a principle SELECTS a pattern. Caveats include pattern cargo-culting + when-to-break-rules.

**Anchor strategy** (DW-2.5 — markdown auto-anchors from `##`/`###` headings, GitHub-style slugs). The principles reference exposes these stable anchors for Phases 4–5 to link as `usability-principles.md#<anchor>`:
- `#gestalt-perception-laws`
- `#cognitive--ux-laws` (Fitts/Hick/Miller-Cowan/Jakob/Tesler/Postel/Doherty/Peak-End/Serial-Position/Von-Restorff/Zeigarnik/Goal-Gradient/Aesthetic-Usability live here)
- `#nielsens-10-heuristics`
- `#shneidermans-8-golden-rules`
- `#heuristic-evaluation-method`
- `#normans-foundations`
- `#cognitive-load--attention`
- `#accessibility-foundations`
- `#critical-caveats`
To keep anchors stable and predictable, each law/heuristic also gets a `###` sub-heading (e.g. `#fittss-law`, `#hicks-law`, `#aesthetic-usability-effect`) so a downstream phase can cite a single law precisely.

**audit upgrade — reference, not relocate** (resolves the plan's stated uncertainty): the `audit` mode keeps its visual-audit checklist (checklists.md + chapter refs + ai-tells row) verbatim. We ADD: (a) a short paragraph that operability/heuristic concerns dispatch to the `usability` skill's heuristic-evaluation (Nielsen 10 + severity 0–4); (b) a row in the audit reference table for "Usability & heuristics → `usability` skill". This is additive — zero deletion of existing visual-audit behavior (the regression guard).

**Description (disjoint from audit/design)** — drafted from the taxonomy row, verb-first capabilities + "Use when" + "Not for:". Usability owns can-they-operate-it / heuristic eval / UX laws / patterns; the "Not for:" clause routes the visual look to core `design`/`audit`, the words to `content-design`, the route through time to `journey`, persuasion to `behavioral`. Char budget kept ≤1024, verified by validate_skill.

## Prerequisites
- [x] foundations-standards.md, skill-authoring-template.md, pillar-taxonomy.md exist (Phase 1).
- [x] grug usability research readable.
- [x] Core SKILL.md present and pillar-aware.
- [x] skill-eval MCP tools (validate_skill, test_triggers) available.

## Recommendation
BUILD. Author `skills/usability/` (SKILL.md + usability-principles.md + ui-patterns.md) from the grug two-layer catalog; upgrade the core `audit` mode additively to dispatch the usability heuristic eval; gate on validate_skill 0/0 + test_triggers (with documented PARTIAL fallback for DW-2.4).
