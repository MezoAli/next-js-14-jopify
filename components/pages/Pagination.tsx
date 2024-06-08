"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  count: number;
};

const Pagination = ({ count, currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between my-12">
      <h2 className="text-3xl font-semibold capitalize">{count} Jobs found</h2>
      {totalPages < 2 ? null : (
        <div className="flex  gap-x-2">
          {pageButtons.map((page) => {
            return (
              <Button
                key={page}
                size="icon"
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pagination;
