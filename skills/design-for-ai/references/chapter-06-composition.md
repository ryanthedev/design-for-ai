# Holding the Eye: Composition and Design Principles
**Book:** Design for Hackers (David Kadavy)
**Part:** Part II — Visual Design Principles
**Core Concept:** A good composition attracts the viewer's eye and engages it throughout by leveraging interrelated design principles — dominance, similarity, rhythm, texture, direction, and contrast — to create compelling, organized, and visually interesting designs.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are arranging visual elements within a layout, page, screen, or canvas
- [ ] The design needs to attract attention, hold the viewer's eye, and guide them through the content
- [ ] You need to establish visual relationships between elements (hierarchy, grouping, flow)

**Do NOT apply when ANY are true:**
- [ ] You are only choosing individual colors, typefaces, or fonts in isolation (use color theory or typography guidance instead)
- [ ] The task is purely about geometric proportions or grid math without compositional arrangement (use proportional systems guidance instead)
- [ ] The design is purely textual content with no layout decisions to make

---

## PROBLEM --> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| Layout feels flat and uninteresting — nothing draws the eye | Yes | Apply dominance and contrast to create a focal point and visual hierarchy |
| Elements feel scattered and disconnected across the page | Yes | Apply similarity, rhythm, and direction to create cohesion and flow |
| User's eye leaves the design quickly; nothing holds attention | Yes | Composition recycling — use directional forces to keep the eye circulating |
| Need to choose specific colors or font families | No | Use color theory (Chapter 9) or typography guidance; composition governs arrangement, not individual attribute choices |
| Need to determine spacing ratios and grid dimensions | Partial | Proportional systems (Chapter 5) determine the grid; composition principles determine what goes where and how it relates |
| UI elements all compete for attention equally | Yes | Establish dominance — make the most important element largest, darkest, lightest, or most surrounded by white space |
| Design looks "right" technically but feels lifeless | Yes | Apply rhythm, texture variation, and foreground/background relationships to add depth and visual interest |
| Web page layout needs to account for how users scan | Yes | Design for F-pattern reading direction; place most important content top-left and guide eye with compositional forces |

---

## KEY DEFINITIONS

> "The term *composition* refers to the way that elements are arranged within a piece of design, the interrelationships between those elements, and — if applicable — the relationships between those elements and a canvas or display. A good composition is what attracts the viewer's eye and engages it, guiding his eye throughout."
> — Chapter 6, Design for Hackers

> "The term *design principles* refers to a series of beliefs or tenets about what kind of features make a composition attractive."
> — Chapter 6, Design for Hackers

> "The principle of dominance creates visual interest in a composition by drawing the viewer's eye to an important element in the composition. When an element is dominant in a composition, it is one of the first things your eye is drawn to. It acts almost like a magnet when you first lay eyes on the composition. It also acts as an anchor — you keep returning to it as you explore other parts of the composition."
> — Chapter 6, Design for Hackers

> "*Similarity* means that various elements of a composition — their shape, color, line characteristics (smooth or jagged), or texture — are similar to one another."
> — Chapter 6, Design for Hackers

> "*Texture* is the visual indication that something has characteristics that would be palpable if you were able to touch them."
> — Chapter 6, Design for Hackers

> "The principle of contrast causes certain parts of a composition to stand out more than others because of differences — or *contrast* — between elements. Things in a composition can contrast with one another in terms of size, color, value (lightness or darkness), texture, shape, line quality... just about any way imaginable."
> — Chapter 6, Design for Hackers

> "When something appears to be closer to you in a painting or composition, it is considered to be in the *foreground*. Things in the foreground are likely to be noticed first in any composition."
> — Chapter 6, Design for Hackers

> "When something appears to be farther from you than things that are in the foreground, they are generally considered to be in the *background*."
> — Chapter 6, Design for Hackers

---

## DETECTION CHECKLIST

Signs this chapter's knowledge applies:

### Visual Symptoms
- [ ] Layout feels "off" — nothing pulls the eye in or holds attention
- [ ] All elements feel equally weighted; no clear focal point
- [ ] Elements feel disjointed — no visual cohesion or recurring motifs
- [ ] Design feels flat with no sense of depth or layering
- [ ] The viewer's eye wanders off the design rather than being recycled through it
- [ ] Page or screen feels cluttered despite having reasonable content volume
- [ ] Important content is buried; users miss key information

