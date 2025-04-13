
// Service for fetching and analyzing web vitals data
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface WebVitalMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: "good" | "needs-improvement" | "poor";
}

interface PerformanceDataResponse {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

// This would normally fetch from Google Search Console API or similar
// For demo purposes, we'll simulate with more realistic data patterns
export const fetchPerformanceData = async (url: string): Promise<PerformanceDataResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate semi-random but realistic values
  const todayMultiplier = (new Date().getDate() % 5) / 10 + 0.8; 
  
  return {
    lcp: 2.1 * todayMultiplier,
    fid: 75 * todayMultiplier, 
    cls: 0.12 * todayMultiplier,
    ttfb: 350 * todayMultiplier,
  };
};

export const getStatusFromValue = (
  value: number, 
  target: number, 
  higherIsBetter: boolean = false
): "good" | "needs-improvement" | "poor" => {
  const percentage = value / target;
  
  if (higherIsBetter) {
    if (percentage >= 1) return "good";
    if (percentage >= 0.7) return "needs-improvement";
    return "poor";
  } else {
    if (percentage <= 0.8) return "good";
    if (percentage <= 1) return "needs-improvement";
    return "poor";
  }
};

// Hook for getting live web vitals data
export const useWebVitals = (url: string = "example.com") => {
  const [data, setData] = useState<WebVitalMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getWebVitals = async () => {
      try {
        setIsLoading(true);
        const performanceData = await fetchPerformanceData(url);
        
        // Convert raw data to WebVitalMetric format
        const webVitals: WebVitalMetric[] = [
          {
            name: "LCP",
            value: performanceData.lcp,
            target: 2.5,
            unit: "s",
            status: getStatusFromValue(performanceData.lcp, 2.5, false),
          },
          {
            name: "FID",
            value: performanceData.fid,
            target: 100,
            unit: "ms",
            status: getStatusFromValue(performanceData.fid, 100, false),
          },
          {
            name: "CLS",
            value: performanceData.cls,
            target: 0.1,
            unit: "",
            status: getStatusFromValue(performanceData.cls, 0.1, false),
          },
          {
            name: "TTFB",
            value: performanceData.ttfb,
            target: 500,
            unit: "ms",
            status: getStatusFromValue(performanceData.ttfb, 500, false),
          },
        ];
        
        setData(webVitals);
        setError(null);
      } catch (err) {
        console.error("Error fetching web vitals:", err);
        setError("Failed to fetch performance data");
        toast({
          title: "Error",
          description: "Could not fetch web vitals data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getWebVitals();
    
    // Refresh data every 5 minutes
    const interval = setInterval(getWebVitals, 300000);
    
    return () => clearInterval(interval);
  }, [url, toast]);

  return { data, isLoading, error };
};
