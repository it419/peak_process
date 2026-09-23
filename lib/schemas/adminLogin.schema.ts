import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const adminLoginDefaults: AdminLoginData = { email: "", password: "" };
