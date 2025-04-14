
/**
 * SchemaAgent - Handles structured data and schema markup for SEO
 */
export class SchemaAgent {
  /**
   * Generates FAQ schema markup
   * @param faqs Array of FAQ items
   * @returns Structured data object for FAQs
   */
  async generateFaqSchema(faqs: Array<{ question: string; answer: string }>): Promise<object> {
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
   * Generates HowTo schema markup
   * @param howto HowTo content structure
   * @returns Structured data object for HowTo
   */
  async generateHowToSchema(howto: {
    title: string;
    introduction: string;
    steps: Array<{ title: string; description: string }>;
    conclusion: string;
  }): Promise<object> {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": howto.title,
      "description": howto.introduction,
      "step": howto.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.title,
        "itemListElement": {
          "@type": "HowToDirection",
          "text": step.description
        }
      }))
    };
  }

  /**
   * Generates local business schema markup
   * @param business Business information
   * @returns Structured data object for Local Business
   */
  async generateLocalBusinessSchema(business: {
    name: string;
    description: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    phone: string;
    website: string;
    geo: {
      latitude: number;
      longitude: number;
    };
    hours: Array<{
      day: string;
      open: string;
      close: string;
    }>;
  }): Promise<object> {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": business.name,
      "description": business.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address.street,
        "addressLocality": business.address.city,
        "addressRegion": business.address.state,
        "postalCode": business.address.zip,
        "addressCountry": business.address.country
      },
      "telephone": business.phone,
      "url": business.website,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": business.geo.latitude,
        "longitude": business.geo.longitude
      },
      "openingHoursSpecification": business.hours.map(hour => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hour.day,
        "opens": hour.open,
        "closes": hour.close
      }))
    };
  }

  /**
   * Generates article schema markup
   * @param article Article information
   * @returns Structured data object for Article
   */
  async generateArticleSchema(article: {
    title: string;
    headline: string;
    description: string;
    author: string;
    publishDate: string;
    modifiedDate: string;
    imageUrl: string;
    publisherName: string;
    publisherLogo: string;
  }): Promise<object> {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.headline,
      "description": article.description,
      "image": article.imageUrl,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": article.publisherName,
        "logo": {
          "@type": "ImageObject",
          "url": article.publisherLogo
        }
      },
      "datePublished": article.publishDate,
      "dateModified": article.modifiedDate
    };
  }

  /**
   * Generates breadcrumb schema markup
   * @param breadcrumbs Breadcrumb items
   * @returns Structured data object for BreadcrumbList
   */
  async generateBreadcrumbSchema(breadcrumbs: Array<{
    name: string;
    url: string;
  }>): Promise<object> {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  }
}
