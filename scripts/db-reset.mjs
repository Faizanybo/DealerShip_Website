#!/usr/bin/env node
/**
 * Fully resets the local development database.
 *
 * DESTRUCTIVE: this deletes the Postgres named volume, i.e. ALL local data
 * (every table, including anything you created via Prisma Studio or seeds).
 * It does NOT touch any remote/production database — it only ever targets the
 * local `docker-compose.yml` stack.
 *
 * Usage:
 *   pnpm db:reset          # prompts for confirmation
 *   pnpm db:reset --yes    # skips the prompt (e.g. for scripted use)
 */
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const args = process.argv.slice(2);
const skipConfirmation = args.includes('--yes') || args.includes('-y');

const ENV_FILE = '.env.local';
const COMPOSE_ARGS = ['compose', '--env-file', ENV_FILE, 'down', '--volumes'];

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, { stdio: 'inherit' });
  return result.status ?? 1;
}

async function confirm() {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(
      'This will permanently DELETE all local PostgreSQL data (named volume "autotrader_postgres_data"). ' +
        'Type "yes" to continue: ',
    );
    return answer.trim().toLowerCase() === 'yes';
  } finally {
    rl.close();
  }
}

console.warn('\n⚠️  pnpm db:reset — DESTRUCTIVE ACTION');
console.warn('⚠️  This deletes the local Postgres Docker volume and ALL data in it.\n');

if (!skipConfirmation) {
  const confirmed = await confirm();
  if (!confirmed) {
    console.log('Aborted. No data was deleted.');
    process.exit(1);
  }
}

console.log('Stopping containers and removing the Postgres volume...');
const exitCode = run('docker', COMPOSE_ARGS);

if (exitCode !== 0) {
  console.error('Failed to reset the database (see Docker output above).');
  process.exit(exitCode);
}

console.log('Local database volume removed.');
console.log('Run "pnpm db:start" then "pnpm db:migrate" to recreate a fresh database.');
