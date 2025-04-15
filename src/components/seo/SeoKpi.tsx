
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Eye, 
  BarChart2, 
  MousePointerClick, 
  ShoppingCart, 
  ArrowDownRight, 
  Gauge, 
  MapPin, 
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type KpiMetric = {
  name: string;
  description: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  isPositive?: boolean;
  threshold?: number;
  formula?: string;
  unit?: string;
  data?: Array<{
    date: string;
    value: number;
  }>;
  icon: React.ReactNode;
  suggestions?: string[];
  alertThreshold?: number;
}

export type KpiCategory = {
  name: string;
  description?: string;
  metrics: KpiMetric[];
}

interface SeoKpiProps {
  category: KpiCategory;
  showCharts?: boolean;
}

export function SeoKpi({ category, showCharts = true }: SeoKpiProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        {category.description && (
          <p className="text-sm text-muted-foreground">{category.description}</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {category.metrics.map((metric) => (
          <Card key={metric.name} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof metric.value === 'number' && metric.unit 
                  ? `${metric.value}${metric.unit}` 
                  : metric.value}
              </div>
              
              {metric.change !== undefined && (
                <div className="flex items-center mt-1">
                  <span
                    className={`text-xs ${
                      metric.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.isPositive ? "+" : ""}
                    {metric.change}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    vs previous period
                  </span>
                </div>
              )}
              
              {metric.threshold !== undefined && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Target: {metric.threshold}{metric.unit}</span>
                    <span className="text-xs text-muted-foreground">
                      {typeof metric.value === 'number' 
                        ? `${Math.min(Math.round((metric.value / metric.threshold) * 100), 100)}%` 
                        : ''}
                    </span>
                  </div>
                  <Progress 
                    value={typeof metric.value === 'number' 
                      ? Math.min(Math.round((metric.value / metric.threshold) * 100), 100) 
                      : 0} 
                    className="h-1" 
                  />
                </div>
              )}
              
              {metric.alertThreshold !== undefined && typeof metric.value === 'number' && metric.value < metric.alertThreshold && (
                <Badge variant="destructive" className="mt-2">
                  Below threshold
                </Badge>
              )}
              
              {showCharts && metric.data && metric.data.length > 0 && (
                <div className="h-24 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={metric.data}
                      margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                    >
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}${metric.unit || ''}`, metric.name]}
                        labelFormatter={(label) => label}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: 8,
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {metric.suggestions && metric.suggestions.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-muted-foreground">Suggestions:</span>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    {metric.suggestions.slice(0, 1).map((suggestion, idx) => (
                      <li key={idx} className="flex items-start">
                        <Sparkles className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
