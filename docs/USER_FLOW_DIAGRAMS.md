# User Flow Diagrams

This document outlines the complete user flows for both public users and admin users, showing all file paths involved in each journey.

---

## 1. Public User Flow (Marketing → Contact)

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PUBLIC USER JOURNEY                          │
└─────────────────────────────────────────────────────────────────────┘

START: User visits website
│
├─► Homepage
│   ├─ File: app/(marketing)/page.tsx
│   ├─ Layout: app/(marketing)/layout.tsx
│   ├─ Root Layout: app/layout.tsx
│   │
│   └─► Components Loaded:
│       ├─ components/layout/Navbar.tsx
│       ├─ components/layout/Hero.tsx
│       ├─ components/layout/Services.tsx
│       ├─ components/layout/SelectedWork.tsx
│       ├─ components/layout/Process.tsx
│       ├─ components/layout/Testimonials.tsx
│       ├─ components/layout/CTA.tsx
│       ├─ components/layout/Footer.tsx
│       ├─ components/VoidBackground.tsx
│       └─ components/InteractiveCursor.tsx
│
├─► User Explores Content
│   │
│   ├─► Blog Section
│   │   ├─ File: app/(marketing)/blog/page.tsx
│   │   ├─ API: app/api/blogs/route.ts
│   │   ├─ Database: Supabase 'blogs' table
│   │   │
│   │   └─► Individual Blog Post
│   │       ├─ File: app/(marketing)/blog/[slug]/page.tsx
│   │       ├─ API: app/api/blog/[slug]/route.ts
│   │       └─ Components:
│   │           ├─ components/ui/article-header.tsx
│   │           ├─ components/ui/featured-image.tsx
│   │           └─ components/ui/content-section.tsx
│   │
│   ├─► Case Studies Section
│   │   ├─ File: app/(marketing)/case-studies/page.tsx
│   │   ├─ API: app/api/case-studies/route.ts
│   │   ├─ Database: Supabase 'case_studies' table
│   │   │
│   │   └─► Individual Case Study
│   │       ├─ File: app/(marketing)/case-studies/[slug]/page.tsx
│   │       ├─ API: app/api/case-studies/[slug]/route.ts
│   │       └─ Components:
│   │           ├─ components/ui/article-header.tsx
│   │           ├─ components/ui/featured-image.tsx
│   │           ├─ components/ui/content-section.tsx
│   │           └─ components/ui/image-gallery.tsx
│   │
│   ├─► Service Pages
│   │   ├─ E-commerce: app/(marketing)/e-commerce/page.tsx
│   │   └─ Web Design: app/(marketing)/web-design/page.tsx
│   │
│   └─► Legal Pages
│       ├─ Privacy: app/(marketing)/privacy/page.tsx
│       └─ Terms: app/(marketing)/terms/page.tsx
│
└─► Contact Form (CONVERSION POINT)
    ├─ File: app/(marketing)/contact/page.tsx
    ├─ User fills form (name, email, message)
    │
    ├─► Form Submission
    │   ├─ API Endpoint: app/api/contact/route.ts
    │   ├─ Database: Supabase 'contact_submissions' table
    │   └─ Response: Success/Error message
    │
    └─► END: User receives confirmation

┌─────────────────────────────────────────────────────────────────────┐
│                      SUPPORTING INFRASTRUCTURE                       │
├─────────────────────────────────────────────────────────────────────┤
│ • Middleware: middleware.ts (handles routing)                        │
│ • Supabase Client: lib/supabase/client.ts                          │
│ • Supabase Server: lib/supabase/server.ts                          │
│ • Error Handling: app/(marketing)/error.tsx                         │
│ • Loading States: app/(marketing)/loading.tsx                       │
│ • Global Styles: app/globals.css                                    │
│ • Utilities: lib/utils.ts                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Admin User Flow (Login → Content Management)

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ADMIN USER JOURNEY                           │
└─────────────────────────────────────────────────────────────────────┘

