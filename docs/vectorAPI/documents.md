İşte yukarıdaki model listesini İngilizce, profesyonel ve okunabilir bir şekilde yeniden düzenledim:

---

## 🔍 Supported Embedding Models

### 🚀 `nomic-ai/nomic-embed-text-v2-moe`

* **Model Type:** Mixture of Experts (MoE) Embedding
* **Embedding Dimension:** 768
* **Max Input Tokens:** 512
* **Model Size:** ~1.9GB
* **Architecture:** MoE (Mixture of Experts) with BERT-style transformer
* **Special Features:** Advanced MoE architecture for optimized performance
* **Supported Languages:**
    `Sentence Similarity`, `English`, `Spanish`, `French`, `German`, `Italian`, `Portuguese`, `Polish`, `Dutch`, `Turkish`, `Japanese`, `Vietnamese`, `Russian`, `Indonesian`, `Arabic`, `Czech`, `Romanian`, `Swedish`, `Greek`, `Ukrainian`, `Chinese`, `Hungarian`, `Danish`, `Norwegian`, `Hindi`, `Finnish`, `Bulgarian`, `Korean`, `Slovak`, `Thai`, `Hebrew`, `Catalan`, `Lithuanian`, `Persian`, `Malay`, `Slovenian`, `Latvian`, `Marathi`, `Bengali`, `Albanian`, `Welsh`, `Belarusian`, `Malayalam`, `Kannada`, `Macedonian`, `Urdu`, `Western Frisian`, `Telugu`, `Basque`, `Swahili`, `Somali`, `Sindhi`, `Uzbek`, `Corsican`, `Croatian`, `Gujarati`, `Chechen`, `Esperanto`, `Javanese`, `Latin`, `Zulu`, `Mongolian`, `Sinhala`, `Irish`, `Kyrgyz`, `Tajik`, `Burmese`, `Khmer`, `Malagasy`, `Panjabi`, `Shona`, `Hausa`, `Haitian`, `Sundanese`, `Scottish Gaelic`, `Chichewa`, `Pashto`, `Kurdish`, `Amharic`, `Igbo`, `Lao`, `Māori`, `Norwegian Nynorsk`, `Samoan`, `Yiddish`, `Southern Sotho`, `Tagalog`, `Xhosa`, `Yoruba`, `Afrikaans`, `Tamil`, `Tswana`, `Uyghur`, `Azerbaijani`, `Bashkir`, `Bosnian`, `Divehi`, `Estonian`, `Galician`, `Guaraní`, `Manx`, `Armenian`


#### 📌 Description:
`nomic-embed-text-v2-moe` is a cutting-edge embedding model developed by Nomic AI using Mixture of Experts (MoE) architecture. This model combines multiple expert networks to provide high-quality embeddings while maintaining computational efficiency.

The MoE architecture allows the model to scale effectively by routing different inputs to specialized expert networks, resulting in better performance across diverse text types. Despite its larger model size (~1.9GB), it offers excellent embedding quality for various NLP tasks.

**Performance Characteristics:**
- Fast inference with MoE routing
- High-quality embeddings across diverse domains
- Optimized for both academic and commercial applications

#### ✅ Use Cases:
- **High-Quality Embeddings**: Superior semantic understanding
- **Domain-Specific Tasks**: MoE architecture adapts to different text types
- **Research Applications**: State-of-the-art embedding model
- **Production Systems**: Balanced performance and quality
- **Semantic Search**: Excellent retrieval accuracy

---

### 🧠 `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`

