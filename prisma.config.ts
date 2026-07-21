import { config as loadEnv } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// Prisma ORM 7 no longer loads .env files automatically, so the CLI (migrate,
// studio, validate, etc.) needs them loaded explicitly. This mirrors the
// project's env-file precedence: `.env.local` (git-ignored developer values)
// wins over `.env` (none committed yet, reserved for future use).
loadEnv({ path: '.env.local' });
loadEnv();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
