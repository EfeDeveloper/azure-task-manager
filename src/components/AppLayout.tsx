import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col p-4 min-h-svh">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
