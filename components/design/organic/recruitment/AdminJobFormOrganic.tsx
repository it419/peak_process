"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useJobFormLogic } from "@/hooks/recruitment/useJobFormLogic";
import { EMPLOYMENT_TYPE_OPTIONS, JOB_STATUS_OPTIONS, WORK_MODE_OPTIONS } from "@/lib/recruitment/constants";
import { OrganicTextField } from "@/components/design/organic/ui/OrganicTextField";
import { OrganicTextareaField } from "@/components/design/organic/ui/OrganicTextareaField";
import { OrganicCheckbox } from "@/components/design/organic/ui/OrganicCheckbox";
import { OrganicButton } from "@/components/design/organic/ui/OrganicButton";
import { JobSelectFieldOrganic } from "@/components/design/organic/recruitment/ui/JobSelectFieldOrganic";
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
      <label className="text-[0.8125rem] font-medium text-organic-ink-muted">{label}</label>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-full border border-organic-border bg-white/70 px-3 py-1 text-sm text-organic-ink"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${skill}`}
                className="text-organic-ink-faint hover:text-organic-error"
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
        className="h-12 rounded-xl border border-organic-border bg-white/70 px-4 text-[0.9375rem] text-organic-ink placeholder:text-organic-ink-faint outline-none focus:border-organic-terracotta"
      />
    </div>
  );
}

interface AdminJobFormOrganicProps {
  mode: "create" | "edit";
  jobId?: string;
  initialJob?: JobDetail;
}

export function AdminJobFormOrganic({ mode, jobId, initialJob }: AdminJobFormOrganicProps) {
  const { register, errors, isSubmitting, submitError, onContinue, requiredSkills, preferredSkills, addSkill, removeSkill } =
    useJobFormLogic({ mode, jobId, initialJob });

  const cancelHref = mode === "edit" && jobId ? `/admin/jobs/${jobId}` : "/admin/jobs";

  return (
    <form onSubmit={onContinue} className="max-w-3xl">
      <h1 className="font-organic-display text-2xl font-semibold text-organic-ink">
        {mode === "create" ? "Create Job" : "Edit Job"}
      </h1>

      <section className="mt-8 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Basic information</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <OrganicTextField label="Job title" required error={errors.title?.message} {...register("title")} />
          </div>
          <OrganicTextField label="Department" error={errors.department?.message} {...register("department")} />
          <OrganicTextField label="Location" error={errors.location?.message} {...register("location")} />
          <JobSelectFieldOrganic
            label="Employment type"
            required
            options={EMPLOYMENT_TYPE_OPTIONS}
            defaultValue={initialJob?.employmentType ?? "full_time"}
            error={errors.employmentType?.message}
            {...register("employmentType")}
          />
          <JobSelectFieldOrganic
            label="Work mode"
            required
            options={WORK_MODE_OPTIONS}
            defaultValue={initialJob?.workMode ?? "onsite"}
            error={errors.workMode?.message}
            {...register("workMode")}
          />
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Experience & compensation</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <OrganicTextField
            label="Minimum experience (years)"
            type="number"
            min={0}
            error={errors.experienceMinYears?.message}
            {...register("experienceMinYears")}
          />
          <OrganicTextField
            label="Maximum experience (years)"
            type="number"
            min={0}
            error={errors.experienceMaxYears?.message}
            {...register("experienceMaxYears")}
          />
          <OrganicTextField
            label="Minimum salary"
            type="number"
            min={0}
            error={errors.salaryMin?.message}
            {...register("salaryMin")}
          />
          <OrganicTextField
            label="Maximum salary"
            type="number"
            min={0}
            error={errors.salaryMax?.message}
            {...register("salaryMax")}
          />
          <div className="sm:col-span-2">
            <OrganicCheckbox label="Show salary range on the public job posting" {...register("salaryPublic")} />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Description</h2>
        <div className="mt-4 grid grid-cols-1 gap-5">
          <OrganicTextareaField
            label="Overview"
            rows={4}
            helperText="A short summary shown near the top of the job page."
            error={errors.overview?.message}
            {...register("overview")}
          />
          <OrganicTextareaField
            label="Responsibilities"
            rows={5}
            helperText="One per line — shown as a bullet list."
            error={errors.responsibilities?.message}
            {...register("responsibilities")}
          />
          <OrganicTextareaField
            label="Requirements"
            rows={5}
            helperText="One per line — shown as a bullet list."
            error={errors.requirements?.message}
            {...register("requirements")}
          />
          <OrganicTextareaField
            label="Benefits"
            rows={4}
            helperText="One per line — shown as a bullet list."
            error={errors.benefits?.message}
            {...register("benefits")}
          />
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Skills & education</h2>
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
          <OrganicTextField
            label="Education"
            placeholder="e.g. Bachelor's in Computer Science"
            error={errors.education?.message}
            {...register("education")}
          />
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Publishing</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <OrganicTextField label="Application deadline" type="date" error={errors.deadline?.message} {...register("deadline")} />
          <JobSelectFieldOrganic
            label="Status"
            required
            options={JOB_STATUS_OPTIONS}
            defaultValue={initialJob?.status ?? "draft"}
            error={errors.status?.message}
            {...register("status")}
          />
        </div>
      </section>

      {submitError && <p className="mt-6 text-sm text-organic-error">{submitError}</p>}

      <div className="mt-8 flex items-center gap-4">
        <Link href={cancelHref} className="text-sm font-medium text-organic-ink-muted hover:text-organic-ink">
          Cancel
        </Link>
        <OrganicButton type="submit" isLoading={isSubmitting} className="ml-auto">
          {mode === "create" ? "Create job" : "Save changes"}
        </OrganicButton>
      </div>
    </form>
  );
}
