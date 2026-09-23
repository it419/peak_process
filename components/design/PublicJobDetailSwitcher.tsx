"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { PublicJobDetailCurrent } from "@/components/recruitment/PublicJobDetailCurrent";
import { PublicJobDetailDark } from "@/components/design/dark/recruitment/PublicJobDetailDark";
import { PublicJobDetailOrganic } from "@/components/design/organic/recruitment/PublicJobDetailOrganic";
import type { PublicJobDetail } from "@/types/recruitment";

export function PublicJobDetailSwitcher({ job }: { job: PublicJobDetail }) {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <PublicJobDetailDark job={job} />;
  if (mode === "organic") return <PublicJobDetailOrganic job={job} />;
  return <PublicJobDetailCurrent job={job} />;
}
