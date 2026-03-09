# Appendixes A & B: Choosing and Pairing Fonts / Typographic Etiquette
**Book:** Design for Hackers (David Kadavy)
**Part:** Part V: Appendixes
**Core Concept:** A practical reference for selecting, pairing, and properly using typefaces -- covering classification systems, letter structure analysis, font pairing principles, and the typographic rules and conventions that separate amateur designs from professional ones.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are selecting fonts for a design (web, mobile, or print)
- [ ] You need to pair two or more typefaces together
- [ ] You are setting body copy, headings, or any text-based UI element

**Do NOT apply when ANY are true:**
- [ ] You are working exclusively with iconography or non-text visual elements
- [ ] The project uses a locked-down design system with pre-selected fonts that cannot be changed
- [ ] You are working on a purely decorative/artistic piece where readability is intentionally secondary

---

## PROBLEM --> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| Font pairing looks "off" but can't articulate why | Yes | Check letter structure compatibility (humanist, geometric, realist) and texture matching |
| Using more than two font families | Partial | The rule is max two (one serif, one sans-serif), but extreme contrast pairings can be exceptions |
| Body text feels hard to read on screen | Yes | Check font size (x-height), leading (line-height 1.2-1.4em), and whether font was designed for screen |
| Type looks distorted or "cheap" | Yes | Check for fake bold, fake italic, fake small caps, or stretched/compressed type |
| Justified text has uneven spacing/holes | Yes | Avoid justified text on web; use ragged right (flush left) instead |
| Straight quotes and double-hyphens in text | Yes | Replace with smart quotes, proper em/en dashes, and correct prime marks |
| Need to choose between serif and sans-serif | Yes | Consider medium (print favors serif for body; web favors sans-serif for body) |
| Color palette or layout composition issues | No | Use color theory or layout/proportion knowledge instead |
| Logo or brand mark design | No | Logo typeface selection follows different rules; logos often intentionally break from body fonts |

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

Signs this chapter's knowledge applies:

### Visual Symptoms
- [ ] Font pairing looks awkward -- neither harmonious nor contrasting, but somewhere in between
- [ ] Body text has uneven texture when squinting at a block of text
- [ ] Two fonts set at the same point size appear drastically different in visual size
- [ ] Text looks "cheap" or "amateur" despite reasonable layout and color choices
- [ ] Justified text has visible rivers of white space running through it
- [ ] Bold or italic text looks clunky, with closed-up counters or distorted letterforms
- [ ] Small caps look emaciated compared to surrounding capital letters
- [ ] Straight/dagger quotation marks instead of curly smart quotes
- [ ] Double hyphens (--) used instead of proper em or en dashes
- [ ] Textures or images placed inside letterforms making them illegible

### CSS/HTML Patterns to Look For
- [ ] More than 2 `font-family` declarations for text content (excluding code)
- [ ] Two serif fonts or two sans-serif fonts used for different text roles
- [ ] `text-align: justify` without hyphenation support
- [ ] Faux Bold button used in Photoshop instead of actual bold font weight
- [ ] `font-stretch` property used to compress or expand type
- [ ] `font-variant: small-caps` without an authentic small-caps font loaded
- [ ] Straight `"` and `'` characters instead of `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`
- [ ] Double hyphens `--` instead of `&ndash;` or `&mdash;`
- [ ] Two spaces after periods
- [ ] Missing `line-height` or value outside 1.2-1.4em range for body copy
- [ ] Both paragraph indentation AND paragraph spacing used simultaneously

