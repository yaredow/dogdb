"use client";

type QueyProviderProps = {
  children: React.ReactNode;
};

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 6000,
    },
  },
});

const QueryProviders = ({ children }: PropsWithChildren<QueyProviderProps>) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProviders;
