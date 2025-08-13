# LlamaIndex Integration Guide

Complete guide for integrating HashHub Vector API with LlamaIndex framework for building advanced RAG applications, knowledge graphs, and AI agents.

## 🚀 Quick Start

### Installation

```bash
pip install llama-index httpx openai
```

### Basic Setup

```python
from llama_index.embeddings.openai import OpenAIEmbedding

# Configure HashHub as OpenAI-compatible embedding
embed_model = OpenAIEmbedding(
    api_key="sk-hashhub-key...",
    api_base="https://vector.hashhub.dev/v1",
    model="gte_base"  # or any HashHub model
)

# Test the embedding
text = "This is a test document for LlamaIndex integration."
embedding = embed_model.get_text_embedding(text)
print(f"Embedding dimension: {len(embedding)}")
```

## 🔧 Custom HashHub Embedding Class

For advanced features and HashHub-specific optimizations:

```python
from llama_index.embeddings.base import BaseEmbedding
from llama_index.bridge.pydantic import PrivateAttr
from typing import List, Any
import httpx
import asyncio

class HashHubEmbedding(BaseEmbedding):
    """HashHub embedding model for LlamaIndex."""
    
    api_key: str
    model: str = "gte_base"
    base_url: str = "https://vector.hashhub.dev"
    chunk_size: int = 512
    chunk_overlap: float = 0.1
    
    _client: httpx.AsyncClient = PrivateAttr()
    
    def __init__(
        self,
        api_key: str,
        model: str = "gte_base",
        base_url: str = "https://vector.hashhub.dev",
        chunk_size: int = 512,
        chunk_overlap: float = 0.1,
        **kwargs: Any,
    ) -> None:
        super().__init__(
            api_key=api_key,
            model=model,
            base_url=base_url,
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            **kwargs,
        )
        self._client = httpx.AsyncClient()
    
    @classmethod
    def class_name(cls) -> str:
        return "HashHubEmbedding"
    
    async def _aget_query_embedding(self, query: str) -> List[float]:
        """Get embedding for a single query."""
        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "text": query,
            "model": self.model,
            "chunk_size": self.chunk_size,
            "chunk_overlap": self.chunk_overlap
        }
        
        response = await self._client.post(
            f"{self.base_url}/vectorize",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        result = response.json()
        return result["vector"]
    
    async def _aget_text_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Get embeddings for multiple texts."""
        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "texts": texts,
            "model": self.model,
            "chunk_size": self.chunk_size,
            "chunk_overlap": self.chunk_overlap
        }
        
        response = await self._client.post(
            f"{self.base_url}/vectorize/batch",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        result = response.json()
        return result["vectors"]
    
    def _get_query_embedding(self, query: str) -> List[float]:
        """Sync wrapper for query embedding."""
        return asyncio.run(self._aget_query_embedding(query))
    
    def _get_text_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Sync wrapper for text embeddings."""
        return asyncio.run(self._aget_text_embeddings(texts))

# Usage
embed_model = HashHubEmbedding(
    api_key="sk-hashhub-key...",
    model="gte_base",
    chunk_size=1024
)
```

## 📄 Document Ingestion and Indexing

### Simple Document Index

```python
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from llama_index import ServiceContext

# Initialize HashHub embedding
embed_model = HashHubEmbedding(
    api_key="sk-hashhub-key...",
    model="gte_base"
)

# Create service context
service_context = ServiceContext.from_defaults(
    embed_model=embed_model,
    chunk_size=1024,
    chunk_overlap=200
)

# Load documents
documents = SimpleDirectoryReader("./documents").load_data()

# Create index
index = VectorStoreIndex.from_documents(
    documents,
    service_context=service_context
)

# Query the index
query_engine = index.as_query_engine()
response = query_engine.query("What is HashHub Vector API?")
print(response)
```

### Advanced Document Processing

