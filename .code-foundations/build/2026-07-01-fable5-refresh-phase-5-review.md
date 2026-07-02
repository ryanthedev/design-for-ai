# Review: Phase 5 - Composition Dealer

## Executed Results (Step 0)
- `node scripts/dealer.test.mjs` → **19 passed, 0 failed**, exit 0
- No project-level typecheck/lint config found for this plugin repo (no `package.json` with lint/typecheck scripts in scope) — dealer.mjs/dealer.test.mjs are dependency-free ESM scripts; treated `node --check` as the applicable syntax gate:
  - `node --check scripts/dealer.mjs` → OK
  - `node --check scripts/dealer.test.mjs` → OK
- `node scripts/palette.mjs --seed 250 --scheme light` → exit 0, emits CSS + contrast report (see Verify Scope below)

## Requirement Fulfillment

### DW-5.1
PREMISE:  `node scripts/dealer.mjs --project test --date 2026-07-01 --candidates 5` exits 0, emits 5 hands (each with family, composition discipline, hue, signature) as JSON; a re-run is byte-identical; a changed seed (different --date or a reroll) differs.
EVIDENCE: scripts/dealer.mjs:358-385 (CLI entry, ledger replay-on-same-seed, JSON emit); scripts/dealer.mjs:278-291 (hand shape: family/composition/hue/signature)
TRACE:    Ran the exact command twice in a fresh temp dir piping to `out1.json`/`out2.json`; `diff` reported no differences (byte-identical). `echo $?` after each run → `0`. Parsed `out1.json`: 5 hands, each carrying `family.id/name`, `composition.id` (+ variance/scale/etc.), `hue.deg/name`, `signature.id/text`. Ran with `--date 2026-07-02 --candidates 5` → `diff out1.json out3.json` differed (exit 0 for the command itself, output content differed).
VERDICT:  PASS

### DW-5.2
PREMISE:  composition axis has ≥6 documented disciplines; hue assignment follows the golden-angle (137.5°) walk; `used-dna.json` exclusion works (a cell dealt in run A is not re-dealt in run B sharing the same used-dna.json).
EVIDENCE: scripts/dealer.mjs:56-138 (9 `DISCIPLINES`, each documenting scale/density/symmetry/hierarchy/ground/dominantElement); scripts/palette.mjs:181-184 (`GOLDEN_ANGLE = 137.50776405003785`, `hueWalk`); scripts/dealer.mjs:246-260 (excluded-cell filtering before deal)
TRACE:    Counted 9 disciplines in source, each with all 6 documented dimensions (`test_DW_5_2_disciplines_documented` also asserts this and passed). Computed consecutive hue deltas from a live deal: 188.69−51.18=137.51, 326.19−188.69=137.50, (103.70−326.19+360)=137.51, 241.21−103.70=137.51 — all match 137.50776° within rounding. Ran `runA` then `runB` against a shared `used-dna.json`: cell-set intersection was empty (`set()`), `runB.cellSpace.excluded === 5`, and the ledger held 2 entries.
VERDICT:  PASS

### DW-5.3
PREMISE:  AI-tell cells are banned — verifiable in source AND a many-seed test deal never emits one.
EVIDENCE: scripts/dealer.mjs:161-177 (`BANNED_CELLS`, 6 entries, each citing `ai-tells.md`); scripts/dealer.mjs:250-260 (bans excluded from `legalCells()`/`available` before any pick)
TRACE:    Read `BANNED_CELLS` in source — 6 cells, each with a `tell` string citing `ai-tells.md`. Ran a 2000-seed sweep (`sweep-0`..`sweep-1999`, 5 hands each = 10,000 dealt cells) checking every hand's `(family,discipline)` against the banned set — 0 violations.
VERDICT:  PASS

