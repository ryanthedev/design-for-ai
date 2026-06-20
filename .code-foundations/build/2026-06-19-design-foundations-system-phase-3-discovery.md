# Discovery + Design: Phase 3 — Content-design + Data-viz skills

## Files Found

- `/Users/r/repos/design-for-ai/docs/foundations-standards.md` — conventions contract (frontmatter, ≤1024 desc, canonical ref shape, cite-the-principle, eval gate)
- `/Users/r/repos/design-for-ai/docs/skill-authoring-template.md` — authoring checklist + SKILL.md skeleton
- `/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md` — disjoint trigger scopes, "Not for" clauses, dependency direction
- `/Users/r/repos/design-for-ai/skills/usability/SKILL.md` — shape exemplar (936-char desc, 2 references)
- `/Users/r/repos/design-for-ai/skills/usability/references/usability-principles.md` — deep reference file exemplar (12.6 KB, ToC-first, 11 canonical sections)
- `/Users/r/repos/design-for-ai/skills/usability/references/ui-patterns.md` — second reference exemplar (6.9 KB)
- `/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md` — core skill with pillar-aware index (updated Phase 1)
- grug `self/design-for-ai/design-pillar-landscape-research-md.md` — anchor books, ratings, dimension each adds, gaps

**Skills/content-design/ and skills/data-viz/:** do NOT exist yet — both must be created from scratch.

## Current State

Two Phase 3 skill directories are absent. The scaffolding (standards, template, taxonomy, usability exemplar) is all in place and validated. The core skill's pillar index already references `content-design` and `data-viz` with their correct scope summaries — the implementation must match those descriptions.

## Gaps

None. All prerequisites are present:
- Conventions doc, template, and taxonomy exist (Phase 1 ✅).
- Usability exemplar exists to pattern-match against (Phase 2 ✅).
- Research material is in grug with anchor books, pillar assessments, and the "AI-breaks-frameworks" counter.
- The taxonomy rows for `content-design` and `data-viz` provide exact trigger keywords and "Not for" exclusions.

## Code Standards

From `foundations-standards.md` — key conventions for this phase:

| Rule | What it means for Phase 3 |
|------|--------------------------|
| Frontmatter: `name` == dir name | `content-design` and `data-viz` exactly |
| `description` ≤ 1024 chars, third person, no XML | Measured to char; "Not for:" clause required |
| Reference files: ToC first if >100 lines | Both pillar refs will exceed 100 lines |
| 11 canonical sections; banned constructs never added | No RATIONALIZATION COUNTERS, DECISION GATE, TRIGGERS, etc. |
| cite-the-principle on every claim | Every recommendation names originator/book/year |
| cite-down only | Neither pillar cites up to journey/behavioral/deceptive-patterns |
| SKILL.md body < 500 lines (hard); ~200 lines core | Depth goes in references |

## Test Infrastructure

The project's test suite is the skill-craft harness:
- `validate_skill` (MCP tool `mcp__plugin_oberskills_skill-eval__validate_skill`) — spec lint, 0 errors / 0 warnings required
- `test_triggers` (MCP tool `mcp__plugin_oberskills_skill-eval__test_triggers`) — positive queries fire; near-miss queries stay quiet

Per plan, Phase 3 gates on `validate_skill` 0/0 and `test_triggers` (or a documented static trigger-disjointness check if test_triggers proves too costly). Per-skill `run_eval` is reserved for the keystone `usability` at Phase 6.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-3.1 | `skills/content-design/` authored (SKILL.md ≤1024 desc + references) per template + conventions | COVERED | `validate_skill` on `skills/content-design` = 0 errors / 0 warnings; description char-count ≤ 1024; "Not for:" clause present; cite-the-principle on every claim; references follow canonical shape with ToC |
| DW-3.2 | `skills/data-viz/` authored (SKILL.md ≤1024 desc + references) per template + conventions | COVERED | `validate_skill` on `skills/data-viz` = 0 errors / 0 warnings; description char-count ≤ 1024; "Not for:" clause present; cite-the-principle on every claim; references follow canonical shape with ToC |
| DW-3.3 | `validate_skill` = 0 errors / 0 warnings on BOTH skills | COVERED | Run `validate_skill` on each skill dir; tool output is the verdict (never hand-filled) |
| DW-3.4 | `test_triggers` passes on both; no cannibalization with each other or existing modes | COVERED | Run `test_triggers` on each skill; if tool is too costly, static disjointness check vs. taxonomy "Not for" clauses and mark PARTIAL with reason |

