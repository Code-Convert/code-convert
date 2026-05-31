# Media Upload Setup Guide

## Issue
Media uploads not working in blog and case study management pages.

## Root Cause
The Supabase storage bucket `media-library` needs to be properly configured with the correct policies.

## Solution

### Step 1: Create Storage Bucket (if not exists)

Go to your Supabase Dashboard → Storage → Create a new bucket:
- **Name**: `media-library`
- **Public**: Yes (checked)
- **File size limit**: 10MB (or as needed)
- **Allowed MIME types**: Leave empty or specify: `image/jpeg, image/png, image/webp, image/gif`

### Step 2: Set Storage Policies

In Supabase Dashboard → Storage → media-library → Policies, create these policies:

#### Policy 1: Public Read Access
```sql
CREATE POLICY "Public can view media library"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');
```

#### Policy 2: Authenticated Upload
```sql
CREATE POLICY "Authenticated users can upload to media library"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media-library' 
  AND auth.role() = 'authenticated'
);
```

#### Policy 3: Authenticated Update
```sql
CREATE POLICY "Authenticated users can update media library"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media-library' 
  AND auth.role() = 'authenticated'
);
```

#### Policy 4: Authenticated Delete
```sql
CREATE POLICY "Authenticated users can delete from media library"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media-library' 
  AND auth.role() = 'authenticated'
);
```

### Step 3: Verify Media Table

Ensure the `media` table exists with proper structure:

```sql
CREATE TABLE IF NOT EXISTS public.media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES public.profiles(id)
);
```

### Step 4: Set Media Table Policies

```sql
-- Public can view media
CREATE POLICY "Public can view media" 
ON public.media FOR SELECT 
USING (true);

-- Authenticated users can insert media
CREATE POLICY "Authenticated users can insert media" 
ON public.media FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can delete their media
CREATE POLICY "Authenticated users can delete media" 
ON public.media FOR DELETE 
USING (auth.role() = 'authenticated');
```

### Step 5: Test Upload

1. Open browser console (F12)
2. Go to any blog/case study edit page
3. Try uploading an image
4. Check console for any error messages
5. If you see errors, they will now show detailed messages

## Troubleshooting

### Error: "new row violates row-level security policy"
- Check that RLS policies are correctly set on the `media` table
- Ensure user is authenticated

### Error: "permission denied for bucket"
- Check storage bucket policies
- Ensure bucket is set to public
- Verify authenticated user has upload permissions

### Error: "File size exceeds limit"
- Increase bucket file size limit in Supabase dashboard
- Current limit should be at least 10MB

### Images upload but don't appear
- Check if `fetchMedia()` is being called after upload
- Verify the media table insert is successful
- Check browser console for errors

## Quick Test

Run this in your browser console while logged into admin:

```javascript
const supabase = createClient()
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })

supabase.storage
  .from('media-library')
  .upload('test-' + Date.now() + '.txt', testFile)
  .then(result => console.log('Upload test:', result))
```

If this works, the bucket is configured correctly.
