-- Seed Blog Posts
INSERT INTO blogs (title, slug, excerpt, content, featured_image, published, published_at, seo_title, seo_description)
VALUES
(
  'Conversion-Focused Web Design: The Ultimate Guide',
  'conversion-focused-web-design-guide',
  'Learn how to design websites that turn visitors into customers through strategic design and psychological triggers.',
  '<h2>Introduction</h2><p>In today''s digital landscape, having a beautiful website isn''t enough. Your website needs to convert visitors into customers, subscribers, or leads. This comprehensive guide will show you how to create conversion-focused web designs that drive real business results.</p><h2>Understanding Conversion-Focused Design</h2><p>Conversion-focused design is the practice of creating websites with one primary goal: turning visitors into customers. Every element, from color choices to button placement, is strategically designed to guide users toward taking action.</p><h2>Key Principles</h2><ul><li>Clear value proposition above the fold</li><li>Strategic use of white space</li><li>Compelling calls-to-action</li><li>Social proof and trust signals</li><li>Mobile-first approach</li></ul><h2>Psychological Triggers</h2><p>Understanding user psychology is crucial for conversion optimization. Key triggers include scarcity, urgency, social proof, and authority.</p><h2>Conclusion</h2><p>Implementing these conversion-focused design principles can dramatically improve your website''s performance and drive measurable business results.</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
  true,
  NOW() - INTERVAL '7 days',
  'Conversion-Focused Web Design Guide | CodeConvert',
  'Learn how to design websites that convert visitors into customers with our comprehensive guide to conversion-focused web design.'
),
(
  'E-commerce Optimization: Boost Your Online Store Revenue',
  'ecommerce-optimization-boost-revenue',
  'Discover proven strategies to increase your e-commerce conversion rates and maximize revenue per visitor.',
  '<h2>The E-commerce Challenge</h2><p>Most e-commerce stores lose 97% of their visitors without making a sale. This guide will show you how to capture more of those lost opportunities.</p><h2>Key Optimization Areas</h2><h3>Product Pages</h3><p>Your product pages are your digital salespeople. High-quality images, compelling descriptions, and clear CTAs are essential.</p><h3>Checkout Process</h3><p>Reduce cart abandonment by streamlining your checkout process. Remove unnecessary steps and offer guest checkout options.</p><h3>Mobile Experience</h3><p>Over 60% of e-commerce traffic comes from mobile devices. Ensure your store is fully optimized for mobile shoppers.</p><h2>Performance Matters</h2><p>Every second of load time can cost you conversions. Optimize images, leverage caching, and use a CDN.</p><h2>Results You Can Expect</h2><p>Our clients typically see 40-65% increases in conversion rates after implementing these strategies.</p>',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
  true,
  NOW() - INTERVAL '14 days',
  'E-commerce Optimization Guide | Boost Revenue | CodeConvert',
  'Proven strategies to increase e-commerce conversion rates and maximize revenue per visitor. Learn from real case studies.'
),
(
  'Next.js 15: Why It''s Perfect for High-Performance Websites',
  'nextjs-15-high-performance-websites',
  'Explore why Next.js 15 is our framework of choice for building fast, scalable, and SEO-friendly websites.',
  '<h2>Why Next.js?</h2><p>Next.js has become the go-to framework for building modern web applications. With version 15, it''s better than ever.</p><h2>Key Features</h2><h3>App Router</h3><p>The new App Router provides better performance, improved layouts, and enhanced data fetching capabilities.</p><h3>Server Components</h3><p>React Server Components reduce JavaScript bundle sizes and improve initial page load times.</p><h3>Image Optimization</h3><p>Built-in image optimization ensures your images are served in the most efficient format and size.</p><h2>Performance Benefits</h2><p>Our Next.js sites consistently score 95+ on Google PageSpeed Insights, leading to better SEO and user experience.</p><h2>SEO Advantages</h2><p>Server-side rendering and static generation make Next.js sites highly crawlable and indexable by search engines.</p><h2>Conclusion</h2><p>For businesses serious about performance and conversions, Next.js 15 is the clear choice.</p>',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
  true,
  NOW() - INTERVAL '21 days',
  'Next.js 15 for High-Performance Websites | CodeConvert',
  'Discover why Next.js 15 is perfect for building fast, scalable, and SEO-friendly websites that drive conversions.'
);

