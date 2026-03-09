---
name: design-for-ai
description: |
  Apply visual design principles when AI or developers need to make design decisions about
  typography, color, composition, proportions, or visual hierarchy. Based on principles from
  Design for Hackers by David Kadavy. Use when: (1) generating or reviewing UI/frontend code,
  (2) choosing fonts, colors, or layout proportions, (3) reviewing designs for visual issues,
  (4) establishing visual hierarchy in interfaces, (5) understanding why a design "feels off,"
  (6) creating color palettes or type scales, (7) building any user-facing interface.
triggers:
  - choosing colors or color palette
  - selecting fonts or typefaces
  - layout feels off or unbalanced
  - establishing visual hierarchy
  - choosing proportions or aspect ratios
  - reviewing UI design quality
  - typography decisions
  - composition and layout principles
  - design feels flat or lifeless
  - creating a design from scratch
  - generating frontend or UI code
  - building a web page or component
skill_prefix: dfa-*
---

# Design for AI — Visual Design Principles

> Based on principles from *Design for Hackers* by David Kadavy

## Quick Reference: Symptom --> Chapter

| Symptom / Question | Go To | Why |
|--------------------|-------|-----|
| "Design feels like a superficial veneer" / "Why does design matter?" | references/chapter-01-why-design-matters.md | Reframes design as layered discipline (purpose + medium + aesthetics), not decoration |
| "How much design investment does this product need?" / "Should I do UX first?" | references/chapter-02-purpose-of-design.md | Covers personas, use cases, wireframes, and right-sizing design investment to context |
| "Which font should I use?" / "Body text looks muddy on screen" | references/chapter-03-typography.md | Medium-form relationship: why Garamond fails on screen, why Georgia works, squint test for texture |
| "Design style feels like a copy" / "SEO is not my job" | references/chapter-04-technology-and-culture.md | Style emerges from tech + culture; SEO is a design responsibility; semantic HTML matters |
| "How big should elements be relative to each other?" / "Golden ratio?" | references/chapter-05-proportions.md | Proportional systems (2:3, 3:4, golden ratio), Tschichold margins, varied scales |
| "Layout is boring" / "Nothing holds the eye" / "Everything competes equally" | references/chapter-06-composition.md | Dominance, similarity, rhythm, texture, direction, contrast, eye recycling |
| "Can't tell what's important" / "Everything looks the same weight" | references/chapter-07-visual-hierarchy.md | White space > weight > size > color > ornamentation; Tufte 1+1=3; proportional type scales |
| "Colors don't match between screen and print" / "Colorblindness issues" | references/chapter-08-color-science.md | RGB vs CMYK gamuts, Lab perceptual uniformity, hex navigation, ICC profiles, accessibility |
| "How do I choose a color palette?" / "Design mood feels wrong" | references/chapter-09-color-theory.md | Color wheel schemes, warm/cool hierarchy, hue-shifted shadows, cultural associations |
| "These fonts don't look right together" / "Text looks amateur" | references/appendix-fonts-and-typography.md | Font pairing via letter structure, the `n` test, fake bold/italic, typographic etiquette |

## Key Definitions

> "Design is the fundamental soul of a human-made creation that ends up expressing itself in successive outer layers of the product."
> -- Steve Jobs, quoted in Ch. 1

> "To truly be adept at designing something, you have to understand how it works."
> -- Ch. 1

> "The product of this confluence of medium, technology, and culture is what most people recognize as a 'style.'"
> -- Ch. 4

> "Proportion, loosely defined, is how the size or magnitude of one thing relates to that of another related thing."
> -- Ch. 5

> "The term composition refers to the way that elements are arranged within a piece of design... A good composition is what attracts the viewer's eye and engages it."
> -- Ch. 6

> "The principle of dominance creates visual interest in a composition by drawing the viewer's eye to an important element."
> -- Ch. 6

> "The big secret is, some of the least obvious factors -- such as use of proportion in white space -- are the ones that have the most impact."
> -- Ch. 7

