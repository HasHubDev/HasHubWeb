# Vector Embeddings

Understanding text embeddings and how HashHub's Vector API transforms text into high-dimensional vectors for AI applications.

## What are Vector Embeddings?

Vector embeddings are numerical representations of text that capture semantic meaning in a multi-dimensional space. Each word, sentence, or document is converted into a vector (array of numbers) where similar meanings result in similar vectors.

### Key Concepts

**Semantic Similarity**: Texts with similar meanings have vectors that are close to each other in the vector space.

**Dimensionality**: Our models produce vectors with 384 or 768 dimensions, each representing different semantic features.

**Distance Metrics**: We use cosine similarity to measure how similar two vectors are (closer to 1 = more similar).

## HashHub Vector Models

### Available Models

| Model | Dimensions | Max Tokens | Best For |
|-------|------------|------------|----------|
| `hashub-multilingual-v1` | 768 | 8,192 | Long documents, high precision |
| `hashub-general-v1` | 768 | 2,048 | General purpose applications |
| `hashub-fast-v1` | 384 | 512 | Real-time applications |

### Model Selection Guide

#### hashub-multilingual-v1
- **Best for**: Multilingual applications, long documents
- **Languages**: 100+ languages with optimized performance
- **Use cases**: Document search, cross-language similarity
- **Performance**: Highest accuracy, slightly slower

#### hashub-general-v1
- **Best for**: General purpose English applications
- **Languages**: Optimized for English, supports others
- **Use cases**: Chatbots, recommendation systems
- **Performance**: Balanced speed and accuracy

#### hashub-fast-v1
- **Best for**: Real-time applications requiring low latency
- **Languages**: English and major European languages
- **Use cases**: Search autocomplete, real-time matching
- **Performance**: Fastest processing, good accuracy

## Text Chunking

For texts longer than the model's maximum token limit, HashHub automatically chunks the text and provides averaged embeddings.

### Chunking Strategy

```json
{
  "model": "hashub-multilingual-v1",
  "input": ["Very long document text..."],
  "chunk_size": 512,
  "chunk_overlap": 50,
  "chunk_strategy": "average"
}
```

### Chunking Options

- **chunk_size**: Maximum tokens per chunk (default: model max - 50)
- **chunk_overlap**: Overlapping tokens between chunks (default: 10% of chunk_size)
- **chunk_strategy**: How to combine chunk embeddings
  - `average`: Average all chunk vectors (default)
  - `first`: Use only the first chunk
  - `last`: Use only the last chunk
  - `max_pool`: Element-wise maximum across chunks

## API Usage

### Basic Embedding

```bash
curl -X POST "https://api.hashub.ai/v1/vector/embed" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "hashub-multilingual-v1",
    "input": ["Hello world", "Machine learning is fascinating"]
  }'
```

### Response Format

```json
{
  "data": [
    {
      "object": "embedding",
      "embedding": [0.123, -0.456, 0.789, ...],
      "index": 0
    },
    {
      "object": "embedding", 
      "embedding": [0.234, -0.567, 0.890, ...],
      "index": 1
    }
  ],
  "model": "hashub-multilingual-v1",
  "usage": {
    "prompt_tokens": 12,
    "total_tokens": 12
  }
}
```

## Similarity Search

Use embeddings to find similar content by comparing vector distances.

### Computing Similarity

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Get embeddings for query and documents
query_vector = embed_text("machine learning")
doc_vectors = embed_texts([
    "AI and machine learning applications",
    "Cooking recipes and food",
    "Deep learning neural networks"
])

# Calculate similarities
similarities = cosine_similarity([query_vector], doc_vectors)[0]

# Results: [0.85, 0.12, 0.78] - first and third docs are most similar
```

### Search API

```bash
curl -X POST "https://api.hashub.ai/v1/vector/search" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning algorithms",
    "documents": [
      "AI and machine learning applications",
      "Cooking recipes and food", 
      "Deep learning neural networks"
    ],
    "top_k": 2
  }'
