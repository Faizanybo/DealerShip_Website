# `docs/research`

Research and planning notes that inform decisions elsewhere in the codebase, without themselves being
implementation. Nothing in this folder is user-facing, and nothing here should be treated as an approved
design, API contract, or content source — it's the reasoning trail behind decisions made in
`src/config/navigation.ts`, future vehicle-data work, and similar.

## Why competitor research exists

Before inventing an information architecture from scratch, it's faster and lower-risk to look at how
established, comparable businesses (premium/prestige UK car dealerships) actually organize their sites —
what pages they offer, how navigation is structured, and what the primary customer journey looks like.
That research lives here as a dated, scoped document per site studied, e.g.
[`seymour-pope-analysis.md`](./seymour-pope-analysis.md).

## Why we do not copy competitors

Research informs **structure and organization only** — which pages exist and how they relate. It never
extends to layout, styling, typography, colour, spacing, branding, animation, components, imagery, or
wording. Every research document in this folder explicitly separates **"Reference Website"**
observations from **"Our Planned Implementation"** so that boundary stays visible, and every
implementation that follows uses our own existing design system (`docs/design-system.md`), our own
components, and our own copy. This keeps us legally safe, keeps the product genuinely ours, and matches
the explicit instruction (repeated across every phase of this project) that reference sites are for
inspiration/structure only, never for direct reproduction.

## Why architecture documentation is maintained

Information architecture decisions (what routes exist, what navigation looks like, what will eventually
be data-driven) affect many parts of the codebase — `src/config/navigation.ts`, the Header/Footer, page
metadata, and eventually the database schema. Recording _why_ a page exists or _why_ navigation is
ordered a certain way here means future phases (including a future Auto Trader integration phase) don't
have to re-derive that reasoning or accidentally re-litigate it.

## Where future Auto Trader research will live

Planning notes about the eventual Auto Trader Connect integration — which pages are expected to become
data-driven, what's still undecided, and (once available) notes distilled from the official Auto Trader
API documentation — live in [`autotrader-planned-integration.md`](./autotrader-planned-integration.md).
Any future research into specific Auto Trader API endpoints/behaviour should be added as new, clearly
dated documents in this same folder once the official documentation has actually been reviewed — never
invented ahead of time.
