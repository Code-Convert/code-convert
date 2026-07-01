# Code & Convert - Architecture Document

## Current State Analysis

### Existing Features (Must Preserve)
- ✅ Landing page with Hero, Services, Testimonials, CTA sections
- ✅ Smooth scroll with Lenis
- ✅ Interactive cursor and void background effects
- ✅ Motion animations with Framer Motion
- ✅ Responsive navbar with mobile menu
- ✅ Dark theme with red accent (#FF1E1E) and proper color hierarchy
- ✅ Counter animations and marquee effects
- ✅ All existing components in `/app/components/`

### Current Structure
```
/app
  /components/        # All UI components (preserve as-is)
  globals.css        # Theme and animations (preserve)
  layout.tsx         # Root layout (preserve)
  page.tsx          # Main landing page (preserve)
```

## Target Architecture

### Tech Stack
- **Frontend**: Next.js 15 App Router + TypeScript + Tailwind CSS
- **Backend**: Supabase (Postgres + Auth + Storage + RLS)
- **Database**: Direct Supabase client (no ORM)
- **Auth**: @supabase/ssr
- **Animations**: Framer Motion (existing)
- **Deployment**: Vercel

### Folder Structure (Production-Ready)

```
/app
  /(marketing)              # Route group for public site
    layout.tsx             # Marketing layout (navbar + footer)
    loading.tsx            # Marketing loading state
    error.tsx              # Marketing error boundary
    page.tsx              # Landing page (current content)
    
    /web-design
      page.tsx             # Web design service page
      loading.tsx          # Service page loading
    
    /marketing  
      page.tsx             # E-commerce service page
      loading.tsx          # Service page loading
    
    /case-studies
      page.tsx             # Case studies listing
      loading.tsx          # Listing loading state
      error.tsx            # Listing error boundary
      /[slug]
        page.tsx           # Individual case study
        loading.tsx        # Case study loading skeleton
        error.tsx          # Case study error boundary
        not-found.tsx      # 404 for invalid slug
    
    /blog
      page.tsx             # Blog listing  
      loading.tsx          # Blog listing loading
      error.tsx            # Blog listing error
      /[slug]
        page.tsx           # Individual blog post
        loading.tsx        # Blog post loading skeleton
        error.tsx          # Blog post error boundary
        not-found.tsx      # 404 for invalid slug
    
    /contact-us
      page.tsx             # Contact page
      loading.tsx          # Contact form loading
  
  /(admin)                 # Route group for admin panel
    layout.tsx             # Admin layout wrapper
    loading.tsx            # Admin-wide loading
    error.tsx              # Admin-wide error boundary
    
    /admin
      layout.tsx           # Admin layout (sidebar + auth)
      page.tsx            # Admin dashboard
      loading.tsx          # Dashboard loading
      
      /blogs
        page.tsx          # Blog management
        loading.tsx        # Table loading state
        error.tsx          # Blog management errors
        /new
          page.tsx        # Create blog
          loading.tsx      # Editor loading
        /[id]
          page.tsx        # Edit blog
          loading.tsx      # Editor loading
          error.tsx        # Edit errors
          not-found.tsx    # Invalid blog ID
      
      /case-studies  
        page.tsx          # Case study management
        loading.tsx        # Table loading state
        error.tsx          # Case study errors
        /new
          page.tsx        # Create case study
          loading.tsx      # Editor loading
        /[id]
          page.tsx        # Edit case study
          loading.tsx      # Editor loading
          error.tsx        # Edit errors
          not-found.tsx    # Invalid case study ID
      
      /media
        page.tsx          # Media library
        loading.tsx        # Media grid loading
        error.tsx          # Upload/fetch errors
      
      /settings
        page.tsx          # Admin settings
        loading.tsx        # Settings loading

  /api
    /auth
      /callback
        route.ts          # Supabase auth callback
    
    /upload
      route.ts            # File upload handler
    
    /revalidate  
      route.ts            # ISR revalidation

  globals.css             # Preserve existing styles
  layout.tsx              # Root layout (preserve)
  loading.tsx             # Root loading state
  error.tsx               # Root error boundary
  not-found.tsx           # Global 404 page

/components
  /ui                     # Reusable UI components
    button.tsx
    input.tsx
    textarea.tsx
    modal.tsx
    table.tsx
    card.tsx
    badge.tsx
    skeleton.tsx          # Loading skeletons
    error-state.tsx       # Error display component
    
  /layout                 # Layout components  
    navbar.tsx            # Preserve existing
    footer.tsx            # Preserve existing
    admin-sidebar.tsx     # New admin sidebar
    
  /sections               # Landing page sections
    hero.tsx              # Preserve existing
    services.tsx          # Preserve existing  
    testimonials.tsx      # Preserve existing
    cta.tsx              # Preserve existing
    process.tsx          # Preserve existing
    selected-work.tsx    # Preserve existing
    marquee.tsx          # Preserve existing
    
  /effects                # Preserve existing effects
    interactive-cursor.tsx
    void-background.tsx
    loader.tsx

/features                 # Feature-based organization (scales better)
  /blog
    actions.ts           # Server actions
    queries.ts           # Database queries
    validation.ts        # Zod schemas
    types.ts             # Feature-specific types
    components/          # Feature-specific components
      blog-card.tsx
      blog-editor.tsx
      blog-table.tsx
      blog-form.tsx
    
  /case-studies
    actions.ts
    queries.ts
    validation.ts
    types.ts
    components/
      case-study-card.tsx
      case-study-editor.tsx
      case-study-table.tsx
      case-study-form.tsx
  
  /media
    actions.ts
    queries.ts
    validation.ts
    types.ts
    components/
      media-grid.tsx
      media-uploader.tsx
      media-item.tsx
  
  /auth
    actions.ts
    queries.ts
    validation.ts
    types.ts
    components/
      login-form.tsx
      auth-provider.tsx

/lib
  supabase/
    client.ts            # Browser client
    server.ts            # Server client  
    middleware.ts        # Auth middleware
  
  auth.ts                # Auth utilities
  seo.ts                 # SEO helpers
  utils.ts               # General utilities
  errors.ts              # Error handling utilities

/hooks
  use-debounce.ts
  use-modal.ts
  use-supabase.ts
  use-error-handler.ts

/types
  database.ts           # Supabase generated types
  common.ts             # Shared types

/supabase
  config.toml
  migrations/
  seed.sql

/middleware.ts          # Auth protection

/.env.local
/package.json
/next.config.ts
/tailwind.config.ts
/tsconfig.json
```

## Database Schema (Supabase)

### Core Tables

```sql
-- Users (handled by Supabase Auth)
-- profiles table extends auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blogs
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES profiles(id)
);

-- Case Studies  
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT NOT NULL,
  industry TEXT,
  services TEXT[],
  challenge TEXT,
  solution TEXT,
  results TEXT,
  content TEXT,
  featured_image TEXT,
  gallery TEXT[],
  testimonial_text TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Library
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public can read published content
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Public can read published case studies" ON case_studies  
  FOR SELECT USING (published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage blogs" ON blogs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
```

## Authentication Flow

### Public Routes (No Auth Required)
- `/` - Landing page
- `/web-design` - Service pages
- `/marketing` - Service pages  
- `/case-studies` - Public case studies
- `/case-studies/[slug]` - Individual case study
- `/blog` - Public blog
- `/blog/[slug]` - Individual blog post
- `/contact-us` - Contact page

### Protected Routes (Admin Only)
- `/admin/*` - All admin routes
- Middleware checks for valid session + admin role
- Redirects to login if unauthorized

### Auth Implementation
```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Verify auth + admin role
    // Redirect if unauthorized
  }
}
```

## Content Management System

### Admin Features
- **Dashboard**: Analytics overview, recent posts, quick actions
- **Blog Management**: CRUD operations, rich text editor, SEO fields
- **Case Study Management**: CRUD with custom fields, image gallery
- **Media Library**: Upload, organize, search images/files
- **Settings**: Site configuration, user management

### Editor Features
- Rich text editor (Tiptap)
- Image upload with drag & drop
- SEO optimization fields
- Draft/publish workflow
- Slug generation
- Preview functionality

## Performance & SEO

### Static Generation Strategy
```typescript
// ISR for dynamic content
export const revalidate = 3600; // 1 hour

// Static generation for case studies/blogs
export async function generateStaticParams() {
  // Generate paths at build time
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  // Generate SEO metadata per page
}
```

### Image Optimization
- Supabase Storage with organized bucket structure
- Next.js Image component for optimization

## Implementation Notes

### Direct Supabase Usage
- Use `@supabase/ssr` for server/client separation
- Type-safe queries with generated TypeScript types
- Row Level Security for data access control
- Real-time subscriptions available if needed

### Database Queries
```typescript
// Server-side query example
import { createClient } from '@/lib/supabase/server'

export async function getPublishedBlogs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Client-side query example
import { createClient } from '@/lib/supabase/client'

export function useBlogSubscription(blogId: string) {
  const supabase = createClient()
  
  useEffect(() => {
    const channel = supabase
      .channel('blog-changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'blogs', filter: `id=eq.${blogId}` },
        (payload) => {
          // Handle real-time updates
        }
      )
      .subscribe()
    
    return () => { supabase.removeChannel(channel) }
  }, [blogId])
}
```

### Server Actions Pattern (Feature-Based)
```typescript
// features/blog/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { blogSchema } from './validation'
import { requireAdmin } from '@/lib/auth'

export async function createBlog(formData: FormData) {
  const supabase = await createClient()
  
  // Validate user is admin
  await requireAdmin(supabase)
  
  // Validate input
  const validated = blogSchema.parse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
  })
  
  // Create blog
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('blogs')
    .insert({ ...validated, author_id: user!.id })
    .select()
    .single()
  
  if (error) throw error
  
  revalidatePath('/admin/blogs')
  redirect(`/admin/blogs/${data.id}`)
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createClient()
  await requireAdmin(supabase)
  
  const validated = blogSchema.parse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
  })
  
  const { error } = await supabase
    .from('blogs')
    .update(validated)
    .eq('id', id)
  
  if (error) throw error
  
  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${validated.slug}`)
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()
  await requireAdmin(supabase)
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}
```

```typescript
// features/blog/queries.ts
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Blog, BlogFilters } from './types'

