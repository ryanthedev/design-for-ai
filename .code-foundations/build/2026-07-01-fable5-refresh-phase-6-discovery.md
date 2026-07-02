# Discovery + Design: Phase 6 - Dual-blind review — LLM critique + deterministic detector

## Files Found
- `agents/design-review-agent.md` — current single-assessment review agent (stance, doctrine loading, Steps 0–4, output template, verdict rules). Independence/debiasing rules already present and must be preserved.
- `commands/mock.md` — review dispatch at "Step 2 — Dispatch the review-agent" (~line 87–113): one prompt block with Requirements / Rendered artifact / Output sections.
- `commands/build.md` — review dispatch at "Sub-Phase N.2 — REVIEW" (~line 223–268): same shape plus Edge cases + Doctrine sections.
- `scripts/dealer.mjs` + `scripts/dealer.test.mjs` — repo conventions: ESM `.mjs`, zero deps, `#!/usr/bin/env node`, CLI guard via `import.meta.url === pathToFileURL(argv[1]).href`, distinct exit codes (0/1/3), self-contained test runner (`test()`/`assert`/`eq`, exits nonzero on failure, DW-IDs in test names).
- `references/visual/ai-tells.md` — Phase 3 output; the plugin's source of truth: Copy/Content Tells (5 named Impeccable rules) + Checkable Signatures table (purple triplet hexes, 0.08–0.12 shadow alpha, unmodified shadcn tokens, Space Grotesk).
- Impeccable (read-only, Apache-2.0 confirmed at `/Users/r/repos/impeccable/LICENSE`): `registry/antipatterns.mjs` (44-rule registry), `engines/regex/detect-text.mjs` (regex matchers + text analyzers — directly portable), `rules/checks.mjs` (DOM-based layout checks — portable as static heuristics only).
- `scripts/detect.mjs`, `scripts/fixtures/`, `scripts/detect.test.mjs` — do NOT exist yet (this phase creates them).

## Current State
Review is a single LLM assessment: the review agent renders pixels, triages pillars, applies doctrine, synthesizes one severity-ranked report, and fills per-DW verdicts. There is no deterministic pass, no distinctiveness criterion in the verdict rules (generic-but-competent can PASS), and the mock/build dispatch prompts invoke only the one assessment.

## Gaps
- Impeccable's five required layout rules (`nested-cards`, `icon-tile-stack`, `hero-eyebrow-chip`, `repeated-section-kickers`, part of `monotonous-spacing`) are implemented against a live DOM (`checks.mjs` takes computed styles/layout metrics). They cannot be ported verbatim under the no-browser constraint — they must be re-implemented as static HTML/CSS heuristics (tag-stack parse + single-class CSS resolution). This is a stated modification, covered by the Apache-2.0 modification statement in the header.
- Impeccable's copy tells (`em-dash-overuse`, `marketing-buzzword`, `numbered-section-markers`, `aphoristic-cadence`) ARE statically implemented in `detect-text.mjs` and port near-directly. `theater-slop-phrase` is gpt-gated upstream but listed ungated in ai-tells.md — ship it ungated here (ai-tells.md is the plugin's source of truth).
- "Dual-blind isolation" inside ONE review agent needs a concrete mechanism (designed below): the detector is deterministic, so the isolation that matters is A-not-seeing-B before A's findings are frozen.

## Code Standards
No `docs/code-standards.md` in this repo. Conventions taken from `scripts/dealer.mjs`/`palette.mjs`: ESM, zero deps, node: imports only, exported pure core + CLI guard, distinct exit codes, self-contained test runner.

