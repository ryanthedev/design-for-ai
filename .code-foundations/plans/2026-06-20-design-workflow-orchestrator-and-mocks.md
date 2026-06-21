# Plan: design-foundations workflow — a code-foundations-style design pipeline

**Created:** 2026-06-20
**Status:** complete
**Started:** 2026-06-20 18:20
**Completed:** 2026-06-20 18:45
**Current Phase:** 6 (done)
**Complexity:** complex
**Workspace:** branch `feature/design-workflow-orchestrator` (keep; main clean)

---

## Context

**Problem.** The design-foundations system (v3.0.0) is a set of disjoint, auto-triggering skills — the visual/surface core + 8 pillars. It answers narrow questions well but has no way to take a user *through* a design from a vague idea to something they can see. "Make it look good" lands on one narrow skill while the rest stay dark; the system produces guidance and spec docs but never a holistic, distinct, viewable design.

**The pivot (user directive).** Stop optimizing triggers. Mimic **code-foundations**: a slash-driven *workflow* — figure out what the user wants (research), plan it, **mock it cheaply before committing**, then build it — where each stage dispatches the relevant pillars and the holistic cross-pillar review is a *workflow stage*, not a trigger. Mirror code-foundations' structure: `commands/` front doors, an internal `clarify` skill, per-phase dispatched agents, gated phases.

**The model being mimicked** (`/Users/r/repos/code-foundations`):
- `commands/research.md`, `plan.md`, `build.md`, `debug.md` — slash-invoked workflow front doors.
- `skills/clarify`, `skills/planning` + 19 doctrine skills — `user-invocable: false`, model-discoverable, loaded **per phase**, never auto-triggered.
- `agents/build-agent.md` (discover→stub→implement→validate), `agents/post-gate-agent.md` (independent, execution-grounded review with **zero intent-framing**).
- Spine: research → plan → build, with `Full/Standard/Minimal` gates and per-phase BUILD→REVIEW→commit dispatched to subagents.

## The design analog (target architecture)

| code-foundations | design-foundations (this plan builds) |
|---|---|
| `/research` | `/design-for-ai:research` — figure out the brief (purpose, audience, brand feel, JTBD, constraints) → a research doc |
| `/plan` | `/design-for-ai:plan` — clarify gaps + decompose into a phased **design** plan (Discover/Design stages → phases; each phase matches pillar skills + carries design done-when: contrast ratios, token coverage, heuristic pass) |
| *(new — user-requested 4th stage)* | `/design-for-ai:mock` — produce the mock(s) from the plan via the existing `prototype` skill, run a **cheap cross-pillar validation** on the rendered pixels, and **gate on user sign-off of the direction** before full build |
| `/build` | `/design-for-ai:build` — execute the plan's phases; each dispatches the relevant pillars and produces JOURNEY.md / DESIGN.md / tokens / final mocks; per-phase BUILD→REVIEW→commit |
| `skills/clarify` | **ported verbatim** into this plugin |
| 19 doctrine skills | the **9 pillars stay triggerable** (user decision) AND are loaded per-phase by the commands/agents |
| `build-agent` | **design-build-agent** — produces a phase's design artifact honoring DESIGN.md gates (contrast via `palette.mjs`, token coverage, surface constraints) |
| `post-gate-agent` | **design-review-agent** — independent, execution-grounded **holistic cross-pillar critique on the rendered pixels** (the in-progress audit-conductor folds in here) |
| test suite / execution evidence | render mock → screenshot → contrast/token checks (`palette.mjs`) + cross-pillar heuristic audit = the executable evidence that gates a phase |

"Make it look good" becomes **the review-agent running every applicable pillar over the rendered mock** — a workflow, not a trigger.

## Constraints

