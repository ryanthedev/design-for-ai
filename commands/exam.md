---
description: Theory-backed design audit — find what's wrong and explain WHY
---

Run the design-for-ai skill in CHECKER mode with enhanced diagnosis. For each finding:

1. **Name the problem** — what specifically is wrong
2. **Cite the principle** — which design principle from Design for Hackers is being violated and why it matters
3. **Show the fix** — concrete code/design change to resolve it

Severity levels:
- **Critical** — breaks purpose or violates core principle (readability, accessibility, credibility)
- **Major** — violates design principle with visible impact
- **Minor** — missed opportunity for better design

Read the relevant reference files for each area being examined. Use the decision trees from references/checklists.md when diagnosing layout, typography, or color issues.

Output a findings table organized by severity, then suggest specific commands to fix: "/fonts for typography issues, /color for palette problems, /flow for motion/interaction/responsive, /brand to add design identity."

If the user provided arguments with this command, focus the audit on that specific area. If no arguments, run the full CHECKER.
