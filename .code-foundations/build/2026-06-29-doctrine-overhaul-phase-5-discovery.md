# Discovery + Design: Phase 5 — Docs + plugin.json + CLAUDE.md

## Files Found

- `docs/workflow-conventions.md` — §4 still describes `Skill()` loading; stale intro sentence + step 1
- `docs/pillar-taxonomy.md` — title, intro paragraph, and "Dual role (v3.1.0 workflow)" block describe the old skill-trigger model; `user-invocable: true` present on line 13
- `docs/foundations-standards.md` — intro paragraph describes auto-discovering skills from `skills/`; §1 frontmatter `user-invocable: true` comment says "pillars are user-invocable"
- `.claude-plugin/plugin.json` — version `3.1.0`, description contains "eight auto-triggering pillar skills"
- `CLAUDE.md` — Repository Purpose, "doctrine library" sentence, "Pillar skills" section, structure tree, and installation note all describe the old model
- `references/skill-authoring-template.md` — describes "Phases 2–6" authoring flow and the pillar-as-skill shape

## Current State

Phases 1–4 converted the runtime fully: `skills/design-for-ai/` removed; 6 pillar domains relocated to `references/`; `scripts/palette.mjs` at repo root; `usability` and `data-viz` de-triggered; commands and agents rewired to Read() via the §5 resolver. The only surviving skills are `clarify`, `prototype`, `usability`, `data-viz`.

All convention docs and public-surface files still describe the v3.1.0 skill-trigger model (8 auto-triggering skills, Skill() loading, user-invocable: true for all). They have not been updated.

## Gaps

| # | File | Stale sentence/section | Root cause |
|---|------|----------------------|------------|
| 1 | `docs/workflow-conventions.md` §4 intro | "load pillars by name — `Skill(usability)`, `Skill(journey)`, etc." and "The pillars remain auto-triggerable by their descriptions" | Phases 1–4 changed the runtime; doc not updated |
| 2 | `docs/workflow-conventions.md` §4 step 1 | "Load the phase's assigned pillar skill(s) via `Skill()`" | Same |
| 3 | `docs/pillar-taxonomy.md` title | "the 8 design-foundations skills" | Phase 1 reduced skills to 4 |
| 4 | `docs/pillar-taxonomy.md` intro para | "the 8 pillar skills, their…disjoint trigger scopes" | 6 are now reference files, not skills |
| 5 | `docs/pillar-taxonomy.md` "Dual role" block | "(2) **Directly triggerable** — all pillars remain `user-invocable: true`" | De-trigger change; reference migration |
| 6 | `docs/foundations-standards.md` intro | "each new pillar is its own skill under `skills/`"; "each triggers on its own `description`" | 6 pillars now live in `references/` |
| 7 | `docs/foundations-standards.md` §1 | `user-invocable: true   # Claude-Code-only field; pillars are user-invocable` | Only prototype is user-invocable |
| 8 | `.claude-plugin/plugin.json` version | `3.1.0` | Major version bump required for API break |
| 9 | `.claude-plugin/plugin.json` description | "eight auto-triggering pillar skills" | Wrong model |
| 10 | `CLAUDE.md` Repository Purpose | "v3.1.0…eight auto-triggering pillar skills" | Wrong version + model |
| 11 | `CLAUDE.md` doctrine-library sentence | "load the phase's matched pillar skills via `## Additional Skills`" | Now Read() via resolver |
| 12 | `CLAUDE.md` "Core modes" section | Describes `/design-for-ai` modes of a skill that no longer exists | `skills/design-for-ai/` was removed in Phase 1 |
| 13 | `CLAUDE.md` "Pillar skills" section | "Each pillar is its own skill that triggers on its own description" | 6 are reference files |
| 14 | `CLAUDE.md` taxonomy doc description | "their dual role as workflow doctrine library + standalone triggers" | Trigger model gone |
| 15 | `CLAUDE.md` structure tree | Shows `skills/design-for-ai/` with pillar subdirs; `references/` as one-liner | Wrong on-disk layout |
| 16 | `CLAUDE.md` Installation note | "Version 3.1.0 adds…" | Version stale |
| 17 | `references/skill-authoring-template.md` | "Phases 2–6 follow"; `skills/<pillar>/SKILL.md`; `user-invocable: true` for all | Scoped to the old 8-skill build plan |

