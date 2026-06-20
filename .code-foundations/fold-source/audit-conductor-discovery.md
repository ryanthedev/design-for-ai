# Discovery + Design: Phase 2 - audit → holistic cross-pillar Validate conductor

## Files Found
- `skills/design-for-ai/SKILL.md` (334 lines) — the core skill. `audit` mode is lines 230–264; description is line 3 (1019 chars, headroom to 1024 is only 5 chars — see Gap G1); routing table lines 35–43; pillar index lines 56–77.
- `skills/design-for-ai/references/checklists.md` (631 lines) — the full visual review checklist the audit mode loads. Must be preserved.
- `skills/design-for-ai/references/ai-tells.md` (291 lines) — the AI-tells / identity audit content. Must be preserved.
- `skills/usability/SKILL.md` — the dispatch pattern to match: the audit mode already references usability ("dispatch to the usability sibling skill … fold its findings into the same severity-sorted table"). usability's procedure A is literally labelled "the `audit` method".
- `skills/prototype/SKILL.md` — Phase 1 output. Its contract: "Supplying a screenshot for the audit conductor (Phase 2) to critique" and "returns a screenshot path when connected." This is the image-input seam for DW-2.3.
- `docs/pillar-taxonomy.md` — the 8 pillars + disjoint scopes; the triage surface→pillar map source of truth.
- `docs/foundations-standards.md` — §2 (≤1024 desc), §4 (cite-the-principle, stay-generative guardrail), §6 (eval gate: validate 0/0 + test_triggers both directions).
- `skills/design-for-ai-workspace/trigger-queries.json` — existing baseline: 20 queries (10 should-fire, 10 should-not). **Zero holistic phrasings present** — exactly the DW-2.2 gap.
- `.claude-plugin/plugin.json` — version 3.0.0 (bump is Phase 4, not here).

## Current State
The `audit` mode (lines 230–264) is a **single-pillar visual review** with ONE sibling dispatch already wired: usability. It owns the visual checklist (typography/color/composition/hierarchy/identity via `checklists.md` + the chapter-reference table), and it dispatches usability's heuristic eval, folding findings into one severity-sorted table. It does NOT:
- triage what is actually on the surface,
- dispatch the other 6 pillars (data-viz, content-design, journey, behavioral, deceptive-patterns, ai-tells-as-pillar),
- critique a supplied screenshot/image,
- cap + name deferred pillars on a large surface.

The core **description** does not contain the holistic phrasings ("make it look good", "is this any good", "improve the whole thing", "review the whole design"). The routing table's `audit` row has near-synonyms ("review this", "improve", "redesign") but the distinctive holistic-quality phrasings are absent, so the description (the only thing that drives cross-session triggering) under-covers them.

## Gaps

| # | Gap | Status |
|---|-----|--------|
| G1 | Description at 1019/1024 — only 5 chars headroom. The plan says "there's headroom now — core is at 1019" but adding holistic trigger phrases needs MORE than 5 chars. **Must reclaim space elsewhere in the description** (it already carries "auditing designs" + "something looks wrong/feels off"; tighten redundant phrasing to make room for the holistic-quality phrasings). | Resolve in BUILD |
| G2 | `audit` mode dispatches only usability; the other 6 pillars are unreferenced from the mode. | Build: triage→dispatch→synthesize |
| G3 | No image-critique instruction in the mode (DW-2.3). | Build: add image-first rule |
| G4 | No cap + name-deferred rule for large surfaces (DW-2.5). | Build: add the cap rule |
| G5 | Baseline `trigger-queries.json` has zero holistic phrasings → can't prove DW-2.2 without adding them. | Build: extend trigger set |

## Code Standards
No `docs/code-standards.md` in this repo. The governing conventions are `docs/foundations-standards.md` (frontmatter, ≤1024 desc, cite-the-principle, stay-generative, eval gate) and `docs/pillar-taxonomy.md` (disjoint scopes). Both read and applied.

