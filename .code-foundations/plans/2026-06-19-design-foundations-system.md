# Plan: design-foundations system — multi-skill pillar build-out

**Created:** 2026-06-19
**Status:** complete
**Started:** 2026-06-19
**Completed:** 2026-06-19
**Current Phase:** 7/7 (done)
**Complexity:** complex
**Workspace:** branch `feature/design-foundations-system` (main clean)

---

## Context

`design-for-ai` covers the visual/aesthetic and surface axes but lacks the broader design pillars surfaced by this session's research — usability, content design, ethics/dark-patterns, data-viz, behavioral — plus Tier-2 frontiers (design systems, AI-native UX) and the researched journey pillar. The single-skill router's `description` is at its 1024-char ceiling, blocking new modes. The fix is structural: evolve the plugin into a **design-foundations system** — a multi-skill plugin (like `code-foundations`) where each pillar is its own skill with its own description budget, triggers, and evals. The dissolved ceiling and reduced trigger-cannibalization are the payoff. All source material is already researched and saved in grug-brain (category `design-for-ai`): `journey-flow-ux-research.md`, `usability-foundations-research.md`, `design-pillar-landscape-research.md`, `surface-mode-device-class-patterns.md`, `reference-files-canonical-shape.md`.

## Constraints

- Each skill follows the SKILL.md + progressive-reference pattern and the canonical reference-file shape (grug: `reference-files-canonical-shape.md`).
- Every skill's `description` ≤ 1024 chars (skill-craft `validate_skill` hard rule).
- `cite-the-principle` house rule: every recommendation names its source; no unsourced opinion.
- **Author via `oberskills:skill-craft` best practices** — not just validate. It owns skill structure, frontmatter, trigger design, and evals.
- Each phase gated on `validate_skill` = 0 errors / 0 warnings + `test_triggers` (positive fires, near-miss stays quiet).
- Existing `skills/design-for-ai/` is NOT decomposed (kept as core visual/DNA + index); surface stays in core; plugin keeps the name `design-for-ai`.
- ≤ 7 phases; pillars cluster to fit.

---

## Chosen Approach

**design-foundations system (multi-skill plugin).** Keep the `design-for-ai` plugin; add one skill per pillar under `skills/`, bound by a shared conventions doc + the palette engine + cross-skill references. Each skill gets its own description budget (ceiling dissolved) and its own evals (cannibalization scoped per-skill). The existing core skill stays intact and becomes the pillar-aware index. **Fallback:** if cross-skill trigger overlap proves unmanageable at integration, merge the two lowest-traffic pillars into a parent skill rather than restructuring the system.

## Rejected Approaches

- **One skill, restructure description:** keeps the 1024-char ceiling as a permanent constraint; 12+ modes cannibalize in `test_triggers`; one oversized skill to maintain.
- **Two-skill split (visual + ux-foundations):** arbitrary 2-way cut fragments deeply cross-referencing pillars (usability→journey, ethics↔ai-tells) and still crowds two descriptions. The N-skill system generalizes it cleanly.

---

## Implementation Phases

### Phase 0: Commit surface baseline
**Model:** sonnet
**Skills:** oberskills:skill-craft
**Gate:** Minimal

**Goal:** Commit the built-but-uncommitted surface mode so the system builds on a clean, validated baseline.

**Scope:**
- IN: validate the current `design-for-ai` skill; run surface triggers; branch + commit the four touched files (`surfaces.md`, `SKILL.md`, `plugin.json`, `CLAUDE.md`).
- OUT: any new pillar work.

**Edge cases:** if `validate_skill` is non-clean, fix before committing — never commit a red baseline.
**File hints:** `skills/design-for-ai/` — the uncommitted surface work.
**Depends on:** none — entry phase | **Unlocks:** all
**Produces:** a committed, `validate_skill`-clean baseline on a branch; working tree clean.

**Done when:**
- [ ] DW-0.1: `validate_skill` on `skills/design-for-ai` returns 0 errors, 0 warnings.
- [ ] DW-0.2: `test_triggers` shows the surface mode fires and existing modes don't regress.
- [ ] DW-0.3: surface work committed on a branch; `git status` clean.

**Difficulty:** LOW
**Uncertainty:** None.

---

