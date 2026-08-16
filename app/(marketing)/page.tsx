import { createClient } from '@/lib/supabase/server';
import LenisProvider from '@/components/LenisProvider';
import Hero from '@/components/layout/Hero';
import Marquee from '@/components/layout/Marquee';
import SelectedWork from '@/components/layout/SelectedWork';
import Services from '@/components/layout/Services';
import Process from '@/components/layout/Process';
import Testimonials from '@/components/layout/Testimonials';
import CTA from '@/components/layout/CTA';
import Statistics from '@/components/layout/statistics';
import type { CaseStudy } from '@/types/case-study';

async function getHomepageData() {
  const supabase = await createClient();

  const [{ data: projects }, { data: testimonials }] = await Promise.all([
    supabase
      .from('case_studies')
      .select('id, title, slug, client, industry, services, results, featured_image')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(4)
      .returns<CaseStudy[]>(),
    supabase
      .from('case_studies')
      .select('id, testimonial_text, testimonial_author, testimonial_role, client')
      .eq('published', true)
      .not('testimonial_text', 'is', null)
      .order('published_at', { ascending: false })
      .limit(6)
      .returns<CaseStudy[]>(),
  ]);

  return { projects: projects ?? [], testimonials: testimonials ?? [] };
}

export default async function HomePage() {
  const { projects, testimonials } = await getHomepageData();

  return (
    <LenisProvider>
      <Hero>
        <Statistics />
      </Hero>
      <Marquee />
      <SelectedWork projects={projects} />
      <Services />
      <Process />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </LenisProvider>
  );
}
