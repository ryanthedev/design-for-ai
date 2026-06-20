# Review: Phase 1 — Prototype Skill & Mock Recipe

## Executed Results (Step 0)

**Test suite (custom validation script)**
```
bash .code-foundations/build/2026-06-20-design-workflow-orchestrator-and-mocks-phase-1-scratch.sh
```

Result: **PASS — all 8 verification steps passed**

- Step 1: Skill directory structure ✓
- Step 2: Description char count (865/1024) ✓
- Step 3: "Not for:" clause present ✓
- Step 4: mock-recipe.md structure (ToC, wireframe, styled, surface constraints) ✓
- Step 5: sample-mock.html self-containment (inline styles, custom properties, prefers-reduced-motion, semantic HTML) ✓
- Step 6: Token continuity DESIGN.md → mock ✓
- Step 7: Render protocol + graceful fallback documented ✓
- Step 8: Static trigger-disjointness ✓

**HTML validity check (Python parser)**
- Result: **PASS — valid HTML structure**

---

## Requirement Fulfillment

### DW-1.1
**PREMISE:** "skills/prototype/ exists with SKILL.md (description ≤1024 chars, has a "Not for:" clause) + reference file(s) in the canonical shape (ToC etc.); validate_skill 0/0."

**EVIDENCE:** 
- `/Users/r/repos/design-for-ai/skills/prototype/SKILL.md` exists
- Line 3: description is 865 characters (well under 1024 limit)
- Line 3: includes "Not for: choosing or defining fonts, colors, visual identity, or design tokens (use core design); critiquing, auditing, or reviewing an existing design (use core audit); planning IA, flows, or page specs (use journey); building a design token system or component library (use design-systems)."
- `/Users/r/repos/design-for-ai/skills/prototype/references/mock-recipe.md` exists with canonical structure:
  - Table of Contents (lines 7–14)
  - SELF-CONTAINED FILE CONTRACT section (lines 19–27)
  - TOKEN MAPPING section (lines 31–92)
  - WIREFRAME FIDELITY section (lines 96–127)
  - STYLED (HIGH-FI) FIDELITY section (lines 130–224)
  - SURFACE CONSTRAINTS section (lines 226–242)
  - PREFERS-REDUCED-MOTION section (lines 247–259)
  - COMMON MISTAKES section (lines 265–276)

**TRACE:** Directory check → file exists → frontmatter parsed → description extracted (865 chars ≤ 1024) → "Not for:" clause found in full description listing all redirects (core design, core audit, journey, design-systems) → reference directory contains mock-recipe.md with all required sections

**VERDICT:** **PASS**

---

### DW-1.2
**PREMISE:** "The reference documents the HTML/CSS-from-tokens recipe at BOTH fidelities (low-fi wireframe AND high-fi styled) and honors surface/device constraints."

**EVIDENCE:**
- `/Users/r/repos/design-for-ai/skills/prototype/references/mock-recipe.md` lines 96–127: WIREFRAME FIDELITY section documents:
  - Purpose: "structure and information hierarchy only — no color, no brand"
  - Greyscale defaults (CSS custom properties) when DESIGN.md absent
  - Structural conventions (labels, surface vars, no imagery)
  - Font defaults: system-ui, sans-serif
  - Comment pattern for wireframe mode
  
- Lines 130–224: STYLED (HIGH-FI) FIDELITY section documents:
  - HTML shell with DOCTYPE, meta, webfont link rules (optional)
  - `:root` CSS custom property injection from DESIGN.md token block
  - Base reset (box-sizing, margin, padding, font-family, background, color, line-height)
  - Type scale application (rem-based sizing)
  - Semantic color use table (bg, surface, border, text, accent, error, success states)

- Lines 226–242: SURFACE CONSTRAINTS section provides:
  - Viewport assumption and base font-size per surface (phone: 390px/16px, tablet: 768px/16px, desktop: 1280px/16px, TV: 1920px+/24–32px, watch: ~200px/16–18px, kiosk: touch/18–20px)
  - Min touch target per surface (44×44px for phone/tablet/kiosk, 32×32px for pointer-only desktop)
  - Density and motion budget guidance
  - Phone default layout pattern: `max-width: 390px; margin: 0 auto;`
  - Desktop layout: centered column (`max-width: 1200px; margin: 0 auto; padding: 0 2rem`)
  - TV-specific guidance (large type with clamp(), generous spacing, no hover-only affordances)

**TRACE:** Reference file read → WIREFRAME FIDELITY section exists with greyscale defaults + structural rules → STYLED (HIGH-FI) FIDELITY section exists with token mapping + type scale + semantic colors → SURFACE CONSTRAINTS section exists with viewport assumptions, touch targets, density, and motion budget per surface → HTML shell template includes prefers-reduced-motion

**VERDICT:** **PASS**

---

### DW-1.3
**PREMISE:** "The graceful render protocol is specified — browser-MCP render+screenshot when available, HTML-only emit + "open to view" note when not (never errors)."

