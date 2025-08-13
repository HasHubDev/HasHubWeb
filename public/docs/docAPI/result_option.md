# hasHub DocApp — Conversion API

Convert PDFs, images, Office files, and HTML into **Markdown**, **plain text**, or **structured JSON** with optional OCR and layout extraction.

**Base URL**

```
http://doc.hashub.com/api/v1/convert
```

**Authentication**

```
Authorization: Bearer <API_KEY>
```

---

## Endpoints

### 1) Upload & Convert

`POST /api/v1/convert` — multipart/form-data

| Field              | Type        | Required                                 | Values / Notes                                                                                         |
| ------------------ | ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `file`             | file        | yes (when `convert_type="file"`)         | `.pdf, .jpg, .jpeg, .png, .gif, .bmp, .tiff, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .html, .htm, .txt` |
| `convert_type`     | string      | yes                                      | `file` \| `text`                                                                                       |
| `output_format`    | string      | yes                                      | `markdown` \| `txt` \| `md` \| `docx` \| `pdf`                                                         |
| `smart_processing` | bool        | optional                                 | If `true`, use layout-aware pipelines                                                                  |
| `processing_mode`  | string      | optional                                 | See **Processing Modes**                                                                               |
| `ocr_options`      | JSON string | optional (when `smart_processing=false`) | See **OCR Options**                                                                                    |

---

**Queued Response Example**

```json
{
  "status": "success",
  "session_id": "3d1f7fe5-090f-4a69-a6fb-4b4caa1dfcc1",
  "filename": "scan.pdf",
  "mime_type": "application/pdf",
  "message": "File uploaded and queued for processing",
  "check_status_url": "/api/v1/convert/status/3d1f7fe5-090f-4b4caa1dfcc1"
}
```

---

### 2) Check Status

`GET /api/v1/convert/status/{session_id}`

Example (completed):

```json
{
  "session_id": "3d1f7fe5-090f-4a69-a6fb-4b4caa1dfcc1",
  "status": "completed",
  "progress": 100,
  "download_url": "/api/v1/convert/download/3d1f7fe5-090f-4b4caa1dfcc1/converted.md"
}
```

---

### 3) Download Result

`GET /api/v1/convert/download/{session_id}/{filename}`

Auth: header or query param.

---

## Processing Modes

When `smart_processing=true`:

| Mode                       | Output        | Description             |
| -------------------------- | ------------- | ----------------------- |
| `extract_structured_full`  | JSON          | Full layout + structure |
| `extract_text_plain`       | Markdown      | Clean Markdown text     |
| `extract_layout_structure` | JSON          | Minimal layout map      |
| `extract_text_from_bbox`   | JSON/Markdown | From bounding box       |

If `smart_processing=false`, OCR runs with `ocr_options`.

---

## OCR Options

When `smart_processing=false`:

```json
{
  "language": "tur",
  "chunk_size": 5,
  "preset"
  "overrides"
  "enhance_image": {}
}
```

**See:** [Language Codes Guide](languages.md)
**See:** [Image Enhancement Guide](image_enhancement.md)

---

## Examples

### A) Full JSON layout

```bash
curl -X POST "$BASE_URL" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@report.pdf" \
  -F "convert_type=file" \
  -F "output_format=markdown" \
  -F "smart_processing=true" \
  -F "processing_mode=extract_structured_full"
```

### B) Plain Markdown

```bash
-F "smart_processing=true" \
-F "processing_mode=extract_text_plain"
```

### C) Traditional OCR with preset

```bash
-F "smart_processing=false" \
-F 'ocr_options={ "language":"tur", "chunk_size":5, "enhance_options":{ "preset":"scan_medium" } }'
```

---

## Security & Lifecycle

* Files expire after retention period (e.g., 24h)
* Expired downloads → HTTP 410 Gone
* Signed URLs for sharing
* Redis queues used for progress tracking


## endpoint e gelecek yapı
- api_key
- file
- convert_type
- output_format
- filename
- mime_type
- psm_mode: Sayfa segmentasyon modu (default: 6)
- confidence_threshold: Güven eşiği (default: 30)
- smart_processing: Smart OCR kullan (default: False)
- output_format: Çıktı formatı (default: 'markdown') [markdown, text, json]
- processing_mode: İşlem modu (default: 'extract_structured_full')
- ocr_options: OCR seçenekleri (dict)
  - language: OCR dili
  - chunk_size: Chunk boyutu
  - enhance_options: Görüntü iyileştirme seçenekleri
      - preset: Önceden tanımlı preset (e.g., "scan_medium")
      - overrides: Özel ayarlar
      - enhance_image: Görüntü iyileştirme (default: True)



