# Color Science
**Book:** Design for Hackers (David Kadavy)
**Part:** Part III — Color
**Core Concept:** Color is electromagnetic radiation perceived by the human visual system; understanding the science of color perception, color models (RGB, HSB, Lab, HSL, CMYK), color gamuts, hexadecimal notation, and colorblindness enables developers to make informed, effective color decisions across media.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are choosing, specifying, or adjusting colors in a design or data visualization
- [ ] The design will be rendered on screen (web/app) or across multiple media (screen + print)
- [ ] You need to understand why colors appear the way they do, or why colors don't match across devices

**Do NOT apply when ANY are true:**
- [ ] You are working purely with black-and-white / grayscale output with no color decisions
- [ ] You need color harmony or emotional/cultural color theory guidance (see Chapter 9 instead)
- [ ] The task is purely about layout, typography, or non-color visual design concerns

---

## PROBLEM --> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| Colors on printed business card don't match the website | Yes | RGB (additive, screen) vs CMYK (subtractive, print) have different gamuts; use ICC profiles and color management |
| Data visualization colors make some categories look more important than others | Yes | HSB/HSL color pickers produce perceptually uneven lightness; use Lab color space or Colorbrewer |
| Need to pick a specific hex color without a color picker | Yes | Learn the hexadecimal RGB cube and the 0, 3, 6, 9, C, F progression for mental navigation |
| Colors look different on different monitors | Yes | Different devices have different gamuts; use sRGB for web images and understand ICC profiles |
| Users report colorblindness issues | Yes | ~10% of males are red-green colorblind; use redundant cues (shape, position) in addition to color |
| Need to choose emotionally resonant colors | No | This chapter covers color science, not color psychology or theory; see Chapter 9 |
| Want to create a harmonious color palette (complementary, triadic, etc.) | Partial | This chapter explains why the color wheel exists (opponent processing); Chapter 9 covers harmony rules |

---

## KEY DEFINITIONS

> "The electromagnetic radiation that humans can generally see is called the *visible spectrum*. These wavelengths range from about 390 to 750 nanometers in amplitude and cycle at 400 to 790 terahertz."
> -- Chapter 8, Design for Hackers

> "Though one spectrum may differ from another, they may appear to be the same color. This phenomenon is called *metamerism*, and it's the basis for how we are able to approximate and reproduce colors across a variety of media."
> -- Chapter 8, Design for Hackers

> "Color constancy is a phenomenon in which your eye reads two instances of the same color as being the same color despite the fact that one instance is in light, and another is in shade."
> -- Chapter 8, Design for Hackers

> "The pure colors that I've been talking about are called *hues*, but there are, of course, many more colors that are visible to humans."
> -- Chapter 8, Design for Hackers

> "The first really successful codification of visible colors was that of Albert H. Munsell's, known as the Munsell color system, which... defined colors based upon their hue (is it red, blue, and so on?), value (how dark or light is it?), and chroma (color intensity -- for example, pastels are low chroma)."
> -- Chapter 8, Design for Hackers

> "The boundaries of the color capabilities of a particular color capture or color reproduction system -- whether it is that of human vision, a computer monitor, or a printer -- is known as a *gamut*."
> -- Chapter 8, Design for Hackers

> "To keep color representations consistent as they move from one gamut to another, gamuts are described by *ICC profiles*. ICC profiles (built on standards created by the International Color Consortium) hold data that describes how the limitations of a color space relate to a profile connection space (PCS)."
> -- Chapter 8, Design for Hackers

---

## DETECTION CHECKLIST

Signs this chapter's knowledge applies:

### Visual Symptoms
- [ ] Colors on screen look noticeably different from printed output
- [ ] Data visualization pie chart or map has categories that appear visually weighted unevenly despite being qualitative
- [ ] Monochromatic color palette has values that are nearly indistinguishable at the dark or light end
- [ ] Web graphic colors don't match surrounding CSS background color
- [ ] Red/green UI indicators are indistinguishable for some users

### CSS/HTML Patterns to Look For
- [ ] Hex color values that seem arbitrary with no system (e.g., random 6-character strings with no relationship)
- [ ] Using HSL/HSB hue shifts for quantitative data visualization with constant saturation/lightness
- [ ] Images saved with Adobe RGB ICC profiles embedded, used on the web alongside CSS colors
- [ ] No colorblindness testing for status indicators that rely solely on red/green

