"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateAndEditJobType, FormSchema } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function CreateJobForm() {
  const router = useRouter();
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      jobStatus: "pending",
      jobMode: "full-time",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateAndEditJobType) => createJob(data),
    onSuccess: (data) => {
      if (!data) {
        toast.error("something went wrong");
        return;
      }
      toast.success("Job Created Successfully");
      router.push("/jobs");
    },
  });

  //   console.log(userId);

  function onSubmit(data: CreateAndEditJobType) {
    mutate(data);
  }

  return (
    <div className="max-w-5xl mx-auto mt-16 bg-muted p-7 rounded-[5px]">
      <h2 className="text-4xl font-bold mb-6">Add Job</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-lg font-semibold">
                    Position
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-[5px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-lg font-semibold">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-[5px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-lg font-semibold">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-[5px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="jobStatus"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-lg font-semibold">
                    Job Status
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-[5px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["pending", "rejected", "interview"].map((item) => {
                            return (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobMode"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-lg font-semibold">
                    Job Mode
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-[5px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["full-time", "part-time", "intership"].map(
                            (item) => {
                              return (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-[10px] capitalize self-end"
              disabled={isPending}
            >
              {isPending ? "creating" : "create job"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
