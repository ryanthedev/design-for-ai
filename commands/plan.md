---
description: "Turn a design brief into a phased design plan: clarify gaps, classify complexity, decompose into lifecycle stages (Discover/Design), assign pillar skills per phase, and set design done-when items (contrast ratios, token coverage, heuristic pass). Use after research, or standalone when the brief is already known."
argument-hint: "[research doc path or brief description]"
---

# Command: plan

**Goal:** Produce a phased design plan saved to `.code-foundations/plans/YYYY-MM-DD-<slug>.md`. Each phase maps to the design lifecycle (Discover → Design) and carries: matched pillar skills, artifact gates (DESIGN.md, JOURNEY.md), and measurable done-when items.

This command reads the research doc (or brief), invokes `clarify` for any remaining gaps, and decomposes the work into phases with explicit design done-when criteria. It does not execute the design — it structures it so `mock` and `build` can proceed without ambiguity.

---

## Body (Phase 3 implements this)

Full plan-authoring flow is implemented in Phase 3. This stub establishes the command and its chain.

**Next stage:** When the plan is saved and confirmed, run `/design-for-ai:mock <plan-path>`.