### Developer Statements That Trigger This
- "Why doesn't the printed logo match the website?"
- "I just picked colors from the HSB picker that looked different enough"
- "The hex codes are confusing, I just use a color picker every time"
- "My data visualization looks fine to me but some users complain"
- "I set the same lightness value in HSL but the colors don't look equally light"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] Color-dependent UI indicators also use shape, position, or text as redundant cues --> Fail if: color is the only differentiator for critical information (affects ~10% of male users)
- [ ] Data visualization uses perceptually uniform color differences --> Fail if: qualitative chart categories have visually unequal perceptual weight, or quantitative scale has non-monotonic perceived lightness
- [ ] Web images that must match CSS background colors are saved without ICC profiles (or in sRGB) --> Fail if: image colors visibly mismatch surrounding CSS colors on color-managed browsers

### Should Pass (Important)
- [ ] Cross-media color workflow uses ICC profiles and gamut-aware conversions --> Warning if: RGB colors are sent directly to print without CMYK conversion or gamut checking
- [ ] Hex color adjustments follow a systematic approach (understanding RGB channels) --> Warning if: color tweaks are made by random trial-and-error in hex values

### Nice to Have
- [ ] Developer can mentally navigate the hexadecimal color cube for quick adjustments --> Suggestion: learn the 0, 3, 6, 9, C, F progression and RGB channel relationships
- [ ] Lab color space is used when perceptual lightness consistency matters --> Suggestion: use Colorbrewer or Lab-based color chooser for data-driven graphics

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Red and green used as sole differentiators for status (pass/fail, go/stop) | Critical | Inaccessible to ~10% of males with red-green colorblindness | Add redundant cues: icons, shapes, text labels, or position |
| HSB/HSL hue rotation used for quantitative data palette | High | Perceptual lightness varies wildly across hues; data will be misread | Use Lab-based color palette or Colorbrewer for perceptually uniform scales |
| Adobe RGB-profiled images placed on CSS-colored backgrounds on the web | High | Color-managed browsers (Safari, Firefox on Mac) will mismatch image and CSS colors | Save web images in sRGB without ICC profile, or strip the profile |
| Monochromatic HSL palette with equal lightness steps for data classes | Medium | Last two or three classes may be visually indistinguishable due to HSL's perceptual inaccuracy | Use Lab lightness values to ensure perceptually distinct steps |
| Expecting printed CMYK output to exactly match on-screen RGB colors | Medium | RGB and CMYK gamuts differ; some RGB blues/greens cannot be reproduced in CMYK | Use soft-proofing with ICC profiles; accept closest perceptual match |
| Picking hex colors entirely at random with no understanding of channel structure | Low | Wastes time and produces inconsistent palettes | Learn hexadecimal RGB cube navigation (0, 3, 6, 9, C, F progression) |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify the target medium(s): screen only (web/app), print only, or cross-media
- [ ] Determine if data visualization is involved and whether data is qualitative or quantitative
- [ ] Determine if colorblindness accessibility is required (it almost always should be)
- [ ] Identify which color model you will work in (hex/RGB for web, CMYK for print, HSB/HSL for ideation, Lab for perceptual accuracy)

### During Design
- [ ] Step 1: Choose a color model appropriate to the task
  - Verify: Web work uses hex/RGB or HSL; print work uses CMYK; perceptually critical work references Lab
- [ ] Step 2: If creating data visualizations, select colors with perceptually uniform lightness
  - Verify: For qualitative data, all category colors have similar perceptual lightness (check via Lab L value). For quantitative data, lightness progresses monotonically. Use Colorbrewer if possible.
