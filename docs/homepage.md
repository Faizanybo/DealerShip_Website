# Homepage & Public Route Scaffolding (Phase 2.1)

Foundation-only. This documents the homepage hero, the homepage's structural section foundation, and
the temporary "content in progress" shells for the other public routes introduced in Phase 2.1. It
does **not** cover vehicle listings, filtering, or any backend/Auto Trader integration — those are
later phases. See also [`docs/design-system.md`](./design-system.md) (tokens/typography/motion) and
[`docs/application-shell.md`](./application-shell.md) (Header/Footer/navigation).

## Route status

| Route            | Status                                                     |
| ---------------- | ---------------------------------------------------------- |
| `/`              | Real hero + structural section foundation (this phase)     |
| `/cars`          | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/recently-sold` | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/about`         | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/contact`       | Temporary shell + real phone/email links from `siteConfig` |

None of these are final designs. `/cars` and `/recently-sold` in particular are placeholders until
vehicle data exists — see "Future data source" below.

## Homepage hero (`src/components/layout/hero.tsx`)

Split into two pieces so only a small subtree ships client JS:

- **`Hero`** (Server Component) — the dark section shell, background treatment, and layout. Renders
  `<HeroBackground>` (purely decorative, `aria-hidden`) and a `<Container>` wrapping `<HeroContent>`.
- **`HeroContent`** (`hero-content.tsx`, Client Component) — the actual headline/eyebrow/supporting
  text/CTAs/scroll indicator, animated in with a staggered fade-up (`useMotionVariants('staggerContainer'
)` / `'fadeUp'` from `src/lib/motion`, both reduced-motion-safe).

Content comes from props passed by `(public)/page.tsx`, using `siteConfig.tagline` as the headline so
there's one source of truth — update `siteConfig` to change the headline everywhere it's reused.

### Hero asset strategy

**No photo was added.** The repository had no legally-suitable dealership photography, and hotlinking
a random production image was explicitly out of scope. Per the agreed fallback, the hero background
(`HeroBackground` inside `hero.tsx`) is a pure CSS/SVG treatment:

1. A dark diagonal gradient (`oklch` stops) as the base.
2. Two soft, blurred "light bloom" circles (bronze accent + a cool blue) for abstract depth —
   decorative only, not representational of anything.
3. A dark vignette gradient on top for text readability regardless of viewport.
4. A faint inline SVG grain (`feTurbulence`, encoded as a `data:` URI) so the gradient doesn't look
   flat — no network request, zero bytes over the wire beyond the inline markup.

Everything in `HeroBackground` is `aria-hidden="true"` (purely decorative, no text-in-image, nothing a
screen reader needs to announce). **This must be swapped for real dealership photography before
production** — once the client supplies usable images, replace `HeroBackground`'s contents with a
`next/image` (`priority`, explicit `width`/`height` or `fill`, meaningful `alt` if the image conveys
content) and keep the vignette overlay so text stays legible.

### Header behavior on the hero

The Header is `fixed` (not `sticky`) so it can visually sit on top of the hero instead of pushing it
down — see [`docs/application-shell.md`](./application-shell.md#header-srccomponentslayoutheadertsx)
for the full mechanism (the `-mt-16 sm:-mt-18` / `pt-16 sm:pt-18` pull-up/compensation pair). In short:
`Header`'s new `variant="auto"` default renders transparent + light text only on `/`, converging to the
existing solid light style once scrolled past the top (same `IntersectionObserver` sentinel as before).
Every other route keeps the standard solid Header with no extra configuration.

### Mobile height

The hero uses `min-h-svh` (small-viewport-height unit), **not** `h-screen`/`100vh` — `svh` already
accounts for mobile browser chrome (address bar, bottom toolbar) so the hero doesn't jump or leave a
gap as the browser UI shows/hides while scrolling.

## Homepage structural foundation (`src/app/(public)/_components/`)

Below the hero, four server-rendered sections establish spacing/rhythm for content that will become
data-driven later. All copy is neutral and generic — no statistics, testimonials, or claims:

- **`value-proposition-section.tsx`** — `id="intro"` (the hero's scroll-indicator target). Three
  generic pillars (honesty, preparation, straightforward buying), no numbers or claims.
- **`inventory-placeholder-section.tsx`** — a reusable `SectionHeader` + `EmptyState` pairing, used
  twice on the homepage (`id="featured"` for "Featured vehicles", `id="recently-sold"` for "Recently
  sold vehicles"). **Structural placeholder only** — real vehicle cards replace the `EmptyState` once
  data exists (see "Future data source" below). Kept as one component instead of duplicating the
  section markup twice.
- **`dealership-experience-section.tsx`** — a short "about us" teaser linking to `/about`.
- **`contact-cta-section.tsx`** — a closing dark section (bookends the hero) with a CTA to `/contact`.

## Temporary route shells (`src/components/layout/page-placeholder.tsx`)

`/cars`, `/recently-sold`, `/about`, and `/contact` all render `<PagePlaceholder>`: a `StatusBadge`
reading "Content in progress", an eyebrow, a `PageTitle` (the page's one `<h1>`), and a short
description. `/contact` passes `children` to additionally show the phone/email already configured in
`siteConfig` (the same values shown in the Footer) so visitors have an immediate way to reach out.
Swapping a route's placeholder for real content later only means changing that one page file — the
route, its metadata, and its place in navigation don't change.

## Metadata

The root layout (`src/app/layout.tsx`) now sets `title.default`/`title.template` from `siteConfig`, so
every page composes its title automatically: the homepage keeps the bare dealership name, every other
page renders as `"<Page title> | <dealershipName>"`. Each page sets only its own short `title` +
`description` — no page repeats brand values by hand, and everything updates in one place
(`src/config/site.ts`) once the client confirms real branding.

## Future data source

The "Featured vehicles" and "Recently sold vehicles" sections, and the real `/cars`/`/recently-sold`
pages, will read from **PostgreSQL** (via Prisma) once vehicle inventory is synced from **Auto Trader
Connect**. No vehicle schema, sync logic, or mock inventory exists yet — this phase only establishes
where that data will eventually render.
