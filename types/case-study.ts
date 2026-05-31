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

export const SERVICES = [
  'Web Design',
  'E-commerce Development',
  'Branding',
  'Digital Marketing',
  'SEO',
  'Content Strategy',
  'UI/UX Design',
  'Development'
] as const

export type Industry = typeof INDUSTRIES[number]
export type Service = typeof SERVICES[number]