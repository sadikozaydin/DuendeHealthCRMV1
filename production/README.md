# 🚀 Production Webhook System

Enterprise-ready webhook system for Meta, Google Ads, and TikTok lead generation with Supabase integration.

## 📋 Quick Setup Guide

### 1. Supabase Database Setup

```sql
-- Run this SQL in your Supabase SQL editor
-- File: supabase/migrations/create_webhook_system.sql
```

### 2. Environment Variables

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Webhook Secrets
META_WEBHOOK_SECRET=your-meta-webhook-secret
GOOGLE_CLIENT_SECRET=your-google-client-secret  
TIKTOK_WEBHOOK_SECRET=your-tiktok-webhook-secret

# Database (for Laravel)
SUPABASE_DB_HOST=db.your-project.supabase.co
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-db-password
```

### 3. Platform Configuration

#### Meta (Facebook/Instagram)
```
Webhook URL: https://your-domain.com/api/webhooks/meta
Verify Token: your-verify-token
Fields: first_name, last_name, email, phone_number, treatment
```

#### Google Ads
```
Webhook URL: https://your-domain.com/api/webhooks/google
Authentication: Bearer Token
```

#### TikTok
```
Webhook URL: https://your-domain.com/api/webhooks/tiktok
Signature Header: X-Tiktok-Signature
```

## 🏗️ Deployment Options

### Option 1: Express.js (Node.js)

```bash
cd production/express
npm install
npm run build
npm start
```

### Option 2: Laravel (PHP)

```bash
cd production/laravel
composer install --no-dev
php artisan migrate
php artisan serve --host=0.0.0.0 --port=8000
```

### Option 3: Docker Compose

```bash
cd production/deployment
docker-compose up -d
```

### Option 4: Supabase Edge Functions

```bash
cd production/supabase
supabase functions deploy meta-webhook
supabase functions deploy google-webhook  
supabase functions deploy tiktok-webhook
```

## 🔐 Security Features

- ✅ **HMAC Signature Verification** (Meta, TikTok)
- ✅ **JWT Token Validation** (Google)
- ✅ **Rate Limiting** (100 req/min per IP)
- ✅ **CORS Protection**
- ✅ **SSL/TLS Encryption**
- ✅ **Request Size Limits**

## 📊 Monitoring & Logging

### Webhook Logs Table
```sql
SELECT platform, tenant_id, status, COUNT(*) 
FROM webhook_logs 
WHERE received_at >= NOW() - INTERVAL '24 hours'
GROUP BY platform, tenant_id, status;
```

### Performance Metrics
```sql
SELECT 
  platform,
  AVG(processing_time) as avg_time_ms,
  MAX(processing_time) as max_time_ms,
  COUNT(*) as total_requests
FROM webhook_logs 
WHERE received_at >= NOW() - INTERVAL '1 hour'
GROUP BY platform;
```

## 🧪 Testing

### Test Webhook Endpoints

```bash
# Meta Test
curl -X POST https://your-domain.com/api/webhooks/meta \
  -H "X-Hub-Signature-256: sha256=test-signature" \
  -H "Content-Type: application/json" \
  -d '{"entry":[{"changes":[{"value":{"field_data":[{"name":"first_name","values":["Test"]},{"name":"last_name","values":["User"]}]}}]}]}'

# Google Test  
curl -X POST https://your-domain.com/api/webhooks/google \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}'

# TikTok Test
curl -X POST https://your-domain.com/api/webhooks/tiktok \
  -H "X-Tiktok-Signature: tiktok_test-signature" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@example.com"}'
```

## 🔧 Troubleshooting

### Common Issues

1. **Invalid Signature Error**
   - Check webhook secret configuration
   - Verify signature algorithm (SHA1 vs SHA256)
   - Ensure raw body is used for signature verification

2. **Database Connection Error**
   - Verify Supabase credentials
   - Check RLS policies
   - Ensure service role key has proper permissions

3. **Rate Limiting**
   - Adjust rate limits in nginx.conf
   - Monitor webhook frequency
   - Implement exponential backoff

### Health Check

```bash
curl https://your-domain.com/api/webhooks/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-28T13:31:00.000Z",
  "endpoints": [
    "POST /api/webhooks/meta",
    "POST /api/webhooks/google", 
    "POST /api/webhooks/tiktok"
  ]
}
```

## 📈 Scaling Considerations

- **Load Balancing**: Use multiple webhook server instances
- **Database**: Enable connection pooling
- **Caching**: Implement Redis for tenant mapping
- **Monitoring**: Set up alerts for failed webhooks
- **Backup**: Regular database backups
- **CDN**: Use CloudFlare for DDoS protection

## 🎯 Next Steps

1. **Set up monitoring** with Grafana/Prometheus
2. **Implement webhook retry logic** for failed requests
3. **Add webhook replay functionality** for debugging
4. **Create tenant management dashboard**
5. **Set up automated testing pipeline**