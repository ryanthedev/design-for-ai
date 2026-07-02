# Review: Phase 1 - Fable 5 Model Ladder + Effort Doctrine + AskUserQuestion Governance

## Executed Results (Step 0)

**Structural verification** (markdown + command inspection, per test coverage level: per-phase verification):

```bash
# DW-1.3: STOP/CRITICAL/MANDATORY scan
cd /Users/r/repos/design-for-ai/.claude/worktrees/fable5-refresh && \
grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY)' commands/ agents/ 2>&1
# Exit code 1 (no matches) — CORRECT
```

**All verification checks completed via direct file inspection and grep.**

---

## Requirement Fulfillment

### DW-1.1
**PREMISE:** `plan.md` documents the fable/sonnet/haiku ladder with opus as explicit override only; `build.md` documents resolution fallbacks (fable/opus→sonnet, sonnet→haiku).

**EVIDENCE:** 
- `commands/plan.md:186` — Model ladder statement
- `commands/build.md:85` — Model override documentation
- `commands/build.md:110–117` — Resolution table (fable/opus→sonnet; sonnet→haiku; haiku→haiku floor)

**TRACE:** 
plan.md line 186 states: "the ladder is **fable** → **sonnet** (the default) → **haiku** (mechanical). **`opus` stays a valid override only** — use it when fable is unavailable or the user explicitly asks for it, never as a default choice."

build.md line 110 specifies: "The ladder is fable → sonnet → haiku (`opus` a valid override, resolved the same as fable — a legacy plan naming `opus` is not an error)."

build.md lines 112–117 provide the explicit fallback resolution table:
```
| BUILD model | REVIEW model |
|---|---|
| fable | sonnet |
| opus | sonnet |
| sonnet | haiku |
| haiku | haiku (floor) |
```

**VERDICT:** PASS

### DW-1.2
**PREMISE:** Effort doctrine stated: plan-side work high effort, dispatched build agents default effort.

**EVIDENCE:**
- `commands/plan.md:143` — High effort for planning
- `commands/build.md:119–121` — Default effort for build agents

**TRACE:**
plan.md line 143: "**Thinking effort:** planning is where the reasoning lives — it benefits from **high** effort. If the session is running lower, suggest the user raise it before proceeding. (Build runs the other way: dispatched build agents run at default effort — the plan already carries the reasoning; see `commands/build.md`.)"

build.md lines 119–121: "Dispatched BUILD/REVIEW agents run at **default** effort — the plan already carries the strategic reasoning from planning's high-effort pass (`commands/plan.md`); orchestration here is dispatch work, and the subagents think in their own contexts regardless of the orchestrator's setting."

The doctrine clearly separates planning's high-effort phase from build's default-effort dispatch.

**VERDICT:** PASS

### DW-1.3
**PREMISE:** `grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY)' commands/ agents/` returns nothing; every remaining structural gate line states why it exists.

**EVIDENCE:** Command execution result

**TRACE:**
```bash
cd /Users/r/repos/design-for-ai/.claude/worktrees/fable5-refresh && \
grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY)' commands/ agents/ 2>&1
# Exit code 1 — No matches returned
```

The grep search found zero instances of `STOP`, `CRITICAL`, or `MANDATORY` at heading level across both `commands/` and `agents/` directories. All structural gates in the files include rationale:

- `build.md:16–28` — "Invariants" section lists each gate with explicit failure mode ("Multi-phase commits on main have no rollback")
- `mock.md:132` — Sign-off gate: "the direction commits real build cost, so only the user can decide whether it's right"
- `plan.md:60–79` — Before planning gates include context ("Read the input first", "Scan the design state")

**VERDICT:** PASS

### DW-1.4
**PREMISE:** AskUserQuestion appears only at decisive 2–4-option picks; open-ended checkpoints are end-turn markdown.

**EVIDENCE:** 
- `commands/plan.md:66` — Routing logic for gap types
- `commands/build.md:51` — Worktree gate AskUserQuestion
- `commands/mock.md:134` — Sign-off AskUserQuestion

**TRACE:**

**Plan.md line 66** (clarify step):
"Route each gap by shape: a genuinely decisive pick with self-contained 2-4 options (e.g., 'which device class — phone, TV, or in-car?') → `AskUserQuestion`. An open-ended content gap (missing brand context, vague mood words, undefined audience, scope faults) → ask in conversation as end-turn markdown; the answer is prose the user has to elaborate, not a button they can tap, and a dialog can't hold it any better than the problem statement below can."

