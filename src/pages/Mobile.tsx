
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Smartphone, 
  Search, 
  LoaderCircle, 
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  MousePointer,
  LayoutGrid,
  ImageUp,
  Fingerprint,
  ArrowRight,
  Code,
  AlignJustify,
  GanttChartSquare,
  Layers
} from "lucide-react";

const Mobile = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    mobileScore: number;
    loadingSpeed: number;
    touchElements: number;
    viewportConfiguration: boolean;
    contentScaling: boolean;
    fontLegibility: boolean;
    tapTargets: boolean;
    responsiveImages: boolean;
    issues: Array<{
      category: string;
      severity: "high" | "medium" | "low";
      description: string;
      recommendation: string;
    }>;
  }>(null);

  const handleAnalyzeMobile = () => {
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
        mobileScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
        loadingSpeed: Math.floor(Math.random() * 3) + 2, // 2-5 seconds
        touchElements: Math.floor(Math.random() * 30) + 70, // 70-100 optimization
        viewportConfiguration: Math.random() > 0.3,
        contentScaling: Math.random() > 0.4,
        fontLegibility: Math.random() > 0.5,
        tapTargets: Math.random() > 0.6,
        responsiveImages: Math.random() > 0.7,
        issues: [
          {
            category: "Performance",
            severity: "high",
            description: "JavaScript resources are blocking the first paint of your page",
            recommendation: "Use async or defer attributes on script tags and minify JavaScript files"
          },
          {
            category: "Usability",
            severity: "medium",
            description: "Tap targets are too small or too close together",
            recommendation: "Make sure buttons and links are at least 48px by 48px and have ample space between them"
          },
          {
            category: "Content",
            severity: "low",
            description: "Text is too small to read on mobile devices",
            recommendation: "Use a minimum font size of 16px for body text"
          },
          {
            category: "Performance",
            severity: "medium",
            description: "Images are not properly sized for mobile",
            recommendation: "Use responsive images with srcset and appropriately sized images for mobile"
          },
          {
            category: "Technical",
            severity: "low",
            description: "Missing alt text on some images",
            recommendation: "Add descriptive alt text to all images for accessibility"
          },
        ]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Mobile optimization analysis is ready",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-seo-green";
    if (score >= 65) return "text-seo-yellow";
    return "text-seo-red";
  };

  const getStatusIcon = (status: boolean) => (
    status ? 
      <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0" /> : 
      <XCircle className="h-5 w-5 text-seo-red flex-shrink-0" />
  );

  const getSeverityColor = (severity: string) => {
    if (severity === "low") return "text-seo-green";
    if (severity === "medium") return "text-seo-yellow";
    return "text-seo-red";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Mobile Optimization</h1>
          <p className="text-muted-foreground">
            Analyze and improve your website's mobile experience
          </p>
        </div>

        <Alert className="bg-muted/50 border-seo-blue">
          <Smartphone className="h-4 w-4 text-seo-blue" />
          <AlertTitle>Mobile-First Indexing</AlertTitle>
          <AlertDescription>
            Google primarily uses the mobile version of a site for indexing and ranking. Optimizing for mobile is essential for SEO success.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Mobile Analyzer</CardTitle>
            <CardDescription>
              Enter your website URL to analyze mobile optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button 
                onClick={handleAnalyzeMobile}
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
                  <CardTitle>Mobile Optimization Score</CardTitle>
                  <CardDescription>
                    Overall mobile-friendliness rating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-muted relative">
                      <div className="flex flex-col items-center">
                        <span className={`text-4xl font-bold ${getScoreColor(analysisResults.mobileScore)}`}>
                          {analysisResults.mobileScore}
                        </span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                      <div className="absolute -bottom-4 bg-card px-3 py-1 rounded-full border shadow-sm">
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.mobileScore)}`}>
                          {analysisResults.mobileScore >= 85 ? "Excellent" : 
                           analysisResults.mobileScore >= 65 ? "Average" : "Poor"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Loading Speed</span>
                        <span className="text-sm font-medium">
                          {analysisResults.loadingSpeed}s
                        </span>
                      </div>
                      <Progress 
                        value={100 - ((analysisResults.loadingSpeed - 1) * 20)} 
                        className="h-2"
                        indicatorClassName={analysisResults.loadingSpeed <= 2.5 ? "bg-seo-green" : analysisResults.loadingSpeed <= 3.5 ? "bg-seo-yellow" : "bg-seo-red"}
                      />
                      <p className="text-xs text-right mt-1">
                        {analysisResults.loadingSpeed <= 2.5 ? "Fast" : analysisResults.loadingSpeed <= 3.5 ? "Average" : "Slow"}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Touch Elements</span>
                        <span className="text-sm font-medium">
                          {analysisResults.touchElements}%
                        </span>
                      </div>
                      <Progress 
                        value={analysisResults.touchElements} 
                        className="h-2"
                        indicatorClassName={analysisResults.touchElements >= 85 ? "bg-seo-green" : analysisResults.touchElements >= 70 ? "bg-seo-yellow" : "bg-seo-red"}
                      />
                      <p className="text-xs text-right mt-1">
                        {analysisResults.touchElements >= 85 ? "Optimized" : analysisResults.touchElements >= 70 ? "Needs improvement" : "Poor"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile Configuration</CardTitle>
                  <CardDescription>
                    Technical elements for mobile optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <GanttChartSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Viewport Configuration</span>
                      </div>
                      {getStatusIcon(analysisResults.viewportConfiguration)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Content Scaling</span>
                      </div>
                      {getStatusIcon(analysisResults.contentScaling)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <AlignJustify className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Font Legibility</span>
                      </div>
                      {getStatusIcon(analysisResults.fontLegibility)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Tap Targets</span>
                      </div>
                      {getStatusIcon(analysisResults.tapTargets)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <ImageUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Responsive Images</span>
                      </div>
                      {getStatusIcon(analysisResults.responsiveImages)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Issues and Recommendations</CardTitle>
                <CardDescription>
                  Problems detected and how to fix them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.issues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                      <div className={`p-2 rounded-full ${
                        issue.severity === "high" 
                          ? "bg-seo-red/10" 
                          : issue.severity === "medium" 
                          ? "bg-seo-yellow/10" 
                          : "bg-seo-green/10"
                      }`}>
                        {issue.severity === "high" && <XCircle className="h-5 w-5 text-seo-red" />}
                        {issue.severity === "medium" && <HelpCircle className="h-5 w-5 text-seo-yellow" />}
                        {issue.severity === "low" && <CheckCircle2 className="h-5 w-5 text-seo-green" />}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center">
                          <h3 className="font-medium">
                            {issue.category}
                            <span className={`ml-2 text-xs font-normal px-2 py-0.5 rounded-full ${
                              issue.severity === "high" 
                                ? "bg-seo-red/10 text-seo-red" 
                                : issue.severity === "medium" 
                                ? "bg-seo-yellow/10 text-seo-yellow" 
                                : "bg-seo-green/10 text-seo-green"
                            }`}>
                              {issue.severity}
                            </span>
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                        <div className="mt-2 flex items-start gap-1">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                          <p className="text-sm">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Mobile;
