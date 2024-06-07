"use client";
import { getJobStats } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { StatsLoadingCard } from "./StatsLoadingCard";

const StatsValues = () => {
  const { data, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getJobStats(),
  });

  if (isPending) {
    return (
      <div className="my-10 grid lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((item: any) => {
          return <StatsLoadingCard key={item} />;
        })}
      </div>
    );
  }

  return (
    <div className="my-10 grid lg:grid-cols-3 gap-4">
      <div className="p-5 bg-muted flex justify-between items-center rounded-[5px]">
        <h2 className="text-3xl font-semibold capitalize">pending jobs</h2>
        <p className="text-primary text-4xl font-bold">{data?.pending}</p>
      </div>
      <div className="p-5 bg-muted flex justify-between items-center rounded-[5px]">
        <h2 className="text-3xl font-semibold capitalize">interview sets</h2>
        <p className="text-primary text-4xl font-bold">{data?.interview}</p>
      </div>
      <div className="p-5 bg-muted flex justify-between items-center rounded-[5px]">
        <h2 className="text-3xl font-semibold capitalize">jobs declined </h2>
        <p className="text-primary text-4xl font-bold">{data?.rejected}</p>
      </div>
    </div>
  );
};

export default StatsValues;
