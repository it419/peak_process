import Link from "next/link";
import { Banknote, Briefcase, Clock, MapPin, TrendingUp } from "lucide-react";
import { OrganicWordmark } from "@/components/design/organic/OrganicWordmark";
import { CurveDivider } from "@/components/design/organic/CurveDivider";
import { organicButtonVariants } from "@/components/design/organic/ui/OrganicButton";
import { employmentTypeLabel, workModeLabel } from "@/lib/recruitment/constants";
import type { PublicJobDetail } from "@/types/recruitment";

function experienceRange(min: number | null, max: number | null): string | null {
  if (min == null && max == null) return null;
  if (min != null && max != null) return `${min}–${max} Years`;
  if (min != null) return `${min}+ Years`;
  return `Up to ${max} Years`;
}

function formatSalary(min: number | null, max: number | null): string | null {
  if (min == null && max == null) return null;
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  if (min != null && max != null) return `${fmt(min)} – ${fmt(max)}`;
  if (min != null) return `${fmt(min)}+`;
  return `Up to ${fmt(max as number)}`;
}

function Pill({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-organic-border bg-white/70 px-3 py-1 text-xs font-medium text-organic-ink-muted">
      <Icon className="size-3.5" aria-hidden />
      {children}
    </span>
  );
}

function FactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-organic-ink-faint" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-organic-ink-faint">{label}</p>
        <p className="text-sm font-medium text-organic-ink">{value}</p>
      </div>
    </div>
  );
}

function BulletList({ text }: { text: string | null }) {
  if (!text) return null;
  const items = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-organic-ink-muted">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-organic-terracotta" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PublicJobDetailOrganic({ job }: { job: PublicJobDetail }) {
  const experience = experienceRange(job.experienceMinYears, job.experienceMaxYears);
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <div className="min-h-screen bg-organic-bg font-organic-sans">
      <header className="border-b border-organic-border px-5 py-5 sm:px-10">
        <Link href="/jobs">
          <OrganicWordmark />
        </Link>
      </header>

      <div className="bg-organic-surface px-5 py-14 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Link href="/jobs" className="text-sm font-medium text-organic-ink-muted hover:text-organic-ink">
            ← All positions
          </Link>
          <h1 className="font-organic-display mt-4 text-[2.25rem] leading-[1.1] font-semibold text-organic-ink sm:text-[2.75rem]">
            {job.title}
          </h1>
          {job.department && <p className="mt-2 text-sm font-medium text-organic-terracotta">{job.department}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {job.location && <Pill icon={MapPin}>{job.location}</Pill>}
            <Pill icon={Briefcase}>{employmentTypeLabel(job.employmentType)}</Pill>
            <Pill icon={Clock}>{workModeLabel(job.workMode)}</Pill>
            {experience && <Pill icon={TrendingUp}>{experience}</Pill>}
            {salary && <Pill icon={Banknote}>{salary}</Pill>}
          </div>
        </div>
      </div>
      <CurveDivider fill="var(--color-organic-surface)" className="-mt-px h-8 sm:h-12 md:h-16" />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="min-w-0">
            <Link href={`/jobs/${job.id}/apply`} className={`${organicButtonVariants({ variant: "primary" })} lg:hidden`}>
              Apply Now
            </Link>

            {job.overview && (
              <section className="mt-2 lg:mt-0">
                <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Overview</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-organic-ink-muted">{job.overview}</p>
              </section>
            )}
            {job.responsibilities && (
              <section className="mt-8 border-t border-organic-border pt-8">
                <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Responsibilities</h2>
                <BulletList text={job.responsibilities} />
              </section>
            )}
            {job.requirements && (
              <section className="mt-8 border-t border-organic-border pt-8">
                <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Requirements</h2>
                <BulletList text={job.requirements} />
              </section>
            )}
            {(job.requiredSkills.length > 0 || job.preferredSkills.length > 0) && (
              <section className="mt-8 border-t border-organic-border pt-8">
                <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Skills</h2>
                {job.requiredSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium tracking-wide text-organic-ink-faint uppercase">Required</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.requiredSkills.map((s) => (
                        <span key={s} className="rounded-full border border-organic-border bg-white/70 px-3 py-1 text-sm text-organic-ink">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {job.preferredSkills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium tracking-wide text-organic-ink-faint uppercase">Preferred</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.preferredSkills.map((s) => (
                        <span key={s} className="rounded-full border border-organic-border px-3 py-1 text-sm text-organic-ink-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
            {job.education && (
              <section className="mt-8 border-t border-organic-border pt-8">
                <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Education</h2>
                <p className="mt-3 text-[0.9375rem] text-organic-ink-muted">{job.education}</p>
              </section>
            )}
            {job.benefits && (
              <section className="mt-8 border-t border-organic-border pt-8">
                <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Benefits</h2>
                <BulletList text={job.benefits} />
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-10">
            <div className="rounded-3xl border border-organic-border bg-white/70 p-6">
              <p className="text-xs font-medium tracking-wide text-organic-ink-faint uppercase">You{"’"}re applying for</p>
              <p className="mt-1.5 font-organic-display text-lg font-semibold text-organic-ink">{job.title}</p>

              <div className="mt-5 flex flex-col gap-4">
                {job.location && <FactRow icon={MapPin} label="Location" value={job.location} />}
                <FactRow icon={Briefcase} label="Employment type" value={employmentTypeLabel(job.employmentType)} />
                <FactRow icon={Clock} label="Work mode" value={workModeLabel(job.workMode)} />
                {experience && <FactRow icon={TrendingUp} label="Experience" value={experience} />}
                {salary && <FactRow icon={Banknote} label="Salary" value={salary} />}
              </div>

              <Link
                href={`/jobs/${job.id}/apply`}
                className={`${organicButtonVariants({ variant: "primary" })} mt-6 w-full justify-center`}
              >
                Apply Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
