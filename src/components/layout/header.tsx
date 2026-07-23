'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getVisibleNavItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { PrimaryButton } from '@/components/ui/app-button';
import { BrandMark } from './brand-mark';
import { Container } from './container';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';

interface HeaderProps {
  /**
   * `solid` (default) — always a solid light background; safe on every
   * page, including ones with no hero. `transparent` — see-through with
   * light text at the very top of the page (for sitting over a dark hero),
   * then converges to the same solid look once the user scrolls. No hero
   * page exists yet in this phase; this prop exists so a future one can opt
   * in without changing the Header itself.
   */
  variant?: 'solid' | 'transparent';
}

/**
 * Sticky site header. Detects "at the top of the page" via a 1px
 * `IntersectionObserver` sentinel (no scroll-event listener), so the only
 * client-side cost is a single cheap observer callback.
 */
function Header({ variant = 'solid' }: HeaderProps) {
  const pathname = usePathname();
  const navItems = React.useMemo(() => getVisibleNavItems(siteConfig.navigation.primary), []);

  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = React.useState(true);

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsAtTop(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const isTransparent = variant === 'transparent' && isAtTop;

  return (
    <>
      {/* Zero-size marker for the top of the page; never intersects once scrolled past. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
      />

      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow,color] duration-300 ease-out',
          isTransparent
            ? 'text-hero-foreground border-b border-transparent bg-transparent'
            : 'border-border-subtle bg-surface-page text-foreground shadow-subtle border-b',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-3 sm:h-18">
          <BrandMark />
          <DesktopNav items={navItems} pathname={pathname} />
          <div className="flex items-center gap-2">
            <PrimaryButton asChild className="hidden sm:inline-flex">
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Phone className="size-4" aria-hidden="true" />
                Call us
              </a>
            </PrimaryButton>
            <MobileNav items={navItems} pathname={pathname} />
          </div>
        </Container>
      </header>
    </>
  );
}

export { Header };
