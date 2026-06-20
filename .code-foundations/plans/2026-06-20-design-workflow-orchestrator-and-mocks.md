# Plan: design-foundations workflow orchestrator + mock production

**Created:** 2026-06-20
**Status:** in-progress
**Started:** 2026-06-20
**Current Phase:** 1
**Complexity:** medium
**Workspace:** branch `feature/design-workflow-orchestrator` (main clean)

---

## Context

The design-foundations system (v3.0.0, on main) has 9 capable skills — the visual/surface core + 8 pillars — but two gaps surfaced in use:
1. **No front door / conductor.** The pillars trigger disjointly (correct for narrow questions), but there's no orchestration layer for the holistic design lifecycle or for holistic-quality requests ("make it look good", "is this any good", "improve the whole thing") — those currently land on the narrow visual core and the other pillars stay dark.
2. **No tangible output.** The system produces guidance + spec docs (DESIGN.md, JOURNEY.md, tokens) but never something you can *see*. It should produce mockups.

This plan adds: a `prototype` skill (renders self-contained HTML/CSS mocks from DESIGN.md tokens + JOURNEY.md page specs, with a graceful render+screenshot loop), an upgrade of core `audit` into a **holistic cross-pillar review conductor** (triages what's on the surface, dispatches only the pillars that apply, synthesizes ONE prioritized report on the *rendered pixels*), and a `studio` orchestrator skill that runs the **Discover → Design → Validate** lifecycle, dispatching the right skills per stage with `ai-native` as a cross-cutting lens.

## Constraints

- Respect the existing multi-skill architecture: each new skill follows the canonical SKILL.md + reference shape (docs/skill-authoring-template.md), ≤1024-char description, disjoint triggers with "Not for X (use Y)" disambiguation (docs/foundations-standards.md, docs/pillar-taxonomy.md).
- cite-the-principle; author via `oberskills:skill-craft` best practices.
- Each phase gated on `validate_skill` 0/0 + `test_triggers`.
- Mocks are **self-contained HTML/CSS** (DESIGN.md tokens as CSS custom properties; semantic HTML from JOURNEY.md page specs); framework export is out of scope for now.
- Render/screenshot loop is **graceful**: use the browser MCP (`oberskills:mcp-browser`) when connected; fall back to emitting the HTML with an "open to view" note when not. No hard MCP dependency.
- Disjoint triggering stays for narrow questions; the orchestrator/audit-conductor handles only the holistic ones. Don't break existing pillar/mode triggers.

---

## Chosen Approach

**Three disjoint, composable pieces** (per the clarify round): a new `studio` orchestrator skill (the front door, Discover→Design→Validate), a new `prototype` skill (self-contained HTML/CSS mocks + graceful render loop), and an upgrade of the existing core `audit` mode into the holistic cross-pillar Validate conductor (since "is this any good" already routes to audit). The orchestrator *calls* prototype (for mocks) and the upgraded audit (for Validate); it doesn't reimplement them. **Fallback:** if `studio` as a standalone skill proves to cannibalize the core `design` trigger, fold the orchestrator into a core `workflow` mode instead of a sibling skill.

## Rejected Approaches

- **One fat orchestrator skill** folding in lifecycle + mocks + Validate: weaker SRP, can't trigger mock/review standalone, harder to eval.
- **Framework-component mocks** (React/Tailwind): tech lock-in, needs a build to view, harder to render/screenshot for a general design plugin.
- **Hard browser-MCP dependency** for rendering: breaks in headless/cron/no-MCP environments; graceful fallback chosen instead.

---

## Implementation Phases

### Phase 1: prototype skill (mock production)
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt, oberskills:browser
**Gate:** Standard

**Goal:** Author a `prototype` skill that turns DESIGN.md tokens + JOURNEY.md page specs into a self-contained HTML/CSS mock, with a graceful render+screenshot loop.

**Scope:**
- IN: skills/prototype/ (SKILL.md ≤1024 disjoint desc + references) covering: the HTML/CSS mock recipe (DESIGN.md tokens → CSS custom properties; JOURNEY.md page specs / surface constraints → semantic HTML structure), two fidelities (low-fi wireframe = structure only; high-fi = styled with tokens), and the graceful render protocol (when `oberskills:mcp-browser` is connected: render headless → screenshot → return the image path for audit; else: emit the .html + "open to view" note). Honor surface constraints (the core `surface` device class) and prefers-reduced-motion.
- OUT: framework export; the audit critique itself (Phase 2); orchestration (Phase 3).

**Constraints:** mocks are single self-contained .html files (inline `<style>`, no build, no external deps except optionally a webfont link). cite-the-principle where it gives design guidance (defer the actual visual rules to core design / tokens, don't duplicate them). Gate is Standard (not Full) despite introducing the browser-MCP seam: the graceful fallback makes the MCP's absence non-failing, and P2/P3's screenshot path is conditional on it, not required — so the seam can't hard-break downstream.
**Edge cases:** no DESIGN.md present → emit a token-less wireframe + note; browser MCP absent → graceful HTML-only fallback (no failure); reduced-motion respected in any animated mock.
**Approach notes:** self-contained HTML/CSS + graceful render loop chosen by user over framework code and hard-MCP-dependency.
**File hints:** skills/prototype/; skills/design-for-ai/scripts/palette.mjs (token source), root DESIGN.md + JOURNEY.md conventions.
**Depends on:** none — entry phase | **Unlocks:** Phase 3
**Produces:** a `prototype` skill exposing a documented "produce a mock" capability: input (DESIGN.md tokens + page spec + fidelity) → output (self-contained .html path, plus a screenshot path when the browser MCP rendered it).

**Done when:**
- [ ] DW-1.1: skills/prototype/ exists (SKILL.md ≤1024 desc + references) per template; validate_skill 0/0.
- [ ] DW-1.2: the reference documents the HTML/CSS-from-tokens recipe at both fidelities (wireframe + styled) and honors surface constraints.
- [ ] DW-1.3: the graceful render protocol is specified — browser-MCP render+screenshot when available, HTML-only emit + note when not.
- [ ] DW-1.4: producing a mock from a sample DESIGN.md yields a valid self-contained .html (opens in a browser; tokens applied as CSS custom properties).
- [ ] DW-1.5: test_triggers — "make me a mock / prototype / wireframe / show me what it looks like" fires prototype; disjoint from core design (or documented static disjointness; full sweep Phase 4).

**Difficulty:** MEDIUM
**Uncertainty:** browser MCP tool surface for headless render+screenshot — verify exact tool names in Phase 1 discovery.

---

### Phase 2: audit → holistic cross-pillar Validate conductor
**Model:** opus
**Skills:** oberskills:skill-craft, oberskills:prompt, oberskills:agent
**Gate:** Full

**Goal:** Upgrade the core `audit` mode into a conductor that triages what's on a surface, dispatches only the applicable pillars, and synthesizes ONE prioritized report — critiquing the rendered pixels when a screenshot exists.

**Scope:**
- IN: rework skills/design-for-ai/ `audit` mode into a triage→dispatch→synthesize conductor: detect surface contents (chart→data-viz, real copy→content-design, interactive flows→usability/journey, persuasion surface→behavioral + deceptive-patterns check, visual→core design/ai-tells) and dispatch only those; merge findings into one severity-ranked report (de-duplicated, no per-pillar silos). Route the holistic-quality phrasings here ("make it look good", "is this any good", "improve the whole thing", "review the whole design"). When a prototype screenshot is provided, audit the image, not a description. Keep the existing visual+usability audit as the always-on baseline (no regression).
- OUT: the lifecycle sequencing (Phase 3); mock generation (Phase 1).

**Constraints:** additive — the existing visual-audit checklist and the usability dispatch stay. Triage must be conservative (don't dispatch a pillar with nothing to review). Output is ONE report, not N pillar reports. Use oberskills:agent for the dispatch-vs-inline and fan-out discipline.
**Edge cases:** surface with only visuals → just core+usability (don't force-dispatch data-viz/content); "make it look good" must route here and NOT to a single pillar nor under-trigger; very large surface → cap dispatched pillars and say what was deferred (no silent truncation).
**Approach notes:** Validate-conductor = upgrade core audit (not a new skill) — chosen by user because "is this any good" already routes to audit.
**File hints:** skills/design-for-ai/SKILL.md (audit mode + description), references/ai-tells.md, references/checklists.md.
**Depends on:** none (independent of Phase 1) | **Unlocks:** Phase 3
**Produces:** an upgraded `audit` capability: input (a surface/codebase/screenshot) → output (one prioritized cross-pillar report); the documented triage→dispatch→synthesize contract the orchestrator's Validate stage calls.

**Done when:**
- [ ] DW-2.1: core `audit` mode reworked to triage surface contents and dispatch only applicable pillars (data-viz/content-design/usability/journey/behavioral/deceptive-patterns), synthesizing ONE ranked report.
- [ ] DW-2.2: holistic phrasings ("make it look good", "is this any good", "improve the whole thing") route to this conductor — verified by test_triggers (fires core audit/conductor, not a single pillar, and does not under-trigger).
- [ ] DW-2.3: when a screenshot/image is supplied, the audit critiques the image (documented in the mode).
- [ ] DW-2.4: existing visual + usability audit behavior preserved (no regression); validate_skill on design-for-ai still 0/0.
- [ ] DW-2.5: the conductor caps dispatched pillars on large surfaces and names what it deferred (no silent truncation).

**Difficulty:** HIGH
**Uncertainty:** how much triage logic belongs in the mode prose vs delegated to the model's judgment — lean on judgment with a clear checklist, not a rigid decision tree.

---

### Phase 3: studio orchestrator skill (the lifecycle front door)
**Model:** opus
**Skills:** oberskills:skill-craft, oberskills:prompt, oberskills:agent, code-foundations:ca-architecture-boundaries
**Gate:** Full

**Goal:** Author the `studio` orchestrator skill — the front door that runs Discover → Design → Validate, loading/dispatching the right skills per stage, producing mocks via `prototype`, and validating via the upgraded `audit`.

**Scope:**
- IN: skills/studio/ (SKILL.md ≤1024 disjoint desc + references) defining the lifecycle: **Discover** (journey JTBD→map→IA→flows + core surface → JOURNEY.md), **Design** (core design→DESIGN.md → fonts/color → design-systems tokens/components → content-design + data-viz compose → **prototype** mock), **Validate** (the upgraded **audit** conductor on the rendered mock → polish/ai-tells), with `ai-native` as a lens applied when the interface is agentic. The skill names which skill each stage hands off to (no central router needed — it dispatches/sequences), gates between stages (JOURNEY.md before Design; locked DESIGN.md before tokens/mocks), and is what full-lifecycle requests ("design this end to end", "take me through the whole thing", "set up the whole design") trigger.
- OUT: reimplementing any pillar (it dispatches them); decomposing the core skill.

**Constraints:** dispatch-not-duplicate — studio references and sequences the pillars, never copies their content. Verify the lifecycle DAG is acyclic and the stage gates match the existing artifact gates (DESIGN.md law-once-locked; JOURNEY.md before flows). Disjoint trigger from core `design` (studio = the whole process end-to-end; design = the visual DNA step within it).
**Edge cases:** user enters mid-lifecycle (already has DESIGN.md) → studio resumes at the right stage, doesn't redo Discover; studio must not cannibalize core `design`/`audit`/`journey` narrow triggers (it owns only "the whole process" framing).
**Approach notes:** orchestrator = new sibling skill (user choice A); fallback if it cannibalizes core design → fold into a core `workflow` mode instead.
**File hints:** skills/studio/; docs/pillar-taxonomy.md (add studio + prototype), core SKILL.md pillar index.
**Depends on:** Phase 1 (calls prototype), Phase 2 (calls upgraded audit) | **Unlocks:** Phase 4
**Produces:** a `studio` skill that sequences the full lifecycle and, for a given brief, drives the pillars to produce JOURNEY.md + DESIGN.md + a rendered mock + a Validate report.

**Done when:**
- [ ] DW-3.1: skills/studio/ exists (SKILL.md ≤1024 desc + references) documenting Discover→Design→Validate, the per-stage skill hand-offs, the inter-stage gates, and the ai-native lens.
- [ ] DW-3.2: studio's Design stage hands off to `prototype` for a mock and its Validate stage to the upgraded `audit` conductor (named, not reimplemented).
- [ ] DW-3.3: validate_skill on studio = 0/0; description disjoint from core design/audit/journey.
- [ ] DW-3.4: lifecycle DAG acyclic; stage gates match existing artifact gates (DESIGN.md/JOURNEY.md) — verified via ca-architecture-boundaries.
- [ ] DW-3.5: test_triggers verified HERE (not deferred to Phase 4, since studio↔core-design is the top cannibalization risk) — "design this end to end / take me through the whole process" fires studio; narrow queries ("what font", "audit my UI") AND a design-DNA query ("design the visual identity for my app") do NOT fire studio.
- [ ] DW-3.6: given an existing DESIGN.md, studio resumes at the Design stage without redoing Discover (mid-lifecycle entry) — documented in the skill and verified behaviorally on a session with DESIGN.md present.
- [ ] DW-3.7: an agentic brief ("design this AI agent interface end to end") fires studio with the ai-native lens engaged — not ai-native standalone.

**Difficulty:** HIGH
**Uncertainty:** studio vs core `design` trigger boundary is the cannibalization risk — verified in DW-3.5 this phase; fallback is the core-`workflow`-mode form.

---

### Phase 4: integration, docs, evals
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Integrate the two new skills + audit upgrade into the system: taxonomy/docs, manifest/version, comprehensive trigger sweep, and a holistic-routing eval.

**Scope:**
- IN: update docs/pillar-taxonomy.md (add studio + prototype with disjoint scopes + redirects), CLAUDE.md (skill table + structure tree), README; bump plugin.json to 3.1.0; run the comprehensive cross-skill test_triggers sweep including the new skills AND the holistic-routing cases ("make it look good"→audit conductor; "make me a mock"→prototype; "design end to end"→studio; narrow queries unaffected); run_eval on the audit conductor or studio if budget allows (else test_triggers-only, documented).
- OUT: new pillar content.

**Constraints:** every skill ≤1024 desc, validate 0/0; install path unchanged.
**Edge cases:** the "make it look good" route must land on the audit conductor, not a pillar and not under-trigger (the central regression test); studio must not steal core design's narrow triggers.
**File hints:** docs/pillar-taxonomy.md, CLAUDE.md, README.md, .claude-plugin/plugin.json.
**Depends on:** Phase 3 | **Unlocks:** —
**Produces:** the integrated, versioned, validated system with studio + prototype registered and the holistic routing proven.

**Done when:**
- [ ] DW-4.1: docs/pillar-taxonomy.md + CLAUDE.md + README reflect studio + prototype; plugin.json at 3.1.0.
- [ ] DW-4.2: validate_skill 0/0 across ALL skills (core + 8 pillars + studio + prototype = 11).
- [ ] DW-4.3: comprehensive test_triggers shows no cannibalization; the holistic-routing cases pass (look-good→audit; mock→prototype; end-to-end→studio; narrow queries unchanged).
- [ ] DW-4.4: run_eval on the audit conductor or studio passes (or documented test_triggers-only fallback).

**Difficulty:** MEDIUM
**Uncertainty:** run_eval budget — fall back to test_triggers-only if exhausted.

---

## Test Coverage

**Level:** Per-skill skill-craft gate (validate_skill 0/0 + test_triggers) on prototype, studio, and the upgraded core; plus a holistic-routing regression set and one render-loop functional check; run_eval on the conductor/studio at integration.

## Test Plan

- [ ] T1 (per-DW): validate_skill 0/0 on prototype, studio, core (DW-1.1, 2.4, 3.3, 4.2).
- [ ] T2 (functional): produce a mock from a sample DESIGN.md → valid self-contained .html, tokens applied (DW-1.4).
- [ ] T3 (functional/graceful): render loop works when browser MCP connected (screenshot produced); falls back to HTML-only + note when not (DW-1.3). Method for the no-MCP path: run in a session WITHOUT the browser MCP connected and confirm the skill emits the .html + an "open to view" note rather than erroring.
- [ ] T4 (routing, central): "make it look good" / "is this any good" / "improve the whole thing" → audit conductor, NOT a single pillar, NOT under-triggering (DW-2.2).
- [ ] T5 (routing): "make me a mock/prototype/wireframe" → prototype; "design this end to end" → studio; "design this AI agent interface end to end" → studio with the ai-native lens (DW-1.5, 3.5, 3.7).
- [ ] T6 (dirty/disjoint): narrow queries ("what font?", "audit my UI", "pick a chart") still route to their existing owners — studio/prototype/conductor do NOT steal them (DW-3.5, 4.3).
- [ ] T7 (regression): existing pillar + core-mode triggers unaffected after the audit upgrade + taxonomy changes (DW-2.4, 4.3).
- [ ] T8 (conductor behavior): a multi-concern surface (chart + copy + interactive) dispatches data-viz + content-design + usability and returns ONE ranked report; a visual-only surface does not force-dispatch them; a very large surface caps the dispatched pillars and names what it deferred — no silent truncation (DW-2.1, 2.5).
- [ ] T9 (eval): run_eval on the audit conductor or studio beats baseline, or documented fallback (DW-4.4).
- [ ] T10 (conductor/image): supply a prototype screenshot → the audit references actual image content, not a description (DW-2.3).
- [ ] T11 (routing/boundary): "design the visual identity for my app" → core design, NOT studio — the studio↔design cannibalization edge (DW-3.5).
- [ ] T12 (resume): a session with an existing DESIGN.md → studio resumes at the Design stage, does not redo Discover (DW-3.6).

---

## Assumptions

| Assumption | Confidence | Verify Before Phase | Fallback If Wrong |
|------------|-----------|---------------------|-------------------|
| The browser MCP (oberskills:mcp-browser) can render a local .html headless and screenshot it | MEDIUM | Phase 1 | Graceful fallback already designed (emit HTML + note); render loop becomes opt-in |
| `studio` triggers can be made disjoint from core `design` | MEDIUM | Phase 4 | Fold orchestrator into a core `workflow` mode (Chosen-Approach fallback) |
| Upgrading audit in-place won't regress its existing visual behavior | HIGH | Phase 2 | Keep visual checklist as always-on baseline; conductor is additive |
| A model-judgment triage (not a rigid tree) reliably picks the right pillars | MEDIUM | Phase 2 | Add a concrete surface-detection checklist to the mode |
| run_eval budget available for the conductor/studio eval | MEDIUM | Phase 4 | test_triggers-only, note the gap |

## Decision Log

| Decision | Alternatives | Rationale | Phase |
|----------|-------------|-----------|-------|
| Mocks = self-contained HTML/CSS | framework components; tiered | Opens anywhere, screenshot-able, framework-agnostic, no build | 1 |
| Graceful render loop (MCP when up, else emit) | hard MCP dep; HTML-only | Robust across environments; pixels-audit when possible | 1 |
| Orchestrator + prototype as own skills; Validate = audit upgrade | one fat skill; Validate in orchestrator | Modular SRP; "is this any good" already routes to audit | 1,2,3 |
| Disjoint triggering kept; orchestrator/conductor own only holistic framing | route holistic to a pillar | Prevents cannibalization while serving holistic requests | 2,3 |
| Version → 3.1.0 | 4.0.0 | Additive capability on the 3.x system, not a reshape | 4 |

---

## Notes

- The central regression is T4: "make it look good" must land on the audit conductor. If it under-triggers, add the holistic phrasings as explicit triggers on the core/audit description (there's headroom now — core is at 1019).
- studio-vs-core-design trigger overlap is the top cannibalization risk; the Phase 4 sweep + the core-`workflow`-mode fallback cover it.
- The render loop is the one external-tool dependency; the graceful design means no environment can hard-fail it.
- ai-native is a lens across studio's stages, not a stage — it reframes Discover/Design/Validate when the interface is agentic.

---

## Execution Log
_To be filled during /code-foundations:build_
