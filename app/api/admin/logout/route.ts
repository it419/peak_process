import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/server/adminSession";

export const runtime = "nodejs";

export async function POST() {
  await logoutAdmin();
  return NextResponse.json({ ok: true });
}
