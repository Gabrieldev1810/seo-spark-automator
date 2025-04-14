import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  TrendingUp,
  ChevronRight,
  Clock,
  Zap,
  Layout
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";
import { useWebVitals } from "@/services/webVitalsService";
import { useNavigate } from "react-router-dom";

const webVitalExplanations = {
  "LCP": "Largest Contentful Paint measures loading performance. A good LCP is 2.5 seconds or less.",
  "FID": "First Input Delay measures interactivity. A good FID is 100ms or less.",
  "CLS": "Cumulative Layout Shift measures visual stability. A good CLS is 0.1 or less.",
  "TTFB": "Time to First Byte measures server response time. A good TTFB is 500ms or less."
};

interface WebVitalsOverviewProps {
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
}

export function WebVitalsOverview({ 
  loading = false, 
  error, 
  onRefresh 
}: WebVitalsOverviewProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { data: webVitals, isLoading, error: webVitalsError } = useWebVitals({});
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate("/web-vitals");
  };

  // Mock data for the trend charts
  const trendData = {
    lcp: [
      { date: "2024-01", value: 2.8 },
      { date: "2024-02", value: 2.5 },
      { date: "2024-03", value: 2.3 },
      { date: "2024-04", value: 2.1 },
      { date: "2024-05", value: 1.9 },
      { date: "2024-06", value: 1.8 },
    ],
    fid: [
      { date: "2024-01", value: 120 },
      { date: "2024-02", value: 110 },
      { date: "2024-03", value: 95 },
      { date: "2024-04", value: 85 },
      { date: "2024-05", value: 75 },
      { date: "2024-06", value: 65 },
    ],
    cls: [
      { date: "2024-01", value: 0.15 },
      { date: "2024-02", value: 0.12 },
      { date: "2024-03", value: 0.10 },
      { date: "2024-04", value: 0.08 },
      { date: "2024-05", value: 0.05 },
      { date: "2024-06", value: 0.03 },
    ],
  };
  
  // Mock data for improvement suggestions
  const improvementSuggestions = {
    lcp: [
      { 
        title: "Optimize hero image", 
        impact: "High", 
        description: "Compress and resize the hero image to reduce load time by ~40%",
        action: "View image optimization guide"
      },
      { 
        title: "Implement resource hints", 
        impact: "Medium", 
        description: "Add preconnect and preload directives for critical resources",
        action: "Configure resource hints"
      }
    ],
    fid: [
      { 
        title: "Defer non-critical JavaScript", 
        impact: "High", 
        description: "Move non-essential scripts to load after page load",
        action: "Review JavaScript loading"
      },
      { 
        title: "Optimize event handlers", 
        impact: "Medium", 
        description: "Debounce scroll and resize event listeners",
        action: "View event handler guide"
      }
    ],
    cls: [
      { 
        title: "Set image dimensions", 
        impact: "High", 
        description: "Add width and height attributes to all images",
        action: "Fix image dimensions"
      },
      { 
        title: "Reserve space for ads", 
        impact: "Medium", 
        description: "Pre-allocate space for dynamic content",
        action: "Configure ad containers"
      }
    ]
  };

  const renderMetricCard = (
    title: string,
    value: string,
    status: "good" | "needs-improvement" | "poor",
    description: string,
    trend: "up" | "down" | "stable",
    data: any[],
    suggestions: any[]
  ) => {
    const statusColors = {
      good: "text-seo-green",
      "needs-improvement": "text-seo-yellow",
      poor: "text-seo-red",
    };

    const statusIcons = {
      good: <CheckCircle2 className="h-4 w-4" />,
      "needs-improvement": <AlertCircle className="h-4 w-4" />,
      poor: <AlertCircle className="h-4 w-4" />,
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={cn("font-medium", statusColors[status])}>
              {title}
            </span>
            {statusIcons[status]}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Info className="h-4 w-4" />
                <span className="sr-only">View Details</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{title} Details</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="trend">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trend">Trend</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="improvements">Improvements</TabsTrigger>
                </TabsList>
                <TabsContent value="trend" className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={{ fill: "#10b981" }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </TabsContent>
                <TabsContent value="analysis" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Current Status</h4>
                      <div className="flex items-center space-x-2">
                        <span className={cn("text-sm", statusColors[status])}>
                          {value}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({status === "good" ? "Good" : status === "needs-improvement" ? "Needs Improvement" : "Poor"})
                        </span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Impact on SEO</h4>
                      <p className="text-sm text-muted-foreground">
                        {status === "good" 
                          ? "Your page performance is excellent and positively impacts your SEO rankings."
                          : status === "needs-improvement"
                          ? "Improving this metric could boost your SEO rankings by up to 15%."
                          : "This metric is significantly impacting your SEO rankings and user experience."}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="improvements" className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <span className={cn(
                          "text-xs font-medium px-1.5 py-0.5 rounded-full",
                          suggestion.impact === "High" ? "bg-seo-red/10 text-seo-red" : 
                          "bg-seo-yellow/10 text-seo-yellow"
                        )}>
                          {suggestion.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {suggestion.action}
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{value}</span>
            <span className={cn(
              "text-sm",
              trend === "up" ? "text-seo-green" : 
              trend === "down" ? "text-seo-red" : "text-muted-foreground"
            )}>
              {trend === "up" ? "+" : trend === "down" ? "-" : ""}5%
            </span>
          </div>
          <Progress 
            value={status === "good" ? 100 : status === "needs-improvement" ? 60 : 30} 
            className={cn(
              status === "good" ? "bg-seo-green/20" : 
              status === "needs-improvement" ? "bg-seo-yellow/20" : "bg-seo-red/20"
            )}
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="seo-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Core Web Vitals</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDetailsOpen(true)}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            View Trends
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRefresh} 
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {webVitalsError ? (
          <div className="flex items-center justify-center p-4 text-seo-red">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>{webVitalsError}</span>
          </div>
        ) : (
          <>
            {renderMetricCard(
              "Largest Contentful Paint",
              "1.8s",
              "good",
              "Time until the largest content element is rendered",
              "up",
              trendData.lcp,
              improvementSuggestions.lcp
            )}
            {renderMetricCard(
              "First Input Delay",
              "65ms",
              "good",
              "Time from user interaction to browser response",
              "down",
              trendData.fid,
              improvementSuggestions.fid
            )}
            {renderMetricCard(
              "Cumulative Layout Shift",
              "0.03",
              "good",
              "Measure of visual stability",
              "down",
              trendData.cls,
              improvementSuggestions.cls
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
