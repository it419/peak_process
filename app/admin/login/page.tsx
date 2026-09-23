import type { Metadata } from "next";
import { AdminLoginSwitcher } from "@/components/design/AdminLoginSwitcher";

export const metadata: Metadata = { title: "Admin Sign In | Peak Process Partners" };

export default function AdminLoginPage() {
  return <AdminLoginSwitcher />;
}