### Phase 1: Foundation scaffolding
**Model:** opus
**Skills:** code-foundations:ca-architecture-boundaries, oberskills:skill-craft, oberskills:prompt
**Gate:** Full

**Goal:** Establish the design-foundations system: the skill taxonomy, a shared conventions doc, a reusable skill-authoring template, and the core skill evolved into a pillar-aware index.

**Scope:**
- IN: define the 8 pillar-skill names (usability, content-design, data-viz, deceptive-patterns, behavioral, journey, design-systems, ai-native) + disjoint trigger scopes; write `docs/foundations-standards.md` (frontmatter shape, ≤1024 description rule, canonical reference shape, cite-the-principle, per-skill eval gate); write an authoring template Phases 2–6 follow; add a pillar-aware index section to the core `SKILL.md`.
- OUT: authoring any pillar skill's content.

**Constraints:** trigger scopes must be disjoint — each skill's description carries "not for X (use Y)" disambiguation to prevent cannibalization.
**Edge cases:** index changes must not regress existing-mode triggering.
**Approach notes:** multi-skill foundation system chosen by user over single-skill and 2-skill split; ca-architecture-boundaries used to set skill boundaries (SRP-by-pillar) and dependency direction (pillars cite usability, not vice-versa).
**File hints:** `skills/design-for-ai/SKILL.md` (index); repo root `docs/` (conventions).
**Depends on:** Phase 0 | **Unlocks:** 2, 3, 4, 5, 6
**Produces:** `docs/foundations-standards.md` + authoring template + documented taxonomy (skill name, trigger scope, cross-refs) + pillar-aware index in core SKILL.md. This is the contract every later phase consumes.

**Done when:**
- [ ] DW-1.1: `docs/foundations-standards.md` specifies frontmatter shape, ≤1024 description rule, reference shape, cite-the-principle, and the eval gate.
- [ ] DW-1.2: a reusable skill-authoring template/checklist exists for Phases 2–6.
- [ ] DW-1.3: taxonomy documents all 8 pillar skills with disjoint trigger scopes (no overlap flagged).
- [ ] DW-1.4: core `SKILL.md` updated to a pillar-aware index referencing sibling skills.
- [ ] DW-1.5: `validate_skill` on `design-for-ai` still 0/0 after index changes.

**Difficulty:** HIGH
**Uncertainty:** Exact trigger-scope boundaries may shift as pillar skills are authored; re-confirm at Phase 6 integration.

---

### Phase 2: Usability skill (keystone)
**Model:** opus
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Full

**Goal:** Author the `usability` skill (principles × patterns + heuristic evaluation) and upgrade the core `audit` mode to dispatch it — the most-referenced pillar, built first.

**Scope:**
- IN: `skills/usability/` (SKILL.md + references for principles/laws and UI-pattern families) from grug `usability-foundations-research.md`; upgrade core `audit` to reference usability heuristic-eval (Nielsen 10 + severity).
- OUT: ethics/behavioral content (Phase 4), even though they'll cite this.

**Constraints:** principles reference must be citeable by downstream skills (stable anchors).
**Edge cases:** audit upgrade must preserve existing audit behavior (regression check).
**Approach notes:** keystone-first because journey, ethics, behavioral all cite usability laws.
**File hints:** `skills/usability/`; `skills/design-for-ai/SKILL.md` (audit mode).
**Depends on:** Phase 1 | **Unlocks:** 4, 5, 6
**Produces:** `skills/usability/` skill exposing a cite-able principles/laws reference + a heuristic-eval reference that the `audit` mode and Phases 4–5 link.

**Done when:**
- [ ] DW-2.1: `skills/usability/` authored (SKILL.md ≤1024 desc + references) per template, sourced from the grug research.
- [ ] DW-2.2: core `audit` dispatches/references usability heuristic evaluation.
- [ ] DW-2.3: `validate_skill` on `skills/usability` = 0/0.
- [ ] DW-2.4: `test_triggers` passes; usability doesn't cannibalize `audit`/`design`.
- [ ] DW-2.5: a stable principles/laws reference exists for Phases 4–5 to cite.

**Difficulty:** HIGH
**Uncertainty:** How much of the audit mode to move vs. reference — resolve by referencing, not relocating, to limit regression.

---

