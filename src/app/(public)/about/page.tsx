import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.dealershipName}. This page is being written — check back soon.`,
};

/** Temporary structural shell (Phase 2.1) — full company story arrives in a later phase. */
export default function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="About us"
      title="About"
      description={`${siteConfig.dealershipName}'s story is being written. Check back soon to learn more about who we are and how we work.`}
    />
  );
}
