
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function OverviewCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: OverviewCardProps) {
  return (
    <Card className={cn("seo-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <p
            className={cn(
              "text-xs mt-1",
              trend.isPositive ? "text-seo-green" : "text-seo-red"
            )}
          >
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}%{" "}
            <span className="text-muted-foreground">from last month</span>
          </p>
        ) : description ? (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
