# Responsive Design for Interfaces
**Source:** Modern frontend design principles
**Core Concept:** Interfaces should adapt their behavior and presentation based on the viewing context -- screen size, input method, and container dimensions -- designing for the content first and layering complexity progressively rather than stripping it away from a desktop original. Start small. Build up.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are building or reviewing a UI that must work across different screen sizes or devices
- [ ] The interface has layout, typography, or interactive elements that change with viewport or container size
- [ ] You need to ensure usability across touch and pointer input methods

**Do NOT apply when ANY are true:**
- [ ] The design is exclusively for a single fixed-size context (e.g., embedded kiosk display with known dimensions)
- [ ] You are working on server-side logic with no visual presentation layer
- [ ] The output is a static image or PDF with no interactive or reflowable content

---

## PROBLEM -> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| Layout breaks or overflows on narrow screens | Yes | Likely missing mobile-first breakpoints or fluid sizing |
| Buttons and links are hard to tap on mobile | Yes | Touch targets need minimum 44x44px sizing and adequate spacing |
| Large images load slowly on mobile connections | Yes | Images need srcset/sizes or picture element for responsive delivery |
| Text is too small or too large at certain viewport widths | Yes | Fluid typography with clamp() provides smooth scaling with guardrails |
| A component looks wrong when placed in a narrow sidebar vs. main content | Yes | Container queries allow component-level responsiveness independent of viewport |
| Content is hidden on mobile with display:none | Yes | Content should be adapted for mobile, not amputated |
| Design uses hardcoded breakpoints like 768px or 1024px | Yes | Breakpoints should be driven by where content breaks, not device dimensions |
| Choosing colors or typefaces | No | Use color theory or typography principles instead |
| Optimizing server response times | No | Use performance engineering principles instead |

---

## KEY DEFINITIONS

> **Breakpoint** -- a viewport or container width at which the layout changes to better serve the content at that size. Breakpoints should be set where the content needs them, not where specific devices happen to exist.

> **Media query** -- a CSS conditional that applies styles based on characteristics of the viewport or device, such as width, height, orientation, pointer type, or hover capability. `@media (min-width: 768px) { ... }`

> **Container query** -- a CSS conditional that applies styles based on the size of a parent container rather than the viewport. Enables truly component-level responsiveness. `@container (min-width: 400px) { ... }`

> **Fluid typography** -- type sizing that scales smoothly between a minimum and maximum value as the viewport or container changes, typically implemented with clamp(). Eliminates abrupt size jumps at breakpoints.

> **clamp()** -- a CSS function that accepts a minimum value, a preferred value, and a maximum value: `clamp(min, preferred, max)`. The preferred value usually includes a viewport or container unit to enable fluid scaling.

> **min()** -- a CSS function that returns the smallest of its arguments: `width: min(100%, 1200px)` ensures an element never exceeds 1200px but shrinks below it.

> **max()** -- a CSS function that returns the largest of its arguments: `width: max(300px, 50%)` ensures an element is at least 300px wide.

> **Viewport unit** -- a CSS unit relative to the viewport dimensions: `vw` (1% of viewport width), `vh` (1% of viewport height), `dvh` (dynamic viewport height accounting for mobile browser chrome).

> **Container unit** -- a CSS unit relative to a query container's dimensions: `cqw` (1% of container width), `cqh` (1% of container height).

> **Mobile-first** -- a design and development strategy that starts with the smallest screen experience and progressively adds layout complexity via min-width media queries as the viewport grows.

> **Progressive enhancement** -- building a baseline experience that works everywhere, then layering on advanced features for contexts that support them, rather than building for the best case and degrading.

> **Intrinsic design** -- an approach where layout components define their own sizing behavior using flexible units (fr, minmax, auto-fit, auto-fill) so they adapt naturally without explicit breakpoints.

