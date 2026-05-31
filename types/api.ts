import { Database } from './database'

// Blog API types
export type BlogInsertPayload = Database['public']['Tables']['blogs']['Insert']
export type BlogUpdatePayload = Database['public']['Tables']['blogs']['Update']

// Case Study API types
export type CaseStudyInsertPayload = Database['public']['Tables']['case_studies']['Insert']
export type CaseStudyUpdatePayload = Database['public']['Tables']['case_studies']['Update']

// Error response type
export interface ApiError {
  error: string
}

// Success response type
export interface ApiSuccess {
  success: boolean
  data?: unknown
}
