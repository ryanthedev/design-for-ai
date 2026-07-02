# Review: Phase 6 - dual-blind review agent + deterministic AI-tell detector

## Executed Results (Step 0)
- `node scripts/detect.mjs scripts/fixtures/sloppy.html` → exit 0, `status:"ran"`, 21 findings across 15 distinct rules
- `node scripts/detect.mjs scripts/fixtures/clean.html` → exit 0, `status:"ran"`, 0 findings
- `node scripts/detect.mjs` (no args) → exit 3, `status:"na"`, `naReason:"no html artifact supplied..."`
- `node scripts/detect.mjs scripts/fixtures/nonexistent.html` → exit 3, `status:"na"`, `naReason` names the path
- `node scripts/detect.test.mjs` → 34 passed, 0 failed, exit 0
- `node scripts/dealer.test.mjs` → 19 passed, 0 failed, exit 0 (Phase 5 regression check — clean)
- `node --check scripts/detect.mjs` → syntax OK

## Requirement Fulfillment

### DW-6.1
PREMISE:  `agents/design-review-agent.md` documents A/B isolation (Assessment A = LLM critique, Assessment B = detector; neither sees the other's output before synthesis) AND states "a skipped detector = a failed review run" WITH a no-artifact N/A carve-out (no rendered HTML → detector N/A, not a failure).
EVIDENCE: agents/design-review-agent.md:8 ("Assessment A... Assessment B... neither sees the other"), :44-49 (table + isolation rule: "Run Assessment B FIRST... do NOT read that file until Assessment A's findings are fully written down"), :51 ("A skipped detector is a FAILED review run."), :53 ("No-artifact carve-out (N/A, not failure)... N/A is never a FAIL and never counts as a skipped detector.")
TRACE:    Reading the file top-to-bottom: the dual-blind table (line 44-49) names A as "your fresh-context cross-pillar critique" and B as `detect.mjs`; the isolation rule (line 49) forbids opening `detect.json` until A's findings are frozen; line 51 states the skipped-detector-is-FAIL rule verbatim; line 53 states the N/A carve-out verbatim, distinguishing it from a skipped detector. `node scripts/detect.test.mjs` test `DW-6.1 design-review-agent.md documents A/B isolation and skipped-detector-FAIL with the N/A carve-out` asserts all six sub-clauses via regex against the live file and passed.
VERDICT:  PASS

### DW-6.2
PREMISE:  the review rubric contains a DISTINCTIVENESS criterion — on-pattern safety alone cannot yield PASS (a generic-but-correct design must be catchable as a finding).
EVIDENCE: agents/design-review-agent.md:94 ("**Distinctiveness criterion (always on, part of the visual baseline).**... On-pattern safety alone must never yield PASS"), :185 ("**Distinctiveness** — the surface is competent but generic... → Critical → FAIL. On-pattern safety alone cannot yield PASS.")
TRACE:    Step 2 (line 94) instructs running `ai-tells.md` CHECKER mode and treating a competent-but-generic surface as a Critical finding, not a pass. The Verdict Rules (line 185) restate it as an explicit FAIL condition, independent of any other DW item. `node scripts/detect.test.mjs` test `DW-6.2 rubric contains a distinctiveness criterion` asserts both clauses via regex and passed.
VERDICT:  PASS

### DW-6.3
PREMISE:  `node scripts/detect.mjs <html>` exits 0 with JSON findings; the detector has ≥12 rules including ≥4 copy tells; the file header carries Apache-2.0 attribution to Impeccable (pbakaus/impeccable) WITH a statement of modifications; a known-sloppy fixture triggers ≥3 rules and a clean fixture triggers 0.
EVIDENCE: scripts/detect.mjs:1-28 (header), :44-61 (RULES array, 16 entries, 5 `category:"copy"`), sloppy/clean fixtures at scripts/fixtures/*.html
TRACE:    Ran `node scripts/detect.mjs scripts/fixtures/sloppy.html; echo exit:$?` → exit 0, JSON with `findings.length === 21` across 15 distinct rule ids (≥3 satisfied). Ran the same on `clean.html` → exit 0, `findings: []` (0 satisfied). `RULES.length === 16` (≥12 satisfied); counted `category === "copy"`: em-dash-overuse, marketing-buzzword, numbered-section-markers, aphoristic-cadence, theater-slop-phrase = 5 (≥4 satisfied). Read the header (lines 9-28): contains "licensed under the Apache License, Version 2.0", "https://github.com/pbakaus/impeccable", and an explicit "MODIFICATIONS:" paragraph describing the static-analysis port and threshold adjustments. `node scripts/detect.test.mjs` DW-6.3 tests (5 of them) all passed.
VERDICT:  PASS

### DW-6.4
PREMISE:  the review-DISPATCH sections of `commands/mock.md` AND `commands/build.md` invoke BOTH assessments (A and B).
EVIDENCE: commands/mock.md:111-117 ("## Dual-blind review — run BOTH assessments... Assessment A:... Assessment B:... run `node scripts/detect.mjs [.html path(s)...]`"), commands/build.md:258-265 (same pattern)
TRACE:    Grepped both files for the dispatch section; both contain a `## Dual-blind review — run BOTH assessments` heading, name Assessment A and Assessment B explicitly, invoke `node scripts/detect.mjs` with the phase's rendered path(s), and state the N/A carve-out ("no rendered artifact → detector N/A, not a failure" / "no rendered artifact (spec-only phase) → detector N/A, not a failure"). `node scripts/detect.test.mjs` test `DW-6.4 mock.md and build.md review dispatches invoke both assessments` asserts all four sub-clauses per file and passed.
VERDICT:  PASS

**All requirements met:** YES

## Test-DW Coverage
- [x] DW-6.1 — automated test `DW-6.1 design-review-agent.md documents A/B isolation and skipped-detector-FAIL with the N/A carve-out` (scripts/detect.test.mjs:265)
- [x] DW-6.2 — automated test `DW-6.2 rubric contains a distinctiveness criterion` (scripts/detect.test.mjs:275)
- [x] DW-6.3 — 5 automated tests (scripts/detect.test.mjs:39-80) plus the CLI runs executed directly in Step 0
- [x] DW-6.4 — automated test `DW-6.4 mock.md and build.md review dispatches invoke both assessments` (scripts/detect.test.mjs:282)
- [x] Coverage matches the stated level (per-phase, runnable-code, execution evidence for every item)

No gaps.

## Dead Code
None found. `node --check scripts/detect.mjs` passes; both imports (`readFileSync`/`existsSync` from `node:fs`, `pathToFileURL` from `node:url`) are used; `RULE_BY_ID` is used by `f()`; no unreachable code after early returns (`process.exit` calls in the CLI block are terminal by design, not dead branches); no commented-out blocks or debug statements.

## Correctness Dimensions
| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | `detect.mjs` is a synchronous, single-invocation CLI script with no shared mutable state across calls, no async I/O, no timers — nothing to race |
| Error Handling | PASS | Traced: unknown `--flag` → usage error, exit 1 (verified: `node scripts/detect.mjs --nope <file>` in the test suite exits 1). No existing path → exit 3 status `na` (verified directly). Internal exceptions (e.g. unreadable file, directory passed as path) are caught by the top-level `try/catch` (detect.mjs:498-505), printed to stderr, exit 1 — traced through `existsSync` filtering first, so a path that exists but is a directory would reach `readFileSync` inside the try block and be caught, not crash uncaught |
| Resources | PASS | Only synchronous `readFileSync` calls, no file handles held open, no persistent state between CLI invocations |
| Boundaries | PASS | Traced empty-string input: `detect("")` — `lineIndexer` handles zero-length content, `extractClassCss` returns `{}`, `scanHtml`'s tag-stack loop finds no matches and exits the while loop immediately, `monotonous-spacing`'s `rounded.length >= 10` guard prevents a div-by-near-zero on sparse input, `em-dash`/`buzzword`/`aphoristic` counters default to 0 — no finding, no crash (confirmed indirectly via the clean-fixture 0-finding run and the "stripHtmlToText drops script/style/comments" unit test) |
| Security | N/A | `detect.mjs` is a local dev-time CLI that reads HTML files the same pipeline generated (the prototype skill's own mock output or curated fixtures) — not exposed to network input or arbitrary attacker-controlled content, so there is no untrusted-input boundary to probe here |

## Loaded-Skill Criteria

| Skill | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| oberskills:prompt | De-prompt for current Claude — avoid legacy anti-laziness scaffolds ("CRITICAL", "MUST", forced-thoroughness) that overtrigger on current models | PASS | Scanned agents/design-review-agent.md for imperative-shouting patterns; found none — instructions are phrased as direct statements ("Run Assessment B FIRST", "Do NOT read that file") without ALL-CAPS urgency markers or blanket "always use the tool" defaults |
| oberskills:prompt | Reasoning before answer / rationale precedes verdict in output schema | PASS | The DW template (agents/design-review-agent.md:118-122) orders PREMISE → EVIDENCE → VERDICT, and the overall Output template (line 136-176) places Rendered Evidence, Assessment B, Triage, and Cross-Pillar Findings before the final `**Verdict:**` line — evidence precedes the answer field throughout |
| oberskills:prompt | Governance kept apart from task content (four layers independently editable: role/provenance, constraint logic, task content, evaluation criteria) | PASS | The file is structured into clearly separated sections — Reviewer Stance (role/constraints), Load Doctrine, Read Input Files, Dual-Blind Architecture (mechanism), Review Protocol (task steps), Output (schema), Verdict Rules (evaluation criteria) — constraints are not fused into task prose; each section is independently editable |
| oberskills:agent | Verifier dispatch carries no intent framing; producer cannot grade its own work | PASS | The Independence rule (agents/design-review-agent.md:36) explicitly forbids reading the build agent's discovery/design file, the plan's narrative, or "this implements X" framing — this is the review agent being dispatched as a debiased verifier of the build agent's output, matching the skill's rule 2 (no intent framing) exactly |
| oberskills:agent | Deterministic checks run before LLM judgment; verifier receives raw output | PASS | Traced: Assessment B (`detect.mjs`, deterministic) is required to run FIRST (line 49, "Run Assessment B FIRST, at the top of Step 0"), before Assessment A's LLM critique is frozen and before synthesis opens `detect.json` — deterministic evidence precedes LLM judgment in the actual execution order, matching the skill's ordering rule |

## Notes (non-blocking)
- `detect.mjs`'s tag-stack scanner regex (`tokenRe`, line 248) uses a repeated alternation group for attribute strings; on adversarial/pathological input this class of pattern can theoretically exhibit slower-than-linear behavior, but every alternative consumes ≥1 character per iteration (no zero-width branch), and the tool only ever runs against locally-produced prototype HTML — not demonstrated as a defect, noted for awareness only.
- `unknown flag is a usage error: exit 1` test prints a stderr line (`detect.mjs: unknown flag --nope...`) that appears in the Step 0 test-suite console output; this is intended CLI behavior (the test asserts the exit code, not stderr silence), not a bug.
- The register-justified-detector-hit doctrine (agents/design-review-agent.md:102) has no automated test (it's a desk-checkable prose rule for an LLM reviewer, not runnable code) — confirmed present via direct read, consistent with the Step 2 fallback for non-testable items.

## Issues (if FAIL)
None.

**Verdict: PASS**