> **Safe area** -- the region of a device screen unobstructed by hardware features like notches or rounded corners. Accessed via `env(safe-area-inset-top)`, `env(safe-area-inset-right)`, etc.

> **env()** -- a CSS function providing environment variables set by the user agent, most commonly used for safe area insets on notched devices.

> **Pointer media query** -- `@media (pointer: coarse)` targets touch input; `@media (pointer: fine)` targets mouse/trackpad. Used to adapt interaction targets by input method.

> **Hover media query** -- `@media (hover: none)` targets devices without hover capability (touchscreens); `@media (hover: hover)` targets devices with hover. Used to avoid hiding content behind hover states on touch devices.

> **srcset** -- an HTML attribute on `<img>` that provides a set of image sources at different sizes or resolutions, allowing the browser to select the most appropriate one.

> **Picture element** -- the `<picture>` HTML element that wraps `<source>` elements with media conditions and a fallback `<img>`, enabling art-directed responsive images.

---

## DETECTION CHECKLIST

Signs this knowledge applies:

### Visual Symptoms
- [ ] Layout overflows horizontally on narrow screens, requiring horizontal scrolling
- [ ] Text is unreadably small on mobile or excessively large on wide screens
- [ ] Buttons and interactive elements are too small to reliably tap on touch devices
- [ ] Large hero images appear at full resolution on mobile, causing slow loads
- [ ] Navigation is unusable on small screens (overlapping items, truncated labels)
- [ ] Content disappears on mobile (hidden with display:none) instead of being adapted
- [ ] Components break when placed in different-width containers (sidebar vs. main area)
- [ ] Layout snaps abruptly between breakpoints instead of scaling smoothly

### CSS/HTML Patterns to Look For
- [ ] `@media (max-width: ...)` used instead of `@media (min-width: ...)` -- indicates desktop-first approach
- [ ] Hardcoded breakpoints matching specific devices: `320px`, `375px`, `768px`, `1024px`
- [ ] `display: none` used to hide content blocks on mobile
- [ ] Fixed pixel widths on containers (e.g., `width: 960px` without max-width or min-width)
- [ ] `<img>` tags without `srcset` or `sizes` attributes
- [ ] Font sizes in fixed `px` values with no fluid scaling
- [ ] Viewport units (`vw`, `vh`) used without `clamp()` guardrails
- [ ] No `@container` queries for reusable components
- [ ] No pointer or hover media queries despite touch-interactive elements

### Developer Statements That Trigger This
- "We'll make it responsive later"
- "Just hide that section on mobile"
- "Let's use Bootstrap's breakpoints"
- "It works on my laptop, we'll fix mobile after launch"
- "Nobody uses mobile for this kind of application"
- "I set the width to 768px because that's the iPad width"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] Mobile-first approach: styles use min-width media queries, not max-width -> Fail if: CSS is structured with max-width queries that strip features from a desktop baseline
- [ ] Touch targets are minimum 44x44px on touch devices -> Fail if: buttons, links, or interactive elements are smaller than 44x44px when accessed via touch input
- [ ] No horizontal scrolling on any viewport width -> Fail if: content overflows the viewport horizontally at any supported width
- [ ] Content is readable without zooming on mobile -> Fail if: body text requires pinch-to-zoom to read on a standard mobile device
- [ ] No critical functionality hidden on mobile -> Fail if: features available on desktop are removed (not adapted) on mobile via display:none

### Should Pass (Important)
- [ ] Breakpoints are driven by content, not device sizes -> Warning if: breakpoints are set at 768px, 1024px, or other device-specific values without content-based justification
- [ ] Fluid typography using clamp() -> Warning if: font sizes jump abruptly at breakpoints instead of scaling smoothly
- [ ] Container queries used for component-level responsiveness -> Warning if: reusable components rely solely on viewport-based media queries
- [ ] Images use srcset/sizes or picture element -> Warning if: images are served at a single resolution regardless of viewport or pixel density
- [ ] Navigation adapts for touch vs pointer devices -> Warning if: navigation relies on hover states or uses targets smaller than 44px on touch devices

