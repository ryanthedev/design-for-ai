# Review: Phase 4 - design-dna.md process reshape

## Executed Results (Step 0)
This phase is markdown-doctrine (no runtime suite). Verification is greps + full-file coherence read, per the dispatch prompt's Test Coverage Level.

- Scope check: `git status` → working tree at `feature/fable5-refresh`, HEAD == `c72f27d`. Modified: `references/visual/design-dna.md` (123 insertions / 51 deletions), `.code-foundations/plans/2026-07-01-fable5-refresh.md` (7-line append, Phase-2 bookkeeping — see Notes). Untracked: `.code-foundations/build/2026-07-01-fable5-refresh-phase-4-discovery.md` (expected build artifact for this phase, not reviewed per the independence rule).
- `grep -ni 'honest default' references/visual/design-dna.md` → no matches (exit 1).
- `grep -niE 'composition:.*dealt|<dealt>|dealer' references/visual/design-dna.md` → 3 hits (lines 71, 134, 185).
- `grep -niE "collision|two.*(named|distinct).*reference|\+ .*'s" references/visual/design-dna.md` → 9 hits across Ground/schema/DESIGN.md-template/critique sections.
- `grep -niE 'critique|synthesi|loop.?back|per.?moment|register' references/visual/design-dna.md` → dense hits confirming Critique/Register/Converge sections present and cross-referenced.
- `grep -niE '5.candidate|five candidate|## the gate|DESIGN.md' references/visual/design-dna.md` → confirms "Diverge: Five Candidates", "DESIGN.md Template", "The Gate" sections all present.
- Full file read (297 lines) end to end.

## Requirement Fulfillment

### DW-4.1
PREMISE:  each DNA candidate requires two named, distinct references with a stated collision ("X's [quality] + Y's [quality]").
EVIDENCE: references/visual/design-dna.md:48-50 ("every candidate anchors to **two named, distinct references**, stated as a collision: > **X's [specific quality] + Y's [specific quality]**"); schema at line 129 (`GROUNDING [X]'s [specific quality] + [Y]'s [specific quality]`); DESIGN.md template at line 183 (`**Grounding:** [X]'s [specific quality] + [Y]'s [specific quality]`).
TRACE:    A build agent generating candidate N reads §"Ground" → must name two distinct references → writes them into the candidate's GROUNDING line in the exact "X's quality + Y's quality" form → the same line is carried verbatim into the locked DESIGN.md's Grounding field (line 183). Requirement text, schema field, and template field all agree on the same collision syntax.
VERDICT:  PASS

### DW-4.2
PREMISE:  a criteria-bound critique pass over ALL candidates precedes selection; synthesis-across-candidates AND one loop-back are documented options. (Confirm the section order: critique before selection; confirm the critique criteria include a tells scan against ai-tells.md.)
EVIDENCE: TOC order at lines 17-18 (`9. Critique...` before `10. Converge...`); section bodies at lines 145-156 (Critique) precede 159-172 (Converge); critique criteria table at lines 149-153 includes "Tells scan" row (line 153) explicitly citing `references/visual/ai-tells.md`; Converge's three legal outcomes at lines 163-165 include "2. Synthesize." and "3. Loop back once."
TRACE:    Pipeline table (line 34-42) states the phase order explicitly as ground → diverge → critique → converge → gate; the Critique heading (145) sits before the Converge heading (159) in document order, and its opening sentence ("Before anything is offered for selection, run one criteria-bound critique pass over all five") makes the precedence a stated rule, not just document layout. The three criteria rows (Distinctiveness, Register fit, Tells scan) are each scored per candidate before Converge's three outcomes are reached.
VERDICT:  PASS

### DW-4.3
PREMISE:  register is a per-surface-moment dial in the DNA schema; the global-archetype register framing is gone.
EVIDENCE: references/visual/design-dna.md:87-97 (§"Register: A Per-Moment Dial") defines Structure register + Expressive moments (1-3); schema field at line 136 (`REGISTER [structure register] structure · expressive at: [moment(s), with amplitude]`); DESIGN.md template line 182 mirrors the same two-part shape; line 96 explicitly states "What no longer exists is a global register that flattens every moment to the same level."
TRACE:    `grep -niE 'brand.?register|product.?register'` and `grep -niE "archetype('s)? register"` both return no matches — the old global single-value register framing (a "brand" or "product" cap on the whole surface) is not merely relabeled but textually absent; every remaining register reference uses "structure register" + "expressive moments" (a per-moment dial), matching the requirement.
VERDICT:  PASS

### DW-4.4
PREMISE:  "honest default" framing removed (`grep -ni 'honest default' references/visual/design-dna.md` returns nothing); the DNA schema carries a `composition` slot (e.g. `composition: <dealt>`) referencing the forthcoming dealer.
EVIDENCE: `grep -ni 'honest default'` → 0 matches (command exit 1, confirmed above). Composition slot: line 71 ("The composition slot is becoming a dealt token... the schema carries `composition: <dealt>`"), schema line 134 (`COMPOSITION <dealt> — from the seeded dealer (scripts/dealer.mjs, forthcoming); until it ships: [discipline chosen under remix rules]`), DESIGN.md template line 185 (`**Composition:** <dealt> ([dealer hand once scripts/dealer.mjs ships; until then, the chosen discipline])`).
TRACE:    `ls scripts/` confirms `scripts/dealer.mjs` does not yet exist (only `palette.mjs` is present) — the doc's "forthcoming" claim is accurate, not a dangling reference to something that should already exist. The composition slot degrades gracefully: until the dealer ships, the doc still tells the model what to do (choose under remix rules), so the doctrine is self-consistent with the dealer's absence.
VERDICT:  PASS

