'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/motion';
import { isNavItemActive, type NavItem } from '@/config/navigation';

interface DesktopNavProps {
  items: NavItem[];
  pathname: string;
  className?: string;
}

/**
 * Horizontal primary navigation for `md:` and up. Active route gets an
 * animated underline (shared `layoutId`, so it slides between items instead
 * of popping) — disabled under `prefers-reduced-motion`.
 */
function DesktopNav({ items, pathname, className }: DesktopNavProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav aria-label="Primary" className={cn('hidden items-center gap-1 md:flex', className)}>
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
              'rounded-input focus-visible:ring-focus-ring relative px-3 py-2 text-sm font-medium text-current opacity-80 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2',
              active && 'opacity-100',
            )}
          >
            {item.label}
            {active ? (
              <motion.span
                layoutId="desktop-nav-underline"
                className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-current"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                }
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export { DesktopNav };
