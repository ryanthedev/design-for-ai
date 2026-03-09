---
name: design-for-ai
description: |
  Apply visual design principles when building or reviewing UI/frontend code.
  Based on Design for Hackers by David Kadavy. Use when: choosing fonts, colors,
  or layout proportions; reviewing designs for visual issues; establishing visual
  hierarchy; creating color palettes or type scales; adding motion or interaction;
  making responsive design decisions; building any user-facing interface.
---

# Design for AI — Visual Design Principles

> Based on principles from *Design for Hackers* by David Kadavy

## Modes of Operation

This skill operates in two modes: **CHECKER** (audit existing designs) and **APPLIER** (build from scratch). Choose based on context.

---

### CHECKER Mode: Reviewing an Existing Design

Run through these checks in order. Stop and investigate when a check fails.

**Phase 0: Context**
Before auditing, ask: What is this design for? Who is the audience? What framework/constraints exist? What aesthetic direction was intended?

**1. Purpose and Foundation**
- [ ] Design has a clearly articulated purpose driving all decisions
- [ ] Visual design and information design work together (~75% of credibility signals)
- [ ] Level of polish is appropriate to context (not over- or under-designed)
- [ ] Style is grounded in current tech/culture, not surface-copying a trend
- See references/chapter-01-why-design-matters.md, references/chapter-02-purpose-of-design.md

Issues found? → Run `/exam` for detailed diagnosis or `/design` to establish foundations.

**2. Typography**
- [ ] Typeface is appropriate for rendering medium (screen vs print)
- [ ] Body text passes squint test (even gray texture, no dark blotches)
- [ ] No fake bold, fake italic, or stretched/compressed type
- [ ] Font pairing uses compatible letter structures or deliberate extreme contrast
- [ ] Max two font families; one serif + one sans-serif
- [ ] Proper typographic characters (smart quotes, real dashes, no double spaces)
- See references/chapter-03-typography.md, references/appendix-fonts-and-typography.md

Issues found? → Run `/fonts` for typography selection and configuration.

**3. Proportions and Layout**
- [ ] Major element sizes relate through identifiable ratios (2:3, 3:4, golden)
- [ ] Margins create geometric relationship between content and container
- [ ] Size progressions follow a consistent scale factor (e.g., multiply by 0.75)
- See references/chapter-05-proportions.md

Issues found? → Run `/exam` for detailed diagnosis.

**4. Composition**
- [ ] One element is clearly dominant (visual anchor / entry point)
- [ ] Eye is guided through composition by directional forces
- [ ] Foreground/background depth relationship exists
- [ ] Similarity creates cohesion (recurring shapes, colors, textures)
- [ ] Contrast supports intended hierarchy
- See references/chapter-06-composition.md

Issues found? → Run `/exam` for detailed diagnosis.

**5. Visual Hierarchy**
- [ ] White space follows proportional system (not arbitrary pixel values)
- [ ] Type sizes differ by meaningful amounts (skip steps in scale)
- [ ] Ornamentation is minimal — used only when space/weight/size/color are insufficient
- [ ] Tables have no unnecessary rule lines (Tufte 1+1=3)
- See references/chapter-07-visual-hierarchy.md

Issues found? → Run `/exam` for detailed diagnosis.

**6. Color**
- [ ] Palette follows identifiable color wheel relationship
- [ ] No information conveyed by color alone (colorblindness: ~10% of males)
- [ ] Functional colors follow conventions (red=error, green=success, blue=link)
- [ ] Warm/cool relationships create depth (warm advances, cool recedes)
- [ ] Shadows use hue-shifted colors, not pure black
- [ ] Data viz uses perceptually uniform colors (Lab/Colorbrewer, not raw HSL)
- See references/chapter-08-color-science.md, references/chapter-09-color-theory.md

Issues found? → Run `/color` for color system building.

**7. SEO and Discoverability**
- [ ] Content in semantic HTML (not locked in images/canvas)
- [ ] Unique, keyphrase-rich title tags on every page
- [ ] Human-readable URLs with keywords
- [ ] Proper heading hierarchy (single H1, logical H2-H6)
- See references/chapter-04-technology-and-culture.md

**8. Motion and Interaction**
- [ ] Animations are purposeful (guide attention, show state change, provide feedback)
- [ ] All interactive elements have proper states (hover, focus, active, disabled, loading, error, success)
- [ ] Focus management works for keyboard navigation; :focus-visible used
- [ ] Loading states exist (optimistic UI, skeletons, or spinners)
- See references/motion.md, references/interaction.md

Issues found? → Run `/flow` for motion, interaction, and responsive implementation.

**9. Responsive Design**
- [ ] Layout is fluid with content-driven breakpoints
- [ ] Touch targets meet minimum 44x44px
- [ ] Typography and spacing scale fluidly (clamp())
- [ ] Interface adapts to context, not just shrinks
- See references/responsive.md

Issues found? → Run `/flow` for responsive implementation.

**10. Design Identity**
- [ ] Design has intentional aesthetic, not default/generic
- [ ] No common AI design tells (cyan-on-dark, card-everything, glassmorphism, bounce easing)
- [ ] Design has memorable character traceable to purpose
- See references/ai-tells.md

Issues found? → Run `/brand` to strip AI tells and add character.

---

### APPLIER Mode: Creating or Guiding Design

Follow this sequence when building a design from scratch or making major changes.

**Phase 0: Context**
Gather design context: purpose, audience, aesthetic direction, constraints, references and anti-references. Run `/design` if not yet established.

