"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { SaveIndicator } from "@/components/onboarding/SaveIndicator";

export function RightRail({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hidden flex-col gap-4 px-6 py-10",
        "tablet:flex tablet:w-full tablet:border-t tablet:border-paper-200 tablet:px-10",
        "xl:w-rail-right xl:shrink-0 xl:border-l xl:border-t-0 xl:sticky xl:top-0 xl:h-screen xl:px-8 xl:py-14",
        className,
      )}
    >
      <SaveIndicator />
      <Link href="/dashboard" className="text-[0.8125rem] text-ember-700 hover:underline">
        View full overview {"→"}
      </Link>
    </aside>
  );
}
