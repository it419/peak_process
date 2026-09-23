"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useJobFormLogic } from "@/hooks/recruitment/useJobFormLogic";
import { EMPLOYMENT_TYPE_OPTIONS, JOB_STATUS_OPTIONS, WORK_MODE_OPTIONS } from "@/lib/recruitment/constants";
import { TextField } from "@/components/ui/TextField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { JobSelectField } from "@/components/recruitment/ui/JobSelectField";
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
      <label className="text-sm font-medium text-paper-ink-900">{label}</label>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-md border border-paper-200 bg-paper-100 px-2.5 py-1 text-sm text-paper-ink-900"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${skill}`}
                className="text-paper-ink-400 hover:text-error"
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
        className="h-10 rounded-md border border-paper-200 bg-white px-3 text-sm text-paper-ink-900 outline-none focus:border-ember-600"
      />
    </div>
  );
}

interface AdminJobFormCurrentProps {
  mode: "create" | "edit";
  jobId?: string;
  initialJob?: JobDetail;
}

export function AdminJobFormCurrent({ mode, jobId, initialJob }: AdminJobFormCurrentProps) {
  const { register, errors, isSubmitting, submitError, onContinue, requiredSkills, preferredSkills, addSkill, removeSkill } =
    useJobFormLogic({ mode, jobId, initialJob });

  const cancelHref = mode === "edit" && jobId ? `/admin/jobs/${jobId}` : "/admin/jobs";

  return (
    <form onSubmit={onContinue} className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-paper-ink-900">
        {mode === "create" ? "Create Job" : "Edit Job"}
      </h1>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Basic information</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField label="Job title" required error={errors.title?.message} {...register("title")} />
          </div>
          <TextField label="Department" error={errors.department?.message} {...register("department")} />
          <TextField label="Location" error={errors.location?.message} {...register("location")} />
          <JobSelectField
            label="Employment type"
            required
            options={EMPLOYMENT_TYPE_OPTIONS}
            defaultValue={initialJob?.employmentType ?? "full_time"}
            error={errors.employmentType?.message}
            {...register("employmentType")}
          />
          <JobSelectField
            label="Work mode"
            required
            options={WORK_MODE_OPTIONS}
            defaultValue={initialJob?.workMode ?? "onsite"}
            error={errors.workMode?.message}
            {...register("workMode")}
          />
        </div>
      </section>

      <section className="mt-9 border-t border-paper-200 pt-9">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Experience & compensation</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label="Minimum experience (years)"
            type="number"
            min={0}
            error={errors.experienceMinYears?.message}
            {...register("experienceMinYears")}
          />
          <TextField
            label="Maximum experience (years)"
            type="number"
            min={0}
            error={errors.experienceMaxYears?.message}
            {...register("experienceMaxYears")}
          />
          <TextField label="Minimum salary" type="number" min={0} error={errors.salaryMin?.message} {...register("salaryMin")} />
          <TextField label="Maximum salary" type="number" min={0} error={errors.salaryMax?.message} {...register("salaryMax")} />
          <div className="sm:col-span-2">
            <Checkbox label="Show salary range on the public job posting" {...register("salaryPublic")} />
          </div>
        </div>
      </section>

      <section className="mt-9 border-t border-paper-200 pt-9">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Description</h2>
        <div className="mt-4 grid grid-cols-1 gap-5">
          <TextareaField
            label="Overview"
            rows={4}
            helperText="A short summary shown near the top of the job page."
            error={errors.overview?.message}
            {...register("overview")}
          />
          <TextareaField
            label="Responsibilities"
            rows={5}
            helperText="One per line — shown as a bullet list."
            error={errors.responsibilities?.message}
            {...register("responsibilities")}
          />
          <TextareaField
            label="Requirements"
            rows={5}
            helperText="One per line — shown as a bullet list."
            error={errors.requirements?.message}
            {...register("requirements")}
          />
          <TextareaField
            label="Benefits"
            rows={4}
            helperText="One per line — shown as a bullet list."
            error={errors.benefits?.message}
            {...register("benefits")}
          />
        </div>
      </section>

      <section className="mt-9 border-t border-paper-200 pt-9">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Skills & education</h2>
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
          <TextField
            label="Education"
            placeholder="e.g. Bachelor's in Computer Science"
            error={errors.education?.message}
            {...register("education")}
          />
        </div>
      </section>

      <section className="mt-9 border-t border-paper-200 pt-9">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Publishing</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label="Application deadline" type="date" error={errors.deadline?.message} {...register("deadline")} />
          <JobSelectField
            label="Status"
            required
            options={JOB_STATUS_OPTIONS}
            defaultValue={initialJob?.status ?? "draft"}
            error={errors.status?.message}
            {...register("status")}
          />
        </div>
      </section>

      {submitError && <p className="mt-6 text-sm text-error">{submitError}</p>}

      <div className="mt-9 flex items-center gap-4 border-t border-paper-200 pt-8">
        <Link href={cancelHref} className="text-sm font-medium text-paper-ink-600 hover:text-paper-ink-900">
          Cancel
        </Link>
        <Button type="submit" isLoading={isSubmitting} className="ml-auto">
          {mode === "create" ? "Create job" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
