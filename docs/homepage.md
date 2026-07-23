# Homepage & Public Route Scaffolding (Phase 2.1 + Hero Elevation + Hero Composition + Intro Motion + Studio Lighting)

Foundation-only. This documents the homepage hero, the homepage's structural section foundation, and
the temporary "content in progress" shells for the other public routes introduced in Phase 2.1, the
hero-elevation pass (two-column layout, placeholder vehicle image, richer motion), the hero-composition
pass (wider two-column split, Manrope display font, removed floating card), and the later
featured-vehicle intro pass (one-time animated "OUR FEATURE VEHICLE" text before the vehicle reveals —
timing/state-machine detail lives in [`docs/motion-guidelines.md`](./motion-guidelines.md), not
repeated here). It does **not** cover vehicle listings, filtering, or any backend/Auto Trader
integration — those are later phases. See also [`docs/design-system.md`](./design-system.md)
(tokens/typography/motion) and [`docs/application-shell.md`](./application-shell.md)
(Header/Footer/navigation).

## Route status

| Route            | Status                                                     |
| ---------------- | ---------------------------------------------------------- |
| `/`              | Real hero + structural section foundation                  |
| `/cars`          | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/recently-sold` | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/finance`       | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/warranty`      | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/sell-your-car` | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/about`         | Temporary "content in progress" shell (`PagePlaceholder`)  |
| `/contact`       | Temporary shell + real phone/email links from `siteConfig` |

None of these are final designs. `/cars` and `/recently-sold` in particular are placeholders until
vehicle data exists — see "Future data source" below and
[`docs/research/autotrader-planned-integration.md`](./research/autotrader-planned-integration.md).
`/finance`, `/warranty`, and `/sell-your-car` were added to match a premium dealership's typical
information architecture (see
[`docs/research/seymour-pope-analysis.md`](./research/seymour-pope-analysis.md)) — they stay
static/marketing-only placeholders with no data dependency.

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
  floating motion, its ambient spotlight/rim-light/floor-reflection glows, and (until it completes) the
  one-time `FeaturedVehicleIntro` text sequence overlaid in the same box. Isolated from `HeroContent` so
  the two animate independently without re-rendering each other. There is **no floating info card** here
  (see "Removed: floating vehicle card" below).
- **`FeaturedVehicleIntro`** (`featured-vehicle-intro.tsx`, Client Component) — the one-time
  character-by-character "OUR FEATURE VEHICLE" intro that plays before the vehicle reveals. Full
  detail — stages, timing, reduced-motion behavior — lives in
  [`docs/motion-guidelines.md`](./motion-guidelines.md) rather than duplicated here.
- **`HeroScrollIndicator`** (`hero-scroll-indicator.tsx`, Client Component) — the looping scroll cue,
  positioned `absolute` on the section itself (not inside either column) so it stays pinned to the
  hero's bottom edge regardless of how tall the copy or the vehicle visual end up being.

Content comes from props passed by `(public)/page.tsx`. The headline is authored as
`headlineLines: string[]` (currently `siteConfig.tagline` reworded into two short lines) so each line can
animate in on its own beat — it still renders as a single semantic `<h1>` (see "Accessibility" below).

### Layout: two columns on `lg:` and up

`Hero` lays out `HeroContent` (~44%) and `HeroVehicle` (~56%) side by side from `lg:` upward
(`grid-cols-[0.8fr_1fr]`), inside a `<Container size="wide">` (94rem / 1504px cap, vs. the standard
80rem — see `container.tsx`) so the hero uses meaningfully more of the available desktop width than
standard page content, landing inside the ~1440–1520px target composition width. Below `lg:`, the grid
collapses to a single stacked column — copy first, vehicle visual below — so the message reads first
and the visual reinforces it on the way down, without needing a second, mobile-only layout to maintain.

### Hero headline (`src/components/layout/hero-content.tsx`)

`headlineLines` is authored as **two** short lines — `['Premium Vehicles,', 'Honestly Presented.']` —
not one word per line. Each line is its own `motion.span` (so it can animate in on its own beat) but is
still free to soft-wrap on its own if the column is too narrow for it, helped by `text-balance` on
`<Display>` (which prevents an awkward one-word orphan on the wrapped line). That's why the visual line
count isn't fixed: on a narrow `lg:` column with the large hero type size, "Premium Vehicles," can wrap
into two visual lines (≈3 total with "Honestly Presented."), while on mobile's full-width, smaller-type
single column both authored lines are more likely to fit as one visual line each (≈2 total). This is
intentional per the hero-composition brief ("allow the layout to break this naturally... do not force
every word onto a separate line") rather than a bug.

### Hero vehicle image (`src/components/layout/hero-vehicle.tsx`)

`public/images/placeholder/hero-vehicle.jpg` is a **generated placeholder image** (1400×933, ~73 KB) —
a generic, brandless dark sedan silhouette with no manufacturer logos, badges, or plates. It is
explicitly **not** real dealership photography and must be replaced with client-supplied photography
before production.

Rendered with `next/image` (`fill`, `priority` as the LCP candidate, `sizes="(min-width: 1280px) 42vw,
(min-width: 1024px) 50vw, 90vw"`), `object-contain object-[center_52%]` (slightly lowered for grounding),
layered drop-shadows, and a radial mask-image so no rectangular asset boundary is visible. The parent
`aspect-[4/3]` box reserves layout space before the image decodes — no CLS.

