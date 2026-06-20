#!/usr/bin/env bash
set -euo pipefail

echo "=== DESCRIPTION LENGTH CHECK ==="
DESC=$(awk '/^description:/{found=1} found{print}' /Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md | head -5 | sed 's/^description: //' | tr -d '\n' | sed 's/^"\(.*\)"$/\1/')
# More robust: extract the description value from frontmatter
python3 - <<'PYEOF'
import re

with open('/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md') as f:
    content = f.read()

# Extract frontmatter
fm_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
if not fm_match:
    print("ERROR: No frontmatter found")
    exit(1)

fm = fm_match.group(1)

# Extract description (may span multiple lines if quoted)
desc_match = re.search(r'^description:\s*"(.*?)"', fm, re.DOTALL | re.MULTILINE)
if not desc_match:
    desc_match = re.search(r'^description:\s*(.+)$', fm, re.MULTILINE)
    if not desc_match:
        print("ERROR: No description found")
        exit(1)
    desc = desc_match.group(1).strip()
else:
    desc = desc_match.group(1)

char_count = len(desc)
print(f"Description length: {char_count} chars")
print(f"Limit: 1024 chars")
if char_count <= 1024:
    print(f"STATUS: PASS (within limit by {1024 - char_count} chars)")
else:
    print(f"STATUS: FAIL (exceeds limit by {char_count - 1024} chars)")
print(f"\nDescription:\n{desc}")
PYEOF

echo ""
echo "=== FOUNDATIONS-STANDARDS.MD — SECTION PRESENCE ==="
FILE=/Users/r/repos/design-for-ai/docs/foundations-standards.md
echo "Checking required sections..."
grep -n "Frontmatter shape" "$FILE" && echo "  [OK] Frontmatter shape" || echo "  [MISSING] Frontmatter shape"
grep -n "1024" "$FILE" && echo "  [OK] ≤1024-char description rule" || echo "  [MISSING] ≤1024-char rule"
grep -n "reference-file shape\|canonical.*reference\|Canonical reference" "$FILE" && echo "  [OK] Canonical reference-file shape" || echo "  [MISSING] Canonical reference-file shape"
grep -n "cite.the.principle\|cite-the-principle" "$FILE" && echo "  [OK] Cite-the-principle house rule" || echo "  [MISSING] Cite-the-principle"
grep -n "validate_skill\|eval gate\|per-skill eval" "$FILE" && echo "  [OK] Per-skill eval gate" || echo "  [MISSING] Per-skill eval gate"
grep -n "test_triggers" "$FILE" && echo "  [OK] test_triggers mentioned" || echo "  [MISSING] test_triggers"
grep -n "run_eval" "$FILE" && echo "  [OK] run_eval mentioned" || echo "  [MISSING] run_eval"
grep -n "0 errors\|0 warnings\|zero error\|zero warning" "$FILE" && echo "  [OK] 0 errors/0 warnings requirement" || echo "  [MISSING] 0/0 pass condition"

echo ""
echo "=== SKILL-AUTHORING-TEMPLATE.MD — EXISTENCE AND KEY SECTIONS ==="
FILE2=/Users/r/repos/design-for-ai/docs/skill-authoring-template.md
if [ -f "$FILE2" ]; then
    echo "  [OK] File exists"
    wc -l "$FILE2"
    grep -n "Checklist\|checklist" "$FILE2" | head -5
    grep -n "frontmatter\|Frontmatter" "$FILE2" | head -5
    grep -n "Definition of done\|definition of done" "$FILE2" | head -5
else
    echo "  [MISSING] File does not exist"
fi

echo ""
echo "=== PILLAR-TAXONOMY.MD — ALL 8 PILLARS PRESENT ==="
FILE3=/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md
echo "Checking for each pillar..."
for PILLAR in usability content-design data-viz deceptive-patterns behavioral journey design-systems ai-native; do
    grep -c "$PILLAR" "$FILE3" > /dev/null 2>&1 && echo "  [OK] $PILLAR" || echo "  [MISSING] $PILLAR"
done

echo ""
echo "=== PILLAR-TAXONOMY.MD — 'NOT FOR' / REDIRECTS PRESENT ==="
grep -c "not for\|Not for\|use Y\|use \`" "$FILE3" && echo "  [OK] Redirect/not-for clauses present" || echo "  [MISSING] No redirect clauses found"
grep -n "Not for\|not for" "$FILE3" | head -20

echo ""
echo "=== PILLAR-TAXONOMY.MD — DISJOINTNESS CHECK (trigger keywords per pillar) ==="
python3 - <<'PYEOF'
# Read the trigger column from the disjoint scope table
# Extract "Fires on" column content for each pillar and check for overlaps

import re

with open('/Users/r/repos/design-for-ai/docs/pillar-taxonomy.md') as f:
    content = f.read()

# Find the table rows in the disjoint scope section
# Table columns: | Pillar | Fires on (its trigger keywords) | Not for X → use Y |
rows = re.findall(r'\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|', content)

if not rows:
    print("ERROR: Could not parse table rows")
    exit(1)

pillars = {}
for pillar, fires_on, not_for in rows:
    pillars[pillar] = fires_on.lower()
    print(f"\nPillar: {pillar}")
    print(f"  Fires on: {fires_on[:120]}")
    print(f"  Not for:  {not_for[:120]}")

print("\n=== KEYWORD OVERLAP CHECK ===")
# Extract key distinct trigger terms per pillar and check for exact string matches
pillar_keys = list(pillars.keys())
overlap_found = False
for i in range(len(pillar_keys)):
    for j in range(i+1, len(pillar_keys)):
        p1, p2 = pillar_keys[i], pillar_keys[j]
        # Compare significant tokens (3+ chars, not filler words)
        filler = {'the','for','its','and','not','use','this','are','ux','ui','via','or','a','is','in','on','to','of','from','that','vs','as'}
        tokens1 = set(t.strip('",/()') for t in pillars[p1].split() if len(t.strip('",/()')) > 2 and t.strip('",/()') not in filler)
        tokens2 = set(t.strip('",/()') for t in pillars[p2].split() if len(t.strip('",/()')) > 2 and t.strip('",/()') not in filler)
        shared = tokens1 & tokens2
        if shared:
            print(f"  SHARED TOKENS between {p1} and {p2}: {shared}")
            overlap_found = True

if not overlap_found:
    print("  No exact token overlaps found between any two pillars' 'Fires on' text")
PYEOF

echo ""
echo "=== SKILL.md — PILLAR INDEX SECTION PRESENT ==="
FILE4=/Users/r/repos/design-for-ai/skills/design-for-ai/SKILL.md
echo "Checking for pillar index section..."
grep -n "Pillar\|pillar" "$FILE4" | head -20

echo ""
echo "=== SKILL.md — ALL 8 PILLAR SKILLS REFERENCED ==="
for PILLAR in usability content-design data-viz deceptive-patterns behavioral journey design-systems ai-native; do
    grep -c "$PILLAR" "$FILE4" > /dev/null 2>&1 && echo "  [OK] $PILLAR" || echo "  [MISSING] $PILLAR"
done

echo ""
echo "=== SKILL.md — 7 EXISTING ROUTING ROWS INTACT ==="
for MODE in design surface fonts color audit enhance polish; do
    grep -c "| $MODE " "$FILE4" > /dev/null 2>&1 && echo "  [OK] $MODE" || echo "  [MISSING] $MODE"
done

echo ""
echo "=== DONE ==="
