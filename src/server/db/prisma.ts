import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';

import { getServerEnv } from '@/config/env';

import { PrismaClient } from './generated/client';

/**
 * Singleton Prisma Client for Next.js.
 *
 * Next.js dev-mode hot reloading re-evaluates modules on every change. Without
 * caching the client on `globalThis`, each reload would create a brand new
 * `PrismaClient` (and a brand new connection pool), quickly exhausting
 * PostgreSQL's connection limit. Caching on `globalThis` in non-production
 * environments avoids that, while production always gets a single instance
 * per process naturally.
 *
 * This module is server-only (see the `server-only` import above) and must
 * never be imported from a client component.
 */

type GlobalWithPrisma = typeof globalThis & {
  __prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

function createPrismaClient(): PrismaClient {
  const { databaseUrl } = getServerEnv();
  const adapter = new PrismaPg({ connectionString: databaseUrl });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export const prisma: PrismaClient = globalForPrisma.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma;
}
