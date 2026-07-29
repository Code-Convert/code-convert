'use client';

import { useState } from 'react';
import { ContentGrid } from '@/components/ui/content-grid';
import { ContentCard } from '@/components/ui/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { BlogPost } from '@/types/blog';

const BLOGS_PER_PAGE = 6;

export default function BlogFilter({ blogs }: { blogs: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
  const start = (currentPage - 1) * BLOGS_PER_PAGE;
  const paginated = filtered.slice(start, start + BLOGS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF1E1E]/50"
        />
      </div>

      {paginated.length > 0 ? (
        <>
          <ContentGrid>
            {paginated.map((blog) => (
              <ContentCard
                key={blog.id}
                href={`/blog/${blog.slug}`}
                image={blog.featured_image}
                title={blog.title}
                excerpt={blog.excerpt}
                date={blog.published_at}
              />
            ))}
          </ContentGrid>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-[#FF1E1E] text-white'
                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </>
      ) : (
        <EmptyState message={searchTerm ? 'No blogs found matching your search.' : 'No blog posts published yet.'} />
      )}
    </>
  );
}
