import { importUseOfFundsData } from "../../src/abundance-api-importer.mjs";
import { createPool } from "../../src/postgres-client.mjs";

export async function handler(event) {
  if (!["POST", "GET"].includes(event.httpMethod)) {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  const expectedSecret = process.env.SIDECAR_IMPORT_SECRET;
  const receivedSecret = event.headers["x-sidecar-secret"];

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return jsonResponse(401, { error: "unauthorized" });
  }

  const pool = createPool(process.env.DATABASE_URL);

  try {
    const results = await importUseOfFundsData({ pool });
    return jsonResponse(200, { ok: true, results });
  } catch (error) {
    return jsonResponse(502, {
      error: "use_of_funds_import_failed",
      message: error.message
    });
  } finally {
    await pool.end();
  }
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  };
}