### Vehicle studio lighting (Subphase 2.1.4)

The right column is a self-contained CSS studio scene (`VehicleStudioScene` inside `hero-vehicle.tsx`),
using tokens from `globals.css` (`--hero-studio-*`, derived from `--brand-accent` and hero neutrals):

| Layer              | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| Dark radial base   | Local alcove depth inside the vehicle box                     |
| Bronze spotlight   | Radial pool behind the car; subtle opacity pulse after reveal |
| Vertical streak    | Restrained highlight (`sm:`+ only)                            |
| Floor illumination | Horizontal light pool under the vehicle                       |
| Edge vignette      | Softens box edges into the hero-wide background               |
| Inline SVG grain   | Texture without a network request (`sm:`+ only)               |

Vehicle integration (`VehicleVisual`): elliptical grounding shadow, CSS-only floor reflection (no
duplicated image), bronze rim-light glow, and refined edge mask. The hero-wide `HeroBackground` blooms
were toned down so the local studio lighting reads as one composition with the left copy column — not
two independent sections.

**Mobile reductions:** vertical streak, grain, and floor-reflection blur are omitted below `sm:`;
spotlight uses `blur-2xl` instead of `blur-3xl`. Ambient motion is disabled entirely under
`prefers-reduced-motion`.

Post-reveal ambient motion (~3px vertical float / 10s, spotlight and rim-light opacity drift) is
documented in [`docs/motion-guidelines.md`](./motion-guidelines.md) → "Post-reveal ambient motion".

### Text/image handoff — an overlay, not a stacked block

The `FeaturedVehicleIntro` text and the vehicle image both live **absolutely positioned inside the same
fixed `aspect-[4/3]` box**, not stacked in a flex column. That's a deliberate choice, not an
accident: swapping one for the other (once the intro finishes) never changes that box's height, so the
hero never shifts — on any viewport. The `<Image>` itself is mounted from the very first render (so
`priority` can actually start preloading it while the text plays) and simply starts at `opacity: 0`,
revealing via `hero-vehicle.tsx`'s `vehicleVariants` once the intro's `onIntroComplete` fires — no
fetch/decode delay right when it needs to appear. Full stage/timing detail:
[`docs/motion-guidelines.md`](./motion-guidelines.md).

### Removed: floating vehicle card

An earlier pass had a bordered "Featured vehicle" info card (icon + two lines of text) overlapping the
bottom-left of the vehicle image. It was **permanently removed** during the hero-composition pass — the
brief was explicit that the visual should read as one integrated scene, not a photo with a UI card
bolted onto it. Its component markup, the `Sparkles` icon import, and its dedicated entrance-animation
values were all deleted from `hero-vehicle.tsx`, not just hidden. It has not been reintroduced since —
the `FeaturedVehicleIntro` text that later replaced it is plain typography with no background, border,
or icon.

### Layered background (`HeroBackground` inside `hero.tsx`)

**No photo was added for the background itself** — the repository had no legally-suitable dealership
photography for a full-bleed background, and hotlinking a random production image was explicitly out of
scope. The background is a pure CSS/SVG treatment, layered so it supports the content instead of
competing with it:

1. A dark diagonal gradient (`oklch` stops) as the base.
2. A soft, blurred bronze "light bloom" (top-right) and a cooler blue one (bottom-left) for abstract
   depth — decorative only, not representational of anything.
3. A third, fainter light bloom centred behind where the vehicle sits on `lg:` — kept subtle because
   the vehicle box owns its local studio spotlight (see "Vehicle studio lighting" above).
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
- The trust-strip icons are `aria-hidden`; their adjacent text remains visible to assistive tech.
- The `FeaturedVehicleIntro` phrase is exposed once, in full, via a `sr-only` span; the animated
  character spans sit in a separately marked `aria-hidden="true"` container — see
  [`docs/motion-guidelines.md`](./motion-guidelines.md) for the full accessibility rationale.
- All hero motion (headline stagger, vehicle float/reveal, featured-vehicle intro, scroll indicator
  dot) is reduced-motion-safe — see `useReducedMotion` usage in each component.

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

`/cars`, `/recently-sold`, `/finance`, `/warranty`, `/sell-your-car`, `/about`, and `/contact` all render
`<PagePlaceholder>`: a `StatusBadge`
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
