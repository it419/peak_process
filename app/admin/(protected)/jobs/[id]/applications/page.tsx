import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobTitle } from "@/lib/server/jobRepository";
import { getApplicationsForJob } from "@/lib/server/applicationRepository";
import { AdminApplicationsListSwitcher } from "@/components/design/AdminApplicationsListSwitcher";

export async function generateMetadata(props: PageProps<"/admin/jobs/[id]/applications">): Promise<Metadata> {
  const { id } = await props.params;
  const title = await getJobTitle(id);
  return { title: title ? `Applications — ${title} | Peak Process Partners` : "Applications" };
}

export default async function AdminJobApplicationsPage(props: PageProps<"/admin/jobs/[id]/applications">) {
  const { id } = await props.params;
  const jobTitle = await getJobTitle(id);
  if (!jobTitle) notFound();

  const applications = await getApplicationsForJob(id);
  return <AdminApplicationsListSwitcher jobTitle={jobTitle} applications={applications} />;
}
