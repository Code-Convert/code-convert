export interface MediaFile {
  id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  url: string
  alt_text?: string
  created_at: string
  uploaded_by?: string
}

export interface UploadedFile {
  file: File
  preview: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export interface MediaFilters {
  type?: 'image' | 'video' | 'document' | 'all'
  search?: string
  dateFrom?: string
  dateTo?: string
}

export const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  video: ['video/mp4', 'video/webm'],
  document: ['application/pdf', 'text/plain']
} as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB