# Design for Hackers: Master Checklists & Decision Trees

Quick-reference consolidation of all checklists, red flags, decision trees, and common mistakes from all chapters.

---

## 1. Full Design Review Checklist

### Typography Checks

**Must Pass (Critical)**
- [ ] Typeface is appropriate for its rendering medium (screen vs print) -- no print-optimized humanist serif (e.g., Garamond) at body sizes on ~100-150 ppi screens *(Ch 3)*
- [ ] Body text typeface produces even texture -- squint test reveals no dark blotches or light gaps *(Ch 3)*
- [ ] Typeface letterfit allows proper kerning -- no awkward gaps or collisions between common letter pairs *(Ch 3)*
- [ ] No fake bold (artificially bolded via software outline) *(Appendix)*
- [ ] No fake italic (artificially slanted via software) *(Appendix)*
- [ ] No type distortion (stretching/compressing) *(Appendix)*
- [ ] Font pairing uses compatible letter structures (both humanist, both geometric, both realist) or deliberate extreme contrast *(Appendix)*
- [ ] Maximum two font families for text content (one serif, one sans-serif; logos and code fonts excluded) *(Appendix)*
- [ ] Serif + sans-serif pairing rule followed (not two serifs or two sans-serifs without clear justification) *(Appendix)*

**Should Pass (Important)**
- [ ] Typeface has sufficient x-height for screen readability *(Ch 3)*
- [ ] Typeface structural axis aligns with pixel grid (avoid old-style angled axis for body text on screen) *(Ch 3)*
- [ ] Font has appropriate stroke modulation for its context *(Ch 3)*
- [ ] Smart/curly quotes used instead of straight quotes *(Appendix)*
- [ ] Proper dashes used (en dash or em dash, not double hyphens) *(Appendix)*
- [ ] One space after periods, not two *(Appendix)*
- [ ] Body text uses ragged right alignment on web (no `text-align: justify` without hyphenation) *(Appendix)*
- [ ] Leading/line-height between 1.2em and 1.4em for body copy *(Appendix)*
- [ ] Paragraph changes indicated by EITHER indentation OR spacing, not both *(Appendix)*

**Nice to Have**
- [ ] Typeface has documented history matching the design's intended mood *(Ch 3)*
- [ ] Font stack includes well-chosen fallbacks sharing structural characteristics *(Ch 3)*
- [ ] Ligatures enabled for display/heading text *(Appendix)*
- [ ] Hanging punctuation on blockquotes *(Appendix)*
- [ ] Authentic small caps used for acronyms *(Appendix)*
- [ ] Prime marks used for feet/inches instead of smart quotes *(Appendix)*

### Color Checks

**Must Pass (Critical)**
- [ ] Color-dependent UI indicators also use shape, position, or text as redundant cues (colorblindness: affects ~10% of males) *(Ch 8)*
- [ ] Data visualization uses perceptually uniform color differences (Lab or Colorbrewer, not HSB/HSL) *(Ch 8)*
- [ ] Web images that must match CSS background are saved without ICC profiles (or in sRGB) *(Ch 8)*
- [ ] Color scheme has an identifiable color wheel relationship (monochromatic, analogous, complementary, split-complementary, triadic, or tetradic) *(Ch 9)*
- [ ] Accent/action colors contrast with their surroundings *(Ch 9)*
- [ ] Color conventions respected for functional elements (red = error, green = success, blue = links) *(Ch 9)*
- [ ] Background color is appropriate for content density (not bright saturated on text-heavy pages) *(Ch 9)*

**Should Pass (Important)**
- [ ] Cross-media color workflow uses ICC profiles and gamut-aware conversions *(Ch 8)*
- [ ] Hex color adjustments follow a systematic approach (understanding RGB channels) *(Ch 8)*
- [ ] Warm/cool color relationships used to establish visual depth and hierarchy *(Ch 9)*
- [ ] Shadows and highlights use hue-shifted colors rather than pure black/white overlays *(Ch 9)*
- [ ] Color choices consider cultural context of target audience *(Ch 9)*

**Nice to Have**
- [ ] Developer can mentally navigate the hexadecimal color cube *(Ch 8)*
- [ ] Lab color space used when perceptual lightness consistency matters *(Ch 8)*
- [ ] Typography hierarchy reinforced with warm/cool color dimension *(Ch 9)*
- [ ] Color palette evokes mood consistent with brand/purpose *(Ch 9)*

### Proportion & Layout Checks

**Must Pass (Critical)**
- [ ] Key dimensional relationships reflect an intentional proportional system (not arbitrary pixel values) *(Ch 5)*
- [ ] Proportional choices used as guidelines, not rigid formulas *(Ch 5)*

**Should Pass (Important)**
- [ ] Element sizes relate through a consistent ratio or scale *(Ch 5)*
- [ ] Canvas/container proportions intentionally chosen *(Ch 5)*
- [ ] Margins establish geometric relationship between content and canvas (not all identical) *(Ch 5)*

**Nice to Have**
- [ ] Size progressions follow a varied scale (consistent multiplication factor like 0.75) *(Ch 5)*
- [ ] Proportional choices documented for the design system *(Ch 5)*

### Composition Checks

**Must Pass (Critical)**
- [ ] Dominant element exists -- one element is clearly the first thing the eye is drawn to *(Ch 6)*
- [ ] Directional flow is present -- the eye is guided through the composition *(Ch 6)*
- [ ] Foreground/background relationship exists -- sense of depth or layering *(Ch 6)*

