# Project History

## Foundation (Phase 1 & 2)

Built the admin CMS foundation with Supabase authentication, role-based access (admin-only at login, simple auth check thereafter), and a full admin panel at `/admin` covering blogs, case studies, media, and settings.

Established the folder structure: `app/(marketing)` and `app/(admin)` route groups, `components/` at root level organised into `ui/`, `layout/`, `sections/`, `effects/`, `blog/`, `case-studies/`, `actions/`, `hooks/`, and `types/`. Error boundaries and loading states added to all routes.

Database: Supabase direct (no ORM) with tables for `profiles`, `blogs`, `case_studies`, `media`, and `lead_submissions`. RLS policies, storage buckets, and triggers all configured.

## Admin Panel (Phase 3)

Added full CRUD for blogs and case studies with a Tiptap rich text editor, inline image insertion, and a media picker modal. Featured image uploads handled by a dedicated `ImageUpload` component. Media library page supports upload, search, delete, and URL copy.

## Public Pages (Phase 4)

Blog listing/detail, case study listing/detail, service pages (`/web-design`, `/marketing`), and a contact form using Resend for email delivery (no database storage).

## Refactors & Fixes

- **Folder restructure** — components moved from `app/components/` to root `components/`, admin routes renamed to plural (`/blogs`, `/case-studies`), create routes changed to `/new`, edit routes to `/[id]`.
- **Auth simplification** — removed `requireAdmin()` everywhere; role checked once at login, all subsequent checks use `requireAuth()`. Reduced per-request DB queries from 5–7 to 1–2.
- **TypeScript fixes** — removed `as any` casting across all API routes; added `BlogInsertPayload`, `BlogUpdatePayload`, `CaseStudyInsertPayload`, `CaseStudyUpdatePayload` types in `types/api.ts`; standardised error handling with `error instanceof Error`.
- **Media upload fix** — corrected Supabase storage bucket policies (`supabase/fix-storage-policies.sql`); added error handling, file validation (images only, max 5 MB), and loading states to upload components.
- **Reusable components** — extracted 10 shared UI components (`PageContainer`, `PageHeader`, `ArticleHeader`, `ContentGrid`, `ContentCard`, `FeaturedImage`, `ContentSection`, `TestimonialCard`, `ImageGallery`, `EmptyState`) reducing per-page code by ~30–48%.

## Performance & SEO Optimisation

### Critical Rendering Path

Removed the `isLoaded` content gate from `LenisProvider` that was hiding all page content until `window.load` fired. This was the single largest LCP bottleneck on the site — the entire hero, navbar, and above-fold content was invisible to both users and crawlers until Three.js and all assets had loaded.

`VoidBackground` (Three.js WebGL, ~600 KB) and `InteractiveCursor` are now loaded via `next/dynamic` with `{ ssr: false }`. Lenis is dynamically imported inside `useEffect`. The Three.js bundle is fully off the critical path.

### Server-Side Data Fetching

Converted all public marketing pages from client-side `useEffect` fetches to Server Components. Data is fetched before the page renders — no empty HTML, no loading spinners, no client waterfalls.

- `app/(marketing)/page.tsx` — now a Server Component; fetches case studies and testimonials in a single `Promise.all`
- `components/layout/SelectedWork.tsx` — removed internal `useEffect` fetch; now accepts `projects` as props
- `components/layout/Testimonials.tsx` — removed internal `useEffect` fetch; now accepts `testimonials` as props
- `app/(marketing)/blog/page.tsx` — converted to Server Component; extracted `BlogFilter.tsx` as a thin `'use client'` shell for search and pagination only
- `app/(marketing)/case-studies/page.tsx` — same pattern; extracted `CaseStudiesFilter.tsx`

### Font Optimisation

Replaced the bare `"Inter"` CSS string with `next/font/google` (`display: 'swap'`, `variable: '--font-inter'`). Eliminates FOIT and removes the runtime Google Fonts network request. The CSS variable is wired into Tailwind's `--font-sans` token in `globals.css`.

### Image & Build Optimisation

- `next.config.ts` — added `compress: true`, `poweredByHeader: false`, and `formats: ['image/avif', 'image/webp']`
- `SelectedWork.tsx` — added `sizes` attribute to project card images

### Structured Data / AI SEO

JSON-LD schema injected server-side on every relevant page:

- `app/layout.tsx` — `Organization` + `WebSite` schema (sitewide)
- `app/(marketing)/blog/[slug]/page.tsx` — `Article` schema + OpenGraph image
- `app/(marketing)/case-studies/[slug]/page.tsx` — `Article` schema with `about` (client entity) + OpenGraph image

### Sitemap & robots.txt

- `app/sitemap.ts` — converted to async Server Function; queries Supabase at request time to include all published blog and case study URLs with accurate `lastModified` dates; removed dead `/web-design` and `/marketing` routes
- `public/robots.txt` — added `Sitemap:` directive; added `PerplexityBot` and `YouBot` to AI crawler allow-list
