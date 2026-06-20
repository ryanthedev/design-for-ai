# Chart selection — the what, and the decision engine

**Sources:** Few *Show Me the Numbers* (2004, 2nd ed. 2012, Analytics Press); Cairo *How Charts Lie* (2019, Norton); Munzner *Visualization Analysis & Design* (2014, CRC Press); Knaflic *Storytelling with Data* (2015, Wiley); Tufte *The Visual Display of Quantitative Information* (1983/2001); Evergreen *Effective Data Visualization* (2017, SAGE). Layer B of the two-layer catalog: the chart-type decisions and dashboard layout rules. The decision table below answers "which chart?" — the principles in `viz-principles.md` answer "why?".

---

## Table of Contents

1. [Chart selection by data relationship](#chart-selection-by-data-relationship)
2. [The decision table](#the-decision-table)
3. [Dashboard layout rules](#dashboard-layout-rules)
4. [The Cairo lies taxonomy](#the-cairo-lies-taxonomy)
5. [This vs that — close calls](#this-vs-that--close-calls)
6. [Common mistakes](#common-mistakes)

---

## CHART SELECTION BY DATA RELATIONSHIP

The data relationship — not the data format or personal preference — determines the right chart. Ask: **what is the reader supposed to understand from this chart?**

### The 9 data relationships

| Relationship | Question it answers | Primary channels |
|-------------|--------------------|--------------------|
| **Comparison** | How do values differ across categories? | Position on common scale (bar chart, dot plot) |
| **Distribution** | How are values spread? What's the shape? | Position + density (histogram, box plot, violin) |
| **Correlation** | Do two variables move together? | Position (x,y) (scatter plot) |
| **Composition (static)** | What are the parts of a whole? | Angle or stacked position (pie/donut, stacked bar) |
| **Composition (time)** | How do parts of a whole change over time? | Stacked area, stacked bar (over time) |
| **Trend / time series** | How does a value change over time? | Position over time (line chart) |
| **Ranking** | In what order do values fall? | Length (horizontal bar, slope chart) |
| **Deviation** | How far from a reference value? | Length from baseline (diverging bar, waterfall) |
| **Flow / relationship** | How do items connect or move between states? | Shape + connection (sankey, chord, network) |
| **Geographic** | How do values vary by location? | Spatial position (choropleth, dot density map) |

---

## THE DECISION TABLE

Match the audience's question to the chart. **The audience's task determines the chart; the data format does not.**

| Audience's task | Best chart | Use instead of | When to deviate |
|----------------|-----------|----------------|----------------|
| Compare values across ≤20 categories (one-time, not ordered) | **Vertical bar chart** | Pie chart (angle less accurate) | Use horizontal bar if category names are long |
| Compare values across ≤20 categories (ranked order matters) | **Horizontal bar chart, sorted descending** | Vertical bar unsorted | Sorting reveals the ranking immediately |
| Show how a value changes over time (continuous, connected) | **Line chart** | Bar chart (implies discreteness for each period) | Use bar for discrete periods (quarters); line for continuous readings |
| Show how multiple series change over time, compare levels | **Multiple line chart** | Stacked area (harder to read individual values) | Limit to ≤5 series before color discrimination degrades |
| Show parts of a whole (2–4 parts, very different sizes) | **Pie or donut chart** | Stacked bar (harder to judge proportion) | Use stacked bar if exact values or comparison across categories matters |
| Show parts of a whole (5+ parts, or similar sizes) | **Stacked bar or treemap** | Pie chart (angle judgment fails with many/similar slices) | Treemap for hierarchical data |
| Show how parts of a whole change over time | **Stacked bar chart (time on x-axis)** | Stacked area (if discrete time periods) | Stacked area for smooth continuous trends |
| Show spread / distribution of a single variable | **Histogram** | Bar chart (different semantics: bars are adjacent by definition in histograms) | Box plot for comparison across groups; violin for shape + comparison |
| Compare distributions across groups | **Box plot** or **violin plot** | Multiple histograms (harder to compare directly) | Violin when distributional shape matters, not just quartiles |
| Show relationship between two quantitative variables | **Scatter plot** | Line chart (implies temporal ordering) | Add a trend line only if a relationship exists and is meaningful |
| Show ranking with exact values at one point in time | **Horizontal bar chart, sorted** | Slope chart (use slope for showing rank CHANGE) | Slope chart when change in rank matters more than absolute value |
| Show change in rank or value across two time points | **Slope chart** | Line chart (harder to see rank change) | Dumbbell / connected dot plot for ≤2 comparison points |
| Show deviation from a baseline or target | **Diverging bar chart** | Standard bar chart (doesn't show direction relative to baseline) | Waterfall chart for sequential contributions to a total |
| Show flow between states or categories | **Sankey diagram** | Stacked bar (doesn't show paths) | Network diagram if connections are many-to-many and non-directional |
| Show geographic variation | **Choropleth map** | Pie-chart-on-map (distorts area and category simultaneously) | Dot density map for absolute quantities; choropleth for rates/ratios |
| Show hierarchical composition | **Treemap** | Nested pie (angle + nesting = very poor perceptual accuracy) | Sunburst for drill-down interaction |
| Show ≤20 data points on a KPI card | **Sparkline** (Few) | Full chart (too much space for context data) | Bullet chart when a target comparison matters |

### Bullet chart (Few)

For KPI displays: a single bar (performance), a reference line (target), and a gray background range (contextual zones: satisfactory/good/excellent). Few developed this specifically to replace gauge/speedometer charts which encode in angle and waste space. A bullet chart takes ~10% of the space of a gauge and encodes more information.

---

## DASHBOARD LAYOUT RULES

Based on Few (*Information Dashboard Design*, 2006/2013) and Tufte (*Envisioning Information*, 1990).

### The primary constraint: at-a-glance

A dashboard is defined by the ability to see everything needed in one glance. If scrolling is required to see a primary KPI, it is not a dashboard — it is a report.

### Layout hierarchy

```
Row 1 (top)      → Primary KPIs: 3–7 key metrics with sparklines or bullet charts
Row 2            → Secondary context: top-level trend charts (time series for primary KPIs)
Rows 3+          → Detail: breakdown charts, tables, drill-down views
```

**Folding rule (Few):** Everything a decision-maker needs to know without scrolling is "above the fold." Details are below; they can require scrolling.

### Grouping and labeling (Gestalt proximity + common region)

- Group metrics that belong to the same business area in a visually bounded region (background fill, border).
- Group related charts with proximity AND a section header.
- Never place unrelated metrics side-by-side — proximity implies relationship (Gestalt).

### Scale consistency

All charts in a dashboard showing the same metric or same time range must share identical y-axis ranges. Inconsistent scales are one of the most common dashboard lies — a viewer assumes the same scale when charts are placed in a grid.

### Color economy on dashboards

- Use a **single accent color** for the primary KPI or the metric that needs attention.
- Use a neutral (gray) palette for context and secondary metrics.
- Reserve red/amber/green for **status indicators only** (and use them with redundant encoding for CVD safety).
- Avoid gradients, 3D, and background images.

### What NOT to include on a dashboard

| Element | Why to exclude |
|---------|---------------|
| Pie charts with >4 slices | Angle judgment fails; use a sorted bar chart |
| 3D charts | Distorts perception; encodes no depth data |
| Gauge / speedometer charts | Angle encoding, low data-ink ratio; use bullet chart instead |
| Animated auto-refresh for cosmetic reasons | Distracts from reading; reserve animation for actual data change |
| Tables as primary views | Better as drill-down; primary view should be visual encoding |
| Gradient fills and shadows on chart elements | Chartjunk; reduces contrast against gridlines |

---

## THE CAIRO LIES TAXONOMY

From Cairo (*How Charts Lie*, 2019). Use as a detection and audit checklist.

### Lie 1: Truncated axis

**What it does:** Y-axis starts above zero, making small absolute differences appear large.
**Example:** A political poll where the y-axis starts at 40% makes a 5-point lead look like a landslide.
**Fix:** Start at zero for bar charts (bars encode length, which implies starting at zero). For line charts, truncation can be acceptable if explicitly labeled — call out the range.
**Exception:** When zero is meaningless for the data (e.g., temperature in Fahrenheit; stock prices where only change matters), starting above zero is appropriate — label the range clearly.

### Lie 2: Dual-axis distortion

**What it does:** Two different y-scales on the same chart imply a visual correlation that may be spurious or that the scales have been manipulated to align trends.
**Example:** "Revenue and customer satisfaction are rising together" — but satisfaction is on a 1–5 scale and revenue on a 0–$10M scale, scaled to make the lines meet.
**Fix:** Use separate charts. If the correlation is the point, establish it statistically and cite it explicitly. Never scale dual axes to make trends appear aligned.

### Lie 3: Cherry-picked time range

**What it does:** The x-axis range is selected to begin at a favorable low (or end at a favorable high), showing only the portion of the data that supports the claim.
**Example:** "Our product grew 200% in 18 months" (starting from pandemic-low baseline).
**Fix:** Show the full available historical range. Annotate why the shown range was selected if there is a legitimate reason (e.g., company was founded 18 months ago).

### Lie 4: Inappropriate proportional encoding

**What it does:** Icons, bubbles, or pictograms are scaled on two dimensions when only one should scale, creating an area that grows as the square of the data ratio.
**Example:** A circle representing $2B is drawn twice as wide AND twice as tall as one representing $1B — appearing 4× larger.
**Fix:** Scale on one dimension only (radius or width, not both). Prefer length/position. Label the values directly.

### Lie 5: Missing baseline or context

**What it does:** A KPI is displayed without comparison to target, prior period, or contextual benchmark, making it impossible to judge whether the value is good, bad, or expected.
**Example:** "10,000 daily active users" with no prior period, no target, no industry context.
**Fix:** Every KPI card must include: comparison value (prior period, target, or benchmark) + direction of change + whether change is favorable.

### Lie 6: Implying causation with correlation

**What it does:** Placing two variables in visual proximity (dual-axis, scatter with trend line) implies a causal relationship the data does not support.
**Fix:** Correlation charts should be labeled as correlational. Causal claims need independent evidence.

---

## THIS VS THAT — CLOSE CALLS

| The choice | Use this | Over that | When to flip |
|------------|----------|-----------|-------------|
| Bar vs line for time series | **Line** (continuous change over time) | Bar | Use bar when periods are discrete and comparison across them (not trend) is the point |
| Pie vs bar for composition | **Bar (sorted)** for 5+ or similar-sized parts | Pie | Pie acceptable for 2–4 very different parts when exact values not needed |
| Stacked bar vs grouped bar | **Grouped** for comparing individual values across categories | Stacked | Stacked for showing composition of a total, not comparing individual parts |
| Choropleth vs dot density | **Choropleth** for rates and ratios | Dot density | Dot density for absolute quantities; choropleth for per-capita or % |
| Scatter vs bubble | **Scatter** for 2-variable relationship | Bubble | Bubble when a 3rd variable (encoded in area) adds meaningful interpretation |
| Box plot vs violin | **Box plot** for quartile comparison | Violin | Violin when distributional shape (bimodal, skewed) matters |
| Small multiples vs animation | **Small multiples** for comparing across groups | Animation | Animation only for showing temporal change in a single dataset (not comparison) |
| Gauge vs bullet chart | **Bullet chart** (Few) | Gauge/speedometer | Gauge is never preferable; bullet chart encodes more in less space |
| Direct label vs legend | **Direct label** (adjacent to the line/bar) | Legend | Legend when overlapping prevents direct labels; otherwise legend forces eye-travel |

---

## COMMON MISTAKES

| Mistake | Why it happens | Correct approach |
|---------|----------------|------------------|
| Pie chart with 8+ slices | Feels "complete" | Use a sorted horizontal bar chart; group small slices into "Other" |
| 3D bar chart | "Looks impressive" | 2D bar chart; 3D encodes no additional dimension and distorts length |
| Color encoding for quantity | "More intense = more" | Use color luminance or sequential color scale for quantity; hue for categories |
| Y-axis starts at non-zero on bar chart | Auto-default in Excel/Charts.js | Manually set zero baseline; bar length = value |
| KPI with no comparison | Space/simplicity | Always include prior period or target comparison — even a small sparkline |
| Red/green for status only | Traffic light convention | Add shape/icon redundancy; colorblind users (~8% of men) see same hue |
| Dual y-axis to show "correlation" | Two metrics, one chart | Separate charts; if correlation is the story, establish it statistically first |
| Gridlines heavier than data | Default chart styling | Light gray major gridlines only; data elements in higher-contrast color |
| Legend instead of direct labels | Auto-generated | Label lines/bars directly when possible; reduce eye-travel (Tufte) |
| Trend line on a scatter with no correlation | "Makes it look more technical" | Add trend line only when the statistical relationship warrants it (show R²) |
| Dashboard requires scrolling for primary KPIs | Too many metrics, no prioritization | Ruthlessly prioritize; top row has ≤7 key metrics; everything else is secondary |
| Inconsistent y-axis scales across small multiples | Auto-scale per chart | Lock all small-multiple charts to the same y-axis range; different scales prevent comparison |