**Should Pass (Important)**
- [ ] Similarity used -- recurring shapes, colors, or visual characteristics create cohesion *(Ch 6)*
- [ ] Contrast supports hierarchy -- differences direct attention intentionally *(Ch 6)*
- [ ] Reading direction respected -- most important content positioned where eye enters (top-left for Western) *(Ch 6)*

**Nice to Have**
- [ ] Rhythm present -- repeating visual patterns create visual beats *(Ch 6)*
- [ ] Texture variation adds visual interest and depth *(Ch 6)*
- [ ] Eye "recycling" -- compositional forces keep viewer's eye circulating *(Ch 6)*

### Visual Hierarchy Checks

**Must Pass (Critical)**
- [ ] Clear visual distinction between primary content and secondary/metadata content *(Ch 7)*
- [ ] White space between elements follows a consistent proportional system *(Ch 7)*
- [ ] Information that is conceptually related appears visually grouped *(Ch 7)*

**Should Pass (Important)**
- [ ] Type size changes are proportionally significant (not 13px vs 14px; at least ~25% difference) *(Ch 7)*
- [ ] Visual ornamentation (rules, borders, icons) used sparingly and purposefully *(Ch 7)*
- [ ] Hierarchical factors used in isolation before combining *(Ch 7)*

**Nice to Have**
- [ ] Type sizes follow a proportional scale (e.g., 3:4 ratio: 5, 7, 9, 12, 16, 21, 28, 37, 50, 67) *(Ch 7)*
- [ ] Grid-based white space management using geometric relationships *(Ch 7)*
- [ ] Typeface changes express conceptual differences (e.g., metadata in sans-serif, content in serif) *(Ch 7)*

### SEO & Technical Checks

**Must Pass (Critical)**
- [ ] Content is in semantic HTML, not locked in Flash/images/canvas *(Ch 4)*
- [ ] Every page has a unique, descriptive `<title>` tag containing target keyphrases *(Ch 4)*
- [ ] URLs are human-readable and keyword-relevant (not `?p=34`) *(Ch 4)*
- [ ] Design style choices grounded in current technological capabilities and cultural context *(Ch 4)*

**Should Pass (Important)**
- [ ] `<meta description>` tag present (~200 chars) accurately describing page content *(Ch 4)*
- [ ] Images use descriptive filenames and `alt` attributes (not `IMG_001.jpg`) *(Ch 4)*
- [ ] Heading hierarchy (H1-H6) is logical and contains relevant keywords *(Ch 4)*
- [ ] `<em>` and `<strong>` tags used for semantic emphasis on important terms *(Ch 4)*

**Nice to Have**
- [ ] Anchor text of internal links is descriptive and keyword-relevant (not "Click here") *(Ch 4)*
- [ ] Analytics installed to track keyword performance *(Ch 4)*
- [ ] CSS3 capabilities used natively instead of image hacks *(Ch 4)*

### Foundational Design Checks

**Must Pass (Critical)**
- [ ] Design has a clearly identifiable purpose/intention *(Ch 1)*
- [ ] Visual design and information design are coherent (not contradictory) *(Ch 1)*
- [ ] Design is appropriate to its context (not over-polished or under-polished) *(Ch 1)*
- [ ] Visual design decisions informed by product purpose and user needs *(Ch 2)*
- [ ] UX process preceded visual design (some form of personas, use cases, wireframes) *(Ch 2)*
- [ ] Level of visual design investment matches competitive context *(Ch 2)*

**Should Pass (Important)**
- [ ] Multiple layers of design (purpose, medium, aesthetics) are aligned *(Ch 1)*
- [ ] Design builds credibility and trust *(Ch 1)*
- [ ] Visual design supports rather than conflicts with usability *(Ch 2)*

---

## 2. Red Flags Master Table

