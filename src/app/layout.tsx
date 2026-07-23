import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { siteConfig } from '@/config/site';

/**
 * Typography system (Phase 1.3):
 * - `Geist` — body/interface sans. Clean, restrained, highly legible at UI
 *   sizes; used for nearly everything (see `src/components/ui/typography.tsx`).
 * - `Bricolage Grotesque` — optional display face, used only for large
 *   cinematic headings (`<Display>`) where it adds premium character without
 *   being used widely enough to hurt performance or readability.
 * - `Geist Mono` — reserved for tabular/metadata content (specs, codes).
 */
const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Base metadata for every route. `title.default` is used as-is on pages that
 * don't set their own `title` (currently only the homepage); every other
 * page's `title` is composed through `title.template`. All values come from
 * `siteConfig` — the single source of truth to update once the client
 * confirms official branding (see `docs/application-shell.md`).
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.dealershipName,
    template: `%s | ${siteConfig.dealershipName}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bricolageGrotesque.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  );
}