### Nice to Have
- [ ] Pointer and hover media queries used for input adaptation -> Suggestion: use @media (pointer: coarse) to enlarge targets and simplify interactions on touch devices
- [ ] Safe area padding for notched devices -> Suggestion: add env(safe-area-inset-*) padding to fixed elements and full-bleed layouts
- [ ] Fluid spacing with clamp() matching fluid typography scale -> Suggestion: scale margins and padding proportionally with typography for consistent visual rhythm

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Max-width media queries as primary responsive strategy | Critical | Desktop-first approach that strips features; harder to maintain, often results in broken mobile experience | Rewrite CSS mobile-first using min-width queries; start with the narrowest layout |
| Fixed pixel breakpoints matching specific devices (320px, 768px, 1024px) | High | Breakpoints will not age well as new devices appear; indicates device-thinking instead of content-thinking | Set breakpoints where the content actually breaks by resizing the browser and noting where the layout fails |
| Content hidden on mobile via display:none | High | Mobile users lose access to content; "mobile users deserve less" thinking | Adapt the content presentation for mobile (collapse, reorder, summarize) instead of removing it |
| Fixed-width containers (width: 960px) | High | Layout will overflow or have dead space at unexpected viewport widths | Use max-width with percentage or fluid widths: `width: min(100%, 960px)` or `max-width: 960px; width: 100%` |
| Images without srcset or responsive strategy | Medium | Mobile users download unnecessarily large images; wastes bandwidth and slows load times | Add srcset with multiple resolutions and sizes attribute describing intended display size |
| No touch target sizing consideration | Medium | Interactive elements may be too small to tap reliably, causing user frustration | Apply minimum 44x44px hit areas for all interactive elements on touch devices |
| Viewport units without clamp() guardrails | Medium | Text or spacing becomes unreadably small on narrow screens or excessively large on wide screens | Wrap viewport-unit values in clamp() to set minimum and maximum bounds |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify the content and its natural reflow points by resizing the browser window
- [ ] Determine the primary input methods (touch, pointer, or both)
- [ ] Identify which components are reusable and may appear in different container widths
- [ ] Audit images and media for responsive delivery needs (multiple resolutions, art direction)

### During Design
- [ ] Step 1: Start with the smallest screen -- design the mobile layout first
  - Verify: Every piece of content and functionality is accessible at the narrowest supported width
- [ ] Step 2: Add complexity via min-width media queries as the viewport grows
  - Verify: Each breakpoint adds layout (multi-column, sidebar, expanded nav) rather than removing content
- [ ] Step 3: Set breakpoints where the content breaks, not at device widths
  - Verify: Resize the browser slowly; add a breakpoint wherever the layout starts to look awkward
- [ ] Step 4: Implement fluid typography using clamp()
  - Verify: Text scales smoothly between breakpoints without jumps
  ```css
  /* Base: 16px, scales to 20px */
  font-size: clamp(1rem, 0.75rem + 1.25vw, 1.25rem);
  /* Heading: 24px, scales to 40px */
  font-size: clamp(1.5rem, 0.5rem + 3vw, 2.5rem);
  ```
- [ ] Step 5: Use container queries for reusable components
  - Verify: Components adapt based on their container width, not just the viewport
  ```css
  .card-container { container-type: inline-size; }
  @container (min-width: 400px) { .card { /* wider layout */ } }
  ```
- [ ] Step 6: Implement responsive images with srcset and sizes
  - Verify: Browser downloads appropriately sized images for the viewport and pixel density
  ```html
  <img srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
       sizes="(min-width: 800px) 50vw, 100vw"
       src="medium.jpg" alt="...">
  ```
