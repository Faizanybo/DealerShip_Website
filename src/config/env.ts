import 'server-only';

/**
 * Minimal, dependency-free runtime environment validation.
 *
 * A schema-validation library (e.g. `zod`) is deliberately NOT introduced yet:
 * at this phase we only have a single required variable (`DATABASE_URL`), so a
 * tiny hand-rolled check is simpler, has zero dependencies, and is just as
 * safe. Revisit this once the number/shape of variables grows (e.g. once
 * Auto Trader credentials or auth secrets need real validation beyond
 * "present and non-empty") — at that point a proper schema validator is
 * justified and should be introduced deliberately, not by default.
 */

interface ServerEnv {
  /** Prisma/PostgreSQL connection string. Never exposed to the client. */
  databaseUrl: string;
}

function readRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable "${key}". ` +
        'Copy .env.example to .env.local and provide a value (see README.md → "Local Database").',
    );
  }
  return value;
}

let cachedServerEnv: ServerEnv | undefined;

/**
 * Lazily validates and returns server-only environment variables. Throws a
 * descriptive error on first access if a required variable is missing, rather
 * than failing later with an opaque connection error.
 */
export function getServerEnv(): ServerEnv {
  if (!cachedServerEnv) {
    cachedServerEnv = {
      databaseUrl: readRequiredEnvVar('DATABASE_URL'),
    };
  }
  return cachedServerEnv;
}
