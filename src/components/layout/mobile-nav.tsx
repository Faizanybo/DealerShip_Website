'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';

import { cn } from '@/lib/utils';
import { isNavItemActive, type NavItem } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { IconButton } from '@/components/ui/app-button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileNavProps {
  items: NavItem[];
  pathname: string;
}

/**
 * Menu button + panel, built on the existing shadcn `Sheet` (Radix Dialog
 * underneath) — focus trap, `Esc` to close, and body-scroll locking all
 * come for free. Closes automatically when a nav item is selected. Visible
 * below `xl:` — the mirror of `DesktopNav`'s `xl:flex` (see that component
 * for why 8 top-level items need the wider threshold), and already handles
 * any item count via `overflow-y-auto` on the nav list.
 */
function MobileNav({ items, pathname }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton label="Open menu" className="xl:hidden">
          <Menu />
        </IconButton>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[85vw] max-w-sm flex-col gap-0 p-0">
        <SheetHeader className="border-border-subtle border-b">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse {siteConfig.shortName} pages
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {items.map((item) => {
            const active = isNavItemActive(pathname, item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-input focus-visible:ring-focus-ring flex min-h-11 items-center px-3 text-base font-medium outline-none focus-visible:ring-2',
                    active
                      ? 'bg-surface-muted text-foreground'
                      : 'text-text-secondary hover:bg-surface-muted',
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <SheetFooter className="border-border-subtle border-t">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="rounded-input bg-brand-accent text-brand-accent-foreground focus-visible:ring-focus-ring flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-medium outline-none focus-visible:ring-2"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call {siteConfig.contact.phone}
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
