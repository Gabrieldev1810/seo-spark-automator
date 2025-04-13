
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface WebVitalProps {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: "good" | "needs-improvement" | "poor";
}

const webVitals: WebVitalProps[] = [
  {
    name: "LCP",
    value: 2.1,
    target: 2.5,
    unit: "s",
    status: "good",
  },
  {
    name: "FID",
    value: 75,
    target: 100,
    unit: "ms",
    status: "needs-improvement",
  },
  {
    name: "CLS",
    value: 0.12,
    target: 0.1,
    unit: "",
    status: "poor",
  },
  {
    name: "TTFB",
    value: 350,
    target: 500,
    unit: "ms",
    status: "good",
  },
];

export function WebVitalsOverview() {
  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>Core Web Vitals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {webVitals.map((vital) => (
            <div key={vital.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{vital.name}</span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    vital.status === "good" && "text-seo-green",
                    vital.status === "needs-improvement" && "text-seo-yellow",
                    vital.status === "poor" && "text-seo-red"
                  )}
                >
                  {vital.value}
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
        </div>
      </CardContent>
    </Card>
  );
}
