import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

async function getMedia() {
  const supabase = await createClient()
  
  const { data: media, error } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching media:', error)
    return []
  }

  return media || []
}

export default async function MediaLibrary() {
  const media = await getMedia()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Media Library</h1>
          <p className="text-white/70 mt-2">Manage your images and files</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {media.length === 0 ? (
        <div className="bg-white/5 rounded-lg border border-white/10 p-12 text-center">
          <Upload className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No media files yet</h3>
          <p className="text-white/50 mb-4">Upload your first image or file to get started</p>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:border-[#FF1E1E]/50 transition-colors">
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
    </div>
  )
}