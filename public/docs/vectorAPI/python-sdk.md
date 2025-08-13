# Python SDK Documentation

[![PyPI version](https://badge.fury.io/py/hashub-vector.svg)](https://pypi.org/project/hashub-vector/)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official Python SDK for Hashub Vector API - providing state-of-the-art text embeddings with exceptional Turkish language support.

## Installation

### Using pip (Recommended)

```bash
pip install hashub-vector
```

### Using poetry

```bash
poetry add hashub-vector
```

### Using conda

```bash
conda install -c conda-forge hashub-vector
```

### From source

```bash
git clone https://github.com/hashub-ai/hashub-vector-python.git
cd hashub-vector-python
pip install -e .
```

## Quick Start

### Basic Usage

```python
from hashub_vector import HashubVector

# Initialize the client
client = HashubVector(api_key="your-api-key-here")

# Vectorize a single text
result = client.vectorize(
    text="Merhaba dünya! Bu bir test metnidir.",
    model="e5_base"
)

print(f"Vector dimensions: {result.dimension}")
print(f"Tokens used: {result.tokens}")
print(f"First 5 values: {result.vector[:5]}")
```

### Environment Variable Setup

```bash
export HASHUB_API_KEY="your-api-key-here"
```

```python
from hashub_vector import HashubVector

# Will automatically use HASHUB_API_KEY environment variable
client = HashubVector()
```

## Configuration

### Client Initialization

```python
from hashub_vector import HashubVector

client = HashubVector(
    api_key="your-api-key",           # Required (or set HASHUB_API_KEY env var)
    base_url="https://api.hashub.ai", # Optional, defaults to official API
    timeout=30,                       # Optional, request timeout in seconds
    max_retries=3,                    # Optional, max retry attempts
    retry_delay=1.0                   # Optional, delay between retries in seconds
)
```

## API Methods

### 1. Vectorize Single Text

Convert a single text into a vector representation.

```python
result = client.vectorize(
    text="Your text here",
    model="e5_base",        # Optional, defaults to 'e5_base'
    chunk_size=512,         # Optional, for long texts
    chunk_overlap=50        # Optional, overlap between chunks
)

# Result attributes
print(result.vector)      # List[float] - The embedding vector
print(result.dimension)   # int - Vector dimensions
print(result.model)       # str - Model used
print(result.tokens)      # int - Tokens consumed
```

### 2. Vectorize Multiple Texts (Batch)

Process multiple texts in a single API call for better performance.

```python
texts = [
    "İstanbul Türkiye'nin en büyük şehridir.",
    "Ankara Türkiye'nin başkentidir.",
    "İzmir Ege Bölgesi'nin merkezi şehridir."
]

result = client.vectorize_batch(
    texts=texts,
    model="e5_base",
    chunk_size=512,
    chunk_overlap=50
)

# Result attributes
print(result.vectors)      # List[List[float]] - Array of embedding vectors
print(result.dimension)    # int - Vector dimensions
print(result.model)        # str - Model used
print(result.count)        # int - Number of texts processed
print(result.total_tokens) # int - Total tokens consumed
```

### 3. Calculate Text Similarity

Calculate cosine similarity between two texts.

```python
result = client.similarity(
    text1="İstanbul büyük bir şehir",
    text2="İstanbul metropol bir kent",
    model="e5_base"
)

print(f"Similarity: {result.similarity:.3f}")  # float (0-1)
print(f"Model used: {result.model}")           # str
```

### 4. Get Available Models

Retrieve information about available embedding models.

```python
models = client.get_models()

for model in models:
    print(f"Model: {model.alias}")
    print(f"Name: {model.name}")
    print(f"Description: {model.description}")
    print(f"Dimensions: {model.dimension}")
    print(f"Max tokens: {model.max_tokens}")
    print(f"Price per M tokens: ${model.price_per_m_tokens}")
    print(f"Turkish support: {model.turkish_support}/10")
    print("---")
```

### 5. Monitor Usage

Track your token usage and remaining quota.

```python
usage = client.get_usage()

print(f"Tokens used: {usage.tokens_used}")
print(f"Token limit: {usage.tokens_limit}")
print(f"Usage percentage: {usage.tokens_percentage_used:.1f}%")
print(f"Remaining tokens: {usage.tokens_remaining}")

# Alert if usage is high
if usage.tokens_percentage_used > 90:
    print("⚠️ Warning: High token usage!")
```

### 6. OpenAI Compatibility

Drop-in replacement for OpenAI's embeddings API.

```python
# OpenAI-compatible method
result = client.create_embedding(
    input="Your text here",
    model="e5_base",
    user="optional-user-id"
)

# OpenAI-compatible response format
print(result.object)           # "list"
print(result.data[0].object)   # "embedding"
print(result.data[0].embedding) # List[float]
print(result.data[0].index)    # int
print(result.model)            # str
print(result.usage.prompt_tokens)  # int
print(result.usage.total_tokens)   # int
```

## Advanced Usage Examples

### 1. Batch Processing with Progress Tracking

```python
import time
from typing import List

def process_large_dataset(texts: List[str], batch_size: int = 100):
    """Process large dataset in batches with progress tracking."""
    results = []
    total_batches = len(texts) // batch_size + (1 if len(texts) % batch_size else 0)
    
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        batch_num = i // batch_size + 1
        
        print(f"Processing batch {batch_num}/{total_batches}...")
        
        try:
            result = client.vectorize_batch(texts=batch, model="e5_base")
            results.extend(result.vectors)
            
            print(f"✅ Batch {batch_num} completed - {result.total_tokens} tokens used")
            
        except Exception as e:
            print(f"❌ Batch {batch_num} failed: {e}")
            # Add retry logic here if needed
        
        # Rate limiting - be respectful to the API
        time.sleep(0.1)
    
    return results

# Usage
large_text_list = ["text1", "text2", ...]  # Your large dataset
vectors = process_large_dataset(large_text_list)
```

### 2. Similarity Search Implementation

```python
import numpy as np
from typing import List, Tuple

class SimilaritySearch:
    def __init__(self, client: HashubVector):
        self.client = client
        self.documents = []
        self.vectors = []
    
    def add_documents(self, documents: List[str]):
        """Add documents to the search index."""
        print(f"Vectorizing {len(documents)} documents...")
        
        result = self.client.vectorize_batch(
            texts=documents,
            model="e5_base"
        )
        
        self.documents.extend(documents)
        self.vectors.extend(result.vectors)
        
        print(f"✅ Added {len(documents)} documents to index")
    
    def search(self, query: str, top_k: int = 5) -> List[Tuple[str, float]]:
        """Search for most similar documents."""
        # Get query vector
        query_result = self.client.vectorize(text=query, model="e5_base")
        query_vector = np.array(query_result.vector)
        
        # Calculate similarities
        similarities = []
        for i, doc_vector in enumerate(self.vectors):
            doc_vector_np = np.array(doc_vector)
            
            # Cosine similarity
            cosine_sim = np.dot(query_vector, doc_vector_np) / (
                np.linalg.norm(query_vector) * np.linalg.norm(doc_vector_np)
            )
            
            similarities.append((self.documents[i], float(cosine_sim)))
        
        # Sort by similarity and return top_k
        similarities.sort(key=lambda x: x[1], reverse=True)
        return similarities[:top_k]

# Usage
search_engine = SimilaritySearch(client)

documents = [
    "İstanbul Türkiye'nin en büyük şehridir.",
    "Ankara Türkiye'nin başkentidir.",
    "İzmir Ege Bölgesi'nde yer alır.",
    "Python programlama dili çok popülerdir.",
    "Makine öğrenmesi yapay zeka alanının bir dalıdır."
]

search_engine.add_documents(documents)

# Search
results = search_engine.search("Türkiye'nin şehirleri", top_k=3)
for doc, similarity in results:
    print(f"Similarity: {similarity:.3f} - {doc}")
```

### 3. Error Handling and Retry Logic

```python
import time
from hashub_vector import (
    HashubVector, 
    AuthenticationError, 
    RateLimitError, 
    QuotaExceededError,
    ValidationError
)

def robust_vectorize(client: HashubVector, text: str, max_retries: int = 3):
    """Vectorize with robust error handling."""
    for attempt in range(max_retries):
        try:
            return client.vectorize(text=text, model="e5_base")
            
        except AuthenticationError as e:
            print(f"❌ Authentication failed: {e}")
            return None  # Don't retry auth errors
            
        except RateLimitError as e:
            retry_after = getattr(e, 'retry_after', 60)
            print(f"⏳ Rate limited. Waiting {retry_after} seconds...")
            time.sleep(retry_after)
            
        except QuotaExceededError as e:
            print(f"❌ Quota exceeded: {e}")
            return None  # Don't retry quota errors
            
        except ValidationError as e:
            print(f"❌ Validation error: {e}")
            return None  # Don't retry validation errors
            
        except Exception as e:
            print(f"⚠️ Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # Exponential backoff
                print(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
    
    print("❌ All retry attempts failed")
    return None

# Usage
result = robust_vectorize(client, "Test text")
if result:
    print(f"✅ Successfully vectorized: {len(result.vector)} dimensions")
```

### 4. Usage Monitoring and Alerts

```python
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class UsageMonitor:
    def __init__(self, client: HashubVector, alert_threshold: float = 0.8):
        self.client = client
        self.alert_threshold = alert_threshold
        self.last_check = None
    
    def check_usage(self) -> dict:
        """Check current usage and log if needed."""
        usage = self.client.get_usage()
        usage_pct = usage.tokens_percentage_used / 100
        
        usage_info = {
            'timestamp': datetime.now().isoformat(),
            'tokens_used': usage.tokens_used,
            'tokens_limit': usage.tokens_limit,
            'usage_percentage': usage.tokens_percentage_used,
            'tokens_remaining': usage.tokens_remaining
        }
        
        # Log usage
        logger.info(f"Token usage: {usage.tokens_used}/{usage.tokens_limit} "
                   f"({usage.tokens_percentage_used:.1f}%)")
        
        # Alert if high usage
        if usage_pct > self.alert_threshold:
            logger.warning(f"🚨 HIGH USAGE ALERT: {usage.tokens_percentage_used:.1f}% "
                          f"of quota used ({usage.tokens_remaining} tokens remaining)")
        
        self.last_check = datetime.now()
        return usage_info
    
    def safe_vectorize(self, text: str, **kwargs):
        """Vectorize with usage checking."""
        # Check usage before operation
        self.check_usage()
        
        # Perform vectorization
        result = self.client.vectorize(text=text, **kwargs)
        
        # Check usage after operation
        self.check_usage()
        
        return result

# Usage
monitor = UsageMonitor(client, alert_threshold=0.9)
result = monitor.safe_vectorize("Test text", model="e5_base")
```

## Available Models

| Model | Dimensions | Max Tokens | Turkish Support | Best For |
|-------|------------|------------|-----------------|----------|
| `e5_base` | 768 | 512 | ⭐⭐⭐⭐⭐ | General purpose, balanced performance |
| `e5_large` | 1024 | 512 | ⭐⭐⭐⭐⭐ | High accuracy, detailed representations |
| `bge_base` | 768 | 512 | ⭐⭐⭐⭐ | Multilingual, good for diverse content |
| `bge_large` | 1024 | 512 | ⭐⭐⭐⭐ | Performance-focused applications |
| `gte_base` | 768 | 512 | ⭐⭐⭐ | General use, cost-effective |
| `gte_large` | 1024 | 512 | ⭐⭐⭐ | Large context handling |

## Error Handling

The SDK provides specific exception classes for different error types:

```python
from hashub_vector import (
    HashubVectorError,      # Base exception
    AuthenticationError,    # Invalid API key (401)
    RateLimitError,        # Rate limit exceeded (429)
    QuotaExceededError,    # Token quota exceeded (402)
    ValidationError,       # Invalid request (400)
    ServerError,          # Server errors (5xx)
    NetworkError          # Network/connection issues
)

try:
    result = client.vectorize("test")
except AuthenticationError:
    print("Invalid API key")
except RateLimitError as e:
    print(f"Rate limited. Retry after: {e.retry_after} seconds")
except QuotaExceededError:
    print("Token quota exceeded")
except ValidationError as e:
    print(f"Invalid request: {e}")
except ServerError:
    print("Server error occurred")
except NetworkError:
    print("Network connection failed")
```

## Best Practices

### 1. API Key Security

```python
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use environment variable
client = HashubVector(api_key=os.getenv('HASHUB_API_KEY'))

# Never hardcode API keys in your code!
# ❌ BAD: client = HashubVector(api_key="sk-123...")
# ✅ GOOD: Use environment variables or secure vaults
```

### 2. Batch Processing for Efficiency

```python
# ❌ Inefficient: Multiple single requests
vectors = []
for text in texts:
    result = client.vectorize(text)
    vectors.append(result.vector)

# ✅ Efficient: Single batch request
result = client.vectorize_batch(texts)
vectors = result.vectors
```

### 3. Model Selection

```python
# For Turkish text - use e5 models
turkish_text = "Türkçe metin için en iyi performans"
result = client.vectorize(turkish_text, model="e5_base")

# For multilingual content - use bge models
multilingual_text = "Mixed language content"
result = client.vectorize(multilingual_text, model="bge_base")

# For high accuracy needs - use large models
important_text = "Critical business content"
result = client.vectorize(important_text, model="e5_large")
```

### 4. Resource Management

```python
# Use context manager for automatic cleanup
from contextlib import contextmanager

@contextmanager
def hashub_client():
    client = HashubVector()
    try:
        yield client
    finally:
        # Cleanup if needed
        pass

# Usage
with hashub_client() as client:
    result = client.vectorize("text")
```

## Integration Examples

### With LangChain

```python
from langchain.embeddings.base import Embeddings
from hashub_vector import HashubVector
from typing import List

class HashubEmbeddings(Embeddings):
    def __init__(self, api_key: str = None, model: str = "e5_base"):
        self.client = HashubVector(api_key=api_key)
        self.model = model
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        result = self.client.vectorize_batch(texts=texts, model=self.model)
        return result.vectors
    
    def embed_query(self, text: str) -> List[float]:
        result = self.client.vectorize(text=text, model=self.model)
        return result.vector

# Usage with LangChain
embeddings = HashubEmbeddings()
doc_vectors = embeddings.embed_documents(["doc1", "doc2"])
query_vector = embeddings.embed_query("search query")
```

### With Pandas

```python
import pandas as pd

# Process DataFrame
df = pd.DataFrame({
    'text': ['text1', 'text2', 'text3'],
    'category': ['A', 'B', 'A']
})

# Vectorize texts
texts = df['text'].tolist()
result = client.vectorize_batch(texts=texts, model="e5_base")

# Add vectors to DataFrame
df['vector'] = result.vectors
df['tokens'] = [len(text.split()) for text in texts]  # Approximate

print(df.head())
```

## Troubleshooting

### Common Issues

1. **Import Error**
   ```bash
   pip install --upgrade hashub-vector
   ```

2. **Authentication Failed**
   ```python
   # Check API key
   import os
   print(os.getenv('HASHUB_API_KEY'))
   ```

3. **Rate Limiting**
   ```python
   # Add delays between requests
   import time
   time.sleep(1)  # Wait 1 second between requests
   ```

4. **Large Text Handling**
   ```python
   # Use chunking for large texts
   result = client.vectorize(
       text=long_text,
       chunk_size=512,
       chunk_overlap=50
   )
   ```

### Debug Mode

```python
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('hashub_vector')
logger.setLevel(logging.DEBUG)

# Now all API calls will be logged
client = HashubVector()
result = client.vectorize("debug text")
```

## Support and Resources

- **Documentation**: [https://docs.hashub.ai](https://docs.hashub.ai)
- **Python SDK GitHub**: [https://github.com/hashub-ai/hashub-vector-python](https://github.com/hashub-ai/hashub-vector-python)
- **PyPI Package**: [https://pypi.org/project/hashub-vector/](https://pypi.org/project/hashub-vector/)
- **Issues & Support**: [GitHub Issues](https://github.com/hashub-ai/hashub-vector-python/issues)
- **Email Support**: support@hashub.ai

## Changelog

### v1.0.0 (Latest)
- ✅ Initial release with full API support
- ✅ Comprehensive error handling
- ✅ OpenAI compatibility layer
- ✅ Batch processing capabilities
- ✅ Usage tracking and monitoring
- ✅ Complete type hints
- ✅ Extensive documentation and examples

---

**Made with ❤️ by the Hashub team**
