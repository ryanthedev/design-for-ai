# Motion Design for Interfaces
**Source:** Modern frontend design principles
**Core Concept:** Every animation should communicate a state change to the user — if removing an animation loses no information, the animation was decorative and should be removed or justified.

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

> **Easing**: The acceleration curve of an animation: how it speeds up and slows down over its duration. Defined by cubic-bezier functions in CSS.

> **Keyframe**: A defined point in an animation sequence where specific property values are set. The browser interpolates between keyframes.

> **Transition**: A CSS mechanism that animates property changes between two states, triggered by state changes like `:hover` or class toggling.

> **Animation**: A CSS mechanism using `@keyframes` that can run independently, loop, and define multiple intermediate states beyond just start and end.

> **Transform**: A CSS property that modifies an element's coordinate space: `translate`, `scale`, `rotate`, `skew`. GPU-composited, doesn't trigger layout.

> **Opacity**: A CSS property controlling element transparency. GPU-composited, doesn't trigger layout or paint.

> **GPU compositing**: When the browser offloads rendering to the graphics processor. Only `transform` and `opacity` are composited by default, making them performant to animate.

> **Layout thrashing**: When JavaScript reads layout properties and writes style changes in alternating sequence, forcing the browser to recalculate layout repeatedly within a single frame.

> **Jank**: Visible stuttering when animations drop below 60fps (16.67ms per frame), caused by main-thread blocking or animating layout-triggering properties.

> **Stagger**: A deliberate delay between the start of animations in a group, creating a cascading reveal effect that guides the eye through a sequence.

> **Orchestration**: Coordinating multiple animations so they play in a meaningful sequence: entries before content, content before actions.

> **Reduced motion**: A user preference (`prefers-reduced-motion: reduce`) indicating the user is sensitive to motion, often due to vestibular disorders. Must be respected.

> **Perceived performance**: How fast an interface feels to the user, independent of actual load time. Skeleton screens, optimistic UI, and progressive loading improve perceived performance.

---

## DETECTION CHECKLIST

This reference applies whenever motion feels either absent or wrong -- elements that appear and
disappear instantly with no transition, page changes that feel abrupt with no sense of where content
came from, or animations that feel bouncy, rubbery, and gimmicky. It also applies to the CSS/JS tells
behind those symptoms: animating `width`, `height`, `padding`, `margin`, `top`, or `left` instead of
`transform`, or no `@media (prefers-reduced-motion: reduce)` query anywhere in the codebase. The
developer statement that gives it away: "I added some animations to make it feel more polished" --
motion added for polish rather than to communicate a state change.

---

## DESIGN REVIEW CRITERIA

Must pass: only `transform` and `opacity` are animated, which fails whenever any layout-triggering
property (`width`, `height`, `padding`, `margin`, `top`, `left`) is animated instead; `prefers-reduced-motion`
is respected, which fails whenever no `@media (prefers-reduced-motion: reduce)` query exists in the
codebase; no bounce or elastic easing appears in production UI, which fails whenever a cubic-bezier
curve overshoots 1.0 on the y-axis for a standard UI transition; and every animation serves a
communicative purpose, which fails whenever removing the animation loses no information or spatial
context.

See `checklists.md` §1 for the full Should-Pass/Nice-to-Have tri-tier checklist across all chapters.

---

## RED FLAGS

