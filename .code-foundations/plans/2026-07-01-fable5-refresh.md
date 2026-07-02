# Plan: design-for-ai → Fable 5 refresh (orchestration + doctrine)
**Created:** 2026-07-01
**Status:** in-progress
**Started:** 2026-07-01 23:55
**Current Phase:** 1
**Complexity:** complex
---
## Context
design-for-ai is an orchestration framework (research → plan → mock → build + doctrine library),
and it gets the same two-sided Fable 5 refresh code-foundations is receiving on
`refresh/fable-sonnet-5`: (a) the **orchestration side** — model ladder, effort doctrine,
conversation-first checkpoints, de-prompted gates — mirrored from the proven code-foundations
commits (7b8d974, d8ed1d9, be0926a); and (b) the **doctrine side** — driven by the 2026-07-01
deep web-research run (report: `~/.local/state/web-research/2026-07-01-design-refresh-REPORT.md`,
distilled to grug `design-for-ai/fable5-refresh-research-2026-07`).

The research verdict, verified inline: the skill's premise is now mainstream consensus (Berkeley
MIMS "Convergence Trap"; Anthropic's own "AI slop" cookbook admission), our composition diagnosis
is independently corroborated (Impeccable's 44-rule detector is layout-dominated; taste-skill's
`DESIGN_VARIANCE` is a pure layout dial), and three structural weaknesses hold the skill back:

1. **The review gate can select FOR generic.** arXiv 2604.25929 ("LLMs Generate Kitsch", verified):
   LLM output rates higher with humans while measuring MORE generic — a single-LLM rubric gate
   structurally rewards safe/on-pattern work. The shipped fix is Impeccable's dual-blind critique
   (isolated LLM pass + isolated deterministic detector pass, synthesized only after both finish),
   which also matches our verified Fable 5 finding that fresh-context verifiers beat self-critique.
2. **The design pipeline is a menu pick, not a design process.** Documented expert practice is
   cyclical diverge → criteria-bound critique → SYNTHESIS (combine strongest elements) → loop, with
   reference-gathering BEFORE generation. Our pipeline generates 5 candidates in one pass and asks
   the user to pick one. The one Claude-specific mitigation found: anchor every brief to TWO named
   references ("Linear's typography + Pitchfork's editorial color") to triangulate off the
   statistical center.
3. **The skill is likely too prescriptive for Fable 5.** Official and verbatim: "skills developed
   for prior models are often too prescriptive for Claude Fable 5 and can degrade output quality."
   Fable 5's stronger vision favors fewer/sharper constraints + screenshot-grounded verification
   over ban-list prescription. Corollary finding: tells DECAY (Space Grotesk went
   Anthropic-recommended → community-banned in ~7 months; the cream/serif/terracotta escape-hatch
   is now itself a named tell) — frozen lists harden into inertia, so tells carry review-by dates.

