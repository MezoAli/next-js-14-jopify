import JobsList from "@/components/pages/JobsList";
import Pagination from "@/components/pages/Pagination";
import SearchJobForm from "@/components/pages/SearchJobForm";
import { getAllJobs } from "@/lib/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobify | Jobs page",
  description: "Job application tracking system for job hunters",
};

const JobsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs"],
    queryFn: () => getAllJobs({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchJobForm />
      <JobsList />
    </HydrationBoundary>
  );
};

export default JobsPage;
