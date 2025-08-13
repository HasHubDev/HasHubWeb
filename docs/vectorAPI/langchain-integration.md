# LangChain Integration Guide

Complete guide for integrating HashHub Vector API with LangChain framework for RAG, semantic search, and AI applications.

## 🚀 Quick Start

### Installation

```bash
pip install langchain langchain-openai httpx
```

### Basic Setup

```python
from langchain.embeddings import OpenAIEmbeddings

# Configure HashHub as OpenAI-compatible endpoint
embeddings = OpenAIEmbeddings(
    openai_api_key="sk-hashhub-key...",
    openai_api_base="https://vector.hashhub.dev/v1",
    model="gte_base"  # or any HashHub model
)

# Test the connection
text = "Hello, this is a test document."
vector = embeddings.embed_query(text)
print(f"Embedding dimension: {len(vector)}")
```

## 🔧 Custom HashHub Embeddings Class

For more control and HashHub-specific features:

```python
from langchain.embeddings.base import Embeddings
from typing import List
import httpx
import asyncio

class HashHubEmbeddings(Embeddings):
    def __init__(
        self,
        api_key: str,
        model: str = "gte_base",
        base_url: str = "https://vector.hashhub.dev",
        chunk_size: int = 512,
        chunk_overlap: float = 0.1
    ):
        self.api_key = api_key
        self.model = model
        self.base_url = base_url
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Embed a list of documents."""
        return asyncio.run(self._aembed_documents(texts))
    
    def embed_query(self, text: str) -> List[float]:
        """Embed a single query text."""
        return asyncio.run(self._aembed_query(text))
    
    async def _aembed_documents(self, texts: List[str]) -> List[List[float]]:
        """Async embed multiple documents."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/vectorize/batch",
                headers=self.headers,
                json={
                    "texts": texts,
                    "model": self.model,
                    "chunk_size": self.chunk_size,
                    "chunk_overlap": self.chunk_overlap
                }
            )
            response.raise_for_status()
            result = response.json()
            return result["vectors"]
    
    async def _aembed_query(self, text: str) -> List[float]:
        """Async embed a single query."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/vectorize",
                headers=self.headers,
                json={
                    "text": text,
                    "model": self.model,
                    "chunk_size": self.chunk_size,
                    "chunk_overlap": self.chunk_overlap
                }
            )
            response.raise_for_status()
            result = response.json()
            return result["vector"]

# Usage
embeddings = HashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="gte_base",
    chunk_size=1024
)
```

## 📄 Document Processing

### Text Splitting and Embedding

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

# Initialize embeddings
embeddings = HashHubEmbeddings(api_key="sk-hashhub-key...")

# Load and split documents
def process_documents(file_paths):
    documents = []
    
    for file_path in file_paths:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Create document
        doc = Document(
            page_content=content,
            metadata={"source": file_path}
        )
        documents.append(doc)
    
    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    
    split_docs = text_splitter.split_documents(documents)
    
    # Embed documents
    texts = [doc.page_content for doc in split_docs]
    vectors = embeddings.embed_documents(texts)
    
    return split_docs, vectors

# Usage
file_paths = ["doc1.txt", "doc2.txt", "doc3.txt"]
documents, embeddings_list = process_documents(file_paths)

print(f"Processed {len(documents)} document chunks")
print(f"Generated {len(embeddings_list)} embeddings")
```

## 🗄️ Vector Store Integration

### Chroma Integration

```python
from langchain.vectorstores import Chroma
from langchain.schema import Document

# Initialize embeddings
embeddings = HashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="gte_base"
)

# Create documents
documents = [
    Document(page_content="Document 1 content", metadata={"id": 1}),
    Document(page_content="Document 2 content", metadata={"id": 2}),
    Document(page_content="Document 3 content", metadata={"id": 3}),
]

# Create vector store
vectorstore = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# Similarity search
query = "Find relevant content"
similar_docs = vectorstore.similarity_search(query, k=3)

for doc in similar_docs:
    print(f"Content: {doc.page_content[:100]}...")
    print(f"Metadata: {doc.metadata}")
```

### FAISS Integration

```python
from langchain.vectorstores import FAISS
import faiss

# Initialize embeddings
embeddings = HashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="e5_base"  # Fast model for large datasets
)

