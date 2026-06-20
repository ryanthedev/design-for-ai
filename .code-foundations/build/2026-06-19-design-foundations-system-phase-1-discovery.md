# Discovery + Design: Phase 1 - Foundation scaffolding

## Files Found

- `skills/design-for-ai/SKILL.md` — the existing single-skill router (306 lines, description 1023/1024 chars). 7 modes: design, surface, fonts, color, audit, enhance, polish.
- `skills/design-for-ai/references/` — 21 reference files, all conforming to the canonical shape (11 sections + `## Table of Contents` for files >100 lines).
- `.claude-plugin/plugin.json` — manifest at v2.2.0, no `skills` array (Claude Code auto-discovers from `skills/`).
- `CLAUDE.md` — repo conventions + mode table.
- `docs/` — did NOT exist; created in this phase. No `docs/code-standards.md` present.
- grug-brain (category `design-for-ai`, brain `self`) — 8 memories. The four load-bearing ones read:
  - `reference-files-canonical-shape-md.md` — the canonical 11-section reference shape + ToC house rule + the banned-construct list (RATIONALIZATION COUNTERS, DECISION GATE, etc.).
  - `design-pillar-landscape-research-md.md` — the 8 pillars, altitudes, tiering, AND the two counters (framework-thinking = compliance theater; AI breaks the frameworks).
  - `usability-foundations-research-md.md` — Layer A principles (Gestalt, UX laws, Nielsen 10, Norman, WCAG) × Layer B pattern families; the bridge (principles select patterns).
  - `journey-flow-ux-research-md.md` — journey stack, JOURNEY.md companion, persuasion spine, the linear-funnel counter.

## Current State

`design-for-ai` is a working, committed single-skill plugin (v2.2.0, baseline commit da229b3). Its description sits at the 1024-char ceiling (1023 used) — confirmed the structural constraint this system dissolves. `validate_skill` is clean (0 errors / 0 warnings; 2 non-gating `info` notes for Claude-Code-only frontmatter keys). The plugin currently holds exactly one skill; `code-foundations` (19 skills, same author) is the multi-skill precedent.

## Gaps

| # | Gap | Resolution in this phase |
|---|-----|--------------------------|
| 1 | No `docs/` directory | Created. |
| 2 | No conventions doc binding the future pillar skills | Write `docs/foundations-standards.md` (DW-1.1). |
| 3 | No reusable authoring template for Phases 2–6 | Write `docs/skill-authoring-template.md` (DW-1.2). |
| 4 | The 8 pillar names exist only as a list in the plan; no disjoint trigger-scope contract | Write `docs/pillar-taxonomy.md` with a per-pillar scope + "not for X (use Y)" table (DW-1.3). |
| 5 | Core `SKILL.md` knows nothing of sibling pillars | Add a pillar-aware index section referencing the 8 siblings, without regressing existing-mode triggering or breaching the 1024-char description (DW-1.4, DW-1.5). |

## Code Standards

No `docs/code-standards.md` found. This is a markdown-skill plugin (no compiled code); the governing conventions are instead the skill-craft house rules and the repo's canonical reference-file shape — both captured in the new `docs/foundations-standards.md` this phase produces.

## Test Infrastructure

For a markdown skill plugin, the skill-craft harness IS the test suite (per plan Test Coverage). The gating checks for this phase:

- `validate_skill` (deterministic lint) — used as the DW-1.5 gate and as the artifact-existence/shape check.
- Structural assertions on the three doc artifacts (required sections present, 8 pillars covered, char-budget rule stated).
- Disjointness check on the taxonomy (no two pillar scopes claim the same trigger; each carries a "not for X (use Y)" clause).
- `test_triggers` (regression that existing modes still fire) is reserved for Phase 6's comprehensive sweep per the plan; this phase's index change is validated by `validate_skill` staying 0/0 and the description staying ≤1024 chars (the edge-case guard). A lightweight reasoning-level regression check on the 7 mode keywords is included.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-1.1 | `docs/foundations-standards.md` specifies frontmatter shape, ≤1024 description rule, reference shape, cite-the-principle, and the eval gate | COVERED | `check_standards_sections` — assert the file exists and contains all 5 required sections (frontmatter shape / description budget / canonical reference shape / cite-the-principle house rule / per-skill eval gate). |
| DW-1.2 | A reusable skill-authoring template/checklist exists for Phases 2–6 | COVERED | `check_template_exists` — assert `docs/skill-authoring-template.md` exists and contains a step-ordered checklist (baseline → design → author → validate → trigger-test) plus a copy-paste frontmatter block and a per-pillar reference-shape stub. |
| DW-1.3 | Taxonomy documents all 8 pillar skills with disjoint trigger scopes (no overlap flagged) | COVERED | `check_taxonomy_8_disjoint` — assert all 8 pillar names present, each with a scope + an explicit "not for X (use Y)" clause; assert no trigger phrase is claimed by two pillars (disjointness). |
| DW-1.4 | Core `SKILL.md` updated to a pillar-aware index referencing sibling skills | COVERED | `check_index_section` — assert the core SKILL.md gained a `## Pillar skills` index section naming all 8 siblings with one-line "use it when" routing. |
| DW-1.5 | `validate_skill` on `design-for-ai` still 0/0 after index changes | COVERED | `validate_skill` returns 0 errors / 0 warnings AND description_chars ≤ 1024 after the index edit (edge-case guard: existing 7-mode triggering preserved — index added to the body, not the description). |

**DW-ID count: 5 in prompt, 5 in table — match.**
**All items COVERED:** YES

## Design Decisions

### Assumption verification (plan-required)
**"Multiple skills in one plugin trigger independently without a central router" — VERIFIED (HIGH holds).** Evidence: `code-foundations` (same author, `/Users/r/repos/code-foundations`) ships 19 skills, each in its own `skills/<name>/` directory; its `plugin.json` has NO `skills` array — Claude Code auto-discovers skills from the `skills/` directory and triggers each on its own `description`. No central dispatch is required. Therefore the core SKILL.md index is an *ergonomic* cross-reference (helps the user/agent navigate), not a *functional* router the pillars depend on. Not returning UPDATE_PLAN.

### Boundaries (ca-architecture-boundaries — SYSTEM scope)
- **SRP-by-pillar (actor = the design concern that requests change).** Each pillar owns exactly one concern, so a change to one pillar's canon never forces an edit to another:
  - usability = can they operate it (principles × patterns × heuristic eval)
  - content-design = the words ARE the interface (voice/tone, microcopy)
  - data-viz = encoding data truthfully + efficiently (measurable right/wrong)
  - deceptive-patterns = ethics of influence (dark-pattern ban-list; twin of ai-tells)
  - behavioral = WHY users act/return/convert (persuasion mechanics — same tools, opposite intent from deceptive-patterns)
  - journey = how a user MOVES through time (job→journey→IA→flows→page specs)
  - design-systems = a look → a MACHINE that generates looks (token tiers, components, governance)
  - ai-native = agent/LLM-interface design (no settled canon)
  - core `design-for-ai` = visual/aesthetic DNA + surface + the index (NOT decomposed)
- **Dependency direction — inward, one-way, acyclic.** usability is the innermost design-layer entity (its laws are cited by others); it cites nothing upward. journey/behavioral/deceptive-patterns cite usability laws; usability never cites them. design-systems references the existing palette engine + DESIGN.md (infrastructure the core owns) but the core does not depend on design-systems. This makes the citation graph a DAG with usability as a sink — the standards doc encodes this as the explicit "cite-down, never up" rule and Phase 6 verifies no cycles. (DRY across pillars is deliberately NOT enforced — duplicating a usability law verbatim in journey is safer than coupling the two; cross-pillar coupling is the failure mode the system exists to avoid.)

### Disjoint trigger scopes (the DW-1.3 contract — drafted here, finalized per-pillar in their phases)
Each pillar's description carries a "not for X (use Y)" clause so no two cannibalize. Draft scope table (subject to re-confirmation at Phase 6 integration, per plan uncertainty note):

