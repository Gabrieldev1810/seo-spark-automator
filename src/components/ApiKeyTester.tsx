import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { testApiKey, getApiKey } from '@/services/webVitalsService';

export const ApiKeyTester: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [isTestingCrux, setIsTestingCrux] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [cruxTestResult, setCruxTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [apiKeyInfo, setApiKeyInfo] = useState<{
    pagespeed: string;
    crux: string;
  }>({
    pagespeed: '',
    crux: ''
  });

  useEffect(() => {
    // Get API key information
    const pagespeedKey = getApiKey('pagespeed');
    const cruxKey = getApiKey('crux');
    
    setApiKeyInfo({
      pagespeed: pagespeedKey ? `${pagespeedKey.substring(0, 5)}...${pagespeedKey.substring(pagespeedKey.length - 5)}` : 'Not configured',
      crux: cruxKey ? `${cruxKey.substring(0, 5)}...${cruxKey.substring(cruxKey.length - 5)}` : 'Not configured'
    });
  }, []);

  const handleTestApiKey = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const result = await testApiKey();
      setTestResult({
        success: result,
        message: result 
          ? 'API key is valid and working correctly.' 
          : 'API key test failed. Please check your API key configuration.'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestCruxApi = async () => {
    setIsTestingCrux(true);
    setCruxTestResult(null);
    
    try {
      const testUrl = 'https://www.google.com';
      const apiKey = getApiKey('crux');
      
      if (!apiKey) {
        setCruxTestResult({
          success: false,
          message: 'CrUX API key is missing'
        });
        return;
      }
      
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
        let errorMessage = `CrUX API test failed: ${response.status}`;
        
        if (errorData.error?.message) {
          errorMessage += ` - ${errorData.error.message}`;
        }
        
        if (response.status === 403) {
          errorMessage += ' - API may not be enabled or key may have insufficient permissions';
        }
        
        setCruxTestResult({
          success: false,
          message: errorMessage
        });
        return;
      }
      
      const data = await response.json();
      setCruxTestResult({
        success: true,
        message: 'CrUX API is working correctly.'
      });
    } catch (error) {
      setCruxTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      setIsTestingCrux(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>API Key Tester</CardTitle>
        <CardDescription>
          Test your API key configuration and check API status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">PageSpeed API Key</h3>
            <p className="text-sm text-muted-foreground">{apiKeyInfo.pagespeed}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">CrUX API Key</h3>
            <p className="text-sm text-muted-foreground">{apiKeyInfo.crux}</p>
          </div>
          
          {testResult && (
            <Alert variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>PageSpeed API: {testResult.success ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{testResult.message}</AlertDescription>
            </Alert>
          )}
          
          {cruxTestResult && (
            <Alert variant={cruxTestResult.success ? "default" : "destructive"}>
              {cruxTestResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>CrUX API: {cruxTestResult.success ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{cruxTestResult.message}</AlertDescription>
            </Alert>
          )}
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>CrUX API Information</AlertTitle>
            <AlertDescription>
              If you're seeing 403 errors for the CrUX API, please ensure:
              <ul className="list-disc pl-5 mt-2">
                <li>The CrUX API is enabled in your Google Cloud Console</li>
                <li>Your API key has the necessary permissions</li>
                <li>You've waited a few minutes after enabling the API</li>
              </ul>
              <p className="mt-2">
                <a 
                  href="https://console.developers.google.com/apis/api/chromeuxreport.googleapis.com/overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Go to CrUX API Console
                </a>
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleTestApiKey} 
          disabled={isTesting}
          className="w-full"
        >
          {isTesting ? 'Testing...' : 'Test PageSpeed API Key'}
        </Button>
        
        <Button 
          onClick={handleTestCruxApi} 
          disabled={isTestingCrux}
          variant="outline"
          className="w-full"
        >
          {isTestingCrux ? 'Testing...' : 'Test CrUX API'}
        </Button>
      </CardFooter>
    </Card>
  );
}; 