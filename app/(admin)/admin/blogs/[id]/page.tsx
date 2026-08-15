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
import type { BlogPost } from '@/types/blog'

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
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

  useEffect(() => {
    async function fetchBlog() {
      const supabase = createClient()
      // 1. Force TypeScript to type the extracted "data" variable directly
      const { data }: { data: BlogPost | null } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()
        //.returns<BlogPost>()

      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? '',
          content: data.content ?? '',
          featured_image: data.featured_image ?? '',
          seo_title: data.seo_title ?? '',
          seo_description: data.seo_description ?? '',
          published: data.published ?? false
        })
      }
      setFetching(false)
    }
    fetchBlog()
  }, [id])

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
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/blogs')
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/blogs')
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
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
        <h1 className="text-3xl font-bold text-white">Edit Blog Post</h1>
        <p className="text-white/70 mt-2">Update your blog post</p>
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
              placeholder="SEO optimised title"
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
            Delete Post
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
              Update Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