* **Model Type:** MiniLM (Multilingual)
* **Embedding Dimension:** 384
* **Max Input Tokens:** 512
* **Advantages:** Fast, lightweight, low resource usage
* **Use Cases:** Real-time search, low-resource environments
* **Supported Languages:**

    `multilingual`, `Arabic`, `Bulgarian`, `Catalan`, `Czech`, `Danish`, `German`, `Greek`, `English`, `Spanish`, `Estonian`, `Persian`, `Finnish`, `French`, `Galician`, `Gujarati`, `Hebrew`, `Hindi`, `Croatian`, `Hungarian`, `Armenian`, `Indonesian`, `Italian`, `Japanese`, `Georgian`, `Korean`, `Kurdish`, `Lithuanian`, `Latvian`, `Macedonian`, `Mongolian`, `Marathi`, `Malay`, `Burmese`, `Norwegian Bokmål`, `Dutch`, `Polish`, `Portuguese`, `Romanian`, `Russian`, `Slovak`, `Slovenian`, `Albanian`, `Serbian`, `Swedish`, `Thai`, `Turkish`, `Ukrainian`, `Urdu`, `Vietnamese`

---

### 🧠 `sentence-transformers/paraphrase-multilingual-mpnet-base-v2`

* **Model Type:** MPNet (Multilingual)
* **Embedding Dimension:** 768
* **Max Input Tokens:** 512
* **Advantages:** High semantic accuracy, ideal for vector search
* **Use Cases:** RAG pipelines, semantic search, SEO metadata generation
* **Supported Languages:**
  `multilingual`, `Arabic`, `Bulgarian`, `Catalan`, `Czech`, `Danish`, `German`, `Greek`, `English`, `Spanish`, `Estonian`, `Persian`, `Finnish`, `French`, `Galician`, `Gujarati`, `Hebrew`, `Hindi`, `Croatian`, `Hungarian`, `Armenian`, `Indonesian`, `Italian`, `Japanese`, `Georgian`, `Korean`, `Kurdish`, `Lithuanian`, `Latvian`, `Macedonian`, `Mongolian`, `Marathi`, `Malay`, `Burmese`, `Norwegian Bokmål`, `Dutch`, `Polish`, `Portuguese`, `Romanian`, `Russian`, `Slovak`, `Slovenian`, `Albanian`, `Serbian`, `Swedish`, `Thai`, `Turkish`, `Ukrainian`, `Urdu`, `Vietnamese`

---
### 🧠 `upskyy/bge-m3-korean`

* **Model Type:** Sentence Embedding (Korean-focused)
* **Embedding Size:** 1024 dimensions
* **Max Input Tokens:** 512
* **Language Support:** 🇰🇷 Korean (optimized for native semantics)
* **Architecture:** Based on BGE-M3 architecture (dense encoder)

#### 📌 Description:

This model is designed specifically for Korean language understanding and semantic retrieval tasks. Built on top of the BGE (Better General Embeddings) architecture, it offers high-quality sentence embeddings with enhanced semantic granularity in Korean.

It is ideal for:

* Korean legal, financial, or technical document similarity
* Search and retrieval systems focused on native Korean content
* Cross-lingual embeddings (when aligned with multilingual models)
* **Supported Languages:**
    `Afrikaans`, `Arabic`, `Azerbaijani`, `Belarusian`, `Bulgarian`, `Bengali`, `Catalan`, `Cebuano`, `Czech`, `Welsh`, `Danish`, `German`, `Greek`, `English`, `Spanish`, `Estonian`, `Basque`, `Persian`, `Finnish`, `French`, `Galician`, `Gujarati`, `Hebrew`, `Hindi`, `Croatian`, `Haitian`, `Hungarian`, `Armenian`, `Indonesian`, `Icelandic`, `Italian`, `Japanese`, `Javanese`, `Georgian`, `Kazakh`, `Khmer`, `Kannada`, `Korean`, `Kyrgyz`, `Lao`, `Lithuanian`, `Latvian`, `Macedonian`, `Malayalam`, `Mongolian`, `Marathi`, `Malay`, `Burmese`, `Nepali`, `Dutch`, `Norwegian`, `Panjabi`, `Polish`, `Portuguese`, `Quechua`, `Romanian`, `Russian`, `Sinhala`, `Slovak`, `Slovenian`, `Somali`, `Albanian`, `Serbian`, `Swedish`, `Swahili`, `Tamil`, `Telugu`, `Thai`, `Tagalog`, `Turkish`, `Ukrainian`, `Urdu`, `Vietnamese`, `Yoruba`, `Chinese`

