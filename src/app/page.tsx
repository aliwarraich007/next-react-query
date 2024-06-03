'use client';
import Todos from "@/components/Todos/Todo";
import { useTodoIds } from "@/@core/services/queries";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000
    }
  }
});


export default function Home() {


  return (
    <QueryClientProvider client={queryClient}>
        <Todos/>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}
