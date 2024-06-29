import axios, { AxiosInstance } from "axios";
import { Todo } from "../types/todo";
import {Projects} from "@/@core/types/projects";

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

export const deleteTodo = async (id: number | undefined) => {
  await axiosInstance.delete(`todos/${id}`);
};

export const fetchProjects = async (page = 1) => {
  return (await axiosInstance.get<Projects[]>(`projects?_page=${page}&_limit=3`)).data;
}