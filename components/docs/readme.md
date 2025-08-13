
## **Hashub Dashboard – Navigation & Layout Instructions**

### **1. Top Navigation Bar**

**Yerleşim:**

* **Sol kısım:** Hashub logosu + site adı.
* **Orta kısım:** Search form olacak Ctrl K ile.

  * **Dashboard**
  * **Guides**
  * **API Reference**
  * **Pricing**
* **Sağ kısım:** Kullanıcı profil ikonu (daire içinde avatar).

  * **Avatar tıklanınca açılan dropdown menü:**

    * Settings
    * Logout

---

### **2. Side Navigation Bar (Dashboard Görünümü)**

**Kullanıcı Dashboard’a tıkladığında sol menü şu şekilde listelenir:**

---

#### **Playground**

Alt başlıklar:

1. **Chat OCR** – AI destekli belge analizi, soru-cevap, tablo/liste tanıma.
2. **GeoText OCR** – OCR + bounding box koordinatlı JSON çıktı.
3. **Fast OCR** – Hızlı, çok dilli düz metin çıkarımı (Tesseract).
4. **Embedding Benchmark** – Modeller arası hız/doğruluk karşılaştırması.
5. **Vector Explorer** – Embedding sonuçlarını görüntüleme ve mesafe ölçümü.
6. **Search Lab** – Max 50 satır veri yükleyip vektör araması yapma.

---

#### **Manage**

Alt başlıklar:

1. **API Keys** – Anahtar oluşturma, yetki verme, iptal etme.
2. **Usage & Billing** – Kullanım istatistikleri, faturalandırma.
3. **Project Settings** – Varsayılan dil, model, format, güvenlik ayarları.

---

#### **Optimize**

Alt başlıklar:

1. **Batch API** – Çoklu belge/metin işleme ile hız ve maliyet optimizasyonu.

---

### **3. Tasarım Notları**

* **Aktif menü öğesi** sol nav barda highlight olacak.
* Side bar daraltıldığında sadece ikonlar kalacak (hover ile isim görünecek).
* Top nav bar sabit olacak (scroll’da kaybolmayacak).
* Dropdown menü mobilde tam ekran modal olarak açılabilir.
* Her alt başlık kendi sayfasına yönlendirecek.


## **API Reference** – İçerik Yapısı

1. **Core API Docs**

   * **Endpoint listesi** (DocAPI ve VectorAPI ayrı bölümler).
   * Her endpoint için:

     * HTTP method & URL
     * Query / body parametreleri
     * Response örneği (JSON)
   * **Kod örnekleri**:

     * **curl** (terminal kullanıcıları için)
     * **Python requests** (geliştiricilerin en çok kullandığı hızlı çözüm)
     * **Java Script** 

---

2. **Official SDKs** *(Kendi SDK’ların)*

   * **Python SDK**

     * Kurulum (`pip install hashub-doc` vb.)
     * Örnek kullanım (OCR, embedding, search vb.)
   * **JavaScript / TypeScript SDK**

     * Kurulum (`npm install hashub-vector`)
     * Node.js & browser örnekleri
   * Versiyon bilgisi ve changelog bağlantısı

---

3. **Authentication**

   * API Key oluşturma ve kullanma (HTTP header örneği).
   * Güvenlik ipuçları (anahtar saklama, IP whitelist vb.).

---

4. **Error Handling**

   * Standart hata kodları (HTTP 400, 401, 429, 500 vb.).
   * JSON hata formatı örneği.

---

5. **Best Practices**

   * Rate limit’leri yönetme
   * Batch API kullanımı
   * Büyük dosya yükleme stratejileri

Net olalım: **Docs** bölümü “başlangıç + kavramlar + nasıl yapılır” katmanıdır. API Reference şemayı verir; Guides belli senaryoları anlatır; **Docs ise geliştiriciyi 15 dakikada üretime taşır.** Aşağıdaki bilgi mimarisini öneriyorum.

# Docs – Bilgi Mimarisi

## 0) Overview (Docs Home)

* Hashub nedir? (DocAPI + VectorAPI özet)
* Hızlı linkler: **Quickstart**, **Auth**, **Rate Limits**, **SDK’ler**, **Changelog**
* “Search Lab” tanıtımı (50 satır demo sınırı)

## 1) Quickstart

* **1.1 – API Key & Auth**

  * Header: `Authorization: Bearer <API_KEY>`
* **1.2 – 5 Dakikada DocAPI**

  * **Chat OCR** (soru-cevap odaklı)
  * **GeoText OCR** (JSON + bbox)
  * **Fast OCR** (Tesseract, düz metin)
* **1.3 – 5 Dakikada VectorAPI**

  * Tek metni embed et
  * Basit benzerlik araması (cosine)
* **1.4 – İlk Entegrasyon Kontrol Listesi**

  * Hata/hız/maliyet maddeleri

**Örnek – cURL (DocAPI / Fast OCR)**

```bash
curl -X POST "https://api.hashub.dev/doc/ocr/fast" \
  -H "Authorization: Bearer $HASHUB_API_KEY" \
  -F "file=@/path/invoice.pdf" \
  -F "lang=tr"
```