**Phase 1: Foundation (before any visual work)**
1. Define purpose: what should users feel, do, trust?
2. Create user personas (name, occupation, quote, needs)
3. Define primary use cases
4. Create wireframes (layout only, no visual styling)
5. Assess competitive context to right-size design investment
- Read references/chapter-01-why-design-matters.md, references/chapter-02-purpose-of-design.md

**Gate:** Purpose defined and personas created before proceeding to Phase 2.

**Phase 2: Structure**
6. Choose a proportional system (2:3, 3:4, or golden ratio)
7. Derive canvas, content area, and margins from that ratio
8. Build a proportional type scale (e.g., 5, 7, 9, 12, 16, 21, 28, 37, 50, 67 at 3:4)
9. Set up grid for element placement
- Read references/chapter-05-proportions.md

**Gate:** Proportional system chosen and type scale defined before proceeding to Phase 3.

**Phase 3: Typography**
10. Select body font matched to rendering medium (sans-serif for web body)
11. Identify letter structure (humanist, geometric, realist)
12. If pairing, match structures for harmony or use extreme contrast
13. Set leading 1.2-1.4em, ragged right for web, proper typographic characters
- Read references/chapter-03-typography.md, references/appendix-fonts-and-typography.md

**Gate:** Font selection finalized and type scale applied before proceeding to Phase 4.

**Phase 4: Composition and Hierarchy**
14. Establish one dominant element as visual anchor
15. Build hierarchy: white space first, then weight, size, color, ornamentation (one at a time)
16. Create foreground/background depth layers
17. Guide eye with directional forces (alignment, progressive sizing)
18. Ensure similarity (shape language, repeating motifs)
- Read references/chapter-06-composition.md, references/chapter-07-visual-hierarchy.md

**Gate:** Visual hierarchy established with clear dominance before proceeding to Phase 5.

**Phase 5: Color**
19. Choose background appropriate to content density (white for content-heavy)
20. Select base hue matching desired mood
21. Build palette using color wheel (monochromatic, analogous, complementary, etc.)
22. Assign functional colors (errors, success, links, CTAs)
23. Use warm/cool for depth; hue-shifted shadows, not pure black
24. Test for colorblindness; add redundant cues (shape, text, position)
- Read references/chapter-08-color-science.md, references/chapter-09-color-theory.md

**Gate:** Color palette defined and accessibility tested before proceeding to Phase 6.

**Phase 6: SEO and Technical**
25. Semantic HTML with proper heading hierarchy
26. Unique title tags, descriptive URLs, meta descriptions
27. Descriptive image filenames and alt text
28. CSS3 native effects over image hacks
- Read references/chapter-04-technology-and-culture.md

**Phase 7: Motion and Interaction**
29. Define entry animations (staggered reveals, fade+translate)
30. Map state transitions (expand/collapse, show/hide, tab switches)
31. Add feedback (button press, form validation, loading)
32. Set timing (100ms micro, 300ms standard, 500ms complex) and easing (ease-out entries, ease-in exits)
33. Map all interaction states (default, hover, focus, active, disabled, loading, error, success)
34. Implement focus management and form validation
- Read references/motion.md, references/interaction.md

**Phase 8: Responsive**
35. Mobile-first with min-width queries and content-driven breakpoints
36. Fluid typography and spacing with clamp()
37. Touch targets minimum 44x44px
38. Adapt interface for context — don't just shrink
- Read references/responsive.md

---

## Quick Commands

| Need | Command | What it does |
|------|---------|-------------|
| Set up design foundations | `/design` | Purpose, audience, aesthetic direction → saves to CLAUDE.md |
| Full design audit | `/exam` | Theory-backed review — finds problems and explains WHY |
| Strip AI tells, add character | `/brand` | Make it intentionally designed, not generated |
| Typography help | `/fonts` | Select, pair, configure fonts with theory backing |
| Color system | `/color` | Build palette from color science up |
| Motion + interaction + responsive | `/flow` | Add movement, states, screen adaptation |
| Final quality pass | `/hone` | Every principle checked, pixel-level |

---

## Symptom → Chapter

| Symptom / Question | Go To | Why |
|--------------------|-------|-----|
| "Design feels like a superficial veneer" | references/chapter-01-why-design-matters.md | Design as layered discipline, not decoration |
| "How much design investment does this need?" | references/chapter-02-purpose-of-design.md | Personas, use cases, wireframes, right-sizing |
| "Which font should I use?" | references/chapter-03-typography.md | Medium-form relationship, squint test |
| "Design style feels like a copy" / SEO | references/chapter-04-technology-and-culture.md | Style from tech+culture; SEO as design |
| "How big should elements be?" | references/chapter-05-proportions.md | Proportional systems, Tschichold margins |
| "Layout is boring / nothing holds the eye" | references/chapter-06-composition.md | Dominance, direction, depth, contrast |
| "Can't tell what's important" | references/chapter-07-visual-hierarchy.md | White space > weight > size > color |
| "Colors don't match / colorblindness" | references/chapter-08-color-science.md | Gamuts, perceptual uniformity, accessibility |
| "How do I choose a color palette?" | references/chapter-09-color-theory.md | Color wheel schemes, mood, hue-shifted shadows |
| "Fonts don't look right together" | references/appendix-fonts-and-typography.md | Letter structure, the n test, pairing |

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
| "Nobody notices fake bold or straight quotes" | Fake bold closes counters and looks clunky. Straight quotes signal amateur typography. Even non-designers sense something is "off." | Appendix |
