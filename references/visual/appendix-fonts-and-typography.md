# Appendixes A & B: Choosing and Pairing Fonts / Typographic Etiquette
**Book:** Design for Hackers (David Kadavy)
**Part:** Part V: Appendixes
**Core Concept:** A practical reference for selecting, pairing, and properly using typefaces -- covering classification systems, letter structure analysis, font pairing principles, and the typographic rules and conventions that separate amateur designs from professional ones.

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

> "A *typeface* (or *type* or *face*) is how the type looks, and a *font* is a file containing the typeface."
> -- Appendix A, Design for Hackers

> "*Texture* (sometimes called *color*) is one way in which typefaces differ from one another. It also influences the compatibility of two fonts. *Texture* is the overall look of a body of text in a given typeface."
> -- Appendix A, Design for Hackers

> "*Character width* is pretty much what it sounds like: the width of the actual letters in the typeface."
> -- Appendix A, Design for Hackers

> "*Letterfit* [refers to] how the forms of the letters relate to each other in the pursuit of an even texture."
> -- Appendix A, Design for Hackers

> "*Leading* gets its name from the time when printers were setting type by hand: They placed strips of lead between the lines of type to regulate the vertical space between them. Leading is also known in CSS as the `line-height` property."
> -- Appendix A, Design for Hackers

> "*Widows* -- mostly irrelevant on the web -- are single words left over from a previous paragraph that appear at the top of a page or column."
> -- Appendix B, Design for Hackers

> "*Orphans* are single words -- or a couple of short words -- that end the last line of a paragraph."
> -- Appendix B, Design for Hackers

> "*Smart quotes* [are true quotation marks], and the opening and closing quotation marks are different."
> -- Appendix B, Design for Hackers

> "*Counters* [are the] negative spaces within letters."
> -- Appendix A, Design for Hackers

> "*Ligatures* [are character pairs where fonts] actually meld the letterforms together."
> -- Appendix B, Design for Hackers

---

## DETECTION CHECKLIST

This reference applies whenever type choices feel amateur despite reasonable layout and color -- a
font pairing that lands in the uncanny valley between harmony and contrast, uneven texture when
squinting at a block of text, or straight quotes and double hyphens standing in for proper
typographic characters. It also applies to the CSS/HTML tells behind those symptoms: more than two
`font-family` declarations for text content, `text-align: justify` with no hyphenation support, or a
Faux Bold button used in place of an authentic bold font weight. The developer statement that gives
it away: "I just picked two fonts that looked nice separately" -- pairing by individual appeal rather
than by structural compatibility.

---

## DESIGN REVIEW CRITERIA

Must pass: no fake bold or fake italic -- a software outline used in place of an authentic bold
weight fails whenever it produces thick, clunky serifs and closed-up counters, and a software-slanted
italic fails whenever it is simply a tilted roman face rather than a custom-drawn italic or oblique;
no type distortion, which fails whenever letterforms are horizontally stretched or compressed and
their stroke modulation is disrupted; font pairing uses compatible letter structures, which fails
when two fonts with conflicting structures (e.g., humanist paired with realist) are combined without
deliberate extreme contrast; and no more than two font families for text content, following the
serif + sans-serif rule, which fails when three or more families appear in body/heading text or when
two serifs (or two sans-serifs) are paired without justification.

See `checklists.md` §1 for the full Should-Pass/Nice-to-Have tri-tier checklist across all chapters.

---

## RED FLAGS

**Last reviewed: 2026-07**

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Fake bold (Faux Bold in Photoshop or missing bold font weight) | Critical | Artificially outlined letterforms that close up counters and destroy subtlety | Load the actual bold weight of the font; use `font-weight: bold` in CSS which auto-selects correct file |
| Fake italic (software-slanted text) | Critical | Distorted letterforms that lack the craft of true italic/oblique designs | Load the actual italic font file; use `font-style: italic` in CSS |
| Stretched or compressed type | Critical | Disrupted stroke modulation and destroyed letterforms | Use a condensed/extended variant that was specifically designed (e.g., Helvetica Condensed instead of squished Helvetica) |
| Font pairing with mismatched letter structures | High | Neither harmonious nor contrasting -- the "uncanny valley" of font pairing | Match letter structures (both humanist, both geometric, etc.) OR go to deliberate extreme contrast |

