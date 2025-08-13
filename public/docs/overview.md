# HashHub API Overview

Welcome to HashHub - the comprehensive AI platform for document processing and vector operations. Our APIs enable you to extract, analyze, and search through documents with cutting-edge artificial intelligence.

## What is HashHub?

HashHub provides two main API suites:

### 📄 Document API (DocAPI)
Intelligent document processing with multiple OCR modes and AI-powered analysis capabilities.

- **Fast OCR**: High-speed text extraction
- **Chat OCR**: Ask questions about document content
- **GeoText OCR**: Get text with precise coordinates
- **Image Enhancement**: Improve document quality before processing

### 🔍 Vector API
High-quality text embeddings and similarity search for building RAG applications and semantic search.

- **Multi-language Embeddings**: Support for 100+ languages
- **Similarity Search**: Find relevant content instantly
- **OpenAI Compatibility**: Drop-in replacement for OpenAI embeddings
- **Optimized Performance**: Fast, cost-effective processing

## Key Features

### 🚀 High Performance
- Sub-second response times for most operations
- Parallel processing capabilities
- Optimized for high-throughput applications

### 🌍 Multi-language Support
- 100+ languages supported
- Specialized models for different regions
- Auto-detection of document language

### 🔒 Enterprise Security
- SOC 2 Type II compliant
- End-to-end encryption
- GDPR compliant data handling
- Role-based access control

### 💰 Cost Effective
- Pay-per-use pricing model
- No setup fees or monthly minimums
- Transparent pricing structure
- Volume discounts available

## Getting Started

1. **Sign up** for a free account at [dashboard.hashub.ai](https://dashboard.hashub.ai)
2. **Get your API key** from the dashboard
3. **Make your first request** using our APIs
4. **Explore** advanced features in the playground

## API Endpoints

### Base URLs
```
Document API: https://api.hashub.ai/v1/doc/
Vector API:   https://api.hashub.ai/v1/vector/
```

### Authentication
All API requests require authentication using an API key in the Authorization header:
```
Authorization: Bearer YOUR_API_KEY
```

## Use Cases

### Document Processing
- **Invoice Processing**: Extract structured data from invoices
- **Legal Document Analysis**: Search and analyze legal documents
- **Medical Records**: Process and digitize medical documents
- **Academic Research**: Analyze research papers and publications

### Vector Search
- **Customer Support**: Build intelligent chatbots
- **Knowledge Base**: Create searchable knowledge repositories
- **Content Recommendation**: Recommend similar content
- **Semantic Search**: Enable natural language search

## SDKs and Libraries

We provide official SDKs for popular programming languages:

- **Python**: `pip install hashub-python`
- **JavaScript/Node.js**: `npm install @hashub/sdk`
- **REST API**: Direct HTTP calls for any language

## Rate Limits

Our APIs include generous rate limits:

- **Free Tier**: 1,000 requests/month
- **Starter**: 10,000 requests/month
- **Professional**: 100,000 requests/month
- **Enterprise**: Custom limits available

## Support

- 📖 **Documentation**: Comprehensive guides and examples
- 🎮 **Playground**: Test APIs interactively
- 💬 **Discord Community**: Join our developer community
- 📧 **Email Support**: Contact our support team
- 🎯 **Priority Support**: Available for enterprise customers

## What's Next?

- Follow our [Quickstart Guide](./quickstart) to make your first API call
- Explore the [Document API](../api-reference/doc/overview) reference
- Learn about [Vector Embeddings](../api-reference/vector/overview)
- Check out our [Python SDK](./sdk/python) and [JavaScript SDK](./sdk/javascript)

Ready to get started? [Create your free account](https://dashboard.hashub.ai/signup) and begin building with HashHub APIs today!
