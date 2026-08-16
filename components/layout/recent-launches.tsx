import WebsiteCarousel from '@/components/layout/WebsiteCarousel';
import Section, { SectionHeader } from '@/components/ui/section';
import { createClient } from '@/lib/supabase/server';
import type { Tables } from '@/lib/database.type';


async function getCarouselItems() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('case_studies')
    .select('title, industry, carousel_image, featured_image, carousel_order')
    .eq('published', true)
    .eq('show_in_carousel', true)
    .order('carousel_order', { ascending: true })
    .returns<Pick<Tables<'case_studies'>, 'title' | 'industry' | 'carousel_image' | 'featured_image' | 'carousel_order'>[]>();

  return (data ?? []).map((cs) => ({
    name: cs.title,
    industry: cs.industry ?? '',
    image: cs.carousel_image ?? cs.featured_image ?? '',
  }));
}

export default async function RecentLaunches() {
  const [carouselItems] = await Promise.all([
    getCarouselItems(),
  ]);
  return (
    <Section className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <SectionHeader
          subtitle="Recent Launches"
          title="Website Launches"
          description="A selection of websites designed and developed for brands across South Africa."
        />
      </div>

      {carouselItems.length > 0 && <WebsiteCarousel websites={carouselItems} />}
    </Section>
  );
}
