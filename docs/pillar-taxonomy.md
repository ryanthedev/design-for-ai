# Pillar taxonomy — the 8 design-foundations skills

The map every later phase consumes: the 8 pillar skills, their single concern (SRP), their
disjoint trigger scopes, the "not for X (use Y)" disambiguation that prevents cannibalization,
and the cite-down dependency direction. Rules live in `foundations-standards.md`; this is the
*who-owns-what*. Scope boundaries may shift slightly as pillars are authored — re-confirmed at
Phase 6 integration (plan uncertainty note).

**Dual role (v3.1.0 workflow).** Each pillar plays two roles simultaneously and neither overrides
the other. (1) **Doctrine library** — the `research → plan → mock → build` workflow loads pillars
per-phase via `Skill(<name>)` inside the dispatched agents, so every workflow phase gets the
right domain checklist without the user having to invoke anything. (2) **Directly triggerable**
— all pillars remain `user-invocable: true`; a user can invoke any pillar standalone for a
narrow question ("is this chart lying?" → `data-viz`; "audit dark patterns" → `deceptive-patterns`)
without running the full workflow. The workflow loads pillars by name regardless of their trigger
status — triggering and workflow-loading are orthogonal.

The existing `skills/design-for-ai/` core is **not** a pillar — it keeps the visual/aesthetic
DNA, surface, and the index. The 7 core modes (design, surface, fonts, color, audit, enhance,
polish) are the disambiguation targets the pillars point *away from*.

---

## Table of Contents

