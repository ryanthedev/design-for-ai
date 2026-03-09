---
description: Add motion, interaction states, and responsive behavior
---

Run the design-for-ai skill focused on temporal and adaptive design.

1. Read references/motion.md, references/interaction.md, and references/responsive.md.
2. Assess current state: What moves? What responds to user input? What adapts to screen size?
3. Walk through three dimensions:

**Motion:**
- Entry animations: staggered reveals, fade+translate
- State transitions: expand/collapse, show/hide, tab switches
- Feedback: button press, form validation, loading
- Timing: 100ms (micro), 300ms (standard), 500ms (complex)
- Easing: ease-out for entries, ease-in for exits, exponential curves for natural feel
- NEVER: bounce/elastic easing, animating layout properties (width, height, padding)

**Interaction:**
- Map all 8 states: default, hover, focus, active, disabled, loading, error, success
- Focus management: :focus-visible, never remove focus rings, proper contrast
- Forms: labels required, validate on blur, errors with aria-describedby
- Loading: optimistic UI > skeleton screens > spinners
- Destructive actions: undo > confirm dialog

**Responsive:**
- Mobile-first with min-width queries
- Content-driven breakpoints (not device sizes)
- Container queries for component-level responsiveness
- Fluid typography and spacing with clamp()
- Touch targets: minimum 44x44px
- Adapt interface for context — don't just shrink

4. Verify: 60fps, prefers-reduced-motion respected, keyboard navigation works, touch targets sized correctly.
5. Output: implementation plan with specific CSS/JS patterns.

If the user provided arguments, focus on that dimension. If not, assess all three.
