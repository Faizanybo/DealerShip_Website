# Application Shell & Navigation (Phase 1.4)

Foundation-only. This documents the site configuration, navigation model, Header/Footer, and the
public/admin layout boundary introduced in Phase 1.4. It does **not** cover the homepage, vehicle
pages, or any business content — those are later phases. See also
[`docs/design-system.md`](./design-system.md) for tokens/typography/motion this shell builds on.

## Site configuration (`src/config/site.ts`)

`siteConfig` is the **single source of truth** for dealership identity, contact details, address,
social links, business hours, and copyright text. The Header and Footer read from it — no
component hardcodes dealership information.

```ts
import { siteConfig } from '@/config/site';

siteConfig.dealershipName; // 'Placeholder Motors'
siteConfig.contact.phone; // '+44 0000 000000'
```

### Temporary placeholders

Every dealership-specific value in `site.ts` is a **placeholder** pending real client details:
`dealershipName`, `shortName`, `tagline`, `contact.phone`, `contact.email`, `address`,
`businessHours`, `copyrightHolder`. `social` starts empty on purpose (the Footer only renders
configured platforms). The Footer also prints a small, explicit note that these details are
placeholders — remove that note once real details are confirmed.

**To rebrand:** edit the values in `site.ts` only. Nothing else needs to change.

## Navigation (`src/config/navigation.ts`)

```ts
export interface NavItem {
  label: string;
  href: string;
  description?: string; // reserved, unused today
  visible?: boolean; // defaults to true
  external?: boolean; // adds target="_blank" + rel="noopener noreferrer"
  items?: NavItem[]; // reserved for a future dropdown/mega menu — not rendered yet
}
```

`primaryNavigation` (Home, Cars, Recently Sold, About, Contact) and `legalNavigation` are exported
from here and re-exported through `siteConfig.navigation`. Only `Home` (`/`) currently resolves to
a real page — the rest are **planned routes**; they render in the Header/Footer now so the
information architecture is settled, but will 404 until their pages are built in later phases.
Use `getVisibleNavItems()` to filter out `visible: false` items, and `isNavItemActive(pathname, href)`
for active-route matching (exact match for `/`, prefix match otherwise).

## Header (`src/components/layout/header.tsx`)

A client component (needs `usePathname()` for active-route state and a scroll-position check) —
kept as small and focused as possible; it is not the whole app.

- **Desktop** (`md:` and up): brand mark on the left, centered/balanced nav (`desktop-nav.tsx`) with
  an animated underline under the active item (`motion`, shared `layoutId`, skipped entirely under
  `prefers-reduced-motion`), and a "Call us" CTA (`tel:` link — safe today since `/contact` doesn't
  exist yet) on the right.
- **Mobile**: compact brand + a 44px icon-only menu button opening the existing shadcn `Sheet`
  (`mobile-nav.tsx`) from the right, `85vw` wide capped at `max-w-sm` (fits 320px). Focus trap,
  `Esc` to close, and body-scroll locking are inherited for free from Radix. Selecting a link closes
  the sheet via `SheetClose`.
- **Scroll behavior**: `variant="solid"` (used by the public layout, the only variant wired up
  today) is always a solid light background — safe for every page, since no hero page exists yet.
  The component also supports `variant="transparent"`, for a future page with a dark hero: it
  renders transparent with light (`hero-foreground`) text at the very top of the page, then
  converges to the same solid look once scrolled — detected via a single `IntersectionObserver`
  against a 1px sentinel (**no scroll-event listener**). A future hero page can render
  `<Header variant="transparent" />` directly instead of relying on the shared layout's default.

## Brand mark (`src/components/layout/brand-mark.tsx`)

Text wordmark (`siteConfig.shortName`) + a small abstract geometric SVG glyph (not a car emblem, not
trademarked styling). Renders entirely in `currentColor`, so it automatically matches whichever text
colour the parent sets — no separate light/dark prop needed. **To replace with a real logo**: swap
the contents of `BrandMark`/`BrandMarkGlyph` for an `<Image>`/real SVG; every caller (`Header`,
`Footer`) already just renders `<BrandMark />` and needs no changes.

## Footer (`src/components/layout/footer.tsx`)

Server Component (no interactivity). Uses the same locally-scoped `dark` class as hero sections
(see `docs/design-system.md` → "Dark cinematic hero sections"), so it automatically gets the dark
palette and every token/shadcn primitive inside it inverts correctly. Four-column responsive grid
(brand+social, navigation, contact, hours) collapsing to a single stacked column on mobile, a
placeholder-details notice, a `Separator`, and a bottom bar with the dynamic `© {year}` and legal
links.

## Public vs. future admin layout boundary

```
src/app/
├── layout.tsx            # Root: <html>/<body>, fonts, global metadata — NO Header/Footer
├── (public)/
│   ├── layout.tsx          # Skip link + Header + <main> + Footer
│   └── page.tsx             # (placeholder create-next-app content, relocated as-is)
└── design-system/           # Isolated dev-only preview — deliberately outside (public)
```

The root layout stays shell-agnostic on purpose. Public, customer-facing routes live under the
`(public)` route group (a route group changes nothing about the URL) and automatically get the
dealership Header/Footer. A future admin dashboard should live under its **own** route group (e.g.
`src/app/(admin)/layout.tsx`) with its own layout — it must not import `Header`/`Footer` from
`components/layout`, so it never accidentally inherits the public dealership shell.

`/design-system` intentionally stays a sibling of `(public)`, not inside it — it's a temporary,
self-contained dev tool with its own "internal preview" banner, and doesn't need (or want) the
dealership Header/Footer around it.

## Accessibility

- A "Skip to content" link is the first focusable element on every public page (`sr-only` until
  focused), jumping to `<main id="main-content" tabIndex={-1}>`.
- `<header>`, `<nav aria-label="Primary">` / `aria-label="Footer"`, `<main>`, `<footer>`, and
  `<address>` are all real semantic elements.
- The mobile menu button has an explicit accessible name (`aria-label="Open menu"`); Radix manages
  `aria-expanded`/focus trap/`Esc`/focus-return automatically.
- Active nav links use `aria-current="page"`, not colour alone.
- Every interactive element keeps a visible `:focus-visible` ring (`--focus-ring`).
- The desktop active-underline animation is skipped under `prefers-reduced-motion` (checked via
  `useReducedMotion` from `src/lib/motion`).

## Responsive behavior

Checked at 320 / 375 / 390 / 768 / 1024 / 1280 / 1440px:

- Header never causes horizontal overflow; nav links are hidden below `md:` in favour of the mobile
  Sheet, so the brand mark and CTA never get crushed together.
- Mobile Sheet is `85vw` capped at `max-w-sm` — comfortably fits 320px with room either side; every
  link/CTA inside is at least 44px tall.
- Footer's grid is a single stacked column until `sm:` (2 columns) and `lg:` (4 columns) — contact
  details wrap naturally and never overflow their column.
- The "Call us" CTA is hidden below `sm:` (mobile users get the same call action inside the Sheet
  instead) so it never competes with the mobile menu button for space.

## Performance

- Root layout and `(public)/layout.tsx` remain Server Components.
- Only `Header` (and its `DesktopNav`/`MobileNav` children) are Client Components — required for
  `usePathname()` and the scroll-position check; `Footer`, `BrandMark`, and both layouts are Server
  Components.
- No scroll-event listener — a single `IntersectionObserver` on a 1px sentinel.
- No global state library, no context provider — `siteConfig`/navigation are plain imported
  modules, not context.
