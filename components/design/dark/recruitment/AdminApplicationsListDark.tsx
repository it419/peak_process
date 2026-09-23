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
  applied: "bg-dark-text-faint",
  under_review: "bg-dark-gold",
  shortlisted: "bg-dark-gold",
  interview: "bg-dark-gold",
  selected: "bg-dark-success",
  rejected: "bg-dark-error",
};

export function AdminApplicationsListDark({ jobTitle, applications }: { jobTitle: string; applications: ApplicationSummary[] }) {
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
      <h1 className="font-dark-display text-2xl font-semibold tracking-wide text-dark-text uppercase">{jobTitle}</h1>
      <p className="mt-1 text-sm text-dark-text-muted">
        {applications.length} application{applications.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dark-text-faint" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates…"
            className="h-10 w-full rounded-md border border-dark-border bg-dark-surface-2 pl-10 pr-3 text-sm text-dark-text placeholder:text-dark-text-faint outline-none focus:border-dark-gold"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-dark-border bg-dark-surface-2 px-3 text-sm text-dark-text outline-none focus:border-dark-gold"
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
          className="flex h-10 items-center gap-1.5 rounded-md border border-dark-border bg-dark-surface-2 px-3 text-sm text-dark-text hover:border-dark-border-strong"
        >
          <ArrowUpDown className="size-3.5" aria-hidden />
          {newestFirst ? "Newest first" : "Oldest first"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-dark-text-muted">
          {applications.length === 0 ? "No one has applied yet." : "No applications match your filters."}
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-dark-border bg-dark-surface">
          {filtered.map((app, index) => (
            <div
              key={app.id}
              className={cn(
                "flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between",
                index !== filtered.length - 1 && "border-b border-dark-border",
              )}
            >
              <div className="min-w-0">
                <p className="font-dark-display text-base font-semibold text-dark-text">{app.candidateName}</p>
                <p className="mt-1 text-sm text-dark-text-muted">
                  {app.experienceYears != null ? `${app.experienceYears} years experience · ` : ""}
                  Applied {formatDate(app.appliedAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <span className="flex items-center gap-2 text-sm font-medium text-dark-text">
                  <span className={cn("size-1.5 rounded-full", STATUS_DOT[app.status])} aria-hidden />
                  {applicationStatusLabel(app.status)}
                </span>
                <Link href={`/admin/applications/${app.id}`} className="text-sm font-medium text-dark-gold hover:underline">
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
