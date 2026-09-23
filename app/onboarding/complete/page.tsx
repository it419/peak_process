import type { Metadata } from "next";
import { CompletionSwitcher } from "@/components/design/CompletionSwitcher";

export const metadata: Metadata = {
  title: "You’re all set | Peak Process Partners",
};

export default function OnboardingCompletePage() {
  return <CompletionSwitcher />;
}