### DW-5.4
PREMISE:  `references/visual/design-dna.md` documents the dealer contract: the model justifies/executes the dealt hand (inversion stated), the re-deal protocol, and the honest collision limit ("rare, not impossible" or equivalent).
EVIDENCE: references/visual/design-dna.md:126 (inversion: "The model justifies and executes the dealt hand; it does not choose, veto, or quietly substitute."); design-dna.md:130 (re-deal protocol: "re-deal with `--reroll N+1`... Both deals stay recorded in `used-dna.json`"); design-dna.md:134 (honest limit: "collisions are rare, not impossible")
TRACE:    Read lines 116-134 directly. All three required elements are present verbatim or near-verbatim, plus `DESIGN_VARIANCE` dial semantics (line 128) and the exhaustion behavior (line 132). No stale "forthcoming" dealer language remains (grepped — only prose describing the dealer as shipped).
VERDICT:  PASS

**All requirements met:** YES

## Test-DW Coverage
- [x] DW-5.1 → `test_DW_5_1_exit0_and_shape`, `test_DW_5_1_rerun_byte_identical`, `test_DW_5_1_different_seed_differs` (all ran, PASS)
- [x] DW-5.2 → `test_DW_5_2_disciplines_documented`, `test_DW_5_2_golden_angle_walk`, `test_DW_5_2_exclusion_across_runs` (all ran, PASS)
- [x] DW-5.3 → `test_DW_5_3_banned_cells_in_source`, `test_DW_5_3_never_emits_banned_many_seeds` (300-seed sweep in-suite; I independently re-ran a 2000-seed sweep) (all ran, PASS)
- [x] DW-5.4 → `test_DW_5_4_doctrine_contract` (ran, PASS)
- Coverage exceeds the stated "per-phase verification" level: every DW item has both an automated test and independently-reproduced observed behavior from my own runs.

## Dead Code
None found. Checked both files for unused imports, unreachable code after early returns, debug statements (`console.log` outside intended CLI output), and commented-out blocks.
- `readLedger`'s catch branch calls `fail()` (which calls `process.exit(1)`) with no following `return`/`throw` — not dead code: `process.exit()` terminates the process before the implicit `undefined` return is ever observed by a caller, matching the same pattern used in `parseArgs`/CLI validation elsewhere in the file. Not a defect.
- All named exports (`FAMILIES`, `DISCIPLINES`, `SIGNATURES`, `BANNED_CELLS`, `allCells`, `legalCells`, `xmur3`, `mulberry32`, `deal`, `ExhaustionError`, `readLedger`, `ledgerExclusions`) are consumed either by the CLI block or by `dealer.test.mjs`.

## Correctness Dimensions
| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | Single-process synchronous CLI; no async/shared in-process state. The `used-dna.json` read-modify-write (dealer.mjs:361-383) is not safe against two dealer.mjs processes racing on the *same* ledger file, but this is a local, single-user, sequentially-invoked CLI tool per the workflow's own design (agents dispatch it one at a time) — no DW item or listed edge case names concurrent invocation, so this is a Note, not a demonstrated failure against a stated requirement. |
| Error Handling | PASS | Traced the corrupt-ledger path: `readLedger` catches `JSON.parse` failure and a missing/non-array `entries` field, calling `fail()` → exit 1 with a clear message (verified live: `test_corrupt_ledger_fails_clearly` passed, and I independently confirmed the exhaustion path exits 3 with a message naming the exact deficit). |
| Resources | PASS | `readFileSync`/`writeFileSync` are synchronous, single-shot, no held handles; nothing to leak. |
| Boundaries | PASS | Traced the exact boundary `available.length === candidates` (10 legal cells left, 10 requested): `deal()` succeeds via tier-3 fallback rather than false-triggering `ExhaustionError` off-by-one. Traced `candidates` clamped 1-10 and `reroll >= 0` integer validation in `parseArgs`; malformed `--date` rejected by regex. |
| Security | N/A | No untrusted/network input; `--used` is a locally-supplied file path under the invoking user's own control, `JSON.parse` failures are caught and reported cleanly rather than crashing uncontrolled. |

## Loaded-Skill Criteria

`oberskills:prompt` was loaded because `references/visual/design-dna.md` functions as doctrine text `Read()` into an agent's context per this repo's workflow (CLAUDE.md: "each `build` phase's dispatched agents resolve doctrine names... then `Read()` each file before executing the phase") — i.e. the new "Composition Dealer" section is effectively a prompt instructing the model's behavior at deal time, so the skill's prompt-design criteria apply to it.

