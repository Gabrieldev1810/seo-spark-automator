import { Agent, AgentConfig, AgentResult, AgentMetrics } from '../types/agent';
import { LighthouseService } from './lighthouseService';
import { KeywordService } from './keywordService';
import { ContentService } from './contentService';

class AgentService {
  private agents: Map<string, Agent> = new Map();
  private runningAgents: Set<string> = new Set();
  private lighthouseService: LighthouseService;
  private keywordService: KeywordService;
  private contentService: ContentService;

  constructor() {
    this.lighthouseService = new LighthouseService();
    this.keywordService = new KeywordService();
    this.contentService = new ContentService();
  }

  async createAgent(config: AgentConfig): Promise<Agent> {
    const id = crypto.randomUUID();
    const agent: Agent = {
      id,
      config,
      status: 'inactive',
      lastRun: null,
      nextRun: this.calculateNextRun(config.schedule),
      results: []
    };

    this.agents.set(id, agent);
    return agent;
  }

  async updateAgent(id: string, config: Partial<AgentConfig>): Promise<Agent> {
    const agent = this.agents.get(id);
    if (!agent) {
      throw new Error(`Agent with id ${id} not found`);
    }

    const updatedAgent: Agent = {
      ...agent,
      config: { ...agent.config, ...config },
      nextRun: this.calculateNextRun({ ...agent.config.schedule, ...config.schedule })
    };

    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }

  async deleteAgent(id: string): Promise<void> {
    if (this.runningAgents.has(id)) {
      await this.stopAgent(id);
    }
    this.agents.delete(id);
  }

  async startAgent(id: string): Promise<void> {
    const agent = this.agents.get(id);
    if (!agent) {
      throw new Error(`Agent with id ${id} not found`);
    }

    if (this.runningAgents.has(id)) {
      throw new Error(`Agent ${id} is already running`);
    }

    this.runningAgents.add(id);
    agent.status = 'active';
    this.agents.set(id, agent);

    // Start the agent's task
    this.runAgentTask(id);
  }

  async stopAgent(id: string): Promise<void> {
    const agent = this.agents.get(id);
    if (!agent) {
      throw new Error(`Agent with id ${id} not found`);
    }

    this.runningAgents.delete(id);
    agent.status = 'inactive';
    this.agents.set(id, agent);
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getAgentMetrics(): AgentMetrics {
    const agents = this.getAllAgents();
    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const errorAgents = agents.filter(a => a.status === 'error').length;
    const totalRuns = agents.reduce((sum, a) => sum + a.results.length, 0);
    const successfulRuns = agents.reduce((sum, a) => 
      sum + a.results.filter(r => r.status === 'success').length, 0
    );
    const averageResponseTime = agents.reduce((sum, a) => 
      sum + a.results.reduce((total, r) => total + (r.responseTime || 0), 0), 0
    ) / totalRuns || 0;

    return {
      totalAgents,
      activeAgents,
      errorAgents,
      totalRuns,
      successRate: totalRuns ? (successfulRuns / totalRuns) * 100 : 0,
      averageResponseTime
    };
  }

  private async runAgentTask(id: string): Promise<void> {
    const agent = this.agents.get(id);
    if (!agent || !this.runningAgents.has(id)) {
      return;
    }

    try {
      const startTime = Date.now();
      let result: AgentResult;

      switch (agent.config.type) {
        case 'seo':
          result = await this.runSeoTask(agent);
          break;
        case 'performance':
          result = await this.runPerformanceTask(agent);
          break;
        case 'content':
          result = await this.runContentTask(agent);
          break;
        case 'keyword':
          result = await this.runKeywordTask(agent);
          break;
        case 'backlink':
          result = await this.runBacklinkTask(agent);
          break;
        default:
          throw new Error(`Unknown agent type: ${agent.config.type}`);
      }

      result.responseTime = Date.now() - startTime;
      agent.results.push(result);
      agent.lastRun = new Date().toISOString();
      agent.nextRun = this.calculateNextRun(agent.config.schedule);
      agent.status = 'active';
    } catch (error) {
      agent.status = 'error';
      agent.results.push({
        status: 'error',
        timestamp: new Date().toISOString(),
        data: { error: error.message },
        error: error.message
      });
    }

    this.agents.set(id, agent);

    // Schedule next run if agent is still active
    if (this.runningAgents.has(id)) {
      const delay = this.calculateDelay(agent.config.schedule);
      setTimeout(() => this.runAgentTask(id), delay);
    }
  }

  private async runSeoTask(agent: Agent): Promise<AgentResult> {
    // Implement SEO monitoring logic
    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        message: 'SEO task completed successfully'
      }
    };
  }

  private async runPerformanceTask(agent: Agent): Promise<AgentResult> {
    const results = await Promise.all(
      agent.config.targets.map(url => 
        this.lighthouseService.analyze(url)
      )
    );

    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        results
      }
    };
  }

  private async runContentTask(agent: Agent): Promise<AgentResult> {
    // Implement content analysis logic
    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        message: 'Content task completed successfully'
      }
    };
  }

  private async runKeywordTask(agent: Agent): Promise<AgentResult> {
    // Implement keyword analysis logic
    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        message: 'Keyword task completed successfully'
      }
    };
  }

  private async runBacklinkTask(agent: Agent): Promise<AgentResult> {
    // Implement backlink analysis logic
    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        message: 'Backlink task completed successfully'
      }
    };
  }

  private calculateNextRun(schedule: AgentConfig['schedule']): string | null {
    if (!schedule) return null;

    const now = new Date();
    const [hours, minutes] = schedule.time.split(':').map(Number);
    const nextRun = new Date(now);
    nextRun.setHours(hours, minutes, 0, 0);

    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    switch (schedule.frequency) {
      case 'hourly':
        nextRun.setHours(nextRun.getHours() + 1);
        break;
      case 'daily':
        // Already set to next day
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
    }

    return nextRun.toISOString();
  }

  private calculateDelay(schedule: AgentConfig['schedule']): number {
    if (!schedule) return 0;

    const nextRun = new Date(this.calculateNextRun(schedule)!);
    const now = new Date();
    return Math.max(0, nextRun.getTime() - now.getTime());
  }
}

export const agentService = new AgentService();
