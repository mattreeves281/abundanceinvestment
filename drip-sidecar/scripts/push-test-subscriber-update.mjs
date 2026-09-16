import { pushProofUpdate } from "../src/drip-client.mjs";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

loadOptionalEnvFile(resolve(process.cwd(), ".env"));
loadOptionalEnvFile(resolve(dirname(fileURLToPath(import.meta.url)), "../../.env"));
loadOptionalEnvFile(resolve(dirname(fileURLToPath(import.meta.url)), "../.env"));

async function main() {
  const apiToken = process.env.DRIP_API_TOKEN;
  const accountId = process.env.DRIP_ACCOUNT_ID;
  const subscriberId = process.env.DRIP_TEST_SUBSCRIBER_ID;

  if (!apiToken || !accountId || !subscriberId) {
    console.error("Missing one or more required environment variables:");
    console.error("- DRIP_API_TOKEN");
    console.error("- DRIP_ACCOUNT_ID");
    console.error("- DRIP_TEST_SUBSCRIBER_ID");
    process.exit(1);
  }

  const result = await pushProofUpdate({
    apiToken,
    accountId,
    subscriberId
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        status: result.status,
        returnedSubscriberId: result.body?.subscribers?.[0]?.id ?? null,
        updatedFields: ["council_interest", "sidecar_custom_variable_test", "ab_sidecar_test_updated_at"],
        addedTags: ["AU_PROCESS_SS_ONBOARDING", "sidecar-test-tag"],
        removedTags: ["Welcome popup"]
      },
      null,
      2
    )
  );
}

function loadOptionalEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const lines = readFileSync(path, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

main().catch((error) => {
  console.error("Drip proof update failed.");
  console.error(error.message);

  if (error.responseBody) {
    console.error(JSON.stringify(error.responseBody, null, 2));
  }

  process.exit(1);
});
