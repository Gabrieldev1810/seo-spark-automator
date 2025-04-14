
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, AgentStatus } from "@/types/agents";
import { Brain, Laptop, MapPin, ShieldCheck, Server } from "lucide-react";

const agentIcons = {
  ContentAgent: Brain,
  UXAgent: Laptop,
  LocalAgent: MapPin,
  TrustAgent: ShieldCheck,
  MCP: Server,
};

const statusColors = {
  idle: "bg-gray-200 text-gray-700",
  processing: "bg-blue-500 text-white animate-pulse",
  completed: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
};

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const Icon = agentIcons[agent.type];

  return (
    <Card 
      className="h-full transition-all hover:shadow-md cursor-pointer border-l-4"
      style={{ borderLeftColor: getAgentColor(agent.type) }}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-md" style={{ backgroundColor: `${getAgentColor(agent.type)}20` }}>
              <Icon className="h-5 w-5" style={{ color: getAgentColor(agent.type) }} />
            </div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
          </div>
          <Badge className={statusColors[agent.status]}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>{agent.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
        <ul className="text-sm space-y-1">
          {agent.capabilities.map((capability, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              {capability}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-sm text-muted-foreground">
          {agent.activeTasks.length > 0 ? (
            <span>Processing {agent.activeTasks.length} tasks</span>
          ) : (
            <span>No active tasks</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export function getAgentColor(agentType: Agent['type']): string {
  switch (agentType) {
    case 'ContentAgent':
      return '#3b82f6'; // blue
    case 'UXAgent':
      return '#10b981'; // green
    case 'LocalAgent':
      return '#f59e0b'; // amber
    case 'TrustAgent':
      return '#8b5cf6'; // purple
    case 'MCP':
      return '#6b7280'; // gray
    default:
      return '#6b7280'; // gray
  }
}
