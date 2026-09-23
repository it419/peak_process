import type { ComponentType } from "react";
import type { StepId } from "@/types/onboarding";
import { WelcomeStep } from "@/components/onboarding/steps/WelcomeStep";
import { PersonalInfoStep } from "@/components/onboarding/steps/PersonalInfoStep";
import { ReferencesStep } from "@/components/onboarding/steps/ReferencesStep";
import { EmergencyContactStep } from "@/components/onboarding/steps/EmergencyContactStep";
import { HealthInsuranceStep } from "@/components/onboarding/steps/HealthInsuranceStep";
import { DocumentsStep } from "@/components/onboarding/steps/DocumentsStep";
import { ReviewStep } from "@/components/onboarding/steps/ReviewStep";
import { WelcomeStepDark } from "@/components/design/dark/steps/WelcomeStepDark";
import { PersonalInfoStepDark } from "@/components/design/dark/steps/PersonalInfoStepDark";
import { ReferencesStepDark } from "@/components/design/dark/steps/ReferencesStepDark";
import { EmergencyContactStepDark } from "@/components/design/dark/steps/EmergencyContactStepDark";
import { HealthInsuranceStepDark } from "@/components/design/dark/steps/HealthInsuranceStepDark";
import { DocumentsStepDark } from "@/components/design/dark/steps/DocumentsStepDark";
import { ReviewStepDark } from "@/components/design/dark/steps/ReviewStepDark";
import { WelcomeStepOrganic } from "@/components/design/organic/steps/WelcomeStepOrganic";
import { PersonalInfoStepOrganic } from "@/components/design/organic/steps/PersonalInfoStepOrganic";
import { ReferencesStepOrganic } from "@/components/design/organic/steps/ReferencesStepOrganic";
import { EmergencyContactStepOrganic } from "@/components/design/organic/steps/EmergencyContactStepOrganic";
import { HealthInsuranceStepOrganic } from "@/components/design/organic/steps/HealthInsuranceStepOrganic";
import { DocumentsStepOrganic } from "@/components/design/organic/steps/DocumentsStepOrganic";
import { ReviewStepOrganic } from "@/components/design/organic/steps/ReviewStepOrganic";

export interface StepConfig {
  id: StepId;
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  Component: ComponentType;
  DarkComponent: ComponentType;
  OrganicComponent: ComponentType;
}

export const stepRegistry: StepConfig[] = [
  {
    id: "welcome",
    slug: "welcome",
    label: "Welcome",
    shortLabel: "Welcome",
    description: "A quick introduction before we begin.",
    Component: WelcomeStep,
    DarkComponent: WelcomeStepDark,
    OrganicComponent: WelcomeStepOrganic,
  },
  {
    id: "personalInfo",
    slug: "personal-information",
    label: "Personal Information",
    shortLabel: "Personal Info",
    description: "Basic details, contact information, and government IDs.",
    Component: PersonalInfoStep,
    DarkComponent: PersonalInfoStepDark,
    OrganicComponent: PersonalInfoStepOrganic,
  },
  {
    id: "references",
    slug: "references",
    label: "References",
    shortLabel: "References",
    description: "Two professional references we can reach out to.",
    Component: ReferencesStep,
    DarkComponent: ReferencesStepDark,
    OrganicComponent: ReferencesStepOrganic,
  },
  {
    id: "emergencyContact",
    slug: "emergency-contact",
    label: "Emergency Contact",
    shortLabel: "Emergency Contact",
    description: "Who we should contact in case of an emergency.",
    Component: EmergencyContactStep,
    DarkComponent: EmergencyContactStepDark,
    OrganicComponent: EmergencyContactStepOrganic,
  },
  {
    id: "healthInsurance",
    slug: "health-insurance",
    label: "Health Insurance",
    shortLabel: "Health Insurance",
    description: "Coverage type, dependents, and nominee details.",
    Component: HealthInsuranceStep,
    DarkComponent: HealthInsuranceStepDark,
    OrganicComponent: HealthInsuranceStepOrganic,
  },
  {
    id: "documents",
    slug: "documents",
    label: "Documents",
    shortLabel: "Documents",
    description: "Upload the documents required to complete your file.",
    Component: DocumentsStep,
    DarkComponent: DocumentsStepDark,
    OrganicComponent: DocumentsStepOrganic,
  },
  {
    id: "review",
    slug: "review",
    label: "Review & Submit",
    shortLabel: "Review",
    description: "Confirm everything looks right before you submit.",
    Component: ReviewStep,
    DarkComponent: ReviewStepDark,
    OrganicComponent: ReviewStepOrganic,
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
