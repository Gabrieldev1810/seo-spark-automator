import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Plus,
  Globe,
  FileText,
  Settings,
  X,
  MapPin,
  Star
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { searchPlaces, PlacePrediction } from "@/services/placesService";
import { cn } from "@/lib/utils";
import { useProjects, Project } from "@/services/projectService";

const searchItems = [
  {
    title: "Dashboard",
    icon: Globe,
    href: "/",
  },
  {
    title: "Web Vitals",
    icon: FileText,
    href: "/web-vitals",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function AppHeader() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placePredictions, setPlacePredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { projects, activeProject, addProject, setActiveProject } = useProjects();

  useEffect(() => {
    const searchPlacesDebounced = async () => {
      if (searchQuery.length < 3) {
        setPlacePredictions([]);
        return;
      }

      setIsLoading(true);
      try {
        const predictions = await searchPlaces(searchQuery);
        setPlacePredictions(predictions);
      } catch (error) {
        console.error('Error searching places:', error);
        toast({
          title: "Error",
          description: "Failed to search places. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchPlacesDebounced, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, toast]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      setIsCommandOpen(true);
    }
  };

  const handleNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = {
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      description: formData.get("description") as string || undefined,
    };

    try {
      addProject(projectData);
      
      toast({
        title: "Project Created",
        description: "Your new project has been created successfully.",
      });
      setIsNewProjectOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b bg-card py-2 px-4 md:px-6 flex items-center justify-between h-16">
      <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-background"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsCommandOpen(true)}
          />
        </div>
      </div>
      
      <div className="hidden md:flex items-center mr-4">
        {activeProject ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                <Globe className="mr-2 h-4 w-4" />
                {activeProject.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {projects.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  className={cn(
                    "cursor-pointer",
                    project.id === activeProject.id && "bg-primary/10"
                  )}
                  onClick={() => setActiveProject(project.id)}
                >
                  {project.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => setIsNewProjectOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button className="hidden md:flex gap-1">
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new website to monitor and optimize its SEO performance.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewProject}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="My Website"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Brief description of your project"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandInput 
          placeholder="Search for pages, settings, or help..." 
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>
            {isLoading ? "Searching..." : "No results found."}
          </CommandEmpty>
          
          {placePredictions.length > 0 && (
            <CommandGroup heading="Places">
              {placePredictions.map((place) => (
                <CommandItem
                  key={place.place_id}
                  onSelect={() => {
                    console.log("Selected place:", place);
                    setIsCommandOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{place.structured_formatting.main_text}</span>
                    <span className="text-xs text-muted-foreground">
                      {place.structured_formatting.secondary_text}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading="Pages">
            {searchItems.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => {
                  navigate(item.href);
                  setIsCommandOpen(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
