# Code & Convert — Design System & UI Specification

---

# 1. Project Overview

## Project Name

Code & Convert

## Website Type

Marketing agency website with admin CMS panel.

## Core Goals

* Generate leads
* Showcase services
* Display portfolio/case studies
* Publish SEO content
* Present premium modern branding
* Support content management via admin panel

## Primary Users

* Potential clients
* Existing clients
* Internal admin/content team

---

# 2. Design Philosophy

## Overall Style

* **Dark Premium**: Sophisticated dark theme with high contrast
* **Modern Minimal**: Clean, uncluttered interface
* **Cinematic**: Smooth animations and premium feel
* **High Performance**: Fast-loading with optimised interactions

## Design Principles

* Mobile-first responsive design
* Accessibility-focused with WCAG compliance
* Fast-loading performance
* Clean typography with improved contrast
* Minimal UI clutter
* Strong visual hierarchy
* Consistent spacing system
* Motion with restraint (smooth, purposeful animations)

## User Experience Goals

* **Premium feeling**: High-end agency aesthetic
* **Easy navigation**: Intuitive multi-page structure
* **Fast information discovery**: Clear content hierarchy
* **Strong conversion focus**: Strategic CTA placement
* **Excellent readability**: Enhanced text contrast for better visibility

---

# 3. Colour System

## Primary Background
* **Main**: #050505 (Current dark background)
* **Secondary**: #0d0d0d (Slightly lighter for cards/sections)

## Secondary Background
* **Card Background**: rgba(5,5,5,0.4) with backdrop blur
* **Elevated Surface**: rgba(255,255,255,0.02)

