# AutoTrader Dealership Platform

A production-grade, premium automotive dealership website. This repository is the foundation of a
flagship internal project that will eventually integrate with **Auto Trader Connect APIs**
(Stock Sync, Search, Webhooks, Valuations, etc.).

> **Status:** Phase 2.1 — Homepage Hero & Public Route Scaffolding, plus a hero-elevation pass, an
> information-architecture expansion, and a hero-composition & typography pass. No vehicle listings,
> backend/Auto Trader integration, or authentication have been implemented yet. Phase 2.1 added the
> real homepage (dark cinematic hero + structural section foundation) and temporary
> "content in progress" shells so navigation no longer 404s. A follow-up pass elevated the hero into a
> two-column layout with a placeholder vehicle image, richer layered background/motion, and a matching
> Header size bump. Navigation was then expanded to `Home`, `Cars`, `Recently Sold`, `Finance`,
> `Warranty`, `Sell Your Car`, `About`, `Contact` based on researched premium-dealership information
> architecture (see [`docs/research/`](./docs/research/README.md)). Most recently, the hero composition
> was widened to a ~44/56 two-column split with a bigger cinematic headline, the floating
> "Featured vehicle" card was permanently removed in favour of an integrated caption, and the display
> typeface changed to `Manrope` (see [`docs/homepage.md`](./docs/homepage.md)) — on top of the Phase
> 1.4 application shell and Phase 1.3 design system.

---

## Tech Stack

