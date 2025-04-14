
export type AgentType = 'seo' | 'performance' | 'content' | 'keyword' | 'backlink';
export type AgentStatus = 'active' | 'inactive' | 'error';
export type ScheduleFrequency = 'hourly' | 'daily' | 'weekly' | 'monthly';

export interface AgentSchedule {
  frequency: ScheduleFrequency;
  time: string;
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
  responseTime?: number;
  error?: string;
}

export interface Agent {
  id: string;
  config: AgentConfig;
  status: AgentStatus;
  lastRun: string | null;
  nextRun: string | null;
  results: AgentResult[];
}