### CSS/HTML Patterns to Look For
- [ ] All elements have similar font-size, color weight, and spacing — no dominance hierarchy
- [ ] No consistent shape language (mixing rounded and sharp corners arbitrarily)
- [ ] No use of box-shadow, z-index layering, or opacity to create foreground/background depth
- [ ] Elements lack alignment to shared invisible axes or grid lines
- [ ] No repeating visual motif (icon style, spacing rhythm, color pattern)
- [ ] Mouseover/hover states do not change foreground/background relationship

### Developer Statements That Trigger This
- "Everything on the page feels equally important"
- "The layout works but something feels wrong — it's boring"
- "Users aren't looking at the most important thing on the page"
- "The design looks random even though I used a grid"
- "I don't know how to make the design feel cohesive"
- "The page doesn't hold your attention"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] Dominant element exists — one element is clearly the first thing the eye is drawn to --> Fail if: all elements compete equally for attention with no clear focal point
- [ ] Directional flow is present — the eye is guided through the composition rather than getting stuck or leaving --> Fail if: no implicit or explicit lines, alignment, or shapes guide the viewer's eye between elements
- [ ] Foreground/background relationship exists — there is a sense of depth or layering --> Fail if: all elements sit on the same visual plane with no depth cues (size, shadow, color intensity, detail)

### Should Pass (Important)
- [ ] Similarity is used — recurring shapes, colors, or visual characteristics create cohesion --> Warning if: elements use unrelated shapes, colors, or styles with no visual echo
- [ ] Contrast supports hierarchy — differences in size, color, or value direct attention intentionally --> Warning if: contrast is accidental or undermines the intended reading order
- [ ] Reading direction is respected — most important content is positioned where the eye enters (top-left for Western audiences) --> Warning if: critical content is placed in low-attention zones (bottom-right) without strong directional forces leading to it

### Nice to Have
- [ ] Rhythm is present — repeating visual patterns create a sense of visual music --> Suggestion: add consistent spacing, repeating icon styles, or regular visual beats
- [ ] Texture variation adds visual interest and depth --> Suggestion: introduce subtle texture differences to distinguish foreground from background
- [ ] Eye "recycling" — compositional forces keep the viewer's eye circulating within the design --> Suggestion: use directional cues to redirect the eye back into the composition at exit points

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| No single dominant element; everything is the same visual weight | Critical | No visual hierarchy; viewer doesn't know where to look first | Make one element dominant via size, color, value, white space, or placement |
| Eye exits the composition immediately with nothing pulling it back | Critical | Composition fails to "recycle" the viewer's eye | Add directional forces (lines, alignment, shape groupings) that redirect the eye back into the composition |
| All elements identical in shape, size, and color with no contrast | High | No visual interest; composition is monotonous | Introduce contrast in at least one dimension (size, color, value, texture) |
| Important content placed in low-attention area without directional cues | High | F-pattern reading direction ignored; users miss key content | Move important content to top-left or create strong directional forces leading to it |
| No foreground/background relationship; everything on same visual plane | Medium | Design feels flat and lacks depth | Use size, color, shadows, detail level, or overlapping to create depth layers |
| Shapes, colors, and styles are all different with no recurring motif | Medium | Lack of similarity makes design feel chaotic and unrelated | Establish a shape language and color palette; repeat elements to build cohesion |
| Hover/interactive states don't change visual layering | Medium | Users lack affordance cues about what is clickable | Pop interactive elements into foreground on hover via color change, shadow, or scale |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify the purpose and primary message of the design
- [ ] Determine the reading direction of your target audience (left-to-right, top-to-bottom for Western)
- [ ] Identify 1-3 most important elements that need viewer attention
- [ ] Understand the medium and context (web page, mobile screen, logo, print)

### During Design
- [ ] Step 1: Establish dominance — make the most important element visually dominant through size, color, value, white space, or placement
  - Verify: Squint at the design; the dominant element should be the first thing visible
