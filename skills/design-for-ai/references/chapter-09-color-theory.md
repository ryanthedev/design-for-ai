# Color Theory
**Book:** Design for Hackers (David Kadavy)
**Part:** Part III — Color
**Core Concept:** Color usage in design is driven by the interplay of psychological responses, cultural associations, biological reactions, and formal color relationships on the color wheel — understanding these factors lets developers choose colors with purpose rather than guesswork.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are selecting, reviewing, or modifying colors in a UI, website, or visual design
- [ ] The design needs to communicate a mood, establish hierarchy, or guide user behavior through color
- [ ] Color choices need to go beyond personal preference and be grounded in rationale

**Do NOT apply when ANY are true:**
- [ ] The design is purely textual with no visual presentation layer (e.g., CLI output only)
- [ ] Colors are entirely dictated by an existing, locked brand style guide with no room for adjustment
- [ ] You are working on accessibility contrast ratios only (use WCAG guidelines instead)

---

## PROBLEM -> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| Colors feel random or clashing in a design | Yes | Apply color scheme relationships (complementary, analogous, etc.) from the color wheel |
| Design needs to feel energetic/active but feels flat | Yes | Use warm colors, saturated hues, and complementary contrasts to create energy |
| Design needs to feel calm but feels chaotic | Yes | Use cool colors, monochromatic or analogous schemes, muted palettes |
| Users are not clicking the call-to-action button | Partial | Color contrast with surroundings matters; red/orange CTAs can drive action, but layout and copy matter too |
| Text hierarchy feels weak despite different font sizes | Yes | Use warm/cool color relationships to add dimension to typography hierarchy |
| Designing for an unfamiliar international audience | Yes | Research cultural color associations before choosing palette |
| Pure accessibility/contrast ratio compliance | No | Use WCAG contrast ratio guidelines and accessibility tooling instead |
| Choosing between specific hex values for brand colors | Partial | This chapter provides principles, not specific hex recipes; use color palette tools for fine-tuning |

---

## KEY DEFINITIONS

> "The artist's color wheel identifies three colors -- red, yellow, and blue -- as *primary colors*."
> -- Chapter 9, Design for Hackers

> "*Secondary colors* ... result from mixing any two primary colors." (Red + yellow = orange, yellow + blue = green, blue + red = purple.)
> -- Chapter 9, Design for Hackers

> "If you mix one of these primary colors with the adjacent secondary color, you get another set of colors called *tertiary colors*."
> -- Chapter 9, Design for Hackers

> "A *tint* of a hue is basically a lighter version of that hue. If you were mixing paint, you would just be adding white."
> -- Chapter 9, Design for Hackers

> "A *shade* is a darker version of the base hue. If you were mixing paint, you would essentially be adding black to create a darker version of the hue."
> -- Chapter 9, Design for Hackers

> "*Pointillism* ... involves painting dots of color next to each other to create the effect of a different overall color."
> -- Chapter 9, Design for Hackers

> "A *monochromatic* color scheme uses a single base hue -- usually with varied tints and shades of that hue -- throughout the design."
> -- Chapter 9, Design for Hackers

> "*Analogous* color schemes typically use three hues that are adjacent to each other on the color wheel."
> -- Chapter 9, Design for Hackers

> "*Complementary* color schemes are made up primarily of two colors that are opposite each other on the color wheel."
> -- Chapter 9, Design for Hackers

> "A *split-complementary* color scheme is made up of a color and the two colors that are on either side of the complement of that color."
> -- Chapter 9, Design for Hackers

> "A *triadic* color scheme is composed of three colors that are evenly spaced on the color wheel."
> -- Chapter 9, Design for Hackers

> "A *tetradic* color scheme is composed of two pairs of complementary colors, for a total of four colors."
> -- Chapter 9, Design for Hackers

---

## DETECTION CHECKLIST

Signs this chapter's knowledge applies:

