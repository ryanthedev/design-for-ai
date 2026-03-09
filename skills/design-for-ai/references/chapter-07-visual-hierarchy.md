# Chapter 7: Enlivening Information: Establishing a Visual Hierarchy
**Book:** Design for Hackers (David Kadavy)
**Part:** Part II — Working with Type, Exploring Composition
**Core Concept:** Visual hierarchy is established by manipulating isolated visual factors — white space, type weight, type size, color, and visual ornamentation — to express the relative importance and conceptual relationships between pieces of information.

---

## DECISION GATE

**Apply this knowledge when ALL are true:**
- [ ] You are arranging multiple pieces of information in a layout (web page, app screen, dashboard, blog post)
- [ ] Different pieces of information have different levels of importance or different conceptual roles
- [ ] You need users to quickly parse what matters most and understand relationships between elements

**Do NOT apply when ANY are true:**
- [ ] The design contains only a single piece of information with no relational context
- [ ] The task is purely about color theory or color harmony (see Chapter 9 instead)
- [ ] The task is about geometric proportions/composition without information differentiation (see Chapters 5-6 instead)

---

## PROBLEM -> FIT TABLE

| Symptom/Situation | This Applies? | Why / Use Instead |
|-------------------|---------------|-------------------|
| All text on the page looks the same importance | Yes | Use white space, weight, size, color, and ornamentation to differentiate |
| Page feels cluttered despite having a grid | Yes | Likely overusing visual ornamentation (rules, borders); strip back and use subtler factors |
| Designer changed too many factors at once and result looks chaotic | Yes | Isolate factors — learn how each one (white space, weight, size, color, ornamentation) works independently first |
| Need to choose between two typefaces | Partial | This chapter covers using weight/size within a single typeface; for font pairing see Chapter 3 / Appendix B |
| Table data is hard to scan | Yes | Remove unnecessary rule lines; use alignment, white space, and minimal ornamentation instead |
| Choosing a color palette | No | Use Chapter 9 (color theory); this chapter only covers how color affects hierarchy |
| Layout proportions and grid setup | Partial | This chapter uses grids to manage white space, but grid fundamentals are in Chapters 5-6 |

---

## KEY DEFINITIONS

> "The term *hierarchy* implies that information has a linear progression of important to not important, but this isn't precisely true. The importance of a piece of information in an interface can change according to the use case."
> -- Chapter 7, Design for Hackers

> "Establishing a visual hierarchy is much more expressive and less scientific than this. Pieces of information have personalities and relationships with one another."
> -- Chapter 7, Design for Hackers

> "The term *white space* is usually used to describe any area that doesn't have information, or some other design element within it."
> -- Chapter 7, Design for Hackers

> "A piece of information with lots of white space around it will often look more important than other information. Two pieces of information that have very little white space between them will often appear to be related to one another."
> -- Chapter 7, Design for Hackers

> "The big secret is, some of the least obvious factors -- such as use of proportion in white space -- are the ones that have the most impact."
> -- Chapter 7, Design for Hackers

> "As Edward R. Tufte explained in his book *Envisioning Information*, attempting to further differentiate information this way is an example of the concept of 1 + 1 = 3."
> -- Chapter 7, Design for Hackers (on adding rule lines to tables that already have white space separation)

---

## DETECTION CHECKLIST

Signs this chapter's knowledge applies:

### Visual Symptoms
- [ ] Layout feels flat — everything appears to have equal importance
- [ ] Design looks cluttered despite having structured content
- [ ] Tables are boxed in with heavy rule lines on all sides
- [ ] Text elements are differentiated only by changing the typeface, not by weight/size/space
- [ ] White space appears random with no proportional relationship between gaps
- [ ] Too many visual factors changed at once (font + size + color + decoration simultaneously)

### CSS/HTML Patterns to Look For
- [ ] All text elements use the same `font-size` with no scale relationship
- [ ] Margins and paddings use arbitrary values with no proportional system
- [ ] Tables styled with `border` on every cell (`td { border: 1px solid }`)
- [ ] More than 2-3 `font-family` declarations used for differentiation
- [ ] No `line-height` adjustments for bolded body text (texture too heavy)
- [ ] No clear relationship between heading sizes (e.g., h1=18px, h2=16px — too subtle)

