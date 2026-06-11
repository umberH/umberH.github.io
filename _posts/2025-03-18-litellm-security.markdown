---
layout: post
sublayout: post.html
title: "LiteLLM Security Considerations: Lessons from a Close Call"
date: 2025-03-18 14:30:00 +1000
categories: Security AI
---

LiteLLM is a fantastic library for unified LLM API access, but like any proxy sitting between your application and paid APIs, it introduces security considerations that can't be ignored. This post covers security lessons learned from deploying LiteLLM in production and a close call that could have cost thousands of dollars.

## What is LiteLLM?

For those unfamiliar, [LiteLLM](https://github.com/BerriAI/litellm) is a library that provides a unified interface to 100+ LLM APIs:

```python
from litellm import completion

# OpenAI
response = completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

# Anthropic (same interface!)
response = completion(
    model="claude-3-opus-20240229",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

It's incredibly convenient for:
- Multi-provider fallback
- Load balancing across providers
- Cost optimization
- Standardized logging and monitoring

But with great power comes great responsibility (and attack surface).

## The Incident: A Wake-Up Call

**Timeline**: Monday, 2 AM

I woke up to Slack alerts:

```
⚠️ ALERT: OpenAI API costs spike detected
📈 Last hour: $347.23 (normal: $12-15/hr)
```

My heart sank. I grabbed my laptop.

### What Happened

Someone discovered our LiteLLM proxy endpoint (my fault for testing on a public URL) and started hammering it with requests:

```bash
# Attacker's script (reconstructed from logs)
while true; do
  curl -X POST https://my-litellm-proxy.com/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gpt-4",
      "messages": [{"role": "user", "content": "'"$RANDOM_TEXT"'"}],
      "max_tokens": 4000
    }'
done
```

They ran this from multiple IPs for about 45 minutes before my cost alerts triggered.

**Damage**:
- $347 in unauthorized API usage
- ~1,200 requests to GPT-4
- Temporary rate limit ban from OpenAI

**Root Cause**: No authentication on the proxy endpoint.

### How I Stopped It

1. **Immediate**: Killed the LiteLLM server
2. **Rotated API keys** (in case they were compromised)
3. **Analyzed logs** to understand the attack
4. **Blocked IPs** at firewall level
5. **Implemented proper security** (see below)

### Could Have Been Worse

If I hadn't had cost alerts set up, this could have continued for days. At that rate:
- **24 hours**: $8,334
- **1 week**: $58,338
- **1 month**: $249,864

🚨 **Always set up billing alerts!**

## Security Best Practices for LiteLLM

Here's what I learned (the hard way) about securing LiteLLM deployments.

### 1. Authentication & Authorization

**NEVER expose LiteLLM without authentication.**

#### Option A: API Key Authentication

```yaml
# config.yaml
model_list:
  - model_name: gpt-4
    litellm_params:
      model: gpt-4
      api_key: os.environ/OPENAI_API_KEY

# Enable authentication
general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
```

```python
# Client usage
import os
from litellm import completion

response = completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}],
    api_key=os.environ.get("LITELLM_API_KEY")  # Required!
)
```

#### Option B: Virtual Keys (Recommended for Multi-User)

```yaml
# Create user-specific keys with limits
litellm_settings:
  drop_params: true

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
  database_url: "postgresql://..."  # Store virtual keys
```

```bash
# Create virtual key via API
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \
  -d '{
    "models": ["gpt-4", "claude-3-opus"],
    "max_budget": 100,
    "budget_duration": "30d",
    "user_id": "john@company.com"
  }'
```

**Benefits**:
- Per-user tracking
- Individual budgets
- Easy key revocation
- Usage analytics

### 2. Rate Limiting

Protect against abuse and accidental runaway loops:

```yaml
model_list:
  - model_name: gpt-4
    litellm_params:
      model: gpt-4
      api_key: os.environ/OPENAI_API_KEY
    model_info:
      # Rate limits
      rpm: 100  # requests per minute
      tpm: 100000  # tokens per minute

# User-level rate limits
litellm_settings:
  rate_limit_config:
    - user: "default"
      rpm: 20
      tpm: 20000
    - user: "premium_user"
      rpm: 100
      tpm: 100000
```

### 3. Budget Controls

Prevent cost explosions:

```python
# Set budget for virtual key
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \
  -d '{
    "max_budget": 100,
    "budget_duration": "30d"
  }'
```

**Additional safety**: Environment-level budget caps

```yaml
general_settings:
  max_budget: 1000  # Hard cap for all users
  budget_duration: "monthly"
