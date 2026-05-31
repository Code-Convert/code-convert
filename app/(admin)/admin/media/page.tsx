'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Upload, Search, Trash2, X } from 'lucide-react'
import { MediaFile } from '@/types/media'
import { UploadTest } from '@/components/ui/upload-test'

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)

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
    const files = e.target.files
    if (!files || files.length === 0) {
      console.log('No files selected')
      return
    }

    console.log('Media Library: Uploading', files.length, 'file(s)')
    setUploading(true)
    const supabase = createClient()
    
    try {
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        console.error('Auth error:', authError)
        alert('You must be logged in to upload files')
        setUploading(false)
        return
      }

      console.log('User authenticated:', user.email)

      let successCount = 0
      let errorCount = 0

      for (const file of Array.from(files)) {
        try {
          // Validate file
          if (!file.type.startsWith('image/')) {
            console.warn('Skipping non-image file:', file.name)
            errorCount++
            continue
          }

          if (file.size > 5 * 1024 * 1024) {
            console.warn('File too large:', file.name)
            errorCount++
            continue
          }

          const fileExt = file.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
          
          console.log('Uploading:', fileName)
          
          const { error: uploadError } = await supabase.storage
            .from('media-library')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (uploadError) {
            console.error('Upload error for', file.name, ':', uploadError)
            errorCount++
            continue
          }

          const { data: { publicUrl } } = supabase.storage
            .from('media-library')
            .getPublicUrl(fileName)

          const { error: insertError } = await supabase
            .from('media')
            .insert({
              filename: fileName,
              original_name: file.name,
              mime_type: file.type,
              size: file.size,
              url: publicUrl,
              uploaded_by: user.id
            })

          if (insertError) {
            console.error('Database insert error for', file.name, ':', insertError)
            errorCount++
            continue
          }

          successCount++
          console.log('Successfully uploaded:', file.name)
          
        } catch (fileError) {
          console.error('Error processing file', file.name, ':', fileError)
          errorCount++
        }
      }

      // Show results
      if (successCount > 0) {
        alert(`Successfully uploaded ${successCount} file(s)${errorCount > 0 ? `, ${errorCount} failed` : ''}`)
      } else if (errorCount > 0) {
        alert(`Failed to upload ${errorCount} file(s). Check console for details.`)
      }
      
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      fetchMedia()
    }
  }

  const handleDelete = async (item: MediaFile) => {
    if (!confirm(`Delete ${item.original_name}?`)) return

    const supabase = createClient()
    
    await supabase.storage
      .from('media-library')
      .remove([item.filename])

    await supabase
      .from('media')
      .delete()
      .eq('id', item.id)

    setMedia(media.filter(m => m.id !== item.id))
    setSelectedMedia(null)
  }

  const filteredMedia = media.filter(m => 
    m.original_name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <UploadTest />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Media Library</h1>
          <p className="text-white/70 mt-2">Manage your images and files</p>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <Button disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </label>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
        <input
          type="text"
          placeholder="Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
        />
      </div>

      {filteredMedia.length === 0 ? (
        <div className="bg-white/5 rounded-lg border border-white/10 p-12 text-center">
          <Upload className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No media files yet</h3>
          <p className="text-white/50 mb-4">Upload your first image or file to get started</p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
            <Button disabled={uploading}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div 
              key={item.id} 
              className="bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:border-[#FF1E1E]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              <div className="aspect-square bg-white/10 flex items-center justify-center">
                {item.mime_type.startsWith('image/') ? (
                  <img src={item.url} alt={item.alt_text || item.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/50 text-sm">{item.mime_type}</div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm text-white truncate">{item.original_name}</p>
                <p className="text-xs text-white/50 mt-1">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMedia(null)}>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Media Details</h2>
              <button onClick={() => setSelectedMedia(null)} className="text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {selectedMedia.mime_type.startsWith('image/') && (
                <img src={selectedMedia.url} alt={selectedMedia.original_name} className="w-full rounded-lg" />
              )}
              
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-white/50">Filename</label>
                  <p className="text-white">{selectedMedia.original_name}</p>
                </div>
                <div>
                  <label className="text-sm text-white/50">URL</label>
                  <p className="text-white text-sm break-all">{selectedMedia.url}</p>
                </div>
                <div>
                  <label className="text-sm text-white/50">Size</label>
                  <p className="text-white">{(selectedMedia.size / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <label className="text-sm text-white/50">Type</label>
                  <p className="text-white">{selectedMedia.mime_type}</p>
                </div>
                <div>
                  <label className="text-sm text-white/50">Uploaded</label>
                  <p className="text-white">{new Date(selectedMedia.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={() => handleDelete(selectedMedia)}
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMedia.url)
                    alert('URL copied to clipboard!')
                  }}
                >
                  Copy URL
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}