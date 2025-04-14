// Remove Node.js specific imports
// import { exec } from 'child_process';
// import { promisify } from 'util';
// import fs from 'fs';
// import path from 'path';

// const execAsync = promisify(exec);

// Define the window._env_ interface to fix TypeScript errors
declare global {
  interface Window {
    _env_?: {
      LIGHTHOUSE_API_KEY?: string;
      [key: string]: any;
    };
  }
}

/**
 * Interface for resource details
 */
export interface ResourceDetails {
  url: string;
  type: string;
  size: number;
  transferSize: number;
  priority: string;
  renderBlocking: boolean;
  cacheable: boolean;
  cacheLifetime: number;
  compression: boolean;
  compressionRatio: number;
}

/**
 * Interface for performance issue
 */
export interface PerformanceIssue {
  id: string;
  title: string;
  description: string;
  score: number;
  numericValue: number;
  numericUnit: string;
  displayValue: string;
  details: any;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'accessibility' | 'best-practices' | 'seo' | 'pwa';
}

/**
 * Interface for Lighthouse performance metrics
 */
export interface LighthouseMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
  timeToFirstByte: number;
  firstInputDelay: number;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  pwaScore: number;
}

/**
 * Interface for Lighthouse opportunities
 */
export interface LighthouseOpportunity {
  id: string;
  title: string;
  description: string;
  numericValue: number;
  numericUnit: string;
  displayValue: string;
  score: number;
}

/**
 * Interface for Lighthouse diagnostics
 */
export interface LighthouseDiagnostic {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: string;
  numericValue: number;
  numericUnit: string;
  displayValue: string;
  details: any;
}

/**
 * Interface for Lighthouse audit results
 */
export interface LighthouseAuditResult {
  metrics: LighthouseMetrics;
  opportunities: LighthouseOpportunity[];
  diagnostics: LighthouseDiagnostic[];
  passedAudits: string[];
  failedAudits: string[];
  timestamp: string;
  url: string;
  resources: ResourceDetails[];
  performanceIssues: PerformanceIssue[];
  domStats: {
    totalNodes: number;
    totalElements: number;
    totalTextNodes: number;
    totalScripts: number;
    totalStyles: number;
    totalImages: number;
    totalFonts: number;
    totalThirdParty: number;
  };
  renderBlockingResources: ResourceDetails[];
  unusedResources: ResourceDetails[];
  longTasks: {
    total: number;
    duration: number;
    tasks: Array<{
      startTime: number;
      duration: number;
      name: string;
    }>;
  };
}

/**
 * Service for running Lighthouse audits
 */
