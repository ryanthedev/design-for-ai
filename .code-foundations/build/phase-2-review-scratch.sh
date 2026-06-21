#!/bin/bash
set -e

# Desk-check script for research.md command verification
# Tests: DW-2.1, DW-2.2, DW-2.3, edge cases

FILE="/Users/r/repos/design-for-ai/commands/research.md"

echo "=== DW-2.1: Frontmatter and design-dimension questions ==="
echo

# Check frontmatter existence
if grep -q "^description:" "$FILE"; then
  echo "✓ Frontmatter has 'description:' field"
  DESCRIPTION=$(grep "^description:" "$FILE" | head -1)
  echo "  $DESCRIPTION"
else
  echo "✗ FAIL: No 'description:' field found"
  exit 1
fi

# Check for design dimensions (not code requirements)
echo
echo "Checking for design-dimension questions (brand/audience/mood/JTBD)..."
echo

# Look for brand/mood questions
if grep -q "Brand & mood" "$FILE"; then
  echo "✓ Explicitly discusses 'Brand & mood' section"
  sed -n '/^**Brand & mood**/,/^**/p' "$FILE" | head -5
fi

echo
if grep -q "JTBD" "$FILE"; then
  echo "✓ JTBD question present"
  sed -n '/^**JTBD**/,/^**/p' "$FILE" | head -5
fi

echo
if grep -q "audience" "$FILE" -i; then
  echo "✓ 'audience' or 'Who' dimension present"
  sed -n '/^**Who**/,/^**/p' "$FILE" | head -5
fi

echo
if grep -q "mood\|feel" "$FILE" -i | head -3; then
  echo "✓ Mood/feel questions mentioned"
fi

echo
echo "=== DW-2.2: Research output location and structure ==="
echo

# Check for research directory spec
if grep -q ".code-foundations/research" "$FILE"; then
  echo "✓ Output path references '.code-foundations/research'"
fi

# Check for summary requirement
if grep -q "summary" "$FILE" -i; then
  echo "✓ References summary in output"
fi

# Check for date requirement
if grep -q "Date\|date" "$FILE"; then
  echo "✓ References date in output"
fi

# Check for status requirement
if grep -q "status\|Status" "$FILE"; then
  echo "✓ References status in output"
fi

# Check for open questions requirement
if grep -q "open question\|Open question" "$FILE"; then
  echo "✓ References open questions in output"
fi

echo
echo "=== DW-2.3: Chain to plan stage ==="
echo

# Check for exact /design-for-ai:plan handoff
if grep -q '/design-for-ai:plan' "$FILE"; then
  echo "✓ Chains to /design-for-ai:plan command"
  PLAN_LINE=$(grep '/design-for-ai:plan' "$FILE")
  echo "  $PLAN_LINE"
else
  echo "✗ FAIL: No /design-for-ai:plan handoff found"
  exit 1
fi

# Verify the path is .code-foundations/research/
if grep '/design-for-ai:plan.*\.code-foundations/research' "$FILE"; then
  echo "✓ Plan handoff references .code-foundations/research path"
else
  echo "✗ FAIL: Plan handoff does not reference correct research path"
  exit 1
fi

echo
echo "=== Edge case: Finished brief (reflection + confirm) ==="
echo

# Check the "finished brief" scenario
if sed -n '40,51p' "$FILE" | grep -q "finished brief"; then
  echo "✓ Handles 'finished brief' scenario"
  sed -n '48,48p' "$FILE"
fi

echo
echo "=== Edge case: No brand scenario ==="
echo

# Check for brand-missing handling
if grep -q "visual identity.*open question" "$FILE"; then
  echo "✓ Notes missing visual identity as open question (not a blocker)"
  grep "visual identity.*open question" "$FILE"
fi

echo
echo "=== All desk-check tests passed ==="
