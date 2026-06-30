'use client';

import { motion } from 'motion/react';
import HeroBackgroundPaths from '@/components/layout/HeroBackgroundPaths';
import StickyScroll from '@/components/layout/StickyScroll';
import WebsiteCarousel from '@/components/layout/WebsiteCarousel';
import AnimatedStats from '@/components/ui/animated-stats';
import TestimonialsGrid from '@/components/ui/testimonials-grid';
import Section, { SectionHeader } from '@/components/ui/section';
import CTAButton from '@/components/ui/CTA_Button';

// Project data for sticky scroll
const projects = [
  {
    industry: 'E-Commerce',
    name: 'StyleHub Fashion',
    description:
      'A premium fashion e-commerce experience designed to improve mobile shopping, streamline checkout journeys and increase conversions across all devices.',
    services: ['E-Commerce Development', 'Mobile Optimisation', 'Conversion Optimisation'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
  },
  {
    industry: 'Luxury Retail',
    name: 'Mbali Jewellery',
    description:
      'A luxury-focused digital storefront crafted to elevate brand perception, showcase collections and create a seamless online purchasing experience.',
    services: ['Luxury UX Design', 'Mobile Commerce', 'Product Storytelling'],
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop',
  },
  {
    industry: 'Corporate / Fintech',
    name: 'Fintech Solutions',
    description:
      'A conversion-focused corporate platform designed to establish authority, communicate services clearly and generate qualified leads.',
    services: ['Lead Generation', 'SEO Foundations', 'Performance Optimisation'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
  },
  {
    industry: 'Property',
    name: 'Prime Estates',
    description:
      'A modern property platform built to simplify discovery, improve user engagement and increase enquiry volume.',
    services: ['Property Search Experience', 'Lead Capture', 'Mobile Optimisation'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
  },
];

// Website carousel data
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

// Statistics data
const stats = [
  { value: '150', suffix: '+', label: 'Projects Delivered' },
  { value: '95', suffix: '+', label: 'Performance Scores' },
  { value: '4.8', suffix: 'x', label: 'Average ROAS' },
  { value: '100', suffix: '%', label: 'Custom Built' },
];

// Testimonials data
const testimonials = [
  {
    rating: 5,
    quote:
      'Working with this team transformed our online presence. Our conversion rate increased by 240% in the first three months, and customer feedback has been exceptional.',
    name: 'Sarah Mitchell',
    company: 'StyleHub Fashion',
    role: 'Founder & CEO',
  },
  {
    rating: 5,
    quote:
      'The attention to detail and strategic thinking behind every design decision was impressive. Our bounce rate dropped by 60% and time on site doubled.',
    name: 'David Khumalo',
    company: 'Prime Estates',
    role: 'Marketing Director',
  },
  {
    rating: 5,
    quote:
      'Not only did they deliver a stunning website, but the SEO foundation they built helped us rank on page 1 for our most competitive keywords within 6 months.',
    name: 'Lisa Chen',
    company: 'Apex Consulting',
    role: 'Managing Partner',
  },
  {
    rating: 5,
    quote:
      'The mobile experience they created for our e-commerce store resulted in a 180% increase in mobile conversions. Our customers love the new checkout flow.',
    name: 'James van der Merwe',
    company: 'Verde Organics',
    role: 'E-Commerce Manager',
  },
  {
    rating: 5,
    quote:
      'From discovery to launch, the process was seamless. They truly understood our brand and translated it into a digital experience that resonates with our audience.',
    name: 'Thandiwe Nkosi',
    company: 'Mbali Jewellery',
    role: 'Creative Director',
  },
  {
    rating: 5,
    quote:
      'The performance optimisation work they did was game-changing. Our site now loads in under 2 seconds, and Google PageSpeed scores are consistently in the 90s.',
    name: 'Michael Roberts',
    company: 'Fintech Solutions',
    role: 'CTO',
  },
];

export default function WebDesignPage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-[#FF1E1E]/20 selection:text-white">
      {/* Content */}
      <div className="relative">
        {/* SECTION 1: HERO */}
        <HeroBackgroundPaths
          title="We Build High-Converting Websites For Growing Brands"
          subtitle="We leverage data-backed Conversion Rate Optimisation and precision-driven digital strategy to help ambitious businesses break through revenue plateaus and unlock sustainable growth."
          primaryCTA={{
            text: "Book A Meeting",
            href: "/contact",
            badge: "30-Minute Call • Free",
          }}
          secondaryCTA={{
            text: "View Our Work",
            href: "#projects",
          }}
        />

        {/* SECTION 2: STICKY PROJECT SHOWCASE */}
        <Section id="projects" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 md:mb-24">
            <SectionHeader
              subtitle="Selected Projects"
              title="See How Strategy, Design & Performance Combine"
              description="Explore how we combine strategic thinking, compelling design and technical excellence to create measurable business growth for our clients."
            />
          </div>

          <StickyScroll projects={projects} />
        </Section>

        {/* SECTION 3: WEBSITE SHOWCASE CAROUSEL */}
        <Section className="py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
            <SectionHeader
              subtitle="Recent Launches"
              title="Website Launches"
              description="A selection of websites designed and developed for brands across South Africa."
            />
          </div>

          <WebsiteCarousel websites={websites} />
        </Section>

        {/* SECTION 4: OUR WORK + STATS */}
        <Section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 md:mb-20">
              <SectionHeader
                subtitle="Our Work"
                title="A Track Record Of Market Dominance"
                description="We let the numbers do the talking. Explore the strategies, campaigns and digital experiences that transformed ambitious goals into measurable business growth."
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <CTAButton href="/case-studies" variant="secondary">
                  See More Projects
                </CTAButton>
              </motion.div>
            </div>

            {/* Stats */}
            <AnimatedStats stats={stats} />
          </div>
        </Section>

        {/* SECTION 5: TESTIMONIALS */}
        <Section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              subtitle="Client Success Stories"
              title="Trusted By Industry-Leading Companies"
              description="Real feedback from businesses across South Africa that trusted us to build, optimise and scale their digital presence."
            />

            <TestimonialsGrid testimonials={testimonials} />
          </div>
        </Section>

        {/* SECTION 6: FINAL CTA */}
        <Section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-[#FF1E1E]/20 via-[#FF1E1E]/10 to-[#FF1E1E]/20 blur-3xl" />

              {/* CTA Card */}
              <div className="relative p-8 md:p-12 lg:p-16 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  Get Your Scaling Strategy
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-400 text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
                >
                  From idea to investment, MVP to market — we adapt to your goals and build around
                  what your product truly needs.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <CTAButton href="/contact" variant="primary">
                    Book 1:1 Meeting
                  </CTAButton>

                  <CTAButton href="/contact" variant="secondary">
                    Request A Callback
                  </CTAButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}