- **Mimic code-foundations structure**, don't reinvent: `commands/` + internal `clarify` + dispatched `agents/` + gated phases. Port `clarify` verbatim where it fits.
- **Pillars stay triggerable** (user decision): do NOT set `user-invocable: false` on the 9 pillars. The workflow loads them per-phase via `Skill()`/`Read()` regardless of trigger status. Don't break existing pillar/core triggers.
- **Keep the committed `prototype` skill** (`1dc8f13`) — the `mock` stage and `build` consume it; do not rebuild it.
- **Fold the in-progress audit-conductor** (uncommitted `skills/design-for-ai/SKILL.md` edits) into the `design-review-agent` rather than the core `audit` mode. **Revert the uncommitted description/trigger churn** on the core skill (keep its pre-pivot triggers intact).
- Graceful render loop stays graceful (browser MCP when up, emit HTML + note when not) — no hard MCP dependency, mirrors the prototype skill's existing protocol.
- Reviewer independence: the `design-review-agent` gets requirements + artifacts only, **no intent-framing** (mirror `post-gate-agent`).
- Every new skill/command obeys `docs/foundations-standards.md` (frontmatter, ≤1024-char description) and `docs/skill-authoring-template.md`.

---

## Chosen Approach

Build a **four-command workflow** (`research → plan → mock → build`) that mirrors code-foundations, plus a ported `clarify` skill and two dispatched agents (`design-build-agent`, `design-review-agent`). The 9 pillars become the workflow's doctrine library (loaded per-phase) while keeping their existing triggers. The `prototype` skill is the mock generator; the folded audit-conductor becomes the review-agent's cross-pillar critique protocol. The `mock` stage is the cheap-validation checkpoint the user asked for: prove the direction on rendered pixels and get sign-off before the full build.

Each command is invoked standalone but chains to the next (research → "now run plan", etc.), giving the "single command runs me through" feel without one monolith — exactly code-foundations' handoff pattern.

## Rejected Approaches

