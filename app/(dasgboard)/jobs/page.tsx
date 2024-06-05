import JobsList from "@/components/pages/JobsList";
import SearchJobForm from "@/components/pages/SearchJobForm";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const JobsPage = async () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchJobForm />
      <JobsList />
    </HydrationBoundary>
  );
};

export default JobsPage;
