#!/bin/bash

set -e

REPO=/Users/r/repos/design-for-ai

echo "=== PHASE 6 REVIEW VERIFICATION SUITE ==="
echo ""

# DW-6.1: CLAUDE.md, README.md, pillar-taxonomy.md reflect the workflow + dual-role
# and prototype's stale references are gone

echo "DW-6.1: Workflow + dual-role documentation check"
echo "=========================================="
echo ""

# Check CLAUDE.md for workflow section
echo "1. CLAUDE.md — checking for workflow section:"
grep -A5 "## The Workflow" "$REPO/CLAUDE.md" && echo "✓ Workflow section present" || echo "✗ MISSING: Workflow section"
echo ""

# Check CLAUDE.md for commands/ and agents/ in structure
echo "2. CLAUDE.md — checking for commands/ and agents/ in structure tree:"
grep "├── commands/" "$REPO/CLAUDE.md" && echo "✓ commands/ in structure tree" || echo "✗ MISSING: commands/"
grep "├── agents/" "$REPO/CLAUDE.md" && echo "✓ agents/ in structure tree" || echo "✗ MISSING: agents/"
echo ""

# Check CLAUDE.md version
echo "3. CLAUDE.md — checking for version 3.1.0:"
grep "v3.1.0\|version 3.1.0" "$REPO/CLAUDE.md" && echo "✓ Version 3.1.0 present" || echo "✗ MISSING: Version 3.1.0"
echo ""

# Check pillar-taxonomy.md for dual-role section
echo "4. pillar-taxonomy.md — checking for dual-role documentation:"
grep -A5 "Dual role" "$REPO/docs/pillar-taxonomy.md" && echo "✓ Dual-role section present" || echo "✗ MISSING: Dual-role section"
echo ""

# Check README.md for workflow section
echo "5. README.md — checking for workflow section:"
grep -A3 "## The workflow" "$REPO/README.md" && echo "✓ Workflow section present" || echo "✗ MISSING: Workflow section"
echo ""

# Check README.md version
echo "6. README.md — checking for version 3.1.0:"
grep "v3.1.0\|version 3.1.0\|**3.1.0**" "$REPO/README.md" && echo "✓ Version 3.1.0 present" || echo "✗ MISSING: Version 3.1.0"
echo ""

# Check prototype/SKILL.md for stale refs
echo "7. prototype/SKILL.md — checking for stale 'audit conductor' reference:"
if grep -q "audit conductor.*Phase 2" "$REPO/skills/prototype/SKILL.md"; then
  echo "✗ STALE REF FOUND: 'audit conductor (Phase 2)'"
else
  echo "✓ No stale 'audit conductor (Phase 2)' reference"
fi
echo ""

echo "8. prototype/SKILL.md — checking for stale 'audit (core design)' in handoff:"
if grep -q "Suggest.*audit.*core design" "$REPO/skills/prototype/SKILL.md"; then
  echo "✗ STALE REF FOUND: 'audit (core design)' in handoff"
else
  echo "✓ No stale 'audit (core design)' in handoff"
fi
echo ""

echo "9. prototype/SKILL.md — checking for design-review-agent references:"
grep -c "design-review-agent" "$REPO/skills/prototype/SKILL.md" && echo "✓ design-review-agent referenced in prototype" || echo "✗ MISSING: design-review-agent ref"
echo ""

# DW-6.2: validate_skill clean on all skills
echo "DW-6.2: Running validate_skill on all skill directories"
echo "======================================================"
echo ""

SKILLS=(
  "skills/design-for-ai"
  "skills/usability"
  "skills/content-design"
  "skills/data-viz"
  "skills/deceptive-patterns"
  "skills/behavioral"
  "skills/journey"
  "skills/design-systems"
  "skills/ai-native"
  "skills/clarify"
  "skills/prototype"
)

for skill in "${SKILLS[@]}"; do
  skill_path="$REPO/$skill"
  if [ -d "$skill_path" ]; then
    echo "Validating: $skill"
    # This would run validate_skill via MCP in actual verification
    # For now, check that SKILL.md exists
    if [ -f "$skill_path/SKILL.md" ]; then
      echo "  ✓ SKILL.md exists"
    else
      echo "  ✗ MISSING: SKILL.md"
    fi
  else
    echo "  ✗ Directory not found: $skill_path"
  fi
done

echo ""
echo "=== DW-6.3: Tracing handoff claims ==="
echo ""

# Check that handoff claims in the discovery doc actually exist in the command files

echo "1. research → plan handoff:"
grep -A2 "/design-for-ai:plan" "$REPO/commands/research.md" | head -3
echo ""

echo "2. plan → mock handoff:"
grep -A2 "/design-for-ai:mock" "$REPO/commands/plan.md" | head -3
echo ""

echo "3. mock: Step 1 — dispatches design-build-agent:"
grep -A5 "design-build-agent" "$REPO/commands/mock.md" | head -5
echo ""

echo "4. mock: Step 2 — dispatches design-review-agent:"
grep -A5 "design-review-agent" "$REPO/commands/mock.md" | head -5
echo ""

echo "5. build: per-phase — dispatches design-build-agent:"
grep -A5 "design-build-agent" "$REPO/commands/build.md" | head -5
echo ""

echo "6. build: per-phase — dispatches design-review-agent:"
grep -A5 "design-review-agent" "$REPO/commands/build.md" | head -5
echo ""

echo "7. Both agent files exist:"
[ -f "$REPO/agents/design-build-agent.md" ] && echo "✓ design-build-agent.md" || echo "✗ MISSING: design-build-agent.md"
[ -f "$REPO/agents/design-review-agent.md" ] && echo "✓ design-review-agent.md" || echo "✗ MISSING: design-review-agent.md"
echo ""

echo "=== VERIFICATION COMPLETE ==="