- [ ] Step 2: Create foreground/background relationships — use size, detail, color, shadows, or overlapping to establish depth layers
  - Verify: Elements feel like they exist on at least 2-3 different visual planes
- [ ] Step 3: Apply similarity — use recurring shapes, colors, line qualities, and textures to create visual cohesion
  - Verify: Elements echo each other; a consistent shape language or motif is recognizable
- [ ] Step 4: Build rhythm — repeat design elements or characteristics at regular intervals to create visual "beats"
  - Verify: Scanning the design reveals a predictable, pleasing pattern of repetition
- [ ] Step 5: Establish direction — use explicit lines, implicit alignment, shape groupings, or progressive sizing to guide the eye through the composition
  - Verify: Trace the eye's path; it should flow logically through the content hierarchy
- [ ] Step 6: Apply contrast — use differences in size, color, value, texture, or shape to make important elements stand out and create visual interest
  - Verify: Key elements pop against their surroundings; the design is not monotonous
- [ ] Step 7: Add texture where appropriate — use visual texture to create depth, interest, and differentiation between areas
  - Verify: Texture variation supports foreground/background relationships

### After Design
- [ ] Squint test: dominant element is still the first thing visible when details blur
- [ ] Eye recycling test: trace the eye path — does it circulate through the composition or exit?
- [ ] F-pattern check (for web): is the most important content in the top-left zone?
- [ ] Similarity audit: do recurring visual motifs create a sense of cohesion?
- [ ] Contrast check: does contrast support the intended hierarchy, not undermine it?
- [ ] Depth check: is there a clear foreground/background relationship?

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: Flat Equality to Dominant Hierarchy

**Problem (Before):**
All elements on the page have similar size, weight, and color. Nothing stands out. The viewer's eye wanders randomly with no clear entry point. Developers do this because they treat all content as equally important or use uniform styling for "consistency."

**Solution (After):**
Make one element clearly dominant — the largest, darkest, lightest, or most surrounded by white space. Use placement (top-left for web) to reinforce dominance. Other elements are visually subordinate, creating a clear hierarchy.

**Key Change:** One element becomes the visual anchor that draws the eye first and acts as a magnet the viewer keeps returning to.

**Example from book:** Think Vitamin's latest blog post is dominant via large type, dark background, and prominent top-left placement; subsequent posts are visually subordinate.

---

### Pattern 2: Disjointed Elements to Cohesive Composition

**Problem (Before):**
Elements use different shapes, inconsistent colors, and varied styles. The design feels like unrelated pieces thrown together. Developers do this by choosing each element's style independently without considering the whole.

**Solution (After):**
Establish a shape language (e.g., all rounded, all angular) and repeat it across elements. Use a limited color palette echoed throughout. Create rhythm through consistent spacing and repeating visual motifs.

**Key Change:** Similarity and rhythm bind disparate elements into a unified composition where each piece echoes the others.

**Example from book:** Think Vitamin uses rounded pill shapes throughout — logo, buttons, topic links, search box, icons — creating a cohesive visual language.

---

### Pattern 3: Static Layout to Guided Eye Flow

**Problem (Before):**
Elements are placed on a grid but there are no directional forces guiding the eye between them. The viewer sees individual pieces but not a flow. Developers rely solely on grid placement without considering how the eye moves between elements.

**Solution (After):**
Use alignment along invisible axes to create directional lines. Use progressive sizing or coloring to create flow. Group elements so their shapes form implicit directional forces. Ensure the eye is "recycled" back into the composition at potential exit points.

**Key Change:** Invisible directional forces (alignment, progressive sizing, shape groupings, explicit lines) create a path for the eye to follow.

**Example from book:** In the simple circle composition, progressively smaller circles aligned diagonally create a strong directional force across the canvas; grid-line alignment anchors elements to each other visually.

---

### Pattern 4: Flat Screen to Layered Depth

**Problem (Before):**
All elements sit on the same visual plane. The design feels like a flat sheet of paper with no depth. Interactive elements don't feel clickable. Developers use uniform styling with no shadows, overlapping, or visual weight differentiation.

**Solution (After):**
Create foreground/background/midground relationships using size, detail, color intensity, shadows, and overlapping. Make interactive elements pop into the foreground on hover. Use the active window pattern — more defined, colorful, and detailed elements feel closer.

