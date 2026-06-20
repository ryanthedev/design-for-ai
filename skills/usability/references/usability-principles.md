# Usability principles — the why-engine

**Source:** usability foundations research (Gestalt 1910s–20s; Norman 1988/2013; Nielsen 1994; Shneiderman 1986; Laws of UX / Yablonski 2024; WCAG 2.2 2023). Layer A of the two-layer catalog: these principles do not draw UI — they **adjudicate** it. Cite them to ground a recommendation, then recommend. This is the stable, citeable reference other pillars link into (anchors below are stable).

---

## Table of Contents

1. [Key definitions](#key-definitions)
2. [Gestalt perception laws](#gestalt-perception-laws)
3. [Cognitive & UX laws](#cognitive--ux-laws)
4. [Nielsen's 10 heuristics](#nielsens-10-heuristics)
5. [Shneiderman's 8 golden rules](#shneidermans-8-golden-rules)
6. [Heuristic evaluation method](#heuristic-evaluation-method)
7. [Norman's foundations](#normans-foundations)
8. [Cognitive load & attention](#cognitive-load--attention)
9. [Accessibility foundations](#accessibility-foundations)
10. [Critical caveats](#critical-caveats)

---

## KEY DEFINITIONS

> **Principle (Layer A)**: a perception/cognition law or design heuristic that *adjudicates* an interface — it explains why a choice is right or wrong. It is the arbiter that lets you offer pattern options, not a box to tick.

> **Pattern (Layer B)**: a recurring UI solution (see `ui-patterns.md`). Principles *select* among patterns via the bridge.

> **Heuristic**: a rule of thumb that finds *likely* problems, not guaranteed ones. Nielsen's 10 and Shneiderman's 8 are heuristic sets.

> **Affordance vs signifier (Norman)**: an affordance is a possible action a thing offers; a signifier is the *perceivable cue* that advertises it. Signifiers are "more important to designers than affordances" — an affordance no one perceives might as well not exist.

> **Slip vs mistake (Norman)**: a slip is a right-intention/wrong-action error (autopilot); a mistake is a wrong-mental-model error. They need different fixes (see Norman's foundations).

---

## Gestalt perception laws

Pre-attentive grouping laws (Wertheimer/Koffka/Köhler, 1910s–20s) — how the eye groups elements *before* conscious thought. Distinct from the cognitive laws below.

| Law | What it says | Use it to |
|-----|--------------|-----------|
| Proximity | Near elements read as a group | Group related fields/actions by spacing, not boxes |
| Similarity | Like-looking elements read as related | Make same-role controls share shape/color |
| Common region | A shared boundary groups elements | A card/panel binds its contents |
| Uniform connectedness | Visually connected elements group strongest | A connecting line/background beats mere proximity |
| Closure | The eye completes implied shapes | Lets you imply structure without drawing every border |
| Continuity | Aligned elements read as a continuous path | Align list/grid items to guide the eye |
| Common fate | Elements moving together read as a group | Co-animate related items |
| Figure/ground | The eye separates subject from background | Establish what is foreground vs context |
| Prägnanz / focal point | The eye seeks the simplest reading and a focal point | Give one clear focal point per view |

**Grouping strength order** (cite when two laws conflict): uniform-connectedness > common-region > proximity > similarity > continuation. A connecting element overrides proximity; proximity overrides similarity.

## Cognitive & UX laws

Tendencies of human cognition under conditions (Laws of UX / Yablonski 2024, 2nd ed). **Not physics — see [Critical caveats](#critical-caveats).** Each law has a stable `###` anchor so a single law can be cited precisely.

### Fitts's law
(Fitts, 1954) Time to acquire a target grows with distance and shrinks with size. → Make primary targets big and close; put frequent actions where the cursor/thumb already is (bottom tab bar on phones, screen edges/corners are "infinitely deep").

### Hick's law
(Hick–Hyman, 1952) Decision time rises with the log of the number of choices. → Reduce/stage options for *time-critical or unfamiliar* decisions; group and progressively disclose. (Does not mean "always fewer links" — see Miller caveat.)

### Miller's law (revised to Cowan)
(Miller, 1956; revised Cowan ~2001) Working memory holds ~4±1 chunks, not 7±2. → Chunk information; use wizards/grouping when the user must *hold* items in memory. **Not** a cap on visible on-screen menu items.

### Jakob's law
(Nielsen, 2000) Users spend most time on *other* sites and expect yours to work the same. → Hold conventional interaction primitives (nav, controls); innovate on the core value-prop, not the plumbing.

### Tesler's law (conservation of complexity)
(Tesler) Every system has irreducible complexity; the question is who absorbs it. → Absorb it into the product (smart defaults, parsing) rather than pushing it onto the user.

### Postel's law (robustness)
(Postel) Be liberal in what you accept, conservative in what you do. → Forgiving input formats (accept spaces in card numbers); strict, validated output.

### Doherty threshold
(Doherty & Thadani, 1982) Productivity surges when system response is under ~400ms. → Keep interactions snappy; use optimistic UI / skeletons to stay under the threshold perceptually.

### Peak-end rule
(Kahneman) People judge an experience by its peak and its end, not the average. → Invest in the emotional peak and a strong finish (celebratory empty/success states).

### Serial position effect
(Ebbinghaus) First (primacy) and last (recency) items are best remembered. → Put the most important nav/list items at the ends.

### Von Restorff (isolation) effect
The item that differs is remembered. → Make the one thing that matters (primary CTA) visually distinct — used sparingly.

### Zeigarnik effect
Incomplete tasks stay in memory. → Progress indicators and checklists leverage the pull to finish; goal-gradient amplifies it.

### Goal-gradient effect
(Hull) Motivation increases approaching a goal. → Show progress and artificial head-starts (pre-filled progress) to drive completion.

### Aesthetic-usability effect
(Kurosu & Kashimura, 1995) Users *perceive* attractive designs as more usable — and it **masks real defects in testing**. → Fix usability first, then polish (see caveats). + Choice overload / paradox of choice (Schwartz): too many options reduces satisfaction and action.

## Nielsen's 10 heuristics

(Nielsen, 1994 — NN/g) The canonical heuristic set; the spine of heuristic evaluation.

1. **Visibility of system status** — keep users informed with timely feedback.
2. **Match between system and the real world** — speak the user's language and conventions.
3. **User control and freedom** — provide undo/redo and clearly marked exits.
4. **Consistency and standards** — follow platform and internal conventions (Jakob).
5. **Error prevention** — prevent problems before they happen (constraints, confirmation).
6. **Recognition rather than recall** — show options; minimize memory load.
7. **Flexibility and efficiency of use** — accelerators (shortcuts) for experts.
8. **Aesthetic and minimalist design** — no irrelevant information competing for attention.
9. **Help users recognize, diagnose, recover from errors** — plain-language messages with a way out.
10. **Help and documentation** — searchable, task-focused, when needed.

## Shneiderman's 8 golden rules

(Shneiderman, 1986) Complements Nielsen at the interaction level: (1) strive for consistency; (2) cater to universal usability (novice→expert shortcuts); (3) offer informative feedback; (4) design dialogs to yield closure; (5) prevent errors; (6) permit easy reversal of actions; (7) keep users in control (internal locus of control); (8) reduce short-term memory load.

## Heuristic evaluation method

(Nielsen & Molich) The method behind the `audit` mode:

1. **3–5 evaluators** independently inspect the interface against the heuristics (the evaluator effect means one evaluator misses most problems; 5 catch ~75%).
2. Each logs violations, naming the heuristic and the principle behind it.
3. **Severity rating 0–4** per problem: 0 = not a usability problem · 1 = cosmetic · 2 = minor · 3 = major · 4 = catastrophe. Severity ≈ frequency × impact × persistence.
4. Aggregate, sort by severity, recommend fixes.

It finds *likely* problems, not real-world frequency — a complement to user testing, never a replacement.

## Norman's foundations

(*The Design of Everyday Things*, Norman, 1988/2013) The foundation the heuristics rest on.

- **Six principles**: affordances · **signifiers** (the perceivable subset — more important to designers than affordances) · mapping (natural spatial correspondence between control and effect) · feedback (immediate, informative) · constraints (physical / logical / semantic / cultural — they prevent error) · conceptual models (the user's mental model of how it works).
- **Gulf of execution** (how do I do this?) and **gulf of evaluation** (what happened?) — good design bridges both; the **7 stages of action** (goal → plan → specify → perform → perceive → interpret → compare) map where a design breaks down.
- **Human error**: **slips** (right intention, wrong action — autopilot; fix with constraints, defaults, undo) vs **mistakes** (wrong mental model; fix with research, conventions, better conceptual models). "Norman doors" are signifier/mapping failures.

## Cognitive load & attention

- **Three load types** (Sweller): intrinsic (task difficulty), extraneous (how it's presented — minimize this), germane (schema-building). Cut extraneous load.
- **Recognition over recall** (Nielsen #6): show options rather than make users remember them.
- **Chunking**: group information into meaningful units to fit working memory (Miller/Cowan).
- **Signal-to-noise / data-ink** (Tufte): maximize the ratio of meaningful ink to decoration.
- **Attention limits**: selective attention, banner blindness, change blindness — users miss what they aren't looking for; don't rely on unrequested attention.
- **Progressive disclosure**: reveal complexity only as needed (accordion, tabs, conditional fields).
- **Scanning patterns**: **layer-cake** (heading-to-heading — the *best*, design for it) · F-pattern (a *symptom* of unscannable content, not a goal) · spotted · commitment · Z-pattern (sparse pages). Design content so the layer-cake works: meaningful headings, front-loaded text.

## Accessibility foundations

- **WCAG 2.2 POUR** (2023, current): **P**erceivable · **O**perable · **U**nderstandable · **R**obust. Levels A / **AA** (the legal/target level: contrast 4.5:1 body, 24×24px target minimum new in 2.2) / AAA.
- **Inclusive design** (Microsoft): recognize exclusion · learn from diversity · solve for one, extend to many. The **curb-cut effect** — fixes for one group benefit everyone.
- **Persona spectrum**: disability is permanent / temporary / situational (one-armed / arm-in-a-cast / holding-a-baby all need one-handed use).
- **Semantic HTML before ARIA** — native elements carry built-in semantics and behavior; ARIA is a patch, not a default.

## Critical caveats

The honest-citation layer. Knowing *when a principle does not apply* is part of citing it.

| Caveat | What it corrects |
|--------|------------------|
| **UX laws are not physics** | They are tendencies under conditions, often cited to win arguments. Yablonski himself frames them as tendencies. Cite to ground, then judge the context. |
| **Miller's 7±2 is the #1 misuse** | It is about working *memory*, not visible menu items. On-screen items carry no memory load; broad-shallow navigation often beats deep-narrow (Amazon's 90+ links). Miller and Tufte both disavowed the menu-cap reading. |
| **Aesthetic-usability is a trap** | Pretty UI inflates subjective scores and *masks* real defects in testing → fix usability first, then polish. Order matters. |
| **Heuristic eval ≠ user testing** | Evaluator effect, low inter-rater reliability, unreliable severity; finds likely problems, not real frequency. A complement only. |
| **Jakob's law gets weaponized** | A cherry-picked single example is not a mental model. Copying Google/Apple ignores their exposure margin. Hold nav/interaction primitives; you may break the core value-prop. |
| **Pattern cargo-culting** | Form without function — a hamburger on a 2-section app, infinite scroll in an enterprise dashboard. |
| **WCAG AA ≠ usable** | Compliance can pass while the thing is unusable; automated tools catch ~35%. Test with real assistive-technology users. |

**When to break a rule:** a genuinely new category (no mental model exists yet) · a harmful legacy convention · brand differentiation worth a 1-exposure learning cost · deep daily engagement that absorbs the learning cost · when the "convention" is itself cargo-culted.
