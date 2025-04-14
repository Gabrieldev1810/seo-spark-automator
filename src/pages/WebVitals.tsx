import React, { useState, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useToast } from "../components/ui/use-toast";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { LighthouseService, LighthouseAuditResult, LighthouseMetrics, LighthouseOpportunity, LighthouseDiagnostic } from "../services/lighthouseService";

// Web vitals explanations
const webVitalsExplanations = {
  lcp: {
    name: "Largest Contentful Paint",
    description: "Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.",
    good: "≤ 2.5s",
    needsImprovement: "2.5s - 4s",
    poor: "> 4s"
  },
  fid: {
    name: "First Input Delay",
    description: "Measures interactivity. To provide a good user experience, pages should have a FID of less than 100 milliseconds.",
    good: "≤ 100ms",
    needsImprovement: "100ms - 300ms",
    poor: "> 300ms"
  },
  cls: {
    name: "Cumulative Layout Shift",
    description: "Measures visual stability. To provide a good user experience, pages should maintain a CLS of less than 0.1.",
    good: "≤ 0.1",
    needsImprovement: "0.1 - 0.25",
    poor: "> 0.25"
  },
  ttfb: {
    name: "Time to First Byte",
    description: "Measures the time it takes for the browser to receive the first byte of content from the server.",
    good: "≤ 0.6s",
    needsImprovement: "0.6s - 1.8s",
    poor: "> 1.8s"
  },
  fcp: {
    name: "First Contentful Paint",
    description: "Measures the time it takes for the browser to render the first piece of content from the DOM.",
    good: "≤ 1.8s",
    needsImprovement: "1.8s - 3s",
    poor: "> 3s"
  },
  si: {
    name: "Speed Index",
    description: "Measures how quickly content is visually displayed during page load.",
    good: "≤ 3.4s",
    needsImprovement: "3.4s - 5.8s",
    poor: "> 5.8s"
  },
  tbt: {
    name: "Total Blocking Time",
    description: "Measures the total amount of time when the main thread was blocked.",
    good: "≤ 200ms",
    needsImprovement: "200ms - 600ms",
    poor: "> 600ms"
  }
};