# Create FAISS vector store
texts = [
    "Customer support documentation",
    "Product specifications and features", 
    "Technical troubleshooting guides",
    "User manual and tutorials",
    "FAQ and common questions"
]

vectorstore = FAISS.from_texts(
    texts=texts,
    embedding=embeddings,
    metadatas=[{"source": f"doc_{i}"} for i in range(len(texts))]
)

# Save the vector store
vectorstore.save_local("faiss_index")

# Load and use
vectorstore = FAISS.load_local(
    "faiss_index", 
    embeddings,
    allow_dangerous_deserialization=True
)

# Similarity search with scores
query = "How to troubleshoot issues?"
results = vectorstore.similarity_search_with_score(query, k=2)

for doc, score in results:
    print(f"Score: {score:.4f}")
    print(f"Content: {doc.page_content}")
    print(f"Source: {doc.metadata['source']}")
```

### Pinecone Integration

```python
from langchain.vectorstores import Pinecone
import pinecone

# Initialize Pinecone
pinecone.init(
    api_key="your-pinecone-key",
    environment="your-env"
)

# Initialize embeddings
embeddings = HashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="nomic_base"
)

# Create index if it doesn't exist
index_name = "hashhub-embeddings"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        name=index_name,
        dimension=768,  # Adjust based on model
        metric="cosine"
    )

# Create vector store
texts = ["Document 1", "Document 2", "Document 3"]
vectorstore = Pinecone.from_texts(
    texts=texts,
    embedding=embeddings,
    index_name=index_name
)

# Search
results = vectorstore.similarity_search("search query", k=3)
```

## 🤖 RAG (Retrieval Augmented Generation)

### Basic RAG Pipeline

```python
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter

# Initialize HashHub embeddings
embeddings = HashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="gte_base",  # Best for RAG applications
    chunk_size=1024
)

# Load and process documents
def create_rag_chain(documents, llm_api_key):
    # Split documents
    text_splitter = CharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    texts = text_splitter.split_documents(documents)
    
    # Create vector store
    vectorstore = Chroma.from_documents(
        documents=texts,
        embedding=embeddings
    )
    
    # Initialize LLM
    llm = OpenAI(openai_api_key=llm_api_key)
    
    # Create retrieval chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
        return_source_documents=True
    )
    
    return qa_chain

# Usage
from langchain.schema import Document

docs = [
    Document(page_content="HashHub provides vector embeddings..."),
    Document(page_content="The API supports multiple models..."),
    Document(page_content="Pricing is based on token usage...")
]

qa_chain = create_rag_chain(docs, "your-openai-key")

# Ask questions
result = qa_chain({"query": "What models does HashHub support?"})
print(f"Answer: {result['result']}")
print(f"Sources: {len(result['source_documents'])}")
```

### Advanced RAG with Custom Retriever

```python
from langchain.schema import BaseRetriever, Document
from langchain.vectorstores.base import VectorStore
from typing import List
import numpy as np

class HashHubRetriever(BaseRetriever):
    def __init__(
        self,
        vectorstore: VectorStore,
        search_kwargs: dict = None,
        score_threshold: float = 0.7
    ):
        self.vectorstore = vectorstore
        self.search_kwargs = search_kwargs or {"k": 5}
        self.score_threshold = score_threshold
    
    def _get_relevant_documents(self, query: str) -> List[Document]:
        # Get documents with scores
        docs_and_scores = self.vectorstore.similarity_search_with_score(
            query, **self.search_kwargs
        )
        
        # Filter by score threshold
        relevant_docs = [
            doc for doc, score in docs_and_scores
            if score >= self.score_threshold
        ]
        
        return relevant_docs

# Usage with custom retriever
vectorstore = Chroma.from_documents(docs, embeddings)
custom_retriever = HashHubRetriever(
    vectorstore=vectorstore,
    search_kwargs={"k": 10},
    score_threshold=0.8
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=custom_retriever
)
```

## 🔍 Semantic Search

### Advanced Semantic Search

```python
from langchain.vectorstores import FAISS
from langchain.schema import Document
import json

