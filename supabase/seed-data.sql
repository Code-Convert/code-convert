-- =====================================================
-- SEED DATA FOR TESTING
-- =====================================================

-- Insert sample blogs
INSERT INTO public.blogs (title, slug, excerpt, content, published, seo_title, seo_description) VALUES
('Getting Started with Next.js', 'getting-started-nextjs', 'Learn the basics of Next.js and build your first application', 'Next.js is a powerful React framework that makes building web applications easier...', true, 'Getting Started with Next.js', 'Complete guide to getting started with Next.js'),
('Understanding TypeScript', 'understanding-typescript', 'A comprehensive guide to TypeScript for beginners', 'TypeScript adds static typing to JavaScript, making your code more robust...', true, 'Understanding TypeScript', 'Learn TypeScript from scratch'),
('Building REST APIs', 'building-rest-apis', 'Best practices for building RESTful APIs', 'REST APIs are the backbone of modern web applications...', false, 'Building REST APIs', 'REST API development guide');

-- Insert sample case studies
INSERT INTO public.case_studies (title, slug, client, industry, services, challenge, solution, results, published, seo_title, seo_description) VALUES
('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'TechStore Inc', 'E-commerce', ARRAY['Web Development', 'UI/UX Design'], 'The client needed a modern, fast e-commerce platform', 'We built a custom Next.js solution with Stripe integration', 'Increased conversion rate by 45% and reduced load time by 60%', true, 'E-commerce Platform Redesign Case Study', 'How we redesigned an e-commerce platform'),
('Mobile App Development', 'mobile-app-development', 'FitLife', 'Health & Fitness', ARRAY['Mobile Development', 'Backend Development'], 'Client needed a cross-platform fitness tracking app', 'Developed using React Native with real-time sync', 'Over 50,000 downloads in first month', true, 'Mobile App Development Case Study', 'FitLife mobile app success story'),
('Corporate Website Overhaul', 'corporate-website-overhaul', 'Global Corp', 'Corporate', ARRAY['Web Development', 'SEO'], 'Outdated website with poor SEO performance', 'Complete redesign with modern tech stack and SEO optimization', 'Organic traffic increased by 200%', false, 'Corporate Website Overhaul', 'Corporate website transformation');
