# Visualization principles — the why-engine

**Sources:** Tufte *The Visual Display of Quantitative Information* (1983, 2nd ed. 2001, Graphics Press); Tufte *Envisioning Information* (1990); Knaflic *Storytelling with Data* (2015, Wiley); Cairo *The Functional Art* (2012) + *How Charts Lie* (2019, Norton); Munzner *Visualization Analysis & Design* (2014, CRC Press); Few *Information Dashboard Design* (2006, 2nd ed. 2013, Analytics Press); Cleveland & McGill "Graphical Perception" (1984, JASA); Ware *Information Visualization: Perception for Design* (2004). Layer A of the two-layer catalog: these principles do not select chart types — they **adjudicate** encoding decisions. Cite them to ground a recommendation, then recommend. This is the stable, citeable reference for data visualization.

---

## Table of Contents

1. [Key definitions](#key-definitions)
2. [Data-ink ratio and chartjunk](#data-ink-ratio-and-chartjunk)
3. [Preattentive attributes](#preattentive-attributes)
4. [Marks and channels (Munzner)](#marks-and-channels-munzner)
5. [Perceptual accuracy (Cleveland & McGill)](#perceptual-accuracy-cleveland--mcgill)
6. [Truthful encoding](#truthful-encoding)
7. [Colorblind safety and chart accessibility](#colorblind-safety-and-chart-accessibility)
8. [Gestalt in data visualization](#gestalt-in-data-visualization)
9. [Dashboard principles (Few)](#dashboard-principles-few)
10. [Critical caveats](#critical-caveats)

---

## KEY DEFINITIONS

> **Data-ink**: ink (or pixels) that encodes data directly. The minimum ink required to communicate the data if you removed everything else. (Tufte, 1983)

> **Chartjunk**: visual elements that do not encode information — grid flourishes, hatching, 3D effects on 2D data, unnecessary borders, decorative illustrations. Every chartjunk element competes with data ink for attention. (Tufte, 1983)

> **Preattentive attribute**: a visual property the eye registers before conscious processing — color, size, position, orientation. Exploiting these allows a designer to direct attention to the signal before the reader decides to look. (Knaflic, 2015; Ware, 2004)

> **Mark**: a geometric primitive that encodes a data point — point, line, area, bar (Munzner, 2014).

> **Channel**: a visual property of a mark that encodes a data value — position (x/y), size/length, angle, color hue, color luminance, shape, texture (Munzner, 2014).

> **Perceptual accuracy**: how accurately a reader can decode a visual encoding back to the underlying data value. Position on a common scale = most accurate; area, volume, angle = least accurate. (Cleveland & McGill, 1984)

> **Truthful encoding**: the chart's visual representation faithfully reflects the underlying data without distortion via axis manipulation, cherry-picking, or proportional misrepresentation. (Cairo, 2019)

---

## DATA-INK RATIO AND CHARTJUNK

### Data-ink ratio (Tufte, VDQI 1983)

> **Data-ink ratio = Data ink / Total ink used to print the graphic**

Maximize it: every ink element should encode data. Elements that encode nothing should be removed unless they serve a structural function (axis labels, a necessary reference line).

**The editing heuristic** (Tufte's five steps):
1. Remove chartjunk — all non-data ink that adds no information.
2. Remove redundant data-ink — e.g. a bar chart needs only the top edge of each bar, not a full border.
3. Erase the data once and see what's left — what data does the erased ink now make ambiguous? That residual is the necessary minimum.
4. Revise and edit — repeat until every remaining element earns its space.
5. What remains is signal; everything removed was noise.

**What to remove (common chartjunk):**

| Element | Remove when |
|---------|------------|
| Grid lines | They don't aid reading specific values; major gridlines only if needed for alignment |
| Background fills (gradient, shadow) | Always — encodes nothing |
| 3D effects on 2D data | Always — adds visual complexity; distorts proportions |
| Borders around chart area | Usually — frames nothing |
| Redundant axis labels | When the data itself labels clearly |
| Legends when direct labeling is possible | A legend makes the reader's eye shuttle; label data directly |
| Tick marks beyond what's needed | Reduce to major ticks only for reading accuracy |
| Decimal places beyond significance | Round to the precision the audience needs |

### Chartjunk taxonomy

| Type | Example | Problem |
|------|---------|---------|
| Vibration | Dense hatching patterns | Creates optical illusion; fatigues the eye |
| Grids | Heavy grid over every data point | Competes with data; buries the signal |
| Ducks (chart imagery) | Dollar bill background on finance chart | Redundant; distracts |
| Data flowers / pictograms | Scaled icons for quantity | Area encoding less accurate than length; icons distort |
| Moiré patterns | Striped or textured fills | Optical noise |
| 3D projection | 3D pie chart | Distorts apparent proportions via perspective |

### The minimum necessary (Tufte's counter-intuition)

Tufte's purism has limits: context, annotation, and reference lines that aid comprehension are worth their ink cost. The rule is not "as sparse as possible" — it is "every element earns its place". A reference line showing a target or a prior-year baseline is data-ink, not chartjunk.

---

## PREATTENTIVE ATTRIBUTES

### What they are (Knaflic, 2015; Ware, 2004)

Preattentive attributes are processed by the visual system in under 250ms, before conscious attention. They allow a designer to make one element pop without requiring the reader to search.

| Attribute | Encodes | Best for |
|-----------|---------|----------|
| **Color hue** | Category / group membership | Distinguishing groups (≤8 categories) |
| **Color intensity / luminance** | Ordered quantity or emphasis | Sequential scales, highlighting |
| **Size / length** | Ordered quantity | Bar charts, bubble size for a third variable |
| **Position** | Ordered quantity (most accurate) | Any axis encoding |
| **Shape** | Category (limited) | Scatter plot markers to distinguish groups |
| **Orientation / angle** | Direction, deviation | Wind charts, diverging bars |
| **Motion** (in interactive/animated) | Change over time or alert | Animated transitions, alert states |

### Rules for preattentive use

- **One encoding task per attribute.** Do not encode two separate data dimensions in color simultaneously.
- **Limit color for categories to ≤8 hues.** Beyond 8, discrimination degrades and the legend becomes required reading rather than optional reference.
- **Use preattentive to highlight, not to decorate.** If everything is bold / red / large, nothing is. Preattentive attributes work through contrast. (Knaflic: *one thing is bold, not everything*.)
- **Position on a common scale first.** When multiple encodings are possible, prefer position (most accurate) over color or size (less accurate per Cleveland & McGill).
- **Animate only what changes.** Motion is a powerful preattentive signal — reserve it for actual data changes or to show transitions, not as decoration.

### The highlighting decision (Knaflic)

Use a single preattentive attribute to direct attention to the one thing that matters:
- A single bar in a different color → emphasizes that category
- A single data point in a contrasting hue → emphasizes an outlier
- Bold text in a data label → emphasizes the key number

Remove all other uses of that attribute in the same chart. If red marks the outlier, nothing else in the chart is red.

---

## MARKS AND CHANNELS (MUNZNER)

### The framework (Munzner, 2014)

Every visualization maps data to a **mark** (point, line, area, bar) using a **channel** (position, size, color, shape). Different data types require different channel choices.

**Data types:**
- **Quantitative** (continuous): temperature, revenue, duration
- **Ordinal** (ordered categorical): rating, rank, severity
- **Categorical** (unordered): product name, country, user segment

**Channel effectiveness by data type (Munzner's ranking):**

| Rank | Quantitative | Ordinal | Categorical |
|------|-------------|---------|-------------|
| 1st | Position on common scale | Position on common scale | Spatial region / position |
| 2nd | Position on unaligned scale | Position on unaligned scale | Color hue |
| 3rd | Length / size | Color luminance | Motion |
| 4th | Tilt / angle | Size | Shape |
| 5th | Area | ... | ... |
| 6th | Depth (3D — avoid) | | |
| 7th | Color luminance | | |
| 8th | Color saturation | | |
| 9th | Color hue (avoid for quantity) | | |
| 10th | Shape (avoid for quantity) | | |

**Key rule:** Color hue is ineffective for encoding quantitative data (it implies categorical distinction, not magnitude). Use color luminance (light → dark) or size for quantitative encoding. Use color hue for categories.

### Expressiveness and effectiveness

- **Expressiveness**: the encoding represents all and only the facts in the data. Don't imply ordering where there is none (use hue not luminance for unordered categories). Don't imply equality where there is difference.
- **Effectiveness**: use the most perceptually accurate channel available for the most important data dimension.

---

## PERCEPTUAL ACCURACY (CLEVELAND & MCGILL)

### The hierarchy (Cleveland & McGill, JASA 1984)

Cleveland & McGill's psychophysical experiments rank visual encodings by how accurately people can read back the underlying value:

1. **Position on a common scale** — most accurate (aligned bar chart, dot plot)
2. **Position on identical but non-aligned scales** — accurate (small multiples with same scale)
3. **Length** — accurate (bar chart)
4. **Angle / slope** — less accurate (pie chart, line slope)
5. **Area** — less accurate (bubble chart — use with caution; label the values)
6. **Volume** — poor
7. **Color saturation / density** — poor
8. **Color hue** — poor for quantity

**Implication:** Pie charts encode in angle — a fundamentally less accurate channel than bar charts encoding in position/length. When the audience must compare values precisely, use position. When approximate proportion is enough (3–4 parts), a pie or donut is acceptable.

---

## TRUTHFUL ENCODING

### What makes a chart lie (Cairo, 2019)

Cairo (*How Charts Lie*) identifies five mechanism categories:

| Lie type | Mechanism | Example | Fix |
|----------|-----------|---------|-----|
| **Truncated axis** | Y-axis starts above zero, exaggerating differences | A 5% change appears as a 300% visual difference | Start at zero for bar charts; if truncating a line chart, label explicitly |
| **Dual-axis distortion** | Two different y-scales on one chart imply a relationship that may not exist | Temperature and stock price on the same chart | Use two separate charts; or annotate correlation explicitly and separately |
| **Cherry-picked range** | X-axis range selected to show only favorable period | "Revenue doubled!" (starting from post-crash low) | Show full available time range; call out the date range |
| **Inappropriate chart type** | Chart type misrepresents the data relationship | Pie chart with 12 slices; bubble chart where areas are miscalculated | Match chart to data relationship (see chart-selection.md) |
| **Missing baseline / context** | KPIs with no comparison to target, prior period, or industry | "10,000 users!" — is that good or bad? | Always show baseline: prior period, target, or contextual comparison |
| **Proportional misrepresentation** | 3D, icon, or area encoding where dimensions are not to scale | Icon twice as tall AND twice as wide for double the value = 4× visual area | One-dimensional scaling only; prefer length/position |

### Cairo's four qualities of good visualization

Cairo (*The Functional Art*, 2012):
1. **Truthful** — based on thorough research and honest representation.
2. **Functional** — accurate depiction of the data that aids understanding.
3. **Beautiful** — aesthetically pleasing to increase engagement.
4. **Insightful** — reveals evidence not easily accessible otherwise.

Truthfulness is the non-negotiable minimum. Beauty without truth is decoration.

### The lie-detection checklist

Before publishing any chart:
- [ ] Does the y-axis start at zero for bar charts? If not, is the truncation labeled and justified?
- [ ] Is there a dual y-axis? If yes, is the relationship between them explicitly stated and independently verified?
- [ ] Is the date/time range cherry-picked? Is the full available range shown or the rationale for the shown range stated?
- [ ] Are proportions accurate? If area/icon encoding is used, does visual size correspond to the data value?
- [ ] Does the chart have a baseline? Can the reader judge whether the shown values are good/bad/expected?
- [ ] Does the chart type match the data relationship?

---

## COLORBLIND SAFETY AND CHART ACCESSIBILITY

### Prevalence

~8% of men and ~0.5% of women globally have color vision deficiency (CVD); red-green (deuteranopia/protanopia) is most common, affecting ~6% of men. At scale, any chart that encodes information only in red vs. green fails a significant fraction of the audience.

### Rules

- **Redundant encoding:** when color encodes a data dimension (category, value, status), encode the same dimension in a second channel — shape, pattern, or label. Color alone fails WCAG 1.4.1 (Use of Color).
- **Colorblind-safe palettes for charts**: use palettes designed for CVD robustness, not the brand palette. Recommended:
  - **Okabe-Ito** (8 colors, designed for deuteranopia/protanopia — the most used in scientific publishing)
  - **Viridis, Cividis, Magma** (sequential — perceptually uniform, print-friendly, CVD-safe)
  - **ColorBrewer** palettes (Brewer, 2003) — designed specifically for maps and charts with CVD in mind; browser: colorbrewer2.org
- **Test with simulation**: Coblis (color blindness simulator), Viz Palette (vizpalette.maskedinput.com), Adobe Accessibility tools.
- **Red/green avoid**: never encode a binary success/fail or positive/negative in red and green only. Use position, label, or redundant icons.

### Alt text for charts

Charts in digital products must carry accessible descriptions (WCAG 1.1.1 Non-text content):
- **Short alt text**: "Bar chart showing monthly revenue, January–June 2025"
- **Long description** (linked or `aria-describedby`): the data table or a verbal description of the key insight the chart encodes

Pattern: `alt="[chart type] showing [data subject], [time period or context]. [Key insight if there is one.]"`

### Color channels for data vs. brand

**This is the scope boundary.** Chart color palettes and brand color palettes serve different functions:
- **Brand palette** (core `color` mode): the product's identity colors — chosen for emotion, association, contrast on UI backgrounds.
- **Chart data palette** (this skill): chosen for perceptual discriminability, colorblind safety, and print-safe luminance — the brand primary may be completely wrong for encoding categorical data.

When a brand palette fails CVD or perceptual tests for data encoding, use a data-specific palette for charts while keeping the brand palette in UI chrome.

---

## GESTALT IN DATA VISUALIZATION

Gestalt laws apply to chart and dashboard layout, cited from the usability foundation (usability-principles.md, Gestalt perception laws section):

| Law | Data-viz application |
|-----|---------------------|
| **Proximity** | Related charts are near each other on a dashboard; independent charts have more whitespace between them |
| **Similarity** | Same chart type and color for the same metric category across a dashboard; visual consistency = implicit labeling |
| **Common region** | A panel border or background groups a dashboard section; makes "revenue KPIs" vs "engagement KPIs" scannable without reading labels |
| **Alignment** | Chart axes aligned across small multiples allow direct comparison without visual re-anchoring |
| **Continuity** | Connected data points in a line chart imply a continuous relationship; discrete points imply independence |
| **Figure/ground** | The data should be figure; gridlines and reference lines should be ground (lower contrast, lighter weight) |

---

## DASHBOARD PRINCIPLES (FEW)

From Few, *Information Dashboard Design* (2006, 2nd ed. 2013, Analytics Press):

### What a dashboard is

A dashboard displays the information needed to achieve one or more specific objectives, arranged on a single screen so it can be monitored at a glance. **"At a glance"** is the design constraint: if a user must scroll, drill, or wait to see the primary KPIs, the dashboard has failed its purpose.

### Hierarchy of importance

1. **Most important metrics above the fold** — visible without scrolling. No more than 7±2 key indicators at the top level (Miller/Cowan — usability cite-down; Few concurs).
2. **Context for every KPI**: every absolute number needs a comparative value — target, prior period, or industry benchmark. A KPI without context is not interpretable.
3. **Trend before snapshot**: a time-series trend line beside a KPI card shows whether the current value is improving, declining, or stable. A snapshot alone cannot.
4. **Consistent scales**: charts that will be compared must share a y-axis range. Few: "Standardize comparative displays."

### What not to put on a dashboard

- Decorative colors or 3D charts (chartjunk — Tufte)
- Metrics the audience cannot act on
- Raw data tables as the primary view (reserve for drill-down)
- Auto-refreshing animations that distract from reading
- Multiple layout regions that imply relationships the data does not support

### Small multiples (Tufte, *Envisioning Information*, 1990)

Small multiples: a series of charts with the same encoding (same axes, same scale, same type) showing variation across a dimension (time, region, segment). They are more effective than animation for comparison because they allow direct visual comparison without memory load.

**When to use small multiples:**
- Comparing the same metric across multiple groups/regions/time periods
- Showing facets of the same dataset without losing the ability to compare
- When animation would require the viewer to "hold" the first frame in memory to compare with the second (small multiples remove the memory load)

---

## CRITICAL CAVEATS

| Caveat | What it corrects |
|--------|-----------------|
| **Tufte's purism can over-strip** | Removing all decoration is not always correct; annotation, reference lines, and contextual gridlines that aid comprehension earn their ink. "Less is more" stops being true when the minimum removes context the reader needs. |
| **Pie charts are not always wrong** | Tufte and Few are famously hostile to pie charts. The research basis: angle is a less accurate encoding than position. But for 2–4 parts-to-whole where precise comparison is not required and the parts are widely different in size, a pie chart is readable and conventional. The crime is 12-slice pies with similar values — not the form itself. |
| **Context-dependency of chart type rules** | A treemap is poor for precise comparison but excellent for showing hierarchical composition at a glance. "Use X never" rules are shorthand for "X is a poor choice when precise comparison is the goal." Match the chart to the audience's task, not a rule list. |
| **Colorblind palettes vs. perceptual uniformity** | Okabe-Ito is CVD-safe and categorical. Viridis is CVD-safe and sequential. They are not interchangeable — choose by data type first, then verify CVD safety. |
| **Data-ink ratio is a heuristic, not a formula** | Tufte did not provide a threshold ratio. "Maximize" means "question every element" — not "remove everything until nothing is left." |
| **Small multiples require identical scales** | Comparing small multiples with different y-axis ranges is one of the most common lies. Every chart in a small-multiples display must share the same scale. |
