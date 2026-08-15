# Everything — Code & Convert

---

## 1. Project Identity

**Name:** Code & Convert

**Tagline:** We Build, Market & Scale Digital Brands.

**Business Type:** South African digital marketing agency offering web design, development, and digital marketing services.

**Purpose:** A public-facing marketing website combined with a headless admin CMS. The public site attracts and converts leads. The admin panel lets the agency manage all content — blog posts, case studies, media, and homepage layout — without touching code.

**Live URL:** Configured via `NEXT_PUBLIC_SITE_URL` environment variable. Deployed to Vercel.

**Contact:** hello@codeandconvert.co.za

---

## 2. What The Project Does

The project has two distinct surfaces:

### Public Marketing Site (`/`)
A high-performance, animated marketing website that:
- Showcases the agency's services, process, and results
- Displays published blog posts and case studies fetched live from Supabase
- Renders a homepage with live statistics pulled from a Postgres aggregate function
- Captures leads through a 17-step multi-step onboarding form that collects deep qualification data (goals, revenue, budget, timeline, decision authority, UTM tracking)
- Provides contact options (form, WhatsApp, phone)
- Generates a dynamic XML sitemap from live database content
- Injects JSON-LD structured data for SEO on every page

### Admin CMS (`/admin/*`)
A protected headless CMS that:
- Requires Supabase authentication with `role = 'admin'` in the `profiles` table
- Manages blog posts (create, edit, delete, publish/draft)
- Manages case studies (create, edit, delete, publish/draft)
- Controls homepage content placement — gallery grid order, website carousel membership and order, site statistics preview
- Manages a media library (upload to Supabase Storage, browse, copy URL, delete)
- Shows a dashboard with content counts

---

## 3. Why It Was Built This Way

### Next.js App Router
Chosen for its hybrid rendering model. Server Components fetch data directly from Supabase on the server — no client-side loading states, no API round-trips for public pages. This gives fast initial page loads and good SEO. Client Components are used only where interactivity is required (forms, animations, admin tables).

### Supabase
Chosen as a single backend that provides Postgres (data), Auth (sessions), and Storage (files) in one platform. Row Level Security (RLS) enforces data access rules at the database level — anonymous users can only read published content, authenticated admins can read and write everything. This removes the need for a separate backend service.

### Tailwind CSS v4
Utility-first CSS for rapid, consistent styling. No CSS files to maintain beyond `globals.css`. The dark design system (`#050505` background, `#FF1E1E` accent) is applied entirely through Tailwind classes.

### Framer Motion / Motion
Used for all animations — page transitions, scroll-triggered reveals, the navbar hide/show on scroll, the multi-step form transitions, and the admin sidebar logo spin. Chosen because it integrates natively with React and supports spring physics.

### Lenis
Smooth scroll library. Wraps the homepage in a `LenisProvider` that dispatches `app-scroll` custom events. The `VoidBackground` Three.js canvas listens to these events to drive scroll-reactive particle animations.

### Three.js (VoidBackground)
A custom WebGL particle system rendered on a `<canvas>` element fixed behind all content. 6,000 particles (3,000 on mobile) morph between 7 geometric forms (sphere, helix, grid, torus, galaxy, vortex, text) as the user scrolls. The text form spells "CODE & CONVERT" by sampling pixel data from an off-screen canvas. Mouse position repels particles. Scroll velocity stretches them. This is the primary visual differentiator of the site.

### Tiptap
Rich text editor used in the admin blog and case study forms. Supports bold, italic, headings, lists, links, and image insertion from the media library. Outputs HTML stored as a `TEXT` column in Postgres. Rendered on the public site via `dangerouslySetInnerHTML`.

### Zod
Used for runtime validation. The multi-step form validates each step before advancing. API routes validate required fields before database writes.

### Vercel
Deployment target. `vercel.json` specifies the framework as `nextjs`, the build command as `npm run build`, and the region as `iad1` (US East). Next.js on Vercel gets automatic edge middleware, image optimisation CDN, and serverless function hosting.

---

---

## 4. Full Tech Stack & Package List

### Runtime Dependencies (`dependencies` in `package.json`)

| Package | Version | What It Does | Where Used |
|---|---|---|---|
| `next` | 16.2.6 | React framework — App Router, SSR, API routes, image optimisation, middleware | Entire project |
| `react` | 19.2.4 | UI library | Entire project |
| `react-dom` | 19.2.4 | React DOM renderer | Entire project |
| `@supabase/supabase-js` | ^2.46.2 | Supabase JS client — database queries, auth, storage | All Supabase interactions |
| `@supabase/ssr` | ^0.5.2 | Supabase SSR helpers — cookie-based sessions for Next.js server/middleware | `lib/supabase/client.ts`, `lib/supabase/server.ts`, `middleware.ts`, `api/auth/callback/route.ts` |
| `framer-motion` | ^12.42.1 | Animation library — spring physics, keyframes, AnimatePresence | `multistep-form.tsx`, `Loader.tsx` |
| `motion` | ^12.40.0 | Motion library (used as `motion/react`) — scroll animations, navbar, hero, cards | `Navbar.tsx`, `Hero.tsx`, `SelectedWork.tsx`, `Services.tsx`, `Process.tsx`, `Testimonials.tsx`, `CTA.tsx`, `WebsiteCarousel.tsx`, `admin-sidebar.tsx` |
| `lenis` | ^1.3.23 | Smooth scroll — lerp-based scroll with velocity events | `LenisProvider.tsx` |
| `three` | ^0.184.0 | WebGL 3D library — particle system, shader materials, geometry | `VoidBackground.tsx` |
| `@types/three` | ^0.184.1 | TypeScript types for Three.js | `VoidBackground.tsx` |
| `@tiptap/react` | ^3.24.0 | Rich text editor React integration | `rich-text-editor.tsx` |
| `@tiptap/starter-kit` | ^3.24.0 | Tiptap base extensions (bold, italic, headings, lists, etc.) | `rich-text-editor.tsx` |
| `@tiptap/extension-image` | ^3.24.0 | Tiptap image insertion extension | `rich-text-editor.tsx` |
| `@tiptap/extension-link` | ^3.24.0 | Tiptap hyperlink extension | `rich-text-editor.tsx` |
| `@radix-ui/react-accordion` | ^1.2.17 | Accessible accordion primitive | `accordion.tsx`, FAQ sections |
| `@radix-ui/react-checkbox` | ^1.3.6 | Accessible checkbox primitive | `checkbox.tsx` |
| `@radix-ui/react-icons` | ^1.3.2 | Icon set from Radix UI | Various UI components |
| `@radix-ui/react-label` | ^2.1.11 | Accessible label primitive | `label.tsx`, form components |
| `@radix-ui/react-radio-group` | ^1.4.2 | Accessible radio group primitive | `radio-group.tsx`, `multistep-form.tsx` |
| `@radix-ui/react-select` | ^2.3.2 | Accessible select/dropdown primitive | `select.tsx`, `multistep-form.tsx` |
| `@radix-ui/react-slot` | ^1.3.0 | Slot pattern for composable components | `shadcn-button.tsx` |
| `class-variance-authority` | ^0.7.1 | Variant-based className utility | `button.tsx`, `shadcn-button.tsx` |
| `clsx` | ^2.1.1 | Conditional className merging | `lib/utils.ts` |
| `tailwind-merge` | ^2.5.4 | Tailwind class conflict resolution | `lib/utils.ts` (`cn` utility) |
| `lucide-react` | ^1.17.0 | Icon library | Admin pages, Navbar, CTA, forms |
| `react-icons` | ^5.7.0 | Additional icon sets (FontAwesome, etc.) | `contact-us/page.tsx` (social icons) |
| `sonner` | ^2.0.7 | Toast notification library | `app/layout.tsx` (global Toaster), `multistep-form.tsx` |
| `zod` | ^3.24.1 | Schema validation | Form validation, API input validation |
| `@paper-design/shaders-react` | ^0.0.77 | GLSL shader React components | Available but used selectively |
| `supabase` | ^2.102.0 | Supabase CLI (used for local dev and migrations) | `supabase/` SQL files |

### Dev Dependencies (`devDependencies` in `package.json`)

| Package | Version | What It Does |
|---|---|---|
| `typescript` | ^5 | TypeScript compiler |
| `@types/node` | ^20 | Node.js type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |
| `tailwindcss` | ^4 | Tailwind CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin for Tailwind v4 |
| `eslint` | ^9 | JavaScript/TypeScript linter |
| `eslint-config-next` | 16.2.6 | Next.js ESLint rules |

---

---

## 5. Complete File Structure

