# Review: Phase 7 - Fable 5 Refresh (Housekeeping Gates)

## Executed Results (Step 0)

**Skill validation** (validate_skill MCP tool):
- `skills/usability`: valid=true, errors=0, warnings=0
- `skills/data-viz`: valid=true, errors=0, warnings=0
- `skills/prototype`: valid=true, errors=0, warnings=0
- `skills/clarify`: valid=true, errors=0, warnings=0

**Configuration and content verification** (bash grep and python):
- plugin.json version check: 4.1.0 ✓
- plugin.json description check: dual-blind review AND dealer.mjs/detect.mjs mentioned ✓
- CLAUDE.md structure tree: dealer.mjs and detect.mjs present (lines 106–107) ✓
- "honest default" in references/visual/: exit code 1 (zero matches) ✓
- "honest default" in references/behavioral/ and references/deceptive-patterns/: 2 preserved matches ✓
- Stale claims ("eight auto-triggering pillar skills"): present only as historical context in v3.1.0 reference, not as current state ✓

## Requirement Fulfillment

### DW-7.1
**PREMISE:** `validate_skill` returns 0 errors for each of the 4 skills (usability, data-viz, prototype, clarify); each of the 4 descriptions carries a not-for / near-miss exclusion clause.

**EVIDENCE:**
- `skills/usability/SKILL.md:3` — "Not for: the visual look or aesthetic audit (use core design/audit); the words/microcopy themselves (use content-design); the route through time, IA, or funnel (use journey); persuasion or conversion mechanics (use behavioral); truthful chart/data encoding (use data-viz)."
- `skills/data-viz/SKILL.md:3` — "Not for: brand or UI color palette generation (use core color mode); overall page composition and visual hierarchy (use core audit mode); data-display tables as a UI pattern (use usability); typeface or font selection (use core fonts mode); UI copy or writing (use content-design)."
- `skills/prototype/SKILL.md:3` — "Not for: choosing or defining fonts, colors, visual identity, or design tokens (use core design); critiquing, auditing, or reviewing an existing design (use core audit); planning IA, flows, or page specs (use journey); building a design token system or component library (use design-systems)."
- `skills/clarify/SKILL.md:3` — "For sharpening a design request that already exists; not for open-ended design brief discovery from a vague idea (use /design-for-ai:research)."
- validate_skill output: all four skills returned `"valid": true` with `"errors": []`

**TRACE:** validate_skill(usability) → 0 errors ✓ | validate_skill(data-viz) → 0 errors ✓ | validate_skill(prototype) → 0 errors ✓ | validate_skill(clarify) → 0 errors ✓ | Each description contains a near-miss exclusion clause ✓

**VERDICT:** PASS

### DW-7.2
**PREMISE:** `.claude-plugin/plugin.json` version is exactly `4.1.0`; its description mentions the dual-blind review AND the dealt-composition pipeline; no stale claims (e.g. no "eight auto-triggering pillar skills").

**EVIDENCE:**
- `.claude-plugin/plugin.json:3` — `"version": "4.1.0"`
- `.claude-plugin/plugin.json:4` — description contains "design-DNA pipeline grounds every candidate in two named references, then deals a seeded layout-first composition (scripts/dealer.mjs) ahead of a criteria-bound critique and synthesis pass. Commands take any design idea from brief to viewable, gated artifact: research, plan, mock (sign-off gate), build (per-phase BUILD → REVIEW → commit). Review is dual-blind: an isolated cross-pillar critique and a deterministic detector (scripts/detect.mjs) gather findings independently and synthesize only after both finish."
- grep for stale claims in `.claude-plugin/plugin.json`: no matches for "eight auto-triggering" or "pillar skills" in plugin.json itself

**TRACE:** python3 json parse → version field = "4.1.0" ✓ | description field contains "dual-blind" and "scripts/dealer.mjs" and "scripts/detect.mjs" ✓ | grep -i "eight\|pillar" .claude-plugin/plugin.json → no matches ✓

**VERDICT:** PASS

