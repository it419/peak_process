import { OnboardingShellSwitcher } from "@/components/design/OnboardingShellSwitcher";

export default function OnboardingLayout({ children }: LayoutProps<"/onboarding">) {
  return <OnboardingShellSwitcher>{children}</OnboardingShellSwitcher>;
}
