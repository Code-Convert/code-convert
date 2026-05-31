'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ImageUpload } from '@/components/ui/image-upload'
import { slugify } from '@/lib/utils'

export default function CreateBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    seo_title: '',
    seo_description: '',
    published: false
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: slugify(title),
      seo_title: title
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/blogs')
      } else {
        const errorData = await response.json()
        console.error('Failed to create blog post:', errorData)
        alert(`Failed to create blog post: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      alert('Error creating blog post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Create Blog Post</h1>
        <p className="text-white/70 mt-2">Write and publish a new blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter blog post title"
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

        <Textarea
          label="Excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Brief description of the post"
          rows={3}
        />

        <ImageUpload
          label="Featured Image"
          value={formData.featured_image}
          onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
        />

        <RichTextEditor
          label="Content"
          value={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          placeholder="Write your blog post content here..."
        />

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              placeholder="Meta description for search engines"
              rows={3}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-white">Publish immediately</span>
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {formData.published ? 'Publish Post' : 'Save Draft'}
          </Button>
        </div>
      </form>
    </div>
  )
}