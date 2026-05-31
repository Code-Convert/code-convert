import Image from 'next/image';
import Link from 'next/link';

interface ContentCardProps {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  excerpt?: string;
  date?: string;
}

export function ContentCard({ href, image, title, subtitle, tags, excerpt, date }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
    >
      {image ? (
        <div className="aspect-video bg-white/5 overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-white/5 flex items-center justify-center">
          <span className="text-white/30">No image</span>
        </div>
      )}
      <div className="p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-[#FF1E1E] transition-colors">
          {title}
        </h2>
        {subtitle && <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">{subtitle}</p>}
        {excerpt && <p className="text-sm md:text-base text-gray-400 line-clamp-3">{excerpt}</p>}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-[#FF1E1E]/20 text-[#FF1E1E] rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        {date && (
          <p className="text-sm text-gray-500 mt-4">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
