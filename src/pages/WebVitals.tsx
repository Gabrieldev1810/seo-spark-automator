
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, Link, Smartphone, Desktop, AlertTriangle, Info, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWebVitals } from "@/services/webVitalsService";

// Historical mock data for charts
const mockHistoricalData = [
  { date: "1 Jun", lcp: 2.6, fid: 90, cls: 0.15, ttfb: 370 },
  { date: "8 Jun", lcp: 2.5, fid: 85, cls: 0.14, ttfb: 360 },
  { date: "15 Jun", lcp: 2.4, fid: 80, cls: 0.13, ttfb: 355 },
  { date: "22 Jun", lcp: 2.3, fid: 78, cls: 0.13, ttfb: 350 },
  { date: "29 Jun", lcp: 2.2, fid: 77, cls: 0.12, ttfb: 345 },
  { date: "6 Jul", lcp: 2.1, fid: 75, cls: 0.12, ttfb: 350 },
  { date: "13 Jul", lcp: 2.0, fid: 72, cls: 0.11, ttfb: 340 },
  { date: "Today", lcp: 1.9, fid: 70, cls: 0.10, ttfb: 330 },
];

interface ImprovementTip {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  metric: string;
}

const improvementTips: ImprovementTip[] = [
  {
    title: "Optimize LCP element",
    description: "Preload your largest image or font to improve rendering time.",
    impact: "high",
    metric: "LCP"
  },
  {
    title: "Reduce JavaScript execution time",
    description: "Minimize or defer non-critical JavaScript to improve interactivity.",
    impact: "high",
    metric: "FID"
  },
  {
    title: "Include size attributes on images",
    description: "Always specify width and height for images to reduce layout shifts.",
    impact: "medium",
    metric: "CLS"
  },
  {
    title: "Implement HTTP/2",
    description: "Upgrade to HTTP/2 to improve connection efficiency.",
    impact: "medium",
    metric: "TTFB"
  },
  {
    title: "Use a CDN",
    description: "Deliver content from locations closer to users for faster loading.",
    impact: "high",
    metric: "TTFB"
  },
  {
    title: "Optimize CSS delivery",
    description: "Inline critical CSS and defer non-critical styles.",
    impact: "medium",
    metric: "LCP"
  },
];

const WebVitals = () => {
  const [url, setUrl] = useState("example.com");
  const [urlInput, setUrlInput] = useState(url);
  const { data: webVitals, isLoading, error } = useWebVitals(url);
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput) {
      setUrl(urlInput);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Core Web Vitals Analysis</h1>
            <p className="text-muted-foreground">
              Track and optimize your site's user experience metrics
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* URL Input */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <div className="flex items-center border rounded-md px-3 flex-1">
                <Link className="h-4 w-4 text-muted-foreground mr-2" />
                <Input 
                  type="text"
                  placeholder="Enter website URL" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button type="submit">Analyze</Button>
            </form>
          </CardContent>
        </Card>

        {/* Device Tabs */}
        <Tabs defaultValue="desktop">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="desktop" className="flex items-center gap-1">
                <Desktop className="h-4 w-4" />
                <span>Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-1">
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop Content */}
          <TabsContent value="desktop" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {isLoading ? (
                Array(4).fill(null).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-20 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20 mt-1" />
                    </CardContent>
                  </Card>
                ))
              ) : error ? (
                <Card className="md:col-span-4">
                  <CardContent className="pt-6">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {error}. Please try again or check the URL.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              ) : (
                webVitals.map((vital) => (
                  <Card key={vital.name}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{vital.name}</CardTitle>
                      <CardDescription>
                        {vital.name === "LCP" && "Loading"}
                        {vital.name === "FID" && "Interactivity"}
                        {vital.name === "CLS" && "Visual Stability"}
                        {vital.name === "TTFB" && "Server Response"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold">
                          {vital.value.toFixed(2)}{vital.unit}
                        </div>
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          vital.status === "good" && "bg-seo-green/10 text-seo-green",
                          vital.status === "needs-improvement" && "bg-seo-yellow/10 text-seo-yellow",
                          vital.status === "poor" && "bg-seo-red/10 text-seo-red"
                        )}>
                          {vital.status === "good" && "Good"}
                          {vital.status === "needs-improvement" && "Needs Improvement"}
                          {vital.status === "poor" && "Poor"}
                        </div>
                      </div>
                      <Progress
                        value={(vital.value / vital.target) * 100}
                        className={cn(
                          vital.status === "good" && "bg-seo-green/20",
                          vital.status === "needs-improvement" && "bg-seo-yellow/20",
                          vital.status === "poor" && "bg-seo-red/20"
                        )}
                        indicatorClassName={cn(
                          vital.status === "good" && "bg-seo-green",
                          vital.status === "needs-improvement" && "bg-seo-yellow",
                          vital.status === "poor" && "bg-seo-red"
                        )}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">
                          Target: {vital.target}{vital.unit}
                        </p>
                        <div className="flex items-center text-xs">
                          <span className={
                            mockHistoricalData[7][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]] < 
                            mockHistoricalData[0][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]] 
                              ? 'text-seo-green' 
                              : 'text-seo-red'
                          }>
                            {
                              mockHistoricalData[7][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]] < 
                              mockHistoricalData[0][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]] 
                                ? <ArrowDown className="h-3 w-3 inline mr-1" /> 
                                : <ArrowUp className="h-3 w-3 inline mr-1" />
                            }
                            {Math.abs(
                              ((mockHistoricalData[7][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]] - 
                                mockHistoricalData[0][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]]) /
                                mockHistoricalData[0][vital.name.toLowerCase() as keyof typeof mockHistoricalData[0]]) * 100
                            ).toFixed(1)}%
                          </span>
                          <span className="text-muted-foreground ml-1">vs 6 weeks ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Historical Trends Chart */}
            {!isLoading && !error && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Historical Trends</CardTitle>
                  <CardDescription>Performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockHistoricalData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.9)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#f1f5f9'
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="lcp"
                          name="LCP (s)"
                          stroke="#0284c7"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="fid"
                          name="FID (ms)"
                          stroke="#059669"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="cls"
                          name="CLS"
                          stroke="#d97706"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="ttfb"
                          name="TTFB (ms)"
                          stroke="#7c3aed"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Improvement Tips */}
            {!isLoading && !error && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Improvement Opportunities</CardTitle>
                  <CardDescription>Actionable suggestions to improve your metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {improvementTips.map((tip, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium">{tip.title}</h3>
                          <div className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            tip.impact === "high" && "bg-seo-red/10 text-seo-red",
                            tip.impact === "medium" && "bg-seo-yellow/10 text-seo-yellow",
                            tip.impact === "low" && "bg-seo-green/10 text-seo-green"
                          )}>
                            {tip.impact.charAt(0).toUpperCase() + tip.impact.slice(1)} Impact
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Info className="h-3 w-3" />
                          <span>Improves {tip.metric}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Mobile Content - Same structure as desktop, but would have different data */}
          <TabsContent value="mobile" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <Smartphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Mobile Analysis Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md">
                      We're currently building our mobile analysis capabilities. 
                      Check back soon for detailed mobile performance insights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default WebVitals;