```
code-convert/
│
├── app/                                  # Next.js App Router root
│   ├── layout.tsx                        # Root layout — Inter font, global metadata, JSON-LD, Toaster
│   ├── globals.css                       # Global CSS — Tailwind v4 imports, base styles
│   ├── favicon.ico                       # Browser tab icon
│   ├── sitemap.ts                        # Dynamic XML sitemap — queries blogs + case studies from Supabase
│   │
│   ├── (marketing)/                      # Route group — public site (no URL segment)
│   │   ├── layout.tsx                    # Marketing layout — wraps children with Navbar + Footer
│   │   ├── page.tsx                      # Homepage — fetches projects + testimonials, renders all sections
│   │   ├── loading.tsx                   # Marketing loading state
│   │   ├── error.tsx                     # Marketing error boundary
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Blog listing — fetches all published blogs, renders BlogFilter
│   │   │   ├── BlogFilter.tsx            # Client component — filters blogs by search/category
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Blog post — fetches by slug, generateMetadata, JSON-LD Article
│   │   │
│   │   ├── case-studies/
│   │   │   ├── page.tsx                  # Case studies listing — fetches all published, renders CaseStudiesFilter
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Case study detail — fetches by slug, generateMetadata, JSON-LD Article
│   │   │
│   │   ├── contact-us/
│   │   │   └── page.tsx                  # Contact page — client component, opens OnboardingForm lightbox
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx                  # Services page — fetches gallery items, renders all service sections
│   │   │
│   │   ├── privacy/
│   │   │   └── page.tsx                  # Privacy policy static page
│   │   │
│   │   └── terms/
│   │       └── page.tsx                  # Terms of service static page
│   │
│   ├── (admin)/                          # Route group — admin panel (no URL segment)
│   │   ├── layout.tsx                    # Outer admin layout — calls requireAuth(), renders AdminSidebar
│   │   └── admin/
│   │       ├── layout.tsx                # Inner admin layout — calls requireAuth(), sidebar + main content
│   │       ├── page.tsx                  # Admin dashboard — counts blogs + case studies from Supabase
│   │       ├── loading.tsx               # Admin loading state
│   │       │
│   │       ├── blogs/
│   │       │   ├── page.tsx              # Blog list — server component, table of all blogs
│   │       │   ├── loading.tsx
│   │       │   ├── new/
│   │       │   │   ├── page.tsx          # Create blog — client form, POST to /api/blogs
│   │       │   │   └── loading.tsx
│   │       │   └── [id]/
│   │       │       ├── page.tsx          # Edit blog — client form, fetches by ID, PUT/DELETE to /api/blogs/[id]
│   │       │       └── loading.tsx
│   │       │
│   │       ├── case-studies/
│   │       │   ├── page.tsx              # Case study list — server component, table of all case studies
│   │       │   ├── loading.tsx
│   │       │   ├── new/
│   │       │   │   ├── page.tsx          # Create case study — client form, POST to /api/case-studies
│   │       │   │   └── loading.tsx
│   │       │   └── [id]/
│   │       │       ├── page.tsx          # Edit case study — client form, PUT/DELETE to /api/case-studies/[id]
│   │       │       └── loading.tsx
│   │       │
│   │       ├── content-placement/
│   │       │   ├── page.tsx              # Content management — gallery order, carousel, stats (client, direct Supabase)
│   │       │   └── loading.tsx
│   │       │
│   │       ├── media/
│   │       │   ├── page.tsx              # Media library — upload to Supabase Storage, browse, delete (client)
│   │       │   └── loading.tsx
│   │       │
│   │       └── settings/
│   │           ├── page.tsx              # Settings — static display of site info
│   │           └── loading.tsx
│   │
│   ├── admin-login/
│   │   ├── page.tsx                      # Login page — client, signInWithPassword, role check
│   │   └── diagnostic.tsx                # Auth diagnostic helper component
│   │
│   └── api/                              # Next.js API Route Handlers
│       ├── auth/
│       │   └── callback/
│       │       └── route.ts              # GET — exchanges OAuth code for session, redirects to /admin/dashboard
│       ├── blog/
│       │   └── route.ts                  # GET (list all blogs), POST (create blog) — legacy route
│       ├── blogs/
│       │   ├── route.ts                  # POST — create blog post (requires auth)
│       │   └── [id]/
│       │       └── route.ts              # PUT (update), DELETE (delete) blog by ID (requires auth)
│       ├── case-studies/
│       │   ├── route.ts                  # POST — create case study (requires auth, carousel validation)
│       │   └── [id]/
│       │       └── route.ts              # PUT (update), DELETE (delete) case study by ID (requires auth)
│       ├── contact/
│       │   └── route.ts                  # POST — inserts into contact_submissions table
│       ├── leads/
│       │   └── route.ts                  # POST — inserts full lead qualification data into lead_submissions
│       └── site-stats/
│           └── route.ts                  # GET — calls get_site_statistics() RPC, cached 60s (revalidate = 60)
│
├── components/
│   ├── layout/                           # Page-level layout sections
│   │   ├── Navbar.tsx                    # Animated sticky navbar — hide on scroll down, mobile sidebar
│   │   ├── Footer.tsx                    # Footer — links, social, contact, copyright
│   │   ├── admin-sidebar.tsx             # Admin navigation sidebar — links, logout
│   │   ├── Hero.tsx                      # Homepage hero section — headline, CTA, scroll indicator
│   │   ├── HeroBackgroundPaths.tsx       # Services page hero — animated SVG path background
│   │   ├── Marquee.tsx                   # Scrolling text marquee strip
│   │   ├── SelectedWork.tsx              # Homepage case study grid — 4 projects with hover effects
│   │   ├── Services.tsx                  # Homepage services grid — 6 service cards
│   │   ├── Process.tsx                   # Homepage process timeline — 4 steps
│   │   ├── Testimonials.tsx              # Homepage testimonials — client logos + testimonial grid
│   │   ├── CTA.tsx                       # Homepage call-to-action section
│   │   ├── statistics.tsx                # Statistics section — calls get_site_statistics() RPC
│   │   ├── WebsiteCarousel.tsx           # Draggable infinite carousel of website screenshots
│   │   ├── AnimatedHeading.tsx           # Scroll-triggered animated heading component
│   │   ├── CaseStudiesFilter.tsx         # Client filter for case studies listing page
│   │   ├── CaseStudiesHero.tsx           # Hero section for case studies listing page
│   │   ├── gallery-grid.tsx              # Gallery grid for services page
│   │   ├── selected-projects.tsx         # Selected projects section for services page
│   │   ├── recent-launches.tsx           # Recent launches section for services page
│   │   ├── tech-stack.tsx                # Tech stack display section
│   │   ├── faq.tsx                       # FAQ accordion section
│   │   └── SelectedWork.tsx              # Selected work grid
│   │
│   ├── ui/                               # Reusable UI primitives
│   │   ├── button/
│   │   │   └── shared.ts                 # Shared button variant definitions
│   │   ├── accordion.tsx                 # Radix accordion wrapper
│   │   ├── animated-stats.tsx            # Animated number counter for statistics
│   │   ├── article-header.tsx            # Blog/case study article header (title, date, tags, back link)
│   │   ├── button.tsx                    # Custom button component with loading state
│   │   ├── card.tsx                      # Card primitive (CardHeader, CardContent, CardFooter, etc.)
│   │   ├── checkbox.tsx                  # Radix checkbox wrapper
│   │   ├── content-card.tsx              # Generic content card
│   │   ├── content-grid.tsx              # Grid layout for content cards
│   │   ├── content-section.tsx           # Titled content section (used in case study detail)
│   │   ├── CTA_Button.tsx                # CTA button with variants
│   │   ├── empty-state.tsx               # Empty state placeholder
│   │   ├── faqsection.tsx                # FAQ section component
│   │   ├── featured-image.tsx            # Full-width featured image with Next.js Image
│   │   ├── focus-mode-overlay.tsx        # Focus mode overlay UI
│   │   ├── image-gallery.tsx             # Image gallery grid for case study detail
│   │   ├── image-upload.tsx              # Image upload to Supabase Storage with preview
│   │   ├── input.tsx                     # Styled input with label
│   │   ├── label.tsx                     # Radix label wrapper
│   │   ├── media-picker.tsx              # Modal to pick from media library
│   │   ├── multistep-form.tsx            # 17-step lead qualification form (lightbox)
│   │   ├── onboarding-header.tsx         # Progress header for multistep form
│   │   ├── page-container.tsx            # Max-width page wrapper with padding
│   │   ├── page-header.tsx               # Page title + description header
│   │   ├── radio-group.tsx               # Radix radio group wrapper
│   │   ├── rich-text-editor.tsx          # Tiptap WYSIWYG editor with media picker
│   │   ├── section.tsx                   # Section wrapper with SectionHeader
│   │   ├── select.tsx                    # Radix select wrapper
│   │   ├── shadcn-button.tsx             # shadcn-style button with CVA variants
│   │   ├── shadcn-input.tsx              # shadcn-style input
│   │   ├── shadcn-textarea.tsx           # shadcn-style textarea
│   │   ├── sticky-scroll-reveal.tsx      # Sticky scroll reveal animation component
│   │   ├── testimonial-card.tsx          # Single testimonial card
│   │   ├── testimonials-grid.tsx         # Masonry-style testimonials grid
│   │   ├── textarea.tsx                  # Styled textarea with label
│   │   └── upload-test.tsx               # Upload diagnostic component (admin)
│   │
│   ├── InteractiveCursor.tsx             # Custom cursor — follows mouse, expands on hover
│   ├── LenisProvider.tsx                 # Smooth scroll provider — initialises Lenis, dispatches scroll events
│   ├── Loader.tsx                        # Full-screen loading overlay — fades out on window load
│   ├── PageError.tsx                     # Generic page error component
│   ├── PageLoading.tsx                   # Generic page loading component
│   └── VoidBackground.tsx                # Three.js WebGL particle system — fixed background canvas
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                     # Browser Supabase client (createBrowserClient)
│   │   ├── server.ts                     # Server Supabase client (createServerClient + cookies)
│   │   └── auth.ts                       # Auth helpers — getUser(), requireAuth(), signOut()
│   ├── database.type.ts                  # Auto-generated Supabase TypeScript types for all tables + functions
│   ├── errors.ts                         # Custom error classes — AppError, NotFoundError, UnauthorizedError, ValidationError
│   └── utils.ts                          # Utility functions — cn() (className merge), slugify()
│
├── types/
│   ├── api.ts                            # API payload types — BlogInsertPayload, BlogUpdatePayload, etc.
│   ├── blog.ts                           # Blog domain types — BlogPost, CreateBlogPost, UpdateBlogPost, BlogFilters
│   ├── case-study.ts                     # Case study types — CaseStudy, CreateCaseStudy, INDUSTRIES, SERVICES, WEB_DEV_SERVICE
│   ├── contact.ts                        # Contact form type — ContactFormData
│   ├── database.ts                       # Additional database types
│   ├── media.ts                          # Media types — MediaFile, UploadedFile, ALLOWED_FILE_TYPES, MAX_FILE_SIZE
│   ├── user.ts                           # User types — User, AdminUser, LoginCredentials, AuthSession
│   └── web-design.ts                     # Web design related types
│
├── hooks/
│   ├── use-debounce.ts                   # Generic debounce hook — delays value updates
│   └── use-focus-mode.ts                 # Focus mode hook (deprecated/empty)
│
├── supabase/
│   ├── database-schema.sql               # Core schema — profiles, blogs, case_studies, media, RLS, triggers, storage buckets
│   ├── add-carousel-stats-columns.sql    # Migration — adds carousel/stats columns to case_studies, get_site_statistics() function
│   ├── lead-submissions.sql              # Lead submissions table — full schema, RLS, indexes, HubSpot mapping reference
│   ├── auth-simplification.sql           # Auth simplification migration
│   ├── diagnostic-queries.sql            # Diagnostic SQL queries for debugging
│   ├── fix-storage-policies.sql          # Storage RLS policy fixes
│   ├── seed-content.sql                  # Content seed data
│   ├── seed-data.sql                     # General seed data
│   └── simplified-schema.sql             # Simplified schema variant
│
├── docs/
│   ├── ARCHITECTURE.md                   # Folder structure, DB schema, patterns
│   ├── AUDIT.md                          # Code audit findings
│   ├── DESIGN_SPECIFICATION.md           # Design system, colours, typography
│   ├── HISTORY.md                        # Summary of all completed work
│   ├── prompt.md                         # AI prompt reference
│   ├── USER_FLOW_DIAGRAMS.md             # Public and admin user flows
│   └── WEB_DESIGN_OVERVIEW.md            # Section-by-section visual overview
│
├── public/
│   ├── apple-icon.png                    # Apple touch icon
│   ├── icon0.svg                         # SVG favicon
│   ├── icon1.png                         # PNG icon (used in JSON-LD)
│   ├── manifest.json                     # PWA manifest
│   └── robots.txt                        # Search engine crawl rules
│
├── .amazonq/
│   └── rules/
│       └── Workflow.md                   # Amazon Q agent workflow rules
│
├── middleware.ts                         # Edge middleware — protects /admin/* routes, validates Supabase session
├── next.config.ts                        # Next.js config — image domains, compression, no powered-by header
├── vercel.json                           # Vercel deployment config — framework, region (iad1), commands
├── tsconfig.json                         # TypeScript config
├── postcss.config.mjs                    # PostCSS config — Tailwind v4 plugin
├── eslint.config.mjs                     # ESLint config
├── package.json                          # Dependencies and scripts
├── .env.local                            # Local environment variables (not committed)
├── .env.example                          # Environment variable template
├── .gitignore                            # Git ignore rules
└── README.md                             # Project setup documentation
```

---

---

## 6. Environment Variables

All environment variables are stored in `.env.local` (not committed to git). `.env.example` documents the required keys.

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL — used in all Supabase client initialisations |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anonymous key — used for public reads and auth flows |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service role key — bypasses RLS for admin operations |
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Full site URL — used in metadata, JSON-LD, sitemap, OG tags |
| `RESEND_API_KEY` | Server only | Resend email API key — for transactional email sending |
| `CONTACT_EMAIL` | Server only | Destination email for contact form submissions |

**Why `NEXT_PUBLIC_` prefix matters:** Variables prefixed with `NEXT_PUBLIC_` are bundled into the client-side JavaScript. Variables without this prefix are only available in server-side code (API routes, Server Components, middleware). The Supabase URL and anon key are intentionally public — they are safe to expose because RLS policies enforce access control at the database level.

---

