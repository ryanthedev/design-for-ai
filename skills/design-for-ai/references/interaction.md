# Interaction Design for Interfaces
**Source:** Modern frontend design principles
**Core Concept:** Every interactive element must communicate its current state across its full lifecycle: default, hover, focus, active, disabled, loading, error, and success. Users should never wonder "did that work?", "can I click this?", or "what went wrong?"

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are designing or reviewing interactive UI elements (buttons, forms, modals, menus)
- [ ] The interface accepts user input or triggers actions with outcomes
- [ ] Users need feedback about what they can do, what's happening, and what happened

**Do NOT apply when ANY are true:**
- [ ] The design is purely static content with no interactive elements
- [ ] You are only choosing colors, typography, or layout with no interactive components
- [ ] The interface is a read-only data display with no user-initiated actions

---

## PROBLEM -> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| Users click a button and nothing visibly happens | Yes | Missing loading or success state; users can't tell if their action registered |
| Form submissions fail silently or show cryptic errors | Yes | Error states need to explain what happened, why, and how to fix it |
| Keyboard users can't navigate the interface | Yes | Missing focus management, focus indicators, or logical tab order |
| Users accidentally trigger destructive actions | Yes | Destructive actions need confirmation or undo patterns |
| Modal opens but user can't close it with keyboard | Yes | Focus trap and escape key handling are missing |
| Placeholder text disappears when user starts typing | Yes | Placeholder-only labels remove context during input |
| Page shows a blank white screen while loading | Yes | Missing skeleton screens or loading indicators |
| Touch targets are too small on mobile | Yes | Touch targets need minimum 44x44px for reliable interaction |
| Choosing a color palette or typeface | No | Use color theory or typography principles instead |
| Optimizing page load performance | No | Use performance engineering principles instead |

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

Signs this knowledge applies:

### Visual Symptoms
- [ ] Buttons look identical in all states, no visible change on hover, focus, or active
- [ ] No visible focus indicator when tabbing through the interface
- [ ] Form inputs have no labels, only placeholder text
- [ ] Error messages appear as generic "Something went wrong" with no guidance
- [ ] Empty states show only "No results" with no explanation or next steps
- [ ] All buttons have the same visual weight regardless of importance
- [ ] Loading states are absent. The UI freezes or shows nothing during async operations

### CSS/HTML/JS Patterns to Look For
- [ ] `outline: none` or `outline: 0` in CSS without a replacement focus style
- [ ] `<input placeholder="Email">` with no associated `<label>` element
- [ ] Buttons with no `:disabled`, `:hover`, or `:focus` styles defined
- [ ] Click handlers with no loading state management (`isLoading`, `disabled` during fetch)
- [ ] Modals implemented without focus trapping or `inert` on background content
- [ ] `tabindex` values greater than 0 (disrupts natural tab order)
- [ ] Error messages not associated with inputs via `aria-describedby`

### Developer Statements That Trigger This
- "Focus rings are ugly, so I removed them"
- "We'll add error handling later"
- "The placeholder text explains what to enter"
- "Users will figure out what to do"
- "We just need a spinner while it loads"
- "It's just a delete button, we don't need a confirmation"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] All interactive elements have visible focus indicators -> Fail if: `outline: none` is used without a replacement focus style
- [ ] All 8 states designed for primary interactive elements (default, hover, focus, active, disabled, loading, error, success) -> Fail if: buttons or inputs only have default and hover styles
- [ ] Touch targets are minimum 44x44px -> Fail if: icon buttons or links have a tappable area smaller than 44x44px
- [ ] Form inputs have associated `<label>` elements -> Fail if: inputs rely on placeholder text alone for labeling
- [ ] Destructive actions have undo or confirmation -> Fail if: delete or send actions execute immediately with no recovery path

### Should Pass (Important)
- [ ] `:focus-visible` used instead of `:focus` for keyboard-only focus rings -> Warning if: all focus styles visible on mouse click, creating visual noise
- [ ] Error messages include what happened, why, and how to fix it -> Warning if: errors show only "Error" or a status code
- [ ] Loading states use skeleton screens over spinners for content areas -> Warning if: full-page spinner used where content structure is predictable
- [ ] Empty states teach the interface, not just say "nothing here" -> Warning if: empty state is a single line of text with no call to action
- [ ] Modal dialogs trap focus and use `inert` on background content -> Warning if: user can Tab behind an open modal or interact with background elements

