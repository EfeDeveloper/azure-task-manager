import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  // React Router stores a history index in window.history.state.idx (>= 0).
  // If idx > 0 we can go back; re-evaluate on route change using useLocation.
  const canGoBack = typeof window !== "undefined" && (window.history.state?.idx ?? 0) > 0;
  void location; // reference to avoid unused var warning; also forces re-evaluation on route change
  return (
    <header className="flex items-center gap-2 border-b h-14 transition-[width,height] ease-linear shrink-0">
      <div className="flex items-center gap-1 lg:gap-2 px-4 lg:px-6 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-medium text-base">Azure Task Manager</h1>
        <div className="flex items-center gap-2 ml-auto">
          {canGoBack && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
              onClick={() => navigate(-1)}
              title="Go back"
            >
              <ArrowLeft className="mr-2 size-4" />
              Go back
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
