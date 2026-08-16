import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { PageContainer } from '@/components/ui/page-container';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';
import CaseStudiesFilter from '../../../components/layout/CaseStudiesFilter';
import CaseStudiesHero from '@/components/layout/CaseStudiesHero';
import { CaseStudy } from '@/types/case-study';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real results from real projects. See how we\'ve helped businesses grow with web design and digital marketing.',
};

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .returns<CaseStudy[]>();

  return (
    <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />
      <CaseStudiesHero />
      <PageContainer id="case-studies">
        <CaseStudiesFilter caseStudies={caseStudies ?? []} />
      </PageContainer>
    </div>
  );
}
