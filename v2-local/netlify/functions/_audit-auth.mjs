import crypto from "node:crypto";

const TOKEN_TTL_SECONDS = 60 * 60 * 8;

export function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

export function createToken(now = Math.floor(Date.now() / 1000)) {
  const secret = requireEnv("AUDIT_SESSION_SECRET");
  const expires = now + TOKEN_TTL_SECONDS;
  const nonce = crypto.randomBytes(12).toString("hex");
  const payload = `${expires}.${nonce}`;
  const signature = sign(payload, secret);

  return `${payload}.${signature}`;
}

export function verifyTokenFromEvent(event) {
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [expiresText, nonce, signature] = parts;
  const expires = Number(expiresText);

  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = `${expiresText}.${nonce}`;
  const expected = sign(payload, requireEnv("AUDIT_SESSION_SECRET"));

  return timingSafeEqual(signature, expected);
}

export function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}
