interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-8 mb-12">
      <p className="text-xl italic mb-4">"{quote}"</p>
      <p className="text-gray-400">
        — {author}
        {role && `, ${role}`}
      </p>
    </div>
  );
}
