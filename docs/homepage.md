# Homepage & Public Route Scaffolding (Phase 2.1 + Hero Elevation)

Foundation-only. This documents the homepage hero, the homepage's structural section foundation, and
the temporary "content in progress" shells for the other public routes introduced in Phase 2.1, plus
the later hero-elevation pass (two-column layout, placeholder vehicle image, richer motion). It does
**not** cover vehicle listings, filtering, or any backend/Auto Trader integration — those are later
phases. See also [`docs/design-system.md`](./design-system.md) (tokens/typography/motion) and
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

Split into four pieces so only small, focused subtrees ship client JS:

- **`Hero`** (Server Component) — the dark section shell, layered background treatment, and the
  responsive two-column layout. Renders `<HeroBackground>` (purely decorative, `aria-hidden`), a
  `<Container size="wide">` wrapping a grid of `<HeroContent>` + `<HeroVehicle>`, and
  `<HeroScrollIndicator>` pinned to the section's own bottom edge.
- **`HeroContent`** (`hero-content.tsx`, Client Component) — eyebrow, headline, supporting text, CTAs,
  and the trust strip, animated in with a staggered fade-up (`useMotionVariants('staggerContainer')` /
  `'fadeUp'` from `src/lib/motion`, both reduced-motion-safe).
- **`HeroVehicle`** (`hero-vehicle.tsx`, Client Component) — the placeholder vehicle image, its slow
  floating motion, and the floating "Featured vehicle" info card. Isolated from `HeroContent` so the two
  animate independently without re-rendering each other.
- **`HeroScrollIndicator`** (`hero-scroll-indicator.tsx`, Client Component) — the looping scroll cue,
  positioned `absolute` on the section itself (not inside either column) so it stays pinned to the
  hero's bottom edge regardless of how tall the copy or the vehicle visual end up being.

Content comes from props passed by `(public)/page.tsx`. The headline is authored as
`headlineLines: string[]` (currently `siteConfig.tagline` split into three short lines) so each line can
animate in on its own beat — it still renders as a single semantic `<h1>` (see "Accessibility" below).

### Layout: two columns on `lg:` and up

`Hero` lays out `HeroContent` (~45%) and `HeroVehicle` (~55%) side by side from `lg:` upward
(`grid-cols-[0.82fr_1fr]`), inside a `<Container size="wide">` (96rem cap, vs. the standard 80rem — see
`container.tsx`) so the hero uses meaningfully more of the available desktop width than standard page
content. Below `lg:`, the grid collapses to a single stacked column — copy first, vehicle visual below —
so the message reads first and the visual reinforces it on the way down, without needing a second,
mobile-only layout to maintain.

### Hero vehicle image (`src/components/layout/hero-vehicle.tsx`)

`public/images/placeholder/hero-vehicle.jpg` is a **generated placeholder image** — a generic,
brandless dark sedan silhouette with no manufacturer logos, badges, or plates, shot as if in a dark
studio so it blends into the hero background. It is explicitly **not** real dealership photography and
must be replaced with client-supplied photography before production. It's rendered with `next/image`
(`fill`, `priority` since it's an above-the-fold LCP candidate, explicit `sizes`), `object-contain`, a
soft `drop-shadow`, and a bottom mask-image gradient so it fades into the hero background rather than
ending in a hard rectangular edge. A slow (`8s`, looping) vertical float is layered on top —
`prefers-reduced-motion` disables it entirely, leaving the image static.

The floating "Featured vehicle" card next to it is a **decorative visual element only** — it does not
read from any inventory data and must stay that way until real featured-vehicle logic exists.

### Layered background (`HeroBackground` inside `hero.tsx`)

**No photo was added for the background itself** — the repository had no legally-suitable dealership
photography for a full-bleed background, and hotlinking a random production image was explicitly out of
scope. The background is a pure CSS/SVG treatment, layered so it supports the content instead of
competing with it:

1. A dark diagonal gradient (`oklch` stops) as the base.
2. A soft, blurred bronze "light bloom" (top-right) and a cooler blue one (bottom-left) for abstract
   depth — decorative only, not representational of anything.
3. A third, fainter light bloom centred behind where the vehicle sits on `lg:`, echoed by a matching
   glow directly behind the vehicle in `HeroVehicle` — a subtle "studio rim light" effect.
4. A dark vignette gradient on top for text readability regardless of viewport.
5. A faint inline SVG grain (`feTurbulence`, encoded as a `data:` URI) so the gradient doesn't look
   flat — no network request, zero bytes over the wire beyond the inline markup.

Everything in `HeroBackground` is `aria-hidden="true"` (purely decorative, no text-in-image, nothing a
screen reader needs to announce).

### Header behavior on the hero

The Header is `fixed` (not `sticky`) so it can visually sit on top of the hero instead of pushing it
down — see [`docs/application-shell.md`](./application-shell.md#header-srccomponentslayoutheadertsx)
for the full mechanism (the `-mt-16 sm:-mt-20` / `pt-16 sm:pt-20` pull-up/compensation pair, updated
when the header grew from `h-16 sm:h-18` to `h-16 sm:h-20` during the hero-elevation pass so its scale
better matches the redesigned hero). In short: `Header`'s `variant="auto"` default renders transparent +
light text only on `/`, converging to the existing solid light style once scrolled past the top (same
`IntersectionObserver` sentinel as before). Every other route keeps the standard solid Header with no
extra configuration.

### Mobile height

The hero uses `min-h-svh` (small-viewport-height unit), **not** `h-screen`/`100vh` — `svh` already
accounts for mobile browser chrome (address bar, bottom toolbar) so the hero doesn't jump or leave a
gap as the browser UI shows/hides while scrolling. `min-h-svh` is a floor, not a fixed height: on narrow
phones the stacked copy + vehicle image can legitimately exceed one viewport, which is expected — the
scroll indicator hints at this rather than trying to force everything above the fold.

### Trust strip

The row of checkmarked items below the CTAs ("Carefully inspected vehicles", "Transparent pricing",
"Flexible finance") is **neutral placeholder copy**, passed as `trustItems: string[]` from
`(public)/page.tsx` with an inline comment marking it as such — replace with client-confirmed copy
before launch. No claims about actual inspection processes, pricing, or finance products are made.

### Accessibility notes specific to the hero

- The headline renders as one semantic `<h1>` even though it's visually split into `headlineLines`.
  Each visual line is a `motion.span` marked `aria-hidden="true"`; the full sentence lives in the
  heading's own `aria-label`, so screen readers announce it once, correctly, regardless of the visual
  line breaks.
- The hero vehicle image has a short, honest `alt="Premium vehicle"` — it is a real (if generic)
  vehicle image, not a purely decorative texture, so it isn't `alt=""`.
- The floating "Featured vehicle" card and trust-strip icons are `aria-hidden`; their adjacent text
  remains visible to assistive tech.
- All hero motion (headline stagger, vehicle float, floating card, scroll indicator dot) is
  reduced-motion-safe — see `useReducedMotion`/`useMotionVariants` usage in each component.

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
