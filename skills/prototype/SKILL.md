---
name: prototype
description: "Produces self-contained HTML/CSS mockups and wireframes from design tokens and page specs — the output is always a viewable .html file, not guidance or code. Use when the request is to see a design, make a mock, build or show a prototype, create a wireframe, render a preview, or visualize what a page looks like before writing production code. Reads DESIGN.md tokens and JOURNEY.md page specs when present; uses greyscale wireframe defaults when absent. Renders via the browser MCP and returns a screenshot path when connected; emits the .html with an open note when not. Not for: choosing or defining fonts, colors, visual identity, or design tokens (use core design); critiquing, auditing, or reviewing an existing design (use core audit); planning IA, flows, or page specs (use journey); building a design token system or component library (use design-systems)."
user-invocable: true
argument-hint: "[page name or spec, fidelity: wireframe|styled]"
---

Prototype turns design tokens and page specs into a viewable artifact — a single self-contained `.html` file that opens in any browser with no build step.

## When this applies

- "Show me what it looks like" / "make a mock" / "build a prototype" / "render a wireframe"
- Visualizing a page from a JOURNEY.md page spec
- Checking token application before writing production code
- Supplying a screenshot for the design-review-agent to critique

## Procedure

### 1. Gather inputs

Collect three inputs:

| Input | Source | If absent |
|-------|--------|-----------|
| **Tokens** | DESIGN.md at the project root (the CSS custom-property block from `palette.mjs`) | Wireframe mode: greyscale defaults |
| **Page spec** | JOURNEY.md page spec section, or user description | Scaffold a generic page skeleton |
| **Fidelity** | User request; "wireframe" = structure only, "styled" = full tokens | Default to styled when DESIGN.md present, wireframe when not |

If DESIGN.md is absent, note it and proceed in wireframe mode — emit the `.html` with a comment: `<!-- No DESIGN.md found — wireframe mode: greyscale defaults. Run /design-for-ai to establish tokens. -->`.

### 2. Build the mock

Load `references/mock-recipe.md`. Follow the recipe for the chosen fidelity:

- **Wireframe:** HTML structure + CSS custom properties defaulting to greys; semantic sectioning (`<header>`, `<main>`, `<nav>`, `<section>`, `<aside>`, `<footer>`); placeholder labels (`[Hero headline]`, `[Body copy]`, `[CTA]`); no color, no imagery.
- **Styled:** All DESIGN.md tokens applied to `:root` as CSS custom properties; type scale, color, spacing, and surface constraints from DESIGN.md honored. Webfont `<link>` included when DESIGN.md names one.

Both fidelities: single file, all CSS in `<style>`, `prefers-reduced-motion` media query suppressing transitions, touch targets ≥44×44px on mobile surfaces, semantic HTML.

Write the file to `<project-root>/mocks/<page-name>.html` (create `mocks/` if needed), or to `./mock.html` when no project root is clear.

### 3. Render and screenshot (graceful protocol)

**When the browser MCP is connected:**

1. `browser_connect(mode: "launch", channel: "chrome", headless: true)` — or reuse existing connection.
2. `browser_navigate(url: "file://<absolute-path-to-html>", allow_internal: true)` — local file render; `allow_internal` is required.
3. `browser_screenshot()` — returns `{path}` (a PNG).
4. Dispatch a Haiku subagent to read the PNG and return a text summary (payload discipline: large artifact stays out of main context).
5. Return: the `.html` path, the screenshot path, and the Haiku summary.

**When the browser MCP is not connected (graceful fallback):**

Emit the `.html` path and note: "Open `<path>` in your browser to view — browser MCP not connected so no screenshot was captured." No error. The mock is still the deliverable.

Detection: if `browser_connect` fails, fall to the fallback. Never block on MCP availability.

### 4. Handoff

Suggest running `/design-for-ai:mock` (which dispatches the `design-review-agent`) to critique the rendered result, or `build` for a full gated review.

## References

| Reference file | Load when |
|----------------|-----------|
| `references/mock-recipe.md` | Building any mock — the HTML/CSS recipe, token mapping, surface-constraint table, fidelity specs, and `prefers-reduced-motion` rule |
