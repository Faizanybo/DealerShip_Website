# Competitor Research: Seymour Pope (Information Architecture Only)

**Purpose:** understand how an established, premium UK performance/prestige car dealership organizes
its site — navigation, page hierarchy, and customer journey — so our own information architecture is
grounded in real dealership conventions rather than invented from scratch.

**Scope boundary:** this document records only structural/organizational observations (what pages exist,
how they relate, what each page is for). It intentionally does **not** describe or reference the
reference site's layout, styling, typography, colours, branding, animations, components, imagery, or
wording. Nothing in this document was copied — see
[`docs/research/README.md`](./README.md#why-we-do-not-copy-competitors) for why.

Reference site: `https://www.seymourpope.com/` (accessed for this research only; UK independent
performance/prestige used-car dealership).

---

# Website Overview

Seymour Pope is a small, independent, family-run UK dealership specializing in used performance and
prestige vehicles (BMW/Alpina, Audi, Mercedes-Benz, Porsche, Range Rover, and similar marques). The site
is a single-location, inventory-led marketing site: its primary job is to showcase current stock, build
trust (testimonials, warranty, finance), and funnel visitors toward buying, selling, or part-exchanging a
car — not a multi-location enterprise site or a marketplace.

# Navigation Structure

Observed top-level pages (confirmed by requesting each URL directly):

| Page                   | Path                                                                     | Purpose                                                          |
| ---------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Home                   | `/`                                                                      | Brand introduction, stock teaser, trust signals, directions      |
| Stock / vehicle search | (linked from "View Our Stock"; exact path not recorded — see note below) | Full current inventory, filterable                               |
| Recently Sold          | `/recently-sold`                                                         | Sold-vehicle showcase, filterable by make, "Sold" badge on each  |
| Finance                | `/finance`                                                               | Explains available finance product types + an enquiry form       |
| Warranty               | `/warranty`                                                              | Explains the warranty package offered + an enquiry form          |
| Sell Your Car          | `/sell-your-car`                                                         | Part-exchange / sell-outright info + a detailed enquiry form     |
| Testimonials           | `/testimonials`                                                          | Long-form customer reviews                                       |
| Contact Us             | `/contact-us`                                                            | Address, opening hours, enquiry form                             |
| Vehicle detail         | `/vehicle-details/...` (per-vehicle slug)                                | One page per individual vehicle, linked from stock/recently-sold |

Note: no dedicated "About Us" page was found (`/about` and `/about-us` both 404) — company background
(20+ years, family-run, specialisms) is folded directly into the homepage introduction rather than living
on its own page. We deliberately still plan a dedicated `About` page (see "Elements We Intentionally
Improve") since that's a common, useful pattern on comparable premium dealership sites even where this
particular one omits it.

No mega-menu or nested dropdown navigation was observed — it appears to be a flat, single-level top nav.

# Public Pages

- **Home** — brand intro, "why us" framing, three short feature teasers (Recently Sold / Finance /
  Warranty) each linking to their own page, a testimonials excerpt, a "find us" / directions block, and a
  grid of current stock ("Our Latest Vehicles").
- **Stock/search** — the full inventory, presumably filterable (not fully inspected — out of scope for
  this IA-only pass).
- **Recently Sold** — a filterable, sortable grid of sold vehicles (sort by price/make/year; filter by
  make via query parameters), each card marked "Sold" and linking to that vehicle's own detail page.
- **Vehicle detail** — one page per vehicle (year, mileage, fuel type, gearbox, price, photo count,
  "View Vehicle" / "Reserved" state).
- **Finance** — short explanation of finance product types offered (e.g. hire purchase, PCP-style
  arrangements) plus a lead-capture form.
- **Warranty** — short explanation of the warranty package plus a lead-capture form.
- **Sell Your Car** — explains part-exchange vs. selling outright, plus a detailed lead-capture form
  (registration, mileage, service history, MOT status, contact details).
- **Testimonials** — a long list of quote-style customer reviews with first name/surname.
- **Contact Us** — address, phone, email, a table of opening hours by day, and a contact form.

# Homepage Sections

In observed order:

1. Hero/intro statement (brand name + short "who we are" paragraph).
2. "A Passion for Performance" — stock teaser with a "View Our Stock" call to action.
3. Three feature teasers, each with a "More Details" link: Recently Sold, Finance, Warranty.
4. A rotating excerpt of customer testimonials + a "View Testimonials" link.
5. "Visiting Us" — a short directions blurb ("10 minutes from junction 5 M1", etc.) + a "Get Directions"
   link.
6. "Our Latest Vehicles" — a grid of current stock cards (image, spec line, price, "View Vehicle" /
   "Reserved" badge).

# Primary User Journey

The dominant journey is straightforwardly inventory-led:

**Discover → Browse stock → View a vehicle → Contact/enquire → (optionally) arrange finance/warranty →
Purchase**, with a secondary journey for existing car owners: **Sell Your Car → submit valuation
details → be contacted**. Trust-building content (testimonials, warranty, "visit us" directions) is
woven in throughout rather than isolated to one page, which reduces the number of clicks needed before a
visitor trusts the dealer enough to enquire.

# Features Observed

- Filterable/sortable vehicle grids (stock and recently-sold), with make-based filtering via query
  parameters.
- Per-vehicle detail pages with a consistent spec line (year, mileage, fuel, gearbox) and price.
- "Sold" / "Reserved" status badges on vehicle cards.
- Lead-capture forms embedded directly on Finance, Warranty, and Sell Your Car pages (not just a single
  generic contact form) — each form is tailored to that page's intent.
- A dedicated Recently Sold page as social proof / stock-turnover signal, separate from current stock.
- Testimonials as their own page, not just a homepage carousel.
- Clear physical-visit framing (opening hours, directions, distance-from-landmarks copy) — this is a
  showroom-first, not marketplace-first, business.

# Information Architecture

```
Home
├── (Stock / vehicle search)         → per-vehicle detail pages
├── Recently Sold                    → per-vehicle detail pages
├── Finance
├── Warranty
├── Sell Your Car
├── Testimonials
└── Contact Us
```

Flat, single level — no sub-navigation, no mega menu. Vehicle detail pages are the one dynamic,
data-driven leaf; everything else is static marketing/informational content plus a lead form.

# Elements Worth Keeping Conceptually

These are structural/organizational ideas we plan to keep (reimplemented independently, with our own
design language and copy — nothing here is a description of _how it looks_):

- A flat, single-level navigation covering: browse stock, recently sold, finance, warranty, selling your
  car, and contact — visitors shouldn't need more than one click to reach any of these from anywhere on
  the site.
- Treating "Recently Sold" as a distinct, navigable page (not buried inside the main stock listing) —
  it's useful social proof and a stock-turnover signal independent of current inventory.
- Grouping finance and warranty as their own top-level pages rather than folding them into an FAQ —
  they're common buyer questions and deserve direct navigation entries.
- A dedicated page for people looking to sell/part-exchange, distinct from people looking to buy.
- Vehicle detail pages as the one place with genuinely dynamic, per-item data.

# Elements We Intentionally Improve

- **A dedicated `About` page.** The reference site has no equivalent — we're keeping ours because it's a
  useful trust-building page for a premium brand and a common pattern on comparable sites.
- **No embedded third-party form widgets/CAPTCHAs directly in the markup.** Any future lead forms will
  be built as first-class, accessible, our-own-design-system components rather than an embedded
  third-party form service.
- **Modern rendering.** Next.js App Router with Server Components by default, rather than a traditional
  server-rendered CMS template — better performance, and animation is deliberate/isolated rather than
  page-wide.
- **Deliberate, restrained motion.** Reduced-motion-safe entrance/hover animation throughout (see
  `docs/design-system.md`), rather than static page loads.
- **Consistent design system.** One typography/colour/spacing/motion system across every page (see
  `docs/design-system.md`), rather than page-by-page styling.
- **Accessibility as a first-class requirement.** Semantic HTML, keyboard support, visible focus states,
  and `prefers-reduced-motion` support across the whole shell (see `docs/application-shell.md`) — not
  observed/verifiable on the reference site and not something we're carrying over "as-is" either way.

# Modern Improvements Planned

- Vehicle inventory and recently-sold data will come from **our own PostgreSQL database**, populated by
  syncing from **Auto Trader Connect** — not a bespoke dealership CMS — see
  [`docs/research/autotrader-planned-integration.md`](./autotrader-planned-integration.md).
- Lead-capture forms (Finance/Warranty/Sell Your Car) will be built as accessible, first-party
  components once those pages move past the placeholder stage — no third-party embedded form widgets.
- Filtering/sorting for Cars and Recently Sold will be implemented as fast, client-friendly UI backed by
  our own database query layer, once vehicle data exists.

---

**Reference Website** — the observations above describe `seymourpope.com` as encountered during this
research pass only.

**Our Planned Implementation** — see [Objective 2 in the navigation update](../application-shell.md) and
`src/config/navigation.ts` for what we actually built: `Home`, `Cars`, `Recently Sold`, `Finance`,
`Warranty`, `Sell Your Car`, `About`, `Contact` — the same information-architecture shape, our own naming
("Cars" instead of a bare stock link), our own design system, and no content, wording, or visuals carried
over.
