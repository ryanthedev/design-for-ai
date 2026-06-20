---
name: deceptive-patterns
description: "Detects, classifies, and proposes honest alternatives to dark patterns (deceptive design patterns) — manipulative techniques that exploit user psychology against user intent. Use when asking whether a checkout flow, pricing page, unsubscribe flow, subscription process, or cookie banner is deceptive or manipulative, or for an ethical design review. Pattern types: false scarcity, fake urgency, countdown timers, roach motels, confirmshaming, trick questions, hidden costs, drip pricing, friction asymmetry, fake reviews, bait-and-switch, disguised ads, manipulative cookie consent. Also covers regulatory exposure (GDPR, EU DSA, FTC click-to-cancel, Digital Fairness Act) (Brignull Deceptive Patterns; Nodder Evil by Design; Monteiro Ruined by Design). Not for: visual aesthetic tells like glassmorphism or Inter defaults (use core audit/ai-tells); legitimate persuasion, engagement, or retention design (use behavioral); the flow or journey a user moves through (use journey); accessibility failures (use usability)."
user-invocable: true
argument-hint: "[flow, feature, or pattern to audit]"
---

Deceptive patterns are design choices that use the product's power against its own users — exploiting the same psychological mechanisms that honest design employs, but in service of the company's goals at the user's expense. The work here is identification, classification, severity assessment, regulatory exposure, and the honest alternative. Every finding cites its pattern category and, where relevant, the mechanism being exploited.

Cross-reference: `skills/design-for-ai/references/ai-tells.md` is the structural twin — a ban-list of aesthetic tells (visual patterns that signal AI-generated defaults). This skill is the ethical twin — a ban-list of manipulation tells. Same format, different domain.

## When this applies

- **Auditing a flow** for deceptive patterns: sign-up, checkout, subscription, cancellation, cookie consent, notification opt-in, pricing pages, free-trial-to-paid conversions.
- **Reviewing a specific feature**: a countdown timer, a social-proof block, a dark default, a friction-asymmetric cancel flow.
- **Ethical design review**: a product team wants to know whether their engagement mechanics cross the line from persuasion into manipulation.
- **Regulatory exposure check**: which patterns are explicitly named in EU DSA, FTC guidance, or the forthcoming EU Digital Fairness Act.
- **Proposing the honest alternative**: every dark pattern has a mechanism; `references/honest-alternatives.md` documents what ethical design looks like for each category.

Not aesthetic tells (glassmorphism, Inter defaults, cyan-on-dark — those are `ai-tells` in the core skill), not legitimate persuasion mechanics (use `behavioral`), not accessibility audits (use `usability`).

## Rules

- **Cite the pattern category.** Every finding names its Brignull category or sub-type, not just "this feels manipulative". Vague ethics opinions without structural identification are not actionable.
- **Name the mechanism being exploited.** Deceptive patterns work because they borrow real psychology (scarcity, social proof, loss aversion, sunk-cost, completion pull). Name it — this is what connects to `behavioral` as the honest counterpart.
- **Always provide the honest alternative.** A ban-list alone is ethics washing. The `references/honest-alternatives.md` file documents what the pattern should look like when the same goal is pursued honestly.
- **Rate severity by user harm.** Not all dark patterns are equally bad: a confusing toggle is not the same as a roach motel subscription trap. Rate by: reversibility of harm, financial exposure, vulnerability of user group, and visibility of the manipulation.
- **Note regulatory exposure.** EU DSA (2023, active), FTC click-to-cancel enforcement (history/current status), EU Digital Fairness Act (expected Q4 2026): some patterns carry legal risk, not just ethical risk.
- **Cite down only.** This skill cites `usability-principles.md` where the exploitation mechanism is a cognitive or perception law. It does not cite journey, content-design, or data-viz upward.
- **Behavioral is the honest counterpart.** The same mechanisms this skill flags as exploitation are described in `behavioral` as ethical engagement design. Point there for the constructive alternative when the team wants to understand the mechanism, not just avoid the dark version.

## Procedure

### A. Pattern audit

When asked to review a flow, page, or feature:

1. Load `references/dark-patterns.md` — the full taxonomy.
2. Walk each of the 9 pattern categories against the element under review.
3. For each match: name the **pattern type**, describe **the specific instance**, name **the mechanism exploited**, rate **severity** (Low / Medium / High / Critical), and note **regulatory exposure** if applicable.
4. Load `references/honest-alternatives.md` — output the **honest alternative** for each finding.
5. Return a findings table: `Severity | Pattern category | Instance | Mechanism | Honest alternative`.

### B. Single-pattern identification

When asked whether a specific feature is a dark pattern:

1. Check the 9 categories in `references/dark-patterns.md` against the described feature.
2. If it matches: identify the sub-type, explain the mechanism, rate severity, note regulatory exposure, propose the honest alternative.
3. If it does not match: say so clearly — suspicion of manipulation is not sufficient; the structural fit to a named pattern is the bar.

### C. Ethical design review (new feature design)

When helping design a feature that involves persuasion, urgency, social proof, defaults, or monetization:

1. Load `references/honest-alternatives.md` — use it as the positive design guide.
2. For each persuasion mechanism the feature uses, check whether the implementation stays in the honest range or crosses into manipulation.
3. Flag any mechanisms that create asymmetric friction (cancellation harder than sign-up), false urgency, false scarcity, or social proof inflation — those cross the line regardless of intent.
4. Recommend `behavioral` for the positive framework for achieving the same business goal ethically.

## References

| Reference file | Load when |
|----------------|-----------|
| `references/dark-patterns.md` | The taxonomy: 9 categories, ~18 sub-types, detection signals, severity indicators, regulatory exposure, and the ai-tells cross-reference. The ban-list. |
| `references/honest-alternatives.md` | The constructive layer: per-category honest design alternatives, the ethical version of each mechanism, and the usability principles that ground honest defaults. |
