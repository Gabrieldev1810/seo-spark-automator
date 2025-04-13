
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Agent, AgentMessage, AgentTask, AgentType } from '@/types/agents';

interface AgentContextType {
  agents: Record<AgentType, Agent>;
  messages: AgentMessage[];
  tasks: AgentTask[];
  sendMessage: (from: AgentType, to: AgentType | 'MCP', content: string, metadata?: Record<string, any>) => void;
  createTask: (agentType: AgentType, title: string, description: string, priority: AgentTask['priority']) => void;
  completeTask: (taskId: string, result: string) => void;
}

const defaultAgents: Record<AgentType, Agent> = {
  ContentAgent: {
    type: 'ContentAgent',
    name: 'Content Intelligence Agent',
    description: 'Analyzes and optimizes content for SEO performance.',
    status: 'idle',
    activeTasks: [],
    capabilities: [
      'Content gap analysis',
      'Semantic keyword optimization',
      'Content structure recommendations',
      'Readability assessment'
    ],
  },
  UXAgent: {
    type: 'UXAgent',
    name: 'User Experience Agent',
    description: 'Monitors and improves user experience metrics.',
    status: 'idle',
    activeTasks: [],
    capabilities: [
      'Core Web Vitals analysis',
      'Mobile usability audits',
      'Page load optimization',
      'User journey mapping'
    ],
  },
  LocalAgent: {
    type: 'LocalAgent',
    name: 'Local SEO Agent',
    description: 'Optimizes for local search visibility.',
    status: 'idle',
    activeTasks: [],
    capabilities: [
      'Local listings management',
      'Google Business Profile optimization',
      'Local keyword targeting',
      'Review sentiment analysis'
    ],
  },
  TrustAgent: {
    type: 'TrustAgent',
    name: 'E-E-A-T Trust Agent',
    description: 'Enhances expertise, authority, and trustworthiness signals.',
    status: 'idle',
    activeTasks: [],
    capabilities: [
      'Author expertise validation',
      'Citation and reference analysis',
      'Trust signal identification',
      'Authority enhancement recommendations'
    ],
  },
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Record<AgentType, Agent>>(defaultAgents);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);

  // Simulate automated agent responses
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.to !== 'MCP') {
      // Simulate response delay
      const timeout = setTimeout(() => {
        sendMessage(
          lastMessage.to,
          lastMessage.from,
          `Processed your request: "${lastMessage.content.substring(0, 30)}..."`,
          { responseToMessageId: lastMessage.id }
        );
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  // Simulate automated task processing
  useEffect(() => {
    const processingTasks = tasks.filter(task => task.status === 'processing');
    
    processingTasks.forEach(task => {
      const timeout = setTimeout(() => {
        completeTask(
          task.id,
          `Task completed with analysis: ${task.description.substring(0, 50)}...`
        );
      }, Math.random() * 5000 + 3000); // Random time between 3-8 seconds
      
      return () => clearTimeout(timeout);
    });
  }, [tasks]);

  const sendMessage = (
    from: AgentType, 
    to: AgentType | 'MCP', 
    content: string,
    metadata?: Record<string, any>
  ) => {
    const newMessage: AgentMessage = {
      id: uuidv4(),
      from,
      to,
      content,
      timestamp: new Date(),
      metadata
    };

    setMessages(prev => [...prev, newMessage]);

    // Update agent status for sending and receiving agents
    setAgents(prev => ({
      ...prev,
      [from]: {
        ...prev[from],
        status: 'processing',
      },
      ...(to !== 'MCP' ? {
        [to]: {
          ...prev[to],
          status: 'processing',
        }
      } : {})
    }));

    // Reset status after a delay
    setTimeout(() => {
      setAgents(prev => ({
        ...prev,
        [from]: {
          ...prev[from],
          status: 'idle',
        },
        ...(to !== 'MCP' ? {
          [to]: {
            ...prev[to],
            status: 'idle',
          }
        } : {})
      }));
    }, 2000);
  };

  const createTask = (
    agentType: AgentType, 
    title: string, 
    description: string, 
    priority: AgentTask['priority']
  ) => {
    const newTask: AgentTask = {
      id: uuidv4(),
      agentType,
      title,
      description,
      status: 'processing',
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTasks(prev => [...prev, newTask]);

    // Update agent's active tasks
    setAgents(prev => ({
      ...prev,
      [agentType]: {
        ...prev[agentType],
        status: 'processing',
        activeTasks: [...prev[agentType].activeTasks, newTask],
      }
    }));
  };

  const completeTask = (taskId: string, result: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: 'completed', 
              updatedAt: new Date(), 
              completedAt: new Date(),
              result 
            } 
          : task
      )
    );

    // Find and update the corresponding agent
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setAgents(prev => ({
        ...prev,
        [task.agentType]: {
          ...prev[task.agentType],
          activeTasks: prev[task.agentType].activeTasks.filter(t => t.id !== taskId),
          status: prev[task.agentType].activeTasks.length <= 1 ? 'idle' : 'processing'
        }
      }));
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        messages,
        tasks,
        sendMessage,
        createTask,
        completeTask,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};
