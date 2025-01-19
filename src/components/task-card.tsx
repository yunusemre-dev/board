"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Task } from "@/types";
import { Badge } from "./ui/badge";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 hover:cursor-grab active:cursor-grabbing"
    >
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="mb-4 line-clamp-4 overflow-hidden text-sm text-muted-foreground">
          {task.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage
                src={`https://picsum.photos/seed/${task.assignee.id}/24/24`}
              />
              <AvatarFallback className="bg-muted" />
            </Avatar>
            <Badge variant="outline" className="text-xs">
              {task.storyPoints} sp
            </Badge>
          </div>
          {task.endDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="pr-1 font-semibold">Due:</span>
              <CalendarIcon className="mb-0.5 size-3" />
              <span>{format(task.endDate, "MMM d")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
