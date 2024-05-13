import { AreaChart, AppWindow, Layers } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add job",
    icon: <Layers />,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: <AppWindow />,
  },
  {
    label: "Stats",
    href: "/stats",
    icon: <AreaChart />,
  },
];

export default links;