**Key Change:** Depth cues (size, detail, shadow, color) create layers that make the composition feel three-dimensional and indicate interactivity.

**Example from book:** Mac OS uses foreground/background relationships — active windows have stronger gradients and colored buttons, while inactive windows have muted, gray details. Think Vitamin's hover states pop icons into the foreground (pink to red) to signal clickability.

---

## CORE PRINCIPLES

Composition is the arrangement of elements and their interrelationships within a design. A successful composition attracts the viewer's eye, guides it throughout, and "recycles" it so the viewer keeps looking. Six interrelated design principles — dominance, similarity, rhythm, texture, direction, and contrast — work together to make compositions compelling, and the presence of one principle often enables or reinforces another.

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] One element is clearly dominant — it acts as the visual anchor and entry point
- [ ] The eye is guided through the composition by directional forces (alignment, lines, shape groupings)
- [ ] Similarity creates cohesion — recurring shapes, colors, or textures echo throughout
- [ ] Contrast supports hierarchy — differences draw attention to the right things
- [ ] Foreground/background relationships create depth and indicate interactivity
- [ ] Rhythm is present — repeating visual elements create a sense of pattern
- [ ] The eye "recycles" within the composition rather than exiting

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| No dominant element | Critical | Viewer has no entry point; composition fails to engage |
| No directional flow | Critical | Eye wanders off the design; content is not consumed in intended order |
| No foreground/background depth | High | Design feels flat; interactive affordances are absent |
| No similarity or cohesion | High | Design feels chaotic and unrelated |
| No contrast | Medium | Design is monotonous; hierarchy is unclear |
| No rhythm | Low | Design may still function but lacks visual interest and scannability |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Establish one dominant element as the visual anchor first
- [ ] Create at least foreground and background layers for depth
- [ ] Use a consistent shape language and color palette for similarity
- [ ] Build rhythm through repeating visual motifs and consistent spacing
- [ ] Guide the eye with directional forces — alignment, lines, progressive sizing
- [ ] Use contrast to reinforce hierarchy and create visual interest
- [ ] Position critical content for the expected reading direction (top-left for Western web)

---

## THIS VS THAT

