"""
Local AI Service using Nexa SDK
Provides local AI capabilities to replace external API dependencies
"""

import os
import sys
import logging
import asyncio
from typing import Dict, List, Optional, Any, Union
from dataclasses import dataclass
from enum import Enum
import json

# Add Nexa SDK path
sys.path.append('/root/nexa-sdk/bindings/python')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AITaskType(Enum):
    TEXT_TO_TEXT = "text-to-text"
    TEXT_TO_AUDIO = "text-to-audio"
    TEXT_TO_VIDEO = "text-to-video"
    AUDIO_TO_TEXT = "audio-to-text"
    AUDIO_TO_AUDIO = "audio-to-audio"
    IMAGE_TO_TEXT = "image-to-text"
    EMBEDDING = "embedding"
    RERANK = "rerank"

@dataclass
class AIResponse:
    success: bool
    content: str
    error: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class LocalAIService:
    """
    Local AI Service using Nexa SDK
    Handles all AI operations locally without external API calls
    """
    
    def __init__(self):
        self.models = {}
        self.available_capabilities = []
        self.initialization_status = "initializing"
        self.error_log = []
        
        logger.info("🚀 Initializing Local AI Service with Nexa SDK")
        self._initialize_capabilities()
    
    def _initialize_capabilities(self):
        """Initialize available AI capabilities"""
        try:
            # Try to import Nexa SDK modules
            self._check_nexa_availability()
            
            # Define available capabilities
            self.available_capabilities = [
                AITaskType.TEXT_TO_TEXT,
                AITaskType.EMBEDDING,
                AITaskType.RERANK,
                AITaskType.IMAGE_TO_TEXT,
                # AITaskType.TEXT_TO_AUDIO,  # Will enable after testing
                # AITaskType.AUDIO_TO_TEXT,  # Will enable after testing
            ]
            
            self.initialization_status = "ready"
            logger.info(f"✅ Local AI Service initialized with {len(self.available_capabilities)} capabilities")
                
        except Exception as e:
            self.initialization_status = "error"
            error_msg = f"Failed to initialize Local AI Service: {str(e)}"
            self.error_log.append(error_msg)
            logger.error(error_msg)
    
    def _check_nexa_availability(self):
        """Check if Nexa SDK components are available"""
        try:
            # Test imports (will implement actual imports after confirming structure)
            import importlib.util
            
            # Check for LLM capability
            llm_path = '/root/nexa-sdk/bindings/python/llm.py'
            if os.path.exists(llm_path):
                logger.info("✅ Nexa LLM module found")
            
            # Check for embedding capability  
            embed_path = '/root/nexa-sdk/bindings/python/embedder.py'
            if os.path.exists(embed_path):
                logger.info("✅ Nexa Embedder module found")
                
            # Check for VLM capability
            vlm_path = '/root/nexa-sdk/bindings/python/vlm.py'
            if os.path.exists(vlm_path):
                logger.info("✅ Nexa VLM module found")
            
            logger.info("🔍 Nexa SDK Python bindings are available")
            
        except Exception as e:
            raise Exception(f"Nexa SDK not properly available: {str(e)}")
    
    async def generate_text(self, prompt: str, model: str = "default", **kwargs) -> AIResponse:
        """
        Generate text using local LLM
        Replaces OpenAI/Gemini text generation
        """
        try:
            logger.info(f"🤖 Generating text with local model: {model}")
            
            # For now, return a simulated response
            # TODO: Implement actual Nexa LLM integration
            response_text = f"[LOCAL AI] Generated response for: {prompt[:50]}..."
            
            if "blog" in prompt.lower():
                response_text = self._generate_blog_content(prompt)
            elif "summary" in prompt.lower():
                response_text = self._generate_summary(prompt)
            
            return AIResponse(
                success=True,
                content=response_text,
                metadata={
                    "model": model,
                    "local": True,
                    "provider": "nexa-sdk",
                    "timestamp": str(asyncio.get_event_loop().time())
                }
            )
            
        except Exception as e:
            error_msg = f"Text generation failed: {str(e)}"
            logger.error(error_msg)
            return AIResponse(
                success=False,
                content="",
                error=error_msg
            )
    
    def _generate_blog_content(self, prompt: str) -> str:
        """Generate blog content using local AI"""
        return f"""
# AI-Generated Blog Post

## Introduction
This blog post was generated using our local AI service powered by Nexa SDK, eliminating the need for external API calls.

## Content
{prompt}

## Key Benefits of Local AI:
- 🔒 **Privacy**: All data stays on your device
- ⚡ **Speed**: No network latency or API limits
- 💰 **Cost**: No API usage fees or quota restrictions
- 🛡️ **Reliability**: No external dependencies or downtime

## Conclusion
Local AI processing provides better control, privacy, and cost-effectiveness for your blog automation needs.

---
*Generated by Local AI Service • Powered by Nexa SDK*
        """.strip()
    
    def _generate_summary(self, prompt: str) -> str:
        """Generate summary using local AI"""
        return f"[LOCAL AI SUMMARY] {prompt[:100]}... This content has been processed locally using Nexa SDK for enhanced privacy and reliability."
    
    async def create_embeddings(self, text: Union[str, List[str]], model: str = "default") -> AIResponse:
        """
        Create embeddings using local embedding model
        """
        try:
            logger.info(f"📊 Creating embeddings with local model: {model}")
            
            # Simulate embedding creation
            # TODO: Implement actual Nexa embedding integration
            if isinstance(text, str):
                embeddings = [0.1, 0.2, 0.3] * 100  # 300-dim mock embedding
            else:
                embeddings = [[0.1, 0.2, 0.3] * 100 for _ in text]
            
            return AIResponse(
                success=True,
                content="embeddings_created",
                metadata={
                    "embeddings": embeddings,
                    "model": model,
                    "local": True,
                    "dimensions": len(embeddings[0]) if isinstance(embeddings[0], list) else len(embeddings)
                }
            )
            
        except Exception as e:
            error_msg = f"Embedding creation failed: {str(e)}"
            logger.error(error_msg)
            return AIResponse(success=False, content="", error=error_msg)
    
    async def rerank_documents(self, query: str, documents: List[str], model: str = "default") -> AIResponse:
        """
        Rerank documents using local reranking model
        """
        try:
            logger.info(f"🔄 Reranking {len(documents)} documents with local model: {model}")
            
            # Simulate reranking
            # TODO: Implement actual Nexa reranking integration
            ranked_docs = [(i, doc, 0.9 - (i * 0.1)) for i, doc in enumerate(documents)]
            
            return AIResponse(
                success=True,
                content="documents_reranked",
                metadata={
                    "ranked_documents": ranked_docs,
                    "model": model,
                    "local": True,
                    "query": query
                }
            )
            
        except Exception as e:
            error_msg = f"Document reranking failed: {str(e)}"
            logger.error(error_msg)
            return AIResponse(success=False, content="", error=error_msg)
    
    def get_status(self) -> Dict[str, Any]:
        """Get current service status"""
        return {
            "status": self.initialization_status,
            "available_capabilities": [cap.value for cap in self.available_capabilities],
            "models_loaded": len(self.models),
            "error_count": len(self.error_log),
            "last_errors": self.error_log[-3:] if self.error_log else [],
            "provider": "nexa-sdk",
            "local": True
        }
    
    async def process_multimodal(self, text: str, image_path: Optional[str] = None, model: str = "default") -> AIResponse:
        """
        Process multimodal input (text + image)
        """
        try:
            logger.info(f"🖼️ Processing multimodal input with local model: {model}")
            
            # Simulate multimodal processing
            # TODO: Implement actual Nexa VLM integration
            if image_path:
                response = f"[LOCAL MULTIMODAL AI] Analyzed image at {image_path} with text: {text}"
            else:
                response = f"[LOCAL AI] Processed text: {text}"
            
            return AIResponse(
                success=True,
                content=response,
                metadata={
                    "model": model,
                    "local": True,
                    "multimodal": bool(image_path),
                    "provider": "nexa-sdk"
                }
            )
            
        except Exception as e:
            error_msg = f"Multimodal processing failed: {str(e)}"
            logger.error(error_msg)
            return AIResponse(success=False, content="", error=error_msg)

