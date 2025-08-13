# HashHub Vector API Documentation

Welcome to the comprehensive documentation for HashHub Vector API - a professional text vectorization service with multiple model support, authentication, and billing.

**Base URL:** `https://vector.hashhub.dev`

## 📚 Quick Links

- [API Reference](./api-reference.md) - Complete API endpoints documentation
- [Model Comparison](./models.md) - Detailed model specifications and comparison
- [Pricing](./pricing.md) - Pricing information and cost calculator
- [OpenAI Compatibility](./openai-compatibility.md) - OpenAI API compatible endpoints
- [LangChain Integration](./langchain-integration.md) - Using with LangChain framework
- [LlamaIndex Integration](./llamaindex-integration.md) - Using with LlamaIndex framework

## 🚀 Getting Started

### 1. Authentication

All API requests require an API key in the Authorization header:

```bash
Authorization: Bearer your_api_key_here
```

### 2. Basic Request Example

**cURL:**
```bash
curl -X POST "https://vector.hashhub.dev/vectorize" \
  -H "Authorization: Bearer your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world! This is a sample text for vectorization.",
    "model": "gte_base"
  }'
```

**Python:**
```python
import httpx
import asyncio

async def vectorize_text():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://vector.hashhub.dev/vectorize",
            headers={"Authorization": "Bearer your_api_key"},
            json={
                "text": "Hello, world! This is a sample text for vectorization.",
                "model": "gte_base"
            }
        )
        return response.json()

result = asyncio.run(vectorize_text())
print(f"Vector dimension: {result['dimension']}")
print(f"Tokens used: {result['usage']['total_tokens']}")
```

**TypeScript:**
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

async function vectorizeText(text: string, model = "gte_base"): Promise<VectorizeResponse> {
  const response = await fetch("https://vector.hashhub.dev/vectorize", {
    method: "POST",
    headers: {
      "Authorization": "Bearer your_api_key",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, model })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Usage
const result = await vectorizeText("Hello, world!");
console.log(`Vector dimension: ${result.dimension}`);
console.log(`Tokens used: ${result.usage.total_tokens}`);
```

## 🔧 Core Features

### ✅ Multiple Embedding Models
- **6 high-quality models** optimized for different use cases
- Model aliases for easy reference (`gte_base`, `e5_small`, etc.)
- Automatic model selection based on your subscription tier

### ✅ Intelligent Text Chunking
- Automatic chunking for long texts
- Configurable chunk size and overlap
- Smart averaging or individual chunk vectors

### ✅ Batch Processing
- Process multiple texts in a single request
- Tier-based batch size limits
- Efficient parallel processing

### ✅ Usage Tracking & Billing
- Real tokenizer-based token counting
- Transparent pricing per model
- Detailed usage statistics
- Automatic balance management

### ✅ Enterprise Features
- Rate limiting by subscription tier
- Comprehensive logging and monitoring
- OpenAI API compatibility
- LangChain and LlamaIndex integration

## 📊 Subscription Tiers

| Tier | Batch Size | Models Available | Rate Limit |
|------|------------|------------------|------------|
| **Free** | 5 texts | e5_small | 100/hour |
| **Starter** | 50 texts | e5_small, mpnet_base | 1,000/hour |
| **Pro** | 500 texts | All models | 10,000/hour |
| **Enterprise** | 1,000 texts | All models | Unlimited |

## 🌍 Supported Languages

All models support multilingual text processing with optimized performance for:
- English, Spanish, French, German, Italian
- Portuguese, Russian, Chinese, Japanese, Korean
- Arabic, Hindi, Turkish, Dutch, Polish
- And 100+ other languages

## 📈 Performance Specifications

| Model | Dimension | Max Tokens | Latency* | Best For |
|-------|-----------|------------|----------|----------|
| `gte_base` | 768 | 8,192 | ~150ms | Long documents, high precision |
| `nomic_base` | 768 | 2,048 | ~120ms | General purpose, balanced performance |
| `e5_base` | 768 | 512 | ~80ms | Search, classification |
| `mpnet_base` | 768 | 512 | ~90ms | QA systems, semantic similarity |
| `e5_small` | 384 | 512 | ~60ms | Fast applications, low latency |
| `minilm_base` | 384 | 512 | ~50ms | High-volume processing |

*Latency measured for 100-token input on standard tier

## 🔒 Security & Compliance

- **HTTPS-only** communication
- **API key authentication** with automatic rotation
- **Request rate limiting** and abuse prevention
- **Data privacy** - no text storage after processing
- **SOC 2 compliant** infrastructure
- **GDPR compliant** data handling

## 📞 Support

- 📧 **Email:** support@hashhub.dev
- 💬 **Discord:** [HashHub Community](https://discord.gg/hashhub)
- 📖 **Documentation:** [vector.hashhub.dev/docs](https://vector.hashhub.dev/docs)
- 🐛 **Issues:** [GitHub Issues](https://github.com/hashhub/vector-api/issues)

## 🚦 Status Page

Monitor API status and uptime: [status.hashhub.dev](https://status.hashhub.dev)

---

**Ready to get started?** Check out our [API Reference](./api-reference.md) for detailed endpoint documentation!
