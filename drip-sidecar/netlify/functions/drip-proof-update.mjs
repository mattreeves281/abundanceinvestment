import { pushProofUpdate } from "../../src/drip-client.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  const expectedSecret = process.env.SIDECAR_TEST_SECRET;
  const receivedSecret = event.headers["x-sidecar-secret"];

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return jsonResponse(401, { error: "unauthorized" });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "invalid_json" });
  }

  const subscriberId = payload.subscriber_id || payload.subscriberId;

  if (!subscriberId) {
    return jsonResponse(400, { error: "missing_subscriber_id" });
  }

  try {
    const result = await pushProofUpdate({
      apiToken: process.env.DRIP_API_TOKEN,
      accountId: process.env.DRIP_ACCOUNT_ID,
      subscriberId
    });

    return jsonResponse(200, {
      ok: true,
      status: result.status,
      returned_subscriber_id: result.body?.subscribers?.[0]?.id ?? null
    });
  } catch (error) {
    return jsonResponse(502, {
      error: "drip_update_failed",
      message: error.message,
      drip_status: error.status ?? null,
      drip_response: error.responseBody ?? null
    });
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
