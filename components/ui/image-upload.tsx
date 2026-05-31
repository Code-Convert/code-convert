'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, AlertCircle } from 'lucide-react'
import { Button } from './button'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      console.log('No file selected')
      return
    }

    console.log('Starting upload for file:', file.name, 'Size:', file.size, 'Type:', file.type)
    setUploading(true)
    setError('')
    
    const supabase = createClient()
    
    try {
      // Check authentication first
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        const errorMsg = 'You must be logged in to upload images'
        console.error('Auth error:', authError)
        setError(errorMsg)
        alert(errorMsg)
        setUploading(false)
        return
      }

      console.log('User authenticated:', user.email)

      // Validate file type
      if (!file.type.startsWith('image/')) {
        const errorMsg = 'Please select an image file'
        setError(errorMsg)
        alert(errorMsg)
        setUploading(false)
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMsg = 'Image size must be less than 5MB'
        setError(errorMsg)
        alert(errorMsg)
        setUploading(false)
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      console.log('Uploading to Supabase storage:', fileName)
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        const errorMsg = `Upload failed: ${uploadError.message}`
        setError(errorMsg)
        alert(errorMsg)
        setUploading(false)
        return
      }

      console.log('Upload successful:', uploadData)

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(fileName)

      console.log('Public URL generated:', publicUrl)

      // Insert into media table
      const { data: mediaData, error: insertError } = await supabase
        .from('media')
        .insert({
          filename: fileName,
          original_name: file.name,
          mime_type: file.type,
          size: file.size,
          url: publicUrl,
          uploaded_by: user.id
        })
        .select()
        .single()

      if (insertError) {
        console.error('Database insert error:', insertError)
        const errorMsg = `Failed to save media record: ${insertError.message}`
        setError(errorMsg)
        alert(errorMsg)
        setUploading(false)
        return
      }

      console.log('Media record created:', mediaData)
      onChange(publicUrl)
      setError('')
      
    } catch (error) {
      console.error('Unexpected error in handleUpload:', error)
      const errorMsg = error instanceof Error ? error.message : 'Upload failed. Please try again.'
      setError(errorMsg)
      alert(errorMsg)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-white">{label}</label>}
      
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {value ? (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => {
              onChange('')
              setError('')
            }}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      ) : (
        <label className="block aspect-video rounded-lg border-2 border-dashed border-white/10 hover:border-white/30 cursor-pointer transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <div className="h-full flex flex-col items-center justify-center text-white/70">
            <Upload size={32} className="mb-2" />
            <span className="text-center px-4">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </span>
            {uploading && (
              <div className="mt-2 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF1E1E] animate-pulse" style={{ width: '100%' }} />
              </div>
            )}
          </div>
        </label>
      )}
    </div>
  )
}
