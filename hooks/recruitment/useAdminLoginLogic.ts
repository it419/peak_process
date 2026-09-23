"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginDefaults, adminLoginSchema, type AdminLoginData } from "@/lib/schemas/adminLogin.schema";

export function useAdminLoginLogic() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginData>({ resolver: zodResolver(adminLoginSchema), defaultValues: adminLoginDefaults });

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setFormError(body?.error ?? "Invalid email or password.");
      return;
    }

    router.push("/admin/jobs");
    router.refresh();
  });

  return { register, errors, isSubmitting, formError, onContinue: onSubmit };
}
