'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { ChevronUp, ChevronDown, X } from 'lucide-react'

interface GalleryRow {
  id: string
  title: string
  services: string[]
  featured_image: string | null
  gallery_order: number
}

interface CarouselRow {
  id: string
  title: string
  industry: string | null
  carousel_image: string | null
  featured_image: string | null
  carousel_order: number
}

interface SiteStats {
  projects_delivered: number | null
  avg_performance_score: number | null
  avg_roas: number | null
  percent_custom_built: number | null
}

export default function ContentPlacementPage() {
  const [gallery, setGallery] = useState<GalleryRow[]>([])
  const [carousel, setCarousel] = useState<CarouselRow[]>([])
  const [stats, setStats] = useState<SiteStats | null>(null)
  const [gallerySearch, setGallerySearch] = useState('')
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const fetchAll = useCallback(async () => {
    const [galleryRes, carouselRes, statsRes] = await Promise.all([
      supabase
        .from('case_studies')
        .select('id, title, services, featured_image, gallery_order')
        .eq('published', true)
        .order('gallery_order', { ascending: true }),
      supabase
        .from('case_studies')
        .select('id, title, industry, carousel_image, featured_image, carousel_order')
        .eq('published', true)
        .eq('show_in_carousel', true)
        .order('carousel_order', { ascending: true }),
      supabase.rpc('get_site_statistics'),
    ])

    if (galleryRes.data) setGallery(galleryRes.data as GalleryRow[])
    if (carouselRes.data) setCarousel(carouselRes.data as CarouselRow[])
    if (statsRes.data) setStats(statsRes.data[0] ?? null)
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchAll() }, [fetchAll])

  const swapGalleryOrder = async (indexA: number, indexB: number) => {
    const a = gallery[indexA]
    const b = gallery[indexB]
    const next = [...gallery]
    next[indexA] = { ...a, gallery_order: b.gallery_order }
    next[indexB] = { ...b, gallery_order: a.gallery_order }
    next.sort((x, y) => x.gallery_order - y.gallery_order)
    setGallery(next)

    const [r1, r2] = await Promise.all([
      supabase.from('case_studies').update({ gallery_order: b.gallery_order }).eq('id', a.id),
      supabase.from('case_studies').update({ gallery_order: a.gallery_order }).eq('id', b.id),
    ])
    if (r1.error || r2.error) fetchAll()
  }

  const swapCarouselOrder = async (indexA: number, indexB: number) => {
    const a = carousel[indexA]
    const b = carousel[indexB]
    const next = [...carousel]
    next[indexA] = { ...a, carousel_order: b.carousel_order }
    next[indexB] = { ...b, carousel_order: a.carousel_order }
    next.sort((x, y) => x.carousel_order - y.carousel_order)
    setCarousel(next)

    const [r1, r2] = await Promise.all([
      supabase.from('case_studies').update({ carousel_order: b.carousel_order }).eq('id', a.id),
      supabase.from('case_studies').update({ carousel_order: a.carousel_order }).eq('id', b.id),
    ])
    if (r1.error || r2.error) fetchAll()
  }

  const removeFromCarousel = async (id: string) => {
    setCarousel(prev => prev.filter(c => c.id !== id))
    const { error } = await supabase
      .from('case_studies')
      .update({ show_in_carousel: false })
      .eq('id', id)
    if (error) fetchAll()
  }

  const filteredGallery = gallerySearch
    ? gallery.filter(g => g.title.toLowerCase().includes(gallerySearch.toLowerCase()))
    : gallery

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white">Homepage Content</h1>
        <p className="text-white/70 mt-2">Manage gallery order, carousel, and live statistics</p>
      </div>

      {/* ── 1. Gallery Grid ── */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-1">Gallery Grid</h2>
        <p className="text-white/50 text-sm mb-4">All published case studies — ordered by Gallery Order</p>

        <input
          type="text"
          placeholder="Search by title..."
          value={gallerySearch}
          onChange={(e) => setGallerySearch(e.target.value)}
          className="mb-4 w-full max-w-sm px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white text-sm"
        />

        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50">
              <tr>
                <th className="text-left px-4 py-3 w-12"></th>
                <th className="text-left px-4 py-3">Project</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Services</th>
                <th className="text-right px-4 py-3 w-24">Order</th>
                <th className="px-4 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {filteredGallery.map((row) => {
                const realIdx = gallery.findIndex(g => g.id === row.id)
                return (
                  <tr key={row.id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3">
                      {row.featured_image ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-800">
                          <Image src={row.featured_image} alt={row.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-800" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{row.title}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(row.services ?? []).map(s => (
                          <span key={s} className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                            {s.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-white/50">{row.gallery_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => swapGalleryOrder(realIdx, realIdx - 1)}
                          disabled={realIdx === 0}
                          className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                          aria-label="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => swapGalleryOrder(realIdx, realIdx + 1)}
                          disabled={realIdx === gallery.length - 1}
                          className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                          aria-label="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredGallery.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                    No published case studies yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 2. Website Carousel ── */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-1">
          Website Carousel{' '}
          <span className="text-white/40 font-normal text-sm">(Web Design projects only)</span>
        </h2>
        <p className="text-white/50 text-sm mb-4">
          Only case studies with &quot;Web Design &amp; Development&quot; and carousel enabled — ordered by Carousel Order
        </p>

        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50">
              <tr>
                <th className="text-left px-4 py-3 w-12"></th>
                <th className="text-left px-4 py-3">Project</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Industry</th>
                <th className="text-right px-4 py-3 w-24">Order</th>
                <th className="px-4 py-3 w-28"></th>
              </tr>
            </thead>
            <tbody>
              {carousel.map((row, idx) => {
                const thumb = row.carousel_image || row.featured_image
                return (
                  <tr key={row.id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3">
                      {thumb ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-800">
                          <Image src={thumb} alt={row.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-800" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{row.title}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-white/60">{row.industry ?? '—'}</td>
                    <td className="px-4 py-3 text-right text-white/50">{row.carousel_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => swapCarouselOrder(idx, idx - 1)}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                          aria-label="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => swapCarouselOrder(idx, idx + 1)}
                          disabled={idx === carousel.length - 1}
                          className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-white"
                          aria-label="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCarousel(row.id)}
                          className="p-1 rounded hover:bg-[#FF1E1E]/20 text-[#FF1E1E]"
                          aria-label="Remove from carousel"
                          title="Remove from carousel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {carousel.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                    No carousel items yet — enable carousel on a Web Design case study
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 3. Homepage Statistics Preview ── */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-1">Homepage Statistics</h2>
        <p className="text-white/50 text-sm mb-4">
          Live computed values from published case studies — read only
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Projects Delivered', value: stats?.projects_delivered ?? '—', suffix: '' },
            { label: 'Avg Performance Score', value: stats?.avg_performance_score ?? '—', suffix: '' },
            { label: 'Average ROAS', value: stats?.avg_roas ?? '—', suffix: 'x' },
            { label: '% Custom Built', value: stats?.percent_custom_built ?? '—', suffix: '%' },
          ].map(({ label, value, suffix }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {value}{value !== '—' ? suffix : ''}
              </p>
              <p className="text-xs text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
