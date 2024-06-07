"use client";
import { getJobsCharts } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
const ChartsValues = () => {
  const { data } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getJobsCharts(),
  });
  console.log(data);

  return <div>ChartsValues</div>;
};

export default ChartsValues;