| Red Flag | Severity | Source | Fix |
|----------|----------|--------|-----|
| Design treated as final step after all functionality is built | Critical | Ch 1 | Integrate design thinking from the start; define purpose before visual choices |
| Users describe site as "put together in five minutes" | Critical | Ch 1 | Invest in visual quality and information organization together |
| Visual design work begins with no user personas or use cases | Critical | Ch 2 | Create even simple personas and use cases before any visual work |
| Visual design conflicts with usability | Critical | Ch 2 | Beauty that impedes function defeats the purpose of design |
| Garamond (or similar humanist serif) used for body text on web at <16px | Critical | Ch 3 | Use Georgia or a web-optimized serif |
| Uneven text "color" visible when squinting at text blocks | Critical | Ch 3 | Switch to typeface with better-managed visual weight |
| Entire site built in Flash or rendered as images | Critical | Ch 4 | Rebuild in semantic HTML/CSS |
| Title tag says "Home Page" or "Untitled Document" | Critical | Ch 4 | Write unique, keyphrase-rich title tags for every page |
| Hidden text or links stuffed with keywords (black-hat SEO) | Critical | Ch 4 | Remove all hidden SEO tricks; focus on legitimate content |
| Every dimension is a golden ratio calculation (cargo-cult proportions) | Critical | Ch 5 | Use a mix of simple ratios (2:3, 3:4) as flexible guidelines |
| No single dominant element; everything same visual weight | Critical | Ch 6 | Make one element dominant via size, color, value, white space, or placement |
| Eye exits the composition immediately with nothing pulling it back | Critical | Ch 6 | Add directional forces that redirect the eye back into the composition |
| Every table cell has visible borders on all four sides (Tufte 1+1=3) | Critical | Ch 7 | Remove borders; use alignment, white space, and optional row highlights |
| Red and green used as sole differentiators for status (pass/fail) | Critical | Ch 8 | Add redundant cues: icons, shapes, text labels, or position |
| Red used prominently in performance/analytical context | Critical | Ch 9 | Red overloads prefrontal cortex; use blue or green for analytical contexts |
| Functional colors reversed (red for success, green for errors) | Critical | Ch 9 | Follow web conventions: red = error, green = success |
| Fake bold (Faux Bold in Photoshop or missing bold font weight) | Critical | Appendix | Load the actual bold weight of the font |
| Fake italic (software-slanted text) | Critical | Appendix | Load the actual italic font file |
| Stretched or compressed type | Critical | Appendix | Use a specifically designed condensed/extended variant |
| Textures/images placed inside letterforms | Critical | Appendix | Place text over solid or low-contrast backgrounds |
| Purely decorative elements with no functional rationale | High | Ch 1 | Remove decoration; understand why each design element exists |
| Visual style borrowed wholesale from another product/context | High | Ch 1 | Define your own purpose, audience, and constraints |
| Design looks "too polished" / "designed by a marketing team" | High | Ch 1 | Calibrate design quality to match context and authenticity expectations |
| Information "badly presented" despite attractive visuals | High | Ch 1 | Reorganize content structure; align information hierarchy with visual hierarchy |
| Team debates visual details while core UX is undefined | High | Ch 2 | Wireframe the layout and information architecture first |
| Product treats visual design as purely decorative ("make it pretty") | High | Ch 2 | Educate team that design is multi-layered, not just appearance |
| Competitor with better design eroding market share but team ignores it | High | Ch 2 | Assess whether product category demands visual design investment |
| Comic Sans used for body text or formal communications | High | Ch 3 | Replace with typeface suited to the actual context and medium |
| Screen-designed font (Verdana, Georgia) used in high-end print design | High | Ch 3 | Use a print-optimized typeface |
| Design copies a trend's surface look without understanding its origins | High | Ch 4 | Research technological and cultural forces; adapt principles, not appearances |
| URLs use query strings like `?p=34` | High | Ch 4 | Implement human-readable, keyword-containing URL slugs |
| All spacing/sizing values completely arbitrary | High | Ch 5 | Choose a base ratio (e.g., 3:4) and derive key dimensions from it |
| All elements identical in shape, size, and color with no contrast | High | Ch 6 | Introduce contrast in at least one dimension |
| Important content placed in low-attention area without directional cues | High | Ch 6 | Move to top-left or create strong directional forces leading to it |
| All hierarchy established by changing typeface alone | High | Ch 7 | Default to white space, then weight, then size before reaching for a new typeface |
| Spacing between all elements is identical | High | Ch 7 | Use proportional spacing: less between related items, more between unrelated |
| HSB/HSL hue rotation used for quantitative data palette | High | Ch 8 | Use Lab-based palette or Colorbrewer for perceptually uniform scales |
| Adobe RGB-profiled images on CSS-colored backgrounds on web | High | Ch 8 | Save web images in sRGB; strip ICC profiles |
| No identifiable color relationship in palette | High | Ch 9 | Start with a formal color scheme from the color wheel |
| Blue text used for non-link content | High | Ch 9 | Reserve blue text exclusively for links |
| Bright saturated background on content-heavy page | High | Ch 9 | Use white, off-white, or dark backgrounds for content-heavy pages |
| Accent color matches the dominant palette color | High | Ch 9 | Choose accent colors that contrast with dominant scheme |
| Two fonts of same classification paired (e.g., two serifs) | High | Appendix | Replace one with the complementary classification |
| Font pairing with mismatched letter structures (uncanny valley) | High | Appendix | Match letter structures or go to deliberate extreme contrast |
| Fonts with incompatible character widths | High | Appendix | Compare the lowercase `n`; ensure widths are similar |
| Massive visual design investment for pure utility product with no competitors | Medium | Ch 2 | Right-size design investment to competitive landscape |
| Font chosen without consideration of rendering technology | Medium | Ch 3 | Evaluate whether target medium supports the typeface's subtleties |
| Display/decorative typeface used for body copy | Medium | Ch 3 | Reserve decorative type for headlines; use readable face for body |
| No `meta description` on key pages | Medium | Ch 4 | Write ~200-character descriptions containing target keyphrases |
| Images named `IMG_0042.jpg` with empty alt tags | Medium | Ch 4 | Rename files descriptively; write descriptive alt text |
| Claims design "uses golden ratio" but canvas has different proportion | Medium | Ch 5 | If using golden ratio, start with canvas proportions |
| Elements sized identically when variety would improve composition | Medium | Ch 5 | Introduce size variety using a consistent ratio |
| No foreground/background relationship; everything on same visual plane | Medium | Ch 6 | Use size, color, shadows, detail, or overlapping for depth |
| Shapes, colors, styles all different with no recurring motif | Medium | Ch 6 | Establish shape language and color palette; repeat elements |
| Hover/interactive states don't change visual layering | Medium | Ch 6 | Pop interactive elements into foreground on hover |
| Title differentiated only by 1-2px larger size | Medium | Ch 7 | Skip steps in type scale; use at least 25-30% size difference |
| Heavy visual ornamentation to compensate for flat hierarchy | Medium | Ch 7 | Strip ornamentation; establish hierarchy with white space and type first |
| Metadata given same prominence as title | Medium | Ch 7 | Push metadata to secondary role via smaller size, lighter weight |
| Monochromatic HSL palette with equal lightness steps for data classes | Medium | Ch 8 | Use Lab lightness values for perceptually distinct steps |
| Expecting printed CMYK output to exactly match RGB screen colors | Medium | Ch 8 | Use soft-proofing with ICC profiles |
| No cultural color research for international audience | Medium | Ch 9 | Research flags, religious colors, wedding/funeral/holiday colors |
| Shadows/highlights created with pure black overlay | Medium | Ch 9 | Use hue-shifted warmer highlights and cooler shadows |
| Pure black text on pure white with no color variation | Medium | Ch 9 | Use warm dark grays for primary, cool grays for secondary |
| Fonts with incompatible textures (darkness/smoothness mismatch) | Medium | Appendix | Match texture darkness and smoothness between paired fonts |
| Justified text without hyphenation on web | Medium | Appendix | Use `text-align: left` (ragged right) instead |
| Both paragraph indent AND paragraph spacing used | Medium | Appendix | Choose one method, never both |
| Outline on type that straddles the letterform edge | Medium | Appendix | Place outlines outside the letterforms only |
| Margins are equal on all sides | Low | Ch 5 | Use Tschichold-style proportional margins for more visual interest |
| Picking hex colors entirely at random | Low | Ch 8 | Learn hex RGB cube navigation (0, 3, 6, 9, C, F progression) |

