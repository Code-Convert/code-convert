interface PageLoadingProps {
  title?: string
  subtitle?: string
  itemCount?: number
}

export default function PageLoading({ title, subtitle, itemCount = 6 }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {title && <div className="h-16 w-48 bg-white/5 rounded-lg mb-6 animate-pulse" />}
        {subtitle && <div className="h-8 w-96 bg-white/5 rounded-lg mb-12 animate-pulse" />}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg overflow-hidden">
              <div className="aspect-video bg-white/10 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-white/10 rounded animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
