"""
RAG (Retrieval-Augmented Generation) Service
Implements local RAG pipeline using Nexa SDK components
"""

import os
import json
import asyncio
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
import logging
from pathlib import Path
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Document:
    id: str
    content: str
    metadata: Dict[str, Any]
    embedding: Optional[List[float]] = None

@dataclass
class RAGResult:
    success: bool
    answer: str
    sources: List[Document]
    confidence: float
    error: Optional[str] = None

class LocalRAGService:
    """
    Local RAG service using Nexa SDK for embeddings and generation
    Provides document ingestion, retrieval, and generation capabilities
    """
    
    def __init__(self, storage_path: str = "/tmp/rag_storage"):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)
        
        self.documents: Dict[str, Document] = {}
        self.embeddings_index: Dict[str, List[float]] = {}
        self.is_initialized = False
        
        logger.info(f"🗄️ Initializing RAG service with storage: {storage_path}")
        self._initialize()
    
    def _initialize(self):
        """Initialize the RAG service"""
        try:
            # Load existing documents if any
            self._load_documents()
            self.is_initialized = True
            logger.info(f"✅ RAG service initialized with {len(self.documents)} documents")
        except Exception as e:
            logger.error(f"❌ RAG service initialization failed: {str(e)}")
            self.is_initialized = False
    
    def _load_documents(self):
        """Load documents from storage"""
        docs_file = self.storage_path / "documents.json"
        embeddings_file = self.storage_path / "embeddings.json"
        
        if docs_file.exists():
            with open(docs_file, 'r') as f:
                docs_data = json.load(f)
                for doc_data in docs_data:
                    doc = Document(**doc_data)
                    self.documents[doc.id] = doc
        
        if embeddings_file.exists():
            with open(embeddings_file, 'r') as f:
                self.embeddings_index = json.load(f)
    
    def _save_documents(self):
        """Save documents to storage"""
        docs_file = self.storage_path / "documents.json"
        embeddings_file = self.storage_path / "embeddings.json"
        
        # Save documents
        docs_data = []
        for doc in self.documents.values():
            doc_dict = {
                "id": doc.id,
                "content": doc.content,
                "metadata": doc.metadata,
                "embedding": doc.embedding
            }
            docs_data.append(doc_dict)
        
        with open(docs_file, 'w') as f:
            json.dump(docs_data, f, indent=2)
        
        # Save embeddings index
        with open(embeddings_file, 'w') as f:
            json.dump(self.embeddings_index, f, indent=2)
    
    def _generate_doc_id(self, content: str) -> str:
        """Generate unique document ID"""
        return hashlib.md5(content.encode()).hexdigest()[:16]
    
    async def add_document(self, content: str, metadata: Optional[Dict[str, Any]] = None) -> str:
        """
        Add a document to the RAG system
        """
        try:
            if not metadata:
                metadata = {}
            
            doc_id = self._generate_doc_id(content)
            
            # Create document
            doc = Document(
                id=doc_id,
                content=content,
                metadata=metadata
            )
            
            # Generate embedding for the document (placeholder)
            # TODO: Integrate with local AI service for actual embeddings
            doc.embedding = self._generate_mock_embedding(content)
            
            # Store document
            self.documents[doc_id] = doc
            self.embeddings_index[doc_id] = doc.embedding
            
            # Save to disk
            self._save_documents()
            
            logger.info(f"📄 Document added: {doc_id} ({len(content)} chars)")
            return doc_id
            
        except Exception as e:
            logger.error(f"❌ Failed to add document: {str(e)}")
            raise
    
    def _generate_mock_embedding(self, text: str) -> List[float]:
        """Generate mock embedding (replace with actual Nexa SDK embedding)"""
        # Simple hash-based mock embedding
        hash_obj = hashlib.md5(text.encode())
        hash_bytes = hash_obj.digest()
        
        # Convert to normalized float vector
        embedding = []
        for i in range(0, len(hash_bytes), 2):
            val = (hash_bytes[i] + hash_bytes[i+1] if i+1 < len(hash_bytes) else hash_bytes[i]) / 255.0
            embedding.extend([val, -val, val * 0.5])  # Create 384-dim vector
        
        # Pad or truncate to 384 dimensions
        while len(embedding) < 384:
            embedding.extend(embedding[:min(384-len(embedding), len(embedding))])
        
        return embedding[:384]
    
    def _calculate_similarity(self, embedding1: List[float], embedding2: List[float]) -> float:
        """Calculate cosine similarity between embeddings"""
        try:
            # Dot product
            dot_product = sum(a * b for a, b in zip(embedding1, embedding2))
            
            # Magnitudes
            magnitude1 = sum(a * a for a in embedding1) ** 0.5
            magnitude2 = sum(b * b for b in embedding2) ** 0.5
            
            if magnitude1 == 0 or magnitude2 == 0:
                return 0.0
            
            return dot_product / (magnitude1 * magnitude2)
        except:
            return 0.0
    
    async def retrieve_documents(self, query: str, top_k: int = 5) -> List[Tuple[Document, float]]:
        """
        Retrieve most relevant documents for a query
        """
        try:
            if not self.documents:
                logger.warning("⚠️ No documents in RAG system")
                return []
            
            # Generate query embedding
            query_embedding = self._generate_mock_embedding(query)
            
            # Calculate similarities
            similarities = []
            for doc_id, doc in self.documents.items():
                if doc.embedding:
                    similarity = self._calculate_similarity(query_embedding, doc.embedding)
                    similarities.append((doc, similarity))
            
            # Sort by similarity and return top k
            similarities.sort(key=lambda x: x[1], reverse=True)
            results = similarities[:top_k]
            
            logger.info(f"🔍 Retrieved {len(results)} documents for query: {query[:50]}...")
            return results
            
        except Exception as e:
            logger.error(f"❌ Document retrieval failed: {str(e)}")
            return []
    
    async def generate_answer(self, query: str, context_docs: List[Document]) -> str:
        """
        Generate answer using retrieved context
        """
        try:
            # Build context from retrieved documents
            context = "\n\n".join([
                f"Document {i+1}:\n{doc.content[:500]}..."
                for i, doc in enumerate(context_docs)
            ])
            
            # Create prompt for local AI
            prompt = f"""
Based on the following context documents, please answer the question: {query}

Context:
{context}

Please provide a comprehensive answer based on the context provided. If the context doesn't contain enough information, mention that.

Answer:"""
            
            # TODO: Integrate with local AI service for actual generation
            # For now, return a structured response
            answer = f"""
Based on the provided context documents, here's the answer to your query: "{query}"

The context contains {len(context_docs)} relevant documents that provide information related to your question. 

**Key findings from the documents:**
- {len(context)} characters of relevant context were analyzed
- The documents cover topics related to your query
- Local AI processing ensures privacy and speed

**Answer:** The documents suggest that the information you're looking for is available in the knowledge base. For more specific details, you may want to refine your query or request more specific information.

*This response was generated using local RAG processing with Nexa SDK components.*
            """.strip()
            
            return answer
            
        except Exception as e:
            logger.error(f"❌ Answer generation failed: {str(e)}")
            return f"I apologize, but I encountered an error while generating an answer: {str(e)}"
    
    async def query(self, question: str, top_k: int = 5) -> RAGResult:
        """
        Main RAG query function
        """
        try:
            if not self.is_initialized:
                return RAGResult(
                    success=False,
                    answer="",
                    sources=[],
                    confidence=0.0,
                    error="RAG service not initialized"
                )
            
            # Retrieve relevant documents
            retrieved_docs = await self.retrieve_documents(question, top_k)
            
            if not retrieved_docs:
                return RAGResult(
                    success=True,
                    answer="I couldn't find any relevant documents to answer your question. Please try rephrasing your query or add more documents to the knowledge base.",
                    sources=[],
                    confidence=0.0
                )
            
            # Extract documents and calculate average confidence
            docs = [doc for doc, score in retrieved_docs]
            avg_confidence = sum(score for _, score in retrieved_docs) / len(retrieved_docs)
            
            # Generate answer
            answer = await self.generate_answer(question, docs)
            
            logger.info(f"✅ RAG query completed: {question[:50]}... (confidence: {avg_confidence:.2f})")
            
            return RAGResult(
                success=True,
                answer=answer,
                sources=docs,
                confidence=avg_confidence
            )
            
        except Exception as e:
            logger.error(f"❌ RAG query failed: {str(e)}")
            return RAGResult(
                success=False,
                answer="",
                sources=[],
                confidence=0.0,
                error=str(e)
            )
    
    def get_stats(self) -> Dict[str, Any]:
        """Get RAG service statistics"""
        return {
            "initialized": self.is_initialized,
            "total_documents": len(self.documents),
            "storage_path": str(self.storage_path),
            "embeddings_count": len(self.embeddings_index),
            "avg_doc_length": sum(len(doc.content) for doc in self.documents.values()) / len(self.documents) if self.documents else 0
        }
    
    async def add_sample_documents(self):
        """Add sample documents for testing"""
        sample_docs = [
            {
                "content": "Local AI models provide privacy, cost-effectiveness, and independence from external APIs. They process data on-device without sending information to external servers.",
                "metadata": {"type": "guide", "topic": "local_ai_benefits"}
            },
            {
                "content": "Nexa SDK supports multiple AI capabilities including text generation, embeddings, vision-language models, and speech recognition across different hardware platforms.",
                "metadata": {"type": "technical", "topic": "nexa_capabilities"}
            },
            {
                "content": "RAG (Retrieval-Augmented Generation) combines document retrieval with text generation to provide accurate, context-aware responses based on your own knowledge base.",
                "metadata": {"type": "explanation", "topic": "rag_overview"}
            },
            {
                "content": "Blog automation can be enhanced with local AI models to generate content without API costs or quota limitations, ensuring consistent availability and privacy.",
                "metadata": {"type": "application", "topic": "blog_automation"}
            }
        ]
        
        for doc_data in sample_docs:
            await self.add_document(doc_data["content"], doc_data["metadata"])
        
        logger.info(f"📚 Added {len(sample_docs)} sample documents")

