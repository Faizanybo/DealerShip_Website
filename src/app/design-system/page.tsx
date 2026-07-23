import type { Metadata } from 'next';
import { Heart, Info, Search, TriangleAlert } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionHeader } from '@/components/layout/section-header';
import { Badge } from '@/components/ui/badge';
import {
  GhostButton,
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui/app-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { LoadingCard } from '@/components/ui/loading-card';
import { Separator } from '@/components/ui/separator';
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
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/ui/status-badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Body,
  BodyLarge,
  BodySmall,
  CardTitle,
  Display,
  Eyebrow,
  Metadata as MetadataText,
  PageTitle,
  SectionTitle,
} from '@/components/ui/typography';

import { MotionExamples } from './_components/motion-examples';

/**
 * INTERNAL DEVELOPMENT PREVIEW — NOT A PUBLIC PAGE.
 *
 * Visually verifies the Phase 1.3 design-system foundation (tokens,
 * typography, layout primitives, UI wrappers, motion). Contains no
 * dealership/business content on purpose.
 *
 * Remove this route, or gate it behind auth/an env flag, before shipping to
 * production — it is not meant to be linked from the public site.
 */
export const metadata: Metadata = {
  title: 'Design System (Dev Preview)',
  robots: { index: false, follow: false },
};

const spacingTokens = [
  { name: '--spacing-page-mobile', value: '1.25rem (20px)', usage: 'Page gutter on mobile' },
  { name: '--spacing-page-tablet', value: '2.5rem (40px)', usage: 'Page gutter on tablet (md:)' },
  { name: '--spacing-page-desktop', value: '4rem (64px)', usage: 'Page gutter on desktop (lg:)' },
  { name: '--spacing-section-y', value: '4rem (64px)', usage: 'Default vertical section rhythm' },
  { name: '--spacing-section-y-lg', value: '7rem (112px)', usage: 'Large/hero section rhythm' },
  { name: '--spacing-content-gap', value: '1.5rem (24px)', usage: 'Component gap baseline' },
  { name: '--container-content', value: '80rem (1280px)', usage: 'Max content width' },
];

const motionTokens = [
  { name: '--motion-fast', value: '150ms', usage: 'Micro-interactions (hover, tap)' },
  { name: '--motion-normal', value: '300ms', usage: 'Standard transitions (fade, menu)' },
  { name: '--motion-slow', value: '700ms', usage: 'Slow reveals (fade-up on scroll)' },
  {
    name: '--ease-premium',
    value: 'cubic-bezier(0.16, 1, 0.3, 1)',
    usage: 'Shared decelerating easing curve',
  },
];