```python
from llama_index import (
    VectorStoreIndex,
    Document,
    ServiceContext,
    StorageContext
)
from llama_index.node_parser import SimpleNodeParser
from llama_index.text_splitter import TokenTextSplitter
import os

class HashHubDocumentProcessor:
    def __init__(self, api_key: str, model: str = "gte_base"):
        self.embed_model = HashHubEmbedding(
            api_key=api_key,
            model=model,
            chunk_size=1024
        )
        
        # Create service context
        self.service_context = ServiceContext.from_defaults(
            embed_model=self.embed_model,
            chunk_size=1024,
            chunk_overlap=200
        )
        
        self.indices = {}
    
    def process_documents(
        self,
        documents: List[Document],
        index_name: str = "default"
    ) -> VectorStoreIndex:
        """Process documents and create searchable index."""
        
        # Custom node parser with metadata preservation
        node_parser = SimpleNodeParser.from_defaults(
            text_splitter=TokenTextSplitter(
                chunk_size=1024,
                chunk_overlap=200
            )
        )
        
        # Create index
        index = VectorStoreIndex.from_documents(
            documents,
            service_context=self.service_context,
            node_parser=node_parser
        )
        
        self.indices[index_name] = index
        print(f"Created index '{index_name}' with {len(documents)} documents")
        
        return index
    
    def add_documents(
        self,
        documents: List[Document],
        index_name: str = "default"
    ):
        """Add documents to existing index."""
        if index_name not in self.indices:
            return self.process_documents(documents, index_name)
        
        index = self.indices[index_name]
        for doc in documents:
            index.insert(doc)
        
        print(f"Added {len(documents)} documents to index '{index_name}'")
    
    def query(
        self,
        query: str,
        index_name: str = "default",
        similarity_top_k: int = 5
    ) -> str:
        """Query an index."""
        if index_name not in self.indices:
            return "Index not found"
        
        query_engine = self.indices[index_name].as_query_engine(
            similarity_top_k=similarity_top_k
        )
        
        response = query_engine.query(query)
        return str(response)
    
    def save_index(self, index_name: str, persist_dir: str):
        """Save index to disk."""
        if index_name not in self.indices:
            return False
        
        os.makedirs(persist_dir, exist_ok=True)
        self.indices[index_name].storage_context.persist(persist_dir)
        return True
    
    def load_index(self, persist_dir: str, index_name: str = "default"):
        """Load index from disk."""
        storage_context = StorageContext.from_defaults(persist_dir=persist_dir)
        
        index = VectorStoreIndex(
            nodes=[],
            storage_context=storage_context,
            service_context=self.service_context
        )
        
        self.indices[index_name] = index
        return index

# Usage example
processor = HashHubDocumentProcessor("sk-hashhub-key...")

# Create documents
documents = [
    Document(
        text="HashHub provides multilingual embedding models...",
        metadata={"source": "documentation", "category": "api"}
    ),
    Document(
        text="The API supports 6 different models with varying dimensions...",
        metadata={"source": "documentation", "category": "models"}
    )
]

# Process and query
index = processor.process_documents(documents, "hashhub_docs")
response = processor.query("What models does HashHub support?", "hashhub_docs")
print(response)

# Save for later use
processor.save_index("hashhub_docs", "./saved_index")
```

## 🔍 Advanced Query Engines

### Multi-Modal Query Engine

