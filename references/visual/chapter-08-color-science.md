# Color Science
**Book:** Design for Hackers (David Kadavy)
**Part:** Part III — Color
**Core Concept:** Color is electromagnetic radiation perceived by the human visual system; understanding the science of color perception, color models (RGB, HSB, Lab, HSL, CMYK), color gamuts, hexadecimal notation, and colorblindness enables developers to make informed, effective color decisions across media.

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

This chapter's knowledge applies whenever color decisions cross media, encode data, or serve as the
sole signal for meaning — printed output that doesn't match on-screen colors, a monochromatic
palette whose values blur together at the extremes, or red/green status indicators some users can't
distinguish. The tell in conversation: "why doesn't the printed logo match the website?" or "my data
visualization looks fine to me but some users complain" — color chosen by eye in one gamut or model
without accounting for how it translates to another, or to how roughly 10% of male users actually
perceive it.

---

## DESIGN REVIEW CRITERIA

**Must pass:** Color-dependent UI indicators also use shape, position, or text as a redundant cue
(fail if color is the only differentiator for critical information, which affects roughly 10% of
male users); data visualization uses perceptually uniform color differences (fail if qualitative
chart categories carry unequal perceptual weight, or a quantitative scale's perceived lightness is
non-monotonic); and web images that must match CSS background colors are saved without ICC profiles,
or in sRGB (fail if image colors visibly mismatch surrounding CSS colors in color-managed browsers).

See `checklists.md` §1 for the full Should-Pass/Nice-to-Have tri-tier checklist across all
chapters.

---

## RED FLAGS

**Last reviewed: 2026-07**

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Red and green used as sole differentiators for status (pass/fail, go/stop) | Critical | Inaccessible to ~10% of males with red-green colorblindness | Add redundant cues: icons, shapes, text labels, or position |
| HSB/HSL hue rotation used for quantitative data palette | High | Perceptual lightness varies wildly across hues; data will be misread | Use Lab-based color palette or Colorbrewer for perceptually uniform scales |
| Adobe RGB-profiled images placed on CSS-colored backgrounds on the web | High | Color-managed browsers (Safari, Firefox on Mac) will mismatch image and CSS colors | Save web images in sRGB without ICC profile, or strip the profile |

See `checklists.md` §2 Red Flags Master Table for the complete list across all chapters.

---

## IMPLEMENTATION CHECKLIST

Before starting, identify the target medium — screen, print, or cross-media — and whether data
visualization is involved, and if so whether the data is qualitative or quantitative. Determine
whether colorblindness accessibility is required (it almost always is), and choose the color model
that fits the task: hex/RGB for web, CMYK for print, HSB/HSL for ideation, Lab for perceptual
accuracy. While designing, select colors with perceptually uniform lightness for any data
visualization, verifying via each category's Lab L value or using Colorbrewer directly, and convert
cross-media colors through ICC profiles, checking for out-of-gamut warnings along the way. Save web
images in sRGB without an attached ICC profile so they match surrounding CSS colors, test for
colorblindness with a simulator or Photoshop's proof setting, and when adjusting hex values work
from RGB channel understanding rather than random trial-and-error. Afterward, confirm the
colorblindness simulation passes for deuteranopia and protanopia, soft-proof any print output
against the target printer's ICC profile, and verify the data visualization's colors remain
perceptually distinguishable and the web graphics match CSS colors in both color-managed and
non-color-managed browsers.

See `checklists.md` §5 Implementation Quick-Start for the full step-by-step sequence.

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

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Color-only status indicators with no redundant cues | Critical | Excludes ~10% of male users who are red-green colorblind |
| Perceptually misleading data visualization colors | High | Misrepresents data, leading to incorrect user conclusions |
| ICC profile mismatch causing web image/CSS color discrepancy | High | Visible inconsistency in color-managed browsers (Safari, Firefox on Mac) |

Reviewing and applying draw on the same criteria in both directions: pair color with a redundant
cue whenever it carries meaning, choose perceptually uniform palettes for data, and route
cross-media color through ICC profiles rather than assuming numeric values translate.

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

**Last reviewed: 2026-07**

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Using HSB/HSL hue rotation for data visualization palettes | HSB/HSL pickers make it easy to select "different" colors by moving the hue slider | Use Lab-based selection or Colorbrewer to ensure perceptual uniformity |
| Using only color to communicate meaning (red = bad, green = good) | It seems culturally obvious and visually clean | Always add redundant cues: shapes, icons, text labels, positional encoding |
| Expecting printed colors to match screen colors | Colors look the same to the designer on screen | Understand RGB vs. CMYK gamut differences; use ICC profiles and soft-proofing |
| Saving web images with Adobe RGB or other ICC profiles attached | Designer works in Adobe RGB for its wider gamut | Save web images in sRGB; strip ICC profiles from images that need to match CSS colors |
| Treating hex codes as opaque magic strings | Hex notation seems arbitrary without understanding base-16 and RGB channels | Learn that #RRGGBB maps to three 0-255 channels; practice the 0,3,6,9,C,F progression |

See `checklists.md` §4 Common Mistakes Master Table for the complete list across all chapters.
