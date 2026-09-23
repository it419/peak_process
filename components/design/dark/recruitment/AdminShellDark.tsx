"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DarkWordmark } from "@/components/design/dark/DarkWordmark";
import { cn } from "@/lib/utils/cn";

export function AdminShellDark({ adminName, children }: { adminName: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <header className="border-b border-dark-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 tablet:px-10">
          <div className="flex items-center gap-8">
            <DarkWordmark />
            <nav className="hidden gap-6 tablet:flex">
              <Link
                href="/admin/jobs"
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname?.startsWith("/admin/jobs") ? "text-dark-gold" : "text-dark-text-muted hover:text-dark-gold",
                )}
              >
                Jobs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-dark-text-faint sm:inline">Signed in as {adminName}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-medium text-dark-text-muted transition-colors hover:text-dark-gold"
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
