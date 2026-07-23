import type { Metadata } from 'next';

import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'Sell Your Car',
  description:
    'A way to sell or part-exchange your car with us is on its way — check back soon, or get in touch with any questions.',
};

/**
 * Temporary structural shell. Real sell/part-exchange functionality
 * (valuation requests, forms) is a later phase and out of scope here — see
 * the "Do NOT" list in the task that introduced this route.
 */
export default function SellYourCarPage() {
  return (
    <PagePlaceholder
      eyebrow="Sell or part-exchange"
      title="Sell Your Car"
      description="We're building a straightforward way to get a valuation and sell or part-exchange your car with us. Check back soon, or contact us directly in the meantime."
    />
  );
}
