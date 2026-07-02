# Discovery + Design: Phase 6 — Validation sweep

## Files Found

- `commands/plan.md`, `commands/build.md`, `commands/mock.md`, `commands/research.md`
- `agents/design-build-agent.md`, `agents/design-review-agent.md`
- `docs/pillar-taxonomy.md` (resolver at §5)
- `docs/workflow-conventions.md`, `docs/foundations-standards.md`
- `references/visual/` (21 files), `references/{content-design,behavioral,journey,deceptive-patterns,design-systems,ai-native}/`
- `scripts/palette.mjs`
- `skills/{usability,data-viz,prototype,clarify}/`

## Current State

All editing phases (P1–P5) committed. The repo claims to be a fully converted doctrine-read plugin at v4.0.0 with:
- 6 doctrine reference files in `references/`
- 2 de-triggered skills (`usability`, `data-viz`) with `disable-model-invocation: true` + `user-invocable: false`
- 2 workflow skills (`prototype`, `clarify`)
- Commands and agents using `**Doctrine:**` / `## Doctrine` blocks + `Read()` via the §5 resolver
- `scripts/palette.mjs` at its new path

## Gaps Found During Sweep

| # | Location | Finding | Severity | Disposition |
|---|----------|---------|----------|-------------|
| 1 | `docs/pillar-taxonomy.md:18` | Stale prose: `` `skills/design-for-ai/` `` backtick reference (the deleted core skill path) in the intro paragraph — matched by DW-6.4 grep, not in an allowed exception location | Blocking (DW-6.4) | **Fixed inline** — one-line prose update replacing the stale path with `references/visual/` |

No other gaps found. All four skills validate 0 errors / 0 warnings. All 23 resolver paths exist on disk. No dangling `Skill(<pillar>)` invocations. No `${CLAUDE_SKILL_DIR}` leakage outside `skills/`.

## Code Standards

No `code-standards.md` in this project. Conventions are in `docs/foundations-standards.md` (skills/frontmatter) and `docs/workflow-conventions.md` (dispatch model).

## Test Infrastructure

"Tests" for this plugin = deterministic shell checks + `validate_skill`. No runtime test suite. Per the plan: grep sweeps, `validate_skill`, and a `palette.mjs` smoke run.

## DW Verification

| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-6.1 | `grep -rn 'Skill(' commands/ agents/ references/` finds no pillar/doctrine invocation; `grep -rn '${CLAUDE_SKILL_DIR}' commands/ agents/ references/` is empty | COVERED | Skill() → only `Skill(clarify)` in plan.md:66 (allowed tool-skill). CLAUDE_SKILL_DIR → no matches in commands/ agents/ references/. Both greps confirmed below. |
| DW-6.2 | `validate_skill` returns 0 errors for usability, data-viz, prototype, clarify | COVERED | All 4: `"errors":[],"warnings":[]`. Results below. |
| DW-6.3 | Every resolver row resolves to an existing file; every doctrine name in commands/+agents/ exists in the resolver | COVERED | All 23 `test -e` checks: OK. All names in plan.md stage map + review-agent triage baseline exist in resolver. |
| DW-6.4 | No reference to 6 deleted pillar skills or deleted core `skills/design-for-ai/` in commands/ agents/ docs/ references/ | COVERED | After inline prose fix: grep clean (no matches). |

**All items COVERED: YES**

## Design Decisions

No new design decisions — this phase is read-only verification. The single fix (removing the stale `skills/design-for-ai/` prose reference from `pillar-taxonomy.md`) was a 1-line prose update, not a substantive change. It was applied inline rather than re-opening Phase 5 per the scope guidance.

## Prerequisites

- [x] Phases 1–5 committed (7959a1b, a4f5985, 9952720, 4d9345e, 73f5e98)
- [x] All referenced files exist
- [x] `scripts/palette.mjs` executes without error

## Sweep Results

### DW-6.1 — Skill() + CLAUDE_SKILL_DIR sweep

**Command:**
```
grep -rn 'Skill(' commands/ agents/ references/
```
**Output:**
```
commands/plan.md:66:Load `Skill(clarify)`. Ask questions via `AskUserQuestion` until...
```
→ Only `Skill(clarify)` — the explicitly allowed tool-skill. No pillar/doctrine invocation. PASS.

**Command:**
```
grep -rn '${CLAUDE_SKILL_DIR}' commands/ agents/ references/
```
**Output:**
```
(no matches)
```
→ PASS. (`${CLAUDE_SKILL_DIR}` inside `skills/` is valid per DW note — confirmed present only in `skills/clarify/SKILL.md`.)

---

### DW-6.2 — validate_skill results

