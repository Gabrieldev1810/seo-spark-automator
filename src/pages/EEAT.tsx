
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ShieldCheck, 
  User, 
  BookOpen, 
  Building, 
  ThumbsUp, 
  Search, 
  LoaderCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  BookText,
  Award,
  ArrowUpRight,
  Info,
  Link2,
  FileCheck,
  CreditCard
} from "lucide-react";

// EEAT stands for Experience, Expertise, Authoritativeness, and Trustworthiness
const EEAT = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    overallScore: number;
    experienceScore: number;
    expertiseScore: number;
    authoritativenessScore: number;
    trustworthinessScore: number;
    issues: Array<{
      type: "experience" | "expertise" | "authoritativeness" | "trustworthiness";
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
        overallScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
        experienceScore: Math.floor(Math.random() * 40) + 60,
        expertiseScore: Math.floor(Math.random() * 40) + 60,
        authoritativenessScore: Math.floor(Math.random() * 40) + 60,
        trustworthinessScore: Math.floor(Math.random() * 40) + 60,
        issues: [
          {
            type: "experience",
            severity: "medium",
            description: "Limited first-person experience signals in your content",
            recommendation: "Include more first-person narratives and personal experiences relevant to your topic"
          },
          {
            type: "expertise",
            severity: "low",
            description: "Author credentials are not prominently displayed",
            recommendation: "Add author bios with relevant qualifications and background"
          },
          {
            type: "authoritativeness",
            severity: "high",
            description: "Few backlinks from authoritative sources in your industry",
            recommendation: "Build relationships with respected publications and industry leaders"
          },
          {
            type: "trustworthiness",
            severity: "medium",
            description: "Missing citations for factual claims",
            recommendation: "Add references and citations to support all significant claims"
          },
          {
            type: "trustworthiness",
            severity: "low",
            description: "Privacy policy could be more transparent",
            recommendation: "Update privacy policy with clearer explanations of data usage"
          },
        ]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "E-E-A-T compliance analysis is ready",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-seo-green";
    if (score >= 65) return "text-seo-yellow";
    return "text-seo-red";
  };

  const getSeverityColor = (severity: string) => {
    if (severity === "low") return "text-seo-green";
    if (severity === "medium") return "text-seo-yellow";
    return "text-seo-red";
  };

  const getEEATFullName = (type: string) => {
    switch(type) {
      case "experience": return "Experience";
      case "expertise": return "Expertise";
      case "authoritativeness": return "Authoritativeness";
      case "trustworthiness": return "Trustworthiness";
      default: return type;
    }
  };

  const getEEATIcon = (type: string) => {
    switch(type) {
      case "experience": return <User className="h-5 w-5" />;
      case "expertise": return <BookOpen className="h-5 w-5" />;
      case "authoritativeness": return <Building className="h-5 w-5" />;
      case "trustworthiness": return <ShieldCheck className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">E-E-A-T Compliance</h1>
          <p className="text-muted-foreground">
            Measure and improve your Experience, Expertise, Authoritativeness, and Trustworthiness
          </p>
        </div>

        <Alert className="bg-muted/50 border-seo-blue">
          <ShieldCheck className="h-4 w-4 text-seo-blue" />
          <AlertTitle>Google's Quality Rater Guidelines</AlertTitle>
          <AlertDescription>
            E-E-A-T is a core component of Google's Quality Rater Guidelines. Sites with strong E-E-A-T signals tend to rank higher, especially for YMYL (Your Money Your Life) topics.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>E-E-A-T Analyzer</CardTitle>
            <CardDescription>
              Enter your website URL to analyze your E-E-A-T compliance
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
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Overall E-E-A-T Score</CardTitle>
                  <CardDescription>
                    Combined assessment of your E-E-A-T signals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-muted relative">
                      <div className="flex flex-col items-center">
                        <span className={`text-4xl font-bold ${getScoreColor(analysisResults.overallScore)}`}>
                          {analysisResults.overallScore}
                        </span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                      <div className="absolute -bottom-4 bg-card px-3 py-1 rounded-full border shadow-sm">
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.overallScore)}`}>
                          {analysisResults.overallScore >= 85 ? "Strong" : 
                           analysisResults.overallScore >= 65 ? "Average" : "Needs Work"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <div className="text-center mb-2">
                        <User className="h-5 w-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">Experience</p>
                      </div>
                      <Progress 
                        value={analysisResults.experienceScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.experienceScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.experienceScore}/100</p>
                    </div>
                    
                    <div>
                      <div className="text-center mb-2">
                        <BookOpen className="h-5 w-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">Expertise</p>
                      </div>
                      <Progress 
                        value={analysisResults.expertiseScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.expertiseScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.expertiseScore}/100</p>
                    </div>
                    
                    <div>
                      <div className="text-center mb-2">
                        <Building className="h-5 w-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">Authoritativeness</p>
                      </div>
                      <Progress 
                        value={analysisResults.authoritativenessScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.authoritativenessScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.authoritativenessScore}/100</p>
                    </div>
                    
                    <div>
                      <div className="text-center mb-2">
                        <ShieldCheck className="h-5 w-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">Trustworthiness</p>
                      </div>
                      <Progress 
                        value={analysisResults.trustworthinessScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.trustworthinessScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.trustworthinessScore}/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Opportunities</CardTitle>
                  <CardDescription>
                    Key issues affecting your E-E-A-T rating
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResults.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                        <div className={`${
                          issue.severity === "high" ? "bg-seo-red/10 text-seo-red" :
                          issue.severity === "medium" ? "bg-seo-yellow/10 text-seo-yellow" :
                          "bg-seo-green/10 text-seo-green"
                        } p-2 rounded-md flex-shrink-0`}>
                          {getEEATIcon(issue.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{getEEATFullName(issue.type)}</h3>
                            <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                          <p className="text-sm mt-1">{issue.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="experience" className="space-y-4">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="expertise" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden md:inline">Expertise</span>
                </TabsTrigger>
                <TabsTrigger value="authoritativeness" className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="hidden md:inline">Authoritativeness</span>
                </TabsTrigger>
                <TabsTrigger value="trustworthiness" className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden md:inline">Trustworthiness</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Experience Signals</CardTitle>
                    <CardDescription>
                      How to demonstrate first-hand experience with your subject matter
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center gap-2">
                        <Info className="h-4 w-4 text-seo-blue" />
                        What is Experience?
                      </h3>
                      <p className="text-sm mt-2">
                        Experience refers to first-hand or life experience with the topic. Google wants to see that content creators have actually used products, visited places, or tried services they're writing about.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Include Original Photos</p>
                          <p className="text-sm text-muted-foreground">Add original photos showing your actual experience with products, places, or services</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Use First-Person Perspective</p>
                          <p className="text-sm text-muted-foreground">Write in first-person when sharing experiences (e.g., "I tested this product for three months")</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Include Specific Details</p>
                          <p className="text-sm text-muted-foreground">Provide specific details that only someone with first-hand experience would know</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Create "About" Pages</p>
                          <p className="text-sm text-muted-foreground">Showcase your team's relevant experience and background with the subject matter</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expertise" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Expertise Signals</CardTitle>
                    <CardDescription>
                      How to demonstrate knowledge and skills in your subject area
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center gap-2">
                        <Info className="h-4 w-4 text-seo-blue" />
                        What is Expertise?
                      </h3>
                      <p className="text-sm mt-2">
                        Expertise refers to the knowledge or skills in a particular field. For YMYL (Your Money, Your Life) topics, formal expertise is crucial. For non-YMYL topics, everyday expertise can be sufficient.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Display Author Credentials</p>
                          <p className="text-sm text-muted-foreground">Show relevant qualifications, certifications, or experience for each content creator</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Create Comprehensive Content</p>
                          <p className="text-sm text-muted-foreground">Publish in-depth content that demonstrates thorough knowledge of the subject</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Link to Author Profiles</p>
                          <p className="text-sm text-muted-foreground">Include detailed author profiles with professional background and expertise</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Cite Relevant Publications</p>
                          <p className="text-sm text-muted-foreground">Reference books, articles, or research papers authored by your team</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="authoritativeness" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Authoritativeness Signals</CardTitle>
                    <CardDescription>
                      How to build reputation and authority in your industry
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center gap-2">
                        <Info className="h-4 w-4 text-seo-blue" />
                        What is Authoritativeness?
                      </h3>
                      <p className="text-sm mt-2">
                        Authoritativeness is about reputation and recognition from others in your field. It's determined by what others say about you, including backlinks, mentions, and references from authoritative sources.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Earn Quality Backlinks</p>
                          <p className="text-sm text-muted-foreground">Develop a strategy to earn links from respected websites in your industry</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Display Awards and Recognition</p>
                          <p className="text-sm text-muted-foreground">Showcase industry awards, certifications, and recognition your business has received</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Feature Press Mentions</p>
                          <p className="text-sm text-muted-foreground">Display logos or quotes from major publications that have covered your business</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Participate in Industry Events</p>
                          <p className="text-sm text-muted-foreground">Document speaking engagements, panel participation, and other industry contributions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trustworthiness" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Trustworthiness Signals</CardTitle>
                    <CardDescription>
                      How to build trust and credibility with users and search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center gap-2">
                        <Info className="h-4 w-4 text-seo-blue" />
                        What is Trustworthiness?
                      </h3>
                      <p className="text-sm mt-2">
                        Trustworthiness relates to the accuracy, transparency, and honesty of your content. It includes elements like citations for claims, clear authorship, secure website, and transparent business practices.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Cite Sources</p>
                          <p className="text-sm text-muted-foreground">Add citations and references for all factual claims, statistics, and quotations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Secure Your Website</p>
                          <p className="text-sm text-muted-foreground">Ensure your site uses HTTPS and has appropriate security measures in place</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Provide Contact Information</p>
                          <p className="text-sm text-muted-foreground">Display clear contact details, including physical address if applicable</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Disclose Affiliations</p>
                          <p className="text-sm text-muted-foreground">Clearly disclose affiliate relationships, sponsored content, and potential conflicts of interest</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BookText className="h-4 w-4 text-primary" />
                E-E-A-T Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2">
                <FileCheck className="h-4 w-4 mr-2" />
                <span>Google's Quality Rater Guidelines</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2">
                <FileCheck className="h-4 w-4 mr-2" />
                <span>E-E-A-T Best Practices Guide</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2">
                <FileCheck className="h-4 w-4 mr-2" />
                <span>YMYL Content Requirements</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                YMYL Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Your Money Your Life (YMYL) content requires the highest level of E-E-A-T:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Financial advice & information</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Medical & health information</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Legal advice & information</span>
                </li>
                <li className="flex items-start gap-2">
                  <User className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>News & current events</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                Backlink Authority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Top authoritative sources to target for backlinks:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/50 p-2 rounded text-xs">
                  <span className="font-medium">Educational</span>
                  <p className="text-muted-foreground">.edu domains</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-xs">
                  <span className="font-medium">Government</span>
                  <p className="text-muted-foreground">.gov domains</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-xs">
                  <span className="font-medium">Industry</span>
                  <p className="text-muted-foreground">Trade associations</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-xs">
                  <span className="font-medium">News</span>
                  <p className="text-muted-foreground">Major publications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default EEAT;
