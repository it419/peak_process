import type { Metadata } from "next";
import { getPublicJobs } from "@/lib/server/jobRepository";
import { PublicJobsListSwitcher } from "@/components/design/PublicJobsListSwitcher";

export const metadata: Metadata = {
  title: "Careers | Peak Process Partners",
  description: "Open positions at Peak Process Partners.",
};

export default async function PublicJobsPage() {
  const jobs = await getPublicJobs();
  return <PublicJobsListSwitcher jobs={jobs} />;
}
