
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useWebVitals } from "@/services/webVitalsService";
import { useNavigate } from "react-router-dom";

const webVitalExplanations = {
  "LCP": "Largest Contentful Paint measures loading performance. A good LCP is 2.5 seconds or less.",
  "FID": "First Input Delay measures interactivity. A good FID is 100ms or less.",
  "CLS": "Cumulative Layout Shift measures visual stability. A good CLS is 0.1 or less.",
  "TTFB": "Time to First Byte measures server response time. A good TTFB is 500ms or less."
};

export function WebVitalsOverview() {
  const { data: webVitals, isLoading, error } = useWebVitals();
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate("/web-vitals");
  };

  return (
    <Card className="seo-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Core Web Vitals</CardTitle>
        {!isLoading && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.location.reload()}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {webVitals.map((vital) => (
              <div key={vital.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{vital.name}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        {webVitalExplanations[vital.name as keyof typeof webVitalExplanations]}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium px-1.5 py-0.5 rounded-full",
                      vital.status === "good" && "bg-seo-green/10 text-seo-green",
                      vital.status === "needs-improvement" && "bg-seo-yellow/10 text-seo-yellow",
                      vital.status === "poor" && "bg-seo-red/10 text-seo-red"
                    )}
                  >
                    {vital.value.toFixed(2)}
                    {vital.unit}
                  </span>
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
                <p className="text-xs text-muted-foreground">
                  Target: {vital.target}
                  {vital.unit}
                </p>
              </div>
            ))}
            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleViewDetails}>
                View Detailed Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
