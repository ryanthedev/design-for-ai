---
description: "Figure out what the user wants to design — even when they don't know yet. Extracts the design brief: purpose, audience, brand feel, JTBD, device constraints, and mood references. Use before plan, or standalone when exploring a design idea."
argument-hint: "[project or brief description]"
---

# Command: research

**Goal:** Extract and document the design brief. Output: `.code-foundations/research/YYYY-MM-DD-<slug>.md` — a confirmed brief the `plan` command consumes.

This command facilitates a short conversation to surface what the user needs: what it is, who it's for, what it should feel like, and what constraints matter. It does not generate designs — it prepares the brief that makes design decisions non-arbitrary.

---

## Body (Phase 2 implements this)

Full facilitation flow is implemented in Phase 2. This stub establishes the command and its chain.

**Next stage:** When the brief is confirmed, run `/design-for-ai:plan <research-doc>`.
