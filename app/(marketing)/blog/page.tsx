'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';
import { ContentGrid } from '@/components/ui/content-grid';
import { ContentCard } from '@/components/ui/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { BlogPost } from '@/types/blog';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';

const BLOGS_PER_PAGE = 6;

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const supabase = createClient();
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
      
      if (data) {
        setBlogs(data);
        setFilteredBlogs(data);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, blogs]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  if (loading) {
    return (
      <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white">
        <VoidBackground />
        <InteractiveCursor />
        <PageContainer>
          <PageHeader title="Blog" description="Insights, tips, and stories from the world of web development." />
          <div className="text-center text-neutral-500">Loading...</div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />
      <PageContainer>
      <PageHeader
        title="Blog"
        description="Insights, tips, and stories from the world of web development."
      />
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF1E1E]/50"
        />
      </div>

      {paginatedBlogs.length > 0 ? (
        <>
          <ContentGrid>
            {paginatedBlogs.map((blog) => (
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
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </>
      ) : (
        <EmptyState message={searchTerm ? "No blogs found matching your search." : "No blog posts published yet."} />
      )}
      </PageContainer>
    </div>
  );
}