| Confusion Point | This Chapter Says | Not This |
|-----------------|-------------------|----------|
| Design principles vs. proportional systems | Design principles govern how elements relate compositionally (dominance, similarity, contrast, etc.); proportions govern the mathematical relationships between measurements | Proportions alone make a design beautiful — you also need composition and design principles |
| Consistency vs. similarity | Similarity means recurring visual characteristics (shape, color, texture) that create cohesion while allowing variation and contrast | Everything must look identical — true consistency without any variation is monotonous |
| Dominance vs. making everything big | Dominance is relative — one element is dominant because it contrasts with subordinate elements via size, color, value, or white space | Making multiple elements large and bold — this creates competing dominance and no hierarchy |
| Foreground/background vs. z-index only | Foreground/background is a perceptual relationship created by size, detail, color, shadow, and overlap — not just CSS stacking | Depth is only about drop shadows or z-index layering in CSS |
| Direction vs. literal arrows | Direction is usually implicit — created by alignment, shape groupings, progressive sizing, and invisible axes | You need literal arrows or lines to guide the eye |
| Design principles are fixed rules | There is no set group of design principles that are absolute; different books discuss different principles; they overlap and interconnect | Design principles are a rigid checklist that must all be present equally |
| Texture in web design | Texture includes font variation, weight differences, white space variation, and visual surface quality — even flat designs have texture through typography | Texture only means background images or physical material simulation |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Chapter Recommends | When |
|----------------|---------|-------------------|------|
| How to create dominance | Size, color/value, white space, placement, detail | Use the method that best fits the design's visual language | Always — every composition needs a dominant element |
| Where to place the dominant element | Top-left, center, anywhere with strong directional support | Top-left for web (F-pattern); anywhere if strong compositional forces guide the eye to it | Web: top-left is safest; art/logo: wherever compositional forces support it |
| How to create foreground/background | Size, detail level, color intensity, shadows, overlap | Use multiple cues together for strongest effect | When depth, layering, or interactive affordances are needed |
| How to establish direction | Explicit lines, alignment to invisible axes, shape groupings, progressive sizing | Prefer subtle implicit direction (alignment) for clean designs; use explicit direction for high-impact areas | Always — direction keeps the viewer's eye moving through the composition |
| How much contrast to use | High contrast throughout vs. sparingly in key areas | Can be a guiding principle (black and white design) or used sparingly for impact | High contrast throughout for bold/clean designs; sparingly for subtle/elegant designs |
| How to create rhythm | Repeating shapes, consistent spacing, repeating colors, icon patterns | Match the rhythm to the content structure (e.g., repeating blog post formats) | When the design has multiple similar units (list items, cards, posts, navigation) |
| Whether to include texture | Heavy texture, light texture, flat/no texture | Not every design needs strong texture; flat designs can succeed if other principles are strong | Add texture when the design needs depth or when the medium supports it |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| Eye recycling | Keeps the viewer's eye circulating within the composition rather than leaving | Any composition that needs to hold attention | Use directional forces that redirect the eye back inward at potential exit points; create sub-compositions that catch the eye as it travels |
| F-pattern placement | Aligns content with the natural scanning pattern of web users | Web page layouts | Place most important content top-left; use strong horizontal elements at top; allow scannable content down the left side |
| Invisible axis alignment | Creates implicit directional forces through element alignment | Any layout needing clean, subtle direction | Align edges or centers of elements along invisible vertical or horizontal lines; use grid-line intersections as anchor points |
| Progressive sizing | Creates a sense of direction through gradually changing element sizes | When you need to guide the eye along a path | Arrange elements from largest to smallest (or vice versa) along a directional line |
| Foreground pop on hover | Signals interactivity by pushing elements into the foreground on mouseover | Interactive web elements (buttons, links, icons) | Change color intensity, add shadow, increase size, or shift hue on hover to make elements "pop" forward |
| Sub-composition dominance | Creates local hierarchy within sections of a larger composition | Long or complex pages with multiple content sections | Within each section, make one element (title, icon) dominant using the same techniques as overall dominance |
| Shape language cohesion | Creates visual unity through consistent use of a shape vocabulary | Any multi-element design | Choose a primary shape characteristic (rounded, angular, geometric) and apply it consistently to buttons, icons, containers, and decorative elements |
| Triangular composition | Creates a self-contained, balanced composition that holds the eye | Logos, illustrations, hero images | Arrange key elements so they form the vertices of a triangle; the eye naturally circulates between the three points |
| Color contrast framing | Uses surrounding dark/contrasting areas to make a focal element pop | When one area needs maximum attention | Surround the focal element with darker or contrasting values to frame it and make it stand out |

---

## COMMON MISTAKES

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Making everything equally prominent | Developer treats all content as equally important | Establish a clear hierarchy — one dominant element, subordinate supporting elements |
| Ignoring reading direction for web layouts | Developer places content based on visual balance alone, not scan patterns | Respect the F-pattern: most important content top-left, scannable content down the left side |
| Using contrast inconsistently, accidentally drawing the eye to unimportant elements | Developer adds a bright color or large element for aesthetic reasons without considering its compositional weight | Every contrast decision should support the intended hierarchy; audit what the eye is drawn to |
| Mixing unrelated shapes and styles across a design | Developer designs each element independently | Establish a shape language (rounded vs. angular, etc.) and apply it consistently for similarity |
| Centering an element directly on a grid line when diagonal direction is needed | Developer snaps everything to grid intersections | Offset elements slightly from grid lines to maintain implied diagonal direction rather than creating stagnant vertical/horizontal anchoring |
| Relying solely on grid placement without directional forces | Developer assumes a grid system alone creates good composition | Grid determines position; direction, dominance, and other principles determine how the eye moves between those positions |
| No hover or interactive state changes for web elements | Developer styles elements identically in all states | Use foreground/background shift on hover — color change, shadow, scale — to signal interactivity |
| Using texture uniformly or not at all | Developer applies the same treatment to all surfaces | Vary texture intentionally to create depth and differentiate foreground from background areas |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "I used a grid system, so the composition should be fine" | A grid determines geometric proportions and placement, but not how the eye moves through the design. You still need dominance, direction, contrast, and other principles to make the composition compelling. |
| "Design principles are subjective — there's no right answer" | While there is no single set of absolute design principles, the principles described here are well-established and observable in every successful composition from Renaissance sculpture to modern web design. |
| "All my content is equally important, so nothing should be dominant" | If everything is equally prominent, nothing gets attention. Choose the most important element and make it dominant — this actually helps users find everything else by giving them a starting point and flow. |
| "Flat design means I don't need depth or foreground/background" | Even flat designs use foreground/background relationships through color intensity, size, and white space. Think Vitamin's flat design still pushes the latest post into the foreground via dark background and prominent placement. |
| "I just need to make it look nice — I'll know it when I see it" | When someone says a person "has an eye for design," they are describing knowledge of design principles. Great designers consciously understand and apply these principles — they don't just rely on intuition. |
| "Not every principle needs to be present" | True — the chapter acknowledges that not every principle must be strong in every design. But the core principles (dominance, direction, contrast) are nearly always essential. The absence of one can be compensated by strength in others. |
| "Adding more visual elements will make the design more interesting" | Composition interest comes from the relationships between elements, not the quantity. A simple composition of circles can be highly compelling through good use of dominance, direction, contrast, and similarity. |

