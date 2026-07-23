# Motion Guidelines

Project-wide conventions for Motion (`motion/react`) and CSS micro-interactions. Shared
timing tokens live in [`docs/design-system.md`](./design-system.md) and
`src/lib/motion/transitions.ts` — keep CSS `--ease-premium` and `premiumEase` in sync.

This document covers the homepage hero end-to-end: entrance timeline, micro-interactions,
navigation polish, reduced-motion rules, and conventions future sections should follow.

---

## Easing conventions

| Token / export   | Value                           | Use                                        |
| ---------------- | ------------------------------- | ------------------------------------------ |
| `premiumEase`    | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, hovers, scroll cue, nav underline |
| `--ease-premium` | same (CSS)                      | Tailwind/CSS transitions in hero CTAs      |
| `easeInOut`      | Motion default                  | Slow ambient loops only                    |

**Rules:** decelerating ease-out for entrances and hovers; no bounce, elastic, or spring
on marketing surfaces unless explicitly requested.

---

## Interaction durations

| Interaction               | Duration    | Notes                                           |
| ------------------------- | ----------- | ----------------------------------------------- |
| Hero content reveal       | `350–550ms` | Per-element fade-up                             |
| Hero stagger step         | `60ms`      | Between eyebrow → headline → copy → CTAs        |
| Trust-item stagger        | `60ms`      | Nested after CTAs; `350ms` per item             |
| Primary CTA hover         | `300ms`     | translateY + shadow + arrow                     |
| Secondary CTA hover       | `300ms`     | border/background + 1px lift                    |
| Nav underline grow        | `200ms`     | scale-x from centre; bronze accent              |
| Scroll indicator loop     | `3s`        | Pill + dot drift; hidden below `sm:`            |
| Featured-vehicle intro    | `~2.5–3s`   | One-time; see below                             |
| Post-reveal ambient float | `10–12s`    | ≤4px movement; see "Post-reveal ambient motion" |

---

## Hero timeline (first load)

Left and right columns may overlap slightly; decorative motion never blocks interaction.

| Order | Element                            | ~Start   | Component                    |
| ----- | ---------------------------------- | -------- | ---------------------------- |
| 1     | Eyebrow                            | `20ms`   | `hero-content.tsx`           |
| 2     | Headline lines (staggered)         | `80ms+`  | `hero-content.tsx`           |
| 3     | Supporting paragraph               | ~`200ms` | `hero-content.tsx`           |
| 4     | CTAs (**interactive immediately**) | ~`260ms` | `hero-content.tsx`           |
| 5     | Trust items (sequential)           | ~`320ms` | `hero-content.tsx`           |
| 6     | "OUR FEATURE VEHICLE" intro        | ~`480ms` | `featured-vehicle-intro.tsx` |
| 7     | Vehicle reveal + studio lighting   | ~`3s`    | `hero-vehicle.tsx`           |
| 8     | Scroll indicator fade-in           | ~`1.15s` | `hero-scroll-indicator.tsx`  |

CTAs and nav links are focusable from first paint — animations are visual-only (`opacity` /
`transform`), never `pointer-events: none`.

Variants: `staggerHero`, `fadeUpHero`, `staggerTrust`, `fadeUpTrust` in
`src/lib/motion/variants.ts`, selected via `useMotionVariants()`.

---

## Button behaviour (hero CTAs)

Implemented with **CSS transitions** (not Motion scale) so touch devices get `:active`
states without relying on hover.

**Primary (`Browse Inventory`):**

- Hover: `translateY(-2px)`, shadow `subtle → elevated`, arrow `+4px` right
- Active: returns to `translateY(0)`, shadow resets
- Focus: `ring-2` via `focus-visible:ring-focus-ring`
- Weight: `font-semibold`

**Secondary (`Contact Sales`):**

- Hover: `translateY(-1px)`, border lightens, `bg-white/10`
- Active: flat position, `bg-white/5`
- No scale or flashy fill sweep

---

## Navigation interactions

Desktop nav (`desktop-nav.tsx`, `xl:`+):

- Active route: bronze underline at full width (`bg-brand-accent`, `scale-x-100`)
- Inactive: underline grows from **centre** on hover/focus (`scale-x-0 → scale-x-100`)
- Duration: `200ms`, `premiumEase`
- No `layoutId` sliding between routes — avoids exaggerated motion
- Keyboard: `focus-visible:ring-2` on each link; opacity reaches `100%` on focus

Navigation items and route structure are unchanged — polish only.

