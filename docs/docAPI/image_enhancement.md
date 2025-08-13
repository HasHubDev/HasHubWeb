# Image Enhancement - Pre-processing Options

## 🎯 Overview

Image enhancement is a crucial step in OCR processing that significantly improves text recognition accuracy. Our enhancement system provides comprehensive pre-processing options to optimize images before text extraction, handling various document types and quality levels.

## 🖼️ Enhancement Options

### Core Enhancement Parameters

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| `grayscale` | boolean | `true` | - | Convert to grayscale for better OCR |
| `auto_contrast` | boolean | `true` | - | Automatically adjust brightness and contrast |
| `brightness` | number | `1.0` | `0.5 - 2.0` | Brightness multiplier |
| `contrast` | number | `1.2` | `0.5 - 2.0` | Contrast multiplier |
| `sharpness` | number | `1.1` | `0.5 - 2.0` | Edge sharpening intensity |
| `blur_radius` | number | `0.5` | `0.0 - 2.0` | Noise reduction blur |
| `threshold` | integer | `null` | `0 - 255` | Binary threshold (null = auto) |
| `invert` | boolean | `false` | - | Invert image colors |
| `deskew` | boolean | `false` | - | Auto-rotate tilted pages |

## 🔧 Enhancement Configuration

### Basic Enhancement

```json
{
  "enhance_options": {
    "grayscale": true,
    "auto_contrast": true,
    "brightness": 1.1,
    "contrast": 1.3
  }
}
```

### Advanced Enhancement with Overrides

```json
{
  "enhance_options": {
    "preset": "scan_medium",
    "overrides": {
      "contrast": 1.4,
      "sharpness": 1.3,
      "blur_radius": 0.3,
      "deskew": true
    }
  }
}
```

## 📋 Predefined Presets

### Document Quality Presets

| Preset | Use Case | Description | Best For |
|--------|----------|-------------|----------|
| `light` | Clean digital scans | Minimal processing | High-quality scans, screenshots |
| `medium` | Standard documents | Balanced enhancement | Typical printed documents |
| `aggressive` | Poor quality scans | Strong enhancement | Degraded photocopies, old documents |

### Scanning Presets

| Preset | Use Case | Description | Best For |
|--------|----------|-------------|----------|
| `scan_light` | Light photocopies | Light noise reduction | Slightly degraded scans |
| `scan_medium` | Medium photocopies | Moderate enhancement | Typical scanned documents |
| `scan_heavy` | Heavy photocopies | Strong enhancement | Heavily degraded scans |

### Specialized Presets

| Preset | Use Case | Description | Best For |
|--------|----------|-------------|----------|
| `handwritten` | Handwritten text | Cursive optimization | Notes, signatures, forms |
| `newspaper` | Printed text | Text-focused enhancement | Newspapers, magazines |
| `technical` | Technical documents | Diagram preservation | Schematics, blueprints |

## 🎨 Parameter Details

### 1. Grayscale Conversion

**Key:** `grayscale`  
**Type:** Boolean  
**Default:** `true`

Converts the image to **black & white shades** only, removing unnecessary color data for faster and more accurate OCR.

**✅ Recommended when:**
- Document has black text on light background
- Color information is not important
- You want to reduce file size
- Working with printed documents

**⚠️ Avoid when:**
- Document uses colored text for meaning
- Color coding is important
- Working with highlighted documents

**Example:**
```json
{
  "enhance_options": {
    "grayscale": true
  }
}
```

### 2. Auto Contrast

**Key:** `auto_contrast`  
**Type:** Boolean  
**Default:** `true`

Automatically adjusts brightness and contrast to maximize text visibility.

**✅ Recommended when:**
- Scan looks faded or washed-out
- Document has uneven lighting
- Old printed documents
- Poor quality photocopies

**Example:**
```json
{
  "enhance_options": {
    "auto_contrast": true
  }
}
```

### 3. Brightness Adjustment

