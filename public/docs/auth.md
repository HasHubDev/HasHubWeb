# Authentication

Learn how to authenticate your requests to HashHub APIs securely and efficiently.

## API Key Authentication

HashHub uses API key authentication for all requests. Your API key identifies your account and provides access to your subscribed services.

### Getting Your API Key

1. **Sign up** at [dashboard.hashub.ai](https://dashboard.hashub.ai)
2. Navigate to **API Keys** in your dashboard
3. Click **Create New Key**
4. Give your key a descriptive name
5. Copy and securely store your API key

⚠️ **Security Warning**: Never expose your API key in client-side code, public repositories, or logs.

### Using Your API Key

Include your API key in the `Authorization` header of every request:

```http
Authorization: Bearer YOUR_API_KEY
```

### Example Requests

#### Basic Authentication
```bash
curl -H "Authorization: Bearer hh_1234567890abcdef" \
  https://api.hashub.ai/v1/doc/ocr/fast
```

#### Verify API Key
```bash
curl -X GET "https://api.hashub.ai/v1/auth/verify" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Environment Variables

### Recommended Setup

Store your API key in environment variables for security:

#### Linux/macOS
```bash
export HASHUB_API_KEY="your_api_key_here"
```

#### Windows
```cmd
set HASHUB_API_KEY=your_api_key_here
```

#### .env File
```env
HASHUB_API_KEY=your_api_key_here
```

### Loading Environment Variables

#### Python
```python
import os
api_key = os.getenv("HASHUB_API_KEY")
```

#### Node.js
```javascript
const apiKey = process.env.HASHUB_API_KEY;
```

## SDK Authentication

### Python SDK
```python
from hashub import HashubClient

# Method 1: Direct API key
client = HashubClient(api_key="your_api_key")

# Method 2: Environment variable
client = HashubClient()  # Automatically reads HASHUB_API_KEY
```

### JavaScript SDK
```javascript
import { HashubClient } from '@hashub/sdk';

// Method 1: Direct API key
const client = new HashubClient({
  apiKey: 'your_api_key'
});

// Method 2: Environment variable
const client = new HashubClient({
  apiKey: process.env.HASHUB_API_KEY
});
```

## API Key Management

### Key Rotation

For security, regularly rotate your API keys:

1. **Create a new key** in the dashboard
2. **Update your applications** with the new key
3. **Test** that everything works correctly
4. **Delete the old key** from the dashboard

### Multiple Keys

You can create multiple API keys for different purposes:

- **Development**: For testing and development
- **Production**: For live applications
- **Monitoring**: For health checks and monitoring
- **Team Members**: Individual keys for team members

### Key Permissions

Each API key can have different permissions:

- **Full Access**: Complete access to all APIs
- **Read Only**: Only read operations allowed
- **Limited Scope**: Access to specific endpoints only

## Rate Limiting

API keys are subject to rate limits based on your subscription:

- **Free Tier**: 1,000 requests/month, 10 requests/minute
- **Starter**: 10,000 requests/month, 100 requests/minute
- **Professional**: 100,000 requests/month, 1,000 requests/minute
- **Enterprise**: Custom limits

### Rate Limit Headers

Check these response headers to monitor your usage:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Handling

### Authentication Errors

#### Invalid API Key
```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired.",
    "request_id": "req_1234567890"
  }
}
```

#### Missing API Key
```json
{
  "error": {
    "code": "MISSING_API_KEY",
    "message": "API key is required for this endpoint.",
    "request_id": "req_1234567890"
  }
}
```

#### Rate Limit Exceeded
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "request_id": "req_1234567890",
    "retry_after": 60
  }
}
```

### Best Practices for Error Handling

#### Python Example
```python
import requests
from requests.exceptions import HTTPError

def make_api_request(url, headers, data=None):
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        if e.response.status_code == 401:
            print("Invalid API key. Please check your credentials.")
        elif e.response.status_code == 429:
            print("Rate limit exceeded. Please wait before retrying.")
        else:
            print(f"API error: {e.response.status_code}")
        raise
```

#### JavaScript Example
```javascript
async function makeApiRequest(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your credentials.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before retrying.');
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
```

## Security Best Practices

### 1. Never Expose API Keys
- Don't commit API keys to version control
- Don't include API keys in client-side code
- Don't log API keys in application logs

### 2. Use Environment Variables
- Store API keys in environment variables
- Use secure secret management systems in production

### 3. Implement Key Rotation
- Rotate API keys regularly (every 90 days recommended)
- Have a process for emergency key rotation

### 4. Monitor Usage
- Regularly review API key usage in the dashboard
- Set up alerts for unusual activity

### 5. Use Least Privilege
- Create API keys with minimal required permissions
- Use different keys for different environments

## Troubleshooting

### Common Issues

#### "Invalid API Key" Error
- Check that your API key is correctly set
- Verify the key hasn't been deleted or expired
- Ensure there are no extra spaces or characters

#### "Rate Limit Exceeded" Error
- Check your current usage in the dashboard
- Implement exponential backoff in your retry logic
- Consider upgrading your plan for higher limits

#### Connection Errors
- Verify your internet connection
- Check if your firewall allows HTTPS traffic
- Try the request again after a short delay

## Support

If you're having authentication issues:

1. Check your API key in the dashboard
2. Review this documentation
3. Contact our support team at support@hashub.ai
4. Join our Discord community for peer help

For enterprise customers, priority support is available with guaranteed response times.
