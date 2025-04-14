
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Search, 
  FileCheck,
  ExternalLink, 
  Award, 
  Star, 
  User, 
  Book,
  HelpCircle,
  FileText,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight
} from "lucide-react";

const EEAT = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    experienceScore: number;
    expertiseScore: number;
    authoritativeness: number;
    trustworthiness: number;
    overallEeatScore: number;
    authorCredentials: boolean;
    expertContent: boolean;
    citations: boolean;
    factChecking: boolean;
    aboutPage: boolean;
    bylines: boolean;
    issues: Array<{
      category: string;
      severity: "high" | "medium" | "low";
      description: string;
      recommendation: string;
    }>;
  }>(null);

  const handleAnalyzeEEAT = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResults({
        experienceScore: Math.floor(Math.random() * 20) + 75, // 75-95 range
        expertiseScore: Math.floor(Math.random() * 25) + 70, // 70-95 range
        authoritativeness: Math.floor(Math.random() * 30) + 65, // 65-95 range
        trustworthiness: Math.floor(Math.random() * 35) + 60, // 60-95 range
        overallEeatScore: Math.floor(Math.random() * 25) + 70, // 70-95 range
        authorCredentials: Math.random() > 0.3,
        expertContent: Math.random() > 0.4,
        citations: Math.random() > 0.5,
        factChecking: Math.random() > 0.6,
        aboutPage: Math.random() > 0.2,
        bylines: Math.random() > 0.3,
        issues: [
          {
            category: "Trustworthiness",
            severity: "high",
            description: "Content lacks citations for factual claims",
            recommendation: "Add citations from reputable sources for all factual claims and statistics"
          },
          {
            category: "Expertise",
            severity: "medium",
            description: "Author credentials aren't clearly visible",
            recommendation: "Add author bios with qualifications, experience, and credentials for all content"
          },
          {
            category: "Authoritativeness",
            severity: "medium",
            description: "Limited backlinks from authoritative sources",
            recommendation: "Build relationships with industry authorities and create link-worthy content"
          },
          {
            category: "Experience",
            severity: "low",
            description: "Content lacks first-hand experience signals",
            recommendation: "Include more personal anecdotes, case studies, and practical insights from actual experience"
          },
          {
            category: "Content Quality",
            severity: "high",
            description: "Some content appears outdated or inaccurate",
            recommendation: "Implement a regular content review and update process to ensure accuracy"
          },
        ]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "E-E-A-T analysis is ready",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-seo-green";
    if (score >= 70) return "text-seo-yellow";
    return "text-seo-red";
  };

  const getStatusIcon = (status: boolean) => (
    status ? 
      <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0" /> : 
      <XCircle className="h-5 w-5 text-seo-red flex-shrink-0" />
  );

  const getSeverityColor = (severity: string) => {
    if (severity === "low") return "text-seo-green";
    if (severity === "medium") return "text-seo-yellow";
    return "text-seo-red";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">E-E-A-T Compliance</h1>
          <p className="text-muted-foreground">
            Analyze your content's Experience, Expertise, Authoritativeness, and Trustworthiness
          </p>
        </div>

        <Alert className="bg-muted/50 border-seo-blue">
          <Shield className="h-4 w-4 text-seo-blue" />
          <AlertTitle>Google's Core Focus</AlertTitle>
          <AlertDescription>
            Google's Quality Rater Guidelines emphasize E-E-A-T as a key factor in assessing content quality, especially for YMYL (Your Money Your Life) topics.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>E-E-A-T Analyzer</CardTitle>
            <CardDescription>
              Enter your website URL to analyze E-E-A-T compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button 
                onClick={handleAnalyzeEEAT}
                disabled={!url || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {analysisResults && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Overall E-E-A-T Score</CardTitle>
                <CardDescription>
                  How well your content meets Google's quality standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-muted relative">
                    <div className="flex flex-col items-center">
                      <span className={`text-4xl font-bold ${getScoreColor(analysisResults.overallEeatScore)}`}>
                        {analysisResults.overallEeatScore}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                    <div className="absolute -bottom-4 bg-card px-3 py-1 rounded-full border shadow-sm">
                      <span className={`text-sm font-medium ${getScoreColor(analysisResults.overallEeatScore)}`}>
                        {analysisResults.overallEeatScore >= 85 ? "Excellent" : 
                         analysisResults.overallEeatScore >= 70 ? "Good" : "Needs Work"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Experience</span>
                      <span className={`text-sm font-medium ${getScoreColor(analysisResults.experienceScore)}`}>
                        {analysisResults.experienceScore}/100
                      </span>
                    </div>
                    <Progress 
                      value={analysisResults.experienceScore} 
                      className="h-2"
                      indicatorClassName={analysisResults.experienceScore >= 85 ? "bg-seo-green" : analysisResults.experienceScore >= 70 ? "bg-seo-yellow" : "bg-seo-red"}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Expertise</span>
                      <span className={`text-sm font-medium ${getScoreColor(analysisResults.expertiseScore)}`}>
                        {analysisResults.expertiseScore}/100
                      </span>
                    </div>
                    <Progress 
                      value={analysisResults.expertiseScore} 
                      className="h-2"
                      indicatorClassName={analysisResults.expertiseScore >= 85 ? "bg-seo-green" : analysisResults.expertiseScore >= 70 ? "bg-seo-yellow" : "bg-seo-red"}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Authoritativeness</span>
                      <span className={`text-sm font-medium ${getScoreColor(analysisResults.authoritativeness)}`}>
                        {analysisResults.authoritativeness}/100
                      </span>
                    </div>
                    <Progress 
                      value={analysisResults.authoritativeness} 
                      className="h-2"
                      indicatorClassName={analysisResults.authoritativeness >= 85 ? "bg-seo-green" : analysisResults.authoritativeness >= 70 ? "bg-seo-yellow" : "bg-seo-red"}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Trustworthiness</span>
                      <span className={`text-sm font-medium ${getScoreColor(analysisResults.trustworthiness)}`}>
                        {analysisResults.trustworthiness}/100
                      </span>
                    </div>
                    <Progress 
                      value={analysisResults.trustworthiness} 
                      className="h-2"
                      indicatorClassName={analysisResults.trustworthiness >= 85 ? "bg-seo-green" : analysisResults.trustworthiness >= 70 ? "bg-seo-yellow" : "bg-seo-red"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>E-E-A-T Compliance Checklist</CardTitle>
                  <CardDescription>
                    Key signals that demonstrate your E-E-A-T
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 border-b pb-2">
                      <User className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Author Credentials</p>
                        <p className="text-xs text-muted-foreground">Author bios with qualifications and expertise</p>
                      </div>
                      {getStatusIcon(analysisResults.authorCredentials)}
                    </div>
                    
                    <div className="flex items-start gap-2 border-b pb-2">
                      <Book className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Expert Content</p>
                        <p className="text-xs text-muted-foreground">Content demonstrates subject matter expertise</p>
                      </div>
                      {getStatusIcon(analysisResults.expertContent)}
                    </div>
                    
                    <div className="flex items-start gap-2 border-b pb-2">
                      <FileText className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Citations</p>
                        <p className="text-xs text-muted-foreground">References to authoritative sources for claims</p>
                      </div>
                      {getStatusIcon(analysisResults.citations)}
                    </div>
                    
                    <div className="flex items-start gap-2 border-b pb-2">
                      <FileCheck className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Fact Checking</p>
                        <p className="text-xs text-muted-foreground">Evidence of factual accuracy and verification</p>
                      </div>
                      {getStatusIcon(analysisResults.factChecking)}
                    </div>
                    
                    <div className="flex items-start gap-2 border-b pb-2">
                      <FileSpreadsheet className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">About Page</p>
                        <p className="text-xs text-muted-foreground">Transparent information about the site and team</p>
                      </div>
                      {getStatusIcon(analysisResults.aboutPage)}
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Clear Bylines</p>
                        <p className="text-xs text-muted-foreground">Articles have clear authorship attribution</p>
                      </div>
                      {getStatusIcon(analysisResults.bylines)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Issues & Recommendations</CardTitle>
                  <CardDescription>
                    Problems detected and how to fix them
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                        <div className={`p-2 rounded-full ${
                          issue.severity === "high" 
                            ? "bg-seo-red/10" 
                            : issue.severity === "medium" 
                            ? "bg-seo-yellow/10" 
                            : "bg-seo-green/10"
                        }`}>
                          {issue.severity === "high" && <AlertCircle className="h-5 w-5 text-seo-red" />}
                          {issue.severity === "medium" && <HelpCircle className="h-5 w-5 text-seo-yellow" />}
                          {issue.severity === "low" && <CheckCircle2 className="h-5 w-5 text-seo-green" />}
                        </div>
                        <div>
                          <div className="mb-1 flex items-center">
                            <h3 className="font-medium">
                              {issue.category}
                              <span className={`ml-2 text-xs font-normal px-2 py-0.5 rounded-full ${
                                issue.severity === "high" 
                                  ? "bg-seo-red/10 text-seo-red" 
                                  : issue.severity === "medium" 
                                  ? "bg-seo-yellow/10 text-seo-yellow" 
                                  : "bg-seo-green/10 text-seo-green"
                              }`}>
                                {issue.severity}
                              </span>
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                          <div className="mt-2 flex items-start gap-1">
                            <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                            <p className="text-sm">{issue.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Improve Your E-E-A-T</CardTitle>
                <CardDescription>
                  Key actions to boost your Experience, Expertise, Authoritativeness, and Trustworthiness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="h-5 w-5 text-seo-blue" />
                        <h3 className="font-medium">Experience</h3>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Include first-hand experience in your content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Share personal anecdotes and real-world examples</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Show practical knowledge and application</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-seo-blue" />
                        <h3 className="font-medium">Expertise</h3>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Highlight author credentials and qualifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Create detailed, in-depth content showing subject mastery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Include expert insights and analysis</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <ExternalLink className="h-5 w-5 text-seo-blue" />
                        <h3 className="font-medium">Authoritativeness</h3>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Build backlinks from authoritative industry sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Feature expert contributors and guest authors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Get mentioned in industry publications</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-seo-blue" />
                        <h3 className="font-medium">Trustworthiness</h3>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Add citations and references for factual claims</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Ensure accuracy and fact-check content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-seo-green mt-0.5" />
                          <span>Include transparent about/contact pages</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default EEAT;
