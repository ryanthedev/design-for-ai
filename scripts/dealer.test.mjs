#!/usr/bin/env node
// dealer.test.mjs — self-contained test suite for dealer.mjs.
// Run: node scripts/dealer.test.mjs   (exits nonzero on any failure)
// DW-item tests carry their DW-ID in the test name for traceability.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  FAMILIES, DISCIPLINES, SIGNATURES, BANNED_CELLS,
  allCells, legalCells, deal, ExhaustionError,
} from "./dealer.mjs";
import { GOLDEN_ANGLE, hueWalk, hueName } from "./palette.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEALER = join(HERE, "dealer.mjs");
const PALETTE = join(HERE, "palette.mjs");

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`PASS  ${name}`); }
  catch (e) { failed++; console.error(`FAIL  ${name}\n      ${e.message}`); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
const eq = (a, b, msg) => assert(a === b, `${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

// Run the dealer CLI in `dir` (its own used-dna.json); never throws — returns status.
function run(dir, args) {
  try {
    const stdout = execFileSync("node", [DEALER, ...args], { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { status: 0, stdout };
  } catch (e) {
    return { status: e.status, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}
const tmp = () => mkdtempSync(join(tmpdir(), "dealer-test-"));
const BASE = ["--project", "test", "--date", "2026-07-01", "--candidates", "5"];
const cellsOf = (out) => out.hands.map((h) => `${h.family.id}::${h.composition.id}`);

// ---------- DW-5.1 ----------

test("test_DW_5_1_exit0_and_shape", () => {
  const dir = tmp();
  const r = run(dir, BASE);
  eq(r.status, 0, "exit code");
  const out = JSON.parse(r.stdout);
  eq(out.hands.length, 5, "hand count");
  for (const h of out.hands) {
    assert(h.family?.id && h.family?.name, `hand ${h.index} missing family`);
    assert(h.composition?.id && typeof h.composition.variance === "number", `hand ${h.index} missing composition`);
    assert(typeof h.hue?.deg === "number" && h.hue?.name, `hand ${h.index} missing hue`);
    assert(h.signature?.id && h.signature?.text, `hand ${h.index} missing signature`);
  }
  rmSync(dir, { recursive: true });
});

test("test_DW_5_1_rerun_byte_identical", () => {
  const dir = tmp();
  const a = run(dir, BASE);
  const b = run(dir, BASE); // replayed from the ledger
  eq(b.status, 0, "re-run exit code");
  assert(a.stdout === b.stdout, "re-run stdout is not byte-identical");
  // …and still byte-identical after an unrelated seed dealt in between
  run(dir, ["--project", "other", "--date", "2026-07-01"]);
  const c = run(dir, BASE);
  assert(a.stdout === c.stdout, "replay after a foreign deal is not byte-identical");
  rmSync(dir, { recursive: true });
});

test("test_DW_5_1_different_seed_differs", () => {
  const a = run(tmp(), BASE).stdout;
  const reroll = run(tmp(), [...BASE, "--reroll", "1"]).stdout; // seed+1
  const otherDate = run(tmp(), ["--project", "test", "--date", "2026-07-02", "--candidates", "5"]).stdout;
  assert(a !== reroll, "--reroll 1 produced an identical deal");
  assert(a !== otherDate, "a different --date produced an identical deal");
});

// ---------- DW-5.2 ----------

test("test_DW_5_2_disciplines_documented", () => {
  assert(DISCIPLINES.length >= 6, `only ${DISCIPLINES.length} disciplines (need >=6)`);
  for (const d of DISCIPLINES)
    for (const dim of ["scale", "density", "symmetry", "hierarchy", "ground", "dominantElement"])
      assert(typeof d[dim] === "string" && d[dim].length > 0, `${d.id} missing dimension ${dim}`);
  // DESIGN_VARIANCE-compatible dial: 1-10, unique per discipline
  const dials = DISCIPLINES.map((d) => d.variance);
  assert(dials.every((v) => Number.isInteger(v) && v >= 1 && v <= 10), "variance outside 1-10");
  eq(new Set(dials).size, DISCIPLINES.length, "variance dial values not unique");
});

test("test_DW_5_2_golden_angle_walk", () => {
  const out = JSON.parse(run(tmp(), BASE).stdout);
  out.hands.forEach((h, i) => {
    const expected = +hueWalk(out.baseHue, i).toFixed(2);
    // baseHue is emitted rounded; allow the rounding epsilon
    assert(Math.abs(h.hue.deg - expected) < 0.02, `hand ${i + 1} hue ${h.hue.deg} != walk ${expected}`);
    eq(h.hue.name, hueName(h.hue.deg), `hand ${i + 1} hue name`);
  });
  for (let i = 1; i < out.hands.length; i++) {
    const delta = (out.hands[i].hue.deg - out.hands[i - 1].hue.deg + 360) % 360;
    assert(Math.abs(delta - GOLDEN_ANGLE) < 0.02, `consecutive hue delta ${delta.toFixed(2)} != ${GOLDEN_ANGLE}`);
  }
});

test("test_DW_5_2_exclusion_across_runs", () => {
  const dir = tmp();
  const a = JSON.parse(run(dir, BASE).stdout);
  const b = JSON.parse(run(dir, ["--project", "second", "--date", "2026-07-01", "--candidates", "5"]).stdout);
  const aCells = new Set(cellsOf(a));
  for (const c of cellsOf(b)) assert(!aCells.has(c), `cell ${c} dealt to run A was re-dealt to run B`);
  eq(b.cellSpace.excluded, 5, "run B excluded count");
  const ledger = JSON.parse(readFileSync(join(dir, "used-dna.json"), "utf8"));
  eq(ledger.entries.length, 2, "ledger entry count");
  rmSync(dir, { recursive: true });
});

// ---------- DW-5.3 ----------

test("test_DW_5_3_banned_cells_in_source", () => {
  // The ai-tells.md named aesthetics, mapped to exact cells, present in source.
  const keys = new Set(BANNED_CELLS.map((c) => `${c.family}::${c.discipline}`));
  for (const expect of [
    "cinematic-dark::ledger-grid",      // cyan-on-dark AI dashboard
    "soft-futurism::monolith-center",   // purple-gradient AI-product hero
    "cinematic-dark::monolith-center",  // dark-default + glowing centered hero
    "terminal-mono::ledger-grid",       // dark+acid-green terminal cluster
    "warm-editorial::editorial-spread", // cream+serif+terracotta cluster
  ]) assert(keys.has(expect), `banned cell ${expect} missing from BANNED_CELLS`);
  for (const c of BANNED_CELLS) assert(c.tell?.includes("ai-tells.md"), `${c.family}::${c.discipline} lacks ai-tells.md citation`);
  // No uniform-card-grid discipline exists — that layout tell is unreachable.
  assert(!DISCIPLINES.some((d) => /card/i.test(d.id) || /card grid/i.test(d.name)), "a card-grid discipline exists");
});

test("test_DW_5_3_never_emits_banned_many_seeds", () => {
  const banned = new Set(BANNED_CELLS.map((c) => `${c.family}::${c.discipline}`));
  for (let i = 0; i < 300; i++) {
    const out = deal({ project: `sweep-${i}`, date: "2026-07-01", candidates: 5 });
    for (const c of cellsOf(out)) assert(!banned.has(c), `seed sweep-${i} dealt banned cell ${c}`);
  }
});

test("test_DW_5_3_adjacency_is_legal", () => {
  // Cells one step from a banned cell (sharing its family OR its discipline) stay legal…
  const legal = new Set(legalCells().map((c) => `${c.family}::${c.discipline}`));
  for (const adj of [
    "cinematic-dark::swiss-modular",        // banned family, legal discipline
    "data-dense-professional::ledger-grid", // legal family, banned discipline
    "warm-editorial::marginalia",
    "editorial-minimalism::editorial-spread",
    "soft-futurism::split-stage",
    "terminal-mono::frieze-bands",
  ]) assert(legal.has(adj), `adjacent cell ${adj} wrongly banned`);
  // …and are actually emittable: the 300-seed sweep must deal at least one of them.
  const adjacent = new Set(
    legalCells()
      .filter((c) => BANNED_CELLS.some((b) => b.family === c.family || b.discipline === c.discipline))
      .map((c) => `${c.family}::${c.discipline}`)
  );
  let hit = false;
  for (let i = 0; i < 300 && !hit; i++) {
    const out = deal({ project: `sweep-${i}`, date: "2026-07-01", candidates: 5 });
    hit = cellsOf(out).some((c) => adjacent.has(c));
  }
  assert(hit, "no adjacent-to-banned cell was ever dealt across 300 seeds");
});

// ---------- DW-5.4 ----------

test("test_DW_5_4_doctrine_contract", () => {
  const doc = readFileSync(join(HERE, "..", "references", "visual", "design-dna.md"), "utf8");
  assert(/justif\w+ and execut\w+ the dealt hand/i.test(doc), "inversion (justify-and-execute) not documented");
  assert(/--reroll/.test(doc) && /both .*recorded|recording both|both deals/i.test(doc), "re-deal protocol not documented");
  assert(/collision/i.test(doc) && /rare[, ].*not impossible/i.test(doc), "honest collision limit not documented");
  assert(/DESIGN_VARIANCE/.test(doc), "DESIGN_VARIANCE dial semantics not documented");
  assert(!/dealer.*forthcoming|forthcoming.*dealer/i.test(doc), "stale 'forthcoming' dealer language remains");
});

// ---------- beyond the DW floor ----------

test("test_exhaustion_errors_cleanly", () => {
  // Unit: exclusions leave 3 legal cells, 5 requested → ExhaustionError.
  const nearlyAll = legalCells().slice(0, legalCells().length - 3);
  let threw = null;
  try { deal({ project: "x", date: "2026-07-01", candidates: 5, excluded: nearlyAll }); }
  catch (e) { threw = e; }
  assert(threw instanceof ExhaustionError, "no ExhaustionError thrown");
  assert(/exhausted/.test(threw.message) && /3 legal cells/.test(threw.message), `message unclear: ${threw.message}`);

  // CLI: a ledger consuming all but 3 cells → exit 3, clear stderr, terminates.
  const dir = tmp();
  const hands = nearlyAll.map((c, i) => ({
    index: i + 1,
    family: FAMILIES.find((f) => f.id === c.family),
    composition: DISCIPLINES.find((d) => d.id === c.discipline),
    hue: { deg: 0, name: "red", paletteCommand: "" },
    signature: SIGNATURES[0],
  }));
  writeFileSync(join(dir, "used-dna.json"), JSON.stringify({
    version: 1,
    entries: [{ seed: "fixture|2026-01-01|0", output: { hands } }],
  }));
  const r = run(dir, BASE);
  eq(r.status, 3, "exhaustion exit code");
  assert(/exhausted/.test(r.stderr), `stderr lacks a clear message: ${r.stderr}`);
  rmSync(dir, { recursive: true });
});

test("test_reject_redeal_records_both", () => {
  const dir = tmp();
  const a = JSON.parse(run(dir, BASE).stdout);
  const b = JSON.parse(run(dir, [...BASE, "--reroll", "1"]).stdout); // user rejected hand A
  const ledger = JSON.parse(readFileSync(join(dir, "used-dna.json"), "utf8"));
  eq(ledger.entries.length, 2, "both deals recorded");
  eq(ledger.entries[0].seed, "test|2026-07-01|0", "first seed");
  eq(ledger.entries[1].seed, "test|2026-07-01|1", "re-deal seed");
  const aCells = new Set(cellsOf(a));
  for (const c of cellsOf(b)) assert(!aCells.has(c), `re-deal repeated rejected cell ${c}`);
  rmSync(dir, { recursive: true });
});

test("test_no_forbidden_entropy_sources", () => {
  // Detect calls (with parens), not mentions in comments.
  const src = readFileSync(DEALER, "utf8");
  assert(!/Math\.random\s*\(/.test(src), "dealer.mjs calls Math.random()");
  assert(!/Date\.now\s*\(|new Date\s*\(/.test(src), "dealer.mjs reads the wall clock");
});

test("test_deal_is_pure_and_deterministic", () => {
  const args = { project: "pure", date: "2026-07-01", candidates: 5, excluded: [] };
  eq(JSON.stringify(deal(args)), JSON.stringify(deal(args)), "same inputs, different output");
});

test("test_within_deal_divergence", () => {
  // Fresh space: 5 hands spread across 5 families, 5 disciplines, 5 hue families,
  // 5 signatures (tier 1 must hold when nothing is excluded).
  const out = deal({ project: "spread", date: "2026-07-01", candidates: 5 });
  eq(out.constraintTier, 1, "constraint tier on a fresh space");
  eq(new Set(out.hands.map((h) => h.family.id)).size, 5, "distinct families");
  eq(new Set(out.hands.map((h) => h.composition.id)).size, 5, "distinct disciplines");
  eq(new Set(out.hands.map((h) => h.hue.name)).size, 5, "distinct hue families");
  eq(new Set(out.hands.map((h) => h.signature.id)).size, 5, "distinct signatures");
});

test("test_cell_space_size", () => {
  eq(allCells().length, FAMILIES.length * DISCIPLINES.length, "cells = families x disciplines");
  eq(legalCells().length, allCells().length - BANNED_CELLS.length, "legal = cells - banned");
  assert(legalCells().length >= 90, `legal cell space too small: ${legalCells().length}`);
});

test("test_cli_input_validation", () => {
  eq(run(tmp(), ["--date", "2026-07-01"]).status, 1, "missing --project");
  eq(run(tmp(), ["--project", "x", "--date", "07/01/2026"]).status, 1, "malformed --date");
  eq(run(tmp(), ["--project", "x", "--date", "2026-07-01", "--candidates", "0"]).status, 1, "candidates 0");
  eq(run(tmp(), ["--project", "x", "--date", "2026-07-01", "--candidates", "11"]).status, 1, "candidates 11");
  eq(run(tmp(), ["--project", "x", "--date", "2026-07-01", "--reroll", "-1"]).status, 1, "negative reroll");
});

test("test_corrupt_ledger_fails_clearly", () => {
  const dir = tmp();
  writeFileSync(join(dir, "used-dna.json"), "not json {");
  const r = run(dir, BASE);
  eq(r.status, 1, "corrupt ledger exit code");
  assert(/not a valid ledger/.test(r.stderr), `stderr: ${r.stderr}`);
  rmSync(dir, { recursive: true });
});

test("test_palette_cli_unaffected_by_hook", () => {
  // The hue-walk hook must not change palette.mjs CLI behavior.
  const out = execFileSync("node", [PALETTE, "--seed", "150", "--chroma", "muted"], { encoding: "utf8" });
  assert(out.includes("Generated by design-for-ai palette.mjs"), "palette CSS header missing");
  assert(/PASS/.test(out), "palette contrast report missing");
});

// ---------- pins (4.2.0) ----------

test("test_pin_family_on_all_hands_distinct_disciplines", () => {
  const out = JSON.parse(run(tmp(), [...BASE, "--pin", "family=neo-brutalist"]).stdout);
  for (const h of out.hands) eq(h.family.id, "neo-brutalist", `hand ${h.index} family`);
  eq(new Set(out.hands.map((h) => h.composition.id)).size, 5, "distinct disciplines");
  eq(out.pins.family, "neo-brutalist", "pins echoed in output");
  assert(/user law/.test(out.contract), "contract lacks the pinned-axes sentence");
});

test("test_pin_replay_byte_identical_and_distinct_ledger_entry", () => {
  const dir = tmp();
  const PIN = [...BASE, "--pin", "hue=teal"];
  const a = run(dir, PIN);
  const b = run(dir, PIN); // replayed from the ledger
  assert(a.stdout === b.stdout, "pinned re-run is not byte-identical");
  const plain = run(dir, BASE); // same project/date/reroll, no pins
  assert(plain.stdout !== a.stdout, "unpinned deal replayed the pinned entry");
  const ledger = JSON.parse(readFileSync(join(dir, "used-dna.json"), "utf8"));
  eq(ledger.entries.length, 2, "pinned and unpinned deals are separate ledger entries");
  rmSync(dir, { recursive: true });
});

test("test_no_pin_output_unchanged_golden", () => {
  // The no-pin path must stay byte-compatible with the 4.1.0 dealer: no pins
  // key, unchanged contract text, and the exact pre-pin deal for the BASE seed
  // (values captured from the 4.1.0 dealer before --pin landed).
  const out = JSON.parse(run(tmp(), BASE).stdout);
  assert(!("pins" in out), "no-pin output gained a pins key");
  assert(!/user law/.test(out.contract), "no-pin contract text changed");
  eq(out.seed, "test|2026-07-01|0", "no-pin seed format");
  eq(out.baseHue, 51.18, "no-pin baseHue drifted from the 4.1.0 golden value");
  eq(JSON.stringify(cellsOf(out)), JSON.stringify([
    "cinematic-dark::poster-bleed",
    "neo-brutalist::fractured-grid",
    "playful-geometric::frieze-bands",
    "soft-futurism::swiss-modular",
    "terminal-mono::monolith-center",
  ]), "no-pin cells drifted from the 4.1.0 golden deal");
  eq(JSON.stringify(out.hands.map((h) => h.signature.id)), JSON.stringify([
    "single-diagonal", "border-interrupt-headings", "duotone-images",
    "hard-offset-shadow", "baseline-ruler",
  ]), "no-pin signatures drifted from the 4.1.0 golden deal");
});

test("test_pin_banned_cell_exits_1_naming_tell", () => {
  const r = run(tmp(), [...BASE, "--pin", "family=warm-editorial", "--pin", "discipline=editorial-spread"]);
  eq(r.status, 1, "banned-cell pin exit code");
  assert(/banned/.test(r.stderr) && /ai-tells/.test(r.stderr), `stderr lacks the tell: ${r.stderr}`);
});

test("test_pin_unknown_axis_or_value_exits_1_with_legal_list", () => {
  let r = run(tmp(), [...BASE, "--pin", "vibe=cozy"]);
  eq(r.status, 1, "unknown axis exit code");
  assert(/legal axes/.test(r.stderr) && /family, discipline, hue, signature, chroma/.test(r.stderr),
    `stderr lacks the axis list: ${r.stderr}`);
  r = run(tmp(), [...BASE, "--pin", "family=vaporwave"]);
  eq(r.status, 1, "unknown family exit code");
  assert(/legal values/.test(r.stderr) && /neo-brutalist/.test(r.stderr),
    `stderr lacks the family list: ${r.stderr}`);
});

test("test_pin_hue_numeric_exact_on_all_hands", () => {
  const out = JSON.parse(run(tmp(), [...BASE, "--pin", "hue=200"]).stdout);
  for (const h of out.hands) eq(h.hue.deg, 200, `hand ${h.index} hue`);
  eq(out.hands[0].hue.name, hueName(200), "hue name");
});

test("test_pin_hue_named_spreads_within_band", () => {
  const out = JSON.parse(run(tmp(), [...BASE, "--pin", "hue=teal"]).stdout);
  for (const h of out.hands) eq(h.hue.name, "teal", `hand ${h.index} hue family`);
  eq(new Set(out.hands.map((h) => h.hue.deg)).size, 5, "hues spread within the band, not identical");
});

test("test_pin_signature_deck_id_only", () => {
  const out = JSON.parse(run(tmp(), [...BASE, "--pin", "signature=duotone-images"]).stdout);
  for (const h of out.hands) eq(h.signature.id, "duotone-images", `hand ${h.index} signature`);
  const r = run(tmp(), [...BASE, "--pin", "signature=my-own-move"]);
  eq(r.status, 1, "free-text signature must be rejected (converge-time swap, not a pin)");
  assert(/converge-time swap/.test(r.stderr), `stderr lacks the redirect: ${r.stderr}`);
});

test("test_pin_chroma_in_palette_command", () => {
  const out = JSON.parse(run(tmp(), [...BASE, "--pin", "chroma=vivid"]).stdout);
  for (const h of out.hands)
    assert(h.hue.paletteCommand.includes("--chroma vivid"), `hand ${h.index}: ${h.hue.paletteCommand}`);
});

test("test_pin_full_cell_overrides_exclusion_and_slice_exhausts", () => {
  // A fully-pinned cell already in the ledger still deals — pin overrides
  // exclusion; deliberate repetition is the user's right.
  const dir = tmp();
  const first = JSON.parse(run(dir, BASE).stdout);
  const c = first.hands[0];
  const r = run(dir, ["--project", "second", "--date", "2026-07-01",
    "--pin", `family=${c.family.id}`, "--pin", `discipline=${c.composition.id}`]);
  eq(r.status, 0, "fully-pinned previously-dealt cell was refused");
  const out = JSON.parse(r.stdout);
  for (const h of out.hands)
    eq(`${h.family.id}::${h.composition.id}`, `${c.family.id}::${c.composition.id}`, "shared pinned cell");
  eq(out.constraintTier, 0, "fully-pinned cell reports tier 0, not a distinctness tier");
  rmSync(dir, { recursive: true });

  // A half-pinned slice keeps exclusions: consume 6 of a family's 9 cells,
  // then pin that family → 3 remain < 5 requested → exit 3 naming the pin.
  const dir2 = tmp();
  const emCells = legalCells().filter((x) => x.family === "editorial-minimalism").slice(0, 6);
  const hands = emCells.map((x, i) => ({
    index: i + 1,
    family: FAMILIES.find((f) => f.id === x.family),
    composition: DISCIPLINES.find((d) => d.id === x.discipline),
    hue: { deg: 0, name: "red", paletteCommand: "" },
    signature: SIGNATURES[0],
  }));
  writeFileSync(join(dir2, "used-dna.json"), JSON.stringify({
    version: 1,
    entries: [{ seed: "fixture|2026-01-01|0", output: { hands } }],
  }));
  const rx = run(dir2, [...BASE, "--pin", "family=editorial-minimalism"]);
  eq(rx.status, 3, "half-pinned slice exhaustion exit code");
  assert(/family=editorial-minimalism/.test(rx.stderr), `stderr lacks the pin: ${rx.stderr}`);
  rmSync(dir2, { recursive: true });
});

// ---------- summary ----------

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
