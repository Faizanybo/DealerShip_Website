# AutoTrader Dealership Platform

A production-grade, premium automotive dealership website. This repository is the foundation of a
flagship internal project that will eventually integrate with **Auto Trader Connect APIs**
(Stock Sync, Search, Webhooks, Valuations, etc.).

> **Status:** Phase 1.2 — Local Database Foundation. No business logic, pages, or Auto Trader
> integrations have been implemented yet. This phase adds a local PostgreSQL + Prisma data layer on
> top of the Phase 1.1 project foundation.

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
| UI components    | shadcn/ui _(added in a later phase)_                                            |
| Animation        | Framer Motion _(added in a later phase)_                                        |

Nothing marked "later phase" is installed yet. Only foundation and data-layer dependencies are
present so far.

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
│   ├── components/
│   │   ├── ui/              # Reusable, presentation-only UI primitives
│   │   └── layout/          # App-wide structural layout components
│   ├── config/              # Centralized, typed app configuration & env parsing
│   ├── features/            # Feature/domain modules (vehicle-listings, admin-dashboard, auth)
│   ├── hooks/               # Shared, cross-feature React hooks
│   ├── integrations/        # Typed clients/adapters for third-party APIs (autotrader, email)
│   ├── lib/                 # Framework-agnostic utilities (logger, analytics helpers)
│   ├── server/
│   │   ├── api/               # Route Handler helpers (reserved)
│   │   ├── auth/               # Server-side auth logic (reserved)
│   │   └── db/
│   │       ├── prisma.ts         # Singleton Prisma Client (server-only)
│   │       └── generated/        # Generated Prisma Client (gitignored, `pnpm db:generate`)
│   ├── services/            # Business/domain logic orchestrating integrations + db
│   ├── styles/              # Design tokens & shared styling beyond globals.css
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

## Future Roadmap (High Level)

1. **Phase 1.1 — Foundation** _(done)_: project scaffolding, tooling, structure.
2. **Phase 1.2 — Local database foundation** _(this phase)_: PostgreSQL via Docker, Prisma schema
   and client setup, migration + connectivity verification. No domain schema yet.
3. **Phase 1.3 — Design system**: shadcn/ui integration, base design tokens, layout shell.
4. **Phase 1.4 — Authentication**: session/auth strategy for staff and customer accounts.
5. **Phase 2 — Vehicle Listings**: search, filtering, and listing detail pages.
6. **Phase 3 — Auto Trader Connect integration**: Stock Sync, Search, Webhooks, Valuations.
7. **Phase 4 — Admin Dashboard**: internal tooling for dealership staff.
8. **Phase 5 — Analytics, logging, and observability**.
9. **Phase 6 — Testing strategy and CI/CD pipelines**.

---

## Environment Variables

See [`.env.example`](./.env.example) for the full list of variables the application will need
across upcoming phases. Copy it to `.env.local` and fill in values as each phase requires them —
never commit real secrets. See "Local Database" above for how the `POSTGRES_*` variables and
`DATABASE_URL` correspond. `DATABASE_URL` is intentionally never prefixed with `NEXT_PUBLIC_`, since
it must never be exposed to the browser.
