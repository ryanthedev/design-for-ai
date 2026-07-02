#!/usr/bin/env node
// detect.mjs — deterministic AI-tell detector for rendered HTML/CSS mocks.
// Assessment B of the dual-blind review (agents/design-review-agent.md):
// a non-LLM pass over the prototype skill's .html output. Static string
// analysis only (regex + a lightweight tag-stack scan) — no browser, no DOM,
// no dependencies. Rule catalog: references/visual/ai-tells.md (this plugin's
// source of truth) — every rule here implements one of its observable checks.
//
// ── Attribution (Apache License 2.0) ──────────────────────────────────────
// Portions of this detector are ported from Impeccable
// (https://github.com/pbakaus/impeccable), Copyright Impeccable contributors,
// licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0).
// MODIFICATIONS: this file is a partial, static-analysis port — a 16-rule
// subset of Impeccable's 44-rule catalog, adapted for the design-for-ai
// plugin. Impeccable's DOM/browser-based layout checks (nested-cards,
// icon-tile-stack, hero-eyebrow-chip, repeated-section-kickers) are
// RE-IMPLEMENTED here as HTML/CSS string heuristics (tag-stack scan +
// single-class <style> resolution) rather than computed-style checks; its
// regex text analyzers (em-dash-overuse, marketing-buzzword,
// numbered-section-markers, aphoristic-cadence, monotonous-spacing,
// dark-glow, gradient-text, overused-font) are ported with threshold
// adjustments; theater-slop-phrase is un-gated per ai-tells.md; the
// signature checks (purple-triplet, uniform-low-opacity-shadow,
// unmodified-shadcn-tokens) are new rules implementing ai-tells.md's
// Checkable Signatures table. Output format, CLI, and exit codes are
// original to this plugin.
// ──────────────────────────────────────────────────────────────────────────
//
// Usage:
//   node scripts/detect.mjs <file.html> [more files...]
//
// Output: JSON on stdout — { status: "ran"|"na", findings: [...], ... }.
// "na" (no artifact: no args, or no given path exists) is structurally
// distinct from "ran with 0 findings": different exit code AND status field.
//
// Exit codes: 0 ran (findings or none) · 1 usage/internal error · 3 N/A (no artifact).

import { readFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

// ---------- rule registry ----------

export const RULES = [
  { id: "nested-cards", category: "layout", severity: "high", name: "Cards nested inside cards", source: "impeccable:nested-cards / ai-tells.md Layout Tells" },
  { id: "icon-tile-stack", category: "layout", severity: "high", name: "Icon tile stacked above heading", source: "impeccable:icon-tile-stack / ai-tells.md Typography Tells" },
  { id: "hero-eyebrow-chip", category: "layout", severity: "high", name: "Eyebrow/pill chip above hero h1", source: "impeccable:hero-eyebrow-chip" },
  { id: "monotonous-spacing", category: "layout", severity: "medium", name: "Same spacing value everywhere", source: "impeccable:monotonous-spacing / ai-tells.md Layout Tells" },
  { id: "repeated-section-kickers", category: "layout", severity: "advisory", name: "Repeated section kicker labels", source: "impeccable:repeated-section-kickers" },
  { id: "purple-triplet", category: "signature", severity: "high", name: "Purple-indigo-violet triplet accent", source: "ai-tells.md Checkable Signatures (#6366F1/#8B5CF6/#A855F7)" },
  { id: "uniform-low-opacity-shadow", category: "signature", severity: "medium", name: "Uniform ~0.1-opacity shadows, no depth variation", source: "ai-tells.md Checkable Signatures" },
  { id: "unmodified-shadcn-tokens", category: "signature", severity: "high", name: "Unmodified Tailwind/shadcn default tokens", source: "ai-tells.md Checkable Signatures" },
  { id: "dark-glow", category: "signature", severity: "medium", name: "Dark background with colored glow shadows", source: "impeccable:dark-glow / ai-tells.md Detail Tells" },
  { id: "em-dash-overuse", category: "copy", severity: "medium", name: "Em-dash overuse in body copy", source: "impeccable:em-dash-overuse / ai-tells.md Copy Tells" },
  { id: "marketing-buzzword", category: "copy", severity: "high", name: "Stock SaaS buzzword phrases", source: "impeccable:marketing-buzzword / ai-tells.md Copy Tells" },
  { id: "numbered-section-markers", category: "copy", severity: "advisory", name: "Decorative 01/02/03 section markers", source: "impeccable:numbered-section-markers / ai-tells.md Copy Tells" },
  { id: "aphoristic-cadence", category: "copy", severity: "medium", name: "Manufactured-contrast aphorism cadence", source: "impeccable:aphoristic-cadence / ai-tells.md Copy Tells" },
  { id: "theater-slop-phrase", category: "copy", severity: "advisory", name: "\"X theater\" dismissal phrasing", source: "impeccable:theater-slop-phrase (un-gated per ai-tells.md Copy Tells)" },
  { id: "overused-font", category: "typography", severity: "medium", name: "Overused/AI-default font as primary", source: "impeccable:overused-font / ai-tells.md Typography Tells + Space Grotesk signature" },
  { id: "gradient-text", category: "color", severity: "medium", name: "Gradient text on headings/metrics", source: "impeccable:gradient-text / ai-tells.md Color Tells" },
];
const RULE_BY_ID = Object.fromEntries(RULES.map((r) => [r.id, r]));

const f = (rule, evidence, line = null) => ({
  rule,
  category: RULE_BY_ID[rule].category,
  severity: RULE_BY_ID[rule].severity,
  evidence,
  line,
});

// ---------- shared helpers ----------

export function stripHtmlToText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

function lineIndexer(content) {
  const starts = [0];
  for (let i = 0; i < content.length; i++) if (content[i] === "\n") starts.push(i + 1);
  return (idx) => {
    let lo = 0, hi = starts.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (starts[mid] <= idx) lo = mid; else hi = mid - 1; }
    return lo + 1;
  };
}

const matchProp = (style, prop) =>
  new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, "i").exec(style || "")?.[1]?.trim() ?? null;

function pxLen(v) {
  const m = /^(-?[\d.]+)(px|rem|em)?\b/.exec((v || "").trim());
  if (!m) return NaN;
  return m[2] === "rem" || m[2] === "em" ? +m[1] * 16 : +m[1];
}

// Map single-class selectors in <style> blocks to their declarations so the
// prototype skill's vanilla-CSS output resolves, not just Tailwind/inline.
function extractClassCss(html) {
  const map = {};
  const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = styleRe.exec(html))) {
    const css = m[1].replace(/\/\*[\s\S]*?\*\//g, "");
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let r;
    while ((r = ruleRe.exec(css))) {
      for (const sel of r[1].split(",").map((s) => s.trim())) {
        const cm = /^\.([A-Za-z_][\w-]*)$/.exec(sel);
        if (cm) map[cm[1]] = (map[cm[1]] ? map[cm[1]] + ";" : "") + r[2].trim();
      }
    }
  }
  return map;
}

const effStyle = (cls, inline, cssMap) =>
  cls.split(/\s+/).map((c) => cssMap[c]).filter(Boolean).concat(inline || []).join(";");

function styleInfo(cls, eff) {
  const radiusVal = matchProp(eff, "border-radius") || "";
  const bgVal = matchProp(eff, "background-color") || matchProp(eff, "background") || "";
  return {
    shadow: /\bshadow(?:-(?:sm|md|lg|xl|2xl|inner))?\b/.test(cls) || /box-shadow\s*:/i.test(eff),
    border: /(?:^|\s)border(?:-[trblxy]?\d*)?(?:\s|$)/.test(cls) ||
      /border(?:-(?:top|right|bottom|left))?\s*:\s*[^;]*(?:solid|dashed|dotted|double)/i.test(eff),
    radius: /\brounded(?:-\w+)?\b/.test(cls) || !!radiusVal,
    radiusFull: /\brounded-full\b/.test(cls) || /9999px|50%/.test(radiusVal),
    bg: /\bbg-(?!transparent\b|none\b)[\w-]+/.test(cls) ||
      (!!bgVal && !/^(?:none|transparent)\b/i.test(bgVal)),
  };
}

