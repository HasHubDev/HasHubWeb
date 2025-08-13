# 📷 Image Enhancement Options for OCR

When extracting text from scanned PDFs or images, **image quality directly affects OCR accuracy**.  
Our enhancement settings allow you to pre-process your documents before text recognition, reducing noise, improving contrast, and sharpening text edges.

This guide explains each enhancement option in detail, including recommended scenarios.

---

## 1️⃣ Grayscale Conversion
**Key:** `grayscale`  
**Type:** Boolean (`true` / `false`)  
**Default:** `true`

Converts the image to **black & white shades** only.  
This removes unnecessary color data, making OCR faster and often more accurate.

**✅ Recommended when:**
- Your document is black text on a light background.
- You want to reduce file size.

**⚠️ Avoid when:**
- The document uses colored text for important meaning (e.g., annotations, highlights).

---

## 2️⃣ Auto Contrast
**Key:** `auto_contrast`  
**Type:** Boolean  
**Default:** `true`

Automatically adjusts the brightness and contrast of the image to **maximize visibility of text**.

**✅ Recommended when:**
- The scan looks faded, washed-out, or too dark.
- Old printed documents with uneven lighting.

---

## 3️⃣ Brightness Adjustment
**Key:** `brightness`  
**Type:** Number (`0.5 – 2.0`)  
**Default:** `1.0` (no change)

Adjusts how light or dark the image appears.  
Values **< 1.0** make the image darker; values **> 1.0** make it lighter.

**✅ Example Uses:**
- `0.8` → Reduce glare from overly bright scans.
- `1.2` → Lighten dark text in poor-quality photocopies.

---

## 4️⃣ Contrast Adjustment
**Key:** `contrast`  
**Type:** Number (`0.5 – 2.0`)  
**Default:** `1.2`

Controls the difference between light and dark areas of the image.  
Higher contrast often makes text stand out more.

**✅ Example Uses:**
- `1.4` for faint typewritten text.
- `1.1` for normal printed text.

---

## 5️⃣ Sharpness Enhancement
**Key:** `sharpness`  
**Type:** Number (`0.5 – 2.0`)  
**Default:** `1.1`

Enhances the definition of edges in the image, making text strokes more distinct.

**✅ Example Uses:**
- `1.3` for blurry scans or low-DPI images.
- Avoid very high values on already sharp images (may create noise).

---

## 6️⃣ Gaussian Blur (Noise Reduction)
**Key:** `blur_radius`  
**Type:** Number (`0.0 – 2.0`)  
**Default:** `0.5`

Applies a soft blur to the image to remove random dots and scanning noise.  
Useful for **cleaning up noisy backgrounds** before OCR.

**✅ Example Uses:**
- `0.3` for small speckled noise.
- `1.0` for heavily degraded photocopies.

**⚠️ Tip:** Too much blur will make text edges fuzzy and reduce accuracy.

---

## 7️⃣ Threshold Binarization
**Key:** `threshold`  
**Type:** Integer (`0 – 255`)  
**Default:** None (disabled)

Converts the image to pure **black and white** pixels using a brightness threshold.  
Anything darker than the threshold becomes black; lighter becomes white.

**✅ Example Uses:**
- `170` for clean typewritten pages.
- Useful for archival documents with faint ink.

---

## 8️⃣ Invert Colors
**Key:** `invert`  
**Type:** Boolean  
**Default:** `false`

Flips all colors — black text becomes white and vice versa.  
Can be useful for white text on black backgrounds.

---

## 9️⃣ Deskew (Straighten Text)
**Key:** `deskew`  
**Type:** Boolean  
**Default:** `false`

Automatically rotates slightly tilted pages so that text lines are horizontal.  
Improves OCR accuracy on skewed scans.

---

## 🔹 Presets
Instead of adjusting each setting manually, you can choose a **preset**:

| Preset Name    | Description |
|---------------|-------------|
| `light`       | Minimal processing, best for clean digital scans. |
| `medium`      | Balanced settings for most printed documents. |
| `aggressive`  | Strong enhancement for very poor-quality scans. |
| `scan_light`  | For lightly degraded photocopies. |
| `scan_medium` | For medium-quality photocopies with noise. |
| `handwritten` | Optimized for handwritten notes and cursive text. |

---

## 🔹 Overrides
You can **start from a preset** and override specific settings:

```json
{
  "preset": "medium",
  "overrides": {
    "contrast": 1.5,
    "blur_radius": 0.3
  }
}
```
## 🔹 Available option keys
```json
enhance_image: {
  "grayscale": true,
  "auto_contrast": true,
  "brightness": 1.0,     // 0.5–2.0
  "contrast": 1.2,       // 0.5–2.0
  "sharpness": 1.1,      // 0.5–2.0
  "blur_radius": 0.5,    // 0.0–2.0
  "threshold": 170,      // 0–255 (binary)
  "invert": false,
  "deskew": true
}
