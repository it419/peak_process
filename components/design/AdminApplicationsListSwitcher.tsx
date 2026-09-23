"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { AdminApplicationsListCurrent } from "@/components/recruitment/AdminApplicationsListCurrent";
import { AdminApplicationsListDark } from "@/components/design/dark/recruitment/AdminApplicationsListDark";
import { AdminApplicationsListOrganic } from "@/components/design/organic/recruitment/AdminApplicationsListOrganic";
import type { ApplicationSummary } from "@/types/recruitment";

interface AdminApplicationsListSwitcherProps {
  jobTitle: string;
  applications: ApplicationSummary[];
}

export function AdminApplicationsListSwitcher(props: AdminApplicationsListSwitcherProps) {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <AdminApplicationsListDark {...props} />;
  if (mode === "organic") return <AdminApplicationsListOrganic {...props} />;
  return <AdminApplicationsListCurrent {...props} />;
}
