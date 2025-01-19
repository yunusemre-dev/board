import {
  CalendarArrowDownIcon,
  CalendarPlus2Icon,
  PenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { useTaskStore } from "@/lib/store";
import { addDays } from "date-fns";
import { Task } from "@/types";
import { TaskCard } from "../task-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const {
    updateTaskStatus,
    updateTaskStartDate,
    updateTaskDueDate,
    deleteTask,
    moveTask,
  } = useTaskStore();

  return (
    <ContextMenu>
      <ContextMenuTrigger key={task.id} className="group relative">
        <TaskCard task={task} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100"
          asChild
        >
          <Link href={`?task=${task.id}`}>
            <PenIcon className="h-4 w-4" />
          </Link>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuRadioGroup
          value={task.status}
          onValueChange={(value) => {
            const newStatus = value as Task["status"];
            updateTaskStatus(task.id, newStatus);
            moveTask(task.id, newStatus);
          }}
        >
          <ContextMenuRadioItem value="open">Open</ContextMenuRadioItem>
          <ContextMenuRadioItem value="in-progress">
            In Progress
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="in-review">
            In Review
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="done">Done</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Set Start Date</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={() => {
                updateTaskStartDate(task.id, new Date());
              }}
            >
              <CalendarArrowDownIcon className="mr-2 h-4 w-4" />
              Today
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                updateTaskStartDate(task.id, addDays(new Date(), 1));
              }}
            >
              <CalendarPlus2Icon className="mr-2 h-4 w-4" />
              Tomorrow
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset asChild>
              <Link href={`?task=${task.id}`}>Pick a Date</Link>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Set Due Date</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={() => {
                updateTaskDueDate(task.id, new Date());
              }}
            >
              <CalendarArrowDownIcon className="mr-2 h-4 w-4" />
              Today
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                updateTaskDueDate(task.id, addDays(new Date(), 1));
              }}
            >
              <CalendarPlus2Icon className="mr-2 h-4 w-4" />
              Tomorrow
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset asChild>
              <Link href={`?task=${task.id}`}>Pick a Date</Link>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem inset asChild>
          <Link href={`?task=${task.id}`}>Edit</Link>
        </ContextMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ContextMenuItem inset onSelect={(e) => e.preventDefault()}>
              Delete
            </ContextMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteTask(task.id);
                }}
                asChild
              >
                <AlertDialogAction>Delete</AlertDialogAction>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ContextMenuContent>
    </ContextMenu>
  );
}
