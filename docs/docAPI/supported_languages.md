# Supported Languages - OCR Language Support

## 🎯 Overview

Our OCR system supports **50+ languages** including major world languages, regional dialects, and specialized scripts. Language support is automatically detected or can be explicitly specified to improve recognition accuracy.

## 🌍 Language Detection

### Automatic Detection

The system automatically detects the primary language in your document using advanced language identification algorithms. This works best for:

- **Single-language documents** (e.g., English-only, Turkish-only)
- **Clear, high-quality text**
- **Standard fonts and scripts**

### Manual Specification

For optimal results, you can explicitly specify the language using:

- **Language codes** (e.g., `en`, `tr`, `ar`)
- **Prompt modes** (e.g., `prompt_layout_all_tr` for Turkish)
- **Language-specific instructions** in chat completions

## 📋 Supported Languages

### Primary Languages

| Language | Code | Native Name | Script | Support Level |
|----------|------|-------------|--------|---------------|
| **English** | `en` | English | Latin | ⭐⭐⭐⭐⭐ |
| **Turkish** | `tr` | Türkçe | Latin | ⭐⭐⭐⭐⭐ |
| **Arabic** | `ar` | العربية | Arabic | ⭐⭐⭐⭐⭐ |
| **Chinese (Simplified)** | `zh-CN` | 简体中文 | Hanzi | ⭐⭐⭐⭐⭐ |
| **Chinese (Traditional)** | `zh-TW` | 繁體中文 | Hanzi | ⭐⭐⭐⭐⭐ |
| **Japanese** | `ja` | 日本語 | Kanji/Hiragana/Katakana | ⭐⭐⭐⭐⭐ |
| **Korean** | `ko` | 한국어 | Hangul | ⭐⭐⭐⭐⭐ |
| **Russian** | `ru` | Русский | Cyrillic | ⭐⭐⭐⭐⭐ |
| **Spanish** | `es` | Español | Latin | ⭐⭐⭐⭐⭐ |
| **French** | `fr` | Français | Latin | ⭐⭐⭐⭐⭐ |
| **German** | `de` | Deutsch | Latin | ⭐⭐⭐⭐⭐ |
| **Italian** | `it` | Italiano | Latin | ⭐⭐⭐⭐⭐ |
| **Portuguese** | `pt` | Português | Latin | ⭐⭐⭐⭐⭐ |
| **Dutch** | `nl` | Nederlands | Latin | ⭐⭐⭐⭐⭐ |
| **Polish** | `pl` | Polski | Latin | ⭐⭐⭐⭐⭐ |
| **Czech** | `cs` | Čeština | Latin | ⭐⭐⭐⭐⭐ |
| **Hungarian** | `hu` | Magyar | Latin | ⭐⭐⭐⭐⭐ |
| **Swedish** | `sv` | Svenska | Latin | ⭐⭐⭐⭐⭐ |
| **Norwegian** | `no` | Norsk | Latin | ⭐⭐⭐⭐⭐ |
| **Danish** | `da` | Dansk | Latin | ⭐⭐⭐⭐⭐ |
| **Finnish** | `fi` | Suomi | Latin | ⭐⭐⭐⭐⭐ |

### Regional & Specialized Languages