---

## Featured-vehicle intro

See [`featured-vehicle-intro.tsx`](../src/components/layout/featured-vehicle-intro.tsx).

One-time state machine: `intro → holding → exiting → vehicle`. Character stagger uses
Motion; timers cleaned up on unmount. Full phrase in `sr-only`; animated letters
`aria-hidden`.

| Stage transition              | Duration                         |
| ----------------------------- | -------------------------------- |
| Mount → first character       | `~480ms` (after left CTAs/trust) |
| Character entrance stagger    | `~50ms` per character            |
| Complete phrase hold          | `~650ms`                         |
| Reverse-order removal stagger | `~32ms` per character            |

**Must not loop.** Re-running on every visit would delay access to the vehicle.

### Reduced motion (intro)

Static phrase for `350ms`, then instant vehicle reveal — no character choreography,
no translate/scale/blur on the vehicle.

---

## Post-reveal ambient motion (Subphase 2.1.4)

After the one-time intro completes — only when `prefers-reduced-motion` is **not** set:

| Element          | Motion                        | Duration |
| ---------------- | ----------------------------- | -------- |
| Vehicle image    | Vertical float `0 → -3px → 0` | `10s`    |
| Bronze spotlight | Opacity `0.85 → 1 → 0.85`     | `10s`    |
| Rim-light glow   | Opacity `0.45 → 0.6 → 0.45`   | `12s`    |

Under reduced motion: **completely static** after reveal.

---

## Scroll indicator

- Hidden below `sm:` — stacked mobile hero is tall enough without an extra cue
- Desktop/tablet: pill fades in once (`delay: 1.15s`), then loops gently
- Pill: `translateY(0 → 4px → 0)`, opacity `0.65 → 1 → 0.65`, `3s` loop
- Inner dot: `6px` travel on the track, matching opacity fade
- No bouncing chevron/arrow
- Reduced motion: static indicator, no loop

---

## Reduced-motion rules (summary)

When `prefers-reduced-motion: reduce`:

| Area             | Behaviour                                      |
| ---------------- | ---------------------------------------------- |
| Hero entrance    | Instant opacity (no stagger, no translate)     |
| Trust strip      | All items appear together                      |
| Featured intro   | Static phrase → instant vehicle                |
| Vehicle reveal   | Opacity only                                   |
| Ambient float    | Off                                            |
| Scroll indicator | Static, no loop                                |
| CTA hover motion | CSS still works; no Motion scale on hero CTAs  |
| Nav underline    | Instant (CSS transition duration unchanged OK) |

Never hide or delay links/buttons behind animation timers.

---

## Trust strip placeholders

Copy lives in `siteConfig.hero.trustItems` (`src/config/site.ts`) — marked **PLACEHOLDER**.
Neutral claims only; replace with client-confirmed statements before launch. Reveal uses
one-time staggered fade-up; no continuous animation.

---

## Rules for future sections

When adding motion elsewhere in the site:

1. **Prefer CSS** for hovers/press states on buttons and links; reserve Motion for
   orchestrated reveals and one-off sequences.
2. **Use shared variants** from `src/lib/motion` — add reduced-motion pairs for every
   new variant; wire through `useMotionVariants()`.
3. **Never block interaction** — animate `opacity`/`transform` only; links stay focusable.
4. **One-shot by default** — looping motion is for ambient/atmosphere only (scroll cue,
   vehicle float), never for headlines or CTAs.
5. **Respect tokens** — bronze accent (`--brand-accent`), `premiumEase`, documented
   durations; no unrelated colours or bounce easing.
6. **Mobile-first cost** — hide expensive decorative layers on narrow viewports when they
   don't earn their keep (see vehicle studio `sm:` gates in `hero-vehicle.tsx`).
7. **Document** new sequences here with a timeline table before shipping.

---

## Client-component boundaries (homepage hero)

| Component              | Client? | Responsibility                       |
| ---------------------- | ------- | ------------------------------------ |
| `Hero`                 | No      | Layout shell, `HeroBackground`       |
| `HeroContent`          | Yes     | Left entrance + CTA CSS interactions |
| `HeroVehicle`          | Yes     | Studio scene, reveal, ambient float  |
| `FeaturedVehicleIntro` | Yes     | Character intro state machine        |
| `HeroScrollIndicator`  | Yes     | Scroll cue loop                      |
| `DesktopNav`           | Yes     | Active route (pathname only)         |

Keep new client islands as small as possible; do not convert the homepage page component
to a Client Component.
