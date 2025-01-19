import { useDroppable } from "@dnd-kit/core";
import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { Column as ColumnType } from "@/types";
import { TaskItem } from "./task-item";

interface ColumnProps {
  column: ColumnType;
}

export function Column({ column }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <SortableContext
      id={column.id}
      items={column.tasks.map((task) => task.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="min-h-screen w-80 rounded-lg bg-muted/50 p-4">
        <div ref={setNodeRef} className="flex flex-col">
          <h3 className="mb-4 font-medium">
            {column.title}{" "}
            <span className="text-muted-foreground">
              ({column.tasks.length})
            </span>
          </h3>
          {column.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
