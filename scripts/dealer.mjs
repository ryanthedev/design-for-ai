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
//   node dealer.mjs --project test --date 2026-07-01 --pin family=neo-brutalist --pin hue=teal
//
// Flags:
//   --project    <string>       project name (required)
//   --date       YYYY-MM-DD     deal date (required — the determinism anchor, never the clock)
//   --candidates <1-10>         hands to deal            (default 5)
//   --reroll     <int>          re-deal counter; bump by 1 when a hand is rejected (default 0)
//   --used       <path>         ledger file              (default ./used-dna.json)
//   --pin        <axis>=<value> user-pinned axis, repeatable — family, discipline, hue
//                               (name or degree), signature (deck id), chroma. The dealer
//                               exists to stop the MODEL from choosing; the USER choosing is
//                               anti-convergent, so pinned axes ride every hand and only the
//                               unpinned axes are dealt (design-dna.md "Pins: The User's Axes").
//
// Exit codes: 0 deal/replay · 1 usage error · 3 cell-space exhaustion.

import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { GOLDEN_ANGLE, hueWalk, hueName, HUE_NAMES } from "./palette.mjs";

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

// ---------- pins ----------

export const PIN_AXES = ["family", "discipline", "hue", "signature", "chroma"];
export const CHROMAS = ["muted", "balanced", "vivid"];

// The 12 distinct hue-band names ("red" appears twice in HUE_NAMES for the wrap).
const HUE_BAND_NAMES = [...new Set(HUE_NAMES.map(([, n]) => n))];

// Band (lo, hi] for a named hue, from palette.mjs's HUE_NAMES thresholds.
// "red" resolves to its low band [0, 15]; the wrap segment (350, 360] carries
// the same name and is intentionally unused for pinned spreads.
function hueBand(name) {
  const i = HUE_NAMES.findIndex(([, n]) => n === name);
  return { lo: i === 0 ? 0 : HUE_NAMES[i - 1][0], hi: HUE_NAMES[i][0] };
}

// Canonical seed. Pins participate in the key, so a pinned deal and an
// unpinned deal sharing project/date/reroll are distinct ledger entries —
// one string keys the PRNG, the replay lookup, and exclusion filtering.
export function makeSeed({ project, date, reroll = 0, pins = {} }) {
  const base = `${project}|${date}|${reroll}`;
  const keys = Object.keys(pins).sort();
  return keys.length ? `${base}|pin:${keys.map((k) => `${k}=${pins[k]}`).join(",")}` : base;
}

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
// families; tier 3: distinct cells only. Finite by construction. A pinned
// axis is exempt from distinctness — every cell in the pool shares the
// pinned value, so the constraint applies only to the dealt axes.
function pickCells(pool, count, tier, pins = {}) {
  const chosen = [];
  const usedF = new Set(), usedD = new Set();
  const step = (start) => {
    if (chosen.length === count) return true;
    for (let i = start; i < pool.length; i++) {
      const c = pool[i];
      if (tier <= 1 && !pins.discipline && usedD.has(c.discipline)) continue;
      if (tier <= 2 && !pins.family && usedF.has(c.family)) continue;
      chosen.push(c); usedF.add(c.family); usedD.add(c.discipline);
      if (step(i + 1)) return true;
      chosen.pop(); usedF.delete(c.family); usedD.delete(c.discipline);
    }
    return false;
  };
  return step(0) ? chosen : null;
}