Also new: `ai-tells.md` has ZERO copy/content tells (≈1/5 of Impeccable's catalog is copy tells);
checkable signatures now exist (`#6366F1/#8B5CF6/#A855F7`, 0.1-opacity shadows, unmodified
Tailwind/shadcn tokens as a binary check); and **Claude Design** (Anthropic Labs, 2026-04-17,
research preview) applies a team's design system by reading the codebase and design files — our
DESIGN.md + tokens are exactly its input format, an integration note worth documenting.

**Problem:** The skill's outputs still read generic; its review gate, pipeline shape, and
prescription density are all tuned for pre-Fable models.
**Success:** Doctrine refreshed against verified 2026 findings; orchestration speaks the
Fable/Sonnet 5 ladder; review is dual-blind with a distinctiveness criterion; the DNA pipeline
grounds on dual references and deals composition; a repeatable eval exists to measure whether any
of it actually reduces detected/perceived genericness.

## Constraints
- **HANDOFF prerequisite:** merge `feature/doctrine-overhaul` (complete, 6/6 gates green, v4.0.0)
  into `main` BEFORE build branches. This plan targets the POST-overhaul tree exclusively
  (`references/` doctrine, 4 skills, resolver in `docs/pillar-taxonomy.md`, `scripts/palette.mjs`).
- De-prescription is the bias, not a phase: no phase may ADD all-caps imperative headers, new
  ban-lists, or rule tables where a principle + dated examples suffices (Fable 5 official warning).
- Doctrine dependency graph stays acyclic; `usability` anchors (`#fittss-law`, …) preserved.
- Every tells/red-flag table gains a `Last reviewed:` date; the re-audit convention lands in
  `docs/foundations-standards.md` (frozen lists are the documented failure mode).
- Do NOT touch `website/` (untracked). `.design-foundations/` (runtime) ≠ `.code-foundations/`
  (this meta-workflow).
- Detector code ported from Impeccable (`/Users/r/repos/impeccable`, **Apache-2.0** — LICENSE
  verified 2026-07-01) must satisfy Apache-2.0 obligations: reference the license, retain
  attribution, and state modifications. The plugin stays self-contained (no runtime dependency on
  an external clone).
- Model field values use the new ladder: fable / sonnet / haiku (opus = explicit override only).
- "Zero Slop Zone" is unverified — never cite it in doctrine.

## Chosen Approach
Two workstreams, one plan. Orchestration phases mirror the proven code-foundations diffs (minus
wave-parallel execution — deferred, see Rejected). Doctrine phases apply the research findings in
dependency order: tells first (they feed the detector), pipeline restructure next, then the
composition dealer, then the dual-blind review that consumes both. A final eval phase is the
honesty check the research demanded: no source anywhere has outcome evidence that ANY
anti-generic mitigation works — we build the instrument instead of assuming.

## Rejected Approaches
- **Wave-parallel build execution (code-foundations d8ed1d9):** design phases are gate-serial by
  nature (DESIGN.md gates mocks; mock sign-off gates build) — waves buy little here. Revisit if
  plans grow parallel doctrine-only phases.
- **Runtime integration of the Impeccable CLI:** least-effort but adds an external dependency the
  marketplace install can't satisfy. Port a subset with attribution instead.
- **Skipping the eval phase:** every competitor ships mitigations with zero outcome evidence;
  shipping blind repeats the field's mistake and leaves "hasn't hit the mark" unfalsifiable.
- **Version 5.0.0:** the public surface (commands, 4 skills) keeps its API; dual-blind review and
  the dealer are internal contract changes → 4.1.0.

---
## Implementation Phases

### Phase 1: Orchestration refresh — model ladder, effort, checkpoints, calm gates
**Model:** sonnet
**Skills:** oberskills:prompt
**Gate:** Standard
**File scope:** `commands/{research,plan,mock,build}.md`, `agents/design-build-agent.md`, `agents/design-review-agent.md` (gate-header prose only — review architecture is Phase 6)

**Goal:** Mirror the code-foundations Fable/Sonnet 5 orchestration refresh: model ladder
fable/sonnet/haiku (opus = explicit override only), model resolution fallbacks (fable/opus→sonnet,
sonnet→haiku) in build dispatch, effort doctrine (plan-side high; dispatched build agents
default), conversation-first checkpoints (free-form gates presented as end-turn markdown;
AskUserQuestion reserved for decisive 2–4-option picks — mock sign-off qualifies), and every
STOP/CRITICAL/MANDATORY header converted to a calm structural gate that states its rationale.

**Constraints:** Preserve the BUILD → REVIEW → commit machinery, gate resolution
(Full/Standard/Minimal), worktree isolation, and the review-agent debiasing rule. Reference
diffs: code-foundations 7b8d974 (plan side) and d8ed1d9 (build side, skip wave sections).

**Edge cases:** `mock.md`'s sign-off is a genuine 2-option decision — it KEEPS AskUserQuestion;
`plan.md`'s open-ended clarifications become conversational. A legacy plan file naming `opus`
resolves through the ladder, not an error.

**Depends on:** nothing (entry) | **Unlocks:** Phases 2, 6
**Produces:** commands + agents speaking the Fable/Sonnet 5 ladder with de-prompted gates. Seam =
the Model-field vocabulary (fable/sonnet/haiku) Phases 2–8 and future plans use.
**Rollback:** `git revert` the phase commit.

**Done when:**
- [ ] DW-1.1: `plan.md` documents the fable/sonnet/haiku ladder with opus as explicit override only; `build.md` documents resolution fallbacks (fable/opus→sonnet, sonnet→haiku).
- [ ] DW-1.2: effort doctrine stated: plan-side work high effort, dispatched build agents default effort.
- [ ] DW-1.3: `grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY)' commands/ agents/` returns nothing; every remaining structural gate line states why it exists.
- [ ] DW-1.4: AskUserQuestion appears only at decisive 2–4-option picks (mock sign-off, gate resolution); open-ended checkpoints are end-turn markdown.

**Difficulty:** MEDIUM
**Uncertainty:** Low — mechanical mirror of reviewed, committed diffs.

### Phase 2: De-prescriptify sweep — doctrine + skills for Fable 5
**Model:** sonnet
**Skills:** oberskills:prompt
**Gate:** Standard
**File scope:** `references/**` and `skills/*/SKILL.md` bodies, EXCLUDING files owned by Phases 3–5 (`references/visual/ai-tells.md`, `references/visual/design-dna.md`) and Phase 6 (`agents/`)

**Goal:** Apply the official Fable 5 warning across the doctrine library: shorten exhaustive
ban-lists into principle + a few dated examples, cut over-elaborated instruction blocks, convert
imperative-cap headers to reasoned gates, and lean verification toward Fable 5's stronger vision
(screenshot-grounded checks) instead of prescription.

**Constraints:** De-prescriptify ≠ de-content: named principles, citations, and worked examples
stay. Do not touch the resolver table's name set. Byte-count is not the goal — prescription
density is.

**Edge cases:** `deceptive-patterns` ban-list is ETHICS, not aesthetics — bans stay bans there.
`usability` heuristic tables are evaluation instruments, not prescriptions — keep, but de-cap
their headers.

**Depends on:** Phases 1, 3 | **Unlocks:** Phase 7
**Produces:** doctrine bodies safe for Fable 5 consumption; the de-prescription convention
demonstrated for future authors.
**Rollback:** `git revert` the phase commit.

**Done when:**
- [ ] DW-2.1: `grep -rnE '^#+ *(STOP|CRITICAL|MANDATORY|NEVER)' references/ skills/` returns nothing.
- [ ] DW-2.2: every ban-list-style enumeration remaining in `references/` or `skills/` carries a `Last reviewed:` date — the REVIEW agent enumerates each list found with its date line; any undated list is a finding.
- [ ] DW-2.3: spot-review (3 files sampled by the REVIEW agent) confirms principles/citations/examples survived the trim.

**Difficulty:** MEDIUM
**Uncertainty:** "Prescription density" is judgment — the REVIEW agent arbitrates with the Fable 5 doc's own wording as the criterion.

### Phase 3: Tells catalog refresh — copy tells, checkable signatures, decay dates
**Model:** sonnet
**Skills:** oberskills:prompt
**Gate:** Full
**File scope:** `references/visual/ai-tells.md`, `docs/foundations-standards.md`

**Goal:** Close the two verified gaps in `ai-tells.md`: (a) add a **copy/content tells** section —
em-dash overuse, marketing buzzwords, aphoristic cadence, theater-slop phrases, numbered-section
markers, generic microcopy templates; (b) add **checkable signatures** — the
`#6366F1/#8B5CF6/#A855F7` triplet, 0.1-opacity shadows, unmodified Tailwind/shadcn tokens as a
binary check, the cream/serif/terracotta and dark+acid-green escape-hatch clusters, Space Grotesk
as a tell. Add the **decay doctrine**: escape-hatches become tells within months, every tells
table carries `Last reviewed:`, and the re-audit convention lands in `foundations-standards.md`.
Add the **over-correction guard**: an anti-slop pass that makes every output equally "edgy" is
itself a uniform failure mode — review verifies variance ACROSS outputs, not just deviation from
defaults.

**Constraints:** This file is the detector's source of truth (Phase 6 ports it to code) — each
tell states its check as observable evidence, not vibes. Respect the Phase 2 bias: signatures are
dated examples of a principle, not a new frozen ban-list.

**Edge cases:** A tell that is register-legitimate (glassmorphism in a deliberate luxury register)
— the existing severity model already handles context; keep it.

**Depends on:** Phase 1 | **Unlocks:** Phases 2, 6
**Produces:** the refreshed tells catalog = the rule source Phase 6's detector implements. Seam =
tell names + observable checks.
**Rollback:** `git revert` the phase commit.

**Done when:**
- [ ] DW-3.1: `ai-tells.md` has a copy/content tells section with ≥5 named tells, each with an observable check.
- [ ] DW-3.2: checkable signatures present (hex triplet, shadow opacity, Tailwind/shadcn default check, both escape-hatch clusters, Space Grotesk) with source + date.
- [ ] DW-3.3: every tells table carries `Last reviewed: 2026-07`; `foundations-standards.md` documents the re-audit convention (review-by dates, stale-list failure mode).
- [ ] DW-3.4: the over-correction guard is stated in the tells doctrine (variance across outputs, not uniform edginess).

**Difficulty:** MEDIUM
**Uncertainty:** None significant — content is verified research, curation only.

### Phase 4: Design pipeline restructure — dual-reference grounding, diverge→critique→synthesize
**Model:** fable
**Skills:** oberskills:prompt
**Gate:** Full
**File scope:** `references/visual/design-dna.md` only (verified 2026-07-01: `foundations.md` carries no pipeline hook lines)

**Goal:** Reshape the DNA pipeline from menu-pick to design process: (1) **reference grounding
before generation** — every candidate anchors to TWO named, distinct references whose collision
defines the direction; (2) **critique as its own pass** — criteria-bound (distinctiveness,
register fit, tells scan) over all candidates before any selection; (3) **convergence as
synthesis** — the user (or agent) may combine the strongest elements across candidates, not just
pick one, with one loop-back to a fresh divergent round allowed; (4) **register as a per-moment
dial** — minimal structure + expressive high-emotion moments within one surface, replacing the
global archetype register; (5) demote the "honest default" candidate framing (it is the modal
pick — the distributional center by another name).

**Constraints:** Keep the 5-candidate count and the DESIGN.md gate. Composition/layout stays
hue-independent here — the dealer (Phase 5) supplies it; this phase leaves an explicit
`composition: <dealt>` slot in the DNA schema.

**Edge cases:** A user who wants the fast path — synthesis and loop-back are offered, never
forced; pick-one remains legal. Two named references that are themselves both AI-tells
aesthetics — the critique pass catches it.

**Depends on:** Phase 3 | **Unlocks:** Phase 5
**Produces:** the restructured pipeline with a `composition` slot awaiting the dealer. Seam = the
DNA schema fields Phase 5 fills.
**Rollback:** `git revert` the phase commit.

**Done when:**
- [ ] DW-4.1: each DNA candidate requires two named, distinct references with a stated collision ("X's [quality] + Y's [quality]").
- [ ] DW-4.2: a criteria-bound critique pass over all candidates precedes selection; synthesis-across-candidates and one loop-back are documented options.
- [ ] DW-4.3: register is a per-surface-moment dial in the DNA schema; the global-archetype register framing is gone.
- [ ] DW-4.4: "honest default" framing removed; the DNA schema carries a `composition` slot referencing the dealer.

**Difficulty:** HIGH
**Uncertainty:** Synthesis step UX (how an agent presents combinable elements) — resolve in-phase with a worked example.

### Phase 5: Composition dealer — seeded, layout-first divergence
**Model:** fable
**Skills:** oberskills:prompt (dealer-contract doctrine wording; the script itself is plain code work)
**Gate:** Full
**File scope:** `scripts/dealer.mjs` (new), `scripts/palette.mjs` (hue-walk hook only), `references/visual/design-dna.md` (dealer contract section)

**Goal:** Ship the seeded dealer the 2026-06-23 finding specified, now field-corroborated: move
selection from the model (which drifts to its prior) to a deterministic script. Deal per
candidate: **aesthetic family + composition/layout discipline** (scale, density, symmetry,
hierarchy, ground, dominant element — the axis nothing currently spreads) **+ hue (golden-angle
137.5° walk) + signature element**. Seed = project name + date. Local `used-dna.json` exclusion
set; known AI-tell cells (from Phase 3's catalog) ship as banned cells. Document
`DESIGN_VARIANCE`-compatible semantics (1–10, centered/clean ↔ asymmetric) so the dealt
composition is legible as a dial.

**Constraints:** Deterministic: same seed → same deal. The model's job inverts to
justify-and-execute the dealt hand; doctrine says so explicitly. Honest limit documented: no
shared server → cross-user collisions are rare, not impossible. `palette.mjs` gotcha: exits code
2 on a failed contrast pair but still prints CSS — the dealer must read stdout on nonzero exit.

**Edge cases:** A dealt hand the user rejects — re-deal with seed+1, record both in
`used-dna.json`; a banned-cell adjacency (legal cell one step from an AI-tell cell) is legal.

**Depends on:** Phase 4 | **Unlocks:** Phase 8
**Produces:** `scripts/dealer.mjs` + the dealer contract in doctrine; composition becomes a dealt,
first-class DNA token. Seam = dealer JSON output consumed by the DNA pipeline and Phase 8's eval.
**Rollback:** `git revert`; the Phase 4 pipeline still works with model-chosen composition as fallback.

**Done when:**
- [ ] DW-5.1: `node scripts/dealer.mjs --project test --date 2026-07-01 --candidates 5` exits 0, emits 5 hands (family, composition discipline, hue, signature) as JSON; re-run is byte-identical; seed+1 differs.
- [ ] DW-5.2: composition axis has ≥6 documented disciplines; hue assignment follows the golden-angle walk; `used-dna.json` exclusion works (dealt cells excluded on next run).
- [ ] DW-5.3: AI-tell cells from the Phase 3 catalog are banned cells (verifiable in dealer source + a test deal never emits one).
- [ ] DW-5.4: `design-dna.md` documents the dealer contract: model justifies/executes the dealt hand; re-deal protocol; honest collision limit.

**Difficulty:** HIGH
**Uncertainty:** Cell-space size (families × disciplines) needs enough legal cells that exclusions don't exhaust it — compute and state the count in-phase.

### Phase 6: Dual-blind review — LLM critique + deterministic detector
**Model:** fable
**Skills:** oberskills:prompt, oberskills:agent
**Gate:** Full
**File scope:** `agents/design-review-agent.md`, `scripts/detect.mjs` (new), `commands/mock.md` + `commands/build.md` (review-dispatch lines only)

**Goal:** Restructure review so "safe and inoffensive" cannot pass: **Assessment A** — the
existing fresh-context cross-pillar LLM critique, now with an explicit distinctiveness criterion
in the rubric; **Assessment B** — `scripts/detect.mjs`, a deterministic non-LLM detector ported
as a subset (≥12 rules) of Impeccable's Apache-2.0 catalog with the required attribution
(license reference + statement of modifications): layout tells (nested-cards,
icon-tile-stack, hero-eyebrow-chip, monotonous-spacing, repeated-section-kickers), signature
checks (purple triplet, 0.1 shadows, unmodified Tailwind/shadcn tokens), and ≥4 copy tells from
Phase 3. A and B run isolated — neither sees the other's output — and synthesize only after both
finish. A skipped detector is a failed review run.

**Constraints:** Preserve the review-agent's independence/debiasing, severity-ranked single
report, and PASS/FAIL contract — dual-blind changes how findings are gathered, not how they're
reported. Detector reads rendered HTML/CSS (the `prototype` output), no browser dependency
required for the core rules.

**Edge cases:** Mock phase with no rendered HTML yet (research/plan artifacts) — detector is
N/A, not skipped-failed; a detector hit that Assessment A justified by register — synthesis
resolves with the severity model, detector evidence quoted.

**Depends on:** Phases 1, 3 | **Unlocks:** Phase 8
**Produces:** the dual-blind review architecture + `detect.mjs` (also Phase 8's instrument). Seam
= detector JSON findings format.
**Rollback:** `git revert`; single-assessment review agent is restored.

**Done when:**
- [ ] DW-6.1: `design-review-agent.md` documents A/B isolation (neither sees the other pre-synthesis) and "skipped detector = failed run" (with the no-artifact N/A carve-out).
- [ ] DW-6.2: rubric contains a distinctiveness criterion — on-pattern safety alone cannot yield PASS.
- [ ] DW-6.3: `node scripts/detect.mjs <html-file>` exits 0 with JSON findings; ≥12 rules incl. ≥4 copy tells; Apache-2.0 attribution to Impeccable in the file header (license reference + modification statement); a known-sloppy fixture triggers ≥3 rules, a clean fixture triggers 0.
- [ ] DW-6.4: `mock.md`/`build.md` review dispatch invokes both assessments.

**Difficulty:** HIGH
**Uncertainty:** Which 12+ rules are portable without a browser — chosen in-phase from Impeccable's `cli/engine/rules/checks.mjs` (static-analyzable subset).

### Phase 7: Descriptions, housekeeping, validation
**Model:** sonnet
**Skills:** oberskills:skill-craft
**Gate:** Standard
**File scope:** `skills/{usability,data-viz,prototype,clarify}/SKILL.md` frontmatter, `.claude-plugin/plugin.json`, `CLAUDE.md`, `docs/*` cross-references

**Goal:** Finish the sweep the way code-foundations did (be0926a, 17a39c4): near-miss "Not for X
(use Y)" exclusion clauses on the 4 surviving skills' descriptions; `validate_skill` clean on all
4; plugin.json → **4.1.0** with a description that reflects the refreshed system; CLAUDE.md
matches on-disk reality (dealer, detector, dual-blind review, new pipeline); docs cross-references
repaired.

**Constraints:** Descriptions obey the ≤1024-char rule (`foundations-standards.md`). Version
4.1.0 sits on top of the overhaul's 4.0.0 — confirm the merge landed before bumping.

**Edge cases:** `prototype`'s description must not absorb detector duties (detect.mjs is review
infrastructure, not a skill).

**Depends on:** Phases 2, 4, 5, 6 | **Unlocks:** Phase 8
**Produces:** consistent public surface at v4.1.0.
**Rollback:** `git revert` the phase commit.

**Done when:**
- [ ] DW-7.1: `validate_skill` returns 0 errors for each of the 4 skills; each description carries a not-for/near-miss clause.
- [ ] DW-7.2: plugin.json = 4.1.0; description mentions dual-blind review and the dealt-composition pipeline; no stale claims.
- [ ] DW-7.3: CLAUDE.md structure tree includes `scripts/dealer.mjs`, `scripts/detect.mjs`; `grep -rn 'honest default' references/ skills/ commands/ agents/ docs/ CLAUDE.md` returns nothing.

**Difficulty:** LOW
**Uncertainty:** None significant.

### Phase 8: Eval — fingerprint Fable 5 defaults, measure the mitigations
**Model:** fable
**Skills:** oberskills:skill-craft (eval harness; the skill-eval MCP tools are reached through it)
**Gate:** Full
**File scope:** `skills/design-for-ai-workspace/` (eval workspace, gitignored), grug `design-for-ai/` (results memory), `references/visual/ai-tells.md` (fingerprint addendum only)

**Goal:** Build the outcome instrument the entire field lacks. (1) **Fingerprint Fable 5:**
generate N≥6 unprompted UI mocks (no skill loaded) and run `detect.mjs` over them — document
which tells Fable 5's defaults actually exhibit (nobody knows; the cookbook was benchmarked on
sonnet-4-6) as a dated addendum to `ai-tells.md`. (2) **A/B the pipeline:** same 2–3 briefs
through the OLD pipeline (pre-refresh git ref) and the refreshed one (dealer + dual-reference
grounding); score both arms with `detect.mjs` (rule hits) and blind `compare_outputs`
(fresh-context judge on distinctiveness). Success = refreshed arm has fewer detector hits AND is
judged more distinctive; a null result is a REPORTED result and re-opens Phase 4/5 assumptions.

**Constraints:** Judge is fresh-context (never the generating session). Old-arm generation uses
the pre-refresh git ref, not memory of it. Record cost; cap runs within skill-eval budget limits.

**Edge cases:** Detector hits drop but judged distinctiveness doesn't (kitsch effect at the
execution layer) — report as partial confirmation of the counter-evidence, feed Phase 4's
critique criteria.

