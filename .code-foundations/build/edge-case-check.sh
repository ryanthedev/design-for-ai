#!/bin/bash

echo "=== Edge Case: clarify vs design-for-ai non-duplication ==="

CLARIFY_SKILL="/Users/r/repos/design-for-ai/skills/clarify/SKILL.md"
CORE_SKILL="/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md"

echo "1. Checking clarify's stated purpose:"
echo ""
grep -A2 "Non-Duplication Note" "$CLARIFY_SKILL" | head -5

echo ""
echo "2. Checking core skill's routing logic:"
echo ""
grep -A30 "## Routing" "$CORE_SKILL" | head -35

echo ""
echo "3. Clarify fault-type classification vs Core skill mode routing:"
echo ""
echo "  Clarify handles: design brief ambiguity (what design to make)"
echo "  Core handles: mode selection (which mode to run)"
echo ""
if grep -q "design brief ambiguity" "$CLARIFY_SKILL"; then
  echo "  ✓ clarify explicitly states it handles 'design brief ambiguity'"
fi

if grep -q "intent detection" "$CLARIFY_SKILL"; then
  echo "  ✓ clarify references core's intent detection"
fi

echo ""
echo "=== Edge case verification complete ==="
