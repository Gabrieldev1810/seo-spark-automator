
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
  MapPin, 
  Search, 
  LoaderCircle, 
  CheckCircle2,
  XCircle,
  Star,
  Building,
  ListChecks,
  ExternalLink,
  MessageSquare,
  Map,
  ImagePlus,
  FileHeart,
  Phone,
  Globe,
  Mail,
  Clock,
  CircleDashed,
  CircleCheck,
  Smartphone
} from "lucide-react";

const LocalSeo = () => {
  const [business, setBusiness] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    localScore: number;
    googleScore: number;
    citationConsistency: number;
    reviewScore: number;
    onPageScore: number;
    gmb: {
      verified: boolean;
      complete: boolean;
      photos: boolean;
      posts: boolean;
      q_and_a: boolean;
    };
    issues: Array<{
      category: "GMB" | "Citations" | "Reviews" | "On-Page" | "Technical";
      severity: "high" | "medium" | "low";
      description: string;
      recommendation: string;
    }>;
    competitors: Array<{
      name: string;
      score: number;
      reviews: number;
      rating: number;
    }>;
  }>(null);

  const handleAnalyzeLocal = () => {
    if (!business.trim()) {
      toast({
        title: "Error",
        description: "Please enter a business name to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResults({
        localScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
        googleScore: Math.floor(Math.random() * 40) + 60,
        citationConsistency: Math.floor(Math.random() * 30) + 60,
        reviewScore: Math.floor(Math.random() * 40) + 60,
        onPageScore: Math.floor(Math.random() * 20) + 70,
        gmb: {
          verified: Math.random() > 0.2,
          complete: Math.random() > 0.3,
          photos: Math.random() > 0.4,
          posts: Math.random() > 0.6,
          q_and_a: Math.random() > 0.7
        },
        issues: [
          {
            category: "GMB",
            severity: "high",
            description: "Google Business Profile is missing business hours",
            recommendation: "Add complete business hours to your Google Business Profile"
          },
          {
            category: "Citations",
            severity: "medium",
            description: "Inconsistent NAP (Name, Address, Phone) across directories",
            recommendation: "Audit and update NAP information across all business directories"
          },
          {
            category: "Reviews",
            severity: "medium",
            description: "Low review count compared to competitors",
            recommendation: "Implement a review generation strategy to increase review volume"
          },
          {
            category: "On-Page",
            severity: "high",
            description: "Missing local business schema markup",
            recommendation: "Add LocalBusiness schema markup to your website"
          },
          {
            category: "Technical",
            severity: "low",
            description: "Website not optimized for mobile devices",
            recommendation: "Improve mobile responsiveness for better local search performance"
          },
        ],
        competitors: [
          {
            name: "Competitor A",
            score: Math.floor(Math.random() * 20) + 70,
            reviews: Math.floor(Math.random() * 50) + 50,
            rating: (Math.random() * 1.5) + 3.5
          },
          {
            name: "Competitor B",
            score: Math.floor(Math.random() * 20) + 70,
            reviews: Math.floor(Math.random() * 50) + 50,
            rating: (Math.random() * 1.5) + 3.5
          },
          {
            name: "Competitor C",
            score: Math.floor(Math.random() * 20) + 70,
            reviews: Math.floor(Math.random() * 50) + 50,
            rating: (Math.random() * 1.5) + 3.5
          }
        ]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Local SEO analysis is ready",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-seo-green";
    if (score >= 65) return "text-seo-yellow";
    return "text-seo-red";
  };

  const getStatusIcon = (status: boolean) => (
    status ? 
      <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0" /> : 
      <XCircle className="h-5 w-5 text-seo-red flex-shrink-0" />
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Local SEO</h1>
          <p className="text-muted-foreground">
            Optimize your business for local search and Google Maps
          </p>
        </div>

        <Alert className="bg-muted/50 border-seo-blue">
          <MapPin className="h-4 w-4 text-seo-blue" />
          <AlertTitle>46% of Google Searches are Local</AlertTitle>
          <AlertDescription>
            Nearly half of all Google searches have local intent. Optimizing for local search is essential for businesses with physical locations.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Local SEO Analyzer</CardTitle>
            <CardDescription>
              Enter your business name to analyze local search performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Joe's Pizza New York"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
              <Button 
                onClick={handleAnalyzeLocal}
                disabled={!business || isAnalyzing}
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
                  <CardTitle>Local SEO Score</CardTitle>
                  <CardDescription>
                    Overall local search performance rating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center rounded-full w-32 h-32 border-8 border-muted relative">
                      <div className="flex flex-col items-center">
                        <span className={`text-4xl font-bold ${getScoreColor(analysisResults.localScore)}`}>
                          {analysisResults.localScore}
                        </span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                      <div className="absolute -bottom-4 bg-card px-3 py-1 rounded-full border shadow-sm">
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.localScore)}`}>
                          {analysisResults.localScore >= 85 ? "Strong" : 
                           analysisResults.localScore >= 65 ? "Average" : "Weak"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <div className="text-center mb-2">
                        <Building className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-sm font-medium">Google Business</p>
                      </div>
                      <Progress 
                        value={analysisResults.googleScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.googleScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.googleScore}/100</p>
                    </div>
                    
                    <div>
                      <div className="text-center mb-2">
                        <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-sm font-medium">Citations</p>
                      </div>
                      <Progress 
                        value={analysisResults.citationConsistency} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.citationConsistency)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.citationConsistency}/100</p>
                    </div>
                    
                    <div>
                      <div className="text-center mb-2">
                        <Star className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-sm font-medium">Reviews</p>
                      </div>
                      <Progress 
                        value={analysisResults.reviewScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.reviewScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.reviewScore}/100</p>
                    </div>
                    
                    <div>
                      <div className="text-center mb-2">
                        <Globe className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-sm font-medium">On-Page SEO</p>
                      </div>
                      <Progress 
                        value={analysisResults.onPageScore} 
                        className="h-2"
                        indicatorClassName={getScoreColor(analysisResults.onPageScore)}
                      />
                      <p className="text-xs text-center mt-1">{analysisResults.onPageScore}/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google Business Profile</CardTitle>
                  <CardDescription>
                    Your Google Business Profile status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Verified Profile</span>
                      </div>
                      {getStatusIcon(analysisResults.gmb.verified)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Complete Information</span>
                      </div>
                      {getStatusIcon(analysisResults.gmb.complete)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <ImagePlus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Quality Photos</span>
                      </div>
                      {getStatusIcon(analysisResults.gmb.photos)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <FileHeart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Business Posts</span>
                      </div>
                      {getStatusIcon(analysisResults.gmb.posts)}
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Questions & Answers</span>
                      </div>
                      {getStatusIcon(analysisResults.gmb.q_and_a)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Opportunities</CardTitle>
                <CardDescription>
                  Issues affecting your local search performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.issues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                      <div className={`${
                        issue.severity === "high" ? "bg-seo-red/10 text-seo-red" :
                        issue.severity === "medium" ? "bg-seo-yellow/10 text-seo-yellow" :
                        "bg-seo-green/10 text-seo-green"
                      } p-2 rounded-md flex-shrink-0`}>
                        {issue.category === "GMB" ? <Building className="h-5 w-5" /> :
                         issue.category === "Citations" ? <MapPin className="h-5 w-5" /> :
                         issue.category === "Reviews" ? <Star className="h-5 w-5" /> :
                         issue.category === "On-Page" ? <Globe className="h-5 w-5" /> :
                         <Smartphone className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{issue.category}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            issue.severity === "high" ? "bg-seo-red/10 text-seo-red" :
                            issue.severity === "medium" ? "bg-seo-yellow/10 text-seo-yellow" :
                            "bg-seo-green/10 text-seo-green"
                          }`}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm mb-1">{issue.description}</p>
                        <div className="flex items-center text-sm text-primary">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          <span>{issue.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>
                  How your business compares to local competitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Your Business</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-seo-yellow fill-seo-yellow" />
                          <span className="text-sm ml-1">4.2</span>
                        </div>
                        <div className="text-sm">(48 reviews)</div>
                      </div>
                    </div>
                    <Progress 
                      value={analysisResults.localScore} 
                      className="h-3"
                      indicatorClassName={getScoreColor(analysisResults.localScore)}
                    />
                  </div>

                  {analysisResults.competitors.map((competitor, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{competitor.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-seo-yellow fill-seo-yellow" />
                            <span className="text-sm ml-1">{competitor.rating.toFixed(1)}</span>
                          </div>
                          <div className="text-sm">({competitor.reviews} reviews)</div>
                        </div>
                      </div>
                      <Progress 
                        value={competitor.score} 
                        className="h-3"
                        indicatorClassName="bg-muted-foreground"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="gmb" className="space-y-4">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="gmb" className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="hidden md:inline">Google Business</span>
                </TabsTrigger>
                <TabsTrigger value="citations" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden md:inline">Citations</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span className="hidden md:inline">Reviews</span>
                </TabsTrigger>
                <TabsTrigger value="onpage" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="hidden md:inline">On-Page SEO</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gmb" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Google Business Profile Optimization</CardTitle>
                    <CardDescription>
                      Best practices for optimizing your Google Business Profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Verify Your Business</p>
                          <p className="text-sm text-muted-foreground">Complete the verification process to unlock all GBP features</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Verify Now
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Complete All Information</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>Phone Number</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span>Email Address</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>Full Address</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Globe className="h-3 w-3 text-muted-foreground" />
                              <span>Website URL</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>Business Hours</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Building className="h-3 w-3 text-muted-foreground" />
                              <span>Business Category</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Add High-Quality Photos</p>
                          <p className="text-sm text-muted-foreground">Upload professional photos of your business, products, and services</p>
                          <ul className="text-sm mt-2 space-y-1">
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Exterior photos (building, signage)</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Interior photos (ambiance, layout)</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Product/service photos</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Team/staff photos</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Use Google Posts Regularly</p>
                          <p className="text-sm text-muted-foreground">Share updates, offers, and events through Google Posts</p>
                          <p className="text-xs mt-1">Post weekly for best results. Create various types of posts:</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <Badge variant="outline" className="justify-start">What's New</Badge>
                            <Badge variant="outline" className="justify-start">Event</Badge>
                            <Badge variant="outline" className="justify-start">Offer</Badge>
                            <Badge variant="outline" className="justify-start">Product</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="citations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Citation Management</CardTitle>
                    <CardDescription>
                      Strategies for building and managing business citations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="bg-muted/50">
                      <MapPin className="h-4 w-4" />
                      <AlertTitle>What are Citations?</AlertTitle>
                      <AlertDescription>
                        Citations are online mentions of your business name, address, and phone number (NAP). Consistent citations across the web are crucial for local SEO.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Maintain NAP Consistency</p>
                          <p className="text-sm text-muted-foreground">Ensure your business name, address, and phone number are identical across all platforms</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Priority Citation Sources</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <Badge variant="outline" className="justify-start">Google Business</Badge>
                            <Badge variant="outline" className="justify-start">Yelp</Badge>
                            <Badge variant="outline" className="justify-start">Facebook</Badge>
                            <Badge variant="outline" className="justify-start">Apple Maps</Badge>
                            <Badge variant="outline" className="justify-start">Bing Places</Badge>
                            <Badge variant="outline" className="justify-start">Yellow Pages</Badge>
                            <Badge variant="outline" className="justify-start">BBB</Badge>
                            <Badge variant="outline" className="justify-start">Foursquare</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Industry-Specific Directories</p>
                          <p className="text-sm text-muted-foreground">Target listings in directories specific to your industry</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Recommended Directories
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Management</CardTitle>
                    <CardDescription>
                      Strategies for generating and managing customer reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Implement a Review Generation Strategy</p>
                          <p className="text-sm text-muted-foreground">Create a systematic approach to encourage satisfied customers to leave reviews</p>
                          <ul className="text-sm mt-2 space-y-1">
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Send follow-up emails after purchase</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Create QR codes linking to review platforms</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Train staff to request reviews</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Respond to All Reviews</p>
                          <p className="text-sm text-muted-foreground">Respond professionally to both positive and negative reviews</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-muted/50 p-2 rounded text-xs">
                              <p className="font-medium">Positive Reviews</p>
                              <p className="text-muted-foreground mt-1">Thank customers and reinforce positive points</p>
                            </div>
                            <div className="bg-muted/50 p-2 rounded text-xs">
                              <p className="font-medium">Negative Reviews</p>
                              <p className="text-muted-foreground mt-1">Address concerns and offer solutions offline</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Diversify Review Platforms</p>
                          <p className="text-sm text-muted-foreground">Collect reviews across multiple platforms for a stronger online presence</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="justify-start">Google</Badge>
                            <Badge variant="outline" className="justify-start">Yelp</Badge>
                            <Badge variant="outline" className="justify-start">Facebook</Badge>
                            <Badge variant="outline" className="justify-start">TripAdvisor</Badge>
                            <Badge variant="outline" className="justify-start">Industry-specific</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="onpage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Local On-Page SEO</CardTitle>
                    <CardDescription>
                      Website optimization techniques for local search
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Implement LocalBusiness Schema</p>
                          <p className="text-sm text-muted-foreground">Add structured data markup to help search engines understand your business</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Code className="h-3 w-3 mr-1" />
                            View Schema Example
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Optimize for Local Keywords</p>
                          <p className="text-sm text-muted-foreground">Target geographic terms in your content and meta data</p>
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            <div className="bg-muted/50 p-2 rounded text-xs">
                              <p className="italic">"[service] in [city]" - e.g., "plumber in Chicago"</p>
                            </div>
                            <div className="bg-muted/50 p-2 rounded text-xs">
                              <p className="italic">"[city] [service]" - e.g., "Chicago plumbing services"</p>
                            </div>
                            <div className="bg-muted/50 p-2 rounded text-xs">
                              <p className="italic">"best [service] near me" - e.g., "best plumber near me"</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CircleCheck className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Create Location Pages</p>
                          <p className="text-sm text-muted-foreground">For businesses serving multiple areas, create dedicated location pages</p>
                          <ul className="text-sm mt-2 space-y-1">
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Include location-specific content</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Add unique testimonials from local customers</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Include local landmarks and references</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <CircleDashed className="h-3 w-3" />
                              <span>Embed Google Maps for each location</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default LocalSeo;