| Pillar | Fires on | Not for (use Y) |
|--------|----------|-----------------|
| usability | "is it usable", heuristic eval, Nielsen, Fitts/Hick/Miller, nav/form/table patterns, affordance, cognitive load | visual aesthetics (core `design`); the words (content-design); the route through time (journey) |
| content-design | UX writing, microcopy, error/empty/button text, voice & tone, content-first | visual type/fonts (core `fonts`); IA labels-as-structure (journey); persuasion mechanics (behavioral) |
| data-viz | chart selection, dashboard, truthful encoding, data-ink, chartjunk, preattentive, chart a11y | brand color palette (core `color`); page composition (core `audit`); tables-as-UI-pattern (usability) |
| deceptive-patterns | dark patterns, manipulative UX, urgency/scarcity manipulation, friction asymmetry, ethics audit | AI-generated tells (core `audit`/ai-tells); legit persuasion (behavioral); accessibility exclusion (usability) |
| behavioral | persuasion, conversion, habit loop, Cialdini/Fogg/Norman emotional, motivation, choice architecture | the dark-pattern version (deceptive-patterns); the narrative sequence (journey); visual mood (core `design`) |
| journey | user journey, flows, IA, sitemap, JTBD, funnel, landing-page persuasion spine, JOURNEY.md | the persuasion mechanism (behavioral); the visual DNA (core `design`); device-class layout (core `surface`) |
| design-systems | design tokens, component library, atomic design, token tiers, governance, design-to-code | a single project's visual DNA / DESIGN.md (core `design`); raw palette hexes (core `color`) |
| ai-native | agent UX, LLM interface, chat/agentic UI, no-fixed-screen, generative UI | conventional screen UI usability (usability); the visual look (core `design`) |

### Documentation-artifact design (this phase's deliverables)
Three docs under `docs/`, deliberately split by actor (each changes for a different reason):
1. `docs/foundations-standards.md` — the *rules* (frontmatter, description budget, reference shape, cite-the-principle, eval gate, dependency direction). Changes when conventions change.
2. `docs/skill-authoring-template.md` — the *procedure + copy-paste scaffolding* Phases 2–6 follow. Changes when the workflow changes.
3. `docs/pillar-taxonomy.md` — the *map* (8 pillars, scopes, disjointness, cross-ref direction). Changes as pillar boundaries firm up.
Splitting them (vs one mega-doc) is the SRP call: a future tweak to the eval gate shouldn't churn the taxonomy. The standards doc is the canonical entry; the other two reference it.

### Core SKILL.md index — minimal-footprint design
The index is added to the SKILL.md **body** (a new `## Pillar skills` section), NOT to the `description` frontmatter — the description is at 1023/1024 and has no room, and per the verified assumption the pillars trigger on their own descriptions regardless. This keeps DW-1.5 satisfiable by construction: the description is untouched, so existing 7-mode triggering cannot regress and the char budget cannot be breached. The index section lists each sibling with a one-line "reach for it when…" so a user already inside the core skill can hand off.

### Stay-generative posture (baked into the standards, per the research counter)
The standards doc encodes "cite the principle, never unsourced opinion" AND its guardrail: principles are cited to *ground* a recommendation, not as a compliance checklist the framework-as-deliverable counter warns against. Each pillar stays generative (selects/recommends), never a box-ticking audit. This is lifted verbatim from the `design-pillar-landscape-research` COUNTER finding.

## Prerequisites

- [x] Phase 0 complete (surface baseline committed, da229b3)
- [x] Required grug research readable (4 key files read)
- [x] Existing structure observed (SKILL.md + 21 references + plugin.json)
- [x] `validate_skill` baseline captured (0/0, desc 1023)
- [x] Multi-skill-triggering assumption verified against code-foundations
- [x] On feature branch `feature/design-foundations-system`

## Recommendation

**BUILD.** All 5 DW items are COVERED and verifiable. No CANNOT_MEET items; the plan assumption holds. Build the three docs, then add the body-only index section to the core SKILL.md, then re-run `validate_skill` to confirm 0/0 and description ≤1024.