- [ ] Step 7: Adapt interactions for input method
  - Verify: Touch devices get larger targets and no hover-dependent content
  ```css
  @media (pointer: coarse) { .btn { min-height: 44px; min-width: 44px; } }
  @media (pointer: fine) { .btn { min-height: 32px; } }
  @media (hover: none) { .tooltip-trigger { /* show info inline, not on hover */ } }
  ```

### After Design
- [ ] Test at every width from 320px to widest supported, watching for overflow or awkward reflow
- [ ] Test with touch simulation: verify all interactive elements are tappable without precision
- [ ] Verify no content is lost between viewport sizes (adapted is fine, removed is not)
- [ ] Check images load at appropriate resolution for the device (not oversized on mobile)
- [ ] Test on a notched device or simulator to verify safe area handling on fixed elements

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: Desktop-First to Mobile-First Rewrite

**Problem (Before):**
CSS starts with a wide desktop layout and uses max-width media queries to strip away features for smaller screens. The mobile experience feels like a broken version of the desktop -- missing functionality, awkward stacking of elements that were designed side-by-side.

**Solution (After):**
Restructure CSS to start with a single-column mobile layout. Add layout complexity through min-width media queries: sidebar appears at ~768px, multi-column grid at ~1200px. Every viewport gets a layout designed for its size, not a degraded version of a larger one. No viewport is an afterthought.

**Key Change:** Reversed the CSS cascade direction from subtract-to-fit to add-as-needed, ensuring every viewport width gets an intentional layout.

---

### Pattern 2: Fixed Breakpoints to Content-Driven Breakpoints

**Problem (Before):**
Breakpoints are set at 768px and 1024px because "that's what Bootstrap uses" or "that's the iPad and laptop width." The layout looks fine at exactly those widths but breaks at 500px, 900px, and other in-between sizes. New devices expose the gaps fast.

**Solution (After):**
Remove device-based breakpoints. Resize the browser from narrow to wide and watch where the content starts to look awkward -- a line of text gets too long, a grid has too much whitespace, a card stretches uncomfortably. Set breakpoints at those natural content break points (e.g., ~480px, ~720px, ~1100px for this specific content).

**Key Change:** Breakpoints serve the content, not the device. The layout works at every width, not just the "standard" ones.

---

### Pattern 3: Hidden Mobile Content to Adapted Mobile Interface

**Problem (Before):**
A data table, sidebar widget, or secondary navigation is wrapped in `display: none` at mobile widths. Mobile users lose access to that functionality entirely. The developer said "mobile users don't need that" without any evidence.

**Solution (After):**
Replace display:none with adaptation: the data table becomes a stacked card layout on mobile, the sidebar widget moves below the main content, the secondary navigation collapses into an accordion. Everything stays accessible. It's just presented differently.

**Key Change:** Adapted the presentation for the context instead of amputating content, respecting the principle that mobile users deserve the same capabilities.

---

### Pattern 4: Fixed Images to Responsive Images with srcset

**Problem (Before):**
A single large image (1200px wide, 300KB) goes to all devices. On mobile over cellular data, this image dominates page load time. On high-DPI displays, it's actually too small and looks blurry. The same file serves no context well.

**Solution (After):**
Provide multiple image sizes via srcset and let the browser choose. A 400px-wide version loads on mobile (50KB), an 800px version on tablets (150KB), and a 1200px version on desktop (300KB). The sizes attribute tells the browser how wide the image will display, so it picks the right one.

**Key Change:** Moved image size selection from a single hardcoded source to a browser-negotiated choice based on viewport and pixel density.

---

## CORE PRINCIPLES

