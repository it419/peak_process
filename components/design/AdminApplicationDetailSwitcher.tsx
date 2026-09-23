"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { AdminApplicationDetailCurrent } from "@/components/recruitment/AdminApplicationDetailCurrent";
import { AdminApplicationDetailDark } from "@/components/design/dark/recruitment/AdminApplicationDetailDark";
import { AdminApplicationDetailOrganic } from "@/components/design/organic/recruitment/AdminApplicationDetailOrganic";
import type { ApplicationDetail } from "@/types/recruitment";

export function AdminApplicationDetailSwitcher({ application }: { application: ApplicationDetail }) {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <AdminApplicationDetailDark application={application} />;
  if (mode === "organic") return <AdminApplicationDetailOrganic application={application} />;
  return <AdminApplicationDetailCurrent application={application} />;
}
