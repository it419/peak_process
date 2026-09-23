import type { Metadata } from "next";
import { AdminJobFormSwitcher } from "@/components/design/AdminJobFormSwitcher";

export const metadata: Metadata = { title: "Create Job | Peak Process Partners" };

export default function NewJobPage() {
  return <AdminJobFormSwitcher mode="create" />;
}
