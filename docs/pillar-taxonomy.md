# Pillar taxonomy — design doctrine and the 4 surviving skills

The map every later phase consumes: the 8 doctrine domains, their single concern (SRP), the
"not for X (use Y)" disambiguation that prevents cannibalization, and the cite-down dependency
direction. Six domains live as reference files in `references/`; two (`usability`, `data-viz`)
remain as de-triggered skills in `skills/`. Rules live in `foundations-standards.md`; this is the
*who-owns-what*.

**Doctrine model (v4.0.0).** The workflow loads all design knowledge **deterministically by
`Read()`** — never by `Skill()` auto-trigger. Plans and dispatch blocks carry semantic doctrine
names; the §5 resolver table maps each name to its on-disk path; agents `Read()` the file before
executing the phase. Six domains (`content-design`, `behavioral`, `journey`, `deceptive-patterns`,
`design-systems`, `ai-native`) live as plain reference files in `references/` — they are not
skills. Two (`usability`, `data-viz`) remain as skills in `skills/` with `user-invocable: false`
and `disable-model-invocation: true` — they do not auto-trigger but are fully `Read()`-able via
the resolver. The complete skills list is four: `clarify`, `prototype`, `usability`, `data-viz`.

The existing `skills/design-for-ai/` core is **not** a pillar — it keeps the visual/aesthetic
DNA, surface, and the index. The 7 core modes (design, surface, fonts, color, audit, enhance,
polish) are the disambiguation targets the pillars point *away from*.

---

## Table of Contents

1. [The 8 doctrine domains at a glance](#1-the-8-doctrine-domains-at-a-glance)
2. [Disjoint trigger scopes (the anti-cannibalization contract)](#2-disjoint-trigger-scopes-the-anti-cannibalization-contract)
3. [Dependency direction (cite-down, never up)](#3-dependency-direction-cite-down-never-up)
4. [Build order](#4-build-order)
5. [Doctrine resolver (name → path)](#5-doctrine-resolver-name--path--single-source-of-truth)

---

## 1. The 8 doctrine domains at a glance

| # | Domain (doctrine name) | Single concern (SRP) | Backing grug research | Phase |
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

## 5. Doctrine resolver (name → path) — single source of truth

The overhaul (v3.2 doctrine model) loads doctrine **deterministically by `Read()`**, not by
auto-trigger. Plans and dispatch blocks carry semantic **doctrine names**; this table is the ONE
place that maps each name to its on-disk file. Commands (Phase 3) and both agents (Phase 4) resolve
names here, then `Read()` the path. **The name set below is the canonical vocabulary** — Phases 3–5
must spell doctrine names exactly as the left column does.

**Path convention.** Paths are repo-root-relative (verifiable with `test -e` from the plugin root).
At runtime, consumers prefix them with `${CLAUDE_PLUGIN_ROOT}/` (e.g.
`${CLAUDE_PLUGIN_ROOT}/references/visual/design-dna.md`).

**Two-file rule.** Where a name historically spanned two files, the **primary** is the file the
deleted core mode read *first*; the **companion** is listed in Notes and may also be `Read()` when
the phase needs the full pair. This applies to `color` and `fonts`.

**Survivors note.** `usability` and `data-viz` carry `disable-model-invocation: true` +
`user-invocable: false` (they no longer auto-trigger or appear in the slash menu) — but their
`SKILL.md` files remain fully `Read()`-able, which is how this resolver loads them.

### Pillar doctrine (collapsed from skills → references)

| Doctrine name | Path | Notes |
|---------------|------|-------|
| `content-design` | `references/content-design/content-design.md` | UX writing / microcopy / voice & tone. Sub-refs in `references/content-design/references/`. |
| `behavioral` | `references/behavioral/behavioral.md` | Persuasion, Fogg model, habit loops, emotional design (honest mechanism). |
| `journey` | `references/journey/journey.md` | JTBD, journey maps, IA, flows, page specs; ships JOURNEY.md companion. |
| `deceptive-patterns` | `references/deceptive-patterns/deceptive-patterns.md` | Dark-pattern ban-list; structural twin of `ai-tells`. |
| `design-systems` | `references/design-systems/design-systems.md` | Token tiers, atomic components, governance; extends DESIGN.md. |
| `ai-native` | `references/ai-native/ai-native.md` | Agent / LLM-interface design; principle-derived, no settled canon. |

### Survivor skills (still skills, de-triggered)

| Doctrine name | Path | Notes |
|---------------|------|-------|
| `usability` | `skills/usability/SKILL.md` | Keystone; cited by other doctrine. `Read()`-able despite suppression flags. |
| `data-viz` | `skills/data-viz/SKILL.md` | Truthful data encoding / charts. `Read()`-able despite suppression flags. |

### Visual sub-topics (reconstitute the deleted core router's modes)

| Doctrine name | Path | Notes |
|---------------|------|-------|
| `design-dna` | `references/visual/design-dna.md` | The `design` mode's DNA-generation protocol + DESIGN.md template. |
| `color` | `references/visual/chapter-08-color-science.md` | **Primary.** Companion: `references/visual/chapter-09-color-theory.md` (color theory / schemes). Read both for a full color pass. |
| `fonts` | `references/visual/chapter-03-typography.md` | **Primary.** Companion: `references/visual/appendix-fonts-and-typography.md` (font selection/config). Read both for a full type pass. |
| `surface` | `references/visual/surfaces.md` | Device-class layout patterns + token deltas (phone, TV, watch, in-car, kiosk, voice, e-ink). |
| `motion` | `references/visual/motion.md` | Motion / animation principles. |
| `interaction` | `references/visual/interaction.md` | Interaction / state design. |
| `responsive` | `references/visual/responsive.md` | Width-scaling rules within the screen-web continuum. |
| `ai-tells` | `references/visual/ai-tells.md` | Generic / AI-generated-look ban-list; twin of `deceptive-patterns`. |
| `libraries` | `references/visual/libraries.md` | The `enhance` mode's animation/3D library decision guide. |
| `archetypes` | `references/visual/archetypes.md` | Brand archetype map for DNA generation. |
| `foundations` | `references/visual/foundations.md` | Register + foundations established before DNA. |
| `techniques` | `references/visual/techniques.md` | Applied visual techniques catalog. |
| `checklists` | `references/visual/checklists.md` | Decision trees + the visual audit checklist (`audit`/`polish`). |

> Additions are append-only — Phases 3/4 may surface a needed doctrine; add a row, never renumber or
> rename existing names (downstream prompts match on them).
