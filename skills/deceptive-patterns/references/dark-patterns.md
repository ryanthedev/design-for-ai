# Dark patterns — taxonomy and detection

**Source:** Brignull *Deceptive Patterns* (2023); deceptive.design taxonomy; Nodder *Evil by Design* (2013); Monteiro *Ruined by Design* (2019); EU DSA (2023); FTC enforcement history; EU Digital Fairness Act (expected Q4 2026).

**Structural twin:** `skills/design-for-ai/references/ai-tells.md` is the aesthetic parallel — a ban-list of visual tells (cyan-on-dark, glassmorphism, Inter defaults) that signal AI-generated defaults. This file is the ethical parallel: a ban-list of manipulation tells that signal user-hostile intent. Same structure (detection → mechanism → severity), different domain.

---

## Table of Contents

1. [Key definitions](#key-definitions)
2. [The 9 pattern categories](#the-9-pattern-categories)
3. [Detection checklist](#detection-checklist)
4. [Severity framework](#severity-framework)
5. [Regulatory exposure](#regulatory-exposure)
6. [This vs that](#this-vs-that)
7. [Common mistakes](#common-mistakes)

---

## KEY DEFINITIONS

> **Deceptive pattern**: A user interface design choice that tricks users into doing things they didn't mean to, by exploiting cognitive biases, perception gaps, or default-acceptance behavior. (Brignull, 2010, updated 2023.)

> **Dark pattern**: Earlier term for the same phenomenon; "deceptive pattern" is now preferred in regulatory language (EU DSA uses it explicitly). Both terms are in active use.

> **Mechanism**: The psychological or cognitive phenomenon being exploited. Naming the mechanism is what connects a deceptive pattern to its honest counterpart in `behavioral`. Examples: false scarcity exploits loss aversion; confirmshaming exploits social identity; roach motels exploit sunk-cost.

> **Friction asymmetry**: A structural inequality where one action (sign up, accept, buy) is made easy while the opposing action (cancel, decline, return) is made deliberately difficult. The sign-up/cancellation gap is the canonical example.

> **Ethics washing**: Acknowledging that dark patterns exist without providing actionable identification criteria or honest alternatives. A ban-list alone without constructive counterparts.

> **Regulatory gap**: A deceptive pattern that causes real user harm but is not yet named in active regulation. The Digital Fairness Act (EU, expected Q4 2026) will close several current gaps.

---

## THE 9 PATTERN CATEGORIES

### 1. Urgency and false scarcity

**What it is:** Creating or exaggerating time pressure or limited availability to accelerate decisions before the user can deliberate.

**Sub-types:**
- **Countdown timers** — clocks that reset on page reload, or timers with no real underlying scarcity.
- **Low-stock claims** — "Only 2 left!" with no real inventory constraint, or inflated claims ("3 people looking at this").
- **Flash sales** — perpetual "sale" pricing where the original price is inflated or never charged.

**Mechanism exploited:** Loss aversion (Kahneman: losses loom larger than equivalent gains); availability heuristic (recent, salient information overweights probability estimates).

**Detection signals:**
- Timer resets on refresh.
- Stock count doesn't change over repeated visits.
- "Sale" price is the only price ever displayed.
- Social proof numbers update faster than real demand could account for.

**Severity:** Medium–High. Financial harm when the artificial urgency causes a purchase the user would have reconsidered.

**Regulatory exposure:** EU DSA Article 25 (deceptive interfaces); EU Digital Fairness Act (expected Q4 2026) explicitly names false urgency and false scarcity.

---

### 2. Misdirection

**What it is:** Drawing the user's attention to one place while the consequential action or information is elsewhere.

**Sub-types:**
- **Confirm-shaming** — framing the decline option as self-deprecating ("No thanks, I don't want to save money").
- **Visual hierarchy manipulation** — the "accept all" button is large and high-contrast; "customize" is gray, small, and below the fold.
- **Disguised ads** — sponsored content styled identically to organic results; "download" buttons that are ads.
- **Bait-and-switch** — advertising one offer, then substituting a different one at point of conversion.

**Mechanism exploited:** Framing effects (choices change when reframed as losses vs. gains); Gestalt pre-attentive grouping (visual salience directs attention before deliberation); cognitive load (a user under load takes the path of least resistance).

**Detection signals:**
- Decline options frame themselves negatively ("No thanks, I'll stay ignorant").
- "Accept" is the only color-treated button.
- Ad units are styled identically to editorial content with only a small "Sponsored" label.
- The advertised product is unavailable and a more expensive substitute is offered.

**Severity:** Medium–High. Particularly severe when applied to cookie consent (legal basis for data collection).

**Regulatory exposure:** EU DSA explicitly targets cookie consent dark patterns; GDPR requires meaningful consent (consent obtained via misdirection is legally invalid under GDPR Recital 32).

---

### 3. Hidden information

**What it is:** Concealing information that would change the user's decision if it were visible at the point of decision.

**Sub-types:**
- **Hidden costs** — fees, taxes, service charges, or shipping costs not shown until checkout.
- **Drip pricing** — prices revealed incrementally, each step small enough not to trigger re-evaluation.
- **Hidden subscriptions** — a "free trial" that converts to a paid subscription with the auto-renewal buried in terms.
- **Privacy zuckering** — confusing privacy settings with complex defaults that maximize data collection.

**Mechanism exploited:** Sunk-cost fallacy (investment in checkout process makes abandonment feel costly); anchoring (the initial price anchors expectations before fees are revealed); decision fatigue (by the time fees appear, the user has already committed cognitively).

**Detection signals:**
- Final checkout price is materially higher than the advertised price.
- Subscription terms appear only in terms-of-service, not at the point of sign-up.
- Privacy settings default to maximum data sharing with opt-out buried in account settings.

**Severity:** High–Critical. Direct financial harm; legal exposure under consumer protection law in most jurisdictions.

**Regulatory exposure:** FTC has long pursued drip pricing; EU Digital Fairness Act names hidden subscriptions explicitly; GDPR targets privacy zuckering.

---

### 4. Friction asymmetry

**What it is:** Making desired actions (from the company's perspective) easy and opposing actions deliberately difficult.

**Sub-types:**
- **Roach motel** — easy to get in, very hard to get out (subscriptions where cancellation requires a phone call).
- **Hard-to-cancel** — excessive steps, re-confirmation screens, "save my subscription" guilt screens, mandatory retention chat.
- **Obstruction** — making a feature unnecessarily difficult to use to push a paid alternative.
- **Forced continuity** — charging begins automatically at the end of a trial with insufficient notice.

**Mechanism exploited:** Effort heuristic (users infer value from ease; they also abandon actions that feel too costly); sunk-cost (each step in a cancellation flow increases the felt cost of continuing to cancel).

**Detection signals:**
- Sign-up takes 2 clicks; cancellation takes a phone call or live chat.
- "Cancel subscription" link is not present in account settings.
- Cancellation flow presents multiple screens asking the user to reconsider.
- Trial end date is not surfaced at sign-up; reminder emails are not sent.

**Severity:** High–Critical. FTC's click-to-cancel rule (2024) directly targets cancellation friction; EU DSA covers contract termination ease.

**Regulatory exposure:** FTC click-to-cancel rule (enforcement history: rule finalized 2024; implementation ongoing). EU DSA Article 25.

---

### 5. Social manipulation

**What it is:** Using social proof, normative pressure, or false peer behavior to influence decisions.

**Sub-types:**
- **Fake social proof** — fabricated reviews, inflated purchase counts ("10,000 people bought this today"), testimonials attributed to fictional people.
- **Activity notifications** — real-time toasts claiming "Sarah from Austin just bought this" (unverifiable or inflated).
- **False authority** — fake badges, awards, or endorsements.
- **Social norm nudges** — "Most people in your situation choose the annual plan" without data.

**Mechanism exploited:** Social proof heuristic (Cialdini: uncertainty resolves by observing others); authority heuristic (expert endorsement reduces deliberation); informational social influence (we assume others know something we don't).

**Detection signals:**
- Review dates cluster suspiciously or all reviews are 5-star.
- Activity notifications appear faster than real purchasing patterns could explain.
- Awards are self-awarded ("Best in category, 2024 — awarded by us").
- Statistics cited without a source or methodology.

**Severity:** Medium–High. FTC requires disclosure for paid reviews and endorsements.

**Regulatory exposure:** FTC Endorsement Guides (revised 2023); EU DSA requires transparency for ranked results and review authenticity.

---

### 6. Default exploitation

**What it is:** Setting defaults that benefit the company rather than the user, knowing most users will not change them.

**Sub-types:**
- **Pre-selected add-ons** — insurance, expedited shipping, or donations pre-checked at checkout.
- **Marketing opt-in by default** — email marketing or third-party sharing opted in, requiring active opt-out.
- **Privacy-hostile defaults** — camera/location/notification permissions requested and granted by default in app setup.
- **Interface interference** — making the "recommended" option visually prominent while the user-preferred option requires finding and interacting with a smaller element.

**Mechanism exploited:** Status quo bias (users tend to accept defaults; changing a default requires effort and conscious decision); omission bias (failing to act feels less consequential than acting, so defaults persist).

**Detection signals:**
- Checkout includes pre-checked items the user did not add.
- Account creation flow pre-selects marketing email consent.
- GDPR cookie banners have "Accept all" as the single visible button with no equivalent "Reject all".

**Severity:** Medium–High. GDPR requires opt-in (not opt-out) for non-essential cookies; pre-checked consent is explicitly non-compliant.

**Regulatory exposure:** GDPR Article 7 (consent must be active); EU DSA; California Consumer Privacy Act (CCPA) for California residents.

---

### 7. Language manipulation

**What it is:** Using confusing, misleading, or emotionally loaded language to make users agree to things they would not agree to if plainly stated.

**Sub-types:**
- **Trick questions** — double negatives or confusing phrasing in consent checkboxes ("Uncheck this box if you do not wish to not receive marketing emails").
- **Confirmshaming** (also misdirection) — shame-labelled decline options.
- **Misleading terminology** — "free" products with mandatory fees; "unlimited" plans with caps.
- **Subscription disguised as purchase** — "Buy now" language for a subscription product.

**Mechanism exploited:** Processing fluency (statements that are harder to parse are more often accepted as-is — effort to understand feels equivalent to effort to reject); framing effects; default-acceptance of confusing consent.

**Detection signals:**
- Consent language requires two or more reads to parse.
- "Unlimited" appears in plan names with fine-print exceptions.
- Subscription is described using purchase language ("get", "buy") rather than subscription language.

**Severity:** Medium. Potentially High when used for financial or privacy consent.

**Regulatory exposure:** GDPR Recital 32 (consent must be in clear and plain language); consumer protection law.

---

### 8. Addiction traps

**What it is:** Design patterns that exploit psychological vulnerability to create compulsive use beyond what serves the user's own goals.

**Sub-types:**
- **Infinite scroll** — endless feeds with no natural stopping point, suppressing completion signals.
- **Variable reward / slot-machine pull-to-refresh** — unpredictable content refresh timing exploits dopamine reward circuits.
- **Streak mechanics** — artificial urgency to maintain arbitrary streaks beyond their motivational utility.
- **Autoplay** — auto-advancing to the next content item without user initiation.
- **Notification spam** — high-frequency notifications calibrated to maximally re-engage rather than inform.

**Mechanism exploited:** Variable ratio reinforcement (the most powerful operant schedule — Skinner; reward unpredictability is what drives compulsion, not reward size); loss aversion applied to streak loss; Zeigarnik effect (incomplete sessions pull for completion).

**Detection signals:**
- Feed has no pagination, no "you're up to date" state, no session end signals.
- Pull-to-refresh returns unpredictable content timing.
- App sends push notifications in the 7–10pm window optimized for engagement rather than user need.
- Autoplay begins immediately with no user action.

**Severity:** Medium–High. Particularly severe for children (COPPA; UK Children's Code; EU Digital Services Act age-appropriate design). Eyal's *Hooked* is now widely read as a dark-patterns manual despite its original framing as an engagement design guide.

**Regulatory exposure:** UK Children's Code (age-appropriate design); EU DSA (algorithmic amplification transparency); COPPA (US, children under 13).

---

### 9. Pricing opacity

**What it is:** Structuring pricing presentation to prevent accurate comparison, inflate perceived value, or conceal true costs.

**Sub-types:**
- **Misleading comparison tables** — competitor columns with fabricated or cherry-picked data.
- **Decoy pricing** — a middle tier priced to make the premium tier appear reasonable (the decoy effect).
- **Anchoring with inflated originals** — showing a "was" price that was never actually charged.
- **Bundle price confusion** — making individual and bundle prices difficult to compare.
- **Currency/unit obfuscation** — showing price "per day" for a product billed annually without showing the annual total.

**Mechanism exploited:** Decoy effect (Ariely: an asymmetrically dominated option makes one alternative appear better than it otherwise would); anchoring (first price seen sets the reference); unit pricing confusion (prices in non-native units require mental arithmetic most users don't perform).

**Detection signals:**
- "Original price" appears for a product that is always on sale.
- Pricing page shows $/day or $/week for an annually-billed product without the annual total.
- Competitor column in comparison table has fabricated feature gaps.
- The middle plan is structurally dominated and exists only to frame the premium plan.

**Severity:** Medium–High. FTC has active deceptive pricing enforcement; EU requires clear total price display.

**Regulatory exposure:** FTC Guides Against Deceptive Pricing; EU Consumer Rights Directive (clear total price).

---

## DETECTION CHECKLIST

Quick sweep for auditing a flow:

**Urgency/scarcity:**
- [ ] Countdown timer resets on page reload?
- [ ] Stock or viewer count claims are unverifiable or update implausibly fast?
- [ ] "Sale" price appears to be the only price ever offered?

**Misdirection:**
- [ ] Decline option is framed as self-deprecating (confirmshaming)?
- [ ] Accept action has a color/size advantage over all alternatives?
- [ ] Ad units are styled identically to organic content?

**Hidden information:**
- [ ] Final price at checkout materially exceeds the advertised price?
- [ ] Subscription conversion is buried in fine print, not shown at sign-up?
- [ ] Privacy defaults maximize data sharing without a clear opt-out path?

**Friction asymmetry:**
- [ ] Sign-up is self-serve; cancellation requires contacting support?
- [ ] Cancellation presents multiple re-confirmation or "save my account" screens?
- [ ] Trial end is not surfaced at sign-up and reminder emails are absent?

**Social manipulation:**
- [ ] Reviews are exclusively 5-star or lack dates?
- [ ] Activity notifications appear faster than real demand could produce?
- [ ] Awards or endorsements are self-assigned?

**Default exploitation:**
- [ ] Checkout includes pre-checked add-ons the user did not select?
- [ ] Marketing consent is opt-out rather than opt-in?
- [ ] "Accept all" cookies is the only prominently displayed option?

**Language manipulation:**
- [ ] Consent language requires more than one careful reading to parse?
- [ ] "Unlimited" or "free" used with material exceptions in fine print?
- [ ] Subscription product described with purchase language?

**Addiction traps:**
- [ ] Feed has no natural stopping point or "you're up to date" state?
- [ ] Pull-to-refresh timing is variable/unpredictable?
- [ ] Autoplay begins without user initiation?

**Pricing opacity:**
- [ ] Price shown per day or per week for an annual product without showing the annual total?
- [ ] "Was" price appears to have never been the actual price?
- [ ] Comparison table has unverifiable competitor data?

---

## SEVERITY FRAMEWORK

Rate each finding:

| Level | Criteria |
|-------|----------|
| **Critical** | Direct, significant, often irreversible financial harm or data privacy violation; preys on vulnerable populations (children, people in financial distress); or is explicitly illegal in one or more active jurisdictions |
| **High** | Material financial harm (hidden costs, false subscription); causes users to take an action they clearly did not intend with meaningful consequences; creates regulatory exposure |
| **Medium** | User takes an unintended action but harm is limited or reversible; creates friction that disadvantages the user without direct financial harm; potential regulatory exposure |
| **Low** | Mildly manipulative; user can recover easily; no regulatory exposure; but crosses the line from persuasion into exploitation |

---

## REGULATORY EXPOSURE

Active and pending regulation relevant to deceptive pattern audits:

| Regulation | Jurisdiction | Status | Key coverage |
|------------|-------------|--------|--------------|
| EU Digital Services Act (DSA) | EU | Active (2023) | Art. 25: "dark patterns" by name; deceptive interfaces, manipulative design practices for very large online platforms |
| GDPR | EU | Active | Non-compliant consent UI (pre-ticked boxes, no equivalent reject-all); data minimization |
| EU Digital Fairness Act | EU | Expected Q4 2026 | Will explicitly name ~19 deceptive pattern techniques including false urgency, false scarcity, hidden subscriptions, manipulative personalization |
| FTC click-to-cancel rule | US | Rule finalized 2024; implementation ongoing | Requires cancellation to be at least as easy as sign-up |
| FTC Endorsement Guides | US | Revised 2023 | Disclosure requirements for paid reviews, influencer marketing, AI-generated reviews |
| UK Children's Code | UK | Active | Age-appropriate design; bars high-engagement techniques for users under 18 |
| COPPA | US | Active | Protections for children under 13; data collection consent |
| California CCPA/CPRA | US (CA) | Active | Opt-out for data sale; dark patterns in consent UI explicitly covered |

---

## THIS VS THAT

| Confusion point | This file covers | Not this |
|-----------------|-----------------|----------|
| ai-tells vs deceptive-patterns | `ai-tells.md` (core skill): AESTHETIC tells — visual patterns signaling no design decision was made (Inter defaults, cyan-on-dark, glassmorphism). This file: ETHICAL manipulation tells — design choices that exploit psychology to override user intent. Same ban-list structure; different domain | Deceptive patterns are not aesthetic problems; ai-tells are not ethical problems |
| Persuasion vs manipulation | Persuasion uses real psychology honestly (the `behavioral` skill); manipulation uses the same mechanisms deceptively, asymmetrically, or against user interest | Persuasion is not manipulation; not all engagement mechanics are dark patterns |
| Legitimate urgency vs false urgency | A real limited-time sale is not a dark pattern; a countdown that resets is | Urgency itself is a dark pattern |
| Defaults as dark patterns | A default must be **against user interest** to be a dark pattern; a default that saves users configuration effort is legitimate (Tesler's law from usability-principles.md: absorb complexity into the product) | All defaults are dark patterns |
| Inclusive design / accessibility | Accessibility exclusion (no captions, no keyboard nav) is a different category — use `usability` | Inaccessibility is the same as a deceptive pattern |

---

## COMMON MISTAKES

| Mistake | Why it happens | Correct approach |
|---------|----------------|-----------------|
| Calling any persuasion a dark pattern | "Persuasion = manipulation" conflation; discomfort with conversion mechanics | Name the specific Brignull category; persuasion that is transparent and accurate is not a dark pattern |
| Ethics washing: flagging patterns without alternatives | It feels like the audit is done when the ban-list is complete | Every finding requires a recommended honest alternative (see `honest-alternatives.md`) |
| Ignoring severity differences | All violations feel equally bad | Rate by harm, reversibility, and regulatory exposure; prioritize Critical/High |
| Missing default exploitation because it looks subtle | Pre-checked boxes look like a minor UX choice | Defaults are where the highest volume of unintended consent is generated |
| Treating regulatory compliance as the bar | "We're GDPR compliant" is not the same as "we have no dark patterns" | Regulation is the floor, not the ceiling; some patterns are harmful before they are illegal |
