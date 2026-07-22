'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { ChevronUp, ChevronDown, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { WEB_DEV_SERVICE } from '@/types/case-study'

interface CaseStudyRow {
  id: string
  title: string
  client: string
  services: string[]
  featured_image: string | null
  carousel_image: string | null
  industry: string | null
  published: boolean
  show_in_carousel: boolean
  gallery_order: number
  carousel_order: number
  roas: number | null
  performance_score: number | null
  is_custom_built: boolean
}

interface SiteStats {
  projects_delivered: number | null
  avg_performance_score: number | null
  avg_roas: number | null
  percent_custom_built: number | null
}

type Tab = 'gallery' | 'carousel' | 'stats'

export default function ContentManagementPage() {
  const [rows, setRows] = useState<CaseStudyRow[]>([])
  const [stats, setStats] = useState<SiteStats | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('gallery')
  const [gallerySearch, setGallerySearch] = useState('')
  const [carouselSearch, setCarouselSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)

  const supabase = createClient()

  const fetchRows = useCallback(async () => {
    const { data } = await supabase
      .from('case_studies')
      .select('id, title, client, services, featured_image, carousel_image, industry, published, show_in_carousel, gallery_order, carousel_order, roas, performance_score, is_custom_built')
      .order('gallery_order', { ascending: true })
    if (data) setRows(data as CaseStudyRow[])
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    const { data } = await supabase.rpc('get_site_statistics')
    setStats(data?.[0] ?? null)
    setStatsLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRows()
    fetchStats()
  }, [fetchRows, fetchStats])

  // ── Toggle published ──
  const togglePublished = async (row: CaseStudyRow) => {
    const next = !row.published
    setSaving(row.id + '-pub')
    setRows(prev => prev.map(r => r.id === row.id ? { ...r, published: next } : r))
    const { error } = await supabase
      .from('case_studies')
      .update({ published: next })
      .eq('id', row.id)
    if (error) fetchRows()
    setSaving(null)
  }

  // ── Toggle carousel ──
  const toggleCarousel = async (row: CaseStudyRow) => {
    const next = !row.show_in_carousel
    setSaving(row.id + '-car')
    setRows(prev => prev.map(r => r.id === row.id ? { ...r, show_in_carousel: next } : r))
    const { error } = await supabase
      .from('case_studies')
      .update({ show_in_carousel: next })
      .eq('id', row.id)
    if (error) fetchRows()
    setSaving(null)
  }

  // ── Swap gallery_order ──
  const swapGallery = async (idxA: number, idxB: number, list: CaseStudyRow[]) => {
    const a = list[idxA]
    const b = list[idxB]
    const aRealIdx = rows.findIndex(r => r.id === a.id)
    const bRealIdx = rows.findIndex(r => r.id === b.id)
    const next = [...rows]
    next[aRealIdx] = { ...a, gallery_order: b.gallery_order }
    next[bRealIdx] = { ...b, gallery_order: a.gallery_order }
    setRows(next)
    const [r1, r2] = await Promise.all([
      supabase.from('case_studies').update({ gallery_order: b.gallery_order }).eq('id', a.id),
      supabase.from('case_studies').update({ gallery_order: a.gallery_order }).eq('id', b.id),
    ])
    if (r1.error || r2.error) fetchRows()
  }

  // ── Swap carousel_order ──
  const swapCarousel = async (idxA: number, idxB: number, list: CaseStudyRow[]) => {
    const a = list[idxA]
    const b = list[idxB]
    const aRealIdx = rows.findIndex(r => r.id === a.id)
    const bRealIdx = rows.findIndex(r => r.id === b.id)
    const next = [...rows]
    next[aRealIdx] = { ...a, carousel_order: b.carousel_order }
    next[bRealIdx] = { ...b, carousel_order: a.carousel_order }
    setRows(next)
    const [r1, r2] = await Promise.all([
      supabase.from('case_studies').update({ carousel_order: b.carousel_order }).eq('id', a.id),
      supabase.from('case_studies').update({ carousel_order: a.carousel_order }).eq('id', b.id),
    ])
    if (r1.error || r2.error) fetchRows()
  }

  // Derived lists
  const galleryList = [...rows]
    .sort((a, b) => a.gallery_order - b.gallery_order)
    .filter(r => !gallerySearch || r.title.toLowerCase().includes(gallerySearch.toLowerCase()))

  // Carousel section shows ALL web-dev projects so you can add/remove any of them
  const carouselList = [...rows]
    .filter(r => r.services?.includes(WEB_DEV_SERVICE))
    .sort((a, b) => {
      // In-carousel items first, ordered by carousel_order; then non-carousel alphabetically
      if (a.show_in_carousel && !b.show_in_carousel) return -1
      if (!a.show_in_carousel && b.show_in_carousel) return 1
      if (a.show_in_carousel && b.show_in_carousel) return a.carousel_order - b.carousel_order
      return a.title.localeCompare(b.title)
    })
    .filter(r => !carouselSearch || r.title.toLowerCase().includes(carouselSearch.toLowerCase()))

  const inCarousel = carouselList.filter(r => r.show_in_carousel)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'gallery', label: 'Gallery Grid' },
    { id: 'carousel', label: 'Website Carousel' },
    { id: 'stats', label: 'Statistics' },
  ]

  if (loading) return <div className="text-white p-8">Loading...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Content Management</h1>
        <p className="text-white/70 mt-2">Control what appears on the homepage and in what order</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-[#FF1E1E] text-white'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Gallery Grid Tab ── */}
      {activeTab === 'gallery' && (
        <section className="space-y-4">
          <div>
            <p className="text-white/50 text-sm">
              All case studies — toggle visibility and drag to reorder. Only <span className="text-white">published</span> items appear on the live site.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by title..."
            value={gallerySearch}
            onChange={(e) => setGallerySearch(e.target.value)}
            className="w-full max-w-sm px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white text-sm"
          />

          <div className="rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3 w-14"></th>
                  <th className="text-left px-4 py-3">Project</th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">Services</th>
                  <th className="text-center px-4 py-3 w-28">Visible</th>
                  <th className="text-right px-4 py-3 w-20">Order</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {galleryList.map((row, idx) => (
                  <tr key={row.id} className={`border-t border-white/5 transition-colors ${row.published ? 'hover:bg-white/5' : 'opacity-50 hover:bg-white/5'}`}>
                    <td className="px-4 py-3">
                      {row.featured_image ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-800 shrink-0">
                          <Image src={row.featured_image} alt={row.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-800 shrink-0" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white font-medium leading-tight">{row.title}</p>
                      <p className="text-white/40 text-xs mt-0.5">{row.client}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(row.services ?? []).map(s => (
                          <span key={s} className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {s.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePublished(row)}
                        disabled={saving === row.id + '-pub'}
                        title={row.published ? 'Click to unpublish' : 'Click to publish'}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          row.published
                            ? 'bg-green-500/15 text-green-400 hover:bg-red-500/15 hover:text-red-400'
                            : 'bg-white/10 text-white/40 hover:bg-green-500/15 hover:text-green-400'
                        } disabled:opacity-50`}
                      >
                        {row.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {row.published ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right text-white/40 tabular-nums">{row.gallery_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => swapGallery(idx, idx - 1, galleryList)}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                          aria-label="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => swapGallery(idx, idx + 1, galleryList)}
                          disabled={idx === galleryList.length - 1}
                          className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                          aria-label="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {galleryList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-white/30">
                      No case studies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Carousel Tab ── */}
      {activeTab === 'carousel' && (
        <section className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/50 text-sm">
                Only <span className="text-white">Web Design &amp; Development</span> projects can appear in the carousel.
                Toggle a project on to add it. Reorder active items with the arrows.
              </p>
              <p className="text-white/30 text-xs mt-1">
                {inCarousel.length} active · non-carousel projects shown below for easy toggling
              </p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by title..."
            value={carouselSearch}
            onChange={(e) => setCarouselSearch(e.target.value)}
            className="w-full max-w-sm px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white text-sm"
          />

          <div className="rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3 w-14"></th>
                  <th className="text-left px-4 py-3">Project</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Industry</th>
                  <th className="text-center px-4 py-3 w-32">In Carousel</th>
                  <th className="text-right px-4 py-3 w-20">Order</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {carouselList.map((row, idx) => {
                  const thumb = row.carousel_image || row.featured_image
                  // index within the in-carousel sorted list (for arrow controls)
                  const carouselIdx = inCarousel.findIndex(r => r.id === row.id)
                  return (
                    <tr
                      key={row.id}
                      className={`border-t border-white/5 transition-colors hover:bg-white/5 ${
                        row.show_in_carousel ? '' : 'opacity-50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        {thumb ? (
                          <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-800 shrink-0">
                            <Image src={thumb} alt={row.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-800 shrink-0" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium leading-tight">{row.title}</p>
                        <p className="text-white/40 text-xs mt-0.5">{row.client}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-white/50">{row.industry ?? '—'}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleCarousel(row)}
                          disabled={saving === row.id + '-car'}
                          title={row.show_in_carousel ? 'Remove from carousel' : 'Add to carousel'}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            row.show_in_carousel
                              ? 'bg-[#FF1E1E]/15 text-[#FF1E1E] hover:bg-white/10 hover:text-white/50'
                              : 'bg-white/10 text-white/40 hover:bg-[#FF1E1E]/15 hover:text-[#FF1E1E]'
                          } disabled:opacity-50`}
                        >
                          {row.show_in_carousel ? 'Active' : 'Add'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right text-white/40 tabular-nums">
                        {row.show_in_carousel ? row.carousel_order : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {row.show_in_carousel && (
                          <div className="flex gap-1 justify-end">
                            <button
                              onClick={() => swapCarousel(carouselIdx, carouselIdx - 1, inCarousel)}
                              disabled={carouselIdx === 0}
                              className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                              aria-label="Move up"
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              onClick={() => swapCarousel(carouselIdx, carouselIdx + 1, inCarousel)}
                              disabled={carouselIdx === inCarousel.length - 1}
                              className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                              aria-label="Move down"
                            >
                              <ChevronDown size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {carouselList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-white/30">
                      No Web Design &amp; Development case studies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Statistics Tab ── */}
      {activeTab === 'stats' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">
                Computed from published case studies with ROAS / performance score filled in.
                Edit individual case studies to update these values.
              </p>
            </div>
            <button
              onClick={fetchStats}
              disabled={statsLoading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={statsLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {/* Live stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Projects Delivered', value: stats?.projects_delivered, suffix: '' },
              { label: 'Avg Performance Score', value: stats?.avg_performance_score, suffix: '' },
              { label: 'Average ROAS', value: stats?.avg_roas, suffix: 'x' },
              { label: '% Custom Built', value: stats?.percent_custom_built, suffix: '%' },
            ].map(({ label, value, suffix }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-white">
                  {value != null ? `${value}${suffix}` : '—'}
                </p>
                <p className="text-xs text-white/50 mt-2">{label}</p>
              </div>
            ))}
          </div>

          {stats == null && (
            <p className="text-white/30 text-sm text-center">
              No data yet — publish case studies and fill in ROAS / Performance Score fields to populate these.
            </p>
          )}

          {/* Per-project breakdown */}
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-3">Per-project stat inputs</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-4 py-3">Project</th>
                    <th className="text-center px-4 py-3 w-28">Published</th>
                    <th className="text-center px-4 py-3 w-28">ROAS</th>
                    <th className="text-center px-4 py-3 w-36">Perf. Score</th>
                    <th className="text-center px-4 py-3 w-32">Custom Built</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id} className={`border-t border-white/5 hover:bg-white/5 ${!row.published ? 'opacity-40' : ''}`}>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{row.title}</p>
                        <p className="text-white/40 text-xs">{row.client}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.published ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/30'}`}>
                          {row.published ? 'Live' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-white/60">
                        {row.roas != null ? `${row.roas}x` : <span className="text-white/20">—</span>}
                      </td>
                      <td className="px-4 py-3 text-center text-white/60">
                        {row.performance_score != null ? row.performance_score : <span className="text-white/20">—</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.is_custom_built ? 'bg-blue-500/15 text-blue-400' : 'bg-white/10 text-white/30'}`}>
                          {row.is_custom_built ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-white/30">No case studies yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
