-- =====================================================
-- FIX STORAGE BUCKET POLICIES FOR MEDIA UPLOADS
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view media library" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage media library" ON storage.objects;

-- Create new policies with correct permissions

-- Policy 1: Public can view/download from media library
CREATE POLICY "Public can view media library" 
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

-- Policy 2: Authenticated users can upload to media library
CREATE POLICY "Authenticated can upload to media library" 
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media-library' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Authenticated users can update media library
CREATE POLICY "Authenticated can update media library" 
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media-library' 
  AND auth.role() = 'authenticated'
);

-- Policy 4: Authenticated users can delete from media library
CREATE POLICY "Authenticated can delete from media library" 
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media-library' 
  AND auth.role() = 'authenticated'
);

-- =====================================================
-- VERIFY MEDIA TABLE POLICIES
-- =====================================================

-- Drop and recreate media table policies for clarity
DROP POLICY IF EXISTS "Public can view media" ON public.media;
DROP POLICY IF EXISTS "Admins can manage media" ON public.media;

-- Public can view all media
CREATE POLICY "Public can view media" 
ON public.media FOR SELECT 
USING (true);

-- Authenticated users can insert media records
CREATE POLICY "Authenticated can insert media" 
ON public.media FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update media records
CREATE POLICY "Authenticated can update media" 
ON public.media FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Authenticated users can delete media records
CREATE POLICY "Authenticated can delete media" 
ON public.media FOR DELETE 
USING (auth.role() = 'authenticated');
