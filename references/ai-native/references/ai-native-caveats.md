# AI-native caveats — the honest-citation layer

The guardrail that keeps this pillar honest. AI-native is the one design-foundations pillar with
**no settled canon**: its guidance is principle-derived from emerging practitioner sources, not
distilled from established books like the other seven pillars. Load this before making any strong
or prescriptive claim, and surface the canon gap in the deliverable.

## Table of Contents

1. [Red flags](#red-flags)
2. [The no-settled-canon warning](#the-no-settled-canon-warning)
3. [Where conventional operability still governs](#where-conventional-operability-still-governs)
4. [How to weight principle-derived guidance](#how-to-weight-principle-derived-guidance)
5. [Common mistakes](#common-mistakes)

---

## Red flags

Stop and reframe when you catch yourself (or the user) doing any of these:

- **Presenting AI-native advice as settled best practice.** It is not. There is no canon to appeal
  to. Say "current thinking holds…" not "the rule is…".
- **Applying a classical framework to a substrate AI removed.** Journey-mapping a no-fixed-screen
  agent; auditing affordances on a UI that generates its controls per request. Name the strain
  (`ai-native-principles.md`, framework-strain model) and substitute instead.
- **Inventing a citation.** Because no canon exists, the temptation to dress a guess as a sourced
  claim is highest here. If the source is a practitioner essay, say so; if there's no source, say
  it's the designer's own inference and mark it.
- **Confident prescription on an open question.** When the honest answer is "this is unsettled —
  here are the trade-offs," giving a single confident answer is the failure mode.

## The no-settled-canon warning

The pillar-landscape research classes AI-native / agent UX as **"🔵 emerging, HIGH interest (no
canon)."** Where the other pillars anchor in established books — usability in Norman/Krug/Lidwell,
content-design in Yifrah/Podmajersky, data-viz in Tufte/Few/Cairo, journey in Garrett, behavioral
in Cialdini/Kahneman, ethics in Brignull/Monteiro, design-systems in Frost/Kholmatova — AI-native
has only:

- **Robert Wilson, *Age of Invisible Machines* (2022)** — conversational/agentic strategy.
- **Victor Dibia — agent-UX principles** (practitioner writing, not a book canon).
- **Smashing Magazine, "Designing for AI Beyond Conversational" (2024)** — practitioner essay.

These are starting points, not settled doctrine. The field is moving faster than any book can
fix. So:

- **Cite the principle AND the gap.** "Dibia argues agents should be inspectable — but note this
  is emerging practice, not established canon."
- **Budget a follow-up research pass.** The plan flags this pillar as the one most likely to need
  re-research (plan uncertainty note, Phase 6). When a claim feels load-bearing and thin, say so
  and recommend verifying against current practice.

## Where conventional operability still governs

AI-native does **not** replace usability — it sits on top of it. The fixed parts of any AI
interface still obey conventional operability, and you cite usability *down* for them (never the
reverse — citation is one-way, `foundations-standards.md` §5):

- The **input box, primary controls, and confirm step** are fixed UI — Fitts's law, Hick's law,
  Nielsen's heuristics apply unchanged. See `usability-principles.md`.
- **Consistency and recognition-over-recall** (Nielsen #4, #6) govern the fixed anchors that
  persist across generated sessions.
- **Error prevention and user control** (Nielsen #5, #3) govern the reversible/confirmed-action
  pattern for autonomous behavior.

The AI-native contribution is everything *above* that fixed layer — the generated, non-deterministic,
goal-delegated part. Don't reinvent usability inside it.

## How to weight principle-derived guidance

| Confidence in the claim | How to present it |
|-------------------------|-------------------|
| Backed by a named practitioner source | "Dibia/Wilson/Smashing holds X — emerging practice, not settled canon." |
| A reasonable inference from a classical pillar | "By analogy to usability's error-prevention, X — but untested for agents." |
| The designer's own judgment, no source | "My read is X; this is unsettled — verify against current practice." |
| Genuinely open | "This is an open question. Here are the trade-offs; pick by your risk tolerance." |

The honest move, always, is to make the weight visible so the reader can discount appropriately.

## Common mistakes

- **Over-claiming.** The pillar's headline risk. When unsure, present trade-offs, not a verdict.
- **Treating emerging sources as canon.** Wilson/Dibia/Smashing are signposts, not scripture.
- **Dropping usability.** The fixed layer of an AI UI is conventional UI; cite usability for it.
- **Hiding the canon gap from the user.** The deliverable must say where it stands on unsettled
  ground — omitting that is the same failure as a fabricated citation.