Design for the content, not the device. Breakpoints should happen where the content needs them, not where a particular phone or tablet screen starts and stops. The interface should adapt its behavior -- layout, interaction model, information density -- not just its size. A phone user deserves the same capabilities as a desktop user, just presented for their context. Start with the smallest screen. Build up. Let the content tell you where it needs to change.

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] CSS uses min-width (mobile-first) media queries, not max-width
- [ ] Breakpoints correspond to content needs, not device dimensions
- [ ] All interactive elements meet 44x44px minimum on touch devices
- [ ] No horizontal scrolling at any supported viewport width
- [ ] No content removed on mobile -- only adapted
- [ ] Typography scales fluidly with clamp() rather than jumping at breakpoints
- [ ] Images are served responsively via srcset/sizes or picture element
- [ ] Hover-dependent content has a non-hover alternative

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Desktop-first (max-width) responsive strategy | Critical | Produces fragile mobile experiences that break as new devices emerge |
| Content removed on mobile via display:none | Critical | Mobile users lose access to functionality; violates progressive enhancement |
| No horizontal scroll prevention | Critical | Horizontal scrolling on mobile is a fundamental usability failure |
| Touch targets below 44x44px | High | Users can't reliably interact with the interface on touch devices |
| Fixed device-based breakpoints | High | Layout breaks on non-standard viewport widths; doesn't age well |
| No responsive images | Medium | Wastes bandwidth on mobile; may appear blurry on high-DPI displays |
| No fluid typography | Medium | Abrupt size jumps at breakpoints feel jarring; missed opportunity for polish |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Start every layout from the narrowest supported width and build up
- [ ] Use min-width media queries exclusively for responsive behavior
- [ ] Set breakpoints by resizing the browser and noting where content breaks
- [ ] Implement fluid typography: `font-size: clamp(1rem, 0.75rem + 1.25vw, 1.25rem)` for body, scale headings proportionally
- [ ] Use container queries for any component that may appear in multiple container widths
- [ ] Provide srcset with at least 3 sizes for content images
- [ ] Test with both pointer: coarse and pointer: fine to verify input adaptation
- [ ] Add env(safe-area-inset-*) padding to any fixed or full-bleed elements

---

## THIS VS THAT

| Confusion Point | This Reference Says | Not This |
|-----------------|---------------------|----------|
| "Mobile-first means designing for mobile only" | Mobile-first means starting with mobile and progressively enhancing for wider viewports; every viewport gets an intentional layout | Mobile-first means the mobile version is the only one that matters |
| "Responsive design means adding media queries" | True responsive design includes fluid sizing (clamp, min, max), container queries, intrinsic layouts (grid auto-fit), and input adaptation -- media queries are just one tool | Responsive design = a few @media blocks |
| "Hide it on mobile" | Adapt the presentation for mobile context (collapse, reorder, simplify) but keep all content and functionality accessible | Removing features on mobile is an acceptable responsive strategy |
| "Use Bootstrap breakpoints" | Breakpoints should be set where your specific content breaks, not at framework defaults that match old device widths | Standard framework breakpoints work for all content |
| "Container queries replace media queries" | Container queries and media queries serve different purposes: container queries handle component-level responsiveness, media queries handle viewport-level layout changes | You only need one or the other |
| "Viewport units make everything responsive" | Viewport units without clamp() guardrails cause text to become unreadable at extremes; always bound fluid values with minimums and maximums | Using vw for font-size makes text automatically responsive |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Recommended | When |
|----------------|---------|-------------|------|
| Responsive strategy direction | Mobile-first (min-width) vs. desktop-first (max-width) | Mobile-first (min-width) | Always; mobile-first produces more resilient layouts and forces content prioritization |
| Breakpoint values | Device-based (768px, 1024px) vs. content-driven | Content-driven | Always; resize browser and set breakpoints where layout actually breaks |
| Typography scaling | Fixed px at breakpoints vs. fluid clamp() | Fluid clamp() | When text needs to scale smoothly; use fixed values only for unchanging UI labels |
| Component responsiveness | Media queries vs. container queries | Container queries | For reusable components that appear in multiple container widths (cards, widgets) |
| Image delivery | Single src vs. srcset/sizes vs. picture element | srcset/sizes for resolution switching; picture for art direction | srcset for same image at different sizes; picture when the crop or composition changes at different widths |
| Touch target sizing | One size for all vs. input-adapted | Input-adapted via pointer media query | When the interface serves both touch and pointer users |
| Layout approach | Explicit breakpoints vs. intrinsic (auto-fit/minmax) | Intrinsic where possible, breakpoints for major layout shifts | Use CSS Grid auto-fit/minmax for naturally reflowing grids; add breakpoints for structural changes like sidebar appearance |
| Notch/safe area handling | Ignore vs. env() padding | env() padding on fixed and full-bleed elements | Any app that may be viewed on notched devices (most modern phones) |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| Mobile-first cascade | Builds layout from simple to complex via min-width queries | All responsive CSS | Write base styles for mobile; add `@media (min-width: ...)` blocks for wider layouts |
| Fluid typography with clamp() | Scales text smoothly between minimum and maximum sizes | Body text, headings, any text that should scale with viewport | `font-size: clamp(1rem, 0.75rem + 1.25vw, 1.25rem)` -- min 16px, max 20px, scales between |
| Container queries | Makes components respond to their container width, not viewport | Reusable components (cards, widgets, data displays) in varying containers | Set `container-type: inline-size` on parent; use `@container (min-width: ...)` for child styles |
| Responsive images with srcset | Lets browser choose the best image size for the context | All content images that appear at varying sizes | Add `srcset` with width descriptors and `sizes` attribute describing display width |
| Art-directed responsive images | Serves different image crops or compositions at different widths | Hero images, product shots where framing matters at different sizes | Use `<picture>` with `<source media="...">` elements for each breakpoint |
| Input adaptation with pointer/hover queries | Adjusts interaction targets and patterns based on input device | Interfaces serving both touch and mouse users | `@media (pointer: coarse)` for touch targets; `@media (hover: none)` for non-hover alternatives |
| Intrinsic layout with CSS Grid | Creates grids that reflow naturally without explicit breakpoints | Card grids, gallery layouts, any repeating layout pattern | `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` |
| Safe area padding | Prevents content from being obscured by device hardware features | Fixed headers/footers, full-bleed backgrounds on notched devices | `padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right)` |

