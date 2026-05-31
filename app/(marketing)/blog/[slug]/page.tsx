import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/ui/page-container';
import { ArticleHeader } from '@/components/ui/article-header';
import { FeaturedImage } from '@/components/ui/featured-image';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!blog) notFound();

  return (
    <PageContainer maxWidth="4xl">
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
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </article>
    </PageContainer>
  );
}