**Örnek – Python requests (VectorAPI / embed)**

```python
import requests
r = requests.post(
  "https://api.hashub.dev/vector/embed",
  headers={"Authorization": f"Bearer {API_KEY}"},
  json={"model": "turkish-base", "input": "Kıdem tazminatı nedir?"}
)
print(r.json())
```

## 2) Concepts

* **DocAPI Modları**

  * Chat OCR (ne zaman tercih edilir, hangi çıktı)
  * GeoText OCR (bbox yapısı, sayfa/alan koordinatları)
  * Fast OCR (hız/kalite/çok dilli)
* **Vector Temelleri**

  * Embedding nedir, boyut & normalize
  * Similarity ölçütleri (cosine/inner product)
  * Top-K, skor, eşik yönetimi
* **Maliyet & Performans Kavramları**

  * Sayfa başı maliyet, token/karakter farkı
  * Büyük PDF’lerde parça işleme

## 3) How-to Guides (Docs içinde kısa “reçeteler”)

> (Uzun senaryolar “Guides” sekmesinde; burada kısa ve odaklı tarifler var.)

* **Belgeyi OCR edip Markdown’a çevir** (Fast OCR → post-process)
* **Tablolu faturadan satır kalemlerini çıkar** (GeoText OCR bbox ile)
* **Bir metin listesi için toplu embedding al** (Vector batch)
* **Sorgu genişletme ile daha iyi arama** (stopwords/normalization ipuçları)
* **Search Lab kullanarak demo veriyle test et** (50 satır limiti)

## 4) SDK’ler (Docs içinden hızlı giriş)

* **Python SDK – Quickstart**

  * Kurulum, auth, tek çağrı ile OCR/Embed örneği
* **JS/TS SDK – Quickstart**

  * Node\&Browser örneği, ESM/CJS notları

> Ayrıntılı API yüzeyi “API Reference > SDKs” altında.

## 5) Error Handling

* **Standart HTTP Kodları**: 400/401/413/415/422/429/500
* **Hata JSON Şeması**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Try again later.",
    "request_id": "d4f1..."
  }
}
```

* **Retry & Backoff**: 429 ve 5xx için öneri
* **Idempotency-Key**: aynı işi iki kez tetiklememek için (özellikle batch)

## 6) Rate Limits & Quotas

* Varsayılan RPS/RPM değerleri
* Dosya boyutu / sayfa sınırları
* Search Lab: **max 50 satır** demo sınırı (ücretli planda artırma linki)

## 7) Batch & Webhooks

* **Batch API**: sınırlar, örnek payload, kısmi başarısızlık politikası
* **Webhooks**: `event_type`, imzalama (HMAC), yeniden deneme

## 8) Security

* Anahtar yönetimi (sunucu tarafında saklama)
* IP allowlist / CORS notları
* PII/PHI dokümanlarda en iyi uygulamalar

## 9) Versioning & Deprecation

* URL versiyonlama: `/v1/...`
* Deprecation takvimi ve migration rehberi

## 10) Changelog

* Sürüm notları, breaking changes uyarıları

---

# Docs İçerik Standartları

* **Her sayfada**: kısa özet → adım adım → örnek (cURL + Python requests)
* **Kod blokları**: kopyalanabilir, minimal, çalışır
* **Kutucuklar**: “Note”, “Tip”, “Warning” (UI highlight)
* **SEO**: net başlıklar, `OpenGraph/Twitter` meta, şema (BreadcrumbList)

---

# Örnek Sayfa İskeletleri

## “Quickstart – DocAPI in 5 Minutes”

1. Amaç (çıktı hedefi)
2. Auth ayarı
3. Fast OCR ile ilk çağrı (cURL + Python)
4. GeoText OCR JSON alanları (örnek JSON)
5. Chat OCR ile soru-cevap (küçük örnek)
6. Hata senaryosu & retry
7. Sonraki adımlar: Guides / API Reference linkleri

## “Concepts – Vector Similarity”

1. Embedding nedir?
2. Normalization & cosine
3. Top-K, eşik, skor yorumu
4. Kaliteyi artırma: temizlik, stopword, dil modeli seçimi
5. Örnek: kısa arama akışı

---
Docs > Integrations

LlamaIndex Integration

DocAPI ile OCR sonrası metni indexleme

VectorAPI ile embedding + LlamaIndex store

Örnek: Soru-cevap botu

LangChain Integration

VectorAPI’yi LangChain VectorStore sınıfına bağlama

Retrieval chain ile arama örneği

Memory + API kullanım ipuçları

---

# URL Yapısı (öneri)

* `/docs/` (home)
* `/docs/quickstart`
* `/docs/concepts/ocr-modes`
* `/docs/concepts/embeddings`
* `/docs/how-to/ocr-to-markdown`
* `/docs/how-to/vector-batch`
* `/docs/sdk/python`
* `/docs/errors`
* `/docs/rate-limits`
* `/docs/batch-and-webhooks`
* `/docs/security`
* `/docs/versioning`
* `/docs/changelog`