---

## 3. Design Decision Trees

### "I Need to Choose Colors"

```
START: What is the design's purpose and mood?
|
+---> Identify mood
|     |
|     +---> Mysterious/Exclusive --> Dark background + sparse bright accents
|     +---> Active/Energetic ------> Bright saturated + complementary/triadic scheme
|     +---> Muted/Sophisticated ---> Low saturation + neutral dominant + one strong accent
|     +---> Natural/Earthy --------> Warm unsaturated + greens/browns
|     +---> Calm/Professional -----> Cool colors (blue/green), analogous scheme
|
+---> Choose background color based on content density
|     |
|     +---> Content-heavy page --> White or off-white
|     +---> Exclusive/nightlife --> Dark
|     +---> Low-content splash --> Bright saturated OK
|
+---> Select base hue aligned with mood
|     |
|     +---> Does it match psychological associations? (Ch 9)
|     +---> Does it match cultural context of audience? (Ch 9)
|     +---> Is red being used in an analytical/performance context? --> STOP, use blue/green
|
+---> Build color scheme from color wheel
|     |
|     +---> Want quiet/focused? ---------> Monochromatic (one hue, varied tints/shades)
|     +---> Want harmonious/peaceful? ---> Analogous (3 adjacent hues)
|     +---> Want exciting/energetic? ----> Complementary (opposite hues)
|     +---> Want colorful but balanced? -> Split-complementary
|     +---> Want cheery/approachable? ---> Triadic (3 evenly spaced)
|     +---> Need complex palette? -------> Tetradic (use with care)
|
+---> Assign functional roles
|     |
|     +---> Links: Blue (or form of blue) for wide-audience sites
|     +---> Errors/urgency: Red
|     +---> Success/progress: Green
|     +---> Highlights/attention: Yellow
|     +---> CTA: Whichever contrasts MOST with dominant scheme
|
+---> Create depth with warm/cool
|     |
|     +---> Primary text: Warm dark color (e.g., #503e2b)
|     +---> Secondary text: Cool gray (e.g., #808094)
|     +---> Shadows: Shift cooler than base
|     +---> Highlights: Shift warmer than base
|
+---> Validate
      |
      +---> Colorblindness test: Add redundant cues (shape, text) to all color-coded info
      +---> Data viz: Use Lab/Colorbrewer for perceptually uniform palettes
      +---> Web images: Save in sRGB, strip ICC profiles for CSS-matching images
      +---> Cross-media: Use ICC profiles for print conversion
```

### "I Need to Pick Fonts"

```
START: What is the medium?
|
+---> Web (screen) -----> Default to sans-serif for body text
|     |                   Consider: Arial, Verdana, Helvetica, Gill Sans, Lucida Grande
|     |
|     +---> Need a serif? --> Use Georgia (screen-optimized) not Garamond
|     +---> Custom fonts? --> OK above 30px; stick with web-safe below 30px on ~100-150 ppi
|
+---> Print ------------> Default to serif for body text
      |                   Consider: Adobe Garamond, Palatino, Baskerville, Bodoni
      |
      +---> Need sans-serif? --> Gill Sans, Futura, Helvetica work well for headers
|
+---> Do you need a second font?
|     |
|     +---> No --> Use one font with weight/size variations (often sufficient)
|     +---> Yes --> Continue to pairing
|
+---> Pairing strategy
|     |
|     +---> Step 1: Identify letter structure of primary font
|     |     +---> Compare lowercase 'n'
|     |     +---> Humanist: organic shoulder curve (Garamond, Gill Sans, Palatino)
|     |     +---> Geometric: symmetrical arch (Futura, Bodoni)
|     |     +---> Realist: in between (Helvetica, Arial, Baskerville)
|     |
|     +---> Step 2: Choose pairing approach
|     |     +---> Harmony --> Match letter structures (both humanist, both geometric, etc.)
|     |     +---> Contrast --> Use dramatically different fonts (deliberate extreme)
|     |     +---> AVOID --> "Sort of similar" middle ground (uncanny valley)
|     |
|     +---> Step 3: Verify compatibility
|     |     +---> Compare 'n' width (character width match?)
|     |     +---> Squint test (texture darkness match?)
|     |     +---> Smoothness check (both smooth or both rough?)
|     |
|     +---> Step 4: Ensure one serif + one sans-serif (the rule)
|     |
|     +---> Shortcut: Choose fonts by same type designer (e.g., Gill Sans + Joanna)
|
+---> Set body copy
      |
      +---> Line-height: 1.2-1.4em for body, 1.0-1.1em for lists
      +---> Alignment: Ragged right for web (no justify without hyphenation)
      +---> Paragraphs: Indent (~1em) OR spacing (~0.8em), never both
      +---> Characters: Smart quotes, proper dashes, no double spaces
      +---> Bold/italic: Use authentic font weights only (no fakes)
```