class SemanticSearchEngine:
    def __init__(self, api_key: str, model: str = "e5_base"):
        self.embeddings = HashHubEmbeddings(
            api_key=api_key,
            model=model
        )
        self.vectorstore = None
        self.documents = []
    
    def add_documents(self, documents: List[Document]):
        """Add documents to the search index."""
        self.documents.extend(documents)
        
        if self.vectorstore is None:
            self.vectorstore = FAISS.from_documents(
                documents, self.embeddings
            )
        else:
            # Add to existing vectorstore
            texts = [doc.page_content for doc in documents]
            metadatas = [doc.metadata for doc in documents]
            self.vectorstore.add_texts(texts, metadatas)
    
    def search(
        self,
        query: str,
        k: int = 5,
        filter_metadata: dict = None
    ) -> List[tuple]:
        """Search for similar documents."""
        if self.vectorstore is None:
            return []
        
        # Basic similarity search
        if filter_metadata is None:
            results = self.vectorstore.similarity_search_with_score(
                query, k=k
            )
        else:
            # Filtered search (if supported by vectorstore)
            results = self.vectorstore.similarity_search_with_score(
                query, k=k, filter=filter_metadata
            )
        
        return [(doc, score) for doc, score in results]
    
    def semantic_similarity(self, text1: str, text2: str) -> float:
        """Calculate semantic similarity between two texts."""
        vec1 = self.embeddings.embed_query(text1)
        vec2 = self.embeddings.embed_query(text2)
        
        # Cosine similarity
        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        
        return dot_product / (norm1 * norm2)
    
    def save_index(self, path: str):
        """Save the search index."""
        if self.vectorstore:
            self.vectorstore.save_local(path)
            
            # Save document metadata
            with open(f"{path}/documents.json", "w") as f:
                json.dump([
                    {
                        "content": doc.page_content,
                        "metadata": doc.metadata
                    }
                    for doc in self.documents
                ], f)
    
    def load_index(self, path: str):
        """Load a saved search index."""
        self.vectorstore = FAISS.load_local(
            path, self.embeddings,
            allow_dangerous_deserialization=True
        )
        
        # Load document metadata
        try:
            with open(f"{path}/documents.json", "r") as f:
                doc_data = json.load(f)
                self.documents = [
                    Document(
                        page_content=item["content"],
                        metadata=item["metadata"]
                    )
                    for item in doc_data
                ]
        except FileNotFoundError:
            print("Warning: documents.json not found")

# Usage example
search_engine = SemanticSearchEngine("sk-hashhub-key...")

# Add documents
documents = [
    Document(
        page_content="HashHub Vector API provides multilingual embeddings",
        metadata={"category": "api", "topic": "embeddings"}
    ),
    Document(
        page_content="Support for 6 different embedding models",
        metadata={"category": "models", "topic": "features"}
    ),
    Document(
        page_content="Token-based pricing with transparent costs",
        metadata={"category": "pricing", "topic": "billing"}
    )
]

search_engine.add_documents(documents)

# Search
results = search_engine.search("embedding models", k=2)
for doc, score in results:
    print(f"Score: {score:.4f}")
    print(f"Content: {doc.page_content}")
    print(f"Category: {doc.metadata['category']}")

# Calculate similarity
similarity = search_engine.semantic_similarity(
    "machine learning embeddings",
    "vector representations of text"
)
print(f"Similarity: {similarity:.4f}")
```

## 🔗 Chains and Agents

### Custom Chain with HashHub

```python
from langchain.chains.base import Chain
from langchain.schema import BaseLanguageModel, Document
from typing import Dict, List, Any