## Test Infrastructure
This is a markdown skill plugin — the test suite is the **skill-eval MCP harness** (foundations-standards §6): `validate_skill` (0 errors / 0 warnings) and `test_triggers` (both directions) on `skills/design-for-ai`. There is an existing `trigger-queries.json` baseline in the workspace to extend. No code-level unit tests; "tests" here = harness runs whose pass verdicts are computed by the tool, never hand-filled.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-2.1 | core `audit` reworked to triage surface contents + dispatch only applicable pillars (data-viz/content-design/usability/journey/behavioral/deceptive-patterns), synthesize ONE ranked report | COVERED | Inspection of reworked mode: triage checklist present, all 6 pillars in the surface→pillar map, single-report rule stated. `validate_skill` 0/0. |
| DW-2.2 | holistic phrasings route to this conductor — `test_triggers` (fires conductor, not a single pillar, does not under-trigger) | COVERED | `test_triggers` on extended `trigger-queries.json`: 4 holistic-phrasing queries marked should_trigger=true; existing 10 narrow positives + 10 negatives stay. Pass = all holistic fire + no regression. |
| DW-2.3 | screenshot/image supplied → audit critiques the image (documented in the mode) | COVERED | Inspection: image-first rule present ("when a screenshot exists, critique the rendered pixels, not a description"); names the prototype screenshot seam. |
| DW-2.4 | existing visual + usability audit preserved (no regression); `validate_skill` 0/0 | COVERED | `validate_skill` 0/0; the visual checklist table + usability dispatch are unchanged in the reworked mode; existing 20 baseline triggers still pass. |
| DW-2.5 | conductor caps dispatched pillars on large surfaces + names what it deferred (no silent truncation) | COVERED | Inspection: explicit cap rule + "name what you deferred" instruction in the mode prose. |

**All items COVERED:** YES (5 DW-IDs in prompt = 5 DW-IDs here.)

## Design Decisions

**Where triage logic lives (the phase's named uncertainty).** Per the plan's own resolution ("lean on judgment with a clear checklist, not a rigid decision tree") and `agent` skill §1–2 (state trigger conditions in both directions; conservative dispatch), the mode gets:
- A **surface-detection checklist** (a table: surface signal → pillar to dispatch), conservative by construction ("dispatch a pillar ONLY when its signal is actually present").
- A **dispatch-vs-inline rule** from `agent` skill: the conductor dispatches a pillar's evaluation as a sibling-skill hand-off (matching the existing usability pattern — reference, not relocate), and synthesizes inline. No fan-out of subagents is mandated; the pillars are sibling skills triggered/loaded, exactly as usability is today. This keeps the change additive and avoids the cost of a subagent fan-out the plan didn't ask for.
- A **synthesis rule**: ONE severity-ranked, de-duplicated table — not N per-pillar silos. Severity scale reused from the existing Rules block (Critical/Major/Minor).

**Additive, not a rewrite (DW-2.4).** The existing visual checklist table (chapter-reference map) and the usability dispatch row stay verbatim. The conductor wraps them: triage runs first, the visual+usability audit is the **always-on baseline** (every surface is visual), and the other pillars are dispatched *conditionally* on triage. This is why no regression is possible — the baseline path is unchanged.

**Image-first rule (DW-2.3).** A short rule: when a screenshot/mock image is supplied (e.g. from `prototype`), critique the actual rendered pixels, not a textual description of them. Cite-the-principle still applies to image findings.

**Cap + name-deferred (DW-2.5).** On a large surface, cap the dispatched pillars (default ceiling ~3–5 beyond the visual+usability baseline, per `agent` skill §4 fan-out ceiling) and **name in the report what was deferred and why** — no silent truncation. The cap is a judgment ceiling, not a hard count.

**Description edit (G1, DW-2.2).** Reclaim ~30–40 chars by tightening existing redundant phrasing, then add the holistic-quality phrasings ("make it look good", "is this any good", "improve the whole thing", "review the whole design") to the trigger list. Verify with `test_triggers`; if it misfires, `optimize_description`. Must end ≤1024 (foundations-standards §2). This is the ONLY description change — it must not steal a pillar's narrow trigger (the negatives in `trigger-queries.json` guard this).

**Anti-cannibalization (the central risk, plan note T4/Notes).** The holistic phrasings are deliberately whole-surface framing ("the whole thing", "look good" with no narrow noun). Narrow phrasings ("what font", "pick a chart", "is my unsubscribe flow deceptive") must still route to their owners — guarded by the 10 negative trigger queries plus targeted new negatives.

## Prerequisites
- [x] Required files exist (SKILL.md, references, taxonomy, standards, usability pattern, prototype contract all present)
- [x] Dependencies available (skill-eval MCP: validate_skill, test_triggers, optimize_description)
- [x] Phase 1 prototype contract present (the screenshot seam for DW-2.3)
- [x] No missing prerequisites

## Recommendation
**BUILD.** The audit mode is additively upgradeable in place exactly as the plan's chosen approach states. No new requirement, no missing prerequisite, no DW item is CANNOT_MEET. The one real constraint (G1: 5-char description headroom) is solvable by tightening existing redundant phrasing — verified by the existing `trigger-queries.json` baseline plus the new holistic queries.
