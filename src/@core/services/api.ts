import axios, { AxiosInstance } from "axios";
import { Todo } from "../types/todo";

const BASE_URL: string = "http://localhost:8080";
const axiosInstance: AxiosInstance = axios.create({ baseURL: BASE_URL });

export const fetchTodos = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map(
    (todos) => todos.id
  );
};
