import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

/**
 * Shell for every public (customer-facing) route: skip link + sticky Header
 * + `<main>` + Footer. Kept separate from the root layout (`src/app/layout.tsx`)
 * specifically so a future admin dashboard can use its own shell — see
 * `docs/application-shell.md` → "Public vs. admin layout boundary".
 *
 * Deliberately doesn't wrap children in `<PageShell>` — the root layout's
 * `<body>` already establishes the full-height flex column this relies on
 * (`main` grows via `flex-1`), so an extra wrapper would just duplicate it.
 *
 * `<Header>` is `fixed`, so it no longer reserves space in the flow — `<main>`
 * adds top padding matching the header's height (`h-16 sm:h-18` in
 * `header.tsx`) to compensate on every page. The homepage's `<Hero>` cancels
 * this out with a matching negative margin so it can bleed edge-to-edge
 * under the transparent header instead of starting below it.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="focus:rounded-input focus:bg-brand-accent focus:text-brand-accent-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-16 sm:pt-18">
        {children}
      </main>

      <Footer />
    </>
  );
}