- **A `studio` orchestrator *skill*** (the prior plan's Phase 3): a skill can't gate phases, dispatch per-phase agents, or own a worktree-style lifecycle. Commands are the right primitive — this is why code-foundations uses `commands/`, not a skill.
- **Convert pillars to `user-invocable: false`** (full code-foundations mimic): rejected by user — pillars stay triggerable for narrow standalone questions.
- **Upgrading core `audit` mode into the conductor** (prior plan's Phase 2): the holistic conductor belongs in the dispatched `design-review-agent` (independent, execution-grounded, pixel-critiquing), not an auto-triggering core mode. Fold the work there; revert the core churn.
- **One monolithic `/design` command** doing clarify→research→plan→mock→build inline: harder to resume a single stage and diverges from the code-foundations pattern. Chained standalone commands chosen instead.

---

## Implementation Phases

### Phase 1: Workflow scaffold + `clarify` port + manifest
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Stand up the code-foundations-style skeleton in this plugin: `commands/` dir, a ported `clarify` skill, the shared workflow conventions doc, and the manifest bump — the substrate every later phase fills in.

**Scope:**
- IN: create `commands/` (empty front-door stubs wired with frontmatter + `argument-hint`); port `code-foundations/skills/clarify/SKILL.md` (+ its `adaptive-questioning.md` reference) into `skills/clarify/` adapted to design ambiguity (visual/brand/scope faults, not code faults); add `docs/workflow-conventions.md` (the design lifecycle: research→plan→mock→build, the artifact gates DESIGN.md/JOURNEY.md, the design done-when vocabulary); bump `.claude-plugin/plugin.json` to 3.1.0 with a workflow-describing description.
- OUT: command bodies (Phases 2–5); the agents (Phase 4).

**Constraints:** clarify port keeps the fault-type/strategy machinery but re-grounds examples in design (e.g. "make it modern" = vague objective; "match our brand" with no brand = missing premise). ≤1024-char descriptions.
**Edge cases:** clarify must not duplicate the core skill's existing intent-detection; cross-reference, don't fork behavior.
**Produces:** `skills/clarify/` (invocable design clarifier), `commands/` stubs, `docs/workflow-conventions.md`, `plugin.json@3.1.0`. The conventions doc is the shared contract Phases 2–5 cite.
**Depends on:** none — entry phase | **Unlocks:** Phases 2,3
**Done when:**
- [ ] DW-1.1: `skills/clarify/` exists (ported + design-grounded), validates clean; description ≤1024.
- [ ] DW-1.2: `commands/` exists with frontmatter-valid stubs for research, plan, mock, build.
- [ ] DW-1.3: `docs/workflow-conventions.md` documents the research→plan→mock→build lifecycle, the DESIGN.md/JOURNEY.md artifact gates, and the design done-when vocabulary (contrast/token/heuristic).
- [ ] DW-1.4: `plugin.json` at 3.1.0 with a workflow-describing description; install path unchanged.

**Difficulty:** MEDIUM

---

### Phase 2: `research` command (figure out what the user wants)
**Model:** sonnet
**Skills:** oberskills:prompt, oberskills:skill-craft
**Gate:** Standard

**Goal:** Author `commands/research.md` — a facilitation flow that extracts the design brief (purpose, audience, brand feel, JTBD, constraints, references) and writes a research doc, mirroring code-foundations' `research` command.

**Scope:**
- IN: a short-turn facilitation flow (mirror `code-foundations/commands/research.md`'s "how you talk" + progressive-narrowing, re-grounded for design: who/what/brand/mood/competitors/constraints); writes `.code-foundations/research/YYYY-MM-DD-<slug>.md`; chains to `plan`. Uses web/image research as a tool (mood/reference gathering), not the goal.
- OUT: planning, DNA generation, mocks.

**Constraints:** output format is whatever the brief demands (not a rigid template); always include summary + date/status + open questions. Re-grounded for design, not code.
**Edge cases:** user arrives with a finished brief → reflect + confirm, don't re-interview; user has no brand → note it as an open question for `plan`/Design to resolve via the core `design` DNA step.
**Produces:** `.code-foundations/research/*.md` (a confirmed design brief) + the chain instruction to `plan`.
**Depends on:** Phase 1 | **Unlocks:** Phase 3
**Done when:**
- [ ] DW-2.1: `commands/research.md` exists with valid frontmatter; facilitation flow re-grounded for design (brand/audience/mood/JTBD).
- [ ] DW-2.2: it writes a research doc to `.code-foundations/research/` with summary + date/status + open questions.
- [ ] DW-2.3: it chains to `plan` (names the exact `/design-for-ai:plan <doc>` handoff).

**Difficulty:** MEDIUM

---

### Phase 3: `plan` command (phased design plan)
**Model:** opus
**Skills:** oberskills:prompt, code-foundations:ca-architecture-boundaries
**Gate:** Full

**Goal:** Author `commands/plan.md` — turns a research doc (or brief) into a phased **design** plan: clarify gaps, classify complexity, decompose the design lifecycle (Discover/Design) into phases that each match pillar skills and carry design done-when items, then save + present + chain to `mock`.

**Scope:**
- IN: the plan flow mirroring `code-foundations/commands/plan.md` (read input → classify → clarify via `Skill(clarify)` → problem statement → decompose → detail phases → cross-cut → save → check → present). **Design-specific:** phases map to lifecycle stages (Discover = journey JTBD→IA→flows→JOURNEY.md; Design = core design DNA→DESIGN.md→fonts/color→design-systems tokens→content-design/data-viz compose); each phase's `**Skills:**` field matches the relevant pillar(s); done-when items use the design vocabulary (DESIGN.md locked, tokens pass WCAG AA, JOURNEY.md page specs present, heuristic-clean). Writes `.code-foundations/plans/*.md`; chains to `mock`.
- OUT: executing the plan; mock generation; the review protocol.

**Constraints:** dispatch-not-duplicate — the plan *references and sequences* pillars, never copies their content. Verify the lifecycle DAG is acyclic and stage gates match the artifact gates (JOURNEY.md before Design; DESIGN.md locked before tokens/mocks) — use `ca-architecture-boundaries`. Pillars stay triggerable; the plan loads them by name.
**Edge cases:** user enters with an existing DESIGN.md → plan resumes at the right stage, doesn't redo Discover; simple ask → Quick track (1–2 phases), don't over-plan.
**Produces:** `.code-foundations/plans/*.md` (a design plan with phased stages, matched pillar skills, design done-when) + chain to `mock`.
**Depends on:** Phase 1 | **Unlocks:** Phase 4
**Done when:**
- [ ] DW-3.1: `commands/plan.md` exists; flow mirrors code-foundations plan (classify→clarify→problem statement→decompose→detail→save→present).
- [ ] DW-3.2: phases map to the design lifecycle (Discover/Design); each phase carries a `**Skills:**` field naming the matched pillar(s) and design done-when items (token/contrast/artifact/heuristic).
- [ ] DW-3.3: the plan output gates Design behind a locked DESIGN.md and flows behind JOURNEY.md; DAG acyclic (verified via ca-architecture-boundaries).
- [ ] DW-3.4: it reads a research doc as seed (doesn't re-derive intent) and chains to `mock`.
- [ ] DW-3.5: mid-lifecycle entry (existing DESIGN.md) resumes at Design, doesn't redo Discover — documented.

**Difficulty:** HIGH

---

### Phase 4: the two agents — `design-build-agent` + `design-review-agent`
**Model:** opus
**Skills:** oberskills:prompt, oberskills:agent, oberskills:skill-craft
**Gate:** Full

**Goal:** Author the two dispatched agents that `mock` and `build` use: a build agent that produces a phase's design artifact honoring the gates, and an independent review agent that runs the holistic cross-pillar critique on the rendered pixels (folding the in-progress audit-conductor).

**Scope:**
- IN: `agents/design-build-agent.md` — mirrors `build-agent`'s baseline discipline (scope latitude, done-when traceability) re-grounded for design: produces the phase artifact (DESIGN.md tokens via `palette.mjs`, JOURNEY.md page spec, a mock via the `prototype` skill, etc.), loads the phase's pillar skills from `## Additional Skills`, and validates with **design execution evidence** (contrast checks pass, mock renders, tokens applied). `agents/design-review-agent.md` — mirrors `post-gate-agent`'s independence (zero intent-framing, execution-first) re-grounded for design: **triage** what's on the rendered surface → **dispatch** only applicable pillars → **synthesize ONE** severity-ranked cross-pillar report on the actual pixels, with the cap+name-deferred rule. **Fold here the uncommitted audit-conductor content** (the triage→dispatch→synthesize map and image-first rule) from `skills/design-for-ai/SKILL.md` / the phase-2-discovery doc; then **revert that uncommitted SKILL.md churn**.
- OUT: the commands that dispatch these (Phases 4 is agents only; `mock`/`build` commands are Phase 5).

**Constraints:** review-agent independence is non-negotiable (requirements + rendered artifact only). Build-agent honors the DESIGN.md law-once-locked gate and never weakens a contrast/token requirement to make progress. Reuse `palette.mjs` for contrast evidence. Fold-then-revert: preserve the conductor's triage map and image-first rule in the review agent before reverting the core SKILL.md.
**Edge cases:** no screenshot (browser MCP down) → review-agent critiques the HTML/structure + notes the missing pixel evidence (graceful, no fail); visual-only surface → review dispatches just the visual+usability baseline, doesn't force data-viz/content; large surface → cap dispatched pillars and name what was deferred (no silent truncation).
**Produces:** `agents/design-build-agent.md`, `agents/design-review-agent.md`; the reverted core `skills/design-for-ai/SKILL.md` (pre-pivot triggers restored, conductor content relocated to the review agent).
**Depends on:** Phase 1 | **Unlocks:** Phase 5
**Done when:**
- [ ] DW-4.1: `agents/design-build-agent.md` exists — baseline discipline + design done-when traceability; loads `## Additional Skills`; validates with design execution evidence (contrast/render/token).
- [ ] DW-4.2: `agents/design-review-agent.md` exists — independent (zero intent-framing), execution-first, triage→dispatch→synthesize ONE ranked cross-pillar report on the rendered pixels, with cap+name-deferred.
- [ ] DW-4.3: the audit-conductor triage map + image-first rule are present in the review agent (folded from the uncommitted work).
- [ ] DW-4.4: the uncommitted churn on `skills/design-for-ai/SKILL.md` is reverted — its pre-pivot description/triggers are intact (`git diff` clean on the description line).
- [ ] DW-4.5: the review agent's no-screenshot path is graceful (critiques structure + notes missing pixel evidence, no error).

**Difficulty:** HIGH

---

### Phase 5: `mock` + `build` commands (the execution front doors)
**Model:** opus
**Skills:** oberskills:prompt, oberskills:agent
**Gate:** Full

**Goal:** Author the two execution commands: `mock` (the cheap pre-build validation checkpoint) and `build` (the full gated execution), both dispatching the Phase 4 agents.

**Scope:**
- IN:
  - `commands/mock.md` — reads the plan, dispatches `design-build-agent` to produce mock(s) via `prototype` from the plan's DESIGN.md direction, dispatches `design-review-agent` for a **cheap cross-pillar validation on the rendered pixels**, presents the screenshot + findings, and **gates on user sign-off** ("Direction good → proceed to build; adjust → loop"). This is the user's "mock with our plan before we go full board" stage.
  - `commands/build.md` — mirrors `code-foundations/commands/build.md`: worktree/branch gate, parse plan, per-phase BUILD→REVIEW→commit dispatching `design-build-agent` then `design-review-agent`, `Full/Standard/Minimal` gates, execution log, final trust report. Produces the finished JOURNEY.md + DESIGN.md + design-system tokens + final mocks + Validate report.
- OUT: new pillar content; the agents themselves (Phase 4).

**Constraints:** `mock` is a checkpoint, not the build — it produces a throwaway-fidelity prototype and a go/no-go, cheaply. `build` reuses code-foundations' gate machinery (don't reinvent gates). Both dispatch, never inline the design work. Reviewer gets no intent-framing.
**Edge cases:** `mock` with no DESIGN.md yet → prototype wireframe mode + flag that Design isn't locked; `build` on main → worktree gate blocks (mirror code-foundations); user rejects the mock direction → loop back to `plan`/Design, don't proceed.
**Produces:** `commands/mock.md`, `commands/build.md` — the complete research→plan→mock→build workflow, wired to the agents and the prototype skill.
**Depends on:** Phase 4 (dispatches both agents), Phase 3 (consumes the plan) | **Unlocks:** Phase 6
**Done when:**
- [ ] DW-5.1: `commands/mock.md` exists — dispatches build-agent (mock via prototype) + review-agent (cheap cross-pillar validation), presents screenshot+findings, gates on user sign-off, chains to `build` or loops to `plan`.
- [ ] DW-5.2: `commands/build.md` exists — worktree gate, per-phase BUILD→REVIEW→commit dispatching the two agents, gate resolution (Full/Standard/Minimal), execution log, trust report.
- [ ] DW-5.3: both commands dispatch the agents (named, not reimplemented) and `mock` consumes the `prototype` skill.
- [ ] DW-5.4: `mock`'s sign-off gate and `build`'s worktree gate are explicit; rejecting the mock loops to plan (no silent proceed).

**Difficulty:** HIGH

---

### Phase 6: integration — wire-up, docs, end-to-end dry run
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Integrate the workflow into the system docs, fix the cross-references the pivot invalidated, and prove the spine end-to-end on a sample brief.

**Scope:**
- IN: update `CLAUDE.md` (replace the "core modes + pillars" framing with the research→plan→mock→build workflow + the pillar doctrine library), `docs/pillar-taxonomy.md` (note pillars are loaded by the workflow AND triggerable), README, the `prototype` skill's stale "audit conductor (Phase 2)" references (point to the review-agent); confirm `plugin.json` description. **End-to-end dry run:** take a one-line sample brief through research→plan→mock→build and confirm each stage hands off and the agents dispatch.
- OUT: new pillar/design content.

**Constraints:** every skill/command ≤1024-char description, validate clean; install path unchanged; pillar triggers unregressed.
**Edge cases:** the dry run must surface any broken handoff or dangling reference before ship.
**Produces:** the integrated, documented, version-bumped workflow with a green end-to-end dry run.
**Depends on:** Phase 5 | **Unlocks:** —
**Done when:**
- [ ] DW-6.1: CLAUDE.md + pillar-taxonomy.md + README reflect the workflow + the pillar doctrine-library role; prototype's stale Phase-2 refs repointed to the review-agent.
- [ ] DW-6.2: `validate_skill` clean across all skills (core + 8 pillars + clarify + prototype); pillar/core triggers unregressed (spot-check, not a trigger-tuning pass).
- [ ] DW-6.3: an end-to-end dry run on a sample brief runs research→plan→mock→build with each handoff firing and both agents dispatching — documented in the execution log.

**Difficulty:** MEDIUM

---

## Test Coverage

**Level:** Per-artifact validation (`validate_skill` clean on every skill/command-bearing skill) + behavioral verification of each command flow and agent contract + one end-to-end dry run of the full spine. This is a markdown skill/command plugin: "tests" = `validate_skill` + executed workflow dry runs whose pass/fail is observed, not the skill-eval `test_triggers` harness (the pivot deprioritizes trigger evals per user directive).

## Test Plan

- [ ] T1 (validate): `validate_skill` clean on clarify, the core, all 8 pillars, prototype (DW-1.1, 6.2).
- [ ] T2 (research): a vague brief through `research` produces a `.code-foundations/research/*.md` with summary/date/open-questions and chains to plan (DW-2.2, 2.3).
- [ ] T3 (plan): a research doc through `plan` yields a phased design plan whose phases carry matched pillar skills + design done-when, gated on DESIGN.md/JOURNEY.md, acyclic (DW-3.2, 3.3, 3.4).
- [ ] T4 (plan/resume): an existing DESIGN.md → plan resumes at Design, skips Discover (DW-3.5).
- [ ] T5 (build-agent): dispatched on a phase, produces the artifact with design execution evidence (contrast pass via palette.mjs / mock renders) (DW-4.1).
- [ ] T6 (review-agent): on a rendered mock, triage→dispatch→synthesize ONE ranked cross-pillar report on the pixels; visual-only surface → baseline only; large surface → cap + name deferred (DW-4.2, 4.3).
- [ ] T7 (review independence): the review-agent receives no intent-framing and re-derives findings from the artifact (DW-4.2).
- [ ] T8 (review graceful): browser MCP down → review critiques structure + notes missing pixel evidence, no error (DW-4.5).
- [ ] T9 (revert): `skills/design-for-ai/SKILL.md` description/triggers restored to pre-pivot; conductor content lives in the review agent (DW-4.4, 4.3).
- [ ] T10 (mock gate): `mock` produces a prototype + cheap validation and gates on sign-off; rejection loops to plan (DW-5.1, 5.4).
- [ ] T11 (build gate): `build` blocks on main (worktree gate) and runs per-phase BUILD→REVIEW→commit (DW-5.2, 5.4).
- [ ] T12 (e2e): a sample brief flows research→plan→mock→build with every handoff + both agent dispatches firing (DW-6.3).

---

## Assumptions

| Assumption | Confidence | Verify Before Phase | Fallback If Wrong |
|------------|-----------|---------------------|-------------------|
| code-foundations `clarify`/`build` patterns port cleanly to a design lifecycle | HIGH | Phase 1/5 | Adapt structure; keep the gate machinery, re-ground the prose |
| Commands in this plugin can dispatch custom `agents/` like code-foundations does | HIGH | Phase 4 | Dispatch generic subagents that `Read()` the agent definition + load pillar skills |
| `palette.mjs` gives usable contrast execution-evidence for the review-agent | MEDIUM | Phase 4 | Inline WCAG contrast math in the review protocol |
| The graceful render loop (prototype) is enough pixel evidence for review | HIGH | Phase 4/5 | Structure-level critique fallback already designed (DW-4.5) |
| Keeping pillars triggerable AND workflow-loaded causes no conflict | HIGH | Phase 6 | Workflow loads by name regardless of trigger; no change needed |

## Decision Log

| Decision | Alternatives | Rationale | Phase |
|----------|-------------|-----------|-------|
| Mimic code-foundations: commands + clarify + dispatched agents + gates | studio orchestrator *skill*; one monolith `/design` | A skill can't gate/dispatch/own a lifecycle; commands are the right primitive (user directive) | all |
| 4-stage spine research→plan→**mock**→build | 3-stage (no mock) | User: mock the direction cheaply before going full board | all |
| Pillars stay triggerable AND workflow-loaded | convert to `user-invocable:false` | User decision; "stop with triggering" = stop fussing trigger evals, not remove triggers | 6 |
| Holistic conductor = `design-review-agent` (not core audit mode) | upgrade core audit mode (prior plan) | Independent, execution-grounded, pixel-critiquing belongs in a dispatched agent; revert the core churn | 4 |
| Keep committed `prototype`; it's the mock generator | rebuild | Already built + render-verified (1dc8f13) | 4,5 |
| Version → 3.1.0 | 4.0.0 | Additive workflow on the 3.x system (pillars unchanged) | 1 |

---

## Notes

- This plan **supersedes** the prior "workflow orchestrator + mocks" plan (studio skill + core-audit upgrade). Phase 1 of that plan (the `prototype` skill, commit `1dc8f13`) is **kept and reused**. Its uncommitted Phase 2 (audit-conductor in `skills/design-for-ai/SKILL.md`) is **folded into the design-review-agent (Phase 4) then reverted** off the core skill.
- The "single command runs me through" feel comes from chained standalone commands (research→plan→mock→build each name the next), exactly code-foundations' handoff pattern — not a monolith.
- The `mock` stage is the cheap go/no-go: prove the direction on rendered pixels and get sign-off before paying for the full build.
- Triggers are intentionally NOT re-optimized here (user directive). Phase 6 only spot-checks that the pivot didn't regress existing triggers.

---

## Execution Log

### Phase 0 (prior plan, kept): prototype skill
- [x] BUILD + REVIEW + Committed — `1dc8f13` (self-contained HTML/CSS mock + verified graceful render loop). Reused by `mock`/`build` in this plan.

### Phase 1: Workflow scaffold + clarify port + manifest (Gate: Standard)
- [x] BUILD: Discovery + design + implementation complete
- [x] REVIEW: PASS
- [x] Committed
Commit: 83b7b37
Summary: The plugin now has the workflow skeleton — commands/ stubs (research, plan, mock, build), a design-grounded clarify skill, docs/workflow-conventions.md defining the research→plan→mock→build lifecycle + DESIGN.md/JOURNEY.md gates + contrast/token/heuristic done-when vocabulary, and plugin.json at 3.1.0. Phases 2-6 fill in the command bodies and agents against this substrate.

### Phase 2: research command (Gate: Standard)
- [x] BUILD: Discovery + design + implementation complete
- [x] REVIEW: PASS
- [x] Committed
Commit: ded6c72
Summary: commands/research.md is now a full facilitation flow — extracts the design brief (purpose/audience/brand/mood/JTBD/constraints/references), writes a research doc to .code-foundations/research/ with summary+date/status+open-questions, and chains to /design-for-ai:plan. The entry point of the workflow; plan (Phase 3) consumes its research doc.

### Phase 3: plan command (Gate: Full)
- [x] BUILD: Discovery + design + implementation complete
- [x] REVIEW: PASS
- [x] Committed
Commit: baf74fa
Summary: commands/plan.md now turns a research doc into a phased DESIGN plan — phases carry a Discover/Design stage, a Skills field naming matched pillars, and design done-when vocabulary; lifecycle DAG acyclic; Design gated behind locked DESIGN.md, flows behind JOURNEY.md; mid-lifecycle resume; chains to mock. The mock + build commands (Phase 5) consume the plan this produces.

### Phase 4: the two agents — design-build-agent + design-review-agent (Gate: Full)
- [x] BUILD: Discovery + design + implementation complete
- [x] REVIEW: PASS
- [x] Committed
Commit: f768e8a
Summary: agents/design-build-agent.md (produces design artifacts honoring DESIGN.md gates, validates via palette.mjs contrast/render/token evidence) and agents/design-review-agent.md (independent, zero-intent-framing, triage→dispatch→synthesize ONE cross-pillar report on rendered pixels, cap+name-deferred). Audit-conductor folded into the review agent; core SKILL.md reverted to pre-pivot (1dc8f13). Phase 5's mock + build commands dispatch these two agents.

### Phase 5: mock + build commands (Gate: Full)
- [x] BUILD: Discovery + design + implementation complete
- [x] REVIEW: PASS
- [x] Committed
Commit: 3ad5e4b
Summary: commands/mock.md (cheap checkpoint — build-agent renders a mock via prototype, review-agent validates the pixels, mandatory sign-off gate: approve→build / reject→plan) and commands/build.md (full gated execution mirroring code-foundations — worktree gate, per-phase BUILD→REVIEW→commit dispatching the two design agents, gate resolution, execution log, trust report). The research→plan→mock→build spine is now complete end to end. Phase 6 integrates docs + an e2e dry run.

### Phase 6: integration — wire-up, docs, end-to-end dry run (Gate: Standard)
- [x] BUILD: Discovery + design + implementation complete
- [x] REVIEW: PASS
- [x] Committed
Commit: 1bccb07
Summary: CLAUDE.md + README.md + docs/pillar-taxonomy.md repositioned around the research→plan→mock→build workflow with the pillar dual-role documented; prototype's stale audit-conductor refs repointed to design-review-agent; validate_skill clean across all 11 skills; e2e dry-run trace confirms all 4 handoffs + both agent dispatches. The workflow system is complete and integrated.

_All phases complete._
