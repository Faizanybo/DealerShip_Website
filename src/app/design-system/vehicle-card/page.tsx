import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionHeader } from '@/components/layout/section-header';
import { Badge } from '@/components/ui/badge';
import { Body, BodySmall } from '@/components/ui/typography';
import { VehicleCard, VehicleCardGrid, VehicleCardReveal } from '@/features/vehicles/components';
import type { Vehicle } from '@/features/vehicles/vehicle.types';
import { getRecentlySoldVehicles, getVehicles } from '@/services/vehicle.service';

export const metadata: Metadata = {
  title: 'Vehicle Card (Dev Preview)',
  robots: { index: false, follow: false },
};

/**
 * INTERNAL DEVELOPMENT PREVIEW — NOT A PUBLIC PAGE.
 *
 * Exercises `VehicleCard` against live mock inventory from `VehicleService`.
 * Remove or protect before production.
 */
export default async function VehicleCardPreviewPage() {
  const [listing, soldExamples] = await Promise.all([
    getVehicles({ pageSize: 48 }),
    getRecentlySoldVehicles(4),
  ]);

  const bySlug = (slug: string) => listing.items.find((vehicle) => vehicle.slug === slug) ?? null;

  const available = bySlug('2022-bmw-330i-m-sport');
  const reserved = bySlug('2020-audi-a4-s-line');
  const comingSoon = bySlug('2023-range-rover-sport-hse');
  const sold = soldExamples[0] ?? bySlug('2019-bmw-x5-xdrive40i');
  const longTitleSource = bySlug('2024-land-rover-defender-110');
  const sparseMetaSource = bySlug('2023-tesla-model-3-long-range');

  const longTitleVehicle = longTitleSource
    ? ({
        ...longTitleSource,
        derivative: '110 X-Dynamic HSE Black Pack Plus Edition',
      } satisfies Vehicle)
    : null;

  const sparseMetaVehicle = sparseMetaSource
    ? ({
        ...sparseMetaSource,
        previousPrice: null,
        attentionGrabber: null,
      } satisfies Vehicle)
    : null;

  const statusExamples = [available, reserved, comingSoon, sold].filter(Boolean) as Vehicle[];

  return (
    <div className="flex min-h-svh flex-col">
      <div className="border-border-subtle bg-surface-muted border-b">
        <Container className="flex flex-col gap-2 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Internal dev preview</Badge>
            <BodySmall>
              <Link
                href="/design-system"
                className="text-brand-accent underline-offset-4 hover:underline"
              >
                ← Design system
              </Link>
            </BodySmall>
          </div>
          <BodySmall>
            Route <code>/design-system/vehicle-card</code> — validates the reusable inventory card
            against mock data from <code>VehicleService</code>. Not linked from the public site.
          </BodySmall>
        </Container>
      </div>

      <Section spacing="normal">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Phase 2.2.2"
            title="Vehicle card"
            description="Premium, mobile-first inventory card consuming the normalized Vehicle domain model. Hover and focus styles use CSS; list entrance uses Motion in the grid below."
          />

          <div className="flex flex-col gap-4">
            <Body className="font-medium">Public statuses</Body>
            <VehicleCardGrid>
              {statusExamples.map((vehicle, index) => (
                <li key={vehicle.id} className="list-none">
                  <VehicleCardReveal index={index}>
                    <VehicleCard vehicle={vehicle} priority={index === 0} />
                  </VehicleCardReveal>
                </li>
              ))}
            </VehicleCardGrid>
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader
              align="left"
              eyebrow="Edge cases"
              title="Long title & compact variant"
              description="Long derivatives clamp gracefully; compact variant tightens metadata for dense grids."
            />
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {longTitleVehicle ? (
                <li className="list-none">
                  <VehicleCard vehicle={longTitleVehicle} />
                </li>
              ) : null}
              {available ? (
                <li className="list-none">
                  <VehicleCard vehicle={available} variant="compact" />
                </li>
              ) : null}
              {sparseMetaVehicle ? (
                <li className="list-none">
                  <VehicleCard vehicle={sparseMetaVehicle} />
                </li>
              ) : null}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader
              align="left"
              eyebrow="Sold treatment"
              title="Recently sold grid"
              description="Sold cards de-emphasise imagery, hide price, and show sold date where available."
            />
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {soldExamples.map((vehicle) => (
                <li key={vehicle.id} className="list-none">
                  <VehicleCard vehicle={vehicle} variant="sold" />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border-border-strong bg-surface-muted border border-dashed p-4">
            <BodySmall>
              Manual checks: 320px width, keyboard Tab focus ring, reduced-motion (no image scale /
              card lift), and slow network image loading with local fallback. Data must always come
              through <code>@/services/vehicle.service</code> — never raw mock arrays.
            </BodySmall>
          </div>
        </Container>
      </Section>
    </div>
  );
}