### Developer Statements That Trigger This
- "I just picked two fonts that looked nice separately"
- "I'm not sure which fonts go together"
- "The text looks fine but something about it feels amateur"
- "Should I use serif or sans-serif?"
- "The bold/italic looks wrong but I don't know why"
- "How do I make justified text look good?"
- "Should I use one space or two after a period?"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] No fake bold (artificially bolded via software outline) --> Fail if: Bold text has thick, clunky serifs and closed-up counters compared to authentic bold weight
- [ ] No fake italic (artificially slanted via software) --> Fail if: Italic text is simply a slanted version of the roman face rather than a custom-drawn italic or oblique
- [ ] No type distortion (stretching/compressing) --> Fail if: Letterforms appear horizontally stretched or compressed, disrupting stroke modulation
- [ ] Font pairing uses compatible letter structures --> Fail if: Two fonts with conflicting letter structures (e.g., humanist paired with realist) without deliberate extreme contrast
- [ ] Maximum two font families for text content --> Fail if: Three or more distinct font families used for body/heading text (logos and code fonts excluded)
- [ ] Serif + sans-serif pairing rule followed --> Fail if: Two different serif fonts or two different sans-serif fonts paired for body/heading roles without clear justification

### Should Pass (Important)
- [ ] Smart/curly quotes used instead of straight quotes --> Warning if: Straight `"` or `'` used in running text
- [ ] Proper dashes used --> Warning if: Double hyphens `--` used instead of en dash or em dash
- [ ] One space after periods, not two --> Warning if: Double spaces after sentence-ending periods
- [ ] Body text uses ragged right alignment on web --> Warning if: `text-align: justify` used without hyphenation support
- [ ] Leading/line-height between 1.2em and 1.4em for body copy --> Warning if: Line-height outside this range for paragraph text
- [ ] Paragraph changes indicated by EITHER indentation OR spacing, not both --> Warning if: Both `text-indent` and `margin-bottom` used on paragraphs

### Nice to Have
- [ ] Ligatures enabled for display/heading text --> Suggestion: Use `font-variant-ligatures` CSS property for large titles
- [ ] Hanging punctuation on blockquotes --> Suggestion: Hang quotation marks into the margin for a crisper text-block edge
- [ ] Drop caps hung into margins rather than constrained within text block --> Suggestion: Compensate for negative spaces by hanging cap edges into margins
- [ ] Authentic small caps used for acronyms --> Suggestion: Use `@font-face` with a true small-caps font variant
- [ ] Prime marks used for feet/inches instead of smart quotes --> Suggestion: Use `&prime;` and `&Prime;` for measurements

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Fake bold (Faux Bold in Photoshop or missing bold font weight) | Critical | Artificially outlined letterforms that close up counters and destroy subtlety | Load the actual bold weight of the font; use `font-weight: bold` in CSS which auto-selects correct file |
| Fake italic (software-slanted text) | Critical | Distorted letterforms that lack the craft of true italic/oblique designs | Load the actual italic font file; use `font-style: italic` in CSS |
| Stretched or compressed type | Critical | Disrupted stroke modulation and destroyed letterforms | Use a condensed/extended variant that was specifically designed (e.g., Helvetica Condensed instead of squished Helvetica) |
| Textures/images placed inside letterforms | Critical | Letterform edges compete with texture/color changes, rendering text illegible | Place text over solid or low-contrast backgrounds; use outline for busy backgrounds |
| Two fonts of same classification paired (e.g., two serifs) | High | Visual confusion without enough contrast to justify the added complexity | Replace one with the complementary classification (serif + sans-serif) |
| Font pairing with mismatched letter structures | High | Neither harmonious nor contrasting -- the "uncanny valley" of font pairing | Match letter structures (both humanist, both geometric, etc.) OR go to deliberate extreme contrast |
| Fonts with incompatible character widths | High | Visual conflict even when letter structures match | Compare the lowercase `n` of both fonts; ensure character widths are similar |
| Fonts with incompatible textures (darkness/smoothness mismatch) | Medium | Text blocks look inconsistent when both fonts are viewed together | Match texture darkness and smoothness/roughness between paired fonts |
| Justified text without hyphenation on web | Medium | Rivers of white space, uneven letter/word spacing, inconsistent texture | Use `text-align: left` (ragged right) instead |
| Both paragraph indent AND paragraph spacing used | Medium | Overkill creates awkward irregular chunks of white space | Choose one method: indent (~1em) OR spacing (~0.8em), never both |
| Outline on type that straddles the letterform edge | Medium | Outline intrudes on letterforms, reducing legibility | Place outlines outside the letterforms only |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify the purpose and mood of the design (friendly, serious, sophisticated, modern, classic)
- [ ] Determine target medium (web, print, mobile) -- this affects serif vs. sans-serif defaults
- [ ] Decide how many font roles you need (body only? body + headings? body + headings + accent?)

