---
description: Build a color system from color science up
---

Run the design-for-ai skill focused on color decisions.

1. Read references/chapter-08-color-science.md and references/chapter-09-color-theory.md.
2. Use the "I Need to Choose Colors" decision tree from references/checklists.md.
3. Walk through:
   - **Mood**: What should the design feel like? (or pull from /design context if available)
   - **Background**: Appropriate to content density (white for content-heavy, dark for exclusive)
   - **Base hue**: Match to desired mood and cultural context
   - **Scheme**: Build from color wheel (monochromatic, analogous, complementary, etc.)
   - **Functional colors**: Errors (red), success (green), links (blue), CTAs (maximum contrast with dominant)
   - **Depth**: Warm/cool relationships — warm pops, cool recedes
   - **Shadows**: Hue-shifted, not pure black
   - **Accessibility**: Test for colorblindness, add redundant cues (shape, text, position)
4. Output: color tokens (CSS custom properties), palette visualization description, accessibility notes, and rationale grounded in color science and theory.

If the user provided arguments, use them as context. If not, ask about mood and content density.
