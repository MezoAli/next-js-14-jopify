import Image from "next/image";
import Logo from "../../assets/logo.svg";
import ToggleTheme from "./ToggleTheme";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    // <div className="bg-slate-700 w-full lg:grid-cols-4">
    //   <div className="max-w-7xl mx-auto flex justify-between py-8 mb-4">
    //     <Image src={Logo} alt="logo" />
    //     <div className="flex justify-center items-center gap-4">
    //       <ToggleTheme />
    //       <UserButton />
    //     </div>
    //   </div>
    // </div>
    <h1>navbar</h1>
  );
};

export default Navbar;
