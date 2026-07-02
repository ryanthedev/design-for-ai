---
description: "Execute an approved design plan through gated phases (BUILD → REVIEW → commit) with subagent dispatch. Produces JOURNEY.md, DESIGN.md, design-system tokens, and final mocks. Use when a design plan exists and the direction is approved — per-phase quality gates, design execution evidence (contrast/token/heuristic), and a final trust report."
argument-hint: "[plan path]"
---

# Command: build

**Load Plan → Setup → Execute → Verify → Report.**

Execute an approved design plan phase by phase. Each phase dispatches the **`design-build-agent`** (produces the phase artifact with design execution evidence) then the **`design-review-agent`** (independent cross-pillar critique on the rendered pixels), then the orchestrator commits. This command **dispatches** the two agents — it never inlines the design or the review work.

This command runs a per-phase gate machinery (BUILD → REVIEW → commit) for design, and obeys the shared contract in `docs/workflow-conventions.md` (the lifecycle, the DESIGN.md/JOURNEY.md gates, the design done-when vocabulary). "Tests" are design execution evidence: contrast (`palette.mjs`), render (`prototype`), token coverage, heuristic pass (workflow-conventions.md §3).

---

## Invariants

Each of these exists because its absence has a specific failure mode:

- **Worktree isolation** — building on main/master leaves multi-phase commits with no rollback boundary
- **Load plan before any design work** — no plan means no done-when criteria, and artifacts get forgotten
- **One phase at a time** — parallel phases cause merge conflicts and lost context
- **BUILD before REVIEW** (Full and Standard gates) — REVIEW runs on every phase except Minimal
- **DESIGN.md locked before tokens/mocks; JOURNEY.md page specs before page mocks** (workflow-conventions.md §2) — a token machine has nothing to systematize until the DNA is fixed
- **Evidence before commit** — Full/Standard: REVIEW must PASS; Minimal: design execution evidence is the gate
- **Reviewer gets NO intent-framing** — intent-framing collapses defect detection; requirements + rendered artifact only
- **Mark a phase complete only when gates pass** — premature completion ships unverified design
- **Update the execution log** — it anchors later phases and is what you debug a failed build from

---

## Phase 1: LOAD (Read Plan File)

### Worktree Gate (first check)

Clear this gate before any other work. Multi-phase commits on `main` have no rollback and pollute history.

```bash
git branch --show-current
git status
git worktree list
```

| Situation | Action |
|-----------|--------|
| Already in a worktree (`.git` is a file) | On a feature branch — proceed |
| On feature branch, clean | Proceed (single-build mode) |
| On `main`/`master`, clean | Ask the user (below) before proceeding |
| Dirty working tree | Ask the user (below) before proceeding |

