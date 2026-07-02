#!/usr/bin/env node
// dealer.mjs — deterministic seeded composition dealer.
// No dependencies. Runs with `node dealer.mjs` or `bun dealer.mjs`.
//
// Deals each DNA candidate a hand the model must justify and execute (not
// re-choose): aesthetic family + composition/layout discipline (the axis
// nothing else spreads) + hue (golden-angle 137.5° walk, via palette.mjs's
// hueWalk hook) + signature element. Same seed → byte-identical output:
// everything derives from --project/--date/--reroll (no Math.random, no
// Date.now). Dealt (family, discipline) cells are recorded in a local
// used-dna.json ledger and excluded from later deals with a different seed;
// re-running the SAME seed replays the recorded output verbatim.
//
// Usage:
//   node dealer.mjs --project test --date 2026-07-01 --candidates 5
//   node dealer.mjs --project test --date 2026-07-01 --reroll 1   # user rejected the hand
//
// Flags:
//   --project    <string>       project name (required)
//   --date       YYYY-MM-DD     deal date (required — the determinism anchor, never the clock)
//   --candidates <1-10>         hands to deal            (default 5)
//   --reroll     <int>          re-deal counter; bump by 1 when a hand is rejected (default 0)
//   --used       <path>         ledger file              (default ./used-dna.json)
//
// Exit codes: 0 deal/replay · 1 usage error · 3 cell-space exhaustion.

import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { GOLDEN_ANGLE, hueWalk, hueName } from "./palette.mjs";

// ---------- the cell space: families × composition disciplines ----------

// The 12 documented aesthetic families (archetypes.md Part B). The research
// atlas has 45+, but a dealt family must have doctrine the model can execute
// against — so the deck is exactly the documented set.
export const FAMILIES = [
  { id: "editorial-minimalism", name: "Editorial Minimalism" },
  { id: "warm-editorial", name: "Warm Editorial" },
  { id: "swiss-international", name: "Swiss / International" },
  { id: "neo-brutalist", name: "Neo-Brutalist" },
  { id: "terminal-mono", name: "Terminal / Mono-Core" },
  { id: "data-dense-professional", name: "Data-Dense Professional" },
  { id: "cinematic-dark", name: "Cinematic Dark" },
  { id: "playful-geometric", name: "Playful Geometric" },
  { id: "soft-futurism", name: "Soft Futurism" },
  { id: "art-deco-luxury", name: "Art Deco / Luxury" },
  { id: "organic-natural", name: "Organic / Natural" },
  { id: "retro-futurist", name: "Retro-Futurist" },
];

