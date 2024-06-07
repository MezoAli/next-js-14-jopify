"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./db";
import {
  CreateAndEditJobType,
  GetAllJobsType,
  JobStats,
  JobType,
} from "./types";
import { Prisma } from "@prisma/client";

export const authenticateAndRedirect = async () => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
};

export const createJob = async (
  data: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.create({
      data: {
        clerkId: userId,
        ...data,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllJobs = async ({
  jobStatus,
  page = 1,
  search,
  limit = 10,
}: GetAllJobsType): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> => {
  try {
    const userId = await authenticateAndRedirect();
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        jobStatus: {
          contains: jobStatus,
          mode: "insensitive",
        },
      };
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });
    return { jobs, count: jobs.length, page: 1, totalPages: 0 };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

export const deleteJob = async (jobId: string) => {
  const userId = await authenticateAndRedirect();
  try {
    await prisma.job.delete({
      where: {
        id: jobId,
        clerkId: userId,
      },
    });
    return { message: true };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editJob = async (data: CreateAndEditJobType, jobId: string) => {
  const clerkId = await authenticateAndRedirect();
  try {
    const job = await prisma.job.update({
      where: {
        clerkId,
        id: jobId,
      },
      data: data,
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getJobStats = async () => {
  const userId = await authenticateAndRedirect();
  try {
    const stats = await prisma.job.groupBy({
      where: {
        clerkId: userId,
      },
      by: ["jobStatus"],
      _count: {
        jobStatus: true,
      },
    });

    const statsObject: JobStats = stats.reduce((acc, curr) => {
      acc[curr.jobStatus] = curr._count.jobStatus;
      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      pending: 0,
      rejected: 0,
      interview: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    console.log(error);
    return null;
  }
};
