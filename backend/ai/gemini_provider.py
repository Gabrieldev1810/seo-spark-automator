import google.generativeai as genai
from typing import Dict, Any, List
import os
from .base_provider import BaseAIProvider

class GeminiProvider(BaseAIProvider):
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """Generate text using Gemini"""
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error generating text with Gemini: {str(e)}")
    
    async def analyze_text(self, text: str, **kwargs) -> Dict[str, Any]:
        """Analyze text using Gemini"""
        try:
            analysis_prompt = f"""
            Analyze this text for SEO effectiveness:
            
            {text}
            
            Provide analysis for:
            1. SEO optimization
            2. Readability
            3. Keyword usage
            4. Content structure
            5. Engagement potential
            6. Featured snippet optimization
            
            Format the response as a JSON object with these keys:
            - seo_score (0-100)
            - readability_score (0-100)
            - keyword_usage (list of found keywords)
            - structure_analysis (string)
            - engagement_score (0-100)
            - featured_snippet_potential (boolean)
            """
            
            response = await self.model.generate_content_async(analysis_prompt)
            # Parse the response as JSON
            import json
            return json.loads(response.text)
        except Exception as e:
            raise Exception(f"Error analyzing text with Gemini: {str(e)}")
    
    async def optimize_text(self, text: str, **kwargs) -> str:
        """Optimize text using Gemini"""
        try:
            target_keywords = kwargs.get('target_keywords', [])
            optimization_prompt = f"""
            Optimize this content for SEO:
            
            Original content:
            {text}
            
            Target keywords: {', '.join(target_keywords)}
            
            Provide optimized version that:
            1. Maintains the original message
            2. Improves SEO effectiveness
            3. Enhances readability
            4. Better incorporates target keywords
            5. Optimizes for featured snippets
            """
            
            response = await self.model.generate_content_async(optimization_prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error optimizing text with Gemini: {str(e)}")
    
    async def generate_keywords(self, topic: str, **kwargs) -> List[str]:
        """Generate keywords using Gemini"""
        try:
            keyword_prompt = f"""
            Generate a list of relevant SEO keywords for the topic: {topic}
            
            Include:
            1. Primary keywords
            2. Long-tail keywords
            3. Related terms
            4. Question-based keywords
            
            Return the keywords as a JSON array of strings.
            """
            
            response = await self.model.generate_content_async(keyword_prompt)
            # Parse the response as JSON
            import json
            return json.loads(response.text)
        except Exception as e:
            raise Exception(f"Error generating keywords with Gemini: {str(e)}") 