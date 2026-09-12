import { Metadata } from 'next';
import SelectedProjects from '@/components/layout/selected-projects';
import Statistics from '@/components/layout/statistics';
import GalleryGrid, { GalleryItem } from '@/components/layout/gallery-grid';
import Process from '@/components/layout/Process';
import ServicesFAQ from '@/components/layout/faq';
import RecentLaunches from '@/components/layout/recent-launches';
import CTA from '@/components/layout/CTA';
import HeroBackgroundPaths from '@/components/layout/HeroBackgroundPaths';
import TechStack from '@/components/layout/tech-stack';
import { createClient } from '@/lib/supabase/server';
import InteractiveCursor from '@/components/InteractiveCursor';
import VoidBackground from '@/components/VoidBackground';
import ScrollBridge from '@/components/ScrollBridge';

export const metadata: Metadata = {
  title: 'Web Design & Marketing Services | Code & Convert',
  description:
    'Expert web design, development, and social media marketing services. We build high-converting websites and scale your digital presence.',
};

interface caseStudy {
  id: string;
  title: string;
  slug: string;
  services: string[];
  results: string;
  featured_image: string;
  gallery_order: number;
}

async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('case_studies')
    .select('id, title, slug, services, results, featured_image, gallery_order')
    .eq('published', true)
    .order('gallery_order', { ascending: true })
    .limit(4)
    .returns<caseStudy[]>();

  return (data ?? []).map((cs) => ({
    id: cs.id,
    title: cs.title,
    slug: cs.slug,
    services: cs.services ?? [],
    description: cs.results ?? '',
    image: cs.featured_image ?? '',
  }));
}

export default async function ServicesPage() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      <VoidBackground />
      <ScrollBridge />
      <main className="bg-transparent relative z-10">
      <InteractiveCursor />
      
      {/* 1. Hero Section */}
      <HeroBackgroundPaths
        title="Full-service marketing, built around your business"
        subtitle="From websites and e-commerce to social media, paid ads and traditional marketing, we give your business one team to plan, execute and grow."
        primaryCTA={{
            text: "Book Your Free Strategy Session",
            href: "/contact-us",
        }}
        secondaryCTA={{
            text: "View Our Work",
            href: "#gallery-grid",
        }}
      />

      {/* 2. Selected Projects */}
      <SelectedProjects />

      {/* 3. Statistics */}
      <Statistics />

      {/* 4. Tech Stack */}
      <TechStack />

      {/* 5. Gallery Grid */}
      <GalleryGrid items={galleryItems} />

      {/* 6. Process Timeline */}
      <Process />

      {/* 7. Recent Launches */}
      <RecentLaunches />

      {/* 8. FAQ + 9. Final CTA — shared red background */}
      <div className="relative bg-[#050505]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 140% 90% at 50% 60%, rgba(200,10,10,0.22) 0%, rgba(100,0,0,0.12) 45%, transparent 70%)' }}
        />
        <ServicesFAQ />
        <CTA />
      </div>
    </main>
    </>
  );
}