export class LighthouseService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    // Use environment variables or configuration for API key
    this.apiKey = this.getApiKey();
    this.apiEndpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  }

  /**
   * Get the API key from environment variables or configuration
   */
  private getApiKey(): string {
    // Try to get API key from various sources
    if (typeof window !== 'undefined' && window._env_?.LIGHTHOUSE_API_KEY) {
      return window._env_.LIGHTHOUSE_API_KEY;
    }
    
    if (import.meta.env && import.meta.env.VITE_LIGHTHOUSE_API_KEY) {
      return import.meta.env.VITE_LIGHTHOUSE_API_KEY;
    }
    
    // Fallback for development
    return 'YOUR_LIGHTHOUSE_API_KEY';
  }

  /**
   * Run a Lighthouse audit for a given URL
   * @param url The URL to audit
   * @param device The device to emulate (mobile or desktop)
   * @returns The audit results
   */
  async runAudit(url: string, device: 'mobile' | 'desktop' = 'mobile'): Promise<LighthouseAuditResult> {
    console.log(`Running Lighthouse audit for ${url} (${device})`);
    
    // Validate URL
    if (!url || !url.startsWith('http')) {
      throw new Error('Invalid URL. URL must start with http:// or https://');
    }
    
    // Check if API key is available
    if (!this.apiKey || this.apiKey === 'YOUR_LIGHTHOUSE_API_KEY') {
      throw new Error('Lighthouse API key is not configured. Please set up your API key in the environment variables.');
    }
    
    try {
      // Use the PageSpeed Insights API instead of running Lighthouse locally
      const response = await fetch(`${this.apiEndpoint}?url=${encodeURIComponent(url)}&key=${this.apiKey}&strategy=${device}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Lighthouse API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the results
      return this.processResults(data, url);
    } catch (error) {
      console.error('Error running Lighthouse audit:', error);
      throw new Error(`Failed to run Lighthouse audit: ${error.message}`);
    }
  }

  /**
   * Process the raw Lighthouse results into a structured format
   * @param results The raw Lighthouse results
   * @param url The URL that was audited
   * @returns The processed audit results
   */
  private processResults(results: any, url: string): LighthouseAuditResult {
    console.log('Raw API response:', results);
    
    // Check if the response has the expected structure
    if (!results.lighthouseResult) {
      console.error('Unexpected API response structure - missing lighthouseResult:', results);
      throw new Error('Invalid API response structure: missing lighthouseResult');
    }
    
    const lighthouseResult = results.lighthouseResult;
    
    // Check if audits exist
    if (!lighthouseResult.audits) {
      console.error('Unexpected API response structure - missing audits:', lighthouseResult);
      throw new Error('Invalid API response structure: missing audits');
    }
    
    const audits = lighthouseResult.audits;
    
    // Check if categories exist
    if (!lighthouseResult.categories) {
      console.error('Unexpected API response structure - missing categories:', lighthouseResult);
      throw new Error('Invalid API response structure: missing categories');
    }
    
    // Safely get category scores with fallbacks
    const getCategoryScore = (categoryName: string): number => {
      try {
        if (lighthouseResult.categories[categoryName] && 
            typeof lighthouseResult.categories[categoryName].score === 'number') {
          return lighthouseResult.categories[categoryName].score * 100;
        }
        console.warn(`Category ${categoryName} score not found or invalid`);
        return 0;
      } catch (error) {
        console.warn(`Error getting ${categoryName} score:`, error);
        return 0;
      }
    };
    
    // Extract metrics
    const metrics: LighthouseMetrics = {
      firstContentfulPaint: this.getMetricValue(audits, 'first-contentful-paint'),
      largestContentfulPaint: this.getMetricValue(audits, 'largest-contentful-paint'),
      totalBlockingTime: this.getMetricValue(audits, 'total-blocking-time'),
      cumulativeLayoutShift: this.getMetricValue(audits, 'cumulative-layout-shift'),
      speedIndex: this.getMetricValue(audits, 'speed-index'),
      timeToFirstByte: this.getMetricValue(audits, 'server-response-time'),
      firstInputDelay: this.getMetricValue(audits, 'first-input-delay'),
      performanceScore: getCategoryScore('performance'),
      accessibilityScore: getCategoryScore('accessibility'),
      bestPracticesScore: getCategoryScore('best-practices'),
      seoScore: getCategoryScore('seo'),
      pwaScore: getCategoryScore('pwa')
    };
    
    // Extract opportunities
    const opportunities: LighthouseOpportunity[] = Object.values(audits)
      .filter((audit: any) => audit && audit.group === 'load-opportunities' && audit.score < 1)
      .map((audit: any) => ({
        id: audit.id || '',
        title: audit.title || '',
        description: audit.description || '',
        numericValue: audit.numericValue || 0,
        numericUnit: audit.numericUnit || '',
        displayValue: audit.displayValue || '',
        score: audit.score || 0
      }));
    
    // Extract diagnostics
    const diagnostics: LighthouseDiagnostic[] = Object.values(audits)
      .filter((audit: any) => audit && audit.group === 'diagnostics')
      .map((audit: any) => ({
        id: audit.id || '',
        title: audit.title || '',
        description: audit.description || '',
        score: audit.score || 0,
        scoreDisplayMode: audit.scoreDisplayMode || '',
        numericValue: audit.numericValue || 0,
        numericUnit: audit.numericUnit || '',
        displayValue: audit.displayValue || '',
        details: audit.details || {}
      }));
    
    // Extract passed and failed audits
    const passedAudits = Object.values(audits)
      .filter((audit: any) => audit && audit.score === 1)
      .map((audit: any) => audit.id || '')
      .filter(id => id !== '');
    
    const failedAudits = Object.values(audits)
      .filter((audit: any) => audit && audit.score < 1)
      .map((audit: any) => audit.id || '')
      .filter(id => id !== '');
    
    // Extract resources
    const resources = this.extractResources(lighthouseResult);
    
    // Extract render blocking resources
    const renderBlockingResources = this.extractRenderBlockingResources(lighthouseResult);
    
    // Extract unused resources
    const unusedResources = this.extractUnusedResources(lighthouseResult);
    
    // Extract performance issues
    const performanceIssues = this.extractPerformanceIssues(audits);
    
    // Extract DOM stats
    const domStats = this.extractDOMStats(lighthouseResult);
    
    // Extract long tasks
    const longTasks = this.extractLongTasks(lighthouseResult);
    
    return {
      metrics,
      opportunities,
      diagnostics,
      passedAudits,
      failedAudits,
      timestamp: new Date().toISOString(),
      url,
      resources,
      renderBlockingResources,
      unusedResources,
      performanceIssues,
      domStats,
      longTasks
    };
  }

  /**
   * Extract resource details from the Lighthouse results
   * @param lighthouseResult The Lighthouse result object
   * @returns Array of resource details
   */
  private extractResources(lighthouseResult: any): ResourceDetails[] {
    try {
      if (!lighthouseResult.audits || !lighthouseResult.audits['resource-summary'] || !lighthouseResult.audits['resource-summary'].details) {
        return [];
      }
      
      const resourceSummary = lighthouseResult.audits['resource-summary'].details;
      if (!resourceSummary.items || !Array.isArray(resourceSummary.items)) {
        return [];
      }
      
      return resourceSummary.items.map((item: any) => ({
        url: item.url || '',
        type: item.resourceType || '',
        size: item.transferSize || 0,
        transferSize: item.transferSize || 0,
        priority: item.priority || 'unknown',
        renderBlocking: item.renderBlocking || false,
        cacheable: item.cacheable || false,
        cacheLifetime: item.cacheLifetime || 0,
        compression: item.compression || false,
        compressionRatio: item.compressionRatio || 0
      }));
    } catch (error) {
      console.warn('Error extracting resources:', error);
      return [];
    }
  }

  /**
   * Extract render blocking resources from the Lighthouse results
   * @param lighthouseResult The Lighthouse result object
   * @returns Array of render blocking resources
   */
  private extractRenderBlockingResources(lighthouseResult: any): ResourceDetails[] {
    try {
      if (!lighthouseResult.audits || !lighthouseResult.audits['render-blocking-resources'] || !lighthouseResult.audits['render-blocking-resources'].details) {
        return [];
      }
      
      const renderBlockingResources = lighthouseResult.audits['render-blocking-resources'].details;
      if (!renderBlockingResources.items || !Array.isArray(renderBlockingResources.items)) {
        return [];
      }
      
      return renderBlockingResources.items.map((item: any) => ({
        url: item.url || '',
        type: item.resourceType || '',
        size: item.size || 0,
        transferSize: item.transferSize || 0,
        priority: item.priority || 'unknown',
        renderBlocking: true,
        cacheable: item.cacheable || false,
        cacheLifetime: item.cacheLifetime || 0,
        compression: item.compression || false,
        compressionRatio: item.compressionRatio || 0
      }));
    } catch (error) {
      console.warn('Error extracting render blocking resources:', error);
      return [];
    }
  }

  /**
   * Extract unused resources from the Lighthouse results
   * @param lighthouseResult The Lighthouse result object
   * @returns Array of unused resources
   */
  private extractUnusedResources(lighthouseResult: any): ResourceDetails[] {
    try {
      if (!lighthouseResult.audits || !lighthouseResult.audits['unused-javascript'] || !lighthouseResult.audits['unused-javascript'].details) {
        return [];
      }
      
      const unusedJavascript = lighthouseResult.audits['unused-javascript'].details;
      if (!unusedJavascript.items || !Array.isArray(unusedJavascript.items)) {
        return [];
      }
      
      return unusedJavascript.items.map((item: any) => ({
        url: item.url || '',
        type: 'javascript',
        size: item.wastedBytes || 0,
        transferSize: item.totalBytes || 0,
        priority: 'unknown',
        renderBlocking: false,
        cacheable: true,
        cacheLifetime: 0,
        compression: false,
        compressionRatio: 0
      }));
    } catch (error) {
      console.warn('Error extracting unused resources:', error);
      return [];
    }
  }

  /**
   * Extract performance issues from the Lighthouse results
   * @param audits The audits object from the Lighthouse results
   * @returns Array of performance issues
   */
  private extractPerformanceIssues(audits: any): PerformanceIssue[] {
    try {
      const performanceAudits = Object.values(audits)
        .filter((audit: any) => 
          audit && 
          audit.group === 'performance' && 
          audit.score < 1 && 
          audit.score !== null
        );
      
      return performanceAudits.map((audit: any) => {
        // Determine impact based on score
        let impact: 'high' | 'medium' | 'low' = 'low';
        if (audit.score < 0.5) {
          impact = 'high';
        } else if (audit.score < 0.8) {
          impact = 'medium';
        }
        
        return {
          id: audit.id || '',
          title: audit.title || '',
          description: audit.description || '',
          score: audit.score || 0,
          numericValue: audit.numericValue || 0,
          numericUnit: audit.numericUnit || '',
          displayValue: audit.displayValue || '',
          details: audit.details || {},
          impact,
          category: 'performance'
        };
      });
    } catch (error) {
      console.warn('Error extracting performance issues:', error);
      return [];
    }
  }

  /**
   * Extract DOM stats from the Lighthouse results
   * @param lighthouseResult The Lighthouse result object
   * @returns DOM stats object
   */
  private extractDOMStats(lighthouseResult: any): {
    totalNodes: number;
    totalElements: number;
    totalTextNodes: number;
    totalScripts: number;
    totalStyles: number;
    totalImages: number;
    totalFonts: number;
    totalThirdParty: number;
  } {
    try {
      if (!lighthouseResult.audits || !lighthouseResult.audits['dom-size'] || !lighthouseResult.audits['dom-size'].details) {
        return {
          totalNodes: 0,
          totalElements: 0,
          totalTextNodes: 0,
          totalScripts: 0,
          totalStyles: 0,
          totalImages: 0,
          totalFonts: 0,
          totalThirdParty: 0
        };
      }
      
      const domSize = lighthouseResult.audits['dom-size'].details;
      if (!domSize.items || !Array.isArray(domSize.items) || domSize.items.length === 0) {
        return {
          totalNodes: 0,
          totalElements: 0,
          totalTextNodes: 0,
          totalScripts: 0,
          totalStyles: 0,
          totalImages: 0,
          totalFonts: 0,
          totalThirdParty: 0
        };
      }
      
      const stats = domSize.items[0];
      
      return {
        totalNodes: stats.statistic || 0,
        totalElements: stats.statistic || 0,
        totalTextNodes: 0, // Not directly available in the API
        totalScripts: 0, // Not directly available in the API
        totalStyles: 0, // Not directly available in the API
        totalImages: 0, // Not directly available in the API
        totalFonts: 0, // Not directly available in the API
        totalThirdParty: 0 // Not directly available in the API
      };
    } catch (error) {
      console.warn('Error extracting DOM stats:', error);
      return {
        totalNodes: 0,
        totalElements: 0,
        totalTextNodes: 0,
        totalScripts: 0,
        totalStyles: 0,
        totalImages: 0,
        totalFonts: 0,
        totalThirdParty: 0
      };
    }
  }

  /**
   * Extract long tasks from the Lighthouse results
   * @param lighthouseResult The Lighthouse result object
   * @returns Long tasks object
   */
  private extractLongTasks(lighthouseResult: any): {
    total: number;
    duration: number;
    tasks: Array<{
      startTime: number;
      duration: number;
      name: string;
    }>;
  } {
    try {
      if (!lighthouseResult.audits || !lighthouseResult.audits['long-tasks'] || !lighthouseResult.audits['long-tasks'].details) {
        return {
          total: 0,
          duration: 0,
          tasks: []
        };
      }
      
      const longTasks = lighthouseResult.audits['long-tasks'].details;
      if (!longTasks.items || !Array.isArray(longTasks.items)) {
        return {
          total: 0,
          duration: 0,
          tasks: []
        };
      }
      
      const tasks = longTasks.items.map((item: any) => ({
        startTime: item.startTime || 0,
        duration: item.duration || 0,
        name: item.name || 'Unknown Task'
      }));
      
      const totalDuration = tasks.reduce((sum: number, task: any) => sum + task.duration, 0);
      
      return {
        total: tasks.length,
        duration: totalDuration,
        tasks
      };
    } catch (error) {
      console.warn('Error extracting long tasks:', error);
      return {
        total: 0,
        duration: 0,
        tasks: []
      };
    }
  }

  /**
   * Get the numeric value of a metric from the Lighthouse results
   * @param audits The audits object from the Lighthouse results
   * @param metricId The ID of the metric
   * @returns The numeric value of the metric
   */
  private getMetricValue(audits: any, metricId: string): number {
    const metric = audits[metricId];
    if (!metric) {
      console.warn(`Metric ${metricId} not found in audit results`);
      return 0;
    }
    
    // Convert to milliseconds if needed
    if (metric.numericUnit === 's') {
      return metric.numericValue * 1000;
    }
    
    return metric.numericValue || 0;
  }

  /**
   * Get the path to the HTML report for a given URL
   * @param url The URL that was audited
   * @returns The path to the HTML report
   */
  getReportPath(url: string): string {
    // In a browser environment, we can't access the file system
    // Instead, we'll return a URL to view the report online
    return `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`;
  }
} 