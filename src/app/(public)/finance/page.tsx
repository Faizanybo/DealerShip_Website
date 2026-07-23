import type { Metadata } from 'next';

import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'Finance',
  description:
    'Information about our finance options is on its way — check back soon, or get in touch with any questions.',
};

/**
 * Temporary structural shell. Real finance content/functionality (rates,
 * applications, calculators) is a later phase and out of scope here — see
 * the "Do NOT" list in the task that introduced this route.
 */
export default function FinancePage() {
  return (
    <PagePlaceholder
      eyebrow="Flexible funding"
      title="Finance"
      description="We're preparing information about our finance options. Check back soon, or contact us directly to discuss what might suit you."
    />
  );
}
