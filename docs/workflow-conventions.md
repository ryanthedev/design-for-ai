# Design Workflow Conventions

The shared contract for the research → plan → mock → build design lifecycle. Commands and agents in this plugin cite this document; they do not restate it.

---

## Table of Contents

1. [The four-stage lifecycle](#1-the-four-stage-lifecycle)
2. [Artifact gates](#2-artifact-gates)
3. [Design done-when vocabulary](#3-design-done-when-vocabulary)
4. [Pillar dispatch conventions](#4-pillar-dispatch-conventions)
5. [Handoff chain](#5-handoff-chain)

---

## 1. The four-stage lifecycle

| Stage | Command | Purpose | Output artifact |
|-------|---------|---------|----------------|
| **Research** | `/design-for-ai:research` | Extract the design brief — who, what, feel, JTBD, device, constraints | `.design-foundations/research/YYYY-MM-DD-<slug>.md` |
| **Plan** | `/design-for-ai:plan` | Decompose the brief into phased design stages with matched pillar skills and done-when items | `.design-foundations/plans/YYYY-MM-DD-<slug>.md` |
| **Mock** | `/design-for-ai:mock` | Render a cheap prototype from the plan direction; cross-pillar validation on pixels; user sign-off gate | `mocks/<page>.html` + screenshot + review findings |
| **Build** | `/design-for-ai:build` | Gated phase execution: per-phase BUILD → REVIEW → commit; produces the full design artifact set | DESIGN.md + JOURNEY.md + tokens + final mocks + trust report |

Stages chain in order. Each names the next stage in its handoff. Stages may be entered mid-lifecycle when prior artifacts exist (e.g., plan resumes at Design when DESIGN.md is already locked).

---

## 2. Artifact gates

Two artifacts gate progression. These gates are non-negotiable — no command or agent bypasses them.

### DESIGN.md gate

**DESIGN.md must be locked before any of the following proceed:**
- Token generation via `palette.mjs`
- Styled (high-fi) mock production
- Design-system component authoring
- The `build` command's Design phases

DESIGN.md is produced by the core `design` mode. It contains: register, archetype, personality, primary/secondary surface, the CSS custom-property token block (output of `palette.mjs`), type scale, and motion budget. "Locked" means the token block is present and the user has confirmed the direction.

When DESIGN.md is absent: proceed in wireframe mode (greyscale defaults), flag the missing gate, and note that the core `design` mode establishes tokens.

### JOURNEY.md gate

**JOURNEY.md (page specs section) must exist before:**
- Page-level mock production (the mock command needs page structure)
- The build command's page-by-page phase execution

JOURNEY.md is produced by the `journey` pillar. It contains: Job/Journey (JTBD and journey map), IA/Sitemap, User flows, and Page specs. The Page specs section is the direct input to the prototype skill.

When JOURNEY.md is absent: wireframe-mode mocks scaffold generic page structure. Flag the missing gate; note that the `journey` pillar produces page specs.

---

## 3. Design done-when vocabulary

Design done-when items use measurable design signals, not vague completeness. Use these in plan phases and agent verification.

### Contrast

| Signal | Threshold | Tool |
|--------|-----------|------|
| Text on background passes WCAG AA | ≥ 4.5:1 for body text; ≥ 3:1 for large text (18pt+) | `palette.mjs` outputs WCAG-checked tokens by construction; verify via computed ratio |
| Interactive element contrast passes WCAG AA non-text | ≥ 3:1 against adjacent color | Manual or palette.mjs semantic alias inspection |
| Dark-mode and light-mode both pass | Both ramps verified | `palette.mjs` generates both; check both output blocks |

### Token coverage

| Signal | What it means |
|--------|--------------|
| All semantic aliases resolved | `--background`, `--surface`, `--text`, `--accent-solid` etc. map to neutral/accent ramp values in DESIGN.md |
| Type scale present | `--text-xs` through `--text-4xl` (or equivalent) defined |
| Functional colors present | `--error-*`, `--success-*`, `--warning-*`, `--info-*` defined with 3/9/11 ramp levels |
| No hard-coded hex/rgb in mock | All color references use CSS custom properties from the token block |

### Heuristic pass

A phase passes the heuristic gate when the design-review-agent's cross-pillar synthesis returns no Critical findings and Major findings are either resolved or explicitly accepted with a rationale.

| Severity | Gate behavior |
|----------|--------------|
| Critical (breaks purpose/readability/accessibility) | Blocks the phase — must resolve before commit |
| Major (visible impact, user harm) | Flags for resolution; phase may commit with an explicit acceptance note |
| Minor (missed opportunity) | Logged; does not block |

### Artifact presence

| Done-when item | How to verify |
|---------------|--------------|
| DESIGN.md locked | File exists at project root; contains the CSS token block; user has confirmed direction |
| JOURNEY.md page specs present | JOURNEY.md exists; `## Page specs` section has at least one complete page entry |
| Mock renders | `.html` file exists and opens without errors (self-contained; no missing deps) |
| Screenshot captured | Browser MCP returned a PNG path (or graceful fallback: HTML exists + open note emitted) |

---

## 4. Pillar dispatch conventions

The workflow commands load pillars by name — `Skill(usability)`, `Skill(journey)`, etc. — as part of each phase. The pillars remain auto-triggerable by their descriptions (user decision; see plan decision log).

**Dispatch order within a phase (convention, not law):**
1. Load the phase's assigned pillar skill(s) via `Skill()`
2. Execute the phase artifact using the pillar's procedure
3. Validate with design execution evidence (contrast/token/heuristic per §3)
4. Dispatch the design-review-agent for independent cross-pillar critique
5. Resolve Critical findings; log Major; commit

**Pillar assignment to lifecycle stages:**

| Lifecycle stage | Primary pillar(s) | Gate artifact |
|----------------|-------------------|---------------|
| Discover — JTBD + journey | `journey` | JOURNEY.md (Job + Journey + IA sections) |
| Discover — flows + page specs | `journey` | JOURNEY.md (Flows + Page specs sections) |
| Design — DNA + tokens | core `design-for-ai` | DESIGN.md (locked) |
| Design — typography + color | core `design-for-ai` | DESIGN.md (type scale + token block updated) |
| Design — design system | `design-systems` | Token tiers + component specs in DESIGN.md |
| Design — words | `content-design` | Page specs updated with microcopy, labels, errors |
| Design — data surfaces | `data-viz` | Chart/table specs in page specs |
| Mock | core `prototype` | `mocks/<page>.html` + screenshot |
| Review | `design-review-agent` dispatches applicable pillars | Cross-pillar findings report |

---

## 5. Handoff chain

Each stage hands off to the next with a named command and the relevant artifact path.

```
research  →  "Run /design-for-ai:plan <research-doc>"
  plan    →  "Run /design-for-ai:mock <plan-path>"
  mock    →  "Direction approved: run /design-for-ai:build <plan-path>"
           OR "Direction rejected: loop to /design-for-ai:plan <plan-path>"
  build   →  Trust report + final artifact set
```

Mid-lifecycle entry is valid. If DESIGN.md exists, `plan` resumes at the Design stage and skips Discover. If a plan exists, `mock` and `build` consume it directly without re-running research/plan.