// Nine composition/layout disciplines — the axis the model's prior collapses.
// Each is documented across the six dimensions and carries `variance`, a
// DESIGN_VARIANCE-compatible dial (1–10): 1 = centered/clean, 10 =
// asymmetric/modern. Deliberately ABSENT: any "uniform card grid" discipline —
// that ai-tells.md layout tell is structurally unreachable from this deck.
export const DISCIPLINES = [
  {
    id: "monolith-center", name: "Monolith Center", variance: 1,
    scale: "one oversized element, everything else small",
    density: "sparse — most of the viewport is empty",
    symmetry: "strict central axis",
    hierarchy: "single-point: one focus, no competing levels",
    ground: "vast unbroken field",
    dominantElement: "the single centered mass",
  },
  {
    id: "ledger-grid", name: "Ledger Grid", variance: 2,
    scale: "uniform small type, few size jumps",
    density: "high and even — tabular rows and columns",
    symmetry: "columnar, ruled",
    hierarchy: "flat with rank cues (position, weight), not size",
    ground: "ruled paper — hairlines structure everything",
    dominantElement: "the table/ruling system itself",
  },
  {
    id: "swiss-modular", name: "Swiss Modular", variance: 3,
    scale: "modest, ratio-locked jumps",
    density: "moderate, grid-metered",
    symmetry: "grid-aligned, flush-left rag-right",
    hierarchy: "size + weight strictly on the module grid",
    ground: "white with hairline dividers, no containers",
    dominantElement: "the typographic headline seated on the grid",
  },
  {
    id: "frieze-bands", name: "Frieze Bands", variance: 4,
    scale: "band-sized — each band sets its own scale",
    density: "alternating: packed band, breathing band",
    symmetry: "horizontal banding, full-width",
    hierarchy: "band order + band height carry importance",
    ground: "each band is its own ground; edges are hard",
    dominantElement: "the rhythm of varied band heights",
  },
  {
    id: "marginalia", name: "Marginalia", variance: 5,
    scale: "steady text column, small margin apparatus",
    density: "dense column beside an airy margin",
    symmetry: "asymmetric two-track: column + active margin",
    hierarchy: "main column leads; margin annotates and cross-references",
    ground: "book page — the margin is working space, not padding",
    dominantElement: "the primary text column",
  },
  {
    id: "split-stage", name: "Split Stage", variance: 6,
    scale: "two panes at unequal scale",
    density: "unbalanced by design — one pane packed, one calm",
    symmetry: "hard asymmetric vertical split (e.g. 38/62)",
    hierarchy: "the heavier pane leads; the split line is structural",
    ground: "two grounds in tension (tone, texture, or value)",
    dominantElement: "the heavier pane",
  },
  {
    id: "editorial-spread", name: "Editorial Spread", variance: 7,
    scale: "oversized display type against modest body columns",
    density: "varied — columns, pull elements, deliberate gaps",
    symmetry: "magazine asymmetry; elements cross column boundaries",
    hierarchy: "display type first, decks and pulls second, body third",
    ground: "multi-column page the display type violates on purpose",
    dominantElement: "the display typography",
  },
  {
    id: "poster-bleed", name: "Poster Bleed", variance: 8,
    scale: "one full-bleed image or letterform at viewport scale",
    density: "minimal copy pinned to edges and corners",
    symmetry: "edge-anchored, center deliberately vacant or occupied by the bleed",
    hierarchy: "the bleed is the message; text is caption-rank",
    ground: "the bleed IS the ground",
    dominantElement: "the full-bleed image/letterform",
  },
  {
    id: "fractured-grid", name: "Fractured Grid", variance: 9,
    scale: "colliding scales — fragments at different sizes",
    density: "clustered collisions with open counter-space",
    symmetry: "deliberate misalignment; diagonal flow",
    hierarchy: "the collision point leads; layers order the rest",
    ground: "layers overlap the ground and each other",
    dominantElement: "the collision point where layers meet",
  },
];

// Signature-element seeds: one specific, memorable move per hand (design-dna.md
// "The Signature Move"). The doctrine's hanging-section-numerals example is
// deliberately absent — it collides with the numbered-section-markers copy tell.
export const SIGNATURES = [
  { id: "hard-offset-shadow", text: "All interactive elements share one hard offset shadow that shifts on press" },
  { id: "accent-scarcity", text: "The accent color appears ONLY on the current nav item and the primary CTA — nowhere else" },
  { id: "box-drawing-borders", text: "Tables and rules use box-drawing characters as borders" },
  { id: "logo-polygon-mask", text: "Every image is masked to the same irregular polygon derived from the logo" },
  { id: "border-interrupt-headings", text: "Headings interrupt their top border like a legend on a map frame" },
  { id: "baseline-ruler", text: "A visible baseline ruler runs down one edge and content demonstrably sits on it" },
  { id: "oversize-punctuation", text: "Pull quotes and brackets set at display scale act as structural elements" },
  { id: "marginalia-stamps", text: "Small rubber-stamp-style status marks live in the margins" },
  { id: "single-diagonal", text: "Exactly one diagonal element per view, always at the same angle" },
  { id: "duotone-images", text: "All imagery is a strict duotone built from the two palette anchors" },
  { id: "footnote-apparatus", text: "Real footnotes/sidenotes serve as UI chrome for secondary detail" },
  { id: "exposed-grid", text: "The layout grid becomes visible at exactly one moment (hover, load, or footer)" },
];

