"""
Local AI Orchestrator Service
Combines LocalAI, RAG, and MCP services for comprehensive local AI capabilities
"""

import asyncio
import json
from typing import Dict, List, Any, Optional, Union
from dataclasses import dataclass
import logging
from datetime import datetime

# Import local services
try:
    from .localAIService import local_ai_service, generate_text, generate_embeddings
    from .ragService import rag_service, query_rag, add_document_to_rag
    from .mcpService import mcp_service, call_mcp_tool, add_mcp_context
except ImportError:
    # Handle relative imports when running as script
    import sys
    import os
    sys.path.append(os.path.dirname(__file__))
    
    from localAIService import local_ai_service, generate_text, generate_embeddings
    from ragService import rag_service, query_rag, add_document_to_rag
    from mcpService import mcp_service, call_mcp_tool, add_mcp_context

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class AIRequest:
    id: str
    type: str  # 'generate', 'rag_query', 'tool_call', 'multimodal'
    prompt: str
    parameters: Dict[str, Any]
    context: Optional[Dict[str, Any]] = None

@dataclass
class AIResponse:
    id: str
    success: bool
    result: Any
    metadata: Dict[str, Any]
    error: Optional[str] = None
    processing_time: float = 0.0

class LocalAIOrchestrator:
    """
    Local AI Orchestrator
    Provides unified interface for all local AI capabilities
    """
    
    def __init__(self):
        self.is_initialized = False
        self.services_status = {
            "local_ai": False,
            "rag": False,
            "mcp": False
        }
        self.request_history: List[AIRequest] = []
        self.response_history: List[AIResponse] = []
        
        logger.info("🎭 Initializing Local AI Orchestrator")
        self._initialize()
    
    def _initialize(self):
        """Initialize the orchestrator and all services"""
        try:
            # Check service status
            self.services_status["local_ai"] = hasattr(local_ai_service, 'is_initialized') and local_ai_service.is_initialized
            self.services_status["rag"] = hasattr(rag_service, 'is_initialized') and rag_service.is_initialized
            self.services_status["mcp"] = hasattr(mcp_service, 'is_initialized') and mcp_service.is_initialized
            
            self.is_initialized = True
            active_services = sum(self.services_status.values())
            logger.info(f"✅ Orchestrator initialized ({active_services}/3 services active)")
            
        except Exception as e:
            logger.error(f"❌ Orchestrator initialization failed: {str(e)}")
            self.is_initialized = False
    
    async def process_request(self, request: AIRequest) -> AIResponse:
        """
        Process an AI request using appropriate services
        """
        start_time = datetime.now()
        
        try:
            if not self.is_initialized:
                return AIResponse(
                    id=request.id,
                    success=False,
                    result=None,
                    metadata={},
                    error="Orchestrator not initialized"
                )
            
            # Store request
            self.request_history.append(request)
            
            # Route request based on type
            if request.type == "generate":
                result = await self._handle_generate_request(request)
            elif request.type == "rag_query":
                result = await self._handle_rag_request(request)
            elif request.type == "tool_call":
                result = await self._handle_tool_request(request)
            elif request.type == "multimodal":
                result = await self._handle_multimodal_request(request)
            elif request.type == "enhanced":
                result = await self._handle_enhanced_request(request)
            else:
                result = AIResponse(
                    id=request.id,
                    success=False,
                    result=None,
                    metadata={},
                    error=f"Unknown request type: {request.type}"
                )
            
            # Calculate processing time
            processing_time = (datetime.now() - start_time).total_seconds()
            result.processing_time = processing_time
            
            # Store response
            self.response_history.append(result)
            
            logger.info(f"🎯 Request processed: {request.type} in {processing_time:.2f}s")
            return result
            
        except Exception as e:
            processing_time = (datetime.now() - start_time).total_seconds()
            error_response = AIResponse(
                id=request.id,
                success=False,
                result=None,
                metadata={},
                error=str(e),
                processing_time=processing_time
            )
            self.response_history.append(error_response)
            logger.error(f"❌ Request processing failed: {str(e)}")
            return error_response
    
    async def _handle_generate_request(self, request: AIRequest) -> AIResponse:
        """Handle text generation request"""
        try:
            if not self.services_status["local_ai"]:
                return AIResponse(
                    id=request.id,
                    success=False,
                    result=None,
                    metadata={},
                    error="Local AI service not available"
                )
            
            # Extract parameters
            model = request.parameters.get("model", "default")
            max_tokens = request.parameters.get("max_tokens", 500)
            temperature = request.parameters.get("temperature", 0.7)
            
            # Generate text
            result = await generate_text(
                prompt=request.prompt,
                model=model,
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            return AIResponse(
                id=request.id,
                success=result["success"],
                result=result,
                metadata={
                    "model": model,
                    "tokens_used": result.get("tokens_used", 0),
                    "service": "local_ai"
                },
                error=result.get("error")
            )
            
        except Exception as e:
            return AIResponse(
                id=request.id,
                success=False,
                result=None,
                metadata={},
                error=str(e)
            )
    
    async def _handle_rag_request(self, request: AIRequest) -> AIResponse:
        """Handle RAG query request"""
        try:
            if not self.services_status["rag"]:
                return AIResponse(
                    id=request.id,
                    success=False,
                    result=None,
                    metadata={},
                    error="RAG service not available"
                )
            
            # Extract parameters
            top_k = request.parameters.get("top_k", 5)
            
            # Query RAG
            result = await query_rag(request.prompt, top_k)
            
            return AIResponse(
                id=request.id,
                success=result["success"],
                result=result,
                metadata={
                    "top_k": top_k,
                    "sources_count": len(result.get("sources", [])),
                    "confidence": result.get("confidence", 0.0),
                    "service": "rag"
                },
                error=result.get("error")
            )
            
        except Exception as e:
            return AIResponse(
                id=request.id,
                success=False,
                result=None,
                metadata={},
                error=str(e)
            )
    
    async def _handle_tool_request(self, request: AIRequest) -> AIResponse:
        """Handle MCP tool call request"""
        try:
            if not self.services_status["mcp"]:
                return AIResponse(
                    id=request.id,
                    success=False,
                    result=None,
                    metadata={},
                    error="MCP service not available"
                )
            
            # Extract tool name from parameters
            tool_name = request.parameters.get("tool_name")
            tool_params = request.parameters.get("tool_params", {})
            
            if not tool_name:
                return AIResponse(
                    id=request.id,
                    success=False,
                    result=None,
                    metadata={},
                    error="Tool name required"
                )
            
            # Call MCP tool
            result = await call_mcp_tool(tool_name, tool_params)
            
            return AIResponse(
                id=request.id,
                success=result["success"],
                result=result,
                metadata={
                    "tool_name": tool_name,
                    "service": "mcp"
                },
                error=result.get("error")
            )
            
        except Exception as e:
            return AIResponse(
                id=request.id,
                success=False,
                result=None,
                metadata={},
                error=str(e)
            )
    
    async def _handle_multimodal_request(self, request: AIRequest) -> AIResponse:
        """Handle multimodal request (text + image/audio/video)"""
        try:
            # This would integrate with Nexa SDK's multimodal capabilities
            # For now, return a placeholder response
            
            modality = request.parameters.get("modality", "text")
            input_data = request.parameters.get("input_data")
            
            result = {
                "success": True,
                "text": f"Multimodal processing for {modality} input: {request.prompt}",
                "modality": modality,
                "placeholder": True,
                "message": "Multimodal processing will be implemented with Nexa SDK integration"
            }
            
            return AIResponse(
                id=request.id,
                success=True,
                result=result,
                metadata={
                    "modality": modality,
                    "service": "multimodal"
                }
            )
            
        except Exception as e:
            return AIResponse(
                id=request.id,
                success=False,
                result=None,
                metadata={},
                error=str(e)
            )
    
    async def _handle_enhanced_request(self, request: AIRequest) -> AIResponse:
        """Handle enhanced request combining multiple services"""
        try:
            # Enhanced workflow: RAG + Local AI + MCP tools
            enhanced_result = {
                "steps": [],
                "final_result": None,
                "combined_metadata": {}
            }
            
            # Step 1: RAG query if context needed
            if request.parameters.get("use_rag", True):
                rag_result = await query_rag(request.prompt, 3)
                enhanced_result["steps"].append({
                    "step": "rag_query",
                    "success": rag_result["success"],
                    "sources": len(rag_result.get("sources", []))
                })
                
                if rag_result["success"]:
                    # Enhance prompt with RAG context
                    context = "\n".join([source["content"] for source in rag_result["sources"][:2]])
                    enhanced_prompt = f"Context:\n{context}\n\nQuery: {request.prompt}\n\nPlease provide a comprehensive answer based on the context above."
                    request.prompt = enhanced_prompt
            
            # Step 2: Generate response with local AI
            if self.services_status["local_ai"]:
                ai_result = await generate_text(
                    prompt=request.prompt,
                    max_tokens=request.parameters.get("max_tokens", 800),
                    temperature=request.parameters.get("temperature", 0.7)
                )
                enhanced_result["steps"].append({
                    "step": "text_generation",
                    "success": ai_result["success"],
                    "tokens": ai_result.get("tokens_used", 0)
                })
                
                if ai_result["success"]:
                    enhanced_result["final_result"] = ai_result["text"]
            
            # Step 3: Add to context for future use
            if enhanced_result["final_result"]:
                context_id = add_mcp_context(
                    f"Enhanced Query Result",
                    {
                        "query": request.prompt,
                        "result": enhanced_result["final_result"],
                        "timestamp": datetime.now().isoformat()
                    },
                    {"type": "enhanced_query", "query_id": request.id}
                )
                enhanced_result["steps"].append({
                    "step": "context_storage",
                    "context_id": context_id
                })
            
            return AIResponse(
                id=request.id,
                success=bool(enhanced_result["final_result"]),
                result=enhanced_result,
                metadata={
                    "service": "enhanced",
                    "steps_completed": len(enhanced_result["steps"]),
                    "services_used": ["rag", "local_ai", "mcp"]
                }
            )
            
        except Exception as e:
            return AIResponse(
                id=request.id,
                success=False,
                result=None,
                metadata={},
                error=str(e)
            )
    
    def get_status(self) -> Dict[str, Any]:
        """Get orchestrator status"""
        return {
            "initialized": self.is_initialized,
            "services": self.services_status,
            "request_count": len(self.request_history),
            "response_count": len(self.response_history),
            "avg_processing_time": sum(r.processing_time for r in self.response_history) / len(self.response_history) if self.response_history else 0,
            "success_rate": sum(1 for r in self.response_history if r.success) / len(self.response_history) if self.response_history else 0
        }
    
    async def setup_sample_data(self):
        """Setup sample data for testing"""
        try:
            # Add sample documents to RAG
            await rag_service.add_sample_documents()
            
            # Add sample context to MCP
            add_mcp_context(
                "Sample Blog Context",
                "This is sample content for blog automation testing with local AI models.",
                {"type": "blog", "purpose": "testing"}
            )
            
            logger.info("📚 Sample data setup completed")
            
        except Exception as e:
            logger.error(f"❌ Sample data setup failed: {str(e)}")

# Global orchestrator instance
orchestrator = LocalAIOrchestrator()

# Convenience functions
async def generate_ai_response(prompt: str, model: str = "default", **kwargs) -> Dict[str, Any]:
    """Generate AI response using orchestrator"""
    request = AIRequest(
        id=f"gen_{int(datetime.now().timestamp())}",
        type="generate",
        prompt=prompt,
        parameters={"model": model, **kwargs}
    )
    
    response = await orchestrator.process_request(request)
    return {
        "success": response.success,
        "text": response.result.get("text") if response.success else "",
        "error": response.error,
        "processing_time": response.processing_time
    }

async def query_knowledge_base(query: str, **kwargs) -> Dict[str, Any]:
    """Query knowledge base using RAG"""
    request = AIRequest(
        id=f"rag_{int(datetime.now().timestamp())}",
        type="rag_query",
        prompt=query,
        parameters=kwargs
    )
    
    response = await orchestrator.process_request(request)
    return response.result if response.success else {"success": False, "error": response.error}

async def enhanced_ai_query(query: str, **kwargs) -> Dict[str, Any]:
    """Enhanced AI query combining all services"""
    request = AIRequest(
        id=f"enh_{int(datetime.now().timestamp())}",
        type="enhanced",
        prompt=query,
        parameters=kwargs
    )
    
    response = await orchestrator.process_request(request)
    return {
        "success": response.success,
        "result": response.result.get("final_result") if response.success else None,
        "steps": response.result.get("steps", []) if response.success else [],
        "error": response.error,
        "processing_time": response.processing_time
    }

def get_orchestrator_status() -> Dict[str, Any]:
    """Get orchestrator status"""
    return orchestrator.get_status()

if __name__ == "__main__":
    # Test the orchestrator
    import asyncio
    
    async def test_orchestrator():
        print("🧪 Testing Local AI Orchestrator...")
        
        # Setup sample data
        await orchestrator.setup_sample_data()
        
        # Test basic generation
        result = await generate_ai_response("What are the benefits of local AI?")
        print(f"Generation Success: {result['success']}")
        if result['success']:
            print(f"Response: {result['text'][:100]}...")
        
        # Test RAG query
        rag_result = await query_knowledge_base("local AI models privacy")
        print(f"RAG Success: {rag_result['success']}")
        if rag_result['success']:
            print(f"RAG Answer: {rag_result['answer'][:100]}...")
        
        # Test enhanced query
        enhanced_result = await enhanced_ai_query("How can I use local AI for blog automation?")
        print(f"Enhanced Success: {enhanced_result['success']}")
        if enhanced_result['success']:
            print(f"Enhanced Result: {enhanced_result['result'][:100] if enhanced_result['result'] else 'No result'}...")
            print(f"Steps: {len(enhanced_result['steps'])}")
        
        # Get status
        status = get_orchestrator_status()
        print(f"Orchestrator Status: {status}")
    
    asyncio.run(test_orchestrator())