#!/usr/bin/env bash
set -euo pipefail

REPO=/Users/r/repos/design-for-ai
BUILD_AGENT="$REPO/agents/design-build-agent.md"
REVIEW_AGENT="$REPO/agents/design-review-agent.md"
SKILL="$REPO/skills/design-for-ai/SKILL.md"

echo "=== DW-4.4: git diff 1dc8f13 -- skills/design-for-ai/SKILL.md ==="
DIFF_LINES=$(git -C "$REPO" diff 1dc8f13 -- skills/design-for-ai/SKILL.md | wc -l | tr -d ' ')
echo "Diff line count: $DIFF_LINES"
if [ "$DIFF_LINES" -eq 0 ]; then
  echo "PASS: No diff — SKILL.md is at pre-pivot state"
else
  echo "FAIL: SKILL.md differs from commit 1dc8f13 ($DIFF_LINES lines)"
fi

echo ""
echo "=== DW-4.4: check 'make it look good' absent from SKILL.md ==="
if grep -c "make it look good" "$SKILL" 2>/dev/null | grep -q "^0$"; then
  echo "PASS: 'make it look good' not found in SKILL.md"
elif ! grep -q "make it look good" "$SKILL" 2>/dev/null; then
  echo "PASS: 'make it look good' not found in SKILL.md"
else
  echo "FAIL: 'make it look good' present in SKILL.md"
  grep -n "make it look good" "$SKILL"
fi

echo ""
echo "=== DW-4.1 BUILD AGENT CHECKS ==="

echo "--- Baseline discipline: scope latitude ---"
grep -n "Scope Latitude" "$BUILD_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- Baseline discipline: done-when traceability ---"
grep -n "Done-When Traceability" "$BUILD_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- Additional Skills loader ---"
grep -n "## Additional Skills" "$BUILD_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- palette.mjs evidence ---"
grep -n "palette.mjs" "$BUILD_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- contrast evidence ---"
grep -in "contrast" "$BUILD_AGENT" | head -5 && echo "FOUND (sampling)" || echo "MISSING"

echo "--- render/mock evidence ---"
grep -in "render\|mock" "$BUILD_AGENT" | head -5 && echo "FOUND (sampling)" || echo "MISSING"

echo "--- tokens applied evidence ---"
grep -in "tokens applied" "$BUILD_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- 'design execution evidence' phrase ---"
grep -n "design execution evidence" "$BUILD_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- no 'unit test' present (should validate with design evidence, not unit tests) ---"
if grep -qi "unit test" "$BUILD_AGENT"; then
  echo "WARNING: 'unit test' found — may be a problem"
  grep -in "unit test" "$BUILD_AGENT"
else
  echo "PASS: 'unit test' not mentioned — correct"
fi

echo ""
echo "=== DW-4.2 REVIEW AGENT CHECKS ==="

echo "--- independence rule (zero intent framing) ---"
grep -n "Independence rule\|independence rule" "$REVIEW_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- 'do NOT read the build agent' instruction ---"
grep -n "do NOT read the build agent\|Do NOT read the build agent" "$REVIEW_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- execution-first: Step 0 'Execute First' ---"
grep -n "Execute First\|Step 0" "$REVIEW_AGENT" && echo "FOUND" || echo "MISSING"

echo "--- triage -> dispatch -> synthesize ---"
grep -n "Triage\|triage\|dispatch\|synthesize\|Synthesize" "$REVIEW_AGENT" | head -10

echo "--- ONE severity-ranked cross-pillar report ---"
grep -n "ONE\|one.*report\|single.*report\|severity.ranked\|severity-ranked" "$REVIEW_AGENT" | head -5

echo "--- cap + Deferred (named, not silent) ---"
grep -n "[Cc]ap\|[Dd]eferred\|deferred" "$REVIEW_AGENT" | head -10

echo ""
echo "=== DW-4.3 TRIAGE MAP + IMAGE-FIRST RULE ==="

echo "--- surface-signal -> pillar map table rows ---"
grep -n "Charts.*data-viz\|copy.*content-design\|journey\|behavioral\|deceptive" "$REVIEW_AGENT" | head -10

echo "--- 'critique the rendered pixels' or similar image-first rule ---"
grep -n "critique.*pixel\|rendered pixel\|pixels" "$REVIEW_AGENT" | head -10

echo ""
echo "=== DW-4.5 NO-SCREENSHOT GRACEFUL PATH ==="

echo "--- no-screenshot graceful path (not a failure) ---"
grep -n "[Nn]o.screenshot\|no screenshot\|graceful" "$REVIEW_AGENT" | head -10

echo "--- 'note the missing pixel evidence' or similar ---"
grep -n "missing pixel\|coverage gap\|pixel.*gap\|gap" "$REVIEW_AGENT" | head -10

echo ""
echo "=== EDGE CASE: visual-only surface -> baseline only ==="
grep -n "[Vv]isual.only\|baseline only\|no charts\|signal.*absent\|nothing for them" "$REVIEW_AGENT" | head -10

echo ""
echo "=== EDGE CASE: large surface -> cap + name deferred ==="
grep -n "[Ll]arge surface\|cap.*dispatch\|dispatching every\|highest.value\|highest-value\|name.*deferred\|cap the dispatch" "$REVIEW_AGENT" | head -10

echo ""
echo "=== DONE ==="
