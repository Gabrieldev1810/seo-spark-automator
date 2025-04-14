import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Globe, FileText, Settings, Users, BarChart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/services/projectService";

export function AppSidebar() {
  const pathname = useLocation().pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Get active project
  const { activeProject } = useProjects();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Home className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Menu
              </h2>
              <div className="space-y-1">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/projects"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/projects' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Globe className="h-4 w-4" />
                  <span>Projects</span>
                </Link>
                <Link
                  to="/web-vitals"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/web-vitals' && "bg-accent text-accent-foreground",
                  )}
                >
                  <FileText className="h-4 w-4" />
                  <span>Web Vitals</span>
                </Link>
                <Link
                  to="/agents"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/agents' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Users className="h-4 w-4" />
                  <span>Agents</span>
                </Link>
                <Link
                  to="/settings"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/settings' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/agent-system"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/agent-system' && "bg-accent text-accent-foreground",
                  )}
                >
                  <BarChart className="h-4 w-4" />
                  <span>Agent System</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className={cn(
          "flex flex-col h-full border-r bg-secondary",
          isCollapsed ? "w-16" : "w-64",
          "transition-all duration-300 ease-in-out"
        )}>
          <div className="flex items-center justify-center h-16 shrink-0">
            <Button variant="ghost" onClick={toggleSidebar}>
              {isCollapsed ? "Open" : "Collapse"}
            </Button>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {isCollapsed ? 'Menu' : 'Dashboard'}
            </h2>
            <div className="space-y-1">
              <Link
                to="/"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/' && "bg-accent text-accent-foreground",
                )}
              >
                <Home className="h-4 w-4" />
                {!isCollapsed && <span>Home</span>}
              </Link>
              <Link
                to="/projects"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/projects' && "bg-accent text-accent-foreground",
                )}
              >
                <Globe className="h-4 w-4" />
                {!isCollapsed && <span>Projects</span>}
              </Link>
              <Link
                to="/web-vitals"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/web-vitals' && "bg-accent text-accent-foreground",
                )}
              >
                <FileText className="h-4 w-4" />
                {!isCollapsed && <span>Web Vitals</span>}
              </Link>
              <Link
                to="/agents"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/agents' && "bg-accent text-accent-foreground",
                )}
              >
                <Users className="h-4 w-4" />
                {!isCollapsed && <span>Agents</span>}
              </Link>
              <Link
                to="/settings"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/settings' && "bg-accent text-accent-foreground",
                )}
              >
                <Settings className="h-4 w-4" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
              <Link
                to="/agent-system"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/agent-system' && "bg-accent text-accent-foreground",
                )}
              >
                <BarChart className="h-4 w-4" />
                {!isCollapsed && <span>Agent System</span>}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