const isCardLike = (cls, eff) => {
  const s = styleInfo(cls, eff);
  return ((s.shadow || s.border) && (s.radius || s.bg)) || /\bcard\b/.test(cls);
};

function sizeOf(cls, eff) {
  let w = pxLen(matchProp(eff, "width")), h = pxLen(matchProp(eff, "height"));
  const tw = /\bw-(\d+)\b/.exec(cls), th = /\bh-(\d+)\b/.exec(cls);
  if (Number.isNaN(w) && tw) w = +tw[1] * 4;
  if (Number.isNaN(h) && th) h = +th[1] * 4;
  return Number.isNaN(w) || Number.isNaN(h) ? null : { w, h };
}

// Static port of impeccable checkIconTile: squarish 32–128px, visually
// defined (bg/border), rounded-but-not-circular, contains an icon element.
function isTileLike(rec) {
  if (!rec.containsIcon) return false;
  const s = styleInfo(rec.cls, rec.eff);
  if (!s.bg && !s.border) return false;
  if (!s.radius || s.radiusFull) return false;
  const size = sizeOf(rec.cls, rec.eff);
  if (!size) return false;
  const ratio = size.w / size.h;
  return size.w >= 32 && size.w <= 128 && size.h >= 32 && size.h <= 128 && ratio >= 0.7 && ratio <= 1.4;
}

// Static port of impeccable checkHeroEyebrow (classic tracked-caps branch,
// plus a small-caps-label branch for vanilla CSS).
function isEyebrowLike(rec) {
  const t = rec.text;
  if (t.length < 2 || t.length > 60) return false;
  const upper = /\buppercase\b/.test(rec.cls) ||
    /text-transform\s*:\s*uppercase/i.test(rec.eff) ||
    (/[A-Za-z]/.test(t) && t === t.toUpperCase());
  if (!upper) return false;
  const lsVal = matchProp(rec.eff, "letter-spacing") || "";
  const tracked = /\btracking-(?:wide|wider|widest)\b/.test(rec.cls) ||
    (/em\b/.test(lsVal) ? parseFloat(lsVal) >= 0.05 : pxLen(lsVal) >= 1);
  const fs = pxLen(matchProp(rec.eff, "font-size"));
  const small = /\btext-(?:xs|sm)\b/.test(rec.cls) || (!Number.isNaN(fs) && fs <= 14);
  return tracked || small;
}

