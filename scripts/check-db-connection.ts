/**
 * Development-only CLI: verifies that the app can reach PostgreSQL through
 * Prisma. Intentionally standalone (does not import the app's `@/*`-aliased
 * singleton) so it can run directly via plain `node`, independent of Next.js.
 *
 * Usage: pnpm db:check
 */
import { config as loadEnv } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/server/db/generated/client.ts';

loadEnv({ path: '.env.local' });
loadEnv();

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL. Copy .env.example to .env.local and provide a value.');
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$queryRaw`SELECT 1`;
    const systemHealthCount = await prisma.systemHealth.count();

    console.log('✔ Database connection OK.');
    console.log(`  SystemHealth rows: ${systemHealthCount}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error('✘ Database connection FAILED.');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
