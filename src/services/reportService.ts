import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Types for report data
export interface ProjectReport {
  id: string;
  name: string;
  url: string;
  seoScore: number;
  mobileScore: number;
  issues: number;
  improvements: number;
  keywords: number;
  traffic: number;
  trafficChange: number;
  backlinks: number;
  backlinksChange: number;
  lastAnalyzed: string;
  status: string;
  mobileScoreChange?: number;
}

export interface IssueReport {
  id: string;
  projectId: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  status: 'open' | 'fixed' | 'ignored';
  createdAt: string;
  fixedAt?: string;
}

export interface KeywordReport {
  id: string;
  projectId: string;
  keyword: string;
  position: number;
  previousPosition: number;
  change: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  lastUpdated: string;
}

export interface BacklinkReport {
  id: string;
  projectId: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  follow: boolean;
  firstSeen: string;
  lastSeen: string;
  domainAuthority: number;
}

export interface TrafficReport {
  id: string;
  projectId: string;
  date: string;
  pageviews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTimeOnSite: number;
  topPages: Array<{
    url: string;
    pageviews: number;
    uniqueVisitors: number;
  }>;
}

// Mock data for reports
const mockProjectReports: ProjectReport[] = [
  {
    id: "1",
    name: "Example.com",
    url: "https://example.com",
    seoScore: 87,
    mobileScore: 92,
    issues: 12,
    improvements: 8,
    keywords: 156,
    traffic: 14582,
    trafficChange: 12,
    backlinks: 723,
    backlinksChange: 3,
    lastAnalyzed: "2023-06-15T10:30:00Z",
    status: "active",
    mobileScoreChange: 5,
  },
  {
    id: "2",
    name: "Blog Platform",
    url: "https://blog.example.com",
    seoScore: 76,
    mobileScore: 88,
    issues: 18,
    improvements: 5,
    keywords: 98,
    traffic: 8234,
    trafficChange: -3,
    backlinks: 432,
    backlinksChange: 8,
    lastAnalyzed: "2023-06-14T15:45:00Z",
    status: "active",
    mobileScoreChange: 3,
  },
  {
    id: "3",
    name: "E-commerce Store",
    url: "https://shop.example.com",
    seoScore: 65,
    mobileScore: 78,
    issues: 24,
    improvements: 3,
    keywords: 245,
    traffic: 21567,
    trafficChange: 15,
    backlinks: 567,
    backlinksChange: 12,
    lastAnalyzed: "2023-06-13T09:15:00Z",
    status: "needs-attention",
    mobileScoreChange: 2,
  },
];

const mockIssueReports: IssueReport[] = [
  {
    id: "1",
    projectId: "1",
    title: "Missing Meta Description",
    description: "The homepage is missing a meta description, which is important for SEO.",
    severity: "high",
    category: "meta-tags",
    status: "open",
    createdAt: "2023-06-10T08:30:00Z",
  },
  {
    id: "2",
    projectId: "1",
    title: "Slow Page Load Time",
    description: "The homepage takes more than 3 seconds to load, which can negatively impact user experience and SEO.",
    severity: "medium",
    category: "performance",
    status: "open",
    createdAt: "2023-06-10T08:30:00Z",
  },
  {
    id: "3",
    projectId: "2",
    title: "Broken Internal Links",
    description: "There are 5 broken internal links on the blog platform.",
    severity: "high",
    category: "links",
    status: "open",
    createdAt: "2023-06-11T10:15:00Z",
  },
];

const mockKeywordReports: KeywordReport[] = [
  {
    id: "1",
    projectId: "1",
    keyword: "example product",
    position: 3,
    previousPosition: 5,
    change: 2,
    searchVolume: 1200,
    difficulty: 45,
    url: "https://example.com/products",
    lastUpdated: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    projectId: "1",
    keyword: "best example service",
    position: 8,
    previousPosition: 12,
    change: 4,
    searchVolume: 800,
    difficulty: 62,
    url: "https://example.com/services",
    lastUpdated: "2023-06-15T10:30:00Z",
  },
  {
    id: "3",
    projectId: "2",
    keyword: "blog tips",
    position: 15,
    previousPosition: 18,
    change: 3,
    searchVolume: 1500,
    difficulty: 58,
    url: "https://blog.example.com/tips",
    lastUpdated: "2023-06-14T15:45:00Z",
  },
];

