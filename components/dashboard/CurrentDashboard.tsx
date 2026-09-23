import { PeakWordmark } from "@/components/Logo";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { StepTimeline } from "@/components/onboarding/StepTimeline";

/** Design 1's dashboard, extracted verbatim from app/dashboard/page.tsx so
 *  DashboardSwitcher can pick between it and the Dark/Organic variants —
 *  identical markup, purely a container/route split, no visual change. */
export function CurrentDashboard() {
  return (
    <div className="min-h-screen bg-paper-50">
      <header className="border-b border-paper-200 px-5 py-5 tablet:px-10">
        <PeakWordmark subtitle="Human Resources" tone="light" />
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 tablet:px-10 tablet:py-16">
        <DashboardShell>
          <DashboardHero />

          <div className="mt-14 border-t border-paper-200 pt-10">
            <h2 className="font-display text-2xl font-semibold text-paper-ink-900">All steps</h2>
            <div className="mt-6">
              <StepTimeline variant="expanded" />
            </div>
          </div>
        </DashboardShell>
      </div>
    </div>
  );
}
