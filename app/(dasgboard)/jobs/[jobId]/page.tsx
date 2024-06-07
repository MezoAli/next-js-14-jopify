import EditJobForm from "@/components/pages/EditJobForm";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import React from "react";

const EditJob = async ({ params }: { params: { jobId: string } }) => {
  const queryClient = new QueryClient();
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const job = await prisma.job.findUnique({
    where: { id: params.jobId, clerkId: userId },
  });
  if (!job) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm job={job} />
    </HydrationBoundary>
  );
};

export default EditJob;
