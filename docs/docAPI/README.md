# FastAPI OCR Server - Complete API Documentation

## 🚀 Overview

FastAPI OCR Server is a high-performance, asynchronous OCR (Optical Character Recognition) API service built with FastAPI. It provides intelligent text extraction from images and documents with advanced processing capabilities, request queuing, and OpenAI-compatible interfaces.

## ✨ Key Features

- **🔄 Asynchronous Processing**: Built with FastAPI for high-performance async operations
- **📋 Request Queuing**: Intelligent queue management for handling multiple requests
- **🤖 Smart OCR**: Advanced text extraction with layout awareness
- **🔌 OpenAI Compatible**: Drop-in replacement for OpenAI chat completions API
- **🌍 Multi-language Support**: 50+ languages including Turkish, English, Arabic, Chinese, etc.
- **🖼️ Image Enhancement**: Pre-processing options for better OCR accuracy
- **📊 Real-time Monitoring**: Request status tracking and progress monitoring
- **⚡ Scalable Architecture**: Redis-backed queue system with background processing

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │───▶│  FastAPI Server │───▶│   OCR Engine    │
│                 │    │                 │    │   (dots-ocr)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Redis Queue   │
                       │                 │
                       └─────────────────┘
```

## 📡 API Endpoints

### Base URL
```
http://localhost:8000
```

### API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔧 Quick Start

### 1. Docker Installation
```bash
# Build the server
docker build -t fastapi-ocr-server .

# Run the server
docker run -p 8000:8000 fastapi-ocr-server
```

### 2. Docker Compose (Recommended)
```yaml
# docker-compose.yml
version: '3.8'
services:
  fastapi-ocr:
    build: .
    ports:
      - "8000:8000"
    environment:
      - HOST=0.0.0.0
      - PORT=8000
      - DEBUG=false
    volumes:
      - ./logs:/app/logs
      - ./weights:/app/weights
    depends_on:
      - redis
      - dots-ocr

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --requirepass SoorglaRedis2024!SecurePass
```

```bash
docker-compose up -d
```

## 📚 Documentation Sections

1. **[OCR Processing](./ocr_processing.md)** - Core OCR endpoints and workflows
2. **[Chat Completions](./chat_completions.md)** - OpenAI-compatible interface
3. **[Request Management](./request_management.md)** - Queue and status management
4. **[Image Enhancement](./image_enhancement.md)** - Pre-processing options
5. **[Supported Languages](./supported_languages.md)** - Language codes and support
6. **[Examples & Use Cases](./examples.md)** - Practical implementation examples
7. **[Error Handling](./error_handling.md)** - Common errors and solutions

## 🔑 Authentication

Currently, the API runs without authentication for development. For production use, implement proper authentication mechanisms.

## 📊 Performance

- **Processing Speed**: 2-10 seconds per page (depending on image quality)
- **Concurrent Requests**: Unlimited (queued processing)
- **Memory Usage**: ~500MB per concurrent request
- **Supported Formats**: PNG, JPG, JPEG, GIF, BMP, TIFF, PDF

## 🤝 Contributing

This documentation is maintained alongside the FastAPI OCR Server. For technical questions or contributions, please refer to the main project repository.

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**API Status**: Production Ready