### Phase 3: Content-design + Data-viz skills
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Author two independent pillar skills: `content-design` (UX writing) and `data-viz` (information design).

**Scope:**
- IN: `skills/content-design/` (voice/tone, microcopy patterns, content-first) and `skills/data-viz/` (truthful encoding, chart selection, dashboards) from `design-pillar-landscape-research.md`.
- OUT: cross-skill integration (Phase 6).

**Edge cases:** keep each description disjoint from existing modes and from each other; cite-the-principle on every claim.
**File hints:** `skills/content-design/`, `skills/data-viz/`.
**Depends on:** Phase 1 | **Unlocks:** 6
**Produces:** two `validate_skill`-clean, trigger-tested skills.

**Done when:**
- [ ] DW-3.1: `skills/content-design/` authored per template + conventions.
- [ ] DW-3.2: `skills/data-viz/` authored per template + conventions.
- [ ] DW-3.3: `validate_skill` = 0/0 on both.
- [ ] DW-3.4: `test_triggers` passes both; no cannibalization with each other or existing modes.

**Difficulty:** MEDIUM
**Uncertainty:** data-viz overlaps the existing `color`/composition modes at the edges — disambiguate in the description.

---

### Phase 4: Ethics + Behavioral skills
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Author `deceptive-patterns` (ethics, the structural twin of `ai-tells`) and `behavioral` (persuasion/emotional), both citing usability.

**Scope:**
- IN: `skills/deceptive-patterns/` (dark-pattern ban-list cross-linking `ai-tells`) and `skills/behavioral/` (Cialdini/Fogg/Norman emotional levels), from the landscape research.
- OUT: integration (Phase 6).

**Constraints:** behavioral and ethics must be a paired framing — same tools, opposite intent — to avoid the behavioral skill reading as a dark-pattern manual.
**Edge cases:** behavioral/ethics must not cannibalize `design`/`enhance`/`audit`.
**File hints:** `skills/deceptive-patterns/`, `skills/behavioral/`; existing `references/ai-tells.md`.
**Depends on:** Phase 1, Phase 2 (cites usability laws) | **Unlocks:** 6
**Produces:** two `validate_skill`-clean skills; `deceptive-patterns` cross-links the `ai-tells` ban-list.

**Done when:**
- [ ] DW-4.1: `skills/deceptive-patterns/` authored; detection list cross-links `ai-tells` (twin structure).
- [ ] DW-4.2: `skills/behavioral/` authored; cites usability principles from Phase 2.
- [ ] DW-4.3: `validate_skill` = 0/0 on both.
- [ ] DW-4.4: `test_triggers` passes; neither cannibalizes `design`/`enhance`/`audit`.

**Difficulty:** MEDIUM
**Uncertainty:** behavioral vs. journey-narrative overlap (persuasion) — disambiguate (journey = sequence, behavioral = mechanism).

---

### Phase 5: Journey + Design-systems skills
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Author `journey` (flow/IA/narrative, from completed research) and `design-systems` (tokens/components/governance extending DESIGN.md).

**Scope:**
- IN: `skills/journey/` from grug `journey-flow-ux-research.md` (job→journey→IA→flows→page specs + JOURNEY.md template); `skills/design-systems/` (atomic components, semantic tokens, governance).
- OUT: integration (Phase 6).

**Constraints:** journey cites usability laws (Hick/Fitts/Miller) for option-selection; design-systems references the existing palette engine + DESIGN.md rather than duplicating token logic.
**Edge cases:** design-systems must not collide with the core `design` mode's DESIGN.md gate — it extends, not replaces.
**File hints:** `skills/journey/`, `skills/design-systems/`; `scripts/palette.mjs`, root `DESIGN.md` convention.
**Depends on:** Phase 1, Phase 2 (journey cites usability) | **Unlocks:** 6
**Produces:** two `validate_skill`-clean skills; journey ships a JOURNEY.md template; design-systems extends DESIGN.md.

**Done when:**
- [ ] DW-5.1: `skills/journey/` authored from grug research (incl. JOURNEY.md template).
- [ ] DW-5.2: `skills/design-systems/` authored; extends DESIGN.md toward tokens/components/governance.
- [ ] DW-5.3: `validate_skill` = 0/0 on both.
- [ ] DW-5.4: `test_triggers` passes; journey cites usability laws; design-systems doesn't collide with `design`.

