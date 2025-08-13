# Hashub Vector API Documentation

Welcome to the Hashub Vector API documentation. This powerful text vectorization service provides state-of-the-art embedding models with excellent Turkish language support and comprehensive SDK support.

**🌐 Base URL:** `https://api.hashub.ai`

## Official SDKs

We provide official SDKs for easy integration with your applications:

### 🐍 Python SDK
[![PyPI version](https://badge.fury.io/py/hashub-vector.svg)](https://pypi.org/project/hashub-vector/)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)

```bash
pip install hashub-vector
```

```python
from hashub_vector import HashubVector

client = HashubVector(api_key="your-api-key")
result = client.vectorize(text="Merhaba dünya!", model="e5_base")
print(f"Generated {result.dimension}D vector with {result.tokens} tokens")
```

📖 **[Complete Python SDK Documentation](python-sdk.md)**

### 🟨 TypeScript/JavaScript SDK
[![npm version](https://badge.fury.io/js/hashub-vector.svg)](https://www.npmjs.com/package/hashub-vector)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Node.js 16+](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

```bash
npm install hashub-vector
```

```typescript
import { HashubVector } from 'hashub-vector';

const client = new HashubVector({ apiKey: 'your-api-key' });
const result = await client.vectorize({ text: 'Hello world!', model: 'e5_base' });
console.log(`Generated ${result.dimension}D vector with ${result.tokens} tokens`);
```

📖 **[Complete TypeScript/JavaScript SDK Documentation](typescript-sdk.md)**

## Quick Start with REST API

If you prefer to use the REST API directly:

```bash
curl -X POST "https://api.hashub.ai/vectorize" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"text": "Merhaba dünya!", "model": "e5_base"}'
```

## Core Features

- **🌍 Multilingual Support**: Optimized for Turkish with support for 100+ languages
- **🚀 Multiple Models**: Choose from 6 state-of-the-art embedding models
- **📦 Batch Processing**: Process multiple texts efficiently in single requests
- **⚡ High Performance**: Optimized for speed and accuracy
- **📊 Usage Tracking**: Monitor your token consumption and costs
- **🔌 OpenAI Compatible**: Drop-in replacement for OpenAI embeddings API
- **🛡️ Enterprise Ready**: Built for production with comprehensive error handling

## 📚 Core Documentation

### 🚀 [Getting Started](./README.md)
Your first steps with Hashub Vector API
- Quick setup and authentication
- Basic API usage examples
- Subscription tiers overview
- Performance specifications

### 📖 [API Reference](./api-reference.md)
Complete endpoint documentation
- All available endpoints
- Request/response formats
- Error handling
- Code examples in cURL, Python, TypeScript

### 🎯 [Model Comparison](./models.md)
Comprehensive model guide
- 6 embedding models comparison
- Performance benchmarks
- Use case recommendations
- Language support matrix

### 💰 [Pricing Guide](./pricing.md)
Transparent pricing information
- Token-based billing
- Subscription tiers
- Cost calculator
- Volume discounts

## Available Models

| Model | Dimensions | Max Tokens | Turkish Support | Best For |
|-------|------------|------------|-----------------|----------|
| `e5_base` | 768 | 512 | ⭐⭐⭐⭐⭐ | General purpose, balanced performance |
| `e5_large` | 1024 | 512 | ⭐⭐⭐⭐⭐ | High accuracy, detailed representations |
| `bge_base` | 768 | 512 | ⭐⭐⭐⭐ | Multilingual, good for diverse content |
| `bge_large` | 1024 | 512 | ⭐⭐⭐⭐ | Performance-focused applications |
| `gte_base` | 768 | 512 | ⭐⭐⭐ | General use, cost-effective |
| `gte_large` | 1024 | 512 | ⭐⭐⭐ | Large context handling |

📖 **[Detailed Model Information](models.md)**

## 🔌 Integration Guides

### 🤖 [OpenAI Compatibility](./openai-compatibility.md)
Drop-in replacement for OpenAI
- Migration from OpenAI embeddings
- Compatible client libraries
- Code examples
- Cost comparison (up to 97% savings)

### 🦜 [LangChain Integration](./langchain-integration.md)
Build RAG apps with LangChain
- Custom embedding classes
- Vector store integration
- Advanced query engines
- Performance optimization

### 🦙 [LlamaIndex Integration](./llamaindex-integration.md)
Enterprise knowledge bases
- Document processing
- Hierarchical RAG
- Multi-modal queries
- Analytics and monitoring

## 🎯 Quick Navigation

### By Use Case
- **Document Search & RAG** → [Models: gte_base](./models.md#gte-base), [LangChain RAG](./langchain-integration.md#rag-applications)
- **Real-time Applications** → [Models: e5_small](./models.md#e5-small), [API Reference](./api-reference.md#single-text-vectorization)
- **Multi-language Support** → [Model Comparison](./models.md#language-support-matrix)
- **Cost Optimization** → [Pricing Guide](./pricing.md#cost-comparison-examples)
- **Migration from OpenAI** → [OpenAI Compatibility](./openai-compatibility.md#quick-migration)

### By Framework
- **Pure API** → [API Reference](./api-reference.md), [cURL Examples](./api-reference.md#curl-example)
- **Python** → [API Reference Python](./api-reference.md#python-example), [LangChain](./langchain-integration.md)
- **TypeScript/Node.js** → [API Reference TypeScript](./api-reference.md#typescript-example), [OpenAI Client](./openai-compatibility.md#nodejs-typescript)
- **LangChain** → [LangChain Integration](./langchain-integration.md)
- **LlamaIndex** → [LlamaIndex Integration](./llamaindex-integration.md)

### By Model
- **High Quality** → [gte_base](./models.md#gte-base) - $0.010/1M tokens
- **Balanced** → [nomic_base](./models.md#nomic-base) - $0.005/1M tokens  
- **Fast Search** → [e5_base](./models.md#e5-base) - $0.003/1M tokens
- **Q&A Systems** → [mpnet_base](./models.md#mpnet-base) - $0.0035/1M tokens
- **Budget/Speed** → [e5_small](./models.md#e5-small) - $0.002/1M tokens
- **Ultra Fast** → [minilm_base](./models.md#minilm-base) - $0.0025/1M tokens

## 🛠️ Development Resources

### Code Examples
```bash
# Quick API test
curl -X POST "https://vector.hashhub.dev/vectorize" \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "model": "gte_base"}'
```

```python
# Python quick start
import httpx

async with httpx.AsyncClient() as client:
    response = await client.post(
        "https://vector.hashhub.dev/vectorize",
        headers={"Authorization": "Bearer sk-your-key"},
        json={"text": "Hello world", "model": "gte_base"}
    )
    result = response.json()
    print(f"Vector: {len(result['vector'])} dimensions")
```

```typescript
// TypeScript quick start
const response = await fetch("https://vector.hashhub.dev/vectorize", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk-your-key",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: "Hello world",
    model: "gte_base"
  })
});
const result = await response.json();
```

### SDK Libraries
- **Python:** OpenAI-compatible client + custom HashHub client
- **Node.js:** OpenAI library + native fetch
- **Go:** Custom HTTP client (community-maintained)
- **Java:** Custom HTTP client (community-maintained)

## 📊 Feature Matrix

| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| **Models** | 1 model | 3 models | All models | All + custom |
| **Batch Size** | 5 texts | 50 texts | 500 texts | 1,000 texts |
| **Rate Limit** | 100/hour | 1,000/hour | 10,000/hour | Unlimited |
| **Support** | Community | Email | Priority | Dedicated |
| **SLA** | None | 99.5% | 99.9% | 99.95% |

## 🌍 Supported Languages

**Tier 1 (Excellent):** English, Spanish, French, German, Italian, Portuguese, Dutch
**Tier 2 (Very Good):** Russian, Chinese, Japanese, Korean, Arabic, Hindi, Turkish, Polish
**Tier 3 (Good):** 100+ additional languages with varying quality levels

## 🚀 Performance Specifications

| Model | Latency | Throughput | Memory | Best For |
|-------|---------|------------|--------|----------|
| `gte_base` | ~150ms | 400/min | 2.1GB | Long docs, RAG |
| `nomic_base` | ~120ms | 500/min | 1.8GB | General purpose |
| `e5_base` | ~80ms | 750/min | 1.2GB | Search, classification |
| `mpnet_base` | ~90ms | 665/min | 1.4GB | Q&A, similarity |
| `e5_small` | ~60ms | 1000/min | 0.8GB | High volume, realtime |
| `minilm_base` | ~50ms | 1200/min | 0.6GB | Ultra-fast processing |

*Latency measured for 100-token input on standard infrastructure*

## 🔧 Advanced Features

### ✅ Automatic Chunking
- Smart sentence-aware splitting
- Configurable chunk size and overlap
- Automatic averaging or individual chunk vectors

### ✅ Batch Processing
- Process up to 1,000 texts per request
- Efficient parallel processing
- Tier-based batch limits

### ✅ Real Token Counting
- Actual model tokenizer usage
- Precise billing calculation
- No estimation errors

### ✅ Multiple Response Formats
- Standard float arrays
- Base64 encoded vectors
- OpenAI-compatible responses

### ✅ Production Ready
- 99.9%+ uptime SLA
- Global CDN distribution
- Auto-scaling infrastructure
- Comprehensive monitoring

## 📞 Support Channels

### Community Support (Free)
- 💬 **Discord:** [HashHub Community](https://discord.gg/hashhub)
- 📖 **Documentation:** [vector.hashhub.dev/docs](https://vector.hashhub.dev/docs)
- 🐛 **GitHub Issues:** [Report bugs](https://github.com/hashhub/vector-api/issues)

### Professional Support (Paid Tiers)
- 📧 **Email:** [support@hashhub.dev](mailto:support@hashhub.dev)
- 🎯 **Priority Support:** Guaranteed response times
- 📞 **Phone Support:** Enterprise tier only
- 🤝 **Dedicated Team:** Enterprise tier only

### Specialized Support
- 🎓 **Academic:** [academic@hashhub.dev](mailto:academic@hashhub.dev)
- 🚀 **Startups:** [startup@hashhub.dev](mailto:startup@hashhub.dev)
- 💼 **Enterprise:** [enterprise@hashhub.dev](mailto:enterprise@hashhub.dev)
- 🛠️ **Technical:** [tech@hashhub.dev](mailto:tech@hashhub.dev)

## 🎯 Success Stories

> *"Migrated from OpenAI embeddings and reduced costs by 94% while improving multilingual performance."*  
> — **TechCorp AI Team**

> *"HashHub's gte_base model handles our 10K+ token documents perfectly. Game changer for our RAG system."*  
> — **DocuSearch Platform**

> *"Real-time content moderation with e5_small - 50ms latency at scale."*  
> — **Social Platform**

## 🗺️ Roadmap

### Q1 2026
- [ ] Custom fine-tuning for Enterprise
- [ ] Additional vector databases integration
- [ ] GraphQL API support
- [ ] Mobile SDKs (iOS/Android)

### Q2 2026
- [ ] Multi-modal embeddings (text + image)
- [ ] Specialized domain models
- [ ] Advanced analytics dashboard
- [ ] Regional data centers (EU, APAC)

## 🏆 Why Choose HashHub?

### 💰 **Cost Effective**
Up to 97% cheaper than major providers while maintaining superior quality

### 🌍 **Multilingual**
Best-in-class support for 100+ languages with optimized models

### ⚡ **Performance**
Sub-100ms latency with auto-scaling infrastructure

### 🔧 **Developer Friendly**
OpenAI-compatible API, comprehensive docs, multiple integration options

### 🛡️ **Enterprise Ready**
SLA guarantees, dedicated support, compliance-ready infrastructure

### 🚀 **Innovation**
Latest embedding models, continuous updates, cutting-edge research

---

## 🎉 Get Started Today

1. **Sign up** at [vector.hashhub.dev](https://vector.hashhub.dev)
2. **Get your API key** and $10 free credits
3. **Choose your model** from our comparison guide
4. **Integrate** using our comprehensive documentation
5. **Scale** with confidence on our robust infrastructure

**Ready to transform your applications with powerful embeddings?** 

[**Start Building →**](https://vector.hashhub.dev/signup)
