import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminJobById } from "@/lib/server/jobRepository";
import { AdminJobDetailSwitcher } from "@/components/design/AdminJobDetailSwitcher";

export async function generateMetadata(props: PageProps<"/admin/jobs/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const job = await getAdminJobById(id);
  return { title: job ? `${job.title} | Peak Process Partners` : "Job not found" };
}

export default async function AdminJobDetailPage(props: PageProps<"/admin/jobs/[id]">) {
  const { id } = await props.params;
  const job = await getAdminJobById(id);
  if (!job) notFound();

  return <AdminJobDetailSwitcher job={job} />;
}
