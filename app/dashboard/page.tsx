import type { Metadata } from "next";
import { DashboardSwitcher } from "@/components/design/DashboardSwitcher";

export const metadata: Metadata = {
  title: "Dashboard | Peak Process Partners",
};

export default function DashboardPage() {
  return <DashboardSwitcher />;
}
