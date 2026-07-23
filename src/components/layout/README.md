# `components/layout`

Structural, app-wide layout building blocks (site header, footer, navigation shell, page containers).

- Composes primitives from `components/ui`.
- Should remain free of data fetching or business logic; layout components receive data via props.

## Contents

- **`page-shell.tsx`** — `PageShell`: outermost full-height flex-column scaffold for a route.
- **`container.tsx`** — `Container`: mobile-first horizontal gutter + max-width wrapper.
- **`section.tsx`** — `Section`: full-bleed vertical rhythm + background tone (`page` / `muted` /
  `hero`). `tone="hero"` locally applies the `dark` scope for cinematic sections.
- **`section-header.tsx`** — `SectionHeader`: eyebrow + title + description heading block.
- **`header.tsx`** — `Header`: sticky site header (client component). Composes `brand-mark.tsx`,
  `desktop-nav.tsx`, and `mobile-nav.tsx`.
- **`footer.tsx`** — `Footer`: premium dark footer (server component), reads `siteConfig`.
- **`brand-mark.tsx`** — `BrandMark`: temporary text + abstract-glyph logo, `currentColor`-based.

See `docs/design-system.md` for layout-primitive usage, and `docs/application-shell.md` for the
Header/Footer/navigation conventions.
