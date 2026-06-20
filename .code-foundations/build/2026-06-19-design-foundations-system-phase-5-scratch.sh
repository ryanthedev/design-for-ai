#!/bin/bash
set -e

REPO_ROOT="/Users/r/repos/design-for-ai"
echo "=== Phase 5 Validation Suite ==="
echo ""

# DW-5.1 & 5.3: Validate journey skill
echo "--- DW-5.1 & DW-5.3: Validate skills/journey ---"
cd "$REPO_ROOT"
echo "Running: mcp__plugin_oberskills_skill-eval__validate_skill --skill-path skills/journey"
mcp__plugin_oberskills_skill-eval__validate_skill --skill-path skills/journey
echo ""

# DW-5.2 & 5.3: Validate design-systems skill
echo "--- DW-5.2 & DW-5.3: Validate skills/design-systems ---"
echo "Running: mcp__plugin_oberskills_skill-eval__validate_skill --skill-path skills/design-systems"
mcp__plugin_oberskills_skill-eval__validate_skill --skill-path skills/design-systems
echo ""

# DW-5.1 Edge case: Check for JOURNEY.md template in references
echo "--- DW-5.1 Edge case: JOURNEY.md template presence ---"
echo "Grepping journey references for JOURNEY.md template..."
if grep -r "JOURNEY.md" "$REPO_ROOT/skills/journey/references/" 2>/dev/null | head -5; then
    echo "✓ JOURNEY.md template found in references"
else
    echo "✗ JOURNEY.md template NOT found in references"
fi
echo ""

# DW-5.1 Edge case: Check Hick/Fitts/Miller citations
echo "--- DW-5.1 Edge case: Usability law citations (Hick/Fitts/Miller) ---"
echo "Grepping journey references for Hick/Fitts/Miller..."
if grep -ri "Hick\|Fitts\|Miller" "$REPO_ROOT/skills/journey/references/" 2>/dev/null | head -10; then
    echo "✓ Usability law citations found"
else
    echo "✗ Usability law citations NOT found"
fi
echo ""

# DW-5.2 Edge case: Check design-systems references palette.mjs and DESIGN.md
echo "--- DW-5.2 Edge case: design-systems references to DESIGN.md + palette.mjs ---"
echo "Grepping design-systems references for DESIGN.md..."
if grep -r "DESIGN.md\|palette.mjs" "$REPO_ROOT/skills/design-systems/references/" 2>/dev/null | head -10; then
    echo "✓ DESIGN.md/palette.mjs references found"
else
    echo "✗ DESIGN.md/palette.mjs references NOT found"
fi
echo ""

# DW-5.4 Edge case: Description character count
echo "--- DW-5.4 Edge case: Description length validation (≤1024 chars) ---"
echo "Checking journey SKILL.md description..."
JOURNEY_DESC_LEN=$(grep -A 500 "^description:" "$REPO_ROOT/skills/journey/SKILL.md" | grep -m1 -A 100 "^description:" | head -20 | wc -c)
echo "Journey description approx length: $JOURNEY_DESC_LEN chars"

echo "Checking design-systems SKILL.md description..."
DS_DESC_LEN=$(grep -A 500 "^description:" "$REPO_ROOT/skills/design-systems/SKILL.md" | grep -m1 -A 100 "^description:" | head -20 | wc -c)
echo "Design-systems description approx length: $DS_DESC_LEN chars"
echo ""

# DW-5.4 Static disjointness: Read core design routing
echo "--- DW-5.4 Static disjointness: Core design skill routing ---"
echo "Checking core design-for-ai SKILL.md routing logic..."
if [ -f "$REPO_ROOT/skills/design-for-ai/SKILL.md" ]; then
    grep -A 3 -i "journey\|flow\|time" "$REPO_ROOT/skills/design-for-ai/SKILL.md" | head -10
else
    echo "✗ Core design-for-ai/SKILL.md not found"
fi
echo ""

echo "=== Validation Complete ==="
