#!/bin/bash

set -e

# Structural and frontmatter verification for Phase 1 review

echo "=== Phase 1 Review Structural Checks ==="

# DW-1.1: Check skills/clarify exists
echo ""
echo "DW-1.1: skills/clarify directory and files"
if [ -d "/Users/r/repos/design-for-ai/skills/clarify" ]; then
  echo "✓ skills/clarify/ exists"
  if [ -f "/Users/r/repos/design-for-ai/skills/clarify/SKILL.md" ]; then
    echo "✓ SKILL.md exists"
  fi
  if [ -d "/Users/r/repos/design-for-ai/skills/clarify/references" ]; then
    echo "✓ references/ directory exists"
    if [ -f "/Users/r/repos/design-for-ai/skills/clarify/references/adaptive-questioning.md" ]; then
      echo "✓ adaptive-questioning.md exists"
    fi
  fi
else
  echo "✗ skills/clarify/ NOT found"
fi

# Check description character count in SKILL.md
echo ""
echo "DW-1.1: Description character count"
SKILL_DESC=$(grep -A1 "^description:" /Users/r/repos/design-for-ai/skills/clarify/SKILL.md | tail -1 | sed 's/^description: "//' | sed 's/"$//')
DESC_LENGTH=${#SKILL_DESC}
echo "Description length: $DESC_LENGTH characters"
if [ "$DESC_LENGTH" -le 1024 ]; then
  echo "✓ Description is ≤1024 chars"
else
  echo "✗ Description exceeds 1024 chars"
fi

# DW-1.2: Check commands/ directory and frontmatter
echo ""
echo "DW-1.2: commands/ directory with frontmatter-valid stubs"
if [ -d "/Users/r/repos/design-for-ai/commands" ]; then
  echo "✓ commands/ exists"

  # Check each command file
  for cmd in research plan mock build; do
    echo ""
    echo "  Checking commands/${cmd}.md"
    if [ -f "/Users/r/repos/design-for-ai/commands/${cmd}.md" ]; then
      echo "  ✓ File exists"

      # Extract description frontmatter
      if head -20 "/Users/r/repos/design-for-ai/commands/${cmd}.md" | grep -q "^description:"; then
        echo "  ✓ Has description: field in frontmatter"
        DESC=$(head -20 "/Users/r/repos/design-for-ai/commands/${cmd}.md" | grep "^description:" | head -1)
        echo "    $DESC"
      else
        echo "  ✗ Missing description: field in frontmatter"
      fi
    else
      echo "  ✗ File NOT found"
    fi
  done
else
  echo "✗ commands/ directory NOT found"
fi

# DW-1.3: Check workflow-conventions.md
echo ""
echo "DW-1.3: docs/workflow-conventions.md required sections"
if [ -f "/Users/r/repos/design-for-ai/docs/workflow-conventions.md" ]; then
  echo "✓ workflow-conventions.md exists"

  # Check for required sections
  if grep -q "## 1. The four-stage lifecycle" /Users/r/repos/design-for-ai/docs/workflow-conventions.md; then
    echo "✓ Contains: The four-stage lifecycle (research→plan→mock→build)"
  fi

  if grep -q "## 2. Artifact gates" /Users/r/repos/design-for-ai/docs/workflow-conventions.md; then
    echo "✓ Contains: Artifact gates (DESIGN.md/JOURNEY.md)"
  fi

  if grep -q "## 3. Design done-when vocabulary" /Users/r/repos/design-for-ai/docs/workflow-conventions.md; then
    echo "✓ Contains: Design done-when vocabulary (contrast/token/heuristic)"
  fi
else
  echo "✗ workflow-conventions.md NOT found"
fi

# DW-1.4: Check plugin.json version and name
echo ""
echo "DW-1.4: plugin.json version and name"
if [ -f "/Users/r/repos/design-for-ai/.claude-plugin/plugin.json" ]; then
  echo "✓ plugin.json exists"

  VERSION=$(grep '"version"' /Users/r/repos/design-for-ai/.claude-plugin/plugin.json | head -1 | grep -o '"[^"]*"' | tail -1 | tr -d '"')
  echo "  Version: $VERSION"
  if [ "$VERSION" = "3.1.0" ]; then
    echo "  ✓ Version is 3.1.0"
  else
    echo "  ✗ Version is NOT 3.1.0"
  fi

  NAME=$(grep '"name"' /Users/r/repos/design-for-ai/.claude-plugin/plugin.json | head -1 | grep -o '"[^"]*"' | tail -1 | tr -d '"')
  echo "  Name: $NAME"
  if [ "$NAME" = "design-for-ai" ]; then
    echo "  ✓ Plugin name is still 'design-for-ai'"
  else
    echo "  ✗ Plugin name changed from 'design-for-ai'"
  fi

  # Check description mentions workflow
  PLUGIN_DESC=$(grep '"description"' /Users/r/repos/design-for-ai/.claude-plugin/plugin.json | head -1)
  if echo "$PLUGIN_DESC" | grep -q "workflow"; then
    echo "  ✓ Plugin description mentions the workflow"
  else
    echo "  ✗ Plugin description does NOT mention the workflow"
  fi
else
  echo "✗ plugin.json NOT found"
fi

echo ""
echo "=== Structural checks complete ==="