## Code Standards

No `docs/code-standards.md` found in this project. Conventions are defined by `docs/foundations-standards.md` (for skill authoring) and the plan itself.

## Test Infrastructure

No unit test suite. Validation is via shell checks (grep/ls) as specified in the DW items. Each DW check is its own executable assertion.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-5.1 | `plugin.json` version is `4.0.0`; description contains no "auto-triggering pillar skills" | COVERED | `grep '"version"' .claude-plugin/plugin.json` returns `4.0.0`; `grep 'auto-triggering pillar skills' .claude-plugin/plugin.json` returns nothing |
| DW-5.2 | `grep -rn 'triggerable\|auto-trigger' docs/ CLAUDE.md` returns nothing describing pillars as triggerable; `grep -n 'user-invocable: true' docs/pillar-taxonomy.md` returns nothing (or only §5 if documenting old state) | COVERED | Run both greps; expect zero matches in docs/workflow-conventions.md and CLAUDE.md; expect zero matches for `user-invocable: true` in pillar-taxonomy.md |
| DW-5.3 | `CLAUDE.md` structure tree matches on-disk reality — no `skills/<pillar>/` dirs listed; `references/` and `scripts/` present | COVERED | Compare tree against `ls skills/` (4 dirs), `ls references/` (7 doctrine dirs + visual + skill-authoring-template.md), `ls scripts/` (palette.mjs) |
| DW-5.4 | `docs/workflow-conventions.md` §4 describes doctrine Read() via the resolver, not Skill() loading | COVERED | Quote the updated §4 intro and step 1; confirm `Skill(` does not appear in §4 |

**All items COVERED:** YES

## Design Decisions

### docs/workflow-conventions.md §4

Replace the two stale passages surgically. The table at the bottom (pillar→lifecycle stage assignments) is accurate and stays unchanged. Step 1 of "Dispatch order within a phase" changes from `Skill()` invocation to resolver lookup + Read(); steps 2–5 unchanged.

### docs/pillar-taxonomy.md

Replace the title, intro paragraph, and "Dual role" block. Keep sections 1–4 intact (their content — pillar concerns, "Not for X" contract, dependency graph, build order — is accurate historical reference; the resolver in §5 is authoritative for runtime). Section 1 table column header updated from "Pillar (skill name)" to "Domain (doctrine name)" to reflect that 6 of 8 are now reference files. ToC entry for §1 updated accordingly. The §5 resolver table is NOT altered per plan constraint.

### docs/foundations-standards.md

Two targeted edits: (1) intro paragraph — replace the "multi-skill plugin" description and auto-discovery sentence; (2) §1 frontmatter `user-invocable: true` comment — scope it accurately. Section heading updated from "Every pillar `SKILL.md`" to "Every skill `SKILL.md`". The description rule, reference-file shape, cite-the-principle, dependency direction, and eval gate sections need no structural change — only intro framing in §1 needs adjusting.

### .claude-plugin/plugin.json

Version bump to `4.0.0`. New description: concise, accurate, no "auto-triggering" language. Describe the doctrine-read workflow + the 4 skills.

### CLAUDE.md

Largest change. The "Core modes (`/design-for-ai`)" section describes a removed skill — it should be replaced with a description of what's now true: the 4 workflow commands are the entry points; visual doctrine lives in `references/visual/` and is loaded by commands/agents. The "Pillar skills" section should describe the 6 doctrine reference files + 4 skills with accurate invocability. The structure tree is a complete rewrite to match on-disk reality. Installation note updated to v4.0.0.

### references/skill-authoring-template.md

Scope the template to the 4 surviving skills. Remove "Phases 2–6" framing. Note that the 6 doctrine reference files are plain Markdown (no SKILL.md, no frontmatter), while skills have SKILL.md with frontmatter. Update `user-invocable: true` block to show the per-skill variation.

## Prerequisites

- [x] Required files all exist (confirmed via Read + ls)
- [x] On-disk layout confirmed: `skills/` has 4 dirs; `references/` has 7 doctrine subdirs + visual + skill-authoring-template.md; `scripts/palette.mjs` at repo root
- [x] Phase 1–4 commits confirmed (runtime fully converted; no Skill()-for-doctrine in commands/agents)

## Recommendation

BUILD — all stale sentences identified; all DW items coverable; no missing prerequisites.
