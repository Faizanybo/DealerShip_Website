import Link from 'next/link';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';

import { getVisibleNavItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { Eyebrow } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { BrandMark } from './brand-mark';
import { Container } from './container';

/**
 * Premium dark footer. Uses the same locally-scoped `dark` class as hero
 * sections (see `docs/design-system.md` → "Dark cinematic hero sections"),
 * so every token/shadcn primitive underneath it inverts automatically.
 */
function Footer() {
  const year = new Date().getFullYear();
  const primaryNav = getVisibleNavItems(siteConfig.navigation.primary);
  const legalNav = getVisibleNavItems(siteConfig.navigation.legal);

  return (
    <footer className="dark border-hero-border bg-hero-background text-hero-foreground border-t">
      <Container className="flex flex-col gap-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + tagline + social */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <BrandMark />
            <p className="text-hero-muted-foreground max-w-xs text-sm">{siteConfig.tagline}</p>
            {siteConfig.social.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-3">
                {siteConfig.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-input text-hero-muted-foreground hover:text-hero-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center gap-1.5 px-2 text-sm outline-none focus-visible:ring-2"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Primary navigation */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <Eyebrow className="text-hero-muted-foreground">Navigate</Eyebrow>
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-input text-hero-muted-foreground hover:text-hero-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center text-sm outline-none focus-visible:ring-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-hero-muted-foreground">Contact</Eyebrow>
            <ul className="text-hero-muted-foreground flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="rounded-input hover:text-hero-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center gap-2 outline-none focus-visible:ring-2"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="rounded-input hover:text-hero-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center gap-2 outline-none focus-visible:ring-2"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 py-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  {siteConfig.address.line1}
                  {siteConfig.address.line2 ? <>, {siteConfig.address.line2}</> : null},{' '}
                  {siteConfig.address.city} {siteConfig.address.postcode},{' '}
                  {siteConfig.address.country}
                </address>
              </li>
            </ul>
          </div>

          {/* Business hours */}
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-hero-muted-foreground">Opening hours</Eyebrow>
            <ul className="text-hero-muted-foreground flex flex-col gap-2 text-sm">
              {siteConfig.businessHours.map((entry) => (
                <li key={entry.days} className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="text-hero-foreground">{entry.days}</span> — {entry.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-hero-muted-foreground/80 text-xs">
          Contact details, address, and opening hours shown are placeholders pending confirmation
          from the client.
        </p>

        <Separator />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-hero-muted-foreground text-xs">
            © {year} {siteConfig.copyrightHolder}. All rights reserved.
          </p>
          {legalNav.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-input text-hero-muted-foreground hover:text-hero-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center text-xs outline-none focus-visible:ring-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