> "Establishing a visual hierarchy is much more expressive and less scientific than this. Pieces of information have personalities and relationships with one another."
> -- Ch. 7

> "Knowing the right font to use takes an understanding of the emotional response your audience will have to it."
> -- Ch. 3

> "A typeface is how the type looks, and a font is a file containing the typeface."
> -- Appendix A

> "Metamerism... is the basis for how we are able to approximate and reproduce colors across a variety of media."
> -- Ch. 8

> "The boundaries of the color capabilities of a particular color capture or color reproduction system... is known as a gamut."
> -- Ch. 8

> "A monochromatic color scheme uses a single base hue -- usually with varied tints and shades."
> -- Ch. 9

> "Complementary color schemes are made up primarily of two colors that are opposite each other on the color wheel."
> -- Ch. 9

> "Texture (sometimes called color) is one way in which typefaces differ from one another."
> -- Appendix A

> "1 + 1 = 3" -- Adding a rule line between two white-space-separated items creates three visual elements where one sufficed.
> -- Ch. 7, referencing Tufte

## Modes of Operation

### CHECKER Mode: Reviewing an Existing Design

Run through these checks in order. Stop and investigate when a check fails.

**1. Purpose and Foundation**
- [ ] Design has a clearly articulated purpose driving all decisions
- [ ] Visual design and information design work together (~75% of credibility signals)
- [ ] Level of polish is appropriate to context (not over- or under-designed)
- [ ] Style is grounded in current tech/culture, not surface-copying a trend
- See references/chapter-01-why-design-matters.md, references/chapter-02-purpose-of-design.md

**2. Typography**
- [ ] Typeface is appropriate for rendering medium (screen vs print)
- [ ] Body text passes squint test (even gray texture, no dark blotches)
- [ ] No fake bold, fake italic, or stretched/compressed type
- [ ] Font pairing uses compatible letter structures or deliberate extreme contrast
- [ ] Max two font families; one serif + one sans-serif
- [ ] Proper typographic characters (smart quotes, real dashes, no double spaces)
- See references/chapter-03-typography.md, references/appendix-fonts-and-typography.md

**3. Proportions and Layout**
- [ ] Major element sizes relate through identifiable ratios (2:3, 3:4, golden)
- [ ] Margins create geometric relationship between content and container
- [ ] Size progressions follow a consistent scale factor (e.g., multiply by 0.75)
- See references/chapter-05-proportions.md

**4. Composition**
- [ ] One element is clearly dominant (visual anchor / entry point)
- [ ] Eye is guided through composition by directional forces
- [ ] Foreground/background depth relationship exists
- [ ] Similarity creates cohesion (recurring shapes, colors, textures)
- [ ] Contrast supports intended hierarchy
- See references/chapter-06-composition.md

**5. Visual Hierarchy**
- [ ] White space follows proportional system (not arbitrary pixel values)
- [ ] Type sizes differ by meaningful amounts (skip steps in scale)
- [ ] Ornamentation is minimal -- used only when space/weight/size/color are insufficient
- [ ] Tables have no unnecessary rule lines (Tufte 1+1=3)
- See references/chapter-07-visual-hierarchy.md

**6. Color**
- [ ] Palette follows identifiable color wheel relationship
- [ ] No information conveyed by color alone (colorblindness: ~10% of males)
- [ ] Functional colors follow conventions (red=error, green=success, blue=link)
- [ ] Warm/cool relationships create depth (warm advances, cool recedes)
- [ ] Shadows use hue-shifted colors, not pure black
- [ ] Data viz uses perceptually uniform colors (Lab/Colorbrewer, not raw HSL)
- See references/chapter-08-color-science.md, references/chapter-09-color-theory.md

**7. SEO and Discoverability**
- [ ] Content in semantic HTML (not locked in images/canvas)
- [ ] Unique, keyphrase-rich title tags on every page
- [ ] Human-readable URLs with keywords
- [ ] Proper heading hierarchy (single H1, logical H2-H6)
- See references/chapter-04-technology-and-culture.md

### APPLIER Mode: Creating or Guiding Design

