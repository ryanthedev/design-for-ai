# Discovery + Design: Phase 4 - Design pipeline restructure

## Files Found
- `references/visual/design-dna.md` (160 lines) — the target. Current shape: Why DNA → Four Axes → Remix Rules → Signature Move → Generating 5 Candidates (A–E persona recipe: honest default / tension / dark horse / inversion / cultural wildcard) → Presenting Candidates (menu pick) → DESIGN.md Template → The Gate.
- `references/visual/ai-tells.md` (Phase 3 refreshed) — the critique pass's scan target. Sections: DETECTION CHECKLIST (typography/color/layout/detail/motion/copy tells), Checkable Signatures (2026), all tables `Last reviewed: 2026-07`.
- Plan file `.code-foundations/plans/2026-07-01-fable5-refresh.md` — Phase 4 spec + Phase 5 seam (dealer deals family + composition discipline + hue + signature; `composition: <dealt>` slot must exist here).
- Research: REPORT.md Theme 4 (diverge → criteria-bound critique → synthesis → loop; references precede sketching; two-named-reference anchoring is the one Claude-specific mitigation) + Theme 8 (minimal-vs-maximal resolves as moments-vs-structure within one surface, category-conditional); designer-process dimension file (NN/g Design Studio mechanics, gap table against this exact pipeline).

## Current State
The pipeline IS the verified root cause: one generation pass of 5 candidates → inline spec blocks → "pick one by name." No reference grounding before generation, no critique phase, convergence is a menu choice (a partial recombine rule exists: "if the user picks pieces from two candidates, recombine... re-present once" — a seed of synthesis, buried in Presenting), no loop-back. Candidate A is literally branded "the honest default... the safe option" — the distributional center with a flattering name, and Candidate D is defined relative to it. Register is global (`Register caps commitment`, remix rule 5; `**Register:** [brand|product]` in the template). No composition slot. Stale reference: remix rule 6 cites an ai-tells "kill list (detection checklist = ban list)" that Phase 3 removed — ai-tells.md now has a DETECTION CHECKLIST + severity model, no ban-list framing.

## Gaps
| # | Gap (plan vs reality) | Resolution |
|---|---|---|
| 1 | Remix rule 6 + template's "## Never (this project's kill list)" cite a "kill list" that no longer exists in ai-tells.md | Reword to reference the DETECTION CHECKLIST / tells catalog by path — coherence fix, in scope (design-dna.md only) |
| 2 | Candidate D ("the inversion") is defined relative to the honest default — removing A's framing orphans D | The A–E persona recipe is replaced wholesale by collision-driven divergence; inversion survives as a divergence device, not a persona |
| 3 | `AskUserQuestion` "Lock this in?" in The Gate — Phase 1 confined AskUserQuestion to decisive 2–4-option picks | Lock/adjust IS a 2-option pick; keeps AskUserQuestion. No change needed |
| 4 | DW-7.3 will later grep `honest default` repo-wide; `references/behavioral/references/behavioral-principles.md:225` says "honest defaults" (unrelated sense) | Out of my file scope; flagged for Phase 7 |

## Code Standards
No `docs/code-standards.md` found. Governing conventions instead: `docs/foundations-standards.md` (reference-file shape, cite-the-principle, dated lists) and the Phase 2 de-prescriptified style — principle + reason + dated examples, no all-caps imperatives, no new ban-lists. design-dna.md was excluded from Phase 2's sweep, so this rewrite also brings it to that style.

