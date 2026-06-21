# Review: Phase 5 - Design Workflow Commands (mock + build)

## Executed Results (Step 0)

- Test suite: N/A — markdown command files; no unit tests (per dispatch: desk-check + grep)
- Desk-check greps: `bash phase-5-review-scratch.sh` → all checks returned matches; zero "NOT FOUND — FAIL" lines
- Typecheck: N/A
- Lint: N/A

All execution evidence below is quoted from grep output of the scratch run.

---

## Requirement Fulfillment

### DW-5.1
PREMISE:  "commands/mock.md exists — it dispatches design-build-agent (to produce a mock via the prototype skill) AND design-review-agent (a cheap cross-pillar validation), presents the screenshot + findings, gates on user sign-off, and chains to build on approve / loops to plan on reject."
EVIDENCE:
- File exists: confirmed (scratch EXISTENCE CHECKS)
- design-build-agent dispatch: mock.md:47 `- subagent_type: "design-build-agent"`
- design-review-agent dispatch: mock.md:93 `- subagent_type: "design-review-agent"`
- prototype skill routing: mock.md:52 `mock via the 'prototype' skill; do not hand-roll HTML.`; mock.md:43 explains the agent routes the mock through the prototype skill — not inlined
- Screenshot presentation: mock.md:121-126 `## Step 3 — Present the screenshot + findings` — screenshot, fidelity flag, severity-ranked findings (Critical / Major / Minor)
- Sign-off gate: mock.md:132 `## STOP — Sign-off Gate (MANDATORY — do not proceed silently)`; mock.md:134 "mock does NOT auto-advance to build … never proceed without an explicit answer"
- Approve → build: mock.md:147 `| **Approve** | Chain to build: '/design-for-ai:build [plan path]'`
- Reject → plan loop: mock.md:148 `| **Adjust / reject** | Loop back: '/design-for-ai:plan [plan path]'`; mock.md:150 "there is no silent proceed"
TRACE: User invokes mock → reads plan/DESIGN.md state → dispatches design-build-agent (prototype skill, produces .html + screenshot) → dispatches design-review-agent (debiased, produces severity-ranked findings) → Step 3 presents screenshot + ranked findings → Sign-off gate asks explicit question → Approve chains /design-for-ai:build; Adjust loops /design-for-ai:plan
VERDICT: PASS

### DW-5.2
PREMISE:  "commands/build.md exists — has a worktree gate, a per-phase BUILD→REVIEW→commit loop dispatching the two agents, gate resolution (Full/Standard/Minimal), an execution log, and a final trust report."
EVIDENCE:
- File exists: confirmed (scratch EXISTENCE CHECKS)
- Worktree gate: build.md:32 `### Worktree Gate (MANDATORY — first check, non-negotiable)`; build.md:63 "This gate is NON-NEGOTIABLE — never proceed on main/master under any circumstances."
- BUILD→REVIEW→commit loop: build.md:107-108 `| **Full** | BUILD → REVIEW → commit |`; build.md:116-119 task creation; build.md:141 Sub-Phase N.1 BUILD; build.md:193 Sub-Phase N.2 REVIEW; build.md:240 commit after phase
- Gate resolution Full/Standard/Minimal: build.md:103-109 — three-tier resolution with priority ordering (Pipeline override → Gate field → risk fallback); all three levels named with their sub-phases
- Execution log: build.md:26 "Update the execution log"; build.md:258 "append the execution-log entry to the plan file"; build.md:299 "The execution log is already populated per phase"
- Trust report: build.md:299-325 `## Phase 5: REPORT (Trust Report)` — Design Evidence Summary, Final Artifacts, Manual Review Steps, Follow-up, Merge Instructions
TRACE: User invokes build → Worktree Gate checks branch → resolves gate level → SETUP creates phase tasks → EXECUTE loop: BUILD dispatch → REVIEW dispatch → orchestrator commits + appends execution-log entry → after all phases: VERIFY whole-design evidence → REPORT emits trust report
VERDICT: PASS

### DW-5.3
PREMISE:  "both commands DISPATCH the agents by name (subagent_type design-build-agent / design-review-agent) rather than reimplementing the agent logic inline; mock routes its mock through the prototype skill."
EVIDENCE:
- mock.md subagent_type lines: mock.md:47 `subagent_type: "design-build-agent"`; mock.md:93 `subagent_type: "design-review-agent"`
- build.md subagent_type lines: build.md:147 `subagent_type: "design-build-agent"`; build.md:201 `subagent_type: "design-review-agent"`
- Agent files are real: agents/design-build-agent.md and agents/design-review-agent.md both confirmed present
- No inline design logic: both commands contain `## CRITICAL: DO NOT DO THE DESIGN WORK DIRECTLY` (build.md:125) / equivalent in mock.md:10 ("dispatches the two agents — it never inlines the design or the review work")
- Prototype routing: mock.md:43 "The agent routes the mock through the prototype skill (its Render evidence path) — that is how mock consumes the prototype skill without inlining it."; mock.md:52 `mock via the 'prototype' skill; do not hand-roll HTML.`
TRACE: mock invoked → dispatch to design-build-agent with explicit subagent_type + instruction to use prototype skill (not hand-rolled) → design-build-agent resolves prototype at execution time → mock.md contains no rendering code itself
VERDICT: PASS