### During Design -- Font Selection
- [ ] Step 1: Choose a primary body text font appropriate to your medium
  - Verify: For web, sans-serif fonts are generally more readable at body sizes; for print, serif faces are preferred
- [ ] Step 2: Identify the letter structure of your primary font (humanist, geometric, or realist)
  - Verify: Compare the lowercase `n` -- humanist has organic shoulder curve, geometric has symmetrical arch, realist is in between
- [ ] Step 3: If pairing a second font, match letter structures for harmony OR choose extreme contrast
  - Verify: Compare the `n` of both fonts side by side; they should share the same structural philosophy OR be dramatically different
- [ ] Step 4: Verify texture compatibility -- check darkness and smoothness match
  - Verify: Squint at blocks of both fonts; they should have similar overall darkness and similar smooth/rough character
- [ ] Step 5: Verify character width compatibility
  - Verify: Compare the width of the lowercase `n` in both fonts at the same x-height
- [ ] Step 6: Pair one serif with one sans-serif (the rule), or use deliberate extreme contrast as the exception
  - Verify: You have at most two font families; they are from different classifications

### During Design -- Body Copy Settings
- [ ] Step 7: Set line-height (leading) to 1.2-1.4em for body copy (1.0-1.1em for bulleted lists)
  - Verify: Text block has even, readable texture when viewed as a whole
- [ ] Step 8: Set text alignment to ragged right (flush left) for web
  - Verify: No `text-align: justify` unless hyphenation is supported
- [ ] Step 9: Use either paragraph indentation (~1em) OR paragraph spacing (~0.8em), not both
  - Verify: First paragraph of a section has no indent; subsequent paragraphs use chosen method consistently
- [ ] Step 10: Use proper typographic characters -- smart quotes, proper dashes, prime marks
  - Verify: No straight quotes, no double hyphens, no keyboard `'` for apostrophes in running text