| Language | Code | Native Name | Script | Support Level |
|----------|------|-------------|--------|---------------|
| **Hindi** | `hi` | हिन्दी | Devanagari | ⭐⭐⭐⭐ |
| **Bengali** | `bn` | বাংলা | Bengali | ⭐⭐⭐⭐ |
| **Urdu** | `ur` | اردو | Arabic | ⭐⭐⭐⭐ |
| **Persian** | `fa` | فارسی | Arabic | ⭐⭐⭐⭐ |
| **Hebrew** | `he` | עברית | Hebrew | ⭐⭐⭐⭐ |
| **Thai** | `th` | ไทย | Thai | ⭐⭐⭐⭐ |
| **Vietnamese** | `vi` | Tiếng Việt | Latin | ⭐⭐⭐⭐ |
| **Indonesian** | `id` | Bahasa Indonesia | Latin | ⭐⭐⭐⭐ |
| **Malay** | `ms` | Bahasa Melayu | Latin | ⭐⭐⭐⭐ |
| **Filipino** | `tl` | Filipino | Latin | ⭐⭐⭐⭐ |
| **Greek** | `el` | Ελληνικά | Greek | ⭐⭐⭐⭐ |
| **Bulgarian** | `bg` | Български | Cyrillic | ⭐⭐⭐⭐ |
| **Serbian** | `sr` | Српски | Cyrillic | ⭐⭐⭐⭐ |
| **Croatian** | `hr` | Hrvatski | Latin | ⭐⭐⭐⭐ |
| **Slovenian** | `sl` | Slovenščina | Latin | ⭐⭐⭐⭐ |
| **Slovak** | `sk` | Slovenčina | Latin | ⭐⭐⭐⭐ |
| **Romanian** | `ro` | Română | Latin | ⭐⭐⭐⭐ |
| **Catalan** | `ca` | Català | Latin | ⭐⭐⭐⭐ |
| **Basque** | `eu` | Euskara | Latin | ⭐⭐⭐⭐ |
| **Galician** | `gl` | Galego | Latin | ⭐⭐⭐⭐ |
| **Welsh** | `cy` | Cymraeg | Latin | ⭐⭐⭐⭐ |
| **Irish** | `ga` | Gaeilge | Latin | ⭐⭐⭐⭐ |
| **Icelandic** | `is` | Íslenska | Latin | ⭐⭐⭐⭐ |
| **Estonian** | `et` | Eesti | Latin | ⭐⭐⭐⭐ |
| **Latvian** | `lv` | Latviešu | Latin | ⭐⭐⭐⭐ |
| **Lithuanian** | `lt` | Lietuvių | Latin | ⭐⭐⭐⭐ |

### Specialized Scripts

| Language | Code | Native Name | Script | Support Level |
|----------|------|-------------|--------|---------------|
| **Armenian** | `hy` | Հայերեն | Armenian | ⭐⭐⭐ |
| **Georgian** | `ka` | ქართული | Georgian | ⭐⭐⭐ |
| **Mongolian** | `mn` | Монгол | Cyrillic | ⭐⭐⭐ |
| **Kazakh** | `kk` | Қазақша | Cyrillic | ⭐⭐⭐ |
| **Kyrgyz** | `ky` | Кыргызча | Cyrillic | ⭐⭐⭐ |
| **Uzbek** | `uz` | O'zbekcha | Latin/Cyrillic | ⭐⭐⭐ |
| **Tajik** | `tg` | Тоҷикӣ | Cyrillic | ⭐⭐⭐ |
| **Turkmen** | `tk` | Türkmençe | Latin | ⭐⭐⭐ |
| **Azerbaijani** | `az` | Azərbaycanca | Latin | ⭐⭐⭐ |
| **Kurdish** | `ku` | Kurdî | Latin/Arabic | ⭐⭐⭐ |
| **Pashto** | `ps` | پښتو | Arabic | ⭐⭐⭐ |
| **Dari** | `prs` | دری | Arabic | ⭐⭐⭐ |
| **Sindhi** | `sd` | سنڌي | Arabic | ⭐⭐⭐ |
| **Punjabi** | `pa` | ਪੰਜਾਬੀ | Gurmukhi | ⭐⭐⭐ |
| **Gujarati** | `gu` | ગુજરાતી | Gujarati | ⭐⭐⭐ |
| **Marathi** | `mr` | मराठी | Devanagari | ⭐⭐⭐ |
| **Kannada** | `kn` | ಕನ್ನಡ | Kannada | ⭐⭐⭐ |
| **Telugu** | `te` | తెలుగు | Telugu | ⭐⭐⭐ |
| **Tamil** | `ta` | தமிழ் | Tamil | ⭐⭐⭐ |
| **Malayalam** | `ml` | മലയാളം | Malayalam | ⭐⭐⭐ |
| **Sinhala** | `si` | සිංහල | Sinhala | ⭐⭐⭐ |
| **Khmer** | `km` | ខ្មែរ | Khmer | ⭐⭐⭐ |
| **Lao** | `lo` | ລາວ | Lao | ⭐⭐⭐ |
| **Myanmar** | `my` | မြန်မာ | Myanmar | ⭐⭐⭐ |
| **Tibetan** | `bo` | བོད་ཡིག | Tibetan | ⭐⭐⭐ |
| **Amharic** | `am` | አማርኛ | Ethiopic | ⭐⭐⭐ |
| **Tigrinya** | `ti` | ትግርኛ | Ethiopic | ⭐⭐⭐ |
| **Somali** | `so` | Soomaali | Latin | ⭐⭐⭐ |
| **Swahili** | `sw` | Kiswahili | Latin | ⭐⭐⭐ |
| **Yoruba** | `yo` | Èdè Yorùbá | Latin | ⭐⭐⭐ |
| **Igbo** | `ig` | Asụsụ Igbo | Latin | ⭐⭐⭐ |
| **Hausa** | `ha` | Harshen Hausa | Latin | ⭐⭐⭐ |
| **Zulu** | `zu` | IsiZulu | Latin | ⭐⭐⭐ |
| **Xhosa** | `xh` | IsiXhosa | Latin | ⭐⭐⭐ |
| **Afrikaans** | `af` | Afrikaans | Latin | ⭐⭐⭐ |
| **Albanian** | `sq` | Shqip | Latin | ⭐⭐⭐ |
| **Macedonian** | `mk` | Македонски | Cyrillic | ⭐⭐⭐ |
| **Montenegrin** | `cnr` | Crnogorski | Latin/Cyrillic | ⭐⭐⭐ |

