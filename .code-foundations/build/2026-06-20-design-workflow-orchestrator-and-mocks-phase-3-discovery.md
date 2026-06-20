# Discovery + Design: Phase 3 - plan command (phased design plan)

## Files Found

- `commands/plan.md` — Phase-1 stub: valid frontmatter (description + argument-hint) + a goal blurb + a "Body (Phase 3 implements this)" placeholder + the chain-to-mock line. This phase overwrites the body, keeps the frontmatter shape.
- `commands/research.md` — full Phase-2 facilitation command. Establishes the house "how you talk" voice, the `.code-foundations/research/*.md` output, and the `/design-for-ai:plan <doc>` handoff this command receives.
- `commands/mock.md`, `commands/build.md` — Phase-1 stubs; plan chains to mock; both name their own gate invariants (DESIGN.md locked before tokens/mocks; JOURNEY.md page specs before page mocks) — the plan must produce phases that honor these same gates.
- `skills/clarify/SKILL.md` — ported, design-grounded, `user-invocable: false`. Classifies design gaps (missing brand context, visual ambiguity, false premises, scope faults). The plan invokes it via `Skill(clarify)`.
- `docs/workflow-conventions.md` — the shared contract. §1 lifecycle, §2 artifact gates (DESIGN.md / JOURNEY.md), §3 done-when vocabulary (contrast/token/heuristic/artifact-presence), §4 pillar dispatch + stage→pillar map, §5 handoff chain. The plan CITES this, does not restate it.
- `docs/pillar-taxonomy.md` — the 9 design skills (core `design-for-ai` + 8 pillars), their SRP concerns, disjoint trigger scopes, and the cite-down DAG.
- `code-foundations/commands/plan.md` (read-only reference) — the structural template: read input → Quick classification → shared steps (scan / clarify / problem statement) → Quick track (decompose → skeleton checkpoint → detail → cross-cut → save → check → present → handoff) OR Standard/Full track (loads `skills/planning/SKILL.md`).
- `code-foundations/skills/planning/SKILL.md` (read-only reference) — the 10-step Standard/Full pipeline (DISCOVER→CLASSIFY→EXPLORE→DECOMPOSE→DETAIL→CROSS-CUT→SAVE→CHECK→CONFIRM→HANDOFF). Phase notes I may port a *lightweight inline* design-planning equivalent rather than build a separate planning skill — DW floor does not require a separate skill.

## Current State

Phases 1-2 complete and committed. The scaffold (commands/ stubs, clarify, workflow-conventions.md, plugin.json@3.1.0) and the research command exist. plan.md is a stub awaiting its full body. The two artifact gates and the design done-when vocabulary already exist as a written contract in workflow-conventions.md — Phase 3 consumes them, it does not invent them.

## Gaps

| # | Gap between plan assumptions and reality | Resolution |
|---|---|---|
| 1 | code-foundations plan defers Standard/Full to a separate `skills/planning/SKILL.md`. This plugin has no planning skill, and the phase says don't over-build one. | Port a **lightweight inline** design-planning sequence in plan.md (decompose→detail→cross-cut→save→check→present), proportional to a markdown command. No separate skill. |
| 2 | code-foundations uses `Skill(code-foundations:code-standards)` in its shared step 1 (codebase scan). No code-standards analog exists for design. | Replace the codebase-scan step with a **design-state scan**: detect existing DESIGN.md / JOURNEY.md / research doc to decide entry stage. This is the mid-lifecycle-resume mechanism (DW-3.5). |
| 3 | code-foundations matches skills against a generic register. Here the skills are the fixed 9 design skills with disjoint scopes (pillar-taxonomy.md). | Constrain skill-matching to the 9 named design skills; map each lifecycle stage to its pillar via workflow-conventions.md §4. |
| 4 | The DAG/acyclicity requirement (DW-3.3) is design-specific (artifact gates), not in the code template. | Add an explicit "lifecycle DAG + gate invariants" section to the command, verified below via ca-architecture-boundaries. |

## Code Standards

No `docs/code-standards.md` found (this is a markdown skill/command plugin, not a code project). The governing conventions are `docs/foundations-standards.md` (frontmatter shape, ≤1024-char description) and the code-foundations command structure being mirrored. The plan's Test Coverage section confirms "tests" = `validate_skill` + desk-checked workflow logic, not a unit-test framework.

## Test Infrastructure