See `checklists.md` §2 Red Flags Master Table for the complete list across all chapters.

---

## IMPLEMENTATION CHECKLIST

Before starting, name the design's purpose and mood, determine the target medium (web, print,
mobile -- this flips the serif/sans-serif default), and decide how many font roles are needed (body
only, body + headings, or body + headings + accent). While selecting fonts, choose a primary body
font appropriate to the medium, identify its letter structure (humanist, geometric, or realist), and
either match that structure in a second font for harmony or commit to deliberate extreme contrast --
verifying with the lowercase `n` test that texture, darkness, and character width stay compatible,
and settling on one serif paired with one sans-serif as the default pairing rule. While setting body
copy, use 1.2-1.4em leading (1.0-1.1em for bulleted lists), ragged-right alignment on the web, and
either paragraph indentation (~1em) or paragraph spacing (~0.8em) but never both, plus proper
typographic characters throughout (smart quotes, real dashes, prime marks for measurements). After,
run the squint test for even texture, confirm every bold/italic/small-caps instance is an authentic
font file rather than a software fake, and check that the pairing reads as either clear harmony or
deliberate contrast rather than an awkward middle ground.

See `checklists.md` §5 Implementation Quick-Start for the full step-by-step sequence.

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: Uncanny Valley Pairing to Harmonious Pairing

**Problem (Before):**
Two fonts that are somewhat similar but not similar enough -- for example, Baskerville (realist-leaning serif) paired with Gill Sans (humanist sans-serif). They share some qualities but their letter structures conflict, creating visual tension that feels "off" without being dramatically different enough to read as intentional contrast.

**Solution (After):**
Match letter structures: pair Adobe Garamond (humanist serif) with Gill Sans (humanist sans-serif). Both share humanist letter structures influenced by scripted letterforms. Alternatively, go to extreme contrast: pair Bodoni Condensed Bold (geometric, high-contrast display) with Gill Sans Light (humanist body text) where the contrast is so deliberate it reads as a design choice.

**Key Change:** Font pairings must commit to either harmony (matching letter structures) or contrast (dramatically different) -- the middle ground is where pairings fail.

**Example from book:** Adobe Garamond + Gill Sans (harmony, both humanist) vs. Baskerville + Gill Sans (awkward middle ground) vs. Bodoni Condensed Bold + Gill Sans Light (deliberate contrast).

---

### Pattern 2: Fake Font Variants to Authentic Typography

**Problem (Before):**
Designer uses Photoshop's Faux Bold button or software-generated italic, creating artificially outlined bold text with closed-up counters and slanted italic with distorted letterforms. Small caps are generated by shrinking capital letters, resulting in thin, emaciated-looking caps that don't match the stroke weight of full capitals.

**Solution (After):**
Load authentic bold, italic, and small-caps font files. In CSS, `font-weight: bold` and `font-style: italic` auto-select correct files. For small caps, use `@font-face` to load a true small-caps variant, or apply the CSS hack: `font-variant: small-caps; font-weight: normal; letter-spacing: .05em` with bold wrapping for acronyms.

**Key Change:** Use font files specifically designed for each variant rather than letting software algorithmically generate them. Type designers spend enormous effort crafting each weight and style.

**Example from book:** "Real" Georgia Bold vs. "Fake" Georgia Bold; "Real" Georgia Italic vs. "Fake" Georgia Italic; Simulated small caps vs. Authentic small caps.

---

### Pattern 3: Justified Web Text to Readable Ragged Right

**Problem (Before):**
Developer sets `text-align: justify` on body copy to make text blocks look "neat" with aligned edges. Without hyphenation support, this creates rivers of white space, lines with abnormally loose or tight letter/word spacing, and an uneven texture throughout the text block.

**Solution (After):**
Use `text-align: left` (ragged right / flush left). The natural variation in line length actually improves readability because readers can more easily distinguish where one line ends and the next begins. The resulting texture is much more even.

**Key Change:** Sacrifice the visually "neat" right edge for dramatically better texture evenness and readability. Justified text requires hyphenation control that CSS does not yet reliably provide.

**Example from book:** Figure B-14 comparing ragged right text (even texture) vs. justified text without hyphenation (riddled with holes).

---

### Pattern 4: Same-Designer Shortcut for Font Pairing

**Problem (Before):**
Developer spends hours browsing thousands of fonts trying to find a pairing that works, testing random combinations with mixed results.

