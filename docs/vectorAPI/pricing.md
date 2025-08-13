# Pricing Guide

Transparent and competitive pricing for HashHub Vector API with real tokenizer-based billing.

## 💰 Pay-Per-Use Pricing

All pricing is based on actual tokens processed, calculated using the real model tokenizer for maximum accuracy.

### 📊 Model Pricing Table

| Model | Price per 1M Tokens | Best For | Tier Required |
|-------|-------------------|----------|---------------|
| **`gte_base`** | **$0.010** | Long documents, RAG | Pro+ |
| **`nomic_base`** | **$0.005** | General purpose | Pro+ |
| **`mpnet_base`** | **$0.0035** | Q&A, similarity | Starter+ |
| **`e5_base`** | **$0.003** | Search, classification | Starter+ |
| **`minilm_base`** | **$0.0025** | Fast processing | All tiers |
| **`e5_small`** | **$0.002** | High-volume, real-time | All tiers |

## 🎯 Subscription Tiers

### 🆓 Free Tier - $0/month
- **Rate Limit:** 100 requests/hour, 10/minute
- **Batch Size:** Up to 5 texts per request
- **Models:** `e5_small` only
- **Monthly Credits:** $2 included
- **Support:** Community forum

**Perfect for:** Testing, prototyping, small personal projects

### 🚀 Starter - $29/month
- **Rate Limit:** 1,000 requests/hour, 50/minute
- **Batch Size:** Up to 50 texts per request
- **Models:** `e5_small`, `mpnet_base`, `e5_base`
- **Monthly Credits:** $50 included
- **Support:** Email support (48h response)

**Perfect for:** Small businesses, individual developers, MVPs

### 💼 Pro - $99/month
- **Rate Limit:** 10,000 requests/hour, 500/minute
- **Batch Size:** Up to 500 texts per request
- **Models:** All models available
- **Monthly Credits:** $200 included
- **Support:** Priority email (24h response)
- **Features:** Usage analytics, custom rate limits

**Perfect for:** Growing businesses, production applications

### 🏢 Enterprise - Custom Pricing
- **Rate Limit:** Unlimited
- **Batch Size:** Up to 1,000 texts per request
- **Models:** All models + custom fine-tuning
- **Monthly Credits:** Custom allocation
- **Support:** Dedicated support team (4h response)
- **Features:** SLA guarantee, custom deployment, bulk discounts

**Perfect for:** Large organizations, high-volume applications

## 💡 Usage Examples & Cost Calculations

### Example 1: Customer Support Chatbot
**Scenario:** Processing 10,000 customer queries/day (avg 75 tokens each)
- **Daily tokens:** 750,000
- **Monthly tokens:** ~22.5M
- **Model:** `e5_small` (fast response needed)
- **Monthly cost:** 22.5M × $0.002 = **$45**
- **Recommended tier:** Starter ($29/month + $45 usage = $74/month)

### Example 2: Document Search System
**Scenario:** Indexing 5,000 documents/week (avg 800 tokens each)
- **Weekly tokens:** 4M
- **Monthly tokens:** ~16M
- **Model:** `gte_base` (long context needed)
- **Monthly cost:** 16M × $0.010 = **$160**
- **Recommended tier:** Pro ($99/month + $160 usage = $259/month)

### Example 3: E-commerce Product Search
**Scenario:** Processing 50,000 product descriptions + 100,000 search queries/month
- **Product descriptions:** 50K × 150 tokens = 7.5M tokens
- **Search queries:** 100K × 25 tokens = 2.5M tokens
- **Total monthly tokens:** 10M
- **Model:** `e5_base` (optimized for search)
- **Monthly cost:** 10M × $0.003 = **$30**
- **Recommended tier:** Starter ($29/month + $30 usage = $59/month)

