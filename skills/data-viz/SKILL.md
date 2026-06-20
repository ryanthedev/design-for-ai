---
name: data-viz
description: "Applies data visualization and information design principles to encode data truthfully and efficiently. Use when the question is about charts or graphs — chart type selection (bar, line, scatter, heatmap, small multiples), data-ink ratio and chartjunk reduction (Tufte VDQI), preattentive attributes (Knaflic Storytelling with Data), dashboard layout and KPI design (Few Information Dashboard Design), truthful encoding and chart lie detection (Cairo How Charts Lie), marks and channels (Munzner), colorblind-safe palette selection for charts, or chart accessibility. Not for: brand or UI color palette generation (use core color mode); overall page composition and visual hierarchy (use core audit mode); data-display tables as a UI pattern (use usability); typeface or font selection (use core fonts mode); UI copy or writing (use content-design)."
user-invocable: true
argument-hint: "[chart, dashboard, or data to visualize]"
---

Encode data truthfully and efficiently — make the pattern in the data visible without distortion, chartjunk, or deceptive framing. Every recommendation cites its source: the principle, the author, or the empirical finding it traces to. The question of which chart to use is not a matter of taste; it has measurable right and wrong answers.

## When this applies

Reach for this skill when the question is about representing data visually:

- **Chart type selection** — which chart best encodes this data's relationships (comparison, distribution, correlation, composition, part-to-whole, time series, geographic, flow).
- **Chartjunk and data-ink** — removing decorative elements that add no information; increasing the ratio of meaningful ink to total ink (Tufte, *VDQI*, 1983).
- **Preattentive attributes** — using color, size, position, and shape to direct attention before conscious processing (Knaflic, *Storytelling with Data*, 2015; Ware, *Information Visualization*, 2004).
- **Dashboard layout and KPI design** — organizing multiple views for rapid comprehension; Few (*Information Dashboard Design*, 2006).
- **Truthful encoding** — detecting and fixing charts that lie through truncated axes, cherry-picked ranges, dual axes, and misleading proportions (Cairo, *How Charts Lie*, 2019).
- **Chart accessibility** — colorblind-safe palettes for data (distinct from brand palettes), alt-text for charts, pattern + color redundancy.
- **Marks and channels** — the rigorous encoding framework: what data type maps to which visual channel (Munzner, *Visualization Analysis & Design*, 2014).

Not the brand or UI color palette (core `color` mode), overall page composition and visual hierarchy (core `audit` mode), or data-display tables as a UI interaction pattern (use `usability`).

## Rules

Standing rules for every data visualization decision. Kept separate so they don't dissolve into the procedure.

- **Cite the principle.** Every recommendation names its source: "data-ink ratio (Tufte, 1983)", "preattentive: color encodes category, not quantity (Knaflic, 2015)", "dual-axis lie (Cairo, 2019)". No unsourced opinion.
- **Data-ink ratio is the primary editing heuristic.** Tufte (*VDQI*): maximize the ratio of data ink to total ink. Remove every element that does not encode information; what remains encodes all of it. The ratio is a direction, not a formula to compute.
- **Charts are arguments, not decorations.** Cairo (*The Functional Art*, 2012): every chart encodes a claim about reality. The designer's responsibility is to encode that claim accurately, even when it contradicts the preferred narrative. Deceptive framing is not neutral — it misleads.
- **Preattentive before attentive.** Knaflic: design for what the eye sees before the mind thinks. One preattentive attribute per chart (color, size, or position — not all three simultaneously for the same encoding dimension).
- **Colorblind safety is not optional.** ~8% of men and ~0.5% of women have color vision deficiency; red/green is the most common failure mode. For any chart that encodes information in color: use a colorblind-safe palette AND encode the same information redundantly in shape or pattern.
- **Stay generative.** Recommend the chart type, explain why via the data relationship it encodes, then show the encoding decisions. Do not audit against a checklist — the principles are the arbiter that lets you make and explain the recommendation.
- **Cite down only.** This skill cites usability laws where operability overlaps (e.g. Gestalt grouping in dashboards — usability-principles.md). It does not cite behavioral, journey, or content-design upward.

## Procedure

The engine has two modes; pick by what the user needs.

### A. Chart type selection and encoding

When asked which chart to use, or how to encode a specific dataset:

1. Read `references/chart-selection.md` — the chart-type decision table organized by data relationship.
2. Identify the **data relationship** the user needs to communicate: comparison, distribution, correlation, composition, part-to-whole, time series, ranking, deviation, geographic, or flow.
3. Match the relationship to the chart type via the decision table. **The data relationship, not the data format, determines the chart.**
4. Identify the **marks and channels** (Munzner): what visual element encodes what data dimension. Position on a common scale is most accurate; area and angle least accurate (Cleveland & McGill, 1984).
5. Apply data-ink editing: remove gridlines that don't aid reading, remove duplicate axes, remove background fills, reduce tick marks to what's needed.
6. Check colorblind safety if color encodes information.
7. Output the chart type recommendation with the data relationship + encoding rationale cited.

### B. Chart audit (truthfulness and clarity)

When reviewing an existing chart or dashboard for problems:

1. Read `references/viz-principles.md` — the why-engine.
2. Read `references/chart-selection.md` — the lies taxonomy (Cairo) and common mistakes.
3. Check for **chart lies**: truncated y-axis, dual-axis distortion, cherry-picked date range, pie chart with too many slices, 3D that encodes no depth dimension, area encoding that doesn't start at zero.
4. Check **data-ink ratio**: chartjunk, unnecessary gridlines, decorative fills, 3D effects on 2D data.
5. Check **colorblind safety**: does the chart survive a color-blind simulation (Coblis, Viz Palette)? Is color the only encoding dimension?
6. Check **context**: is the baseline visible? Are axes labeled with units? Is the time range clearly stated?
7. Output findings table: `Severity | Issue | Why it matters | Fix`, citing the principle for each.

### C. Dashboard layout

When designing or reviewing a multi-chart dashboard:

1. Read `references/viz-principles.md` (the preattentive and Gestalt sections).
2. Read `references/chart-selection.md` (the dashboard layout rules from Few).
3. Apply the **overview-first, detail-on-demand** principle (Shneiderman, 1996): key KPIs visible without scrolling; detail charts below the fold or in drill-down views.
4. Apply **Gestalt grouping** (Wertheimer): related charts share proximity or a common region; unrelated charts are visually separated. Gestalt grouping is the layout principle (cite usability-principles.md #gestalt-perception-laws).
5. Establish a **visual hierarchy**: the single most important metric is the most visually prominent. Preattentive attention is finite — spend it on the most important signal.
6. Check for **dashboard lies**: metrics without baselines, KPI cards without trend context, ratios without absolute denominators.

## References

| Reference file | Load when |
|----------------|-----------|
| `references/viz-principles.md` | Layer A — the why-engine: data-ink ratio, chartjunk taxonomy, preattentive attributes, marks and channels (Munzner), colorblind safety, the truthful-encoding principles, and critical caveats. The stable citeable reference for data visualization decisions. |
| `references/chart-selection.md` | Layer B — chart type decision table (by data relationship), dashboard layout rules (Few), the Cairo lies taxonomy, and common mistakes. The generative selection engine. |
