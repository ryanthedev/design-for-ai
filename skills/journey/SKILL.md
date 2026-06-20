---
name: journey
description: "Maps how users move through time — from intent to outcome — and how a marketing site earns the conversion. Covers JTBD job stories (Christensen/Ulwick/Moesta), journey maps (NN/g swim lanes, emotion curve, loyalty loop, messy middle), information architecture (Rosenfeld/Morville 4 systems: organization, labeling, navigation, search), user and task flows, page specs, and the marketing persuasion spine (hero→proof→problem→solution→CTA; AIDA/PAS/StoryBrand). Ships a JOURNEY.md companion document (Job / Journey / IA / Flows / Page specs) alongside DESIGN.md. Use when the question is about user journeys, journey mapping, information architecture, sitemaps, nav models, JTBD job stories, user flows, task flows, conversion funnels, landing-page section order, or the JOURNEY.md template. Not for: motivation or why users act (habit loop, Cialdini) — use behavioral; visual color, fonts, or UI look — use core design; device-class layout — use surface; single-screen operability — use usability."
user-invocable: true
argument-hint: "[flow, IA, journey map, or page spec context]"
---

Journey design is the practice of specifying how a user moves through time — from a job they're hired to do, through the touchpoints they encounter, into the information architecture they navigate, and across the flows they complete — culminating in a JOURNEY.md that pairs with DESIGN.md to form a complete design spec.

## When this applies

