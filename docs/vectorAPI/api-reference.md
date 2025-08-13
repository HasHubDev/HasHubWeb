# API Reference

Complete reference for all HashHub Vector API endpoints.

**Base URL:** `https://vector.hashhub.dev`

## 🔐 Authentication

All endpoints require API key authentication:

```bash
Authorization: Bearer your_api_key_here
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "detail": "Error description",
  "type": "error_type",
  "code": "ERROR_CODE"
}
```

Common HTTP status codes:
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing/invalid API key)
- `402` - Payment Required (insufficient balance)
- `403` - Forbidden (model not allowed for your tier)
- `422` - Validation Error (invalid request format)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## 📍 Endpoints

### 1. Single Text Vectorization

Convert a single text to vector with automatic chunking and averaging.

**POST** `/vectorize`

#### Request Body

```json
{
  "text": "Your text to vectorize",
  "model": "gte_base",
  "chunk_size": 512,
  "chunk_overlap": 0.1
}
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | ✅ | - | Text to vectorize (max 1M characters) |
| `model` | string | ❌ | `gte_base` | Model alias (see [Models](./models.md)) |
| `chunk_size` | integer | ❌ | 512 | Maximum tokens per chunk |
| `chunk_overlap` | float | ❌ | 0.1 | Overlap ratio between chunks (0.0-0.8) |

#### Response

```json
{
  "vector": [0.1234, -0.5678, 0.9012, ...],
  "dimension": 768,
  "chunks_processed": 3,
  "chunking_method": "sentence_aware",
  "usage": {
    "prompt_tokens": 127,
    "total_tokens": 127
  }
}
```

#### cURL Example

```bash
curl -X POST "https://vector.hashhub.dev/vectorize" \
  -H "Authorization: Bearer sk-abcd1234..." \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Artificial intelligence is transforming how we work and live. Machine learning algorithms can now understand natural language, recognize images, and make complex decisions. This technology revolution is creating new opportunities while also presenting unique challenges for society.",
    "model": "gte_base",
    "chunk_size": 256
  }'
```

#### Python Example

```python
import httpx
import asyncio

async def vectorize_single():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://vector.hashhub.dev/vectorize",
            headers={"Authorization": "Bearer sk-abcd1234..."},
            json={
                "text": "Artificial intelligence is transforming...",
                "model": "gte_base",
                "chunk_size": 256
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Success!")
            print(f"Dimension: {result['dimension']}")
            print(f"Chunks processed: {result['chunks_processed']}")
            print(f"Tokens used: {result['usage']['total_tokens']}")
            return result['vector']
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.json())

vector = await vectorize_single()
```

#### TypeScript Example

```typescript
interface VectorizeRequest {
  text: string;
  model?: string;
  chunk_size?: number;
  chunk_overlap?: number;
}

interface VectorizeResponse {
  vector: number[];
  dimension: number;
  chunks_processed: number;
  chunking_method: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

class VectorAPI {
  constructor(private apiKey: string) {}

  async vectorize(request: VectorizeRequest): Promise<VectorizeResponse> {
    const response = await fetch("https://vector.hashhub.dev/vectorize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error (${response.status}): ${error.detail}`);
    }

    return response.json();
  }
}

// Usage
const api = new VectorAPI("sk-abcd1234...");
const result = await api.vectorize({
  text: "Artificial intelligence is transforming...",
  model: "gte_base"
});

console.log(`Vector dimension: ${result.dimension}`);
console.log(`Tokens used: ${result.usage.total_tokens}`);
```

---

### 2. Chunked Text Vectorization

Convert text to vectors preserving individual chunks (no averaging).

**POST** `/vectorize/chunked`

#### Request Body

Same as `/vectorize` endpoint.

#### Response

```json
{
  "vectors": [
    [0.1234, -0.5678, ...],
    [0.2345, -0.6789, ...],
    [0.3456, -0.7890, ...]
  ],
  "chunks": [
    "First chunk of text...",
    "Second chunk of text...",
    "Third chunk of text..."
  ],
  "dimension": 768,
  "chunks_count": 3,
  "chunking_method": "sentence_aware",
  "usage": {
    "prompt_tokens": 127,
    "total_tokens": 127
  }
}
```

#### Python Example

```python
async def vectorize_chunked():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://vector.hashhub.dev/vectorize/chunked",
            headers={"Authorization": "Bearer sk-abcd1234..."},
            json={
                "text": "Long document with multiple paragraphs...",
                "model": "gte_base",
                "chunk_size": 256,
                "chunk_overlap": 0.2
            }
        )
        
        result = response.json()
        
        # Process each chunk separately
        for i, (chunk_text, vector) in enumerate(zip(result['chunks'], result['vectors'])):
            print(f"Chunk {i+1}: {chunk_text[:50]}...")
            print(f"Vector preview: {vector[:5]}...")
            
        return result

chunks_result = await vectorize_chunked()
```

---

### 3. Batch Text Vectorization

Process multiple texts efficiently in a single request.

**POST** `/vectorize/batch`

#### Request Body

```json
{
  "texts": [
    "First text to vectorize",
    "Second text to vectorize",
    "Third text to vectorize"
  ],
  "model": "gte_base",
  "chunk_size": 512,
  "chunk_overlap": 0.1
}
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `texts` | string[] | ✅ | - | Array of texts to vectorize |
| `model` | string | ❌ | `gte_base` | Model alias |
| `chunk_size` | integer | ❌ | 512 | Maximum tokens per chunk |
| `chunk_overlap` | float | ❌ | 0.1 | Overlap ratio between chunks |