**Solution (After):**
Choose fonts by the same type designer. Designers have consistent philosophies about letterforms, so their fonts naturally pair well. For example, if using Gill Sans, search for other Eric Gill typefaces -- Joanna (a serif face) pairs beautifully because both share Eric Gill's humanist sensibilities.

**Key Change:** Instead of comparing individual font attributes, leverage the type designer's consistent philosophy as a shortcut to guaranteed compatibility.

**Example from book:** Gill Sans + Joanna (both by Eric Gill) pair well due to shared humanist letter structure and similar design subtleties.

---

## CORE PRINCIPLES

Typography is fundamentally about communication. Every typographic decision -- from font selection to dash usage -- should serve the goal of clear, smooth information delivery. Font pairings succeed through either deliberate harmony (matching letter structures, texture, and character width) or deliberate contrast (dramatically different attributes), but fail in the ambiguous middle ground. Respecting the craftsmanship of type designers means using authentic font variants and following established typographic conventions rather than relying on software shortcuts.

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Fake bold/italic/small caps | Critical | Destroys letterform subtlety and reduces legibility |
| Type distortion (stretch/compress) | Critical | Ruins carefully designed stroke modulation and form |
| Incompatible font pairing (uncanny valley) | High | Creates visual tension that undermines professionalism |

Reviewing and applying draw on the same criteria in both directions: identify letter structure
before pairing, load authentic weights and styles rather than faking them, and treat texture
evenness as the final check either way.

---

## THIS VS THAT

