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

export const metadata: Metadata = {
  title: 'Web Design & Marketing Services | Code & Convert',
  description:
    'Expert web design, development, and social media marketing services. We build high-converting websites and scale your digital presence.',
};

async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('case_studies')
    .select('id, title, slug, services, results, featured_image, gallery_order')
    .eq('published', true)
    .order('gallery_order', { ascending: true })
    .limit(4);

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
    <main className="bg-black">
      <InteractiveCursor />
      
      {/* 1. Hero Section */}
      <HeroBackgroundPaths
        title="We Build High-Converting Websites For Growing Brands"
        subtitle="We leverage data-backed Conversion Rate Optimisation and precision-driven digital strategy to help ambitious businesses break through revenue plateaus and unlock sustainable growth."
        primaryCTA={{
            text: "Book Your Free Strategy Session",
            href: "/contact-us",
            badge: "30-Minute Call • Free",
        }}
        secondaryCTA={{
            text: "View Our Work",
            href: "#gallery-grid",
        }}
        imageSrc="/images/services-page/social-icon.png"
        imageAlt="Hero Image"
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

      {/* 8. FAQ */}
      <ServicesFAQ />

      {/* 9. Final CTA */}
      <CTA />
    </main>
  );
}
