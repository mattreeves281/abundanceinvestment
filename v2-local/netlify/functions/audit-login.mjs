import { createToken, jsonResponse, requireEnv, timingSafeEqual } from "./_audit-auth.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "invalid_json" });
  }

  const password = String(payload.password || "");
  const expectedPassword = requireEnv("AUDIT_PASSWORD");

  if (!timingSafeEqual(password, expectedPassword)) {
    return jsonResponse(401, { error: "invalid_password" });
  }

  return jsonResponse(200, {
    ok: true,
    token: createToken()
  });
}
