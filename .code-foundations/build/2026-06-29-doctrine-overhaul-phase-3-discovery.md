# Discovery + Design: Phase 3 — Rewire commands to the doctrine model

## Files Found

- `commands/plan.md` — 278 lines; 16 edit sites identified
- `commands/build.md` — 332 lines; 6 edit sites identified
- `commands/mock.md` — 151 lines; 1 edit site identified
- `commands/research.md` — 142 lines; 0 edit sites (confirmed no doctrine/pillar loading)
- `docs/pillar-taxonomy.md` §5 — resolver table with 21 canonical names, all paths verified in Phase 2

## Current State

All three commands use the old Skill()-based doctrine loading model:

| File | Skill() sites | "triggerable" | "9 design skills" | "Additional Skills" blocks | "dispatch.*pillar" |
|------|--------------|---------------|-------------------|---------------------------|--------------------|
| plan.md | 2 (lines 96, 125, 176 — `Skill(<pillar>)` instructional prose) | 1 (line 96) | 2 (lines 190, 246) | 0 | 0 |
| build.md | 2 (lines 178, 231 — dispatch template bodies) | 1 (line 95) | 0 | 2 (lines 176, 229) | 0 |
| mock.md | 0 | 0 | 0 | 0 | 1 (line 117) |

`research.md` — clean: no Skill() doctrine invocations, no "triggerable", no pillar-loading prose.

## Gaps

None between plan and reality. All 6 DW items are satisfiable with precise text replacements. No structural surprises.

## Code Standards

No `docs/code-standards.md` found — this is a markdown/command plugin; conventions come from `docs/foundations-standards.md` and the plan itself.

## Test Infrastructure

Per-phase grep sweeps — no runtime test suite. Verification = shell commands returning specific output.

---

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-3.1 | `grep -rn 'Skill(' commands/` returns no pillar/doctrine invocation (only `Skill(clarify)` may remain) | COVERED | `grep -n 'Skill' commands/*.md` after edits — only plan.md:66 remains |
| DW-3.2 | `grep -rn 'triggerable' commands/` returns nothing | COVERED | Remove from plan.md:96 ("Pillars stay triggerable regardless") and build.md:95 ("Pillars stay triggerable; the workflow loads them by name regardless") |
| DW-3.3 | plan.md emits `**Doctrine:**` per phase and validates against resolver; build.md emits `## Doctrine` block that resolves + Read()s | COVERED | Show plan.md phase template + build.md dispatch template excerpts after edits |
| DW-3.4 | research.md confirmed unchanged | COVERED | `git diff --stat commands/research.md` shows no change (never touched) |
| DW-3.5 | `grep -rn '9 design skills\|9 pillars' commands/` returns nothing | COVERED | Remove from plan.md:190 and plan.md:246 — replace with resolver reference |
| DW-3.6 | `grep -rn 'dispatch.*pillar\|pillar.*dispatch' commands/mock.md` returns nothing | COVERED | Change mock.md:117 "dispatches only applicable pillars" → "reads only applicable doctrine" |

**All items COVERED: YES** (6/6)

---

## Design Decisions

### Applying `oberskills:prompt` to dispatch-block wording

Target: the `## Doctrine` blocks in build.md's agent dispatch templates — these are **dispatch briefs** consumed by current Claude.

Principles applied:
- **Principle 1 (smallest high-signal tokens):** The block needs one imperative + the list of names. No explanation of "why doctrine exists" inside the block itself — the agent doesn't need that context.
- **Principle 2 (explain why; positive framing):** Phrase as "look up in the resolver and Read() the file" not "do NOT use Skill()".
- **Principle 3 (de-prompt):** No "CRITICAL" or "BEFORE starting work — do NOT proceed without...". The temporal order (Read before work) is stated once, cleanly.
- **Principle 4 (governance apart from task):** The `## Doctrine` block is structurally separate from the `## Plan Context` and `## Done-When Items` blocks — already the case.

Chosen form:
```
[if the phase has a **Doctrine:** field with names other than `none`:]
## Doctrine
Look up each name in docs/pillar-taxonomy.md §5, then Read() the file before starting work:
- [doctrine name]
```

### Resolver name canonicalization in plan.md stage map

The old stage map used `core \`design-for-ai\`` (design mode) and `core \`design-for-ai\`` (fonts/color). These map to resolver names:
- Design mode → `design-dna` (primary; `archetypes`, `foundations` as relevant companions)
- Fonts/color → `fonts`, `color`