#### Batch Size Limits

| Tier | Max Batch Size |
|------|----------------|
| Free | 5 texts |
| Starter | 50 texts |
| Pro | 500 texts |
| Enterprise | 1,000 texts |

#### Response

```json
{
  "vectors": [
    [0.1234, -0.5678, ...],
    [0.2345, -0.6789, ...],
    [0.3456, -0.7890, ...]
  ],
  "dimension": 768,
  "total_chunks_processed": 8,
  "chunking_method": "sentence_aware",
  "usage": {
    "prompt_tokens": 384,
    "total_tokens": 384
  }
}
```

#### Python Example

```python
async def vectorize_batch():
    texts = [
        "Customer feedback: The product quality is excellent.",
        "Support ticket: Installation failed on Windows 10.", 
        "Review: Fast shipping and great customer service.",
        "Query: How to integrate with existing systems?",
        "Comment: Documentation needs more examples."
    ]
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://vector.hashhub.dev/vectorize/batch",
            headers={"Authorization": "Bearer sk-abcd1234..."},
            json={
                "texts": texts,
                "model": "e5_base",
                "chunk_size": 256
            }
        )
        
        result = response.json()
        
        # Process results
        for i, (text, vector) in enumerate(zip(texts, result['vectors'])):
            print(f"Text {i+1}: {text[:30]}...")
            print(f"Vector dimension: {len(vector)}")
            
        print(f"Total tokens used: {result['usage']['total_tokens']}")
        return result

batch_result = await vectorize_batch()
```

---

### 4. Supported Models

Get list of all available models and their specifications.

**GET** `/models`

#### Response

```json
{
  "models": {
    "gte_base": {
      "name": "Alibaba-NLP/gte-multilingual-base",
      "dimension": 768,
      "max_tokens": 8192,
      "description": "High-context multilingual model from Alibaba",
      "tier": "premium",
      "price_per_1M_tokens": 0.01
    },
    "e5_small": {
      "name": "intfloat/multilingual-e5-small", 
      "dimension": 384,
      "max_tokens": 512,
      "description": "Compact multilingual model optimized for speed",
      "tier": "budget",
      "price_per_1M_tokens": 0.002
    }
    // ... other models
  },
  "default_model": "gte_base"
}
```

#### cURL Example

```bash
curl -X GET "https://vector.hashhub.dev/models" \
  -H "Authorization: Bearer sk-abcd1234..."
```

---

### 5. Health Check

Get API health status and system information.

**GET** `/health`

⚠️ **Admin authentication required**

#### Response

```json
{
  "status": "healthy",
  "uptime_seconds": 86400,
  "system": {
    "cpu_percent": 25.4,
    "memory_percent": 67.8,
    "disk_percent": 42.1
  },
  "models_loaded": 3,
  "last_model_load": "2024-01-15T10:30:00Z"
}
```

---

### 6. Performance Metrics

Get detailed performance metrics.

**GET** `/metrics`

⚠️ **Admin authentication required**

#### Response

```json
{
  "requests": {
    "total": 15847,
    "last_24h": 1203,
    "average_response_time_ms": 145
  },
  "models": {
    "gte_base": {"requests": 8932, "avg_latency_ms": 158},
    "e5_small": {"requests": 4521, "avg_latency_ms": 67}
  },
  "system": {
    "cpu_cores": 8,
    "memory_total_gb": 32,
    "memory_available_gb": 10.2
  }
}
```

---

## 🚨 Rate Limiting

Rate limits are enforced per API key based on your subscription tier:

| Tier | Requests/Hour | Requests/Minute |
|------|---------------|-----------------|
| Free | 100 | 10 |
| Starter | 1,000 | 50 |
| Pro | 10,000 | 500 |
| Enterprise | Unlimited | Unlimited |

When rate limit is exceeded, you'll receive a `429` status code with retry information:

```json
{
  "detail": "Rate limit exceeded",
  "retry_after": 3600,
  "limit": 100,
  "reset_time": "2024-01-15T11:00:00Z"
}
```

## 💰 Usage Tracking

Every response includes usage information:

```json
{
  "usage": {
    "prompt_tokens": 127,
    "total_tokens": 127
  }
}
```

Tokens are calculated using the actual model tokenizer for precise billing. See our [Pricing Guide](./pricing.md) for detailed cost information.

## 🔍 Best Practices

### 1. Model Selection
- Use `e5_small` for fast, lightweight applications
- Use `gte_base` for high-quality, long document processing
- Use `nomic_base` for general-purpose applications

### 2. Chunking Strategy
- Keep `chunk_size` below model's max_tokens
- Use 10-20% overlap for better context preservation
- Consider sentence-aware chunking for better semantic coherence

### 3. Batch Processing
- Batch similar texts together for better efficiency
- Use appropriate batch sizes for your tier
- Monitor token usage to optimize costs

### 4. Error Handling
- Always check response status codes
- Implement exponential backoff for rate limiting
- Handle insufficient balance gracefully

### 5. Performance Optimization
- Cache vectors when possible
- Use async requests for concurrent processing
- Monitor response times and adjust timeouts

---

Need help? Check our [integration guides](./langchain-integration.md) or contact [support@hashhub.dev](mailto:support@hashhub.dev).
