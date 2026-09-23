import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { AdminUser } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/security/password";

const COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE_NAME || "ppp_admin_session";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

export class UnauthorizedError extends Error {
  constructor() {
    super("Not authenticated");
    this.name = "UnauthorizedError";
  }
}

async function findAdminBySessionToken(token: string): Promise<AdminUser | null> {
  const session = await prisma.adminSession.findUnique({ where: { token }, include: { adminUser: true } });
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.adminSession.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return session.adminUser;
}

/** Nullable — for Server Components that want to render differently when logged out. */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return findAdminBySessionToken(token);
}

/** Throws if unauthenticated — call at the top of every /api/admin/** route. */
export async function requireAdminUser(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new UnauthorizedError();
  return admin;
}

/** Convenience wrapper for API routes: `const auth = await requireAdminUserOrResponse(); if ("response" in auth) return auth.response;` */
export async function requireAdminUserOrResponse(): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const admin = await getCurrentAdmin();
  if (!admin) return { response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  return { admin };
}

/** Returns the admin on success, null on bad credentials — never reveals which field was wrong. */
export async function loginAdmin(email: string, password: string): Promise<AdminUser | null> {
  const admin = await prisma.adminUser.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (!admin) return null;

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) return null;

  const session = await prisma.adminSession.create({
    data: { adminUserId: admin.id, expiresAt: new Date(Date.now() + SESSION_DURATION_MS) },
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });

  return admin;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.adminSession.deleteMany({ where: { token } });
  }
  cookieStore.delete(COOKIE_NAME);
}
