import AnimatedStats from '@/components/ui/animated-stats';
import Section, { SectionHeader } from '@/components/ui/section';
import CTAButton from '@/components/ui/CTA_Button';
import { createClient } from '@/lib/supabase/server';

async function getSiteStats() {
  const supabase = await createClient();
  const { data } = await supabase.rpc('get_site_statistics');
  return data?.[0] ?? null;
}

export default async function Statistics() {
  const stats = await getSiteStats();

  const statItems = [
    {
      value: stats?.projects_delivered != null ? String(stats.projects_delivered) : '150',
      suffix: '+',
      label: 'Projects Delivered',
    },
    {
      value: stats?.avg_performance_score != null ? String(stats.avg_performance_score) : '95',
      suffix: '+',
      label: 'Performance Scores',
    },
    {
      value: stats?.avg_roas != null ? String(stats.avg_roas) : '4.8',
      suffix: 'x',
      label: 'Average ROAS',
    },
    {
      value: stats?.percent_custom_built != null ? String(stats.percent_custom_built) : '100',
      suffix: '%',
      label: 'Custom Built',
    },
  ];

  return (
    <Section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <SectionHeader
            title="A Track Record Of Market Dominance"
            description="We let the numbers do the talking. Explore the strategies, campaigns and digital experiences that transformed ambitious goals into measurable business growth."
          />

          <div className="mt-8">
            <CTAButton href="/case-studies" variant="secondary">
              See More Projects
            </CTAButton>
          </div>
        </div>

        <AnimatedStats stats={statItems} />
      </div>
    </Section>
  );
}