## 7. Next.js Configuration (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  compress: true,                    // Gzip compression on responses
  poweredByHeader: false,            // Removes X-Powered-By: Next.js header (security)
  images: {
    formats: ['image/avif', 'image/webp'],   // Serve modern image formats
    remotePatterns: [
      { protocol: 'https', hostname: 'uadltocidtriezcntwxd.supabase.co' },  // Supabase Storage CDN
      { protocol: 'https', hostname: 'images.unsplash.com' },               // Unsplash images
    ],
  },
  typescript: {
    ignoreBuildErrors: true,         // Allows deployment even with TS errors (pragmatic for rapid dev)
  },
};
```

**Why these settings:** Image optimisation is critical for performance — AVIF/WebP reduce file sizes by 50–80% vs JPEG. The Supabase hostname must be whitelisted so Next.js Image can proxy and optimise images stored in Supabase Storage. `compress: true` reduces bandwidth. `poweredByHeader: false` is a minor security hardening measure.

---

## 8. Vercel Deployment Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Region `iad1`:** US East (Northern Virginia). This is where Vercel's serverless functions run. Chosen because it is geographically close to Supabase's default AWS `us-east-1` region, minimising database latency for server-side data fetching.

**How deployment works:**
1. Code is pushed to the connected Git repository (GitHub/GitLab)
2. Vercel detects the push and triggers a build
3. `npm install` installs dependencies
4. `npm run build` runs `next build` — compiles TypeScript, bundles client JS, pre-renders static pages, generates the sitemap
5. Vercel deploys the output as a combination of static assets (CDN), serverless functions (API routes, Server Components), and edge functions (middleware)
6. Environment variables set in the Vercel dashboard are injected at build and runtime

---

---

## 9. Database Schema (Supabase / Postgres)

All tables live in the `public` schema. Row Level Security (RLS) is enabled on every table.

### Table: `profiles`

Extends Supabase's built-in `auth.users` table. Created automatically via trigger when a new user signs up.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key — references `auth.users` |
| `email` | TEXT | User email |
| `role` | TEXT | `'user'` or `'admin'` — controls admin access |
| `created_at` | TIMESTAMPTZ | Auto-set |
| `updated_at` | TIMESTAMPTZ | Auto-updated via trigger |

**Why it exists:** Supabase Auth stores minimal user data. The `profiles` table extends it with a `role` field. The middleware and `requireAuth()` check this role to gate admin access. The trigger `on_auth_user_created` automatically creates a profile row whenever a new user is created in `auth.users`.

---

### Table: `blogs`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key, auto-generated |
| `title` | TEXT | Required |
| `slug` | TEXT | Unique, URL-safe identifier |
| `excerpt` | TEXT | Short description |
| `content` | TEXT | Full HTML content from Tiptap |
| `featured_image` | TEXT | URL to Supabase Storage image |
| `seo_title` | TEXT | Override for `<title>` tag |
| `seo_description` | TEXT | Override for meta description |
| `published` | BOOLEAN | Default false — controls public visibility |
| `published_at` | TIMESTAMPTZ | Set when first published |
| `created_at` | TIMESTAMPTZ | Auto-set |
| `updated_at` | TIMESTAMPTZ | Auto-updated via trigger |
| `author_id` | UUID | FK → `profiles.id` ON DELETE SET NULL |

---

### Table: `case_studies`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `title` | TEXT | Required |
| `slug` | TEXT | Unique |
| `client` | TEXT | Required — client name |
| `industry` | TEXT | Industry category |
| `services` | TEXT[] | Array of service tags |
| `challenge` | TEXT | Problem statement |
| `solution` | TEXT | What was built/done |
| `results` | TEXT | Outcomes achieved |
| `content` | TEXT | Full HTML body |
| `featured_image` | TEXT | Primary image URL |
| `gallery` | TEXT[] | Array of additional image URLs |
| `testimonial_text` | TEXT | Client quote |
| `testimonial_author` | TEXT | Quote author name |
| `testimonial_role` | TEXT | Author's role/title |
| `seo_title` | TEXT | SEO title override |
| `seo_description` | TEXT | SEO description override |
| `published` | BOOLEAN | Default false |
| `published_at` | TIMESTAMPTZ | |
| `show_in_carousel` | BOOLEAN | Default false — homepage carousel |
| `carousel_image` | TEXT | Optional separate carousel thumbnail |
| `roas` | NUMERIC | Return on ad spend — feeds statistics |
| `performance_score` | NUMERIC | Performance score — feeds statistics |
| `is_custom_built` | BOOLEAN | Default true — feeds statistics |
| `gallery_order` | INTEGER | Default 0 — controls gallery grid order |
| `carousel_order` | INTEGER | Default 0 — controls carousel order |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Auto-updated via trigger |

**Why the extra columns:** The `show_in_carousel`, `carousel_image`, `carousel_order`, `gallery_order`, `roas`, `performance_score`, and `is_custom_built` columns were added in the `add-carousel-stats-columns.sql` migration. They allow the admin to control homepage content placement and feed the live statistics widget without a separate configuration table.

---

### Table: `media`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `filename` | TEXT | Generated filename in storage bucket |
| `original_name` | TEXT | Original file name from upload |
| `mime_type` | TEXT | e.g. `image/jpeg` |
| `size` | INTEGER | File size in bytes |
| `url` | TEXT | Public CDN URL from Supabase Storage |
| `alt_text` | TEXT | Optional accessibility text |
| `created_at` | TIMESTAMPTZ | |
| `uploaded_by` | UUID | FK → `profiles.id` |

---

### Table: `lead_submissions`

The most complex table. Captures every field from the 17-step onboarding form plus tracking metadata.

| Column Group | Columns |
|---|---|
| Contact | `name`, `email`, `phone` |
| Source | `source_page`, `source_url` |
| UTM Tracking | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` |
| Request Metadata | `ip_address`, `user_agent`, `referrer` |
| Form Answers | `primary_goal`, `sells_to`, `growth_stage`, `biggest_challenge`, `exploring_reason`, `company_name`, `website_url`, `industry`, `industry_other`, `role`, `decision_authority`, `monthly_revenue`, `monthly_ad_spend`, `budget_allocated`, `implementation_timeline`, `action_likelihood`, `additional_context`, `meeting_preference` |
| Lead Scoring | `lead_score`, `lead_temperature` (`hot`/`warm`/`cold`) |
| CRM | `lifecycle_stage`, `lead_status`, `hubspot_contact_id`, `hubspot_sync_status`, `hubspot_synced_at` |
| Timestamps | `created_at`, `updated_at` |

**Why this table is so detailed:** The form is designed as a lead qualification engine. Every answer maps to a HubSpot property (documented in the SQL file comments). The `lead_score` and `lead_temperature` fields are reserved for a future scoring algorithm. The UTM fields capture the marketing channel that drove the lead. The `ip_address` and `user_agent` fields support fraud detection and analytics.

---

### Postgres Function: `get_site_statistics()`

```sql
SELECT
  count(*) AS projects_delivered,
  round(avg(performance_score), 0) AS avg_performance_score,
  round(avg(roas), 1) AS avg_roas,
  round(100.0 * count(*) FILTER (WHERE is_custom_built) / NULLIF(count(*), 0), 0) AS percent_custom_built
FROM case_studies
WHERE published = true;
```

Called via `supabase.rpc('get_site_statistics')`. Returns a single row of aggregated statistics from all published case studies. Used by the `Statistics` component on the homepage and services page, and by the `/api/site-stats` route (cached 60 seconds). The admin content-placement page also calls it directly to preview live values.

---

### Postgres Triggers

| Trigger | Table | Function | Purpose |
|---|---|---|---|
| `on_auth_user_created` | `auth.users` | `handle_new_user()` | Creates a `profiles` row on signup |
| `update_profiles_updated_at` | `profiles` | `update_updated_at_column()` | Auto-updates `updated_at` |
| `update_blogs_updated_at` | `blogs` | `update_updated_at_column()` | Auto-updates `updated_at` |
| `update_case_studies_updated_at` | `case_studies` | `update_updated_at_column()` | Auto-updates `updated_at` |
| `update_lead_submissions_updated_at` | `lead_submissions` | `update_updated_at_column()` | Auto-updates `updated_at` |

---

### Storage Buckets

| Bucket | Public | Purpose |
|---|---|---|
| `blog-images` | Yes | Blog featured images |
| `case-study-images` | Yes | Case study images |
| `media-library` | Yes | All admin-uploaded media |

All three buckets are public-read. Write access requires an authenticated Supabase session. In practice, all uploads go to `media-library` — the other two buckets exist for organisational separation.

---

### Row Level Security Summary

| Table | Anonymous | Authenticated (non-admin) | Admin |
|---|---|---|---|
| `profiles` | None | Own row only | Own row only |
| `blogs` | Read published only | Read published only | Full CRUD |
| `case_studies` | Read published only | Read published only | Full CRUD |
| `media` | Read all | Read all | Full CRUD |
| `lead_submissions` | Insert only | None | Read + Update |

**Why RLS at the database level:** Even if an API route has a bug or is bypassed, the database itself enforces access rules. An anonymous user cannot read draft content or lead submissions regardless of how the API is called.

---

---

## 10. Authentication & Middleware

### How Authentication Works

Supabase Auth uses JWT tokens stored in HTTP-only cookies. The `@supabase/ssr` package handles cookie management for Next.js.

**Login flow (`/admin-login/page.tsx`):**
1. User submits email + password
2. `supabase.auth.signInWithPassword()` is called on the browser client (`lib/supabase/client.ts`)
3. Supabase returns a session — JWT stored in cookies
4. The page then queries `profiles` to check `role === 'admin'`
5. If not admin, `supabase.auth.signOut()` is called and an error is shown
6. If admin, `router.push('/admin')` navigates to the dashboard

**Why the role check happens client-side at login:** The middleware also enforces auth on every `/admin/*` request, but it only checks for a valid session (not role). The login page adds the role check as a UX gate — non-admin users are rejected immediately with a clear message rather than being redirected in a loop.

---

### Middleware (`middleware.ts`)

Runs at the **edge** (Vercel Edge Runtime) on every request matching `/admin/:path*`.

```
Request to /admin/* 
  → middleware.ts runs
  → Creates Supabase server client with request cookies
  → Calls supabase.auth.getUser()
  → If no user → redirect to /admin-login
  → If user exists → allow request through
```

**Why edge middleware:** Edge functions run before the request reaches the Next.js server, so unauthenticated requests never hit the database or render any admin UI. This is the most efficient protection point.

**Cookie handling in middleware:** The middleware must both read cookies (to get the session) and write cookies (to refresh the session if the JWT is expiring). The `setAll` implementation updates both the request and response cookie stores to ensure the refreshed session propagates correctly.

---

### Server-Side Auth (`lib/supabase/auth.ts`)

Three exported functions:

**`getUser()`** — Used in server components and API routes to get the current user with their profile role.
```
createClient() → supabase.auth.getUser() → query profiles table → return User object
```

**`requireAuth()`** — Used in admin layouts and API routes. Calls `getUser()` and redirects to `/admin-login` if no user is found. Returns the User object if authenticated.

**`signOut()`** — Calls `supabase.auth.signOut()` and redirects to `/admin-login`.

**Why two layers of auth (middleware + `requireAuth()`):** The middleware is a fast edge check — it blocks unauthenticated requests before they reach the server. `requireAuth()` in layouts is a server-side double-check that also fetches the user's role from the database. This defence-in-depth approach means even if the middleware is misconfigured, the layout will still redirect unauthenticated users.

---

### Supabase Client Variants

**Browser client (`lib/supabase/client.ts`):**
```typescript
createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
```
Used in Client Components (`'use client'`). Manages its own cookie state in the browser. Used for: admin edit pages (fetching data on mount), media library, content placement, admin login, admin sidebar logout.

**Server client (`lib/supabase/server.ts`):**
```typescript
createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, { cookies: { getAll, setAll } })
```
Used in Server Components and API Route Handlers. Reads/writes cookies via Next.js `cookies()`. Used for: all public page data fetching, all API routes, auth helpers, sitemap generation.

**Why two clients:** Next.js has different cookie APIs for server vs client contexts. The `@supabase/ssr` package provides separate factory functions for each. Using the wrong client in the wrong context would break session management.

---

---

## 11. API Routes — Data Flow

All API routes live in `app/api/`. They are Next.js Route Handlers that run as serverless functions on Vercel.

---

