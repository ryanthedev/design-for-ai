# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Repository Purpose

A **design-foundations system**: a Claude Code plugin (v4.0.0) with a four-stage design workflow (`research → plan → mock → build`). Design doctrine is loaded deterministically by `Read()` — six doctrine domains live in `references/`, two de-triggered skills (`usability`, `data-viz`) plus two workflow skills (`clarify`, `prototype`) complete the plugin. The workflow takes any design idea from a vague brief to a viewable, gated artifact.

## The Workflow (primary front door)

The four commands form a `research → plan → mock → build` spine:

| Command | What it does |
|---------|-------------|
| `/design-for-ai:research` | Facilitate the design brief — extract purpose, audience, brand feel, JTBD, device constraints, mood references. Writes a research doc to `.design-foundations/research/`. Chains to `plan`. |
| `/design-for-ai:plan` | Turn the research doc into a phased design plan: clarify gaps, classify complexity, decompose into Discover/Design lifecycle stages, assign pillar skills per phase, set design done-when items (contrast/token/artifact/heuristic). Chains to `mock`. |
| `/design-for-ai:mock` | Cheap checkpoint before the full build. Dispatches `design-build-agent` (renders a prototype via the `prototype` skill) and `design-review-agent` (cross-pillar pixel critique). Gates on user sign-off — approve to proceed to `build`, or loop back to `plan`. |
| `/design-for-ai:build` | Full gated execution. Worktree isolation, per-phase `BUILD → REVIEW → commit` dispatching both agents, gate resolution (Full/Standard/Minimal), execution log, final trust report. Produces JOURNEY.md + DESIGN.md + tokens + final mocks. |

Doctrine is loaded deterministically: each `build` phase's dispatched agents resolve doctrine names via the §5 resolver in `docs/pillar-taxonomy.md`, then `Read()` each file before executing the phase — "make it look good" becomes the review-agent reading every applicable doctrine file over the rendered mock, a workflow stage, not a trigger.

### Dispatched agents

| Agent | Role |
|-------|------|
| `agents/design-build-agent.md` | Produces one phase's design artifact (DESIGN.md tokens, JOURNEY.md spec, mock) honoring the DESIGN.md/JOURNEY.md gates; validates with design execution evidence (contrast via `palette.mjs`, mock renders via `prototype`, tokens applied) |
| `agents/design-review-agent.md` | Independent, zero-intent-framing cross-pillar critique on the rendered pixels — triage → dispatch applicable pillars → synthesize ONE severity-ranked report |

## Doctrine domains + skills (direct access)

Design knowledge lives in two places: six doctrine reference files (loaded by `Read()`) and four skills (auto-discovered from `skills/`).

### Doctrine reference files (`references/`)

Loaded by commands and agents via the §5 resolver in `docs/pillar-taxonomy.md`. Not directly invocable — the workflow loads them per-phase.

| Doctrine name | Concern |
|--------------|---------|
| `content-design` | The *words* as interface — UX writing, microcopy (error/empty/button/label), voice & tone, content-first |
| `behavioral` | *Why* users act/return/convert — persuasion, the Fogg model, habit loops, Norman's emotional levels (honest mechanism) |
| `journey` | How a user *moves through time* — JTBD, journey maps, IA/sitemaps, user/task flows, page specs, the persuasion spine; ships a JOURNEY.md companion |
| `deceptive-patterns` | *Ethics of influence* — the dark-pattern ban-list; structural twin of `ai-tells` |
| `design-systems` | A look → a *machine* that makes looks — semantic token tiers, atomic components, governance; extends DESIGN.md |
| `ai-native` | Agent / LLM-interface design — agent UX, generative & non-deterministic UI, no-fixed-screen interfaces. Principle-derived — **no settled canon** |
| `usability` *(de-triggered)* | Whether users can *operate* it — Nielsen 10, UX laws (Fitts/Hick/Miller…), affordances, cognitive load, UI patterns. The keystone other doctrine cites. Lives in `skills/usability/` (`user-invocable: false`) |
| `data-viz` *(de-triggered)* | Encoding *data* truthfully — chart selection, data-ink/chartjunk, preattentive attributes, dashboards, chart accessibility. Lives in `skills/data-viz/` (`user-invocable: false`) |

Visual doctrine (design DNA, surface, fonts, color, motion, interaction, responsive, audit, enhance, polish) lives in `references/visual/` and is resolved via the same §5 table.

### Skills (`skills/`)

