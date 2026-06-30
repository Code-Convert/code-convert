// TypeScript types for Web Design components

export interface Project {
  industry: string;
  name: string;
  description: string;
  services: string[];
  image: string;
}

export interface WebsiteShowcase {
  name: string;
  industry: string;
  image: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Testimonial {
  rating: number;
  quote: string;
  name: string;
  company: string;
  role: string;
}

export interface AnimatedHeadingProps {
  children: string;
  className?: string;
}

export interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  badge?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export interface StickyScrollProps {
  projects: Project[];
}

export interface WebsiteCarouselProps {
  websites: WebsiteShowcase[];
}

export interface StatsProps {
  stats: Stat[];
}

export interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
}
