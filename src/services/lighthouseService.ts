
// Define the interface for metrics
export interface LighthouseMetrics {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToFirstByte: number;
  firstContentfulPaint: number;
  speedIndex: number;
  totalBlockingTime: number;
}

// Define the interface for resources
export interface LighthouseResource {
  url: string;
  type: string;
  size: string;
  renderBlocking: boolean;
}

// Define the interface for opportunities
export interface LighthouseOpportunity {
  title: string;
  description: string;
  score: number;
  displayValue?: string;
}

// Define the interface for diagnostics
export interface LighthouseDiagnostic {
  title: string;
  description: string;
  score: number;
  displayValue?: string;
}

// Define the interface for performance issues
export interface LighthousePerformanceIssue {
  title: string;
  description: string;
  impact: string;
  details?: any;
}

// Define the interface for DOM stats
export interface LighthouseDOMStats {
  totalElements: number;
  totalNodes: number;
  totalImages: number;
  totalScripts: number;
}

// Define the interface for long tasks
export interface LighthouseLongTasks {
  total: number;
  tasks: {
    name: string;
    duration: number;
  }[];
}

// Define the interface for audit result
export interface LighthouseAuditResult {
  url: string;
  device: 'mobile' | 'desktop';
  timestamp: string;
  metrics: LighthouseMetrics;
  resources: LighthouseResource[];
  renderBlockingResources: LighthouseResource[];
  unusedResources: LighthouseResource[];
  diagnostics: LighthouseDiagnostic[];
  opportunities: LighthouseOpportunity[];
  passedAudits: string[];
  performanceIssues: LighthousePerformanceIssue[];
  domStats: LighthouseDOMStats;
  longTasks: LighthouseLongTasks;
}

