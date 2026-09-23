"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Briefcase, Clock, MapPin, Search, TrendingUp } from "lucide-react";
import { OrganicWordmark } from "@/components/design/organic/OrganicWordmark";
import { CurveDivider } from "@/components/design/organic/CurveDivider";
import { organicButtonVariants } from "@/components/design/organic/ui/OrganicButton";
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-organic-border bg-organic-bg px-3 py-1 text-xs font-medium text-organic-ink-muted">
      <Icon className="size-3.5" aria-hidden />
      {children}
    </span>
  );
}

function JobCard({ job }: { job: PublicJobSummary }) {
  const experience = experienceRange(job.experienceMinYears, job.experienceMaxYears);
  return (
    <div className="group flex flex-col rounded-3xl border border-organic-border bg-white/70 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-organic-terracotta/40 hover:bg-white hover:shadow-lg hover:shadow-organic-ink/5">
      <Link href={`/jobs/${job.id}`} className="min-w-0">
        <h2 className="font-organic-display text-xl font-semibold text-organic-ink transition-colors group-hover:text-organic-terracotta">
          {job.title}
        </h2>
      </Link>
      {job.department && <p className="mt-1 text-sm font-medium text-organic-terracotta">{job.department}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {job.location && <Pill icon={MapPin}>{job.location}</Pill>}
        <Pill icon={Briefcase}>{employmentTypeLabel(job.employmentType)}</Pill>
        <Pill icon={Clock}>{workModeLabel(job.workMode)}</Pill>
        {experience && <Pill icon={TrendingUp}>{experience}</Pill>}
      </div>

      {job.overviewExcerpt && (
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-organic-ink-muted">{job.overviewExcerpt}</p>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-organic-border pt-4">
        <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-organic-ink-muted hover:text-organic-ink">
          View details
        </Link>
        <Link href={`/jobs/${job.id}/apply`} className={organicButtonVariants({ variant: "primary", size: "sm" })}>
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export function PublicJobsListOrganic({ jobs }: { jobs: PublicJobSummary[] }) {
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
    <div className="min-h-screen bg-organic-bg font-organic-sans">
      <header className="border-b border-organic-border px-5 py-5 sm:px-10">
        <Link href="/jobs">
          <OrganicWordmark />
        </Link>
      </header>

      <div className="bg-organic-surface px-5 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-semibold tracking-widest text-organic-terracotta uppercase">Open Positions</p>
          <h1 className="font-organic-display mt-4 text-[2.5rem] leading-[1.15] font-semibold text-organic-ink italic sm:text-[3.25rem]">
            Find work that moves people forward.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-organic-ink-muted">
            Join a team redefining operational excellence — explore open roles across engineering, operations, and
            beyond.
          </p>
        </div>
      </div>
      <CurveDivider fill="var(--color-organic-surface)" className="-mt-px h-10 sm:h-16 md:h-20" />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-organic-ink-faint" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles…"
              className="h-11 w-full rounded-full border border-organic-border bg-white/70 pl-10 pr-4 text-sm text-organic-ink placeholder:text-organic-ink-faint outline-none transition-colors focus:border-organic-terracotta"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-11 rounded-full border border-organic-border bg-white/70 px-4 text-sm text-organic-ink outline-none transition-colors focus:border-organic-terracotta sm:w-52"
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
            className="h-11 rounded-full border border-organic-border bg-white/70 px-4 text-sm text-organic-ink outline-none transition-colors focus:border-organic-terracotta sm:w-52"
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
          <p className="mt-14 text-sm text-organic-ink-muted">
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

      <CurveDivider fill="var(--color-organic-surface)" flip className="h-10 sm:h-16 md:h-20" />
      <div className="bg-organic-surface px-5 py-10 text-center sm:px-10">
        <p className="text-sm text-organic-ink-muted">
          Don{"’"}t see the right fit? Check back soon — we{"’"}re always growing.
        </p>
      </div>
    </div>
  );
}