- Designing or auditing a **user journey** — the sequence of experiences from first awareness through ongoing loyalty.
- Authoring **JTBD job stories** — the motivational frame for why someone hires a product at all.
- Building a **journey map** — NN/g swim lanes with an emotion curve, using the loyalty loop and messy middle, not a linear funnel.
- Designing **information architecture** — the organization, labeling, navigation, and search systems (Rosenfeld/Morville's four IA systems) before any visual design.
- Specifying **user flows** (branching decision paths) or **task flows** (linear goal paths) that encode how a user moves through a digital space.
- Writing **page specs** — the purpose, entry points, content blocks, states, CTA, and exit for each page.
- Sequencing a **marketing site** — hero, proof, problem, guide+solution, objection handling, CTA — in the right persuasion order.
- Authoring the **JOURNEY.md** companion document.

Not for: the psychological mechanism of persuasion (Cialdini, Fogg, habit loop — use `behavioral`); visual DNA, fonts, and color (use core `design`); device-class layout patterns (use core `surface`); the operability and heuristic evaluation of a single screen (use `usability`).

## Rules

- **Cite the principle.** Every recommendation names its source: "NN/g Gibbons 2018", "Rosenfeld/Morville 4 IA systems", "McKinsey loyalty loop (2009)", "StoryBrand SB7 (Miller 2017)". No unsourced structural claims.
- **Cite usability laws down.** Hick's law (Hick–Hyman 1952) grounds every option-reduction recommendation in nav and flows. Fitts's law (Fitts 1954) grounds CTA placement and target sizing. Miller's law revised to Cowan (~4±1 chunks) grounds information chunking in flows and page specs. These laws live in `usability-principles.md`; cite them by name and source, never re-derive.
- **No linear funnel.** AIDA and the traditional funnel assume orderly progression that doesn't exist. Real decision journeys use the McKinsey loyalty loop (2009) and Google messy middle (2020: explore↔evaluate loop). Cite these instead when describing non-linear journeys.
- **Journey maps are research, not decoration.** A journey map without a named owner, a cadence for updates, and a clear research basis is theater (Watermark 2023: 83% of CX pros can't make maps drive change). Flag this explicitly when authoring.
- **Pick one JTBD school per project.** Four schools (Christensen, Ulwick, Moesta, Klement) use incompatible vocabulary. Mixing them produces neither. Recommend the Switch interview (Moesta: four forces — push/pull/anxiety/habit) as the most immediately actionable for a product team.
- **Sitemap ≠ IA.** A neat sitemap can encode the wrong mental model. Validate with card sorting and tree testing before any visual design (Rosenfeld/Morville).
- **JOURNEY.md is the output artifact.** Author it alongside DESIGN.md; it carries the spec that visual tokens alone can't encode.
- **Stay generative.** Produce the artifact or spec — don't degrade into a taxonomy of frameworks. The journey stack's altitude model (JTBD → map → IA → flows → page specs) is the organizing spine, not a box-ticking sequence.

## Procedure

### A. Orienting question: what altitude?

Load `references/journey-stack.md`. Determine the user's altitude:

| Altitude | Artifact | When it's needed |
|----------|----------|-----------------|
| Strategic/why | JTBD job story | Unclear who the product is for or what job it does |
| Strategic/felt | Journey map | Auditing or improving an existing experience end-to-end |
| Structural/where | IA + sitemap | Planning navigation, labeling, or site organization |
| Tactical/how | User or task flow | Designing a specific feature flow or multi-step process |
| Page/what | Page spec | Specifying what a single page does and how it connects |
| Marketing | Persuasion spine | Sequencing a landing page or marketing site |

Multiple altitudes may be needed. Start at the top (JTBD) if the problem is unclear, or jump to the right altitude if the need is named.

### B. JTBD job story

When the problem is motivational (why does someone hire this product?):

1. Run the Switch interview structure (Moesta): what pushed them away from the old solution (push), what attracted them to the new one (pull), what anxieties slowed them (anxiety), what habits held them back (habit)?
2. Author a job story: "When [situation], I want [motivation], so I can [outcome]." Separate the functional, emotional, and social dimensions of the job.
3. Flag JTBD school in use; do not mix vocabulary.

### C. Journey map

When auditing or improving the end-to-end experience:

1. Load `references/journey-stack.md` — the NN/g swim lanes section.
2. Define: actor (who), scenario (what they're trying to do), scope (touchpoints included).
3. Build swim lanes: phases → actions → mindsets → emotion curve → touchpoints + channels → opportunities.
4. Use the **loyalty loop** (McKinsey 2009) or **messy middle** (Google 2020) for the decision model — not a linear funnel. The loyalty loop has an initial purchase loop + a post-purchase loyalty loop. The messy middle is an explore↔evaluate loop governed by 6 cognitive biases.
5. Flag theater risk: name the owner, the research basis, and the update cadence before treating the map as actionable.

### D. Information architecture

When planning navigation, labels, or site organization:

1. Load `references/journey-stack.md` — the IA section (Rosenfeld/Morville 4 systems).
2. Choose organization scheme: exact (alpha/chrono/geo) or ambiguous (topic/task/audience/metaphor).
3. Choose structure: tree, sequential, matrix/faceted, or hub-and-spoke.
4. Design navigation: global (site-wide), local (section), contextual (related/related-to-current), breadcrumbs.
5. Apply Hick's law (Hick–Hyman 1952): group and stage nav options to reduce decision time for unfamiliar users. Note: Miller's law (Cowan ~4±1) governs memory load, not the count of visible items — broad navigation can outperform deep navigation (see `usability-principles.md` #millers-law-revised-to-cowan).
6. Validate with card sorting (label mental model) and tree testing (nav structure) before visual design.

### E. User and task flows

When designing a feature flow or multi-step process:

1. Choose artifact: user flow (branching — captures decisions), task flow (linear — captures steps for a single path), or wireflow (+ low-fi UI).
2. Notation: circle = entry/exit, diamond = decision, rectangle = action.
3. Apply Fitts's law (Fitts 1954) to CTA placement: make primary targets large and close to the natural resting position.
4. Apply Hick's law to decision nodes: minimize options at each branch; stage choices progressively.
5. Encode states: success, error, loading, empty, edge cases.

### F. Page spec

When specifying a single page:

For each page, document: purpose (one-sentence job this page does), entry points (where users arrive from), content blocks (in order), states (empty, loading, error, success), primary CTA, exit/next page.

### G. Marketing persuasion spine

When sequencing a landing page or marketing site:

1. Load `references/journey-stack.md` — the persuasion spine section.
2. Apply canonical section order: hero (value prop + primary CTA) → social proof → problem/pain → guide + empathy → solution (features-as-benefits) → how it works → objection handling → testimonials → pricing → success vision → stakes → FAQ → final CTA.
3. Match opener to awareness stage (Schwartz ladder): cold traffic → hook/problem lead; problem-aware → problem lead; most-aware → skip to offer.
4. Apply StoryBrand SB7 (Miller 2017): customer is the hero, brand is the guide — the product resolves the problem the customer already has, not one the brand invented.
5. Note the Julian Shapiro conversion equation: Purchase = Desire − (Labor + Confusion). Every section either raises desire or reduces friction.

### H. JOURNEY.md

When authoring the companion document:

1. Load `references/journey-stack.md` — the JOURNEY.md template section.
2. Fill each section: Job (JTBD story + four forces), Journey (phases, emotion curve, touchpoints, loyalty loop placement), IA (structure, nav model, labeling, card-sort/tree-test results), Flows (key user/task flows), Page specs (each primary page).
3. Link JOURNEY.md from DESIGN.md and from the project's CLAUDE.md `## Design Context` block.

## References

| Reference file | Load when |
|----------------|-----------|
| `references/journey-stack.md` | The constructive layer: JTBD schools, NN/g journey map swim lanes, IA 4 systems, user/task flow notation, page spec format, marketing persuasion spine, and the JOURNEY.md template. |
| `references/journey-caveats.md` | The honest-citation layer: journey-map theater, linear-funnel fallacy, cargo-cult landing page syndrome, JTBD school-mixing warnings, sitemap ≠ IA. Load whenever a client presents a journey map, an AIDA funnel, or a "best-practice" landing page template. |
