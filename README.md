# Code & Convert

Marketing agency website with a headless admin CMS. Built with Next.js, Supabase, and Tailwind CSS.

## Tech Stack

- **Framework** — Next.js 16 App Router + TypeScript
- **Backend** — Supabase (Postgres, Auth, Storage, RLS)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion + Lenis
- **3D/WebGL** — Three.js + @paper-design/shaders-react
- **Editor** — Tiptap (rich text)
- **UI Primitives** — Radix UI
- **Validation** — Zod
- **Notifications** — Sonner
- **Deployment** — Vercel

## Project Structure

```
app/
  (marketing)/        # Public site
    page.tsx          # Landing page
    services/         # Services page
    blog/             # Blog listing + [slug]
    case-studies/     # Case study listing + [slug]
    contact-us/       # Contact form
    privacy/          # Privacy policy
    terms/            # Terms of service
  (admin)/            # Admin panel (/admin/*)
  admin-login/        # Login page (/admin-login)
  api/
    auth/callback/    # Supabase auth callback
    blog/             # Blog API
    blogs/[id]/       # Blog by ID
    case-studies/     # Case studies API
    case-studies/[id]/# Case study by ID
    contact/          # Contact form handler
    leads/            # Lead submission handler
    site-stats/       # Site statistics (cached 60s)
  sitemap.ts          # Dynamic sitemap
components/
  ui/                 # Reusable UI components
  layout/             # Navbar, Footer, AdminSidebar, page sections
  InteractiveCursor.tsx
  LenisProvider.tsx
  Loader.tsx
  VoidBackground.tsx
features/
  blog/               # Blog actions, queries, types
  case-studies/       # Case study actions, queries, types
  media/              # Media actions, queries, types
  auth/               # Auth actions, types
hooks/
  use-debounce.ts
  use-focus-mode.ts
lib/
  supabase/           # client.ts, server.ts, auth.ts
  database.type.ts
  errors.ts
  utils.ts
types/                # api.ts, blog.ts, case-study.ts, media.ts, contact.ts, user.ts, web-design.ts
supabase/             # SQL migrations
middleware.ts         # Admin route protection
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
HUBSPOT_ACCESS_TOKEN=your_hubspot_private_app_token
HUBSPOT_API_BASE_URL=https://api.hubapi.com
```

### 3. Set up the database

Run the SQL files in Supabase SQL Editor in this order:

```
supabase/database-schema.sql
supabase/lead-submissions.sql
supabase/add-carousel-stats-columns.sql
supabase/fix-storage-policies.sql
```

### 4. Create an admin user

1. Go to Supabase Dashboard → Authentication → Users → Add user
2. Go to Table Editor → profiles → set `role = 'admin'` for that user

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Admin Panel

Protected by middleware — requires a Supabase session with `role = 'admin'`. Login at `/admin-login`.

| Route | Description |
|---|---|
| `/admin` | Dashboard |
| `/admin/blogs` | Blog management |
| `/admin/blogs/new` | Create blog post |
| `/admin/blogs/[id]` | Edit blog post |
| `/admin/case-studies` | Case study management |
| `/admin/case-studies/new` | Create case study |
| `/admin/case-studies/[id]` | Edit case study |
| `/admin/content-placement` | Gallery order, carousel, site statistics |
| `/admin/media` | Media library |
| `/admin/settings` | Settings |

## Database Schema

Core tables: `profiles`, `blogs`, `case_studies`, `media`, `lead_submissions`

The `case_studies` table includes extended columns for homepage content management:

- `show_in_carousel` — whether the project appears in the website carousel
- `carousel_image` — optional separate carousel thumbnail
- `gallery_order` / `carousel_order` — display ordering
- `roas`, `performance_score`, `is_custom_built` — feed the site statistics widget

The `lead_submissions` table captures multi-step form data with UTM tracking, lead scoring, and HubSpot sync fields.

A `get_site_statistics()` Postgres function aggregates published case study data for the homepage stats section.

## Storage Buckets

| Bucket | Access |
|---|---|
| `blog-images` | Public read, authenticated write |
| `case-study-images` | Public read, authenticated write |
| `media-library` | Public read, authenticated manage |

## Performance & SEO

- All public pages are Server Components — no client-side data waterfalls
- `VoidBackground` (Three.js) and `InteractiveCursor` are loaded via `next/dynamic` with `{ ssr: false }` to keep them off the critical path
- Inter font loaded via `next/font/google` with `display: 'swap'`
- AVIF/WebP image formats via `next.config.ts`
- JSON-LD structured data injected server-side on every page, blog posts, and case studies
- Dynamic sitemap at `app/sitemap.ts` queries Supabase for all published URLs
- `public/robots.txt` includes `Sitemap:` directive and explicit `Allow` rules for major crawlers and AI bots

## Documentation

All architecture and design documentation is in `/docs`:

- `ARCHITECTURE.md` — Folder structure, DB schema, patterns
- `DESIGN_SPECIFICATION.md` — Design system, colours, typography
- `USER_FLOW_DIAGRAMS.md` — Public and admin user flows
- `WEB_DESIGN_OVERVIEW.md` — Section-by-section visual overview
- `AUDIT.md` — Audit log of completed work
