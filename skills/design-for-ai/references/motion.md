# Motion Design for Interfaces
**Source:** Modern frontend design principles
**Core Concept:** Every animation should communicate a state change to the user — if removing an animation loses no information, the animation was decorative and should be removed or justified.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are building or reviewing a UI with interactive elements, state changes, or page transitions
- [ ] The interface would benefit from communicating spatial relationships, state changes, or continuity between views
- [ ] The target platform supports CSS transitions/animations or JS-driven animation

**Do NOT apply when ANY are true:**
- [ ] The interface is purely static content with no interactive elements
- [ ] The user has indicated `prefers-reduced-motion: reduce` and you are evaluating decorative motion only
- [ ] You are optimizing for extreme low-bandwidth or low-power devices where any animation is a cost

---

## PROBLEM -> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| UI feels abrupt — elements appear/disappear without transition | Yes | Purposeful entry/exit animations communicate what changed and where things went |
| Page transitions feel jarring or disorienting | Yes | Smooth transitions preserve spatial context and reduce cognitive load |
| Users lose track of what changed after an action | Yes | Motion draws attention to the change and maintains object permanence |
| Scroll-driven animations cause stuttering or jank | Yes | GPU-composited properties and IntersectionObserver solve performance issues |
| Loading states feel unresponsive | Yes | Skeleton screens and optimistic UI reduce perceived wait time |
| Animations feel childish or gimmicky | Yes | Likely using bounce/elastic easing or gratuitous decorative animation |
| Need to improve WCAG accessibility compliance | Partial | Motion design must respect prefers-reduced-motion, but full accessibility is broader |
| Choosing colors or typography | No | Use color theory and typography principles instead |

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

Signs this knowledge applies:

### Visual Symptoms
- [ ] Elements appear and disappear instantly with no transition
- [ ] Page or view changes feel abrupt, with no sense of where content came from or went
- [ ] Animations feel bouncy, rubbery, or gimmicky
- [ ] Multiple elements animate simultaneously creating visual chaos
- [ ] Scroll-triggered animations cause visible stuttering or frame drops
- [ ] Loading states show a blank screen or spinner for extended periods
- [ ] Modals or panels snap open/closed without transition

### CSS/JS Patterns to Look For
- [ ] Animating `width`, `height`, `padding`, `margin`, `top`, `left` instead of `transform`
- [ ] No `@media (prefers-reduced-motion: reduce)` query anywhere in the codebase
- [ ] `transition: all` used broadly instead of targeting specific properties
- [ ] Animation durations above 500ms without clear justification
- [ ] `scroll` event listeners driving animations without `IntersectionObserver`
- [ ] `ease` or `linear` easing used for UI transitions (default, not intentional)
- [ ] Bounce or elastic easing curves in production UI

### Developer Statements That Trigger This
- "I added some animations to make it feel more polished"
- "The transition feels slow/fast but I don't know what duration to use"
- "Users are complaining about motion sickness on our site"
- "The page feels janky when I scroll"
- "I don't know when to use transitions vs animations"
- "Should I animate this with CSS or JavaScript?"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] Only `transform` and `opacity` are animated (no `width`, `height`, `padding`, `margin`, `top`, `left`) -> Fail if: any layout-triggering property is animated
- [ ] `prefers-reduced-motion` is respected -> Fail if: no `@media (prefers-reduced-motion: reduce)` exists in the codebase
- [ ] No bounce or elastic easing in production UI -> Fail if: cubic-bezier curves overshoot 1.0 on the y-axis for standard UI transitions
- [ ] Every animation serves a communicative purpose -> Fail if: removing the animation loses no information or spatial context

### Should Pass (Important)
- [ ] Timing follows the 100/300/500 rule (micro 100ms, standard 300ms, complex 500ms) -> Warning if: durations are arbitrary or all the same value
- [ ] Easing uses exponential curves (ease-out-quart/quint/expo) for entries -> Warning if: using default `ease` or `linear` for UI transitions
- [ ] Lists and groups use staggered reveals -> Warning if: all items in a group animate simultaneously
- [ ] State transitions (hover, active, focus) are smooth -> Warning if: interactive states snap without transition

