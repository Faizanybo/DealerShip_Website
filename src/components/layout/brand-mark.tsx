import Link from 'next/link';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

/**
 * Temporary text-based brand mark (no client logo exists yet).
 *
 * Fully colour-agnostic: it renders in `currentColor`, so it automatically
 * matches whatever text colour the parent sets (e.g. dark text on the solid
 * header, light text on a transparent header over a hero). Swap this for a
 * real `<Image>`/`<svg>` logo once the client supplies one — everything
 * else (Header, Footer) reads `siteConfig`, not this component, so no other
 * changes are needed.
 */
function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'rounded-input focus-visible:ring-focus-ring inline-flex items-center gap-2.5 outline-none focus-visible:ring-2',
        className,
      )}
      aria-label={`${siteConfig.dealershipName} — home`}
    >
      <BrandMarkGlyph className="size-8 shrink-0 sm:size-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {siteConfig.shortName}
        </span>
      </span>
    </Link>
  );
}

/** Small abstract geometric mark — not a copied automotive emblem. */
function BrandMarkGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <path
        d="M10 21.5 16.5 10.5a1 1 0 0 1 1.73 0L22 17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 21.5h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export { BrandMark };
