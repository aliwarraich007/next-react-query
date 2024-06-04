import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchTodos, fetchAllTodods } from "./api";

export function useTodoIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
    enabled: true,
  });
}
// to fetch multiple queries that we do not know as number
export function useAllTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", id],
        queryFn: () => fetchAllTodods(id!),
      };
    }),
  });
}
