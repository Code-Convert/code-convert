-- =====================================================
-- PROFILES TABLE (extends auth.users)
-- =====================================================

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BLOGS TABLE
-- =====================================================

CREATE TABLE public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- =====================================================
-- CASE STUDIES TABLE
-- =====================================================

CREATE TABLE public.case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT NOT NULL,
  industry TEXT,
  services TEXT[],
  challenge TEXT,
  solution TEXT,
  results TEXT,
  content TEXT,
  featured_image TEXT,
  gallery TEXT[],
  testimonial_text TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MEDIA TABLE
-- =====================================================

CREATE TABLE public.media (
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

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for new users" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Blog policies
CREATE POLICY "Public can read published blogs" ON public.blogs
  FOR SELECT TO anon USING (published = true);

CREATE POLICY "Authenticated users can read published blogs" ON public.blogs
  FOR SELECT TO authenticated USING (published = true);

CREATE POLICY "Admins can read all blogs" ON public.blogs
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert blogs" ON public.blogs
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update blogs" ON public.blogs
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete blogs" ON public.blogs
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

-- Case studies policies
CREATE POLICY "Public can read published case studies" ON public.case_studies
  FOR SELECT TO anon USING (published = true);
  
CREATE POLICY "Authenticated users can read published case studies" ON public.case_studies
  FOR SELECT TO authenticated USING (published = true);

CREATE POLICY "Admins can read all case studies" ON public.case_studies
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert case studies" ON public.case_studies
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update case studies" ON public.case_studies
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete case studies" ON public.case_studies
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

-- Media policies
CREATE POLICY "Public can view media" ON public.media
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage media" ON public.media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE public.profiles.id = auth.uid() 
      AND public.profiles.role = 'admin'
    )
  );

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to get user role (used for admin authentication)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('blog-images', 'blog-images', true),
  ('case-study-images', 'case-study-images', true),
  ('media-library', 'media-library', true);

-- Storage policies
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Public can view case study images" ON storage.objects
  FOR SELECT USING (bucket_id = 'case-study-images');

CREATE POLICY "Admins can upload case study images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'case-study-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Public can view media library" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-library');

CREATE POLICY "Admins can manage media library" ON storage.objects
  FOR ALL USING (bucket_id = 'media-library' AND auth.uid() IS NOT NULL);