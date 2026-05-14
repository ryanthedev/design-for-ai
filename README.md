# design-for-ai

A Claude Code plugin that teaches visual design. Based on principles from *Design for Hackers* by David Kadavy.

Most AI-generated interfaces look the same: safe colors, uniform spacing, no visual anchor. This plugin gives Claude the vocabulary and checklists to do better — proportional systems, type scales, color theory, composition rules that working designers actually use.

## Usage

```
/design-for-ai
```

One entry point. The skill figures out what you need and routes to the right mode.

| Mode | What it does |
|------|-------------|
| design | Establish foundations — purpose, audience, aesthetic direction |
| fonts | Select, pair, and configure typography with theory backing |
| color | Build a color system from color science up |
| audit | Find what's wrong and explain WHY |
| polish | Motion, interaction, responsive, identity — final quality pass |

### Examples

```
/design-for-ai design       # starting a new project
/design-for-ai fonts        # pick and pair typefaces
/design-for-ai color        # build a palette
/design-for-ai audit        # something looks off — find out why
/design-for-ai polish       # final pass before shipping
```

Or just describe what you need:

```
/design-for-ai the typography feels wrong
/design-for-ai review this landing page
/design-for-ai this looks like every other AI site
```

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
