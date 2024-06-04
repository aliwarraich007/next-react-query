import { useCreateTodo } from "@/@core/services/mutations";
import { useTodoIds, useAllTodos } from "@/@core/services/queries";
import { Todo } from "@/@core/types/todo";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Todos () {
      const getTodos = useTodoIds();
      const allTodos = useAllTodos(getTodos.data)
      const createTodo = useCreateTodo()
        const {register, handleSubmit} = useForm<Todo>()
  if(getTodos.isPending) return <h1>Loading...</h1>
  if(getTodos.error) return <h1>An error occurred</h1>


  const createTodoMutationHandler: SubmitHandler<Todo> = (data: Todo) => {
    createTodo.mutate(data)
  } 

  return (
    <>
    <form onSubmit={handleSubmit(createTodoMutationHandler)}>
      <h3>New Todo</h3>
      <input placeholder="title" {...register('title')} />
      <br/>
      <br/>
      <input placeholder="description" {...register('description')}/>
      <br/>
      <br/>
      <input type="submit" disabled={createTodo.isPending} value={createTodo.isPending ? 'Creating..' : 'Create' }/>
    </form>
    <ul>
      {allTodos.map(res => {
        return (
          <li key={res.data?.id}>
            <span>id: {res.data?.id}</span>
            <strong>
              Title: {res.data?.title}
            </strong>
            <p>
              Description: {res.data?.description}
            </p>
          </li>
        )
      })}
    </ul>
    </>
  )
}