**usability:**
```json
{"valid":true,"errors":[],"warnings":[],"info":[
  {"rule":"cc-extension-key","message":"frontmatter key `user-invocable` is Claude-Code-only"},
  {"rule":"cc-extension-key","message":"frontmatter key `disable-model-invocation` is Claude-Code-only"},
  {"rule":"cc-extension-key","message":"frontmatter key `argument-hint` is Claude-Code-only"}
],"stats":{"skill_md_lines":56,"description_chars":936,"reference_files":2}}
```

**data-viz:**
```json
{"valid":true,"errors":[],"warnings":[],"info":[
  {"rule":"cc-extension-key","message":"frontmatter key `user-invocable` is Claude-Code-only"},
  {"rule":"cc-extension-key","message":"frontmatter key `disable-model-invocation` is Claude-Code-only"},
  {"rule":"cc-extension-key","message":"frontmatter key `argument-hint` is Claude-Code-only"}
],"stats":{"skill_md_lines":81,"description_chars":849,"reference_files":2}}
```

**prototype:**
```json
{"valid":true,"errors":[],"warnings":[],"info":[
  {"rule":"cc-extension-key","message":"frontmatter key `user-invocable` is Claude-Code-only"},
  {"rule":"cc-extension-key","message":"frontmatter key `argument-hint` is Claude-Code-only"}
],"stats":{"skill_md_lines":66,"description_chars":865,"reference_files":1}}
```

**clarify:**
```json
{"valid":true,"errors":[],"warnings":[],"info":[
  {"rule":"cc-extension-key","message":"frontmatter key `user-invocable` is Claude-Code-only"}
],"stats":{"skill_md_lines":202,"description_chars":244,"reference_files":1}}
```

→ 4/4 skills: `"valid":true`, 0 errors, 0 warnings. Info items are non-gating (Claude-Code-only frontmatter keys — expected for this project). PASS.

---

### DW-6.3 — Resolver path check + doctrine name cross-check

**All 23 resolver entries (test -e):**
```
OK  references/content-design/content-design.md
OK  references/behavioral/behavioral.md
OK  references/journey/journey.md
OK  references/deceptive-patterns/deceptive-patterns.md
OK  references/design-systems/design-systems.md
OK  references/ai-native/ai-native.md
OK  skills/usability/SKILL.md
OK  skills/data-viz/SKILL.md
OK  references/visual/design-dna.md
OK  references/visual/chapter-08-color-science.md
OK  references/visual/chapter-09-color-theory.md
OK  references/visual/chapter-03-typography.md
OK  references/visual/appendix-fonts-and-typography.md
OK  references/visual/surfaces.md
OK  references/visual/motion.md
OK  references/visual/interaction.md
OK  references/visual/responsive.md
OK  references/visual/ai-tells.md
OK  references/visual/libraries.md
OK  references/visual/archetypes.md
OK  references/visual/foundations.md
OK  references/visual/techniques.md
OK  references/visual/checklists.md
```
→ 23/23 OK. PASS.

**Doctrine name cross-check (commands/ + agents/ vs resolver):**

Names appearing in `**Doctrine:**` fields and triage tables:

| Name (used in commands/agents) | In resolver? |
|-------------------------------|-------------|
| `journey` | YES |
| `design-dna` | YES |
| `archetypes` | YES |
| `foundations` | YES |
| `fonts` | YES |
| `color` | YES |
| `design-systems` | YES |
| `content-design` | YES |
| `data-viz` | YES |
| `usability` | YES |
| `behavioral` | YES |
| `deceptive-patterns` | YES |
| `ai-native` | YES |
| `checklists` | YES |

→ All 14 names in use exist in the 21-name resolver. PASS.

---

### DW-6.4 — Deleted skill path grep

**Command (before fix):**
```
grep -rn 'skills/design-for-ai|skills/content-design|skills/behavioral|...' --include='*.md' commands/ agents/ docs/ references/
```
**Finding:**
```
docs/pillar-taxonomy.md:18: The existing `skills/design-for-ai/` core is **not** a pillar...
```

**Fix applied:** Updated prose at line 18 of `docs/pillar-taxonomy.md` — replaced `` `skills/design-for-ai/` `` with `` `references/visual/` `` to reflect current on-disk reality.

**Command (after fix):**
```
grep -rn 'skills/design-for-ai|skills/content-design|...' --include='*.md' commands/ agents/ docs/ references/
```
**Output:**
```
(no matches)
```
→ PASS.

---

### palette.mjs smoke run

**Command:**
```
node scripts/palette.mjs --seed 250 --scheme light
```
**Exit code:** 0
**Output (first 5 lines):**
```css
/* Generated by design-for-ai palette.mjs */
/* seed: hue 250 · chroma: balanced · harmony: mono */
:root {
  --neutral-1: #fcfdfd;
  --neutral-2: #f8f9fa;
```
→ palette.mjs runs correctly from `scripts/`. PASS.

## Recommendation

BUILD (sweep complete; one inline prose fix applied; all DW items covered)
