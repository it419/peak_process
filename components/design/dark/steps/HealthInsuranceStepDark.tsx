"use client";

import { Plus, Trash2 } from "lucide-react";
import { useHealthInsuranceStepLogic } from "@/hooks/steps/useHealthInsuranceStepLogic";
import { coverageTypeOptions } from "@/lib/schemas/healthInsurance.schema";
import { DarkTextField } from "../ui/DarkTextField";
import { DarkSelectField } from "../ui/DarkSelectField";
import { DarkButton } from "../ui/DarkButton";
import { DarkStepShell } from "../DarkStepShell";
import { DarkFormSection } from "../DarkFormSection";

export function HealthInsuranceStepDark() {
  const { register, errors, isSubmitting, onContinue, fields, append, remove, coverageType, path } =
    useHealthInsuranceStepLogic();

  return (
    <DarkStepShell stepId="healthInsurance" title="Health Insurance" onContinue={onContinue} isSubmitting={isSubmitting}>
      <DarkFormSection title="Coverage" first>
        <div className="max-w-sm sm:col-span-2">
          <DarkSelectField
            label="Coverage type"
            required
            options={[...coverageTypeOptions]}
            error={errors.coverageType?.message}
            {...register("coverageType")}
          />
        </div>
      </DarkFormSection>

      {coverageType && coverageType !== "self" && (
        <DarkFormSection title="Dependents" description="Add each spouse or child covered under your plan.">
          <div className="flex flex-col gap-5 sm:col-span-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 rounded-md border border-dark-border p-4 sm:grid-cols-3"
              >
                <DarkTextField
                  label="Name"
                  required
                  error={errors.dependents?.[index]?.name?.message}
                  {...register(path(`dependents.${index}.name`))}
                />
                <DarkTextField
                  label="Relationship"
                  placeholder="e.g. Spouse"
                  required
                  error={errors.dependents?.[index]?.relationship?.message}
                  {...register(path(`dependents.${index}.relationship`))}
                />
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <DarkTextField
                      label="Date of birth"
                      type="date"
                      required
                      error={errors.dependents?.[index]?.dateOfBirth?.message}
                      {...register(path(`dependents.${index}.dateOfBirth`))}
                    />
                  </div>
                  <DarkButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => remove(index)}
                    aria-label="Remove dependent"
                  >
                    <Trash2 className="size-4" />
                  </DarkButton>
                </div>
              </div>
            ))}
            <DarkButton
              type="button"
              variant="secondary"
              size="sm"
              className="self-start"
              onClick={() => append({ name: "", relationship: "", dateOfBirth: "" })}
            >
              <Plus className="size-4" /> Add dependent
            </DarkButton>
          </div>
        </DarkFormSection>
      )}

      <DarkFormSection title="Nominee" description="Who should receive the benefit in an emergency.">
        <DarkTextField
          label="Nominee name"
          required
          error={errors.nomineeName?.message}
          {...register("nomineeName")}
        />
        <DarkTextField
          label="Relationship to nominee"
          required
          error={errors.nomineeRelationship?.message}
          {...register("nomineeRelationship")}
        />
      </DarkFormSection>
    </DarkStepShell>
  );
}
