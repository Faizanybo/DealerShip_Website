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
- **`header.tsx`** — `Header`: fixed site header (client component). Composes `brand-mark.tsx`,
  `desktop-nav.tsx`, and `mobile-nav.tsx`. `variant="auto"` (default) is transparent-over-hero on `/`
  and solid everywhere else.
- **`footer.tsx`** — `Footer`: premium dark footer (server component), reads `siteConfig`.
- **`brand-mark.tsx`** — `BrandMark`: temporary text + abstract-glyph logo, `currentColor`-based.
- **`hero.tsx`** — `Hero`: dark cinematic homepage hero (server component); background is a pure
  CSS/SVG treatment, not a photo — see `docs/homepage.md`.
- **`hero-content.tsx`** — `HeroContent`: the hero's animated text/CTAs/scroll-indicator (client
  component), isolated so `Hero` itself stays a Server Component.
- **`page-placeholder.tsx`** — `PagePlaceholder`: shared "content in progress" shell used by every
  temporary public route (`/cars`, `/recently-sold`, `/about`, `/contact`).

See `docs/design-system.md` for layout-primitive usage, `docs/application-shell.md` for the
Header/Footer/navigation conventions, and `docs/homepage.md` for the hero/homepage conventions.
