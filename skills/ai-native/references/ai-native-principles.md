# AI-native principles — the constructive layer

The working material for designing agent, conversational, and generative interfaces: the
framework-strain diagnostic in depth, agent-UX principles, generative-UI patterns, and
trust-calibration techniques. **Every principle here is principle-derived, not book-canonical**
(see `ai-native-caveats.md`); cite the source *and* the canon gap.

## Table of Contents

1. [Key definitions](#key-definitions)
2. [Core principles](#core-principles)
3. [The framework-strain model](#the-framework-strain-model)
4. [Agent UX / AX — design patterns](#agent-ux--ax--design-patterns)
5. [Generative / non-deterministic UI](#generative--non-deterministic-ui)
6. [Conversational / agentic UI](#conversational--agentic-ui)
7. [Trust-and-control techniques](#trust-and-control-techniques)
8. [This vs that](#this-vs-that)
9. [Common mistakes](#common-mistakes)

---

## Key definitions

- **AI-native interface** — one whose screen, affordances, or content are produced by a model at
  runtime, not authored ahead of time. The defining break: there is no fixed substrate to learn.
- **Agent UX / AX** — the experience of directing a system that takes *goals* and *acts*, rather
  than operating controls step by step. The user delegates; the agent executes and reports.
- **Generative / non-deterministic UI** — the model assembles layout, copy, or component set per
  request. The same input can yield different output across sessions.
- **Goal contract** — the explicit agreement of what the user asked for, what the agent will and
  won't do, and where it stops to confirm. The AI-native analog of a fixed click-path.
- **Grounding** — showing what the system understood before it acts, so the user can correct a
  misunderstanding before it has consequences.

## Core principles

- **Principle-derived, marked as such.** No book canon exists (research: design-pillar-landscape,
  AI-native is "🔵 emerging, no canon"). Sources are practitioner essays: Dibia (agent-UX
  principles), Wilson *Age of Invisible Machines* (2022), Smashing "Designing for AI Beyond
  Conversational" (2024). Cite them, and flag every claim as unsettled.
- **AI removes the substrate; name what it removed.** The classical canon assumes human-authored,
  screen-delivered, click-based UIs (research COUNTER #2). The design move is to identify *which*
  fixed thing the AI took away, then substitute deliberately — not to keep applying a framework
  that no longer has its substrate.
- **Inspectability beats blind trust.** A user can only trust an agent they can audit. Surface the
  steps, tool calls, and sources; let the user see *why*, not just *what*.
- **Reversibility over confirmation, confirmation over silence.** Prefer undo; where undo is
  impossible, confirm before consequential action; never act silently on something destructive
  (cite usability: error prevention, Nielsen #5).
- **Keep fixed anchors.** Even in a generated interface, the primary input, the way home, and the
  stop control should stay stable across sessions, so the user relearns nothing essential.

## The framework-strain model

The deepest forward-looking finding (research COUNTER #2): the whole classical canon assumes a
fixed substrate. When AI removes one, a specific pillar strains. Diagnose, then substitute.

| AI removes | Pillar that strains | Why it strains | Substitute |
|------------|---------------------|----------------|-----------|
| **Fixed screens** | Journey mapping (`journey`) | Journey maps chart a stable sequence of touchpoints; a generated UI has no fixed pages to chart | Design the **goal contract** + recovery paths (intent → outcome), not the page sequence |
| **Stable affordances** | Interaction design (signifiers/affordances, Norman) | Affordance learning assumes a fixed control set the user masters over time | **Progressive disclosure of capability**; make actions inspectable and reversible so the user needn't pre-learn them |
| **Stable content** | Content design (`content-design`) | UX writing assumes authored, reviewable copy; generated copy is written at request time | Voice/tone as a **generation constraint** the model obeys + guardrails on what it may say |
| **Autonomous action** | Ethics (`deceptive-patterns`) | Dark-pattern audits assume a human pulls each lever; an agent can act unprompted | **Consent + transparency + human-in-the-loop** before consequential action |

The point is not that the classical pillars are obsolete — they still govern the *fixed* parts of
an AI interface. The point is to stop applying a pillar to a substrate it no longer has.

## Agent UX / AX — design patterns

- **The goal contract.** State what the user asked for, what the agent will/won't do, and the
  stop-to-confirm points. This replaces the fixed click-path as the thing the user reasons about.
- **Inspectable execution.** Show intermediate steps, tool invocations, and sources. The user
  audits rather than trusts blindly.
- **Reversible or confirmed actions.** Undo where possible; a checkpoint before anything
  destructive otherwise (usability: Nielsen #5 error prevention, #3 user control and freedom).
- **Designed failure + handoff.** Define what happens when the agent is wrong, low-confidence, or
  out of scope — including escalation to a human or to a deterministic path.
- **Scoped autonomy.** Let the user set how much the agent may do unprompted; default conservative,
  widen on demonstrated trust.

## Generative / non-deterministic UI

- **Constrain the generation space.** Give the model a component vocabulary and a layout grammar
  to compose within. Output is novel but never chaotic.
- **Fixed anchors stay fixed.** Primary input, home, and the stop control persist across sessions;
  cite usability for those (consistency, Nielsen #4; recognition over recall, #6).
- **Design for variance.** The same request may render differently. Ensure variance never breaks
  trust or task completion — test the *distribution* of outputs, not one happy path.
- **Determinism on demand.** Offer a way to pin or re-pin a generated view the user liked, so
  non-determinism is a feature they control, not a surprise they suffer.

## Conversational / agentic UI

- **Turn-taking and repair.** Design how the user corrects a misunderstanding, interrupts, or
  restarts mid-task. Repair is the most-used and least-designed conversational affordance.
- **Grounding before action.** Show what the system understood before acting on it.
- **Conversation is not always the fastest path.** A button beats a sentence for a known, frequent
  action (cite usability: Fitts's law — a large close target is faster than composing a request).
  Offer fixed controls alongside the conversation.

## Trust-and-control techniques

- **Confidence calibration.** Show uncertainty honestly; never render a guess as a fact. This
  mirrors the system-wide cite-the-principle / no-unsourced-opinion posture.
- **Always leave an exit.** A path back to a deterministic, human-operable flow at every step.
- **Source attribution.** Where the agent's output rests on data, show the data — the user
  verifies rather than trusting.
- **Mark the canon gap in the deliverable.** Note which recommendations are principle-derived and
  unsettled, so the reader weights them correctly.

## This vs that

| This (AI-native) | That (classical) | The boundary |
|------------------|------------------|--------------|
| Goal contract | User/task flow (`journey`) | A flow charts fixed steps; a goal contract bounds an agent's autonomy when the steps aren't fixed |
| Generated layout grammar | Visual DNA / DESIGN.md (core `design`) | DNA fixes the look; the grammar bounds what the model may generate within that look |
| Voice as generation constraint | Authored microcopy (`content-design`) | Content design writes the words; here you write the *rules* the model writes words by |
| Conversational repair | Form validation (`usability`) | Both recover from error; repair is open-ended dialogue, validation is a fixed-field check |

## Common mistakes

- **Treating AI-native guidance as settled.** It isn't. Prescribing confidently on an unsettled
  question is the headline failure mode (see `ai-native-caveats.md`).
- **Abandoning usability inside an agent UI.** The fixed parts — input box, controls, confirm step
  — still obey conventional operability. Cite usability for them; don't reinvent.
- **All-conversation, no controls.** Forcing every action through chat when a button is faster.
- **Unbounded generation.** Letting the model assemble UI with no component vocabulary or layout
  grammar — novelty becomes chaos and trust collapses.
- **Silent autonomous action.** Acting on something consequential without consent, transparency, or
  a checkpoint — the ethics strain, unaddressed.
