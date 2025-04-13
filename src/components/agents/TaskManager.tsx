
import React from "react";
import { useAgents } from "@/contexts/AgentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AgentPriority, AgentStatus } from "@/types/agents";
import { getAgentColor } from "@/components/agents/AgentCard";

export function TaskManager() {
  const { tasks } = useAgents();
  
  // Sort tasks: active first, then by priority and creation date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by status (processing first)
    if (a.status === "processing" && b.status !== "processing") return -1;
    if (a.status !== "processing" && b.status === "processing") return 1;
    
    // Then by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Task Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {sortedTasks.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No tasks yet. Tasks will appear here when created.
              </p>
            ) : (
              sortedTasks.map((task) => (
                <Collapsible key={task.id}>
                  <div 
                    className="border rounded-md overflow-hidden transition-colors"
                    style={{ 
                      borderLeftWidth: "4px", 
                      borderLeftColor: getAgentColor(task.agentType) 
                    }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadgeClass(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge className={getPriorityBadgeClass(task.priority)}>
                          {task.priority}
                        </Badge>
                        <h3 className="font-medium">{task.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(task.createdAt, { addSuffix: true })}
                        </span>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="p-4 text-sm">
                        <p className="mb-2 text-gray-700">{task.description}</p>
                        
                        {task.status === "completed" && task.result && (
                          <div className="mt-3 pt-3 border-t">
                            <h4 className="font-medium mb-1">Result:</h4>
                            <p className="text-gray-600">{task.result}</p>
                            
                            {task.completedAt && (
                              <p className="mt-2 text-xs text-gray-500">
                                Completed {formatDistanceToNow(task.completedAt, { addSuffix: true })}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function getStatusBadgeClass(status: AgentStatus): string {
  switch (status) {
    case "processing":
      return "bg-blue-500 text-white";
    case "completed":
      return "bg-green-500 text-white";
    case "error":
      return "bg-red-500 text-white";
    case "idle":
    default:
      return "bg-gray-200 text-gray-700";
  }
}

function getPriorityBadgeClass(priority: AgentPriority): string {
  switch (priority) {
    case "critical":
      return "bg-red-500 text-white";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
    default:
      return "bg-green-500 text-white";
  }
}