Follow this sequence when building a design from scratch or making major changes.

**Phase 1: Foundation (before any visual work)**
1. Define purpose: what should users feel, do, trust?
2. Create user personas (name, occupation, quote, needs)
3. Define primary use cases
4. Create wireframes (layout only, no visual styling)
5. Assess competitive context to right-size design investment
- See references/chapter-01-why-design-matters.md, references/chapter-02-purpose-of-design.md

**Phase 2: Structure**
6. Choose a proportional system (2:3, 3:4, or golden ratio)
7. Derive canvas, content area, and margins from that ratio
8. Build a proportional type scale (e.g., 5, 7, 9, 12, 16, 21, 28, 37, 50, 67 at 3:4)
9. Set up grid for element placement
- See references/chapter-05-proportions.md

**Phase 3: Typography**
10. Select body font matched to rendering medium (sans-serif for web body)
11. Identify letter structure (humanist, geometric, realist)
12. If pairing, match structures for harmony or use extreme contrast
13. Set leading 1.2-1.4em, ragged right for web, proper typographic characters
- See references/chapter-03-typography.md, references/appendix-fonts-and-typography.md

**Phase 4: Composition and Hierarchy**
14. Establish one dominant element as visual anchor
15. Build hierarchy: white space first, then weight, size, color, ornamentation (one at a time)
16. Create foreground/background depth layers
17. Guide eye with directional forces (alignment, progressive sizing)
18. Ensure similarity (shape language, repeating motifs)
- See references/chapter-06-composition.md, references/chapter-07-visual-hierarchy.md

**Phase 5: Color**
19. Choose background appropriate to content density (white for content-heavy)
20. Select base hue matching desired mood
21. Build palette using color wheel (monochromatic, analogous, complementary, etc.)
22. Assign functional colors (errors, success, links, CTAs)
23. Use warm/cool for depth; hue-shifted shadows, not pure black
24. Test for colorblindness; add redundant cues (shape, text, position)
- See references/chapter-08-color-science.md, references/chapter-09-color-theory.md

**Phase 6: SEO and Technical**
25. Semantic HTML with proper heading hierarchy
26. Unique title tags, descriptive URLs, meta descriptions
27. Descriptive image filenames and alt text
28. CSS3 native effects over image hacks
- See references/chapter-04-technology-and-culture.md

## Anti-Rationalization Table

| Excuse | Reality | Reference |
|--------|---------|-----------|
| "I'm not a designer, I just need it to work" | Design IS how it works. 75% of credibility judgments are design-based (Fogg). | Ch. 1 |
| "I'll make it pretty at the end" | Design-as-afterthought produces veneer. Purpose, medium, and aesthetics must be considered together from the start. | Ch. 1-2 |
| "I'll just use a nice template" | Templates are other people's decisions for other contexts. Without understanding layers, you're copying surface patterns. | Ch. 1 |
| "Proportions don't matter for web/app design" | Device screens themselves use these proportions (3:4, 2:3, 16:9). Proportional relationships are perceived subconsciously. | Ch. 5 |
| "I used a grid, so composition should be fine" | A grid determines placement, not how the eye moves. You still need dominance, direction, and contrast. | Ch. 6 |
| "White space is wasted space" | White space is the most powerful hierarchy signal. It communicates both importance and relationships. | Ch. 7 |
| "I need borders on my table cells" | Alignment guides the eye just as effectively. Borders add visual noise via Tufte's 1+1=3. | Ch. 7 |
| "Color is subjective, there's no right answer" | Color wheel relationships, psychological research, and cultural conventions provide objective frameworks that reliably outperform pure intuition. | Ch. 9 |
| "Garamond is a timeless classic, it works everywhere" | Garamond is timeless for print. On screen at body sizes, its angled axis and subtle curves blur and create moire. Use Georgia. | Ch. 3 |
| "Nobody notices fake bold or straight quotes" | Fake bold closes counters and looks clunky. Straight quotes signal amateur typography. Even non-designers sense something is "off." | Appendix A/B |

## Skill Prefix

`dfa-*`