// Pure, deterministic core. `excluded` = [{family, discipline}] from the
// ledger; `pins` = validated user pins (see parsePins). Throws
// ExhaustionError when exclusions + bans + pins leave fewer legal cells
// than needed. The no-pin output is byte-identical to the pre-pin dealer.
export function deal({ project, date, reroll = 0, candidates = 5, excluded = [], pins = {} }) {
  const seed = makeSeed({ project, date, reroll, pins });
  const rand = mulberry32(xmur3(seed)());
  const pinned = Object.keys(pins).length > 0;

  const slice = legalCells().filter(
    (c) =>
      (!pins.family || c.family === pins.family) &&
      (!pins.discipline || c.discipline === pins.discipline)
  );
  // A fully-pinned cell skips ledger exclusions — deliberate repetition is
  // the user's right; a half-pinned slice keeps them.
  const cellPinned = Boolean(pins.family && pins.discipline);
  const excludedKeys = cellPinned
    ? new Set()
    : new Set(excluded.map((c) => cellKey(c.family, c.discipline)));
  const available = slice.filter((c) => !excludedKeys.has(cellKey(c.family, c.discipline)));

  // With a fully-pinned cell all hands share it, so one legal cell suffices.
  const needed = cellPinned ? 1 : candidates;
  if (available.length < needed) {
    const pinNote = pinned
      ? ` under pins ${Object.keys(pins).sort().map((k) => `${k}=${pins[k]}`).join(", ")}`
      : "";
    throw new ExhaustionError(
      `cell space exhausted${pinNote}: ${candidates} candidates requested but only ${available.length} ` +
      `legal cells remain (${FAMILIES.length}×${DISCIPLINES.length} = ${allCells().length} cells, ` +
      `${BANNED_CELLS.length} banned as AI tells, ${excludedKeys.size} excluded by used-dna.json). ` +
      `Point --used at a fresh ledger, prune old entries, or request fewer candidates.`
    );
  }

  // Fixed draw order (determinism): base hue, then cell shuffle, then signatures.
  const baseHue = rand() * 360;
  const pool = shuffled(available, rand);
  let cells = null, constraintTier = 0;
  if (cellPinned) {
    // One cell shared by every hand — distinctness is vacuous by construction.
    cells = Array.from({ length: candidates }, () => pool[0]);
    constraintTier = 0;
  } else {
    for (const tier of [1, 2, 3]) {
      cells = pickCells(pool, candidates, tier, pins);
      if (cells) { constraintTier = tier; break; }
    }
  }
  // tier 3 accepts any distinct cells, so `available.length >= needed`
  // guarantees success — but keep the guard honest.
  if (!cells) throw new ExhaustionError("no legal cell assignment found");
  const sigs = shuffled(SIGNATURES, rand);

  const familyById = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
  const disciplineById = Object.fromEntries(DISCIPLINES.map((d) => [d.id, d]));

  const band = typeof pins.hue === "string" ? hueBand(pins.hue) : null;
  const chroma = pins.chroma ?? "balanced";
  const pinnedSig = pins.signature ? SIGNATURES.find((s) => s.id === pins.signature) : null;

  const hands = cells.map((c, i) => {
    // Hue: numeric pin → exact on every hand; named pin → even spread within
    // the band (no golden-angle walk); unpinned → the walk, as before.
    const deg =
      typeof pins.hue === "number" ? pins.hue
      : band ? band.lo + ((i + 0.5) * (band.hi - band.lo)) / candidates
      : hueWalk(baseHue, i);
    const hue = +deg.toFixed(2);
    return {
      index: i + 1,
      family: familyById[c.family],
      composition: disciplineById[c.discipline],
      hue: {
        deg: hue,
        name: hueName(hue),
        paletteCommand: `node scripts/palette.mjs --seed ${hue} --chroma ${chroma} --harmony mono`,
      },
      signature: pinnedSig ?? sigs[i % sigs.length],
    };
  });

  return {
    seed,
    project, date, reroll, candidates,
    ...(pinned ? { pins } : {}),
    baseHue: +baseHue.toFixed(2),
    goldenAngle: GOLDEN_ANGLE,
    constraintTier, // 0 = fully-pinned cell (all hands share it), 1 = distinct families+disciplines, 2 = distinct families, 3 = distinct cells
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
      "Rejected hand: re-deal with --reroll N+1; both deals stay recorded in used-dna.json." +
      (pinned ? " Pinned axes are user law — dealt around, never re-chosen." : ""),
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
  const pinSpecs = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--pin") pinSpecs.push(argv[++i]);
    else if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
    else fail(`unexpected argument "${a}"`);
  }
  if (!args.project) fail("missing --project <name>");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(args.date ?? ""))) fail("missing or invalid --date (YYYY-MM-DD)");
  args.candidates = parseInt(args.candidates, 10);
  if (!Number.isInteger(args.candidates) || args.candidates < 1 || args.candidates > 10)
    fail("--candidates must be an integer 1-10");
  args.reroll = parseInt(args.reroll, 10);
  if (!Number.isInteger(args.reroll) || args.reroll < 0) fail("--reroll must be an integer >= 0");
  args.pins = parsePins(pinSpecs);
  return args;
}

// Validate --pin specs into a normalized pins object. Every rejection prints
// the legal list for that axis, so a wrong guess teaches the right values.
function parsePins(specs) {
  const pins = {};
  for (const spec of specs) {
    const m = /^([a-z]+)=(.+)$/.exec(String(spec ?? ""));
    if (!m) fail(`--pin expects <axis>=<value>, got "${spec}"`);
    const [, axis, value] = m;
    if (!PIN_AXES.includes(axis)) fail(`unknown pin axis "${axis}" — legal axes: ${PIN_AXES.join(", ")}`);
    if (axis in pins) fail(`duplicate pin for axis "${axis}"`);
    pins[axis] = value;
  }
  if (pins.family && !FAMILIES.some((f) => f.id === pins.family))
    fail(`unknown family "${pins.family}" — legal values: ${FAMILIES.map((f) => f.id).join(", ")}`);
  if (pins.discipline && !DISCIPLINES.some((d) => d.id === pins.discipline))
    fail(`unknown discipline "${pins.discipline}" — legal values: ${DISCIPLINES.map((d) => d.id).join(", ")}`);
  if (pins.signature && !SIGNATURES.some((s) => s.id === pins.signature))
    fail(
      `unknown signature "${pins.signature}" — legal values: ${SIGNATURES.map((s) => s.id).join(", ")}. ` +
      `A signature of your own is a converge-time swap (design-dna.md), not a pin.`
    );
  if (pins.chroma && !CHROMAS.includes(pins.chroma))
    fail(`unknown chroma "${pins.chroma}" — legal values: ${CHROMAS.join(", ")}`);
  if (pins.hue !== undefined) {
    const n = Number(pins.hue);
    if (Number.isFinite(n)) pins.hue = ((n % 360) + 360) % 360;
    else if (!HUE_BAND_NAMES.includes(pins.hue))
      fail(`unknown hue "${pins.hue}" — a degree 0-360 or one of: ${HUE_BAND_NAMES.join(", ")}`);
  }
  if (pins.family && pins.discipline) {
    const ban = BANNED_CELLS.find((c) => c.family === pins.family && c.discipline === pins.discipline);
    if (ban)
      fail(
        `pinned cell ${pins.family} × ${pins.discipline} is a banned AI-tell cell — ${ban.tell}. ` +
        `A pin cannot launder a tell; pick a neighboring cell (same family, different discipline, or the reverse).`
      );
  }
  return pins;
}

function fail(msg) {
  console.error(`dealer.mjs: ${msg}`);
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  const seed = makeSeed(args);
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
