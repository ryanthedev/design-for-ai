# UI pattern families — the what, and the bridge

**Source:** usability foundations research (Tidwell *Designing Interfaces* 3rd ed; NN/g; Baymard; Smart Interface Design Patterns / Friedman; GOV.UK; Carbon; Material 3; Primer; ui-patterns.com). Layer B of the two-layer catalog: the recurring UI solutions. A pattern catalog with no selecting principles is just a list — the **bridge** (below) is what makes this generative: a principle from `usability-principles.md` *selects* the pattern. Cite the selecting law on every recommendation.

---

## Table of Contents

1. [The 8 pattern families](#the-8-pattern-families)
2. [The bridge — principle selects pattern](#the-bridge--principle-selects-pattern)
3. [Modal vs drawer vs bottom-sheet](#modal-vs-drawer-vs-bottom-sheet)
4. [Common mistakes](#common-mistakes)

---

## The 8 pattern families

### 1. Navigation
Top nav · sidebar · sticky · utility · footer · local · breadcrumbs · mega-menu · hamburger/drawer · bottom tab bar · command palette (⌘K) · pagination vs infinite-scroll vs load-more. NN/g's 6 categories: global · local · breadcrumb · contextual · utility · supplemental. *Selecting laws:* Fitts (reach), Hick (count/grouping), Jakob (convention), serial position (order).

### 2. Forms & input
Validation timing (inline / on-blur / on-submit) under "reward early, punish late" · one-thing-per-page (GOV.UK) · wizard / stepper · forgiving format · input masking · smart defaults · top-aligned labels · conditional fields · the question protocol (only ask what you need). *Selecting laws:* Miller/Cowan (chunking), Tesler (absorb complexity), Postel (forgiving input), error-prevention (Nielsen #5).

### 3. Search & filtering
Autocomplete / typeahead · faceted nav (AND between facets, OR within) · range slider · swatch · chips · real-time (desktop) vs batch-apply (mobile) · scoped search · zero-results state. *Selecting laws:* recognition-over-recall, Doherty (responsiveness), visibility-of-status.

### 4. Data display
Tables (sortable · sticky-header · freeze-column · expandable rows · inline-edit · bulk-select · density toggle) · data grid · lists · cards · KPI cards · master-detail · dashboards (12-col). *Selecting laws:* Gestalt (alignment/similarity), data-ink (Tufte), scanning (layer-cake). (Tables are a *usability* pattern; truthful chart **encoding** belongs to `data-viz`.)

### 5. Feedback & status
Toast vs snackbar · inline / banner alerts · spinner vs skeleton+shimmer · determinate progress · optimistic UI · undo snackbar (preferred over a confirm dialog) · empty states (4 types: first-use, user-cleared, no-results, error). Timing: <0.1s no indicator · 0.1–1s none-to-subtle · 1–10s spinner/skeleton · 10s+ percent + notify. *Selecting laws:* visibility-of-status (Nielsen #1), Doherty, user-control (Nielsen #3), peak-end (empty/success states).

### 6. Selection & action
Button hierarchy (primary / secondary / tertiary / ghost / danger) · split & dropdown buttons · segmented control · FAB · select-all + bulk-action bar · drag-and-drop · swipe-to-delete / reveal · context menu · keyboard shortcuts. *Selecting laws:* Fitts (size of primary), Von Restorff (one distinct CTA), flexibility/efficiency (Nielsen #7).

### 7. Content & disclosure
Accordion · tabs · progressive disclosure · tooltip · popover · overflow/kebab menu · modal vs drawer vs bottom-sheet (see below). *Selecting laws:* progressive-disclosure, cognitive-load, recognition-over-recall.

### 8. Onboarding
Deferred sign-up · product tour · coach marks / hotspots · empty-state nudge · checklist + progress · just-in-time tips. NN/g: there are only 3 legitimate reasons to onboard; keep it minimal; the deck-of-cards carousel is discouraged. *Selecting laws:* Zeigarnik & goal-gradient (checklists/progress), just-in-time over up-front (cognitive load).

## The bridge — principle selects pattern

This is the generative engine: name the constraint, let the law pick the pattern. Cite the law.

| Constraint / context | Selecting principle | Pattern it picks (over the alternative) |
|----------------------|---------------------|------------------------------------------|
| Small screen, many destinations | Hick's law | grouped / progressive menu **over** a mega-menu |
| Phone, frequent primary action | Fitts's law | bottom tab bar **over** top nav |
| Long unfamiliar form | Miller/Cowan + cognitive load | wizard / field-grouping / one-thing-per-page **over** a 20-field page |
| Utility site, complete-set browsing | Jakob's law | pagination **over** infinite scroll |
| Onboarding completion | Zeigarnik + goal-gradient | checklist with progress **over** a passive tour |
| First-run / cleared list | Peak-end | celebratory, guiding empty state **over** a blank screen |
| Wait 1–10s | Aesthetic-usability + visibility-of-status | skeleton screen **over** a bare spinner |
| Long operation | Visibility of status (Nielsen #1) | determinate progress **over** an indeterminate spinner |
| Reversible destructive action | User control (Nielsen #3) | undo snackbar **over** a confirm modal |
| Complexity that must go somewhere | Tesler's law | smart defaults / parsing **over** asking the user |
| Optional/advanced settings | Progressive disclosure | accordion / tabs / conditional fields **over** showing everything |
| Frequent expert action | Flexibility & efficiency (Nielsen #7) | keyboard shortcut / command palette **over** menu-only |

## Modal vs drawer vs bottom-sheet

Decide by content volume, criticality, and comparison need:
- **Modal** — short, critical, must-decide-now interruption that blocks the flow (a destructive confirm, a required choice). Overuse violates user-control.
- **Drawer (side sheet)** — supplementary content/editing alongside context the user keeps referencing; desktop-leaning.
- **Bottom-sheet** — mobile-first, thumb-reachable (Fitts); good for actions and short forms without leaving the page.
- Prefer an inline disclosure or an undo snackbar over a modal whenever the action is reversible.

## Common mistakes

| Mistake | Why it happens | Correct approach |
|---------|----------------|------------------|
| Hamburger menu on a 2–3 section app | Cargo-culting a mobile convention | Show the sections directly (Fitts/recognition); hide nav only when count justifies it (Hick) |
| Infinite scroll in an enterprise dashboard | Copying consumer feeds (Jakob misused) | Pagination for complete-set, findable, comparable data |
| Capping menus at "7±2 items" | Miller's law misread | Items on screen carry no memory load; broad-shallow can beat deep-narrow |
| Spinner for a 5s+ load | Easiest to implement | Skeleton then determinate progress (visibility-of-status, aesthetic-usability) |
| Confirm modal for every delete | "Safety" reflex | Undo snackbar keeps user-control without interrupting (Nielsen #3) |
| Picking a pattern, then justifying it | Pattern-first thinking | Name the constraint, let the law select the pattern, then cite it |
