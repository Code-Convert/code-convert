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
