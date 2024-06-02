import ToggleTheme from "./ToggleTheme";
import { UserButton } from "@clerk/nextjs";
import DropdownLinks from "./DropdownLinks";

const Navbar = () => {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div>
        <DropdownLinks />
      </div>
      <div className="flex justify-center items-center gap-4">
        <ToggleTheme />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
