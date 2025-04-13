
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MobileIssueProps {
  name: string;
  impact: "high" | "medium" | "low";
  status: "fixed" | "pending";
}

const mobileIssues: MobileIssueProps[] = [
  {
    name: "Viewport Configuration",
    impact: "high",
    status: "fixed",
  },
  {
    name: "Touch Elements Sizing",
    impact: "medium",
    status: "pending",
  },
  {
    name: "Font Legibility",
    impact: "high",
    status: "fixed",
  },
  {
    name: "Content Scaling",
    impact: "medium",
    status: "pending",
  },
  {
    name: "Mobile Redirects",
    impact: "low",
    status: "fixed",
  },
];

export function MobileOptimization() {
  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>Mobile Optimization</CardTitle>
        <CardDescription>Issues detected in mobile view</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mobileIssues.map((issue) => (
            <div
              key={issue.name}
              className="flex items-center justify-between py-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    issue.impact === "high" && "bg-seo-red",
                    issue.impact === "medium" && "bg-seo-yellow",
                    issue.impact === "low" && "bg-seo-green"
                  )}
                />
                <span className="text-sm">{issue.name}</span>
              </div>
              <div>
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    issue.status === "fixed"
                      ? "bg-seo-green/10 text-seo-green"
                      : "bg-seo-yellow/10 text-seo-yellow"
                  )}
                >
                  {issue.status === "fixed" ? "Fixed" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
