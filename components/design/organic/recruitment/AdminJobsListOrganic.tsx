"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { employmentTypeLabel, jobStatusLabel, workModeLabel } from "@/lib/recruitment/constants";
import { useJobStatusAction } from "@/hooks/recruitment/useJobStatusAction";
import { organicButtonVariants } from "@/components/design/organic/ui/OrganicButton";
import type { JobSummary } from "@/types/recruitment";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function experienceRange(min: number | null, max: number | null): string | null {
  if (min == null && max == null) return null;
  if (min != null && max != null) return `${min}–${max} Years`;
  if (min != null) return `${min}+ Years`;
  return `Up to ${max} Years`;
}

const STATUS_DOT: Record<string, string> = {
  draft: "bg-organic-ink-faint",
  published: "bg-organic-success",
  closed: "bg-organic-ink-muted",
};

export function AdminJobsListOrganic({ jobs }: { jobs: JobSummary[] }) {
  const [query, setQuery] = useState("");
  const { changeStatus, pendingId, error } = useJobStatusAction();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        (j.department ?? "").toLowerCase().includes(q) ||
        (j.location ?? "").toLowerCase().includes(q),
    );
  }, [jobs, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-organic-display text-2xl font-semibold text-organic-ink">Job Openings</h1>
        <Link href="/admin/jobs/new" className={organicButtonVariants({ variant: "primary" })}>
          <Plus className="size-4" aria-hidden /> Create Job
        </Link>
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-organic-ink-faint" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs…"
          className="h-11 w-full rounded-xl border border-organic-border bg-white/70 pl-10 pr-3 text-sm text-organic-ink placeholder:text-organic-ink-faint outline-none focus:border-organic-terracotta"
        />
      </div>

      {error && <p className="mt-4 text-sm text-organic-error">{error}</p>}

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-organic-ink-muted">
          {jobs.length === 0 ? "No job openings yet — create your first one." : "No jobs match your search."}
        </p>
      ) : (
        <div className="mt-6 rounded-[1.75rem] bg-organic-surface">
          {filtered.map((job, index) => (
            <div
              key={job.id}
              className={cn(
                "flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-start sm:justify-between",
                index !== filtered.length - 1 && "border-b border-organic-border",
              )}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={cn("size-1.5 shrink-0 rounded-full", STATUS_DOT[job.status])} aria-hidden />
                  <p className="font-organic-display text-base font-semibold text-organic-ink">{job.title}</p>
                </div>
                <p className="mt-1 text-sm text-organic-ink-muted">
                  {[
                    job.department,
                    job.location,
                    employmentTypeLabel(job.employmentType),
                    workModeLabel(job.workMode),
                    experienceRange(job.experienceMinYears, job.experienceMaxYears),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="mt-1 text-sm text-organic-ink-faint">
                  {jobStatusLabel(job.status)} · {job.applicationCount} application{job.applicationCount === 1 ? "" : "s"} ·
                  Created {formatDate(job.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {job.status !== "draft" && (
                  <Link
                    href={`/admin/jobs/${job.id}/applications`}
                    className="text-sm font-medium text-organic-terracotta hover:underline"
                  >
                    View Applications
                  </Link>
                )}
                <Link href={`/admin/jobs/${job.id}`} className="text-sm font-medium text-organic-ink hover:underline">
                  Edit
                </Link>
                {job.status === "draft" && (
                  <button
                    type="button"
                    disabled={pendingId === job.id}
                    onClick={() => changeStatus(job.id, "published")}
                    className="text-sm font-medium text-organic-success hover:underline disabled:opacity-50"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
