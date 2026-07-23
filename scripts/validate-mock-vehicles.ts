/**
 * Validates every development mock vehicle against the Zod Vehicle schema.
 *
 * Usage: pnpm vehicles:validate-mock
 */
import { vehicleListSchema } from '../src/features/vehicles/vehicle.schemas.ts';
import { MOCK_VEHICLES } from '../src/features/vehicles/server/mock-vehicles.data.ts';

function main(): void {
  const parsed = vehicleListSchema.safeParse(MOCK_VEHICLES);

  if (!parsed.success) {
    console.error('Mock vehicle validation failed:');
    console.error(JSON.stringify(parsed.error.format(), null, 2));
    process.exit(1);
  }

  console.log(`Validated ${parsed.data.length} mock vehicles successfully.`);
}

main();
