# Discovery + Design: Phase 6 - integration, docs, e2e dry run

## Files Found

- `/Users/r/repos/design-for-ai/CLAUDE.md` — exists; describes the plugin as a "multi-skill system" with core-modes + pillars as the primary story; no mention of the workflow commands or agents/; plugin.json version comment says 3.0.0 (stale)
- `/Users/r/repos/design-for-ai/README.md` — exists; describes v3.0.0 multi-skill system; pillar table + core mode table present; no workflow commands section; version references say 3.0.0
- `/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md` — exists; describes 8 pillars with SRP/trigger/dependency graph; no mention of workflow loading or the "doctrine library" role
- `/Users/r/repos/design-for-ai/skills/prototype/SKILL.md` — exists; two stale references: "Supplying a screenshot for the audit conductor (Phase 2)" (line 15) and "Suggest `audit` (core design) to critique the rendered result" (Step 4 handoff, line 60); both should point to the design-review-agent
- `/Users/r/repos/design-for-ai/.claude-plugin/plugin.json` — exists at version 3.1.0 with a correct workflow-describing description; NO changes needed
- `/Users/r/repos/design-for-ai/commands/research.md` — exists; names `/design-for-ai:plan` handoff explicitly (line 138)
- `/Users/r/repos/design-for-ai/commands/plan.md` — exists; names `/design-for-ai:mock` handoff (line 266)
- `/Users/r/repos/design-for-ai/commands/mock.md` — exists; dispatches design-build-agent (Step 1) and design-review-agent (Step 2); sign-off gate chains to `/design-for-ai:build` or loops to `/design-for-ai:plan`
- `/Users/r/repos/design-for-ai/commands/build.md` — exists; dispatches design-build-agent (N.1 BUILD) and design-review-agent (N.2 REVIEW) per phase
- `/Users/r/repos/design-for-ai/agents/design-build-agent.md` — exists
- `/Users/r/repos/design-for-ai/agents/design-review-agent.md` — exists

## Current State

The workflow spine (commands/ + agents/) is complete and wired from Phases 1–5. The integration docs (CLAUDE.md, README.md, pillar-taxonomy.md) still describe the v3.0.0 multi-skill-only system with no mention of the workflow. Two stale references in prototype/SKILL.md point to the old "audit conductor (Phase 2)" and "audit (core design)" instead of the design-review-agent. plugin.json is already at 3.1.0 with the correct description — confirmed, no change needed.

## Gaps

| Gap | File | What's wrong | Fix |
|-----|------|--------------|-----|
| Workflow not front-and-center | CLAUDE.md | "Repository Purpose" describes the system as pillars only; Usage section leads with core modes; no commands/ or agents/ in the structure tree | Add workflow section as primary front door; add commands/ + agents/ to structure tree; keep core modes + pillars tables |
| Version comment stale | CLAUDE.md | Structure tree comment says `# version 3.0.0` | Update to 3.1.0 |
| Pillar doctrine-library role undocumented | docs/pillar-taxonomy.md | No mention that pillars are loaded per-phase by the workflow AND remain directly triggerable | Add a note at the top of the taxonomy |
| README describes v3.0.0 only | README.md | No workflow section; version refs say 3.0.0; pillar section says "each triggers on its own description" but doesn't mention workflow loading | Add workflow section; update version to 3.1.0; add note about dual role |
| Stale "audit conductor (Phase 2)" ref | skills/prototype/SKILL.md line 15 | "Supplying a screenshot for the audit conductor (Phase 2) to critique" | Replace with "Supplying a screenshot for the design-review-agent to critique" |
| Stale "audit (core design)" handoff | skills/prototype/SKILL.md Step 4 line 60 | "Suggest `audit` (core design) to critique the rendered result once the mock is open" | Replace with reference to the design-review-agent (via mock or build command) |

## Code Standards

From `docs/foundations-standards.md`: description ≤1024 chars, third person, no XML tags; SKILL.md body < 500 lines. Applied to prototype/SKILL.md edits. CLAUDE.md, README.md, and pillar-taxonomy.md are not skills — no validate_skill; verification is desk-check.

From skills loaded (skill-craft): description formula `[Verb-first capabilities]. Use when [triggers]. Not for: [near-misses].`; standing instructions not one-time steps; don't over-prompt.

## Test Infrastructure

- `validate_skill` runs on every skill directory: core + 8 pillars + clarify + prototype.
- Commands and agents are NOT skill directories — verified by desk-check (frontmatter + required sections + DW items present).
- Dry-run TRACE: static wiring trace from commands/ and agents/ source — no live execution.

## DW Verification

| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-6.1 | CLAUDE.md + pillar-taxonomy.md + README reflect the workflow + the pillar doctrine-library role; prototype's stale Phase-2/audit-conductor refs repointed to the review-agent | COVERED | Desk-check: (a) CLAUDE.md has a workflow section naming research→plan→mock→build as front door, commands/ + agents/ in structure tree; (b) pillar-taxonomy.md has a note that pillars are workflow-loaded AND directly triggerable; (c) README has a workflow section + version 3.1.0; (d) prototype/SKILL.md line 15 and Step 4 handoff both reference the design-review-agent, not the audit conductor |
| DW-6.2 | validate_skill clean across all skills (core + 8 pillars + clarify + prototype); pillar/core triggers unregressed (spot-check, not a trigger-tuning pass) | COVERED | Run validate_skill on each of the 11 skill directories; desk-check descriptions against the ≤1024-char rule; spot-check trigger text in descriptions for regressions against previous passing state |
| DW-6.3 | an end-to-end dry-run TRACE on a sample brief shows research→plan→mock→build with each handoff firing and both agents dispatching — documented (table with file:line evidence) | COVERED | Static trace table below (pre-built from reading commands/ and agents/ files); cites file:line for every handoff and agent dispatch |

