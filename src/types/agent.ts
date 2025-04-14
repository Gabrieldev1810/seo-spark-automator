export type AgentType = 'seo' | 'performance' | 'content' | 'keyword' | 'backlink';

export type AgentStatus = 'active' | 'inactive' | 'error';

export type ScheduleFrequency = 'hourly' | 'daily' | 'weekly' | 'monthly';

export interface AgentSchedule {
  frequency: ScheduleFrequency;
  time: string; // Format: "HH:mm"
}

export interface AgentConfig {
  name: string;
  description: string;
  type: AgentType;
  schedule: AgentSchedule;
  targets: string[];
}

export interface AgentResult {
  status: 'success' | 'error';
  timestamp: string;
  data: any;
  error?: string;
  responseTime?: number;
}

export interface Agent {
  id: string;
  config: AgentConfig;
  status: AgentStatus;
  lastRun: string | null;
  nextRun: string | null;
  results: AgentResult[];
}

export interface AgentMetrics {
  totalAgents: number;
  activeAgents: number;
  errorAgents: number;
  totalRuns: number;
  successRate: number;
  averageResponseTime: number;
} 