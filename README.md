# Code & Convert

Marketing agency website with a headless admin CMS. Built with Next.js 15, Supabase, and Tailwind CSS.

## Tech Stack

- **Framework** — Next.js 15 App Router + TypeScript
- **Backend** — Supabase (Postgres, Auth, Storage, RLS)
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion + Lenis
- **Editor** — Tiptap (rich text)
- **Email** — Resend
- **Deployment** — Vercel

## Project Structure

```
app/
  (marketing)/        # Public site
  (admin)/            # Admin panel (/admin/*)
  api/                # API routes
components/
  ui/                 # Reusable UI components
  layout/             # Navbar, Footer, AdminSidebar
  sections/           # Landing page sections
  effects/            # Cursor, background, loader
features/
  blog/               # Blog actions, queries, types
  case-studies/       # Case study actions, queries, types
  media/              # Media actions, queries, types
  auth/               # Auth actions, types
lib/
  supabase/           # client.ts, server.ts, auth.ts
  errors.ts
  utils.ts
types/                # database.ts, api.ts
supabase/             # SQL migrations
middleware.ts         # Admin route protection
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@domain.com
```

### 3. Set up the database

Run the SQL files in Supabase SQL Editor in this order:

```
supabase/database-schema.sql
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

Protected by middleware — requires a Supabase session with `role = 'admin'` set at login.

| Route | Description |
|---|---|
| `/admin` | Dashboard |
| `/admin/blogs` | Blog management |
| `/admin/blogs/new` | Create blog post |
| `/admin/blogs/[id]` | Edit blog post |
| `/admin/case-studies` | Case study management |
| `/admin/case-studies/new` | Create case study |
| `/admin/case-studies/[id]` | Edit case study |
| `/admin/media` | Media library |
| `/admin/settings` | Settings |

## Documentation

All architecture and design documentation is in `/docs`:

- `ARCHITECTURE.md` — Folder structure, DB schema, patterns
- `DESIGN_SPECIFICATION.md` — Design system, colours, typography
- `USER_FLOW_DIAGRAMS.md` — Public and admin user flows
- `WEB_DESIGN_OVERVIEW.md` — Section-by-section visual overview
- `HISTORY.md` — Summary of all completed work
