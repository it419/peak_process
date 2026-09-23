"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { DESIGN_MODE_OPTIONS, useDesignStore, type DesignMode } from "@/lib/design/designStore";

/**
 * Global, always-on-top preview control — rendered once in the root layout
 * so it survives route changes and design switches. Deliberately styled as
 * its own self-contained dark chip (not themed to whichever design is
 * currently active) so it stays legible over the light paper canvas, the
 * near-black Dark design, and the ivory Organic design alike.
 */
export function DesignSwitcher() {
  const mode = useDesignStore((s) => s.mode);
  const setMode = useDesignStore((s) => s.setMode);

  return (
    <div className="fixed top-3 right-3 z-[100] tablet:top-4 tablet:right-4">
      <label className="flex items-center gap-2 rounded-full border border-white/10 bg-[#111114]/95 py-1.5 pr-2 pl-3 shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <Sparkles className="hidden size-3.5 shrink-0 text-white/40 tablet:block" aria-hidden />
        <span className="hidden text-[0.6875rem] font-medium tracking-wide text-white/50 tablet:inline">
          Preview Design
        </span>
        <span className="relative flex items-center">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as DesignMode)}
            aria-label="Preview design"
            className="appearance-none rounded-full bg-white/10 py-1 pr-6 pl-2.5 text-[0.8125rem] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            {DESIGN_MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-black">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1.5 size-3.5 text-white/60" aria-hidden />
        </span>
      </label>
    </div>
  );
}