-- Seed Case Studies
INSERT INTO case_studies (
  title, 
  slug, 
  client, 
  industry, 
  services, 
  challenge, 
  solution, 
  results,
  testimonial_text,
  testimonial_author,
  testimonial_role,
  featured_image,
  gallery,
  published,
  published_at,
  seo_title,
  seo_description
)
VALUES
(
  'Fashion E-commerce: 65% Conversion Rate Increase',
  'fashion-ecommerce-conversion-increase',
  'StyleHub Fashion',
  'E-commerce',
  ARRAY['E-commerce Development', 'Mobile Optimization', 'Conversion Optimization'],
  '<h2>The Challenge</h2><p>StyleHub Fashion was struggling with low mobile conversion rates despite having significant traffic. Their existing Shopify theme was slow, not mobile-optimized, and had a confusing checkout process.</p><h3>Key Issues</h3><ul><li>Mobile conversion rate of only 0.8%</li><li>Average page load time of 6.2 seconds</li><li>Cart abandonment rate of 78%</li><li>Poor mobile user experience</li></ul>',
  '<h2>Our Approach</h2><p>We implemented a custom headless commerce solution using Next.js and Shopify, focusing on mobile-first design and performance optimization.</p><h3>Key Implementations</h3><ul><li>Custom Next.js frontend with Shopify backend</li><li>Mobile-first responsive design</li><li>One-click checkout optimization</li><li>Advanced product filtering</li><li>Image optimization and lazy loading</li><li>Progressive Web App features</li></ul><h3>Design Strategy</h3><p>We redesigned the entire user journey with mobile users in mind, simplifying navigation and streamlining the checkout process to just 2 steps.</p>',
  '<h2>Impressive Results</h2><p>Within 3 months of launch, StyleHub Fashion saw dramatic improvements across all key metrics.</p><h3>Key Metrics</h3><ul><li><strong>65% increase</strong> in overall conversion rate</li><li><strong>120% increase</strong> in mobile conversion rate</li><li><strong>2.1 seconds</strong> average page load time (down from 6.2s)</li><li><strong>45% reduction</strong> in cart abandonment</li><li><strong>$850K</strong> additional revenue in first quarter</li></ul><h3>Additional Benefits</h3><ul><li>Improved SEO rankings</li><li>Better user engagement metrics</li><li>Reduced bounce rate by 35%</li></ul>',
  'Working with Code & Convert transformed our business. The new website not only looks amazing but has dramatically increased our sales. The mobile experience is now seamless, and our customers love it. Best investment we''ve made.',
  'Sarah Johnson',
  'CEO, StyleHub Fashion',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  ARRAY[
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800'
  ],
  true,
  NOW() - INTERVAL '30 days',
  'Fashion E-commerce Case Study: 65% Conversion Increase | CodeConvert',
  'See how we helped StyleHub Fashion increase conversions by 65% and generate $850K in additional revenue through mobile optimization.'
),
(
  'SaaS Startup: 200% Increase in Trial Signups',
  'saas-startup-trial-signup-increase',
  'CloudMetrics',
  'SaaS',
  ARRAY['Web Design', 'Landing Page Optimization', 'A/B Testing'],
  '<h2>The Challenge</h2><p>CloudMetrics, a B2B analytics SaaS platform, had a beautiful website but struggled to convert visitors into trial users.</p><h3>Key Issues</h3><ul><li>Trial signup rate of only 1.2%</li><li>Unclear value proposition</li><li>Complex signup process</li><li>Poor mobile experience</li><li>No social proof or trust signals</li></ul>',
  '<h2>Our Strategy</h2><p>We redesigned their landing page with a laser focus on conversion optimization and implemented a comprehensive A/B testing program.</p><h3>Key Changes</h3><ul><li>Simplified value proposition above the fold</li><li>Reduced signup form from 8 fields to 3</li><li>Added social proof and customer logos</li><li>Implemented exit-intent popups</li><li>Created dedicated landing pages for each use case</li><li>Mobile-optimized design</li></ul><h3>Testing Program</h3><p>We ran 15+ A/B tests over 3 months, continuously optimizing headlines, CTAs, and page layouts.</p>',
  '<h2>Outstanding Results</h2><p>The results exceeded expectations, with trial signups tripling within the first 2 months.</p><h3>Key Metrics</h3><ul><li><strong>200% increase</strong> in trial signups</li><li><strong>3.6%</strong> conversion rate (up from 1.2%)</li><li><strong>45% increase</strong> in qualified leads</li><li><strong>28% improvement</strong> in trial-to-paid conversion</li><li><strong>$1.2M</strong> additional ARR attributed to new signups</li></ul><h3>Additional Wins</h3><ul><li>Reduced cost per acquisition by 40%</li><li>Improved brand perception</li><li>Better user onboarding experience</li></ul>',
  'The team at Code & Convert completely transformed our conversion funnel. Their data-driven approach and attention to detail resulted in a 200% increase in trial signups. They truly understand what drives conversions.',
  'Michael Chen',
  'VP of Marketing, CloudMetrics',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800'
  ],
  true,
  NOW() - INTERVAL '45 days',
  'SaaS Case Study: 200% Increase in Trial Signups | CodeConvert',
  'Learn how we helped CloudMetrics triple their trial signups through landing page optimization and A/B testing.'
),
(
  'Local Service Business: 300% Lead Generation Growth',
  'local-service-business-lead-growth',
  'Elite Home Services',
  'Service Business',
  ARRAY['Web Design', 'Local SEO', 'Lead Generation'],
  '<h2>The Challenge</h2><p>Elite Home Services, a premium home renovation company, had virtually no online presence and relied entirely on word-of-mouth referrals.</p><h3>Key Issues</h3><ul><li>No website or online presence</li><li>Missing out on local search traffic</li><li>No way to capture online leads</li><li>Competitors dominating local search results</li><li>Difficulty showcasing portfolio</li></ul>',
  '<h2>Our Solution</h2><p>We built a conversion-optimized website from scratch and implemented a comprehensive local SEO strategy.</p><h3>Website Features</h3><ul><li>Mobile-first responsive design</li><li>Portfolio gallery with before/after images</li><li>Service area pages for local SEO</li><li>Lead capture forms with instant notifications</li><li>Customer testimonials and reviews</li><li>Online booking system</li></ul><h3>SEO Strategy</h3><ul><li>Google Business Profile optimization</li><li>Local citation building</li><li>Service area content creation</li><li>Review generation system</li></ul>',
  '<h2>Exceptional Growth</h2><p>Within 6 months, Elite Home Services became the dominant player in their local market.</p><h3>Key Metrics</h3><ul><li><strong>300% increase</strong> in qualified leads</li><li><strong>150+</strong> leads per month from website</li><li><strong>#1 ranking</strong> for 12 target keywords</li><li><strong>$750K</strong> in new business from online leads</li><li><strong>4.9 star</strong> average Google rating</li></ul><h3>Business Impact</h3><ul><li>Hired 3 additional crews to handle demand</li><li>Expanded service area</li><li>Reduced marketing costs by 50%</li><li>Built strong online reputation</li></ul>',
  'Code & Convert didn''t just build us a website—they transformed our entire business. We went from relying on referrals to having more leads than we can handle. The ROI has been incredible.',
  'David Martinez',
  'Owner, Elite Home Services',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
  ARRAY[
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    'https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=800'
  ],
  true,
  NOW() - INTERVAL '60 days',
  'Local Service Business Case Study: 300% Lead Growth | CodeConvert',
  'Discover how we helped Elite Home Services generate 300% more leads and $750K in new business through web design and local SEO.'
),
(
  'B2B Manufacturing: $500K in New Business',
  'b2b-manufacturing-new-business',
  'TechParts Manufacturing',
  'B2B',
  ARRAY['Web Design', 'Lead Generation', 'Content Strategy'],
  '<h2>The Challenge</h2><p>TechParts Manufacturing had an outdated website that didn''t reflect their capabilities or generate any meaningful leads.</p><h3>Key Issues</h3><ul><li>Website built in 2012, not mobile-friendly</li><li>No clear value proposition</li><li>Poor product catalog organization</li><li>Zero online lead generation</li><li>Losing business to competitors with modern sites</li></ul>',
  '<h2>Our Approach</h2><p>We created a modern, professional website that showcases their capabilities and generates qualified B2B leads.</p><h3>Website Features</h3><ul><li>Professional, modern design</li><li>Comprehensive product catalog</li><li>Technical specifications and downloads</li><li>Case studies and applications</li><li>Quote request system</li><li>Distributor portal</li></ul><h3>Content Strategy</h3><ul><li>Industry-specific landing pages</li><li>Technical blog content</li><li>Downloadable resources</li><li>Video demonstrations</li></ul>',
  '<h2>Impressive ROI</h2><p>The new website became a powerful lead generation tool, directly contributing to significant new business.</p><h3>Key Metrics</h3><ul><li><strong>$500K</strong> in new business from website leads</li><li><strong>85+</strong> qualified leads per month</li><li><strong>180%</strong> increase in organic traffic</li><li><strong>42%</strong> increase in average order value</li><li><strong>3.5 minutes</strong> average time on site</li></ul><h3>Business Impact</h3><ul><li>Expanded into 3 new markets</li><li>Improved brand perception</li><li>Reduced sales cycle length</li><li>Better qualified leads</li></ul>',
  'Our new website has been a game-changer. We''re now competing with much larger companies and winning business we never would have gotten before. The investment paid for itself in the first 3 months.',
  'Robert Thompson',
  'VP of Sales, TechParts Manufacturing',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
  ARRAY[
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800'
  ],
  true,
  NOW() - INTERVAL '75 days',
  'B2B Manufacturing Case Study: $500K New Business | CodeConvert',
  'See how we helped TechParts Manufacturing generate $500K in new business through a modern website and lead generation strategy.'
);
