
import React from "react";
import { useAgents } from "@/contexts/AgentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAgentColor } from "@/components/agents/AgentCard";
import { Brain, Laptop, MapPin, ShieldCheck, Server, Network } from "lucide-react";

export function AgentNetwork() {
  const { agents, messages } = useAgents();
  
  // Last few messages to visualize
  const recentMessages = messages.slice(-5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Agent Network Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[500px] relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          {/* MCP Server Node (Center) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 shadow-lg">
                <Server className="h-10 w-10 text-white" />
              </div>
              <div className="mt-2 text-sm font-semibold">MCP Server</div>
              <div className="text-xs text-gray-500">Orchestration</div>
            </div>
          </div>

          {/* Agent Nodes */}
          <div className="absolute top-[20%] left-[20%]">
            <AgentNode 
              icon={<Brain className="h-8 w-8 text-white" />} 
              name="Content Agent" 
              status={agents.ContentAgent.status}
              color={getAgentColor('ContentAgent')}
            />
          </div>

          <div className="absolute top-[20%] right-[20%]">
            <AgentNode 
              icon={<Laptop className="h-8 w-8 text-white" />} 
              name="UX Agent" 
              status={agents.UXAgent.status}
              color={getAgentColor('UXAgent')}
            />
          </div>

          <div className="absolute bottom-[20%] left-[20%]">
            <AgentNode 
              icon={<MapPin className="h-8 w-8 text-white" />} 
              name="Local Agent" 
              status={agents.LocalAgent.status}
              color={getAgentColor('LocalAgent')}
            />
          </div>

          <div className="absolute bottom-[20%] right-[20%]">
            <AgentNode 
              icon={<ShieldCheck className="h-8 w-8 text-white" />} 
              name="Trust Agent" 
              status={agents.TrustAgent.status}
              color={getAgentColor('TrustAgent')}
            />
          </div>

          {/* Agent2Agent Core */}
          <div className="absolute top-1/2 right-[15%] transform -translate-y-1/2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center border-4 border-blue-600 shadow-lg">
                <Network className="h-8 w-8 text-white" />
              </div>
              <div className="mt-2 text-xs font-semibold">Agent2Agent Core</div>
            </div>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
            </defs>
            
            {/* Permanent connections */}
            <line 
              x1="50%" y1="50%" 
              x2="20%" y2="20%" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
            <line 
              x1="50%" y1="50%" 
              x2="80%" y2="20%" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
            <line 
              x1="50%" y1="50%" 
              x2="20%" y2="80%" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
            <line 
              x1="50%" y1="50%" 
              x2="80%" y2="80%" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
            <line 
              x1="50%" y1="50%" 
              x2="85%" y2="50%" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
            
            {/* Active message animations */}
            {recentMessages.map((msg, idx) => {
              // Define start and end coordinates based on agents
              let startX, startY, endX, endY;
              
              if (msg.from === 'ContentAgent') startX = "20%", startY = "20%";
              else if (msg.from === 'UXAgent') startX = "80%", startY = "20%";
              else if (msg.from === 'LocalAgent') startX = "20%", startY = "80%";
              else if (msg.from === 'TrustAgent') startX = "80%", startY = "80%";
              else startX = "50%", startY = "50%";
              
              if (msg.to === 'ContentAgent') endX = "20%", endY = "20%";
              else if (msg.to === 'UXAgent') endX = "80%", endY = "20%";
              else if (msg.to === 'LocalAgent') endX = "20%", endY = "80%";
              else if (msg.to === 'TrustAgent') endX = "80%", endY = "80%";
              else endX = "50%", endY = "50%";
              
              return (
                <g key={msg.id}>
                  <circle 
                    cx={startX} 
                    cy={startY} 
                    r="5" 
                    fill={getAgentColor(msg.from as any)}
                    opacity="0.7">
                    <animate 
                      attributeName="cx" 
                      from={startX} 
                      to={endX} 
                      dur="1.5s" 
                      begin={`${idx * 0.2}s`}
                      fill="freeze" 
                      repeatCount="1" 
                    />
                    <animate 
                      attributeName="cy" 
                      from={startY} 
                      to={endY} 
                      dur="1.5s" 
                      begin={`${idx * 0.2}s`}
                      fill="freeze" 
                      repeatCount="1" 
                    />
                    <animate 
                      attributeName="opacity" 
                      from="0.7" 
                      to="0" 
                      dur="1.5s" 
                      begin={`${idx * 0.2}s`}
                      fill="freeze" 
                      repeatCount="1" 
                    />
                  </circle>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

interface AgentNodeProps {
  icon: React.ReactNode;
  name: string;
  status: string;
  color: string;
}

function AgentNode({ icon, name, status, color }: AgentNodeProps) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg ${
          status === 'processing' ? 'animate-pulse' : ''
        }`}
        style={{ backgroundColor: color, borderColor: `${color}90` }}
      >
        {icon}
      </div>
      <div className="mt-2 text-xs font-semibold">{name}</div>
      <div className="text-xs capitalize" style={{ color }}>
        {status}
      </div>
    </div>
  );
}
