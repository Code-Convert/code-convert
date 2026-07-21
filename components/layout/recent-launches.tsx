'use client';

import WebsiteCarousel from '@/components/layout/WebsiteCarousel';
import Section, { SectionHeader } from '@/components/ui/section';

const websites = [
  {
    name: 'Urban Living Co.',
    industry: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop',
  },
  {
    name: 'Apex Consulting',
    industry: 'Corporate',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop',
  },
  {
    name: 'Verde Organics',
    industry: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1000&fit=crop',
  },
  {
    name: 'Elevate Fitness',
    industry: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1000&fit=crop',
  },
  {
    name: 'Summit Legal',
    industry: 'Legal Services',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=1000&fit=crop',
  },
];

export default function RecentLaunches() {
  return (
    <Section className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <SectionHeader
          subtitle="Recent Launches"
          title="Website Launches"
          description="A selection of websites designed and developed for brands across South Africa."
        />
      </div>

      <WebsiteCarousel websites={websites} />
    </Section>
  );
}
