# Deployment Guide for RahulAI Portfolio

## 🚀 Deploy to Vercel with Custom Domain (rahulai.com)

### Prerequisites
1. ✅ GitHub repository with your portfolio code
2. ✅ Vercel account (sign up at vercel.com)
3. ✅ Domain name (rahulai.com) - ensure you have access to DNS settings
4. ✅ OpenRouter API key for AI functionality

### Step 1: Deploy to Vercel

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository: `rahulbedjavalge/portfolio`
   - Vercel will auto-detect it's a Next.js project

2. **Configure Environment Variables**
   - In the deployment settings, add these environment variables:
   ```
   OPENROUTER_API_KEY=your_actual_openrouter_api_key
   NEXT_PUBLIC_SITE_URL=https://rahulai.com
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a temporary URL like: `your-project-name.vercel.app`

### Step 2: Add Custom Domain (rahulai.com)

1. **Add Domain in Vercel**
   - Go to your project dashboard on Vercel
   - Click on "Settings" → "Domains"
   - Add `rahulai.com` and `www.rahulai.com`

2. **Configure DNS Settings**
   - Go to your domain registrar's DNS management
   - Add these DNS records:
   ```
   Type: A
   Name: @ (or root)
   Value: 76.76.19.19

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - Your site will be available at `https://rahulai.com`

### Step 3: Verify Deployment

1. **Test AI Functionality**
   - Visit your deployed site
   - Test the chat interface
   - Verify API responses are working

2. **Test Mobile Responsiveness**
   - Check on different devices
   - Verify all pages load correctly
   - Test download CV functionality

3. **Performance Check**
   - Use Lighthouse to check performance
   - Verify SEO settings
   - Test loading speeds

### Environment Variables Required

```bash
# Production Environment Variables for Vercel
OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here
NEXT_PUBLIC_SITE_URL=https://rahulai.com
```

### Build Commands (Auto-detected by Vercel)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Troubleshooting

1. **API Key Issues**
   - Verify OPENROUTER_API_KEY is correctly set in Vercel
   - Check the API key has sufficient credits
   - Monitor function logs in Vercel dashboard

2. **Domain Not Working**
   - DNS changes can take 24-48 hours to propagate
   - Verify DNS records are correctly configured
   - Check domain status in Vercel dashboard

3. **Build Failures**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in package.json
   - Ensure TypeScript compilation passes

### Post-Deployment Checklist

- [ ] Site loads at https://rahulai.com
- [ ] AI chat functionality works
- [ ] All pages (Home, About, Contact, Chat) are accessible
- [ ] Mobile responsiveness is working
- [ ] CV download works
- [ ] Contact information is correct
- [ ] SSL certificate is active

### Monitoring & Maintenance

1. **Analytics**
   - Add Google Analytics (optional)
   - Monitor Vercel function usage
   - Track API key usage on OpenRouter

2. **Updates**
   - Push to GitHub main branch for automatic deployment
   - Monitor build status in Vercel
   - Keep dependencies updated

## 🎯 Your Portfolio is Ready!

Once deployed, your portfolio will showcase:
- Interactive AI assistant (RahulAI)
- Professional CV and experience
- Modern, responsive design
- Direct contact information
- Downloadable CV functionality

Your professional AI-powered portfolio will be live at **https://rahulai.com** 🚀
