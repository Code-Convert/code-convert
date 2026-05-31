# Phase 1: Admin CMS - Folder Structure Setup

This document outlines the complete folder structure for the Admin CMS implementation.

## Root Structure
```
codeconvert/
├── app/
│   ├── (admin)/           # Admin route group
│   ├── (public)/          # Public route group  
│   ├── api/               # API routes
│   ├── components/        # Shared components
│   ├── lib/               # Utilities and configurations
│   └── globals.css        # Global styles
├── public/                # Static assets
├── supabase/              # Supabase configuration
└── types/                 # TypeScript type definitions
```

## Detailed Structure

### Admin Routes (/app/(admin)/)
```
(admin)/
├── layout.tsx             # Admin layout with sidebar
├── loading.tsx            # Admin loading component
├── dashboard/
│   └── page.tsx           # Admin dashboard
├── blog/
│   ├── page.tsx           # Blog management list
│   ├── create/
│   │   └── page.tsx       # Create new blog post
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx   # Edit blog post
│   └── components/
│       ├── BlogTable.tsx  # Blog data table
│       ├── BlogForm.tsx   # Blog create/edit form
│       └── BlogEditor.tsx # Rich text editor
├── case-studies/
│   ├── page.tsx           # Case studies management
│   ├── create/
│   │   └── page.tsx       # Create case study
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx   # Edit case study
│   └── components/
│       ├── CaseStudyTable.tsx
│       ├── CaseStudyForm.tsx
│       └── GalleryManager.tsx
├── media/
│   ├── page.tsx           # Media library
│   └── components/
│       ├── MediaGrid.tsx  # Media grid view
│       ├── MediaUpload.tsx # Upload component
│       └── MediaModal.tsx # Media selection modal
├── settings/
│   ├── page.tsx           # Settings page
│   └── components/
│       ├── SiteSettings.tsx
│       ├── UserSettings.tsx
│       └── ThemeToggle.tsx
└── login/
    └── page.tsx           # Admin login page
```

### Public Routes (/app/(public)/)
```
(public)/
├── layout.tsx             # Public layout with navbar/footer
├── page.tsx               # Homepage
├── web-design/
│   └── page.tsx           # Web design service page
├── e-commerce/
│   └── page.tsx           # E-commerce service page
├── blog/
│   ├── page.tsx           # Blog listing page
│   ├── [slug]/
│   │   └── page.tsx       # Individual blog post
│   └── components/
│       ├── BlogHero.tsx   # Featured post hero
│       ├── BlogGrid.tsx   # Blog posts grid
│       └── BlogCard.tsx   # Individual blog card
├── case-studies/
│   ├── page.tsx           # Case studies listing
│   ├── [slug]/
│   │   └── page.tsx       # Individual case study
│   └── components/
│       ├── CaseStudyGrid.tsx
│       └── CaseStudyCard.tsx
└── contact/
    └── page.tsx           # Contact page
```

### API Routes (/app/api/)
```
api/
├── auth/
│   ├── login/
│   │   └── route.ts       # Admin login endpoint
│   ├── logout/
│   │   └── route.ts       # Admin logout endpoint
│   └── verify/
│       └── route.ts       # Token verification
├── blog/
│   ├── route.ts           # GET all posts, POST create
│   ├── [id]/
│   │   └── route.ts       # GET, PUT, DELETE specific post
│   └── upload-image/
│       └── route.ts       # Image upload for blog content
├── case-studies/
│   ├── route.ts           # CRUD operations
│   └── [id]/
│       └── route.ts       # Individual case study operations
├── media/
│   ├── route.ts           # Media library operations
│   ├── upload/
│   │   └── route.ts       # File upload endpoint
│   └── [id]/
│       └── route.ts       # Individual media operations
└── settings/
    └── route.ts           # Site settings operations
```

