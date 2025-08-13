# OCR Modes

HashHub provides three distinct OCR modes, each optimized for different use cases and performance requirements.

## Fast OCR

**Best for**: High-volume document processing where speed is critical

### Key Features
- **Ultra-fast processing**: 2-5 seconds per document
- **High accuracy**: 95%+ accuracy on clean documents
- **Batch processing**: Process multiple documents simultaneously
- **Cost-effective**: Lowest pricing tier

### Supported Formats
- PDF (single and multi-page)
- Images: PNG, JPG, JPEG, BMP, TIFF
- Maximum file size: 10MB

### Use Cases
- Invoice processing
- Receipt digitization
- Form data extraction
- Bulk document scanning

### API Endpoint
```
POST /v1/doc/ocr/fast
```

### Example Request
```bash
curl -X POST "https://api.hashub.ai/v1/doc/ocr/fast" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@document.pdf" \
  -F "lang=en"
```

## Chat OCR

**Best for**: Interactive document analysis with AI-powered question answering

### Key Features
- **AI-powered analysis**: Ask questions about document content
- **Contextual understanding**: Understands document structure and relationships
- **Multi-turn conversations**: Follow-up questions supported
- **Smart extraction**: Automatically identifies key information

### Supported Questions
- "What is the total amount on this invoice?"
- "Who is the sender of this document?"
- "Extract all phone numbers and email addresses"
- "Summarize the main points of this contract"

### Use Cases
- Invoice analysis and validation
- Contract review and extraction
- Legal document analysis
- Medical record processing

### API Endpoint
```
POST /v1/doc/chat
```

### Example Request
```bash
curl -X POST "https://api.hashub.ai/v1/doc/chat" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@invoice.pdf" \
  -F "question=What is the total amount?"
```

## GeoText OCR

**Best for**: Applications requiring precise text positioning and coordinates

### Key Features
- **Pixel-perfect coordinates**: X, Y coordinates for every text element
- **Bounding boxes**: Complete positioning information
- **Layout preservation**: Maintains original document structure
- **Font information**: Size, style, and formatting details

### Output Format
```json
{
  "text_blocks": [
    {
      "text": "Invoice #12345",
      "bbox": [100, 50, 200, 80],
      "confidence": 0.98,
      "font_size": 14
    }
  ]
}
```

### Use Cases
- Document layout analysis
- Form field mapping
- Template matching
- Document comparison

### API Endpoint
```
POST /v1/doc/ocr/geo
```

### Example Request
```bash
curl -X POST "https://api.hashub.ai/v1/doc/ocr/geo" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@document.pdf" \
  -F "format=json"
```

## Choosing the Right Mode

| Feature | Fast OCR | Chat OCR | GeoText OCR |
|---------|----------|----------|-------------|
| **Speed** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Accuracy** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Cost** | $ | $$ | $$ |
| **Text Extraction** | ✅ | ✅ | ✅ |
| **AI Analysis** | ❌ | ✅ | ❌ |
| **Coordinates** | ❌ | ❌ | ✅ |
| **Q&A** | ❌ | ✅ | ❌ |

## Performance Specifications

### Processing Time
- **Fast OCR**: 2-5 seconds per page
- **Chat OCR**: 5-15 seconds per page (includes AI analysis)
- **GeoText OCR**: 3-8 seconds per page

### Accuracy Rates
- **Clean documents**: 98-99% across all modes
- **Scanned documents**: 95-97% accuracy
- **Handwritten text**: 85-90% accuracy (Chat OCR performs best)
- **Multi-language**: 90-95% accuracy with proper language detection

### Rate Limits
- **Free Tier**: 100 requests/hour per mode
- **Starter**: 1,000 requests/hour per mode
- **Professional**: 10,000 requests/hour per mode
- **Enterprise**: Custom limits available

## Best Practices

### Document Quality
1. **Resolution**: Minimum 300 DPI for optimal results
2. **Format**: PDF preferred for multi-page documents
3. **Lighting**: Even lighting, avoid shadows
4. **Orientation**: Ensure text is properly oriented

### Language Detection
1. Set the `lang` parameter when possible
2. Use `auto` for automatic language detection
3. Multi-language documents: specify primary language

### Error Handling
1. Implement retry logic with exponential backoff
2. Check response status codes
3. Handle rate limit errors gracefully
4. Validate file formats before upload

## Migration Guide

### From Fast OCR to Chat OCR
```python
# Before: Fast OCR
response = client.ocr.fast(file=document, lang="en")
text = response.text

# After: Chat OCR
response = client.ocr.chat(
    file=document, 
    question="Extract all text from this document"
)
text = response.answer
```

### From Chat OCR to GeoText OCR
```python
# Before: Chat OCR for coordinates (not available)
# Limited to text extraction only

# After: GeoText OCR
response = client.ocr.geo(file=document, format="json")
for block in response.text_blocks:
    print(f"Text: {block.text}, Position: {block.bbox}")
```
