import { KeywordAnalysis, KeywordCluster, KeywordMetrics } from '../types/keyword';

export class KeywordService {
  private static instance: KeywordService;
  private readonly API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  private constructor() {}

  public static getInstance(): KeywordService {
    if (!KeywordService.instance) {
      KeywordService.instance = new KeywordService();
    }
    return KeywordService.instance;
  }

  private async fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  public async analyzeKeywords(keywords: string[]): Promise<KeywordAnalysis> {
    try {
      return await this.fetchFromApi<KeywordAnalysis>('/keywords/analyze', {
        method: 'POST',
        body: JSON.stringify({ keywords }),
      });
    } catch (error) {
      console.error('Failed to analyze keywords:', error);
      // Fallback to mock data if API fails
      return {
        keywords: keywords.map(keyword => ({
          keyword,
          searchVolume: Math.floor(Math.random() * 10000),
          difficulty: Math.floor(Math.random() * 100),
          cpc: Math.floor(Math.random() * 10),
          competition: Math.random(),
          trends: Array(12).fill(0).map(() => Math.floor(Math.random() * 100))
        })),
        clusters: this.generateKeywordClusters(keywords)
      };
    }
  }

  private generateKeywordClusters(keywords: string[]): KeywordCluster[] {
    return keywords.map(keyword => ({
      mainKeyword: keyword,
      relatedKeywords: [
        `${keyword} guide`,
        `how to ${keyword}`,
        `${keyword} tips`,
        `${keyword} examples`,
        `${keyword} tutorial`
      ]
    }));
  }

  public async getKeywordSuggestions(keyword: string): Promise<string[]> {
    try {
      return await this.fetchFromApi<string[]>('/keywords/suggestions', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
      });
    } catch (error) {
      console.error('Failed to get keyword suggestions:', error);
      // Fallback to mock data if API fails
      return [
        `${keyword} guide`,
        `how to ${keyword}`,
        `${keyword} tips`,
        `${keyword} examples`,
        `${keyword} tutorial`
      ];
    }
  }

  public async getKeywordMetrics(keyword: string): Promise<KeywordMetrics> {
    try {
      return await this.fetchFromApi<KeywordMetrics>('/keywords/metrics', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
      });
    } catch (error) {
      console.error('Failed to get keyword metrics:', error);
      // Fallback to mock data if API fails
      return {
        keyword,
        searchVolume: Math.floor(Math.random() * 10000),
        difficulty: Math.floor(Math.random() * 100),
        cpc: Math.floor(Math.random() * 10),
        competition: Math.random(),
        trends: Array(12).fill(0).map(() => Math.floor(Math.random() * 100))
      };
    }
  }
} 