| Skill | Invocable | Concern |
|-------|-----------|---------|
| `prototype` | `user-invocable: true` | Generates self-contained HTML/CSS mocks from design tokens and page specs — outputs a viewable `.html` file |
| `clarify` | `user-invocable: false` | Internal workflow clarification — decomposes underspecified design requests before work begins |
| `usability` | `user-invocable: false` | Keystone doctrine — de-triggered; loaded via `Read()` |
| `data-viz` | `user-invocable: false` | Data viz doctrine — de-triggered; loaded via `Read()` |

### Conventions

All doctrine files and skills obey the shared conventions in `docs/`:

| Doc | Holds |
|-----|-------|
| `docs/foundations-standards.md` | Frontmatter shape (4 surviving skills), the ≤1024-char description rule, canonical reference-file shape, cite-the-principle, cite-down/acyclic dependency direction, the per-skill eval gate |
| `docs/workflow-conventions.md` | The research→plan→mock→build lifecycle, DESIGN.md/JOURNEY.md artifact gates, design done-when vocabulary (contrast/token/heuristic), doctrine Read() dispatch conventions |
| `docs/pillar-taxonomy.md` | The 8 doctrine domains, their single concern (SRP), "Not for X (use Y)" disambiguation, the cite-down dependency graph, and the §5 name→path resolver |

The skill-authoring how-to (`references/skill-authoring-template.md`) is an authoring procedure, not a runtime-cited convention.

## Structure

```
design-for-ai/
├── .claude-plugin/
│   └── plugin.json               # version 4.0.0 — doctrine-read workflow; skills auto-discovered (no `skills` array)
├── commands/                     # the four workflow front doors (slash-invoked)
│   ├── research.md               # extract the design brief
│   ├── plan.md                   # decompose into phased design plan with doctrine assignments
│   ├── mock.md                   # cheap prototype + cross-pillar validation + sign-off gate
│   └── build.md                  # full gated execution: BUILD → REVIEW → commit per phase
├── agents/                       # dispatched by mock and build
│   ├── design-build-agent.md     # produces one phase's design artifact; loads doctrine via Read()
│   └── design-review-agent.md    # independent cross-pillar critique on the rendered pixels
├── docs/                         # shared conventions (runtime-cited by commands and agents)
│   ├── foundations-standards.md  # skill authoring rules for the 4 surviving skills
│   ├── workflow-conventions.md   # lifecycle, artifact gates, done-when vocab, doctrine dispatch
│   └── pillar-taxonomy.md        # 8 doctrine domains + §5 name→path resolver (single source of truth)
├── references/                   # doctrine files + authoring template
│   ├── visual/                   # visual doctrine (design DNA, surface, fonts, color, etc.)
│   │   ├── design-dna.md         # DNA-generation protocol + DESIGN.md template
│   │   ├── chapter-01 through 09, appendix-fonts-and-typography.md
│   │   ├── archetypes.md, foundations.md, checklists.md, techniques.md
│   │   ├── libraries.md          # enhance-mode animation/3D library guide
│   │   ├── surfaces.md           # device-class layout patterns + token deltas
│   │   └── motion.md, interaction.md, responsive.md, ai-tells.md
│   ├── ai-native/                # agent/LLM-interface doctrine
│   ├── behavioral/               # persuasion + habit loop doctrine
│   ├── content-design/           # UX writing + microcopy doctrine
│   ├── deceptive-patterns/       # dark-pattern ban-list doctrine
│   ├── design-systems/           # token tiers + component governance doctrine
│   ├── journey/                  # JTBD + IA + flows + page specs doctrine
│   └── skill-authoring-template.md  # authoring how-to for the 4 surviving skills
├── scripts/
│   └── palette.mjs               # OKLCH token generator — WCAG contrast by construction
└── skills/                       # 4 auto-discovered skills
    ├── prototype/                # produces self-contained HTML/CSS mocks (user-invocable: true)
    ├── clarify/                  # design-scoped clarification — internal workflow (user-invocable: false)
    ├── usability/                # keystone doctrine — de-triggered (user-invocable: false)
    └── data-viz/                 # data viz doctrine — de-triggered (user-invocable: false)
```

## Installation

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```

Version 4.0.0 converts design knowledge to a deterministic doctrine-read model — six doctrine reference files + two de-triggered skills replace the v3.1.0 eight auto-triggering pillar skills. The install path is unchanged — workflow commands and agents are auto-discovered alongside the 4 surviving skills.