## Test Infrastructure
No framework; `scripts/dealer.test.mjs` is the pattern: plain `node scripts/X.test.mjs`, local `test/assert/eq` helpers, `execFileSync` for CLI-level tests, exit code = failure count signal (nonzero on any failure), DW-IDs embedded in test names.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-6.1 | `design-review-agent.md` documents A/B isolation (neither sees the other pre-synthesis) and "skipped detector = failed run" (with the no-artifact N/A carve-out) | COVERED | `test_DW_6_1_agent_documents_isolation_and_skip_failure` (asserts the agent doc contains the isolation rule, the skipped-detector-FAIL rule, and the N/A carve-out) |
| DW-6.2 | rubric contains a distinctiveness criterion — on-pattern safety alone cannot yield PASS | COVERED | `test_DW_6_2_rubric_has_distinctiveness_criterion` (asserts the verdict rules contain the distinctiveness FAIL condition) |
| DW-6.3 | `node scripts/detect.mjs <html>` exits 0 with JSON findings; ≥12 rules incl. ≥4 copy tells; Apache-2.0 attribution + modification statement in header; sloppy fixture ≥3 rules, clean fixture 0 | COVERED | `test_DW_6_3_cli_exits_0_with_json`, `test_DW_6_3_rule_count_and_copy_tells`, `test_DW_6_3_apache_attribution_header`, `test_DW_6_3_sloppy_fixture_triggers_3plus_rules`, `test_DW_6_3_clean_fixture_triggers_0` — plus captured CLI output on both fixtures |
| DW-6.4 | `mock.md`/`build.md` review dispatch invokes both assessments | COVERED | `test_DW_6_4_mock_and_build_dispatch_invoke_both_assessments` (asserts both dispatch prompt blocks name Assessment A + Assessment B / detect.mjs) |

**All items COVERED:** YES

## Design Decisions

### detect.mjs — rule subset (16 rules; floor is 12)
Chosen for static analyzability. Categories: `layout` (5), `signature` (4), `copy` (5), `type-color` (2). Severity vocabulary `high|medium|advisory` (Impeccable's, matching ai-tells.md's High/Medium).

| # | Rule id | Cat | Port basis | Static mechanism |
|---|---------|-----|-----------|------------------|
| 1 | nested-cards | layout | checks.mjs `isCardLikeFromProps` | tag-stack parse; card-like = (shadow OR border) AND (radius OR bg), via class names (Tailwind/`card`) + inline style + single-class `<style>` resolution; card open while card ancestor open |
| 2 | icon-tile-stack | layout | checks.mjs `checkIconTile` | heading whose previous sibling is a squarish 32–128px tile (Tailwind `w-N h-N` pairs or resolved width/height) with bg/border + non-full radius containing `<svg>`/icon `<i>` |
| 3 | hero-eyebrow-chip | layout | checks.mjs `checkHeroEyebrow` | `<h1>` whose previous sibling is 2–60 chars, uppercase (transform/class/ALL-CAPS text) and tracked or ≤14px |
| 4 | monotonous-spacing | layout | detect-text.mjs analyzer (direct port) | padding/margin/gap px+rem+Tailwind values; ≥10 samples, dominant >60%, ≤3 unique |
| 5 | repeated-section-kickers | layout | checks.mjs `checkRepeatedSectionKickers` | eyebrow-shaped sibling before `h2`/`h3`; fires at ≥3 on page |
| 6 | purple-triplet | signature | ai-tells.md Checkable Signatures | hex `#6366F1`/`#8B5CF6`/`#A855F7` or Tailwind `(text|bg|from|to|border)-(indigo|violet|purple)-500` |
| 7 | uniform-low-opacity-shadow | signature | ai-tells.md Checkable Signatures | shadow alphas 0.08–0.12 on ≥3 declarations with no alpha outside the band |
| 8 | unmodified-shadcn-tokens | signature | ai-tells.md Checkable Signatures | shadcn default `--radius: 0.5rem|0.625rem` co-occurring with ≥2 known default HSL variable values |
| 9 | dark-glow | signature | detect-text.mjs analyzer (direct port) | dark page bg + colored box-shadow with blur >4px |
| 10 | em-dash-overuse | copy | detect-text.mjs (direct port) | ≥5 em-dashes/`--` in stripped body text |
| 11 | marketing-buzzword | copy | detect-text.mjs (direct port) | stock SaaS phrase list |
| 12 | numbered-section-markers | copy | detect-text.mjs (direct port) | ≥3 zero-padded sequential markers |
| 13 | aphoristic-cadence | copy | detect-text.mjs (direct port) | ≥3 manufactured-contrast / short-rebuttal constructions |
| 14 | theater-slop-phrase | copy | antipatterns.mjs (ungated per ai-tells.md) | `\b\w+ theater\b` phrasing in body text |
| 15 | overused-font | type-color | antipatterns registry + ai-tells.md (incl. Space Grotesk) | font-family / Google Fonts URL against the overused list |
| 16 | gradient-text | type-color | detect-text.mjs matchers (direct port) | `background-clip: text`+gradient, or `bg-clip-text`+`bg-gradient-to-*` |

