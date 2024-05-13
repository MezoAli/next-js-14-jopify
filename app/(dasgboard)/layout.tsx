import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid lg:grid-cols-5">
      <div className="hidden lg:block lg:grid-cols-1 lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:grid-cols-4">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}
export default layout;
