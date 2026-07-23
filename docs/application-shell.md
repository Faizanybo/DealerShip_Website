# Application Shell & Navigation (Phase 1.4)

Foundation-only. This documents the site configuration, navigation model, Header/Footer, and the
public/admin layout boundary introduced in Phase 1.4 (with a Phase 2.1 update to the Header's
positioning/variant — see the "Positioning" and "Scroll behavior / variant" notes below). It does
**not** cover vehicle pages or backend/Auto Trader integration — those are later phases. See also
[`docs/design-system.md`](./design-system.md) for tokens/typography/motion this shell builds on, and
[`docs/homepage.md`](./homepage.md) for the homepage hero that now uses the Header's `auto` variant.

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

`primaryNavigation` (Home, Cars, Recently Sold, Finance, Warranty, Sell Your Car, About, Contact) and
`legalNavigation` are exported from here and re-exported through `siteConfig.navigation`. The set was
expanded from the original five items to match the information architecture typically found on
comparable premium dealership sites — see
[`docs/research/seymour-pope-analysis.md`](./research/seymour-pope-analysis.md) for the research behind
that decision. Every route now resolves to at least a temporary `PagePlaceholder` shell (see
`docs/homepage.md`), so nothing 404s; `Home`, `Cars`, `Recently Sold`, `About`, and `Contact` are the
only ones with any real content beyond the placeholder. Use `getVisibleNavItems()` to filter out
`visible: false` items, and `isNavItemActive(pathname, href)` for active-route matching (exact match for
`/`, prefix match otherwise).

**Desktop nav breakpoint:** `DesktopNav` now renders from `xl:` (1280px) instead of `md:` (768px), with
`MobileNav`'s trigger button mirroring it (`xl:hidden`). Eight top-level items in a single inline row —
alongside the brand mark and "Call us" CTA — no longer comfortably fits below that width, so
tablet/small-laptop viewports now use the mobile `Sheet` menu instead (already built to handle any
number of items via `overflow-y-auto`, so no new component was needed). If the client later wants the
inline desktop row to appear earlier than 1280px, that's a real design decision (likely grouping some
items, e.g. Finance/Warranty/Sell Your Car under a dropdown) rather than a simple breakpoint tweak —
flagged as a follow-up, not solved here.

## Header (`src/components/layout/header.tsx`)

A client component (needs `usePathname()` for active-route state and a scroll-position check) —
kept as small and focused as possible; it is not the whole app.

- **Desktop**: brand mark on the left (visible at every width), the inline nav (`desktop-nav.tsx`,
  `xl:` and up — see "Desktop nav breakpoint" above) with a bronze underline on the active item and
  a centre-growing bronze underline on hover/focus (`200ms`, CSS-only — see
  [`docs/motion-guidelines.md`](./motion-guidelines.md) → "Navigation interactions"), and a "Call us"
  CTA (`tel:` link, visible from `sm:`) on the right.
- **Mobile**: compact brand + a 44px icon-only menu button opening the existing shadcn `Sheet`
  (`mobile-nav.tsx`) from the right, `85vw` wide capped at `max-w-sm` (fits 320px). Focus trap,
  `Esc` to close, and body-scroll locking are inherited for free from Radix. Selecting a link closes
  the sheet via `SheetClose`.
- **Sizing**: `h-16 sm:h-20` (bumped from `h-16 sm:h-18` during the hero-elevation pass so the header's
  presence better matches the enlarged hero; left unchanged during the later hero-composition pass —
  see [`docs/homepage.md`](./homepage.md#header-behavior-on-the-hero)), `size="wide"` `<Container>`
  (matching the hero). The hero-composition pass polished proportions within that same height rather
  than growing it further: a slightly larger brand mark/wordmark (`brand-mark.tsx`), slightly more
  breathing room between nav links (`gap-2` in `desktop-nav.tsx`; the 15px link size itself was already
  on-spec), and a visually "stronger" Call Us button (`shadow-subtle`/`hover:shadow-elevated` +
  `font-semibold` at `sm:` — same height/padding as before, since that's shared with every other
  `PrimaryButton` in the app).
- **Positioning**: `fixed inset-x-0 top-0` (not `sticky` — changed in Phase 2.1). A `fixed` header is
  removed from normal flow so it can visually sit **on top of** the homepage hero instead of pushing
  it down. `(public)/layout.tsx`'s `<main>` compensates with `pt-16 sm:pt-20` (matching the header's
  `h-16 sm:h-20`) so every other page's content still starts below the header exactly as before;
  `Hero` (see [`docs/homepage.md`](./homepage.md)) cancels that same padding with a matching
  `-mt-16 sm:-mt-20` so it alone can bleed up to the very top of the page. **These three values must
  always stay in sync** — see the comment above `Header` for the canonical list.
- **Scroll behavior / variant**: `variant` is `'solid' | 'transparent' | 'auto'` (default `'auto'`).
  `'auto'` renders `'transparent'` on the homepage (`pathname === '/'`, the only route with a dark
  hero right now) and `'solid'` everywhere else — call sites never have to think about it, and
  `(public)/layout.tsx` just renders `<Header />` unconditionally for every page. `'transparent'`
  renders see-through with light (`hero-foreground`) text at the very top of the page, then converges
  to the same solid look once scrolled — detected via a single `IntersectionObserver` against a 1px
  sentinel (**no scroll-event listener**). Extend the `pathname === '/'` check inside `Header` if a
  future route also grows a dark hero.

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
│   ├── layout.tsx          # Skip link + Header + <main> (pt-16 sm:pt-20) + Footer
│   ├── page.tsx             # Homepage: Hero + structural sections (Phase 2.1) — see docs/homepage.md
│   ├── cars/, recently-sold/, finance/, warranty/, sell-your-car/, about/, contact/
│   │                          # Temporary "content in progress" shells (`PagePlaceholder`)
│   └── _components/         # Homepage-only section components (not routes)
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

- Header never causes horizontal overflow; nav links are hidden below `xl:` in favour of the mobile
  Sheet, so the brand mark and CTA never get crushed together — even with 8 top-level items.
- Mobile Sheet is `85vw` capped at `max-w-sm` — comfortably fits 320px with room either side; every
  link/CTA inside is at least 44px tall; the nav list scrolls internally (`overflow-y-auto`) so 8 items
  never overflow the sheet itself.
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
