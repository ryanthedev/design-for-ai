#!/usr/bin/env bash
# Phase 3 review scratch script for commands/plan.md
# All paths absolute; file is /Users/r/repos/design-for-ai/commands/plan.md

FILE="/Users/r/repos/design-for-ai/commands/plan.md"
TAXONOMY="/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md"

echo "============================================================"
echo "STEP 0: File existence check"
echo "============================================================"
ls -lh "$FILE" && echo "FILE EXISTS" || echo "FILE MISSING"

echo ""
echo "============================================================"
echo "DW-3.1: Flow sequence — classify → clarify → confirmed problem statement → decompose → detail → save → present"
echo "============================================================"
echo "--- Checking for Quick Classification section ---"
grep -n "Quick Classification\|classify\|Complexity" "$FILE" | head -20

echo ""
echo "--- Checking for Clarify step ---"
grep -n "Clarify\|clarify" "$FILE" | head -20

echo ""
echo "--- Checking for Problem Statement / confirmed ---"
grep -n "Problem statement\|confirmed\|problem statement" "$FILE" | head -20

echo ""
echo "--- Checking for Decompose step ---"
grep -n "Decompose\|DECOMPOSE\|decompose" "$FILE" | head -20

echo ""
echo "--- Checking for Detail step ---"
grep -n "Detail\|DETAIL\|detail" "$FILE" | head -20

echo ""
echo "--- Checking for Save step ---"
grep -n "Save\|SAVE\|save.*plan\|Finalize\|FINALIZE" "$FILE" | head -20

echo ""
echo "--- Checking for Present step ---"
grep -n "Present\|PRESENT\|present" "$FILE" | head -20

echo ""
echo "============================================================"
echo "DW-3.2: Stages map to Discover/Design lifecycle; each phase carries **Skills:** field; design done-when vocab"
echo "============================================================"
echo "--- Discover/Design stage references ---"
grep -n "Discover\|Design" "$FILE" | grep -v "^Binary" | head -40

echo ""
echo "--- Stage field presence ---"
grep -n "\*\*Stage:\*\*" "$FILE" | head -20

echo ""
echo "--- Skills field presence ---"
grep -n "\*\*Skills:\*\*" "$FILE" | head -20

echo ""
echo "--- Pillar names cross-checked against taxonomy ---"
echo "Pillars in plan.md:"
grep -oE '`(usability|content-design|data-viz|deceptive-patterns|behavioral|journey|design-systems|ai-native|design-for-ai)`' "$FILE" | sort | uniq -c

echo ""
echo "All canonical pillars from taxonomy:"
grep -oE '`(usability|content-design|data-viz|deceptive-patterns|behavioral|journey|design-systems|ai-native)`' "$TAXONOMY" | sort | uniq -c

echo ""
echo "--- Design done-when vocabulary: contrast/token/artifact/heuristic ---"
grep -n "contrast\|token\|WCAG\|AA\|artifact\|heuristic\|DESIGN\.md\|JOURNEY\.md\|palette\.mjs" "$FILE" | head -30

echo ""
echo "--- Checking for code/test vocabulary (should NOT appear in done-when items) ---"
grep -n "unit test\|npm test\|npm run\|yarn test\|jest\|pytest\|compile\|build pass\|CI pass" "$FILE" | head -20

echo ""
echo "============================================================"
echo "DW-3.3: DESIGN.md gate, JOURNEY.md gate, lifecycle DAG acyclicity"
echo "============================================================"
echo "--- DESIGN.md gate mentions ---"
grep -n "DESIGN\.md" "$FILE" | head -30

echo ""
echo "--- JOURNEY.md gate mentions ---"
grep -n "JOURNEY\.md" "$FILE" | head -30

echo ""
echo "--- DAG / dependency statements ---"
grep -n "DAG\|acyclic\|Depends on\|Unlocks\|depends on\|dependency\|gate" "$FILE" | head -40

echo ""
echo "--- The explicit DAG diagram ---"
grep -n -A 8 "lifecycle DAG\|DAG.*gates\|research.*JOURNEY\|JOURNEY.*DESIGN" "$FILE" | head -40

echo ""
echo "============================================================"
echo "DW-3.4: Reads research doc as seed (not re-derive); chains to /design-for-ai:mock"
echo "============================================================"
echo "--- Research doc reading ---"
grep -n "research.*doc\|Read.*research\|seed\|re-derive\|reads a research\|Read it" "$FILE" | head -20

echo ""
echo "--- Chains to mock ---"
grep -n "mock\|/design-for-ai:mock\|design-for-ai:mock" "$FILE" | head -20

echo ""
echo "============================================================"
echo "DW-3.5: Mid-lifecycle resume — existing DESIGN.md → resume at Design, skip Discover"
echo "============================================================"
echo "--- Resume contract and mid-lifecycle entry ---"
grep -n "resume\|mid-lifecycle\|entry stage\|entry point\|DESIGN.md.*locked\|skip Discover\|skip.*Discover\|Discover.*skip" "$FILE" | head -20

echo ""
echo "--- Design state scan table ---"
grep -n -A 10 "Scan the Design State\|design state\|entry stage\|ls DESIGN" "$FILE" | head -40

echo ""
echo "============================================================"
echo "EDGE CASE: Quick track — 1-2 phases (does not force heavy planning)"
echo "============================================================"
grep -n "Quick\|1-2 phase\|quick track\|Quick track" "$FILE" | head -20

echo ""
echo "--- Quick track body (check it stays 1-2 phases) ---"
grep -n -A 5 "Quick track\|Quick stay" "$FILE" | head -30

echo ""
echo "============================================================"
echo "EDGE CASE: Existing DESIGN.md → resume at Design, skip Discover"
echo "============================================================"
echo "--- Actual implementation check (ls command + table) ---"
grep -n "ls DESIGN\|Artifacts present\|Neither\|JOURNEY.md only\|DESIGN.md locked\|Both\|Entry stage\|entry stage" "$FILE" | head -30

echo ""
echo "--- 'Never redo' language ---"
grep -n "Never redo\|never redo\|redo\|already exist\|already done" "$FILE" | head -20

echo ""
echo "============================================================"
echo "BONUS: skills validation — only 9 design skills (no workflow commands)"
echo "============================================================"
echo "--- Skills validation rules in plan.md ---"
grep -n "9 design skills\|workflow commands\|no workflow\|research.*plan.*mock" "$FILE" | head -10

echo ""
echo "--- Skills field values in stage map ---"
grep -n -B1 -A1 "journey\|usability\|content-design\|data-viz\|behavioral\|deceptive-patterns\|design-systems\|ai-native" "$FILE" | grep "Skills\|Pillar" | head -20

echo ""
echo "============================================================"
echo "DONE"
echo "============================================================"
