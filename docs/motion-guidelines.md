# Motion Guidelines

Project-wide conventions for Motion (Framer Motion, imported as `motion/react`) usage live in
[`docs/design-system.md`](./design-system.md) (durations, easing, `src/lib/motion`). This file covers
one specific, higher-stakes animation in detail: the homepage hero's one-time featured-vehicle intro —
so its timing/behavior contract is documented in one place instead of only living in code comments.

## Featured-vehicle intro (`src/components/layout/featured-vehicle-intro.tsx`)

On first load, the hero's vehicle visual (`hero-vehicle.tsx`) doesn't show the vehicle immediately.
Instead, a short, **one-time** sequence plays inside the same fixed-size box the vehicle will occupy:

1. `intro` — the phrase **"OUR FEATURE VEHICLE"** appears one character at a time.
2. `holding` — the complete phrase stays visible briefly.
3. `exiting` — characters disappear in reverse order (last-in, first-out).
4. `vehicle` — the text is gone; the vehicle image (plus its ambient spotlight, rim light, and floor
   reflection) reveals with a premium one-shot entrance, then settles into its ongoing slow float.

### Why a typed state machine, not scattered booleans

`FeaturedVehicleIntro` tracks a single `IntroStage` (`'intro' | 'holding' | 'exiting' | 'vehicle'`)
rather than several independent booleans (`isTyping`, `isHolding`, `isExiting`, …), which would make
invalid combinations representable (e.g. "holding" and "exiting" both `true`). Each stage's `useEffect`
schedules exactly one `setTimeout` to advance to the next stage and cleans it up on
unmount/stage-change — so there's never more than one pending timer, and no state update can fire after
the component has unmounted.

Once `stage` reaches `'vehicle'`, the component calls `onIntroComplete()` (so `HeroVehicle` can reveal
the vehicle) and renders `null` — it does not keep a hidden DOM node around, and nothing loops back to
`'intro'`.

### Timing budget

| Stage transition               | Duration                            | Notes                                                                                    |
| ------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| Mount → first character starts | `~280ms` initial delay              | Lets the hero's own entrance settle first.                                               |
| Character entrance stagger     | `~50ms` per character               | Applied via `staggerChildren`, not per-character timers.                                 |
| Complete phrase hold           | `~650ms`                            | The only stage with a "pure" wait — nothing animates.                                    |
| Reverse-order removal stagger  | `~32ms` per character               | `staggerDirection: -1` — same children, reversed order.                                  |
| Text → vehicle handoff         | folded into the exit's own duration | No separate delay; `onIntroComplete` fires right as the last character finishes exiting. |

Total: roughly **2.5–3 seconds** end-to-end for a 19-character phrase — short and intentional, not a
showpiece. If the phrase ever changes, the timing scales automatically (it's derived from
`PHRASE.length`, not hardcoded per-character counts).

### Reduced motion

When `prefers-reduced-motion: reduce` is set, the character-by-character choreography is skipped
entirely: the complete phrase renders as static text (no stagger, no per-character motion) for a single
short `350ms` hold, then the vehicle appears immediately with an instant opacity swap and no translation/
scale/blur — see `vehicleVariantsReduced` in `hero-vehicle.tsx`. No timer in the reduced-motion path is
long enough to meaningfully delay content.

### Accessibility

- The full phrase is exposed to assistive tech via a `sr-only` span containing the plain string.
- The animated character spans are wrapped in a container marked `aria-hidden="true"` — screen readers
  never see fragmented, one-letter-at-a-time content.
- No typewriter cursor — considered and deliberately omitted (an extra decorative element competing with
  the "reads once, cleanly" goal).

### Layout stability

The intro text and the vehicle image are both **absolutely positioned inside the same fixed
`aspect-[4/3]` box** (an overlay, not stacked blocks) — see `hero-vehicle.tsx`. This is why swapping one
for the other never shifts the hero's height, on any viewport. The vehicle `<Image>` itself is mounted
from the very first render (so `priority` can actually preload it while the text plays) — it's just
`opacity: 0` until revealed, so there's no fetch/decode delay right when it needs to appear.

### Why this must not become a repeating gimmick

The sequence runs **exactly once per page mount** — there is no interval, no re-trigger on scroll/hover/
route change, and the component unmounts itself once done. Re-running it (on every visit, every
re-render, or on a timer loop) would turn a one-time "welcome" moment into a distracting, dated
typewriter-effect gimmick that actively delays the user from seeing the actual product (the vehicle).
If a future requirement wants it to replay (e.g. per distinct vehicle in a future carousel), that's a
deliberate product decision requiring new triggering logic — not a side effect of this component's
default behavior.

## Post-reveal ambient motion (Subphase 2.1.4)

After the one-time intro completes and the vehicle has revealed, a **continuous but nearly imperceptible**
ambient loop begins — only when `prefers-reduced-motion` is **not** set:

| Element          | Motion                        | Duration | Notes                                       |
| ---------------- | ----------------------------- | -------- | ------------------------------------------- |
| Vehicle image    | Vertical float `0 → -3px → 0` | `10s`    | No horizontal movement, bounce, or rotation |
| Bronze spotlight | Opacity `0.85 → 1 → 0.85`     | `10s`    | Starts after reveal (`delay: 1.1s`)         |
| Rim-light glow   | Opacity `0.45 → 0.6 → 0.45`   | `12s`    | Slightly offset timing from the vehicle     |

Under `prefers-reduced-motion: reduce`, the entire scene is **static** after the instant vehicle reveal
— no float, no glow drift, no opacity loops.

These loops are intentionally subtle (2–4px movement, long durations) so they add life without
competing with the left-column copy or feeling like a gimmick. They must never re-trigger the
character intro sequence.
