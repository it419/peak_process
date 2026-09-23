"use client";

import { Plus, Trash2 } from "lucide-react";
import { useHealthInsuranceStepLogic } from "@/hooks/steps/useHealthInsuranceStepLogic";
import { coverageTypeOptions } from "@/lib/schemas/healthInsurance.schema";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { StepShell } from "@/components/onboarding/StepShell";
import { FormSection } from "@/components/onboarding/FormSection";

export function HealthInsuranceStep() {
  const { register, errors, isSubmitting, onContinue, fields, append, remove, coverageType, path } =
    useHealthInsuranceStepLogic();

  return (
    <StepShell
      stepId="healthInsurance"
      title="Health insurance"
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <FormSection title="Coverage" first>
        <div className="max-w-sm sm:col-span-2">
          <SelectField
            label="Coverage type"
            required
            options={[...coverageTypeOptions]}
            error={errors.coverageType?.message}
            {...register("coverageType")}
          />
        </div>
      </FormSection>

      {coverageType && coverageType !== "self" && (
        <FormSection title="Dependents" description="Add each spouse or child covered under your plan.">
          <div className="flex flex-col gap-5 sm:col-span-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 rounded-md border border-paper-200 p-4 sm:grid-cols-3"
              >
                <TextField
                  label="Name"
                  required
                  error={errors.dependents?.[index]?.name?.message}
                  {...register(path(`dependents.${index}.name`))}
                />
                <TextField
                  label="Relationship"
                  placeholder="e.g. Spouse"
                  required
                  error={errors.dependents?.[index]?.relationship?.message}
                  {...register(path(`dependents.${index}.relationship`))}
                />
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <TextField
                      label="Date of birth"
                      type="date"
                      required
                      error={errors.dependents?.[index]?.dateOfBirth?.message}
                      {...register(path(`dependents.${index}.dateOfBirth`))}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => remove(index)}
                    aria-label="Remove dependent"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="self-start"
              onClick={() => append({ name: "", relationship: "", dateOfBirth: "" })}
            >
              <Plus className="size-4" /> Add dependent
            </Button>
          </div>
        </FormSection>
      )}

      <FormSection title="Nominee" description="Who should receive the benefit in an emergency.">
        <TextField label="Nominee name" required error={errors.nomineeName?.message} {...register("nomineeName")} />
        <TextField
          label="Relationship to nominee"
          required
          error={errors.nomineeRelationship?.message}
          {...register("nomineeRelationship")}
        />
      </FormSection>
    </StepShell>
  );
}
