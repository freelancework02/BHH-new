import crypto from "crypto";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "bhh_luxury_secret_session_token_key_2026";

/**
 * Verify whether an admin session cookie is valid
 */
export function verifyAdminSession(token) {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false };
  }

  const [encodedUsername, timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  // Check expiration (24 hours)
  if (isNaN(timestamp) || Date.now() - timestamp > 24 * 60 * 60 * 1000) {
    return { valid: false, expired: true };
  }

  try {
    const username = Buffer.from(encodedUsername, "base64").toString("utf-8");
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`${username}:${timestamp}`)
      .digest("hex");

    if (expectedSignature === signature) {
      return { valid: true, username };
    }
  } catch (e) {
    return { valid: false };
  }

  return { valid: false };
}
