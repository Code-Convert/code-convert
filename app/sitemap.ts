import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const supabase = await createClient();

  const [{ data: blogs }, { data: caseStudies }] = await Promise.all([
    supabase
      .from('blogs')
      .select('slug, updated_at, published_at')
      .eq('published', true),
    supabase
      .from('case_studies')
      .select('slug, updated_at, published_at')
      .eq('published', true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.updated_at || b.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudies ?? []).map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.updated_at || cs.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
