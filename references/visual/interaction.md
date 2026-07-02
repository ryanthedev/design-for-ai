# Interaction Design for Interfaces
**Source:** Modern frontend design principles
**Core Concept:** Every interactive element must communicate its current state across its full lifecycle: default, hover, focus, active, disabled, loading, error, and success. Users should never wonder "did that work?", "can I click this?", or "what went wrong?"

---

## Table of Contents

1. [KEY DEFINITIONS](#key-definitions)
2. [DETECTION CHECKLIST](#detection-checklist)
3. [DESIGN REVIEW CRITERIA](#design-review-criteria)
4. [RED FLAGS](#red-flags)
5. [IMPLEMENTATION CHECKLIST](#implementation-checklist)
6. [DESIGN TRANSFORMATION PATTERNS](#design-transformation-patterns)
7. [CORE PRINCIPLES](#core-principles)
8. [THIS VS THAT](#this-vs-that)
9. [DESIGN DECISION TABLE](#design-decision-table)
10. [TECHNIQUE REFERENCE](#technique-reference)
11. [COMMON MISTAKES](#common-mistakes)

---

## KEY DEFINITIONS

> **Interactive state:** one of the eight visual conditions an element can be in: default, hover, focus, active, disabled, loading, error, success.

> **Affordance:** a visual property that suggests how an element can be used. A raised button affords pressing; an underlined word affords clicking.

> **Focus ring:** a visible outline around the currently focused element, letting keyboard users see where they are in the interface.

> **:focus-visible:** a CSS pseudo-class that applies focus styles only when the user navigates with a keyboard, avoiding focus rings on mouse clicks.

> **Focus trap:** a pattern that constrains keyboard focus within a container (such as a modal dialog) so Tab and Shift+Tab cycle only through elements inside it.

> **inert:** an HTML attribute that makes an element and all its descendants non-interactive and invisible to assistive technology. Used on background content when a modal is open.

> **Optimistic UI:** a pattern that immediately shows the expected result of an action before the server confirms it, reverting only if the action fails.

> **Skeleton screen:** a placeholder layout that mirrors the shape of incoming content, giving users a sense of structure while data loads.

> **Progressive disclosure:** revealing information or options incrementally as the user needs them, rather than showing everything at once.

> **Destructive action:** an action that can't be easily undone (deleting, overwriting, sending), requiring confirmation or undo capability.

> **Touch target:** the tappable area of an interactive element; must be at least 44x44px (WCAG 2.5.8) for reliable finger input.

> **Roving tabindex:** a focus management pattern for composite widgets (toolbars, tab lists) where arrow keys move focus within the group and Tab moves to the next group.

> **aria-describedby:** an ARIA attribute that associates an element with a description (such as an error message), so screen readers announce it when the element gets focus.

> **Popover:** the HTML `popover` attribute for creating non-modal overlays that dismiss automatically when the user clicks outside or presses Escape.

---

## DETECTION CHECKLIST

This reference applies whenever an interface leaves users guessing about state -- buttons that look
identical whether resting, hovered, or disabled, no visible focus indicator when tabbing through the
page, or form inputs relying on placeholder text as their only label. It also applies to the
CSS/HTML/JS tells behind those symptoms: `outline: none` with no replacement focus style, click
handlers with no loading-state management, or modals implemented without focus trapping. The
developer statement that gives it away: "Focus rings are ugly, so I removed them" -- treating a
state signal as a cosmetic nuisance.

---

## DESIGN REVIEW CRITERIA

Must pass: all interactive elements have visible focus indicators, which fails whenever
`outline: none` is used without a replacement focus style; all 8 states (default, hover, focus,
active, disabled, loading, error, success) are designed for primary interactive elements, which
fails whenever a button or input only has default and hover styles; touch targets are a minimum of
44x44px, which fails whenever an icon button or link has a smaller tappable area; form inputs have
associated `<label>` elements, which fails whenever a field relies on placeholder text alone for
labeling; and destructive actions have undo or confirmation, which fails whenever a delete or send
action executes immediately with no recovery path.

See `checklists.md` §1 for the full Should-Pass/Nice-to-Have tri-tier checklist across all chapters.

---

## RED FLAGS

**Last reviewed: 2026-07**

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| `outline: none` or `*:focus { outline: 0 }` without replacement | Critical | Keyboard users can't see where focus is; accessibility violation | Remove the rule or replace with a visible `:focus-visible` style (2px+ solid, 3:1 contrast) |
| Form inputs with placeholder text but no `<label>` | Critical | Label disappears on input; screen readers may not announce the field purpose | Add a visible `<label>` above each input; keep placeholder for format hints only |
| Modals without focus trapping | High | Keyboard users can Tab into background content and get lost | Implement focus trap inside modal; add `inert` attribute to background; restore focus on close |
| All buttons styled identically (no visual hierarchy) | High | Users can't distinguish primary actions from secondary or destructive ones | Style primary, secondary, and destructive buttons differently using color, weight, and fill |

See `checklists.md` §2 Red Flags Master Table for the complete list across all chapters.

---

## IMPLEMENTATION CHECKLIST

Before starting, list every interactive element in the design (buttons, links, inputs, toggles,
menus, modals), flag which actions are destructive, async, or high-consequence, and establish a
focus indicator style that meets 3:1 contrast and 2px+ width. While designing, work through all 8
states for each element type -- default (must communicate affordance), hover (subtle, pointer-only),
focus (`:focus-visible`, 2px+ solid at 3:1 contrast), active (distinct from hover, tactile), disabled
(muted with an explanation, not just grayed out), loading (button text and control disabled during
the async call), error (inline, associated via `aria-describedby`, explaining what/why/how to fix),
and success (visible for at least 2 seconds) -- and apply the same rigor to forms (visible labels
above inputs, validation on blur rather than every keystroke, format hints before errors occur) and
to focus management (never strip outlines without a visible alternative, tab order follows visual
order, modals trap focus and restore it on close, composite widgets use roving tabindex). Prefer
optimistic UI or skeleton screens over generic spinners wherever the content shape is predictable or
the action is low-risk and reversible. After, tab through the entire interface to confirm every
element is reachable with a visible focus state, trigger every action to confirm it gives feedback,
submit forms with invalid data to confirm errors are clear and actionable, and open every modal to
confirm focus is trapped and restored on close.

See `checklists.md` §5 Implementation Quick-Start for the full step-by-step sequence.

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: Placeholder-Only Form to Properly Labeled Form with Validation

**Problem (Before):**
Form inputs use placeholder text as the only label (e.g., `<input placeholder="Email address">`). When users start typing, they lose context of what field they're in. Errors show up as a red border with no explanation. Screen readers announce "edit text" with no label.

**Solution (After):**
Add visible `<label>` elements above each input. Keep placeholder for format examples only (e.g., "jane@example.com"). Add helper text below inputs for format expectations. On validation failure, show inline error messages associated via `aria-describedby` that explain what's wrong and how to fix it.

**Key Change:** Labels stay visible at all times. Errors are specific and tied to their inputs. Placeholder is supplementary, not primary.

---

### Pattern 2: No Loading State to Optimistic UI with Error Recovery

**Problem (Before):**
User clicks "Save" and nothing happens for 2 seconds while the request completes. The button doesn't change. The user clicks again, triggering a duplicate request. When it finally completes, there's no confirmation.

**Solution (After):**
For low-risk actions: update the UI immediately (optimistic UI) and sync in background; if the request fails, revert the UI and show an error toast with a retry option. For high-risk actions: disable the button, change text to "Saving...", show a spinner, and display a success confirmation on completion.

**Key Change:** Every action provides immediate visual feedback; the UI communicates the full lifecycle of the operation.

---

### Pattern 3: "Nothing Here" Empty State to Helpful Onboarding Empty State

**Problem (Before):**
When a list or dashboard has no content, the interface shows "No items found" or a blank area. Users don't know if something is broken, if they need to take action, or how to get started.

**Solution (After):**
Empty states include an illustration or icon, a brief explanation of what will appear here, and a primary call-to-action button to create the first item. For search results, suggest alternative queries or filters. The empty state teaches the interface.

**Key Change:** Empty states are treated as onboarding moments, not dead ends.

---

### Pattern 4: Missing Focus Management to Proper Focus Trapping in Modal

**Problem (Before):**
A modal dialog opens but focus stays on the trigger button behind the overlay. Pressing Tab moves focus to elements behind the modal. Screen reader users don't know a modal has opened. Pressing Escape does nothing.

**Solution (After):**
On open: move focus to the first focusable element inside the modal, add `inert` to all background content. Tab and Shift+Tab cycle through modal elements only. Escape closes the modal. On close: remove `inert` from background, restore focus to the element that triggered the modal.

**Key Change:** Focus is managed programmatically to match the visual context; background content is truly inert, not just visually obscured.

---

## CORE PRINCIPLES

Every interactive element must communicate its current state. Users should never wonder "did that work?", "can I click this?", or "what went wrong?" Design for the full lifecycle of an interaction, not just the happy path. The eight states (default, hover, focus, active, disabled, loading, error, success) aren't nice-to-haves. They're fundamental requirements of a usable interface.

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| No visible focus indicators | Critical | Keyboard and assistive technology users can't navigate the interface |
| Missing form labels | Critical | Screen readers can't announce field purpose; users lose context while typing |
| No loading or success feedback on actions | High | Users can't tell if their action worked, leading to duplicate submissions |

Reviewing and applying draw on the same criteria in both directions: define the 8 states before
building, start with focus management and logical tab order, and label every input visibly rather
than leaning on placeholder text.

---

## THIS VS THAT

| Confusion Point | This Reference Says | Not This |
|-----------------|---------------------|----------|
| "Disabled buttons are self-explanatory" | Disabled elements must explain why they're disabled (tooltip or adjacent text); a grayed-out button with no context leaves users guessing | Disabling a button is sufficient communication |
| "Modals are fine for confirmations" | Modals interrupt flow and require focus management; prefer inline confirmations or undo toasts for simple destructive actions; reserve modals for complex decisions | Use a modal dialog for every confirmation |
| "Focus rings are a browser default, leave them alone" | Browser defaults are inconsistent and often fail contrast requirements; design intentional `:focus-visible` styles that meet 3:1 contrast and 2px+ width | Browser focus styles are good enough |
| "Error messages should be concise" | Error messages must be concise and complete: what happened, why, and how to fix it; "Invalid input" is concise but useless | Brevity is more important than clarity in errors |
| "Loading spinners work fine" | Spinners give no context about what's loading or how long it'll take; skeleton screens work better for predictable content; progress bars work better for measurable operations | A spinner is the standard loading indicator |
| "Placeholder text serves as a label" | Placeholder disappears on input, is typically low-contrast, and isn't announced reliably by all screen readers; it's a hint, not a label | Placeholder text is an acceptable alternative to labels |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Recommended | When |
|----------------|---------|-------------|------|
| Focus indicator style | Browser default, custom outline, box-shadow, background change | Custom `:focus-visible` with 2px+ solid outline, 3:1 contrast, 2px offset | Always; browser defaults are inconsistent and often insufficient |
| Loading pattern | Optimistic UI, skeleton screen, progress bar, spinner | Optimistic UI for reversible low-risk actions; skeleton screens for content | Based on action risk level and content predictability |
| Error display | Toast notification, inline message, modal alert, console log | Inline message next to the relevant input with `aria-describedby` | Form validation; use toast for global errors not tied to a specific input |
| Destructive action safety | Confirmation modal, undo toast, re-type confirmation | Undo toast for reversible actions; re-type confirmation for irreversible (e.g., "type DELETE to confirm") | Based on severity and reversibility of the action |
| Button hierarchy | Primary filled, secondary outlined, tertiary text-only, destructive red | One primary action per section; secondary for alternatives; destructive in red/warm | When a view has multiple possible actions |
| Empty state design | Text-only message, illustration + CTA, skeleton placeholder | Illustration/icon + explanation + primary CTA button | When a list, table, or dashboard can be empty |
| Form validation timing | On keystroke, on blur, on submit | Validate on blur; re-validate on keystroke after first error shown | Always; keystroke validation is distracting before user finishes typing |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| 8-state audit | Systematically checks all interactive states for each element type | Reviewing any interactive component | List each interactive element; verify default, hover, focus, active, disabled, loading, error, success states exist |
| Focus-visible styling | Shows focus rings only for keyboard navigation, not mouse clicks | All interactive elements | Use `:focus-visible` instead of `:focus`; style with `outline: 2px solid`, `outline-offset: 2px`, contrast ratio 3:1+ |
| Optimistic UI | Updates the interface before server confirmation, reverts on failure | Low-risk reversible actions (likes, toggles, bookmarks) | Apply the change to local state immediately; send the request; on failure, revert local state and show error toast |
| Skeleton screen | Displays content-shaped placeholders during loading | Content areas with predictable layout (lists, cards, profiles) | Render gray blocks matching the size and position of expected content; replace with real content when loaded |
| Focus trap pattern | Constrains Tab/Shift+Tab within a container | Modal dialogs, slide-out panels, dropdown menus | On open: add `inert` to background, move focus to first focusable child; on close: remove `inert`, restore focus to trigger |
| Roving tabindex | Manages focus within composite widgets using arrow keys | Tab lists, toolbars, radio groups, menu bars | Set `tabindex="0"` on active item, `tabindex="-1"` on others; move `tabindex="0"` on arrow key press |
| Error message pattern | Provides actionable error feedback on form inputs | Every form input that can be invalid | Display inline message below input: what happened + why + how to fix; link via `aria-describedby`; use `aria-invalid="true"` |

---

## COMMON MISTAKES

**Last reviewed: 2026-07**

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Removing focus outlines globally with `*:focus { outline: none }` | Developer finds browser focus rings visually distracting | Use `:focus-visible` to show focus rings only during keyboard navigation; style them intentionally |
| Using placeholder text as the only input label | Placeholder seems cleaner and saves vertical space | Add visible `<label>` elements above inputs; use placeholder only for format hints |
| Designing only the happy path (default and hover) | Deadlines pressure teams to skip edge cases | Design error, loading, disabled, and empty states before building; these reveal requirements early |
| Implementing modals without focus management | Developer focuses on visual overlay, not keyboard behavior | Trap focus inside the modal; set background `inert`; restore focus to trigger on close; handle Escape key |
| Generic error messages ("Something went wrong") | Developer catches errors but doesn't differentiate them | Map error types to specific messages: what happened, why, and how the user can fix it |

See `checklists.md` §4 Common Mistakes Master Table for the complete list across all chapters.
