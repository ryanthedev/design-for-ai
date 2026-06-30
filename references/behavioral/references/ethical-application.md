# Ethical application — the honest-use layer

**Source:** Eyal *Indistractable* (2019); Monteiro *Ruined by Design* (2019); Norman *Emotional Design* (2003); usability-principles.md (Laws of UX — Yablonski 2024). This file is where behavioral science and usability science intersect — the laws from Phase 2 (`skills/usability/references/usability-principles.md`) cited directly where they ground behavioral design choices.

**Purpose:** Document the ethical tests that distinguish honest engagement design from compulsion design; cite the usability law anchors that the behavioral skill shares with the keystone usability skill; and make the handoff to `deceptive-patterns` explicit and actionable.

---

## Table of Contents

1. [The ethical test: engagement vs. compulsion](#the-ethical-test-engagement-vs-compulsion)
2. [Usability laws in behavioral context](#usability-laws-in-behavioral-context)
3. [The six honest-use tests](#the-six-honest-use-tests)
4. [When to load deceptive-patterns](#when-to-load-deceptive-patterns)
5. [The designer's responsibility](#the-designers-responsibility)

---

## THE ETHICAL TEST: ENGAGEMENT VS. COMPULSION

Eyal's distinction (from *Indistractable*, 2019 — his partial self-correction to *Hooked*):

| Dimension | Honest engagement | Compulsion design |
|-----------|------------------|------------------|
| **Trigger source** | Connects to an internal trigger the user already has (boredom, loneliness, curiosity, a real task) | Manufactures an external trigger that creates anxiety, FOMO, or obligation the user didn't have |
| **Reward quality** | Genuine value on variable schedule (real content quality varies; real social responses vary) | Manufactured uncertainty calibrated to maximize dopamine response regardless of value delivered |
| **Reflective-level response** | User feels good about their use when they step back ("I learned something"; "I connected with someone"; "I finished a task") | User feels regret, loss of control, or shame when they step back ("I can't stop even though I want to"; "I don't know where the time went") |
| **User agency** | User can stop when they want; exit paths are clear; usage feels chosen | User can't stop easily; exit paths are hidden; usage feels compelled |
| **Goal alignment** | The product's engagement goal and the user's own goal are the same | The product's engagement goal (session time, return rate) conflicts with the user's goal (getting value and leaving) |

The Norman reflective level is the most reliable test: if a user, reflecting on their usage, feels ownership and satisfaction — the design is honest. If they feel manipulation or loss of agency — it is compulsion design regardless of what the Fogg model or Hook model would predict about conversion.

---

## USABILITY LAWS IN BEHAVIORAL CONTEXT

The following laws from `skills/usability/references/usability-principles.md` apply directly to behavioral design. Cited here by stable anchor; the full citation is in the usability reference.

### Peak-end rule (`usability-principles.md` §peak-end-rule)

(Kahneman) Users judge an experience by its peak (the most emotionally intense moment) and its end (how it concluded) — not by the average.

**Behavioral design application:**
- Invest in the emotional peak: the first successful outcome, the first "aha", the moment the product delivers on its core promise. This is where onboarding should spend its effort — not on feature tours, but on making the user feel the product's value at the highest point possible.
- Invest in the ending: success states, completion animations, "you're done" moments. A strong ending improves memory of the entire experience and increases return rate.
- Session endings matter: a product with no natural end signal leaves users feeling like they fell out rather than chose to leave. A clear, positive end signal (Zeigarnik: completion is satisfying when it's real) is honest engagement design.

**Dark version:** engineered peaks (inflated success moments that don't reflect real value); no endings (infinite scroll to prevent the end moment from occurring). → `deceptive-patterns` §addiction-traps.

### Zeigarnik effect (`usability-principles.md` §zeigarnik-effect)

Incomplete tasks stay in working memory. People feel a pull to return to and finish what they started.

**Behavioral design application:**
- Progress indicators and checklists leverage the Zeigarnik pull honestly: the user's task is genuinely incomplete, and the product helps them finish it.
- Onboarding flows that save state ("Resume where you left off") use Zeigarnik to help users complete a process they started.
- Email reminders for genuinely incomplete tasks ("Your draft is waiting") are honest Zeigarnik prompts.

**Dark version:** manufactured incompleteness — streaks that create artificial ongoing tasks; "you have unread notifications" that refer to manufactured activity rather than genuine user-relevant events; progress bars that never reach 100% to maintain indefinite pull. → `deceptive-patterns` §addiction-traps.

### Goal-gradient effect (`usability-principles.md` §goal-gradient-effect)

(Hull) Motivation increases as users approach a goal. The closer to the finish, the harder people push.

**Behavioral design application:**
- Artificial head-starts (pre-filling the first step of a progress bar) honestly prime the goal-gradient when the rest of the journey is real.
- Showing how close a user is to a reward, unlock, or completion threshold motivates completion honestly — as long as the goal is achievable and the reward is real.
- Onboarding "you're 60% done" is honest when the remaining 40% genuinely leads to the product's core value.

**Dark version:** progress bars that never complete; rewards that stay out of reach; loyalty programs where the final tier has impossible requirements. The goal-gradient is honest only when the goal is reachable and real. → `deceptive-patterns` §friction-asymmetry.

### Hick's law (`usability-principles.md` §hicks-law)

(Hick–Hyman, 1952) Decision time rises with the log of the number of choices.

**Behavioral design application:**
- Choice architecture: present fewer choices at each decision point; use progressive disclosure for complex decisions (pick the category, then the option within the category).
- Pricing tiers: 3 tiers is the canonical honest number — it allows comparison without overwhelming. More tiers require genuine differentiation to justify the cognitive cost.
- The "recommended" tier is honest when it is genuinely the best fit for most users; it is dark when it exists only to frame the premium as a bargain.

**Note:** Hick's law applies to *time-critical or unfamiliar* decisions; it does not mean "always fewer links" (see Miller caveat in `usability-principles.md`).

### Aesthetic-usability effect (`usability-principles.md` §aesthetic-usability-effect)

(Kurosu & Kashimura, 1995) Users perceive attractive designs as more usable — and attractive design masks real defects in testing.

**Behavioral design application:**
- The visceral level (Norman) creates this effect directly: a beautiful product feels more trustworthy and usable even when it isn't.
- **Fix behavioral-level usability before investing in visceral polish.** A behaviorally broken product with a beautiful skin will pass usability testing when it shouldn't. (This is the reason the usability skill ranks operability first and the core design skill handles the polish.)
- The effect is also the mechanism behind "first impressions matter" in conversion: visceral response happens in milliseconds and sets the frame for everything that follows.

---

## THE SIX HONEST-USE TESTS

Run these against any engagement mechanic before shipping:

| Test | Pass | Fail (flag to deceptive-patterns) |
|------|------|----------------------------------|
| **1. Internal trigger test** | The mechanic connects to a genuine internal need the user already has | The mechanic manufactures anxiety, FOMO, or obligation the user didn't have |
| **2. Variable reward test** | The variation reflects genuine content quality or genuine social response | The variation is calibrated for dopamine response regardless of value delivered |
| **3. Reflective level test** | Users, stepping back, feel good about their usage ("I got value") | Users feel regret or loss of agency ("I can't stop; I don't know why I'm still here") |
| **4. Goal alignment test** | The engagement goal (return rate, session length) serves the user's own goal | The engagement goal conflicts with what the user actually wants from the product |
| **5. Symmetry test** | Entry and exit are equivalently easy and emotionally neutral | Entry is incentivized, exit is shamed or obstructed |
| **6. Real scarcity / real proof test** | Urgency, scarcity, and social proof claims are accurate and verifiable | Claims are manufactured or inflated to trigger heuristic responses |

Any mechanic that fails one or more of these tests is in `deceptive-patterns` territory — the mechanism is the same; the application is exploitation.

---

## WHEN TO LOAD DECEPTIVE-PATTERNS

Load `deceptive-patterns` as the ethical guardrail when the design task involves:

- **Conversion optimization** under time pressure (limited-time offers, urgency mechanics, scarcity signals).
- **Subscription and cancellation flows** — any asymmetry in the ease of signing up vs. leaving.
- **Default settings** that affect privacy, marketing consent, or financial commitments.
- **Social proof elements** — reviews, ratings, activity counts, authority claims.
- **Retention mechanics** — streaks, points, notifications, variable reward schedules.
- **Pricing presentation** — tiers, decoy options, per-day pricing, "was/now" framing.
- Any situation where the team's interest and the user's interest may diverge.

The diagnostic: "Who benefits from this design?" If the answer is only the company, load `deceptive-patterns`.

---

## THE DESIGNER'S RESPONSIBILITY

Monteiro (*Ruined by Design*, 2019): designers are not neutral implementers; they bear responsibility for the outcomes of what they design. This is not a counsel to paralysis — it is a counsel to deliberate authorship.

For behavioral design specifically:

1. **Name the mechanism.** When you apply a Cialdini principle, a Hook phase, or a Norman emotional level, name it explicitly. Unnamed mechanisms are more easily used carelessly.
2. **Run the six tests.** A mechanic that fails any test needs to be redesigned or escalated, not shipped.
3. **Distinguish between "users won't notice" and "it's ethical".** Many deceptive patterns operate below conscious awareness precisely because they exploit pre-cognitive shortcuts. "They won't notice" is not the test; the test is whether the mechanic serves the user's genuine interest.
4. **The business goal is not the design goal.** The design goal is to help users accomplish what they came to do — and, in doing so, also achieve the business goal. When those two goals are incompatible, the design problem is the business model, not the behavioral mechanic.
5. **Eyal's internal trigger as the north star**: if you can name the genuine internal trigger your product satisfies, you can design for it honestly. If you can't, you're manufacturing the need — and the product's engagement will depend on manipulation rather than value.