class HashHubSemanticChain(Chain):
    """Custom chain using HashHub embeddings for semantic processing."""
    
    embeddings: HashHubEmbeddings
    vectorstore: Any
    llm: BaseLanguageModel
    
    @property
    def input_keys(self) -> List[str]:
        return ["query", "documents"]
    
    @property
    def output_keys(self) -> List[str]:
        return ["result", "similar_docs", "confidence"]
    
    def _call(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        query = inputs["query"]
        documents = inputs.get("documents", [])
        
        # Add documents to vectorstore if provided
        if documents and not self.vectorstore:
            self.vectorstore = FAISS.from_documents(
                documents, self.embeddings
            )
        
        # Find similar documents
        if self.vectorstore:
            similar_docs = self.vectorstore.similarity_search_with_score(
                query, k=3
            )
            
            # Extract context
            context = "\n\n".join([
                doc.page_content for doc, _ in similar_docs
            ])
            
            # Generate response with LLM
            prompt = f"""
            Based on the following context, answer the question:
            
            Context:
            {context}
            
            Question: {query}
            
            Answer:
            """
            
            result = self.llm(prompt)
            
            # Calculate confidence based on similarity scores
            scores = [score for _, score in similar_docs]
            confidence = np.mean(scores) if scores else 0.0
            
            return {
                "result": result,
                "similar_docs": [doc for doc, _ in similar_docs],
                "confidence": confidence
            }
        
        return {
            "result": "No context available",
            "similar_docs": [],
            "confidence": 0.0
        }

# Usage
from langchain.llms import OpenAI

chain = HashHubSemanticChain(
    embeddings=HashHubEmbeddings("sk-hashhub-key..."),
    llm=OpenAI(openai_api_key="your-openai-key"),
    vectorstore=None
)

result = chain({
    "query": "What are the benefits of using HashHub?",
    "documents": documents
})

print(f"Answer: {result['result']}")
print(f"Confidence: {result['confidence']:.2f}")
```

## 📊 Performance Optimization

### Caching and Batch Processing

```python
from langchain.cache import InMemoryCache
from langchain.globals import set_llm_cache
import pickle
import os

class CachedHashHubEmbeddings(HashHubEmbeddings):
    def __init__(self, *args, cache_dir: str = "./embeddings_cache", **kwargs):
        super().__init__(*args, **kwargs)
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)
    
    def _get_cache_key(self, text: str) -> str:
        """Generate cache key for text."""
        import hashlib
        return hashlib.md5(
            f"{self.model}:{text}".encode()
        ).hexdigest()
    
    def embed_query(self, text: str) -> List[float]:
        """Embed with caching."""
        cache_key = self._get_cache_key(text)
        cache_file = os.path.join(self.cache_dir, f"{cache_key}.pkl")
        
        # Try to load from cache
        if os.path.exists(cache_file):
            with open(cache_file, "rb") as f:
                return pickle.load(f)
        
        # Generate embedding
        embedding = super().embed_query(text)
        
        # Save to cache
        with open(cache_file, "wb") as f:
            pickle.dump(embedding, f)
        
        return embedding
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Batch embed with smart caching."""
        cached_embeddings = []
        uncached_texts = []
        uncached_indices = []
        
        # Check cache for each text
        for i, text in enumerate(texts):
            cache_key = self._get_cache_key(text)
            cache_file = os.path.join(self.cache_dir, f"{cache_key}.pkl")
            
            if os.path.exists(cache_file):
                with open(cache_file, "rb") as f:
                    cached_embeddings.append((i, pickle.load(f)))
            else:
                uncached_texts.append(text)
                uncached_indices.append(i)
        
        # Batch process uncached texts
        if uncached_texts:
            new_embeddings = super().embed_documents(uncached_texts)
            
            # Cache new embeddings
            for text, embedding in zip(uncached_texts, new_embeddings):
                cache_key = self._get_cache_key(text)
                cache_file = os.path.join(self.cache_dir, f"{cache_key}.pkl")
                with open(cache_file, "wb") as f:
                    pickle.dump(embedding, f)
            
            # Combine cached and new embeddings
            for i, embedding in zip(uncached_indices, new_embeddings):
                cached_embeddings.append((i, embedding))
        
        # Sort by original index and return
        cached_embeddings.sort(key=lambda x: x[0])
        return [embedding for _, embedding in cached_embeddings]

# Usage
cached_embeddings = CachedHashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="gte_base",
    cache_dir="./embedding_cache"
)
```

## 🚨 Error Handling and Monitoring

```python
import logging
from tenacity import retry, stop_after_attempt, wait_exponential
from langchain.embeddings.base import Embeddings

class RobustHashHubEmbeddings(Embeddings):
    def __init__(self, *args, **kwargs):
        self.base_embeddings = HashHubEmbeddings(*args, **kwargs)
        self.logger = logging.getLogger(__name__)
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    def embed_query(self, text: str) -> List[float]:
        """Embed with retry logic."""
        try:
            return self.base_embeddings.embed_query(text)
        except Exception as e:
            self.logger.error(f"Embedding failed for query: {e}")
            raise
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Embed documents with retry and chunking."""
        if len(texts) > 100:  # Large batch
            # Split into smaller chunks
            chunk_size = 50
            all_embeddings = []
            
            for i in range(0, len(texts), chunk_size):
                chunk = texts[i:i + chunk_size]
                try:
                    chunk_embeddings = self.base_embeddings.embed_documents(chunk)
                    all_embeddings.extend(chunk_embeddings)
                    self.logger.info(f"Processed chunk {i//chunk_size + 1}")
                except Exception as e:
                    self.logger.error(f"Chunk {i//chunk_size + 1} failed: {e}")
                    raise
            
            return all_embeddings
        else:
            return self.base_embeddings.embed_documents(texts)

