#!/usr/bin/env node
// detect.test.mjs — self-contained test suite for detect.mjs.
// Run: node scripts/detect.test.mjs   (exits nonzero on any failure)
// DW-item tests carry their DW-ID in the test name for traceability.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { detect, RULES, stripHtmlToText } from "./detect.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);
const DETECT = join(HERE, "detect.mjs");
const SLOPPY = join(HERE, "fixtures", "sloppy.html");
const CLEAN = join(HERE, "fixtures", "clean.html");

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`PASS  ${name}`); }
  catch (e) { failed++; console.error(`FAIL  ${name}\n      ${e.message}`); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
const eq = (a, b, msg) => assert(a === b, `${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

// Run the CLI; never throws — returns { status, stdout, stderr }.
function run(args) {
  try {
    const stdout = execFileSync(process.execPath, [DETECT, ...args], { encoding: "utf8" });
    return { status: 0, stdout, stderr: "" };
  } catch (e) {
    return { status: e.status, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}
const rulesHit = (findings) => new Set(findings.map((x) => x.rule));

// ---------- DW-6.3: CLI contract, rule count, attribution, fixtures ----------

test("DW-6.3 CLI exits 0 with parseable JSON findings on an html file", () => {
  const r = run([SLOPPY]);
  eq(r.status, 0, "exit code");
  const out = JSON.parse(r.stdout);
  eq(out.status, "ran", "status");
  assert(Array.isArray(out.findings), "findings must be an array");
  assert(out.findings.length > 0, "sloppy fixture must yield findings");
  eq(out.counts.total, out.findings.length, "counts.total matches findings");
});

test("DW-6.3 catalog has >=12 rules including >=4 copy tells", () => {
  assert(RULES.length >= 12, `expected >=12 rules, got ${RULES.length}`);
  const copy = RULES.filter((r) => r.category === "copy");
  assert(copy.length >= 4, `expected >=4 copy rules, got ${copy.length}`);
  const required = ["nested-cards", "icon-tile-stack", "hero-eyebrow-chip", "monotonous-spacing",
    "repeated-section-kickers", "purple-triplet", "uniform-low-opacity-shadow", "unmodified-shadcn-tokens"];
  for (const id of required) assert(RULES.some((r) => r.id === id), `missing required rule ${id}`);
});

test("DW-6.3 file header carries Apache-2.0 attribution to Impeccable with a modification statement", () => {
  const src = readFileSync(DETECT, "utf8");
  const header = src.slice(0, src.indexOf("import "));
  assert(/Apache License,? Version 2\.0/i.test(header), "missing Apache-2.0 license reference");
  assert(/pbakaus\/impeccable/i.test(header), "missing Impeccable attribution");
  assert(/MODIFICATIONS/.test(header), "missing modification statement");
  assert(/static/i.test(header) && /subset/i.test(header), "modification statement must state the static-subset port");
});

test("DW-6.3 known-sloppy fixture triggers >=3 rules", () => {
  const r = run([SLOPPY]);
  eq(r.status, 0, "exit code");
  const hit = rulesHit(JSON.parse(r.stdout).findings);
  assert(hit.size >= 3, `expected >=3 distinct rules, got ${hit.size}: ${[...hit].join(", ")}`);
});

test("DW-6.3 clean fixture triggers 0 rules", () => {
  const r = run([CLEAN]);
  eq(r.status, 0, "exit code");
  const out = JSON.parse(r.stdout);
  eq(out.status, "ran", "status");
  eq(out.findings.length, 0, `clean fixture findings (${out.findings.map((x) => `${x.rule}: ${x.evidence}`).join(" | ")})`);
});

// ---------- N/A edge cases (distinct from "ran and found 0") ----------

test("no argument signals N/A: exit 3, status na", () => {
  const r = run([]);
  eq(r.status, 3, "exit code");
  const out = JSON.parse(r.stdout);
  eq(out.status, "na", "status");
  assert(out.naReason.length > 0, "naReason must explain");
  eq(out.findings.length, 0, "no findings on na");
});

test("non-existent path signals N/A: exit 3, status na, path named", () => {
  const r = run(["scripts/fixtures/does-not-exist.html"]);
  eq(r.status, 3, "exit code");
  const out = JSON.parse(r.stdout);
  eq(out.status, "na", "status");
  assert(out.naReason.includes("does-not-exist.html"), "naReason names the missing path");
});

test("unknown flag is a usage error: exit 1", () => {
  const r = run(["--nope", SLOPPY]);
  eq(r.status, 1, "exit code");
});

test("mixed existing + missing paths: runs on existing, reports missing", () => {
  const r = run([SLOPPY, "nope.html"]);
  eq(r.status, 0, "exit code");
  const out = JSON.parse(r.stdout);
  eq(out.status, "ran", "status");
  assert(out.missing.includes("nope.html"), "missing paths reported");
  assert(out.sources.includes(SLOPPY), "existing path analyzed");
});

// ---------- per-rule unit tests (beyond the DW floor) ----------

const has = (html, rule) => rulesHit(detect(html)).has(rule);

test("rule: nested-cards fires on card-in-card, not on a single card", () => {
  const nested = `<div style="border:1px solid #ccc;border-radius:8px"><div style="box-shadow:0 1px 2px rgba(0,0,0,0.3);background:#fff"><p>x</p></div></div>`;
  assert(has(nested, "nested-cards"), "nested should fire");
  const single = `<div style="border:1px solid #ccc;border-radius:8px"><p>x</p></div>`;
  assert(!has(single, "nested-cards"), "single card must not fire");
});

test("rule: nested-cards resolves card classes from <style> blocks", () => {
  const html = `<style>.panel{background:#fff;box-shadow:0 2px 4px rgba(0,0,0,0.3)}.inner{border:1px solid #ddd;border-radius:6px}</style><div class="panel"><div class="inner">x</div></div>`;
  assert(has(html, "nested-cards"), "class-resolved nesting should fire");
});

test("rule: icon-tile-stack fires on squarish icon tile above heading", () => {
  const html = `<div><div style="width:48px;height:48px;background:#333;border-radius:8px"><svg viewBox="0 0 24 24"><path d="M0 0"/></svg></div><h3>Feature</h3></div>`;
  assert(has(html, "icon-tile-stack"), "tile above h3 should fire");
});

test("rule: icon-tile-stack ignores circular avatars and tiles without icons", () => {
  const avatar = `<div><div style="width:48px;height:48px;background:#333;border-radius:50%"><svg></svg></div><h3>Person</h3></div>`;
  assert(!has(avatar, "icon-tile-stack"), "circle (avatar) must not fire");
  const noIcon = `<div><div style="width:48px;height:48px;background:#333;border-radius:8px"></div><h3>Feature</h3></div>`;
  assert(!has(noIcon, "icon-tile-stack"), "no icon child must not fire");
});

test("rule: hero-eyebrow-chip fires on tracked-caps label above h1 only", () => {
  const h1 = `<div><p style="text-transform:uppercase;letter-spacing:2px;font-size:12px">New release</p><h1>Big Title</h1></div>`;
  assert(has(h1, "hero-eyebrow-chip"), "eyebrow above h1 should fire");
  const plain = `<div><p>A normal sentence introducing things.</p><h1>Big Title</h1></div>`;
  assert(!has(plain, "hero-eyebrow-chip"), "plain paragraph must not fire");
});

test("rule: repeated-section-kickers needs >=3 kickers", () => {
  const kicker = (t, h) => `<section><p style="text-transform:uppercase;font-size:12px;letter-spacing:2px">${t}</p><h2>${h}</h2></section>`;
  const three = kicker("ONE", "A") + kicker("TWO", "B") + kicker("THREE", "C");
  assert(has(three, "repeated-section-kickers"), "3 kickers should fire");
  const two = kicker("ONE", "A") + kicker("TWO", "B");
  assert(!has(two, "repeated-section-kickers"), "2 kickers must not fire");
});

test("rule: monotonous-spacing fires on one dominant value, not on varied rhythm", () => {
  const mono = `<style>${Array.from({ length: 11 }, (_, i) => `.a${i}{padding:24px}`).join("")}</style><div>x</div>`;
  assert(has(mono, "monotonous-spacing"), "11x 24px should fire");
  const varied = `<style>.a{padding:8px}.b{padding:16px}.c{padding:24px}.d{padding:40px}.e{padding:64px}.f{margin:12px}.g{margin:32px}.h{margin:56px}.i{gap:20px}.j{gap:48px}</style><div>x</div>`;
  assert(!has(varied, "monotonous-spacing"), "varied spacing must not fire");
});

test("rule: purple-triplet fires on the hexes and the Tailwind-500 classes", () => {
  assert(has(`<div style="color:#6366F1">x</div>`, "purple-triplet"), "#6366F1 should fire");
  assert(has(`<div class="bg-violet-500">x</div>`, "purple-triplet"), "bg-violet-500 should fire");
  assert(!has(`<div style="color:#3B6E4F">x</div>`, "purple-triplet"), "other hex must not fire");
});

test("rule: uniform-low-opacity-shadow fires only when ALL >=3 shadows sit in 0.08-0.12", () => {
  const el = (a) => `<i style="box-shadow:0 1px 2px rgba(0,0,0,${a})">a</i>`;
  assert(has(el(0.1) + el(0.1) + el(0.08), "uniform-low-opacity-shadow"), "3 in-band should fire");
  assert(!has(el(0.1) + el(0.1) + el(0.4), "uniform-low-opacity-shadow"), "depth variation must not fire");
  assert(!has(el(0.1) + el(0.1), "uniform-low-opacity-shadow"), "2 shadows must not fire");
});

test("rule: unmodified-shadcn-tokens fires on default --radius + >=2 default HSL values", () => {
  const html = `<style>:root{--radius:0.5rem;--background:0 0% 100%;--foreground:240 10% 3.9%;}</style>`;
  assert(has(html, "unmodified-shadcn-tokens"), "defaults should fire");
  const modified = `<style>:root{--radius:0.15rem;--background:36 33% 97%;}</style>`;
  assert(!has(modified, "unmodified-shadcn-tokens"), "modified tokens must not fire");
});

test("rule: dark-glow fires on dark bg + colored blurred shadow", () => {
  const html = `<style>body{background:#0a0a0a}</style><div style="box-shadow:0 0 20px rgba(0,255,170,0.5)">x</div>`;
  assert(has(html, "dark-glow"), "glow on dark should fire");
  const light = `<style>body{background:#fafafa}</style><div style="box-shadow:0 0 20px rgba(0,255,170,0.5)">x</div>`;
  assert(!has(light, "dark-glow"), "light page must not fire");
});

test("rule: em-dash-overuse fires at 5, not at 4", () => {
  assert(has(`<p>${"one — two ".repeat(5)}</p>`, "em-dash-overuse"), "5 should fire");
  assert(!has(`<p>${"one — two ".repeat(4)}</p>`, "em-dash-overuse"), "4 must not fire");
});

test("rule: marketing-buzzword fires on stock phrases only", () => {
  assert(has(`<p>Streamline your morning routine.</p>`, "marketing-buzzword"), "buzzword should fire");
  assert(!has(`<p>The caster sets one slug at a time.</p>`, "marketing-buzzword"), "specific copy must not fire");
});

test("rule: numbered-section-markers needs zero-padded sequence (plain 10/11/12 exempt)", () => {
  assert(has(`<p>01 Plan</p><p>02 Build</p><p>03 Ship</p>`, "numbered-section-markers"), "01/02/03 should fire");
  assert(!has(`<p>Open 10 to 11, closed at 12.</p>`, "numbered-section-markers"), "plain numbers must not fire");
});

test("rule: aphoristic-cadence fires at 3 constructions, not at 2", () => {
  const three = `<p>Not a tool. A partner. Powerful analytics. No compromises. Results you trust. Just outcomes.</p>`;
  assert(has(three, "aphoristic-cadence"), "3 constructions should fire");
  const two = `<p>Not a tool. A partner. Powerful analytics. No compromises.</p>`;
  assert(!has(two, "aphoristic-cadence"), "2 constructions must not fire");
});

test("rule: theater-slop-phrase fires on dismissal phrasing, not on real theaters", () => {
  assert(has(`<p>This is security theater, nothing more.</p>`, "theater-slop-phrase"), "security theater should fire");
  assert(!has(`<p>We met at the movie theater downtown.</p>`, "theater-slop-phrase"), "movie theater must not fire");
});

test("rule: overused-font fires on listed primary faces, not on fallbacks or others", () => {
  assert(has(`<style>body{font-family: Inter, sans-serif}</style>`, "overused-font"), "Inter primary should fire");
  assert(has(`<style>body{font-family:'Space Grotesk',sans-serif}</style>`, "overused-font"), "Space Grotesk should fire");
  assert(!has(`<style>body{font-family:'Charter', Georgia, serif}</style>`, "overused-font"), "Charter primary must not fire");
});

test("rule: gradient-text fires on background-clip:text + gradient", () => {
  assert(has(`<style>.g{background:linear-gradient(90deg,#111,#933);-webkit-background-clip:text;}</style>`, "gradient-text"), "gradient clip should fire");
  assert(!has(`<style>.g{background:#111;-webkit-background-clip:text;}</style>`, "gradient-text"), "solid clip must not fire");
});

// ---------- behavior invariants ----------

test("detect() is deterministic: identical input, identical output", () => {
  const html = readFileSync(SLOPPY, "utf8");
  eq(JSON.stringify(detect(html, "a.html")), JSON.stringify(detect(html, "a.html")), "two runs differ");
});

test("stripHtmlToText drops script/style/comments", () => {
  const t = stripHtmlToText(`<style>.x{--a:1}</style><script>let a=1--2;</script><!-- c —— --><p>hi</p>`);
  eq(t.trim(), "hi", "stripped text");
});

test("every finding carries rule/category/severity/evidence from the registry", () => {
  const html = readFileSync(SLOPPY, "utf8");
  for (const x of detect(html, SLOPPY)) {
    const rule = RULES.find((r) => r.id === x.rule);
    assert(rule, `unknown rule ${x.rule}`);
    eq(x.category, rule.category, `category of ${x.rule}`);
    eq(x.severity, rule.severity, `severity of ${x.rule}`);
    assert(typeof x.evidence === "string" && x.evidence.length > 0, `evidence of ${x.rule}`);
  }
});

test("sloppy fixture covers all three required rule groups", () => {
  const hit = rulesHit(detect(readFileSync(SLOPPY, "utf8"), SLOPPY));
  for (const id of ["nested-cards", "icon-tile-stack", "hero-eyebrow-chip", "monotonous-spacing", "repeated-section-kickers"])
    assert(hit.has(id), `layout rule ${id} should fire on sloppy fixture`);
  for (const id of ["purple-triplet", "uniform-low-opacity-shadow", "unmodified-shadcn-tokens"])
    assert(hit.has(id), `signature rule ${id} should fire on sloppy fixture`);
  const copyHits = [...hit].filter((id) => RULES.find((r) => r.id === id).category === "copy");
  assert(copyHits.length >= 4, `expected >=4 copy tells on sloppy fixture, got ${copyHits.length}`);
});

// ---------- DW-6.1 / DW-6.2 / DW-6.4: doctrine + dispatch wiring ----------

test("DW-6.1 design-review-agent.md documents A/B isolation and skipped-detector-FAIL with the N/A carve-out", () => {
  const doc = readFileSync(join(ROOT, "agents", "design-review-agent.md"), "utf8");
  assert(/Assessment A/.test(doc) && /Assessment B/.test(doc), "must name both assessments");
  assert(/neither sees the other/i.test(doc), "must state pre-synthesis isolation");
  assert(/do not read (that file|`?detect\.json`?)/i.test(doc), "must forbid reading detector output before A is frozen");
  assert(/skipped detector is a FAILED review run/i.test(doc), "must state skipped detector = failed run");
  assert(/N\/A/.test(doc) && /carve-out/i.test(doc), "must state the no-artifact N/A carve-out");
  assert(/never a FAIL and never counts as a skipped detector/i.test(doc), "carve-out must exempt N/A from failure");
});

test("DW-6.2 rubric contains a distinctiveness criterion — on-pattern safety cannot PASS", () => {
  const doc = readFileSync(join(ROOT, "agents", "design-review-agent.md"), "utf8");
  assert(/Distinctiveness criterion/i.test(doc), "rubric must name the distinctiveness criterion");
  assert(/On-pattern safety alone (must never|cannot) yield PASS/i.test(doc), "must state on-pattern safety cannot yield PASS");
  assert(/\*\*Distinctiveness\*\*/.test(doc), "verdict rules must carry the distinctiveness FAIL condition");
});

test("DW-6.4 mock.md and build.md review dispatches invoke both assessments", () => {
  for (const file of ["commands/mock.md", "commands/build.md"]) {
    const doc = readFileSync(join(ROOT, file), "utf8");
    assert(/run BOTH assessments/i.test(doc), `${file}: dispatch must require both assessments`);
    assert(/Assessment A/.test(doc) && /Assessment B/.test(doc), `${file}: dispatch must name A and B`);
    assert(/scripts\/detect\.mjs/.test(doc), `${file}: dispatch must invoke detect.mjs`);
    assert(/N\/A/.test(doc), `${file}: dispatch must carry the N/A carve-out`);
  }
});

// ---------- summary ----------

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