These are the exact resolver names from §5. The stage map column header changes from `Pillar(s)` to `Doctrine`.

### "none" edge case

When a phase has `**Doctrine:** none -- [reason]`, the `## Doctrine` block is omitted from the dispatch. The guard `[if the phase has a **Doctrine:** field with names other than \`none\`:]` covers this.

### Missing resolver name behavior

If a `**Doctrine:**` name is absent from the resolver → the command STOPs and surfaces the gap. This mirrors the old missing-skill behavior. Added to both plan.md SAVE validation and build.md Doctrine Resolution.

### `clarify` stays a `Skill()`

`Skill(clarify)` at plan.md:66 is a tool-skill invocation, not doctrine. Left unchanged per scope.

---

## Edit Site Inventory

### plan.md (16 sites)

| # | Line | Old text (key excerpt) | Change |
|---|------|------------------------|--------|
| 1 | 2 (frontmatter) | "assign pillar skills per phase" | → "assign doctrine per phase" |
| 2 | 8 | "references and sequences the pillar skills" | → "references and sequences doctrine by name" |
| 3 | 84 | "stage fixes the pillar(s)" | → "stage fixes the doctrine" |
| 4 | 86-94 | stage map: `Pillar(s)` column; core references | → `Doctrine` column; `design-dna`/`fonts`,`color` |
| 5 | 96 | "`Skill(<pillar>)`) and sequences them — ... Pillars stay triggerable regardless." | → doctrine-names sentence, no Skill(), no triggerable |
| 6 | 121 | `` `**Skills:**` (the matched pillar(s)) `` | → `` `**Doctrine:**` (names from the stage map…) `` |
| 7 | 125 | "load the phase's matched pillars (`Skill(<pillar>)`)" | → "resolve doctrine names via resolver, Read()" |
| 8 | 129 | "each phase carries `**Skills:**`" | → "each phase carries `**Doctrine:**`" |
| 9 | 149 | `` **Skills:** (matched from the stage map…) `` | → `**Doctrine:**` |
| 10 | 162 | skeleton example `Skills: journey` | → `Doctrine: journey` |
| 11 | 176 | "Load the phase's pillars — `Skill(<pillar>)`" | → "Load the phase's doctrine — resolve + Read()" |
| 12 | 190 | "every phase has `**Skills:**`; every name is one of the 9 design skills…" | → Doctrine + resolver reference; add STOP on absent name |
| 13 | 200 | phase template `` **Skills:** [matched pillar(s)…] `` | → `` **Doctrine:** [matched names…] `` |
| 14 | 246 | "Skills: every phase has a Skills field; each name is one of the 9 design skills" | → "Doctrine: every phase has a Doctrine field; each name exists in the resolver" |
| 15 | 260 | "matched pillars" | → "matched doctrine" |

(Note: site 15 is DW-adjacent cleanup; it contains "pillar" but not in a `dispatch.*pillar|pillar.*dispatch` pattern so it doesn't hit DW-3.6.)

### build.md (6 sites)

| # | Line | Change |
|---|------|--------|
| 1 | 72 | `**Skills:**` → `**Doctrine:**`; "become the agents' `## Additional Skills`" → "become the `## Doctrine` block in each agent dispatch" |
| 2 | 93 | `### Skill Resolution` → `### Doctrine Resolution` |
| 3 | 95 | Full paragraph: Skills field → Doctrine field; pillar validation → resolver lookup; delete "Pillars stay triggerable" sentence |
| 4 | 135 | `## Additional Skills` / `Skill()` prose → `## Doctrine` / `Read()` prose |
| 5 | 175-179 | `## Additional Skills` dispatch block → `## Doctrine` dispatch block |
| 6 | 228-232 | `## Additional Skills` dispatch block → `## Doctrine` dispatch block |

### mock.md (1 site)

| # | Line | Change |
|---|------|--------|
| 1 | 117 | "dispatches only applicable pillars" → "reads only applicable doctrine" |

---

## Prerequisites

- [x] Phase 1 committed (7959a1b) — `references/` tree and `scripts/palette.mjs` exist
- [x] Phase 2 committed (a4f5985) — resolver table in `docs/pillar-taxonomy.md §5` with 21 canonical names
- [x] Resolver names confirmed — all 21 verified against on-disk paths in Phase 2 review
- [x] `research.md` confirmed to contain no doctrine/pillar loading (safe to leave untouched)

## Recommendation

**BUILD** — all prerequisites met; all DW items covered; no blocking gaps.