```python
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.retrievers import VectorIndexRetriever
from llama_index.response_synthesizers import ResponseSynthesizer
from llama_index.postprocessor import SimilarityPostprocessor

class HashHubQueryEngine:
    def __init__(self, api_key: str, model: str = "gte_base"):
        self.embed_model = HashHubEmbedding(
            api_key=api_key,
            model=model
        )
        
        self.service_context = ServiceContext.from_defaults(
            embed_model=self.embed_model
        )
    
    def create_advanced_query_engine(
        self,
        index: VectorStoreIndex,
        similarity_top_k: int = 10,
        similarity_cutoff: float = 0.7
    ):
        """Create query engine with advanced retrieval and filtering."""
        
        # Configure retriever
        retriever = VectorIndexRetriever(
            index=index,
            similarity_top_k=similarity_top_k
        )
        
        # Add similarity postprocessor to filter low-quality results
        postprocessor = SimilarityPostprocessor(
            similarity_cutoff=similarity_cutoff
        )
        
        # Create response synthesizer
        response_synthesizer = ResponseSynthesizer.from_args(
            service_context=self.service_context,
            response_mode="tree_summarize"  # Better for long contexts
        )
        
        # Combine into query engine
        query_engine = RetrieverQueryEngine(
            retriever=retriever,
            response_synthesizer=response_synthesizer,
            node_postprocessors=[postprocessor]
        )
        
        return query_engine
    
    def create_conversational_engine(self, index: VectorStoreIndex):
        """Create conversational query engine with memory."""
        from llama_index.memory import ChatMemoryBuffer
        from llama_index.chat_engine import CondensePlusContextChatEngine
        
        memory = ChatMemoryBuffer.from_defaults(token_limit=3000)
        
        chat_engine = CondensePlusContextChatEngine.from_defaults(
            retriever=VectorIndexRetriever(index=index),
            memory=memory,
            service_context=self.service_context,
            system_prompt="You are a helpful assistant that answers questions based on the provided context."
        )
        
        return chat_engine

# Usage
query_engine_factory = HashHubQueryEngine("sk-hashhub-key...")

# Create advanced query engine
advanced_engine = query_engine_factory.create_advanced_query_engine(
    index=index,
    similarity_top_k=15,
    similarity_cutoff=0.75
)

response = advanced_engine.query("Explain HashHub's pricing model")
print(response)

# Create conversational engine
chat_engine = query_engine_factory.create_conversational_engine(index)

# Have a conversation
response1 = chat_engine.chat("What is HashHub?")
response2 = chat_engine.chat("What models does it support?")
response3 = chat_engine.chat("How much does the gte_base model cost?")
```

## 🗄️ Vector Store Integration

### Chroma Integration

```python
from llama_index.vector_stores import ChromaVectorStore
from llama_index import VectorStoreIndex, StorageContext
import chromadb

# Initialize HashHub embedding
embed_model = HashHubEmbedding(
    api_key="sk-hashhub-key...",
    model="e5_base"  # Good for general purpose
)

# Initialize Chroma
chroma_client = chromadb.PersistentClient(path="./chroma_db")
chroma_collection = chroma_client.create_collection("hashhub_collection")

# Create vector store
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# Create service context
service_context = ServiceContext.from_defaults(embed_model=embed_model)

# Create index
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    service_context=service_context
)

# Query
query_engine = index.as_query_engine()
response = query_engine.query("Your question here")
```

### Pinecone Integration

```python
from llama_index.vector_stores import PineconeVectorStore
import pinecone

# Initialize Pinecone
pinecone.init(
    api_key="your-pinecone-key",
    environment="your-env"
)

# Create index
index_name = "hashhub-llamaindex"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        index_name,
        dimension=768,  # Match your HashHub model dimension
        metric="cosine"
    )

# Create vector store
vector_store = PineconeVectorStore(
    pinecone_index=pinecone.Index(index_name)
)

# Create storage context
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# Create index with HashHub embeddings
embed_model = HashHubEmbedding(api_key="sk-hashhub-key...")
service_context = ServiceContext.from_defaults(embed_model=embed_model)

index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    service_context=service_context
)
```

## 🤖 RAG Applications

### Multi-Document RAG System

