# `components/ui`

Low-level, reusable, presentation-only UI primitives (buttons, inputs, cards, dialogs, etc.).

- Framework-agnostic in intent: no feature or business logic.
- Components here should be composable, accessible, and mobile-first by default.

## Contents

- **Generated [shadcn/ui](https://ui.shadcn.com) primitives** (`button`, `input`, `textarea`, `badge`,
  `separator`, `sheet`, `dialog`, `skeleton`) — managed by the shadcn CLI (`components.json`, style
  `radix-nova`). Re-run `pnpm dlx shadcn@latest add <name>` to add more; avoid hand-editing generated
  files where possible so they stay easy to re-sync.
- **`typography.tsx`** — the type-hierarchy components (`Display`, `PageTitle`, `SectionTitle`,
  `CardTitle`, `BodyLarge`, `Body`, `BodySmall`, `Eyebrow`, `Metadata`). Prefer these over ad-hoc
  `text-*`/`font-*` classes.
- **`app-button.tsx`** — project-specific button wrappers (`PrimaryButton`, `SecondaryButton`,
  `GhostButton`, `IconButton`) composing the shadcn `Button`. 44px default touch target, loading state.
- **`status-badge.tsx`** — `StatusBadge` (success/warning/destructive/neutral), composes the visual
  pattern of `Badge` but always pairs colour with a text label + dot.
- **`form-field.tsx`** — `FormField` wires a `<label>`, help text, and error text to a single control via
  `htmlFor`/`aria-describedby`.
- **`empty-state.tsx`** / **`loading-card.tsx`** — generic, content-agnostic empty/loading placeholders.

See `docs/design-system.md` for the full design-token and component reference.
