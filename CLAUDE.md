# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Purpose

A **design-foundations system**: a multi-skill Claude Code plugin where each design pillar is its own skill. The `design-for-ai` core teaches the visual/aesthetic + surface layer from *Design for Hackers* (typography, color, composition, proportions, visual hierarchy, device-class surfaces, motion, interaction, responsive). Eight sibling pillar skills cover the rest of the design landscape. Skills are auto-discovered from the `skills/` directory — there is no central router; each skill triggers on its own description.

## Usage

The core entry point is `/design-for-ai`, which routes among the core's visual/surface modes:

| Core mode | What it does |
|------|-------------|
| design | Establish foundations, then generate a unique design DNA — archetype → family remix → contrast-checked tokens → DESIGN.md gate |
| surface | Pick layout patterns and style tokens for a target device class (phone, TV, watch, in-car, kiosk, voice, e-ink) — constraints → patterns → token deltas. Distinct surface *kinds*, where responsive handles width *degree* |
| fonts | Select, pair, and configure typography |
| color | Build a color system from color science up |
| audit | Find what's wrong and explain WHY — dispatches the `usability` skill for operability/heuristic findings |
| enhance | Decide what to reach for to uplift a site — lowest stack layer / library for a wanted effect, gated on register and cost. Library-agnostic, principles-first |
| polish | Motion, interaction, responsive, identity — final pass |

### Pillar skills

Each pillar is its own skill that triggers on its own description (no central router). Citation points **down** to `usability` (the keystone); the graph is acyclic.

| Pillar skill | Concern |
|--------------|---------|
| `usability` | Whether users can *operate* it — heuristic evaluation (Nielsen 10 + severity), UX laws (Fitts/Hick/Miller/Cowan/Jakob…), affordances, cognitive load, UI pattern selection, usability-side accessibility. The keystone other pillars cite |
| `content-design` | The *words* as interface — UX writing, microcopy (error/empty/button/label), voice & tone, content-first |
| `data-viz` | Encoding *data* truthfully — chart selection, data-ink/chartjunk, preattentive attributes, dashboards, chart accessibility |
| `deceptive-patterns` | *Ethics of influence* — the dark-pattern ban-list; the structural twin of the core's `ai-tells` |
| `behavioral` | *Why* users act/return/convert — persuasion, the Fogg model, habit loops, Norman's emotional levels (the honest mechanism; its dark version is `deceptive-patterns`) |
| `journey` | How a user *moves through time* — JTBD, journey maps, IA/sitemaps, user/task flows, page specs, the persuasion spine; ships a JOURNEY.md companion |
| `design-systems` | A look → a *machine* that makes looks — semantic token tiers, atomic components, governance; extends DESIGN.md (does not replace it) |
| `ai-native` | Agent / LLM-interface design — agent UX, generative & non-deterministic UI, no-fixed-screen interfaces. Principle-derived — **no settled canon** |

### Conventions

All pillar skills obey the shared conventions in `docs/`:

| Doc | Holds |
|-----|-------|
| `docs/foundations-standards.md` | Frontmatter shape, the ≤1024-char description rule, canonical reference-file shape, cite-the-principle, cite-down/acyclic dependency direction, the per-skill eval gate |
| `docs/skill-authoring-template.md` | The reusable procedure to author a pillar skill (baseline-first, measure don't guess) |
| `docs/pillar-taxonomy.md` | The 8 pillars, their single concern (SRP), disjoint trigger scopes, the "Not for X (use Y)" disambiguation, and the cite-down dependency graph |

## Structure

```
design-for-ai/
├── .claude-plugin/
│   └── plugin.json               # version 3.0.0 — multi-skill system; skills auto-discovered (no `skills` array)
├── docs/                         # shared conventions every pillar obeys
│   ├── foundations-standards.md
│   ├── skill-authoring-template.md
│   └── pillar-taxonomy.md
└── skills/                       # each subdir is an independently-discovered skill
    ├── design-for-ai/            # CORE — visual/aesthetic + surface + index
    │   ├── SKILL.md              # routes the core modes; lists the sibling pillars
    │   ├── scripts/
    │   │   └── palette.mjs       # OKLCH token generator — WCAG contrast by construction
    │   └── references/           # loaded progressively per mode
    │       ├── chapter-01 through 09, appendix-fonts-and-typography.md
    │       ├── archetypes.md, design-dna.md, foundations.md, checklists.md, techniques.md
    │       ├── libraries.md      # enhance mode
    │       ├── surfaces.md       # surface mode
    │       └── motion.md, interaction.md, responsive.md, ai-tells.md
    ├── usability/                # keystone pillar (cited by the others)
    ├── content-design/
    ├── data-viz/
    ├── deceptive-patterns/       # twin of the core's ai-tells.md
    ├── behavioral/
    ├── journey/                  # ships a JOURNEY.md companion to DESIGN.md
    ├── design-systems/           # extends DESIGN.md + palette.mjs
    └── ai-native/                # principle-derived; no settled canon

# each pillar skill = SKILL.md + references/ (2 reference files), per docs/skill-authoring-template.md
```

## Installation

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```

Version 3.0.0 reshaped the single-skill plugin into the multi-skill design-foundations system. The install command and marketplace coordinates are unchanged — pillar skills are auto-discovered, so no install-path change is needed.
