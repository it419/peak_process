import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/server/adminSession";
import { AdminShellSwitcher } from "@/components/design/AdminShellSwitcher";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return <AdminShellSwitcher adminName={admin.fullName}>{children}</AdminShellSwitcher>;
}