### Developer Statements That Trigger This
- "Everything on the page looks the same — I can't tell what's important"
- "I made the header bigger and bolder and added color and a background but it still looks wrong"
- "I don't know how much spacing to put between elements"
- "My table has borders on everything but it still looks messy"
- "The design works but it doesn't look clean"

---

## DESIGN REVIEW CRITERIA

### Must Pass (Critical)
- [ ] Clear visual distinction between primary content and secondary/metadata content --> Fail if: title, body, and metadata all appear at equal visual weight
- [ ] White space between elements follows a consistent proportional system --> Fail if: spacing between elements appears random or uses arbitrary pixel values
- [ ] Information that is conceptually related appears visually grouped --> Fail if: related items (e.g., author name and post title) are separated by large gaps while unrelated items are close

### Should Pass (Important)
- [ ] Type size changes are proportionally significant (not 13px vs 14px) --> Warning if: size differences between hierarchy levels are less than ~25% apart
- [ ] Visual ornamentation (rules, borders, icons) is used sparingly and purposefully --> Warning if: rule lines or borders are used where white space and alignment alone could differentiate
- [ ] Hierarchical factors are used in isolation before combining --> Warning if: every element differs from others in 3+ factors simultaneously (size + weight + color + decoration)

### Nice to Have
- [ ] Type sizes follow a proportional scale (e.g., 3:4 ratio scale like 5, 7, 9, 12, 16, 21, 28, 37, 50, 67) --> Suggestion: adopt a modular type scale for consistent, harmonious sizing
- [ ] Grid-based white space management using geometric relationships --> Suggestion: derive column divisions and spacing from the same proportional system as the canvas
- [ ] Typeface changes express conceptual differences (e.g., data metadata in sans-serif, content in serif) --> Suggestion: use typeface contrast to signal different *nature* of information, not just different rank

---

## RED FLAGS

| Flag | Severity | What It Indicates | Fix |
|------|----------|-------------------|-----|
| Every table cell has visible borders on all four sides | Critical | Tufte's "1+1=3" — rule lines add visual noise, not clarity | Remove borders; use alignment, white space, and optional alternating row highlights |
| All hierarchy established by changing typeface alone | High | Misses the most impactful factors (white space, weight, size) | Default to white space, then weight, then size before reaching for a new typeface |
| Spacing between all elements is identical | High | No grouping signal — related and unrelated items appear equally connected | Use proportional spacing: less space between related items, more between unrelated |
| Title differentiated only by making it 1-2px larger | Medium | Size change too subtle to register as hierarchical difference | Skip steps in your type scale; use at least 25-30% size difference or combine with weight |
| Heavy visual ornamentation to compensate for flat hierarchy | Medium | Decorating rather than designing; leaning on the "crutch" of ornamentation | Strip all ornamentation; establish hierarchy with white space and type first, then add ornamentation sparingly |
| Metadata (date, category, author) given same prominence as title | Medium | Hierarchy not expressing true content relationships | Push metadata to secondary role via smaller size, lighter weight, or positional grouping |

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Identify all distinct pieces of information in the layout (title, body, metadata, navigation, etc.)
- [ ] Determine the relative importance and conceptual relationships between those pieces
- [ ] Note which pieces are conceptually related (e.g., "the post is *by* the author," "the post is *filed under* the category")
- [ ] Choose a proportional system for your layout and type scale (e.g., 3:4 ratio)

### During Design
- [ ] Step 1: Start with a single typeface, single size, single weight — establish hierarchy using only white space and positioning
  - Verify: With all text the same font/size/weight, can you still tell which elements are more important based on space and placement?
- [ ] Step 2: Add type weight variations (bold for primary elements, regular for secondary)
  - Verify: Bold elements read as more important; if body text is bolded, increase `line-height` to lighten texture
- [ ] Step 3: Introduce type size changes using a proportional scale (skip steps for meaningful contrast)
  - Verify: Size differences between hierarchy levels are clearly perceptible (not 13px vs 14px, but 9pt vs 16pt)
- [ ] Step 4: Add color only where additional differentiation is needed
  - Verify: A bold, colored title still stands out from same-size gray body text; color contrasts are intentional
- [ ] Step 5: Add visual ornamentation (rules, blocks of color, icons) sparingly and only where other factors are insufficient
  - Verify: Every rule line or decorative element has a clear purpose; removing it would lose meaningful differentiation

