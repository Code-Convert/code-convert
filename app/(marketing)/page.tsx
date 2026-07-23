import LenisProvider from '@/components/LenisProvider';
import Hero from '@/components/layout/Hero';
import Marquee from '@/components/layout/Marquee';
import SelectedWork from '@/components/layout/SelectedWork';
import Services from '@/components/layout/Services';
import Process from '@/components/layout/Process';
import Testimonials from '@/components/layout/Testimonials';
import CTA from '@/components/layout/CTA';
import Statistics from '@/components/layout/statistics';

export default function HomePage() {
  return (
    <LenisProvider>
      <Hero>
        <Statistics />
      </Hero>
      <Marquee />
      <SelectedWork />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
    </LenisProvider>
  );
}
