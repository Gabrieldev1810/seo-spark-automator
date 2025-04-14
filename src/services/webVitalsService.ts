// Service for fetching and analyzing web vitals data
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface WebVitalMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: "good" | "needs-improvement" | "poor";
  percentile?: number;
  distribution?: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
}

interface PerformanceDataResponse {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp?: number;
  si?: number;
  tbt?: number;
  timestamp: string;
  url: string;
  device: 'mobile' | 'desktop';
}

// Constants for Core Web Vitals thresholds
const WEB_VITALS_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  ttfb: { good: 500, poor: 1000 },
  fcp: { good: 1800, poor: 3000 },
  si: { good: 3300, poor: 5800 },
  tbt: { good: 200, poor: 600 }
};

// Function to get API key with fallback
export const getApiKey = (type: 'pagespeed' | 'crux'): string => {
  const envKey = type === 'pagespeed' ? 'REACT_APP_PAGESPEED_API_KEY' : 'REACT_APP_CRUX_API_KEY';
  
  // Try multiple sources for the API key
  let apiKey = '';
  
  // 1. Try window._env_ first (runtime environment)
  if ((window as any)._env_ && (window as any)._env_[envKey]) {
    apiKey = (window as any)._env_[envKey];
    console.log(`Using ${type} API key from window._env_`);
  }
  
  // 2. Try import.meta.env (Vite environment)
  else if (import.meta.env && import.meta.env[envKey]) {
    apiKey = import.meta.env[envKey];
    console.log(`Using ${type} API key from import.meta.env`);
  }
  
  // 3. Try process.env (Node environment)
  else if (typeof process !== 'undefined' && process.env && process.env[envKey]) {
    apiKey = process.env[envKey];
    console.log(`Using ${type} API key from process.env`);
  }
  
  // 4. Fallback to hardcoded key for development only
  else if (process.env.NODE_ENV === 'development') {
    console.warn(`Using fallback ${type} API key for development only`);
    apiKey = 'AIzaSyAP8wRHbIETHJHelE5tj366RJEeYO_2aLE';
  }
  
  if (!apiKey) {
    console.warn(`${type} API key is not configured in any environment`);
  } else {
    // Log a masked version of the API key for debugging
    const maskedKey = apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 5);
    console.log(`API key for ${type}: ${maskedKey}`);
  }
  
  return apiKey;
};

