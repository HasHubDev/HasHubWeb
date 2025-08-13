# Hashub Vector SDKs

Official SDKs for the Hashub Vector API - powerful text vectorization with excellent Turkish language support.

## 🐍 Python SDK

[![PyPI version](https://badge.fury.io/py/hashub-vector.svg)](https://pypi.org/project/hashub-vector/)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Installation

```bash
pip install hashub-vector
```

### Quick Start

```python
from hashub_vector import HashubVector

# Initialize client
client = HashubVector(api_key="your-api-key")

# Vectorize text
result = client.vectorize(
    text="Merhaba dünya! Bu bir test metnidir.",
    model="e5_base"
)

print(f"Vector: {len(result.vector)} dimensions")
print(f"Tokens used: {result.tokens}")
```

### Features

- ✅ Complete API coverage (vectorize, batch, similarity, models, usage)
- ✅ OpenAI compatibility layer for easy migration
- ✅ Comprehensive error handling with specific exception types
- ✅ Automatic retries with exponential backoff
- ✅ Usage tracking and quota monitoring
- ✅ Batch processing for efficiency
- ✅ Type hints and full documentation
- ✅ Support for all embedding models
- ✅ Async support with asyncio

**📖 [Complete Python SDK Documentation](python-sdk.md)**

---

## 🟨 TypeScript/JavaScript SDK

[![npm version](https://badge.fury.io/js/hashub-vector.svg)](https://www.npmjs.com/package/hashub-vector)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Node.js 16+](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Installation

```bash
npm install hashub-vector
```

### Quick Start

```typescript
import { HashubVector } from 'hashub-vector';

// Initialize client
const client = new HashubVector({
  apiKey: 'your-api-key'
});

// Vectorize text
const result = await client.vectorize({
  text: 'Hello world! This is a test text.',
  model: 'e5_base'
});

console.log(`Vector: ${result.vector.length} dimensions`);
console.log(`Tokens used: ${result.tokens}`);
```

### Features

- ✅ Complete TypeScript definitions
- ✅ Dual package (ESM + CommonJS) support
- ✅ Browser and Node.js compatibility
- ✅ Complete API coverage (vectorize, batch, similarity, models, usage)
- ✅ OpenAI compatibility layer
- ✅ Comprehensive error handling
- ✅ Automatic retries with exponential backoff
- ✅ Usage tracking and quota monitoring
- ✅ Batch processing capabilities
- ✅ React hooks and modern JavaScript patterns

**📖 [Complete TypeScript/JavaScript SDK Documentation](typescript-sdk.md)**

---

## Comparison

| Feature | Python SDK | TypeScript/JS SDK |
|---------|------------|-------------------|
| API Coverage | ✅ Complete | ✅ Complete |
| Type Safety | ✅ Type hints | ✅ Full TypeScript |
| Error Handling | ✅ Comprehensive | ✅ Comprehensive |
| OpenAI Compatibility | ✅ Yes | ✅ Yes |
| Batch Processing | ✅ Yes | ✅ Yes |
| Usage Tracking | ✅ Yes | ✅ Yes |
| Async Support | ✅ asyncio | ✅ Native Promises |
| Browser Support | ❌ No | ✅ Yes |
| React Integration | ❌ No | ✅ Hooks available |
| Documentation | ✅ Extensive | ✅ Extensive |

## Getting Started

1. **Choose your SDK** based on your technology stack
2. **Install** using your preferred package manager
3. **Get an API key** from [https://hashub.ai](https://hashub.ai)
4. **Start vectorizing** your text data

## Example Use Cases

### 1. Semantic Search
Build powerful search engines that understand meaning, not just keywords.

### 2. Content Recommendation
Create personalized content recommendations based on text similarity.

### 3. Document Clustering
Group similar documents automatically using vector similarity.

### 4. Chatbot Enhancement
Improve chatbot responses with semantic understanding.

### 5. Turkish Language Processing
Leverage our optimized models for Turkish text analysis.

## Need Help?

- **Documentation**: Complete guides available for both SDKs
- **GitHub**: Issues and feature requests welcome
- **Email**: support@hashub.ai
- **Community**: Join our developer community

## License

Both SDKs are released under the MIT License. See LICENSE file for details.

---

**Made with ❤️ by the Hashub team**
