
import React from "react";
import {
  BarChart3,
  Cpu,
  FileText,
  Globe,
  Home,
  Mic,
  Settings,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserProfileDropdown } from "@/components/auth/UserProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Core Web Vitals",
    icon: BarChart3,
    href: "/web-vitals",
  },
  {
    title: "AI Content",
    icon: Cpu,
    href: "/ai-content",
  },
  {
    title: "Voice Search",
    icon: Mic,
    href: "/voice-search",
  },
  {
    title: "E-E-A-T Compliance",
    icon: ShieldCheck,
    href: "/e-e-a-t",
  },
  {
    title: "Mobile Optimization",
    icon: Smartphone,
    href: "/mobile",
  },
  {
    title: "Local SEO",
    icon: Globe,
    href: "/local-seo",
  },
  {
    title: "Content",
    icon: FileText,
    href: "/content",
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 p-4">
        <SidebarTrigger />
        <div className="flex items-center space-x-2">
          <div className="bg-seo-blue rounded-md p-1">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg text-white">SEO Spark</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    active={location.pathname === item.href}
                  >
                    <Link to={item.href} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4 border-t border-sidebar-border">
          {user ? (
            <UserProfileDropdown />
          ) : (
            <div className="flex items-center justify-between w-full">
              <Link 
                to="/auth/login" 
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Settings className="h-5 w-5 text-sidebar-foreground/60 cursor-pointer hover:text-sidebar-foreground transition-colors" />
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
