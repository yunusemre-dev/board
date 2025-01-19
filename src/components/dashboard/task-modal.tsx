"use client";

import { useTaskStore } from "@/lib/store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, UserIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const taskSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description must be at most 500 characters"),
  storyPoints: z.number().min(1, "Story points must be at least 1").max(100),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  assigneeId: z.string(),
  id: z.string().optional(),
});

type TaskSchema = z.infer<typeof taskSchema>;

export function TaskModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("task");
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const { users, columns, isLoading, updateTask, deleteTask } = useTaskStore();

  const task = useMemo(
    () => columns.flatMap((col) => col.tasks).find((t) => t.id === taskId),
    [columns, taskId],
  );

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: task ? { ...task, assigneeId: task.assignee.id } : undefined,
  });

  function onSubmit(values: TaskSchema) {
    if (!taskId) return;

    updateTask(taskId, {
      ...task!,
      ...values,
      assignee: users.find((user) => user.id === values.assigneeId)!,
    });

    router.replace("/", { scroll: false });
  }

  useEffect(() => {
    if (task) form.reset(task);
  }, [task, form]);

  const handleCloseAttempt = () => {
    if (form.formState.isDirty) {
      setShowConfirmClose(true);
    } else {
      router.replace("/", { scroll: false });
      form.reset();
    }
  };

  const handleConfirmedClose = () => {
    setShowConfirmClose(false);
    router.replace("/", { scroll: false });
    form.reset();
  };

  if (isLoading) return null;

  return (
    <>
      <Dialog
        open={!!taskId}
        onOpenChange={(open) => {
          if (!open) handleCloseAttempt();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Editing Task:{" "}
              <Badge variant="outline">
                #{form.getValues("id") || task?.id}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                id="edit-task-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="my-3 space-y-3"
              >
                <FormField
                  defaultValue={task?.title}
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    defaultValue={task?.startDate}
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="leading-4">Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className="flex w-full">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) =>
                                date > new Date(form.getValues("endDate")!)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    defaultValue={task?.endDate}
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="leading-4">Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className="flex w-full">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) =>
                                date < new Date(form.getValues("startDate")!)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <FormField
                    defaultValue={task?.assignee.id}
                    control={form.control}
                    name="assigneeId"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="leading-4">Assignee</FormLabel>
                        <Popover
                          open={assigneeOpen}
                          onOpenChange={setAssigneeOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "flex w-full justify-between pl-3",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {field.value ? (
                                    <Avatar className="size-5">
                                      <AvatarImage
                                        src={`https://picsum.photos/seed/${field.value}/20/20`}
                                      />
                                      <AvatarFallback className="bg-muted">
                                        <Skeleton className="size-5" />
                                      </AvatarFallback>
                                    </Avatar>
                                  ) : (
                                    <UserIcon className="size-5" />
                                  )}
                                  {field.value
                                    ? users.find(
                                        (user) => user.id === field.value,
                                      )?.name
                                    : "Select assignee"}
                                </div>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search users..." />
                              <CommandList>
                                <CommandEmpty>No users found.</CommandEmpty>
                                <CommandGroup>
                                  {users.map((user) => (
                                    <CommandItem
                                      value={user.id}
                                      key={user.id}
                                      onSelect={() => {
                                        form.setValue("assigneeId", user.id, {
                                          shouldDirty: true,
                                        });
                                        setAssigneeOpen(false);
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <Avatar className="size-5">
                                        <AvatarImage
                                          src={`https://picsum.photos/seed/${user.id}/20/20`}
                                        />
                                        <AvatarFallback>
                                          {user.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      {user.name}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          user.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    defaultValue={task?.storyPoints}
                    control={form.control}
                    name="storyPoints"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Story Points</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={100}
                            {...field}
                            onChange={(event) => {
                              const value = +event.target.value;
                              if (value >= 1 && value <= 100) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  defaultValue={task?.description}
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={8} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogDescription>
          <DialogFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="mr-auto">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteTask(taskId!);
                      router.back();
                    }}
                    asChild
                  >
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseAttempt}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="edit-task-form"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. If you close without saving, your
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedClose}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
