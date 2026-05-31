# Quick Start Guide - Phase 1 Admin CMS

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Supabase Project
1. Visit https://supabase.com/dashboard
2. Click "New Project"
3. Choose organization and set project name
4. Set database password (save it!)
5. Wait for project to initialize (~2 minutes)

### Step 3: Get Supabase Credentials
In your Supabase project:
1. Go to **Settings** → **API**
2. Copy **Project URL**
3. Copy **anon public** key
4. Copy **service_role** key (under "Project API keys")

### Step 4: Configure Environment
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 5: Run Database Schema
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `database-schema.sql`
4. Paste and click **Run**
5. Verify success (should see "Success. No rows returned")

### Step 6: Create Admin User
In Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter email: `admin@codeconvert.com`
4. Enter password: (choose a strong password)
5. Click **Create user**

### Step 7: Set Admin Role
1. Go to **Table Editor** → **profiles**
2. Find your user (should be auto-created by trigger)
3. Click the row to edit
4. Change `role` from `user` to `admin`
5. Click **Save**

### Step 8: Start Development Server
```bash
npm run dev
```

### Step 9: Login to Admin Panel
1. Open browser to http://localhost:3000/admin/dashboard
2. You'll be redirected to http://localhost:3000/admin-login
3. Enter your admin credentials
4. Click **Sign In**
5. You're in! 🎉

---

## 📋 What You Can Do Now

### Dashboard
- View content statistics
- Quick access to create content

### Blog Management
- Create new blog posts
- View all posts
- Edit posts (coming in next update)
- Publish/unpublish posts

### Case Studies
- View all case studies
- Create new case studies (coming in next update)

### Media Library
- View uploaded media
- Upload new files (coming in next update)

### Settings
- View site configuration
- Check database status

---

## 🐛 Troubleshooting

### "Invalid login credentials"
- Check email/password are correct
- Verify user exists in Supabase Auth
- Ensure user role is set to 'admin' in profiles table

### "Unauthorized" or redirect loop
- Check environment variables are set correctly
- Verify Supabase URL and keys are correct
- Clear browser cookies and try again

### Database errors
- Ensure database-schema.sql ran successfully
- Check all tables exist in Table Editor
- Verify RLS policies are enabled

### Can't access admin routes
- Check middleware.ts is in root directory
- Verify you're logged in
- Check browser console for errors

---

## 🎯 Next Steps

### Immediate
1. Test creating a blog post
2. Verify data saves to Supabase
3. Test logout functionality
4. Explore all admin pages

### Coming Soon (Phase 2)
1. Blog edit functionality
2. Case study CRUD
3. Media upload with drag & drop
4. Rich text editor
5. Public blog pages
6. Case study showcase
7. Service pages

---

## 📞 Need Help?

Check these files for reference:
- `PHASE_1_COMPLETE.md` - Full implementation details
- `IMPLEMENTATION_SUMMARY.md` - Architecture compliance
- `ARCHITECTURE.md` - System architecture
- `DESIGN_SPECIFICATION.md` - Design system

---

## ✅ Verification

After setup, verify these work:
- [ ] Can login with admin credentials
- [ ] Dashboard shows stats
- [ ] Can navigate all admin pages
- [ ] Can create a blog post
- [ ] Blog post saves to database
- [ ] Can logout successfully
- [ ] Unauthorized access redirects to login

---

**You're all set! Start managing your content.** 🚀