
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

export function LocalSeoOverview() {
  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>Local SEO</CardTitle>
        <CardDescription>Google My Business Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-seo-blue" />
              <span className="text-sm font-medium">Map Views</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">1,245</span>
              <span className="text-xs text-seo-green">+12%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-seo-yellow" />
              <span className="text-sm font-medium">Avg. Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">4.7</span>
              <span className="text-xs text-seo-green">+0.2</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Top Local Keywords</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-xs">SEO agency [city]</p>
                <p className="text-xs text-muted-foreground">#3 position</p>
              </div>
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-xs">Local SEO services</p>
                <p className="text-xs text-muted-foreground">#5 position</p>
              </div>
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-xs">Best SEO company</p>
                <p className="text-xs text-muted-foreground">#8 position</p>
              </div>
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-xs">SEO specialist near me</p>
                <p className="text-xs text-muted-foreground">#11 position</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
