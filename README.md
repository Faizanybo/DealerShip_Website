# AutoTrader Dealership Platform

A production-grade, premium automotive dealership website. This repository is the foundation of a
flagship internal project that will eventually integrate with **Auto Trader Connect APIs**
(Stock Sync, Search, Webhooks, Valuations, etc.).

> **Status:** Phase 1.1 — Project Foundation. No business logic, pages, or integrations have been
> implemented yet. This phase exists purely to establish a clean, scalable, and maintainable
> baseline for everything that follows.

---

## Tech Stack

| Concern          | Choice                                         |
| ---------------- | ---------------------------------------------- |
| Framework        | [Next.js](https://nextjs.org) (App Router)     |
| Language         | TypeScript (strict mode)                       |
| Styling          | [Tailwind CSS](https://tailwindcss.com)        |
| Package manager  | [pnpm](https://pnpm.io)                        |
| Linting          | ESLint (flat config)                           |
| Formatting       | Prettier + `prettier-plugin-tailwindcss`       |
| Version control  | Git                                            |
| Containerization | Docker _(added in a later phase — PostgreSQL)_ |
| ORM              | Prisma _(added in a later phase)_              |
| UI components    | shadcn/ui _(added in a later phase)_           |
| Animation        | Framer Motion _(added in a later phase)_       |

Nothing marked "later phase" is installed yet. Only foundation-level dependencies are present.

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`corepack enable` or `npm install -g pnpm`)

### Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in any values you have
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

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

---

## Folder Structure

```
.
├── .github/workflows/     # CI/CD pipeline definitions (reserved, none yet)
├── .vscode/                # Recommended editor settings & extensions
├── docs/                   # Architecture decision records & deeper docs
├── public/                 # Static assets served as-is
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
│   ├── server/              # Server-only code (api helpers, auth, db access)
│   ├── services/            # Business/domain logic orchestrating integrations + db
│   ├── styles/              # Design tokens & shared styling beyond globals.css
│   └── types/               # Shared TypeScript types/interfaces
└── tests/                   # unit / integration / e2e test suites (reserved, none yet)
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
  client components.
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

## Future Roadmap (High Level)

1. **Phase 1.1 — Foundation** _(this phase)_: project scaffolding, tooling, structure.
2. **Phase 1.2 — Data layer**: PostgreSQL via Docker, Prisma schema and client setup.
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
never commit real secrets.