---
### 🔹 `intfloat/multilingual-e5-small`

* **Model Type:** Sentence Embedding (Multilingual)
* **Embedding Size:** 384 dimensions  
* **Max Input Tokens:** 512   
* **Architecture:** E5 (Embedding from Instructions with Encoder-only transformer)
* **Supported Languages:**

    `Sentence Similarity`, `multilingual`, `Afrikaans`, `Amharic`, `Arabic`, `Assamese`, `Azerbaijani`, `Belarusian`, `Bulgarian`, `Bengali`, `Breton`, `Bosnian`, `Catalan`, `Czech`, `Welsh`, `Danish`, `German`, `Greek`, `English`, `Esperanto`, `Spanish`, `Estonian`, `Basque`, `Persian`, `Finnish`, `French`, `Western Frisian`, `Irish`, `Scottish     Gaelic`, `Galician`, `Gujarati`, `Hausa`, `Hebrew`, `Hindi`, `Croatian`, `Hungarian`, `Armenian`, `Indonesian`, `Icelandic`, `Italian`, `Japanese`, `Javanese`, `Georgian`, `Kazakh`, `Khmer`, `Kannada`, `Korean`, `Kurdish`, `Kyrgyz`, `Latin`, `Lao`, `Lithuanian`, `Latvian`, `Malagasy`, `Macedonian`, `Malayalam`, `Mongolian`, `Marathi`, `Malay`, `Burmese`, `Nepali`, `Dutch`, `Norwegian`, `Oromo`, `Oriya`, `Panjabi`, `Polish`, `Pashto`, `Portuguese`, `Romanian`, `Russian`, `Sanskrit`, `Sindhi`, `Sinhala`, `Slovak`, `Slovenian`, `Somali`, `Albanian`, `Serbian`, `Sundanese`, `Swedish`, `Swahili`, `Tamil`, `Telugu`, `Thai`, `Tagalog`, `Turkish`, `Uyghur`, `Ukrainian`, `Urdu`, `Uzbek`, `Vietnamese`, `Xhosa`, `Yiddish`, `Chinese`



#### 📌 Description:
This is a lightweight and efficient multilingual embedding model based on the E5 architecture. It is designed to generate dense vector representations of sentences across many languages with competitive performance and low resource usage.

It is trained using instruction-style prompts to improve downstream performance on tasks like semantic search and text classification.


#### ✅ Use Cases:
- Semantic text search across multiple languages  
- Sentence similarity for global-scale content  
- Multilingual knowledge base retrieval  
- Cost-effective vector embedding for large-scale systems

---

### 🔹 `intfloat/multilingual-e5-base`

* **Model Type:** Sentence Embedding (Multilingual)
* **Embedding Size:** 768 dimensions  
* **Max Input Tokens:** 512  
* **Supported Languages:**
    `Sentence Similarity`, `multilingual`, `Afrikaans`, `Amharic`, `Arabic`, `Assamese`, `Azerbaijani`, `Belarusian`, `Bulgarian`, `Bengali`, `Breton`, `Bosnian`, `Catalan`, `Czech`, `Welsh`, `Danish`, `German`, `Greek`, `English`, `Esperanto`, `Spanish`, `Estonian`, `Basque`, `Persian`, `Finnish`, `French`, `Western Frisian`, `Irish`, `Scottish Gaelic`, `Galician`, `Gujarati`, `Hausa`, `Hebrew`, `Hindi`, `Croatian`, `Hungarian`, `Armenian`, `Indonesian`, `Icelandic`, `Italian`, `Japanese`, `Javanese`, `Georgian`, `Kazakh`, `Khmer`, `Kannada`, `Korean`, `Kurdish`, `Kyrgyz`, `Latin`, `Lao`, `Lithuanian`, `Latvian`, `Malagasy`, `Macedonian`, `Malayalam`, `Mongolian`, `Marathi`, `Malay`, `Burmese`, `Nepali`, `Dutch`, `Norwegian`, `Oromo`, `Oriya`, `Panjabi`, `Polish`, `Pashto`, `Portuguese`, `Romanian`, `Russian`, `Sanskrit`, `Sindhi`, `Sinhala`, `Slovak`, `Slovenian`, `Somali`, `Albanian`, `Serbian`, `Sundanese`, `Swedish`, `Swahili`, `Tamil`, `Telugu`, `Thai`, `Tagalog`, `Turkish`, `Uyghur`, `Ukrainian`, `Urdu`, `Uzbek`, `Vietnamese`, `Xhosa`, `Yiddish`, `Chinese`
  
