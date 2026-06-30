# Plan: design-for-ai → doctrine-orchestration overhaul
**Created:** 2026-06-29
**Status:** in-progress
**Started:** 2026-06-29
**Current Phase:** 2
**Complexity:** complex
---
## Context
`design-for-ai` (v3.1.0) bolted a `research → plan → mock → build` workflow on top of 8
auto-triggering pillar skills + a core skill. Verified against the docs: all 8 pillars are
`user-invocable: true`, so all 8 inject their descriptions into every session and may auto-fire —
the trigger-space pollution the user flagged. In an orchestration model the pillars are doctrine
the workflow loads per-phase, not descriptions competing everywhere. Goal: mirror (and improve on)
code-foundations — doctrine loaded deterministically by `Read()` via a name→path resolver
(Approach B), the workflow the only front door. 6 pillars + the core collapse to reference files;
`usability` + `data-viz` stay skills but stop auto-triggering; `prototype` + `clarify` stay as tools.

**Problem:** Doctrine is delivered by hopeful auto-trigger instead of deterministic per-phase load.
**Success:** Zero pillar descriptions in trigger space; every command/agent loads doctrine by
`Read()` through a single resolver; the 4 surviving skills validate 0/0; no dangling references.

## Constraints
- **Must-not-lose:** the uncommitted in-flight core edits (3→5 design-DNA candidates + anti-convergence
  hue rule, in `skills/design-for-ai/SKILL.md` + `references/design-dna.md`) MUST be committed to main
  BEFORE build branches, so worktree isolation carries them into the relocation. (Handled at HANDOFF.)
