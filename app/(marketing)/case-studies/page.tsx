'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';
import { ContentGrid } from '@/components/ui/content-grid';
import { ContentCard } from '@/components/ui/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { CaseStudy, INDUSTRIES, SERVICES } from '@/types/case-study';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';

const ITEMS_PER_PAGE = 6;

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaseStudies() {
      const supabase = createClient();
      const { data } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
      
      if (data) {
        setCaseStudies(data);
        setFilteredStudies(data);
      }
      setLoading(false);
    }
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    let filtered = caseStudies.filter(study => {
      const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = !industryFilter || study.industry === industryFilter;
      const matchesService = !serviceFilter || study.services?.includes(serviceFilter);
      return matchesSearch && matchesIndustry && matchesService;
    });
    setFilteredStudies(filtered);
    setCurrentPage(1);
  }, [searchTerm, industryFilter, serviceFilter, caseStudies]);

  const totalPages = Math.ceil(filteredStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudies = filteredStudies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white">
        <VoidBackground />
        <InteractiveCursor />
        <PageContainer>
          <PageHeader title="Case Studies" description="Real results from real projects. See how we've helped businesses grow." />
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
        title="Case Studies"
        description="Real results from real projects. See how we've helped businesses grow."
      />
      
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search case studies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF1E1E]/50"
        />
        
        <div className="flex flex-wrap gap-4">
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FF1E1E]/50"
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FF1E1E]/50"
          >
            <option value="">All Services</option>
            {SERVICES.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      {paginatedStudies.length > 0 ? (
        <>
          <ContentGrid>
            {paginatedStudies.map((study) => (
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
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
            >
              Start Your Project
            </a>
          </div>
        </>
      ) : (
        <EmptyState message={searchTerm || industryFilter || serviceFilter ? "No case studies found matching your filters." : "No case studies published yet."} />
      )}
      </PageContainer>
    </div>
  );
}
