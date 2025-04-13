
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Search, 
  LoaderCircle, 
  FileEdit, 
  ClipboardList, 
  BarChart,
  ArrowRight,
  CheckCircle2,
  Link,
  PencilLine,
  LayoutPanelTop,
  ListTodo,
  Eye,
  Clock,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Content = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    contentScore: number;
    wordCount: number;
    readability: number;
    uniqueness: number;
    keywordOptimization: number;
    strengths: string[];
    weaknesses: string[];
    contentGaps: string[];
    competitorContent: Array<{
      title: string;
      url: string;
      wordCount: number;
      keyPoints: string[];
    }>;
  }>(null);

  const handleAnalyzeContent = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResults({
        contentScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
        wordCount: Math.floor(Math.random() * 1000) + 500, // 500-1500 range
        readability: Math.floor(Math.random() * 40) + 60, // 60-100 range
        uniqueness: Math.floor(Math.random() * 20) + 80, // 80-100 range
        keywordOptimization: Math.floor(Math.random() * 40) + 60, // 60-100 range
        strengths: [
          "Comprehensive coverage of main topic",
          "Good use of headings and subheadings",
          "Appropriate content length for topic",
          "Natural keyword usage"
        ],
        weaknesses: [
          "Limited use of multimedia elements",
          "Some sections could be more detailed",
          "Missing internal links to related content",
          "Readability could be improved in technical sections"
        ],
        contentGaps: [
          "Comparison with alternatives",
          "Case studies or real-world examples",
          "Beginner-friendly explanations of technical terms",
          "Actionable next steps for readers"
        ],
        competitorContent: [
          {
            title: "Complete Guide to Content Optimization",
            url: "https://competitor-a.com/content-guide",
            wordCount: Math.floor(Math.random() * 500) + 1000,
            keyPoints: [
              "In-depth tutorials with screenshots",
              "Expert interviews",
              "Downloadable templates"
            ]
          },
          {
            title: "10 Strategies for Better Content",
            url: "https://competitor-b.com/content-strategies",
            wordCount: Math.floor(Math.random() * 500) + 800,
            keyPoints: [
              "Case studies with metrics",
              "Comparison tables",
              "Video walkthroughs"
            ]
          }
        ]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Content analysis is ready",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-seo-green";
    if (score >= 65) return "text-seo-yellow";
    return "text-seo-red";
  };

  // Content ideas based on a topic
  const [topic, setTopic] = useState("");
  const [contentIdeas, setContentIdeas] = useState<string[]>([]);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);

  const handleGenerateIdeas = () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic to generate ideas",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingIdeas(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock content ideas
      setContentIdeas([
        `10 Best Practices for ${topic} in 2023`,
        `How to Optimize Your ${topic} Strategy for Better Results`,
        `The Ultimate Beginner's Guide to ${topic}`,
        `${topic} vs. Traditional Methods: A Comprehensive Comparison`,
        `Case Study: How Company X Improved Their ${topic} by 200%`,
        `The Future of ${topic}: Trends and Predictions for 2024`,
        `Common ${topic} Mistakes and How to Avoid Them`,
        `${topic} Tools and Resources Every Professional Should Know`,
        `Step-by-Step ${topic} Implementation Guide`,
        `How to Measure Success in Your ${topic} Efforts`,
        `The History and Evolution of ${topic}`,
        `Expert Roundup: What Industry Leaders Say About ${topic}`
      ]);
      setIsGeneratingIdeas(false);
      
      toast({
        title: "Ideas Generated",
        description: "Content ideas are ready",
      });
    }, 2000);
  };

  // Content calendar
  const contentCalendar = [
    {
      title: "10 SEO Tips for Small Businesses",
      type: "Blog Post",
      status: "Published",
      date: "2023-10-15",
      author: "Jane Smith",
      keywords: ["SEO", "small business", "local SEO"]
    },
    {
      title: "How to Optimize for Voice Search",
      type: "Guide",
      status: "In Progress",
      date: "2023-10-22",
      author: "John Doe",
      keywords: ["voice search", "SEO", "Google Assistant"]
    },
    {
      title: "Core Web Vitals Explained",
      type: "Tutorial",
      status: "Planned",
      date: "2023-10-29",
      author: "Alex Johnson",
      keywords: ["core web vitals", "page speed", "user experience"]
    },
    {
      title: "E-E-A-T and Its Impact on SEO",
      type: "Whitepaper",
      status: "Draft",
      date: "2023-11-05",
      author: "Sarah Williams",
      keywords: ["E-E-A-T", "Google updates", "content quality"]
    },
    {
      title: "Mobile SEO Checklist",
      type: "Checklist",
      status: "Planned",
      date: "2023-11-12",
      author: "Michael Brown",
      keywords: ["mobile SEO", "responsive design", "mobile-first indexing"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-seo-green/10 text-seo-green";
      case "In Progress": return "bg-seo-blue/10 text-seo-blue";
      case "Draft": return "bg-seo-yellow/10 text-seo-yellow";
      case "Planned": return "bg-muted-foreground/10 text-muted-foreground";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Content Manager</h1>
          <p className="text-muted-foreground">
            Analyze, plan, and optimize your content strategy
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="analyzer" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Content Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="ideas" className="flex items-center gap-1">
              <PencilLine className="h-4 w-4" />
              <span className="hidden md:inline">Content Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-1">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden md:inline">Content Calendar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Analyzer</CardTitle>
                <CardDescription>
                  Analyze your content for SEO optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/your-page"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button 
                    onClick={handleAnalyzeContent}
                    disabled={!url || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {analysisResults && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Quality Score</CardTitle>
                      <CardDescription>
                        Overall content quality assessment
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-muted relative">
                          <div className="flex flex-col items-center">
                            <span className={`text-4xl font-bold ${getScoreColor(analysisResults.contentScore)}`}>
                              {analysisResults.contentScore}
                            </span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          <div className="absolute -bottom-4 bg-card px-3 py-1 rounded-full border shadow-sm">
                            <span className={`text-sm font-medium ${getScoreColor(analysisResults.contentScore)}`}>
                              {analysisResults.contentScore >= 85 ? "Excellent" : 
                               analysisResults.contentScore >= 65 ? "Good" : "Needs Work"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Readability</span>
                            <span className="text-sm font-medium">
                              {analysisResults.readability}/100
                            </span>
                          </div>
                          <Progress 
                            value={analysisResults.readability} 
                            className="h-2"
                            indicatorClassName={getScoreColor(analysisResults.readability)}
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Uniqueness</span>
                            <span className="text-sm font-medium">
                              {analysisResults.uniqueness}%
                            </span>
                          </div>
                          <Progress 
                            value={analysisResults.uniqueness} 
                            className="h-2"
                            indicatorClassName={getScoreColor(analysisResults.uniqueness)}
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Keyword Optimization</span>
                            <span className="text-sm font-medium">
                              {analysisResults.keywordOptimization}/100
                            </span>
                          </div>
                          <Progress 
                            value={analysisResults.keywordOptimization} 
                            className="h-2"
                            indicatorClassName={getScoreColor(analysisResults.keywordOptimization)}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Word Count: {analysisResults.wordCount}</span>
                        </div>
                        <Progress 
                          value={Math.min(100, (analysisResults.wordCount / 1500) * 100)} 
                          className="h-2"
                          indicatorClassName={
                            analysisResults.wordCount < 300 ? "bg-seo-red" :
                            analysisResults.wordCount < 600 ? "bg-seo-yellow" :
                            "bg-seo-green"
                          }
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {analysisResults.wordCount < 300 ? "Too short" :
                           analysisResults.wordCount < 600 ? "Could be longer" :
                           analysisResults.wordCount > 2000 ? "Comprehensive" :
                           "Good length"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content SWOT Analysis</CardTitle>
                      <CardDescription>
                        Strengths, weaknesses, and improvement opportunities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-seo-green" />
                            Strengths
                          </h3>
                          <ul className="space-y-1">
                            {analysisResults.strengths.map((strength, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <ArrowRight className="h-3 w-3 flex-shrink-0 mt-1" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                            <FileEdit className="h-4 w-4 text-seo-yellow" />
                            Areas for Improvement
                          </h3>
                          <ul className="space-y-1">
                            {analysisResults.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <ArrowRight className="h-3 w-3 flex-shrink-0 mt-1" />
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                            <Link className="h-4 w-4 text-seo-blue" />
                            Content Gap Opportunities
                          </h3>
                          <ul className="space-y-1">
                            {analysisResults.contentGaps.map((gap, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <ArrowRight className="h-3 w-3 flex-shrink-0 mt-1" />
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Content Analysis</CardTitle>
                    <CardDescription>
                      Top-performing content from competitors on similar topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {analysisResults.competitorContent.map((content, index) => (
                        <div key={index} className={`flex flex-col md:flex-row gap-4 ${index !== analysisResults.competitorContent.length - 1 ? "pb-6 border-b" : ""}`}>
                          <div className="flex-grow space-y-2">
                            <h3 className="font-medium">{content.title}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Link className="h-3 w-3" />
                              <a href={content.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{content.url}</a>
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{content.wordCount} words</Badge>
                            </div>
                            <div className="pt-2">
                              <p className="text-sm font-medium mb-1">Key Content Elements:</p>
                              <ul className="space-y-1">
                                {content.keyPoints.map((point, pointIndex) => (
                                  <li key={pointIndex} className="text-sm flex items-start gap-2">
                                    <CheckCircle2 className="h-3 w-3 flex-shrink-0 mt-1 text-seo-green" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="md:w-1/4 flex md:flex-col md:items-end justify-between md:justify-start gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View Content
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart className="h-3 w-3 mr-1" />
                              Performance
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="ideas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Ideas Generator</CardTitle>
                <CardDescription>
                  Generate ideas for your next content piece
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a topic (e.g., content marketing)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <Button 
                    onClick={handleGenerateIdeas}
                    disabled={!topic || isGeneratingIdeas}
                  >
                    {isGeneratingIdeas ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PencilLine className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>

                {contentIdeas.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <h3 className="font-medium mb-3">Ideas for "{topic}"</h3>
                    <ul className="space-y-2">
                      {contentIdeas.map((idea, index) => (
                        <li key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-start gap-2">
                            <PencilLine className="h-4 w-4 flex-shrink-0 mt-1 text-primary" />
                            <span className="text-sm">{idea}</span>
                          </div>
                          <Button variant="outline" size="sm">Use</Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Formats</CardTitle>
                <CardDescription>
                  Different content types to consider for your strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Blog Posts</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Informative articles that establish thought leadership and target keywords.</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      <Badge variant="outline" className="text-xs">How-to Guides</Badge>
                      <Badge variant="outline" className="text-xs">Listicles</Badge>
                      <Badge variant="outline" className="text-xs">Opinion Pieces</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Long-form Content</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Comprehensive resources that provide deep coverage of complex topics.</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      <Badge variant="outline" className="text-xs">Ultimate Guides</Badge>
                      <Badge variant="outline" className="text-xs">Whitepapers</Badge>
                      <Badge variant="outline" className="text-xs">E-books</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <LayoutPanelTop className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Visual Content</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Engaging visual assets that simplify complex information and drive shares.</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      <Badge variant="outline" className="text-xs">Infographics</Badge>
                      <Badge variant="outline" className="text-xs">Videos</Badge>
                      <Badge variant="outline" className="text-xs">Interactive Tools</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <ListTodo className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Practical Resources</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Actionable tools that provide immediate value and encourage downloads.</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      <Badge variant="outline" className="text-xs">Checklists</Badge>
                      <Badge variant="outline" className="text-xs">Templates</Badge>
                      <Badge variant="outline" className="text-xs">Worksheets</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Data-Driven Content</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Original research and statistics that attract backlinks and establish authority.</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      <Badge variant="outline" className="text-xs">Industry Reports</Badge>
                      <Badge variant="outline" className="text-xs">Case Studies</Badge>
                      <Badge variant="outline" className="text-xs">Surveys</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Expertise Content</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Content featuring industry experts to enhance credibility and E-E-A-T signals.</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      <Badge variant="outline" className="text-xs">Expert Roundups</Badge>
                      <Badge variant="outline" className="text-xs">Interviews</Badge>
                      <Badge variant="outline" className="text-xs">Guest Posts</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>
                    Plan and schedule your upcoming content
                  </CardDescription>
                </div>
                <Button>
                  <FileEdit className="mr-2 h-4 w-4" />
                  New Content
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentCalendar.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 py-3 border-b last:border-0">
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1 md:mt-0">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            <span>Author: {item.author}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.keywords.map((keyword, keywordIndex) => (
                            <Badge key={keywordIndex} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>
                    Metrics from your published content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="text-sm font-medium">10 SEO Tips for Small Businesses</p>
                        <p className="text-xs text-muted-foreground">Published Oct 15, 2023</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <p className="text-sm font-medium">1,245</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="text-sm font-medium">Guide to Local Citation Building</p>
                        <p className="text-xs text-muted-foreground">Published Sep 28, 2023</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <p className="text-sm font-medium">987</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="text-sm font-medium">Understanding Core Web Vitals</p>
                        <p className="text-xs text-muted-foreground">Published Sep 10, 2023</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <p className="text-sm font-medium">756</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Mobile Optimization Best Practices</p>
                        <p className="text-xs text-muted-foreground">Published Aug 22, 2023</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <p className="text-sm font-medium">632</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Strategy Tips</CardTitle>
                  <CardDescription>
                    Best practices for effective content planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Define Your Audience Segments</p>
                        <p className="text-sm text-muted-foreground">Create detailed buyer personas to tailor content to specific audience needs</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Map Content to Funnel Stages</p>
                        <p className="text-sm text-muted-foreground">Create awareness, consideration, and decision-stage content</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Focus on Search Intent</p>
                        <p className="text-sm text-muted-foreground">Align content with informational, navigational, or transactional intent</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Establish Content Pillars</p>
                        <p className="text-sm text-muted-foreground">Create main topic clusters with supporting content pieces</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        5
                      </div>
                      <div>
                        <p className="font-medium">Set Clear KPIs</p>
                        <p className="text-sm text-muted-foreground">Define success metrics for each content piece (traffic, engagement, conversions)</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Content;
