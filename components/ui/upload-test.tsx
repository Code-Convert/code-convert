// @ts-nocheck
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function UploadTest() {
  const [status, setStatus] = useState<string>('')
  const [error, setError] = useState<string>('')

  const testUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus('Starting upload...')
    setError('')

    try {
      const supabase = createClient()
      
      // Check authentication
      const { data: { user } } = await supabase.auth.getUser()
      setStatus(`User authenticated: ${user?.email || 'No user'}`)
      
      if (!user) {
        setError('Not authenticated!')
        return
      }

      // Try to upload
      const fileName = `test-${Date.now()}.${file.name.split('.').pop()}`
      setStatus(`Uploading ${fileName}...`)
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        setError(`Upload error: ${uploadError.message}`)
        console.error('Full upload error:', uploadError)
        return
      }

      setStatus(`Upload successful! Path: ${uploadData.path}`)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(fileName)

      setStatus(`Public URL: ${publicUrl}`)

      const { data: mediaData, error: insertError } = await supabase
        .from('media')
        .insert({
          filename: fileName,
          original_name: file.name,
          mime_type: file.type,
          size: file.size,
          url: publicUrl
        })
        .select('id')
        .single<{ id: string }>()

      if (insertError) {
        setError(`Database insert error: ${insertError.message}`)
        console.error('Full insert error:', insertError)
        return
      }

      setStatus(`✅ Complete! Media ID: ${mediaData.id}`)
      
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error'
      setError(`Unexpected error: ${message}`)
      console.error('Full error:', err)
    }
  }

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
      <h3 className="text-lg font-bold text-white">Upload Test</h3>
      
      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={testUpload}
          className="text-white"
        />
      </label>

      {status && (
        <div className="p-3 bg-blue-500/20 border border-blue-500/50 rounded text-white text-sm">
          {status}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-white text-sm">
          {error}
        </div>
      )}

      <div className="text-xs text-white/50">
        Check browser console (F12) for detailed logs
      </div>
    </div>
  )
}
