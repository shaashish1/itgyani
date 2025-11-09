"""
AI Services API Routes
Provides REST API endpoints for local AI capabilities
"""

from flask import Blueprint, request, jsonify
import asyncio
import json
from typing import Dict, Any
import logging

# Import AI services
try:
    from ..services.aiOrchestrator import (
        orchestrator, 
        generate_ai_response, 
        query_knowledge_base, 
        enhanced_ai_query,
        get_orchestrator_status
    )
    from ..services.ragService import add_document_to_rag, get_rag_stats
    from ..services.mcpService import get_mcp_capabilities, add_mcp_context
    from ..services.localAIService import get_ai_stats
except ImportError:
    # Handle relative imports
    import sys
    import os
    sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'services'))
    
    from aiOrchestrator import (
        orchestrator, 
        generate_ai_response, 
        query_knowledge_base, 
        enhanced_ai_query,
        get_orchestrator_status
    )
    from ragService import add_document_to_rag, get_rag_stats
    from mcpService import get_mcp_capabilities, add_mcp_context
    from localAIService import get_ai_stats

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create Blueprint
ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

def run_async(coro):
    """Helper to run async functions in sync context"""
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    
    return loop.run_until_complete(coro)

@ai_bp.route('/status', methods=['GET'])
def get_ai_status():
    """Get AI services status"""
    try:
        orchestrator_status = get_orchestrator_status()
        rag_stats = get_rag_stats()
        mcp_capabilities = get_mcp_capabilities()
        ai_stats = get_ai_stats()
        
        return jsonify({
            "success": True,
            "status": {
                "orchestrator": orchestrator_status,
                "rag": rag_stats,
                "mcp": {
                    "tools_count": len(mcp_capabilities.get("tools", [])),
                    "contexts_count": len(mcp_capabilities.get("contexts", [])),
                    "resources_count": len(mcp_capabilities.get("resources", [])),
                    "initialized": mcp_capabilities.get("initialized", False)
                },
                "local_ai": ai_stats,
                "timestamp": orchestrator_status.get("timestamp", "unknown")
            }
        })
        
    except Exception as e:
        logger.error(f"❌ Status check failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/generate', methods=['POST'])
def generate_text():
    """Generate text using local AI"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "JSON data required"
            }), 400
        
        prompt = data.get('prompt')
        if not prompt:
            return jsonify({
                "success": False,
                "error": "Prompt required"
            }), 400
        
        # Extract parameters
        model = data.get('model', 'default')
        max_tokens = data.get('max_tokens', 500)
        temperature = data.get('temperature', 0.7)
        
        # Generate response
        result = run_async(generate_ai_response(
            prompt=prompt,
            model=model,
            max_tokens=max_tokens,
            temperature=temperature
        ))
        
        logger.info(f"✅ Text generation: {prompt[:50]}... -> {len(result.get('text', ''))} chars")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"❌ Text generation failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/rag/query', methods=['POST'])
def rag_query():
    """Query RAG knowledge base"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "JSON data required"
            }), 400
        
        query = data.get('query')
        if not query:
            return jsonify({
                "success": False,
                "error": "Query required"
            }), 400
        
        # Extract parameters
        top_k = data.get('top_k', 5)
        
        # Query RAG
        result = run_async(query_knowledge_base(query, top_k=top_k))
        
        logger.info(f"✅ RAG query: {query[:50]}... -> {len(result.get('sources', []))} sources")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"❌ RAG query failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/rag/add-document', methods=['POST'])
