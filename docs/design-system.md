# Design System (Phase 1.3)

Foundation-only. This documents the design tokens, typography, layout primitives, component
conventions, and motion principles introduced in Phase 1.3. It intentionally does **not** cover
pages, navigation, or business content — those are later phases.

Live, visual reference: run `pnpm dev` and open **`/design-system`** (see
[Design system preview](#design-system-preview)).

## Design direction

A **hybrid theme**: a light, restrained interface for most of the site, with **dark, cinematic hero
sections** for high-impact moments (reserved for later phases). Inspiration is drawn — never
copied — from premium automotive and Awwvards-quality sites: minimal, spacious, confident
typography, subtle motion, no SaaS-blue/neon/heavy-glassmorphism clichés.

## Colour tokens

Defined as CSS custom properties in `src/app/globals.css`, mapped into Tailwind via `@theme inline`
so every token is usable as a normal utility class (`bg-surface-page`, `text-text-secondary`, etc.).

| Token                                                            | Utility                                               | Purpose                                                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `--surface-page`                                                 | `bg-surface-page`                                     | Page background                                                                       |
| `--surface-elevated`                                             | `bg-surface-elevated`                                 | Cards / elevated panels                                                               |
| `--surface-muted`                                                | `bg-surface-muted`                                    | Muted panels, input backgrounds                                                       |
| `--hero-background`                                              | `bg-hero-background`                                  | Dark cinematic hero background                                                        |
| `--hero-foreground` / `--hero-muted-foreground`                  | `text-hero-foreground` / `text-hero-muted-foreground` | Text on the hero background                                                           |
| `--text-primary`                                                 | `text-text-primary`                                   | Primary text                                                                          |
| `--text-secondary`                                               | `text-text-secondary`                                 | Secondary text                                                                        |
| `--text-muted`                                                   | `text-text-muted`                                     | Muted/tertiary text                                                                   |
| `--border-subtle`                                                | `border-border-subtle`                                | Default hairline borders                                                              |
| `--border-strong`                                                | `border-border-strong`                                | Emphasised borders/dividers                                                           |
| `--brand-accent` / `--brand-accent-hover`                        | `bg-brand-accent`, `text-brand-accent`, …             | The one accent colour — see [Replacing the brand accent](#replacing-the-brand-accent) |
| `--status-success` / `--status-warning` / `--status-destructive` | `bg-status-success`, etc.                             | Status colours — always paired with a text label, never colour alone                  |
| `--focus-ring`                                                   | used by `:focus-visible`                              | Keyboard focus ring colour                                                            |

The underlying shadcn/ui primitive tokens (`--background`, `--foreground`, `--primary`, `--border`,
`--ring`, `--card`, etc.) are also set to this same palette, so every generated `components/ui/*`
component automatically matches — you don't need to restyle them individually.

**Dark hero sections**: the `.dark` class (originally a full dark-mode scope from shadcn) is applied
_locally_ — e.g. via `<Section tone="hero">` — rather than site-wide. This flips every semantic token
and every shadcn primitive underneath it to the dark palette, without a global light/dark toggle.

### Replacing the brand accent

When the client supplies real branding, change only these three variables (in both the `:root` and
`.dark` blocks of `globals.css`):

```css
--brand-accent: ...;
--brand-accent-hover: ...;
--brand-accent-foreground: ...; /* text colour that sits on top of the accent */
```

Everything else (buttons, focus rings, badges, links) derives from these.

## Typography

- **Body/interface**: `Geist` (via `next/font/google`) — clean, restrained, excellent at small UI
  sizes. Used for nearly everything.
- **Display**: `Bricolage Grotesque` — used _only_ for `<Display>` (large cinematic headings), for
  premium character without the performance/readability cost of using it everywhere.
- **Mono**: `Geist Mono` — reserved for tabular/metadata content (specs, reference codes) later.

Components (`src/components/ui/typography.tsx`): `Display`, `PageTitle`, `SectionTitle`,
`CardTitle`, `BodyLarge`, `Body`, `BodySmall`, `Eyebrow`, `Metadata`. Each accepts `as` to change the
rendered element without losing styling (e.g. a visual `SectionTitle` that must be an `<h1>`).
Button text uses the shadcn `Button`'s own `text-sm font-medium` — no separate component needed.

All sizes were checked for readability/wrapping at 320px width. `Display` uses a `clamp()` fluid
size (2.5rem → 5.75rem) so it scales with viewport instead of jumping at breakpoints.

## Spacing & shape

Tokens live under `--spacing-*` / `--container-*` / `--radius-*` in the `@theme inline` block, so
Tailwind generates matching utilities automatically (`px-page-mobile`, `max-w-content`,
`rounded-card`, …).

| Token                                             | Utility                            | Value                           |
| ------------------------------------------------- | ---------------------------------- | ------------------------------- |
| `--spacing-page-mobile`                           | `px-page-mobile`                   | 1.25rem                         |
| `--spacing-page-tablet`                           | `px-page-tablet` (apply at `md:`)  | 2.5rem                          |
| `--spacing-page-desktop`                          | `px-page-desktop` (apply at `lg:`) | 4rem                            |
| `--spacing-section-y` / `-lg`                     | `py-section-y` / `py-section-y-lg` | 4rem / 7rem                     |
| `--spacing-content-gap`                           | `gap-content-gap`                  | 1.5rem                          |
| `--container-content`                             | `max-w-content`                    | 80rem                           |
| `--radius-button` / `-input` / `-card` / `-image` | `rounded-button`, etc.             | 10px / 10px / 14px / 14px       |
| `--shadow-subtle` / `-elevated` / `-hero`         | `shadow-subtle`, etc.              | Soft, low-contrast shadows only |

`<Container>` already applies the responsive page-padding + max-width combination — use it instead of
repeating these classes.

## Layout primitives (`src/components/layout`)

- **`PageShell`** — outermost `flex min-h-svh flex-col` scaffold for a route.
- **`Container`** — mobile-first horizontal gutter (`px-page-*`) + `max-w-content`, centred.
- **`Section`** — full-bleed vertical rhythm (`spacing="normal" | "lg" | "none"`) and background tone
  (`tone="page" | "muted" | "hero"`). Compose `Container` inside it for constrained content.
- **`SectionHeader`** — eyebrow + title + description heading block (`align="left" | "center"`).

```tsx
<Section tone="hero" spacing="lg">
  <Container>
    <SectionHeader eyebrow="..." title="..." description="..." />
  </Container>
</Section>
```

Header, footer, and navigation are **not** implemented yet — later phase.

## Component conventions (`src/components/ui`)

- Generated shadcn/ui primitives (`Button`, `Input`, `Textarea`, `Badge`, `Separator`, `Sheet`,
  `Dialog`, `Skeleton`) live here unmodified where possible; re-generate via
  `pnpm dlx shadcn@latest add <name>` rather than hand-forking them.
- Project wrappers **compose** those primitives rather than duplicating markup:
  - `PrimaryButton` / `SecondaryButton` / `GhostButton` — fixed variant + `loading` state (spinner,
    `disabled`, `aria-busy`) + a 44px-tall default touch target.
  - `IconButton` — icon-only, square, 44px, requires a `label` prop (sets `aria-label` + `title`).
  - `StatusBadge` — status colour is always paired with a text label and a dot; never colour alone.
  - `FormField` — wires `<label htmlFor>`, help text, and error text (`role="alert"`) to one control
    via `React.cloneElement`, generating an id with `useId()` when none is passed.
  - `EmptyState` / `LoadingCard` — generic, content-agnostic placeholders (no business copy).
- All interactive components are keyboard accessible with a visible `:focus-visible` ring
  (`--focus-ring`), support `disabled`, and are strongly typed (extend the underlying element's
  props rather than accepting `any`).

## Motion (`src/lib/motion`)

Small, optional module — **not** wired into shared components by default, and never forces the root
layout into a client component.

- `transitions.ts` — shared durations (`fast` 150ms / `normal` 300ms / `slow` 700ms) and the
  `premiumEase` curve (`cubic-bezier(0.16, 1, 0.3, 1)`), mirrored as CSS vars in `globals.css`.
- `variants.ts` — `fadeIn`, `fadeUp`, `staggerContainer`, `scaleInteraction`,
  `mobileMenuTransition` — each with a reduced-motion-safe counterpart with the same end state.
- `index.ts` — `useMotionVariants('fadeUp' | ...)` and `useScaleInteraction()` hooks that pick the
  right variant automatically based on `prefers-reduced-motion`; also re-exports `useReducedMotion`.

Import these only in the client components that actually animate something.

## Global CSS (`src/app/globals.css`)

Base-layer cleanup applied: consistent box sizing (via Tailwind preflight), `overflow-x: hidden` on
`html`/`body`, smooth-but-reducible anchor scrolling, antialiased text rendering, a visible
`:focus-visible` outline (never suppressed without a replacement), `::selection` styling using the
brand accent, and responsive media defaults (`img`/`svg`/`video`/`canvas` block, max-width 100%,
auto height). A `prefers-reduced-motion: reduce` query shortens all transition/animation durations to
near-zero project-wide, in addition to the per-variant reduced-motion fallbacks in `src/lib/motion`.

## Mobile-first rules

- Every layout primitive and wrapper is unstyled/stacked by default and only gains multi-column /
  larger spacing at `sm:`/`md:`/`lg:` breakpoints.
- Interactive touch targets default to ~44px (`PrimaryButton`/`SecondaryButton`/`GhostButton`/
  `IconButton`).
- Verified at 320 / 375 / 390 / 768 / 1024 / 1440px: no horizontal page overflow, `Dialog`/`Sheet`
  fit within small viewports (`max-w-[calc(100%-2rem)]` / `w-3/4` capped at `max-w-sm`), and
  typography remains readable (no overflow, no oversized headings) at 320px.

## Accessibility rules

- Semantic HTML throughout (`<section>`, `<label>`, real heading levels via typography `as` props).
- Colour contrast follows the neutral-palette + single-accent approach specifically to stay
  comfortably above WCAG AA for text-on-surface combinations.
- Keyboard focus is always visible (`:focus-visible` + `--focus-ring`); `Dialog`/`Sheet` are fully
  keyboard-operable (focus trap, <kbd>Esc</kbd> to close, focus return) via Radix, with no extra
  code required.
- Form controls are associated with labels and help/error text via `FormField`.
- Icon-only controls (`IconButton`) require an accessible `label`.
- Status is never colour-only (`StatusBadge` always renders a text label + dot).
- `prefers-reduced-motion: reduce` is respected both in CSS (global rule) and in `src/lib/motion`
  (per-variant fallbacks).

## Design system preview

`/design-system` (`src/app/design-system/page.tsx`) is a **temporary, internal development route**
that renders every token/component described above for visual QA. It:

- Is clearly labelled as an internal dev preview (banner + `robots: noindex, nofollow`).
- Contains no dealership/business content — only generic placeholder copy.
- Is not linked from anywhere in the app.

**Remove this route, or gate it behind auth/an environment flag, before shipping to production.**
