export interface KeywordMetrics {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  trends: number[];
}

export interface KeywordCluster {
  mainKeyword: string;
  relatedKeywords: string[];
}

export interface KeywordAnalysis {
  keywords: KeywordMetrics[];
  clusters: KeywordCluster[];
} 