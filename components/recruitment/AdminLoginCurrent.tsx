"use client";

import { PeakWordmark } from "@/components/Logo";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { useAdminLoginLogic } from "@/hooks/recruitment/useAdminLoginLogic";

export function AdminLoginCurrent() {
  const { register, errors, isSubmitting, formError, onContinue } = useAdminLoginLogic();

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-50 px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <PeakWordmark subtitle="HR Admin" tone="light" />
        </div>
        <div className="rounded-md border border-paper-200 bg-white p-7">
          <h1 className="font-display text-xl font-semibold text-paper-ink-900">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-paper-ink-600">Sign in to manage job openings and applications.</p>

          <form onSubmit={onContinue} className="mt-6 flex flex-col gap-4">
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              error={errors.password?.message}
              {...register("password")}
            />
            {formError && <p className="text-sm text-error">{formError}</p>}
            <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full justify-center">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
