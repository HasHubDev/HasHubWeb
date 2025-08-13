# TypeScript/JavaScript SDK Documentation

[![npm version](https://badge.fury.io/js/hashub-vector.svg)](https://www.npmjs.com/package/hashub-vector)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Node.js 16+](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Professional TypeScript/JavaScript SDK for the Hashub Vector API - a powerful text vectorization service with excellent Turkish language support and multiple state-of-the-art embedding models.

## Installation

### Using npm

```bash
npm install hashub-vector
```

### Using yarn

```bash
yarn add hashub-vector
```

### Using pnpm

```bash
pnpm add hashub-vector
```

### Using CDN (Browser)

```html
<!-- ES Modules -->
<script type="module">
  import { HashubVector } from 'https://unpkg.com/hashub-vector@latest/dist/index.esm.js';
</script>

<!-- UMD (for older browsers) -->
<script src="https://unpkg.com/hashub-vector@latest/dist/index.js"></script>
```

## Quick Start

### TypeScript Example

```typescript
import { HashubVector } from 'hashub-vector';

// Initialize the client
const client = new HashubVector({
  apiKey: 'your-api-key-here'
});

// Vectorize a single text
const result = await client.vectorize({
  text: 'Merhaba dünya! Bu bir test metnidir.',
  model: 'e5_base'
});

console.log('Vector:', result.vector);
console.log('Dimensions:', result.dimension);
console.log('Tokens:', result.tokens);
```

### JavaScript (ES6+) Example

```javascript
import { HashubVector } from 'hashub-vector';

const client = new HashubVector({
  apiKey: process.env.HASHUB_API_KEY
});

async function example() {
  try {
    const result = await client.vectorize({
      text: 'Hello world! This is a test text.',
      model: 'e5_base'
    });
    
    console.log(`Generated ${result.dimension}D vector with ${result.tokens} tokens`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

example();
```

### CommonJS Example

```javascript
const { HashubVector } = require('hashub-vector');

const client = new HashubVector({
  apiKey: 'your-api-key-here'
});

client.vectorize({
  text: 'Test text',
  model: 'e5_base'
}).then(result => {
  console.log('Vector generated:', result.vector.length, 'dimensions');
}).catch(error => {
  console.error('Error:', error);
});
```

## Configuration

### Client Initialization

```typescript
import { HashubVector } from 'hashub-vector';

const client = new HashubVector({
  apiKey: 'your-api-key',           // Required
  baseUrl: 'https://api.hashub.ai', // Optional, defaults to official API
  timeout: 30000,                   // Optional, request timeout in ms
  maxRetries: 3                     // Optional, max retry attempts
});
```

### Environment Variables

```bash
# .env file
HASHUB_API_KEY=your-api-key-here
```

```typescript
import { HashubVector } from 'hashub-vector';

// Will use process.env.HASHUB_API_KEY if apiKey not provided
const client = new HashubVector({
  apiKey: process.env.HASHUB_API_KEY
});
```

## API Methods

### 1. Vectorize Single Text

Convert a single text into a vector representation.

```typescript
import { VectorizeRequest, VectorizeResponse } from 'hashub-vector';

const request: VectorizeRequest = {
  text: 'Your text here',
  model: 'e5_base',        // Optional, defaults to 'e5_base'
  chunkSize: 512,          // Optional, for long texts
  chunkOverlap: 50         // Optional, overlap between chunks
};

const result: VectorizeResponse = await client.vectorize(request);

console.log(result.vector);      // number[] - The embedding vector
console.log(result.dimension);   // number - Vector dimensions
console.log(result.model);       // string - Model used
console.log(result.tokens);      // number - Tokens consumed
```

### 2. Vectorize Multiple Texts (Batch)

Process multiple texts in a single API call for better performance.

```typescript
import { BatchVectorizeRequest, BatchVectorizeResponse } from 'hashub-vector';

const texts = [
  'İstanbul Türkiye\'nin en büyük şehridir.',
  'Ankara Türkiye\'nin başkentidir.',
  'İzmir Ege Bölgesi\'nin merkezi şehridir.'
];

const request: BatchVectorizeRequest = {
  texts,
  model: 'e5_base',
  chunkSize: 512,
  chunkOverlap: 50
};

const result: BatchVectorizeResponse = await client.vectorizeBatch(request);

console.log(result.vectors);      // number[][] - Array of embedding vectors
console.log(result.dimension);    // number - Vector dimensions
console.log(result.model);        // string - Model used
console.log(result.count);        // number - Number of texts processed
console.log(result.totalTokens);  // number - Total tokens consumed
```

### 3. Calculate Text Similarity

Calculate cosine similarity between two texts.

```typescript
import { SimilarityRequest, SimilarityResponse } from 'hashub-vector';

const request: SimilarityRequest = {
  text1: 'İstanbul büyük bir şehir',
  text2: 'İstanbul metropol bir kent',
  model: 'e5_base'
};

const result: SimilarityResponse = await client.similarity(request);

console.log(`Similarity: ${result.similarity.toFixed(3)}`); // number (0-1)
console.log(`Model used: ${result.model}`);                 // string
```

### 4. Get Available Models

Retrieve information about available embedding models.

```typescript
import { EmbeddingModel } from 'hashub-vector';

const models: EmbeddingModel[] = await client.getModels();

models.forEach(model => {
  console.log(`Model: ${model.alias}`);
  console.log(`Name: ${model.name}`);
  console.log(`Description: ${model.description}`);
  console.log(`Dimensions: ${model.dimension}`);
  console.log(`Max tokens: ${model.maxTokens}`);
  console.log(`Price per M tokens: $${model.pricePerMTokens}`);
  console.log(`Turkish support: ${model.turkishSupport}/10`);
  console.log('---');
});
```

### 5. Monitor Usage

Track your token usage and remaining quota.

```typescript
import { UsageResponse } from 'hashub-vector';

const usage: UsageResponse = await client.getUsage();

console.log(`Tokens used: ${usage.tokensUsed}`);
console.log(`Token limit: ${usage.tokensLimit}`);
console.log(`Usage percentage: ${usage.tokensPercentageUsed.toFixed(1)}%`);
console.log(`Remaining tokens: ${usage.tokensRemaining}`);

// Alert if usage is high
if (usage.tokensPercentageUsed > 90) {
  console.warn('⚠️ Warning: High token usage!');
}
```

### 6. OpenAI Compatibility

Drop-in replacement for OpenAI's embeddings API.

```typescript
import { OpenAIEmbeddingRequest, OpenAIEmbeddingResponse } from 'hashub-vector';

// OpenAI-compatible method
const request: OpenAIEmbeddingRequest = {
  input: 'Your text here',
  model: 'e5_base',
  user: 'optional-user-id'  // Optional
};

const result: OpenAIEmbeddingResponse = await client.createEmbedding(request);

// OpenAI-compatible response format
console.log(result.object);                    // "list"
console.log(result.data[0].object);            // "embedding"
console.log(result.data[0].embedding);         // number[]
console.log(result.data[0].index);             // number
console.log(result.model);                     // string
console.log(result.usage.prompt_tokens);       // number
console.log(result.usage.total_tokens);        // number
```

## Advanced Usage Examples

### 1. Batch Processing with Progress Tracking

```typescript
interface ProcessingResult {
  vectors: number[][];
  totalTokens: number;
  errors: string[];
}

async function processLargeDataset(
  texts: string[], 
  batchSize: number = 100
): Promise<ProcessingResult> {
  const results: number[][] = [];
  const errors: string[] = [];
  let totalTokens = 0;
  
  const totalBatches = Math.ceil(texts.length / batchSize);
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    
    console.log(`Processing batch ${batchNum}/${totalBatches}...`);
    
    try {
      const result = await client.vectorizeBatch({
        texts: batch,
        model: 'e5_base'
      });
      
      results.push(...result.vectors);
      totalTokens += result.totalTokens;
      
      console.log(`✅ Batch ${batchNum} completed - ${result.totalTokens} tokens used`);
      
    } catch (error) {
      const errorMsg = `Batch ${batchNum} failed: ${error.message}`;
      console.error(`❌ ${errorMsg}`);
      errors.push(errorMsg);
    }
    
    // Rate limiting - be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return { vectors: results, totalTokens, errors };
}

// Usage
const largeTextList = ['text1', 'text2', /* ... */];
const result = await processLargeDataset(largeTextList);
console.log(`Processed ${result.vectors.length} texts, used ${result.totalTokens} tokens`);
```

### 2. Similarity Search Implementation

```typescript
interface SearchResult {
  document: string;
  similarity: number;
  index: number;
}

class SimilaritySearch {
  private documents: string[] = [];
  private vectors: number[][] = [];
  
  constructor(private client: HashubVector) {}
  
  async addDocuments(documents: string[]): Promise<void> {
    console.log(`Vectorizing ${documents.length} documents...`);
    
    const result = await this.client.vectorizeBatch({
      texts: documents,
      model: 'e5_base'
    });
    
    this.documents.push(...documents);
    this.vectors.push(...result.vectors);
    
    console.log(`✅ Added ${documents.length} documents to index`);
  }
  
  async search(query: string, topK: number = 5): Promise<SearchResult[]> {
    // Get query vector
    const queryResult = await this.client.vectorize({
      text: query,
      model: 'e5_base'
    });
    
    const queryVector = queryResult.vector;
    
    // Calculate similarities
    const similarities: SearchResult[] = [];
    
    for (let i = 0; i < this.vectors.length; i++) {
      const docVector = this.vectors[i];
      
      // Cosine similarity
      const dotProduct = queryVector.reduce((sum, a, j) => sum + a * docVector[j], 0);
      const normA = Math.sqrt(queryVector.reduce((sum, a) => sum + a * a, 0));
      const normB = Math.sqrt(docVector.reduce((sum, b) => sum + b * b, 0));
      const cosineSim = dotProduct / (normA * normB);
      
      similarities.push({
        document: this.documents[i],
        similarity: cosineSim,
        index: i
      });
    }
    
    // Sort by similarity and return top_k
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }
}

// Usage
const searchEngine = new SimilaritySearch(client);

const documents = [
  'İstanbul Türkiye\'nin en büyük şehridir.',
  'Ankara Türkiye\'nin başkentidir.',
  'İzmir Ege Bölgesi\'nde yer alır.',
  'Python programlama dili çok popülerdir.',
  'Makine öğrenmesi yapay zeka alanının bir dalıdır.'
];

await searchEngine.addDocuments(documents);

// Search
const results = await searchEngine.search('Türkiye\'nin şehirleri', 3);
results.forEach(result => {
  console.log(`Similarity: ${result.similarity.toFixed(3)} - ${result.document}`);
});
```

### 3. Error Handling and Retry Logic

```typescript
import { 
  AuthenticationError, 
  RateLimitError, 
  QuotaExceededError,
  ValidationError,
  ServerError,
  NetworkError
} from 'hashub-vector';

async function robustVectorize(
  client: HashubVector, 
  text: string, 
  maxRetries: number = 3
): Promise<VectorizeResponse | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await client.vectorize({ text, model: 'e5_base' });
      
    } catch (error) {
      if (error instanceof AuthenticationError) {
        console.error('❌ Authentication failed:', error.message);
        return null; // Don't retry auth errors
      }
      
      if (error instanceof RateLimitError) {
        const retryAfter = error.retryAfter || 60;
        console.log(`⏳ Rate limited. Waiting ${retryAfter} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      if (error instanceof QuotaExceededError) {
        console.error('❌ Quota exceeded:', error.message);
        return null; // Don't retry quota errors
      }
      
      if (error instanceof ValidationError) {
        console.error('❌ Validation error:', error.message);
        return null; // Don't retry validation errors
      }
      
      // For server errors and network errors, retry with exponential backoff
      if (error instanceof ServerError || error instanceof NetworkError) {
        console.warn(`⚠️ Attempt ${attempt + 1} failed: ${error.message}`);
        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Retrying in ${waitTime/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
      }
      
      // Unknown error
      console.error('❌ Unknown error:', error);
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
    }
  }
  
  console.error('❌ All retry attempts failed');
  return null;
}