### Nice to Have
- [ ] Optimistic UI for low-risk actions (toggling, favoriting, marking read) -> Suggestion: update the UI immediately and sync in background
- [ ] Progressive disclosure for complex forms -> Suggestion: break long forms into steps or reveal advanced options on demand
- [ ] Micro-animations for state transitions (150-300ms) -> Suggestion: animate between states to help users track what changed

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| `outline: none` or `*:focus { outline: 0 }` without replacement | Critical | Keyboard users can't see where focus is; accessibility violation | Remove the rule or replace with a visible `:focus-visible` style (2px+ solid, 3:1 contrast) |
| Form inputs with placeholder text but no `<label>` | Critical | Label disappears on input; screen readers may not announce the field purpose | Add a visible `<label>` above each input; keep placeholder for format hints only |
| Buttons with no disabled or loading state | High | Users can double-submit forms or trigger duplicate actions | Disable button and show loading indicator during async operations |
| Modals without focus trapping | High | Keyboard users can Tab into background content and get lost | Implement focus trap inside modal; add `inert` attribute to background; restore focus on close |
| All buttons styled identically (no visual hierarchy) | High | Users can't distinguish primary actions from secondary or destructive ones | Style primary, secondary, and destructive buttons differently using color, weight, and fill |
| Missing error states on form inputs | High | Users can't tell what went wrong or how to fix it | Add inline error messages with `aria-describedby`, explain the problem and how to resolve it |
| Delete or destructive actions with no confirmation | Medium | Accidental data loss with no recovery path | Add undo toast (preferred) or confirmation dialog before executing destructive actions |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify all interactive elements in the design (buttons, links, inputs, toggles, menus, modals)
- [ ] Determine which actions are destructive, async, or high-consequence
- [ ] Define the 8 states for each interactive element type
- [ ] Establish a focus indicator style that meets 3:1 contrast and 2px+ width

### During Design

#### The 8 States Model
- [ ] Step 1: **Default** — design the resting appearance; it must communicate affordance (this is interactive)
  - Verify: element looks clickable/tappable without hovering over it
- [ ] Step 2: **Hover** — subtle visual change on pointer devices (darken, lift, underline)
  - Verify: hover style is visible but not dramatic; does not apply on touch devices
- [ ] Step 3: **Focus** — keyboard navigation indicator using `:focus-visible`
  - Verify: focus ring is 2px+ solid, 3:1 contrast ratio against adjacent background
- [ ] Step 4: **Active** — pressed/clicked state (scale down slightly, darken further)
  - Verify: distinct from hover; gives tactile feedback that the press registered
- [ ] Step 5: **Disabled** — visually muted with reduced opacity or grayed out; explain why
  - Verify: `aria-disabled="true"` used; tooltip or adjacent text explains why disabled
- [ ] Step 6: **Loading** — spinner, progress bar, or skeleton replaces the action trigger
  - Verify: button text changes (e.g., "Save" to "Saving...") and button is disabled during load
- [ ] Step 7: **Error** — red/warm border or background with inline error message
  - Verify: error message associated via `aria-describedby`; message explains what, why, and how to fix
- [ ] Step 8: **Success** — confirmation that the action completed (checkmark, green flash, toast)
  - Verify: success feedback is visible for at least 2 seconds; does not require user action to dismiss

#### Form Design Rules
- [ ] Labels above inputs, not beside or placeholder-only
  - Verify: every `<input>`, `<select>`, and `<textarea>` has a visible `<label>` element
- [ ] Validate on blur, not on every keystroke
  - Verify: validation fires when user leaves a field, not while they are still typing
- [ ] Show format expectations before errors occur (e.g., "MM/DD/YYYY" hint text)
  - Verify: expected format visible as helper text below the input before the user types
- [ ] Error messages follow the pattern: what happened, why, how to fix
  - Verify: "Password must be at least 8 characters" not just "Invalid password"
- [ ] Use `aria-describedby` to associate error and helper text with inputs
  - Verify: screen reader announces the error message when input receives focus
