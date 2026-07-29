import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';
import BlogFilter from './BlogFilter';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tips, and stories from the world of web development and digital marketing.',
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (
    <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />
      <PageContainer>
        <PageHeader
          title="Blog"
          description="Insights, tips, and stories from the world of web development."
        />
        <BlogFilter blogs={blogs ?? []} />
      </PageContainer>
    </div>
  );
}
