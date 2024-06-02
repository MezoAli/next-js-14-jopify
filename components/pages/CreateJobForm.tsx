"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const FormSchema = z.object({
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

export default function CreateJobForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      jobStatus: "pending",
      jobMode: "full-time",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast.success({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    toast.success(JSON.stringify(data, null, 2));
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
            <Button type="submit" className="rounded-[10px] capitalize mt-auto">
              create job
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
