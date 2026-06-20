---
name: behavioral
description: "Applies behavioral psychology and emotional design principles to understand why users act, return, and convert — and to design honest engagement. Use when the question is about persuasion triggers (Cialdini's six principles), the Fogg behavior model (motivation × ability × prompt), habit loop design (Eyal's Hook model: trigger→action→reward→investment), Norman's three emotional levels (visceral/behavioral/reflective emotional design), choice architecture, motivation gap, variable reward, emotional resonance, user engagement, retention mechanics, or the psychological mechanisms behind conversion and habit (Cialdini Influence; Eyal Hooked/Indistractable; Norman Emotional Design; Weinschenk 100 Things Every Designer Needs to Know About People). Not for: the dark or manipulative version of these mechanics (use deceptive-patterns); the sequence a user moves through over time (use journey); visual mood and aesthetic feel (use core design)."
user-invocable: true
argument-hint: "[feature, flow, or engagement goal]"
---

Behavioral design is the practice of applying what psychology knows about human motivation, decision-making, and habit to create products that genuinely earn engagement. The mechanisms here — social proof, commitment, variable reward, goal gradients, visceral appeal — are the same tools the `deceptive-patterns` skill flags when weaponized. The difference is intent, transparency, and whether the design serves the user's own goals or overrides them.

Load `deceptive-patterns` as the ethical guardrail when the work involves conversion optimization, sign-up flows, subscription design, or any engagement mechanic where the line between persuasion and manipulation is a live question.

## When this applies

- Understanding **why users don't complete** a flow — identifying the motivation, ability, or prompt gap using the Fogg behavior model.
- Designing for **habit formation** — applying the Hook model's four phases honestly (trigger connected to a genuine user need, variable reward that delivers real value, investment that makes the product more useful over time).
- Applying **Cialdini's principles** (reciprocity, commitment/consistency, social proof, authority, liking, scarcity, unity) to a sign-up flow, onboarding, referral mechanic, or trust-building element.
- Designing for **emotional resonance** — using Norman's three levels (visceral: immediate sensory response; behavioral: ease and effectiveness of use; reflective: meaning, identity, and story) to shape how a product feels, not just how it functions.
- Building **choice architecture** — reducing decision paralysis, sequencing choices, using anchoring and defaults honestly.
- **Retention and re-engagement** — understanding when a product earns return visits vs. manufactures compulsion.

Not the dark version of any of these (use `deceptive-patterns`), not the sequence through time / IA / funnel (use `journey`), not the visual mood or aesthetic DNA (use core `design`).

## Rules

- **Cite the principle.** Every recommendation names its source: "Cialdini: reciprocity (1984)", "Fogg behavior model: ability variable", "Eyal: investment phase (Hooked)", "Norman: reflective level (Emotional Design)". No unsourced claims about human psychology.
- **Honest mechanism, honest application.** The behavioral mechanisms are real and powerful — they are ethically neutral tools. The application is what has a moral valence. Every recommendation here uses the mechanism to serve the user's own goals (completing a task they want to complete, returning because the product is genuinely valuable, building a habit aligned with their intentions).
- **The dark version is documented in `deceptive-patterns`.** If an engagement mechanic uses real psychology but against the user's interest — manufactured scarcity, manufactured urgency, variable reward calibrated to create compulsion rather than deliver value — that is a deceptive pattern. Flag it, point there.
- **Cite usability laws where they overlap.** The peak-end rule, Zeigarnik effect, goal-gradient effect, Hick's law, and aesthetic-usability effect from `usability-principles.md` are relevant and cited directly — they are where behavioral science and usability science intersect.
- **Distinguish engagement from compulsion.** Eyal's *Indistractable* (2019) is his partial counter to *Hooked*: the honest hook connects to an internal trigger the user already has (a genuine need, a real goal); the dark hook manufactures an external trigger and creates anxiety to drive the return. The test: does the user feel good about using the product when they reflect on it (Norman: reflective level)?
- **Cite down only.** This skill cites `usability-principles.md` (down) where perception or cognitive laws ground the behavioral claim. It does not cite journey, content-design, data-viz, or deceptive-patterns upward — `deceptive-patterns` is a peer pointer, not a dependency.
- **Stay generative.** Propose specific design expressions of the principle — don't degrade into a list of psychological theories. The principles ground the recommendation; they don't replace it.