**Last reviewed: 2026-07**

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Animating `width`, `height`, `margin`, `padding`, `top`, `left` | Critical | Triggers layout recalculation every frame, causing jank | Use `transform: translate()` for position, `transform: scale()` for size, `grid-template-rows: 0fr/1fr` for collapse |
| No `prefers-reduced-motion` support | Critical | Users with vestibular disorders may experience nausea or disorientation | Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` |
| Bounce or elastic easing on UI elements | High | Feels dated, artificial, and unprofessional; distracts from content | Replace with exponential ease-out: `cubic-bezier(0.16, 1, 0.3, 1)` |
| Scroll-driven animations using `scroll` event listeners | High | Main-thread scroll listeners cause jank and dropped frames | Use `IntersectionObserver` for reveal-on-scroll or CSS `scroll-timeline` where supported |

See `checklists.md` §2 Red Flags Master Table for the complete list across all chapters.

---

## IMPLEMENTATION CHECKLIST

Before starting, identify which state changes need to be communicated (entry, exit, reorder,
loading, error), determine the animation tier (micro-interaction at 100ms, standard transition at
300ms, or complex orchestration at 500ms), and confirm `prefers-reduced-motion` handling exists in
the project. While animating, apply the 100/300/500 rule to set duration, choose the easing curve to
match the motion's direction (ease-out for entries, ease-in for exits, ease-in-out for toggles --
never bounce or elastic), animate only GPU-composited properties (`transform` and `opacity`) and
verify in DevTools that no layout or paint is triggered, orchestrate grouped animations with 50-80ms
stagger delays so the eye follows a clear path, and mirror entry animations in reverse for exits so
elements don't simply vanish. After, test with `prefers-reduced-motion: reduce` enabled in OS
settings, verify no jank at 60fps in the Performance panel, confirm every animation still answers
"what changed?" and remove any that don't, and test on the lowest-spec target device.

See `checklists.md` §5 Implementation Quick-Start for the full step-by-step sequence.

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: No Animation to Purposeful Entry Animation

**Problem (Before):**
List items render instantly on page load, appearing all at once. The user has no sense of hierarchy or reading order. The page feels static and abrupt.

**Solution (After):**
Each list item fades in and translates up from `translateY(20px)` with `opacity: 0` to `translateY(0)` with `opacity: 1`, staggered at 60ms intervals. Duration is 300ms with `cubic-bezier(0.16, 1, 0.3, 1)`. The user's eye is guided through the list in sequence.

**Key Change:** Added staggered fade+translate entry animation that communicates reading order and creates a sense of content arriving.

---

### Pattern 2: Bounce Easing to Smooth Exponential Easing

**Problem (Before):**
A modal opens with a bounce effect (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`), overshooting its final position and oscillating. It feels playful but unprofessional, and the extra motion is disorienting.

**Solution (After):**
The modal scales from `scale(0.95)` and `opacity: 0` to `scale(1)` and `opacity: 1` with `cubic-bezier(0.16, 1, 0.3, 1)` over 300ms. The motion is swift at the start and decelerates smoothly into place. Confident and intentional.

**Key Change:** Replaced bounce easing with exponential ease-out; the modal arrives with authority rather than wobbling into position.

---

### Pattern 3: Animating Height to Transform-Based Collapse

**Problem (Before):**
An accordion animates `height` from `0` to `auto` (or a fixed pixel value). This triggers layout recalculation every frame, causing jank on complex pages. The animation stutters on lower-end devices.

**Solution (After):**
Use `grid-template-rows: 0fr` to `grid-template-rows: 1fr` on a grid container, or use `transform: scaleY(0)` with `transform-origin: top` for simpler cases. The content expands smoothly without triggering layout every frame.

**Key Change:** Moved from layout-triggering `height` animation to GPU-composited or grid-based approach that maintains 60fps.

---

### Pattern 4: Spinner to Skeleton Screen

**Problem (Before):**
A loading state shows a centered spinner for 2-3 seconds. The user has no sense of what's loading or how the page will look. The wait feels long and uncertain.

**Solution (After):**
A skeleton screen renders placeholder shapes matching the layout of the incoming content: gray rectangles for text lines, circles for avatars, rounded rectangles for images. A subtle shimmer animation (`translateX` on a pseudo-element gradient) conveys loading progress. Content fades in over the skeleton when ready.

**Key Change:** Replaced abstract spinner with content-shaped skeleton that sets layout expectations and reduces perceived wait time.

---

## CORE PRINCIPLES

Motion should communicate, not decorate. Every animation should answer "what changed?" for the user. If removing an animation loses no information, it was decorative. Purposeful motion establishes spatial relationships (where did that element come from?), communicates state changes (what just happened?), guides attention (what should I look at?), and reduces cognitive load (how does this relate to what I saw before?).

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Animating layout properties (width, height, margin, padding, top, left) | Critical | Causes jank, dropped frames, and poor performance on all devices |
| No prefers-reduced-motion support | Critical | Accessibility violation; can cause vestibular distress in affected users |
| Decorative animation with no communicative purpose | High | Adds visual noise, increases cognitive load, slows perceived performance |

Reviewing and applying draw on the same criteria in both directions: identify the state change before
adding any animation, animate only `transform` and `opacity`, and implement `prefers-reduced-motion`
before shipping.

---

## THIS VS THAT