### After Design
- [ ] Squint test: with the design blurred, can you still identify the primary, secondary, and tertiary content areas?
- [ ] Strip test: mentally remove each piece of ornamentation — does the hierarchy survive without it?
- [ ] Proportion audit: are spacing values, type sizes, and column widths derived from a consistent ratio?
- [ ] Relationship test: do visually grouped elements actually belong together conceptually?

---

## DESIGN TRANSFORMATION PATTERNS

### Pattern 1: White-Space-First Hierarchy

**Problem (Before):**
Developer arranges blog post elements (title, author, date, category, body, comments) all in the same font, size, and weight with equal spacing. Everything looks flat and undifferentiated. Developer's instinct is to immediately add colors, borders, and background images.

**Solution (After):**
Using only one font at one size, differentiate through strategic white space: place the title at the top-left with generous space around it; cluster the author name near the title (small gap = related); push metadata to the right with a horizontal relationship to the title; use a grid dividing line to separate main content from metadata. Position and proximity alone create a readable hierarchy.

**Key Change:** Spatial relationships and positioning — not decoration — create the primary hierarchy.

**Example from book:** Figures 7-3 through 7-4, where Kadavy creates a hierarchy using only Helvetica at 12pt with geometric white space management.

---

### Pattern 2: Ornamentation Reduction in Tables

**Problem (Before):**
Data table has dark rule lines bordering every cell on all four sides. The rules visually compete with the data, creating Tufte's "1+1=3" effect: the white space already separates items, the rule line adds a second separator, and the combination creates three visual elements where one would suffice.

**Solution (After):**
Remove all cell borders. Bold the table title. Italicize numeric data. Add slightly more white space between the title row and the first data row than between data rows. Optionally add subtle alternating row highlights for very wide tables. Align columns by their content (left-align text, right-align numbers).

**Key Change:** Let alignment and white space do the separating work that rule lines were redundantly doing.

**Example from book:** Figures 7-16 through 7-18, showing the "Top 5 Cities for Walking" table progressively stripped of ornamentation.

---

### Pattern 3: Isolated Factor Layering

**Problem (Before):**
Developer trying to make a heading stand out changes its typeface, size, weight, color, and adds a background image all at once. The result is visually loud, lacks subtlety, and the developer has used up all differentiation tools on a single level of hierarchy, leaving nothing for the remaining levels.

**Solution (After):**
Start with only white space. Then add weight (bold). Then add size. Then color. Then ornamentation. At each step, evaluate whether the hierarchy is sufficient *before* adding the next factor. The result uses the minimum number of changes to achieve clear differentiation, preserving remaining factors for other hierarchy levels.

**Key Change:** Layer visual factors one at a time, in order of subtlety (space -> weight -> size -> color -> ornamentation), stopping when sufficient differentiation is achieved.

**Example from book:** The progressive blog composition examples (Figures 7-3, 7-8, 7-9, 7-12, 7-13, 7-14, 7-15) each adding one factor.

---

### Pattern 4: Typeface Contrast for Conceptual Difference

**Problem (Before):**
All information on the page uses the same typeface. Metadata (dates, categories) and content (titles, body) are only distinguished by size or weight, making them feel like the same *kind* of information at different importance levels.

**Solution (After):**
Use a contrasting typeface (e.g., Helvetica for metadata like category and date) alongside the primary typeface (e.g., Baskerville for titles and body). The typeface change signals that the *nature* of the information differs — metadata is data, while titles and body are prose content.

**Key Change:** Typeface changes express that information is *conceptually different*, not just ranked differently.

**Example from book:** The Bygone Bureau uses Baskerville for titles and article content, and switches to Helvetica for metadata (category labels, dates) to express the different nature of that information (Figures 7-19 through 7-21).

---

## CORE PRINCIPLES

Visual hierarchy is not a linear ranking from most to least important — it is an expressive system where pieces of information have personalities and relationships. The five primary factors for establishing hierarchy are white space, type weight, type size, color, and visual ornamentation. Designers should learn each factor in isolation before combining them, starting with the subtlest (white space) and layering on additional factors only as needed.