```

### 4. Network Security

#### Private Network Deployment

```yaml
# docker-compose.yml
services:
  litellm:
    image: ghcr.io/berriai/litellm:latest
    networks:
      - internal
    # No ports exposed to public internet!

  app:
    networks:
      - internal
    # Only the app talks to LiteLLM

networks:
  internal:
    driver: bridge
```

#### VPN/Tailscale Access

For remote access, use VPN instead of public exposure:

```bash
# Access via Tailscale
curl http://litellm.tailnet-name.ts.net/chat/completions
```

#### Reverse Proxy with Authentication

If you must expose publicly, use a reverse proxy:

```nginx
# nginx.conf
server {
    listen 443 ssl;
    server_name api.yourcompany.com;

    # Client certificate authentication
    ssl_client_certificate /path/to/ca.crt;
    ssl_verify_client on;

    # Or HTTP Basic Auth
    auth_basic "LiteLLM Access";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass http://litellm:4000;

        # Rate limiting
        limit_req zone=api_limit burst=10;
    }
}

# Rate limit zone
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
```

### 5. Request Validation

Prevent malicious inputs:

```python
# Custom middleware for LiteLLM proxy
from litellm.proxy.proxy_server import router
from fastapi import Request, HTTPException

@router.middleware("http")
async def validate_request(request: Request, call_next):
    body = await request.json()

    # Limit max tokens
    if body.get("max_tokens", 0) > 4000:
        raise HTTPException(
            status_code=400,
            detail="max_tokens exceeds limit of 4000"
        )

    # Limit messages length
    messages = body.get("messages", [])
    total_chars = sum(len(m.get("content", "")) for m in messages)
    if total_chars > 50000:
        raise HTTPException(
            status_code=400,
            detail="Input too long"
        )

    # Block certain models
    blocked_models = ["gpt-4-32k"]  # Too expensive
    if body.get("model") in blocked_models:
        raise HTTPException(
            status_code=403,
            detail=f"Model {body.get('model')} not allowed"
        )

    response = await call_next(request)
    return response
```

### 6. Logging & Monitoring

**Essential logging setup**:

```yaml
litellm_settings:
  success_callback: ["langfuse", "prometheus"]
  failure_callback: ["sentry"]

  # Log all requests
  request_logging: true

  # Store in database for analysis
  database_url: "postgresql://..."
```

**Key metrics to monitor**:
- Requests per user/key
- Cost per user/key
- Token usage over time
- Failed authentication attempts
- Unusual request patterns

**Alerting**:

```python
# Example: Cost alert with Prometheus
from prometheus_client import Counter, Gauge

cost_gauge = Gauge('litellm_cost_hourly', 'Cost per hour')
requests_counter = Counter('litellm_requests', 'Requests', ['user', 'model'])

# Alert if hourly cost > $50
if cost_gauge.get() > 50:
    send_alert("Cost spike detected!")
```

### 7. Secret Management

**Never hardcode API keys!**

```yaml
# ❌ BAD
model_list:
  - model_name: gpt-4
    litellm_params:
      model: gpt-4
      api_key: sk-proj-abc123...  # NEVER DO THIS

# ✅ GOOD
model_list:
  - model_name: gpt-4
    litellm_params:
      model: gpt-4
      api_key: os.environ/OPENAI_API_KEY
```

**Best practices**:
- Use environment variables
- Use secret managers (AWS Secrets Manager, HashiCorp Vault)
- Rotate keys regularly
- Never commit secrets to git

```bash
# Scan for accidentally committed secrets
pip install detect-secrets
detect-secrets scan --all-files
```

### 8. Content Filtering

Protect against prompt injection and malicious content:

```python
from litellm import completion, SafetySettings

# Azure Content Safety integration
response = completion(
    model="gpt-4",
    messages=messages,
    safety_settings=SafetySettings(
        hate_threshold=0.5,
        sexual_threshold=0.5,
        violence_threshold=0.5
    )
)
```

**Custom filters**:

```python
BLOCKED_PATTERNS = [
    r"ignore previous instructions",
    r"system prompt",
    r"repeat after me",
    # Add patterns based on your use case
]

def contains_injection(text: str) -> bool:
    return any(
        re.search(pattern, text, re.IGNORECASE)
        for pattern in BLOCKED_PATTERNS
    )

# Validate before sending to LLM
if contains_injection(user_input):
    raise ValueError("Potential prompt injection detected")
