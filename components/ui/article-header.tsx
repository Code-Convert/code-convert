import Link from 'next/link';

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  backLink?: { href: string; label: string };
}

export function ArticleHeader({ title, subtitle, date, tags, backLink }: ArticleHeaderProps) {
  return (
    <div className="mb-8 md:mb-12">
      {backLink && (
        <Link href={backLink.href} className="text-sm md:text-base text-gray-400 hover:text-white mb-6 md:mb-8 inline-block">
          ← {backLink.label}
        </Link>
      )}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4">{title}</h1>
      {subtitle && <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 md:mb-8">{subtitle}</p>}
      {date && (
        <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-[#FF1E1E]/20 text-[#FF1E1E] rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
