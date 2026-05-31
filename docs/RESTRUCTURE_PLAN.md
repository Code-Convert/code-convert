# Folder Structure Correction Plan

## Current Issues

### 1. Components Location
**Current:** `/app/components/`
**Should be:** `/components/` (root level)

### 2. Admin Route Names
**Current:** `/admin/blog`, `/admin/case-studies`
**Should be:** `/admin/blogs`, `/admin/case-studies`

### 3. Admin Sub-routes
**Current:** `/admin/blog/create`, `/admin/blog/edit/[id]`
**Should be:** `/admin/blogs/new`, `/admin/blogs/[id]`

### 4. Missing Folders
- `/actions` - Server actions
- `/hooks` - Custom hooks
- `/components/ui` - UI components
- `/components/layout` - Layout components
- `/components/sections` - Landing sections
- `/components/blog` - Blog components
- `/components/case-studies` - Case study components
- `/components/effects` - Effect components

## Restructuring Steps

### Step 1: Move Components to Root
Move `/app/components/` → `/components/`

Organize into subfolders:
```
/components
  /ui
    - Button.tsx
    - Input.tsx
    - Textarea.tsx
  /layout
    - Navbar.tsx (existing)
    - Footer.tsx (existing)
    - AdminSidebar.tsx
  /sections
    - Hero.tsx (existing)
    - Services.tsx (existing)
    - Testimonials.tsx (existing)
    - CTA.tsx (existing)
    - Process.tsx (existing)
    - SelectedWork.tsx (existing)
    - Marquee.tsx (existing)
  /effects
    - InteractiveCursor.tsx (existing)
    - VoidBackground.tsx (existing)
    - Loader.tsx (existing)
```

### Step 2: Rename Admin Routes
- `/app/(admin)/blog/` → `/app/(admin)/admin/blogs/`
- `/app/(admin)/case-studies/` → `/app/(admin)/admin/case-studies/`
- `/app/(admin)/media/` → `/app/(admin)/admin/media/`
- `/app/(admin)/settings/` → `/app/(admin)/admin/settings/`
- `/app/(admin)/dashboard/` → `/app/(admin)/admin/page.tsx` (dashboard is root)

### Step 3: Fix Sub-routes
- `/admin/blogs/create/` → `/admin/blogs/new/`
- `/admin/blogs/edit/[id]/` → `/admin/blogs/[id]/`

### Step 4: Create Missing Folders
- Create `/actions/` folder
- Create `/hooks/` folder

### Step 5: Update All Imports
Update all import paths from:
- `@/app/components/` → `@/components/`

## Implementation Order

1. Create new folder structure
2. Move and reorganize components
3. Rename admin routes
4. Update all imports
5. Test all routes work
6. Delete old folders

Would you like me to proceed with this restructuring?