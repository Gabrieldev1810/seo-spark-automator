/**
 * SchemaAgent - Handles schema generation for AI-optimized pages
 */
export class SchemaAgent {
  /**
   * Generates FAQ schema for the given FAQs
   * @param faqs The FAQs to generate schema for
   * @returns The generated FAQ schema
   */
  async generateFaqSchema(faqs: Array<{ question: string; answer: string }>): Promise<object> {
    console.log(`Generating FAQ schema for ${faqs.length} FAQs`);
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  /**
   * Generates HowTo schema for the given content
   * @param title The title of the how-to
   * @param steps The steps of the how-to
   * @returns The generated HowTo schema
   */
  async generateHowToSchema(title: string, steps: string[]): Promise<object> {
    console.log(`Generating HowTo schema for "${title}" with ${steps.length} steps`);
    
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": title,
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": `Step ${index + 1}`,
        "text": step
      }))
    };
  }

  /**
   * Generates Article schema for the given content
   * @param title The title of the article
   * @param description The description of the article
   * @param url The URL of the article
   * @param datePublished The publication date
   * @returns The generated Article schema
   */
  async generateArticleSchema(
    title: string, 
    description: string, 
    url: string, 
    datePublished: string
  ): Promise<object> {
    console.log(`Generating Article schema for "${title}"`);
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "url": url,
      "datePublished": datePublished,
      "publisher": {
        "@type": "Organization",
        "name": "SEO Spark Automator",
        "logo": {
          "@type": "ImageObject",
          "url": "https://seosparkautomator.com/logo.png"
        }
      }
    };
  }

  /**
   * Generates LocalBusiness schema for the given business
   * @param name The name of the business
   * @param address The address of the business
   * @param phone The phone number of the business
   * @param url The URL of the business
   * @returns The generated LocalBusiness schema
   */
  async generateLocalBusinessSchema(
    name: string,
    address: string,
    phone: string,
    url: string
  ): Promise<object> {
    console.log(`Generating LocalBusiness schema for "${name}"`);
    
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address
      },
      "telephone": phone,
      "url": url
    };
  }
} 