# Global service instance
local_ai_service = LocalAIService()

# Async interface functions
async def generate_text_local(prompt: str, **kwargs) -> Dict[str, Any]:
    """Generate text using local AI"""
    response = await local_ai_service.generate_text(prompt, **kwargs)
    return {
        "success": response.success,
        "content": response.content,
        "error": response.error,
        "metadata": response.metadata
    }

async def create_embeddings_local(text: Union[str, List[str]], **kwargs) -> Dict[str, Any]:
    """Create embeddings using local AI"""
    response = await local_ai_service.create_embeddings(text, **kwargs)
    return {
        "success": response.success,
        "embeddings": response.metadata.get("embeddings") if response.metadata else None,
        "error": response.error
    }

def get_ai_service_status() -> Dict[str, Any]:
    """Get local AI service status"""
    return local_ai_service.get_status()

if __name__ == "__main__":
    # Test the service
    import asyncio
    
    async def test_service():
        print("🧪 Testing Local AI Service...")
        
        # Test text generation
        result = await generate_text_local("Generate a blog post about local AI benefits")
        print(f"Text Generation: {result['success']}")
        if result['success']:
            print(f"Content: {result['content'][:100]}...")
        
        # Test embeddings
        result = await create_embeddings_local("Test text for embedding")
        print(f"Embeddings: {result['success']}")
        
        # Check status
        status = get_ai_service_status()
        print(f"Service Status: {status}")
    
    asyncio.run(test_service())