- **Architecture:** E5-base (Encoder-only transformer, instruction-tuned)

#### 📌 Description:
`multilingual-e5-base` is a powerful multilingual embedding model developed by the `intfloat` team. It builds on the E5 instruction-tuned framework to provide high-quality embeddings optimized for dense retrieval, classification, and semantic similarity tasks.

Compared to the `e5-small` variant, this model offers higher embedding resolution and improved accuracy while maintaining fast inference performance.

#### ✅ Use Cases:
- Multilingual semantic search and retrieval systems  
- Dense passage retrieval (DPR)  
- Cross-lingual question-answering or legal document mapping  
- Advanced RAG (Retrieval-Augmented Generation) pipelines

---

### 🔹 `Alibaba-NLP/gte-multilingual-base`

* **Model Type:** Sentence Embedding (Multilingual)
* **Embedding Size:** 768 dimensions  
* **Max Input Tokens:** 8,192 (SentenceTransformer limit)
* **Tokenizer Max Length:** 32,768 tokens
* **Vocabulary Size:** 250,002 tokens
* **Architecture:** GTE (General Text Embeddings, BERT-style transformer)
* **Supported Languages:**

    `multilingual`, `Arabic`, `Bulgarian`, `Catalan`, `Czech`, `Danish`, `German`, `Greek`, `English`, `Spanish`, `Estonian`, `Persian`, `Finnish`, `French`, `Galician`, `Gujarati`, `Hebrew`, `Hindi`, `Croatian`, `Hungarian`, `Armenian`, `Indonesian`, `Italian`, `Japanese`, `Georgian`, `Korean`, `Kurdish`, `Lithuanian`, `Latvian`, `Macedonian`, `Mongolian`, `Marathi`, `Malay`, `Burmese`, `Norwegian Bokmål`, `Dutch`, `Polish`, `Portuguese`, `Romanian`, `Russian`, `Slovak`, `Slovenian`, `Albanian`, `Serbian`, `Swedish`, `Thai`, `Turkish`, `Ukrainian`, `Urdu`, `Vietnamese`

#### 📌 Description:
`gte-multilingual-base` is a high-performance multilingual embedding model developed by Alibaba-NLP. It supports an extended context window of up to 8,192 tokens for SentenceTransformer operations (with tokenizer supporting up to 32,768 tokens), making it exceptionally well-suited for long-document embeddings and advanced RAG applications.

This model demonstrates excellent performance across 50+ languages and is optimized for various downstream tasks including search ranking, semantic similarity, and question answering. Its large vocabulary (250K+ tokens) and substantial context window make it ideal for processing complex, multilingual documents.


#### ✅ Use Cases:
- **Long Document Processing**: Handle documents up to 8K tokens without chunking
- **Multilingual Semantic Search**: Excellent cross-language understanding
- **Advanced RAG Pipelines**: Large context for better retrieval accuracy
- **Enterprise Applications**: High-quality embeddings for business documents
- **Academic Research**: Process lengthy research papers and technical documents