---

## COMMON MISTAKES

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Starting with the desktop layout and adding max-width queries to "fix" mobile | Desktop is the developer's primary working environment; it feels natural to start there | Start with the mobile layout; add min-width queries to layer on complexity as space allows |
| Using Bootstrap default breakpoints (576px, 768px, 992px, 1200px) without question | Framework provides defaults and developer assumes they are universal best practice | Resize the browser and find where your specific content breaks; those are your breakpoints |
| Hiding content on mobile with display:none | Quick fix when content doesn't fit; assumption that mobile users need less | Adapt the content: collapse into accordions, reorder priority, use progressive disclosure |
| Setting font-size with raw viewport units (font-size: 4vw) | Developer wants fluid text but doesn't know about clamp() | Use clamp() to set minimum and maximum bounds: `font-size: clamp(1rem, 0.75rem + 1.25vw, 1.25rem)` |
| Using only viewport media queries for component layout | Developer isn't yet aware of container queries or browser support concerns | Use container queries for reusable components; they're supported in all modern browsers |
| Serving a single image size to all devices | Simplicity; developer doesn't want to generate multiple image sizes | Use srcset with at least 3 sizes (small, medium, large) and a sizes attribute |
| Ignoring touch target sizing | Testing only with a mouse where small targets are easy to click | Apply minimum 44x44px to all interactive elements on touch devices via @media (pointer: coarse) |
| Relying on hover states for essential information | Desktop-centric design patterns; hover feels natural with a mouse | Provide non-hover alternatives; use @media (hover: none) to show information inline instead of on hover |
| Using fixed-width containers (width: 960px) | Legacy pattern from fixed-width design era | Use `width: min(100%, 960px)` or `max-width: 960px` with `width: 100%` |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "We'll make it responsive later" | Retrofitting responsiveness costs far more than building mobile-first from the start. The desktop-first CSS cascade fights you; you end up overriding everything at smaller widths. Start mobile-first and the wide layout becomes additive. |
| "Nobody uses mobile for this" | Analytics consistently show mobile traffic exceeding 50% globally. Even enterprise tools see significant mobile and tablet usage. If you don't measure it, you don't know -- and even niche audiences use mobile more than developers assume. |
| "Bootstrap breakpoints are fine" | Bootstrap breakpoints were chosen for common devices circa 2013. Devices change constantly. Your content has its own natural break points that don't align with any framework's defaults. Set breakpoints where your content breaks. |
| "We can just hide that on mobile" | Hiding content on mobile means mobile users get a lesser product. Adapt the presentation instead: collapse, reorder, or use progressive disclosure. Every user deserves the same functionality regardless of their device. |
| "Container queries aren't well supported" | Container queries have been supported in all major browsers (Chrome, Firefox, Safari, Edge) since early 2023. Baseline support is well established. There's no technical reason to avoid them for new projects. |

