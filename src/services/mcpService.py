"""
MCP (Model Context Protocol) Integration Service
Provides enhanced context management and tool integration for AI models
"""

import json
import asyncio
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, asdict
from datetime import datetime
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class MCPTool:
    name: str
    description: str
    parameters: Dict[str, Any]
    handler: Callable

@dataclass
class MCPContext:
    id: str
    name: str
    content: Any
    metadata: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

@dataclass
class MCPResource:
    uri: str
    name: str
    description: str
    mime_type: str
    content: Any

class MCPService:
    """
    Model Context Protocol Service
    Manages context, tools, and resources for AI models
    """
    
    def __init__(self, storage_path: str = "/tmp/mcp_storage"):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)
        
        self.tools: Dict[str, MCPTool] = {}
        self.contexts: Dict[str, MCPContext] = {}
        self.resources: Dict[str, MCPResource] = {}
        self.is_initialized = False
        
        logger.info(f"🔧 Initializing MCP service with storage: {storage_path}")
        self._initialize()
    
    def _initialize(self):
        """Initialize the MCP service"""
        try:
            self._register_default_tools()
            self._load_contexts()
            self._load_resources()
            self.is_initialized = True
            logger.info(f"✅ MCP service initialized with {len(self.tools)} tools, {len(self.contexts)} contexts")
        except Exception as e:
            logger.error(f"❌ MCP service initialization failed: {str(e)}")
            self.is_initialized = False
    
    def _register_default_tools(self):
        """Register default MCP tools"""
        # File operations tool
        self.register_tool(
            name="read_file",
            description="Read content from a file",
            parameters={
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "Path to the file to read"}
                },
                "required": ["file_path"]
            },
            handler=self._handle_read_file
        )
        
        # Search tool
        self.register_tool(
            name="search_documents",
            description="Search through available documents",
            parameters={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"},
                    "limit": {"type": "integer", "description": "Maximum results", "default": 10}
                },
                "required": ["query"]
            },
            handler=self._handle_search_documents
        )
        
        # Context management tool
        self.register_tool(
            name="get_context",
            description="Retrieve stored context by ID",
            parameters={
                "type": "object",
                "properties": {
                    "context_id": {"type": "string", "description": "ID of the context to retrieve"}
                },
                "required": ["context_id"]
            },
            handler=self._handle_get_context
        )
        
        # System info tool
        self.register_tool(
            name="get_system_info",
            description="Get system information and capabilities",
            parameters={
                "type": "object",
                "properties": {}
            },
            handler=self._handle_get_system_info
        )
    
    def register_tool(self, name: str, description: str, parameters: Dict[str, Any], handler: Callable):
        """Register a new MCP tool"""
        tool = MCPTool(
            name=name,
            description=description,
            parameters=parameters,
            handler=handler
        )
        self.tools[name] = tool
        logger.info(f"🔧 Registered MCP tool: {name}")
    
    def add_context(self, name: str, content: Any, metadata: Optional[Dict[str, Any]] = None) -> str:
        """Add a new context"""
        if metadata is None:
            metadata = {}
        
        context_id = f"ctx_{len(self.contexts)}_{int(datetime.now().timestamp())}"
        now = datetime.now()
        
        context = MCPContext(
            id=context_id,
            name=name,
            content=content,
            metadata=metadata,
            created_at=now,
            updated_at=now
        )
        
        self.contexts[context_id] = context
        self._save_contexts()
        
        logger.info(f"📝 Added context: {context_id} ({name})")
        return context_id
    
    def add_resource(self, uri: str, name: str, description: str, mime_type: str, content: Any):
        """Add a new resource"""
        resource = MCPResource(
            uri=uri,
            name=name,
            description=description,
            mime_type=mime_type,
            content=content
        )
        
        self.resources[uri] = resource
        self._save_resources()
        
        logger.info(f"📎 Added resource: {uri} ({name})")
    
    async def call_tool(self, tool_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Call an MCP tool"""
        try:
            if tool_name not in self.tools:
                return {
                    "success": False,
                    "error": f"Tool '{tool_name}' not found",
                    "available_tools": list(self.tools.keys())
                }
            
            tool = self.tools[tool_name]
            
            # Validate parameters (basic validation)
            required_params = tool.parameters.get("required", [])
            for param in required_params:
                if param not in parameters:
                    return {
                        "success": False,
                        "error": f"Required parameter '{param}' missing",
                        "tool": tool_name
                    }
            
            # Call the tool handler
            result = await tool.handler(parameters)
            
            logger.info(f"🔧 Tool called: {tool_name}")
            return {
                "success": True,
                "tool": tool_name,
                "result": result
            }
            
        except Exception as e:
            logger.error(f"❌ Tool call failed: {tool_name} - {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "tool": tool_name
            }
    
    # Tool handlers
    async def _handle_read_file(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Handle read_file tool"""
        try:
            file_path = parameters["file_path"]
            path = Path(file_path)
            
            if not path.exists():
                return {"error": f"File not found: {file_path}"}
            
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            return {
                "file_path": file_path,
                "content": content,
                "size": len(content),
                "lines": content.count('\n') + 1
            }
            
        except Exception as e:
            return {"error": str(e)}
    
    async def _handle_search_documents(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Handle search_documents tool"""
        try:
            query = parameters["query"].lower()
            limit = parameters.get("limit", 10)
            
            results = []
            
            # Search contexts
            for context_id, context in self.contexts.items():
                if isinstance(context.content, str) and query in context.content.lower():
                    results.append({
                        "type": "context",
                        "id": context_id,
                        "name": context.name,
                        "content_preview": context.content[:200] + "...",
                        "metadata": context.metadata
                    })
            
            # Search resources
            for uri, resource in self.resources.items():
                if (query in resource.name.lower() or 
                    query in resource.description.lower() or
                    (isinstance(resource.content, str) and query in resource.content.lower())):
                    results.append({
                        "type": "resource",
                        "uri": uri,
                        "name": resource.name,
                        "description": resource.description,
                        "mime_type": resource.mime_type
                    })
            
            return {
                "query": query,
                "results": results[:limit],
                "total_found": len(results)
            }
            
        except Exception as e:
            return {"error": str(e)}
    
    async def _handle_get_context(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_context tool"""
        try:
            context_id = parameters["context_id"]
            
            if context_id not in self.contexts:
                return {"error": f"Context not found: {context_id}"}
            
            context = self.contexts[context_id]
            
            return {
                "id": context.id,
                "name": context.name,
                "content": context.content,
                "metadata": context.metadata,
                "created_at": context.created_at.isoformat(),
                "updated_at": context.updated_at.isoformat()
            }
            
        except Exception as e:
            return {"error": str(e)}
    
    async def _handle_get_system_info(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_system_info tool"""
        try:
            import platform
            import psutil
            
            return {
                "platform": {
                    "system": platform.system(),
                    "release": platform.release(),
                    "version": platform.version(),
                    "machine": platform.machine(),
                    "processor": platform.processor()
                },
                "resources": {
                    "cpu_count": psutil.cpu_count(),
                    "memory_total": psutil.virtual_memory().total,
                    "memory_available": psutil.virtual_memory().available,
                    "disk_usage": psutil.disk_usage('/').percent
                },
                "mcp_service": {
                    "tools_count": len(self.tools),
                    "contexts_count": len(self.contexts),
                    "resources_count": len(self.resources),
                    "initialized": self.is_initialized
                }
            }
            
        except Exception as e:
            return {"error": str(e)}
    
    def _load_contexts(self):
        """Load contexts from storage"""
        try:
            contexts_file = self.storage_path / "contexts.json"
            if contexts_file.exists():
                with open(contexts_file, 'r') as f:
                    contexts_data = json.load(f)
                    for ctx_data in contexts_data:
                        ctx_data['created_at'] = datetime.fromisoformat(ctx_data['created_at'])
                        ctx_data['updated_at'] = datetime.fromisoformat(ctx_data['updated_at'])
                        context = MCPContext(**ctx_data)
                        self.contexts[context.id] = context
        except Exception as e:
            logger.warning(f"⚠️ Could not load contexts: {str(e)}")
    
    def _save_contexts(self):
        """Save contexts to storage"""
        try:
            contexts_file = self.storage_path / "contexts.json"
            contexts_data = []
            for context in self.contexts.values():
                ctx_dict = asdict(context)
                ctx_dict['created_at'] = context.created_at.isoformat()
                ctx_dict['updated_at'] = context.updated_at.isoformat()
                contexts_data.append(ctx_dict)
            
            with open(contexts_file, 'w') as f:
                json.dump(contexts_data, f, indent=2)
        except Exception as e:
            logger.error(f"❌ Could not save contexts: {str(e)}")
    
    def _load_resources(self):
        """Load resources from storage"""
        try:
            resources_file = self.storage_path / "resources.json"
            if resources_file.exists():
                with open(resources_file, 'r') as f:
                    resources_data = json.load(f)
                    for res_data in resources_data:
                        resource = MCPResource(**res_data)
                        self.resources[resource.uri] = resource
        except Exception as e:
            logger.warning(f"⚠️ Could not load resources: {str(e)}")
    
    def _save_resources(self):
        """Save resources to storage"""
        try:
            resources_file = self.storage_path / "resources.json"
            resources_data = [asdict(resource) for resource in self.resources.values()]
            
            with open(resources_file, 'w') as f:
                json.dump(resources_data, f, indent=2)
        except Exception as e:
            logger.error(f"❌ Could not save resources: {str(e)}")
    
    def get_capabilities(self) -> Dict[str, Any]:
        """Get MCP service capabilities"""
        return {
            "tools": [
                {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.parameters
                }
                for tool in self.tools.values()
            ],
            "contexts": list(self.contexts.keys()),
            "resources": list(self.resources.keys()),
            "storage_path": str(self.storage_path),
            "initialized": self.is_initialized
        }
    
    async def create_conversation_context(self, conversation_id: str, messages: List[Dict[str, Any]]) -> str:
        """Create context for a conversation"""
        context_data = {
            "conversation_id": conversation_id,
            "messages": messages,
            "message_count": len(messages),
            "created_at": datetime.now().isoformat()
        }
        
        return self.add_context(
            name=f"Conversation {conversation_id}",
            content=context_data,
            metadata={"type": "conversation", "conversation_id": conversation_id}
        )

# Global MCP service instance
mcp_service = MCPService()

# Async interface functions
async def call_mcp_tool(tool_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
    """Call an MCP tool"""
    return await mcp_service.call_tool(tool_name, parameters)

def add_mcp_context(name: str, content: Any, metadata: Optional[Dict[str, Any]] = None) -> str:
    """Add context to MCP service"""
    return mcp_service.add_context(name, content, metadata)

def register_mcp_tool(name: str, description: str, parameters: Dict[str, Any], handler: Callable):
    """Register a new MCP tool"""
    mcp_service.register_tool(name, description, parameters, handler)

def get_mcp_capabilities() -> Dict[str, Any]:
    """Get MCP service capabilities"""
    return mcp_service.get_capabilities()

if __name__ == "__main__":
    # Test the MCP service
    import asyncio
    
    async def test_mcp():
        print("🧪 Testing MCP Service...")
        
        # Test system info tool
        result = await call_mcp_tool("get_system_info", {})
        print(f"System Info Success: {result['success']}")
        if result['success']:
            print(f"Platform: {result['result']['platform']['system']}")
            print(f"CPU Count: {result['result']['resources']['cpu_count']}")
        
        # Add test context
        context_id = add_mcp_context(
            "Test Context",
            "This is a test context for MCP service validation",
            {"type": "test", "purpose": "validation"}
        )
        print(f"Added context: {context_id}")
        
        # Test context retrieval
        context_result = await call_mcp_tool("get_context", {"context_id": context_id})
        print(f"Context Retrieval Success: {context_result['success']}")
        
        # Get capabilities
        capabilities = get_mcp_capabilities()
        print(f"MCP Tools: {len(capabilities['tools'])}")
        print(f"MCP Contexts: {len(capabilities['contexts'])}")
    
    asyncio.run(test_mcp())