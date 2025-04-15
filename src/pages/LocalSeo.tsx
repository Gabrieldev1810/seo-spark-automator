
import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Star } from "lucide-react";
import { LocalSeoAgent } from "@/services/agents/localSeoAgent";

const LocalSeo = () => {
  const [businessName, setBusinessName] = useState("Example Business");
  const [location, setLocation] = useState("Los Angeles, CA");
  const [isLoading, setIsLoading] = useState(false);
  const [localSeoData, setLocalSeoData] = useState<any>(null);

  const localSeoAgent = new LocalSeoAgent();

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const data = await localSeoAgent.analyzeLocalPresence(location);
      setLocalSeoData(data);
    } catch (error) {
      console.error("Error analyzing local SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Local SEO</h1>
          <p className="text-muted-foreground">
            Optimize your business for local search visibility
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Local Business Profile</CardTitle>
            <CardDescription>
              Enter your business information to analyze local SEO performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Name</label>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter business name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <Button onClick={handleAnalyze} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? "Analyzing..." : "Analyze Local Presence"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {localSeoData && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Google Business Ranking
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{localSeoData.googleBusinessRanking}</div>
                <p className="text-xs text-muted-foreground">
                  Percentile ranking among similar businesses
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Local Citations
                </CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{localSeoData.localCitations}</div>
                <p className="text-xs text-muted-foreground">
                  Mentions across directories and platforms
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Review Score
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parseFloat(localSeoData.reviewScore)}</div>
                <p className="text-xs text-muted-foreground">
                  Average rating across platforms
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Review Count
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parseFloat(localSeoData.reviewCount)}</div>
                <p className="text-xs text-muted-foreground">
                  Total number of reviews
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional content */}
        <Card>
          <CardHeader>
            <CardTitle>Local SEO Optimization Tips</CardTitle>
            <CardDescription>
              Improve your local search visibility with these strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Ensure NAP (Name, Address, Phone) consistency across all listings</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Actively request and respond to customer reviews</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Optimize Google Business Profile with accurate business categories</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Create local content targeting neighborhood and city-specific keywords</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Implement structured data markup for local businesses</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LocalSeo;
