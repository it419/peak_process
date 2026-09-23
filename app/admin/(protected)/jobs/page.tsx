import type { Metadata } from "next";
import { getAdminJobs } from "@/lib/server/jobRepository";
import { AdminJobsListSwitcher } from "@/components/design/AdminJobsListSwitcher";

export const metadata: Metadata = { title: "Job Openings | Peak Process Partners" };

export default async function AdminJobsPage() {
  const jobs = await getAdminJobs();
  return <AdminJobsListSwitcher jobs={jobs} />;
}
