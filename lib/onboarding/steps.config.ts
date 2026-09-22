import type { ComponentType } from "react";
import type { StepId } from "@/types/onboarding";
import { WelcomeStep } from "@/components/onboarding/steps/WelcomeStep";
import { PersonalInfoStep } from "@/components/onboarding/steps/PersonalInfoStep";
import { ReferencesStep } from "@/components/onboarding/steps/ReferencesStep";
import { EmergencyContactStep } from "@/components/onboarding/steps/EmergencyContactStep";
import { HealthInsuranceStep } from "@/components/onboarding/steps/HealthInsuranceStep";
import { DocumentsStep } from "@/components/onboarding/steps/DocumentsStep";
import { ReviewStep } from "@/components/onboarding/steps/ReviewStep";

export interface StepConfig {
  id: StepId;
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  Component: ComponentType;
}

export const stepRegistry: StepConfig[] = [
  {
    id: "welcome",
    slug: "welcome",
    label: "Welcome",
    shortLabel: "Welcome",
    description: "A quick introduction before we begin.",
    Component: WelcomeStep,
  },
  {
    id: "personalInfo",
    slug: "personal-information",
    label: "Personal Information",
    shortLabel: "Personal Info",
    description: "Basic details, contact information, and government IDs.",
    Component: PersonalInfoStep,
  },
  {
    id: "references",
    slug: "references",
    label: "References",
    shortLabel: "References",
    description: "Two professional references we can reach out to.",
    Component: ReferencesStep,
  },
  {
    id: "emergencyContact",
    slug: "emergency-contact",
    label: "Emergency Contact",
    shortLabel: "Emergency Contact",
    description: "Who we should contact in case of an emergency.",
    Component: EmergencyContactStep,
  },
  {
    id: "healthInsurance",
    slug: "health-insurance",
    label: "Health Insurance",
    shortLabel: "Health Insurance",
    description: "Coverage type, dependents, and nominee details.",
    Component: HealthInsuranceStep,
  },
  {
    id: "documents",
    slug: "documents",
    label: "Documents",
    shortLabel: "Documents",
    description: "Upload the documents required to complete your file.",
    Component: DocumentsStep,
  },
  {
    id: "review",
    slug: "review",
    label: "Review & Submit",
    shortLabel: "Review",
    description: "Confirm everything looks right before you submit.",
    Component: ReviewStep,
  },
];

export function getStepBySlug(slug: string): StepConfig | undefined {
  return stepRegistry.find((step) => step.slug === slug);
}

export function getStepById(id: StepId): StepConfig {
  const step = stepRegistry.find((s) => s.id === id);
  if (!step) throw new Error(`Unknown step id: ${id}`);
  return step;
}

export function getStepIndex(id: StepId): number {
  return stepRegistry.findIndex((step) => step.id === id);
}

export function getAdjacentSlug(id: StepId, direction: 1 | -1): string | null {
  const index = getStepIndex(id);
  const target = stepRegistry[index + direction];
  return target ? target.slug : null;
}
