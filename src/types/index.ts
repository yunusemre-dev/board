export type TaskStatus = "open" | "in-progress" | "in-review" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User;
  storyPoints: number;
  startDate?: Date;
  endDate?: Date;
  status: TaskStatus;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Column {
  id: Task["status"];
  title: string;
  tasks: Task[];
}
