# Review: Phase 3 - commands/plan.md

## Executed Results (Step 0)

- File existence: `ls -lh /Users/r/repos/design-for-ai/commands/plan.md` → `-rw-r--r-- 1 r staff 17K Jun 20 18:38` — FILE EXISTS
- Test suite: N/A — markdown command file; no automated tests applicable
- Typecheck/lint: N/A — desk-check + grep-based internal-consistency verification (shell checks written to `.code-foundations/build/phase-3-review-scratch.sh` and executed)
- All grep checks ran to completion with no errors

---

## Requirement Fulfillment

### DW-3.1
PREMISE:  "commands/plan.md exists; its flow mirrors the code-foundations plan sequence — classify complexity → clarify → confirmed problem statement → decompose → detail phases → save → present."
EVIDENCE:
- File exists: `commands/plan.md` (17K, Jun 20 18:38)
- Classify: `## STOP - Quick Classification` at line 46; complexity tracks Quick/Standard/Full
- Clarify: `### 1. Clarify gaps` at line 64; `Load Skill(clarify)` + AskUserQuestion loop
- Confirmed problem statement: `### 2. Problem statement` at line 70; `**No plan writing begins until the problem statement is confirmed.**` (line 78)
- Decompose: `1. **Decompose (skeleton).**` Quick track line 121; `### DECOMPOSE — fix the shape first` Standard/Full line 145
- Detail phases: `3. **Detail each phase**` line 125; `### DETAIL — one phase at a time` line 170
- Save: `5. **Finalize the file**` line 129; `### SAVE — annotate and validate` line 184
- Present: `7. **Present and handoff**` line 133; `## PRESENT and HANDOFF (all tracks)` line 258
TRACE: `$ARGUMENTS` received → design-state scan → Quick Classification → Before Planning (clarify gaps → problem statement confirmed) → Decompose skeleton → Detail phases → Cross-cut → Save/Finalize → Check → Present → Handoff to mock
VERDICT: PASS

### DW-3.2
PREMISE:  "phases map to the design lifecycle (Discover/Design stages); each phase carries a `**Skills:**` field naming matched design pillar(s), and design done-when items use the token/contrast/artifact/heuristic vocabulary (not code/test vocabulary)."
EVIDENCE:
- Stage table at lines 86–94 maps every stage to Discover or Design:
  - `Discover — JTBD + IA` → `journey` → JOURNEY.md (line 88)
  - `Discover — flows + page specs` → `journey` → JOURNEY.md (line 89)
  - `Design — DNA + tokens` → `design-for-ai` → DESIGN.md locked (line 90)
  - `Design — type + color` → `design-for-ai` fonts/color → DESIGN.md (line 91)
  - `Design — design system` → `design-systems` (line 92)
  - `Design — words` → `content-design` (line 93)
  - `Design — data surfaces` → `data-viz` (line 94)
- `**Skills:**` field mandated in phase template at line 200; required in skeleton (line 121) and Finalize step (line 129); Skills validation rule at line 190
- All pillar names in plan.md (`journey`, `design-systems`, `content-design`, `data-viz`, `usability`, `behavioral`, `deceptive-patterns`, `ai-native`, `design-for-ai`) match the canonical list in `docs/pillar-taxonomy.md`
- Design done-when vocabulary section at lines 219–226 prescribes: contrast (`WCAG AA ≥4.5:1`, `palette.mjs`), token coverage (`--background`, `--surface`, `--text`, `--accent-solid`, `--text-xs`…`--text-4xl`), artifact presence (`DESIGN.md locked`, `JOURNEY.md ## Page specs`), heuristic pass (design-review-agent cross-pillar synthesis)
- No code/test vocabulary found in grep scan (`unit test`, `npm test`, `jest`, `compile`, `CI pass` — 0 hits)
TRACE: phase template (line 196) requires `**Stage:** [Discover | Design]` + `**Skills:** [matched pillar(s)]` + done-when items drawn from design vocabulary sub-list; stage map (line 86) binds every lifecycle stage to a specific pillar from the taxonomy
VERDICT: PASS

