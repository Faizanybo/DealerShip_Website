# `lib`

Small, framework-agnostic utilities shared across the codebase (formatting, validation helpers,
generic algorithms). Pure functions only — no side effects, no fetching, no React.

Sub-modules:

- `logger` — application logging utility.
- `analytics` — analytics tracking helpers.
- `motion` — centralized Motion (Framer Motion) variants/durations/easing (fade, fade-up, stagger,
  scale, mobile-menu transitions), plus reduced-motion-safe hooks. Optional — import only where an
  animation is actually needed; never wired into shared components by default. See
  `docs/design-system.md` → "Motion".

`utils.ts` (the shadcn-managed `cn()` class-merge helper) also lives here.
