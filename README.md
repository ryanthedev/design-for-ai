# design-for-ai

A Claude Code plugin that teaches visual design. Based on principles from *Design for Hackers* by David Kadavy.

Most AI-generated interfaces look the same: safe colors, uniform spacing, no visual anchor. This plugin gives Claude the vocabulary and checklists to do better — proportional systems, type scales, color theory, composition rules that working designers actually use.

## What it does

Two modes. **CHECKER** audits an existing design against seven categories. **APPLIER** walks through a phased build from wireframe to final polish.

### Checking a design

```
/design-for-ai review this landing page
```

Runs through purpose, typography, proportions, composition, visual hierarchy, color, and SEO. Stops at the first failure and investigates before moving on.

### Building a design

```
/design-for-ai I'm creating a dashboard from scratch
```

Six phases: foundation (purpose, personas, wireframes), structure (ratio system, type scale, grid), typography (font selection, pairing), composition and hierarchy (dominance, depth, eye flow), color (palette, accessibility, warm/cool), and technical (semantic HTML, heading hierarchy).

## When it triggers

The skill activates when you're choosing fonts, picking colors, setting layout proportions, reviewing why a UI looks off, establishing visual hierarchy, or building any user-facing interface. It also fires when generating frontend code.

## Symptom lookup

| You're stuck on... | Where it sends you |
|---|---|
| "Design feels like decoration" | Ch. 1 — Why Design Matters |
| "How much effort does this need?" | Ch. 2 — Purpose of Design |
| "Which font?" | Ch. 3 — Typography |
| "Style feels derivative" | Ch. 4 — Technology and Culture |
| "How big should elements be?" | Ch. 5 — Proportions |
| "Nothing holds the eye" | Ch. 6 — Composition |
| "Can't tell what's important" | Ch. 7 — Visual Hierarchy |
| "Colors don't match across media" | Ch. 8 — Color Science |
| "How do I pick a palette?" | Ch. 9 — Color Theory |
| "Fonts don't pair well" | Appendix — Fonts & Typography |

## Installation

```bash
# Add the marketplace
/plugin marketplace add ryanthedev/rtd-claude-inn

# Install
/plugin install design-for-ai@rtd

# Update
/plugin update design-for-ai@rtd
```

## License

MIT
