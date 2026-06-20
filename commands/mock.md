---
description: "Produce a cheap mock from the design plan and gate on user sign-off before committing to the full build. Dispatches the design-build-agent (via prototype skill) to render a viewable mock, then the design-review-agent for a cross-pillar validation on the rendered pixels. Use after plan, before build, to prove the design direction on real pixels cheaply."
argument-hint: "[plan path]"
---

# Command: mock

**Goal:** Render a low-cost prototype from the plan's direction, run a cross-pillar validation on the rendered pixels, present the screenshot and findings, then gate on user sign-off. If the direction is approved, chain to `build`. If rejected, loop back to `plan`.

This is the cheap go/no-go checkpoint: prove the design direction before paying for the full phased build.

---

## Body (Phase 5 implements this)

Full mock-and-gate flow is implemented in Phase 5. This stub establishes the command and its chain.

**Sign-off gate:**
- Direction approved → `/design-for-ai:build <plan-path>`
- Direction rejected → loop back to `/design-for-ai:plan <plan-path>` with the review findings
