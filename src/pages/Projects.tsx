
import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Globe, Pencil, Trash2, CheckCircle, ExternalLink } from "lucide-react";
import { useProjects, Project } from "../services/projectService";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { projects, activeProject, addProject, updateProject, setActiveProject, deleteProject } = useProjects();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
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
        title: "Success",
        description: "Project added successfully",
      });
      setShowAddDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleEditProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentProject) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      description: formData.get("description") as string || undefined,
    };

    try {
      updateProject(currentProject.id, updates);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      setShowEditDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (project: Project) => {
    setCurrentProject(project);
    setShowEditDialog(true);
  };

  const handleDeleteProject = (id: string) => {
    try {
      deleteProject(id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleSetActive = (id: string) => {
    try {
      setActiveProject(id);
      toast({
        title: "Success",
        description: "Active project changed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change active project",
        variant: "destructive",
      });
    }
  };

  const goToWebVitals = () => {
    navigate("/web-vitals");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button onClick={() => setShowAddDialog(true)}>Add Project</Button>
        </div>

        {projects.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Globe className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">No Projects Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Projects help you organize and analyze different websites. Add your first project to get started.
              </p>
              <Button onClick={() => setShowAddDialog(true)}>Add Your First Project</Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className={project.id === activeProject?.id ? "border-primary" : ""}>
                <CardHeader className="relative">
                  <div className="absolute right-4 top-4 flex space-x-1">
                    {project.id === activeProject?.id && (
                      <div className="mr-2 flex items-center text-primary">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">Active</span>
                      </div>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
                      {project.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description || "No description provided."}
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Added on {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {project.id !== activeProject?.id && (
                    <Button variant="outline" size="sm" onClick={() => handleSetActive(project.id)}>
                      Set as Active
                    </Button>
                  )}
                  <Button size="sm" onClick={goToWebVitals}>Analyze</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Add Project Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Add a new website to monitor and optimize its SEO performance.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProject}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" placeholder="My Website" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input id="url" name="url" type="url" placeholder="https://example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" placeholder="Brief description of your project" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Project Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update your project details.
              </DialogDescription>
            </DialogHeader>
            {currentProject && (
              <form onSubmit={handleEditProject}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Project Name</Label>
                    <Input 
                      id="edit-name" 
                      name="name" 
                      defaultValue={currentProject.name} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-url">Website URL</Label>
                    <Input 
                      id="edit-url" 
                      name="url" 
                      type="url" 
                      defaultValue={currentProject.url} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Input 
                      id="edit-description" 
                      name="description" 
                      defaultValue={currentProject.description || ""} 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Projects;
