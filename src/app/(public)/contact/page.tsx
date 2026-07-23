import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.dealershipName} by phone or email while our full contact page is finished.`,
};

/**
 * Temporary structural shell (Phase 2.1). A real enquiry form is a later
 * phase — for now this reuses the phone/email already configured in
 * `siteConfig` (the same values shown in the Footer) so visitors have a way
 * to reach out immediately.
 */
export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Get in touch"
      title="Contact"
      description="A full enquiry form is on its way. In the meantime, reach us directly using the details below."
    >
      <ul className="text-text-secondary flex flex-col gap-2 text-sm">
        <li>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="rounded-input hover:text-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center gap-2 outline-none focus-visible:ring-2"
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="rounded-input hover:text-foreground focus-visible:ring-focus-ring inline-flex min-h-11 items-center gap-2 outline-none focus-visible:ring-2"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
        </li>
      </ul>
    </PagePlaceholder>
  );
}
