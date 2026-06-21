#!/bin/bash

# Phase 1 Verification Suite for prototype skill
# Tests: validate_skill, description char count, mock-recipe structure, sample-mock self-containment

set -e

PROJECT_ROOT="/Users/r/repos/design-for-ai"
SKILL_PATH="$PROJECT_ROOT/skills/prototype"
BUILD_DIR="$PROJECT_ROOT/.code-foundations/build"

echo "=== Step 1: validate_skill on $SKILL_PATH ==="
# Run the MCP tool via command to validate the skill
# Note: validate_skill is a MCP tool; assuming skill-eval server is running
# We'll test via a script that exercises the structure checks
echo "Checking skill structure..."

if [ ! -f "$SKILL_PATH/SKILL.md" ]; then
  echo "FAIL: SKILL.md missing"
  exit 1
fi

if [ ! -d "$SKILL_PATH/references" ]; then
  echo "FAIL: references/ directory missing"
  exit 1
fi

if [ ! -f "$SKILL_PATH/references/mock-recipe.md" ]; then
  echo "FAIL: references/mock-recipe.md missing"
  exit 1
fi

if [ ! -f "$SKILL_PATH/examples/sample-DESIGN.md" ]; then
  echo "FAIL: examples/sample-DESIGN.md missing"
  exit 1
fi

if [ ! -f "$SKILL_PATH/examples/sample-mock.html" ]; then
  echo "FAIL: examples/sample-mock.html missing"
  exit 1
fi

echo "PASS: All core files present"

