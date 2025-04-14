import os
from typing import Optional
from .base_provider import BaseAIProvider
from .gemini_provider import GeminiProvider

class AIProviderFactory:
    @staticmethod
    def create_provider() -> BaseAIProvider:
        """Create an AI provider based on environment configuration"""
        provider = os.getenv("AI_PROVIDER", "gemini").lower()
        
        if provider == "gemini":
            return GeminiProvider()
        else:
            raise ValueError(f"Unsupported AI provider: {provider}")
    
    @staticmethod
    def get_available_providers() -> list[str]:
        """Get list of available AI providers"""
        return ["gemini"] 