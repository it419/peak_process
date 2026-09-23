"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { employmentTypeLabel, jobStatusLabel, workModeLabel } from "@/lib/recruitment/constants";
import { useJobStatusAction } from "@/hooks/recruitment/useJobStatusAction";
import { buttonVariants } from "@/components/ui/buttonVariants";
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
  draft: "bg-paper-ink-400",
  published: "bg-success",
  closed: "bg-paper-ink-600",
};

export function AdminJobsListCurrent({ jobs }: { jobs: JobSummary[] }) {
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
        <h1 className="font-display text-2xl font-semibold text-paper-ink-900">Job Openings</h1>
        <Link href="/admin/jobs/new" className={buttonVariants({ variant: "primary" })}>
          <Plus className="size-4" aria-hidden /> Create Job
        </Link>
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-paper-ink-400" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs…"
          className="h-10 w-full rounded-md border border-paper-200 bg-white pl-10 pr-3 text-sm text-paper-ink-900 outline-none focus:border-ember-600"
        />
      </div>

      {error && <p className="mt-4 text-sm text-error">{error}</p>}

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-paper-ink-600">
          {jobs.length === 0 ? "No job openings yet — create your first one." : "No jobs match your search."}
        </p>
      ) : (
        <div className="mt-6 border-t border-paper-200">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-3 border-b border-paper-200 py-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={cn("size-1.5 shrink-0 rounded-full", STATUS_DOT[job.status])} aria-hidden />
                  <p className="font-display text-base font-semibold text-paper-ink-900">{job.title}</p>
                </div>
                <p className="mt-1 text-sm text-paper-ink-600">
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
                <p className="mt-1 text-sm text-paper-ink-400">
                  {jobStatusLabel(job.status)} · {job.applicationCount} application{job.applicationCount === 1 ? "" : "s"} ·
                  Created {formatDate(job.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {job.status !== "draft" && (
                  <Link
                    href={`/admin/jobs/${job.id}/applications`}
                    className="text-sm font-medium text-ember-700 hover:underline"
                  >
                    View Applications
                  </Link>
                )}
                <Link href={`/admin/jobs/${job.id}`} className="text-sm font-medium text-paper-ink-900 hover:underline">
                  Edit
                </Link>
                {job.status === "draft" && (
                  <button
                    type="button"
                    disabled={pendingId === job.id}
                    onClick={() => changeStatus(job.id, "published")}
                    className="text-sm font-medium text-success hover:underline disabled:opacity-50"
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
