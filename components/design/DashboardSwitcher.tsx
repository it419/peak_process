"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { CurrentDashboard } from "@/components/dashboard/CurrentDashboard";
import { DarkDashboard } from "@/components/design/dark/DarkDashboard";
import { OrganicDashboard } from "@/components/design/organic/OrganicDashboard";

export function DashboardSwitcher() {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <DarkDashboard />;
  if (mode === "organic") return <OrganicDashboard />;
  return <CurrentDashboard />;
}
