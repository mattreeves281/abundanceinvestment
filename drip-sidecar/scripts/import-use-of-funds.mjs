import { importUseOfFundsData } from "../src/abundance-api-importer.mjs";
import { loadSidecarEnv, requireEnv } from "../src/env.mjs";
import { createPool } from "../src/postgres-client.mjs";

loadSidecarEnv();

async function main() {
  const pool = createPool(requireEnv("DATABASE_URL"));

  try {
    const results = await importUseOfFundsData({ pool });
    console.log(JSON.stringify({ ok: true, results }, null, 2));
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Use-of-funds import failed.");
  console.error(error.message);
  process.exit(1);
});
