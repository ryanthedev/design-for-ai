# Discovery + Design: Phase 6 - AI-native skill + system integration

## Files Found

- `skills/` contains the core (`design-for-ai/`) + 7 pillars: usability, content-design,
  data-viz, deceptive-patterns, behavioral, journey, design-systems. **ai-native is absent** —
  this phase creates it.
- `.claude-plugin/plugin.json` — at v2.2.0, description still single-skill mode-list framed.
- `CLAUDE.md` (project) — mode table (6 modes, stale; surface added but table says 6) + structure
  tree that predates the pillar skills. Needs the 8-pillar + docs/ update.
- `README.md` — "One command, six modes" framing; single-skill; no pillar mention; v at install.
- `docs/foundations-standards.md`, `docs/skill-authoring-template.md`, `docs/pillar-taxonomy.md` —
  the Phase-1 contract. ai-native is row 8 in the taxonomy; its scope + "Not for" clause are
  already specified there. I conform to them.
- No marketplace file exists in this repo (`find` for `*marketplace*` returns nothing; the README
  references the external `ryanthedev/rtd-claude-inn` marketplace). **Do NOT fabricate one** (plan
  explicit). Marketplace/version surface to update = README install block + plugin.json.

## Current State

- 7 pillars validate 0/0 (per execution log). Descriptions: usability 936, content-design 827,
  data-viz 849, deceptive-patterns 982, behavioral 947, journey 996, design-systems 1012 chars —
  all ≤1024. Core design-for-ai = **1023/1024** (the ceiling — to be relieved this phase).
- Cross-skill seams already wired: core SKILL.md "Pillar skills" table lists all 8 (ai-native
  row already references the not-yet-existing skill — so creating it resolves a forward link);
  audit mode dispatches usability; journey/behavioral cite usability anchors; deceptive-patterns
  twins ai-tells. Citation is cite-down (pillars → usability/core), no back-edges.
- Deferred from earlier phases (resolve here): (a) positive-recall misses + audit-phrasing
  trigger competition (deceptive-patterns vs core `audit` on "audit/review"); behavioral/
  content-design/data-viz had deferred optimize_description tuning. (b) core at 1023/1024 with the
  Phase-0 "looks wrong... review it" miss — now relievable since pillars carry their own keywords.

## Gaps

| Gap | Resolution |
|-----|-----------|
| ai-native skill does not exist | Author skills/ai-native/ (SKILL.md + 2 references) from the design-pillar-landscape "AI BREAKS THE FRAMEWORKS" counter |
| plugin.json at v2.2.0, single-skill description | Bump → 3.0.0; rewrite description to the multi-skill system; add ai-native keyword |
| CLAUDE.md mode table + structure tree stale | Rewrite both to reflect 8 pillars + docs/ conventions |
| README single-skill framing | Add a "design-foundations system" pillar section; keep install/version current |
| Trigger cannibalization unproven across all 8 | Comprehensive test_triggers sweep; optimize_description where it fails |
| Core description at the ceiling + Phase-0 miss | Trim redundant pillar keywords (now owned by pillar skills); re-add "looks wrong" |

## Code Standards

No `docs/code-standards.md` (this is a markdown-skill plugin, not a code project). The governing
conventions are `docs/foundations-standards.md` + `docs/skill-authoring-template.md` +
`docs/pillar-taxonomy.md` — I follow those: frontmatter shape (§1), ≤1024 desc with "Not for:"
clause (§2), canonical reference shape with ToC + no banned constructs (§3), cite-the-principle
(§4), cite-down acyclic (§5), per-skill eval gate (§6).

## Test Infrastructure

The skill-eval MCP harness IS the test suite for this markdown plugin (plan Test Coverage):
`validate_skill` (0 err/0 warn), `test_triggers` (positive fires + near-miss quiet), and
`run_eval` (with vs without) on the usability keystone. Per the authoring template's definition of
done. No code unit tests exist or are appropriate.

## DW Verification