// ---------- tag-stack scanner (structural rules) ----------

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr", "path", "circle", "rect", "line", "polyline", "polygon", "use"]);
const HEADINGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function parseAttrs(s) {
  const attrs = {};
  const re = /([a-zA-Z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let m;
  while ((m = re.exec(s))) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  return attrs;
}

const isIconEl = (tag, cls) =>
  tag === "svg" ||
  (tag === "i" && /(?:^|\s|-)(?:fa|icon|lucide|bi|bx|ri|material)(?:$|\s|-)/.test(cls)) ||
  (tag === "img" && /icon/i.test(cls));

function alphasIn(shadowVal) {
  const out = [];
  const re = /(?:rgba|hsla)\(\s*[\d.,%\s]+?,\s*(0?\.\d+|0|1(?:\.0+)?)\s*\)|\/\s*(0?\.\d+|\d{1,3}%)\s*\)/g;
  let m;
  while ((m = re.exec(shadowVal))) {
    let a = m[1] ?? m[2];
    out.push(a.endsWith("%") ? parseFloat(a) / 100 : parseFloat(a));
  }
  return out;
}

function scanHtml(html, cssMap, lineAt) {
  const findings = [], kickers = [], shadowAlphas = [];
  const mkFrame = (tag, cls, eff, line) =>
    ({ tag, cls, eff, line, text: "", containsIcon: false, isCard: false, lastClosed: null, prevSib: null });
  const stack = [mkFrame("#root", "", "", 0)];
  const top = () => stack[stack.length - 1];

  const finishFrame = (frame) => {
    const parent = top();
    const rec = {
      tag: frame.tag, cls: frame.cls, eff: frame.eff,
      text: frame.text.replace(/\s+/g, " ").trim(),
      containsIcon: frame.containsIcon || isIconEl(frame.tag, frame.cls),
    };
    parent.lastClosed = rec;
    parent.text += " " + rec.text;
    parent.containsIcon = parent.containsIcon || rec.containsIcon;
    if (HEADINGS.has(frame.tag) && frame.prevSib) {
      const prev = frame.prevSib, ht = rec.text.slice(0, 50);
      if (isTileLike(prev)) {
        findings.push(f("icon-tile-stack",
          `icon tile <${prev.tag}${prev.cls ? ` class="${prev.cls.slice(0, 40)}"` : ""}> stacked above <${frame.tag}> "${ht}"`, frame.line));
      } else if (frame.tag === "h1" && isEyebrowLike(prev)) {
        findings.push(f("hero-eyebrow-chip", `eyebrow "${prev.text.slice(0, 40)}" above <h1> "${ht}"`, frame.line));
      } else if ((frame.tag === "h2" || frame.tag === "h3") && isEyebrowLike(prev)) {
        kickers.push({ text: prev.text.slice(0, 40), heading: ht, line: frame.line });
      }
    }
  };

  const closeTag = (tag) => {
    let depth = -1;
    for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === tag) { depth = i; break; }
    if (depth === -1) return; // stray close — ignore
    while (stack.length > depth) { const frame = stack.pop(); finishFrame(frame); }
  };

  const tokenRe = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  let m, last = 0;
  while ((m = tokenRe.exec(html))) {
    const text = html.slice(last, m.index);
    if (text.trim()) top().text += " " + text;
    last = tokenRe.lastIndex;
    if (m[0].startsWith("<!--") || m[1]) continue; // comment / script / style
    const tag = m[3].toLowerCase();
    if (m[2] === "/") { closeTag(tag); continue; }
    const attrs = parseAttrs(m[4] || "");
    const cls = attrs.class || "";
    const eff = effStyle(cls, attrs.style, cssMap);
    const frame = mkFrame(tag, cls, eff, lineAt(m.index));

    const sh = matchProp(eff, "box-shadow");
    if (sh) shadowAlphas.push(...alphasIn(sh));

    frame.isCard = isCardLike(cls, eff);
    if (frame.isCard && stack.some((fr) => fr.isCard)) {
      findings.push(f("nested-cards",
        `<${tag}${cls ? ` class="${cls.slice(0, 60)}"` : ""}> is a card inside a card ancestor`, frame.line));
    }
    const parent = top();
    if (HEADINGS.has(tag) && parent.lastClosed && !HEADINGS.has(parent.lastClosed.tag)) {
      frame.prevSib = parent.lastClosed;
    }
    if (VOID_TAGS.has(tag) || /\/\s*>$/.test(m[0])) {
      stack.push(frame); finishFrame(stack.pop());
    } else {
      stack.push(frame);
    }
  }
  while (stack.length > 1) finishFrame(stack.pop()); // unclosed elements

  if (kickers.length >= 3) {
    findings.push(f("repeated-section-kickers",
      `${kickers.length} section kickers (e.g. "${kickers[0].text}" before "${kickers[0].heading}")`, kickers[0].line));
  }
  const inBand = shadowAlphas.filter((a) => a >= 0.08 && a <= 0.12);
  if (shadowAlphas.length >= 3 && inBand.length === shadowAlphas.length) {
    findings.push(f("uniform-low-opacity-shadow",
      `${shadowAlphas.length} shadow declarations, all alpha 0.08–0.12 (${[...new Set(shadowAlphas)].join(", ")}) — no depth variation`));
  }
  return findings;
}

