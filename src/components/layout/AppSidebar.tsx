
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Globe, 
  FileText, 
  Settings, 
  Users, 
  BarChart, 
  Mic, 
  Shield, 
  Smartphone, 
  MapPin,
  Bot
} from "lucide-react";
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
                  to="/ai-content"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/ai-content' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Bot className="h-4 w-4" />
                  <span>AI Content</span>
                </Link>
                <Link
                  to="/voice-search"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/voice-search' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Mic className="h-4 w-4" />
                  <span>Voice Search</span>
                </Link>
                <Link
                  to="/e-e-a-t"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/e-e-a-t' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Shield className="h-4 w-4" />
                  <span>E-E-A-T</span>
                </Link>
                <Link
                  to="/mobile"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/mobile' && "bg-accent text-accent-foreground",
                  )}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile</span>
                </Link>
                <Link
                  to="/local-seo"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/local-seo' && "bg-accent text-accent-foreground",
                  )}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Local SEO</span>
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
                  to="/content"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === '/content' && "bg-accent text-accent-foreground",
                  )}
                >
                  <FileText className="h-4 w-4" />
                  <span>Content</span>
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
                to="/ai-content"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/ai-content' && "bg-accent text-accent-foreground",
                )}
              >
                <Bot className="h-4 w-4" />
                {!isCollapsed && <span>AI Content</span>}
              </Link>
              <Link
                to="/voice-search"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/voice-search' && "bg-accent text-accent-foreground",
                )}
              >
                <Mic className="h-4 w-4" />
                {!isCollapsed && <span>Voice Search</span>}
              </Link>
              <Link
                to="/e-e-a-t"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/e-e-a-t' && "bg-accent text-accent-foreground",
                )}
              >
                <Shield className="h-4 w-4" />
                {!isCollapsed && <span>E-E-A-T</span>}
              </Link>
              <Link
                to="/mobile"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/mobile' && "bg-accent text-accent-foreground",
                )}
              >
                <Smartphone className="h-4 w-4" />
                {!isCollapsed && <span>Mobile</span>}
              </Link>
              <Link
                to="/local-seo"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/local-seo' && "bg-accent text-accent-foreground",
                )}
              >
                <MapPin className="h-4 w-4" />
                {!isCollapsed && <span>Local SEO</span>}
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
                to="/content"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === '/content' && "bg-accent text-accent-foreground",
                )}
              >
                <FileText className="h-4 w-4" />
                {!isCollapsed && <span>Content</span>}
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
