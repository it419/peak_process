"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Search } from "lucide-react";
import { applicationStatusLabel, APPLICATION_STATUS_OPTIONS } from "@/lib/recruitment/constants";
import type { ApplicationSummary } from "@/types/recruitment";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const STATUS_DOT: Record<string, string> = {
  applied: "bg-paper-ink-400",
  under_review: "bg-gold-500",
  shortlisted: "bg-ember-600",
  interview: "bg-ember-600",
  selected: "bg-success",
  rejected: "bg-error",
};

export function AdminApplicationsListCurrent({ jobTitle, applications }: { jobTitle: string; applications: ApplicationSummary[] }) {
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
      <h1 className="font-display text-2xl font-semibold tracking-wide text-paper-ink-900 uppercase">{jobTitle}</h1>
      <p className="mt-1 text-sm text-paper-ink-600">
        {applications.length} application{applications.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-paper-ink-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates…"
            className="h-10 w-full rounded-md border border-paper-200 bg-white pl-10 pr-3 text-sm text-paper-ink-900 outline-none focus:border-ember-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-paper-200 bg-white px-3 text-sm text-paper-ink-900 outline-none focus:border-ember-600"
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
          className="flex h-10 items-center gap-1.5 rounded-md border border-paper-200 bg-white px-3 text-sm text-paper-ink-900 hover:bg-paper-100"
        >
          <ArrowUpDown className="size-3.5" aria-hidden />
          {newestFirst ? "Newest first" : "Oldest first"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-paper-ink-600">
          {applications.length === 0 ? "No one has applied yet." : "No applications match your filters."}
        </p>
      ) : (
        <div className="mt-6 border-t border-paper-200">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="flex flex-col gap-3 border-b border-paper-200 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-paper-ink-900">{app.candidateName}</p>
                <p className="mt-1 text-sm text-paper-ink-600">
                  {app.experienceYears != null ? `${app.experienceYears} years experience · ` : ""}
                  Applied {formatDate(app.appliedAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <span className="flex items-center gap-2 text-sm font-medium text-paper-ink-900">
                  <span className={`size-1.5 rounded-full ${STATUS_DOT[app.status]}`} aria-hidden />
                  {applicationStatusLabel(app.status)}
                </span>
                <Link href={`/admin/applications/${app.id}`} className="text-sm font-medium text-ember-700 hover:underline">
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
