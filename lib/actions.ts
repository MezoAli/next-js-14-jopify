"use server";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import prisma from "./db";
import { CreateAndEditJobType, JobType } from "./types";

// export const authenticateAndRedirect = () => {
//   const { userId }: { userId: string | null } = auth();
//   if (!userId) {
//     redirect("/");
//   }
//   return userId;
// };

export const createJob = async (
  data: CreateAndEditJobType,
  clerkId: string
): Promise<JobType | null> => {
  //   const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.create({
      data: {
        clerkId,
        ...data,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};