```python
from llama_index import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    ServiceContext
)
from llama_index.tools import QueryEngineTool, ToolMetadata
from llama_index.agent import ReActAgent
from llama_index.llms import OpenAI

class MultiDocumentRAG:
    def __init__(self, hashhub_api_key: str, openai_api_key: str):
        # Initialize HashHub embedding
        self.embed_model = HashHubEmbedding(
            api_key=hashhub_api_key,
            model="gte_base"  # Best for RAG
        )
        
        # Initialize LLM
        self.llm = OpenAI(api_key=openai_api_key)
        
        # Create service context
        self.service_context = ServiceContext.from_defaults(
            embed_model=self.embed_model,
            llm=self.llm,
            chunk_size=1024,
            chunk_overlap=200
        )
        
        self.indices = {}
        self.query_engines = {}
    
    def add_document_collection(
        self,
        collection_name: str,
        document_path: str,
        description: str
    ):
        """Add a collection of documents."""
        # Load documents
        documents = SimpleDirectoryReader(document_path).load_data()
        
        # Create index
        index = VectorStoreIndex.from_documents(
            documents,
            service_context=self.service_context
        )
        
        # Create query engine
        query_engine = index.as_query_engine(
            similarity_top_k=5,
            service_context=self.service_context
        )
        
        self.indices[collection_name] = index
        self.query_engines[collection_name] = query_engine
        
        print(f"Added collection '{collection_name}' with {len(documents)} documents")
        
        return QueryEngineTool(
            query_engine=query_engine,
            metadata=ToolMetadata(
                name=collection_name,
                description=description
            )
        )
    
    def create_agent(self) -> ReActAgent:
        """Create an agent that can query multiple document collections."""
        tools = []
        
        for name, query_engine in self.query_engines.items():
            tool = QueryEngineTool(
                query_engine=query_engine,
                metadata=ToolMetadata(
                    name=f"query_{name}",
                    description=f"Query the {name} document collection"
                )
            )
            tools.append(tool)
        
        agent = ReActAgent.from_tools(
            tools,
            llm=self.llm,
            verbose=True
        )
        
        return agent
    
    def query_specific_collection(self, collection_name: str, query: str):
        """Query a specific document collection."""
        if collection_name not in self.query_engines:
            return f"Collection '{collection_name}' not found"
        
        response = self.query_engines[collection_name].query(query)
        return str(response)
    
    def query_all_collections(self, query: str):
        """Query all collections and combine results."""
        results = {}
        
        for name, query_engine in self.query_engines.items():
            try:
                response = query_engine.query(query)
                results[name] = str(response)
            except Exception as e:
                results[name] = f"Error: {str(e)}"
        
        return results

# Usage example
rag_system = MultiDocumentRAG(
    hashhub_api_key="sk-hashhub-key...",
    openai_api_key="your-openai-key"
)

# Add document collections
rag_system.add_document_collection(
    "api_docs",
    "./api_documentation/",
    "HashHub API documentation and guides"
)

rag_system.add_document_collection(
    "user_manual",
    "./user_manual/",
    "User manual and tutorials"
)

rag_system.add_document_collection(
    "faq",
    "./faq/",
    "Frequently asked questions and troubleshooting"
)

# Create intelligent agent
agent = rag_system.create_agent()

# Query using agent (will automatically choose relevant collections)
response = agent.chat("How do I integrate HashHub with LlamaIndex?")
print(response)

# Query specific collection
api_response = rag_system.query_specific_collection(
    "api_docs",
    "What are the available embedding models?"
)
print(api_response)
```

### Hierarchical RAG with Summary Indices

