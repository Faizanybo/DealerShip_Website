'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { isNavItemActive, type NavItem } from '@/config/navigation';

interface DesktopNavProps {
  items: NavItem[];
  pathname: string;
  className?: string;
}

/** Premium easing — mirrors `--ease-premium` / `src/lib/motion/transitions.ts`. */
const PREMIUM_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Horizontal primary navigation for `xl:` and up. Active route gets a bronze
 * underline; inactive links grow a matching underline from the centre on
 * hover/focus (CSS-only — no layoutId slide). See `docs/motion-guidelines.md`
 * → "Navigation interactions".
 *
 * Shown from `xl:` (not `md:`) because eight top-level items don't comfortably
 * fit alongside the brand mark and CTA below ~1280px.
 */
function DesktopNav({ items, pathname, className }: DesktopNavProps) {
  return (
    <nav aria-label="Primary" className={cn('hidden items-center gap-2 xl:flex', className)}>
      {items.map((item) => {
        const active = isNavItemActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group rounded-input focus-visible:ring-focus-ring relative px-4 py-2.5 text-[0.9375rem] font-medium text-current opacity-80 transition-opacity duration-200 outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2',
              active && 'opacity-100',
            )}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                'bg-brand-accent absolute inset-x-4 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-200',
                active
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
              )}
              style={{ transitionTimingFunction: PREMIUM_EASE }}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export { DesktopNav };
