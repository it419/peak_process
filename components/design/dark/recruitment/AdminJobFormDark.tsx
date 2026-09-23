"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useJobFormLogic } from "@/hooks/recruitment/useJobFormLogic";
import { EMPLOYMENT_TYPE_OPTIONS, JOB_STATUS_OPTIONS, WORK_MODE_OPTIONS } from "@/lib/recruitment/constants";
import { DarkTextField } from "@/components/design/dark/ui/DarkTextField";
import { DarkTextareaField } from "@/components/design/dark/ui/DarkTextareaField";
import { DarkCheckbox } from "@/components/design/dark/ui/DarkCheckbox";
import { DarkButton } from "@/components/design/dark/ui/DarkButton";
import { JobSelectFieldDark } from "@/components/design/dark/recruitment/ui/JobSelectFieldDark";
import type { JobDetail } from "@/types/recruitment";

interface SkillChipInputProps {
  label: string;
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (index: number) => void;
}

function SkillChipInput({ label, skills, onAdd, onRemove }: SkillChipInputProps) {
  const [value, setValue] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd(value);
      setValue("");
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.75rem] font-medium tracking-wide text-dark-text-muted uppercase">{label}</label>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-md border border-dark-border bg-dark-surface-2 px-2.5 py-1 text-sm text-dark-text"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${skill}`}
                className="text-dark-text-faint hover:text-dark-error"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="h-11 rounded-md border border-dark-border bg-dark-surface-2 px-3.5 text-[0.9375rem] text-dark-text placeholder:text-dark-text-faint outline-none focus:border-dark-gold"
      />
    </div>
  );
}

interface AdminJobFormDarkProps {
  mode: "create" | "edit";
  jobId?: string;
  initialJob?: JobDetail;
}

export function AdminJobFormDark({ mode, jobId, initialJob }: AdminJobFormDarkProps) {
  const { register, errors, isSubmitting, submitError, onContinue, requiredSkills, preferredSkills, addSkill, removeSkill } =
    useJobFormLogic({ mode, jobId, initialJob });

  const cancelHref = mode === "edit" && jobId ? `/admin/jobs/${jobId}` : "/admin/jobs";

  return (
    <form onSubmit={onContinue} className="max-w-3xl">
      <h1 className="font-dark-display text-2xl font-semibold text-dark-text">
        {mode === "create" ? "Create Job" : "Edit Job"}
      </h1>

      <section className="mt-8 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Basic information</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <DarkTextField label="Job title" required error={errors.title?.message} {...register("title")} />
          </div>
          <DarkTextField label="Department" error={errors.department?.message} {...register("department")} />
          <DarkTextField label="Location" error={errors.location?.message} {...register("location")} />
          <JobSelectFieldDark
            label="Employment type"
            required
            options={EMPLOYMENT_TYPE_OPTIONS}
            defaultValue={initialJob?.employmentType ?? "full_time"}
            error={errors.employmentType?.message}
            {...register("employmentType")}
          />
          <JobSelectFieldDark
            label="Work mode"
            required
            options={WORK_MODE_OPTIONS}
            defaultValue={initialJob?.workMode ?? "onsite"}
            error={errors.workMode?.message}
            {...register("workMode")}
          />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Experience & compensation</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DarkTextField
            label="Minimum experience (years)"
            type="number"
            min={0}
            error={errors.experienceMinYears?.message}
            {...register("experienceMinYears")}
          />
          <DarkTextField
            label="Maximum experience (years)"
            type="number"
            min={0}
            error={errors.experienceMaxYears?.message}
            {...register("experienceMaxYears")}
          />
          <DarkTextField label="Minimum salary" type="number" min={0} error={errors.salaryMin?.message} {...register("salaryMin")} />
          <DarkTextField label="Maximum salary" type="number" min={0} error={errors.salaryMax?.message} {...register("salaryMax")} />
          <div className="sm:col-span-2">
            <DarkCheckbox label="Show salary range on the public job posting" {...register("salaryPublic")} />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Description</h2>
        <div className="mt-4 grid grid-cols-1 gap-5">
          <DarkTextareaField
            label="Overview"
            rows={4}
            helperText="A short summary shown near the top of the job page."
            error={errors.overview?.message}
            {...register("overview")}
          />
          <DarkTextareaField
            label="Responsibilities"
            rows={5}
            helperText="One per line — shown as a bullet list."
            error={errors.responsibilities?.message}
            {...register("responsibilities")}
          />
          <DarkTextareaField
            label="Requirements"
            rows={5}
            helperText="One per line — shown as a bullet list."
            error={errors.requirements?.message}
            {...register("requirements")}
          />
          <DarkTextareaField
            label="Benefits"
            rows={4}
            helperText="One per line — shown as a bullet list."
            error={errors.benefits?.message}
            {...register("benefits")}
          />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Skills & education</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SkillChipInput
            label="Required skills"
            skills={requiredSkills}
            onAdd={(s) => addSkill("requiredSkills", s)}
            onRemove={(i) => removeSkill("requiredSkills", i)}
          />
          <SkillChipInput
            label="Preferred skills"
            skills={preferredSkills}
            onAdd={(s) => addSkill("preferredSkills", s)}
            onRemove={(i) => removeSkill("preferredSkills", i)}
          />
          <DarkTextField
            label="Education"
            placeholder="e.g. Bachelor's in Computer Science"
            error={errors.education?.message}
            {...register("education")}
          />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Publishing</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DarkTextField label="Application deadline" type="date" error={errors.deadline?.message} {...register("deadline")} />
          <JobSelectFieldDark
            label="Status"
            required
            options={JOB_STATUS_OPTIONS}
            defaultValue={initialJob?.status ?? "draft"}
            error={errors.status?.message}
            {...register("status")}
          />
        </div>
      </section>

      {submitError && <p className="mt-6 text-sm text-dark-error">{submitError}</p>}

      <div className="mt-8 flex items-center gap-4">
        <Link href={cancelHref} className="text-sm font-medium text-dark-text-muted hover:text-dark-text">
          Cancel
        </Link>
        <DarkButton type="submit" isLoading={isSubmitting} className="ml-auto">
          {mode === "create" ? "Create job" : "Save changes"}
        </DarkButton>
      </div>
    </form>
  );
}
