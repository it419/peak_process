import type { Metadata } from "next";
import { CompletionScreen } from "@/components/onboarding/CompletionScreen";

export const metadata: Metadata = {
  title: "You’re all set | Peak Process Partners",
};

export default function OnboardingCompletePage() {
  return <CompletionScreen />;
}