| DW-ID | Done-When Item | Status | Test Cases |
|-------|---------------|--------|------------|
| DW-6.1 | skills/ai-native/ authored with explicit "no settled canon" framing | COVERED | validate_skill ai-native = 0/0; manual check that SKILL.md Rules + a caveats reference state "no settled canon / principle-derived, not book-canonical"; test_triggers ai-native fires on agent-UX/generative-UI queries |
| DW-6.2 | plugin.json registers all skills (or confirms auto-discovery); version 3.0.0; marketplace/README updated | COVERED | Read plugin.json shows version 3.0.0 + multi-skill description; confirm auto-discovery is the mechanism (per foundations-standards §intro — no `skills` array, like code-foundations); README pillar section + install reflect the system |
| DW-6.2a | all 8 pillar descriptions independently ≤1024; each its own discoverable dir | COVERED | char-count table over all 8 skills/<pillar>/SKILL.md ≤1024; `ls skills/` shows 8 pillar dirs each with SKILL.md |
| DW-6.3 | cross-skill refs (usability↔journey↔ethics↔behavioral↔core) resolve; graph acyclic | COVERED | grep cross-skill references resolve to existing files/anchors; ca-architecture-boundaries DAG check — citation points down to usability, no cycle (ai-native → usability only) |
| DW-6.4 | validate_skill = 0/0 across EVERY skill (core + 8 pillars) | COVERED | validate_skill on all 9 dirs → 0 errors/0 warnings each |
| DW-6.5 | comprehensive test_triggers shows no cannibalization; run_eval on usability passes (or documented fallback) | COVERED | cross-skill test_triggers set spanning all 8 pillars + core boundary cases → positives fire on owner only, no cannibalization; run_eval usability with vs without if budget allows, else documented test_triggers-only fallback (plan assumption fallback) |
| DW-6.6 | CLAUDE.md (skill table + tree) and README/install updated | COVERED | Read CLAUDE.md shows 8-pillar table + structure tree with skills/ + docs/; README shows pillar section |

**All items COVERED:** YES (DW count = 7, matches dispatch prompt: DW-6.1, 6.2, 6.2a, 6.3, 6.4, 6.5, 6.6)

## Design Decisions

**ai-native skill structure** (mirrors the journey skill, the most recent pillar, per the
authoring template):

- `SKILL.md`: ~150-line body. One-line concern statement → "When this applies" → "Rules" (where
  the **no settled canon** flag lives, prominent and repeated) → "Procedure" (the
  AI-breaks-the-frameworks diagnostic: which classical pillar strains, what to substitute) →
  "References" table.
- Two references (canonical shape, ToC, no banned constructs):
  - `references/ai-native-principles.md` — the constructive layer: the four framework-strains
    (no fixed screens → journey strains; no stable affordances → interaction strains; no stable
    content → content design strains; autonomous decisions → ethics breaks open), agent-UX
    principles (Dibia, Wilson *Age of Invisible Machines*, Smashing "Designing for AI Beyond
    Conversational"), generative/non-deterministic UI patterns, conversational/agentic UX.
  - `references/ai-native-caveats.md` — the honest-citation layer: the **no settled canon**
    warning in depth (these are 🔵 emerging, principle-derived; web sources + practitioner essays,
    NOT a book canon like the other pillars); where conventional operability still applies (cite
    down to usability); over-claim guard.

**Citation direction (ca-architecture-boundaries / DAG):** ai-native is a leaf — it cites *down*
to `usability` (where conventional screen operability still applies inside an agent UI) and
references core `design`/`surface` as redirect targets in its "Not for" clause. It is cited by
nothing. Adding it preserves the acyclic graph with usability as the sink. SRP: ai-native's single
actor/concern = agent/LLM-interface design; disjoint from all 7 siblings per the taxonomy row.

**Description** (from taxonomy row 8 + skill-craft formula): verb-first capabilities (agent UX,
generative UI, no-fixed-screen interfaces, the framework-strain diagnostic, the no-settled-canon
flag) + "Use when" (agent UX, AX, LLM interface design, chat/agentic UI, generative UI, designing
for AI, no-fixed-screen UI) + "Not for:" (conventional screen-UI operability → usability; visual
look → core design; conversational *voice* surface device-class → core surface). Must be disjoint
from all others and ≤1024.

**Core description relief (the Phase-0 fix):** the core carries redundant pillar keywords now owned
by separate skills (e.g. it need not claim every pillar term). Trim to regain margin, then re-add
"looks wrong"/"feels off" framing to fix the Phase-0 miss — without re-introducing cannibalization
(measured by the comprehensive sweep). Apply via optimize_description if hand-trim misfires.

**Trigger competition resolution:** the deferred audit-phrasing collision (deceptive-patterns vs
core audit on "audit/review") + positive-recall misses are resolved by the comprehensive sweep:
run test_triggers across a cross-skill query set; where a positive misses or a near-miss
cannibalizes, run optimize_description (train/holdout, one iter/call) on that skill's description
until both directions pass, staying ≤1024 with the "Not for:" clause intact.

## Prerequisites

- [x] Required files exist (7 pillars + core + docs + plugin.json + CLAUDE.md + README)
- [x] grug source material readable (design-pillar-landscape-research, AI-breaks-frameworks counter)
- [x] skill-eval MCP tools available (validate_skill, test_triggers, optimize_description, run_eval)
- [x] No marketplace file in repo (confirmed — do not fabricate)

## Recommendation

**BUILD.** All inputs present; ai-native scope is pinned in the taxonomy; the integration seams
exist and need verification + the documented description relief. No UPDATE_PLAN/BLOCKED conditions.
