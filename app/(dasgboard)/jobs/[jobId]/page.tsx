import EditJobForm from "@/components/pages/EditJobForm";
import prisma from "@/lib/db";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

const EditJob = async ({ params }: { params: { jobId: string } }) => {
  const queryClient = new QueryClient();
  const job = await prisma.job.findUnique({ where: { id: params.jobId } });
  if (!job) {
    notFound();
  }
  console.log(job);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm job={job} />
    </HydrationBoundary>
  );
};

export default EditJob;
