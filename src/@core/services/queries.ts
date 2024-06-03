import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api";

export function useTodoIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
    enabled: true,
  });
}