```

## Use Cases

### 1. Document Search

Build semantic search that understands intent, not just keywords.

```python
# Traditional keyword search misses this
query = "car insurance"
document = "automobile coverage and protection plans"
# No keyword match, but semantically identical

# Vector search finds the connection
similarity = cosine_similarity(
    embed_text(query), 
    embed_text(document)
)  # Returns high similarity score
```

### 2. Content Recommendation

Recommend similar articles, products, or content based on semantic similarity.

```python
user_interests = embed_text("sustainable energy solutions")
article_embeddings = embed_texts(all_articles)

# Find most similar articles
recommendations = find_most_similar(user_interests, article_embeddings)
```

### 3. Duplicate Detection

Identify duplicate or near-duplicate content even with different wording.

```python
docs = [
    "The quick brown fox jumps over the lazy dog",
    "A fast brown fox leaps above a sleepy canine", 
    "Completely different content about cars"
]

embeddings = embed_texts(docs)
# First two will have high similarity despite different words
```

### 4. Multilingual Applications

Compare content across different languages.

```python
english_text = "Hello world"
spanish_text = "Hola mundo"
french_text = "Bonjour le monde"

# All will have high similarity scores
similarities = compare_multilingual_texts([
    english_text, spanish_text, french_text
])
```

## Best Practices

### 1. Choose the Right Model

- **Long documents**: Use `hashub-multilingual-v1`
- **Real-time apps**: Use `hashub-fast-v1`
- **General purpose**: Use `hashub-general-v1`

### 2. Optimize Text Preprocessing

```python
def preprocess_text(text):
    # Remove excessive whitespace
    text = " ".join(text.split())
    
    # Keep punctuation for semantic meaning
    # Don't over-normalize text
    
    return text.strip()
```

### 3. Batch Processing

Process multiple texts together for better performance:

```python
# Good: Batch processing
embeddings = client.embed(texts=text_list, model="hashub-multilingual-v1")

# Avoid: Individual requests
# for text in text_list:
#     embedding = client.embed(texts=[text], model="hashub-multilingual-v1")
```

### 4. Caching Strategies

Cache embeddings for frequently accessed content:

```python
import redis

cache = redis.Redis()

def get_cached_embedding(text, model):
    cache_key = f"embedding:{model}:{hash(text)}"
    cached = cache.get(cache_key)
    
    if cached:
        return json.loads(cached)
    
    # Generate new embedding
    embedding = client.embed(texts=[text], model=model)
    cache.setex(cache_key, 3600, json.dumps(embedding))  # 1 hour cache
    
    return embedding
```

## Performance Optimization

### 1. Token Management

Monitor token usage to optimize costs:

```python
# Check token count before embedding
token_count = count_tokens(text, model="hashub-multilingual-v1")

if token_count > 8000:
    # Chunk the text or use summarization
    text = chunk_text(text, max_tokens=8000)
```

### 2. Dimension Reduction

For storage-sensitive applications, consider dimensionality reduction:

```python
from sklearn.decomposition import PCA

# Reduce 768-dim vectors to 256-dim
pca = PCA(n_components=256)
reduced_embeddings = pca.fit_transform(embeddings)
```

### 3. Approximate Search

For large-scale applications, use approximate nearest neighbor search:

```python
import faiss

# Build FAISS index for fast similarity search
index = faiss.IndexFlatIP(768)  # Inner product for cosine similarity
index.add(embedding_matrix)

# Fast similarity search
similarities, indices = index.search(query_vector, k=10)
```

## Pricing and Limits

### Token Pricing

- **hashub-multilingual-v1**: $0.0001 per 1K tokens
- **hashub-general-v1**: $0.00008 per 1K tokens  
- **hashub-fast-v1**: $0.00006 per 1K tokens

### Rate Limits

- **Free Tier**: 1,000 tokens/minute
- **Starter**: 10,000 tokens/minute
- **Professional**: 100,000 tokens/minute
- **Enterprise**: Custom limits

### Batch Limits

- **Free**: 100 texts per request
- **Starter**: 1,000 texts per request
- **Professional**: 10,000 texts per request
- **Enterprise**: Custom limits
