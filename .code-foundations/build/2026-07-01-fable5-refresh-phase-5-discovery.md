# Discovery + Design: Phase 5 - Composition dealer — seeded, layout-first divergence

## Files Found
- `scripts/palette.mjs` — exists (315 lines). No golden-angle logic today (harmonies are fixed offsets); has `HUE_NAMES`/`hueName`. CLI runs at top level (lines 300–315), so a bare `import` would execute it — the hue-walk hook must add a main-module guard.
- `references/visual/design-dna.md` — exists. Carries the Phase 4 seam: `composition: <dealt>` at the Four Axes table (line 71), in the candidate spec block (line 134), and in the DESIGN.md template (line 185), all saying "forthcoming".
- `references/visual/ai-tells.md` — exists. Named tell aesthetics + Checkable Signatures table (dated 2026-07) to map to banned cells.
- `references/visual/archetypes.md` — Part B documents exactly 12 aesthetic families.
- `scripts/dealer.mjs`, `scripts/dealer.test.mjs` — do NOT exist (this phase creates them).

## Current State
Phase 4 left the DNA pipeline as ground→diverge→critique→converge→gate with composition as the one axis awaiting a dealt token. Hue spread is currently a doctrine rule (5 named hue families, model-chosen); composition spread has NO mechanism — exactly the verified root cause.

