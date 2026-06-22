---
description: "Turn a design brief into a phased design plan: clarify gaps, classify complexity, decompose into lifecycle stages (Discover/Design), assign pillar skills per phase, and set design done-when items (contrast ratios, token coverage, heuristic pass). Use after research, or standalone when the brief is already known."
argument-hint: "[research doc path or brief description]"
---

# Command: plan

The plan is a contract between `plan` and `build`. It specifies WHAT to design and WHY at the strategic level, with explicit artifact seams between phases. It **references and sequences** the pillar skills — it never copies their content.

This command obeys the shared contract in `docs/workflow-conventions.md` (the lifecycle, the artifact gates, the done-when vocabulary) and cites it rather than restating it.

---

## STOP - Read the Input First

`$ARGUMENTS` is either a **research-doc path** or a **brief description**:

- **Path to an existing file** (e.g. `.design-foundations/research/2026-06-20-acme.md`): `Read` it. Its confirmed brief seeds the problem statement directly — you clarify only the gaps it left open, not the whole brief.
- **Path that does not exist:** say so ("No file at `<path>` — treating it as a brief description"), then use the text as the brief.
- **Plain text (not a path):** treat it as the brief and proceed.
- **Empty:** ask the user what they want to design.

A research doc carries confirmed intent. **Do not re-derive the brief from scratch** — read it, then fill only the gaps.

---

## STOP - Scan the Design State (sets the entry stage)

Before classifying, detect which design artifacts already exist. This decides where the plan *enters* the lifecycle — you do not re-plan work that is already done.

```
ls DESIGN.md JOURNEY.md 2>/dev/null
```

| Artifacts present | Entry stage | What the plan covers |
|---|---|---|
| Neither | **Discover** | Full lifecycle: Discover → Design |
| JOURNEY.md only | **Design — DNA** | Skip Discover; plan the Design stages from DNA onward |
| DESIGN.md locked (token block present + user-confirmed) | **Design — continue** | Skip Discover and DNA; plan the remaining Design stages (tokens, system, words, data) |
| Both | **Design — compose** | Plan only the unfinished Design stages |

State the entry stage explicitly: "DESIGN.md is locked — resuming at the Design stage; Discover is already done." **Never redo a stage whose gating artifact already exists.** This is the mid-lifecycle resume contract (workflow-conventions.md §5).

---

## STOP - Quick Classification

Read the brief and make an instant complexity call.

| Signal in the brief | Track |
|---|---|
| One surface, focused ask. "make this landing page feel premium." User knows the target even if not the execution. | **Quick** |
| A product with several surfaces, multiple audiences, "how should this flow", needs a journey + a design system | **Standard** |
| A redesign, a multi-surface product, a new brand from nothing, high uncertainty across both Discover and Design | **Full** |

**Default to Quick.** Under-planning a simple design is cheap to fix; over-planning a one-surface polish wastes the user's time. Only upgrade when the signals clearly demand it. A mid-lifecycle resume (DESIGN.md already locked) almost always shrinks the track — there is less left to plan.

---

## Before Planning (all tracks)

These steps produce the confirmed problem statement that anchors all downstream phases.

### 1. Clarify gaps

Load `Skill(clarify)`. Ask questions via `AskUserQuestion` until the answers are decisive and no new gaps remain. A research doc usually answers most of this — clarify **only its open questions** (missing brand context, vague mood words, undefined audience, scope faults).

**Cap: 5 rounds.** If still unclear at the cap, state your remaining assumptions explicitly and ask the user to object.

### 2. Problem statement

Write:

- **Problem:** 1-2 sentences — what we're designing and the job it does
- **Constraints:** non-negotiable boundaries (brand, device class, timeline, platform)
- **Success criteria:** how we know the design is done (in design terms — readable, on-brand, accessible, the journey works)

Confirm via `AskUserQuestion`: "Does this capture what you want to design?" Corrections → update and re-confirm. New gaps → re-enter clarify on those gaps. This becomes the plan's `## Context`. **No plan writing begins until the problem statement is confirmed.**

---

## The lifecycle the phases decompose into

Every phase maps to one lifecycle stage. The stage fixes the pillar(s) and the gating artifact (workflow-conventions.md §1, §4).

