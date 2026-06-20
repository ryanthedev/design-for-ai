# Discovery + Design: Phase 4 - the two agents (design-build-agent + design-review-agent)

## Files Found
- `/Users/r/repos/code-foundations/agents/build-agent.md` (245 lines) — the build-agent template to MIRROR (baseline discipline + discover→stub→implement→validate).
- `/Users/r/repos/code-foundations/agents/post-gate-agent.md` (177 lines) — the post-gate-agent template to MIRROR (independent, execution-first, zero intent-framing review).
- `.code-foundations/fold-source/audit-conductor-SKILL.md.diff` — the preserved conductor churn (triage→dispatch→synthesize prose, surface-signal→pillar map, image-first "critique the pixels" rule, cap+name-deferred rule, ONE-ranked-report synthesis rule). Identical to what is in committed HEAD vs 1dc8f13, so the source for the fold is intact.
- `.code-foundations/fold-source/audit-conductor-discovery.md` — design rationale for the conductor (dispatch-vs-inline reasoning, cap ceiling ~3-5 from agent skill §4, additive-not-rewrite reasoning).
- `skills/design-for-ai/SKILL.md` (354 lines) — currently CONTAINS the conductor churn (committed in `d2b8483`, on the branch between `1dc8f13` and HEAD). Must be reverted to its `1dc8f13` state.
- `skills/prototype/SKILL.md` — the mock contract the build-agent calls (HTML/CSS mock; graceful render loop; returns screenshot path when browser MCP connected, emits `.html` + open note when not).
- `skills/design-for-ai/scripts/palette.mjs` — the contrast tool. Emits a WCAG contrast report (PASS/FAIL per pair) and **exits non-zero (code 2) when any pair is below target** — directly usable as pass/fail execution evidence for the build-agent.
- `docs/foundations-standards.md` — frontmatter shape, ≤1024-char description, cite-the-principle, cite-down/acyclic dependency direction.
- `docs/workflow-conventions.md` — the design lifecycle + DESIGN.md/JOURNEY.md gates + design done-when vocabulary (cited by the agents).
- `agents/` — does NOT yet exist; create it.

## Current State
- No `agents/` directory exists. Both agent files are new.
- The conductor content lives in `skills/design-for-ai/SKILL.md` (committed `d2b8483`). `git diff 1dc8f13 HEAD -- skills/design-for-ai/SKILL.md` = 35 insertions / 14 deletions — exactly the churn. Working tree is clean vs HEAD.
- The fold-source `.diff` is byte-for-byte the same churn → folding from it loses nothing; reverting the core skill afterward is safe.

## Gaps
| # | Gap | Resolution |
|---|-----|-----------|
| G1 | The plan template (build-agent) is grounded in code tests; this phase re-grounds validation to **design execution evidence** (palette.mjs contrast, mock renders, tokens applied). | Re-write the Validation sections around contrast/render/token evidence; keep the baseline discipline verbatim in spirit. |
| G2 | post-gate-agent reviews a code phase; this phase re-grounds it to **triage→dispatch→synthesize ONE cross-pillar report on rendered pixels**, folding the conductor. | Fold the conductor's triage map + image-first + cap + single-report rules into the review agent's protocol. |
| G3 | The conductor currently sits on the committed core skill and must come off. | `git checkout 1dc8f13 -- skills/design-for-ai/SKILL.md` AFTER the fold; verify `git diff 1dc8f13` empty. |
| G4 | No-screenshot path (browser MCP down) must be graceful in the review agent. | Add an explicit "no pixel evidence" branch: critique HTML/structure, note the missing screenshot, do not fail. |

## Code Standards
No `docs/code-standards.md` in this repo. The governing conventions are `docs/foundations-standards.md` (frontmatter `name`+`description`; ≤1024-char description; cite-the-principle; cite-down/acyclic) and `docs/workflow-conventions.md`. Agent definition files live in `agents/` (mirror code-foundations) — they are NOT skill dirs, so `validate_skill` does not apply; they need only valid frontmatter (`name`, `description`) and the protocol body.

## Test Infrastructure
Markdown agent definitions — no unit-test framework. Verification = **desk check**: file exists; frontmatter valid (`name`, `description`); required protocol sections present; exact load-bearing strings present (verified via `grep`); the revert provably complete (`git diff 1dc8f13 -- skills/design-for-ai/SKILL.md` empty). Each DW item records a command run + output, or quoted lines.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases (verification) |
|-------|---------------|--------|---------------------------|
| DW-4.1 | `agents/design-build-agent.md` exists — baseline discipline + design done-when traceability; loads `## Additional Skills`; validates with design execution evidence (contrast/render/token). | COVERED | (a) `test -f agents/design-build-agent.md`; (b) `grep` for the baseline-discipline headings (Scope Latitude, Done-When Traceability), the `## Additional Skills`/STOP-Load block, and the design-execution-evidence section naming palette.mjs contrast + mock render + tokens applied. |
| DW-4.2 | `agents/design-review-agent.md` exists — independent (zero intent-framing), execution-first, triage→dispatch→synthesize ONE ranked cross-pillar report on the rendered pixels, with cap+name-deferred. | COVERED | (a) `test -f agents/design-review-agent.md`; (b) `grep` for the independence/no-intent-framing rule, "execution-first"/execute-first, the three step headings (triage, dispatch, synthesize), "ONE"/single ranked report, and the cap + "Deferred:" rule. |
| DW-4.3 | the audit-conductor triage map + image-first rule are present in the review agent (folded from the preserved fold-source). | COVERED | `grep` for the surface-signal→pillar map rows (data-viz / content-design / usability / journey / behavioral+deceptive-patterns) AND the image-first "critique the pixels" rule, both present in `agents/design-review-agent.md`. |
| DW-4.4 | the conductor churn on `skills/design-for-ai/SKILL.md` is reverted — its pre-pivot description/triggers are intact (`git diff 1dc8f13 -- skills/design-for-ai/SKILL.md` is empty). | COVERED | `git diff 1dc8f13 -- skills/design-for-ai/SKILL.md` → empty output (exit 0, no diff). Also `grep` confirms the pre-pivot description (no "make it look good" in the description line) and the pre-pivot single-pillar audit mode. |
| DW-4.5 | the review agent's no-screenshot path is graceful (critiques structure + notes missing pixel evidence, no error). | COVERED | `grep` for the explicit no-screenshot/browser-MCP-down branch in `agents/design-review-agent.md`: critique HTML/structure, note missing pixel evidence, no fail. |

