# Chat Completions API - OpenAI Compatible Interface

## 🎯 Overview

The Chat Completions API provides an OpenAI-compatible interface for OCR processing, allowing seamless integration with existing OpenAI-based applications. This endpoint accepts the same request format as OpenAI's chat completions API and processes images for text extraction.

## 📡 Endpoint

**Endpoint:** `POST /api/v1/chat/completions`

**Description:** OpenAI-compatible chat completions endpoint for OCR processing with image support.

## 🔄 Request Format

### Basic Request Structure

```json
{
  "model": "dots-ocr",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Extract all text from this image"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
          }
        }
      ]
    }
  ],
  "max_tokens": 4000,
  "temperature": 0.1
}
```

### Request Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `model` | string | ✅ | - | Must be `"dots-ocr"` |
| `messages` | array | ✅ | - | Array of message objects |
| `max_tokens` | integer | ❌ | 4000 | Maximum tokens in response |
| `temperature` | number | ❌ | 0.1 | Response randomness (0.0-2.0) |
| `stream` | boolean | ❌ | false | Enable streaming responses |
| `timeout` | integer | ❌ | 300 | Request timeout in seconds |

### Message Structure

#### Text Message
```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "Your instruction here"
    }
  ]
}
```

#### Image Message
```json
{
  "role": "user",
  "content": [
    {
      "type": "image_url",
      "image_url": {
        "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "detail": "high"
      }
    }
  ]
}
```

#### Combined Message
```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "Extract text from this document and format it as markdown"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
      }
    }
  ]
}
```

## 📤 Response Format

### Queued Response (Async Processing)

```json
{
  "id": "chatcmpl-req_123456789",
  "object": "chat.completion",
  "created": 1704067200,
  "model": "dots-ocr",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "OCR request req_123456789 has been queued for processing. Use the request ID to check status and retrieve results."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  },
  "request_id": "req_123456789"
}
```

### Completed Response (Immediate Processing)

```json
{
  "id": "chatcmpl-req_123456789",
  "object": "chat.completion",
  "created": 1704067200,
  "model": "dots-ocr",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Extracted text content from the image:\n\n# Document Title\n\nThis is the main content of the document...\n\n- Point 1\n- Point 2\n- Point 3"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 200,
    "total_tokens": 350
  },
  "processing_time_seconds": 2.5
}
```

## 🔄 Processing Workflow

### 1. Submit Chat Completion Request

```bash
curl -X POST "http://localhost:8000/api/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dots-ocr",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Extract all text from this image"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
            }
          }
        ]
      }
    ]
  }'
```

### 2. Extract Request ID

From the response, extract the `request_id`:
```python
response = requests.post("http://localhost:8000/api/v1/chat/completions", json=payload)
request_id = response.json().get("request_id")
```

### 3. Check Processing Status

```bash
curl "http://localhost:8000/api/v1/requests/req_123456789"
```

### 4. Retrieve Final Results

Once completed, the status endpoint will return the full OCR results.

## 🎨 Advanced Usage Patterns

### Custom Instructions

```json
{
  "model": "dots-ocr",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Extract only the table data from this image and format it as CSV"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
          }
        }
      ]
    }
  ]
}
```

### Multi-Image Processing

```json
{
  "model": "dots-ocr",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Compare these two documents and highlight the differences"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,IMAGE1_DATA..."
          }
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,IMAGE2_DATA..."
          }
        }
      ]
    }
  ]
}
```

### Language-Specific Instructions

```json
{
  "model": "dots-ocr",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Extract text from this Turkish document and translate it to English"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
          }
        }
      ]
    }
  ]
}
```

## 🔧 Integration Examples

### Python Integration

