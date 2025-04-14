
import React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  name: string;
  url: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

// Local storage key for projects
const PROJECTS_STORAGE_KEY = 'seo_projects';

class ProjectService {
  private projects: Project[] = [];

  constructor() {
    this.loadProjects();
  }

  private loadProjects(): void {
    try {
      const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
      }
    } catch (error) {
      console.error('Error loading projects from local storage:', error);
    }
  }

  private saveProjects(): void {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    } catch (error) {
      console.error('Error saving projects to local storage:', error);
    }
  }

  public getProjects(): Project[] {
    return [...this.projects];
  }

  public getActiveProject(): Project | undefined {
    return this.projects.find((project) => project.isActive === true);
  }

  public getProjectById(id: string): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  public addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const now = new Date();
    const newProject: Project = {
      id: uuidv4(),
      ...project,
      createdAt: now,
      updatedAt: now,
      isActive: true,
    };

    // Set all other projects to inactive
    this.projects = this.projects.map(p => ({
      ...p,
      isActive: false
    }));

    this.projects.push(newProject);
    this.saveProjects();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) return null;

    const updatedProject = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.projects[index] = updatedProject;
    this.saveProjects();
    return updatedProject;
  }

  public setActiveProject(id: string): Project | null {
    // Set all projects to inactive
    this.projects = this.projects.map(p => ({
      ...p,
      isActive: p.id === id
    }));

    this.saveProjects();
    return this.getProjectById(id) || null;
  }

  public deleteProject(id: string): boolean {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter((project) => project.id !== id);
    
    // If we deleted the active project, set the first remaining project as active
    if (initialLength !== this.projects.length) {
      if (this.projects.length > 0 && !this.projects.some(p => p.isActive)) {
        this.projects[0].isActive = true;
      }
      this.saveProjects();
      return true;
    }
    
    return false;
  }
}

export const projectService = new ProjectService();

// React Context for Projects
export type ProjectContextType = {
  projects: Project[];
  activeProject: Project | undefined;
  fetchProjects: () => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>) => void;
  setActiveProject: (id: string) => void;
  deleteProject: (id: string) => void;
};

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);

  const fetchProjects = () => {
    const allProjects = projectService.getProjects();
    setProjects(allProjects);
    setActiveProject(projectService.getActiveProject());
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const value = {
    projects,
    activeProject,
    fetchProjects,
    addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      projectService.addProject(project);
      fetchProjects();
    },
    updateProject: (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
      projectService.updateProject(id, updates);
      fetchProjects();
    },
    setActiveProject: (id: string) => {
      projectService.setActiveProject(id);
      fetchProjects();
    },
    deleteProject: (id: string) => {
      projectService.deleteProject(id);
      fetchProjects();
    },
  };

  return React.createElement(
    ProjectContext.Provider, 
    { value }, 
    children
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
