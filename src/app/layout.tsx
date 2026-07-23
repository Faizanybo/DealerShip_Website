import type { Metadata } from 'next';
import { Geist, Geist_Mono, Manrope } from 'next/font/google';
import './globals.css';

import { siteConfig } from '@/config/site';

/**
 * Typography system — a restrained two-font system (plus a separate,
 * narrow-purpose mono face):
 * - `Geist` — body/interface sans. Clean, restrained, highly legible at UI
 *   sizes; used for body copy, navigation, metadata, and buttons (see
 *   `src/components/ui/typography.tsx`).
 * - `Manrope` — display face, used only for large cinematic headings
 *   (`<Display>`) and the hero's featured-vehicle label, where its bolder,
 *   slightly geometric character reads as premium without being used widely
 *   enough to hurt performance or readability. Replaced Bricolage Grotesque
 *   during the hero-composition pass (see `docs/homepage.md`) — no other
 *   change needed since every consumer references the `font-display`
 *   Tailwind class, not the font by name.
 * - `Geist Mono` — reserved for tabular/metadata content (specs, codes) —
 *   a separate, narrow-purpose face, not part of the heading/body pairing.
 */
const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const manrope = Manrope({
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
      className={`${geistSans.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  );
}
