'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { slugify } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { INDUSTRIES, SERVICES } from '@/types/case-study'

export default function EditCaseStudy({ params }: { params: { id: string } }) {
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
    published: false
  })

  useEffect(() => {
    async function fetchCaseStudy() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', params.id)
        .single()

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
          published: data.published || false
        })
      }
      setFetching(false)
    }
    fetchCaseStudy()
  }, [params.id])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: slugify(title),
      seo_title: title
    }))
  }

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/case-studies/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/case-studies')
      }
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
      const response = await fetch(`/api/case-studies/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/case-studies')
      }
    } catch (error) {
      console.error('Error deleting case study:', error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Case Study</h1>
        <p className="text-white/70 mt-2">Update your case study</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Project title"
            required
          />
          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="url-friendly-slug"
            required
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Client"
            value={formData.client}
            onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
            placeholder="Client name"
            required
          />
          <div>
            <label className="block text-sm font-medium text-white mb-2">Industry</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Services</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SERVICES.map(service => (
              <label key={service} className="flex items-center space-x-2 text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => toggleService(service)}
                  className="rounded"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <Textarea
          label="Challenge"
          value={formData.challenge}
          onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
          placeholder="What problem did the client face?"
          rows={4}
        />

        <Textarea
          label="Solution"
          value={formData.solution}
          onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
          placeholder="How did you solve it?"
          rows={4}
        />

        <Textarea
          label="Results"
          value={formData.results}
          onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
          placeholder="What were the outcomes?"
          rows={4}
        />

        <Textarea
          label="Content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Full case study content"
          rows={8}
        />

        <Input
          label="Featured Image URL"
          value={formData.featured_image}
          onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
          placeholder="https://..."
        />

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">Testimonial</h3>
          <div className="space-y-4">
            <Textarea
              label="Testimonial Text"
              value={formData.testimonial_text}
              onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))}
              placeholder="Client feedback"
              rows={3}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Author"
                value={formData.testimonial_author}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial_author: e.target.value }))}
                placeholder="Client name"
              />
              <Input
                label="Role"
                value={formData.testimonial_role}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial_role: e.target.value }))}
                placeholder="Job title"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <Input
              label="SEO Title"
              value={formData.seo_title}
              onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
              placeholder="SEO optimized title"
            />
            <Textarea
              label="SEO Description"
              value={formData.seo_description}
              onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
              placeholder="Meta description"
              rows={2}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-white">Published</span>
          </label>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Case Study
          </Button>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Update Case Study
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