### DW-3.3
PREMISE:  "the plan output gates the Design stage behind a locked DESIGN.md and flows behind JOURNEY.md; the lifecycle DAG is acyclic (no phase depends on a later one — verify there are no back-edges in the stated dependencies)."
EVIDENCE:
- DESIGN.md gate: explicitly stated at line 111 (`**DESIGN.md is locked before tokens, the design system, styled mocks, or any build Design phase.**`); echoed in SAVE section at line 189 (`**Gate:** **Full** for the DNA phase`) and CHECK checklist at line 242
- JOURNEY.md gate: explicitly stated at line 110 (`**JOURNEY.md page specs exist before any Design page work.**`); echoed in CHECK checklist at line 242
- DAG diagram at lines 102–106:
  ```
  research ─▶ JOURNEY.md ─▶ DESIGN.md(locked) ─▶ tokens / design-system
                   │               │                      │
                   └───────────────┴──▶ content + data compose ─▶ (mock)
  ```
- DAG acyclicity analysis: all arrows point strictly left-to-right or left-to-right-down. No node on the right feeds a node on the left. Edges: research→JOURNEY.md, JOURNEY.md→DESIGN.md(locked), DESIGN.md→tokens/design-system, JOURNEY.md+DESIGN.md→content+data compose, content+data+design-system→mock. No back-edges exist.
- The DAG is declared acyclic at line 100 (`The DAG is **acyclic** — no stage's output feeds a stage it depends on.`), and the cycle-detection rule is stated at line 113.
TRACE: Any phase producing DESIGN.md(locked) must complete before any phase consuming tokens/design-system/styled-mocks; JOURNEY.md must exist before any Design page work; diagram has no back-edges → invariant holds
VERDICT: PASS

### DW-3.4
PREMISE:  "it reads a research doc as a seed and does NOT re-derive intent from scratch; it chains to the mock stage (names `/design-for-ai:mock`)."
EVIDENCE:
- Research doc reading: lines 16–23: `$ARGUMENTS` path handling; `Read it. Its confirmed brief seeds the problem statement directly — you clarify only the gaps it left open, not the whole brief.` (line 18); `**Do not re-derive the brief from scratch** — read it, then fill only the gaps.` (line 23)
- Chains to mock: explicit invocation string at lines 264–267: `On approve, hand off to mock — the cheap go/no-go on rendered pixels before the full build:` followed by `/design-for-ai:mock .code-foundations/plans/<plan>.md`
- Chain section at line 276–277: `**Receives from:** research (via the research doc), or a direct brief. **Chains to:** mock (via the saved plan file).`
TRACE: `$ARGUMENTS` = research doc path → `Read` the file → use confirmed brief as seed → fill only gaps → … → PRESENT → approve → `/design-for-ai:mock <plan>`
VERDICT: PASS

### DW-3.5
PREMISE:  "mid-lifecycle entry is documented — given an existing DESIGN.md, the flow resumes at the Design stage and does not redo Discover."
EVIDENCE:
- `## STOP - Scan the Design State (sets the entry stage)` section at lines 27–43: shell command `ls DESIGN.md JOURNEY.md 2>/dev/null` at line 32
- State routing table at lines 35–40:
  - `DESIGN.md locked` → `Design — continue` → `Skip Discover and DNA; plan the remaining Design stages`
  - `Both` → `Design — compose` → `Plan only the unfinished Design stages`
- Explicit prohibition: line 42: `**Never redo a stage whose gating artifact already exists.**`
- Output statement required: `State the entry stage explicitly: "DESIGN.md is locked — resuming at the Design stage; Discover is already done."` (line 42)
- Resume-aware rule in Standard/Full DECOMPOSE: line 152: `the skeleton omits the Discover phases entirely (their artifacts already exist) and starts at the first unsatisfied Design stage. Say which phases were skipped and why.`
- CHECK checklist entry at line 248: `Resume: if entry was mid-lifecycle, the skipped stages' artifacts actually exist; no redone work.`
TRACE: `ls DESIGN.md JOURNEY.md` → DESIGN.md found locked → table routes to `Design — continue` → `Never redo` rule fires → plan covers only remaining Design stages → CHECK verifies no redone work
VERDICT: PASS

