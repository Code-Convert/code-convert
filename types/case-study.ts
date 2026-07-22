export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  industry?: string
  services?: string[]
  challenge?: string
  solution?: string
  results?: string
  content?: string
  featured_image?: string
  gallery?: string[]
  testimonial_text?: string
  testimonial_author?: string
  testimonial_role?: string
  seo_title?: string
  seo_description?: string
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
  show_in_carousel: boolean
  carousel_image?: string
  roas?: number | null
  performance_score?: number | null
  is_custom_built: boolean
  gallery_order: number
  carousel_order: number
}

export interface CreateCaseStudy {
  title: string
  slug: string
  client: string
  industry?: string
  services?: string[]
  challenge?: string
  solution?: string
  results?: string
  content?: string
  featured_image?: string
  gallery?: string[]
  testimonial_text?: string
  testimonial_author?: string
  testimonial_role?: string
  seo_title?: string
  seo_description?: string
  published?: boolean
  published_at?: string
  show_in_carousel?: boolean
  carousel_image?: string
  roas?: number | null
  performance_score?: number | null
  is_custom_built?: boolean
  gallery_order?: number
  carousel_order?: number
}

export interface UpdateCaseStudy {
  title?: string
  slug?: string
  client?: string
  industry?: string
  services?: string[]
  challenge?: string
  solution?: string
  results?: string
  content?: string
  featured_image?: string
  gallery?: string[]
  testimonial_text?: string
  testimonial_author?: string
  testimonial_role?: string
  seo_title?: string
  seo_description?: string
  published?: boolean
  published_at?: string
  show_in_carousel?: boolean
  carousel_image?: string
  roas?: number | null
  performance_score?: number | null
  is_custom_built?: boolean
  gallery_order?: number
  carousel_order?: number
}

export const INDUSTRIES = [
  'Technology',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Education',
  'Real Estate',
  'Food & Beverage',
  'Fashion',
  'Travel',
  'Other'
] as const

// These match the gallery filter categories exactly.
// 'Web Design & Development' is also the carousel eligibility gate.
export const SERVICES = [
  'Web Design & Development',
  'Social Media Strategy & Management',
  'Content Creation & Marketing',
  'Community Engagement & Management',
] as const

export const WEB_DEV_SERVICE = 'Web Design & Development' as const

export type Industry = typeof INDUSTRIES[number]
export type Service = typeof SERVICES[number]
