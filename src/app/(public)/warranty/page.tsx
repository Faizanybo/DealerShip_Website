import type { Metadata } from 'next';

import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'Warranty',
  description:
    'Information about our warranty options is on its way — check back soon, or get in touch with any questions.',
};

/**
 * Temporary structural shell. Real warranty content/functionality is a
 * later phase and out of scope here — see the "Do NOT" list in the task
 * that introduced this route.
 */
export default function WarrantyPage() {
  return (
    <PagePlaceholder
      eyebrow="Peace of mind"
      title="Warranty"
      description="We're preparing information about our warranty options. Check back soon, or get in touch with any questions in the meantime."
    />
  );
}