// ---------- content-level rules (regex ports + signature checks) ----------

const OVERUSED_FONTS = "Inter|Roboto|Open Sans|Lato|Montserrat|Arial|Helvetica|Fraunces|Geist Sans|Geist Mono|Geist|Mona Sans|Plus Jakarta Sans|Space Grotesk|Recoleta|Instrument Sans|Instrument Serif";

const BUZZWORDS = [
  "streamline your", "empower your", "supercharge your",
  "unleash your", "unleash the power", "leverage the power",
  "built for the modern", "trusted by leading", "trusted by the world",
  "best-in-class", "industry-leading", "world-class", "enterprise-grade",
  "next-generation", "cutting-edge", "transform your business",
  "revolutionize", "game-changer", "game changing",
  "mission-critical", "best of breed", "future-proof", "future proof",
  "seamless experience", "seamlessly integrate",
  "drive engagement", "drive growth", "drive results",
  "harness the power",
];

const SHADCN_DEFAULTS = [
  "0 0% 100%", "240 10% 3.9%", "240 4.8% 95.9%", "240 5.9% 90%", "240 5.9% 10%",
  "222.2 84% 4.9%", "210 40% 96.1%", "210 40% 98%", "214.3 31.8% 91.4%", "221.2 83.2% 53.3%",
];