```python
import requests
import base64
import time

class DotsOCRClient:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
    
    def encode_image(self, image_path):
        with open(image_path, "rb") as f:
            image_data = base64.b64encode(f.read()).decode()
            return f"data:image/png;base64,{image_data}"
    
    def extract_text(self, image_path, instruction="Extract all text from this image"):
        # Encode image
        image_url = self.encode_image(image_path)
        
        # Prepare request
        payload = {
            "model": "dots-ocr",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": instruction},
                        {"type": "image_url", "image_url": {"url": image_url}}
                    ]
                }
            ]
        }
        
        # Submit request
        response = requests.post(
            f"{self.base_url}/api/v1/chat/completions",
            json=payload
        )
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if immediate response
            if "request_id" in data:
                return self._poll_for_results(data["request_id"])
            else:
                return data["choices"][0]["message"]["content"]
        else:
            raise Exception(f"Request failed: {response.status_code}")
    
    def _poll_for_results(self, request_id, max_wait=300):
        start_time = time.time()
        
        while time.time() - start_time < max_wait:
            response = requests.get(f"{self.base_url}/api/v1/requests/{request_id}")
            
            if response.status_code == 200:
                data = response.json()
                
                if data["status"] == "completed":
                    return data["result"]["text"]
                elif data["status"] == "failed":
                    raise Exception(f"OCR failed: {data.get('error', 'Unknown error')}")
                elif data["status"] in ["queued", "processing"]:
                    time.sleep(5)  # Wait before next poll
                    continue
                else:
                    raise Exception(f"Unexpected status: {data['status']}")
            else:
                raise Exception(f"Status check failed: {response.status_code}")
        
        raise Exception("Timeout waiting for OCR completion")

# Usage
client = DotsOCRClient()
text = client.extract_text("document.png", "Extract only the main headings")
print(text)
```

### JavaScript/Node.js Integration

```javascript
const axios = require('axios');
const fs = require('fs');

class DotsOCRClient {
    constructor(baseUrl = 'http://localhost:8000') {
        this.baseUrl = baseUrl;
    }
    
    encodeImage(imagePath) {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        return `data:image/png;base64,${base64Image}`;
    }
    
    async extractText(imagePath, instruction = 'Extract all text from this image') {
        try {
            // Encode image
            const imageUrl = this.encodeImage(imagePath);
            
            // Prepare request
            const payload = {
                model: 'dots-ocr',
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: instruction },
                            { type: 'image_url', image_url: { url: imageUrl } }
                        ]
                    }
                ]
            };
            
            // Submit request
            const response = await axios.post(
                `${this.baseUrl}/api/v1/chat/completions`,
                payload
            );
            
            if (response.data.request_id) {
                return await this.pollForResults(response.data.request_id);
            } else {
                return response.data.choices[0].message.content;
            }
        } catch (error) {
            throw new Error(`OCR request failed: ${error.message}`);
        }
    }
    
    async pollForResults(requestId, maxWait = 300000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < maxWait) {
            try {
                const response = await axios.get(
                    `${this.baseUrl}/api/v1/requests/${requestId}`
                );
                
                const data = response.data;
                
                if (data.status === 'completed') {
                    return data.result.text;
                } else if (data.status === 'failed') {
                    throw new Error(`OCR failed: ${data.error || 'Unknown error'}`);
                } else if (['queued', 'processing'].includes(data.status)) {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    continue;
                } else {
                    throw new Error(`Unexpected status: ${data.status}`);
                }
            } catch (error) {
                throw new Error(`Status check failed: ${error.message}`);
            }
        }
        
        throw new Error('Timeout waiting for OCR completion');
    }
}

// Usage
const client = new DotsOCRClient();
client.extractText('document.png', 'Extract only the main headings')
    .then(text => console.log(text))
    .catch(error => console.error(error));
```

## 🚨 Error Handling

### Common Error Scenarios

| Error | Description | Solution |
|-------|-------------|----------|
| `model_not_found` | Invalid model name | Use `"dots-ocr"` as model |
| `invalid_image_format` | Unsupported image format | Use PNG, JPG, JPEG, GIF, BMP, or TIFF |
| `image_too_large` | Image exceeds size limit | Reduce image resolution or file size |
| `invalid_base64` | Malformed base64 encoding | Ensure proper base64 encoding |
| `timeout` | Request processing timeout | Increase timeout value or check image quality |

### Error Response Format

```json
{
  "error": {
    "message": "Invalid model name",
    "type": "invalid_request_error",
    "code": "model_not_found"
  }
}
```

## 📊 Performance Considerations

### Response Times

- **Immediate Response**: 1-3 seconds (for simple, high-quality images)
- **Queued Response**: 5-30 seconds (depending on queue length)
- **Processing Time**: 2-10 seconds per page

### Best Practices

1. **Image Optimization**: Use appropriate image formats and resolutions
2. **Batch Processing**: Submit multiple requests sequentially
3. **Timeout Management**: Set appropriate timeouts for your use case
4. **Error Handling**: Implement retry logic with exponential backoff
5. **Status Polling**: Use reasonable polling intervals (5-10 seconds)

## 🔗 Related Endpoints

- **[OCR Processing](./ocr_processing.md)** - Direct OCR endpoint
- **[Request Management](./request_management.md)** - Status and queue management
- **[Image Enhancement](./image_enhancement.md)** - Pre-processing options

---

**Next**: [Request Management](./request_management.md) - Queue and status management