### Visual Symptoms
- [ ] Colors in the design feel random, clashing, or without clear relationship
- [ ] Design looks flat or lifeless despite having color present
- [ ] Text hierarchy feels weak even with different sizes — secondary text competes with primary
- [ ] Call-to-action elements blend into surroundings rather than standing out
- [ ] Shadows and highlights on buttons/elements use pure black overlays, making them look dull
- [ ] Background color choice seems arbitrary (e.g., bright background on a content-heavy page)
- [ ] Design mood does not match its purpose (e.g., a calming site using jarring complementary saturated colors)

### CSS/HTML Patterns to Look For
- [ ] `color: #000` for body text and `color: #888` for secondary text (neutral grays with no warmth/coolness)
- [ ] `box-shadow` or gradients using pure black (`#000`) instead of darker shades of the base color
- [ ] `background-color` set to a bright saturated hue on a text-heavy page
- [ ] Link colors that are not blue (or not clearly differentiated) on a high-traffic site
- [ ] Accent colors that match the dominant background color (no contrast to draw attention)
- [ ] More than 4-5 unrelated hues without a visible color scheme relationship

### Developer Statements That Trigger This
- "I just picked colors that looked nice together"
- "I don't know why the design feels off -- the layout is fine"
- "How do I choose a color palette?"
- "Should my CTA button be red or green?"
- "The client wants it to feel 'warm' / 'exclusive' / 'natural' but I don't know what colors to use"
- "I'm designing for users in [foreign country] -- what colors should I avoid?"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] Color scheme has an identifiable relationship (monochromatic, analogous, complementary, split-complementary, triadic, or tetradic) -> Fail if: colors appear randomly chosen with no color wheel relationship
- [ ] Accent/action colors contrast with their surroundings -> Fail if: CTA buttons or alerts blend into the dominant color scheme and are not visually distinct
- [ ] Color conventions are respected for functional elements -> Fail if: red is used for success messages, green for errors, or blue text is used for non-links on a standard site
- [ ] Background color is appropriate for content density -> Fail if: bright saturated background is used on a text-heavy, content-rich page

### Should Pass (Important)
- [ ] Warm/cool color relationships are used to establish visual depth and hierarchy -> Warning if: all colors are neutral grays with no temperature variation
- [ ] Shadows and highlights use hue-shifted colors rather than pure black/white overlays -> Warning if: gradients and shadows are created by mixing with pure black only
- [ ] Color choices consider cultural context of target audience -> Warning if: designing for international audience with no cultural color research