// Usage
const result = await robustVectorize(client, 'Test text');
if (result) {
  console.log(`✅ Successfully vectorized: ${result.vector.length} dimensions`);
}
```

### 4. Usage Monitoring and Alerts

```typescript
interface UsageInfo {
  timestamp: string;
  tokensUsed: number;
  tokensLimit: number;
  usagePercentage: number;
  tokensRemaining: number;
}

class UsageMonitor {
  private lastCheck: Date | null = null;
  
  constructor(
    private client: HashubVector,
    private alertThreshold: number = 0.8
  ) {}
  
  async checkUsage(): Promise<UsageInfo> {
    const usage = await this.client.getUsage();
    const usagePct = usage.tokensPercentageUsed / 100;
    
    const usageInfo: UsageInfo = {
      timestamp: new Date().toISOString(),
      tokensUsed: usage.tokensUsed,
      tokensLimit: usage.tokensLimit,
      usagePercentage: usage.tokensPercentageUsed,
      tokensRemaining: usage.tokensRemaining
    };
    
    // Log usage
    console.log(`Token usage: ${usage.tokensUsed}/${usage.tokensLimit} ` +
               `(${usage.tokensPercentageUsed.toFixed(1)}%)`);
    
    // Alert if high usage
    if (usagePct > this.alertThreshold) {
      console.warn(`🚨 HIGH USAGE ALERT: ${usage.tokensPercentageUsed.toFixed(1)}% ` +
                   `of quota used (${usage.tokensRemaining} tokens remaining)`);
    }
    
    this.lastCheck = new Date();
    return usageInfo;
  }
  
