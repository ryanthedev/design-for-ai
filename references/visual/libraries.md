# Enhancement Libraries — What to Reach For

**Core posture:** Default to a library. It gives better results, faster — that's the point of reaching for one. The only real decision is **weight**, and weight is a *context call, not a rule*.

Three principles enhance mode cites, the way other modes cite a chapter:

- **Library-default** — Want an effect? Reach for the library that does it. Don't hand-roll what a tested, declarative API already nails.
- **Weight is contextual** — On a normal phone over normal bandwidth, tens of KB is invisible; just grab it. Weigh bytes only when the *delivery context* is constrained.
- **3D is the real cost** — The one effect heavy everywhere. Spend it only for genuinely-3D experiences.

---

## The weight call

| Context | What it means for weight | Reach for |
|---------|--------------------------|-----------|
| **Normal phone / normal bandwidth** (the default case) | Invisible. GSAP is ~23 KB gzipped — half a webfont, a tenth of one hero image, and it downloads in ~0.12s even on throttled "Slow 4G". | The leading library for the effect. Don't think about size. |
| **Constrained delivery** — satellite/2G/metered links, embedded/IoT, per-byte surfaces (ad units, embeddable widgets) | Now tens of KB count against a real budget. | The **CSS-based tier** — library ergonomics, near-zero weight. |
| **3D, anywhere** | Hundreds of KB to MB, *plus* GPU/battery/thermal on mobile (the cost is the rendering, not the download). | Only when the experience is genuinely 3D — a configurator, a model viewer, a spatial scene. Not for depth illusions (those are CSS `transform`/`perspective`). |

---

## Tiers — all of these are libraries

Ordered by weight. "Cheap" doesn't mean "hand-rolled" — the cheap tier is libraries too, they just compile to CSS.

| Tier | Weight | Current examples | Reach for it when |
|------|--------|------------------|-------------------|
| **CSS-based** | ~0–few KB | Animate.css, Tailwind animate / `tailwindcss-animate`, AutoAnimate, AnimXYZ | Fades, slides, reveals, attention, auto layout animation — and any time delivery is constrained |
| **Animation engine** | ~tens of KB | GSAP (timelines, scrub, plugins), Motion (React-native, spring/gesture), anime.js | Timelines, scroll-scrubbing, SVG morphing, drag/gesture physics, FLIP, per-character text — things CSS can't express, where the engine *is* the easy path |
| **3D — WebGL/WebGPU** | hundreds of KB+ | three.js (+ React Three Fiber + drei for React), Babylon.js, Spline (no-code) | The experience is actually 3D |

---

## Category map

The effect → its category → current example tools. Native platform equivalents are noted where they exist — use them if you like, but they're an option, not a mandate.

| Category | Buys you | Current examples | Native equivalent (optional) |
|----------|----------|------------------|------------------------------|
| **CSS-based motion** | Common entrance/attention/layout animation with class-or-attribute ergonomics | Animate.css, Tailwind animate, AutoAnimate | CSS `@keyframes` / transitions (hand-rolled) |
| **Animation engine** | Tween anything, sequence timelines, scrub to scroll, split text | GSAP, Motion, anime.js | Web Animations API; View Transitions API (state/route) |
| **Smooth / scroll-driven** | Momentum scroll, parallax, pinned scroll choreography | Lenis (momentum base), GSAP ScrollTrigger | CSS `animation-timeline: scroll()/view()` for reveals/progress |
| **SVG / vector / motion-gfx** | Play designer-made animations, interactive vector motion, data viz | Lottie, Rive (interactive state machines), D3 (data viz), Rough.js (hand-drawn) | Inline SVG + CSS animation |
| **2D canvas / GPU** | Hundreds–thousands of moving elements, image/shader effects, generative art | Pixi.js, p5.js, OGL | `<canvas>` (hand-rolled) |
| **3D — WebGL/WebGPU** | Real 3D space, lighting, models, shaders | three.js (+ R3F + drei), Babylon.js, Spline | — |
| **Physics** | Rigid-body simulation, collisions | Rapier (Rust/WASM, 2D+3D), Matter.js (2D) | — |
| **Particles** | Particle fields, ambient backgrounds | tsParticles, custom three.js systems | CSS gradients/`@keyframes` for simple ambient motion |

---

## Picking a specific tool

1. **Name the effect** concretely — "reveal cards on scroll," "a rotating product hero," "buttery scroll." Vague "make it pop" gets pushed to a real effect first.
2. **Find its category** above and reach for the **leading library** there.
3. **If delivery is constrained**, drop to the CSS-based equivalent for the same effect.
4. **If it's 3D**, confirm the experience is genuinely 3D before spending the weight.
5. **Honor `prefers-reduced-motion`** with a meaningful reduced experience — see motion.md for that and the GPU-compositing / timing rules.
6. **Current examples, never pinned versions.** Library names here are *current examples of a stable category*, not fixed dependencies — the category lasts years, the specific leader churns. Confirm the package exists and is actively maintained before adding it; never invent a package or version string.

The libraries execute the design DNA — they don't supply it. Distinctiveness comes from the typography, color, and archetype work in the rest of this skill; these tools just bring it to life.
