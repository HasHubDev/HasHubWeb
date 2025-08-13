# Request Management - Queue and Status Monitoring

## 🎯 Overview

The Request Management endpoints provide comprehensive control over OCR processing requests, including status monitoring, queue management, and request lifecycle operations. These endpoints are essential for managing asynchronous OCR operations and monitoring system performance.

## 📡 Core Endpoints

### 1. Request Status Check

**Endpoint:** `GET /api/v1/requests/{request_id}`

**Description:** Check the current status and results of a specific OCR request.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `request_id` | string | ✅ | Unique identifier for the request |

**Response Examples:**

#### Completed Request
```json
{
  "request_id": "req_123456789",
  "status": "completed",
  "created_at": "2024-01-01T12:00:00",
  "started_at": "2024-01-01T12:00:01",
  "completed_at": "2024-01-01T12:00:05",
  "result": {
    "text": "Extracted text content...",
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

#### Queued Request
```json
{
  "request_id": "req_123456789",
  "status": "queued",
  "created_at": "2024-01-01T12:00:00",
  "started_at": null,
  "completed_at": null,
  "queue_position": 3,
  "estimated_wait_time": 45,
  "result": null,
  "error": null
}
```

#### Processing Request
```json
{
  "request_id": "req_123456789",
  "status": "processing",
  "created_at": "2024-01-01T12:00:00",
  "started_at": "2024-01-01T12:00:01",
  "completed_at": null,
  "progress": 65,
  "result": null,
  "error": null
}
```

#### Failed Request
```json
{
  "request_id": "req_123456789",
  "status": "failed",
  "created_at": "2024-01-01T12:00:00",
  "started_at": "2024-01-01T12:00:01",
  "completed_at": "2024-01-01T12:00:03",
  "result": null,
  "error": {
    "code": "OCR_ENGINE_ERROR",
    "message": "Failed to process image",
    "details": "Image format not supported"
  },
  "processing_time_seconds": 2.0
}
```

### 2. List All Requests

**Endpoint:** `GET /api/v1/requests`

**Description:** Retrieve a paginated list of all requests with optional filtering.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `status` | string | ❌ | - | Filter by status (queued, processing, completed, failed, cancelled) |
| `limit` | integer | ❌ | 50 | Maximum number of requests to return |
| `offset` | integer | ❌ | 0 | Number of requests to skip |
| `start_date` | string | ❌ | - | Filter requests created after this date (ISO 8601) |
| `end_date` | string | ❌ | - | Filter requests created before this date (ISO 8601) |

**Response:**
```json
{
  "requests": [
    {
      "request_id": "req_123456789",
      "status": "completed",
      "created_at": "2024-01-01T12:00:00",
      "processing_time_seconds": 4.0
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "has_more": true
  }
}
```

### 3. Request Summary

**Endpoint:** `GET /api/v1/requests/status/summary`

**Description:** Get a comprehensive summary of request statistics and system health.

**Response:**
```json
{
  "total_requests": 100,
  "completed_requests": 85,
  "pending_requests": 10,
  "processing_requests": 3,
  "failed_requests": 1,
  "cancelled_requests": 1,
  "average_processing_time": 45.2,
  "success_rate": 0.85,
  "queue_length": 10,
  "system_status": "healthy",
  "last_updated": "2024-01-01T12:00:00"
}
```

### 4. Cancel Request

**Endpoint:** `DELETE /api/v1/requests/{request_id}`

**Description:** Cancel a pending or processing request.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `request_id` | string | ✅ | Unique identifier for the request to cancel |

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `reason` | string | ❌ | "manual" | Reason for cancellation |

**Response:**
```json
{
  "request_id": "req_123456789",
  "status": "cancelled",
  "cancelled_at": "2024-01-01T12:00:02",
  "reason": "manual",
  "message": "Request cancelled successfully"
}
```

### 5. Cleanup Old Requests

**Endpoint:** `POST /api/v1/requests/cleanup`

**Description:** Remove completed, failed, or cancelled requests older than specified age.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `max_age_hours` | integer | ❌ | 24 | Maximum age of requests to keep (in hours) |
| `status` | string | ❌ | "all" | Status of requests to clean up |

**Response:**
```json
{
  "cleaned_requests": 45,
  "remaining_requests": 55,
  "message": "Cleanup completed successfully"
}
```

## 🔄 Queue Management

### 1. Queue Status

**Endpoint:** `GET /api/v1/queue-status`

**Description:** Get detailed information about the current queue state.

**Response:**
```json
{
  "queue_length": 15,
  "active_workers": 3,
  "max_workers": 5,
  "queue_status": "active",
  "estimated_wait_time": 120,
  "recent_requests": [
    {
      "request_id": "req_123456789",
      "status": "queued",
      "queue_position": 1,
      "created_at": "2024-01-01T12:00:00"
    }
  ],
  "worker_status": [
    {
      "worker_id": "worker_1",
      "status": "processing",
      "current_request": "req_123456789",
      "started_at": "2024-01-01T12:00:01"
    }
  ]
}
```

### 2. Active Requests

**Endpoint:** `GET /api/v1/active-requests`

**Description:** Get a list of currently active (processing) requests.

**Response:**
```json
{
  "active_requests": [
    {
      "request_id": "req_123456789",
      "worker_id": "worker_1",
      "started_at": "2024-01-01T12:00:01",
      "progress": 75,
      "estimated_completion": "2024-01-01T12:00:06"
    }
  ],
  "total_active": 3
}
```

### 3. Clear Completed Requests

**Endpoint:** `POST /api/v1/clear-completed`

**Description:** Remove all completed requests from the system.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `max_age_hours` | integer | ❌ | 1 | Maximum age of completed requests to keep |

**Response:**
```json
{
  "cleared_requests": 25,
  "remaining_requests": 30,
  "message": "Completed requests cleared successfully"
}
```

## ⏱️ Timeout Management

### 1. Get Timeout Settings

**Endpoint:** `GET /api/v1/timeout-settings`

**Description:** Retrieve current timeout configuration.

**Response:**
```json
{
  "request_timeout": 300,
  "queue_timeout": 3600,
  "worker_timeout": 1800,
  "polling_interval": 5,
  "max_retries": 3
}
```

### 2. Update Timeout Settings

**Endpoint:** `POST /api/v1/update-timeout-settings`

**Description:** Update timeout configuration (admin only).

**Request Body:**
```json
{
  "request_timeout": 600,
  "queue_timeout": 7200,
  "worker_timeout": 3600,
  "polling_interval": 10,
  "max_retries": 5
}
```

**Response:**
```json
{
  "message": "Timeout settings updated successfully",
  "new_settings": {
    "request_timeout": 600,
    "queue_timeout": 7200,
    "worker_timeout": 3600,
    "polling_interval": 10,
    "max_retries": 5
  }
}
```

## 💓 Client Management

### 1. Client Heartbeat

**Endpoint:** `POST /api/v1/heartbeat`

**Description:** Send a heartbeat to keep client connection alive.

**Request Body:**
```json
{
  "client_id": "client_123",
  "timestamp": "2024-01-01T12:00:00"
}
```

**Response:**
```json
{
  "status": "alive",
  "server_time": "2024-01-01T12:00:00",
  "queue_status": "healthy"
}
```

### 2. Client Status

**Endpoint:** `GET /api/v1/client-status/{client_id}`

**Description:** Get status information for a specific client.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | ✅ | Unique client identifier |

**Response:**
```json
{
  "client_id": "client_123",
  "status": "active",
  "last_heartbeat": "2024-01-01T12:00:00",
  "active_requests": 2,
  "total_requests": 15,
  "connection_established": "2024-01-01T10:00:00"
}
```

### 3. Client Disconnect

**Endpoint:** `POST /api/v1/disconnect/{client_id}`

**Description:** Gracefully disconnect a client and clean up resources.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | ✅ | Unique client identifier |

**Response:**
```json
{
  "client_id": "client_123",
  "status": "disconnected",
  "disconnected_at": "2024-01-01T12:00:00",
  "cleaned_requests": 2,
  "message": "Client disconnected successfully"
}
```

## 📝 Log Management

### 1. List Log Files

**Endpoint:** `GET /api/v1/logs`

**Description:** Get a list of available log files.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `level` | string | ❌ | - | Filter by log level (DEBUG, INFO, WARNING, ERROR) |
| `date` | string | ❌ | - | Filter by date (YYYY-MM-DD) |

**Response:**
```json
{
  "log_files": [
    {
      "filename": "app_2024-01-01.log",
      "size_bytes": 1024000,
      "last_modified": "2024-01-01T12:00:00",
      "log_levels": ["INFO", "WARNING", "ERROR"]
    }
  ],
  "total_files": 10
}
```

### 2. Get Log Content

**Endpoint:** `GET /api/v1/logs/{filename}`

**Description:** Retrieve log file content with optional filtering.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | string | ✅ | Name of the log file |

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lines` | integer | ❌ | 100 | Number of lines to return |
| `level` | string | ❌ | - | Filter by log level |
| `search` | string | ❌ | - | Search term in log content |

**Response:**
```json
{
  "filename": "app_2024-01-01.log",
  "content": [
    "2024-01-01 12:00:00 INFO: Server started successfully",
    "2024-01-01 12:00:01 INFO: Processing request req_123456789"
  ],
  "total_lines": 1500,
  "filtered_lines": 2
}
```

### 3. Log Statistics

**Endpoint:** `GET /api/v1/logs/stats`

**Description:** Get log file statistics and system information.

**Response:**
```json
{
  "total_log_files": 10,
  "total_size_bytes": 10485760,
  "oldest_log": "2023-12-25",
  "newest_log": "2024-01-01",
  "log_levels": {
    "DEBUG": 1500,
    "INFO": 5000,
    "WARNING": 500,
    "ERROR": 100
  },
  "system_info": {
    "uptime": "7 days, 12 hours",
    "memory_usage": "512MB",
    "disk_usage": "2.1GB"
  }
}
```

### 4. Search Logs

**Endpoint:** `GET /api/v1/logs/search`

**Description:** Search across all log files for specific content.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | ✅ | - | Search term |
| `level` | string | ❌ | - | Filter by log level |
| `start_date` | string | ❌ | - | Search from date |
| `end_date` | string | ❌ | - | Search to date |
| `limit` | integer | ❌ | 50 | Maximum results to return |

**Response:**
```json
{
  "query": "error",
  "results": [
    {
      "filename": "app_2024-01-01.log",
      "line_number": 45,
      "content": "2024-01-01 12:00:00 ERROR: Failed to process image",
      "timestamp": "2024-01-01T12:00:00"
    }
  ],
  "total_results": 25,
  "search_time_ms": 150
}
```

## 🔍 Status Monitoring Workflow

### 1. Submit OCR Request
```bash
curl -X POST "http://localhost:8000/api/v1/ocr" \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/png;base64,..."}'
```

### 2. Extract Request ID
```python
response = requests.post("http://localhost:8000/api/v1/ocr", json=payload)
request_id = response.json()["request_id"]
```

### 3. Monitor Status
```python
import time

def monitor_request(request_id, max_wait=300):
    start_time = time.time()
    
    while time.time() - start_time < max_wait:
        response = requests.get(f"http://localhost:8000/api/v1/requests/{request_id}")
        
        if response.status_code == 200:
            data = response.json()
            
            if data["status"] == "completed":
                return data["result"]
            elif data["status"] == "failed":
                raise Exception(f"OCR failed: {data.get('error', 'Unknown error')}")
            elif data["status"] in ["queued", "processing"]:
                print(f"Status: {data['status']}, Progress: {data.get('progress', 0)}%")
                time.sleep(5)
                continue
            else:
                raise Exception(f"Unexpected status: {data['status']}")
        else:
            raise Exception(f"Status check failed: {response.status_code}")
    
    raise Exception("Timeout waiting for completion")
```

### 4. Handle Results
```python
try:
    result = monitor_request(request_id)
    print(f"Extracted text: {result['text']}")
    print(f"Confidence: {result['confidence']}")
except Exception as e:
    print(f"Error: {e}")
```

## 🚨 Error Handling

### Common Error Scenarios

| Error Code | Description | Solution |
|------------|-------------|----------|
| `404` | Request not found | Verify request ID is correct |
| `400` | Invalid parameters | Check query parameter format |
| `500` | Server error | Check server logs and retry |
| `503` | Service unavailable | Check OCR engine status |

### Error Response Format

```json
{
  "error": {
    "code": "REQUEST_NOT_FOUND",
    "message": "Request with ID req_123456789 not found",
    "details": {
      "request_id": "req_123456789",
      "suggestion": "Check if the request ID is correct"
    }
  }
}
```

## 📊 Performance Monitoring

### Key Metrics to Monitor

1. **Queue Length**: Number of pending requests
2. **Processing Time**: Average time per request
3. **Success Rate**: Percentage of successful requests
4. **Error Rate**: Frequency of failed requests
5. **Worker Utilization**: Active vs. idle workers

### Monitoring Dashboard

Use the summary endpoint to build a real-time monitoring dashboard:

```python
import requests
import time

def get_system_health():
    response = requests.get("http://localhost:8000/api/v1/requests/status/summary")
    return response.json()

def monitor_system():
    while True:
        health = get_system_health()
        
        print(f"Queue Length: {health['queue_length']}")
        print(f"Success Rate: {health['success_rate']:.2%}")
        print(f"Avg Processing Time: {health['average_processing_time']:.1f}s")
        
        time.sleep(30)  # Update every 30 seconds
```

---

**Next**: [Image Enhancement](./image_enhancement.md) - Pre-processing options and settings