## Test Infrastructure
Markdown-doctrine repo: tests are executed grep/inspection checks per DW plus a full coherence read. Each DW check is a concrete command run against the edited file, output captured in the phase report.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-4.1 | Each candidate requires two named, distinct references with a stated collision ("X's [quality] + Y's [quality]") | COVERED | T-4.1: `grep -n` for the two-reference requirement + collision format in the grounding section and the GROUNDING field in the spec block; confirm the requirement is stated as per-candidate |
| DW-4.2 | Criteria-bound critique pass over all candidates precedes selection; synthesis + one loop-back documented | COVERED | T-4.2: `grep -n '^## '` shows Critique section ordered before Converge/selection; grep for the three criteria (distinctiveness, register fit, tells scan w/ ai-tells.md path), synthesis option, and one-loop-back option |
| DW-4.3 | Register is a per-surface-moment dial in the DNA schema; global-archetype register framing gone | COVERED | T-4.3: `grep -n 'egister'` — no `[brand\|product]` global field, no "Register caps commitment"; per-moment dial present in schema (spec block + DESIGN.md template) |
| DW-4.4 | "honest default" removed; DNA schema carries a `composition` slot referencing the dealer | COVERED | T-4.4a: `grep -n 'honest default' references/visual/design-dna.md` → empty; T-4.4b: `grep -n 'composition' → `<dealt>` slot + forthcoming-dealer reference in spec block and template |

**All items COVERED:** YES

## Design Decisions

**New section order (the pipeline becomes the TOC):**
1. Why DNA Instead of "A Style" (kept, light touch)
2. The Pipeline (new, ~6 lines) — ground → diverge → critique → converge → gate, one optional loop-back; names the designer-practice source shape
3. Ground: Two References per Candidate (new) — DW-4.1 home
4. The Four Axes (kept; layout-discipline axis gains the dealer note)
5. Remix Rules (kept; rule 5 rewritten per-moment, rule 6 reworded to tells-catalog scan)
6. Register: a Per-Moment Dial (new) — DW-4.3 home; Theme 8's moments-vs-structure
7. The Signature Move (kept; reframed as the first expressive moment)
8. Diverge: Generating 5 Candidates (rewritten) — keeps 5-count, hue-family spread, green guard, content-derived seeds, two-word names; drops A–E personas
9. Critique: One Pass, All Candidates, Before Any Choice (new) — DW-4.2 home
10. Converge: Pick, Synthesize, or Loop Once (rewritten from Presenting Candidates) — synthesis worked example lives here (plan's named uncertainty)
11. DESIGN.md Template (preserved; field-level updates: References line, Register→structure+moments, Composition `<dealt>` line, "kill list" heading reworded)
12. The Gate (kept)

**Key choices and why:**
- **Divergence device = disjoint reference pairs, not personas.** The A–E recipe ranked candidates safe→wild, making A the modal pick. Replacement rule: ten distinct references across five candidates (no reference anchors two candidates) + the existing hue-family spread + at least one candidate inverting a structural assumption of another. Divergence pressure without a "safe option" slot.
- **Collision stated as one line in the schema** (`GROUNDING X's [quality] + Y's [quality]`) so DW-4.1 is checkable in the artifact, not just the doctrine prose.
- **Critique output feeds synthesis** (NN/g: convergence pulls strongest elements identified during critique) — per-candidate strengths/weaknesses are recorded, weak candidates marked rather than dropped, so the synthesis step has material to combine.
- **Three legal convergence outcomes, fast path first-class:** pick-one (always legal, stated explicitly), synthesize (remix rules still govern — borrow limits, one dominant axis), loop back once (fresh divergent round seeded by critique findings; one loop, then converge — the DESIGN.md gate remains the sole exit). Never forced: offered.
- **Both-references-are-tells edge case** lands in the critique section: the tells scan checks the GROUNDING line itself, not just the output spec — two references that are both catalogued AI aesthetics (e.g. both from the cream/serif/terracotta escape-hatch cluster) triangulate back to the center; re-ground that candidate with at least one reference outside the catalog.
- **Composition slot semantics:** the layout-discipline axis's value becomes `composition: <dealt>` — dealt by the forthcoming seeded dealer (Phase 5, `scripts/dealer.mjs`); until it ships, the position is chosen under the remix rules and recorded in the same slot. Hue-independent, per plan constraint.
- **Register schema:** each DNA names a structure register (the calm baseline the whole surface holds) + 1–3 expressive moments (where the dial turns up). Replaces `[brand|product]`; the old product/brand intuition survives as "how far up the dial the moments go," category-conditional.
- **Style:** principle + reason + dated example throughout; no new ban-lists; the one enumerated list I touch (rule 6) becomes a pointer to ai-tells.md's dated catalog.

## Prerequisites
- [x] `references/visual/design-dna.md` exists (160 lines, read in full)
- [x] Phase 3 landed: ai-tells.md refreshed (commit 2e2a7d3) — the tells-scan target exists at the referenced path
- [x] Phase 5 seam understood: dealer deals family + composition discipline + hue + signature; this phase only reserves the slot
- [x] No inbound anchor links to design-dna.md sections from other files (grep verified) — safe to rename/reorder sections

## Recommendation
BUILD — restructure per the section plan above; all four DW items map to concrete, greppable edits.
