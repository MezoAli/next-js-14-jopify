import CreateJobForm from "@/components/pages/CreateJobForm";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobify | add job",
  description: "Job application tracking system for job hunters",
};

const AddJob = () => {
  const queryClient = new QueryClient();

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateJobForm />
      </HydrationBoundary>
    </div>
  );
};

export default AddJob;
