import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: { href: string; label: string };
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <div className="mb-8 md:mb-12">
      {backLink && (
        <Link href={backLink.href} className="text-sm md:text-base text-gray-400 hover:text-white mb-6 md:mb-8 inline-block">
          ← {backLink.label}
        </Link>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">{title}</h1>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-gray-400">{description}</p>
      )}
    </div>
  );
}
