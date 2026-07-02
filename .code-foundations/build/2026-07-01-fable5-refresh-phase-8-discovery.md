# Discovery + Design: Phase 8 - Eval — fingerprint Fable 5 defaults, measure the mitigations

## Files Found
- `scripts/detect.mjs` — verified working: exit 0, JSON with `findings[]` (rule/category/severity/evidence/line), 16 rules; sloppy fixture fires 15, exit 3 = N/A
- `scripts/dealer.mjs` — verified working: `--project eval-probe --date 2026-07-02 --candidates 2` exits 0, emits hands (family + composition discipline + golden-angle hue + signature), 102 legal cells
- `references/visual/ai-tells.md` — 359 lines, 7 dated tables, ends at COMMON MISTAKES table; addendum appends after it
- `references/visual/design-dna.md` — 257 lines, current (ground→diverge→critique→converge→gate + dealer contract)
- Old-arm doctrine at `a77ccce^` (= c72f27d): `references/visual/design-dna.md` (160 lines, menu-pick pipeline, remix rules, inline kill-list) — verified readable via `git show`
- `.gitignore` has `*-workspace/` → `skills/design-for-ai-workspace/` is gitignored as required
- MCP tools loaded: `compare_outputs` (fresh-context judge, sides shuffled pre-dispatch — satisfies the blindness constraint in tooling, not prose), `grug-write`

## Current State
Phases 1–7 committed (fab6923 = v4.1.0). Both instruments this phase scores with exist and pass their own suites (19 + 34 tests). No eval artifacts exist yet; `skills/design-for-ai-workspace/` does not exist yet.

## Gaps
- There is no `skills/design-for-ai/` skill dir anymore (4 surviving skills), so skill-eval's `run_eval` (which requires `skill_path`) is a poor fit for generating unprompted mocks. Generation channel decided below instead.
- `a77ccce^` includes Phase 3's tells refresh and Phase 2's de-prescriptify — so the A/B isolates the **Phase 4+5 delta** (pipeline reshape + dealer + two-reference grounding), exactly the assumption row P8 exists to test ("seeded composition dealing reduces genericness"). This scoping is per the dispatch prompt's explicit designation of `a77ccce^` as the old arm.

## Code Standards
No `docs/code-standards.md` in this repo (checked). Phase writes no production code — only eval artifacts, one doctrine addendum, grug memory.

## Test Infrastructure
This phase IS the test. Scoring instruments: `detect.mjs` (deterministic) + `compare_outputs` (blind LLM judge). No unit tests to write; validation = the artifacts + scores themselves, with the honesty constraints below.

## Experiment Design

### Generation channel (both experiments)
**Preferred:** `claude -p` headless from the session scratchpad dir (outside the repo) — a genuinely fresh Fable 5 context: no project CLAUDE.md, no doctrine, cost reported via `--output-format json`. Probe once before committing to it.
**Fallback:** Agent-tool subagents (`claude`, model fable, foreground). Known contamination: subagents see the repo CLAUDE.md, which names anti-generic doctrine at a high level (not the tell catalog). This biases the fingerprint toward FEWER tells → fingerprint becomes a lower bound; caveat recorded in the addendum. For the A/B the contamination is symmetric across arms, so the comparison survives.

### Experiment 1 — Fingerprint (N=6)
Six plain briefs, minimal steering (the point is unprompted defaults): (1) a pricing page for a SaaS product, (2) a SaaS landing page, (3) an analytics dashboard, (4) a login screen, (5) a settings page, (6) a blog index. Constraint per run: one self-contained `.html`, embedded CSS, no build tools; Google Fonts `<link>` permitted (so font tells can surface naturally); JS not required.
Score: `detect.mjs` per file → `fingerprint/detect-<name>.json`. Aggregate: per rule, **prevalence** (files fired ≥1) and total hits. "Top default tells" = prevalence ≥ 3/6.
Output: `skills/design-for-ai-workspace/fingerprint/` (6 html + 6 detect JSON + `summary.json`), then a dated FINGERPRINT ADDENDUM appended to `ai-tells.md` (new section; zero edits to existing tells), `Last reviewed: 2026-07`, citing the workspace artifacts, N, channel, and caveats.

### Experiment 2 — A/B (3 briefs × 2 arms)
Briefs (distinct content pressures, identical across arms):
1. Landing page for "Ledgerline" — bookkeeping SaaS for freelance designers
2. Pricing page for "Fieldnote" — a field-biology note-taking app
3. Dashboard for "Kilnworks" — ceramics studio management (kiln schedules, firings, inventory)

