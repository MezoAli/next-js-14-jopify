import React from "react";
import JobCard from "./JobCard";

const JobsList = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">
      <JobCard />
      <JobCard />
    </div>
  );
};

export default JobsList;
