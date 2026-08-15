'use client';

import { useState } from 'react';
import OnboardingForm from '@/components/ui/multistep-form';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const socials = [
  { name: "LinkedIn", href: "#", icon: FaLinkedin },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "Facebook", href: "#", icon: FaFacebook },
  { name: "Twitter", href: "#", icon: FaTwitter },
];

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 overflow-x-hidden selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start align-center">
          {/* Left Column */}
          <div className="lg:sticky lg:top-32 space-y-6 px-5">
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
            <div className="pt-6 space-y-4">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF1E1E] text-white font-semibold text-base hover:bg-[#FF1E1E]/90 transition-colors duration-200"
              >
                Get Started
              </button>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group w-14 h-14 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-[#FF1E1E] hover:bg-[#FF1E1E]/10 hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5 text-white/70 transition-colors duration-300 group-hover:text-[#FF1E1E]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Contact CTAs */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-32">
            <a
              href="tel:+27000000000"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm hover:border-[#FF1E1E] hover:bg-[#FF1E1E]/5 transition-all duration-300"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF1E1E]/10 border border-[#FF1E1E]/20 flex items-center justify-center group-hover:bg-[#FF1E1E]/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#FF1E1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Prefer to talk?</p>
                <p className="text-white font-semibold text-lg leading-tight">Request a Call</p>
                <p className="text-gray-400 text-sm mt-0.5">We&apos;ll call you back within 1 business day</p>
              </div>
            </a>

            <a
              href="https://wa.me/27000000000?text=Hi%20Code%20%26%20Convert%2C%20I%27d%20like%20to%20get%20in%20touch"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Chat with us</p>
                <p className="text-white font-semibold text-lg leading-tight">WhatsApp Message</p>
                <p className="text-gray-400 text-sm mt-0.5">Message Code &amp; Convert directly</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <OnboardingForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sourcePage="contact-us"
      />
    </div>
  );
}
