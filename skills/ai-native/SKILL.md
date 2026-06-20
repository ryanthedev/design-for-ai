---
name: ai-native
description: "Designs agent and LLM-driven interfaces whose screen, affordances, and content are generated at runtime, not authored ahead — agent UX / AX, conversational and agentic interfaces, generative and non-deterministic UI, no-fixed-screen interaction, AI trust and control surfaces, and the diagnostic for which classical pillar strains when AI removes its fixed substrate (no screens strains journey mapping; no affordances strains interaction; no fixed content strains content design; autonomous action strains ethics). Explicitly flags its guidance as principle-derived, not book-canonical — no settled canon yet (Dibia; Wilson; Smashing). Use when the question is about agent UX, AX, designing for AI, LLM interface design, chat or agentic UI, generative or runtime-generated UI, no-fixed-screen design, or AI trust and control. Not for: conventional screen-UI operability and heuristics (use usability); the visual look, fonts, or color (use core design); a conversational voice surface as a device class (use core surface)."
user-invocable: true
argument-hint: "[agent UX, generative UI, or AI-interface context]"
---

AI-native design specifies interfaces whose screen, affordances, and content are produced at runtime by a model rather than authored ahead of time — agent UX, conversational and agentic UI, and generative non-deterministic UI. **There is no settled canon for this pillar.** Unlike the other design pillars (each anchored in established books), this one is principle-derived: drawn from practitioner essays and emerging sources, marked as such on every claim. Cite the principle *and* the canon gap.

## When this applies

- Designing an **agent UX / AX** surface — a system that takes goals and acts, rather than rendering controls the user operates step by step.
- Designing **conversational or agentic UI** — chat, tool-calling assistants, multi-step autonomous flows.
- Designing **generative / non-deterministic UI** — where the model assembles the layout, copy, or component set at request time, so no two sessions are identical.
- Building a **no-fixed-screen** interface — no stable set of pages to map, no fixed affordances to learn.
- Calibrating **trust and control** for AI output — confidence display, undo, correction, escalation to a human or a deterministic path.
- Diagnosing **which classical pillar strains** when AI removes its fixed substrate, and what to substitute.

Not for: whether a conventional screen is operable — heuristic evaluation, UX laws, affordances on a fixed UI (use `usability`); the visual DNA, fonts, or color (use core `design`); a voice or conversational surface treated as a *device class* with its own layout constraints (use core `surface`).

## Rules

- **No settled canon — say so.** This pillar has no book-anchored canon (research: design-pillar-landscape, "🔵 emerging, no canon"). Every recommendation names its principle-level source (Dibia agent-UX principles; Wilson *Age of Invisible Machines* 2022; Smashing "Designing for AI Beyond Conversational" 2024) **and** flags that it is principle-derived, not established practice. Do not present it as settled. Load `references/ai-native-caveats.md` before making strong claims.
- **Don't over-claim.** When the right answer is "this is unsettled — here are the trade-offs and the current thinking," say that. Confident prescription on an unsettled question is the failure mode this pillar exists to avoid.
- **AI breaks the frameworks — name which one, then substitute.** The classical canon assumes human-authored, screen-delivered, click-based UIs (research COUNTER #2). When AI removes a fixed substrate, a specific pillar strains. Diagnose which, then bring the substitute (the Procedure). Don't apply a strained framework as if it still held.
- **Cite usability down where it still applies.** Inside an agent UI, conventional operability still governs the parts that *are* fixed — the input box, the controls, the confirmation step. Cite usability laws (Fitts, Hick, Nielsen) by name for those; never re-derive them here. Citation points down to `usability`, never the reverse.
- **Stay generative.** Produce the design recommendation or the diagnostic — don't degrade into a taxonomy of what's uncertain. The framework-strain model is the organizing spine, not a box-ticking sequence.

## Procedure

### A. Orienting question: is the substrate fixed or generated?

Load `references/ai-native-principles.md`. Establish what the AI removes:

| The interface has… | Then… | Reach for |
|--------------------|-------|-----------|
| A fixed set of screens/pages | Journey mapping still works | core/`journey` — not this pillar |
| Generated layout/content per request | No stable pages to map | the generative-UI section below |
| Goal-taking agent behavior | No fixed click-path | the agent-UX section below |
| A conversational front door | Turn-taking, repair, grounding | the conversational section below |

### B. The framework-strain diagnostic

When AI removes a fixed substrate, name which classical pillar strains and substitute (research COUNTER #2; depth in `ai-native-principles.md`):

| AI removes | Classical pillar that strains | Substitute the pillar with |
|------------|-------------------------------|----------------------------|
| Fixed screens | **Journey mapping** (`journey`) assumes a stable touchpoint sequence | Intent-and-outcome framing: design the *goal contract* and the recovery paths, not the page sequence |
| Stable affordances | **Interaction design** (signifiers/affordances, Norman) assumes the user learns a fixed control set | Progressive disclosure of *capability*; make the agent's actions inspectable and reversible |
| Stable content | **Content design** (`content-design`) assumes authored copy | Voice/tone as a *generation constraint* the model obeys, plus guardrails on what it may say |
| Autonomous action | **Ethics** (`deceptive-patterns`) assumes a human pulls each lever | Consent, transparency, and a human-in-the-loop checkpoint before consequential action |

### C. Agent UX / AX

When the system takes goals and acts:

1. Design the **goal contract** — what the user asks for, what the agent will and won't do, where it stops to confirm.
2. Make the agent **inspectable** — surface intermediate steps, tool calls, and sources so the user can audit, not just trust.
3. Make consequential actions **reversible or confirmed** — undo, or a checkpoint before anything destructive (cite usability: error prevention, Nielsen #5).
4. Design for **failure and handoff** — what happens when the agent is wrong, low-confidence, or out of scope; the escalation to a human or a deterministic path.

### D. Generative / non-deterministic UI

When the model assembles the interface at runtime:

1. Constrain the generation space — a component vocabulary and layout grammar the model composes within, so output is novel but not chaotic.
2. Keep **fixed anchors** — the parts users must relearn nothing about (primary input, navigation home, the stop control) stay stable across sessions; cite usability for those.
3. Plan for **non-determinism** — the same request may render differently; design so that variance never breaks trust or task completion.

### E. Conversational / agentic UI

When a conversation is the front door:

1. Design **turn-taking and repair** — how the user corrects a misunderstanding, interrupts, or restarts.
2. Provide **grounding** — show what the system understood before it acts on it.
3. Don't make conversation the *only* path when a fixed control is faster (cite usability: a button beats a sentence for a known action).

### F. Trust and control

Across all of the above:

1. **Calibrate confidence** — show uncertainty honestly; never present a guess as a fact (mirrors the core cite-the-principle / no-unsourced-opinion posture).
2. **Always leave an exit** — a way back to a deterministic, human-operable path.
3. **Mark the canon gap** in the deliverable — note where the recommendation is principle-derived and unsettled, so the reader weights it correctly.

## References

| Reference file | Load when |
|----------------|-----------|
| `references/ai-native-principles.md` | The constructive layer: the framework-strain model in depth, agent-UX principles (Dibia/Wilson/Smashing), generative-UI patterns, conversational/agentic UX, trust-calibration techniques. |
| `references/ai-native-caveats.md` | The honest-citation layer: the no-settled-canon warning in depth, the over-claim guard, where conventional operability (usability) still governs, and how to weight principle-derived guidance. Load before any strong or prescriptive claim. |
