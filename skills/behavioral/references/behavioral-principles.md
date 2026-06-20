# Behavioral principles — the mechanism catalog

**Source:** Cialdini *Influence* (1984, rev. 2007, 7th ed. 2021 — added Unity); Fogg *Tiny Habits* (2019) and the Fogg Behavior Model; Eyal *Hooked* (2014) and *Indistractable* (2019); Norman *Emotional Design* (2003); Weinschenk *100 Things Every Designer Needs to Know About People* (2011/2020); Kahneman *Thinking, Fast and Slow* (2011).

**Ethical frame:** These mechanisms are ethically neutral tools; application determines moral valence. Each section notes the honest application and the dark version. The dark version is the `deceptive-patterns` skill's domain — load it as the guardrail when the ask involves optimization of conversions under time pressure, subscription defaults, or any mechanic where the user's interest and the company's interest may diverge.

---

## Table of Contents

1. [Key definitions](#key-definitions)
2. [Fogg behavior model](#fogg-behavior-model)
3. [Hook model (Eyal)](#hook-model-eyal)
4. [Cialdini's seven principles](#cialdinis-seven-principles)
5. [Norman's three emotional levels](#normans-three-emotional-levels)
6. [Motivation taxonomy](#motivation-taxonomy)
7. [Choice architecture](#choice-architecture)
8. [This vs that](#this-vs-that)

---

## KEY DEFINITIONS

> **Behavioral design**: Applying psychology — motivation, decision-making, habit formation, emotional response — to create products that earn engagement. Distinct from conversion optimization (which is a business metric) and from manipulation (which pursues business metrics at the user's expense).

> **Internal trigger**: A discomfort, desire, or emotion the user already experiences that the product relieves or satisfies. The honest hook. (Eyal: the most powerful triggers are internal because they don't require the product to manufacture motivation.)

> **External trigger**: A prompt from the product (notification, email, badge) to return. Honest when connected to a real internal need; manipulative when it manufactures anxiety or FOMO to drive return.

> **Variable reward**: Reward that varies in size, type, or timing — the most powerful reinforcement schedule (B.F. Skinner). Honest when the variation reflects genuine content quality; manipulative when variation is calibrated to create compulsion.

> **Choice architecture**: How choices are structured, ordered, and presented — which affects decisions independently of the content of the choices. The designer is always the choice architect whether they intend to be or not.

> **Visceral / behavioral / reflective**: Norman's three processing levels of emotional response to design (see §Norman's three emotional levels).

---

## FOGG BEHAVIOR MODEL

(Fogg, 2007–2019) The most useful diagnostic model for "why isn't the user doing the thing".

**Formula:** `Behavior = Motivation × Ability × Prompt`

A behavior occurs when all three are above threshold simultaneously. Most low-conversion problems are a deficit in one variable — and the wrong fix is applied (e.g., improving copy when the real problem is ability / too many steps).

### Motivation

Six motivation axes (Fogg organizes them as three pairs of opposites):
- **Pleasure / Pain**: immediate sensory and hedonic response.
- **Hope / Fear**: anticipation of a positive outcome vs. fear of a negative one. The most commonly over-used axis in persuasion; fear is powerful but risks feeling threatening.
- **Social acceptance / Social rejection**: desire for belonging and status. Cialdini's social proof, liking, and unity principles all operate here.

Motivation is the hardest variable to change directly. Design usually moves ability and prompt first.

### Ability

Six ability factors (Fogg's "six elements of simplicity"):
- **Time**: how much time does the action require?
- **Money**: what is the financial cost?
- **Physical effort**: how much physical action is required?
- **Brain cycles**: how much cognitive effort (thinking, deciding) is required?
- **Social deviance**: does the action violate a social norm?
- **Non-routine**: does the action break from habit?

The easiest-to-improve ability factor for digital products is **brain cycles** (cognitive load) and **time** (step count). Tesler's law (`usability-principles.md` §Teslers-law): absorb complexity into the product rather than pushing it onto the user.

### Prompt

Three types:
- **Spark**: a prompt that also adds motivation (used when motivation is low).
- **Facilitator**: a prompt that also adds ability / removes friction (used when motivation is high but ability is low).
- **Signal**: a simple reminder (used when motivation and ability are both high).

Mismatching prompt type and constraint is a common design error: sending a motivation-boost notification to a user whose real problem is that the action requires too many steps.

**Prompt timing principle:** the highest-probability moment for a prompt is immediately after a positive experience (Fogg; also the peak-end rule — see `ethical-application.md` for usability anchor citations).

---

## HOOK MODEL (EYAL)

(Eyal *Hooked*, 2014) A four-phase cycle for habit formation in products. Eyal's *Indistractable* (2019) is his partial counter: it distinguishes internal-trigger hooks (honest, because they satisfy a pre-existing desire) from manufactured-trigger hooks (potentially manipulative, because they create the desire).

### Phase 1: Trigger

**External trigger (honest):** an email, notification, or in-app prompt that surfaces at the moment the user's internal trigger is most active. Email "you have an unread message from someone you follow" arrives when the user has a social connection desire.

**External trigger (dark version):** a notification engineered to create FOMO or anxiety in a moment when the user had no internal trigger. The trigger manufactures the desire, rather than serving it. → Flag to `deceptive-patterns`.

**Internal trigger:** the emotion, desire, or discomfort the user brings to the product. Boredom → social media. Loneliness → messaging. Uncertainty → news. The most powerful and honest hook connects external triggers to internal ones.

**Design question:** What internal trigger does this product genuinely address? If you can't name one, the product is manufacturing the need — which is the dark version.

### Phase 2: Action

The simplest behavior in anticipation of a reward. Fogg's ability factors apply directly: fewer steps, less cognitive load, one clear CTA, no decision paralysis (Hick's law: decision time rises with number of choices — progressive disclosure for unfamiliar or complex actions).

**Design principle:** the action should be simpler than not acting. The lowest-friction version of the desired behavior.

### Phase 3: Variable reward

Three reward types (Eyal draws from Skinner and anthropology):
- **Reward of the tribe**: social validation — likes, comments, recognition, approval. Social proof and social belonging.
- **Reward of the hunt**: finding a resource — useful content, a deal, information. The "scroll to find something good" behavior.
- **Reward of the self**: mastery, completion, achievement — finishing a task, leveling up, making progress.

**Honest variable reward:** variation comes from genuine quality differences in content, genuine mastery progression, or genuine social response. The reward is real and the variation reflects real content.

**Dark variable reward:** variation is manufactured (identical content, artificially randomized) to maximize dopamine response without regard to whether the user gets genuine value. The slot-machine mechanic. → Flag to `deceptive-patterns`.

### Phase 4: Investment

The user puts something into the product — data, content, time, social connections, preferences — that makes it more useful on the next cycle. This is what creates habituation: the product improves because the user invested.

**Honest investment:** the investment genuinely improves the product for that user (preferences that improve recommendations, connections that provide real social value, content that others respond to).

**Dark investment:** the investment increases switching cost without improving the product (data that locks the user in but isn't used to improve their experience). → Flag to `deceptive-patterns`.

---

## CIALDINI'S SEVEN PRINCIPLES

(Cialdini *Influence*, 1984 — six principles; 7th ed. 2021 added Unity) Each principle is a heuristic shortcut humans use to make decisions without full deliberation. Honest use: apply when the shortcut leads to a conclusion that genuinely serves the user. Dark use: apply to lead to a conclusion that serves the company at the user's expense.

### Reciprocity

We tend to return favors. Give genuine value before asking for anything.

**Honest application:** deliver a useful free tool, resource, or sample before asking for an email sign-up or purchase. The value is real and given without contingency. Teach something valuable, then offer more depth.

**Dark version:** a "free" gift with hidden strings, obligations that weren't disclosed at the time of giving, or reciprocity manufactured to trigger obligation for a trivial gesture.

### Commitment and consistency

We feel pressure to be consistent with our prior commitments and stated positions.

**Honest application:** ask for a small, genuine commitment first (micro-interaction, stated preference, short quiz) that naturally leads to a larger one. Onboarding that asks "what is your goal?" creates honest commitment to a path the user chose.

**Dark version:** foot-in-the-door commitments designed to lock users into a path they'd have rejected if presented with the full request up front. Pre-selected commitments (dark default exploitation — see `deceptive-patterns`).

### Social proof

We look to others' behavior to guide our own, especially under uncertainty.

**Honest application:** genuine customer count, verified reviews, real user testimonials, disclosed sources. "10,000 teams use this product" when the count is real.

**Dark version:** fabricated reviews, inflated activity counters, unverified social proof. → `deceptive-patterns` §social-manipulation.

### Authority

We defer to genuine experts and credible signals of expertise.

**Honest application:** real credentials, published research, transparent methodology, named experts. "Recommended by the American Heart Association" when the recommendation is real.

**Dark version:** self-awarded badges, fake experts, authority claims without verifiable basis.

### Liking

We comply more with people (and by extension, products) we like — those similar to us, familiar, or associated with positive affect.

**Honest application:** products that feel warm, human, and genuinely reflective of the user's values. Copy that feels like a real person talking to a peer. Genuine similarity in values or personality.

**Dark version:** manufactured familiarity, manipulative personalization designed to trigger liking without genuine alignment, parasocial relationships manufactured to increase purchase probability.

### Scarcity

We value things more when they are rare or diminishing in availability.

**Honest application:** genuine limited availability (a real waitlist, a genuine limited batch, a real sale deadline). The scarcity is real.

**Dark version:** manufactured scarcity — countdown timers that reset, stock counts that don't reflect real inventory. → `deceptive-patterns` §urgency-and-false-scarcity.

### Unity (added 7th edition)

We comply more with people we perceive as part of our in-group — family, community, tribe, or shared identity.

**Honest application:** building genuine community around shared values or identity. A product that sincerely represents a community's values earns this naturally.

**Dark version:** manufactured tribal identity to suppress critical evaluation; "us vs. them" framing that makes defection (cancelling, switching) feel like betrayal.

---

## NORMAN'S THREE EMOTIONAL LEVELS

(Norman *Emotional Design*, 2003) Three levels at which design creates emotional response — all three must be considered, and they interact.

### Visceral level

Immediate, automatic, pre-cognitive — the gut response to appearance, feel, and first impression. Happens before conscious evaluation.

**Design levers:** visual aesthetics (the core `design` skill's domain), animation feel (motion), haptic feedback, sound. The behavioral angle: what emotional valence does the first impression create? Trustworthy? Playful? Authoritative?

**Risk:** the aesthetic-usability effect (Kurosu & Kashimura, 1995 — `usability-principles.md` §aesthetic-usability-effect): visceral appeal inflates perceived usability, masking real defects in testing. Fix usability before investing heavily in visceral polish.

### Behavioral level

The experience of use — ease, responsiveness, control, efficiency. Most of usability lives here.

**Design levers:** feedback speed (Doherty threshold: under 400ms — `usability-principles.md`), error recovery, clarity of action. Norman: a well-designed behavioral level creates a feeling of being in control and capable.

**Note:** this is where `usability` skill's work lives. Behavioral design cites usability principles for the behavioral level; it doesn't duplicate the usability knowledge.

### Reflective level

Conscious evaluation, memory, identity, and story — how the user thinks about their relationship with the product after the experience. "Am I proud to use this?" "Does this product represent who I am?"

**Design levers:** brand narrative, product positioning, community, the meaning the product creates. The longest-lasting emotional response.

**Practical application:** a product that wins at the reflective level earns advocacy and loyalty. A product that only optimizes for visceral and behavioral appeal but offers nothing for the reflective level is transactional — used but not loved.

**The compulsion test (Eyal, *Indistractable*):** if the user feels good about their use at the reflective level ("I'm glad I used this today"), the engagement design is honest. If they feel regret or loss of control at the reflective level ("I can't stop using it even though I want to"), it's compulsion design.

---

## MOTIVATION TAXONOMY

A working map of what motivates users, to diagnose the right motivation lever:

| Motivation type | Examples | Design lever |
|----------------|----------|-------------|
| **Achievement / mastery** | Completing a skill, reaching a goal, leveling up | Goal-gradient effect (`usability-principles.md` §goal-gradient-effect): show progress and head-starts; streaks with grace periods |
| **Social belonging** | Connection, recognition, shared identity | Tribe rewards; community features; Cialdini: liking and unity |
| **Autonomy / control** | Customization, agency, being in charge | User control (Nielsen #3); progressive disclosure; preference-setting |
| **Competence** | Feeling capable and effective | Clear feedback; error recovery; reducing cognitive load (behavioral level) |
| **Security / stability** | Reliability, trust, no surprises | Consistent behavior (Jakob's law); transparent pricing; honest defaults |
| **Novelty / curiosity** | Discovery, surprise, new information | Variable reward of the hunt (honest); content freshness |
| **Purpose / meaning** | Contribution, values alignment, impact | Reflective level design; mission-aligned brand; impact metrics |

Design for the motivation the product genuinely addresses. Mismatched motivation appeals (using fear/scarcity for a product whose users are motivated by mastery) produce short-term conversion at the cost of long-term churn.

---

## CHOICE ARCHITECTURE

(Thaler & Sunstein *Nudge*, 2008; Kahneman *Thinking, Fast and Slow*, 2011) How choices are structured affects decisions independently of their content. The designer is always the choice architect.

### Honest choice architecture

- **Defaults that serve users.** Default the option the user would choose if they thought about it (Tesler's law: absorb complexity). Not the option that maximizes revenue.
- **Progressive disclosure.** Show the simplest decision first; reveal complexity as needed. Hick's law (`usability-principles.md` §hicks-law): decision time rises with options; stage complex choices.
- **Anchoring (honest).** Present a genuine mid-tier option as the starting point; describe what it includes accurately.
- **Elimination of dominated options.** If one option is clearly worse than another on all dimensions, remove it — don't use it as a decoy.
- **Clear "nothing" option.** Every choice architecture should have an easy, non-shamed path for not choosing.

### The dark version

Pre-selected options, manufactured anchors, decoy tiers, and confirmshaming are choice architecture used against the user. → `deceptive-patterns` §default-exploitation and §pricing-opacity.

---

## THIS VS THAT

| Confusion point | Behavioral covers | Not behavioral |
|----------------|------------------|----------------|
| Persuasion vs. manipulation | Persuasion uses real psychology to help users achieve goals they have | Manipulation uses the same psychology against the user's interest → `deceptive-patterns` |
| Behavioral vs. journey | Behavioral = the psychological mechanism (why a user acts); journey = the sequence (how a user moves through a flow over time) | Journey maps don't explain motivation; behavioral principles don't produce sitemaps |
| Behavioral vs. visual design | Norman's visceral level is about emotional response to aesthetics, not the craft of making them | The color palette and typeface choices belong in the core `design` skill |
| Habit design vs. addiction traps | Honest habit = internal trigger + genuine variable reward + investment that improves the product | Compulsion design = manufactured external trigger + slot-machine reward + sunk-cost investment → `deceptive-patterns` §addiction-traps |
| Cialdini vs. dark patterns | Each Cialdini principle has an honest and a dark application | Cialdini describing social proof is not endorsing fake reviews |
