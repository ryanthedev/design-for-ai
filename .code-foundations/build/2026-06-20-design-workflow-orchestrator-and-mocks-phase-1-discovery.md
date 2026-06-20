# Discovery + Design: Phase 1 — prototype skill

## Files Found

- `/Users/r/repos/design-for-ai/docs/foundations-standards.md` — conventions every skill obeys
- `/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md` — disjoint scope map for all pillars
- `/Users/r/repos/design-for-ai/docs/skill-authoring-template.md` — canonical skill shape (frontmatter, body skeleton, reference-file shape)
- `/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md` — core visual skill; owns DESIGN.md, surface mode, audit mode
- `/Users/r/repos/design-for-ai/skills/design-for-ai/scripts/palette.mjs` — token generator: emits CSS custom properties (`--neutral-1..12`, `--accent-1..12`, semantic aliases like `--background`, `--surface`, `--text`, `--accent-solid`)
- `/Users/r/repos/design-for-ai/skills/journey/SKILL.md` — canonical pillar shape reference; ships JOURNEY.md
- `/Users/r/repos/design-for-ai/skills/journey/references/journey-stack.md` — JOURNEY.md template (sections: Job / Journey / IA / Flows / Page specs)

## Current State

- `skills/prototype/` does NOT exist yet — must be created
- No DESIGN.md or JOURNEY.md exist in the repo root (the plugin is a tool, not a project with its own design tokens)
- The core `design-for-ai` SKILL.md description is at 1019/1024 chars — prototype must carry its own description
- The journey skill is the best shape reference for a sibling pillar: SKILL.md + references/ with one or two reference files
- Browser MCP (`oberskills:mcp-browser`) CAN render local `.html` files via `file://` URLs using `browser_navigate` with `allow_internal: true`, then `browser_screenshot` — VERIFIED live in this session. The `browser_navigate` schema shows `allow_internal` opts into `file://`; the tool accepted `status: 200` and screenshot returned a valid PNG path. This is the render path to specify in the protocol.

## Gaps