**All items COVERED:** YES

## End-to-End Dry-Run TRACE

Sample brief: "Redesign the landing page for a B2B SaaS product."

| Stage | Action | Handoff target / Agent dispatched | File:line evidence |
|-------|--------|-----------------------------------|--------------------|
| **research** | User invokes `/design-for-ai:research "Redesign landing page for B2B SaaS"` | Facilitates brief; saves `.code-foundations/research/YYYY-MM-DD-b2b-saas-landing.md` | commands/research.md:106-114 (Saving section) |
| **research → plan** | research completes; names the next command | `/design-for-ai:plan .code-foundations/research/<file>.md` | commands/research.md:136-141 ("What Comes Next" section) |
| **plan** | reads research doc; classifies complexity; clarifies; decomposes phases | — | commands/plan.md:15-24 (read input); 66-78 (clarify); 119-135 (Quick track) |
| **plan → mock** | plan approved; names the next command | `/design-for-ai:mock .code-foundations/plans/<plan>.md` | commands/plan.md:264-270 (PRESENT and HANDOFF section) |
| **mock: Step 1** | reads plan; dispatches build-agent in minimal-gate mode to render mock via prototype | Agent: `design-build-agent` (`subagent_type: "design-build-agent"`) | commands/mock.md:43-81 (Step 1 — Dispatch the build-agent) |
| **mock: Step 2** | dispatches review-agent for cheap cross-pillar validation on rendered pixels | Agent: `design-review-agent` (`subagent_type: "design-review-agent"`) | commands/mock.md:85-118 (Step 2 — Dispatch the review-agent) |
| **mock → sign-off gate** | presents screenshot + findings; asks user to approve or loop | On Approve: `/design-for-ai:build [plan path]`; On Adjust: `/design-for-ai:plan [plan path]` | commands/mock.md:131-151 (STOP — Sign-off Gate) |
| **build: worktree gate** | checks branch + worktree before any work | Block if on main; requires feature branch or worktree | commands/build.md:37-63 (Worktree Gate) |
| **build: per-phase N.1** | for each phase, dispatches build-agent for the design artifact | Agent: `design-build-agent` (`subagent_type: "design-build-agent"`) | commands/build.md:143-191 (Sub-Phase N.1 — BUILD) |
| **build: per-phase N.2** | after each BUILD, dispatches review-agent for independent cross-pillar critique | Agent: `design-review-agent` (`subagent_type: "design-review-agent"`) | commands/build.md:193-238 (Sub-Phase N.2 — REVIEW) |
| **build: commit** | after REVIEW PASS, orchestrator commits directly | git commit with design gate metadata | commands/build.md:240-268 (Commit After Phase) |
| **design-build-agent file exists** | — | `/Users/r/repos/design-for-ai/agents/design-build-agent.md` | agents/design-build-agent.md (entire file) |
| **design-review-agent file exists** | — | `/Users/r/repos/design-for-ai/agents/design-review-agent.md` | agents/design-review-agent.md (entire file) |

**Handoff verdict:** All four stages chain; mock dispatches BOTH agents; build dispatches BOTH agents per phase; both agent files exist. No broken handoffs found.

## Design Decisions

**CLAUDE.md restructure:** Lead with the workflow as the front door (the "single command runs me through" story), then explain that the 9 pillar skills are the workflow's doctrine library AND remain directly triggerable. Keep the existing core-modes table and pillars table (still accurate) — they're now in a "direct invocation" section rather than the primary Usage section. Add commands/ and agents/ to the structure tree. Update the version comment.

**pillar-taxonomy.md addition:** A short paragraph at the top (before the Table of Contents) stating the dual role: pillars loaded per-phase by the workflow, AND directly triggerable for standalone questions. This is additive — no existing content changes.

**README.md restructure:** Add a "The workflow" section after the existing intro (before "The core: one command…"), naming the four commands and the spine. Update the version line and the "current version" paragraph at the bottom. Keep the pillar table and core-mode table intact.

**prototype/SKILL.md fixes:** Two surgical edits only — fix line 15 (audit conductor → design-review-agent) and fix Step 4 handoff (audit core → design-review-agent via mock/build). Behavior unchanged; only dangling references fixed.

## Prerequisites

- [x] commands/ spine files exist and are readable
- [x] agents/ files exist and are readable
- [x] plugin.json at 3.1.0 (confirmed — no change needed)
- [x] docs/foundations-standards.md read
- [x] All 11 skill directories exist for validate_skill runs

## Recommendation

BUILD — implement the four edits (CLAUDE.md, README.md, pillar-taxonomy.md, prototype/SKILL.md), then run validate_skill on all 11 skill directories. No blockers.
