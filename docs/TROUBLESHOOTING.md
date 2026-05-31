# Troubleshooting Guide - Image Upload & Dashboard Count Issues

## Issue 1: Image Upload Not Working

### Symptoms
- Upload buttons do nothing when clicked
- No errors shown in UI
- Files not being uploaded to Supabase Storage

### Root Causes Identified
1. **Missing error handling** - Errors were failing silently
2. **Authentication not checked** - Upload attempted without verifying user is logged in
3. **No file validation** - Invalid files could cause silent failures
4. **Missing user feedback** - No loading states or error messages

### Fixes Applied

#### 1. Enhanced Error Handling
- Added comprehensive try-catch blocks
- Added console logging at each step
- Added user-friendly error alerts
- Added error state display in UI

#### 2. Authentication Verification
- Check user authentication before upload
- Show clear error if not authenticated
- Include user ID in media records

#### 3. File Validation
- Validate file type (images only)
- Validate file size (max 5MB)
- Show specific error messages for validation failures

#### 4. Better User Feedback
- Added loading spinner during upload
- Added error display component
- Added success confirmation
- Added progress indication

### Testing Steps

1. **Test Authentication**
   ```
   - Open browser console (F12)
   - Try to upload an image
   - Check console for "User authenticated: [email]"
   - If not authenticated, you'll see an error
   ```

2. **Test File Upload**
   ```
   - Select a valid image file (JPG, PNG, WebP)
   - Watch console for upload progress
   - Should see: "Starting upload", "Upload successful", "Media record created"
   ```

3. **Test Error Cases**
   ```
   - Try uploading a non-image file (should show error)
   - Try uploading a file > 5MB (should show error)
   - Try uploading without being logged in (should show error)
   ```

### If Upload Still Fails

#### Check Supabase Storage Policies

Run this in Supabase SQL Editor:

```sql
-- Check if media-library bucket exists
SELECT * FROM storage.buckets WHERE id = 'media-library';

-- Check storage policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%media-library%';
```

#### Apply Storage Policy Fix

If policies are missing or incorrect, run:

```sql
-- Run the fix-storage-policies.sql file
-- Located at: supabase/fix-storage-policies.sql
```

#### Check Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Try uploading an image
4. Look for error messages:
   - "Auth error" = Not logged in
   - "Upload error" = Storage policy issue
   - "Insert error" = Database policy issue

#### Check Network Tab

1. Open Developer Tools (F12)
2. Go to Network tab
3. Try uploading an image
4. Look for failed requests:
   - Red status = Failed request
   - Click on request to see error details

---

## Issue 2: Dashboard Count Off by 1

### Symptoms
- Dashboard shows 4 published blogs/case studies
- Actual count is 3
- Count is consistently off by 1

### Root Causes Identified
1. **Potential NULL values** - Published field might have NULL instead of false
2. **Query logic issue** - Count query might be including wrong records
3. **Caching issue** - Old data might be cached

### Fixes Applied

#### 1. Improved Query Logic
- Separated count queries for better debugging
- Added error handling for each query
- Added console logging to see actual counts

#### 2. NULL Value Handling
- Added SQL script to fix NULL published values
- Ensured all records have explicit true/false

#### 3. Better Error Reporting
- Log each query result separately
- Show errors in console for debugging
- Return 0 on error instead of undefined

### Testing Steps

1. **Check Console Logs**
   ```
   - Open browser console (F12)
   - Navigate to /admin dashboard
   - Look for "Dashboard stats: { totalBlogs: X, publishedBlogs: Y, ... }"
   - Verify counts match your actual data
   ```

2. **Run Diagnostic Queries**
   ```sql
   -- Run in Supabase SQL Editor
   -- File: supabase/diagnostic-queries.sql
   
   -- This will show you:
   -- - All blogs and their published status
   -- - All case studies and their published status
   -- - Actual counts from database
   ```

3. **Fix NULL Values**
   ```sql
   -- If you find NULL published values, run:
   UPDATE public.blogs 
   SET published = false 
   WHERE published IS NULL;
   
   UPDATE public.case_studies 
   SET published = false 
   WHERE published IS NULL;
   ```

### If Count Still Wrong

#### Verify Data in Supabase

1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Open `blogs` table
4. Count rows where `published = true`
5. Compare with dashboard count

#### Check for Soft Deletes

```sql
-- Check if there are any deleted_at columns or similar
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'blogs' 
  AND column_name LIKE '%delete%';
```

#### Clear Cache

1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Restart Next.js dev server

---

## General Debugging Tips

### Enable Verbose Logging

Add this to your `.env.local`:
```
NEXT_PUBLIC_DEBUG=true
```

### Check Supabase Logs

1. Go to Supabase Dashboard
2. Navigate to Logs
3. Check for errors during upload/query

### Verify Environment Variables

```bash
# Check these are set correctly in .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Test Supabase Connection

Create a test page to verify connection:

```typescript
// app/test/page.tsx
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function TestPage() {
  const [status, setStatus] = useState('Testing...')
  
  useEffect(() => {
    async function test() {
      const supabase = createClient()
      
      // Test auth
      const { data: { user } } = await supabase.auth.getUser()
      setStatus(`User: ${user?.email || 'Not logged in'}`)
      
      // Test database
      const { data, error } = await supabase.from('blogs').select('count')
      if (error) {
        setStatus(`Error: ${error.message}`)
      } else {
        setStatus(`Connected! Found ${data?.length || 0} blogs`)
      }
    }
    test()
  }, [])
  
  return <div className="p-8 text-white">{status}</div>
}
```

---

## Quick Fixes Checklist

### For Upload Issues:
- [ ] Verify you're logged in as admin
- [ ] Check browser console for errors
- [ ] Verify Supabase storage bucket exists
- [ ] Run fix-storage-policies.sql
- [ ] Check file is valid image < 5MB
- [ ] Clear browser cache and retry

### For Count Issues:
- [ ] Check browser console for "Dashboard stats" log
- [ ] Run diagnostic-queries.sql in Supabase
- [ ] Fix any NULL published values
- [ ] Hard refresh the page
- [ ] Verify counts in Supabase Table Editor
- [ ] Check for duplicate records

---

## Contact Support

If issues persist after trying all fixes:

1. Export diagnostic info:
   - Browser console logs
   - Network tab errors
   - Supabase logs
   - Results from diagnostic-queries.sql

2. Check documentation:
   - docs/MEDIA_UPLOAD_TROUBLESHOOTING.md
   - docs/ARCHITECTURE.md

3. Verify Supabase setup:
   - Storage bucket created
   - RLS policies applied
   - Tables created correctly
