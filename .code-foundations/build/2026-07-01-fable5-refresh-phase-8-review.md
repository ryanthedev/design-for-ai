# Review: Phase 8 - Outcome eval (Fable 5 fingerprint + A/B measurement)

## Executed Results (Step 0)
- `node --test scripts/dealer.test.mjs scripts/detect.test.mjs` → 2 suites, 34 (detect) + 19 (dealer, run separately, confirmed passing in Phase 5/6 review logs and re-verified here as part of the combined `node --test` run) — **34 passed, 0 failed** for detect.test.mjs; combined run reported `# tests 2 / # pass 2 / # fail 0`.
- No application code was added or modified in Phase 8 (git status shows only `.code-foundations/plans/2026-07-01-fable5-refresh.md`, `references/visual/ai-tells.md`, and a build discovery doc changed/added — `scripts/detect.mjs` and `scripts/dealer.mjs` are untouched). No typecheck/lint config exists in this repo (plugin of markdown + scripts); not applicable.
- Independent re-scoring via `node scripts/detect.mjs <file>` — see per-item evidence below. Every one of the 8 files I re-scored (6 fingerprint mocks + the ledgerline old/new pair) matched the saved `detect-*.json` and the numbers reported in both `references/visual/ai-tells.md` and the grug memory exactly.

## Requirement Fulfillment

### DW-8.1
PREMISE:  `references/visual/ai-tells.md` carries a DATED fingerprint addendum reporting N≥6 unprompted Fable 5 mocks, detector-scored, with the top default tells named.
EVIDENCE: `references/visual/ai-tells.md:363-386` — "FINGERPRINT ADDENDUM — CLAUDE FABLE 5 DEFAULTS", `**Added: 2026-07-02 · Last reviewed: 2026-07 · Review by: 2026-10**`, "N=6 UI mocks... scored with `scripts/detect.mjs`", ranked table naming `nested-cards` (6/6, 42 hits), `overused-font` (4/6), `purple-triplet` (2/6), plus em-dash-overuse/hero-eyebrow-chip/numbered-section-markers, and a "Top default tells named" line.
TRACE:    Ran `node scripts/detect.mjs skills/design-for-ai-workspace/fingerprint/settings.html` → `{total: 25, nested-cards: 22, purple-triplet: 2, overused-font: 1}` — matches saved `detect-settings.json` and the addendum's "settings 25" per-file note exactly. Ran the same on `landing.html` → `{total: 12, nested-cards: 11, em-dash-overuse: 1}` — matches "landing 12". For full rigor I also re-ran the remaining 4 fingerprint files (dashboard→3, blog→2, pricing→10, login→1) — all four match `summary.json`'s `perFile` values exactly, and `summary.json`'s aggregate rows (nested-cards 6/6/42, overused-font 4/6/4, purple-triplet 2/6/3) match the addendum table verbatim. Underlying mocks exist as real HTML (`skills/design-for-ai-workspace/fingerprint/*.html`, 287–863 lines each, not stubs).
VERDICT:  PASS

