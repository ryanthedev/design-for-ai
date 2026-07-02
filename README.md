# design-for-ai

Claude builds interfaces that look like Claude built them. Cyan-on-dark hero sections. Cards in a grid, all the same size. Glassmorphism on everything. Bounce easing. Inter at 16px. You've seen it. You've shipped it. Your users noticed.

This plugin teaches Claude the design vocabulary it's missing. Not "make it pretty" — the actual frameworks working designers use: proportional systems that make element sizing feel right instead of arbitrary, type scales built from ratios instead of guessing, color palettes constructed from the color wheel instead of vibes, composition rules that create a visual anchor instead of uniform mush.

Based on *Design for Hackers* by David Kadavy. Nine chapters of design theory, distilled into reference files that Claude loads on demand.

## A design-foundations system

As of **v4.2.0**, this is a **design-foundations system** with one front door: a four-stage workflow that takes any design idea from brief to viewable artifact. Design knowledge lives as doctrine reference files the workflow loads deterministically — plus a `prototype` skill you can invoke directly to render a mock.

## The workflow

```
/design-for-ai:research → /design-for-ai:plan → /design-for-ai:mock → /design-for-ai:build
```

Start with an idea — vague is fine. The workflow takes it from brief to gated, committed design artifacts.

| Command | What happens |
|---------|-------------|
| **research** | Facilitates the design brief: who's it for, what should it feel like, what's the job it does — and catches taste signals (fonts you lean toward, colors you'd never ship) as pins for the DNA deal. Saves a research doc; an optional verification pass (a grill, then a zero-context cold read) flips it draft → confirmed. |
| **plan** | Turns the brief into a phased design plan: Discover (journey/IA/flows) → Design (DNA/tokens/system/words). Assigns doctrine per phase, sets design done-when criteria. |
| **mock** | Renders a throwaway-fidelity prototype from the plan direction and runs a cheap cross-pillar validation on the real pixels. Gates on your sign-off before committing to the full build. |
| **build** | Executes the approved plan phase by phase — each phase: `BUILD → REVIEW → commit` with dispatched subagents, design execution evidence (contrast/tokens/heuristic), and a final trust report. |

The doctrine files are the workflow's knowledge library: each `mock` and `build` phase's dispatched agents resolve the applicable doctrine names and `Read()` every file before executing, so a cross-pillar review of real rendered pixels is a workflow stage, not a trigger guess. Review is dual-blind — an isolated cross-pillar critique and a deterministic AI-tell detector (`scripts/detect.mjs`) gather findings separately and synthesize after both finish.

### The doctrine domains

Eight domains, loaded per-phase by the workflow (not directly invocable):

| Domain | Concern |
|--------|---------|
| **usability** | whether users can *operate* it — Nielsen 10, UX laws (Fitts/Hick/Miller), affordances, cognitive load. The keystone the others cite |
| **content-design** | the *words* are the interface — UX writing, microcopy, error/empty/button copy, voice & tone |
| **data-viz** | encoding *data* — which chart, dashboards, data-ink/chartjunk, truthful encoding, chart accessibility |
| **deceptive-patterns** | dark patterns, manipulative UX, an ethical design review, regulatory exposure (DSA/FTC). The twin of the AI-tells ban-list |
| **behavioral** | *why* users act/return/convert — persuasion (Cialdini), the Fogg model, habit loops, emotional design. The honest mechanism |
| **journey** | how a user *moves through time* — JTBD, journey maps, IA/sitemaps, user flows, page specs. Ships a JOURNEY.md |
| **design-systems** | a look → a *machine* — design tokens, atomic components, governance. Extends DESIGN.md |
| **ai-native** | agent/LLM-interface design — agent UX, generative UI, no-fixed-screen interfaces. Principle-derived; **no settled canon yet** |

Visual doctrine (design DNA, surfaces, fonts, color, motion, interaction, responsive, audit, enhance, polish) lives in `references/visual/` and is resolved the same way.

### Your taste is a pin, not a suggestion

The composition dealer exists to stop the *model* from choosing — model choice converges to the same few looks. Your choice is the opposite force. Pin any axis before the deal (`--pin family=neo-brutalist --pin hue=teal`) and the dealer deals only what you left open; pick a candidate at converge and swap individual axes (font, hue, chroma, signature) without losing the rest; react to the mock with a one-loop "Swap an axis" at the sign-off gate.

## What changes

Without this plugin, Claude picks safe defaults. With it, Claude can explain *why* Garamond breaks on screen (angled axis, 100 ppi, moire), *why* your layout has no focal point (no dominant element, so the eye has nowhere to land), *why* your shadows look flat (pure black overlay instead of hue-shifted darker tones).

The difference: every design decision traces back to a principle. Not taste. Not "it looks better." A specific, citable reason from a specific chapter.

## Why the designs come out different every time

LLMs sample the statistical center of their training data. That's why every AI site converges on the same look. The DNA pipeline breaks this by construction, not by prompting harder:

- **Archetypes, not vibes.** Your answers map to one of 12 brand archetypes, which constrains a set of aesthetic families (Editorial Minimalism, Terminal-Core, Neo-Brutalist, Art Deco, Soft Futurism...), each with named fonts, color strategies, and motion vocabularies.
- **The deal, not the prior.** A seeded dealer (`scripts/dealer.mjs`) deals each of five candidates its aesthetic family, layout discipline, hue, and signature — the axis nothing else spreads. Known AI-tell combinations are banned cells the dealer never emits. Axes you pin are yours; the dealer deals the rest.
- **Remix, don't clone.** A design DNA takes its base from one family and borrows one or two axes from another: type from here, color strategy from there. The combinations don't exist as a cluster in any training data.
- **Real palettes, not invented hexes.** A bundled OKLCH generator (`scripts/palette.mjs`) builds 12-step neutral and accent ramps with WCAG contrast solved by construction: light and dark, harmony-derived secondary accents, functional colors.
- **A signature move.** Every DNA includes one specific decision a template would never contain.

## Install

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```

Update: `/plugin update design-for-ai@rtd`

The current version is **4.2.0** — the `research → plan → mock → build` workflow on a deterministic doctrine-read model, with user-pinnable DNA axes and a verified-brief research pass. The install path is unchanged: the four workflow commands, two agents, and four skills (`prototype`, `clarify`, `usability`, `data-viz`) are auto-discovered from the plugin's `commands/`, `agents/`, and `skills/` directories.

## License

MIT
