"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Briefcase, Clock, MapPin, Search, TrendingUp } from "lucide-react";
import { DarkWordmark } from "@/components/design/dark/DarkWordmark";
import { darkButtonVariants } from "@/components/design/dark/ui/DarkButton";
import { employmentTypeLabel, workModeLabel } from "@/lib/recruitment/constants";
import type { PublicJobSummary } from "@/types/recruitment";

function experienceRange(min: number | null, max: number | null): string | null {
  if (min == null && max == null) return null;
  if (min != null && max != null) return `${min}–${max} Years`;
  if (min != null) return `${min}+ Years`;
  return `Up to ${max} Years`;
}

function Pill({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dark-border bg-dark-surface-2 px-3 py-1 text-xs font-medium text-dark-text-muted">
      <Icon className="size-3.5" aria-hidden />
      {children}
    </span>
  );
}

function JobCard({ job }: { job: PublicJobSummary }) {
  const experience = experienceRange(job.experienceMinYears, job.experienceMaxYears);
  return (
    <div className="group flex flex-col rounded-xl border border-dark-border bg-dark-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-dark-gold/50 hover:shadow-lg hover:shadow-black/20">
      <Link href={`/jobs/${job.id}`} className="min-w-0">
        <h2 className="font-dark-display text-xl font-semibold text-dark-text transition-colors group-hover:text-dark-gold">
          {job.title}
        </h2>
      </Link>
      {job.department && <p className="mt-1 text-sm font-medium text-dark-gold">{job.department}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {job.location && <Pill icon={MapPin}>{job.location}</Pill>}
        <Pill icon={Briefcase}>{employmentTypeLabel(job.employmentType)}</Pill>
        <Pill icon={Clock}>{workModeLabel(job.workMode)}</Pill>
        {experience && <Pill icon={TrendingUp}>{experience}</Pill>}
      </div>

      {job.overviewExcerpt && (
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-dark-text-muted">{job.overviewExcerpt}</p>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-dark-border pt-4">
        <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-dark-text-muted hover:text-dark-text">
          View details
        </Link>
        <Link href={`/jobs/${job.id}/apply`} className={darkButtonVariants({ variant: "primary", size: "sm" })}>
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export function PublicJobsListDark({ jobs }: { jobs: PublicJobSummary[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [location, setLocation] = useState("all");

  const departments = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.department).filter((d): d is string => Boolean(d)))).sort(),
    [jobs],
  );
  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location).filter((l): l is string => Boolean(l)))).sort(),
    [jobs],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (department === "all" || j.department === department) &&
        (location === "all" || j.location === location) &&
        (q === "" || j.title.toLowerCase().includes(q) || (j.department ?? "").toLowerCase().includes(q)),
    );
  }, [jobs, query, department, location]);

  const hasFilters = query !== "" || department !== "all" || location !== "all";

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <header className="border-b border-dark-border px-5 py-5 tablet:px-10">
        <Link href="/jobs">
          <DarkWordmark />
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-16 tablet:px-10 tablet:py-24">
        <p className="text-[0.8125rem] font-semibold tracking-widest text-dark-gold uppercase">Open Positions</p>
        <h1 className="font-dark-display mt-3 text-[2.25rem] leading-[1.1] font-semibold text-dark-text tablet:text-[3rem]">
          Find your next opportunity at Peak Process Partners.
        </h1>
        <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-dark-text-muted">
          Join a team redefining operational excellence — explore open roles across engineering, operations, and
          beyond.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dark-text-faint" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles…"
              className="h-11 w-full rounded-md border border-dark-border bg-dark-surface-2 pl-10 pr-3 text-sm text-dark-text placeholder:text-dark-text-faint outline-none transition-colors focus:border-dark-gold"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-11 rounded-md border border-dark-border bg-dark-surface-2 px-3 text-sm text-dark-text outline-none transition-colors focus:border-dark-gold sm:w-52"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11 rounded-md border border-dark-border bg-dark-surface-2 px-3 text-sm text-dark-text outline-none transition-colors focus:border-dark-gold sm:w-52"
          >
            <option value="all">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-sm text-dark-text-muted">
            {jobs.length === 0
              ? "There are no open positions right now — check back soon."
              : hasFilters
                ? "No roles match your filters."
                : "There are no open positions right now — check back soon."}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