const mockBacklinkReports: BacklinkReport[] = [
  {
    id: "1",
    projectId: "1",
    sourceUrl: "https://referrer1.com",
    targetUrl: "https://example.com",
    anchorText: "Example Company",
    follow: true,
    firstSeen: "2023-01-15T00:00:00Z",
    lastSeen: "2023-06-15T00:00:00Z",
    domainAuthority: 45,
  },
  {
    id: "2",
    projectId: "1",
    sourceUrl: "https://referrer2.com",
    targetUrl: "https://example.com/products",
    anchorText: "check out these products",
    follow: true,
    firstSeen: "2023-03-20T00:00:00Z",
    lastSeen: "2023-06-15T00:00:00Z",
    domainAuthority: 32,
  },
  {
    id: "3",
    projectId: "2",
    sourceUrl: "https://referrer3.com",
    targetUrl: "https://blog.example.com",
    anchorText: "blog platform",
    follow: true,
    firstSeen: "2023-02-10T00:00:00Z",
    lastSeen: "2023-06-14T00:00:00Z",
    domainAuthority: 28,
  },
];

const mockTrafficReports: TrafficReport[] = [
  {
    id: "1",
    projectId: "1",
    date: "2023-06-15",
    pageviews: 14582,
    uniqueVisitors: 9876,
    bounceRate: 42,
    avgTimeOnSite: 185,
    topPages: [
      {
        url: "https://example.com",
        pageviews: 5234,
        uniqueVisitors: 4123,
      },
      {
        url: "https://example.com/products",
        pageviews: 3456,
        uniqueVisitors: 2876,
      },
      {
        url: "https://example.com/about",
        pageviews: 1234,
        uniqueVisitors: 987,
      },
    ],
  },
  {
    id: "2",
    projectId: "2",
    date: "2023-06-14",
    pageviews: 8234,
    uniqueVisitors: 5678,
    bounceRate: 48,
    avgTimeOnSite: 165,
    topPages: [
      {
        url: "https://blog.example.com",
        pageviews: 3456,
        uniqueVisitors: 2345,
      },
      {
        url: "https://blog.example.com/post1",
        pageviews: 1234,
        uniqueVisitors: 987,
      },
      {
        url: "https://blog.example.com/post2",
        pageviews: 876,
        uniqueVisitors: 654,
      },
    ],
  },
];

// Service functions

/**
 * Get all project reports
 */
export function getAllProjectReports(): ProjectReport[] {
  return mockProjectReports;
}

/**
 * Get project report by ID
 */
export function getProjectReportById(id: string): ProjectReport | undefined {
  return mockProjectReports.find(report => report.id === id);
}

/**
 * Get issues for a specific project
 */
export function getIssuesByProjectId(projectId: string): IssueReport[] {
  return mockIssueReports.filter(issue => issue.projectId === projectId);
}

/**
 * Get keywords for a specific project
 */
export function getKeywordsByProjectId(projectId: string): KeywordReport[] {
  return mockKeywordReports.filter(keyword => keyword.projectId === projectId);
}

/**
 * Get backlinks for a specific project
 */
export function getBacklinksByProjectId(projectId: string): BacklinkReport[] {
  return mockBacklinkReports.filter(backlink => backlink.projectId === projectId);
}

/**
 * Get traffic data for a specific project
 */
export function getTrafficByProjectId(projectId: string): TrafficReport | undefined {
  return mockTrafficReports.find(traffic => traffic.projectId === projectId);
}

/**
 * Get summary analysis for all projects
 */
