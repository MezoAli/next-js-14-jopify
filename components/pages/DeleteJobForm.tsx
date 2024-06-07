"use client";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "@/lib/actions";
import toast from "react-hot-toast";

const DeleteJobForm = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: (data) => {
      if (!data) {
        toast.error("something went wrong");
        return;
      }
      toast.success("Job Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(jobId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button className="rounded-[5px] capitalize" disabled={isPending}>
        {isPending ? "please wait..." : "Delete"}
      </Button>
    </form>
  );
};

export default DeleteJobForm;
