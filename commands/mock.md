---
description: "Produce a cheap mock from the design plan and gate on user sign-off before committing to the full build. Dispatches the design-build-agent (via prototype skill) to render a viewable mock, then the design-review-agent for a cross-pillar validation on the rendered pixels. Use after plan, before build, to prove the design direction on real pixels cheaply."
argument-hint: "[plan path]"
---

# Command: mock

The cheap go/no-go checkpoint. `mock` renders a throwaway-fidelity prototype from the plan's direction, runs a cheap cross-pillar validation on the rendered pixels, presents the screenshot and findings, then **gates on your sign-off** — prove the direction before paying for the full phased `build`.

This command obeys the shared contract in `docs/workflow-conventions.md` (the lifecycle, the DESIGN.md/JOURNEY.md gates, the design done-when vocabulary) and cites it rather than restating it. It **dispatches** the two agents — it never inlines the design or the review work.

**Mock → Validate → Present → Sign-off gate → Chain or loop.**

---

## STOP - Read the Input First

`$ARGUMENTS` is the **plan path** (e.g. `.design-foundations/plans/2026-06-20-acme.md`).

- **Path to an existing plan:** `Read` it. You need its Context (for your own framing), the design direction, and the page(s) to mock.
- **No path given:** `ls .design-foundations/plans/*.md` and ask "Which plan should I mock?"
- **Path does not exist:** say so and ask for the right path.

Then scan the design state — this sets the mock fidelity:

```
ls DESIGN.md JOURNEY.md 2>/dev/null
```

| Artifacts present | Mock fidelity | Flag to surface |
|---|---|---|
| DESIGN.md locked (token block present + user-confirmed) | **Styled** — full tokens applied | — |
| DESIGN.md absent or not locked | **Wireframe** — greyscale defaults | "Design isn't locked yet — this is a wireframe checkpoint. The core `design` mode establishes tokens." (workflow-conventions.md §2) |
| JOURNEY.md present | Mock the page(s) from its page specs | — |
| JOURNEY.md absent | Scaffold generic page structure | "No JOURNEY.md page specs — mocking generic structure." |

`mock` is a **checkpoint, not the build.** Keep it cheap: mock the one or two highest-signal pages from the plan, not every surface.

---

## Step 1 — Dispatch the build-agent to produce the mock (via `prototype`)

Dispatch `design-build-agent` in **minimal-gate** mode (cheap — no discovery pass) to render the mock. The agent routes the mock through the **`prototype`** skill (its Render evidence path) — that is how `mock` consumes the prototype skill without inlining it.

```
Agent tool:
- subagent_type: "design-build-agent"
- description: "MOCK — render checkpoint prototype"
- prompt: |
    Produce a throwaway-fidelity mock for a design checkpoint. This uses
    minimal gate policy — skip discovery, produce directly. Render the
    mock via the `prototype` skill; do not hand-roll HTML.

    ## Goal
    Render a viewable [styled | wireframe] mock of [the page(s) named below]
    so the user can judge the design direction on real pixels before the
    full build. This is a CHEAP checkpoint, not a finished artifact —
    fidelity is throwaway.

    ## Plan
    Plan file: [plan path]
    Mock these page(s): [name the 1-2 highest-signal pages from the plan]
    Fidelity: [styled if DESIGN.md locked, else wireframe — from the table above]

    ## Done-When Items (DW-IDs)
    - [ ] DW-MOCK.1: a self-contained .html mock renders for each named page.
    - [ ] DW-MOCK.2: when DESIGN.md is locked, its tokens are applied (styled);
          when absent, wireframe greyscale defaults are used and flagged.
    If any item cannot be met, return UPDATE_PLAN.

    ## Inputs
    - Plan file: [plan path]
    - DESIGN.md / JOURNEY.md at the project root if present (the prototype
      skill reads them; wireframe mode when DESIGN.md is absent).

    ## Output
    Return the .html path(s), the screenshot path (or the "browser MCP down —
    open the .html" note), and which fidelity you used.
```

Capture from the agent's report: the `.html` path(s), the screenshot path (or the graceful no-screenshot note), and the fidelity used. If the agent returns BLOCKED or UPDATE_PLAN, surface it to the user and stop — do not proceed to review on a missing mock.

---

## Step 2 — Dispatch the review-agent for cheap cross-pillar validation

Dispatch ONE `design-review-agent` for a cheap validation on the rendered pixels.

**Debiasing rule (do not violate).** The reviewer gets **requirements + the rendered artifact ONLY** — NO plan Context, NO "this is our direction," NO account of how the mock was made. Conclusion framing collapses defect detection (the agent enforces this too, but the dispatch must not break it).

```
Agent tool:
- subagent_type: "design-review-agent"
- description: "MOCK validation — cross-pillar critique on pixels"
- prompt: |
    Independently critique the rendered design surface below against the
    requirements below. You did not produce it and have no information about
    how or why it was made. Do NOT assume it is good or finished. Re-derive
    every finding from the rendered artifact + the requirements alone.

    ## Requirements to verify (Done-When items)
    - DW-MOCK.1: the mock renders a viewable surface for the named page(s).
    - DW-MOCK.2: text/interactive contrast and applied tokens hold on the
      rendered pixels (styled), or wireframe structure is sound (wireframe).

    ## The rendered artifact
    - Screenshot: [screenshot path from Step 1, or "none — browser MCP down"]
    - .html: [.html path(s) from Step 1]
    - DESIGN.md / JOURNEY.md at the project root if present.

    ## Output
    Write the cross-pillar findings report to:
    .design-foundations/build/[plan-slug]-mock-review.md
    Return: DESIGN-REVIEW [PASS|FAIL] and the report path.
```

The review-agent triages the surface, dispatches only applicable pillars (visual + usability always; others only when their signal is present), and synthesizes ONE severity-ranked report. On the no-screenshot path it critiques structure and notes the missing pixel evidence — graceful, never an error.

---

## Step 3 — Present the screenshot + findings

Show the user, compactly:
- The **screenshot** (or, if the browser MCP was down, the `.html` path to open + the noted pixel-evidence gap).
- The fidelity used, and the **"Design isn't locked"** flag if it applies.
- The review-agent's **severity-ranked findings** (Critical / Major / Minor), and any pillars it deferred.

This is the evidence the user signs off (or rejects) the direction on.

---

## STOP — Sign-off Gate (MANDATORY — do not proceed silently)

`mock` does NOT auto-advance to `build`. Present the evidence, then **ask the user to decide the direction.** This gate is a user decision — never resolve it yourself, never proceed without an explicit answer.

Ask:

```
Direction check — does this mock prove the right design direction?

- [ ] Approve → proceed to the full build
- [ ] Adjust → loop back to plan/Design with these findings
```

| User decision | Action |
|---|---|
| **Approve** | Chain to build: `/design-for-ai:build [plan path]`. State: "Direction approved — running the gated build." |
| **Adjust / reject** | Loop back: `/design-for-ai:plan [plan path]`, carrying the review findings (especially Critical/Major) so the next pass addresses them. State: "Direction not yet right — looping to plan/Design with the findings; not proceeding to build." |

**Never proceed to `build` without an explicit Approve.** A rejected (or unanswered) direction loops to `plan` — there is no silent proceed (workflow-conventions.md §5; this command's reason for being).