### "My Layout Feels Off" -- Diagnostic Flow

```
START: What specifically feels wrong?
|
+---> "Nothing draws my eye"
|     |
|     +---> Is there a dominant element? (Ch 6)
|     |     +---> No --> Make one element dominant via size, color, value, or white space
|     |     +---> Yes but weak --> Increase contrast between dominant and subordinate elements
|     |
|     +---> Is there foreground/background depth? (Ch 6)
|           +---> No --> Add size, detail, shadow, or color intensity differences
|
+---> "Everything looks the same importance"
|     |
|     +---> Are you using only font size to differentiate? (Ch 7)
|     |     +---> Yes --> Start with white space alone, then layer: weight > size > color > ornamentation
|     |
|     +---> Are size differences big enough? (Ch 7)
|     |     +---> Less than 25% --> Skip steps in your type scale (e.g., 9pt to 16pt, not 9pt to 12pt)
|     |
|     +---> Is white space between all elements identical? (Ch 7)
|           +---> Yes --> Use proportional spacing: less between related, more between unrelated
|
+---> "It feels random/incoherent"
|     |
|     +---> Do element sizes relate through a ratio? (Ch 5)
|     |     +---> No --> Choose a base ratio (2:3 or 3:4) and derive dimensions from it
|     |
|     +---> Is there a consistent shape language? (Ch 6)
|     |     +---> No --> Establish shapes (all rounded or all angular) and repeat throughout
|     |
|     +---> Do colors follow a color wheel relationship? (Ch 9)
|           +---> No --> Pick a scheme type and rebuild palette from the color wheel
|
+---> "It feels cluttered"
|     |
|     +---> Are there unnecessary rule lines or borders? (Ch 7)
|     |     +---> Yes --> Remove them; use white space and alignment instead (Tufte 1+1=3)
|     |
|     +---> Is there too much ornamentation? (Ch 7)
|     |     +---> Yes --> Strip all ornamentation; rebuild hierarchy with space > weight > size
|     |
|     +---> Are margins/padding arbitrary? (Ch 5)
|           +---> Yes --> Use proportional margins (Tschichold method or consistent ratio)
|
+---> "It feels flat/lifeless"
|     |
|     +---> Are all colors neutral black/gray? (Ch 9)
|     |     +---> Yes --> Replace with warm dark for primary, cool gray for secondary text
|     |
|     +---> Are shadows pure black? (Ch 9)
|     |     +---> Yes --> Use hue-shifted shadows (cooler) and highlights (warmer)
|     |
|     +---> Is there no rhythm or repeating pattern? (Ch 6)
|     |     +---> Yes --> Add consistent spacing, repeating icon styles, regular visual beats
|     |
|     +---> Is there no texture variation? (Ch 6)
|           +---> Yes --> Introduce subtle texture differences between foreground and background
|
+---> "The eye wanders off the page"
      |
      +---> Are there directional forces guiding the eye? (Ch 6)
      |     +---> No --> Use alignment, progressive sizing, shape groupings to create flow
      |
      +---> Is the eye being "recycled" at exit points? (Ch 6)
      |     +---> No --> Add directional cues redirecting the eye back into the composition
      |
      +---> Is critical content in the top-left (F-pattern)? (Ch 6)
            +---> No --> Reposition or create strong directional forces leading to it
```

### "I Need to Establish Hierarchy"

```
START: List all information pieces and their relative importance/relationships
|
+---> Step 1: WHITE SPACE (most powerful, most subtle)
|     |
|     +---> Set all text to one font, one size, regular weight
|     +---> Use only position and spacing to differentiate
|     +---> Group related items with less space between them
|     +---> Place important items at top-left (web)
|     +---> Use cap height as spacing unit between related items
|     +---> Is hierarchy clear enough? --> Yes: STOP. No: continue.
|
+---> Step 2: TYPE WEIGHT
|     |
|     +---> Bold primary elements, regular for secondary
|     +---> If body text is bolded, increase line-height to lighten texture
|     +---> Is hierarchy clear enough? --> Yes: STOP. No: continue.
|
+---> Step 3: TYPE SIZE
|     |
|     +---> Use a proportional scale (e.g., 3:4 ratio: 5, 7, 9, 12, 16, 21, 28, 37, 50, 67)
|     +---> Skip steps for meaningful contrast (9pt to 16pt, not 9pt to 12pt)
|     +---> Minimum ~25% size difference between hierarchy levels
|     +---> Is hierarchy clear enough? --> Yes: STOP. No: continue.
|
+---> Step 4: COLOR
|     |
|     +---> Add color only where additional differentiation is needed
|     +---> Warm colors for primary (pop forward), cool for secondary (recede)
|     +---> Is hierarchy clear enough? --> Yes: STOP. No: continue.
|
+---> Step 5: VISUAL ORNAMENTATION (last resort)
|     |
|     +---> Rules, blocks of color, icons -- sparingly
|     +---> Every rule line must have a clear purpose
|     +---> Removing it should lose meaningful differentiation
|
+---> Step 6: TYPEFACE CONTRAST (for conceptual differences)
      |
      +---> Use a different typeface to signal different NATURE of information
      +---> Example: Serif for content, sans-serif for metadata
      +---> This signals the information is conceptually different, not just ranked differently
```

---

## 4. Common Mistakes Master Table

