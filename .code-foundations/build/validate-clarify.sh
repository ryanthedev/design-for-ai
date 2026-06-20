#!/bin/bash

echo "=== Validating skills/clarify against spec ==="

SKILL_DIR="/Users/r/repos/design-for-ai/skills/clarify"

# Check required files
echo "1. Required files:"
if [ -f "$SKILL_DIR/SKILL.md" ]; then
  echo "  ✓ SKILL.md exists"
else
  echo "  ✗ SKILL.md missing"
  exit 1
fi

# Parse frontmatter
echo ""
echo "2. Frontmatter validation:"
if head -10 "$SKILL_DIR/SKILL.md" | grep -q "^---"; then
  echo "  ✓ Frontmatter opening fence found"
else
  echo "  ✗ No frontmatter opening fence"
fi

# Extract and validate name field
NAME=$(grep "^name:" "$SKILL_DIR/SKILL.md" | sed 's/^name: *"//' | sed 's/"$//')
echo "  name: $NAME"
if [ "$NAME" = "clarify" ]; then
  echo "  ✓ name matches directory"
else
  echo "  ✗ name does not match directory"
fi

# Check name format (lowercase, alphanumeric + hyphens, no leading/trailing/consecutive hyphens)
if [[ "$NAME" =~ ^[a-z0-9]([a-z0-9-]*[a-z0-9])?$ ]]; then
  echo "  ✓ name format valid"
else
  echo "  ✗ name format invalid"
fi

# Validate description
DESC=$(sed -n '/^description:/,/^[a-z]/p' "$SKILL_DIR/SKILL.md" | head -1 | sed 's/^description: *//')
DESC_CLEAN=$(echo "$DESC" | sed 's/^"//' | sed 's/"$//')
DESC_LENGTH=${#DESC_CLEAN}
echo "  description length: $DESC_LENGTH chars"
if [ "$DESC_LENGTH" -ge 1 ] && [ "$DESC_LENGTH" -le 1024 ]; then
  echo "  ✓ description within 1-1024 chars"
else
  echo "  ✗ description out of range"
fi

# Check user-invocable field
if grep -q "^user-invocable:" "$SKILL_DIR/SKILL.md"; then
  UI=$(grep "^user-invocable:" "$SKILL_DIR/SKILL.md" | sed 's/^user-invocable: *//')
  echo "  user-invocable: $UI"
  if [ "$UI" = "false" ]; then
    echo "  ✓ user-invocable is false (correct for non-user-triggered skill)"
  fi
fi

# Check for forbidden patterns
echo ""
echo "3. Forbidden patterns:"
if grep -i "anthropic\|claude" "$SKILL_DIR/SKILL.md" | grep -v "^#\|design-for-ai\|Claude Code" > /dev/null; then
  echo "  ⚠ Found 'anthropic' or 'claude' in content (may be OK if not in name)"
else
  echo "  ✓ No forbidden name patterns"
fi

# Check references structure
echo ""
echo "4. References structure:"
if [ -d "$SKILL_DIR/references" ]; then
  echo "  ✓ references/ directory exists"
  COUNT=$(ls -1 "$SKILL_DIR/references"/*.md 2>/dev/null | wc -l)
  echo "    Found $COUNT reference files"
  if [ "$COUNT" -ge 1 ]; then
    echo "  ✓ At least 1 reference file present"
  else
    echo "  ⚠ No reference files found"
  fi
else
  echo "  ✗ references/ directory missing"
fi

# Check SKILL.md structure
echo ""
echo "5. SKILL.md body structure:"
if grep -q "^# Skill:" "$SKILL_DIR/SKILL.md"; then
  echo "  ✓ Has 'Skill:' heading"
else
  echo "  ⚠ No 'Skill:' heading found (but may not be required)"
fi

LINES=$(wc -l < "$SKILL_DIR/SKILL.md")
echo "  Total lines in SKILL.md: $LINES"
if [ "$LINES" -lt 500 ]; then
  echo "  ✓ Under 500 lines"
else
  echo "  ⚠ Over 500 lines (hard limit is 500)"
fi

echo ""
echo "=== Validation complete ==="
