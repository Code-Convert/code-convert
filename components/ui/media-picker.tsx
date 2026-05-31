'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MediaFile } from '@/types/media'
import { X, Upload, Search } from 'lucide-react'
import { Button } from './button'

interface MediaPickerProps {
  onSelect: (url: string) => void
  onClose: () => void
}

export function MediaPicker({ onSelect, onClose }: MediaPickerProps) {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setMedia(data)
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      console.log('No file selected')
      return
    }

    console.log('MediaPicker: Starting upload for:', file.name)
    setUploading(true)
    const supabase = createClient()
    
    try {
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        console.error('Auth error:', authError)
        alert('You must be logged in to upload images')
        setUploading(false)
        return
      }

      console.log('User authenticated:', user.email)

      // Validate file
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        setUploading(false)
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        setUploading(false)
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      console.log('Uploading to storage:', fileName)
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        alert(`Upload failed: ${uploadError.message}`)
        setUploading(false)
        return
      }

      console.log('Upload successful:', uploadData)

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(fileName)

      console.log('Public URL:', publicUrl)

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
        console.error('Insert error:', insertError)
        alert(`Failed to save media: ${insertError.message}`)
        setUploading(false)
        return
      }

      console.log('Media record created:', mediaData)
      
      // Refresh media list
      await fetchMedia()
      
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const filteredMedia = media.filter(m => 
    m.original_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Select Media</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-white/10 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="text"
                placeholder="Search media..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
              <Button type="button" disabled={uploading}>
                <Upload size={18} className="mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-white/70 text-center py-8">Loading...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-white/70 text-center py-8">No media found</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.url)}
                  className="aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
                >
                  <img
                    src={item.url}
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
