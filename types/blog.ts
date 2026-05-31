export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  seo_title?: string
  seo_description?: string
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
  author_id?: string
}

export interface CreateBlogPost {
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  seo_title?: string
  seo_description?: string
  published?: boolean
  published_at?: string
  author_id?: string
}

export interface UpdateBlogPost {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  featured_image?: string
  seo_title?: string
  seo_description?: string
  published?: boolean
  published_at?: string
  author_id?: string
}

export type BlogStatus = 'draft' | 'published' | 'scheduled'

export interface BlogFilters {
  status?: BlogStatus
  search?: string
  author?: string
  dateFrom?: string
  dateTo?: string
}