**Key:** `brightness`  
**Type:** Number  
**Default:** `1.0`  
**Range:** `0.5 - 2.0`

Adjusts image lightness. Values **< 1.0** make darker, values **> 1.0** make lighter.

**✅ Example Uses:**
- `0.8` → Reduce glare from bright scans
- `1.2` → Lighten dark text in poor photocopies
- `0.9` → Slightly darken overexposed images

**Example:**
```json
{
  "enhance_options": {
    "brightness": 1.2
  }
}
```

### 4. Contrast Adjustment

**Key:** `contrast`  
**Type:** Number  
**Default:** `1.2`  
**Range:** `0.5 - 2.0`

Controls difference between light and dark areas. Higher contrast makes text stand out more.

**✅ Example Uses:**
- `1.4` → Enhance faint typewritten text
- `1.1` → Normal printed text
- `1.6` → Very faint or degraded text

**Example:**
```json
{
  "enhance_options": {
    "contrast": 1.4
  }
}
```

### 5. Sharpness Enhancement

**Key:** `sharpness`  
**Type:** Number  
**Default:** `1.1`  
**Range:** `0.5 - 2.0`

Enhances edge definition, making text strokes more distinct.

**✅ Example Uses:**
- `1.3` → Blurry scans or low-DPI images
- `1.0` → Already sharp images
- `1.5` → Very blurry documents

**⚠️ Tip:** Avoid very high values on already sharp images (may create noise).

**Example:**
```json
{
  "enhance_options": {
    "sharpness": 1.3
  }
}
```

### 6. Gaussian Blur (Noise Reduction)

**Key:** `blur_radius`  
**Type:** Number  
**Default:** `0.5`  
**Range:** `0.0 - 2.0`

Applies soft blur to remove random dots and scanning noise.

**✅ Example Uses:**
- `0.3` → Small speckled noise
- `1.0` → Heavily degraded photocopies
- `0.0` → Clean digital images

**⚠️ Tip:** Too much blur makes text edges fuzzy and reduces accuracy.

**Example:**
```json
{
  "enhance_options": {
    "blur_radius": 0.3
  }
}
```

### 7. Threshold Binarization

**Key:** `threshold`  
**Type:** Integer  
**Default:** `null` (auto)  
**Range:** `0 - 255`

Converts image to pure black and white using brightness threshold. Anything darker than threshold becomes black; lighter becomes white.

**✅ Example Uses:**
- `170` → Clean typewritten pages
- `150` → Dark printed text
- `200` → Light text on dark background

**Example:**
```json
{
  "enhance_options": {
    "threshold": 170
  }
}
```

### 8. Invert Colors

**Key:** `invert`  
**Type:** Boolean  
**Default:** `false`

Flips all colors — black text becomes white and vice versa.

**✅ Use when:**
- White text on black background
- Inverted documents
- Negative images

**Example:**
```json
{
  "enhance_options": {
    "invert": true
  }
}
```

### 9. Deskew (Straighten Text)

**Key:** `deskew`  
**Type:** Boolean  
**Default:** `false`

Automatically rotates slightly tilted pages so text lines are horizontal.

**✅ Use when:**
- Scanned pages are slightly rotated
- Text appears tilted
- Improving OCR accuracy on skewed scans

**Example:**
```json
{
  "enhance_options": {
    "deskew": true
  }
}
```

## 🔄 Preset Overrides

### Starting from a Preset

You can start with a preset and override specific settings:

```json
{
  "enhance_options": {
    "preset": "scan_medium",
    "overrides": {
      "contrast": 1.5,
      "sharpness": 1.3,
      "blur_radius": 0.2
    }
  }
}
```

### Custom Preset Creation

Create your own preset by combining parameters:

```json
{
  "enhance_options": {
    "grayscale": true,
    "auto_contrast": true,
    "brightness": 1.1,
    "contrast": 1.4,
    "sharpness": 1.2,
    "blur_radius": 0.3,
    "deskew": true
  }
}
```

