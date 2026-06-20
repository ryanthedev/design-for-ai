# Journey caveats — the honest-citation layer

The failures that make journey work theater instead of design. Load whenever a client presents a journey map, an AIDA funnel, a "best-practice" landing page template, or a sitemap as a finished IA. These are not cynicism — they are the conditions under which the tools in `journey-stack.md` actually work.

**Sources:** Watermark Consulting CX ROI study (2023); McKinsey CDJ (2009); Google Messy Middle (2020); Nielsen Norman Group on journey-map misuse; Rosenfeld/Morville on tree testing; Schwartz *Breakthrough Advertising* (1966) awareness ladder.

---

## Table of Contents

1. [Journey-map theater](#journey-map-theater)
2. [Linear-funnel fallacy](#linear-funnel-fallacy)
3. [Cargo-cult landing page syndrome](#cargo-cult-landing-page-syndrome)
4. [JTBD school-mixing](#jtbd-school-mixing)
5. [Sitemap ≠ IA](#sitemap--ia)
6. [Above-the-fold myth](#above-the-fold-myth)
7. [Summary: the honest pre-flight check](#summary-the-honest-pre-flight-check)

---

## JOURNEY-MAP THEATER

**The failure:** 83% of CX professionals report they cannot make journey maps drive organizational change (Watermark Consulting 2023). Maps become presentation artifacts that satisfy a process requirement and then get shelved.

**The mechanism:** Journey maps are organizational change tools masquerading as design deliverables. Without a named owner, a cadence for review, and a direct line to a team that can act on the opportunities, the map has no path to impact.

**Indicators of theater:**
- The emotion curve was drawn in the workshop, not derived from research.
- No one is named as the map's owner post-workshop.
- Stages were chosen from a template ("Awareness → Consideration → Decision → Onboarding → Advocacy"), not from this specific user's actual journey.
- The map shows the *ideal* journey, not the *current* one — future-state mapping without a current-state baseline.
- Opportunities rows are empty or abstract ("improve the experience").

**The fix:**
- Ground the emotion curve in qualitative research: user interviews, diary studies, or support-call analysis.
- Name the map's owner before the workshop ends.
- Define the review cadence: when will this be updated, and what triggers an update?
- Make the stages reflect THIS user's journey in THIS context — not a template.
- Turn the opportunities row into specific, assigned design interventions with owners.

---

## LINEAR-FUNNEL FALLACY

**The failure:** AIDA (1898) and the traditional marketing funnel assume that users move through stages in order: Awareness → Interest → Desire → Action → (Loyalty). Real purchase decisions don't work this way.

**The evidence:**
- **McKinsey CDJ (2009, ~20k consumers):** The decision journey is non-linear. Brands enter and leave the consideration set during active evaluation. Post-purchase experience either builds a loyalty loop (bypassing future evaluation) or forces the user back through the full CDJ. The funnel collapses the loyalty loop entirely.
- **Google Messy Middle (2020):** Between trigger and purchase sits a non-linear explore↔evaluate space governed by 6 cognitive biases (category heuristics, power of now, social proof, scarcity bias, authority bias, power of free). "Orderly progression" is a fiction in this space.

**When AIDA is still useful:** As a *mnemonic* for copywriting (does this section create Attention, then Interest, then Desire, then prompt Action?). Not as a structural model of how decisions happen.

**The fix:** Use the McKinsey loyalty loop for decision journey modeling. Use the Google Messy Middle (explore↔evaluate + 6 biases) for understanding why users linger before purchase. Use the persuasion spine (from `journey-stack.md`) for section sequencing — it is derived from what actually converts, not from the funnel model.

---

## CARGO-CULT LANDING PAGE SYNDROME

**The failure:** Copying a landing page template without understanding why each section exists — resulting in a page that has the right sections in the right order but doesn't convert, because the content inside each section does the wrong job.

**Specific failures:**

| Section copied | What went wrong |
|----------------|----------------|
| Hero with bold claim | Claim is about the brand ("We are the industry leader"), not about the user's problem or the product's benefit |
| Social proof logos | Logos of companies no one recognizes; no numbers or specificity |
| "How it works" with 3 steps | Steps describe internal product architecture, not the user's experience of getting value |
| Testimonials | Generic ("Great product, 5 stars") without specifics (metric, use case, job title) |
| FAQ | Answers questions the team has, not questions users actually ask |
| CTA | Friction-heavy ("Create a free account, no credit card required") when the user isn't ready for commitment |

**The Nielsen finding (2024):** 91% of users scroll past the fold. "Above the fold" as a canonical rule for CTA placement is a myth. The CTA should appear where the user is persuaded, not where the viewport ends.

**The Shapiro diagnostic:** Diagnose underperforming pages with the conversion equation: Purchase = Desire − (Labor + Confusion). If the page isn't converting, identify which term is wrong: Is Desire too low (hero and problem sections aren't resonating)? Is Labor too high (the CTA is too much commitment for where the user is in the journey)? Is Confusion too high (the page is unclear about what the product does or who it's for)?

**The fix:** Know the awareness stage of the arriving visitor (Schwartz ladder). Write the hero section to that stage. Each subsequent section advances the user up the awareness ladder — don't assume they arrive ready to buy.

---

## JTBD SCHOOL-MIXING

**The failure:** Mixing vocabulary and methods from two or more JTBD schools, producing a framework that satisfies neither and delivers insights usable by neither.

**The four schools (incompatible vocabulary):**

| School | Originator | Key construct | Language |
|--------|-----------|--------------|----------|
| Progress / circumstance | Christensen (milkshake) | Jobs as progress toward an outcome; hire/fire metaphor | "Hire for a job", "functional/emotional/social job", "circumstance" |
| ODI / Universal Job Map | Ulwick | Jobs have 8 stable steps; outcome-driven innovation | "Desired outcome", "Universal Job Map", "JTBD process steps" |
| Switch interview | Moesta | Four forces govern switching behavior | "Push/pull/anxiety/habit", "Switch moment", "timeline interview" |
| Job stories | Klement | Context-first stories replacing user stories | "When [situation], I want [motivation], so I can [outcome]", jtbd.info |

**Mixing produces:** Outcomes that are too abstract (Ulwick) described as circumstances (Christensen) and analyzed with the wrong interview structure (Moesta's four forces don't apply to Ulwick's ODI outcomes). Teams argue about definitions instead of insights.

**The fix:** Pick one school per project. Recommendation: the Switch interview (Moesta) is the most immediately actionable for a product team — it reconstructs a specific decision moment and surfaces the four forces that govern switching. The job story format (Klement) pairs cleanly with Moesta's constructs and slots into an agile backlog.

**When JTBD is circular/unfalsifiable:** A JTBD statement that could describe anything ("When I want to feel productive, I hire X to help me get things done") is not a useful constraint. Good JTBD is narrow enough to rule out wrong decisions and specific enough to generate testable product bets.

---

## SITEMAP ≠ IA

**The failure:** Presenting a visually organized sitemap as a complete IA deliverable, without validating that the structure matches users' mental models.

**The mechanism:** A neat tree diagram satisfies a stakeholder presentation requirement and signals "we thought about structure." But a sitemap built from the org's internal logic — rather than from how users think about the content — will produce navigation that makes sense to the team and baffles users.

**Common examples:**
- Organizing by department ("Our Solutions > Enterprise > Finance > Reporting") when users think by task ("run my monthly report").
- Choosing labels that are internal jargon ("Resources", "Offerings") rather than user-language ("Guides", "Services").
- Building deep hierarchies (5 levels) when users tree-test shows they expect 2-3.
- Hiding frequently accessed content behind rarely-visited parent categories.

**The validation requirement (Rosenfeld/Morville):**
- **Card sorting** first: before labeling. Participants group and label content to reveal their mental model. Tells you how to organize and what to call things.
- **Tree testing** second: before visual design. Participants navigate a text-only tree to find content. Tells you if the structure actually works. A neat sitemap with a failed tree test is a broken IA.
- **Both, in order.** Card sort → revise structure and labels → tree test → iterate → then visual design.

**The Hick's law note:** Grouping nav items to reduce decision time (Hick–Hyman 1952) is a valid navigation principle for *unfamiliar* users making *time-critical* decisions. It does not mean "minimize all nav items" — Amazon's ~100 department links are not a Hick's law violation because users are *scanning* a visible list, not *recalling* from memory. Miller's law (Cowan ~4±1) is about working memory, not visible items. See `usability-principles.md` #hicks-law and #millers-law-revised-to-cowan.

---

## ABOVE-THE-FOLD MYTH

**The failure:** Treating "above the fold" as a hard rule for CTA placement, hero content, or key information — optimizing hard for the viewport boundary at page load.

**The evidence:** Nielsen Norman Group research (2024): 91% of users scroll. The fold is a soft gradient of attention, not a hard boundary. Content immediately below the fold receives less attention than above, but content further down — if the page earns the scroll — receives substantial engagement.

**The implication:** The hero section must earn the scroll (a compelling hook or clear value prop), but the CTA doesn't need to appear only above the fold. The persuasion spine places the primary CTA in the hero (at the start) and repeats it as a final CTA (at the end), with supporting sections in between. Users who scroll through all the supporting sections are MORE persuaded, not less — and a final CTA that appears after they've been fully persuaded converts better than a CTA they see before they understand the product.

**The fix:** Put a CTA above the fold. Also put one at the end. Design the scroll as a persuasion arc, not a race to place everything at the top.

---

## SUMMARY: THE HONEST PRE-FLIGHT CHECK

Before treating any journey artifact as actionable, run this check:

| Artifact | Pre-flight question |
|----------|-------------------|
| Journey map | Is the emotion curve grounded in research? Does this map have a named owner and a review cadence? |
| Funnel model | Are you using the loyalty loop / messy middle instead of a linear AIDA funnel? |
| Landing page | Do you know the awareness stage of the arriving visitor? Is each section matched to that stage? |
| JTBD work | Which school is in use? Is the vocabulary consistent throughout? |
| Sitemap | Has it been validated with a card sort and tree test? |
| CTA placement | Is the CTA placed where the user is persuaded, not just above the fold? |

A "no" to any of these is a flag — not to abandon the artifact, but to note that it is currently a hypothesis, not a validated design decision.
