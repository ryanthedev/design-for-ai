---
name: usability
description: "Adjudicate whether users can operate an interface, and run heuristic evaluation. Use when the question is operability rather than looks — is it usable, hard to use, confusing, where do users get stuck; heuristic evaluation, Nielsen heuristics, usability audit, severity rating; the UX laws (Fitts, Hick, Miller/Cowan, Jakob, Tesler, Doherty, peak-end, Zeigarnik, aesthetic-usability); Gestalt grouping, affordances, signifiers, mapping, feedback, cognitive load, recognition over recall; picking among navigation, form, search/filter, table/data, feedback, action, disclosure, or onboarding patterns; or usability-side accessibility (WCAG POUR, inclusive design). Not for: the visual look or aesthetic audit (use core design/audit); the words/microcopy themselves (use content-design); the route through time, IA, or funnel (use journey); persuasion or conversion mechanics (use behavioral); truthful chart/data encoding (use data-viz)."
user-invocable: true
argument-hint: "[interface or flow to evaluate]"
---

Adjudicate whether users can **operate** an interface — not whether it looks good. The job is a two-layer engine: principles (Gestalt, the UX laws, Nielsen/Shneiderman heuristics, Norman, cognitive load, accessibility) are the *why*; UI pattern families are the *what*; the principles **select** among the patterns. Every recommendation cites its source — the law, heuristic, or author it traces to.

## When this applies

Reach for this skill when the concern is operability: "is this usable", "hard to use", "users get stuck / confused / drop off here", a heuristic / usability evaluation, applying a UX law (Fitts, Hick, Miller/Cowan, Jakob, …), reasoning about affordances / signifiers / feedback / cognitive load, choosing among UI pattern families (navigation, forms, search/filter, data display, feedback, action, disclosure, onboarding), or the usability side of accessibility (WCAG POUR, inclusive design). The core `audit` mode dispatches its heuristic evaluation here.

Not the visual look (core `design`/`audit`), the microcopy itself (`content-design`), the route through time / IA / funnel (`journey`), persuasion mechanics (`behavioral`), or truthful data encoding (`data-viz`).

## Rules

Standing rules for every usability judgement. Kept separate so they don't dissolve into the procedure.

- **Cite the principle.** Every recommendation names its source with originator/year where it has one: "Fitts's law (1954)", "Nielsen #5 error prevention (1994)", "Norman: signifiers over affordances (1988/2013)", "layer-cake scanning (NN/g)". No unsourced opinion. The citeable canon lives in `references/usability-principles.md`.
- **Laws are tendencies, not physics.** The UX laws hold *under conditions*; they are cited to ground a recommendation, never as a compliance checklist (framework-as-deliverable is compliance theater). Knowing *when a law does not apply* is part of citing it honestly — e.g. Miller's 7±2 is about working memory, not visible on-screen menu items.
- **Fix usability before polish.** The aesthetic-usability effect (Kurosu & Kashimura, 1995) means a pretty UI inflates subjective scores and *masks* real defects in testing. Order matters: resolve operability defects first, then let visual polish (core `design`) raise the ceiling.
- **Heuristic evaluation is a complement, not user testing.** It finds *likely* problems (evaluator effect, low inter-rater reliability, unreliable severity), not real-world frequency — pair it with real testing; for accessibility, test with assistive-technology users (automated tools catch ~35%).
- **Stay generative.** Select, pair, and propose patterns grounded in the laws; do not degrade into box-ticking. The principles are the arbiter that lets you *offer options*, not a gate to pass.
- **Cite down only.** Usability is the innermost design-layer entity — other pillars (journey, behavioral, deceptive-patterns) cite its laws; it cites none of them upward. No cross-pillar cycles.

## Procedure

The engine has two modes; pick by what the user needs.

### A. Heuristic evaluation (the `audit` method)

When asked to evaluate an existing interface, or dispatched from the core `audit` mode for operability:

1. Read `references/usability-principles.md`.
2. Walk **Nielsen's 10 heuristics** (1994) against the interface; for each violation, name the heuristic, the principle behind it, and the fix.
3. Rate each finding on the **0–4 severity scale** (0 = not a problem … 4 = usability catastrophe), factoring frequency × impact × persistence.
4. Cross-check the perception and cognitive laws (Gestalt grouping, Hick, Miller/Cowan, recognition-over-recall) for issues the heuristics miss.
5. Output a findings table sorted by severity: `Severity | Heuristic / law | Problem | Fix`. State the complement caveat — this finds likely problems, not real frequency.

### B. Pattern selection (the why → what engine)

When choosing or fixing a UI pattern:

1. Read `references/ui-patterns.md` for the family catalog and the bridge table.
2. Name the relevant **constraint** (screen size, input model, task familiarity, frequency, comparison need).
3. Let the **principle select the pattern** via the bridge: e.g. Fitts → bottom tab bar over top nav on phones; Hick → grouped/progressive menu over a mega-menu on small screens; Miller/Cowan → wizard / field-grouping over a 20-field page; Jakob → pagination over infinite scroll on a utility site.
4. Recommend the pattern, cite the selecting law, and note when the convention should be *broken* (new category, harmful legacy convention, justified brand differentiation).

## References

| Reference file | Load when |
|----------------|-----------|
| `references/usability-principles.md` | Layer A — the why-engine: Gestalt, the UX laws, Nielsen 10 + Shneiderman 8 + heuristic-eval method, Norman, cognitive load, accessibility, the critical caveats. **The stable citeable reference for other pillars.** |
| `references/ui-patterns.md` | Layer B — the 8 UI pattern families catalog + the bridge table (principle → pattern) + pattern caveats. |
