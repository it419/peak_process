"use client";

import Link from "next/link";
import { Banknote, Briefcase, Clock, MapPin, TrendingUp, Upload } from "lucide-react";
import { useJobApplicationFormLogic } from "@/hooks/recruitment/useJobApplicationFormLogic";
import { EDUCATION_OPTIONS, employmentTypeLabel, workModeLabel } from "@/lib/recruitment/constants";
import { PeakWordmark } from "@/components/Logo";
import { TextField } from "@/components/ui/TextField";
import { TextareaField } from "@/components/ui/TextareaField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
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
      <Icon className="mt-0.5 size-4 shrink-0 text-paper-ink-400" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-paper-ink-400">{label}</p>
        <p className="text-sm font-medium text-paper-ink-900">{value}</p>
      </div>
    </div>
  );
}

export function JobApplicationFormCurrent({ job }: { job: PublicJobDetail }) {
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
    <div className="min-h-screen bg-paper-50">
      <header className="border-b border-paper-200 px-5 py-5 tablet:px-10">
        <Link href="/jobs">
          <PeakWordmark subtitle="Careers" tone="light" />
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 tablet:px-10 tablet:py-20">
        <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-paper-ink-600 hover:text-paper-ink-900">
          ← Back to {job.title}
        </Link>
        <h1 className="mt-4 font-display text-[2rem] leading-[1.1] font-semibold text-paper-ink-900 tablet:text-[2.5rem]">
          Apply for {job.title}
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-paper-ink-600">
          Tell us a bit about yourself — it only takes a few minutes.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <form onSubmit={onContinue} className="min-w-0 rounded-xl border border-paper-200 bg-white p-6 tablet:p-8">
            <div className="flex flex-col gap-9">
              <section>
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Your details</h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <TextField label="First name" required autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
                  <TextField label="Last name" required autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
                  <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
                  <TextField label="Phone number" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
                  <TextField label="Current location" required error={errors.location?.message} {...register("location")} />
                  <TextField
                    label="Years of experience"
                    type="number"
                    min={0}
                    required
                    error={errors.experienceYears?.message}
                    {...register("experienceYears")}
                  />
                  <div className="sm:col-span-2">
                    <SelectField
                      label="Highest education"
                      required
                      options={[...EDUCATION_OPTIONS]}
                      error={errors.education?.message}
                      {...register("education")}
                    />
                  </div>
                </div>
              </section>

              <section className="border-t border-paper-200 pt-8">
                <h2 className="font-display text-lg font-semibold text-paper-ink-900">Resume & links</h2>
                <div className="mt-4 flex flex-col gap-5">
                  <div>
                    <label className="text-sm font-medium text-paper-ink-900">
                      Resume <span className="text-ember-600">*</span>
                    </label>
                    <div className="mt-1.5">
                      <label className="flex h-11 w-fit cursor-pointer items-center gap-2 rounded-md border border-paper-200 bg-white px-4 text-sm font-medium text-paper-ink-900 transition-colors hover:border-ember-600/40 hover:bg-paper-100">
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
                        <p className="mt-1.5 text-sm text-paper-ink-600">
                          {resumeFile.name} · {formatBytes(resumeFile.size)}
                        </p>
                      )}
                    </div>
                    <p className="mt-1.5 min-h-4.25 text-[0.8125rem] text-error">{resumeError || " "}</p>
                  </div>

                  <TextareaField label="Cover letter" rows={5} helperText="Optional" error={errors.coverLetter?.message} {...register("coverLetter")} />
                  <TextField
                    label="LinkedIn profile"
                    type="url"
                    placeholder="https://linkedin.com/in/you"
                    helperText="Optional"
                    error={errors.linkedinUrl?.message}
                    {...register("linkedinUrl")}
                  />
                  <TextField
                    label="Portfolio / Website"
                    type="url"
                    placeholder="https://…"
                    helperText="Optional"
                    error={errors.portfolioUrl?.message}
                    {...register("portfolioUrl")}
                  />

                  <div>
                    <label className="flex h-11 w-fit cursor-pointer items-center gap-2 rounded-md border border-paper-200 bg-white px-4 text-sm font-medium text-paper-ink-900 transition-colors hover:border-ember-600/40 hover:bg-paper-100">
                      <Upload className="size-4" aria-hidden />
                      {otherFile ? "Replace additional file" : "Attach additional document (optional)"}
                      <input type="file" className="hidden" onChange={(e) => setOtherFile(e.target.files?.[0] ?? null)} />
                    </label>
                    {otherFile && (
                      <p className="mt-1.5 text-sm text-paper-ink-600">
                        {otherFile.name} · {formatBytes(otherFile.size)}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {submitError && <p className="text-sm text-error">{submitError}</p>}

              <Button type="submit" isLoading={isSubmitting} className="w-full justify-center sm:w-auto">
                Submit application
              </Button>
            </div>
          </form>

          <aside className="lg:sticky lg:top-10">
            <div className="rounded-xl border border-paper-200 bg-white p-6">
              <p className="text-xs font-medium tracking-wide text-paper-ink-400 uppercase">Applying for</p>
              <p className="mt-1.5 font-display text-lg font-semibold text-paper-ink-900">{job.title}</p>

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
