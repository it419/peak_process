"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { AdminJobFormCurrent } from "@/components/recruitment/AdminJobFormCurrent";
import { AdminJobFormDark } from "@/components/design/dark/recruitment/AdminJobFormDark";
import { AdminJobFormOrganic } from "@/components/design/organic/recruitment/AdminJobFormOrganic";
import type { JobDetail } from "@/types/recruitment";

interface AdminJobFormSwitcherProps {
  mode: "create" | "edit";
  jobId?: string;
  initialJob?: JobDetail;
}

export function AdminJobFormSwitcher(props: AdminJobFormSwitcherProps) {
  const designMode = useDesignStore((s) => s.mode);

  if (designMode === "dark") return <AdminJobFormDark {...props} />;
  if (designMode === "organic") return <AdminJobFormOrganic {...props} />;
  return <AdminJobFormCurrent {...props} />;
}
