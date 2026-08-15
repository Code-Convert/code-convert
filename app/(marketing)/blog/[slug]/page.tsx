import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/ui/page-container';
import { ArticleHeader } from '@/components/ui/article-header';
import { FeaturedImage } from '@/components/ui/featured-image';
import InteractiveCursor from '@/components/InteractiveCursor';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface BlogData {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  updated_at: string | null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog }: { data: BlogData | null } = await supabase
    .from('blogs')
    .select('title, seo_title, seo_description, excerpt, featured_image')
    .eq('slug', slug)
    .eq('published', true)
    .single()
    //.returns<BlogData>();

  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description ?? blog.excerpt ?? undefined,
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description ?? blog.excerpt ?? undefined,
      images: blog.featured_image ? [blog.featured_image] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog }: { data: BlogData | null } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
    //.returns<BlogData>();

  if (!blog) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.seo_description || blog.excerpt,
    image: blog.featured_image || undefined,
    datePublished: blog.published_at,
    dateModified: blog.updated_at || blog.published_at,
    author: {
      '@type': 'Organization',
      name: 'Code & Convert',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Code & Convert',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon1.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${slug}` },
  };

  return (
    <PageContainer maxWidth="4xl">
      <InteractiveCursor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <ArticleHeader
          title={blog.title}
          date={blog.published_at}
          backLink={{ href: '/blog', label: 'Back to Blog' }}
        />

        {blog.featured_image && (
          <FeaturedImage src={blog.featured_image} alt={blog.title} />
        )}

        {blog.content && (
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to transform your business?</h3>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </article>
    </PageContainer>
  );
}
