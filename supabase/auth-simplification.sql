-- =====================================================
-- COMPLETE AUTH SIMPLIFICATION
-- Remove all complex checks, auth only at login
-- =====================================================

-- 1. DROP ALL EXISTING POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for new users" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;

DROP POLICY IF EXISTS "Public can read published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can read published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can read all blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can delete blogs" ON public.blogs;
DROP POLICY IF EXISTS "blogs_public_read" ON public.blogs;
DROP POLICY IF EXISTS "blogs_auth_all" ON public.blogs;

DROP POLICY IF EXISTS "Public can read published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Authenticated users can read published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can read all case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can insert case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can update case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can delete case studies" ON public.case_studies;
DROP POLICY IF EXISTS "case_studies_public_read" ON public.case_studies;
DROP POLICY IF EXISTS "case_studies_auth_all" ON public.case_studies;

DROP POLICY IF EXISTS "Public can view media" ON public.media;
DROP POLICY IF EXISTS "Admins can manage media" ON public.media;
DROP POLICY IF EXISTS "media_public_read" ON public.media;
DROP POLICY IF EXISTS "media_auth_write" ON public.media;

-- 2. DROP STORAGE POLICIES
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view case study images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload case study images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view media library" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage media library" ON storage.objects;

-- 3. DROP UNNECESSARY FUNCTIONS
DROP FUNCTION IF EXISTS public.get_user_role(UUID);

-- 4. DISABLE RLS ON ALL TABLES
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.media DISABLE ROW LEVEL SECURITY;

-- 5. CREATE SIMPLE POLICIES - Public read published, auth users full access

-- Profiles: Keep RLS for security, but simple
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_auth_all" ON public.profiles
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Blogs: Public read published, authenticated full access
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blogs_public_read" ON public.blogs
  FOR SELECT USING (published = true);

CREATE POLICY "blogs_auth_all" ON public.blogs
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Case Studies: Public read published, authenticated full access
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "case_studies_public_read" ON public.case_studies
  FOR SELECT USING (published = true);

CREATE POLICY "case_studies_auth_all" ON public.case_studies
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Media: Public read, authenticated full access
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "media_public_read" ON public.media
  FOR SELECT USING (true);

CREATE POLICY "media_auth_all" ON public.media
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 6. SIMPLE STORAGE POLICIES

-- Blog images
CREATE POLICY "blog_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_auth_all" ON storage.objects
  FOR ALL USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

-- Case study images
CREATE POLICY "case_study_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'case-study-images');

CREATE POLICY "case_study_images_auth_all" ON storage.objects
  FOR ALL USING (bucket_id = 'case-study-images' AND auth.uid() IS NOT NULL);

-- Media library
CREATE POLICY "media_library_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-library');

CREATE POLICY "media_library_auth_all" ON storage.objects
  FOR ALL USING (bucket_id = 'media-library' AND auth.uid() IS NOT NULL);

-- =====================================================
-- DONE! Auth now only happens at login.
-- If user is authenticated, they have full access.
-- Public users can only read published content.
-- =====================================================
