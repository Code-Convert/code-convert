'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ImageUpload } from '@/components/ui/image-upload'
import { slugify } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { INDUSTRIES, SERVICES, WEB_DEV_SERVICE } from '@/types/case-study'
import type { CaseStudy } from '@/types/case-study'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    industry: '',
    services: [] as string[],
    challenge: '',
    solution: '',
    results: '',
    content: '',
    featured_image: '',
    testimonial_text: '',
    testimonial_author: '',
    testimonial_role: '',
    seo_title: '',
    seo_description: '',
    published: false,
    show_in_carousel: false,
    carousel_image: '',
    roas: '' as string | number,
    performance_score: '' as string | number,
    is_custom_built: true,
    gallery_order: 0,
    carousel_order: 0,
  })

  const isWebDev = formData.services.includes(WEB_DEV_SERVICE)

  useEffect(() => {
    async function fetchCaseStudy() {
      const supabase = createClient()
      // 1. Force TypeScript to type the extracted "data" variable directly
      const { data }: { data: CaseStudy | null } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single()
        //.returns<CaseStudy>()

      if (data) {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          client: data.client || '',
          industry: data.industry || '',
          services: data.services || [],
          challenge: data.challenge || '',
          solution: data.solution || '',
          results: data.results || '',
          content: data.content || '',
          featured_image: data.featured_image || '',
          testimonial_text: data.testimonial_text || '',
          testimonial_author: data.testimonial_author || '',
          testimonial_role: data.testimonial_role || '',
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          published: data.published || false,
          show_in_carousel: data.show_in_carousel || false,
          carousel_image: data.carousel_image || '',
          roas: data.roas ?? '',
          performance_score: data.performance_score ?? '',
          is_custom_built: data.is_custom_built ?? true,
          gallery_order: data.gallery_order ?? 0,
          carousel_order: data.carousel_order ?? 0,
        })
      }
      setFetching(false)
    }
    fetchCaseStudy()
  }, [id])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({ ...prev, title, slug: slugify(title), seo_title: title }))
  }

  const toggleService = (service: string) => {
    setFormData(prev => {
      const next = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
      const show_in_carousel = next.includes(WEB_DEV_SERVICE) ? prev.show_in_carousel : false
      return { ...prev, services: next, show_in_carousel }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to update case study')
        return
      }

      router.push('/admin/case-studies')
    } catch (error) {
      console.error('Error updating case study:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this case study?')) return
    setLoading(true)
    try {
      const response = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' })
      if (response.ok) router.push('/admin/case-studies')
    } catch (error) {
      console.error('Error deleting case study:', error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="text-white">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Case Study</h1>
        <p className="text-white/70 mt-2">Update your case study</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Title" value={formData.title} onChange={handleTitleChange} placeholder="Project title" required />
          <Input label="Slug" value={formData.slug} onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} placeholder="url-friendly-slug" required />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Client" value={formData.client} onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))} placeholder="Client name" required />
          <div>
            <label className="block text-sm font-medium text-white mb-2">Industry</label>
            <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Services</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SERVICES.map(service => (
              <label key={service} className="flex items-center space-x-2 text-white/70 cursor-pointer">
                <input type="checkbox" checked={formData.services.includes(service)} onChange={() => toggleService(service)} className="rounded" />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <Textarea label="Challenge" value={formData.challenge} onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))} placeholder="What problem did the client face?" rows={4} />
        <Textarea label="Solution" value={formData.solution} onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))} placeholder="How did you solve it?" rows={4} />
        <Textarea label="Results" value={formData.results} onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))} placeholder="What were the outcomes?" rows={4} />

        <ImageUpload label="Featured Image" value={formData.featured_image} onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))} />

        <RichTextEditor label="Content" value={formData.content} onChange={(content) => setFormData(prev => ({ ...prev, content }))} placeholder="Full case study content" />

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">Testimonial</h3>
          <div className="space-y-4">
            <Textarea label="Testimonial Text" value={formData.testimonial_text} onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))} placeholder="Client feedback" rows={3} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input label="Author" value={formData.testimonial_author} onChange={(e) => setFormData(prev => ({ ...prev, testimonial_author: e.target.value }))} placeholder="Client name" />
              <Input label="Role" value={formData.testimonial_role} onChange={(e) => setFormData(prev => ({ ...prev, testimonial_role: e.target.value }))} placeholder="Job title" />
            </div>
          </div>
        </div>

        {/* Homepage Display Settings */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">Homepage Display Settings</h3>
          <div className="space-y-4">
            <label className={`flex items-center cursor-pointer ${!isWebDev ? 'opacity-40' : ''}`}>
              <input
                type="checkbox"
                checked={formData.show_in_carousel}
                onChange={(e) => setFormData(prev => ({ ...prev, show_in_carousel: e.target.checked }))}
                disabled={!isWebDev}
                className="mr-2"
              />
              <span className="text-white">Feature in website carousel</span>
              {!isWebDev && <span className="ml-2 text-xs text-white/40">(requires Web Design &amp; Development)</span>}
            </label>

            {formData.show_in_carousel && (
              <div className="space-y-4 pl-6 border-l border-white/10">
                <ImageUpload
                  label="Carousel Image (optional — uses Featured Image if left blank)"
                  value={formData.carousel_image}
                  onChange={(url) => setFormData(prev => ({ ...prev, carousel_image: url }))}
                />
                <Input
                  label="Carousel Order"
                  type="number"
                  value={String(formData.carousel_order)}
                  onChange={(e) => setFormData(prev => ({ ...prev, carousel_order: Number(e.target.value) }))}
                />
              </div>
            )}

            <Input
              label="Gallery Order"
              type="number"
              value={String(formData.gallery_order)}
              onChange={(e) => setFormData(prev => ({ ...prev, gallery_order: Number(e.target.value) }))}
            />

            <div>
              <p className="text-sm font-medium text-white mb-3">Impact Stats (used in homepage statistics)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="ROAS"
                  type="number"
                  step="0.1"
                  value={String(formData.roas)}
                  onChange={(e) => setFormData(prev => ({ ...prev, roas: e.target.value }))}
                  placeholder="e.g. 4.2"
                />
                <Input
                  label="Performance Score (0–100)"
                  type="number"
                  min="0"
                  max="100"
                  value={String(formData.performance_score)}
                  onChange={(e) => setFormData(prev => ({ ...prev, performance_score: e.target.value }))}
                  placeholder="e.g. 96"
                />
                <label className="flex items-center space-x-2 text-white/70 cursor-pointer pt-6">
                  <input
                    type="checkbox"
                    checked={formData.is_custom_built}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_custom_built: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Custom Built</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <Input label="SEO Title" value={formData.seo_title} onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))} placeholder="SEO optimised title" />
            <Textarea label="SEO Description" value={formData.seo_description} onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))} placeholder="Meta description" rows={2} />
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" checked={formData.published} onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))} className="mr-2" />
            <span className="text-white">Published</span>
          </label>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleDelete} disabled={loading}>
            Delete Case Study
          </Button>
          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" loading={loading}>Update Case Study</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