### Example 4: Research Paper Analysis
**Scenario:** Processing 1,000 academic papers/month (avg 5,000 tokens each)
- **Monthly tokens:** 5M
- **Model:** `gte_base` (high quality needed)
- **Monthly cost:** 5M × $0.010 = **$50**
- **Recommended tier:** Starter ($29/month + $50 usage = $79/month)

### Example 5: Real-time Content Moderation
**Scenario:** Analyzing 500,000 social media posts/month (avg 30 tokens each)
- **Monthly tokens:** 15M
- **Model:** `e5_small` (speed priority)
- **Monthly cost:** 15M × $0.002 = **$30**
- **Recommended tier:** Starter ($29/month + $30 usage = $59/month)

## 🧮 Cost Calculator

### Interactive Cost Estimation

```python
def calculate_monthly_cost(texts_per_day, avg_tokens_per_text, model="e5_base"):
    model_prices = {
        "gte_base": 0.010,
        "nomic_base": 0.005,
        "e5_base": 0.003,
        "mpnet_base": 0.0035,
        "e5_small": 0.002,
        "minilm_base": 0.0025
    }
    
    daily_tokens = texts_per_day * avg_tokens_per_text
    monthly_tokens = daily_tokens * 30
    
    price_per_1M = model_prices.get(model, 0.005)
    monthly_cost = (monthly_tokens / 1_000_000) * price_per_1M
    
    return {
        "monthly_tokens": monthly_tokens,
        "monthly_cost": round(monthly_cost, 2),
        "model": model,
        "price_per_1M": price_per_1M
    }

# Example usage
result = calculate_monthly_cost(
    texts_per_day=1000,
    avg_tokens_per_text=100,
    model="e5_base"
)
print(f"Monthly cost: ${result['monthly_cost']}")
# Output: Monthly cost: $9.00
```

## 📈 Volume Discounts

### Enterprise Volume Pricing
For high-volume customers (>100M tokens/month):

| Monthly Volume | Discount | Effective Price Range |
|---------------|----------|----------------------|
| 100M - 500M tokens | 10% off | $0.0018 - $0.0090 |
| 500M - 1B tokens | 20% off | $0.0016 - $0.0080 |
| 1B+ tokens | 30% off | $0.0014 - $0.0070 |

### Annual Subscription Discounts
Pay annually and save:
- **Starter:** $290/year (2 months free)
- **Pro:** $990/year (2 months free)
- **Enterprise:** Custom (up to 25% off)

## 🔄 Billing & Payment

### Payment Methods
- 💳 Credit/Debit Cards (Visa, MasterCard, Amex)
- 🏦 ACH/Bank Transfer (Enterprise only)
- 📄 Invoice Payment (Enterprise only)
- ₿ Cryptocurrency (Bitcoin, Ethereum)

### Billing Cycle
- **Usage Billing:** Real-time token deduction from account balance
- **Subscription:** Monthly billing on signup date
- **Credits:** Included credits reset monthly
- **Overages:** Billed at the end of each month

### Credit System
- **Prepaid Credits:** Purchase credits in advance
- **Auto-Reload:** Automatically reload when balance drops below threshold
- **Unused Credits:** Roll over to next month (up to 2x monthly allocation)

## 🏷️ Pricing Comparison

### vs. OpenAI Embeddings
| Provider | Model | Price/1M tokens | Performance |
|----------|-------|----------------|-------------|
| **HashHub** | `gte_base` | **$0.010** | Superior multilingual |
| OpenAI | text-embedding-ada-002 | $0.100 | English-focused |
| **HashHub** | `e5_base` | **$0.003** | Comparable quality |

**💰 Savings: Up to 97% cheaper than OpenAI**

### vs. Cohere Embeddings
| Provider | Model | Price/1M tokens | Languages |
|----------|-------|----------------|-----------|
| **HashHub** | `nomic_base` | **$0.005** | 100+ languages |
| Cohere | embed-multilingual-v3.0 | $0.100 | 100+ languages |
| **HashHub** | `mpnet_base` | **$0.0035** | 100+ languages |

