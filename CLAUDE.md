# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Purpose

This is a Claude Code plugin that teaches visual design principles from *Design for Hackers* — helping AI and developers make informed decisions about typography, color, composition, proportions, visual hierarchy, motion, interaction, and responsive design.

## Commands

| Command | What it does |
|---------|-------------|
| `/design-for-ai` | Full design workflow (CHECKER or APPLIER mode) |
| `/design` | Establish design foundations — purpose, audience, aesthetic direction |
| `/exam` | Theory-backed design audit — find what's wrong and explain WHY |
| `/brand` | Strip AI design tells, add intentional character |
| `/fonts` | Select, pair, and configure typography |
| `/color` | Build a color system from color science up |
| `/flow` | Add motion, interaction states, responsive behavior |
| `/hone` | Final quality pass — every principle checked |

## Structure

```
design-for-ai/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest (v2.0.0)
├── commands/
│   ├── design-for-ai.md      # Main command (router)
│   ├── design.md             # /design
│   ├── exam.md               # /exam
│   ├── brand.md              # /brand
│   ├── fonts.md              # /fonts
│   ├── color.md              # /color
│   ├── flow.md               # /flow
│   └── hone.md               # /hone
└── skills/
    └── design-for-ai/        # Visual design principles skill
        ├── SKILL.md
        └── references/
            ├── chapter-01 through 09  # Design for Hackers chapters
            ├── appendix-fonts-and-typography.md
            ├── checklists.md          # Decision trees, red flags, master checklists
            ├── foundations.md         # Core philosophy, credibility science
            ├── techniques.md          # 94 techniques, transformation patterns
            ├── motion.md              # NEW — timing, easing, GPU, reduced motion
            ├── interaction.md         # NEW — 8 states, focus, forms, loading
            ├── responsive.md          # NEW — fluid, container queries, breakpoints
            └── ai-tells.md            # NEW — AI design fingerprints, how to avoid
```

## Skill File Format

Each skill is a Markdown file with YAML frontmatter:

```markdown
---
name: skillname
description: When to use this skill - triggers skill selection
---

# Skill Title

[Workflow steps, phases, decision tables, output formats]
```

The `description` field is critical — it tells Claude when to invoke the skill.

## Installation

Install via the RTD marketplace:

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```