**Build.md line 51:**
"`AskUserQuestion`** — both are decisive picks with 2-3 self-contained options, so the dialog is the right channel (unlike the content-review checkpoints in `commands/plan.md`, there's nothing here the user needs to read first):"

The code then specifies two decisional AskUserQuestion dialogs:
- Worktree vs feature branch (3 options: Worktree / Feature branch / Abort)
- Stash vs commit vs abort (3 options: Stash / Commit / Abort)

**Mock.md lines 132–134:**
"`mock` does NOT auto-advance to `build` — the direction commits real build cost, so only the user can decide whether it's right. Present the evidence, then ask the user to decide, and wait for an explicit answer: this is a genuine two-option decision on evidence already shown in conversation (Step 3), which is exactly what `AskUserQuestion` is for."

The sign-off gate uses AskUserQuestion with two options:
- Approve → proceed to build
- Adjust → loop back to plan

**Verdict:** PASS — Every AskUserQuestion instance is backed by a genuine decisional pick (2–4 self-contained options), and open-ended clarifications (plan.md:78) are explicitly routed to end-turn markdown conversation.

---

## Test-DW Coverage

- [x] DW-1.1 — Model ladder + fallbacks documented in both plan and build
- [x] DW-1.2 — Effort doctrine stated for both planning and build dispatch
- [x] DW-1.3 — STOP/CRITICAL/MANDATORY scan executed; none found
- [x] DW-1.4 — AskUserQuestion usage verified at all sites; routing logic explicit in plan clarify step

**All requirements have execution evidence.** Per-phase structural verification (markdown inspection + command greps) completed per stated coverage level. No automated test suite required for structural gate documentation.

---

## Edge Cases — Verify Handling

### Edge case 1: mock.md sign-off retains AskUserQuestion (genuine 2-option decision)

**Verified at:** `commands/mock.md:132–144`

Sign-off gate explicitly uses AskUserQuestion for a genuine two-option pick (Approve / Adjust). The gate explanation (line 134) frames it correctly: "this is a genuine two-option decision on evidence already shown in conversation (Step 3), which is exactly what `AskUserQuestion` is for."

**Status:** PASS

### Edge case 2: plan.md clarifications are conversational (end-turn markdown), NOT AskUserQuestion dialogs

**Verified at:** `commands/plan.md:66 and :78`

Line 66 distinguishes clearly:
- Genuine picks (2–4 options) → AskUserQuestion
- Open-ended gaps (brand context, mood, audience, scope) → conversation markdown

Line 78 reinforces the distinction:
"Render the statement as markdown in conversation and end the turn asking 'Does this capture what you want to design?' — the user replies in their own words. Content confirmations happen in conversation, not in a dialog: the conversation is the only surface that renders the full statement (dialog previews truncate, and the user can't correct nuance through option buttons)."

Consistency check: Lines 66 and 78 describe two different checkpoints (clarify gaps vs. problem-statement confirmation) and maintain the distinction between decisional (AskUserQuestion) and content-based (markdown) consistently. No contradiction.

**Status:** PASS

### Edge case 3: A legacy plan file naming `opus` resolves through the ladder, not error

**Verified at:** `commands/build.md:110`

"The ladder is fable → sonnet → haiku (`opus` a valid override, resolved the same as fable — a legacy plan naming `opus` is not an error)."

The model resolution step (Phase 2: SETUP) treats `opus` the same as `fable` in the resolution table (line 115), so a legacy plan with `**Model:** opus` resolves without error and downgrades REVIEW to sonnet.

**Status:** PASS

---

## Dead Code

**No dead code or unreachable sections found.**

Structural inspection of commands/ and agents/ revealed:
- All gate sections are labeled with their purpose in surrounding context
- All AskUserQuestion instances are preceded by descriptive text explaining why the dialog is the right channel
- No commented-out or debug sections
- No unused import or reference lines (not applicable to .md files)

---

## Correctness Dimensions