- Preserve `usability`'s stable anchors (`#fittss-law`, `#hicks-law`, …) — other doctrine cites them.
- Doctrine dependency graph stays acyclic; `usability` is the sink.
- Do NOT touch `website/` (untracked marketing site, out of scope).
- `.design-foundations/` (design workflow's runtime dir) is distinct from `.code-foundations/`
  (this meta-workflow) — do not conflate.
- Loading idiom = Approach B: plan stores semantic `**Doctrine:**` names; one resolver table maps
  name→path; agents resolve then `Read()`. No `Skill()` for doctrine.
- Path idiom: relocated doctrine is addressed `${CLAUDE_PLUGIN_ROOT}/references/...`; the script is
  `${CLAUDE_PLUGIN_ROOT}/scripts/palette.mjs`.

## Chosen Approach
**B — Name + resolver, deterministic `Read()` loading.** Plan keeps human-readable doctrine names;
a single resolver table (in `docs/pillar-taxonomy.md`) is the one source of truth mapping name→path;
the commands and both agents resolve names and `Read()` the files. **Fallback:** if the resolver
table proves unwieldy, inline explicit `Read(path)` lines in dispatch prompts (Approach A).

## Rejected Approaches
- **A — Path-driven (paths in the plan):** plans store brittle paths, less readable; kept as fallback only.
- **C — Mixed `Skill()`+`Read()`:** docs cannot confirm `Skill()` works under `disable-model-invocation: true`; two mechanisms, inconsistent.
- **code-foundations parity (skills + `user-invocable:false`):** that flag leaves descriptions in
  context (still pollutes trigger space) — strictly worse than reference files for the 6 pillars.

---
## Implementation Phases

### Phase 1: Relocate doctrine → references/
**Model:** opus
**Skills:** code-foundations:cc-refactoring-guidance
**Gate:** Full

**Goal:** Move all doctrine out of `skills/` into a `references/` tree and `palette.mjs` into
`scripts/`, strip pillar frontmatter, delete the emptied skill dirs, and repair every path/anchor
the move breaks — preserving content byte-for-byte except relocated links.

**Scope:**
- IN: `skills/design-for-ai/references/*` (21 files) → `references/visual/`; `skills/design-for-ai/scripts/palette.mjs` → `scripts/palette.mjs`; the 6 pillar dirs (content-design, behavioral, journey, deceptive-patterns, design-systems, ai-native) → `references/<pillar>/` with `SKILL.md` → `<pillar>.md` (frontmatter stripped, body kept); delete `skills/design-for-ai/` and the 6 moved pillar dirs; fix intra-doctrine relative paths, `${CLAUDE_SKILL_DIR}` → `${CLAUDE_PLUGIN_ROOT}/...`, the `palette.mjs` invocation path in `design-dna.md`, and cross-pillar "use core X mode" prose → `references/visual/...`.
- OUT: editing commands/agents/docs (Phases 3–5); the resolver table (Phase 2); touching `usability`, `data-viz`, `prototype`, `clarify`, `website/`.

**Constraints:** Use `git mv` so history follows. Do not rewrite doctrine prose — only relocate and
repair links. The core `SKILL.md`'s 7-mode router is NOT re-homed here; its content already lives in
the visual references, and its routing is reconstituted in Phases 2–4.

**Edge cases:** A pillar body that cites a sibling by its old skill name; a `${CLAUDE_SKILL_DIR}`
token (core-relative) now meaningless; an anchor link into a chapter file that moved.

**File hints:** `skills/design-for-ai/` — core source; `skills/{content-design,behavioral,journey,deceptive-patterns,design-systems,ai-native}/` — pillars to collapse.

**Depends on:** nothing (entry) | **Unlocks:** Phase 2
**Produces:** `references/visual/*` (21 files), `references/<pillar>/<pillar>.md` + sub-refs for 6
pillars, `scripts/palette.mjs`; `skills/` reduced to exactly {usability, data-viz, prototype, clarify}.
Seam = these canonical paths (the resolver in P2 maps names to them).
**Rollback:** `git mv` is reversible pre-commit; the phase commits only after DW pass.

**Done when:**
- [ ] DW-1.1: `references/visual/` contains all 21 former core reference files; `scripts/palette.mjs` exists; `node scripts/palette.mjs --seed 250 --scheme light` exits 0.
- [ ] DW-1.2: each of the 6 pillars exists at `references/<pillar>/<pillar>.md` with NO YAML frontmatter, plus its former reference files.
- [ ] DW-1.3: `ls skills/ | grep -v -- -workspace` = exactly usability, data-viz, prototype, clarify — no core dir, no 6 pillar dirs (gitignored `*-workspace/` eval dirs are excluded from the check).
- [ ] DW-1.4: `grep -rn '${CLAUDE_SKILL_DIR}' references/` returns nothing; `grep -rn 'skill directory' references/` returns nothing (the `design-dna.md` prose palette path is fixed); no relocated doctrine file links to a moved path that 404s (link-check sweep clean).

**Difficulty:** HIGH
**Uncertainty:** Volume of intra-doctrine cross-links to repair may exceed a first pass — the link sweep (DW-1.4) is the backstop.

### Phase 2: De-trigger survivors + author the resolver
**Model:** opus
**Skills:** oberskills:skill-craft
**Gate:** Full

**Goal:** Stop `usability` + `data-viz` from auto-triggering, and write the single name→path doctrine
resolver table that every command and agent will consult.

**Scope:**
- IN: add `disable-model-invocation: true` and `user-invocable: false` to `skills/usability/SKILL.md` + `skills/data-viz/SKILL.md` frontmatter; author the resolver table in `docs/pillar-taxonomy.md` mapping every doctrine NAME (6 pillars + usability + data-viz + the visual sub-topics that the old core modes named: design-dna, color, fonts, surface, motion, interaction, responsive, ai-tells, libraries, archetypes, foundations, techniques, checklists) → its path under `references/` or `skills/`.
- OUT: rewiring the commands/agents that consume the resolver (P3/P4); broader doc prose (P5).

**Constraints:** The resolver is the ONE source of truth — names used here are the vocabulary
Phases 3–5 must match exactly. Visual sub-topic names reconstitute the deleted core router's modes.

**Edge cases:** A name with two plausible files (e.g. `color` spans chapter-08 + chapter-09 — map to
the primary, note the companion); usability/data-viz still loadable by `Read()` despite both flags.

**File hints:** `docs/pillar-taxonomy.md` — resolver home; `skills/usability/SKILL.md`, `skills/data-viz/SKILL.md` — flag targets.

**Depends on:** Phase 1 | **Unlocks:** Phases 3, 4
**Produces:** the doctrine resolver table (name→path), single source of truth, in
`docs/pillar-taxonomy.md`; `usability` + `data-viz` carrying both suppression flags. Seam = the
resolver name set + table format consumed by P3/P4.
**Rollback:** `git revert` the phase commit restores the prior frontmatter flags and removes the resolver table.

**Done when:**
- [ ] DW-2.1: `skills/usability/SKILL.md` and `skills/data-viz/SKILL.md` each carry `disable-model-invocation: true` AND `user-invocable: false`.
- [ ] DW-2.2: `docs/pillar-taxonomy.md` contains a resolver table; every name resolves to a path that exists on disk (each row verifiable by `test -e`).
- [ ] DW-2.3: every visual sub-topic referenced in Phase 2 scope (design-dna, color, fonts, surface, motion, interaction, responsive, ai-tells, libraries, archetypes, foundations, techniques, checklists) has a resolver row.

**Difficulty:** MEDIUM
**Uncertainty:** Final name set may grow as P3/P4 reveal a needed doctrine — additions are append-only to the table.

### Phase 3: Rewire commands to the doctrine model
**Model:** sonnet
**Skills:** oberskills:prompt
**Gate:** Standard

**Goal:** Convert `plan.md`, `build.md`, and `mock.md` from `Skill()`-loaded pillars to
`**Doctrine:**` names resolved and `Read()`, and delete the "stay triggerable" claims.

**Scope:**
- IN: `plan.md` — `**Skills:**`→`**Doctrine:**` (names), and convert ALL pillar-loading sites: delete line ~96 ("loads pillars by name … stay triggerable"); the `Skill(<pillar>)` instructional prose at lines ~125 and ~176 → resolve+`Read()`; the validation lists at ~190 and ~246 ("9 design skills") → "doctrine names from the resolver". `build.md` — `## Additional Skills`→`## Doctrine` block emitting resolve+`Read()`, skill-resolution→doctrine-resolution, delete line ~95 ("Pillars stay triggerable; the workflow loads them by name regardless"). `mock.md` — line ~117 ("dispatches only applicable pillars") → "reads only applicable doctrine", and align its review-agent dispatch with the doctrine model.
- OUT: agent definition bodies (P4); `research.md` (it references no pillars — confirm untouched); docs prose (P5).

**Constraints:** Preserve the BUILD→REVIEW→commit gate machinery, the debiasing rule, and the
`**Gate:**`/`**Model:**` handling — only the doctrine-delivery mechanism changes. Apply
`oberskills:prompt` to the rewritten dispatch-block wording.

**Edge cases:** A phase whose `**Doctrine:**` is `none`; a doctrine name absent from the resolver
(command must STOP and surface it, mirroring the old missing-skill behavior).

**File hints:** `commands/{plan,build,mock,research}.md`.

**Depends on:** Phase 2 | **Unlocks:** Phase 5
**Produces:** the 3 commands speaking `**Doctrine:**` names + resolve+`Read()`; zero
`Skill(<pillar>)`-for-doctrine and zero "triggerable" claims in `commands/`. Seam = the
`**Doctrine:**` plan-field format + the `## Doctrine` dispatch-block format the agents (P4) mirror.
**Rollback:** `git revert` the phase commit; the prior `Skill()`-based command bodies are restored.

**Done when:**
- [ ] DW-3.1: `grep -rn 'Skill(' commands/` returns no pillar/doctrine invocations (only `clarify`, an allowed tool-skill, may remain).
- [ ] DW-3.2: `grep -rn 'triggerable' commands/` returns nothing.
- [ ] DW-3.3: `plan.md` emits `**Doctrine:**` (names) per phase and validates names against the resolver; `build.md` emits a `## Doctrine` block that resolves names and `Read()`s paths.
- [ ] DW-3.4: `research.md` confirmed unchanged (or only trivially touched) — it references no doctrine.
- [ ] DW-3.5: `grep -rn '9 design skills\|9 pillars' commands/` returns nothing.
- [ ] DW-3.6: `grep -rn 'dispatch.*pillar\|pillar.*dispatch' commands/mock.md` returns nothing.

**Difficulty:** MEDIUM
**Uncertainty:** `mock.md`'s coupling to the review-agent's pillar triage — resolved jointly with P4.

### Phase 4: Rewire agents to Read() doctrine
**Model:** sonnet
**Skills:** oberskills:skill-craft, oberskills:prompt
**Gate:** Standard

**Goal:** Convert `design-build-agent.md` and `design-review-agent.md` from `## Additional Skills` /
`Skill()` invocation to a `## Doctrine` block they resolve and `Read()`, including the review-agent's
triage step.

**Scope:**
- IN: `design-build-agent.md` — `## Additional Skills` (Skill-invoke) → `## Doctrine` (resolve+`Read()`); the "pillar skill assigned" prose (~107, 144, 148, 198, 221) → "doctrine assigned … Read()"; and line ~60's Contrast-evidence path `skills/design-for-ai/scripts/palette.mjs` → `${CLAUDE_PLUGIN_ROOT}/scripts/palette.mjs`. `design-review-agent.md` — `## Additional Skills` (~22-24) → `## Doctrine`, and ALL "sibling [pillar] skill" occurrences (~24, 59, 72, 87, 123-125) so "dispatch the sibling pillar skill" becomes "Read the pillar's doctrine and apply it" (usability + visual always-on baseline Read).
- OUT: commands (P3); docs (P5).

**Constraints:** Preserve each agent's protocol, the review-agent's independence/debiasing and
severity-ranked single-report synthesis, and the no-silent-truncation cap rule. Apply
`oberskills:prompt` to the rewritten body wording; `skill-craft` governs the agent-definition file shape.

**Edge cases:** A dispatch with no `## Doctrine` block (baseline protocol alone, as today); the
review-agent's "always-on visual + usability" baseline now means Read those two doctrine entries.

**File hints:** `agents/design-build-agent.md`, `agents/design-review-agent.md`.

**Depends on:** Phase 2 | **Unlocks:** Phase 5
**Produces:** both agents resolving `## Doctrine` names and `Read()`-ing paths; zero
`Skill(<pillar>)`-for-doctrine in `agents/`. Seam = consumed by P5 docs describing the agent contract.
**Rollback:** `git revert` the phase commit; the prior `Skill()`-based agent bodies are restored.

**Done when:**
- [ ] DW-4.1: `grep -rn 'Skill(' agents/` returns no pillar/doctrine invocations.
- [ ] DW-4.2: both agents document a `## Doctrine` block that resolves names via the resolver and `Read()`s the paths before work.
- [ ] DW-4.3: `design-review-agent.md` triage Reads pillar doctrine (no "dispatch sibling skill" language remains: `grep -n 'sibling' agents/design-review-agent.md` clean).
- [ ] DW-4.4: `grep -rn 'skills/design-for-ai' agents/ commands/` returns nothing (no orphaned path to the deleted core skill dir — covers the `palette.mjs` line ~60 fix).

**Difficulty:** MEDIUM
**Uncertainty:** None significant — mechanical mirror of P3's block format.

### Phase 5: Docs + plugin.json + CLAUDE.md
**Model:** sonnet
**Skills:** oberskills:prompt
**Gate:** Standard

**Goal:** Make every convention doc and public-surface manifest describe the doctrine-read model, and
bump the plugin to a new major version.

**Scope:**
- IN: `docs/workflow-conventions.md` (§4 loading model → doctrine `Read()` via resolver); `docs/pillar-taxonomy.md` (prose around the resolver; dual-role text → doctrine-library text); `docs/foundations-standards.md` (frontmatter/reference-shape rules now describe doctrine files + the 4 surviving skills); `.claude-plugin/plugin.json` (rewrite description — drop "eight auto-triggering pillar skills", describe doctrine-read workflow + 4 internal skills; bump `3.1.0`→`4.0.0`); `CLAUDE.md` (rewrite the structure tree + skill/pillar prose to the doctrine model).
- OUT: code/command/agent behavior (P1–P4); validation (P6).

**Constraints:** `4.0.0` is correct — this breaks the public skill API (6 skills removed, 2
de-triggered). Keep the install path unchanged. Docs must not re-describe the deleted skill-trigger model.

**Edge cases:** A doc cross-link to a deleted pillar skill path; `references/skill-authoring-template.md`
still describing the pillar-as-skill shape (update or scope it to the 4 survivors).

**File hints:** `docs/*.md`, `.claude-plugin/plugin.json`, `CLAUDE.md`, `references/skill-authoring-template.md`.

**Depends on:** Phases 3, 4 | **Unlocks:** Phase 6
**Produces:** docs + `plugin.json` (v4.0.0) + `CLAUDE.md` describing the doctrine model. Seam =
the documented model P6 validates reality against.
**Rollback:** `git revert` the phase commit restores the prior docs/manifest/version (3.1.0).

**Done when:**
- [ ] DW-5.1: `plugin.json` version is `4.0.0` and its description contains no "auto-triggering pillar skills" claim.
- [ ] DW-5.2: `grep -rn 'triggerable\|auto-trigger' docs/ CLAUDE.md` returns nothing describing pillars as triggerable.
- [ ] DW-5.3: `CLAUDE.md`'s structure tree matches the on-disk reality (references/ tree, 4 skills, scripts/).
- [ ] DW-5.4: `workflow-conventions.md` §4 describes doctrine `Read()` via the resolver, not `Skill()` loading.

**Difficulty:** MEDIUM
**Uncertainty:** None significant.

### Phase 6: Validation sweep
**Model:** sonnet
**Skills:** oberskills:skill-craft
**Gate:** Standard

**Goal:** Prove the migration is complete and consistent — no dangling references anywhere, the 4
surviving skills validate clean, and the plugin's structure is coherent.

**Scope:**
- IN: repo-wide grep sweeps for dangling `Skill(<pillar>)`, `${CLAUDE_SKILL_DIR}`, dead cross-doctrine anchors/paths, and references to the 6 deleted skills or the deleted core skill; run `validate_skill` on usability, data-viz, prototype, clarify; confirm `palette.mjs` runs from its new path; confirm no command/agent names a doctrine absent from the resolver.
- OUT: fixing anything major found (loops back to the owning phase via Gate Failure Protocol).

**Constraints:** This phase only verifies — substantive fixes re-open the responsible phase.

**Edge cases:** A stray reference in a doctrine body to a deleted sibling skill name; a resolver row
pointing at a path that a later phase renamed.

**File hints:** whole repo; `skills/{usability,data-viz,prototype,clarify}/`.

**Depends on:** Phase 5 | **Unlocks:** (final)
**Produces:** a clean validation report (zero dangling refs; 4 skills 0 errors; resolver fully resolvable).

**Done when:**
- [ ] DW-6.1: repo-wide `grep -rn 'Skill(' commands/ agents/ references/` finds no pillar/doctrine invocation; `grep -rn '${CLAUDE_SKILL_DIR}'` repo-wide is empty.
- [ ] DW-6.2: `validate_skill` returns 0 errors for each of usability, data-viz, prototype, clarify.
- [ ] DW-6.3: every resolver row resolves to an existing file; every `**Doctrine:**`/`## Doctrine` name used in commands/agents exists in the resolver.
- [ ] DW-6.4: no reference anywhere to the 6 deleted pillar skills or the deleted core `design-for-ai` skill remains (other than historical doc notes).

**Difficulty:** LOW
**Uncertainty:** None.

---
## Test Coverage
**Level:** Per-phase verification (no runtime test suite exists — this is a markdown/structure
plugin; "tests" are grep sweeps, `validate_skill`, link/anchor checks, and a `palette.mjs` smoke run).

## Test Plan
- [ ] T1 (P1): `ls skills/ | grep -v -- -workspace` = {usability, data-viz, prototype, clarify} (DW-1.3); `references/visual/` count = 21 (DW-1.1); each of the 6 pillars at `references/<pillar>/<pillar>.md` exists with no frontmatter (DW-1.2); `node scripts/palette.mjs --seed 250 --scheme light` exits 0 (DW-1.1). **Dirty:** `grep -rn '${CLAUDE_SKILL_DIR}' references/` and `grep -rn 'skill directory' references/` both empty; link-check finds no 404 cross-link (DW-1.4).
- [ ] T2 (P2): each resolver row `test -e` passes; usability+data-viz frontmatter has both flags. **Dirty:** a name with no file fails the row check (must be fixed before pass).
- [ ] T3 (P3): `grep -rn 'Skill(' commands/` has no doctrine invocation (DW-3.1); `grep -rn 'triggerable\|9 design skills' commands/` empty (DW-3.2/3.5); plan.md emits `**Doctrine:**` + build.md emits a `## Doctrine` resolve+Read block (DW-3.3); `git diff` shows research.md untouched (DW-3.4); `grep -n 'dispatch.*pillar' commands/mock.md` clean (DW-3.6). **Dirty:** a `**Doctrine:**` name absent from the resolver triggers the command's STOP path.
- [ ] T4 (P4): `grep -rn 'Skill(' agents/` clean (DW-4.1); both agents document a `## Doctrine` resolve+Read block (DW-4.2); `grep -n 'sibling' agents/design-review-agent.md` clean (DW-4.3); `grep -rn 'skills/design-for-ai' agents/` clean (DW-4.4). **Dirty:** a dispatch with no `## Doctrine` falls back to baseline protocol (not an error).
- [ ] T5 (P5): `plugin.json` = 4.0.0 with no "auto-triggering" claim (DW-5.1); `grep -rn 'triggerable\|auto-trigger' docs/ CLAUDE.md` clean (DW-5.2); CLAUDE.md structure tree matches `ls`/`find` output (DW-5.3); workflow-conventions.md §4 describes doctrine Read() via resolver (DW-5.4). **Dirty:** CLAUDE.md tree diff vs on-disk reveals no drift.
- [ ] T6 (P6): full sweep green; `validate_skill` 0/0 on all 4 survivors. **Dirty:** any dangling ref fails the sweep and re-opens its phase.

---
## Assumptions
| Assumption | Confidence | Verify Before Phase | Fallback If Wrong |
|---|---|---|---|
| Agents `Read()` doctrine reliably regardless of frontmatter flags | HIGH (docs: Read ignores frontmatter) | P4 | Inline full doctrine text into dispatch (heavier prompts) |
| `disable-model-invocation: true` removes usability/data-viz from trigger space | HIGH (docs table verified) | P2 | Add `user-invocable:false` too (already planned) / convert to reference files |
| In-flight core edits committed to main before build branches | MEDIUM (manual step at HANDOFF) | P1 | Re-apply the 5-candidate edits inside the worktree before relocating |
| Resolver name set is stable once authored | MEDIUM | P3/P4 | Append-only additions to the table |

## Decision Log
| Decision | Alternatives Considered | Rationale | Phase |
|---|---|---|---|
| Approach B (name+resolver, Read) | A (path-driven), C (mixed Skill+Read) | Readable plans, single source of truth, deterministic, flag-agnostic | all |
| 6 pillars→reference files; usability/data-viz stay skills | all→files; all→skills+flags | User's Hybrid choice: keep the 2 heaviest eval-able; collapse pure doctrine | P1/P2 |
| `disable-model-invocation:true` + `user-invocable:false` on survivors | `user-invocable:false` only | The latter leaves descriptions in context (still auto-triggers) — verified | P2 |
| `git mv` for all relocations | plain move | Preserve file history through the move | P1 |
| Version 4.0.0 | 3.2.0 | Breaking public skill API (6 removed, 2 de-triggered) = major bump | P5 |

---
## Notes
- The deleted core `SKILL.md`'s 7-mode router (design/surface/fonts/color/audit/enhance/polish) is
  not lost: its content already lives in `references/visual/*`, and its routing is reconstituted as
  resolver entries (P2) + the commands'/agents' phase logic (P3/P4). `audit` specifically is now the
  `design-review-agent`'s job.
- HANDOFF prerequisite (orchestrator, before build): commit the in-flight core doctrine edits to
  main, then let build's worktree gate branch from clean HEAD.
- `clarify` remains a `Skill()` the commands may invoke — it's a workflow tool-skill, not doctrine;
  the grep gates exclude it.
- Per-phase REVIEW for this plugin = the `code-foundations:post-gate-agent` verifying DW evidence
  (grep/validate output), not a design critique.
---
## Execution Log

### Phase 1: Relocate doctrine → references/ (Gate: Full)
- [x] BUILD: 30 doctrine files relocated via git mv (history preserved); core 7-mode SKILL.md deleted; 6 pillars de-frontmattered; 4 intra-doctrine links repaired
- [x] REVIEW: PASS (4/4 DW + edge case re-verified by running every shell check)
- [x] Committed
Commit: 7959a1b
Summary: All design doctrine now lives in references/ (visual/ + 6 pillar dirs) + scripts/palette.mjs; skills/ reduced to {usability, data-viz, prototype, clarify}. The name→path resolver (Phase 2) maps onto these canonical paths.
