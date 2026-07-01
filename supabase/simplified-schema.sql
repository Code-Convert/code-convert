-- =====================================================
-- SIMPLIFIED AUTH APPROACH
-- =====================================================

-- 1. Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for new users" ON public.profiles;
DROP POLICY IF EXISTS "Public can read published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can read published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can read all blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can delete blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public can read published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Authenticated users can read published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can read all case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can insert case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can update case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins can delete case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Public can view media" ON public.media;
DROP POLICY IF EXISTS "Admins can manage media" ON public.media;

-- 2. Create simple JWT-based policies
-- Profiles: Only user can see/update their own
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Blogs: Public read published, auth users do everything
CREATE POLICY "blogs_public_read" ON public.blogs
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "blogs_auth_all" ON public.blogs
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Case Studies: Same as blogs
CREATE POLICY "case_studies_public_read" ON public.case_studies
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "case_studies_auth_all" ON public.case_studies
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Media: Public read, auth write
CREATE POLICY "media_public_read" ON public.media
  FOR SELECT USING (true);

CREATE POLICY "media_auth_write" ON public.media
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 3. Simplified get_user_role function (no RLS lookup)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