| Confusion Point | This Reference Says | Not This |
|-----------------|---------------------|----------|
| "Animations make sites feel modern and polished" | Animations communicate state changes. Decorative animation makes sites feel slow and distracting | Adding animation everywhere improves perceived quality |
| "CSS transitions are always better than JS animations" | CSS transitions are better for simple two-state changes; JS (Web Animations API, GSAP) is better for complex orchestration and scroll-driven sequences | One approach is universally superior |
| "Faster animations are always better" | 100ms is right for micro-interactions but too fast for panel transitions; 300ms is the sweet spot for standard transitions; match duration to complexity | All animations should be as fast as possible |
| "ease is a good default easing curve" | Default `ease` is a compromise that fits nothing well; use exponential curves (ease-out-expo, ease-out-quint) for entries and ease-in for exits | The CSS default easing is fine for production |
| "Users don't notice animations" | Users notice bad animations (jank, bounce, too slow) and the absence of animation (abrupt state changes). Good animation is invisible because it matches expectations | Animation is purely aesthetic and optional |
| "will-change fixes performance" | `will-change` hints to the browser to pre-composite a layer, but overuse creates memory overhead. Fix the root cause (animate only transform/opacity) rather than papering over it | Adding will-change to everything improves performance |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Recommended | When |
|----------------|---------|-------------|------|
| Micro-interaction duration | 50-200ms | 100ms | Button press, toggle, hover feedback, checkbox, small state changes |
| Standard transition duration | 200-400ms | 300ms | Panel open/close, tab switch, card flip, dropdown, modal |
| Complex orchestration duration | 400-700ms total | 500ms total | Page transitions, staggered list reveals, multi-step sequences |
| Entry easing | ease, ease-out, ease-out-expo | ease-out-expo: `cubic-bezier(0.16, 1, 0.3, 1)` | Any element arriving or appearing in the viewport |
| Exit easing | ease, ease-in, ease-in-expo | ease-in-expo: `cubic-bezier(0.7, 0, 0.84, 0)` | Any element leaving or being dismissed |
| Toggle/position easing | ease-in-out, ease-in-out-expo | ease-in-out: `cubic-bezier(0.65, 0, 0.35, 1)` | Toggles, accordions, position swaps, reordering |
| Stagger delay between items | 30-100ms | 50-80ms | Lists, grids, card groups — any sequential reveal |
| Loading state | Spinner, skeleton, progress bar | Skeleton screen | Content-heavy pages where layout shape is known |
| Scroll-triggered reveal | scroll listener, IntersectionObserver, scroll-timeline | IntersectionObserver | Reveal-on-scroll effects for cards, sections, images |
| Collapse/expand | animate height, scaleY, grid-template-rows | grid-template-rows: 0fr/1fr | Accordions, expandable sections, collapsible panels |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| Staggered reveals | Cascading entry animation across a group of elements | Lists, card grids, nav menus, any repeated elements | Apply same animation to all items; add `transition-delay` or `animation-delay` incrementing by 50-80ms per item |
| Skeleton screens | Placeholder shapes matching the layout of incoming content with shimmer animation | Data-fetching states where layout is predictable | Render gray rectangles matching content dimensions; animate a gradient pseudo-element with `translateX` for shimmer |
| Optimistic UI | Immediately show the expected result of an action before server confirmation | Form submissions, likes, toggles, saves where failure is rare | Apply the state change instantly with animation; roll back with error animation only if the server rejects |
| Exit animations | Animate elements out before removing them from the DOM | Dismissing modals, removing list items, navigating away | Use ease-in easing, reverse the entry direction (if entered from bottom, exit to bottom), then remove from DOM after transition ends |
| State morphing | Smoothly transitioning one element's shape/position into another | Tabs to panels, FAB to dialog, thumbnail to full image | Use `FLIP` technique (First, Last, Invert, Play) or View Transitions API to interpolate between states |
| Scroll-triggered reveals | Animate elements into view as user scrolls to them | Long pages with sections, portfolios, landing pages | Use IntersectionObserver with threshold; toggle a class that applies transform+opacity transition |
| Micro-interactions | Small feedback animations on user input | Button press, toggle switch, checkbox, form validation | Scale down slightly on `:active` (`transform: scale(0.97)`), transition back on release; 100ms duration |
| Loading shimmer | Moving gradient that suggests content is loading | Skeleton screens, placeholder images | Pseudo-element with linear-gradient animated via `translateX` from -100% to 100%, duration 1.5-2s, infinite loop |

---

## COMMON MISTAKES

**Last reviewed: 2026-07**

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Animating `width`, `height`, or `margin` for transitions | Developer thinks of size/position changes literally | Use `transform: scale()` for size, `transform: translate()` for position, and `grid-template-rows` for collapse |
| Using bounce or elastic easing everywhere | Tutorials and animation libraries default to playful curves | Use exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for all standard UI motion |
| Adding animation to everything at once | Developer wants the site to "feel alive" | Animate only state changes that need communication; start with entry animations and interactive feedback |
| No exit animations | Developer only thinks about elements appearing, not disappearing | Elements should exit with the reverse of their entry. Use ease-in and remove from DOM after `transitionend` |
| Ignoring prefers-reduced-motion | Developer isn't aware of the preference or considers it edge-case | It's a critical accessibility requirement; add a global media query that disables or reduces all motion |

See `checklists.md` §4 Common Mistakes Master Table for the complete list across all chapters.