## Procedure

### A. Diagnosing why users aren't acting (Fogg model)

When a flow has low completion, sign-up, or conversion:

1. Load `references/behavioral-principles.md` — the Fogg behavior model section.
2. Identify which variable is the constraint:
   - **Motivation low**: the user doesn't want the outcome enough. Fix: make the benefit clear, appeal to the right motivation axis (pleasure/pain, hope/fear, social acceptance/rejection).
   - **Ability low**: the user can't easily do the action. Fix: reduce steps, simplify, use progressive disclosure (Tesler's law from `usability-principles.md`: absorb complexity into the product).
   - **Prompt missing or poorly timed**: the user isn't being asked at the right moment. Fix: trigger at the moment of highest motivation (post-success, at goal achievement, after a positive experience).
3. Recommend a specific design change for the constrained variable; cite the model and the relevant axis.

### B. Habit loop design (Hook model)

When designing for re-engagement, retention, or a product people use daily:

1. Load `references/behavioral-principles.md` — the Hook model section.
2. Map the four phases to the current product state:
   - **Trigger**: does the user have an internal trigger (a genuine need or discomfort that the product resolves)? If not, is the external trigger (notification, email) connected to a real need or manufactured?
   - **Action**: is the action in the path of least resistance (simplest behavior in anticipation of a reward)?
   - **Variable reward**: does the reward genuinely vary and genuinely deliver value? Or is it manufactured uncertainty calibrated for compulsion?
   - **Investment**: does using the product make it more useful over time (data, preferences, connections), earning the next trigger?
3. If any phase looks manipulative (external trigger without internal connection, manufactured variable reward), flag it and point to `deceptive-patterns`.

### C. Cialdini application

When applying a specific influence principle to a design element:

1. Load `references/behavioral-principles.md` — the Cialdini section.
2. Name the principle and its mechanism.
3. Identify the honest expression: social proof that is real and disclosed; reciprocity that delivers genuine value before asking; scarcity that reflects real constraints.
4. Check against the deceptive version: is the scarcity manufactured? Is the social proof fabricated? If yes, flag and redirect to `deceptive-patterns`.

### D. Emotional design (Norman levels)

When designing for how the product feels, not just how it functions:

1. Load `references/behavioral-principles.md` — the Norman emotional levels section.
2. Identify which level is under-served:
   - **Visceral**: immediate sensory response (first impression, aesthetics, motion). Connects to the core `design` skill's DNA work; the behavioral angle is the emotional valence, not the visual craft.
   - **Behavioral**: the pleasure of use — ease, feedback, control. Connects to the `usability` skill's operability work.
   - **Reflective**: meaning, identity, story — why the user feels proud to use this product, or why they associate their identity with it.
3. Note: the aesthetic-usability effect (`usability-principles.md` §aesthetic-usability-effect) means visceral appeal inflates perceived usability — fix behavioral-level usability first, then invest in visceral and reflective.

## References

| Reference file | Load when |
|----------------|-----------|
| `references/behavioral-principles.md` | The mechanism catalog: Fogg behavior model, Hook model (4 phases), Cialdini's seven principles, Norman's three emotional levels, motivation taxonomy, choice architecture. The why-engine for engagement and conversion design. |
| `references/ethical-application.md` | The honest-use layer: how each mechanism stays in the ethical range; the guardrail citations to deceptive-patterns; the usability law citations (peak-end, Zeigarnik, goal-gradient, Hick's law) where behavioral and usability science intersect; the test for compulsion vs. engagement. |