```python
from llama_index import (
    TreeIndex,
    VectorStoreIndex,
    SimpleDirectoryReader,
    ServiceContext
)
from llama_index.node_parser import HierarchicalNodeParser
from llama_index.retrievers import AutoMergingRetriever
from llama_index.query_engine import RetrieverQueryEngine

class HierarchicalRAG:
    def __init__(self, api_key: str):
        self.embed_model = HashHubEmbedding(
            api_key=api_key,
            model="gte_base",
            chunk_size=2048  # Larger chunks for hierarchical processing
        )
        
        self.service_context = ServiceContext.from_defaults(
            embed_model=self.embed_model,
            chunk_size=2048,
            chunk_overlap=200
        )
    
    def create_hierarchical_index(self, documents):
        """Create hierarchical index with multiple chunk sizes."""
        
        # Create hierarchical node parser
        node_parser = HierarchicalNodeParser.from_defaults(
            chunk_sizes=[2048, 512, 128]  # Multiple granularities
        )
        
        # Parse documents into hierarchical nodes
        nodes = node_parser.get_nodes_from_documents(documents)
        
        # Create vector index
        vector_index = VectorStoreIndex(
            nodes,
            service_context=self.service_context
        )
        
        # Create auto-merging retriever
        retriever = AutoMergingRetriever(
            vector_index.as_retriever(similarity_top_k=12),
            vector_index.storage_context,
            verbose=True
        )
        
        # Create query engine
        query_engine = RetrieverQueryEngine.from_args(
            retriever,
            service_context=self.service_context
        )
        
        return query_engine, vector_index
    
    def create_summary_index(self, documents):
        """Create summary index for high-level queries."""
        summary_index = TreeIndex.from_documents(
            documents,
            service_context=self.service_context
        )
        
        return summary_index.as_query_engine(
            response_mode="tree_summarize"
        )

# Usage
hierarchical_rag = HierarchicalRAG("sk-hashhub-key...")

documents = SimpleDirectoryReader("./large_documents/").load_data()

# Create hierarchical query engine
hierarchical_engine, vector_index = hierarchical_rag.create_hierarchical_index(documents)

# Create summary engine for overview questions
summary_engine = hierarchical_rag.create_summary_index(documents)

# Query for specific details (uses hierarchical retrieval)
detailed_response = hierarchical_engine.query(
    "What are the specific parameters for the gte_base model?"
)

# Query for high-level summary
summary_response = summary_engine.query(
    "Provide an overview of HashHub's capabilities"
)
```

## 📊 Analytics and Monitoring

### Query Performance Monitor