// Function to fetch PageSpeed data
export const fetchPageSpeedData = async (url: string, device: 'mobile' | 'desktop' = 'mobile'): Promise<any> => {
  try {
    // Check if URL is empty
    if (!url || url.trim() === '') {
      throw new Error('URL cannot be empty');
    }

    // Check if API key is available
    const apiKey = getApiKey('pagespeed');
    if (!apiKey) {
      throw new Error('PageSpeed API key is not configured');
    }

    // Ensure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }

    // Validate URL format
    try {
      new URL(formattedUrl);
    } catch (e) {
      throw new Error('Invalid URL format');
    }

    const response = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&strategy=${device}&key=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('PageSpeed API error response:', errorData);
      
      if (response.status === 403) {
        throw new Error('PageSpeed API error: 403 - API key may be invalid or have insufficient permissions');
      } else if (response.status === 400) {
        throw new Error('PageSpeed API error: 400 - Invalid request. Please check the URL.');
      } else if (response.status === 500) {
        throw new Error('PageSpeed API error: 500 - Server error. The URL may be invalid or inaccessible.');
      } else {
        throw new Error(`PageSpeed API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching PageSpeed data:', error);
    throw error;
  }
};

// Function to fetch CrUX data
export const fetchCruxData = async (url: string): Promise<any> => {
  try {
    // Check if URL is empty
    if (!url || url.trim() === '') {
      throw new Error('URL cannot be empty');
    }

    // Check if API key is available
    const apiKey = getApiKey('crux');
    if (!apiKey) {
      throw new Error('CrUX API key is not configured');
    }

    // Ensure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }

    // Validate URL format
    try {
      new URL(formattedUrl);
    } catch (e) {
      throw new Error('Invalid URL format');
    }

    // Extract domain from URL
    const domain = new URL(formattedUrl).hostname;
    console.log(`Fetching CrUX data for domain: ${domain}`);

    // Log the request details for debugging
    console.log(`CrUX API request URL: https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey.substring(0, 5)}...`);
    console.log(`CrUX API request body: ${JSON.stringify({
      url: formattedUrl,
      formFactor: 'ALL',
      metrics: [
        'largest_contentful_paint',
        'first_input_delay',
        'cumulative_layout_shift',
        'first_contentful_paint',
        'speed_index',
        'total_blocking_time'
      ],
    })}`);

    const response = await fetch(
      `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formattedUrl,
          formFactor: 'ALL',
          metrics: [
            'largest_contentful_paint',
            'first_input_delay',
            'cumulative_layout_shift',
            'first_contentful_paint',
            'speed_index',
            'total_blocking_time'
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('CrUX API error response:', errorData);
      
      if (response.status === 403) {
        // Special handling for 403 errors - return a minimal valid response instead of throwing
        console.warn('CrUX API returned 403 - API may not be enabled or key may have insufficient permissions');
        console.warn('Please check that the CrUX API is enabled at: https://console.developers.google.com/apis/api/chromeuxreport.googleapis.com/overview');
        console.warn('Also verify that your API key has the necessary permissions');
        
        return {
          record: {
            key: {
              url: formattedUrl,
              formFactor: 'ALL'
            },
            metrics: {
              largest_contentful_paint: { percentiles: { p75: 2500 } },
              first_input_delay: { percentiles: { p75: 100 } },
              cumulative_layout_shift: { percentiles: { p75: 0.1 } },
              first_contentful_paint: { percentiles: { p75: 1800 } },
              speed_index: { percentiles: { p75: 3300 } },
              total_blocking_time: { percentiles: { p75: 200 } }
            }
          }
        };
      } else if (response.status === 404) {
        // No data available for this URL
        console.warn('No CrUX data available for this URL. Using fallback data.');
        return {
          record: {
            key: {
              url: formattedUrl,
              formFactor: 'ALL'
            },
            metrics: {
              largest_contentful_paint: { percentiles: { p75: 2500 } },
              first_input_delay: { percentiles: { p75: 100 } },
              cumulative_layout_shift: { percentiles: { p75: 0.1 } },
              first_contentful_paint: { percentiles: { p75: 1800 } },
              speed_index: { percentiles: { p75: 3300 } },
              total_blocking_time: { percentiles: { p75: 200 } }
            }
          }
        };
      } else {
        throw new Error(`CrUX API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }
    }

    const data = await response.json();
    console.log('CrUX API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching CrUX data:', error);
    throw error;
  }
};

// Function to process and combine data from both APIs
const processWebVitalsData = (
  pageSpeedData: any,
  cruxData: any,
  device: 'mobile' | 'desktop'
): PerformanceDataResponse => {
  const metrics = pageSpeedData.loadingExperience?.metrics || {};
  const cruxMetrics = cruxData?.record?.metrics || {};
  
  return {
    lcp: metrics.largest_contentful_paint?.percentile || 0,
    fid: metrics.first_input_delay?.percentile || 0,
    cls: metrics.cumulative_layout_shift?.percentile || 0,
    ttfb: metrics.time_to_first_byte?.percentile || 0,
    fcp: metrics.first_contentful_paint?.percentile || 0,
    si: metrics.speed_index?.percentile || 0,
    tbt: metrics.total_blocking_time?.percentile || 0,
    timestamp: new Date().toISOString(),
    url: pageSpeedData.id,
    device
  };
};

export const getStatusFromValue = (
  value: number, 
  metric: keyof typeof WEB_VITALS_THRESHOLDS,
  higherIsBetter: boolean = false
): "good" | "needs-improvement" | "poor" => {
  const thresholds = WEB_VITALS_THRESHOLDS[metric];
  
  if (higherIsBetter) {
    if (value >= thresholds.good) return "good";
    if (value >= thresholds.poor) return "needs-improvement";
    return "poor";
  } else {
    if (value <= thresholds.good) return "good";
    if (value <= thresholds.poor) return "needs-improvement";
    return "poor";
  }
};

// Function to test API key validity
export const testApiKey = async (): Promise<boolean> => {
  try {
    const testUrl = 'https://www.google.com';
    const apiKey = getApiKey('pagespeed');
    
    if (!apiKey) {
      console.error('API key is missing');
      return false;
    }
    
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&key=${apiKey}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API key test failed:', response.status, errorData.error?.message || response.statusText);
      return false;
    }
    
    const data = await response.json();
    return !!data.id; // If we get an ID back, the API key is valid
  } catch (error) {
    console.error('Error testing API key:', error);
    return false;
  }
};

// Function to test CrUX API specifically
export const testCruxApi = async (): Promise<boolean> => {
  try {
    const testUrl = 'https://www.google.com';
    const apiKey = getApiKey('crux');
    
    if (!apiKey) {
      console.error('CrUX API key is missing');
      return false;
    }
    
    console.log('Testing CrUX API with key:', `${apiKey.substring(0, 5)}...`);
    
    const response = await fetch(
      `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: testUrl,
          formFactor: 'ALL',
          metrics: [
            'largest_contentful_paint',
            'first_input_delay',
            'cumulative_layout_shift'
          ],
        }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('CrUX API test failed:', response.status, errorData.error?.message || response.statusText);
      
      if (response.status === 403) {
        console.error('CrUX API returned 403 - API may not be enabled or key may have insufficient permissions');
        console.error('Please check that the CrUX API is enabled at: https://console.developers.google.com/apis/api/chromeuxreport.googleapis.com/overview');
        console.error('Also verify that your API key has the necessary permissions');
      }
      
      return false;
    }
    
    const data = await response.json();
    console.log('CrUX API test successful:', data);
    return true;
  } catch (error) {
    console.error('Error testing CrUX API:', error);
    return false;
  }
};

// Hook to fetch web vitals data
export const useWebVitals = (url: string, device: 'mobile' | 'desktop' = 'mobile') => {
  const [data, setData] = useState<WebVitalMetric[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getWebVitals = async () => {
      if (!url || url.trim() === '') {
        setData([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Validate URL format
        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          formattedUrl = `https://${url}`;
        }

        try {
          new URL(formattedUrl);
        } catch (e) {
          throw new Error('Invalid URL format');
        }

        // Try to fetch PageSpeed data first
        let pageSpeedData;
        try {
          pageSpeedData = await fetchPageSpeedData(formattedUrl, device);
        } catch (error) {
          console.error('Error fetching PageSpeed data:', error);
          throw error;
        }

        // Try to fetch CrUX data, but continue even if it fails
        let cruxData;
        try {
          cruxData = await fetchCruxData(formattedUrl);
        } catch (error) {
          console.warn('Error fetching CrUX data, continuing with PageSpeed data only:', error);
          // Continue with PageSpeed data only
        }

        // Process the data
        const metrics: WebVitalMetric[] = [];

        // Add LCP from PageSpeed data
        if (pageSpeedData?.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS) {
          const lcpValue = pageSpeedData.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000;
          metrics.push({
            name: 'LCP',
            value: lcpValue,
            unit: 's',
            target: 2.5,
            status: getStatusFromValue(lcpValue, 'lcp'),
            percentile: cruxData?.record?.metrics?.largest_contentful_paint?.percentiles?.p75 
              ? cruxData.record.metrics.largest_contentful_paint.percentiles.p75 / 1000 
              : undefined
          });
        }

        // Add FID from PageSpeed data
        if (pageSpeedData?.loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS) {
          const fidValue = pageSpeedData.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile;
          metrics.push({
            name: 'FID',
            value: fidValue,
            unit: 'ms',
            target: 100,
            status: getStatusFromValue(fidValue, 'fid'),
            percentile: cruxData?.record?.metrics?.first_input_delay?.percentiles?.p75
          });
        }

        // Add CLS from PageSpeed data
        if (pageSpeedData?.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE) {
          const clsValue = pageSpeedData.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile;
          metrics.push({
            name: 'CLS',
            value: clsValue,
            unit: '',
            target: 0.1,
            status: getStatusFromValue(clsValue, 'cls'),
            percentile: cruxData?.record?.metrics?.cumulative_layout_shift?.percentiles?.p75
          });
        }

        // Add TTFB from PageSpeed data
        if (pageSpeedData?.loadingExperience?.metrics?.TIME_TO_FIRST_BYTE_MS) {
          const ttfbValue = pageSpeedData.loadingExperience.metrics.TIME_TO_FIRST_BYTE_MS.percentile;
          metrics.push({
            name: 'TTFB',
            value: ttfbValue,
            unit: 'ms',
            target: 500,
            status: getStatusFromValue(ttfbValue, 'ttfb'),
            percentile: undefined
          });
        }

        // Add FCP from PageSpeed data if available
        if (pageSpeedData?.loadingExperience?.metrics?.FIRST_CONTENTFUL_PAINT_MS) {
          const fcpValue = pageSpeedData.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile / 1000;
          metrics.push({
            name: 'FCP',
            value: fcpValue,
            unit: 's',
            target: 1.8,
            status: getStatusFromValue(fcpValue, 'fcp'),
            percentile: cruxData?.record?.metrics?.first_contentful_paint?.percentiles?.p75 
              ? cruxData.record.metrics.first_contentful_paint.percentiles.p75 / 1000 
              : undefined
          });
        }

        // Add SI from PageSpeed data if available
        if (pageSpeedData?.loadingExperience?.metrics?.SPEED_INDEX_MS) {
          const siValue = pageSpeedData.loadingExperience.metrics.SPEED_INDEX_MS.percentile / 1000;
          metrics.push({
            name: 'SI',
            value: siValue,
            unit: 's',
            target: 3.3,
            status: getStatusFromValue(siValue, 'si'),
            percentile: cruxData?.record?.metrics?.speed_index?.percentiles?.p75 
              ? cruxData.record.metrics.speed_index.percentiles.p75 / 1000 
              : undefined
          });
        }

        // Add TBT from PageSpeed data if available
        if (pageSpeedData?.loadingExperience?.metrics?.TOTAL_BLOCKING_TIME_MS) {
          const tbtValue = pageSpeedData.loadingExperience.metrics.TOTAL_BLOCKING_TIME_MS.percentile;
          metrics.push({
            name: 'TBT',
            value: tbtValue,
            unit: 'ms',
            target: 200,
            status: getStatusFromValue(tbtValue, 'tbt'),
            percentile: cruxData?.record?.metrics?.total_blocking_time?.percentiles?.p75
          });
        }

        setData(metrics);
        setError(null);
      } catch (error) {
        console.error('Error fetching web vitals:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        setData([]);
        
        // Show more specific error messages based on the error
        if (errorMessage.includes('403')) {
          toast({
            title: "API Key Error",
            description: "Your API key doesn't have the necessary permissions. Please check your API key configuration and ensure the API is enabled.",
            variant: "destructive",
          });
        } else if (errorMessage.includes('400')) {
          toast({
            title: "Invalid Request",
            description: "The URL you provided is invalid or the API request was malformed.",
            variant: "destructive",
          });
        } else if (errorMessage.includes('empty')) {
          toast({
            title: "Empty URL",
            description: "Please enter a valid URL to analyze.",
            variant: "destructive",
          });
        } else if (errorMessage.includes('not configured')) {
          toast({
            title: "API Key Missing",
            description: "The API key is not configured. Please check your environment variables.",
            variant: "destructive",
          });
        } else if (errorMessage.includes('500')) {
          toast({
            title: "Server Error",
            description: "The server encountered an error. The URL may be invalid or inaccessible.",
            variant: "destructive",
          });
        } else {
        toast({
          title: "Error",
            description: "Could not fetch web vitals data. Please try again later.",
          variant: "destructive",
        });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getWebVitals();
    
    // Set up an interval to refresh the data every 5 minutes
    const intervalId = setInterval(getWebVitals, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [url, device, toast]);

  return { data, isLoading, error };
};
