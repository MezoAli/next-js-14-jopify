"use client";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";

const SearchJobForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    params.set("search", search);
    params.set("jobStatus", jobStatus);
    router.push(`${pathname}?search=${search}&jobStatus=${jobStatus}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-muted p-8 rounded-[8px] grid lg:grid-cols-3 gap-4"
    >
      <Input
        type="text"
        placeholder="Search Job"
        className="w-full rounded-[5px]"
        name="search"
      />
      <Select defaultValue="all" name="jobStatus">
        <SelectTrigger className="w-full rounded-[5px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {["all", "pending", "rejected", "interview"].map((item) => {
              return (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="rounded-[5px]" type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchJobForm;