**On main/master or a dirty tree, resolve via `AskUserQuestion`** — both are decisive picks with 2-3 self-contained options, so the dialog is the right channel (unlike the content-review checkpoints in `commands/plan.md`, there's nothing here the user needs to read first):

```
You're on [main]. Building a design plan requires an isolated workspace.

Worktree or feature branch?
- [ ] Worktree — isolated copy; main checkout stays free
- [ ] Feature branch — simpler, but blocks this checkout during build
- [ ] Abort
```

```
Uncommitted changes in the working tree.

Stash, commit, or abort?
- [ ] Stash — set changes aside, restore after the build
- [ ] Commit — commit them now, then proceed
- [ ] Abort
```

- **Worktree:** `git worktree add .claude/worktrees/<plan-slug> -b feature/<plan-slug>`, copy the plan file in, `cd` into it. Run dependency setup only if the project has a lockfile (a design-doc plan usually does not).
- **Feature branch:** `git checkout -b feature/<plan-topic>`.

Record the workspace mode (worktree path + branch, or branch) for the REPORT merge instructions. **Never proceed on main/master** — a multi-phase build committed there has no rollback boundary, and a failed phase leaves the default branch broken.

### Locate + Parse the Plan

Read the plan path from `$ARGUMENTS` (or `.design-foundations/plans/`). If none given, `ls .design-foundations/plans/*.md` and ask which to execute. Extract:

1. **Context** — used for goal anchoring in BUILD dispatch prompts (NOT for REVIEW).
2. **Phases** — the lifecycle stages (Discover / Design).
3. **Done-when items per phase** — every `- [ ]` under each `**Done when:**` (passed verbatim to both agents).
4. **`**Doctrine:**` per phase** — the doctrine names; become the `## Doctrine` block in each agent dispatch.
5. **`**Gate:**` per phase** — Full / Standard / Minimal.
6. **`**Model:**` per phase** — optional override (ladder: fable/sonnet/haiku; `opus` valid only as an explicit override).
7. **Edge cases per phase** — passed to REVIEW with DW-item verdict standing.

### Verify Plan is Ready

| Plan status | Action |
|-------------|--------|
| `ready` / `in-progress` | Proceed (resume from `**Current Phase:**` if in-progress) |
| `complete` | Ask: "Plan already complete. Re-execute or archive?" |
| `blocked` | Show blockers, ask how to proceed |

---

## Phase 2: SETUP (Initialize Tracking)

### Update Plan Status

Set in the plan file: `**Status:** in-progress`, `**Started:** YYYY-MM-DD HH:MM`, `**Current Phase:** 1`.

### Doctrine Resolution

For each phase, read its `**Doctrine:**` field. Validate each name against the resolver in `docs/pillar-taxonomy.md §5`. A name absent from the resolver → STOP and surface the gap to the user. A missing field → match the phase goal/scope against the stage map in `commands/plan.md` and add the right doctrine names. These become the `## Doctrine` block in each agent dispatch.

### Model Resolution

Use the phase's `**Model:**` field if present, else omit (agents run on the active model). The ladder is fable → sonnet → haiku (`opus` a valid override, resolved the same as fable — a legacy plan naming `opus` is not an error). If a model is set, downgrade REVIEW one tier (prover-verifier asymmetry — intentional):

| BUILD model | REVIEW model |
|-------------|--------------|
| fable | sonnet |
| opus | sonnet |
| sonnet | haiku |
| haiku | haiku (floor) |

### Effort

Dispatched BUILD/REVIEW agents run at **default** effort — the plan already carries the strategic reasoning from planning's high-effort pass (`commands/plan.md`); orchestration here is dispatch work, and the subagents think in their own contexts regardless of the orchestrator's setting.

### Gate Resolution

Resolve each phase's gate (first match wins): **(1)** `**Pipeline:** full|direct` override → Full | Minimal; **(2)** the phase's `**Gate:**` field verbatim; **(3)** risk fallback (security/multi-seam → Full; docs/config-only → Minimal; else Standard).

| Level | Sub-phases | When |
|---|---|---|
| **Full** | BUILD → REVIEW → commit | High-risk design where errors cascade (DNA, tokens, system); the heavyweight tier |
| **Standard** | BUILD → REVIEW → commit | Medium design work; single-sample REVIEW still runs |
| **Minimal** | BUILD (minimal) → commit | Trivial doc/config-only work; design execution evidence is the gate, no REVIEW, no discovery |

State the resolved gate when starting each phase: "Phase N gate: [level] (reason: plan `**Gate:**` field | risk fallback: [rule] | pipeline override)."

### Create Phase Tasks Upfront

For each phase N (resolved gate + model):
- **Full / Standard — 2 tasks:** `Phase N.1: BUILD` and `Phase N.2: REVIEW` (N.2 blockedBy N.1).
- **Minimal — 1 task:** `Phase N.1: BUILD (minimal)`.
- **Chaining:** next phase's first task blockedBy this phase's last task.
- **Commits handled directly by the orchestrator** after each phase's last task — no commit tasks.

---

## Phase 3: EXECUTE (Implement Phases)

### The Orchestrator Dispatches; Agents Do the Design Work

You are the dispatcher. All design and review happens in subagents — direct production bypasses the gates that make the trust report honest, and direct exploration fills the orchestration context with artifacts the agents will re-read anyway. Concretely, during EXECUTE:

- DESIGN.md / JOURNEY.md / tokens / mocks are produced only inside dispatched agents
- A surface is critiqued only inside dispatched agents
- Every task runs; a task is skipped only via a BUILD agent's SKIP status
- A task starts only when its blockedBy list is empty
- A gate task that returned FAIL is never marked complete

**Exception: you handle git commits directly** — no subagent needed for git operations.

| Sub-phase | Agent |
|-----------|-------|
| N.1 BUILD | `design-build-agent` |
| N.2 REVIEW | `design-review-agent` |
| Commit | Orchestrator (you) |

**Agents load ONLY per-phase doctrine.** Each agent carries its own protocol and reads doctrine via the dispatch prompt's `## Doctrine` block — one `Read(path)` line per doctrine name, resolved via `docs/pillar-taxonomy.md §5` before dispatching.

### Execution Loop

Execute tasks in order. For each: verify blockedBy is empty → mark in_progress → dispatch → wait → on FAIL do NOT mark complete (Gate Failure Protocol) → on success mark complete → if it is the phase's last task, commit → proceed.

### Sub-Phase N.1 — BUILD (dispatch `design-build-agent`)

Dispatch the build-agent. For **Full / Standard**, include discovery; for **Minimal**, say "minimal gate" (the agent's Mode Detection skips discovery).

```
Agent tool:
- subagent_type: "design-build-agent"
- model: [phase's **Model:**, or omit]
- description: "BUILD Phase N"
- prompt: |
    Build Phase N of the design plan. [Full/Standard: "Two parts —
    1. Discovery + Design (scope, gaps, design decisions, map DW items to
    design execution evidence); 2. Production (draft → produce → validate).
    Write the discovery file before producing."]
    [Minimal: "This phase uses minimal gate policy — skip discovery, produce
    directly from the plan description, then validate each DW item with
    design execution evidence."]

    ## Plan Context
    [paste the plan's Context — 2-3 sentences, for goal anchoring]

    ## Progress
    [Phase 1: "This is the first phase." | Phase N>1: "Completed: Phase 1: …
    — [Summary line from the execution log]. …" Current: Phase N of M]

    ## Phase N: [name]
    [paste the phase description + Produces/artifact list from the plan]

    ## Done-When Items (DW-IDs)
    Each DW item must end in passing design execution evidence
    (contrast via palette.mjs / mock renders via prototype / tokens applied).
    A DW item without evidence is a gap. If any cannot be met, return UPDATE_PLAN.
    [paste ALL DW items from the phase, verbatim]

    [if the phase has a **Doctrine:** field with names other than `none`:]
    ## Doctrine
    Look up each name in docs/pillar-taxonomy.md §5, then Read() the file
    before starting work:
    - [doctrine names from the phase's **Doctrine:** field, one per line]

    ## Inputs
    - Plan file: [plan path]
    - Phase: N - [name]
    - DESIGN.md / JOURNEY.md at the project root if present.

    ## Output Files
    - Discovery + Design: .design-foundations/build/<plan-slug>-phase-N-discovery.md
      [omit for Minimal]
```

After BUILD returns, read its `### Status`: **DONE** → mark complete (Minimal: commit now; Full/Standard: proceed to REVIEW). **SKIP** → mark complete, skip REVIEW, append a SKIP execution-log entry, proceed. **UPDATE_PLAN** → pause and ask the user. **BLOCKED** → do NOT mark complete; debug/re-dispatch or escalate.

### Sub-Phase N.2 — REVIEW (dispatch `design-review-agent`)

Verify the BUILD task is complete. Then dispatch the review-agent.

**Debiasing rule (do not violate).** Give the reviewer **NO intent-framing** — do NOT include the plan's Context, any Progress block, the discovery file, or any account of what the build-agent did or intended. Requirements + the rendered artifact + edge cases only.

```
Agent tool:
- subagent_type: "design-review-agent"
- model: [resolved REVIEW model — BUILD model downgraded one tier; omit if no **Model:**]
- description: "REVIEW Phase N"
- prompt: |
    Independently critique the rendered design surface below against the
    requirements below. You did not produce it and have no information about
    how or why it was made. Do NOT assume it is good or finished. Re-derive
    every finding from the rendered artifact + the requirements alone.

    ## Requirements to verify (Done-When items)
    For EACH item fill the template. A PASS verdict REQUIRES evidence from the
    rendered surface (a pixel observation, a contrast value, an applied token) —
    not "produced". Do NOT skip items. Do NOT introduce unlisted requirements.
    [paste ALL DW items from the phase, verbatim]

    [if the phase has **Edge cases:**]
    ## Edge cases — verify handling
    These have the same verdict standing as the DW items: an unhandled listed
    case is a FAIL, not a Note.
    [paste the phase's edge cases verbatim]

    ## The rendered artifact
    - Screenshot: [path from BUILD's report, or "none — browser MCP down"]
    - .html / mock: [path(s) from BUILD's report]
    - DESIGN.md / JOURNEY.md at the project root if present (the contract the
      surface should honor).

    ## Dual-blind review — run BOTH assessments
    Assessment A: your cross-pillar critique. Assessment B: the
    deterministic detector — run `node scripts/detect.mjs [.html/mock
    path(s) from BUILD's report]` FIRST, redirected to a file you do not
    read until Assessment A's findings are frozen (your protocol's
    isolation rule). A skipped detector on a rendered .html is a FAILED
    review run; no rendered artifact (spec-only phase) → detector N/A,
    not a failure.

    [if the phase has a **Doctrine:** field with names other than `none`:]
    ## Doctrine
    Look up each name in docs/pillar-taxonomy.md §5, then Read() the file
    before reviewing:
    - [doctrine names from the phase's **Doctrine:** field, one per line]

    ## Output
    Write the review to: .design-foundations/build/<plan-slug>-phase-N-review.md
    Return: DESIGN-REVIEW [PASS|FAIL] and the report path.
```

After REVIEW: read the report. **PASS** → mark complete → commit. **FAIL** → do NOT mark complete → Gate Failure Protocol.

### Commit After Phase (orchestrator handles directly)

After the phase's last task completes, commit directly — no subagent:

```bash
git add .
git commit -m "[prefix]([scope]): [description]

[WHY this phase exists — design goal, key decisions, the gates it honored]

Phase: N/M \"[phase name]\"
Plan: .design-foundations/plans/[plan-file].md
AI-Model: [model used]
AI-Epistemic-Status: [tested (evidence passed) | assumed | provisional]
Gate-Policy: [Full|Standard|Minimal]
Review: [pass | skipped (Minimal) | fail->pass (N attempts)]"
```

Then append the execution-log entry to the plan file:

```markdown
### Phase N: [Name] (Gate: [level])
- [x] BUILD: Discovery + design + production complete [or "Minimal — produced directly"]
- [x] REVIEW: PASS [or "SKIPPED — Minimal gate (design execution evidence is the gate)"]
- [x] Committed
Commit: [hash]
Summary: [1 sentence — what this phase delivered (DESIGN.md locked / JOURNEY.md page specs / tokens / mocks) and the state it left the design in]
```

**The Summary line feeds the next phase's `## Progress` block** — write it as goal anchoring, not telemetry. State: "Phase N complete. Committed. Proceeding to Phase N+1."

### Gate Failure Protocol

When BUILD or REVIEW returns FAIL: the failed task stays `in_progress`. Re-dispatch at most 3 times (fix the dispatch/inputs, not the requirement — never weaken a contrast/token requirement to make a phase pass). After 3 failures, STOP and escalate to the user with the blocker — never silently retry a 4th time.

---

## Phase 4: VERIFY (Whole-Design Evidence)

Across the finished artifact set, confirm the design execution evidence holds (workflow-conventions.md §3):

| Check | Pass condition |
|-------|----------------|
| Contrast | `palette.mjs` exits 0 / its WCAG report passes for the final tokens (both light + dark ramps) |
| Token coverage | Semantic aliases resolved; type scale present; functional colors present; no hard-coded hex in the final mocks |
| Render | Every final mock `.html` opens without errors; screenshots captured (or graceful note) |
| Heuristic | No unresolved Critical findings across the phase reviews; Majors resolved or explicitly accepted |
| Artifact presence | DESIGN.md locked; JOURNEY.md page specs present; final mocks exist |

| Condition | Action |
|-----------|--------|
| All evidence holds, no skipped tasks | Proceed to REPORT |
| A contrast/token check fails | Fix the tokens (re-run palette.mjs), re-verify — never lower the target |
| A mock does not render | Fix and re-verify |

---

## Phase 5: REPORT (Trust Report)

Set `**Status:** complete`, `**Completed:** YYYY-MM-DD HH:MM`, `**Duration:**`. The execution log is already populated per phase.

The summary is a **trust report**, not a status dashboard — the user needs to verify what was built. Gate metadata lives in the commit trailers (`git log --format="%(trailers)" <first>..HEAD`).

```markdown
# Build Complete: [plan name]

## Design Evidence Summary
- **Contrast:** PASS (palette.mjs exit 0, light + dark)
- **Token coverage:** [resolved / gaps]
- **Mocks:** [N rendered; screenshot paths or graceful notes]
- **Heuristic:** [no unresolved Critical; Majors: resolved / accepted-with-rationale]

## Final Artifacts
- DESIGN.md (locked) · JOURNEY.md (page specs) · tokens · mocks/<page>.html …

## Manual Review Steps
1. Open each mocks/<page>.html and confirm the direction on real pixels.
2. [Edge cases worth eyeballing — surfaces, device classes from the plan]

## Follow-up
- [Major findings accepted for later, or "None identified"]

## Merge Instructions
[Worktree: merge feature/<slug> → main, then remove the worktree.
 Feature branch: merge feature/<topic> → main.]
```

---

## Error Handling

For blockers beyond the per-phase Gate Failure Protocol, and to resume a `blocked` plan: stop and document the blocker in the plan, set `**Status:** blocked`, present the user their options (fix-and-resume / re-plan / abort), and resume from the recorded `**Current Phase:**` checkpoint. Parallel builds must target different plan files — never run two build instances against the same plan.
