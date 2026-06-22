# Pillar skill-authoring template

The reusable procedure Phases 2–6 follow to author each pillar skill. It operationalizes
`docs/foundations-standards.md` (the rules) and `docs/pillar-taxonomy.md` (the per-pillar scope). Author
*through* `oberskills:skill-craft` best practices — baseline-first, measure don't guess — not
just `validate_skill` after the fact.

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

- [ ] **Scope.** Read the pillar's row in `docs/pillar-taxonomy.md`: its concern (SRP), its "fires on"
      triggers, its "not for X (use Y)" exclusions, and which pillars it may cite (cite-down only).
- [ ] **Source.** Read the backing grug research for this pillar (named in the taxonomy row).
      Pull the principles/laws/patterns the skill will cite. Cite-the-principle on every claim.
- [ ] **Baseline evals.** Author ≥3 evals (`evals.json`); run `run_eval` with
      `configurations: ["without_skill"]` to document what Claude misses without the skill.
- [ ] **Stub the surface.** Create `skills/<pillar>/SKILL.md` with frontmatter (§2) + the body
      skeleton (§3), and empty `references/<file>.md` stubs (§4). Wire routing in SKILL.md only.
- [ ] **Author.** Fill the body and references from the research. SKILL.md body < 500 lines;
      depth goes in references. Apply the dependency direction (cite usability down, never up).
- [ ] **Validate.** `validate_skill skills/<pillar>` → 0 errors / 0 warnings. Fix all warnings.
- [ ] **Trigger-test.** `test_triggers` — positive queries fire it; near-miss queries (the
      "not for" set) do NOT. If it misfires, `optimize_description` until both directions pass.
- [ ] **Keystone eval (usability only, exercised Phase 6).** `run_eval` with-skill vs
      without-skill; with-skill beats baseline on the graded assertions.
- [ ] **Cross-refs.** If the pillar cites a sibling (e.g. journey → usability laws,
      deceptive-patterns → ai-tells), make the link resolve and point the correct direction.
- [ ] **Register the skill** (Phase 6 integration): confirm it is discovered from `skills/` and,
      if a manifest `skills` array is later introduced, add the entry there.

## 2. Copy-paste frontmatter block

```yaml
---
name: <pillar-name>
description: "<Verb-first capabilities>. Use when <triggers/contexts>. Not for: <near-miss exclusions — the sibling pillars / core modes that share keywords>."
user-invocable: true
argument-hint: "[context]"
---
```

Rules (from `docs/foundations-standards.md` §1–§2): `name` == directory name; `description` ≤ 1024
chars, third person, no XML tags, capability nouns not process steps, near-miss "Not for:" clause
present. The "Not for:" clause is copied from the pillar's taxonomy row — it is the
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

A pillar skill is done when **all** hold (the per-skill eval gate, `docs/foundations-standards.md` §6):

- `validate_skill` = 0 errors / 0 warnings.
- `test_triggers` passes both directions (fires on-topic; quiet on near-miss / no cannibalization).
- `run_eval` passes its graded assertions (keystone `usability`; others as budget allows).
- Description ≤ 1024 chars with the near-miss "Not for:" clause.
- Every recommendation in the skill cites its principle; citations point down (never up), no cycle.
- Cross-skill links resolve.