// BANNED cells: the ai-tells.md named tell aesthetics mapped to exact
// (family, discipline) cells. Only these exact cells are banned — a legal
// cell one step away (sharing a family OR a discipline) stays legal.
export const BANNED_CELLS = [
  { family: "cinematic-dark", discipline: "ledger-grid",
    tell: "cyan/teal-on-dark 'AI dashboard' — metric-dashboard template (ai-tells.md Color Tells + Layout Tells)" },
  { family: "cinematic-dark", discipline: "monolith-center",
    tell: "dark mode by default with glowing accents, centered hero (ai-tells.md Detail Tells)" },
  { family: "soft-futurism", discipline: "monolith-center",
    tell: "purple-to-blue gradient 'AI product' centered hero (ai-tells.md Color Tells + purple-indigo-violet triplet signature)" },
  { family: "soft-futurism", discipline: "ledger-grid",
    tell: "decorative glassmorphism panel dashboard (ai-tells.md Detail Tells)" },
  { family: "terminal-mono", discipline: "ledger-grid",
    tell: "dark+acid-green terminal dashboard / monospace as lazy technical shorthand (ai-tells.md Checkable Signatures + Typography Tells)" },
  { family: "warm-editorial", discipline: "editorial-spread",
    tell: "cream+serif+terracotta escape-hatch cluster home cell (ai-tells.md Checkable Signatures)" },
];

const cellKey = (f, d) => `${f}::${d}`;
const BANNED_KEYS = new Set(BANNED_CELLS.map((c) => cellKey(c.family, c.discipline)));

export const allCells = () =>
  FAMILIES.flatMap((f) => DISCIPLINES.map((d) => ({ family: f.id, discipline: d.id })));

export const legalCells = () =>
  allCells().filter((c) => !BANNED_KEYS.has(cellKey(c.family, c.discipline)));

// ---------- seeded PRNG (xmur3 string hash → mulberry32) ----------

export function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

export function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const shuffled = (arr, rand) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------- the deal ----------

export class ExhaustionError extends Error {}

// Backtracking pick of `count` cells under a distinctness constraint.
// tier 1: pairwise-distinct families AND disciplines; tier 2: distinct
// families; tier 3: distinct cells only. Finite by construction.
function pickCells(pool, count, tier) {
  const chosen = [];
  const usedF = new Set(), usedD = new Set();
  const step = (start) => {
    if (chosen.length === count) return true;
    for (let i = start; i < pool.length; i++) {
      const c = pool[i];
      if (tier <= 1 && usedD.has(c.discipline)) continue;
      if (tier <= 2 && usedF.has(c.family)) continue;
      chosen.push(c); usedF.add(c.family); usedD.add(c.discipline);
      if (step(i + 1)) return true;
      chosen.pop(); usedF.delete(c.family); usedD.delete(c.discipline);
    }
    return false;
  };
  return step(0) ? chosen : null;
}