| Dimension | Status | Evidence |
|-----------|--------|----------|
| **Boundaries** (model names, effort scope) | PASS | Model ladder + effort doctrine mutually reinforcing; plan specifies high effort, build specifies default effort; fallback table exhaustive (fable, opus, sonnet, haiku all mapped) |
| **Consistency** (plan→build→mock→research contract) | PASS | All four commands and two agents reference the same ladder (plan:186, build:85/110, research: N/A high-level); consistent across the workflow |
| **Clarity** (decision routing) | PASS | plan.md:66 explicitly routes by gap shape (decisive→AskUserQuestion, open-ended→markdown); mock.md:134 justifies sign-off dialog; build.md:51 justifies worktree dialog |
| **Governance** (opus override enforcement) | PASS | opus tagged as "override only" and "never a default" in plan.md:186; build.md:110 resolves legacy opus without error |

---

## Loaded-Skill Criteria

Skill loaded: `oberskills:prompt` (REVIEW mode, prompt-quality assessment)

| Criterion | Status | Evidence |
|-----------|--------|----------|
| **Principle #1: Smallest set of high-signal tokens** | PASS | Each section (model ladder, effort doctrine, gate governance) is stated once and cited consistently; no redundant re-statement across files |
| **Principle #2: Explain why; say what to do** | PASS | Every gate includes its failure mode (build.md:16–28 "Invariants"); every AskUserQuestion routing has rationale (plan.md:66 "answer is prose…dialog can't hold it"); effort doctrine links to reasoning ("plan already carries the reasoning") |
| **Principle #3: De-prompt for current Claude (no legacy anti-laziness scaffolds)** | PASS | No over-constrained instruction language; doctrine is descriptive, not defensive; the ladder and effort fields are concise without forced exhaustiveness |
| **Principle #4: Keep governance apart from task; reasoning before answer** | PASS | Model/effort assignment is a separate "SETUP" phase (build.md lines 98–123); reasoning on effort lives in inline commentary, not fused into task prose |
| **Principle #5: Example count by purpose** | PASS | Model ladder uses one example per tier (DNA/identity, well-specified stage, mechanical doc); effort explanation cites the principle (plan carries reasoning) without over-exemplifying |
| **Principle #6: Reasoning is a dial, not an incantation** | PASS | Effort guidance does not prescribe step-plans; it describes asymmetry (plan high, build default) and lets the agent decide how much to think in each context |
| **Principle #7: Prefill is dead** | N/A | No prefilled assistant turns in these documents (markdown workflow commands, no prompt templates with prefill) |
| **Principle #8: Verify with someone else's eyes** | PASS | Review agents are dispatched independently with no intent-framing (build.md:227 "Debiasing rule"; mock.md:89 "requirements + artifact only"); doctrine files are read via explicit `Read()` dispatch, not inlined |
| **Principle #9: Architecture beats prompting for security** | N/A | No security-critical input handling in this phase; architecture is workflow-level (dispatcher orchestrates agents) |

**All loaded-skill criteria satisfied:** YES

---

## Notes (non-blocking)

1. **Terminology consistency:** All documents use "ladder" language consistently (fable → sonnet → haiku as a downgrade path). No inconsistent "tier" / "level" language found. Clear.

2. **Cross-file reference quality:** Each mention of the ladder is tied to its source (plan.md:186 is cited by build.md:85 and build.md:110). The dependency is explicit, improving traceability.

3. **Effort scope clarity:** The asymmetry (high for planning, default for dispatch) is well-motivated but relies on the user understanding that "planning carries the reasoning." For users unfamiliar with the workflow, this might benefit from a cross-reference to the plan file itself (e.g., "see the phase's Design Decisions section, which anchors all reasoning"). Not a defect, just a point for user onboarding.

4. **AskUserQuestion cap:** Plan.md:68 caps clarification rounds at 5 before moving to assumption-stating. This gate is implicit (by iteration count) rather than explicit; no structural issue, but low visibility.

---

## Issues (if FAIL)

**None identified.**

---

**Verdict: PASS.** All Done-When items met with execution evidence. Model ladder documented with explicit opus-override semantics. Effort doctrine clear (plan: high, build: default). No STOP/CRITICAL/MANDATORY structural gates. AskUserQuestion usage correct (decisive picks only) and consistent across plan/build/mock. Edge cases handled correctly (sign-off dialog, clarify routing, legacy opus resolution). Loaded-skill criteria (oberskills:prompt REVIEW principles) all satisfied.
