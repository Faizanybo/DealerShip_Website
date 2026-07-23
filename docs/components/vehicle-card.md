# Vehicle card

Reusable premium inventory card for listing grids (homepage featured, `/cars`, recently sold,
similar vehicles). Phase **2.2.2**.

## Location

- `src/features/vehicles/components/vehicle-card.tsx` — main card (Server Component)
- `src/features/vehicles/components/vehicle-card-image.tsx` — image + fallback (Client)
- `src/features/vehicles/components/vehicle-status-badge.tsx` — status label mapping
- `src/features/vehicles/components/vehicle-card-motion.tsx` — optional list entrance (Client)

Import from `@/features/vehicles/components`.

## Data rule

Cards accept the normalized **`Vehicle`** type only. Fetch data through
**`@/services/vehicle.service`** in Server Components — never import raw mock arrays or Auto Trader
payloads.

## Props

| Prop         | Type                                | Default      | Purpose                              |
| ------------ | ----------------------------------- | ------------ | ------------------------------------ |
| `vehicle`    | `Vehicle`                           | required     | Domain record                        |
| `priority`   | `boolean`                           | `false`      | LCP image priority                   |
| `variant`    | `'standard' \| 'compact' \| 'sold'` | `'standard'` | Layout density / sold styling        |
| `showStatus` | `boolean`                           | `true`       | Reserved / coming soon / sold badges |
| `className`  | `string`                            | —            | Wrapper utility classes              |

`HIDDEN` or unpublished vehicles render `null`.

## Variants

- **standard** — full metadata (year, mileage, fuel, transmission), prominent price
- **compact** — tighter padding; year + mileage only (dense grids)
- **sold** — auto-applied when `vehicle.status === 'SOLD'`; muted image, no price, sold date, subdued CTA

## Status behaviour

Uses `getVehicleStatusLabel` and `VehicleStatusBadge` — no ad-hoc status strings.

- **Available** — no badge by default (clean forecourt look)
- **Reserved / Coming soon** — badge top-left on image
- **Sold** — destructive badge + sold date; price hidden
- **Hidden** — not rendered

## Image behaviour

- Aspect ratio **16:10** (matches loading skeleton)
- `next/image` with responsive `sizes`
- Local fallback: `/images/vehicles/mock/exterior-01.jpg`
- `onError` swaps to fallback (client subcomponent)
- Gallery images are **not** loaded — `featuredImage` only

## Motion & hover

- **CSS** (card lift, shadow, border, image scale, CTA arrow) — works without JS
- **`motion-reduce:`** disables transform transitions
- **`VehicleCardGrid` / `VehicleCardReveal`** — optional staggered entrance; wrap server-rendered cards as children

## Accessibility

- Semantic `<article>` + single `<Link>` to `/cars/[slug]`
- Descriptive `aria-label` on link (includes listing title)
- Status conveyed with text + dot (not colour alone)
- Previous price uses visible strike-through + `sr-only` “Previous price” prefix
- Visible `focus-visible` ring on card link
- Decorative CTA arrow marked `aria-hidden` (link name is sufficient)

## Responsive expectations

- Fluid width — safe in 1/2/3-column grids from 320px upward
- `line-clamp-2` on model and derivative
- Minimum ~44px touch target via link padding + CTA row

## Preview

Internal route: **`/design-system/vehicle-card`** (`noindex`). Demonstrates statuses, compact/sold
variants, long titles, and responsive grids.

## Future use

Phase 2.2.3+ will compose this card into `/cars`, homepage featured inventory, and recently sold
— without changing the card API.
