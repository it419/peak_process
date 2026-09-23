"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { applicationStatusLabel, APPLICATION_STATUS_OPTIONS } from "@/lib/recruitment/constants";
import type { ApplicationSummary } from "@/types/recruitment";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const STATUS_DOT: Record<string, string> = {
  applied: "bg-organic-ink-faint",
  under_review: "bg-organic-gold",
  shortlisted: "bg-organic-gold",
  interview: "bg-organic-gold",
  selected: "bg-organic-success",
  rejected: "bg-organic-error",
};

export function AdminApplicationsListOrganic({
  jobTitle,
  applications,
}: {
  jobTitle: string;
  applications: ApplicationSummary[];
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newestFirst, setNewestFirst] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = applications.filter(
      (a) =>
        (statusFilter === "all" || a.status === statusFilter) &&
        (q === "" || a.candidateName.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)),
    );
    list = [...list].sort((a, b) =>
      newestFirst ? b.appliedAt.localeCompare(a.appliedAt) : a.appliedAt.localeCompare(b.appliedAt),
    );
    return list;
  }, [applications, query, statusFilter, newestFirst]);

  return (
    <div>
      <h1 className="font-organic-display text-2xl font-semibold tracking-wide text-organic-ink uppercase">{jobTitle}</h1>
      <p className="mt-1 text-sm text-organic-ink-muted">
        {applications.length} application{applications.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-organic-ink-faint" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates…"
            className="h-11 w-full rounded-xl border border-organic-border bg-white/70 pl-10 pr-3 text-sm text-organic-ink placeholder:text-organic-ink-faint outline-none focus:border-organic-terracotta"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 rounded-xl border border-organic-border bg-white/70 px-3 text-sm text-organic-ink outline-none focus:border-organic-terracotta"
        >
          <option value="all">All Statuses</option>
          {APPLICATION_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setNewestFirst((v) => !v)}
          className="flex h-11 items-center gap-1.5 rounded-xl border border-organic-border bg-white/70 px-3 text-sm text-organic-ink hover:border-organic-terracotta"
        >
          <ArrowUpDown className="size-3.5" aria-hidden />
          {newestFirst ? "Newest first" : "Oldest first"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-organic-ink-muted">
          {applications.length === 0 ? "No one has applied yet." : "No applications match your filters."}
        </p>
      ) : (
        <div className="mt-6 rounded-[1.75rem] bg-organic-surface">
          {filtered.map((app, index) => (
            <div
              key={app.id}
              className={cn(
                "flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between",
                index !== filtered.length - 1 && "border-b border-organic-border",
              )}
            >
              <div className="min-w-0">
                <p className="font-organic-display text-base font-semibold text-organic-ink">{app.candidateName}</p>
                <p className="mt-1 text-sm text-organic-ink-muted">
                  {app.experienceYears != null ? `${app.experienceYears} years experience · ` : ""}
                  Applied {formatDate(app.appliedAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <span className="flex items-center gap-2 text-sm font-medium text-organic-ink">
                  <span className={cn("size-1.5 rounded-full", STATUS_DOT[app.status])} aria-hidden />
                  {applicationStatusLabel(app.status)}
                </span>
                <Link href={`/admin/applications/${app.id}`} className="text-sm font-medium text-organic-terracotta hover:underline">
                  View Application
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
