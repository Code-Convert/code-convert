'use client';

import { FAQSection } from "@/components/ui/faqsection";

const faqsLeft = [
  {
    question: "What does Code & Convert actually do?",
    answer:
      "We provide the marketing capabilities businesses need to build and maintain a strong presence — from web design and e-commerce to social media, paid advertising, email marketing and traditional marketing.\n\nYou can work with us on a specific project or bring us in as your ongoing marketing team.",
  },
  {
    question: "Can I work with you on just one service?",
    answer:
      "Absolutely. You don't need to use everything we offer. We can help with a specific need — such as a website, Shopify store or paid advertising — or combine services into an ongoing marketing retainer as your business requires.",
  },
  {
    question: "Do you offer ongoing marketing retainers?",
    answer:
      "Yes. Our retainers are designed for businesses that need consistent marketing support without building a full internal marketing department.\n\nThe scope is tailored around what your business needs, with the specific services, deliverables and frequency agreed upfront.",
  },
  {
    question: "How do you decide what my business actually needs?",
    answer:
      "We start by understanding your business, current marketing and objectives before recommending what makes sense. We don't believe in adding services simply because they're on a checklist — the focus is on identifying what will actually help your business.",
  },
  {
    question: "How long does a website or e-commerce project take?",
    answer:
      "It depends on the scope, number of pages or products, functionality and how quickly we receive the information and feedback needed from you. Once we've understood the project, we'll provide a clear timeline before work begins.\n\nOnce your site is live, we can also host and manage it for you, giving you ongoing technical support without having to manage the website yourself.",
  },
];

const faqsRight = [
  {
    question: "Who hosts and manages my website?",
    answer:
      "We can host and manage your website for you, taking care of the ongoing technical side so you don't have to. This can include hosting, updates, maintenance, security and general website management.\n\nYour business retains ownership of the website and its underlying assets, while we handle the day-to-day technical management.",
  },
  {
    question: "Is advertising spend included in your paid advertising fees?",
    answer:
      "No. Our management fee covers the strategy, setup, creative, management and optimisation of your campaigns. Your advertising budget is separate and is paid directly to the relevant advertising platform.",
  },
  {
    question: "Who owns my website, ad accounts and marketing assets?",
    answer:
      "Your business retains ownership of its digital assets. We can work within your existing accounts or help set them up correctly, so your website, advertising accounts, social profiles and other business assets remain connected to your business.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "That depends on the service. Project-based work is scoped and agreed upfront, while ongoing marketing is structured as a monthly retainer based on the agreed scope.\n\nWe'll explain the commitment, deliverables and payment structure before you start.",
  },
  {
    question: "Do you work with businesses outside Johannesburg?",
    answer:
      "Yes. We're based in Johannesburg and work with businesses across South Africa. Much of the work can be handled remotely, while certain projects — such as physical activations, signage or on-site marketing — can be planned according to location.",
  },
  {
    question: "How much does your marketing cost?",
    answer:
      "There isn't one fixed price because the right scope depends on your business, objectives and the level of support you need.\n\nWe provide a tailored proposal based on the work involved, rather than forcing every business into the same package.",
  },
];

export default function ServicesFAQ() {
  return (
    <FAQSection
      subtitle="Questions?"
      title="Frequently Asked Questions"
      description="A few things you might want to know before we get started."
      buttonLabel="Book Your Free Strategy Session →"
      onButtonClick={() => (window.location.href = "/contact-us")}
      faqsLeft={faqsLeft}
      faqsRight={faqsRight}
      className="py-24 md:py-32"
    />
  );
}