| Concern          | Choice                                                                          |
| ---------------- | ------------------------------------------------------------------------------- |
| Framework        | [Next.js](https://nextjs.org) (App Router)                                      |
| Language         | TypeScript (strict mode)                                                        |
| Styling          | [Tailwind CSS](https://tailwindcss.com)                                         |
| Package manager  | [pnpm](https://pnpm.io)                                                         |
| Linting          | ESLint (flat config)                                                            |
| Formatting       | Prettier + `prettier-plugin-tailwindcss`                                        |
| Version control  | Git                                                                             |
| Containerization | Docker (PostgreSQL only — the app itself is not containerized)                  |
| Database         | PostgreSQL 16 (local, via Docker Compose)                                       |
| ORM              | [Prisma ORM](https://www.prisma.io) 7 (`@prisma/client` + `@prisma/adapter-pg`) |
| UI components    | [shadcn/ui](https://ui.shadcn.com) (style `radix-nova`, Radix UI primitives)    |
| Icons            | [lucide-react](https://lucide.dev)                                              |
| Animation        | [Motion for React](https://motion.dev) (`motion` package)                       |
| Variant styling  | `class-variance-authority`, `clsx`, `tailwind-merge`                            |
| Auth             | _(added in a later phase)_                                                      |

Only foundation, data-layer, and design-system dependencies are present so far — no auth, business
logic, or Auto Trader integration packages yet.

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`corepack enable` or `npm install -g pnpm`)

### Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in any values you have
pnpm db:start                # starts local PostgreSQL via Docker (see "Local Database" below)
pnpm db:migrate              # applies migrations
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).
The Next.js app always runs on the host via `pnpm dev` — only PostgreSQL runs in Docker.

---

## Development Commands

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Start the Next.js development server           |
| `pnpm build`        | Create a production build                      |
| `pnpm start`        | Run the production build                       |
| `pnpm lint`         | Lint the codebase with ESLint                  |
| `pnpm lint:fix`     | Lint and auto-fix fixable issues               |
| `pnpm format`       | Format the codebase with Prettier              |
| `pnpm format:check` | Check formatting without writing changes       |
| `pnpm typecheck`    | Run the TypeScript compiler in `--noEmit` mode |

### Database commands

| Command            | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `pnpm db:start`    | Start the local PostgreSQL container (Docker)                                      |
| `pnpm db:stop`     | Stop the container, keep it and its data                                           |
| `pnpm db:down`     | Remove the container (and network), **keep the data volume**                       |
| `pnpm db:logs`     | Follow PostgreSQL container logs                                                   |
| `pnpm db:status`   | Show container status/health                                                       |
| `pnpm db:reset`    | **Destructive.** Deletes the local data volume entirely (prompts for confirmation) |
| `pnpm db:generate` | Generate Prisma Client from `prisma/schema.prisma`                                 |
| `pnpm db:migrate`  | Create + apply a development migration                                             |
| `pnpm db:validate` | Validate `prisma/schema.prisma`                                                    |
| `pnpm db:format`   | Format `prisma/schema.prisma`                                                      |
| `pnpm db:studio`   | Open Prisma Studio to browse local data                                            |
| `pnpm db:check`    | Standalone CLI: verifies the app can connect to PostgreSQL                         |

---

## Folder Structure

```
.
├── .github/workflows/     # CI/CD pipeline definitions (reserved, none yet)
├── .vscode/                # Recommended editor settings & extensions
├── docs/                   # Architecture decision records & deeper docs
├── prisma/
│   ├── schema.prisma        # Prisma schema (datasource + generator + models)
│   └── migrations/           # Committed SQL migrations (generated by `pnpm db:migrate`)
├── public/                 # Static assets served as-is
├── scripts/
│   ├── check-db-connection.ts  # `pnpm db:check` — standalone DB connectivity CLI
│   └── db-reset.mjs             # `pnpm db:reset` — destructive local DB reset (with confirmation)
├── src/
│   ├── app/                # Next.js App Router routes, layouts, and pages
│   │   ├── globals.css       # Design tokens (colour/spacing/shape/motion) + Tailwind theme mapping
│   │   ├── layout.tsx         # Root layout — <html>/<body>, fonts, siteConfig-based metadata
│   │   ├── (public)/          # Public route group: skip link + Header + <main> + Footer
│   │   │   ├── page.tsx           # Homepage: Hero + structural sections
│   │   │   ├── _components/       # Homepage-only section components (not routes)
│   │   │   └── cars/, recently-sold/, finance/, warranty/, sell-your-car/, about/, contact/
│   │   │       # Temporary "content in progress" shells
│   │   └── design-system/    # Temporary internal design-system preview route (remove before prod)
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives + typography + project button/badge/form wrappers
│   │   └── layout/          # PageShell/Container/Section/SectionHeader + Header/Footer/Hero/BrandMark/nav
│   ├── config/              # Centralized, typed app configuration & env parsing (site.ts, navigation.ts)
│   ├── features/            # Feature/domain modules (vehicle-listings, admin-dashboard, auth)
│   ├── hooks/               # Shared, cross-feature React hooks
│   ├── integrations/        # Typed clients/adapters for third-party APIs (autotrader, email)
│   ├── lib/                 # Framework-agnostic utilities (logger, analytics, motion, cn() helper)
│   ├── server/
│   │   ├── api/               # Route Handler helpers (reserved)
│   │   ├── auth/               # Server-side auth logic (reserved)
│   │   └── db/
│   │       ├── prisma.ts         # Singleton Prisma Client (server-only)
│   │       └── generated/        # Generated Prisma Client (gitignored, `pnpm db:generate`)
│   ├── services/            # Business/domain logic orchestrating integrations + db
│   ├── styles/              # Reserved for design tokens beyond globals.css (empty for now)
│   └── types/               # Shared TypeScript types/interfaces
├── tests/                   # unit / integration / e2e test suites (reserved, none yet)
└── docker-compose.yml       # Local PostgreSQL only — the Next.js app is not containerized
```

Every non-trivial folder contains a `README.md` explaining its purpose and boundaries — read those
before adding code to a given layer.

---

## Coding Conventions

- **TypeScript strict mode is on** (plus `noUncheckedIndexedAccess`, `noImplicitReturns`,
  `noFallthroughCasesInSwitch`, `forceConsistentCasingInFileNames`). Do not weaken these settings.
- **Feature-first organization**: business/domain code lives under `src/features/*`; cross-cutting
  concerns live under `lib`, `services`, `integrations`, or `server`.
- **Server/client boundary is explicit**: anything under `src/server` must never be imported from
  client components. `src/server/db/prisma.ts` is marked with the `server-only` package so this is
  enforced at build time, not just by convention.
- **Prisma is the only database access layer.** Docker only ever provisions PostgreSQL itself —
  application code (including any future Auto Trader sync logic) talks to the database exclusively
  through Prisma, never with raw drivers or a second ORM.
- **External payloads are never the internal domain model.** When Auto Trader integration lands,
  its API responses will be normalized into our own Prisma models — not persisted as-is.
- **No business logic in `components/ui`**: primitives stay purely presentational.
- **Design tokens over ad-hoc values**: use the semantic Tailwind utilities generated from
  `globals.css` (`bg-surface-page`, `text-text-secondary`, `rounded-card`, `px-page-mobile`, …)
  instead of raw hex/px values — see [`docs/design-system.md`](./docs/design-system.md).
- **Compose, don't duplicate, shadcn/ui primitives**: project-specific components (`PrimaryButton`,
  `StatusBadge`, `FormField`, etc.) wrap `components/ui/*` rather than re-implementing them.
- **Dealership info lives only in `src/config/site.ts`**: never hardcode a phone number, address, or
  nav link inside a component — see [`docs/application-shell.md`](./docs/application-shell.md).
- **Public vs. admin shells stay separate**: public routes live under `src/app/(public)/`; a future
  admin dashboard gets its own route group/layout and must not import the public `Header`/`Footer`.
- **Naming**: `kebab-case` for folders and non-component files, `PascalCase` for React components,
  `camelCase` for variables/functions, `SCREAMING_SNAKE_CASE` for environment variable names.
- **Imports** use the `@/*` path alias rooted at `src/` instead of deep relative paths.
- **Mobile-first**: all styling should be written mobile-first (base styles for small screens,
  `sm:`/`md:`/`lg:` Tailwind breakpoints layered on top).
- **No dead code, no placeholder components, no speculative pages.** Only build what's needed for
  the current phase.
- Formatting is enforced by Prettier and is not a matter of personal preference; run `pnpm format`
  before committing.

---

## Local Database

PostgreSQL runs locally in Docker; **the Next.js app does not** — keep running it with `pnpm dev`
on the host. Prisma is the only database access layer; nothing outside `src/server/db` should talk
to PostgreSQL directly.

### Prerequisites

- Docker Desktop (or an equivalent Docker Engine) installed and running.

### 1. Environment setup

```bash
cp .env.example .env.local
```

Fill in `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_HOST` / `POSTGRES_PORT`
and `DATABASE_URL` (sensible local defaults are already pre-filled in `.env.example`). These are
**one source of truth**: `docker-compose.yml` is started with `--env-file .env.local`, so the
`POSTGRES_*` values it uses to create the container are the exact same values encoded in
`DATABASE_URL`. If you change one, update the other:

```
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<POSTGRES_HOST>:<POSTGRES_PORT>/<POSTGRES_DB>?schema=public"
```

`.env.local` is git-ignored — it never leaves your machine. `.env.example` only ever contains
placeholders or clearly-local-only defaults, never real secrets.

### 2. Start PostgreSQL

```bash
pnpm db:start     # docker compose up -d
pnpm db:status    # wait until STATUS shows "healthy"
```

### 3. Run migrations & generate the client

```bash
pnpm db:migrate     # creates/applies a dev migration from prisma/schema.prisma
pnpm db:generate     # regenerates the Prisma Client into src/server/db/generated
```

`pnpm db:migrate` already runs `prisma generate` implicitly the first time tables change; run
`pnpm db:generate` explicitly any time you only change generator options, or after pulling schema
changes from git without a new migration.

### 4. Test connectivity

```bash
pnpm db:check
```

This runs `scripts/check-db-connection.ts`, a standalone CLI that connects via Prisma, runs a safe
`SELECT 1`, counts `SystemHealth` rows, and always disconnects — printing a clear success or error
message. It never starts a server or exposes an API route.

### 5. Prisma Studio

```bash
pnpm db:studio
```

Opens a local GUI (usually on `http://localhost:5555`) to browse and edit data in the dev database.

### 6. Stopping PostgreSQL

```bash
pnpm db:stop     # stop the container, keep it + its data (fastest to resume)
pnpm db:down     # remove the container/network, but KEEP the named volume (no data loss)
pnpm db:reset    # DESTRUCTIVE — deletes the named volume, i.e. all local data. Prompts to confirm.
```

`docker compose down` (used by `pnpm db:down`) never deletes named volumes on its own — only
`down --volumes` (used by `pnpm db:reset`) does. Use `db:down`/`db:stop` for routine shutdowns and
reserve `db:reset` for when you deliberately want a clean slate.

### Troubleshooting

**Port 5432 already in use** (e.g. a system-wide Postgres install, or another project's container):

- Either stop whatever else is using port 5432, or
- Set `POSTGRES_PORT` in `.env.local` to a free port (e.g. `5433`) and update `DATABASE_URL`'s port
  to match, then re-run `pnpm db:start`.

**App/Prisma can't connect to the database:**

- Confirm the container is healthy: `pnpm db:status`.
- Confirm `DATABASE_URL` in `.env.local` matches the `POSTGRES_*` values exactly (user, password,
  db name, host, port).
- Check container logs for startup errors: `pnpm db:logs`.
- If credentials in `.env.local` changed after the volume was already created, Postgres will not
  retroactively apply them — either match `.env.local` back to what the volume was created with, or
  run `pnpm db:reset` to start over (destroys local data).
- Run `pnpm db:check` for a precise connection error message.

---

## Design System

Phase 1.3 introduced the design-system foundation: shadcn/ui primitives (`Button`, `Input`,
`Textarea`, `Badge`, `Separator`, `Sheet`, `Dialog`, `Skeleton`), colour/spacing/shape/motion design
tokens, a typography system (`Geist` for body/nav/metadata/buttons + `Manrope` for display headings —
swapped from an initial `Bricolage Grotesque` during the hero-composition pass), layout
primitives (`PageShell`, `Container`, `Section`, `SectionHeader`), project-specific component
wrappers (`PrimaryButton`, `SecondaryButton`, `GhostButton`, `IconButton`, `StatusBadge`,
`FormField`, `EmptyState`, `LoadingCard`), and a small optional motion-utilities module
(`src/lib/motion`).

Full reference: [`docs/design-system.md`](./docs/design-system.md).

Visual QA preview (internal, dev-only, remove/protect before production):

```bash
pnpm dev
# then open http://localhost:3000/design-system
```

---

## Application Shell

Phase 1.4 introduced the responsive application shell: a typed site configuration
(`src/config/site.ts`) and navigation model (`src/config/navigation.ts`), a responsive `Header`
(desktop nav + shadcn `Sheet`-based mobile menu), a premium dark `Footer`, a temporary text-based
`BrandMark`, and a `(public)` route group layout (skip link + Header + `<main>` + Footer) kept
separate from the root layout so a future admin shell won't inherit it. Phase 2.1 changed `Header` to
`fixed` positioning with a new `variant="auto"` default (transparent over the homepage hero, solid
everywhere else); the later hero-elevation pass then bumped its height (`h-16 sm:h-20`), brand mark, and
nav sizing so its scale matches the redesigned hero — see the next section.

Full reference: [`docs/application-shell.md`](./docs/application-shell.md).

---

## Homepage

Phase 2.1 built the real homepage: a dark cinematic `Hero` with animated headline/CTAs, and a
structural foundation of lightweight sections below it (value proposition, two inventory placeholders,
an "about us" teaser, and a closing contact CTA) that will become data-driven once vehicle data exists.
`Cars`, `Recently Sold`, `Finance`, `Warranty`, `Sell Your Car`, `About`, and `Contact` now render
temporary "content in progress" shells (`PagePlaceholder`) instead of 404ing — the expanded set matches
premium-dealership information architecture researched in
[`docs/research/seymour-pope-analysis.md`](./docs/research/seymour-pope-analysis.md).

A follow-up hero-elevation pass then reworked the hero itself: a responsive two-column layout (copy
left, vehicle visual right on `lg:` and up) inside a wider `<Container size="wide">`, a generated
placeholder vehicle image (`HeroVehicle` — brandless, no real dealership photo yet, see
`docs/homepage.md`) with slow floating motion and a floating "Featured vehicle" info card, a richer
layered CSS/SVG background, a multi-line staggered headline animation, premium CTA hover/elevation, a
minimal placeholder trust strip, and a smoother, bottom-pinned scroll indicator.

A later hero-composition pass widened the split to ~44/56, capped the hero container at 1504px,
enlarged the headline (now two naturally-wrapping lines, `Premium Vehicles, Honestly Presented.`),
**permanently removed the floating "Featured vehicle" card** in favour of a plain integrated caption
above the vehicle image, added a radial edge fade + restrained bronze rim light so the image has no
visible rectangular boundary, refreshed the CTA copy (`Browse Inventory` / `Contact Sales`), and
polished the Header's brand mark/nav spacing/Call Us button to match the larger hero.

Full reference: [`docs/homepage.md`](./docs/homepage.md).

---

## Future Roadmap (High Level)

1. **Phase 1.1 — Foundation** _(done)_: project scaffolding, tooling, structure.
2. **Phase 1.2 — Local database foundation** _(done)_: PostgreSQL via Docker, Prisma schema
   and client setup, migration + connectivity verification. No domain schema yet.
3. **Phase 1.3 — Design system** _(done)_: shadcn/ui integration, design tokens, typography,
   layout primitives, reusable UI wrappers, motion utilities, `/design-system` preview.
4. **Phase 1.4 — Application shell & navigation** _(done)_: site/navigation configuration,
   responsive Header/Footer, public vs. admin layout boundary.
5. **Phase 2.1 — Homepage hero & public route scaffolding** _(done)_: real homepage
   (hero + structural sections), temporary shells for the remaining public routes.
6. **Hero elevation pass** _(done)_: two-column hero layout, placeholder vehicle image + motion,
   layered background, premium CTA/scroll-indicator polish, matching Header size bump.
7. **Information architecture expansion** _(done)_: competitor IA research (`docs/research/`),
   navigation expanded to `Finance`/`Warranty`/`Sell Your Car`, matching placeholder routes.
8. **Hero composition & typography pass** _(this phase)_: wider ~44/56 two-column hero, `Manrope`
   display font, floating "Featured vehicle" card permanently removed, refreshed CTA copy, Header
   proportions polished to match.
9. **Phase 1.5 — Authentication**: session/auth strategy for staff and customer accounts.
10. **Phase 2.2+ — Vehicle Listings**: search, filtering, and listing detail pages, backed by
    PostgreSQL once vehicle data is synced from Auto Trader Connect — see
    [`docs/research/autotrader-planned-integration.md`](./docs/research/autotrader-planned-integration.md).
11. **Phase 3 — Auto Trader Connect integration**: Stock Sync, Search, Webhooks, Valuations. Requires
    the official Auto Trader API documentation before any implementation begins.
12. **Phase 4 — Admin Dashboard**: internal tooling for dealership staff (own layout — see
    [`docs/application-shell.md`](./docs/application-shell.md) → "Public vs. future admin layout boundary").
13. **Phase 5 — Analytics, logging, and observability**.
14. **Phase 6 — Testing strategy and CI/CD pipelines**.

---

## Environment Variables

See [`.env.example`](./.env.example) for the full list of variables the application will need
across upcoming phases. Copy it to `.env.local` and fill in values as each phase requires them —
never commit real secrets. See "Local Database" above for how the `POSTGRES_*` variables and
`DATABASE_URL` correspond. `DATABASE_URL` is intentionally never prefixed with `NEXT_PUBLIC_`, since
it must never be exposed to the browser.