### After Design
- [ ] Squint test: Does the body text have an even texture throughout?
- [ ] All bold and italic text uses authentic font weights (not faux bold/italic)?
- [ ] Font pairing creates either clear harmony or deliberate contrast, not an awkward middle ground?
- [ ] No type has been distorted (stretched, compressed, outlined intrusively, or textured)?
- [ ] Widows and orphans minimized (use `&nbsp;` before final word of paragraphs)?
- [ ] Ligatures considered for large display text (titles, headers)?

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

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] Font pairing uses compatible letter structures (both humanist, both geometric, both realist) or deliberate extreme contrast
- [ ] No more than two font families for text content (one serif, one sans-serif)
- [ ] All bold, italic, and small-caps text uses authentic font variants, not software-generated fakes
- [ ] No type has been stretched, compressed, or distorted
- [ ] Body text has even texture (squint test)
- [ ] Proper typographic characters used (smart quotes, proper dashes, correct prime marks)
- [ ] Body copy line-height between 1.2-1.4em
- [ ] Web body text uses ragged right alignment (not justified without hyphenation)
- [ ] Paragraphs use EITHER indent OR spacing, not both
- [ ] No textures or images placed inside letterforms

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| Fake bold/italic/small caps | Critical | Destroys letterform subtlety and reduces legibility |
| Type distortion (stretch/compress) | Critical | Ruins carefully designed stroke modulation and form |
| Textures/images inside type | Critical | Makes letterforms illegible |
| Incompatible font pairing (uncanny valley) | High | Creates visual tension that undermines professionalism |
| Wrong classification pairing (two serifs/two sans-serifs) | High | Confusing and doesn't justify added complexity |
| Justified web text without hyphenation | Medium | Creates rivers and uneven texture |
| Straight quotes/wrong dashes | Medium | Signals amateur typography to trained eyes |
| Double spaces after periods | Low | Outdated typewriter convention |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Select body font appropriate to medium (sans-serif for web, serif for print as defaults)
- [ ] Identify letter structure category of chosen font (humanist, geometric, realist)
- [ ] Pair second font from same structure category (harmony) or with extreme contrast
- [ ] Verify texture, character width, and darkness compatibility using the `n` test
- [ ] Load authentic font files for all weights and styles needed
- [ ] Set leading to 1.2-1.4em for body, 1.0-1.1em for lists
- [ ] Use ragged right for web body text
- [ ] Implement proper typographic characters throughout

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

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Picking fonts by decorative classification alone | Popular classification systems (old style, transitional, modern, etc.) describe decorative traits but not personality or structural compatibility | Focus on letter structure (humanist, geometric, realist) for understanding mood and pairing compatibility |
| Pairing two fonts that are "sort of similar" | Designers intuitively seek similarity but stop short of true structural harmony | Commit fully to harmony (matching letter structures) or contrast (dramatically different); avoid the uncanny valley |
| Using Faux Bold in Photoshop/design tools | The button is right there and seems to work | Always load and use the authentic bold weight of the font |
| Using software-generated italic | Desktop publishing programs offer one-click italic that just slants the font | Load the authentic italic (or oblique) version of the font |
| Justifying web body text | It looks "neater" with aligned edges | Use ragged right (flush left); CSS lacks hyphenation support, creating rivers |
| Using two spaces after periods | Learned in typing class; feels ingrained | One space. The extra space pokes holes in the text block and interrupts reading flow |
| Using straight quotes from keyboard | Keyboard produces `"` and `'` by default | Use smart quotes: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;` |
| Using `"` for feet/inches | Looks like the right character | Use prime `&prime;` for feet and double prime `&Prime;` for inches |
| Using double hyphens for dashes | Typewriter convention carried forward | Use spaced en dash `&ndash;` (recommended) or em dash `&mdash;` |
| Both indenting AND spacing paragraphs | "More is better" instinct for separating paragraphs | Choose ONE: indent (~1em) OR spacing (~0.8em), never both |
| Indenting the first paragraph of a section | Treating all paragraphs the same | Don't indent the opening paragraph of a section; it's the first, so no separation needed |
| Stretching/compressing type to fit a space | Trying to make text fit a specific area | Use a font variant specifically designed for that width (e.g., Helvetica Condensed) |
| Placing textures/images inside letterforms | Photoshop filters make it easy; seems creative | Almost always a bad idea; letterform edges compete with texture edges |
| Outline on type that straddles letterform edge | Default outline setting in vector programs | Choose the option that places the outline OUTSIDE the letterforms only |
| Using Times New Roman as a go-to serif | It's universally available and familiar | Use Georgia instead -- specifically designed for screen readability; Times New Roman was designed to save space in a newspaper |
| Using monospaced fonts (Courier New, Monaco) for body text | Available on every system | Monospaced fonts create uneven texture; reserve for code samples only |
| Ignoring x-height differences between paired fonts | Setting both at same point size and assuming they'll match | Check visual size at same point size; adjust sizes to achieve visual harmony based on x-height |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "Nobody notices the difference between real and fake bold" | Fake bold closes up counters and makes serifs clunky. Even non-designers sense something is "off" -- it reduces legibility and looks amateur |
| "Justified text looks more professional" | Without hyphenation, justified web text creates rivers of white space and uneven texture. Ragged right is actually more readable and produces better texture |
| "I need a huge font library to make good designs" | You can create beautiful, versatile designs with just the 15 fonts in Table A-1. Most expert printers historically worked with only a few go-to fonts |
| "Font pairing is just about what looks nice together" | It's about structural compatibility -- letter structure, texture, and character width. Understanding these attributes lets you make predictable, reliable pairing decisions |
| "Two spaces after a period aids readability" | One space is correct. A period, space, and capital letter already signal the end of a sentence. The extra space pokes holes in the text block |
| "Stretching type a little is fine if it fits the space" | Even slight distortion disrupts carefully designed stroke modulation. Always use a specifically designed condensed/extended variant |
| "Smart quotes vs. straight quotes doesn't matter on the web" | Smart quotes differentiate the nature of the information (opening vs. closing quotes, apostrophe vs. prime marks). They improve both clarity and professionalism |
| "I can use any two fonts as long as one is serif and one is sans-serif" | The serif + sans-serif rule is necessary but not sufficient. Letter structure, texture, and character width must also be compatible |
| "Ligatures are too obscure to matter" | In classic fonts like Adobe Garamond, missing ligatures for fi and fl create visible visual tension. They matter most in large display text |