# Usage with monitoring
logging.basicConfig(level=logging.INFO)
robust_embeddings = RobustHashHubEmbeddings(
    api_key="sk-hashhub-key...",
    model="gte_base"
)
```

## 📚 Complete Example: Knowledge Base

```python
from langchain.document_loaders import TextLoader, PDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
import os

class HashHubKnowledgeBase:
    def __init__(self, hashhub_api_key: str, openai_api_key: str):
        self.embeddings = HashHubEmbeddings(
            api_key=hashhub_api_key,
            model="gte_base",  # Best for knowledge base
            chunk_size=1024
        )
        self.llm = OpenAI(openai_api_key=openai_api_key)
        self.vectorstore = None
        self.qa_chain = None
    
    def load_documents(self, file_paths: List[str]):
        """Load documents from various file types."""
        documents = []
        
        for file_path in file_paths:
            if file_path.endswith('.txt'):
                loader = TextLoader(file_path)
            elif file_path.endswith('.pdf'):
                loader = PDFLoader(file_path)
            else:
                continue
            
            docs = loader.load()
            documents.extend(docs)
        
        # Split documents
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        
        split_docs = text_splitter.split_documents(documents)
        return split_docs
    
    def create_knowledge_base(self, documents: List[Document]):
        """Create vector store from documents."""
        self.vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings,
            persist_directory="./knowledge_base"
        )
        
        # Create QA chain
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(
                search_kwargs={"k": 5}
            ),
            return_source_documents=True
        )
        
        print(f"Knowledge base created with {len(documents)} chunks")
    
    def query(self, question: str) -> dict:
        """Query the knowledge base."""
        if not self.qa_chain:
            return {"error": "Knowledge base not created"}
        
        result = self.qa_chain({"query": question})
        
        return {
            "answer": result["result"],
            "sources": [
                {
                    "content": doc.page_content[:200] + "...",
                    "metadata": doc.metadata
                }
                for doc in result["source_documents"]
            ]
        }
    
    def add_documents(self, new_documents: List[Document]):
        """Add new documents to existing knowledge base."""
        if self.vectorstore:
            texts = [doc.page_content for doc in new_documents]
            metadatas = [doc.metadata for doc in new_documents]
            self.vectorstore.add_texts(texts, metadatas)
            print(f"Added {len(new_documents)} new documents")

# Usage
kb = HashHubKnowledgeBase(
    hashhub_api_key="sk-hashhub-key...",
    openai_api_key="your-openai-key"
)

# Load and process documents
file_paths = ["manual.pdf", "faq.txt", "guide.txt"]
documents = kb.load_documents(file_paths)
kb.create_knowledge_base(documents)

# Query the knowledge base
result = kb.query("How do I integrate HashHub with my application?")
print(f"Answer: {result['answer']}")
print(f"Sources: {len(result['sources'])}")
```

## 📞 Support and Resources

- **Documentation:** [vector.hashhub.dev/docs](https://vector.hashhub.dev/docs)
- **LangChain Examples:** [github.com/hashhub/langchain-examples](https://github.com/hashhub/langchain-examples)
- **Support:** [support@hashhub.dev](mailto:support@hashhub.dev)
- **Community:** [Discord](https://discord.gg/hashhub)

---

**Need help with your LangChain integration?** Our team provides free consultation for LangChain users. Contact us at [support@hashhub.dev](mailto:support@hashhub.dev)!