### CHECKER Mode
When reviewing an existing design, verify:
- [ ] Each distinct piece of information is visually differentiated from the others
- [ ] White space between elements follows a proportional, intentional pattern (not arbitrary)
- [ ] Grouping via proximity correctly reflects conceptual relationships
- [ ] Type size differences are meaningful (at least one step apart in a proportional scale)
- [ ] Visual ornamentation is used sparingly and only where simpler factors cannot suffice
- [ ] Tables do not have unnecessary rule lines (Tufte's 1+1=3 principle)

**Severity Classification:**
| Violation Type | Severity | Rationale |
|----------------|----------|-----------|
| No discernible hierarchy (all elements look equal) | Critical | Users cannot parse importance; layout is non-functional |
| Tufte 1+1=3 (redundant separators in tables/layouts) | High | Adds visual clutter; every unnecessary element competes with content |
| Arbitrary spacing (no proportional relationship) | High | Design feels chaotic; spacing is the most impactful subtle factor |
| Too-subtle size changes (13px vs 14px) | Medium | Differentiation exists but is imperceptible to users |
| Over-ornamentation masking weak hierarchy | Medium | Treating symptom not cause; hierarchy collapses if decoration is removed |

### APPLIER Mode
When creating or modifying a design, ensure:
- [ ] Start with one font, one size, one weight — establish hierarchy through white space alone first
- [ ] Use geometric relationships to determine white space amounts (e.g., cap height = gap between related items)
- [ ] Add weight, then size, then color, then ornamentation — one factor at a time, only as needed
- [ ] Use a proportional type scale (e.g., 5, 7, 9, 12, 16, 21, 28, 37, 50, 67 at 3:4 ratio)
- [ ] Every piece of ornamentation must have a clear justification; default to removing it

---

## THIS VS THAT

| Confusion Point | This Chapter Says | Not This |
|-----------------|-------------------|----------|
| Hierarchy = linear importance ranking | Hierarchy is expressive: pieces of information have personalities and relationships, not just ranks | Hierarchy is a strict top-to-bottom importance list |
| Use more fonts to differentiate | Default to one font; differentiate with white space, weight, and size first | Switch typefaces to create variety |
| Add borders/rules to organize tables | Remove rule lines; use alignment and white space (Tufte's 1+1=3) | Tables need borders on every cell to be readable |
| Make things bigger to make them important | Size helps, but white space and position can be more powerful; a small red bold title near a thick rule can outrank larger body text | Size is the primary hierarchy tool |
| Use small incremental size changes | Skip steps in your type scale for meaningful contrast (9pt to 16pt, not 9pt to 12pt) | Every adjacent hierarchy level should be one step apart |
| Ornamentation makes designs look professional | Ornamentation is a "crutch" that beginners overuse; skilled designers use it sparingly | More decoration = more polished design |
| White space is wasted space | White space is the most powerful and subtle hierarchy factor; it signals both importance (more space = more important) and relationship (less space = related) | White space should be minimized to fit more content |

---

## DESIGN DECISION TABLE

| Decision Point | Options | Chapter Recommends | When |
|----------------|---------|-------------------|------|
| First factor to adjust for hierarchy | White space, weight, size, color, ornamentation | White space | Always start here; it is the subtlest and most impactful factor |
| How much white space between related items | Arbitrary, cap-height-based, proportional | Cap-height-based or geometric proportion | Use the cap height of the text as the spacing unit between closely related elements (e.g., title and author) |
| Type size increments | 1-2px steps, proportional scale steps, dramatic jumps | Proportional scale with skipped steps | When adjacent sizes (e.g., 9pt and 12pt) are too subtle, skip to 16pt; use a 3:4 ratio scale |
| Table styling | Full borders, partial borders, no borders + white space | No borders + white space + alignment | Default; add subtle alternating row highlights only for very wide tables |
| When to add ornamentation | Immediately, after other factors, never | After white space + weight + size + color are insufficient | Only when simpler factors cannot achieve the needed differentiation |
| Font pairing strategy | Two serifs, two sans-serifs, serif + sans-serif | Serif + sans-serif (or two very similar serifs like Baskerville + Georgia) | Use typeface contrast to express conceptual difference (content vs metadata), not just rank |
| Grid system | Free-form, 2-column, 4-column, 5-column | 4-column (versatile for standard layouts) | A 4-column grid supports 3+1 (main+sidebar), 2+2, and other common arrangements |
| Bold body copy readability | Default line-height, increased line-height | Increase line-height (leading) when body is bold | Bold text creates heavier texture; increased leading lightens it |

---

## TECHNIQUE REFERENCE

| Technique | What It Does | When to Use | How to Apply |
|-----------|-------------|-------------|--------------|
| White-space-only hierarchy | Establishes hierarchy using only positioning and spacing, single font/size/weight | First pass of any design; constraint exercise to build skills | Set all text to one font, one size, regular weight. Use only position and spacing to differentiate. Place important items at top-left. Group related items with less space between them. |
| Cap-height spacing | Uses the capital letter height as the spacing unit between related elements | When determining how much white space to put between a title and its author, or between related metadata | Measure the cap height of your text; use that exact distance as the vertical gap between closely related items. Use half-cap-height for very tightly related items (e.g., category and timestamp). |
| Proportional type scale (3:4 ratio) | Creates a harmonious set of type sizes with proportional relationships | Whenever choosing type sizes for headings, body, captions, metadata | Start with smallest size (e.g., 5pt), divide by 0.75 repeatedly: 5, 7, 9, 12, 16, 21, 28, 37, 50, 67. Skip steps for meaningful contrast. |
| Step-skipping in type scale | Achieves noticeable hierarchy without relying on many factors | When adjacent scale sizes (9pt vs 12pt) look too similar | Instead of 9pt header / 9pt body, use 9pt bold header / 9pt body, or skip to 16pt header / 9pt body |
| Grid-based white space management | Uses geometric proportions to define content areas and column widths | Setting up any multi-column layout | Create a canvas at a chosen ratio (e.g., 3:4). Create a live area as a scaled-down version. Divide with scaled rectangles to create column grid lines. |
| Italic differentiation | Adds a dimension of expression without changing size or weight | When white space alone is insufficient but you want to stay within one typeface/size | Set metadata (dates, categories) in italics to subtly differentiate from regular-weight body text. Creates an extra layer of expression. |
| Horizontal rule as anchor | A thick rule or bar creates a dominant visual anchor that elevates nearby elements | When you need a strong focal point that can make even smaller text prominent | Place a thick dark horizontal rule near the title. Elements close to the rule inherit its visual dominance. The title can even be smaller than body text and still dominate. |
| Alternating row highlights | Subtle background color on every other row in a table | Wide tables where the eye needs help tracking across rows | Apply a light background to alternate rows. Ensure highlight edges define the table boundaries (no border lines needed). Keep rule lines minimal. |
| Tufte 1+1=3 removal | Removes redundant visual separators from data displays | Any table or layout where rule lines separate already-spaced items | Identify each rule line or border. If white space already separates the items on either side, remove the rule. Each rule between two white-space gaps creates 3 visual separators where 1 suffices. |

---

## COMMON MISTAKES

| Mistake | Why It Happens | Correct Approach |
|---------|----------------|------------------|
| Changing too many visual factors at once | Developer is unsure which factor will "work," so they change font + size + color + weight + add decoration simultaneously | Isolate factors. Change one at a time, starting with white space. Evaluate after each change. |
| Using only the most obvious factors (size, color, decoration) | These feel most impactful because they are most visible | The subtlest factors (white space, proportion) often have the most impact on perceived quality |
| Adding rule lines to tables for "organization" | Assumption that lines guide the eye between columns/rows | Alignment alone guides the eye powerfully (Chapter 6 principle of direction). Remove lines; use white space. |
| Choosing type sizes with trivial differences (13px vs 14px) | Web gives unlimited size options, so developers make incremental changes | Use a proportional scale and skip steps. The difference between 9pt and 16pt is meaningful; 13px and 14px is not. |
| Making all metadata equally prominent | Treating date, category, author, comment count as a single "metadata block" | Each metadata item has a different conceptual relationship to the content. Group and style them to express these relationships. |
| Overusing ornamentation when the design "doesn't look clean" | Mistaking lack of decoration for lack of design | Strip everything back to one font, one size, white space only. Build up from there. "Clean" comes from considered spacing, not decoration. |
| Ignoring leading (line-height) when using bold body text | Not realizing that bold text creates heavier visual "texture" | Increase line-height when body text is bolded to lighten the overall texture of the text block |

---

## RATIONALIZATION COUNTERS

| Excuse | Reality |
|--------|---------|
| "White space is wasted space — I need to fit more content" | White space is the most powerful hierarchy signal. It communicates importance and relationships. Removing it makes everything equally unimportant. |
| "I need borders on my table cells so users can find data" | Alignment guides the eye just as effectively (principle of direction). Borders add visual noise via Tufte's 1+1=3. Try removing them. |
| "I need to use different fonts to make things look different" | A single typeface with white space, weight, and size variations can create a rich, elegant hierarchy. Adding fonts should be a last resort, not a first instinct. |
| "The size difference between my heading and body is fine — it's 2px bigger" | A 2px difference is perceptually negligible. Use a proportional scale and skip steps. You need at least a 25-30% size increase for a meaningful hierarchical signal. |
| "I need all those decorative elements to make it look professional" | Ornamentation is a "crutch" that beginners lean on. Skilled designs often use very little. Strip back and see what the hierarchy looks like without decoration. |
| "Hierarchy just means ranking things from most to least important" | Hierarchy is expressive, not linear. Pieces of information have different *natures* and *relationships*, not just different ranks. The author name is "by" the person; the category is what the post is "filed under." |
| "I'll just pick spacing values that look right" | Geometric and proportional spacing (e.g., cap-height-based gaps) creates rhythm and order that feels "clean." Arbitrary values create subtle unease even if you can't articulate why. |

---

## TRIGGERS

Invoke this chapter's knowledge when:
- [ ] A developer is creating or reviewing any layout with multiple pieces of information at different importance levels
- [ ] A design "feels flat" or "everything looks the same"
- [ ] Someone says "I can't figure out how much spacing to use"
- [ ] A table or data display looks cluttered despite having structured data
- [ ] A developer's first instinct is to add borders, backgrounds, or decorative elements to create differentiation
- [ ] CSS shows many arbitrary margin/padding values with no proportional system
- [ ] A design uses 3+ different typefaces to try to differentiate elements
- [ ] During layout/composition work for blogs, dashboards, article pages, or content-heavy interfaces

Prerequisite state:
- Basic understanding of grids and geometric proportions (Chapters 5-6) is helpful for managing white space
- Understanding of typeface classification (Chapter 3) helps when pairing fonts for conceptual contrast
- Familiarity with the principle of direction/alignment (Chapter 6) supports the case for removing table rules

---

## PRODUCES

After applying this knowledge:
- State: Design has a clear, intentional visual hierarchy where users can quickly identify primary content, understand grouping/relationships, and navigate information levels
- Artifacts: A hierarchy using layered visual factors (white space, type weight, type size, color, ornamentation) applied in order of subtlety; a proportional type scale; considered spacing system; minimal ornamentation
- Understanding: Developer knows how to isolate and evaluate individual hierarchy factors, when to add vs. remove visual differentiation, and how to express conceptual relationships (not just importance ranking) through visual means

## NEXT CAPABILITY NEEDED

| If | Then Need | Because |
|----|-----------|---------|
| Hierarchy involves color choices beyond simple contrast | Color theory and interaction knowledge | Color interactions are "much more complex and nuanced" (Chapter 9 covers this) |
| Layout needs a grid/proportional system first | Geometric proportion and grid construction capability | White space management depends on a proportional grid framework (Chapters 5-6) |
| Font pairing decisions needed for conceptual contrast | Typography and typeface classification knowledge | Choosing serif vs. sans-serif for content vs. metadata requires understanding type anatomy (Chapter 3, Appendix B) |
| Design needs to convey a specific mood or feeling | Composition and visual weight principles | Hierarchy is one aspect; overall mood requires broader composition understanding (Chapters 5-6) |
| Body text readability needs evaluation after hierarchy changes | Typography readability and texture knowledge | Bold text, size changes, and leading adjustments affect readability (Appendix A on texture) |

---

## CSO KEYWORDS

visual hierarchy, white space, type weight, type size, type scale, proportional scale, visual ornamentation, hierarchy factors, information architecture, layout composition, grid system, four-column grid, cap height spacing, Tufte 1+1=3, rule lines, table design, bold, italic, font weight, font size, leading, line-height, horizontal rule, metadata styling, content differentiation, grouping by proximity, conceptual relationships, blog layout, typography hierarchy, ornamentation reduction, clean design, information design, alignment, gutter, column grid, type scale 3:4 ratio, Baskerville, Georgia, Helvetica, font pairing, alternating row highlights, visual weight, squint test
