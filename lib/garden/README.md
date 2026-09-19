# Night garden scene

Adapted from the MIT-licensed **ThreeUI Community** release by Meng To:
https://github.com/MengTo/threeui

Source: `src/shaders/temple-night/templeNightRenderer.js`.
The standalone Kage repository has different licensing; this implementation and
all bundled scene images come from the ThreeUI Community repository.

- Upstream tree: `68802d5428071ada5c20db8094b1649e6bb770ed`
- Upstream renderer blob: `364b9ebe5bef2e2bd772ddae2a87adc239d9984e`
- Scene/image license: `/public/garden/THREEUI-LICENSE`
- Asset scope: `/public/garden/THREEUI-ASSET-LICENSES.md`
- Three.js runtime: npm `three@0.149.0` (matching the source renderer's r149 API).

Local adaptation restores the five-chapter scroll camera, caps pixel density,
adds pause-aware rendering, and leaves canvas CSS sizing to the React host.
Grain is applied in display space to preserve detail in dark areas.
The React component stops its animation loop when hidden, frees WebGL resources
on navigation, observes resize, and respects reduced-motion preferences. Static
imagery keeps the page usable when WebGL is absent. All runtime assets are local.

The UI and content are native Next.js components; the scene is a deferred chunk,
not an embedded external page. Project, journal, lab and physics routes are kept.

## September 19 refinement

- Seeded gradient noise creates a shared wind field. Leaves follow its local
  curl with damped velocity, independent lift and tumble; foliage and rain use
  the same gust uniform. Warm rust/copper leaf variations replace the flat red.
- Fog advects with the breeze, three procedural cloud banks cross the moon,
  light motes wander and pulse independently, and lantern flicker uses noise.
- The opening camera sits further back, with a small initial dolly and slow
  noise-based drift. Pause freezes the simulation clock and all weather layers.
  A long background-tab gap is excluded from adaptive-quality measurements.
- `use-garden-choreography.ts` adds one-time section reveals, decorative scroll
  parallax and pointer-responsive card images. Text is present and visible in
  server HTML. Pausing or enabling reduced motion removes these enhancements;
  observers/listeners/animations are cleaned up on navigation.
- The red seal is replaced by a typographic wordmark. Larger body copy, a
  consistent serif heading scale, warm neutral accents and reduced decorative copy
  rebalance the layout. The motion control no longer overlaps the scroll link.

Research references (implemented locally; no external runtime requests):

- [Codrops: noise-driven wind](https://tympanus.net/codrops/2020/02/11/how-to-create-a-physics-based-3d-cloth-with-cannon-js-and-three-js/)
- [Codrops: organic particle displacement](https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/)
- [Motion: spring-following targets](https://motion.dev/docs/react-use-spring)
- [Motion: reduced-motion adaptations](https://motion.dev/docs/react-use-reduced-motion)

The DOM choreography uses native Web Animations and IntersectionObserver;
no additional animation dependency was needed for this refinement.

## Scroll performance

Viewport and chapter geometry are cached on resize. Scroll handlers use those
measurements without mixing layout reads with style writes. The scene host
avoids duplicate canvas resizes and caps decorative rendering at 60 Hz on high
refresh displays, while native document scrolling remains unrestricted.

The WebGL buffer has a 1.8-million-pixel desktop budget (700,000 on coarse
pointers). Bloom uses quarter-resolution buffers with three levels on desktop
and two on mobile; the HDR target does not use MSAA. The header uses an opaque
surface instead of repeatedly blurring a changing WebGL backdrop. Adaptive
resolution allocations wait for scrolling to stop and have a cooldown; canvas
resizes do not invalidate the static shadow map.

Reference: [Chrome guidance on batching layout reads and writes](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing).

## Editorial and material refinement

- Remove the duplicate oversized hero signature, give the introduction a clear
  reading area, and lower the hall in the portrait camera composition.
- Reduce lunar albedo contrast and warm the tint. A shared paper-light texture
  and wider shoji lattice preserve window detail at the existing pixel budget.
- Replace scenery-only work covers with local HTML/SVG project illustrations.
  Their subtle pointer response follows the same pause and reduced-motion state.
- Unify project, journal, about, lab and experiment surfaces without changing
  simulation logic, chapter routes or the rendering/bloom budgets.
