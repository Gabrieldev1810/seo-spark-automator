
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Search, 
  Star, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  LoaderCircle,
  Store,
  Phone,
  Calendar,
  Clock,
  FileText,
  GalleryVertical,
  BookmarkCheck,
  Users
} from "lucide-react";
import { LocalSeoAgent } from "@/services/agents/localSeoAgent";

const LocalSeo = () => {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("analyzer");
  const { toast } = useToast();
  const localSeoAgent = new LocalSeoAgent();

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<null | {
    localScore: number;
    googleBusinessProfile: {
      completeness: number;
      verificationStatus: boolean;
      reviewCount: number;
      averageRating: number;
    };
    localCitations: {
      total: number;
      consistent: number;
      inconsistencies: Array<{
        platform: string;
        issue: string;
      }>;
    };
    competitorAnalysis: Array<{
      name: string;
      rating: number;
      reviewCount: number;
      strengths: string[];
    }>;
  }>(null);

  const handleAnalyzeLocalSEO = async () => {
    if (!businessName || !city) {
      toast({
        title: "Error",
        description: "Please enter at least a business name and city",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Use the LocalSeoAgent to get actual mock data
      const localPresence = await localSeoAgent.analyzeLocalPresence(city);
      
      // Simulate API call delay
      setTimeout(() => {
        // Mock analysis results
        setAnalysisResults({
          localScore: Math.floor(Math.random() * 30) + 65, // 65-95 range
          googleBusinessProfile: {
            completeness: Math.floor(Math.random() * 40) + 60, // 60-100 range
            verificationStatus: Math.random() > 0.3,
            reviewCount: localPresence.reviewCount,
            averageRating: parseFloat(localPresence.reviewScore)
          },
          localCitations: {
            total: localPresence.localCitations,
            consistent: Math.floor(localPresence.localCitations * 0.7), // 70% consistency
            inconsistencies: [
              {
                platform: "Yelp",
                issue: "Incorrect phone number"
              },
              {
                platform: "Yellow Pages",
                issue: "Old address"
              },
              {
                platform: "Bing Places",
                issue: "Different business hours"
              }
            ]
          },
          competitorAnalysis: [
            {
              name: localPresence.localCompetitors[0],
              rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0 rating
              reviewCount: Math.floor(Math.random() * 100) + 20,
              strengths: ["More reviews", "Responds quickly to reviews", "Complete business info"]
            },
            {
              name: localPresence.localCompetitors[1],
              rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0 rating
              reviewCount: Math.floor(Math.random() * 100) + 20,
              strengths: ["High-quality photos", "Active posting", "Local keyword optimization"]
            }
          ]
        });
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis Complete",
          description: "Local SEO analysis is ready",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze local SEO presence",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Local SEO & Hyper-Localization</h1>
          <p className="text-muted-foreground">
            Optimize your business for local search and attract nearby customers
          </p>
        </div>

        <Alert className="bg-muted/50 border-seo-blue">
          <MapPin className="h-4 w-4 text-seo-blue" />
          <AlertTitle>Local Search Is Growing</AlertTitle>
          <AlertDescription>
            46% of all Google searches have local intent. Optimizing for local search is essential for brick-and-mortar businesses.
          </AlertDescription>
        </Alert>

        <Tabs 
          defaultValue="analyzer"
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Local SEO Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Business Listing Optimizer</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyze Local Presence</CardTitle>
                <CardDescription>
                  Enter your business details to analyze local SEO performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="business-name" className="text-sm font-medium block mb-1">Business Name</label>
                      <Input
                        id="business-name"
                        placeholder="Your Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="text-sm font-medium block mb-1">City</label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleAnalyzeLocalSEO}
                    disabled={!businessName || !city || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze Local SEO
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {analysisResults && (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Local SEO Score</CardTitle>
                      <CardDescription>
                        Overall local visibility score
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="inline-flex items-center justify-center rounded-full w-24 h-24 border-4 border-muted">
                          <span className={`text-3xl font-bold ${getScoreColor(analysisResults.localScore)}`}>
                            {analysisResults.localScore}
                          </span>
                        </div>
                        <span className={`text-sm font-medium mt-2 ${getScoreColor(analysisResults.localScore)}`}>
                          {analysisResults.localScore >= 85 ? "Excellent" : 
                           analysisResults.localScore >= 65 ? "Average" : "Poor"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Google Business Profile</CardTitle>
                      <CardDescription>
                        Google Maps and local listings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completeness</span>
                        <Badge variant="outline">{analysisResults.googleBusinessProfile.completeness}%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Verified</span>
                        {getStatusIcon(analysisResults.googleBusinessProfile.verificationStatus)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reviews</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-seo-yellow text-seo-yellow" />
                          <span className="text-sm">{analysisResults.googleBusinessProfile.averageRating} ({analysisResults.googleBusinessProfile.reviewCount})</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Local Citations</CardTitle>
                      <CardDescription>
                        Business listings across directories
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Citations</span>
                        <Badge variant="outline">{analysisResults.localCitations.total}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consistency</span>
                        <Badge variant="outline" className={
                          analysisResults.localCitations.consistent / analysisResults.localCitations.total > 0.8 
                            ? "text-seo-green" 
                            : analysisResults.localCitations.consistent / analysisResults.localCitations.total > 0.6 
                            ? "text-seo-yellow" 
                            : "text-seo-red"
                        }>
                          {Math.round(analysisResults.localCitations.consistent / analysisResults.localCitations.total * 100)}%
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm">Issues</span>
                        <div className="mt-1 space-y-1">
                          {analysisResults.localCitations.inconsistencies.map((issue, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                              <XCircle className="h-3 w-3 text-seo-red mt-0.5 flex-shrink-0" />
                              <span>{issue.platform}: {issue.issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Analysis</CardTitle>
                    <CardDescription>
                      Local competitors in your area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.competitorAnalysis.map((competitor, index) => (
                        <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="bg-muted/50 p-3 rounded-full">
                            <Store className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <h3 className="font-medium">{competitor.name}</h3>
                              <div className="flex items-center gap-1 mt-1 sm:mt-0">
                                <Star className="h-4 w-4 fill-seo-yellow text-seo-yellow" />
                                <span className="text-sm">{competitor.rating} ({competitor.reviewCount} reviews)</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Strengths:</p>
                              <div className="flex flex-wrap gap-2">
                                {competitor.strengths.map((strength, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{strength}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Local SEO Recommendations</CardTitle>
                    <CardDescription>
                      Action items to improve your local search visibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Complete Your Google Business Profile</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Ensure your business hours, description, services, and photos are complete.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2 text-sm">
                              <GalleryVertical className="h-4 w-4 text-muted-foreground" />
                              <span>Add at least 10 high-quality photos</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Write a complete business description</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Update your business hours</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Add special hours for holidays</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Fix Citation Inconsistencies</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Ensure your NAP (Name, Address, Phone) is consistent across all directories.
                          </p>
                          <div className="bg-muted/50 p-3 rounded-md mt-2">
                            <p className="text-sm font-medium">Inconsistencies Found:</p>
                            <ul className="mt-1 space-y-1">
                              {analysisResults.localCitations.inconsistencies.map((issue, index) => (
                                <li key={index} className="text-sm flex items-start gap-1">
                                  <ArrowRight className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                                  <span>{issue.platform}: {issue.issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Generate More Reviews</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Actively request reviews from satisfied customers and respond to all reviews.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>Create a review generation process</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <BookmarkCheck className="h-4 w-4 text-muted-foreground" />
                              <span>Respond to all reviews within 24 hours</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h3 className="font-medium">Create Localized Content</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Develop content specifically for your local area and target local keywords.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          5
                        </div>
                        <div>
                          <h3 className="font-medium">Build Local Backlinks</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get links from local organizations, newspapers, and community websites.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="optimizer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Listing Optimizer</CardTitle>
                <CardDescription>
                  Enter your business details to create consistent citations across directories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="business-name-opt" className="text-sm font-medium block mb-1">Business Name*</label>
                      <Input
                        id="business-name-opt"
                        placeholder="Your Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="text-sm font-medium block mb-1">Business Category*</label>
                      <Input
                        id="category"
                        placeholder="e.g., Restaurant, Plumber, Retail"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="text-sm font-medium block mb-1">Street Address*</label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="city-opt" className="text-sm font-medium block mb-1">City*</label>
                      <Input
                        id="city-opt"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="text-sm font-medium block mb-1">State*</label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="text-sm font-medium block mb-1">ZIP Code*</label>
                      <Input
                        id="zip"
                        placeholder="ZIP Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium block mb-1">Phone Number*</label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="website-url" className="text-sm font-medium block mb-1">Website URL*</label>
                      <Input
                        id="website-url"
                        placeholder="https://www.yourbusiness.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description-text" className="text-sm font-medium block mb-1">Business Description*</label>
                    <Textarea
                      id="description-text"
                      placeholder="Describe your business, products, or services..."
                      className="min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Aim for 150-300 characters with local keywords</p>
                  </div>

                  <Button 
                    className="w-full"
                    disabled={!businessName || !address || !city || !state || !zipCode || !phone || !website || !category || !description}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Optimize Business Listings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Citation Opportunities</CardTitle>
                <CardDescription>
                  Top directories to list your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Google Business Profile</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Yelp</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Bing Places</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Apple Maps</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Facebook</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Yellow Pages</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">TripAdvisor</span>
                    </div>
                    <Button variant="outline" size="sm">Add Listing</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default LocalSeo;
