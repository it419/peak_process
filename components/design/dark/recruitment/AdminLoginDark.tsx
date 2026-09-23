"use client";

import { DarkWordmark } from "@/components/design/dark/DarkWordmark";
import { DarkTextField } from "@/components/design/dark/ui/DarkTextField";
import { DarkButton } from "@/components/design/dark/ui/DarkButton";
import { useAdminLoginLogic } from "@/hooks/recruitment/useAdminLoginLogic";

export function AdminLoginDark() {
  const { register, errors, isSubmitting, formError, onContinue } = useAdminLoginLogic();

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg px-5 py-10 font-sans">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <DarkWordmark />
        </div>
        <div className="rounded-xl border border-dark-border bg-dark-surface p-7">
          <h1 className="font-dark-display text-xl font-semibold text-dark-text">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-dark-text-muted">Sign in to manage job openings and applications.</p>

          <form onSubmit={onContinue} className="mt-6 flex flex-col gap-4">
            <DarkTextField
              label="Email"
              type="email"
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <DarkTextField
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              error={errors.password?.message}
              {...register("password")}
            />
            {formError && <p className="text-sm text-dark-error">{formError}</p>}
            <DarkButton type="submit" isLoading={isSubmitting} className="mt-2 w-full justify-center">
              Sign in
            </DarkButton>
          </form>
        </div>
      </div>
    </div>
  );
}
