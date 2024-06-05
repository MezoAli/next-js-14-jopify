"use client";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { getAllJobs } from "@/lib/actions";

const JobsList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getAllJobs({}),
  });

  if (isPending) {
    return (
      <p className="text-center font-semibold text-3xl capitalize">
        please wait...
      </p>
    );
  }

  if (data?.jobs.length === 0) {
    return (
      <p className="text-center font-bold text-3xl capitalize">no jobs found</p>
    );
  }
  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">
      {data?.jobs.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
    </div>
  );
};

export default JobsList;
