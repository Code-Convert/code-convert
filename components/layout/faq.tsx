'use client';

import { FAQSection } from "@/components/ui/faqsection";

const faqsLeft = [
  {
    question: "What services do you offer?",
    answer:
      "We offer web design & development, social media strategy & management, content creation & marketing, and community engagement services. Each service is tailored to your specific business goals.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects follow our 3-week blueprint: Week 1 for strategy and planning, Week 2 for design and development, and Week 3 for launch and optimisation.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Absolutely. We work with businesses of all sizes, from startups to established enterprises, tailoring our services and pricing to fit your budget and growth stage.",
  },
];

const faqsRight = [
  {
    question: "What makes Code & Convert different?",
    answer:
      "We combine strategic thinking, compelling design, and technical excellence with data-driven optimisation. Every decision is backed by research and metrics.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We establish clear KPIs at the start of every project — whether conversion rates, engagement metrics, or revenue growth — and track performance continuously.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing based on project scope, complexity, and timeline. Contact us for a free consultation and detailed proposal.",
  },
];

export default function ServicesFAQ() {
  return (
    <FAQSection
      subtitle="Questions?"
      title="Frequently Asked Questions"
      description="Everything you need to know about our services and process."
      buttonLabel="Book a Free Strategy Call →"
      onButtonClick={() => (window.location.href = "/contact-us")}
      faqsLeft={faqsLeft}
      faqsRight={faqsRight}
      className="py-24 md:py-32"
    />
  );
}
