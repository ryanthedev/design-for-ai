# Discovery + Design: Phase 4 - Ethics + Behavioral skills

## Files Found

**Existing (inputs):**
- `skills/design-for-ai/references/ai-tells.md` — the twin ban-list; 292 lines, DETECTION CHECKLIST structure with 11 canonical sections; the aesthetic parallel.
- `skills/usability/references/usability-principles.md` — citeable anchors: #peak-end-rule, #zeigarnik-effect, #goal-gradient-effect, #aesthetic-usability-effect, #hicks-law, #millers-law-revised-to-cowan, Nielsen heuristics, Norman foundations.
- `docs/foundations-standards.md` — conventions: frontmatter shape, ≤1024 desc, cite-the-principle, cite-down, eval gate, canonical reference sections.
- `docs/skill-authoring-template.md` — checklist, skeleton, definition of done.
- `docs/pillar-taxonomy.md` — exact trigger scopes, "not for" clauses, dependency direction.

**Prior phase outputs (confirmed via find):**
- `skills/usability/SKILL.md` — 936-char description; stable anchor file named.
- `skills/content-design/SKILL.md` — 827-char description; exact frontmatter pattern confirmed.
- `skills/data-viz/SKILL.md` — 849-char description; confirmed pattern.

**To create:**
- `skills/deceptive-patterns/SKILL.md`
- `skills/deceptive-patterns/references/dark-patterns.md` (taxonomy + detection)
- `skills/deceptive-patterns/references/honest-alternatives.md` (the honest counterpart per category)
- `skills/behavioral/SKILL.md`
- `skills/behavioral/references/behavioral-principles.md` (Cialdini, Fogg, Eyal, Norman emotional)
- `skills/behavioral/references/ethical-application.md` (the ethical-vs-dark distinction + usability citations)

## Current State

- `skills/deceptive-patterns/` — does not exist (just created empty dir)
- `skills/behavioral/` — does not exist (just created empty dir)
- Phase 2 usability keystone shipped; stable anchors confirmed at heading level in usability-principles.md.
- Phase 3 content-design and data-viz shipped; their description format (827–849 chars) sets the calibration target.
- grug `design-pillar-landscape-research-md.md` contains: dark-pattern taxonomy (~18 types / 9 categories), full book list for both pillars, and the ETHICAL TENSION note (same tools, opposite intent).

## Gaps

None blocking. One design decision to resolve: reference file count.

The plan spec says each skill gets references. The dark-patterns pillar has two distinct knowledge layers:
1. The taxonomy (what each dark pattern IS, how to detect it) — `dark-patterns.md`
2. The honest alternative per category (what to do instead) — callable separately to keep the SKILL.md thin

The behavioral pillar similarly splits into:
1. The mechanism layer (Cialdini, Fogg, Eyal, Norman) — `behavioral-principles.md`
2. The ethical application layer (honest use, guardrail to deceptive-patterns, usability citations) — `ethical-application.md`

Two reference files per skill matches the Phase 2–3 pattern (usability: 2, content-design: 2, data-viz: 2).

## Code Standards

From `docs/foundations-standards.md` — all apply:
- Frontmatter: `name` == directory name; `description` ≤ 1024 chars, third person, no XML tags; `user-invocable: true`; `argument-hint`.
- Canonical reference sections drawn from the 11 allowed types; ToC required if >100 lines.
- Banned: RATIONALIZATION COUNTERS, DECISION GATE, PROBLEM->FIT TABLE, TRIGGERS, PRODUCES, NEXT CAPABILITY NEEDED, CSO KEYWORDS.
- Cite-the-principle: every recommendation names its source; no unsourced opinion.
- Cite-down only: deceptive-patterns cites usability (down) and cross-links ai-tells (peer, structurally); behavioral cites usability (down). Neither cites journey, content-design, or data-viz.
- SKILL.md body < 500 lines; ~200 lines always-relevant core; depth in references.
- Stay generative — not a compliance checklist.

## Test Infrastructure