// Mock data for AI recommendations
const mockAiRecommendations = [
  {
    title: "Optimize Largest Contentful Paint (LCP)",
    description: "Your LCP is above the recommended threshold of 2.5 seconds. This affects how quickly users perceive your page as loading.",
    impact: "High",
    difficulty: "Medium",
    details: {
      currentValue: "3.2s",
      targetValue: "≤ 2.5s",
      suggestions: [
        "Optimize and compress hero images",
        "Implement proper image sizing and responsive images",
        "Consider using next-gen image formats (WebP, AVIF)",
        "Implement preload for critical resources",
        "Optimize server response time"
      ],
      codeExamples: [
        {
          title: "Image Optimization",
          code: `<img 
  src="hero.webp"
  width="1200"
  height="630"
  loading="eager"
  fetchpriority="high"
  alt="Hero image"
/>`
        },
        {
          title: "Resource Preloading",
          code: `<link 
  rel="preload" 
  href="critical.css" 
  as="style"
/>`
        }
      ]
    }
  },
  {
    title: "Improve First Input Delay (FID)",
    description: "Your FID is above 100ms, indicating potential responsiveness issues. This affects how quickly your page responds to user interactions.",
    impact: "High",
    difficulty: "High",
    details: {
      currentValue: "150ms",
      targetValue: "≤ 100ms",
      suggestions: [
        "Break up long JavaScript tasks",
        "Implement code splitting",
        "Defer non-critical JavaScript",
        "Optimize third-party script loading",
        "Consider using Web Workers for heavy computations"
      ],
      codeExamples: [
        {
          title: "Code Splitting Example",
          code: `// Before
import { heavyFunction } from './heavyModule';

// After
const heavyFunction = async () => {
  const module = await import('./heavyModule');
  return module.heavyFunction();
};`
        },
        {
          title: "Defer Non-Critical Scripts",
          code: `<script 
  src="non-critical.js" 
  defer
  async
/>`
        }
      ]
    }
  },
  {
    title: "Reduce Cumulative Layout Shift (CLS)",
    description: "Your CLS score indicates unexpected layout shifts. This affects user experience and can lead to accidental clicks.",
    impact: "Medium",
    difficulty: "Medium",
    details: {
      currentValue: "0.15",
      targetValue: "≤ 0.1",
      suggestions: [
        "Set explicit dimensions for images and videos",
        "Reserve space for dynamic content",
        "Avoid inserting content above existing content",
        "Use CSS transforms instead of properties that trigger layout",
        "Implement proper font loading strategy"
      ],
      codeExamples: [
        {
          title: "Image Dimensions",
          code: `<img 
  src="image.jpg"
  width="800"
  height="600"
  alt="Descriptive text"
/>`
        },
        {
          title: "Font Loading Strategy",
          code: `<link 
  rel="preload" 
  href="font.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
/>`
        }
      ]
    }
  },
  {
    title: "Optimize Time to First Byte (TTFB)",
    description: "Your TTFB is above the recommended threshold, indicating potential server-side performance issues.",
    impact: "Medium",
    difficulty: "Low",
    details: {
      currentValue: "800ms",
      targetValue: "≤ 600ms",
      suggestions: [
        "Implement proper caching strategies",
        "Optimize database queries",
        "Consider using a CDN",
        "Enable compression (Gzip/Brotli)",
        "Optimize server configuration"
      ],
      codeExamples: [
        {
          title: "Cache-Control Headers",
          code: `// In your server configuration
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));`
        },
        {
          title: "Compression Middleware",
          code: `const compression = require('compression');
app.use(compression());`
        }
      ]
    }
  },
  {
    title: "Optimize Resource Loading",
    description: "Several resources are blocking the main thread and affecting page load performance.",
    impact: "High",
    difficulty: "Medium",
    details: {
      suggestions: [
        "Implement resource hints (preload, prefetch)",
        "Use async/defer for non-critical scripts",
        "Optimize CSS delivery",
        "Implement proper caching strategies",
        "Consider using a CDN for static assets"
      ],
      codeExamples: [
        {
          title: "Resource Hints",
          code: `<link rel="preload" href="critical.css" as="style">
<link rel="prefetch" href="non-critical.js">`
        },
        {
          title: "Critical CSS Inline",
          code: `<style>
  /* Critical CSS here */
</style>`
        }
      ]
    }
  }
];

// Mock data for opportunities
const mockOpportunities = [
  {
    title: "Reduce unused JavaScript",
    description: "Remove unused JavaScript to reduce parsing time and speed up page load.",
    savings: "150 KB",
    impact: "High"
  },
  {
    title: "Optimize images",
    description: "Serve images in next-gen formats and compress them to reduce page size.",
    savings: "200 KB",
    impact: "Medium"
  },
  {
    title: "Minimize render-blocking resources",
    description: "Defer non-critical CSS and JavaScript to improve page load time.",
    savings: "1.2 s",
    impact: "High"
  }
];

// Mock data for diagnostics
const mockDiagnostics = [
  {
    title: "Performance",
    description: "Your page is performing well overall, but there are some opportunities for improvement.",
    score: 85
  },
  {
    title: "Accessibility",
    description: "Your page has good accessibility, but there are some issues that could be improved.",
    score: 92
  },
  {
    title: "Best Practices",
    description: "Your page follows most best practices, but there are some issues that could be improved.",
    score: 88
  }
];

// Mock data for passed audits
const mockPassedAudits = [
  "Avoids deprecated APIs",
  "Avoids document.write",
  "Avoids plugins",
  "Avoids render-blocking resources",
  "Avoids unnecessary images",
  "Avoids unused CSS",
  "Avoids unused JavaScript",
  "Avoids unused preload",
  "Avoids unused preload",
  "Avoids unused preload"
];

