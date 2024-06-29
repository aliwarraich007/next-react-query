import {keepPreviousData, useQueries, useQuery} from "@tanstack/react-query";
import {fetchTodos, fetchAllTodods, fetchProjects} from "./api";

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
        // always pass query params in {}
        queryKey: ["todo", { id }],
        queryFn: () => fetchAllTodods(id!),
      };
    }),
  });
}

export function useProjects(page: number) {
  return useQuery({
    queryKey: ['projects', {page}],
    queryFn: () => fetchProjects(page),
    placeholderData: keepPreviousData
  })
}
