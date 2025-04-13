
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, PenLine, Target, Lightbulb, ArrowRight, LoaderCircle, CheckCircle, RefreshCcw, Copy, Bot, Search, BookOpen } from "lucide-react";

const AiContent = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativityLevel, setCreativityLevel] = useState([0.7]);
  const [activeTab, setActiveTab] = useState("analyzer");
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    seoScore: number;
    readability: number;
    keywordDensity: number;
    sentiment: "positive" | "neutral" | "negative";
    improvements: Array<{
      type: string;
      suggestion: string;
    }>;
  }>(null);

  // Mock AI generated content
  const [generatedContent, setGeneratedContent] = useState<null | {
    title: string;
    content: string;
    keywords: string[];
  }>(null);

  const handleAnalyzeContent = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResults({
        seoScore: Math.floor(Math.random() * 30) + 70, // 70-100 range
        readability: Math.floor(Math.random() * 40) + 60, // 60-100 range
        keywordDensity: parseFloat((Math.random() * 3 + 1).toFixed(1)), // 1-4% range
        sentiment: ["positive", "neutral", "negative"][Math.floor(Math.random() * 3)] as "positive" | "neutral" | "negative",
        improvements: [
          {
            type: "keyword",
            suggestion: "Add more primary keywords in the first paragraph",
          },
          {
            type: "readability",
            suggestion: "Consider shortening sentences to improve readability",
          },
          {
            type: "structure",
            suggestion: "Add more subheadings to break up the content",
          },
          {
            type: "seo",
            suggestion: "Include more semantic keywords related to your topic",
          },
        ],
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Content has been analyzed successfully",
      });
    }, 2000);
  };

  const handleGenerateContent = () => {
    if (!title.trim() || !keywords.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title and keywords",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock generated content
      setGeneratedContent({
        title: title,
        content: `# ${title}\n\nIntroduction paragraph that hooks the reader and introduces the topic of ${keywords}. This paragraph sets the stage for what the reader will learn and why it matters.\n\n## Understanding ${keywords.split(",")[0]}\n\nIn this section, we explore the fundamentals of ${keywords.split(",")[0]} and why it's important for your business. Studies show that implementing proper ${keywords.split(",")[0]} strategies can lead to significant improvements in search rankings.\n\n- Key point 1 about ${keywords.split(",")[0]}\n- Key point 2 with supporting data\n- Key point 3 with practical application\n\n## Best Practices for ${keywords.split(",")[1] || "Implementation"}\n\nLet's look at some established best practices that industry leaders follow when implementing ${keywords.split(",")[0]}:\n\n1. **Start with research**: Understanding your audience's needs is crucial before implementing any ${keywords.split(",")[0]} strategy.\n2. **Create a structured plan**: Having a clear roadmap will help you track progress and measure results.\n3. **Measure and optimize**: Continuously monitor performance and make adjustments as needed.\n\n## Common Mistakes to Avoid\n\nMany businesses make these common mistakes when dealing with ${keywords.split(",")[0]}:\n\n- Focusing too much on quantity instead of quality\n- Neglecting mobile optimization\n- Ignoring user experience metrics\n\n## Conclusion\n\nImplementing effective ${keywords.split(",")[0]} strategies requires careful planning and consistent execution. By following the best practices outlined above and avoiding common pitfalls, you can significantly improve your results.`,
        keywords: keywords.split(",").map(k => k.trim()),
      });
      setIsGenerating(false);
      
      toast({
        title: "Content Generated",
        description: "AI content has been generated successfully",
      });
    }, 3000);
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content);
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard",
      });
    }
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "positive") return "text-seo-green";
    if (sentiment === "negative") return "text-seo-red";
    return "text-seo-yellow";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-seo-green";
    if (score >= 70) return "text-seo-yellow";
    return "text-seo-red";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Content Optimization</h1>
          <p className="text-muted-foreground">
            Optimize your content with AI-powered analysis and generation
          </p>
        </div>

        <Tabs 
          defaultValue="analyzer" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Content Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Content Generator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Analysis</CardTitle>
                <CardDescription>
                  Paste your content below to analyze its SEO effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your content here..."
                  className="min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setContent("")}
                  disabled={!content || isAnalyzing}
                >
                  Clear
                </Button>
                <Button 
                  onClick={handleAnalyzeContent}
                  disabled={!content || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <PenLine className="mr-2 h-4 w-4" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {analysisResults && (
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      SEO performance metrics for your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">SEO Score</span>
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.seoScore)}`}>
                          {analysisResults.seoScore}/100
                        </span>
                      </div>
                      <Progress 
                        value={analysisResults.seoScore} 
                        className="h-2"
                        indicatorClassName={`${analysisResults.seoScore >= 90 ? 'bg-seo-green' : analysisResults.seoScore >= 70 ? 'bg-seo-yellow' : 'bg-seo-red'}`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Readability</span>
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.readability)}`}>
                          {analysisResults.readability}/100
                        </span>
                      </div>
                      <Progress 
                        value={analysisResults.readability} 
                        className="h-2"
                        indicatorClassName={`${analysisResults.readability >= 90 ? 'bg-seo-green' : analysisResults.readability >= 70 ? 'bg-seo-yellow' : 'bg-seo-red'}`}
                      />
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Keyword Density</p>
                        <Badge variant="outline">{analysisResults.keywordDensity}%</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Sentiment</p>
                        <Badge 
                          variant="outline" 
                          className={getSentimentColor(analysisResults.sentiment)}
                        >
                          {analysisResults.sentiment.charAt(0).toUpperCase() + analysisResults.sentiment.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                    <CardDescription>
                      Recommendations to enhance your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResults.improvements.map((improvement, index) => (
                        <li key={index} className="flex gap-2">
                          <Lightbulb className="h-5 w-5 text-seo-yellow flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{improvement.type.charAt(0).toUpperCase() + improvement.type.slice(1)}</p>
                            <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="generator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Content Generator</CardTitle>
                <CardDescription>
                  Create SEO-optimized content with our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Content Title</label>
                  <Input
                    placeholder="e.g., 10 Tips for Better SEO Performance"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Target Keywords</label>
                  <Input
                    placeholder="e.g., SEO, content marketing, Google ranking"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate keywords with commas</p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Creativity Level</label>
                    <span className="text-sm">{Math.round(creativityLevel[0] * 100)}%</span>
                  </div>
                  <Slider
                    defaultValue={[0.7]}
                    max={1}
                    step={0.1}
                    value={creativityLevel}
                    onValueChange={setCreativityLevel}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservative</span>
                    <span>Creative</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleGenerateContent}
                  disabled={!title || !keywords || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {generatedContent && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Generated Content</CardTitle>
                    <CardDescription>
                      AI-generated content based on your inputs
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleCopyContent}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setGeneratedContent(null)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">{generatedContent.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {generatedContent.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="whitespace-pre-line bg-muted/50 p-4 rounded-md text-sm max-h-[400px] overflow-y-auto">
                    {generatedContent.content}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AiContent;
