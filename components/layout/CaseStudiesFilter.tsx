'use client';

import { useState } from 'react';
import { ContentGrid } from '@/components/ui/content-grid';
import { ContentCard } from '@/components/ui/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { CaseStudy, INDUSTRIES, SERVICES } from '@/types/case-study';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ITEMS_PER_PAGE = 6;

export default function CaseStudiesFilter({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = caseStudies.filter(study => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !industryFilter || study.industry === industryFilter;
    const matchesService = !serviceFilter || study.services?.includes(serviceFilter);
    return matchesSearch && matchesIndustry && matchesService;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const resetPage = () => setCurrentPage(1);

  return (
    <>
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search case studies..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); resetPage(); }}
          className="w-full max-w-md px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF1E1E]/50"
        />
        <div className="flex flex-wrap gap-4">
          <Select value={industryFilter || '__all__'} onValueChange={(v) => { setIndustryFilter(v === '__all__' ? '' : v); resetPage(); }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Industries</SelectItem>
              {INDUSTRIES.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={serviceFilter || '__all__'} onValueChange={(v) => { setServiceFilter(v === '__all__' ? '' : v); resetPage(); }}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Services</SelectItem>
              {SERVICES.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {paginated.length > 0 ? (
        <>
          <ContentGrid>
            {paginated.map((study) => (
              <ContentCard
                key={study.id}
                href={`/case-studies/${study.slug}`}
                image={study.featured_image}
                title={study.title}
                subtitle={study.client}
                tags={study.services}
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
              Start Your Project
            </a>
          </div>
        </>
      ) : (
        <EmptyState message={searchTerm || industryFilter || serviceFilter ? 'No case studies found matching your filters.' : 'No case studies published yet.'} />
      )}
    </>
  );
}
