import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  X, 
  ChevronRight 
} from "lucide-react";
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

interface SeoScoreProps {
  score: number;
  previousScore?: number;
}

export function SeoScoreCard({ score, previousScore }: SeoScoreProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-seo-green";
    if (score >= 70) return "text-seo-yellow";
    return "text-seo-red";
  };

  const scoreDifference = previousScore ? score - previousScore : 0;
  
  // Mock data for the trend chart
  const trendData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 70 },
    { month: "Apr", score: 72 },
    { month: "May", score: 75 },
    { month: "Jun", score: 78 },
  ];
  
  // Mock data for score breakdown
  const scoreBreakdown = [
    { category: "Technical SEO", score: 85, weight: 30 },
    { category: "On-Page SEO", score: 75, weight: 25 },
    { category: "Content Quality", score: 90, weight: 25 },
    { category: "Backlinks", score: 65, weight: 20 },
  ];
  
  // Mock data for recommendations
  const recommendations = [
    { 
      title: "Improve page load speed", 
      impact: "High", 
      description: "Your pages are loading 2.3s slower than recommended. Optimize images and reduce server response time." 
    },
    { 
      title: "Add more internal links", 
      impact: "Medium", 
      description: "Internal linking structure could be improved. Add 5-7 more relevant internal links to key pages." 
    },
    { 
      title: "Update meta descriptions", 
      impact: "Low", 
      description: "12 pages have missing or duplicate meta descriptions. Update them to improve click-through rates." 
    },
  ];

  return (
    <Card className="seo-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>SEO Score</CardTitle>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <BarChart3 className="h-4 w-4" />
              <span className="sr-only">View Details</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>SEO Score Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="trend">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trend">Trend</TabsTrigger>
                <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="trend" className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <RechartsTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        dot={{ fill: "#10b981" }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your SEO score has improved by {scoreDifference} points over the last 6 months.
                </p>
              </TabsContent>
              <TabsContent value="breakdown" className="space-y-4">
                {scoreBreakdown.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className={cn(
                        "text-sm font-medium",
                        item.score >= 80 ? "text-seo-green" : 
                        item.score >= 60 ? "text-seo-yellow" : "text-seo-red"
                      )}>
                        {item.score}/100
                      </span>
                    </div>
                    <Progress 
                      value={item.score} 
                      className={cn(
                        item.score >= 80 ? "bg-seo-green/20" : 
                        item.score >= 60 ? "bg-seo-yellow/20" : "bg-seo-red/20"
                      )}
                    />
                    <p className="text-xs text-muted-foreground">
                      Weight: {item.weight}% of total score
                    </p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recommendations" className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{rec.title}</h4>
                      <span className={cn(
                        "text-xs font-medium px-1.5 py-0.5 rounded-full",
                        rec.impact === "High" ? "bg-seo-red/10 text-seo-red" : 
                        rec.impact === "Medium" ? "bg-seo-yellow/10 text-seo-yellow" : 
                        "bg-seo-green/10 text-seo-green"
                      )}>
                        {rec.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Take Action
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
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
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full"
          onClick={() => setIsDetailsOpen(true)}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          View Detailed Analysis
        </Button>
      </CardContent>
    </Card>
  );
}
