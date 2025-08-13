# OpenAI API Compatibility

HashHub Vector API provides full compatibility with OpenAI's embeddings API, making it a drop-in replacement for OpenAI's text-embedding models.

## 🔄 Drop-in Replacement

Simply change your base URL and API key to start using HashHub's more affordable and multilingual embedding models.

### Quick Migration

**Before (OpenAI):**
```python
import openai

openai.api_key = "sk-openai-key..."
openai.api_base = "https://api.openai.com/v1"

response = openai.Embedding.create(
    model="text-embedding-ada-002",
    input="Your text here"
)
```

**After (HashHub):**
```python
import openai

openai.api_key = "sk-hashhub-key..."
openai.api_base = "https://vector.hashhub.dev/v1"

response = openai.Embedding.create(
    model="gte_base",  # or any HashHub model
    input="Your text here"
)
```

## 📍 Compatible Endpoints

### Create Embeddings
**POST** `/v1/embeddings`

Full compatibility with OpenAI's embeddings endpoint with additional HashHub-specific features.

#### Request Format

```json
{
  "model": "gte_base",
  "input": "Your text to embed",
  "encoding_format": "float",
  "dimensions": 768,
  "user": "user_identifier"
}
```

#### Supported Input Types

**Single String:**
```json
{
  "model": "e5_base",
  "input": "Single text to embed"
}
```

**Array of Strings:**
```json
{
  "model": "nomic_base", 
  "input": [
    "First text to embed",
    "Second text to embed",
    "Third text to embed"
  ]
}
```

**Array of Token Arrays (Advanced):**
```json
{
  "model": "gte_base",
  "input": [[1234, 5678, 9012], [3456, 7890, 1234]]
}
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `model` | string | ✅ | - | HashHub model alias (see [Models](./models.md)) |
| `input` | string/array | ✅ | - | Text(s) to embed (max 8192 tokens per text) |
| `encoding_format` | string | ❌ | `float` | Format of embeddings (`float` or `base64`) |
| `dimensions` | integer | ❌ | model default | Number of dimensions (model-specific) |
| `user` | string | ❌ | - | End-user identifier for monitoring |

#### Response Format

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.123, -0.456, 0.789, ...]
    }
  ],
  "model": "gte_base",
  "usage": {
    "prompt_tokens": 127,
    "total_tokens": 127
  }
}
```

## 🔧 Client Library Examples

### OpenAI Python Library

```python
import openai
from openai import OpenAI

# Initialize client
client = OpenAI(
    api_key="sk-hashhub-key...",
    base_url="https://vector.hashhub.dev/v1"
)

# Single text embedding
response = client.embeddings.create(
    model="gte_base",
    input="Artificial intelligence is transforming industries worldwide."
)

embedding = response.data[0].embedding
print(f"Embedding dimension: {len(embedding)}")
print(f"Tokens used: {response.usage.total_tokens}")

# Batch embedding
texts = [
    "Customer service inquiry",
    "Technical support request", 
    "Product feature question",
    "Billing and payment issue"
]

batch_response = client.embeddings.create(
    model="e5_base",
    input=texts
)

for i, data in enumerate(batch_response.data):
    print(f"Text {i+1}: {len(data.embedding)} dimensions")

print(f"Total tokens: {batch_response.usage.total_tokens}")
```

### Node.js/TypeScript

```typescript
import OpenAI from 'openai';

// Initialize client
const openai = new OpenAI({
  apiKey: 'sk-hashhub-key...',
  baseURL: 'https://vector.hashhub.dev/v1'
});

// Single embedding
async function createEmbedding() {
  const response = await openai.embeddings.create({
    model: 'gte_base',
    input: 'Your text to embed here'
  });
  
  const embedding = response.data[0].embedding;
  console.log(`Embedding dimension: ${embedding.length}`);
  console.log(`Tokens used: ${response.usage.total_tokens}`);
  
  return embedding;
}

// Batch embeddings
async function createBatchEmbeddings() {
  const texts = [
    "First document content",
    "Second document content",
    "Third document content"
  ];
  
  const response = await openai.embeddings.create({
    model: 'e5_base',
    input: texts
  });
  
  const embeddings = response.data.map(item => item.embedding);
  console.log(`Created ${embeddings.length} embeddings`);
  console.log(`Total tokens: ${response.usage.total_tokens}`);
  
  return embeddings;
}

// Usage
const embedding = await createEmbedding();
const batchEmbeddings = await createBatchEmbeddings();
```

