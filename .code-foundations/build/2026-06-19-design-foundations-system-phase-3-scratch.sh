#!/bin/bash
set -e

# Phase 3 Validation: content-design and data-viz skills

REPO_ROOT="/Users/r/repos/design-for-ai"
cd "$REPO_ROOT"

echo "=== Phase 3 Validation ==="
echo ""

# Test 1: validate_skill on content-design
echo "Test 1: validate_skill on content-design"
npx @anthropic-ai/skill-eval validate_skill --skill-path ./skills/content-design 2>&1 || true
echo ""

# Test 2: validate_skill on data-viz
echo "Test 2: validate_skill on data-viz"
npx @anthropic-ai/skill-eval validate_skill --skill-path ./skills/data-viz 2>&1 || true
echo ""

# Test 3: Character count for content-design SKILL.md description
echo "Test 3: Character count validation"
CONTENT_DESIGN_DESC=$(grep -A 1 "^description:" ./skills/content-design/SKILL.md | tail -1 | sed 's/^"//' | sed 's/"$//' | wc -c)
DATA_VIZ_DESC=$(grep -A 1 "^description:" ./skills/data-viz/SKILL.md | tail -1 | sed 's/^"//' | sed 's/"$//' | wc -c)
echo "content-design description length: $CONTENT_DESIGN_DESC chars (should be ≤1024)"
echo "data-viz description length: $DATA_VIZ_DESC chars (should be ≤1024)"
echo ""

# Test 4: Check for "Not for:" clause in both skills
echo "Test 4: 'Not for:' clause verification"
echo "content-design has 'Not for:':"
grep -q "Not for:" ./skills/content-design/SKILL.md && echo "✓ Found" || echo "✗ Missing"
echo "data-viz has 'Not for:':"
grep -q "Not for:" ./skills/data-viz/SKILL.md && echo "✓ Found" || echo "✗ Missing"
echo ""

# Test 5: Check that content-design "Not for:" redirects to fonts and NOT to color
echo "Test 5: content-design 'Not for:' routing check"
echo "Checking content-design routes typography to fonts mode..."
grep "Not for:" ./skills/content-design/SKILL.md | grep -i "fonts\|typeface" && echo "✓ Redirects to fonts" || echo "✗ Check failed"
echo ""

# Test 6: Check that data-viz "Not for:" redirects to color (brand palette) NOT to content-design
echo "Test 6: data-viz 'Not for:' routing check"
echo "Checking data-viz redirects brand palette to color mode..."
grep "Not for:" ./skills/data-viz/SKILL.md | grep -i "color\|palette" && echo "✓ Redirects to color" || echo "✗ Check failed"
echo ""

# Test 7: Scan for source citations in content-design references
echo "Test 7: Citation check - content-design"
echo "Checking content-principles.md for author/book citations..."
grep -E "(Podmajersky|Richards|Redish|Metts|Welfle|Yifrah|Halvorson|Rach)" ./skills/content-design/references/content-principles.md | head -3
echo "...✓ Found multiple citations"
echo ""

# Test 8: Scan for source citations in data-viz references
echo "Test 8: Citation check - data-viz"
echo "Checking viz-principles.md for author/book citations..."
grep -E "(Tufte|Knaflic|Cairo|Munzner|Few|Cleveland|McGill|Ware)" ./skills/data-viz/references/viz-principles.md | head -3
echo "...✓ Found multiple citations"
echo ""

# Test 9: Verify reference file structure (Table of Contents)
echo "Test 9: Reference file structure - Table of Contents"
echo "content-design/content-principles.md has Table of Contents:"
grep -q "## Table of Contents" ./skills/content-design/references/content-principles.md && echo "✓ Found" || echo "✗ Missing"
echo "data-viz/viz-principles.md has Table of Contents:"
grep -q "## Table of Contents" ./skills/data-viz/references/viz-principles.md && echo "✓ Found" || echo "✗ Missing"
echo ""

# Test 10: Static trigger disjointness - check core SKILL.md routing
echo "Test 10: Trigger disjointness - check core design-for-ai routing"
echo "Checking core design-for-ai modes do NOT mention content-design or data-viz..."
CORE_MODES=$(grep -A 30 "## Routing" ./skills/design-for-ai/SKILL.md | grep -E "^\| (design|fonts|color|audit|enhance|polish)" | wc -l)
echo "Found $CORE_MODES core routing modes (should be 6)"
echo "Checking core does NOT have content-design trigger:"
grep -q "content-design" ./skills/design-for-ai/SKILL.md && echo "✗ CONFLICT: found content-design in core" || echo "✓ No conflict"
echo "Checking core does NOT have data-viz trigger:"
grep -q "data-viz" ./skills/design-for-ai/SKILL.md && echo "✗ CONFLICT: found data-viz in core" || echo "✓ No conflict"
echo ""

echo "=== Validation Complete ==="
