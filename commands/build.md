---
description: "Execute an approved design plan through gated phases (BUILD → REVIEW → commit) with subagent dispatch. Produces JOURNEY.md, DESIGN.md, design-system tokens, and final mocks. Use when a design plan exists and the direction is approved — per-phase quality gates, design execution evidence (contrast/token/heuristic), and a final trust report."
argument-hint: "[plan path]"
---

# Command: build

**Goal:** Load the design plan → set up the branch → execute each phase (design-build-agent → design-review-agent → commit) → produce the final artifacts (DESIGN.md, JOURNEY.md, tokens, mocks) → write the trust report.

Each phase dispatches the design-build-agent (produces the design artifact with execution evidence: contrast checks via palette.mjs, mock render, token coverage) then the design-review-agent (independent cross-pillar critique on the rendered pixels). A phase is complete when both agents pass and the design done-when items are covered.

---

## Body (Phase 5 implements this)

Full gated-build flow is implemented in Phase 5. This stub establishes the command and its gate invariants.

**Gate invariants (never skip):**
- Never build on main/master — worktree or feature branch required
- Load plan before any design work — no plan = no done-when criteria
- BUILD before REVIEW on each phase
- DESIGN.md must be locked before tokens/mocks proceed
- JOURNEY.md page specs must exist before page mocks proceed
- Mark a phase complete only when design execution evidence passes (contrast/token/heuristic)
