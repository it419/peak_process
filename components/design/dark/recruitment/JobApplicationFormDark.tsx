"use client";

import Link from "next/link";
import { Banknote, Briefcase, Clock, MapPin, TrendingUp, Upload } from "lucide-react";
import { useJobApplicationFormLogic } from "@/hooks/recruitment/useJobApplicationFormLogic";
import { EDUCATION_OPTIONS, employmentTypeLabel, workModeLabel } from "@/lib/recruitment/constants";
import { DarkWordmark } from "@/components/design/dark/DarkWordmark";
import { DarkTextField } from "@/components/design/dark/ui/DarkTextField";
import { DarkTextareaField } from "@/components/design/dark/ui/DarkTextareaField";
import { DarkSelectField } from "@/components/design/dark/ui/DarkSelectField";
import { DarkButton } from "@/components/design/dark/ui/DarkButton";
import { formatBytes } from "@/lib/utils/formatBytes";
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

function FactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-dark-text-faint" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-dark-text-faint">{label}</p>
        <p className="text-sm font-medium text-dark-text">{value}</p>
      </div>
    </div>
  );
}

export function JobApplicationFormDark({ job }: { job: PublicJobDetail }) {
  const {
    register,
    errors,
    isSubmitting,
    submitError,
    resumeFile,
    setResumeFile,
    resumeError,
    otherFile,
    setOtherFile,
    onContinue,
  } = useJobApplicationFormLogic(job.id);

  const experience = experienceRange(job.experienceMinYears, job.experienceMaxYears);
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <header className="border-b border-dark-border px-5 py-5 tablet:px-10">
        <Link href="/jobs">
          <DarkWordmark />
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 tablet:px-10 tablet:py-20">
        <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-dark-text-muted hover:text-dark-text">
          ← Back to {job.title}
        </Link>
        <h1 className="font-dark-display mt-4 text-[2rem] leading-[1.1] font-semibold text-dark-text tablet:text-[2.5rem]">
          Apply for {job.title}
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-dark-text-muted">
          Tell us a bit about yourself — it only takes a few minutes.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <form onSubmit={onContinue} className="min-w-0 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
            <div className="flex flex-col gap-9">
              <section>
                <h2 className="font-dark-display text-base font-semibold text-dark-text">Your details</h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DarkTextField label="First name" required autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
                  <DarkTextField label="Last name" required autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
                  <DarkTextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
                  <DarkTextField label="Phone number" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
                  <DarkTextField label="Current location" required error={errors.location?.message} {...register("location")} />
                  <DarkTextField
                    label="Years of experience"
                    type="number"
                    min={0}
                    required
                    error={errors.experienceYears?.message}
                    {...register("experienceYears")}
                  />
                  <div className="sm:col-span-2">
                    <DarkSelectField
                      label="Highest education"
                      required
                      options={[...EDUCATION_OPTIONS]}
                      error={errors.education?.message}
                      {...register("education")}
                    />
                  </div>
                </div>
              </section>

              <section className="border-t border-dark-border pt-8">
                <h2 className="font-dark-display text-base font-semibold text-dark-text">Resume & links</h2>
                <div className="mt-4 flex flex-col gap-5">
                  <div>
                    <label className="text-[0.75rem] font-medium tracking-wide text-dark-text-muted uppercase">
                      Resume <span className="text-dark-gold">*</span>
                    </label>
                    <div className="mt-1.5">
                      <label className="flex h-11 w-fit cursor-pointer items-center gap-2 rounded-md border border-dark-border-strong bg-transparent px-4 text-sm font-medium text-dark-text transition-colors hover:border-dark-gold/60 hover:text-dark-gold">
                        <Upload className="size-4" aria-hidden />
                        {resumeFile ? "Replace file" : "Upload resume"}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                      {resumeFile && (
                        <p className="mt-1.5 text-sm text-dark-text-muted">
                          {resumeFile.name} · {formatBytes(resumeFile.size)}
                        </p>
                      )}
                    </div>
                    <p className="mt-1.5 min-h-4.25 text-[0.8125rem] text-dark-error">{resumeError || " "}</p>
                  </div>

                  <DarkTextareaField label="Cover letter" rows={5} helperText="Optional" error={errors.coverLetter?.message} {...register("coverLetter")} />
                  <DarkTextField
                    label="LinkedIn profile"
                    type="url"
                    placeholder="https://linkedin.com/in/you"
                    helperText="Optional"
                    error={errors.linkedinUrl?.message}
                    {...register("linkedinUrl")}
                  />
                  <DarkTextField
                    label="Portfolio / Website"
                    type="url"
                    placeholder="https://…"
                    helperText="Optional"
                    error={errors.portfolioUrl?.message}
                    {...register("portfolioUrl")}
                  />

                  <div>
                    <label className="flex h-11 w-fit cursor-pointer items-center gap-2 rounded-md border border-dark-border-strong bg-transparent px-4 text-sm font-medium text-dark-text transition-colors hover:border-dark-gold/60 hover:text-dark-gold">
                      <Upload className="size-4" aria-hidden />
                      {otherFile ? "Replace additional file" : "Attach additional document (optional)"}
                      <input type="file" className="hidden" onChange={(e) => setOtherFile(e.target.files?.[0] ?? null)} />
                    </label>
                    {otherFile && (
                      <p className="mt-1.5 text-sm text-dark-text-muted">
                        {otherFile.name} · {formatBytes(otherFile.size)}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {submitError && <p className="text-sm text-dark-error">{submitError}</p>}

              <DarkButton type="submit" isLoading={isSubmitting} className="w-full justify-center sm:w-auto">
                Submit application
              </DarkButton>
            </div>
          </form>

          <aside className="lg:sticky lg:top-10">
            <div className="rounded-xl border border-dark-border bg-dark-surface p-6">
              <p className="text-xs font-medium tracking-wide text-dark-text-faint uppercase">Applying for</p>
              <p className="mt-1.5 font-dark-display text-lg font-semibold text-dark-text">{job.title}</p>

              <div className="mt-5 flex flex-col gap-4">
                {job.location && <FactRow icon={MapPin} label="Location" value={job.location} />}
                <FactRow icon={Briefcase} label="Employment type" value={employmentTypeLabel(job.employmentType)} />
                <FactRow icon={Clock} label="Work mode" value={workModeLabel(job.workMode)} />
                {experience && <FactRow icon={TrendingUp} label="Experience" value={experience} />}
                {salary && <FactRow icon={Banknote} label="Salary" value={salary} />}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
