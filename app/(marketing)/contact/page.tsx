'use client';

import OnboardingForm from '@/components/ui/multistep-form';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const socials = [
  {
    name: "LinkedIn",
    href: "#",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "#",
    icon: FaFacebook,
  },
  {
    name: "Twitter",
    href: "#",
    icon: FaTwitter,
  },
];

export default function ContactUs() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 overflow-x-hidden selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start align-center">
          {/* Left Column - Title & Description */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Let&apos;s Build Your Brand
            </h1>
            <p className="text-base sm:text-sm text-gray-400">
              Answer a few questions to help us understand your vision and requirements. We&apos;ll use this information to create the perfect website for your needs.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF1E1E] mt-2" />
                <div>
                  <h3 className="font-semibold text-lg">Quick & Easy</h3>
                  <p className="text-gray-400 text-sm">Takes only 5 minutes to complete</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF1E1E] mt-2" />
                <div>
                  <h3 className="font-semibold text-lg">Personalized Service</h3>
                  <p className="text-gray-400 text-sm">We tailor our approach to your specific needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF1E1E] mt-2" />
                <div>
                  <h3 className="font-semibold text-lg">No Obligation</h3>
                  <p className="text-gray-400 text-sm">Get a free consultation after submission</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="
                    group
                    w-14 h-14
                    rounded-2xl
                    bg-white/3
                    border border-white/10
                    backdrop-blur-sm
                    flex items-center justify-center
                    transition-all duration-300
                    hover:border-[#FF1E1E]
                    hover:bg-[#FF1E1E]/10
                    hover:-translate-y-1
                  "
                >
                  <social.icon
                    className="
                      w-5 h-5
                      text-white/70
                      transition-colors duration-300
                      group-hover:text-[#FF1E1E]
                    "
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