START: Admin visits /admin
│
├─► Middleware Check
│   ├─ File: middleware.ts
│   ├─ Checks: User authentication status
│   ├─ Checks: User role = 'admin'
│   │
│   └─► If NOT authenticated or NOT admin
│       └─ REDIRECT to /admin-login
│
├─► Admin Login Page
│   ├─ File: app/admin-login/page.tsx
│   ├─ User enters credentials (email, password)
│   │
│   ├─► Authentication Process
│   │   ├─ Supabase Client: lib/supabase/client.ts
│   │   ├─ Auth Method: supabase.auth.signInWithPassword()
│   │   ├─ Database Check: 'profiles' table for role
│   │   │
│   │   ├─► If credentials invalid
│   │   │   └─ Display error message
│   │   │
│   │   ├─► If role ≠ 'admin'
│   │   │   ├─ Sign out user
│   │   │   └─ Display "Access denied" message
│   │   │
│   │   └─► If successful
│   │       └─ REDIRECT to /admin
│   │
│   └─ Components Used:
│       ├─ components/ui/button.tsx
│       └─ components/ui/input.tsx
│
├─► Admin Dashboard (Protected Route)
│   ├─ File: app/(admin)/admin/page.tsx
│   ├─ Layout: app/(admin)/layout.tsx
│   ├─ Auth Check: lib/supabase/auth.ts (requireAdmin())
│   │
│   ├─► Dashboard Stats Display
│   │   ├─ Total Blogs Count
│   │   ├─ Published Blogs Count
│   │   ├─ Total Case Studies Count
│   │   └─ Published Case Studies Count
│   │
│   ├─► Quick Actions
│   │   ├─ Create New Blog Post → /admin/blogs/new
│   │   ├─ Create Case Study → /admin/case-studies/new
│   │   └─ Upload Media → /admin/media
│   │
│   └─ Components:
│       └─ components/layout/admin-sidebar.tsx
│           ├─ Navigation Links
│           ├─ User Profile Display
│           └─ Logout Button
│
├─► Blog Management
│   │
│   ├─► Blog List
│   │   ├─ File: app/(admin)/admin/blogs/page.tsx
│   │   ├─ API: app/api/blogs/route.ts
│   │   ├─ Database: Supabase 'blogs' table
│   │   ├─ Actions: View, Edit, Delete, Publish/Unpublish
│   │   │
│   │   └─ Components:
│   │       ├─ components/ui/content-grid.tsx
│   │       ├─ components/ui/content-card.tsx
│   │       └─ components/ui/empty-state.tsx
│   │
│   └─► Create/Edit Blog
│       ├─ File: app/(admin)/admin/blogs/new/page.tsx
│       ├─ File: app/(admin)/admin/blogs/[id]/edit/page.tsx
│       ├─ API: app/api/blogs/route.ts (POST/PUT)
│       ├─ Database: Supabase 'blogs' table
│       │
│       └─ Form Fields:
│           ├─ Title, Slug, Excerpt
│           ├─ Content (Rich Text)
│           ├─ Featured Image
│           ├─ Author, Category, Tags
│           ├─ SEO Meta (title, description)
│           └─ Publish Status
│
├─► Case Studies Management
│   │
│   ├─► Case Studies List
│   │   ├─ File: app/(admin)/admin/case-studies/page.tsx
│   │   ├─ API: app/api/case-studies/route.ts
│   │   ├─ Database: Supabase 'case_studies' table
│   │   ├─ Actions: View, Edit, Delete, Publish/Unpublish
│   │   │
│   │   └─ Components:
│   │       ├─ components/ui/content-grid.tsx
│   │       ├─ components/ui/content-card.tsx
│   │       └─ components/ui/empty-state.tsx
│   │
│   └─► Create/Edit Case Study
│       ├─ File: app/(admin)/admin/case-studies/new/page.tsx
│       ├─ File: app/(admin)/admin/case-studies/[id]/edit/page.tsx
│       ├─ API: app/api/case-studies/route.ts (POST/PUT)
│       ├─ Database: Supabase 'case_studies' table
│       │
│       └─ Form Fields:
│           ├─ Title, Slug, Client
│           ├─ Industry, Services
│           ├─ Challenge, Solution, Results
│           ├─ Featured Image, Gallery Images
│           ├─ Testimonial (author, role, content)
│           ├─ SEO Meta (title, description)
│           └─ Publish Status
│
├─► Media Management
│   ├─ File: app/(admin)/admin/media/page.tsx
│   ├─ API: app/api/media/route.ts
│   ├─ Storage: Supabase Storage Buckets
│   ├─ Database: Supabase 'media' table
│   │
│   ├─► Upload Media
│   │   ├─ File selection (images, documents)
│   │   ├─ Upload to Supabase Storage
│   │   ├─ Generate public URL
│   │   └─ Save metadata to database
│   │
│   ├─► Media Library
│   │   ├─ Grid view of all media
│   │   ├─ Search and filter
│   │   ├─ Copy URL to clipboard
│   │   └─ Delete media
│   │
│   └─ Components:
│       ├─ components/ui/image-gallery.tsx
│       └─ components/ui/empty-state.tsx
│
├─► Settings
│   ├─ File: app/(admin)/admin/settings/page.tsx
│   ├─ User profile management
│   ├─ Password change
│   └─ Site configuration
│
└─► Logout
    ├─ Function: lib/supabase/auth.ts (signOut())
    ├─ Clear session cookies
    ├─ Supabase: supabase.auth.signOut()
    └─ REDIRECT to /admin-login