1. [The 8 pillars at a glance](#1-the-8-pillars-at-a-glance)
2. [Disjoint trigger scopes (the anti-cannibalization contract)](#2-disjoint-trigger-scopes-the-anti-cannibalization-contract)
3. [Dependency direction (cite-down, never up)](#3-dependency-direction-cite-down-never-up)
4. [Build order](#4-build-order)

---

## 1. The 8 pillars at a glance

| # | Pillar (skill name) | Single concern (SRP) | Backing grug research | Phase |
|---|---------------------|----------------------|-----------------------|-------|
| 1 | `usability` | Can the user operate it — principles (Gestalt, UX laws, Nielsen 10, Norman, WCAG) that adjudicate UI patterns (nav/forms/search/data/feedback/action/disclosure/onboarding) + heuristic evaluation | `usability-foundations-research` | 2 (keystone) |
| 2 | `content-design` | The words ARE the interface — voice/tone as a language system, microcopy patterns (error/empty/button), content-first process | `design-pillar-landscape-research` | 3 |
| 3 | `data-viz` | Encoding data truthfully + efficiently — chart selection, data-ink/chartjunk, preattentive attributes, dashboards, chart accessibility (measurable right/wrong) | `design-pillar-landscape-research` | 3 |
| 4 | `deceptive-patterns` | Ethics of influence — the dark-pattern ban-list (urgency/scarcity manip, misdirection, friction asymmetry…); structural twin of the core `ai-tells` ban-list | `design-pillar-landscape-research` | 4 |
| 5 | `behavioral` | WHY users act/return/convert — persuasion triggers, bias mechanics, habit loop, choice architecture, Norman's emotional levels (visceral/behavioral/reflective). Same tools as deceptive-patterns, opposite intent | `design-pillar-landscape-research` | 4 |
| 6 | `journey` | How a user MOVES through time — JTBD job stories, journey maps, IA/sitemaps, user/task flows, page specs, the marketing persuasion spine; ships a JOURNEY.md companion to DESIGN.md | `journey-flow-ux-research` | 5 |
| 7 | `design-systems` | A look → a MACHINE that generates looks — semantic token tiers, atomic component composition, governance, design-to-code; extends (not replaces) DESIGN.md | `design-pillar-landscape-research` | 5 |
| 8 | `ai-native` | Agent/LLM-interface design — agent UX, generative UI, no-fixed-screen/no-stable-affordance interfaces. Explicitly **no settled canon**; principle-derived | `design-pillar-landscape-research` (AI-breaks-the-frameworks counter) | 6 |

## 2. Disjoint trigger scopes (the anti-cannibalization contract)

Each pillar's `description` carries its "Not for X (use Y)" clause verbatim from this table. No
trigger phrase below is claimed by two pillars — that disjointness IS the contract. "Use Y"
targets are sibling pillars or core modes (core modes in `code font`).

| Pillar | Fires on (its trigger keywords) | Not for X → use Y |
|--------|----------------------------------|-------------------|
| `usability` | "is it usable", "hard to use", heuristic evaluation, Nielsen heuristics, Fitts/Hick/Miller/Jakob laws, affordance, signifier, cognitive load, navigation/form/table/search/feedback patterns, WCAG/accessibility usability | the visual look → core `design`/`audit`; the words themselves → `content-design`; the route through time → `journey`; persuasion mechanics → `behavioral` |
| `content-design` | UX writing, microcopy, error/empty-state/button copy, voice & tone, content-first, label wording | visual typography/typeface → core `fonts`; IA structure & labels-as-architecture → `journey`; persuasion copy mechanics → `behavioral`; manipulative copy → `deceptive-patterns` |
| `data-viz` | chart selection, which chart, dashboard design, data-ink, chartjunk, preattentive attributes, small multiples, truthful encoding, chart/color accessibility for data | brand/UI color palette → core `color`; page composition/hierarchy → core `audit`; tables-as-a-UI-pattern → `usability` |
| `deceptive-patterns` | dark patterns, deceptive patterns, manipulative UX, urgency/scarcity manipulation, confirmshaming, friction asymmetry, hidden costs, ethics audit, humane design | AI-generated visual tells → core `audit` + `ai-tells`; legitimate persuasion → `behavioral`; accessibility exclusion → `usability` |
| `behavioral` | persuasion, conversion, habit loop, Cialdini, Fogg behavior model, Octalysis, emotional design, motivation, choice architecture, why users return | the manipulative/dark version → `deceptive-patterns`; the narrative sequence/flow → `journey`; visual mood/feel → core `design` |
| `journey` | user journey, journey map, user/task flow, information architecture, sitemap, JTBD/job story, conversion funnel, landing-page section order, JOURNEY.md, messy middle | the persuasion *mechanism* → `behavioral`; the visual DNA → core `design`; device-class layout → core `surface`; the operability of a single screen → `usability` |
| `design-systems` | design tokens, token tiers, component library, atomic design, design system governance, design-to-code, scaling a design | a single project's visual DNA / DESIGN.md → core `design`; raw palette hex generation → core `color` |
| `ai-native` | agent UX, AX, LLM interface design, chat/agentic UI, generative UI, designing for AI, no-fixed-screen UI | conventional screen-UI operability → `usability`; the visual look → core `design`; conversational *voice* surface device-class → core `surface` |

**Disjointness invariant:** read down the "Fires on" column — no keyword recurs across two rows.
Where two pillars are adjacent (behavioral vs deceptive-patterns share *tools*; behavioral vs
journey share *persuasion*; data-viz vs core-color share *color*), the split is by **intent or
concern**, stated in the "Not for" clause: behavioral = mechanism/honest, deceptive-patterns =
manipulation; behavioral = mechanism, journey = sequence; data-viz = encoding data, color = brand
palette.

## 3. Dependency direction (cite-down, never up)

Citation is one-way and acyclic (`foundations-standards.md` §5). `usability` is the sink — cited
by others, cites none upward.

```
journey ─────────┐
behavioral ──────┼──▶ usability   (Hick/Fitts/Miller, Nielsen, Norman)
deceptive-patterns┘        ▲
                           │ (no back-edges — usability cites no pillar)

deceptive-patterns ──▶ core ai-tells ban-list   (structural twin / cross-link)
design-systems     ──▶ core palette engine + DESIGN.md   (extends, not replaces)
ai-native          ──▶ usability (where conventional operability still applies)
```

- usability cites no pillar. The core skill depends on no pillar.
- No cycles. Phase 6 verifies the citation graph is a DAG with usability as the sink.
- DRY is per-pillar only: duplicate a usability law verbatim rather than couple two pillars.

## 4. Build order

Keystone first (everything cites it), then independents, then the paired and frontier pillars:

1. **Phase 2** — `usability` (keystone; built first because journey/behavioral/deceptive-patterns cite its laws).
2. **Phase 3** — `content-design` + `data-viz` (independent of each other; no upward cites).
3. **Phase 4** — `deceptive-patterns` + `behavioral` (paired: same tools, opposite intent; both cite usability).
4. **Phase 5** — `journey` + `design-systems` (journey cites usability; design-systems extends DESIGN.md).
5. **Phase 6** — `ai-native` (no canon, principle-derived) + whole-system integration + cannibalization sweep.
