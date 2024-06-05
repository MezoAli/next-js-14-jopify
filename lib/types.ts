import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  jobStatus: string;
  jobMode: string;
};

export const FormSchema = z.object({
  position: z.string().min(10, {
    message: "Position must be at least 10 characters.",
  }),
  company: z.string().min(3, {
    message: "Company must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  jobStatus: z.enum(["pending", "rejected", "interview"]),
  jobMode: z.enum(["full-time", "part-time", "intership"]),
});

export type CreateAndEditJobType = z.infer<typeof FormSchema>;

export type GetAllJobsType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};
