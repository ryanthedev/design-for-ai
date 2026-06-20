#!/usr/bin/env bash
set -euo pipefail
REPO=/Users/r/repos/design-for-ai

echo "=== STEP 1: Directory structure — all 9 skill dirs ==="
ls "$REPO/skills/"

echo ""
echo "=== STEP 2: Description char counts (all 9) ==="
python3 -c "
import re, os
skills = ['design-for-ai', 'usability', 'content-design', 'data-viz', 'deceptive-patterns', 'behavioral', 'journey', 'design-systems', 'ai-native']
repo = '$REPO'
for skill in skills:
    path = os.path.join(repo, 'skills', skill, 'SKILL.md')
    text = open(path).read()
    m = re.search(r'description:\s*\"(.*?)\"', text, re.DOTALL)
    if m:
        val = m.group(1)
        status = 'OK' if len(val) <= 1024 else 'OVER LIMIT'
        print(f'  {skill}: {len(val)} chars [{status}]')
    else:
        print(f'  {skill}: description NOT FOUND')
"

echo ""
echo "=== STEP 3: plugin.json version + no skills array + auto-discovery ==="
python3 -c "
import json
data = json.load(open('$REPO/.claude-plugin/plugin.json'))
print('version:', data.get('version'))
print('has skills array:', 'skills' in data)
print('description:', data.get('description','')[:120])
"

echo ""
echo "=== STEP 4: Grep ai-native SKILL.md for canon-gap framing ==="
echo "-- 'no settled canon' occurrences --"
grep -n "no settled canon" "$REPO/skills/ai-native/SKILL.md" || echo "NOT FOUND"
echo "-- 'principle-derived' occurrences --"
grep -n "principle-derived" "$REPO/skills/ai-native/SKILL.md" || echo "NOT FOUND"

echo ""
echo "=== STEP 5: Grep ai-native-principles.md for canon-gap framing ==="
grep -n "no settled canon\|principle-derived\|no canon\|emerging" "$REPO/skills/ai-native/references/ai-native-principles.md" || echo "NOT FOUND"

echo ""
echo "=== STEP 6: Grep ai-native-caveats.md for canon-gap framing ==="
grep -n "no settled canon\|principle-derived\|emerging" "$REPO/skills/ai-native/references/ai-native-caveats.md" || echo "NOT FOUND"

echo ""
echo "=== STEP 7: Deceptive-patterns description — audit/review phrasing check ==="
python3 -c "
import re
text = open('$REPO/skills/deceptive-patterns/SKILL.md').read()
m = re.search(r'description:\s*\"(.*?)\"', text, re.DOTALL)
desc = m.group(1) if m else 'NOT FOUND'
# Check for 'audit' or 'review' in description
import re as re2
audit_matches = re2.findall(r'\baudit\b|\breview\b', desc, re2.IGNORECASE)
print('audit/review in deceptive-patterns description:', audit_matches)
print('desc excerpt:', desc[:200])
"

echo ""
echo "=== STEP 8: Core SKILL.md — audit phrasing check ==="
python3 -c "
import re
text = open('$REPO/skills/design-for-ai/SKILL.md').read()
m = re.search(r'description:\s*\"(.*?)\"', text, re.DOTALL)
desc = m.group(1) if m else 'NOT FOUND'
audit_matches = re.findall(r'\baudit\b|\breview\b', desc, re.IGNORECASE)
print('audit/review in core description:', audit_matches)
"

echo ""
echo "=== STEP 9: Cross-skill ref anchor spot-check ==="
echo "-- behavioral→usability #peak-end-rule --"
grep -n "peak.end.rule\|peak-end" "$REPO/skills/usability/SKILL.md" | head -5 || echo "NOT FOUND in usability/SKILL.md"
grep -rn "peak.end.rule\|peak-end" "$REPO/skills/usability/references/" 2>/dev/null | head -5 || echo "NOT FOUND in usability/references/"