**OLD arm:** fresh generator context gets the brief + the `a77ccce^` `design-dna.md` text + `a77ccce^` `archetypes.md` (its family definitions dependency), extracted to `workspace/old-doctrine/` — generated from git text, not memory. Instruction: follow the doctrine, self-select the strongest candidate (no user in loop), implement as one self-contained HTML file. Files the old doctrine cites but that aren't provided (ai-tells.md) → use only what's inline.
**NEW arm:** fresh generator context gets the brief + current `design-dna.md` + current `archetypes.md` + a pre-dealt 5-candidate hand from `node scripts/dealer.mjs --project <brief-slug> --date 2026-07-02 --candidates 5` (saved to `workspace/deals/`). Instruction: run the ground→diverge→critique→converge pipeline with the dealt hands (two named references per candidate), self-converge, implement.
Neither arm gets `ai-tells.md` (providing the refreshed catalog to only one arm would confound; the old design-dna carries its own inline kill-list — that asymmetry IS part of the pipeline delta being measured).
Layout: `workspace/ab/<brief>/old/index.html` and `.../new/index.html` (one file per dir, so `compare_outputs` dirs are clean).

**Scoring (pre-committed before any generation):**
- (a) `detect.mjs` per output. Primary metric: total finding count per arm (sum over 3 briefs); secondary: high-severity count. Lower = less generic.
- (b) `compare_outputs` per brief: side A = old dir, side B = new dir (tool shuffles sides itself; judge = fresh-context sonnet; task_description = the brief + "goal: a visually distinctive design with a clear point of view, not a generic template" — no arm identity leaked). Distinctiveness assertion supplied as tiebreaker.

**Success criterion (verdict is stated against exactly this):** refreshed arm has strictly fewer total detector hits (sum across briefs) AND wins the blind distinctiveness judgment on ≥2 of 3 briefs. Detector-only improvement = PARTIAL (kitsch-at-execution-layer counter-evidence → feeds Phase 4 critique criteria). Neither = NULL. Both reported to grug either way; NULL/PARTIAL also updates the plan's Assumptions rows ("Seeded composition dealing reduces genericness", and "De-prescription improves adherence" if evidence bears on it) + a follow-up note.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases / Evidence |
|-------|---------------|--------|------------------------|
| DW-8.1 | Dated fingerprint addendum in ai-tells.md — N≥6 unprompted outputs, detector-scored, top default tells named | COVERED | `workspace/fingerprint/{6 × .html, 6 × detect-*.json, summary.json}`; addendum section in ai-tells.md dated 2026-07-02 citing those artifacts; verify: `grep -n 'FINGERPRINT ADDENDUM' references/visual/ai-tells.md` + 6 files present + prevalence table matches detect JSONs |
| DW-8.2 | A/B complete: both arms scored by detect.mjs + blind compare_outputs; results (incl. null) in grug design-for-ai/ | COVERED | `workspace/ab/<brief>/{old,new}/index.html` ×3, detect JSONs ×6, `comparison.json` ×3 (judge blind by tool construction); grug-write to `design-for-ai/fable5-refresh-eval-results-2026-07` |
| DW-8.3 | Explicit verdict vs the success criterion; if null/partial, Assumptions rows updated + follow-up filed | COVERED | Verdict section in grug note + final report, stated against the pre-committed criterion above; on NULL/PARTIAL: edit plan Assumptions table rows + follow-up note in plan Notes/Execution Log |

**All items COVERED:** YES (count: 3/3 matches dispatch)

## Design Decisions
- `claude -p` from scratchpad preferred over Agent-dispatch for generation — the only channel with a truly doctrine-free context; probed before use; fallback documented with its bias direction stated.
- `compare_outputs` chosen over a hand-rolled judge subagent — blindness (side shuffling) and fresh context are enforced by the tool, not by my prose; cost reported.
- Success criterion, metrics, and brief set are pre-committed in this file BEFORE any generation runs — no post-hoc metric selection. A null is a reported outcome, not a failure of the phase.
- Pre-dealing the dealer hands (rather than having the arm agent run node) keeps the deal deterministic, recorded, and part of the artifact trail.
- 6 + 6 generations, 3 judge calls: within budget; approximate cost recorded in the grug note.

## Prerequisites
- [x] detect.mjs + dealer.mjs exist and smoke-pass (verified this session)
- [x] Old doctrine retrievable from git `a77ccce^` (verified)
- [x] compare_outputs + grug-write schemas loaded
- [x] Workspace path gitignored (`*-workspace/`)

## Recommendation
BUILD — run Experiment 1, write the addendum, run Experiment 2, score, write grug, state the verdict, update assumptions if warranted.
