import ChartsValues from "@/components/pages/ChartsValues";
import StatsValues from "@/components/pages/StatsValues";
import { getJobStats, getJobsCharts } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getJobStats(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getJobsCharts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsValues />
      <ChartsValues />
    </HydrationBoundary>
  );
};

export default StatsPage;
