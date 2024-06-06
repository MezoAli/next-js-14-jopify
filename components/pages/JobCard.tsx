import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { JobType } from "@/lib/types";
import DeleteJobForm from "./DeleteJobForm";
import Link from "next/link";

const JobCard = ({ job }: { job?: JobType }) => {
  return (
    <Card className="bg-muted rounded-[8px]">
      <CardHeader>
        <CardTitle className="capitalize">{job?.position}</CardTitle>
        <CardDescription className="capitalize">{job?.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center my-4">
          <div className="flex justify-center items-center gap-2">
            <Briefcase />
            <p className="capitalize">{job?.jobMode}</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <MapPin />
            <p className="capitalize">{job?.location}</p>
          </div>
        </div>
        <div className="flex justify-between items-center my-4">
          <div className="flex justify-center items-center gap-2">
            <CalendarDays />
            <p className="capitalize">
              {new Date(job?.createdAt as Date).toLocaleDateString()}
            </p>
          </div>
          <Button className="flex justify-center items-center gap-2 rounded-[15px]">
            <RadioTower />
            {job?.jobStatus}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-4">
        <Button className="rounded-[5px]" asChild>
          <Link href={`/jobs/${job?.id}`}>Edit</Link>
        </Button>
        <DeleteJobForm jobId={job?.id as string} />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