def add_rag_document():
    """Add document to RAG knowledge base"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "JSON data required"
            }), 400
        
        content = data.get('content')
        if not content:
            return jsonify({
                "success": False,
                "error": "Document content required"
            }), 400
        
        metadata = data.get('metadata', {})
        
        # Add document
        doc_id = run_async(add_document_to_rag(content, metadata))
        
        logger.info(f"✅ Document added to RAG: {doc_id} ({len(content)} chars)")
        return jsonify({
            "success": True,
            "document_id": doc_id,
            "content_length": len(content),
            "metadata": metadata
        })
        
    except Exception as e:
        logger.error(f"❌ Document addition failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/enhanced/query', methods=['POST'])
def enhanced_query():
    """Enhanced query using all AI services"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "JSON data required"
            }), 400
        
        query = data.get('query')
        if not query:
            return jsonify({
                "success": False,
                "error": "Query required"
            }), 400
        
        # Extract parameters
        use_rag = data.get('use_rag', True)
        max_tokens = data.get('max_tokens', 800)
        temperature = data.get('temperature', 0.7)
        
        # Enhanced query
        result = run_async(enhanced_ai_query(
            query=query,
            use_rag=use_rag,
            max_tokens=max_tokens,
            temperature=temperature
        ))
        
        logger.info(f"✅ Enhanced query: {query[:50]}... -> {len(result.get('steps', []))} steps")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"❌ Enhanced query failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/blog/generate', methods=['POST'])
def generate_blog_content():
    """Generate blog content using AI services"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "JSON data required"
            }), 400
        
        topic = data.get('topic')
        if not topic:
            return jsonify({
                "success": False,
                "error": "Blog topic required"
            }), 400
        
        # Extract parameters
        content_type = data.get('type', 'article')  # article, tutorial, review, etc.
        length = data.get('length', 'medium')  # short, medium, long
        tone = data.get('tone', 'professional')  # professional, casual, technical
        keywords = data.get('keywords', [])
        
        # Build enhanced prompt for blog generation
        prompt = f"""
Create a {content_type} about "{topic}" with the following specifications:
- Length: {length}
- Tone: {tone}
- Keywords to include: {', '.join(keywords) if keywords else 'relevant keywords'}

Please structure the content with:
1. Engaging title
2. Introduction
3. Main content sections
4. Conclusion
5. Relevant tags/categories

