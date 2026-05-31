# Media Upload Troubleshooting Guide

## Current Status
Media uploads not working in blog/case study pages. Added debugging tools and improved error handling.

## Quick Fix Steps

### 1. Run the SQL Migration
Execute the SQL file in your Supabase SQL Editor:
```
supabase/fix-storage-policies.sql
```

This will:
- Fix storage bucket policies
- Update media table policies
- Allow authenticated users to upload

### 2. Test Upload Functionality

1. Go to `/admin/media` page
2. You'll see an "Upload Test" component at the top
3. Try uploading an image
4. Watch for status messages:
   - ✅ Green = Success
   - 🔴 Red = Error with details

### 3. Check Browser Console

Open browser console (F12) and look for:
- "Uploading file:" - Shows upload attempt
- "Upload successful:" - Shows upload result
- Any error messages with details

## Common Issues & Solutions

### Issue 1: "new row violates row-level security policy"
**Cause**: Media table RLS policies too restrictive

**Solution**: Run the fix-storage-policies.sql migration

### Issue 2: "permission denied for bucket media-library"
**Cause**: Storage bucket doesn't exist or has wrong policies

**Solution**:
1. Go to Supabase Dashboard → Storage
2. Check if `media-library` bucket exists
3. If not, create it:
   - Name: `media-library`
   - Public: ✅ Yes
4. Run the fix-storage-policies.sql migration

### Issue 3: "Upload failed: Bucket not found"
**Cause**: Bucket name mismatch

**Solution**: 
1. Check bucket name in Supabase Dashboard
2. If different, update these files:
   - `components/ui/media-picker.tsx`
   - `components/ui/image-upload.tsx`
   - `app/(admin)/admin/media/page.tsx`
3. Change `.from('media-library')` to match your bucket name

### Issue 4: Upload succeeds but image doesn't appear
**Cause**: Media table insert failing or not refreshing

**Solution**:
1. Check if media record was created in database
2. Verify `fetchMedia()` is called after upload
3. Check console for insert errors

### Issue 5: "Not authenticated"
**Cause**: User session expired or not logged in

**Solution**:
1. Log out and log back in
2. Check if admin role is set correctly
3. Verify middleware is allowing admin routes

## Manual Database Setup

If the migration doesn't work, manually create policies in Supabase SQL Editor:

```sql
-- Storage policies
CREATE POLICY "Public can view media library" 
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

CREATE POLICY "Authenticated can upload to media library" 
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media-library' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update media library" 
ON storage.objects FOR UPDATE
USING (bucket_id = 'media-library' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete from media library" 
ON storage.objects FOR DELETE
USING (bucket_id = 'media-library' AND auth.role() = 'authenticated');

-- Media table policies
CREATE POLICY "Public can view media" 
ON public.media FOR SELECT USING (true);

CREATE POLICY "Authenticated can insert media" 
ON public.media FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update media" 
ON public.media FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete media" 
ON public.media FOR DELETE 
USING (auth.role() = 'authenticated');
```

## Verify Setup

### Check 1: Bucket Exists
```sql
SELECT * FROM storage.buckets WHERE name = 'media-library';
```
Should return 1 row with `public = true`

### Check 2: Storage Policies
```sql
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
```
Should show 4 policies for media-library bucket

### Check 3: Media Table Policies
```sql
SELECT * FROM pg_policies WHERE tablename = 'media' AND schemaname = 'public';
```
Should show 4 policies (SELECT, INSERT, UPDATE, DELETE)

### Check 4: User Authentication
In browser console:
```javascript
const supabase = createClient()
supabase.auth.getUser().then(r => console.log(r))
```
Should show your user email and ID

## Testing Checklist

- [ ] SQL migration executed successfully
- [ ] Storage bucket `media-library` exists and is public
- [ ] Storage policies created (4 policies)
- [ ] Media table policies created (4 policies)
- [ ] User is authenticated as admin
- [ ] Upload Test component shows success
- [ ] Image appears in media library grid
- [ ] Can insert images in rich text editor
- [ ] Featured image upload works

## Still Not Working?

1. Export your Supabase policies:
   - Go to Supabase Dashboard → Database → Policies
   - Screenshot all policies for `media` table and `storage.objects`

2. Check browser console for exact error messages

3. Try uploading directly via Supabase Dashboard:
   - Storage → media-library → Upload file
   - If this fails, it's a Supabase configuration issue

4. Verify your `.env.local` has correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## After Fixing

Once uploads work:
1. Remove the `<UploadTest />` component from `/admin/media/page.tsx`
2. Test all upload locations:
   - Media library page
   - Blog featured image
   - Blog inline images (rich text editor)
   - Case study featured image
   - Case study inline images
