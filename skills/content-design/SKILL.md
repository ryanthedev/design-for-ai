---
name: content-design
description: "Applies UX writing and content design principles to make words work as interface. Use when the question is about the words themselves — UX writing, microcopy (error messages, empty states, button/CTA copy, placeholder text, labels), voice and tone systems, content-first process, plain language, readability and scannability, onboarding and in-product messaging, or how writing decisions shape user behaviour (Podmajersky Strategic Writing for UX; Yifrah Microcopy; Richards Content Design; Redish Letting Go of the Words; Metts & Welfle Writing Is Designing). Not for: visual typography or typeface selection (use core fonts mode); information architecture and navigation labels as structure (use journey); persuasion mechanics and conversion copy (use behavioral); manipulative copy or dark patterns (use deceptive-patterns)."
user-invocable: true
argument-hint: "[copy to review or context]"
---

The words ARE the interface — not labels placed on it. Content design is the practice of making words work as design decisions: the right word, in the right place, at the right moment, for the right reader. Every content recommendation cites its source — the principle, the author, or the research it traces to.

## When this applies

Reach for this skill when the concern is the words themselves:

- Reviewing or writing **microcopy** — error messages, empty states, button/CTA labels, tooltips, placeholder text, confirmation copy, notification messages, form labels and helper text.
- Building or evaluating a **voice and tone system** — the personality the product expresses through language, and how that tone shifts by context (success vs. error vs. warning).
- Applying **content-first process** — defining what content a screen needs before wireframing; using content as the design material.
- Writing for **plain language and scannability** — sentence structure, reading level, front-loading, scannable patterns (meaningful headers, bullets, chunking).
- **Onboarding and in-product messaging** — welcome copy, coach marks, feature announcements, upgrade prompts.
- Auditing whether words create **friction or clarity** — confusing labels, jargon, vague CTAs, inconsistent terminology.

Not the visual typeface or type scale (core `fonts`), the navigation structure or IA (use `journey`), conversion mechanics and persuasion triggers (use `behavioral`), or manipulative copy patterns (use `deceptive-patterns`).

## Rules

Standing rules for every content decision. Kept separate so they don't dissolve into the workflow.

- **Cite the principle.** Every recommendation names its source: "Yifrah: error messages need cause + fix", "Redish: front-load the key information", "Richards: start with user need, not system output". No unsourced opinion.
- **The reader is in a hurry.** Redish (*Letting Go of the Words*, 2007): users scan before they read; they read for their goal, not yours. Assume 28% of words read on average. Write for the scanner, not the leisure reader.
- **Words are design material.** Metts & Welfle (*Writing Is Designing*, 2019): content design is not a last step — it IS the design. A button label is a design decision with real UX consequences, not a writing task handed off after wireframing.
- **Voice is consistent; tone is contextual.** Podmajersky (*Strategic Writing for UX*, 2019): voice is the product's personality (stable); tone adjusts to the emotional context (error copy ≠ celebration copy). Both must be intentional.
- **Error messages follow a formula.** Yifrah (*Microcopy*, 2017): state what happened → why → how to fix it. Never blame the user. Never dead-ends.
- **Plain language is faster to act on.** Redish: plain language reduces support tickets and increases task completion. It is not "dumbing down" — it is respecting the reader's time.
- **Stay generative.** Propose copy, alternatives, and improvements — not a compliance pass. The principles ground the choice; they do not substitute for it.
- **Cite down only.** This skill cites usability laws where words affect operability (e.g. Nielsen #9 error recovery). It does not cite behavioral, journey, or deceptive-patterns upward.

## Workflow

### A. Microcopy review or creation

When asked to review or write specific interface copy:

1. Read `references/microcopy-patterns.md` — load the pattern that matches the copy type (error, empty, CTA, label, onboarding).
2. Identify the **reader's state**: what just happened, what they need to do, what anxiety they may have.
3. Apply the pattern: correct formula, appropriate tone, plain language, no jargon, no dead-ends.
4. Check the **voice fit**: does it match the product's voice system (if one exists)? If not, note the inconsistency.
5. Output the revised copy with a one-line rationale citing the principle ("error message → Yifrah cause+fix formula; passive-blame removed").

### B. Voice and tone system

When building or evaluating a product's language personality:

1. Read `references/content-principles.md` — the voice/tone frameworks.
2. Identify the **product register** (professional tool vs. consumer app vs. public service) and the key emotional moments (error, success, onboarding, upgrade).
3. Define (or evaluate against) 3–5 **voice attributes** — concrete adjectives, not vague ones ("direct" not "friendly"). For each, specify the in-range and out-of-range expression.
4. Map **tone variations** to the key moments: the same voice sounds different at a success celebration vs. a payment error.
5. Produce sample copy for each moment that demonstrates the voice/tone distinction.

### C. Content-first process

When the work is earlier in the design process — defining what a screen says before wireframing:

1. Start with the user's **goal** and **mental state** at that moment (Richards: content design begins with user need, not system requirement).
2. List the **decisions** the user must make or **tasks** they must complete.
3. Write the **content** (headings, labels, instructions, feedback) before any layout work.
4. Test: can a user with no visual context understand what to do from the words alone?

## References

| Reference file | Load when |
|----------------|-----------|
| `references/content-principles.md` | Layer A — the why-engine: voice & tone frameworks, plain-language principles, scannability, content-first process, the research grounding each. The stable citeable reference for content decisions. |
| `references/microcopy-patterns.md` | Layer B — the pattern catalog: error messages, empty states, button/CTA copy, labels, tooltips, onboarding copy, in-product messaging. Includes the formulas, anti-patterns, and examples. |
