import Link from "next/link";
import { Banknote, Briefcase, Clock, MapPin, TrendingUp } from "lucide-react";
import { PeakWordmark } from "@/components/Logo";
import { buttonVariants } from "@/components/ui/buttonVariants";
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-paper-200 bg-paper-100 px-3 py-1 text-xs font-medium text-paper-ink-600">
      <Icon className="size-3.5" aria-hidden />
      {children}
    </span>
  );
}

function FactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-paper-ink-400" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-paper-ink-400">{label}</p>
        <p className="text-sm font-medium text-paper-ink-900">{value}</p>
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
        <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-paper-ink-600">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-ember-600" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PublicJobDetailCurrent({ job }: { job: PublicJobDetail }) {
  const experience = experienceRange(job.experienceMinYears, job.experienceMaxYears);
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <div className="min-h-screen bg-paper-50">
      <header className="border-b border-paper-200 px-5 py-5 tablet:px-10">
        <Link href="/jobs">
          <PeakWordmark subtitle="Careers" tone="light" />
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 tablet:px-10 tablet:py-20">
        <Link href="/jobs" className="text-sm font-medium text-paper-ink-600 hover:text-paper-ink-900">
          ← All positions
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="min-w-0">
            <h1 className="font-display text-[2.25rem] leading-[1.1] font-semibold text-paper-ink-900 tablet:text-[2.75rem]">
              {job.title}
            </h1>
            {job.department && <p className="mt-2 text-sm font-medium text-ember-700">{job.department}</p>}

            <div className="mt-5 flex flex-wrap gap-2">
              {job.location && <Pill icon={MapPin}>{job.location}</Pill>}
              <Pill icon={Briefcase}>{employmentTypeLabel(job.employmentType)}</Pill>
              <Pill icon={Clock}>{workModeLabel(job.workMode)}</Pill>
              {experience && <Pill icon={TrendingUp}>{experience}</Pill>}
              {salary && <Pill icon={Banknote}>{salary}</Pill>}
            </div>

            <Link href={`/jobs/${job.id}/apply`} className={`${buttonVariants({ variant: "primary" })} mt-8 lg:hidden`}>
              Apply Now
            </Link>

            {job.overview && (
              <section className="mt-10 border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Overview</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-ink-600">{job.overview}</p>
              </section>
            )}
            {job.responsibilities && (
              <section className="mt-8 border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Responsibilities</h2>
                <BulletList text={job.responsibilities} />
              </section>
            )}
            {job.requirements && (
              <section className="mt-8 border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Requirements</h2>
                <BulletList text={job.requirements} />
              </section>
            )}
            {(job.requiredSkills.length > 0 || job.preferredSkills.length > 0) && (
              <section className="mt-8 border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Skills</h2>
                {job.requiredSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium tracking-wide text-paper-ink-400 uppercase">Required</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.requiredSkills.map((s) => (
                        <span key={s} className="rounded-md border border-paper-200 bg-paper-100 px-2.5 py-1 text-sm text-paper-ink-900">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {job.preferredSkills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium tracking-wide text-paper-ink-400 uppercase">Preferred</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.preferredSkills.map((s) => (
                        <span key={s} className="rounded-md border border-paper-200 px-2.5 py-1 text-sm text-paper-ink-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
            {job.education && (
              <section className="mt-8 border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Education</h2>
                <p className="mt-3 text-[0.9375rem] text-paper-ink-600">{job.education}</p>
              </section>
            )}
            {job.benefits && (
              <section className="mt-8 border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Benefits</h2>
                <BulletList text={job.benefits} />
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-10">
            <div className="rounded-xl border border-paper-200 bg-white p-6">
              <p className="text-xs font-medium tracking-wide text-paper-ink-400 uppercase">You{"’"}re applying for</p>
              <p className="mt-1.5 font-display text-lg font-semibold text-paper-ink-900">{job.title}</p>

              <div className="mt-5 flex flex-col gap-4">
                {job.location && <FactRow icon={MapPin} label="Location" value={job.location} />}
                <FactRow icon={Briefcase} label="Employment type" value={employmentTypeLabel(job.employmentType)} />
                <FactRow icon={Clock} label="Work mode" value={workModeLabel(job.workMode)} />
                {experience && <FactRow icon={TrendingUp} label="Experience" value={experience} />}
                {salary && <FactRow icon={Banknote} label="Salary" value={salary} />}
              </div>

              <Link href={`/jobs/${job.id}/apply`} className={`${buttonVariants({ variant: "primary" })} mt-6 w-full justify-center`}>
                Apply Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
