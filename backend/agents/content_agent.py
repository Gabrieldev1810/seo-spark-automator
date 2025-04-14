from typing import Dict, Any
import logging
from .base_agent import BaseAgent
from ..ai.provider_factory import AIProviderFactory

logger = logging.getLogger(__name__)

class ContentAgent(BaseAgent):
    def __init__(self, agent_id: str, mcp_server_url: str):
        super().__init__(agent_id, mcp_server_url)
        self.ai_provider = AIProviderFactory.create_provider()

    async def process_task(self, task: Dict[str, Any]) -> Any:
        """Process content-related tasks"""
        task_type = task.get("type")
        task_data = task.get("data", {})
        
        if task_type == "generate_content":
            return await self._generate_content(task_data)
        elif task_type == "analyze_content":
            return await self._analyze_content(task_data)
        elif task_type == "optimize_content":
            return await self._optimize_content(task_data)
        else:
            raise ValueError(f"Unknown task type: {task_type}")

    async def _generate_content(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate SEO-optimized content"""
        try:
            # Extract parameters
            topic = data.get("topic")
            keywords = data.get("keywords", [])
            target_length = data.get("target_length", 1000)
            content_type = data.get("content_type", "blog_post")
            
            # Create prompt
            prompt = f"""
            Create a {content_type} about {topic}.
            Target length: {target_length} words
            Include these keywords naturally: {', '.join(keywords)}
            
            The content should:
            1. Be engaging and informative
            2. Follow SEO best practices
            3. Include a compelling headline
            4. Have proper structure with H2 and H3 headings
            5. Include meta description
            6. Be optimized for featured snippets
            """
            
            # Generate content using AI provider
            result = await self.ai_provider.generate_text(prompt)
            
            # Share context with other agents
            await self.send_context_update({
                "last_generated_topic": topic,
                "last_generated_keywords": keywords,
                "content_type": content_type
            })
            
            return {
                "content": result,
                "metadata": {
                    "topic": topic,
                    "keywords": keywords,
                    "content_type": content_type,
                    "length": len(result.split())
                }
            }
            
        except Exception as e:
            logger.error(f"Error generating content: {e}")
            raise

    async def _analyze_content(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze content for SEO effectiveness"""
        try:
            content = data.get("content")
            if not content:
                raise ValueError("No content provided for analysis")
            
            # Use AI provider to analyze content
            analysis = await self.ai_provider.analyze_text(content)
            
            return {
                "analysis": analysis,
                "content_length": len(content.split()),
                "timestamp": data.get("timestamp")
            }
            
        except Exception as e:
            logger.error(f"Error analyzing content: {e}")
            raise

    async def _optimize_content(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Optimize existing content for SEO"""
        try:
            content = data.get("content")
            target_keywords = data.get("target_keywords", [])
            
            if not content:
                raise ValueError("No content provided for optimization")
            
            # First analyze the content
            analysis = await self._analyze_content({"content": content})
            
            # Use AI provider to optimize content
            optimized_content = await self.ai_provider.optimize_text(
                content,
                target_keywords=target_keywords
            )
            
            return {
                "original_content": content,
                "optimized_content": optimized_content,
                "analysis": analysis,
                "improvements": {
                    "keywords_added": target_keywords,
                    "original_length": len(content.split()),
                    "optimized_length": len(optimized_content.split())
                }
            }
            
        except Exception as e:
            logger.error(f"Error optimizing content: {e}")
            raise 