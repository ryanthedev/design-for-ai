# Discovery + Design: Phase 1 — Relocate doctrine → references/

## Files Found

**Core skill (`skills/design-for-ai/`):**
- `SKILL.md` — the 7-mode router (design/surface/fonts/color/audit/enhance/polish). To be DELETED.
- `scripts/palette.mjs` — standalone OKLCH token generator (no deps). → `scripts/palette.mjs`.
- `references/` — 21 files → `references/visual/`:
  ai-tells.md, appendix-fonts-and-typography.md, archetypes.md, chapter-01…09 (9 files),
  checklists.md, design-dna.md, foundations.md, interaction.md, libraries.md, motion.md,
  responsive.md, surfaces.md, techniques.md.

**6 pillar skills** (each = `SKILL.md` + `references/` with 2 files):
| Pillar | SKILL.md → | Sub-refs |
|--------|-----------|----------|
| content-design | content-design.md | content-principles.md, microcopy-patterns.md |
| behavioral | behavioral.md | behavioral-principles.md, ethical-application.md |
| journey | journey.md | journey-caveats.md, journey-stack.md |
| deceptive-patterns | deceptive-patterns.md | dark-patterns.md, honest-alternatives.md |
| design-systems | design-systems.md | design-systems-foundations.md, design-systems-governance.md |
| ai-native | ai-native.md | ai-native-caveats.md, ai-native-principles.md |

Every pillar SKILL.md has YAML frontmatter on lines 1–6 (closing `---` at line 6), blank line 7, body from line 8.

**Untouched (out of scope):** `skills/{usability,data-viz,prototype,clarify}/`, `references/skill-authoring-template.md`, `commands/`, `agents/`, `docs/`, `website/`, `.claude-plugin/`.

## Current State
v3.1.0 layout: core + 8 pillars as discoverable skills under `skills/`; `palette.mjs` nested in the core skill's `scripts/`. `references/` at repo root holds only `skill-authoring-template.md`. No `references/visual/` or root `scripts/` yet.

