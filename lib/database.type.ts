export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      lead_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          source_page: string
          source_url: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_term: string | null
          primary_goal: string | null
          sells_to: string | null
          growth_stage: string | null
          biggest_challenge: string | null
          exploring_reason: string | null
          company_name: string | null
          website_url: string | null
          industry: string | null
          industry_other: string | null
          role: string | null
          decision_authority: string | null
          monthly_revenue: string | null
          monthly_ad_spend: string | null
          budget_allocated: string | null
          implementation_timeline: string | null
          action_likelihood: string | null
          additional_context: string | null
          meeting_preference: string | null
          lead_score: number
          lead_temperature: 'hot' | 'warm' | 'cold' | null
          lifecycle_stage: string
          lead_status: string
          hubspot_contact_id: string | null
          hubspot_sync_status: 'pending' | 'synced' | 'failed'
          hubspot_synced_at: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          source_page: string
          source_url?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_term?: string | null
          primary_goal?: string | null
          sells_to?: string | null
          growth_stage?: string | null
          biggest_challenge?: string | null
          exploring_reason?: string | null
          company_name?: string | null
          website_url?: string | null
          industry?: string | null
          industry_other?: string | null
          role?: string | null
          decision_authority?: string | null
          monthly_revenue?: string | null
          monthly_ad_spend?: string | null
          budget_allocated?: string | null
          implementation_timeline?: string | null
          action_likelihood?: string | null
          additional_context?: string | null
          meeting_preference?: string | null
          lead_score?: number
          lead_temperature?: 'hot' | 'warm' | 'cold' | null
          lifecycle_stage?: string
          lead_status?: string
          hubspot_contact_id?: string | null
          hubspot_sync_status?: 'pending' | 'synced' | 'failed'
          hubspot_synced_at?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          source_page?: string
          source_url?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_term?: string | null
          primary_goal?: string | null
          sells_to?: string | null
          growth_stage?: string | null
          biggest_challenge?: string | null
          exploring_reason?: string | null
          company_name?: string | null
          website_url?: string | null
          industry?: string | null
          industry_other?: string | null
          role?: string | null
          decision_authority?: string | null
          monthly_revenue?: string | null
          monthly_ad_spend?: string | null
          budget_allocated?: string | null
          implementation_timeline?: string | null
          action_likelihood?: string | null
          additional_context?: string | null
          meeting_preference?: string | null
          lead_score?: number
          lead_temperature?: 'hot' | 'warm' | 'cold' | null
          lifecycle_stage?: string
          lead_status?: string
          hubspot_contact_id?: string | null
          hubspot_sync_status?: 'pending' | 'synced' | 'failed'
          hubspot_synced_at?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          challenge: string | null
          carousel_image: string | null
          carousel_order: number
          client: string
          content: string | null
          created_at: string | null
          featured_image: string | null
          gallery: string[] | null
          gallery_order: number
          id: string
          industry: string | null
          is_custom_built: boolean
          performance_score: number | null
          published: boolean | null
          published_at: string | null
          results: string | null
          roas: number | null
          seo_description: string | null
          seo_title: string | null
          services: string[] | null
          show_in_carousel: boolean
          slug: string
          solution: string | null
          testimonial_author: string | null
          testimonial_role: string | null
          testimonial_text: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          challenge?: string | null
          carousel_image?: string | null
          carousel_order?: number
          client: string
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          gallery?: string[] | null
          gallery_order?: number
          id?: string
          industry?: string | null
          is_custom_built?: boolean
          performance_score?: number | null
          published?: boolean | null
          published_at?: string | null
          results?: string | null
          roas?: number | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[] | null
          show_in_carousel?: boolean
          slug: string
          solution?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          testimonial_text?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          challenge?: string | null
          carousel_image?: string | null
          carousel_order?: number
          client?: string
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          gallery?: string[] | null
          gallery_order?: number
          id?: string
          industry?: string | null
          is_custom_built?: boolean
          performance_score?: number | null
          published?: boolean | null
          published_at?: string | null
          results?: string | null
          roas?: number | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[] | null
          show_in_carousel?: boolean
          slug?: string
          solution?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          testimonial_text?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          filename: string
          id: string
          mime_type: string
          original_name: string
          size: number
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          filename: string
          id?: string
          mime_type: string
          original_name: string
          size: number
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          filename?: string
          id?: string
          mime_type?: string
          original_name?: string
          size?: number
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_site_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          projects_delivered: number
          avg_performance_score: number | null
          avg_roas: number | null
          percent_custom_built: number | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]

export const Constants = {
  public: {
    Enums: {},
  },
} as const
