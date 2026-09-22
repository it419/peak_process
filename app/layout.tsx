import type { Metadata } from "next";
import { ibmPlexSans, lora } from "./fonts";
import { OnboardingHydrator } from "@/lib/store/OnboardingHydrator";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Hire Onboarding | Peak Process Partners",
  description:
    "Complete your onboarding with Peak Process Partners — personal information, references, benefits, and required documents in one guided flow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${ibmPlexSans.variable}`}>
      <body className="min-h-screen antialiased">
        <OnboardingHydrator />
        {children}
      </body>
    </html>
  );
}
