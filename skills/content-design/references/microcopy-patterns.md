# Microcopy patterns — the what, and the formulas

**Sources:** Yifrah *Microcopy: The Complete Guide* (2017/2022, Shelly Yifrah); Podmajersky *Strategic Writing for UX* (2019); Redish *Letting Go of the Words* (2007/2012); NN/g UX Writing Study Guide; GOV.UK Content Design Patterns; Material Design Writing Guidelines; Apple Human Interface Guidelines (Writing). Layer B of the two-layer catalog: the recurring copy solutions. A pattern catalog with no guiding principles is just a list — the formulas below are derived from the principles in `content-principles.md`.

---

## Table of Contents

1. [Error messages](#error-messages)
2. [Empty states](#empty-states)
3. [Button and CTA copy](#button-and-cta-copy)
4. [Form labels and helper text](#form-labels-and-helper-text)
5. [Confirmation and destructive action copy](#confirmation-and-destructive-action-copy)
6. [Onboarding and coach marks](#onboarding-and-coach-marks)
7. [Notifications and in-product messaging](#notifications-and-in-product-messaging)
8. [Tooltips and contextual help](#tooltips-and-contextual-help)
9. [This vs that — copy decisions](#this-vs-that--copy-decisions)
10. [Anti-patterns](#anti-patterns)

---

## ERROR MESSAGES

*The highest-stakes microcopy: a user is stuck, frustrated, or confused. Wrong copy here loses them.*

### Formula (Yifrah)

> **What happened** → **Why** (if not obvious) → **How to fix it** → **What happens next**

Not all four are always needed — but "what happened" and "how to fix it" are always present. Never a dead-end.

### Types and formulas

| Error type | Formula | Example |
|------------|---------|---------|
| **Validation error** (form field) | [What's wrong with this field] + [correct format or action] | "Email must include @. Try name@example.com." |
| **Authentication error** | [What happened] + [options available] | "That email and password don't match. Check your email or reset your password." |
| **Permission error** | [What they can't do] + [why, briefly] + [what they CAN do] | "Only editors can publish. Ask your workspace admin to change your role." |
| **Network / system error** | [What happened] + [whether data is safe] + [action to retry] | "Something went wrong on our end. Your changes were saved. Try again, or contact support if this keeps happening." |
| **Not-found (404)** | [What happened] + [what to do instead] | "We can't find that page. It may have moved. Try searching or go to the homepage." |
| **Empty search results** | [What the search found] + [why, if possible] + [alternative actions] | "No results for 'invoicess'. Check the spelling, or browse all invoices." |

### Rules (Yifrah; Nielsen #9)

- **Never blame the user.** "You entered an invalid email" → "That doesn't look like a valid email."
- **Never use technical error codes** as the only message. Codes in parens are fine for support reference; the human message must come first.
- **No exclamation marks** on error messages. Ever. (Yifrah: the user is already stressed.)
- **No "Oops".** Generic and adds nothing; feels dismissive when the problem is real data loss.
- **State what is safe.** If data was saved before the error, say so — reduces anxiety.
- **Tone: calm and direct.** Errors are not the place for personality; they are the place for precision.
- **Inline, near the problem.** Error messages placed at the top of a form make users hunt for the field; place them adjacent to the failing field (Nielsen #9: help users recognize, diagnose, recover).

---

## EMPTY STATES

*Empty states are first impressions, dead-ends, or opportunities — depending on how they're written. Four types (Redish; NN/g):*

### Four types and approaches

| Type | What it is | Copy approach |
|------|-----------|---------------|
| **First-use empty** | User has never added content | Explain what goes here + primary action + benefit or social proof |
| **User-cleared empty** | User deleted/archived everything | Acknowledge completion + next action (don't just show a blank screen) |
| **No-results empty** | Search or filter returned nothing | State what was searched + why no results (if possible) + alternative action |
| **Error empty** | Content failed to load | State what should be here + error reason briefly + retry action |

### First-use empty formula

> **[What this section does for them]** + **[What to do first]** + (optional) **[What it looks like when populated / social proof]**

Example: "Your projects will live here. Create your first project to get started. [Create project]"

Not: "No projects yet." (Dead-end — states the obvious, offers nothing.)

### No-results formula

> **"No [noun] for '[query]'"** + **[alternative action]**

Example: "No invoices for 'acme'. Try a different search, or browse all invoices."

Not: "No results found." (Doesn't confirm what was searched; offers no path forward.)

### Peak-end rule (Kahneman / usability cite-down)

Empty states are often the *end* of a user interaction (deleted all items, search failed). The peak-end rule applies: a positive ending improves the overall experience. A blank screen or a terse "nothing here" is a negative end — missed opportunity to guide, celebrate, or redirect.

---

## BUTTON AND CTA COPY

*The highest-action microcopy: these words determine whether the user acts or hesitates.*

### The rule (Yifrah; Nielsen #2)

**Label the action, not the interface element.** The button says what HAPPENS when clicked — the outcome or the action. Not the category or the system state.

| Wrong | Right | Why |
|-------|-------|-----|
| "Submit" | "Create account" / "Send application" / "Save changes" | Submit describes the mechanism; the label should describe the outcome |
| "OK" | "Got it" / "Continue" / "Delete photo" | OK is ambiguous; the label should confirm what the user is agreeing to |
| "Yes" (in a confirm dialog) | "Delete forever" / "Remove member" | Yes requires re-reading the question; the label should be self-contained |
| "Click here" | "Download the report" | Describes the interaction, not the value; fails without surrounding context |
| "Learn more" | "See all pricing plans" / "Read the case study" | Vague; tells the user nothing about what they'll find |

### Button hierarchy and copy register

| Button tier | Copy register | Examples |
|-------------|--------------|---------|
| Primary CTA | Active verb + specific outcome; most prominent | "Get started", "Create project", "Send message" |
| Secondary | Descriptive action; lower urgency | "Save draft", "Preview", "Export CSV" |
| Destructive | Specific + serious; no softening | "Delete account", "Remove member", "Cancel subscription" — never "Yes, delete" alone |
| Ghost/tertiary | Light; optional path | "Maybe later", "Skip", "Remind me" |
| Cancel (in dialogs) | Just "Cancel" | Escape from the action; no elaboration needed |

### Specificity formula

> **[Verb] + [Object]** = minimum. Add benefit or context only if the action is ambiguous without it.

- "Create account" ✓ (clear)
- "Upgrade to Pro" ✓ (clear + named plan)
- "Continue" — acceptable only when the next step is already visible in context
- "Send" — acceptable in a messaging context where Send is the obvious convention

### CTA and voice consistency

CTA copy is part of the voice system (Podmajersky). Formality register in CTAs should match the product's voice: a consumer app might say "Let's go"; a legal-workflow tool says "Submit filing". Both are specific; they differ in register.

---

## FORM LABELS AND HELPER TEXT

*The content layer that enables task completion. Most products under-invest here.*

### Label rules (Redish; WCAG 1.3.5; GOV.UK)

- **Always use a visible, persistent label.** Placeholder text disappears on focus — it cannot be the only label (WCAG 1.3.1, 1.3.5). Top-aligned labels are fastest to scan (eye movement study: Penzo 2006).
- **Label the field with what you need, not what the field is.** "Email address" beats "Email" (reduces ambiguity on multi-email products). "Business name (as it appears on your license)" beats "Business name".
- **Use the user's vocabulary.** "Card number" not "PAN". "Routing number" is a US term; consider "Bank routing number (9 digits, bottom-left of check)" for context-dependent terms.
- **Mark required fields, not optional ones** (when most fields are required). The asterisk convention (*) is widely understood but always needs a legend.
- **Optional / required explicitly** on forms where it's balanced. GOV.UK model: "optional" in brackets after the label, never asterisks alone.

### Helper text rules

| Use case | What to write |
|----------|--------------|
| **Format clarification** | The exact format needed or an example: "MM/DD/YYYY" or "e.g. 01/15/2025" |
| **Why we need this** | Brief justification that builds trust: "Used to verify your identity — never shared" |
| **What happens next** | When the field triggers something non-obvious: "Changing this email will log you out of all devices" |
| **Constraints** | Character limits if meaningful; valid values if restricted: "Password must be at least 12 characters" |

Helper text is **not** a retry location for the label. If the label is clear, helper text is optional. If the label needs a paragraph to explain, the label is wrong.

### Validation copy

**Reward early, punish late** (NN/g, Holst 2016):
- Success state on valid input: show inline confirmation as soon as the field validates (✓ green checkmark or brief "Looks good").
- Error state: show AFTER the user has had a chance to fill the field (on blur or on submit, not on keystroke for most fields — exception: character counts and real-time availability checks).

---

## CONFIRMATION AND DESTRUCTIVE ACTION COPY

*Copy that prevents irreversible mistakes. Stakes are highest here.*

### The stakes-clarity rule (Yifrah; Nielsen #5 error prevention)

The copy must make the consequence unmistakable. A user who clicks "Delete account" and sees "Are you sure?" does not know what they're about to lose. A user who sees "Delete your account permanently? Your 3 projects, 47 files, and billing history will be removed and cannot be recovered." knows exactly what they're about to do.

### Destructive confirmation formula

> **[What will be deleted/removed/cancelled]** (specific) + **[consequence + permanence]** + **[alternative if one exists]**

Example:
- Dialog title: "Delete 'Q3 Budget Report'?"
- Body: "This file will be permanently deleted and can't be recovered."
- Confirm button: "Delete forever"
- Cancel: "Cancel"

Not:
- "Are you sure?" (vague)
- "This action cannot be undone." (true but un-grounded — what action?)
- "Yes, delete" (requires reading the question to parse)

### Soft destructive vs hard destructive

| Type | Approach | Example |
|------|----------|---------|
| **Reversible** (trash, archive, soft delete) | State the reversibility; offer undo | "Moved to Trash. Undo" (snackbar) |
| **Irreversible** | Explicit consequence + permanent | "Deleted. This cannot be undone." |
| **High-stakes irreversible** (account deletion, payment) | Require confirmation input (type the name or "DELETE") + full consequence list | "To confirm, type DELETE below. Your account, all data, and billing history will be permanently removed." |

---

## ONBOARDING AND COACH MARKS

*The minimum a user needs to reach their first success. Not a feature tour.*

### Principles (Yifrah; NN/g; goal-gradient effect — usability cite-down)

- **One goal**: what is the single action a new user must take to experience the product's core value? Everything else is secondary.
- **Show, don't tell**: "Create your first project" + a visible [Create project] button is more effective than three sentences explaining what projects are.
- **Deferred sign-up where possible**: let users reach value before asking for commitment (peak-end; the investment they've already made motivates sign-up).
- **Coach marks over carousels**: point to the specific control at the moment it matters; do not front-load a slide deck that explains every feature (NN/g: most users click through without reading).
- **Minimum viable onboarding**: 1–3 steps max for a first-run flow; additional depth is progressive disclosure triggered by the first actual use.

### Coach mark formula

> **[What this control does for them]** + (optional) **[when to use it]**

Not: "Click here to see the menu." (User-centric: what the menu does.)
Yes: "Your team's projects and recent files live here." (pointing to sidebar)

### Onboarding copy tone

Warmer register is appropriate (voice chart tone-shift to first-use/welcoming). But:
- Keep sentences short — new users are orienting, not reading.
- Avoid "we're so excited to have you here!" platitudes — start with the user, not the company.
- Progress indicators (goal-gradient effect): showing Step 1 of 3 increases completion versus no indicator.

---

## NOTIFICATIONS AND IN-PRODUCT MESSAGING

*The copy that keeps users informed without interrupting them.*

### Notification types and formulas

| Type | Formula | Tone |
|------|---------|------|
| **Success toast** | "[Action] [completed/saved/sent]." + (optional) undo | Warm, brief |
| **Warning banner** | "[What will happen] + [when] + [action to prevent it]" | Calm, specific, no alarm |
| **Info/announcement** | "[What's new/changed] + [why it helps] + [action or dismiss]" | Clear, benefit-forward |
| **Upgrade prompt** | "[Specific feature they tried/need] + [plan that includes it] + [CTA]" | Relevant, not pushy |
| **Email digest** | "[Summary of what happened] + [primary action to take]" | Scannable, value-first |

### Notification rules (Nielsen #1 visibility of status)

- **Timely and specific**: a notification that says "Something happened" is worse than no notification.
- **Actionable**: if no action is needed, consider whether the notification is necessary.
- **Dismissable**: users must be able to clear or snooze; un-closable notifications are a dark pattern.
- **No notification inflation**: if everything is "urgent" or "important", nothing is. Reserve urgency language for genuine time constraints.

---

## TOOLTIPS AND CONTEXTUAL HELP

*Just-in-time information at the point of need.*

### Tooltip rules (Redish; Nielsen #10 help and documentation)

- **Triggered by need, not by hover alone.** Screen-reader and keyboard users must be able to access tooltip content. Use `aria-describedby` or visible helper text instead of tooltip-only information.
- **One sentence.** Tooltips that open to a paragraph are not tooltips; they're help text. If the content needs more than 1–2 short sentences, use a help page or drawer.
- **Answer "what does this do?" not "how to use the feature".** "Saves a draft without sending" beats "Use this button when you want to pause your work and continue later."
- **Avoid tooltips on primary CTA buttons.** If the primary action needs a tooltip to explain it, the button label is wrong — fix the label.

### Progressive disclosure (Nielsen; cognitive load / usability cite-down)

Tooltips and "Learn more" links are the lowest tier of disclosure. Reserve tooltip-level help for secondary controls and edge cases. The primary path should be self-evident from labels and layout.

---

## THIS VS THAT — COPY DECISIONS

| Situation | Choose | Over | Reason |
|-----------|--------|------|--------|
| Confirming a destructive action | Specific consequence in button ("Delete forever") | Generic "Yes" or "Confirm" | User must be able to parse the action from the button alone |
| Search with no results | "No [things] for '[query]'" | "No results found." | Confirms what was searched; models the language to retry |
| Form success | Specific outcome ("Profile saved") | "Success!" | States what happened, not just that something did |
| Long operation in progress | "Generating your report… this takes about 30 seconds" | Spinner alone | Doherty threshold and visibility of status (usability cite-down) |
| Required field indicator | "required" in label or * with legend | Color alone | Color alone fails WCAG 1.4.1 (use of color) |
| Permission error | State what IS possible | State only what isn't | Positive framing (Redish); gives a path forward |
| Greeting copy (welcome email) | "Here's what you can do next" | "We're excited to have you!" | Reader-centric vs writer-centric; task-oriented |

---

## ANTI-PATTERNS

| Anti-pattern | Why it fails | Fix |
|--------------|-------------|-----|
| **"Oops"** on error messages | Diminishes real problems; feels dismissive | State what happened, no personality wrapper on errors |
| **"Are you sure?"** dialogs | Requires re-reading context to parse; vague | State the specific action and consequence in the dialog body |
| **"Invalid input"** as validation copy | Developer output; no user instruction | Tell them what's wrong and how to fix it |
| **Exclamation marks on errors** | Creates alarm or incongruity | Reserve ! for genuine user successes (Yifrah) |
| **Placeholder as label** | Label disappears on focus; fails WCAG 1.3.1 | Persistent top-aligned label always; placeholder is example only |
| **"Click here"** links | Non-descriptive in context; fails screen-reader scan | Descriptive link text: what the user gets when they follow it |
| **Feature-tour onboarding** | Users skip it; explains before the user needs to know | Point to controls at moment of need; progressive disclosure |
| **"We"** language in error messages | Centers the company, not the user's problem | "Your payment didn't go through" not "We couldn't process your payment" (subtle but tested) |
| **"Please" in every sentence** | Filler; creates false formality | Use "please" sparingly — when asking for something that costs the user real effort |
| **Jargon for authority** | Insiders understand; everyone else excluded | Use user vocabulary; domain terms get one-time plain-language definition |