### `GET /api/site-stats`
**File:** `app/api/site-stats/route.ts`
**Packages:** `next/server`, `@supabase/ssr` (via `lib/supabase/server.ts`)
**Cache:** `export const revalidate = 60` — Next.js caches the response for 60 seconds

```
Request → createClient() → supabase.rpc('get_site_statistics') → return JSON
```

Called by the `Statistics` component on the homepage and services page (via server-side fetch). The 60-second cache means the database is not queried on every page load — the cached response is served from Vercel's edge cache.

---

### `GET /api/blog` — List all blogs
### `POST /api/blog` — Create blog (legacy)
**File:** `app/api/blog/route.ts`
**Auth:** POST requires `requireAuth()`

The GET endpoint returns all blogs (including drafts) — used by the admin panel. The POST endpoint is a legacy route; the primary create route is `/api/blogs`.

---

### `POST /api/blogs` — Create blog post
**File:** `app/api/blogs/route.ts`
**Auth:** `requireAuth()` — must be authenticated admin

```
POST /api/blogs
  Body: { title, slug, excerpt, content, featured_image, seo_title, seo_description, published }
  → requireAuth() → validate → supabase.from('blogs').insert() → { success: true }
```

---

### `PUT /api/blogs/[id]` — Update blog post
### `DELETE /api/blogs/[id]` — Delete blog post
**File:** `app/api/blogs/[id]/route.ts`
**Auth:** `requireAuth()`

```
PUT /api/blogs/[id]
  Body: { title, slug, excerpt, content, ... }
  → requireAuth() → supabase.from('blogs').update().eq('id', id) → { success: true }

DELETE /api/blogs/[id]
  → requireAuth() → supabase.from('blogs').delete().eq('id', id) → { success: true }
```

---

### `POST /api/case-studies` — Create case study
**File:** `app/api/case-studies/route.ts`
**Auth:** `requireAuth()`
**Validation:** Carousel eligibility check

```
POST /api/case-studies
  Body: { title, slug, client, services, show_in_carousel, carousel_image, roas, ... }
  → requireAuth()
  → if show_in_carousel && !services.includes('Web Design & Development') → 400 error
  → if show_in_carousel && !carousel_image && !featured_image → 400 error
  → supabase.from('case_studies').insert() → { success: true }
```

**Why the carousel validation:** Only "Web Design & Development" projects are eligible for the homepage carousel. This is enforced at the API level (not just the UI) to prevent invalid data from reaching the database.

---

### `PUT /api/case-studies/[id]` — Update case study
### `DELETE /api/case-studies/[id]` — Delete case study
**File:** `app/api/case-studies/[id]/route.ts`
**Auth:** `requireAuth()`

Same carousel validation as POST. Same pattern as blog routes.

---

### `POST /api/contact` — Contact form submission
**File:** `app/api/contact/route.ts`
**Auth:** None — public endpoint

```
POST /api/contact
  Body: { name, email, message }
  → validate required fields
  → supabase.from('contact_submissions').insert() → { success: true }
```

Note: `contact_submissions` is not in the main schema — it is inserted via a type-cast (`as any`), suggesting it may be a table added outside the documented migrations.

---

### `POST /api/leads` — Lead form submission
**File:** `app/api/leads/route.ts`
**Auth:** None — public endpoint (RLS allows anonymous inserts)
**Packages:** `next/server`, `lib/supabase/server.ts`, `lib/database.type.ts`

```
POST /api/leads
  Body: { name, email, phone, source_page, + all 17 form fields + UTM params }
  → validate: name, email, phone, source_page required
  → extract IP from x-forwarded-for or x-real-ip headers
  → extract user_agent and referer from request headers
  → supabase.from('lead_submissions').insert(payload) → { success: true } 201
```

