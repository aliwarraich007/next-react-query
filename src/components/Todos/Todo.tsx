import { useTodoIds } from "@/@core/services/queries";

export default function Todos () {
      const getTodos = useTodoIds();
  if(getTodos.isPending) return <h1>Loading...</h1>
  if(getTodos.error) return <h1>An error occurred</h1>
  return (
  <h1>{getTodos.data.map((item) => (
    <p>{item}</p>
  ))}</h1>
  )
}