**💰 Savings: Up to 96% cheaper than Cohere**

### vs. Google Vertex AI
| Provider | Model | Price/1M tokens | Context |
|----------|-------|----------------|---------|
| **HashHub** | `gte_base` | **$0.010** | 8,192 tokens |
| Google | textembedding-gecko | $0.125 | 3,072 tokens |

**💰 Savings: 92% cheaper with longer context**

## 🎁 Free Credits & Promotions

### New User Bonus
- **$10 free credits** for all new signups
- **No credit card required** for Free tier
- **7-day Pro trial** with $50 credits

### Referral Program
- **$25 credits** for each successful referral
- **20% discount** for referred users' first 3 months
- **Unlimited referrals** - earn up to $500/month

### Academic Discount
- **50% off** all subscription tiers for:
  - University students and faculty
  - Academic research projects
  - Non-profit educational organizations
- Contact [academic@hashhub.dev](mailto:academic@hashhub.dev) to apply

### Startup Credits
- **$500 free credits** for eligible startups
- **3 months Pro tier free** for Y Combinator, Techstars alumni
- **$2,000 credits** for series A+ funded companies
- Apply at [startup@hashhub.dev](mailto:startup@hashhub.dev)

## 📊 Usage Monitoring & Alerts

### Real-time Usage Dashboard
- **Current balance** and usage statistics
- **Daily/weekly/monthly** consumption graphs
- **Model-specific** cost breakdown
- **Projected monthly** spending

### Cost Control Features
- **Budget alerts** at 50%, 80%, 95% of monthly limit
- **Usage caps** to prevent overspending
- **Model restrictions** based on budget
- **Auto-pause** when budget exceeded

### Billing Transparency
- **Per-request cost** shown in API responses
- **Real-time balance** deduction
- **Detailed invoices** with request-level breakdown
- **Usage export** for accounting systems

## 🛡️ Fair Usage Policy

### Rate Limits
Rate limits are designed to ensure fair usage and system stability:
- **Burst allowance:** 2x normal rate for up to 1 minute
- **Fair sharing:** Temporary throttling during high system load
- **Abuse prevention:** Automatic detection of unusual patterns

### Acceptable Use
- ✅ Commercial applications and services
- ✅ Research and academic use
- ✅ Personal projects and experimentation
- ❌ Illegal content processing
- ❌ Spam or abuse generation
- ❌ Competing embedding services

## 💳 Payment Security

### Security Standards
- **PCI DSS Level 1** compliant payment processing
- **TLS 1.3** encryption for all transactions
- **Zero-storage** of payment information
- **SOC 2 Type II** audited infrastructure

### Data Privacy
- **No text storage** after processing
- **GDPR compliant** data handling
- **Regional data processing** available
- **Right to deletion** honored within 30 days

## 📞 Billing Support

### Self-Service
- **Billing dashboard** for payment management
- **Invoice download** and payment history
- **Usage reports** and cost analysis
- **Credit purchase** and auto-reload setup

### Customer Support
- **Free tier:** Community forum
- **Paid tiers:** Email support with SLA
- **Enterprise:** Dedicated account manager
- **24/7 billing support** for payment issues

### Contact Information
- 💌 **Billing inquiries:** billing@hashhub.dev
- 📞 **Enterprise sales:** sales@hashhub.dev
- 🎓 **Academic discount:** academic@hashhub.dev
- 🚀 **Startup program:** startup@hashhub.dev

---

## 🚀 Getting Started

1. **Sign up** at [vector.hashhub.dev](https://vector.hashhub.dev)
2. **Choose your tier** based on expected usage
3. **Get $10 free credits** to start testing
4. **Monitor usage** with our real-time dashboard
5. **Scale up** as your application grows

**Questions about pricing?** Our team is here to help you find the most cost-effective solution for your use case. Contact us at [support@hashhub.dev](mailto:support@hashhub.dev)!