**Depends on:** Phases 5, 6, 7 | **Unlocks:** (final)
**Produces:** Fable 5 default-tells fingerprint (dated, in doctrine) + the first outcome
measurement of anti-generic mitigations + grug memory of both.
**Rollback:** N/A (measurement only).

**Done when:**
- [ ] DW-8.1: fingerprint addendum in `ai-tells.md`: N≥6 unprompted Fable 5 outputs, detector-scored, dated, with the top default tells named.
- [ ] DW-8.2: A/B complete: both arms scored by detect.mjs + blind compare_outputs; results (including a null) written to grug `design-for-ai/`.
- [ ] DW-8.3: verdict stated against the success criterion; if null/partial, the affected assumption rows below are updated and follow-up filed.

**Difficulty:** MEDIUM
**Uncertainty:** HIGH by design — this phase exists because the outcome is genuinely unknown.

---
## Test Coverage
**Level:** Per-phase verification (markdown/structure plugin + two new scripts; "tests" are grep
sweeps, `validate_skill`, script smoke runs with fixtures, and the Phase 8 eval harness).

## Test Plan
- [ ] T1 (P1): DW-1.1–1.4 greps clean; ladder + fallbacks documented; AskUserQuestion sites enumerated.
- [ ] T2 (P2): DW-2.1 grep clean repo-wide (refs+skills); REVIEW spot-sample confirms content survived.
- [ ] T3 (P3): copy-tells section ≥5 entries with observable checks; `grep -n 'Last reviewed' references/visual/ai-tells.md` ≥1 per table; re-audit convention present in foundations-standards.md.
- [ ] T4 (P4): DNA schema shows two-reference fields, critique pass, synthesis + loop-back, per-moment register, `composition` slot; "honest default" gone.
- [ ] T5 (P5): dealer determinism (same seed byte-identical; seed+1 differs); exclusion + banned-cell tests; cell-space count stated. **Dirty:** exhausted cell space → dealer errors with a clear message, not a repeat deal.
- [ ] T6 (P6): detect.mjs fixture pair (sloppy ≥3 hits / clean 0); A/B isolation language present; dispatch sites updated. **Dirty:** missing artifact → N/A path, not failure.
- [ ] T7 (P7): validate_skill 4×0 errors; version 4.1.0; CLAUDE.md tree matches `find` output.
- [ ] T8 (P8): both arms generated from correct git refs; judge context isolation verifiable in transcripts; results memory written.