| Stage | Concern | Pillar(s) | Gating artifact (Produces) |
|-------|---------|-----------|----------------------------|
| **Discover — JTBD + IA** | how the user moves through time | `journey` | JOURNEY.md (Job + Journey + IA) |
| **Discover — flows + page specs** | the route + page structure | `journey` | JOURNEY.md (Flows + Page specs) |
| **Design — DNA + tokens** | the visual identity | core `design-for-ai` (design mode) | DESIGN.md **locked** (token block) |
| **Design — type + color** | typography + palette | core `design-for-ai` (fonts/color) | DESIGN.md (type scale + tokens) |
| **Design — design system** | look → a token machine | `design-systems` | token tiers + component specs |
| **Design — words** | words as interface | `content-design` | page specs + microcopy |
| **Design — data surfaces** | encode data truthfully | `data-viz` | chart/table specs |

Match extra pillars by their disjoint scopes (`docs/pillar-taxonomy.md`): `usability` for operability of a screen, `behavioral` for persuasion/conversion mechanics, `deceptive-patterns` for the ethics audit, `ai-native` for agent/LLM surfaces. **The plan loads pillars by name** (`Skill(<pillar>)`) and sequences them — it never duplicates their procedures. Pillars stay triggerable regardless.

### The lifecycle DAG and its gates (non-negotiable)

Dependencies point inward, toward the earliest locked artifact. The DAG is **acyclic** — no stage's output feeds a stage it depends on.

```
research ─▶ JOURNEY.md ─▶ DESIGN.md(locked) ─▶ tokens / design-system
                 │               │                      │
                 └───────────────┴──▶ content + data compose ─▶ (mock)
```

Two gates cross these boundaries. Every plan you write must honor them:

1. **JOURNEY.md page specs exist before any Design page work.** Design cannot lay out surfaces the journey has not specified.
2. **DESIGN.md is locked before tokens, the design system, styled mocks, or any build Design phase.** A token machine has nothing to systematize until the DNA is fixed.

Order the phases so each phase's gating artifact is produced before any phase that consumes it. Discover phases come before Design phases; the DNA phase comes before tokens/system/compose. If you ever find a phase consuming an artifact a *later* phase produces, the decomposition has a cycle — fix the order.

---

## Quick track (default)

**Problem statement confirmed → decompose → detail → cross-cut → save → check → present → handoff.** Even Quick is staged — don't write all phase bodies at once.

1. **Decompose (skeleton).** For each of the 1-2 phases write only: name, `**Stage:**` (Discover or Design), one-line goal, `**Skills:**` (the matched pillar(s) from the stage map; `none -- [reason]` valid, omission not), Difficulty. For 2 phases add `**Depends on:**` and `**Produces:**` (the artifact phase 1 hands phase 2 — JOURNEY.md, DESIGN.md, tokens). Write this skeleton to the plan file.