  async safeVectorize(request: VectorizeRequest): Promise<VectorizeResponse> {
    // Check usage before operation
    await this.checkUsage();
    
    // Perform vectorization
    const result = await this.client.vectorize(request);
    
    // Check usage after operation
    await this.checkUsage();
    
    return result;
  }
}

// Usage
const monitor = new UsageMonitor(client, 0.9);
const result = await monitor.safeVectorize({
  text: 'Test text',
  model: 'e5_base'
});
```

### 5. React Hook Implementation

```typescript
// useHashubVector.ts
import { useState, useEffect, useCallback } from 'react';
import { HashubVector, VectorizeRequest, VectorizeResponse } from 'hashub-vector';

interface UseHashubVectorOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

interface UseHashubVectorReturn {
  vectorize: (request: VectorizeRequest) => Promise<VectorizeResponse | null>;
  loading: boolean;
  error: string | null;
  usage: any | null;
  refreshUsage: () => Promise<void>;
}

export function useHashubVector(options: UseHashubVectorOptions): UseHashubVectorReturn {
  const [client] = useState(() => new HashubVector(options));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<any | null>(null);
  
  const vectorize = useCallback(async (request: VectorizeRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await client.vectorize(request);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);
  
  const refreshUsage = useCallback(async () => {
    try {
      const usageData = await client.getUsage();
      setUsage(usageData);
    } catch (err) {
      console.error('Failed to fetch usage:', err);
    }
  }, [client]);
  
  useEffect(() => {
    refreshUsage();
  }, [refreshUsage]);
  
  return { vectorize, loading, error, usage, refreshUsage };
}

// Usage in React component
function MyComponent() {
  const { vectorize, loading, error, usage } = useHashubVector({
    apiKey: process.env.REACT_APP_HASHUB_API_KEY!
  });
  
  const handleVectorize = async () => {
    const result = await vectorize({
      text: 'Hello world',
      model: 'e5_base'
    });
    
    if (result) {
      console.log('Vector generated:', result.vector.length, 'dimensions');
    }
  };
  
  return (
    <div>
      <button onClick={handleVectorize} disabled={loading}>
        {loading ? 'Processing...' : 'Vectorize Text'}
      </button>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {usage && (
        <p>Usage: {usage.tokensUsed}/{usage.tokensLimit} tokens</p>
      )}
    </div>
  );
}
```

## Browser Usage

### Basic Browser Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hashub Vector Browser Example</title>
</head>
<body>
  <div id="app">
    <input type="text" id="textInput" placeholder="Enter text to vectorize">
    <button onclick="vectorizeText()">Vectorize</button>
    <div id="result"></div>
  </div>

  <script type="module">
    import { HashubVector } from 'https://unpkg.com/hashub-vector@latest/dist/index.esm.js';
    
    const client = new HashubVector({
      apiKey: 'your-api-key-here'
    });
    
    window.vectorizeText = async function() {
      const text = document.getElementById('textInput').value;
      const resultDiv = document.getElementById('result');
      
      if (!text) {
        resultDiv.innerHTML = 'Please enter some text';
        return;
      }
      
      try {
        resultDiv.innerHTML = 'Processing...';
        
        const result = await client.vectorize({
          text: text,
          model: 'e5_base'
        });
        
        resultDiv.innerHTML = `
          <h3>Result:</h3>
          <p><strong>Dimensions:</strong> ${result.dimension}</p>
          <p><strong>Tokens:</strong> ${result.tokens}</p>
          <p><strong>Model:</strong> ${result.model}</p>
          <p><strong>First 5 values:</strong> ${result.vector.slice(0, 5).join(', ')}...</p>
        `;
      } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      }
    };
  </script>
</body>
</html>
```

## TypeScript Types

The SDK provides comprehensive TypeScript definitions:

```typescript
// Import types
import type {
  HashubVectorConfig,
  VectorizeRequest,
  VectorizeResponse,
  BatchVectorizeRequest,
  BatchVectorizeResponse,
  SimilarityRequest,
  SimilarityResponse,
  EmbeddingModel,
  UsageResponse,
  OpenAIEmbeddingRequest,
  OpenAIEmbeddingResponse
} from 'hashub-vector';

// Configuration interface
interface HashubVectorConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
}

// Model type
type ModelType = 'e5_base' | 'e5_large' | 'bge_base' | 'bge_large' | 'gte_base' | 'gte_large';

// Example with full typing
const config: HashubVectorConfig = {
  apiKey: process.env.HASHUB_API_KEY!,
  timeout: 30000
};

const client = new HashubVector(config);

const request: VectorizeRequest = {
  text: 'Typed request',
  model: 'e5_base'
};

const response: VectorizeResponse = await client.vectorize(request);
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

The SDK provides specific error classes for different error types:

```typescript
import {
  HashubVectorError,      // Base error class
  AuthenticationError,    // Invalid API key (401)
  RateLimitError,        // Rate limit exceeded (429)
  QuotaExceededError,    // Token quota exceeded (402)
  ValidationError,       // Invalid request (400)
  ServerError,          // Server errors (5xx)
  NetworkError,         // Network/connection issues
  TimeoutError          // Request timeout
} from 'hashub-vector';

try {
  const result = await client.vectorize({ text: 'test' });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after: ${error.retryAfter} seconds`);
  } else if (error instanceof QuotaExceededError) {
    console.error('Token quota exceeded');
  } else if (error instanceof ValidationError) {
    console.error('Invalid request:', error.message);
  } else if (error instanceof ServerError) {
    console.error('Server error occurred');
  } else if (error instanceof NetworkError) {
    console.error('Network connection failed');
  } else if (error instanceof TimeoutError) {
    console.error('Request timed out');
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Best Practices

### 1. API Key Security

```typescript
// ❌ Never hardcode API keys
const client = new HashubVector({
  apiKey: 'sk-123...' // DON'T DO THIS
});

// ✅ Use environment variables
const client = new HashubVector({
  apiKey: process.env.HASHUB_API_KEY
});

// ✅ For frontend applications, use a proxy server
// Don't expose API keys in client-side code
```

### 2. Batch Processing for Efficiency

```typescript
// ❌ Inefficient: Multiple single requests
const vectors = [];
for (const text of texts) {
  const result = await client.vectorize({ text });
  vectors.push(result.vector);
}

// ✅ Efficient: Single batch request
const result = await client.vectorizeBatch({ texts });
const vectors = result.vectors;
```

### 3. Model Selection Strategy

```typescript
// For Turkish text - use e5 models
const turkishResult = await client.vectorize({
  text: 'Türkçe metin için en iyi performans',
  model: 'e5_base'
});

// For multilingual content - use bge models
const multilingualResult = await client.vectorize({
  text: 'Mixed language content',
  model: 'bge_base'
});

// For high accuracy needs - use large models
const preciseResult = await client.vectorize({
  text: 'Critical business content',
  model: 'e5_large'
});
```

### 4. Async/Await Best Practices

```typescript
// ✅ Proper async/await usage
async function processTexts(texts: string[]) {
  try {
    const result = await client.vectorizeBatch({
      texts,
      model: 'e5_base'
    });
    
    return result.vectors;
  } catch (error) {
    console.error('Processing failed:', error);
    throw error;
  }
}

// ✅ Concurrent processing (when appropriate)
async function processMultipleBatches(batches: string[][]) {
  const promises = batches.map(batch => 
    client.vectorizeBatch({ texts: batch, model: 'e5_base' })
  );
  
  const results = await Promise.all(promises);
  return results.flatMap(result => result.vectors);
}
```

## Integration Examples

### With Next.js API Routes

```typescript
// pages/api/vectorize.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { HashubVector } from 'hashub-vector';

const client = new HashubVector({
  apiKey: process.env.HASHUB_API_KEY!
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { text, model = 'e5_base' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const result = await client.vectorize({ text, model });
    
    res.status(200).json({
      success: true,
      data: {
        vector: result.vector,
        dimension: result.dimension,
        tokens: result.tokens,
        model: result.model
      }
    });
  } catch (error) {
    console.error('Vectorization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to vectorize text'
    });
  }
}
```

### With Express.js

```typescript
import express from 'express';
import { HashubVector } from 'hashub-vector';

const app = express();
const client = new HashubVector({
  apiKey: process.env.HASHUB_API_KEY!
});

app.use(express.json());

app.post('/api/vectorize', async (req, res) => {
  try {
    const { text, model = 'e5_base' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const result = await client.vectorize({ text, model });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### With Node.js Streams

```typescript
import { Transform } from 'stream';
import { HashubVector } from 'hashub-vector';

class VectorizeStream extends Transform {
  private client: HashubVector;
  private batchSize: number;
  private batch: string[] = [];
  
  constructor(options: { apiKey: string; batchSize?: number }) {
    super({ objectMode: true });
    this.client = new HashubVector({ apiKey: options.apiKey });
    this.batchSize = options.batchSize || 10;
  }
  
  async _transform(chunk: string, encoding: string, callback: Function) {
    this.batch.push(chunk);
    
    if (this.batch.length >= this.batchSize) {
      await this.processBatch();
    }
    
    callback();
  }
  
  async _flush(callback: Function) {
    if (this.batch.length > 0) {
      await this.processBatch();
    }
    callback();
  }
  
  private async processBatch() {
    try {
      const result = await this.client.vectorizeBatch({
        texts: this.batch,
        model: 'e5_base'
      });
      
      result.vectors.forEach((vector, index) => {
        this.push({
          text: this.batch[index],
          vector,
          tokens: Math.ceil(this.batch[index].length / 4) // Approximate
        });
      });
      
      this.batch = [];
    } catch (error) {
      this.emit('error', error);
    }
  }
}

// Usage
const vectorizeStream = new VectorizeStream({
  apiKey: process.env.HASHUB_API_KEY!,
  batchSize: 50
});

vectorizeStream.on('data', (result) => {
  console.log(`Vectorized: ${result.text.substring(0, 50)}...`);
});

vectorizeStream.on('error', (error) => {
  console.error('Stream error:', error);
});

// Feed texts to the stream
const texts = ['text1', 'text2', 'text3'];
texts.forEach(text => vectorizeStream.write(text));
vectorizeStream.end();
```

## Testing

### Unit Testing with Jest

```typescript
// __tests__/hashub-vector.test.ts
import { HashubVector } from 'hashub-vector';

// Mock the module
jest.mock('axios');

describe('HashubVector', () => {
  let client: HashubVector;
  
  beforeEach(() => {
    client = new HashubVector({
      apiKey: 'test-api-key'
    });
  });
  
  test('should vectorize text successfully', async () => {
    // Mock implementation
    const mockResponse = {
      vector: [0.1, 0.2, 0.3],
      dimension: 768,
      model: 'e5_base',
      tokens: 10
    };
    
    // Your test implementation here
    const result = await client.vectorize({
      text: 'test text',
      model: 'e5_base'
    });
    
    expect(result).toBeTruthy();
  });
});
```

### Integration Testing

```typescript
// integration.test.ts
import { HashubVector } from 'hashub-vector';

describe('HashubVector Integration Tests', () => {
  let client: HashubVector;
  
  beforeAll(() => {
    if (!process.env.HASHUB_API_KEY) {
      throw new Error('HASHUB_API_KEY environment variable is required for integration tests');
    }
    
    client = new HashubVector({
      apiKey: process.env.HASHUB_API_KEY
    });
  });
  
  test('should vectorize real text', async () => {
    const result = await client.vectorize({
      text: 'This is a real integration test',
      model: 'e5_base'
    });
    
    expect(result.vector).toHaveLength(768);
    expect(result.tokens).toBeGreaterThan(0);
    expect(result.model).toBe('e5_base');
  }, 10000); // 10 second timeout
});
```

## Troubleshooting

### Common Issues

1. **Module Import Errors**
   ```bash
   npm install --save-dev @types/node
   ```

2. **CORS Issues in Browser**
   ```typescript
   // Use a proxy server for browser applications
   const client = new HashubVector({
     apiKey: 'your-key',
     baseUrl: '/api/proxy' // Your proxy endpoint
   });
   ```

3. **TypeScript Compilation Errors**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": true
     }
   }
   ```

4. **Rate Limiting**
   ```typescript
   // Add delays between requests
   await new Promise(resolve => setTimeout(resolve, 1000));
   ```

### Debug Mode

```typescript
// Enable debug logging
process.env.DEBUG = 'hashub-vector:*';

// Or use custom logging
const client = new HashubVector({
  apiKey: process.env.HASHUB_API_KEY,
  // Add custom request interceptor for debugging
});
```

## Support and Resources

- **Documentation**: [https://docs.hashub.ai](https://docs.hashub.ai)
- **TypeScript SDK GitHub**: https://github.com/hasanbahadir/hashub-vector-js
- **NPM Package**: https://www.npmjs.com/package/hashub-vector
- **Issues & Support**: [GitHub Issues](https://github.com/hasanbahadir/hashub-vector-js/issues)
- **Email Support**: support@hashub.ai

## Changelog

### v1.0.0 (Latest)
- ✅ Initial release with full API support
- ✅ Complete TypeScript definitions
- ✅ Dual package support (ESM + CommonJS)
- ✅ Comprehensive error handling
- ✅ OpenAI compatibility layer
- ✅ Batch processing capabilities
- ✅ Usage tracking and monitoring
- ✅ Browser and Node.js support
- ✅ Extensive documentation and examples

---

**Made with ❤️ by the Hashub team**