`skill-eval` MCP server (`mcp__plugin_oberskills_skill-eval__validate_skill`, `mcp__plugin_oberskills_skill-eval__test_triggers`). Phase gate = 0 errors / 0 warnings on validate + both directions on test_triggers. Workspace convention: `skills/<name>-workspace/`. Plan note: if test_triggers is too costly, static disjointness check + PARTIAL marking is acceptable.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|----------------|--------|------------|
| DW-4.1 | `skills/deceptive-patterns/` authored; detection list cross-links ai-tells (twin structure) | COVERED | `validate_skill` on `skills/deceptive-patterns`; `test_triggers` positive (dark patterns, deceptive UX, urgency manipulation, confirmshaming, friction asymmetry, ethics audit); cross-link to ai-tells verified by file path resolution |
| DW-4.2 | `skills/behavioral/` authored; cites usability principles from Phase 2 (real anchors) | COVERED | `validate_skill` on `skills/behavioral`; `test_triggers` positive (persuasion, conversion, habit loop, Cialdini, Fogg, emotional design); usability anchors (#peak-end-rule, #zeigarnik-effect, #goal-gradient-effect, #hicks-law) named in references |
| DW-4.3 | `validate_skill` = 0/0 on BOTH | COVERED | `mcp__plugin_oberskills_skill-eval__validate_skill` called on both skill dirs; zero errors / zero warnings required |
| DW-4.4 | `test_triggers` passes; neither cannibalizes design/enhance/audit/journey (if too costly → validate clean + documented static disjointness check, PARTIAL) | COVERED | `mcp__plugin_oberskills_skill-eval__test_triggers` on both; near-miss queries include: "make my site look better" (→ design), "add an animation" (→ enhance/polish), "audit my UI" (→ audit), "map the user journey" (→ journey), "write my microcopy" (→ content-design); if tool cost prohibitive → static disjointness table in discovery doc |

**All items COVERED:** YES

## Design Decisions

### Paired framing architecture

The central design challenge: behavioral describes the same psychological mechanisms that deceptive-patterns weaponizes. The framing must prevent behavioral from reading as a dark-pattern manual while making deceptive-patterns constructive (not just a ban-list).

**Decision:** Each skill explicitly names the other in its body:
- `behavioral` body: "the same mechanisms are the source material for `deceptive-patterns` — load it as the ethical guardrail when the ask involves persuasion under time pressure, dark defaults, or conversion optimization."
- `deceptive-patterns` body: "behavioral is the honest counterpart — every dark pattern has a mechanism described there; understanding the mechanism is how you replace the manipulation with something that achieves the same goal without exploitation."

This is the same-tools-opposite-intent framing the plan requires. It is NOT a cross-pillar citation dependency (behavioral does not *depend on* deceptive-patterns' content to function); it is a navigation pointer.

### ai-tells cross-link shape

`ai-tells.md` is at `skills/design-for-ai/references/ai-tells.md`. The cross-link in `deceptive-patterns` is a prose reference (path + description of what it covers), not a structural dependency. The twin relationship is documented in the `dark-patterns.md` reference file's KEY DEFINITIONS section, explaining: ai-tells = aesthetic tells (cyan-on-dark, glassmorphism), deceptive-patterns = ethical manipulation tells (urgency, friction asymmetry). Same ban-list structure; different domain.

### Reference file count and naming

Two files per skill (matching Phase 2–3 pattern):
- `deceptive-patterns`: `dark-patterns.md` (taxonomy + detection) + `honest-alternatives.md` (per-category honest counterpart + regulatory context)
- `behavioral`: `behavioral-principles.md` (mechanisms: Cialdini, Fogg, Eyal, Norman emotional) + `ethical-application.md` (honest use, habit loop design, choice architecture, usability citations)

### Description length target

Content-design landed at 827 chars, data-viz at 849. Both pillars here have substantial "Not for" clauses (behavioral and deceptive-patterns share keywords on persuasion, urgency, ethics). Target 850–950 chars each, well under 1024.

### Usability anchor citations in behavioral

The plan requires real anchors from Phase 2. Citations in `behavioral/references/ethical-application.md`:
- `#peak-end-rule` — emotional peak and end investment; maps to habit loop's reward phase
- `#zeigarnik-effect` — incomplete tasks stay in mind; maps to progress indicators and triggers
- `#goal-gradient-effect` — motivation increases approaching a goal; maps to onboarding progress + streaks
- `#hicks-law` — choice reduction for time-critical decisions; maps to choice architecture
- `#aesthetic-usability-effect` — pretty design masks real defects; cited as the risk when behavioral polish replaces usability substance

## Prerequisites

- [x] `skills/usability/references/usability-principles.md` exists with stable anchors
- [x] `skills/design-for-ai/references/ai-tells.md` exists (twin ban-list)
- [x] `docs/foundations-standards.md` and template exist
- [x] grug research for both pillars available (design-pillar-landscape-research-md.md)
- [x] Empty skill directories created

## Recommendation

BUILD — all prerequisites met, design decisions resolved, no blocking gaps.