No unit-test framework. Per the dispatch's Test Substrate: a `commands/*.md` file is not a skill dir, so `validate_skill` does not apply. Verification is by **desk check** — file exists, frontmatter valid, required content + exact strings present, lifecycle/DAG logic internally consistent — with recorded evidence per DW item (a command + output, or quoted file lines).

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-3.1 | `commands/plan.md` exists; flow mirrors code-foundations plan (classify→clarify→problem statement→decompose→detail→save→present). | COVERED | DC-1: frontmatter valid (description+argument-hint). DC-2: grep each stage heading present in order (classification, clarify, problem statement, decompose, detail, save, present). |
| DW-3.2 | phases map to the design lifecycle (Discover/Design); each phase carries a `**Skills:**` field naming the matched pillar(s) and design done-when items (token/contrast/artifact/heuristic). | COVERED | DC-3: the phase template in plan.md carries `**Skills:**` + `**Stage:**` (Discover/Design) + `**Done when:**` using design vocabulary; the stage→pillar map is present; grep for contrast/token/heuristic/artifact done-when language. |
| DW-3.3 | the plan output gates Design behind a locked DESIGN.md and flows behind JOURNEY.md; DAG acyclic (verified via ca-architecture-boundaries). | COVERED | DC-4: plan.md states the gate invariants (JOURNEY.md before Design page work; DESIGN.md locked before tokens/mocks) and an acyclic lifecycle DAG. Verified by the ca-architecture-boundaries analysis (Design Decisions below). |
| DW-3.4 | it reads a research doc as seed (doesn't re-derive intent) and chains to `mock`. | COVERED | DC-5: "Read the Input First" section handles research-doc path vs brief vs empty and states "do not re-derive intent"; DC-6: handoff names `/design-for-ai:mock <plan-path>`. |
| DW-3.5 | mid-lifecycle entry (existing DESIGN.md) resumes at Design, doesn't redo Discover — documented. | COVERED | DC-7: a design-state scan / resume section documents: DESIGN.md present → resume at Design, skip Discover; JOURNEY.md present but DESIGN.md absent → resume at Design DNA; neither → full Discover→Design. |

**All items COVERED:** YES (5 DW-IDs in prompt = 5 DW-IDs in table)

## Design Decisions

### ca-architecture-boundaries: the lifecycle DAG is acyclic and gates match boundaries

Applied the skill at SYSTEM level (the lifecycle = boundaries; stages = components; artifacts = the seams crossing boundaries).

**Actors / stages (SRP — one stage answers to one design concern):**

| Stage | Concern (actor) | Pillar(s) | Produces (seam) | Depends on (inward) |
|-------|-----------------|-----------|-----------------|---------------------|
| Discover — JTBD/IA | how the user moves through time | `journey` | JOURNEY.md (Job+Journey+IA) | research doc |
| Discover — flows/page specs | the route + page structure | `journey` | JOURNEY.md (Flows+Page specs) | JOURNEY.md (IA) |
| Design — DNA/tokens | the visual identity | core `design-for-ai` | DESIGN.md locked (token block) | JOURNEY.md (what surfaces exist) |
| Design — type/color | typography + palette | core `design-for-ai` | DESIGN.md (type scale+tokens) | DESIGN.md (DNA) |
| Design — design system | look → token machine | `design-systems` | token tiers + component specs | DESIGN.md locked |
| Design — words | words as interface | `content-design` | page specs + microcopy | DESIGN.md + JOURNEY.md page specs |
| Design — data surfaces | encode data truthfully | `data-viz` | chart/table specs | DESIGN.md + JOURNEY.md page specs |

**Dependency Rule (arrows point inward, toward the earliest locked artifact):**

```
research ─▶ JOURNEY.md ─▶ DESIGN.md(locked) ─▶ tokens/design-system
                  │                │                    │
                  └────────────────┴──▶ content/data compose ─▶ (mock, Phase 5)
```

- **Acyclic:** No stage's Produces feeds back into a stage it depends on. tokens never re-enter Discover; compose never re-enters DNA; mock never re-enters Design. Read every edge — each points strictly forward toward the locked artifact. No back-edges → DAG confirmed.
- **Gates = boundary crossings.** Two boundaries, each a non-negotiable gate (workflow-conventions.md §2): (1) **JOURNEY.md before Design page work** — Design can't lay out surfaces that the journey hasn't specified; (2) **DESIGN.md locked before tokens/mocks** — a token machine has nothing to systematize until the DNA is fixed. The stage gates in the plan command match these artifact gates exactly (the SRP-by-actor test: tokens answer to the design-system actor, which cannot act until the design actor has locked DESIGN.md).
- **OCP / resume:** Mid-lifecycle entry (DW-3.5) is the OCP extension — entering at Design when DESIGN.md exists requires NO change to the Discover stages; the dependency arrows already permit starting at any node whose inward artifacts are satisfied. A pre-existing DESIGN.md satisfies the inward dependency of every Design stage, so Discover is skipped without rewriting it.
- **DIP / dispatch-not-duplicate:** The plan depends on pillar *abstractions* (names — `Skill(journey)`, `Skill(design-systems)`), never on their content. Pillars stay triggerable; the plan references and sequences them. This is the "interface in the business layer, implementation in the pillar" inversion — the plan owns the sequence, the pillars own the procedure.

### Track structure (proportional, inline)

- **Quick track** (simple ask, edge case): 1-2 phases, compressed. Mirror code-foundations' default-to-Quick. Don't over-plan a one-surface "make this landing page look good."
- **Standard/Full track** (multi-surface / full product): the full Discover→Design decomposition, inline in the command (no separate planning skill — gap #1). Staged: decompose skeleton → checkpoint → detail per phase → cross-cut → save → check → present.
- **Entry classification** decides track AND resume stage from the design-state scan (gap #2).

### Skill matching constrained to the 9 design skills

Phase skills are matched against the fixed register from pillar-taxonomy.md (core `design-for-ai`, usability, content-design, data-viz, deceptive-patterns, behavioral, journey, design-systems, ai-native) using their disjoint "fires on / not for" scopes. The stage→pillar map in workflow-conventions.md §4 is the default assignment; the command references it rather than re-deriving.

## Prerequisites

- [x] Required files exist (plan.md stub to overwrite; workflow-conventions.md, pillar-taxonomy.md, foundations-standards.md, research.md present)
- [x] Dependencies available (clarify skill present and invocable; code-foundations templates readable)
- [x] No missing prerequisites

## Recommendation

**BUILD.** Overwrite `commands/plan.md` with the full body: frontmatter (kept) → read-input → design-state scan + complexity/resume classification → clarify → confirmed problem statement → decompose into lifecycle phases (each with `**Stage:**` + `**Skills:**` + design done-when) → detail → cross-cut → save to `.code-foundations/plans/*.md` → check → present → chain to mock. Embed the acyclic lifecycle DAG + gate invariants. Keep it proportional — inline lightweight planning, no separate planning skill.
