
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAgents } from "@/contexts/AgentContext";
import { AgentType } from "@/types/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

export function AgentConsole() {
  const { agents, sendMessage } = useAgents();
  const [fromAgent, setFromAgent] = useState<AgentType>("ContentAgent");
  const [toAgent, setToAgent] = useState<AgentType | "MCP">("MCP");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    sendMessage(fromAgent, toAgent, message);
    
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
    }, 500);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Agent Console</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">From Agent</label>
            <Select value={fromAgent} onValueChange={(v) => setFromAgent(v as AgentType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select source agent" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(agents).map((agent) => (
                  <SelectItem key={agent} value={agent}>{agents[agent as AgentType].name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={toAgent} onValueChange={(v) => setToAgent(v as AgentType | "MCP")}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCP">MCP Server (Main Control Program)</SelectItem>
                {Object.keys(agents)
                  .filter(agent => agent !== fromAgent)
                  .map((agent) => (
                    <SelectItem key={agent} value={agent}>{agents[agent as AgentType].name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea 
            placeholder="Enter your message or command..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        
        <Button 
          className="w-full"
          onClick={handleSendMessage}
          disabled={!message.trim() || isSending}
        >
          {isSending ? 'Sending...' : 'Send Message'}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