### Nice to Have
- [ ] Typography hierarchy is reinforced with warm/cool color dimension (not just size/weight) -> Suggestion: use a warm dark color for primary text and a cool lighter color for secondary text
- [ ] Color palette evokes a mood consistent with the brand/purpose -> Suggestion: review mood patterns (mysterious, active, muted, natural) to align palette with intent

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Pure black (#000) text on pure white (#FFF) with no color variation | Medium | Missed opportunity for depth and dimension; harsh contrast | Use warm dark grays for primary text, cool grays for secondary; leverage hue relationships |
| Red used prominently in a performance/analytical context (quizzes, tests, dashboards) | Critical | Red overloads the prefrontal cortex, reducing rational decision-making and performance | Replace with blue or green in performance contexts; reserve red for errors/urgency only |
| Blue used for non-link text on a standard website | High | Users will try to click blue text expecting a link | Reserve blue text exclusively for links, or use a clearly different shade |
| Bright saturated background on a content-heavy page | High | Causes visual fatigue and reduces readability | Use white, off-white, or dark backgrounds for content-heavy pages; reserve bright backgrounds for splash pages |
| Accent color matches the dominant palette color | High | Functional accent elements (alerts, CTAs) will not stand out | Choose accent colors that contrast with the dominant scheme; consider complementary hues |
| No cultural color research for international audience | Medium | Colors may carry unintended religious, political, or mourning associations | Research flag colors, religious colors, wedding/funeral colors, holiday colors, and sports team colors for the target culture |
| Shadows/highlights created with pure black overlay | Medium | Elements look flat and lifeless compared to hue-shifted alternatives | Use color wheel relationships for highlights (warmer) and shadows (cooler) relative to base color |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify the purpose and desired mood of the design (active, calm, exclusive, natural, muted)
- [ ] Determine the target audience and their cultural context
- [ ] Identify the target medium (web, mobile, print) and content density (splash page vs. content-heavy)
- [ ] Research cultural color associations if designing for an unfamiliar audience (flags, religion, holidays, sports)

### During Design
- [ ] Step 1: Choose a background color appropriate to content density
  - Verify: White/off-white for content-heavy sites; dark for exclusive/nightlife; bright only for low-content splash pages
- [ ] Step 2: Select a base hue that aligns with the desired mood and context
  - Verify: Color's psychological and cultural associations match the design's purpose
- [ ] Step 3: Build a color scheme using the color wheel (monochromatic, analogous, complementary, split-complementary, triadic, or tetradic)
  - Verify: Selected colors have a clear geometric relationship on the color wheel
- [ ] Step 4: Create tints and shades of your base colors for variety and depth
  - Verify: Lighter versions (tints) and darker versions (shades) maintain the hue relationship
- [ ] Step 5: Assign functional roles to colors following web conventions (red = error/urgency, green = success/progress, yellow = highlights/attention, blue = links)
  - Verify: Functional colors contrast with the overall scheme and are not ambiguous
- [ ] Step 6: Apply warm/cool color relationships to establish hierarchy in typography and UI elements
  - Verify: Primary elements use warmer/lighter colors that pop; secondary elements use cooler/darker colors that recede
- [ ] Step 7: Use hue-shifted shadows and highlights instead of pure black/white overlays on buttons and graphics
  - Verify: Shadows skew cooler than base color; highlights skew warmer; neither is just black or white

### After Design
- [ ] Squint test: Do accent colors and CTAs still stand out when you blur/squint at the design?
- [ ] Mood check: Does the overall color feeling match the intended mood (active, calm, exclusive, natural)?
- [ ] Convention check: Will users correctly interpret functional colors (links, errors, success, highlights)?
- [ ] Context check: Would the colors carry unintended meaning for the target cultural audience?

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: Black-and-Gray Typography to Warm/Cool Typography

**Problem (Before):**
Text hierarchy is created using pure black (#000) for headings and neutral gray (#888) for secondary text. There is contrast, but it feels flat and harsh. Developers default to this because it is the simplest approach.

**Solution (After):**
Use a warm, dark color (e.g., #503e2b, a very dark orange) for primary text and a complementary cool gray (e.g., #808094) for secondary text. The warm color pops toward the viewer while the cool color recedes, adding dimension to the hierarchy beyond just size differences.

**Key Change:** Replace neutral black/gray with warm/cool hue-shifted equivalents to add depth and visual interest to text hierarchy.

**Example from book:** Figures 9-17 through 9-19 show the progression from black+gray to warm dark+tinted warm to warm dark+cool gray typography.

---

### Pattern 2: Black-Overlay Button to Hue-Shifted Button

**Problem (Before):**
Button gradients and shadows are created using black-to-white overlays on the base color, resulting in highlights and shadows that are simply lighter and darker versions of the base. The button looks acceptable but lacks richness and life.

**Solution (After):**
Create highlights using a warmer adjacent color on the color wheel (e.g., orange-yellow for a red button) and shadows using a cooler adjacent color (e.g., violet for a red button). Use a dark blue drop shadow instead of black. Text uses a very light warm color (e.g., light yellow) for harmonious contrast.

**Key Change:** Replace pure black/white gradients with color-wheel-aware hue shifts for highlights and shadows, creating richer, more lifelike UI elements.

**Example from book:** Figure 9-20 compares two red buttons -- one with black/white overlay, one with green-to-yellow-to-green gradient and dark blue shadow.

---

### Pattern 3: Random Color Palette to Color-Wheel-Based Scheme

**Problem (Before):**
Colors are chosen individually based on personal preference or by picking "colors that look nice." The palette has no structural relationship, leading to a design that feels disjointed or amateurish. Developers do this because they lack a systematic framework for color selection.

**Solution (After):**
Start from the color wheel and choose a formal color scheme: monochromatic (one hue, varied tints/shades), analogous (3 adjacent hues), complementary (opposite hues), split-complementary, triadic (3 evenly spaced), or tetradic (2 complementary pairs). Adjust saturation and tint/shade for variety.

**Key Change:** Replace intuition-only color picking with a color-wheel-based structural relationship, then fine-tune from there.

**Example from book:** Multiple website examples (IQ2 Mountain Festival = monochromatic, Caerwys View = analogous, Carsonified Summer Camp = complementary, Amazee Labs = split-complementary, Chirp = triadic, Twiistup = tetradic).

---

### Pattern 4: Context-Ignorant Color to Context-Aware Color

**Problem (Before):**
Red is used as a dominant color in a financial dashboard or quiz application because "it looks bold." Users unconsciously experience reduced rational decision-making because red overloads the prefrontal cortex (Elliot and Maier research). Performance suffers without anyone understanding why.

**Solution (After):**
Match color to context: use red for urgency/action/food contexts where you want to drive behavior forward; use blue/green in performance/analytical/financial contexts where calm rational thinking is needed. Consider what evolutionary and cultural signals the color sends in the specific usage context.

**Key Change:** Choose color based on the psychological and contextual effect it will have on users, not just aesthetics.

**Example from book:** Target stores use red everywhere to reduce rational spending decisions; banks use blue/green to convey calm and trustworthiness; food companies use red for its association with cooking fire and appetite.

---

## CORE PRINCIPLES

Color is contextual: the same color can have opposite effects depending on the situation, culture, and surrounding colors. Effective color usage requires understanding three layers -- psychological/biological responses (warm excites, cool calms, red overloads the prefrontal cortex), cultural associations (vary by audience), and formal color relationships on the color wheel (how colors interact creates harmony, tension, depth, and mood). Rather than relying on intuition alone, developers should use these frameworks to make intentional color decisions.

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] Colors follow an identifiable color wheel relationship (monochromatic, analogous, complementary, split-complementary, triadic, tetradic)
- [ ] Functional colors follow web conventions (red = error/urgency, green = success, yellow = highlight, blue = link)
- [ ] Warm/cool relationships are used to create depth and hierarchy, not just size/weight differences
- [ ] Background color is appropriate for content density and audience
- [ ] Accent colors contrast sufficiently with dominant palette to draw attention where intended
- [ ] Color choices are appropriate for the cultural context of the target audience
- [ ] Shadows and highlights use hue variation, not just pure black/white

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Red used in performance/analytical context | Critical | Research shows red reduces prefrontal cortex function, directly harming user performance |
| Functional colors reversed (red for success, green for errors) | Critical | Violates deeply ingrained web conventions, causes user confusion |
| No identifiable color relationship in palette | High | Design will feel amateur and disjointed; colors clash without structure |
| Blue text used for non-links | High | Users will attempt to click; violates foundational web usability convention |
| Pure black for all shadows/contrast | Medium | Missed opportunity for richness; design feels flat but is functional |
| No cultural color consideration for international audience | Medium | Risk of unintended offense or miscommunication |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Start with purpose/mood identification before picking any colors
- [ ] Choose a color scheme type from the color wheel as a structural foundation
- [ ] Map colors to functional roles (background, primary text, secondary text, links, CTAs, errors, success, highlights)
- [ ] Use warm colors to make elements pop/advance and cool colors to make elements recede
- [ ] Create tints and shades for depth rather than relying on black/white mixing
- [ ] Verify accent colors contrast with their surroundings to serve their purpose
- [ ] Research cultural associations when audience is unfamiliar

---

## THIS VS THAT

| Confusion Point | This Chapter Says | Not This |
|-----------------|-------------------|----------|
| "Cool colors are calming because of cultural associations" | Cool colors (blue, green, violet) may calm partly because short-wavelength cones are absent from the fovea and outnumbered by warm-spectrum cones -- they literally stimulate the visual system less | Color temperature effects are purely cultural/learned |
| "Red is always a bad color" | Red is the most powerful color -- use it wisely based on context; it drives action in sales/food/urgency but harms performance in analytical contexts | Red should be avoided everywhere |
| "Black is the best way to create contrast and shadows" | The Impressionists avoided black because hue-shifted shadows (using cooler colors) create richer, more lifelike depth than pure black | Always use black for shadows and dark areas |
| "A color has a fixed meaning" | Color meaning is entirely contextual -- red means danger in a test, romance on Valentine's Day, appetite in a restaurant; the same color shifts meaning by context | Colors have universal fixed meanings |
| "The artist's color wheel is scientifically precise" | The artist's RYB color wheel is not scientifically correct (CMY or RGB are more accurate), but there is a great body of theory built around it and most color tools assume it | The traditional color wheel is the only valid color model |
| "Complementary colors are always jarring" | Complementary schemes can be gentle and natural when hues are muted, desaturated, or tinted (e.g., Yoga Haven's red-brown and green palette) | Complementary = loud and aggressive |
| "More colors = better design" | Having one or two dominant colors and using others sparingly as accents is more effective than using all colors equally | Every color in the scheme should be used equally |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Chapter Recommends | When |
|----------------|---------|-------------------|------|
| Background color | White, off-white, dark, bright | White for wide-audience/e-commerce; off-white for intimacy/antiquity; dark for exclusivity/nightlife; bright for low-content splash pages | Based on content density and audience breadth |
| Color for CTAs/action buttons | Red, green, orange, other | Red to drive impulsive action (sales, urgency); green for progress/success; choose whichever contrasts most with the dominant scheme | Based on desired user behavior and surrounding colors |
| Color for error messages | Red, yellow, other | Red for critical errors and urgent alerts | When something is wrong and the user must notice immediately |
| Color for highlights/notes | Yellow, other | Yellow (like a highlighter) for important non-urgent information, bonus content, deals | When calling attention to supplementary information |
| Color for links | Blue, other | Blue (or form of blue) for high-traffic/wide-audience sites; other colors acceptable for smaller/design-focused sites | Based on audience size and usability priority |
| Color scheme type | Monochromatic, analogous, complementary, split-complementary, triadic, tetradic | Monochromatic for quiet/focused; analogous for harmonious/peaceful; complementary for exciting/energetic; split-complementary for colorful but not jarring; triadic for cheery/approachable; tetradic for complex palettes (use with care) | Based on desired mood and design complexity |
| Text color approach | Pure black + neutral gray vs. warm/cool hue-shifted | Warm dark hue for primary text + cool complementary gray for secondary text | When seeking visual sophistication beyond basic black/gray |
| Mood: mysterious/exclusive | Dark background + sparse bright accents | Dark neutral background with limited high-contrast accent colors | Sites conveying secrecy, luxury, sophistication |
| Mood: active/energetic | Bright saturated + complementary contrast | Bright saturated colors that contrast; complementary or triadic schemes | Sites for fun, social, action-oriented products |
| Mood: muted/sophisticated | Low saturation + dominant neutral + one strong accent | Mostly desaturated palette with one bold accent color that stands out | Sites conveying confidence, calm authority |
| Mood: natural/earthy | Warm unsaturated + greens/browns | Shaded, low-saturation warm colors (browns, brownish-orange, brownish-yellow, greens) | Sites related to food, outdoors, organic products |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| Color wheel scheme selection | Provides structured color relationships that naturally harmonize or contrast | Starting a new design or auditing an existing palette | Pick a scheme type (monochromatic, analogous, complementary, split-complementary, triadic, tetradic) and select colors at the corresponding positions on the color wheel |
| Warm/cool color popping | Creates visual depth -- warm hues advance toward viewer, cool hues recede | Establishing hierarchy in typography, UI layering, or foreground/background separation | Use warmer colors for elements that should stand out; cooler colors for elements that should recede; works for tints/shades too (tints pop, shades recede) |
| Hue-shifted shadows and highlights | Creates richer, more lifelike depth on UI elements than black/white overlays | Buttons, cards, containers, any element with gradients or drop shadows | For highlights, shift toward a warmer adjacent hue; for shadows, shift toward a cooler adjacent hue; use a dark cool color (e.g., dark blue) for drop shadows instead of black |
| Temperature-based text hierarchy | Adds a dimension of depth to typographic hierarchy beyond size and weight | Multi-level text layouts (headings, body, captions) | Use a warm dark color for primary text (e.g., dark orange-brown #503e2b) and a cool gray for secondary text (e.g., #808094) |
| Accent color contrast | Makes functional elements (CTAs, alerts) visually prominent | When an element must demand attention | Choose accent colors that are distant from the dominant palette on the color wheel; a red CTA pops on a green-dominant scheme precisely because they are complements |
| Cultural color research | Prevents unintended negative associations for international audiences | Designing for any culture you are not deeply familiar with | Research: flag colors, dominant religion colors, wedding/funeral colors, holiday colors, sports team colors for the target culture |
| Mood palette pattern matching | Aligns the overall color palette with the intended emotional tone of the design | Setting the overall feel of a site or app | Match to mood patterns: dark + sparse accents = exclusive; bright + saturated + contrasting = active; low-saturation + neutral dominant = muted; warm + unsaturated = natural |

---

## COMMON MISTAKES

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Using pure black (#000) for text and shadows throughout | Developers default to black as "the darkest color"; it is the simplest option | Use hue-shifted dark colors for text and hue-shifted cooler colors for shadows; pure black nearly does not exist in nature |
| Using red prominently in performance-based interfaces (quizzes, analytics, dashboards) | Red feels bold and attention-grabbing | Red overloads the prefrontal cortex and reduces rational performance; use blue or green in analytical contexts |
| Choosing colors individually by preference with no color wheel relationship | Developers lack color theory training and rely on intuition | Start with a formal color scheme (monochromatic, analogous, complementary, etc.) and adjust from there |
| Using blue text for non-link content | Blue seems like a nice readable color | Blue is the universal web convention for links; users will try to click it |
| Bright saturated background on a content-rich site | Bright colors make an immediate impact | Bright backgrounds cause fatigue on content-heavy pages; reserve for splash/landing pages with minimal content |
| Using all colors in a palette equally | Developer thinks every color in the scheme deserves equal representation | Pick one or two dominant colors; use others sparingly as accents to draw attention to specific elements |
| Ignoring cultural color associations when designing for international audience | Developer assumes their own cultural associations are universal | Research the target culture's color associations (flags, religion, holidays, sports) before finalizing the palette |
| Using a completely monochromatic scheme with no accent | Monochromatic feels "safe" | A completely monochromatic scheme can be boring; add at least one accent color from outside the scheme for CTAs or key actions |
| Assuming complementary colors are always jarring | Developer avoids complementary schemes for gentle/natural sites | Complementary colors can be gentle when muted, desaturated, or tinted; see Yoga Haven example (red-brown + green) |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "Color is subjective -- there's no right answer, so I'll just pick what I like" | While there is no single right answer, color wheel relationships, psychological research, and cultural conventions provide objective frameworks that produce reliably better results than pure intuition |
| "I'll just use black text on white -- it's the most readable" | Black on white is functional but not optimal; warm/cool hue-shifted text creates richer hierarchy and is often more aesthetically pleasing while remaining readable |
| "Red is just a color, it can't actually affect behavior" | Research by Elliot and Maier demonstrated that mere exposure to red overloads the prefrontal cortex, reduces rational thinking, triggers avoidance behavior, and lowers test performance -- all without conscious awareness |
| "I don't need to worry about cultural associations -- my audience is global" | A global audience is the strongest reason to research cultural associations; what is celebratory in one culture may be mournful in another |
| "Color schemes are for designers, not developers" | Color scheme tools (ColorSchemer, Color Scheme Designer, Adobe Kuler) are specifically designed for non-designers to create structured palettes quickly |
| "I'll just use the brand colors for everything" | Brand colors provide a starting point, but you still need tints, shades, and accent colors for hierarchy, functional elements, and depth; the color wheel helps you extend a brand palette systematically |
| "Pure black shadows look fine" | They look acceptable, but hue-shifted shadows and highlights create dramatically richer, more engaging UI elements; the difference is clear in side-by-side comparisons (Figure 9-20) |

---

## TRIGGERS

Invoke this chapter's knowledge when:
- [ ] A developer is choosing or building a color palette for a new design
- [ ] A design review reveals colors that feel random, clashing, or without clear relationship
- [ ] Text hierarchy feels weak despite varying size/weight -- color dimension may be missing
- [ ] CTA or accent elements are not standing out from their surroundings
- [ ] UI buttons/elements feel flat or lifeless despite having color gradients
- [ ] Developer asks "what color should my [button/background/text] be?"
- [ ] Design is being adapted for an international or unfamiliar cultural audience
- [ ] Red is being used in a context where user performance or rational decision-making matters
- [ ] The design mood does not match its intended purpose or audience

Prerequisite state:
- Basic understanding of hue, saturation, and lightness (covered in Chapter 8 of the book)
- Understanding that human color vision works through cone stimulation (Chapter 8)

---

## PRODUCES

After applying this knowledge:
- State: Design has a purposeful, structured color palette based on color wheel relationships with appropriate mood, hierarchy, and functional color assignments
- Artifacts: Color palette (base hue + scheme type + tints/shades + accent colors), functional color map (background, text hierarchy, links, CTAs, errors, success, highlights), mood alignment rationale
- Understanding: Developer can articulate why each color was chosen, how colors relate to each other on the color wheel, and what psychological/cultural signals the palette sends

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Color palette is chosen but typography hierarchy is not yet established | Typography and type scale design capability | Color relationships enhance typography hierarchy but font selection, sizing, and spacing are separate decisions |
| Design is for a content-heavy page and background color is set | Layout and spacing/proportion capability | Color sets the tone but proportional layout determines readability and visual flow |
| Color palette needs to maintain accessibility compliance | WCAG contrast ratio checking capability | Color theory ensures aesthetic harmony but accessibility requires specific contrast ratio thresholds (4.5:1 for text) |
| Design includes complex UI elements (buttons, cards, forms) | Interface element styling capability | Color relationships inform highlights/shadows but element design involves border radius, padding, elevation, and interaction states |
| Design needs to evoke a specific historical or artistic style | Design history and style movement knowledge | Color mood patterns provide general direction but specific period styles have additional constraints beyond color |

---

## CSO KEYWORDS

color theory, color wheel, primary colors, secondary colors, tertiary colors, tint, shade, hue, warm colors, cool colors, monochromatic, analogous, complementary, split-complementary, triadic, tetradic, color scheme, color palette, color psychology, color and culture, red prefrontal cortex, Elliot and Maier, color context, web color conventions, background color, accent color, CTA button color, link color blue, error red, success green, highlight yellow, Impressionism color, Monet, pointillism, color interaction, color contrast, color mood, mysterious palette, active palette, muted palette, natural palette, warm pop cool recede, hue-shifted shadows, color hierarchy, typography color, cultural color associations, color tools, ColorSchemer, Adobe Kuler, Color Scheme Designer