echo ""
echo "=== Step 2: SKILL.md description char count ==="
# Extract description from SKILL.md frontmatter
DESCRIPTION=$(sed -n 's/^description: "\(.*\)"$/\1/p' "$SKILL_PATH/SKILL.md")
CHAR_COUNT=${#DESCRIPTION}
echo "Description length: $CHAR_COUNT chars"
if [ "$CHAR_COUNT" -le 1024 ]; then
  echo "PASS: Description within 1024 char limit"
else
  echo "FAIL: Description exceeds 1024 chars (got $CHAR_COUNT)"
  exit 1
fi

echo ""
echo "=== Step 3: Check for 'Not for:' clause in description ==="
if echo "$DESCRIPTION" | grep -q "Not for:"; then
  echo "PASS: 'Not for:' clause present in description"
else
  echo "FAIL: 'Not for:' clause missing from description"
  exit 1
fi

echo ""
echo "=== Step 4: mock-recipe.md structure ==="
echo "Checking for Table of Contents..."
if grep -q "## Table of Contents" "$SKILL_PATH/references/mock-recipe.md"; then
  echo "PASS: ToC present"
else
  echo "FAIL: ToC missing"
  exit 1
fi

echo "Checking for WIREFRAME FIDELITY section..."
if grep -q "## WIREFRAME FIDELITY" "$SKILL_PATH/references/mock-recipe.md"; then
  echo "PASS: Wireframe section present"
else
  echo "FAIL: Wireframe section missing"
  exit 1
fi

echo "Checking for STYLED (HIGH-FI) FIDELITY section..."
if grep -q "## STYLED (HIGH-FI) FIDELITY" "$SKILL_PATH/references/mock-recipe.md"; then
  echo "PASS: Styled section present"
else
  echo "FAIL: Styled section missing"
  exit 1
fi

echo "Checking for SURFACE CONSTRAINTS section..."
if grep -q "## SURFACE CONSTRAINTS" "$SKILL_PATH/references/mock-recipe.md"; then
  echo "PASS: Surface constraints section present"
else
  echo "FAIL: Surface constraints section missing"
  exit 1
fi

echo ""
echo "=== Step 5: sample-mock.html self-containment checks ==="

echo "Checking for DOCTYPE and <html>..."
if grep -q "<!DOCTYPE html>" "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: DOCTYPE present"
else
  echo "FAIL: DOCTYPE missing"
  exit 1
fi

echo "Checking for inline <style> block..."
if grep -q "<style>" "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: Inline <style> present"
else
  echo "FAIL: No inline <style> found"
  exit 1
fi

echo "Checking for CSS custom properties (:root)..."
if grep -q ":root {" "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: :root CSS custom properties present"
else
  echo "FAIL: No :root CSS custom properties found"
  exit 1
fi

echo "Checking for prefers-reduced-motion block..."
if grep -q "@media (prefers-reduced-motion: reduce)" "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: prefers-reduced-motion @media block present"
else
  echo "FAIL: prefers-reduced-motion block missing"
  exit 1
fi

echo "Checking for no external <script> imports..."
if grep -E '<script[^>]*src="https?://' "$SKILL_PATH/examples/sample-mock.html"; then
  echo "FAIL: External script imports found (non-self-contained)"
  exit 1
else
  echo "PASS: No external script imports"
fi

echo "Checking for semantic HTML..."
if grep -qE '<(header|main|nav|section|article|aside|footer)' "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: Semantic HTML elements present"
else
  echo "FAIL: No semantic HTML found"
  exit 1
fi

echo "Checking for optional webfont link (allowed)..."
if grep -q 'link.*fonts.googleapis.com\|fonts.bunny.net' "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: Webfont link (optional) present"
elif grep -q 'link.*rel="stylesheet"' "$SKILL_PATH/examples/sample-mock.html"; then
  echo "FAIL: Non-webfont external stylesheet import found"
  exit 1
else
  echo "PASS: No external stylesheet imports (or only webfont, which is allowed)"
fi

echo ""
echo "=== Step 6: sample-DESIGN.md tokens match sample-mock.html ==="
echo "Checking critical token presence..."
# Check for critical tokens as var references
if grep -q "var(--neutral-1)" "$SKILL_PATH/examples/sample-mock.html" && \
   grep -q "var(--accent-9)" "$SKILL_PATH/examples/sample-mock.html" && \
   grep -q "var(--text)" "$SKILL_PATH/examples/sample-mock.html"; then
  echo "PASS: Critical tokens present in mock"
else
  echo "FAIL: Critical tokens missing from mock"
  exit 1
fi

echo ""
echo "=== Step 7: SKILL.md render protocol check ==="
echo "Checking for browser-MCP render guidance..."
if grep -q "browser_connect\|browser_navigate\|browser_screenshot" "$SKILL_PATH/SKILL.md"; then
  echo "PASS: Browser MCP render calls documented"
else
  echo "FAIL: Browser MCP render guidance missing"
  exit 1
fi

echo "Checking for graceful fallback (no MCP error handling)..."
if grep -q "graceful fallback\|browser MCP is not connected\|emit the .html\|not connected" "$SKILL_PATH/SKILL.md"; then
  echo "PASS: Graceful fallback for missing browser MCP documented"
else
  echo "FAIL: No graceful fallback documented for missing browser MCP"
  exit 1
fi

echo ""
echo "=== Step 8: Static trigger-disjointness check ==="
echo "Checking SKILL.md description against surface exclusions..."

# Extract the full description (it's a single-line quoted string in line 3)
FULL_DESC=$(sed -n '3p' "$SKILL_PATH/SKILL.md")

# Check that it claims the right surface ("produce a viewable mock/wireframe/prototype")
if echo "$FULL_DESC" | grep -qE 'mockup|wireframe|prototype|viewable|render'; then
  echo "PASS: Description claims prototype/mock surface"
else
  echo "FAIL: Description doesn't claim the prototype surface"
  echo "DEBUG: $FULL_DESC" >&2
  exit 1
fi

# Check that "Not for:" clause excludes the right surfaces
if echo "$FULL_DESC" | grep -q "Not for:"; then
  echo "PASS: 'Not for:' clause present"
  # Verify it excludes the core surfaces
  if echo "$FULL_DESC" | grep -q "core design\|core audit\|journey"; then
    echo "PASS: 'Not for:' clause correctly redirects to other surfaces"
  else
    echo "NOTE: 'Not for:' clause present but redirects could be more explicit"
  fi
else
  echo "FAIL: 'Not for:' clause missing"
  exit 1
fi

echo ""
echo "=== ALL CHECKS PASSED ==="