Focus on providing valuable, informative content that would be suitable for a blog.
"""
        
        # Use enhanced query for better results
        result = run_async(enhanced_ai_query(
            query=prompt,
            use_rag=True,
            max_tokens=1200,
            temperature=0.8
        ))
        
        if result['success'] and result['result']:
            # Parse and structure the blog content
            blog_content = {
                "success": True,
                "topic": topic,
                "content": result['result'],
                "type": content_type,
                "length": length,
                "tone": tone,
                "keywords": keywords,
                "processing_steps": len(result.get('steps', [])),
                "processing_time": result.get('processing_time', 0),
                "generated_at": orchestrator.response_history[-1].metadata.get('timestamp') if orchestrator.response_history else None
            }
        else:
            blog_content = {
                "success": False,
                "error": result.get('error', 'Blog generation failed')
            }
        
        logger.info(f"✅ Blog content generated: {topic[:50]}... -> {len(str(result.get('result', '')))} chars")
        return jsonify(blog_content)
        
    except Exception as e:
        logger.error(f"❌ Blog generation failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/setup/sample-data', methods=['POST'])
def setup_sample_data():
    """Setup sample data for testing"""
    try:
        # Setup sample data
        run_async(orchestrator.setup_sample_data())
        
        # Add blog-specific sample data
        blog_samples = [
            {
                "content": "Blog automation with local AI models provides cost-effective content generation, maintains privacy, and ensures consistent availability without depending on external APIs.",
                "metadata": {"type": "blog_guide", "topic": "automation"}
            },
            {
                "content": "SEO optimization techniques include keyword research, content structure, meta descriptions, internal linking, and regular content updates to improve search rankings.",
                "metadata": {"type": "seo_guide", "topic": "optimization"}
            },
            {
                "content": "Local AI deployment offers benefits like data privacy, reduced latency, cost predictability, and independence from internet connectivity for critical applications.",
                "metadata": {"type": "technical_guide", "topic": "local_ai"}
            }
        ]
        
        for sample in blog_samples:
            run_async(add_document_to_rag(sample["content"], sample["metadata"]))
        
        return jsonify({
            "success": True,
            "message": "Sample data setup completed",
            "documents_added": len(blog_samples) + 4,  # 4 from orchestrator setup
            "status": get_orchestrator_status()
        })
        
    except Exception as e:
        logger.error(f"❌ Sample data setup failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/capabilities', methods=['GET'])
def get_capabilities():
    """Get AI service capabilities"""
    try:
        capabilities = {
            "text_generation": {
                "available": orchestrator.services_status.get("local_ai", False),
                "models": ["default", "creative", "precise"],
                "max_tokens": 2000,
                "features": ["completion", "chat", "creative_writing"]
            },
            "rag": {
                "available": orchestrator.services_status.get("rag", False),
                "features": ["document_ingestion", "semantic_search", "context_retrieval"],
                "supported_formats": ["text", "markdown", "json"]
            },
            "mcp": {
                "available": orchestrator.services_status.get("mcp", False),
                "tools": get_mcp_capabilities().get("tools", []),
                "features": ["tool_calling", "context_management", "resource_handling"]
            },
            "multimodal": {
                "available": False,  # Will be enabled with full Nexa SDK integration
                "planned_features": ["text_to_image", "text_to_audio", "text_to_video", "audio_to_text"]
            },
            "blog_automation": {
                "available": True,
                "features": ["content_generation", "seo_optimization", "topic_research", "automated_publishing"]
            }
        }
        
        return jsonify({
            "success": True,
            "capabilities": capabilities,
            "orchestrator_status": get_orchestrator_status()
        })
        
    except Exception as e:
        logger.error(f"❌ Capabilities check failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@ai_bp.route('/test', methods=['GET'])
def test_ai_services():
    """Test all AI services"""
    try:
        test_results = {}
        
        # Test text generation
        try:
            gen_result = run_async(generate_ai_response("Test prompt for AI generation"))
            test_results["text_generation"] = {
                "success": gen_result["success"],
                "response_length": len(gen_result.get("text", "")),
                "processing_time": gen_result.get("processing_time", 0)
            }
        except Exception as e:
            test_results["text_generation"] = {"success": False, "error": str(e)}
        
        # Test RAG
        try:
            rag_result = run_async(query_knowledge_base("local AI benefits"))
            test_results["rag"] = {
                "success": rag_result["success"],
                "sources_found": len(rag_result.get("sources", [])),
                "confidence": rag_result.get("confidence", 0)
            }
        except Exception as e:
            test_results["rag"] = {"success": False, "error": str(e)}
        
        # Test enhanced query
        try:
            enhanced_result = run_async(enhanced_ai_query("What is blog automation?"))
            test_results["enhanced"] = {
                "success": enhanced_result["success"],
                "steps_completed": len(enhanced_result.get("steps", [])),
                "processing_time": enhanced_result.get("processing_time", 0)
            }
        except Exception as e:
            test_results["enhanced"] = {"success": False, "error": str(e)}
        
        # Overall test status
        all_tests_passed = all(result.get("success", False) for result in test_results.values())
        
        return jsonify({
            "success": True,
            "test_results": test_results,
            "all_tests_passed": all_tests_passed,
            "services_tested": len(test_results),
            "timestamp": orchestrator.response_history[-1].metadata.get("timestamp") if orchestrator.response_history else None
        })
        
    except Exception as e:
        logger.error(f"❌ AI services test failed: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Error handlers
@ai_bp.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found",
        "available_endpoints": [
            "/api/ai/status",
            "/api/ai/generate",
            "/api/ai/rag/query",
            "/api/ai/rag/add-document",
            "/api/ai/enhanced/query",
            "/api/ai/blog/generate",
            "/api/ai/setup/sample-data",
            "/api/ai/capabilities",
            "/api/ai/test"
        ]
    }), 404

@ai_bp.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error",
        "message": "Please check the logs for more details"
    }), 500

# Register blueprint function
def register_ai_routes(app):
    """Register AI routes with Flask app"""
    app.register_blueprint(ai_bp)
    logger.info("✅ AI routes registered successfully")
    return ai_bp