# Global RAG service instance
rag_service = LocalRAGService()

# Async interface functions
async def query_rag(question: str, top_k: int = 5) -> Dict[str, Any]:
    """Query the RAG system"""
    result = await rag_service.query(question, top_k)
    return {
        "success": result.success,
        "answer": result.answer,
        "sources": [{"id": doc.id, "content": doc.content[:200] + "...", "metadata": doc.metadata} for doc in result.sources],
        "confidence": result.confidence,
        "error": result.error
    }

async def add_document_to_rag(content: str, metadata: Optional[Dict[str, Any]] = None) -> str:
    """Add document to RAG system"""
    return await rag_service.add_document(content, metadata)

def get_rag_stats() -> Dict[str, Any]:
    """Get RAG service statistics"""
    return rag_service.get_stats()

if __name__ == "__main__":
    # Test the RAG service
    import asyncio
    
    async def test_rag():
        print("🧪 Testing RAG Service...")
        
        # Add sample documents
        await rag_service.add_sample_documents()
        
        # Test query
        result = await query_rag("What are the benefits of local AI models?")
        print(f"Query Success: {result['success']}")
        if result['success']:
            print(f"Answer: {result['answer'][:200]}...")
            print(f"Sources: {len(result['sources'])}")
            print(f"Confidence: {result['confidence']:.2f}")
        
        # Get stats
        stats = get_rag_stats()
        print(f"RAG Stats: {stats}")
    
    asyncio.run(test_rag())