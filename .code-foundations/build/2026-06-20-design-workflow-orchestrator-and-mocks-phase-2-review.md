# Review: Phase 2 — Design Research Command

## Executed Results (Step 0)

Artifact type: markdown command file (not a skill directory, so `validate_skill` does not apply).

Verification method: desk-checked file content against requirements using grep, string matching, and line-level tracing.

- Frontmatter validity: grep confirms `description:` field present and valid
- Design-dimension questions: grep confirms all required dimensions (brand, audience, mood, JTBD, device) present
- Output specification: grep confirms `.code-foundations/research/` path and required metadata fields
- Plan handoff: grep confirms exact `/design-for-ai:plan` command syntax
- Edge-case handling: file content confirms both edge cases explicitly addressed

## Requirement Fulfillment

### DW-2.1

**PREMISE:** commands/research.md exists with valid frontmatter (a `description:` field), and its facilitation flow is re-grounded for DESIGN — it asks about brand/audience/mood/JTBD (design dimensions), not code requirements.

**EVIDENCE:** `/Users/r/repos/design-for-ai/commands/research.md:2, 55–72`

**TRACE:** 
- Line 2: Frontmatter contains `description:` field with design-dimension summary: "purpose, audience, brand feel, JTBD, device constraints, and mood references"
- Lines 55–72: "Progressive Narrowing" section explicitly structures the facilitation questions into design dimensions:
  - **What** (lines 59–60): purpose, feel, function
  - **Who** (line 61): users, device, context, stakeholders
  - **Brand & mood** (line 63): visual identity, feel, tone words
  - **JTBD** (line 65): job story, before/after, frustration
  - **Device + constraints** (line 67): surface, platform, timeline
  - **References** (line 69): competitive/mood references
- Lines 42–50 show starting strategies that redirect vague inputs (redesign requests, problems, moods) toward design dimensions — no code requirements language anywhere

**VERDICT:** PASS

### DW-2.2

**PREMISE:** It instructs writing a research doc to .code-foundations/research/ with a summary + date/status + open questions at the top.

**EVIDENCE:** `/Users/r/repos/design-for-ai/commands/research.md:106–129`

**TRACE:**
- Lines 106–112: "Saving" section specifies directory creation and file path pattern: `.code-foundations/research/YYYY-MM-DD-<project-slug>.md`
- Lines 124–129: Required top-level metadata explicitly listed:
  - "One-sentence summary of what this is"
  - "Date and status (draft / confirmed)"
  - "Open questions (anything that needs resolution in planning or the design DNA step)"
- Lines 116–122: Guidance that document format is flexible ("whatever the brief demands") but always includes the above metadata

**VERDICT:** PASS

### DW-2.3

**PREMISE:** It chains to the plan stage, naming the exact `/design-for-ai:plan <doc>` handoff.

**EVIDENCE:** `/Users/r/repos/design-for-ai/commands/research.md:133–141`

**TRACE:**
- Lines 133–139: "What Comes Next" section
- Line 138: Exact command string: `/design-for-ai:plan .code-foundations/research/<file>.md`
- Line 141: Explanation of handoff semantics: "The plan command reads this doc as its seed — it doesn't re-derive intent, it decomposes it into phases"

**VERDICT:** PASS

## Edge-Case Handling

### Edge Case 1: User arrives with a finished brief

**PREMISE:** The flow says to reflect + confirm, not re-interview from scratch.

**EVIDENCE:** `/Users/r/repos/design-for-ai/commands/research.md:42–50`

**TRACE:**
- Line 48 (in "Starting" section's user-input routing table): "A finished brief | Reflect it back as a structured summary and confirm — don't re-interview"
- This is the first move when a finished brief arrives, preventing re-interviewing

**VERDICT:** PASS

### Edge Case 2: User has no existing brand

**PREMISE:** The flow notes it as an open question (deferred to plan/Design), rather than blocking.

**EVIDENCE:** `/Users/r/repos/design-for-ai/commands/research.md:63, 129`

**TRACE:**
- Line 63: "If there's no existing brand, note it as an open question for the plan's design DNA step"
- Line 129: "If the user has no existing brand, list 'visual identity / design DNA' as an open question — the core `design` mode resolves this during planning"
- Both passages explicitly defer the gap and identify the resolution point (plan/design DNA mode), avoiding blocking the research phase

**VERDICT:** PASS

## Dead Code

No unused imports, unreachable code, debug statements, or commented-out blocks found. The file is a markdown command body; all prose is active instruction. **None found.**

## Correctness Dimensions

| Dimension | Status | Evidence |
|-----------|--------|----------|
| Concurrency | N/A | Command is synchronous facilitation; no shared state, async, or background tasks. |
| Error Handling | N/A | User input is text in a live conversation; no I/O, external calls, parsing, or invalid states requiring error handling. Facilitation degrades gracefully (user can iterate). |
| Resources | N/A | No file handles, connections, locks, caches, or threads. File write at the end is a one-time save with no resource management complexity. |
| Boundaries | PASS | Collection boundaries clear: "at the top" (line 125) specifies metadata fields; "open questions" is a list (line 128). String handling: all instructions are prose guidance, no boundary parsing. Numeric boundaries: N/A. |
| Security | N/A | Input is user's own design brief; no untrusted external data, injection vectors, or privilege escalation. File write to `.code-foundations/` is user-owned directory. |

## Notes (non-blocking)

1. **Prompt excellence:** The facilitation style (lines 14–24) applies oberskills:prompt principles well — short turns, opinions, energy matching, rhythm variation. No over-prompting with "MUST" language; conversational tone is appropriate for real-time interaction.

2. **Skill-craft conformance:** While this is a command file (not a skill directory), the artifact embodies skill-craft principles: reusable procedure, standing instructions, domain knowledge, and clear gates (stopping conditions at lines 97–102).

3. **Design dimensions coverage:** All six design-dimension categories (What, Who, Brand & mood, JTBD, Device + constraints, References) are present and appropriately ordered for progressive narrowing. The framework is flexible ("don't need to cover all of these," line 71) rather than prescriptive.

4. **Output format flexibility:** Lines 116–122 correctly avoid forcing a single template; different brief types (brand brief, product brief, surface spec) are acknowledged. This aligns with the principle that "document format is whatever the brief demands."

5. **Handoff clarity:** The plan command handoff (lines 135–141) is explicit and explains the relationship (reads as seed, decomposes intent). The research command does not attempt to plan; clean boundary respected.

## Verdict

**PASS**

All three Done-When requirements met with execution evidence. Both edge cases explicitly handled and not blocked. No defects in correctness dimensions. Command is well-designed, prompt-principled, and correctly chains to the next stage.

---

**Submission path:** `/Users/r/repos/design-for-ai/commands/research.md`  
**Verification method:** Desk-checked file content (lines quoted in TRACE sections)  
**Test coverage level:** Per-artifact (no automated test suite for markdown command files; verification by exact string and line-level matching)