- [ ] Step 3: If working cross-media, convert colors between gamuts using ICC profiles
  - Verify: Check for out-of-gamut warnings in design software (e.g., Adobe Illustrator's gamut warning)
- [ ] Step 4: For web images, save in sRGB color space
  - Verify: Images that must match CSS colors are saved without an ICC profile attached (or with sRGB profile for standalone images)
- [ ] Step 5: Test for colorblindness compatibility
  - Verify: Use Photoshop's colorblindness proof setting or a web-based simulator; ensure no information is conveyed by color alone
- [ ] Step 6: When adjusting hex colors, use channel understanding rather than random guessing
  - Verify: Can articulate which RGB channel was changed and why (e.g., "bumped Green to reduce redness")

### After Design
- [ ] Colorblindness simulation test passes for deuteranopia and protanopia
- [ ] If cross-media, soft-proof the print output using ICC profiles for the target printer/paper
- [ ] Data visualization colors are perceptually distinguishable and appropriately weighted
- [ ] Web graphics match CSS colors when viewed in both color-managed and non-color-managed browsers

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: HSB Data Palette to Lab-Based Perceptually Uniform Palette

**Problem (Before):**
Developer creates a pie chart or choropleth map by picking colors from an HSB/HSL color picker, selecting different hues at the same saturation and brightness/lightness. The resulting colors have unequal perceptual weight -- some categories appear visually dominant (e.g., bright yellow vs. dark blue) despite representing equivalent data.

**Solution (After):**
Switch to a Lab-based color chooser or use Colorbrewer (colorbrewer2.org). For qualitative data, pick colors at the same Lab L (lightness) value so no category dominates visually. For quantitative data, use a sequential or diverging palette with perceptually uniform lightness progression.

**Key Change:** Replace HSB/HSL "equal numeric values" with Lab "equal perceptual lightness" -- because HSB Brightness and HSL Lightness do not correspond to actual human perception.

**Example from book:** Figure 8-18 shows pie charts with HSB-chosen colors (uneven perceptual weight) vs. Lab-chosen colors (equal perceptual weight). Figures 8-20/8-21/8-22 show Swedish population density maps with HSL hue-based palette (misleading), HSL lightness-based palette (indistinguishable at extremes), and perceptually-based palette (accurate and readable).

---

### Pattern 2: Color-Only Status Indicators to Redundant-Cue Indicators

**Problem (Before):**
Developer uses red for errors and green for success with no other visual differentiator. Approximately 10% of male users with red-green colorblindness cannot distinguish these states.

**Solution (After):**
Add shape differentiation (checkmark for success, X for error, triangle for warning), text labels, and/or positional cues alongside color. The icons themselves communicate meaning independent of color.

**Key Change:** Color becomes one of multiple redundant channels communicating status, rather than the sole channel.

**Example from book:** Figure 8-10 shows icons (checkmark, X, triangle) that are easy for colorblind people to understand because they vary by shape, not just color. Figure 8-11 shows a color chart tested for deuteranopia and then adjusted.

---

### Pattern 3: Random Hex Guessing to Systematic Hexadecimal Navigation

**Problem (Before):**
Developer wants to adjust a color in CSS but treats hex codes as opaque strings, resorting to a visual color picker for every change. This is slow and disconnects the developer from understanding the color they are working with.

**Solution (After):**
Understand the hex code as three RGB channels (#RRGGBB), each ranging from 00 to FF. Use the progression 0, 3, 6, 9, C, F for quick 6-step navigation. Equal R, G, B values produce grays (#000 black, #333 dark gray, #999 medium gray, #FFF white). Bump one channel to shift toward that primary; bump two channels to shift toward their secondary.

**Key Change:** Hex values become a navigable 3D color space rather than an opaque notation, enabling rapid in-code color adjustments.

**Example from book:** Figures 8-30/8-31 show changing type from #000 (black) to #333 (dark gray), then making it reddish by bumping R to #933, adjusting G to #963, and fine-tuning to #B26666.

---

### Pattern 4: Mismatched Cross-Media Colors to ICC-Managed Color Workflow

**Problem (Before):**
Designer creates a logo in RGB for the website, then sends the same RGB values to a printer. The printed colors look duller and different because the printer uses CMYK, which has a different (often smaller) gamut for saturated blues and greens.

**Solution (After):**
Use ICC profiles throughout the workflow. Design in sRGB for web. When converting to print, use the target printer's ICC profile to soft-proof the CMYK conversion. Accept the closest perceptual match for out-of-gamut colors. For critical color matching, consider PANTONE spot colors.

**Key Change:** Explicit gamut awareness and ICC-profile-based conversion replaces the assumption that the same numeric color values will look the same across media.

**Example from book:** The Bay Bridge Painters scenario (Figures 8-35 through 8-38) shows the website's vibrant blue logo losing saturation when converted to CMYK for business cards, and the designer using ICC profiles, soft-proofing, and spectrophotometer calibration to get the closest match.

---

## CORE PRINCIPLES

Color is electromagnetic radiation that the human visual system interprets through three types of cone cells processed via opponent channels (red-green, blue-yellow, light-dark). Different color models (RGB, CMYK, HSB, HSL, Lab, Munsell) represent this perceptual reality with varying degrees of accuracy, and each output medium (screen, print) has its own gamut of reproducible colors. Understanding this science is essential for making reliable, accessible, and perceptually accurate color decisions in design.

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] Colorblindness accessibility: no information conveyed by color alone; redundant cues present
- [ ] Perceptual uniformity: data visualization colors have appropriate perceptual lightness relationships (equal for qualitative, monotonic for quantitative)
- [ ] Gamut awareness: cross-media designs have been converted and proofed using ICC profiles
- [ ] Web color consistency: images match CSS colors (no ICC profile mismatch on web graphics)
- [ ] Hex color system: color values follow a logical, systematic structure rather than random choices

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Color-only status indicators with no redundant cues | Critical | Excludes ~10% of male users who are red-green colorblind |
| Perceptually misleading data visualization colors | High | Misrepresents data, leading to incorrect user conclusions |
| ICC profile mismatch causing web image/CSS color discrepancy | High | Visible inconsistency in color-managed browsers (Safari, Firefox on Mac) |
| Cross-media color sent without gamut conversion | Medium | Printed output will differ from screen in unpredictable ways |
| Arbitrary hex values with no systematic approach | Low | Inefficiency and inconsistent palette, but not functionally broken |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Choose the right color model for the task (RGB/hex for web, CMYK for print, Lab for perceptual accuracy, HSB for intuitive picking)
- [ ] Use redundant visual cues (shape, text, position) alongside color for all status/meaning communication
- [ ] Use perceptually uniform color spaces (Lab or Colorbrewer) for data-driven graphics
- [ ] Work in sRGB for web images; strip ICC profiles from images that must match CSS colors
- [ ] Use ICC profiles and soft-proofing for cross-media color workflows
- [ ] Navigate hex colors systematically using RGB channel understanding

---

## THIS VS THAT

| Confusion Point | This Chapter Says | Not This |
|-----------------|-------------------|----------|
| HSB Brightness = perceived lightness | HSB Brightness does NOT correspond to actual perceptual lightness; white and bright red have the same Brightness (100) but very different perceptual lightness | "If two colors have the same Brightness value they look equally light" |
| HSL Lightness = perceptual lightness | HSL Lightness is closer but still NOT perceptually accurate; Lab Lightness is the true perceptual measure | "HSL Lightness gives you perceptually uniform results" |
| Additive vs. subtractive color mixing | RGB (screens) is additive -- R+G+B = white; CMYK (print) is subtractive -- C+M+Y absorbs light toward black | "Mixing all colors together always makes brown/black" (confusing paint mixing with light mixing) |
| Color is objective physical reality | Color is subjective perception -- it exists only because our visual system interprets electromagnetic radiation; other species see different color ranges | "Red is red, it's a fixed property of the object" |
| Trichromatic theory vs. color opponent theory | Both theories are correct and compatible -- cones (trichromatic) feed into ganglion cells (opponent processing) | "Only one color vision theory can be right" |
| RGB and CMYK can reproduce the same colors | Each has unique gamut limitations; many vivid RGB blues/greens cannot be reproduced in CMYK, and vice versa | "I can just use the same hex code for print" |
| Adobe RGB is better than sRGB for the web | For web, sRGB is more predictable because browser color management is unreliable; Adobe RGB images may look flat in non-color-managed browsers | "Use Adobe RGB for everything since it has a wider gamut" |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Chapter Recommends | When |
|----------------|---------|-------------------|------|
| Color model for web design | Hex (RGB), HSL, rgb() | Hex/RGB for implementation; HSL for intuitive selection; rgb() as fallback | Building CSS-based interfaces |
| Color model for data visualization | HSB/HSL, Lab, Colorbrewer | Lab or Colorbrewer for perceptual uniformity | Creating charts, maps, or infographics |
| Color model for print design | RGB, CMYK, PANTONE spot | CMYK for standard printing; PANTONE for exact color matching on large runs | Designing for printed materials |
| Data palette type | Sequential, diverging, qualitative | Sequential for low-to-high continuum; diverging to highlight extremes/midpoint; qualitative for unordered categories | Choosing palette for data-driven graphics |
| Web image color space | sRGB, Adobe RGB | sRGB (without ICC profile for CSS-matching images; with sRGB profile for standalone images) | Saving images for the web |
| Colorblindness accommodation | Color-only, color + shape, color + text | Color + shape + text (multiple redundant cues) | Any design where color conveys meaning |
| Cross-media color matching approach | Eyeball it, ICC profiles + soft-proofing, PANTONE spot colors | ICC profiles + soft-proofing; PANTONE for critical matching | Working across screen and print |
| Hex color adjustment approach | Color picker every time, mental hex navigation | Learn mental hex navigation (0, 3, 6, 9, C, F) for efficiency | Tweaking colors directly in CSS code |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| Hexadecimal mental navigation | Allows in-code color adjustment without a visual picker | Tweaking CSS colors quickly | Remember #RRGGBB structure; use 0,3,6,9,C,F as 6-step scale; equal channels = gray; bump one channel to shift hue |
| 3-character hex shorthand | Faster CSS color specification using 256-color subset | Quick prototyping; simple palettes | #F00 = red, #F0F = magenta, #F90 = orange-yellow; each character doubled (#F00 = #FF0000) |
| Lab color chooser for qualitative data | Ensures equal perceptual lightness across data categories | Pie charts, categorical maps, any qualitative visualization | In Photoshop Lab chooser, fix L value, then pick different a/b positions for each category |
| Colorbrewer palettes | Provides pre-built perceptually uniform, colorblind-safe palettes | Data-driven maps and graphics | Go to colorbrewer2.org; select data type (sequential/diverging/qualitative); select number of classes; enable colorblind-safe filter |
| Sequential color palette | Represents data on a continuum from low to high | Population density, temperature, any ordered continuous data | Use a single hue with perceptually uniform lightness progression (light = low, dark = high) |
| Diverging color palette | Highlights both extremes and a neutral midpoint | Data with meaningful midpoint (median, zero, average) | Place two concentrated hues at extremes; fade to neutral at midpoint |
| ICC profile soft-proofing | Simulates on-screen how colors will look when printed | Before sending to printer; cross-media design | Create ICC profile for target printer/paper; use Proof Setup in Adobe software to preview |
| Colorblindness simulation | Shows how design appears to colorblind users | Any design using color to convey meaning | Use Photoshop's colorblindness proof setting, or web tools that simulate common colorblindness types |
| Stripping ICC profiles for web | Prevents color mismatch between image and CSS on Mac browsers | Web images that must seamlessly match CSS background colors | Use Photoshop "Save for Web" which strips ICC profile by default |
| Spectrophotometer calibration | Creates accurate ICC profile for a specific monitor | Professional cross-media color workflow | Use hardware spectrophotometer device to measure monitor output; OS uses resulting ICC profile to adjust display |

---

## COMMON MISTAKES

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Using HSB/HSL hue rotation for data visualization palettes | HSB/HSL pickers make it easy to select "different" colors by moving the hue slider | Use Lab-based selection or Colorbrewer to ensure perceptual uniformity |
| Assuming HSL Lightness is perceptually accurate | The name "Lightness" implies perceptual accuracy, but HSL distorts the visible color range | Use Lab L value for true perceptual lightness; HSL Lightness is a mathematical, not perceptual, property |
| Using only color to communicate meaning (red = bad, green = good) | It seems culturally obvious and visually clean | Always add redundant cues: shapes, icons, text labels, positional encoding |
| Expecting printed colors to match screen colors | Colors look the same to the designer on screen | Understand RGB vs. CMYK gamut differences; use ICC profiles and soft-proofing |
| Saving web images with Adobe RGB or other ICC profiles attached | Designer works in Adobe RGB for its wider gamut | Save web images in sRGB; strip ICC profiles from images that need to match CSS colors |
| Treating hex codes as opaque magic strings | Hex notation seems arbitrary without understanding base-16 and RGB channels | Learn that #RRGGBB maps to three 0-255 channels; practice the 0,3,6,9,C,F progression |
| Using the same HSL lightness step for a monochromatic palette | Equal numeric HSL Lightness steps seem like they should produce equally distinguishable colors | Last steps often become indistinguishable; verify perceptual distinctness via Lab conversion |
| Ignoring colorblindness because "it's rare" | Developers assume their own vision is universal | Red-green colorblindness affects up to 10% of males; always test with simulation tools |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "I can just eyeball the print colors from my screen" | RGB screens and CMYK printers have fundamentally different gamuts. Without ICC profiles and soft-proofing, you are guaranteed mismatch, especially for vivid blues and greens. |
| "Colorblindness is too rare to worry about" | Red-green colorblindness affects as many as 1 in 10 males. For any public-facing product, that is a significant portion of your audience. |
| "HSL has a Lightness value so it must be perceptually uniform" | HSL Lightness is a mathematical abstraction, not a perceptual measurement. Lab L is based on actual human perception experiments. Two HSL colors with the same L can look very different in lightness. |
| "I don't need to understand hex -- I have a color picker" | Understanding hex lets you make fast, precise adjustments directly in code, navigate the color space mentally, and debug color issues without switching tools. |
| "Adobe RGB is always better because it has a wider gamut" | For web use, sRGB is more predictable. Browsers without color management will display Adobe RGB images as if they were sRGB, making colors appear flat and desaturated. |
| "The HSB picker shows my colors are the same brightness, so they look equally light" | HSB Brightness is not perceptual lightness. A pure red and white both have B=100 in HSB, but white is perceptually much lighter. |
| "Color science is for scientists, not designers" | Understanding color science lets you work faster (hex navigation), more accurately (correct color models), and more inclusively (colorblindness). Many professional designers don't know this material but should. |

---

## TRIGGERS

Invoke this chapter's knowledge when:
- [ ] Developer is choosing or adjusting colors for a web UI, app, or data visualization
- [ ] Colors appear to differ between screen and printed output
- [ ] A data visualization has categories that seem visually unequal or a quantitative scale that doesn't read intuitively
- [ ] Developer asks "what hex color is close to X?" or "how do I make this a little more red/blue/green?"
- [ ] Colorblindness concerns are raised or accessibility audit is performed
- [ ] Web image colors don't match surrounding CSS background
- [ ] Designer asks why business card colors don't match the website
- [ ] Developer says "I don't understand hexadecimal colors"
- [ ] Creating programmatic or data-driven color palettes

Prerequisite state:
- Basic familiarity with CSS color values (hex or rgb notation)
- Understanding that design involves choosing colors (no specific prior design knowledge required)

---

## PRODUCES

After applying this knowledge:
- State: Developer understands the physics and perception of color, can systematically navigate hex color space, and knows which color models to use for which output media
- Artifacts: Colorblind-accessible UI with redundant cues; perceptually uniform data visualization palette; ICC-managed cross-media color workflow; systematic hex color values in CSS
- Understanding: Developer knows why colors don't match across media, how to choose perceptually accurate palettes, how to navigate hex intuitively, and how to accommodate colorblindness

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Need to choose harmonious or emotionally resonant color combinations | Color theory and color harmony knowledge (Chapter 9 content) | This chapter covers the science of color; Chapter 9 covers how the visual system's color processing creates emotional responses and harmony rules |
| Need to create a complete brand color palette with meaning | Cultural and psychological color association knowledge | Color meanings vary across cultures and this chapter does not cover emotional/cultural connotations |
| Need to apply color within a layout or typographic hierarchy | Layout, proportion, and typography knowledge | Color choices must work within the broader visual hierarchy and compositional structure |
| Need to create accessible designs beyond color | Full accessibility/WCAG compliance knowledge | This chapter covers colorblindness specifically, but broader accessibility (contrast ratios, screen readers) requires additional guidance |

---

## CSO KEYWORDS

color science, visible spectrum, electromagnetic radiation, metamerism, color constancy, afterimages, cones, rods, trichromatic color theory, color opponent theory, ganglion cells, S cones, M cones, L cones, colorblindness, red-green colorblindness, dichromacy, deuteranopia, protanopia, hue, value, chroma, Munsell color system, Farbenkugel, HSB, HSV, hue saturation brightness, Lab color model, CIELAB, perceptual lightness, perceptual uniformity, color models, data-driven graphics, qualitative data, quantitative data, sequential palette, diverging palette, Colorbrewer, hexadecimal color, RGB, additive color model, subtractive color model, CMYK, color gamut, ICC profiles, International Color Consortium, profile connection space, sRGB, Adobe RGB, color management, soft-proofing, spectrophotometer, PANTONE, spot colors, HSL, hue saturation lightness, CSS3 color, color wheel, dominant wavelength, sub-pixels, hex navigation, cross-media color, out of gamut
