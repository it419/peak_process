import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicJobById } from "@/lib/server/jobRepository";
import { JobApplicationFormSwitcher } from "@/components/design/JobApplicationFormSwitcher";

export async function generateMetadata(props: PageProps<"/jobs/[id]/apply">): Promise<Metadata> {
  const { id } = await props.params;
  const job = await getPublicJobById(id);
  return { title: job ? `Apply — ${job.title} | Peak Process Partners` : "Apply" };
}

export default async function JobApplyPage(props: PageProps<"/jobs/[id]/apply">) {
  const { id } = await props.params;
  const job = await getPublicJobById(id);
  if (!job) notFound();

  return <JobApplicationFormSwitcher job={job} />;
}
