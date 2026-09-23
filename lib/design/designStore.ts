import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DesignMode = "current" | "dark" | "organic";

export const DESIGN_MODE_OPTIONS: { value: DesignMode; label: string }[] = [
  { value: "current", label: "Current — Peak HR" },
  { value: "dark", label: "Dark — Premium" },
  { value: "organic", label: "Organic — Curved" },
];

interface DesignState {
  mode: DesignMode;
  setMode: (mode: DesignMode) => void;
}

/**
 * Purely a client-side presentation preference — never touches onboarding
 * data, the API, or the database. Persisted to localStorage only so a
 * reload keeps the chosen preview; switching designs never affects
 * useOnboardingStore in any way, which is what keeps form data intact
 * across a design change.
 */
export const useDesignStore = create<DesignState>()(
  persist(
    (set) => ({
      mode: "current",
      setMode: (mode) => set({ mode }),
    }),
    { name: "ppp-design-mode" },
  ),
);
