"use client";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { getAllJobs } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search ?? "", jobStatus, pageNumber],
    queryFn: () =>
      getAllJobs({
        search: search,
        jobStatus: jobStatus,
        page: pageNumber,
      }),
  });

  if (isPending) {
    return (
      <p className="text-center font-semibold text-3xl capitalize mt-6">
        please wait...
      </p>
    );
  }

  if (data?.jobs.length === 0) {
    return (
      <p className="text-center font-bold text-3xl capitalize mt-6">
        no jobs found
      </p>
    );
  }
  return (
    <>
      <Pagination
        currentPage={data?.page || 0}
        totalPages={data?.totalPages || 0}
        count={data?.count || 0}
      />
      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {data?.jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
};

export default JobsList;
