
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, HelpCircle, Plus } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b bg-card py-2 px-4 md:px-6 flex items-center justify-between h-16">
      <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-background"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button className="hidden md:flex gap-1">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>
    </header>
  );
}
