"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClinet] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  });
  return (
    <QueryClientProvider client={queryClinet}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