### Components (/app/components/)
```
components/
├── ui/                    # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Table.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Skeleton.tsx
│   └── Toast.tsx
├── admin/                 # Admin-specific components
│   ├── AdminLayout.tsx    # Admin sidebar layout
│   ├── AdminNavbar.tsx    # Admin top navigation
│   ├── AdminSidebar.tsx   # Admin sidebar navigation
│   ├── ThemeProvider.tsx  # Theme context provider
│   ├── RichTextEditor.tsx # Advanced text editor
│   ├── ImageUpload.tsx    # Drag & drop image upload
│   └── DataTable.tsx      # Sortable data table
├── public/                # Public site components (existing)
│   ├── Navbar.tsx         # Public navigation
│   ├── Footer.tsx         # Public footer
│   ├── Hero.tsx           # Homepage hero
│   ├── Services.tsx       # Services section
│   ├── SelectedWork.tsx   # Featured work section
│   ├── Process.tsx        # Process section
│   ├── Testimonials.tsx   # Testimonials section
│   ├── CTA.tsx            # Call to action
│   ├── Marquee.tsx        # Scrolling text
│   ├── InteractiveCursor.tsx
│   ├── VoidBackground.tsx
│   └── Loader.tsx
└── shared/                # Shared between admin and public
    ├── LoadingSpinner.tsx
    ├── ErrorBoundary.tsx
    └── SEOHead.tsx
```

### Library Files (/app/lib/)
```
lib/
├── supabase/
│   ├── client.ts          # Supabase client configuration
│   ├── server.ts          # Server-side Supabase client
│   └── auth.ts            # Authentication utilities
├── utils/
│   ├── slugify.ts         # URL slug generation
│   ├── image-upload.ts    # Image processing utilities
│   ├── seo.ts             # SEO utilities
│   ├── validation.ts      # Form validation schemas
│   └── date.ts            # Date formatting utilities
├── hooks/
│   ├── useAuth.ts         # Authentication hook
│   ├── useTheme.ts        # Theme management hook
│   ├── useDebounce.ts     # Debounce hook
│   └── useLocalStorage.ts # Local storage hook
└── constants/
    ├── admin.ts           # Admin-related constants
    ├── blog.ts            # Blog categories, statuses
    └── case-studies.ts    # Case study types, industries
```

### Type Definitions (/types/)
```
types/
├── admin.ts               # Admin-related types
├── blog.ts                # Blog post types
├── case-study.ts          # Case study types
├── media.ts               # Media/file types
├── user.ts                # User types
├── api.ts                 # API response types
└── database.ts            # Database schema types
```

### Supabase Configuration (/supabase/)
```
supabase/
├── config.toml            # Supabase configuration
├── migrations/            # Database migrations
│   ├── 001_initial_schema.sql
│   ├── 002_blog_posts.sql
│   ├── 003_case_studies.sql
│   └── 004_media_library.sql
└── seed.sql               # Initial data seeding
```

### Public Assets (/public/)
```
public/
├── images/
│   ├── logo/              # Brand logos
│   ├── placeholders/      # Placeholder images
│   └── admin/             # Admin-specific images
├── icons/                 # Favicon and app icons
└── uploads/               # User uploaded content (if not using cloud storage)
```

## Implementation Order

1. **Setup base structure** - Create all folders and basic files
2. **Configure Supabase** - Database schema and authentication
3. **Create type definitions** - TypeScript interfaces from Supabase
4. **Build UI components** - Reusable components library
5. **Implement authentication** - Login system and route protection
6. **Create admin layout** - Sidebar navigation and theme system
7. **Build content management** - Blog and case study CRUD with direct Supabase queries
8. **Add media library** - File upload and management system
9. **Implement rich text editor** - Advanced content editing
10. **Add settings and user management** - Admin configuration

This structure provides:
- **Clear separation** between admin and public routes
- **Modular components** for reusability
- **Organized API endpoints** for all operations
- **Type safety** throughout the application
- **Direct Supabase integration** without ORM overhead
- **Scalable architecture** for future features