import { MoonIcon } from "lucide-react";
import { Button } from "../ui/button";

const ToggleTheme = () => {
  return (
    <div>
      <Button variant="default" size="icon">
        <MoonIcon />
      </Button>
    </div>
  );
};

export default ToggleTheme;