## Gaps
1. **Plan says palette.mjs is the "source of the golden-angle hue logic" — it is not.** No 137.5° walk exists there. Resolution (within the plan's own constraint text, which says "a minimal export/hook so the dealer can reuse the golden-angle logic"): ADD `GOLDEN_ANGLE`/`hueWalk` exports + export `hueName`/`HUE_NAMES`, and guard the existing CLI body with a main-module check so importing is side-effect-free. No other refactor. CLI output must be verified byte-identical before/after.
2. **The dealer never needs to shell out to palette.mjs** (it deals a hue, not a palette), so the exit-code-2 gotcha is documented in doctrine (the DNA pipeline runs palette.mjs per candidate) rather than exercised in dealer code. Each hand carries a ready-to-run `paletteCommand` string as the seam.
3. **DW-5.1 (byte-identical re-run) vs DW-5.2 (dealt cells excluded next run) conflict** if exclusion is naive: run 2 of the same command would exclude run 1's cells. Resolution: `used-dna.json` is a keyed ledger. Same seed key → REPLAY the stored output verbatim (byte-identical, idempotent). Different key → deal, excluding all other keys' cells, append. This also makes the reject→re-deal edge case fall out naturally (`--reroll N+1` = new key; both entries recorded).
4. One signature-move example in design-dna.md ("section numbers in 120px hanging in the margin") collides with Phase 3's `numbered-section-markers` copy tell — excluded from the dealer's signature deck.

## Code Standards
No `docs/code-standards.md` found. Conventions taken from `palette.mjs` itself: Node ESM `.mjs`, zero dependencies, header comment with usage/flags, `parseArgs` loop over `--flags`, `fail(msg)` → stderr + exit 1, `+x.toFixed(2)` rounding, deterministic everywhere.

## Test Infrastructure
No test harness exists anywhere in the repo (no package.json, no runner). Per dispatch: self-contained `node scripts/dealer.test.mjs` that exits nonzero on failure. It spawns the CLI via `child_process` for CLI-level DW checks and imports the exported pure core for unit-level checks.

## Design Decisions

### Data model — the cell space
- **Cell = (family, composition discipline).** Exclusions and bans operate on cells, per plan. Hue and signature are dealt per-hand but are not part of the exclusion identity.
- **Families: 12** — exactly the documented `archetypes.md` Part B set (editorial-minimalism, warm-editorial, swiss-international, neo-brutalist, terminal-mono, data-dense-professional, cinematic-dark, playful-geometric, soft-futurism, art-deco-luxury, organic-natural, retro-futurist). The research atlas has 45+, but a dealt family must have doctrine the model can execute against; 12 documented beats 45 undocumented. Count stated per plan.
- **Composition disciplines: 9** (≥6 required), each documented in-script across the six dimensions (scale, density, symmetry, hierarchy, ground, dominant element) and each carrying a unique `variance` value on the DESIGN_VARIANCE-compatible 1–10 dial (centered/clean ↔ asymmetric/modern):
  1. monolith-center (1) · 2. ledger-grid (2) · 3. swiss-modular (3) · 4. frieze-bands (4) · 5. marginalia (5) · 6. split-stage (6) · 7. editorial-spread (7) · 8. poster-bleed (8) · 9. fractured-grid (9)
  Note: there is deliberately NO "uniform card grid" discipline — that tell cell is structurally unreachable, stated in source.
- **Signatures: 12** signature-element seeds (hard-offset-shadow, accent-scarcity, box-drawing-borders, logo-polygon-mask, border-interrupt-headings, baseline-ruler, oversize-punctuation, marginalia-stamps, single-diagonal, duotone-images, footnote-apparatus, exposed-grid), dealt without replacement within a run.

### Cell-space size (the required computation)
- 12 families × 9 disciplines = **108 cells**; − **6 banned** = **102 legal cells** in a fresh directory.
- A 5-candidate deal consumes 5 cells → hard exhaustion at deal #21 in one directory (102/5 = 20.4). A project's plausible lifetime is 1–3 deals (initial + one reroll + one loop-back = ≤15 cells excluded), leaving 87 legal. **Exclusions cannot plausibly exhaust the space**; the exhaustion error path exists for the pathological case and is tested.
- Full hand space (with signature and continuous hue): 108 × 12 × ~continuous ≫ 10³ distinct hands.

### Banned cells (ai-tells.md → (family, discipline) mapping, each cited in source)
1. (cinematic-dark, ledger-grid) — cyan-on-dark "AI dashboard" / metric-dashboard template
2. (cinematic-dark, monolith-center) — dark-mode-default + glowing centered hero
3. (soft-futurism, monolith-center) — purple-to-blue gradient "AI product" centered hero
4. (soft-futurism, ledger-grid) — decorative glassmorphism panel dashboard
5. (terminal-mono, ledger-grid) — dark+acid-green terminal cluster / monospace-as-shorthand dashboard
6. (warm-editorial, editorial-spread) — cream+serif+terracotta escape-hatch home cell
Adjacency stays legal (e.g. (cinematic-dark, swiss-modular), (warm-editorial, marginalia), (data-dense-professional, ledger-grid)) — only exact cells are banned; tested.

### Seed + PRNG
- `seedString = "${project}|${date}|${reroll}"` → xmur3 string hash → mulberry32. No `Math.random()`, no `Date.now()` (a test greps the source for both). `--date` validated as `YYYY-MM-DD` without Date APIs.
- Fixed draw order for determinism: (1) baseHue = rand()×360, (2) Fisher–Yates over legal cells, (3) Fisher–Yates over signatures.
- Hue: `hue_i = (baseHue + i × 137.50776405003785) mod 360` via the palette.mjs `hueWalk` export. Min pairwise separation across 5 hands = 52.5°, which keeps all 5 in distinct `HUE_NAMES` families (bands are 15–35° wide).

### Deal algorithm
Legal = all cells − banned − excluded (ledger entries with a different key). If `legal.length < candidates` → clear error, exit 3 (never loops, never repeats a cell). Otherwise seeded-shuffle + backtracking to find `candidates` cells with pairwise-distinct families AND disciplines; if no such assignment exists, relax deterministically (tier 2: distinct families; tier 3: distinct cells only) with the tier recorded in output. Backtracking is finite; exhaustion is caught by the count check first.

### CLI
`node scripts/dealer.mjs --project <name> --date YYYY-MM-DD [--candidates 5] [--reroll 0] [--used ./used-dna.json]`. Exit 0 = deal/replay; 1 = usage; 3 = exhaustion. Pure core exported (`deal`, `FAMILIES`, `DISCIPLINES`, `BANNED_CELLS`, `SIGNATURES`) under a main-module guard, mirroring the palette.mjs hook.

### Doctrine (design-dna.md)
New "The Composition Dealer" section: what is dealt; **the inversion stated explicitly** (model justifies and executes the dealt hand — it does not choose); re-deal protocol (`--reroll N+1`, both recorded); used-dna.json exclusion + banned cells + adjacency-legal; the DESIGN_VARIANCE dial semantics; honest collision limit (local ledger, no shared server — cross-user collisions rare, not impossible); the palette exit-code-2 note for downstream consumers. The three `<dealt>` slot lines and Diverge rule 2's hue-justification line get reconciled to the dealer.

## Prerequisites
- [x] Phase 4 seam (`composition: <dealt>` slot) present in design-dna.md
- [x] Phase 3 tells catalog present with named aesthetics + Checkable Signatures
- [x] Node v22.17.0 available; no dependencies needed

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-5.1 | Dealer CLI exits 0, emits 5 hands (family, composition discipline, hue, signature) as JSON; re-run byte-identical; seed+1 differs | COVERED | `test_DW_5_1_exit0_and_shape`, `test_DW_5_1_rerun_byte_identical`, `test_DW_5_1_different_seed_differs` (covers both `--reroll 1` and a different `--date`) |
| DW-5.2 | ≥6 documented disciplines; hue follows golden-angle walk; used-dna.json exclusion works mechanically | COVERED | `test_DW_5_2_disciplines_documented`, `test_DW_5_2_golden_angle_walk`, `test_DW_5_2_exclusion_across_runs` |
| DW-5.3 | AI-tell cells banned — verifiable in source AND never emitted over many seeds | COVERED | `test_DW_5_3_banned_cells_in_source`, `test_DW_5_3_never_emits_banned_many_seeds` (300 fresh seeds), `test_DW_5_3_adjacency_is_legal` |
| DW-5.4 | design-dna.md documents the dealer contract: inversion, re-deal protocol, honest collision limit | COVERED | `test_DW_5_4_doctrine_contract` (mechanical grep of the doctrine section for all three required elements) |

**Count check:** 4 DW-IDs in prompt = 4 rows above. **All items COVERED: YES**

Beyond-DW tests planned: exhaustion error (exit 3, clear message, no loop), reject→re-deal records both entries with disjoint cells, replay-verbatim after an intervening foreign-key run, no `Math.random`/`Date.now` in source, palette.mjs CLI still works and exports import cleanly, hue names match `hueName`, within-deal distinct families/disciplines, variance dial values well-formed (1–10, one per discipline).

## Recommendation
**BUILD** — all prerequisites met, seam is in place, cell space (102 legal cells) comfortably exceeds plausible exclusion counts.