## 🔧 Language Configuration

### 1. Using Prompt Modes

Specify language through prompt modes in OCR requests:

```json
{
  "image": "data:image/png;base64,...",
  "prompt_mode": "prompt_layout_all_tr"  // Turkish with layout
}
```

### 2. Language-Specific Instructions

Use language-specific instructions in chat completions:

```json
{
  "model": "dots-ocr",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Extract text from this Turkish document and preserve the layout"
        },
        {
          "type": "image_url",
          "image_url": {"url": "data:image/png;base64,..."}
        }
      ]
    }
  ]
}
```

### 3. Explicit Language Codes

Some endpoints support explicit language codes:

```json
{
  "image": "data:image/png;base64,...",
  "language": "tr",
  "prompt_mode": "prompt_layout_all"
}
```

## 📊 Language Support Levels

### ⭐⭐⭐⭐⭐ (Excellent)
- **Perfect recognition** for standard fonts
- **High accuracy** even with poor quality
- **Full layout preservation**
- **Advanced text processing**

### ⭐⭐⭐⭐ (Very Good)
- **Excellent recognition** for standard fonts
- **High accuracy** with good quality
- **Good layout preservation**
- **Standard text processing**

### ⭐⭐⭐ (Good)
- **Good recognition** for standard fonts
- **Moderate accuracy** with good quality
- **Basic layout preservation**
- **Basic text processing**

## 🌐 Multi-Language Documents

### Mixed Language Support

Our system can handle documents containing multiple languages:

```json
{
  "image": "data:image/png;base64,...",
  "prompt_mode": "prompt_layout_all_mixed",
  "languages": ["en", "tr", "ar"]
}
```

### Language Detection Priority

When multiple languages are present, the system:

1. **Identifies the primary language** (most text)
2. **Recognizes secondary languages** automatically
3. **Applies appropriate processing** for each script
4. **Maintains layout** across language boundaries

### Example Multi-Language Document

```
English Header: "Company Report 2024"
Turkish Content: "Bu rapor şirket performansını gösterir"
Arabic Signature: "التوقيع: أحمد محمد"
```

## 🎯 Language-Specific Optimizations

### Right-to-Left Languages (RTL)

**Supported Languages:** Arabic, Hebrew, Persian, Urdu, Kurdish