### DW-5.4
PREMISE:  "mock's sign-off gate and build's worktree gate are EXPLICIT and blocking — rejecting the mock loops back to plan (no silent proceed); build does not proceed on main/master."
EVIDENCE:
- mock sign-off gate explicit + blocking: mock.md:132 `## STOP — Sign-off Gate (MANDATORY — do not proceed silently)`; mock.md:134 "This gate is a user decision — never resolve it yourself, never proceed without an explicit answer."; mock.md:150 "Never proceed to build without an explicit Approve. A rejected (or unanswered) direction loops to plan — there is no silent proceed"
- Reject loops to plan: mock.md:148 `/design-for-ai:plan [plan path]` with review findings carried; mock.md:150 explicit "looping to plan/Design with the findings; not proceeding to build"
- Build worktree gate explicit + blocking: build.md:32 `### Worktree Gate (MANDATORY — first check, non-negotiable)`; build.md:46 `| On 'main'/'master', clean | **Block — ask the user (below)** |`; build.md:63 "This gate is NON-NEGOTIABLE — never proceed on main/master under any circumstances."
TRACE: mock: user gives no explicit Approve → gate condition not met → command states "looping to plan/Design" and invokes /design-for-ai:plan, never /design-for-ai:build. build: current branch is main/master → `git branch --show-current` → table row matches → Block + user prompt (Worktree / Feature branch / Abort) → execution stops until user resolves
VERDICT: PASS

---

## Test-DW Coverage

This is a markdown command file substrate — no automated test framework exists. Per the dispatch: "desk-checked observed behavior + internal-consistency checks."

| DW Item | Coverage method | Evidence |
|---------|-----------------|----------|
| DW-5.1 | Desk check: grep + line-by-line read of mock.md | All sub-requirements grepped to specific lines; full read above |
| DW-5.2 | Desk check: grep + line-by-line read of build.md | All sub-requirements grepped to specific lines; full read above |
| DW-5.3 | Desk check: grep for subagent_type in both files + agent file existence check | 4 subagent_type lines confirmed; agent files confirmed present |
| DW-5.4 | Desk check: grep for MANDATORY, blocking language, no-silent-proceed language | All key strings confirmed at specific lines |

All DW items covered by recorded observed behavior (desk check). No automated test is possible for markdown command files.

---

## Edge Cases

### EC-1: mock with no DESIGN.md yet → prototype wireframe mode + flag
EVIDENCE: mock.md:33 `| DESIGN.md absent or not locked | **Wireframe** — greyscale defaults | "Design isn't locked yet — this is a wireframe checkpoint. The core 'design' mode establishes tokens."` The table is evaluated before the build-agent dispatch. mock.md:63 passes `Fidelity: [styled if DESIGN.md locked, else wireframe]` into the agent prompt. mock.md:68 the DW-MOCK.2 item explicitly says "when absent, wireframe greyscale defaults are used and flagged." mock.md:125 `- The fidelity used, and the "Design isn't locked" flag if it applies.` — presented in Step 3.
VERDICT: PASS

### EC-2: build on main → worktree gate blocks
EVIDENCE: build.md:46 `| On 'main'/'master', clean | **Block — ask the user (below)** |`; build.md:49 "When on main/master, ask and do not proceed until resolved"; build.md:63 "NON-NEGOTIABLE — never proceed on main/master under any circumstances." The gate runs as Phase 1's first action before any design work.
VERDICT: PASS

### EC-3: user rejects mock direction → loops back to plan/Design, does not proceed to build
EVIDENCE: mock.md:148 `| **Adjust / reject** | Loop back: '/design-for-ai:plan [plan path]', carrying the review findings (especially Critical/Major)`; mock.md:150 "Never proceed to build without an explicit Approve. A rejected (or unanswered) direction loops to plan — there is no silent proceed." The table covers both explicit reject and no-answer (unanswered), both route to plan.
VERDICT: PASS

---

## Dead Code

None found. Both command files are fully referenced (mock.md's three steps are all load-bearing; build.md's five phases are all referenced in the flow).

---

## Correctness Dimensions

| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | Markdown command files; no concurrent execution paths |
| Error Handling | PASS | mock.md:81 handles BLOCKED / UPDATE_PLAN from build-agent (surface to user, stop); build.md:191 handles DONE / SKIP / UPDATE_PLAN / BLOCKED from BUILD; build.md:238 handles PASS / FAIL from REVIEW; build.md:273 Gate Failure Protocol caps retries at 3 then escalates |
| Resources | N/A | No file handles, connections, or threads |
| Boundaries | PASS | mock.md:32-35 explicit table handling all DESIGN.md states (locked / absent / JOURNEY.md present/absent); build.md:79-83 covers plan states (ready / in-progress / complete / blocked) |
| Security | N/A | No untrusted input paths; both commands read user-supplied plan paths from $ARGUMENTS with existence checks |

---

## Notes (non-blocking)

1. **Prompt skill observation (DW-5.3 / agent skill):** The dispatch prompts inside both commands are well-structured per the prompt skill's principles — objective, output format, and debiasing rule are present. The build-agent dispatch prompt template at build.md:151 uses `[Full/Standard: "…"] [Minimal: "…"]` bracket notation which requires the orchestrator to substitute the right clause; this is a documentation choice, not a defect.

2. **Unanswered sign-off:** mock.md:150 explicitly covers the "unanswered" case as equivalent to reject ("A rejected (or unanswered) direction loops to plan"). This is correct behavior and correctly specified.

3. **Trust report vs. execution log:** The trust report (Phase 5: REPORT) is a summary for the user; the per-phase execution log entries are the machine-readable record. The distinction is clearly maintained in build.md:299. Non-blocking.

4. **Gate Failure Protocol re-dispatch limit:** build.md:273 caps retries at 3 and escalates. The counter-reset path (what resets the counter if the user manually fixes something) is unspecified, but this is an operational edge case not listed in the DW items or edge cases.

---

**Verdict: PASS**