┌─────────────────────────────────────────────────────────────────────┐
│                      ADMIN INFRASTRUCTURE                            │
├─────────────────────────────────────────────────────────────────────┤
│ • Middleware: middleware.ts (protects /admin routes)                │
│ • Auth Utilities: lib/supabase/auth.ts                             │
│   ├─ getUser() - Get current user                                  │
│   ├─ requireAuth() - Require authentication                        │
│   ├─ requireAdmin() - Require admin role                           │
│   └─ signOut() - Logout user                                       │
│ • Supabase Client: lib/supabase/client.ts                          │
│ • Supabase Server: lib/supabase/server.ts                          │
│ • Admin Layout: app/(admin)/layout.tsx                              │
│ • Admin Sidebar: components/layout/admin-sidebar.tsx               │
│ • Form Components: components/ui/*                                  │
│ • Error Handling: lib/errors.ts                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema Overview

### Tables Used in Flows

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATABASE TABLES                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ 1. profiles                                                          │
│    ├─ id (uuid, FK to auth.users)                                  │
│    ├─ email (text)                                                  │
│    ├─ role (text) - 'admin' or 'user'                              │
│    ├─ created_at (timestamp)                                        │
│    └─ updated_at (timestamp)                                        │
│                                                                      │
│ 2. blogs                                                             │
│    ├─ id (uuid)                                                     │
│    ├─ title, slug, excerpt, content                                 │
│    ├─ featured_image, author, category, tags                        │
│    ├─ published (boolean)                                           │
│    ├─ published_at (timestamp)                                      │
│    ├─ seo_title, seo_description                                    │
│    └─ created_at, updated_at                                        │
│                                                                      │
│ 3. case_studies                                                      │
│    ├─ id (uuid)                                                     │
│    ├─ title, slug, client, industry                                 │
│    ├─ services (array), challenge, solution, results               │
│    ├─ featured_image, gallery_images (array)                        │
│    ├─ testimonial_author, testimonial_role, testimonial_content    │
│    ├─ published (boolean)                                           │
│    ├─ published_at (timestamp)                                      │
│    ├─ seo_title, seo_description                                    │
│    └─ created_at, updated_at                                        │
│                                                                      │
│ 4. contact_submissions                                               │
│    ├─ id (uuid)                                                     │
│    ├─ name, email, message                                          │
│    ├─ status (text) - 'new', 'read', 'responded'                   │
│    ├─ created_at (timestamp)                                        │
│    └─ updated_at (timestamp)                                        │
│                                                                      │
│ 5. media                                                             │
│    ├─ id (uuid)                                                     │
│    ├─ filename, file_path, file_size, mime_type                    │
│    ├─ public_url (text)                                             │
│    ├─ uploaded_by (uuid, FK to profiles)                           │
│    └─ created_at (timestamp)                                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Authentication Flow Details

### Admin Authentication Process

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

User visits /admin
│
├─► middleware.ts
│   ├─ Check: Cookie-based session
│   ├─ Call: supabase.auth.getUser()
│   │
│   ├─► If NO user session
│   │   └─ REDIRECT → /admin-login
│   │
│   └─► If user session exists
│       ├─ Query: profiles table for role
│       │
│       ├─► If role ≠ 'admin'
│       │   └─ REDIRECT → /admin-login
│       │
│       └─► If role = 'admin'
│           └─ ALLOW access to /admin/*
│
├─► app/(admin)/layout.tsx
│   ├─ Call: requireAdmin() from lib/supabase/auth.ts
│   │
│   └─► requireAdmin() function
│       ├─ Call: getUser()
│       ├─ Check: User exists
│       ├─ Check: User role = 'admin'
│       │
│       ├─► If any check fails
│       │   └─ REDIRECT → /admin-login
│       │
│       └─► If all checks pass
│           └─ Render admin layout + children
│
└─► Admin page renders successfully

┌─────────────────────────────────────────────────────────────────────┐
│                      SESSION MANAGEMENT                              │
├─────────────────────────────────────────────────────────────────────┤
│ • Sessions stored in HTTP-only cookies                              │
│ • Middleware validates on every request                             │
│ • Server-side validation in layout                                  │
│ • Client-side Supabase client for API calls                        │
│ • Automatic token refresh by Supabase                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Key File Relationships

### Public User Files
- **Entry Point**: `app/(marketing)/page.tsx`
- **Layout**: `app/(marketing)/layout.tsx` → `app/layout.tsx`
- **Contact**: `app/(marketing)/contact/page.tsx` → `app/api/contact/route.ts`
- **Content**: `app/(marketing)/blog/*` & `app/(marketing)/case-studies/*`

### Admin User Files
- **Entry Point**: `app/(admin)/admin/page.tsx`
- **Auth Gate**: `middleware.ts` → `app/admin-login/page.tsx`
- **Layout**: `app/(admin)/layout.tsx` (with `requireAdmin()`)
- **Management**: `app/(admin)/admin/{blogs,case-studies,media}/*`
- **APIs**: `app/api/{blogs,case-studies,media}/*`

### Shared Infrastructure
- **Supabase**: `lib/supabase/{client,server,auth}.ts`
- **Types**: `types/{blog,case-study,user,media}.ts`
- **Components**: `components/{layout,ui}/*`
- **Middleware**: `middleware.ts` (route protection)

---

## 6. Error Handling & Edge Cases

### Public User Flow
- **404 Pages**: Handled by Next.js default 404
- **API Errors**: `app/(marketing)/error.tsx`
- **Loading States**: `app/(marketing)/loading.tsx`
- **Form Validation**: Client-side validation in contact form

### Admin User Flow
- **Unauthorized Access**: Redirect to `/admin-login`
- **Invalid Credentials**: Error message on login page
- **Session Expiry**: Middleware catches and redirects
- **API Failures**: Error states in admin pages
- **Missing Data**: Empty state components

---

## Summary

### Public User Journey
**Homepage → Explore Content → Contact Form → Submission**
- 3-5 page views on average
- Primary conversion: Contact form submission
- All content fetched from Supabase database

### Admin User Journey
**Login → Dashboard → Content Management → Media Upload**
- Protected by middleware + server-side auth
- Full CRUD operations on blogs and case studies
- Media management with Supabase Storage
- Role-based access control (admin only)

---

*Last Updated: 2024*
*Project: CodeConvert - Next.js Marketing & Admin Platform*