### cURL

```bash
# Single text embedding
curl -X POST "https://vector.hashhub.dev/v1/embeddings" \
  -H "Authorization: Bearer sk-hashhub-key..." \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gte_base",
    "input": "Your text to embed"
  }'

# Batch embedding
curl -X POST "https://vector.hashhub.dev/v1/embeddings" \
  -H "Authorization: Bearer sk-hashhub-key..." \
  -H "Content-Type: application/json" \
  -d '{
    "model": "e5_base",
    "input": [
      "First text",
      "Second text", 
      "Third text"
    ]
  }'

# With additional parameters
curl -X POST "https://vector.hashhub.dev/v1/embeddings" \
  -H "Authorization: Bearer sk-hashhub-key..." \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nomic_base",
    "input": "Text to embed",
    "encoding_format": "float",
    "user": "user123"
  }'
```

## 🔄 Model Mapping

HashHub models can be used directly, or you can map OpenAI models to HashHub equivalents:

### Direct Model Usage
```python
# Use HashHub models directly
models = ["gte_base", "nomic_base", "e5_base", "mpnet_base", "e5_small", "minilm_base"]

for model in models:
    response = client.embeddings.create(
        model=model,
        input="Test text"
    )
    print(f"{model}: {len(response.data[0].embedding)} dimensions")
```

### OpenAI Model Mapping
```python
# Map OpenAI models to HashHub equivalents
model_mapping = {
    "text-embedding-ada-002": "gte_base",      # Best quality replacement
    "text-embedding-3-small": "e5_base",       # Fast and efficient
    "text-embedding-3-large": "nomic_base",    # Balanced performance
}

def get_embedding_openai_compatible(text, model="text-embedding-ada-002"):
    hashhub_model = model_mapping.get(model, "gte_base")
    
    response = client.embeddings.create(
        model=hashhub_model,
        input=text
    )
    
    return response.data[0].embedding

# Usage - same interface as OpenAI
embedding = get_embedding_openai_compatible("Your text", "text-embedding-ada-002")
```

## 🚀 Advanced Features

### Chunking Support (HashHub Extension)

HashHub extends the OpenAI API with automatic chunking for long texts:

```python
# Standard OpenAI API call
response = client.embeddings.create(
    model="gte_base",
    input="Very long document that exceeds token limits...",
    # HashHub-specific parameters
    chunk_size=1024,
    chunk_overlap=0.15,
    chunking_method="sentence_aware"
)

# Returns averaged embedding across chunks
embedding = response.data[0].embedding
chunks_info = response.chunks_processed  # HashHub extension
```

### Base64 Encoding Support

```python
# Request base64 encoded embeddings
response = client.embeddings.create(
    model="e5_base",
    input="Your text here",
    encoding_format="base64"
)

# Decode the base64 embedding
import base64
import numpy as np

encoded_embedding = response.data[0].embedding
decoded_bytes = base64.b64decode(encoded_embedding)
embedding = np.frombuffer(decoded_bytes, dtype=np.float32)
```

### Dimension Specification

```python
# Request specific dimensions (if supported by model)
response = client.embeddings.create(
    model="gte_base",
    input="Your text here",
    dimensions=384  # Reduce from default 768
)

# Note: Not all models support dimension reduction
```

## 🔧 Integration Examples

### Existing OpenAI Code Migration

**Before:**
```python
import openai

def get_embeddings(texts):
    response = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=texts
    )
    return [data['embedding'] for data in response['data']]

embeddings = get_embeddings(["text1", "text2", "text3"])
```