**All requirements met:** YES

## Test-DW Coverage
This phase's Test Coverage Level is "markdown-doctrine (greps + coherence read, no runtime suite)" — there is no automated test suite to run against a reference doc. Each DW item's coverage is the recorded observed behavior above (grep command + line-level read), which is the only form of evidence a markdown-doctrine phase can produce.
- [x] DW-4.1 — observed via grep + line read (48-50, 129, 183)
- [x] DW-4.2 — observed via TOC/section-order read + critique-table read (145-156, 159-172)
- [x] DW-4.3 — observed via grep (negative-match confirms old framing gone) + section read (87-97)
- [x] DW-4.4 — observed via grep (negative-match) + schema/template read + `ls scripts/`
- [x] Coverage matches the stated level (no runtime suite expected or attempted)

## Dead Code
N/A (markdown doctrine, not executable code). Checked for the doc-equivalent — dangling references to removed concepts:
- TOC anchors (12 entries) cross-checked 1:1 against actual `##`/`#` headers in document order — all resolve, none orphaned.
- `grep -n "layout discipline"` → one hit (line 68), but it's an intentional parenthetical gloss on the "Composition" axis name ("Composition (layout discipline)"), not a stray reference to a removed axis — the axis itself is consistently called "Composition" everywhere else (schema line 68 header, line 134 schema field, line 185 template field).
- `grep -niE "brand.?register|product.?register|archetype('s)? register"` → 0 matches — no residual old-framing language survives elsewhere in the file.
None found (FAIL-level).

## Correctness Dimensions
Not applicable in the conventional sense — this is prose doctrine consumed by an LLM reader, not executable code with concurrency/resource/boundary surfaces. Assessed the analogous "does the doctrine's logic hold under adversarial reading" dimension instead:

| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | Not applicable — static reference document, no concurrent execution model |
| Error Handling | N/A | Not applicable — no I/O, parsing, or external calls in the artifact itself |
| Resources | N/A | Not applicable — no file handles/connections/locks |
| Boundaries | PASS | Traced the "critique finds all 5 clustering" case: line 165 gives an explicit resolution (loop back once, seeded by findings) rather than leaving the process stuck; traced "user rejects all 5 and doesn't want synthesis or loop": line 171 ("Always invite 'None of these — tell me what's off'") gives an explicit fourth exit that doesn't loop the process infinitely — no unhandled dead end found |
| Security | N/A | Not applicable — no untrusted input surface in a static doctrine file |

## Loaded-Skill Criteria

Loaded `oberskills:prompt`. `design-dna.md` is not itself a live system/agent prompt, but it is doctrine text read into a build agent's context via `Read()` and directly governs the agent's generation behavior — the skill's prompt-construction criteria are a reasonable analogue and were applied to that framing.

| Skill | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| oberskills:prompt | #2 Explain why, positive framing (motivation generalizes) | PASS | Every rule states its rationale inline, not just its constraint — e.g. line 52 ("Why two: one reference is a clone target; two pull in different directions..."), line 89 (why a global register produces uniform/tell-y output). No bare "never do X" without justification found. |
| oberskills:prompt | #5 Example count matched to purpose (reasoning-pattern demonstration → ≥1 worked example) | PASS | The Converge section is a reasoning-pattern demonstration (how to synthesize across candidates); it carries exactly one worked example (lines 167-169, the "Copper Dawn"/"Tidal Press" → "Inkset Dawn" synthesis), matching the skill's "≥1 worked example, mandatory" guidance for this example type. |
| oberskills:prompt | #4 Rationale/evidence before answer in output schema | PASS | Candidate spec block (lines 128-139) places `GROUNDING` (the rationale/evidence for the direction) before `TYPE`/`COLOR`/`COMPOSITION`/`MOTION` (the answer fields); DESIGN.md template mirrors the same order (Grounding before Type/Color tokens/etc.). |
| oberskills:prompt | #7 Prefill / #6 reasoning-echo instructions | N/A | Not applicable — static reference doc, no assistant-turn prefill or instruction to echo internal reasoning. |

## Notes (non-blocking)
- `.code-foundations/plans/2026-07-01-fable5-refresh.md` was also modified in the working tree (7-line append recording Phase 2's completion, referencing commit `c72f27d`). This is plan-tracking bookkeeping for the *prior* phase (Phase 2, "De-prescriptify sweep"), not phase-4 content — it doesn't touch `design-dna.md`'s doctrine and predates this phase's scope. It appears to be an artifact of Phase 2's tracking entry not having been committed alongside `c72f27d`, picked up now as uncommitted state. Flagging per the dispatch prompt's instruction to note any file beyond `design-dna.md`, but it is not a phase-4 scope violation in substance.
- Minor style point (not a defect): the "safe option" phrase at line 117 (warning against a designated safe-option slot in Diverge) and the "honest default" phrase targeted for removal by DW-4.4 are conceptually adjacent but textually distinct — confirmed line 117's usage is a different, intentional warning (against a modal-pick slot), not a missed instance of the removed framing.

## Issues (if FAIL)
None.

**Verdict: PASS**
