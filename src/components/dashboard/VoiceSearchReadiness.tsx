
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VoiceMetricProps {
  name: string;
  value: string;
  status: "good" | "warning" | "bad";
}

const voiceMetrics: VoiceMetricProps[] = [
  {
    name: "FAQ Schema",
    value: "Implemented",
    status: "good",
  },
  {
    name: "Long-tail Keywords",
    value: "65% Optimized",
    status: "warning",
  },
  {
    name: "Natural Language",
    value: "Highly Conversational",
    status: "good",
  },
  {
    name: "Local Business Schema",
    value: "Missing",
    status: "bad",
  },
];

export function VoiceSearchReadiness() {
  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>Voice Search</CardTitle>
        <CardDescription>Readiness assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {voiceMetrics.map((metric) => (
            <div
              key={metric.name}
              className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
            >
              <span className="text-sm font-medium">{metric.name}</span>
              <span
                className={`text-sm px-2 py-0.5 rounded-full ${
                  metric.status === "good"
                    ? "bg-seo-green/10 text-seo-green"
                    : metric.status === "warning"
                    ? "bg-seo-yellow/10 text-seo-yellow"
                    : "bg-seo-red/10 text-seo-red"
                }`}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
