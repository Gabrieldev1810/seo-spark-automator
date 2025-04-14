import React, { useState, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useToast } from "../components/ui/use-toast";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Agent, AgentConfig, AgentType, ScheduleFrequency } from "../types/agent";
import { agentService } from "../services/agentService";
import { useProjects } from "../services/projectService";

const Agents = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { activeProject } = useProjects();
  
  const [newAgent, setNewAgent] = useState<Partial<AgentConfig>>({
    type: 'seo',
    name: '',
    description: '',
    schedule: {
      frequency: 'daily',
      time: '00:00'
    },
    targets: activeProject ? [activeProject.url] : []
  });

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    if (activeProject?.url) {
      setNewAgent(prev => ({
        ...prev,
        targets: [activeProject.url]
      }));
    }
  }, [activeProject]);

  const loadAgents = () => {
    const allAgents = agentService.getAllAgents();
    setAgents(allAgents);
  };

  const handleCreateAgent = async () => {
    try {
      await agentService.createAgent(newAgent as AgentConfig);
      toast({
        title: "Success",
        description: "Agent created successfully",
      });
      setShowCreateDialog(false);
      loadAgents();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleStartAgent = async (id: string) => {
    try {
      await agentService.startAgent(id);
      toast({
        title: "Success",
        description: "Agent started successfully",
      });
      loadAgents();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleStopAgent = async (id: string) => {
    try {
      await agentService.stopAgent(id);
      toast({
        title: "Success",
        description: "Agent stopped successfully",
      });
      loadAgents();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      await agentService.deleteAgent(id);
      toast({
        title: "Success",
        description: "Agent deleted successfully",
      });
      loadAgents();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getAgentTypeColor = (type: AgentType) => {
    switch (type) {
      case 'seo':
        return 'bg-blue-500';
      case 'performance':
        return 'bg-green-500';
      case 'content':
        return 'bg-purple-500';
      case 'keyword':
        return 'bg-yellow-500';
      case 'backlink':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Agents</h1>
          <Button onClick={() => setShowCreateDialog(true)}>Create Agent</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{agent.config.name}</CardTitle>
                      <CardDescription>{agent.config.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getAgentTypeColor(agent.config.type)}>
                        {agent.config.type}
                      </Badge>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Schedule</Label>
                      <p className="text-sm text-muted-foreground">
                        {agent.config.schedule.frequency} at {agent.config.schedule.time}
                      </p>
                    </div>
                    <div>
                      <Label>Targets</Label>
                      <p className="text-sm text-muted-foreground">
                        {agent.config.targets.length} targets
                      </p>
                    </div>
                    <div>
                      <Label>Last Run</Label>
                      <p className="text-sm text-muted-foreground">
                        {agent.lastRun ? new Date(agent.lastRun).toLocaleString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <Label>Next Run</Label>
                      <p className="text-sm text-muted-foreground">
                        {agent.nextRun ? new Date(agent.nextRun).toLocaleString() : 'Not scheduled'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    {agent.status === 'active' ? (
                      <Button variant="outline" onClick={() => handleStopAgent(agent.id)}>
                        Stop
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => handleStartAgent(agent.id)}>
                        Start
                      </Button>
                    )}
                    <Button variant="destructive" onClick={() => handleDeleteAgent(agent.id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
              <DialogDescription>
                Configure a new agent to monitor your website's SEO performance.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newAgent.type}
                  onValueChange={(value: AgentType) => setNewAgent({ ...newAgent, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="keyword">Keyword</SelectItem>
                    <SelectItem value="backlink">Backlink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newAgent.schedule?.frequency}
                  onValueChange={(value: ScheduleFrequency) => setNewAgent({
                    ...newAgent,
                    schedule: { ...newAgent.schedule, frequency: value }
                  })}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAgent.schedule?.time}
                  onChange={(e) => setNewAgent({
                    ...newAgent,
                    schedule: { ...newAgent.schedule, time: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targets">Targets (one per line)</Label>
                <Input
                  id="targets"
                  value={newAgent.targets?.join('\n')}
                  onChange={(e) => setNewAgent({
                    ...newAgent,
                    targets: e.target.value.split('\n').filter(t => t.trim())
                  })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAgent}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Agents;
