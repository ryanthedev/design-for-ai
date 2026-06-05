#!/usr/bin/env node
// palette.mjs — deterministic OKLCH design-token generator.
// No dependencies. Runs with `node palette.mjs` or `bun palette.mjs`.
//
// Generates Radix-style 12-step neutral + accent ramps for light and dark
// schemes, harmony-derived secondary accents, and functional colors —
// with WCAG contrast solved by construction (text steps are adjusted
// until they pass against their background steps).
//
// Usage:
//   node palette.mjs --seed 150 --chroma muted --harmony analogous
//   node palette.mjs --seed "#c96442" --chroma balanced --harmony complementary --json
//
// Flags:
//   --seed     <0-360 | #hex>   seed hue (number) or color to derive it from (required)
//   --chroma   muted|balanced|vivid          chroma character        (default balanced)
//   --harmony  mono|analogous|complementary|split|triadic|tetradic   (default mono)
//   --scheme   light|dark|both               schemes to emit         (default both)
//   --prefix   <string>                      custom-property prefix  (default none)
//   --json                                   emit JSON instead of CSS

// ---------- OKLCH <-> sRGB (Björn Ottosson's OKLab) ----------

function oklchToSrgb(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(x, 0), 1 / 2.4) - 0.055));
}

function srgbToOklch(r, g, b) {
  const lin = [r, g, b].map((x) => (x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
  const l = 0.4122214708 * lin[0] + 0.5363325363 * lin[1] + 0.0514459929 * lin[2];
  const m = 0.2119034982 * lin[0] + 0.6806995451 * lin[1] + 0.1073969566 * lin[2];
  const s = 0.0883024619 * lin[0] + 0.2817188376 * lin[1] + 0.6299787005 * lin[2];
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.hypot(a, bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

const inGamut = (rgb) => rgb.every((x) => x >= -1e-6 && x <= 1 + 1e-6);

// Reduce chroma until the color fits in sRGB. Deterministic.
function toGamut(L, C, H) {
  let rgb = oklchToSrgb(L, C, H);
  if (inGamut(rgb)) return { L, C, H, rgb };
  let lo = 0, hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    rgb = oklchToSrgb(L, mid, H);
    if (inGamut(rgb)) lo = mid;
    else hi = mid;
  }
  return { L, C: lo, H, rgb: oklchToSrgb(L, lo, H) };
}

const hex = (rgb) =>
  "#" + rgb.map((x) => Math.round(Math.min(1, Math.max(0, x)) * 255).toString(16).padStart(2, "0")).join("");

function parseHex(s) {
  const m = s.replace("#", "");
  const v = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  if (!/^[0-9a-fA-F]{6}$/.test(v)) return null;
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
}

// ---------- WCAG contrast ----------

function luminance(rgb) {
  const [r, g, b] = rgb.map((x) => {
    const c = Math.min(1, Math.max(0, x));
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(rgb1, rgb2) {
  const [a, b] = [luminance(rgb1), luminance(rgb2)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// ---------- ramp construction ----------

// Max usable chroma ("cusp") for a hue: sample lightness, take the best.
function cusp(H) {
  let best = { L: 0.63, C: 0 };
  for (let L = 0.35; L <= 0.88; L += 0.01) {
    let lo = 0, hi = 0.4;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToSrgb(L, mid, H))) lo = mid;
      else hi = mid;
    }
    if (lo > best.C) best = { L, C: lo };
  }
  return best;
}

const CHROMA_MULT = { muted: 0.45, balanced: 0.7, vivid: 1.0 };

// Fraction of peak chroma per step (1-12). Peak at step 9 (solid).
const CHROMA_PROFILE = [0.06, 0.1, 0.22, 0.32, 0.44, 0.56, 0.68, 0.82, 1.0, 0.95, 0.6, 0.35];

// Lightness specs. Step 9/10 are filled from the hue's cusp at runtime.
const L_LIGHT = [0.993, 0.981, 0.956, 0.93, 0.9, 0.864, 0.818, 0.74, null, null, 0.5, 0.3];
const L_DARK = [0.185, 0.215, 0.252, 0.285, 0.318, 0.355, 0.405, 0.49, null, null, 0.78, 0.93];

// Adjust a text step's lightness (and if needed chroma) until it clears
// `target` contrast against `bgRgb`. `dir` is -1 (darken) or +1 (lighten).
function solveText(L0, C0, H, bgRgb, target, dir) {
  let L = L0, C = C0;
  for (let pass = 0; pass < 3; pass++) {
    let l = L;
    while (l >= 0.05 && l <= 0.985) {
      const g = toGamut(l, C, H);
      if (contrast(g.rgb, bgRgb) >= target) return g;
      l += dir * 0.005;
    }
    C *= 0.55; // couldn't make it: trade chroma for range and retry
  }
  return toGamut(dir < 0 ? 0.05 : 0.985, 0, H); // black/white-ish last resort
}

function ramp(H, chromaKey, mode /* 'light' | 'dark' */, neutral = false) {
  const { L: cuspL, C: cuspC } = cusp(H);
  const mult = CHROMA_MULT[chromaKey];
  const peak = neutral ? Math.min(0.018, cuspC) : Math.min(cuspC * mult, 0.26);
  const Lspec = (mode === "light" ? L_LIGHT : L_DARK).slice();
  const solidL = Math.min(0.78, Math.max(0.5, cuspL));
  Lspec[8] = solidL;
  Lspec[9] = mode === "light" ? solidL - 0.06 : solidL + 0.06;

  const steps = Lspec.map((L, i) => toGamut(L, peak * CHROMA_PROFILE[i], H));

  // Contrast by construction: 11 ≥ 4.5:1 and 12 ≥ 7:1 against step 2.
  const bg = steps[1].rgb;
  const dir = mode === "light" ? -1 : +1;
  steps[10] = solveText(Lspec[10], steps[10].C, H, bg, 4.5, dir);
  steps[11] = solveText(Lspec[11], steps[11].C, H, bg, 7.0, dir);

  // on-solid: text color for step 9. Prefer near-white; fall back to near-black.
  const solid = steps[8].rgb;
  const white = toGamut(0.985, Math.min(0.012, peak), H);
  const black = toGamut(0.16, Math.min(0.02, peak), H);
  const onSolid = contrast(white.rgb, solid) >= 4.5 ? white : black;

  return { steps, onSolid, solidL };
}

// ---------- harmony ----------

const HARMONIES = {
  mono: [],
  analogous: [-30, 30],
  complementary: [180],
  split: [150, 210],
  triadic: [120, 240],
  tetradic: [90, 180, 270],
};

const FUNCTIONAL = { error: 25, success: 145, warning: 85, info: 240 };

const HUE_NAMES = [
  [15, "red"], [45, "orange"], [70, "amber"], [105, "yellow"], [140, "lime"],
  [165, "green"], [195, "teal"], [230, "cyan"], [265, "blue"], [295, "violet"],
  [330, "purple"], [350, "pink"], [360, "red"],
];
const hueName = (h) => HUE_NAMES.find(([max]) => ((h % 360) + 360) % 360 <= max)[1];

// ---------- CLI ----------

function parseArgs(argv) {
  const args = { chroma: "balanced", harmony: "mono", scheme: "both", prefix: "", json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
  }
  if (args.seed === undefined) fail("missing --seed (hue 0-360 or #hex)");
  const s = String(args.seed);
  // Plain numbers are hues; hex colors need a leading # (or non-numeric hex like "c96442").
  const asHex = s.startsWith("#") || Number.isNaN(parseFloat(s)) ? parseHex(s) : null;
  if (asHex) {
    const o = srgbToOklch(...asHex);
    if (o.C < 0.01)
      console.error(
        `palette.mjs: warning: --seed "${s}" is near-achromatic (C=${o.C.toFixed(4)}); ` +
        `derived hue ${o.H.toFixed(1)} may not reflect intent. Consider passing a hue (0-360) directly.`
      );
    args.hue = o.H;
    args.seedNote = `derived from ${s} (oklch ${o.L.toFixed(2)} ${o.C.toFixed(3)} ${o.H.toFixed(1)})`;
  } else if (!Number.isNaN(parseFloat(s))) {
    args.hue = ((parseFloat(s) % 360) + 360) % 360;
    args.seedNote = `hue ${args.hue}`;
  } else fail(`--seed "${s}" is neither a hue nor a hex color`);
  if (!CHROMA_MULT[args.chroma]) fail(`--chroma must be muted|balanced|vivid`);
  if (!HARMONIES[args.harmony]) fail(`--harmony must be ${Object.keys(HARMONIES).join("|")}`);
  if (!["light", "dark", "both"].includes(args.scheme)) fail(`--scheme must be light|dark|both`);
  return args;
}

function fail(msg) {
  console.error(`palette.mjs: ${msg}`);
  process.exit(1);
}

// ---------- build ----------

function buildScheme(mode, args) {
  const p = args.prefix ? `${args.prefix}-` : "";
  const out = { tokens: {}, report: [] };
  const add = (name, g) => (out.tokens[`--${p}${name}`] = hex(g.rgb));

  const neutral = ramp(args.hue, args.chroma, mode, true);
  const accent = ramp(args.hue, args.chroma, mode, false);
  neutral.steps.forEach((g, i) => add(`neutral-${i + 1}`, g));
  accent.steps.forEach((g, i) => add(`accent-${i + 1}`, g));
  add("accent-on-solid", accent.onSolid);

  // Secondary accents from the harmony rule: subtle bg (3), solid (9), text (11).
  const secondaries = HARMONIES[args.harmony].map((delta, idx) => {
    const h = (args.hue + delta + 360) % 360;
    const r = ramp(h, args.chroma, mode, false);
    const name = `${hueName(h)}${idx > 0 && hueName(h) === hueName((args.hue + HARMONIES[args.harmony][0] + 360) % 360) ? idx + 1 : ""}`;
    add(`${name}-3`, r.steps[2]);
    add(`${name}-9`, r.steps[8]);
    add(`${name}-11`, r.steps[10]);
    add(`${name}-on-solid`, r.onSolid);
    return { name, hue: h, r };
  });

  // Functional colors, chroma-matched to the palette character.
  for (const [name, h] of Object.entries(FUNCTIONAL)) {
    const r = ramp(h, args.chroma, mode, false);
    add(`${name}-3`, r.steps[2]);
    add(`${name}-9`, r.steps[8]);
    add(`${name}-11`, r.steps[10]);
  }

  // Semantic aliases.
  const alias = {
    background: `neutral-1`, surface: `neutral-2`, "surface-hover": `neutral-3`,
    "surface-active": `neutral-4`, "border-subtle": `neutral-6`, border: `neutral-7`,
    "border-strong": `neutral-8`, "text-secondary": `neutral-11`, text: `neutral-12`,
    "accent-bg-subtle": `accent-3`, "accent-solid": `accent-9`, "accent-solid-hover": `accent-10`,
    "accent-text": `accent-11`,
  };
  for (const [k, v] of Object.entries(alias)) out.tokens[`--${p}${k}`] = `var(--${p}${v})`;

  // Contrast report.
  const pair = (label, fg, bg, target) => {
    const c = contrast(fg.rgb, bg.rgb);
    out.report.push({ mode, pair: label, ratio: +c.toFixed(2), target, pass: c >= target });
  };
  pair("neutral-11 on neutral-2", neutral.steps[10], neutral.steps[1], 4.5);
  pair("neutral-12 on neutral-2", neutral.steps[11], neutral.steps[1], 7.0);
  pair("neutral-12 on neutral-3", neutral.steps[11], neutral.steps[2], 4.5);
  pair("accent-11 on neutral-2", accent.steps[10], neutral.steps[1], 4.5);
  pair("accent-11 on accent-2", accent.steps[10], accent.steps[1], 4.5);
  pair("accent-on-solid on accent-9", accent.onSolid, accent.steps[8], 4.5);
  for (const s of secondaries)
    pair(`${s.name}-11 on neutral-2`, s.r.steps[10], neutral.steps[1], 4.5);

  return out;
}

function emitCss(schemes, args) {
  const lines = [
    `/* Generated by design-for-ai palette.mjs */`,
    `/* seed: ${args.seedNote} · chroma: ${args.chroma} · harmony: ${args.harmony} */`,
    ``,
  ];
  const sel = { light: ":root", dark: '[data-theme="dark"]' };
  for (const [mode, s] of Object.entries(schemes)) {
    lines.push(`${sel[mode]} {`);
    for (const [k, v] of Object.entries(s.tokens)) lines.push(`  ${k}: ${v};`);
    lines.push(`}`, ``);
  }
  lines.push(`/* Contrast report (WCAG 2.x)`);
  for (const s of Object.values(schemes))
    for (const r of s.report)
      lines.push(`   ${r.pass ? "PASS" : "FAIL"}  [${r.mode}] ${r.pair}: ${r.ratio}:1 (target ${r.target}:1)`);
  lines.push(`*/`);
  return lines.join("\n");
}

const args = parseArgs(process.argv.slice(2));
const modes = args.scheme === "both" ? ["light", "dark"] : [args.scheme];
const schemes = Object.fromEntries(modes.map((m) => [m, buildScheme(m, args)]));

if (args.json) {
  console.log(JSON.stringify({ seed: args.seedNote, chroma: args.chroma, harmony: args.harmony, schemes }, null, 2));
} else {
  console.log(emitCss(schemes, args));
}

const failures = Object.values(schemes).flatMap((s) => s.report.filter((r) => !r.pass));
if (failures.length) {
  console.error(`\n${failures.length} contrast pair(s) below target — see report.`);
  process.exit(2);
}
