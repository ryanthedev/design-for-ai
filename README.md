# design-for-ai

Claude builds interfaces that look like Claude built them. Cyan-on-dark hero sections. Cards in a grid, all the same size. Glassmorphism on everything. Bounce easing. Inter at 16px. You've seen it. You've shipped it. Your users noticed.

This plugin teaches Claude the design vocabulary it's missing. Not "make it pretty" — the actual frameworks working designers use: proportional systems that make element sizing feel right instead of arbitrary, type scales built from ratios instead of guessing, color palettes constructed from the color wheel instead of vibes, composition rules that create a visual anchor instead of uniform mush.

Based on *Design for Hackers* by David Kadavy. Nine chapters of design theory, distilled into reference files that Claude loads on demand.

## A design-foundations system

As of **v3.1.0**, this is a **design-foundations system** with two front doors: a four-stage workflow that takes any design idea from brief to viewable artifact, and nine pillar skills that can be invoked directly for focused questions.

## The workflow

```
/design-for-ai:research → /design-for-ai:plan → /design-for-ai:mock → /design-for-ai:build
```

Start with an idea — vague is fine. The workflow takes it from brief to gated, committed design artifacts.

| Command | What happens |
|---------|-------------|
| **research** | Facilitates the design brief: who's it for, what should it feel like, what's the job it does. Saves a research doc. |
| **plan** | Turns the brief into a phased design plan: Discover (journey/IA/flows) → Design (DNA/tokens/system/words). Assigns pillar skills per phase, sets design done-when criteria. |
| **mock** | Renders a throwaway-fidelity prototype from the plan direction and runs a cheap cross-pillar validation on the real pixels. Gates on your sign-off before committing to the full build. |
| **build** | Executes the approved plan phase by phase — each phase: `BUILD → REVIEW → commit` with dispatched subagents, design execution evidence (contrast/tokens/heuristic), and a final trust report. |

The pillar skills are the workflow's doctrine library: each `build` phase's agents load the matched pillar skills, so a cross-pillar review of real rendered pixels becomes a workflow stage, not a trigger guess.

### The core: one command, the visual modes

```
/design-for-ai
```

Tell it what you need. It figures out the mode.

| Mode | What happens |
|------|-------------|
| **design** | Interviews you about purpose, audience, and personality, then generates a unique design DNA: brand archetype → aesthetic-family remix → three named candidates with real contrast-checked palettes → a DESIGN.md that gets locked before any code is written |
| **surface** | Picks layout patterns and style tokens for a device class — phone, TV, watch, in-car, kiosk, voice, e-ink — from each surface's input, distance, and attention constraints |
| **fonts** | Picks typefaces by analyzing the rendering medium, letter structure, and pairing compatibility, not by reaching for Inter |
| **color** | Builds a palette from color science: color wheel relationships, warm/cool depth, hue-shifted shadows, colorblind safety |
| **audit** | Runs a 10-section design review. Names the problem, cites the principle, shows the fix — and dispatches the `usability` skill for operability findings |
| **enhance** | Decides *what to reach for* to uplift a site: which library buys a wanted effect (motion, scroll, 3D), gated on register and cost. Library-agnostic: names categories and current examples, never pins a version |
| **polish** | Final pass: motion timing, all 8 interaction states, responsive behavior, and the AI-tells sweep |

### The pillar skills

Each is its own skill — trigger it by asking about its concern. No `/`-prefix needed; Claude routes by what you say. All pillars are also loaded per-phase by the workflow's dispatched agents — the two roles are orthogonal.

| Pillar | Reach for it when… |
|--------|--------------------|
| **usability** | "is this usable", "where do users get stuck", a heuristic evaluation, a UX law (Fitts/Hick/Miller), affordances, cognitive load, picking a nav/form/table/feedback pattern. The keystone the others cite |
| **content-design** | the *words* are the interface — UX writing, microcopy, error/empty/button copy, voice & tone |
| **data-viz** | encoding *data* — which chart, dashboards, data-ink/chartjunk, truthful encoding, chart accessibility |
| **deceptive-patterns** | dark patterns, manipulative UX, an ethical design review, regulatory exposure (DSA/FTC). The twin of the AI-tells ban-list |
| **behavioral** | *why* users act/return/convert — persuasion (Cialdini), the Fogg model, habit loops, emotional design. The honest mechanism |
| **journey** | how a user *moves through time* — JTBD, journey maps, IA/sitemaps, user flows, page specs. Ships a JOURNEY.md |
| **design-systems** | a look → a *machine* — design tokens, atomic components, governance. Extends DESIGN.md |
| **ai-native** | agent/LLM-interface design — agent UX, generative UI, no-fixed-screen interfaces. Principle-derived; **no settled canon yet** |

### Direct mode

```
/design-for-ai fonts
/design-for-ai surface
/design-for-ai audit
/design-for-ai enhance
/design-for-ai polish
```

### Or just talk

```
/design-for-ai the typography feels wrong
/design-for-ai review this landing page
/design-for-ai this looks like every other AI site
/design-for-ai which animation library should I reach for
```

The router matches your words to the right mode. If it can't tell, it asks.

## What changes

Without this plugin, Claude picks safe defaults. With it, Claude can explain *why* Garamond breaks on screen (angled axis, 100 ppi, moire), *why* your layout has no focal point (no dominant element, so the eye has nowhere to land), *why* your shadows look flat (pure black overlay instead of hue-shifted darker tones).

The difference: every design decision traces back to a principle. Not taste. Not "it looks better." A specific, citable reason from a specific chapter.

## Why the designs come out different every time

LLMs sample the statistical center of their training data. That's why every AI site converges on the same look. The design mode breaks this by construction, not by prompting harder:

- **Archetypes, not vibes.** Your answers map to one of 12 brand archetypes, which constrains a set of aesthetic families (Editorial Minimalism, Terminal-Core, Neo-Brutalist, Art Deco, Soft Futurism...), each with named fonts, color strategies, and motion vocabularies.
- **Remix, don't clone.** A design DNA takes its base from one family and borrows one or two axes from another: type from here, color strategy from there. The combinations don't exist as a cluster in any training data.
- **Real palettes, not invented hexes.** A bundled OKLCH generator (`scripts/palette.mjs`) builds 12-step neutral and accent ramps with WCAG contrast solved by construction: light and dark, harmony-derived secondary accents, functional colors.
- **A signature move.** Every DNA includes one specific decision a template would never contain.

## Install

```bash
/plugin marketplace add ryanthedev/rtd-claude-inn
/plugin install design-for-ai@rtd
```

Update: `/plugin update design-for-ai@rtd`

The current version is **3.1.0** — the `research → plan → mock → build` workflow on top of the multi-skill design-foundations system. The install path is unchanged: all skills (the core, nine pillars, and the workflow commands) are auto-discovered from the plugin's `skills/` and `commands/` directories.

## License

MIT
