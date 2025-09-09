import { FolderCheck, LayoutDashboard, ListChecks, ListTree } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppRoutes } from "@/constants/routes";

const data = {
  user: {
    name: "User",
    email: "admin@example.com",
    avatar: "/vite.svg",
  },
  navMain: [
    { title: "Dashboard", url: AppRoutes.Dashboard, icon: LayoutDashboard },
    { title: "Work item", url: AppRoutes.WorkItem, icon: ListChecks },
    { title: "Extra work item", url: AppRoutes.ExtraWorkItem, icon: ListTree },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="pb-2" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <div>
                <FolderCheck className="!size-6" />
                <span className="font-semibold text-base">Azure Task</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex items-center pr-2 pb-3 min-h-14">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
