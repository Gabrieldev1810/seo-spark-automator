import { KeywordAgent } from './keywordAgent';

interface ContentGenerationOptions {
  tone?: 'professional' | 'casual' | 'technical';
  length?: 'short' | 'medium' | 'long';
  targetAudience?: 'beginner' | 'intermediate' | 'expert';
  contentType?: 'article' | 'blog' | 'guide' | 'tutorial';
}

interface ContentSection {
  title: string;
  content: string;
  keywords: string[];
}

/**
 * ContentAgent - Handles dynamic content generation and optimization using AI
 */
export class ContentAgent {
  private keywordAgent: KeywordAgent;
  private readonly API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  constructor() {
    this.keywordAgent = new KeywordAgent();
  }

  /**
   * Generates optimized content based on a topic and target keywords
   */
  async generateContent(
    topic: string, 
    targetKeywords: string[],
    options: ContentGenerationOptions = {}
  ): Promise<{
    title: string;
    metaDescription: string;
    content: string;
    headings: string[];
    keywordDensity: Array<{ keyword: string; density: number }>;
    sections: ContentSection[];
  }> {
    try {
      // Get keyword clusters and analysis
      const [keywordClusters, keywordAnalysis] = await Promise.all([
        this.keywordAgent.generateKeywordClusters(topic),
        this.keywordAgent.analyzeKeywordDensity('', topic)
      ]);

      // Generate content structure using AI
      const contentStructure = await this.generateContentStructure(topic, keywordClusters, options);
      
      // Generate actual content using AI
      const sections = await Promise.all(
        contentStructure.sections.map(section => 
          this.generateSectionContent(section, targetKeywords, options)
        )
      );

      // Combine sections into full content
      const content = this.combineSections(sections);

      // Generate SEO metadata
      const { title, metaDescription } = await this.generateSEOMetadata(topic, targetKeywords, options);

      // Analyze final keyword density
      const keywordDensity = await Promise.all(
        targetKeywords.map(async keyword => {
          const analysis = await this.keywordAgent.analyzeKeywordDensity(content, keyword);
          return { keyword, density: analysis.density };
        })
      );

      return {
        title,
        metaDescription,
        content,
        headings: sections.map(s => s.title),
        keywordDensity,
        sections
      };
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

  /**
   * Generates FAQ content using AI
   */
  async generateFAQs(
    topic: string,
    options: ContentGenerationOptions = {}
  ): Promise<Array<{ question: string; answer: string }>> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/content/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, options })
      });

      if (!response.ok) {
        throw new Error('Failed to generate FAQs');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating FAQs:', error);
      // Fallback to basic FAQ generation
      return this.generateBasicFAQs(topic);
    }
  }

  /**
   * Generates a how-to guide using AI
   */
  async generateHowToGuide(
    task: string,
    options: ContentGenerationOptions = {}
  ): Promise<{
    title: string;
    introduction: string;
    steps: Array<{ title: string; description: string; tips: string[] }>;
    conclusion: string;
  }> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/content/how-to`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, options })
      });

      if (!response.ok) {
        throw new Error('Failed to generate how-to guide');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating how-to guide:', error);
      // Fallback to basic guide generation
      return this.generateBasicHowToGuide(task);
    }
  }

  /**
   * Generates content structure using AI
   * @private
   */
  private async generateContentStructure(
    topic: string,
    keywordClusters: any[],
    options: ContentGenerationOptions
  ): Promise<{ sections: ContentSection[] }> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/content/structure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, keywordClusters, options })
      });

      if (!response.ok) {
        throw new Error('Failed to generate content structure');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating content structure:', error);
      // Fallback to basic structure
      return {
        sections: [
          { title: `What is ${topic}?`, content: '', keywords: [] },
          { title: `Why is ${topic} Important?`, content: '', keywords: [] },
          { title: `How to Get Started with ${topic}`, content: '', keywords: [] },
          { title: `Best Practices for ${topic}`, content: '', keywords: [] },
          { title: `Common Mistakes to Avoid`, content: '', keywords: [] },
          { title: `Advanced ${topic} Techniques`, content: '', keywords: [] },
          { title: `Frequently Asked Questions`, content: '', keywords: [] }
        ]
      };
    }
  }

  /**
   * Generates section content using AI
   * @private
   */
  private async generateSectionContent(
    section: ContentSection,
    targetKeywords: string[],
    options: ContentGenerationOptions
  ): Promise<ContentSection> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/content/section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, targetKeywords, options })
      });

      if (!response.ok) {
        throw new Error('Failed to generate section content');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating section content:', error);
      // Fallback to basic content
      return {
        ...section,
        content: this.generateBasicSectionContent(section.title, targetKeywords)
      };
    }
  }

  /**
   * Generates SEO metadata using AI
   * @private
   */
  private async generateSEOMetadata(
    topic: string,
    targetKeywords: string[],
    options: ContentGenerationOptions
  ): Promise<{ title: string; metaDescription: string }> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/content/metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, targetKeywords, options })
      });

      if (!response.ok) {
        throw new Error('Failed to generate SEO metadata');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating SEO metadata:', error);
      // Fallback to basic metadata
      return {
        title: `Complete Guide to ${topic}: Everything You Need to Know`,
        metaDescription: `Learn everything about ${topic} in this comprehensive guide. Discover best practices, tips, and expert advice to master ${topic}.`
      };
    }
  }

  /**
   * Combines sections into full content
   * @private
   */
  private combineSections(sections: ContentSection[]): string {
    return sections.map(section => 
      `## ${section.title}\n\n${section.content}\n\n`
    ).join('');
  }

  /**
   * Generates basic section content as fallback
   * @private
   */
  private generateBasicSectionContent(title: string, keywords: string[]): string {
    return `This section covers important aspects of ${title}. ` +
           `When working with ${title}, it's essential to consider various factors. ` +
           `Here are some key points to remember:\n\n` +
           `* Understanding the basics\n` +
           `* Implementing best practices\n` +
           `* Avoiding common pitfalls\n` +
           `* Following industry standards\n\n` +
           `The process involves several steps. First, you need to...\n\n` +
           `Next, consider the various aspects. This includes...\n\n` +
           `Finally, make sure to follow these guidelines...\n\n`;
  }

  /**
   * Generates basic FAQs as fallback
   * @private
   */
  private generateBasicFAQs(topic: string): Array<{ question: string; answer: string }> {
    return [
      {
        question: `What is ${topic}?`,
        answer: `${topic} is a comprehensive approach to...`
      },
      {
        question: `How does ${topic} work?`,
        answer: `${topic} works by...`
      },
      {
        question: `What are the benefits of ${topic}?`,
        answer: `The main benefits of ${topic} include...`
      }
    ];
  }

  /**
   * Generates basic how-to guide as fallback
   * @private
   */
  private generateBasicHowToGuide(task: string): Promise<{
    title: string;
    introduction: string;
    steps: Array<{ title: string; description: string; tips: string[] }>;
    conclusion: string;
  }> {
    return Promise.resolve({
      title: `How to ${task}: A Step-by-Step Guide`,
      introduction: `In this guide, we'll walk you through the process of ${task}...`,
      steps: [
        {
          title: 'Preparation',
          description: 'Before you begin...',
          tips: ['Gather materials', 'Set up workspace', 'Review guidelines']
        },
        {
          title: 'Main Process',
          description: 'The core steps involve...',
          tips: ['Follow best practices', 'Stay organized', 'Document progress']
        }
      ],
      conclusion: `Congratulations! You've successfully completed ${task}.`
    });
  }
} 