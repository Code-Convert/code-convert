interface TestimonialCardProps {
  quote: string;
  author: string | null;
  role?: string | null;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  if (!author) return null;
  
  return (
    <div className="bg-white/5 rounded-lg p-8 mb-12">
      <p className="text-xl italic mb-4">&ldquo;{quote}&rdquo;</p>
      <p className="text-gray-400">
        — {author}
        {role && `, ${role}`}
      </p>
    </div>
  );
}
