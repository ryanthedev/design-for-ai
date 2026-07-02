# Holding the Eye: Composition and Design Principles
**Book:** Design for Hackers (David Kadavy)
**Part:** Part II — Visual Design Principles
**Core Concept:** A good composition attracts the viewer's eye and engages it throughout by leveraging interrelated design principles — dominance, similarity, rhythm, texture, direction, and contrast — to create compelling, organized, and visually interesting designs.

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

This chapter's knowledge applies whenever a composition lacks a clear entry point or fails to hold
the eye — elements feel equally weighted with no focal point, no sense of depth or layering, and no
recurring visual motif tying pieces together, so the eye wanders off the design rather than being
recycled through it. The tell in conversation: "everything on the page feels equally important" or
"the layout works but something feels wrong — it's boring," often paired with CSS where every
element shares the same font-size, color weight, and spacing with no dominance hierarchy.

---

## DESIGN REVIEW CRITERIA

**Must pass:** A dominant element exists — one element is clearly the first thing the eye is drawn
to (fail if all elements compete equally for attention with no clear focal point); directional flow
is present — the eye is guided through the composition rather than getting stuck or leaving (fail if
no implicit or explicit lines, alignment, or shapes guide the viewer's eye between elements); a
foreground/background relationship exists — there is a sense of depth or layering (fail if all
elements sit on the same visual plane with no depth cues such as size, shadow, color intensity, or
detail).

See `checklists.md` §1 for the full Should-Pass/Nice-to-Have tri-tier checklist across all
chapters.

---

## RED FLAGS

**Last reviewed: 2026-07**

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| No single dominant element; everything is the same visual weight | Critical | No visual hierarchy; viewer doesn't know where to look first | Make one element dominant via size, color, value, white space, or placement |
| Eye exits the composition immediately with nothing pulling it back | Critical | Composition fails to "recycle" the viewer's eye | Add directional forces (lines, alignment, shape groupings) that redirect the eye back into the composition |
| All elements identical in shape, size, and color with no contrast | High | No visual interest; composition is monotonous | Introduce contrast in at least one dimension (size, color, value, texture) |
| Important content placed in low-attention area without directional cues | High | F-pattern reading direction ignored; users miss key content | Move important content to top-left or create strong directional forces leading to it |

See `checklists.md` §2 Red Flags Master Table for the complete list across all chapters.

---

## IMPLEMENTATION CHECKLIST

Before starting, identify the design's purpose and primary message, the target audience's reading
direction, the one to three elements that most need viewer attention, and the medium and context
(web page, mobile screen, logo, print). While designing, establish dominance first — make the most
important element visually dominant through size, color, value, white space, or placement, and
verify by squinting at the design that the dominant element is still the first thing visible — then
create foreground/background relationships so elements sit on at least two or three distinct visual
planes, apply similarity through recurring shapes and colors, build rhythm through repeated visual
beats, establish direction so the eye's traced path flows logically through the hierarchy, apply
contrast so key elements pop without becoming monotonous, and add texture only where it reinforces
depth. Afterward, re-run the squint test, trace the eye path to confirm it circulates through the
composition rather than exiting, check that the most important content sits in the top-left zone for
web (F-pattern), and audit whether recurring motifs and contrast still support the intended
hierarchy.

See `checklists.md` §5 Implementation Quick-Start for the full step-by-step sequence.

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

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| No dominant element | Critical | Viewer has no entry point; composition fails to engage |
| No directional flow | Critical | Eye wanders off the design; content is not consumed in intended order |
| No foreground/background depth | High | Design feels flat; interactive affordances are absent |

Reviewing and applying draw on the same criteria in both directions: establish dominance before any
other principle, build depth and cohesion together, and let contrast and rhythm reinforce hierarchy
rather than compete with it.

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

**Last reviewed: 2026-07**

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Making everything equally prominent | Developer treats all content as equally important | Establish a clear hierarchy — one dominant element, subordinate supporting elements |
| Ignoring reading direction for web layouts | Developer places content based on visual balance alone, not scan patterns | Respect the F-pattern: most important content top-left, scannable content down the left side |
| Mixing unrelated shapes and styles across a design | Developer designs each element independently | Establish a shape language (rounded vs. angular, etc.) and apply it consistently for similarity |
| Relying solely on grid placement without directional forces | Developer assumes a grid system alone creates good composition | Grid determines position; direction, dominance, and other principles determine how the eye moves between those positions |
| No hover or interactive state changes for web elements | Developer styles elements identically in all states | Use foreground/background shift on hover — color change, shadow, scale — to signal interactivity |

See `checklists.md` §4 Common Mistakes Master Table for the complete list across all chapters.
