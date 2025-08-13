# OCR Processing - Core API Endpoints

## 🎯 Overview

The OCR Processing endpoints provide the core functionality for extracting text from images and documents. These endpoints support both synchronous and asynchronous processing modes, with intelligent queuing and status monitoring.

## 📡 Core Endpoints

### 1. OCR Request (Primary Endpoint)

**Endpoint:** `POST /api/v1/ocr`

**Description:** Submit an image for OCR processing with customizable options.

**Request Body:**
```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "prompt_mode": "prompt_layout_all_en",
  "timeout": 300,
  "enhance_options": {
    "preset": "scan_medium",
    "overrides": {
      "contrast": 1.3,
      "sharpness": 1.2
    }
  }
}
```

**Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `image` | string | ✅ | - | Base64 encoded image data (data URL format) |
| `prompt_mode` | string | ❌ | `prompt_layout_all_en` | Processing mode for text extraction |
| `timeout` | integer | ❌ | 300 | Request timeout in seconds |
| `enhance_options` | object | ❌ | - | Image enhancement settings |

**Response (Queued):**
```json
{
  "request_id": "req_123456789",
  "status": "queued",
  "message": "Request added to processing queue",
  "estimated_wait_time": 15
}
```

**Response (Immediate - if fast processing):**
```json
{
  "request_id": "req_123456789",
  "status": "completed",
  "result": {
    "text": "Extracted text content...",
    "confidence": 0.95,
    "layout": {
      "blocks": [...],
      "lines": [...],
      "words": [...]
    }
  },
  "processing_time_seconds": 2.5
}
```

### 2. Legacy Process Endpoint

**Endpoint:** `POST /api/v1/process`

**Description:** Legacy endpoint for backward compatibility. Automatically redirects to `/api/v1/ocr`.

**Note:** This endpoint is maintained for existing integrations but new applications should use `/api/v1/ocr`.

## 🔄 Processing Workflow

### 1. Submit Request
```bash
curl -X POST "http://localhost:8000/api/v1/ocr" \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "prompt_mode": "prompt_layout_all_en",
    "timeout": 300
  }'
```

### 2. Check Status
```bash
curl "http://localhost:8000/api/v1/requests/req_123456789"
```

### 3. Retrieve Results
```json
{
  "request_id": "req_123456789",
  "status": "completed",
  "created_at": "2024-01-01T12:00:00",
  "started_at": "2024-01-01T12:00:01",
  "completed_at": "2024-01-01T12:00:05",
  "result": {
    "text": "Complete extracted text...",
    "confidence": 0.95,
    "layout": {
      "blocks": [
        {
          "bbox": [x1, y1, x2, y2],
          "text": "Block text content",
          "confidence": 0.98
        }
      ],
      "lines": [...],
      "words": [...]
    }
  },
  "processing_time_seconds": 4.0,
  "error": null
}
```

## 🎨 Prompt Modes

### Available Modes

| Mode | Description | Layout Aware | Output Format |
|------|-------------|--------------|---------------|
| `prompt_layout_all_en` | Extract all text with layout in English | ✅ | JSON with layout |
| `prompt_layout_all_tr` | Extract all text with layout in Turkish | ✅ | JSON with layout |
| `prompt_text_only_en` | Extract only text content in English | ❌ | Plain text |
| `prompt_text_only_tr` | Extract only text content in Turkish | ❌ | Plain text |

### Custom Prompt Modes

You can define custom prompt modes by extending the system. Each mode can specify:
- Language preference
- Layout awareness
- Text extraction strategy
- Output formatting

## 🖼️ Image Enhancement

### Enhancement Options

```json
{
  "enhance_options": {
    "preset": "scan_medium",
    "overrides": {
      "grayscale": true,
      "auto_contrast": true,
      "brightness": 1.1,
      "contrast": 1.3,
      "sharpness": 1.2,
      "blur_radius": 0.3,
      "threshold": 170,
      "invert": false,
      "deskew": true
    }
  }
}
```

### Available Presets

| Preset | Use Case | Description |
|--------|----------|-------------|
| `light` | Clean digital scans | Minimal processing |
| `medium` | Standard documents | Balanced enhancement |
| `aggressive` | Poor quality scans | Strong enhancement |
| `scan_light` | Light photocopies | Light noise reduction |
| `scan_medium` | Medium photocopies | Moderate enhancement |
| `handwritten` | Handwritten text | Optimized for cursive |

## ⏱️ Timeout Management

### Request Timeouts

- **Default Timeout**: 300 seconds (5 minutes)
- **Maximum Timeout**: 1800 seconds (30 minutes)
- **Queue Timeout**: 3600 seconds (1 hour)

### Timeout Behavior

1. **Request Submission**: Fast (usually < 1 second)
2. **Queue Processing**: Depends on queue length
3. **OCR Processing**: 2-10 seconds per page
4. **Result Retrieval**: Immediate once completed

## 🔍 Status Codes

### Request Status Values

| Status | Description | Next Action |
|--------|-------------|-------------|
| `queued` | Request is waiting in queue | Poll status every 5-10 seconds |
| `processing` | OCR is actively running | Continue polling |
| `completed` | Successfully processed | Retrieve results |
| `failed` | Processing failed | Check error details |
| `cancelled` | Request was cancelled | Submit new request if needed |
| `timeout` | Request exceeded timeout | Check timeout settings |

## 📊 Performance Tips

### For Best Results

1. **Image Quality**: Use high-resolution images (300+ DPI)
2. **Format**: PNG or TIFF for best quality
3. **Enhancement**: Use appropriate presets for document type
4. **Language**: Specify correct language for better accuracy
5. **Batch Processing**: Submit multiple requests sequentially

### Queue Management

- Monitor queue length with `/api/v1/queue-status`
- Use appropriate timeouts for your use case
- Implement exponential backoff for status polling
- Clean up completed requests periodically

## 🚨 Error Handling

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `400` | Invalid request format | Check JSON structure and image encoding |
| `413` | Image too large | Reduce image size or resolution |
| `422` | Validation error | Verify parameter types and ranges |
| `500` | Server error | Check server logs and retry |
| `503` | Service unavailable | Check OCR engine status |

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid image format",
    "details": {
      "field": "image",
      "issue": "Base64 encoding required"
    }
  }
}
```

## 📝 Examples

### Basic OCR Request

```python
import requests
import base64

# Encode image
with open("document.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()
    image_url = f"data:image/png;base64,{image_data}"

# Submit request
response = requests.post(
    "http://localhost:8000/api/v1/ocr",
    json={
        "image": image_url,
        "prompt_mode": "prompt_layout_all_en"
    }
)

request_id = response.json()["request_id"]
```

### Enhanced OCR with Custom Settings

```python
response = requests.post(
    "http://localhost:8000/api/v1/ocr",
    json={
        "image": image_url,
        "prompt_mode": "prompt_layout_all_tr",
        "timeout": 600,
        "enhance_options": {
            "preset": "scan_medium",
            "overrides": {
                "contrast": 1.4,
                "sharpness": 1.3,
                "deskew": True
            }
        }
    }
)
```

---

**Next**: [Chat Completions API](./chat_completions.md) - OpenAI-compatible interface