## Accent Colour
* **Primary Red**: #FF1E1E (Current brand red)
* **Red Hover**: #FF5555 (Lighter red for interactions)
* **Red Gradient**: linear-gradient(135deg,#FF1E1E 0%,#FF5555 50%,#FF1E1E 100%)

## Primary Text 
* **High Contrast**: #FFFFFF (Pure white for headings)
* **Body Text**: #F5F5F5 (Off-white for better readability)

## Secondary Text
* **Medium Contrast**: #D4D4D8 (neutral-300 - improved from neutral-500)
* **Low Contrast**: #A1A1AA (neutral-400 for labels)

## Border Colour
* **Subtle**: rgba(255,255,255,0.05)
* **Accent Border**: rgba(255,30,30,0.15)
* **Focus Border**: rgba(255,30,30,0.3)

## Status Colours
* **Success**: #10B981 (Green)
* **Warning**: #F59E0B (Amber)
* **Error**: #EF4444 (Red)
* **Info**: #3B82F6 (Blue)

---

# 4. Typography System

## Primary Font
**Inter** — Modern, highly legible sans-serif (UI text)

## Monospace Font
**Commit Mono** — Code blocks, numbers, tabular data

## Heading Style
* Bold weights (600–700)
* Letter spacing: -0.02em (tighter, feels cohesive)
* High contrast colors
* Line height: 1.05–1.3 depending on level

## Paragraph Style
* Regular weight (400)
* Line height: 1.6 minimum — prevents wall-of-text effect
* Body text: never below 16px on mobile (prevents iOS zoom)
* Optimal reading width: 65ch max

## Font Weights
* **400** (Regular) — Body text
* **500** (Medium) — Emphasis, buttons
* **600** (Semi-bold) — Subheadings, cards
* **700** (Bold) — Main headings, hero text

## Fluid Type Scale (CSS custom properties via clamp())

| Token | Mobile | Desktop | Line Height |
|-------|--------|---------|-------------|
| `--text-display` | 32px | 72px | 1.05 |
| `--text-h1` | 28px | 48px | 1.15 |
| `--text-h2` | 22px | 32px | 1.15 |
| `--text-h3` | 18px | 24px | 1.3 |
| `--text-body` | 16px | 18px | 1.6 |
| `--text-small` | 14px | 14px | 1.45 |
| `--text-code` | 14px | 16px | 1.6 |

## Rules
* Body text minimum: **16px** — non-negotiable on mobile
* Headings: letter-spacing `-0.02em`, body: `normal`
* Code/numbers: `font-variant-numeric: tabular-nums`
* Max-width on text blocks: `65ch`

---

# 5. Spacing System

## Container Widths

| Breakpoint | Width |
|------------|-------|
| Mobile | 100% (with padding) |
| Tablet | 768px max-width |
| Desktop | 1200px max-width |
| Large Desktop | 1400px max-width |

## Section Padding

| Device | Padding |
|--------|---------|
| Mobile | 16px horizontal, 64px vertical |
| Tablet | 24px horizontal, 80px vertical |
| Desktop | 32px horizontal, 96px vertical |

## Grid System
* **Mobile**: Single column, stacked layout
* **Tablet**: 2-column grid for cards/content
* **Desktop**: 3-4 column grid with proper gutters
* **Consistent gaps**: 16px mobile, 24px tablet, 32px desktop

---

# 6. Responsive Design Strategy

## Mobile First Rules
* Design mobile layout first (320px minimum)
* Scale upward to tablet and desktop
* Avoid desktop-first overrides
* Prioritise touch usability (44px minimum touch targets)
* Never go below 16px body text on mobile (prevents iOS input zoom)

## Breakpoints

| Device | Width |
|--------|-------|
| Mobile | 0–767px |
| Tablet | 768–1023px |
| Desktop | 1024px+ |
| Large Desktop | 1440px+ |

## Responsive Behaviour
* **Mobile**: Stacked sections, collapsible navigation, single column
* **Tablet**: 2-column grids, expanded navigation
* **Desktop**: Full grid layouts, hover effects, expanded content
* **Typography scaling**: Fluid between breakpoints

---

# 7. Animation & Motion System

## Motion Philosophy
* **Smooth**: Lenis smooth scrolling
* **Purposeful**: Animations enhance UX, don't distract
* **Performance-focused**: 60fps animations
* **Subtle**: Fade-ins, gentle scaling, smooth transitions

## Animation Libraries
* **Framer Motion**: Component animations and page transitions
* **Lenis**: Smooth scrolling experience

## Allowed Animations
* Fade in/out (opacity transitions)
* Slide up/down (translateY)
* Scale hover effects (1.02x max)
* Smooth scrolling
* Interactive cursor (specific pages only)
* Gentle parallax effects

## Restricted Animations
* Excessive bouncing or elastic effects
* Flashing or strobing effects
* Heavy parallax that affects performance
* Distracting motion during reading
* Auto-playing videos with sound

## Interactive Cursor
**Enabled on**: Homepage, main service pages, case studies listing, blog listing
**Disabled on**: Admin pages, individual blog posts, individual case studies, contact forms

---

# 8. Component Inventory

## Global Components

| Component | Description | Usage |
|-----------|-------------|-------|
| Navbar | Fixed navigation with hide/show on scroll | All public pages |
| Footer | Site footer with links and branding | All public pages |
| CTA Button | Primary call-to-action with hover effects | Throughout site |
| Secondary Button | Secondary actions, outline style | Forms, secondary actions |
| Section Heading | Consistent heading component with animation | All sections |
| Content Cards | Glass morphism cards with hover effects | Services, blog, case studies |
| Modal/Dialog | Overlay components for forms/content | Contact forms, image galleries |
| Rich Text Editor | Advanced editor with image insertion | Admin CMS only |
| Data Tables | Sortable, filterable tables | Admin CMS only |
| Loading Skeletons | Placeholder content during loading | All pages |

---

# 9. Frontend Page Specifications

---

# Home Page

## Purpose
Convert visitors into leads through strategic content flow and strong value proposition

## Sections (Reordered for Conversion)
1. **Navbar** - Fixed navigation
2. **Hero** - Value proposition + primary CTA
3. **Selected Work** - Social proof (3-6 featured case studies from CMS)
4. **Services** - Teaser cards linking to service pages
5. **Why Work With Us** - 3-6 key differentiators with stats
6. **Process** - 3-5 step methodology
7. **Testimonials** - Client social proof
8. **CTA** - Final conversion push
9. **Footer** - Links and contact info

## Layout Behaviour
### Mobile
- Single column stacked layout
- Collapsible navigation menu
- Touch-optimised buttons (44px minimum)
- Simplified hero with essential content

### Tablet
- 2-column grid for services and testimonials
- Expanded navigation
- Larger hero imagery

### Desktop
- Full multi-column layouts
- Hover effects and interactive cursor
- Expanded content sections
- Optimised for conversion flow

## Required Components
- Animated counters in hero
- Featured case study cards (CMS-driven)
- Service teaser cards with links
- Testimonial carousel/grid
- Newsletter signup form

## SEO Requirements
- Structured data for organisation
- Optimised meta descriptions
- Internal linking to service pages
- Image alt texts and captions

---

# Web Design Service Page

## Purpose
Convert web design leads through detailed service information and portfolio examples

## Sections
1. **Hero** - Service-specific value proposition + CTA
2. **Problem/Overview** - Issues we solve for clients
3. **Benefits** - What clients receive
4. **Process** - Step-by-step methodology
5. **Portfolio** - Filtered case studies tagged "Web Design"
6. **Pricing/Packages** - Starting prices or package tiers
7. **Testimonials** - Web design-specific testimonials
8. **CTA** - Book consultation

## Layout Behaviour
### Mobile
- Stacked sections with simplified content
- Portfolio in single column
- Condensed process steps

### Tablet
- 2-column portfolio grid
- Side-by-side content sections

### Desktop
- 3-column portfolio grid
- Full-width hero sections
- Interactive hover effects

---

# E-Commerce Service Page

## Purpose
Convert e-commerce leads with ROI-focused messaging and technical expertise

## Sections
1. **Hero** - E-commerce specific value proposition
2. **ROI Focus** - Conversion and sales emphasis
3. **Platform Expertise** - Shopify, WooCommerce, custom builds
4. **E-commerce Features** - Payments, checkout optimisation, integrations
5. **Portfolio** - E-commerce case studies with results
6. **Process** - Technical implementation steps
7. **Testimonials** - E-commerce client feedback
8. **CTA** - Schedule strategy call

## Layout Behaviour
Similar to Web Design page but with more technical emphasis and results-focused content

---

# Case Studies Listing Page

## Purpose
Showcase portfolio work to build trust and demonstrate capabilities

## Features
- **Hero section** with overview
- **Filter system** by Industry, Service Type, Project Type
- **Grid layout** (2-3 columns) with hover effects
- **Search functionality**
- **Pagination** (9-12 studies per page)
- **Results preview** on hover

## Layout Behaviour
### Mobile
- Single column grid
- Simplified filters (dropdown)
- Stack layout for study cards

### Tablet
- 2-column grid
- Expanded filter sidebar

### Desktop
- 3-column grid with hover effects
- Full filter sidebar
- Interactive cursor enabled

---

# Single Case Study Page

## Purpose
Detailed project showcase to demonstrate expertise and results

## Sections
1. **Hero** - Project overview, client, role, timeline
2. **Challenge** - Problem statement and context
3. **Solution** - Approach and methodology
4. **Process** - Step-by-step implementation (optional)
5. **Results** - Metrics, outcomes, success measures
6. **Image Gallery** - Before/after, screenshots, visuals
7. **Client Testimonial** - Direct feedback
8. **CTA** - "Want similar results?" with contact form

## Layout Behaviour
### Mobile
- Single column with stacked content
- Simplified image gallery
- Condensed metrics display

### Tablet
- 2-column layout for content sections
- Expanded image gallery

### Desktop
- Full-width hero and gallery sections
- Side-by-side content layout
- Interactive elements

## Content Structure (CMS Fields)
- **Title** (SEO optimised)
- **Client Name**
- **Project Type** (dropdown: Website, Campaign, Branding, etc.)
- **Industry** (dropdown selection)
- **Challenge** (rich text)
- **Solution** (rich text)
- **Results** (rich text with metrics)
- **Hero Image**
- **Gallery Images** (multiple upload)
- **Client Testimonial** (text + client info)
- **Tags** (for filtering)
- **Featured** (boolean for homepage display)
- **SEO Meta** (title, description)
- **Slug** (URL-friendly)
- **Status** (draft/published)
- **Publish Date**

---

# Blog Listing Page

## Purpose
Establish thought leadership and improve SEO through valuable content

## Features
- **Featured Post Hero** (rotates every 2 days automatically)
- **Category Filters**: Marketing, Social Media, Branding, Web Design, Development, SEO, Strategy, Guides
- **Search functionality**
- **Grid layout** (3x3 = 9 posts per page)
- **Pagination**
- **No sidebar** (cleaner UX)

## Layout Behaviour
### Mobile
- Single column layout
- Simplified hero section
- Stack layout for blog cards

### Tablet
- 2-column grid for posts
- Expanded hero section

### Desktop
- 3-column grid layout
- Full-width featured hero
- Interactive cursor enabled

## Content Structure (CMS Fields)
- **Title** (SEO optimised)
- **Slug** (auto-generated from title)
- **Hero Image** (separate from content)
- **Content** (rich text editor with inline images)
- **Excerpt** (manual or auto-generated)
- **Category** (dropdown selection)
- **Tags** (multiple selection)
- **Author** (dropdown of admin users)
- **SEO Meta Title**
- **SEO Meta Description**
- **Featured** (boolean for homepage/hero rotation)
- **Status** (draft/published/scheduled)
- **Publish Date**
- **Created At** / **Updated At** (automatic)

---

# Single Blog Page

## Purpose
Deliver valuable content while maintaining engagement and conversion opportunities

## Sections
1. **Breadcrumb Navigation** - Back to blog + category
2. **Article Header** - Title, author, date, category badge
3. **Hero Image** (if present)
4. **Rich Text Content** - Main article with inline images
5. **Social Sharing** - Top and bottom placement
6. **Related Articles** - 3-4 related posts
7. **Newsletter Signup** - Content upgrade CTA
8. **Next/Previous Navigation**

## Layout Behaviour
### Mobile
- Single column layout
- Simplified sharing options
- Stacked related articles

### Tablet
- Wider content column
- Side-by-side related articles

### Desktop
- Optimal reading width (750px max)
- Full social sharing options
- Grid layout for related content

## Interactive Cursor
**Disabled** on individual blog posts for better reading experience

---

# Contact Page

## Purpose
Convert inquiries into qualified leads through strategic form design

## Sections
1. **Hero** - Clear contact CTA and value proposition
2. **Contact Form** - Optimised for conversions
3. **Business Information** - Address, phone, email, hours
4. **FAQ Section** - Common questions and answers
5. **CTA** - Alternative contact methods

## Form Fields (Conversion Optimised)
- **Name** (required)
- **Email** (required)
- **Company** (optional but valuable)
- **Service Type** (dropdown: Web Design, E-commerce, Marketing, Other)
- **Budget Range** (dropdown: <$5k, $5k-$15k, $15k-$50k, $50k+, Not Sure)
- **Message** (required)

## Form Handling
- **Store in database** for CRM
- **Send email notification** to admin
- **Auto-responder** to client
- **Success page** with next steps

---

# 10. Admin Panel Specifications

---

# Admin Design Philosophy

## Style
- **Clean & Utilitarian**: Function over form
- **Data-centric**: Easy content management focus
- **Accessible**: High contrast, clear navigation
- **Efficient**: Minimal clicks to complete tasks

## Goals
- **Fast content management**: Quick blog/case study creation
- **Clear navigation**: Intuitive admin workflows
- **Efficient workflows**: Bulk operations and shortcuts
- **Theme flexibility**: Dark/light mode toggle

## Theme System
- **Dark Mode**: Matches main site aesthetic
- **Light Mode**: Better readability for content creation
- **Toggle Setting**: User preference saved in localStorage
- **Consistent Accent**: #FF1E1E red throughout both themes

---

# Admin Layout

## Desktop Layout
- **Sidebar Navigation** (200px fixed width)
  - Dashboard
  - Blog Management
  - Case Studies
  - Media Library
  - Settings
  - Logout
- **Top Bar** (theme toggle, user info, notifications)
- **Main Content Area** (fluid width)
- **Breadcrumb Navigation** within content

## Tablet Layout (768px-1023px)
- **Collapsible sidebar** (hamburger menu)
- **Full-width content area**
- **Bottom navigation** for quick actions

## Mobile Layout (<768px)
- **Bottom tab navigation**
- **Full-screen content**
- **Simplified forms** with better touch targets

---

# Admin Pages

## Dashboard
### Features
- **Analytics Cards**: Total posts, published case studies, draft content
- **Recent Activity**: Latest blog posts and case studies
- **Quick Actions**: Create new post, upload media, view site
- **System Status**: Storage usage, recent uploads

### Layout
- **4-column grid** on desktop
- **2-column grid** on tablet
- **Single column** on mobile

---

## Blog Management
### Features
- **Data Table** with sorting and filtering
- **Search** by title, content, author
- **Filters** by status, category, date range
- **Bulk Actions** (publish, delete, change category)
- **Quick Edit** inline for title, status, category
- **Create/Edit/Delete** operations

### Table Columns
- **Title** (with edit link)
- **Author**
- **Category**
- **Status** (Published/Draft/Scheduled)
- **Publish Date**
- **Actions** (Edit/Delete/Preview)

---

## Blog Editor
### Features
- **Rich Text Editor** with image insertion capabilities
- **Drag & Drop Image Upload** directly into content
- **Hero Image Upload** (separate field)
- **SEO Fields** (meta title, description)
- **Category Selection** (dropdown)
- **Tag Management** (add/remove tags)
- **Draft System** (auto-save every 30 seconds)
- **Publish Controls** (save draft, schedule, publish now)
- **Preview Mode** (see how it looks on site)

### Editor Capabilities
- **Inline Images**: Drag and drop images directly into content
- **Text Formatting**: Bold, italic, headings, lists, links
- **No Image Editing**: Simple upload and insert (no crop/resize)
- **Alt Text**: Required for accessibility
- **Image Optimisation**: Automatic WebP conversion and compression

---

## Case Study Management
### Features
- **CRUD Operations** (Create, Read, Update, Delete)
- **Gallery Management** (multiple image upload)
- **Client Information** fields
- **Results Metrics** input
- **SEO Fields** optimisation
- **Featured Toggle** (for homepage display)

### Content Fields
- **Basic Info**: Title, client name, project type, industry
- **Content Sections**: Challenge, solution, results (rich text)
- **Media**: Hero image, gallery images (drag & drop)
- **Metadata**: Tags, featured status, SEO fields
- **Publishing**: Status, publish date, slug

---

## Media Library
### Features
- **Upload Interface** (drag & drop or click to upload)
- **Grid View** with thumbnails
- **Search** by filename or alt text
- **Filter** by file type, upload date
- **Bulk Delete** operations
- **Image Details** (size, dimensions, alt text)
- **Usage Tracking** (where images are used)

### Organisation
- **Automatic Folders** by upload date (YYYY/MM)
- **File Naming**: Automatic optimisation for web
- **Multiple Formats**: Auto-generate WebP versions
- **Compression**: Automatic optimisation for performance

---

## Settings
### Features
- **Site Settings**: Site title, description, contact info
- **User Management**: Admin user accounts
- **SEO Defaults**: Default meta descriptions, keywords
- **Theme Toggle**: Dark/light mode preference
- **Backup Options**: Export content, import content

---

# 11. Accessibility Requirements

## Standards
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**: Full site navigable via keyboard
- **Focus States**: Visible focus indicators on all interactive elements
- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text

## Requirements
- **Alt Text**: Required for all images (enforced in CMS)
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Accessible Forms**: Labels, error messages, validation
- **Screen Reader Support**: ARIA labels where needed
- **Skip Links**: Jump to main content
- **Reduced Motion**: Respect prefers-reduced-motion

---

# 12. SEO Requirements

## Technical SEO
- **Meta Tags**: Dynamic title and description per page
- **Open Graph**: Social media sharing optimisation
- **Structured Data**: JSON-LD for articles, organisation, breadcrumbs
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Proper crawling directives
- **Canonical URLs**: Prevent duplicate content

## Content SEO
- **Heading Hierarchy**: Proper H1-H6 structure
- **Internal Linking**: Automatic related content suggestions
- **Image Optimisation**: Alt text, proper file names, compression
- **URL Structure**: Clean, descriptive slugs
- **Loading Speed**: Optimised images, minimal JavaScript

---

# 13. Performance Requirements

## Goals
- **Fast Load Times**: <3 seconds on 3G
- **Minimal Layout Shift**: CLS <0.1
- **Optimised Images**: WebP format, lazy loading
- **Efficient JavaScript**: Code splitting, minimal bundles

## Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | <2.5s |
| CLS (Cumulative Layout Shift) | <0.1 |
| INP (Interaction to Next Paint) | <200ms |

## Optimisation Strategies
- **Image Optimisation**: Automatic WebP conversion, multiple sizes
- **Lazy Loading**: Images and components below fold
- **Code Splitting**: Route-based and component-based
- **Caching**: Static assets, API responses
- **CDN**: Image and asset delivery

---

# 14. Image & Media Guidelines

## Image Style
- **High Quality**: Professional photography and graphics
- **Consistent Aspect Ratios**: 16:9 for heroes, 4:3 for cards
- **Brand Consistency**: Consistent color grading and style

## Formats
- **WebP**: Primary format for web delivery
- **AVIF**: Future format for supported browsers
- **JPEG**: Fallback for older browsers
- **PNG**: For graphics with transparency

## Optimisation Rules
- **Automatic Compression**: 85% quality for photos
- **Responsive Sizing**: Multiple sizes generated automatically
- **Lazy Loading**: All images below the fold
- **Alt Text**: Required for accessibility and SEO

---

# 15. Development Phases

## Phase 1: Admin CMS (Priority)
### Week 1-2: Core Admin Infrastructure
- Admin authentication system (Supabase)
- Admin layout with sidebar navigation
- Theme toggle (dark/light mode)
- Dashboard with basic analytics

### Week 3-4: Content Management
- Blog management system (CRUD operations)
- Rich text editor with image insertion
- Media library with drag & drop upload
- Case study management system

### Week 5-6: Advanced Features
- SEO fields and optimisation
- Bulk operations and search
- User management and settings
- Data validation and error handling

## Phase 2: Public Website (Secondary)
### Week 7-8: Core Pages
- Homepage restructure (new section order)
- Service pages (Web Design, E-commerce)
- Blog listing and individual post pages
- Case study listing and individual pages

### Week 9-10: Enhanced Features
- Contact page with optimised form
- Search and filtering functionality
- SEO implementation and structured data
- Performance optimisation

### Week 11-12: Polish & Launch
- Accessibility improvements
- Cross-browser testing
- Performance optimisation
- Final QA and deployment

---

# 16. Technical Specifications

## Database Schema (Supabase)

### Users Table
```sql
- id (uuid, primary key)
- email (text, unique)
- password_hash (text)
- name (text)
- role (text, default: 'admin')
- theme_preference (text, default: 'dark')
- created_at (timestamp)
- updated_at (timestamp)
```

### Blog Posts Table
```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- content (text)
- excerpt (text)
- hero_image_url (text)
- category (text)
- tags (text[])
- author_id (uuid, foreign key)
- status (text: 'draft'|'published'|'scheduled')
- featured (boolean, default: false)
- seo_title (text)
- seo_description (text)
- publish_date (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

### Case Studies Table
```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- client_name (text)
- project_type (text)
- industry (text)
- challenge (text)
- solution (text)
- results (text)
- hero_image_url (text)
- gallery_images (text[])
- testimonial (text)
- testimonial_author (text)
- tags (text[])
- featured (boolean, default: false)
- seo_title (text)
- seo_description (text)
- status (text: 'draft'|'published')
- created_at (timestamp)
- updated_at (timestamp)
```

### Media Table
```sql
- id (uuid, primary key)
- filename (text)
- original_name (text)
- file_size (integer)
- mime_type (text)
- url (text)
- alt_text (text)
- uploaded_by (uuid, foreign key)
- created_at (timestamp)
```

---

# 17. Notes & Decisions

| Decision | Reason |
|----------|--------|
| Single font family (Inter) | Consistency, performance, modern aesthetic |
| Dark theme with improved contrast | Brand consistency while improving readability |
| Multi-page architecture | Better SEO, user experience, content organisation |
| Admin CMS priority | Core business need for content management |
| Supabase for backend | Rapid development, built-in auth, real-time features |
| Rich text editor with drag-drop | Modern content creation experience |
| No image editing in CMS | Simplicity, performance, external tool integration |
| Interactive cursor on select pages | Enhanced UX without overwhelming content pages |
| Featured post rotation (2 days) | Automatic content freshness without manual management |
| 9-12 posts per page | Optimal balance of content discovery and performance |
| Theme toggle in admin | Flexibility for different working preferences |
| Automatic image optimisation | Performance without manual intervention |
| Mobile-first responsive design | Modern web standards, mobile traffic priority |