**Special Features:**
- **Automatic RTL detection**
- **Proper text flow handling**
- **Mixed RTL/LTR support**
- **Layout preservation**

### Asian Languages

**Supported Languages:** Chinese, Japanese, Korean, Thai, Vietnamese

**Special Features:**
- **Character segmentation**
- **Vertical text support**
- **Mixed script handling**
- **Context-aware recognition**

### Indic Languages

**Supported Languages:** Hindi, Bengali, Tamil, Telugu, Gujarati

**Special Features:**
- **Devanagari script optimization**
- **Ligature recognition**
- **Vowel mark handling**
- **Script-specific preprocessing**

## 🔍 Language Detection Accuracy

### Detection Confidence

| Confidence Level | Description | Recommendation |
|------------------|-------------|----------------|
| **95-100%** | Very confident | Use detected language |
| **85-94%** | Confident | Use detected language |
| **70-84%** | Moderately confident | Verify or specify manually |
| **Below 70%** | Low confidence | Specify language manually |

### Factors Affecting Detection

1. **Text Quality**: Higher quality = better detection
2. **Font Clarity**: Clear fonts improve detection
3. **Script Complexity**: Simple scripts are easier to detect
4. **Mixed Content**: Multiple languages can reduce confidence
5. **Document Type**: Printed vs. handwritten affects accuracy

## 📝 Best Practices

### For Optimal Language Recognition

1. **Use high-quality images** (300+ DPI)
2. **Specify language explicitly** for critical documents
3. **Test with sample documents** in your target language
4. **Use appropriate prompt modes** for language-specific needs
5. **Monitor confidence scores** in results

### Language-Specific Tips

#### Turkish (Türkçe)
- Use `prompt_layout_all_tr` for best results
- Handles special characters (ç, ğ, ı, ö, ş, ü) perfectly
- Excellent support for both printed and handwritten text

#### Arabic (العربية)
- Automatic RTL text flow detection
- Handles diacritical marks accurately
- Supports various Arabic fonts and styles

#### Chinese (中文)
- Works with both simplified and traditional characters
- Handles mixed Chinese-English content
- Excellent for technical documents

#### Japanese (日本語)
- Supports all three writing systems (Kanji, Hiragana, Katakana)
- Handles mixed script content
- Good for formal documents and casual text

## 🚨 Common Issues & Solutions

### Language Detection Problems

| Issue | Cause | Solution |
|-------|-------|----------|
| Wrong language detected | Mixed content | Specify language explicitly |
| Poor recognition | Unsupported script | Check language support level |
| Layout issues | Complex script | Use layout-aware prompt modes |
| Mixed results | Multiple languages | Use mixed language mode |

### Performance Considerations

- **Single language**: Fastest processing
- **Mixed languages**: Moderate processing time
- **Complex scripts**: Longer processing time
- **Layout preservation**: Additional processing overhead

## 🔗 Related Documentation

- **[OCR Processing](./ocr_processing.md)** - Core OCR endpoints
- **[Chat Completions](./chat_completions.md)** - OpenAI-compatible interface
- **[Image Enhancement](./image_enhancement.md)** - Pre-processing options

---
## Language ID List 