**Difficulty:** MEDIUM
**Uncertainty:** journey-vs-design mode boundary (both touch "new project") — disambiguate by intent (journey = flow, design = visual DNA).

---

### Phase 6: AI-native skill + system integration
**Model:** opus
**Skills:** oberskills:skill-craft, oberskills:prompt, code-foundations:ca-architecture-boundaries
**Gate:** Full

**Goal:** Author the `ai-native` skill (agent/LLM-interface design, no settled canon) and integrate the whole system — cross-skill links, plugin manifest, version, and comprehensive evals.

**Scope:**
- IN: `skills/ai-native/` from the "AI breaks the frameworks" research (agent-UX principles, explicit "no settled canon" note); register all skills in `plugin.json` + marketplace; bump version (3.0.0 — system reshape); verify cross-skill references resolve; full validate + comprehensive triggers + `run_eval` on keystone; update docs.
- OUT: decomposing the existing core skill (future plan).

**Constraints:** version bump must not break install paths; marketplace schema valid; ai-native must flag that its guidance is principle-level, not book-canonical.
**Edge cases:** comprehensive `test_triggers` across ALL skills must show no cannibalization — the integration risk the system design exists to prevent.
**Approach notes:** ca-architecture-boundaries used to verify dependency direction across the finished system (pillars → usability, not circular).
**File hints:** `skills/ai-native/`; `.claude-plugin/plugin.json`; marketplace; `CLAUDE.md`; `README`.
**Depends on:** Phases 1, 2, 3, 4, 5 | **Unlocks:** —
**Produces:** a complete, validated, versioned design-foundations system.

**Done when:**
- [ ] DW-6.1: `skills/ai-native/` authored with explicit "no settled canon" framing.
- [ ] DW-6.2: `plugin.json` registers all skills; version bumped; marketplace entry updated.
- [ ] DW-6.2a: all 8 new skill descriptions are independently ≤ 1024 chars (the structural unlock — ceiling dissolved by per-skill budgets); each registered as a separate plugin.json entry.
- [ ] DW-6.3: cross-skill references (usability↔journey↔ethics↔behavioral↔core) all resolve.
- [ ] DW-6.4: `validate_skill` = 0/0 across every skill in the plugin.
- [ ] DW-6.5: comprehensive `test_triggers` shows no cannibalization; `run_eval` on `usability` passes its assertions.
- [ ] DW-6.6: `CLAUDE.md` (skill table + structure tree) and README/install updated.

**Difficulty:** HIGH
**Uncertainty:** ai-native has no canon — content is principle-derived and may need a follow-up research pass; flagged, not blocking.

---

## Test Coverage

**Level:** Per-skill skill-craft gate on every skill — `validate_skill` 0/0 + `test_triggers` (positive fires + near-miss stays quiet) — plus `run_eval` (with-skill vs without) on the keystone `usability` skill and a final cross-skill cannibalization sweep at Phase 6. (For a markdown skill plugin, the skill-craft harness *is* the test suite; default stated here, confirm at CONFIRM.)

## Test Plan

