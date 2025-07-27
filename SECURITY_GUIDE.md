# 🔐 Security Configuration Guide

## Admin Authentication Setup

### Environment Variables Required

For production deployment, you MUST set these environment variables:

```bash
# Required for Admin Access
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_secure_password  
ADMIN_JWT_SECRET=your_jwt_secret_key

# OpenRouter API
OPENROUTER_API_KEY=your_api_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Security Best Practices

#### 1. Strong Credentials
- **Username**: Avoid common usernames like 'admin', 'administrator'
- **Password**: Minimum 12 characters, include uppercase, lowercase, numbers, symbols
- **JWT Secret**: Minimum 32 characters, completely random string

#### 2. Environment Setup

**Development:**
```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

**Production (Vercel):**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with secure values
4. Never use development credentials in production

#### 3. Credential Generation

**Generate secure password:**
```bash
# Using OpenSSL (recommended)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Generate JWT secret:**
```bash
# 256-bit secret for JWT
openssl rand -hex 32
```

### Deployment Checklist

- [ ] Environment variables set in production
- [ ] Default credentials changed
- [ ] Strong passwords used (12+ characters)
- [ ] JWT secret is 32+ characters
- [ ] .env files not committed to git
- [ ] Admin access tested in production
- [ ] Backup credentials stored securely

### Admin Access URLs

- **Development**: `http://localhost:3000/admin/login`
- **Production**: `https://yourdomain.com/admin/login`

### Security Features

✅ **JWT Authentication**: 24-hour session tokens
✅ **HTTP-Only Cookies**: Secure session storage  
✅ **Environment Variables**: No hardcoded credentials
✅ **Development Mode**: Auto-access for local development
✅ **Production Lock**: Requires proper authentication
✅ **Session Expiration**: Automatic logout after 24 hours

### Emergency Access

If you lose admin credentials:

1. **Development**: Clear localStorage and restart dev server
2. **Production**: Update environment variables in hosting platform
3. **Backup**: Store credentials in secure password manager

### Common Issues

**Issue**: Cannot login in production
**Solution**: Verify environment variables are set correctly

**Issue**: "Admin credentials not configured" error  
**Solution**: Set ADMIN_USERNAME and ADMIN_PASSWORD in production

**Issue**: Session expires immediately
**Solution**: Check ADMIN_JWT_SECRET is set and consistent

---

**⚠️ NEVER commit credentials to version control!**
**🔒 Always use environment variables for sensitive data!**