```python
import time
from typing import Dict, List
from llama_index.callbacks import CallbackManager, LlamaDebugHandler
import logging

class HashHubPerformanceMonitor:
    def __init__(self, api_key: str):
        self.embed_model = HashHubEmbedding(api_key=api_key)
        self.query_stats = []
        self.embedding_stats = []
        
        # Setup debugging
        self.debug_handler = LlamaDebugHandler(print_trace_on_end=True)
        self.callback_manager = CallbackManager([self.debug_handler])
        
        self.service_context = ServiceContext.from_defaults(
            embed_model=self.embed_model,
            callback_manager=self.callback_manager
        )
    
    def track_query_performance(self, query_engine, query: str):
        """Track query performance metrics."""
        start_time = time.time()
        
        try:
            response = query_engine.query(query)
            end_time = time.time()
            
            stats = {
                "query": query,
                "response_time": end_time - start_time,
                "success": True,
                "response_length": len(str(response)),
                "timestamp": time.time()
            }
            
            # Extract debug info
            event_pairs = self.debug_handler.get_llm_inputs_outputs()
            if event_pairs:
                stats["llm_calls"] = len(event_pairs)
                stats["total_tokens"] = sum(
                    len(str(event_pair[0])) + len(str(event_pair[1])) 
                    for event_pair in event_pairs
                )
            
            self.query_stats.append(stats)
            return response, stats
            
        except Exception as e:
            end_time = time.time()
            error_stats = {
                "query": query,
                "response_time": end_time - start_time,
                "success": False,
                "error": str(e),
                "timestamp": time.time()
            }
            self.query_stats.append(error_stats)
            raise
    
    def get_performance_summary(self):
        """Get performance summary statistics."""
        if not self.query_stats:
            return {"message": "No queries tracked yet"}
        
        successful_queries = [s for s in self.query_stats if s["success"]]
        failed_queries = [s for s in self.query_stats if not s["success"]]
        
        if successful_queries:
            avg_response_time = sum(s["response_time"] for s in successful_queries) / len(successful_queries)
            avg_response_length = sum(s.get("response_length", 0) for s in successful_queries) / len(successful_queries)
        else:
            avg_response_time = 0
            avg_response_length = 0
        
        return {
            "total_queries": len(self.query_stats),
            "successful_queries": len(successful_queries),
            "failed_queries": len(failed_queries),
            "success_rate": len(successful_queries) / len(self.query_stats) * 100,
            "avg_response_time": avg_response_time,
            "avg_response_length": avg_response_length,
            "queries_per_minute": len(self.query_stats) / ((time.time() - self.query_stats[0]["timestamp"]) / 60) if self.query_stats else 0
        }
    
    def export_stats(self, filename: str):
        """Export performance statistics to JSON."""
        import json
        
        export_data = {
            "query_stats": self.query_stats,
            "embedding_stats": self.embedding_stats,
            "summary": self.get_performance_summary()
        }
        
        with open(filename, 'w') as f:
            json.dump(export_data, f, indent=2)

# Usage
monitor = HashHubPerformanceMonitor("sk-hashhub-key...")

# Create index with monitoring
index = VectorStoreIndex.from_documents(
    documents,
    service_context=monitor.service_context
)

query_engine = index.as_query_engine()

# Track queries
queries = [
    "What is HashHub Vector API?",
    "How do I integrate with LlamaIndex?",
    "What are the pricing options?",
    "Which model should I choose?"
]

for query in queries:
    response, stats = monitor.track_query_performance(query_engine, query)
    print(f"Query: {query}")
    print(f"Response time: {stats['response_time']:.2f}s")
    print(f"Response: {str(response)[:100]}...")
    print("-" * 50)

# Get performance summary
summary = monitor.get_performance_summary()
print(f"Performance Summary:")
print(f"Success rate: {summary['success_rate']:.1f}%")
print(f"Average response time: {summary['avg_response_time']:.2f}s")

# Export for analysis
monitor.export_stats("performance_report.json")
```

## 🔧 Advanced Features

### Custom Node Processors

```python
from llama_index.node_parser import NodeParser
from llama_index.schema import BaseNode, TextNode
from typing import List

class HashHubNodeProcessor(NodeParser):
    """Custom node processor with HashHub-specific optimizations."""
    
    def __init__(self, api_key: str, model: str = "gte_base"):
        super().__init__()
        self.embed_model = HashHubEmbedding(api_key=api_key, model=model)
        self.model_max_tokens = {
            "gte_base": 8192,
            "nomic_base": 2048,
            "e5_base": 512,
            "mpnet_base": 512,
            "e5_small": 512,
            "minilm_base": 512
        }
        self.max_tokens = self.model_max_tokens.get(model, 512)
    
    def _parse_nodes(
        self,
        nodes: List[BaseNode],
        show_progress: bool = False,
        **kwargs
    ) -> List[BaseNode]:
        """Custom node parsing with optimal chunking."""
        processed_nodes = []
        
        for node in nodes:
            if isinstance(node, TextNode):
                # Smart chunking based on model capabilities
                text = node.text
                
                if len(text.split()) <= self.max_tokens * 0.8:  # Conservative estimate
                    # Text fits in single chunk
                    processed_nodes.append(node)
                else:
                    # Split into multiple nodes
                    chunks = self._smart_chunk(text)
                    for i, chunk in enumerate(chunks):
                        new_node = TextNode(
                            text=chunk,
                            metadata={
                                **node.metadata,
                                "chunk_index": i,
                                "total_chunks": len(chunks),
                                "original_node_id": node.node_id
                            }
                        )
                        processed_nodes.append(new_node)
            else:
                processed_nodes.append(node)
        
        return processed_nodes
    
    def _smart_chunk(self, text: str) -> List[str]:
        """Smart chunking that preserves sentence boundaries."""
        sentences = text.split('. ')
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk.split()) + len(sentence.split()) <= self.max_tokens * 0.8:
                current_chunk += sentence + ". "
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence + ". "
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        return chunks

# Usage
node_processor = HashHubNodeProcessor("sk-hashhub-key...", "gte_base")

# Use in service context
service_context = ServiceContext.from_defaults(
    embed_model=HashHubEmbedding("sk-hashhub-key..."),
    node_parser=node_processor
)
```