2. **Skeleton checkpoint** (2 phases only). `AskUserQuestion` — "Does the split look right? Review it in the preview." Options "Looks right" / "Adjust", **`preview` REQUIRED on both**: the identical split as markdown (each phase's name + stage + goal, and the artifact handoff between them). The preview is the only guaranteed-visible surface. 1 phase → skip.

3. **Detail each phase**, in order, one short pass each. Start with a one-line reframe — `Phase N: [name]. Stage: [Discover|Design]. Consumes: [upstream artifact, or "research doc"]. Must produce: [Produces]. Difficulty: X.` — then load the phase's matched pillars (`Skill(<pillar>)`; each self-loads its procedure and informs Edge cases + Done-when) and fill the body using the phase template below.

4. **Cross-cut.** Derive the verification plan from the done-when items, plus at least one dirty case (a gate violation or edge case from Edge cases) per phase: e.g. "DESIGN.md missing → wireframe mode flagged", "contrast fails AA → token rejected". Record the verification level.

5. **Finalize the file** against the schema (Quick variant: omit Chosen Approach, Rejected Approaches, Assumptions, Decision Log). Each phase carries `**Stage:**`, `**Skills:**`, `**Gate:**`. **Do NOT commit it.**

6. **Check** (step shared with Standard/Full — see below).

7. **Present and handoff** (shared — see below).

Quick stays compressed: under 3 minutes from invocation to handoff.

---

## Standard / Full track

For multi-surface products and redesigns, run the full staged decomposition **inline** (this plugin keeps planning in the command — there is no separate planning skill). Stages: DECOMPOSE → DETAIL → CROSS-CUT → SAVE → CHECK → PRESENT → HANDOFF. Each writes to the plan file in place.

**Thinking effort:** planning benefits from max effort. If not already at max, suggest the user raise it before proceeding.

### DECOMPOSE — fix the shape first

Get the phase shape and artifact seams right before writing bodies. Write the skeleton only.

For each phase write: **Name** + one-line goal · **Stage:** (Discover/Design) · **Depends on / Unlocks** (the edges) · **Produces:** (the gating artifact this phase hands its consumers — the explicit seam) · **Skills:** (matched from the stage map + pillar-taxonomy scopes) · **Difficulty:** LOW/MED/HIGH.

- Order phases so the DAG above holds: Discover before Design; DNA before tokens/system/compose. Express independent phases (e.g. words and data surfaces both depend only on DESIGN.md + page specs) as parallel, don't artificially linearize.
- **Resume-aware:** if the design-state scan set the entry at Design, the skeleton omits the Discover phases entirely (their artifacts already exist) and starts at the first unsatisfied Design stage. Say which phases were skipped and why.
- **YAGNI:** each phase must produce an artifact meaningful to `build` and verifiable by the review agent. If a stage isn't needed (no data surfaces → no `data-viz` phase), drop it.
- **Phase cap: 7.** More than 7 → split into multiple plans.

**Skeleton checkpoint.** The skeleton travels INSIDE the `AskUserQuestion` `preview` field — Write results render collapsed and prose is skipped under tool-chaining. Do NOT write the file first.

`AskUserQuestion` — "Does the N-phase decomposition look right? Review the skeleton in the preview." Options "Looks right" / "Adjust", **`preview` REQUIRED on both**, carrying the identical skeleton:

```markdown
## Skeleton: N phases
1. **[Name]** — [goal]  ·  Stage: Discover  ·  Skills: journey  (MED)
   produces: JOURNEY.md (Job+Journey+IA) → Phase 2
2. ...
DAG: 1 → 2 → 3 → {4, 5}    gates: JOURNEY.md before Design; DESIGN.md locked before tokens
```

On "Adjust": revise, re-ask with the updated skeleton. After "Looks right": write the skeleton to the plan file (header + Context + Constraints + Chosen Approach, then one header per phase). Built progressively; recoverable if interrupted. Do not commit.

### DETAIL — one phase at a time

Work phases in DAG order, a deliberate reset between each so each gets fresh attention.

**1. Reframe** (write it before the body): `Phase N: [name]. Stage: [Discover|Design]. Consumes: [upstream artifact, or "research doc"]. Must produce: [Produces]. Difficulty: [X].`

**2. Load the phase's pillars** — `Skill(<pillar>)` for each not already loaded; each self-loads its checklists. Apply them while writing Constraints, Edge cases, and Done-when. If the work reveals a pillar the skeleton missed, add it.

**3. Write the body** using the template. **4. Move to the next phase.**

### CROSS-CUT — the whole-plan sections

Derive once every phase body exists. Verification plan: one item per done-when across all phases, plus boundary + dirty cases from the Edge cases (gate violations: missing DESIGN.md, contrast below AA, absent page specs). Fill the Assumptions and Decision Log from choices made during DETAIL.

### SAVE — annotate and validate

Assign `**Model:**` and `**Gate:**` per phase, then validate the whole file against the schema.

- **Model:** `opus` for DNA/identity creation and full-product decomposition; `sonnet` for most stage phases; `haiku` for a single mechanical artifact update.
- **Gate:** **Full** for the DNA phase (it locks DESIGN.md — the law-once-locked artifact) and for multi-surface Design phases introducing new seams; **Minimal** for a single doc/spec update; **Standard** otherwise.
- **Skills validation:** every phase has `**Skills:**`; every name is one of the 9 design skills (core `design-for-ai`, usability, content-design, data-viz, deceptive-patterns, behavioral, journey, design-systems, ai-native); no workflow commands (research, plan, mock, build, clarify); a Design/Discover phase with `none` justifies why no pillar matches.

---

## Phase template (all tracks)

```markdown
### Phase N: [Name]
**Stage:** [Discover | Design]
**Model:** [haiku | sonnet | opus]
**Skills:** [matched pillar(s), or `none -- [reason]`]
**Gate:** [Full | Standard | Minimal]

**Goal:** [One sentence]

**Scope:**
- IN: [covered]
- OUT: [excluded]

**Constraints:** [non-discoverable requirements -- omit if none]
**Edge cases:** [gate violations + boundaries this phase handles -- omit if none]

**Produces:** [the gating artifact downstream consumes -- JOURNEY.md / DESIGN.md(locked) / tokens / page specs. Name the section, not prose.]
**Depends on:** [Phase X / research doc] | **Unlocks:** [Phase Y]

**Done when:**
- [ ] DW-N.1: [verifiable design criterion -- use the workflow-conventions §3 vocabulary]
```

**Design done-when vocabulary** (workflow-conventions.md §3 — use these, never code/test vocabulary):

- **Contrast:** "all text/background pairs pass WCAG AA (≥4.5:1 body, ≥3:1 large), verified via `palette.mjs`"; "interactive elements pass AA non-text (≥3:1)"; "dark + light ramps both pass".
- **Token coverage:** "all semantic aliases resolved (`--background`, `--surface`, `--text`, `--accent-solid`)"; "type scale `--text-xs`…`--text-4xl` present"; "functional colors (`--error/success/warning/info-*`) defined"; "no hard-coded hex in the mock".
- **Artifact presence:** "DESIGN.md locked (token block present + user-confirmed)"; "JOURNEY.md `## Page specs` has ≥1 complete page entry"; "mock renders (self-contained `.html`, no missing deps)".
- **Heuristic pass:** "design-review-agent cross-pillar synthesis returns no Critical findings; Major findings resolved or explicitly accepted".

**DW-ID format:** `DW-{phase}.{item}`. ~250-word cap per phase body.

---

## CHECK (all tracks)

Dispatch a sonnet subagent to review the saved plan with fresh eyes. Never skip.

```
Agent: sonnet, "Review design plan"
Prompt: Review .design-foundations/plans/<plan>.md for structural issues.

Checklist:
- Lifecycle: every phase has a Stage (Discover/Design); phases ordered so the DAG holds
  (Discover before Design; DNA before tokens/system/compose); no phase consumes an artifact
  a later phase produces (no cycle).
- Gates: JOURNEY.md page specs produced before any Design page phase; DESIGN.md locked before
  any tokens/design-system/styled-mock phase. Flag any gate inversion.
- Done-when: every item uses design vocabulary (contrast/token/artifact/heuristic), is
  observable, and has a DW-ID. No code/test vocabulary.
- Skills: every phase has a Skills field; each name is one of the 9 design skills; matches the
  stage; no workflow commands.
- Resume: if entry was mid-lifecycle, the skipped stages' artifacts actually exist; no redone work.
- Gate/Model: every phase has Gate (Full/Standard/Minimal) and Model populated, matching risk.

Output: PASS or FINDINGS with specific fixes.
```

PASS → proceed. FINDINGS → fix; **structural fixes (phase order, DAG, gate inversions, DW set) → re-run CHECK**; minor fixes → proceed.

---

## PRESENT and HANDOFF (all tracks)

Print the plan summary as markdown in conversation — phases with stages, goals, matched pillars, done-when, the gate order — then `AskUserQuestion`: "Does this look right?" Options "Approve" / "Request changes", **`preview` REQUIRED on both** (the identical summary) — the user won't open the saved file and Write results render collapsed.

Changes → update; structural changes re-run CHECK; minor changes re-present.

On approve, hand off to mock — the cheap go/no-go on rendered pixels before the full build:

```
/design-for-ai:mock .design-foundations/plans/<plan>.md
```

The mock command reads this plan, renders a prototype from its DESIGN.md direction, runs a cross-pillar validation, and gates on your sign-off before `build`.

---

## Chain

- **Receives from:** `research` (via the research doc), or a direct brief.
- **Chains to:** `mock` (via the saved plan file).