export async function getBlogs(filters?: BlogFilters) {
  const supabase = await createClient()
  
  let query = supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
  
  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`)
  }
  
  const { data, error } = await query
  if (error) throw error
  
  return data as Blog[]
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error || !data) notFound()
  
  return data as Blog
}
```

```typescript
// features/blog/validation.ts
import { z } from 'zod'

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, 'Content is required'),
  featured_image: z.string().url().optional(),
  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
  published: z.boolean().default(false),
})

export type BlogFormData = z.infer<typeof blogSchema>
```

```typescript
// features/blog/types.ts
export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  seo_title: string | null
  seo_description: string | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  author_id: string
}

export interface BlogFilters {
  search?: string
  published?: boolean
  author_id?: string
}
```

## Error Handling Implementation

### Error Component Examples

```typescript
// app/error.tsx (Root Error Boundary)
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Root error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
```

```typescript
// app/(marketing)/blog/[slug]/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Failed to load blog post</h1>
      <p className="text-gray-600 mb-6">
        {error.message || 'An unexpected error occurred'}
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={reset}>Try again</Button>
        <Link href="/blog">
          <Button variant="outline">Back to blog</Button>
        </Link>
      </div>
    </div>
  )
}
```

```typescript
// app/(marketing)/blog/[slug]/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Blog post not found</h1>
      <p className="text-gray-600 mb-6">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/blog">
        <Button>Browse all posts</Button>
      </Link>
    </div>
  )
}
```

### Loading Component Examples

```typescript
// app/(marketing)/blog/[slug]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <article className="container mx-auto px-4 py-16">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/4 mb-8" />
      <Skeleton className="h-64 w-full mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </article>
  )
}
```

```typescript
// app/(admin)/admin/blogs/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}
```

### Error Handling Utilities

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

export function handleError(error: unknown): never {
  if (error instanceof AppError) {
    throw error
  }
  
  if (error instanceof Error) {
    throw new AppError(error.message, 'INTERNAL_ERROR', 500)
  }
  
  throw new AppError('An unexpected error occurred', 'UNKNOWN_ERROR', 500)
}
```

```typescript
// lib/auth.ts
import { createClient } from '@/lib/supabase/server'
import { UnauthorizedError } from './errors'
import type { SupabaseClient } from '@supabase/supabase-js'

export async function requireAuth(supabase: SupabaseClient) {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    throw new UnauthorizedError('You must be logged in')
  }
  
  return user
}

