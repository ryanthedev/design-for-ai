# Journey stack — the layered altitude model

The constructive reference for the `journey` skill. Artifacts are **layers by altitude** — strategic to tactical to page — not competitors. A project uses whichever layers the problem calls for.

**Sources:** NN/g UX Mapping Cheat Sheet; NN/g "User Journeys vs User Flows" (Gibbons 2018); Rosenfeld/Morville *Information Architecture for the World Wide Web* (4th ed); McKinsey Consumer Decision Journey (2009); Google Messy Middle (2020); Christensen *Competing Against Luck* (milkshake study); Ulwick ODI/Universal Job Map; Moesta Switch interview (four forces); Klement job stories (jtbd.info 2013); Miller *StoryBrand* SB7 (2017); Shapiro conversion equation; Schwartz awareness ladder.

---

## Table of Contents

1. [Key definitions](#key-definitions)
2. [Altitude model — the layered stack](#altitude-model--the-layered-stack)
3. [JTBD job stories](#jtbd-job-stories)
4. [Journey maps — NN/g swim lanes](#journey-maps--nng-swim-lanes)
5. [Decision journey models — loyalty loop and messy middle](#decision-journey-models--loyalty-loop-and-messy-middle)
6. [Information architecture — Rosenfeld/Morville 4 systems](#information-architecture--rosenfeld--morville-4-systems)
7. [User flows and task flows](#user-flows-and-task-flows)
8. [Page specs](#page-specs)
9. [Marketing persuasion spine](#marketing-persuasion-spine)
10. [JOURNEY.md template](#journeymd-template)

---

## KEY DEFINITIONS

> **Journey** (this skill's scope): the sequence of experiences a user has moving through time — from initial motivation to recurring use. Distinct from the operability of a single screen (usability) and from the visual language of that screen (design).

> **JTBD (Jobs to be Done)**: the progress a user hires a product to make; the motivational frame behind a feature request or behavioral change. Multiple schools (see §JTBD below) — pick one.

> **Journey map** (NN/g): a visualization of the end-to-end experience — actor, scenario, phases, actions, mindsets, emotion curve, touchpoints, channels, opportunities. Research-grounded, not aspirational.

> **Information architecture (Rosenfeld/Morville)**: the structural design of a shared information environment — the organization, labeling, navigation, and search systems that help people find and understand content.

> **User flow**: a branching diagram of the paths a user takes through a product to accomplish a goal. Captures decisions, not just steps.

> **Task flow**: a linear flow for a single, goal-directed path — no branching. Useful for primary success paths.

> **Wireflow**: a user or task flow with low-fidelity UI sketches at each node.

> **Page spec**: the structural specification of a single page — purpose, entry points, content blocks, states, CTA, exit.

> **Persuasion spine**: the canonical section sequence for a marketing site or landing page that moves a cold visitor to conversion.

---

## ALTITUDE MODEL — THE LAYERED STACK

Artifacts are layers by altitude. Use what the problem requires; start at the top when the problem is under-defined.

| Altitude | Question it answers | Artifact | Primary tool |
|----------|-------------------|----------|--------------|
| Strategic / why | Why does someone hire this product? | JTBD job story | Switch interview (Moesta) |
| Strategic / felt | What is the end-to-end experience? | Journey map | NN/g swim lanes |
| Structural / where | Where does content live; how do users navigate? | IA + sitemap | Card sort + tree test |
| Tactical / how | How does a user accomplish a specific goal? | User flow / task flow | Flow notation |
| Page / what | What does each page do? | Page spec | Spec template |
| Marketing | How does a cold visitor become a customer? | Persuasion spine | Section order |

---

## JTBD JOB STORIES

**Source:** Christensen milkshake study (progress hiring, *Competing Against Luck* 2016); Ulwick ODI/Universal Job Map (8 steps: define → locate → prepare → confirm → execute → monitor → modify → conclude); Moesta Switch interview (four forces); Klement job stories (jtbd.info 2013).

### Job story format

> "When [situation], I want [motivation], so I can [outcome]."

Separate the job into three dimensions:
- **Functional**: the practical task (transfer money, find a recipe, book a flight).
- **Emotional**: how the user wants to feel (confident, unhurried, expert).
- **Social**: how the user wants to be perceived (organized, generous, professional).

### Switch interview (Moesta — most actionable for product teams)

Reconstruct the moment of switching from old solution to new. Map the four forces:

| Force | What it captures |
|-------|-----------------|
| **Push** | What was wrong with the old solution? (the dissatisfaction that created the job) |
| **Pull** | What attracted them to the new solution? (the imagined benefit) |
| **Anxiety** | What slowed them down? (fears about the new solution — learning curve, risk, commitment) |
| **Habit** | What held them to the old behavior? (inertia, familiarity, sunk cost) |

### JTBD school note

Four schools use incompatible vocabulary (Christensen's progress/circumstance; Ulwick's ODI/Universal Job Map; Moesta's four-force/Switch interview; Klement's job stories). **Pick one per project.** Mixing produces neither insight nor a usable framework. See `journey-caveats.md` for the failure mode.

---

## JOURNEY MAPS — NN/G SWIM LANES

**Source:** NN/g Gibbons 2018 ("Journey Mapping 101"); NN/g UX Mapping Cheat Sheet.

### Swim lane structure

A journey map has a header (actor, scenario, scope, awareness stage) and swim lanes:

| Swim lane | What it contains |
|-----------|-----------------|
| **Phases** | The named stages of the experience (Awareness → Consideration → Decision → Onboarding → Ongoing) — scoped to the scenario; not universal |
| **Actions** | What the user does in each phase (searches, compares, signs up, etc.) |
| **Mindsets / thoughts** | What the user is thinking — their mental model and questions |
| **Emotion curve** | A line graph of high/low emotional intensity across phases — peaks and valleys indicate design opportunity |
| **Touchpoints** | Where the interaction happens (website, email, app, support call, physical store) |
| **Channels** | The delivery mechanism for each touchpoint |
| **Opportunities** | Design interventions suggested by the gaps between current and desired experience |

### Emotion curve guidance

The emotion curve is where journey maps have the most design leverage — and the most fabrication risk (see `journey-caveats.md`). Ground it in qualitative research:
- Use the **peak-end rule** (Kahneman, `usability-principles.md` #peak-end-rule): users judge the experience by its emotional peak and its ending, not the average. Invest in the emotional high point and the final touchpoint.
- The curve should show **real** emotional data from user interviews or diary studies, not hypothesized ideals. Ungrounded emotion curves are theater.

### Scope guidance

NN/g explicitly discourages a universal stage model. The phases depend on:
- The actor (who) and scenario (what they're trying to do)
- The scope: current-state (how it is) vs. future-state (how it should be); single-actor vs. multi-actor (service blueprint)

---

## DECISION JOURNEY MODELS — LOYALTY LOOP AND MESSY MIDDLE

Use these in place of the linear AIDA funnel (see `journey-caveats.md` for why the funnel fails).

### McKinsey Customer Decision Journey + Loyalty Loop (2009, ~20k consumers)

**Source:** Court et al., McKinsey Quarterly 2009; Edelman 2013 (loyalty loop).

The CDJ replaces the funnel with two loops:
1. **Initial purchase loop**: triggers → consideration set → active evaluation (as brands are added and removed) → moment of purchase → post-purchase experience.
2. **Loyalty loop**: post-purchase experience, if positive, bypasses the evaluation stage and directly returns to purchase — loyal customers skip the messy middle.

Design implication: the loyalty loop is more valuable than the initial funnel. Design for post-purchase experience and active loyalty, not just acquisition.

### Google Messy Middle (2020)

**Source:** Google/Eatbigfish research, 2020 ("Decoding Decisions").

Between the trigger and purchase sits the **messy middle**: a non-linear space of exploration and evaluation governed by 6 cognitive biases:

| Bias | What it does | Design application |
|------|-------------|-------------------|
| **Category heuristics** | Shortcuts based on a few key attributes | Clarify your product's strongest 3 attributes immediately |
| **Power of now** | Immediate availability beats delayed | Reduce wait times; offer instant access where possible |
| **Social proof** | Others' choices validate mine | Prominent, specific testimonials near the decision point |
| **Scarcity bias** | Less available = more desirable | Use real scarcity honestly (see `deceptive-patterns` for manufactured scarcity) |
| **Authority bias** | Expert endorsement increases trust | Third-party validation, certifications, expert quotes |
| **Power of free** | Free reduces perceived risk | Free trials, free tiers, money-back guarantees |

---

## INFORMATION ARCHITECTURE — ROSENFELD/MORVILLE 4 SYSTEMS

**Source:** Rosenfeld, Morville, and Arango, *Information Architecture for the World Wide Web* (4th ed, "polar bear book").

### The 4 IA systems

| System | What it defines | Examples |
|--------|----------------|----------|
| **Organization** | How content is grouped and categorized | Exact schemes (alpha, chronological, geographical); Ambiguous schemes (topic, task, audience, metaphor) |
| **Labeling** | What content groups are called | Nav labels, category names, button text — the language of the structure |
| **Navigation** | How users move between content | Global (site-wide), local (section), contextual (related-to-current), breadcrumbs, mega-menus |
| **Search** | How users find specific content | Query types (known-item, exploratory), result presentation, faceted refinement |

### Organization schemes

**Exact schemes** — objectively correct placement, low cognitive load:
- Alphabetical (dictionaries, directories, A–Z indexes)
- Chronological (news, events, changelogs)
- Geographical (regional content, location-based services)

**Ambiguous schemes** — require judgment, more powerful for discovery:
- Topic (most common; groups by subject matter)
- Task (groups by what users are trying to do)
- Audience (groups by who the user is)
- Metaphor (maps to a familiar real-world structure — use sparingly; dated quickly)

### Structure types

| Structure | Shape | Best for |
|-----------|-------|----------|
| **Tree (hierarchy)** | Parent → children | Most sites; clear parent-child relationships |
| **Sequential** | Step 1 → Step 2 → Step 3 | Wizards, onboarding, checkout |
| **Matrix / faceted** | Facets × facets | E-commerce, large catalogs with multiple attributes |
| **Hub and spoke** | Center → branches | Apps with discrete task areas; no cross-navigation needed |

### Navigation models

- **Global navigation**: persistent across all pages; holds the top-level IA. Hick's law (Hick–Hyman 1952) applies to global nav decision time — group and label to reduce cognitive choices, not to minimize item count (Miller's law is about working memory, not visible items — see `usability-principles.md` #millers-law-revised-to-cowan).
- **Local navigation**: within a section; often a sidebar or secondary nav bar.
- **Contextual navigation**: links to related content, next steps, or related tasks.
- **Breadcrumbs**: location trail — most useful in deep hierarchies.
- **Mega-menu**: when a broad shallow IA requires surfacing many options without deep navigation (Amazon pattern — 90+ links in a single view, not a Miller violation because items are on-screen, not in working memory).

### Validation methods

- **Card sorting**: participants group and label content to reveal their mental model. Run before locking labels.
- **Tree testing (reverse card sort)**: participants navigate a text-only tree to find content. Run before visual design to validate structure.
- **Sitemap ≠ IA**: a visually neat sitemap can encode wrong mental models. Validate with these methods first.

---

## USER FLOWS AND TASK FLOWS

**Source:** NN/g "User Flows vs Task Flows"; Garrett *Elements of User Experience* (5 planes).

### Notation (universal)

| Symbol | Means |
|--------|-------|
| Circle (filled) | Entry point |
| Circle (double) | Exit point |
| Rectangle | Action or screen |
| Diamond | Decision point |
| Arrow | Flow direction |

### User flow (branching)

Captures all the paths a user can take through a product to accomplish a goal. Use when:
- Multiple paths lead to the same outcome
- The flow contains decision points (if/else)
- Edge cases and error states matter for the design

Apply **Fitts's law** (Fitts 1954) at each action node: the primary action should be the largest and most accessible target. Apply **Hick's law** at each decision node: minimize options; stage choices progressively.

### Task flow (linear)

Captures the single primary path for a specific user goal. Use when:
- Designing the happy path for onboarding, checkout, or key conversion
- Communicating the intended flow to stakeholders without branching distraction

### Wireflow

A user or task flow with low-fidelity UI sketches at each node. Bridges flow design and visual design; useful for handoff to development.

### States to encode

Every flow should document: success state, error state(s), loading state, empty state, edge cases (user navigates back, session expires, network fails).

---

## PAGE SPECS

A page spec encodes what a single page does and how it connects to adjacent pages.

### Page spec template

```markdown
## [Page name]

**Purpose:** One sentence — the single job this page does for the user.

**Entry points:** Where users arrive from (nav link, email CTA, search result, another page's CTA).

**Content blocks (in order):**
1. [Block name] — [what it contains and its job]
2. [Block name] — [...]
...

**States:**
- Default: [description]
- Loading: [skeleton / spinner / optimistic UI]
- Empty: [what shows when there's no content]
- Error: [error state and recovery path]
- Success: [confirmation / next step]

**Primary CTA:** [label] → [destination]

**Exit / next page:** [where the user goes after completing the page's job]
```

Apply **Fitts's law** to CTA placement: primary CTAs should be large, in the path of the natural cursor/thumb resting position, and spatially separated from destructive actions.

---

## MARKETING PERSUASION SPINE

**Source:** Unbounce landing page research; Miller *StoryBrand* SB7 (2017); Schwartz awareness stages; Shapiro conversion equation; AIDA (1898) for historical context; PAS (problem–agitate–solve).

### Canonical section sequence

For a marketing site or long-form landing page:

| # | Section | Job it does |
|---|---------|-------------|
| 1 | **Hero** | State the value proposition clearly; primary CTA above the fold |
| 2 | **Social proof** | Logo bar, customer count, or a trusted name — reduces anxiety fast |
| 3 | **Problem / pain** | Name the problem the user has; create recognition and empathy |
| 4 | **Guide + empathy** | Position the brand as the guide who understands the problem and has solved it |
| 5 | **Solution** | Features as benefits — what changes for the user, not what the product does |
| 6 | **How it works** | Reduce friction by making the process legible (3-step sequence is canonical) |
| 7 | **Objection handling** | Answer the top 2–3 reasons someone doesn't buy |
| 8 | **Testimonials** | Social proof with specifics (metric, job title, use case) |
| 9 | **Pricing** | Anchor with a higher tier first; show the value-to-price ratio |
| 10 | **Success vision** | What life looks like after using the product — aspirational |
| 11 | **Stakes** | What happens if they don't act (mild; avoids fear-mongering) |
| 12 | **FAQ** | Long-tail objections; SEO value |
| 13 | **Final CTA** | Repeat the primary CTA with less friction (no signup, just try) |

### StoryBrand SB7 (Miller 2017)

The customer is the **hero**; the brand is the **guide**. Structure:
1. A character (the customer) has a problem.
2. They meet a guide (the brand) who has empathy and authority.
3. The guide gives them a plan.
4. The plan calls them to action.
5. Avoiding failure → achieving success.

Common error: brands position themselves as the hero. The product resolves a problem the customer already has — it doesn't impose one.

### Awareness stage matching (Schwartz ladder)

Match the opening section to the visitor's awareness:

| Awareness | They know | Lead with |
|-----------|-----------|-----------|
| Unaware | Neither problem nor solution | Hook (compelling story, surprising fact) |
| Problem-aware | They have a problem | Problem recognition and empathy |
| Solution-aware | A solution exists | Category benefit and differentiation |
| Product-aware | Your product exists | Features, proof, objection handling |
| Most-aware | Ready to buy | Offer, price, final CTA |

### Conversion equation (Shapiro)

> **Purchase = Desire − (Labor + Confusion)**

Every section either raises Desire (hero, proof, success vision, testimonials) or reduces Labor/Confusion (how-it-works, FAQ, pricing clarity, frictionless CTA). Diagnose underperforming pages by identifying which term is miscalibrated.

### Note on AIDA

AIDA (Awareness → Interest → Desire → Action, 1898) is the historical ancestor. It is a linear model that assumes orderly progression. Use the messy middle / loyalty loop for the decision journey model; use the persuasion spine for section sequence. AIDA is a useful mnemonic, not a complete model.

---

## JOURNEY.MD TEMPLATE

The JOURNEY.md companion document pairs with DESIGN.md to form a complete design spec. DESIGN.md encodes visual tokens; JOURNEY.md encodes the structural and temporal spec.

### Placement and linking

- Place JOURNEY.md at the project root alongside DESIGN.md.
- Add a line to the project's CLAUDE.md `## Design Context` block: `- **Journey spec**: JOURNEY.md`.
- Cross-link: DESIGN.md → "For IA and flow spec, see JOURNEY.md." JOURNEY.md → "For visual tokens, see DESIGN.md."

### Template

```markdown
# JOURNEY.md

<!-- The structural and temporal design spec. Pairs with DESIGN.md (visual tokens). -->

## Job

**Job story:** When [situation], I want [motivation], so I can [outcome].

**Functional job:** [the practical task]
**Emotional job:** [how the user wants to feel]
**Social job:** [how the user wants to be perceived]

**Switch interview (if conducted):**
- Push: [what was wrong with the old solution]
- Pull: [what attracted them to this product]
- Anxiety: [what slowed them down]
- Habit: [what held them to the old behavior]

**JTBD school used:** [Moesta / Ulwick / Christensen / Klement]

---

## Journey

**Actor:** [primary user persona or role]
**Scenario:** [what they're trying to accomplish]
**Scope:** [touchpoints included; current-state or future-state]

| Phase | Actions | Mindset | Emotion | Touchpoints | Opportunities |
|-------|---------|---------|---------|-------------|---------------|
| [Phase 1] | | | High/Med/Low | | |
| [Phase 2] | | | | | |

**Decision model:** [loyalty loop / messy middle / initial purchase — explain which applies]

**Emotion curve:** [describe the shape — where are the peaks/valleys and what drives them]

**Research basis:** [interview sessions, diary study, analytics — or UNGROUNDED if hypothetical]

---

## IA

**Organization scheme:** [topic / task / audience / exact (alpha/chrono/geo)]
**Structure type:** [tree / sequential / matrix-faceted / hub-and-spoke]

**Sitemap:**
```
Home
├── [Section 1]
│   ├── [Page A]
│   └── [Page B]
├── [Section 2]
└── [Section 3]
```

**Global navigation labels:** [list the top-level nav items with their labels]

**Navigation model:** [global + local / mega-menu / hub-and-spoke / etc.]

**Validation:** [card sort conducted? tree test conducted? — or NOT VALIDATED if skipped]

---

## Flows

### [Flow 1 name]
**Type:** [user flow / task flow]
**Entry:** [where the flow starts]
**Goal:** [what the user is trying to accomplish]
**Steps:**
1. [Action / screen]
2. [Decision → yes: path A / no: path B]
3. [...]
**Error states:** [what happens when X fails]
**Success state:** [end condition]

<!-- Repeat for each key flow -->

---

## Page specs

<!-- Use the page spec template for each primary page -->

### [Page name]
**Purpose:** [one sentence]
**Entry points:** [...]
**Content blocks:** [ordered list]
**States:** [default / loading / empty / error / success]
**Primary CTA:** [label → destination]
**Exit / next:** [...]

<!-- Repeat for each primary page -->

---

## Marketing spine (if applicable)

**Awareness stage of target visitor:** [unaware / problem-aware / solution-aware / product-aware / most-aware]

**Section sequence:**
1. Hero — [value prop in ≤10 words]
2. Social proof — [type: logos / count / testimonial]
3. Problem — [pain point in user's language]
4. Guide — [empathy + authority claim]
5. Solution — [features as benefits]
6. How it works — [3-step sequence]
7. Objections — [top 3]
8. Testimonials — [with specifics]
9. Pricing — [anchor tier and offer tier]
10. Success vision — [aspiration]
11. Stakes — [consequence of inaction, mild]
12. FAQ — [top questions]
13. Final CTA — [frictionless ask]

**StoryBrand role:** Customer = hero. Brand = guide. [Confirm this or note if adjusted.]
```