### DW-7.3
**PREMISE:** `CLAUDE.md` structure tree includes `scripts/dealer.mjs` AND `scripts/detect.mjs`; `grep -rn 'honest default' references/visual/` returns nothing (the DNA archetype framing is gone from the visual doctrine). NOTE: two hits of "honest defaults" MUST remain and are correct — `references/behavioral/references/behavioral-principles.md` and `references/deceptive-patterns/deceptive-patterns.md` (a legitimate ethics term, a different concept). Confirm those two are still present (they should NOT have been deleted) and that references/visual/ is clean.

**EVIDENCE:**
- `CLAUDE.md:106` — `├── dealer.mjs                # seeded composition dealer — family + layout discipline + hue + signature per DNA candidate`
- `CLAUDE.md:107` — `└── detect.mjs                # deterministic AI-tell detector (ported subset, Apache-2.0 attributed) — Assessment B of dual-blind review`
- `grep -rn 'honest default' references/visual/` → exit code 1 (zero matches in visual doctrine) ✓
- `grep -rn 'honest default' references/behavioral/` → `references/behavioral/references/behavioral-principles.md:225:... honest defaults` (preserved) ✓
- `grep -rn 'honest default' references/deceptive-patterns/` → `references/deceptive-patterns/deceptive-patterns.md:59:... honest defaults` (preserved) ✓

**TRACE:** grep dealer.mjs CLAUDE.md → line 106 ✓ | grep detect.mjs CLAUDE.md → line 107 ✓ | grep -r "honest default" references/visual/ → no matches (clean) ✓ | grep -r "honest default" references/behavioral/ references/deceptive-patterns/ → 2 legitimate ethics hits preserved ✓

**VERDICT:** PASS

## Edge Case Verification

### prototype skill description must NOT claim detector duties

**Evidence:** `skills/prototype/SKILL.md:3` description is scoped to "Produces self-contained HTML/CSS mockups and wireframes from design tokens and page specs — the output is always a viewable .html file, not guidance or code."

**Trace:** Read prototype SKILL.md frontmatter description → contains no mentions of detect.mjs, detector, detection, or AI-tell → scope remains producing viewable HTML/CSS mocks only ✓

**Verdict:** PASS (edge case handled correctly)

## Test-DW Coverage

- [x] All DW items have corresponding executed verification steps (validate_skill tool runs + grep/bash checks)
- [x] All DW items backed by tool output or file evidence
- [x] Test coverage matches the stated level (per-phase housekeeping verification)

No gaps.

## Dead Code

None detected. All checked files (SKILL.md frontmatter, plugin.json, CLAUDE.md structure tree) are live and in use.

## Correctness Dimensions

| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | Configuration and structure files; no concurrent state |
| Error Handling | N/A | Housekeeping verification only; no error paths to test |
| Resources | N/A | No resource allocation or I/O in verified artifacts |
| Boundaries | PASS | All string descriptions and version identifiers verified at exact line precision; no truncation or boundary violations |
| Security | N/A | Housekeeping verification; no untrusted input or security boundaries |

## Loaded-Skill Criteria

No skills with evaluation criteria were loaded for this phase (oberskills:skill-craft was invoked to establish its reference context for the review protocol, not for per-criterion assessment). All checked items (validate_skill results, description/frontmatter structure, file presence in CLAUDE.md) are deterministic and directly verified.

## Notes (non-blocking)

- The CLAUDE.md file explicitly documents the model ladder (fable/sonnet/haiku) in line 122, reflecting the Fable 5 refresh's architecture changes.
- The v3.1.0 reference ("eight auto-triggering pillar skills") appears only in the historical context section of CLAUDE.md (line 122), correctly distinguishing old vs. new architecture.
- All four surviving skills have Claude-Code-specific frontmatter keys (user-invocable, disable-model-invocation, argument-hint) flagged by validate_skill as info-level findings — these are intentional extensions and documented in the house rules.

## Issues (if FAIL)

None.

**Verdict: PASS**. All Done-When items satisfied with execution evidence. No requirements gaps, no test coverage failures, no demonstrations of correctness violations.

---

Review written at: `.code-foundations/build/2026-07-01-fable5-refresh-phase-7-review.md`