---
## Assumptions
| Assumption | Confidence | Verify Before Phase | Fallback If Wrong |
|---|---|---|---|
| `feature/doctrine-overhaul` merges to main cleanly before build | HIGH (branch complete, gates green) | HANDOFF | Rebase this plan's file scopes onto whatever tree exists |
| Impeccable's Apache-2.0 license permits subset port with attribution | HIGH (LICENSE read 2026-07-01: Apache-2.0; port must reference license + state modifications) | P6 | Write rules from scratch against Phase 3's catalog (same source of truth) |
| A static (no-browser) detector subset ≥12 rules is portable | MEDIUM (~46 check functions in `cli/engine/rules/checks.mjs`, incl. static/DOM variant pairs; static share unconfirmed) | P6 | Accept fewer static rules + add browser-based checks via the existing mcp-browser connection |
| code-foundations refresh diffs (7b8d974, d8ed1d9, be0926a) are final | MEDIUM (their verify phase still running at plan time) | P1 | Re-diff against `refresh/fable-sonnet-5` HEAD at build time and mirror the final shape |
| Seeded composition dealing reduces detected/perceived genericness | LOW (zero outcome evidence anywhere — the research's central gap) | P8 measures it | Report null honestly; pivot to reference-grounding + critique as primary mechanism |
| Fable 5's default tells overlap the documented catalog | MEDIUM (Claude Design "inherits the slop fingerprint", single source) | P8 fingerprint | Extend catalog + detector with what the fingerprint actually finds |
| De-prescription improves (not degrades) doctrine adherence on Fable 5 | MEDIUM (official guidance, verbatim, but design-skill extrapolation is inference) | P8 A/B partially covers | Restore targeted prescription where the eval shows regression |

## Decision Log
| Decision | Alternatives Considered | Rationale | Phase |
|---|---|---|---|
| Target post-overhaul tree; merge is a HANDOFF prerequisite | fold refresh into overhaul branch; refresh old tree | Overhaul is complete + gated; two plans stay reviewable | all |
| Port detector subset into `scripts/detect.mjs` (Apache-2.0 attribution) | invoke Impeccable CLI at runtime | Plugin must be self-contained for marketplace installs | P6 |
| Single `File scope:` field per phase (no Scope IN/OUT + File hints) | exemplar's `Scope:`/`File hints:` shape | The refreshed code-foundations plan format requires `File scope` (feeds wave derivation, 7b8d974); one field serves both roles | all |
| Dual-blind A/B review (Impeccable pattern) | single-LLM rubric + more criteria | Kitsch paper: LLM judges can reward generic; deterministic channel is uncorrelated | P6 |
| Dealer as deterministic script, model executes the hand | model self-diversifies via prompting | Models sample the distributional center — verified locally + by Anthropic's own admission | P5 |
| Two named references per candidate, before generation | mood-board step only; no grounding | Only Claude-specific mitigation found; matches designer practice (references precede sketching) | P4 |
| Defer wave-parallel execution | mirror code-foundations waves now | Design phases are gate-serial; low payoff, high orchestration churn | — |
| Version 4.1.0 | 5.0.0 | Public API (commands, 4 skills) unchanged; review/dealer are internal contracts | P7 |
| Ship Phase 8 eval in-plan | ship mitigations, eval later | "No outcome evidence" is the field's shared failure; unfalsifiable ≠ fixed | P8 |

---
## Notes
- Research artifacts: full report `~/.local/state/web-research/2026-07-01-design-refresh-REPORT.md`
  (+ 7 dimension files, same prefix); grug `design-for-ai/fable5-refresh-research-2026-07`.
  Verified inline: Berkeley MIMS study, arXiv 2604.25929, taste-skill dials, Claude Design launch
  (TechCrunch + anthropic.com), Anthropic cookbook + Fable 5 page (prior direct fetches),
  Impeccable claims (local reads).
- Claude Design integration note (document in CLAUDE.md at P7, no build work): Claude Design
  applies a team's design system by reading the codebase and design files — a locked DESIGN.md +
  token file is exactly its input format. Producing Claude-Design-consumable artifacts is a free
  side effect of the existing gates; say so.
- The code-foundations session (`code-foundations:0` in mux, branch `refresh/fable-sonnet-5`) is
  the orchestration-side reference implementation; if it lands further verify-phase fixes, check
  its final diffs before executing Phase 1.
- Tells decay is now doctrine: this plan's own signature list (purple triplet, Space Grotesk…)
  carries `Last reviewed: 2026-07` and is expected to rot — the convention, not the list, is the
  deliverable.
---
## Execution Log
_To be filled during /code-foundations:build_