- [ ] Group related inputs with `<fieldset>` and `<legend>`
  - Verify: radio groups, checkbox groups, and address fields are wrapped in fieldset

#### Focus Management
- [ ] Never remove focus outlines without providing a visible alternative
  - Verify: search codebase for `outline: none` and `outline: 0`; ensure replacements exist
- [ ] Use `:focus-visible` for keyboard-only focus rings
  - Verify: clicking a button with a mouse does not show a focus ring; tabbing to it does
- [ ] Focus rings: 2px+ solid, 3:1 contrast ratio against adjacent background
  - Verify: test focus ring against both light and dark background areas
- [ ] Tab order follows visual order (no `tabindex` values > 0)
  - Verify: Tab through the page; focus moves left-to-right, top-to-bottom matching visual layout
- [ ] Modal: trap focus inside, restore focus on close, use `inert` on background
  - Verify: Tab and Shift+Tab cycle within modal; Escape closes; focus returns to trigger element
- [ ] Component groups: roving tabindex (arrow keys within, Tab between)
  - Verify: in tab lists, toolbars, and radio groups, arrow keys move focus; Tab exits the group

#### Loading Patterns (Best to Worst)
- [ ] 1. **Optimistic UI** — update the interface immediately, sync with server in background
  - Verify: used for low-risk, reversible actions (likes, toggles, marking as read)
- [ ] 2. **Skeleton screens** — show the shape of content while it loads
  - Verify: skeleton matches the layout of the actual content; used for predictable content structures
- [ ] 3. **Progress indicators** — show how far along the operation is
  - Verify: used for operations with measurable progress (file uploads, multi-step processes)
- [ ] 4. **Spinners** — generic loading indicator
  - Verify: used only when content structure is unpredictable and progress is not measurable

### After Design
- [ ] Tab through the entire interface — every interactive element is reachable and has a visible focus state
- [ ] Trigger every action — each one provides feedback (loading, success, or error)
- [ ] Submit forms with invalid data — every error is clear, specific, and actionable
- [ ] Test on touch devices — all targets are at least 44x44px
- [ ] Open and close every modal — focus is trapped inside and restored on close

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

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] Every interactive element has visible focus indicators (no `outline: none` without replacement)
- [ ] Primary interactive elements have all 8 states designed and implemented
- [ ] Touch targets meet the 44x44px minimum
- [ ] Form inputs have associated labels and descriptive error messages
- [ ] Destructive actions have confirmation or undo
- [ ] Modal dialogs trap focus and use `inert` on background
- [ ] Loading states provide meaningful feedback (skeleton screens preferred over spinners)
- [ ] Empty states guide users toward action

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| No visible focus indicators | Critical | Keyboard and assistive technology users can't navigate the interface |
| Missing form labels | Critical | Screen readers can't announce field purpose; users lose context while typing |
| No loading or success feedback on actions | High | Users can't tell if their action worked, leading to duplicate submissions |
| Touch targets below 44x44px | High | Mobile users can't reliably interact with the element |
| No error recovery on destructive actions | High | Accidental data loss with no path to recovery |
| Spinners used where skeleton screens would work | Medium | Functional but gives less context about what's loading |
| No empty state guidance | Medium | Users are stuck but not blocked; they may figure it out eventually |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Define the 8 states for every interactive element before building
- [ ] Start with focus management: visible `:focus-visible` rings, logical tab order
- [ ] Design error states first — they reveal edge cases and requirements
- [ ] Use optimistic UI for low-risk reversible actions; skeleton screens for content loading
- [ ] Label every form input visibly; use placeholder only for supplementary hints
- [ ] Add `aria-describedby` to associate helper text and error messages with inputs
- [ ] Confirm or allow undo on every destructive action

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

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Removing focus outlines globally with `*:focus { outline: none }` | Developer finds browser focus rings visually distracting | Use `:focus-visible` to show focus rings only during keyboard navigation; style them intentionally |
| Using placeholder text as the only input label | Placeholder seems cleaner and saves vertical space | Add visible `<label>` elements above inputs; use placeholder only for format hints |
| Designing only the happy path (default and hover) | Deadlines pressure teams to skip edge cases | Design error, loading, disabled, and empty states before building; these reveal requirements early |
| Using the same button style for all actions | Developer uses a single `.btn` class for everything | Create a button hierarchy: primary (filled), secondary (outlined), tertiary (text), destructive (red) |
| Showing a full-page spinner for all loading states | Spinner is the simplest implementation | Use skeleton screens for predictable content; optimistic UI for quick actions; reserve spinners for unpredictable loads |
| Implementing modals without focus management | Developer focuses on visual overlay, not keyboard behavior | Trap focus inside the modal; set background `inert`; restore focus to trigger on close; handle Escape key |
| Generic error messages ("Something went wrong") | Developer catches errors but doesn't differentiate them | Map error types to specific messages: what happened, why, and how the user can fix it |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "Users know how to use forms" | Users abandon forms that don't provide clear labels, helpful validation, and format expectations; 67% of users who hit a form error will leave rather than try to fix it |
| "Focus rings are ugly" | Ugly focus rings are a design failure, not a reason to remove them; use `:focus-visible` to show rings only for keyboard users, and style them to match your design system |
| "We'll add error states later" | Error states reveal edge cases, validation rules, and data requirements; designing them later means retrofitting logic that should have shaped the architecture |
| "Placeholder text is enough for labels" | Placeholder text disappears on input, has insufficient contrast by default, and isn't reliably announced by all screen readers; it fails as a label on every dimension |
| "Spinners are fine for loading" | Spinners communicate "something is happening" but not what or how long; skeleton screens provide spatial context; optimistic UI eliminates perceived wait entirely |

