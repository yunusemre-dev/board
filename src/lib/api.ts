import { Task } from "@/types";
import { columns, users, getAllTasks } from "./mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => delay(Math.random() * 300 + 100);

export async function fetchTasks() {
  await randomDelay();
  return columns;
}

export async function fetchUsers() {
  await randomDelay();
  return users;
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  await randomDelay();
  const task = getAllTasks().find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found");
  return { ...task, ...updates };
}