export default function DesignSystemPreviewPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="border-border-subtle bg-surface-muted border-b">
        <Container className="flex flex-col gap-1 py-3">
          <Badge variant="outline" className="w-fit">
            Internal dev preview
          </Badge>
          <BodySmall>
            This route (<code>/design-system</code>) is for internal development only. It has no
            business content, is marked <code>noindex</code>, and should be removed or protected
            before production.
          </BodySmall>
        </Container>
      </div>

      {/* Hero / dark cinematic surface example */}
      <Section tone="hero" spacing="lg">
        <Container className="flex flex-col gap-6">
          <Eyebrow>Design system foundation</Eyebrow>
          <Display>Premium, restrained, mobile-first.</Display>
          <BodyLarge className="text-hero-muted-foreground max-w-2xl">
            This dark band demonstrates the cinematic hero surface — the <code>hero</code> tone on{' '}
            <code>&lt;Section&gt;</code> applies the <code>dark</code> scope locally, flipping every
            token and shadcn primitive underneath it without a site-wide dark-mode toggle.
          </BodyLarge>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton>Primary action</PrimaryButton>
            <SecondaryButton>Secondary action</SecondaryButton>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-16">
          {/* Typography */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Typography"
              title="Type hierarchy"
              description="One interface sans (Geist) for nearly everything, one optional display face (Bricolage Grotesque) reserved for large cinematic headings."
            />
            <div className="rounded-card border-border-subtle bg-surface-elevated flex flex-col gap-4 border p-6">
              <Display as="h3">Display heading</Display>
              <PageTitle as="h3">Page title</PageTitle>
              <SectionTitle as="h3">Section title</SectionTitle>
              <CardTitle>Card title</CardTitle>
              <BodyLarge>Body large — supporting copy that introduces a section or card.</BodyLarge>
              <Body>Body regular — the default paragraph size used across the interface.</Body>
              <BodySmall>
                Body small — secondary detail text, captions, and dense UI copy.
              </BodySmall>
              <Eyebrow>Eyebrow label</Eyebrow>
              <MetadataText>Metadata · 12 Jul 2026 · REF-00231</MetadataText>
            </div>
          </div>

          <Separator />

          {/* Colour surfaces */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Colour"
              title="Surfaces & tokens"
              description="A restrained neutral palette with one replaceable accent — see docs/design-system.md for how to swap it for client branding."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-card border-border-subtle bg-surface-page flex h-24 flex-col justify-between border p-3">
                <BodySmall>surface-page</BodySmall>
              </div>
              <div className="rounded-card border-border-subtle bg-surface-elevated shadow-subtle flex h-24 flex-col justify-between border p-3">
                <BodySmall>surface-elevated</BodySmall>
              </div>
              <div className="rounded-card border-border-subtle bg-surface-muted flex h-24 flex-col justify-between border p-3">
                <BodySmall>surface-muted</BodySmall>
              </div>
              <div className="rounded-card bg-hero-background text-hero-foreground flex h-24 flex-col justify-between p-3">
                <span className="text-sm">hero-background</span>
              </div>
              <div className="rounded-card bg-brand-accent text-brand-accent-foreground flex h-16 items-center justify-center text-sm font-medium">
                brand-accent
              </div>
              <div className="rounded-card bg-status-success/15 text-status-success flex h-16 items-center justify-center text-sm font-medium">
                success
              </div>
              <div className="rounded-card bg-status-warning/20 text-status-warning-foreground flex h-16 items-center justify-center text-sm font-medium">
                warning
              </div>
              <div className="rounded-card bg-status-destructive/10 text-status-destructive flex h-16 items-center justify-center text-sm font-medium">
                destructive
              </div>
            </div>
          </div>

          <Separator />

          {/* Buttons */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Components"
              title="Buttons & states"
              description="Project wrappers around the shadcn Button primitive — 44px default touch target, loading + disabled states, always keyboard accessible."
            />
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton>Primary</PrimaryButton>
              <SecondaryButton>Secondary</SecondaryButton>
              <GhostButton>Ghost</GhostButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
              <PrimaryButton loading>Loading</PrimaryButton>
              <IconButton label="Search">
                <Search />
              </IconButton>
              <IconButton label="Save to favourites" variant="outline">
                <Heart />
              </IconButton>
            </div>
            <BodySmall>
              Raw shadcn <code>Button</code> variants remain available for one-off cases:{' '}
              <Button variant="link">link variant</Button>.
            </BodySmall>
          </div>

          <Separator />

          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <SectionHeader eyebrow="Components" title="Inputs & form fields" />
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                label="Email address"
                description="We’ll only use this to reply to your enquiry."
                required
              >
                <Input type="email" placeholder="name@example.com" />
              </FormField>
              <FormField label="Phone number" error="Enter a valid phone number.">
                <Input type="tel" placeholder="07…" aria-invalid />
              </FormField>
              <FormField label="Message" className="sm:col-span-2">
                <Textarea placeholder="Write a message…" rows={4} />
              </FormField>
            </div>
          </div>

          <Separator />

          {/* Badges */}
          <div className="flex flex-col gap-6">
            <SectionHeader eyebrow="Components" title="Badges" />
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <StatusBadge status="success">In stock</StatusBadge>
              <StatusBadge status="warning">Pending review</StatusBadge>
              <StatusBadge status="destructive">Sold</StatusBadge>
              <StatusBadge status="neutral">Draft</StatusBadge>
            </div>
          </div>

          <Separator />

          {/* Dialog & Sheet */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Components"
              title="Dialog & mobile sheet"
              description="Both are fully keyboard-operable (focus trap, Esc to close, focus return) via Radix — no custom work required."
            />
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <SecondaryButton>Open dialog</SecondaryButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Example dialog</DialogTitle>
                    <DialogDescription>
                      A centred modal for confirmations or short forms. Fits down to 320px width.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <GhostButton>Cancel</GhostButton>
                    </DialogClose>
                    <PrimaryButton>Confirm</PrimaryButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <SecondaryButton>Open mobile sheet</SecondaryButton>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Example sheet</SheetTitle>
                    <SheetDescription>
                      Slides in from the edge — the pattern reserved for mobile navigation/filters
                      later.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <SecondaryButton>Close</SecondaryButton>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <Separator />

          {/* Skeletons / loading / empty */}
          <div className="flex flex-col gap-6">
            <SectionHeader eyebrow="Components" title="Skeletons, loading & empty states" />
            <div className="grid gap-4 sm:grid-cols-3">
              <LoadingCard />
              <LoadingCard withMedia={false} lines={3} />
              <div className="rounded-card border-border-subtle bg-surface-elevated flex flex-col gap-2 border p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <EmptyState
              icon={Info}
              title="Nothing to show yet"
              description="This is a generic, content-agnostic empty state — no business copy baked in."
              action={<SecondaryButton>Take an action</SecondaryButton>}
            />
          </div>

          <Separator />

          {/* Spacing */}
          <div className="flex flex-col gap-6">
            <SectionHeader eyebrow="Layout" title="Spacing & rhythm tokens" />
            <div className="rounded-card border-border-subtle overflow-x-auto border">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-surface-muted text-text-muted">
                  <tr>
                    <th className="p-3 font-medium">Token</th>
                    <th className="p-3 font-medium">Value</th>
                    <th className="p-3 font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {spacingTokens.map((token) => (
                    <tr key={token.name} className="border-border-subtle border-t">
                      <td className="text-text-secondary p-3 font-mono text-xs">{token.name}</td>
                      <td className="text-text-secondary p-3">{token.value}</td>
                      <td className="text-text-muted p-3">{token.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          {/* Motion */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Motion"
              title="Motion tokens & variants"
              description="Shared durations/easing plus live examples from src/lib/motion. All examples fall back to instant, no-movement transitions under prefers-reduced-motion: reduce."
            />
            <div className="rounded-card border-border-subtle overflow-x-auto border">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-surface-muted text-text-muted">
                  <tr>
                    <th className="p-3 font-medium">Token</th>
                    <th className="p-3 font-medium">Value</th>
                    <th className="p-3 font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {motionTokens.map((token) => (
                    <tr key={token.name} className="border-border-subtle border-t">
                      <td className="text-text-secondary p-3 font-mono text-xs">{token.name}</td>
                      <td className="text-text-secondary p-3">{token.value}</td>
                      <td className="text-text-muted p-3">{token.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <MotionExamples />
          </div>

          <div className="rounded-card border-border-strong bg-surface-muted flex items-center gap-2 border border-dashed p-4">
            <TriangleAlert
              className="text-status-warning-foreground size-4 shrink-0"
              aria-hidden="true"
            />
            <BodySmall>
              Reminder: this page is a temporary internal tool for Phase 1.3 verification. Delete or
              protect the <code>/design-system</code> route before production launch.
            </BodySmall>
          </div>
        </Container>
      </Section>
    </div>
  );
}
