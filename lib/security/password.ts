import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

/**
 * Admin password hashing — scrypt (node:crypto), not bcrypt: no new
 * dependency, same "server-only, one clear job" style as
 * lib/security/encryption.ts. Stored format: `${saltHex}:${hashHex}`.
 *
 * Server-only. Never import this from a Client Component.
 */

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const derived = (await scryptAsync(plain, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;

  const storedHash = Buffer.from(hashHex, "hex");
  const derived = (await scryptAsync(plain, salt, KEY_LENGTH)) as Buffer;
  if (derived.length !== storedHash.length) return false;
  return timingSafeEqual(derived, storedHash);
}