### DW-8.2
PREMISE:  A/B complete — both arms scored by detect.mjs AND a blind distinctiveness judgment; results (incl. any null/regression) written to grug `design-for-ai/`.
EVIDENCE: `skills/design-for-ai-workspace/ab/{fieldnote,kilnworks,ledgerline}/{old,new}/index.html` + `detect-old.json`/`detect-new.json`/`comparison.json` per brief; grug `design-for-ai/fable5-refresh-eval-results-2026-07.md`.
TRACE:    Re-ran `node scripts/detect.mjs` on all 6 old/new files: fieldnote OLD=7/NEW=3, kilnworks OLD=6/NEW=2, ledgerline OLD=5/NEW=8 (aggregate OLD=18, NEW=13) — every number matches both the saved `detect-*.json` files and the grug memory's table exactly, including the direction of the one regression (ledgerline: NEW worse, 8>5). Cross-checked `comparison.json` labeling against actual file content (`kilnworks/old` contains "Ember Gauge" = `comparison.json output_a`; `kilnworks/new` contains "PYRO LEDGER" = `output_b`; `ledgerline/new` contains "rubber-stamp"/"acid lime"/`#A9F04D` = `output_b`) to confirm output_a=old, output_b=new consistently, and that the blind judge's per-brief winners (fieldnote→b/new, kilnworks→b/new, ledgerline→a/old) map to "NEW wins 2/3, loses ledgerline" as claimed. Grug memory (`design-for-ai/fable5-refresh-eval-results-2026-07.md`, read via `grug-read`) records the same table (OLD 18/NEW 13, blind 2/3, ledgerline's 30–23 loss) and explicitly calls out the regression under "The honest exception (ledgerline)" — the negative result is present, not hidden, in both the workspace artifacts and grug.
VERDICT:  PASS

### DW-8.3
PREMISE:  an explicit verdict is stated against the pre-committed success criterion (refreshed = strictly fewer detector hits AND wins blind distinctiveness ≥2/3); the plan's Assumptions row on "seeded composition dealing reduces genericness" is updated with the measured finding; a follow-up is filed for the measured regression.
EVIDENCE: `.code-foundations/plans/2026-07-01-fable5-refresh.md:450-456` ("## Phase 8 outcome (2026-07-02)" — "Verdict against the pre-committed success criterion... **MET — positive but qualified.**"); `:400` (Assumptions row, struck-through LOW/zero-evidence text replaced with "**MEASURED 2026-07-02 (P8): POSITIVE at aggregate**..."); `:436-443` (Follow-ups section, "**FN-1 — nested-cards execution guard**" filed against the ledgerline regression, plus FN-2/FN-3).
TRACE:    Read the Assumptions table row-400 — it is no longer the pre-build "LOW confidence, unmeasured" text; it now states the measured 13-vs-18 result, the blind 2/3 result, and the qualification. Read the Phase 8 outcome section — the verdict is explicit ("MET") and cites both success-criterion conditions individually with checkmarks before stating the combined verdict. Read the Follow-ups section — FN-1 is filed specifically against the measured regression (nested-cards×5 on ledgerline) with a concrete proposed fix (converge-step check / detect.mjs gate) and a priority rating.
VERDICT:  PASS

**All requirements met:** YES

## Test-DW Coverage
- [x] DW-8.1: covered by recorded observed behavior — I independently re-ran `detect.mjs` on all 6 fingerprint mocks (not just the required 2) and every count matched `summary.json` and the addendum. No automated test targets this claim (it's a one-time measurement), so observed-behavior reproduction is the correct and only available evidence form, per Step 2's fallback rule.
- [x] DW-8.2: covered by recorded observed behavior — re-ran `detect.mjs` on all 3 old/new pairs (not just the required 1); direction and magnitude match the grug-recorded table in every case, including the regression case.
- [x] DW-8.3: covered by direct document reads (plan file lines 400, 436-443, 450-456) — this is a documentation/decision-record requirement with no code path to execute; reading the actual committed text is the correct evidence form.
- Coverage matches the stated level ("per-phase verification — measurement phase; reproduce the measurements") — every reproducible number was independently reproduced rather than taken on trust.

## Dead Code
No application code was written in this phase (only a markdown addendum, plan-file edits, and gitignored eval artifacts). None found.

## Correctness Dimensions
| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | No code changed this phase; `detect.mjs`/`dealer.mjs` are untouched and their own test suites (34+19) still pass unchanged. |
| Error Handling | N/A | No new code paths introduced. |
| Resources | N/A | No new file/connection/lock handling introduced. |
| Boundaries | N/A | No new code; the only "boundary" risk in this phase is measurement integrity (small N=6 / N=3), which is explicitly and honestly flagged in both the addendum and grug memory (FN-2), not silently ignored. |
| Security | N/A | No untrusted input handling introduced; eval artifacts are locally generated HTML in a gitignored scratch directory. |

## Loaded-Skill Criteria
Skill `oberskills:skill-craft` was loaded per dispatch instructions. Its criteria (frontmatter validity, description quality, trigger accuracy, baseline-first eval discipline) apply to *creating or modifying a Claude Code skill*. Phase 8 created/modified no skill directory, SKILL.md, or agent-definition frontmatter — it added a dated addendum to a doctrine reference file (`references/visual/ai-tells.md`, not a skill file) and eval artifacts/plan-file prose. There is no skill-craft-governed artifact in this phase's file scope to probe.

| Skill | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| oberskills:skill-craft | Skill/agent frontmatter, description, structure, eval discipline | N/A | No skill or agent definition file was created or modified in Phase 8 (`references/visual/ai-tells.md` is doctrine prose loaded via a resolver, not a skill artifact; no SKILL.md/frontmatter touched) — nothing for skill-craft's criteria to attach to. |

## Notes (non-blocking)
- `skills/design-for-ai-workspace/fingerprint/login.html` contains a visibly malformed CSS block (repeated stray `}` lines right after `:root`) — cosmetically broken but it does not affect this review: the mock is still real, substantial (287 lines) content, and `detect.mjs`'s static-regex rules still parsed it correctly (reproduced `total:1`, matching the saved artifact and the addendum's "login 1" note). Not a fabrication or measurement-integrity issue, just a rough generation artifact worth knowing about if the fingerprint mocks are ever reused.
- The grug memory and the plan's Phase 8 sections both proactively self-flag the small sample size (N=6 fingerprint, N=3 A/B briefs, single generation per arm/brief, one judge model) as directional rather than settled evidence, and file a specific follow-up (FN-2) to re-run with more briefs. This is exactly the honest-negative discipline the dispatch prompt asked me to check for, and it is present without my having to dig for it.
- `output_a`/`output_b` labeling in `comparison.json` is not self-documenting as old/new inside the file itself (by design — blind judging). I cross-verified the mapping independently via distinctive strings unique to each concept (e.g., "Ember Gauge" vs "PYRO LEDGER", "#A9F04D"/"rubber-stamp") rather than trusting the plan's narrative account of which side won.

**Verdict: PASS**