**Why IP/UA capture:** These fields support lead quality analysis and fraud detection. The IP is extracted from the `x-forwarded-for` header (set by Vercel's proxy) rather than a direct socket connection.

---

### `GET /api/auth/callback` — OAuth callback
**File:** `app/api/auth/callback/route.ts`
**Auth:** None — this IS the auth endpoint

```
GET /api/auth/callback?code=xxx
  → extract code from URL params
  → supabase.auth.exchangeCodeForSession(code)
  → redirect to /admin/dashboard
```

Used for OAuth-based login flows (e.g. magic links, Google OAuth). The code is exchanged for a session and stored in cookies.

---

---

## 12. Public Pages — Data Flow

All public pages are **React Server Components** by default. They fetch data directly from Supabase on the server during the request, with no client-side loading states.

---

### Homepage (`app/(marketing)/page.tsx`)

**Packages:** `lib/supabase/server.ts`, `components/LenisProvider.tsx`, all layout section components

```
Request to /
  → getHomepageData() runs on server
  → Promise.all([
      supabase.from('case_studies').select(...).eq('published', true).limit(4),
      supabase.from('case_studies').select(...).eq('published', true).not('testimonial_text', 'is', null).limit(6)
    ])
  → passes projects[] to <SelectedWork>
  → passes testimonials[] to <Testimonials>
  → <Statistics> fetches its own data (supabase.rpc('get_site_statistics'))
  → <LenisProvider> wraps everything — initialises Lenis smooth scroll on client
  → <VoidBackground> renders Three.js canvas (dynamically imported, SSR disabled)
```

**Why `Promise.all`:** Both queries run in parallel, halving the total database round-trip time compared to sequential awaits.

---

### Blog Listing (`app/(marketing)/blog/page.tsx`)

**Packages:** `lib/supabase/server.ts`, `components/ui/page-container.tsx`, `components/ui/page-header.tsx`, `components/VoidBackground.tsx`, `components/InteractiveCursor.tsx`, `./BlogFilter.tsx`

```
Request to /blog
  → supabase.from('blogs').select('*').eq('published', true).order('published_at', desc)
  → passes blogs[] to <BlogFilter> (client component)
  → BlogFilter handles search/filter in browser without additional API calls
```

**Why `BlogFilter` is a Client Component:** Filtering is interactive (user types in a search box). Rather than making a new server request on every keystroke, all published blogs are fetched once on the server and passed to the client component which filters them in memory.

---

### Blog Post (`app/(marketing)/blog/[slug]/page.tsx`)

**Packages:** `lib/supabase/server.ts`, `next/navigation` (notFound), `next/dist/server/app-render/entry-base` (generateMetadata)

```
Request to /blog/[slug]
  → generateMetadata() fetches title, seo_title, seo_description, featured_image for <head>
  → page() fetches full blog row by slug + published=true
  → if not found → notFound() → 404
  → renders article with dangerouslySetInnerHTML for HTML content
  → injects JSON-LD Article schema
```

**Why `generateMetadata` is separate:** Next.js calls `generateMetadata` before rendering the page, allowing it to set `<title>` and `<meta>` tags in the HTML `<head>` for SEO crawlers. It makes a separate (smaller) database query to avoid fetching the full content just for metadata.

---

### Case Studies Listing (`app/(marketing)/case-studies/page.tsx`)

Same pattern as blog listing. Fetches all published case studies, passes to `<CaseStudiesFilter>` client component.

---

### Case Study Detail (`app/(marketing)/case-studies/[slug]/page.tsx`)

**Packages:** `lib/supabase/server.ts`, `components/ui/article-header.tsx`, `components/ui/featured-image.tsx`, `components/ui/content-section.tsx`, `components/ui/testimonial-card.tsx`, `components/ui/image-gallery.tsx`

```
Request to /case-studies/[slug]
  → generateMetadata() fetches minimal fields for SEO
  → page() fetches full case study row
  → if not found → notFound()
  → renders: ArticleHeader, FeaturedImage, 3-column grid (Challenge/Solution/Results),
             full HTML content, TestimonialCard, ImageGallery
  → injects JSON-LD Article schema with client as `about.name`
```

---

### Services Page (`app/(marketing)/services/page.tsx`)

**Packages:** `lib/supabase/server.ts`, multiple layout components

```
Request to /services
  → getGalleryItems() fetches case studies ordered by gallery_order, limit 4
  → passes galleryItems[] to <GalleryGrid>
  → renders: HeroBackgroundPaths, SelectedProjects, Statistics, TechStack,
             GalleryGrid, Process, RecentLaunches, ServicesFAQ, CTA
```

---

### Contact Us (`app/(marketing)/contact-us/page.tsx`)

**Packages:** `react-icons/fa` (social icons), `components/ui/multistep-form.tsx`, `components/VoidBackground.tsx`, `components/InteractiveCursor.tsx`

This is a **Client Component** (`'use client'`). It manages the `isOpen` state for the `OnboardingForm` lightbox. No server-side data fetching — it is a static page with interactive elements.

---

### Sitemap (`app/sitemap.ts`)

**Packages:** `lib/supabase/server.ts`, `next` (MetadataRoute)

```
Build time (or on-demand)
  → Promise.all([
      supabase.from('blogs').select('slug, updated_at, published_at').eq('published', true),
      supabase.from('case_studies').select('slug, updated_at, published_at').eq('published', true)
    ])
  → returns static routes + dynamic blog routes + dynamic case study routes
  → Next.js serialises to XML at /sitemap.xml
```

---

---

## 13. Admin Pages — Data Flow

All admin pages are protected by two layers: the edge middleware and `requireAuth()` in the layout.

---

### Admin Layout (`app/(admin)/admin/layout.tsx`)

```
Request to /admin/*
  → middleware.ts (edge) checks session → redirect to /admin-login if none
  → layout.tsx renders → requireAuth() called → queries profiles table → redirect if not admin
  → renders AdminSidebar + main content area
```

---

### Dashboard (`app/(admin)/admin/page.tsx`)

**Packages:** `lib/supabase/server.ts`

Server Component. Makes 4 parallel count queries:
```
Promise-style sequential (not parallel in current implementation):
  supabase.from('blogs').select('*', { count: 'exact', head: true })
  supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('published', true)
  supabase.from('case_studies').select('*', { count: 'exact', head: true })
  supabase.from('case_studies').select('*', { count: 'exact', head: true }).eq('published', true)
→ renders stat cards + quick action links
```

---

### Blog List (`app/(admin)/admin/blogs/page.tsx`)

**Packages:** `lib/supabase/server.ts`, `next/link`, `components/ui/button.tsx`, `lucide-react`

Server Component. Fetches all blogs (including drafts) ordered by `created_at` desc. Renders a table with title, slug, status badge, date, and edit/delete links.

---

### Create Blog (`app/(admin)/admin/blogs/new/page.tsx`)

**Packages:** `react`, `next/navigation`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/rich-text-editor.tsx`, `components/ui/image-upload.tsx`, `lib/utils.ts` (slugify)

Client Component. Local state manages all form fields. Title change auto-generates slug via `slugify()`.

```
User fills form → clicks submit
  → fetch('POST', '/api/blogs', body: formData)
  → on success → router.push('/admin/blogs')
```

---

### Edit Blog (`app/(admin)/admin/blogs/[id]/page.tsx`)

**Packages:** `react` (useState, useEffect, use), `next/navigation`, `lib/supabase/client.ts`, same UI components as create

Client Component. On mount, fetches the blog by ID directly from Supabase (browser client). Populates form. Submit calls `PUT /api/blogs/[id]`. Delete calls `DELETE /api/blogs/[id]`.

**Why the edit page fetches directly from Supabase (not via API):** The edit page is a Client Component. It could call an API route, but fetching directly from the browser Supabase client is simpler and avoids an extra HTTP round-trip. The Supabase anon key + RLS allows authenticated admins to read all blogs.

---

### Create/Edit Case Study

Same pattern as blog create/edit. Additional fields: `client`, `industry`, `services[]`, `challenge`, `solution`, `results`, `testimonial_*`, `show_in_carousel`, `carousel_image`, `roas`, `performance_score`, `is_custom_built`, `gallery_order`, `carousel_order`.

---

### Content Placement (`app/(admin)/admin/content-placement/page.tsx`)

**Packages:** `react` (useState, useEffect, useCallback), `lib/supabase/client.ts`, `next/image`, `lucide-react`, `types/case-study.ts` (WEB_DEV_SERVICE)

Client Component. Fetches all case studies directly from Supabase on mount. Three tabs:

**Gallery Tab:**
- Shows all case studies sorted by `gallery_order`
- Toggle published/draft → `supabase.from('case_studies').update({ published: next }).eq('id', id)`
- Move up/down → swaps `gallery_order` values between two rows via two parallel updates

**Carousel Tab:**
- Shows only case studies with `services` containing `'Web Design & Development'`
- Toggle `show_in_carousel` → direct Supabase update
- Move up/down → swaps `carousel_order` values

**Statistics Tab:**
- Calls `supabase.rpc('get_site_statistics')` to show live aggregated stats
- Shows per-project breakdown of `roas`, `performance_score`, `is_custom_built`

**Why direct Supabase calls (not API routes):** The content placement page makes many small, rapid updates (toggling, reordering). Going through API routes would add latency and complexity. The browser Supabase client with the authenticated session has the same write permissions as the API routes (both use the anon key + RLS admin policies).

---

### Media Library (`app/(admin)/admin/media/page.tsx`)

**Packages:** `react`, `lib/supabase/client.ts`, `components/ui/button.tsx`, `lucide-react`, `types/media.ts`, `components/ui/upload-test.tsx`

Client Component.

**Upload flow:**
```
User selects file(s)
  → validate: must be image, max 5MB
  → supabase.auth.getUser() — confirm authenticated
  → generate filename: `${Date.now()}-${random}.${ext}`
  → supabase.storage.from('media-library').upload(filename, file)
  → supabase.storage.from('media-library').getPublicUrl(filename)
  → supabase.from('media').insert({ filename, original_name, mime_type, size, url, uploaded_by })
  → fetchMedia() to refresh the grid
```

**Delete flow:**
```
User confirms delete
  → supabase.storage.from('media-library').remove([item.filename])
  → supabase.from('media').delete().eq('id', item.id)
  → remove from local state
```

---

---

## 14. Lead Capture — Multi-Step Form Data Flow

The multi-step form (`components/ui/multistep-form.tsx`) is the primary lead capture mechanism. It is a 17-step qualification funnel rendered as a lightbox modal.

**Packages used:** `react`, `framer-motion`, `lucide-react`, `sonner`, `lib/utils.ts` (cn), and all Radix UI primitives (`shadcn-button`, `shadcn-input`, `shadcn-textarea`, `card`, `label`, `radio-group`, `select`, `onboarding-header`)

---

### Form Steps

| Step | ID | What It Collects |
|---|---|---|
| 0 | introduction | Name |
| 1 | primary-goal | Primary business goal (radio) |
| 2 | sells-to | B2B / B2C / Both (radio) |
| 3 | growth-stage | Business stage (radio) |
| 4 | challenge | Biggest growth challenge (radio) |
| 5 | exploring-reason | Why exploring support now (radio) |
| 6 | company | Company name, website URL, industry (select) |
| 7 | role | Job role (radio) |
| 8 | decision-authority | Decision-making authority (radio) |
| 9 | monthly-revenue | Revenue range (select) |
| 10 | ad-spend | Monthly ad spend (select) |
| 11 | budget | Budget allocated for 90 days (radio) |
| 12 | timeline | Implementation timeline (radio) |
| 13 | action-likelihood | Likelihood to act (radio) |
| 14 | context | Additional context (textarea, optional) |
| 15 | contact | Full name, email, phone |
| 16 | meeting | Meeting preference — online or in-person |

---

### Validation

Each step validates before advancing. Validation runs in `validateStep()` using a switch on `currentStep`. Errors are shown inline and via `sonner` toast. The form cannot advance with validation errors.

---

### Submission Flow

```
User completes step 16 → clicks Submit
  → validateStep() — final validation
  → extract UTM params from window.location.search
  → fetch('POST', '/api/leads', {
      name, email, phone, source_page (prop),
      source_url: window.location.href,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      primary_goal, sells_to, growth_stage, biggest_challenge,
      exploring_reason, company_name, website_url, industry, industry_other,
      role, decision_authority, monthly_revenue, monthly_ad_spend,
      budget_allocated, implementation_timeline, action_likelihood,
      additional_context, meeting_preference
    })
  → API route extracts IP from headers, adds user_agent, referrer
  → supabase.from('lead_submissions').insert(payload)
  → setIsSubmitted(true) → success animation shown
  → sonner toast: "Application received! We'll be in touch shortly."
```

---

### Where The Form Is Used

| Page | `sourcePage` prop value |
|---|---|
| `/contact-us` | `"contact-us"` |

The form is opened by a button click that sets `isOpen = true`. It renders as a fixed-position lightbox with a backdrop blur overlay. Clicking the backdrop or the X button closes it.

---

### Why This Form Design

The 17-step format is intentional. Each step asks one question, reducing cognitive load and increasing completion rates compared to a single long form. The qualification data (revenue, budget, decision authority, timeline) allows the agency to score leads before the first call. The UTM tracking connects each lead to the marketing campaign that drove them.

---

---

## 14. Lead Capture — Multi-Step Form Data Flow

The multi-step form (`components/ui/multistep-form.tsx`) is the primary lead capture mechanism. It is a 17-step qualification funnel rendered as a lightbox modal.

**Packages used:** `react`, `framer-motion`, `lucide-react`, `sonner`, `lib/utils.ts` (cn), and all Radix UI primitives (`shadcn-button`, `shadcn-input`, `shadcn-textarea`, `card`, `label`, `radio-group`, `select`, `onboarding-header`)

---

### Form Steps

| Step | ID | What It Collects |
|---|---|---|
| 0 | introduction | Name |
| 1 | primary-goal | Primary business goal (radio) |
| 2 | sells-to | B2B / B2C / Both (radio) |
| 3 | growth-stage | Business stage (radio) |
| 4 | challenge | Biggest growth challenge (radio) |
| 5 | exploring-reason | Why exploring support now (radio) |
| 6 | company | Company name, website URL, industry (select) |
| 7 | role | Job role (radio) |
| 8 | decision-authority | Decision-making authority (radio) |
| 9 | monthly-revenue | Revenue range (select) |
| 10 | ad-spend | Monthly ad spend (select) |
| 11 | budget | Budget allocated for 90 days (radio) |
| 12 | timeline | Implementation timeline (radio) |
| 13 | action-likelihood | Likelihood to act (radio) |
| 14 | context | Additional context (textarea, optional) |
| 15 | contact | Full name, email, phone |
| 16 | meeting | Meeting preference — online or in-person |

---

### Validation

Each step validates before advancing via `validateStep()` using a switch on `currentStep`. Errors are shown inline and via `sonner` toast. The form cannot advance with validation errors.

---

### Submission Flow

```
User completes step 16 → clicks Submit
  → validateStep() — final validation
  → extract UTM params from window.location.search
  → fetch POST /api/leads with all form fields + UTM params + source_url
  → API route extracts IP from x-forwarded-for header
  → API route extracts user_agent and referer from request headers
  → supabase.from('lead_submissions').insert(payload)
  → setIsSubmitted(true) → success animation shown
  → sonner toast: "Application received! We'll be in touch shortly."
```

---

### Where The Form Is Used

| Page | sourcePage prop |
|---|---|
| `/contact-us` | `"contact-us"` |

The form opens as a fixed-position lightbox with a backdrop blur overlay. Clicking the backdrop or X closes it.

---

### Why This Form Design

The 17-step format reduces cognitive load per screen and increases completion rates vs a single long form. The qualification data (revenue, budget, decision authority, timeline) lets the agency score leads before the first call. UTM tracking connects each lead to the marketing campaign that drove them. The `lead_score` and `lead_temperature` columns are reserved for a future automated scoring algorithm.

---

---

## 15. Root Layout, Fonts & Global SEO (`app/layout.tsx`)

**Packages:** `next` (Metadata, Inter font), `sonner` (Toaster)

The root layout wraps every page in the application — both public and admin.

### What It Does

- Loads **Inter** from Google Fonts via `next/font/google` — subset `latin`, display `swap`, exposed as CSS variable `--font-inter`. Using `next/font` means the font is self-hosted by Next.js at build time, eliminating the Google Fonts network request and preventing layout shift.
- Sets global `<Metadata>` — default title template `%s | Code & Convert`, description, keywords, OpenGraph, Twitter card, robots directives.
- Injects **JSON-LD structured data** for `Organization` and `WebSite` schema types directly into `<head>` via `dangerouslySetInnerHTML`. This feeds Google's Knowledge Graph and enables rich search results.
- Renders a global `<Toaster>` from `sonner` positioned `top-center` with `richColors`. This is the single toast provider for the entire app — both the admin forms and the lead form use it.
- Sets `overflow-x-hidden` on both `<html>` and `<body>` to prevent horizontal scroll from animations.

### Why JSON-LD at the root level

The Organization and WebSite schemas apply to every page. Placing them in the root layout means they are present on every HTML response without duplication. Individual pages (blog posts, case studies) add their own Article schemas on top.

---

## 16. VoidBackground — Three.js Particle System (`components/VoidBackground.tsx`)

**Packages:** `three`, `react` (useEffect, useRef)

The most technically complex component in the project. A custom WebGL particle system that serves as the animated background for the public site.

### Architecture

- A `<canvas>` element is fixed to the viewport (`position: fixed, inset: 0, z-index: 0`)
- A `THREE.WebGLRenderer` renders to this canvas with `alpha: true` (transparent background)
- `N = 6000` particles on desktop, `3000` on mobile
- Each particle has attributes: `aIndex` (float), `aSize` (random 0.4–1.4), `aPhase` (random 0–1), `aTextPos` (vec3 — position in the text form)
- A custom `THREE.ShaderMaterial` with GLSL vertex and fragment shaders drives all animation on the GPU

### The 7 Particle Forms

The vertex shader defines 7 geometric forms. Particles interpolate between them based on scroll position:

| Form ID | Shape | Description |
|---|---|---|
| 0 | Sphere | Fibonacci sphere distribution |
| 1 | Helix | Triple helix |
| 2 | Grid | Sine-wave grid |
| 3 | Torus | Torus knot |
| 4 | Galaxy | 4-arm spiral galaxy |
| 5 | Vortex | Collapsing vortex |
| 6 | Text | "CODE & CONVERT" sampled from canvas pixel data |

### Text Form Generation

An off-screen `<canvas>` renders "CODE & CONVERT" in 900-weight Inter at 180px. The pixel data is sampled every 2px. White pixels become particle target positions. This runs once on mount and the positions are stored in the `aTextPos` buffer attribute.

### Scroll Reactivity

`LenisProvider` dispatches `app-scroll` custom events with `{ scroll: progress (0–1), scrollVel: velocity }`. `VoidBackground` listens to these events and uses `scroll` to interpolate between keyframes that define which form to show, camera Z position, particle colour, sparkle intensity, and brightness.

### Mouse Repulsion

The vertex shader receives `uMouse` (a vec3 in world space). Particles within `uMouseRadius` are pushed away from the mouse position with a cubic falloff. The mouse world position is calculated each frame by unprojecting the NDC mouse coordinates through the camera.

### Why Three.js directly (not React Three Fiber)

The particle system is a single, self-contained WebGL effect with no React state dependencies. Using Three.js directly avoids the overhead of React Three Fiber's reconciler and gives full control over the render loop and shader uniforms.

---

---

## 17. LenisProvider (`components/LenisProvider.tsx`)

**Packages:** `react` (useEffect), `next/dynamic`, `lenis`

Wraps the homepage content. Responsibilities:

1. Dynamically imports `VoidBackground` and `InteractiveCursor` with `{ ssr: false }` — these components use browser APIs (`window`, `canvas`, `requestAnimationFrame`) that cannot run on the server.
2. Initialises Lenis smooth scroll on mount with `lerp: 0.1` (smoothing factor), `wheelMultiplier: 1.0`, `smoothWheel: true`.
3. On every Lenis scroll event, dispatches a custom `app-scroll` event on `window` with `{ scroll: e.progress, scrollVel: e.velocity }`. This decouples the scroll system from the Three.js canvas — `VoidBackground` listens for this event independently.
4. Runs the Lenis RAF (request animation frame) loop.
5. Renders `<Loader>`, `<VoidBackground>`, `<InteractiveCursor>`, and the page children stacked with `relative z-10` on the children.

**Why dynamic imports for VoidBackground and InteractiveCursor:** Both components use `useEffect` and browser globals. If rendered on the server, Next.js would throw hydration errors. `dynamic(() => import(...), { ssr: false })` tells Next.js to skip server rendering and only mount these components in the browser.

**Why LenisProvider only wraps the homepage:** The smooth scroll and particle background are homepage-specific features. Other pages (blog, case studies, services) use `VoidBackground` and `InteractiveCursor` directly without Lenis, because those pages don't need scroll-driven particle animations.

---

## 18. Loader (`components/Loader.tsx`)

**Packages:** `motion/react` (motion, AnimatePresence), `react` (useState, useEffect), `lucide-react`

A full-screen overlay (`position: fixed, z-index: 9999, bg-[#050505]`) that shows the Code & Convert logo with a spinning animation. It fades out when `window` fires the `load` event (all resources loaded).

**Why it exists:** The Three.js canvas and Lenis initialise asynchronously. Without a loader, users would see a blank black screen or partially loaded content for a fraction of a second. The loader provides a polished entry experience.

**`inline` prop:** When `inline = true`, the loader renders permanently (no fade-out). Used as a fallback for Suspense boundaries.

---

## 19. InteractiveCursor (`components/InteractiveCursor.tsx`)

**Packages:** `react` (useEffect, useRef, useState)

A custom cursor that replaces the default OS cursor on desktop (`hidden sm:block`).

- Tracks mouse position with `mousemove` event
- Uses a `requestAnimationFrame` loop with lerp (`cursorX += (mouseX - cursorX) * 0.15`) for smooth lag
- Detects hoverable elements (`a`, `button`, `[role="button"]`, `input`, `textarea`) via `mouseover` event
- Expands from `w-8 h-8 border-white/20` to `w-12 h-12 border-[#FF1E1E]/80 bg-[#FF1E1E]/5` on hover
- Uses `transform: translate3d()` for GPU-accelerated positioning

**Why RAF instead of CSS transitions for position:** CSS transitions on `left`/`top` trigger layout recalculations. `transform: translate3d` is composited on the GPU. The RAF loop with lerp gives a natural "trailing" feel that CSS transitions cannot replicate.

---

## 20. Admin Sidebar (`components/layout/admin-sidebar.tsx`)

**Packages:** `next/link`, `next/navigation` (usePathname, useRouter), `lib/utils.ts` (cn), `lib/supabase/client.ts`, `motion/react`, `lucide-react`

Fixed-position sidebar (`w-64`, left side). Navigation items:

| Label | Route | Icon |
|---|---|---|
| Dashboard | `/admin` | LayoutDashboard |
| Content Management | `/admin/content-placement` | LayoutGrid |
| Blog Posts | `/admin/blogs` | FileText |
| Case Studies | `/admin/case-studies` | Briefcase |
| Media Library | `/admin/media` | Image |
| Settings | `/admin/settings` | Settings |

Active route is highlighted with `bg-[#FF1E1E] text-white`. Active state is determined by `pathname === item.href`.

**Logout:** Calls `supabase.auth.signOut()` on the browser client, then `router.push('/admin-login')`.

**Logo animation:** The C&C logo badge rotates 360° every 3 seconds using a Framer Motion `animate` with `repeat: Infinity` and `repeatDelay: 2.4`.

---

---

## 21. Navbar (`components/layout/Navbar.tsx`)

**Packages:** `motion/react`, `lucide-react`, `react` (useState, useEffect)

Fixed to the top of the viewport (`position: fixed, z-50`). Dark glass effect: `bg-[#050505]/80 backdrop-blur-[20px] border-b border-white/5`.

### Scroll Hide Behaviour

A `scroll` event listener tracks `window.scrollY`. On desktop (`window.innerWidth >= 768`), if the user scrolls down past 100px, `isHidden` is set to `true`. Framer Motion animates `translateY` to `-100` (slides off screen). Scrolling back up sets `isHidden = false` and the navbar slides back in. On mobile, the navbar is always visible.

### Mobile Sidebar

On mobile, a hamburger button (`Menu` icon) opens a slide-in sidebar from the left. The sidebar covers 82% of the viewport width (max 320px). It has:
- A backdrop overlay (`bg-black/70 backdrop-blur-sm`) that closes the sidebar on click
- The same nav links as desktop
- A full-width CTA button at the bottom

Both the overlay and sidebar use Framer Motion for enter/exit animations.

### Why hide on scroll (desktop only)

On desktop, the navbar takes up vertical space. Hiding it while reading gives more content area. On mobile, the navbar is small and users expect it to stay visible for easy navigation.

---

## 22. Footer (`components/layout/Footer.tsx`)

**Packages:** `lucide-react` (ArrowUpRight)

Static Server Component. No data fetching. Two layouts:
- **Desktop (`lg:flex`):** Three columns — social links left, nav links centre, legal links right
- **Mobile (`lg:hidden`):** Stacked rows of links

Bottom section: logo + copyright, contact email + phone + meeting CTA, "Powered by Code&Convert" badge.

**Why static:** The footer content never changes dynamically. Making it a Server Component means it is rendered once at build time (or on first request) and cached — no database queries, no JavaScript bundle cost.

---

## 23. Rich Text Editor (`components/ui/rich-text-editor.tsx`)

**Packages:** `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`, `lucide-react`, `./media-picker`

Used in the admin blog and case study create/edit forms.

### Toolbar Buttons

| Button | Action |
|---|---|
| Bold | `toggleBold()` |
| Italic | `toggleItalic()` |
| Heading 2 | `toggleHeading({ level: 2 })` |
| Bullet List | `toggleBulletList()` |
| Ordered List | `toggleOrderedList()` |
| Link | `window.prompt()` → `setLink({ href })` |
| Image | Opens `<MediaPicker>` modal |

### Image Insertion Flow

```
Admin clicks image button
  → <MediaPicker> modal opens
  → Admin browses media library (fetched from Supabase)
  → Admin clicks an image
  → MediaPicker calls onSelect(url)
  → editor.chain().focus().setImage({ src: url }).run()
  → Image inserted into editor at cursor position
```

### Output

`editor.getHTML()` returns an HTML string. This is stored in the `content` TEXT column in Postgres. On the public site, it is rendered via `dangerouslySetInnerHTML`. This is safe because only authenticated admins can write content.

---

## 24. Image Upload (`components/ui/image-upload.tsx`)

**Packages:** `react`, `lib/supabase/client.ts`, `lucide-react`, `./button`

Used in admin blog and case study forms for the `featured_image` field.

### Upload Flow

```
Admin selects file
  → validate: must be image, max 5MB
  → supabase.auth.getUser() — confirm session
  → generate filename: `${Date.now()}-${random}.${ext}`
  → supabase.storage.from('media-library').upload(filename, file)
  → supabase.storage.from('media-library').getPublicUrl(filename)
  → supabase.from('media').insert({ filename, original_name, mime_type, size, url, uploaded_by })
  → onChange(publicUrl) — passes URL up to parent form state
```

Shows a preview of the uploaded image. An X button clears the value.

---

---

## 25. Lib Layer

### `lib/utils.ts`

**Packages:** `clsx`, `tailwind-merge`

Two exported functions:

**`cn(...inputs)`** — Merges Tailwind classes, resolving conflicts. Example: `cn('px-4 px-6')` → `'px-6'`. Used everywhere a component accepts a `className` prop or builds conditional class strings.

**`slugify(text)`** — Converts a string to a URL-safe slug. Lowercases, trims, removes non-word characters, replaces spaces/underscores/hyphens with a single hyphen, strips leading/trailing hyphens. Used in admin blog and case study forms to auto-generate slugs from titles.

---

### `lib/errors.ts`

Custom error class hierarchy for consistent error handling across API routes:

| Class | Code | Status | Use Case |
|---|---|---|---|
| `AppError` | custom | 500 | Base class |
| `NotFoundError` | `NOT_FOUND` | 404 | Resource not found |
| `UnauthorizedError` | `UNAUTHORIZED` | 401 | Auth failure |
| `ValidationError` | `VALIDATION_ERROR` | 400 | Invalid input |

`handleError(error)` — Normalises any thrown value into an `AppError`. Used in API routes to ensure consistent JSON error responses.

---

### `lib/database.type.ts`

Auto-generated TypeScript types for the entire Supabase database. Provides:

- `Database` — the root type with all tables, views, functions, enums
- `Tables<T>` — shorthand for a table's Row type
- `TablesInsert<T>` — shorthand for a table's Insert type
- `TablesUpdate<T>` — shorthand for a table's Update type

Used to type all Supabase client calls: `createBrowserClient<Database>()`, `createServerClient<Database>()`. This gives full TypeScript autocomplete and type safety on all database queries.

---

### `types/case-study.ts` — Key Constants

```typescript
export const WEB_DEV_SERVICE = 'Web Design & Development'

export const SERVICES = [
  'Web Design & Development',
  'Social Media Strategy & Management',
  'Content Creation & Marketing',
  'Community Engagement & Management',
]
```

`WEB_DEV_SERVICE` is used in two places:
1. `app/api/case-studies/route.ts` — validates carousel eligibility
2. `app/(admin)/admin/content-placement/page.tsx` — filters carousel-eligible projects

Having it as a single exported constant prevents the string from being duplicated and mismatched.

---

### `hooks/use-debounce.ts`

Generic debounce hook. Takes a value and delay (default 500ms). Returns the debounced value. Used for search inputs to avoid querying/filtering on every keystroke.

```typescript
export function useDebounce<T>(value: T, delay: number = 500): T
```

---

---

## 26. Homepage Sections

### Hero (`components/layout/Hero.tsx`)

**Packages:** `motion/react`, `lucide-react`

Client Component. Full-viewport section with:
- Animated badge ("We Build, Market & Scale Digital Brands.")
- H1 headline with gradient text on "Profitable Actions"
- Subheadline paragraph
- CTA button linking to `#work`
- Animated scroll indicator (bouncing dot in a rounded rectangle)
- Two radial gradient blobs for depth
- Accepts `children` — the homepage passes `<Statistics />` as a child, rendering it below the headline

All text elements use `motion` `fadeInUp` and `scaleIn` variants with `whileInView` + `viewport: { once: true }` so they animate once when they enter the viewport.

---

### Statistics (`components/layout/statistics.tsx`)

**Packages:** `lib/supabase/server.ts`, `components/ui/animated-stats.tsx`, `components/ui/section.tsx`, `components/ui/CTA_Button.tsx`, `lib/database.type.ts`

Server Component. Calls `supabase.rpc('get_site_statistics')` and maps the result to four stat items:

| Stat | Source Column | Suffix |
|---|---|---|
| Projects Delivered | `projects_delivered` | `+` |
| Performance Scores | `avg_performance_score` | `+` |
| Average ROAS | `avg_roas` | `x` |
| Custom Built | `percent_custom_built` | `%` |

If a value is null (no published case studies with data), it shows `—`. Passes the array to `<AnimatedStats>` which handles the count-up animation on scroll.

---

### SelectedWork (`components/layout/SelectedWork.tsx`)

**Packages:** `motion/react`, `lucide-react`, `react`, `next/image`

Client Component. Receives `projects[]` from the homepage server component. Renders a responsive grid where the 1st and 4th cards span 2 columns (`md:col-span-2`) and the others span 1. Each card has:
- Mouse-tracking radial gradient glow (follows cursor within the card)
- `next/image` for the featured image
- Industry tag, client name, results excerpt, service tags
- Links to `/case-studies/[slug]`

---

### Services (`components/layout/Services.tsx`)

**Packages:** `motion/react`, `lucide-react`, `react`

Client Component. Static data — 6 service cards (Paid Acquisition, Technical SEO, Conversion Optimization, Email & SMS, Creative Studio, Data & Attribution). Each card has the same mouse-tracking glow effect as SelectedWork cards.

---

### Process (`components/layout/Process.tsx`)

**Packages:** `motion/react`

Client Component. Static data — 4 process steps (Audit & Strategy, Setup & Tracking, Launch & Test, Scale & Optimize). Step 4 is highlighted with a solid red circle. A horizontal gradient line connects steps on desktop.

---

### Testimonials (`components/layout/Testimonials.tsx`)

**Packages:** `motion/react`, `components/ui/testimonials-grid.tsx`

Client Component. Receives `testimonials[]` from the homepage server component. Shows client names as a horizontal list, then passes all testimonials to `<TestimonialsGrid>` for a masonry-style layout.

---

### CTA (`components/layout/CTA.tsx`)

**Packages:** `motion/react`, `lucide-react`

Client Component. Static content. Two CTA buttons: "Book 1:1 Let's chat." (links to `/contact-us`) and an email link. Three trust badges below: "Free Account Audit", "Data-Driven Strategy", "Transparent Reporting".

---

### Marquee (`components/layout/Marquee.tsx`)

A horizontally scrolling text strip. Typically shows the agency tagline or service names repeated. CSS animation-based infinite scroll.

---

### WebsiteCarousel (`components/layout/WebsiteCarousel.tsx`)

**Packages:** `motion/react` (motion, useMotionValue, useSpring, useTransform, animate), `react`, `next/image`

Client Component. An infinite draggable carousel of website screenshots.

- Auto-scrolls using `animate(x, [0, -totalWidth], { duration: 30, repeat: Infinity, ease: 'linear' })`
- Dragging pauses auto-scroll (`isDragging` state)
- `useTransform` with modulo wrapping creates a seamless infinite loop without visible resets
- Card width is responsive: `30vw` on mobile, `400px` on desktop
- Renders 3 copies of the items array to ensure the loop is always filled

---

---

## 27. Rendering Strategy & Caching

### Server Components (default)

Every page and layout is a React Server Component unless marked `'use client'`. Server Components:
- Run only on the server — never sent to the browser as JavaScript
- Can `await` database queries directly
- Have zero client-side bundle cost
- Cannot use `useState`, `useEffect`, browser APIs, or event handlers

Used for: all public page data fetching, admin dashboard, admin blog/case study list pages, all layouts.

---

### Client Components (`'use client'`)

Marked explicitly. Used when a component needs:
- React state (`useState`, `useReducer`)
- Side effects (`useEffect`)
- Browser APIs (`window`, `document`, `requestAnimationFrame`)
- Event handlers on interactive elements
- Third-party libraries that use browser APIs (Lenis, Three.js, Tiptap, Framer Motion)

Used for: Navbar, Hero, SelectedWork, Services, Process, Testimonials, CTA, WebsiteCarousel, VoidBackground, InteractiveCursor, LenisProvider, Loader, AdminSidebar, all admin edit/create pages, content-placement, media library, admin login, contact-us page, multistep-form, rich-text-editor, image-upload.

---

### Dynamic Imports (`next/dynamic`)

`VoidBackground` and `InteractiveCursor` are dynamically imported in `LenisProvider` with `{ ssr: false }`. This means:
- They are excluded from the server-rendered HTML
- They are loaded as a separate JavaScript chunk
- They only mount after the browser has loaded the page

This prevents hydration errors from browser-only APIs and improves initial page load by deferring heavy JavaScript (Three.js is ~600KB).

---

### Caching

| Route | Cache Strategy | Why |
|---|---|---|
| `/api/site-stats` | `revalidate = 60` (60 seconds) | Stats change infrequently; caching reduces DB load |
| Public pages | Default Next.js caching (per-request in dev, cached in prod) | Fresh data on each deploy |
| Sitemap | On-demand revalidation | Regenerated when content changes |
| Static pages (privacy, terms) | Build-time static | Never changes |

**Why 60-second cache on site-stats:** The `get_site_statistics()` function aggregates across all published case studies. Running it on every homepage request would be wasteful. 60 seconds is a reasonable freshness window for statistics that change only when an admin publishes a new case study.

---

### Image Optimisation

All images use `next/image` where possible. Next.js:
- Serves AVIF/WebP formats (configured in `next.config.ts`)
- Resizes images to the requested `sizes` prop
- Lazy loads by default
- Caches optimised images on Vercel's CDN

Supabase Storage images are served from `uadltocidtriezcntwxd.supabase.co` — whitelisted in `next.config.ts` so Next.js can proxy and optimise them.

---

---

## 28. SEO Architecture

### Metadata

Next.js `generateMetadata` is used on dynamic pages. Static pages export a `metadata` object.

| Page | Title | Description Source |
|---|---|---|
| Root layout | `Code & Convert - We Build, Market & Scale Digital Brands` | Static |
| Blog listing | `Blog \| Code & Convert` | Static |
| Blog post | `seo_title \|\| title \| Code & Convert` | Database |
| Case studies listing | `Case Studies \| Code & Convert` | Static |
| Case study | `seo_title \|\| title \| Code & Convert` | Database |
| Services | `Web Design & Marketing Services \| Code & Convert` | Static |

The title template `%s | Code & Convert` in the root layout means child pages only need to set `title: 'Blog'` and the full title becomes `Blog | Code & Convert`.

---

### JSON-LD Structured Data

| Page | Schema Type | Key Fields |
|---|---|---|
| Root layout | `Organization`, `WebSite` | name, url, logo, serviceType, SearchAction |
| Blog post | `Article` | headline, description, image, datePublished, dateModified, author, publisher |
| Case study | `Article` | headline, description, image, datePublished, about (client name) |

All JSON-LD is injected via `<script type="application/ld+json" dangerouslySetInnerHTML>` in the page's `<head>`. This is the recommended approach for Next.js App Router.

---

### Sitemap (`app/sitemap.ts`)

Dynamically generated. Includes:
- Static routes: `/`, `/services`, `/blog`, `/case-studies`, `/contact-us`, `/privacy`, `/terms`
- Dynamic blog routes: one entry per published blog with `lastModified` from `updated_at`
- Dynamic case study routes: one entry per published case study with `lastModified` from `updated_at`

Priority values: homepage `1.0`, services `0.9`, blog/case-studies listing `0.8`, individual posts `0.7`, contact `0.6`, legal `0.3`.

---

### Robots (`public/robots.txt`)

Controls search engine crawling. Admin routes (`/admin/*`) should be disallowed to prevent indexing of the CMS.

---

### OpenGraph & Twitter Cards

Set in root layout metadata and overridden per page via `generateMetadata`. Blog posts and case studies include `openGraph.images` from their `featured_image` field, enabling rich link previews when shared on social media.

---

---

## 29. Deployment Pipeline

### Platform: Vercel

The project is deployed to Vercel, the company behind Next.js. `vercel.json` configures the deployment.

### How It Deploys

```
1. Developer pushes code to Git (GitHub/GitLab/Bitbucket)
2. Vercel webhook detects the push
3. Vercel clones the repository
4. npm install — installs all dependencies from package.json
5. npm run build — runs next build:
   a. TypeScript compilation (errors ignored per next.config.ts)
   b. ESLint checks
   c. Static page generation (privacy, terms, sitemap)
   d. Server Component pre-rendering
   e. Client bundle compilation and code splitting
   f. Image optimisation setup
6. Vercel deploys the build output:
   - Static assets → Vercel CDN (global edge network)
   - API routes → Serverless functions (Node.js runtime, region iad1)
   - Middleware → Edge functions (V8 isolates, runs globally at edge)
   - Server Components → Serverless functions (on-demand rendering)
7. Environment variables from Vercel dashboard are injected
8. New deployment goes live (zero-downtime swap)
```

---

### What Runs Where

| Code | Runtime | Location |
|---|---|---|
| `middleware.ts` | Edge (V8 isolate) | Global edge network — runs before request reaches server |
| API routes (`app/api/*`) | Serverless (Node.js) | `iad1` region (US East) |
| Server Components | Serverless (Node.js) | `iad1` region |
| Client Components | Browser | User's device |
| Static assets (CSS, JS, images) | CDN | Global edge cache |

---

### Why `iad1` Region

Supabase's default AWS region is `us-east-1` (Northern Virginia). Vercel's `iad1` region is also in Northern Virginia. Co-locating the serverless functions with the database minimises the network latency for every Supabase query made from server-side code. A server component fetching from Supabase in `iad1` has ~1ms database latency vs ~150ms if the function ran in Europe.

---

### Preview Deployments

Every pull request gets an automatic preview deployment on a unique URL (e.g. `code-convert-git-feature-branch.vercel.app`). This allows testing changes before merging to the main branch.

---

### Environment Variables on Vercel

Set in the Vercel project dashboard under Settings → Environment Variables. Separate values can be set for Production, Preview, and Development environments. The `NEXT_PUBLIC_*` variables are embedded in the client bundle at build time — they must be set before building.

---

### Database Setup (One-Time)

Before the first deployment, the Supabase database must be initialised by running the SQL files in order in the Supabase SQL Editor:

```
1. supabase/database-schema.sql       — core tables, RLS, triggers, storage buckets
2. supabase/lead-submissions.sql      — lead_submissions table
3. supabase/add-carousel-stats-columns.sql  — carousel/stats columns + get_site_statistics()
4. supabase/fix-storage-policies.sql  — storage RLS fixes
```

Then create an admin user:
1. Supabase Dashboard → Authentication → Users → Add user (email + password)
2. Table Editor → `profiles` → set `role = 'admin'` for that user's row

---

---

## 30. Full Data Flow Summary

### Public User — Reading Content

```
Browser → Vercel Edge (CDN or serverless)
  → Next.js Server Component renders
  → lib/supabase/server.ts creates server client (reads session cookie)
  → Supabase Postgres query (RLS: anon can only read published=true rows)
  → Data returned to Server Component
  → HTML rendered on server with data embedded
  → HTML + minimal JS sent to browser
  → Client Components hydrate (Navbar, animations, etc.)
  → VoidBackground Three.js canvas mounts (dynamic import, browser only)
  → Lenis smooth scroll initialises
```

---

### Public User — Submitting a Lead

```
Browser (contact-us page)
  → User clicks "Get Started" → OnboardingForm lightbox opens
  → User completes 17 steps
  → fetch POST /api/leads
  → Vercel serverless function (iad1)
  → lib/supabase/server.ts creates server client
  → Extracts IP, user_agent, referrer from request headers
  → Extracts UTM params from request body
  → supabase.from('lead_submissions').insert(payload)
  → Supabase Postgres (RLS: anon INSERT allowed)
  → { success: true } 201 response
  → sonner toast shown to user
```

---

### Admin User — Logging In

```
Browser (/admin-login)
  → supabase.auth.signInWithPassword({ email, password })
  → Supabase Auth validates credentials
  → JWT session stored in HTTP-only cookies
  → Query profiles table: role === 'admin'?
  → If yes: router.push('/admin')
  → middleware.ts runs on /admin request
  → supabase.auth.getUser() validates session from cookies
  → Admin layout renders: requireAuth() confirms role
  → Dashboard page renders with content counts
```

---

### Admin User — Creating a Blog Post

```
Browser (/admin/blogs/new)
  → Admin fills form (title auto-generates slug via slugify())
  → Admin uploads featured image:
      → supabase.storage.from('media-library').upload()
      → supabase.from('media').insert()
      → publicUrl returned to form state
  → Admin writes content in Tiptap editor (HTML output)
  → Admin clicks "Publish Post"
  → fetch POST /api/blogs { title, slug, content, featured_image, published: true, ... }
  → Vercel serverless function
  → requireAuth() validates session
  → supabase.from('blogs').insert(payload)
  → Supabase Postgres (RLS: admin INSERT allowed)
  → { success: true }
  → router.push('/admin/blogs')
  → Blog is now live at /blog/[slug]
```

---

### Admin User — Reordering Gallery

```
Browser (/admin/content-placement)
  → Page loads: supabase.from('case_studies').select(...).order('gallery_order')
  → Admin clicks ↑ on a row
  → swapGallery(idxA, idxB, list) called
  → Optimistic update: local state updated immediately (no loading flash)
  → Promise.all([
      supabase.from('case_studies').update({ gallery_order: b.gallery_order }).eq('id', a.id),
      supabase.from('case_studies').update({ gallery_order: a.gallery_order }).eq('id', b.id)
    ])
  → If error: fetchRows() reverts to database state
  → Homepage /services gallery now reflects new order on next request
```

---

### Statistics Flow (End to End)

```
Admin publishes case study with roas=4.2, performance_score=95, is_custom_built=true
  → case_studies row: published=true, roas=4.2, performance_score=95, is_custom_built=true

Homepage request (within 60s cache window):
  → /api/site-stats returns cached response

Homepage request (after 60s):
  → /api/site-stats cache expired
  → supabase.rpc('get_site_statistics')
  → Postgres: SELECT count(*), avg(performance_score), avg(roas), percent custom_built
              FROM case_studies WHERE published=true
  → Returns updated aggregates
  → Response cached for next 60s
  → <Statistics> component shows new numbers
  → <AnimatedStats> counts up to new values on scroll
```

---

---

## 31. Per-File Package Reference

Every source file and the packages it imports.

### `app/layout.tsx`
`next` (Metadata, Inter font), `sonner` (Toaster), `./globals.css`

### `app/sitemap.ts`
`next` (MetadataRoute), `lib/supabase/server.ts`

### `app/(marketing)/layout.tsx`
`components/layout/Navbar.tsx`, `components/layout/Footer.tsx`

### `app/(marketing)/page.tsx`
`lib/supabase/server.ts`, `components/LenisProvider.tsx`, `components/layout/Hero.tsx`, `components/layout/Marquee.tsx`, `components/layout/SelectedWork.tsx`, `components/layout/Services.tsx`, `components/layout/Process.tsx`, `components/layout/Testimonials.tsx`, `components/layout/CTA.tsx`, `components/layout/statistics.tsx`

### `app/(marketing)/blog/page.tsx`
`lib/supabase/server.ts`, `next` (Metadata), `components/ui/page-container.tsx`, `components/ui/page-header.tsx`, `components/VoidBackground.tsx`, `components/InteractiveCursor.tsx`, `./BlogFilter.tsx`

### `app/(marketing)/blog/BlogFilter.tsx`
`react`, `next/image` (likely), client-side filter logic

### `app/(marketing)/blog/[slug]/page.tsx`
`lib/supabase/server.ts`, `next/navigation` (notFound), `next` (Metadata), `components/ui/page-container.tsx`, `components/ui/article-header.tsx`, `components/ui/featured-image.tsx`, `components/InteractiveCursor.tsx`

### `app/(marketing)/case-studies/page.tsx`
`lib/supabase/server.ts`, `next` (Metadata), `components/ui/page-container.tsx`, `components/VoidBackground.tsx`, `components/InteractiveCursor.tsx`, `components/layout/CaseStudiesFilter.tsx`, `components/layout/CaseStudiesHero.tsx`

### `app/(marketing)/case-studies/[slug]/page.tsx`
`lib/supabase/server.ts`, `next/navigation` (notFound), `next` (Metadata), `components/ui/page-container.tsx`, `components/ui/article-header.tsx`, `components/ui/featured-image.tsx`, `components/ui/content-section.tsx`, `components/ui/testimonial-card.tsx`, `components/ui/image-gallery.tsx`, `components/InteractiveCursor.tsx`

### `app/(marketing)/contact-us/page.tsx`
`react`, `components/ui/multistep-form.tsx`, `components/VoidBackground.tsx`, `components/InteractiveCursor.tsx`, `react-icons/fa`

### `app/(marketing)/services/page.tsx`
`next` (Metadata), `lib/supabase/server.ts`, `components/layout/selected-projects.tsx`, `components/layout/statistics.tsx`, `components/layout/gallery-grid.tsx`, `components/layout/Process.tsx`, `components/layout/faq.tsx`, `components/layout/recent-launches.tsx`, `components/layout/CTA.tsx`, `components/layout/HeroBackgroundPaths.tsx`, `components/layout/tech-stack.tsx`, `components/InteractiveCursor.tsx`

### `app/(admin)/layout.tsx`
`lib/supabase/auth.ts` (requireAuth), `components/layout/admin-sidebar.tsx`

### `app/(admin)/admin/layout.tsx`
`lib/supabase/auth.ts` (requireAuth), `components/layout/admin-sidebar.tsx`

### `app/(admin)/admin/page.tsx`
`lib/supabase/server.ts`

### `app/(admin)/admin/blogs/page.tsx`
`next/link`, `lib/supabase/server.ts`, `components/ui/button.tsx`, `lucide-react`

### `app/(admin)/admin/blogs/new/page.tsx`
`react`, `next/navigation`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/rich-text-editor.tsx`, `components/ui/image-upload.tsx`, `lib/utils.ts`

### `app/(admin)/admin/blogs/[id]/page.tsx`
`react`, `next/navigation`, `lib/supabase/client.ts`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/rich-text-editor.tsx`, `components/ui/image-upload.tsx`, `lib/utils.ts`

### `app/(admin)/admin/case-studies/page.tsx`
`next/link`, `lib/supabase/server.ts`, `components/ui/button.tsx`, `lucide-react`

### `app/(admin)/admin/case-studies/new/page.tsx`
`react`, `next/navigation`, `lib/supabase/client.ts`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/rich-text-editor.tsx`, `components/ui/image-upload.tsx`, `lib/utils.ts`, `types/case-study.ts`

### `app/(admin)/admin/case-studies/[id]/page.tsx`
Same as new page + `react` (use hook for params)

### `app/(admin)/admin/content-placement/page.tsx`
`react`, `lib/supabase/client.ts`, `next/image`, `lucide-react`, `types/case-study.ts` (WEB_DEV_SERVICE)

### `app/(admin)/admin/media/page.tsx`
`react`, `lib/supabase/client.ts`, `components/ui/button.tsx`, `lucide-react`, `types/media.ts`, `components/ui/upload-test.tsx`

### `app/(admin)/admin/settings/page.tsx`
No external packages — static display only

### `app/admin-login/page.tsx`
`react`, `next/navigation`, `lib/supabase/client.ts`, `components/ui/button.tsx`, `components/ui/input.tsx`

### `app/api/auth/callback/route.ts`
`@supabase/ssr`, `next/server`, `next/headers`, `lib/database.type.ts`

### `app/api/blog/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/supabase/auth.ts`, `lib/database.type.ts`

### `app/api/blogs/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/supabase/auth.ts`, `types/api.ts`, `next/dist/client/components/redirect-error`

### `app/api/blogs/[id]/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/supabase/auth.ts`, `types/api.ts`

### `app/api/case-studies/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/supabase/auth.ts`, `types/case-study.ts`

### `app/api/case-studies/[id]/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/supabase/auth.ts`, `types/case-study.ts`

### `app/api/contact/route.ts`
`next/server`, `lib/supabase/server.ts`

### `app/api/leads/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/database.type.ts`

### `app/api/site-stats/route.ts`
`next/server`, `lib/supabase/server.ts`, `lib/database.type.ts`

### `middleware.ts`
`@supabase/ssr`, `next/server`, `lib/database.type.ts`

### `lib/supabase/client.ts`
`@supabase/ssr`, `lib/database.type.ts`

### `lib/supabase/server.ts`
`@supabase/ssr`, `next/headers`, `lib/database.type.ts`

### `lib/supabase/auth.ts`
`./server`, `next/navigation`, `types/user.ts`

### `lib/utils.ts`
`clsx`, `tailwind-merge`

### `lib/errors.ts`
No external packages

### `lib/database.type.ts`
No external packages — generated types only

### `components/VoidBackground.tsx`
`three`, `react`

### `components/LenisProvider.tsx`
`react`, `next/dynamic`, `lenis`, `components/Loader.tsx`, `components/VoidBackground.tsx`, `components/InteractiveCursor.tsx`

### `components/Loader.tsx`
`motion/react`, `react`, `lucide-react`

### `components/InteractiveCursor.tsx`
`react`

### `components/layout/Navbar.tsx`
`motion/react`, `lucide-react`, `react`

### `components/layout/Footer.tsx`
`lucide-react`

### `components/layout/admin-sidebar.tsx`
`next/link`, `next/navigation`, `lib/utils.ts`, `lib/supabase/client.ts`, `motion/react`, `lucide-react`

### `components/layout/Hero.tsx`
`motion/react`, `lucide-react`

### `components/layout/SelectedWork.tsx`
`motion/react`, `lucide-react`, `react`, `next/image`

### `components/layout/Services.tsx`
`motion/react`, `lucide-react`, `react`

### `components/layout/Process.tsx`
`motion/react`

### `components/layout/Testimonials.tsx`
`motion/react`, `components/ui/testimonials-grid.tsx`

### `components/layout/CTA.tsx`
`motion/react`, `lucide-react`

### `components/layout/statistics.tsx`
`lib/supabase/server.ts`, `lib/database.type.ts`, `components/ui/animated-stats.tsx`, `components/ui/section.tsx`, `components/ui/CTA_Button.tsx`

### `components/layout/WebsiteCarousel.tsx`
`motion/react`, `react`, `next/image`

### `components/ui/multistep-form.tsx`
`react`, `framer-motion`, `lucide-react`, `sonner`, `lib/utils.ts`, `components/ui/shadcn-button.tsx`, `components/ui/card.tsx`, `components/ui/shadcn-input.tsx`, `components/ui/label.tsx`, `components/ui/radio-group.tsx`, `components/ui/shadcn-textarea.tsx`, `components/ui/select.tsx`, `components/ui/onboarding-header.tsx`

### `components/ui/rich-text-editor.tsx`
`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`, `lucide-react`, `react`, `./media-picker`

### `components/ui/image-upload.tsx`
`react`, `lib/supabase/client.ts`, `lucide-react`, `./button`

### `hooks/use-debounce.ts`
`react`

### `types/api.ts`
`lib/database.type.ts`

### `types/blog.ts`
No external packages

### `types/case-study.ts`
No external packages

### `types/media.ts`
No external packages

### `types/user.ts`
No external packages

### `types/contact.ts`
No external packages

---

## 32. Design System

**Primary colour:** `#FF1E1E` (red) — used for CTAs, active states, accents, gradient text, particle colour

**Background:** `#050505` (near-black) — used on all pages and admin

**Text:** White (`#FFFFFF`) for headings, `text-neutral-400` / `text-neutral-500` for body and secondary text

**Font:** Inter (Google Fonts, self-hosted via `next/font`) — variable `--font-inter`

**Border style:** `border-white/5` to `border-white/10` — subtle white borders at low opacity

**Glass effect:** `bg-[#050505]/80 backdrop-blur-[20px]` — used on Navbar, cards, admin sidebar

**Gradient text:** `bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent` — used on key headline words across all sections

**Spacing:** Tailwind's default scale. Sections use `py-12 sm:py-16 md:py-24 lg:py-32` for responsive vertical rhythm.

**Border radius:** `rounded-2xl` (16px) for cards, `rounded-full` for badges and pills, `rounded-lg` for inputs and images

**Animation timing:** `duration-300` for hover transitions, `duration-400` for card transforms, `duration-0.8` for scroll-triggered reveals

---