export async function requireAdmin(supabase: SupabaseClient) {
  const user = await requireAuth(supabase)
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    throw new UnauthorizedError('Admin access required')
  }
  
  return user
}
```

## Development Workflow

### Phase 1: Foundation (COMPLETED)
- ✅ Landing page with all sections
- ✅ Component library
- ✅ Theme and animations
- ✅ Responsive design

### Phase 2: Backend Setup (CURRENT)
1. **Supabase Configuration**
   - Create Supabase project
   - Run database migrations
   - Configure storage buckets
   - Set up RLS policies
   - Generate TypeScript types

2. **Authentication**
   - Implement auth middleware
   - Create login page
   - Set up protected routes
   - Add role-based access

3. **File Structure Migration**
   - Move components to `/components` root
   - Organize by feature (ui, layout, sections, blog, case-studies)
   - Create route groups for marketing and admin
   - Set up API routes
   - **Migrate to feature-based organization**
   - Add error.tsx and loading.tsx throughout app

#### Migration Strategy: Flat to Feature-Based

**Current Structure:**
```
/actions
  blog-actions.ts
  case-study-actions.ts
/types
  blog.ts
  case-study.ts
/components
  /blog
    blog-card.tsx
```

**Target Structure:**
```
/features
  /blog
    actions.ts
    queries.ts
    validation.ts
    types.ts
    components/
      blog-card.tsx
