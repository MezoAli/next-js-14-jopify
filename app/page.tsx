import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto my-10">
      <h1>Hello world</h1>
      <Button variant="outline">Click me</Button>
    </div>
  );
}
