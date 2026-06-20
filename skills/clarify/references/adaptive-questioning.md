# Adaptive Questioning

How to question the user without changing what you need to know — only what they have to type.

Used by `clarify` and any design workflow gate that asks the user a question (free-form, or option-list).

---

## Two Modes

**Exploratory (default).** Open-ended questions targeting the axis of disagreement between design directions. The user provides the answer.

**Confirmatory.** You still ask every question you need answered — but you supply your best-guess answer and let the user confirm or correct. The completeness bar usually does not change. Only the cost to the user drops.

| Exploratory | Confirmatory equivalent |
|-------------|------------------------|
| "What should the primary surface be — phone or desktop?" | "I'm assuming phone-first given the app context — correct?" |
| "What's the brand register — bold/editorial or restrained/product?" | "This looks product-register (app UI, not marketing), so I'll use restrained color and system fonts unless you say otherwise." |
| "Which mood — minimal/cold, warm/approachable, or bold/expressive?" | "I'll go with warm/approachable based on the copy tone. Push back if you want something different." |

---

## When to Switch

**To confirmatory:** short or terse replies, "just do it," "whatever works," "I don't care," answering a multi-part question with one word, expressing impatience. Don't wait for explicit frustration — early signals are enough.

**Back to exploratory:** the user gives a detailed, engaged answer to a confirmatory question; volunteers new brand context unprompted; asks you to slow down or explore options.

The transition is per-conversation, not permanent. Read the room each turn.

---

## Inside Option Menus

Confirmatory mode still works in a structured option list — encode your assumption in the option labels and ordering:

- Make your recommended option the first or clearly-labeled choice: `"Phone-first (my assumption — looks like a mobile app)"`
- Keep the other real options selectable so the user can override without typing.
- Keep an "Elaborate" / "Different direction" escape hatch when the design direction is high-stakes.

This preserves the gate (user still answers) while collapsing the cognitive load.

---

## Honest Caveat

The "bar doesn't change" claim is *usually* true but not absolute. On genuinely low-stakes design calls, "just do it" can mean *the user is accepting a lower fidelity bar in exchange for speed*. Don't manufacture questions to satisfy a checklist when the user has explicitly traded rigor for velocity. Use judgment:

- **High stakes** (locking DESIGN.md, committing a token system, major layout restructure) → keep every question, just switch to confirmatory.
- **Low stakes** (wireframe fidelity, placeholder copy, greyscale-only mock) → drop the question entirely.

When uncertain, prefer confirmatory over silent assumption.

---

## Anti-Patterns

| Pattern | Problem | Instead |
|---------|---------|---------|
| Going silent on "just do it" | Hidden design assumptions ship without review | Switch mode, state the assumption, let them object |
| Asking the same design question after the user typed "whatever" | Ignores the signal | Confirmatory — supply the design direction |
| Confirmatory questions phrased as leading statements | "I assume you want X, right?" with no real out | Offer the alternative: "X unless you'd rather Y" |
| Permanent mode lock | Reading the user once and never re-reading | Re-evaluate each turn; engagement can return |
