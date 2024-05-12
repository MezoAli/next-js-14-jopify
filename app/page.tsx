import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImage from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 items-center h-screen -mt-20  py-6 grid lg:grid-cols-[1fr,400px]">
        <div>
          <h2 className="text-4xl md:text-7xl capitalize font-bold">
            Job <span className="text-primary">Tracking</span> App
          </h2>
          <p className="leading-loose max-w-md my-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis nisi eius repellat error ullam vitae tempore, magnam
            pariatur molestiae commodi.{" "}
          </p>
          <Button asChild>
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image
          src={LandingImage}
          alt="landing_image"
          className="hidden lg:block"
        />
      </section>
    </main>
  );
}
