# design-foundations — conventions standard

The rules every pillar skill in this plugin obeys. This is the canonical entry doc; the
authoring template (`references/skill-authoring-template.md`) and the taxonomy (`pillar-taxonomy.md`)
both reference it. Phases 2–6 author one or two pillar skills each — they MUST conform here.

The plugin is `design-foundations` in spirit, `design-for-ai` in name (the name is kept; see
plan). It is a **multi-skill plugin**: the existing `skills/design-for-ai/` stays as the core
visual/DNA + surface skill and the index; each new pillar is its own skill under `skills/`.
Skills are auto-discovered from the `skills/` directory and each triggers on its own
`description` — there is no central router (the plugin manifest has no `skills` array; skills
are auto-discovered from the `skills/` directory).

---

## Table of Contents

1. [Frontmatter shape](#1-frontmatter-shape)
2. [The ≤1024-char description rule](#2-the-1024-char-description-rule)
3. [Canonical reference-file shape](#3-canonical-reference-file-shape)
4. [The cite-the-principle house rule](#4-the-cite-the-principle-house-rule)
5. [Dependency direction (cite-down, never up)](#5-dependency-direction-cite-down-never-up)
6. [The per-skill eval gate](#6-the-per-skill-eval-gate)

---

## 1. Frontmatter shape

Every pillar `SKILL.md` opens with YAML frontmatter in this shape:

```yaml
---
name: <pillar-name>          # ≤64 chars, lowercase a-z 0-9 + single hyphens; MUST equal the directory name; no leading/trailing/consecutive hyphens; never contains "anthropic" or "claude"
description: "<see §2>"        # 1–1024 chars, third person, NO XML tags
user-invocable: true          # Claude-Code-only field; pillars are user-invocable
argument-hint: "[context]"    # optional; Claude-Code-only; a short usage hint
---
```

- `name` must match the skill's directory exactly (`skills/usability/` → `name: usability`).
- `user-invocable` and `argument-hint` are Claude-Code-only fields — `validate_skill` reports
  them as non-gating `info`, which is expected and fine (the core skill carries them today).
- No other frontmatter keys unless a later phase documents a reason.

## 2. The ≤1024-char description rule

`description` is **1–1024 characters, hard** (`validate_skill` errors above 1024). This budget
is the entire reason the system exists: the old single skill hit 1023/1024 and could take no
new modes. Per-skill budgets dissolve that ceiling — each pillar gets its own 1024.

Write the description with the skill-craft formula:

> `[Verb-first capabilities]. Use when [triggers/contexts]. Not for: [near-miss exclusions].`

- **Third person, always** — the description is injected into the system prompt.
- **Capability nouns, never process steps** — a step list becomes a shortcut Claude follows
  instead of reading the body.
- **The "Not for:" clause lists near-misses** — the sibling pillars and core modes that share
  keywords but own the concern (see `pillar-taxonomy.md` for each pillar's exact exclusions).
  This is the anti-cannibalization mechanism: disjoint scopes are enforced *in the description*.
- **Measure, don't guess** — `test_triggers` after authoring; `optimize_description` if it
  misfires. Stop at ≤1024 with the near-miss clause present.

## 3. Canonical reference-file shape

Pillar content lives in progressively-loaded reference files under `skills/<pillar>/references/`,
exactly as the core skill's `references/` do. The canonical shape (set during the 2026-06-12
skill-craft refresh — grug `reference-files-canonical-shape`):

- **`## Table of Contents` first** — house rule: any reference file >100 lines opens with a ToC
  (one level deep).
- **Draw from these 11 content sections** as the file needs (not all are mandatory; use what the
  pillar's knowledge calls for): KEY DEFINITIONS, DETECTION CHECKLIST, DESIGN REVIEW CRITERIA,
  RED FLAGS, IMPLEMENTATION CHECKLIST, DESIGN TRANSFORMATION PATTERNS, CORE PRINCIPLES,
  THIS VS THAT, DESIGN DECISION TABLE, TECHNIQUE REFERENCE, COMMON MISTAKES.
- **Banned constructs — never add these** (they were deliberately stripped and `validate_skill`
  / skill-craft WARN on them): `## RATIONALIZATION COUNTERS` (anti-rationalization tables),
  `## DECISION GATE`, `## PROBLEM -> FIT TABLE`, `## TRIGGERS`, `## PRODUCES`,
  `## NEXT CAPABILITY NEEDED`, `## CSO KEYWORDS`. Routing lives in the SKILL.md, not in the
  reference files.
- **One level deep** — references are loaded by name from SKILL.md; do not nest reference dirs.
- **SKILL.md body < 500 lines** (hard); ~200 lines for the always-relevant core; references hold
  the depth.

## 4. The cite-the-principle house rule

Every recommendation a pillar makes **names its source** — the law, heuristic, book, or chapter
it traces to. No unsourced opinion. Examples in the house voice: "Fitts's law", "Nielsen #4
(consistency)", "data-ink ratio (Tufte)", "Hick's law", "Norman: signifiers > affordances".

**Guardrail (the stay-generative posture — grug `design-pillar-landscape-research` COUNTER):**
principles are cited to **ground** a recommendation, never as a compliance checklist. The
research is explicit that "framework thinking = compliance theater" — laws cited post-hoc to
credential a decision, the framework becoming the deliverable. So:

- Cite to explain *why* a recommendation is right, then recommend. Stay **generative** (select,
  pair, propose) — do not degrade into box-ticking audit.
- UX laws are tendencies under conditions, not physics. A pillar may say "Miller's 7±2 is about
  working memory, not visible menu items" and break the rule when the context warrants. Knowing
  *when a principle does NOT apply* is part of citing it honestly.

## 5. Dependency direction (cite-down, never up)

Cross-pillar citation is **one-way and acyclic** (Clean Architecture dependency rule, applied at
skill scope). `usability` is the innermost design-layer entity: its laws are cited *by* other
pillars, and it cites none of them upward.

- **Allowed:** journey → usability (Hick/Fitts/Miller for option-selection); behavioral →
  usability; deceptive-patterns → usability (and cross-links the core's `ai-tells` ban-list as
  its structural twin); design-systems → the core's palette engine + DESIGN.md.
- **Forbidden:** any cycle. usability must not cite journey/behavioral/etc. The core skill must
  not depend on a pillar. Phase 6 verifies the citation graph is a DAG with usability as a sink.
- **DRY is scoped per-pillar, not across pillars.** Duplicating a usability law verbatim inside
  journey is *safer* than coupling the two skills. Across pillar boundaries, prefer duplication
  over a shared dependency — cross-pillar coupling is the exact failure this system avoids.

## 6. The per-skill eval gate

Every pillar skill passes this gate in its authoring phase before it is considered done:

1. **`validate_skill` = 0 errors / 0 warnings.** Run on `skills/<pillar>`. Non-gating `info`
   notes for Claude-Code-only frontmatter keys (`user-invocable`, `argument-hint`) are expected
   and acceptable. Zero errors and zero warnings is the bar.
2. **`test_triggers` — both directions.** The skill fires on its on-topic queries (positive) AND
   stays quiet on near-miss queries that belong to a sibling or a core mode (negative /
   no-cannibalization). Use the "Not for:" exclusions from `pillar-taxonomy.md` as the near-miss
   set. If it misfires, run `optimize_description` (train/holdout, one iteration per call) until
   both directions pass.
3. **`run_eval` — when to run it.** Run `run_eval` (with-skill vs without-skill, graded
   assertions) on the **keystone `usability` skill** (Phase 2 authors it; the eval is exercised
   at Phase 6) to prove the skill changes behavior, not just triggers. Other pillars gate on
   `validate_skill` + `test_triggers`; reserve `run_eval` for the keystone and for any pillar
   whose value is contested, budget permitting. (If `run_eval` credit is exhausted, drop to
   `test_triggers`-only and note the coverage gap — per plan fallback.)
4. **Description budget re-checked** (§2): ≤1024 chars, near-miss "Not for:" clause present.

Baseline-first discipline (skill-craft): author the skill *after* writing the evals, so the
documented baseline failures are the spec. The harness is the test suite for this markdown
plugin — never hand-fill a compliance verdict; the skill-eval MCP tools compute them.