```

**Migration Steps:**
1. Create `/features` directory
2. For each feature (blog, case-studies, media, auth):
   - Create feature folder
   - Move actions from `/actions/[feature]-actions.ts` → `/features/[feature]/actions.ts`
   - Move types from `/types/[feature].ts` → `/features/[feature]/types.ts`
   - Create `queries.ts` and `validation.ts`
   - Move components from `/components/[feature]/*` → `/features/[feature]/components/*`
3. Update all imports
4. Delete old `/actions` folder
5. Keep only shared types in `/types` (database.ts, common.ts)

**Import Changes:**
```typescript
// Before
import { createBlog } from '@/actions/blog-actions'
import { Blog } from '@/types/blog'
import { BlogCard } from '@/components/blog/blog-card'

// After
import { createBlog } from '@/features/blog/actions'
import type { Blog } from '@/features/blog/types'
import { BlogCard } from '@/features/blog/components/blog-card'
```

### Phase 3: Admin Panel
1. **Admin Layout & Navigation**
   - Admin sidebar with navigation
   - Dashboard overview
   - User profile dropdown
   - Add loading.tsx and error.tsx

2. **Blog Management**
   - Blog listing with search/filter
   - Rich text editor (Tiptap)
   - Image upload integration
   - Draft/publish workflow
   - SEO fields
   - Add loading states for table and editor
   - Add error boundaries for CRUD operations
   - Add not-found.tsx for invalid blog IDs

3. **Case Study Management**
   - Case study listing
   - Custom editor with sections
   - Gallery management
   - Testimonial integration
   - Add loading states for table and editor
   - Add error boundaries for CRUD operations
   - Add not-found.tsx for invalid case study IDs

4. **Media Library**
   - File upload with drag & drop
   - Grid/list view
   - Search and filter
   - Image optimization
   - Add loading state for media grid
   - Add error handling for upload failures

### Phase 4: Public Pages
1. **Service Pages**
   - Web design page
   - E-commerce page
   - Reusable service template
   - Add loading.tsx for each service page

2. **Blog**
   - Blog listing with pagination
   - Individual blog post page
   - Related posts
   - Social sharing
   - Add loading.tsx for listing and individual posts
   - Add error.tsx for fetch failures
   - Add not-found.tsx for invalid slugs

3. **Case Studies**
   - Case study grid
   - Individual case study page
   - Filter by industry/service
   - Add loading.tsx for grid and individual pages
   - Add error.tsx for fetch failures
   - Add not-found.tsx for invalid slugs

4. **Contact Page**
   - Contact form
   - Form validation
   - Email integration
   - Add loading.tsx for form submission
   - Add error handling for submission failures

### Phase 5: Polish & Deploy
1. **SEO Optimization**
   - Dynamic metadata
   - Sitemap generation
   - robots.txt
   - Open Graph images

2. **Performance**
   - Image optimization
   - Code splitting
   - ISR configuration
   - Caching strategy

3. **Testing & QA**
   - Cross-browser testing
   - Mobile responsiveness
   - Accessibility audit
   - Performance testing

4. **Deployment**
   - Vercel deployment
   - Environment variables
   - Domain configuration
   - Analytics setup

## File Organization Principles

### Feature-Based Organization (Scalable)

**Why Feature Folders?**
- Colocation: Related code stays together
- Scalability: Easy to add new features without bloating root folders
- Maintainability: Clear boundaries between features
- Team collaboration: Features can be owned by different developers

```
/features
  /blog
    actions.ts         # createBlog, updateBlog, deleteBlog
    queries.ts         # getBlogs, getBlogBySlug, searchBlogs
    validation.ts      # blogSchema, slugSchema
    types.ts           # Blog, BlogFormData, BlogFilters
    components/        # Blog-specific UI components
```

**Benefits over flat /actions folder:**
- `/actions` grows to 20+ files quickly
- Hard to find related code
- Merge conflicts increase
- Feature folders scale to 100+ features

### Component Organization
```
/components
  /ui              # Generic, reusable UI (button, input, modal)
  /layout          # Layout-specific (navbar, footer, sidebar)
  /sections        # Landing page sections (hero, services, cta)
  /effects         # Visual effects (cursor, background, loader)

/features/[feature]/components
                   # Feature-specific components (blog-card, blog-editor)
```

### Route Organization with Error Handling
```
/app
  layout.tsx           # Root layout
  loading.tsx          # Root loading (fallback for all pages)
  error.tsx            # Root error boundary (catches all errors)
  not-found.tsx        # Global 404 page
  
  /(marketing)
    layout.tsx         # Marketing layout
    loading.tsx        # Marketing-wide loading
    error.tsx          # Marketing-wide errors
    
    /blog/[slug]
      page.tsx         # Blog post page
      loading.tsx      # Skeleton while fetching post
      error.tsx        # Handle fetch errors
      not-found.tsx    # Invalid slug 404
  
  /(admin)
    layout.tsx         # Admin layout
    loading.tsx        # Admin-wide loading
    error.tsx          # Admin-wide errors
    
    /admin/blogs/[id]
      page.tsx         # Edit blog page
      loading.tsx      # Editor loading state
      error.tsx        # Edit errors
      not-found.tsx    # Invalid blog ID
```

### Error Handling Hierarchy

**1. Root Level** (`/app/error.tsx`)
- Catches all unhandled errors
- Last resort fallback
- Should never fail

**2. Route Group Level** (`/(marketing)/error.tsx`)
- Catches errors within route group
- Can have different styling per group
- Preserves layout context

**3. Route Level** (`/blog/[slug]/error.tsx`)
- Catches errors for specific route
- Most specific error handling
- Can retry or show relevant actions

**4. Not Found** (`/blog/[slug]/not-found.tsx`)
- Handles 404s for dynamic routes
- Better UX than generic error
- Can suggest alternatives

### Loading State Hierarchy

**1. Root Loading** (`/app/loading.tsx`)
- Shows during initial app load
- Rare to see (only on hard refresh)

**2. Route Group Loading** (`/(marketing)/loading.tsx`)
- Shows when navigating between route groups
- Can match marketing/admin theme

**3. Page Loading** (`/blog/[slug]/loading.tsx`)
- Shows while fetching page data
- Should match page layout (skeleton)
- Most commonly seen

### Utility Organization
```
/lib             # Core utilities and clients
  /supabase      # Supabase client setup
  auth.ts        # Auth helpers
  seo.ts         # SEO utilities
  utils.ts       # General utilities
  errors.ts      # Error handling utilities

/hooks           # Reusable React hooks
  use-debounce.ts
  use-error-handler.ts
  use-supabase.ts

/types           # Global types only
  database.ts    # Supabase generated
  common.ts      # Shared across features
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional
ANALYTICS_ID=your_analytics_id
```

## Reusable Component Architecture

### Problem: Hardcoded Components
Current pages have hardcoded layouts with repeated patterns:
- Blog listing page has hardcoded grid layout
- Case study listing page duplicates the same grid pattern
- Individual blog/case study pages repeat layout structures
- No component reusability across similar content types

### Solution: Extract Reusable Components

#### 1. Content Grid Components
```typescript
// components/ui/content-grid.tsx
interface ContentGridProps {
  children: React.ReactNode;
  columns?: { md?: number; lg?: number };
}

export function ContentGrid({ children, columns = { md: 2, lg: 3 } }: ContentGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-8`}>
      {children}
    </div>
  );
}
```

#### 2. Content Card Component
```typescript
// components/ui/content-card.tsx
interface ContentCardProps {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  excerpt?: string;
  date?: string;
}

export function ContentCard({ href, image, title, subtitle, tags, excerpt, date }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
    >
      {image && (
        <div className="aspect-video bg-white/5 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 group-hover:text-[#FF1E1E] transition-colors">
          {title}
        </h2>
        {subtitle && <p className="text-gray-400 mb-4">{subtitle}</p>}
        {excerpt && <p className="text-gray-400 line-clamp-3">{excerpt}</p>}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-[#FF1E1E]/20 text-[#FF1E1E] rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        {date && (
          <p className="text-sm text-gray-500 mt-4">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
```

#### 3. Page Container Component
```typescript
// components/ui/page-container.tsx
interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export function PageContainer({ children, maxWidth = '7xl' }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-6`}>
        {children}
      </div>
    </div>
  );
}
```

#### 4. Page Header Component
```typescript
// components/ui/page-header.tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: { href: string; label: string };
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <div className="mb-12">
      {backLink && (
        <Link href={backLink.href} className="text-gray-400 hover:text-white mb-8 inline-block">
          ← {backLink.label}
        </Link>
      )}
      <h1 className="text-5xl md:text-7xl font-bold mb-6">{title}</h1>
      {description && (
        <p className="text-xl text-gray-400">{description}</p>
      )}
    </div>
  );
}
```

#### 5. Article Header Component
```typescript
// components/ui/article-header.tsx
interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  backLink?: { href: string; label: string };
}

export function ArticleHeader({ title, subtitle, date, tags, backLink }: ArticleHeaderProps) {
  return (
    <div className="mb-12">
      {backLink && (
        <Link href={backLink.href} className="text-gray-400 hover:text-white mb-8 inline-block">
          ← {backLink.label}
        </Link>
      )}
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-2xl text-gray-400 mb-8">{subtitle}</p>}
      {date && (
        <p className="text-gray-400 mb-8">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-[#FF1E1E]/20 text-[#FF1E1E] rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 6. Featured Image Component
```typescript
// components/ui/featured-image.tsx
interface FeaturedImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
};

export function FeaturedImage({ src, alt, aspectRatio = 'video' }: FeaturedImageProps) {
  return (
    <div className={`${aspectClasses[aspectRatio]} bg-white/5 rounded-lg overflow-hidden mb-12`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
```

#### 7. Content Section Component
```typescript
// components/ui/content-section.tsx
interface ContentSectionProps {
  title: string;
  content: string;
}

export function ContentSection({ title, content }: ContentSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400">{content}</p>
    </div>
  );
}
```

#### 8. Testimonial Card Component
```typescript
// components/ui/testimonial-card.tsx
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-8 mb-12">
      <p className="text-xl italic mb-4">"{quote}"</p>
      <p className="text-gray-400">
        — {author}
        {role && `, ${role}`}
      </p>
    </div>
  );
}
```

#### 9. Image Gallery Component
```typescript
// components/ui/image-gallery.tsx
interface ImageGalleryProps {
  images: string[];
  alt: string;
  columns?: { md?: number };
}

export function ImageGallery({ images, alt, columns = { md: 2 } }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;
  
  return (
    <div className={`grid md:grid-cols-${columns.md} gap-4`}>
      {images.map((image, index) => (
        <div key={index} className="aspect-video bg-white/5 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={`${alt} - Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
```

#### 10. Empty State Component
```typescript
// components/ui/empty-state.tsx
interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <p className="text-center text-gray-400 py-20">{message}</p>
  );
}
```

### Refactored Page Examples

#### Blog Listing Page (After)
```typescript
// app/(marketing)/blog/page.tsx
import { createClient } from '@/lib/supabase/server';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';
import { ContentGrid } from '@/components/ui/content-grid';
import { ContentCard } from '@/components/ui/content-card';
import { EmptyState } from '@/components/ui/empty-state';

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (
    <PageContainer>
      <PageHeader
        title="Blog"
        description="Insights, tips, and stories from the world of web development."
      />
      
      {blogs && blogs.length > 0 ? (
        <ContentGrid>
          {blogs.map((blog) => (
            <ContentCard
              key={blog.id}
              href={`/blog/${blog.slug}`}
              image={blog.featured_image}
              title={blog.title}
              excerpt={blog.excerpt}
              date={blog.published_at}
            />
          ))}
        </ContentGrid>
      ) : (
        <EmptyState message="No blog posts published yet." />
      )}
    </PageContainer>
  );
}
```

#### Case Study Listing Page (After)
```typescript
// app/(marketing)/case-studies/page.tsx
import { createClient } from '@/lib/supabase/server';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';
import { ContentGrid } from '@/components/ui/content-grid';
import { ContentCard } from '@/components/ui/content-card';
import { EmptyState } from '@/components/ui/empty-state';

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (
    <PageContainer>
      <PageHeader
        title="Case Studies"
        description="Real results from real projects. See how we've helped businesses grow."
      />
      
      {caseStudies && caseStudies.length > 0 ? (
        <ContentGrid>
          {caseStudies.map((study) => (
            <ContentCard
              key={study.id}
              href={`/case-studies/${study.slug}`}
              image={study.featured_image}
              title={study.title}
              subtitle={study.client}
              tags={study.services}
            />
          ))}
        </ContentGrid>
      ) : (
        <EmptyState message="No case studies published yet." />
      )}
    </PageContainer>
  );
}
```

#### Blog Post Page (After)
```typescript
// app/(marketing)/blog/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/ui/page-container';
import { ArticleHeader } from '@/components/ui/article-header';
import { FeaturedImage } from '@/components/ui/featured-image';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!blog) notFound();

  return (
    <PageContainer maxWidth="4xl">
      <article>
        <ArticleHeader
          title={blog.title}
          date={blog.published_at}
          backLink={{ href: '/blog', label: 'Back to Blog' }}
        />

        {blog.featured_image && (
          <FeaturedImage src={blog.featured_image} alt={blog.title} />
        )}

        {blog.content && (
          <div className="prose prose-invert prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        )}
      </article>
    </PageContainer>
  );
}
```

#### Case Study Page (After)
```typescript
// app/(marketing)/case-studies/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/ui/page-container';
import { ArticleHeader } from '@/components/ui/article-header';
import { FeaturedImage } from '@/components/ui/featured-image';
import { ContentSection } from '@/components/ui/content-section';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { ImageGallery } from '@/components/ui/image-gallery';

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: study } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!study) notFound();

  return (
    <PageContainer maxWidth="6xl">
      <article>
        <ArticleHeader
          title={study.title}
          subtitle={study.client}
          tags={study.services}
          backLink={{ href: '/case-studies', label: 'Back to Case Studies' }}
        />

        {study.featured_image && (
          <FeaturedImage src={study.featured_image} alt={study.title} />
        )}

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {study.challenge && (
            <ContentSection title="Challenge" content={study.challenge} />
          )}
          {study.solution && (
            <ContentSection title="Solution" content={study.solution} />
          )}
          {study.results && (
            <ContentSection title="Results" content={study.results} />
          )}
        </div>

        {study.content && (
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: study.content }} />
          </div>
        )}

        {study.testimonial_text && (
          <TestimonialCard
            quote={study.testimonial_text}
            author={study.testimonial_author}
            role={study.testimonial_role}
          />
        )}

        <ImageGallery images={study.gallery} alt={study.title} />
      </article>
    </PageContainer>
  );
}
```

### Benefits of Reusable Components

1. **DRY Principle**: No code duplication across pages
2. **Consistency**: Same look and feel across all content types
3. **Maintainability**: Update once, applies everywhere
4. **Scalability**: Easy to add new content types (portfolios, services, etc.)
5. **Testing**: Test components once, not every page
6. **Type Safety**: Shared interfaces ensure consistency
7. **Performance**: Smaller bundle sizes with shared components

### Component Organization

```
/components
  /ui                     # Reusable UI components
    page-container.tsx    # Page wrapper with consistent spacing
    page-header.tsx       # Page title and description
    article-header.tsx    # Article/post header with metadata
    content-grid.tsx      # Responsive grid layout
    content-card.tsx      # Card for blog/case study listings
    featured-image.tsx    # Hero/featured images
    content-section.tsx   # Content sections with title
    testimonial-card.tsx  # Testimonial display
    image-gallery.tsx     # Image grid gallery
    empty-state.tsx       # Empty state messages
    button.tsx            # Existing
    input.tsx             # Existing
    textarea.tsx          # Existing
```

### Implementation Checklist

- [ ] Create `/components/ui/page-container.tsx`
- [ ] Create `/components/ui/page-header.tsx`
- [ ] Create `/components/ui/article-header.tsx`
- [ ] Create `/components/ui/content-grid.tsx`
- [ ] Create `/components/ui/content-card.tsx`
- [ ] Create `/components/ui/featured-image.tsx`
- [ ] Create `/components/ui/content-section.tsx`
- [ ] Create `/components/ui/testimonial-card.tsx`
- [ ] Create `/components/ui/image-gallery.tsx`
- [ ] Create `/components/ui/empty-state.tsx`
- [ ] Refactor `/app/(marketing)/blog/page.tsx`
- [ ] Refactor `/app/(marketing)/blog/[slug]/page.tsx`
- [ ] Refactor `/app/(marketing)/case-studies/page.tsx`
- [ ] Refactor `/app/(marketing)/case-studies/[slug]/page.tsx`
- [ ] Test all pages for consistency
- [ ] Update documentation

## Key Technical Decisions

### Why No ORM?
- Direct Supabase client provides type-safe queries
- Simpler mental model for small-to-medium projects
- Better performance (no abstraction layer)
- Easier debugging with direct SQL visibility

### Why Route Groups?
- Clean URL structure (no /marketing or /admin prefix in URLs)
- Separate layouts for marketing vs admin
- Better code organization
- Easier to apply middleware selectively

### Why Server Actions?
- Type-safe data mutations
- No need for separate API routes for simple operations
- Built-in form handling
- Progressive enhancement support

### Why Supabase Storage?
- Integrated with database
- Built-in CDN
- RLS for access control
- Image transformation API

## Security Considerations

### Authentication
- JWT-based auth with Supabase
- HTTP-only cookies for session management
- Role-based access control (RBAC)
- Middleware protection for admin routes

### Data Access
- Row Level Security (RLS) on all tables
- Service role key only on server
- Input validation with Zod
- SQL injection prevention (parameterized queries)

### File Uploads
- File type validation
- Size limits
- Virus scanning (optional)
- Secure storage with RLS

## Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Monitoring & Analytics

- Vercel Analytics for performance
- Error tracking (Sentry optional)
- User analytics (Google Analytics optional)
- Supabase dashboard for database metrics

## Next Steps

1. **Immediate**: Complete Supabase setup
   - Create project
   - Run migrations from `database-schema.sql`
   - Configure storage buckets
   - Generate types: `npx supabase gen types typescript`

2. **Short-term**: Implement authentication
   - Update middleware.ts
   - Create login page
   - Test protected routes

3. **Medium-term**: Build admin panel
   - Start with blog management
   - Add media library
   - Implement case study management

4. **Long-term**: Public pages & deployment
   - Service pages
   - Blog/case study public views
   - SEO optimization
   - Deploy to Vercel

---

**Last Updated**: Phase 1 Complete - Landing page and component library ready
**Current Focus**: Phase 2 - Backend setup and authentication
**Next Milestone**: Admin panel with blog management

## Error & Loading State Checklist

### Root Level
- [ ] `/app/layout.tsx` - Root layout
- [ ] `/app/loading.tsx` - Root loading state
- [ ] `/app/error.tsx` - Root error boundary
- [ ] `/app/not-found.tsx` - Global 404 page

### Marketing Route Group
- [ ] `/app/(marketing)/layout.tsx` - Marketing layout
- [ ] `/app/(marketing)/loading.tsx` - Marketing loading
- [ ] `/app/(marketing)/error.tsx` - Marketing errors
- [ ] `/app/(marketing)/page.tsx` - Landing page

#### Service Pages
- [ ] `/app/(marketing)/web-design/page.tsx`
- [ ] `/app/(marketing)/web-design/loading.tsx`
- [ ] `/app/(marketing)/marketing/page.tsx`
- [ ] `/app/(marketing)/marketing/loading.tsx`

#### Blog
- [ ] `/app/(marketing)/blog/page.tsx` - Blog listing
- [ ] `/app/(marketing)/blog/loading.tsx` - Listing loading
- [ ] `/app/(marketing)/blog/error.tsx` - Listing errors
- [ ] `/app/(marketing)/blog/[slug]/page.tsx` - Blog post
- [ ] `/app/(marketing)/blog/[slug]/loading.tsx` - Post skeleton
- [ ] `/app/(marketing)/blog/[slug]/error.tsx` - Post errors
- [ ] `/app/(marketing)/blog/[slug]/not-found.tsx` - Invalid slug

#### Case Studies
- [ ] `/app/(marketing)/case-studies/page.tsx` - Case study listing
- [ ] `/app/(marketing)/case-studies/loading.tsx` - Listing loading
- [ ] `/app/(marketing)/case-studies/error.tsx` - Listing errors
- [ ] `/app/(marketing)/case-studies/[slug]/page.tsx` - Case study
- [ ] `/app/(marketing)/case-studies/[slug]/loading.tsx` - Case study skeleton
- [ ] `/app/(marketing)/case-studies/[slug]/error.tsx` - Case study errors
- [ ] `/app/(marketing)/case-studies/[slug]/not-found.tsx` - Invalid slug

#### Contact
- [ ] `/app/(marketing)/contact-us/page.tsx`
- [ ] `/app/(marketing)/contact-us/loading.tsx`

### Admin Route Group
- [ ] `/app/(admin)/layout.tsx` - Admin wrapper
- [ ] `/app/(admin)/loading.tsx` - Admin-wide loading
- [ ] `/app/(admin)/error.tsx` - Admin-wide errors

#### Admin Dashboard
- [ ] `/app/(admin)/admin/layout.tsx` - Admin layout with sidebar
- [ ] `/app/(admin)/admin/page.tsx` - Dashboard
- [ ] `/app/(admin)/admin/loading.tsx` - Dashboard loading

#### Blog Management
- [ ] `/app/(admin)/admin/blogs/page.tsx` - Blog list
- [ ] `/app/(admin)/admin/blogs/loading.tsx` - Table loading
- [ ] `/app/(admin)/admin/blogs/error.tsx` - Blog errors
- [ ] `/app/(admin)/admin/blogs/new/page.tsx` - Create blog
- [ ] `/app/(admin)/admin/blogs/new/loading.tsx` - Editor loading
- [ ] `/app/(admin)/admin/blogs/[id]/page.tsx` - Edit blog
- [ ] `/app/(admin)/admin/blogs/[id]/loading.tsx` - Editor loading
- [ ] `/app/(admin)/admin/blogs/[id]/error.tsx` - Edit errors
- [ ] `/app/(admin)/admin/blogs/[id]/not-found.tsx` - Invalid ID

#### Case Study Management
- [ ] `/app/(admin)/admin/case-studies/page.tsx` - Case study list
- [ ] `/app/(admin)/admin/case-studies/loading.tsx` - Table loading
- [ ] `/app/(admin)/admin/case-studies/error.tsx` - Case study errors
- [ ] `/app/(admin)/admin/case-studies/new/page.tsx` - Create case study
- [ ] `/app/(admin)/admin/case-studies/new/loading.tsx` - Editor loading
- [ ] `/app/(admin)/admin/case-studies/[id]/page.tsx` - Edit case study
- [ ] `/app/(admin)/admin/case-studies/[id]/loading.tsx` - Editor loading
- [ ] `/app/(admin)/admin/case-studies/[id]/error.tsx` - Edit errors
- [ ] `/app/(admin)/admin/case-studies/[id]/not-found.tsx` - Invalid ID

#### Media Library
- [ ] `/app/(admin)/admin/media/page.tsx` - Media library
- [ ] `/app/(admin)/admin/media/loading.tsx` - Media grid loading
- [ ] `/app/(admin)/admin/media/error.tsx` - Upload/fetch errors

#### Settings
- [ ] `/app/(admin)/admin/settings/page.tsx` - Settings
- [ ] `/app/(admin)/admin/settings/loading.tsx` - Settings loading

### UI Components
- [ ] `/components/ui/skeleton.tsx` - Loading skeleton component
- [ ] `/components/ui/error-state.tsx` - Error display component
- [ ] `/lib/errors.ts` - Error handling utilities
- [ ] `/lib/auth.ts` - Auth utilities with error handling
- [ ] `/hooks/use-error-handler.ts` - Error handling hook

## Feature Migration Checklist

### Blog Feature
- [ ] Create `/features/blog` directory
- [ ] Move `/actions/blog-actions.ts` → `/features/blog/actions.ts`
- [ ] Move `/types/blog.ts` → `/features/blog/types.ts`
- [ ] Create `/features/blog/queries.ts`
- [ ] Create `/features/blog/validation.ts`
- [ ] Create `/features/blog/components/` directory
- [ ] Move blog components to `/features/blog/components/`
- [ ] Update all imports

### Case Studies Feature
- [ ] Create `/features/case-studies` directory
- [ ] Move `/actions/case-study-actions.ts` → `/features/case-studies/actions.ts`
- [ ] Move `/types/case-study.ts` → `/features/case-studies/types.ts`
- [ ] Create `/features/case-studies/queries.ts`
- [ ] Create `/features/case-studies/validation.ts`
- [ ] Create `/features/case-studies/components/` directory
- [ ] Move case study components to `/features/case-studies/components/`
- [ ] Update all imports

### Media Feature
- [ ] Create `/features/media` directory
- [ ] Create `/features/media/actions.ts`
- [ ] Create `/features/media/queries.ts`
- [ ] Create `/features/media/validation.ts`
- [ ] Create `/features/media/types.ts`
- [ ] Create `/features/media/components/` directory
- [ ] Update all imports

### Auth Feature
- [ ] Create `/features/auth` directory
- [ ] Create `/features/auth/actions.ts`
- [ ] Create `/features/auth/queries.ts`
- [ ] Create `/features/auth/validation.ts`
- [ ] Create `/features/auth/types.ts`
- [ ] Create `/features/auth/components/` directory
- [ ] Update all imports

### Cleanup
- [ ] Delete `/actions` directory
- [ ] Keep only `/types/database.ts` and `/types/common.ts`
- [ ] Verify all imports are updated
- [ ] Test all features work correctlyscript
// Server components
import { createClient } from '@/lib/supabase/server'

const supabase = createClient()
const { data } = await supabase
  .from('blogs')
  .select('*')
  .eq('published', true)

// Client components  
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data } = await supabase
  .from('blogs')
  .select('*')
```

### Type Generation
```bash
# Generate TypeScript types from Supabase schema
npx supabase gen types typescript --project-id <project-id> > types/database.ts
```
- WebP conversion with fallbacks
- Responsive images with multiple sizes
- Semantic folder organization for easy management

## Deployment Strategy

### Environment Setup
```bash
# Development
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Production (Vercel)
# Same env vars + production Supabase project
```

### CI/CD Pipeline
1. **Development**: Local with Supabase local development
2. **Staging**: Vercel preview deployments
3. **Production**: Vercel production with production Supabase

## Migration Plan

### Phase 1: Foundation (Preserve Existing)
1. Set up new folder structure
2. Move existing components (no changes)
3. Configure Supabase + Prisma
4. Set up authentication

### Phase 2: Content Management
1. Build admin panel
2. Create blog/case study CRUD
3. Implement rich text editor
4. Add media management

### Phase 3: Public Pages
1. Create service pages
2. Build blog listing/detail pages
3. Build case study listing/detail pages
4. Add contact page

### Phase 4: Enhancement
1. SEO optimization
2. Performance tuning
3. Analytics integration
4. Advanced admin features

## Security Considerations

### Data Protection
- RLS policies for data access
- Input validation with Zod
- CSRF protection
- Rate limiting on API routes

### Authentication Security
- Secure session management
- Role-based access control
- Password requirements
- Session timeout

### File Upload Security
- File type validation
- Size limits
- Virus scanning (if needed)
- Secure storage with Supabase

## Supabase Storage Architecture

### Storage Buckets Configuration

```sql
-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('portfolio-images', 'portfolio-images', true),
  ('case-studies', 'case-studies', true),
  ('client-assets', 'client-assets', true),
  ('brand-assets', 'brand-assets', true),
  ('blog-content', 'blog-content', true),
  ('seo-meta', 'seo-meta', true),
  ('user-uploads', 'user-uploads', false),
  ('temp-files', 'temp-files', false);
```

### Folder Structure

```
portfolio-images/
  ├── featured/           # Hero images for portfolio items
  ├── galleries/          # Project gallery images
  ├── thumbnails/         # Portfolio grid thumbnails
  └── before-after/       # Comparison images

case-studies/
  ├── heroes/             # Case study hero images
  ├── process/            # Process step images
  ├── results/            # Before/after results
  ├── mockups/            # Device mockups
  └── wireframes/         # Design wireframes

client-assets/
  ├── logos/              # Client company logos
  ├── testimonials/       # Testimonial photos
  └── brands/             # Brand assets from clients

brand-assets/
  ├── logos/              # Code & Convert logos
  ├── icons/              # Brand icons
  ├── patterns/           # Brand patterns/textures
  └── colors/             # Color palette assets

blog-content/
  ├── featured/           # Blog post featured images
  ├── inline/             # Inline content images
  ├── thumbnails/         # Blog post thumbnails
  └── author/             # Author photos

seo-meta/
  ├── og/                 # Open Graph images
  ├── twitter/            # Twitter card images
  ├── favicons/           # Favicon variations
  └── apple-touch/        # Apple touch icons

user-uploads/
  ├── contact/            # Contact form attachments
  ├── project-briefs/     # Client project briefs
  └── drafts/             # Draft content

temp-files/
  ├── processing/         # Image processing temp files
  ├── uploads/            # Temporary upload staging
  └── cache/              # Cached assets
```

### Storage Policies (RLS)

```sql
-- =====================================================
-- PORTFOLIO IMAGES POLICIES
-- =====================================================

-- Public read access for portfolio showcase
CREATE POLICY "Public can view portfolio images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Admin upload access
CREATE POLICY "Admins can upload portfolio images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

-- Admin update access
CREATE POLICY "Admins can update portfolio images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

-- Admin delete access
CREATE POLICY "Admins can delete portfolio images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');


-- =====================================================
-- CASE STUDIES POLICIES
-- =====================================================

-- Public read access for case studies
CREATE POLICY "Public can view case studies"
ON storage.objects
FOR SELECT
USING (bucket_id = 'case-studies');

-- Admin management
CREATE POLICY "Admins can manage case studies"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'case-studies');


-- =====================================================
-- CLIENT ASSETS POLICIES
-- =====================================================

-- Public read for client logos/testimonials
CREATE POLICY "Public can view client assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'client-assets');

-- Admin management
CREATE POLICY "Admins can manage client assets"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'client-assets');


-- =====================================================
-- BRAND ASSETS POLICIES
-- =====================================================

-- Public read for brand elements
CREATE POLICY "Public can view brand assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'brand-assets');

-- Admin management
CREATE POLICY "Admins can manage brand assets"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'brand-assets');


-- =====================================================
-- BLOG CONTENT POLICIES
-- =====================================================

-- Public read access
CREATE POLICY "Public can view blog content"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-content');

-- Admin management
CREATE POLICY "Admins can manage blog content"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'blog-content');


-- =====================================================
-- SEO META POLICIES
-- =====================================================

-- Public read for OG images, favicons
CREATE POLICY "Public can view seo meta"
ON storage.objects
FOR SELECT
USING (bucket_id = 'seo-meta');

-- Admin management
CREATE POLICY "Admins can manage seo meta"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'seo-meta');


-- =====================================================
-- PRIVATE USER UPLOADS POLICIES
-- =====================================================

-- Only authenticated users can access
CREATE POLICY "Authenticated users can manage uploads"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'user-uploads');


-- =====================================================
-- TEMP FILES POLICIES (Auto-cleanup recommended)
-- =====================================================

-- Only authenticated users can access temp files
CREATE POLICY "Authenticated users can manage temp files"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'temp-files');
```

### Usage Examples

```typescript
// Portfolio image: 
// portfolio-images/featured/ecommerce-redesign.webp
// portfolio-images/galleries/ecommerce-redesign/gallery-01.webp
// portfolio-images/thumbnails/ecommerce-redesign-thumb.webp

// Case study examples:
// case-studies/heroes/nike-conversion-optimization.webp
// case-studies/process/nike-wireframes.webp
// case-studies/results/nike-before-after.webp

// Client assets:
// client-assets/logos/nike-logo.svg
// client-assets/testimonials/john-doe-headshot.webp

// Brand assets:
// brand-assets/logos/codeconvert-logo.svg
// brand-assets/icons/cc-favicon.ico

// Blog content:
// blog-content/featured/nextjs-performance-guide.webp
// blog-content/inline/nextjs-guide/code-example-01.webp

// SEO meta:
// seo-meta/og/homepage-og.webp
// seo-meta/twitter/blog-post-twitter-card.webp
// seo-meta/favicons/favicon-32x32.png
```

### File Naming Conventions
- Use kebab-case for all file names
- Include dimensions for responsive images: `image-name-1920w.webp`
- Use semantic names: `hero-image.webp`, not `img001.webp`
- Include version numbers for iterations: `logo-v2.svg`

### Next.js Integration Helper

```typescript
// lib/supabase-storage.ts
export const getPublicUrl = (bucket: string, path: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}

export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file)
  return { data, error }
}

// Usage examples:
// Portfolio image: getPublicUrl('portfolio-images', 'featured/project-hero.webp')
// Case study: getPublicUrl('case-studies', 'heroes/client-project.webp')
// Brand logo: getPublicUrl('brand-assets', 'logos/codeconvert-logo.svg')
```

This architecture maintains all existing functionality while providing a scalable foundation for the admin panel and content management system.