import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentProvider } from "@/contexts/AgentContext";
import { AgentCard } from "@/components/agents/AgentCard";
import { AgentNetwork } from "@/components/agents/AgentNetwork";
import { AgentConsole } from "@/components/agents/AgentConsole";
import { MessageList } from "@/components/agents/MessageList";
import { TaskManager } from "@/components/agents/TaskManager";
import { useAgents } from "@/contexts/AgentContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AgentType } from "@/types/agents";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Code, Database, Globe, Network, Plus, Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SystemDiagram = () => (
  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm text-center">
    <h3 className="text-lg font-semibold mb-4">SEO Intelligence Network Architecture</h3>
    <div className="relative">
      <svg className="w-full h-auto my-4" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Frontend */}
        <rect x="300" y="40" width="200" height="80" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2"/>
        <text x="400" y="65" fontSize="14" textAnchor="middle" fill="#0369a1" fontWeight="500">Frontend (React)</text>
        <text x="400" y="85" fontSize="12" textAnchor="middle" fill="#0369a1">Dashboards • Agent Console</text>
        
        {/* MCP Server */}
        <rect x="300" y="180" width="200" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2"/>
        <text x="400" y="205" fontSize="14" textAnchor="middle" fill="#6d28d9" fontWeight="500">MCP Server (FastAPI)</text>
        <text x="400" y="225" fontSize="12" textAnchor="middle" fill="#6d28d9">Orchestration • Routing</text>
        
        {/* Channel Modules */}
        <rect x="150" y="320" width="180" height="70" rx="8" fill="#ffedd5" stroke="#f97316" strokeWidth="2"/>
        <text x="240" y="345" fontSize="14" textAnchor="middle" fill="#c2410c" fontWeight="500">Channel Modules</text>
        <text x="240" y="365" fontSize="12" textAnchor="middle" fill="#c2410c">Web • Voice • Database</text>
        
        {/* Agent2Agent Core */}
        <rect x="470" y="320" width="180" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
        <text x="560" y="345" fontSize="14" textAnchor="middle" fill="#1d4ed8" fontWeight="500">Agent2Agent Core</text>
        <text x="560" y="365" fontSize="12" textAnchor="middle" fill="#1d4ed8">Context Sharing • Routing</text>
        
        {/* SEO AI Agents */}
        <rect x="150" y="440" width="180" height="70" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
        <text x="240" y="465" fontSize="14" textAnchor="middle" fill="#15803d" fontWeight="500">SEO AI Agents</text>
        <text x="240" y="485" fontSize="12" textAnchor="middle" fill="#15803d">Content • UX • Local • Trust</text>
        
        {/* Connecting Lines */}
        <line x1="400" y1="120" x2="400" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5"/>
        <line x1="400" y1="260" x2="400" y2="290" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="400" y1="290" x2="240" y2="320" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="400" y1="290" x2="560" y2="320" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="240" y1="390" x2="240" y2="440" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="560" y1="390" x2="240" y2="440" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5"/>
      </svg>
    </div>
  </div>
);

const AgentSystemContent = () => {
  const { agents, createTask } = useAgents();
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [taskForm, setTaskForm] = useState({
    agentType: "ContentAgent" as Exclude<AgentType, 'MCP'>,
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "critical"
  });
  
  const handleCreateTask = () => {
    if (!taskForm.title || !taskForm.description) return;
    
    createTask(
      taskForm.agentType,
      taskForm.title,
      taskForm.description,
      taskForm.priority
    );
    
    setOpenTaskDialog(false);
    setTaskForm({
      agentType: "ContentAgent",
      title: "",
      description: "",
      priority: "medium"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">SEO Intelligence Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {Object.values(agents).map((agent) => (
              <AgentCard 
                key={agent.type} 
                agent={agent} 
                onClick={() => {
                  if (agent.type !== 'MCP') {
                    setTaskForm(prev => ({ 
                      ...prev, 
                      agentType: agent.type as Exclude<AgentType, 'MCP'>
                    }));
                    setOpenTaskDialog(true);
                  }
                }}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Agent Network Visualization</h2>
            <Button
              onClick={() => setOpenTaskDialog(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </div>
          
          <AgentNetwork />
        </div>
        
        <div className="w-full lg:w-[350px] space-y-6">
          <AgentConsole />
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Server className="h-4 w-4" />
              System Components
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Server className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">MCP Server</div>
                  <div className="text-xs text-gray-500">Central orchestration</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Network className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Agent2Agent Protocol</div>
                  <div className="text-xs text-gray-500">Secure communication</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Code className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium">Channel Modules</div>
                  <div className="text-xs text-gray-500">Interface adapters</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Data Storage</div>
                  <div className="text-xs text-gray-500">Secure intelligence repository</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="messages">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Message Log</TabsTrigger>
          <TabsTrigger value="tasks">Task Manager</TabsTrigger>
          <TabsTrigger value="architecture">System Architecture</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="mt-4">
          <MessageList />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <TaskManager />
        </TabsContent>
        
        <TabsContent value="architecture" className="mt-4">
          <SystemDiagram />
        </TabsContent>
      </Tabs>
      
      <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Agent Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign To Agent</label>
              <Select 
                value={taskForm.agentType} 
                onValueChange={(v) => setTaskForm(prev => ({ ...prev, agentType: v as Exclude<AgentType, 'MCP'> }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(agents).map((agent) => (
                    <SelectItem key={agent} value={agent}>{agents[agent as AgentType].name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input 
                placeholder="Enter task title"
                value={taskForm.title}
                onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Description</label>
              <Textarea 
                placeholder="Describe the task in detail..."
                value={taskForm.description}
                onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select 
                value={taskForm.priority} 
                onValueChange={(v) => setTaskForm(prev => ({ ...prev, priority: v as any }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenTaskDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask} disabled={!taskForm.title || !taskForm.description}>
              Create Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AgentSystem = () => {
  return (
    <AppLayout>
      <AgentProvider>
        <AgentSystemContent />
      </AgentProvider>
    </AppLayout>
  );
};

export default AgentSystem;
