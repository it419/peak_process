"use client";

import { Plus, Trash2 } from "lucide-react";
import { useHealthInsuranceStepLogic } from "@/hooks/steps/useHealthInsuranceStepLogic";
import { coverageTypeOptions } from "@/lib/schemas/healthInsurance.schema";
import { OrganicTextField } from "../ui/OrganicTextField";
import { OrganicSelectField } from "../ui/OrganicSelectField";
import { OrganicButton } from "../ui/OrganicButton";
import { OrganicStepShell } from "../OrganicStepShell";
import { OrganicFormSection } from "../OrganicFormSection";

export function HealthInsuranceStepOrganic() {
  const { register, errors, isSubmitting, onContinue, fields, append, remove, coverageType, path } =
    useHealthInsuranceStepLogic();

  return (
    <OrganicStepShell stepId="healthInsurance" title="Health Insurance" onContinue={onContinue} isSubmitting={isSubmitting}>
      <OrganicFormSection title="Coverage" first>
        <div className="max-w-sm sm:col-span-2">
          <OrganicSelectField
            label="Coverage type"
            required
            options={[...coverageTypeOptions]}
            error={errors.coverageType?.message}
            {...register("coverageType")}
          />
        </div>
      </OrganicFormSection>

      {coverageType && coverageType !== "self" && (
        <OrganicFormSection title="Dependents" description="Add each spouse or child covered under your plan.">
          <div className="flex flex-col gap-5 sm:col-span-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-organic-border p-4 sm:grid-cols-3"
              >
                <OrganicTextField
                  label="Name"
                  required
                  error={errors.dependents?.[index]?.name?.message}
                  {...register(path(`dependents.${index}.name`))}
                />
                <OrganicTextField
                  label="Relationship"
                  placeholder="e.g. Spouse"
                  required
                  error={errors.dependents?.[index]?.relationship?.message}
                  {...register(path(`dependents.${index}.relationship`))}
                />
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <OrganicTextField
                      label="Date of birth"
                      type="date"
                      required
                      error={errors.dependents?.[index]?.dateOfBirth?.message}
                      {...register(path(`dependents.${index}.dateOfBirth`))}
                    />
                  </div>
                  <OrganicButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => remove(index)}
                    aria-label="Remove dependent"
                  >
                    <Trash2 className="size-4" />
                  </OrganicButton>
                </div>
              </div>
            ))}
            <OrganicButton
              type="button"
              variant="secondary"
              size="sm"
              className="self-start"
              onClick={() => append({ name: "", relationship: "", dateOfBirth: "" })}
            >
              <Plus className="size-4" /> Add dependent
            </OrganicButton>
          </div>
        </OrganicFormSection>
      )}

      <OrganicFormSection title="Nominee" description="Who should receive the benefit in an emergency.">
        <OrganicTextField
          label="Nominee name"
          required
          error={errors.nomineeName?.message}
          {...register("nomineeName")}
        />
        <OrganicTextField
          label="Relationship to nominee"
          required
          error={errors.nomineeRelationship?.message}
          {...register("nomineeRelationship")}
        />
      </OrganicFormSection>
    </OrganicStepShell>
  );
}
