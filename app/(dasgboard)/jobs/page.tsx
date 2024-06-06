import JobsList from "@/components/pages/JobsList";
import SearchJobForm from "@/components/pages/SearchJobForm";
import { getAllJobs } from "@/lib/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
