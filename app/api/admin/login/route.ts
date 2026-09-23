import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/schemas/adminLogin.schema";
import { loginAdmin } from "@/lib/server/adminSession";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  const admin = await loginAdmin(parsed.data.email, parsed.data.password);
  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