echo "-- behavioral cites usability anchors? --"
grep -n "usability\|peak.end\|Fitts\|Hick" "$REPO/skills/behavioral/SKILL.md" | head -10 || echo "none"

echo "-- journey cites usability? --"
grep -n "usability" "$REPO/skills/journey/SKILL.md" | head -5 || echo "none"

echo "-- ai-native cites usability? --"
grep -n "usability" "$REPO/skills/ai-native/SKILL.md" | head -5 || echo "none"

echo "-- usability back-cites journey/behavioral/ai-native? (should be empty) --"
grep -n "journey\|behavioral\|ai-native\|content-design\|data-viz\|design-systems\|deceptive" "$REPO/skills/usability/SKILL.md" | head -10 || echo "none — good"

echo ""
echo "=== STEP 10: CLAUDE.md — 8 pillar table + structure tree check ==="
grep -n "ai-native\|8.pillar\|eight pillar\|pillar" "$REPO/CLAUDE.md" | head -20

echo ""
echo "=== STEP 11: README — 8 pillar system check ==="
grep -n "ai-native\|multi-skill\|pillar\|design-foundations\|3\.0\.0" "$REPO/README.md" | head -20

echo ""
echo "=== STEP 12: evals.json well-formed check ==="
python3 -c "
import json
data = json.load(open('$REPO/skills/usability/evals.json'))
print('skill_name:', data.get('skill_name'))
print('eval count:', len(data.get('evals', [])))
print('eval ids:', [e['id'] for e in data.get('evals', [])])
"

echo ""
echo "=== STEP 13: Acyclic DAG — usability refs check (no upward citations) ==="
python3 -c "
import os, glob, re
skills = ['usability', 'content-design', 'data-viz', 'deceptive-patterns', 'behavioral', 'journey', 'design-systems', 'ai-native']
# usability should not cite up to any pillar
usability_files = glob.glob('$REPO/skills/usability/**', recursive=True)
for f in usability_files:
    if os.path.isfile(f):
        text = open(f, errors='replace').read()
        for s in skills:
            if s != 'usability' and re.search(r'\b' + s.replace('-','.') + r'\b', text):
                print(f'UPWARD cite in usability: {f} -> {s}')
print('Usability acyclic check done')
"

echo ""
echo "=== STEP 14: ai-native 'Not for:' clause check ==="
python3 -c "
import re
text = open('$REPO/skills/ai-native/SKILL.md').read()
m = re.search(r'description:\s*\"(.*?)\"', text, re.DOTALL)
desc = m.group(1) if m else ''
not_for = re.search(r'Not for:(.*)', desc)
print('Not for clause:', not_for.group(1)[:200] if not_for else 'MISSING')
"

echo ""
echo "=== STEP 15: All 9 SKILL.md 'Not for:' presence ==="
for skill_dir in design-for-ai usability content-design data-viz deceptive-patterns behavioral journey design-systems ai-native; do
  python3 -c "
import re
text = open('$REPO/skills/$skill_dir/SKILL.md').read()
m = re.search(r'description:\s*\"(.*?)\"', text, re.DOTALL)
desc = m.group(1) if m else ''
has_not_for = 'Not for:' in desc
print('$skill_dir: Not for present =', has_not_for)
"
done

echo ""
echo "=== STEP 16: Discovery doc — trigger sweep + run_eval artifacts check ==="
echo "-- phase-6 discovery doc exists: --"
ls -la "$REPO/.code-foundations/build/2026-06-19-design-foundations-system-phase-6-discovery.md" 2>/dev/null || echo "NOT FOUND"

echo "-- Any test_triggers or run_eval workspace artifacts? --"
find "$REPO" -name "benchmark.md" -o -name "benchmark.json" -o -name "evals.json" 2>/dev/null | head -20

echo ""
echo "=== STEP 17: skills/ai-native directory completeness ==="
find "$REPO/skills/ai-native" -type f | sort

echo ""
echo "=== DONE ==="