**EVIDENCE:**
- `/Users/r/repos/design-for-ai/skills/prototype/SKILL.md` lines 43–59 specify render protocol:
  - Lines 44–50 (when browser MCP connected): `browser_connect(mode: "launch", channel: "chrome", headless: true)` → `browser_navigate(url: "file://...", allow_internal: true)` → `browser_screenshot()` → dispatch Haiku subagent to read PNG → return .html path, screenshot path, summary
  - Lines 52–56 (graceful fallback): "Emit the `.html` path and note: 'Open `<path>` in your browser to view — browser MCP not connected so no screenshot was captured.' No error. The mock is still the deliverable."
  - Line 56: "Detection: if `browser_connect` fails, fall to the fallback. Never block on MCP availability."

**TRACE:** SKILL.md read → "### 3. Render and screenshot (graceful protocol)" section found → two branches documented (connected and not connected) → fallback path emits HTML + note without error → error handling rule ("Never block on MCP availability") → no requirement for screenshot when MCP absent

**VERDICT:** **PASS**

---

### DW-1.4
**PREMISE:** "A sample DESIGN.md + a produced self-contained .html exist; the .html applies the tokens as CSS custom properties and is openable in a browser (inline styles, no build, no missing external deps)."

**EVIDENCE:**
- Sample DESIGN.md: `/Users/r/repos/design-for-ai/skills/prototype/examples/sample-DESIGN.md`
  - Lines 1–14: Design context (register, purpose, audience, personality, DNA, archetype, primary/secondary surface, constraints)
  - Lines 16–81: Tokens block with CSS custom properties (50 token definitions: neutral, accent, semantic aliases, functional colors) in a fenced code block
  - Lines 83–96: Type scale (--text-xs through --text-4xl)
  - Lines 98–107: Surface and motion specifications (phone primary, desktop secondary, touch targets, motion budget, transitions)

- Sample mock HTML: `/Users/r/repos/design-for-ai/skills/prototype/examples/sample-mock.html`
  - Line 1: `<!DOCTYPE html>` present
  - Lines 3–6: `<meta>` tags (charset, viewport) present
  - Lines 9–356: single `<style>` block (all CSS inline)
  - Lines 11–66: `:root` CSS custom properties copied verbatim from sample-DESIGN.md
  - Lines 11–66: CSS custom properties include:
    - Neutral ramp (--neutral-1 through --neutral-12)
    - Accent ramp (--accent-1 through --accent-12, --accent-on-solid)
    - Semantic aliases (--background, --surface, --text, --accent-solid, etc.)
    - Functional colors (--error-*, --success-*, --warning-*, --info-*)
    - Type scale (--text-xs through --text-4xl)
  - Lines 69–77: base reset (box-sizing, body defaults using custom properties)
  - Lines 80–86: `@media (prefers-reduced-motion: reduce)` block suppressing transitions/animations
  - Lines 88–101: phone-first layout with media query for desktop
  - Lines 358–456: semantic HTML structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
  - No external CSS imports (webfont link commented out)
  - No external script imports
  - No build step required; file opens from filesystem

**TRACE:** Sample DESIGN.md exists with all required sections → token block in CSS → sample-mock.html exists → DOCTYPE present → inline <style> block → CSS custom properties in :root → properties match DESIGN.md tokens verbatim → semantic HTML → prefers-reduced-motion implemented → HTML validity check passed → no external deps (except optional webfont link)

**VERDICT:** **PASS**

---

### DW-1.5
**PREMISE:** "Static trigger-disjointness — prototype's description claims "produce a viewable mock/wireframe/prototype" and does NOT claim the core design trigger surface (visual rules) nor the audit/journey surfaces. Verify by reading the description + its "Not for:" clause."

**EVIDENCE:**
- `/Users/r/repos/design-for-ai/skills/prototype/SKILL.md` line 3, description excerpt:
  - Claims: "Produces self-contained HTML/CSS **mockups and wireframes** from design tokens and page specs — the output is always a **viewable .html file**"
  - Claims: "Use when the request is to **see a design, make a mock, build or show a prototype, create a wireframe, render a preview**, or visualize what a page looks like before writing production code"
  
- Exclusions in "Not for:" clause:
  - "choosing or defining fonts, colors, visual identity, or design tokens (**use core design**)" — explicitly redirects visual-rule surface
  - "critiquing, auditing, or reviewing an existing design (**use core audit**)" — explicitly redirects audit surface
  - "planning IA, flows, or page specs (**use journey**)" — explicitly redirects journey surface
  - "building a design token system or component library (**use design-systems**)" — explicitly redirects design-systems surface

**TRACE:** Description read → positive claims found (mockup, wireframe, viewable, prototype, render) → "Not for:" clause read → redirects present for: visual-rules→core design, audit→core audit, flows/IA→journey, system-building→design-systems → no claim of capability in those surfaces

**VERDICT:** **PASS**

---

## Test-DW Coverage

**Test coverage level:** Per-skill skill-craft gate: validate_skill + sample .html self-containment + render protocol + static disjointness

