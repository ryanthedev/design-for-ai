# Discovery + Design: Phase 1 - Orchestration refresh — model ladder, effort, checkpoints, calm gates

## Assumption Verification

Plan's Assumption row: "code-foundations refresh diffs (7b8d974, d8ed1d9, be0926a) are final (MEDIUM confidence)."

Checked:
```
git -C /Users/r/repos/code-foundations log --oneline -3
  ab3aeab Merge branch 'refresh/fable-sonnet-5': v6.0.0 Fable/Sonnet 5 refresh
  20eb96f fix: resolve fable skill-craft review findings (1 major, 7 minor)
  85d32b0 fix: apply adversarial-review findings across orchestration and planner
git -C /Users/r/repos/code-foundations status --short commands/
  (clean)
```
HEAD moved past 17a39c4 (the commit named in the plan's fallback trigger) — the `refresh/fable-sonnet-5` branch merged to main as v6.0.0 and `commands/` is clean (no uncommitted changes). **Per the plan's own fallback instruction, this counts as "moved past 17a39c4," so I used the CURRENT state of 7b8d974 and d8ed1d9 as the reference shape** (both commits are still present and unchanged in the merged history — `git log --all` confirms 7b8d974, d8ed1d9, be0926a all exist verbatim). The extra commits between them (20eb96f, 85d32b0) are review-fix commits on OTHER files (skills/planning polish, adversarial-review findings) — I diffed 7b8d974 and d8ed1d9 directly (their content is unchanged by the later fixes for the specific hunks this phase mirrors) and cross-checked the final merged `commands/plan.md` / `commands/build.md` state matches those diffs' end state. No delta affecting this phase's mirror.

Also verified (Constraints section): the `feature/doctrine-overhaul` merge (v4.0.0) already landed on design-for-ai's `main` — confirmed by reading the worktree's own `CLAUDE.md`, which describes the post-overhaul doctrine-Read() architecture (references/ doctrine domains, 4 skills, `docs/pillar-taxonomy.md` resolver, `scripts/palette.mjs`) rather than the old 8-pillar-skill v3.1.0 shape. This worktree targets the correct POST-overhaul tree.

## Files Found

All six in-scope files exist and were read in full:
- `commands/research.md` — no STOP/CRITICAL/MANDATORY headers, no `**Model:**` field, no AskUserQuestion needing conversion, no effort mentions. No changes needed.
- `commands/plan.md` — 3 STOP headers; 4 AskUserQuestion sites (clarify-loop, problem-statement confirm, 2 skeleton checkpoints, present/handoff); Model bullet uses old `opus`-first ladder; effort line says "max effort."
- `commands/mock.md` — 2 STOP headers (one MANDATORY); 1 AskUserQuestion (sign-off — explicitly a keeper per the phase's Edge cases).
- `commands/build.md` — "Crisis Invariants — NEVER SKIP" header (not literally STOP/CRITICAL/MANDATORY, but same all-caps-imperative pattern the reference diff converts); "Worktree Gate (MANDATORY...)" header; "CRITICAL: DO NOT DO THE DESIGN WORK DIRECTLY" header; Model Resolution table uses old opus→sonnet→haiku (2-tier) ladder with no fable row; no effort-doctrine statement; the "ask the user" prompts (main/master, dirty tree) are markdown-described but never explicitly invoke `AskUserQuestion`.
- `agents/design-build-agent.md` — 2 STOP headers (Load Doctrine, Read Input Files). No Model/effort/AskUserQuestion content (agents don't dispatch or ask the user).
- `agents/design-review-agent.md` — 2 STOP headers (Load Doctrine, Read Input Files). Same — no Model/effort/AskUserQuestion content.

## Current State

`grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY)' commands/ agents/` (pre-change) returns 9 hits across `commands/mock.md` (2), `commands/build.md` (1), `commands/plan.md` (3), `agents/design-review-agent.md` (2), `agents/design-build-agent.md` (2) — 10 lines total (see Gaps).

`grep -n 'AskUserQuestion' commands/ agents/` (pre-change) returns 6 hits, all in `commands/plan.md` (5) and `commands/mock.md` (1). Of plan.md's 5: 1 is the clarify-loop (targeted question-asking, stays), 4 are content-review checkpoints wrongly wearing the decisive-pick tool (problem statement, 2 skeleton checkpoints, present/handoff summary).

## Gaps

| Gap | Plan says | Reality |
|---|---|---|
| Model ladder | fable/sonnet/haiku, opus explicit-override-only | plan.md: `opus` primary for DNA/identity phases, `[haiku\|sonnet\|opus]` bracket list; build.md: 2-tier `opus→sonnet, sonnet→haiku` REVIEW-downgrade table, no fable row |
| Effort doctrine | plan-side high, build agents default | plan.md says "max effort"; build.md states no effort doctrine at all |
| Calm gates | every STOP/CRITICAL/MANDATORY → rationale-stating gate | 10 STOP/CRITICAL/MANDATORY-pattern header lines across 5 files (see count above); `build.md`'s "Crisis Invariants — NEVER SKIP" and "Worktree Gate (MANDATORY...)" carry the same all-caps-imperative smell even though the literal grep pattern doesn't catch "Crisis" or the mid-string "MANDATORY" in the Worktree Gate header |
| AskUserQuestion scope | only decisive 2-4-option picks; open-ended → conversational | plan.md's problem-statement confirm, both skeleton checkpoints, and the present/handoff summary all wrap multi-section/free-form content in `AskUserQuestion` + `preview` — the exact anti-pattern the reference diff eliminates. build.md's worktree-gate asks (main/master, dirty tree) are genuine decisive 2-4-option picks but are never wired to the `AskUserQuestion` tool explicitly — they read as descriptive markdown only |

## Code Standards

No `docs/code-standards.md` in this repo (it's a markdown-plugin repo, not a code project) — confirmed via `ls docs/`: only `foundations-standards.md`, `pillar-taxonomy.md`, `workflow-conventions.md` exist, none of which is a code-standards file. Prose conventions instead come from `oberskills:prompt` (loaded) and the reference diffs' own shape (de-prompting: explain rationale, don't command).

## Test Infrastructure

No test framework — this is a markdown-plugin repo. "Tests" per the dispatch prompt are the DW items' grep/inspection checks, executed and captured as shell output below.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-1.1 | `plan.md` documents the fable/sonnet/haiku ladder with opus as explicit override only; `build.md` documents resolution fallbacks (fable/opus→sonnet, sonnet→haiku) | COVERED | `grep -n 'fable' commands/plan.md` shows ladder prose + bracket list; `grep -n 'opus' commands/plan.md` shows the override-only sentence; `grep -n 'fable\|opus\|sonnet\|haiku' commands/build.md` shows the 4-row Model Resolution table with `fable → sonnet` and `sonnet → haiku` rows |
| DW-1.2 | effort doctrine stated: plan-side work high effort, dispatched build agents default effort | COVERED | `grep -n 'high.*effort\|effort.*high' commands/plan.md`; `grep -n 'default effort' commands/build.md` |
| DW-1.3 | `grep -rnE '^#+ *(STOP\|CRITICAL\|MANDATORY)' commands/ agents/` returns nothing; every remaining structural gate line states why it exists | COVERED | Re-run the exact grep post-edit (expect 0 matches); manual line-by-line check that every renamed gate header (Invariants, Worktree Gate, Sign-off Gate, The Orchestrator Dispatches, First — Load Doctrine, Then — Read Input Files) carries a rationale clause in its own text or the sentence immediately following |
| DW-1.4 | AskUserQuestion appears only at decisive 2–4-option picks (mock sign-off, gate resolution); open-ended checkpoints are end-turn markdown | COVERED | `grep -n 'AskUserQuestion' commands/ agents/` post-edit; manual check that surviving sites are: plan.md clarify-loop (unchanged, targeted questions), mock.md sign-off (unchanged, 2-option), build.md worktree-gate asks (newly explicit, 2-3 option); manual check that plan.md's problem-statement/skeleton/present-handoff sites no longer call the tool |

**All items COVERED:** YES

## Design Decisions

**Mirror shape, not code.** Per the phase Constraints ("mirror the SHAPE... do not copy code-foundations-specific machinery — waves, File-scope derivation"), I read both reference diffs in full (7b8d974: plan-side ladder/checkpoints/effort; d8ed1d9: build-side resolution/de-prompted headers) and ported only the sentences that generalize to design-for-ai's own vocabulary (Doctrine, not Skills; DESIGN.md/JOURNEY.md gates, not code seams; design execution evidence, not tests). I explicitly did NOT port: wave derivation, `**File scope:**` fields, required-field hard-stops (`Model`/`Gate`/`Depends on` mandatory at LOAD), `Status: draft→ready` gating, or parallel-wave dispatch — all wave-parallel-specific and out of this phase's scope per the Constraints.

**"Crisis Invariants" and "Worktree Gate (MANDATORY...)" headers.** These aren't matched by the DW-1.3 grep pattern literally (`Crisis` and the mid-string `MANDATORY` don't start the header), but the reference diff converts their code-foundations equivalents in the same commit (`## Crisis Invariants — NEVER SKIP` → `## Invariants`; `# Worktree Gate (MANDATORY - First Check...)` → `# Worktree Gate (First Check...)`). Since build.md is in this phase's file scope and the Goal explicitly targets "every STOP/CRITICAL/MANDATORY header" in spirit ("calm structural gate that states its rationale"), I converted these two as well — same file, same de-prescription bias, zero added scope (rename + rationale, no structural change).

**Worktree-gate asks become explicit `AskUserQuestion` calls.** Currently the "ask the user" text in build.md (main/master → worktree-or-branch-or-abort; dirty tree → stash-or-commit-or-abort) is prose-described but never wired to the tool. Both are genuine decisive 2-4-option picks with self-contained labels — textbook `AskUserQuestion` per Channel Selection (oberskills:prompt / the mirrored adaptive-questioning convention). I read DW-1.4's parenthetical "(mock sign-off, gate resolution)" as naming these two surviving sites: mock's sign-off (already correct) and build's worktree-gate resolution (needed explicit wiring). Making this explicit satisfies "AskUserQuestion appears... at decisive picks" without adding a new decision point — the ask already existed in prose.

**plan.md's problem-statement, skeleton checkpoints, and present/handoff summary → conversational.** All four currently wrap multi-section content (a full problem statement, an N-phase skeleton, a full plan summary) inside `AskUserQuestion` + mandatory `preview` fields — exactly the pattern the reference diff (7b8d974) eliminates, because dialog previews truncate multi-section content and the option label alone can't carry it. Converted each to: render the full content as the turn's final markdown message, end the turn with the question, no tool call after it. This is a direct, low-risk mirror — the reference diff's rationale (dialog previews truncate; conversation is the only surface that renders content in full) applies identically to design-for-ai's plan summaries.

**mock.md's sign-off stays `AskUserQuestion`.** Per the phase's own Edge cases: by the time the sign-off question is asked, the screenshot + findings were already rendered in conversation (mock.md Step 3, unchanged). The dialog question itself ("Approve" / "Adjust") is self-contained and decisive — it doesn't ask the user to review new content inside the dialog, only to decide on content already shown. Only the header text (STOP → calm) changes here, not the mechanism.

**CHECK dispatch model: sonnet → fable.** Mirrors 7b8d974's plan-review dispatch change exactly ("the plan is the highest-leverage artifact in the pipeline; one fable pass here is cheap insurance"). Applies unchanged to design-for-ai's plan.md CHECK step, which has the identical role (fresh-eyes structural review of the saved plan before presenting it).

**Effort doctrine placement.** Plan-side: folded into plan.md's existing "Thinking effort" line (Standard/Full track), changing "max" → "high" and adding the build-side counterpart in the same sentence for a single source of truth, mirroring how code-foundations' `plan-integration.md` states both halves together. Build-side: added a short "Effort" note in build.md's SETUP phase (next to Model Resolution, where the orchestrator already reasons about per-agent dispatch parameters) stating dispatched BUILD/REVIEW agents run at default effort.

## Prerequisites
- [x] Required files exist (all six read in full)
- [x] Dependencies available (git access to `/Users/r/repos/code-foundations` for reference diffs — read-only, external working directory)
- [x] `feature/doctrine-overhaul` (v4.0.0) already merged to design-for-ai `main` — confirmed via `CLAUDE.md`
- [x] No missing prerequisites

## Recommendation
**BUILD.** All 4 DW items are COVERED with concrete file/line-level test cases; the assumption-verification delta (code-foundations HEAD moved past 17a39c4) does not invalidate the reference diffs' content — cross-checked against the merged tree. Proceeding to implementation.

## Review Fix

**Finding (FAIL, DW-1.4):** `commands/plan.md:66` (Clarify gaps) said "Ask questions via `AskUserQuestion` until the answers are decisive and no new gaps remain" and named exactly the open-ended gap types — "missing brand context, vague mood words, undefined audience" — that line 78's own rationale says belong in conversation, not a dialog (dialog previews truncate; option buttons can't capture nuance). Blanket `AskUserQuestion` at the clarify step both violated DW-1.4 (tool restricted to decisive 2-4-option picks) and directly contradicted line 78 in the same file.

**Root cause / resolution.** The code-foundations reference this phase mirrors does keep `AskUserQuestion` at its clarify step (`code-foundations/commands/plan.md:49`), so simply deleting the tool from clarify would under-mirror a real, defensible case: some clarify gaps genuinely are decisive 2-4-option picks (e.g., "which device class — phone, TV, or in-car?"), and `AskUserQuestion` is the right channel for those. The defect wasn't "AskUserQuestion at clarify" per se — it was clarify treating ALL gaps as one channel. Applied `oberskills:prompt`'s channel-selection rule (decisive option-picks → dialog; open-ended/nuanced content → conversation) to split clarify by gap shape instead of banning or keeping the tool wholesale.

**Change (`commands/plan.md:66`):**
- Before: "Load `Skill(clarify)`. Ask questions via `AskUserQuestion` until the answers are decisive and no new gaps remain. A research doc usually answers most of this — clarify **only its open questions** (missing brand context, vague mood words, undefined audience, scope faults)."
- After: "Load `Skill(clarify)`. A research doc usually answers most of this — clarify **only its open questions**. Route each gap by shape: a genuinely decisive pick with self-contained 2-4 options (e.g., "which device class — phone, TV, or in-car?") → `AskUserQuestion`. An open-ended content gap (missing brand context, vague mood words, undefined audience, scope faults) → ask in conversation as end-turn markdown; the answer is prose the user has to elaborate, not a button they can tap, and a dialog can't hold it any better than the problem statement below can. Keep asking, in whichever channel fits each gap, until the answers are decisive and no new gaps remain."

This removes the line-66/line-78 contradiction: line 66 now explicitly names the same open-ended gap types line 78 covers and routes them to the same channel (conversation) with the same rationale (dialog previews truncate, buttons can't capture nuance). No other file or line touched — `git diff --stat` confirms `commands/plan.md` is the only file with new changes since the pre-fix implementation; `git diff commands/plan.md` shows exactly one new hunk at line 66 versus the prior discovery's recorded diff.

**Re-run checks (post-fix):**

```
$ grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY)' commands/ agents/
(no output — exit 1)

$ grep -rn 'AskUserQuestion' commands/ agents/
commands/mock.md:134   — sign-off gate, 2-option decisive pick (unchanged)
commands/build.md:51   — worktree gate, 2-3 option decisive pick (unchanged)
commands/plan.md:66    — clarify step, now explicitly scoped to decisive 2-4-option
                          sub-case only; open-ended sub-case routed to conversation

$ grep -rniE 'fable|sonnet|haiku|opus' commands/plan.md commands/build.md
12 matches — ladder + override + REVIEW-downgrade table intact (unchanged)

$ grep -rniE 'effort' commands/plan.md commands/build.md
2 matches — plan-side high / build-side default effort doctrine intact (unchanged)
```

**DW re-verification:**

| DW-ID | Status | Evidence |
|-------|--------|----------|
| DW-1.1 | PASS | plan.md:186,197,230,233,248; build.md:85,110,114-117 — fable/sonnet/haiku ladder, opus override-only, REVIEW downgrade table. Unchanged by this fix. |
| DW-1.2 | PASS | plan.md:143; build.md:119-121 — plan-side high effort, build-side default effort. Unchanged by this fix. |
| DW-1.3 | PASS | Grep returns zero STOP/CRITICAL/MANDATORY headers. Unchanged by this fix. |
| DW-1.4 | PASS | 3 surviving `AskUserQuestion` sites, all decisive 2-4-option picks (mock sign-off, build worktree gate, plan clarify's decisive-pick sub-case). Open-ended clarify gaps now route to conversation, matching plan.md:78's rationale exactly — no contradiction remains. |

All 4 DW items PASS. Test anchoring intact — DW-1.1, DW-1.2, DW-1.3 were untouched by this fix (same evidence as the original review's PASS verdicts); only DW-1.4's failing site was changed, and the change is scoped to that one line.
