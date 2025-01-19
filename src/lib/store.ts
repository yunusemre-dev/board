import { create } from "zustand";
import { Column, Task, User } from "@/types";
import { fetchTasks, fetchUsers } from "./api";
import { toast } from "sonner";
import { format } from "date-fns";

interface TaskStore {
  columns: Column[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchAllData: () => Promise<void>;
  moveTask: (taskId: string, newStatus: Task["status"]) => void;
  reorderTasks: (status: Task["status"], newOrder: string[]) => void;
  updateTask: (taskId: string, task: Task) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  updateTaskStartDate: (taskId: string, startDate: Task["startDate"]) => void;
  updateTaskDueDate: (taskId: string, dueDate: Task["endDate"]) => void;
  deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  columns: [],
  users: [],
  isLoading: true,
  error: null,

  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [columnsData, usersData] = await Promise.all([
        fetchTasks(),
        fetchUsers(),
      ]);
      set({ columns: columnsData, users: usersData });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  moveTask: (taskId: string, newStatus: Task["status"]) => {
    const { columns } = get();

    // Find the task in any column
    let task: Task | undefined;
    let sourceColumn: Column | undefined;
    let targetColumn: Column | undefined;

    sourceColumn = columns.find((col) =>
      col.tasks.some((t) => t.id === taskId),
    );
    targetColumn = columns.find((col) => col.id === newStatus);

    if (!sourceColumn || !targetColumn) return;

    task = sourceColumn.tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Create new task with updated status
    const updatedTask = { ...task, status: newStatus };

    set((state) => ({
      columns: state.columns.map((col) => {
        if (col.id === sourceColumn!.id) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        }
        if (col.id === targetColumn!.id) {
          return { ...col, tasks: [...col.tasks, updatedTask] };
        }
        return col;
      }),
    }));
  },

  reorderTasks: (status: Task["status"], newOrder: string[]) => {
    set((state) => ({
      columns: state.columns.map((col) => {
        if (col.id === status) {
          return {
            ...col,
            tasks: newOrder.map(
              (taskId) => col.tasks.find((t) => t.id === taskId)!,
            ),
          };
        }
        return col;
      }),
    }));
  },

  updateTask: async (taskId: string, task: Task) => {
    const { columns } = get();
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) => (t.id === taskId ? task : t)),
      })),
    }));
    toast.success("Task updated", {
      action: {
        label: "Undo",
        onClick: () => {
          set({ columns });
        },
      },
    });
  },

  updateTaskStatus: (taskId: string, status: Task["status"]) => {
    const { columns } = get();
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
      })),
    }));
    toast.success("Status updated", {
      action: {
        label: "Undo",
        onClick: () => {
          set({ columns });
        },
      },
    });
  },

  updateTaskStartDate: (taskId: string, startDate: Task["startDate"]) => {
    const { columns } = get();
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === taskId ? { ...t, startDate } : t,
        ),
      })),
    }));
    toast.success(`Start date updated to ${format(startDate!, "MMM d")}`, {
      action: {
        label: "Undo",
        onClick: () => {
          set({ columns });
        },
      },
    });
  },

  updateTaskDueDate: (taskId: string, dueDate: Task["endDate"]) => {
    const { columns } = get();
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === taskId ? { ...t, endDate: dueDate } : t,
        ),
      })),
    }));
    toast.success(`Due date updated to ${format(dueDate!, "MMM d")}`, {
      action: {
        label: "Undo",
        onClick: () => {
          set({ columns });
        },
      },
    });
  },

  deleteTask: (taskId: string) => {
    const { columns } = get();
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      })),
    }));
    toast.success(`Task deleted: #${taskId}`, {
      action: {
        label: "Undo",
        onClick: () => {
          set({ columns });
        },
      },
    });
  },
}));
