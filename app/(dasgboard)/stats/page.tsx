import ChartsValues from "@/components/pages/ChartsValues";
import StatsValues from "@/components/pages/StatsValues";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
const StatsPage = async () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsValues />
      <ChartsValues />
    </HydrationBoundary>
  );
};

export default StatsPage;