## Gaps (plan vs reality)
- The scope item "`${CLAUDE_SKILL_DIR}` → `${CLAUDE_PLUGIN_ROOT}/...`" is **moot for references/**: the ONLY files carrying `${CLAUDE_SKILL_DIR}` tokens are inside the core `SKILL.md` (lines 88–302), which is being DELETED, not moved. After deletion `grep -rn '${CLAUDE_SKILL_DIR}' references/` is empty automatically. No surviving doctrine file uses the token.
- Core `SKILL.md` mode-procedure prose (interview rounds, design steps 1–4, the audit section→reference table, palette invocation flag strings) is unique to that file and is NOT duplicated verbatim in the references. The plan **explicitly accepts** deleting it (Notes: "routing reconstituted as resolver entries (P2) + the commands'/agents' phase logic (P3/P4)"). The design-DNA *protocol* (candidate format, remix rules, anti-convergence hue rule, DESIGN.md template) lives in `design-dna.md` (moved). The palette flags are also documented in `palette.mjs`'s own header. Nothing irreplaceable is lost — the procedural orchestration is by-design relocated to the workflow. Flagged here for transparency.

## Code Standards
No `docs/code-standards.md` found. This is a markdown/structure plugin; the governing conventions are `docs/foundations-standards.md` (frontmatter/reference shape) — those are edited in Phase 5, not here.

## Test Infrastructure
No unit-test suite. Validation = shell checks embedded in each DW item: `ls`/`grep` sweeps, a `node scripts/palette.mjs` smoke run, and a relative-link 404 sweep. These are the acceptance tests.

## DW Verification

| DW-ID | Done-When Item | Status | Test (acceptance check) |
|-------|---------------|--------|------|
| DW-1.1 | `references/visual/` has all 21 core refs; `scripts/palette.mjs` exists; `node scripts/palette.mjs --seed 250 --scheme light` exits 0 | COVERED | `ls references/visual \| wc -l` = 21; `test -e scripts/palette.mjs`; run the node smoke command, assert exit 0 |
| DW-1.2 | each of 6 pillars at `references/<pillar>/<pillar>.md`, NO YAML frontmatter, plus former ref files | COVERED | `test -e` each `<pillar>.md`; `head -1` ≠ `---`; `grep -L '^---$'`; list nested `references/` sub-refs |
| DW-1.3 | `ls skills/ \| grep -v -- -workspace` = exactly usability, data-viz, prototype, clarify | COVERED | run that exact pipeline; assert 4 names, no core/pillar dirs |
| DW-1.4 | `grep -rn '${CLAUDE_SKILL_DIR}' references/` empty; `grep -rn 'skill directory' references/` empty; no moved file links to a 404 path | COVERED | run both greps (assert empty); link sweep resolving relative + `${CLAUDE_PLUGIN_ROOT}` paths against disk |

**All items COVERED:** YES (4 DW-IDs in prompt = 4 here).

## Design Decisions

1. **Pillar layout = NESTED, not flattened.** `git mv skills/<pillar> references/<pillar>` moves the whole dir (history-clean, single atomic move), yielding `references/<pillar>/<pillar>.md` + `references/<pillar>/references/<sub>.md`. **Rationale:** every pillar body uses *relative* prose pointers (`Read references/<sub>.md`); nesting keeps those valid with ZERO prose edits — honoring "do not rewrite doctrine prose, only repair links" and the refactoring discipline (minimize churn). Flattening would force editing ~15 internal pointers across 6 files for cosmetic gain. DW-1.2 ("plus its former reference files") is satisfied either way.
2. **`references/visual/` = flat.** `git mv skills/design-for-ai/references references/visual` (21 files flat, mirrors source). The one intra-visual relative link (`surfaces.md` → `responsive.md`) stays valid (both land in `references/visual/`). All anchor links are intra-file → preserved by the move.
3. **Core `SKILL.md` deleted** (`git rm`), per plan. Documented above; no silent loss.
4. **Path-repair idiom = `${CLAUDE_PLUGIN_ROOT}/references/...`** for relocated doctrine (per plan's path idiom). Paths to *surviving* skills (`skills/usability/...`) are left as repo-relative — they still resolve (usability untouched), so no 404, no required edit.
5. **Frontmatter strip = delete lines 1–7** (frontmatter block + the single blank line 7) per pillar; verified uniform across all 6. Result verified by the DW-1.2 `^---$` head check.

### Link/path repairs the move breaks (the only doctrine edits)
| File (post-move) | Old | New |
|---|---|---|
| `references/visual/design-dna.md` | ``scripts/palette.mjs` in the skill directory — full invocation in SKILL.md design step 3` | ``${CLAUDE_PLUGIN_ROOT}/scripts/palette.mjs`` (drops "skill directory" + the now-dangling SKILL.md pointer) |
| `references/deceptive-patterns/deceptive-patterns.md` | `skills/design-for-ai/references/ai-tells.md` | `${CLAUDE_PLUGIN_ROOT}/references/visual/ai-tells.md` |
| `references/deceptive-patterns/references/dark-patterns.md` | `skills/design-for-ai/references/ai-tells.md` | `${CLAUDE_PLUGIN_ROOT}/references/visual/ai-tells.md` |
| `references/deceptive-patterns/references/honest-alternatives.md` | `the behavioral skill (`skills/behavioral/`)` | `the behavioral doctrine (`${CLAUDE_PLUGIN_ROOT}/references/behavioral/`)` |

### Deferred (NOT a Phase-1 gate; later phases own it)
- Descriptive "core `design` skill / mode" prose in pillar bodies (behavioral-principles.md, ethical-application.md, design-systems.md + its refs). These are *conceptual* references, not file paths — they do not 404 and DW-1.4 does not gate them. Per the plan Notes, the core's routing is reconstituted by the resolver (P2) and command/agent logic (P3/P4); rewriting this prose now risks doctrine drift and is out of Phase-1 scope.
- `skills/usability/...` repo-relative pointers in behavioral/deceptive-patterns refs — valid (usability stays a skill).

## Prerequisites
- [x] Worktree `feature/doctrine-overhaul` clean except untracked `.code-foundations/`.
- [x] All source files exist; `git mv` available; no `*-workspace/` dirs present.
- [x] `node` available for the palette smoke test.

## Recommendation
**BUILD.** All four DW items are COVERABLE by `git mv` + 4 targeted link repairs + frontmatter strip. No new scope, no unmeetable item.
