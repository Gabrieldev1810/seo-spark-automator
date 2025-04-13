
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Mic, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  LoaderCircle,
  FileQuestion,
  ArrowUpRight,
  Code,
  ListChecks
} from "lucide-react";

const VoiceSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    voiceScore: number;
    optimizedKeywords: string[];
    questionPhrases: string[];
    structuredData: boolean;
    speakableContent: boolean;
    longTailKeywords: boolean;
    naturalLanguage: boolean;
  }>(null);

  const handleAnalyzeKeyword = () => {
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResults({
        voiceScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
        optimizedKeywords: [
          `how to ${keyword}`,
          `best ${keyword} methods`,
          `why is ${keyword} important`,
          `${keyword} near me`,
          `what is ${keyword}`,
          `when to use ${keyword}`,
        ],
        questionPhrases: [
          `What are the benefits of ${keyword}?`,
          `How does ${keyword} work?`,
          `Why should I use ${keyword}?`,
          `Where can I find ${keyword}?`,
          `When is the best time for ${keyword}?`,
        ],
        structuredData: Math.random() > 0.5,
        speakableContent: Math.random() > 0.4,
        longTailKeywords: Math.random() > 0.3,
        naturalLanguage: Math.random() > 0.2,
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Voice search optimization analysis is ready",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-seo-green";
    if (score >= 70) return "text-seo-yellow";
    return "text-seo-red";
  };

  const StatusIcon = ({ status }: { status: boolean }) => (
    status ? 
      <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0" /> : 
      <XCircle className="h-5 w-5 text-seo-red flex-shrink-0" />
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Voice Search Optimization</h1>
          <p className="text-muted-foreground">
            Optimize your content for voice search queries and virtual assistants
          </p>
        </div>

        <Alert className="bg-muted/50 border-seo-blue">
          <Mic className="h-4 w-4 text-seo-blue" />
          <AlertTitle>Voice Search is Growing</AlertTitle>
          <AlertDescription>
            Over 40% of adults use voice search at least once per day. Optimizing for voice is no longer optional.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Voice Optimization Analyzer</CardTitle>
            <CardDescription>
              Enter your primary keyword to get voice search optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., digital marketing"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button 
                onClick={handleAnalyzeKeyword}
                disabled={!keyword || isAnalyzing}
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
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Voice Search Readiness</CardTitle>
                <CardDescription>
                  Current voice search optimization score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Voice Optimization Score</span>
                    <span className={`text-sm font-medium ${getScoreColor(analysisResults.voiceScore)}`}>
                      {analysisResults.voiceScore}/100
                    </span>
                  </div>
                  <Progress 
                    value={analysisResults.voiceScore} 
                    className="h-2"
                    indicatorClassName={`${analysisResults.voiceScore >= 85 ? 'bg-seo-green' : analysisResults.voiceScore >= 70 ? 'bg-seo-yellow' : 'bg-seo-red'}`}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <StatusIcon status={analysisResults.structuredData} />
                    <div>
                      <p className="text-sm font-medium">Structured Data</p>
                      <p className="text-xs text-muted-foreground">
                        {analysisResults.structuredData 
                          ? "Good: Your site uses structured data which helps voice assistants understand content"
                          : "Improvement needed: Implement structured data markup (Schema.org)"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <StatusIcon status={analysisResults.speakableContent} />
                    <div>
                      <p className="text-sm font-medium">Speakable Content</p>
                      <p className="text-xs text-muted-foreground">
                        {analysisResults.speakableContent 
                          ? "Good: You have speakable content identified for voice assistants"
                          : "Improvement needed: Add speakable markup to your key content"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <StatusIcon status={analysisResults.longTailKeywords} />
                    <div>
                      <p className="text-sm font-medium">Long-tail Keywords</p>
                      <p className="text-xs text-muted-foreground">
                        {analysisResults.longTailKeywords 
                          ? "Good: Your content includes long-tail conversational keywords"
                          : "Improvement needed: Add more conversational long-tail keywords"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <StatusIcon status={analysisResults.naturalLanguage} />
                    <div>
                      <p className="text-sm font-medium">Natural Language</p>
                      <p className="text-xs text-muted-foreground">
                        {analysisResults.naturalLanguage 
                          ? "Good: Your content uses natural, conversational language"
                          : "Improvement needed: Make your content more conversational"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Voice-Optimized Keywords</CardTitle>
                  <CardDescription>
                    Long-tail keywords ideal for voice queries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.optimizedKeywords.map((kw, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{kw}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Question Phrases to Target</CardTitle>
                  <CardDescription>
                    Common voice search questions related to your keyword
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.questionPhrases.map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FileQuestion className="h-4 w-4 text-seo-blue mt-0.5" />
                        <span className="text-sm">{question}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Voice Search Implementation Guide</CardTitle>
            <CardDescription>
              Follow these steps to optimize your website for voice search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 border-b pb-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Implement FAQ Schema Markup</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add structured data to your FAQs to help voice assistants provide direct answers.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Code className="h-3 w-3 mr-1" />
                      View Schema Example
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b pb-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Create Conversational Content</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Write in a natural, conversational tone that matches how people actually speak.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b pb-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Focus on Question Keywords</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Target question phrases that start with who, what, where, when, why, and how.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b pb-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Optimize for Local Searches</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Include location-specific information for "near me" voice queries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-medium">Improve Page Speed</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Voice search results favor fast-loading pages. Optimize your site speed.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      Check Page Speed
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Search Checklist</CardTitle>
            <CardDescription>
              Essential optimizations for voice search readiness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <span className="text-sm">Implement FAQ schema markup</span>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <span className="text-sm">Create FAQ page with common questions</span>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <span className="text-sm">Add local business schema</span>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <span className="text-sm">Optimize page titles with question phrases</span>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <span className="text-sm">Add speakable markup to key content</span>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default VoiceSearch;