// Pure, deterministic core. `excluded` = [{family, discipline}] from the
// ledger. Throws ExhaustionError when exclusions + bans leave fewer legal
// cells than requested candidates.
export function deal({ project, date, reroll = 0, candidates = 5, excluded = [] }) {
  const seed = `${project}|${date}|${reroll}`;
  const rand = mulberry32(xmur3(seed)());

  const excludedKeys = new Set(excluded.map((c) => cellKey(c.family, c.discipline)));
  const available = legalCells().filter((c) => !excludedKeys.has(cellKey(c.family, c.discipline)));

  if (available.length < candidates) {
    throw new ExhaustionError(
      `cell space exhausted: ${candidates} candidates requested but only ${available.length} ` +
      `legal cells remain (${FAMILIES.length}×${DISCIPLINES.length} = ${allCells().length} cells, ` +
      `${BANNED_CELLS.length} banned as AI tells, ${excludedKeys.size} excluded by used-dna.json). ` +
      `Point --used at a fresh ledger, prune old entries, or request fewer candidates.`
    );
  }

  // Fixed draw order (determinism): base hue, then cell shuffle, then signatures.
  const baseHue = rand() * 360;
  const pool = shuffled(available, rand);
  let cells = null, constraintTier = 0;
  for (const tier of [1, 2, 3]) {
    cells = pickCells(pool, candidates, tier);
    if (cells) { constraintTier = tier; break; }
  }
  // tier 3 accepts any distinct cells, so `available.length >= candidates`
  // guarantees success — but keep the guard honest.
  if (!cells) throw new ExhaustionError("no legal cell assignment found");
  const sigs = shuffled(SIGNATURES, rand);

  const familyById = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
  const disciplineById = Object.fromEntries(DISCIPLINES.map((d) => [d.id, d]));

  const hands = cells.map((c, i) => {
    const hue = +hueWalk(baseHue, i).toFixed(2);
    return {
      index: i + 1,
      family: familyById[c.family],
      composition: disciplineById[c.discipline],
      hue: {
        deg: hue,
        name: hueName(hue),
        paletteCommand: `node scripts/palette.mjs --seed ${hue} --chroma balanced --harmony mono`,
      },
      signature: sigs[i % sigs.length],
    };
  });

  return {
    seed,
    project, date, reroll, candidates,
    baseHue: +baseHue.toFixed(2),
    goldenAngle: GOLDEN_ANGLE,
    constraintTier, // 1 = distinct families+disciplines, 2 = distinct families, 3 = distinct cells
    cellSpace: {
      families: FAMILIES.length,
      disciplines: DISCIPLINES.length,
      cells: allCells().length,
      banned: BANNED_CELLS.length,
      excluded: excludedKeys.size,
      available: available.length,
    },
    hands,
    contract:
      "The model justifies and executes this dealt hand — it does not re-choose. " +
      "Rejected hand: re-deal with --reroll N+1; both deals stay recorded in used-dna.json.",
  };
}

// ---------- ledger (used-dna.json) ----------

export function readLedger(path) {
  let raw;
  try { raw = readFileSync(path, "utf8"); }
  catch { return { version: 1, entries: [] }; }
  try {
    const l = JSON.parse(raw);
    if (!Array.isArray(l.entries)) throw new Error("no entries array");
    return l;
  } catch (e) {
    fail(`--used ${path} is not a valid ledger (${e.message}) — move it aside or point --used elsewhere`);
  }
}

export const ledgerExclusions = (ledger, seed) =>
  ledger.entries
    .filter((e) => e.seed !== seed)
    .flatMap((e) => e.output.hands.map((h) => ({ family: h.family.id, discipline: h.composition.id })));

// ---------- CLI ----------

function parseArgs(argv) {
  const args = { candidates: 5, reroll: 0, used: "./used-dna.json" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
    else fail(`unexpected argument "${a}"`);
  }
  if (!args.project) fail("missing --project <name>");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(args.date ?? ""))) fail("missing or invalid --date (YYYY-MM-DD)");
  args.candidates = parseInt(args.candidates, 10);
  if (!Number.isInteger(args.candidates) || args.candidates < 1 || args.candidates > 10)
    fail("--candidates must be an integer 1-10");
  args.reroll = parseInt(args.reroll, 10);
  if (!Number.isInteger(args.reroll) || args.reroll < 0) fail("--reroll must be an integer >= 0");
  return args;
}

function fail(msg) {
  console.error(`dealer.mjs: ${msg}`);
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  const seed = `${args.project}|${args.date}|${args.reroll}`;
  const ledger = readLedger(args.used);

  // Same seed already dealt → replay the recorded output verbatim (idempotent,
  // byte-identical re-runs even after other seeds have been dealt since).
  const prior = ledger.entries.find((e) => e.seed === seed);
  if (prior) {
    console.log(JSON.stringify(prior.output, null, 2));
    process.exit(0);
  }

  let output;
  try {
    output = deal({ ...args, excluded: ledgerExclusions(ledger, seed) });
  } catch (e) {
    if (e instanceof ExhaustionError) {
      console.error(`dealer.mjs: ${e.message}`);
      process.exit(3);
    }
    throw e;
  }

  ledger.entries.push({ seed, output });
  writeFileSync(args.used, JSON.stringify(ledger, null, 2) + "\n");
  console.log(JSON.stringify(output, null, 2));
}