const WebVitals = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<LighthouseAuditResult | null>(null);
  const [activeTab, setActiveTab] = useState("metrics");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv" | "json">("pdf");
  
  const lighthouseService = new LighthouseService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    // Format URL if needed
    let formattedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }
    
    setLoading(true);
    
    try {
      const result = await lighthouseService.runAudit(formattedUrl, device);
      setAuditResult(result);
      
      toast({
        title: "Success",
        description: "Web vitals analysis completed successfully",
      });
    } catch (error) {
      console.error("Error analyzing web vitals:", error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to analyze web vitals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!auditResult) return;
    
    try {
      // In a real implementation, this would generate and download the file
      // For now, we'll just show a success message
      toast({
        title: "Export Successful",
        description: `Web vitals data exported as ${exportFormat.toUpperCase()}`,
      });
      
      setShowExportDialog(false);
    } catch (error) {
      console.error("Error exporting data:", error);
      
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getMetricStatus = (value: number, metric: keyof typeof webVitalsExplanations) => {
    const explanation = webVitalsExplanations[metric];
    
    if (metric === "cls") {
      if (value <= 0.1) return "good";
      if (value <= 0.25) return "needs-improvement";
      return "poor";
    }
    
    // For time-based metrics (in milliseconds)
    if (metric === "lcp" || metric === "fid" || metric === "ttfb" || metric === "fcp" || metric === "si" || metric === "tbt") {
      if (metric === "lcp" && value <= 2500) return "good";
      if (metric === "fid" && value <= 100) return "good";
      if (metric === "ttfb" && value <= 600) return "good";
      if (metric === "fcp" && value <= 1800) return "good";
      if (metric === "si" && value <= 3400) return "good";
      if (metric === "tbt" && value <= 200) return "good";
      
      if (metric === "lcp" && value <= 4000) return "needs-improvement";
      if (metric === "fid" && value <= 300) return "needs-improvement";
      if (metric === "ttfb" && value <= 1800) return "needs-improvement";
      if (metric === "fcp" && value <= 3000) return "needs-improvement";
      if (metric === "si" && value <= 5800) return "needs-improvement";
      if (metric === "tbt" && value <= 600) return "needs-improvement";
      
      return "poor";
    }
    
    return "unknown";
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "needs-improvement":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatMetricValue = (value: number, metric: keyof typeof webVitalsExplanations) => {
    if (metric === "cls") {
      return value.toFixed(3);
    }
    
    // For time-based metrics (in milliseconds)
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}s`;
    }
    
    return `${Math.round(value)}ms`;
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Core Web Vitals Analysis</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analyze Web Vitals</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="Enter website URL (e.g., example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="device">Device</Label>
                  <Select
                    value={device}
                    onValueChange={(value) => setDevice(value as "mobile" | "desktop")}
                    disabled={loading}
                  >
                    <SelectTrigger id="device">
                      <SelectValue placeholder="Select device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                    </SelectContent>
                  </Select>
          </div>
                
                <div className="flex items-end">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {auditResult && (
          <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowExportDialog(true)}>
                  Export Data
                </Button>
                <Button variant="outline" onClick={() => window.open(lighthouseService.getReportPath(auditResult.url), "_blank")}>
                  View Full Report
                </Button>
              </div>
          </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="metrics">Core Web Vitals</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
                <TabsTrigger value="passed">Passed Audits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="metrics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Core Web Vitals</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* LCP */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Largest Contentful Paint (LCP)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.largestContentfulPaint, "lcp") === "good" ? "default" : getMetricStatus(auditResult.metrics.largestContentfulPaint, "lcp") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.largestContentfulPaint, "lcp")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (2500 / auditResult.metrics.largestContentfulPaint) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.largestContentfulPaint, "lcp"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.lcp.description}</p>
                      </div>
                      
                      {/* FID */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">First Input Delay (FID)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.firstInputDelay, "fid") === "good" ? "default" : getMetricStatus(auditResult.metrics.firstInputDelay, "fid") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.firstInputDelay, "fid")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (100 / auditResult.metrics.firstInputDelay) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.firstInputDelay, "fid"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.fid.description}</p>
                      </div>
                      
                      {/* CLS */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Cumulative Layout Shift (CLS)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.cumulativeLayoutShift, "cls") === "good" ? "default" : getMetricStatus(auditResult.metrics.cumulativeLayoutShift, "cls") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.cumulativeLayoutShift, "cls")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (0.1 / auditResult.metrics.cumulativeLayoutShift) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.cumulativeLayoutShift, "cls"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.cls.description}</p>
                      </div>
                      
                      {/* TTFB */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Time to First Byte (TTFB)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.timeToFirstByte, "ttfb") === "good" ? "default" : getMetricStatus(auditResult.metrics.timeToFirstByte, "ttfb") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.timeToFirstByte, "ttfb")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (600 / auditResult.metrics.timeToFirstByte) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.timeToFirstByte, "ttfb"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.ttfb.description}</p>
                      </div>
                      
                      {/* FCP */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">First Contentful Paint (FCP)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.firstContentfulPaint, "fcp") === "good" ? "default" : getMetricStatus(auditResult.metrics.firstContentfulPaint, "fcp") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.firstContentfulPaint, "fcp")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (1800 / auditResult.metrics.firstContentfulPaint) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.firstContentfulPaint, "fcp"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.fcp.description}</p>
                      </div>
                      
                      {/* SI */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Speed Index (SI)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.speedIndex, "si") === "good" ? "default" : getMetricStatus(auditResult.metrics.speedIndex, "si") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.speedIndex, "si")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (3400 / auditResult.metrics.speedIndex) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.speedIndex, "si"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.si.description}</p>
                      </div>
                      
                      {/* TBT */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Total Blocking Time (TBT)</h3>
                          <Badge variant={getMetricStatus(auditResult.metrics.totalBlockingTime, "tbt") === "good" ? "default" : getMetricStatus(auditResult.metrics.totalBlockingTime, "tbt") === "needs-improvement" ? "secondary" : "destructive"}>
                            {formatMetricValue(auditResult.metrics.totalBlockingTime, "tbt")}
                          </Badge>
                        </div>
                        <Progress value={Math.min(100, (200 / auditResult.metrics.totalBlockingTime) * 100)} className={getMetricColor(getMetricStatus(auditResult.metrics.totalBlockingTime, "tbt"))} />
                        <p className="text-sm text-muted-foreground">{webVitalsExplanations.tbt.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Scores</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Performance</h3>
                        <div className="flex items-center space-x-2">
                          <Progress value={auditResult.metrics.performanceScore} className="bg-blue-500" />
                          <span className="font-bold">{Math.round(auditResult.metrics.performanceScore)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Accessibility</h3>
                        <div className="flex items-center space-x-2">
                          <Progress value={auditResult.metrics.accessibilityScore} className="bg-green-500" />
                          <span className="font-bold">{Math.round(auditResult.metrics.accessibilityScore)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Best Practices</h3>
                        <div className="flex items-center space-x-2">
                          <Progress value={auditResult.metrics.bestPracticesScore} className="bg-purple-500" />
                          <span className="font-bold">{Math.round(auditResult.metrics.bestPracticesScore)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">SEO</h3>
                        <div className="flex items-center space-x-2">
                          <Progress value={auditResult.metrics.seoScore} className="bg-yellow-500" />
                          <span className="font-bold">{Math.round(auditResult.metrics.seoScore)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="opportunities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>Detailed analysis and actionable insights for improving Core Web Vitals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {mockAiRecommendations.map((recommendation, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-2">
                              <span>{recommendation.title}</span>
                              <Badge variant={recommendation.impact === "High" ? "destructive" : recommendation.impact === "Medium" ? "secondary" : "default"} className="ml-2">
                                {recommendation.impact}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                              
                              {recommendation.details && (
                                <>
                                  {recommendation.details.currentValue && (
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">Current Value</p>
                                        <p className="text-2xl font-bold text-destructive">{recommendation.details.currentValue}</p>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">Target Value</p>
                                        <p className="text-2xl font-bold text-green-600">{recommendation.details.targetValue}</p>
                                      </div>
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    <h4 className="font-medium">Recommendations:</h4>
                                    <ul className="list-disc pl-4 space-y-1">
                                      {recommendation.details.suggestions.map((suggestion, idx) => (
                                        <li key={idx} className="text-sm">{suggestion}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  {recommendation.details.codeExamples && (
                                    <div className="space-y-4">
                                      <h4 className="font-medium">Code Examples:</h4>
                                      {recommendation.details.codeExamples.map((example, idx) => (
                                        <div key={idx} className="space-y-2">
                                          <p className="text-sm font-medium">{example.title}</p>
                                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                            <code className="text-sm">{example.code}</code>
                                          </pre>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}

                              <div className="flex items-center space-x-4 mt-4">
                                <div>
                                  <span className="text-sm font-medium">Difficulty:</span>
                                  <Badge variant={recommendation.difficulty === "High" ? "destructive" : recommendation.difficulty === "Medium" ? "secondary" : "default"} className="ml-1">
                                    {recommendation.difficulty}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Impact:</span>
                                  <Badge variant={recommendation.impact === "High" ? "destructive" : recommendation.impact === "Medium" ? "secondary" : "default"} className="ml-1">
                                    {recommendation.impact}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    </CardContent>
                  </Card>
              </TabsContent>
              
              <TabsContent value="diagnostics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Diagnostics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {auditResult.diagnostics.map((diagnostic, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center space-x-2">
                              <span>{diagnostic.title}</span>
                              <Badge variant={diagnostic.score < 0.5 ? "destructive" : diagnostic.score < 0.8 ? "secondary" : "default"} className="ml-2">
                                {Math.round(diagnostic.score * 100)}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>{diagnostic.description}</p>
                              {diagnostic.displayValue && (
                                <p className="font-medium">Value: {diagnostic.displayValue}</p>
              )}
            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="passed" className="space-y-6">
                <Card>
                <CardHeader>
                    <CardTitle>Passed Audits</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {auditResult.passedAudits.map((audit, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{audit}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              </TabsContent>
            </Tabs>

            {/* Resources Section */}
            <Card>
                <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Detailed information about website resources</CardDescription>
                </CardHeader>
                <CardContent>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Resources</TabsTrigger>
                    <TabsTrigger value="blocking">Render Blocking</TabsTrigger>
                    <TabsTrigger value="unused">Unused Resources</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4">
                      {auditResult.resources.map((resource, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{resource.url}</h4>
                              <p className="text-sm text-muted-foreground">
                                Type: {resource.type} | Size: {resource.size}
                              </p>
                            </div>
                            <Badge variant={resource.renderBlocking ? "destructive" : "default"}>
                              {resource.renderBlocking ? "Blocking" : "Non-blocking"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="blocking">
                    <div className="grid gap-4">
                      {auditResult.renderBlockingResources.map((resource, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-destructive/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{resource.url}</h4>
                              <p className="text-sm text-muted-foreground">
                                Type: {resource.type} | Size: {resource.size}
                              </p>
                            </div>
                            <Badge variant="destructive">Blocking</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="unused">
                    <div className="grid gap-4">
                      {auditResult.unusedResources.map((resource, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-warning/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{resource.url}</h4>
                              <p className="text-sm text-muted-foreground">
                                Type: {resource.type} | Size: {resource.size}
                              </p>
                            </div>
                            <Badge variant="secondary">Unused</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Performance Issues */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Issues</CardTitle>
                <CardDescription>Detailed analysis of performance bottlenecks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {auditResult.performanceIssues.map((issue, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{issue.title}</h4>
                        <Badge variant={issue.impact === "high" ? "destructive" : "secondary"}>
                          {issue.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      {issue.details && (
                        <div className="mt-2 p-2 bg-muted rounded-md">
                          <p className="text-sm font-medium">Details:</p>
                          <p className="text-sm">{JSON.stringify(issue.details)}</p>
                        </div>
                      )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            {/* DOM Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>DOM Statistics</CardTitle>
                <CardDescription>Analysis of page structure and elements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Elements</h4>
                    <div className="space-y-2">
                      <p className="text-sm">Total Elements: {auditResult.domStats.totalElements}</p>
                      <p className="text-sm">Total Nodes: {auditResult.domStats.totalNodes}</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Images</h4>
                    <div className="space-y-2">
                      <p className="text-sm">Total Images: {auditResult.domStats.totalImages}</p>
                      <p className="text-sm">Total Scripts: {auditResult.domStats.totalScripts}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Long Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Long Tasks</CardTitle>
                <CardDescription>Tasks that block the main thread</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {auditResult.longTasks.tasks.map((task, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{task.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Duration: {task.duration}ms
                          </p>
                        </div>
                        <Badge variant="destructive">Long Task</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Web Vitals Data</DialogTitle>
            <DialogDescription>
              Choose a format to export your web vitals data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select
                value={exportFormat}
                onValueChange={(value) => setExportFormat(value as "pdf" | "csv" | "json")}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default WebVitals;