| Mistake | Why It Happens | Correct Approach | Source |
|---------|----------------|------------------|--------|
| Treating design as a final polish step | Engineering-first culture | Integrate design thinking from project inception | Ch 1 |
| Adding visual decoration to compensate for weak design | Mistaking decoration for design | Remove unnecessary decoration; ensure every element serves the purpose | Ch 1 |
| Copying successful designs wholesale | Assumes what works for one product works for another | Derive design from your own purpose, audience, and medium | Ch 1 |
| Neglecting information design while polishing visual design | Visual design is more obvious and "fun" | Treat information organization as first-class design concern (28%+ of credibility) | Ch 1 |
| Over-polishing to signal quality | Assumes more polish always equals more trust | Calibrate polish to context; over-polish triggers skepticism | Ch 1 |
| Following do's and don'ts lists without understanding why | Lists are easy to follow but don't build understanding | Learn underlying layers (purpose, medium, aesthetics) | Ch 1 |
| Only learning "one trick" (drawing ponies) | One technique seems impressive in limited contexts | Build broad understanding of design layers | Ch 1 |
| Treating design as purely visual/decorative | Developers associate "design" with surface styling | Design is multi-layered: product goals, user needs, culture, technology, and visuals | Ch 2 |
| Skipping personas and use cases | Feels like bureaucratic overhead | Even 5-minute personas dramatically focus design decisions | Ch 2 |
| Over-investing in visual design for utility product | Assumes all products need polished visual design | Assess competitive landscape; "good enough" works when solving real pain point | Ch 2 |
| Under-investing for personal/identity product | Assumes functionality alone wins | Products tied to personal identity demand design investment | Ch 2 |
| Getting caught up in visual details during wireframing | Tools make it easy to add styling | Keep wireframes deliberately rough; goal is layout and structure | Ch 2 |
| Conflating visual design with user experience | Sees them as synonymous | Visual design is one component of UX (also includes usability, content, IA) | Ch 2 |
| Using Garamond for web body text | Knows it's a respected classic | Use Georgia or another screen-optimized serif for body text | Ch 3 |
| Dismissing Comic Sans without understanding why | Cultural hatred without typographic understanding | Understand it fails in high-res due to poor visual weight, bad letterfit | Ch 3 |
| Choosing fonts based purely on aesthetic preview | Font picker shows at display sizes | Always test at actual rendering size in actual target medium | Ch 3 |
| Treating all serif fonts as equivalent | Lack of structural awareness | Learn classifications; transitional (Georgia) vs humanist (Garamond) have different properties | Ch 3 |
| Using geometric sans-serifs (Futura) for body text on screen | Attracted to clean geometric forms | Geometric forms render poorly at body sizes on pixel grids | Ch 3 |
| Ignoring font fallback stacks | Assuming embedded fonts always load | Always define CSS fallbacks sharing structural properties | Ch 3 |
| Using print fonts in digital interfaces | Seeing typeface used beautifully in print | Print and screen are fundamentally different rendering media | Ch 3 |
| Copying a style's surface without understanding why it exists | Faster, and "look" seems to matter | Study technological and cultural forces that produced the style | Ch 4 |
| Building entire sites in Flash | Flash enabled richer visuals | Use semantic HTML/CSS; CSS3 now supports most visual effects | Ch 4 |
| Treating SEO as separate from design | Designers focus on aesthetics | SEO is designer's responsibility -- findability is design | Ch 4 |
| Using generic title tags ("Home Page") | Default CMS behavior | Write unique, keyphrase-rich titles for every page | Ch 4 |
| Using non-descriptive URLs | Default CMS/framework behavior | Configure human-readable, keyword-containing URL slugs | Ch 4 |
| Naming images `IMG_001.jpg` with empty alt text | Direct from camera | Rename descriptively; write meaningful alt text | Ch 4 |
| Keyword stuffing and hidden text | Desire for quick SEO gains | Google detects and penalizes; focus on legitimate content | Ch 4 |
| Targeting only high-volume keyphrases | More searches = better assumption | Start with achievable low-volume phrases; build authority first | Ch 4 |
| Ignoring analytics data for keyword strategy | Assumed they know their best keywords | Check which keywords already drive traffic; build on successes | Ch 4 |
| Using `<em>` and `<strong>` purely for visual styling | Confusion between semantic and visual emphasis | Use semantic tags intentionally for genuinely important words | Ch 4 |
| Treating golden ratio as guaranteed formula for beauty | Pop-culture mythology | One tool among several; no ratio guarantees beauty | Ch 5 |
| Claiming Parthenon/Mona Lisa/nautilus "prove" golden ratio | Confirmation bias | Actually measure; most examples don't precisely match | Ch 5 |
| Using only golden ratio when simpler ratios work | Not knowing about 2:3 or 3:4 | Choose simplest ratio that works; 2:3 and 3:4 easier to calculate | Ch 5 |
| Forcing proportions rigidly at expense of design | Mathematical perfection = visual perfection belief | Use proportions as flexible guidelines; override when needed | Ch 5 |
| Ignoring proportions entirely, using arbitrary sizes | Not knowing proportional systems exist | Pick one ratio and derive key dimensions from it | Ch 5 |
| Making all elements same size for "consistency" | Confusing consistency with uniformity | Varied sizes with proportional relationships create more interest | Ch 5 |
| Applying golden ratio to internal elements but not canvas | Starting with details before framework | Start with canvas proportions, then derive internal dimensions | Ch 5 |
| Making everything equally prominent | Treating all content as equally important | Establish clear hierarchy with one dominant element | Ch 6 |
| Ignoring reading direction for web layouts | Placing content based on visual balance alone | Respect F-pattern: most important content top-left | Ch 6 |
| Using contrast inconsistently, drawing eye to wrong elements | Adding bright color for aesthetics without considering weight | Every contrast decision should support intended hierarchy | Ch 6 |
| Mixing unrelated shapes and styles | Designing each element independently | Establish shape language and apply consistently | Ch 6 |
| Relying solely on grid without directional forces | Assuming grid alone creates good composition | Grid determines position; principles determine eye movement | Ch 6 |
| No hover/interactive state changes for web elements | Styling elements identically in all states | Use foreground/background shift on hover | Ch 6 |
| Using texture uniformly or not at all | Same treatment for all surfaces | Vary texture intentionally to create depth | Ch 6 |
| Changing too many visual factors at once | Unsure which factor will "work" | Isolate factors; change one at a time starting with white space | Ch 7 |
| Using only the most obvious factors (size, color, decoration) | Feel most impactful because most visible | Subtlest factors (white space, proportion) often have most impact | Ch 7 |
| Adding rule lines to tables for "organization" | Assumption that lines guide the eye | Alignment guides the eye; remove lines, use white space | Ch 7 |
| Choosing type sizes with trivial differences (13px vs 14px) | Web gives unlimited size options | Use proportional scale and skip steps; 9pt to 16pt is meaningful | Ch 7 |
| Making all metadata equally prominent | Treating metadata as single "block" | Each metadata item has different relationship to content; style accordingly | Ch 7 |
| Overusing ornamentation when design "doesn't look clean" | Mistaking lack of decoration for lack of design | Strip back to one font, one size, white space only; build up | Ch 7 |
| Ignoring leading when using bold body text | Not realizing bold creates heavier texture | Increase line-height when body text is bolded | Ch 7 |
| Using HSB/HSL hue rotation for data visualization | HSB/HSL pickers make it easy to select "different" colors | Use Lab-based selection or Colorbrewer for perceptual uniformity | Ch 8 |
| Assuming HSL Lightness is perceptually accurate | Name "Lightness" implies accuracy | Use Lab L value for true perceptual lightness | Ch 8 |
| Using only color to communicate meaning | Seems culturally obvious and clean | Always add redundant cues: shapes, icons, text labels | Ch 8 |
| Expecting printed colors to match screen colors | Colors look same on designer's screen | Understand RGB/CMYK gamut differences; use ICC profiles | Ch 8 |
| Saving web images with Adobe RGB profiles | Designer works in Adobe RGB for wider gamut | Save in sRGB; strip ICC profiles for CSS-matching images | Ch 8 |
| Treating hex codes as opaque magic strings | Hex notation seems arbitrary | Learn #RRGGBB maps to three 0-255 channels; practice 0,3,6,9,C,F | Ch 8 |
| Ignoring colorblindness because "it's rare" | Assumes own vision is universal | Red-green affects up to 10% of males; always test | Ch 8 |
| Using pure black (#000) for text and shadows throughout | Simplest option | Use hue-shifted dark colors; pure black nearly doesn't exist in nature | Ch 9 |
| Using red prominently in performance-based interfaces | Red feels bold and attention-grabbing | Red overloads prefrontal cortex; use blue/green for analytical contexts | Ch 9 |
| Choosing colors individually by preference with no color wheel relationship | Lacks color theory training | Start with a formal color scheme and adjust from there | Ch 9 |
| Using blue text for non-link content | Blue seems like nice readable color | Blue is universal web convention for links; users will try to click | Ch 9 |
| Bright saturated background on content-rich site | Bright colors make immediate impact | Causes fatigue on text-heavy pages; reserve for splash pages | Ch 9 |
| Using all colors in palette equally | Every color "deserves" equal representation | Pick one or two dominant; use others sparingly as accents | Ch 9 |
| Ignoring cultural color associations for international audience | Assumes own cultural associations are universal | Research target culture's color associations before finalizing | Ch 9 |
| Using completely monochromatic scheme with no accent | Monochromatic feels "safe" | Add at least one accent color from outside the scheme for CTAs | Ch 9 |
| Assuming complementary colors are always jarring | Avoids complementary for gentle sites | Complementary can be gentle when muted, desaturated, or tinted | Ch 9 |
| Picking fonts by decorative classification alone | Popular systems describe traits not structure | Focus on letter structure (humanist, geometric, realist) for pairing | Appendix |
| Pairing two fonts that are "sort of similar" | Intuitively seeks similarity | Commit to harmony (matching structures) or contrast (dramatically different) | Appendix |
| Using Faux Bold in design tools | Button is right there and seems to work | Always load and use authentic bold weight | Appendix |
| Using software-generated italic | One-click italic in tools | Load authentic italic version | Appendix |
| Justifying web body text | Looks "neater" with aligned edges | Use ragged right; CSS lacks hyphenation support | Appendix |
| Using two spaces after periods | Learned in typing class | One space; extra space pokes holes in text block | Appendix |
| Using straight quotes from keyboard | Keyboard produces straight by default | Use smart quotes: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;` | Appendix |
| Using double hyphens for dashes | Typewriter convention | Use spaced en dash `&ndash;` or em dash `&mdash;` | Appendix |
| Both indenting AND spacing paragraphs | "More is better" instinct | Choose ONE: indent or spacing, never both | Appendix |
| Indenting the first paragraph of a section | Treating all paragraphs the same | Don't indent the opening paragraph; it's the first | Appendix |
| Stretching/compressing type to fit a space | Trying to make text fit | Use a specifically designed condensed/extended variant | Appendix |
| Using Times New Roman as go-to serif | Universally available | Use Georgia instead -- designed for screen readability | Appendix |
| Using monospaced fonts for body text | Available on every system | Monospaced creates uneven texture; reserve for code only | Appendix |

---

## 5. Implementation Quick-Start

A condensed checklist for a developer building a new UI from scratch.

### Phase 1: Foundation (Before Any Visual Work)

- [ ] **Define purpose** -- What should users feel, do, and trust? *(Ch 1)*
- [ ] **Create user personas** -- Name, occupation, quote, key needs (even 5-minute versions) *(Ch 2)*
- [ ] **Define use cases** -- Most common user interactions *(Ch 2)*
- [ ] **Assess competitive context** -- Does this product category reward visual design? *(Ch 2)*
- [ ] **Identify medium constraints** -- Screen resolution, device targets, browser support *(Ch 1, Ch 3)*
- [ ] **Determine target keyphrases** for SEO *(Ch 4)*

### Phase 2: Structure (Wireframes & Layout)

- [ ] **Create wireframes** -- Layout and information architecture, no visual styling *(Ch 2)*
- [ ] **Choose a proportional system** -- 2:3 (easy math) or 3:4 (flexible grid) *(Ch 5)*
- [ ] **Set canvas/container proportions** intentionally using chosen ratio *(Ch 5)*
- [ ] **Determine margins** using proportional methods (Tschichold diagonal-line or ratio-based) *(Ch 5)*
- [ ] **Establish a grid** -- Derive column divisions from proportional system *(Ch 5, Ch 7)*
- [ ] **Build semantic HTML** -- Proper heading hierarchy (single H1, logical H2-H6), `<em>`, `<strong>` *(Ch 4)*
- [ ] **Set descriptive URLs**, unique `<title>` tags, `<meta description>` for every page *(Ch 4)*

### Phase 3: Typography

- [ ] **Choose primary body font** -- Sans-serif for web, serif for print *(Appendix)*
- [ ] **Verify medium compatibility** -- Squint test for texture, check x-height for screen *(Ch 3)*
- [ ] **If pairing a second font**: Match letter structures (the `n` test) or use extreme contrast *(Appendix)*
- [ ] **Ensure one serif + one sans-serif** (max two families) *(Appendix)*
- [ ] **Set type scale** using proportional ratio (e.g., 3:4: 5, 7, 9, 12, 16, 21, 28, 37, 50, 67) *(Ch 7)*
- [ ] **Set line-height** to 1.2-1.4em for body copy *(Appendix)*
- [ ] **Set alignment** to ragged right for web *(Appendix)*
- [ ] **Load authentic font weights** -- No fake bold, fake italic, fake small caps *(Appendix)*

### Phase 4: Visual Hierarchy

- [ ] **Start with white space only** -- Position and spacing to differentiate (one font, one size) *(Ch 7)*
- [ ] **Layer in weight** (bold for primary) *(Ch 7)*
- [ ] **Layer in size** (skip type scale steps for meaningful contrast) *(Ch 7)*
- [ ] **Layer in color** (warm for primary, cool for secondary) *(Ch 7, Ch 9)*
- [ ] **Add ornamentation last** -- Only if simpler factors are insufficient *(Ch 7)*
- [ ] **Remove unnecessary borders/rules** from tables (Tufte 1+1=3) *(Ch 7)*

### Phase 5: Color

- [ ] **Choose background** appropriate to content density *(Ch 9)*
- [ ] **Select base hue** matching desired mood and context *(Ch 9)*
- [ ] **Build scheme** from color wheel (monochromatic/analogous/complementary/etc.) *(Ch 9)*
- [ ] **Assign functional colors** -- Red = error, green = success, yellow = highlight, blue = links *(Ch 9)*
- [ ] **Use warm/cool** for depth (warm pops, cool recedes) *(Ch 9)*
- [ ] **Hue-shift shadows/highlights** instead of pure black/white *(Ch 9)*
- [ ] **Add redundant cues** to all color-coded information (shapes, text, icons) *(Ch 8)*
- [ ] **Test for colorblindness** using simulation tools *(Ch 8)*
- [ ] **Save web images in sRGB** -- Strip ICC profiles for CSS-matching images *(Ch 8)*

### Phase 6: Composition & Polish

- [ ] **Establish one dominant element** as visual anchor (size, color, value, white space) *(Ch 6)*
- [ ] **Create foreground/background depth** (shadows, color intensity, overlapping) *(Ch 6)*
- [ ] **Apply similarity** -- Consistent shape language, recurring visual motifs *(Ch 6)*
- [ ] **Build directional flow** -- Guide eye with alignment, progressive sizing, shape groupings *(Ch 6)*
- [ ] **Add rhythm** -- Repeating visual patterns at consistent intervals *(Ch 6)*
- [ ] **Add hover/interactive states** that shift foreground/background *(Ch 6)*
- [ ] **Use proper typographic characters** -- Smart quotes, proper dashes, prime marks *(Appendix)*
- [ ] **Descriptive image filenames and alt text** *(Ch 4)*

### Phase 7: Final Validation

- [ ] **Squint test** -- Dominant element still visible? Hierarchy clear? Text texture even? *(Ch 3, Ch 6, Ch 7)*
- [ ] **Eye recycling test** -- Does the eye circulate through the composition or exit? *(Ch 6)*
- [ ] **F-pattern check** -- Most important content top-left? *(Ch 6)*
- [ ] **Credibility check** -- Would a stranger say "professional" and "well organized"? *(Ch 1)*
- [ ] **Appropriateness check** -- Polish level matches context? *(Ch 1)*
- [ ] **Convention check** -- Functional colors match expectations (red=error, blue=link)? *(Ch 9)*
- [ ] **Crawler test** -- Can search engines access and index all important content? *(Ch 4)*
- [ ] **Strip test** -- Remove each piece of ornamentation; does hierarchy survive? *(Ch 7)*
- [ ] **Cultural check** -- Any unintended color associations for target audience? *(Ch 9)*