**After (minimal changes):**
```python
import openai
from openai import OpenAI

# Just change the client configuration
client = OpenAI(
    api_key="sk-hashhub-key...",
    base_url="https://vector.hashhub.dev/v1"
)

def get_embeddings(texts):
    response = client.embeddings.create(
        model="gte_base",  # Change to HashHub model
        input=texts
    )
    return [data.embedding for data in response.data]

embeddings = get_embeddings(["text1", "text2", "text3"])
```

### LangChain Integration

```python
from langchain.embeddings import OpenAIEmbeddings

# Configure for HashHub
embeddings = OpenAIEmbeddings(
    openai_api_key="sk-hashhub-key...",
    openai_api_base="https://vector.hashhub.dev/v1",
    model="gte_base"
)

# Use as normal
docs = ["Document 1", "Document 2", "Document 3"]
vectors = embeddings.embed_documents(docs)

query = "Search query"
query_vector = embeddings.embed_query(query)
```

### Vector Database Integration

```python
import pinecone
from openai import OpenAI

# Initialize HashHub client
client = OpenAI(
    api_key="sk-hashhub-key...",
    base_url="https://vector.hashhub.dev/v1"
)

# Initialize Pinecone
pinecone.init(api_key="your-pinecone-key")
index = pinecone.Index("your-index-name")

def embed_and_store(texts, metadata_list):
    # Get embeddings from HashHub
    response = client.embeddings.create(
        model="gte_base",
        input=texts
    )
    
    # Prepare for Pinecone
    vectors = []
    for i, data in enumerate(response.data):
        vectors.append({
            "id": f"doc_{i}",
            "values": data.embedding,
            "metadata": metadata_list[i]
        })
    
    # Store in Pinecone
    index.upsert(vectors)
    
    return len(vectors)

# Usage
texts = ["Document content 1", "Document content 2"]
metadata = [{"source": "doc1.txt"}, {"source": "doc2.txt"}]
stored_count = embed_and_store(texts, metadata)
```

## 🔍 Error Handling

HashHub returns OpenAI-compatible error responses:

```python
from openai import OpenAI
import openai

client = OpenAI(
    api_key="sk-hashhub-key...",
    base_url="https://vector.hashhub.dev/v1"
)

try:
    response = client.embeddings.create(
        model="invalid_model",
        input="Test text"
    )
except openai.BadRequestError as e:
    print(f"Bad request: {e}")
except openai.AuthenticationError as e:
    print(f"Authentication failed: {e}")
except openai.RateLimitError as e:
    print(f"Rate limit exceeded: {e}")
except openai.APIError as e:
    print(f"API error: {e}")
```

## 📊 Response Comparison

### OpenAI Response Format
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.123, -0.456, ...]
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

### HashHub Response Format (Compatible + Extensions)
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.123, -0.456, ...]
    }
  ],
  "model": "gte_base",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  },
  // HashHub extensions (optional)
  "chunks_processed": 1,
  "chunking_method": "simple",
  "processing_time_ms": 127
}
```

## 💰 Cost Comparison

| Provider | Model | Price/1M tokens | Performance |
|----------|-------|----------------|-------------|
| OpenAI | text-embedding-ada-002 | $0.100 | Good |
| **HashHub** | gte_base | **$0.010** | Superior |
| **HashHub** | e5_base | **$0.003** | Comparable |
| **HashHub** | e5_small | **$0.002** | Fast |

**Save up to 97% on embedding costs while getting better multilingual performance!**

## 🎯 Migration Checklist

- [ ] Replace `base_url` with HashHub endpoint
- [ ] Update API key to HashHub key  
- [ ] Choose appropriate HashHub model
- [ ] Test with small batch first
- [ ] Update error handling if needed
- [ ] Monitor usage and costs
- [ ] Optimize model selection for use case

## 📞 Support

Need help migrating from OpenAI? Our team provides:
- **Free migration consultation**
- **Code review and optimization**
- **Performance testing assistance**
- **Custom integration support**

Contact us at [support@hashhub.dev](mailto:support@hashhub.dev) for personalized migration assistance.

---

**Ready to migrate?** Start with our [Quick Start Guide](./README.md) or try the API directly at [vector.hashhub.dev](https://vector.hashhub.dev)!
