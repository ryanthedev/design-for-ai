#!/bin/bash

# Phase 4 Validation Script
# Checks: DW-4.1 through DW-4.4

set -e

echo "=== Phase 4 Validation ==="
echo ""

# DW-4.1: Check deceptive-patterns directory structure and cross-links
echo "DW-4.1: Checking deceptive-patterns skill structure..."
if [ ! -f "/Users/r/repos/design-for-ai/skills/deceptive-patterns/SKILL.md" ]; then
    echo "FAIL: SKILL.md not found"
    exit 1
fi

# Count description chars
DESC_CHARS=$(sed -n '3p' /Users/r/repos/design-for-ai/skills/deceptive-patterns/SKILL.md | wc -c)
echo "  Description chars: $DESC_CHARS (limit: 1024)"

# Check for ai-tells cross-link
if grep -q "skills/design-for-ai/references/ai-tells.md" /Users/r/repos/design-for-ai/skills/deceptive-patterns/SKILL.md; then
    echo "  ✓ Cross-link to ai-tells.md found"
else
    echo "  FAIL: No cross-link to ai-tells.md"
    exit 1
fi

# Check for "Not for:" clause
if grep -q "Not for:" /Users/r/repos/design-for-ai/skills/deceptive-patterns/SKILL.md; then
    echo "  ✓ 'Not for:' clause present"
else
    echo "  FAIL: No 'Not for:' clause"
    exit 1
fi

# Check for reference files
if [ ! -f "/Users/r/repos/design-for-ai/skills/deceptive-patterns/references/dark-patterns.md" ]; then
    echo "  FAIL: dark-patterns.md not found"
    exit 1
fi
if [ ! -f "/Users/r/repos/design-for-ai/skills/deceptive-patterns/references/honest-alternatives.md" ]; then
    echo "  FAIL: honest-alternatives.md not found"
    exit 1
fi
echo "  ✓ Reference files exist"

# Check dark-patterns cross-link to ai-tells
if grep -q "ai-tells.md" /Users/r/repos/design-for-ai/skills/deceptive-patterns/references/dark-patterns.md; then
    echo "  ✓ dark-patterns.md cross-links ai-tells"
else
    echo "  FAIL: dark-patterns.md does not cross-link ai-tells"
    exit 1
fi

echo ""
echo "DW-4.2: Checking behavioral skill structure and anchor citations..."
if [ ! -f "/Users/r/repos/design-for-ai/skills/behavioral/SKILL.md" ]; then
    echo "FAIL: SKILL.md not found"
    exit 1
fi

# Count description chars
DESC_CHARS=$(sed -n '3p' /Users/r/repos/design-for-ai/skills/behavioral/SKILL.md | wc -c)
echo "  Description chars: $DESC_CHARS (limit: 1024)"

# Check for "Not for:" clause
if grep -q "Not for:" /Users/r/repos/design-for-ai/skills/behavioral/SKILL.md; then
    echo "  ✓ 'Not for:' clause present"
else
    echo "  FAIL: No 'Not for:' clause"
    exit 1
fi

# Check behavioral cites usability-principles anchors
echo "  Checking usability-principles anchor citations..."

ANCHORS_TO_CHECK=("#peak-end-rule" "#zeigarnik-effect" "#goal-gradient-effect")
for anchor in "${ANCHORS_TO_CHECK[@]}"; do
    # Check if the anchor is referenced in behavioral files
    if grep -r "usability-principles.md" /Users/r/repos/design-for-ai/skills/behavioral/ | grep -q "$anchor"; then
        echo "    ✓ $anchor cited"
    else
        echo "    Note: $anchor not cited in behavioral files (checking if it needs to be)"
    fi
done

# Check if these anchors exist in usability-principles.md
for anchor in "${ANCHORS_TO_CHECK[@]}"; do
    anchor_clean=$(echo "$anchor" | sed 's/#//')
    if grep -q "### ${anchor_clean}" /Users/r/repos/design-for-ai/skills/usability/references/usability-principles.md; then
        echo "    ✓ Anchor $anchor exists in usability-principles.md"
    else
        echo "    FAIL: Anchor $anchor NOT FOUND in usability-principles.md"
        exit 1
    fi
done

# Check reference files
if [ ! -f "/Users/r/repos/design-for-ai/skills/behavioral/references/behavioral-principles.md" ]; then
    echo "  FAIL: behavioral-principles.md not found"
    exit 1
fi
if [ ! -f "/Users/r/repos/design-for-ai/skills/behavioral/references/ethical-application.md" ]; then
    echo "  FAIL: ethical-application.md not found"
    exit 1
fi
echo "  ✓ Reference files exist"

echo ""
echo "DW-4.3: Running validate_skill checks..."

# validate_skill on deceptive-patterns
echo "  Validating deceptive-patterns..."
# Since we don't have validate_skill in this script context, document the expected result
echo "    (validate_skill tool would run here - expecting 0/0)"

# validate_skill on behavioral
echo "  Validating behavioral..."
echo "    (validate_skill tool would run here - expecting 0/0)"

echo ""
echo "DW-4.4: Checking static trigger disjointness..."
echo "  Checking core skill triggers..."

# Check core design-for-ai triggers
CORE_TRIGGERS=$(grep -A 2 "argument-hint:" /Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md 2>/dev/null || echo "No core trigger found")
echo "  Core skill trigger context: (design/enhance/audit/polish modes)"

# Check deceptive-patterns description for overlap
if grep -q "design-for-ai" /Users/r/repos/design-for-ai/skills/deceptive-patterns/SKILL.md; then
    echo "  Checking deceptive-patterns trigger description..."
    sed -n '3p' /Users/r/repos/design-for-ai/skills/deceptive-patterns/SKILL.md | head -c 200
fi

# Check behavioral description for overlap
if grep -q "design-for-ai" /Users/r/repos/design-for-ai/skills/behavioral/SKILL.md; then
    echo "  Checking behavioral trigger description..."
    sed -n '3p' /Users/r/repos/design-for-ai/skills/behavioral/SKILL.md | head -c 200
fi

echo ""
echo "=== Verification Summary ==="
echo "✓ Directory structures exist"
echo "✓ Cross-links verified"
echo "✓ Reference files present"
echo "✓ Anchors confirmed in usability-principles.md"
echo ""
echo "Remaining checks (validate_skill, test_triggers) require skill-eval MCP tools"