function contentRules(content, lineAt) {
  const findings = [];
  const text = stripHtmlToText(content);
  const lower = text.toLowerCase();

  // purple-triplet (ai-tells.md Checkable Signatures)
  const purple = new Map();
  for (const re of [/#(?:6366F1|8B5CF6|A855F7)\b/gi, /\b(?:text|bg|from|to|via|border)-(?:indigo|violet|purple)-500\b/g]) {
    let m;
    while ((m = re.exec(content))) if (!purple.has(m[0].toLowerCase())) purple.set(m[0].toLowerCase(), lineAt(m.index));
  }
  for (const [token, line] of purple) findings.push(f("purple-triplet", `AI-default accent ${token}`, line));

  // unmodified-shadcn-tokens (binary check, ai-tells.md)
  const radius = /--radius\s*:\s*(0\.5rem|0\.625rem)\b/.exec(content);
  if (radius) {
    const hits = SHADCN_DEFAULTS.filter((v) => content.includes(v));
    if (hits.length >= 2) {
      findings.push(f("unmodified-shadcn-tokens",
        `shadcn default --radius: ${radius[1]} + ${hits.length} default token values (${hits.slice(0, 3).join("; ")})`, lineAt(radius.index)));
    }
  }

  // overused-font (primary face or Google Fonts request)
  const fonts = new Map();
  const famRe = new RegExp(`font-family\\s*:\\s*['"]?(${OVERUSED_FONTS})\\b`, "gi");
  const gfRe = new RegExp(`fonts\\.googleapis\\.com/css2?\\?family=(${OVERUSED_FONTS.replace(/ /g, "\\+")})\\b`, "gi");
  let m;
  while ((m = famRe.exec(content))) { const name = m[1].replace(/\+/g, " "); if (!fonts.has(name.toLowerCase())) fonts.set(name.toLowerCase(), { name, line: lineAt(m.index) }); }
  while ((m = gfRe.exec(content))) { const name = m[1].replace(/\+/g, " "); if (!fonts.has(name.toLowerCase())) fonts.set(name.toLowerCase(), { name, line: lineAt(m.index) }); }
  for (const { name, line } of fonts.values()) findings.push(f("overused-font", `overused font "${name}" as a primary face`, line));

  // gradient-text (line-context port)
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if ((/background-clip\s*:\s*text/i.test(l) && /gradient/i.test(l)) ||
        (/\bbg-clip-text\b/.test(l) && /\bbg-gradient-to-/.test(l))) {
      findings.push(f("gradient-text", "gradient-filled text (background-clip: text + gradient)", i + 1));
    }
  }

  // dark-glow (page-level port: dark bg + colored glow shadow)
  const hasDarkBg = /background(?:-color)?\s*:\s*(?:#(?:0[0-9a-f]|1[0-9a-f]|2[0-3])[0-9a-f]{4}\b|#[01][0-9a-f]{2}\b)/i.test(content) ||
    /\bbg-(?:gray|slate|zinc|neutral|stone)-(?:9\d{2}|800)\b/.test(content);
  if (hasDarkBg) {
    const shadowRe = /box-shadow\s*:\s*([^;{}]+)/gi;
    while ((m = shadowRe.exec(content))) {
      const cm = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(m[1]);
      if (!cm) continue;
      const [r, g, b] = [+cm[1], +cm[2], +cm[3]];
      if (Math.max(r, g, b) - Math.min(r, g, b) < 30) continue; // gray, not a glow
      const px = [...m[1].matchAll(/(\d+)px|(?<![.\d])\b(0)\b(?![.\d])/g)].map((p) => +(p[1] || p[2]));
      if (px.length >= 3 && px[2] > 4) {
        findings.push(f("dark-glow", `colored glow rgb(${r},${g},${b}) blur ${px[2]}px on dark page`, lineAt(m.index)));
        break;
      }
    }
  }

  // monotonous-spacing (regex port: dominant value >60% of >=10 samples, <=3 unique)
  const vals = [];
  for (const [re, mul] of [
    [/(?:padding|margin)(?:-(?:top|right|bottom|left))?\s*:\s*(\d+)px/gi, 1],
    [/(?:padding|margin)(?:-(?:top|right|bottom|left))?\s*:\s*([\d.]+)rem/gi, 16],
    [/gap\s*:\s*(\d+)px/gi, 1],
  ]) {
    while ((m = re.exec(content))) { const v = Math.round(+m[1] * mul); if (v > 0 && v < 200) vals.push(v); }
  }
  const twRe = /\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap)-(\d+)\b/g;
  while ((m = twRe.exec(content))) vals.push(+m[1] * 4);
  const rounded = vals.map((v) => Math.round(v / 4) * 4).filter((v) => v > 0);
  if (rounded.length >= 10) {
    const counts = {};
    for (const v of rounded) counts[v] = (counts[v] || 0) + 1;
    const [dominant, maxCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (maxCount / rounded.length > 0.6 && Object.keys(counts).length <= 3) {
      findings.push(f("monotonous-spacing",
        `~${dominant}px used ${maxCount}/${rounded.length} times (${Math.round((maxCount / rounded.length) * 100)}%)`));
    }
  }

  // em-dash-overuse (>=5 in body text)
  const dashes = (text.match(/[—]|--(?=\S)/g) || []).length;
  if (dashes >= 5) findings.push(f("em-dash-overuse", `${dashes} em-dashes in body copy`));

  // marketing-buzzword
  let buzzCount = 0, buzzSample = "";
  for (const phrase of BUZZWORDS) {
    let from = 0, idx;
    while ((idx = lower.indexOf(phrase, from)) !== -1) {
      buzzCount++;
      if (!buzzSample) buzzSample = text.slice(Math.max(0, idx - 12), idx + phrase.length + 12).trim();
      from = idx + phrase.length;
    }
  }
  if (buzzCount > 0) findings.push(f("marketing-buzzword", `${buzzCount} buzzword phrase${buzzCount === 1 ? "" : "s"}: "${buzzSample}"`));

  // numbered-section-markers (>=3 markers, >=2 sequential, >=2 zero-padded —
  // the zero-pad floor is a MODIFICATION to cut plain-number false positives)
  const seen = new Set();
  const numRe = /\b(0[1-9]|1[0-2])\b/g;
  while ((m = numRe.exec(text))) seen.add(m[1]);
  const sorted = [...seen].sort();
  let sequential = 0;
  for (let i = 1; i < sorted.length; i++) if (+sorted[i] === +sorted[i - 1] + 1) sequential++;
  const zeroPadded = sorted.filter((s) => s.startsWith("0")).length;
  if (seen.size >= 3 && sequential >= 2 && zeroPadded >= 2) {
    findings.push(f("numbered-section-markers", `decorative sequence: ${sorted.slice(0, 6).join(", ")}`));
  }

  // aphoristic-cadence (>=3 constructions)
  let aphCount = 0, aphSample = "";
  for (const re of [
    /\bNot an? [a-z][^.!?]{1,40}[.!]\s+[A-Z][^.!?]{1,60}[.!]/g,
    /\b[A-Z][^.!?]{4,80}[.!]\s+(?:No|Just)\s+[a-z][^.!?]{2,60}[.!]/g,
  ]) {
    while ((m = re.exec(text))) { aphCount++; if (!aphSample) aphSample = m[0].trim().slice(0, 80); }
  }
  if (aphCount >= 3) findings.push(f("aphoristic-cadence", `${aphCount} aphoristic constructions: "${aphSample}"`));

  // theater-slop-phrase (un-gated per ai-tells.md)
  const theaterRe = /\b([a-z][a-z-]+)[ -]theaters?\b/gi;
  const benign = new Set(["movie", "home", "the", "a", "an", "imax", "amc", "this", "local", "grand"]);
  while ((m = theaterRe.exec(text))) {
    if (!benign.has(m[1].toLowerCase())) {
      findings.push(f("theater-slop-phrase", `"${m[0]}" — dismissal-by-theater phrasing`));
      break;
    }
  }

  return findings;
}

// ---------- core ----------

export function detect(content, filePath = "inline.html") {
  const lineAt = lineIndexer(content);
  const cssMap = extractClassCss(content);
  const findings = [
    ...scanHtml(content, cssMap, lineAt),
    ...contentRules(content, lineAt),
  ];
  return findings.map((x) => ({ source: filePath, ...x }));
}

export function report(status, { sources = [], missing = [], findings = [], naReason } = {}) {
  const byRule = {};
  for (const x of findings) byRule[x.rule] = (byRule[x.rule] || 0) + 1;
  return {
    detector: "detect.mjs",
    version: 1,
    attribution: "Rule subset ported from Impeccable (pbakaus/impeccable), Apache-2.0, with modifications — see file header. Catalog: references/visual/ai-tells.md.",
    status,
    ...(naReason ? { naReason } : {}),
    sources,
    ...(missing.length ? { missing } : {}),
    rules: RULES.length,
    findings,
    counts: { total: findings.length, byRule },
  };
}

// ---------- CLI ----------

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const flags = args.filter((a) => a.startsWith("--"));
  if (flags.length) {
    console.error(`detect.mjs: unknown flag ${flags[0]} — usage: node scripts/detect.mjs <file.html> [more files...]`);
    process.exit(1);
  }
  const existing = args.filter((p) => existsSync(p));
  const missing = args.filter((p) => !existsSync(p));
  if (existing.length === 0) {
    // N/A: no rendered artifact. Distinct from "ran and found 0" (exit 3 + status "na").
    const naReason = args.length === 0
      ? "no html artifact supplied — nothing rendered yet (research/plan-only phase?)"
      : `no given path exists: ${args.join(", ")}`;
    console.log(JSON.stringify(report("na", { naReason, missing }), null, 2));
    process.exit(3);
  }
  try {
    const findings = existing.flatMap((p) => detect(readFileSync(p, "utf8"), p));
    console.log(JSON.stringify(report("ran", { sources: existing, missing, findings }), null, 2));
    process.exit(0);
  } catch (e) {
    console.error(`detect.mjs: internal error — ${e.message}`);
    process.exit(1);
  }
}