## 📊 Enhancement Strategies by Document Type

### Printed Documents

```json
{
  "enhance_options": {
    "preset": "medium",
    "overrides": {
      "contrast": 1.3,
      "sharpness": 1.1
    }
  }
}
```

### Scanned Photocopies

```json
{
  "enhance_options": {
    "preset": "scan_medium",
    "overrides": {
      "contrast": 1.5,
      "blur_radius": 0.4,
      "deskew": true
    }
  }
}
```

### Handwritten Notes

```json
{
  "enhance_options": {
    "preset": "handwritten",
    "overrides": {
      "sharpness": 1.4,
      "contrast": 1.6,
      "blur_radius": 0.2
    }
  }
}
```

### Old/Degraded Documents

```json
{
  "enhance_options": {
    "preset": "aggressive",
    "overrides": {
      "brightness": 1.3,
      "contrast": 1.8,
      "sharpness": 1.5,
      "blur_radius": 0.8
    }
  }
}
```

### Digital Screenshots

```json
{
  "enhance_options": {
    "preset": "light",
    "overrides": {
      "grayscale": false,
      "auto_contrast": true
    }
  }
}
```

## 🔧 API Integration Examples

### OCR Request with Enhancement

```python
import requests
import base64

# Encode image
with open("document.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()
    image_url = f"data:image/png;base64,{image_data}"

# Submit OCR request with enhancement
response = requests.post(
    "http://localhost:8000/api/v1/ocr",
    json={
        "image": image_url,
        "prompt_mode": "prompt_layout_all_en",
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

### Chat Completions with Enhancement

```python
response = requests.post(
    "http://localhost:8000/api/v1/chat/completions",
    json={
        "model": "dots-ocr",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Extract text from this document"},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ],
        "enhance_options": {
            "preset": "handwritten",
            "overrides": {
                "sharpness": 1.4,
                "contrast": 1.6
            }
        }
    }
)
```

## 📈 Performance Impact

### Processing Time

| Enhancement Level | Time Impact | Quality Improvement |
|-------------------|-------------|-------------------|
| Light (preset) | +5-10% | +15-25% |
| Medium (preset) | +10-20% | +25-40% |
| Heavy (custom) | +20-35% | +40-60% |

### Memory Usage

- **Basic enhancement**: +10-20% memory
- **Advanced enhancement**: +20-40% memory
- **Custom presets**: +15-30% memory

## 🚨 Best Practices

### Do's

1. **Start with presets** for common document types
2. **Test enhancement settings** on sample documents
3. **Use deskew** for rotated scans
4. **Adjust contrast** before brightness
5. **Monitor OCR accuracy** with different settings

### Don'ts

1. **Don't over-enhance** already good images
2. **Avoid extreme values** for any parameter
3. **Don't skip testing** on your specific document types
4. **Avoid unnecessary blur** on clean images

## 🔍 Troubleshooting

### Common Issues

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| Text appears blurry | Too much blur_radius | Reduce blur_radius to 0.2-0.5 |
| Text too faint | Low contrast | Increase contrast to 1.4-1.6 |
| Image too dark | Low brightness | Increase brightness to 1.2-1.4 |
| Noise in output | Too much sharpness | Reduce sharpness to 1.0-1.2 |

### Enhancement Validation

Test your enhancement settings:

```python
def test_enhancement_settings(image_path, settings_list):
    results = []
    
    for settings in settings_list:
        # Test OCR with different enhancement settings
        response = requests.post(
            "http://localhost:8000/api/v1/ocr",
            json={
                "image": encode_image(image_path),
                "enhance_options": settings
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            results.append({
                "settings": settings,
                "confidence": result.get("confidence", 0),
                "text_length": len(result.get("text", ""))
            })
    
    return results
```

---

**Next**: [Supported Languages](./supported_languages.md) - Language codes and OCR support
