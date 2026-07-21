import { Metadata } from 'next';
import SelectedProjects from '@/components/layout/selected-projects';
import Statistics from '@/components/layout/statistics';
import GalleryGrid from '@/components/layout/gallery-grid';
import Process from '@/components/layout/Process';
import ServicesFAQ from '@/components/layout/faq';
import RecentLaunches from '@/components/layout/recent-launches';
import CTA from '@/components/layout/CTA';
import HeroBackgroundPaths from '@/components/layout/HeroBackgroundPaths';
import TechStack from '@/components/layout/tech-stack';

export const metadata: Metadata = {
  title: 'Web Design & Marketing Services | Code & Convert',
  description:
    'Expert web design, development, and social media marketing services. We build high-converting websites and scale your digital presence.',
};

export default function ServicesPage() {
  return (
    <main className="bg-black">
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
        imageSrc="/hero-image.png"
        imageAlt="Hero Image"
      />

      {/* 2. Selected Projects */}
      <SelectedProjects />

      
      {/* 3. Statistics */}
      <Statistics />

      {/* 4. Tech Stack */}
      <TechStack />
      
      {/* 5. Gallery Grid */}
      <GalleryGrid />

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
