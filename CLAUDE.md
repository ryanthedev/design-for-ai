# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Purpose

This is a Claude Code plugin that teaches visual design principles from *Design for Hackers* — helping AI and developers make informed decisions about typography, color, composition, proportions, and visual hierarchy.

## Structure

```
design-for-ai/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest (name, version, description)
├── commands/
│   └── design-for-ai.md      # /design-for-ai slash command
└── skills/
    └── design-for-ai/        # Visual design principles skill
        ├── SKILL.md
        └── references/
            ├── chapter-01-why-design-matters.md
            ├── chapter-02-purpose-of-design.md
            ├── chapter-03-typography.md
            ├── chapter-04-technology-and-culture.md
            ├── chapter-05-proportions.md
            ├── chapter-06-composition.md
            ├── chapter-07-visual-hierarchy.md
            ├── chapter-08-color-science.md
            ├── chapter-09-color-theory.md
            ├── appendix-fonts-and-typography.md
            ├── checklists.md
            ├── foundations.md
            └── techniques.md
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
