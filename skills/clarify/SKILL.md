---
name: clarify
description: "Decomposes underspecified design requests by classifying gaps (missing brand context, visual ambiguity, false premises, scope faults) and generating targeted clarifying questions. Produces a confirmed design brief before any design work begins."
user-invocable: false
---

# Skill: clarify

Understand what the user needs before committing to design work.

LLMs default to assuming rather than asking — models overwhelmingly proceed without asking even when information is missing. This skill serves as the design workflow's clarifier: it classifies what's unclear about a design request and generates targeted questions to resolve it before any visual or structural work begins.

`adaptive-questioning.md` at `${CLAUDE_SKILL_DIR}/references/adaptive-questioning.md` is a shared reference: the plan pipeline's clarify gates also link to it (design lifecycle checkpoints use it for mode-switching).

Your output is a conversation: clarifying questions, differential examples, restatements. Think out loud WITH the user — collaborative exploration, not interrogation.

---

## Classifying What's Unclear

Not all gaps are the same. Classifying the type determines what kind of question to ask.

### Fault Types

**Intention faults** — The real design goal isn't recoverable from the request.
- Vague objectives: "Make it look better" / "make it more modern" / "make it pop" (better how? for whom? in what direction?)
- Indirect intent: "Can you check if this color works?" (often means "please fix the color system")
- Contextual irrelevance: user introduces an unrelated visual concern mid-design

**Premise faults** — An assumption in the request is wrong or unresolvable.
- Missing brand context: "Match our brand" with no DESIGN.md, style guide, or reference supplied
- False artifact state: "Update the existing tokens" when no DESIGN.md exists in the project
- Capability mismatch: asking for a visual output the current context can't supply (e.g., "export as Figma" when only HTML is possible)

**Parameter faults** — Required design details are missing or conflicting.
- Missing register: "Design a landing page" (brand or product register? marketing or SaaS tool?)
- Missing audience/device: "Make it responsive" (primary breakpoints? phone-first or desktop-first?)
- Missing mood/personality: "Clean and professional" (minimal and cold? warm and approachable? editorial and bold?)
- Contradictions: "Keep it simple but show everything"

**Expression faults** — The language prevents unique design interpretation.
- Lexical ambiguity: "Clean up the UI" (reduce density? simplify color? tighten spacing? all of the above?)
- Scope ambiguity: "Make it more accessible" (WCAG AA contrast only? motion sensitivity? keyboard navigation? all three?)
- Referential ambiguity: "Update that component" (which one? in which context?)

### Ambiguity Direction

Once you've identified a gap, classify which direction it pulls — this shapes your question:

| Direction | Signal | Clarification Action |
|-----------|--------|---------------------|
| **Semantic** | Design term has multiple valid meanings | Disambiguate: "do you mean X or Y?" |
| **Too broad** | Clear intent but scope spans multiple pillars | Specify: "which concern matters most right now?" |
| **Too narrow** | Request is oddly specific for the likely design goal | Generalize: "what's the broader outcome you're after?" |

### For Design Tasks Specifically

Three concrete ways a design request becomes ambiguous:

- **Missing goal**: the *why* is absent — only the *what* is stated ("add a hero section" with no brief on purpose or audience)
- **Missing premises**: design constraints are unstated (brand colors, target device, tone, accessibility tier)
- **Ambiguous terminology**: vague design words used where precise ones are needed ("modern" vs "minimal + editorial", "professional" vs "product-register restrained")

Inconsistencies between design requirements are easy to miss. Explicitly check whether parts of the request conflict (e.g., "bold and vibrant" + "calm and trustworthy" pull in opposite directions).

---

## Generating Questions

### Think in Hypotheses

Don't start with "what should I ask?" Start with "what are the plausible design directions?" Then find the question whose answer eliminates the most of them.

1. Generate 2–4 competing design interpretations of the request
2. Identify what distinguishes them — the axis of disagreement
3. Ask about that axis

**Example:**
- Request: "Redesign the dashboard"
- Interpretation A: Reduce visual noise — strip cards, tighten spacing, neutral palette
- Interpretation B: Establish brand identity — introduce accent, typeface, personality
- Interpretation C: Improve usability — rethink hierarchy, surface key actions, reduce cognitive load
- Axis: is this a visual/brand problem, a clarity/usability problem, or a density problem?
- Question: "What's the main complaint about the current dashboard — it doesn't feel like the brand, it's hard to read, or it's overwhelming?"

One question targeting the axis of disagreement beats three questions about visual details.

### Select for Information Gain

Among possible questions, ask the one that maximally reduces uncertainty across your interpretations. If question A would split your hypotheses 50/50 and question B would split them 90/10, ask A — it's more informative regardless of the answer.

Target convergence in 3–5 rounds. Beyond that, returns diminish sharply.

### Concrete Over Abstract

When possible, show the user what different interpretations produce rather than asking abstract questions:

- Weak: "What kind of visual tone are you after?"
- Strong: "If you mean editorial — high contrast, tight spacing, expressive type — the palette leans into dark neutrals. If you mean approachable — rounded forms, warm color, open spacing — it goes the other way. Which direction feels closer?"

Show differential design directions. Let the user pick based on observable descriptions, not abstract labels.

### Five Clarification Strategies

Match your approach to the fault type:

| Strategy | When | Example |
|----------|------|---------|
| **Ask for parameter** | Specific design detail is missing | "What's the primary device — phone or desktop?" |
| **Disambiguate** | Multiple valid design directions exist | "By 'modern,' do you mean minimal/flat or bold/expressive?" |
| **Propose alternatives** | Brand constraints make the request impossible as stated | "No DESIGN.md found. We can establish a design DNA first, or proceed in wireframe mode and layer tokens later." |
| **Confirm risk** | High-stakes design decision that's hard to undo | "Locking DESIGN.md commits the token system. Proceed, or adjust the palette first?" |
| **Report blocker** | A design prerequisite is genuinely absent | "No brand reference supplied. The core `design` mode establishes a design DNA — should we run that first?" |

---

## Question Quality

### Attributes

Every question should pass these checks:

| Attribute | Test |
|-----------|------|
| **Focused** | Addresses ONE gap — no compound questions |
| **Answerable** | User can answer from what they already know |
| **Discriminative** | The answer meaningfully narrows design directions |
| **Non-leading** | Doesn't presuppose the answer |
| **Task-relevant** | Directly advances the design work at hand |
| **Constructive** | Builds toward a confirmed brief, not just gathering data |

### Effort Awareness

Estimate the effort each question requires from the user:

| Effort | Example | Policy |
|--------|---------|--------|
| **Low** | "Phone-first or desktop-first?" | Ask freely — user already knows |
| **Medium** | "What's the emotional register — brand or product?" | Ask only if it materially changes the direction |
| **High** | "What does your current design system's token naming look like?" | Don't ask — investigate DESIGN.md / codebase yourself |

**The principle: ask about intent, goals, and brand context (the user's knowledge). Figure out technical and structural details yourself.**

---

## Managing the Conversation

### Track Intent State

Maintain two mental sets as the conversation progresses:

- **Confirmed** (+): design directions, constraints, and goals the user has validated
- **Ruled out** (−): directions the user has rejected or that contradict confirmed information

Score remaining design directions by alignment with confirmed items and conflict with ruled-out items. This naturally narrows the space with each turn.

### Decouple the Decisions

Three separate questions, in order:

1. **Should I clarify?** — Is there meaningful ambiguity that would change the design direction?
2. **What type of clarification?** — Which fault type and strategy apply?
3. **How do I phrase it?** — What specific question, with what framing?

Don't collapse these. Deciding to clarify and blurting out the first question that comes to mind skips the targeting step.

### Short-Circuit Rules

- If the brief is clear and you have no competing design directions, proceed directly.
- When asking and not-asking would produce equally good design outcomes, don't ask. Favor action on ties.
- If the user signals "just do it" or "whatever works," **switch to confirmatory mode** rather than going silent — state your design assumptions so the user can object. See [adaptive-questioning.md](${CLAUDE_SKILL_DIR}/references/adaptive-questioning.md) for mode-switching protocol and the genuine-low-stakes exception.

---

## Anti-Patterns

| Pattern | Problem | Instead |
|---------|---------|---------|
| Proceeding without checking | Default execution bias — wrong design direction is expensive | Run detection as a separate pass first |
| Asking about implementation details | "Which CSS framework?" is not a design question | Figure it out; ask about brand/audience/goal |
| Rapid-fire question lists | Feels like an intake form, not a collaboration | 1–3 questions max per turn |
| Asking what you could read from DESIGN.md | Wastes their time | Read DESIGN.md first, ask about what it doesn't cover |
| Over-asking on clear briefs | Delays work, erodes trust | If the brief is clear, proceed |
| Abstract questions | Hard for users to reason about visual direction | Show differential design directions |
| Leading questions | Biases response, masks intent | Open-ended, or balanced options |
| One round and done | Complex design briefs need iteration | Continue until directions converge |
| Asking when outcomes are equivalent | Unnecessary friction | Favor direct action on ties |

---

## Non-Duplication Note

This skill handles **design brief ambiguity** — the gaps that prevent knowing *what design to make*. It does NOT replace the core `design-for-ai` skill's intent detection (which mode to run: design, surface, fonts, color, audit, enhance, polish). If the user's request is design-mode-clear but the design brief itself is underspecified, invoke clarify. If the request is mode-unclear, the core skill routes it.

---

## Chain

| After | Next |
|-------|------|
| Ambiguity resolved, brief confirmed | Return to calling command with goal/audience/brand/constraints/register |
| New ambiguity surfaces during design work | Re-enter clarify loop |
