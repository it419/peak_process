"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { AdminJobDetailCurrent } from "@/components/recruitment/AdminJobDetailCurrent";
import { AdminJobDetailDark } from "@/components/design/dark/recruitment/AdminJobDetailDark";
import { AdminJobDetailOrganic } from "@/components/design/organic/recruitment/AdminJobDetailOrganic";
import type { JobDetail } from "@/types/recruitment";

export function AdminJobDetailSwitcher({ job }: { job: JobDetail }) {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <AdminJobDetailDark job={job} />;
  if (mode === "organic") return <AdminJobDetailOrganic job={job} />;
  return <AdminJobDetailCurrent job={job} />;
}
