import { useState } from "react";
import { BookOpen, Clock, ArrowRight, Search, Code, Database, Zap, Settings } from "lucide-react";

export function Guides() {
  const [selectedGuide, setSelectedGuide] = useState('getting-started');

  const guides = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using HashHub APIs',
      readTime: '5 min read',
      category: 'Basics',
      icon: BookOpen
    },
    {
      id: 'doc-processing',
      title: 'Document Processing',
      description: 'Complete guide to OCR and document extraction',
      readTime: '10 min read',
      category: 'Document API',
      icon: Code
    },
    {
      id: 'text-embeddings',
      title: 'Text Embeddings',
      description: 'Generate high-quality text embeddings',
      readTime: '8 min read',
      category: 'Vector API',
      icon: Database
    },
    {
      id: 'langchain-integration',
      title: 'LangChain Integration',
      description: 'Build RAG applications with LangChain',
      readTime: '15 min read',
      category: 'Vector API',
      icon: Zap
    },
    {
      id: 'authentication',
      title: 'Authentication',
      description: 'Secure your API requests with proper auth',
      readTime: '3 min read',
      category: 'Basics',
      icon: Settings
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      description: 'Best practices for handling API errors',
      readTime: '6 min read',
      category: 'Best Practices',
      icon: Settings
    },
    {
      id: 'rate-limits',
      title: 'Rate Limits & Optimization',
      description: 'Understanding limits and performance tips',
      readTime: '7 min read',
      category: 'Best Practices',
      icon: Settings
    }
  ];

  const getGuideContent = (guideId: string) => {
    switch (guideId) {
      case 'getting-started':
        return {
          title: 'Getting Started with HashHub APIs',
          content: `
# Getting Started with HashHub APIs

Welcome to HashHub! This guide will help you make your first API call and understand the basics of our powerful document processing and text embedding platform.

## 🚀 Overview

HashHub provides two professional APIs:
- **Document API**: Intelligent OCR and document processing
- **Vector API**: High-quality text embedding generation

## 📋 Prerequisites

Before you start, make sure you have:
- An active HashHub account
- Your API key (found in the [API Keys](/docs/api-keys) section)
- Basic understanding of REST APIs

## 🔑 Authentication

All API requests require authentication using your API key:

\`\`\`bash
# For Vector API
Authorization: Bearer your_api_key_here

# For Document API (no auth required for basic OCR)
Content-Type: application/json
\`\`\`

## 🎯 Your First API Call

### Document Processing (OCR)

Extract text from an image or document:

\`\`\`bash
curl -X POST "https://doc.hashhub.dev/api/v1/ocr" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "prompt_mode": "prompt_layout_all_en"
  }'
\`\`\`

### Text Embeddings

Generate embeddings for semantic search:

\`\`\`bash
curl -X POST "https://vector.hashhub.dev/vectorize" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Artificial intelligence is transforming industries.",
    "model": "gte_base"
  }'
\`\`\`

## 📊 Understanding Responses

### Document API Response

\`\`\`json
{
  "request_id": "req_123456789",
  "status": "completed",
  "result": {
    "text": "Extracted text content...",
    "confidence": 0.95,
    "layout": {
      "blocks": [...],
      "lines": [...],
      "words": [...]
    }
  },
  "processing_time_seconds": 2.5
}
\`\`\`

### Vector API Response

\`\`\`json
{
  "vector": [0.1234, -0.5678, 0.9012, ...],
  "dimension": 768,
  "chunks_processed": 1,
  "usage": {
    "prompt_tokens": 12,
    "total_tokens": 12
  }
}
\`\`\`

## 🛠️ SDK Integration

### Python

\`\`\`python
import httpx
import asyncio

async def test_vector_api():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://vector.hashhub.dev/vectorize",
            headers={"Authorization": "Bearer your_api_key"},
            json={
                "text": "Hello, HashHub!",
                "model": "gte_base"
            }
        )
        result = response.json()
        print(f"Vector dimension: {result['dimension']}")
        return result

# Run the example
result = asyncio.run(test_vector_api())
\`\`\`

### JavaScript/TypeScript

\`\`\`typescript
interface VectorResponse {
  vector: number[];
  dimension: number;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

async function testVectorAPI(): Promise<VectorResponse> {
  const response = await fetch('https://vector.hashhub.dev/vectorize', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'Hello, HashHub!',
      model: 'gte_base'
    })
  });
  
  return response.json();
}

testVectorAPI().then(result => {
  console.log(\`Vector dimension: \${result.dimension}\`);
});
\`\`\`

## 🎯 Next Steps

Now that you've made your first API call, explore these guides:

1. **[Document Processing](/docs/guides/doc-processing)** - Learn advanced OCR features
2. **[Text Embeddings](/docs/guides/text-embeddings)** - Explore embedding models
3. **[LangChain Integration](/docs/guides/langchain-integration)** - Build RAG applications
4. **[API Reference](/docs/api-reference)** - Complete endpoint documentation

## 💡 Tips for Success

- **Start Simple**: Begin with basic endpoints before exploring advanced features
- **Test Thoroughly**: Use the [Playground](/docs/playground) to experiment
- **Monitor Usage**: Track your API usage in the [Dashboard](/docs/dashboard)
- **Handle Errors**: Implement proper error handling (see [Error Handling guide](/docs/guides/error-handling))

## 📞 Need Help?

- 📖 **Documentation**: Browse our complete [API Reference](/docs/api-reference)
- 💬 **Community**: Join our [Discord community](https://discord.gg/hashhub)
- 📧 **Support**: Contact us at [support@hashhub.dev](mailto:support@hashhub.dev)
          `
        };
      case 'doc-processing':
        return {
          title: 'Document Processing & OCR Guide',
          content: `
# Document Processing & OCR Guide

Learn how to extract text and structured data from images and documents using HashHub's powerful OCR API.

## 🎯 Overview

The Document API provides:
- **High-accuracy OCR** for 50+ languages
- **Layout-aware extraction** with bounding boxes
- **Intelligent text enhancement** for poor quality images
- **Asynchronous processing** with queue management

## 📡 Core Endpoints

### Primary OCR Endpoint

**POST** \`/api/v1/ocr\`

Extract text from images with customizable options:

\`\`\`python
import requests
import base64

# Encode image to base64
with open("document.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()
    image_url = f"data:image/png;base64,{image_data}"

# Submit OCR request
response = requests.post(
    "https://doc.hashhub.dev/api/v1/ocr",
    json={
        "image": image_url,
        "prompt_mode": "prompt_layout_all_en",
        "timeout": 300,
        "enhance_options": {
            "preset": "scan_medium",
            "overrides": {
                "contrast": 1.3,
                "sharpness": 1.2
            }
        }
    }
)

result = response.json()
print(f"Request ID: {result['request_id']}")
\`\`\`

## 🎨 Processing Modes

### Available Prompt Modes

| Mode | Description | Layout | Language |
|------|-------------|---------|----------|
| \`prompt_layout_all_en\` | Full layout extraction | ✅ | English |
| \`prompt_layout_all_tr\` | Full layout extraction | ✅ | Turkish |
| \`prompt_text_only_en\` | Text only | ❌ | English |
| \`prompt_text_only_tr\` | Text only | ❌ | Turkish |

### Layout-Aware Extraction

Get structured data with bounding boxes:

\`\`\`json
{
  "result": {
    "text": "Complete extracted text...",
    "confidence": 0.95,
    "layout": {
      "blocks": [
        {
          "bbox": [120, 80, 400, 150],
          "text": "Block text content",
          "confidence": 0.98
        }
      ],
      "lines": [...],
      "words": [...]
    }
  }
}
\`\`\`

## 🖼️ Image Enhancement

### Enhancement Presets

\`\`\`json
{
  "enhance_options": {
    "preset": "scan_medium",
    "overrides": {
      "grayscale": true,
      "auto_contrast": true,
      "brightness": 1.1,
      "contrast": 1.3,
      "sharpness": 1.2,
      "deskew": true,
      "threshold": 170
    }
  }
}
\`\`\`

| Preset | Use Case | Description |
|--------|----------|-------------|
| \`light\` | Clean digital scans | Minimal processing |
| \`medium\` | Standard documents | Balanced enhancement |
| \`aggressive\` | Poor quality scans | Strong enhancement |
| \`scan_medium\` | Photocopies | Moderate enhancement |
| \`handwritten\` | Handwritten text | Optimized for cursive |

## 🔄 Asynchronous Processing

### Request Flow

1. **Submit Request**: Get a request ID
2. **Poll Status**: Check processing status
3. **Retrieve Results**: Get final output

\`\`\`python
import time

# Submit request
response = requests.post("https://doc.hashhub.dev/api/v1/ocr", json=request_data)
request_id = response.json()["request_id"]

# Poll for completion
while True:
    status_response = requests.get(f"https://doc.hashhub.dev/api/v1/requests/{request_id}")
    status_data = status_response.json()
    
    if status_data["status"] == "completed":
        result = status_data["result"]
        print("OCR completed!")
        break
    elif status_data["status"] == "failed":
        print(f"OCR failed: {status_data.get('error')}")
        break
    
    time.sleep(2)  # Wait 2 seconds before next check
\`\`\`

## 🌍 Multi-Language Support

### Supported Languages

The API supports 50+ languages including:
- **European**: English, German, French, Spanish, Italian, Dutch, Portuguese
- **Asian**: Chinese (Simplified/Traditional), Japanese, Korean, Hindi
- **Middle Eastern**: Arabic, Hebrew, Farsi
- **Other**: Russian, Turkish, Polish, Czech, and more

### Language-Specific Processing

\`\`\`python
# Turkish document processing
response = requests.post(
    "https://doc.hashhub.dev/api/v1/ocr",
    json={
        "image": image_url,
        "prompt_mode": "prompt_layout_all_tr",  # Turkish mode
        "enhance_options": {
            "preset": "medium"
        }
    }
)
\`\`\`

## ⚡ Performance Optimization

### Best Practices

1. **Image Quality**
   - Use 300+ DPI for scanned documents
   - Ensure good contrast between text and background
   - Avoid blurry or skewed images

2. **Format Selection**
   - PNG/TIFF for best quality
   - JPEG for web images (with high quality setting)
   - PDF for multi-page documents

3. **Processing Optimization**
   - Use appropriate enhancement presets
   - Set reasonable timeout values
   - Implement exponential backoff for status polling

### Example: Batch Processing

\`\`\`python
import asyncio
import aiohttp

async def process_document(session, image_path):
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode()
        image_url = f"data:image/png;base64,{image_data}"
    
    async with session.post(
        "https://doc.hashhub.dev/api/v1/ocr",
        json={
            "image": image_url,
            "prompt_mode": "prompt_layout_all_en"
        }
    ) as response:
        result = await response.json()
        return result

async def batch_process_documents(image_paths):
    async with aiohttp.ClientSession() as session:
        tasks = [process_document(session, path) for path in image_paths]
        results = await asyncio.gather(*tasks)
        return results

# Process multiple documents
image_files = ["doc1.png", "doc2.png", "doc3.png"]
results = asyncio.run(batch_process_documents(image_files))
\`\`\`

## 🚨 Error Handling

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| \`400\` | Invalid request format | Check JSON structure and image encoding |
| \`413\` | Image too large | Reduce image size or resolution |
| \`422\` | Validation error | Verify parameter types and values |
| \`500\` | Server error | Retry with exponential backoff |
| \`503\` | Service unavailable | Check OCR engine status |

### Robust Error Handling

\`\`\`python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
def submit_ocr_request(image_data):
    try:
        response = requests.post(
            "https://doc.hashhub.dev/api/v1/ocr",
            json={"image": image_data, "prompt_mode": "prompt_layout_all_en"},
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        raise
    except ValueError as e:
        print(f"Invalid JSON response: {e}")
        raise

# Usage with automatic retries
try:
    result = submit_ocr_request(image_url)
    print("OCR successful!")
except Exception as e:
    print(f"OCR failed after retries: {e}")
\`\`\`

## 📊 Use Cases & Examples

### Invoice Processing

\`\`\`python
def extract_invoice_data(image_path):
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode()
        image_url = f"data:image/png;base64,{image_data}"
    
    response = requests.post(
        "https://doc.hashhub.dev/api/v1/ocr",
        json={
            "image": image_url,
            "prompt_mode": "prompt_layout_all_en",
            "enhance_options": {
                "preset": "scan_medium",
                "overrides": {
                    "contrast": 1.4,
                    "sharpness": 1.3
                }
            }
        }
    )
    
    result = response.json()
    
    # Extract structured data
    text = result["result"]["text"]
    blocks = result["result"]["layout"]["blocks"]
    
    # Parse invoice fields (implement your business logic)
    invoice_data = parse_invoice_fields(text, blocks)
    return invoice_data
\`\`\`

### Form Processing

\`\`\`python
def process_form(image_path):
    # Process form with handwritten text optimization
    response = requests.post(
        "https://doc.hashhub.dev/api/v1/ocr",
        json={
            "image": image_url,
            "prompt_mode": "prompt_layout_all_en",
            "enhance_options": {
                "preset": "handwritten",
                "overrides": {
                    "deskew": True,
                    "auto_contrast": True
                }
            }
        }
    )
    
    return response.json()
\`\`\`

## 🔗 Integration Examples

### Flask Web Service

\`\`\`python
from flask import Flask, request, jsonify
import base64

app = Flask(__name__)

@app.route('/ocr', methods=['POST'])
def ocr_endpoint():
    try:
        # Get uploaded file
        file = request.files['image']
        image_data = base64.b64encode(file.read()).decode()
        image_url = f"data:image/{file.content_type.split('/')[-1]};base64,{image_data}"
        
        # Submit to HashHub OCR
        response = requests.post(
            "https://doc.hashhub.dev/api/v1/ocr",
            json={
                "image": image_url,
                "prompt_mode": request.form.get('mode', 'prompt_layout_all_en')
            }
        )
        
        return jsonify(response.json())
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

## 📞 Support

- **API Documentation**: [Full API Reference](/docs/api-reference)
- **Status Page**: [status.hashhub.dev](https://status.hashhub.dev)
- **Support**: [support@hashhub.dev](mailto:support@hashhub.dev)
          `
        };
      case 'langchain-integration':
        return {
          title: 'LangChain Integration Guide',
          content: `
# LangChain Integration Guide

Build powerful RAG applications and semantic search systems using HashHub Vector API with LangChain framework.

## 🚀 Quick Start

### Installation

\`\`\`bash
pip install langchain langchain-openai httpx
\`\`\`

### Basic Setup

\`\`\`python
from langchain.embeddings import OpenAIEmbeddings

# Configure HashHub as OpenAI-compatible endpoint
embeddings = OpenAIEmbeddings(
    openai_api_key="sk-hashhub-key...",
    openai_api_base="https://vector.hashhub.dev/v1",
    model="gte_base"  # HashHub model
)

# Test the connection
text = "Hello, this is a test document."
vector = embeddings.embed_query(text)
print(f"Embedding dimension: {len(vector)}")
\`\`\`

## 🔧 Custom HashHub Embeddings Class

For HashHub-specific features and better control:

\`\`\`python
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
        """Async embed multiple documents using batch endpoint."""
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
\`\`\`

## 📄 Vector Store Integration

### Chroma Vector Store

\`\`\`python
from langchain.vectorstores import Chroma
from langchain.schema import Document

# Initialize embeddings
embeddings = HashHubEmbeddings(api_key="sk-hashhub-key...")

# Create documents
documents = [
    Document(
        page_content="HashHub provides high-quality embeddings for AI applications",
        metadata={"source": "docs", "category": "api"}
    ),
    Document(
        page_content="LangChain integration makes it easy to build RAG systems",
        metadata={"source": "guide", "category": "integration"}
    ),
]

# Create vector store
vectorstore = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# Similarity search
query = "How to use embeddings for search?"
similar_docs = vectorstore.similarity_search(query, k=3)

for doc in similar_docs:
    print(f"Content: {doc.page_content}")
    print(f"Source: {doc.metadata['source']}")
\`\`\`

### FAISS Vector Store

\`\`\`python
from langchain.vectorstores import FAISS

# Create FAISS vector store
texts = [
    "Customer support documentation and FAQ",
    "Product specifications and technical details", 
    "User guides and tutorial content",
    "API documentation and code examples"
]

vectorstore = FAISS.from_texts(
    texts=texts,
    embedding=embeddings,
    metadatas=[{"id": i, "type": "doc"} for i in range(len(texts))]
)

# Save the vector store
vectorstore.save_local("faiss_index")

# Load and search
vectorstore = FAISS.load_local(
    "faiss_index", 
    embeddings,
    allow_dangerous_deserialization=True
)

# Search with scores
query = "API documentation"
results = vectorstore.similarity_search_with_score(query, k=2)

for doc, score in results:
    print(f"Score: {score:.4f} - {doc.page_content}")
\`\`\`

## 🤖 RAG (Retrieval Augmented Generation)

### Basic RAG Pipeline

\`\`\`python
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter

def create_rag_system(documents, openai_api_key):
    # Initialize HashHub embeddings
    embeddings = HashHubEmbeddings(
        api_key="sk-hashhub-key...",
        model="gte_base"  # Best for RAG
    )
    
    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    split_docs = text_splitter.split_documents(documents)
    
    # Create vector store
    vectorstore = Chroma.from_documents(
        documents=split_docs,
        embedding=embeddings,
        persist_directory="./rag_db"
    )
    
    # Initialize LLM
    llm = OpenAI(openai_api_key=openai_api_key, temperature=0)
    
    # Create retrieval chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(
            search_kwargs={"k": 5}
        ),
        return_source_documents=True
    )
    
    return qa_chain

# Usage
from langchain.schema import Document

knowledge_base = [
    Document(page_content="HashHub Vector API provides 6 different embedding models..."),
    Document(page_content="The gte_base model offers 768 dimensions with 8K context..."),
    Document(page_content="Pricing is based on token usage with transparent costs...")
]

rag_chain = create_rag_system(knowledge_base, "your-openai-key")

# Ask questions
result = rag_chain({"query": "What embedding models are available?"})
print(f"Answer: {result['result']}")
print(f"Sources: {len(result['source_documents'])}")
\`\`\`

### Advanced RAG with Custom Retriever

\`\`\`python
from langchain.schema import BaseRetriever, Document
from typing import List

class HashHubRetriever(BaseRetriever):
    def __init__(self, vectorstore, search_kwargs=None, score_threshold=0.7):
        self.vectorstore = vectorstore
        self.search_kwargs = search_kwargs or {"k": 5}
        self.score_threshold = score_threshold
    
    def _get_relevant_documents(self, query: str) -> List[Document]:
        # Get documents with similarity scores
        docs_and_scores = self.vectorstore.similarity_search_with_score(
            query, **self.search_kwargs
        )
        
        # Filter by score threshold
        relevant_docs = [
            doc for doc, score in docs_and_scores
            if score >= self.score_threshold
        ]
        
        return relevant_docs

# Create custom retriever
vectorstore = Chroma.from_documents(documents, embeddings)
custom_retriever = HashHubRetriever(
    vectorstore=vectorstore,
    search_kwargs={"k": 10},
    score_threshold=0.8
)

# Use with QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=custom_retriever,
    return_source_documents=True
)
\`\`\`

## 🔍 Semantic Search Engine

\`\`\`python
from langchain.vectorstores import FAISS
import numpy as np
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
    
    def search(self, query: str, k: int = 5) -> List[tuple]:
        """Search for similar documents."""
        if self.vectorstore is None:
            return []
        
        results = self.vectorstore.similarity_search_with_score(query, k=k)
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

# Usage
search_engine = SemanticSearchEngine("sk-hashhub-key...")

# Add documents
documents = [
    Document(
        page_content="HashHub Vector API supports multiple embedding models",
        metadata={"category": "api", "topic": "models"}
    ),
    Document(
        page_content="LangChain integration enables RAG applications",
        metadata={"category": "integration", "topic": "frameworks"}
    )
]

search_engine.add_documents(documents)

# Search
results = search_engine.search("embedding models", k=3)
for doc, score in results:
    print(f"Score: {score:.4f} - {doc.page_content}")

# Calculate similarity
similarity = search_engine.semantic_similarity(
    "machine learning embeddings",
    "vector representations of text"
)
print(f"Similarity: {similarity:.4f}")
\`\`\`

## ⚡ Performance Optimization

### Caching Embeddings

\`\`\`python
import pickle
import os
import hashlib

class CachedHashHubEmbeddings(HashHubEmbeddings):
    def __init__(self, *args, cache_dir="./embeddings_cache", **kwargs):
        super().__init__(*args, **kwargs)
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)
    
    def _get_cache_key(self, text: str) -> str:
        """Generate cache key for text."""
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
        
        # Generate and cache embedding
        embedding = super().embed_query(text)
        
        with open(cache_file, "wb") as f:
            pickle.dump(embedding, f)
        
        return embedding

# Usage
cached_embeddings = CachedHashHubEmbeddings(
    api_key="sk-hashhub-key...",
    cache_dir="./embedding_cache"
)
\`\`\`

## 📚 Complete Knowledge Base Example

\`\`\`python
from langchain.document_loaders import TextLoader, PDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

class HashHubKnowledgeBase:
    def __init__(self, hashhub_api_key: str, openai_api_key: str):
        self.embeddings = HashHubEmbeddings(
            api_key=hashhub_api_key,
            model="gte_base"
        )
        self.llm = OpenAI(openai_api_key=openai_api_key)
        self.vectorstore = None
        self.qa_chain = None
    
    def load_documents(self, file_paths: List[str]):
        """Load and process documents."""
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
            chunk_overlap=200
        )
        
        return text_splitter.split_documents(documents)
    
    def create_knowledge_base(self, documents: List[Document]):
        """Create searchable knowledge base."""
        self.vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings,
            persist_directory="./kb_storage"
        )
        
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(search_kwargs={"k": 5}),
            return_source_documents=True
        )
        
        print(f"Knowledge base created with {len(documents)} documents")
    
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

# Usage
kb = HashHubKnowledgeBase(
    hashhub_api_key="sk-hashhub-key...",
    openai_api_key="your-openai-key"
)

# Load documents
documents = kb.load_documents(["manual.pdf", "faq.txt"])
kb.create_knowledge_base(documents)

# Query
result = kb.query("How do I integrate HashHub with LangChain?")
print(f"Answer: {result['answer']}")
\`\`\`

## 🚨 Error Handling & Monitoring

\`\`\`python
import logging
from tenacity import retry, stop_after_attempt, wait_exponential

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
            self.logger.error(f"Embedding failed: {e}")
            raise
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Embed with chunking for large batches."""
        if len(texts) > 100:
            # Process in chunks
            chunk_size = 50
            all_embeddings = []
            
            for i in range(0, len(texts), chunk_size):
                chunk = texts[i:i + chunk_size]
                try:
                    chunk_embeddings = self.base_embeddings.embed_documents(chunk)
                    all_embeddings.extend(chunk_embeddings)
                except Exception as e:
                    self.logger.error(f"Chunk processing failed: {e}")
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
\`\`\`

## 📞 Support & Resources

- **HashHub Documentation**: [vector.hashhub.dev/docs](https://vector.hashhub.dev/docs)
- **LangChain Examples**: [GitHub Repository](https://github.com/hashhub/langchain-examples)
- **Community Support**: [Discord](https://discord.gg/hashhub)
- **Technical Support**: [support@hashhub.dev](mailto:support@hashhub.dev)

---

**Ready to build?** Start with our [complete RAG example](https://github.com/hashhub/langchain-rag-example) on GitHub!
          `
        };
      default:
        return {
          title: 'Guide Not Found',
          content: 'This guide is not available yet. Please check back soon or contact support for assistance.'
        };
    }
  };

  const currentGuide = getGuideContent(selectedGuide);
  const categories = [...new Set(guides.map(g => g.category))];
  
  // Generate table of contents from markdown headers
  const tableOfContents = currentGuide.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '');
      return { 
        level, 
        text, 
        id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') 
      };
    });

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Guide Navigation */}
      <div className="w-80 border-r border-border p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Integration Guides</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Learn how to build powerful applications with HashHub APIs
          </p>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guides..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {guides.filter(g => g.category === category).map((guide) => {
                  const IconComponent = guide.icon;
                  return (
                    <button
                      key={guide.id}
                      onClick={() => setSelectedGuide(guide.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors group ${
                        selectedGuide === guide.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          selectedGuide === guide.id ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium text-sm leading-tight">{guide.title}</h4>
                            <ArrowRight className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform ${
                              selectedGuide === guide.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                            }`} />
                          </div>
                          <p className="text-xs opacity-80 mb-2 leading-relaxed">{guide.description}</p>
                          <div className="flex items-center gap-2 text-xs opacity-70">
                            <Clock className="w-3 h-3" />
                            {guide.readTime}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-8 max-w-4xl overflow-auto">
          <article className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground m-0">{currentGuide.title}</h1>
              </div>
            </div>
            
            <div 
              className="text-foreground"
              dangerouslySetInnerHTML={{ 
                __html: currentGuide.content
                  // Headers
                  .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8 border-b border-border pb-2">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-foreground mb-4 mt-8">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium text-foreground mb-3 mt-6">$1</h3>')
                  
                  // Code blocks
                  .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 whitespace-pre-wrap"><code class="text-foreground">$2</code></pre>')
                  
                  // Inline code
                  .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">$1</code>')
                  
                  // Tables
                  .replace(/\|([^|\n]+)\|/g, (_, content) => {
                    const cells = content.split('|').map((cell: string) => cell.trim());
                    return '<tr>' + cells.map((cell: any) => `<td class="border border-border px-3 py-2">${cell}</td>`).join('') + '</tr>';
                  })
                  
                  // Lists
                  .replace(/^\* (.*$)/gim, '<li class="mb-2 ml-4">$1</li>')
                  .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-2 ml-4">$2</li>')
                  
                  // Paragraphs
                  .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
                  .replace(/^(?!<[h|l|p|c|t])(.*$)/gim, '<p class="mb-4 leading-relaxed">$1</p>')
                  
                  // Clean up
                  .replace(/<p class="mb-4 leading-relaxed"><\/p>/g, '')
              }}
            />
          </article>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <div className="w-64 border-l border-border p-6">
          <div className="sticky top-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">On this page</h3>
            <nav className="space-y-2">
              {tableOfContents.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className={`block text-sm transition-colors hover:text-primary leading-relaxed ${
                    item.level === 1 
                      ? 'font-medium text-foreground' 
                      : item.level === 2
                      ? 'ml-3 text-muted-foreground'
                      : 'ml-6 text-muted-foreground text-xs'
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
            
            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <a
                  href="/docs/api-reference"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Code className="w-4 h-4" />
                  API Reference
                </a>
                <a
                  href="/docs/playground"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Try in Playground
                </a>
                <a
                  href="https://github.com/HasHubDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  GitHub Examples
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
