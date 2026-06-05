# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Purpose

A Claude Code plugin that teaches visual design principles from *Design for Hackers* — helping AI and developers make informed decisions about typography, color, composition, proportions, visual hierarchy, motion, interaction, and responsive design.

## Usage

Single entry point: `/design-for-ai`. The skill routes to the right mode based on what the user asks for.

| Mode | What it does |
|------|-------------|
| design | Establish foundations, then generate a unique design DNA — archetype → family remix → contrast-checked tokens → DESIGN.md gate |
| fonts | Select, pair, and configure typography |
| color | Build a color system from color science up |
| audit | Find what's wrong and explain WHY |
| polish | Motion, interaction, responsive, identity — final pass |

## Structure

```
design-for-ai/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── design-for-ai/
        ├── SKILL.md               # Router — determines mode, loads references
        ├── scripts/
        │   └── palette.mjs        # OKLCH token generator — WCAG contrast by construction
        └── references/            # Loaded progressively per mode
            ├── chapter-01 through 09
            ├── appendix-fonts-and-typography.md
            ├── archetypes.md      # 12 brand archetypes + aesthetic families + mapping tables
            ├── design-dna.md      # Remix rules, 3-candidate protocol, DESIGN.md template
            ├── checklists.md
            ├── foundations.md
            ├── techniques.md
            ├── motion.md
            ├── interaction.md
            ├── responsive.md
            └── ai-tells.md
```

## Installation

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```
