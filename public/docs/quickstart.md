# Quickstart Guide

Get up and running with HashHub APIs in just 15 minutes.

## Prerequisites

Before you begin, make sure you have:
- A valid API key from your HashHub dashboard
- Basic knowledge of REST APIs
- cURL, Python, or JavaScript environment

## Step 1: Get Your API Key

1. Log in to your HashHub dashboard
2. Navigate to **API Keys** section
3. Click **Create New Key**
4. Copy your API key and store it securely

⚠️ **Important**: Never expose your API key in client-side code or public repositories.

## Step 2: First API Call

Let's start with a simple OCR request using our Document API:

### Fast OCR Example

Extract text from an image or PDF document:

```bash
curl -X POST "https://api.hashub.ai/v1/doc/ocr/fast" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/document.pdf" \
  -F "lang=en"
```

### Vector Embedding Example

Generate embeddings for text:

```bash
curl -X POST "https://api.hashub.ai/v1/vector/embed" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "hashub-multilingual-v1",
    "input": ["Hello world", "Machine learning"]
  }'
```

## Step 3: Handle Responses

### Successful Response

```json
{
  "success": true,
  "data": {
    "id": "req_1234567890",
    "text": "Extracted text content...",
    "confidence": 0.95,
    "processing_time": 2.3
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired.",
    "request_id": "req_1234567890"
  }
}
```

## Step 4: Best Practices

1. **Rate Limiting**: Respect the API rate limits (1000 requests/minute)
2. **Error Handling**: Always implement proper error handling
3. **Retries**: Use exponential backoff for failed requests
4. **Security**: Store API keys in environment variables

## Next Steps

- Explore [Document API guides](./doc-api) for advanced OCR features
- Learn about [Vector API](./vector-api) for embedding and search
- Check out our [SDKs](./sdks) for your preferred programming language
- Join our [Discord community](https://discord.gg/hashub) for support

## Common Issues

### Authentication Errors
- Verify your API key is correct
- Ensure the `Authorization` header is properly formatted

### File Upload Errors
- Check file size limits (max 10MB)
- Supported formats: PDF, PNG, JPG, JPEG

### Rate Limit Errors
- Implement exponential backoff
- Consider upgrading your plan for higher limits
