# Production Deployment Guide

## Issues Fixed

### 1. 307 Redirect Error - FIXED ✅
**Problem:** `app/page.tsx` was redirecting to `/` (itself), causing infinite redirect loop.
**Solution:** Removed the root `app/page.tsx` file. The marketing page at `app/(marketing)/page.tsx` now serves as the homepage.

### 2. Missing Components - FIXED ✅
**Problem:** Marketing page imported non-existent components (Loader, Hero, etc.).
**Solution:** Simplified the marketing page to remove missing imports while keeping Lenis smooth scrolling.

### 3. Production Configuration - ADDED ✅
- Added image optimization in `next.config.ts`
- Created `.env.production` template
- Added `vercel.json` for deployment
- Created `robots.txt` for SEO
- Added dynamic sitemap at `app/sitemap.ts`
- Enhanced SEO metadata in root layout

## Deployment Steps

### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 2. Environment Variables

Add these to Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production domain)

### 3. Domain Configuration

1. Go to Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables
5. Update `robots.txt` with your domain

### 4. Pre-Deployment Checklist

- [ ] Test build locally: `npm run build`
- [ ] Test production server: `npm start`
- [ ] Verify all environment variables
- [ ] Update `.env.production` with production domain
- [ ] Test admin login functionality
- [ ] Verify Supabase connection
- [ ] Check all routes work correctly
- [ ] Test on mobile devices

### 5. Post-Deployment

- [ ] Verify homepage loads without 307 error
- [ ] Test admin authentication
- [ ] Check sitemap: `https://your-domain.com/sitemap.xml`
- [ ] Verify robots.txt: `https://your-domain.com/robots.txt`
- [ ] Test all navigation links
- [ ] Monitor error logs in Vercel dashboard

## Build Command

```bash
npm run build
```

## Start Production Server Locally

```bash
npm run build
npm start
```

## Troubleshooting

### 307 Error Returns
- Ensure `app/page.tsx` is deleted or empty
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`

### Authentication Issues
- Verify Supabase environment variables
- Check Supabase dashboard for auth settings
- Ensure redirect URLs include production domain

### Build Failures
- Check for TypeScript errors: `npx tsc --noEmit`
- Verify all imports exist
- Check for missing dependencies

## Performance Optimization

The app is configured with:
- Image optimization via Next.js Image component
- Automatic code splitting
- Server-side rendering for SEO
- Static generation where possible

## Security Notes

- Never commit `.env.local` or `.env.production` to git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use environment variables in Vercel dashboard
- Enable RLS policies in Supabase for all tables