## 📚 Complete Example: Enterprise Knowledge Base

```python
from llama_index import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    ServiceContext,
    StorageContext
)
from llama_index.vector_stores import ChromaVectorStore
from llama_index.memory import ChatMemoryBuffer
from llama_index.chat_engine import CondensePlusContextChatEngine
import chromadb
import os

class EnterpriseKnowledgeBase:
    def __init__(
        self,
        hashhub_api_key: str,
        persist_dir: str = "./knowledge_base",
        model: str = "gte_base"
    ):
        self.hashhub_api_key = hashhub_api_key
        self.persist_dir = persist_dir
        self.model = model
        
        # Initialize embedding model
        self.embed_model = HashHubEmbedding(
            api_key=hashhub_api_key,
            model=model,
            chunk_size=1024
        )
        
        # Initialize Chroma for persistent storage
        os.makedirs(persist_dir, exist_ok=True)
        self.chroma_client = chromadb.PersistentClient(path=persist_dir)
        
        # Service context
        self.service_context = ServiceContext.from_defaults(
            embed_model=self.embed_model,
            chunk_size=1024,
            chunk_overlap=200
        )
        
        self.collections = {}
        self.indices = {}
        self.chat_engines = {}
    
    def create_collection(
        self,
        collection_name: str,
        documents_path: str,
        description: str = ""
    ):
        """Create a new document collection."""
        try:
            # Create or get Chroma collection
            chroma_collection = self.chroma_client.get_or_create_collection(
                collection_name
            )
            
            # Create vector store
            vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
            storage_context = StorageContext.from_defaults(vector_store=vector_store)
            
            # Load documents
            documents = SimpleDirectoryReader(documents_path).load_data()
            
            # Add metadata
            for doc in documents:
                doc.metadata.update({
                    "collection": collection_name,
                    "description": description
                })
            
            # Create index
            index = VectorStoreIndex.from_documents(
                documents,
                storage_context=storage_context,
                service_context=self.service_context
            )
            
            # Store references
            self.collections[collection_name] = chroma_collection
            self.indices[collection_name] = index
            
            # Create chat engine for this collection
            self.chat_engines[collection_name] = self._create_chat_engine(index)
            
            print(f"✅ Created collection '{collection_name}' with {len(documents)} documents")
            return True
            
        except Exception as e:
            print(f"❌ Failed to create collection '{collection_name}': {e}")
            return False
    
    def _create_chat_engine(self, index):
        """Create a conversational chat engine for an index."""
        memory = ChatMemoryBuffer.from_defaults(token_limit=3000)
        
        chat_engine = CondensePlusContextChatEngine.from_defaults(
            retriever=index.as_retriever(),
            memory=memory,
            service_context=self.service_context,
            system_prompt="""
            You are a knowledgeable assistant for an enterprise knowledge base.
            Always provide accurate, detailed answers based on the provided context.
            If you don't know something, clearly state that the information is not available.
            Include relevant details and be professional in your responses.
            """
        )
        
        return chat_engine
    
    def query_collection(
        self,
        collection_name: str,
        query: str,
        mode: str = "query"  # "query" or "chat"
    ):
        """Query a specific collection."""
        if collection_name not in self.indices:
            return f"Collection '{collection_name}' not found"
        
        try:
            if mode == "chat":
                chat_engine = self.chat_engines[collection_name]
                response = chat_engine.chat(query)
            else:
                query_engine = self.indices[collection_name].as_query_engine()
                response = query_engine.query(query)
            
            return str(response)
            
        except Exception as e:
            return f"Error querying collection: {e}"
    
    def search_all_collections(self, query: str, top_k: int = 3):
        """Search across all collections."""
        results = {}
        
        for collection_name, index in self.indices.items():
            try:
                query_engine = index.as_query_engine(similarity_top_k=top_k)
                response = query_engine.query(query)
                results[collection_name] = {
                    "response": str(response),
                    "status": "success"
                }
            except Exception as e:
                results[collection_name] = {
                    "error": str(e),
                    "status": "error"
                }
        
        return results
    
    def get_collection_stats(self, collection_name: str):
        """Get statistics for a collection."""
        if collection_name not in self.collections:
            return {"error": "Collection not found"}
        
        collection = self.collections[collection_name]
        
        try:
            # Get collection count (this might vary by Chroma version)
            count = collection.count()
            
            return {
                "name": collection_name,
                "document_count": count,
                "embedding_model": self.model,
                "status": "active"
            }
        except Exception as e:
            return {"error": str(e)}
    
    def list_collections(self):
        """List all available collections."""
        return [
            {
                "name": name,
                **self.get_collection_stats(name)
            }
            for name in self.collections.keys()
        ]
    
    def add_documents_to_collection(
        self,
        collection_name: str,
        documents_path: str
    ):
        """Add new documents to existing collection."""
        if collection_name not in self.indices:
            return f"Collection '{collection_name}' not found"
        
        try:
            # Load new documents
            new_documents = SimpleDirectoryReader(documents_path).load_data()
            
            # Add to existing index
            index = self.indices[collection_name]
            for doc in new_documents:
                doc.metadata["collection"] = collection_name
                index.insert(doc)
            
            # Update chat engine
            self.chat_engines[collection_name] = self._create_chat_engine(index)
            
            print(f"✅ Added {len(new_documents)} documents to '{collection_name}'")
            return True
            
        except Exception as e:
            print(f"❌ Failed to add documents: {e}")
            return False

# Usage Example
kb = EnterpriseKnowledgeBase(
    hashhub_api_key="sk-hashhub-key...",
    persist_dir="./enterprise_kb",
    model="gte_base"
)

# Create collections
kb.create_collection(
    "product_docs",
    "./documents/products/",
    "Product documentation and specifications"
)

kb.create_collection(
    "hr_policies",
    "./documents/hr/",
    "HR policies and employee handbook"
)

kb.create_collection(
    "technical_guides",
    "./documents/technical/",
    "Technical guides and troubleshooting"
)

# Query specific collection
response = kb.query_collection(
    "product_docs",
    "What are the system requirements for our main product?"
)
print(f"Product Docs: {response}")

# Use chat mode for follow-up questions
chat_response = kb.query_collection(
    "hr_policies",
    "What is the vacation policy?",
    mode="chat"
)
print(f"HR Chat: {chat_response}")

# Search across all collections
all_results = kb.search_all_collections(
    "What training programs are available?"
)
for collection, result in all_results.items():
    if result["status"] == "success":
        print(f"{collection}: {result['response'][:100]}...")

# Get statistics
collections = kb.list_collections()
for collection in collections:
    print(f"Collection: {collection['name']}")
    print(f"Documents: {collection.get('document_count', 'Unknown')}")
    print(f"Status: {collection.get('status', 'Unknown')}")
```

## 📞 Support and Resources

- **HashHub Documentation:** [vector.hashhub.dev/docs](https://vector.hashhub.dev/docs)
- **LlamaIndex Examples:** [github.com/hashhub/llamaindex-examples](https://github.com/hashhub/llamaindex-examples)
- **Community Support:** [Discord](https://discord.gg/hashhub)
- **Technical Support:** [support@hashhub.dev](mailto:support@hashhub.dev)

---

**Ready to build advanced RAG applications?** Start with our LlamaIndex integration and leverage HashHub's powerful multilingual embeddings for your next AI project!