export function getProjectsSummaryAnalysis() {
  const totalProjects = mockProjectReports.length;
  const avgSeoScore = Math.round(
    mockProjectReports.reduce((acc, project) => acc + project.seoScore, 0) / totalProjects
  );
  const totalIssues = mockProjectReports.reduce((acc, project) => acc + project.issues, 0);
  const totalKeywords = mockProjectReports.reduce((acc, project) => acc + project.keywords, 0);
  const totalTraffic = mockProjectReports.reduce((acc, project) => acc + project.traffic, 0);
  const totalBacklinks = mockProjectReports.reduce((acc, project) => acc + project.backlinks, 0);
  
  const topPerformingProjects = [...mockProjectReports]
    .sort((a, b) => b.seoScore - a.seoScore)
    .slice(0, 3);
  
  const projectsNeedingAttention = mockProjectReports.filter(
    project => project.status === "needs-attention"
  );
  
  const issuesByCategory = mockIssueReports.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalProjects,
    avgSeoScore,
    totalIssues,
    totalKeywords,
    totalTraffic,
    totalBacklinks,
    topPerformingProjects,
    projectsNeedingAttention,
    issuesByCategory,
  };
}

/**
 * Export project data to Excel
 */
export function exportProjectData(projectId: string, options: {
  includeSeoData?: boolean;
  includeKeywordData?: boolean;
  includeBacklinkData?: boolean;
  includeMobileData?: boolean;
}) {
  const project = getProjectReportById(projectId);
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found`);
  }
  
  const workbook = XLSX.utils.book_new();
  
  // Project overview sheet
  const projectData = [
    ["Project Overview"],
    ["Name", project.name],
    ["URL", project.url],
    ["SEO Score", project.seoScore],
    ["Mobile Score", project.mobileScore],
    ["Issues", project.issues],
    ["Improvements", project.improvements],
    ["Keywords", project.keywords],
    ["Traffic", project.traffic],
    ["Traffic Change", `${project.trafficChange}%`],
    ["Backlinks", project.backlinks],
    ["Backlinks Change", `${project.backlinksChange}%`],
    ["Last Analyzed", new Date(project.lastAnalyzed).toLocaleString()],
    ["Status", project.status],
  ];
  
  const projectSheet = XLSX.utils.aoa_to_sheet(projectData);
  XLSX.utils.book_append_sheet(workbook, projectSheet, "Project Overview");
  
  // Issues sheet
  if (options.includeSeoData) {
    const issues = getIssuesByProjectId(projectId);
    const issuesData = [
      ["Issues"],
      ["ID", "Title", "Description", "Severity", "Category", "Status", "Created At", "Fixed At"],
      ...issues.map(issue => [
        issue.id,
        issue.title,
        issue.description,
        issue.severity,
        issue.category,
        issue.status,
        new Date(issue.createdAt).toLocaleString(),
        issue.fixedAt ? new Date(issue.fixedAt).toLocaleString() : "",
      ]),
    ];
    
    const issuesSheet = XLSX.utils.aoa_to_sheet(issuesData);
    XLSX.utils.book_append_sheet(workbook, issuesSheet, "Issues");
  }
  
  // Keywords sheet
  if (options.includeKeywordData) {
    const keywords = getKeywordsByProjectId(projectId);
    const keywordsData = [
      ["Keywords"],
      ["ID", "Keyword", "Position", "Previous Position", "Change", "Search Volume", "Difficulty", "URL", "Last Updated"],
      ...keywords.map(keyword => [
        keyword.id,
        keyword.keyword,
        keyword.position,
        keyword.previousPosition,
        keyword.change,
        keyword.searchVolume,
        keyword.difficulty,
        keyword.url,
        new Date(keyword.lastUpdated).toLocaleString(),
      ]),
    ];
    
    const keywordsSheet = XLSX.utils.aoa_to_sheet(keywordsData);
    XLSX.utils.book_append_sheet(workbook, keywordsSheet, "Keywords");
  }
  
  // Backlinks sheet
  if (options.includeBacklinkData) {
    const backlinks = getBacklinksByProjectId(projectId);
    const backlinksData = [
      ["Backlinks"],
      ["ID", "Source URL", "Target URL", "Anchor Text", "Follow", "First Seen", "Last Seen", "Domain Authority"],
      ...backlinks.map(backlink => [
        backlink.id,
        backlink.sourceUrl,
        backlink.targetUrl,
        backlink.anchorText,
        backlink.follow ? "Yes" : "No",
        new Date(backlink.firstSeen).toLocaleString(),
        new Date(backlink.lastSeen).toLocaleString(),
        backlink.domainAuthority,
      ]),
    ];
    
    const backlinksSheet = XLSX.utils.aoa_to_sheet(backlinksData);
    XLSX.utils.book_append_sheet(workbook, backlinksSheet, "Backlinks");
  }
  
  // Mobile data sheet
  if (options.includeMobileData) {
    const mobileData = [
      ["Mobile Performance"],
      ["Mobile Score", project.mobileScore],
      ["Mobile Score Change", project.mobileScoreChange ? `${project.mobileScoreChange}%` : "N/A"],
    ];
    
    const mobileSheet = XLSX.utils.aoa_to_sheet(mobileData);
    XLSX.utils.book_append_sheet(workbook, mobileSheet, "Mobile Performance");
  }
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Save file
  saveAs(data, `${project.name.replace(/\s+/g, '_')}_report.xlsx`);
  
  return true;
}

/**
 * Export all projects data to Excel
 */
export function exportAllProjectsData(options: {
  includeSeoData?: boolean;
  includeKeywordData?: boolean;
  includeBacklinkData?: boolean;
  includeMobileData?: boolean;
  includeComparisonData?: boolean;
}) {
  const workbook = XLSX.utils.book_new();
  
  // Projects overview sheet
  const projectsData = [
    ["Projects Overview"],
    ["ID", "Name", "URL", "SEO Score", "Mobile Score", "Issues", "Improvements", "Keywords", "Traffic", "Traffic Change", "Backlinks", "Backlinks Change", "Last Analyzed", "Status"],
    ...mockProjectReports.map(project => [
      project.id,
      project.name,
      project.url,
      project.seoScore,
      project.mobileScore,
      project.issues,
      project.improvements,
      project.keywords,
      project.traffic,
      `${project.trafficChange}%`,
      project.backlinks,
      `${project.backlinksChange}%`,
      new Date(project.lastAnalyzed).toLocaleString(),
      project.status,
    ]),
  ];
  
  const projectsSheet = XLSX.utils.aoa_to_sheet(projectsData);
  XLSX.utils.book_append_sheet(workbook, projectsSheet, "Projects Overview");
  
  // Issues sheet
  if (options.includeSeoData) {
    const issuesData = [
      ["All Issues"],
      ["ID", "Project ID", "Title", "Description", "Severity", "Category", "Status", "Created At", "Fixed At"],
      ...mockIssueReports.map(issue => [
        issue.id,
        issue.projectId,
        issue.title,
        issue.description,
        issue.severity,
        issue.category,
        issue.status,
        new Date(issue.createdAt).toLocaleString(),
        issue.fixedAt ? new Date(issue.fixedAt).toLocaleString() : "",
      ]),
    ];
    
    const issuesSheet = XLSX.utils.aoa_to_sheet(issuesData);
    XLSX.utils.book_append_sheet(workbook, issuesSheet, "All Issues");
  }
  
  // Keywords sheet
  if (options.includeKeywordData) {
    const keywordsData = [
      ["All Keywords"],
      ["ID", "Project ID", "Keyword", "Position", "Previous Position", "Change", "Search Volume", "Difficulty", "URL", "Last Updated"],
      ...mockKeywordReports.map(keyword => [
        keyword.id,
        keyword.projectId,
        keyword.keyword,
        keyword.position,
        keyword.previousPosition,
        keyword.change,
        keyword.searchVolume,
        keyword.difficulty,
        keyword.url,
        new Date(keyword.lastUpdated).toLocaleString(),
      ]),
    ];
    
    const keywordsSheet = XLSX.utils.aoa_to_sheet(keywordsData);
    XLSX.utils.book_append_sheet(workbook, keywordsSheet, "All Keywords");
  }
  
  // Backlinks sheet
  if (options.includeBacklinkData) {
    const backlinksData = [
      ["All Backlinks"],
      ["ID", "Project ID", "Source URL", "Target URL", "Anchor Text", "Follow", "First Seen", "Last Seen", "Domain Authority"],
      ...mockBacklinkReports.map(backlink => [
        backlink.id,
        backlink.projectId,
        backlink.sourceUrl,
        backlink.targetUrl,
        backlink.anchorText,
        backlink.follow ? "Yes" : "No",
        new Date(backlink.firstSeen).toLocaleString(),
        new Date(backlink.lastSeen).toLocaleString(),
        backlink.domainAuthority,
      ]),
    ];
    
    const backlinksSheet = XLSX.utils.aoa_to_sheet(backlinksData);
    XLSX.utils.book_append_sheet(workbook, backlinksSheet, "All Backlinks");
  }
  
  // Mobile data sheet
  if (options.includeMobileData) {
    const mobileData = [
      ["Mobile Performance"],
      ["Project ID", "Project Name", "Mobile Score", "Mobile Score Change"],
      ...mockProjectReports.map(project => [
        project.id,
        project.name,
        project.mobileScore,
        project.mobileScoreChange ? `${project.mobileScoreChange}%` : "N/A",
      ]),
    ];
    
    const mobileSheet = XLSX.utils.aoa_to_sheet(mobileData);
    XLSX.utils.book_append_sheet(workbook, mobileSheet, "Mobile Performance");
  }
  
  // Comparison data sheet
  if (options.includeComparisonData) {
    const comparisonData = [
      ["Projects Comparison"],
      ["Metric", ...mockProjectReports.map(project => project.name)],
      ["SEO Score", ...mockProjectReports.map(project => project.seoScore)],
      ["Mobile Score", ...mockProjectReports.map(project => project.mobileScore)],
      ["Issues", ...mockProjectReports.map(project => project.issues)],
      ["Keywords", ...mockProjectReports.map(project => project.keywords)],
      ["Traffic", ...mockProjectReports.map(project => project.traffic)],
      ["Traffic Change", ...mockProjectReports.map(project => `${project.trafficChange}%`)],
      ["Backlinks", ...mockProjectReports.map(project => project.backlinks)],
      ["Backlinks Change", ...mockProjectReports.map(project => `${project.backlinksChange}%`)],
    ];
    
    const comparisonSheet = XLSX.utils.aoa_to_sheet(comparisonData);
    XLSX.utils.book_append_sheet(workbook, comparisonSheet, "Projects Comparison");
  }
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Save file
  saveAs(data, `all_projects_report.xlsx`);
  
  return true;
}

/**
 * Generate a summary report for all projects
 */
export function generateSummaryReport() {
  const summary = getProjectsSummaryAnalysis();
  
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalProjects: summary.totalProjects,
      avgSeoScore: summary.avgSeoScore,
      totalIssues: summary.totalIssues,
      totalKeywords: summary.totalKeywords,
      totalTraffic: summary.totalTraffic,
      totalBacklinks: summary.totalBacklinks,
    },
    topPerformingProjects: summary.topPerformingProjects.map(project => ({
      id: project.id,
      name: project.name,
      seoScore: project.seoScore,
    })),
    projectsNeedingAttention: summary.projectsNeedingAttention.map(project => ({
      id: project.id,
      name: project.name,
      seoScore: project.seoScore,
      issues: project.issues,
    })),
    issuesByCategory: summary.issuesByCategory,
    recommendations: [
      {
        title: "Improve Meta Tags",
        description: "Add missing meta descriptions to improve click-through rates from search results.",
        impact: "high",
        affectedProjects: summary.projectsNeedingAttention.map(project => project.id),
      },
      {
        title: "Optimize Page Speed",
        description: "Improve page load times to enhance user experience and SEO performance.",
        impact: "medium",
        affectedProjects: summary.projectsNeedingAttention.map(project => project.id),
      },
      {
        title: "Enhance Mobile Experience",
        description: "Ensure all pages are fully responsive and provide a good mobile experience.",
        impact: "high",
        affectedProjects: summary.projectsNeedingAttention.map(project => project.id),
      },
    ],
  };
  
  return report;
}