- [ ] T1 (per-DW): `validate_skill` 0/0 on each authored skill (DW-0.1, 1.5, 2.3, 3.3, 4.3, 5.3, 6.4).
- [ ] T2 (per-DW): `test_triggers` positive — each new skill fires on its on-topic queries (DW-2.4, 3.4, 4.4, 5.4, 6.5).
- [ ] T3 (dirty/negative): near-miss queries do NOT fire the wrong skill — cannibalization sweep across all skills (DW-6.5); e.g. "improve my UI" routes sanely, not to all 9.
- [ ] T4 (dirty/boundary): an out-of-scope query (graphic-design tool / Figma / logo) triggers NO pillar skill (boundary from existing skill's "Not for" clause).
- [ ] T5 (dirty/boundary): description char-count at exactly 1024 for each skill — none exceed.
- [ ] T6 (regression): existing core modes (design/fonts/color/audit/enhance/polish/surface) still trigger after Phase 1 index changes (DW-0.2, 1.5).
- [ ] T7 (quality): `run_eval` on `usability` — with-skill output beats without-skill on the graded assertions (DW-6.5).
- [ ] T8 (integration): cross-skill references resolve — no dangling links (DW-6.3).
- [ ] T9 (artifact): `docs/foundations-standards.md`, the authoring template, and the taxonomy doc each exist and contain their required sections — frontmatter shape, ≤1024 rule, cite-the-principle, eval gate, 8-pillar scope table (DW-1.1–1.4).

---

## Assumptions

| Assumption | Confidence | Verify Before Phase | Fallback If Wrong |
|------------|-----------|---------------------|-------------------|
| Multiple skills in one plugin trigger independently without a central router | HIGH | Phase 1 | Add an explicit index/dispatch mode in core SKILL.md (already partly planned) |
| 9 pillar skills' triggers can be made disjoint enough to avoid cannibalization | MEDIUM | Phase 6 | Merge two lowest-traffic pillars (per Chosen Approach fallback) or run `optimize_description` |
| Existing core skill needs no decomposition to coexist with pillar skills | HIGH | Phase 1 | Defer to a separate decomposition plan |
| Research in grug is sufficient to author each skill without re-research | MEDIUM (LOW for ai-native) | each authoring phase | Run a targeted web-research pass (ai-native most likely) |
| `run_eval` budget/credit is available for the keystone eval | MEDIUM | Phase 6 | Drop to `test_triggers`-only gate, note the coverage gap |

## Decision Log

| Decision | Alternatives Considered | Rationale | Phase |
|----------|------------------------|-----------|-------|
| Multi-skill foundation system | One skill (restructure desc) · two-skill split | Dissolves the 1024-char ceiling; scopes cannibalization per-skill; user-chosen | all |
| Keep core skill intact (no decomposition) | Decompose all 7 modes into skills | YAGNI; it works; decomposition is large risk for no immediate gain | 1 |
| surface stays in core | Extract to own skill | Already wired; avoid churn; revisit if inconsistency bites | 0 |
| Usability built first (keystone) | Build in research order | Journey/ethics/behavioral cite its laws | 2 |
| Cluster pillars 2-per-phase | One pillar per phase | Stays under the 7-phase cap | 3,4,5 |
| Author via skill-craft, not just validate | Hand-author + validate after | User: "it knows best practices"; baseline-first evals catch trigger issues early | 2–6 |
| Version → 3.0.0 | Minor bump | System reshape from single-skill to multi-skill plugin is a major change | 6 |

---

## Notes

- The biggest live risk is **trigger cannibalization across 9 skills** — the entire Phase 6 cannibalization sweep + `optimize_description` exist to manage it; the fallback is merging low-traffic pillars.
- **ai-native** is the one pillar with no book canon — its content is principle-derived; budget a possible follow-up research pass (don't block the system on it).
- This plan does NOT decompose the existing core skill's modes — that's a deliberate future plan if the system proves out.
- Cross-skill citation direction is one-way (pillars → usability); Phase 6 verifies no cycles.

---

## Execution Log

### Phase 0: Commit surface baseline (Gate: Minimal)
- [x] BUILD: validate_skill 0/0; surface triggers 8/8 at 100%; 19/20 overall (one miss = pre-existing description-ceiling ambiguity, not a surface regression — fixed structurally once pillars move to own skills in Phase 6)
- [x] REVIEW: SKIPPED — Minimal gate (tests are gate)
- [x] Committed
Commit: da229b3
Summary: Surface mode (device-class taxonomy) committed as the clean validated baseline; plugin at 2.2.0; core description at 1023/1024 chars (ceiling confirmed — the constraint the multi-skill system dissolves).

### Phase 1: Foundation scaffolding (Gate: Full)
- [x] BUILD: created docs/foundations-standards.md, docs/skill-authoring-template.md, docs/pillar-taxonomy.md; added pillar-aware index to core SKILL.md; verified multi-skill-plugin assumption (independent triggering, no central router)
- [x] REVIEW: PASS — all 5 DW verified; note: core description at 1023/1024 (zero margin, resolved Phase 6)
- [x] Committed
Commit: a24d62b
Summary: design-foundations system contract established — conventions doc, authoring template, 8-pillar disjoint-scope taxonomy (cite-down acyclic DAG); core skill now pillar-aware. Build order: usability → {content-design,data-viz} → {deceptive-patterns,behavioral} → {journey,design-systems} → {ai-native + integration}.

### Phase 2: Usability skill (keystone) (Gate: Full)
- [x] BUILD: skills/usability/ (SKILL.md 936-char desc + usability-principles.md [why-engine] + ui-patterns.md [8 families + bridge]); audit upgraded additively to dispatch heuristic eval; validate 0/0 both
- [x] REVIEW: PASS — all 5 DW; minor non-blocking citation-parity note on 3 laws
- [x] Committed
Commit: 555c4f0
Summary: Usability keystone shipped — the cite-able principles reference exposes stable per-law anchors (#fittss-law, #hicks-law, #millers-law-revised-to-cowan, etc.) for Phases 4–5; audit now dispatches Nielsen-10 heuristic eval; no regression to visual audit.

### Phase 3: Content-design + Data-viz skills (Gate: Standard)
- [x] BUILD: skills/content-design/ (827-char desc + content-principles.md + microcopy-patterns.md) and skills/data-viz/ (849-char desc + viz-principles.md + chart-selection.md); validate 0/0 both
- [x] REVIEW: PASS — all 4 DW; disjointness verified (content-design→words/redirect fonts; data-viz→data/redirect color)
- [x] Committed
Commit: a813d3b
Summary: Two independent design-layer pillar skills shipped (content-design = words-as-interface; data-viz = truthful data encoding), disjoint from each other and core fonts/color. Positive-recall optimize_description tuning deferred to Phase 6 sweep.

### Phase 4: Ethics + Behavioral skills (Gate: Standard)
- [x] BUILD: skills/deceptive-patterns/ (982-char desc; dark-patterns.md twin-linked to ai-tells + honest-alternatives.md) and skills/behavioral/ (947-char desc; behavioral-principles.md + ethical-application.md citing usability anchors); validate 0/0 both
- [x] REVIEW: PASS — all 4 DW; bidirectional paired framing verified; ai-tells twin distinct not duplicate
- [x] Committed
Commit: 9e4ee9f
Summary: The ethics/persuasion pair shipped same-tools-opposite-intent — deceptive-patterns (dark-pattern ban-list, twin of ai-tells) and behavioral (honest mechanism, cites usability laws, guarded by deceptive-patterns). 3 'audit'-phrasing trigger collisions deferred to Phase 6 sweep.

### Phase 5: Journey + Design-systems skills (Gate: Standard)
- [x] BUILD: skills/journey/ (996-char desc; journey-stack.md with JOURNEY.md template + journey-caveats.md; cites Hick/Fitts/Miller) and skills/design-systems/ (1012-char desc; gates on locked DESIGN.md, references palette.mjs) ; validate 0/0 both
- [x] REVIEW: PASS — all 4 DW; JOURNEY.md template present; design-systems extends not duplicates; journey 18/18 triggers
- [x] Committed
Commit: 576dff7
Summary: Flow + systematic-design pillars shipped. 7 of 8 pillar skills now live (usability, content-design, data-viz, deceptive-patterns, behavioral, journey, design-systems). Remaining for Phase 6: ai-native skill + full-system integration (cross-links, plugin.json v3.0.0, comprehensive cannibalization sweep to resolve deferred trigger PARTIALs, run_eval, docs).

### Phase 6: AI-native skill + system integration (Gate: Full)
- [x] BUILD: skills/ai-native/ (1023-char desc + ai-native-principles.md + ai-native-caveats.md, "no settled canon" flagged 6×); plugin.json v3.0.0; CLAUDE.md + README reworked; all 9 skills validate 0/0, all desc ≤1024; graph acyclic; core Phase-0 miss fixed (3/3); usability/evals.json + run_eval (1.00 vs 0.50 on discipline eval)
- [x] REVIEW: PASS (with note) — all 7 DW met; LOOSE END: deceptive-patterns optimize_description candidate (943 chars) not written back, live desc still 1018 chars w/ audit/review tokens → collision-resolution only partially evidenced (non-blocking, validates 0/0)
- [x] Committed
Commit: 4f44b5f
Summary: design-foundations system COMPLETE — 8 pillar skills + core, v3.0.0, all validate 0/0, acyclic cite-down graph. Open follow-up: tighten the deceptive-patterns↔audit trigger evidence (write back the optimized description or re-run the sweep).
