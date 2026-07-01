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
          client: string
          content: string | null
          created_at: string | null
          featured_image: string | null
          gallery: string[] | null
          id: string
          industry: string | null
          published: boolean | null
          published_at: string | null
          results: string | null
          seo_description: string | null
          seo_title: string | null
          services: string[] | null
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
          client: string
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          gallery?: string[] | null
          id?: string
          industry?: string | null
          published?: boolean | null
          published_at?: string | null
          results?: string | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[] | null
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
          client?: string
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          gallery?: string[] | null
          id?: string
          industry?: string | null
          published?: boolean | null
          published_at?: string | null
          results?: string | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[] | null
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
