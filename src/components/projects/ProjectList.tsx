import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Badge, 
  BadgeProps 
} from "@/components/ui/badge";
import { 
  Progress 
} from "@/components/ui/progress";
import { 
  Globe, 
  MoreVertical, 
  Download, 
  BarChart2, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  getAllProjectReports, 
  getProjectReportById, 
  getIssuesByProjectId, 
  getKeywordsByProjectId, 
  getBacklinksByProjectId, 
  getTrafficByProjectId, 
  getProjectsSummaryAnalysis, 
  exportProjectData, 
  exportAllProjectsData, 
  generateSummaryReport 
} from '@/services/reportService';
import { format } from 'date-fns';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Checkbox 
} from '@/components/ui/checkbox';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "Example.com",
    url: "https://example.com",
    description: "Main company website",
    seoScore: 87,
    lastAnalyzed: "2023-06-15T10:30:00Z",
    status: "active",
    issues: 12,
    improvements: 8,
    keywords: 156,
    traffic: 14582,
    trafficChange: 12,
    backlinks: 723,
    backlinksChange: 3,
    mobileScore: 92,
    mobileScoreChange: 5,
  },
  {
    id: "2",
    name: "Blog Platform",
    url: "https://blog.example.com",
    description: "Company blog and content hub",
    seoScore: 76,
    lastAnalyzed: "2023-06-14T15:45:00Z",
    status: "active",
    issues: 18,
    improvements: 5,
    keywords: 98,
    traffic: 8234,
    trafficChange: -3,
    backlinks: 432,
    backlinksChange: 8,
    mobileScore: 88,
    mobileScoreChange: 2,
  },
  {
    id: "3",
    name: "E-commerce Store",
    url: "https://shop.example.com",
    description: "Online store for products",
    seoScore: 65,
    lastAnalyzed: "2023-06-13T09:15:00Z",
    status: "needs-attention",
    issues: 24,
    improvements: 3,
    keywords: 245,
    traffic: 21567,
    trafficChange: 15,
    backlinks: 567,
    backlinksChange: 12,
    mobileScore: 78,
    mobileScoreChange: -2,
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = 'bg-gray-500';
  
  if (status === 'active') {
    color = 'bg-green-500';
  } else if (status === 'needs-attention') {
    color = 'bg-red-500';
  } else if (status === 'pending') {
    color = 'bg-yellow-500';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${color}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

// Project card component
const ProjectCard = ({ project }: { project: any }) => {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeSeoData: true,
    includeKeywordData: true,
    includeBacklinkData: false,
    includeMobileData: true,
  });
  
  const handleExport = () => {
    exportProjectData(project.id, exportOptions);
    setShowExportDialog(false);
  };
  
  const issues = getIssuesByProjectId(project.id);
  const keywords = getKeywordsByProjectId(project.id);
  const backlinks = getBacklinksByProjectId(project.id);
  const traffic = getTrafficByProjectId(project.id);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.url}</CardDescription>
          </div>
          <StatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">SEO Score</p>
            <p className="text-2xl font-bold">{project.seoScore}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mobile Score</p>
            <p className="text-2xl font-bold">{project.mobileScore}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Issues</p>
            <p className="text-lg font-semibold">{project.issues}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Keywords</p>
            <p className="text-lg font-semibold">{project.keywords}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Last analyzed: {format(new Date(project.lastAnalyzed), 'MMM d, yyyy')}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">Export</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Project Data</DialogTitle>
              <DialogDescription>
                Select the data you want to export for {project.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="seo-data" 
                  checked={exportOptions.includeSeoData}
                  onCheckedChange={(checked) => 
                    setExportOptions({...exportOptions, includeSeoData: checked as boolean})
                  }
                />
                <label htmlFor="seo-data">SEO Data (Issues, Improvements)</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="keyword-data" 
                  checked={exportOptions.includeKeywordData}
                  onCheckedChange={(checked) => 
                    setExportOptions({...exportOptions, includeKeywordData: checked as boolean})
                  }
                />
                <label htmlFor="keyword-data">Keyword Data</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="backlink-data" 
                  checked={exportOptions.includeBacklinkData}
                  onCheckedChange={(checked) => 
                    setExportOptions({...exportOptions, includeBacklinkData: checked as boolean})
                  }
                />
                <label htmlFor="backlink-data">Backlink Data</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mobile-data" 
                  checked={exportOptions.includeMobileData}
                  onCheckedChange={(checked) => 
                    setExportOptions({...exportOptions, includeMobileData: checked as boolean})
                  }
                />
                <label htmlFor="mobile-data">Mobile Performance Data</label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleExport}>Export</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
          <DialogTrigger asChild>
            <Button>View Analysis</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{project.name} - Analysis</DialogTitle>
              <DialogDescription>
                Detailed analysis for {project.url}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{project.seoScore}</div>
                      <div className="text-sm text-gray-500">out of 100</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Mobile Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{project.mobileScore}</div>
                      <div className="text-sm text-gray-500">out of 100</div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {traffic ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Pageviews</p>
                            <p className="text-xl font-semibold">{traffic.pageviews.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Unique Visitors</p>
                            <p className="text-xl font-semibold">{traffic.uniqueVisitors.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bounce Rate</p>
                            <p className="text-xl font-semibold">{traffic.bounceRate}%</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Top Pages</p>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>URL</TableHead>
                                <TableHead>Pageviews</TableHead>
                                <TableHead>Unique Visitors</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {traffic.topPages.map((page: any, index: number) => (
                                <TableRow key={index}>
                                  <TableCell className="font-mono text-xs">{page.url}</TableCell>
                                  <TableCell>{page.pageviews.toLocaleString()}</TableCell>
                                  <TableCell>{page.uniqueVisitors.toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ) : (
                      <p>No traffic data available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="issues" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Issues</CardTitle>
                    <CardDescription>
                      {issues.length} issues found for this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {issues.map((issue: any) => (
                          <TableRow key={issue.id}>
                            <TableCell>{issue.title}</TableCell>
                            <TableCell>
                              <Badge variant={
                                issue.severity === 'high' ? 'destructive' : 
                                issue.severity === 'medium' ? 'secondary' : 'default'
                              }>
                                {issue.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{issue.category}</TableCell>
                            <TableCell>
                              <Badge variant={
                                issue.status === 'open' ? 'destructive' : 
                                issue.status === 'fixed' ? 'default' : 'secondary'
                              }>
                                {issue.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="keywords" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Keywords</CardTitle>
                    <CardDescription>
                      {keywords.length} keywords tracked for this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Keyword</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead>Search Volume</TableHead>
                          <TableHead>Difficulty</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {keywords.map((keyword: any) => (
                          <TableRow key={keyword.id}>
                            <TableCell>{keyword.keyword}</TableCell>
                            <TableCell>{keyword.position}</TableCell>
                            <TableCell className={keyword.change > 0 ? 'text-green-500' : 'text-red-500'}>
                              {keyword.change > 0 ? '+' : ''}{keyword.change}
                            </TableCell>
                            <TableCell>{keyword.searchVolume.toLocaleString()}</TableCell>
                            <TableCell>{keyword.difficulty}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="backlinks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Backlinks</CardTitle>
                    <CardDescription>
                      {backlinks.length} backlinks found for this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source URL</TableHead>
                          <TableHead>Anchor Text</TableHead>
                          <TableHead>Follow</TableHead>
                          <TableHead>Domain Authority</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backlinks.map((backlink: any) => (
                          <TableRow key={backlink.id}>
                            <TableCell className="font-mono text-xs">{backlink.sourceUrl}</TableCell>
                            <TableCell>{backlink.anchorText}</TableCell>
                            <TableCell>{backlink.follow ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{backlink.domainAuthority}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

// Main project list component
export function ProjectList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeSeoData: true,
    includeKeywordData: true,
    includeBacklinkData: true,
    includeMobileData: true,
    includeComparisonData: true,
  });
  
  const projects = getAllProjectReports();
  const summary = getProjectsSummaryAnalysis();
  const summaryReport = generateSummaryReport();
  
  const handleExportAll = () => {
    exportAllProjectsData(exportOptions);
    setShowExportDialog(false);
  };
  
  const handleCreateProject = () => {
    navigate("/projects/new");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and analyze your SEO projects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            onClick={() => setViewMode("grid")}
          >
            {viewMode === "grid" ? "Table View" : "Grid View"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowExportDialog(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button onClick={handleCreateProject}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>
              View and manage all your SEO projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>SEO Score</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Traffic</TableHead>
                  <TableHead>Last Analyzed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.url}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2">{project.seoScore}</div>
                        <Progress 
                          value={project.seoScore} 
                          className="h-2 w-16"
                          indicatorClassName={
                            project.seoScore >= 80 ? "bg-seo-green" : 
                            project.seoScore >= 60 ? "bg-seo-yellow" : "bg-seo-red"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>{project.issues}</TableCell>
                    <TableCell>{project.keywords}</TableCell>
                    <TableCell>
                      <div>{project.traffic.toLocaleString()}</div>
                      <div className={cn(
                        "text-xs",
                        project.trafficChange >= 0 ? "text-seo-green" : "text-seo-red"
                      )}>
                        {project.trafficChange >= 0 ? "+" : ""}{project.trafficChange}%
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(project.lastAnalyzed).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={project.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        View
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Export All Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export All Projects</DialogTitle>
            <DialogDescription>
              Choose what data you want to export for all projects
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="all-seo-data" defaultChecked />
              <label htmlFor="all-seo-data">SEO Performance Data</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="all-keyword-data" defaultChecked />
              <label htmlFor="all-keyword-data">Keyword Rankings</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="all-backlink-data" defaultChecked />
              <label htmlFor="all-backlink-data">Backlink Data</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="all-mobile-data" defaultChecked />
              <label htmlFor="all-mobile-data">Mobile Performance</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="all-comparison-data" defaultChecked />
              <label htmlFor="all-comparison-data">Project Comparison Data</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportAll}>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Analysis Dialog */}
      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Projects Summary Analysis</DialogTitle>
            <DialogDescription>
              Overview of all projects performance
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{summary.totalProjects}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Average SEO Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{summary.avgSeoScore}</div>
                    <div className="text-sm text-gray-500">out of 100</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Total Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{summary.totalIssues}</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>SEO Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summary.topPerformingProjects.map((project: any) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.name}</TableCell>
                          <TableCell>{project.seoScore}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Projects Needing Attention</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>SEO Score</TableHead>
                        <TableHead>Issues</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summary.projectsNeedingAttention.map((project: any) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.name}</TableCell>
                          <TableCell>{project.seoScore}</TableCell>
                          <TableCell>{project.issues}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {summaryReport.recommendations.map((recommendation: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{recommendation.title}</h3>
                          <Badge variant={
                            recommendation.impact === 'high' ? 'destructive' : 
                            recommendation.impact === 'medium' ? 'secondary' : 'default'
                          }>
                            {recommendation.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{recommendation.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Score Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={projects.map(project => ({
                          name: project.name,
                          score: project.seoScore,
                        }))}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Issues Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={projects.map(project => ({
                          name: project.name,
                          issues: project.issues,
                        }))}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="issues" fill="#ff7300" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Issues by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.entries(summary.issuesByCategory).map(([category, count]) => ({
                          name: category,
                          count: count,
                        }))}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSummaryDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowSummaryDialog(false);
              navigate("/reports");
            }}>
              View Full Reports
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 