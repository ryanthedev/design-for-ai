# Discovery + Design: Phase 4 — Rewire agents to Read() doctrine

## Files Found

- `agents/design-build-agent.md` — 230 lines; present and in original Skill() state
- `agents/design-review-agent.md` — 160 lines; present and in original Skill() state

## Current State

Both agents still use the `## Additional Skills` / `Skill()` pattern:

**design-build-agent.md change sites:**

| Line | Current content |
|------|----------------|
| 3 | description: "…Loads the phase's pillar skills…" |
| 8 | "Per-phase pillar skills add domain guidance on top…" |
| 12 | `## STOP - Load Phase Skills` header |
| 14 | "invoke EVERY `Skill(...)` line … via the Skill tool" |
| 16 | "If there is no `## Additional Skills` section:" |
| 60 | `skills/design-for-ai/scripts/palette.mjs` (orphaned path) |
| 107 | "If a pillar skill is assigned, run its design step…" |
| 144 | "If a pillar skill is assigned, its chosen approach lands here." |
| 148 | "Apply the assigned pillar checklists…" |
| 197 | `### Skills Loaded` (Full mode output) |
| 198 | `[pillar skills invoked, or "None assigned"]` |
| 220 | `### Skills Loaded` (Minimal mode output) |
| 221 | `[pillar skills invoked, or "None assigned"]` |

**design-review-agent.md change sites:**

| Line | Current content |
|------|----------------|
| 3 | description: "…dispatches only the applicable pillars…" |
| 21 | `## STOP - Load Phase Skills` header |
| 22 | "invoke EVERY `Skill(...)` line … via the Skill tool" |
| 24 | "Dispatch pillars by loading their sibling skill as the triage step directs." |
| 57 | "dispatch a pillar **only when its signal is actually present**" |
| 59 | table column: `Dispatch (sibling pillar skill)` |
| 67 | "dispatch *only* the visual + usability baseline" |
| 71 | `### Step 2 — Dispatch: hand off to each applicable pillar, gather findings` |
| 72 | "run its **sibling skill** evaluation against the rendered surface" |
| 73 | "Visual baseline: the core `design-for-ai` visual checklist" |
| 74 | "Usability baseline: the `usability` skill's heuristic evaluation" |
| 76 | "cap the dispatch at the highest-value pillars" |
| 87 | "suggest the right workflow stage or sibling skill to fix each issue" |

## Gaps

- `design-build-agent.md` line 60 references the deleted `skills/design-for-ai/scripts/palette.mjs` path (DW-4.4).
- Both agents invoke `Skill()` for doctrine (DW-4.1).
- `design-review-agent.md` uses "sibling skill" language in 4 places (DW-4.3).
- Neither agent has a `## Doctrine` resolve+Read() block (DW-4.2).

## Code Standards

No `docs/code-standards.md` found. The reference format is established by P3's `commands/build.md`:

```
## Doctrine
Look up each name in docs/pillar-taxonomy.md §5, then Read() the file
before starting work:
- [doctrine name]
```

The agent-body wording standard is governed by `oberskills:prompt` (loaded): concise, positive framing, no legacy CRITICAL/MUST scaffolding, explain what to do.

## Test Infrastructure

No unit suite. "Tests" are DW shell checks — grep commands verifying the exact text pattern.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-4.1 | `grep -rn 'Skill(' agents/` returns no pillar/doctrine invocations | COVERED | Remove `## STOP - Load Phase Skills` blocks; replace with `## STOP - Load Doctrine` + Read() prose; re-run grep confirms zero `Skill(` in agents/ |
| DW-4.2 | Both agents document a `## Doctrine` block that resolves names via the resolver and Read()s paths before work | COVERED | Replace both `## STOP - Load Phase Skills` sections with `## STOP - Load Doctrine` sections; inspect quoted block from each file |
| DW-4.3 | `grep -n 'sibling' agents/design-review-agent.md` is clean | COVERED | Four occurrences at lines 24, 59, 72, 87 — each replaced; re-run grep confirms clean |
| DW-4.4 | `grep -rn 'skills/design-for-ai' agents/` returns nothing | COVERED | Line 60 of design-build-agent.md updated to `${CLAUDE_PLUGIN_ROOT}/scripts/palette.mjs`; re-run grep confirms clean |

**All items COVERED:** YES

## Design Decisions

**Doctrine block wording (oberskills:prompt applied):** Mirror the exact format from `commands/build.md`'s dispatch block — "Look up each name in `docs/pillar-taxonomy.md §5`, then `Read()` the file before starting/reviewing." Positive framing; no CRITICAL escalation. The STOP header is retained because it is a functional agent protocol marker (not legacy scaffolding).

**Review-agent triage language:** "sibling skill" → "pillar's doctrine". "Dispatch" as a verb is fine where it means "activate this pillar's evaluation" — only occurrences that imply `Skill()` invocation are updated. The Step 2 header renamed to "Apply Doctrine" to make the Read() mechanism explicit. The always-on baseline now names the resolver entries (`design-dna`, `checklists`, `usability`).

**Line 87 "sibling skill":** "suggest the right workflow stage or sibling skill" → "suggest the right workflow stage or doctrine entry" — clean substitution, preserves the guidance intent.

**Frontmatter descriptions:** Update to replace "Loads the phase's pillar skills" / "dispatches only the applicable pillars" with doctrine-model language, since the description is the agent's public contract.

**Scope boundaries:** commands/ untouched (P3 complete); docs/ untouched (P5 scope). Only `agents/design-build-agent.md` and `agents/design-review-agent.md` are modified.

## Prerequisites

- [x] Phase 1 committed (7959a1b) — doctrine at `references/`, scripts at `scripts/`
- [x] Phase 2 committed (a4f5985) — resolver at `docs/pillar-taxonomy.md §5`
- [x] Phase 3 committed (9952720) — commands use `## Doctrine` format (reference for agent mirroring)
- [x] `${CLAUDE_PLUGIN_ROOT}/scripts/palette.mjs` exists (target for DW-4.4 fix)

## Recommendation

BUILD — all prerequisites met, all DW items covered, no blockers.
