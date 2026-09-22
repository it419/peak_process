import { OnboardingShell } from "@/components/layout/OnboardingShell";

export default function OnboardingLayout({ children }: LayoutProps<"/onboarding">) {
  return <OnboardingShell>{children}</OnboardingShell>;
}
