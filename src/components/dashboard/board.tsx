"use client";

import { Task, TaskStatus } from "@/types";
import { useTaskStore } from "@/lib/store";
import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Skeleton } from "@/components/ui/skeleton";
import { Column } from "@/components/dashboard/column";
import { TaskCard } from "../task-card";

export function Board() {
  const { columns, isLoading, fetchAllData, moveTask, reorderTasks } =
    useTaskStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being dragged
    let activeTask: Task | undefined;
    let activeStatus: Task["status"] | undefined;

    // Find the task and its status
    for (const column of columns) {
      const found = column.tasks.find((t) => t.id === activeId);
      if (found) {
        activeTask = found;
        activeStatus = column.id;
        break;
      }
    }

    if (!activeTask || !activeStatus) return;

    // If hovering over a column
    const targetColumn = columns.find((col) => col.id === overId);
    if (targetColumn) {
      if (activeStatus !== targetColumn.id) {
        moveTask(activeId, targetColumn.id);
      }
    }
    // If hovering over another task
    else {
      let overTask: Task | undefined;
      let overStatus: Task["status"] | undefined;

      for (const column of columns) {
        const found = column.tasks.find((t) => t.id === overId);
        if (found) {
          overTask = found;
          overStatus = column.id;
          break;
        }
      }

      if (!overTask || !overStatus) return;

      if (activeStatus !== overStatus) {
        moveTask(activeId, overStatus);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which column the task ended up in
    let finalStatus: Task["status"] | undefined;

    const targetColumn = columns.find((col) => col.id === overId);
    if (targetColumn) {
      finalStatus = targetColumn.id;
    } else {
      for (const column of columns) {
        if (column.tasks.find((t) => t.id === overId)) {
          finalStatus = column.id;
          break;
        }
      }
    }

    if (!finalStatus) return;

    // Calculate the new order of tasks in the column
    const columnTasks =
      columns.find((col) => col.id === finalStatus)?.tasks || [];
    const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
    const newIndex = columnTasks.findIndex((t) => t.id === overId);

    if (oldIndex === -1) return;

    const newOrder = [...columnTasks.map((t) => t.id)];
    if (oldIndex !== newIndex) {
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, activeId);
      reorderTasks(finalStatus, newOrder);
    }

    setActiveId(null);
  };

  const activeTask = useMemo(
    () =>
      Object.values(columns)
        .flatMap((col) => col.tasks)
        .find((task) => task.id === activeId),
    [activeId, columns],
  );

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  if (isLoading) {
    return (
      <div className="flex h-screen gap-4 overflow-x-auto p-4 opacity-70 [mask:linear-gradient(0deg,_transparent_0,_#000)_repeat-y]">
        <Skeleton className="h-full w-80" />
        <Skeleton className="h-full w-80" />
        <Skeleton className="h-full w-80" />
        <Skeleton className="h-full w-80" />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
      <DragOverlay adjustScale={false}>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
