
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SeoScoreProps {
  score: number;
  previousScore?: number;
}

export function SeoScoreCard({ score, previousScore }: SeoScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-seo-green";
    if (score >= 70) return "text-seo-yellow";
    return "text-seo-red";
  };

  const scoreDifference = previousScore ? score - previousScore : 0;

  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>SEO Score</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-muted">
          <div className="flex flex-col">
            <span
              className={cn(
                "text-4xl font-bold",
                getScoreColor(score)
              )}
            >
              {score}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        {previousScore && (
          <div className="mt-4">
            <p
              className={cn(
                "text-sm",
                scoreDifference > 0 ? "text-seo-green" : "text-seo-red"
              )}
            >
              {scoreDifference > 0 ? "+" : ""}
              {scoreDifference} points from last month
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
