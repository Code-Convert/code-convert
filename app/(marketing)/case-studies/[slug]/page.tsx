import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/ui/page-container';
import { ArticleHeader } from '@/components/ui/article-header';
import { FeaturedImage } from '@/components/ui/featured-image';
import { ContentSection } from '@/components/ui/content-section';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { ImageGallery } from '@/components/ui/image-gallery';
import InteractiveCursor from '@/components/InteractiveCursor';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: study } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!study) return { title: 'Case Study Not Found' };

  return {
    title: study.seo_title || study.title,
    description: study.seo_description || study.challenge,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: study } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!study) notFound();

  return (
    <PageContainer maxWidth="6xl">
      <InteractiveCursor />
      <article>
        <ArticleHeader
          title={study.title}
          subtitle={study.client}
          tags={study.services}
          backLink={{ href: '/case-studies', label: 'Back to Case Studies' }}
        />

        {study.featured_image && (
          <FeaturedImage src={study.featured_image} alt={study.title} />
        )}

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {study.challenge && (
            <ContentSection title="Challenge" content={study.challenge} />
          )}
          {study.solution && (
            <ContentSection title="Solution" content={study.solution} />
          )}
          {study.results && (
            <ContentSection title="Results" content={study.results} />
          )}
        </div>

        {study.content && (
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: study.content }} />
          </div>
        )}

        {study.testimonial_text && (
          <TestimonialCard
            quote={study.testimonial_text}
            author={study.testimonial_author}
            role={study.testimonial_role}
          />
        )}

        <ImageGallery images={study.gallery} alt={study.title} />
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">Want similar results for your business?</h3>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
          >
            Book a Free Consultation
          </a>
        </div>
      </article>
    </PageContainer>
  );
}
