# design-for-ai

Claude builds interfaces that look like Claude built them. Cyan-on-dark hero sections. Cards in a grid, all the same size. Glassmorphism on everything. Bounce easing. Inter at 16px. You've seen it. You've shipped it. Your users noticed.

This plugin teaches Claude the design vocabulary it's missing. Not "make it pretty" — the actual frameworks working designers use: proportional systems that make element sizing feel right instead of arbitrary, type scales built from ratios instead of guessing, color palettes constructed from the color wheel instead of vibes, composition rules that create a visual anchor instead of uniform mush.

Based on *Design for Hackers* by David Kadavy. Nine chapters of design theory, distilled into reference files that Claude loads on demand.

## One command, five modes

```
/design-for-ai
```

Tell it what you need. It figures out the mode.

| Mode | What happens |
|------|-------------|
| **design** | Interviews you about purpose, audience, and personality, then generates a unique design DNA: brand archetype → aesthetic-family remix → three named candidates with real contrast-checked palettes → a DESIGN.md that gets locked before any code is written |
| **fonts** | Picks typefaces by analyzing the rendering medium, letter structure, and pairing compatibility — not by reaching for Inter |
| **color** | Builds a palette from color science: color wheel relationships, warm/cool depth, hue-shifted shadows, colorblind safety |
| **audit** | Runs a 10-section design review. Names the problem, cites the principle, shows the fix |
| **polish** | Final pass: motion timing, all 8 interaction states, responsive behavior, and the AI-tells sweep |

### Direct mode

```
/design-for-ai fonts
/design-for-ai audit
/design-for-ai polish
```

### Or just talk

```
/design-for-ai the typography feels wrong
/design-for-ai review this landing page
/design-for-ai this looks like every other AI site
```

The router matches your words to the right mode. If it can't tell, it asks.

## What changes

Without this plugin, Claude picks safe defaults. With it, Claude can explain *why* Garamond breaks on screen (angled axis, 100 ppi, moire), *why* your layout has no focal point (no dominant element — the eye has nowhere to land), *why* your shadows look flat (pure black overlay instead of hue-shifted darker tones).

The difference: every design decision traces back to a principle. Not taste. Not "it looks better." A specific, citable reason from a specific chapter.

## Why the designs come out different every time

LLMs sample the statistical center of their training data — that's why every AI site converges on the same look. The design mode breaks this by construction, not by prompting harder:

- **Archetypes, not vibes.** Your answers map to one of 12 brand archetypes, which constrains a set of aesthetic families (Editorial Minimalism, Terminal-Core, Neo-Brutalist, Art Deco, Soft Futurism...), each with named fonts, color strategies, and motion vocabularies.
- **Remix, don't clone.** A design DNA takes its base from one family and borrows one or two axes from another — type from here, color strategy from there. The combinations don't exist as a cluster in any training data.
- **Real palettes, not invented hexes.** A bundled OKLCH generator (`scripts/palette.mjs`) builds 12-step neutral and accent ramps with WCAG contrast solved by construction — light and dark, harmony-derived secondary accents, functional colors.
- **A signature move.** Every DNA includes one specific decision a template would never contain.

## Install

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```

Update: `/plugin update design-for-ai@rtd`

## License

MIT
