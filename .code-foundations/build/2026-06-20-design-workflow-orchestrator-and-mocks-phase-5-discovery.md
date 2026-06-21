# Discovery + Design: Phase 5 - mock + build commands

## Files Found
- `commands/mock.md` — Phase-1 stub: valid frontmatter (description + argument-hint), goal line, a "Body (Phase 5 implements this)" placeholder, and the sign-off chain skeleton (approved → build, rejected → plan). Needs full body.
- `commands/build.md` — Phase-1 stub: valid frontmatter, goal line, "Body (Phase 5 implements this)" placeholder, gate invariants list. Needs full body.
- `docs/workflow-conventions.md` — the shared contract (lifecycle, DESIGN.md/JOURNEY.md gates, design done-when vocabulary, pillar dispatch order, handoff chain). Both commands cite it.
- `agents/design-build-agent.md` — Phase-4 agent. Dispatched as `design-build-agent`. Loads `## Additional Skills`, produces phase artifact, validates with design execution evidence (contrast via palette.mjs / render via prototype / tokens applied). Has Mode Detection ("minimal gate" → Minimal; else Full). Output: `## BUILD Complete` with `### Status: DONE | SKIP | UPDATE_PLAN | BLOCKED`.
- `agents/design-review-agent.md` — Phase-4 agent. Dispatched as `design-review-agent`. Independent (requirements + rendered artifact ONLY, zero intent-framing). Step 0 render-first; triage → dispatch applicable pillars → synthesize ONE ranked report; cap+name-deferred; graceful no-screenshot path. Returns `DESIGN-REVIEW [PASS|FAIL]. Report written to [path]`.
- `skills/prototype/SKILL.md` — the mock generator. `user-invocable: true`, `argument-hint: "[page name or spec, fidelity: wireframe|styled]"`. Reads DESIGN.md tokens + JOURNEY.md page specs; greyscale wireframe defaults when DESIGN.md absent; graceful render loop (screenshot when MCP up, .html + note when down). The build-agent already wires `prototype` for its Render evidence.
- `commands/research.md`, `commands/plan.md` — Phase 2/3 in-plugin commands. Establish the house style: inline the body, cite `docs/workflow-conventions.md`, no `${CLAUDE_PLUGIN_ROOT}/references/` tree.
- Reference template (read-only): `code-foundations/commands/build.md` + its `references/{worktree-gate,commit-format,dispatch-templates,trust-report}.md`.

## Current State
The two execution commands are frontmatter-valid stubs. Phases 1-4 built every dependency they consume: the conventions doc, the two agents, the prototype skill, the plan structure. This phase replaces the two stub bodies with full bodies, keeping the existing frontmatter.

## Gaps
| Gap | Resolution |
|-----|-----------|
| code-foundations build.md references a `references/*.md` tree (worktree-gate, dispatch-templates, commit-format, trust-report) under its own plugin root | This plugin's commands (research/plan) inline their bodies and cite `docs/workflow-conventions.md`. Per the file hint, **inline the proportional essentials** (worktree gate, per-phase dispatch, commit format, trust report) into `commands/build.md` rather than building a parallel references tree. The DW list is the floor — no DW needs a separate references tree. |
| code-foundations dispatches `code-foundations:build-agent` / `post-gate-agent` | Re-ground to `design-build-agent` / `design-review-agent` (this plugin's Phase-4 agents). |
| code-foundations gates on tests/coverage | Re-ground to design execution evidence (contrast/token/heuristic per workflow-conventions §3) — the agents already speak this. |
| mock command has no equivalent in code-foundations | mock is the new 4th-stage checkpoint. Authored fresh: dispatch build-agent (mock via prototype) → dispatch review-agent (cheap validation) → present screenshot+findings → sign-off gate → chain or loop. |

## Code Standards
No `docs/code-standards.md` found. The governing conventions are `docs/foundations-standards.md` (≤1024-char descriptions, frontmatter) and `docs/workflow-conventions.md` (the lifecycle contract). Both stubs already carry compliant frontmatter — keep it.

## Test Infrastructure
Markdown command files — no unit-test framework. `validate_skill` does NOT apply to `commands/*.md` (they are not skill dirs). Verification is by desk check per the Test Substrate: file exists, frontmatter valid, required content + exact strings present, dispatch wiring + gates internally consistent.

## DW Verification

| DW-ID | Done-When Item | Status | Verification |
|-------|---------------|--------|--------------|
| DW-5.1 | `commands/mock.md` exists — dispatches build-agent (mock via prototype) + review-agent (cheap cross-pillar validation), presents screenshot+findings, gates on user sign-off, chains to build or loops to plan | COVERED | Desk check: build-agent dispatch block (Minimal mode for cheap, prototype via build-agent Render evidence), review-agent dispatch block, a "present screenshot + findings" step, an explicit sign-off gate, and both chain targets (`/design-for-ai:build` on approve, `/design-for-ai:plan` on reject). |
| DW-5.2 | `commands/build.md` exists — worktree gate, per-phase BUILD→REVIEW→commit dispatching the two agents, gate resolution (Full/Standard/Minimal), execution log, trust report | COVERED | Desk check: worktree gate section, per-phase loop dispatching design-build-agent then design-review-agent then commit, gate-resolution table (Full/Standard/Minimal), execution-log entry format, trust-report section. |
| DW-5.3 | both commands dispatch the agents (named, not reimplemented) and mock consumes the prototype skill | COVERED | Desk check: literal `design-build-agent` and `design-review-agent` subagent_type strings in both files; no inlined design-production or review logic; mock's build-agent dispatch routes the mock through the `prototype` skill (the build-agent's Render evidence path), and mock references prototype explicitly. |
| DW-5.4 | mock's sign-off gate and build's worktree gate are explicit; rejecting the mock loops to plan (no silent proceed) | COVERED | Desk check: mock has a STOP/gate block requiring explicit user sign-off before any build dispatch, with the reject branch routing to `/design-for-ai:plan` and a "do not proceed silently" instruction; build has a MANDATORY worktree gate that blocks on main/master. |