### Nice to Have
- [ ] Exit animations mirror entry animations in reverse -> Suggestion: use ease-in for exits to complement ease-out entries
- [ ] Loading states use skeleton screens instead of spinners -> Suggestion: skeleton screens reduce perceived wait time more effectively
- [ ] Scroll-triggered reveals use IntersectionObserver -> Suggestion: avoids scroll listener performance overhead

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Animating `width`, `height`, `margin`, `padding`, `top`, `left` | Critical | Triggers layout recalculation every frame, causing jank | Use `transform: translate()` for position, `transform: scale()` for size, `grid-template-rows: 0fr/1fr` for collapse |
| No `prefers-reduced-motion` support | Critical | Users with vestibular disorders may experience nausea or disorientation | Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` |
| Bounce or elastic easing on UI elements | High | Feels dated, artificial, and unprofessional; distracts from content | Replace with exponential ease-out: `cubic-bezier(0.16, 1, 0.3, 1)` |
| Animations longer than 500ms without justification | High | Feels sluggish and blocks user interaction; users perceive the UI as slow | Follow the 100/300/500 rule; only exceed 500ms for staggered orchestrations |
| Scroll-driven animations using `scroll` event listeners | High | Main-thread scroll listeners cause jank and dropped frames | Use `IntersectionObserver` for reveal-on-scroll or CSS `scroll-timeline` where supported |
| Multiple animations competing for attention simultaneously | Medium | User can't focus; animations cancel each other's communicative value | Orchestrate with stagger delays so animations play in meaningful sequence |
| `transition: all 0.3s ease` used globally | Medium | Unintended properties animate (color, background), and default `ease` is rarely the right curve | Target specific properties: `transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)` |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify which state changes need to be communicated (entry, exit, reorder, loading, error)
- [ ] Determine the animation tier: micro-interaction (100ms), standard transition (300ms), or complex orchestration (500ms)
- [ ] Verify `prefers-reduced-motion` handling exists in the project
- [ ] Confirm only `transform` and `opacity` will be animated

### During Design
- [ ] Step 1: Apply the 100/300/500 rule to determine duration
  - 100ms: button press, toggle, hover feedback, checkbox
  - 300ms: panel open/close, tab switch, card flip, dropdown
  - 500ms: page transitions, staggered list reveals, complex orchestrations
  - Verify: Duration feels responsive, not sluggish or abrupt
- [ ] Step 2: Choose the correct easing curve
  - ease-out for entries (element arriving, decelerating into place): `cubic-bezier(0.16, 1, 0.3, 1)`
  - ease-in for exits (element leaving, accelerating away): `cubic-bezier(0.7, 0, 0.84, 0)`
  - ease-in-out for toggles and position changes: `cubic-bezier(0.65, 0, 0.35, 1)`
  - NEVER: bounce (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) or elastic curves
  - Verify: Motion feels natural, fast at the start or end, never uniform
- [ ] Step 3: Animate only GPU-composited properties
  - Use `transform: translateY(20px)` + `opacity: 0` for entry states
  - Use `transform: scale(0.95)` + `opacity: 0` for modal/overlay entries
  - Verify: DevTools Performance panel shows no layout/paint triggered by animation
- [ ] Step 4: Orchestrate grouped animations with stagger
  - Add `transition-delay` or `animation-delay` with 50-80ms increments per item
  - First item enters immediately; subsequent items follow in sequence
  - Verify: Eye follows a clear path through the group
- [ ] Step 5: Handle exit animations
  - Mirror entry in reverse: if entry is fade+translate-up, exit is fade+translate-down
  - Use ease-in for exits (accelerating away)
  - Verify: Elements do not simply vanish; user understands where they went

### After Design
- [ ] Test with `prefers-reduced-motion: reduce` enabled in OS settings
- [ ] Verify no jank at 60fps using browser DevTools Performance panel
- [ ] Confirm every animation answers "what changed?" and remove any that don't
- [ ] Test on lowest-spec target device to confirm smooth performance

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

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] All animated properties are GPU-composited (`transform`, `opacity` only)
- [ ] `prefers-reduced-motion` is handled with a media query
- [ ] No bounce or elastic easing curves are used
- [ ] Every animation communicates a state change or spatial relationship
- [ ] Durations follow the 100/300/500 rule
- [ ] Easing curves are exponential (not default `ease` or `linear`)
- [ ] Grouped elements use staggered timing
- [ ] Exit animations exist where entry animations exist

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Animating layout properties (width, height, margin, padding, top, left) | Critical | Causes jank, dropped frames, and poor performance on all devices |
| No prefers-reduced-motion support | Critical | Accessibility violation; can cause vestibular distress in affected users |
| Decorative animation with no communicative purpose | High | Adds visual noise, increases cognitive load, slows perceived performance |
| Bounce or elastic easing in production UI | High | Feels dated and unprofessional; extra motion is disorienting |
| Durations outside 100-500ms range without justification | Medium | Too fast feels abrupt; too slow feels sluggish |
| Default ease or linear easing on UI transitions | Medium | Missed opportunity for natural-feeling motion; linear feels mechanical |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Start by identifying what state changes need to be communicated before adding any animation
- [ ] Use the 100/300/500 rule to set duration based on interaction complexity
- [ ] Choose easing: ease-out for entries, ease-in for exits, ease-in-out for toggles
- [ ] Animate only `transform` and `opacity`
- [ ] Add stagger delays (50-80ms) for grouped elements
- [ ] Implement `prefers-reduced-motion` before shipping
- [ ] Test at 60fps on lowest-spec target device

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

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Animating `width`, `height`, or `margin` for transitions | Developer thinks of size/position changes literally | Use `transform: scale()` for size, `transform: translate()` for position, and `grid-template-rows` for collapse |
| Using bounce or elastic easing everywhere | Tutorials and animation libraries default to playful curves | Use exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for all standard UI motion |
| Adding animation to everything at once | Developer wants the site to "feel alive" | Animate only state changes that need communication; start with entry animations and interactive feedback |
| Same duration for all animations | Developer picks one value and applies it everywhere | Match duration to complexity: 100ms for micro, 300ms for standard, 500ms for complex orchestrations |
| No exit animations | Developer only thinks about elements appearing, not disappearing | Elements should exit with the reverse of their entry. Use ease-in and remove from DOM after `transitionend` |
| Using `transition: all` | Seems like a convenient shorthand | Explicitly list properties: `transition: transform 300ms ease-out, opacity 300ms ease-out` to avoid unintended animations |
| Ignoring prefers-reduced-motion | Developer isn't aware of the preference or considers it edge-case | It's a critical accessibility requirement; add a global media query that disables or reduces all motion |
| Using setTimeout instead of transitionend | Developer doesn't know about transition events | Listen for `transitionend` or `animationend` events to sequence animations reliably |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "Animations slow down the site" | Only animations that trigger layout (width, height, margin) slow things down. Transform and opacity are GPU-composited and run at 60fps with near-zero main-thread cost. |
| "Users don't notice animations" | Users notice the absence of animation. Abrupt state changes increase cognitive load. Users also viscerally notice bad animation (jank, bounce). Good animation is invisible because it meets expectations. |
| "Bounce easing adds personality" | Bounce easing was trendy around 2013. It reads as dated and amateurish now. Exponential ease-out curves feel confident and modern while still having personality through their speed curve. |
| "We'll add animations later" | Animation is architecture, not decoration. Retrofitting motion into a codebase that wasn't designed for it leads to inconsistent timing, missing exit states, and layout-triggering hacks. |
| "CSS animations are always performant" | CSS animations on layout-triggering properties (height, width, padding) are just as janky as JavaScript ones. Performance depends on which properties you animate, not which API drives them. |

---

## TRIGGERS

Invoke this knowledge when:
- [ ] Building or reviewing a UI with interactive elements or state transitions
- [ ] Elements appear/disappear abruptly without transition
- [ ] Animations feel bouncy, gimmicky, or dated
- [ ] Scroll performance is poor due to animation
- [ ] Developer asks "what duration/easing should I use?"
- [ ] Loading states feel slow or unresponsive
- [ ] Accessibility audit flags missing prefers-reduced-motion support
- [ ] Multiple animations compete for user attention simultaneously
- [ ] A page transition or view change feels disorienting

Prerequisite state:
- Basic understanding of CSS transitions and transforms
- Awareness that the interface has interactive elements or state changes
- Access to browser DevTools for performance testing

---

## PRODUCES

After applying this knowledge:
- State: Interface uses purposeful, performant animation that communicates state changes, guides attention, and respects user motion preferences
- Artifacts: Animation system with consistent durations (100/300/500), easing curves (ease-out-expo entry, ease-in-expo exit), stagger patterns, reduced-motion media query, and skeleton loading states
- Understanding: Developer can articulate why each animation exists, what it communicates, and why its timing and easing were chosen

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Animations are in place but visual hierarchy is weak | Visual hierarchy and composition capability | Motion guides attention but hierarchy determines what deserves attention |
| Entry animations work but color transitions feel flat | Color theory capability | Color shifts during transitions (hover states, theme changes) require understanding of color relationships |
| Motion is smooth but typography feels disconnected | Typography and type scale capability | Animated text needs appropriate type choices for readability during motion |
| Animations work but layout shifts during loading | Proportion and layout capability | Skeleton screens and content loading require stable layout foundations |
| Interface needs complex scroll-driven storytelling | Advanced scroll animation capability (GSAP, scroll-timeline) | Basic IntersectionObserver reveals may not be sufficient for narrative scroll experiences |

---

## CSO KEYWORDS

motion design, animation, CSS transitions, CSS animations, easing, cubic-bezier, ease-out, ease-in, ease-in-out, exponential easing, keyframes, transform, translate, scale, rotate, opacity, GPU compositing, layout thrashing, jank, 60fps, stagger, staggered animation, orchestration, reduced motion, prefers-reduced-motion, perceived performance, skeleton screen, optimistic UI, loading state, micro-interaction, exit animation, entry animation, FLIP technique, View Transitions API, IntersectionObserver, scroll-triggered animation, will-change, transitionend, animationend, grid-template-rows, collapse animation, accordion animation, modal animation, page transition, state morphing, shimmer loading, Web Animations API, animation duration, animation delay, 100ms 300ms 500ms, timing rule, motion accessibility, vestibular disorder, bounce easing, elastic easing
