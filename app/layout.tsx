import type { Metadata } from "next";
import { fraunces, ibmPlexSans, lora, spaceGrotesk, workSans } from "./fonts";
import { OnboardingHydrator } from "@/lib/store/OnboardingHydrator";
import { DesignSwitcher } from "@/components/design/DesignSwitcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Hire Onboarding | Peak Process Partners",
  description:
    "Complete your onboarding with Peak Process Partners — personal information, references, benefits, and required documents in one guided flow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${workSans.variable}`}
    >
      <body className="min-h-screen antialiased">
        <OnboardingHydrator />
        <DesignSwitcher />
        {children}
      </body>
    </html>
  );
}
