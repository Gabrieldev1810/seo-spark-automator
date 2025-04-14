import { v4 as uuidv4 } from 'uuid';
import { Agent, AgentConfig, AgentResult } from '../types/agent';
import { LighthouseService } from './lighthouseService';
import { ContentService } from './contentService';

// Mock storage for agents
const agents: Agent[] = [];

// Initialize services
const lighthouseService = new LighthouseService();
const contentService = new ContentService();

class AgentService {
  constructor() {
    // Add some sample agents
    if (agents.length === 0) {
      this.createAgent({
        name: 'SEO Monitor',
        description: 'Monitors SEO metrics for your main website',
        type: 'seo',
        schedule: {
          frequency: 'daily',
          time: '08:00'
        },
        targets: ['https://example.com']
      });
      
      this.createAgent({
        name: 'Performance Tracker',
        description: 'Tracks performance metrics for your blog',
        type: 'performance',
        schedule: {
          frequency: 'weekly',
          time: '12:00'
        },
        targets: ['https://blog.example.com']
      });
    }
  }
  
  getAllAgents(): Agent[] {
    return [...agents];
  }
  
  getAgentById(id: string): Agent | undefined {
    return agents.find(agent => agent.id === id);
  }
  
  async createAgent(config: AgentConfig): Promise<Agent> {
    const now = new Date();
    const nextRun = this.calculateNextRun(config.schedule);
    
    const newAgent: Agent = {
      id: uuidv4(),
      config,
      status: 'inactive',
      lastRun: null,
      nextRun: nextRun.toISOString(),
      results: []
    };
    
    agents.push(newAgent);
    return newAgent;
  }
  
  async startAgent(id: string): Promise<Agent> {
    const agentIndex = agents.findIndex(a => a.id === id);
    if (agentIndex === -1) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    
    agents[agentIndex].status = 'active';
    
    // Schedule next run if not already scheduled
    if (!agents[agentIndex].nextRun) {
      const nextRun = this.calculateNextRun(agents[agentIndex].config.schedule);
      agents[agentIndex].nextRun = nextRun.toISOString();
    }
    
    return agents[agentIndex];
  }
  
  async stopAgent(id: string): Promise<Agent> {
    const agentIndex = agents.findIndex(a => a.id === id);
    if (agentIndex === -1) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    
    agents[agentIndex].status = 'inactive';
    return agents[agentIndex];
  }
  
  async deleteAgent(id: string): Promise<void> {
    const agentIndex = agents.findIndex(a => a.id === id);
    if (agentIndex === -1) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    
    agents.splice(agentIndex, 1);
  }
  
  async runAgent(id: string): Promise<AgentResult> {
    const agent = this.getAgentById(id);
    if (!agent) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    
    const agentIndex = agents.findIndex(a => a.id === id);
    const now = new Date();
    
    try {
      let result;
      
      switch (agent.config.type) {
        case 'seo':
          // Mock SEO analysis
          result = {
            seoScore: Math.floor(Math.random() * 100),
            issues: Math.floor(Math.random() * 10),
            keywords: Math.floor(Math.random() * 50) + 10
          };
          break;
          
        case 'performance':
          // Use Lighthouse service
          const lighthouseResults = await lighthouseService.analyze(agent.config.targets[0]);
          result = lighthouseResults;
          break;
          
        case 'content':
          // Use Content service
          const contentResults = await contentService.analyzeContent(agent.config.targets[0]);
          result = contentResults;
          break;
          
        default:
          result = {
            message: `Agent type ${agent.config.type} executed successfully`
          };
      }
      
      const agentResult: AgentResult = {
        status: 'success',
        timestamp: now.toISOString(),
        data: result,
        responseTime: Math.floor(Math.random() * 1000) + 500 // Mock response time
      };
      
      // Update agent
      agents[agentIndex].lastRun = now.toISOString();
      agents[agentIndex].nextRun = this.calculateNextRun(agent.config.schedule).toISOString();
      agents[agentIndex].results.unshift(agentResult);
      
      // Keep only the last 10 results
      if (agents[agentIndex].results.length > 10) {
        agents[agentIndex].results = agents[agentIndex].results.slice(0, 10);
      }
      
      return agentResult;
    } catch (error) {
      const errorResult: AgentResult = {
        status: 'error',
        timestamp: now.toISOString(),
        data: null,
        error: error.message
      };
      
      // Update agent
      agents[agentIndex].status = 'error';
      agents[agentIndex].results.unshift(errorResult);
      
      return errorResult;
    }
  }
  
  private calculateNextRun(schedule: { frequency: string; time: string }): Date {
    const [hours, minutes] = schedule.time.split(':').map(Number);
    const now = new Date();
    const nextRun = new Date();
    
    // Set the time
    nextRun.setHours(hours, minutes, 0, 0);
    
    // If the time is in the past, move to the next occurrence based on frequency
    if (nextRun <= now) {
      switch (schedule.frequency) {
        case 'hourly':
          nextRun.setHours(nextRun.getHours() + 1);
          break;
        case 'daily':
          nextRun.setDate(nextRun.getDate() + 1);
          break;
        case 'weekly':
          nextRun.setDate(nextRun.getDate() + 7);
          break;
        case 'monthly':
          nextRun.setMonth(nextRun.getMonth() + 1);
          break;
      }
    }
    
    return nextRun;
  }
  
  getAgentMetrics() {
    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const errorAgents = agents.filter(a => a.status === 'error').length;
    
    // Calculate total runs and success rate
    let totalRuns = 0;
    let successfulRuns = 0;
    let totalResponseTime = 0;
    let runs = 0;
    
    agents.forEach(agent => {
      totalRuns += agent.results.length;
      
      agent.results.forEach(result => {
        if (result.status === 'success') {
          successfulRuns++;
        }
        
        if (result.responseTime) {
          totalResponseTime += result.responseTime;
          runs++;
        }
      });
    });
    
    const successRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;
    const averageResponseTime = runs > 0 ? totalResponseTime / runs : 0;
    
    return {
      totalAgents,
      activeAgents,
      errorAgents,
      totalRuns,
      successRate,
      averageResponseTime
    };
  }
}

export const agentService = new AgentService();
