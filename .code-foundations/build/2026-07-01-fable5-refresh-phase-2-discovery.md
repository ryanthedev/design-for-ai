# Discovery + Design: Phase 2 - De-prescriptify sweep

## Files Found

In-scope inventory (`references/**` minus `ai-tells.md`/`design-dna.md`, plus `skills/*/SKILL.md` bodies):

- `references/ai-native/` (3 files), `references/behavioral/` (3), `references/content-design/` (3),
  `references/deceptive-patterns/` (3), `references/design-systems/` (3), `references/journey/` (3)
  — the 6 pillar doctrine dirs.
- `references/visual/` minus `ai-tells.md`/`design-dna.md`: `foundations.md`, `checklists.md`,
  `techniques.md`, `archetypes.md`, `libraries.md`, `surfaces.md`, `interaction.md`, `motion.md`,
  `responsive.md`, `chapter-01..09-*.md`, `appendix-fonts-and-typography.md` (17 files).
- `references/skill-authoring-template.md`.
- `skills/{clarify,data-viz,prototype,usability}/SKILL.md` (4 files, bodies only — their
  `references/*.md` subfiles are NOT in this phase's file scope).

Total: ~4800 lines across 27 files read in full.

## Current State

The doctrine tree is post-v4.0.0 "doctrine overhaul" and already largely Fable-5-clean: the 6
pillar dirs (`behavioral`, `content-design`, `deceptive-patterns`, `design-systems`, `journey`,
`ai-native`) and the 4 SKILL.md bodies are dense, well-cited (principle + author + year), use
sentence-case section headers, and contain no imperative-cap headers. `deceptive-patterns` is a
deliberate ethics ban-list (9 categories, Detection Checklist, Severity, Regulatory Exposure) —
correctly untouched per the phase's edge-case instruction.

`references/visual/` is a different story. It carries **13 files** (`chapter-01` through
`chapter-09`, `appendix-fonts-and-typography.md`, `interaction.md`, `motion.md`, `responsive.md`)
that all instantiate the same "11 canonical sections" template documented in
`references/skill-authoring-template.md` (§4): KEY DEFINITIONS · DETECTION CHECKLIST · DESIGN
REVIEW CRITERIA · RED FLAGS · IMPLEMENTATION CHECKLIST · DESIGN TRANSFORMATION PATTERNS · CORE
PRINCIPLES (with nested CHECKER/APPLIER Mode checklists) · THIS VS THAT · DESIGN DECISION TABLE ·
TECHNIQUE REFERENCE · COMMON MISTAKES. Per file this produces **up to 8 separate
enumerated/checklist mechanisms** (Detection Checklist's 3 tick-box lists, Must/Should/Nice-to-Have
tri-tier criteria, a Red Flags table, a 4-phase Implementation Checklist, a CHECKER-mode checklist,
a Severity Classification table, an APPLIER-mode checklist, and a Common Mistakes table) — heavy
duplication of `checklists.md`, which already aggregates the *same* red flags and mistakes into one
"Master Table" per category. This is the textbook over-prescription target: exhaustive tick-box
audits repeated 13 times, undated, with no principle-vs-ban-list compression.

Two literal DW-2.1 violations exist: none in headings across `references/` and `skills/` themselves
— confirmed by `grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY|NEVER)' references/ skills/`, which returns
exactly one hit: `skills/data-viz/references/viz-principles.md:294:## CRITICAL CAVEATS`. That file's
directory (`skills/data-viz/references/`) sits outside this phase's stated file scope
(`skills/*/SKILL.md` bodies only) — but the DW-2.1 check text is written to scan all of `skills/`
recursively, not just `SKILL.md`. I'm treating the DW-2.1 grep as the literal, binding contract
(per Baseline Discipline) and fixing that one heading (de-cap only, one line) even though its file
sits just outside the prose file-scope description — the fix is a single heading edit, squarely in
the spirit of the phase's goal, and leaving it would fail a DW item the dispatch prompt itself wrote
as scanning that path. This is called out explicitly, not silently absorbed.

No ban-list in scope carries a `Last reviewed:` date (the only dated tables in the repo are in
`references/visual/ai-tells.md`, which is explicitly out of scope for this phase per Phase 3).

## Code Standards

No `docs/code-standards.md` exists in this repo (it's a doctrine/markdown plugin, not an
application codebase). The applicable standards are `docs/foundations-standards.md` (skill/
reference-file shape, cite-the-principle, cite-down) and `references/skill-authoring-template.md`
(the canonical reference-file section shape) — both consulted and respected: this phase trims
*within* the canonical section shape, it does not remove or rename the sections wholesale.

## Test Infrastructure

This is a markdown-doctrine repo — "tests" are grep/inspection checks executed and captured, per
the dispatch prompt. No unit-test framework applies. `mcp__plugin_oberskills_skill-eval__validate_skill`
exists for the 4 SKILL.md skills but is out of scope for a doctrine-content-only phase (no
frontmatter or trigger changes are being made).

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-2.1 | `grep -rnE '^#+ *(STOP\|CRITICAL\|MANDATORY\|NEVER)' references/ skills/` returns nothing. | COVERED | Fix the one hit (`skills/data-viz/references/viz-principles.md:294`), re-run the exact grep, capture empty output. |
| DW-2.2 | Every ban-list-style enumeration remaining in `references/` or `skills/` carries a `Last reviewed:` date; enumerate each list found with its date line. | COVERED | Add `Last reviewed: 2026-07` to: `references/visual/checklists.md` (Red Flags Master Table, Common Mistakes Master Table), each of the 13 `references/visual/{chapter-01..09,appendix-fonts-and-typography,interaction,motion,responsive}.md` files' RED FLAGS + COMMON MISTAKES tables, `references/visual/surfaces.md` (Red flags — surface mismatches), `references/deceptive-patterns/references/dark-patterns.md` (the 9-category ban-list + detection checklist). Full enumeration with dates captured in Implementation output below. |
| DW-2.3 | Spot-review (3 files) confirms principles/citations/examples survived the trim. | COVERED | After trim, quote a surviving principle + citation + worked example from 3 representative files: `references/visual/chapter-01-why-design-matters.md` (DESIGN TRANSFORMATION PATTERNS kept verbatim), `references/behavioral/references/behavioral-principles.md` (untouched — Cialdini/Fogg/Eyal/Norman citations), `references/visual/checklists.md` (Master tables kept, dated). |

**All items COVERED:** YES

## Design Decisions

**Trim pattern for the 13 chapter-style files** (chapter-01..09, appendix-fonts-and-typography,
interaction, motion, responsive) — applied uniformly so the canonical-shape convention in
`skill-authoring-template.md` stays intact, only the *density* inside each section drops:

- **DETECTION CHECKLIST** (Visual Symptoms / CSS-HTML Patterns / Developer Statements tick-box
  lists): collapse to a short prose paragraph naming the applicability principle + 1-2 illustrative
  quotes, not all 5-6 tick boxes per subsection.
- **DESIGN REVIEW CRITERIA** (Must Pass / Should Pass / Nice to Have): keep only the Must-Pass tier
  (2-3 items, principle + citation), drop Should-Pass/Nice-to-Have (they duplicate
  `checklists.md`'s master tri-tier table), point to `checklists.md` for the full tri-tier list.
- **RED FLAGS table**: keep 3-4 highest-severity, most chapter-specific rows (not all 6), add
  `**Last reviewed: 2026-07**`, point to `checklists.md` §2 for the complete list.
- **IMPLEMENTATION CHECKLIST** (Before/During/After tick-box steps): collapse to a short process
  paragraph, point to `checklists.md` §5 Implementation Quick-Start for the full step list.
- **CORE PRINCIPLES → CHECKER Mode / APPLIER Mode** nested checklists: remove — they restate
  DESIGN REVIEW CRITERIA and IMPLEMENTATION CHECKLIST almost verbatim (the exact
  "over-elaborated instruction block" pattern named in the phase goal). Keep the CORE PRINCIPLES
  prose paragraph itself and its Severity Classification table, trimmed to 2-3 rows.
- **COMMON MISTAKES table**: keep 4-5 representative rows, add `Last reviewed: 2026-07`, point to
  `checklists.md` §4 for the complete list.
- **KEEP UNCHANGED** (this is where "de-content" would happen and must not): KEY DEFINITIONS
  (verbatim book quotes), DESIGN TRANSFORMATION PATTERNS (before/after worked examples — exactly
  the "worked examples STAY" constraint), THIS VS THAT, DESIGN DECISION TABLE, TECHNIQUE REFERENCE.

**`checklists.md`** stays structurally whole — it is now the canonical detail the 13 trimmed files
point to — but gains `Last reviewed: 2026-07` on its Red Flags Master Table and Common Mistakes
Master Table so it isn't itself an undated frozen list.

**`deceptive-patterns/references/dark-patterns.md`**: per the phase's edge-case instruction, this
ethics ban-list is NOT trimmed or softened — the 9 categories, sub-types, and severity stay intact.
It still needs a `Last reviewed: 2026-07` date line under DW-2.2 (a ban-list dated is not a ban-list
softened) since it literally self-labels as "The ban-list" and cites regulation with "expected"
dates that can go stale.

**Execution mechanics**: given ~3,600 lines across the 13 near-identical chapter files, I will do
`chapter-01-why-design-matters.md` myself directly (reference implementation, verified by hand),
then dispatch parallel `general-purpose` subagents to apply the identical, fully-specified
transform to the remaining 12 files (in batches), each returning before/after line counts and
confirming citations/quotes were preserved verbatim. I will re-read and spot-check the diffs before
counting the phase done.

## Prerequisites

- [x] Required files exist.
- [x] Dependencies available (no external tools needed — pure markdown edits).
- [x] Phase 3 (`ai-tells.md`) already committed and explicitly untouched here.
- [x] `docs/foundations-standards.md` §7 (re-audit / Last-reviewed convention) already lands from
      Phase 3 — this phase reuses that convention rather than inventing a new one.

## Recommendation

BUILD. No CANNOT_MEET items. Proceed to implementation: fix the one DW-2.1 heading, apply the trim
pattern across the 13 chapter-style files + `checklists.md` + `surfaces.md` + `dark-patterns.md`
(dates only for the latter two), then re-run and capture the DW-2.1/DW-2.2/DW-2.3 checks.

## Review Fix

Independent review (`2026-07-01-fable5-refresh-phase-2-review.md`) FAILed DW-2.2 on four
ban-list-style enumerations that sit outside this phase's declared prose file-scope
(`skills/*/SKILL.md` bodies) but squarely inside the DW-2.2 wording ("every ban-list-style
enumeration remaining in `references/` or `skills/`") — treated as the binding contract, same as
the DW-2.1 grep precedent for `viz-principles.md` in the original build.

**Four date lines added** (heading unchanged, ban-list content unchanged, one `**Last reviewed:
2026-07**` line inserted directly under each heading):

| File | Heading | Line added |
|------|---------|-----------|
| `skills/clarify/references/adaptive-questioning.md` | `## Anti-Patterns` (was line 56) | `**Last reviewed: 2026-07**` at new line 58 |
| `skills/prototype/references/mock-recipe.md` | `## COMMON MISTAKES` (was line 265) | `**Last reviewed: 2026-07**` at new line 267 |
| `skills/data-viz/references/chart-selection.md` | `## COMMON MISTAKES` (was line 175) | `**Last reviewed: 2026-07**` at new line 177 |
| `skills/usability/references/ui-patterns.md` | `## Common mistakes` (was line 69) | `**Last reviewed: 2026-07**` at new line 71 |

`git diff --stat` on the four files: `4 files changed, 8 insertions(+)` — 2 lines each (date line +
blank line), zero deletions, ban-list rows/content untouched.

**Re-run: DW-2.1** — `grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY|NEVER)' references/ skills/` → exit
code 1, zero matches. Unaffected by this fix (dates-only change to unrelated headings). Still PASS.

**Re-run: DW-2.2** — reviewer's discovery grep
`grep -rniE '^#+.*(red flag|common mistake|anti.?pattern)' references/ skills/` → 41 hits across 32
files. Cross-checked every hit's file for a `Last reviewed:` line:

```
=== references/ai-native/references/ai-native-caveats.md ===
20:**Last reviewed: 2026-07.** Reframe when you catch yourself (or the user) doing any of these:
83:**Last reviewed: 2026-07**
=== references/ai-native/references/ai-native-principles.md ===
122:**Last reviewed: 2026-07**
=== references/content-design/references/content-principles.md ===
186:**Last reviewed: 2026-07**
=== references/content-design/references/microcopy-patterns.md ===
279:**Last reviewed: 2026-07**
=== references/deceptive-patterns/references/dark-patterns.md ===
39:**Last reviewed: 2026-07.** This is an ethics ban-list, not an aesthetic one — the 9 categories
352:**Last reviewed: 2026-07**
=== references/design-systems/references/design-systems-foundations.md ===
329:**Last reviewed: 2026-07**
=== references/design-systems/references/design-systems-governance.md ===
251:**Last reviewed: 2026-07**
=== references/visual/ai-tells.md ===
125:**Last reviewed: 2026-07**
139:**Last reviewed: 2026-07**
257:- **Every table in this file carries `Last reviewed: 2026-07`.** Treat any undated tells or red-flag
279:**Last reviewed: 2026-07**
304:**Last reviewed: 2026-07**
319:**Last reviewed: 2026-07**
335:**Last reviewed: 2026-07**
350:**Last reviewed: 2026-07**
=== references/visual/appendix-fonts-and-typography.md ===
89:**Last reviewed: 2026-07**
252:**Last reviewed: 2026-07**
=== references/visual/chapter-01-why-design-matters.md ===
65:**Last reviewed: 2026-07**
189:**Last reviewed: 2026-07**
=== references/visual/chapter-02-purpose-of-design.md ===
70:**Last reviewed: 2026-07**
199:**Last reviewed: 2026-07**
=== references/visual/chapter-03-typography.md ===
94:**Last reviewed: 2026-07**
243:**Last reviewed: 2026-07**
=== references/visual/chapter-04-technology-and-culture.md ===
75:**Last reviewed: 2026-07**
234:**Last reviewed: 2026-07**
=== references/visual/chapter-05-proportions.md ===
67:**Last reviewed: 2026-07**
200:**Last reviewed: 2026-07**
=== references/visual/chapter-06-composition.md ===
80:**Last reviewed: 2026-07**
234:**Last reviewed: 2026-07**
=== references/visual/chapter-07-visual-hierarchy.md ===
73:**Last reviewed: 2026-07**
226:**Last reviewed: 2026-07**
=== references/visual/chapter-08-color-science.md ===
77:**Last reviewed: 2026-07**
233:**Last reviewed: 2026-07**
=== references/visual/chapter-09-color-theory.md ===
93:**Last reviewed: 2026-07**
250:**Last reviewed: 2026-07**
=== references/visual/checklists.md ===
19:**Last reviewed: 2026-07.** Screenshot-grounded review of the rendered mock takes priority over
166:**Last reviewed: 2026-07**
476:**Last reviewed: 2026-07**
=== references/visual/interaction.md ===
84:**Last reviewed: 2026-07**
230:**Last reviewed: 2026-07**
=== references/visual/motion.md ===
81:**Last reviewed: 2026-07**
226:**Last reviewed: 2026-07**
=== references/visual/responsive.md ===
93:**Last reviewed: 2026-07**
239:**Last reviewed: 2026-07**
=== references/visual/surfaces.md ===
158:**Last reviewed: 2026-07**
=== skills/clarify/SKILL.md ===
177:**Last reviewed: 2026-07**
=== skills/clarify/references/adaptive-questioning.md ===
58:**Last reviewed: 2026-07**
=== skills/data-viz/references/chart-selection.md ===
177:**Last reviewed: 2026-07**
=== skills/prototype/references/mock-recipe.md ===
267:**Last reviewed: 2026-07**
=== skills/usability/references/ui-patterns.md ===
71:**Last reviewed: 2026-07**
```

Zero undated ban-lists remain across all 32 files carrying a red-flag/common-mistake/anti-pattern
heading. DW-2.2: **PASS**.

**Re-run: DW-2.3** — unaffected. The fix only inserted date lines directly under headings; no
ban-list row, principle, citation, or worked example was touched in any file (confirmed by
`git diff --stat`: insertions only, zero deletions across the four files). DW-2.3: **PASS**
(unchanged from original build).

**Note on `ai-native-caveats.md` and `dark-patterns.md` format variant:** these two files place the
`Last reviewed:` date inline as the first sentence of the heading's lead paragraph
(`**Last reviewed: 2026-07.** Reframe when...`) rather than on its own line. Both formats satisfy
DW-2.2's literal wording ("carries a `Last reviewed:` date") and both were already present before
this fix — left as-is as an existing, out-of-scope stylistic variant, not a new deviation introduced
by this fix.