---

## Edge Case Coverage

### Simple ask → Quick track (1-2 phases)
EVIDENCE:
- `## STOP - Quick Classification` at line 46; table at lines 50–54: `One surface, focused ask. "make this landing page feel premium."` → **Quick** track
- `**Default to Quick.**` at line 56: `Under-planning a simple design is cheap to fix; over-planning a one-surface polish wastes the user's time.`
- Quick track section at lines 117–135 prescribes `1-2 phases` explicitly (line 121: `For each of the 1-2 phases write only…`)
- Timing constraint: `Quick stays compressed: under 3 minutes from invocation to handoff.` (line 135)
VERDICT: PASS — Quick track is the default and is explicitly capped at 1-2 phases

### Existing DESIGN.md → resume at Design, skip Discover
EVIDENCE: Identical to DW-3.5. The implementation is concrete: the `ls` shell command runs before classification, the state table routes DESIGN.md-locked to `Design — continue`, and the `Never redo` rule prohibits repeating any stage with an existing gating artifact.
VERDICT: PASS — implemented, not just mentioned

---

## Test-DW Coverage

This is a markdown command file. No automated tests apply. Verification performed via:
- Desk check: full file read with line-precise evidence for each DW item
- Shell grep checks: executed in `phase-3-review-scratch.sh` confirming presence of required strings, flows, vocabulary, pillar names, and DAG structure
- DAG acyclicity: reasoned manually from the diagram at lines 102–106 — all edges verified left-to-right with no back-edges

Coverage assessment: all 5 DW items and both edge cases have recorded observed behavior per Step 2 fallback (desk-check + command output). Test Coverage Level "desk-checked observed behavior + internal-consistency checks" — matched.

---

## Dead Code

None found. No unreachable branches, debug statements, or commented-out blocks. The `CROSS-CUT` step is defined in both the Quick track (step 4, line 127) and Standard/Full (line 182), consistently used.

One observation: the Quick track step numbering goes 1→2→3→4→5→6→7, but step 6 and step 7 are labeled "(step shared with Standard/Full — see below)" and defer to later sections. This is intentional cross-referencing, not dead code.

---

## Correctness Dimensions

| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | Markdown command file — no concurrent execution paths |
| Error Handling | PASS | Path-not-found case handled (line 19: `say so ("No file at \`<path\>`…")`); empty `$ARGUMENTS` case handled (line 21: `ask the user what they want to design`); CHECK agent handles FINDINGS (line 254: `fix; structural fixes → re-run CHECK`) |
| Resources | N/A | No file handles, connections, or caches |
| Boundaries | PASS | Clarify loop is capped at 5 rounds (line 68); phase count cap of 7 stated for Standard/Full (line 155); Quick track capped at 1-2 phases (line 121) |
| Security | N/A | Markdown command file — no untrusted input processing |

---

## Notes (non-blocking)

1. The `**Stage:**` field appears in the Quick track skeleton step (line 121) and the phase template (line 198), but the Quick track step 1 says to write the skeleton directly to the plan file (line 121: `Write this skeleton to the plan file`) before the skeleton checkpoint, while the Standard/Full track does the reverse (skeleton checkpoint first via AskUserQuestion preview, file write after). This is intentional design: Quick has fewer phases and the checkpoint is for 2-phase splits only (1-phase skips it per line 123). No inconsistency — just noting the asymmetry.

2. The DAG diagram at lines 103–106 uses a slightly unconventional notation for the fan-in at `content + data compose` (JOURNEY.md and DESIGN.md both feed it via a joined arrow). The semantics are unambiguous and correct; a reader seeing it for the first time might need to trace the lines carefully, but it is internally consistent.

3. `workflow-conventions.md` is cited several times (lines 10, 42, 84, 219) but is not in the files-to-review list. The plan.md references it as the authoritative source for lifecycle/gate/vocabulary definitions and explicitly says it `cites it rather than restating it` (line 10). This is architecturally correct (no duplication; cite-down pattern), and not a defect in the plan.md artifact itself.

---

**All requirements met:** YES

**Verdict: PASS**
