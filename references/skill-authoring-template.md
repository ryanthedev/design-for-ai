# Skill-authoring template

The reusable procedure for authoring any of the 4 surviving skills (`clarify`, `prototype`,
`usability`, `data-viz`). Doctrine reference files in `references/` are plain Markdown — they
do not use SKILL.md or YAML frontmatter and are not covered here. This template operationalizes
`docs/foundations-standards.md` (the rules) and `docs/pillar-taxonomy.md` (scope + resolver).
Author *through* `oberskills:skill-craft` best practices — baseline-first, measure don't guess —
not just `validate_skill` after the fact.

---

## Table of Contents

1. [Checklist (do these in order)](#1-checklist-do-these-in-order)
2. [Copy-paste frontmatter block](#2-copy-paste-frontmatter-block)
3. [SKILL.md body skeleton](#3-skillmd-body-skeleton)
4. [Reference-file stub (canonical shape)](#4-reference-file-stub-canonical-shape)
5. [Definition of done](#5-definition-of-done)

---

## 1. Checklist (do these in order)

Baseline-first: write the evals before the skill, so the documented failures are the spec.
Applies to the 4 surviving skills only (`clarify`, `prototype`, `usability`, `data-viz`).
Doctrine reference files in `references/` are plain Markdown — skip this checklist for those.

- [ ] **Scope.** Read the skill's row in `docs/pillar-taxonomy.md`: its concern (SRP), its "fires on"
      keywords (for `prototype`), its "not for X (use Y)" exclusions, and which doctrine it may cite.
- [ ] **Source.** Read the backing grug research for this skill's domain (named in the taxonomy row).
      Pull the principles/laws/patterns the skill will cite. Cite-the-principle on every claim.
- [ ] **Baseline evals.** Author ≥3 evals (`evals.json`); run `run_eval` with
      `configurations: ["without_skill"]` to document what Claude misses without the skill.
- [ ] **Stub the surface.** Create `skills/<name>/SKILL.md` with frontmatter (§2) + the body
      skeleton (§3), and empty `references/<file>.md` stubs (§4). Wire routing in SKILL.md only.
- [ ] **Author.** Fill the body and references from the research. SKILL.md body < 500 lines;
      depth goes in references. Apply the dependency direction (cite usability down, never up).
- [ ] **Validate.** `validate_skill skills/<name>` → 0 errors / 0 warnings. Fix all warnings.
- [ ] **Trigger-test.** For `prototype` (user-invocable: true): positive queries fire it; near-miss
      queries do NOT. For `clarify`, `usability`, `data-viz` (user-invocable: false): confirm they
      do not appear in the slash menu and do not auto-trigger. Run `optimize_description` if needed.
- [ ] **Keystone eval (usability).** `run_eval` with-skill vs without-skill; with-skill beats baseline.
- [ ] **Cross-refs.** If the skill cites doctrine (e.g. usability laws), make the link resolve
      and point the correct direction (cite-down, never up).
- [ ] **Verify discovery.** Confirm the skill directory is discovered from `skills/` at plugin load.

## 2. Copy-paste frontmatter block

For `prototype` (`user-invocable: true` — publicly invocable):
```yaml
---
name: prototype
description: "<Verb-first capabilities>. Use when <triggers/contexts>. Not for: <near-miss exclusions>."
user-invocable: true
argument-hint: "[page name or spec, fidelity: wireframe|styled]"
---
```

For de-triggered skills (`usability`, `data-viz`) and internal workflow skills (`clarify`):
```yaml
---
name: <skill-name>
description: "<Verb-first capabilities>. Use when <triggers/contexts>. Not for: <near-miss exclusions>."
user-invocable: false
disable-model-invocation: true   # omit for clarify (internal, not fully suppressed)
---
```

Rules (from `docs/foundations-standards.md` §1–§2): `name` == directory name; `description` ≤ 1024
chars, third person, no XML tags, capability nouns not process steps, near-miss "Not for:" clause
present. The "Not for:" clause is copied from the skill's taxonomy row — it is the
anti-cannibalization contract.

## 3. SKILL.md body skeleton

```markdown
<one-line statement of the pillar's single concern, with the cite-the-principle posture>

## When this applies
<the trigger contexts in prose; mirror the description's "Use when">

## Rules
<the standing rules — cite-the-principle; stay generative, not a checklist; cite-down only>

## <Procedure / Routing>
<how the skill works through the task; which reference file to load when>

## References
<table: reference file -> load when>
```

Keep the always-relevant core ~200 lines; push catalogs and depth into references.

## 4. Reference-file stub (canonical shape)

Each `skills/<pillar>/references/<file>.md` follows the canonical shape
(`docs/foundations-standards.md` §3):

```markdown
# <Reference title>

<one-line framing of what this file holds>

## Table of Contents
1. [...](#...)            <!-- required: file >100 lines opens with a ToC -->

## <Draw from the 11 canonical sections as the content needs>
<!-- KEY DEFINITIONS · DETECTION CHECKLIST · DESIGN REVIEW CRITERIA · RED FLAGS ·
     IMPLEMENTATION CHECKLIST · DESIGN TRANSFORMATION PATTERNS · CORE PRINCIPLES ·
     THIS VS THAT · DESIGN DECISION TABLE · TECHNIQUE REFERENCE · COMMON MISTAKES -->
```

NEVER add a banned construct (RATIONALIZATION COUNTERS, DECISION GATE, PROBLEM->FIT TABLE,
TRIGGERS, PRODUCES, NEXT CAPABILITY NEEDED, CSO KEYWORDS). Routing belongs in SKILL.md.

## 5. Definition of done

A skill is done when **all** hold (the per-skill eval gate, `docs/foundations-standards.md` §6):

- `validate_skill` = 0 errors / 0 warnings.
- Trigger direction verified: `prototype` fires on-topic and stays quiet on near-misses;
  `usability`/`data-viz`/`clarify` do not appear in the slash menu and do not auto-trigger.
- `run_eval` passes its graded assertions (keystone `usability`; others as budget allows).
- Description ≤ 1024 chars with the near-miss "Not for:" clause.
- Every recommendation in the skill cites its principle; citations point down (never up), no cycle.
- Cross-skill and cross-doctrine links resolve.