```

## Secure Deployment Checklist

Before deploying LiteLLM to production:

- [ ] ✅ Authentication enabled (API keys or virtual keys)
- [ ] ✅ Rate limiting configured (per-user and global)
- [ ] ✅ Budget caps set (per-user and global)
- [ ] ✅ Network security (private network or VPN access)
- [ ] ✅ Request validation (max tokens, input length)
- [ ] ✅ Logging and monitoring enabled
- [ ] ✅ Cost alerts configured
- [ ] ✅ Secrets stored securely (no hardcoded keys)
- [ ] ✅ Content filtering implemented
- [ ] ✅ Regular security audits scheduled
- [ ] ✅ Incident response plan documented
- [ ] ✅ API keys rotated regularly

## Advanced Security: Defense in Depth

### Multi-Layer Protection

```
┌─────────────────────────────────────┐
│   Client Application                │
│   - Input validation                │
└───────────┬─────────────────────────┘
            │
┌───────────┴─────────────────────────┐
│   API Gateway / Load Balancer       │
│   - IP whitelisting                 │
│   - DDoS protection                 │
│   - Client cert validation          │
└───────────┬─────────────────────────┘
            │
┌───────────┴─────────────────────────┐
│   Reverse Proxy (Nginx)             │
│   - HTTP Basic Auth                 │
│   - Rate limiting                   │
│   - Request size limits             │
└───────────┬─────────────────────────┘
            │
┌───────────┴─────────────────────────┐
│   LiteLLM Proxy                     │
│   - API key authentication          │
│   - Per-user budgets                │
│   - Request validation              │
│   - Content filtering               │
└───────────┬─────────────────────────┘
            │
┌───────────┴─────────────────────────┐
│   LLM Providers (OpenAI, etc.)      │
└─────────────────────────────────────┘
```

### Audit Logging

Keep detailed logs for security audits:

```python
# Log every request with full context
{
    "timestamp": "2025-03-18T14:30:00Z",
    "user_id": "user_123",
    "api_key": "sk-****last4chars",
    "model": "gpt-4",
    "tokens_used": 1500,
    "cost": 0.045,
    "ip_address": "192.168.1.100",
    "user_agent": "python-requests/2.31.0",
    "request_id": "req_abc123",
    "status": "success"
}
```

### Anomaly Detection

Detect unusual patterns:

```python
# Example: Detect unusual usage patterns
def detect_anomalies(user_id: str):
    recent_requests = get_user_requests(user_id, hours=1)

    # Sudden spike in requests
    if len(recent_requests) > 100:  # Normal: 10-20/hr
        alert(f"User {user_id}: Request spike detected")

    # Expensive models suddenly used
    if any(r.model == "gpt-4" for r in recent_requests):
        if user_typically_uses_cheaper_models(user_id):
            alert(f"User {user_id}: Unusual model usage")

    # Requests from new IP
    ips = {r.ip_address for r in recent_requests}
    if len(ips) > 5:
        alert(f"User {user_id}: Multiple IPs detected")
```

## Cost Recovery & Incident Response

### If You Get Hit

1. **Immediate Actions**:
   - Stop the server
   - Rotate all API keys
   - Block attacker IPs
   - Review logs

2. **Analysis**:
   - How did they discover the endpoint?
   - What data was accessed?
   - Total cost incurred?

3. **Recovery**:
   - Contact provider (OpenAI, Anthropic) – sometimes they're sympathetic
   - File fraud report if applicable
   - Document for insurance/tax

4. **Prevention**:
   - Implement all security measures above
   - Conduct security audit
   - Update incident response plan

### My Recovery

I contacted OpenAI support explaining the situation. They:
- Removed the rate limit ban
- Provided a $150 credit (about 40% of the damage)
- Shared security best practices

**Lesson**: Having good relationship with providers helps.

## Conclusion

LiteLLM is a powerful tool, but power requires responsibility. The convenience of unified LLM access comes with security obligations.

**Key Takeaways**:
1. **Never expose without authentication**
2. **Always use rate limits and budgets**
3. **Monitor costs in real-time**
4. **Deploy on private networks when possible**
5. **Log everything for auditing**
6. **Test your security measures**

The $347 lesson was expensive but cheap compared to what it could have been. Don't learn the hard way like I did.

**Remember**: It's not paranoia if they're really out to get your API keys. 🔒

---

**Resources**:
- [LiteLLM Security Docs](https://docs.litellm.ai/docs/proxy/security)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [My LiteLLM Security Config (GitHub Gist)](https://gist.github.com/...)

*Have you had similar experiences? Share your security horror stories in the comments!*
