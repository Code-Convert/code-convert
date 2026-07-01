-- =====================================================
-- DIAGNOSTIC QUERIES FOR DASHBOARD COUNT ISSUE
-- =====================================================

-- Check all blogs
SELECT 
  id, 
  title, 
  published, 
  created_at,
  updated_at
FROM public.blogs
ORDER BY created_at DESC;

-- Count total blogs
SELECT COUNT(*) as total_blogs FROM public.blogs;

-- Count published blogs
SELECT COUNT(*) as published_blogs FROM public.blogs WHERE published = true;

-- Check all case studies
SELECT 
  id, 
  title, 
  published, 
  created_at,
  updated_at
FROM public.case_studies
ORDER BY created_at DESC;

-- Count total case studies
SELECT COUNT(*) as total_case_studies FROM public.case_studies;

-- Count published case studies
SELECT COUNT(*) as published_case_studies FROM public.case_studies WHERE published = true;

-- =====================================================
-- CHECK FOR ORPHANED OR DUPLICATE RECORDS
-- =====================================================

-- Check for blogs with NULL published status
SELECT COUNT(*) as null_published_blogs 
FROM public.blogs 
WHERE published IS NULL;

-- Check for case studies with NULL published status
SELECT COUNT(*) as null_published_case_studies 
FROM public.case_studies 
WHERE published IS NULL;

-- =====================================================
-- FIX NULL PUBLISHED VALUES (if any)
-- =====================================================

-- Set NULL published values to false for blogs
UPDATE public.blogs 
SET published = false 
WHERE published IS NULL;

-- Set NULL published values to false for case studies
UPDATE public.case_studies 
SET published = false 
WHERE published IS NULL;

-- =====================================================
-- VERIFY STORAGE BUCKET EXISTS
-- =====================================================

SELECT * FROM storage.buckets WHERE id = 'media-library';

-- =====================================================
-- CHECK STORAGE POLICIES
-- =====================================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%media-library%';

-- =====================================================
-- CHECK MEDIA TABLE POLICIES
-- =====================================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'media';