**All items COVERED:** YES (4 DW-IDs in prompt = 4 DW-IDs in table)

## Design Decisions

**1. Inline, don't build a references tree (matches this plugin's house style).** research.md and plan.md inline their bodies and cite `docs/workflow-conventions.md`. build.md mirrors code-foundations' *structure* (the gate machinery) but inlines the proportional essentials — worktree gate, per-phase dispatch prompts, commit format, trust report — directly in the command body. No `references/*.md` tree; the DW floor doesn't need one. (`prompt` principle: smallest high-signal set; don't over-build past what the contract needs.)

**2. mock dispatches the build-agent in Minimal mode for cheapness.** mock is a *checkpoint, not the build*. The build-agent's Mode Detection treats "minimal gate" → Minimal (skip discovery, produce directly). mock dispatches the build-agent with a minimal-gate, single-artifact brief: "produce a throwaway-fidelity mock via the `prototype` skill." This keeps it cheap and routes the mock through prototype (DW-5.3) via the agent's Render evidence path — mock dispatches, never inlines (plan constraint). (`agent` principle: scope the delegated job to fit; minimal effort for a bounded checkpoint.)

**3. mock's review is a CHEAP single review-agent dispatch, no intent-framing.** One `design-review-agent` call for the cross-pillar validation on the rendered pixels. The dispatch carries requirements + the rendered artifact path ONLY — no plan Context, no "this is our direction" framing (mirror code-foundations build.md's REVIEW debiasing rule; the agent enforces it too). (`agent` §5 / `prompt` REVIEW framing rule.)

**4. mock's sign-off gate is a hard STOP that cannot be auto-passed.** After presenting screenshot + findings, mock STOPS and asks the user to approve or reject the direction. Approve → `/design-for-ai:build <plan>`. Reject → `/design-for-ai:plan <plan>` carrying the findings. Explicit "do not proceed to build without sign-off" (DW-5.4). The gate is a user decision (AskUserQuestion-style), kept in the orchestrator, not delegated to a subagent (subagents can't ask the user — `agent` mechanics).

**5. mock no-DESIGN.md edge case → wireframe mode + flag.** If DESIGN.md isn't locked, the build-agent/prototype already fall to wireframe (greyscale) mode and flag it; mock surfaces "Design isn't locked — this is a wireframe checkpoint" so sign-off is informed.

**6. build mirrors code-foundations gate machinery, re-grounded.** LOAD (worktree gate + parse plan) → SETUP (status, model resolution, gate resolution, per-phase tasks) → EXECUTE (per-phase BUILD→REVIEW→commit dispatching the two agents) → VERIFY (final evidence: contrast/render across artifacts) → REPORT (trust report). REVIEW dispatch gets NO intent-framing (debiasing rule). "Tests" become design execution evidence; the agents already produce/check it.

**7. build worktree gate is the non-negotiable first check.** Mirror code-foundations: detect branch; block on main/master (ask worktree vs feature branch vs abort). Inlined as the first MANDATORY step (DW-5.4 + DW-5.2).

**8. Commit format re-grounded for design.** Conventional-commit subject + WHY body + trailers (Phase/Plan/AI-Model/AI-Epistemic-Status/Gate-Policy/Review). Re-ground epistemic status to design evidence (`tested` = evidence passed). Execution-log entry per phase feeds the next phase's Progress block.

## Prerequisites
- [x] commands/mock.md + commands/build.md stubs exist (frontmatter to keep)
- [x] design-build-agent + design-review-agent exist (Phase 4, committed f768e8a)
- [x] prototype skill exists (committed 1dc8f13)
- [x] docs/workflow-conventions.md exists (Phase 1)
- [x] plan structure exists (the file being executed)

## Recommendation
BUILD — replace both stub bodies with full bodies, keeping the existing frontmatter. Inline the proportional gate essentials into build.md; author the mock checkpoint flow fresh. Both DISPATCH the Phase-4 agents (named) and never inline the design work; mock routes its mock through the prototype skill and gates on explicit user sign-off.