| Language ID | Native Name | English Name | ISO 639-1 Code |
|----|----------|-----|------|
| lang_afr_af | Afrikaans | Afrikaans | af |
| lang_amh_am | አማርኛ | Amharic | am |
| lang_ara_ar | العربية | Arabic | ar |
| lang_hye_hy | հայերեն | Armenian | hy |
| lang_aze_az | Azərbaycanca | Azerbaijani | az |
| lang_eus_eu | Euskara | Basque | eu |
| lang_ben_bn | বাংলা | Bengali | bn |
| lang_bel_be | беларуская | Belarusian | be |
| lang_bos_bs | Bosanski | Bosnian | bs |
| lang_bul_bg | български | Bulgarian | bg |
| lang_cat_es | Català | Catalan | es |
| lang_ces_cs | čeština | Czech | cs |
| lang_chi_sim_zh | 中文 (简体) | Chinese (Simplified) | zh |
| lang_chi_tra_zh | 中文 (繁體) | Chinese (Traditional) | zh |
| lang_cos_co | Corsu | Corsican | co |
| lang_hrv_hr | Hrvatski | Croatian | hr |
| lang_dan_da | Dansk | Danish | da |
| lang_nld_nl | Nederlands | Dutch | nl |
| lang_eng_en | English | English | en |
| lang_epo_eo | Esperanto | Esperanto | eo |
| lang_est_et | Eesti | Estonian | et |
| lang_fin_fi | Suomi | Finnish | fi |
| lang_fra_fr | Français | French | fr |
| lang_glg_gl | Galego | Galician | gl |
| lang_kat_ka | ქართული | Georgian | ka |
| lang_deu_de | Deutsch | German | de |
| lang_ell_el | Ελληνικά | Greek | el |
| lang_guj_gu | ગુજરાતી | Gujarati | gu |
| lang_hat_ht | Kreyòl ayisyen | Haitian (Creole) | ht |
| lang_heb_he | עִברִית | Hebrew | he |
| lang_hin_hi | हिन्दी | Hindi | hi |
| lang_hun_hu | Magyar | Hungarian | hu |
| lang_isl_is | Íslenska | Icelandic | is |
| lang_ind_id | Bahasa Indonesia | Indonesian | id |
| lang_gle_ga | Gaeilge | Irish | ga |
| lang_ita_it | Italiano | Italian | it |
| lang_jpn_ja | 日本語 | Japanese | ja |
| lang_khm_km | ភាសាខ្មែរ | Khmer | km |
| lang_kor_ko | 한국어 | Korean | ko |
| lang_kmr_ku | Kurdî | Kurdish | ku |
| lang_lao_lo | ລາວ | Lao | lo |
| lang_lat_la | Latina | Latin | la |
| lang_lav_lv | Latviešu | Latvian | lv |
| lang_lit_lt | Lietuvių | Lithuanian | lt |
| lang_mkd_mk | македонски | Macedonian | mk |
| lang_mal_ml | മലയാളം | Malayalam | ml |
| lang_mlt_mt | Malti | Maltese | mt |
| lang_nor_no | Norsk | Norwegian | no |
| lang_ori_or | ଓଡ଼ିଆ | Oriya | or |
| lang_pus_ps | پښتو | Pashto | ps |
| lang_fas_fa | فارسی | Persian | fa |
| lang_pol_pl | Polski | Polish | pl |
| lang_por_pt | Português | Portuguese | pt |
| lang_pan_pa | ਪੰਜਾਬੀ | Punjabi | pa |
| lang_ron_ro | Română | Romanian | ro |
| lang_rus_ru | Русский | Russian | ru |
| lang_san_sa | संस्कृतम् | Sanskrit | sa |
| lang_srp_sr | српски | Serbian | sr |
| lang_slk_sk | Slovenčina | Slovak | sk |
| lang_slv_sl | Slovenščina | Slovenian | sl |
| lang_spa_es | Español | Spanish | es |
| lang_swa_sw | Kiswahili | Swahili | sw |
| lang_swe_sv | Svenska | Swedish | sv |
| lang_syr_ar | ܣܘܪܝܝܐ | Syriac | ar |
| lang_tam_ta | தமிழ் | Tamil | ta |
| lang_tat_tt | татар теле | Tatar | tt |
| lang_tel_te | తెలుగు | Telugu | te |
| lang_tha_th | ไทย | Thai | th |
| lang_bod_bo | བོད་སྐད | Tibetan | bo |
| lang_tur_tr | Türkçe | Turkish | tr |
| lang_ukr_uk | українська | Ukrainian | uk |
| lang_urd_ur | اردو | Urdu | ur |
| lang_uzb_uz | Oʻzbekcha | Uzbek | uz |
| lang_vie_vi | Tiếng Việt | Vietnamese | vi |
| lang_cym_cy | Cymraeg | Welsh | cy |
| lang_yid_yi | ייִדיש | Yiddish | yi |



**Next**: [Examples & Use Cases](./examples.md) - Practical implementation examples
