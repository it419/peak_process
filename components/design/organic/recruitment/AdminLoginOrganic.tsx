"use client";

import { OrganicWordmark } from "@/components/design/organic/OrganicWordmark";
import { OrganicTextField } from "@/components/design/organic/ui/OrganicTextField";
import { OrganicButton } from "@/components/design/organic/ui/OrganicButton";
import { CurveDivider } from "@/components/design/organic/CurveDivider";
import { useAdminLoginLogic } from "@/hooks/recruitment/useAdminLoginLogic";

export function AdminLoginOrganic() {
  const { register, errors, isSubmitting, formError, onContinue } = useAdminLoginLogic();

  return (
    <div className="min-h-screen bg-organic-bg font-organic-sans">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-5 py-10">
        <div className="mb-8">
          <OrganicWordmark />
        </div>
        <div className="w-full rounded-[1.75rem] bg-organic-surface px-7 py-9">
          <h1 className="font-organic-display text-xl font-semibold text-organic-ink">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-organic-ink-muted">Sign in to manage job openings and applications.</p>
        </div>
        <CurveDivider fill="var(--color-organic-surface)" className="-mt-px h-8 w-full" />

        <form onSubmit={onContinue} className="mt-2 flex w-full flex-col gap-4">
          <OrganicTextField
            label="Email"
            type="email"
            autoComplete="email"
            required
            error={errors.email?.message}
            {...register("email")}
          />
          <OrganicTextField
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            error={errors.password?.message}
            {...register("password")}
          />
          {formError && <p className="text-sm text-organic-error">{formError}</p>}
          <OrganicButton type="submit" isLoading={isSubmitting} className="mt-2 w-full justify-center">
            Sign in
          </OrganicButton>
        </form>
      </div>
    </div>
  );
}
