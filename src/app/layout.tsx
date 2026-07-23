import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'AutoTrader Dealership Platform',
  description: 'Premium automotive dealership platform — internal development build.',
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
