
export type AgentType = 'ContentAgent' | 'UXAgent' | 'LocalAgent' | 'TrustAgent' | 'MCP';

export type AgentStatus = 'idle' | 'processing' | 'completed' | 'error';

export type AgentPriority = 'low' | 'medium' | 'high' | 'critical';

export interface AgentMessage {
  id: string;
  from: AgentType;
  to: AgentType;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AgentTask {
  id: string;
  agentType: AgentType;
  title: string;
  description: string;
  status: AgentStatus;
  priority: AgentPriority;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  result?: string;
}

export interface Agent {
  type: AgentType;
  name: string;
  description: string;
  status: AgentStatus;
  activeTasks: AgentTask[];
  capabilities: string[];
}