- No prior `prototype/` directory or any example DESIGN.md to test against — must create a sample
- No evals.json yet (skill-craft baseline-first discipline — we're building in one pass as part of the build plan, not the full skill-craft CREATE pipeline; validate_skill + test_triggers are the gates per plan §DW-1.1 and §DW-1.5)
- `docs/pillar-taxonomy.md` does not yet list `prototype` (Phase 4 will update it; noted, not blocked)

## Code Standards

From `foundations-standards.md`:
- `name` == directory name; ≤64 chars; lowercase alphanumeric + single hyphens
- `description`: 1–1024 chars hard limit; third person; no XML tags; capability nouns not process steps; "Not for:" near-miss clause required
- Reference files: `## Table of Contents` first if >100 lines; draw from 11 canonical sections; banned constructs excluded (RATIONALIZATION COUNTERS, DECISION GATE, PROBLEM->FIT TABLE, TRIGGERS, PRODUCES, NEXT CAPABILITY NEEDED, CSO KEYWORDS)
- SKILL.md body < 500 lines; ~200 lines always-relevant core; depth in references
- validate_skill 0/0 required before ship

## Test Infrastructure

- `mcp__plugin_oberskills_skill-eval__validate_skill` — spec lint; must return 0 errors/0 warnings
- `mcp__plugin_oberskills_skill-eval__test_triggers` — positive/negative query probes
- Evidence artifact: `skills/prototype/examples/` — sample DESIGN.md + produced `.html` (DW-1.4)

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-1.1 | skills/prototype/ exists (SKILL.md ≤1024 desc + references) per template; validate_skill 0/0 | COVERED | `validate_skill` run on `skills/prototype`; 0 errors 0 warnings required |
| DW-1.2 | The reference documents the HTML/CSS-from-tokens recipe at both fidelities (wireframe + styled) and honors surface constraints | COVERED | Reference file `references/mock-recipe.md` authored with wireframe + high-fi sections and surface-constraint table; confirmed by reading the file |
| DW-1.3 | Graceful render protocol specified — browser-MCP render+screenshot when available, HTML-only emit + note when not | COVERED | Protocol section in SKILL.md body; confirmed in `references/mock-recipe.md`; absence path documented as "emit .html + open-to-view note, no error" |
| DW-1.4 | Producing a mock from a sample DESIGN.md yields a valid self-contained .html (tokens as CSS custom properties) | COVERED | `skills/prototype/examples/sample-DESIGN.md` + `skills/prototype/examples/sample-mock.html` created; html opens in browser (verified via browser MCP) |
| DW-1.5 | test_triggers — "make me a mock / prototype / wireframe / show me what it looks like" fires prototype; disjoint from core design | COVERED | `test_triggers` run with positive set + negative near-miss set (core design phrases, audit phrases, journey phrases) |

**All items COVERED:** YES

## Design Decisions

### Artifact type
Single skill directory `skills/prototype/` with SKILL.md + one reference file (`references/mock-recipe.md`). The reference holds the recipe depth; SKILL.md carries the procedure and render protocol. Follows the journey/usability canonical shape exactly.

### Description strategy
- Verb-first capability: "Produces self-contained HTML/CSS mockups..."
- "Use when" triggers: mock, prototype, wireframe, show me what it looks like, render, visualize
- "Not for:" near-misses: the visual rules (core design), the audit critique (core audit), the IA and flows (journey)
- Disjoint from core `design` by concern: prototype = *produce a viewable artifact*; design = *establish visual DNA*

### Fidelity split
- **Low-fi (wireframe):** structure + greyscale only; no tokens required; works when no DESIGN.md exists; uses CSS variables defaulting to greys; semantic HTML blocks labeled with content purpose
- **High-fi (styled):** tokens from DESIGN.md applied as CSS custom properties on `:root`; full palette + type scale; matches DESIGN.md's token names exactly (`--neutral-1..12`, `--accent-*`, semantic aliases)

### Render protocol
- **Browser MCP present:** `browser_navigate(url=file://<abs-path>, allow_internal: true)` → `browser_screenshot()` → return `{html_path, screenshot_path}`; dispatch a Haiku subagent to summarize the screenshot per browser skill's payload discipline (large artifact, keep out of main context)
- **Browser MCP absent (graceful fallback):** emit the `.html` path + note "Open in your browser to view — browser MCP not connected so no screenshot was captured." Never error.
- Detection: attempt `browser_connect`; if it errors, fall to the HTML-only path.

### Token mapping (DESIGN.md → CSS)
The palette.mjs output uses these CSS custom property names verbatim; prototype reads them from DESIGN.md and inlines them in `<style>`:
```
:root {
  --neutral-1 through --neutral-12   (background through high-contrast text)
  --accent-1 through --accent-12
  --accent-on-solid
  --background, --surface, --surface-hover, --surface-active
  --border-subtle, --border, --border-strong
  --text-secondary, --text
  --accent-bg-subtle, --accent-solid, --accent-solid-hover, --accent-text
  --error-3, --error-9, --error-11
  --success-3, --success-9, --success-11
  --warning-3, --warning-9, --warning-11
  --info-3, --info-9, --info-11
}
```
When DESIGN.md is absent, all tokens default to greyscale values (wireframe mode).

### surface / prefers-reduced-motion
- The reference documents surface constraints (phone, desktop, TV, watch, kiosk) — viewport, base font-size, touch targets — matching the core `surface` mode's device-class model
- `@media (prefers-reduced-motion: reduce)` added to every mock template; transitions and animations suppressed

### Self-contained constraint
Single `.html` file; all CSS inline in `<style>`; optional `<link rel=preconnect>` + `<link rel=stylesheet>` for a webfont (Google Fonts or Bunny) when DESIGN.md names one — no other external deps.

## Prerequisites

- [x] `skills/` directory exists
- [x] Template shape understood (journey / usability as references)
- [x] Token names known from palette.mjs source
- [x] JOURNEY.md template known (page specs section = page-spec inputs for mocks)
- [x] Browser MCP local-file render verified (file:// with allow_internal: true)
- [x] validate_skill tool available

## Browser MCP Local-Render Finding

**Result: SUPPORTED.** `browser_navigate` accepts `file://` URLs when `allow_internal: true` is passed. Verified live: navigated to a local `.md` file, received `status: 200`, then `browser_screenshot` returned a valid PNG at `/var/folders/.../browser-mcp-*.png`. The render protocol in the skill will specify `allow_internal: true` on the navigate call. This is noted as an MCP-server-level feature that may not be available in all deploy environments — the graceful fallback (HTML-only emit) remains the safe default when `browser_connect` fails.

## Recommendation

BUILD — all prerequisites met, design is clear, browser MCP local-render confirmed.