### detect.mjs — interface (the Phase-8 seam)
- CLI: `node scripts/detect.mjs <file.html> [more files…]`. Exported pure core: `detect(html, filePath)` + `RULES`.
- Output: pretty JSON on stdout: `{ detector, version, status: "ran"|"na", sources, rules: <count>, findings: [{rule, category, severity, evidence, line}], counts: {total, byRule} }`.
- Exit codes (dealer.mjs convention): **0** = ran (findings or zero findings — both are a clean run), **1** = internal/usage error, **3** = N/A (no argument given, or no given path exists) with `status: "na"` + `naReason` in the JSON. N/A is structurally distinct from "ran and found 0" in both exit code and JSON status.
- Header: Apache-2.0 reference, attribution to pbakaus/impeccable, explicit modification statement (static-subset port, DOM checks re-implemented as HTML/CSS string heuristics, thresholds from ai-tells.md).

### HTML scanning approach
One lightweight tag-stack scanner (no DOM, no deps): walks tags with a regex tokenizer, tracks open-element stack with class/style attrs, per-frame last-closed-sibling (for eyebrow/tile sibling checks), svg/icon containment, and text content. A small `<style>` extractor maps single-class selectors to declaration text so vanilla-CSS prototypes (the `prototype` skill's actual output shape) resolve, not just Tailwind/inline styles. This is deliberately a heuristic engine, not a CSS engine — false-negative-leaning by design; the LLM assessment covers what statics can't see.

### design-review-agent.md — dual-blind restructure
- **Assessment A** = the existing Steps 0–3 (render → triage → doctrine → findings), unchanged in protocol, plus a distinctiveness criterion in the always-on visual baseline.
- **Assessment B** = `node scripts/detect.mjs <html> > <review-dir>/detect.json` run at the START (Step 0), with output redirected to a file that is **not read** until Assessment A's findings are written down. Isolation rationale documented in the doc: B is deterministic, so it cannot be contaminated by A; the contamination risk is A anchoring on B — hence B's output stays unread until A is frozen, then synthesis merges both.
- **Skipped detector = FAILED review run**: if a rendered `.html` exists and the detector was not run (or exited 1), the run is invalid → FAIL. **Carve-out**: no rendered HTML artifact (research/plan-only phase) → detector N/A (exit 3, `status: "na"`) → noted, never a failure.
- **DW-6.2 distinctiveness criterion**: new verdict rule — a surface that is competent but generic (fails ai-tells.md CHECKER mode: no nameable aesthetic direction, indistinguishable from AI-default output) is a Critical finding; on-pattern safety alone cannot yield PASS. Grounded in the kitsch counter-evidence (LLM raters rate generic work higher — the rubric must not reward safe convergence).
- **Register-justified detector hits**: synthesis rule — a B hit that A independently justifies by register (e.g. deliberate luxury glassmorphism) resolves through the existing severity model, quoting the detector evidence in the row; not an automatic FAIL.
- Output template gains: Assessment B section (detector status + findings summary) and a Synthesis note; findings table rows from B carry pillar tag `detector`.

### mock.md / build.md — dispatch-line edits ONLY
Add a `## Dual-blind review` block inside each review dispatch prompt: run BOTH assessments (A = cross-pillar critique, B = `node scripts/detect.mjs` on the `.html` path(s)), isolation per the agent's protocol, skipped-detector-is-FAIL with the N/A carve-out. No other machinery touched.

## Prerequisites
- [x] Phase 3 (`ai-tells.md` with Checkable Signatures + copy tells) — present
- [x] Phase 1 (orchestration) and current agent/command files — present
- [x] Impeccable sources readable at `/Users/r/repos/impeccable` — confirmed Apache-2.0
- [x] Node v22.17.0 available

## Recommendation
BUILD — implement `scripts/detect.mjs` + `scripts/fixtures/{sloppy,clean}.html` + `scripts/detect.test.mjs`, restructure `agents/design-review-agent.md` into Assessment A/B dual-blind, add the dual-blind block to both dispatch prompts, run the suite + both fixture CLI invocations, capture output.
