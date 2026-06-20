# Honest alternatives — ethical counterparts to each dark pattern category

**Source:** Brignull *Deceptive Patterns* (2023); Eyal *Indistractable* (2019, partial counter to *Hooked*); Monteiro *Ruined by Design* (2019); Norman *Emotional Design* (2003); WCAG 2.2; Tesler's law (`skills/usability/references/usability-principles.md`); the behavioral skill (`skills/behavioral/`) for the positive framework of each mechanism.

**Purpose:** Every dark pattern has an honest version that pursues the same business goal without exploiting the user. This file is the constructive layer of the deceptive-patterns skill. An audit that only names the pattern without the alternative is ethics washing (Monteiro: designers have responsibility for what they design, not just the intent behind it).

---

## Table of Contents

1. [The principle: same goal, honest means](#the-principle-same-goal-honest-means)
2. [Honest alternatives by category](#honest-alternatives-by-category)
3. [Design principles for honest persuasion](#design-principles-for-honest-persuasion)
4. [When you disagree with the business goal](#when-you-disagree-with-the-business-goal)

---

## THE PRINCIPLE: SAME GOAL, HONEST MEANS

Every dark pattern is a shortcut around a real problem: the company needs users to take an action, and the honest version of that action isn't compelling enough without manipulation. The alternative is not to abandon the business goal — it is to solve the underlying problem:

- If users don't upgrade, the problem is that the value proposition isn't clear enough — not that the cancel button needs to be hidden.
- If users don't sign up for emails, the problem is that the offer isn't valuable enough — not that consent needs to be pre-selected.
- If users cancel, the problem is that the product isn't meeting their needs — not that cancellation needs to be made painful.

The `behavioral` skill covers the positive framework: how Cialdini's principles, the Fogg model, and Norman's emotional levels are used honestly. Load it when the team needs to understand the mechanism they're reaching for — this file covers only the honest design expression of each.

---

## HONEST ALTERNATIVES BY CATEGORY

### 1. Urgency and scarcity → Real scarcity, transparent urgency

| Dark version | Honest alternative | Principle |
|---|---|---|
| Countdown timer that resets on reload | Countdown to a real deadline (sale end, event, waitlist close) — verified and non-resetting | Transparency; loss aversion used honestly when the scarcity is real |
| "Only 2 left!" with no real inventory constraint | Actual low-stock signals tied to real inventory; or no stock signal if inventory isn't genuinely limited | Accuracy; reserve scarcity signals for real scarcity |
| Perpetual "sale" with inflated original | Clear original price history; or don't use sale framing if the product is always at that price | Honest pricing; FTC deceptive pricing standard |
| Real-time "10 people viewing this" (inflated) | Omit the signal if it can't be accurate; or show it only when demand data is real and verified | Social proof used only when accurate (Cialdini: social proof must be genuine) |

**Underlying business goal:** Drive decisions before the user walks away.
**Honest solution:** Make the real value proposition compelling enough that urgency is a supportive signal rather than the reason to act.

---

### 2. Misdirection → Clear visual hierarchy, honest framing

| Dark version | Honest alternative | Principle |
|---|---|---|
| Confirmshaming ("No thanks, I don't want to save money") | Neutral decline label ("No thanks" or "Not now") — the decline option has the same emotional register as the accept | Gestalt: all same-level options share the same visual weight until the user decides |
| Accept button prominent, reject/customize hidden | Visible and equivalently accessible accept and reject/customize options; GDPR: "Reject all" must be as easy as "Accept all" | Nielsen #3 (user control); GDPR consent validity |
| Disguised ads styled as organic content | Clear "Sponsored" or "Ad" label in the same visual treatment as the content, not in smaller or lower-contrast type | Honesty; FTC Endorsement Guides |
| Bait-and-switch | Deliver what was advertised; if unavailable, say so and offer alternatives without pressure | Basic commercial honesty |

**Underlying business goal:** Maximize accepted clicks / consented conversions.
**Honest solution:** The value offered is clear enough that the accept option wins without obscuring the decline.

---

### 3. Hidden information → Full-price transparency, proactive disclosure

| Dark version | Honest alternative | Principle |
|---|---|---|
| Hidden costs added at checkout | Show all fees (shipping, taxes, service charges) as early as possible in the flow, ideally on the product page | Tesler's law (usability-principles.md §Tesler): absorb complexity into the product, not push it onto the user at the last moment |
| Drip pricing | Show total price in every touchpoint; if fees vary, show a range or an estimate | EU Consumer Rights Directive: total price must be clear |
| Hidden subscription auto-renewal | Show the renewal date and amount at sign-up; send an email reminder 7 days before renewal; make cancellation self-serve | FTC click-to-cancel: cancellation must be at least as easy as sign-up |
| Privacy zuckering | Simple privacy controls with a clear summary of what data is collected and why; "Reject all" as prominent as "Accept all" | GDPR: consent must be freely given, informed, and specific |

**Underlying business goal:** Close the conversion before price sensitivity triggers abandonment.
**Honest solution:** The product is worth the real price; transparent pricing attracts users with correct expectations, reducing churn.

---

### 4. Friction asymmetry → Symmetric effort, respectful exits

| Dark version | Honest alternative | Principle |
|---|---|---|
| Roach motel (cancellation requires a phone call) | Self-serve cancellation in account settings, reachable in ≤3 clicks | FTC click-to-cancel: as easy as sign-up; Nielsen #3 (user control and freedom) |
| Guilt-screen cancellation flow | Offer one retention screen with a genuine incentive (discount, pause option) — then honor the cancellation | One retention offer is honest; a gauntlet of re-confirmation screens is not |
| Forced continuity (trial charges without notice) | Surface the trial end date at sign-up; send a reminder email at 7 and 1 days before; make the conversion opt-in | Informed consent; FTC click-to-cancel rule |
| Obstruction of a free feature to push paid | Features described as free are usable without friction; upsell is a separate, clearly labeled path | Product integrity; Jakob's law (usability-principles.md) — hold conventions users rely on |

**Underlying business goal:** Reduce churn.
**Honest solution:** Retention comes from product value, not from making the exit painful. Satisfied users who can leave easily are more likely to return.

---

### 5. Social manipulation → Accurate, disclosed social proof

| Dark version | Honest alternative | Principle |
|---|---|---|
| Fake reviews / inflated purchase counts | Real reviews with verified purchase labels; real counts (even if smaller); no fabricated testimonials | FTC Endorsement Guides 2023: disclose material connections; AI-generated reviews require disclosure |
| Activity notifications (unverified) | Omit activity notifications if the data cannot be verified in real time; or use aggregated, accurate data ("1,200 purchases this week" with a link to verified data) | Cialdini (behavioral): social proof is only effective because people believe it's real; fabricated proof is fraud |
| False authority (self-awarded badges) | Third-party validated awards; or no award claim if no third-party validation exists | Honesty |
| Unsourced social norm nudges | Cite the source and methodology for any statistical claim ("73% of customers choose annual — based on Q1 2025 purchase data") | Accuracy; Cialdini: authority and social proof require genuine signals to be ethical |

**Underlying business goal:** Build trust and reduce decision uncertainty.
**Honest solution:** Real social proof at real scale. If real evidence isn't compelling enough, the product needs to improve — not the reviews.

---

### 6. Default exploitation → User-beneficial defaults, transparent choice

| Dark version | Honest alternative | Principle |
|---|---|---|
| Pre-selected add-ons at checkout | All add-ons unchecked by default; each item requires positive user selection | Tesler's law: absorb complexity, but defaults must represent what the user would choose, not what maximizes revenue |
| Marketing opt-in by default | Marketing consent is opt-in; the sign-up flow completes without it | GDPR Article 7: consent must be active |
| Privacy-hostile defaults | Minimum-data defaults; additional data sharing is opt-in | GDPR data minimisation principle |
| Interface interference (color hierarchy favors the company's choice) | Equivalent visual treatment for all choices at the same decision level; the user's "recommended" path may be highlighted, but the alternative must be visible and accessible | Nielsen #3 (user control); WCAG 1.4.3 (distinguishable) |

**Underlying business goal:** Maximize uptake of high-margin features.
**Honest solution:** Products that earn their upsell by being genuinely better than the base tier. Defaults that serve users build trust; defaults that exploit them create resentment.

---

### 7. Language manipulation → Plain language, unambiguous consent

| Dark version | Honest alternative | Principle |
|---|---|---|
| Trick questions (double negatives in consent) | Single-sentence, plain-language consent statement with a single Yes/No or toggle; test with a plain-language reading grade | Redish (content-design): plain language reduces errors and increases correct action; GDPR: consent in plain language |
| Confirmshaming labels | Neutral label that accurately describes the action being declined | Respect the user's right to decline without shame |
| Misleading terminology ("unlimited" with caps) | Name the plan honestly; if it has caps, say so; "essentials", "pro", "scale" rather than "unlimited" | FTC deceptive advertising standards |
| Subscription described with purchase language | Use "subscribe", "start plan", "begin membership"; reserve "buy" for one-time purchases | Accuracy; helps users understand the commitment |

**Underlying business goal:** Increase consent rate, reduce abandonment.
**Honest solution:** Users who understand what they're agreeing to are more likely to remain customers; consent obtained via confusion increases chargebacks and churn.

---

### 8. Addiction traps → Respectful engagement design

| Dark version | Honest alternative | Principle |
|---|---|---|
| Infinite scroll with no stopping point | Optional pagination or "load more" with a "you're up to date" state; show estimated time remaining in feed | Peak-end rule (`usability-principles.md` §peak-end-rule): a clear, satisfying end is part of the experience |
| Variable reward (slot-machine refresh) | Predictable, reliable content refresh; engagement earned by content quality, not psychological exploit | Eyal *Indistractable*: the honest hook is an internal trigger meeting a genuine need, not manufactured craving |
| Streak mechanics beyond motivational utility | Streak mechanics with reasonable grace periods and explicit "take a break" affordances; stakes that don't punish missing a day catastrophically | Goal-gradient effect (`usability-principles.md` §goal-gradient-effect) is honest when the goal serves the user; a streak that creates anxiety doesn't |
| Autoplay without user initiation | Autoplay requires user opt-in; or provide a clear and prominent pause/stop; default to off | Nielsen #3 (user control and freedom); UK Children's Code: autoplay off by default for under-18 |
| Notification spam | Notification preferences surfaced at sign-up; notifications sent for genuinely user-relevant events; frequency caps; unsubscribe accessible in the notification itself | Zeigarnik effect (`usability-principles.md` §zeigarnik-effect) is honest when the incomplete task is genuinely the user's — not manufactured by the product |

**Underlying business goal:** Maximize session length and return rate.
**Honest solution:** Respectful engagement design produces users who return by choice. Products that manufacture compulsion face regulation (UK Children's Code, DSA) and user backlash when the manipulation is recognized.

---

### 9. Pricing opacity → Transparent, comparable pricing

| Dark version | Honest alternative | Principle |
|---|---|---|
| Decoy tier (exists only to make premium look good) | Each tier has a genuine use case; if a tier only exists to frame another, remove it | Ariely: decoy effect works precisely because it subverts genuine comparison; remove the manipulation trigger |
| Anchoring with inflated original price | Show original price only if it was genuinely charged at that price; use date-ranges for sale claims | FTC Guides Against Deceptive Pricing |
| Per-day pricing without annual total | Show the billing cycle and total amount at the tier, not only the per-day breakdown | EU Consumer Rights Directive; cognitive arithmetic is Tesler's complexity pushed onto the user |
| Misleading comparison tables | Cite sources for competitor feature claims; test claims regularly; omit competitor columns if they can't be kept accurate | Accuracy; reputational risk when claims are falsified |

**Underlying business goal:** Make pricing feel lower or fairer than it is.
**Honest solution:** Transparent pricing attracts users who can afford the product; users who feel deceived by pricing become the loudest detractors.

---

## DESIGN PRINCIPLES FOR HONEST PERSUASION

These principles distinguish persuasion (ethical) from manipulation (not):

1. **Transparency**: the user knows they're being influenced and what is being asked.
2. **Accuracy**: all claims (scarcity, social proof, price, authority) are true and verifiable.
3. **Symmetry**: the effort to accept and the effort to decline are equivalent at the decision point.
4. **User interest**: the default, the recommended option, and the ease of use reflect what is good for the user — not only what is good for the company.
5. **Reversibility**: actions taken under persuasion can be undone without disproportionate cost.
6. **Voluntary**: no manufactured pressure (false urgency, false scarcity, manufactured anxiety) substitutes for genuine value.

These six principles are the ethical test. A persuasion mechanism that passes all six is using the `behavioral` skill's toolkit honestly. One that fails any of them is a deceptive pattern.

---

## WHEN YOU DISAGREE WITH THE BUSINESS GOAL

Monteiro (*Ruined by Design*): designers bear responsibility for what they design, not just for following instructions. If the honest alternative cannot achieve the business goal — if the business model requires deception to function — that is information about the business model, not a design problem to solve.

The designer's role is:
1. Surface the pattern clearly (name it, classify it, rate the harm).
2. Propose the honest alternative.
3. Make the regulatory and reputational exposure explicit.
4. Escalate the decision to someone with organizational authority — the designer's job is not to absorb the ethical decision alone.

A design team that cannot get deceptive patterns removed after escalating clearly has an organizational problem, not a design problem.
