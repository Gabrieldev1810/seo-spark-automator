
import React from "react";
import { useAgents } from "@/contexts/AgentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { getAgentColor } from "@/components/agents/AgentCard";
import { Brain, Laptop, MapPin, ShieldCheck, Server } from "lucide-react";
import { AgentType } from "@/types/agents";

export function MessageList() {
  const { messages, agents } = useAgents();
  
  const agentIcons: Record<AgentType, React.ElementType> = {
    ContentAgent: Brain,
    UXAgent: Laptop,
    LocalAgent: MapPin,
    TrustAgent: ShieldCheck,
    MCP: Server,
  };

  // Sort messages by newest first
  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Agent Communication Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {sortedMessages.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No messages yet. Use the Agent Console to send a message.
              </p>
            ) : (
              sortedMessages.map((message) => {
                const FromIcon = agentIcons[message.from];
                const ToIcon = agentIcons[message.to];
                
                return (
                  <div key={message.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getAgentColor(message.from)}20` }}
                    >
                      <FromIcon 
                        className="h-5 w-5" 
                        style={{ color: getAgentColor(message.from) }} 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">
                            {message.from === 'MCP' ? 'MCP Server' : agents[message.from as Exclude<AgentType, 'MCP'>]?.name || 'MCP Server'}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium">
                            {message.to === 'MCP' ? 'MCP Server' : agents[message.to as Exclude<AgentType, 'MCP'>]?.name || 'MCP Server'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      
                      <div className="mt-1 text-sm">
                        {message.content}
                      </div>
                      
                      {message.metadata && (
                        <div className="mt-1 text-xs text-gray-500">
                          {message.metadata.responseToMessageId && 
                            <span>In response to message #{message.metadata.responseToMessageId.split('-')[0]}</span>
                          }
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
