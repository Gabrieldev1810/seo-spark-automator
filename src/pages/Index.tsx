
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { SeoScoreCard } from "@/components/dashboard/SeoScoreCard";
import { WebVitalsOverview } from "@/components/dashboard/WebVitalsOverview";
import { KeywordPerformance } from "@/components/dashboard/KeywordPerformance";
import { EEATStatus } from "@/components/dashboard/EEATStatus";
import { VoiceSearchReadiness } from "@/components/dashboard/VoiceSearchReadiness";
import { MobileOptimization } from "@/components/dashboard/MobileOptimization";
import { LocalSeoOverview } from "@/components/dashboard/LocalSeoOverview";
import { 
  Globe, 
  BarChart2, 
  ArrowUp,
  Smartphone,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SEO Dashboard</h1>
            <p className="text-muted-foreground">
              Overall performance and key metrics for example.com
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              <span>View Site</span>
            </Button>
            <Button className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              <span>Fix Issues</span>
            </Button>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Organic Traffic"
            value="14,582"
            icon={<Globe className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 12, isPositive: true }}
          />
          <OverviewCard
            title="Keyword Rankings"
            value="156"
            icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 8, isPositive: true }}
          />
          <OverviewCard
            title="Backlinks"
            value="723"
            icon={<ExternalLink className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 3, isPositive: true }}
          />
          <OverviewCard
            title="Mobile Traffic"
            value="62%"
            icon={<Smartphone className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* SEO Score and Web Vitals */}
        <div className="grid gap-4 md:grid-cols-2">
          <SeoScoreCard score={78} previousScore={72} />
          <WebVitalsOverview />
        </div>

        {/* Performance Chart */}
        <div className="grid gap-4">
          <KeywordPerformance />
        </div>

        {/* E-E-A-T, Voice, Mobile, Local */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <EEATStatus />
          <VoiceSearchReadiness />
          <MobileOptimization />
          <LocalSeoOverview />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