**All items COVERED:** YES

## Design Decisions

### content-design
**Scope (from taxonomy):** The words ARE the interface — voice/tone as a language system, microcopy patterns (error, empty-state, button/CTA, labels), content-first process, plain language & scannability, information mapping.

**Anchor books (grug research):**
- Podmajersky *Strategic Writing for UX* (GR 4.23) — voice/tone systems, content strategy for UI
- Yifrah *Microcopy* (GR 4.40, highest rated) — the microcopy patterns canonical reference
- Richards *Content Design* (GR 4.32) — content-first process, UK GDS origin
- Redish *Letting Go of the Words* (GR 4.08) — plain language, scannability, web writing
- Metts & Welfle *Writing Is Designing* (GR 4.29) — words and design process unified

**Two reference files:**
1. `references/content-principles.md` — voice & tone systems, plain language, scannability, content-first process, content strategy (the *why* layer)
2. `references/microcopy-patterns.md` — the pattern catalog: error messages, empty states, button/CTA copy, labels, onboarding copy, in-product messaging (the *what* layer)

This mirrors the usability two-layer structure (principles → patterns).

**Key boundary decisions:**
- visual typography / typeface selection → core `fonts` (content-design does NOT own visual type)
- IA structure & labels-as-architecture → `journey` (content-design owns the words, journey owns the structure)
- persuasion copy mechanics (FOMO, urgency) → `behavioral`
- manipulative copy → `deceptive-patterns`

**Description approach:** Verb-first + capability nouns + "Not for" near-miss list. The near-misses are keywords shared with fonts (typography), journey (IA), and behavioral (persuasion copy).

### data-viz
**Scope (from taxonomy):** Encoding data truthfully and efficiently — chart type selection (measurable right/wrong), data-ink ratio and chartjunk, preattentive attributes, small multiples, dashboard layout, chart accessibility and colorblind safety.

**Anchor books (grug research):**
- Tufte *The Visual Display of Quantitative Information* (29k citations) + *Envisioning Information* — data-ink ratio, chartjunk, small multiples (the canonical source)
- Few *Information Dashboard Design* + *Show Me the Numbers* — dashboard layout, chart selection applied
- Knaflic *Storytelling with Data* (GR most accessible, 8.4k ratings) — preattentive attributes, decluttering workflow
- Cairo *The Functional Art* + *How Charts Lie* — ethical/statistical honesty in charts
- Munzner *Visualization Analysis & Design* — marks & channels (most rigorous theoretical framework)

**Two reference files:**
1. `references/viz-principles.md` — truthful encoding, data-ink, chartjunk, preattentive attributes, chart accessibility/colorblind safety, Munzner marks & channels (the *why* layer)
2. `references/chart-selection.md` — chart type decision table, dashboard layout rules, common mistakes, the "lies" taxonomy (Cairo) (the *what* layer)

**Key boundary decisions:**
- brand/UI color palette → core `color` (data-viz does NOT own palette generation — it owns colorblind-safe palette *selection for charts*, a distinct concern)
- page composition and visual hierarchy → core `audit`
- tables as a UI pattern → `usability` (data-viz owns truthful chart encoding; usability owns the data-display table pattern)

**Description approach:** Same formula. Near-misses are core `color` (brand palette) and core `audit` (page composition), with explicit redirect to `usability` for data tables.

## Prerequisites

- [x] Phase 1 docs exist (foundations-standards.md, skill-authoring-template.md, pillar-taxonomy.md)
- [x] Phase 2 usability exemplar exists (SKILL.md + 2 references) as shape template
- [x] grug research available (`design-pillar-landscape-research-md.md`)
- [x] skills/content-design/ and skills/data-viz/ directories to be created (in scope)
- [x] MCP skill-eval tools available (validate_skill, test_triggers)

## Recommendation

BUILD — all prerequisites met, design decisions clear, source material in hand.

**What to build:**
1. `skills/content-design/SKILL.md` (frontmatter + body following usability shape)
2. `skills/content-design/references/content-principles.md` (voice/tone/plain-language/content-first)
3. `skills/content-design/references/microcopy-patterns.md` (error/empty/button/label pattern catalog)
4. `skills/data-viz/SKILL.md` (frontmatter + body)
5. `skills/data-viz/references/viz-principles.md` (data-ink/chartjunk/preattentive/accessibility)
6. `skills/data-viz/references/chart-selection.md` (chart type selection + dashboard + lies taxonomy)
7. Run `validate_skill` on both — fix until 0/0
8. Run `test_triggers` on both — verify or document static check