export class LighthouseService {
  async analyze(url: string): Promise<any> {
    // This is a mock implementation
    // In a real app, this would connect to Google Lighthouse API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          performance: Math.floor(Math.random() * 100),
          accessibility: Math.floor(Math.random() * 100),
          bestPractices: Math.floor(Math.random() * 100),
          seo: Math.floor(Math.random() * 100),
          pwa: Math.floor(Math.random() * 100)
        });
      }, 1000);
    });
  }

  async runAudit(url: string, device: 'mobile' | 'desktop'): Promise<LighthouseAuditResult> {
    // This is a mock implementation that returns simulated lighthouse data
    return new Promise((resolve) => {
      setTimeout(() => {
        const result: LighthouseAuditResult = {
          url,
          device,
          timestamp: new Date().toISOString(),
          metrics: {
            performanceScore: Math.floor(Math.random() * 30) + 70,
            accessibilityScore: Math.floor(Math.random() * 20) + 80,
            bestPracticesScore: Math.floor(Math.random() * 25) + 75,
            seoScore: Math.floor(Math.random() * 20) + 80,
            largestContentfulPaint: Math.floor(Math.random() * 1500) + 1000,
            firstInputDelay: Math.floor(Math.random() * 80) + 20,
            cumulativeLayoutShift: Math.random() * 0.1,
            timeToFirstByte: Math.floor(Math.random() * 400) + 200,
            firstContentfulPaint: Math.floor(Math.random() * 1000) + 800,
            speedIndex: Math.floor(Math.random() * 2000) + 1500,
            totalBlockingTime: Math.floor(Math.random() * 150) + 50
          },
          resources: this.generateMockResources(10),
          renderBlockingResources: this.generateMockResources(3, true),
          unusedResources: this.generateMockResources(4, false, true),
          diagnostics: this.generateMockDiagnostics(5),
          opportunities: this.generateMockOpportunities(5),
          passedAudits: [
            "Uses HTTPS",
            "Avoids document.write()",
            "Links have descriptive text",
            "Page has correct doctype",
            "Properly sized images",
            "Avoids deprecated APIs",
            "Document has a meta description",
            "Page has successful HTTP status code",
            "Document has a valid hreflang",
            "Document has a valid rel=canonical"
          ],
          performanceIssues: this.generateMockPerformanceIssues(5),
          domStats: {
            totalElements: Math.floor(Math.random() * 500) + 100,
            totalNodes: Math.floor(Math.random() * 1000) + 200,
            totalImages: Math.floor(Math.random() * 30) + 5,
            totalScripts: Math.floor(Math.random() * 20) + 5
          },
          longTasks: {
            total: Math.floor(Math.random() * 5) + 1,
            tasks: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
              name: `Task ${i + 1}`,
              duration: Math.floor(Math.random() * 300) + 100
            }))
          }
        };
        resolve(result);
      }, 1500);
    });
  }

  getReportPath(url: string): string {
    // In a real implementation, this would return the path to a generated report
    // For now, we'll just return a mock URL
    return `https://lighthouse-report.example.com?url=${encodeURIComponent(url)}&timestamp=${Date.now()}`;
  }

  private generateMockResources(count: number, renderBlocking: boolean = false, unused: boolean = false): LighthouseResource[] {
    const resourceTypes = ['script', 'stylesheet', 'image', 'font', 'other'];
    return Array.from({ length: count }, (_, i) => ({
      url: `https://example.com/resource-${i + 1}.${resourceTypes[i % resourceTypes.length] === 'stylesheet' ? 'css' : resourceTypes[i % resourceTypes.length] === 'script' ? 'js' : 'png'}`,
      type: resourceTypes[i % resourceTypes.length],
      size: `${Math.floor(Math.random() * 1000)}KB`,
      renderBlocking: renderBlocking
    }));
  }

  private generateMockDiagnostics(count: number): LighthouseDiagnostic[] {
    const titles = [
      'Uses inefficient cache policy on static assets',
      'Serve static assets with efficient cache policy',
      'Avoid enormous network payloads',
      'Minimize main-thread work',
      'Reduce JavaScript execution time',
      'Avoid large layout shifts',
      'Avoid long main-thread tasks',
      'Minimize third-party usage',
      'Reduce the impact of third-party code'
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      title: titles[i % titles.length],
      description: `This is a mock description for the diagnostic '${titles[i % titles.length]}'.`,
      score: Math.random(),
      displayValue: Math.random() > 0.5 ? `${Math.floor(Math.random() * 1000)}ms` : undefined
    }));
  }

  private generateMockOpportunities(count: number): LighthouseOpportunity[] {
    const titles = [
      'Eliminate render-blocking resources',
      'Properly size images',
      'Defer offscreen images',
      'Minify JavaScript',
      'Preconnect to required origins',
      'Reduce unused JavaScript',
      'Efficiently encode images',
      'Serve images in next-gen formats',
      'Enable text compression'
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      title: titles[i % titles.length],
      description: `This is a mock description for the opportunity '${titles[i % titles.length]}'.`,
      score: Math.random(),
      displayValue: Math.random() > 0.5 ? `Potential savings of ${Math.floor(Math.random() * 1000)}KB` : undefined
    }));
  }

  private generateMockPerformanceIssues(count: number): LighthousePerformanceIssue[] {
    const titles = [
      'Reduce JavaScript execution time',
      'Minimize main-thread work',
      'Reduce the impact of third-party code',
      'Avoid enormous network payloads',
      'Keep request counts low and transfer sizes small',
      'Largest Contentful Paint element',
      'Avoid large layout shifts',
      'Avoid long main-thread tasks'
    ];
    
    const impacts = ['high', 'medium', 'low'];
    
    return Array.from({ length: count }, (_, i) => ({
      title: titles[i % titles.length],
      description: `This is a mock description for the performance issue '${titles[i % titles.length]}'.`,
      impact: impacts[i % impacts.length],
      details: {
        value: Math.floor(Math.random() * 1000)
      }
    }));
  }
}