---

## TRIGGERS

Invoke this knowledge when:
- [ ] Designing or reviewing buttons, forms, modals, or other interactive components
- [ ] Users report confusion about whether an action worked
- [ ] Keyboard navigation does not work or shows no visible focus
- [ ] Forms have high abandonment or error rates
- [ ] Loading states are absent or uninformative
- [ ] Empty states provide no guidance or next steps
- [ ] Destructive actions have no safety net
- [ ] Developer asks "how should this button/form/modal behave?"
- [ ] Touch targets are too small on mobile devices
- [ ] Accessibility audit flags missing labels, focus management, or ARIA attributes

Prerequisite state:
- Interactive elements exist or are being planned in the interface
- Understanding of basic HTML form elements and CSS pseudo-classes
- Awareness that the interface will be used with both mouse/touch and keyboard

---

## PRODUCES

After applying this knowledge:
- State: All interactive elements communicate their current state across the full 8-state lifecycle; forms are labeled, validated, and accessible; focus management is intentional; loading and error states are informative
- Artifacts: State inventory for each interactive element type, focus management plan, error message copy, loading pattern selection, button hierarchy definition
- Understanding: Developer can articulate why each interactive state matters, implement focus management for modals and composite widgets, and design error experiences that help users recover

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Interactive states are designed but visual hierarchy is unclear | Visual hierarchy and composition capability | Interaction states exist within a larger visual system that guides the eye |
| Forms are functional but typography feels off | Typography and type scale capability | Form labels, helper text, and error messages need proper typographic hierarchy |
| Focus indicators and button colors are set but contrast is insufficient | Color theory and accessibility contrast capability | Interactive states rely on color to communicate, which requires both aesthetic harmony and WCAG compliance |
| Interface works but feels static or lifeless | Animation and motion design capability | State transitions benefit from micro-animations (150-300ms) to help users track changes |
| Components work individually but the system is inconsistent | Design system and component library capability | Interaction patterns should be standardized across an interface for learnability |

---

## CSO KEYWORDS

interaction design, interactive states, button states, hover state, focus state, active state, disabled state, loading state, error state, success state, focus ring, focus indicator, focus-visible, focus trap, inert attribute, keyboard navigation, tab order, tabindex, roving tabindex, touch target, 44x44px, form design, form validation, input labels, placeholder text, aria-describedby, aria-invalid, fieldset legend, error messages, inline validation, validate on blur, optimistic UI, skeleton screen, progress indicator, spinner, loading pattern, empty state, destructive action, confirmation dialog, undo pattern, modal dialog, dialog focus management, progressive disclosure, affordance, button hierarchy, primary button, secondary button, popover attribute, micro-animation, state transition, form accessibility, WCAG 2.5.8, screen reader, assistive technology
