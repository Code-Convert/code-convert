export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          featured_image: string | null
          seo_title: string | null
          seo_description: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
          author_id: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          featured_image?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          author_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          featured_image?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          author_id?: string | null
        }
      }
      case_studies: {
        Row: {
          id: string
          title: string
          slug: string
          client: string
          industry: string | null
          services: string[] | null
          challenge: string | null
          solution: string | null
          results: string | null
          content: string | null
          featured_image: string | null
          gallery: string[] | null
          testimonial_text: string | null
          testimonial_author: string | null
          testimonial_role: string | null
          seo_title: string | null
          seo_description: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          client: string
          industry?: string | null
          services?: string[] | null
          challenge?: string | null
          solution?: string | null
          results?: string | null
          content?: string | null
          featured_image?: string | null
          gallery?: string[] | null
          testimonial_text?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          client?: string
          industry?: string | null
          services?: string[] | null
          challenge?: string | null
          solution?: string | null
          results?: string | null
          content?: string | null
          featured_image?: string | null
          gallery?: string[] | null
          testimonial_text?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          original_name: string
          mime_type: string
          size: number
          url: string
          alt_text: string | null
          created_at: string
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          filename: string
          original_name: string
          mime_type: string
          size: number
          url: string
          alt_text?: string | null
          created_at?: string
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          filename?: string
          original_name?: string
          mime_type?: string
          size?: number
          url?: string
          alt_text?: string | null
          created_at?: string
          uploaded_by?: string | null
        }
      }
    }
  }
}