'use client';

import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import Section, { SectionHeader } from '@/components/ui/section';
import CTAButton from '@/components/ui/CTA_Button';
import { motion } from 'motion/react';
import Link from 'next/link';

const content = [
  {
    industry: 'E-Commerce',
    name: 'Peak Activewear',
    description:
      'A custom Shopify store built to launch a premium activewear brand with a seamless mobile shopping experience and a conversion-focused customer journey.',
    services: [
      'Custom Shopify Theme Development',
      'Product Page Design & Build',
      'Collections & Category Architecture',
      'Mobile-First Shopping Experience',
      'Checkout Flow Optimisation',
      'Brand Visual Design',
      'App Integration & Configuration',
      'Speed & Performance Optimisation',
      'Launch QA & Testing',
    ],
    image: '/images/case-studies/peak-homepage.png',
    mobileVideo: '/videos/peak-mobile.mp4',
    mobileVideoPoster: '/images/case-studies/peak-mobile-poster.jpg',
  },
  {
    industry: 'Luxury Retail',
    name: 'Jason B Jewellery',
    description:
      'A refined e-commerce platform designed to showcase a curated collection of jewellery and watches through a premium, intuitive shopping experience — balancing luxury brand presentation with a seamless customer journey across desktop and mobile.',
    services: [
      'Custom E-Commerce Development',
      'Product & Collection Architecture',
      'Premium Brand Visual Design',
      'Mobile-First Shopping Experience',
      'Yoco Payment Integration',
      'Product Page Optimisation',
      'Launch QA & Testing',
    ],
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop',
    mobileVideo: '/videos/jasonb-mobile.mp4',
    mobileVideoPoster: '/images/case-studies/jasonb-poster.jpg',
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

export default function SelectedProjects() {
  return (
    <Section id="projects" className="py-12 md:py-24">
      <div className="max-w-7xl px-4 sm:px-6 z-100 mx-auto">
        <SectionHeader
          title="See Strategy, Design & Execution Combined"
          description="Explore how we combine strategic thinking, compelling design and technical excellence to create measurable business growth for our clients."
        />
      </div>

      <StickyScroll content={content} />
    </Section>
  );
}