---

## TRIGGERS

Invoke this chapter's knowledge when:
- [ ] Selecting fonts for a new design project (web, mobile, or print)
- [ ] Pairing two or more typefaces and evaluating whether they work together
- [ ] Developer says "these fonts don't look right together" or "something about the text feels off"
- [ ] Reviewing body copy settings (alignment, leading, paragraph spacing)
- [ ] Auditing typographic details (quotes, dashes, small caps, ligatures)
- [ ] Bold or italic text looks "wrong" or "cheap"
- [ ] Setting up a CSS type system or font stack
- [ ] Choosing between serif and sans-serif for a specific medium
- [ ] Encountering justified text with visible spacing problems on web
- [ ] During any design review where text is a significant component

Prerequisite state:
- Basic understanding of what serif and sans-serif fonts are
- Access to font files for the project (or willingness to select new ones)
- Understanding of CSS font properties (`font-family`, `font-weight`, `font-style`, `line-height`)

---

## PRODUCES

After applying this knowledge:
- State: Design has well-paired fonts with compatible letter structures, even body text texture, and professional typographic details
- Artifacts: Font selection rationale (classification + letter structure analysis), CSS font stack, typography style guide covering body copy settings, quote/dash/small-cap conventions
- Understanding: Developer knows how to evaluate font compatibility using the `n` test, understands the three letter structures (humanist, geometric, realist), can identify and avoid fake font variants, and follows professional typographic conventions

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Design needs color decisions alongside typography | Color theory and palette selection capability | Font choices interact with color contrast and hierarchy |
| Layout needs proportional system for spacing/sizing | Proportion and layout grid capability | Type scale, margins, and spacing should follow a proportional system |
| Need to establish visual hierarchy with the selected fonts | Typographic hierarchy and information design capability | Font selection is just the foundation; size, weight, and spacing create the actual hierarchy |
| Building a responsive design | Responsive typography capability | Font sizes, line-heights, and line lengths need to adapt across breakpoints |
| Setting up a full design system | Design system architecture capability | Font choices need to be codified into reusable tokens and components |

---

## CSO KEYWORDS

font pairing, typeface selection, serif vs sans-serif, letter structure, humanist typeface, geometric typeface, realist typeface, font classification, old style, transitional, modern, slab-serif, display typeface, texture typography, character width, letterfit, x-height, leading, line-height, font harmony, font contrast, fake bold, fake italic, fake small caps, type distortion, stretching type, smart quotes, curly quotes, en dash, em dash, ligatures, justified text, ragged right, flush left, widows, orphans, paragraph indentation, paragraph spacing, hanging punctuation, drop caps, font-variant-ligatures, font-variant small-caps, prime marks, typographic etiquette, Adobe Garamond, Palatino, Baskerville, Georgia, Bodoni, Rockwell, Museo Slab, Arial, Futura, Gill Sans, Helvetica, Lucida Grande, Tahoma, Trebuchet MS, Verdana, Eric Gill, Joanna, body copy, web typography, print typography, font size, point size, ascender, descender, counters, stroke modulation, monospaced fonts, Courier New, kerning, word spacing, letter spacing, CSS typography, font-weight, font-style, font-face, design for hackers
