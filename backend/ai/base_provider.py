from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseAIProvider(ABC):
    """Base class for AI providers"""
    
    @abstractmethod
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """Generate text based on the prompt"""
        pass
    
    @abstractmethod
    async def analyze_text(self, text: str, **kwargs) -> Dict[str, Any]:
        """Analyze text and return insights"""
        pass
    
    @abstractmethod
    async def optimize_text(self, text: str, **kwargs) -> str:
        """Optimize text based on given criteria"""
        pass
    
    @abstractmethod
    async def generate_keywords(self, topic: str, **kwargs) -> List[str]:
        """Generate relevant keywords for a topic"""
        pass 