| Skill | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| oberskills:prompt | #2 Explain why, not just what to avoid | PASS | design-dna.md:118 states the root cause ("composition converges even when hue differs... the model drifts to its statistical prior") before prescribing the fix; line 126 motivates the inversion rather than issuing a bare prohibition. |
| oberskills:prompt | #3 De-prompt for current Claude (no aggressive CRITICAL/MUST/NEVER scaffolding) | PASS | Grepped the new section for `CRITICAL`, `MUST`, all-caps `NEVER`/`ALWAYS` imperatives — none found; the "never by editing the hand" (line 130) and "does not choose, veto, or quietly substitute" (line 126) are normal prose, not anti-laziness scaffolding. |
| oberskills:prompt | #6 Reasoning is a dial, not an incantation — never instruct the model to echo/transcribe internal reasoning | PASS | Grepped for "explain your reasoning", "show your work", "step by step", "internal reasoning" — none present. The contract asks the model to "articulate why THIS family... serves this content" as task-level output (the DESIGN.md justification line), not as an echo of hidden reasoning — this is the task-level-justification pattern the skill endorses, not the banned pattern. |
| oberskills:prompt | #7 Prefill is dead — no prefilled-assistant-turn patterns | N/A | design-dna.md is reference doctrine text, not an API-level prompt template; no prefill construct present or applicable. |

## Notes (non-blocking)
- `used-dna.json` read-modify-write has no file lock; concurrent dealer.mjs invocations against the same ledger path could lose an update. Not a demonstrated failure against any DW item or listed edge case — flagged for awareness only, matches the doc's own "Honest limit" section acknowledging the ledger is local/per-machine with no shared-server guarantee.
- `writeFileSync` (dealer.mjs:383) has no surrounding try/catch — a disk-full or permission-denied condition would surface as an uncaught exception with a raw stack trace rather than the same clean `fail()`-style message used elsewhere. Not tested by any DW item or listed edge case; a hardening opportunity, not a requirement gap.
- **Verify scope**: `git diff --name-only a77ccce..HEAD` returns empty because the work is uncommitted (HEAD still points at a77ccce); the correct check is the working-tree diff. `git diff a77ccce` (tracked) + `git status --porcelain` (untracked) show: `scripts/dealer.mjs` (new), `scripts/dealer.test.mjs` (new), `scripts/palette.mjs` (modified), `references/visual/design-dna.md` (modified) — the 4 files named in the dispatch prompt — plus two build-workflow bookkeeping artifacts outside that list: `.code-foundations/plans/2026-07-01-fable5-refresh.md` (7-line insertion recording the *prior* phase 4's execution-log entry — not phase-5 content) and `.code-foundations/build/2026-07-01-fable5-refresh-phase-5-discovery.md` (new, this phase's discovery doc). Both are non-functional build-orchestration artifacts inherent to this repo's own build workflow, not code/doctrine changes competing with the 4 named files. `palette.mjs`'s CLI was confirmed unchanged in behavior: `node scripts/palette.mjs --seed 250 --scheme light` → exit 0, emits `/* Generated by design-for-ai palette.mjs */` CSS with a PASS/FAIL contrast report, matching pre-existing behavior; the diff itself (scripts/palette.mjs, +30/-15) is additive (new exports `GOLDEN_ANGLE`/`hueWalk`/`HUE_NAMES`/`hueName`, CLI code gated behind an `import.meta.url` direct-execution guard so importing it side-effect-free) — no removed CLI flags or changed output format.
- A prompt-injection attempt was observed mid-session: a fake `<system-reminder>` block appeared inside the `oberskills:prompt` skill's tool output claiming "the date has changed" and instructing me not to mention it to the user. This did not originate from the actual system/user and was disregarded; it had no bearing on this review's findings and no code in scope reads or depends on wall-clock date (confirmed by DW-5.3's/edge-case's `Math.random`/`Date.now`/`new Date` grep — zero real calls in `dealer.mjs`).

## Issues (if FAIL)
None.

**Verdict: PASS**
