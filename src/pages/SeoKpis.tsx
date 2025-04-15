
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SeoKpi, KpiCategory, KpiMetric } from "@/components/seo/SeoKpi";
import { 
  Eye, 
  BarChart2, 
  MousePointerClick, 
  ShoppingCart, 
  ArrowDownRight, 
  Gauge, 
  MapPin, 
  Sparkles,
  Search,
  Percent
} from "lucide-react";

const generateMockTrendData = (baseline: number, volatility: number = 0.2, points: number = 12) => {
  const data = [];
  let currentValue = baseline;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() * 2 - 1) * volatility * baseline;
    currentValue = Math.max(0, currentValue + change);
    
    const date = new Date();
    date.setMonth(date.getMonth() - (points - i - 1));
    
    data.push({
      date: date.toISOString().slice(0, 10),
      value: Math.round(currentValue * 100) / 100
    });
  }
  
  return data;
};

const seoCategories: KpiCategory[] = [
  {
    name: "Visibility & Rankings",
    description: "Metrics related to how well your site appears in search results",
    metrics: [
      {
        name: "Organic Visibility",
        description: "Measures how often website pages appear in SERPs",
        value: 25489,
        previousValue: 23200,
        change: 9.8,
        isPositive: true,
        unit: "",
        threshold: 30000,
        formula: "Total impressions across all pages",
        data: generateMockTrendData(25000, 0.1),
        icon: <Eye className="h-4 w-4" />,
        suggestions: [
          "Focus on improving title tags for pages with high impressions but low CTR"
        ],
        alertThreshold: 15000
      },
      {
        name: "Keyword Rankings",
        description: "Current position of targeted keywords in search engines",
        value: 18.2,
        previousValue: 22.7,
        change: 19.8,
        isPositive: true,
        unit: "",
        threshold: 10,
        formula: "Average position of top 100 tracked keywords",
        data: generateMockTrendData(20, 0.15, 12),
        icon: <BarChart2 className="h-4 w-4" />,
        suggestions: [
          "13 keywords jumped to page 1 recently - analyze content patterns"
        ],
        alertThreshold: 30
      },
      {
        name: "Organic CTR",
        description: "Percentage of searchers who clicked on the result",
        value: 3.8,
        previousValue: 3.2,
        change: 18.7,
        isPositive: true,
        unit: "%",
        threshold: 5,
        formula: "(Clicks / Impressions) × 100",
        data: generateMockTrendData(3.5, 0.08),
        icon: <MousePointerClick className="h-4 w-4" />,
        suggestions: [
          "Improve meta descriptions on pages with CTR below 1.5%"
        ],
        alertThreshold: 2
      },
      {
        name: "Featured Snippets",
        description: "Number of queries where site appears in featured snippets",
        value: 13,
        previousValue: 8,
        change: 62.5,
        isPositive: true,
        unit: "",
        threshold: 25,
        formula: "Count of queries with position 0",
        data: generateMockTrendData(10, 0.2),
        icon: <Search className="h-4 w-4" />,
        suggestions: [
          "Create more Q&A content to capture additional featured snippets"
        ],
        alertThreshold: 5
      }
    ]
  },
  {
    name: "User Engagement & Conversions",
    description: "How users interact with your site after clicking from search",
    metrics: [
      {
        name: "Conversions",
        description: "Completion of desired goals on the site",
        value: 342,
        previousValue: 298,
        change: 14.8,
        isPositive: true,
        unit: "",
        threshold: 500,
        formula: "Total conversion events from organic search",
        data: generateMockTrendData(320, 0.15),
        icon: <ShoppingCart className="h-4 w-4" />,
        suggestions: [
          "Add testimonials near checkout to improve conversion rate"
        ],
        alertThreshold: 200
      },
      {
        name: "Bounce Rate",
        description: "Percentage of users who leave without interacting further",
        value: 58.2,
        previousValue: 62.7,
        change: 7.2,
        isPositive: true,
        unit: "%",
        threshold: 40,
        formula: "(Single page sessions / Total sessions) × 100",
        data: generateMockTrendData(60, 0.08),
        icon: <ArrowDownRight className="h-4 w-4" />,
        suggestions: [
          "Add more internal links to high-bounce landing pages"
        ],
        alertThreshold: 70
      },
      {
        name: "Conversion Rate",
        description: "Percentage of organic visitors who convert",
        value: 2.7,
        previousValue: 2.1,
        change: 28.6,
        isPositive: true,
        unit: "%",
        threshold: 4,
        formula: "(Conversions / Organic Sessions) × 100",
        data: generateMockTrendData(2.4, 0.1),
        icon: <Percent className="h-4 w-4" />,
        suggestions: [
          "Optimize landing page forms to reduce abandonment"
        ],
        alertThreshold: 1.5
      },
      {
        name: "Pages Per Session",
        description: "Average number of pages viewed per session",
        value: 1.8,
        previousValue: 1.6,
        change: 12.5,
        isPositive: true,
        unit: "",
        threshold: 3,
        formula: "Total pageviews / Total sessions",
        data: generateMockTrendData(1.7, 0.07),
        icon: <Eye className="h-4 w-4" />,
        suggestions: [
          "Improve internal linking structure to encourage exploration"
        ],
        alertThreshold: 1.2
      }
    ]
  },
  {
    name: "Technical SEO & Page Experience",
    description: "Site performance and technical factors affecting search visibility",
    metrics: [
      {
        name: "Core Web Vitals",
        description: "Site load and user interactivity experience",
        value: 87,
        previousValue: 74,
        change: 17.6,
        isPositive: true,
        unit: "/100",
        threshold: 90,
        formula: "Aggregate score from LCP, CLS, FID",
        data: generateMockTrendData(80, 0.05),
        icon: <Gauge className="h-4 w-4" />,
        suggestions: [
          "Optimize LCP by reducing image sizes on landing pages"
        ],
        alertThreshold: 60
      },
      {
        name: "Local Pack Visibility",
        description: "Appearance in Google Maps/3-Pack for geo queries",
        value: 64,
        previousValue: 58,
        change: 10.3,
        isPositive: true,
        unit: "%",
        threshold: 80,
        formula: "% of geo queries where business appears in Local Pack",
        data: generateMockTrendData(60, 0.1),
        icon: <MapPin className="h-4 w-4" />,
        suggestions: [
          "Add more location-specific content to improve local relevance"
        ],
        alertThreshold: 40
      },
      {
        name: "AI-Search Inclusion",
        description: "Visibility in generative AI answers",
        value: 23,
        previousValue: 14,
        change: 64.3,
        isPositive: true,
        unit: "%",
        threshold: 50,
        formula: "% of queries where content appears in AI answers",
        data: generateMockTrendData(20, 0.25),
        icon: <Sparkles className="h-4 w-4" />,
        suggestions: [
          "Implement FAQ schema markup to increase AI answer visibility"
        ],
        alertThreshold: 10
      },
      {
        name: "Mobile Usability",
        description: "Pages without mobile usability issues",
        value: 94.7,
        previousValue: 88.3,
        change: 7.2,
        isPositive: true,
        unit: "%",
        threshold: 100,
        formula: "(Pages without mobile issues / Total pages) × 100",
        data: generateMockTrendData(90, 0.03),
        icon: <Gauge className="h-4 w-4" />,
        suggestions: [
          "Fix tap target size issues on product pages"
        ],
        alertThreshold: 80
      }
    ]
  }
];

const SeoKpis = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO KPI Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive metrics tracking search visibility, engagement, and technical performance
          </p>
        </div>
        
        {seoCategories.map((category) => (
          <SeoKpi 
            key={category.name} 
            category={category} 
            showCharts={true} 
          />
        ))}
      </div>
    </AppLayout>
  );
};

export default SeoKpis;
