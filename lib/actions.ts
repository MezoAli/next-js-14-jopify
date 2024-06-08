"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
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
    let whereClause: any = {
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

    const skip = (page - 1) * limit;

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const jobsCount = await prisma.job.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(jobsCount / limit);

    return { jobs, count: jobsCount, page, totalPages };
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

    const statsObject: JobStats = stats.reduce(
      (acc: Record<string, number>, curr: any) => {
        acc[curr.jobStatus] = curr._count.jobStatus;
        return acc;
      },
      {}
    );

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

export const getJobsCharts = async () => {
  const userId = await authenticateAndRedirect();
  const sixMonthAgo = dayjs().subtract(5, "month").toDate();

  try {
    const jobs = await prisma.job.groupBy({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
    });

    const formattedResult = jobs.reduce(
      (acc: Record<string, number>, curr: any) => {
        const month = curr.createdAt.toISOString().slice(0, 7);
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += curr._count.createdAt;
        return acc;
      },
      {}
    );

    const resultArray = Object.keys(formattedResult).map((key) => {
      const modKey = dayjs(key).format("MMM YY");
      return { date: modKey, count: formattedResult[key] };
    });

    return resultArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};
