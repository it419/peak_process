"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PeakWordmark } from "@/components/Logo";
import { cn } from "@/lib/utils/cn";

export function AdminShellCurrent({ adminName, children }: { adminName: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper-50">
      <header className="bg-ink-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 tablet:px-10">
          <div className="flex items-center gap-8">
            <PeakWordmark subtitle="HR Admin" />
            <nav className="hidden gap-6 tablet:flex">
              <Link
                href="/admin/jobs"
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname?.startsWith("/admin/jobs") ? "text-gold-400" : "text-paper-50 hover:text-gold-400",
                )}
              >
                Jobs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-ink-400 sm:inline">Signed in as {adminName}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-medium text-paper-50 transition-colors hover:text-gold-400"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 tablet:px-10 tablet:py-12">{children}</main>
    </div>
  );
}
