#!/bin/bash

echo "=== Detailed Non-Duplication Verification ==="

CLARIFY_SKILL="/Users/r/repos/design-for-ai/skills/clarify/SKILL.md"
CORE_SKILL="/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md"

echo "1. Does clarify reproduce the core's mode routing?"
echo ""

# Check if clarify has a routing table like the core
if grep -q "design.*surface.*fonts.*color" "$CLARIFY_SKILL"; then
  echo "  WARNING: clarify appears to have a routing table listing modes"
  grep -i "mode\|routing" "$CLARIFY_SKILL" | head -10
else
  echo "  ✓ clarify does NOT have a mode routing table"
fi

echo ""
echo "2. Does clarify duplicate the core's intent-detection logic?"
echo ""

# The core detects: "design", "surface", "fonts", "color", "audit", "enhance", "polish"
# Does clarify do this?
CLARIFY_INTENT=$(grep -c "design\|surface\|fonts\|color\|audit\|enhance\|polish" "$CLARIFY_SKILL")

echo "  Mentions of design modes in clarify: (checking methodology)"
if grep -q "Classifying What's Unclear" "$CLARIFY_SKILL"; then
  echo "  ✓ clarify's core responsibility is classifying GAPS, not routing modes"
fi

if grep -q "Fault Types" "$CLARIFY_SKILL"; then
  echo "  ✓ clarify defines fault types (Intention/Premise/Parameter/Expression)"
fi

if grep -q "Generating Questions" "$CLARIFY_SKILL"; then
  echo "  ✓ clarify's main output is questions, not mode routing"
fi

echo ""
echo "3. Explicit boundary statement:"
echo ""
grep -A5 "Non-Duplication Note" "$CLARIFY_SKILL" | grep -E "design brief ambiguity|intent detection"

echo ""
echo "4. Is clarify invoked BY the core, or independently?"
grep -q "clarify" "$CORE_SKILL" && echo "  ✓ Core skill may invoke clarify (correct flow)" || echo "  ⚠ Core skill does not mention clarify"

echo ""
echo "=== Duplication check complete ==="
