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
const JobCard = ({ job }: { job?: JobType }) => {
  return (
    <Card className="bg-muted rounded-[8px]">
      <CardHeader>
        <CardTitle className="capitalize">backend developer</CardTitle>
        <CardDescription className="capitalize">Assiut</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center my-4">
          <div className="flex justify-center items-center gap-2">
            <Briefcase />
            <p className="capitalize">full-time</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <MapPin />
            <p className="capitalize">full-time</p>
          </div>
        </div>
        <div className="flex justify-between items-center my-4">
          <div className="flex justify-center items-center gap-2">
            <CalendarDays />
            <p className="capitalize">{new Date().toLocaleDateString()}</p>
          </div>
          <Button className="flex justify-center items-center gap-2 rounded-[15px]">
            <RadioTower />
            interview
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-4">
        <Button className="rounded-[5px]">Edit</Button>
        <Button className="rounded-[5px]">Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
