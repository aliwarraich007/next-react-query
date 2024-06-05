import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => console.log("mutatation"), // run befores the actual mutation funciton is called
    onError: () => console.log("error occurred"), // runs if an error occurres
    onSuccess: () => console.log("added successfully"), // runs if successfull
    // on setteled runs alawys run even if there is an or not
    // has access to data returned by the mutation function (mutationFN) and error if error fails
    // variables is another attribute that is accessed by this function as third parameter
    // variables are the inputs (form data) that is given to the mutaitonFN
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else {
        // invalidate query refetches the data from the server
        // needs a query Key, which is the key that we had given to the queries while fetching
        // data from the server.
        // no need for refreshing page
        // automatically data is updated for the user
        // should be an async operations
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async (_, error, variables) => {
      if (error) console.log(error);
      else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: number) => deleteTodo(data),
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
