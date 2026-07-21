import { Metadata } from 'next';
import ServicesHero from '@/components/sections/services-hero';
import SelectedProjects from '@/components/sections/selected-projects';
import Statistics from '@/components/sections/statistics';
import GalleryGrid from '@/components/sections/gallery-grid';
import ProcessTimeline from '@/components/sections/process-timeline';
import ServicesFAQ from '@/components/sections/faq';
import RecentLaunches from '@/components/sections/recent-launches';
import FinalCTA from '@/components/sections/final-cta';
import HeroBackgroundPaths from '@/components/layout/HeroBackgroundPaths';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';

export const metadata: Metadata = {
  title: 'Web Design & Marketing Services | Code & Convert',
  description:
    'Expert web design, development, and social media marketing services. We build high-converting websites and scale your digital presence.',
};

export default function ServicesPage() {
  return (
    <main className="bg-black">
      {/* 1. Hero Section */}
      {/* <ServicesHero /> */}
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
        />

      {/* 2. Selected Projects */}
      <SelectedProjects />

      
      {/* 3. Statistics */}
      <Statistics />
      
      {/* 4. Gallery Grid */}
      <GalleryGrid />

      {/* 5. Process Timeline */}
      <ProcessTimeline />
      
      {/* 6. Recent Launches */}
      <RecentLaunches />

      {/* 7. FAQ */}
      <ServicesFAQ />

      {/* 8. Final CTA */}
      <FinalCTA />
      
    </main>
  );
}
