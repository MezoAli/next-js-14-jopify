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

const SearchJobForm = () => {
  return (
    <div className="max-w-5xl mx-auto bg-muted p-8 rounded-[8px] grid lg:grid-cols-3 gap-4">
      <Input
        type="text"
        placeholder="Search Job"
        className="w-full rounded-[5px]"
      />
      <Select defaultValue="pending">
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
      <Button className="rounded-[5px]">Search</Button>
    </div>
  );
};

export default SearchJobForm;
