# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Repository Purpose

A **design-foundations system**: a multi-skill Claude Code plugin (v3.1.0) with a four-stage design workflow (`research → plan → mock → build`) and nine auto-triggering pillar skills. The workflow takes any design idea from a vague brief to a viewable, gated artifact. The nine pillar skills cover the full design landscape and are loaded per-phase by the workflow — they also remain directly invocable for standalone questions.

## The Workflow (primary front door)

The four commands form a `research → plan → mock → build` spine that mirrors code-foundations:

| Command | What it does |
|---------|-------------|
| `/design-for-ai:research` | Facilitate the design brief — extract purpose, audience, brand feel, JTBD, device constraints, mood references. Writes a research doc to `.code-foundations/research/`. Chains to `plan`. |
| `/design-for-ai:plan` | Turn the research doc into a phased design plan: clarify gaps, classify complexity, decompose into Discover/Design lifecycle stages, assign pillar skills per phase, set design done-when items (contrast/token/artifact/heuristic). Chains to `mock`. |
| `/design-for-ai:mock` | Cheap checkpoint before the full build. Dispatches `design-build-agent` (renders a prototype via the `prototype` skill) and `design-review-agent` (cross-pillar pixel critique). Gates on user sign-off — approve to proceed to `build`, or loop back to `plan`. |
| `/design-for-ai:build` | Full gated execution. Worktree isolation, per-phase `BUILD → REVIEW → commit` dispatching both agents, gate resolution (Full/Standard/Minimal), execution log, final trust report. Produces JOURNEY.md + DESIGN.md + tokens + final mocks. |

The pillars are the workflow's doctrine library: each `build` phase's dispatched `design-build-agent` and `design-review-agent` load the phase's matched pillar skills via `## Additional Skills`, so "make it look good" becomes the review-agent running every applicable pillar over the rendered mock — a workflow stage, not a trigger.

### Dispatched agents

| Agent | Role |
|-------|------|
| `agents/design-build-agent.md` | Produces one phase's design artifact (DESIGN.md tokens, JOURNEY.md spec, mock) honoring the DESIGN.md/JOURNEY.md gates; validates with design execution evidence (contrast via `palette.mjs`, mock renders via `prototype`, tokens applied) |
| `agents/design-review-agent.md` | Independent, zero-intent-framing cross-pillar critique on the rendered pixels — triage → dispatch applicable pillars → synthesize ONE severity-ranked report |

## The Core + Pillar Skills (direct invocation)

The core and pillar skills remain directly invocable alongside the workflow — ask about their concern and the right skill answers. No `/`-prefix needed for pillars; Claude routes by what you say.

### Core modes (`/design-for-ai`)

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

Each pillar is its own skill that triggers on its own description (no central router). Citation points **down** to `usability` (the keystone); the graph is acyclic. All pillars are also loaded per-phase by the workflow's dispatched agents — the two roles are orthogonal.

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
| `docs/workflow-conventions.md` | The research→plan→mock→build lifecycle, DESIGN.md/JOURNEY.md artifact gates, design done-when vocabulary (contrast/token/heuristic) |
| `docs/skill-authoring-template.md` | The reusable procedure to author a pillar skill (baseline-first, measure don't guess) |
| `docs/pillar-taxonomy.md` | The 8 pillars, their single concern (SRP), disjoint trigger scopes, the "Not for X (use Y)" disambiguation, the cite-down dependency graph, and their dual role as workflow doctrine library + standalone triggers |

## Structure

```
design-for-ai/
├── .claude-plugin/
│   └── plugin.json               # version 3.1.0 — workflow + multi-skill system; skills auto-discovered (no `skills` array)
├── commands/                     # the four workflow front doors (slash-invoked)
│   ├── research.md               # extract the design brief
│   ├── plan.md                   # decompose into phased design plan
│   ├── mock.md                   # cheap prototype + cross-pillar validation + sign-off gate
│   └── build.md                  # full gated execution: BUILD → REVIEW → commit per phase
├── agents/                       # dispatched by mock and build
│   ├── design-build-agent.md     # produces one phase's design artifact with execution evidence
│   └── design-review-agent.md    # independent cross-pillar critique on the rendered pixels
├── docs/                         # shared conventions every pillar obeys
│   ├── foundations-standards.md
│   ├── workflow-conventions.md
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
    ├── clarify/                  # internal workflow skill — design-scoped clarification
    ├── usability/                # keystone pillar (cited by the others)
    ├── content-design/
    ├── data-viz/
    ├── deceptive-patterns/       # twin of the core's ai-tells.md
    ├── behavioral/
    ├── journey/                  # ships a JOURNEY.md companion to DESIGN.md
    ├── design-systems/           # extends DESIGN.md + palette.mjs
    ├── ai-native/                # principle-derived; no settled canon
    └── prototype/                # produces self-contained HTML/CSS mocks; used by mock + build

# each pillar skill = SKILL.md + references/ (2 reference files), per docs/skill-authoring-template.md
```

## Installation

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```

Version 3.1.0 adds the `research → plan → mock → build` workflow on top of the v3.0.0 multi-skill design-foundations system. The install path is unchanged — workflow commands and agents are auto-discovered alongside the pillar skills.
