import axios, { AxiosInstance } from "axios";
import { Todo } from "../types/todo";

const BASE_URL: string = "http://localhost:8080";
const axiosInstance: AxiosInstance = axios.create({ baseURL: BASE_URL });

export const fetchTodos = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map(
    (todos) => todos.id
  );
};

export const fetchAllTodods = async (id: number | undefined) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  return await axiosInstance.post("todos", data);
};

export const updateTodo = async (data: Todo) => {
  return await axiosInstance.put(`todos/${data.id}`, data);
};