---

## TRIGGERS

Invoke this chapter's knowledge when:
- [ ] A design layout needs to be created or arranged from scratch
- [ ] An existing design feels "boring," "flat," or "uninteresting" but the developer can't articulate why
- [ ] Users are not looking at the most important content on a page
- [ ] A design feels disjointed or lacks visual cohesion
- [ ] The developer asks "How do I make this layout more visually appealing?"
- [ ] A web page's eye-tracking or heatmap data shows users missing key content
- [ ] Elements on a page all compete equally for attention
- [ ] A logo or illustration needs to be evaluated for compositional strength
- [ ] Interactive elements don't feel clickable or lack visual affordance cues
- [ ] The design has good proportions/grid but still feels lifeless

Prerequisite state:
- Basic understanding of geometric proportions and grid systems (Chapter 5) is helpful but not strictly required
- Understanding of the medium (web, mobile, print) and target audience reading direction
- Knowledge of what content is most important in the design (business/product priorities)

---

## PRODUCES

After applying this knowledge:
- State: Design has a clear compositional structure with dominant focal point, directional eye flow, visual cohesion through similarity, and depth through foreground/background relationships
- Artifacts: Annotated layout showing dominant element, directional flow paths, similarity motifs, contrast points, and foreground/background layers
- Understanding: Developer can articulate WHY a composition works or doesn't work using specific design principles; can diagnose and fix compositional problems systematically

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Design needs visual hierarchy for information architecture | Hierarchy and arrangement guidance (Chapter 7) | Composition establishes the visual structure; hierarchy determines how information is organized within it |
| Design needs specific color choices to support contrast and similarity | Color theory guidance (Chapter 9) | Composition principles tell you where to apply contrast and similarity; color theory tells you which specific colors achieve those effects |
| Design needs typographic texture and contrast | Typography guidance (Chapter 3 / Appendixes) | Texture and contrast in web design often come primarily from type variation |
| Design needs proportional grid for element placement | Proportional systems guidance (Chapter 5) | Design principles govern relationships; proportional systems provide the mathematical framework for placement |
| Composition needs to work across different screen sizes | Responsive/adaptive layout capability | Compositional relationships (dominance, direction, rhythm) must be maintained or adapted across breakpoints |

---

## CSO KEYWORDS

composition, design principles, dominance, similarity, rhythm, texture, direction, contrast, foreground, background, midground, visual hierarchy, eye tracking, F-pattern, reading direction, focal point, visual anchor, eye recycling, compositional relationships, sub-composition, alignment, invisible axis, directional force, progressive sizing, shape language, visual cohesion, depth, layering, drop shadow, hover state, interactive affordance, pointillism, triangular composition, grid lines, visual weight, white space, color contrast, value contrast, size contrast, texture variation, Seurat, MailChip logo, Think Vitamin
