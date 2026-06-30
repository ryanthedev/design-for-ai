# Discovery + Design: Phase 2 — De-trigger survivors + author the resolver

## Files Found
- `skills/usability/SKILL.md` — survivor skill, frontmatter currently `user-invocable: true`, no `disable-model-invocation`.
- `skills/data-viz/SKILL.md` — survivor skill, same frontmatter state.
- `docs/pillar-taxonomy.md` — 98 lines, resolver home. Currently describes the OLD 8-pillar auto-trigger model (prose says "user-invocable: true", "Skill(<name>)"). That prose rewrite is Phase 5 (OUT of scope here); Phase 2 only APPENDS the resolver table.
- `references/visual/` — 21 files (confirmed). `references/<pillar>/<pillar>.md` for all 6 pillars (confirmed). `scripts/palette.mjs` (Phase 1).
- `skills/` = exactly {usability, data-viz, prototype, clarify} (confirmed).

## Current State
Phase 1 relocated all doctrine. The two survivor skills still auto-trigger (`user-invocable: true`, no model-invocation suppression). No resolver table exists yet. The taxonomy doc's prose is stale but out of Phase 2 scope.

## Gaps
1. Both survivor skills lack the two suppression flags.
2. No name→path resolver table exists anywhere.

## Code Standards
No `docs/code-standards.md` found in the worktree. House conventions for skills live in `docs/foundations-standards.md`; frontmatter-flag semantics confirmed against the loaded `oberskills:skill-craft` skill (the "What to build" table: `disable-model-invocation: true` removes the description from context / stops Claude auto-invoking; `user-invocable: false` removes it from the slash menu — neither blocks `Read()` of the file).

## Test Infrastructure
No unit suite. DW acceptance = shell checks (grep / test -e / head) printing expected output. Treated as the gating tests.

## DW Verification

| DW-ID | Done-When Item | Status | Test (shell check) |
|-------|---------------|--------|--------------------|
| DW-2.1 | usability + data-viz each carry `disable-model-invocation: true` AND `user-invocable: false` | COVERED | `grep -c` both flags in both files = expected counts |
| DW-2.2 | resolver table in `docs/pillar-taxonomy.md`; every name → on-disk path | COVERED | loop `test -e` over every path cell prints OK |
| DW-2.3 | every visual sub-topic (13 names) has a resolver row | COVERED | `grep` each of the 13 names in the table |

**All items COVERED:** YES (3 DW-IDs in prompt = 3 in table).

## Design Decisions

### Suppression flags
Add `disable-model-invocation: true` and `user-invocable: false` to both survivor frontmatters. Per skill-craft: these suppress auto-trigger + slash-menu listing only; the file stays `Read()`-able, which the doctrine model requires. Keep `name`/`description`/`argument-hint` intact (description no longer enters trigger space once model-invocation is disabled, but is harmless and documents the file).

### Resolver naming + two-file rule
The resolver names are the vocabulary Phases 3–5 must match. Names chosen to reconstitute the deleted core router's modes plus the pillars/skills.

**Two-file edge case (color, fonts):** rule = **primary is the file the deleted core mode read FIRST**; the second file is recorded as a companion in the Notes column. This is internally consistent and traceable to the old `SKILL.md` mode bodies:
- `color` mode read `chapter-08-color-science.md` then `chapter-09-color-theory.md` → primary 08, companion 09.
- `fonts` mode read `chapter-03-typography.md` then `appendix-fonts-and-typography.md` → primary ch03, companion appendix.

### Name → path mapping (full enumeration)

Pillars (→ `references/<pillar>/<pillar>.md`):
- content-design, behavioral, journey, deceptive-patterns, design-systems, ai-native

Survivor skills (→ `skills/<name>/SKILL.md`):
- usability, data-viz

Visual sub-topics (→ `references/visual/...`):
- design-dna → design-dna.md
- color → chapter-08-color-science.md (companion chapter-09-color-theory.md)
- fonts → chapter-03-typography.md (companion appendix-fonts-and-typography.md)
- surface → surfaces.md
- motion → motion.md
- interaction → interaction.md
- responsive → responsive.md
- ai-tells → ai-tells.md
- libraries → libraries.md
- archetypes → archetypes.md
- foundations → foundations.md
- techniques → techniques.md
- checklists → checklists.md

## Prerequisites
- [x] Phase 1 outputs present (references/ tree, scripts/palette.mjs, skills/ = 4 dirs)
- [x] Both survivor frontmatters readable
- [x] Resolver home (docs/pillar-taxonomy.md) exists

## Recommendation
BUILD. Append the resolver section; add flags to both frontmatters. No scope/plan conflict.
