"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { jobStatusLabel } from "@/lib/recruitment/constants";
import { useJobStatusAction } from "@/hooks/recruitment/useJobStatusAction";
import { organicButtonVariants } from "@/components/design/organic/ui/OrganicButton";
import { AdminJobFormOrganic } from "@/components/design/organic/recruitment/AdminJobFormOrganic";
import type { JobDetail } from "@/types/recruitment";

const STATUS_TEXT: Record<string, string> = {
  draft: "text-organic-ink-faint",
  published: "text-organic-success",
  closed: "text-organic-ink-muted",
};

export function AdminJobDetailOrganic({ job }: { job: JobDetail }) {
  const { changeStatus, pendingId, error } = useJobStatusAction();
  const busy = pendingId === job.id;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-organic-border pb-6">
        <div>
          <p className={cn("text-sm font-semibold tracking-wide uppercase", STATUS_TEXT[job.status])}>
            {jobStatusLabel(job.status)}
          </p>
          <p className="mt-1 text-sm text-organic-ink-muted">
            {job.applicationCount} application{job.applicationCount === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/admin/jobs/${job.id}/applications`}
            className="text-sm font-medium text-organic-terracotta hover:underline"
          >
            View Applications
          </Link>
          {job.status === "draft" && (
            <button
              type="button"
              disabled={busy}
              onClick={() => changeStatus(job.id, "published")}
              className={organicButtonVariants({ variant: "primary", size: "sm" })}
            >
              Publish
            </button>
          )}
          {job.status === "published" && (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => changeStatus(job.id, "draft")}
                className={organicButtonVariants({ variant: "secondary", size: "sm" })}
              >
                Unpublish
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => changeStatus(job.id, "closed")}
                className={organicButtonVariants({ variant: "secondary", size: "sm" })}
              >
                Close Job
              </button>
            </>
          )}
          {job.status === "closed" && (
            <button
              type="button"
              disabled={busy}
              onClick={() => changeStatus(job.id, "published")}
              className={organicButtonVariants({ variant: "secondary", size: "sm" })}
            >
              Reopen
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-organic-error">{error}</p>}

      <div className="mt-8">
        <AdminJobFormOrganic key={job.updatedAt} mode="edit" jobId={job.id} initialJob={job} />
      </div>
    </div>
  );
}
