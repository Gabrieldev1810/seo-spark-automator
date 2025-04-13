
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60">Pro Plan</p>
            </div>
          </div>
          <Settings className="h-5 w-5 text-sidebar-foreground/60 cursor-pointer hover:text-sidebar-foreground transition-colors" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