---

## TRIGGERS

Invoke this knowledge when:
- [ ] Building a new interface that must work across screen sizes
- [ ] A design or layout breaks on mobile or narrow viewports
- [ ] Developer asks how to handle different screen sizes
- [ ] Reviewing CSS that uses max-width media queries or fixed breakpoints
- [ ] Components look wrong when placed in different-width containers
- [ ] Images are loading slowly on mobile devices
- [ ] Interactive elements are hard to tap on touch screens
- [ ] Content is hidden on mobile instead of adapted
- [ ] Typography jumps abruptly between breakpoints instead of scaling smoothly
- [ ] Developer asks about container queries, fluid typography, or responsive images

Prerequisite state:
- Basic understanding of CSS layout (flexbox, grid)
- Awareness that the interface will be used on multiple device types and screen sizes
- Access to resize the browser or test on multiple viewports

---

## PRODUCES

After applying this knowledge:
- State: Interface adapts fluidly across all supported viewport widths and input methods, with no content loss, no horizontal overflow, and intentional breakpoints driven by content needs
- Artifacts: Mobile-first CSS with min-width breakpoints, fluid typography scale using clamp(), container query definitions for reusable components, responsive image markup with srcset/sizes, input adaptation via pointer/hover queries
- Understanding: Developer can articulate why each breakpoint exists, how fluid sizing works, when to use container queries vs. media queries, and why content should be adapted rather than hidden

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Layout is responsive but typography hierarchy is weak | Typography and type scale design capability | Responsive layout handles spatial adaptation but typographic hierarchy (size, weight, spacing) is a separate design decision |
| Responsive images are set up but color palette needs work | Color theory and application capability | Responsive delivery handles performance but color choices require design theory |
| Layout adapts but visual hierarchy is unclear at different sizes | Visual hierarchy and composition capability | Elements may reflow correctly but lose their intended emphasis or reading order |
| Responsive design is solid but performance is still poor | Performance optimization capability | Responsive images help but overall performance involves bundling, lazy loading, caching, and more |
| Components are responsive but design feels inconsistent across breakpoints | Design system and component library capability | Individual responsiveness needs a systematic approach to maintain consistency at scale |

---

## CSO KEYWORDS

responsive design, mobile-first, progressive enhancement, breakpoint, media query, container query, fluid typography, clamp(), min(), max(), viewport unit, vw, vh, dvh, container unit, cqw, srcset, sizes, picture element, art direction, touch target, 44px, pointer media query, hover media query, safe area, env(), intrinsic design, auto-fit, auto-fill, minmax, CSS Grid, flexbox, responsive images, content-driven breakpoints, mobile layout, adaptive interface, input adaptation, pointer coarse, pointer fine, hover none, progressive disclosure, display none mobile, max-width query, min-width query, fluid spacing, responsive navigation, responsive table, viewport overflow, horizontal scroll