| Confusion Point | This Chapter Says | Not This |
|-----------------|-------------------|----------|
| Typeface vs. font | A typeface is how type looks; a font is the file containing it. Use "font" casually; it's not grossly inaccurate | They are interchangeable terms with no distinction |
| Serif for web body text | Sans-serif is generally more readable on screen for body copy; serif works for headers/titles on web | Serif is always more readable (this is true for print, not screen) |
| Font pairing principle | Match letter structures for harmony OR use extreme contrast; avoid the ambiguous middle | Just pick two fonts that individually look nice |
| Justified text on web | Avoid it -- CSS lacks hyphenation control, creating rivers and uneven texture | Justified text always looks more professional and "finished" |
| Two spaces after periods | One space. The two-space convention is a leftover from typewriters and the Victorian era | Two spaces are needed for readability after a period |
| Mixing serif and sans-serif | The rule: one serif + one sans-serif. Two of the same classification is usually confusing | Any two fonts that "look nice" can be paired regardless of classification |
| Font size perception | Two fonts at the same point size can look very different sizes due to different x-heights | Point size determines how large a font appears |
| Small caps | True small caps are custom-drawn to match stroke weight of capitals; CSS fake small caps are just shrunken capitals | Small caps are just smaller versions of capital letters |
| Condensed/compressed type | Use a font variant specifically designed to be condensed (e.g., Helvetica Condensed) | You can horizontally compress any font to make it narrower |
| En dash vs. em dash usage | Prefer spaced en dash (following Bringhurst's Elements of Typographic Style) for less visual disruption | Em dash with no spaces is always the correct choice |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Chapter Recommends | When |
|----------------|---------|-------------------|------|
| Serif vs. sans-serif for body | Serif, Sans-serif | Sans-serif for web; Serif for print | Web: sans-serif more readable on screen. Print: serif more readable on paper |
| Body + heading pairing | One font family, Two font families | Start with one; add second only if needed for dynamism | One font with weight/size variation often suffices; second font adds sophistication |
| Pairing strategy | Harmony, Contrast | Either works; avoid the middle ground | Harmony: match letter structures. Contrast: use dramatically different fonts |
| Header font for web (two-font design) | Serif for headers, Sans-serif for headers | Serif headers + sans-serif body is common on web | The nuanced serif at large sizes + readable sans-serif body at small sizes |
| Header font for print (two-font design) | Serif for headers, Sans-serif for headers | Sans-serif headers + serif body is common in print | Sans-serif titles + highly readable serif body copy |
| Body text alignment (web) | Justified, Ragged right, Centered | Ragged right (flush left) | Until CSS has reliable hyphenation support |
| Paragraph separation | Indent, Spacing, Both | Either indent (~1em/12px) OR spacing (~0.8em), never both | Indent: more traditional/compact. Spacing: more modern/airy |
| Dash style | Em dash no spaces, Spaced en dash, Double hyphen | Spaced en dash (Bringhurst recommendation) | Less visual disruption, prevents long character bunching at line breaks |
| Ligatures | Apply on content layer, Use CSS font-variant-ligatures, Skip | Use CSS `font-variant-ligatures` for headers; acceptable to skip in body | Headers/titles: more visible, worth the effort. Body: browser support issues make it acceptable to skip |
| Drop caps | CSS implementation, Skip | Use `first-letter` pseudo-class; hang edges into margins | Opening paragraphs of sections/articles for visual anchoring |
| Small caps for acronyms | CSS font-variant, @font-face with true SC font, Skip | @font-face with true small caps; or CSS hack with bold + letter-spacing | When acronyms like HTML disrupt text flow; economics may not justify the effort |
| Which go-to fonts to use | See Table A-1 | Adobe Garamond, Palatino, Baskerville, Georgia, Bodoni, Rockwell, Museo Slab (serif); Arial, Futura, Gill Sans, Helvetica, Lucida Grande, Tahoma, Trebuchet MS, Verdana (sans-serif) | These 15 fonts cover virtually any design situation |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| The `n` test | Reveals letter structure compatibility between two fonts | Before committing to a font pairing | Compare the lowercase `n` of both fonts at similar x-height; humanist `n` curves organically from stem, geometric `n` has symmetrical arch, realist is in between |
| Squint test for texture | Reveals whether a text block has even texture | After setting body copy | Squint at a block of text; no characters should stick out as too heavy or too light |
| Same-designer shortcut | Guarantees font pairing compatibility | When searching for a second font to pair | Find who designed your primary font; choose another font by the same designer (e.g., Gill Sans + Joanna, both by Eric Gill) |
| Texture darkness check | Compares visual weight of two font textures | When evaluating font pairing compatibility | Set sample text in both fonts; check if one produces noticeably darker/lighter text blocks |
| Texture smoothness check | Compares smooth vs. rough texture quality | When evaluating font pairing compatibility | High stroke modulation = smooth texture (like chalkboard); low modulation + tight letterfit = rough texture (like pumice rock) |
| Character width comparison | Checks if two fonts have compatible letter widths | When evaluating font pairing compatibility | Compare lowercase `n` width of both fonts; mismatched widths create visual conflict (e.g., Verdana vs. Times New Roman clash; Adobe Garamond + Gill Sans match) |
| Hanging punctuation | Makes text block edges look crisper | On blockquotes and any text with leading punctuation | Hang quotation marks and other punctuation into the margin so the text edge aligns cleanly |
| CSS drop cap | Provides visual anchor for opening paragraphs | At the start of articles, chapters, sections | Use `p.opening:first-letter` with `display: block; float: left; font-size: 114px; line-height: 80px; margin: 8px 5px 0 -6px; padding: 0;` -- hang edges into margins |
| Fake small-caps CSS hack | More convincing small caps without true SC font | When acronyms disrupt text flow but no true SC font is available | Apply `font-variant: small-caps; font-weight: normal; letter-spacing: .05em` and wrap the actual letters in `<span>` tags with `font-weight: bold` |
| `&nbsp;` orphan prevention | Prevents orphans (single words on last line) | On all paragraphs in refined typography | Place `&nbsp;` before the final word of each paragraph |

---

## COMMON MISTAKES

**Last reviewed: 2026-07**

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Picking fonts by decorative classification alone | Popular classification systems (old style, transitional, modern, etc.) describe decorative traits but not personality or structural compatibility | Focus on letter structure (humanist, geometric, realist) for understanding mood and pairing compatibility |
| Pairing two fonts that are "sort of similar" | Designers intuitively seek similarity but stop short of true structural harmony | Commit fully to harmony (matching letter structures) or contrast (dramatically different); avoid the uncanny valley |
| Using Faux Bold in Photoshop/design tools | The button is right there and seems to work | Always load and use the authentic bold weight of the font |
| Justifying web body text | It looks "neater" with aligned edges | Use ragged right (flush left); CSS lacks hyphenation support, creating rivers |
| Using straight quotes from keyboard | Keyboard produces `"` and `'` by default | Use smart quotes: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;` |

See `checklists.md` §4 Common Mistakes Master Table for the complete list across all chapters.