**All items COVERED:** YES (5 DW-IDs in prompt = 5 DW-IDs here.)

## Design Decisions

**Build-agent — mirror, then re-ground validation (DW-4.1).**
- Keep the build-agent's Baseline Discipline (Scope Latitude, Done-When Traceability, Validation Coverage, Test Anchoring, Concise Implementation) — these are domain-independent and the constraint says "MIRRORS its baseline discipline." Re-ground the prose to design: "tests" become **design execution evidence**.
- The phase artifact set is design: DESIGN.md tokens (via `palette.mjs`), a JOURNEY.md page spec, a mock (via the `prototype` skill). The validation pass replaces "run the test suite" with three concrete evidence kinds:
  1. **Contrast** — run `palette.mjs` (it exits non-zero if any WCAG pair fails); the PASS report is the evidence. Never weaken a contrast/token requirement to make progress (DESIGN.md law-once-locked gate — `docs/workflow-conventions.md`).
  2. **Render** — invoke `prototype`; the mock renders (screenshot path when browser MCP up; `.html` + open note when down). A mock that does not render is a defect, not a deferral.
  3. **Tokens applied** — the rendered surface uses the DESIGN.md tokens (not hand-picked one-off colors).
- Per `oberskills:agent` §2: agent definition preloads skills via the `## Additional Skills` STOP block (mirroring build-agent's existing block) so the phase's pillar skills self-load. The build-agent is `model: opus`-class work (writes artifacts, decides) — but the **agent definition does not pin a model**; the dispatching command (Phase 5) chooses. Mirror build-agent which carries no `model` in frontmatter.

**Review-agent — mirror independence, fold the conductor (DW-4.2, 4.3, 4.5).**
- Keep post-gate-agent's **Reviewer Stance** (you did not write this; no intent-framing) and **Independence rule** (requirements + rendered artifact only — no plan Context, no build narrative). This is non-negotiable per the constraints.
- Keep **execution-first** (post-gate's "Step 0 — Execute First"): for design that means *render/screenshot first*, then critique the pixels — evidence grounds the verdict.
- Fold the conductor's three-step protocol verbatim-in-spirit: **triage** (surface-signal→pillar map; visual+usability always-on baseline; dispatch a pillar only when its signal is present) → **dispatch** (hand off to each applicable sibling pillar; the cap + name-deferred rule for large surfaces) → **synthesize** (ONE severity-ranked, de-duplicated, pillar-tagged table; "Deferred:" line when capped).
- **Image-first rule** folded: when a screenshot/rendered mock is supplied, critique the actual pixels, not a textual description; cite the principle for every image finding.
- **No-screenshot graceful path (DW-4.5):** an explicit branch — if no screenshot is available (browser MCP down), critique the HTML/structure, the tokens, and the spec, and **note the missing pixel evidence as a coverage gap** — never error, never fail the review on the absence of pixels. Mirrors the prototype skill's own graceful fallback.
- **Edge cases folded** per the plan: visual-only surface → baseline (visual+usability) only, do not force data-viz/content; large surface → cap + name deferred (no silent truncation).

**Fold-then-revert ordering (DW-4.3, DW-4.4) — critical.**
1. FIRST write `agents/design-review-agent.md` with the folded conductor content (triage map, image-first, cap, single-report).
2. THEN revert: `git checkout 1dc8f13 -- skills/design-for-ai/SKILL.md`. Verify `git diff 1dc8f13 -- skills/design-for-ai/SKILL.md` is empty. Nothing is lost because the conductor now lives in the review agent (and the fold-source `.diff` remains on disk as a backup).

**Prompt craft (oberskills:prompt).** Both agents are reusable agent definitions / dispatch briefs. Apply: governance separate from task; reasoning/evidence fields before verdict fields; positive framing ("critique the pixels you can see") with the *why* stated; no prefill; no CRITICAL/MUST over-prompting beyond the two non-negotiables (independence; never weaken a contrast/token gate), which carry their reason. The review framing rule (search for defects, never "confirm it's correct") is applied to the review-agent's stance.

## Prerequisites
- [x] code-foundations templates readable (build-agent.md, post-gate-agent.md)
- [x] fold-source preserved (`.diff` + discovery) and verified identical to the committed churn
- [x] palette.mjs present + confirmed to emit a pass/fail contrast report (exit code 2 on failure)
- [x] prototype skill present (the mock contract)
- [x] revert target reachable (`git show 1dc8f13:skills/design-for-ai/SKILL.md` works; d2b8483 is the churn commit)
- [x] No missing prerequisites

## Recommendation
**BUILD.** Two new agent files mirror the code-foundations templates re-grounded for design; the conductor folds cleanly into the review agent (source preserved); the revert is a clean `git checkout` of one file to `1dc8f13`. No DW item is CANNOT_MEET. Fold BEFORE revert.
