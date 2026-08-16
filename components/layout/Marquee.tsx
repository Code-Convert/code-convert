'use client';

const items = [
  'Paid Search',
  'Social Advertising',
  'Technical SEO',
  'Conversion Rate Optimisation',
  'Email Automation',
  'Data Analytics'
];

export default function Marquee() {
  return (
    <div className="relative z-10 border-y border-white/3 py-3.5 overflow-hidden bg-[#050505]/50 backdrop-blur-sm">
      <div className="animate-marquee flex items-center gap-10 w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-xs font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-[#FF1E1E]/30" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
