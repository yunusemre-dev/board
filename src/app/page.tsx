import { Board } from "@/components/dashboard/board";
import { TaskModal } from "@/components/dashboard/task-modal";
import { SidebarLeft } from "@/components/sidebar-left";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <>
      <SidebarProvider>
        <SidebarLeft />
        <SidebarInset className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 bg-background">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      Project Management & Task Tracking
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <ScrollArea className="mb-2 h-full w-full">
            <ScrollBar
              orientation="horizontal"
              className="!left-4 !right-4 !top-0 [&>div]:bg-stone-800 [&>div]:hover:cursor-grab hover:[&>div]:bg-stone-700 [&>div]:active:cursor-grabbing"
            />
            <Board />
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
      <TaskModal />
    </>
  );
}
