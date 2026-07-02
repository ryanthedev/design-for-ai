# Discovery + Design: Phase 3 - Tells catalog refresh — copy tells, checkable signatures, decay dates

## Files Found
- `references/visual/ai-tells.md` (292 lines) — the target file. Post-overhaul (v4.0.0) location; confirmed via `find` (not `skills/design-for-ai/references/ai-tells.md`, which is stale pre-overhaul CLAUDE.md text no longer on disk).
- `docs/foundations-standards.md` (139 lines) — the conventions doc; §6 is the last existing numbered section (per-skill eval gate).

## Current State
`ai-tells.md` has 11 top-level sections (matches `foundations-standards.md` §3's canonical 11-section list exactly: KEY DEFINITIONS, DETECTION CHECKLIST, DESIGN REVIEW CRITERIA, RED FLAGS, IMPLEMENTATION CHECKLIST, DESIGN TRANSFORMATION PATTERNS, CORE PRINCIPLES, THIS VS THAT, DESIGN DECISION TABLE, TECHNIQUE REFERENCE, COMMON MISTAKES). It is visual/layout-only: Typography/Color/Layout/Detail/Motion Tells checklists, a RED FLAGS table, a Severity Classification table (under CORE PRINCIPLES > CHECKER Mode), THIS VS THAT, DESIGN DECISION TABLE, TECHNIQUE REFERENCE, and COMMON MISTAKES tables — 6 markdown tables total, none dated. Zero copy/content tells anywhere. No checkable signatures (hexes, opacity thresholds, binary framework-default checks) — only pattern descriptions ("purple-to-blue gradients"). No decay/re-audit language, no over-correction guard.

`docs/foundations-standards.md` §3 (Canonical reference-file shape) lists the 11 sanctioned top-level content-section types and explicitly bans several headers (`## RATIONALIZATION COUNTERS`, `## DECISION GATE`, etc.) — "Routing lives in the SKILL.md, not in the reference files." §6 (eval gate) is the last section; no re-audit convention exists yet.

## Gaps
1. No copy/content tells section (plan goal a) — confirmed by research: Impeccable's 44-rule catalog is ~1/5 copy tells (`em-dash-overuse`, `marketing-buzzword`, `numbered-section-markers`, `aphoristic-cadence`, `theater-slop-phrase`), zero of which exist locally.
2. No checkable signatures (plan goal b) — hex triplet, shadow-opacity threshold, Tailwind/shadcn binary check, two escape-hatch clusters, Space Grotesk — all absent; existing color/typography tells are pattern-level only ("purple-to-blue gradients," not `#6366F1`).
3. No decay doctrine — no `Last reviewed:` dates anywhere; no statement that escape-hatches decay into tells (Space Grotesk case) or that lists need re-audit.
4. No over-correction guard — nothing states that uniform "anti-slop edginess" is itself a failure mode.
5. `docs/foundations-standards.md` has no re-audit convention section.

## Code Standards
No `docs/code-standards.md` exists in this repo (it is a markdown-doctrine plugin, not a codebase with a language-level standards file). The applicable conventions are `docs/foundations-standards.md` (frontmatter/description/reference-shape/citation/dependency-direction/eval-gate rules) and the plan's own constraints: (a) each tell states its check as *observable evidence* (hex to grep, opacity threshold, font-name match, DOM/CSS pattern), not "feels AI"; (b) de-prescription bias — signatures are dated examples of a principle, not a new frozen ban-list; (c) preserve the existing severity model's register carve-out (glassmorphism-in-luxury-register stays legal); (d) extend the existing structure, do not rewrite.

Design decision: rather than adding 3 new top-level ToC sections (Copy Tells, Checkable Signatures, Decay Doctrine), I fold all new content into the **existing 11 canonical sections** to stay compliant with `foundations-standards.md` §3's implied constraint that only those 11 section types are sanctioned for reference files, and to satisfy the plan's "extend, don't rewrite" instruction literally:
- Copy/Content Tells → new `### Copy/Content Tells` subsection inside `DETECTION CHECKLIST`, sibling to the existing Typography/Color/Layout/Detail/Motion Tells subsections (identical bullet-checklist format).
- Checkable Signatures → new `### Checkable Signatures (2026)` subsection inside `RED FLAGS`, as a second table alongside the existing Flag/Severity/Fix table.
- Decay Doctrine (incl. over-correction guard) → new `### Decay Doctrine` subsection inside `CORE PRINCIPLES`, placed before the existing CHECKER/APPLIER Mode subsections since it frames how the rest of the file's tables should be read.

This keeps the ToC entry count and section list unchanged (no `#12`/`#13`/`#14` added) — only subsections are new.

## Test Infrastructure
This is a markdown-plugin repo — "tests" are `grep`/inspection checks executed and their output captured, per the dispatch prompt. No test runner, no `validate_skill` gate applies to `references/` files (that gate is skill-scoped, per `foundations-standards.md` §6, and `ai-tells.md` is a reference file, not a skill).

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-3.1 | `ai-tells.md` has a copy/content tells section with ≥5 named tells, each with an observable check. | COVERED | `grep -n "Copy/Content Tells" references/visual/ai-tells.md`; manual count of bullet items (target: 6 — em-dash overuse, marketing buzzword stacking, aphoristic cadence, theater-slop phrasing, numbered-section markers, generic microcopy template) each with an inline observable threshold/pattern. |
| DW-3.2 | checkable signatures present (hex triplet, shadow opacity, Tailwind/shadcn default check, both escape-hatch clusters, Space Grotesk) with source + date. | COVERED | `grep -n "6366F1\|8B5CF6\|A855F7"`, `grep -n "0.08–0.12\|0.1-opacity"`, `grep -in "shadcn"`, `grep -in "terracotta"`, `grep -in "acid-green"`, `grep -in "Space Grotesk"` — each must return a hit inside the new Checkable Signatures table row, and each row's Source column must carry a dated citation. |
| DW-3.3 | every tells table carries `Last reviewed: 2026-07`; `foundations-standards.md` documents the re-audit convention (review-by dates, stale-list failure mode). | COVERED | `grep -c "Last reviewed: 2026-07" references/visual/ai-tells.md` (target: 7, one per markdown table: RED FLAGS, Checkable Signatures, Severity Classification, THIS VS THAT, DESIGN DECISION TABLE, TECHNIQUE REFERENCE, COMMON MISTAKES); `grep -n "re-audit\|Last reviewed" docs/foundations-standards.md` for the new §7. |
| DW-3.4 | the over-correction guard is stated in the tells doctrine (variance across outputs, not uniform edginess). | COVERED | `grep -n "variance\|over-correction" references/visual/ai-tells.md` inside the new Decay Doctrine subsection. |

**All items COVERED:** YES

## Design Decisions

**Placement (extend, don't add ToC entries).** Decided above — fold into existing DETECTION CHECKLIST / RED FLAGS / CORE PRINCIPLES rather than 3 new top-level sections. Alternative considered: add `## COPY TELLS`, `## CHECKABLE SIGNATURES`, `## DECAY DOCTRINE` as new top-level ToC sections 12–14. Rejected because `foundations-standards.md` §3 enumerates exactly 11 sanctioned content-section types for reference files and explicitly frames unlisted headers as things "deliberately stripped" in the 2026-06-12 refresh — adding new top-level types here would contradict the very re-audit-convention doctrine this phase is establishing (don't introduce a fresh inconsistency while writing the rule against inconsistency).

**Copy tells: cite Impeccable rule IDs for grounding, port no code.** Each copy-tell bullet cites the Impeccable rule id it corresponds to (`em-dash-overuse`, `marketing-buzzword`, `numbered-section-markers`, `aphoristic-cadence`, `theater-slop-phrase`) as a citation only — the observable-check phrasing is written fresh in-doctrine (matching this file's checklist voice), not copied verbatim from Impeccable's source. The "generic microcopy template" tell has no single Impeccable rule id (it's a synthesis of the two June 2026 web sources' hero+CTA+testimonial framing plus Impeccable's layout-tell doctrine); cited to superdesign.dev / dev.to instead. Code porting with full Apache-2.0 attribution is explicitly Phase 6's job (plan constraint) — this phase only cites rule names as evidence, never copies regex/logic.

**Checkable Signatures as a second RED FLAGS table, not a rewrite of the first.** The existing RED FLAGS table stays untouched (only gains a `Last reviewed:` line) — new signatures land in a sibling `### Checkable Signatures (2026)` table with its own Severity + Source columns, so the original pattern-level flags and the new binary/hex-level checks stay separable (a future re-audit can date-check the two independently).

**Decay Doctrine subsection ordering.** Placed as the first subsection under `## CORE PRINCIPLES`, before `### CHECKER Mode` / `### APPLIER Mode`, because it frames why every table below it (and the Severity Classification table inside CHECKER Mode) carries a date — reading order matters for a doctrine file that will be `Read()` top-to-bottom by an agent.

**`docs/foundations-standards.md` new §7.** Appended after existing §6 (last section), with a ToC entry added. Content ties explicitly to Phase 2's already-planned DW-2.2 vocabulary ("undated list is a finding") so the convention is stated once and reused, not redefined per-phase.

**Register carve-out preserved.** No changes to the existing "glassmorphism-in-luxury-register is legal, context decides" framing (THIS VS THAT / RED FLAGS severity table already carries this nuance for dark mode and decorative effects) — new signatures are added with a Severity column, not as absolute bans, matching the plan's edge-case constraint.

## Prerequisites
- [x] Required files exist (`references/visual/ai-tells.md`, `docs/foundations-standards.md`)
- [x] Dependencies available (Phase 1 complete — model ladder/gate vocabulary not directly load-bearing for this content phase, but confirms the tree is post-overhaul and stable)
- [x] Reference material available (`~/.local/state/web-research/2026-07-01-design-refresh-REPORT.md` Theme 2/5/7/8, `-ai-tells.md` dimension file, `-skills-landscape.md` for the two escape-hatch clusters, `-crosspollination.md` for the Space Grotesk resolution) — no missing prerequisites.

## Recommendation
BUILD. Content is fully sourced from verified 2026-07-01 research (no new research needed); the only design decision is placement, resolved above in favor of extending existing sections over adding new top-level ones.