| DW Item | Test Type | Evidence | Status |
|---------|-----------|----------|--------|
| DW-1.1  | Structural validation (script Step 1–4) | Skill directory, SKILL.md frontmatter, reference files, ToC | ✓ Automated |
| DW-1.2  | Reference content audit (script Step 4) | mock-recipe.md sections (wireframe, styled, surface constraints) | ✓ Automated |
| DW-1.3  | Render protocol specification (script Step 7) | SKILL.md section 3 (graceful protocol + fallback) | ✓ Observed in code |
| DW-1.4  | Sample artifact validation (script Step 5–6) | sample-mock.html self-containment, token application, HTML validity | ✓ Automated + parser |
| DW-1.5  | Trigger disjointness (script Step 8) | Description claims, "Not for:" exclusions, surface redirects | ✓ Automated |

**All DW items have corresponding execution evidence.** ✓

---

## Edge Cases

| Edge Case | Spec | Evidence | Status |
|-----------|------|----------|--------|
| Render protocol must NOT error when browser MCP absent | SKILL.md lines 52–56: graceful fallback, "No error", "Never block on MCP availability" | Detection rule ("if browser_connect fails, fall to the fallback") + fallback path emits .html + note | ✓ PASS |
| Mock must be self-contained (no build, deps limited to optional webfont) | mock-recipe.md lines 19–27; SKILL.md build section | sample-mock.html verified: inline <style>, no build step, no external deps (webfont link allowed but commented out) | ✓ PASS |
| reduced-motion respected in any animated mock | mock-recipe.md lines 247–259 + sample-mock.html lines 80–86 | @media (prefers-reduced-motion: reduce) block present, suppresses animation-duration and transition-duration to 0.01ms | ✓ PASS |
| SKILL.md description ≤1024 chars | Hardcoded limit | Measured: 865 characters | ✓ PASS |

---

## Dead Code

**No dead code found.** All files are active:
- SKILL.md: procedure entry point and render protocol definition
- mock-recipe.md: constructive reference for HTML/CSS generation
- sample-DESIGN.md: worked example for token sourcing
- sample-mock.html: worked example for token application + self-contained contract

---

## Correctness Dimensions

| Dimension | Status | Evidence |
|-----------|--------|----------|
| **Concurrency** | N/A | Skill is synchronous procedural; no shared state, async, or background tasks |
| **Error Handling** | PASS | Graceful fallback specified for missing browser MCP (SKILL.md line 56: "Never block on MCP availability"); no errors thrown, .html is deliverable even without screenshot |
| **Resources** | PASS | No resource leaks: browser connection reused or created per invocation; single .html file output (no file handles, no caches, no threads); Haiku subagent for PNG reading isolates large artifacts from context |
| **Boundaries** | PASS | Token mapping is explicit (CSS custom properties, var() references); surface constraints table defines viewport/font-size/touch-target ranges with no ambiguity; HTML semantic elements enforce structure boundaries |
| **Security** | PASS | No untrusted input processing in the skill definition; HTML/CSS generation is template-based from token blocks; no script injection vector (optional webfont link only; no <script> src); file:// URL navigation requires `allow_internal: true` (explicit security gating) |

---

## Notes (non-blocking)

1. **Webfont comment in sample-mock.html (lines 5–7)** — The optional webfont link is fully commented out in the sample. This is correct (defaults to system fonts), but a produced mock might include an uncommented link if DESIGN.md specifies a font family. The comment template is clear, so this is not a concern.

2. **Type scale copy in sample-mock.html** — Type scale is repeated in :root (lines 57–65) rather than copied from a separate reference. This is appropriate for a self-contained file, but reinforces that producers should verify the DESIGN.md type scale when building styled mocks.

3. **Haiku subagent dispatch for PNG** — The render protocol (SKILL.md line 49) dispatches a Haiku subagent to read the screenshot PNG. This is correct (isolates large artifacts), but the skill itself does not implement this; it's an instruction for the skill user (Claude). No code change needed; this is by design.

4. **Motion budget vs. prefers-reduced-motion** — The sample-DESIGN.md specifies "Transitions: 150ms ease-out on state changes only" (line 107), and the sample-mock.html implements transitions (e.g., line 139, 201, 260). The prefers-reduced-motion block (lines 80–86) correctly suppresses these when the user has reduced-motion preference. The relationship is clear.

---

## All Requirements Met

✓ **DW-1.1: PASS** — Skill directory, SKILL.md (description, "Not for:" clause), reference files, canonical shape

✓ **DW-1.2: PASS** — mock-recipe.md documents both wireframe (low-fi) and styled (high-fi) fidelities with surface/device constraints

✓ **DW-1.3: PASS** — Render protocol specifies browser-MCP + fallback, no errors on MCP absence

✓ **DW-1.4: PASS** — Sample DESIGN.md + sample-mock.html exist; .html is self-contained, applies tokens as CSS custom properties, valid HTML, no build

✓ **DW-1.5: PASS** — Description claims mockup/wireframe/prototype surface; "Not for:" clause redirects visual-rules, audit, journey, design-systems to correct surfaces

✓ **All edge cases handled** — graceful MCP fallback, self-contained mock, reduced-motion, description char limit

✓ **All DW items have execution evidence** — automated validation + parser + code inspection

---

**Verdict: PASS**

All Done-When requirements met with execution evidence. Skill is ready for ship.
